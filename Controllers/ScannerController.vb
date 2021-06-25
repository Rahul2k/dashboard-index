Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.Mvc
Imports TabFusionRMS.Models
Imports TabFusionRMS.RepositoryVB
Imports Newtonsoft.Json
Imports System.IO
Imports TabFusionRMS.DataBaseManagerVB


Public Class ScannerController
    Inherits BaseController

    Private Property _iScanRule As IRepository(Of ScanRule)
    Private Property _iOutputSetting As IRepository(Of OutputSetting)
    Private Property _iVolume As IRepository(Of Volume)
    Private Property _iSystemAddress As IRepository(Of SystemAddress)
    Private Property _iTable As IRepository(Of Table)
    Private Property _iSecureObject As IRepository(Of SecureObject)
    Private Property _iDatabas As IRepository(Of Databas)

    Dim _IDBManager As IDBManager = New DBManager

    Dim myBasePage As New BaseWebPage
    Dim oSecureObject = New Smead.Security.SecureObject(myBasePage.Passport)
    Public Sub New(iScanRule As IRepository(Of ScanRule),
                   iOutputSetting As IRepository(Of OutputSetting),
                   iVolume As IRepository(Of Volume),
                    iSystemAddress As IRepository(Of SystemAddress),
                   iTable As IRepository(Of Table), iSecureObject As IRepository(Of SecureObject),
                   iDatabas As IRepository(Of Databas))
        MyBase.New()
        _iScanRule = iScanRule
        _iOutputSetting = iOutputSetting
        _iVolume = iVolume
        _iSystemAddress = iSystemAddress
        _iTable = iTable
        _iSecureObject = iSecureObject
        _iDatabas = iDatabas
    End Sub

    Function Index() As ActionResult
        'Keys.iScannerRefId = Keys.GetUserId
        Session("iScannerRefId") = Keys.GetUserId
        Dim lScanRule = _iScanRule.All()
        Dim lFinalScanRule As List(Of ScanRule) = New List(Of ScanRule)
        If (Not (myBasePage Is Nothing)) Then
            For Each oScanRule As ScanRule In lScanRule
                If (myBasePage.Passport.CheckPermission(oScanRule.Id, Enums.SecureObjects.ScanRules, Enums.PassportPermissions.Access)) Then
                    lFinalScanRule.Add(oScanRule)
                End If
            Next
        End If
        ViewBag.ScanRuleList = lFinalScanRule.CreateSelectListFromList("ScanRulesId", "Id", Nothing)


        Dim pOutputSettingsEntities = _iSecureObject.All()
        Dim pOutputSettingsList As List(Of SecureObject) = New List(Of SecureObject)
        Dim pSecureObjectID = pOutputSettingsEntities.Where(Function(x) x.Name.Trim().ToLower().Equals("output settings")).FirstOrDefault().SecureObjectID
        pOutputSettingsEntities = pOutputSettingsEntities.Where(Function(x) x.BaseID = pSecureObjectID)
        For Each oOutputSettings In pOutputSettingsEntities
            If (myBasePage.Passport.CheckPermission(oOutputSettings.Name, Enums.SecureObjects.OutputSettings, Enums.PassportPermissions.Access)) Then
                pOutputSettingsList.Add(oOutputSettings)
            End If
        Next

        Dim lTableEntities = _iTable.All()

        ViewBag.OutputSettingsList = pOutputSettingsList.CreateSelectListFromList("Name", "Name", Nothing)
        ViewBag.TablesList = lTableEntities.Where(Function(x) x.Attachments = True).CreateSelectList("TableName", "UserName", Nothing)

        Return View()
    End Function

    <HttpPost> _
    Public Function AttachDocuments(file As Object) As ActionResult
        Dim context = HttpContext
        Dim dsTable As DataSet = Nothing
        Dim dtTable As DataTable = Nothing
        Dim dbObj As Databas = Nothing
        Dim pSelectedTbl As Table = Nothing

        Dim BaseWebPageMain = New BaseWebPage()

        Dim pOutputSettings = context.Request.Params("OutPutSettings")
        Dim pTableName = context.Request.Params("TableName")
        Dim pTableId = context.Request.Params("TableId")

        Try
            'Added by Ganesh to fix bug #66 from spreadsheet. - 23/02/2016.
            pSelectedTbl = _iTable.All().Where(Function(m) m.TableName = pTableName).FirstOrDefault()
            Dim pTableField = DatabaseMap.RemoveTableNameFromField(pSelectedTbl.IdFieldName.Trim.ToLower)

            dbObj = _iDatabas.All.Where(Function(m) m.DBName.Trim.ToLower.Equals(pSelectedTbl.DBName.Trim.ToLower)).FirstOrDefault()
            _IDBManager.ConnectionString = Keys.GetDBConnectionString(dbObj)


            Dim oOutputSettings = _iOutputSetting.All().Where(Function(x) x.Id.Trim().ToLower().Equals(pOutputSettings.Trim().ToLower())).FirstOrDefault()
            If oOutputSettings Is Nothing Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgScannerControllerInvalidDirPath")}, JsonRequestBehavior.AllowGet)
            End If
            Dim oVolumns = _iVolume.All().Where(Function(x) x.Id = oOutputSettings.VolumesId).FirstOrDefault()
            If oVolumns Is Nothing Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgScannerControllerInvalidDirPath")}, JsonRequestBehavior.AllowGet)
            End If
            Dim oSystemAddress = _iSystemAddress.All().Where(Function(x) x.Id = oVolumns.SystemAddressesId).FirstOrDefault()
            If oSystemAddress Is Nothing Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgScannerControllerInvalidDirPath")}, JsonRequestBehavior.AllowGet)
            End If

            If Not System.IO.Directory.Exists(oSystemAddress.PhysicalDriveLetter) Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgScannerControllerInvalidDirPath")}, JsonRequestBehavior.AllowGet)
            End If


            Dim strqry = "SELECT [" + pTableField + "] FROM [" + pSelectedTbl.TableName + "] ;"
            dsTable = _IDBManager.ExecuteDataSet(System.Data.CommandType.Text, strqry)
            dtTable = dsTable.Tables(0)


            Dim foundRows As DataRow() = dtTable.Select(pTableField + "= " + pTableId)
            If pSelectedTbl.Attachments = True Then
                If foundRows.Length > 0 Then
                    For Each pfilePath As String In Request.Files
                        Dim pfile As HttpPostedFileBase = Request.Files(pfilePath)

                        'Dim filepath As String = context.Server.MapPath("~/ImportFiles/" + pfile.FileName)
                        Dim filepath As String = context.Server.MapPath("~/ImportFiles/" + pfilePath)
                        pfile.SaveAs(filepath)

                        Dim ticket = BaseWebPageMain.Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()), pTableName, pTableId).ToString()

                        Dim attach As Smead.RecordsManagement.Imaging.Attachment = Smead.RecordsManagement.Imaging.Attachments.AddAttachment(ticket, BaseWebPageMain.Passport.UserId, String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                                        pTableName, pTableId, 0,
                                                                                         pOutputSettings,
                                                                                        filepath,
                                                                                        filepath,
                                                                                        System.IO.Path.GetExtension(pfile.FileName), False, String.Empty)

                        If System.IO.File.Exists(filepath) Then
                            System.IO.File.Delete(filepath)
                        End If

                    Next

                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgScannerControllerFilesAttachsucc")
                Else
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Languages.Translation("msgScannerControllerRecIdNFound")
                End If
            Else
                Keys.ErrorType = "w"
                Keys.ErrorMessage = String.Format(Languages.Translation("msgScannerControllerSelTable"), pSelectedTbl.UserName)
            End If
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message.ToString()
        Finally
            '_IDBManager.Dispose()
            dsTable = Nothing
            dtTable = Nothing
        End Try

        Return Json(New With { _
                Key .errortype = Keys.ErrorType, _
                Key .message = Keys.ErrorMessage _
            }, JsonRequestBehavior.AllowGet)
    End Function

    <HttpPost> _
    Public Function SetScanRule(pScanRuleName As String, pScanRuleId As Integer, pAction As Char) As ActionResult
        Dim lScanRule = _iScanRule.All()
        Try

            Select Case pAction
                Case "N"
                    If lScanRule.Any(Function(x) x.Id.Trim().ToLower() = pScanRuleName.Trim().ToLower()) = False Then
                        Dim oScanRule As New ScanRule
                        ScannerModel.InitiateScanRule(oScanRule)
                        oScanRule.ScanRulesId = 0
                        oScanRule.Id = pScanRuleName
                        _iScanRule.Add(oScanRule)
                        oSecureObject.Register(pScanRuleName, Enums.SecureObjects.ScanRules, Enums.SecureObjects.ScanRules)
                        oScanRule = Nothing

                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Keys.SaveSuccessMessage()
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Keys.AlreadyExistMessage(pScanRuleName)
                    End If
                Case "D"
                    Dim lSecurableID As Integer
                    Dim pOrgScanRule As String = ""
                    Dim oScanRule = _iScanRule.All().Where(Function(x) x.ScanRulesId = pScanRuleId).FirstOrDefault()
                    pOrgScanRule = oScanRule.Id
                    If (Not (oScanRule Is Nothing)) Then
                        _iScanRule.Delete(oScanRule)
                        lSecurableID = oSecureObject.GetSecureObjectID(pOrgScanRule, Enums.SecureObjects.ScanRules)
                        If (lSecurableID > 0) Then
                            oSecureObject.UnRegister(lSecurableID)
                        End If
                    End If
                    oScanRule = Nothing
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Keys.DeleteSuccessMessage()
                Case "C"
                    If lScanRule.Any(Function(x) x.Id.Trim().ToLower() = pScanRuleName.Trim().ToLower()) = False Then
                        Dim cloneScanRule As New ScanRule()
                        Dim oScanRule = _iScanRule.All().Where(Function(x) x.ScanRulesId = pScanRuleId).FirstOrDefault()
                        ScannerModel.InitiateCloneScanRule(cloneScanRule, oScanRule)
                        cloneScanRule.Id = pScanRuleName
                        cloneScanRule.ScanRulesId = 0
                        _iScanRule.Add(cloneScanRule)
                        oSecureObject.Register(pScanRuleName, Enums.SecureObjects.ScanRules, Enums.SecureObjects.ScanRules)
                        oScanRule = Nothing
                        cloneScanRule = Nothing
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Keys.SaveSuccessMessage()
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Keys.AlreadyExistMessage(pScanRuleName)
                    End If
                Case "R"
                    If lScanRule.Any(Function(x) x.Id.Trim().ToLower() = pScanRuleName.Trim().ToLower() AndAlso x.ScanRulesId <> pScanRuleId) = False Then

                        Dim sSQL As String
                        Dim sRuleMessage As String
                        Dim iBatchCount As Integer
                        Dim rsADORecordset As ADODB.Recordset = New ADODB.Recordset
                        Dim psADOConn = New ADODB.Connection
                        psADOConn.Open(Keys.DefaultConnectionString(True))

                        Dim oScanRule = _iScanRule.All().Where(Function(x) x.ScanRulesId = pScanRuleId).FirstOrDefault()

                        sSQL = ("SELECT COUNT(ScanRulesIdUsed) FROM [ScanBatches] WHERE [ScanRulesIdUsed] = '" & Replace(oScanRule.Id, "'", "''") & "'")
                        rsADORecordset = DataServices.GetADORecordset(sSQL, psADOConn)

                        If (Not (rsADORecordset Is Nothing)) Then
                            If (Not rsADORecordset.EOF) Then
                                iBatchCount = rsADORecordset.Fields(0).IntValue
                            End If

                            rsADORecordset.Close()
                            rsADORecordset = Nothing
                        End If

                        sRuleMessage = String.Format(Languages.Translation("msgScannerControllerThisWillUpdt"), iBatchCount) & vbCrLf & Languages.Translation("msgScannerControllerDoUWishToCon")
                        If (iBatchCount > 20) Then
                            sRuleMessage = (sRuleMessage & vbCrLf & vbCrLf & Languages.Translation("msgScannerControllerThisCldTakeWhile"))
                        End If


                        oScanRule = Nothing
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = sRuleMessage
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Keys.AlreadyExistMessage(pScanRuleName)
                    End If

                Case Else
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Select

        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message.ToString() 'Keys.ErrorMessageJS()
        Finally
            lScanRule = Nothing
        End Try

        Return Json(New With { _
                Key .errortype = Keys.ErrorType, _
                Key .message = Keys.ErrorMessage _
            }, JsonRequestBehavior.AllowGet)
    End Function

    Public Function RenameRule(pScanRuleName As String, pScanRuleId As Integer) As ActionResult

        Try

            Dim rsADORecordset As ADODB.Recordset = New ADODB.Recordset
            Dim psADOConn = New ADODB.Connection
            psADOConn.Open(Keys.DefaultConnectionString(True))

            Dim sSQL As String = ""
            Dim pOrgScanRule As String = ""
            Dim oScanRule = _iScanRule.All().Where(Function(x) x.ScanRulesId = pScanRuleId).FirstOrDefault()
            pOrgScanRule = oScanRule.Id

            oScanRule.Id = pScanRuleName
            _iScanRule.Update(oScanRule)


            sSQL = ("UPDATE [ScanBatches] SET [ScanRulesIdUsed] = '" & Replace(pScanRuleName, "'", "''") & "'")
            sSQL = sSQL & " WHERE [ScanRulesIdUsed] = '" & Replace(oScanRule.Id, "'", "''") & "'"
            rsADORecordset = DataServices.GetADORecordset(sSQL, psADOConn)

            'oSecureObject.RenameSecurable(oScanRule.Id, Enums.SecureObjects.ScanRules, pScanRuleName)

            If (StrComp(pOrgScanRule, pScanRuleName, vbTextCompare) <> 0) Then
                oSecureObject.Rename(pOrgScanRule, Enums.SecureObjects.ScanRules, pScanRuleName)
            End If

            oScanRule = Nothing

            Keys.ErrorType = "s"
            Keys.ErrorMessage = Languages.Translation("msgScannerControllerRuleReSucc")

        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()

        End Try
        Return Json(New With { _
                Key .errortype = Keys.ErrorType, _
                Key .message = Keys.ErrorMessage _
            }, JsonRequestBehavior.AllowGet)
    End Function

    Public Function UpdateScanRulesDropDown() As ActionResult

        Dim lScanRule = _iScanRule.All()
        Dim lFinalScanRule As List(Of ScanRule) = New List(Of ScanRule)
        If (Not (myBasePage Is Nothing)) Then
            For Each oScanRule As ScanRule In lScanRule
                If (myBasePage.Passport.CheckPermission(oScanRule.Id, Enums.SecureObjects.ScanRules, Enums.PassportPermissions.Access)) Then
                    lFinalScanRule.Add(oScanRule)
                End If
            Next
        End If

        Dim Result = From p In lFinalScanRule.OrderBy(Function(x) x.Id)
                     Select p.ScanRulesId, p.Id

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        Dim jsonObject = JsonConvert.SerializeObject(Result, Formatting.Indented, Setting)

        Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Function LoadDiskSourceInputSettingPartial() As PartialViewResult
        Return PartialView("_DiskSourcePartial")
    End Function

End Class

