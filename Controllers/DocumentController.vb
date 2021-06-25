Imports System.Net
Imports System.Web.Http
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Model.Document
Imports TabFusionRMS.WebVB.TabFusionRMS.Web.Tool.Exceptions
Imports Leadtools.Documents
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Helpers

Namespace TABFusionRMS.Web.Controllers
    ''' <summary>
    ''' Used with the Document class of the LEADTOOLS Documents JavaScript library.
    ''' </summary>
    Public Class DocumentController
        Inherits ApiController
        ' Document/
        '       *    POST Decrypt
        '       *    POST Convert
        '       *    
        '       * additional methods like get/set annotations would be in
        '       * the annotations property (in AnnotationsController)
        '       


        Public Sub New()
            ServiceHelper.InitializeController()
        End Sub

        ''' <summary>
        '''  Returns a decrypted version of the document when passed the correct password, or throws an exception.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document's decryption failed")>
        <HttpPost>
        Public Function Decrypt(request As DecryptRequest) As DecryptResponse
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            If request.DocumentId Is Nothing Then
                Throw New ArgumentException("documentId must not be null")
            End If

            Dim cache As Leadtools.Caching.ObjectCache = ServiceHelper.Cache

            Using document As Document = DocumentFactory.LoadFromCache(cache, request.DocumentId)
                DocumentHelper.CheckLoadFromCache(document)

                If Not document.Decrypt(request.Password) Then
                    Throw New ServiceException("Incorrect Password", HttpStatusCode.Forbidden)
                End If

                document.SaveToCache()
                Return New DecryptResponse() With {
               .Document = document
            }
            End Using
        End Function

        ''' <summary>
        '''  Runs the conversion specified by the conversion job data on the document.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document could not be converted")>
        <HttpPost>
        Public Function Convert(request As ConvertRequest) As ConvertResponse
            Return ConverterHelper.Convert(request.DocumentId, request.JobData)
        End Function
    End Class
End Namespace