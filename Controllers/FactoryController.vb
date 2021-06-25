Imports System.Net
Imports System.Web.Http
Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Net.Http
Imports System.IO
Imports System.Diagnostics
Imports Leadtools.Documents
Imports Leadtools.Codecs
Imports Leadtools.Caching
Imports TabFusionRMS.Models
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Exceptions
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Helpers
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Model
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Model.Factory
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Model.PreCache
Imports TabFusionRMS.WebVB.Common

Namespace TABFusionRMS.Web.Controllers
    ''' <summary>
    ''' Used with the DocumentFactory class of the LEADTOOLS Documents JavaScript library.
    ''' </summary>
    Public Class FactoryController
        Inherits ApiController
        ' Factory/
        '        *    POST LoadFromCache
        '        *    POST LoadFromUri
        '        *    POST BeginUpload
        '        *    POST UploadDocument
        '        *    POST AbortUploadDocument
        '       *     POST SaveToCache
        '        *    POST Delete
        '        *    GET PurgeCache
        '        *    GET GetCacheStatistics
        '        


        Public Sub New()
            ServiceHelper.InitializeController()
        End Sub

        ''' <summary>
        '''  Loads the specified document from the cache, if possible. Errors if the document is not in the cache.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document could not be loaded from the cache")>
        <HttpPost>
        Public Function LoadFromCache(request As LoadFromCacheRequest) As LoadFromCacheResponse
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            Dim cache As ObjectCache = ServiceHelper.Cache
            Using document As Leadtools.Documents.Document = DocumentFactory.LoadFromCache(cache, request.DocumentId)
                ' Return null if the document does not exist in the cache
                ' If you want to throw an error then call:
                ' DocumentHelper.CheckLoadFromCache(document);

                Return New LoadFromCacheResponse() With {
                   .Document = document
                }
            End Using
        End Function

        ' Support GET only for testing
        ''' <summary>
        '''  Creates and stores an entry for the image at the URI, returning the appropriate Document data.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The uri data could not be loaded")>
        <HttpPost, HttpGet>
        Public Function LoadFromUri(request As LoadFromUriRequest) As LoadFromUriResponse
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If
            If request.Uri Is Nothing Then
                Throw New ArgumentException("uri must be specified")
            Else
                If request.Uri.ToString.StartsWith(Chr(225)) Then
                    Dim Uri = Common.DecryptURLParameters(request.Uri.ToString)
                    request.Uri = New Uri(HttpUtility.UrlDecode(Uri))
                End If
            End If

            If request.Resolution < 0 Then
                Throw New ArgumentException("Resolution must be a value greater than or equal to zero")
            End If

            Dim cache As ObjectCache = ServiceHelper.Cache

            Dim loadOptions As LoadDocumentOptions = New LoadDocumentOptions()
            loadOptions.Cache = cache
            loadOptions.UseCache = cache IsNot Nothing
            loadOptions.CachePolicy = ServiceHelper.CreatePolicy()
            loadOptions.WebClient = Nothing
            ' Use default
            If request.Options IsNot Nothing Then
                loadOptions.DocumentId = request.Options.DocumentId
                loadOptions.AnnotationsUri = request.Options.AnnotationsUri
                loadOptions.Name = request.Options.Name
                loadOptions.Password = request.Options.Password
                loadOptions.LoadEmbeddedAnnotations = request.Options.LoadEmbeddedAnnotations
                loadOptions.MaximumImagePixelSize = request.Options.MaximumImagePixelSize
                loadOptions.FirstPageNumber = request.Options.FirstPageNumber
                loadOptions.LastPageNumber = request.Options.LastPageNumber
            End If

            ' Get the document name
            Dim documentName As String = request.Uri.ToString()

            ' Check if this document was uploaded, then hope the user has set LoadDocumentOptions.Name to the original file name
            If DocumentFactory.IsUploadDocumentUri(request.Uri) AndAlso Not String.IsNullOrEmpty(loadOptions.Name) Then
                ' Use that instead
                documentName = loadOptions.Name
            End If

            ' Most image file formats have a signature that can be used to detect to detect the type of the file.
            ' However, some formats supported by LEADTOOLS do not, such as plain text files (TXT) or DXF CAD format or 
            ' For these, we detect the MIME type from the file extension if available and set it in the load document options and the
            ' documents library will use this value if it fails to detect the file format from the data.

            If Not String.IsNullOrEmpty(documentName) Then
                loadOptions.MimeType = RasterCodecs.GetExtensionMimeType(documentName)
            End If

            Dim document As Leadtools.Documents.Document = Nothing
            Try
                ' first, check if this is pre-cached
                If PreCacheHelper.PreCacheExists Then
                    Dim documentId As String = PreCacheHelper.CheckDocument(request.Uri, loadOptions.MaximumImagePixelSize)
                    If documentId IsNot Nothing Then
                        document = DocumentFactory.LoadFromCache(cache, documentId)
                    End If
                End If

                ' else, load normally
                If document Is Nothing Then

                    document = DocumentFactory.LoadFromUri(request.Uri, loadOptions)
                    If document Is Nothing Then
                        Throw New InvalidOperationException("Failed to load URI: " & Convert.ToString(request.Uri))
                    End If

                    CacheController.TrySetCacheUri(document)
                    ServiceHelper.SetRasterCodecsOptions(document.RasterCodecs, request.Resolution)
                    document.AutoDeleteFromCache = False
                    document.AutoDisposeDocuments = True
                    document.AutoSaveToCache = False

                    ' 
                    '                  * NOTE: Uncomment the line below to add this new document
                    '                  * to the pre-cache. By doing so, everyone loading a document from
                    '                  * that URL will get the same document from the cache/pre-cache.
                    '                  

                    ' Add this document to the pre-cache
                    'PreCacheHelper.AddExistingDocument(request.Uri, document);
                    document.SaveToCache()
                End If
                Return New LoadFromUriResponse() With {
                   .Document = document
                }
            Finally
                If document IsNot Nothing Then
                    document.Dispose()
                End If
            End Try
        End Function

        ''' <summary>
        '''  Creates a link that a document can be uploaded to for storing in the cache. Meant to be used with UploadDocument.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId:="request")>
        <ServiceErrorAttribute(Message:="The cache could not create an upload url")>
        <HttpPost>
        Public Function BeginUpload(request As BeginUploadRequest) As BeginUploadResponse
            Dim cache As ObjectCache = ServiceHelper.Cache
            Dim uploadOptions As UploadDocumentOptions = New UploadDocumentOptions()
            uploadOptions.Cache = cache
            uploadOptions.DocumentId = request.DocumentId
            Dim uploadUri As Uri = DocumentFactory.BeginUpload(uploadOptions)
            Return New BeginUploadResponse() With {
               .UploadUri = uploadUri
            }
        End Function

        ''' <summary>
        ''' Uploads a chunk of data to the specified URL in the cache.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document data could not be uploaded")>
        <HttpPost>
        Public Function UploadDocument(request As UploadDocumentRequest) As Response
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            Dim byteArray As Byte() = Nothing
            If request.Data IsNot Nothing Then
                byteArray = System.Convert.FromBase64String(request.Data)
            End If

            Dim cache As ObjectCache = ServiceHelper.Cache
            DocumentFactory.UploadDocument(cache, request.Uri, byteArray, 0, If(byteArray IsNot Nothing, byteArray.Length, 0))
            Return New Response()
        End Function

        ''' <summary>
        ''' Aborts the document upload.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document upload could not be aborted")>
        <HttpPost>
        Public Function AbortUploadDocument(request As AbortUploadDocumentRequest) As Response
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            ' Only useful in cases where routing matches but uri is null (like ".../CancelUpload?uri")

            Try
                Dim cache As ObjectCache = ServiceHelper.Cache
                DocumentFactory.AbortUploadDocument(cache, request.Uri)
                'ignore any error
            Catch
            End Try

            Return New Response()
        End Function

        ''' <summary>
        '''  Saves the specified document to the cache. If the document is not in the cache it will be created.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document could not be saved to the cache")>
        <HttpPost>
        Public Function SaveToCache(request As SaveToCacheRequest) As SaveToCacheResponse
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If
            If request.Descriptor Is Nothing Then
                Throw New ArgumentNullException("Descriptor")
            End If

            Dim cache As ObjectCache = ServiceHelper.Cache

            ' First try to load it from the cache, if success, update it. Otherwise, assume it is not there and create a new document

            Using document As Leadtools.Documents.Document = DocumentFactory.LoadFromCache(cache, request.Descriptor.DocumentId)
                If document IsNot Nothing Then
                    ' Update it
                    document.UpdateFromDocumentDescriptor(request.Descriptor)
                    document.AutoDeleteFromCache = False
                    document.AutoDisposeDocuments = True
                    document.AutoSaveToCache = False
                    document.SaveToCache()
                    Return New SaveToCacheResponse() With {
                       .Document = document
                    }
                End If
            End Using

            ' Above failed, create a new one.
            Dim createOptions As CreateDocumentOptions = New CreateDocumentOptions()
            createOptions.Descriptor = request.Descriptor
            createOptions.Cache = cache
            createOptions.UseCache = cache IsNot Nothing
            createOptions.CachePolicy = ServiceHelper.CreatePolicy()
            Using document As Leadtools.Documents.Document = DocumentFactory.Create(createOptions)
                If document Is Nothing Then
                    Throw New InvalidOperationException("Failed to create document")
                End If

                CacheController.TrySetCacheUri(document)
                document.AutoDeleteFromCache = False
                document.AutoDisposeDocuments = True
                document.AutoSaveToCache = False
                document.SaveToCache()
                Return New SaveToCacheResponse() With {
                   .Document = document
                }
            End Using
        End Function

        ' Deletes the document immediately from the cache.
        '       * Usually changing AutoDeleteFromCache to true
        '       * would only delete the document when the cache is purged,
        '       * but it also deletes it the next time the document is cleaned
        '       * up - which happens to be right after we are finished changing
        '       * the autoDeleteFromCache property. So it's immediate.
        '       

        ''' <summary>
        ''' Signals to delete the document from the cache at the next cleaning opportunity, then performs the clean.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document could not be deleted", MethodName:="DeleteFromCache")>
        <HttpPost>
        Public Function Delete(request As DeleteRequest) As Response
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            DocumentHelper.DeleteDocument(request.DocumentId, True, True)

            Return New Response()
        End Function

        ' used to check the policies and remove outstanding cache items.
        ''' <summary>
        ''' Purges the cache of all outdated items. Requires a key from the local.config.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId:="request")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The cache could not be purged")>
        <HttpPost, HttpGet>
        Public Function PurgeCache(Optional passcode As String = Nothing) As Response
            Dim passToCheck As String = ServiceHelper.GetSettingValue(ServiceHelper.Key_Access_Passcode)
            If Not String.IsNullOrWhiteSpace(passToCheck) AndAlso passcode <> passToCheck Then
                Throw New ServiceException("Cache cannot be purged - passcode is incorrect", HttpStatusCode.Unauthorized)
            End If

            Dim cache As ObjectCache = ServiceHelper.Cache
            Dim fileCache As FileCache = TryCast(cache, FileCache)
            If fileCache IsNot Nothing Then
                fileCache.CheckPolicies()
            End If
            Return New Response()
        End Function

        ' used to check the policies and remove outstanding cache items.
        ''' <summary>
        ''' Checks the policies of the cache items and returns statistics, without deleting expired items.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId:="request")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The cache statistics could not be retrieved")>
        <HttpGet>
        Public Function GetCacheStatistics(Optional passcode As String = Nothing) As GetCacheStatisticsResponse
            Dim passToCheck As String = ServiceHelper.GetSettingValue(ServiceHelper.Key_Access_Passcode)
            If Not String.IsNullOrWhiteSpace(passToCheck) AndAlso passcode <> passToCheck Then
                Throw New ServiceException("Cache statistics cannot be retrieved - passcode is incorrect", HttpStatusCode.Unauthorized)
            End If

            Dim statistics As Leadtools.Caching.CacheStatistics = Nothing
            Dim cache As ObjectCache = ServiceHelper.Cache
            If TypeOf cache Is FileCache Then
                statistics = cache.GetStatistics()
            End If
            Return New GetCacheStatisticsResponse() With {
               .Statistics = statistics
            }
        End Function

        ' used to check the policies and remove outstanding cache items.
        ''' <summary>
        ''' Adds the specified document to the cache with an unlimited expiration and all document data. Future calls to LoadFromUri may return
        ''' this document (matched by URI).
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId:="request")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document could not be pre-cached")>
        <HttpPost>
        Public Function PreCacheDocument(request As PreCacheDocumentRequest) As PreCacheDocumentResponse
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            Dim passToCheck As String = ServiceHelper.GetSettingValue(ServiceHelper.Key_Access_Passcode)
            If Not String.IsNullOrWhiteSpace(passToCheck) AndAlso request.Passcode <> passToCheck Then
                Throw New ServiceException("Document cannot be pre-cached - passcode is incorrect", HttpStatusCode.Unauthorized)
            End If

            If request.Uri Is Nothing Then
                Throw New ArgumentException("uri must be specified")
            End If

            If Not PreCacheHelper.PreCacheExists Then
                ' Return an empty item
                Return New PreCacheDocumentResponse()
            End If

            Dim cache As ObjectCache = ServiceHelper.Cache

            ' Get the cache options, if none, use All (means if the user did not pass a value, we will cache everything in the document)
            If request.CacheOptions = DocumentCacheOptions.None Then
                request.CacheOptions = DocumentCacheOptions.All
            End If

            Return PreCacheHelper.AddDocument(cache, request)
        End Function

        ''' <summary>
        ''' Returns all the entries in the pre-cache.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId:="request")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The pre-cache dictionary could not be returned")>
        <HttpGet>
        Public Function ReportPreCache(<FromUri> request As ReportPreCacheRequest) As ReportPreCacheResponse
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            Dim passToCheck As String = ServiceHelper.GetSettingValue(ServiceHelper.Key_Access_Passcode)
            If Not String.IsNullOrWhiteSpace(passToCheck) AndAlso request.Passcode <> passToCheck Then
                Throw New ServiceException("Pre-cache cannot be reported - passcode is incorrect", HttpStatusCode.Unauthorized)
            End If

            If Not PreCacheHelper.PreCacheExists Then
                ' Return an empty report
                Return New ReportPreCacheResponse()
            End If

            Dim cache As ObjectCache = ServiceHelper.Cache
            Return PreCacheHelper.ReportDocuments(cache, request.Clean)
        End Function

        ''' <summary>
        ''' Downloads a chunk of the document for use somewhere else, such as external storage.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId:="request")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The item could not be downloaded")>
        <HttpGet>
        Public Function DownloadDocument(<FromUri> request As DownloadRequest) As DownloadResponse
            If (request.DocumentId Is Nothing AndAlso request.Uri Is Nothing) OrElse (request.DocumentId IsNot Nothing AndAlso request.Uri IsNot Nothing) Then
                Throw New InvalidOperationException("DocumentId or Uri must not be null, but not both")
            End If

            Dim documentFileName As String = Nothing
            Dim documentStream As Stream = Nothing
            Dim document As Leadtools.Documents.Document = Nothing
            Dim data As Byte() = Nothing
            Dim cache As ObjectCache = ServiceHelper.Cache

            Try
                If request.DocumentId IsNot Nothing Then
                    document = DocumentFactory.LoadFromCache(cache, request.DocumentId)
                    If document IsNot Nothing Then
                        ' Check if we can access the original data through a file path
                        documentFileName = document.GetDocumentFileName()
                        If documentFileName Is Nothing Then
                            ' No, check if we have a a stream to it
                            documentStream = document.GetDocumentStream()
                        End If
                    End If
                Else
                    ' get the last index of /, this is the key name
                    Dim cacheKey As String = Nothing
                    Dim cacheRegion As String = Nothing

                    Dim escape As Char() = New Char() {"/"c, "\"c}
                    Dim uriString As String = request.Uri.ToString()
                    Dim keyIndex As Integer = uriString.LastIndexOfAny(escape)
                    If keyIndex <> -1 AndAlso keyIndex < uriString.Length Then
                        cacheKey = uriString.Substring(keyIndex + 1)
                    End If

                    If Not String.IsNullOrEmpty(cacheKey) AndAlso keyIndex > 0 Then
                        Dim left As Integer = uriString.Length - cacheKey.Length - 1
                        Dim regionIndex As Integer = uriString.LastIndexOfAny(escape, keyIndex - 1, left)
                        If regionIndex <> -1 AndAlso regionIndex < uriString.Length Then
                            cacheRegion = uriString.Substring(regionIndex + 1, keyIndex - regionIndex - 1)
                        End If
                    End If

                    If Not String.IsNullOrEmpty(cacheKey) AndAlso Not String.IsNullOrEmpty(cacheRegion) Then
                        Dim uri As Uri = cache.GetItemExternalResource(cacheKey, cacheRegion, False)
                        documentFileName = ServiceHelper.GetFileUri(uri)
                    End If
                End If

                If documentFileName IsNot Nothing Then
                    Using stream As FileStream = File.OpenRead(documentFileName)
                        data = ServiceHelper.ReadStream(stream, request.Position, request.DataSize)
                    End Using
                ElseIf documentStream IsNot Nothing Then
                    ' No need to lock the document stream, we are the only one using it.
                    data = ServiceHelper.ReadStream(documentStream, request.Position, request.DataSize)
                End If
            Finally
                If document IsNot Nothing Then
                    document.Dispose()
                End If
            End Try

            Dim base64 As String = Nothing
            If data IsNot Nothing Then
                base64 = System.Convert.ToBase64String(data, 0, data.Length)
            End If

            Return New DownloadResponse() With {
               .Data = base64
            }
        End Function
    End Class
End Namespace