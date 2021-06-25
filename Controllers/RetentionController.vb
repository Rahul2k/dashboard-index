Imports System.Linq
Imports System.Web
Imports System.Web.Mvc
Imports TabFusionRMS.Models
Imports TabFusionRMS.RepositoryVB
Imports TabFusionRMS.DataBaseManagerVB
Imports Newtonsoft.Json
Imports System.Data.SqlClient

Public Class RetentionController
    Inherits BaseController

    Private Property _ivwGridSetting As IRepository(Of vwGridSetting)
    Private Property _ivwTablesAll As IRepository(Of vwTablesAll)

    Private Property _iRetentionCode As IRepository(Of SLRetentionCode)
    Private Property _iCitationCode As IRepository(Of SLRetentionCitation)
    Private Property _iTable As IRepository(Of Table)
    Private Property _iSystem As IRepository(Of Models.System)

    Private Property _iRetentionCitaCode As IRepository(Of SLRetentionCitaCode)
    Private Property _iDatabas As IRepository(Of Databas)

    'Private Property _IDBManager As IDBManager
    Dim _IDBManager As IDBManager = New DBManager
    'IDBManager As IDBManager, 
    Public Sub New(ivwTablesAll As IRepository(Of vwTablesAll), ivwGridSetting As IRepository(Of vwGridSetting), iRetentionCode As IRepository(Of SLRetentionCode), iCitationCode As IRepository(Of SLRetentionCitation), iRetentionCitaCode As IRepository(Of SLRetentionCitaCode), iTable As IRepository(Of Table), iSystem As IRepository(Of Models.System), iDatabas As IRepository(Of Databas))
        MyBase.New()
        '_IDBManager = IDBManager
        _ivwTablesAll = ivwTablesAll
        _ivwGridSetting = ivwGridSetting

        _iRetentionCode = iRetentionCode
        _iCitationCode = iCitationCode
        _iRetentionCitaCode = iRetentionCitaCode
        _iTable = iTable
        _iDatabas = iDatabas
        _iSystem = iSystem
    End Sub

    Function Index() As ActionResult

        Return View()
    End Function

    '
    ' GET: /Retention

    Function RetentionCodeMaintenance() As ActionResult
        'Keys.iRetentionRefId = Keys.GetUserId
        Session("iRetentionRefId") = Keys.GetUserId
        Return View()
    End Function
    '<HttpPost>
    '<ValidateAntiForgeryToken>
    Function ReassignRetentionCode() As ActionResult
        Return PartialView("_ReassignRetentionCodePartial")
    End Function


