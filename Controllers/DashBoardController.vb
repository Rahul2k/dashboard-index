Imports System.Web.Mvc
Imports Smead.Security

Namespace Controllers
    Public Class DashBoardController
        Inherits BaseController
        Private ReadOnly Property _passport() As Passport
            Get
                Return CType(Session("Passport"), Passport)
            End Get
        End Property
        ' GET: DashBoard
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace