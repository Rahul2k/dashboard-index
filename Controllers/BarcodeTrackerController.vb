Imports System.Linq
Imports System.Web
Imports System.Web.Mvc
Imports TabFusionRMS.Models
Imports TabFusionRMS.RepositoryVB
Imports TabFusionRMS.DataBaseManagerVB
Imports Newtonsoft.Json
Imports System.Data
Imports System.Data.Sql
Imports System.Web.Script.Serialization
Imports System.Data.SqlClient
Imports System.Globalization
Imports System.Security.Cryptography
Imports Smead.Security
Imports System.Data.Entity.Validation
Imports System.Drawing.Text
Imports System.Drawing
Imports Smead.RecordsManagement.Navigation
Imports Smead.RecordsManagement.Tracking
Imports Smead.RecordsManagement


Public Class BarcodeTrackerController
    Inherits BaseController
    '
    ' GET: /Test
    Dim BaseWebPage As BaseWebPage = New BaseWebPage()
    Dim Barcodemodel = New BarcodeTrackerModel()
    Private Enum LockTypes
        Locked
        HoldDetect
        Unlocked
    End Enum
    Private _objItem As TableItem
    Private _destItem As TableItem

    Function Index() As ActionResult
        Barcodemodel.hdnPrefixes = LoadPrefixes()
        Barcodemodel.additionalField1Type = ""
        Barcodemodel.lblAdditional1 = ""
        Barcodemodel.lblAdditional2  = ""
        Barcodemodel.additionalField2 = ""

        Dim additionalField1 = GetSystemSetting("TrackingAdditionalField1Desc", BaseWebPage.Passport)
        If Not String.IsNullOrEmpty(additionalField1) Then
            Dim additionalField1Type = GetSystemSetting("TrackingAdditionalField1Type", BaseWebPage.Passport)
            If Not String.IsNullOrEmpty(additionalField1Type) Then
                Barcodemodel.additionalField1Type = additionalField1Type
                Barcodemodel.lblAdditional1 = additionalField1 + ":"
                'Barcodemodel.chekAdditionSystemseting = 1
            End If
        Else
            Barcodemodel.additionalField1Type = ""
        End If
        ''memo additional field
        Dim additionalField2 = GetSystemSetting("TrackingAdditionalField2Desc", BaseWebPage.Passport.Connection)
        If Not String.IsNullOrEmpty(additionalField2) Then
            Barcodemodel.lblAdditional2 = additionalField2 + ":"
            Barcodemodel.additionalField2 = additionalField2
            'Barcodemodel.chekAdditionSystemseting = 1
        End If

        Return View(Barcodemodel)
    End Function
        
    'additional dropdownList helper
    Function Dropdownlist() As JsonResult
        Dim conn As SqlConnection = BaseWebPage.Passport.Connection
        Dim ls = New List(Of SelectListItem)
        Dim dtSuggest = GetTrackingSelectData(conn)
        For Each row As DataRow In dtSuggest.Rows
            ls.Add(New SelectListItem() With {.Text = row("Id"), .Value = row("Id")})
        Next
        Return Json(ls, JsonRequestBehavior.AllowGet)
    End Function
    'click on the first textbox
    Function ClickBarcodeTextDestination(txtDestination As String, txtObject As String, hdnPrefixes As String) As JsonResult
        Barcodemodel.serverErrorMsg = ""
        Try
            If String.IsNullOrEmpty(txtDestination) Then
                If Not IsDestination(_destItem) Then Throw New Exception(String.Format(Languages.Translation("msgBarCodeTrackingIsrequired"), txtDestination))
            Else
                Using conn As SqlConnection = BaseWebPage.Passport.Connection
                    _objItem = TranslateBarcode(txtObject, False, conn)
                    _destItem = TranslateBarcode(txtDestination, True, conn)
                    If Not IsDestination(_destItem) Then Throw New Exception(String.Format(Languages.Translation("msgBarCodeTrackingIsNotValidDest"), txtDestination))

                    If _destItem IsNot Nothing Then
                        Barcodemodel.getDestination = Navigation.GetItemName(_destItem.TableName, _destItem.ID, BaseWebPage.Passport, conn)
                        Barcodemodel.CheckgetDestination = True
                    Else
                        Barcodemodel.getDestination = String.Format(Languages.Translation("msgBarCodeTrackingNotFound"), txtDestination)
                        Barcodemodel.CheckgetDestination = False
                    End If
                    SetDueBackDate(_destItem, txtDestination)
                End Using
            End If
        Catch ex As Exception
            Barcodemodel.serverErrorMsg = ex.Message
        End Try
        Return Json(Barcodemodel, JsonRequestBehavior.AllowGet)
    End Function

    Function DetectDestinationChange(txtDestination As String, txtObject As String, hdnPrefixes As String) As JsonResult

        Using conn As SqlConnection = BaseWebPage.Passport.Connection
            Try
                _destItem = TranslateBarcode(txtDestination, True, conn)
                _objItem = TranslateBarcode(txtObject, True, conn)
                Barcodemodel.detectDestination = Not DestinationIsHigher(_destItem, _objItem)
            Catch ex As Exception
                Barcodemodel.serverErrorMsg = ex.Message
                Barcodemodel.detectDestination = False
            End Try
        End Using
        Return Json(Barcodemodel, JsonRequestBehavior.AllowGet)
    End Function
    'click on the second textbox
    Function ClickBarckcodeTextTolistBox(txtDestination As String, txtObject As String, hdnPrefixes As String, txtDueBackDate As String, Optional additional1 As String = Nothing, Optional additional2 As String = Nothing) As JsonResult
        Dim dateStr As Date = New Date
        Barcodemodel.serverErrorMsg = ""
        Try
            If String.IsNullOrEmpty(txtObject) Then
                Throw New Exception(String.Format(Languages.Translation("msgObjectBarCodeTrackingIsrequired"), txtObject))
            End If
            If String.IsNullOrEmpty(additional1) Then additional1 = " "
            If String.IsNullOrEmpty(additional2) Then additional2 = " "

            Using conn As SqlConnection = BaseWebPage.Passport.Connection
                _objItem = TranslateBarcode(txtObject, False, conn)
                _destItem = TranslateBarcode(txtDestination, True, conn)
            End Using
            If String.IsNullOrEmpty(hdnPrefixes) Then LoadPrefixes()
            If _objItem IsNot Nothing Then
                If IsDestination(_destItem) AndAlso Not DestinationIsHigher(_destItem, _objItem) Then Throw New Exception(String.Format(Languages.Translation("msgImportCtrlTrackingObjectNotFit"), _objItem.TableName, txtDestination))
                Dim user As New User(BaseWebPage.Passport, True)
                StartTransfer(_destItem, _objItem, txtObject, txtDestination, txtDueBackDate, additional1, additional2)
                Barcodemodel.returnDestination = Navigation.GetItemName(_destItem.TableName, _destItem.ID, BaseWebPage.Passport)
                Barcodemodel.returnObjectItem = "  └─► " & Navigation.GetItemName(_objItem.TableName, _objItem.ID, BaseWebPage.Passport)
            Else
                Barcodemodel.serverErrorMsg = String.Format(Languages.Translation("msgBarCodeTrackingNotFound"), txtObject)
            End If
        Catch ex As Exception
            Barcodemodel.serverErrorMsg = ex.Message
        End Try
        Return Json(Barcodemodel, JsonRequestBehavior.AllowGet)
    End Function

    Private Function IsDestination(ByVal _destItem As TableItem) As Boolean
        Try
            If (_destItem IsNot Nothing) Then
                Return _destItem.TrackingTable > 0
            End If
            Return False
        Catch ex As Exception
            Throw
        End Try
    End Function

    Private Function DestinationIsHigher(_destItem As TableItem, _objItem As TableItem) As Boolean
        Try
            If (_destItem IsNot Nothing And _objItem IsNot Nothing) Then
                If (_objItem.TrackingTable <> -1) Then
                    Return _destItem.TrackingTable < _objItem.TrackingTable
                Else
                    If (_destItem.TrackingTable <> -1) Then
                        Return True
                    End If
                End If
            End If
            Return False
        Catch ex As Exception
            Throw
        End Try
    End Function

    Private Sub StartTransfer(destItem As TableItem, objItem As TableItem, txtObject As String, txtDestination As String, txtDueBackDate As String, Optional additional1 As String = Nothing, Optional additional2 As String = Nothing)
        If String.IsNullOrEmpty(txtObject) Then
            txtObject = ""
        End If
        If String.IsNullOrEmpty(txtDestination) Then
            txtDestination = ""
        End If
        Dim dateStr As Date = New Date
        If TrackingServices.IsOutDestination(destItem.TableName, destItem.ID) Then
            If (txtDueBackDate IsNot Nothing) Then
                If txtDueBackDate.Trim().Length = 0 Then
                    Barcodemodel.serverErrorMsg = Languages.Translation("msgBarCodeTrackingDueBackDateReq")
                    Return
                End If

                If (Not IsDate(txtDueBackDate)) Then
                    Barcodemodel.serverErrorMsg = Languages.Translation("DueBackDateInvalid")
                    Return
                End If
                dateStr = Date.Parse(txtDueBackDate.Trim(), CultureInfo.CurrentCulture)
                If Date.Parse(Date.Now.ToShortDateString()) > Date.Parse(dateStr.ToShortDateString()) Then
                    Barcodemodel.serverErrorMsg = Languages.Translation("DueBackDateLessThanCurrent")
                    Return
                End If
            End If
        End If
        Try
            Dim user As New User(BaseWebPage.Passport, True)
            TrackingServices.PrepareDataForTransfer(objItem.TableName, objItem.ID, destItem.TableName, destItem.ID, dateStr, user.UserName, additional1, additional2)
        Catch ex As Exception
            Barcodemodel.serverErrorMsg = ex.Message
        End Try
    End Sub

    Private Function LoadPrefixes() As String
        Dim sb As New System.Text.StringBuilder
        Using conn As SqlConnection = BaseWebPage.Passport.Connection
            Dim dt As DataTable = GetTrackingContainerTypes(conn)
            For Each row As DataRow In dt.Rows
                If String.IsNullOrEmpty(row("BarCodePrefix").ToString) Then
                    sb.Append(" ,")
                Else
                    sb.Append(String.Format("{0},", row("BarCodePrefix").ToString.ToUpper))
                End If
            Next
        End Using
        Return sb.ToString
    End Function


    Private Sub SetDueBackDate(ByVal item As TableItem, ByVal text As String)
        Barcodemodel.chkDueBackDate = TrackingServices.IsOutDestination(item.TableName, item.ID)
        Barcodemodel.formatDueBackDate = Keys.GetCultureCookies().DateTimeFormat.ShortDatePattern
        If Barcodemodel.chkDueBackDate Then
            Barcodemodel.DueBackDateText = Keys.ConvertCultureDate(CStr(TrackingServices.GetDueBackDate(item.TableName, item.ID)))
        Else
            Barcodemodel.DueBackDateText = Languages.Translation("txtBarCodeTrackingNone")
        End If
    End Sub
End Class

