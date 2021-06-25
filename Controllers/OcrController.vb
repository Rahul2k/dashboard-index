Imports Leadtools
Imports Leadtools.Codecs
Imports Leadtools.Forms
Imports Leadtools.Forms.Ocr
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Helpers
Imports System
Imports System.Collections.Generic
Imports System.IO
Imports System.Linq
Imports System.Net
Imports System.Net.Http
Imports System.Web

Namespace Controllers
    Public Class OcrController
        Inherits BaseController

        Public Function GetText(ByVal uri As Uri, ByVal imageWidth As Integer, ByVal imageHeight As Integer, ByVal Optional pageNumber As Integer = 1, ByVal Optional left As Integer = 0, ByVal Optional top As Integer = 0, ByVal Optional right As Integer = 0, ByVal Optional bottom As Integer = 0) As String
            If uri Is Nothing Then Throw New ArgumentNullException("uri")
            If pageNumber < 0 Then Throw New ArgumentOutOfRangeException("pageNumber", "must be a value greater than or equal to 0")
            Dim page = pageNumber
            If page = 0 Then page = 1
            If imageWidth < 0 Then Throw New ArgumentOutOfRangeException("imageWidth", "must be a value greater than or equal to 0")
            If imageHeight < 0 Then Throw New ArgumentOutOfRangeException("imageHeight", "must be a value greater than or equal to 0")
            If left < 0 Then Throw New ArgumentOutOfRangeException("left", "must be a value greater than or equal to 0")
            If top < 0 Then Throw New ArgumentOutOfRangeException("top", "must be a value greater than or equal to 0")
            If right < 0 Then Throw New ArgumentOutOfRangeException("right", "must be a value greater than or equal to 0")
            If bottom < 0 Then Throw New ArgumentOutOfRangeException("bottom", "must be a value greater than or equal to 0")
            Dim tempFile As String = Path.GetTempFileName()
            Try
                If uri.ToString.StartsWith(Chr(225)) Then
                    Dim Urid = Common.DecryptURLParameters(uri.ToString)
                    uri = New Uri(HttpUtility.UrlDecode(HttpUtility.UrlDecode(Urid)))
                End If
                Using client As WebClient = New WebClient()
                    client.DownloadFile(uri, tempFile)
                End Using

                Using codecs As RasterCodecs = New RasterCodecs()
                    ServiceHelper.InitCodecs(codecs, ServiceHelper.DefaultResolution)

                    Using ocrEngine As IOcrEngine = ServiceHelper.CreateOCREngine(codecs)
                        Dim rasterImage As RasterImage = codecs.Load(tempFile, pageNumber)

                        Using ocrPage As IOcrPage = ocrEngine.CreatePage(rasterImage, OcrImageSharingMode.AutoDispose)

                            If right <> 0 AndAlso bottom <> 0 Then
                                Dim bounds As LogicalRectangle = LogicalRectangle.FromLTRB(left, top, right, bottom, LogicalUnit.Pixel)
                                Dim resizer As ImageResizer = New ImageResizer(ocrPage.Width, ocrPage.Height, imageWidth, imageHeight)
                                If resizer.IsNeeded Then bounds = resizer.ToImage(bounds)
                                Dim zone As OcrZone = New OcrZone()
                                zone.ZoneType = OcrZoneType.Text
                                zone.Bounds = bounds
                                ocrPage.Zones.Add(zone)
                            Else
                                ocrPage.AutoPreprocess(OcrAutoPreprocessPageCommand.Invert, Nothing)
                            End If

                            ocrPage.Recognize(Nothing)
                            Dim text As String = ocrPage.GetText(-1)
                            Dim currentContext As HttpContext = System.Web.HttpContext.Current

                            If currentContext IsNot Nothing Then
                                currentContext.Response.ContentType = "text/plain"
                                currentContext.Response.Headers.Add("ContentLength", (text.Length * 2).ToString())
                            End If

                            Return text
                        End Using
                    End Using
                End Using

            Finally

                If System.IO.File.Exists(tempFile) Then

                    Try
                        System.IO.File.Delete(tempFile)
                    Catch
                    End Try
                End If
            End Try
        End Function




    End Class
End Namespace