#Region "Retention"
#Region "Retention Code Maintenance"

    Public Function LoadRetentionCodeView() As PartialViewResult
        Return PartialView("AddRetentionCode")
    End Function

    'Get the screen to show details of citation code.
    Public Function DetailedCitationCode() As ActionResult
        Return PartialView("DetailedCitationCode")
    End Function

    'Get the view for Citation codes remained to assign.
    Public Function GetAssignCitationCode() As ActionResult
        Return PartialView("AssignCitationCode")
    End Function

    'Get the list of Retention Codes.
    Public Function GetRetentionCodes(sidx As String, sord As String, page As Integer, rows As Integer) As JsonResult

        Dim pRetentionCodesEntities = From t In _iRetentionCode.All()
                                      Select t.SLRetentionCodesId, t.Id, t.Description, t.Notes

        Dim jsonData = pRetentionCodesEntities.GetJsonListForGrid(sord, page, rows, "Id")

        Return Json(jsonData, JsonRequestBehavior.AllowGet)

    End Function

    'Get the list of Retention codes based on Citation Codes.
    Public Function GetCitationCodesByRetenton(pRetentionCodeId As String) As JsonResult
        Dim lstCitationCodes = New List(Of String)

        Dim lstRetentionCodeEntity = _iRetentionCitaCode.All().Where(Function(x) x.SLRetentionCodesId = pRetentionCodeId).ToList()

        For Each item As SLRetentionCitaCode In lstRetentionCodeEntity
            lstCitationCodes.Add(item.SLRetentionCitationsCitation)
        Next

        Dim pRetentionCodeEntities = From t In _iCitationCode.All()
                                     Where lstCitationCodes.Contains(t.Citation)
                                     Select t.SLRetentionCitationId, t.Citation, t.Subject

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        Dim jsonObject = JsonConvert.SerializeObject(pRetentionCodeEntities, Formatting.Indented, Setting)

        Return Json(jsonObject, JsonRequestBehavior.AllowGet)

    End Function

    'Add/Update the Retention Code record from system.
    <HttpPost>
    Public Function SetRetentionCode(PRetentionCode As SLRetentionCode) As ActionResult
        Dim jsonRetCodeObj As String = String.Empty

        Try
            Dim PRetentionLegalHold As Boolean
            Dim PRetentionPeriodForceToEndOfYear As Boolean
            Dim PInactivityForceToEndOfYear As Boolean

            If PRetentionCode.SLRetentionCodesId > 0 Then
                If _iRetentionCode.All().Any(Function(x) x.Id.Trim().ToLower() = PRetentionCode.Id.Trim().ToLower() AndAlso x.SLRetentionCodesId <> PRetentionCode.SLRetentionCodesId) = False Then
                    PRetentionLegalHold = IIf(Request.Form("RetentionLegalHold") = "on", True, False)
                    PRetentionPeriodForceToEndOfYear = IIf(Request.Form("RetentionPeriodForceToEndOfYear") = "on", True, False)
                    PInactivityForceToEndOfYear = IIf(Request.Form("chkForceToEndOfTear") = "on", True, False)

                    PRetentionCode.RetentionLegalHold = PRetentionLegalHold
                    PRetentionCode.InactivityForceToEndOfYear = PInactivityForceToEndOfYear
                    PRetentionCode.RetentionPeriodForceToEndOfYear = PRetentionPeriodForceToEndOfYear
                    PRetentionCode.RetentionPeriodOther = 0 'Reported by Dhaval on 23rd June.
                    PRetentionCode.InactivityEventType = IIf(IsNothing(Request.Form("InactivityEventType")) Or Request.Form("InactivityEventType") = "", "N/A", Request.Form("InactivityEventType"))
                    PRetentionCode.RetentionEventType = IIf(IsNothing(Request.Form("RetentionEventType")) Or Request.Form("RetentionEventType") = "", "N/A", Request.Form("RetentionEventType"))

                    Dim iRetentionCode As IRepository(Of SLRetentionCode) = New Repositories(Of SLRetentionCode)()
                    Dim retentionCode = iRetentionCode.Where(Function(x) x.SLRetentionCodesId = PRetentionCode.SLRetentionCodesId).FirstOrDefault()

                    _iRetentionCode.Update(PRetentionCode)

                    Dim pTableEntity As List(Of Table) = _iTable.All.ToList()

                    If pTableEntity IsNot Nothing Then
                        Dim sSQL As String = String.Empty
                        Dim oADOConn As ADODB.Connection = Nothing

                        For Each table As Table In pTableEntity
                            If table.RetentionPeriodActive AndAlso retentionCode.Id <> PRetentionCode.Id Then
                                If oADOConn Is Nothing Then oADOConn = DataServices.DBOpen(Enums.eConnectionType.conDefault, Nothing)
                                sSQL = "UPDATE [" & table.TableName & "] SET [" & DatabaseMap.RemoveTableNameFromField(table.RetentionFieldName) & "] = '" & PRetentionCode.Id & "' WHERE [" & DatabaseMap.RemoveTableNameFromField(table.RetentionFieldName) & "] = '" & retentionCode.Id & "'"
                                DataServices.ProcessADOCommand(sSQL, oADOConn, False)
                            End If

                            If PRetentionLegalHold Then
                                If oADOConn Is Nothing Then oADOConn = DataServices.DBOpen(Enums.eConnectionType.conDefault, Nothing)
                                sSQL = String.Format("DELETE FROM [SLDestructCertItems] WHERE ([TableName] = '{0}' AND [RetentionCode] = '{1}' AND [DispositionDate] IS NULL)", table.TableName, PRetentionCode.Id)
                                DataServices.ProcessADOCommand(sSQL, oADOConn, False)
                            End If
                        Next
                        If oADOConn IsNot Nothing Then
                            oADOConn.Close()
                        End If
                    End If

                    jsonRetCodeObj = GetRetentionCodeId(PRetentionCode.Id)

                    'Dim pRetentionCitaCodes = _iRetentionCitaCode.All().Where(Function(x) x.SLRetentionCodesId = PRetentionCode)
                    '_iRetentionCitaCode.DeleteRange(pRetentionCitaCodes)

                    'Dim pRetentionCitaCodes As SLRetentionCitaCode = New SLRetentionCitaCode()
                    'pRetentionCitaCodes = _iRetentionCitaCode.All().Where(Function(x) x.SLRetentionCodesId = "HUM3000")
                    'pRetentionCitaCodes.SLRetentionCodesId = "HUM123"
                    '_iRetentionCitaCode.UpdateRange(pRetentionCitaCodes)

                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgRetentionCodeMaintenanceUpdate") 'Fixed : FUS-6114
                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("msgRetentionControllerThisRetCodeHasAlreadyBeenDefined")
                End If
            Else
                If _iRetentionCode.All().Any(Function(x) x.Id.Trim().ToLower() = PRetentionCode.Id.Trim().ToLower()) = False Then
                    PRetentionLegalHold = IIf(Request.Form("RetentionLegalHold") = "on", True, False)
                    PRetentionPeriodForceToEndOfYear = IIf(Request.Form("RetentionPeriodForceToEndOfYear") = "on", True, False)
                    PInactivityForceToEndOfYear = IIf(Request.Form("chkForceToEndOfTear") = "on", True, False)

                    PRetentionCode.RetentionLegalHold = PRetentionLegalHold
                    PRetentionCode.InactivityForceToEndOfYear = PInactivityForceToEndOfYear
                    PRetentionCode.RetentionPeriodForceToEndOfYear = PRetentionPeriodForceToEndOfYear
                    PRetentionCode.RetentionPeriodOther = 0 'Reported by Dhaval on 23rd June.
                    PRetentionCode.InactivityEventType = IIf(IsNothing(Request.Form("InactivityEventType")) Or Request.Form("InactivityEventType") = "", "N/A", Request.Form("InactivityEventType"))
                    PRetentionCode.RetentionEventType = IIf(IsNothing(Request.Form("RetentionEventType")) Or Request.Form("RetentionEventType") = "", "N/A", Request.Form("RetentionEventType"))

                    _iRetentionCode.Add(PRetentionCode)

                    If PRetentionLegalHold Then
                        Dim oADOConn As ADODB.Connection = Nothing
                        Dim pTableEntity As List(Of Table) = _iTable.All.ToList()

                        If pTableEntity IsNot Nothing Then
                            For Each table As Table In pTableEntity
                                If oADOConn Is Nothing Then oADOConn = DataServices.DBOpen(Enums.eConnectionType.conDefault, Nothing)
                                Dim sSQL As String = String.Format("DELETE FROM [SLDestructCertItems] WHERE ([TableName] = '{0}' AND [RetentionCode] = '{1}' AND [DispositionDate] IS NULL)", table.TableName, PRetentionCode.Id)
                                DataServices.ProcessADOCommand(sSQL, oADOConn, False)
                            Next
                        End If

                        oADOConn.Close()
                    End If

                    jsonRetCodeObj = GetRetentionCodeId(PRetentionCode.Id)

                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgRetentionCodeMaintenanceSave") 'Fixed : FUS-6113
                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("msgRetentionControllerThisRetCodeHasAlreadyBeenDefined")
                End If
            End If
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()
        End Try

        Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage,
                            Key .jsonRetObj = jsonRetCodeObj
                        }, JsonRequestBehavior.AllowGet)
    End Function

    'Return the fields to edit for retention code.
    Public Function EditRetentionCode(pRowSelected As Array, pRetentionCode As String) As ActionResult

        If pRowSelected Is Nothing Then
            Return Json(New With {Key .success = False})
        End If
        If pRowSelected.Length = 0 Then
            Return Json(New With {Key .success = False})
        End If

        Dim pRetentionCodeEntity = _iRetentionCode.All().Where(Function(x) x.Id = pRetentionCode).FirstOrDefault()

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        Dim jsonObject = JsonConvert.SerializeObject(pRetentionCodeEntity, Formatting.Indented, Setting)

        Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

    End Function


    'Remove the requested retention code record from system.
    Public Function RemoveRetentionCodeEntity(pRowSelected As Array, pRetentionCode As String) As ActionResult

        If pRowSelected Is Nothing Then
            Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgRetentionControllerNullValFound")})
        End If
        If pRowSelected.Length = 0 Then
            Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgRetentionControllerNullValFound")})
        End If

        Try
            'If Not IsRetentionCodeInUse(pRetentionCode) Then
            _iRetentionCode.BeginTransaction()
            _iRetentionCitaCode.BeginTransaction()

            Dim pRetentionCodesEntity = _iRetentionCode.All().Where(Function(x) x.Id = pRetentionCode).FirstOrDefault()
            _iRetentionCode.Delete(pRetentionCodesEntity)

            Dim pRetentionCitaCodes = _iRetentionCitaCode.All().Where(Function(x) x.SLRetentionCodesId.ToString().Trim().ToLower().Equals(pRetentionCode.Trim().ToLower()))
            _iRetentionCitaCode.DeleteRange(pRetentionCitaCodes)

            _iRetentionCode.CommitTransaction()
            _iRetentionCitaCode.CommitTransaction()

            Keys.ErrorType = "s"
            Keys.ErrorMessage = Languages.Translation("msgRetentionCodeMaintenanceDelete") 'Fixed: FUS-6115
            'Else
            'Keys.ErrorType = "e"
            'Keys.ErrorMessage = "This Retention Code is currently assigned to records and cannot be deleted."
            'End If
        Catch ex As Exception

            _iRetentionCode.RollBackTransaction()
            _iRetentionCitaCode.RollBackTransaction()

            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()
        End Try

        Return Json(New With {
                   Key .errortype = Keys.ErrorType,
                   Key .message = Keys.ErrorMessage
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

    End Function
    'Check if retention code is in use.
    Public Function IsRetentionCodeInUse(ByVal pRetentionCode As String) As JsonResult
        Dim bRetCodeUsed = False
        Dim SQL As String = ""
        Dim sADOConn As New ADODB.Connection
        Dim rsADO As ADODB.Recordset

        Try
            For Each oTable In _iTable.All()
                If (oTable.RetentionPeriodActive) Then
                    SQL = "SELECT COUNT(" & DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName) & ") AS TotalCount FROM [" & oTable.TableName & "] WHERE [" & DatabaseMap.RemoveTableNameFromField(oTable.RetentionFieldName) & "] = '" & pRetentionCode & "'"
                    If oTable.TableName <> "Operators" Then
                        sADOConn = DataServices.DBOpen(oTable, _iDatabas.All())
                        rsADO = DataServices.GetADORecordSet(SQL, sADOConn)

                        If Not IsNothing(rsADO) Then
                            If (Not rsADO.EOF) Then bRetCodeUsed = (rsADO.Fields("TotalCount").IntValue > 0)
                            rsADO.Close()
                            rsADO = Nothing
                        End If
                    End If
                End If
                If (bRetCodeUsed) Then
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Languages.Translation("msgRetentionControllerThisRetCodeIsCurAss2Record")
                    Exit For
                End If
            Next
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()
        End Try

        Return Json(New With {
                   Key .errortype = Keys.ErrorType,
                   Key .message = Keys.ErrorMessage,
                    Key .IsRetCodeUsed = bRetCodeUsed
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

    End Function
    'Assign the Citation code to Retention code.
    Public Function AssignCitationToRetention(pRetentionCodeId As String, pCitationCodeId As String) As ActionResult

        Try

            Dim pRetentionCitaCode As SLRetentionCitaCode = New SLRetentionCitaCode

            _iRetentionCitaCode.BeginTransaction()

            pRetentionCitaCode.SLRetentionCodesId = pRetentionCodeId
            pRetentionCitaCode.SLRetentionCitationsCitation = pCitationCodeId
            _iRetentionCitaCode.Add(pRetentionCitaCode)

            _iRetentionCitaCode.CommitTransaction()

            Keys.ErrorType = "s"
            Keys.ErrorMessage = Keys.SaveSuccessMessage()

        Catch ex As Exception
            _iRetentionCitaCode.RollBackTransaction()

            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()
        End Try

        Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage
                        }, JsonRequestBehavior.AllowGet)
    End Function

    'Retrieve the Citation's code list which are not assigned to passed Retention code.
    Public Function GetCitationsCodeToAdd(sidx As String, sord As String, page As Integer, rows As Integer, pRetentionCodeId As String) As JsonResult

        Dim lstCitationIds = New List(Of String)

        Dim lstRetentionCitaCodes = _iRetentionCitaCode.All().Where(Function(x) x.SLRetentionCodesId = pRetentionCodeId).ToList()

        For Each item As SLRetentionCitaCode In lstRetentionCitaCodes
            lstCitationIds.Add(item.SLRetentionCitationsCitation)
        Next

        Dim pCitationCodesEntities = From t In _iCitationCode.All()
                                     Where Not lstCitationIds.Contains(t.Citation)
                                     Select t.SLRetentionCitationId, t.Citation, t.Subject

        Dim jsonData = pCitationCodesEntities.GetJsonListForGrid(sord, page, rows, "Citation")

        Return Json(jsonData, JsonRequestBehavior.AllowGet)

    End Function

    Public Function GetRetentionCodeId(pRetentionCode As String) As String
        'Dim pRetentionCodesEntity = From t In _iRetentionCode.All()
        '                     Where t.Id = pRetentionCode
        '                     Select t.SLRetentionCodesId, t.Id

        Dim pRetentionCodeEntity = _iRetentionCode.All().Where(Function(x) x.Id = pRetentionCode).FirstOrDefault()

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        Dim jsonObject = JsonConvert.SerializeObject(pRetentionCodeEntity, Formatting.Indented, Setting)

        Return jsonObject

    End Function

    Public Function CheckRetentionCodeExists(pRetentionCode As String) As JsonResult
        Try

            If _iRetentionCode.All().Any(Function(x) x.Id.Trim().ToLower() = pRetentionCode.Trim().ToLower()) = True Then
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgRetentionControllerThisRetCodeHasAlreadyBeenDefined")
            Else
                Keys.ErrorType = "e"
            End If

        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()
        End Try

        Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage
                        }, JsonRequestBehavior.AllowGet)
    End Function
    'Copy Citations from one Retention code to another. Added on 26th August 2015.
    Public Function ReplicateCitationForRetentionOnSaveAs(pCopyFromRetCode As String, pCopyToRetCode As String) As ActionResult
        Dim pNewRetCitaCodeEntity As SLRetentionCitaCode = New SLRetentionCitaCode

        Try
            _iRetentionCitaCode.BeginTransaction()
            Dim pRetentionCitaCodesEntities = _iRetentionCitaCode.All().Where(Function(x) x.SLRetentionCodesId = pCopyFromRetCode)

            For Each pRetCitaEntity In pRetentionCitaCodesEntities
                pNewRetCitaCodeEntity.SLRetentionCitationsCitation = pRetCitaEntity.SLRetentionCitationsCitation
                pNewRetCitaCodeEntity.SLRetentionCodesId = pCopyToRetCode
                _iRetentionCitaCode.Add(pNewRetCitaCodeEntity)
            Next
            _iRetentionCitaCode.CommitTransaction()
        Catch ex As Exception
            _iRetentionCitaCode.RollBackTransaction()

            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()
        End Try

        Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage
                        }, JsonRequestBehavior.AllowGet)
    End Function
    'Get the Label to show on ADD retention code screen.
    Public Function GetRetentionYearEndValue() As ActionResult
        Dim dYearEnd As Date
        Dim pSystemEntity = _iSystem.All().FirstOrDefault()
        Dim lblRetentionYrEnd As String = Languages.Translation("lblRetentionControllerRetentionYrEndsDec31")

        Try
            If (pSystemEntity.RetentionYearEnd > Month(Now)) Then
                dYearEnd = DateSerial(Year(Now), pSystemEntity.RetentionYearEnd + 1, 0)
            Else
                dYearEnd = DateSerial(Year(Now) + 1, pSystemEntity.RetentionYearEnd + 1, 0)
            End If

            lblRetentionYrEnd = String.Format(Languages.Translation("lblRetentionControllerRetentionYrEnds"), Format$(dYearEnd, "MMMM dd"))
        Catch ex As Exception

        End Try

        Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage,
                            Key .lblRetentionYrEnd = lblRetentionYrEnd,
                            Key .citaStatus = pSystemEntity.RetentionTurnOffCitations               'Added by Hemin on 12/20/2016 for bug fix
                        }, JsonRequestBehavior.AllowGet)
    End Function
