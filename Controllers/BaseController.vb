Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.Mvc
Imports System.Threading
Imports System.Globalization
Imports TabFusionRMS.RepositoryVB
Imports Smead.Security
Imports TabFusionRMS.Models


Public Class BaseController
    Inherits Controller

    Public IsWarnning As Boolean = False
    Public IsError As Boolean = False
    Public IsExist As Boolean = False


    Public Sub New()

        Dim BaseWebPage = New BaseWebPage()
        If Not (BaseWebPage.Passport Is Nothing) Then

            Dim strConn = BaseWebPage.Passport.ConnectionString
            If Not strConn.Contains("MultipleActiveResultSets") Then
                strConn = strConn + ";MultipleActiveResultSets=True"
            End If
            RepositoryKeys.StrConnection = strConn
            MySession.Current.sConnectionString = strConn
            Me.SetMetaTag()

        Else
        End If
    End Sub

    Public Sub SetMetaTag()
        If Not System.Web.HttpContext.Current Is Nothing Then
            Dim orgurl = ""
            If (System.Web.HttpContext.Current.Request.Url.ToString().ToLower().Contains("retention") Or System.Web.HttpContext.Current.Request.Url.ToString().ToLower().Contains("scanner") Or System.Web.HttpContext.Current.Request.Url.ToString().ToLower().Contains("import")) Then
                orgurl = ("../data.aspx")
            Else
                orgurl = ("data.aspx")
            End If
            'Dim orgurl = ("data.aspx") '.ToAbsoluteUrl()
            If Not System.Web.HttpContext.Current.Session("Passport") Is Nothing Then
                If CType(System.Web.HttpContext.Current.Session("Passport"), Passport).AutoSignOutSeconds = 0 Then
                    System.Web.HttpContext.Current.Session.Timeout = 1440
                    ViewBag.TimeOutSecounds = 1440 * 60 '19 * 60
                    'ViewBag.TimeOutSecounds = 15
                    'ViewBag.MetaKeywords = String.Format("{0};url={1}?timeout=1", 19 * 60, orgurl)
                Else
                    Dim AutoSignOutSeconds As Int32 = CType(System.Web.HttpContext.Current.Session("Passport"), Passport).AutoSignOutSeconds
                    System.Web.HttpContext.Current.Session.Timeout = AutoSignOutSeconds / 60
                    ViewBag.TimeOutSecounds = CType(System.Web.HttpContext.Current.Session("Passport"), Passport).AutoSignOutSeconds 'changed by GANESH
                    'ViewBag.MetaKeywords = String.Format("{0};url={1}?timeout=1", CType(Session("Passport"), Passport).AutoSignOutSeconds, orgurl)
                End If
                ViewBag.AutoRedirectURL = String.Format("{0}?timeout=1", orgurl)
            End If
        End If

    End Sub

    Public Function GetRefereshDetails(ByVal strPageName As String) As ActionResult

        Return Json(Keys.RefereshDetails(strPageName), "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        'Return Json(CType(System.Web.HttpContext.Current.Session("Passport"), Passport).UserId.ToString(), "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Shadows Function RedirectToAction(action As String, controller As String) As RedirectToRouteResult
        Return MyBase.RedirectToAction(action, controller)
    End Function

    Protected Overrides Sub OnException(filterContext As ExceptionContext)
        'RxLogger o = new RxLogger();
        'if (filterContext == null)
        '    base.OnException(filterContext);
        'o.RxLogInfo = new RxBaseLogger()
        '{
        '    UserName = (string.IsNullOrEmpty(GetUserName())) ? "Guest" : GetUserName(),
        '    Message = filterContext.Exception.Message,
        '    Detail = filterContext.Exception.StackTrace
        '};
        'o.LogError();
        If filterContext.HttpContext.IsCustomErrorEnabled Then
            filterContext.ExceptionHandled = True
        End If

    End Sub

    Protected Overrides Function BeginExecuteCore(callback As AsyncCallback, state As Object) As IAsyncResult
        Dim pCurrentCulture = Keys.GetCultureCookies()
        Thread.CurrentThread.CurrentCulture = pCurrentCulture
        'Thread.CurrentThread.CurrentCulture = New Globalization.CultureInfo("en-US")
        Thread.CurrentThread.CurrentUICulture = pCurrentCulture
        'Thread.CurrentThread.CurrentUICulture = New Globalization.CultureInfo("en-US")

        'Dim cultureCookie As HttpCookie = Request.Cookies("flCurCulture")
        'If cultureCookie IsNot Nothing Then
        '    Dim ci As New CultureInfo(cultureCookie.Value)
        '    If Not String.IsNullOrEmpty(Keys.CurrentUserName) Then
        '        If String.IsNullOrEmpty(Keys.SessionDateFormat) Then
        '            Common.GetDateFormat(ci)
        '        Else
        '            ci.DateTimeFormat.ShortDatePattern = Keys.SessionDateFormat
        '        End If
        '    End If
        '    Thread.CurrentThread.CurrentCulture = ci
        '    Thread.CurrentThread.CurrentUICulture = ci
        'Else
        '    Dim strLanguages() As String
        '    strLanguages = Request.UserLanguages
        '    Dim objCookie As New HttpCookie("flCurCulture")
        '    objCookie.Value = strLanguages(0)
        '    objCookie.Expires = DateTime.Now.AddDays(1)
        '    Response.Cookies.Add(objCookie)
        '    Dim ci As New CultureInfo(strLanguages(0))
        '    Thread.CurrentThread.CurrentCulture = ci
        '    Thread.CurrentThread.CurrentUICulture = ci
        'End If
        Return MyBase.BeginExecuteCore(callback, state)
    End Function

End Class

