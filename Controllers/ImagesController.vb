Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Helpers
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Exceptions
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Model.Images
Imports Leadtools
Imports Leadtools.Documents
Imports System.Collections.Generic
Imports System.IO
Imports System.Linq
Imports System.Net
Imports System.Net.Http
Imports System.Web.Http

Namespace TABFusionRMS.Web.Controllers
    ''' <summary>
    ''' Used with the DocumentImages class of the LEADTOOLS Documents JavaScript library.
    ''' </summary>
    Public Class ImagesController
        Inherits ApiController
        ' Images/
        '       *    GET GetThumbnailsGrid
        '       


        ' These endpoints will not necessarily return objects,
        '       * since most of the time the returned streams
        '       * will be set directly to a URL.
        '       


        ' We use HttpResponseMessage now in WebApi because
        '       * if we just returned a stream, WebApi would try to automatically
        '       * serialize it as JSON or XML. By constructing our own response
        '       * we will not have the body content serialized automatically.
        '       * See PageController for more examples.
        '       


        Public Sub New()
            ServiceHelper.InitializeController()
        End Sub

        ''' <summary>
        ''' Retrieves thumbnails as a grid, instead of as individual images.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Reliability", "CA2000:Dispose objects before losing scope")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The thumbnails could not be retrieved")>
        <HttpGet, AlwaysCorsFilter>
        Public Function GetThumbnailsGrid(<FromUri> request As GetThumbnailsGridRequest) As HttpResponseMessage
            If request Is Nothing Then
                Throw New ArgumentNullException("request", "must not be null")
            End If

            If String.IsNullOrEmpty(request.DocumentId) Then
                Throw New ArgumentException("documentId", "must not be null")
            End If

            If request.FirstPageNumber < 0 Then
                Throw New ArgumentException("'firstPageNumber' must be a value greater than or equal to 0")
            End If

            Dim firstPageNumber As Integer = request.FirstPageNumber
            Dim lastPageNumber As Integer = request.LastPageNumber

            ' Default is page 1 and -1
            If firstPageNumber = 0 Then
                firstPageNumber = 1
            End If
            If lastPageNumber = 0 Then
                lastPageNumber = -1
            End If

            If request.Width < 0 OrElse request.Height < 0 Then
                Throw New ArgumentException("'width' and 'height' must be value greater than or equal to 0")
            End If
            If request.MaximumGridWidth < 0 Then
                Throw New ArgumentException("'maximumGridWidth' must be a value greater than or equal to 0")
            End If

            ' Get the image format
            Dim saveFormat As SaveImageFormat = SaveImageFormat.GetFromMimeType(request.MimeType)

            ' Now load the document
            Dim cache As Caching.ObjectCache = ServiceHelper.Cache
            Using document As Document = DocumentFactory.LoadFromCache(cache, request.DocumentId)
                DocumentHelper.CheckLoadFromCache(document)

                If request.Width > 0 AndAlso request.Height > 0 Then
                    document.Images.ThumbnailPixelSize = New LeadSize(request.Width, request.Height)
                End If

                Using image As RasterImage = document.Images.GetThumbnailsGrid(firstPageNumber, lastPageNumber, request.MaximumGridWidth)
                    Dim stream As Stream = ImageSaver.SaveImage(image, document.RasterCodecs, saveFormat, request.MimeType, 0, 0)

                    ' If we just return the stream, Web Api will try to serialize it.
                    ' If the return type is "HttpResponseMessage" it will not serialize
                    ' and you can set the content as you wish.
                    Dim result As HttpResponseMessage = New HttpResponseMessage()
                    result.Content = New StreamContent(stream)
                    ServiceHelper.UpdateCacheSettings(result)
                    Return result
                End Using
            End Using
        End Function
    End Class
End Namespace