Imports System.Web.Mvc
Imports System.Web.Script.Serialization
Imports Smead.RecordsManagement
Imports Smead.Security
Imports TabFusionRMS.Models
Imports TabFusionRMS.RepositoryVB

Namespace Controllers
    Public Class DataToolsLayoutController
        Inherits BaseController

        ' GET: DataToolsLayout
        Dim Basewebpage As New BaseWebPage
        Dim _iLookupType As IRepository(Of LookupType) = New RepositoryVB.Repositories(Of LookupType)
        Public ReadOnly Property LevelManager() As LevelManager
            Get
                Return CType(Session("LevelManager"), LevelManager)
            End Get
        End Property
        Public Enum ids
            None
            Password
            Index
            RequestDetails
            BatchRequest
            Tools
            FinalDisposition
            Localize
        End Enum
        <HttpGet>
        Public Function LoadControls(id As Integer) As ActionResult
            Dim model = New DataToolsLayoutModel()
            Try
                Select Case id
                    Case ids.Password
                        model.Title = Languages.Translation("ChangePassword")
                        Return PartialView("_password", model)
                    Case ids.Localize
                        model.Title = Languages.Translation("lnkToolsLanguageAndRegion")
                        showLocalization(model)
                        Return PartialView("_localization", model)
                    Case ids.Index
                        model.Title = Languages.Translation("tiDialogBoxIndexAttachment")
                    Case ids.RequestDetails
                        model.Title = Languages.Translation("RequestDetails")
                    Case ids.BatchRequest
                        model.Title = Languages.Translation("BatchRequest")
                        Return PartialView("_batchRequest", model)
                    Case ids.Tools  'Done
                        model.Title = Languages.Translation("tiDialogBoxTools")
                        Return PartialView("_tools", model)
                End Select
            Catch ex As Exception

            End Try

            Return PartialView("", model)
        End Function
        Private Sub showLocalization(model As DataToolsLayoutModel)
            Try
                Dim pDateForm = _iLookupType.All.Where(Function(m) m.LookupTypeForCode.Trim.ToUpper.Equals(("DTFRM").Trim.ToUpper)).OrderBy(Function(m) m.SortOrder)
                '' Fill languages dropdown
                Dim resouceObject As New Dictionary(Of String, String)()
                resouceObject = Resource.Languages.GetXMLLanguages()
                Dim pLocData = "0"
                If Not pDateForm Is Nothing Then
                    Dim pLookupType = pDateForm.Where(Function(x) x.LookupTypeValue.Trim().ToLower().Equals(Keys.GetUserPreferences().sPreferedDateFormat.ToString().Trim().ToLower())).FirstOrDefault()
                    If Not pLookupType Is Nothing Then
                        pLocData = pLookupType.LookupTypeCode
                    End If
                End If

                Dim data = Request.Cookies(Keys.CurrentUserName)
                Dim strCulture = data.Item("PreferedLanguage")
                model.ListLocalization.Add(New Localizations(Languages.Translation("lblLocalizePartialChooseDateFormat"), "-1"))
                For Each item In pDateForm
                    model.ListLocalization.Add(New Localizations(item.LookupTypeValue, item.LookupTypeCode))
                Next


                Dim res = New JavaScriptSerializer().Serialize(resouceObject)
                model.objLocalization.pLocData = pLocData
                model.objLocalization.resouceObjectLenguage = res
                model.objLocalization.SelectedCountry = strCulture
            Catch ex As Exception

            End Try
        End Sub
        'Dialog Events
        <HttpPost>
        Public Function ChangePassword_click(model As ChangePassword) As JsonResult
            model.errorMessage = 0
            Try
                If String.Compare(model.OldPass, model.NewPass1) = 0 Then
                    Throw New Exception(Languages.Translation("msgErrorMsgPasswordChange"))
                End If
                Dim user = New Smead.Security.User(Basewebpage.Passport, True)
                user.ChangePassword(model.OldPass, model.NewPass1, model.NewPass2)
                Session("MustChangePassword") = False
                Response.Cookies("mustChangePassword").Value = False
            Catch ex As Exception
                model.errorMessage = ex.Message
            End Try
            Return Json(model, JsonRequestBehavior.AllowGet)
        End Function
        <HttpPost>
        Public Function btnSaveLocData_Click(model As Localizations) As JsonResult
            Dim isError As Boolean = True
            Try
                Dim pPreferedLanguage As String
                If model.LanguageSelected = "" Then
                    pPreferedLanguage = Keys.GetCultureCookies().Name
                Else
                    pPreferedLanguage = model.LanguageSelected
                End If
                Dim pLookupType = _iLookupType.All().Where(Function(m) m.LookupTypeForCode.Trim.ToUpper.Equals(("DTFRM").Trim.ToUpper) AndAlso m.LookupTypeCode.Equals(model.dateFormatSelected)).FirstOrDefault()
                Dim aCookie As HttpCookie
                If Not Request.Cookies(Keys.CurrentUserName.ToString()) Is Nothing Then
                    aCookie = Request.Cookies(Keys.CurrentUserName.ToString())
                Else
                    aCookie = New HttpCookie(Keys.CurrentUserName.ToString())
                End If
                If Not pPreferedLanguage Is Nothing Then
                    aCookie.Values("PreferedLanguage") = pPreferedLanguage
                Else
                    aCookie.Values("PreferedLanguage") = "en-US"
                End If
                If Not model.dateFormatSelected = "0" Then
                    aCookie.Values("PreferedDateFormat") = pLookupType.LookupTypeValue
                Else
                    aCookie.Values("PreferedDateFormat") = Keys.GetCultureCookies().DateTimeFormat.ShortDatePattern
                End If
                aCookie.Expires = DateTime.Now.AddDays(180)
                Response.Cookies.Add(aCookie)
            Catch ex As Exception
                isError = False
            End Try
            Return Json(isError, JsonRequestBehavior.AllowGet)
        End Function

    End Class
End Namespace