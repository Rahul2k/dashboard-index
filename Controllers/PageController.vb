Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Model.Page
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Exceptions
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Helpers
Imports Leadtools
Imports Leadtools.Documents
Imports Leadtools.Codecs
Imports Leadtools.Forms.Ocr
Imports Leadtools.Svg
Imports System.Collections.Generic
Imports System.Diagnostics
Imports System.IO
Imports System.IO.Compression
Imports System.Linq
Imports System.Net
Imports System.Net.Http
Imports System.Web
Imports System.Web.Http
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Model
Imports System.Web.Hosting

Namespace TABFusionRMS.Web.Controllers
    ''' <summary>
    ''' Used with the DocumentPage class of the LEADTOOLS Documents JavaScript library.
    ''' </summary>
    Public Class PageController
        Inherits ApiController
        ' Page/
        '       *    GET GetImage
        '       *    GET GetSvgBackImage
        '       *    GET GetThumbnail
        '       *    GET GetSvg
        '       *    
        '       *    POST GetText
        '       *    POST ReadBarcodes
        '       *    
        '       *    == LINKED ==
        '       *    POST SetAnnotations
        '       *    POST GetAnnotations
        '       


        ' These endpoints will not necessarily return objects,
        '       * since most of the time the returned streams
        '       * will be set directly to a URL.
        '       


        ' We use HttpResponseMessage now in WebApi because
        '       * if we just returned a stream, WebApi would try to automatically
        '       * serialize it as JSON or XML. By constructing our own response
        '       * we will not have the body content serialized automatically.
        '       


        Public Sub New()
            ServiceHelper.InitializeController()
        End Sub

        ''' <summary>
        ''' Gets the image for this page of the document - not as SVG.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document's page image could not be loaded")>
        <HttpGet, AlwaysCorsFilter>
        Public Function GetImage(<FromUri> request As GetImageRequest) As HttpResponseMessage
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            Dim pageNumber As Integer = request.PageNumber

            If String.IsNullOrEmpty(request.DocumentId) Then
                Throw New ArgumentException("documentId must not be null")
            End If

            If pageNumber < 0 Then
                Throw New ArgumentException("'pageNumber' must be a value greater than or equal to 0")
            End If

            ' Default is page 1
            If pageNumber = 0 Then
                pageNumber = 1
            End If

            If request.Resolution < 0 Then
                Throw New ArgumentException("'resolution' must be a value greater than or equal to 0")
            End If

            ' Sanity check on other parameters
            If request.QualityFactor < 0 OrElse request.QualityFactor > 100 Then
                Throw New ArgumentException("'qualityFactor' must be a value between 0 and 100")
            End If

            If request.Width < 0 OrElse request.Height < 0 Then
                Throw New ArgumentException("'width' and 'height' must be value greater than or equal to 0")
            End If

            ' Get the image format
            Dim saveFormat As SaveImageFormat = SaveImageFormat.GetFromMimeType(request.MimeType)

            ' Now load the document
            Dim cache As Caching.ObjectCache = ServiceHelper.Cache
            Using document As Document = DocumentFactory.LoadFromCache(cache, request.DocumentId)
                DocumentHelper.CheckLoadFromCache(document)
                DocumentHelper.CheckPageNumber(document, pageNumber)

                Dim documentPage As DocumentPage = document.Pages(pageNumber - 1)
                Using image As RasterImage = documentPage.GetImage(request.Resolution)
                    ' Resize it (will only resize if both width and height are not 0), will also take care of FAX images (with different resolution)
                    ImageResizer.ResizeImage(image, request.Width, request.Height)
                    Dim stream As Stream = ImageSaver.SaveImage(image, document.RasterCodecs, saveFormat, request.MimeType, request.BitsPerPixel, request.QualityFactor)

                    ' If we just return the stream, Web Api will try to serialize it.
                    ' If the return type is "HttpResponseMessage" it will not serialize
                    ' and you can set the content as you wish.
                    Dim response As HttpResponseMessage = New HttpResponseMessage()
                    response.Content = New StreamContent(stream)
                    ServiceHelper.UpdateCacheSettings(response)
                    Return response
                End Using
            End Using
        End Function

        'private const string smallest_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        Private Const smallest_GIF_base64 As String = "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="

        ''' <summary>
        ''' Gets the SVG back image if one exists for this document page's SVG. If not, returns the smallest possible GIF so the request 
        ''' does not fail.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="Part of the document's page image could not be loaded")>
        <HttpGet, AlwaysCorsFilter>
        Public Function GetSvgBackImage(<FromUri> request As GetSvgBackImageRequest) As HttpResponseMessage
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            Dim pageNumber As Integer = request.PageNumber

            If String.IsNullOrEmpty(request.DocumentId) Then
                Throw New ArgumentException("documentId must not be null")
            End If

            If pageNumber < 0 Then
                Throw New ArgumentException("'pageNumber' must be a value greater than or equals to 0")
            End If

            ' Default is page 1
            If pageNumber = 0 Then
                pageNumber = 1
            End If

            If request.Resolution < 0 Then
                Throw New ArgumentException("'resolution' must be a value greater than or equal to 0")
            End If

            ' Sanity check on other parameters
            If request.QualityFactor < 0 OrElse request.QualityFactor > 100 Then
                Throw New ArgumentException("'qualityFactor' must be a value between 0 and 100")
            End If

            If request.Width < 0 OrElse request.Height < 0 Then
                Throw New ArgumentException("'width' and 'height' must be value greater than or equal to 0")
            End If

            ' Get the image format
            Dim saveFormat As SaveImageFormat = SaveImageFormat.GetFromMimeType(request.MimeType)

            Dim rasterBackColor As RasterColor = RasterColor.White

            If request.BackColor IsNot Nothing Then
                Try
                    rasterBackColor = RasterColor.FromHtml(request.BackColor)
                Catch ex As Exception
                    Trace.WriteLine(String.Format("GetImage - Error:{1}{0}documentId:{2} pageNumber:{3}", Environment.NewLine, ex.Message, request.DocumentId, pageNumber), "Error")
                End Try
            End If

            ' Now load the document
            Dim cache As Caching.ObjectCache = ServiceHelper.Cache
            Using document As Document = DocumentFactory.LoadFromCache(cache, request.DocumentId)
                DocumentHelper.CheckLoadFromCache(document)
                DocumentHelper.CheckPageNumber(document, pageNumber)

                Dim documentPage As DocumentPage = document.Pages(pageNumber - 1)
                Dim image As RasterImage = documentPage.GetSvgBackImage(rasterBackColor, request.Resolution)
                If image IsNot Nothing Then
                    Try
                        ' Resize it (will only resize if both width and height are not 0), will also take care of FAX images (with different resolution)
                        ImageResizer.ResizeImage(image, request.Width, request.Height)
                        Dim stream As Stream = ImageSaver.SaveImage(image, document.RasterCodecs, saveFormat, request.MimeType, request.BitsPerPixel, request.QualityFactor)

                        ' If we just return the stream, Web Api will try to serialize it.
                        ' If the return type is "HttpResponseMessage" it will not serialize
                        ' and you can set the content as you wish.
                        Dim response As HttpResponseMessage = New HttpResponseMessage()
                        response.Content = New StreamContent(stream)
                        ServiceHelper.UpdateCacheSettings(response)
                        Return response
                    Finally
                        image.Dispose()
                    End Try
                Else
                    ' Instead of throwing an exception, let's return the smallest possible GIF
                    'throw new ServiceException("No SVG Back Image exists", HttpStatusCode.NotFound);

                    Dim response As HttpResponseMessage = New HttpResponseMessage()
                    Dim data As Byte() = Convert.FromBase64String(PageController.smallest_GIF_base64)
                    Dim ms As MemoryStream = New MemoryStream(data)
                    response.Content = New StreamContent(ImageSaver.PrepareStream(ms, "image/gif"))
                    ServiceHelper.UpdateCacheSettings(response)
                    Return response
                End If
            End Using
        End Function

        ''' <summary>
        ''' Gets a smaller version of this image for use as a thumbnail.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document's page thumbnail could not be loaded")>
        <HttpGet, AlwaysCorsFilter>
        Public Function GetThumbnail(<FromUri> request As GetThumbnailRequest) As HttpResponseMessage
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            Dim pageNumber As Integer = request.PageNumber

            If String.IsNullOrEmpty(request.DocumentId) Then
                Throw New ArgumentException("documentId must not be null")
            End If

            If pageNumber < 0 Then
                Throw New ArgumentException("'pageNumber' must be a value greater than or equals to 0")
            End If

            ' Default is page 1
            If pageNumber = 0 Then
                pageNumber = 1
            End If

            If request.Width < 0 OrElse request.Height < 0 Then
                Throw New ArgumentException("'width' and 'height' must be value greater than or equal to 0")
            End If

            ' Get the image format
            Dim saveFormat As SaveImageFormat = SaveImageFormat.GetFromMimeType(request.MimeType)

            ' Now load the document
            Dim cache As Caching.ObjectCache = ServiceHelper.Cache
            Using document As Document = DocumentFactory.LoadFromCache(cache, request.DocumentId)
                DocumentHelper.CheckLoadFromCache(document)
                DocumentHelper.CheckPageNumber(document, pageNumber)

                If request.Width > 0 AndAlso request.Height > 0 Then
                    document.Images.ThumbnailPixelSize = New LeadSize(request.Width, request.Height)
                End If

                Dim documentPage As DocumentPage = document.Pages(pageNumber - 1)
                Using image As RasterImage = documentPage.GetThumbnailImage()
                    Dim stream As Stream = ImageSaver.SaveImage(image, document.RasterCodecs, saveFormat, request.MimeType, 0, 0)

                    ' If we just return the stream, Web Api will try to serialize it.
                    ' If the return type is "HttpResponseMessage" it will not serialize
                    ' and you can set the content as you wish.
                    Dim response As HttpResponseMessage = New HttpResponseMessage()
                    response.Content = New StreamContent(stream)
                    ServiceHelper.UpdateCacheSettings(response)
                    Return response
                End Using
            End Using
        End Function

        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope")>
        Private Shared Function ToStream(svgDocument As SvgDocument, gzip As Boolean) As Stream
            Dim ms As MemoryStream = New MemoryStream()

            Dim svgSaveOptions As SvgSaveOptions = New SvgSaveOptions()

            If gzip Then
                Using compressed As GZipStream = New GZipStream(ms, CompressionMode.Compress, True)
                    ' unfortunately svgDocument.SaveToStream wants to read the stream current position
                    ' and GZipStream.Position is not supported
                    ' svgDocument.SaveToStream(compressed, new SvgSaveOptions() { });

                    ' Save to a temp stream first
                    Using tempStream As MemoryStream = New MemoryStream()
                        svgDocument.SaveToStream(tempStream, svgSaveOptions)
                        tempStream.Position = 0
                        ServiceHelper.CopyStream(tempStream, compressed)
                    End Using
                End Using
            Else
                svgDocument.SaveToStream(ms, svgSaveOptions)
            End If

            ms.Position = 0
            Return ms
        End Function

        '
        '       * To support POST, use the below lines instead:
        '       * // [HttpPost, AlwaysCorsFilter]
        '       * // public HttpResponseMessage GetSvg(GetSvgRequest request)
        '       
        ''' <summary>
        ''' Gets the page image as an SVG.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document's page image could not be loaded")>
        <HttpGet, AlwaysCorsFilter>
        Public Function GetSvg(<FromUri> request As GetSvgRequest) As HttpResponseMessage
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            Dim pageNumber As Integer = request.PageNumber

            If String.IsNullOrEmpty(request.DocumentId) Then
                Throw New ArgumentException("documentId must not be null")
            End If

            If pageNumber < 0 Then
                Throw New ArgumentException("'pageNumber' must be a value greater than or equals to 0")
            End If

            ' Default is page 1
            If pageNumber = 0 Then
                pageNumber = 1
            End If

            ' Now load the document
            Dim cache As Caching.ObjectCache = ServiceHelper.Cache
            Using document As Document = DocumentFactory.LoadFromCache(cache, request.DocumentId)
                DocumentHelper.CheckLoadFromCache(document)
                DocumentHelper.CheckPageNumber(document, pageNumber)

                document.Images.UnembedSvgImages = request.UnembedImages

                Dim documentPage As DocumentPage = document.Pages(pageNumber - 1)
                Dim loadOptions As CodecsLoadSvgOptions = New CodecsLoadSvgOptions()
                loadOptions.ForceTextPath = (request.Options And DocumentGetSvgOptions.ForceTextPath) = DocumentGetSvgOptions.ForceTextPath
                loadOptions.ForceRealText = (request.Options And DocumentGetSvgOptions.ForceRealText) = DocumentGetSvgOptions.ForceRealText
                loadOptions.DropImages = (request.Options And DocumentGetSvgOptions.DropImages) = DocumentGetSvgOptions.DropImages
                loadOptions.DropShapes = (request.Options And DocumentGetSvgOptions.DropShapes) = DocumentGetSvgOptions.DropShapes
                loadOptions.DropText = (request.Options And DocumentGetSvgOptions.DropText) = DocumentGetSvgOptions.DropText
                loadOptions.ForConversion = (request.Options And DocumentGetSvgOptions.ForConversion) = DocumentGetSvgOptions.ForConversion
                loadOptions.IgnoreXmlParsingErrors = (request.Options And DocumentGetSvgOptions.IgnoreXmlParsingErrors) = DocumentGetSvgOptions.IgnoreXmlParsingErrors

                Using svgDocument As SvgDocument = documentPage.GetSvg(loadOptions)
                    If svgDocument IsNot Nothing Then
                        If Not svgDocument.IsFlat Then
                            svgDocument.Flat(Nothing)
                        End If

                        If Not svgDocument.IsRenderOptimized Then
                            svgDocument.BeginRenderOptimize()
                        End If

                        Dim svgBounds As SvgBounds = svgDocument.Bounds
                        If Not svgBounds.IsValid Then
                            svgDocument.CalculateBounds(False)
                        End If
                    End If

                    If svgDocument IsNot Nothing Then
                        Dim gzip As Boolean = False
                        Dim gzipString As String = ServiceHelper.GetSettingValue(ServiceHelper.Key_Svg_GZip)
                        If Not String.IsNullOrEmpty(gzipString) Then
                            If Not Boolean.TryParse(gzipString, gzip) Then
                                gzip = False
                            End If
                        End If

                        Dim stream As Stream = ToStream(svgDocument, gzip)

                        ' HttpContext is Web Api's version of WebOperationContext
                        'var currentContext = WebOperationContext.Current;
                        Dim currentContext As HttpContext = HttpContext.Current
                        If currentContext IsNot Nothing Then
                            If gzip Then
                                currentContext.Response.Headers.Add("Content-Encoding", "gzip")
                            End If

                            currentContext.Response.ContentType = "image/svg+xml"
                            currentContext.Response.Headers.Add("ContentLength", stream.Length.ToString())
                        End If

                        ' If we just return the stream, Web Api will try to serialize it.
                        ' If the return type is "HttpResponseMessage" it will not serialize
                        ' and you can set the content as you wish.
                        Dim response As HttpResponseMessage = New HttpResponseMessage()
                        response.Content = New StreamContent(stream)
                        ServiceHelper.UpdateCacheSettings(response)
                        Return response
                    Else
                        Return Nothing
                    End If
                End Using
            End Using
        End Function

        ''' <summary>
        ''' Gets the OCR'd text for this document page.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document page's text could not be retrieved")>
        <HttpPost>
        Public Function GetText(request As GetTextRequest) As GetTextResponse
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            Dim pageNumber As Integer = request.PageNumber

            If String.IsNullOrEmpty(request.DocumentId) Then
                Throw New ArgumentException("documentId must not be null")
            End If

            If pageNumber < 0 Then
                Throw New ArgumentException("'pageNumber' must be a value greater than or equal to 0")
            End If

            ' Default is page 1
            If pageNumber = 0 Then
                pageNumber = 1
            End If

            Dim ocrEngine As IOcrEngine = Nothing

            Try
                ' Now load the document
                Dim cache As Caching.ObjectCache = ServiceHelper.Cache
                Using document As Document = DocumentFactory.LoadFromCache(cache, request.DocumentId)
                    DocumentHelper.CheckLoadFromCache(document)
                    DocumentHelper.CheckPageNumber(document, pageNumber)

                    document.Text.TextExtractionMode = request.TextExtractionMode

                    Dim documentPage As DocumentPage = document.Pages(pageNumber - 1)

                    If document.Text.TextExtractionMode <> DocumentTextExtractionMode.OcrOnly AndAlso Not document.Images.IsSvgSupported Then
                        ocrEngine = ServiceHelper.GetOCREngine()
                        If ocrEngine IsNot Nothing Then
                            document.Text.OcrEngine = ocrEngine
                        End If
                    End If

                    Dim pageText As DocumentPageText = documentPage.GetText(request.Clip)
                    Return New GetTextResponse() With {
                       .PageText = pageText
                    }
                End Using
            Catch ex As Exception
                Trace.WriteLine(String.Format("GetText - Error:{1}{0}documentId:{2} pageNumber:{3}", Environment.NewLine, ex.Message, request.DocumentId, pageNumber), "Error")
                Throw
            End Try
        End Function

        ' Also applies to Document.Annotations.GetAnnotations
        ''' <summary>
        ''' Gets any annotations that may exist on this page.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The annotations for the page could not be retrieved")>
        <HttpPost>
        Public Function GetAnnotations(request As GetAnnotationsRequest) As GetAnnotationsResponse
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            Return AnnotationMethods.GetAnnotations(request)
        End Function

        ' Also applies to Document.Annotations.SetAnnotations
        ''' <summary>
        ''' Sets the annotations for this page.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The annotations for the page could not be set")>
        <HttpPost>
        Public Function SetAnnotations(request As SetAnnotationsRequest) As Response
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            Return AnnotationMethods.SetAnnotations(request)
        End Function
    End Class
End Namespace