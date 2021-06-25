Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Model.Structure
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Exceptions
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Helpers
Imports Leadtools.Documents
Imports System.Collections.Generic
Imports System.Linq
Imports System.Net
Imports System.Net.Http
Imports System.Web.Http

Namespace TABFusionRMS.Web.Controllers
    Public Class StructureController
        Inherits ApiController
        ' Structure/
        '       *    GET ParseStructure
        '       


        Public Sub New()
            ServiceHelper.InitializeController()
        End Sub

        ''' <summary>
        ''' Parses the structure of the document. Only needed to be called once for each document.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The document's structure could not be parsed", MethodName:="Parse")>
        <HttpPost>
        Public Function ParseStructure(request As ParseStructureRequest) As ParseStructureResponse
            If request Is Nothing Then
                Throw New ArgumentNullException("request")
            End If

            If String.IsNullOrEmpty(request.DocumentId) Then
                Throw New ArgumentException("documentId must not be null")
            End If

            ' Now load the document
            Dim cache As Leadtools.Caching.ObjectCache = ServiceHelper.Cache
            Using document As Document = DocumentFactory.LoadFromCache(cache, request.DocumentId)
                DocumentHelper.CheckLoadFromCache(document)

                If Not document.IsStructureSupported Then
                    Return New ParseStructureResponse()
                End If

                If Not document.[Structure].IsParsed Then
                    document.[Structure].ParseBookmarks = request.ParseBookmarks
                    document.[Structure].ParsePageLinks = request.ParsePageLinks
                    document.[Structure].Parse()
                End If

                Dim pageLinks As List(Of DocumentLink()) = New List(Of DocumentLink())()
                Dim bookmarks As List(Of DocumentBookmark) = New List(Of DocumentBookmark)()

                bookmarks.AddRange(document.[Structure].Bookmarks)

                For Each page As DocumentPage In document.Pages
                    Dim links As DocumentLink() = page.GetLinks()
                    pageLinks.Add(links)
                Next

                Return New ParseStructureResponse() With {
                   .Bookmarks = bookmarks.ToArray(),
                   .PageLinks = pageLinks.ToArray()
                }
            End Using
        End Function
    End Class
End Namespace