#End Region

#Region "Citation Maintenance"
    Public Function CitationMaintenance() As ActionResult
        If IsRetentionTurnOffCitations() = False Then
            Return View()
        End If
        Return View("RetentionCodeMaintenance")
    End Function

    Public Function LoadAddCitationCodeView() As PartialViewResult
        Return PartialView("AddCitationCode")
    End Function

    'Get the list of Citation Codes.
    Public Function GetCitationCodes(sidx As String, sord As String, page As Integer, rows As Integer) As JsonResult
        Dim pCitationCodesEntities = From t In _iCitationCode.All()
                                     Select t.SLRetentionCitationId, t.Citation, t.Subject

        Dim jsonData = pCitationCodesEntities.GetJsonListForGrid(sord, page, rows, "Citation")

        Return Json(jsonData, JsonRequestBehavior.AllowGet)
    End Function

    'Get the list of Retention codes based on Citation Codes.
    Public Function GetRetentionCodesByCitation(pCitationCodeId As String) As JsonResult

        Dim lstRetentionCodes = New List(Of String)

        Dim pRetentionCitaEntities = From t In _iRetentionCitaCode.All()
                                     Select t.SLRetentionCodesId

        Dim lstCitationCodeEntity = _iRetentionCitaCode.All().Where(Function(x) x.SLRetentionCitationsCitation = pCitationCodeId).ToList()

        For Each item As SLRetentionCitaCode In lstCitationCodeEntity
            lstRetentionCodes.Add(item.SLRetentionCodesId)
        Next

        Dim pRetentionCodesEntities = From t In _iRetentionCode.All()
                                      Where lstRetentionCodes.Contains(t.Id)
                                      Select t.SLRetentionCodesId, t.Id, t.Description


        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        Dim jsonObject = JsonConvert.SerializeObject(pRetentionCodesEntities, Formatting.Indented, Setting)

        Return Json(jsonObject, JsonRequestBehavior.AllowGet)

    End Function

    'Add/Update the Citation Code record from system.
    <HttpPost>
    Public Function SetCitationCode(PCitationCode As SLRetentionCitation) As ActionResult

        Try
            If PCitationCode.SLRetentionCitationId > 0 Then

                If _iCitationCode.All().Any(Function(x) x.Citation.Trim().ToLower() = PCitationCode.Citation.Trim().ToLower() AndAlso x.SLRetentionCitationId <> PCitationCode.SLRetentionCitationId) = False Then

                    'Dim pRetentionCitaCode = _iRetentionCitaCode.All.Where(Function(x) x.SLRetentionCitationsCitation)
                    _iCitationCode.Update(PCitationCode)
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Keys.SaveSuccessMessage()

                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("msgRetentionControllerThisCitationCodeHasAlrdyDefined")
                End If
            Else
                If _iCitationCode.All().Any(Function(x) x.Citation.Trim().ToLower() = PCitationCode.Citation.Trim().ToLower()) = False Then
                    _iCitationCode.Add(PCitationCode)

                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Keys.SaveSuccessMessage()
                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("msgRetentionControllerThisCitationCodeHasAlrdyDefined")
                End If

            End If

        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()
        End Try

        Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage
                        }, JsonRequestBehavior.AllowGet)
    End Function

    'Return the fields to edit for Citation code.
    Public Function EditCitationCode(pRowSelected As Array, pCitationCodeId As Integer) As ActionResult

        If pRowSelected Is Nothing Then
            Return Json(New With {Key .success = False})
        End If
        If pRowSelected.Length = 0 Then
            Return Json(New With {Key .success = False})
        End If

        Dim pRetentionCodeEntity = _iCitationCode.All().Where(Function(x) x.SLRetentionCitationId = pCitationCodeId).FirstOrDefault()

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        Dim jsonObject = JsonConvert.SerializeObject(pRetentionCodeEntity, Formatting.Indented, Setting)

        Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

    End Function

    'Remove the Citation code Assigned to Retention code.
    Public Function RemoveAssignedCitationCode(pRetentionCodeId As String, pCitationCodeId As String) As ActionResult

        Try
            Dim pRetentionCitaCodeEntity = _iRetentionCitaCode.All().Where(Function(x) x.SLRetentionCitationsCitation = pCitationCodeId And x.SLRetentionCodesId = pRetentionCodeId).FirstOrDefault()
            _iRetentionCitaCode.Delete(pRetentionCitaCodeEntity)

            Keys.ErrorType = "s"
            Keys.ErrorMessage = Keys.DeleteSuccessMessage()

        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()
        End Try


        Return Json(New With {
                   Key .errortype = Keys.ErrorType,
                   Key .message = Keys.ErrorMessage
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

    End Function

    'Get the count of Retention Codes for Citation code.
    Public Function GetCountOfRetentionCodesForCitation(pCitationCodeId As String) As JsonResult

        Dim retentionCodeCount As Integer = 0
        Dim RetentionCount As Integer = 0
        Dim pRetentionCitaCode = _iRetentionCitaCode.All()

        retentionCodeCount = (
                             From rc In pRetentionCitaCode
                             Where rc.SLRetentionCitationsCitation = pCitationCodeId
                             Select rc.SLRetentionCodesId
                             ).Count()

        Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage,
                            Key .retentionCodeCount = retentionCodeCount
                        }, JsonRequestBehavior.AllowGet)
    End Function

    'Remove the requested citation code record from system.
    Public Function RemoveCitationCodeEntity(pRowSelected As Array, pCitationCodeId As String) As ActionResult

        If pRowSelected Is Nothing Then
            Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgRetentionControllerNullValFound")})
        End If
        If pRowSelected.Length = 0 Then
            Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgRetentionControllerNullValFound")})
        End If

        Try
            _iCitationCode.BeginTransaction()
            _iRetentionCitaCode.BeginTransaction()

            Dim pCitationCodesEntity = _iCitationCode.All().Where(Function(x) x.Citation = pCitationCodeId).FirstOrDefault()
            _iCitationCode.Delete(pCitationCodesEntity)

            Dim pRetentionCitaCodesEntity = _iRetentionCitaCode.All().Where(Function(x) x.SLRetentionCitationsCitation = pCitationCodeId)
            _iRetentionCitaCode.DeleteRange(pRetentionCitaCodesEntity)

            _iCitationCode.CommitTransaction()
            _iRetentionCitaCode.CommitTransaction()

            Keys.ErrorType = "s"
            Keys.ErrorMessage = Keys.DeleteSuccessMessage()
        Catch ex As Exception
            _iCitationCode.RollBackTransaction()
            _iRetentionCitaCode.RollBackTransaction()

            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()
        End Try


        Return Json(New With {
                   Key .errortype = Keys.ErrorType,
                   Key .message = Keys.ErrorMessage
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

    End Function

#End Region

#Region "Reassign a Retention Code"

    'Replace old retention code with new on click of OK.
    Public Function ReplaceRetentionCode(pTableId As Integer, pNewRetentionCode As String, pOldRetentionCode As String) As JsonResult
        Dim sMessage As String = ""
        Dim sSQL As String
        Dim bSuccess As Boolean

        Try
            Dim pTableEntity = _iTable.All.Where(Function(m) m.TableId = pTableId).FirstOrDefault()
            Dim sADOConn = DataServices.DBOpen(Enums.eConnectionType.conDefault, Nothing)

            sSQL = ("UPDATE [" & pTableEntity.TableName & "] SET [" & DatabaseMap.RemoveTableNameFromField(pTableEntity.RetentionFieldName) & "] = '" & pNewRetentionCode & "' WHERE [" & DatabaseMap.RemoveTableNameFromField(pTableEntity.RetentionFieldName) & "] = '" & pOldRetentionCode & "'")
            If (Len(pOldRetentionCode) = 0) Then sSQL = sSQL & " OR [" & DatabaseMap.RemoveTableNameFromField(pTableEntity.RetentionFieldName) & "] IS NULL"

            bSuccess = DataServices.ProcessADOCommand(sSQL, sADOConn, False)

            If (bSuccess) Then
                sMessage = Languages.Translation("msgRetentionControllerTheRetCodeUpdateHasCompleted")

                Keys.ErrorType = "s"
                Keys.ErrorMessage = sMessage
            End If

        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()
        End Try

        Return Json(New With {
                   Key .errortype = Keys.ErrorType,
                   Key .message = Keys.ErrorMessage
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    'Get the list of names for Retention tables.
    Public Function GetRetentionTablesList() As JsonResult
        Dim lstRetentionCode As List(Of Table) = New List(Of Table)
        Dim BaseWebPage As BaseWebPage = New BaseWebPage()

        Dim pTables = _iTable.All().Where(Function(x) x.RetentionPeriodActive = True Or x.RetentionInactivityActive = True And Not String.IsNullOrEmpty(x.RetentionFieldName))
        '(x.RetentionInactivityActive = 1 Or x.RetentionPeriodActive = 1) AndAlso
        For Each oTable In pTables
            If (BaseWebPage.Passport.CheckPermission(oTable.TableName, Enums.SecureObjects.Table, Smead.Security.Permissions.Permission.View)) Then
                lstRetentionCode.Add(oTable)
            End If
        Next

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        'Dim jsonObject = JsonConvert.SerializeObject(pTables, Formatting.Indented, Setting)
        Dim jsonObject = JsonConvert.SerializeObject(lstRetentionCode, Formatting.Indented, Setting)

        Return Json(jsonObject, JsonRequestBehavior.AllowGet)
    End Function

    'Get the list of all retention codes from system.
    Public Function GetRetentionCodeList() As JsonResult

        Dim pRetentionCodes = _iRetentionCode.All().OrderBy(Function(x) x.Id)

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        Dim jsonObject = JsonConvert.SerializeObject(pRetentionCodes, Formatting.Indented, Setting)

        Return Json(jsonObject, JsonRequestBehavior.AllowGet)

    End Function

#End Region
#End Region

    Public Shared Function IsRetentionTurnOffCitations() As Boolean
        Dim RetentionTurnOffCitations = False
        Try
            Dim _iSystem As IRepository(Of Models.System) = New Repositories(Of Models.System)()
            Dim pSystemEntity = _iSystem.All.OrderBy(Function(x) x.Id).FirstOrDefault()
            RetentionTurnOffCitations = pSystemEntity.RetentionTurnOffCitations
        Catch ex As Exception

        End Try

        Return RetentionTurnOffCitations
    End Function
End Class