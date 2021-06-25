Imports Leadtools.Codecs
Imports Leadtools.Documents
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Exceptions
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Helpers
Imports System.IO
Imports System.Net
Imports System.Net.Http
Imports System.Net.Http.Headers
Imports System.Net.Mime
Imports System.Web
Imports System.Web.Http

Namespace TABFusionRMS.Web.Controllers
    Public Class CacheController
        Inherits ApiController
        Public Sub New()
            ServiceHelper.InitializeController()
        End Sub

        <NonAction>
        Public Shared Sub TrySetCacheUri(document As Document)
            ' If your cache is in a separate service, you can customize the URL that is used to access the cached item
            '          * data.
            '          * Alternatively, if using the LEADTOOLS FileCache, you can set the CacheVirtualDirectory value
            '          * to something like "cache". When returning from the cache, a document's CacheUri will be
            '          * pre-set to [CacheVirtualDirectory]/[CacheRegion]/[CacheItemId].
            '          * This is optimal for simple cases where the CacheVirtualDirectory points to a filesystem that is
            '          * hosted via IIS.
            '          * 
            '          * If Document.CacheUri is null, it is set in the JavaScript to access the CacheController.GetDocumentData
            '          * method below.
            '          


            'if (document != null)
            '{
            '   document.CacheUri = new Uri(string.Format("http://my-cache.com/getItem?id={0}", document.DocumentId));
            '}
        End Sub

        ''' <summary>
        ''' Retrieves the document data.
        ''' </summary>
        <AlwaysCorsFilter>
        <ServiceErrorAttribute(Message:="The document data could not be loaded")>
        <HttpGet>
        Public Function GetDocumentData(documentId As String) As HttpResponseMessage
            Dim cache As Leadtools.Caching.ObjectCache = ServiceHelper.Cache
            Using document As Document = DocumentFactory.LoadFromCache(cache, documentId)
                DocumentHelper.CheckLoadFromCache(document)
                Dim documentFileName As String = Nothing
                Dim documentStream As Stream = Nothing

                ' When the document is in the cache, it will either have a file name (File cache) or a stream (any other cache)
                documentFileName = document.GetDocumentFileName()
                If documentFileName Is Nothing Then
                    Dim originalDocumentStream As Stream = document.GetDocumentStream()
                    If originalDocumentStream IsNot Nothing Then
                        documentStream = New MemoryStream()
                        document.LockStreams()
                        Try
                            ServiceHelper.CopyStream(originalDocumentStream, documentStream)
                        Finally
                            document.UnlockStreams()
                        End Try
                        documentStream.Position = 0
                    End If
                End If

                Dim response As HttpResponseMessage = New HttpResponseMessage()
                response.Headers.Remove("Accept-Ranges")
                response.Headers.Remove("Access-Control-Expose-Headers")
                response.Headers.Add("Access-Control-Expose-Headers", "Accept-Ranges, Content-Encoding, Content-Length")

                Dim contentType As String = document.MimeType
                Dim push As StreamPusher = New StreamPusher(documentFileName, documentStream)

                response.StatusCode = HttpStatusCode.OK
                response.Content = New PushStreamContent(DirectCast(AddressOf push.Write, Action(Of Stream, HttpContent, TransportContext)), New MediaTypeHeaderValue(contentType))
                Return response
            End Using
        End Function

        ' Creates a URL that is returned to the client.
        '       * The client will call this URL to view the conversion result.
        '       * We return a URL that looks like a direct folder access. This is possible
        '       * due to the routing setup in WebApiConfig.cs and Web.config.
        '       

        <NonAction>
        Public Shared Function CreateConversionResultUri(region As String, key As String) As Uri
            Return New Uri(String.Format("Cache/Item/{0}/{1}", region, key), UriKind.Relative)
        End Function

        ''' <summary>
        ''' Retrieves a cache item.
        ''' </summary>
        <AlwaysCorsFilter>
        <ServiceErrorAttribute(Message:="The cache item could not be returned")>
        <HttpGet>
        Public Function Item(region As String, key As String) As HttpResponseMessage
            Dim cacheDirectory As String = ServiceHelper.GetSettingValue(ServiceHelper.Key_Cache_Directory)
            cacheDirectory = ServiceHelper.GetAbsolutePath(cacheDirectory)
            If String.IsNullOrEmpty(cacheDirectory) Then
                Throw New ServiceException("Cache directory cannot be retrieved, set the cache path in '" & ServiceHelper.Key_Cache_Directory & "' in the configuration file", HttpStatusCode.InternalServerError)
            End If

            Dim fullPath As String = Path.GetFullPath(Path.Combine(cacheDirectory, region, key))

            If Not File.Exists(fullPath) Then
                Throw New ServiceException("File not found", HttpStatusCode.NotFound)
            End If

            Dim response As HttpResponseMessage = New HttpResponseMessage()

            If fullPath.EndsWith(".data") Then
                response.Headers.Remove("Accept-Ranges")

                response.Headers.Remove("Access-Control-Expose-Headers")
                response.Headers.Add("Access-Control-Expose-Headers", "Accept-Ranges, Content-Encoding, Content-Length")
            Else
                ' For "Save to Google Drive" access, we must have the appropriate CORS headers.
                ' See https://developers.google.com/drive/v3/web/savetodrive
                response.Headers.Remove("Access-Control-Allow-Headers")
                response.Headers.Add("Access-Control-Allow-Headers", "Range")
                response.Headers.Remove("Access-Control-Expose-Headers")
                response.Headers.Add("Access-Control-Expose-Headers", "Cache-Control, Content-Encoding, Content-Range")
            End If

            Try
                Dim contentType As String = "application/octet-stream"
                Try
                    Dim extension As String = Path.GetExtension(fullPath)

                    ' ZIP is not handled by RasterCodecs, so check it here
                    If Not String.IsNullOrEmpty(extension) AndAlso Not extension.EndsWith("zip", StringComparison.OrdinalIgnoreCase) Then
                        ' Use RasterCodecs helper method to get it
                        Dim extensionContentType As String = RasterCodecs.GetExtensionMimeType(extension)
                        If Not String.IsNullOrWhiteSpace(extensionContentType) Then
                            contentType = extensionContentType
                        End If
                    End If
                Catch
                End Try

                Dim push As StreamPusher = New StreamPusher(fullPath, Nothing)

                response.StatusCode = HttpStatusCode.OK
                response.Content = New PushStreamContent(DirectCast(AddressOf push.Write, Action(Of Stream, HttpContent, TransportContext)), New MediaTypeHeaderValue(contentType))
                Dim disposition As ContentDisposition = New ContentDisposition() With {
                   .DispositionType = DispositionTypeNames.Inline,
                   .FileName = key
                }
                response.Content.Headers.Add("Content-Disposition", disposition.ToString())

                Return response
            Catch generatedExceptionName As IOException
                Throw New ServiceException("File could not be streamed", HttpStatusCode.InternalServerError)
            End Try
        End Function
    End Class

    Class StreamPusher
        Private _stream As Stream
        Private _file As String
        Public Sub New(file As String, stream As Stream)
            If file Is Nothing AndAlso stream Is Nothing Then
                Throw New InvalidOperationException("Either file or stream must not be null")
            End If
            If file IsNot Nothing AndAlso stream IsNot Nothing Then
                Throw New InvalidOperationException("Either file or stream must be null")
            End If

            _file = file
            _stream = stream
        End Sub

        Public Sub Write(outputStream As Stream, content As HttpContent, context As TransportContext)
            Try
                If _file IsNot Nothing Then
                    Using fs As FileStream = File.OpenRead(_file)
                        ServiceHelper.CopyStream(fs, outputStream)
                    End Using
                Else
                    ServiceHelper.CopyStream(_stream, outputStream)
                End If
            Finally
                outputStream.Close()
            End Try
        End Sub
    End Class



End Namespace