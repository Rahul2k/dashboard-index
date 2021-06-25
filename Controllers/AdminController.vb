Imports System.Linq
Imports System.Web
Imports System.Web.Mvc
Imports TabFusionRMS.Models
Imports TabFusionRMS.RepositoryVB
Imports TabFusionRMS.DataBaseManagerVB
Imports System.Xml
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

Namespace TABFusionRMS.Web.Controllers

    '<AuthenticationFilter()> _
    Public Class AdminController
        Inherits BaseController

        Private Property _ivwGridSetting As IRepository(Of vwGridSetting)
        Private Property _ivwTablesAll As IRepository(Of vwTablesAll)
        Private Property _ivwGetOutputSetting As IRepository(Of vwGetOutputSetting)
        Private Property _ivwColumnsAll As IRepository(Of vwColumnsAll)
        Private Property _iSystemAddress As IRepository(Of SystemAddress)
        Private Property _iVolume As IRepository(Of Volume)
        Private Property _iOutputSetting As IRepository(Of OutputSetting)
        Private Property _iSecureObject As IRepository(Of Models.SecureObject)
        Private Property _iDirectory As IRepository(Of Directory)
        Private Property _iSetting As IRepository(Of Setting)
        Private Property _iSystem As IRepository(Of Models.System)
        Private Property _iTable As IRepository(Of Table)
        Private Property _iRelationShip As IRepository(Of RelationShip)
        Private Property _iScanList As IRepository(Of ScanList)
        Private Property _iSLRequestor As IRepository(Of SLRequestor)
        Private Property _iOneStripJobField As IRepository(Of OneStripJobField)
        Private Property _iOneStripJob As IRepository(Of OneStripJob)
        Private Property _iSLTrackingSelectData As IRepository(Of SLTrackingSelectData)
        Private Property _iAssetStatus As IRepository(Of AssetStatu)
        Private Property _iTrackingHistory As IRepository(Of TrackingHistory)
        Private Property _iSLAuditUpdate As IRepository(Of SLAuditUpdate)
        Private Property _iDatabas As IRepository(Of Databas)
        Private Property _iSLAuditUpdChildren As IRepository(Of SLAuditUpdChildren)
        Private Property _iSLAuditConfData As IRepository(Of SLAuditConfData)
        Private Property _iSLAuditFailedLogin As IRepository(Of SLAuditFailedLogin)
        Private Property _iSLAuditLogin As IRepository(Of SLAuditLogin)
        Private Property _iView As IRepository(Of View)
        Private Property _iReportStyle As IRepository(Of ReportStyle)
        Private Property _iTabset As IRepository(Of TabSet)
        Private Property _iTabletab As IRepository(Of TableTab)
        Private Property _iAttribute As IRepository(Of Attribute)
        Private Property _iViewColumn As IRepository(Of ViewColumn)
        Private Property _iViewFilter As IRepository(Of ViewFilter)
        Private Property _iLookupType As IRepository(Of LookupType)
        Private Property _iSLIndexer As IRepository(Of SLIndexer)
        Private Property _iSLIndexerCache As IRepository(Of SLIndexerCache)
        Private Property _iSLServiceTasks As IRepository(Of SLServiceTask)
        Private Property _iSLServiceTaskItem As IRepository(Of SLServiceTaskItem)
        Private Property _iTrackingStatus As IRepository(Of TrackingStatu)
        Private Property _iSLTableFileRoomOrder As IRepository(Of SLTableFileRoomOrder)
        Private Property _iImportLoad As IRepository(Of ImportLoad)
        Private Property _iImportField As IRepository(Of ImportField)
        Private Property _iSLTextSearchItem As IRepository(Of SLTextSearchItem)
        Private Property _iSecureObjectPermission As IRepository(Of SecureObjectPermission)
        Private Property _iSecureUser As IRepository(Of SecureUser)
        Private Property _iSecureGroup As IRepository(Of SecureGroup)
        Private Property _iSecureUserGroup As IRepository(Of SecureUserGroup)
        Private Property _iImagePointer As IRepository(Of ImagePointer)
        Private Property _iPCFilesPointer As IRepository(Of PCFilesPointer)
        Private Property _iSLRetentionCode As IRepository(Of SLRetentionCode)
        Private Property _is_SavedChildrenQuery As IRepository(Of s_SavedChildrenQuery)
        Private Property _is_SavedCriteria As IRepository(Of s_SavedCriteria)
        Private Property _is_SavedChildrenFavorite As IRepository(Of s_SavedChildrenFavorite)
        'Private Property _IDBManager As IDBManager
        Dim _IDBManager As IDBManager = New DBManager
        'IDBManager As IDBManager,
        'Dim BaseWebPageMain As BaseWebPage = Nothing
        'Dim oSecureObjectMain As Smead.Security.SecureObject = Nothing
        Public Sub New(
                        ivwTablesAll As IRepository(Of vwTablesAll),
                        iSystemAddress As IRepository(Of SystemAddress),
                       iVolume As IRepository(Of Volume),
                        iSecureObject As IRepository(Of Models.SecureObject),
                        ivwColumnsAll As IRepository(Of vwColumnsAll),
                        ivwGetOutputSetting As IRepository(Of vwGetOutputSetting),
                       iOutputSetting As IRepository(Of OutputSetting),
                        iDirectory As IRepository(Of Directory),
                        iSetting As IRepository(Of Setting),
                        iSystem As IRepository(Of Models.System),
                       ivwGridSetting As IRepository(Of vwGridSetting),
                        iScanList As IRepository(Of ScanList),
                        iSLRequestor As IRepository(Of SLRequestor),
                       iOneStripJobField As IRepository(Of OneStripJobField),
                       iOneStripJob As IRepository(Of OneStripJob),
                        iTable As IRepository(Of Table),
                        iRelationShip As IRepository(Of RelationShip),
                        iSLTrackingSelectData As IRepository(Of SLTrackingSelectData),
                        iAssetStatus As IRepository(Of AssetStatu),
                        iTrackingHistory As IRepository(Of TrackingHistory),
                        iSLAuditUpdate As IRepository(Of SLAuditUpdate),
                        iDatabas As IRepository(Of Databas),
                        iSLAuditUpdChildren As IRepository(Of SLAuditUpdChildren),
                        iSLAuditConfData As IRepository(Of SLAuditConfData),
                        iSLAuditFailedLogin As IRepository(Of SLAuditFailedLogin),
                        iSLAuditLogin As IRepository(Of SLAuditLogin),
                        iTabset As IRepository(Of TabSet),
                        iTabletab As IRepository(Of TableTab),
                        iView As IRepository(Of View),
                        iReportStyle As IRepository(Of ReportStyle),
                        iAttribute As IRepository(Of Attribute),
                        iViewColumn As IRepository(Of ViewColumn),
                        iViewFilter As IRepository(Of ViewFilter),
                        iLookupType As IRepository(Of LookupType),
                        iSLIndexer As IRepository(Of SLIndexer),
                        iSLIndexerCache As IRepository(Of SLIndexerCache),
                        iSLServiceTasks As IRepository(Of SLServiceTask),
                        iSLServiceTaskItem As IRepository(Of SLServiceTaskItem),
                        iTrackingStatus As IRepository(Of TrackingStatu),
                        iSLTableFileRoomOrder As IRepository(Of SLTableFileRoomOrder),
                        iImportLoad As IRepository(Of ImportLoad),
                        iImportField As IRepository(Of ImportField),
                        iSLTextSearchItem As IRepository(Of SLTextSearchItem),
                        iSecureUser As IRepository(Of SecureUser),
                        iSecureGroup As IRepository(Of SecureGroup),
                        iSecureUserGroup As IRepository(Of SecureUserGroup),
                        iSecureObjectPermission As IRepository(Of SecureObjectPermission),
                        iImagePointer As IRepository(Of ImagePointer),
                        iPCFilesPointer As IRepository(Of PCFilesPointer),
                        iSLRetentionCode As IRepository(Of SLRetentionCode),
                        is_SavedCriteria As IRepository(Of s_SavedCriteria),
                        is_SavedChildrenQuery As IRepository(Of s_SavedChildrenQuery),
                        is_SavedChildrenFavorite As IRepository(Of s_SavedChildrenFavorite))

            MyBase.New()
            '_IDBManager = IDBManager
            _ivwTablesAll = ivwTablesAll
            _ivwGridSetting = ivwGridSetting
            _ivwGetOutputSetting = ivwGetOutputSetting
            _iOutputSetting = iOutputSetting
            _iDirectory = iDirectory
            _ivwColumnsAll = ivwColumnsAll
            _iSetting = iSetting
            _iSystem = iSystem
            _iSystemAddress = iSystemAddress
            _iVolume = iVolume
            _iSecureObject = iSecureObject
            _iTable = iTable
            _iRelationShip = iRelationShip
            _iScanList = iScanList
            _iSLRequestor = iSLRequestor
            _iOneStripJobField = iOneStripJobField
            _iOneStripJob = iOneStripJob
            _iSLTrackingSelectData = iSLTrackingSelectData
            _iAssetStatus = iAssetStatus
            _iTrackingHistory = iTrackingHistory

            _iDatabas = iDatabas
            _iSLAuditUpdate = iSLAuditUpdate
            _iSLAuditUpdChildren = iSLAuditUpdChildren
            _iSLAuditConfData = iSLAuditConfData
            _iSLAuditLogin = iSLAuditLogin
            _iSLAuditFailedLogin = iSLAuditFailedLogin

            _iTabset = iTabset
            _iTabletab = iTabletab
            _iView = iView
            _iReportStyle = iReportStyle
            _iAttribute = iAttribute
            _iViewColumn = iViewColumn
            _iViewFilter = iViewFilter
            _iLookupType = iLookupType
            _iSLIndexer = iSLIndexer
            _iSLIndexerCache = iSLIndexerCache
            _iSLServiceTasks = iSLServiceTasks
            _iSLServiceTaskItem = iSLServiceTaskItem
            _iTrackingStatus = iTrackingStatus
            _iSLTableFileRoomOrder = iSLTableFileRoomOrder
            _iImportLoad = iImportLoad
            _iImportField = iImportField
            _iSLTextSearchItem = iSLTextSearchItem
            _iSecureUser = iSecureUser
            _iSecureGroup = iSecureGroup
            _iSecureUserGroup = iSecureUserGroup
            _iSecureObjectPermission = iSecureObjectPermission
            _iImagePointer = iImagePointer
            _iPCFilesPointer = iPCFilesPointer
            _iSLRetentionCode = iSLRetentionCode

            _is_SavedCriteria = is_SavedCriteria
            _is_SavedChildrenQuery = is_SavedChildrenQuery
            _is_SavedChildrenFavorite = is_SavedChildrenFavorite
        End Sub

        '<SkipMyGlobalActionFilter> _
        Public Function Index() As ActionResult
            If Not Session("fileName") Is Nothing Then
                Return RedirectToAction("Index", "Upload")
            End If
            'Keys.iAdminRefId = Keys.GetUserId
            Session("iAdminRefId") = Keys.GetUserId
            Return View()
        End Function

        Public Function BindAccordian() As ActionResult
            'Added by Ganesh for Security fix.
            Dim pTablesEntities = _ivwTablesAll.All().OrderByField("UserName", True)
            Dim lstDataTbl As Dictionary(Of String, String) = New Dictionary(Of String, String)
            Dim BaseWebPage As BaseWebPage = New BaseWebPage()

            For Each Table As vwTablesAll In pTablesEntities
                If CollectionsClass.IsEngineTable(Table.TABLE_NAME) Then
                    Table.UserName = Table.UserName + "*"
                    lstDataTbl.Add(Table.TABLE_NAME, Table.UserName)
                ElseIf BaseWebPage.Passport.CheckPermission(Table.TABLE_NAME, Smead.Security.SecureObject.SecureObjectType.Table, Permissions.Permission.View) Then
                    Table.UserName = Table.UserName
                    lstDataTbl.Add(Table.TABLE_NAME, Table.UserName)
                End If
            Next

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.None
            Dim jsonObject = JsonConvert.SerializeObject(lstDataTbl, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

#Region "Application"

#Region "Email Notification"
        Public Function LoadEmailNotificationView() As PartialViewResult
            Return PartialView("_EmailNotificationPartial")
        End Function

        Public Function EmailSettingPartialView() As PartialViewResult
            Return PartialView("_EmailSettingPartial")
        End Function

        Private Enum EmailType
            etDelivery = &H1
            etWaitList = &H2
            etException = &H4
            etCheckedOut = &H8
            etRequest = &H10
            etPastDue = &H20
            etSimple = &H40
            etBackground = &H80
        End Enum

        <HttpPost>
        Public Function SetEmailDetails(systemEmail As Models.System, pEMailDeliveryEnabled As Boolean, pEMailWaitListEnabled As Boolean, pEMailExceptionEnabled As Boolean, pEMailBackgroundEnabled As Boolean, pSMTPAuthentication As Boolean) As ActionResult
            Try
                Dim eNotificationEnabled As EmailType
                Dim pSystemEntity = _iSystem.All().OrderBy(Function(x) x.Id).FirstOrDefault()
                pSystemEntity.EMailDeliveryEnabled = pEMailDeliveryEnabled
                pSystemEntity.EMailWaitListEnabled = pEMailWaitListEnabled
                pSystemEntity.EMailExceptionEnabled = pEMailExceptionEnabled

                If pEMailDeliveryEnabled Then eNotificationEnabled += EmailType.etDelivery
                If pEMailWaitListEnabled Then eNotificationEnabled += EmailType.etWaitList
                If pEMailExceptionEnabled Then eNotificationEnabled += EmailType.etException
                If pEMailBackgroundEnabled Then eNotificationEnabled += EmailType.etBackground
                pSystemEntity.NotificationEnabled = eNotificationEnabled

                pSystemEntity.SMTPServer = systemEmail.SMTPServer
                If (Not (systemEmail.SMTPPort Is Nothing)) Then
                    pSystemEntity.SMTPPort = systemEmail.SMTPPort
                Else
                    pSystemEntity.SMTPPort = 25
                End If
                If (Not (systemEmail.EMailConfirmationType Is Nothing)) Then
                    pSystemEntity.EMailConfirmationType = systemEmail.EMailConfirmationType
                Else
                    pSystemEntity.EMailConfirmationType = 0
                End If
                If ((systemEmail.SMTPUserAddress Is Nothing) Or (systemEmail.SMTPUserPassword Is Nothing)) Then
                    pSystemEntity.SMTPUserPassword = pSystemEntity.SMTPUserPassword
                    pSystemEntity.SMTPUserAddress = pSystemEntity.SMTPUserAddress
                Else
                    pSystemEntity.SMTPUserAddress = systemEmail.SMTPUserAddress
                    Dim encrypted As String = Tables.GenerateKey(1, systemEmail.SMTPUserPassword, Nothing)
                    pSystemEntity.SMTPUserPassword = encrypted
                End If
                pSystemEntity.SMTPAuthentication = pSMTPAuthentication
                _iSystem.Update(pSystemEntity)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRecUpdatedSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetSMTPDetails(Optional ByVal flagSMTP As Boolean = False) As ActionResult
            Try
                Dim pSystemEntity = _iSystem.All().OrderBy(Function(x) x.Id).FirstOrDefault()
                If (flagSMTP) Then
                    If (Not (pSystemEntity.SMTPUserPassword Is Nothing)) Then
                        Dim byteArray() As Byte = Encoding.Default.GetBytes(pSystemEntity.SMTPUserPassword)
                        Dim encrypted As String = Tables.GenerateKey(0, Nothing, byteArray)
                        pSystemEntity.SMTPUserPassword = encrypted
                    End If
                End If
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim jsonObject = JsonConvert.SerializeObject(pSystemEntity, Newtonsoft.Json.Formatting.Indented, Setting)
                Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Return Json(New With {
                Key .errortype = "e",
                Key .message = Keys.ErrorMessageJS()
                }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try

        End Function

#End Region

#Region "Requestor"
        Public Function LoadRequestorView() As PartialViewResult
            Return PartialView("_RequestorPartial")
        End Function

        Public Function RemoveRequestorEntity(statusVar As String) As ActionResult
            Try
                Dim pSLRequestorEntity = _iSLRequestor.All().Where(Function(m) m.Status.Trim().ToLower().Equals(statusVar.Trim().ToLower()))
                If pSLRequestorEntity.Count() <> 0 Then
                    _iSLRequestor.DeleteRange(pSLRequestorEntity)
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Keys.DeleteSuccessMessage()
                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlNoData2Purge")
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

        Public Function ResetRequestorLabel(tableName As String) As ActionResult
            Try
                _iOneStripJob.BeginTransaction()
                Dim pOneStripJob = _iOneStripJob.All().Where(Function(m) m.TableName.Trim().ToLower().Equals(tableName.Trim().ToLower())).FirstOrDefault()
                If pOneStripJob Is Nothing Then
                    Dim rStripJob As OneStripJob = New OneStripJob
                    rStripJob.Name = "Requestor Default Label"
                    rStripJob.Inprint = 0
                    rStripJob.TableName = "SLRequestor"
                    rStripJob.OneStripFormsId = 101
                    rStripJob.UserUnits = 0
                    rStripJob.LabelWidth = 5040
                    rStripJob.LabelHeight = 1620
                    rStripJob.DrawLabels = False
                    rStripJob.LastCounter = 0
                    rStripJob.SQLString = "SELECT * FROM [SLRequestor] WHERE [Id] = %ID%"
                    rStripJob.SQLUpdateString = ""
                    rStripJob.LSAfterPrinting = ""
                    _iOneStripJob.Add(rStripJob)
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRecAddedSuccessfully")
                Else
                    pOneStripJob.Name = "Requestor Default Label"
                    pOneStripJob.Inprint = 0
                    pOneStripJob.TableName = "SLRequestor"
                    pOneStripJob.OneStripFormsId = 101
                    pOneStripJob.UserUnits = 0
                    pOneStripJob.LabelWidth = 5040
                    pOneStripJob.LabelHeight = 1620
                    pOneStripJob.DrawLabels = False
                    pOneStripJob.LastCounter = 0
                    pOneStripJob.SQLString = "SELECT * FROM [SLRequestor] WHERE [Id] = %ID%"
                    pOneStripJob.SQLUpdateString = ""
                    pOneStripJob.LSAfterPrinting = ""
                    _iOneStripJob.Update(pOneStripJob)
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRecUpdatedSuccessfully")
                End If

                Dim pOneStripJobId = _iOneStripJob.All().Where(Function(m) m.TableName.Trim().ToLower().Equals(tableName.Trim().ToLower())).FirstOrDefault()
                If pOneStripJob Is Nothing Then
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlNoRec4DRL")
                Else
                    Dim pDatabaseEntity = Nothing
                    _IDBManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)
                    _IDBManager.CreateParameters(1)
                    _IDBManager.AddParameters(0, "@JobsId", pOneStripJobId.Id)
                    Dim loutput = _IDBManager.ExecuteNonQuery(System.Data.CommandType.StoredProcedure, "SP_RMS_AddRequestorJobFields")
                    _IDBManager.Dispose()
                End If
                _iOneStripJob.CommitTransaction()
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
           Key .errortype = Keys.ErrorType,
           Key .message = Keys.ErrorMessage
       }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

        End Function

        <HttpPost>
        Public Function SetRequestorSystemEntity(pConfirmType As Integer, pPrintMethod As Integer, pIdType As Integer, pAllowList As Boolean, pPopupList As Boolean, pPrintCopies As Integer, pPrintInterval As Integer) As ActionResult
            Try
                Dim pSystemEntity = _iSystem.All().OrderBy(Function(x) x.Id).FirstOrDefault()
                pSystemEntity.RequestConfirmation = pConfirmType
                pSystemEntity.ReqAutoPrintMethod = pPrintMethod
                pSystemEntity.ReqAutoPrintIDType = pIdType
                pSystemEntity.AllowWaitList = pAllowList
                pSystemEntity.PopupWaitList = pPopupList
                pSystemEntity.ReqAutoPrintCopies = pPrintCopies
                pSystemEntity.ReqAutoPrintInterval = pPrintInterval
                _iSystem.Update(pSystemEntity)
                Keys.ErrorMessage = Keys.SaveSuccessMessage()
                Keys.ErrorType = "s"
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetRequestorSystemEntity() As ActionResult
            Try
                Dim pSystemEntity = _iSystem.All().OrderBy(Function(x) x.Id).FirstOrDefault()
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim jsonObject = JsonConvert.SerializeObject(pSystemEntity, Newtonsoft.Json.Formatting.Indented, Setting)
                Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Return Json(New With {
                Key .errortype = "e",
                Key .message = Keys.ErrorMessageJS()
                }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try

        End Function
#End Region

#Region "Retention"

        'GET the view for Admin control of Retention.
        Function AdminRetentionPartial() As ActionResult
            Return PartialView("_RetentionPartial")
        End Function

        'Load view for retention properties.
        Function LoadRetentionPropView() As ActionResult
            Return PartialView("_RetentionPropertiesPartial")
        End Function

        Public Function GetRetentionPeriodTablesList() As ActionResult

            Try
                Dim lTableEntites = From t In _iTable.All().OrderBy(Function(m) m.TableName)
                                    Select t.TableName, t.UserName, t.RetentionPeriodActive, t.RetentionInactivityActive

                Dim lSystem = From x In _iSystem.All()
                              Select x.RetentionTurnOffCitations, x.RetentionYearEnd

                Dim lSLServiceTasks = From y In _iSLServiceTasks.All()
                                      Select y.Type, y.Interval

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim jsonObject = JsonConvert.SerializeObject(lTableEntites, Newtonsoft.Json.Formatting.Indented, Setting)

                Dim systemJsonObject = JsonConvert.SerializeObject(lSystem, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim serviceJsonObject = JsonConvert.SerializeObject(lSLServiceTasks, Newtonsoft.Json.Formatting.Indented, Setting)

                Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .ltablelist = jsonObject,
                    Key .lsystemlist = systemJsonObject,
                    Key .lservicelist = serviceJsonObject
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Return Json(New With {Key .success = False, Key .errortype = "e", Key .message = Keys.ErrorMessageJS})
            End Try

        End Function

        <HttpPost>
        Public Function RemoveRetentionTableFromList(pTableIds As Array) As ActionResult
            Try
                For Each item As String In pTableIds
                    If Not String.IsNullOrEmpty(item) Then
                        Dim pTableId As Integer = Convert.ToInt32(item)
                        Dim pTableEntity = _iTable.All().Where(Function(x) x.TableId.Equals(pTableId)).FirstOrDefault()
                        pTableEntity.RetentionPeriodActive = False
                        pTableEntity.RetentionInactivityActive = False

                        _iTable.Update(pTableEntity)
                    End If
                Next
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlTblMoveSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function SetRetentionTblPropData(pTableId As Integer, pInActivity As Boolean, pAssignment As Integer, pDisposition As Integer, pDefaultRetentionId As String, pRelatedTable As String, pRetentionCode As String, pDateOpened As String, pDateClosed As String, pDateCreated As String, pOtherDate As String) As ActionResult

            Dim msgVerifyRetDisposition As String = ""
            Dim sSQL As String = ""
            Dim sADOConn As ADODB.Connection
            Try
                Dim pTableEntites = _iTable.All().Where(Function(x) x.TableId.Equals(pTableId)).FirstOrDefault()
                Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableEntites.TableName.Trim().ToLower())).FirstOrDefault()
                sADOConn = DataServices.DBOpen(oTables, _iDatabas.All())

                Dim oViews = _iView.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableEntites.TableName.Trim().ToLower())).FirstOrDefault()

                Dim pDatabaseEntity = Nothing
                If Not pTableEntites Is Nothing Then
                    If Not pTableEntites.DBName Is Nothing Then
                        pDatabaseEntity = _iDatabas.Where(Function(x) x.DBName.Trim().ToLower().Equals(pTableEntites.DBName.Trim().ToLower())).FirstOrDefault()
                    End If
                End If
                '_IDBManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)

                If (pDisposition <> 0) OrElse pInActivity Then
                    pTableEntites.RetentionAssignmentMethod = pAssignment
                    pTableEntites.DefaultRetentionId = pDefaultRetentionId
                    pTableEntites.RetentionRelatedTable = pRelatedTable
                End If

                pTableEntites.RetentionPeriodActive = (pDisposition <> 0)
                pTableEntites.RetentionInactivityActive = pInActivity
                pTableEntites.RetentionFinalDisposition = pDisposition

                'Field Defination fields are allowed to save when None Disposition is selected.
                If Not pRetentionCode = "" Then
                    If (pRetentionCode.Substring(0, 1) = "*") Then
                        Tables.SaveNewFieldToTable(pTableEntites.TableName, pRetentionCode.Substring(1).Trim(), Enums.DataTypeEnum.rmVarWChar, pDatabaseEntity, oViews.Id)

                        pTableEntites.RetentionFieldName = pRetentionCode.Substring(1).Trim()
                    Else
                        pTableEntites.RetentionFieldName = pRetentionCode
                    End If
                End If

                If Not pDateOpened = "" Then
                    If (pDateOpened.Substring(0, 1) = "*") Then
                        Tables.SaveNewFieldToTable(pTableEntites.TableName, pDateOpened.Substring(1).Trim(), Enums.DataTypeEnum.rmDate, pDatabaseEntity, oViews.Id)

                        pTableEntites.RetentionDateOpenedField = pDateOpened.Substring(1).Trim()
                    Else
                        pTableEntites.RetentionDateOpenedField = pDateOpened
                    End If
                End If

                If Not pDateClosed = "" Then
                    If (pDateClosed.Substring(0, 1) = "*") Then
                        Tables.SaveNewFieldToTable(pTableEntites.TableName, pDateClosed.Substring(1).Trim(), Enums.DataTypeEnum.rmDate, pDatabaseEntity, oViews.Id)

                        pTableEntites.RetentionDateClosedField = pDateClosed.Substring(1).Trim()
                    Else
                        pTableEntites.RetentionDateClosedField = pDateClosed
                    End If
                End If

                If Not pDateCreated = "" Then
                    If (pDateCreated.Substring(0, 1) = "*") Then
                        Tables.SaveNewFieldToTable(pTableEntites.TableName, pDateCreated.Substring(1).Trim(), Enums.DataTypeEnum.rmDate, pDatabaseEntity, oViews.Id)

                        pTableEntites.RetentionDateCreateField = pDateCreated.Substring(1).Trim()
                    Else
                        pTableEntites.RetentionDateCreateField = pDateCreated
                    End If
                End If

                If Not pOtherDate = "" Then
                    If (pOtherDate.Substring(0, 1) = "*") Then
                        Tables.SaveNewFieldToTable(pTableEntites.TableName, pOtherDate.Substring(1).Trim(), Enums.DataTypeEnum.rmDate, pDatabaseEntity, oViews.Id)

                        pTableEntites.RetentionDateOtherField = pOtherDate.Substring(1).Trim()
                    Else
                        pTableEntites.RetentionDateOtherField = pOtherDate
                    End If
                End If

                _iTable.Update(pTableEntites)

                msgVerifyRetDisposition = VerifyRetentionDispositionTypesForParentAndChildren(pTableEntites.TableId)

                'Add the Retention Status fields
                sSQL = "ALTER TABLE [" & pTableEntites.TableName & "]"
                sSQL = sSQL & " ADD [%slRetentionInactive] BIT DEFAULT 0"
                DataServices.ProcessADOCommand(sSQL, sADOConn, False)
                sSQL = ""

                sSQL = "ALTER TABLE [" & pTableEntites.TableName & "]"
                sSQL = sSQL & " ADD [%slRetentionInactiveFinal] BIT DEFAULT 0"
                DataServices.ProcessADOCommand(sSQL, sADOConn, False)
                sSQL = ""

                'Add the Retention Disposition Status field
                sSQL = "ALTER TABLE [" & pTableEntites.TableName & "]"
                sSQL = sSQL & " ADD [%slRetentionDispositionStatus] INT DEFAULT 0"
                DataServices.ProcessADOCommand(sSQL, sADOConn, False)
                sSQL = ""

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.SaveSuccessMessage()

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .msgVerifyRetDisposition = msgVerifyRetDisposition,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)

        End Function

        Public Function VerifyRetentionDispositionTypesForParentAndChildren(pTableId As Integer) As String
            Dim oTable As Table

            Dim sMessage As String = String.Empty

            Dim pTableEntites = _iTable.All().Where(Function(x) x.TableId.Equals(pTableId)).FirstOrDefault()

            'Dim lstRelatedTables = _iRelationShip.All().Where(Function(x) x.UpperTableName = pTableEntites.TableName).ToList()
            Dim lstRelatedTables = _iRelationShip.All().Where(Function(x) x.LowerTableName = pTableEntites.TableName).ToList()
            Dim lstRelatedChildTable = _iRelationShip.All().Where(Function(x) x.UpperTableName = pTableEntites.TableName).ToList()

            Try
                If (pTableEntites.RetentionFinalDisposition <> 0) Then

                    For Each lTableName In lstRelatedTables

                        oTable = _iTable.All().Where(Function(x) x.TableName.Equals(lTableName.UpperTableName)).FirstOrDefault()

                        If (oTable IsNot Nothing) Then
                            If (((oTable.RetentionPeriodActive) Or (oTable.RetentionInactivityActive)) And (oTable.RetentionFinalDisposition <> 0)) Then
                                If (oTable.RetentionFinalDisposition <> pTableEntites.RetentionFinalDisposition) Then sMessage = vbTab & vbTab & oTable.UserName & vbCrLf
                            End If
                            oTable = Nothing
                        End If

                    Next

                    For Each lTableName In lstRelatedChildTable

                        oTable = _iTable.All().Where(Function(x) x.TableName.Equals(lTableName.LowerTableName)).FirstOrDefault()

                        If (oTable IsNot Nothing) Then
                            If (((oTable.RetentionPeriodActive) Or (oTable.RetentionInactivityActive)) And (oTable.RetentionFinalDisposition <> 0)) Then
                                If (oTable.RetentionFinalDisposition <> pTableEntites.RetentionFinalDisposition) Then sMessage = vbTab & vbTab & oTable.UserName & vbCrLf
                            End If
                            oTable = Nothing
                        End If

                    Next

                    If (sMessage > "") Then
                        'sMessage = "<b>WARNING:</b>  The following related tables have a retention disposition " & vbCrLf & _
                        '           "set differently than this table:</br></br>" & _
                        '           sMessage & vbCrLf & _
                        '           "</br></br>This could give different results than expected." & vbCrLf & _
                        '           "</br></br>Please correct the appropriate table if this is not what is intended."
                        sMessage = String.Format(Languages.Translation("msgAdminCtrlWarningL1"), vbNewLine, sMessage)
                    End If
                End If
            Catch ex As Exception
                sMessage = String.Empty
            End Try

            Return sMessage
        End Function

        Public Function GetRetentionPropertiesData(pTableId As Integer) As ActionResult

            Dim lstRetCodeFields As New List(Of String)
            Dim lstDateFields As New List(Of String)
            Dim lstRelatedTable As New List(Of String)
            Dim bFootNote As Boolean
            Dim lstRetentionCode As String = ""
            Dim lstDateClosed As String = ""
            Dim lstDateCreated As String = ""
            Dim lstDateOpened As String = ""
            Dim lstDateOther As String = ""
            Dim conObj As ADODB.Connection
            Dim BaseWebPage As BaseWebPage = New BaseWebPage
            Dim bTrackable As Boolean = False

            If pTableId = -1 Then
                Return Json(New With {Key .success = False, Key .errortype = "e", Key .message = Keys.ErrorMessageJS})
            End If
            Try
                Dim pTableEntites = _iTable.All().Where(Function(x) x.TableId.Equals(pTableId)).FirstOrDefault()
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.SaveSuccessMessage()

                bTrackable = BaseWebPage.Passport.CheckPermission(pTableEntites.TableName.Trim, Enums.SecureObjects.Table, Enums.PassportPermissions.Transfer)

                If pTableEntites Is Nothing Then
                    Return Json(New With {Key .success = False, Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlRecordNotFound")})
                End If

                'Dim conObj As ADODB.Connection = DataServices.DBOpen(Enums.eConnectionType.conDefault)
                Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableEntites.TableName.Trim().ToLower())).FirstOrDefault()
                conObj = DataServices.DBOpen(oTables, _iDatabas.All())

                Dim dbRecordSet As List(Of SchemaColumns) = SchemaInfoDetails.GetTableSchemaInfo(pTableEntites.TableName, conObj)

                If Not dbRecordSet.Exists(Function(x) x.ColumnName = "RetentionCodesId") Then
                    lstRetentionCode = "* RetentionCodesId"
                    bFootNote = True
                End If

                If Not dbRecordSet.Exists(Function(x) x.ColumnName = "DateOpened") Then
                    lstDateOpened = "* DateOpened"
                    bFootNote = True
                End If

                If Not dbRecordSet.Exists(Function(x) x.ColumnName = "DateClosed") Then
                    lstDateClosed = "* DateClosed"
                    bFootNote = True
                End If

                If Not dbRecordSet.Exists(Function(x) x.ColumnName = "DateCreated") Then
                    lstDateCreated = "* DateCreated"
                    bFootNote = True
                End If

                If Not dbRecordSet.Exists(Function(x) x.ColumnName = "DateOther") Then
                    lstDateOther = "* DateOther"
                    bFootNote = True
                End If

                For Each oSchemaColumn In dbRecordSet

                    If (Not SchemaInfoDetails.IsSystemField(oSchemaColumn.ColumnName)) Then
                        If oSchemaColumn.IsADate Then
                            lstDateFields.Add(oSchemaColumn.ColumnName)
                        ElseIf oSchemaColumn.IsString AndAlso oSchemaColumn.CharacterMaxLength = 20 Then
                            lstRetCodeFields.Add(oSchemaColumn.ColumnName)
                        End If
                    End If
                Next

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects

                lstRetCodeFields.Sort()
                lstDateFields.Sort()

                Dim RetCodeFieldsObject = JsonConvert.SerializeObject(lstRetCodeFields, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim DateFields = JsonConvert.SerializeObject(lstDateFields, Newtonsoft.Json.Formatting.Indented, Setting)

                Dim lstRelatedTables = _iRelationShip.All().Where(Function(x) x.LowerTableName = pTableEntites.TableName).ToList()

                For Each item As RelationShip In lstRelatedTables
                    lstRelatedTable.Add(item.UpperTableName)
                Next

                Dim lstTables = _iTable.All().Where(Function(x) x.RetentionPeriodActive = True And x.RetentionFinalDisposition <> 0 AndAlso lstRelatedTable.Contains(x.TableName))
                Dim pRetentionCodes = _iSLRetentionCode.All().OrderBy(Function(x) x.Id)

                Dim relatedTblObj = JsonConvert.SerializeObject(lstTables, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim tableObj = JsonConvert.SerializeObject(pTableEntites, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim pRetentionCodesJSON = JsonConvert.SerializeObject(pRetentionCodes, Newtonsoft.Json.Formatting.Indented, Setting)
                Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .tableEntity = tableObj,
                    Key .bTrackable = bTrackable,
                    Key .RetIdFieldsList = RetCodeFieldsObject,
                    Key .RetDateFieldsList = DateFields,
                    Key .lstRetentionCode = lstRetentionCode,
                    Key .lstDateCreated = lstDateCreated,
                    Key .lstDateClosed = lstDateClosed,
                    Key .lstDateOpened = lstDateOpened,
                    Key .lstDateOther = lstDateOther,
                    Key .bFootNote = bFootNote,
                    Key .relatedTblObj = relatedTblObj,
                    Key .pRetentionCodes = pRetentionCodesJSON
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

            Catch ex As Exception
                Return Json(New With {Key .success = False, Key .errortype = "e", Key .message = Keys.ErrorMessageJS})
            End Try
        End Function

        'Set the parameters for Retention admin screen.
        Public Function SetRetentionParameters(pIsUseCitaions As Boolean, pYearEnd As Integer, pInactivityPeriod As Integer) As ActionResult
            Try
                _iSystem.BeginTransaction()
                _iSLServiceTasks.BeginTransaction()

                Dim pSystemEntity = _iSystem.All.OrderBy(Function(x) x.Id).FirstOrDefault()

                pSystemEntity.RetentionTurnOffCitations = pIsUseCitaions
                pSystemEntity.RetentionYearEnd = pYearEnd
                _iSystem.Update(pSystemEntity)

                Dim pServiceTasks = _iSLServiceTasks.All().OrderBy(Function(x) x.Id).FirstOrDefault()
                pServiceTasks.Interval = pInactivityPeriod
                _iSLServiceTasks.Update(pServiceTasks)

                _iSystem.CommitTransaction()
                _iSLServiceTasks.CommitTransaction()

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgJsRetentionPropOnApply") 'Keys.SaveSuccessMessage()
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(New With
            {
                Key .errortype = Keys.ErrorType,
                Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
#End Region

#Region "Tracking"
        Public Function LoadTrackingView() As PartialViewResult
            Return PartialView("_TrackingPartial")
        End Function

        Public Function TrackingFieldPartialView() As PartialViewResult
            Return PartialView("_TrackingFieldPartial")
        End Function

        Public Function GetReconciliation() As ActionResult
            Try
                Dim pAssetNumber = _iAssetStatus.All().OrderBy(Function(m) m.Id)
                Dim totalRecord = pAssetNumber.Count()
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim jsonObject = JsonConvert.SerializeObject(totalRecord, Newtonsoft.Json.Formatting.Indented, Setting)
                Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorMessage = Keys.ErrorMessageJS()
                Keys.ErrorType = "e"
                Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, JsonRequestBehavior.AllowGet)
            End Try

        End Function

        'Public Function RemoveReconciliation() As ActionResult
        '    Try
        '        Dim pAssetEntity = _iAssetStatus.All()
        '        If pAssetEntity.Count() = 0 Then
        '            Keys.ErrorType = "w"
        '            Keys.ErrorMessage = Languages.Translation("msgAdminCtrlNoRecordFoundInSystem")
        '        Else
        '            For Each entity As AssetStatu In pAssetEntity.ToList()
        '                _iAssetStatus.Delete(entity)
        '            Next
        '            Keys.ErrorType = "s"
        '            Keys.ErrorMessage = Keys.DeleteSuccessMessage()
        '        End If
        '    Catch ex As Exception
        '        Keys.ErrorType = "e"
        '        Keys.ErrorMessage = Keys.ErrorMessageJS()
        '    End Try
        '    Return Json(New With {
        '     Key .errortype = Keys.ErrorType,
        '     Key .message = Keys.ErrorMessage
        ' }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        'End Function

        <HttpPost>
        Public Function SetTrackingSystemEntity(systemTracking As Models.System, pDateDueOn As Boolean, pTrackingOutOn As Boolean) As ActionResult
            Try
                Dim pSystemEntity = _iSystem.All.OrderBy(Function(x) x.Id).FirstOrDefault()
                pSystemEntity.TrackingOutOn = pTrackingOutOn
                pSystemEntity.DateDueOn = pDateDueOn
                pSystemEntity.TrackingAdditionalField1Desc = systemTracking.TrackingAdditionalField1Desc
                pSystemEntity.TrackingAdditionalField2Desc = systemTracking.TrackingAdditionalField2Desc
                pSystemEntity.TrackingAdditionalField1Type = systemTracking.TrackingAdditionalField1Type
                pSystemEntity.SignatureCaptureOn = systemTracking.SignatureCaptureOn
                If systemTracking.MaxHistoryDays Is Nothing Then
                    pSystemEntity.MaxHistoryDays = 0
                Else
                    pSystemEntity.MaxHistoryDays = systemTracking.MaxHistoryDays
                End If
                If systemTracking.MaxHistoryItems Is Nothing Then
                    pSystemEntity.MaxHistoryItems = 0
                Else
                    pSystemEntity.MaxHistoryItems = systemTracking.MaxHistoryItems
                End If
                If (systemTracking.DefaultDueBackDays Is Nothing) Or (systemTracking.DefaultDueBackDays = 0) Then
                    pSystemEntity.DefaultDueBackDays = 1
                Else
                    pSystemEntity.DefaultDueBackDays = systemTracking.DefaultDueBackDays
                End If
                _iSystem.Update(pSystemEntity)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminApplicationTracking")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
            End Try

            Return Json(New With {
                        Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage
                            }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetTrackingSystemEntity() As ActionResult
            Try
                Dim pSystemEntity = _iSystem.All.OrderBy(Function(m) m.Id).FirstOrDefault()
                Dim setting = New JsonSerializerSettings
                setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim jsonObject = JsonConvert.SerializeObject(pSystemEntity, Newtonsoft.Json.Formatting.Indented, setting)
                Return Json(jsonObject, "application/json;charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorMessage = Keys.ErrorMessageJS()
                Keys.ErrorType = "e"
                Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, JsonRequestBehavior.AllowGet)
            End Try
        End Function

        Public Function GetTrackingFieldList(sord As String, page As Integer, rows As Integer) As JsonResult
            Dim pTrackingEntity = _iSLTrackingSelectData.All()
            If pTrackingEntity Is Nothing Then
                Return Json(JsonRequestBehavior.AllowGet)
            Else
                Dim jsonData = pTrackingEntity.GetJsonListForGrid(sord, page, rows, "Id")
                Return Json(jsonData, JsonRequestBehavior.AllowGet)
            End If
        End Function

        Public Function GetTrackingField(pRowSelected As Array) As ActionResult
            If pRowSelected Is Nothing Then
                Return Json(New With {Key .success = False})
            End If
            If pRowSelected.Length = 0 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pTrackingFieldId = Convert.ToInt32(pRowSelected.GetValue(0))
            If pTrackingFieldId = 0 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pTrackingFieldEntity = _iSLTrackingSelectData().Where(Function(x) x.SLTrackingSelectDataId = pTrackingFieldId).FirstOrDefault()

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pTrackingFieldEntity, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function SetTrackingField(pSLTrackingData As SLTrackingSelectData) As ActionResult
            Try
                pSLTrackingData.Id = pSLTrackingData.Id.Trim()
                If pSLTrackingData.SLTrackingSelectDataId > 0 Then
                    If _iSLTrackingSelectData.All().Any(Function(x) x.Id.Trim().ToLower() = pSLTrackingData.Id.Trim().ToLower() AndAlso x.SLTrackingSelectDataId <> pSLTrackingData.SLTrackingSelectDataId) = False Then
                        _iSLTrackingSelectData.Update(pSLTrackingData)
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgJsTrackingAdditionalFieldEdit")
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Keys.AlreadyExistMessage(Languages.Translation("msgAdminCtrlAddTrackField"))
                    End If
                Else
                    If _iSLTrackingSelectData.All().Any(Function(x) x.Id.Trim().ToLower() = pSLTrackingData.Id.Trim().ToLower()) = False Then
                        _iSLTrackingSelectData.Add(pSLTrackingData)
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgJSTrackingAdditionalTrackFieldAdd")
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Keys.AlreadyExistMessage(Languages.Translation("msgAdminCtrlAddTrackField"))
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

        Public Function RemoveTrackingField(pRowSelected As Array) As ActionResult
            Try
                If pRowSelected Is Nothing Then
                    Return Json(New With {Key .success = False})
                End If
                If pRowSelected.Length = 0 Then
                    Return Json(New With {Key .success = False})
                End If

                Dim pTrackingFieldId = Convert.ToInt32(pRowSelected.GetValue(0))
                If pTrackingFieldId = 0 Then
                    Return Json(New With {Key .success = False})
                End If
                Dim pTrackingFieldEntity = _iSLTrackingSelectData().Where(Function(x) x.SLTrackingSelectDataId = pTrackingFieldId).FirstOrDefault()
                If Not (pTrackingFieldEntity Is Nothing) Then
                    _iSLTrackingSelectData.Delete(pTrackingFieldEntity)
                    Keys.ErrorMessage = Languages.Translation("msgJsTrackingAdditionalFieldDel") 'Keys.DeleteSuccessMessage()
                    Keys.ErrorType = "s"
                Else
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlNoRecordFoundInSystem")
                    Keys.ErrorType = "e"
                End If
            Catch ex As Exception
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Keys.ErrorType = "e"
            End Try


            Return Json(New With {
                Key .errortype = Keys.ErrorType,
                Key .message = Keys.ErrorMessage
                }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

        End Function

        Public Function SetTrackingHistoryData(systemTracking As Models.System) As ActionResult
            Try
                Dim pSystemEntity = _iSystem.All.OrderBy(Function(x) x.Id).FirstOrDefault()
                If systemTracking.MaxHistoryDays Is Nothing Then
                    pSystemEntity.MaxHistoryDays = 0
                Else
                    pSystemEntity.MaxHistoryDays = systemTracking.MaxHistoryDays
                End If
                If systemTracking.MaxHistoryItems Is Nothing Then
                    pSystemEntity.MaxHistoryItems = 0
                Else
                    pSystemEntity.MaxHistoryItems = systemTracking.MaxHistoryItems
                End If
                _iSystem.Update(pSystemEntity)

                Dim catchFlag As Boolean

                Dim KeysType As String = ""
                '      Dim trackingServiceObj As New TrackingServices(_IDBManager, _iTable, _iDatabase, _iScanList, _iTabSet, _iTableTab, _iRelationship, _iView, _iSystem, _iTrackingHistory)
                catchFlag = TrackingServices.InnerTruncateTrackingHistory(_iSystem.All(), _iTrackingHistory, "", "", KeysType)
                If (catchFlag = True) Then
                    If (KeysType = "s") Then
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("HistoryHasBeenTruncated")
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Languages.Translation("NoMoreHistoryToTruncate")
                    End If

                Else
                    Keys.ErrorMessage = Keys.ErrorMessageJS
                    Keys.ErrorType = "e"
                End If

            Catch ex As Exception
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Keys.ErrorType = "e"
            End Try

            Return Json(New With {
                Key .errortype = Keys.ErrorType,
                Key .message = Keys.ErrorMessage
                }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

#End Region

#Region "Appearance"
        Public Function LoadApplicationView() As PartialViewResult
            Return PartialView("_ApplicationAppearancePartial")
        End Function

        Public Function GetSystemList() As ActionResult

            Dim pSystemEntities = From t In _iSystem.All()
                                  Select t.AlternateRowColors, t.GridBackColorEven, t.GridBackColorOdd, t.GridForeColorEven, t.GridForeColorOdd, t.FormViewMinLines, t.ReportGridColor, t.UseTableIcons

            Dim pSettingEntities = From t In _iSetting.All()
                                   Select t.Section, t.ItemValue

            Dim theme = pSettingEntities.Where(Function(x) x.Section.Trim().ToLower().Equals("usetheme")).First().ItemValue

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pSystemEntities, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

        End Function

        <HttpPost>
        Public Function SetSystemDetails(systemAppearance As Models.System) As ActionResult

            If systemAppearance.Id > 0 Then
                _iSystem.Update(systemAppearance)
            Else
                _iSystem.Add(systemAppearance)
            End If
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function
#End Region

#Region "TABQUIK"

        Public Function LoadTABQUIKIntegrationKeyView() As PartialViewResult
            Return PartialView("_AddTABQUIKKey")
        End Function

        <HttpGet>
        Public Function GetTabquikKey() As JsonResult
            Dim tabquikkey = _iSetting.All().Where(Function(s) s.Item.Equals("Key") And s.Section.Equals("TABQUIK")).FirstOrDefault()

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(tabquikkey, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function SetTabquikKey(pTabquikkey As String) As JsonResult
            Try
                Dim tabquiksetting = _iSetting.All().Where(Function(s) s.Item.Equals("Key") And s.Section.Equals("TABQUIK")).FirstOrDefault()

                If IsNothing(tabquiksetting) Then
                    tabquiksetting = New Setting
                    tabquiksetting.Section = "TABQUIK"
                    tabquiksetting.Item = "Key"
                    tabquiksetting.ItemValue = pTabquikkey
                    _iSetting.Add(tabquiksetting)
                Else
                    tabquiksetting.ItemValue = pTabquikkey
                    _iSetting.Update(tabquiksetting)
                End If

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgJsTabquikSaveSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                   Key .errortype = Keys.ErrorType,
                   Key .message = Keys.ErrorMessage
               }, JsonRequestBehavior.AllowGet)
        End Function

#Region "TABQUIK -> Field Mapping"

        Public Function LoadTABQUIKFieldMappingPartial() As PartialViewResult
            'Set "FLDColumns" session to Nothing, when returnning job list.
            Session("FLDColumns") = Nothing
            Return PartialView("_TABQUIKLabelList")
        End Function

        Public Function TABQUIKFieldMappingPartial(pTabquikId As Integer) As PartialViewResult
            If pTabquikId <> 0 Then
                Dim oOneStripJob = _iOneStripJob.All().Where(Function(x) x.Id = pTabquikId And x.Inprint = 5).FirstOrDefault()
                TempData("sTableName") = oOneStripJob.TableName
                TempData("sSQLUpdateString") = oOneStripJob.SQLUpdateString
            Else
                TempData("sTableName") = ""
                TempData("sSQLUpdateString") = ""
            End If
            Return PartialView("_TABQUIKFieldMapping")
        End Function

        Public Function GetTABQUIKMappingGrid(sTableName As String, sOperation As String, sJobName As String, sord As String, page As Integer, rows As Integer) As JsonResult
            Try
                Dim oDatatable As New DataTable()
                Dim sFLDColumns As String = ""
                Dim splitColumns As List(Of String) = New List(Of String)
                Dim lstAllColumnNames As List(Of String) = New List(Of String)

                oDatatable.Columns.Add(New DataColumn("TABQUIKField"))
                oDatatable.Columns.Add(New DataColumn("TABFusionRMSField"))
                oDatatable.Columns.Add(New DataColumn("Manual"))
                oDatatable.Columns.Add(New DataColumn("Format"))

                If sOperation.Equals("Add") Then
                    If Not IsNothing(Session("FLDColumns")) Then
                        sFLDColumns = Session("FLDColumns").ToString()
                        splitColumns = sFLDColumns.Split("~").ToList()

                        For Each sTABQUIKFieldName As String In splitColumns
                            Dim dr As DataRow = oDatatable.NewRow
                            dr("TABQUIKField") = sTABQUIKFieldName
                            oDatatable.Rows.Add(dr)
                        Next
                    End If
                ElseIf sOperation.Equals("Edit") Then
                    If Not IsNothing(Session("lstAllColumnNames")) Then
                        lstAllColumnNames = CType(Session("lstAllColumnNames"), List(Of String))
                    End If

                    Dim oOneStripJob = _iOneStripJob.All().Where(Function(x) x.Name = sJobName And x.TableName = sTableName And x.Inprint = 5).FirstOrDefault()
                    Dim oOneStripJobGeneral = _iOneStripJob.All().Where(Function(x) x.Name = sJobName And x.Inprint = 5).FirstOrDefault()

                    Dim oOneStripJobFields As IEnumerable(Of OneStripJobField) = Nothing

                    If oOneStripJob IsNot Nothing Then
                        oOneStripJobFields = _iOneStripJobField.All().Where(Function(x) x.OneStripJobsId = oOneStripJob.Id)
                    End If

                    If Not IsNothing(oOneStripJobGeneral) Then
                        If Not String.IsNullOrEmpty(oOneStripJobGeneral.FLDFieldNames) Then
                            sFLDColumns = oOneStripJobGeneral.FLDFieldNames.ToString()
                            splitColumns = sFLDColumns.Split("~").ToList()
                        ElseIf Not IsNothing(Session("FLDColumns")) Then
                            sFLDColumns = Session("FLDColumns").ToString()
                            splitColumns = sFLDColumns.Split("~").ToList()
                        End If
                    End If

                    If Not IsNothing(oOneStripJobFields) Then
                        For Each sTABQUIKFieldName As String In splitColumns
                            Dim oOneStripJobField = oOneStripJobFields.Where(Function(x) x.FontName = sTABQUIKFieldName).FirstOrDefault()
                            Dim dr As DataRow = oDatatable.NewRow
                            dr("TABQUIKField") = sTABQUIKFieldName
                            If Not IsNothing(oOneStripJobField) Then
                                If (InStr(oOneStripJobField.FieldName, vbNullChar) <> 0&) Then
                                    Dim sManualField As String = ""
                                    sManualField = Mid$(oOneStripJobField.FieldName, InStr(oOneStripJobField.FieldName, vbNullChar) + 1&)
                                    dr("TABFusionRMSField") = ""
                                    dr("Manual") = sManualField
                                Else
                                    'Check if field is from current table.
                                    If oOneStripJobField.FieldName.Contains(sTableName & ".") Then
                                        dr("TABFusionRMSField") = lstAllColumnNames.IndexOf(DatabaseMap.RemoveTableNameFromField(oOneStripJobField.FieldName))
                                    Else
                                        dr("TABFusionRMSField") = lstAllColumnNames.IndexOf(">" & oOneStripJobField.FieldName)
                                    End If
                                    dr("Manual") = ""
                                End If

                                dr("Format") = oOneStripJobField.Format
                            Else
                                dr("TABFusionRMSField") = ""
                                dr("Manual") = ""
                                dr("Format") = ""
                            End If
                            oDatatable.Rows.Add(dr)
                        Next
                    Else
                        For Each sTABQUIKFieldName As String In splitColumns
                            Dim dr As DataRow = oDatatable.NewRow
                            dr("TABQUIKField") = sTABQUIKFieldName
                            oDatatable.Rows.Add(dr)
                        Next
                    End If
                End If

                'Kept in session for 'Auto Fill' function, to know the columns data
                Session("dtTABQuikMapping") = oDatatable
                Return Json(Common.ConvertDataTableToJQGridResult(oDatatable, "", sord, page, rows), JsonRequestBehavior.AllowGet)

            Catch ex As Exception
                Throw ex.InnerException
            End Try
        End Function
        Public Function GetTABQUIKMappingGridWithAutoFill(sOperation As String, sord As String, page As Integer, rows As Integer) As ActionResult
            Dim oDatatable As DataTable = New DataTable
            Dim lstAllColumnNames As List(Of String) = New List(Of String)

            Try
                If Not IsNothing(Session("dtTABQuikMapping")) And Not IsNothing(Session("lstAllColumnNames")) Then
                    oDatatable = CType(Session("dtTABQuikMapping"), DataTable)
                    lstAllColumnNames = CType(Session("lstAllColumnNames"), List(Of String))
                    'Find matches between TABQUIK fields and TABFusionRMS fields
                    For Each row As DataRow In oDatatable.Rows
                        Dim tabquikFieldName As String = row("TABQUIKField").ToString()
                        If (lstAllColumnNames.Contains(tabquikFieldName)) Then
                            'row("TABFusionRMSField") = tabquikFieldName
                            row("TABFusionRMSField") = lstAllColumnNames.IndexOf(tabquikFieldName)
                        Else
                            row("TABFusionRMSField") = "0" 'Set it to blank
                        End If
                    Next
                End If
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(Common.ConvertDataTableToJQGridResult(oDatatable, "", sord, page, rows), JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetOneStripJobs() As JsonResult
            Try
                Dim oOneStripJob = _iOneStripJob.All().Where(Function(x) x.Inprint = 5).Select(Function(y) New With {.Value = y.Id, .Name = y.Name, .TableName = y.TableName})
                Return Json(oOneStripJob, JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Throw ex.InnerException
            End Try
        End Function

        Public Function RemoveSelectedJob(pTabquikJobId As Integer) As ActionResult
            Try
                _iOneStripJob.BeginTransaction()
                _iOneStripJobField.BeginTransaction()
                Dim oOneStripJob = _iOneStripJob.All().Where(Function(x) x.Id = pTabquikJobId).FirstOrDefault()
                Dim oOneStripJobFields = _iOneStripJobField.All().Where(Function(x) x.OneStripJobsId = oOneStripJob.Id)

                _iOneStripJobField.DeleteRange(oOneStripJobFields)
                _iOneStripJob.Delete(oOneStripJob)

                _iOneStripJobField.CommitTransaction()
                _iOneStripJob.CommitTransaction()

                Keys.ErrorType = "s"
                Keys.ErrorMessage = ""
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function
        <HttpPost>
        Public Function UploadColorLabelFiles(files As Object) As ActionResult
            Dim serverPath As String = ""
            Dim filePath As String = ""
            Dim sAllFLDColumns As String = ""
            Dim sOperation As String = Request.Form.Get("sOperation").ToString()
            Try
                Dim sJobName As String = Request.Files(0).FileName.Split(".")(0)

                If Not IsJobAlreadyExists(sJobName) Or sOperation.Equals("Edit") Then
                    Dim sGUID As String = System.Guid.NewGuid.ToString()
                    serverPath = Server.MapPath("~/LabelData/")
                    Session("FLDColumns") = Nothing
                    For Each pfilePath As String In Request.Files
                        Dim pfile As HttpPostedFileBase = Request.Files(pfilePath)
                        Dim pfileNameArr = pfilePath.Split(".")

                        If (pfileNameArr(1).ToLower().Equals("fld")) Then
                            Dim pNewFileName = pfileNameArr(0) + "_" + sGUID + "." + pfileNameArr(1)
                            filePath = System.IO.Path.Combine(serverPath, pNewFileName)
                            pfile.SaveAs(filePath)
                        End If
                    Next

                    'Read TABQUIK column names from FLD file
                    Using sr As System.IO.StreamReader = New System.IO.StreamReader(filePath)
                        Dim line As String = ""
                        Dim sTABQUIKFieldName As String = ""

                        While (Not sr.EndOfStream)
                            line = sr.ReadLine()
                            sTABQUIKFieldName = Trim$(Left$(line, 20&))
                            sAllFLDColumns += sTABQUIKFieldName & "~"
                        End While
                    End Using

                    'Delete uploaded design files once we retrieved TABQUIK Field names.            
                    If (System.IO.File.Exists(filePath)) Then
                        System.IO.File.Delete(filePath)
                    End If

                    sAllFLDColumns = Left$(sAllFLDColumns, Len(sAllFLDColumns) - 1&)
                    Session("FLDColumns") = sAllFLDColumns
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = ""
                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgTABQUIKDuplicateJob"), sJobName)
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

        Public Function IsJobAlreadyExists(jobName As String) As Boolean
            Dim jobExists As Boolean = False
            Try
                'Check if JOB already exists for TABQUIK label
                If _iOneStripJob.All().Any(Function(x) x.Name = jobName And x.Inprint = 5) Then
                    jobExists = True
                End If
            Catch ex As Exception

            End Try

            Return jobExists
        End Function

        Public Function IsFLDNamesExists(jobName As String) As JsonResult
            Dim fldNamesExists As Boolean = False
            Dim oOneStripJob As OneStripJob
            Try
                oOneStripJob = _iOneStripJob.All().Where(Function(x) x.Name = jobName And x.Inprint = 5).FirstOrDefault()

                If Not String.IsNullOrEmpty(oOneStripJob.FLDFieldNames) Then
                    fldNamesExists = True
                End If
                Keys.ErrorType = "s"
                Keys.ErrorMessage = ""
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
               Key .errortype = Keys.ErrorType,
               Key .message = Keys.ErrorMessage,
               Key .fldNamesExists = fldNamesExists
           }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetTableFieldsListAndParentTableFields(pTableName As String) As ActionResult
            Dim lstAllColumnNames As List(Of String) = New List(Of String)
            Try
                Dim lstColumnNames As List(Of String) = New List(Of String)
                Dim oParentTableList = _iRelationShip.All().Where(Function(x) x.LowerTableName = pTableName).Select(Function(y) New With {.TableName = y.UpperTableName}).ToList()

                'Insert first value blank for empty field selection
                lstColumnNames.Add("")
                lstColumnNames.AddRange(GetColumnListOfTable(pTableName))
                lstAllColumnNames.AddRange(lstColumnNames)

                If oParentTableList IsNot Nothing Then
                    For Each oTable In oParentTableList
                        lstColumnNames = GetColumnListOfTable(oTable.TableName, True)
                        lstAllColumnNames.AddRange(lstColumnNames)
                    Next
                End If
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Session("lstAllColumnNames") = lstAllColumnNames
            Dim jsonObject = JsonConvert.SerializeObject(lstAllColumnNames, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetColumnListOfTable(pTableName As String, Optional IncludeTableNameInField As Boolean = False) As List(Of String)
            Dim lstColumnNames As List(Of String) = New List(Of String)
            Dim sNewColumnName As String = ""
            Dim PrimaryKeyField As SchemaIndex = Nothing
            Dim sPrimaryKeyField As String = ""
            Try
                If Not String.IsNullOrEmpty(pTableName) Then
                    Dim conObj As ADODB.Connection = DataServices.DBOpen(Enums.eConnectionType.conDefault)

                    Dim pSchemaIndexList As New List(Of SchemaIndex)
                    pSchemaIndexList = SchemaIndex.GetTableIndexes(pTableName, conObj)
                    'Get the primary key of table, avoid loading this in parent table field list.
                    PrimaryKeyField = pSchemaIndexList.Where(Function(x) x.PrimaryKey = "True").FirstOrDefault()
                    If Not IsNothing(PrimaryKeyField) Then
                        sPrimaryKeyField = PrimaryKeyField.ColumnName
                    End If

                    Dim oCurrentTableSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pTableName, conObj)

                    For Each oSchemaColumn In oCurrentTableSchemaColumns
                        If (Not SchemaInfoDetails.IsSystemField(oSchemaColumn.ColumnName)) Then
                            If Not IncludeTableNameInField Then
                                lstColumnNames.Add(oSchemaColumn.ColumnName)
                            ElseIf Not oSchemaColumn.ColumnName.Equals(sPrimaryKeyField) Then
                                sNewColumnName = ">" & oSchemaColumn.TableName & "." & oSchemaColumn.ColumnName
                                lstColumnNames.Add(sNewColumnName)
                            End If
                        End If
                    Next
                    conObj.Close()
                End If
            Catch ex As Exception
                Throw ex.InnerException
            End Try

            Return lstColumnNames
        End Function

        <HttpPost>
        Public Function ValidateTABQUIKSQLStatments(SQLStatement As String, sTableName As String, IsSelectStatement As Boolean) As ActionResult
            Dim responseMessage As String = String.Empty
            Dim lError As Integer = 0
            Dim sSQLStatement As String = String.Empty
            Dim IsBasicSyntaxCorrect As Boolean = True
            Try
                sSQLStatement = SQLStatement
                sSQLStatement = Trim(sSQLStatement)
                'Check basic conditions on SQL statements
                If (StrComp("SELECT ", Left$(sSQLStatement, Len("SELECT ")), vbTextCompare) <> 0&) And IsSelectStatement Then
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("errormsgSQLSelectKeyword")
                    IsBasicSyntaxCorrect = False
                ElseIf (StrComp("UPDATE ", Left$(sSQLStatement, Len("UPDATE ")), vbTextCompare) <> 0&) And (StrComp("DELETE ", Left$(sSQLStatement, Len("DELETE ")), vbTextCompare) <> 0&) And Not IsSelectStatement Then
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("errorMsgSQLUpdatedelete")
                    IsBasicSyntaxCorrect = False
                End If

                If Not IsSelectStatement And (InStr(1&, sSQLStatement, "<YourTable>", vbTextCompare) <> 0) Then
                    sSQLStatement = ""
                End If

                Dim oTable = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(sTableName.Trim().ToLower())).FirstOrDefault()

                If IsBasicSyntaxCorrect And Not String.IsNullOrEmpty(sSQLStatement) Then
                    If Not IsSelectStatement Then
                        sSQLStatement = Replace(sSQLStatement, "%ID%", "0", 1&, -1&, vbTextCompare)
                        sSQLStatement = DataServices.InjectWhereIntoSQL(sSQLStatement, "0=1")
                    ElseIf IsSelectStatement Then
                        sSQLStatement = Replace(sSQLStatement, "%ID%", "0", 1&, -1&, vbTextCompare)
                    End If

                    responseMessage = Common.ValidateSQLStatement(sSQLStatement, oTable, _iDatabas.All(), lError)

                    If String.IsNullOrEmpty(responseMessage) Then
                        Keys.ErrorType = "s"
                    ElseIf (lError = -2147217865) And IsSelectStatement Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Languages.Translation("msgLabelManagerCtrlSQLStrHvInvalidTblName") & vbCrLf & vbCrLf & Languages.Translation("lblBackgroundProcessStatusError") & ": " & responseMessage
                    ElseIf (lError = -2147217865) And Not IsSelectStatement Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Languages.Translation("msgTABQUIKInvalidaUpdateSQL") & vbCrLf & vbCrLf & Languages.Translation("lblBackgroundProcessStatusError") & ": " & responseMessage
                    ElseIf Not IsSelectStatement Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Languages.Translation("msgLabelManagerCtrlSQLUpdateStrInvalid") & vbCrLf & vbCrLf & Languages.Translation("lblBackgroundProcessStatusError") & ": " & responseMessage
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = responseMessage
                    End If
                End If

            Catch ex As Exception
                Throw ex.InnerException
            End Try
            Return Json(New With {
               Key .errortype = Keys.ErrorType,
               Key .message = Keys.ErrorMessage
           }, JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function FormTABQUIKSelectSQLStatement(pTableName As String, dtTABQUIKData As String) As ActionResult
            Dim strSQLStatement As String = "SELECT "
            Dim sTmpParentTable As String = ""
            Dim lstAllColumnNames As List(Of String) = New List(Of String)
            Dim lstParentTables As List(Of String) = New List(Of String)
            Dim index As Integer = 0
            Dim lParentPos As Integer = 0
            Try
                Dim oTable = _iTable.All().Where(Function(x) x.TableName = pTableName).FirstOrDefault()

                Dim lstTABQUIKModels As List(Of TABQUIKModel) = JsonConvert.DeserializeObject(Of List(Of TABQUIKModel))(dtTABQUIKData)
                lstAllColumnNames = CType(Session("lstAllColumnNames"), List(Of String))

                For Each tabquikmodel In lstTABQUIKModels
                    Dim sTABFusionRMSField As String = ""

                    If Not String.IsNullOrEmpty(tabquikmodel.TABFusionRMSField) Then
                        sTABFusionRMSField = lstAllColumnNames.Item(tabquikmodel.TABFusionRMSField)
                    End If

                    Dim sManualField As String = tabquikmodel.Manual

                    If Not String.IsNullOrEmpty(sTABFusionRMSField) And (InStr(1&, sTABFusionRMSField, ">") = 0&) Then
                        strSQLStatement = strSQLStatement & "[" & pTableName & "].[" & sTABFusionRMSField & "], "
                    ElseIf Not String.IsNullOrEmpty(sTABFusionRMSField) Then
                        sTmpParentTable = Mid$(sTABFusionRMSField, 2&, InStr(1&, sTABFusionRMSField, ".") - 2&)
                        If Not lstParentTables.Contains(Trim$(sTmpParentTable)) Then
                            lstParentTables.Add(Trim$(sTmpParentTable))
                        End If
                        strSQLStatement = strSQLStatement & "[" & Replace(Mid$(sTABFusionRMSField, 2&, Len(sTABFusionRMSField)), ".", "].[") & "], "
                    End If
                    'Check for any alias fields
                    If (Not String.IsNullOrEmpty(sManualField)) Then
                        strSQLStatement = strSQLStatement & "(" & sManualField & ") AS ManualField" & index & ", "
                    End If
                    index = index + 1
                Next

                If (StrComp(Trim$(strSQLStatement), "SELECT", vbTextCompare) = 0&) Then
                    strSQLStatement = strSQLStatement & "*  "
                End If

                strSQLStatement = Left$(strSQLStatement, Len(strSQLStatement) - 2&) & " "
                strSQLStatement = strSQLStatement & "FROM "
                lParentPos = Len(strSQLStatement)
                strSQLStatement = strSQLStatement & pTableName & " "

                'Append LEFT JOIN condition
                For Each sParentTable In lstParentTables
                    Dim oRelationShips = _iRelationShip.All().Where(Function(x) x.LowerTableName = pTableName And x.UpperTableName = sParentTable).FirstOrDefault()

                    strSQLStatement = Left$(strSQLStatement, lParentPos) & "(" & Mid$(strSQLStatement, lParentPos + 1&)
                    strSQLStatement = strSQLStatement & "LEFT JOIN " & sParentTable & " ON "
                    strSQLStatement = strSQLStatement & oRelationShips.LowerTableFieldName & " = " & oRelationShips.UpperTableFieldName & ") "
                Next
                'Append WHERE clause
                strSQLStatement = strSQLStatement & "WHERE " & oTable.IdFieldName & " = "

                _IDBManager.ConnectionString = Keys.GetDBConnectionString(Nothing)
                _IDBManager.Open()
                Dim IsIdFieldIdFieldIsString As Boolean = GetInfoUsingADONET.IdFieldIsString(_IDBManager, oTable.TableName, oTable.IdFieldName)
                _IDBManager.Close()
                If IsIdFieldIdFieldIsString Then
                    strSQLStatement = strSQLStatement & "'%ID%'"
                Else
                    strSQLStatement = strSQLStatement & "%ID%"
                End If

                Keys.ErrorType = "s"
                Keys.ErrorMessage = ""
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
                Throw ex.InnerException
            Finally
                If (_IDBManager.Connection IsNot Nothing) Then
                    _IDBManager.Dispose()
                End If
            End Try

            Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage,
                            .SQLStatement = strSQLStatement
                        }, JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function SaveTABQUIKFields(sOperation As String, JobName As String, TableName As String, SQLSelectString As String, SQLUpdateString As String, dtTABQUIKData As String) As ActionResult
            Dim index As Integer = 0
            Try
                Dim lstTABQUIKModels As List(Of TABQUIKModel) = JsonConvert.DeserializeObject(Of List(Of TABQUIKModel))(dtTABQUIKData)

                If sOperation.Equals("Add") Then
                    If Not IsJobAlreadyExists(JobName) Then
                        Dim oOneStripJob As OneStripJob = New OneStripJob
                        oOneStripJob.Name = JobName
                        oOneStripJob.TableName = TableName
                        oOneStripJob.Inprint = 5
                        oOneStripJob.SQLString = SQLSelectString
                        oOneStripJob.SQLUpdateString = SQLUpdateString
                        oOneStripJob.Sampling = 0
                        If Not IsNothing(Session("FLDColumns")) Then
                            oOneStripJob.FLDFieldNames = Session("FLDColumns").ToString()
                        End If
                        _iOneStripJob.Add(oOneStripJob)

                        oOneStripJob = _iOneStripJob.All().Where(Function(x) x.Name = JobName And x.Inprint = 5).FirstOrDefault()
                        AddOneStripJobFields(TableName, lstTABQUIKModels, oOneStripJob.Id)
                    End If
                ElseIf sOperation.Equals("Edit") And Not String.IsNullOrEmpty(JobName) Then
                    Dim oOneStripJob As OneStripJob = New OneStripJob
                    Dim oOneStripJobFields As IEnumerable(Of OneStripJobField)
                    Dim oneStripJobId As Integer = 0
                    oOneStripJob = _iOneStripJob.All().Where(Function(x) x.Name = JobName And x.Inprint = 5).FirstOrDefault()
                    oOneStripJob.TableName = TableName
                    oOneStripJob.SQLString = SQLSelectString
                    oOneStripJob.SQLUpdateString = SQLUpdateString
                    oOneStripJob.Sampling = 0
                    If Not IsNothing(Session("FLDColumns")) Then
                        oOneStripJob.FLDFieldNames = Session("FLDColumns").ToString()
                    End If
                    _iOneStripJob.Update(oOneStripJob)

                    oneStripJobId = oOneStripJob.Id
                    'Delete existing field mapping for this JOB
                    oOneStripJobFields = _iOneStripJobField.All().Where(Function(x) x.OneStripJobsId = oneStripJobId)
                    _iOneStripJobField.DeleteRange(oOneStripJobFields)

                    AddOneStripJobFields(TableName, lstTABQUIKModels, oOneStripJob.Id)
                End If

                Session("FLDColumns") = Nothing
                Session("dtTABQuikMapping") = Nothing
                Session("lstAllColumnNames") = Nothing

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgColorLabelSave")
            Catch ex As Exception
                Throw ex.InnerException
            End Try

            Return Json(New With {
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
        }, JsonRequestBehavior.AllowGet)
        End Function

        Public Sub AddOneStripJobFields(sTableName As String, lstTABQUIKModels As List(Of TABQUIKModel), oneStripJobId As Integer)
            Dim index As Integer = 0
            Dim sTABFusionRMSField As String = ""
            Dim lstAllColumnNames As List(Of String) = New List(Of String)
            If Not IsNothing(Session("lstAllColumnNames")) Then
                lstAllColumnNames = CType(Session("lstAllColumnNames"), List(Of String))
            End If

            Try
                For Each tabquikModel In lstTABQUIKModels
                    If Not String.IsNullOrEmpty(tabquikModel.TABFusionRMSField) Then
                        Dim oOneStripJobField As OneStripJobField = New OneStripJobField
                        oOneStripJobField.OneStripJobsId = oneStripJobId
                        oOneStripJobField.FontName = tabquikModel.TABQUIKField
                        sTABFusionRMSField = lstAllColumnNames.Item(tabquikModel.TABFusionRMSField)
                        If Not sTABFusionRMSField.Contains(".") Then
                            sTABFusionRMSField = sTableName & "." & sTABFusionRMSField
                        ElseIf sTABFusionRMSField.Contains(".") And sTABFusionRMSField.Contains(">") Then
                            sTABFusionRMSField = sTABFusionRMSField.Remove(0, 1)
                        End If
                        oOneStripJobField.FieldName = sTABFusionRMSField
                        oOneStripJobField.Format = If(String.IsNullOrEmpty(tabquikModel.Format), Nothing, tabquikModel.Format)
                        oOneStripJobField.Type = "T"
                        oOneStripJobField.SetNum = 0
                        oOneStripJobField.XPos = 0
                        oOneStripJobField.YPos = 0
                        oOneStripJobField.FontSize = 0
                        _iOneStripJobField.Add(oOneStripJobField)
                    ElseIf Not String.IsNullOrEmpty(tabquikModel.Manual) Then 'Add Manual Field
                        Dim oOneStripJobField As OneStripJobField = New OneStripJobField
                        oOneStripJobField.OneStripJobsId = oneStripJobId
                        oOneStripJobField.FontName = tabquikModel.TABQUIKField
                        oOneStripJobField.FieldName = "ManualField" & index & vbNullChar & tabquikModel.Manual
                        oOneStripJobField.Format = If(String.IsNullOrEmpty(tabquikModel.Format), Nothing, tabquikModel.Format)
                        oOneStripJobField.Type = "T"
                        oOneStripJobField.SetNum = 0
                        oOneStripJobField.XPos = 0
                        oOneStripJobField.YPos = 0
                        oOneStripJobField.FontSize = 0
                        _iOneStripJobField.Add(oOneStripJobField)
                    End If
                    index = index + 1
                Next
            Catch ex As Exception
                Throw ex.InnerException
            End Try
        End Sub

#End Region


#End Region

#Region "Attachments"
        Public Function LoadAttachmentParticalView() As PartialViewResult
            Dim BaseWebPage As BaseWebPage = New BaseWebPage
            Dim pFilterdVolums As List(Of vwGetOutputSetting) = New List(Of vwGetOutputSetting)
            Dim pVolumeList = _ivwGetOutputSetting.All().Where(Function(x) x.Active = True)
            For Each pvwGetOutputSetting In pVolumeList
                If BaseWebPage.Passport.CheckPermission(pvwGetOutputSetting.Name, Enums.SecureObjects.Volumes, Permissions.Permission.Access) Then
                    pFilterdVolums.Add(pvwGetOutputSetting)
                End If
            Next
            ViewBag.OutputSettingList = pFilterdVolums.CreateSelectListFromList("VolumesId", "OutputPath", Nothing)
            Return PartialView("_AttachmentsPartial")
        End Function

        Public Function GetOutputSettingList() As ActionResult

            Dim pOutputSettingsEntities = From t In _iSecureObject.All()
                                          Select t.SecureObjectID, t.Name, t.BaseID
            Dim pOutputSettingsList As List(Of String) = New List(Of String)
            Dim BaseWebPage As BaseWebPage = New BaseWebPage

            Dim pSecureObjectID = pOutputSettingsEntities.Where(Function(x) x.Name.Trim().ToLower().Equals("output settings")).FirstOrDefault().SecureObjectID
            'Added by Ganesh for Security Integration fix.
            pOutputSettingsEntities = pOutputSettingsEntities.Where(Function(x) x.BaseID = pSecureObjectID)
            For Each oOutputSettings In pOutputSettingsEntities
                'Change on 09/08/2016 - Tejas
                Dim objOutputSetting As OutputSetting = _iOutputSetting.All().Where(Function(x) x.Id.ToString().Trim().ToLower().Equals(oOutputSettings.Name.ToString().Trim().ToLower())).FirstOrDefault()
                If Not objOutputSetting Is Nothing Then
                    If (BaseWebPage.Passport.CheckPermission(oOutputSettings.Name, Enums.SecureObjects.OutputSettings, Enums.PassportPermissions.Access)) Then
                        pOutputSettingsList.Add(oOutputSettings.Name)
                    End If
                End If
            Next

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects

            Dim jsonObject = JsonConvert.SerializeObject(pOutputSettingsList, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            'Previous Code commented by Ganesh.
            'Dim pOutputSettingsEntities = From t In _iSecureObject.All()
            'Select t.SecureObjectID, t.Name, t.BaseID

            'Dim pSecureObjectID = pOutputSettingsEntities.Where(Function(x) x.Name.Trim().ToLower().Equals("output settings")).FirstOrDefault().SecureObjectID

            'pOutputSettingsEntities = pOutputSettingsEntities.Where(Function(x) x.BaseID = pSecureObjectID)

            'Dim Setting = New JsonSerializerSettings
            'Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            'Dim jsonObject = JsonConvert.SerializeObject(pOutputSettingsEntities, Newtonsoft.Json.Formatting.Indented, Setting)

            'Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

        End Function

        Public Function EditAttachmentSettingsEntity() As ActionResult
            Try
                Dim pSystemEntity = _iSystem.All().OrderBy(Function(x) x.Id).FirstOrDefault()
                Dim lSettingsEntities = _iSetting.All()
                Dim pSettingsEntityiAccessLocation = lSettingsEntities.Where(Function(x) x.Section.Trim().ToLower().Equals("imageservice") AndAlso x.Item.Trim().ToLower().Equals("iaccesslocation")).FirstOrDefault()
                Dim pSettingsEntityLocation = lSettingsEntities.Where(Function(x) x.Section.Trim().ToLower().Equals("imageservice") AndAlso x.Item.Trim().ToLower().Equals("location")).FirstOrDefault()
                Dim DefaultSettingId As String = ""
                Dim PrintingFooter As Boolean = False
                Dim RenameOnScan As Boolean = False
                Dim SlimLocation As String = ""
                Dim CustomeLocation As String = ""
                If Not (pSystemEntity) Is Nothing Then
                    DefaultSettingId = pSystemEntity.DefaultOutputSettingsId
                    PrintingFooter = pSystemEntity.PrintImageFooter
                    RenameOnScan = pSystemEntity.RenameOnScan
                End If
                If Not (pSettingsEntityiAccessLocation) Is Nothing Then
                    SlimLocation = pSettingsEntityiAccessLocation.ItemValue
                End If
                If Not (pSettingsEntityLocation) Is Nothing Then
                    CustomeLocation = pSettingsEntityLocation.ItemValue
                End If
                Keys.ErrorType = "s"
                Return Json(New With {
                   Key .errortype = Keys.ErrorType,
                   Key .message = Keys.ErrorMessage,
                   Key .defaultsettingid = DefaultSettingId,
                   Key .printimgfooter = PrintingFooter,
                    Key .renameonscan = RenameOnScan,
                   Key .slimlocation = SlimLocation,
                   Key .customelocation = CustomeLocation
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Return Json(New With {
                   Key .errortype = "e",
                   Key .message = Keys.ErrorMessageJS()
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try
        End Function

        <HttpPost>
        Public Function SetAttachmentSettingsEntity(pDefaultOpSettingsId As String, pPrintImageFooter As Boolean, pCustomeLocation As String, pImgSlimLocationAddress As String, pRenameOnScan As Boolean) As ActionResult
            Try

                Dim pOutputSettings = _iOutputSetting.All().Where(Function(x) x.Id.Equals(pDefaultOpSettingsId, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault()
                If pOutputSettings.InActive = True Then
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlOptSettingInActive")
                    Exit Try
                End If

                Dim pSystemEntity = _iSystem.All().OrderBy(Function(x) x.Id).FirstOrDefault()
                Dim pDefaultOutputSettingName = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals(pDefaultOpSettingsId.Trim().ToLower())).FirstOrDefault()

                If Not pDefaultOutputSettingName Is Nothing Then
                    pSystemEntity.DefaultOutputSettingsId = pDefaultOutputSettingName.Name
                End If
                pSystemEntity.RenameOnScan = pRenameOnScan
                pSystemEntity.PrintImageFooter = pPrintImageFooter
                _iSystem.Update(pSystemEntity)
                Dim lSettingsEntities = _iSetting.All()

                Dim pSettingsEntityiAccessLocation = lSettingsEntities.Where(Function(x) x.Section.Trim().ToLower().Equals("imageservice") AndAlso x.Item.Trim().ToLower().Equals("iaccesslocation")).FirstOrDefault()
                If Not pSettingsEntityiAccessLocation Is Nothing Then
                    pSettingsEntityiAccessLocation.ItemValue = pImgSlimLocationAddress
                    _iSetting.Update(pSettingsEntityiAccessLocation)
                Else
                    pSettingsEntityiAccessLocation = New Setting()
                    pSettingsEntityiAccessLocation.Section = "ImageService"
                    pSettingsEntityiAccessLocation.Item = "iAccessLocation"
                    pSettingsEntityiAccessLocation.ItemValue = pImgSlimLocationAddress
                    _iSetting.Add(pSettingsEntityiAccessLocation)
                End If


                Dim pSettingsEntityLocation = lSettingsEntities.Where(Function(x) x.Section.Trim().ToLower().Equals("imageservice") AndAlso x.Item.Trim().ToLower().Equals("location")).FirstOrDefault()
                If Not pSettingsEntityLocation Is Nothing Then
                    pSettingsEntityLocation.ItemValue = pCustomeLocation
                    _iSetting.Update(pSettingsEntityLocation)
                Else
                    pSettingsEntityLocation = New Setting()
                    pSettingsEntityLocation.Section = "ImageService"
                    pSettingsEntityLocation.Item = "Location"
                    pSettingsEntityLocation.ItemValue = pCustomeLocation
                    _iSetting.Add(pSettingsEntityLocation)
                End If
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminAttachmentSettingsSave") 'Keys.ErrorMessage = Keys.SaveSuccessMessage() ' Fixed : FUS-5948
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function SetOutputSettingsEntity(pOutputSettingEntity As OutputSetting, DirName As String, pInActive As Boolean) As ActionResult
            Try
                Dim eMsg = String.Format(Languages.Translation("msgAdminCtrlAvailableDocNo"), Format$(Int32.MaxValue, "#,###"))
                If Not pOutputSettingEntity.NextDocNum Is Nothing Then
                    Dim NextdocNum = Convert.ToInt32(pOutputSettingEntity.NextDocNum)
                    If ((CDbl(NextdocNum) <= 0.0#) Or (CDbl(NextdocNum) > Int32.MaxValue)) Then
                        Return Json(New With {
                        Key .errortype = "e",
                        Key .message = eMsg
                    }, JsonRequestBehavior.AllowGet)
                    End If
                Else
                    Return Json(New With {
                    Key .errortype = "e",
                    Key .message = eMsg
                }, JsonRequestBehavior.AllowGet)
                End If

                Dim BaseWebPageMain = New BaseWebPage()
                Dim oSecureObjectMain = New Smead.Security.SecureObject(BaseWebPageMain.Passport)

                _iOutputSetting.BeginTransaction()
                _iSecureObject.BeginTransaction()
                Dim pSecureObjectID = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals("output settings")).FirstOrDefault().SecureObjectID

                If pOutputSettingEntity.DefaultOutputSettingsId > 0 Then
                    Dim countSecureObject = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower() = DirName.Trim().ToLower() AndAlso x.BaseID.Equals(pSecureObjectID)).Count()
                    If countSecureObject > 1 Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Keys.AlreadyExistMessage(DirName)
                        Exit Try
                    Else
                        If _iOutputSetting.All().Any(Function(x) x.FileNamePrefix = pOutputSettingEntity.FileNamePrefix AndAlso x.DefaultOutputSettingsId <> pOutputSettingEntity.DefaultOutputSettingsId) Then
                            Keys.ErrorType = "w"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlThePrefix"), pOutputSettingEntity.FileNamePrefix)
                            Exit Try
                        Else
                            If pOutputSettingEntity.DirectoriesId Is Nothing Then
                                pOutputSettingEntity.DirectoriesId = 0
                            End If
                            pOutputSettingEntity.Id = DirName.Trim()
                            If pInActive = True Then
                                pOutputSettingEntity.InActive = False
                            Else
                                pOutputSettingEntity.InActive = True
                            End If
                            _iOutputSetting.Update(pOutputSettingEntity)
                        End If
                    End If
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminUpdateOutputSettings") ' Fixed : FUS-5949
                Else
                    If _iSecureObject.All().Any(Function(x) x.Name.Trim().ToLower() = DirName.Trim().ToLower() AndAlso x.BaseID.Equals(pSecureObjectID)) = False Then
                        If _iOutputSetting.All().Any(Function(x) x.FileNamePrefix = pOutputSettingEntity.FileNamePrefix) Then
                            Keys.ErrorType = "w"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlThePrefix"), pOutputSettingEntity.FileNamePrefix)
                            Exit Try
                        Else

                            oSecureObjectMain.Register(DirName, Enums.SecureObjects.OutputSettings, Enums.SecureObjects.OutputSettings)


                            'Dim pSecureObjectEntity As New Models.SecureObject

                            'pSecureObjectEntity.Name = DirName
                            'pSecureObjectEntity.SecureObjectTypeID = pSecureObjectID
                            'pSecureObjectEntity.BaseID = pSecureObjectID
                            '_iSecureObject.Add(pSecureObjectEntity)

                            'pOutputSettingEntity.DefaultOutputSettingsId = pSecureObjectEntity.SecureObjectID
                            Dim pDirectoryEntities = _iDirectory.All()
                            Dim pDirectoriesId = 0
                            pDirectoryEntities = pDirectoryEntities.Where(Function(x) x.VolumesId = pOutputSettingEntity.VolumesId)
                            If pDirectoryEntities.Count() > 0 Then
                                pDirectoriesId = pDirectoryEntities.FirstOrDefault().Id
                            End If

                            pOutputSettingEntity.DirectoriesId = pDirectoriesId
                            pOutputSettingEntity.Id = DirName.Trim()
                            If pInActive = True Then
                                pOutputSettingEntity.InActive = False
                            Else
                                pOutputSettingEntity.InActive = True
                            End If
                            _iOutputSetting.Add(pOutputSettingEntity)
                        End If
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Keys.AlreadyExistMessage(DirName)
                        Exit Try
                    End If
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminSaveOutputSettings") 'Keys.ErrorMessage = Keys.SaveSuccessMessage() ' Fixed : FUS-5947
                End If
            Catch dbEx As DbEntityValidationException
                For Each validationErrors In dbEx.EntityValidationErrors
                    For Each validationError In validationErrors.ValidationErrors
                        Trace.TraceInformation("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage)
                    Next
                Next
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
                _iOutputSetting.RollBackTransaction()
                _iSecureObject.RollBackTransaction()
            End Try
            _iOutputSetting.CommitTransaction()
            _iSecureObject.CommitTransaction()
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function EditOutputSettingsEntity(pRowSelected As Array) As ActionResult
            If pRowSelected Is Nothing Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
            End If
            If pRowSelected.Length = 0 Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
            End If

            Dim pOutputSettingsId = pRowSelected.GetValue(0).ToString()
            If String.IsNullOrWhiteSpace(pOutputSettingsId) Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
            End If

            Dim pOutputSettingsEntity = _iOutputSetting.All().Where(Function(x) x.Id.ToString().Trim().ToLower().Equals(pOutputSettingsId.Trim().ToLower())).FirstOrDefault()
            Dim Setting = New JsonSerializerSettings
            Dim jsonObject As String = ""
            Dim pFileName As String = ""
            If Not (pOutputSettingsEntity Is Nothing) Then
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                If pOutputSettingsEntity.InActive = False Then
                    pOutputSettingsEntity.InActive = True
                Else
                    pOutputSettingsEntity.InActive = False
                End If

                jsonObject = JsonConvert.SerializeObject(pOutputSettingsEntity, Newtonsoft.Json.Formatting.Indented, Setting)
                pFileName = SetExampleFileName(pOutputSettingsEntity.NextDocNum, pOutputSettingsEntity.FileNamePrefix, pOutputSettingsEntity.FileExtension)
            End If
            Keys.ErrorType = "s"
            Return Json(New With {
                   Key .errortype = Keys.ErrorType,
                   Key .message = Keys.ErrorMessage,
                   Key .jsonObject = jsonObject,
                   Key .fileName = pFileName
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function RemoveOutputSettingsEntity(pRowSelected As Array) As ActionResult
            If pRowSelected Is Nothing Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
            End If
            If pRowSelected.Length = 0 Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
            End If

            Dim lSecureObjectId As Integer
            Dim BaseWebPageMain = New BaseWebPage()
            Dim oSecureObjectMain = New Smead.Security.SecureObject(BaseWebPageMain.Passport)

            Try

                Dim pOutputSettingsId = pRowSelected.GetValue(0).ToString()
                If String.IsNullOrWhiteSpace(pOutputSettingsId) Then
                    Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
                End If

                Dim pSystemEntity = _iSystem.All().OrderBy(Function(x) x.Id).FirstOrDefault()
                If Not (pSystemEntity Is Nothing) Then
                    Dim pSecureObjectEntity = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals(pOutputSettingsId.ToString().Trim().ToLower())).FirstOrDefault()
                    'Dim pSecureObjectEntity = _iSecureObject.All().Where(Function(x) x.SecureObjectID = pOutputSettingsId).FirstOrDefault()

                    If (pSystemEntity.DefaultOutputSettingsId.Equals(pOutputSettingsId, StringComparison.CurrentCultureIgnoreCase)) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlOptSettingCantBeUsed"), pSecureObjectEntity.Name)
                    Else
                        Dim pOutputSettingsEntity = _iOutputSetting.All().Where(Function(x) x.Id.Trim().ToLower().Equals(pOutputSettingsId.ToString().Trim().ToLower())).FirstOrDefault()
                        If Not (pOutputSettingsEntity Is Nothing) Then
                            _iOutputSetting.Delete(pOutputSettingsEntity)
                        End If
                        If Not (pSecureObjectEntity Is Nothing) Then
                            lSecureObjectId = oSecureObjectMain.GetSecureObjectID(pSecureObjectEntity.Name, Enums.SecureObjects.OutputSettings)
                            If (lSecureObjectId <> 0) Then oSecureObjectMain.UnRegister(lSecureObjectId)
                            '_iSecureObject.Delete(pSecureObjectEntity)
                        End If

                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminDeleteOutputSettings") ' Keys.ErrorMessage = Keys.DeleteSuccessMessage() ' Fixed: FUS-5950
                    End If
                Else
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlNoRecordFoundInSystem")
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

        Public Function SetExampleFileName(pNextDocNum As String, pFileNamePrefix As String, pFileExtension As String)
            Dim sBase36 As String
            If ((CDbl(pNextDocNum) >= 0.0#) And (CDbl(pNextDocNum) <= Integer.MaxValue)) Then
                sBase36 = Convert10to36(CDbl(pNextDocNum))
            Else
                sBase36 = ""
            End If
            Return Trim(pFileNamePrefix) & Trim(sBase36) & "." & Trim(pFileExtension.TrimStart("."))
        End Function

        Public Function Convert10to36(ByVal dValue As Double) As String
            Dim dRemainder As Double
            Dim sResult As String
            sResult = ""
            dValue = Math.Abs(dValue)
            Do
                dRemainder = dValue - (36 * Int((dValue / 36)))
                sResult = Mid$("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", dRemainder + 1, 1) & sResult
                dValue = Int(dValue / 36)
            Loop While (dValue > 0)
            'Convert10to36 = InStr(6 - Len(sResult), "0") & sResult
            Convert10to36 = sResult.PadLeft(6, "0")
            Exit Function
        End Function

#End Region

#Region "Auditing"
        Public Function LoadAuditingView() As PartialViewResult
            Return PartialView("_AuditingPartial")
        End Function

        Public Function GetTablesForLabel() As ActionResult
            Try
                Dim lTableEntites = From t In _iTable.All().OrderBy(Function(m) m.TableName)
                                    Select t.AuditUpdate, t.UserName, t.AuditAttachments, t.AuditConfidentialData

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim jsonObject = JsonConvert.SerializeObject(lTableEntites, Newtonsoft.Json.Formatting.Indented, Setting)

                Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .ltablelist = jsonObject
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Return Json(New With {Key .success = False, Key .errortype = "e", Key .message = Keys.ErrorMessageJS})
            End Try
        End Function

        Public Function GetAuditPropertiesData(pTableId As Integer) As ActionResult
            If pTableId = -1 Then
                Return Json(New With {Key .success = False, Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlTblIdNotFound")})
            End If
            Try
                Dim pTableEntites = _iTable.All().Where(Function(x) x.TableId = pTableId).FirstOrDefault()
                If pTableEntites Is Nothing Then
                    Return Json(New With {Key .success = False, Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlTblRecNotFound")})
                End If
                Dim pRelationShipEntites = _iRelationShip.All().Where(Function(x) x.UpperTableName.Trim().ToLower().Equals(pTableEntites.TableName.Trim().ToLower()))
                If pRelationShipEntites Is Nothing Then
                    Return Json(New With {Key .success = False, Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlRelationRecNotFound")})
                End If
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlSuccess")
                Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .isconfchecked = pTableEntites.AuditConfidentialData,
                    Key .isupdatechecked = pTableEntites.AuditUpdate,
                    Key .isattachchecked = pTableEntites.AuditAttachments,
                    Key .confenabled = IIf((pRelationShipEntites.Count() > 0), False, True),
                    Key .attachenabled = IIf((pTableEntites.Attachments = True), False, True)
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Return Json(New With {Key .success = False, Key .errortype = "e", Key .message = Keys.ErrorMessageJS()})
            End Try
        End Function

        <HttpPost>
        Public Function SetAuditPropertiesData(pTableId As Integer, pAuditConfidentialData As Boolean, pAuditUpdate As Boolean, pAuditAttachments As Boolean, pIsChild As Boolean) As ActionResult
            Dim lTableIds As List(Of Integer) = New List(Of Integer)
            Try
                Dim pTableEntity = _iTable.All().Where(Function(x) x.TableId.Equals(pTableId)).FirstOrDefault()
                pTableEntity.AuditConfidentialData = pAuditConfidentialData
                pTableEntity.AuditUpdate = pAuditUpdate
                pTableEntity.AuditAttachments = pAuditAttachments
                _iTable.Update(pTableEntity)
                If (pIsChild) Then
                    For Each pTableIdeach In BLAuditing.GetChildTableIds(pTableEntity.TableName, _IDBManager)
                        pTableEntity = _iTable.All().Where(Function(x) x.TableId.Equals(pTableIdeach)).FirstOrDefault()
                        If pTableEntity.AuditConfidentialData = False AndAlso pTableEntity.AuditUpdate = False AndAlso pTableEntity.AuditAttachments = False Then
                            pTableEntity.AuditUpdate = pAuditUpdate
                            _iTable.Update(pTableEntity)
                            lTableIds.Add(pTableIdeach)
                        End If
                    Next
                End If

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAuditdualboxSuccess")

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .ltableids = lTableIds
                }, JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function RemoveTableFromList(pTableIds As Array) As ActionResult
            Try
                For Each item As String In pTableIds
                    If Not String.IsNullOrEmpty(item) Then
                        Dim pTableId As Integer = Convert.ToInt32(item)
                        Dim pTableEntity = _iTable.All().Where(Function(x) x.TableId.Equals(pTableId)).FirstOrDefault()
                        pTableEntity.AuditConfidentialData = False
                        pTableEntity.AuditUpdate = False
                        pTableEntity.AuditAttachments = False
                        _iTable.Update(pTableEntity)
                    End If
                Next
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlMoveTblSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function PurgeAuditData(pPurgeDate As Date, pUpdateData As Boolean, pConfData As Boolean, pSuccessLoginData As Boolean, pFailLoginData As Boolean) As ActionResult
            Try
                Dim bRecordExist = False

                If pUpdateData = True Then
                    Dim lSLAuditUpdateEntities = _iSLAuditUpdate.All().Where(Function(x) System.Data.Entity.DbFunctions.TruncateTime(x.UpdateDateTime) < pPurgeDate)

                    Dim ids = New HashSet(Of Integer)(lSLAuditUpdateEntities.[Select](Function(x) x.Id))

                    Dim lSLAuditUpdChildrenEntities = _iSLAuditUpdChildren.All().Where(Function(x) ids.Contains(x.SLAuditUpdatesId))
                    If Not lSLAuditUpdChildrenEntities Is Nothing Then
                        If lSLAuditUpdChildrenEntities.Count() > 0 Then
                            bRecordExist = True
                            _iSLAuditUpdChildren.DeleteRange(lSLAuditUpdChildrenEntities)
                            _iSLAuditUpdate.DeleteRange(lSLAuditUpdateEntities)
                        End If
                    End If
                End If

                If pConfData = True Then
                    Dim lSLAuditConfDataEntities = _iSLAuditConfData.All().Where(Function(x) System.Data.Entity.DbFunctions.TruncateTime(x.AccessDateTime) < pPurgeDate)
                    If Not lSLAuditConfDataEntities Is Nothing Then
                        If lSLAuditConfDataEntities.Count() > 0 Then
                            bRecordExist = True
                            _iSLAuditConfData.DeleteRange(lSLAuditConfDataEntities)
                        End If
                    End If
                End If

                If pSuccessLoginData = True Then
                    Dim lSLAuditLoginEntities = _iSLAuditLogin.All().Where(Function(x) System.Data.Entity.DbFunctions.TruncateTime(x.LoginDateTime) < pPurgeDate)
                    If Not lSLAuditLoginEntities Is Nothing Then
                        If lSLAuditLoginEntities.Count() > 0 Then
                            bRecordExist = True
                            _iSLAuditLogin.DeleteRange(lSLAuditLoginEntities)
                        End If
                    End If
                End If

                If pFailLoginData = True Then
                    Dim lSLAuditFailedLoginEntities = _iSLAuditFailedLogin.All().Where(Function(x) System.Data.Entity.DbFunctions.TruncateTime(x.LoginDateTime) < pPurgeDate)
                    If Not lSLAuditFailedLoginEntities Is Nothing Then
                        If lSLAuditFailedLoginEntities.Count() > 0 Then
                            bRecordExist = True
                            _iSLAuditFailedLogin.DeleteRange(lSLAuditFailedLoginEntities)
                        End If
                    End If
                End If


                If bRecordExist = True Then
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Keys.PurgeSuccessMessage()
                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlNoData2Purge")
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

        Public Function CheckChildTableExist(pTableId As Integer) As ActionResult
            Dim bChildExist As Boolean = False
            Try
                Dim oTable = _iTable.All().Where(Function(x) x.TableId = pTableId).FirstOrDefault()
                If Not oTable Is Nothing Then
                    If BLAuditing.GetChildTableIds(oTable.TableName.Trim(), _IDBManager).Count() > 0 Then
                        bChildExist = True
                    End If
                End If

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.SaveSuccessMessage()
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .childexist = bChildExist
                }, JsonRequestBehavior.AllowGet)
        End Function
#End Region

#Region "Bar Code Search Order"

        Public Function LoadBarCodeSearchView() As PartialViewResult
            ViewBag.BarCodeTableList = Common.DefaultDropdownSelectionBlank
            Return PartialView("_BarCodeSearchPartial")
        End Function

        Public Function GetBarCodeList(sord As String, page As Integer, rows As Integer) As JsonResult

            Dim pBarCideEntities = _iScanList.All()
            Dim pTable = _iTable.All()

            Dim oBarCodeEntities As New List(Of ScanList)

            For Each scan As ScanList In pBarCideEntities
                If scan.TableName <> Nothing Then
                    oBarCodeEntities.Add(scan)
                End If
            Next

            Dim q = (From sc In oBarCodeEntities
                     Join ta In pTable.ToList()
                     On sc.TableName.Trim().ToLower() Equals ta.TableName.Trim().ToLower()
                     Select sc.Id, sc.IdMask, sc.IdStripChars, sc.ScanOrder, sc.TableName, sc.FieldName, sc.FieldType, ta.UserName
                    ).AsQueryable()
            'Select ta.UserName, sc

            pBarCideEntities = pBarCideEntities.OrderBy(Function(x) x.ScanOrder)

            Dim jsonData = q.GetJsonListForGrid(sord, page, rows, "ScanOrder")

            Return Json(jsonData, JsonRequestBehavior.AllowGet)
        End Function

        Public Function RemoveBarCodeSearchEntity(pId As Integer, scan As Integer) As ActionResult

            'Dim pScanListEntities = From t In _iScanList.All()
            Try
                Dim pBarCodeRemovedEntity = _iScanList.All().Where(Function(x) x.Id = pId).FirstOrDefault()
                _iScanList.Delete(pBarCodeRemovedEntity)

                Dim pScanListEntityGreater = _iScanList.All().Where(Function(x) x.ScanOrder > scan)

                If pScanListEntityGreater.Count = 0 = False Then
                    For Each pScanList As ScanList In pScanListEntityGreater.ToList()
                        pScanList.ScanOrder = pScanList.ScanOrder - 1
                        _iScanList.Update(pScanList)
                    Next
                End If

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminSearchOrderDelete") 'Fixed: FUS-5998
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(New With {
                   Key .errortype = Keys.ErrorType,
                   Key .message = Keys.ErrorMessage
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function SetbarCodeSearchEntity(pBarCodeSearchEntity As ScanList, scanOrder As Integer) As ActionResult

            Dim conObj As ADODB.Connection = DataServices.DBOpen(Enums.eConnectionType.conDefault)

            Dim oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pBarCodeSearchEntity.TableName, conObj, pBarCodeSearchEntity.FieldName)

            If oSchemaColumns.Count = 0 Then
                Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pBarCodeSearchEntity.TableName.Trim().ToLower())).FirstOrDefault()
                conObj = DataServices.DBOpen(oTables, _iDatabas.All())
                oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pBarCodeSearchEntity.TableName, conObj, pBarCodeSearchEntity.FieldName)
            End If

            Try
                If pBarCodeSearchEntity.Id > 0 Then
                    If _iScanList.All().Any(Function(x) x.TableName = pBarCodeSearchEntity.TableName AndAlso x.FieldName = pBarCodeSearchEntity.FieldName AndAlso x.Id <> pBarCodeSearchEntity.Id) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Keys.AlreadyExistMessage(pBarCodeSearchEntity.TableName)
                    Else
                        Dim pSystemEntity = _iScanList.All().Where(Function(x) x.Id = pBarCodeSearchEntity.Id).FirstOrDefault()
                        pSystemEntity.TableName = pBarCodeSearchEntity.TableName
                        pSystemEntity.FieldName = pBarCodeSearchEntity.FieldName
                        pSystemEntity.FieldType = oSchemaColumns(0).DataType
                        pSystemEntity.IdStripChars = pBarCodeSearchEntity.IdStripChars
                        pSystemEntity.IdMask = pBarCodeSearchEntity.IdMask
                        _iScanList.Update(pSystemEntity)
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminSearchOrderEdit")  'Fixed: FUS-5997
                    End If
                Else
                    If _iScanList.All().Any(Function(x) x.TableName = pBarCodeSearchEntity.TableName AndAlso x.FieldName = pBarCodeSearchEntity.FieldName) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Keys.AlreadyExistMessage(pBarCodeSearchEntity.TableName)
                    Else
                        pBarCodeSearchEntity.ScanOrder = scanOrder + 1
                        pBarCodeSearchEntity.FieldType = oSchemaColumns(0).DataType
                        _iScanList.Add(pBarCodeSearchEntity)
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminSearchOrderSave")  'Fixed: FUS-5996
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

#End Region

#Region "Background Process"

        Public Function LoadBackgroundProcessView() As PartialViewResult
            Return PartialView("_BackgroundProcessPartial")
        End Function

        Public Function GetBackgroundProcess(sord As String, page As Integer, rows As Integer) As JsonResult
            Try
                Dim oDataTable As New DataTable
                Dim BackgroundOption = From p In _iLookupType.Where(Function(m) m.LookupTypeForCode.Trim().ToUpper().Equals(("BGPCS").Trim()))
                                       Select p.LookupTypeValue
                Dim oBackGroundOption = BackgroundOption.ToList()
                If (BackgroundOption.Count() > 0) Then
                    Dim oSettingList = From s In _iSetting.All()
                                       Where oBackGroundOption.Contains(s.Section)
                    oDataTable.Columns.Add(New DataColumn("Id"))
                    oDataTable.Columns.Add(New DataColumn("Section"))
                    oDataTable.Columns.Add(New DataColumn("MinValue"))
                    oDataTable.Columns.Add(New DataColumn("MaxValue"))
                    If (oSettingList IsNot Nothing) Then
                        Dim oId = 0
                        For Each oItem In oSettingList.ToList()
                            If (oDataTable.Rows.Count <> 0) Then
                                Dim foundRows As DataRow()
                                foundRows = oDataTable.Select("Section = '" + oItem.Section.Trim() + "'")
                                If (foundRows.Length <> 0) Then
                                    foundRows(0)(oItem.Item) = oItem.ItemValue
                                Else
                                    Dim dr As DataRow = oDataTable.NewRow
                                    oId = oId + 1
                                    dr("Id") = oId
                                    dr("Section") = oItem.Section
                                    dr(oItem.Item) = oItem.ItemValue
                                    oDataTable.Rows.Add(dr)
                                End If
                            Else
                                Dim dr As DataRow = oDataTable.NewRow
                                oId = oId + 1
                                dr("Id") = oId
                                dr("Section") = oItem.Section
                                dr(oItem.Item) = oItem.ItemValue
                                oDataTable.Rows.Add(dr)
                            End If
                        Next
                    End If
                End If
                'Dim oSettingList = _iSetting.Where(Function(m) m.Section.Trim().ToLower().Equals(("BackgroundTransfer").Trim().ToLower()) Or m.Section.Trim().ToLower().Equals(("BackgroundExport").Trim().ToLower()))

                Return Json(Common.ConvertDataTableToJQGridResult(oDataTable, "", sord, page, rows), JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Throw
            End Try
        End Function

        Public Function GetBackgroundOptions() As JsonResult
            Dim BackgroundOptionJSON = ""
            Try
                Dim BackgroundOption = From p In _iLookupType.Where(Function(m) m.LookupTypeForCode.Trim().ToUpper().Equals(("BGPCS").Trim()))
                Dim lstBackgroundItems As New List(Of KeyValuePair(Of String, String))
                Dim BackgroundOptionList As List(Of LookupType) = BackgroundOption.ToList()
                For Each oitem As LookupType In BackgroundOptionList
                    lstBackgroundItems.Add(New KeyValuePair(Of String, String)(oitem.LookupTypeValue, oitem.LookupTypeValue))
                Next
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                BackgroundOptionJSON = JsonConvert.SerializeObject(lstBackgroundItems, Newtonsoft.Json.Formatting.Indented, Setting)
                Keys.ErrorType = "s"
            Catch ex As Exception
                Keys.ErrorType = "e"
            End Try
            Return Json(New With {
              Key .BackgroundOptionJSON = BackgroundOptionJSON,
              Key .errorType = Keys.ErrorType
              }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost, ValidateInput(False)>
        Public Function SetBackgroundData() As JsonResult
            Dim ReturnMessage = String.Empty
            Keys.ErrorType = "s"
            Try
                Dim forms As System.Collections.Specialized.NameValueCollection = HttpContext.Request.Form
                Dim data As String = forms.[Get]("x01")
                Dim jsonObject = JsonConvert.DeserializeObject(data)
                Dim oId = jsonObject.GetValue("Id").ToString()
                Dim oSection = jsonObject.GetValue("Section").ToString()
                Dim oMinValue = Convert.ToInt32(jsonObject.GetValue("MinValue").ToString())
                If (oMinValue = 0) Then
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("msgBackgroundMinValGreaterZero")
                    Exit Try
                End If
                Dim oMaxValue = Convert.ToInt32(jsonObject.GetValue("MaxValue").ToString())
                Dim oMinValueItem = _iSetting.Where(Function(m) m.Section.Trim().ToLower().Equals(oSection.Trim().ToLower()) And m.Item.Trim().ToLower().Equals("minvalue")).FirstOrDefault
                If (oMinValueItem IsNot Nothing) Then
                    If (oId.Contains("jqg")) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgBackgroundUpdateAlreadyAddedRow"), oMinValueItem.Section)
                        Exit Try
                    Else
                        oMinValueItem.ItemValue = oMinValue
                        _iSetting.Update(oMinValueItem)
                    End If
                Else
                    oMinValueItem = New Setting
                    oMinValueItem.Section = oSection.Trim()
                    oMinValueItem.Item = "MinValue"
                    oMinValueItem.ItemValue = oMinValue
                    _iSetting.Add(oMinValueItem)
                End If

                Dim oMaxValueItem = _iSetting.Where(Function(m) m.Section.Trim().ToLower().Equals(oSection.Trim().ToLower()) And m.Item.Trim().ToLower().Equals("maxvalue")).FirstOrDefault
                If (oMaxValueItem IsNot Nothing) Then
                    If (oId.Contains("jqg")) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgBackgroundUpdateAlreadyAddedRow"), oMinValueItem.Section)
                        Exit Try
                    Else
                        oMaxValueItem.ItemValue = oMaxValue
                        _iSetting.Update(oMaxValueItem)
                    End If
                Else
                    oMaxValueItem = New Setting
                    oMaxValueItem.Section = oSection.Trim()
                    oMaxValueItem.Item = "MaxValue"
                    oMaxValueItem.ItemValue = oMaxValue
                    _iSetting.Add(oMaxValueItem)
                End If
                If (Keys.ErrorType = "s") Then Keys.ErrorMessage = Languages.Translation("msgBackgroundUpdateSuccessMsg")
            Catch ex As Exception
                Keys.ErrorType = "e"
                If ex.Message = "Value was either too large or too small for an Int32." Then
                    Keys.ErrorMessage = Languages.Translation("msgBackgroundLargeValueErrorMsg")
                Else
                    Keys.ErrorMessage = ex.Message
                End If
            End Try
            Return Json(New With {
                Key .errortype = Keys.ErrorType,
                Key .message = Keys.ErrorMessage
}, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function RemoveBackgroundSection(SectionArrayObject As String) As JsonResult
            Try
                Dim SectionArrayObjectDes As Object = New JavaScriptSerializer().Deserialize(Of Object)(SectionArrayObject)
                For Each oStr As String In SectionArrayObjectDes
                    Dim oSetting = _iSetting.Where(Function(m) m.Section.Trim().ToLower().Equals(oStr.Trim().ToLower()))
                    _iSetting.DeleteRange(oSetting)
                Next
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgBackgroundSectionDltSuccess")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = ex.Message
            End Try
            Return Json(New With {
    Key .errortype = Keys.ErrorType,
    Key .message = Keys.ErrorMessage
    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function DeleteBackgroundProcessTasks(pBGEndDate As Date, pchkBGStatusCompleted As Boolean, pchkBGStatusError As Boolean) As ActionResult
            Try
                Dim lstOfStatus As New List(Of String)
                If pchkBGStatusCompleted = True Then
                    lstOfStatus.Add("Completed")
                ElseIf pchkBGStatusError = True Then
                    lstOfStatus.Add("Error")
                End If

                If Not lstOfStatus Is Nothing Then
                    Dim status As String = "'" + String.Join("','", lstOfStatus) + "'"
                    status = status.Replace("""", "")
                    Dim endDate As String = "'" + pBGEndDate.ToString("yyyy-MM-dd") + "'"

                    Dim conString As String = Keys.GetDBConnectionString
                    'added by moti mashiah need to discuss with Reggie.
                    Using con1 As New SqlConnection(conString)
                        Dim qsqlpath = "select ReportLocation, DownloadLocation from SLServiceTasks WHERE Convert(Date, StartDate, 101) <= " & endDate & " AND Status IN (" & status & ")"
                        Dim command = New SqlCommand(qsqlpath, con1)
                        Dim adp = New SqlDataAdapter(command)
                        Dim dTable = New DataTable()
                        Dim datat = adp.Fill(dTable)
                        For Each row As DataRow In dTable.Rows
                            Dim transferFile = row("ReportLocation").ToString()
                            If Not String.IsNullOrEmpty(transferFile) Then
                                IO.File.Delete(transferFile)
                            End If
                            Dim CsvFile = row("DownloadLocation").ToString()
                            If Not String.IsNullOrEmpty(CsvFile) Then
                                IO.File.Delete(CsvFile)
                            End If

                        Next
                    End Using
                    Using con As New SqlConnection(conString)
                        con.Open()
                        If (con.State()) Then
                            Dim sSql = "DELETE From SLServiceTaskItems WHERE SLServiceTaskId In (SELECT Id FROM SLServiceTasks WHERE Convert(Date, EndDate, 101) <= " & endDate & " AND Status IN (" & status & ")); DELETE From SLServiceTasks WHERE Convert(Date, EndDate, 101) <= " & endDate & " AND Status IN (" & status & ")"
                            _IDBManager.ConnectionString = Keys.GetDBConnectionString(Nothing)
                            _IDBManager.ExecuteNonQuery(System.Data.CommandType.Text, sSql)
                            _IDBManager.Dispose()
                        End If
                        con.Close()
                    End Using
                End If

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminBGCtrlRecDeletedSuccessfully")

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function
#End Region

#End Region

#Region "Database"

#Region "External Database"
        Public Function LoadExternalDBView() As PartialViewResult
            Return PartialView("_ExternalDBPartial")
        End Function

        Public Function LoadAddDBView() As PartialViewResult
            Return PartialView("_AddNewDatabasePartial")
        End Function

        Public Function GetAllSQLInstance() As ActionResult
            Dim instance As System.Data.Sql.SqlDataSourceEnumerator =
            System.Data.Sql.SqlDataSourceEnumerator.Instance
            Dim dataTable As System.Data.DataTable = instance.GetDataSources()
            Dim lstSQLInstances(dataTable.Rows.Count) As String
            Dim i As Integer = 1
            lstSQLInstances(0) = ""
            For Each dr As DataRow In dataTable.Rows
                lstSQLInstances(i) = String.Concat(dr("ServerName"), "\", dr("InstanceName"))
                i = i + 1
            Next

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(lstSQLInstances, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

        End Function

        Public Function IsUserDatabase(DataBaseName As String) As Boolean
            IsUserDatabase = False

            If DataBaseName.Trim().ToLower().Equals("master") Then
                IsUserDatabase = True
            End If
            If DataBaseName.Trim().ToLower().Equals("msdb") Then
                IsUserDatabase = True
            End If
            If DataBaseName.Trim().ToLower().Equals("model") Then
                IsUserDatabase = True
            End If
            If DataBaseName.Trim().ToLower().Equals("tempdb") Then
                IsUserDatabase = True
            End If
        End Function

        Public Function GetDatabaseList(instance As String, userID As String, pass As String) As ActionResult
            Dim list As New List(Of String)()
            Dim conString As String
            Dim Setting = New JsonSerializerSettings
            ' Open connection to the database
            If userID.Equals("") Or pass.Equals("") Then
                conString = "Data Source=" + instance + ";Persist Security Info=True;Integrated Security=SSPI;"
            Else
                conString = "Data Source=" + instance + ";User ID=" + userID + ";Password=" + pass + ";Persist Security Info=True;MultipleActiveResultSets=True;"
            End If
            Using con As New SqlConnection(conString)
                Try
                    con.Open()
                    ' Set up a command with the given query and associate
                    ' this with the current connection.
                    Using cmd As New SqlCommand("SELECT name from sys.databases", con)
                        Using dr As IDataReader = cmd.ExecuteReader()
                            While dr.Read()
                                If IsUserDatabase(dr(0).ToString()) = False Then
                                    list.Add(dr(0).ToString())
                                End If
                            End While
                        End Using
                    End Using
                    Keys.ErrorType = "s"
                    'con.Close()

                Catch ex As Exception
                    If userID.Equals("") And pass.Equals("") Then
                        Keys.ErrorType = "e"
                        Keys.ErrorMessage = Keys.UnableToConnect(instance)
                    Else
                        Keys.ErrorType = "e"
                        Keys.ErrorMessage = Keys.LoginFailed()
                    End If
                    Return Json(New With {
                             Key .errortype = Keys.ErrorType,
                             Key .message = Keys.ErrorMessage
                            }, JsonRequestBehavior.AllowGet)
                End Try
            End Using
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(list, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(New With {jsonObject,
                             Key .errortype = Keys.ErrorType,
                             Key .message = Keys.ErrorMessage
                            }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function AddNewDB(pDatabas As Databas) As ActionResult
            _iDatabas.BeginTransaction()
            Dim mAdd As Boolean

            Dim pDatabaseEntity = _iDatabas.All().Where(Function(x) x.DBName.Trim().ToLower() = pDatabas.DBName.Trim().ToLower()).FirstOrDefault()

            If pDatabas.Id > 0 Then
                mAdd = False
            Else
                mAdd = True
            End If

            Dim connTime As Integer
            If pDatabas.DBConnectionTimeout <> 0 Then
                connTime = pDatabas.DBConnectionTimeout
            Else
                connTime = 10
            End If

            If mAdd Then
                If _iDatabas.All().Any(Function(x) x.DBName.Trim().ToLower() = pDatabas.DBName.Trim().ToLower()) Then
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlADBConnNamed"), pDatabas.DBName)
                Else
                    Dim conText As String = "UID=" + pDatabas.DBUserId + ";PWD=" + pDatabas.DBPassword + ";DATABASE=" + pDatabas.DBDatabase + ";Server=" + pDatabas.DBServer
                    pDatabas.DBConnectionText = conText
                    pDatabas.DBProvider = Keys.DBProvider
                    pDatabas.DBConnectionTimeout = connTime
                    pDatabas.DBUseDBEngineUIDPWD = "0"
                    _iDatabas.Add(pDatabas)
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminExternalDBSave") ' FUS-6020
                End If
            Else
                If _iDatabas.All().Any(Function(x) x.DBName.Trim().ToLower() = pDatabas.DBName.Trim().ToLower() And x.Id <> pDatabas.Id) Then
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlADBConnNamed"), pDatabas.DBName)
                Else
                    Dim pDatabase = _iDatabas.All().Where(Function(x) x.Id = pDatabas.Id).FirstOrDefault()
                    Dim instance = pDatabas.DBServer
                    Dim userID = pDatabas.DBUserId
                    Dim pass = pDatabas.DBPassword
                    Dim conString
                    Dim valid = True

                    If userID Is Nothing And pass Is Nothing Then
                        conString = "Data Source=" + instance + ";Persist Security Info=True;Integrated Security=SSPI;"
                    Else
                        conString = "Data Source=" + instance + ";User ID=" + userID + ";Password=" + pass + ";Persist Security Info=True;MultipleActiveResultSets=True;"
                    End If
                    Using con As New SqlConnection(conString)
                        Try
                            con.Open()
                        Catch ex As Exception
                            valid = False
                        End Try
                    End Using

                    If valid Then
                        Dim conText As String = "UID=" + pDatabas.DBUserId + ";PWD=" + pDatabas.DBPassword + ";DATABASE=" + pDatabas.DBDatabase + ";Server=" + pDatabas.DBServer
                        pDatabase.DBName = pDatabas.DBName
                        pDatabase.DBConnectionText = conText
                        pDatabase.DBProvider = Keys.DBProvider
                        pDatabase.DBConnectionTimeout = connTime
                        pDatabase.DBUseDBEngineUIDPWD = "0"
                        pDatabase.DBUserId = pDatabas.DBUserId
                        pDatabase.DBPassword = pDatabas.DBPassword
                        pDatabase.DBServer = pDatabas.DBServer
                        pDatabase.DBDatabase = pDatabas.DBDatabase

                        _iDatabas.Update(pDatabase)
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminExternalDBEdit") ' FUS-6021
                    Else
                        Keys.ErrorType = "e"
                        Keys.ErrorMessage = Keys.LoginFailed()
                    End If
                End If

            End If
            _iDatabas.CommitTransaction()
            Return Json(New With {
                             Key .errortype = Keys.ErrorType,
                             Key .message = Keys.ErrorMessage
                            }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetAllSavedInstances() As ActionResult
            Dim pDatabase = From t In _iDatabas.All()

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pDatabase, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function DisconnectDBCheck(connName As String) As ActionResult

            Dim table As String = Nothing
            If _iTable.All().Any(Function(x) x.DBName.Trim().ToLower().Equals(connName.Trim().ToLower())) Then

                Dim pTable = _iTable.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(connName.Trim().ToLower))

                If pTable.Count = 0 = False Then
                    For Each tables As Table In pTable.ToList()
                        table = table + "Tables: " + tables.UserName & vbCrLf
                    Next
                End If
                Keys.ErrorType = "w"
                Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlExtDBIsInUse"), connName, vbNewLine, table)
                table = Nothing
            Else
                Keys.ErrorType = "s"
                Keys.ErrorMessage = ""
            End If

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function DisconnectDB(connName As String) As ActionResult
            Try
                Dim pDatabases = _iDatabas.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(connName.Trim().ToLower())).FirstOrDefault()
                _iDatabas.Delete(pDatabases)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminExternalDBDisconnect") ' FUS-6022
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function CheckIfDateChanged(pDatabase As Databas) As Boolean
            Dim Changed As Boolean
            Dim mAdd As Boolean

            If pDatabase.Id > 0 Then
                mAdd = False
            Else
                mAdd = True
            End If

            If mAdd Then
                If String.IsNullOrEmpty(pDatabase.DBName) And String.IsNullOrEmpty(pDatabase.DBDatabase) And String.IsNullOrEmpty(pDatabase.DBServer) And String.IsNullOrEmpty(pDatabase.DBPassword) And String.IsNullOrEmpty(pDatabase.DBUserId) Then
                    Changed = False
                Else
                    Changed = True
                End If

            Else
                Dim mDatabases = _iDatabas.All().Where(Function(x) x.Id = pDatabase.Id).FirstOrDefault()

                Changed = Not pDatabase.DBName.Trim().ToLower().Equals(mDatabases.DBName.Trim().ToLower())

                If mDatabases.DBUseDBEngineUIDPWD Then
                    Changed = ((Changed) Or Not pDatabase.DBUserId.Trim().ToLower().Equals(mDatabases.DBUserId.Trim().ToLower()))
                    Changed = ((Changed) Or Not pDatabase.DBPassword.Trim().ToLower().Equals(mDatabases.DBPassword.Trim().ToLower()))
                End If

                Changed = ((Changed) Or Not pDatabase.DBDatabase.Trim().ToLower().Equals(mDatabases.DBDatabase.Trim().ToLower()))
                Changed = ((Changed) Or Not pDatabase.DBServer.Trim().ToLower().Equals(mDatabases.DBServer.Trim().ToLower()))

                Dim connTime As Integer
                If pDatabase.DBConnectionTimeout <> 0 Then
                    connTime = pDatabase.DBConnectionTimeout
                Else
                    connTime = 10
                End If

                If connTime <> mDatabases.DBConnectionTimeout Then
                    Changed = True
                End If

                Return Changed
            End If
            Return Changed
        End Function
#End Region

#Region "Map"
        ' Load Database -> Map screen view
        Public Function LoadMapView() As PartialViewResult

            Dim lSystemEntities = _iSystem.All()
            Dim lTableEntities = _iTable.All()
            Dim lTabletabEntities = _iTabletab.All()
            Dim lTabsetsEntities = _iTabset.All()
            Dim lRelationShipEntities = _iRelationShip.All()

            Dim treeView = DatabaseMap.GetBindTreeControl(lSystemEntities, lTableEntities, lTabletabEntities, lTabsetsEntities, lRelationShipEntities)

            Dim Items As IEnumerable(Of SelectListItem) = Enumerable.Repeat(New SelectListItem() With {.Value = lSystemEntities.FirstOrDefault().UserName,
                                     .Text = lSystemEntities.FirstOrDefault().UserName,
                                    .Selected = True
                                }, count:=1)

            ViewBag.DatabaseList = Items.Concat(_iDatabas.All().CreateSelectList("DBName", "DBName", Nothing))
            ViewBag.FieldTypeList = _iLookupType.All().Where(Function(x) x.LookupTypeForCode.Trim.ToUpper.Equals("FLDSZ")).CreateSelectList("LookupTypeCode", "LookupTypeValue", Nothing, "SortOrder", ComponentModel.ListSortDirection.Ascending)

            ViewBag.ExistingTablesList = Common.DefaultDropdownSelectionBlank()
            ViewBag.FieldsList = Common.DefaultDropdownSelectionBlank()

            Return PartialView("_MapPartial", treeView)
        End Function

        'Add Workgroup in database
        Public Function SetNewWorkgroup(pWorkGroupName As String, pTabsetsId As Integer) As ActionResult
            Try

                Dim BaseWebPageMain = New BaseWebPage()
                Dim oSecureObjectMain = New Smead.Security.SecureObject(BaseWebPageMain.Passport)

                'Dim pOutputSettingsEntities = From t In _iSecureObject.All()
                ' Find workgroup from secure object table
                'Dim pSecureObjectID = pOutputSettingsEntities.Where(Function(x) x.Name.Trim().ToLower().Equals("workgroups")).FirstOrDefault().SecureObjectID
                _iTabset.BeginTransaction()
                '_iSecureObject.BeginTransaction()

                'Duplidate check
                If _iTabset.All().Any(Function(x) x.UserName.Trim().ToLower() = pWorkGroupName.Trim().ToLower()) = False Then
                    'Add new workgroup if not already exist
                    Dim pTabsetEntity = New TabSet()
                    pTabsetEntity.Id = _iTabset.All().Max(Function(x) x.Id) + 1
                    pTabsetEntity.UserName = pWorkGroupName.Trim()
                    pTabsetEntity.ViewGroup = 0
                    pTabsetEntity.StartupTabset = False
                    pTabsetEntity.TabFontBold = False
                    _iTabset.Add(pTabsetEntity)
                    pTabsetsId = pTabsetEntity.Id
                    'Dim pSecureObjectEntity = New Models.SecureObject()
                    'pSecureObjectEntity.BaseID = pSecureObjectID
                    'pSecureObjectEntity.SecureObjectTypeID = pSecureObjectID
                    'pSecureObjectEntity.Name = pWorkGroupName.Trim()
                    '_iSecureObject.Add(pSecureObjectEntity)

                    oSecureObjectMain.Register(pWorkGroupName.Trim(), Enums.SecureObjects.WorkGroup, Enums.SecureObjects.WorkGroup)
                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlTheWGName"), pWorkGroupName.Trim())
                    Exit Try
                End If
                _iTabset.CommitTransaction()
                '_iSecureObject.CommitTransaction()

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.SaveSuccessMessage()
            Catch ex As Exception
                _iTabset.RollBackTransaction()
                '_iSecureObject.RollBackTransaction()
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .tabsetId = Guid.NewGuid.ToString() + "_Tabsets_" + pTabsetsId.ToString()
                }, JsonRequestBehavior.AllowGet)
        End Function

        ' Edit data load for workgroup in Map
        Public Function EditNewWorkgroup(pTabsetsId As Integer) As ActionResult
            If Not pTabsetsId > 0 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pTabsetsEntity = _iTabset.All().Where(Function(x) x.Id = pTabsetsId).FirstOrDefault()

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pTabsetsEntity, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        ' Remove Workgroup
        Public Function RemoveNewWorkgroup(pTabsetsId As Integer) As ActionResult
            Try
                ' Find secure object type
                Dim lSecureObjectId As Integer
                Dim BaseWebPageMain = New BaseWebPage()
                Dim oSecureObjectMain = New Smead.Security.SecureObject(BaseWebPageMain.Passport)

                Dim sUserName As String = ""
                'Dim pOutputSettingsEntities = From t In _iSecureObject.All()
                'Dim pSecureObjectID = pOutputSettingsEntities.Where(Function(x) x.Name.Trim().ToLower().Equals("workgroups")).FirstOrDefault().SecureObjectID
                _iTabset.BeginTransaction()
                '_iSecureObject.BeginTransaction()
                'Edit workgroup if already exist
                If pTabsetsId > 0 Then
                    Dim pTabletab = _iTabletab.All().Where(Function(x) x.TabSet = pTabsetsId)
                    If pTabletab.Count() > 0 Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Languages.Translation("msgAdminCtrlCantRemoveWG")
                        Exit Try
                    End If
                    Dim pTabsetEntity = _iTabset.All().Where(Function(x) x.Id = pTabsetsId).FirstOrDefault()
                    sUserName = pTabsetEntity.UserName
                    If Not pTabsetEntity Is Nothing Then
                        _iTabset.Delete(pTabsetEntity)

                        lSecureObjectId = oSecureObjectMain.GetSecureObjectID(sUserName, Enums.SecureObjects.WorkGroup)
                        If (lSecureObjectId <> 0) Then oSecureObjectMain.UnRegister(lSecureObjectId)
                        'Dim pSecureObjectEntity = pOutputSettingsEntities.Where(Function(x) x.Name.Trim().ToLower().Equals(sUserName.Trim().ToLower())).FirstOrDefault()
                        'If Not pSecureObjectEntity Is Nothing Then
                        '    _iSecureObject.Delete(pSecureObjectEntity)
                        'End If
                    End If
                End If
                _iTabset.CommitTransaction()
                '_iSecureObject.CommitTransaction()

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.DeleteSuccessMessage()
            Catch ex As Exception
                _iTabset.RollBackTransaction()
                '_iSecureObject.RollBackTransaction()
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        ' Create new table
        Public Function SetNewTable(pParentNodeId As Integer, pDatabaseName As String, pTableName As String, pUserName As String, pIdFieldName As String, pFieldType As Integer, pFieldSize As Integer,
                                    pNodeLevel As Integer) As ActionResult

            If pFieldType = Enums.meFieldTypes.ftText Then
                Dim iMaxFieldSize = DatabaseMap.UserLinkIndexTableIdSize
                If ((pFieldSize < 1) Or (pFieldSize > iMaxFieldSize)) Then
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlFieldSizeValue"), iMaxFieldSize)
                    Return Json(New With {
                       Key .errortype = Keys.ErrorType,
                       Key .message = Keys.ErrorMessage
                   }, JsonRequestBehavior.AllowGet)
                End If
            End If

            Dim sDatabaseName As String = Keys.DBName
            Dim pDatabaseEntity = _iDatabas.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(pDatabaseName.Trim().ToLower())).FirstOrDefault()
            Dim pParentTableEntity As Table = Nothing
            Dim bSysAdmin As Boolean
            Dim lViewEntities = _iView.All()
            Dim pCurrentTableEntity As Table
            Dim sViewName As String = ""
            Dim pTabSetEntity As TabSet
            Dim iTabSetId As Integer = 0
            Dim sNewNodeId As String = 0
            Dim iTableTabId As Integer = 0
            Dim iRelId As Integer = 0
            Dim iTableId As Integer = 0
            Dim viewIdTemp As Integer = 0
            Dim lSecureObjectId As Integer
            Dim BaseWebPageMain = New BaseWebPage()
            Dim oSecureObjectMain = New Smead.Security.SecureObject(BaseWebPageMain.Passport)

            Dim sADOConn = DataServices.DBOpen(pDatabaseEntity)
            If (sADOConn Is Nothing) Then
                Keys.ErrorType = "e"
                Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlTheServerL1"), pDatabaseEntity.DBServer, pDatabaseEntity.DBDatabase, pDatabaseEntity.DBName)
                Return Json(New With {
               Key .errortype = Keys.ErrorType,
               Key .message = Keys.ErrorMessage
           }, JsonRequestBehavior.AllowGet)
            Else
                Dim oSchemaColumns As List(Of SchemaColumns)
                oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pTableName, sADOConn, pIdFieldName)
                If (oSchemaColumns.Count() > 0) Then
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlInternalNameExists")
                    Return Json(New With {
                       Key .errortype = Keys.ErrorType,
                       Key .message = Keys.ErrorMessage
                   }, JsonRequestBehavior.AllowGet)
                End If


                bSysAdmin = (DataServices.IsSysAdmin("", , , pDatabaseEntity))
                If (bSysAdmin) Then
                    Try
                        If pNodeLevel = Enums.eNodeLevel.ndTabSets Then
                            pTabSetEntity = _iTabset.All().Where(Function(x) x.Id = pParentNodeId).FirstOrDefault()
                            If Not pTabSetEntity Is Nothing Then
                                iTabSetId = pTabSetEntity.Id
                            End If
                        ElseIf pNodeLevel = Enums.eNodeLevel.ndTableTabRel Then
                            pParentTableEntity = _iTable.All().Where(Function(x) x.TableId = pParentNodeId).FirstOrDefault()
                        End If

                        Dim sParentTableName As String = ""
                        Dim SaveData As Boolean = False

                        _iTable.BeginTransaction()
                        _iView.BeginTransaction()
                        _iRelationShip.BeginTransaction()
                        _iTabletab.BeginTransaction()

                        If Not pDatabaseEntity Is Nothing Then
                            sDatabaseName = pDatabaseEntity.DBName
                        End If

                        If Not pParentTableEntity Is Nothing Then
                            sParentTableName = pParentTableEntity.TableName
                        End If

                        'Enums.meFieldTypes.ftCounter
                        ' Create table in apropriate database
                        Dim pOutPutStr As String = DatabaseMap.CreateNewTables(pTableName, pIdFieldName, pFieldType, pFieldSize, pDatabaseEntity, pParentTableEntity, _iDatabas)
                        If (String.IsNullOrEmpty(pOutPutStr)) Then
                            ' Set entry of this record in database "Tables" table
                            If (DatabaseMap.SetTablesEntity(pTableName, pUserName, pIdFieldName, sDatabaseName, pFieldType, _iTable, iTableId)) Then
                                ' Recently created table entity record
                                pCurrentTableEntity = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableName.Trim().ToLower())).FirstOrDefault()
                                ' View name 
                                If lViewEntities.Any(Function(x) x.ViewName.Trim().ToLower() = pUserName.Trim().ToLower()) = False Then
                                    sViewName = "All " & Trim$(pUserName) 'changed by Nikunj for FUS-5812
                                Else
                                    sViewName = "All " & Trim$(pUserName) & " " & lViewEntities.Where(Function(x) x.ViewName.Trim().ToLower().Contains(pUserName.Trim().ToLower())).Count() + 1 'changed by Nikunj for FUS-5812
                                End If
                                ' Insert into views table
                                Dim iViewId As Integer = 0
                                If (DatabaseMap.SetViewsEntity(pTableName, sViewName, _iView, iViewId)) Then
                                    viewIdTemp = iViewId
                                    ' Insert into view columns 
                                    If (DatabaseMap.SetViewColumnEntity(iViewId, pTableName, pIdFieldName, pFieldType, _iViewColumn, pParentTableEntity)) Then
                                        'If (iTabSetId <> 0) Then
                                        If (Trim$(sParentTableName) <> "") Then
                                            ' Insert record in relationship
                                            If (DatabaseMap.SetRelationshipsEntity(pTableName, pParentTableEntity, _iRelationShip, iRelId)) Then
                                                SaveData = True
                                            End If
                                        ElseIf (iTabSetId <> 0) Then
                                            ' Insert record in TabSet
                                            If (DatabaseMap.SetTabSetEntity(iTabSetId, iViewId, pTableName, _iTabletab, iTableTabId)) Then
                                                SaveData = True
                                            End If
                                        End If
                                        'End If
                                    End If

                                End If

                            End If
                        Else
                            If pOutPutStr IsNot "False" Then Throw New Exception(pOutPutStr)
                        End If

                        If (SaveData) Then
                            If iRelId <> 0 Then
                                sNewNodeId = iTableId.ToString() 'Guid.NewGuid.ToString() + "_RelShips_" + iTableId.ToString()
                            ElseIf iTableTabId <> 0 Then
                                sNewNodeId = Guid.NewGuid.ToString() + "_Tabletabs_" + iTableId.ToString()
                            End If

                            lSecureObjectId = oSecureObjectMain.Register(pTableName, Enums.SecureObjects.Table, Enums.SecureObjects.Table)
                            oSecureObjectMain.Register(sViewName, Enums.SecureObjects.View, lSecureObjectId)

                            'Added by Ganesh - To fix Bug #806 - 12/01/2016
                            Dim reqAndTransferPermissions = _iSecureObjectPermission.All().Where(Function(x) x.SecureObjectID = lSecureObjectId And (x.PermissionID = Enums.PassportPermissions.Request Or x.PermissionID = Enums.PassportPermissions.RequestOnBehalf Or x.PermissionID = Enums.PassportPermissions.RequestHigh Or x.PermissionID = Enums.PassportPermissions.Transfer))
                            _iSecureObjectPermission.BeginTransaction()
                            _iSecureObjectPermission.DeleteRange(reqAndTransferPermissions)
                            _iSecureObjectPermission.CommitTransaction()
                            'END of fix Bug #806

                            _iTable.CommitTransaction()
                            _iView.CommitTransaction()
                            _iRelationShip.CommitTransaction()
                            _iTabletab.CommitTransaction()
                        Else
                            _iTable.RollBackTransaction()
                            _iView.RollBackTransaction()
                            _iRelationShip.RollBackTransaction()
                            _iTabletab.RollBackTransaction()
                            DatabaseMap.DropTable(pTableName, pDatabaseEntity)

                            Keys.ErrorType = "e"
                            Keys.ErrorMessage = Keys.ErrorMessageJS()
                        End If

                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgMapTableCreateSuccess")
                    Catch ex As Exception

                        _iTable.RollBackTransaction()
                        _iView.RollBackTransaction()
                        _iRelationShip.RollBackTransaction()
                        _iTabletab.RollBackTransaction()
                        DatabaseMap.DropTable(pTableName, pDatabaseEntity)

                        Keys.ErrorType = "e"
                        Keys.ErrorMessage = ex.Message
                        If ex.Message.ToLower.Contains("incorrect syntax near the keyword") Then Keys.ErrorMessage = String.Format(Languages.Translation("msgMapTableCreateInValid"), pTableName)
                    End Try
                Else
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlNotSufficiantPermission"), pDatabaseName)
                End If
            End If

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .nodeId = sNewNodeId,
                    Key .viewIdTemp = viewIdTemp
                }, JsonRequestBehavior.AllowGet)
        End Function

        'Add Workgroup in database
        Public Function RenameTreeNode(pPrevNodeName As String, pNewNodeName As String, pId As Integer, pRenameOperation As String) As ActionResult
            Try
                Dim BaseWebPageMain = New BaseWebPage()
                Dim oSecureObjectMain = New Smead.Security.SecureObject(BaseWebPageMain.Passport)

                Select Case pRenameOperation.Trim().ToUpper()
                    Case "A"
                        Dim lSystemEntities = _iSystem.All()
                        If lSystemEntities.Any(Function(x) x.UserName.Trim().ToLower() = pNewNodeName.Trim().ToLower() AndAlso x.Id <> pId) = False Then
                            _iSystem.BeginTransaction()
                            'Dim pSystemEntity = lSystemEntities.Where(Function(x) x.Id = pId AndAlso x.UserName.Trim().ToLower() = pPrevNodeName.Trim().ToLower()).FirstOrDefault()
                            Dim pSystemEntity = lSystemEntities.Where(Function(x) x.Id = pId).FirstOrDefault()
                            If Not pSystemEntity Is Nothing Then
                                pSystemEntity.UserName = pNewNodeName.Trim()
                                _iSystem.Update(pSystemEntity)
                            End If
                            Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRenameAppNameSuccessfully")
                            _iSystem.CommitTransaction()
                        Else
                            Keys.ErrorType = "w"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlApplicationName"), pNewNodeName.Trim())
                            Exit Try
                        End If

                    Case "W"
                        Dim pOutputSettingsEntities = From t In _iSecureObject.All()

                        'Duplidate check
                        If _iTabset.All().Any(Function(x) x.UserName.Trim().ToLower() = pNewNodeName.Trim().ToLower() AndAlso x.Id <> pId) = False Then
                            _iTabset.BeginTransaction()
                            '_iSecureObject.BeginTransaction()
                            Dim pTabsetEntity = _iTabset.All().Where(Function(x) x.Id = pId).FirstOrDefault()
                            Dim pOldWGName As String = ""
                            If Not pTabsetEntity Is Nothing Then
                                pOldWGName = pTabsetEntity.UserName
                                pTabsetEntity.UserName = pNewNodeName.Trim()
                                _iTabset.Update(pTabsetEntity)

                                oSecureObjectMain.Rename(pOldWGName, Enums.SecureObjects.WorkGroup, pNewNodeName.Trim())

                                'Dim pSecureObjectEntity = pOutputSettingsEntities.Where(Function(x) x.Name.Trim().ToLower().Equals(pPrevNodeName.Trim().ToLower())).FirstOrDefault()
                                'If Not pSecureObjectEntity Is Nothing Then
                                '    pSecureObjectEntity.Name = pNewNodeName.Trim()
                                '    _iSecureObject.Update(pSecureObjectEntity)
                                'End If
                            End If
                            Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRenameWGSuccessfully")
                            _iTabset.CommitTransaction()
                            '_iSecureObject.CommitTransaction()
                        Else
                            Keys.ErrorType = "w"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlTheWGName"), pNewNodeName.Trim())
                            Exit Try
                        End If

                    Case "T"

                        Dim lTableEntities = _iTable.All()
                        If lTableEntities.Any(Function(x) x.UserName.Trim().ToLower() = pNewNodeName.Trim().ToLower() AndAlso x.TableId <> pId) = False Then
                            _iTable.BeginTransaction()
                            Dim pTableEntity = lTableEntities.Where(Function(x) x.TableId = pId AndAlso x.UserName.Trim().ToLower() = pPrevNodeName.Trim().ToLower()).FirstOrDefault()
                            If Not pTableEntity Is Nothing Then
                                pTableEntity.UserName = pNewNodeName.Trim()
                                _iTable.Update(pTableEntity)
                            End If
                            Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRenameTblSuccessfully")
                            _iTable.CommitTransaction()
                        Else
                            Keys.ErrorType = "w"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlTheTblName"), pNewNodeName.Trim())
                            Exit Try
                        End If

                    Case Else
                        Keys.ErrorType = "e"
                        Keys.ErrorMessage = Keys.ErrorMessageJS()
                        Exit Try
                End Select
                Keys.ErrorType = "s"
            Catch ex As Exception
                Select Case pRenameOperation.Trim().ToUpper()
                    Case "A"
                        _iSystem.RollBackTransaction()
                    Case "W"
                        _iTabset.RollBackTransaction()
                        '_iSecureObject.RollBackTransaction()
                    Case "T"
                        _iTable.RollBackTransaction()
                    Case Else
                        _iSystem.RollBackTransaction()
                        _iTable.RollBackTransaction()
                        _iTabset.RollBackTransaction()
                        _iSecureObject.RollBackTransaction()
                End Select

                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        'Load Dropdown Data into Attach table
        Public Function GetAttachTableList(iParentTableId As Integer, iTabSetId As Integer) As ActionResult

            Dim lTablesEntities = _iTable.All()

            lTablesEntities = DatabaseMap.GetAttachExistingTableList(lTablesEntities, iParentTableId, iTabSetId, _iTabletab, _iRelationShip, _IDBManager)

            'Dim lEngineTablesList = CollectionsClass.EngineTablesList()
            'Dim lEngineTablesNotNeededList = CollectionsClass.EngineTablesNotNeededList()
            'Dim lTableList As List(Of String) = New List(Of String)
            'lTablesEntities = From q In lTablesEntities Where Not (lEngineTablesList.Any(Function(x) x.Trim().ToLower() = q.TableName.Trim().ToLower())) Select q
            'lTablesEntities = From q In lTablesEntities Where Not (lEngineTablesNotNeededList.Any(Function(x) x.Trim().ToLower() = q.TableName.Trim().ToLower())) Select q

            'If iParentTableId = 0 Then
            '    Dim lTableTabsEntities = _iTabletab.All()
            '    Dim lTableTabsTableList = (From q In lTableTabsEntities.Where(Function(x) x.TabSet = iTabSetId) Select q.TableName)
            '    For Each sTableNameLoop In lTableTabsTableList
            '        lTableList.Add(sTableNameLoop)
            '    Next
            '    lTablesEntities = From q In lTablesEntities Where Not (lTableList.Any(Function(x) x.Trim().ToLower() = q.TableName.Trim().ToLower())) Select q
            'Else
            '    'sTableName = lTablesEntities.Where(Function(x) x.UserName.Trim().ToLower().Equals(sParentTable.Trim().ToLower())).FirstOrDefault().TableName
            '    sTableName = lTablesEntities.Where(Function(x) x.TableId = iParentTableId).FirstOrDefault().TableName
            '    Dim lRel = _iRelationShip.All()
            '    lTablesEntities = From q In lTablesEntities Where Not q.TableName.Trim().ToLower().Equals(sTableName.Trim().ToLower()) Select q
            '    lTableList = New List(Of String)
            '    For Each sTableNameLoop In DatabaseMap.GetChildTableIds(sTableName, _IDBManager)
            '        lTableList.Add(sTableNameLoop)
            '    Next
            '    'lTablesEntities = From q In lTablesEntities Where Not (DatabaseMap.GetChildTableIds(sTableName, _IDBManager).Any(Function(x) x.Trim().ToLower() = q.TableName.Trim().ToLower())) Select q
            '    lTablesEntities = From q In lTablesEntities Where Not (lTableList.Any(Function(x) x.Trim().ToLower() = q.TableName.Trim().ToLower())) Select q
            'End If

            Dim Result = From p In lTablesEntities.OrderBy(Function(x) x.TableName)
                         Select p.TableName, p.TableId, p.UserName

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(Result, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Attach time Exiting fields confirmation
        Public Function ConfirmationForAlreadyExistColumn(iParentTableId As Integer, iTableId As Integer, ConfAns As Boolean) As ActionResult
            Dim pParentTableEntity = New Table()
            Dim lTableEntities = _iTable.All()
            Dim bCreateNew As Boolean
            Dim csADOConn = New ADODB.Connection
            Dim psADOConn = New ADODB.Connection
            Dim oSchemaColumns As List(Of SchemaColumns)
            Dim pTableEntity = New Table()
            Dim sExtraStr As String
            Dim iExtraValue As Integer
            Dim SaveData As Boolean = False
            Dim iRelId As Integer = 0

            Try
                sExtraStr = ""
                iExtraValue = 1
                pTableEntity = lTableEntities.Where(Function(x) x.TableId = iTableId).FirstOrDefault()
                pParentTableEntity = lTableEntities.Where(Function(x) x.TableId = iParentTableId).FirstOrDefault()
                csADOConn = DataServices.DBOpen(_iDatabas.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(pTableEntity.DBName.Trim().ToLower())).FirstOrDefault())
                oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pTableEntity.TableName, csADOConn, pParentTableEntity.TableName & DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName))

                bCreateNew = True
                If (ConfAns) Then
                    bCreateNew = False
                Else
                    Do
                        sExtraStr = Format$(iExtraValue)
                        iExtraValue = iExtraValue + 1
                        oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pTableEntity.TableName, csADOConn, pParentTableEntity.TableName & DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName) & sExtraStr)
                    Loop Until (oSchemaColumns.Count() = 0)
                End If
                oSchemaColumns = Nothing
                psADOConn = DataServices.DBOpen(_iDatabas.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(pParentTableEntity.DBName.Trim().ToLower())).FirstOrDefault())
                oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pParentTableEntity.TableName, psADOConn, DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName))
                _iRelationShip.BeginTransaction()
                If (bCreateNew) Then
                    csADOConn.BeginTrans()
                    If (DatabaseMap.CreateNewField(pParentTableEntity.TableName & DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName) & sExtraStr, IIf(oSchemaColumns.Count() > 0, oSchemaColumns(0).DataType, Enums.DataTypeEnum.rmInteger), CLng("0" & Trim$(oSchemaColumns(0).CharacterMaxLength)), pTableEntity.TableName, csADOConn)) = True Then
                        If (DatabaseMap.SetRelationshipsEntity(pTableEntity.TableName, pParentTableEntity, _iRelationShip, iRelId, sExtraStr)) = True Then
                            SaveData = True
                        End If
                    End If
                Else
                    If (DatabaseMap.SetRelationshipsEntity(pTableEntity.TableName, pParentTableEntity, _iRelationShip, iRelId, sExtraStr)) = True Then
                        SaveData = True
                    End If
                End If

                If (bCreateNew) Then
                    _iRelationShip.CommitTransaction()
                    csADOConn.CommitTrans()
                Else
                    _iRelationShip.CommitTransaction()
                End If
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.SaveSuccessMessage()
            Catch ex As Exception
                If (bCreateNew) Then
                    _iRelationShip.RollBackTransaction()
                    csADOConn.RollbackTrans()
                Else
                    _iRelationShip.RollBackTransaction()
                End If
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            oSchemaColumns = Nothing
            pParentTableEntity = Nothing
            pTableEntity = Nothing
            psADOConn.Close()
            csADOConn.Close()

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        'Attach Table in Map Node
        Public Function SetAttachTableDetails(iParentTableId As Integer, iTableId As Integer, iTabSetId As Integer) As ActionResult
            Dim lTableEntities = _iTable.All()
            Dim lViewEntities = _iView.All()
            Dim pTableEntity = New Table()
            Dim pParentTableEntity = New Table()
            Dim pViewEntity = New View()
            Dim SaveData As Boolean = False
            Dim oSchemaColumns As List(Of SchemaColumns)
            Dim csADOConn = New ADODB.Connection
            Dim psADOConn = New ADODB.Connection
            Dim bCreateNew As Boolean
            'Dim sExtraStr As String
            'Dim iExtraValue As Integer
            Dim iTableTabId As Integer = 0
            Dim iRelId As Integer = 0

            Try
                pTableEntity = lTableEntities.Where(Function(x) x.TableId = iTableId).FirstOrDefault()
                If Not (pTableEntity Is Nothing) Then
                    pViewEntity = lViewEntities.Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableEntity.TableName.Trim().ToLower())).FirstOrDefault()
                End If

                If Not (pViewEntity Is Nothing) Then
                    If pViewEntity.Id <> 0 Then
                        If (iParentTableId <> 0) Then
                            'sExtraStr = ""
                            'iExtraValue = 1
                            pParentTableEntity = lTableEntities.Where(Function(x) x.TableId = iParentTableId).FirstOrDefault()
                            csADOConn = DataServices.DBOpen(_iDatabas.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(pTableEntity.DBName.Trim().ToLower())).FirstOrDefault())
                            oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pTableEntity.TableName, csADOConn, pParentTableEntity.TableName & DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName))
                            bCreateNew = True
                            If (oSchemaColumns.Count() > 0) Then
                                Keys.ErrorType = "c"
                                Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlReuseThisColumn"), pParentTableEntity.TableName & DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName))
                                Exit Try
                            Else
                                oSchemaColumns = Nothing
                                psADOConn = DataServices.DBOpen(_iDatabas.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(pParentTableEntity.DBName.Trim().ToLower())).FirstOrDefault())
                                oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pParentTableEntity.TableName, psADOConn, DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName))
                                _iRelationShip.BeginTransaction()
                                csADOConn.BeginTrans()
                                If (DatabaseMap.CreateNewField(pParentTableEntity.TableName & DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName), IIf(oSchemaColumns.Count() > 0, oSchemaColumns(0).DataType, Enums.DataTypeEnum.rmInteger), CLng("0" & Trim$(oSchemaColumns(0).CharacterMaxLength)), pTableEntity.TableName, csADOConn)) = True Then
                                    If (DatabaseMap.SetRelationshipsEntity(pTableEntity.TableName, pParentTableEntity, _iRelationShip, iRelId)) = True Then
                                        SaveData = True
                                    End If
                                End If
                            End If

                        Else
                            'smsg += " => Tabletab value save"
                            _iTabletab.BeginTransaction()
                            If (DatabaseMap.SetTabSetEntity(iTabSetId, pViewEntity.Id, pTableEntity.TableName, _iTabletab, iTableTabId)) = True Then
                                SaveData = True
                            End If
                        End If
                    End If
                End If

                If (SaveData) Then
                    If (iParentTableId <> 0) Then
                        If (bCreateNew) Then
                            _iRelationShip.CommitTransaction()
                            csADOConn.CommitTrans()
                        Else
                            _iRelationShip.CommitTransaction()
                            'csADOConn.CommitTrans()
                        End If
                    Else
                        _iTabletab.CommitTransaction()
                    End If
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgMapTableAttachedSuccess")
                End If
            Catch ex As Exception
                If (iParentTableId <> 0) Then
                    If (bCreateNew) Then
                        _iRelationShip.RollBackTransaction()
                        csADOConn.RollbackTrans()
                    Else
                        _iRelationShip.RollBackTransaction()
                    End If
                Else
                    _iTabletab.RollBackTransaction()
                End If
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            oSchemaColumns = Nothing
            pParentTableEntity = Nothing
            pTableEntity = Nothing
            pViewEntity = Nothing

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        'Attach Table in Map Node
        'Public Function SetAttachTableDetails1(iParentTableId As Integer, iTableId As Integer, iTabSetId As Integer) As ActionResult
        '    Dim smsg As String = "Starting"

        '    Dim lTableEntities = _iTable.All()
        '    Dim lViewEntities = _iView.All()
        '    Dim pTableEntity = New Table()
        '    Dim pParentTableEntity = New Table()
        '    Dim pViewEntity = New View()
        '    Dim SaveData As Boolean = True
        '    Dim oSchemaColumns As List(Of SchemaColumns)
        '    Dim csADOConn = New ADODB.Connection
        '    Dim psADOConn = New ADODB.Connection
        '    Dim bCreateNew As Boolean
        '    Dim sExtraStr As String
        '    Dim iExtraValue As Integer
        '    Dim iTableTabId As Integer = 0
        '    Dim iRelId As Integer = 0
        '    Try

        '        pTableEntity = lTableEntities.Where(Function(x) x.TableId = iTableId).FirstOrDefault()
        '        If Not (pTableEntity Is Nothing) Then
        '            pViewEntity = lViewEntities.Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableEntity.TableName.Trim().ToLower())).FirstOrDefault()
        '        End If

        '        If Not (pViewEntity Is Nothing) Then
        '            If pViewEntity.Id <> 0 Then
        '                If (iParentTableId <> 0) Then
        '                    sExtraStr = ""
        '                    iExtraValue = 1
        '                    'smsg += " => Faching parent table"
        '                    pParentTableEntity = lTableEntities.Where(Function(x) x.TableId = iParentTableId).FirstOrDefault()
        '                    'smsg += " => Got parent table"
        '                    csADOConn = DataServices.DBOpen(_iDatabas.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(pTableEntity.DBName.Trim().ToLower())).FirstOrDefault())
        '                    'smsg += " => connection open"
        '                    'csADOConn.BeginTrans()
        '                    oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pTableEntity.TableName, csADOConn, DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName))
        '                    'smsg += " => fetch schemacolumns - " + oSchemaColumns.Count().ToString()
        '                    bCreateNew = True
        '                    If (oSchemaColumns.Count() > 0) Then
        '                        'smsg += " => message box "
        '                        If MsgBox("Column """ & pParentTableEntity.TableName & DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName) & """ already exists. Reuse this Column?", MsgBoxStyle.YesNo, "Table Attach Confirmation") = MsgBoxResult.Yes Then
        '                            bCreateNew = False
        '                            'smsg += " => ans yes"
        '                        Else
        '                            Do
        '                                sExtraStr = Format$(iExtraValue)
        '                                iExtraValue = iExtraValue + 1
        '                                oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pTableEntity.TableName, csADOConn, DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName) & sExtraStr)
        '                                'smsg += " => ans no"
        '                            Loop Until (oSchemaColumns.Count() = 0)
        '                        End If
        '                    End If
        '                    oSchemaColumns = Nothing
        '                    psADOConn = DataServices.DBOpen(_iDatabas.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(pParentTableEntity.DBName.Trim().ToLower())).FirstOrDefault())
        '                    oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pParentTableEntity.TableName, psADOConn, DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName))
        '                    _iRelationShip.BeginTransaction()
        '                    If (bCreateNew) Then
        '                        If (DatabaseMap.CreateNewField(pParentTableEntity.TableName & DatabaseMap.RemoveTableNameFromField(pParentTableEntity.IdFieldName) & sExtraStr, IIf(oSchemaColumns.Count() > 0, oSchemaColumns(0).DataType, Enums.DataTypeEnum.rmInteger), CLng("0" & Trim$(oSchemaColumns(0).CharacterMaxLength)), pTableEntity.TableName, csADOConn)) = True Then
        '                            If (DatabaseMap.SetRelationshipsEntity(pTableEntity.TableName, pParentTableEntity, _iRelationShip, iRelId, sExtraStr)) = True Then
        '                                SaveData = True
        '                            End If

        '                        End If
        '                    Else
        '                        If (DatabaseMap.SetRelationshipsEntity(pTableEntity.TableName, pParentTableEntity, _iRelationShip, iRelId, sExtraStr)) = True Then
        '                            SaveData = True
        '                        End If
        '                    End If
        '                    oSchemaColumns = Nothing
        '                    pParentTableEntity = Nothing
        '                Else
        '                    'smsg += " => Tabletab value save"
        '                    '_iTabletab.BeginTransaction()
        '                    If (DatabaseMap.SetTabSetEntity(iTabSetId, pViewEntity.Id, pTableEntity.TableName, _iTabletab, iTableTabId)) = True Then
        '                        SaveData = True
        '                    End If
        '                End If
        '            End If
        '        End If
        '        pTableEntity = Nothing
        '        pViewEntity = Nothing
        '        If (iParentTableId <> 0) Then
        '            If (bCreateNew) Then
        '                _iRelationShip.CommitTransaction()
        '                ' csADOConn.CommitTrans()
        '            Else
        '                _iRelationShip.CommitTransaction()
        '                'csADOConn.CommitTrans()
        '            End If
        '        Else
        '            _iTabletab.CommitTransaction()
        '        End If
        '        'smsg += " => Done successs"
        '        Keys.ErrorType = "s"
        '        Keys.ErrorMessage = Keys.SaveSuccessMessage()
        '    Catch ex As Exception
        '        If (iParentTableId <> 0) Then
        '            If (bCreateNew) Then
        '                _iRelationShip.RollBackTransaction()
        '                'csADOConn.RollbackTrans()
        '            Else
        '                _iRelationShip.RollBackTransaction()
        '                'csADOConn.RollbackTrans()
        '            End If
        '        Else
        '            _iTabletab.RollBackTransaction()
        '        End If
        '        'smsg += " => Done error"
        '        Keys.ErrorType = "e"
        '        Keys.ErrorMessage = Keys.ErrorMessageJS()
        '    End Try
        '    Return Json(New With { _
        '            Key .errortype = Keys.ErrorType, _
        '            Key .message = smsg _
        '        }, JsonRequestBehavior.AllowGet)
        'End Function

        'Delete Table

        Public Function DeleteTableFromTableTab(iTabSetId As Integer, iNewTableSetId As Integer) As ActionResult
            Dim lTableEntities = _iTable.All()
            Dim IsUnattached = True
            Try
                Dim pTableTabTableEntity = lTableEntities.Where(Function(x) x.TableId = iTabSetId).FirstOrDefault()
                Dim pTableTabsEntity = _iTabletab.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableTabTableEntity.TableName.Trim().ToLower()) AndAlso x.TabSet = iNewTableSetId).FirstOrDefault()
                If (pTableTabsEntity.Id <> 0) Then
                    _iTabletab.Delete(pTableTabsEntity)
                End If
                pTableTabsEntity = Nothing

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlUnAttachTblSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .isunattached = IsUnattached
                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function DeleteTableFromRelationship(iParentTableId As Integer, iTableId As Integer) As ActionResult
            Dim lTableEntities = _iTable.All()
            Dim pUpperTableEntity = New Table()
            Dim pLowerTableEntity = New Table()
            Dim lRelationshipsEntites = _iRelationShip.All()

            Dim IsUnattached = True
            Try
                pUpperTableEntity = lTableEntities.Where(Function(x) x.TableId = iParentTableId).FirstOrDefault()
                pLowerTableEntity = lTableEntities.Where(Function(x) x.TableId = iTableId).FirstOrDefault()

                Dim oRelationships = lRelationshipsEntites.Where(Function(x) x.UpperTableName.Trim().ToLower().Equals(pUpperTableEntity.TableName.Trim().ToLower()) AndAlso x.LowerTableName.Trim().ToLower().Equals(pLowerTableEntity.TableName.Trim().ToLower())).FirstOrDefault()
                If (oRelationships.Id <> 0) Then
                    _iRelationShip.Delete(oRelationships)
                End If

                oRelationships = Nothing
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlUnAttachTblSuccessfully")

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            lTableEntities = Nothing
            pUpperTableEntity = Nothing
            pLowerTableEntity = Nothing
            lRelationshipsEntites = Nothing

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .isunattached = IsUnattached,
                    Key .iTableId = iTableId
                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetDeleteTableNames(iParentTableId As Integer, iTableId As Integer) As ActionResult
            Dim lTableEntities = _iTable.All()
            Dim lTabsetEntities = _iTabset.All()
            Dim pUpperTableEntity = New Table()
            Dim pLowerTableEntity = New TabSet()
            Dim sUpperTableName As String = ""
            Dim sLowerTableName As String = ""
            Try
                If (iParentTableId <> 0 AndAlso iTableId <> 0) Then
                    pUpperTableEntity = lTableEntities.Where(Function(x) x.TableId = iTableId).FirstOrDefault()
                    pLowerTableEntity = lTabsetEntities.Where(Function(x) x.Id = iParentTableId).FirstOrDefault()
                    sUpperTableName = Trim$(pUpperTableEntity.UserName)
                    sLowerTableName = Trim$(pLowerTableEntity.UserName)
                    Keys.ErrorType = "s"
                Else
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Keys.ErrorMessageJS()
                End If
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS() 'ex.Message()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .parentTable = Trim$(pUpperTableEntity.UserName),
                    Key .childTable = Trim$(pLowerTableEntity.UserName),
                        Key .childTableId = Trim$(pLowerTableEntity.Id)
                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function DeleteTable(iParentTableId As Integer, iTableId As Integer) As ActionResult
            Dim sViewMessage As String = ""
            Dim IsUnattached = True
            Try
                Dim lTableEntities = _iTable.All()

                Dim pUpperTableEntity = lTableEntities.Where(Function(x) x.TableId = iParentTableId).FirstOrDefault()
                Dim pLowerTableEntity = lTableEntities.Where(Function(x) x.TableId = iTableId).FirstOrDefault()
                'If iTabSetId <> 0 Then
                '    If (MsgBox("Are you sure you want to remove the attachment between """ & Trim$(pLowerTableEntity.TableName) & """ And """ & Trim$(pUpperTableEntity.TableName) & """?", MsgBoxStyle.YesNo, "Remove Confirmation") = MsgBoxResult.Yes) Then
                '        'Remove the TableTabs Record
                '        Dim pTableTabTableEntity = lTableEntities.Where(Function(x) x.TableId = iTabSetId).FirstOrDefault()
                '        Dim pTableTabsEntity = _iTabletab.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableTabTableEntity.TableName.Trim().ToLower())).FirstOrDefault()
                '        If (pTableTabsEntity.Id <> 0) Then
                '            _iTabletab.Delete(pTableTabsEntity)
                '        End If
                '        pTableTabsEntity = Nothing
                '        Keys.ErrorType = "s"
                '        Keys.ErrorMessage = "Unattach Table successfully."/
                '    Else
                '        IsUnattached = False
                '    End If
                '    Exit Try
                'Else
                DatabaseMap.GetTableDependency(lTableEntities, _iView, _iViewColumn, pUpperTableEntity, pLowerTableEntity, sViewMessage)
                If (sViewMessage <> "") Then
                    sViewMessage = String.Format(Languages.Translation("msgAdminCtrlTblExistsOnSomePlacesL1"), pLowerTableEntity.UserName, Trim$(pUpperTableEntity.UserName), sViewMessage)
                    'MsgBox(sViewMessage, MsgBoxStyle.OkOnly, "Worning Message")
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = "<html>" + sViewMessage + "</html>"
                    pUpperTableEntity = Nothing
                    pLowerTableEntity = Nothing
                    IsUnattached = False
                    Exit Try
                Else
                    Keys.ErrorType = "c"
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlRuSure2RemoveAttachment"), Trim$(pLowerTableEntity.UserName), Trim$(pUpperTableEntity.UserName))
                End If
                'End If
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .isunattached = IsUnattached
                }, JsonRequestBehavior.AllowGet)
        End Function

        'Attach Existing Table in Map Node
        Public Function SetAttachExistingTableDetails(iParentTableId As Integer, iTableId As Integer, sIdFieldName As String) As ActionResult
            Dim lTableEntities = _iTable.All()
            Dim lViewEntities = _iView.All()
            Dim pTableEntity = New Table()
            Dim pParentTableEntity = New Table()
            Dim pViewEntity = New View()
            Dim SaveData As Boolean = True
            Dim iRelId As Integer = 0

            Try
                pTableEntity = lTableEntities.Where(Function(x) x.TableId = iTableId).FirstOrDefault()
                If Not (pTableEntity Is Nothing) Then
                    pViewEntity = lViewEntities.Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableEntity.TableName.Trim().ToLower())).FirstOrDefault()
                End If

                If Not (pViewEntity Is Nothing) Then
                    If pViewEntity.Id <> 0 Then
                        If (iParentTableId <> 0) Then
                            pParentTableEntity = lTableEntities.Where(Function(x) x.TableId = iParentTableId).FirstOrDefault()
                            _iRelationShip.BeginTransaction()
                            If (DatabaseMap.SetRelationshipsEntity(pTableEntity.TableName, pParentTableEntity, _iRelationShip, iRelId, , sIdFieldName)) = True Then
                                SaveData = True
                            End If
                            pParentTableEntity = Nothing
                        End If
                    End If
                End If
                pTableEntity = Nothing
                pViewEntity = Nothing
                If (iParentTableId <> 0) Then
                    _iRelationShip.CommitTransaction()
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Keys.SaveSuccessMessage()
                    Exit Try
                End If
            Catch ex As Exception
                If (iParentTableId <> 0) Then
                    _iRelationShip.RollBackTransaction()
                End If
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        'Get tables Id fields list
        Public Function GetAttachTableFieldsList(iParentTableId As Integer, iTableId As Integer, sCurrIdFieldName As String) As ActionResult
            Dim lTablesEntities = _iTable.All()
            Dim lTables = New List(Of String)

            Try
                Dim pTableEntity = lTablesEntities.Where(Function(x) x.TableId = iTableId).FirstOrDefault()
                Dim pParentTableEntity = lTablesEntities.Where(Function(x) x.TableId = iParentTableId).FirstOrDefault()
                lTables = DatabaseMap.GetAttachTableFieldsList(pTableEntity, pParentTableEntity, _iDatabas)
                If (lTables.Count() = 0) Then
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlTblDoesNotContainAnyMatchingFields"), pTableEntity.UserName, sCurrIdFieldName)
                    Exit Try
                End If
                Keys.ErrorType = "s"
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(lTables, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .jsonObject = jsonObject
                }, JsonRequestBehavior.AllowGet)

            'Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Get tables Id fields list
        Public Function LoadAttachExistingTableScreen(iParentTableId As Integer, iTabSetId As Integer) As ActionResult
            Dim lTablesEntities = _iTable.All()
            Dim pTableNameEntity = lTablesEntities.Where(Function(x) x.TableId = iParentTableId).FirstOrDefault()
            lTablesEntities = DatabaseMap.GetAttachExistingTableList(lTablesEntities, iParentTableId, iTabSetId, _iTabletab, _iRelationShip, _IDBManager)
            Dim ResultTables = From p In lTablesEntities.OrderBy(Function(x) x.TableName)
                               Select p.TableName, p.TableId, p.UserName

            'Dim pTableEntity = lTablesEntities.Where(Function(x) x.TableId = ResultTables.FirstOrDefault().TableId).FirstOrDefault()
            'Dim lTableColumns = DatabaseMap.GetAttachTableFieldsList(pTableEntity, pTableNameEntity, _iDatabas)

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObjectTableColumns = "" 'JsonConvert.SerializeObject(lTableColumns, Newtonsoft.Json.Formatting.Indented, Setting)
            Dim jsonObjectTables = JsonConvert.SerializeObject(ResultTables, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(New With {
                    Key .tableName = pTableNameEntity.TableName,
                    Key .tableIdColumn = DatabaseMap.RemoveTableNameFromField(pTableNameEntity.IdFieldName),
                    Key .tableIdColumnList = jsonObjectTableColumns,
                    Key .tablesList = jsonObjectTables
                }, JsonRequestBehavior.AllowGet)

            'Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Button Up & Down in Tree
        Public Function ChangeNodeOrder(pUpperTableId As Integer, pTableName As String, pTableId As Integer, pAction As Char) As ActionResult
            Try
                Dim vOldOrder As Integer
                Dim vNewOrder As Integer
                Dim oTable As Table
                Dim oUpperTable As Table

                oTable = _iTable.All().Where(Function(x) x.TableId = pTableId).FirstOrDefault()
                If oTable Is Nothing Then
                    Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlObjectNotFound")}, JsonRequestBehavior.AllowGet)
                End If
                oUpperTable = _iTable.All().Where(Function(x) x.TableId = pUpperTableId).FirstOrDefault()

                Select Case pTableName.ToLower()
                    Case "tabsets"
                        Dim oOldTabset = _iTabset.All().Where(Function(x) x.Id = pTableId).FirstOrDefault()
                        If oOldTabset Is Nothing Then
                            Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlObjectNotFound")}, JsonRequestBehavior.AllowGet)
                        End If
                        vOldOrder = oOldTabset.Id

                        Dim oNewTabset As TabSet = New TabSet()
                        If pAction = "U" Then
                            oNewTabset = _iTabset.All().Where(Function(x) x.Id < pTableId).OrderByDescending(Function(x) x.Id).FirstOrDefault()
                        ElseIf pAction = "D" Then
                            oNewTabset = _iTabset.All().Where(Function(x) x.Id > pTableId).OrderBy(Function(x) x.Id).FirstOrDefault()
                        End If
                        If oNewTabset Is Nothing Then
                            Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlObjectNotFound")}, JsonRequestBehavior.AllowGet)
                        End If
                        vNewOrder = oNewTabset.Id

                        _IDBManager.ConnectionString = Keys.GetDBConnectionString(Nothing)

                        Dim sSql = "UPDATE Tabsets SET Id = 9999 WHERE UserName = '" & oOldTabset.UserName & "'"
                        Dim iOutPut = _IDBManager.ExecuteNonQuery(System.Data.CommandType.Text, sSql)
                        If (iOutPut > 0) Then
                            sSql = "UPDATE Tabsets SET Id = " & vOldOrder.ToString() & " WHERE UserName = '" & oNewTabset.UserName & "'"
                            iOutPut = _IDBManager.ExecuteNonQuery(System.Data.CommandType.Text, sSql)
                            If (iOutPut > 0) Then
                                sSql = "UPDATE Tabsets SET Id = " & vNewOrder.ToString() & " WHERE UserName = '" & oOldTabset.UserName & "'"
                                iOutPut = _IDBManager.ExecuteNonQuery(System.Data.CommandType.Text, sSql)
                            End If
                        End If


                        Dim lNewTabletab = _iTabletab.All().Where(Function(x) x.TabSet = vNewOrder).ToList()
                        For Each oTabletab As TableTab In lNewTabletab
                            oTabletab.TabSet = 9999
                            _iTabletab.Update(oTabletab)
                        Next

                        Dim lOldTableTabIds As List(Of Integer) = New List(Of Integer)
                        Dim lOldTabletab = _iTabletab.All().Where(Function(x) x.TabSet = vOldOrder)
                        For Each oTabletab As TableTab In lOldTabletab.ToList()
                            lOldTableTabIds.Add(oTabletab.Id)
                            oTabletab.TabSet = vNewOrder
                            _iTabletab.Update(oTabletab)
                        Next

                        lNewTabletab = _iTabletab.All().Where(Function(x) x.TabSet = vNewOrder Or x.TabSet = 9999).ToList()
                        For Each oTabletab As TableTab In lNewTabletab
                            If Not lOldTableTabIds.Any(Function(x) x = oTabletab.Id) Then
                                oTabletab.TabSet = vOldOrder
                                _iTabletab.Update(oTabletab)
                            End If
                        Next

                        _IDBManager.Dispose()

                        If iOutPut <= 0 Then
                            Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlErrorWhileChangeOrder")}, JsonRequestBehavior.AllowGet)
                        End If

                        'oOldTabset.Id = 9999
                        '_iTabset.Update(oOldTabset)

                        'oNewTabset.Id = vOldOrder
                        '_iTabset.Update(oNewTabset)

                        'oOldTabset.Id = vNewOrder
                        '_iTabset.Update(oOldTabset)

                    Case "tabletabs"
                        'Dim oOldTabletab = _iTabletab.All().Where(Function(x) x.TableName.ToLower().Equals(oTable.TableName.ToLower())).FirstOrDefault()
                        Dim oOldTabletab = _iTabletab.All().Where(Function(x) x.TableName.ToLower().Equals(oTable.TableName.ToLower()) AndAlso x.TabSet = pUpperTableId).FirstOrDefault()
                        If oOldTabletab Is Nothing Then
                            Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlObjectNotFound")}, JsonRequestBehavior.AllowGet)
                        End If
                        vOldOrder = oOldTabletab.TabOrder

                        Dim oNewTabletab As TableTab = New TableTab()
                        If pAction = "U" Then
                            oNewTabletab = _iTabletab.All().Where(Function(x) x.TabSet = pUpperTableId AndAlso x.TabOrder < oOldTabletab.TabOrder).OrderByDescending(Function(x) x.TabOrder).FirstOrDefault()
                        ElseIf pAction = "D" Then
                            oNewTabletab = _iTabletab.All().Where(Function(x) x.TabSet = pUpperTableId AndAlso x.TabOrder > oOldTabletab.TabOrder).OrderBy(Function(x) x.TabOrder).FirstOrDefault()
                        End If
                        If oNewTabletab Is Nothing Then
                            Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlObjectNotFound")}, JsonRequestBehavior.AllowGet)
                        End If
                        vNewOrder = oNewTabletab.TabOrder

                        oOldTabletab.TabOrder = vNewOrder
                        _iTabletab.Update(oOldTabletab)

                        oNewTabletab.TabOrder = vOldOrder
                        _iTabletab.Update(oNewTabletab)

                    Case "relships"

                        Dim oOldRelationShips = _iRelationShip.All().Where(Function(x) x.LowerTableName.ToLower().Equals(oTable.TableName.ToLower()) AndAlso x.UpperTableName.ToLower().Equals(oUpperTable.TableName.ToLower())).FirstOrDefault()
                        If oUpperTable Is Nothing Or oOldRelationShips Is Nothing Then
                            Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlObjectNotFound")}, JsonRequestBehavior.AllowGet)
                        End If
                        vOldOrder = oOldRelationShips.TabOrder

                        Dim oNewRelationShips As RelationShip = New RelationShip()
                        If pAction = "U" Then
                            oNewRelationShips = _iRelationShip.All().Where(Function(x) x.UpperTableName.ToLower().Equals(oUpperTable.TableName.ToLower()) AndAlso x.TabOrder < oOldRelationShips.TabOrder).OrderByDescending(Function(x) x.TabOrder).FirstOrDefault()
                        ElseIf pAction = "D" Then
                            oNewRelationShips = _iRelationShip.All().Where(Function(x) x.UpperTableName.ToLower().Equals(oUpperTable.TableName.ToLower()) AndAlso x.TabOrder > oOldRelationShips.TabOrder).OrderBy(Function(x) x.TabOrder).FirstOrDefault()
                        End If
                        If oNewRelationShips Is Nothing Then
                            Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlObjectNotFound")}, JsonRequestBehavior.AllowGet)
                        End If
                        vNewOrder = oNewRelationShips.TabOrder

                        oOldRelationShips.TabOrder = vNewOrder
                        _iRelationShip.Update(oOldRelationShips)

                        oNewRelationShips.TabOrder = vOldOrder
                        _iRelationShip.Update(oNewRelationShips)

                    Case Else
                        Exit Select
                        'Keys.ErrorType = "w"
                        'Keys.ErrorMessage = "Not able to reorder selected table."
                End Select

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.SaveSuccessMessage()
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try


            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function
#End Region

#Region "Table Registration"
        'Load TableRegisterartial partial view
        Public Function LoadTableRegisterView() As PartialViewResult
            Return PartialView("_TableRegisterPartial")
        End Function

        'Get data from 'Table' table and load Unregister table list
        Public Function LoadRegisterList() As ActionResult
            Try
                Dim registerList As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
                Dim bDoNotAdd As Boolean
                Dim pTableEntity = _iTable.All.OrderBy(Function(m) m.TableId)
                Dim pRelationEntity = _iRelationShip.All.OrderBy(Function(m) m.Id)
                Dim pTableTabEntity = _iTabletab.All.OrderBy(Function(m) m.Id)
                For Each tableObj As Table In pTableEntity.ToList()
                    bDoNotAdd = tableObj.Attachments
                    If (Not bDoNotAdd) Then
                        bDoNotAdd = CollectionsClass.IsEngineTable(tableObj.TableName.Trim.ToLower)
                        If (Not bDoNotAdd) Then
                            bDoNotAdd = CollectionsClass.EngineTablesNotNeededList.Contains(tableObj.TableName.Trim.ToLower)
                        End If
                        If (Not bDoNotAdd) Then
                            Dim lowerTable = pRelationEntity.Any(Function(m) m.LowerTableName.Trim.ToLower().Equals(tableObj.TableName.Trim.ToLower()))
                            Dim upperTable = pRelationEntity.Any(Function(m) m.UpperTableName.Trim.ToLower().Equals(tableObj.TableName.Trim.ToLower()))
                            bDoNotAdd = lowerTable Or upperTable
                            If (Not bDoNotAdd) Then
                                For Each tableTabeVar As TableTab In pTableTabEntity.ToList()
                                    bDoNotAdd = tableTabeVar.TableName.Trim.ToLower().Equals(tableObj.TableName.Trim.ToLower())
                                    If bDoNotAdd Then
                                        Exit For
                                    End If
                                Next
                                If (Not bDoNotAdd) Then
                                    If (Not (tableObj.DBName Is Nothing)) Then
                                        registerList.Add(New KeyValuePair(Of String, String)(tableObj.TableName, tableObj.DBName))
                                    Else
                                        registerList.Add(New KeyValuePair(Of String, String)(tableObj.TableName, "TabFusionRMSDemoServer"))
                                    End If
                                End If
                            End If
                        End If
                    End If
                Next
                If (registerList Is Nothing) Then
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlNotRegAnyTable")
                    Keys.ErrorType = "w"
                Else
                    Keys.ErrorMessage = Keys.SaveSuccessMessage()
                    Keys.ErrorType = "s"
                End If
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim RegisterBlock = JsonConvert.SerializeObject(registerList, Newtonsoft.Json.Formatting.Indented, Setting)
                Return Json(New With {Key .RegisterBlock = RegisterBlock,
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorMessage = Keys.ErrorMessageJS()
                Keys.ErrorType = "e"
                Return Json(New With {
Key .errortype = Keys.ErrorType,
Key .message = Keys.ErrorMessage
}, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try
        End Function

        'Get list of added external database from 'Database' table and load 'Available database' list.
        Public Function GetAvailableDatabase() As ActionResult
            Try
                Dim pSystemDatabase = _iSystem.All.OrderBy(Function(m) m.Id).FirstOrDefault()
                Dim pAvailableDatabase = From t In _iDatabas.All()
                                         Select t.DBName, t.DBServer
                Dim systemDBList As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
                systemDBList.Add(New KeyValuePair(Of String, String)(pSystemDatabase.UserName, "TabFusionRMSDemoServer"))
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim systemDB = JsonConvert.SerializeObject(systemDBList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim ExternalDB = JsonConvert.SerializeObject(pAvailableDatabase, Newtonsoft.Json.Formatting.Indented, Setting)
                Return Json(New With {Key .systemDB = systemDB,
                          Key .ExternalDB = ExternalDB,
                          Key .errortype = Keys.ErrorType,
                          Key .message = Keys.ErrorMessage
                          }, JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Throw 'ex
            End Try
        End Function

        'Get list of all table names from 'Table' table which is not register yet and load 'Available table' list.
        Public Function GetAvailableTable(dbName As String, server As String) As ActionResult
            Dim unregisterList As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
            Dim schemaTableInfoList As New List(Of SchemaTable)
            Dim schemaViewList As New List(Of SchemaTable)
            Dim pTableEntity = _iTable.All.OrderBy(Function(m) m.TableId)
            Dim flag As Boolean = False
            Dim bDoNotAdd As Boolean
            Dim sADOConn As ADODB.Connection = Nothing
            Try
                Dim pDatabaseEntity = _iDatabas.All.Where(Function(m) m.DBServer.Trim().ToLower().Equals(server.Trim().ToLower()) AndAlso m.DBName.Trim().ToLower().Equals(dbName.Trim().ToLower())).FirstOrDefault()
                sADOConn = DataServices.DBOpen(pDatabaseEntity)

                schemaTableInfoList = SchemaTable.GetSchemaTable(sADOConn, Enums.geTableType.UserTables, "")
                schemaViewList = SchemaTable.GetSchemaTable(sADOConn, Enums.geTableType.Views, "")
                If (Not (schemaViewList Is Nothing)) Then
                    For Each schemaTableObj As SchemaTable In schemaViewList
                        schemaTableInfoList.Add(schemaTableObj)
                    Next
                End If
                If (Not (schemaTableInfoList Is Nothing)) Then
                    For Each schemaTableObj As SchemaTable In schemaTableInfoList.ToList()
                        bDoNotAdd = CollectionsClass.IsEngineTable(schemaTableObj.TableName.Trim.ToLower)
                        If (Not bDoNotAdd) Then
                            bDoNotAdd = CollectionsClass.EngineTablesNotNeededList.Contains(schemaTableObj.TableName.Trim.ToLower)
                        End If
                        If (Not bDoNotAdd) Then
                            If (schemaTableObj.TableType.Trim.ToLower.Equals("view")) Then
                                Dim vwVar = (Left(schemaTableObj.TableName.Trim.ToLower, Len("view_")).Equals("view_"))
                                'Dim viewVar = (Left(schemaTableObj.TableName.Trim.ToLower, Len("vw")).Equals("vw"))
                                'bDoNotAdd = vwVar Or viewVar
                                bDoNotAdd = vwVar
                            End If
                        End If
                        If (Not bDoNotAdd) Then
                            For Each tableObj As Table In pTableEntity.ToList()
                                bDoNotAdd = tableObj.TableName.Trim.ToLower.Equals(schemaTableObj.TableName.Trim.ToLower())
                                If bDoNotAdd = True Then
                                    Exit For
                                End If
                            Next
                            If (Not bDoNotAdd) Then
                                Dim tempVar As New SchemaTable
                                If (Len(schemaTableObj.TableName.Trim.ToLower()) > 20) Then
                                    flag = True
                                    tempVar = Nothing
                                Else
                                    If (flag = True) Then
                                        flag = True
                                    Else
                                        flag = False
                                    End If
                                    tempVar = schemaTableObj

                                End If
                                If (Not tempVar Is Nothing) Then
                                    If (Not server.Trim.ToLower.Equals("TabFusionRMSDemoServer".Trim.ToLower())) Then
                                        unregisterList.Add(New KeyValuePair(Of String, String)(tempVar.TableName, dbName))
                                    Else
                                        unregisterList.Add(New KeyValuePair(Of String, String)(tempVar.TableName, server))
                                    End If
                                End If
                            End If
                        End If
                    Next
                End If
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim unregisterListJSON = JsonConvert.SerializeObject(unregisterList, Newtonsoft.Json.Formatting.Indented, Setting)
                If unregisterList.Count() = 0 Then
                    Keys.ErrorType = "w"
                Else
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlTblBindSuccessfully")
                End If
                Return Json(New With {Key .unregisterListJSON = unregisterListJSON,
                                Key .flag = flag,
                                 Key .errortype = Keys.ErrorType,
                                 Key .message = Keys.ErrorMessage
                                }, JsonRequestBehavior.AllowGet)

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS

                Return Json(New With {
Key .errortype = Keys.ErrorType,
Key .message = Keys.ErrorMessage
}, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try

        End Function

        'Get primary or unique field of selected table and load 'Primary field'
        Public Function GetPrimaryField(TableName As String, ConName As String) As ActionResult
            Dim PrimaryFieldList As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
            Dim pSchemaIndexList As New List(Of SchemaIndex)
            Dim pSchemaIndexEntity As New SchemaIndex
            Dim pSchemaColumnList As New List(Of SchemaColumns)
            Dim bUniqueKey As Boolean = False
            Dim lColumnSize As Long = 0
            Dim lUserLinkIndexId As Long = 30
            Dim sADOConn As ADODB.Connection = Nothing
            Dim pconDBObj As Databas
            Try
                pconDBObj = _iDatabas.All.Where(Function(m) m.DBName.Trim.ToLower.Equals(ConName.Trim.ToLower)).FirstOrDefault
                sADOConn = DataServices.DBOpen(pconDBObj)
                'First check for a Single Field, Unique, Primary Key
                pSchemaIndexList = SchemaIndex.GetTableIndexes(TableName, sADOConn)
                For iCount = 0 To pSchemaIndexList.Count - 1
                    pSchemaIndexEntity = pSchemaIndexList.Item(iCount)
                    If ((pSchemaIndexEntity.PrimaryKey = True) And (pSchemaIndexEntity.Unique = True)) Then
                        If (iCount < pSchemaIndexList.Count - 1) Then
                            If (pSchemaIndexEntity.IndexName <> pSchemaIndexList.Item(iCount + 1).IndexName) Then
                                PrimaryFieldList.Add(New KeyValuePair(Of String, String)(pSchemaIndexEntity.ColumnName, pSchemaIndexEntity.TableName))
                                bUniqueKey = True
                                Exit For
                            End If
                        Else
                            PrimaryFieldList.Add(New KeyValuePair(Of String, String)(pSchemaIndexEntity.ColumnName, pSchemaIndexEntity.TableName))
                            bUniqueKey = True
                        End If
                    End If
                Next

                'Second check for a Single Field, Unique Key (since the Primary key didn't qualify)
                If (Not bUniqueKey) Then
                    For iCount = 0 To pSchemaIndexList.Count - 1
                        pSchemaIndexEntity = pSchemaIndexList.Item(iCount)
                        If (pSchemaIndexEntity.Unique = True) Then
                            If (iCount < pSchemaIndexList.Count - 1) Then
                                If (pSchemaIndexEntity.IndexName <> pSchemaIndexList.Item(iCount).IndexName) Then
                                    PrimaryFieldList.Add(New KeyValuePair(Of String, String)(pSchemaIndexEntity.ColumnName, pSchemaIndexEntity.TableName))
                                    bUniqueKey = True
                                    Exit For
                                End If
                            Else
                                PrimaryFieldList.Add(New KeyValuePair(Of String, String)(pSchemaIndexEntity.ColumnName, pSchemaIndexEntity.TableName))
                                bUniqueKey = True
                            End If
                        End If
                    Next
                End If

                'If there are no Single field, Unique Keys then list the columns
                pSchemaColumnList = SchemaInfoDetails.GetSchemaInfo(TableName, sADOConn)
                If (Not bUniqueKey) Then
                    For Each pSchemaColumnObj As SchemaColumns In pSchemaColumnList.ToList
                        lColumnSize = Convert.ToUInt64("0" & pSchemaColumnObj.CharacterMaxLength)
                        If (lColumnSize = 0) Then
                            lColumnSize = Convert.ToUInt64("0" & pSchemaColumnObj.NumericPrecision)
                        End If
                        If (lColumnSize = 0) Then
                            If (pSchemaColumnObj.IsADate) Then
                                lColumnSize = lUserLinkIndexId
                            End If
                        End If
                        If ((lColumnSize > 0) And (lColumnSize <= lUserLinkIndexId)) Then
                            PrimaryFieldList.Add(New KeyValuePair(Of String, String)(pSchemaColumnObj.ColumnName, pSchemaColumnObj.TableName))
                        End If
                    Next
                End If
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim fieldListJSON = JsonConvert.SerializeObject(PrimaryFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                If fieldListJSON.Count() = 0 Then
                    Keys.ErrorType = "w"
                Else
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlTblBindSuccessfully")
                End If
                Return Json(New With {
                            Key .fieldListJSON = fieldListJSON,
    Key .errortype = Keys.ErrorType,
    Key .message = Keys.ErrorMessage
    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Return Json(New With {
Key .errortype = Keys.ErrorType,
Key .message = Keys.ErrorMessage
}, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try

        End Function

        'Selected table will be register by adding record in 'Table' table
        Public Function SetRegisterTable(dbName As String, tbName As String, fldName As String) As ActionResult
            Try
                _iView.BeginTransaction()
                _iViewColumn.BeginTransaction()
                _iTable.BeginTransaction()
                _iSecureObject.BeginTransaction()
                _iReportStyle.BeginTransaction()
                Dim ReportStyle = _iReportStyle.All.OrderBy(Function(m) m.Id).FirstOrDefault()
                Dim Attribute = _iAttribute.All.OrderBy(Function(m) m.Id).FirstOrDefault()
                Dim TableTypeId = _iSecureObject.All.Where(Function(m) m.Name = "Tables").FirstOrDefault()
                Dim ViewTypeId = _iSecureObject.All.Where(Function(m) m.Name = "Views").FirstOrDefault()
                Dim moSecureObjectTable = _iSecureObject.All.Where(Function(m) m.Name.Trim.ToLower.Equals(tbName.Trim.ToLower) And m.SecureObjectTypeID.Equals(TableTypeId.SecureObjectTypeID)).FirstOrDefault
                Dim moSecureObjectView = _iSecureObject.All.Where(Function(m) m.Name.Trim.Trim.ToLower.Equals(("All " + tbName).Trim.ToLower) And m.SecureObjectTypeID.Equals(ViewTypeId.SecureObjectTypeID)).FirstOrDefault
                If (Not (moSecureObjectTable Is Nothing) And Not (moSecureObjectView Is Nothing)) Then
                    Dim moTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tbName.Trim.ToLower)).FirstOrDefault
                    Dim moView = _iView.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tbName.Trim.ToLower)).FirstOrDefault
                    If (Not moTable Is Nothing) Then
                        _iTable.Delete(moTable)
                    End If
                    If (Not moView Is Nothing) Then
                        _iView.Delete(moView)
                        Dim moViewColumn = _iViewColumn.All.Where(Function(m) m.ViewsId = moView.Id)
                        If (Not moViewColumn Is Nothing) Then
                            _iViewColumn.DeleteRange(moViewColumn)
                        End If
                    End If
                    _iSecureObject.Delete(moSecureObjectView)
                    _iSecureObject.Delete(moSecureObjectTable)

                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlSecObjNameAlreadyReg")
                    _iView.CommitTransaction()
                    _iViewColumn.CommitTransaction()
                    _iTable.CommitTransaction()
                    _iSecureObject.CommitTransaction()
                    Exit Try
                End If



                Dim viewEntity As View = New View
                Dim tableEntity As Table = New Table
                Dim viewColumnEntity As ViewColumn = New ViewColumn
                Dim tableObjectEntity As Models.SecureObject = New Models.SecureObject
                Dim pMaxSearchOrder = _iTable.All().Max(Function(x) x.SearchOrder)
                Dim pSecureObjectID As Integer
                Dim pSecureBaseID As Integer

                If Attribute Is Nothing Then
                    tableEntity.AttributesID = 0
                Else
                    tableEntity.AttributesID = Attribute.Id
                End If
                If (Not (dbName.Trim.ToLower.Equals("TabFusionRMSDemoServer".Trim.ToLower()))) Then
                    tableEntity.DBName = dbName
                End If
                tableEntity.TableName = tbName
                tableEntity.UserName = tbName
                tableEntity.TrackingStatusFieldName = Nothing
                tableEntity.CounterFieldName = Nothing
                tableEntity.AddGroup = 0
                tableEntity.DelGroup = 0
                tableEntity.EditGroup = 0
                tableEntity.MgrGroup = 0
                tableEntity.ViewGroup = 0
                tableEntity.PCFilesEditGrp = 0
                tableEntity.PCFilesNVerGrp = 0
                tableEntity.Attachments = False
                tableEntity.IdFieldName = tbName + "." + fldName
                tableEntity.TrackingTable = 0
                tableEntity.Trackable = False
                tableEntity.DescFieldPrefixOneWidth = 0
                tableEntity.DescFieldPrefixTwoWidth = 0
                tableEntity.MaxRecordsAllowed = 0
                tableEntity.OutTable = 0
                tableEntity.RestrictAddToTable = 0
                tableEntity.MaxRecsOnDropDown = 0
                tableEntity.ADOServerCursor = 0
                tableEntity.ADOQueryTimeout = 30
                tableEntity.ADOCacheSize = 1
                tableEntity.DeleteAttachedGroup = 9999
                tableEntity.RecordManageMgmtType = 0
                tableEntity.SearchOrder = pMaxSearchOrder + 1
                _iTable.Add(tableEntity)
                If (ReportStyle IsNot Nothing) Then
                    viewEntity.ReportStylesId = ReportStyle.Id
                End If
                viewEntity.AltViewId = 0
                viewEntity.DeleteGridAvail = False
                viewEntity.SearchableView = True
                viewEntity.FiltersActive = False
                viewEntity.SQLStatement = "SELECT * FROM [" + tbName + "]"
                viewEntity.SearchableView = True
                viewEntity.RowHeight = 0
                viewEntity.TableName = tbName
                viewEntity.TablesId = 0
                viewEntity.UseExactRowCount = False
                viewEntity.VariableColWidth = True
                viewEntity.VariableFixedCols = False
                viewEntity.VariableRowHeight = True
                viewEntity.ViewGroup = 0
                viewEntity.ViewName = "All " + tbName
                viewEntity.ViewOrder = 1
                viewEntity.ViewType = 0
                viewEntity.Visible = True
                '25 is the new default as it is only used for Web Access 
                ' and new default of 5000 for desktop.  RVW 03/06/2019
                viewEntity.MaxRecsPerFetch = viewEntity.MaxRecsPerFetch
                viewEntity.MaxRecsPerFetchDesktop = viewEntity.MaxRecsPerFetchDesktop
                _iView.Add(viewEntity)

                Dim editAllowed As Boolean = True
                Dim loutput As DataSet = Nothing
                If (Not String.IsNullOrWhiteSpace(fldName)) Then
                    Dim strqry = "SELECT [" + fldName + "] FROM [" + tbName + "] Where 0=1;"
                    _IDBManager.ConnectionString = Keys.GetDBConnectionString
                    loutput = _IDBManager.ExecuteDataSetWithSchema(System.Data.CommandType.Text, strqry)
                    _IDBManager.Dispose()
                End If
                If (Not (loutput Is Nothing)) Then
                    If (loutput.Tables(0).Columns(0).AutoIncrement) Then editAllowed = False
                End If

                Dim View = _iView.All.Where(Function(m) m.ViewName = "All " + tbName).FirstOrDefault()
                viewColumnEntity.ViewsId = View.Id
                viewColumnEntity.ColumnNum = 0
                viewColumnEntity.ColumnWidth = 3000
                viewColumnEntity.EditAllowed = editAllowed
                viewColumnEntity.FieldName = tbName + "." + fldName
                viewColumnEntity.Heading = fldName
                viewColumnEntity.FilterField = True
                viewColumnEntity.FreezeOrder = 1
                viewColumnEntity.SortOrder = 1
                viewColumnEntity.LookupType = 0
                viewColumnEntity.SortableField = True
                viewColumnEntity.ColumnStyle = 0
                viewColumnEntity.DropDownFlag = 0
                viewColumnEntity.DropDownReferenceColNum = 0
                viewColumnEntity.FormColWidth = 0
                viewColumnEntity.LookupIdCol = 0
                viewColumnEntity.MaskClipMode = False
                viewColumnEntity.MaskInclude = False
                viewColumnEntity.MaskPromptChar = "_"
                viewColumnEntity.MaxPrintLines = 1
                viewColumnEntity.PageBreakField = False
                viewColumnEntity.PrinterColWidth = 0
                viewColumnEntity.SortOrderDesc = False
                viewColumnEntity.SuppressDuplicates = False
                viewColumnEntity.SuppressPrinting = False
                viewColumnEntity.VisibleOnForm = True
                viewColumnEntity.VisibleOnPrint = True
                viewColumnEntity.CountColumn = False
                viewColumnEntity.SubtotalColumn = False
                viewColumnEntity.PrintColumnAsSubheader = False
                viewColumnEntity.RestartPageNumber = False
                viewColumnEntity.LabelJustify = 1
                viewColumnEntity.LabelLeft = -1
                viewColumnEntity.LabelTop = -1
                viewColumnEntity.LabelWidth = -1
                viewColumnEntity.LabelHeight = -1
                viewColumnEntity.ControlLeft = -1
                viewColumnEntity.ControlTop = -1
                viewColumnEntity.ControlWidth = -1
                viewColumnEntity.ControlHeight = -1
                viewColumnEntity.TabOrder = -1
                viewColumnEntity.ColumnOrder = 0
                _iViewColumn.Add(viewColumnEntity)

                If (Not (TableTypeId Is Nothing)) Then
                    tableObjectEntity.SecureObjectTypeID = TableTypeId.SecureObjectTypeID
                    tableObjectEntity.BaseID = TableTypeId.SecureObjectTypeID
                End If
                tableObjectEntity.Name = tbName
                _iSecureObject.Add(tableObjectEntity)
                _iSecureObject.CommitTransaction()
                'Added by Ganesh on 22nd Sep 2015
                pSecureObjectID = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals(tbName)).FirstOrDefault().SecureObjectID
                pSecureBaseID = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals(tbName)).FirstOrDefault().BaseID
                AddSecureObjectPermissionsBySecureObjectType(pSecureObjectID, pSecureBaseID, Enums.SecureObjects.Table)
                pSecureObjectID = Nothing
                _iSecureObject.BeginTransaction()


                Dim RecentTableBaseId = _iSecureObject.All.Where(Function(m) m.Name = tbName).FirstOrDefault()
                Dim viewObjectEntity As Models.SecureObject = New Models.SecureObject

                If (Not (ViewTypeId Is Nothing)) Then
                    viewObjectEntity.SecureObjectTypeID = ViewTypeId.SecureObjectTypeID
                End If

                If (Not (RecentTableBaseId Is Nothing)) Then
                    viewObjectEntity.BaseID = RecentTableBaseId.SecureObjectID
                End If
                viewObjectEntity.Name = "All " + tbName
                _iSecureObject.Add(viewObjectEntity)
                _iSecureObject.CommitTransaction()
                'Added by Ganesh on 22nd Sep 2015
                pSecureObjectID = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals("All " + tbName)).FirstOrDefault().SecureObjectID
                pSecureBaseID = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals("All " + tbName)).FirstOrDefault().BaseID
                AddSecureObjectPermissionsBySecureObjectType(pSecureObjectID, pSecureBaseID, Enums.SecureObjects.View)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.SaveSuccessMessage()
                'Fill the secure permissions dataset after SetRegisterTable
                CollectionsClass.ReloadPermissionDataSet()

                _iView.CommitTransaction()
                _iViewColumn.CommitTransaction()
                _iTable.CommitTransaction()

                _iReportStyle.CommitTransaction()

            Catch ex As Exception
                _iView.RollBackTransaction()
                _iViewColumn.RollBackTransaction()
                _iTable.RollBackTransaction()
                _iSecureObject.RollBackTransaction()
                _iReportStyle.RollBackTransaction()
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(New With {
    Key .errortype = Keys.ErrorType,
    Key .message = Keys.ErrorMessage
    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Selected table will be unregister by removing record from 'Table' table but no data will be lost
        Public Function UnRegisterTable(dbName As String, tbName As String) As ActionResult
            Dim tableEntity As Table
            Dim vSecureObjectId As Integer
            Try
                _iView.BeginTransaction()
                _iViewColumn.BeginTransaction()
                _iTable.BeginTransaction()
                _iSecureObject.BeginTransaction()
                'Added By Ganesh
                _iSecureObjectPermission.BeginTransaction()
                'Delete views entry from 'Views','ViewColumns' and 'Secure Object' table in order to unregister a table
                Dim oTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tbName.Trim.ToLower)).FirstOrDefault
                If (oTable IsNot Nothing) Then
                    If (oTable.TrackingTable <> 0) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgJsTableCanNotBeUnregister"), oTable.TableName)
                        Exit Try
                    End If
                End If
                Dim viewsEntity = _iView.All.Where(Function(m) m.TableName.Trim.ToLower() = tbName.Trim.ToLower())
                For Each viewVar As View In viewsEntity.ToList()
                    _iView.Delete(viewVar)
                    Dim viewColumnsEntity = _iViewColumn.All.Where(Function(m) m.ViewsId = viewVar.Id)
                    For Each viewColumnVar As ViewColumn In viewColumnsEntity.ToList()
                        _iViewColumn.Delete(viewColumnVar)
                    Next
                    Dim secureViewObject = _iSecureObject.All.Where(Function(m) m.Name.Trim.ToLower() = viewVar.ViewName.Trim.ToLower()).FirstOrDefault()
                    If (Not secureViewObject Is Nothing) Then
                        _iSecureObject.Delete(secureViewObject)
                    End If

                Next

                'Delete table entry from 'Table' and 'Secure Object' table in order to unregister a table
                If (dbName.Trim.ToLower.Equals("TabFusionRMSDemoServer".Trim.ToLower())) Then
                    tableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tbName.Trim.ToLower())).FirstOrDefault()
                Else
                    tableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tbName.Trim.ToLower()) AndAlso m.DBName.Trim.ToLower.Equals(dbName.Trim.ToLower())).FirstOrDefault()
                End If

                If (Not (tableEntity Is Nothing)) Then
                    _iTable.Delete(tableEntity)
                    Dim secureTableObject = _iSecureObject.All.Where(Function(m) m.Name.Trim.ToLower() = tbName.Trim.ToLower()).FirstOrDefault()
                    'Added by Ganesh
                    vSecureObjectId = _iSecureObject.All.Where(Function(m) m.Name.Trim.ToLower() = tbName.Trim.ToLower()).FirstOrDefault().SecureObjectID
                    Dim pSecureObjPermissions = _iSecureObjectPermission.All.Where(Function(x) x.SecureObjectID = vSecureObjectId)
                    If (Not (secureTableObject Is Nothing)) Then
                        _iSecureObject.Delete(secureTableObject)
                        _iSecureObject.CommitTransaction()
                        _iSecureObjectPermission.DeleteRange(pSecureObjPermissions)
                    End If

                End If

                'Fill the secure permissions dataset after UnRegisterTable
                CollectionsClass.ReloadPermissionDataSet()

                _iView.CommitTransaction()
                _iViewColumn.CommitTransaction()
                _iTable.CommitTransaction()
                '_iSecureObject.CommitTransaction()
                _iSecureObjectPermission.CommitTransaction()
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgJsTableRegisterTblUnRegSuccessfully")
            Catch ex As Exception
                _iView.RollBackTransaction()
                _iViewColumn.RollBackTransaction()
                _iTable.RollBackTransaction()
                _iSecureObject.RollBackTransaction()
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                        Key .errortype = Keys.ErrorType,
                           Key .message = Keys.ErrorMessage
                          }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Table will be permannetly drop from table containing database
        Public Function DropTable(dbName As String, tbName As String) As ActionResult
            Try
                Dim oTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tbName.Trim.ToLower)).FirstOrDefault
                If (oTable IsNot Nothing) Then
                    If (oTable.TrackingTable <> 0) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgJsTableCanNotBeDropped"), oTable.TableName)
                        Exit Try
                    End If
                End If
                Dim jsonVar As JsonResult = UnRegisterTable(dbName, tbName)
                Dim var = jsonVar.Data
                Dim Serialvalue = JsonConvert.SerializeObject(var)
                Dim boolVar As Boolean = Serialvalue.Contains("Table UnRegister successfully")
                Dim sADOConn As New ADODB.Connection
                Dim DatabaseName As String = ""
                Dim ServerInstance As String = ""
                Dim sSQLStr As String
                Dim bFoundCounter As Boolean
                Dim pDatabaseEntity As New Databas
                Dim conStr As String = Keys.GetDBConnectionString 'System.Configuration.ConfigurationManager.ConnectionStrings("TABFusionRMSRMSDemoContext").ConnectionString

                _iSLIndexer.BeginTransaction()
                _iSLIndexerCache.BeginTransaction()
                _iSystem.BeginTransaction()
                If (boolVar) Then
                    pDatabaseEntity = _iDatabas.All.Where(Function(m) m.DBName.Trim().ToLower().Equals(dbName.Trim().ToLower())).FirstOrDefault()

                    sADOConn = DataServices.DBOpen(pDatabaseEntity)
                    Dim conStrList As New List(Of KeyValuePair(Of String, String))
                    conStrList = Keys.GetParamFromConnString(pDatabaseEntity)
                    For Each conList As KeyValuePair(Of String, String) In conStrList
                        If (conList.Key.Equals("DBDatabase")) Then
                            DatabaseName = conList.Value
                        ElseIf (conList.Key.Equals("DBServer")) Then
                            ServerInstance = conList.Value
                        End If
                    Next



                    sSQLStr = "DROP TABLE [" + DatabaseName + "].[DBO].[" + tbName + "];"
                    If (DataServices.ProcessADOCommand(sSQLStr, sADOConn, False)) Then
                        Dim indexerEntity = _iSLIndexer.All.Where(Function(m) m.IndexTableName.Trim.ToLower.Equals(tbName.Trim.ToLower()))
                        _iSLIndexer.DeleteRange(indexerEntity)
                        Dim indexerCacheEntity = _iSLIndexerCache.All.Where(Function(m) m.IndexTableName.Trim.ToLower.Equals(tbName.Trim.ToLower()))
                        _iSLIndexerCache.DeleteRange(indexerCacheEntity)
                        Dim schemaInfoEntity = SchemaInfoDetails.GetSchemaInfo("System", DataServices.DBOpen())
                        If (Not (schemaInfoEntity Is Nothing)) Then
                            For iCount As Integer = 0 To schemaInfoEntity.Count - 1
                                bFoundCounter = schemaInfoEntity(iCount).ColumnName.Trim.ToLower.Equals((tbName & "Counter").Trim.ToLower())
                                If bFoundCounter Then
                                    Exit For
                                End If
                            Next
                            If (bFoundCounter) Then
                                Using con As New SqlConnection(conStr)
                                    Try
                                        con.Open()
                                        If (con.State()) Then
                                            Dim sSql = "ALTER TABLE System DROP COLUMN [" & tbName & "Counter]"
                                            _IDBManager.ConnectionString = Keys.GetDBConnectionString(Nothing)
                                            _IDBManager.ExecuteNonQuery(System.Data.CommandType.Text, sSql)
                                            _IDBManager.Dispose()
                                        End If
                                    Catch ex As Exception
                                        If (Not con.State) Then
                                            Keys.ErrorType = "e"
                                            Keys.ErrorMessage = Keys.UnableToConnect(ServerInstance)
                                        Else
                                            Keys.ErrorType = "e"
                                            Keys.ErrorMessage = Keys.ErrorMessageJS()
                                        End If
                                    End Try
                                End Using
                            End If
                        End If
                    End If
                End If
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlTblDropSuccessfully")
                _iSLIndexer.CommitTransaction()
                _iSLIndexerCache.CommitTransaction()
                _iSystem.CommitTransaction()
            Catch ex As Exception
                _iSLIndexer.RollBackTransaction()
                _iSLIndexerCache.RollBackTransaction()
                _iSystem.RollBackTransaction()
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(New With {
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

#End Region

#End Region

#Region "Data Module"

        Public Function LoadDataView() As PartialViewResult
            Return PartialView("_DataPartial")
        End Function

        Public Function GetDataList(ByVal pTabledName As String, sidx As String, sord As String, page As Integer, rows As Integer) As JsonResult

            Dim dtRecords As DataTable = Nothing
            Dim totalRecords As Integer = 0
            Dim pTableEntity = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTabledName.Trim().ToLower())).FirstOrDefault()
            Dim pDatabaseEntity = Nothing
            If Not pTableEntity Is Nothing Then
                If Not pTableEntity.DBName Is Nothing Then
                    pDatabaseEntity = _iDatabas.Where(Function(x) x.DBName.Trim().ToLower().Equals(pTableEntity.DBName.Trim().ToLower())).FirstOrDefault()
                End If
                _IDBManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)
            Else
                _IDBManager.ConnectionString = Keys.GetDBConnectionString
            End If
            _IDBManager.CreateParameters(6)
            _IDBManager.AddParameters(0, "@TableName", pTabledName)
            _IDBManager.AddParameters(1, "@PageNo", page)
            _IDBManager.AddParameters(2, "@PageSize", rows)
            _IDBManager.AddParameters(3, "@DataAndColumnInfo", True)
            _IDBManager.AddParameters(4, "@ColName", sidx)
            _IDBManager.AddParameters(5, "@Sort", sord)
            Dim loutput = _IDBManager.ExecuteDataSetWithSchema(System.Data.CommandType.StoredProcedure, "SP_RMS_GetTableData")
            _IDBManager.Dispose()
            dtRecords = loutput.Tables(0)

            If dtRecords Is Nothing Then
                Return Json(Languages.Translation("msgAdminCtrlNullValue"), JsonRequestBehavior.AllowGet)
            Else
                System.Threading.Thread.CurrentThread.CurrentCulture = New CultureInfo("en-US")
                dtRecords = DirectCast(dtRecords, DataTable)
                If (dtRecords.Columns.Contains("TotalCount")) Then
                    If (dtRecords.Rows.Count <> 0) Then
                        totalRecords = dtRecords(0)("TotalCount")
                    End If
                    dtRecords.Columns.Remove("TotalCount")

                End If
                If (dtRecords.Columns.Contains("ROWNUM")) Then
                    dtRecords.Columns.Remove("ROWNUM")
                End If
            End If

            Return Json(Common.ConvertDTToJQGridResult(dtRecords, totalRecords, sidx, sord, page, rows), JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function DeleteSelectedRows(tablename As String, rows As String, col As String) As ActionResult

            Dim RowID = New DataTable()
            Dim row() As String = rows.Split(",")
            RowID.Columns.Add("ID", GetType(String))
            RowID.Columns.Add("Col", GetType(String))
            Dim i As Integer = 0
            For Each value As String In row
                RowID.Rows.Add(row(i), col)
                i = i + 1
            Next
            'For value As String = row.First To row.Last
            '    RowID.Rows.Add(row(value))
            'Next

            Dim parameter = New SqlParameter("@ID", SqlDbType.Structured)
            parameter.Value = RowID
            parameter.TypeName = "dbo.RowID"

            Dim pTable = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(tablename.Trim().ToLower()) AndAlso Not String.IsNullOrEmpty(x.DBName.Trim().ToLower())).FirstOrDefault()

            Dim pDatabaseEntity = Nothing
            If Not pTable Is Nothing Then
                pDatabaseEntity = _iDatabas.Where(Function(x) x.DBName.Trim().ToLower().Equals(pTable.DBName.Trim().ToLower())).FirstOrDefault()
                _IDBManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)
            Else
                _IDBManager.ConnectionString = Keys.GetDBConnectionString
            End If

            _IDBManager.CreateParameters(3)
            _IDBManager.AddParameters(0, "@TableType", RowID)
            _IDBManager.AddParameters(1, "@TableName", tablename)
            _IDBManager.AddParameters(2, "@ColName", col)
            Dim loutput = _IDBManager.ExecuteNonQuery(System.Data.CommandType.StoredProcedure, "SP_RMS_DeleteDataRecords")
            _IDBManager.Dispose()

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)

        End Function

        <HttpPost, ValidateInput(False)>
        Public Function ProcessRequest() As String

            Dim forms As System.Collections.Specialized.NameValueCollection = HttpContext.Request.Form

            Dim data As String = forms.[Get]("x01")

            Dim tableName As String = forms.[Get]("x02")
            Dim colName As String = forms.[Get]("x03")
            Dim colType As String = forms.[Get]("x04")
            Dim columnName As String = forms.[Get]("x05")
            Dim pkValue As String = forms.[Get]("x07")
            Dim columnValue As String
            'Dim IDBManagar As DBManager


            Dim jsonObject = JsonConvert.DeserializeObject(data)
            Dim jsonType = JsonConvert.DeserializeObject(colType)
            Dim strOperation = jsonObject.GetValue("oper")
            If columnName.Trim().ToLower().Equals("id") Then
                If forms.[Get]("x06").Contains("<") Then
                    columnValue = jsonObject.GetValue(columnName).ToString()
                Else
                    columnValue = forms.[Get]("x06")
                End If

                'columnValue = jsonObject.GetValue(columnName).ToString()
            Else
                If forms.[Get]("x06").Equals("") Then
                    columnValue = Nothing
                Else
                    columnValue = forms.[Get]("x06")
                End If
                'columnValue = jsonObject.GetValue(columnName).ToString()
            End If

            Dim AddEditType = New DataTable()
            AddEditType.Columns.Add("Col_Name", GetType(String))
            AddEditType.Columns.Add("Col_Data", GetType(String))

            Dim cNames = colName.Split(",")

            Dim val As Object = ""

            For value As Integer = 0 To cNames.Length - 1
                Dim types = jsonType.GetValue(cNames(value))

                Dim type = Nothing
                Dim incremented As String = "true"
                Dim readOnlye As String = "false"

                If types <> Nothing Then
                    type = types.ToString().Split(",")(0)
                    incremented = types.ToString().Split(",")(1)
                    readOnlye = types.ToString().Split(",")(2)
                End If

                If readOnlye <> "true" Then
                    Select Case type
                        Case "String"
                            Dim str = jsonObject.GetValue(cNames(value)).ToString()
                            'Change on 09/08/2016 - Tejas
                            'If String.IsNullOrEmpty(str) Then

                            If str.IndexOf("'") > -1 Then
                                str = str.Replace("'", ControlChars.Quote)
                            End If

                            val = str

                        'Else
                        '    val = jsonObject.GetValue(cNames(value)).ToString
                        'End If
                        Case "Int32", "Int64", "Int16"
                            If cNames(value) <> columnName Then
                                Dim intr = jsonObject.GetValue(cNames(value)).ToString()
                                If String.IsNullOrEmpty(intr) Then
                                    val = jsonObject.GetValue(intr)
                                Else
                                    Dim round = Math.Round(Decimal.Parse(jsonObject.GetValue(cNames(value)).ToString))
                                    val = Integer.Parse(round.ToString)
                                End If
                            Else
                                If incremented.Equals("false") Then
                                    If (Not String.IsNullOrEmpty(jsonObject.GetValue(cNames(value)).ToString)) Then
                                        val = Integer.Parse(jsonObject.GetValue(cNames(value)).ToString)
                                    End If

                                End If
                            End If
                        Case "Double"
                            Dim str = jsonObject.GetValue(cNames(value)).ToString()
                            If String.IsNullOrEmpty(str) Then
                                val = jsonObject.GetValue(str)
                            Else
                                val = jsonObject.GetValue(cNames(value)).ToString
                            End If
                        Case "Decimal"
                            Dim str = jsonObject.GetValue(cNames(value)).ToString()
                            If String.IsNullOrEmpty(str) Then
                                val = jsonObject.GetValue(str)
                            Else
                                val = jsonObject.GetValue(cNames(value)).ToString
                            End If
                        Case "DateTime"
                            Dim dates = jsonObject.GetValue(cNames(value)).ToString()
                            If String.IsNullOrEmpty(dates) Then
                                val = jsonObject.GetValue(dates)
                            Else
                                If Date.TryParse(dates, New Date) Then
                                    If dates.IndexOf(":") > -1 Then
                                        val = Date.Parse(dates).ToString(CultureInfo.InvariantCulture)
                                        'val = Date.ParseExact(dates, "MM/dd/yyyy HH:mm", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy HH:mm")
                                    Else
                                        val = Date.Parse(dates).ToString("MM/dd/yyyy")
                                    End If
                                    'val = Date.ParseExact(jsonObject.GetValue(cNames(value)).ToString(), "dd-MM-yyyy HH:mm:ss", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy")
                                Else
                                    val = Date.ParseExact(dates, "MM/dd/yyyy HH:mm", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy HH:mm")
                                    'val = DateTime.Parse(dates)
                                    'val = Date.ParseExact(jsonObject.GetValue(cNames(value)).ToString(), "MM/dd/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy")
                                End If
                            End If
                        Case "Byte[]"
                            val = vbByte
                        Case "Boolean"
                            val = jsonObject.GetValue(cNames(value))
                        Case Else
                            val = jsonObject.GetValue(cNames(value))
                    End Select
                    If (type <> "Byte[]" And cNames(value) <> columnName And type <> Nothing) Then
                        If Not (strOperation.ToString.Equals("edit") And val Is Nothing) Then
                            AddEditType.Rows.Add(cNames(value), val)
                        End If
                    ElseIf (cNames(value).Equals(columnName) And incremented.Equals("false")) Then
                        AddEditType.Rows.Add(cNames(value), val)
                    End If
                End If
            Next

            Dim n As Integer

            Dim pTable = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(tableName.Trim().ToLower()) AndAlso Not String.IsNullOrEmpty(x.DBName.Trim().ToLower())).FirstOrDefault()

            Dim pDatabaseEntity = Nothing
            If Not pTable Is Nothing Then
                pDatabaseEntity = _iDatabas.Where(Function(x) x.DBName.Trim().ToLower().Equals(pTable.DBName.Trim().ToLower())).FirstOrDefault()
                _IDBManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)
            Else
                _IDBManager.ConnectionString = Keys.GetDBConnectionString
            End If
            If strOperation.ToString().Equals("add") Then
                n = 2
                _IDBManager.CreateParameters(n)
                _IDBManager.AddParameters(0, "@TableType", AddEditType)
                _IDBManager.AddParameters(1, "@TableName", tableName)
            Else
                n = 4
                _IDBManager.CreateParameters(n)
                _IDBManager.AddParameters(0, "@TableType", AddEditType)
                _IDBManager.AddParameters(1, "@TableName", tableName)
                _IDBManager.AddParameters(2, "@ColName", columnName)
                If pkValue Is Nothing Then
                    _IDBManager.AddParameters(3, "@ColVal", columnValue)
                Else
                    _IDBManager.AddParameters(3, "@ColVal", pkValue)
                End If

            End If
            Try
                If (strOperation.ToString().Equals("add")) Then
                    Dim loutput = _IDBManager.ExecuteNonQuery(System.Data.CommandType.StoredProcedure, "SP_RMS_AddDataRecords")
                    _IDBManager.Dispose()
                    Return Languages.Translation("RecordSavedSuccessfully")
                Else
                    Dim loutput = _IDBManager.ExecuteNonQuery(System.Data.CommandType.StoredProcedure, "SP_RMS_EditDataRecords")
                    _IDBManager.Dispose()
                    Return Languages.Translation("RecordUpdatedSuccessfully")
                End If
            Catch sql As SqlException
                _IDBManager.Dispose()
                Return String.Format(Languages.Translation("msgAdminCtrlCantInsertDupKeyInObjXDulKeyValIsX"), columnName, columnValue)
            Catch ex As Exception
                _IDBManager.Dispose()
                Return String.Format(Languages.Translation("msgAdminCtrlError"), ex.Message)
            End Try
        End Function

#End Region

#Region "Directories Module"
        Public Function LoadDirectoriesView() As PartialViewResult
            Return PartialView("_DirectoriesPartial")
        End Function

#Region "Drive Details"
        Public Function GetSystemAddressList(sidx As String, sord As String, page As Integer, rows As Integer) As JsonResult
            Dim pSystemAddressEntities = From t In _iSystemAddress.All()
                                         Select t.Id, t.DeviceName, t.PhysicalDriveLetter

            Dim jsonData = pSystemAddressEntities.GetJsonListForGrid(sord, page, rows, "DeviceName")
            Return Json(jsonData, JsonRequestBehavior.AllowGet)
        End Function

        Public Function LoadDriveView() As PartialViewResult
            Return PartialView("_AddDirectoriesPartial")
        End Function

        <HttpPost>
        Public Function SetSystemAddressDetails(pSystemAddress As SystemAddress) As ActionResult

            Try
                If IO.Directory.Exists(pSystemAddress.PhysicalDriveLetter) Then
                    If pSystemAddress.Id > 0 Then
                        If _iSystemAddress.All().Any(Function(x) x.DeviceName.Trim().ToLower() = pSystemAddress.DeviceName.Trim().ToLower() AndAlso x.Id <> pSystemAddress.Id) = False Then
                            pSystemAddress.PhysicalDriveLetter = pSystemAddress.PhysicalDriveLetter.ToUpper()
                            _iSystemAddress.Update(pSystemAddress)
                        Else
                            Keys.ErrorType = "w"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlDeviceIsAlreadyInUseL1"), pSystemAddress.DeviceName)
                            Exit Try
                        End If
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminDriveUpdateSuccess") 'Keys.SaveSuccessMessage()
                    Else
                        If _iSystemAddress.All().Any(Function(x) x.DeviceName.Trim().ToLower() = pSystemAddress.DeviceName.Trim().ToLower()) = False Then
                            pSystemAddress.PhysicalDriveLetter = pSystemAddress.PhysicalDriveLetter.ToUpper()
                            _iSystemAddress.Add(pSystemAddress)
                        Else
                            Keys.ErrorType = "w"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlDeviceIsAlreadyInUseL1"), pSystemAddress.DeviceName)
                            Exit Try
                        End If
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminDriveSaveSuccess") 'Keys.SaveSuccessMessage()
                    End If

                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlDriveNotExists"), pSystemAddress.PhysicalDriveLetter)
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

        Public Function EditSystemAddress(pRowSelected As Array) As ActionResult
            If pRowSelected Is Nothing Then
                Return Json(New With {Key .success = False})
            End If
            If pRowSelected.Length = 0 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pSystemAddressId = Convert.ToInt32(pRowSelected.GetValue(0))
            If pSystemAddressId = 0 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pSystemAddressEntity = _iSystemAddress.All().Where(Function(x) x.Id = pSystemAddressId).FirstOrDefault()

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pSystemAddressEntity, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function IsValidFilename(PhysicalDriveLetter As String) As JsonResult
            If PhysicalDriveLetter.Contains("hasu") Then
                Return Json(New With {Key .Data = False}, JsonRequestBehavior.AllowGet)
            End If
            Return Json(New With {Key .Data = True}, JsonRequestBehavior.AllowGet)
        End Function

        Public Function DeleteSystemAddress(pRowSelected As Array) As ActionResult
            If pRowSelected Is Nothing Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
            End If
            If pRowSelected.Length = 0 Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
            End If

            Dim iSystemAddressId As Integer
            Try
                Dim pSystemAddressId = pRowSelected.GetValue(0).ToString()
                If String.IsNullOrWhiteSpace(pSystemAddressId) Then
                    Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
                End If
                iSystemAddressId = CInt(pSystemAddressId)
                Dim oSystemAddressEntity = _iSystemAddress.All().Where(Function(x) x.Id = iSystemAddressId).FirstOrDefault()
                If Not (oSystemAddressEntity Is Nothing) Then
                    Dim oVolumns = _iVolume.All().Where(Function(x) x.SystemAddressesId = iSystemAddressId).FirstOrDefault()

                    If Not (oVolumns Is Nothing) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRowHasValAssigned")
                    Else
                        _iSystemAddress.Delete(oSystemAddressEntity)

                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminDriveDeleteSuccess")
                    End If
                Else
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlNoRecForDelete")
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
#End Region

#Region "Volumes Details"

        Public Function GetVolumesList(sidx As String, sord As String, page As Integer, rows As Integer, pId As String) As JsonResult

            Dim pVolumeEntities = From t In _iVolume.All()
                                  Select t.Id, t.Name, t.PathName, t.DirDiskMBLimitation, t.DirCountLimitation, t.Active, t.ImageTableName, t.SystemAddressesId

            If Not String.IsNullOrEmpty(pId) Then
                Dim intpId As Integer = Convert.ToInt32(pId)
                pVolumeEntities = pVolumeEntities.Where(Function(p) p.SystemAddressesId = intpId)
            End If

            Dim jsonData = pVolumeEntities.GetJsonListForGrid(sord, page, rows, "Name")

            Return Json(jsonData, JsonRequestBehavior.AllowGet)
        End Function

        Public Function LoadVolumeView() As PartialViewResult
            Return PartialView("_VolumesPartial")
        End Function

        <HttpPost>
        Public Function SetVolumeDetails(pVolume As Volume, pActive As Boolean) As ActionResult
            Try
                Dim BaseWebPage = New BaseWebPage()
                Dim oSecureObject = New Smead.Security.SecureObject(BaseWebPage.Passport)
                pVolume.Active = pActive
                pVolume.Active = pActive


                If pVolume.Id > 0 Then
                    Dim pVolumnEntity = _iVolume.All().Where(Function(x) x.Id = pVolume.Id).FirstOrDefault()
                    Dim oldVolumnName = pVolumnEntity.Name

                    If _iVolume.All().Any(Function(x) x.Name.Trim().ToLower() = pVolume.Name.Trim().ToLower() AndAlso x.Id <> pVolume.Id) = False Then
                        If pVolume.PathName.Substring(0, 1) <> "\" Then
                            pVolume.PathName = "\" + pVolume.PathName
                        End If
                        pVolumnEntity.Name = pVolume.Name
                        pVolumnEntity.PathName = pVolume.PathName
                        pVolumnEntity.DirDiskMBLimitation = pVolume.DirDiskMBLimitation
                        pVolumnEntity.DirCountLimitation = pVolume.DirCountLimitation
                        pVolumnEntity.Active = pVolume.Active
                        'pVolumnEntity.OfflineLocation = pVolume.OfflineLocation
                        pVolumnEntity.ImageTableName = pVolume.ImageTableName

                        If (StrComp(oldVolumnName, pVolume.Name, vbTextCompare) <> 0) Then
                            Dim oSecureObjectOld = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals(oldVolumnName.Trim().ToLower())).FirstOrDefault()
                            If Not oSecureObjectOld Is Nothing Then
                                oSecureObjectOld.Name = pVolume.Name
                            End If
                            _iSecureObject.Update(oSecureObjectOld)
                            'oSecureObject.Rename(oldVolumnName, Enums.SecureObjects.Volumes, pVolume.Name)
                        End If
                        _iVolume.Update(pVolumnEntity)
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminVolumeUpdate")
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlValumeAlreadyInUseL1"), pVolume.Name)
                        Exit Try
                    End If
                Else
                    If _iVolume.All().Any(Function(x) x.Name.Trim().ToLower() = pVolume.Name.Trim().ToLower()) = False Then
                        If pVolume.PathName.Substring(0, 1) <> "\" Then
                            pVolume.PathName = "\" + pVolume.PathName
                        End If

                        Dim lCounter As Integer
                        lCounter = oSecureObject.GetSecureObjectID(pVolume.Name, Enums.SecureObjects.Volumes)
                        If (lCounter = 0&) Then lCounter = oSecureObject.Register(pVolume.Name, Enums.SecureObjects.Volumes, Enums.SecureObjects.Volumes)
                        Dim oSecureObjectPermission = New SecureObjectPermission()
                        oSecureObjectPermission.GroupID = -1
                        oSecureObjectPermission.SecureObjectID = CStr(lCounter)
                        oSecureObjectPermission.PermissionID = 3
                        If _iSecureObjectPermission.All.Any(Function(x) x.GroupID = oSecureObjectPermission.GroupID And x.SecureObjectID = oSecureObjectPermission.SecureObjectID And x.PermissionID = oSecureObjectPermission.PermissionID) = False Then
                            _iSecureObjectPermission.Add(oSecureObjectPermission)
                        End If
                        _iVolume.Add(pVolume)
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminVolumeSave")
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlValumeAlreadyInUseL1"), pVolume.Name)
                        Exit Try
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

        Public Function EditVolumeDetails(pRowSelected As Array) As ActionResult
            If pRowSelected Is Nothing Then
                Return Json(New With {Key .success = False})
            End If
            If pRowSelected.Length = 0 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pVolumeId = Convert.ToInt32(pRowSelected.GetValue(0))
            If pVolumeId = 0 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pVolumeEntity = _iVolume.All().Where(Function(x) x.Id = pVolumeId).FirstOrDefault()

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pVolumeEntity, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function DeleteVolumesEntity(pRowSelected As Array) As ActionResult
            If pRowSelected Is Nothing Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
            End If
            If pRowSelected.Length = 0 Then
                Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
            End If
            Dim iVolumnId As Integer
            Try
                Dim pVolumnId = pRowSelected.GetValue(0).ToString()
                If String.IsNullOrWhiteSpace(pVolumnId) Then
                    Return Json(New With {Key .errortype = "e", Key .message = Languages.Translation("msgAdminCtrlNullValueFound")})
                End If
                iVolumnId = CInt(pVolumnId)

                Dim lOutputSettings = _iOutputSetting.All().Any()
                If _iOutputSetting.All().Any(Function(x) x.VolumesId = iVolumnId) = True Then
                    Return Json(New With {Key .errortype = "w", Key .message = Languages.Translation("msgAdminCtrlVolumeAlreadyUsedNotRemove")})
                End If

                Dim oVolumeEntity = _iVolume.All().Where(Function(x) x.Id = iVolumnId).FirstOrDefault()
                If Not (oVolumeEntity Is Nothing) Then
                    Dim oDirectory = _iDirectory.All().Where(Function(x) x.VolumesId = iVolumnId).FirstOrDefault()

                    Dim oImagePointers = Nothing
                    Dim oPCFilesPointer = Nothing
                    If Not oDirectory Is Nothing Then
                        oImagePointers = _iImagePointer.All().Where(Function(x) x.ScanDirectoriesId = oDirectory.Id).FirstOrDefault()
                        oPCFilesPointer = _iPCFilesPointer.All().Where(Function(x) x.ScanDirectoriesId = oDirectory.Id).FirstOrDefault()
                    End If

                    If Not (oImagePointers Is Nothing) Or Not (oPCFilesPointer Is Nothing) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRowHasAttachmentAssigned")
                    Else
                        _iVolume.Delete(oVolumeEntity)

                        'Added by Ganesh 06/01/2016 to fix bug #812.
                        _iSecureObject.BeginTransaction()
                        _iSecureObjectPermission.BeginTransaction()
                        Dim oSecureObjEntity = _iSecureObject.All().Where(Function(m) m.Name = oVolumeEntity.Name And m.SecureObjectTypeID = Enums.SecureObjectType.Volumes).FirstOrDefault()
                        Dim SecureObjectId = oSecureObjEntity.SecureObjectID
                        _iSecureObject.Delete(oSecureObjEntity)
                        _iSecureObject.CommitTransaction()

                        Dim oSecureObjPermissions = _iSecureObjectPermission.All().Where(Function(m) m.SecureObjectID = SecureObjectId)

                        _iSecureObjectPermission.DeleteRange(oSecureObjPermissions)
                        _iSecureObjectPermission.CommitTransaction()

                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminVolumeDelete")
                    End If
                Else
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlNoRecForDelete")
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

#End Region
#End Region

#Region "Table"
        Public Function LoadAccordianTable() As ActionResult
            Dim pTablesList As List(Of Table) = New List(Of Table)
            Dim BaseWebPage As New BaseWebPage

            Dim pTablesEntities = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower <> ("Operators").Trim.ToLower()).OrderBy(Function(m) m.TableName)
            Dim lAllTables = _ivwTablesAll.All().Select(Function(x) x.TABLE_NAME).ToList()
            pTablesEntities = pTablesEntities.Where(Function(x) lAllTables.Contains(x.TableName))

            For Each oTable In pTablesEntities
                If BaseWebPage.Passport.CheckPermission(oTable.TableName, Enums.SecureObjects.Table, Enums.PassportPermissions.Configure) Then
                    pTablesList.Add(oTable)
                End If
            Next

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pTablesList.OrderBy(Function(m) m.UserName), Newtonsoft.Json.Formatting.Indented, Setting)
            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            'Dim pTablesEntities = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower <> ("Operators").Trim.ToLower())
            'Dim Setting = New JsonSerializerSettings
            'Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            'Dim jsonObject = JsonConvert.SerializeObject(pTablesEntities, Newtonsoft.Json.Formatting.Indented, Setting)
            'Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function LoadTableTab() As PartialViewResult
            Return PartialView("_TableTabPartial")
        End Function

#Region "General"

        Public Function LoadGeneralTab() As PartialViewResult
            Return PartialView("_TableGeneralPartial")
        End Function

        <HttpPost, ValidateInput(False)>
        Public Function GetGeneralDetails(tableName As String) As ActionResult
            Try
                Dim pTableEntity = _iTable.All()
                Dim pSelectTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower())).FirstOrDefault()
                Dim DBUserName
                If (pSelectTable.DBName Is Nothing) Then
                    DBUserName = _iSystem.All.OrderBy(Function(m) m.Id).FirstOrDefault.UserName
                Else
                    DBUserName = pSelectTable.DBName
                End If
                Dim sAdoConn As ADODB.Connection = DataServices.DBOpen()
                Dim dbObj As Databas = Nothing
                Dim auditFlag As Boolean
                Dim cursorFlag As Boolean
                Dim displayFieldList As New List(Of KeyValuePair(Of String, String))
                Dim DatabaseName = Nothing
                Dim loutput As DataSet = Nothing
                Dim schemaColumnList As New List(Of SchemaColumns)

                'Get ADO connection name
                If (Not pSelectTable Is Nothing) Then
                    If (Not (String.IsNullOrEmpty(pSelectTable.DBName))) Then
                        dbObj = _iDatabas.All.Where(Function(m) m.DBName.Trim.ToLower.Equals(pSelectTable.DBName.Trim.ToLower)).FirstOrDefault()
                        If (dbObj Is Nothing) Then
                            Keys.ErrorType = "e"
                            Keys.ErrorMessage = Languages.Translation("msgAdminCtrlSomethingWrongInExtDBConf")
                            Return Json(New With {
                                        Key .errortype = Keys.ErrorType,
                                        Key .message = Keys.ErrorMessage
                                        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
                        End If
                        sAdoConn = DataServices.DBOpen(pSelectTable, _iDatabas.All())
                    End If
                End If

                'Load Display Field Select List
                schemaColumnList = SchemaInfoDetails.GetSchemaInfo(pSelectTable.TableName, sAdoConn)
                If (Not (schemaColumnList Is Nothing)) Then
                    'Dim bAddColumn As Boolean = False
                    For Each colObject As SchemaColumns In schemaColumnList
                        Dim bAddColumn As Boolean = False
                        If (Not SchemaInfoDetails.IsSystemField(colObject.ColumnName)) Then
                            If (Not String.IsNullOrWhiteSpace(pSelectTable.RetentionFieldName)) Then
                                If (DatabaseMap.RemoveTableNameFromField(pSelectTable.RetentionFieldName.Trim.ToLower.Equals(colObject.ColumnName.Trim.ToLower))) Then
                                    bAddColumn = True
                                Else
                                    bAddColumn = True
                                End If
                            Else
                                bAddColumn = True
                            End If
                            If (bAddColumn) Then
                                Dim bIsMemoCol = (colObject.IsString) And ((colObject.CharacterMaxLength <= 0) Or (colObject.CharacterMaxLength > 8000))
                                If (Not bIsMemoCol) Then
                                    displayFieldList.Add(New KeyValuePair(Of String, String)(colObject.ColumnName, colObject.ColumnName))
                                End If
                            End If
                        End If
                    Next
                End If

                'Get Current URI and icon name
                Dim ServerPath As String = HttpContext.Request.UrlReferrer.AbsoluteUri
                ServerPath = Url.Content("~/Images/icons/") 'ServerPath + "Images/icons/"
                _IDBManager.ConnectionString = Keys.GetDBConnectionString(dbObj)

                If (Not String.IsNullOrWhiteSpace(pSelectTable.IdFieldName)) Then
                    Dim strqry = "SELECT [" + DatabaseMap.RemoveTableNameFromField(pSelectTable.IdFieldName.Trim.ToLower) + "] FROM [" + pSelectTable.TableName + "] Where 0=1;"
                    loutput = _IDBManager.ExecuteDataSetWithSchema(System.Data.CommandType.Text, strqry)
                    _IDBManager.Dispose()
                End If
                If (Not (loutput Is Nothing)) Then
                    Dim IdentityVal = loutput.Tables(0).Columns(0).AutoIncrement
                    If (IdentityVal) Then
                        cursorFlag = True
                    Else
                        cursorFlag = False
                    End If
                End If

                'Check whether selected table has any child table or not
                Dim relationObject = _iRelationShip.All.Where(Function(m) m.UpperTableName.Trim.ToLower.Equals(pSelectTable.TableName.Trim.ToLower))
                If (Not (relationObject Is Nothing)) Then
                    If (relationObject.Count <= 0) Then
                        auditFlag = False
                    Else
                        auditFlag = True
                    End If
                End If

                Dim UserTableIcon As String = Convert.ToString(_iSystem.All().FirstOrDefault().UseTableIcons)

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim cursorFlagJSON = JsonConvert.SerializeObject(cursorFlag, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim auditflagJSON = JsonConvert.SerializeObject(auditFlag, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim pSelectTableJSON = JsonConvert.SerializeObject(pSelectTable, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim displayFieldListJSON = JsonConvert.SerializeObject(displayFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim ServerPathJSON = JsonConvert.SerializeObject(ServerPath, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim DBUserNameJSON = JsonConvert.SerializeObject(DBUserName, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim UserTableIconJSON = JsonConvert.SerializeObject(UserTableIcon.ToLower(), Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlAllDataGetSuccessfully")
                Return Json(New With {
                            Key .cursorFlagJSON = cursorFlagJSON,
                            Key .auditflagJSON = auditflagJSON,
                            Key .pSelectTableJSON = pSelectTableJSON,
                            Key .displayFieldListJSON = displayFieldListJSON,
                            Key .ServerPathJSON = ServerPathJSON,
                                Key .UserTableIconJSON = UserTableIconJSON,
                                Key .DBUserNameJSON = DBUserNameJSON,
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage
                            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage
                            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try
        End Function

        <HttpPost, ValidateInput(False)>
        Public Function LoadIconWindow(TableName As String) As ActionResult
            Try
                Dim IconList As New List(Of KeyValuePair(Of String, String))
                Dim FileName As String = HttpContext.Request.UrlReferrer.AbsoluteUri
                FileName = Url.Content("~/Images/icons") 'FileName + "Images/icons"
                Dim LocalPath = Server.MapPath("~")
                LocalPath = LocalPath + "\Images\icons"

                Dim FileDirectory As New IO.DirectoryInfo(LocalPath)
                Dim FileIco As IO.FileInfo() = FileDirectory.GetFiles("*.ICO")
                Dim FileJpg As IO.FileInfo() = FileDirectory.GetFiles("*.jpg")
                Dim FileGif As IO.FileInfo() = FileDirectory.GetFiles("*.gif")
                Dim FileBmp As IO.FileInfo() = FileDirectory.GetFiles("*.bmp")
                For Each File As IO.FileInfo In FileIco
                    IconList.Add(New KeyValuePair(Of String, String)(FileName + "/" + File.Name, File.Name))
                Next
                For Each File As IO.FileInfo In FileJpg
                    IconList.Add(New KeyValuePair(Of String, String)(FileName + "/" + File.Name, File.Name))
                Next
                For Each File As IO.FileInfo In FileGif
                    IconList.Add(New KeyValuePair(Of String, String)(FileName + "/" + File.Name, File.Name))
                Next
                For Each File As IO.FileInfo In FileBmp
                    IconList.Add(New KeyValuePair(Of String, String)(FileName + "/" + File.Name, File.Name))
                Next
                Dim oTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(TableName.Trim.ToLower())).FirstOrDefault()
                Dim PictureName = oTable.Picture
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim IconListJSON = JsonConvert.SerializeObject(IconList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim PictureNameJSON = JsonConvert.SerializeObject(PictureName, Newtonsoft.Json.Formatting.Indented, Setting)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlTableLoadSuccessfully")
                Return Json(New With {
                            Key .IconListJSON = IconListJSON,
                            Key .PictureNameJSON = PictureNameJSON,
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage
                            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessage
                Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage
                            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

            End Try
        End Function

        Public Function SetGeneralDetails(tableForm As Table, Attachments As Boolean, miOfficialRecord As Integer) As ActionResult
            Dim warnMsgJSON As String = "'"
            Try
                Dim tableObj = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableForm.TableName.Trim.ToLower)).FirstOrDefault()
                Dim tableEntity = _iTable.All.OrderBy(Function(m) m.SearchOrder)
                Dim LimitVar As Integer = tableForm.SearchOrder
                Dim SearchOrderList As New List(Of Table)
                Dim flagSecure As Boolean = False
                Dim SecureAnnotation = _iSecureObject.All.Where(Function(m) m.Name.Trim.ToLower.Equals(tableForm.TableName.Trim.ToLower) And m.SecureObjectTypeID.Equals(Enums.SecureObjects.Annotations)).FirstOrDefault
                Dim SecureAttachment = _iSecureObject.All.Where(Function(m) m.Name.Trim.ToLower.Equals(tableForm.TableName.Trim.ToLower) And m.SecureObjectTypeID.Equals(Enums.SecureObjects.Attachments)).FirstOrDefault
                If (tableForm.Attachments = True) Then
                    If (SecureAnnotation Is Nothing) Then
                        flagSecure = RegisterSecureObject(tableForm.TableName, Enums.SecureObjects.Annotations)
                        'Added by Ganesh for Security Fix
                        RegisterSecureObject(tableForm.TableName, Enums.SecureObjects.Attachments)
                    End If
                Else
                    If (Not (SecureAnnotation Is Nothing)) Then
                        flagSecure = UnRegisterSecureObject(SecureAnnotation)
                        'Added by Ganesh for Security Fix
                        UnRegisterSecureObject(SecureAttachment)
                    End If
                End If

                UpdateOfficialRecord(miOfficialRecord, tableObj.TableName)
                tableObj.Picture = tableForm.Picture
                tableObj.BarCodePrefix = tableForm.BarCodePrefix
                tableObj.IdStripChars = tableForm.IdStripChars
                tableObj.IdMask = tableForm.IdMask
                tableObj.DescFieldPrefixOne = tableForm.DescFieldPrefixOne
                tableObj.DescFieldPrefixTwo = tableForm.DescFieldPrefixTwo
                tableObj.DescFieldNameOne = tableForm.DescFieldNameOne
                tableObj.DescFieldNameTwo = tableForm.DescFieldNameTwo
                If (tableForm.DescFieldPrefixOneWidth Is Nothing) Then
                    tableObj.DescFieldPrefixOneWidth = 0
                Else
                    tableObj.DescFieldPrefixOneWidth = tableForm.DescFieldPrefixOneWidth
                End If
                If (tableForm.DescFieldPrefixTwoWidth Is Nothing) Then
                    tableObj.DescFieldPrefixTwoWidth = 0
                Else
                    tableObj.DescFieldPrefixTwoWidth = tableForm.DescFieldPrefixTwoWidth
                End If
                tableObj.Attachments = Attachments
                tableObj.OfficialRecordHandling = tableForm.OfficialRecordHandling
                tableObj.CanAttachToNewRow = tableForm.CanAttachToNewRow
                tableObj.AuditAttachments = tableForm.AuditAttachments
                tableObj.AuditConfidentialData = tableForm.AuditConfidentialData
                tableObj.AuditUpdate = tableForm.AuditUpdate
                If (tableForm.MaxRecsOnDropDown Is Nothing) Then
                    tableObj.MaxRecsOnDropDown = 0
                Else
                    tableObj.MaxRecsOnDropDown = tableForm.MaxRecsOnDropDown
                End If
                If (tableForm.ADOQueryTimeout Is Nothing) Then
                    tableObj.ADOQueryTimeout = 0
                Else
                    tableObj.ADOQueryTimeout = tableForm.ADOQueryTimeout
                End If
                If (tableForm.ADOCacheSize Is Nothing) Then
                    tableObj.ADOCacheSize = 0
                Else
                    tableObj.ADOCacheSize = tableForm.ADOCacheSize
                End If
                tableObj.ADOServerCursor = tableForm.ADOServerCursor


                If (LimitVar <> 0 And tableObj.SearchOrder <> tableForm.SearchOrder) Then

                    For Each tb As Table In tableEntity.Where(Function(m) m.SearchOrder <= LimitVar)
                        If (Not tb.SearchOrder Is Nothing) Then
                            If ((tb.SearchOrder <= LimitVar) And (Not tableObj.TableName.Trim.ToLower.Equals(tb.TableName.Trim.ToLower))) Then
                                SearchOrderList.Add(tb)
                            End If
                        Else
                            SearchOrderList.Add(tb)
                        End If
                    Next

                    If (tableObj.SearchOrder < LimitVar) Then
                        SearchOrderList.Add(tableObj)
                    Else
                        Dim LastObject = SearchOrderList.Last()
                        SearchOrderList.RemoveAt(SearchOrderList.Count - 1)
                        SearchOrderList.Add(tableObj)
                        SearchOrderList.Add(LastObject)
                    End If
                    For Each tb As Table In tableEntity.Where(Function(m) m.SearchOrder > LimitVar)
                        If (Not tb.SearchOrder Is Nothing) Then
                            If ((tb.SearchOrder > LimitVar) And (Not tableObj.TableName.Trim.ToLower.Equals(tb.TableName.Trim.ToLower))) Then
                                SearchOrderList.Add(tb)
                            End If
                        End If
                    Next

                    Dim iLevel As Integer = 1

                    For Each tb As Table In SearchOrderList
                        tb.SearchOrder = iLevel
                        iLevel = iLevel + 1
                    Next

                    For Each tb As Table In SearchOrderList
                        _iTable.Update(tb)
                    Next

                Else
                    _iTable.Update(tableObj)
                End If
                warnMsgJSON = VerifyRetentionDispositionTypesForParentAndChildren(tableObj.TableId)
                Dim searchValue = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableForm.TableName.Trim.ToLower)).FirstOrDefault().SearchOrder
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim searchValueJSON = JsonConvert.SerializeObject(searchValue, Newtonsoft.Json.Formatting.Indented, Setting)

                'Reload the permissions dataset after updation of permissions.
                CollectionsClass.ReloadPermissionDataSet()

                Keys.ErrorType = "s"
                'Modified By Hemin For bug fix on 11-07-2016
                'Keys.ErrorMessage = Languages.Translation("RecordUpdatedSuccessfully")
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRecordUpdatedSuccessfully")

                'Reload the permissions dataset after updation of permissions. [Fix for FUS-5398]
                'CollectionsClass.ReloadPermissionDataSet()

                Return Json(New With {
                        Key .searchValueJSON = searchValueJSON,
                        Key .warnMsgJSON = warnMsgJSON,
                        Key .errortype = Keys.ErrorType,
                        Key .message = Keys.ErrorMessage
                        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Return Json(New With {
                        Key .errortype = Keys.ErrorType,
                        Key .message = Keys.ErrorMessage
                        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try
        End Function

        Public Function SetSearchOrder() As ActionResult
            Try
                Dim sADOConnDefault = DataServices.DBOpen()
                Dim searchOrderList As New List(Of KeyValuePair(Of Integer, String))
                Dim searchRecords = DataServices.GetADORecordSet("SELECT DISTINCT t.TableName, t.UserName, t.SearchOrder, s.IndexTableName FROM [Tables] t LEFT OUTER JOIN SLTextSearchItems s ON s.IndexTableName = t.TableName ORDER BY t.SearchOrder", sADOConnDefault)
                If (Not (searchRecords Is Nothing)) Then
                    Do Until searchRecords.EOF
                        Dim sSql = "[] "
                        Dim textValue = searchRecords.Fields(3).Value

                        If ((searchRecords.Fields(3).Value.ToString.Trim.Equals(""))) Then
                            sSql = "[not part of Full Text Index]"
                        Else
                            sSql = " "
                        End If
                        Dim tableStr = "(" & searchRecords.Fields(2).Value & ")" & "    " & searchRecords.Fields(1).Value & "   " & sSql
                        If (IsDBNull(searchRecords.Fields(2).Value)) Then
                            searchOrderList.Add(New KeyValuePair(Of Integer, String)(0, tableStr))
                        Else
                            searchOrderList.Add(New KeyValuePair(Of Integer, String)(searchRecords.Fields(2).Value, tableStr))
                        End If
                        searchRecords.MoveNext()
                    Loop
                End If
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim searchOrderListJSON = JsonConvert.SerializeObject(searchOrderList, Newtonsoft.Json.Formatting.Indented, Setting)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlAllDataGetSuccessfully")
                Return Json(New With {
                    Key .searchOrderListJSON = searchOrderListJSON,
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Return Json(New With {
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try
        End Function

        Public Function OfficialRecordWarning(recordStatus As Boolean, tableName As String) As ActionResult
            Try
                Dim tableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower)).FirstOrDefault
                Dim sADOConnDefault = DataServices.DBOpen()
                Dim rs = DataServices.GetADORecordSet("SELECT TOP 1 * FROM [UserLinks] WHERE [IndexTable] ='" + tableName + "'", sADOConnDefault)
                If (recordStatus = True) Then
                    If (tableEntity.OfficialRecordHandling = False) Then
                        If (rs.RecordCount > 0) Then
                            Keys.ErrorType = "w"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlWouldULikeToSetOffcialRecL2"), tableName, "\n\n")
                            Exit Try
                        End If
                    End If
                Else
                    If (tableEntity.OfficialRecordHandling = True) Then
                        If (rs.RecordCount > 0) Then
                            Keys.ErrorType = "w"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlWouldULikeToRemoveOffcialRec"), tableName, "\n\n")
                            Exit Try
                        End If
                    End If
                End If
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlYouHaveNoRecord")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
            End Try
            Return Json(New With {
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function UpdateOfficialRecord(miOfficialRecord As Integer, tableName As String) As Boolean
            Try
                Dim sADOConnDefault = DataServices.DBOpen()
                Dim miOfficialRecordConversion As Enums.geOfficialRecordConversonType = Enums.geOfficialRecordConversonType.orcNoConversion
                Select Case miOfficialRecord
                    Case 0
                        miOfficialRecordConversion = Enums.geOfficialRecordConversonType.orcNoConversion
                    Case 1
                        miOfficialRecordConversion = Enums.geOfficialRecordConversonType.orcFirstVersionConversion
                    Case 2
                        miOfficialRecordConversion = Enums.geOfficialRecordConversonType.orcLastVersionConversion
                    Case 4
                        miOfficialRecordConversion = Enums.geOfficialRecordConversonType.orcConversionToNothing
                    Case Else
                        miOfficialRecordConversion = Enums.geOfficialRecordConversonType.orcNoConversion
                End Select
                If (miOfficialRecordConversion <> Enums.geOfficialRecordConversonType.orcNoConversion) Then
                    Dim sSQL As String = Nothing
                    If (miOfficialRecordConversion = Enums.geOfficialRecordConversonType.orcFirstVersionConversion) Then
                        sSQL = "UPDATE [Trackables] SET [OfficialRecord] = 1 FROM [Trackables] INNER JOIN [UserLinks] ON ([UserLinks].[TrackablesId] = [Trackables].[Id]) WHERE [UserLinks].[IndexTable] ='" + tableName + "' AND [Trackables].[RecordVersion] = 1"
                        DataServices.ProcessADOCommand(sSQL, sADOConnDefault, False)
                    ElseIf (miOfficialRecordConversion = Enums.geOfficialRecordConversonType.orcLastVersionConversion) Then
                        sSQL = " UPDATE [Trackables] SET [OfficialRecord] = 1 FROM [Trackables] a INNER JOIN (SELECT [id], MAX([RecordVersion]) AS MaxVersion FROM [Trackables] GROUP BY [Id]) b ON (a.Id = b.Id AND a.RecordVersion = b.MaxVersion) INNER JOIN [Userlinks] ON ([Userlinks].[TrackablesId] = [a].[Id]) WHERE [Userlinks].[IndexTable] ='" + tableName + "'"
                        DataServices.ProcessADOCommand(sSQL, sADOConnDefault, False)
                    ElseIf (miOfficialRecordConversion = Enums.geOfficialRecordConversonType.orcConversionToNothing) Then
                        sSQL = " UPDATE [Trackables] SET [OfficialRecord] = 0 FROM [Trackables] a INNER JOIN (SELECT [id], MAX([RecordVersion]) AS MaxVersion FROM [Trackables] GROUP BY [Id]) b ON (a.Id = b.Id AND a.RecordVersion = b.MaxVersion) INNER JOIN [Userlinks] ON ([Userlinks].[TrackablesId] = [a].[Id]) WHERE [Userlinks].[IndexTable] ='" + tableName + "'"
                        DataServices.ProcessADOCommand(sSQL, sADOConnDefault, False)
                    End If
                End If
                Return True
            Catch ex As Exception
                Return False
            End Try
        End Function

        Public Function RegisterSecureObject(tableName As String, secureObjTypeId As Enums.SecureObjects) As Integer
            Try
                Dim secureObjEntity As New Models.SecureObject
                Dim returnSecureObjId = 0
                If (Not (tableName Is Nothing)) Then
                    Dim baseId = _iSecureObject.All.Where(Function(m) m.SecureObjectTypeID.Equals(Enums.SecureObjects.Table) And m.Name.Trim.ToLower.Equals(tableName.Trim.ToLower)).FirstOrDefault
                    If (Not (baseId Is Nothing)) Then
                        secureObjEntity.Name = tableName
                        secureObjEntity.SecureObjectTypeID = secureObjTypeId
                        secureObjEntity.BaseID = baseId.SecureObjectID
                        _iSecureObject.Add(secureObjEntity)
                        returnSecureObjId = _iSecureObject.All.Where(Function(m) m.SecureObjectTypeID.Equals(secureObjTypeId) And m.Name.Trim.ToLower.Equals(tableName.Trim.ToLower)).FirstOrDefault.SecureObjectID
                        'Need to take care for first insertion of permissions by default. - Added by Ganesh
                        AddSecureObjectPermissionsBySecureObjectType(returnSecureObjId, secureObjTypeId, secureObjTypeId)
                    End If
                End If
                Return returnSecureObjId
            Catch ex As Exception
                Return 0
            End Try
        End Function

        Public Function UnRegisterSecureObject(secureObjId As Models.SecureObject) As Boolean
            Try
                If (Not (secureObjId Is Nothing)) Then
                    _iSecureObject.Delete(secureObjId)
                    'Remove permissions against registered secure object. - Added by Ganesh.
                    Dim secureObjPermissions = _iSecureObjectPermission.All().Where(Function(x) x.SecureObjectID = secureObjId.SecureObjectID)
                    _iSecureObjectPermission.DeleteRange(secureObjPermissions)
                End If
                Return True
            Catch ex As Exception
                Return False
            End Try
        End Function

        ''Add new permission in secure permission table
        Private Sub AddNewSecureObjectPermission(secureObjectId As Integer, securePermissionId As Integer)
            Dim secoreObjPermissionObj As New SecureObjectPermission
            secoreObjPermissionObj.GroupID = 0
            secoreObjPermissionObj.SecureObjectID = secureObjectId
            secoreObjPermissionObj.PermissionID = securePermissionId
            _iSecureObjectPermission.Add(secoreObjPermissionObj)
            If securePermissionId = 8 Or securePermissionId = 9 Then
                UpdateTablesTrackingObject("A", secureObjectId, securePermissionId)
            End If
        End Sub

        ''Keep sync Tables -> Tracking tab (Tracking Object and Allow Requiresting checkboxs) and Security Securables tab
        ''Removed permission updates in Tables table
        Private Sub UpdateTablesTrackingObject(action As String, secureObjectId As Integer, securePermissionId As Integer)
            Dim SecureObject As Models.SecureObject = _iSecureObject.All().Where(Function(m) m.SecureObjectID = secureObjectId).FirstOrDefault()
            If Not SecureObject Is Nothing Then
                Dim Tables As Models.Table = _iTable.Where(Function(m) m.TableName.Trim().ToLower().Equals(SecureObject.Name.Trim().ToLower())).FirstOrDefault()
                If Not Tables Is Nothing Then
                    If securePermissionId = 8 Then
                        Tables.Trackable = IIf(action = "A", True, False)
                    End If
                    If securePermissionId = 9 Then
                        Tables.AllowBatchRequesting = IIf(action = "A", True, False)
                    End If
                    _iTable.Update(Tables)
                End If
            End If
        End Sub

        ''Add Tracking object permission into security tables 
        Private Function AddSecureObjectPermission(secureObjId As Integer, SecurePermissionId As Enums.PassportPermissions) As Boolean
            Try
                If Not _iSecureObjectPermission.All().Any(Function(x) x.GroupID = 0 AndAlso x.SecureObjectID = secureObjId And x.PermissionID = SecurePermissionId) Then
                    AddNewSecureObjectPermission(secureObjId, SecurePermissionId)
                End If
                Return True
            Catch ex As Exception
                Return False
            End Try
        End Function

        Public Function RemoveSecureObjectPermission(secureObjPermission As SecureObjectPermission) As Boolean
            Try
                If (Not (secureObjPermission Is Nothing)) Then
                    _iSecureObjectPermission.Delete(secureObjPermission)
                End If
                Return True
            Catch ex As Exception
                Return False
            End Try
        End Function

        Public Function GetSecureObjPermissionId(secureObjId As Integer, SecurePermissionId As Enums.PassportPermissions) As SecureObjectPermission
            Try
                Dim secoreObjPermissionObj = _iSecureObjectPermission.All.Where(Function(m) m.SecureObjectID = secureObjId And m.PermissionID = SecurePermissionId).FirstOrDefault
                Return secoreObjPermissionObj
            Catch ex As Exception
                Throw 'ex
            End Try
        End Function
#End Region

#Region "Fields"
        Public Function LoadFieldsTab() As PartialViewResult
            Return PartialView("_TableFields")
        End Function

        'Create and Edit new field for Table.
        Public Function AddEditField(pOperationName As String, pTableName As String, pNewInternalName As String, pOriginalInternalName As String, pFieldType As String, pOriginalFieldType As String, pFieldSize As String, pOriginalFieldSize As String) As ActionResult

            Dim sSQLStr As String
            'Dim sTempSQL As String
            Dim iFieldMaxSize As Integer
            Dim ErrMsg As String = ""
            Dim isError As Boolean = False
            Dim bFieldCreated As Boolean
            Dim bFieldUpdate As Boolean
            Dim sADOConn As ADODB.Connection
            Dim FieldName As String
            Dim iFieldSize As Integer

            Try
                FieldName = pNewInternalName.Trim()

                If (StrComp(pFieldSize, Common.FT_MEMO_SIZE, vbTextCompare) = 0) Then
                    iFieldSize = 0
                Else
                    iFieldSize = CInt("0" & pFieldSize)
                End If

                If (FieldName = "") Then
                    ErrMsg = Languages.Translation("msgJsTableFieldIntNameReq")
                    isError = True
                End If

                If (InStr("_0123456789%", Left$(FieldName, 1)) > 0) And isError = False Then
                    ErrMsg = Languages.Translation("msgAdminCtrlInternalNotBeginWith")
                    isError = True
                End If

                If ((StrComp(FieldName, "SLFileRoomOrder", vbBinaryCompare) = 0) Or (StrComp(FieldName, "SLTrackedDestination", vbTextCompare) = 0)) And isError = False Then
                    ErrMsg = Languages.Translation("msgAdminCtrlInternalNotBe")
                    isError = True
                End If

                If (pFieldType = Enums.meTableFieldTypes.ftText) Then
                    iFieldMaxSize = 8000

                    If ((iFieldSize < 0) Or (iFieldSize > iFieldMaxSize)) And isError = False Then
                        ErrMsg = Languages.Translation("msgAdminCtrlFieldSizeBtw1ToMaxSize")
                        isError = True
                    End If
                End If

                Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableName.Trim().ToLower())).FirstOrDefault()
                sADOConn = DataServices.DBOpen(oTables, _iDatabas.All())

                Dim dbRecordSet As List(Of SchemaColumns) = SchemaInfoDetails.GetTableSchemaInfo(pTableName, sADOConn)

                'Added on 21/12/2015 to fix Bug #703.
                If pNewInternalName.ToLower() <> pOriginalInternalName.ToLower() And ErrMsg = "" And pOperationName = "EDIT" Then
                    If (dbRecordSet.Exists(Function(x) x.ColumnName.ToLower().Equals(pNewInternalName.ToLower()))) Then
                        ErrMsg = Languages.Translation("msgAdminCtrlInternalNameAlreadyExists")
                        isError = True
                    End If
                End If
                If (dbRecordSet.Exists(Function(x) x.ColumnName.ToLower().Equals(pNewInternalName.ToLower())) And ErrMsg = "" And pOperationName = "ADD") Then
                    ErrMsg = Languages.Translation("msgAdminCtrlInternalNameAlreadyExists")
                    isError = True
                End If

                If isError = False And pOperationName = "ADD" Then
                    'create the new field
                    sSQLStr = "ALTER TABLE [" & pTableName & "]"

                    sSQLStr = sSQLStr & " ADD [" & pNewInternalName & "] "

                    Select Case pFieldType
                        Case Enums.meTableFieldTypes.ftLong, Enums.meTableFieldTypes.ftSmeadCounter
                            sSQLStr = sSQLStr & "INT NULL"
                        Case Enums.meTableFieldTypes.ftCounter
                            sSQLStr = sSQLStr & "INT IDENTITY(1,1) NOT NULL"
                        Case Enums.meTableFieldTypes.ftText
                            sSQLStr = sSQLStr & "VARCHAR(" & iFieldSize & ") NULL"
                        Case Enums.meTableFieldTypes.ftInteger
                            sSQLStr = sSQLStr & "SMALLINT NULL"
                        Case Enums.meTableFieldTypes.ftBoolean
                            sSQLStr = sSQLStr & "BIT NULL"
                            sSQLStr = sSQLStr & " CONSTRAINT DF_" & pTableName & "_" & pNewInternalName & " DEFAULT (0) WITH VALUES"
                            'If (Not bTemporary) Then sSQLStr = sSQLStr & " DEFAULT 0"
                        Case Enums.meTableFieldTypes.ftDouble
                            sSQLStr = sSQLStr & "FLOAT NULL"
                        Case Enums.meTableFieldTypes.ftDate
                            sSQLStr = sSQLStr & "DATETIME NULL"
                        Case Enums.meTableFieldTypes.ftMemo
                            sSQLStr = sSQLStr & "TEXT NULL"
                        Case Else
                    End Select

                    bFieldCreated = DataServices.ProcessADOCommand(sSQLStr, sADOConn, False)

                    If (bFieldCreated) Then
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminCtrlFieldCreatedSuccessfully")
                        DeleteSQLViewWithNoViewColumnExists(pTableName)
                    Else
                        Keys.ErrorType = "e"
                        Keys.ErrorMessage = Languages.Translation("msgAdminCtrlIssuesWithCreatingNewField")
                    End If
                ElseIf isError = False And pOperationName = "EDIT" Then

                    'If (dbRecordSet.Exists(Function(x) x.ColumnName = pNewInternalName)) And ErrMsg = "" Then
                    '    ErrMsg = "Internal Name Already Exists."
                    '    isError = True
                    'Else
                    bFieldUpdate = UpdateNewField(pNewInternalName, pOriginalInternalName, pTableName, pOriginalFieldType, iFieldSize, pFieldType)
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlFieldUpdatedSuccessfully")
                    'End If
                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = ErrMsg
                End If

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {Key .errortype = Keys.ErrorType,
                                  Key .message = Keys.ErrorMessage
                                      }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function CheckBeforeUpdate(pFieldName As String, pNewFieldSize As Integer, pNewFieldType As Integer, pOrigFieldSize As Integer, pOrigFieldType As Integer) As JsonResult
            Dim sMessage As String = ""

            If ((pNewFieldType <> Enums.meTableFieldTypes.ftMemo) And ((pOrigFieldSize > pNewFieldSize) Or (pOrigFieldType <> pNewFieldType))) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlChangeTheTypeL1"), pFieldName, vbNewLine)
            End If

            Return Json(New With {
                                  Key .sMessage = sMessage
                                }, JsonRequestBehavior.AllowGet)
        End Function

        Private Function UpdateNewField(ByVal sNewFieldName As String, ByVal sOldFieldName As String, ByVal sTableName As String, ByVal eFieldType As Enums.meTableFieldTypes, iFieldSize As Integer, iNewFieldType As Integer) As Boolean
            Dim sSQLStr As String
            'Dim sModifyColSQLStr As String
            'Dim lStatus As Long
            Dim sFieldType As String = ""
            Dim eStrFieldType As String = ""
            Dim FieldType As String = ""
            Dim sADOConn As ADODB.Connection
            Dim bFieldUpdate As Boolean = False
            Dim lError As Integer = 0
            Dim sErrorMsg As String = ""
            Dim sSQLAddToTEMP As String = ""
            Dim sSQLCopyToTEMP As String = ""
            Dim sSQLDropOriginal As String = ""
            Dim sSQLCreateNew As String = ""
            Dim sSQLAddToNew As String = ""
            Dim sSQLDropTEMP As String = ""

            'Dim sADOConn = DataServices.DBOpen(Enums.eConnectionType.conDefault, Nothing)
            Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(sTableName.Trim().ToLower())).FirstOrDefault()
            sADOConn = DataServices.DBOpen(oTables, _iDatabas.All())

            Select Case iNewFieldType
                Case Enums.meTableFieldTypes.ftLong, Enums.meTableFieldTypes.ftSmeadCounter
                    sFieldType = "INT"
                Case Enums.meTableFieldTypes.ftCounter
                    sFieldType = "INT"
                Case Enums.meTableFieldTypes.ftText
                    sFieldType = "VARCHAR(" & iFieldSize & ")"
                Case Enums.meTableFieldTypes.ftInteger
                    sFieldType = "SMALLINT"
                Case Enums.meTableFieldTypes.ftBoolean
                    sFieldType = "BIT"
                Case Enums.meTableFieldTypes.ftDouble
                    sFieldType = "FLOAT"
                Case Enums.meTableFieldTypes.ftDate
                    sFieldType = "DATETIME"
                Case Enums.meTableFieldTypes.ftMemo
                    sFieldType = "TEXT"
                Case Else
            End Select

            If sOldFieldName <> sNewFieldName Then
                sSQLStr = "EXEC SP_RENAME '" & sTableName & "." & sOldFieldName & "','" & sNewFieldName & "'," & "'COLUMN'"
                bFieldUpdate = DataServices.ProcessADOCommand(sSQLStr, sADOConn, False)

                If bFieldUpdate Then
                    sOldFieldName = sNewFieldName
                End If
            End If

            '            ALTER TABLE TableName ADD tmp text NULL
            '            GO()
            'UPDATE TableName SET tmp = ColumnName
            '            GO()
            'ALTER TABLE TableName DROP COLUMN ColumnName
            '            GO()
            'ALTER TABLE TableName ADD ColumnName ntext NULL
            '            GO()
            'UPDATE TableName SET ColumnName = tmp
            '            GO()
            'ALTER TABLE TableName DROP COLUMN tmp
            sSQLAddToTEMP = "ALTER TABLE [" & sTableName & "] " & "ADD TEMP___ "

            Select Case eFieldType
                Case Enums.meTableFieldTypes.ftLong, Enums.meTableFieldTypes.ftSmeadCounter
                    sSQLAddToTEMP = sSQLAddToTEMP & "INT NULL"
                Case Enums.meTableFieldTypes.ftCounter
                    sSQLAddToTEMP = sSQLAddToTEMP & "INT IDENTITY(1,1) NOT NULL"
                Case Enums.meTableFieldTypes.ftText
                    sSQLAddToTEMP = sSQLAddToTEMP & "VARCHAR(" & iFieldSize & ") NULL"
                Case Enums.meTableFieldTypes.ftInteger
                    sSQLAddToTEMP = sSQLAddToTEMP & "SMALLINT NULL"
                Case Enums.meTableFieldTypes.ftBoolean
                    sSQLAddToTEMP = sSQLAddToTEMP & "BIT NULL"
                Case Enums.meTableFieldTypes.ftDouble
                    sSQLAddToTEMP = sSQLAddToTEMP & "FLOAT NULL"
                Case Enums.meTableFieldTypes.ftDate
                    sSQLAddToTEMP = sSQLAddToTEMP & "DATETIME NULL"
                Case Enums.meTableFieldTypes.ftMemo
                    sSQLAddToTEMP = sSQLAddToTEMP & "TEXT NULL"
                Case Else
            End Select

            DataServices.ProcessADOCommand(sSQLAddToTEMP, sADOConn, True, lError, sErrorMsg)

            sSQLCopyToTEMP = "UPDATE [" & sTableName & "] " & "SET TEMP___ = [" & sOldFieldName & "]"
            DataServices.ProcessADOCommand(sSQLCopyToTEMP, sADOConn, True, lError, sErrorMsg)

            sSQLDropOriginal = "ALTER TABLE [" & sTableName & "] " & "DROP COLUMN [" & sOldFieldName & "] "
            DataServices.ProcessADOCommand(sSQLDropOriginal, sADOConn, True, lError, sErrorMsg)

            sSQLCreateNew = "ALTER TABLE [" & sTableName & "] " & "ADD [" & sOldFieldName & "] " & sFieldType
            DataServices.ProcessADOCommand(sSQLCreateNew, sADOConn, True, lError, sErrorMsg)

            sSQLAddToNew = "UPDATE [" & sTableName & "] " & "SET [" & sOldFieldName & "] =" & "[TEMP___]"
            Dim bUpdate = DataServices.ProcessADOCommand(sSQLAddToNew, sADOConn, True, lError, sErrorMsg)

            sSQLDropTEMP = "ALTER TABLE [" & sTableName & "] " & "DROP COLUMN [TEMP___]"
            DataServices.ProcessADOCommand(sSQLDropTEMP, sADOConn, True, lError, sErrorMsg)

            'sModifyColSQLStr = "ALTER TABLE [" & sTableName & "] "
            'sModifyColSQLStr = sModifyColSQLStr & "ALTER COLUMN [" & sOldFieldName & "] " & sFieldType

            'Dim bUpdate = DataServices.ProcessADOCommand(sModifyColSQLStr, sADOConn, True, lError, sErrorMsg)

            'sSQLStr = sSQLStr & "[" & sNewFieldName & "] = CONVERT(" & sFieldType & ", [" & sOldFieldName & "])"

            'Select Case eFieldType
            '    Case Enums.meTableFieldTypes.ftLong, Enums.meTableFieldTypes.ftCounter, Enums.meTableFieldTypes.ftInteger, Enums.meTableFieldTypes.ftBoolean, Enums.meTableFieldTypes.ftDouble
            '        sSQLStr = sSQLStr & " WHERE ISNUMERIC([" & sOldFieldName & "]) = 1"
            '    Case Enums.meTableFieldTypes.ftDate
            '        sSQLStr = sSQLStr & " WHERE ISDATE([" & sOldFieldName & "]) = 1"
            'End Select
            'ALTER TABLE [Documents] ALTER COLUMN [DocumentDescription] VARCHAR(300)

            Return bUpdate
        End Function

        Public Function CheckFieldBeforeEdit(ByVal pTableName As String, ByVal sFieldName As String) As ActionResult
            Dim sIndexMessage As String = ""
            Dim sMessage As String = ""

            sMessage = CheckIfInUse(pTableName, sFieldName)

            sIndexMessage = CheckIfIndexesExist(pTableName, sFieldName, False)

            Return Json(New With {Key .Message = sMessage,
                                  Key .IndexMsg = sIndexMessage
                                      }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function RemoveFieldFromTable(pTableName As String, pFieldName As String, pDeleteIndexes As Boolean) As ActionResult
            Dim oSchemaList As List(Of SchemaIndex)
            Dim sSQL As String
            Dim bSuccess As Boolean
            Dim sAdoConn As ADODB.Connection
            'Dim lError As Integer

            'Dim sAdoConn = DataServices.DBOpen(Enums.eConnectionType.conDefault, Nothing)
            Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableName.Trim().ToLower())).FirstOrDefault()
            sAdoConn = DataServices.DBOpen(oTables, _iDatabas.All())
            Try
                If pDeleteIndexes Then
                    oSchemaList = SchemaIndex.GetTableIndexes(pTableName, sAdoConn)

                    For Each oSchema In oSchemaList
                        If (FieldsMatch(pTableName, pFieldName, oSchema.ColumnName)) Then
                            sSQL = "DROP INDEX [" & pTableName & "].[" & Trim$(UCase$(oSchema.IndexName)) & "]"
                            DataServices.ProcessADOCommand(sSQL, sAdoConn, False)
                            'theApp.Data.ProcessADOCommand(sSQL, msTableName, True, Nothing, lError, sErrorMsg)
                        End If
                    Next

                End If

                sSQL = "ALTER TABLE [" & pTableName & "] DROP COLUMN [" & pFieldName & "] "
                bSuccess = DataServices.ProcessADOCommand(sSQL, sAdoConn, False)

                Dim pSLTableFileRoomOrderEntity = _iSLTableFileRoomOrder.All().Where(Function(x) x.TableName = pTableName And x.FieldName = pFieldName)
                _iSLTableFileRoomOrder.DeleteRange(pSLTableFileRoomOrderEntity)

                If bSuccess = True Then
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlFieldRemoveSuccessfully")
                    DeleteSQLViewWithNoViewColumnExists(pTableName)
                Else
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlSorryCantRemoveField")
                End If

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {Key .errortype = Keys.ErrorType,
                                  Key .message = Keys.ErrorMessage
                                      }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function CheckBeforeRemoveFieldFromTable(pTableName As String, pFieldName As String) As ActionResult

            Dim bDeleteIndexes As Boolean
            Dim bOKToDeleteMsg As String = ""
            Dim sMessage As String = ""
            Dim pTableEntity As Table
            Dim oSchemaList As List(Of SchemaIndex)
            Dim FieldName As String
            Dim sAdoConn As ADODB.Connection

            Try
                FieldName = pFieldName.Trim()
                sMessage = CheckIfInUse(pTableName, FieldName)

                pTableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(pTableName)).FirstOrDefault()

                'If (sMessage <> "") Then
                '    sMessage = "The """ & FieldName & """ field is in use in the following places and cannot be removed from the """ & Trim$(pTableEntity.UserName) & """ table:</br>" & sMessage
                'End If

                If sMessage = "" Then
                    sMessage = CheckIfIndexesExist(pTableName, FieldName, True)
                End If

                'Dim sAdoConn = DataServices.DBOpen(Enums.eConnectionType.conDefault, Nothing)
                Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableName.Trim().ToLower())).FirstOrDefault()
                sAdoConn = DataServices.DBOpen(oTables, _iDatabas.All())

                oSchemaList = SchemaIndex.GetTableIndexes(pTableName, sAdoConn)

                If (sMessage <> "") Then
                    sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldIsInUseForThe"), FieldName, Trim$(pTableEntity.UserName), sMessage)
                    bDeleteIndexes = True
                Else
                    sMessage = String.Format(Languages.Translation("msgAdminCtrlRUSureUWant2Remove"), pFieldName, Trim$(pTableEntity.UserName))
                End If

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessageJS()
            End Try

            If (sMessage <> "") Then
                Keys.ErrorType = "e"
                Keys.ErrorMessage = sMessage
            End If

            Return Json(New With {Key .errortype = Keys.ErrorType,
                                  Key .bDeleteIndexes = bDeleteIndexes,
                                  Key .message = Keys.ErrorMessage
                                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function LoadFieldData(pTableName As String, sidx As String, sord As String, page As Integer, rows As Integer) As JsonResult

            Dim bAddColumn As Boolean
            Dim lIndex As Integer
            Dim fieldsDT As DataTable = New DataTable()
            Dim column As DataColumn
            Dim row As DataRow
            Dim pTableEntity As Table
            Dim sADOConn As ADODB.Connection
            'Dim tableName As String = "Folders"
            Dim rsADO As ADODB.Recordset
            'Dim sFieldName As String
            Dim sFieldSize As String = ""
            Dim sFieldType As String = ""
            Dim lDatabase = _iDatabas.All()

            column = New DataColumn()
            column.DataType = System.Type.GetType("System.String")
            column.ColumnName = "Field_Name"
            fieldsDT.Columns.Add(column)

            column = New DataColumn()
            column.DataType = System.Type.GetType("System.String")
            column.ColumnName = "Field_Type"
            fieldsDT.Columns.Add(column)

            column = New DataColumn()
            column.DataType = System.Type.GetType("System.String")
            column.ColumnName = "Field_Size"
            fieldsDT.Columns.Add(column)

            Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableName.Trim().ToLower())).FirstOrDefault()
            sADOConn = DataServices.DBOpen(oTables, _iDatabas.All())



            If Not pTableName = "" Then

                pTableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(pTableName)).FirstOrDefault()

                rsADO = DataServices.GetADORecordSet("SELECT * FROM [" & pTableName & "] WHERE 0 = 1", sADOConn)

                'Dim oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(pTableName, sADOConn)
                Dim pDatabaseEntity = Nothing
                If Not pTableEntity Is Nothing Then
                    If Not pTableEntity.DBName Is Nothing Then
                        pDatabaseEntity = lDatabase.Where(Function(x) x.DBName.Trim().ToLower().Equals(pTableEntity.DBName.Trim().ToLower())).FirstOrDefault()
                    End If
                End If

                _IDBManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)
                Dim dt As DataSet = _IDBManager.ExecuteDataSetWithSchema(CommandType.Text, "SELECT * FROM [" & pTableName & "] WHERE 0 = 1")
                _IDBManager.Dispose()
                'Dim columnName = dt.Tables(0).Columns(0)..ColumnName
                'Dim columnCount = dt.Tables(0).Columns.Count
                'Dim identityVal = dt.Tables(0).Columns(0).AutoIncrement

                For lIndex = 0 To rsADO.Fields.Count - 1
                    Dim test As String = dt.Tables(0).Columns(lIndex).ColumnName
                    Dim NameTest = rsADO.Fields(lIndex).Name
                    Dim testDataType = dt.Tables(0).Columns(lIndex).DataType
                    Dim testBoolean As Boolean = dt.Tables(0).Columns(lIndex).AutoIncrement

                    bAddColumn = (Not SchemaInfoDetails.IsSystemField(rsADO.Fields(lIndex).Name))

                    If (bAddColumn) Then
                        If SchemaInfoDetails.IsADateType(rsADO.Fields(lIndex).Type) Then
                            sFieldType = Common.FT_DATE
                            sFieldSize = Common.FT_DATE_SIZE
                        ElseIf SchemaInfoDetails.IsAStringType(rsADO.Fields(lIndex).Type) Then
                            If ((rsADO.Fields(lIndex).DefinedSize <= 0) Or (rsADO.Fields(lIndex).DefinedSize >= 2000000)) Then
                                sFieldType = Common.FT_MEMO
                                sFieldSize = Common.FT_MEMO_SIZE
                            Else
                                If ((pTableEntity.CounterFieldName <> "") And (StrComp(DatabaseMap.RemoveTableNameFromField(rsADO.Fields(lIndex).Name), DatabaseMap.RemoveTableNameFromField(pTableEntity.IdFieldName), vbTextCompare) = 0)) Then
                                    sFieldType = Common.FT_SMEAD_COUNTER

                                    If rsADO.Fields(lIndex).DefinedSize < CLng(Common.FT_SMEAD_COUNTER_SIZE) Then
                                        sFieldSize = Common.FT_SMEAD_COUNTER_SIZE
                                    Else
                                        sFieldSize = rsADO.Fields(lIndex).DefinedSize
                                    End If
                                Else
                                    sFieldType = Common.FT_TEXT
                                    sFieldSize = rsADO.Fields(lIndex).DefinedSize
                                End If
                            End If
                        Else
                            Select Case rsADO.Fields(lIndex).Type
                                'Enums.DataTypeEnum.rmInteger
                                Case Enums.DataTypeEnum.rmBoolean, Enums.DataTypeEnum.rmUnsignedTinyInt
                                    sFieldType = Common.FT_BOOLEAN
                                    sFieldSize = Common.FT_BOOLEAN_SIZE
                                Case Enums.DataTypeEnum.rmDouble, Enums.DataTypeEnum.rmCurrency, Enums.DataTypeEnum.rmDecimal, Enums.DataTypeEnum.rmNumeric, Enums.DataTypeEnum.rmSingle, Enums.DataTypeEnum.rmVarNumeric
                                    sFieldType = Common.FT_DOUBLE
                                    sFieldSize = Common.FT_DOUBLE_SIZE
                                Case Enums.DataTypeEnum.rmBigInt, Enums.DataTypeEnum.rmUnsignedBigInt, Enums.DataTypeEnum.rmInteger
                                    If (dt.Tables(0).Columns(lIndex).AutoIncrement) Then 'rsADO.Fields(lIndex).Properties("ISAUTOINCREMENT").Value
                                        sFieldType = Common.FT_AUTO_INCREMENT
                                        sFieldSize = Common.FT_AUTO_INCREMENT_SIZE
                                    Else
                                        If ((pTableEntity.CounterFieldName <> "") And (StrComp(DatabaseMap.RemoveTableNameFromField(rsADO.Fields(lIndex).Name), DatabaseMap.RemoveTableNameFromField(pTableEntity.IdFieldName), vbTextCompare) = 0)) Then
                                            sFieldType = Common.FT_SMEAD_COUNTER
                                            sFieldSize = Common.FT_SMEAD_COUNTER_SIZE
                                        Else
                                            sFieldType = Common.FT_LONG_INTEGER
                                            sFieldSize = Common.FT_LONG_INTEGER_SIZE
                                        End If
                                    End If
                                Case Enums.DataTypeEnum.rmBinary
                                    sFieldType = Common.FT_BINARY
                                    sFieldSize = Common.FT_MEMO_SIZE
                                Case Enums.DataTypeEnum.rmSmallInt, Enums.DataTypeEnum.rmTinyInt, Enums.DataTypeEnum.rmUnsignedInt, Enums.DataTypeEnum.rmUnsignedSmallInt
                                    sFieldType = Common.FT_SHORT_INTEGER
                                    sFieldSize = Common.FT_SHORT_INTEGER_SIZE
                            End Select
                        End If

                        'Put Fields in DataTable.
                        If sFieldType <> "" And sFieldSize <> "" Then
                            row = fieldsDT.NewRow()
                            row("Field_Name") = rsADO.Fields(lIndex).Name
                            row("Field_Type") = sFieldType
                            row("Field_Size") = sFieldSize
                            fieldsDT.Rows.Add(row)
                        End If

                    End If
                Next lIndex
            End If

            Return Json(Common.ConvertDataTableToJQGridResult(fieldsDT, sidx, sord, page, rows), JsonRequestBehavior.AllowGet)

        End Function

        Private Function CheckIfInUse(ByVal pTableName As String, ByVal sFieldName As String) As String
            'Dim bRelationship As Boolean
            'Dim iIndex As Integer
            Dim sMessage As String = ""
            Dim sViewMessage As String = ""
            Dim oImportLoads As List(Of ImportLoad)
            Dim oImportFields As List(Of ImportField)
            Dim oOneStripJobs As List(Of OneStripJob)
            Dim oOneStripJobFields As List(Of OneStripJobField)
            'Dim oRelationships As RelationShip
            Dim oSLTextSearchItem As List(Of SLTextSearchItem)
            'Dim oTable As Tables
            'Dim oViews As View
            'Dim oViewColumns As ViewColumn

            Dim moTable = _iTable.All().Where(Function(x) x.TableName.Equals(pTableName)).FirstOrDefault()
            oOneStripJobs = _iOneStripJob.All().Where(Function(x) x.TableName.Equals(pTableName)).ToList()
            oOneStripJobFields = _iOneStripJobField.All().ToList()
            oImportFields = _iImportField.All().ToList()
            oImportLoads = _iImportLoad.All().Where(Function(x) x.FileName.Equals(pTableName)).ToList()
            oSLTextSearchItem = _iSLTextSearchItem.All().Where(Function(x) x.IndexTableName.Equals(pTableName)).ToList()

            'First check to see if the Field to be deleted is being used anyplace
            If (FieldsMatch(pTableName, sFieldName, moTable.CounterFieldName)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldCounterFieldName"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.DefaultDescriptionField)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldDefaultDescriptionField"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.DescFieldNameOne)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldDescFieldNameOne"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.DescFieldNameTwo)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldDescFieldNameTwo"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.IdFieldName)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldIdFieldName"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.IdFieldName2)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldIdFieldName2"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.RuleDateField)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldRuleDateField"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.TrackingACTIVEFieldName)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldTrackingActiveFieldName"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.TrackingOUTFieldName)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldTrackingOutFieldName"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.InactiveLocationField)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlInactiveLocationField"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.RetentionFieldName)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldRetentionFieldName"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.RetentionDateOpenedField)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlRetentionOpenDateField"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.RetentionDateCreateField)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlRetentionCreateDateField"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.RetentionDateClosedField)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlRetentionDateClosedField"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.RetentionDateOtherField)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlRetentionOtherDateField"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.TrackingPhoneFieldName)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldTrackingPhoneFieldName"), moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.TrackingMailStopFieldName)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldTrackingMailStopFieldName"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.TrackingRequestableFieldName)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldTrackingRequestableFieldName"), sMessage, moTable.UserName)
            End If

            If (FieldsMatch(pTableName, sFieldName, moTable.OperatorsIdField)) Then
                sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldOperatorsIdField"), sMessage, moTable.UserName)
            End If

            If (sMessage <> "") Then sMessage = sMessage & "</br>"

            Dim lstRelatedTables = _iRelationShip.All().Where(Function(x) x.LowerTableName = moTable.TableName).ToList()
            Dim lstRelatedChildTable = _iRelationShip.All().Where(Function(x) x.UpperTableName = moTable.TableName).ToList()

            For Each oParentRelationships In lstRelatedTables
                If (FieldsMatch(pTableName, sFieldName, oParentRelationships.UpperTableFieldName, oParentRelationships.UpperTableName)) Then
                    sMessage = String.Format(Languages.Translation("msgAdminCtrlDownToTable"), sMessage,
                                             vbTab, oParentRelationships.LowerTableName, StrConv(DatabaseMap.RemoveTableNameFromField(oParentRelationships.LowerTableFieldName), vbProperCase))
                End If
                'Added by Ganesh - 07/01/2016
                If (FieldsMatch(pTableName, sFieldName, oParentRelationships.LowerTableFieldName, oParentRelationships.LowerTableName)) Then
                    sMessage = String.Format(Languages.Translation("msgAdminCtrlUpToTable"), sMessage, vbTab, oParentRelationships.UpperTableName,
                                             StrConv(DatabaseMap.RemoveTableNameFromField(oParentRelationships.UpperTableFieldName), vbProperCase), vbCrLf)
                End If
            Next

            For Each oParentRelationships In lstRelatedChildTable
                If (FieldsMatch(pTableName, sFieldName, oParentRelationships.LowerTableFieldName, oParentRelationships.LowerTableName)) Then
                    sMessage = String.Format(Languages.Translation("msgAdminCtrlDownToTable"), sMessage,
                                              vbTab, oParentRelationships.UpperTableName, StrConv(DatabaseMap.RemoveTableNameFromField(oParentRelationships.UpperTableFieldName), vbProperCase))
                End If
            Next

            For Each oOneStripJob In oOneStripJobs
                If (StrComp(pTableName, oOneStripJob.TableName, vbTextCompare) = 0) Then

                    For Each oOneStripJobField In oOneStripJobFields
                        If (FieldsMatch(pTableName, sFieldName, oOneStripJobField.FieldName, oOneStripJob.TableName)) Then
                            sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldUsedInOneStripJobFields"), sMessage)
                            oOneStripJobField = Nothing
                            Exit For
                        End If
                    Next
                End If
            Next

            For Each oImportLoad In oImportLoads
                If (StrComp(pTableName, oImportLoad.FileName, vbTextCompare) = 0) Then

                    For Each oImportField In oImportFields
                        If (FieldsMatch(pTableName, sFieldName, oImportField.FieldName, oImportLoad.FileName)) Then
                            sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldUsedInImportFields"), sMessage)
                            oImportField = Nothing
                            Exit For
                        End If
                    Next
                End If
            Next
            Dim lViewEntities = _iView.All()
            Dim lViewColumnEntities = _iViewColumn.All()

            Dim lLoopViewEntities = lViewEntities.Where(Function(x) x.TableName.Trim().ToLower() = moTable.TableName.Trim().ToLower())
            For Each oViews In lLoopViewEntities
                Dim lInViewColumnEntities = lViewColumnEntities.Where(Function(x) x.ViewsId = oViews.Id)
                For Each oViewColumns In lInViewColumnEntities

                    If (FieldsMatch(pTableName, sFieldName, oViewColumns.FieldName, moTable.TableName)) Then
                        'If (Not oViewColumns.Deleted) Then
                        '    sMessage = sMessage & "  Used in View" & vbTab & """" & oViews.ViewName & """</br>"
                        'Else
                        If (oViewColumns.Id <> 0) Then
                            sMessage = String.Format(Languages.Translation("msgAdminCtrlUsedInView"), sMessage, vbTab, oViews.ViewName)
                        Else
                            sMessage = String.Format(Languages.Translation("msgAdminCtrlUsedInView"), sMessage, vbTab, oViews.ViewName)
                        End If
                        'End If
                    End If
                Next
            Next

            'For Each oSLTextSrchItem In oSLTextSearchItem
            '    If (FieldsMatch(pTableName, sFieldName, oSLTextSrchItem.IndexFieldName, oSLTextSrchItem.IndexTableName)) Then
            '        If (goSDLKini.LicensedFullTextSearchEnabled) Then
            '            sMessage = sMessage & "  Used in ""Full Text Search""" & vbCrLf
            '        Else
            '            sMessage = sMessage & "  Used in ""Global Field Search""" & vbCrLf
            '        End If

            '        oSLTextSearchItem = Nothing
            '        Exit For
            '    End If
            'Next

            '        For Each oViews In oTables.Views(geViewType_vtMaster)
            '            For Each oViewColumns In oViews.ViewColumns
            '                If (FieldsMatch(msTableName, sFieldName, oViewColumns.FieldName, oTables.TableName)) Then
            '                    If (Not oViewColumns.Deleted) Then
            '                        sViewMessage = sViewMessage & "  Used in View" & vbTab & """" & oViews.ViewName & """" & vbCrLf
            '                    Else
            '                        If (oViewColumns.Id <> 0) Then
            '                            sViewMessage = sViewMessage & "  Used in View" & vbTab & """" & oViews.ViewName & """" & vbCrLf
            '                        End If
            '                    End If
            '                End If
            '            Next
            '        Next
            '    Next

            '    If ((sMessage <> "") And (bRelationship)) Then sMessage = sMessage & vbCrLf
            '    If (sViewMessage <> "") Then sMessage = sMessage & sViewMessage & vbCrLf
            '    theApp.OneStripJobs.Load()


            '    For Each oSLTextSearchItem In moTable.TextSearchItems
            '        If (FieldsMatch(msTableName, sFieldName, oSLTextSearchItem.IndexFieldName, oSLTextSearchItem.IndexTableName)) Then
            '            If (goSDLKini.LicensedFullTextSearchEnabled) Then
            '                sMessage = sMessage & "  Used in ""Full Text Search""" & vbCrLf
            '            Else
            '                sMessage = sMessage & "  Used in ""Global Field Search""" & vbCrLf
            '            End If

            '            oSLTextSearchItem = Nothing
            '            Exit For
            '        End If
            '    Next

            '    CheckIfInUse = sMessage
            Return sMessage

        End Function

        'Check if Indexes exists for field been operated.
        Function CheckIfIndexesExist(sTableName As String, sFieldName As String, bAsk As Boolean) As String
            Dim sMessage As String = ""
            Dim oSchema As SchemaIndex
            Dim oSchemaList As List(Of SchemaIndex)
            Dim sAdoConn As ADODB.Connection
            'Dim sAdoConn = DataServices.DBOpen(Enums.eConnectionType.conDefault, Nothing)

            Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(sTableName.Trim().ToLower())).FirstOrDefault()
            sAdoConn = DataServices.DBOpen(oTables, _iDatabas.All())
            oSchemaList = SchemaIndex.GetTableIndexes(sTableName, sAdoConn)

            For Each oSchema In oSchemaList
                If (FieldsMatch(sTableName, sFieldName, oSchema.ColumnName)) Then
                    sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldIsPartOfAtLeast1Index"), sFieldName)
                    If (bAsk) Then
                        sMessage = String.Format(Languages.Translation("msgAdminCtrlFieldRemovingField"), sMessage, vbNewLine, vbCrLf)
                    Else
                        sMessage = String.Format(Languages.Translation("msgAdminCtrlCannotBModified"), sMessage)
                    End If
                    oSchema = Nothing
                End If
            Next
            Return sMessage
        End Function

        Private Function FieldsMatch(ByVal sFileName As String, ByVal sFieldName As String, ByVal sCompareName As String, Optional ByVal sCompareTable As String = "") As Boolean

            FieldsMatch = False

            sFileName = Trim$(sFileName)
            sFieldName = Trim$(sFieldName)
            sCompareName = Trim$(sCompareName)

            If (InStr(sCompareName, ".") > 0) Then
                If (StrComp(sCompareName, sFileName & "." & sFieldName, vbTextCompare) = 0) Then FieldsMatch = True
            Else
                If ((sCompareTable = "") Or (StrComp(sCompareTable, sFileName, vbTextCompare) = 0)) Then
                    If (StrComp(sCompareName, sFieldName, vbTextCompare) = 0) Then FieldsMatch = True
                End If
            End If

            Return FieldsMatch
        End Function

        Public Function GetFieldTypeList(pTableName As String) As JsonResult

            Dim lstFieldTypes As New List(Of KeyValuePair(Of String, String))
            Dim bAutoCompensator As Boolean
            Dim bHasAutoIncrement As Boolean
            Dim lstFieldTypesJsonList As String = ""
            Dim lCounter As Integer
            Dim pTableEntity As Table

            Try
                Dim pDatabaseEntity = Nothing
                pTableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(pTableName)).FirstOrDefault()
                If Not pTableEntity Is Nothing Then
                    If Not pTableEntity.DBName Is Nothing Then
                        pDatabaseEntity = _iDatabas.Where(Function(x) x.DBName.Trim().ToLower().Equals(pTableEntity.DBName.Trim().ToLower())).FirstOrDefault()
                    End If
                End If
                _IDBManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)

                Dim dt As DataSet = _IDBManager.ExecuteDataSetWithSchema(CommandType.Text, "SELECT * FROM [" & pTableName & "] WHERE 0 = 1")
                _IDBManager.Dispose()
                For lCounter = 0 To dt.Tables(0).Columns.Count - 1
                    If (dt.Tables(0).Columns(lCounter).AutoIncrement) Then
                        bHasAutoIncrement = True
                        Exit For
                    End If
                Next lCounter

                bAutoCompensator = True

                If (Not bHasAutoIncrement) Then
                    bAutoCompensator = False
                    lstFieldTypes.Add(New KeyValuePair(Of String, String)(Enums.meTableFieldTypes.ftCounter, Common.FT_AUTO_INCREMENT))
                End If

                'If ((Not bHasAutoIncrement) Or (rsADO.Fields.Item(msFieldName).Properties.Item("IsAutoIncrement").GetValue)) Then
                '    bAutoCompensator = False
                '    cboFieldType.AddItem FT_AUTO_INCREMENT
                '    cboFieldType.ItemData(cboFieldType.NewIndex) = ftCounter
                'End If
                lstFieldTypes.Add(New KeyValuePair(Of String, String)(Enums.meTableFieldTypes.ftLong, Common.FT_LONG_INTEGER))
                lstFieldTypes.Add(New KeyValuePair(Of String, String)(Enums.meTableFieldTypes.ftText, Common.FT_TEXT))
                lstFieldTypes.Add(New KeyValuePair(Of String, String)(Enums.meTableFieldTypes.ftInteger, Common.FT_SHORT_INTEGER))
                lstFieldTypes.Add(New KeyValuePair(Of String, String)(Enums.meTableFieldTypes.ftBoolean, Common.FT_BOOLEAN))
                lstFieldTypes.Add(New KeyValuePair(Of String, String)(Enums.meTableFieldTypes.ftDouble, Common.FT_DOUBLE))
                lstFieldTypes.Add(New KeyValuePair(Of String, String)(Enums.meTableFieldTypes.ftDate, Common.FT_DATE))
                lstFieldTypes.Add(New KeyValuePair(Of String, String)(Enums.meTableFieldTypes.ftMemo, Common.FT_MEMO))

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                lstFieldTypesJsonList = JsonConvert.SerializeObject(lstFieldTypes, Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlFieldRetreivedData")
            Catch ex As Exception

            End Try

            Return Json(New With {Key .lstFieldTypesJson = lstFieldTypesJsonList,
                                      Key .errortype = Keys.ErrorType,
                                      Key .message = Keys.ErrorMessage
                                      }, JsonRequestBehavior.AllowGet)

        End Function
        'Delete the temp view of table, if no viewcolumns exists.
        Public Sub DeleteSQLViewWithNoViewColumnExists(tableName As String)
            Try
                If Not String.IsNullOrEmpty(tableName) Then
                    Dim tableViews = _iView.All().Where(Function(x) x.TableName = tableName)
                    For Each vView In tableViews
                        Dim viewColumns = _iViewColumn.All().Where(Function(x) x.ViewsId = vView.Id)
                        If Not IsNothing(viewColumns) Then
                            If viewColumns.Count() = 0 Then
                                ViewModel.SQLViewDelete(vView.Id)
                            End If
                        End If
                    Next
                End If
            Catch ex As Exception
                Throw ex.InnerException
            End Try
        End Sub
#End Region

#Region "Tracking"
        Public Function LoadTableTracking() As PartialViewResult
            Return PartialView("_TableTrackingPartial")
        End Function

        Public Function GetTableTrackingProperties(tableName As String) As ActionResult
            Try
                Dim pTableEntity = _iTable.All()
                Dim pContainerTables = pTableEntity.Where(Function(m) m.TrackingTable > 0).OrderBy(Function(m) m.TrackingTable)
                Dim pSystemEntities = _iSystem.All.OrderBy(Function(m) m.Id).FirstOrDefault()
                Dim pRelationShipEntity = _iRelationShip.All.OrderBy(Function(m) m.Id)
                Dim pSelectTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower())).FirstOrDefault()
                Dim Container1Table = _iTable.All.Where(Function(m) m.TrackingTable = 1).FirstOrDefault()
                Dim DBConName = pSelectTable.DBName
                Dim sADOConn = DataServices.DBOpen()
                Dim schemaColumnList As List(Of SchemaColumns) = SchemaInfoDetails.GetSchemaInfo(tableName, sADOConn)
                Dim containerList As New List(Of KeyValuePair(Of Integer, String))
                Dim OutFieldList As New List(Of KeyValuePair(Of String, String))
                Dim DueBackFieldList As New List(Of KeyValuePair(Of String, String))
                Dim ActiveFieldList As New List(Of KeyValuePair(Of String, String))
                Dim EmailAddressList As New List(Of KeyValuePair(Of String, String))
                Dim RequesFieldList As New List(Of KeyValuePair(Of String, String))
                Dim InactiveFieldList As New List(Of KeyValuePair(Of String, String))
                Dim ArchiveFieldList As New List(Of KeyValuePair(Of String, String))
                Dim UserIdFieldList As New List(Of KeyValuePair(Of String, String))
                Dim PhoneFieldList As New List(Of KeyValuePair(Of String, String))
                Dim MailSTopFieldList As New List(Of KeyValuePair(Of String, String))
                Dim SignatureFieldList As New List(Of KeyValuePair(Of String, String))
                Dim defaultTracking As New List(Of KeyValuePair(Of String, String))
                Dim lblDestination As String = Nothing
                'Get ADO connection name
                If (Not (pSelectTable Is Nothing)) Then
                    sADOConn = DataServices.DBOpen(pSelectTable, _iDatabas.All())
                End If
                containerList.Add(New KeyValuePair(Of Integer, String)(0, "{ Not a container }"))
                OutFieldList.Add(New KeyValuePair(Of String, String)("0", "{No Out Field}"))
                DueBackFieldList.Add(New KeyValuePair(Of String, String)("0", "{No Due Back Days Field}"))
                ActiveFieldList.Add(New KeyValuePair(Of String, String)("0", "{No Active Field}"))
                EmailAddressList.Add(New KeyValuePair(Of String, String)("0", "{No Email Address Field}"))
                RequesFieldList.Add(New KeyValuePair(Of String, String)("0", "{No Requestable Field}"))
                InactiveFieldList.Add(New KeyValuePair(Of String, String)("0", "{No Inactive Storage Field}"))
                ArchiveFieldList.Add(New KeyValuePair(Of String, String)("0", "{No Archive Storage Field}"))
                UserIdFieldList.Add(New KeyValuePair(Of String, String)("0", "{No User Id Field}"))
                PhoneFieldList.Add(New KeyValuePair(Of String, String)("0", "{No Phone Field}"))
                MailSTopFieldList.Add(New KeyValuePair(Of String, String)("0", "{No MailStop Field}"))
                SignatureFieldList.Add(New KeyValuePair(Of String, String)("0", "{No Signature Required Field}"))
                defaultTracking.Add(New KeyValuePair(Of String, String)("0", ""))
                'Fill Container Level DropDown List And Selected table data
                If (Not (pContainerTables.Count = 0)) Then
                    For Each tableObj As Table In pContainerTables.ToList
                        Dim containerVal = Convert.ToString(tableObj.TrackingTable) + " (" + tableObj.UserName + ")"
                        containerList.Add(New KeyValuePair(Of Integer, String)(tableObj.TrackingTable, containerVal))
                    Next
                End If
                Dim countValue = pContainerTables.Count + 1
                containerList.Add(New KeyValuePair(Of Integer, String)(countValue, Convert.ToString(countValue) + " { Unused }"))

                If (Not (schemaColumnList Is Nothing)) Then
                    'Out Field DropDown List
                    OutFieldList = DataServices.IsContainField(sADOConn, tableName, schemaColumnList, "Out", OutFieldList)

                    'Due Back Days Field
                    Dim bHasAField As Boolean
                    Dim bIsSystemAdmin As Boolean
                    For Each schemaColumnObj As SchemaColumns In schemaColumnList
                        If (schemaColumnObj.ColumnName.Trim.ToLower.Equals(("DueBackDays").Trim.ToLower())) Then
                            bHasAField = True
                            Exit For
                        End If
                    Next
                    bIsSystemAdmin = DataServices.IsSysAdmin(tableName, sADOConn)
                    If ((Not bHasAField) And bIsSystemAdmin) Then
                        DueBackFieldList.Add(New KeyValuePair(Of String, String)("DueBackDays", "DueBackDays"))
                        bHasAField = False
                    End If
                    For Each oSchemaColumnObj As SchemaColumns In schemaColumnList
                        Select Case oSchemaColumnObj.DataType
                            Case Enums.DataTypeEnum.rmInteger, Enums.DataTypeEnum.rmUnsignedInt, Enums.DataTypeEnum.rmBigInt, Enums.DataTypeEnum.rmUnsignedBigInt, Enums.DataTypeEnum.rmSingle, Enums.DataTypeEnum.rmDouble
                                bHasAField = oSchemaColumnObj.ColumnName.Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(pSelectTable.IdFieldName.Trim.ToLower))
                                If (Not bHasAField) Then
                                    For Each oRelationshipObj As RelationShip In pRelationShipEntity
                                        If (oSchemaColumnObj.ColumnName.Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(oRelationshipObj.UpperTableFieldName.Trim.ToLower))) Then
                                            bHasAField = True
                                            Exit For
                                        End If
                                    Next

                                    If (Not bHasAField) Then
                                        For Each oRelationshipObj As RelationShip In pRelationShipEntity
                                            If (oSchemaColumnObj.ColumnName.Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(oRelationshipObj.LowerTableFieldName.Trim.ToLower))) Then
                                                bHasAField = True
                                                Exit For
                                            End If
                                        Next
                                    End If
                                End If

                                If (Not bHasAField) Then
                                    DueBackFieldList.Add(New KeyValuePair(Of String, String)(oSchemaColumnObj.ColumnName, oSchemaColumnObj.ColumnName))
                                End If
                            Case Else
                        End Select
                    Next


                    'Active Field List
                    ActiveFieldList = DataServices.IsContainField(sADOConn, tableName, schemaColumnList, "Active", ActiveFieldList)

                    'Email Address List
                    EmailAddressList = DataServices.IsContainStringField(sADOConn, tableName, schemaColumnList, "EmailAddress", EmailAddressList)

                    'Requestable Field List
                    RequesFieldList = DataServices.IsContainField(sADOConn, tableName, schemaColumnList, "Requestable", RequesFieldList)

                    'Inactive Storage Field List
                    InactiveFieldList = DataServices.IsContainField(sADOConn, tableName, schemaColumnList, "InactiveStorage", InactiveFieldList)

                    'Archive Storage Field List
                    ArchiveFieldList = DataServices.IsContainField(sADOConn, tableName, schemaColumnList, "ArchiveStorage", ArchiveFieldList)

                    'User Id Field List
                    Dim bHasAUserField As Boolean
                    Dim userIdIsSysAdmin As Boolean
                    For Each oSchemaColumnObj As SchemaColumns In schemaColumnList
                        If (oSchemaColumnObj.ColumnName.Trim.ToLower.Equals(("OperatorsId").Trim.ToLower)) Then
                            bHasAUserField = True
                        ElseIf (oSchemaColumnObj.ColumnName.Trim.ToLower.Equals(("UserId").Trim.ToLower)) Then
                            bHasAUserField = True
                        End If

                        If bHasAUserField Then
                            Exit For
                        End If
                    Next

                    userIdIsSysAdmin = DataServices.IsSysAdmin(tableName, sADOConn)
                    If ((Not bHasAUserField) And (userIdIsSysAdmin)) Then
                        UserIdFieldList.Add(New KeyValuePair(Of String, String)("UserId", "UserId"))
                    End If

                    For Each oSchemaColumnObj As SchemaColumns In schemaColumnList
                        If ((Not SchemaInfoDetails.IsSystemField(oSchemaColumnObj.ColumnName)) And (oSchemaColumnObj.IsString) And (oSchemaColumnObj.CharacterMaxLength) = 30) Then
                            UserIdFieldList.Add(New KeyValuePair(Of String, String)(oSchemaColumnObj.ColumnName, oSchemaColumnObj.ColumnName))
                        End If
                    Next

                    'Phone Field List
                    PhoneFieldList = DataServices.IsContainStringField(sADOConn, tableName, schemaColumnList, "Phone", PhoneFieldList)

                    'Mail Stop Field List
                    MailSTopFieldList = DataServices.IsContainStringField(sADOConn, tableName, schemaColumnList, "MailStop", MailSTopFieldList)

                    'Signature Required Field LIst
                    SignatureFieldList = DataServices.IsContainField(sADOConn, tableName, schemaColumnList, "SignatureRequired", SignatureFieldList)

                End If
                If (Container1Table IsNot Nothing) Then
                    lblDestination = Container1Table.UserName
                End If

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim containerJSONList = JsonConvert.SerializeObject(containerList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim systemObject = JsonConvert.SerializeObject(pSystemEntities, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim oneTableObj = JsonConvert.SerializeObject(pSelectTable, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim outFieldJSONList = JsonConvert.SerializeObject(OutFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim dueBackJSONList = JsonConvert.SerializeObject(DueBackFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim activeFieldJSONList = JsonConvert.SerializeObject(ActiveFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim emailAddressJSONList = JsonConvert.SerializeObject(EmailAddressList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim requestFieldJSONList = JsonConvert.SerializeObject(RequesFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim inactiveJSONList = JsonConvert.SerializeObject(InactiveFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim archiveJSONList = JsonConvert.SerializeObject(ArchiveFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim userFieldJSONList = JsonConvert.SerializeObject(UserIdFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim phoneFieldJSONList = JsonConvert.SerializeObject(PhoneFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim mailStopJSONList = JsonConvert.SerializeObject(MailSTopFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim signatureJSONList = JsonConvert.SerializeObject(SignatureFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim lblDestinationJSON = JsonConvert.SerializeObject(lblDestination, Newtonsoft.Json.Formatting.Indented, Setting)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlAllDataGetSuccessfully")
                Return Json(New With {Key .containerJSONList = containerJSONList,
                                      Key .systemObject = systemObject,
                                      Key .oneTableObj = oneTableObj,
                                      Key .outFieldJSONList = outFieldJSONList,
                                      Key .dueBackJSONList = dueBackJSONList,
                                      Key .activeFieldJSONList = activeFieldJSONList,
                                      Key .emailAddressJSONList = emailAddressJSONList,
                                      Key .requestFieldJSONList = requestFieldJSONList,
                                      Key .inactiveJSONList = inactiveJSONList,
                                      Key .archiveJSONList = archiveJSONList,
                                      Key .userFieldJSONList = userFieldJSONList,
                                      Key .phoneFieldJSONList = phoneFieldJSONList,
                                      Key .mailStopJSONList = mailStopJSONList,
                                      Key .signatureJSONList = signatureJSONList,
                                      Key .lblDestinationJSON = lblDestinationJSON,
                                      Key .errortype = Keys.ErrorType,
                                      Key .message = Keys.ErrorMessage
                                      }, JsonRequestBehavior.AllowGet)

            Catch ex As Exception
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Keys.ErrorType = "e"
                Return Json(New With {
                Key .errortype = Keys.ErrorType,
                Key .message = Keys.ErrorMessage
                }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try

        End Function

        Public Function SetTableTrackingDetails(trackingForm As Table, FieldFlag As Boolean, pAutoAddNotification As Boolean, pAllowBatchRequesting As Boolean, pTrackable As Boolean) As ActionResult
            Dim warnMsgJSON As String = ""
            Try
                _iTrackingHistory.BeginTransaction()
                _iAssetStatus.BeginTransaction()
                _iTrackingStatus.BeginTransaction()
                Dim ptableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(trackingForm.TableName.Trim.ToLower())).FirstOrDefault()
                Dim ptableByLevel = _iTable.All.Where(Function(m) m.TrackingTable > 0).OrderBy(Function(m) m.TrackingTable)
                '   Dim ptableEntity = _iTable.All.Where(Function(m) m.TableName.ToLower.Trim.Equals(trackingForm.TableName)).FirstOrDefault
                Dim modifyTable As New List(Of Table)
                Dim sADOConnDefault As ADODB.Connection = DataServices.DBOpen()
                Dim newLevel
                Dim UserLinkIndexIdSize = 30
                Dim oTrackingTable = _iTable.All.Where(Function(m) m.TrackingTable = 1).FirstOrDefault
                Dim mbADOCon = DataServices.DBOpen(ptableEntity, _iDatabas.All())
                trackingForm.AutoAddNotification = pAutoAddNotification
                trackingForm.AllowBatchRequesting = pAllowBatchRequesting
                trackingForm.Trackable = pTrackable
                'ReOrder of container level 
                If (trackingForm.TrackingTable > 0) Then
                    newLevel = trackingForm.TrackingTable
                Else
                    newLevel = 0
                End If
                If (ptableEntity.TrackingTable <> trackingForm.TrackingTable) Then
                    ptableEntity.TrackingTable = Nothing
                    For Each tbObject As Table In ptableByLevel
                        If (tbObject.TrackingTable <= newLevel And tbObject.TableName <> trackingForm.TableName) Then
                            modifyTable.Add(tbObject)
                        End If
                    Next
                    If (Not (newLevel = 0)) Then
                        modifyTable.Add(ptableEntity)
                    Else
                        ptableEntity.TrackingTable = 0
                    End If
                    For Each tbObject As Table In ptableByLevel
                        If (tbObject.TrackingTable > newLevel And tbObject.TrackingTable <> trackingForm.TrackingTable) Then
                            modifyTable.Add(tbObject)
                        End If
                    Next
                    Dim iLevel As Integer = 1
                    For Each tbObject As Table In modifyTable
                        tbObject.TrackingTable = iLevel
                        iLevel = iLevel + 1
                    Next
                    For Each tbObject As Table In modifyTable
                        If (Not (tbObject.TableName.Trim.ToLower.Equals(trackingForm.TableName.Trim.ToLower))) Then
                            _iTable.Update(tbObject)
                        End If
                    Next
                End If

                Dim mbIsSysAdmin = DataServices.IsSysAdmin(ptableEntity.TableName, mbADOCon)

                'added by kirti'
                If (mbIsSysAdmin) Then
                    If ((trackingForm.TrackingOUTFieldName IsNot Nothing) And (trackingForm.TrackingOUTFieldName <> "0")) Then
                        AddFieldIfNeeded(trackingForm.TrackingOUTFieldName, ptableEntity, "BIT")
                    End If
                    If ((trackingForm.TrackingDueBackDaysFieldName IsNot Nothing) And (trackingForm.TrackingDueBackDaysFieldName <> "0")) Then
                        AddFieldIfNeeded(trackingForm.TrackingDueBackDaysFieldName, ptableEntity, "INT")
                    End If
                    If ((trackingForm.TrackingACTIVEFieldName IsNot Nothing) And (trackingForm.TrackingACTIVEFieldName <> "0")) Then
                        AddFieldIfNeeded(trackingForm.TrackingACTIVEFieldName, ptableEntity, "BIT")
                    End If
                    If ((trackingForm.TrackingRequestableFieldName IsNot Nothing) And (trackingForm.TrackingRequestableFieldName <> "0")) Then
                        AddFieldIfNeeded(trackingForm.TrackingRequestableFieldName, ptableEntity, "BIT")
                    End If
                    If ((trackingForm.InactiveLocationField IsNot Nothing) And (trackingForm.InactiveLocationField <> "0")) Then
                        AddFieldIfNeeded(trackingForm.InactiveLocationField, ptableEntity, "BIT")
                    End If
                    If ((trackingForm.ArchiveLocationField IsNot Nothing) And (trackingForm.ArchiveLocationField <> "0")) Then
                        AddFieldIfNeeded(trackingForm.ArchiveLocationField, ptableEntity, "BIT")
                    End If
                    If ((trackingForm.OperatorsIdField IsNot Nothing) And (trackingForm.OperatorsIdField <> "0")) Then
                        AddFieldIfNeeded(trackingForm.OperatorsIdField, ptableEntity, "VARCHAR(30)")
                    End If
                    If ((trackingForm.TrackingPhoneFieldName IsNot Nothing) And (trackingForm.TrackingPhoneFieldName <> "0")) Then
                        AddFieldIfNeeded(trackingForm.TrackingPhoneFieldName, ptableEntity, "VARCHAR(30)")
                    End If
                    If ((trackingForm.TrackingMailStopFieldName IsNot Nothing) And (trackingForm.TrackingMailStopFieldName <> "0")) Then
                        AddFieldIfNeeded(trackingForm.TrackingMailStopFieldName, ptableEntity, "VARCHAR(30)")
                    End If
                    If ((trackingForm.TrackingEmailFieldName IsNot Nothing) And (trackingForm.TrackingEmailFieldName <> "0")) Then
                        AddFieldIfNeeded(trackingForm.TrackingEmailFieldName, ptableEntity, "VARCHAR(320)")
                    End If
                    If ((trackingForm.SignatureRequiredFieldName IsNot Nothing) And (trackingForm.SignatureRequiredFieldName <> "0")) Then
                        AddFieldIfNeeded(trackingForm.SignatureRequiredFieldName, ptableEntity, "VARCHAR(320)")
                    End If

                End If

                'Delete/Modify/Add Tracking Status Field
                Dim IsSysAdminTracking = DataServices.IsSysAdmin("TrackingStatus", sADOConnDefault)
                IsSysAdminTracking = IsSysAdminTracking And DataServices.IsSysAdmin("AssetStatus", sADOConnDefault)
                IsSysAdminTracking = IsSysAdminTracking And DataServices.IsSysAdmin("TrackingHistory", sADOConnDefault)
                If (Not String.IsNullOrEmpty(trackingForm.TrackingStatusFieldName)) Then
                    If (Not String.IsNullOrEmpty(ptableEntity.TrackingStatusFieldName)) Then
                        If (IsSysAdminTracking And (Not trackingForm.TrackingStatusFieldName.Trim.ToLower.Equals(ptableEntity.TrackingStatusFieldName.Trim.ToLower))) Then
                            Dim boolSQLVal
                            Dim indexStatusSQL = "EXEC sp_rename N'TrackingStatus." + ptableEntity.TrackingStatusFieldName + "',N'" + trackingForm.TrackingStatusFieldName + "',N'INDEX'"
                            boolSQLVal = DataServices.ProcessADOCommand(indexStatusSQL, sADOConnDefault, False)
                            If (boolSQLVal) Then
                                Dim indexHistorySQL = "EXEC sp_rename N'TrackingHistory." + ptableEntity.TrackingStatusFieldName + "',N'" + trackingForm.TrackingStatusFieldName + "',N'INDEX'"
                                boolSQLVal = DataServices.ProcessADOCommand(indexHistorySQL, sADOConnDefault, False)
                            End If
                            If (boolSQLVal) Then
                                Dim indexAssetSQL = "EXEC sp_rename N'AssetStatus." + ptableEntity.TrackingStatusFieldName + "',N'" + trackingForm.TrackingStatusFieldName + "',N'INDEX'"
                                boolSQLVal = DataServices.ProcessADOCommand(indexAssetSQL, sADOConnDefault, False)
                            End If
                            If (boolSQLVal) Then
                                Dim updateStatusSQL = "EXEC sp_rename N'TrackingStatus." + ptableEntity.TrackingStatusFieldName + "',N'" + trackingForm.TrackingStatusFieldName + "',N'COLUMN'"
                                boolSQLVal = DataServices.ProcessADOCommand(updateStatusSQL, sADOConnDefault, False)
                            End If
                            If (boolSQLVal) Then
                                Dim updateHistorySQL = "EXEC sp_rename N'TrackingHistory." + ptableEntity.TrackingStatusFieldName + "',N'" + trackingForm.TrackingStatusFieldName + "',N'COLUMN'"
                                boolSQLVal = DataServices.ProcessADOCommand(updateHistorySQL, sADOConnDefault, False)
                            End If
                            If (boolSQLVal) Then
                                Dim updateAssetSQL = "EXEC sp_rename N'AssetStatus." + ptableEntity.TrackingStatusFieldName + "',N'" + trackingForm.TrackingStatusFieldName + "',N'COLUMN'"
                                boolSQLVal = DataServices.ProcessADOCommand(updateAssetSQL, sADOConnDefault, False)
                            End If
                            If (Not boolSQLVal) Then
                                Keys.ErrorType = "e"
                                Keys.ErrorMessage = Keys.ErrorMessageJS
                            End If

                        End If
                    Else
                        If (IsSysAdminTracking) Then
                            Dim boolProcessSQL
                            Dim trackingStatusSQL = "ALTER TABLE [TrackingStatus] ADD [" + trackingForm.TrackingStatusFieldName + "] VARCHAR(30) NULL"
                            boolProcessSQL = DataServices.ProcessADOCommand(trackingStatusSQL, sADOConnDefault, False)
                            If (boolProcessSQL) Then
                                Dim trackingHistorySQL = "ALTER TABLE [TrackingHistory] ADD [" + trackingForm.TrackingStatusFieldName + "] VARCHAR(30) NULL"
                                boolProcessSQL = DataServices.ProcessADOCommand(trackingHistorySQL, sADOConnDefault, False)
                            End If
                            If (boolProcessSQL) Then
                                Dim assetStatusSQL = "ALTER TABLE [AssetStatus] ADD [" + trackingForm.TrackingStatusFieldName + "] VARCHAR(30) NULL"
                                boolProcessSQL = DataServices.ProcessADOCommand(assetStatusSQL, sADOConnDefault, False)
                            End If
                            If (boolProcessSQL) Then
                                Dim iStatusSQL = "CREATE UNIQUE INDEX " + trackingForm.TrackingStatusFieldName + " ON [TrackingStatus] ([" + trackingForm.TrackingStatusFieldName + "], [Id])"
                                boolProcessSQL = DataServices.ProcessADOCommand(iStatusSQL, sADOConnDefault, False)
                            End If
                            If (boolProcessSQL) Then
                                Dim iHistorySQL = "CREATE UNIQUE INDEX " + trackingForm.TrackingStatusFieldName + " ON [TrackingHistory] ([" + trackingForm.TrackingStatusFieldName + "], [Id])"
                                boolProcessSQL = DataServices.ProcessADOCommand(iHistorySQL, sADOConnDefault, False)
                            End If
                            If (boolProcessSQL) Then
                                Dim iAssetSQL = "CREATE UNIQUE INDEX " + trackingForm.TrackingStatusFieldName + " ON [AssetStatus] ([" + trackingForm.TrackingStatusFieldName + "], [Id])"
                                boolProcessSQL = DataServices.ProcessADOCommand(iAssetSQL, sADOConnDefault, False)
                            End If
                            If (Not boolProcessSQL) Then
                                Keys.ErrorType = "e"
                                Keys.ErrorMessage = Keys.ErrorMessageJS
                            End If

                        End If
                    End If

                Else
                    If (FieldFlag) Then
                        If (IsSysAdminTracking And (Not (ptableEntity.TrackingStatusFieldName Is Nothing))) Then
                            Dim boolProcessSQL
                            boolProcessSQL = DataServices.RemoveTrackingStatusField(sADOConnDefault, "TrackingStatus", ptableEntity.TrackingStatusFieldName)
                            If (boolProcessSQL) Then
                                boolProcessSQL = DataServices.RemoveTrackingStatusField(sADOConnDefault, "TrackingHistory", ptableEntity.TrackingStatusFieldName)
                            End If
                            If (boolProcessSQL) Then
                                boolProcessSQL = DataServices.RemoveTrackingStatusField(sADOConnDefault, "AssetStatus", ptableEntity.TrackingStatusFieldName)
                            End If
                            If (Not boolProcessSQL) Then
                                Keys.ErrorType = "e"
                                Keys.ErrorMessage = Keys.ErrorMessageJS
                            End If
                        End If
                    End If

                End If
                If (trackingForm.TrackingTable = 0) Then
                    ptableEntity.TrackingTable = 0
                End If
                ptableEntity.TrackingStatusFieldName = trackingForm.TrackingStatusFieldName
                If trackingForm.OutTable Is Nothing Then
                    ptableEntity.OutTable = 0 'Set Default Use out Field
                Else
                    ptableEntity.OutTable = CShort(trackingForm.OutTable)
                End If
                '' Condition changed by hasmukh for fix [FUS-1914]
                If (Not String.IsNullOrEmpty(trackingForm.TrackingDueBackDaysFieldName) And trackingForm.TrackingDueBackDaysFieldName <> "0") Then
                    ptableEntity.TrackingDueBackDaysFieldName = trackingForm.TrackingDueBackDaysFieldName
                ElseIf (trackingForm.TrackingDueBackDaysFieldName = "0") Then
                    ptableEntity.TrackingDueBackDaysFieldName = Nothing
                End If

                If (Not String.IsNullOrEmpty(trackingForm.TrackingOUTFieldName) And trackingForm.TrackingOUTFieldName <> "0") Then
                    ptableEntity.TrackingOUTFieldName = trackingForm.TrackingOUTFieldName
                ElseIf (trackingForm.TrackingOUTFieldName = "0") Then
                    ptableEntity.TrackingOUTFieldName = Nothing
                End If

                If (Not String.IsNullOrEmpty(trackingForm.TrackingACTIVEFieldName) And trackingForm.TrackingACTIVEFieldName <> "0") Then
                    ptableEntity.TrackingACTIVEFieldName = trackingForm.TrackingACTIVEFieldName
                ElseIf (trackingForm.TrackingACTIVEFieldName = "0") Then
                    ptableEntity.TrackingACTIVEFieldName = Nothing
                End If

                If (Not String.IsNullOrEmpty(trackingForm.TrackingEmailFieldName) And trackingForm.TrackingEmailFieldName <> "0") Then
                    ptableEntity.TrackingEmailFieldName = trackingForm.TrackingEmailFieldName
                ElseIf (trackingForm.TrackingEmailFieldName = "0") Then
                    ptableEntity.TrackingEmailFieldName = Nothing
                End If

                If (Not String.IsNullOrEmpty(trackingForm.TrackingRequestableFieldName) And trackingForm.TrackingRequestableFieldName <> "0") Then
                    ptableEntity.TrackingRequestableFieldName = trackingForm.TrackingRequestableFieldName
                ElseIf (trackingForm.TrackingRequestableFieldName = "0") Then
                    ptableEntity.TrackingRequestableFieldName = Nothing
                End If

                If (Not String.IsNullOrEmpty(trackingForm.TrackingPhoneFieldName) And trackingForm.TrackingPhoneFieldName <> "0") Then
                    ptableEntity.TrackingPhoneFieldName = trackingForm.TrackingPhoneFieldName
                ElseIf (trackingForm.TrackingPhoneFieldName = "0") Then
                    ptableEntity.TrackingPhoneFieldName = Nothing
                End If

                If (Not String.IsNullOrEmpty(trackingForm.InactiveLocationField) And trackingForm.InactiveLocationField <> "0") Then
                    ptableEntity.InactiveLocationField = trackingForm.InactiveLocationField
                ElseIf (trackingForm.InactiveLocationField = "0") Then
                    ptableEntity.InactiveLocationField = Nothing
                End If

                If (Not String.IsNullOrEmpty(trackingForm.TrackingMailStopFieldName) And trackingForm.TrackingMailStopFieldName <> "0") Then
                    ptableEntity.TrackingMailStopFieldName = trackingForm.TrackingMailStopFieldName
                ElseIf (trackingForm.TrackingMailStopFieldName = "0") Then
                    ptableEntity.TrackingMailStopFieldName = Nothing
                End If

                If (Not String.IsNullOrEmpty(trackingForm.ArchiveLocationField) And trackingForm.ArchiveLocationField <> "0") Then
                    ptableEntity.ArchiveLocationField = trackingForm.ArchiveLocationField
                ElseIf (trackingForm.ArchiveLocationField = "0") Then
                    ptableEntity.ArchiveLocationField = Nothing
                End If

                If (Not String.IsNullOrEmpty(trackingForm.OperatorsIdField) And trackingForm.OperatorsIdField <> "0") Then
                    ptableEntity.OperatorsIdField = trackingForm.OperatorsIdField
                ElseIf (trackingForm.OperatorsIdField = "0") Then
                    ptableEntity.OperatorsIdField = Nothing
                End If

                If (Not String.IsNullOrEmpty(trackingForm.SignatureRequiredFieldName) And trackingForm.SignatureRequiredFieldName <> "0") Then
                    ptableEntity.SignatureRequiredFieldName = trackingForm.SignatureRequiredFieldName
                ElseIf (trackingForm.SignatureRequiredFieldName = "0") Then
                    ptableEntity.SignatureRequiredFieldName = Nothing
                End If

                If (Not trackingForm.DefaultTrackingId Is Nothing) Then
                    ptableEntity.DefaultTrackingId = trackingForm.DefaultTrackingId
                    If (oTrackingTable IsNot Nothing) Then
                        ptableEntity.DefaultTrackingTable = oTrackingTable.TableName.Trim()
                    End If
                Else
                    ptableEntity.DefaultTrackingTable = Nothing
                    ptableEntity.DefaultTrackingId = Nothing
                End If
                Dim bRequestObj = _iSecureObject.All.Where(Function(m) m.Name.Trim.ToLower.Equals(trackingForm.TableName.Trim.ToLower) And m.SecureObjectTypeID = Enums.SecureObjects.Table).FirstOrDefault
                Dim bTransferObj = _iSecureObject.All.Where(Function(m) m.Name.Trim.ToLower.Equals(trackingForm.TableName.Trim.ToLower) And m.SecureObjectTypeID = Enums.SecureObjects.Table).FirstOrDefault
                If (trackingForm.Trackable) Then
                    AddSecureObjectPermission(bTransferObj.SecureObjectID, Enums.PassportPermissions.Transfer)
                Else
                    Dim bTransferPermissionId = GetSecureObjPermissionId(bTransferObj.SecureObjectID, Enums.PassportPermissions.Transfer)
                    RemoveSecureObjectPermission(bTransferPermissionId)
                End If
                ptableEntity.Trackable = trackingForm.Trackable
                ptableEntity.AllowBatchRequesting = trackingForm.AllowBatchRequesting
                If (trackingForm.AllowBatchRequesting) Then
                    AddSecureObjectPermission(bRequestObj.SecureObjectID, Enums.PassportPermissions.Request)
                Else
                    Dim bRequestPermissionId = GetSecureObjPermissionId(bRequestObj.SecureObjectID, Enums.PassportPermissions.Request)
                    RemoveSecureObjectPermission(bRequestPermissionId)
                End If
                Keys.UpdatePermission()
                ptableEntity.AutoAddNotification = trackingForm.AutoAddNotification
                _iTable.Update(ptableEntity)
                AddTrackableInScanList(ptableEntity)
                warnMsgJSON = VerifyRetentionDispositionTypesForParentAndChildren(ptableEntity.TableId)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRecordUpdatedSuccessfully")
                _iTrackingHistory.CommitTransaction()
                _iTrackingStatus.CommitTransaction()
                _iAssetStatus.CommitTransaction()
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessage
                _iTrackingHistory.RollBackTransaction()
                _iAssetStatus.RollBackTransaction()
                _iTrackingStatus.RollBackTransaction()
            End Try

            Return Json(New With {
                        Key .warnMsgJSON = warnMsgJSON,
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Sub AddTrackableInScanList(ByVal ptableEntity As Table)
            Try
                _iScanList.BeginTransaction()
                If (ptableEntity.Trackable = True Or ptableEntity.TrackingTable > 0) Then
                    Dim oScanList = _iScanList.All()
                    Dim oTableIdFieldName = DatabaseMap.RemoveTableNameFromField(ptableEntity.IdFieldName.Trim().ToLower())
                    Dim containScanObj = oScanList.Any(Function(m) m.TableName.Trim().ToLower().Equals(ptableEntity.TableName.Trim().ToLower()) And m.FieldName.Trim().ToLower().Equals(oTableIdFieldName))

                    If (Not containScanObj) Then
                        Dim oScanObject As New ScanList
                        oScanObject.TableName = ptableEntity.TableName.Trim()
                        oScanObject.FieldName = DatabaseMap.RemoveTableNameFromField(ptableEntity.IdFieldName)
                        Dim conObj = DataServices.DBOpen(ptableEntity, _iDatabas.All())
                        Dim oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(ptableEntity.TableName, conObj, oScanObject.FieldName)
                        oScanObject.FieldType = oSchemaColumns(0).DataType
                        oScanObject.IdMask = ptableEntity.IdMask
                        oScanObject.IdStripChars = ptableEntity.IdStripChars
                        If (oScanList.Count() > 0) Then
                            oScanObject.ScanOrder = oScanList.Count() + 1
                        Else
                            oScanObject.ScanOrder = 1
                        End If
                        _iScanList.Add(oScanObject)
                    End If
                Else
                    Dim oScanListOfCurrentTable = _iScanList.Where(Function(m) m.TableName.Trim().ToLower().Equals(ptableEntity.TableName.Trim().ToLower()))
                    If (oScanListOfCurrentTable IsNot Nothing) Then
                        _iScanList.DeleteRange(oScanListOfCurrentTable)
                    End If
                    Dim oScanListAll = _iScanList.All().OrderBy(Function(x) x.ScanOrder)
                    Dim oScanOrder = 1
                    For Each oScanObj As ScanList In oScanListAll
                        oScanObj.ScanOrder = oScanOrder
                        oScanOrder = oScanOrder + 1
                        _iScanList.Update(oScanObj)
                    Next
                End If
                _iScanList.CommitTransaction()
            Catch ex As Exception
                _iScanList.RollBackTransaction()
                Throw
            End Try
        End Sub

        Private Sub AddFieldIfNeeded(fieldName As String, ptableEntity As Table, Dtype As String)
            Dim sSQLStr As String
            Dim FieldExist As Boolean
            'Dim sADOConnDefault As ADODB.Connection = DataServices.DBOpen() Default Connection
            'local + external db connection'
            Dim sADOConn As ADODB.Connection = DataServices.DBOpen()
            If (Not (ptableEntity Is Nothing)) Then
                sADOConn = DataServices.DBOpen(ptableEntity, _iDatabas.All())
            End If

            Dim schemaColumnList = SchemaInfoDetails.GetSchemaInfo(ptableEntity.TableName, sADOConn)
            FieldExist = schemaColumnList.Any(Function(x) x.ColumnName = fieldName)
            If (Not FieldExist) Then
                sSQLStr = "ALTER TABLE [" & ptableEntity.TableName & "]"
                sSQLStr = sSQLStr & " ADD [" & Trim$(fieldName) & "] " & Dtype & " NULL"
                Select Case Dtype
                    Case "BIT", "TINYINT"
                        sSQLStr = sSQLStr & " DEFAULT 0"
                    Case Else
                End Select
                Dim boolSQLVal = DataServices.ProcessADOCommand(sSQLStr, sADOConn, False)

            End If
            Exit Sub
        End Sub

        Public Function GetTableEntity(containerInfo As Integer, tableName As String, Optional statusFieldText As String = "") As ActionResult
            Dim tableObject = Nothing
            Try
                Dim sADOConnDefault = DataServices.DBOpen()
                Dim tableEntity = _iTable.All.OrderBy(Function(m) m.TableId)
                Dim schemaColumnList As New List(Of SchemaColumns)
                Dim oTable = tableEntity.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower)).FirstOrDefault()
                Keys.ErrorType = "s"
                Keys.ErrorMessage = ""

                If (containerInfo.Equals(0)) Then
                    If (Not (oTable.TrackingStatusFieldName Is Nothing)) Then
                        Keys.ErrorType = "r"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlRemove"), oTable.TrackingStatusFieldName)
                        Exit Try
                    End If
                End If
                If (Not String.IsNullOrEmpty(statusFieldText)) Then
                    Dim IsSameOrNot = False
                    Select Case UCase$(Trim$(statusFieldText))
                        Case "USERNAME", "DATEDUE", "ID", "TRACKEDTABLEID", "TRACKEDTABLE", "TRANSACTIONDATETIME", "PROCESSEDDATETIME", "OUT", "TRACKINGADDITIONALFIELD1", "TRACKINGADDITIONALFIELD2", "ISACTUALSCAN", "BATCHID"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlSystemFieldNotUsed"), statusFieldText)
                            Keys.ErrorType = "w"
                            Exit Try
                        Case Else
                    End Select
                    Dim tsTable = _iTable.All.Where(Function(m) m.TrackingStatusFieldName.Trim.ToLower.Equals(statusFieldText.Trim.ToLower)).FirstOrDefault
                    If (tsTable IsNot Nothing) Then
                        If (Not tsTable.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower)) Then
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlAlreadyUsedAsTrackingStatusField"), statusFieldText, tsTable.UserName)
                            Keys.ErrorType = "w"
                        End If
                    End If
                End If
            Catch ex As Exception
                Keys.ErrorMessage = ex.Message
                Keys.ErrorType = "e"

            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetTrackingDestination(tableName As String, ConfigureTransfer As Boolean, TransferValue As Boolean, RequestVal As Boolean) As ActionResult
            Try
                Dim tableTracking As New Table
                Dim tableEntity As New Table
                Dim myBasePage As New BaseWebPage
                'Dim bHasTrackPermission As Boolean
                Dim bRequestPermission As Boolean
                Dim bTransferPermission As Boolean
                Dim bOrderByField As Boolean
                Dim sSQL As String
                Dim sNoRecordMsg As String
                Dim sOrderByFieldName As String = String.Empty
                Dim sADOConn As ADODB.Connection = DataServices.DBOpen()
                Dim rs As ADODB.Recordset
                tableTracking = _iTable.All.Where(Function(m) m.TrackingTable = 1).FirstOrDefault()
                If (Not String.IsNullOrEmpty(tableName)) Then
                    tableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower)).FirstOrDefault
                End If
                'Get ADO Connection
                If (Not (tableTracking Is Nothing)) Then
                    sADOConn = DataServices.DBOpen(tableTracking, _iDatabas.All())
                End If
                If (ConfigureTransfer) Then
                    bRequestPermission = RequestVal
                    bTransferPermission = TransferValue
                Else
                    If (Not (myBasePage Is Nothing)) Then
                        bRequestPermission = myBasePage.Passport.CheckSetting(tableName, Enums.SecureObjects.Table, Enums.PassportPermissions.Request)
                        bTransferPermission = myBasePage.Passport.CheckSetting(tableName, Enums.SecureObjects.Table, Enums.PassportPermissions.Transfer)
                    End If
                End If

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim bRequestPermissionJSON = JsonConvert.SerializeObject(bRequestPermission, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim bTransferPermissionJSON = JsonConvert.SerializeObject(bTransferPermission, Newtonsoft.Json.Formatting.Indented, Setting)

                If (Not (tableEntity Is Nothing)) Then
                    If (tableEntity.TrackingTable <> 1) Then
                        If (bTransferPermission) Then
                            If (Not (tableTracking Is Nothing)) Then

                                If (String.IsNullOrEmpty(tableTracking.DescFieldNameOne) And String.IsNullOrEmpty(tableTracking.DescFieldNameTwo)) Then
                                    bOrderByField = True
                                Else
                                    bOrderByField = False
                                End If
                                sSQL = "Select * from [" + tableTracking.TableName + "]"
                                rs = DataServices.GetADORecordSet(sSQL, sADOConn)
                                If (Not rs.EOF) Then
                                    If (Not String.IsNullOrEmpty(tableTracking.TrackingACTIVEFieldName)) Then
                                        sSQL = "Select * From [" + tableTracking.TableName + "] Where [" + DatabaseMap.RemoveTableNameFromField(tableTracking.TrackingACTIVEFieldName) + "] <> 0"
                                    Else
                                        sSQL = "Select * from [" + tableTracking.TableName + "]"
                                    End If
                                    If (bOrderByField) Then
                                        sOrderByFieldName = DatabaseMap.RemoveTableNameFromField(tableTracking.IdFieldName)
                                    Else
                                        If (Not String.IsNullOrEmpty(tableTracking.DescFieldNameOne)) Then
                                            sOrderByFieldName = DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameOne)
                                        ElseIf (Not String.IsNullOrEmpty(tableTracking.DescFieldNameTwo)) Then
                                            sOrderByFieldName = DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameTwo)
                                        End If
                                    End If
                                    sSQL = sSQL & " Order By [" + sOrderByFieldName + "]"
                                    rs = DataServices.GetADORecordSet(sSQL, sADOConn)
                                End If

                                If (Not (rs.EOF)) Then
                                    Dim colVisible As Boolean = False
                                    Dim col1Visible As Boolean = False
                                    Dim col2Visible As Boolean = False
                                    Dim col1DataField = ""
                                    Dim col2DataField = ""
                                    Dim table As New DataTable
                                    Dim colDataField = rs.Fields(DatabaseMap.RemoveTableNameFromField(tableTracking.IdFieldName)).Name
                                    Dim colDataFieldJSON = ""
                                    Dim col1DataFieldJSON = ""
                                    Dim col2DataFieldJSON = ""
                                    colVisible = String.IsNullOrEmpty(col1DataField)

                                    If ((tableTracking.IdFieldName IsNot Nothing) And (Not String.IsNullOrEmpty(tableTracking.IdFieldName))) Then
                                        If (Not String.IsNullOrEmpty(tableTracking.DescFieldNameOne)) Then
                                            col1Visible = Not StrComp(DatabaseMap.RemoveTableNameFromField(tableTracking.IdFieldName), DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameOne)) = 0
                                            If (col1Visible) Then
                                                col1DataField = rs.Fields(DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameOne)).Name
                                                If (Not String.IsNullOrEmpty(tableTracking.DescFieldNameTwo)) Then
                                                    col2Visible = Not StrComp(DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameTwo), DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameOne)) = 0
                                                    If (col2Visible) Then
                                                        col2Visible = Not StrComp(DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameTwo), DatabaseMap.RemoveTableNameFromField(tableTracking.IdFieldName)) = 0
                                                        If (col2Visible) Then
                                                            col2DataField = rs.Fields(DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameTwo)).Name
                                                        End If
                                                    End If
                                                End If
                                            Else
                                                If (Not String.IsNullOrEmpty(tableTracking.DescFieldNameTwo)) Then
                                                    col2Visible = Not StrComp(DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameTwo), DatabaseMap.RemoveTableNameFromField(tableTracking.IdFieldName)) = 0
                                                    If (col2Visible) Then
                                                        col2DataField = rs.Fields(DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameTwo)).Name
                                                    End If
                                                End If
                                            End If
                                        ElseIf (Not String.IsNullOrEmpty(tableTracking.DescFieldNameTwo)) Then
                                            col2Visible = Not StrComp(DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameTwo), DatabaseMap.RemoveTableNameFromField(tableTracking.IdFieldName)) = 0
                                            If (col2Visible) Then
                                                col2DataField = rs.Fields(DatabaseMap.RemoveTableNameFromField(tableTracking.DescFieldNameTwo)).Name
                                            End If
                                        End If
                                    End If

                                    If (Not String.IsNullOrEmpty(colDataField)) Then
                                        table.Columns.Add(New DataColumn(colDataField))
                                        If (col1Visible) Then
                                            If (Not table.Columns.Contains(col1DataField)) Then
                                                table.Columns.Add(New DataColumn(col1DataField))
                                            End If
                                        End If
                                        If (col2Visible) Then
                                            If (Not table.Columns.Contains(col2DataField)) Then
                                                table.Columns.Add(New DataColumn(col2DataField))
                                            End If
                                        End If
                                    End If

                                    Do Until rs.EOF
                                        Dim rowObj As DataRow = table.NewRow
                                        If (Not String.IsNullOrEmpty(colDataField)) Then
                                            If (rs.Fields(colDataField).Type = Enums.DataTypeEnum.rmBinary) Then
                                                rowObj(colDataField) = ""
                                            Else
                                                If (IsDBNull(rs.Fields(colDataField).Value)) Then
                                                    rowObj(colDataField) = ""
                                                Else
                                                    rowObj(colDataField) = rs.Fields(colDataField).Value
                                                End If
                                            End If
                                        End If
                                        If (col1Visible) Then
                                            If (rs.Fields(col1DataField).Type = Enums.DataTypeEnum.rmBinary) Then
                                                rowObj(col1DataField) = ""
                                            Else
                                                If (IsDBNull(rs.Fields(col1DataField).Value)) Then
                                                    rowObj(col1DataField) = ""
                                                Else
                                                    rowObj(col1DataField) = rs.Fields(col1DataField).Value
                                                End If
                                            End If
                                        End If
                                        If (col2Visible) Then
                                            If (rs.Fields(col2DataField).Type = Enums.DataTypeEnum.rmBinary) Then
                                                rowObj(col2DataField) = ""
                                            Else
                                                If (IsDBNull(rs.Fields(col2DataField).Value)) Then
                                                    rowObj(col2DataField) = ""
                                                Else
                                                    rowObj(col2DataField) = rs.Fields(col2DataField).Value
                                                End If
                                            End If
                                        End If
                                        table.Rows.Add(rowObj)
                                        rs.MoveNext()
                                    Loop

                                    If (Not String.IsNullOrEmpty(colDataField)) Then
                                        colDataFieldJSON = JsonConvert.SerializeObject(colDataField, Newtonsoft.Json.Formatting.Indented, Setting)

                                    End If
                                    If (col1Visible) Then
                                        col1DataFieldJSON = JsonConvert.SerializeObject(col1DataField, Newtonsoft.Json.Formatting.Indented, Setting)

                                    End If
                                    If (col2Visible) Then
                                        col2DataFieldJSON = JsonConvert.SerializeObject(col2DataField, Newtonsoft.Json.Formatting.Indented, Setting)

                                    End If
                                    'rs.Fields(DatabaseMap.RemoveTableNameFromField(tableTracking.IdFieldName))

                                    Dim colVisibleJSON = JsonConvert.SerializeObject(colVisible, Newtonsoft.Json.Formatting.Indented, Setting)
                                    Dim col1VisibleJSON = JsonConvert.SerializeObject(col1Visible, Newtonsoft.Json.Formatting.Indented, Setting)
                                    Dim col2VisibleJSON = JsonConvert.SerializeObject(col2Visible, Newtonsoft.Json.Formatting.Indented, Setting)
                                    Dim sRecordJSON = JsonConvert.SerializeObject(table, Newtonsoft.Json.Formatting.Indented, Setting)
                                    Dim tableObjectJSON = JsonConvert.SerializeObject(tableEntity, Newtonsoft.Json.Formatting.Indented, Setting)
                                    'End If
                                    Keys.ErrorMessage = ""
                                    Keys.ErrorType = "s"
                                    Dim returnJson = Json(New With {
                                    Key .sRecordJSON = sRecordJSON,
                                        Key .colVisibleJSON = colVisibleJSON,
                                        Key .col1VisibleJSON = col1VisibleJSON,
                                        Key .col2VisibleJSON = col2VisibleJSON,
                                        Key .colDataFieldJSON = colDataFieldJSON,
                                        Key .col1DataFieldJSON = col1DataFieldJSON,
                                        Key .col2DataFieldJSON = col2DataFieldJSON,
                                        Key .bRequestPermissionJSON = bRequestPermissionJSON,
                                        Key .bTransferPermissionJSON = bTransferPermissionJSON,
                                        Key .tableObjectJSON = tableObjectJSON,
                                        Key .errortype = Keys.ErrorType,
                                        Key .message = Keys.ErrorMessage
                                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
                                    returnJson.MaxJsonLength = Integer.MaxValue 'FUS-2304 fixes.
                                    Return returnJson
                                Else
                                    Keys.ErrorType = "w"
                                    Keys.ErrorMessage = ""
                                    sNoRecordMsg = Languages.Translation("msgAdminCtrlLvl1TrackingTblHvNoRecords")
                                    Dim sNoRecordMsgJSON = JsonConvert.SerializeObject(sNoRecordMsg, Newtonsoft.Json.Formatting.Indented, Setting)
                                    Return Json(New With {
                                    Key .sNoRecordMsgJSON = sNoRecordMsgJSON,
                                    Key .bRequestPermissionJSON = bRequestPermissionJSON,
                                    Key .bTransferPermissionJSON = bTransferPermissionJSON,
                                    Key .errortype = Keys.ErrorType,
                                    Key .message = Keys.ErrorMessage
                                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
                                End If
                            End If
                        End If
                    End If
                End If
                Keys.ErrorMessage = ""
                Keys.ErrorType = "r"
                Return Json(New With {
            Key .bRequestPermissionJSON = bRequestPermissionJSON,
            Key .bTransferPermissionJSON = bTransferPermissionJSON,
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Keys.ErrorType = "e"
                Return Json(New With {
        Key .errortype = Keys.ErrorType,
        Key .message = Keys.ErrorMessage
        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try

        End Function
#End Region

#Region "Retention"
        'Load View for Tables Retention tab.
        Function LoadTablesRetentionView() As PartialViewResult
            Return PartialView("_TablesRetentionPartial")
        End Function
#End Region

#Region "File Room Order"

        'Load View for Tables Retention tab.
        Function LoadTablesFileRoomOrderView() As PartialViewResult
            Return PartialView("_TableFileRoomOrder")
        End Function

        'Get the records for File Room Order
        Function GetListOfFileRoomOrders(sidx As String, sord As String, page As Integer, rows As Integer, pTableName As String) As JsonResult

            Dim pFileRoomOrderEntities = From t In _iSLTableFileRoomOrder.All().Where(Function(x) x.TableName = pTableName)
                                         Select t.Id, t.FieldName, t.StartFromFront, t.StartingPosition, t.NumberofCharacters

            Dim jsonData = pFileRoomOrderEntities.GetJsonListForGrid(sord, page, rows, "FieldName")

            Return Json(jsonData, JsonRequestBehavior.AllowGet)
        End Function

        'Get list of Field Name's
        Function GetListOfFieldNames(pTableName As String) As ActionResult

            Dim lstFieldNames As List(Of String) = New List(Of String)
            Dim sADOConn As ADODB.Connection

            'Dim sADOConn = DataServices.DBOpen(Enums.eConnectionType.conDefault, Nothing)
            Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableName.Trim().ToLower())).FirstOrDefault()
            sADOConn = DataServices.DBOpen(oTables, _iDatabas.All())
            Dim schemaColumnList As List(Of SchemaColumns) = SchemaInfoDetails.GetSchemaInfo(pTableName, sADOConn)

            For Each schemaColumnObj As SchemaColumns In schemaColumnList
                If (Not SchemaInfoDetails.IsSystemField(schemaColumnObj.ColumnName)) Then
                    If (SchemaInfoDetails.IsAStringType(schemaColumnObj.DataType)) Then
                        lstFieldNames.Add(schemaColumnObj.ColumnName & " (String: padded with spaces)")
                    ElseIf (SchemaInfoDetails.IsADateType(schemaColumnObj.DataType)) Then
                        lstFieldNames.Add(schemaColumnObj.ColumnName & " (Date: mm/dd/yyyy)")
                    ElseIf (SchemaInfoDetails.IsANumericType(schemaColumnObj.DataType)) Then
                        lstFieldNames.Add(schemaColumnObj.ColumnName & " (Numeric: padded with leading zeros)")
                    End If
                End If
            Next

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects

            Dim lstFieldNamesObj = JsonConvert.SerializeObject(lstFieldNames, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(New With {
                            Key .lstFieldNames = lstFieldNamesObj
                            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

        End Function

        'Get the details for Edit Operation of File Room Order.
        Function EditFileRoomOrderRecord(pRowSelected As Array, pRecordId As Integer) As ActionResult

            If pRowSelected Is Nothing Then
                Return Json(New With {Key .success = False})
            End If
            If pRowSelected.Length = 0 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pFileRoomOrderEntity = _iSLTableFileRoomOrder.All().Where(Function(x) x.Id = pRecordId).FirstOrDefault()

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pFileRoomOrderEntity, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Save the file room order record.
        Function SetFileRoomOrderRecord(pFileRoomOrder As SLTableFileRoomOrder, pTableName As String, pStartFromFront As Boolean) As ActionResult
            Dim pFieldLength As Integer = 0
            Dim ErrMsg As String = ""
            Dim IsDateField As Boolean = False
            Dim ErrStatus As Boolean = False
            Dim sADOConn As ADODB.Connection

            Try
                'Dim sADOConn = DataServices.DBOpen(Enums.eConnectionType.conDefault, Nothing)
                Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableName.Trim().ToLower())).FirstOrDefault()
                sADOConn = DataServices.DBOpen(oTables, _iDatabas.All())

                Dim schemaColumnList As List(Of SchemaColumns) = SchemaInfoDetails.GetSchemaInfo(pTableName, sADOConn, pFileRoomOrder.FieldName)

                If schemaColumnList.Count > 0 Then
                    If schemaColumnList(0).IsADate Then
                        pFieldLength = 10
                        IsDateField = True
                    ElseIf schemaColumnList(0).IsString Then
                        If schemaColumnList(0).CharacterMaxLength <= 0 Or schemaColumnList(0).CharacterMaxLength >= 2000000 Then
                            pFieldLength = 30
                        Else
                            pFieldLength = schemaColumnList(0).CharacterMaxLength
                        End If
                    Else
                        pFieldLength = 30
                    End If
                End If
                pFileRoomOrder.StartFromFront = pStartFromFront
                If IsNothing(pFileRoomOrder.StartingPosition) Then
                    ErrMsg = String.Format(Languages.Translation("msgAdminCtrlStartingPositionMustBe"), Format$(pFieldLength))
                    ErrStatus = True
                End If
                If IsNothing(pFileRoomOrder.NumberofCharacters) And ErrMsg = "" Then
                    ErrMsg = String.Format(Languages.Translation("msgAdminCtrlNoOfCharMustBe"), Format$(pFieldLength))
                    ErrStatus = True
                End If

                If Not IsNothing(pFileRoomOrder.StartingPosition) And Not IsNothing(pFileRoomOrder.NumberofCharacters) And ErrMsg = "" Then
                    If pFileRoomOrder.StartingPosition < 1 Or pFileRoomOrder.StartingPosition > pFieldLength Then
                        ErrMsg = String.Format(Languages.Translation("msgAdminCtrlStartingPositionMustBe"), Format$(pFieldLength))
                        ErrStatus = True
                    End If

                    If (pFileRoomOrder.NumberofCharacters < 1 Or pFileRoomOrder.NumberofCharacters > pFieldLength) And ErrMsg = "" Then
                        ErrMsg = String.Format(Languages.Translation("msgAdminCtrlNoOfCharMustBe"), Format$(pFieldLength))
                        ErrStatus = True
                    End If
                End If

                If pFileRoomOrder.StartFromFront = True Then
                    If (pFileRoomOrder.NumberofCharacters > pFileRoomOrder.StartingPosition) And ErrMsg = "" Then
                        ErrMsg = Languages.Translation("msgAdminCtrlNoOfCharMustBLessEqualStartPosition")
                        ErrStatus = True
                    End If
                End If
                If ((pFileRoomOrder.StartingPosition + pFileRoomOrder.NumberofCharacters) > pFieldLength + 1) And ErrMsg = "" Then
                    ErrMsg = String.Format(Languages.Translation("msgAdminCtrlNoOfCharPlusStartingPosition"), Format$(pFieldLength))
                    ErrStatus = True
                End If

                'Validation for Date Field
                If IsDateField = True Then
                    If (pFileRoomOrder.StartingPosition > pFieldLength) And ErrMsg = "" Then
                        ErrMsg = String.Format(Languages.Translation("msgAdminCtrlStartPosNotExceed"), Format$(pFieldLength))
                        ErrStatus = True
                    End If

                    If pFileRoomOrder.StartFromFront = False Then
                        If ((pFileRoomOrder.StartingPosition + pFileRoomOrder.NumberofCharacters) > pFieldLength + 1) And ErrMsg = "" Then
                            ErrMsg = String.Format(Languages.Translation("msgAdminCtrlStartPosPlusLenNoExceed"), Format$(pFieldLength + 1))
                            ErrStatus = True
                        End If
                    End If
                End If

                'Save File Room Order Record.
                If Not ErrStatus = True Then
                    If pFileRoomOrder.Id > 0 Then
                        _iSLTableFileRoomOrder.BeginTransaction()

                        pFileRoomOrder.TableName = pTableName
                        _iSLTableFileRoomOrder.Update(pFileRoomOrder)

                        _iSLTableFileRoomOrder.CommitTransaction()

                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Keys.SaveSuccessMessage()
                    Else
                        pFileRoomOrder.TableName = pTableName
                        _iSLTableFileRoomOrder.Add(pFileRoomOrder)

                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Keys.SaveSuccessMessage()
                    End If
                Else
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = ErrMsg
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

        'Remove the file room order record.
        Function RemoveFileRoomOrderRecord(pRowSelected As Array, pRecordId As Integer) As ActionResult

            Try
                If pRowSelected Is Nothing Then
                    Return Json(New With {Key .success = False})
                End If
                If pRowSelected.Length = 0 Then
                    Return Json(New With {Key .success = False})
                End If

                Dim pSLTableFileRoomOrderEntity = _iSLTableFileRoomOrder.All().Where(Function(x) x.Id = pRecordId).FirstOrDefault()
                _iSLTableFileRoomOrder.Delete(pSLTableFileRoomOrderEntity)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.DeleteSuccessMessage()

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try


            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

#End Region

#Region "Advanced"
        Function LoadAdvancedTab() As PartialViewResult
            Return PartialView("_TableAdvancedPartial")
        End Function

        Function GetAdvanceDetails(tableName As String) As ActionResult
            Try
                Dim tableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower())).FirstOrDefault
                If (tableEntity.RecordManageMgmtType Is Nothing) Then
                    tableEntity.RecordManageMgmtType = 0
                End If
                Dim relationshipEntity = _iRelationShip.All.Where(Function(m) m.LowerTableName.Trim.ToLower.Equals(tableName.Trim.ToLower))
                Dim flag As Boolean = False
                Dim parentFolderList = LoadAdvancedLevelList(tableEntity.TableName, relationshipEntity)
                Dim parentDocList = LoadAdvancedLevelList(tableEntity.TableName, relationshipEntity)
                If (parentFolderList.Count = 0) Then
                    flag = False
                Else
                    flag = True
                End If
                Dim Setting As New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim tableEntityJSON = JsonConvert.SerializeObject(tableEntity, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim parentFolderListJSON = JsonConvert.SerializeObject(parentFolderList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim parentDocListJSON = JsonConvert.SerializeObject(parentDocList, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim flagJSON = JsonConvert.SerializeObject(flag, Newtonsoft.Json.Formatting.Indented, Setting)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlAllDataGetSuccessfully")
                Return Json(New With {
                    Key .tableEntityJSON = tableEntityJSON,
                    Key .parentFolderListJSON = parentFolderListJSON,
                    Key .parentDocListJSON = parentDocListJSON,
                    Key .flagJSON = flagJSON,
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try

        End Function

        Public Function LoadAdvancedLevelList(tableName As String, relationshipEntity As IQueryable(Of RelationShip)) As List(Of KeyValuePair(Of String, String))
            Dim parentDDList As New List(Of KeyValuePair(Of String, String))
            Dim tableEntity = _iTable.All.OrderBy(Function(m) m.TableId)
            If (Not (relationshipEntity Is Nothing) And Not (tableEntity Is Nothing)) Then
                For Each relationOBj As RelationShip In relationshipEntity
                    For Each tableObj As Table In tableEntity
                        If (relationOBj.UpperTableName.Trim.ToLower.Equals(tableObj.TableName.Trim.ToLower())) Then
                            parentDDList.Add(New KeyValuePair(Of String, String)(tableObj.TableName, tableObj.UserName))
                        End If
                    Next
                Next
            End If
            Return parentDDList
        End Function

        Public Function SetAdvanceDetails(advanceform As Table) As ActionResult
            Dim warnMsgJSON As String = ""
            Try
                Dim tableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(advanceform.TableName.Trim.ToLower)).FirstOrDefault
                If (advanceform.RecordManageMgmtType Is Nothing) Then
                    tableEntity.RecordManageMgmtType = 0
                Else
                    tableEntity.RecordManageMgmtType = advanceform.RecordManageMgmtType
                End If
                If (Not (advanceform.RecordManageMgmtType Is Nothing)) Then
                    If (advanceform.RecordManageMgmtType = 0 Or advanceform.RecordManageMgmtType = 1) Then
                        tableEntity.ParentDocTypeTableName = Nothing
                        tableEntity.ParentFolderTableName = Nothing
                    End If
                End If
                If (Not (advanceform.ParentDocTypeTableName Is Nothing)) Then
                    tableEntity.ParentDocTypeTableName = advanceform.ParentDocTypeTableName
                End If
                If (Not (advanceform.ParentFolderTableName Is Nothing)) Then
                    tableEntity.ParentFolderTableName = advanceform.ParentFolderTableName
                End If
                _iTable.Update(tableEntity)
                warnMsgJSON = VerifyRetentionDispositionTypesForParentAndChildren(tableEntity.TableId)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRecordUpdatedSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
            End Try
            Return Json(New With {
                Key .warnMsgJSON = warnMsgJSON,
                Key .errortype = Keys.ErrorType,
                Key .message = Keys.ErrorMessage
                }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

        End Function

        Public Function CheckParentForder(parentFolderVar As String, selectedTableVar As String) As ActionResult
            Try
                Dim tableEntity = _iTable.All.OrderBy(Function(m) m.TableId)
                Dim flagEqual As Boolean = False
                Dim parentTableName = _iTable.All.Where(Function(m) m.UserName.Trim.ToLower.Equals(parentFolderVar.Trim.ToLower)).FirstOrDefault.TableName
                Dim ConfigTable As String = Nothing
                If (Not (tableEntity Is Nothing)) Then
                    For Each tableObj As Table In tableEntity
                        If (Not (tableObj.ParentFolderTableName Is Nothing)) Then
                            If (tableObj.ParentFolderTableName.Trim.ToLower.Equals(parentTableName.Trim.ToLower)) Then
                                If (Not tableObj.TableName.Trim.ToLower.Equals(selectedTableVar.Trim.ToLower)) Then
                                    flagEqual = True
                                    ConfigTable = tableObj.UserName
                                    Exit For
                                End If
                            End If
                        End If
                    Next
                End If
                If (flagEqual = True) Then
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlIsAlreadyConfigured"), parentTableName, ConfigTable)
                Else
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = ""
                End If
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS

            End Try
            Return Json(New With {
Key .errortype = Keys.ErrorType,
Key .message = Keys.ErrorMessage
}, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
#End Region

#End Region

#Region "Views"

        Public Function LoadViewsList() As PartialViewResult
            Return PartialView("_ViewsListPartial")
        End Function

        'Public Function CheckTableExistence(pViewId As Integer, sAction As String) As ActionResult
        '    Dim tempViews = New Table()
        '    Dim oViews = New View()
        '    Dim exists As Boolean = False

        '    If Not String.IsNullOrEmpty(sAction) AndAlso sAction.Trim.ToUpper().Equals("E") Then
        '        oViews = _iView.All().Where(Function(x) x.Id = pViewId).FirstOrDefault()
        '        tempViews = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(oViews.TableName.Trim().ToLower())).FirstOrDefault()
        '    Else
        '        tempViews = _iTable.All().Where(Function(x) x.TableId = pViewId).FirstOrDefault()
        '    End If
        '    If (tempViews IsNot Nothing) Then
        '        Dim sSQL = "Select * from [" + tempViews.TableName + "]"
        '        Dim sADOConn As New ADODB.Connection
        '        sADOConn = DataServices.DBOpen(tempViews, _iDatabas.All())
        '        Dim rsAdo = DataServices.GetADORecordSet(sSQL, sADOConn)

        '        If sSQL.IndexOf("Invalid") = 0 Then
        '            exists = False
        '        Else
        '            exists = True
        '        End If
        '    End If


        '    Return Json(New With {
        '        Key .exists = exists
        '      }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        'End Function

        Public Function LoadViewsSettings(pViewId As Integer, sAction As String) As PartialViewResult
            Dim oViews = New View()
            '  Dim oViewFilterList As New List(Of ViewFilter)
            Session("tmpViewId") = pViewId
            If Not String.IsNullOrEmpty(sAction) AndAlso sAction.Trim.ToUpper().Equals("E") Then
                oViews = _iView.All().Where(Function(x) x.Id = pViewId).FirstOrDefault()
                '   oViewFilterList = _iViewFilter.All.Where(Function(x) x.ViewsId = pViewId).ToList()
            Else
                Dim tempViews = _iTable.All().Where(Function(x) x.TableId = pViewId).FirstOrDefault()

                Dim pViewNameObject = _iView.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(tempViews.TableName.Trim().ToLower()) AndAlso x.ViewName.Trim().ToLower().Contains(("All " + tempViews.UserName).Trim().ToLower()))
                Dim MaxCount = 1000
                Dim NextCount = 1


                For index As Integer = 1 To 1000
                    Dim status As Boolean = False
                    For Each item As View In pViewNameObject
                        Dim items = item.ViewName.Split(" ")
                        Dim intMyInteger As Integer
                        Integer.TryParse(items(items.Count - 1), intMyInteger)
                        If index = intMyInteger Then
                            status = True

                            Exit For
                        End If
                    Next
                    If status = False Then
                        NextCount = index
                        Exit For
                    End If
                Next

                For Each item As View In pViewNameObject
                    Dim items = item.ViewName.Split(" ")
                    Dim intMyInteger As Integer
                    Integer.TryParse(items(items.Count - 1), intMyInteger)
                    If intMyInteger > MaxCount Then
                        MaxCount = intMyInteger
                        If MaxCount = NextCount Then
                            NextCount = NextCount + 1
                        End If

                    End If
                Next
                oViews.ViewName = "All " + tempViews.UserName + " " + IIf(NextCount = 0, "", NextCount.ToString())
                oViews.SearchableView = True
                oViews.SQLStatement = "SELECT * FROM [" + tempViews.TableName + "]"
                oViews.TableName = tempViews.TableName
                oViews.MaxRecsPerFetch = oViews.MaxRecsPerFetch
                pViewId = 0
            End If

            Session("viewTableName") = oViews.TableName

            Dim oViewsCustModel = New ViewsCustomModel()
            oViewsCustModel.ViewsModel = oViews
            '  oViewsCustModel.ViewFilterList = oViewFilterList
            Dim GridColumnEntities = ViewModel.GetColumnsData(_iView.All(), _iViewColumn.All(), _iDatabas.All(), _iTable.All(), oViews.Id, sAction)
            ViewBag.ViewColumnList = GridColumnEntities.Where(Function(x) x.AutoInc = True).ToList().CreateSelectListFromList("ColumnId", "ColumnName", Nothing)
            TempData.Clear()
            TempData("ColumnsData") = GridColumnEntities
            ViewBag.ColumnGrdCount = GridColumnEntities.Count().ToString()
            ''''Change by hasmukh for if view does not exist coulums it will get detault columns
            'Dim lViewColumns As List(Of ViewColumn) = _iViewColumn.All().Where(Function(x) x.ViewsId = pViewId).OrderBy(Function(x) x.ColumnNum).ToList()
            'TempData("TempViewColumns_" & pViewId) = lViewColumns

            Dim olViewColumns = _iViewColumn.All().Where(Function(x) x.ViewsId = pViewId).OrderBy(Function(x) x.ColumnNum).ToList()

            If (pViewId <> 0) Then
                If Not olViewColumns Is Nothing Then
                    If olViewColumns.Count() = 0 Then
                        'Dim oViewsFirst = _iView.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(oViews.TableName.Trim().ToLower())).OrderBy(Function(x) x.ViewOrder).FirstOrDefault()
                        'olViewColumns = _iViewColumn.All().Where(Function(x) x.ViewsId = oViewsFirst.Id).OrderBy(Function(x) x.ColumnNum).ToList()

                        'Taken columns from AltView, If view does not have any columns - FUS- 5704
                        Dim oAltView = _iView.All().Where(Function(x) x.Id = oViews.AltViewId).FirstOrDefault()
                        olViewColumns = _iViewColumn.All().Where(Function(x) x.ViewsId = oAltView.Id).OrderBy(Function(x) x.ColumnNum).ToList()
                    End If
                End If
            End If

            TempData("TempViewColumns_" & pViewId) = olViewColumns

            TempData.Remove("ViewFilterUpdate")
            'ViewBag.OperatorsList = ViewModel.FillOperatorsDropDown(True)
            'Common.DefaultDropdownSelectionBlank()
            Return PartialView("_ViewsSettingsPartial", oViewsCustModel)
        End Function

        'Public Function ViewTreePartial() As PartialViewResult

        '    Dim lTableEntities = _iTable.All().OrderBy(Function(m) m.TableName)
        '    Dim lViewsEntities = _iView.All()

        '    'Dim treeView = ViewModel.GetBindTreeControlView(lTableEntities, lViewsEntities)
        '    Dim treeView = ViewModel.GetBindViewMenus(lTableEntities, lViewsEntities)

        '    Return PartialView("_ViewTreePartial", treeView)
        'End Function

        Public Function ViewTreePartial(root As String) As ContentResult

            Dim lTableEntities = _iTable.All().OrderBy(Function(m) m.UserName)
            Dim lAllTables = _ivwTablesAll.All().Select(Function(x) x.TABLE_NAME).ToList()
            lTableEntities = lTableEntities.Where(Function(x) lAllTables.Contains(x.TableName))
            Dim lViewsEntities = _iView.All()

            'Dim treeView = ViewModel.GetBindTreeControlView(lTableEntities, lViewsEntities)
            Dim treeView = ViewModel.GetBindViewMenus(root, lTableEntities, lViewsEntities)

            Return Content(treeView)
        End Function


        Public Function GetViewColumnsList(sidx As String, sord As String, page As Integer, rows As Integer, intViewsId As Integer, sAction As String) As JsonResult
            Dim GridColumnEntities = New List(Of GridColumns)()
            GridColumnEntities = DirectCast(TempData.Peek("ColumnsData"), List(Of GridColumns)).OrderBy(Function(x) x.ColumnId).ToList()

            ViewBag.ColumnGrdCount = GridColumnEntities.Count().ToString()
            Dim jsonData = GridColumnEntities.GetJsonListForGrid1(sord, page, rows)
            Return Json(jsonData, JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetViewsRelatedData(sTableName As String, pViewId As Integer) As JsonResult
            Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim.ToLower().Equals(sTableName.Trim().ToLower())).FirstOrDefault()
            Dim oViews = _iView.All().Where(Function(x) x.Id = pViewId).FirstOrDefault()
            Dim bTaskList = False
            Dim bInFileRoomOrder = False
            Dim bIncludeTrackingLocation = False
            Dim maxRecsPerFetch As Integer = 25

            If oViews IsNot Nothing Then
                bTaskList = IIf(oViews.InTaskList Is Nothing, False, oViews.InTaskList)
                bInFileRoomOrder = IIf(oViews.IncludeFileRoomOrder Is Nothing, False, oViews.IncludeFileRoomOrder)
                bIncludeTrackingLocation = IIf(oViews.IncludeTrackingLocation Is Nothing, False, oViews.IncludeTrackingLocation)
                maxRecsPerFetch = oViews.MaxRecsPerFetch
            End If

            Dim oViewFilter = _iViewFilter.All().Where(Function(x) x.ViewsId = pViewId)
            Dim SLTableFileRoomOrderCount = 0
            Dim ViewFilterCount = 0
            Dim bTrackable = False
            Dim myBasePage As New BaseWebPage
            Dim mbCanModifyColumns = True
            Dim btnColumnAdd = True
            Dim bSearchableView = False
            Dim ShouldEnableMoveFilter As Boolean
            '  Dim BaseWebPage = New BaseWebPage()

            Dim TempViewFilterList As New List(Of ViewFilter)
            If (TempData.ContainsKey("ViewFilterUpdate")) Then
                TempData.Remove("ViewFilterUpdate")
            End If
            TempViewFilterList = oViewFilter.ToList
            TempData("ViewFilterUpdate") = TempViewFilterList

            Try
                If Not oTables Is Nothing Then
                    bTrackable = myBasePage.Passport.CheckPermission(oTables.TableName.Trim, Enums.SecureObjects.Table, Enums.PassportPermissions.Transfer)
                    '   bTrackable = oTables.Trackable
                    Dim oSLTableFileRoomOrder = _iSLTableFileRoomOrder.All().Where(Function(x) x.TableName.Trim.ToLower().Equals(oTables.TableName.Trim().ToLower()))
                    If Not oSLTableFileRoomOrder Is Nothing Then
                        SLTableFileRoomOrderCount = oSLTableFileRoomOrder.Count()
                    End If
                    If Not oViews Is Nothing Then
                        If (oViews.AltViewId > 0) Then
                            mbCanModifyColumns = False
                            Dim oAltView = _iView.All().Where(Function(x) x.AltViewId = oViews.AltViewId).FirstOrDefault()
                            If (Not (oAltView Is Nothing)) Then
                                mbCanModifyColumns = (myBasePage.Passport.CheckPermission(oAltView.ViewName, Smead.Security.SecureObject.SecureObjectType.View, Smead.Security.Permissions.Permission.Configure))
                                btnColumnAdd = mbCanModifyColumns
                                'lblColumnsPermission.Caption = Replace$(lblColumnsPermission.Caption, "???", vbCrLf & vbCrLf & oAltView.Id & ":  " & oAltView.ViewName)
                                oAltView = Nothing

                            End If
                        End If
                        bSearchableView = IIf(oViews.SearchableView Is Nothing, False, oViews.SearchableView)
                        If Not oViewFilter Is Nothing Then
                            If (oViewFilter.Count <> 0) Then
                                If (oViewFilter.Any(Function(m) m.Active = True)) Then
                                    ShouldEnableMoveFilter = True
                                Else
                                    ShouldEnableMoveFilter = False
                                End If
                            Else
                                ShouldEnableMoveFilter = False
                            End If

                        End If
                    End If

                End If
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.SaveSuccessMessage()
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = ex.Message.ToString()
            End Try

            Return Json(New With {
                Key .errortype = Keys.ErrorType,
                Key .errorMessage = Keys.ErrorMessage,
                Key .btnColumnAdd = btnColumnAdd,
                Key .sltableFileRoomOrderCount = SLTableFileRoomOrderCount,
                Key .ShouldEnableMoveFilter = ShouldEnableMoveFilter,
                Key .bSearchableView = bSearchableView,
                Key .bTrackable = bTrackable,
                Key .bTaskList = bTaskList,
                Key .bInFileRoomOrder = bInFileRoomOrder,
                Key .bIncludeTrackingLocation = bIncludeTrackingLocation,
                Key .MaxRecsPerFetch = maxRecsPerFetch
              }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

        End Function

        Public Function UpdateGridSortOrder(ids As List(Of Integer), sGridName As String)
            Try
                If (ids.Count > 0) Then
                    Select Case sGridName.Trim().ToUpper()
                        Case "GRDVIEWCOLUMNS"

                            'Dim lViewColumn = _iViewColumn.All()
                            Dim iViewColumnId As Integer = 0
                            Dim iViewId = DirectCast(Session("tmpViewId"), Integer)
                            'Dim iViewId As Integer = 0
                            'Dim oViewColumns = Nothing
                            'For i As Integer = 0 To ids.Count - 1
                            '    iViewColumnId = ids(i)
                            '     oViewColumns = lViewColumn.Where(Function(x) x.Id = iViewColumnId).FirstOrDefault()
                            '    If (oViewColumns IsNot Nothing) Then
                            '        Exit For
                            '    End If
                            'Next

                            'iViewId = oViewColumns.ViewsId
                            Dim lstViewColumn As New List(Of ViewColumn)
                            lstViewColumn = TempData.Peek("TempViewColumns_" & iViewId)

                            Dim dictionary As New Dictionary(Of Integer, Integer)
                            For i As Integer = 0 To ids.Count - 1
                                iViewColumnId = ids(i)
                                Dim oViewColumnsDictionary = lstViewColumn.Where(Function(x) x.Id = iViewColumnId).FirstOrDefault()
                                If iViewColumnId > 0 Then
                                    dictionary.Add(iViewColumnId, oViewColumnsDictionary.ColumnNum)
                                End If
                            Next
                            Session("OrgViewColumnIds") = dictionary


                            Dim lstTEMPViewColumns As New List(Of ViewColumn)
                            lstTEMPViewColumns = DirectCast(TempData.Peek("TempViewColumns_" & iViewId), List(Of ViewColumn))
                            Dim dicUpdatedColNums As New Dictionary(Of Integer, Integer)
                            For i As Integer = 0 To ids.Count - 1
                                iViewColumnId = ids(i)
                                Dim pViewColumns = lstTEMPViewColumns.Where(Function(x) x.Id = iViewColumnId).FirstOrDefault()
                                If Not pViewColumns Is Nothing Then
                                    pViewColumns.ColumnNum = i
                                    dicUpdatedColNums.Add(pViewColumns.Id, i)
                                End If
                            Next
                            Session("UpViewColumnIds") = dicUpdatedColNums
                            SetLookupId(iViewId)
                            '  TempData("TempViewColumns_" & orgViewId) = lstTEMPViewColumns

                            Dim lViewFilter = _iViewFilter.All()

                            Dim lViewFiltersUpdated As List(Of ViewFilter) = New List(Of ViewFilter)()

                            For Each pViewFilter As ViewFilter In lViewFilter.Where(Function(x) x.ViewsId = iViewId).ToList()
                                Dim iViewColumn = dictionary.Where(Function(x) x.Value = pViewFilter.ColumnNum).FirstOrDefault().Key
                                Dim op = lstTEMPViewColumns.Where(Function(x) x.Id = iViewColumn).FirstOrDefault()
                                If pViewFilter.ColumnNum <> op.ColumnNum Then
                                    pViewFilter.ColumnNum = op.ColumnNum
                                    '_iViewFilter.Update(pViewFilter)
                                End If
                                lViewFiltersUpdated.Add(pViewFilter)
                            Next

                            TempData("ViewFilterUpdate") = lViewFiltersUpdated


                            Exit Select
                        Case "GRDBARCODE"

                            Dim lScanList = _iScanList.All()
                            Dim iScanListID As Integer = 0

                            For i As Integer = 0 To ids.Count - 1
                                iScanListID = ids(i)
                                Dim pScanList
                                pScanList = _iScanList.All().Where(Function(x) x.Id = iScanListID).FirstOrDefault()
                                If Not pScanList Is Nothing Then
                                    pScanList.ScanOrder = i + 1
                                End If
                                _iScanList.Update(pScanList)
                            Next
                        Case Else
                            Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRecordNotFound")
                    End Select

                End If
            Catch ex As Exception
                Keys.ErrorMessage = ex.Message.ToString()
            End Try

            Return Json(Keys.ErrorMessage, JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function ValidateSqlStatement(lViewsCustomModelEntites As ViewsCustomModel, pIncludeFileRoomOrder As Boolean, pIncludeTrackingLocation As Boolean, pInTaskList As Boolean) As ActionResult

            Dim lError As Integer = 0
            Dim sReturnMessage = ""
            Dim oTable = New Table()
            Dim sSql As String = String.Empty
            Dim sSQLWithTL As String = String.Empty
            Dim pViewEntity = New View()
            Dim lViewsData As View = DirectCast(lViewsCustomModelEntites.ViewsModel, View)
            Dim viewIdVar = lViewsData.Id
            Dim ViewIdJSON As String = ""
            Dim SendMessage = String.Empty
            oTable = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(lViewsData.TableName.Trim().ToLower())).FirstOrDefault()
            If (Not String.IsNullOrEmpty(lViewsData.SQLStatement())) Then
                sSql = DataServices.NormalizeString(lViewsData.SQLStatement())
                sSql = DataServices.InjectWhereIntoSQL(sSql, "0=1")
                Dim sADOConn As ADODB.Connection = DataServices.DBOpen()
                sADOConn = DataServices.DBOpen(oTable, _iDatabas.All())

                Dim rsADO As New ADODB.Recordset
                rsADO = DataServices.GetADORecordset(sSql, oTable, _iDatabas.All(), , , , , , True, lError, sReturnMessage)
                If (lError = 0) Then
                    Keys.ErrorType = "s"
                Else
                    Keys.ErrorType = "w"
                    If (InStr(1&, sSql, " TOP ", vbTextCompare) > 0&) Then
                        SendMessage = String.Format(Languages.Translation("msgAdminCtrlLimitingSpecificNoOfRec"), vbCrLf)
                    Else
                        SendMessage = String.Format("{0} {1} {1} {2}", Languages.Translation("msgAdminCtrlSQLStatementInValid"), vbCrLf, sReturnMessage)
                    End If
                End If

                If ((String.IsNullOrEmpty(SendMessage)) And (pIncludeTrackingLocation = True)) Then
                    sSql = DataServices.NormalizeString(lViewsData.SQLStatement)
                    sSQLWithTL = TrackingServices.BuildTrackingLocationSQL(_iTable.All(), _iDatabas.All(), sSql, oTable)
                    If (StrComp(sSql, sSQLWithTL, vbTextCompare) = 0) Then
                        Keys.ErrorType = "w"
                        SendMessage = Languages.Translation("msgAdminCtrlViewContainsSQLStatement")
                    End If
                End If
                Keys.ErrorMessage = SendMessage
            Else
                Keys.ErrorType = "s"
            End If
            Return Json(New With {
                             Key .ViewIdJSON = ViewIdJSON,
                        Key .errortype = Keys.ErrorType,
                        Key .message = Keys.ErrorMessage
                    }, JsonRequestBehavior.AllowGet)

        End Function

        '<HttpPost> _
        'Public Function ValidateSqlStatement(lViewsCustomModelEntites As ViewsCustomModel) As ActionResult

        '    Dim lError As String = ""
        '    Dim sReturnMessage = ""
        '    Dim oTable = New Table()
        '    Dim sSql As String
        '    lError = 0

        '    Dim pViewEntity = New View()
        '    Dim lViewsData As View = DirectCast(lViewsCustomModelEntites.ViewsModel, View)
        '    Dim viewIdVar = lViewsData.Id
        '    Dim ViewIdJSON As String = ""
        '    oTable = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(lViewsData.TableName.Trim().ToLower())).FirstOrDefault()


        '    If (Not lViewsData.SQLStatement() Is Nothing) Then

        '        Dim sADOConn As ADODB.Connection = DataServices.DBOpen()
        '        sADOConn = DataServices.DBOpen(oTable, _iDatabas.All())

        '        Dim rsADO As New ADODB.Recordset
        '        sSql = lViewsData.SQLStatement()
        '        rsADO = DataServices.GetADORecordset(sSql, oTable, _iDatabas.All(), , , , , , True, lError, sReturnMessage)
        '        If (Not lError.ToString().Equals("0")) Then
        '            Keys.ErrorType = "e"
        '        Else
        '            Keys.ErrorType = "s"
        '        End If
        '    End If
        '    Keys.ErrorMessage = sReturnMessage
        '    Return Json(New With { _
        '                     Key .ViewIdJSON = ViewIdJSON, _
        '                Key .errortype = Keys.ErrorType, _
        '                Key .message = Keys.ErrorMessage _
        '            }, JsonRequestBehavior.AllowGet)

        'End Function

        Public Sub SetLookupId(oViewId As Integer)
            Try
                Dim lViewColumns As List(Of ViewColumn) = TempData.Peek("TempViewColumns_" & oViewId)
                lViewColumns = lViewColumns.OrderBy(Function(m) m.ColumnNum).ToList()
                Dim ViewColumnObj As ViewColumn = New ViewColumn()
                ' Dim pViewColumnList = _iViewColumn.All().Where(Function(x) x.ViewsId = oViewId).ToList() '.OrderBy(Function(x) x.ColumnNum)

                Dim tempViewColumns As New List(Of ViewColumn)
                Dim dictionary As New Dictionary(Of Integer, Integer)
                dictionary = Session("OrgViewColumnIds")
                Dim dicUpdatedColNums As New Dictionary(Of Integer, Integer)
                dicUpdatedColNums = Session("UpViewColumnIds")
                Dim bLookup0Updated = False
                If (Not lViewColumns Is Nothing) Then
                    For Each pViewColObj As ViewColumn In lViewColumns
                        If (lViewColumns.Any(Function(m) m.Id = pViewColObj.Id)) Then
                            Dim tempViewCol = lViewColumns.Where(Function(m) m.Id = pViewColObj.Id).FirstOrDefault

                            '' Update Lookup Id values
                            If Not dictionary Is Nothing AndAlso Not dicUpdatedColNums Is Nothing Then
                                If (pViewColObj.LookupIdCol > 0) Or (pViewColObj.LookupIdCol = 0 AndAlso pViewColObj.LookupType = 1) Then
                                    Dim pOldLookupIdCol = pViewColObj.LookupIdCol
                                    Dim pOldViewColumnId = dictionary.Where(Function(x) x.Value = pOldLookupIdCol).FirstOrDefault().Key
                                    Dim pViewColumnsXYZ = dicUpdatedColNums.Where(Function(x) x.Key = pOldViewColumnId).FirstOrDefault().Value
                                    'Dim pViewColumnsXYZ = lViewColumnsOld.Where(Function(m) m.Id = pOldViewColumnId).FirstOrDefault()
                                    tempViewCol.LookupIdCol = pViewColumnsXYZ
                                End If
                            End If
                            If tempViewCol.LookupIdCol Is Nothing Then
                                tempViewCol.LookupIdCol = pViewColObj.LookupIdCol
                            End If
                            tempViewColumns.Add(tempViewCol)
                        End If
                    Next
                    TempData("TempViewColumns_" & oViewId) = tempViewColumns
                End If
            Catch ex As Exception

            End Try
        End Sub

        <HttpPost>
        Public Function SetViewsDetails(lViewsCustomModelEntites As ViewsCustomModel, pIncludeFileRoomOrder As Boolean, pIncludeTrackingLocation As Boolean, pInTaskList As Boolean) As ActionResult
            Dim ViewIdJSON As String = ""
            Try
                _iView.BeginTransaction()
                _iViewColumn.BeginTransaction()
                _iViewFilter.BeginTransaction()
                Dim pViewEntity = New View()
                Dim lViewsData As View = DirectCast(lViewsCustomModelEntites.ViewsModel, View)
                lViewsData.IncludeFileRoomOrder = pIncludeFileRoomOrder
                lViewsData.IncludeTrackingLocation = pIncludeTrackingLocation
                lViewsData.InTaskList = pInTaskList
                Dim viewIdVar = lViewsData.Id
                Dim oldViewName As String = ""
                If lViewsData.Id > 0 Then
                    pViewEntity = _iView.All().Where(Function(x) x.Id = lViewsData.Id).FirstOrDefault()
                    oldViewName = pViewEntity.ViewName
                    ViewModel.CreateViewsEntity(lViewsData, pViewEntity)
                Else
                    lViewsData.ViewOrder = _iView.All().Where(Function(x) x.TableName.Trim.ToLower().Equals(lViewsData.TableName.Trim().ToLower())).Max(Function(x) x.ViewOrder) + 1
                    ViewModel.CreateViewsEntity(lViewsData, pViewEntity)
                End If

                Dim lViewFiltersData As New List(Of ViewFilter)
                lViewFiltersData = lViewsCustomModelEntites.ViewFilterList
                Dim lSecureObjectId As Integer
                Dim BaseWebPage = New BaseWebPage()
                Dim oSecureObject = New Smead.Security.SecureObject(BaseWebPage.Passport)
                Dim lViewColumns As List(Of ViewColumn) = TempData.Peek("TempViewColumns_" & lViewsData.Id)
                If (Not lViewColumns Is Nothing) Then
                    If (lViewColumns.Count = 0) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Languages.Translation("msgAdminCtrl1ColIncluded2SaveView")
                        Exit Try
                    End If
                End If
                Dim oTable = New Table()
                If Not lViewsData Is Nothing Then
                    oTable = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(lViewsData.TableName.Trim().ToLower())).FirstOrDefault()
                End If

                Dim lViewColumn = _iViewColumn.All().Where(Function(x) x.ViewsId = lViewsData.Id).ToList()
                'Start : Set Views details

                If Not lViewsData Is Nothing Then

                    If lViewsData.Id > 0 Then
                        'To solve Bug No. 1166(There are same view name(Pipeline Report) with different folder records in 'Views' table.)(Identify unique record using ViewId,ViewName and TableName)
                        Dim con1 = _iView.All().Any(Function(x) x.ViewName.Trim().ToLower() = lViewsData.ViewName.Trim().ToLower() AndAlso x.Id <> lViewsData.Id AndAlso x.TableName.Trim.ToLower.Equals(lViewsData.TableName.Trim.ToLower)) = False
                        Dim con2 = lViewsData.ViewName.Trim.ToLower().Equals(("Purchase Orders").Trim().ToLower())
                        If (con1 Or con2) Then
                            If (StrComp(oldViewName, lViewsData.ViewName, vbTextCompare) <> 0) Then
                                oSecureObject.Rename(oldViewName, Enums.SecureObjects.View, lViewsData.ViewName)
                            End If
                            _iView.Update(pViewEntity)
                            viewIdVar = pViewEntity.Id
                        Else
                            Keys.ErrorType = "w"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlTheViewNameL1"), lViewsData.ViewName)
                            Exit Try
                        End If
                    Else
                        If _iView.All().Any(Function(x) x.ViewName.Trim().ToLower() = lViewsData.ViewName.Trim().ToLower()) = False Then

                            lSecureObjectId = oSecureObject.GetSecureObjectID(lViewsData.ViewName, Enums.SecureObjects.View)
                            If (lSecureObjectId <> 0) Then oSecureObject.UnRegister(lSecureObjectId)

                            lSecureObjectId = oSecureObject.GetSecureObjectID(oTable.TableName, Enums.SecureObjects.Table)
                            If (lSecureObjectId = 0&) Then lSecureObjectId = Enums.SecureObjects.View

                            oSecureObject.Register(lViewsData.ViewName, Enums.SecureObjects.View, lSecureObjectId)

                            _iView.Add(pViewEntity)
                            viewIdVar = pViewEntity.Id
                        Else
                            Keys.ErrorType = "w"
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlTheViewNameL1"), lViewsData.ViewName)
                            Exit Try
                        End If
                    End If

                    'Start : Set View Filters
                    If (Not TempData Is Nothing) Then
                        If (TempData.ContainsKey("ViewFilterUpdate")) Then

                            Dim lViewFiltersDataTemp = DirectCast(TempData("ViewFilterUpdate"), List(Of ViewFilter))
                            Dim viewFilterList = _iViewFilter.All()
                            If (Not lViewFiltersDataTemp Is Nothing) Then
                                For Each pViewFilter As ViewFilter In lViewFiltersDataTemp
                                    If (Not pViewFilter.ColumnNum Is Nothing) Then
                                        Dim viewColObj = lViewColumns.Where(Function(m) m.ColumnNum = pViewFilter.ColumnNum).FirstOrDefault
                                        pViewFilter.Sequence = 0
                                        pViewFilter.PartOfView = True
                                        If (pViewFilter.ViewsId <> -1) Then
                                            If viewFilterList.Any(Function(x) x.ViewsId = pViewFilter.ViewsId AndAlso x.Id = pViewFilter.Id) Then
                                                _iViewFilter.Update(pViewFilter)
                                            Else
                                                pViewFilter.Id = 0
                                                pViewFilter.ViewsId = viewIdVar
                                                _iViewFilter.Add(pViewFilter)
                                            End If
                                        Else
                                            If (pViewFilter.Id > 0) Then
                                                Dim deleteViewFilter = _iViewFilter.Where(Function(m) m.Id = pViewFilter.Id).FirstOrDefault
                                                If (Not deleteViewFilter Is Nothing) Then
                                                    _iViewFilter.Delete(deleteViewFilter)
                                                End If
                                            End If
                                        End If
                                    End If
                                Next

                                If (lViewFiltersDataTemp.Count <> 0) Then
                                    Dim oViewUpdate = _iView.All.Where(Function(m) m.Id = viewIdVar).FirstOrDefault
                                    oViewUpdate.FiltersActive = True
                                    _iView.Update(oViewUpdate)
                                End If
                            End If
                        End If
                    End If

                    Dim preViewId = pViewEntity.Id
                    Dim pViewColumnList = _iViewColumn.All().Where(Function(x) x.ViewsId = pViewEntity.Id).ToList() '.OrderBy(Function(x) x.ColumnNum)

                    If Not pViewColumnList Is Nothing Then
                        If pViewColumnList.Count() = 0 AndAlso lViewsData.Id > 0 Then
                            'Dim oViewsFirst = _iView.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pViewEntity.TableName.Trim().ToLower())).OrderBy(Function(x) x.ViewOrder).FirstOrDefault()
                            'pViewColumnList = _iViewColumn.All().Where(Function(x) x.ViewsId = oViewsFirst.Id).OrderBy(Function(x) x.ColumnNum).ToList()
                            'preViewId = oViewsFirst.Id

                            'Taken columns from AltView, If view does not have any columns - FUS- 5704
                            Dim oAltView = _iView.All().Where(Function(x) x.Id = pViewEntity.AltViewId).FirstOrDefault()
                            pViewColumnList = _iViewColumn.All().Where(Function(x) x.ViewsId = oAltView.Id).OrderBy(Function(x) x.ColumnNum).ToList()
                            preViewId = oAltView.Id
                        End If
                    Else
                        preViewId = pViewEntity.Id
                    End If

                    Dim iColumnNum As Integer = 0
                    If (Not pViewColumnList Is Nothing) Then
                        For Each pViewColObj As ViewColumn In pViewColumnList
                            pViewColObj.ColumnNum = iColumnNum - 1
                            _iViewColumn.Update(pViewColObj)
                            iColumnNum = iColumnNum - 1
                        Next
                    End If

                    Dim ViewColumnObj As ViewColumn = New ViewColumn()

                    Dim dictionary As New Dictionary(Of Integer, Integer)
                    dictionary = Session("OrgViewColumnIds")
                    Dim dicUpdatedColNums As New Dictionary(Of Integer, Integer)
                    dicUpdatedColNums = Session("UpViewColumnIds")
                    Dim bLookup0Updated = False
                    If (Not lViewColumns Is Nothing) Then
                        For Each pViewColObj As ViewColumn In pViewColumnList
                            If (lViewColumns.Any(Function(m) m.Id = pViewColObj.Id)) Then
                                Dim tempViewCol = lViewColumns.Where(Function(m) m.Id = pViewColObj.Id).FirstOrDefault

                                '' Update Lookup Id values
                                'If Not dictionary Is Nothing AndAlso Not dicUpdatedColNums Is Nothing Then
                                '    If (pViewColObj.LookupIdCol > 0) Or (pViewColObj.LookupIdCol = 0 AndAlso pViewColObj.LookupType = 1) Then
                                '        Dim pOldLookupIdCol = pViewColObj.LookupIdCol
                                '        Dim pOldViewColumnId = dictionary.Where(Function(x) x.Value = pOldLookupIdCol).FirstOrDefault().Key
                                '        Dim pViewColumnsXYZ = dicUpdatedColNums.Where(Function(x) x.Key = pOldViewColumnId).FirstOrDefault().Value
                                '        'Dim pViewColumnsXYZ = lViewColumnsOld.Where(Function(m) m.Id = pOldViewColumnId).FirstOrDefault()
                                '        tempViewCol.LookupIdCol = pViewColumnsXYZ
                                '    End If
                                'End If
                                'If tempViewCol.LookupIdCol Is Nothing Then
                                '    tempViewCol.LookupIdCol = pViewColObj.LookupIdCol
                                'End If
                                AddUpdateViewColumn(pViewColObj, tempViewCol)
                                _iViewColumn.Update(pViewColObj)
                                lViewColumns.Remove(tempViewCol)
                            Else
                                _iViewColumn.Delete(pViewColObj)
                            End If
                        Next

                        For Each pViewColumns As ViewColumn In lViewColumns
                            If (lViewColumns.Any(Function(m) m.Id = pViewColumns.Id)) Then
                                pViewColumns.Id = 0
                                pViewColumns.ViewsId = preViewId
                                'If (pViewColumns.LookupType = Enums.geViewColumnsLookupType.ltDirect) Then
                                '    pViewColumns.FieldName = DatabaseMap.RemoveTableNameFromField(pViewColumns.FieldName)
                                'End If
                                _iViewColumn.Add(pViewColumns)
                            End If
                        Next

                    End If

                End If
                ' Remove Existing view form sql
                ViewModel.SQLViewDelete(viewIdVar)

                'Set flag for 'Move Filter into SQL' to make button enable/disable
                Dim vwFilterData = _iViewFilter.All.Where(Function(m) m.ViewsId = viewIdVar)
                _iView.CommitTransaction()
                _iViewColumn.CommitTransaction()
                _iViewFilter.CommitTransaction()
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                ViewIdJSON = JsonConvert.SerializeObject(viewIdVar, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim lViewColumnsList As List(Of ViewColumn)

                If pViewEntity.AltViewId <> 0 Then
                    Dim altViewIdJSON = JsonConvert.SerializeObject(pViewEntity.AltViewId, Newtonsoft.Json.Formatting.Indented, Setting)
                    lViewColumnsList = _iViewColumn.All().Where(Function(x) x.ViewsId = altViewIdJSON).OrderBy(Function(x) x.ColumnNum).ToList()
                Else
                    lViewColumnsList = _iViewColumn.All().Where(Function(x) x.ViewsId = ViewIdJSON).OrderBy(Function(x) x.ColumnNum).ToList()
                End If
                TempData("TempViewColumns_" & ViewIdJSON) = lViewColumnsList
                Session.Remove("OrgViewColumnIds")
                Session.Remove("UpViewColumnIds")
                'If lViewsData.Id <= 0 Then
                Keys.UpdatePermission()
                'End If
                If pViewEntity.AltViewId <> 0 Then
                    RefreshViewColGrid(pViewEntity.AltViewId, pViewEntity.TableName)
                Else
                    RefreshViewColGrid(viewIdVar, pViewEntity.TableName)
                End If

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminViewsSaveSuccess") 'Keys.SaveSuccessMessage()
            Catch dbEx As DbEntityValidationException
                For Each validationErrors In dbEx.EntityValidationErrors
                    For Each validationError In validationErrors.ValidationErrors
                        Trace.TraceInformation(Languages.Translation("msgAdminCtrlProperty"), validationError.PropertyName, validationError.ErrorMessage)
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlProperty"), validationError.PropertyName, validationError.ErrorMessage)
                    Next
                Next
                Keys.ErrorType = "e"
                _iView.RollBackTransaction()
                _iViewColumn.RollBackTransaction()
                _iViewFilter.RollBackTransaction()
            End Try


            Return Json(New With {
                    Key .ViewIdJSON = ViewIdJSON,
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetSortedColumnList(pViewId As Int32) As JsonResult
            Dim lViewColumnsList As New List(Of ViewColumn)

            If (TempData.ContainsKey("TempViewColumns_" & pViewId)) Then
                lViewColumnsList = DirectCast(TempData.Peek("TempViewColumns_" & pViewId), List(Of ViewColumn)).OrderBy(Function(x) x.SortOrder).ToList()
            End If

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(lViewColumnsList, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function SaveSortedColumnToList(pTableIds() As String, pViewId As Int32) As ActionResult
            Try
                Dim lViewColumnsList As New List(Of ViewColumn)
                If (TempData.ContainsKey("TempViewColumns_" & pViewId)) Then
                    lViewColumnsList = DirectCast(TempData.Peek("TempViewColumns_" & pViewId), List(Of ViewColumn)).OrderBy(Function(x) x.SortOrder).ToList()
                End If

                For Each item As ViewColumn In lViewColumnsList
                    item.SortOrder = 0
                    item.SortOrderDesc = False
                Next

                If pTableIds IsNot Nothing Then
                    Dim sortOrder = 1
                    For Each item As String In pTableIds
                        Dim splitValue = item.Split("|")
                        If splitValue.Length > 1 Then
                            Dim columns = lViewColumnsList.Single(Function(x) x.Id = Convert.ToInt32(splitValue(0)))
                            columns.SortOrder = sortOrder
                            columns.SortOrderDesc = Convert.ToBoolean(splitValue(1))
                            sortOrder = sortOrder + 1
                        End If
                    Next
                End If

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlTblMoveSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetOperatorDDLData(iViewId As Integer, iColumnNum As Integer) As JsonResult
            Dim jsonObjectOperator As String = String.Empty
            Dim jsonFilterControls As String = String.Empty
            Dim filterControls As New Dictionary(Of String, Boolean)
            Dim oOperatorData As New List(Of KeyValuePair(Of String, String))
            Dim sThisFieldHeading As String = ""
            Dim sFirstLookupHeading = ""
            Dim sSecondLookupHeading = ""
            Dim sRecordJSON As String = ""
            Dim sValueFieldNameJSON As String = ""
            Dim sLookupFieldJSON As String = ""
            Dim sFirstLookupJSON As String = ""
            Dim sSecondLookupJSON As String = ""
            Dim filterColumnsJSON As String = ""
            Dim sValueFieldName As String = ""
            Try
                oOperatorData.Clear()
                filterControls.Clear()
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                oOperatorData = ViewModel.FillOperatorsDropDownOnChange(filterControls, _iView.All(), _iTable.All(), _iDatabas.All(), iColumnNum)
                If (filterControls("FieldDDL")) Then
                    If (Not TempData Is Nothing) Then
                        Dim lstTEMPViewColumns As New List(Of ViewColumn)
                        lstTEMPViewColumns = TempData.Peek("TempViewColumns_" & iViewId)
                        Dim oViewFilterColumns As New ViewColumn
                        If (Not lstTEMPViewColumns Is Nothing) Then
                            oViewFilterColumns = lstTEMPViewColumns.Where(Function(m) m.ColumnNum = iColumnNum).FirstOrDefault
                        End If
                        If (Not oViewFilterColumns Is Nothing) Then
                            Dim table As DataTable = FillColumnCombobox(sValueFieldName, sThisFieldHeading, sFirstLookupHeading, sSecondLookupHeading, oViewFilterColumns)
                            If ((Not String.IsNullOrEmpty(sValueFieldName))) Then
                                sValueFieldNameJSON = JsonConvert.SerializeObject(sValueFieldName, Newtonsoft.Json.Formatting.Indented, Setting)
                            End If
                            If ((Not String.IsNullOrEmpty(sThisFieldHeading))) Then
                                sLookupFieldJSON = JsonConvert.SerializeObject(sThisFieldHeading, Newtonsoft.Json.Formatting.Indented, Setting)
                            End If
                            If ((Not String.IsNullOrEmpty(sFirstLookupHeading))) Then
                                sFirstLookupJSON = JsonConvert.SerializeObject(sFirstLookupHeading, Newtonsoft.Json.Formatting.Indented, Setting)
                            End If
                            If ((Not String.IsNullOrEmpty(sSecondLookupHeading))) Then
                                sSecondLookupJSON = JsonConvert.SerializeObject(sSecondLookupHeading, Newtonsoft.Json.Formatting.Indented, Setting)
                            End If
                            sRecordJSON = JsonConvert.SerializeObject(table, Newtonsoft.Json.Formatting.Indented, Setting)
                        End If
                    End If
                End If
                Dim filterColumns As New List(Of ViewFilter)
                GetFilterData(iViewId, filterColumns)
                filterColumnsJSON = JsonConvert.SerializeObject(filterColumns, Newtonsoft.Json.Formatting.Indented, Setting)
                jsonObjectOperator = JsonConvert.SerializeObject(oOperatorData, Newtonsoft.Json.Formatting.Indented, Setting)
                jsonFilterControls = JsonConvert.SerializeObject(filterControls, Newtonsoft.Json.Formatting.Indented, Setting)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.SaveSuccessMessage()
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS() 'ex.Message.ToString()
            End Try

            Return Json(New With {
                Key .errortype = Keys.ErrorType,
                Key .errorMessage = Keys.ErrorMessage,
                       Key .sLookupFieldJSON = sLookupFieldJSON,
                    Key .sValueFieldNameJSON = sValueFieldNameJSON,
                    Key .sFirstLookupJSON = sFirstLookupJSON,
                    Key .sSecondLookupJSON = sSecondLookupJSON,
                    Key .sRecordJSON = sRecordJSON,
                       Key .jsonFilterControls = jsonFilterControls,
                     Key .filterColumnsJSON = filterColumnsJSON,
                Key .jsonObjectOperator = jsonObjectOperator
              }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

        End Function

        Public Function RefreshViewColGrid(vViewId As Integer, tableName As String)
            Try
                Dim GridColumnEntities = New List(Of GridColumns)()
                Dim lstTEMPViewColumns As New List(Of ViewColumn)
                If (Not TempData Is Nothing) Then
                    lstTEMPViewColumns = TempData.Peek("TempViewColumns_" & vViewId)
                End If
                If Not lstTEMPViewColumns Is Nothing Then
                    Dim lDatabas = _iDatabas.All.OrderBy(Function(m) m.Id)
                    Dim oTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower)).FirstOrDefault
                    For Each column As ViewColumn In lstTEMPViewColumns
                        Dim GridColumnEntity = New GridColumns()
                        GridColumnEntity.ColumnSrNo = column.Id
                        GridColumnEntity.ColumnId = column.ColumnNum
                        GridColumnEntity.ColumnName = column.Heading
                        Dim sFieldType As String = ""
                        Dim sFieldSize As String = ""
                        ViewModel.GetFieldTypeAndSize(oTable, lDatabas, column.FieldName, sFieldType, sFieldSize)
                        GridColumnEntity.ColumnDataType = sFieldType
                        GridColumnEntity.ColumnMaxLength = sFieldSize
                        GridColumnEntity.IsPk = False
                        GridColumnEntity.AutoInc = column.FilterField
                        GridColumnEntities.Add(GridColumnEntity)
                    Next
                    TempData.Remove("ColumnsData")
                    TempData("ColumnsData") = GridColumnEntities
                End If
                Keys.ErrorType = "s"
            Catch ex As Exception
                Keys.ErrorType = "e"
            End Try
            Return Json(New With {
                Key .errortype = Keys.ErrorType
              }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Shared Function GetColumnsData(lView As IQueryable(Of View), lViewColumns As IQueryable(Of ViewColumn), lDatabas As IQueryable(Of Databas), lTables As IQueryable(Of Table),
                                      intViewsId As Integer, sAction As String) As List(Of GridColumns)
            Dim GridColumnEntities = New List(Of GridColumns)()
            If Not String.IsNullOrEmpty(sAction) AndAlso sAction.Trim.ToUpper().Equals("E") Then
                Dim oViews = lView.Where(Function(x) x.Id = intViewsId).FirstOrDefault()
                'Dim lViewColumns = lViewColumn.All()
                'Dim lDatabas = lDatabas

                If Not oViews Is Nothing Then
                    Dim sTableName As String = oViews.TableName
                    Dim iViewsId = Convert.ToInt32(oViews.Id)
                    Dim oTable = lTables.Where(Function(x) x.TableName.Trim().ToLower().Equals(sTableName.Trim().ToLower())).FirstOrDefault()
                    Dim olViewColumns = lViewColumns.Where(Function(x) x.ViewsId = iViewsId).OrderBy(Function(x) x.ColumnNum)

                    If Not olViewColumns Is Nothing Then
                        If olViewColumns.Count() = 0 Then
                            Dim oViewsFirst = lView.Where(Function(x) x.TableName.Trim().ToLower().Equals(oViews.TableName.Trim().ToLower())).OrderBy(Function(x) x.ViewOrder).FirstOrDefault()
                            olViewColumns = lViewColumns.Where(Function(x) x.ViewsId = oViewsFirst.Id).OrderBy(Function(x) x.ColumnNum)
                        End If
                    End If

                    If Not olViewColumns Is Nothing Then

                        For Each column As ViewColumn In olViewColumns
                            Dim GridColumnEntity = New GridColumns()
                            GridColumnEntity.ColumnSrNo = column.Id
                            GridColumnEntity.ColumnId = column.ColumnNum
                            GridColumnEntity.ColumnName = column.Heading
                            Dim sFieldType As String = ""
                            Dim sFieldSize As String = ""
                            ViewModel.GetFieldTypeAndSize(oTable, lDatabas, column.FieldName, sFieldType, sFieldSize)
                            GridColumnEntity.ColumnDataType = sFieldType
                            GridColumnEntity.ColumnMaxLength = sFieldSize
                            GridColumnEntity.IsPk = False
                            GridColumnEntity.AutoInc = column.FilterField
                            GridColumnEntities.Add(GridColumnEntity)
                        Next

                    End If

                End If
            End If
            Return GridColumnEntities
        End Function

        Public Function FillColumnsDDL(oViewId As Integer) As JsonResult
            Dim jsonObjectColumns As String = String.Empty
            Try
                'Dim filterColumns As New Dictionary(Of Integer, ViewColumn)
                'Dim lstTEMPViewColumns As New List(Of ViewColumn)
                'Dim filterFieldList As New List(Of KeyValuePair(Of String, String))
                'If (Not TempData Is Nothing) Then
                '    lstTEMPViewColumns = TempData.Peek("TempViewColumns_" & oViewId)
                '    If (Not lstTEMPViewColumns Is Nothing) Then
                '        filterColumns = ViewModel.FillFilterFieldNames(lstTEMPViewColumns)
                '    End If
                'End If
                'If (Not filterColumns Is Nothing) Then
                '    For Each viewCol In filterColumns
                '        If (viewCol.Value.LookupType = Enums.geViewColumnsLookupType.ltLookup) Then
                '            filterFieldList.Add(New KeyValuePair(Of String, String)(viewCol.Value.Heading, Convert.ToString(viewCol.Value.ColumnNum) + "_" + Convert.ToString(viewCol.Value.LookupIdCol) + "***"))
                '        Else
                '            filterFieldList.Add(New KeyValuePair(Of String, String)(viewCol.Value.Heading, Convert.ToString(viewCol.Value.ColumnNum) + "_" + Convert.ToString(viewCol.Value.ColumnNum)))
                '        End If
                '    Next
                'End If
                'Dim Setting = New JsonSerializerSettings
                'Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                'jsonObjectColumns = JsonConvert.SerializeObject(filterFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
                jsonObjectColumns = Me.GetColumnsDDL(oViewId)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Keys.SaveSuccessMessage()
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS  'ex.Message.ToString()
            End Try

            Return Json(New With {
                Key .errortype = Keys.ErrorType,
                Key .errorMessage = Keys.ErrorMessage,
                Key .jsonObjectColumns = jsonObjectColumns
              }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

        End Function

        Public Function GetColumnsDDL(oViewId As Integer) As String
            Dim jsonObjectColumns As String = String.Empty
            Dim filterColumns As New Dictionary(Of Integer, ViewColumn)
            Dim lstTEMPViewColumns As New List(Of ViewColumn)
            Dim tempListViewColumns As New List(Of ViewColumn)
            Dim filterFieldList As New List(Of KeyValuePair(Of String, String))
            If (Not TempData Is Nothing) Then

                tempListViewColumns = TempData.Peek("TempViewColumns_" & oViewId)
                For Each ViewColumn As ViewColumn In tempListViewColumns
                    Dim objectView = New ViewColumn(ViewColumn)
                    lstTEMPViewColumns.Add(objectView)
                Next
                If (Not lstTEMPViewColumns Is Nothing) Then
                    filterColumns = ViewModel.FillFilterFieldNames(lstTEMPViewColumns)
                End If
            End If
            If (Not filterColumns Is Nothing) Then
                For Each viewCol In filterColumns
                    If (viewCol.Value.LookupType = Enums.geViewColumnsLookupType.ltLookup) Then
                        filterFieldList.Add(New KeyValuePair(Of String, String)(viewCol.Value.Heading, Convert.ToString(viewCol.Value.ColumnNum) + "_" + Convert.ToString(viewCol.Value.LookupIdCol) + "***"))
                    Else
                        filterFieldList.Add(New KeyValuePair(Of String, String)(viewCol.Value.Heading, Convert.ToString(viewCol.Value.ColumnNum) + "_" + Convert.ToString(viewCol.Value.ColumnNum)))
                    End If
                Next
            End If
            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            jsonObjectColumns = JsonConvert.SerializeObject(filterFieldList, Newtonsoft.Json.Formatting.Indented, Setting)
            Return jsonObjectColumns

        End Function

        Public Function FillColumnCombobox(ByRef sValueFieldName As String, ByRef sThisFieldHeading As String, ByRef sFirstLookupHeading As String, ByRef sSecondLookupHeading As String, oViewColumn As ViewColumn) As DataTable
            Try
                Dim jsonObjectColumns As String = ""
                Dim filterFieldList As New List(Of KeyValuePair(Of String, String))
                Dim sLookupTableName = ""
                Dim oParentTable As New Table
                Dim bLookUpById As Boolean
                Dim bFoundIt As Boolean
                Dim sThisFieldName As String = ""
                Dim actualTableName = _iView.All.Where(Function(m) m.Id = oViewColumn.ViewsId).FirstOrDefault.TableName
                Dim sSQL As String = ""
                Dim sADOCon As ADODB.Connection
                Dim table As New DataTable
                Dim sFirstLookupField As String = ""
                Dim sSecondLookupField As String = ""
                Dim sLookupFieldName As String = ""

                If (Not oViewColumn Is Nothing) Then
                    If (oViewColumn.LookupType = Enums.geViewColumnsLookupType.ltLookup) Then
                        sLookupTableName = oViewColumn.FieldName
                        If (InStr(sLookupTableName, ".") > 1) Then
                            sLookupTableName = Left$(sLookupTableName, (InStr(sLookupTableName, ".") - 1))
                        Else
                            sLookupTableName = actualTableName
                        End If

                        bLookUpById = False
                        sThisFieldName = DatabaseMap.RemoveTableNameFromField(oViewColumn.FieldName)
                        sThisFieldHeading = oViewColumn.Heading
                        If (Not String.IsNullOrEmpty(sLookupTableName)) Then
                            oParentTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(sLookupTableName.Trim.ToLower)).FirstOrDefault
                        End If
                        sLookupFieldName = sThisFieldName
                        If (Not (oParentTable Is Nothing)) Then
                            sValueFieldName = DatabaseMap.RemoveTableNameFromField(oParentTable.IdFieldName)
                        Else
                            sValueFieldName = sThisFieldName
                        End If
                        sValueFieldName = DatabaseMap.RemoveTableNameFromField(sValueFieldName)
                    Else
                        If (oViewColumn.LookupType = Enums.geViewColumnsLookupType.ltDirect) Then
                            bFoundIt = False
                            Dim parentRelationShip = _iRelationShip.All.Where(Function(m) m.LowerTableName.Trim.ToLower.Equals(actualTableName.Trim.ToLower))
                            For Each oRelationObj As RelationShip In parentRelationShip
                                If (DatabaseMap.RemoveTableNameFromField(oRelationObj.LowerTableFieldName).Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(oViewColumn.FieldName).Trim.ToLower)) Then
                                    bFoundIt = True
                                    sLookupTableName = oRelationObj.UpperTableName
                                    Exit For
                                End If
                            Next
                            If (Not bFoundIt) Then
                                Dim oRelationShip = _iRelationShip.All.OrderBy(Function(m) m.Id)
                                For Each oRelationObj As RelationShip In oRelationShip
                                    If (oRelationObj.LowerTableFieldName.Trim.ToLower.Equals(oViewColumn.FieldName.Trim.ToLower)) Then
                                        sLookupTableName = oRelationObj.UpperTableName
                                        Exit For
                                    End If
                                Next
                            End If
                            If (sLookupTableName = "") Then
                                Dim tempTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(actualTableName.Trim.ToLower)).FirstOrDefault
                                If (DatabaseMap.RemoveTableNameFromField(tempTable.RetentionFieldName).Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(oViewColumn.FieldName).Trim.ToLower)) Then
                                    sLookupTableName = "SLRetentionCodes"
                                Else
                                    If (InStr(sLookupTableName, ".") > 1) Then
                                        sLookupTableName = Left$(sLookupTableName, (InStr(sLookupTableName, ".") - 1))
                                    Else
                                        sLookupTableName = actualTableName
                                    End If
                                End If
                            End If
                            If (Not String.IsNullOrEmpty(sLookupTableName)) Then
                                oParentTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(sLookupTableName.Trim.ToLower)).FirstOrDefault
                                sThisFieldName = "Id"
                                sThisFieldHeading = "Id"
                            End If
                        End If
                        If (Not (oParentTable Is Nothing)) Then
                            sLookupFieldName = DatabaseMap.RemoveTableNameFromField(oParentTable.IdFieldName)
                        Else
                            sLookupFieldName = sThisFieldName
                        End If

                    End If


                    If (Not (oParentTable Is Nothing)) Then
                        sFirstLookupField = DatabaseMap.RemoveTableNameFromField(oParentTable.DescFieldNameOne)
                        sSecondLookupField = DatabaseMap.RemoveTableNameFromField(oParentTable.DescFieldNameTwo)
                    Else
                        sFirstLookupField = ""
                        sSecondLookupField = ""
                    End If
                    If (Not String.IsNullOrEmpty(sFirstLookupField)) Then
                        If (Not sFirstLookupField.Trim.ToLower.Equals(sLookupFieldName.Trim.ToLower)) Then
                            sFirstLookupHeading = oParentTable.DescFieldPrefixOne
                            If (sFirstLookupHeading Is Nothing) Then
                                sFirstLookupHeading = sFirstLookupField
                            End If
                            If (Not String.IsNullOrEmpty(sSecondLookupField)) Then
                                If (Not sSecondLookupField.Trim.ToLower.Equals(sLookupFieldName.Trim.ToLower)) Then
                                    sSecondLookupHeading = oParentTable.DescFieldPrefixTwo
                                    If (sSecondLookupHeading Is Nothing) Then
                                        sSecondLookupHeading = sSecondLookupField
                                    End If
                                End If
                            End If
                        Else
                            If (Not String.IsNullOrEmpty(sSecondLookupField)) Then
                                If (Not sSecondLookupField.Trim.ToLower.Equals(sLookupFieldName.Trim.ToLower)) Then
                                    sSecondLookupHeading = oParentTable.DescFieldPrefixTwo
                                    If (sSecondLookupHeading Is Nothing) Then
                                        sSecondLookupHeading = sSecondLookupField
                                    End If
                                End If
                            End If
                        End If
                    ElseIf (Not String.IsNullOrEmpty(sSecondLookupField)) Then
                        If (Not sSecondLookupField.Trim.ToLower.Equals(sLookupFieldName.Trim.ToLower)) Then
                            sSecondLookupHeading = oParentTable.DescFieldPrefixTwo
                            If (sSecondLookupHeading Is Nothing) Then
                                sSecondLookupHeading = sSecondLookupField
                            End If
                        End If
                    End If
                    If (Not String.IsNullOrEmpty(sThisFieldHeading)) Then
                        If (Not String.IsNullOrEmpty(sFirstLookupHeading)) Then
                            If (sFirstLookupHeading.Trim.ToLower.Equals(sThisFieldHeading.Trim.ToLower)) Then
                                sFirstLookupHeading = sFirstLookupField
                                If (Not String.IsNullOrEmpty(sSecondLookupHeading)) Then
                                    If (sSecondLookupHeading.Trim.ToLower.Equals(sThisFieldHeading.Trim.ToLower)) Then
                                        sSecondLookupHeading = sSecondLookupField
                                    End If
                                End If
                            Else
                                If (Not String.IsNullOrEmpty(sSecondLookupHeading)) Then
                                    If (sSecondLookupHeading.Trim.ToLower.Equals(sThisFieldHeading.Trim.ToLower)) Then
                                        sSecondLookupHeading = sSecondLookupField
                                    End If
                                End If
                            End If
                        ElseIf (Not String.IsNullOrEmpty(sSecondLookupHeading)) Then
                            If (Not sSecondLookupHeading.Trim.ToLower.Equals(sThisFieldHeading.Trim.ToLower)) Then
                                sSecondLookupHeading = sSecondLookupField
                            End If
                        End If
                    End If
                    If (oViewColumn.LookupType = Enums.geViewColumnsLookupType.ltDirect) Then
                        sValueFieldName = sThisFieldHeading
                    End If
                    If (oViewColumn.LookupType = Enums.geViewColumnsLookupType.ltLookup) Then
                        Dim flag = True
                        If (Not String.IsNullOrEmpty(sValueFieldName)) Then
                            If (Not String.IsNullOrEmpty(sLookupFieldName)) Then
                                sValueFieldName = sThisFieldHeading
                                flag = False
                            End If
                            If ((Not String.IsNullOrEmpty(sFirstLookupField)) And (flag)) Then
                                sValueFieldName = sFirstLookupHeading
                                flag = False
                            End If
                            If ((Not String.IsNullOrEmpty(sSecondLookupField)) And (flag)) Then
                                sValueFieldName = sSecondLookupHeading
                                flag = False
                            End If
                        End If
                    End If
                    'If (Not String.IsNullOrEmpty(sValueFieldName)) Then
                    '    If (Not String.IsNullOrEmpty(sLookupFieldName)) Then
                    '        If (sLookupFieldName.Trim.ToLower.Equals(sValueFieldName.Trim.ToLower)) Then
                    '            sValueFieldName = sLookupFieldName
                    '        End If
                    '    End If
                    '    If (Not String.IsNullOrEmpty(sFirstLookupField)) Then

                    '    End If
                    '    If (Not String.IsNullOrEmpty(sFirstLookupField)) Then

                    '    End If
                    'End If
                    If (Not String.IsNullOrEmpty(sLookupFieldName)) Then
                        sSQL = "SELECT [" + sLookupFieldName + "]"
                    Else
                        sSQL = "SELECT "
                    End If
                    If (Not String.IsNullOrEmpty(sFirstLookupHeading)) Then
                        sSQL = sSQL & ",[" + sFirstLookupField + "]"
                    Else
                        sSQL = sSQL
                    End If
                    If (Not String.IsNullOrEmpty(sSecondLookupHeading)) Then
                        sSQL = sSQL & ",[" + sSecondLookupField + "] "
                    Else
                        sSQL = sSQL
                    End If

                    If ((Not (String.IsNullOrEmpty(sSQL))) And (Not (oParentTable Is Nothing))) Then
                        sSQL = sSQL & " FROM [" + oParentTable.TableName + "];"
                        sADOCon = DataServices.DBOpen(oParentTable, _iDatabas.All())

                    Else
                        sSQL = sSQL & " FROM [" + sLookupTableName + "];"
                        sADOCon = DataServices.DBOpen()

                    End If
                    Dim rs = DataServices.GetADORecordSet(sSQL, sADOCon)
                    If (Not rs.RecordCount = 0) Then
                        If (Not String.IsNullOrEmpty(sThisFieldHeading)) Then
                            table.Columns.Add(New DataColumn(sThisFieldHeading))
                        End If
                        If (Not String.IsNullOrEmpty(sFirstLookupHeading)) Then
                            table.Columns.Add(New DataColumn(sFirstLookupHeading))
                        Else
                            sFirstLookupField = ""
                        End If
                        If (Not String.IsNullOrEmpty(sSecondLookupHeading)) Then
                            table.Columns.Add(New DataColumn(sSecondLookupHeading))
                        Else
                            sSecondLookupField = ""
                        End If

                        Do Until rs.EOF
                            Dim rowObj As DataRow = table.NewRow
                            If ((Not String.IsNullOrEmpty(sThisFieldHeading)) And (Not String.IsNullOrEmpty(sLookupFieldName))) Then
                                rowObj(sThisFieldHeading) = rs.Fields(sLookupFieldName).Value
                            End If
                            If ((Not String.IsNullOrEmpty(sFirstLookupHeading)) And (Not String.IsNullOrEmpty(sFirstLookupField))) Then
                                rowObj(sFirstLookupHeading) = rs.Fields(sFirstLookupField).Value
                            End If
                            If ((Not String.IsNullOrEmpty(sSecondLookupHeading)) And (Not String.IsNullOrEmpty(sSecondLookupField))) Then
                                rowObj(sSecondLookupHeading) = rs.Fields(sSecondLookupField).Value
                            End If
                            table.Rows.Add(rowObj)
                            rs.MoveNext()
                        Loop

                    End If
                End If
                Keys.ErrorType = "s"
                Return table
            Catch ex As Exception
                Keys.ErrorType = "e"
                Throw 'ex
            End Try
        End Function

        Public Function MoveFilterInSQL(lViewsCustomModelEntites As ViewsCustomModel) As JsonResult
            Try
                Dim lViewsData = lViewsCustomModelEntites.ViewsModel
                Dim oViewId = lViewsData.Id
                Dim lViewFiltersData As New List(Of ViewFilter)
                If (TempData.ContainsKey("ViewFilterUpdate")) Then
                    lViewFiltersData = TempData.Peek("ViewFilterUpdate")
                    lViewFiltersData = lViewFiltersData.Where(Function(m) m.ViewsId <> -1).ToList
                Else
                    lViewFiltersData = _iViewFilter.All().Where(Function(m) m.ViewsId = oViewId).ToList()
                End If
                'Dim lViewFiltersData As List(Of ViewFilter) = lViewsCustomModelEntites.ViewFilterList
                Dim oTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(lViewsData.TableName.Trim.ToLower)).FirstOrDefault
                Dim lstViewColumns As New List(Of ViewColumn)
                Dim sError As String = ""
                Dim sSQL As String = ""
                Dim sTemp As String = ""
                Dim iWherePos As Integer
                Dim jsonSQLState As String = ""

                If (Not TempData Is Nothing) Then
                    lstViewColumns = TempData.Peek("TempViewColumns_" & oViewId)
                End If


                If (Not lViewFiltersData Is Nothing) Then
                    Dim lViewFiltersDataList = lViewFiltersData.Where(Function(m) m.ViewsId <> -1).ToList
                    sError = ViewModel.ProcessFilter(lViewFiltersDataList, lstViewColumns, _iTable.All(), _iDatabas.All(), lViewsData, oTable, True, sSQL, False, True)
                End If

                If (sError <> "") Then
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlErrorMovingFilters"), sError)
                    Keys.ErrorType = "w"
                Else
                    sTemp = lViewsData.SQLStatement
                    iWherePos = InStr(1, sTemp, " WHERE ", vbTextCompare)

                    If iWherePos > 0 Then
                        sTemp = Left$(sTemp, (iWherePos + 6)) & "(" & Mid$(sTemp, (iWherePos + 7))
                        sTemp = sTemp & " AND " & sSQL & ")"
                    Else
                        sTemp = sTemp & " WHERE " & sSQL
                    End If
                    Dim viewFilterData = _iViewFilter.All.Where(Function(m) m.ViewsId = lViewsData.Id)
                    _iViewFilter.DeleteRange(viewFilterData)
                    TempData.Remove("ViewFilterUpdate")
                    Dim SQLState = sTemp
                    Dim Setting = New JsonSerializerSettings
                    Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                    jsonSQLState = JsonConvert.SerializeObject(SQLState, Newtonsoft.Json.Formatting.Indented, Setting)


                    Keys.ErrorMessage = ""
                    Keys.ErrorType = "s"
                End If
                Return Json(New With {
                        Key .errortype = Keys.ErrorType,
                        Key .errorMessage = Keys.ErrorMessage,
                        Key .jsonSQLState = jsonSQLState
                        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Throw ex.InnerException
            End Try
        End Function

        Public Sub GetFilterData(oViewId As Integer, ByRef filterColumns As List(Of ViewFilter))
            Try
                If (TempData.ContainsKey("ViewFilterUpdate")) Then
                    filterColumns = TempData.Peek("ViewFilterUpdate")
                Else
                    filterColumns = _iViewFilter.All().Where(Function(m) m.ViewsId = oViewId).ToList()
                End If
            Catch ex As Exception
            End Try
        End Sub

        Public Function ValidateFilterData(lViewsCustomModelEntites As ViewsCustomModel, EventFlag As Boolean) As ActionResult
            Dim sErrorJSON As String = ""
            Dim moveFilterFlagJSON As String = ""
            Try
                Dim lViewsData = lViewsCustomModelEntites.ViewsModel
                Dim lstViewColumns As New List(Of ViewColumn)
                Dim lViewFiltersData As List(Of ViewFilter) = lViewsCustomModelEntites.ViewFilterList
                Dim oViewId = lViewsData.Id
                Dim sError As String = ""
                Dim oTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(lViewsData.TableName.Trim.ToLower)).FirstOrDefault
                Dim sSQL As String = ""
                Dim moveFilterFlag As Boolean = False
                If (Not TempData Is Nothing) Then
                    lstViewColumns = TempData.Peek("TempViewColumns_" & oViewId)
                End If

                If (lViewFiltersData IsNot Nothing) Then
                    Dim lViewFiltersDataList = lViewFiltersData.Where(Function(m) m.ViewsId <> -1).ToList

                    If (lViewFiltersDataList.Count <> 0) Then
                        moveFilterFlag = lViewFiltersDataList.Any(Function(m) m.Active = True)
                        If (moveFilterFlag) Then
                            For Each lviewFilter In lViewFiltersDataList
                                If (lviewFilter.ColumnNum Is Nothing) Then
                                    Keys.ErrorType = "s"
                                    moveFilterFlag = False
                                    Exit Try
                                Else
                                    moveFilterFlag = True
                                End If
                            Next
                            sError = ViewModel.ProcessFilter(lViewFiltersDataList, lstViewColumns, _iTable.All(), _iDatabas.All(), lViewsData, oTable, True, sSQL, False, True)
                        End If
                    End If
                Else
                    Exit Try
                End If
                If (EventFlag) Then
                    If (sError.Equals("") And lViewFiltersData.Count <> 0) Then
                        TempData("ViewFilterUpdate") = lViewFiltersData
                    End If
                End If

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                sErrorJSON = JsonConvert.SerializeObject(sError, Newtonsoft.Json.Formatting.Indented, Setting)
                moveFilterFlagJSON = JsonConvert.SerializeObject(moveFilterFlag, Newtonsoft.Json.Formatting.Indented, Setting)
                Keys.ErrorType = "w"
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS() 'ex.Message.ToString
            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .errorMessage = Keys.ErrorMessage,
                    Key .sErrorJSON = sErrorJSON,
                    Key .moveFilterFlagJSON = moveFilterFlagJSON
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetFilterData1(oViewId As Integer)
            Dim filterColumnsJSON As String = ""
            Dim parmOpenCloseExist = False
            Dim joinOrOperatorExist = False

            Dim jsonColumns As String = ""
            Try
                Dim filterColumns As New List(Of ViewFilter)
                If (TempData.ContainsKey("ViewFilterUpdate")) Then
                    filterColumns = TempData.Peek("ViewFilterUpdate")
                    filterColumns = filterColumns.Where(Function(m) m.ViewsId <> -1).ToList
                Else
                    filterColumns = _iViewFilter.All().Where(Function(m) m.ViewsId = oViewId).ToList()
                End If
                For Each filterObj In filterColumns
                    If ((filterObj.OpenParen IsNot Nothing) And (Not String.IsNullOrEmpty(filterObj.OpenParen))) Then
                        If (filterObj.OpenParen.Contains("(")) Then
                            parmOpenCloseExist = True
                            Exit For
                        Else
                            If ((filterObj.CloseParen IsNot Nothing) And (Not String.IsNullOrEmpty(filterObj.CloseParen))) Then
                                If (filterObj.CloseParen.Contains("")) Then
                                    parmOpenCloseExist = True
                                    Exit For
                                End If
                            End If
                        End If

                    End If
                    'parmOpenCloseExist = filterColumns.Any(Function(m) m.CloseParen IsNot Nothing Or m.OpenParen IsNot Nothing)

                Next
                joinOrOperatorExist = filterColumns.Any(Function(m) m.JoinOperator = "Or")
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                filterColumnsJSON = JsonConvert.SerializeObject(filterColumns, Newtonsoft.Json.Formatting.Indented, Setting)
                jsonColumns = Me.GetColumnsDDL(oViewId)

                Keys.ErrorType = "s"

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS() 'ex.Message.ToString
            End Try

            Dim AnyadvancedFeatureCheck = parmOpenCloseExist
            Return Json(New With {
                        Key .errortype = Keys.ErrorType,
                        Key .errorMessage = Keys.ErrorMessage,
                        Key .filterColumnsJSON = filterColumnsJSON,
                        Key .jsonColumns = jsonColumns,
                        Key .AdvancedJsonFlag = AnyadvancedFeatureCheck,
                        Key .joinOrOperatorExist = joinOrOperatorExist
                   }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'DELETE the selected view.
        Public Function DeleteView(pViewId As Integer) As JsonResult

            If pViewId <= 0 Then
                Return Json(New With {
                    Key .errortype = "e",
                    Key .message = "Selected view not found."
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End If

            _iView.BeginTransaction()
            _iViewColumn.BeginTransaction()
            _iViewFilter.BeginTransaction()

            Dim BaseWebPage = New BaseWebPage()
            Dim oSecureObject = New Smead.Security.SecureObject(BaseWebPage.Passport)

            Try

                Dim oView = _iView.All().Where(Function(x) x.Id = pViewId).FirstOrDefault()

                Dim lSecureObjectId = oSecureObject.GetSecureObjectID(oView.ViewName, Enums.SecureObjects.View)
                If (lSecureObjectId <> 0) Then oSecureObject.UnRegister(lSecureObjectId)

                Dim lViewFilters = _iViewFilter.All().Where(Function(x) x.ViewsId = pViewId)
                _iViewFilter.DeleteRange(lViewFilters)

                Dim lViewColumns = _iViewColumn.All().Where(Function(x) x.ViewsId = pViewId)
                _iViewColumn.DeleteRange(lViewColumns)

                _iView.Delete(oView)


                _iViewFilter.CommitTransaction()
                _iViewColumn.CommitTransaction()
                _iView.CommitTransaction()

                Keys.UpdatePermission()

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlViewDeletedSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
                _iViewFilter.RollBackTransaction()
                _iViewColumn.RollBackTransaction()
                _iView.RollBackTransaction()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Up & Down
        Public Function ViewsOrderChange(pAction As String, pViewId As Integer) As JsonResult
            Dim bUpperLast As Boolean = False, bLowerLast As Boolean = False
            Try
                Dim lViews = _iView.All()
                Dim oViews = lViews.Where(Function(x) x.Id = pViewId).FirstOrDefault()
                Dim oUpperView As View, oDownView As View
                Dim intUpdatedOrder As Integer, intOrgOrder As Integer, intLastOrder As Integer

                Dim oTableName = ""
                If Not oViews Is Nothing Then
                    oTableName = oViews.TableName
                    intOrgOrder = oViews.ViewOrder
                End If

                lViews = lViews.Where(Function(x) x.TableName.Trim().ToLower().Equals(oTableName.Trim().ToLower()))

                Dim oViewSortButton = lViews.Where(Function(x) x.Printable = False).OrderByDescending(Function(x) x.ViewOrder).FirstOrDefault()
                intLastOrder = oViewSortButton.ViewOrder

                If Not String.IsNullOrEmpty(oTableName) Then

                    If pAction = "U" Then
                        oUpperView = lViews.Where(Function(x) x.ViewOrder < oViews.ViewOrder AndAlso x.Printable = False).OrderByDescending(Function(x) x.ViewOrder).FirstOrDefault()

                        intUpdatedOrder = oUpperView.ViewOrder
                        oUpperView.ViewOrder = intOrgOrder
                        _iView.Update(oUpperView)

                    ElseIf pAction = "D" Then
                        oDownView = lViews.Where(Function(x) x.ViewOrder > oViews.ViewOrder AndAlso x.Printable = False).OrderBy(Function(x) x.ViewOrder).FirstOrDefault()

                        intUpdatedOrder = oDownView.ViewOrder
                        oDownView.ViewOrder = intOrgOrder
                        _iView.Update(oDownView)
                    End If

                    oViews.ViewOrder = intUpdatedOrder

                    If intUpdatedOrder = intLastOrder Then
                        bLowerLast = True
                    End If
                    If intUpdatedOrder = 1 Then
                        bUpperLast = True
                    End If
                    _iView.Update(oViews)

                End If

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlViewDeletedSuccessfully")

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()

            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                        Key .bupperlast = bUpperLast,
                        Key .blowerlast = bLowerLast
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

#End Region

#Region "Reports"
        Public Function ReportListPartial() As PartialViewResult
            Return PartialView("_ReportListPartial")
        End Function

        'Public Function ReportsTreePartial() As PartialViewResult

        '    Dim lTableEntities = _iTable.All().OrderBy(Function(m) m.TableName)
        '    Dim lViewsEntities = _iView.All()
        '    Dim lReportStyleEntities = _iReportStyle.All()

        '    Dim treeView = ReportsModel.GetBindTreeControlReports(lTableEntities, lViewsEntities, lReportStyleEntities)

        '    Return PartialView("_ReportsTreePartial", treeView)
        'End Function

        Public Function ReportsTreePartial(root As String) As ContentResult

            Dim lTableEntities = _iTable.All().OrderBy(Function(m) m.TableName)
            Dim lViewsEntities = _iView.All()
            Dim lReportStyleEntities = _iReportStyle.All()

            'Dim treeView = ReportsModel.GetBindTreeControlReports(lTableEntities, lViewsEntities, lReportStyleEntities)
            Dim treeView = ReportsModel.GetBindReportsMenus(root, lTableEntities, lViewsEntities, lReportStyleEntities)

            Return Content(treeView)
        End Function

        Public Function LoadReportsView() As PartialViewResult
            Return PartialView("_ReportDefinitionsPartial")
        End Function

        Public Function GetReportInformation(pReportID As Integer, bIsAdd As Integer) As ActionResult
            Dim lstTblNames As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
            Dim lstReportStyles As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
            Dim oTable As Table
            Dim lstTblNamesList As String = ""
            Dim lstReportStylesList As String = ""
            Dim lstChildTablesObjStr As String = ""
            'Dim actualTblName As String = ""
            Dim lstChildTables As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
            Dim lNextReport As Integer = 0
            Dim sReportName As String = ""
            Dim bFound As Boolean
            Dim pViewEntity As View
            Dim pSubViewEntity As View
            Dim lstRelatedChildTable As List(Of RelationShip) = New List(Of RelationShip)
            'Dim reportName As String = ""
            Dim tblName As String = ""
            Dim sReportStyleId As String = ""
            Dim BaseWebPage As BaseWebPage = New BaseWebPage()

            Dim tableEntity = _iTable.All().SortBy("TableName")
            Dim reportStyleEntity = _iReportStyle.All()
            'March 30 2016.
            Dim subViewId2 As Integer = 0
            Dim subViewId3 As Integer = 0

            pViewEntity = _iView.All().Where(Function(x) x.Id = pReportID).FirstOrDefault()
            If Not IsNothing(pViewEntity) Then
                If pViewEntity.SubViewId > 0 And pViewEntity.SubViewId <> 9999 Then
                    subViewId2 = pViewEntity.SubViewId
                End If
            End If

            If subViewId2 > 0 And subViewId2 <> 9999 Then
                pSubViewEntity = _iView.All().Where(Function(x) x.Id = subViewId2).FirstOrDefault()
                'Added on April 26th 2016.
                If Not IsNothing(pSubViewEntity) Then
                    subViewId3 = pSubViewEntity.SubViewId
                End If
            End If

            Try
                'Get the list of Tables for report.
                For Each oTable In tableEntity
                    If (Not CollectionsClass.IsEngineTable(oTable.TableName) And BaseWebPage.Passport.CheckPermission(oTable.TableName, Enums.SecureObjects.Table, Enums.PassportPermissions.View)) Then
                        lstTblNames.Add(New KeyValuePair(Of String, String)(oTable.TableName, oTable.UserName))
                    End If
                Next oTable

                'Get the list of Report Styles
                For Each oReportStyle In reportStyleEntity
                    lstReportStyles.Add(New KeyValuePair(Of String, String)(oReportStyle.ReportStylesId, oReportStyle.Id))
                Next oReportStyle

                'Get the list of child tables for Level 2.
                'Commented by Ganesh. - For Bug fixing.
                'If (Not pViewEntity.TableName = "") Then
                '    actualTblName = _iTable.All().Where(Function(x) x.UserName = pViewEntity.TableName).FirstOrDefault().TableName
                'End If
                If Not pViewEntity Is Nothing Then
                    lstRelatedChildTable = _iRelationShip.All().Where(Function(x) x.UpperTableName = pViewEntity.TableName).ToList()
                    sReportName = pViewEntity.ViewName
                    tblName = pViewEntity.TableName
                    sReportStyleId = pViewEntity.ReportStylesId
                End If

                For Each lTableName In lstRelatedChildTable
                    'Change on date- June 18th 2015.
                    oTable = _iTable.All().Where(Function(x) x.UserName.Equals(lTableName.LowerTableName)).FirstOrDefault()

                    If (oTable IsNot Nothing) Then
                        lstChildTables.Add(New KeyValuePair(Of String, String)(oTable.TableName, oTable.UserName))
                        oTable = Nothing
                    End If
                Next

                'Get the report name when clicked on ADD.
                If (bIsAdd) Then
                    Do
                        bFound = False

                        If (lNextReport = 0) Then
                            'Modified by Hemin for bug fix
                            'sReportName = Languages.Translation("tiAdminCtrlNewReport")
                            sReportName = "New Report"
                        Else
                            'Modified by Hemin
                            'sReportName = String.Format(Languages.Translation("tiAdminCtrlNewReport1"), lNextReport)
                            sReportName = "New Report " & lNextReport
                        End If

                        'For Each oTable In _iTable.All()
                        For Each oView In _iView.All()
                            If (StrComp(oView.ViewName, sReportName, vbTextCompare) = 0) Then
                                lNextReport = lNextReport + 1
                                bFound = True
                            End If
                        Next oView
                        'Next oTable

                        If (Not bFound) Then
                            Exit Do
                        End If
                    Loop
                End If


                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects

                lstTblNamesList = JsonConvert.SerializeObject(lstTblNames, Newtonsoft.Json.Formatting.Indented, Setting)
                lstReportStylesList = JsonConvert.SerializeObject(lstReportStyles, Newtonsoft.Json.Formatting.Indented, Setting)
                lstChildTablesObjStr = JsonConvert.SerializeObject(lstChildTables, Newtonsoft.Json.Formatting.Indented, Setting)
            Catch ex As Exception

            End Try

            Return Json(New With {Key .lstTblNamesList = lstTblNamesList,
                    Key .lstReportStylesList = lstReportStylesList,
                    Key .lstChildTablesObjStr = lstChildTablesObjStr,
                    Key .sReportName = sReportName,
                    Key .tblName = tblName,
                    Key .sReportStyleId = sReportStyleId,
                    Key .subViewId2 = subViewId2,
                    Key .subViewId3 = subViewId3,
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'DELETE the selected report.
        Public Function DeleteReport(pReportID As Integer) As JsonResult
            Try
                Dim pViewEntity As View
                Dim pViewColEnities
                Dim pSubViewEntity As View
                Dim pSubViewColEntities
                'New Added
                'Dim pViewEntity = _iView.All().Where(Function(x) x.Id = pReportID).FirstOrDefault()
                'Dim pInternalTblName = _iTable.All().Where(Function(x) x.UserName = pTableName).FirstOrDefault().TableName
                Dim pSecureObjEntity
                Dim pSecureObjPermisionEntities
                Dim pSecureObjectID As Integer

                'Dim pViewID = _iView.All().Where(Function(x) x.TableName = pInternalTblName And x.ViewName = pReportName).FirstOrDefault().Id
                'Dim pSubViewID = _iView.All().Where(Function(x) x.TableName = pInternalTblName And x.ViewName = pReportName).FirstOrDefault().SubViewId

                _iView.BeginTransaction()
                _iViewColumn.BeginTransaction()
                _iSecureObject.BeginTransaction()
                _iSecureObjectPermission.BeginTransaction()
                'DELETE View and ViewColumns for report been deleted.
                pViewEntity = _iView.All().Where(Function(x) x.Id = pReportID).FirstOrDefault()
                _iView.Delete(pViewEntity)

                pViewColEnities = _iViewColumn.All().Where(Function(x) x.ViewsId = pReportID)
                _iViewColumn.DeleteRange(pViewColEnities)

                Dim pSecureObject = _iSecureObject.All().FirstOrDefault(Function(x) x.Name = pViewEntity.ViewName And x.SecureObjectTypeID = Enums.SecureObjectType.Reports)
                If (pSecureObject IsNot Nothing) Then
                    pSecureObjectID = pSecureObject.SecureObjectID
                    pSecureObjEntity = _iSecureObject.All().Where(Function(x) x.SecureObjectID = pSecureObjectID).FirstOrDefault()
                    _iSecureObject.Delete(pSecureObjEntity)
                    _iSecureObject.CommitTransaction()

                    pSecureObjPermisionEntities = _iSecureObjectPermission.All().Where(Function(x) x.SecureObjectID = pSecureObjectID)
                    _iSecureObjectPermission.DeleteRange(pSecureObjPermisionEntities)
                End If


                If pViewEntity.SubViewId <> 0 Then
                    pSubViewEntity = _iView.All().FirstOrDefault(Function(x) x.Id = pViewEntity.SubViewId)

                    '' Added by Hasmukh - check secound level available or not
                    If Not pSubViewEntity Is Nothing Then
                        Dim pThirdLevelSubViewId = pSubViewEntity.SubViewId

                        _iView.Delete(pSubViewEntity)

                        pSubViewColEntities = _iViewColumn.All().Where(Function(x) x.ViewsId = pViewEntity.SubViewId)
                        _iViewColumn.DeleteRange(pSubViewColEntities)

                        '' Added by Hasmukh - check third level available or not
                        If pThirdLevelSubViewId <> 0 Then
                            Dim pSubViewThirdLevelEntity = _iView.All().FirstOrDefault(Function(x) x.Id = pThirdLevelSubViewId)
                            If Not pSubViewThirdLevelEntity Is Nothing Then
                                _iView.Delete(pSubViewThirdLevelEntity)

                                Dim pSubViewThirdLevelColEntities = _iViewColumn.All().Where(Function(x) x.ViewsId = pThirdLevelSubViewId)
                                _iViewColumn.DeleteRange(pSubViewThirdLevelColEntities)
                            End If
                        End If

                    End If
                End If

                _iView.CommitTransaction()
                _iViewColumn.CommitTransaction()
                '_iSecureObject.CommitTransaction()
                _iSecureObjectPermission.CommitTransaction()

                'Fill the secure permissions dataset after delete report.
                CollectionsClass.ReloadPermissionDataSet()

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRptDelSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
                _iSecureObjectPermission.RollBackTransaction()
                _iSecureObject.RollBackTransaction()
                _iViewColumn.RollBackTransaction()
                _iView.RollBackTransaction()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function DeleteReportsPrintingColumn(pColumnId As Integer, pIndex As Integer) As JsonResult
            Dim lstViewColumns As List(Of ViewColumn)
            Dim pViewColumn As ViewColumn
            Try
                lstViewColumns = TempData("TempViewColumns_" & pIndex)
                pViewColumn = lstViewColumns.FirstOrDefault(Function(x) x.Id = pColumnId)
                Dim ColumnNumVar = pViewColumn.ColumnNum
                lstViewColumns.Remove(pViewColumn)
                For Each viewColObj As ViewColumn In lstViewColumns
                    If (viewColObj.ColumnNum > ColumnNumVar) Then
                        viewColObj.ColumnNum = ColumnNumVar
                        ColumnNumVar = ColumnNumVar + 1
                    End If
                Next
                TempData("TempViewColumns_" & pIndex) = lstViewColumns
                TempData.Peek("TempViewColumns_" & pIndex)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlColRmvSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Get the list of views related to table.
        Public Function GetTablesView(pTableName As String) As JsonResult
            Dim lstViews As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
            Dim oTable As Table
            Dim lstViewStr As String = ""
            Dim lstChildTablesObjStr As String = ""
            Dim tableEntity = _iTable.All().SortBy("TableName")
            Dim lViewEntities = _iView.All()
            Dim lViewColumnEntities = _iViewColumn.All()
            Dim lstChildTables As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
            Dim BaseWebPage = New BaseWebPage()
            'Change made on 19th June 2015.            
            Dim lLoopViewEntities = lViewEntities.Where(Function(x) x.TableName.Trim().ToLower() = pTableName.ToLower())

            Try
                For Each oView In lLoopViewEntities
                    'Added on 06/01/2016
                    'If (Not oView.Printable) And (BaseWebPage.Passport.CheckPermission(oView.ViewName, Enums.SecureObjects.View, Enums.PassportPermissions.View)) Then
                    '    lstViews.Add(New KeyValuePair(Of String, String)(oView.Id, oView.ViewName))
                    'End If
                    'Added on 06/01/2016
                    If (NotSubReport(oView, pTableName)) Then
                        'If oView.Printable Then
                        'If (BaseWebPage.Passport.CheckPermission(oView.ViewName, Enums.SecureObjects.Reports, Enums.PassportPermissions.Configure)) Then
                        If (BaseWebPage.Passport.CheckPermission(oView.ViewName, Enums.SecureObjects.Reports, Enums.PassportPermissions.View) Or BaseWebPage.Passport.CheckPermission(oView.ViewName, Enums.SecureObjects.View, Enums.PassportPermissions.View)) Then
                            'If (_iSecureObject.All().Any(Function(x) x.Name = oView.ViewName)) Then
                            lstViews.Add(New KeyValuePair(Of String, String)(oView.Id, oView.ViewName))
                        End If
                        'End If
                        'End If
                        'End If
                    End If
                Next oView

                Dim lstRelatedChildTable = _iRelationShip.All().Where(Function(x) x.UpperTableName = pTableName).ToList()

                For Each lTableName In lstRelatedChildTable
                    oTable = _iTable.All().Where(Function(x) x.TableName.Equals(lTableName.LowerTableName)).FirstOrDefault()

                    If (oTable IsNot Nothing) Then
                        lstChildTables.Add(New KeyValuePair(Of String, String)(oTable.TableName, oTable.UserName))
                        oTable = Nothing
                    End If
                Next

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects

                lstViewStr = JsonConvert.SerializeObject(lstViews, Newtonsoft.Json.Formatting.Indented, Setting)
                lstChildTablesObjStr = JsonConvert.SerializeObject(lstChildTables, Newtonsoft.Json.Formatting.Indented, Setting)

            Catch ex As Exception

            End Try

            Return Json(New With {
                    Key .lstViewsList = lstViewStr,
                    Key .lstChildTablesObjStr = lstChildTablesObjStr,
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Get the list of columns for report view.
        Public Function GetColumnsForPrinting(pTableName As String, pViewId As Integer, pIndex As Integer) As JsonResult

            Dim viewColumnEntity = _iViewColumn.All().Where(Function(x) x.ViewsId = pViewId).OrderByField("ColumnNum", True)
            Dim viewColumnEntityObj As String = ""
            Dim lstTrackedHistory As List(Of KeyValuePair(Of Integer, String)) = New List(Of KeyValuePair(Of Integer, String))
            Dim lstTrackedHisObj As String = ""
            Dim lstViewObjStr As String = ""
            Dim tableEntityObjStr As String = ""
            Dim iCount As Integer = 0
            Dim mbHistory As Boolean
            Dim tableEntity As Table
            Dim oChildTable As Table
            Dim oView As View
            Dim lstTEMPViewColumns As List(Of ViewColumn) = New List(Of ViewColumn)
            Dim BaseWebPage As BaseWebPage = New BaseWebPage()
            Dim bTrackable As Boolean = False
            Dim altViewId As Integer = 0

            Try
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects

                'Added on 24/12/2015 to fix Bug#793
                If (viewColumnEntity.Count() = 0) Then
                    altViewId = _iView.All().Where(Function(x) x.Id = pViewId).FirstOrDefault().AltViewId
                    If altViewId <> 0 Then
                        viewColumnEntity = _iViewColumn.All().Where(Function(x) x.ViewsId = altViewId).OrderByField("ColumnNum", True)
                    End If
                End If

                viewColumnEntityObj = JsonConvert.SerializeObject(viewColumnEntity, Newtonsoft.Json.Formatting.Indented, Setting)

                'Added New on date - 23rd June 2015.
                For Each objView In viewColumnEntity
                    lstTEMPViewColumns.Add(objView)
                Next

                'TempData("ViewId") = pViewId

                If lstTEMPViewColumns.Count > 0 Then
                    TempData("TempViewColumns_" & pIndex) = lstTEMPViewColumns
                End If

                Dim ViewsEntity = _iView.All().Where(Function(x) x.Id = pViewId)
                lstViewObjStr = JsonConvert.SerializeObject(ViewsEntity, Newtonsoft.Json.Formatting.Indented, Setting)

                tableEntity = _iTable.All().Where(Function(x) x.TableName = pTableName).FirstOrDefault()
                oView = _iView.All().Where(Function(x) x.Id = pViewId).FirstOrDefault()

                lstTrackedHistory.Add(New KeyValuePair(Of Integer, String)(0, "None"))
                bTrackable = BaseWebPage.Passport.CheckPermission(tableEntity.TableName.Trim, Enums.SecureObjects.Table, Enums.PassportPermissions.Transfer)

                If ((bTrackable) Or (tableEntity.TrackingTable > 0)) Then 'tableEntity.Trackable
                    oChildTable = _iTable.All().Where(Function(x) x.TableName = oView.TableName).FirstOrDefault()

                    If (Not (oChildTable Is Nothing)) Then
                        iCount = iCount + 1
                        Dim bChildTrackable = BaseWebPage.Passport.CheckPermission(oChildTable.TableName.Trim, Enums.SecureObjects.Table, Enums.PassportPermissions.Transfer)
                        If (bChildTrackable) Then 'oChildTable.Trackable
                            lstTrackedHistory.Add(New KeyValuePair(Of Integer, String)(iCount, "History"))
                            mbHistory = True
                        Else
                            mbHistory = False
                        End If

                        Dim lstTrackingtbls = LoadTrackingTables()

                        If (oChildTable.TrackingTable > 0) Then
                            Dim bContainerTrackable = False

                            If (oChildTable.TrackingTable < lstTrackingtbls.Count) Then
                                For Each oContainer In lstTrackingtbls
                                    bContainerTrackable = BaseWebPage.Passport.CheckPermission(oContainer.TableName.Trim, Enums.SecureObjects.Table, Enums.PassportPermissions.Transfer)
                                    If ((oContainer.TrackingTable > oChildTable.TrackingTable) And (bContainerTrackable)) Then 'oContainer.Trackable
                                        iCount = iCount + 1
                                        lstTrackedHistory.Add(New KeyValuePair(Of Integer, String)(iCount, oContainer.UserName & " Contained"))
                                    End If
                                Next
                            End If

                            For Each oContainer In _iTable.All()
                                bContainerTrackable = BaseWebPage.Passport.CheckPermission(oContainer.TableName.Trim, Enums.SecureObjects.Table, Enums.PassportPermissions.Transfer)
                                If ((oContainer.TrackingTable = 0) And (bContainerTrackable)) Then 'oContainer.Trackable
                                    iCount = iCount + 1
                                    lstTrackedHistory.Add(New KeyValuePair(Of Integer, String)(iCount, oContainer.UserName & " Contained"))
                                End If
                            Next

                            lstTrackedHistory.Add(New KeyValuePair(Of Integer, String)(9999, "All Contents Contained"))
                        End If

                        oChildTable = Nothing
                    End If
                End If

                lstTrackedHisObj = JsonConvert.SerializeObject(lstTrackedHistory, Newtonsoft.Json.Formatting.Indented, Setting)
                tableEntityObjStr = JsonConvert.SerializeObject(tableEntity, Newtonsoft.Json.Formatting.Indented, Setting)

            Catch ex As Exception

            End Try

            Return Json(New With {
                    Key .viewColumnEntityObj = viewColumnEntityObj,
                    Key .lstViewObjStr = lstViewObjStr,
                    Key .lstTrackedHisObj = lstTrackedHisObj,
                    Key .tableEntityObjStr = tableEntityObjStr,
                    Key .bTrackable = bTrackable,
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function SetReportDefinitionValues(formData As FormCollection, pOldReportName As String, pReportStyle As String) As ActionResult

            Dim ViewId As Integer
            Dim bGrandTotal As Boolean
            Dim bIncludeImages As Boolean
            Dim bIncludeHeaders As Boolean
            Dim bIncludeFooters As Boolean
            Dim bPrintImageFullPage As Boolean
            Dim bPrintImageFirstPageOnly As Boolean
            Dim bIncludeAnnotations As Boolean
            Dim bPrintDataRow As Boolean
            Dim bIncludeImgFileInfo As Boolean
            Dim bTrackingEverContained As Boolean
            Dim pLeftIndent As Integer
            Dim pRightIndent As Integer
            Dim pLeftMargin As Integer
            Dim pRightMargin As Integer
            Dim lblTableName As String = ""
            Dim lblReportName As String = ""
            Dim parentTblName As String = ""
            Dim parentViewName As String = ""
            'Dim childTblName As String = ""
            'Dim childViewName As String = ""
            Dim level3ChildTblName As String = ""
            Dim level3ViewName As String = ""
            Dim parentLevel2TblName As String = ""
            Dim parentLevel2ViewName As String = ""
            Dim bIsWarnning = False
            Dim pViewObject As View
            Dim BaseSecureObjId As Integer = 0
            Dim lSecureObjectId As Integer = 0
            Dim ChildColumnHeaders As Integer = 0
            Dim bUpdateState As Boolean = False
            Dim Ids As Array
            Dim chksState As Array
            Dim lstViewColumns As List(Of ViewColumn) = New List(Of ViewColumn)
            Dim reportExists = False
            Dim level1ID = 0
            'Added on 26th April 2016.
            Dim trackingHistoryIndex As Integer
            Dim printColumnHeadersIndex As Integer
            Dim viewStatus = False

            Try

                lblReportName = formData("ReportName").ToString()

                For pIndex As Integer = 1 To 3

                    lstViewColumns = TempData("TempViewColumns_" & pIndex)
                    TempData.Keep("TempViewColumns_" & pIndex)

                    ViewId = formData("ViewID_Level" & pIndex)
                    lblTableName = ""
                    If Not formData("TableName_Level" & pIndex) Is Nothing Then
                        lblTableName = formData("TableName_Level" & pIndex).ToString()
                    End If

                    If Not ViewId = 0 Then

                        If Not lblTableName = "" Then
                            If pIndex = 1 Then
                                parentTblName = lblTableName
                                parentViewName = lblReportName
                            End If

                            If pIndex = 2 Then
                                parentLevel2TblName = lblTableName
                                parentLevel2ViewName = lblReportName
                            End If

                            If pIndex = 1 Then
                                If (lblReportName <> pOldReportName) Then
                                    reportExists = _iView.All().Any(Function(x) x.ViewName = lblReportName)
                                End If
                            End If

                            'If _iView.All().Any(Function(x) x.TableName = lblTableName And x.Id = ViewId) = True Then
                            If Not reportExists Then
                                Dim ViewEntity = _iView.All().Where(Function(x) x.Id = ViewId).FirstOrDefault()

                                bGrandTotal = IIf(formData("GrandTotal_Level" & pIndex) = "on", True, False)
                                bIncludeImages = IIf(formData("PrintImages_Level" & pIndex) = "on", True, False)
                                bIncludeHeaders = IIf(formData("SuppressHeader_Level" & pIndex) = "on", False, True)
                                bIncludeFooters = IIf(formData("SuppressFooter_Level" & pIndex) = "on", False, True)
                                bPrintImageFullPage = IIf(formData("PrintImageFullPage_Level" & pIndex) = "on", True, False)
                                bPrintImageFirstPageOnly = IIf(formData("PrintImageFirstPageOnly_Level" & pIndex) = "on", True, False)
                                bIncludeAnnotations = IIf(formData("PrintImageRedlining_Level" & pIndex) = "on", True, False)
                                bPrintDataRow = IIf(formData("SuppressImageDataRow_Level" & pIndex) = "on", False, True)
                                bIncludeImgFileInfo = IIf(formData("SuppressImageFooter_Level" & pIndex) = "on", False, True)
                                pLeftIndent = IIf(formData("LeftIndent_Level" & pIndex) = "", 0, formData("LeftIndent_Level" & pIndex))
                                pRightIndent = IIf(formData("RightIndent_Level" & pIndex) = "", 0, formData("RightIndent_Level" & pIndex))
                                pLeftMargin = IIf(formData("PrintImageLeftMargin_Level" & pIndex) = "", 0, formData("PrintImageLeftMargin_Level" & pIndex))
                                pRightMargin = IIf(formData("PrintImageRightMargin_Level" & pIndex) = "", 0, formData("PrintImageRightMargin_Level" & pIndex))
                                bTrackingEverContained = IIf(formData("TrackingEverContained_Level" & pIndex) = "on", True, False)
                                Ids = formData("ViewColList_Level" & pIndex).Split(",")
                                chksState = formData("ViewColChkStates_Level" & pIndex).Split(",")
                                'Added on 26th April 2016.
                                trackingHistoryIndex = formData("Level" & pIndex & "TrackingHis")
                                printColumnHeadersIndex = formData("rdPrintColHeaders_Level" & pIndex)
                                ChildColumnHeaders = formData("rdPrintColHeaders" & pIndex + 1)

                                If pIndex = 1 Then
                                    If pOldReportName <> lblReportName Then
                                        Dim pSecureObject = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals(pOldReportName) And x.SecureObjectTypeID = Enums.SecureObjectType.Reports).FirstOrDefault()
                                        If Not pSecureObject Is Nothing Then
                                            _iSecureObject.BeginTransaction()
                                            'Changes by Ganesh - 12/01/2016
                                            pSecureObject.SecureObjectTypeID = Enums.SecureObjectType.Reports
                                            pSecureObject.Name = lblReportName
                                            _iSecureObject.Update(pSecureObject)
                                            _iSecureObject.CommitTransaction()
                                        End If
                                    End If
                                End If

                                ViewEntity.ViewName = lblReportName
                                ViewEntity.ReportStylesId = pReportStyle
                                ViewEntity.GrandTotal = bGrandTotal
                                ViewEntity.PrintImages = bIncludeImages
                                ViewEntity.SuppressHeader = bIncludeHeaders
                                ViewEntity.SuppressFooter = bIncludeFooters
                                ViewEntity.PrintImageFullPage = bPrintImageFullPage
                                ViewEntity.PrintImageFirstPageOnly = bPrintImageFirstPageOnly
                                ViewEntity.PrintImageRedlining = bIncludeAnnotations
                                ViewEntity.SuppressImageDataRow = bPrintDataRow
                                ViewEntity.SuppressImageFooter = bIncludeImgFileInfo
                                ViewEntity.LeftIndent = pLeftIndent
                                ViewEntity.RightIndent = pRightIndent
                                ViewEntity.PrintImageLeftMargin = pLeftMargin
                                ViewEntity.PrintImageRightMargin = pRightMargin
                                ViewEntity.TrackingEverContained = bTrackingEverContained
                                ViewEntity.ChildColumnHeaders = ChildColumnHeaders
                                'ViewEntity.SubViewId = 0
                                'ViewEntity.SubTableName = ""

                                'Added on 26th April 2016.
                                If trackingHistoryIndex > 0 Then
                                    ViewEntity.SubTableName = "<<Tracking>>"
                                    'ViewEntity.SubViewId = trackingHistoryIndex
                                End If
                                'Added on 29th April 2016.
                                'If trackingHistoryIndex = 0 Then
                                '    ViewEntity.SubTableName = ""
                                '    'ViewEntity.SubViewId = trackingHistoryIndex
                                'End If

                                If pIndex = 2 Or pIndex = 3 Then
                                    ViewEntity.PrintWithoutChildren = IIf(formData("PrintWithoutChildren_Level" & pIndex) = "on", True, False)
                                    'Added on 26th April 2016.
                                    'ViewEntity.ChildColumnHeaders = printColumnHeadersIndex
                                End If
                                _iView.Update(ViewEntity)

                                'If pIndex = 2 Then
                                '    UpdateLevelWiseReportsView(False, "", "", parentTblName, parentViewName, parentLevel2TblName, parentLevel2ViewName)
                                'End If

                                'If pIndex = 3 Then
                                '    UpdateLevelWiseReportsView(False, "", "", parentTblName, parentViewName, lblTableName, lblReportName)
                                'End If
                                'Update View Columns
                                bUpdateState = True
                                SaveViewColumns(Ids, chksState, lstViewColumns, bUpdateState, ViewEntity.Id, formData, pIndex)
                            Else
                                Keys.ErrorType = "w"
                                Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlAlreadyDefinedAsViewOrRpt"), lblReportName, lblTableName)
                                bIsWarnning = True
                            End If
                        End If
                    Else
                        If Not lblTableName = "" Then

                            If pIndex = 1 Then
                                viewStatus = _iView.All().Any(Function(x) x.ViewName = lblReportName)
                            End If

                            If viewStatus = False Then

                                bGrandTotal = IIf(formData("GrandTotal_Level" & pIndex) = "on", True, False)
                                bIncludeImages = IIf(formData("PrintImages_Level" & pIndex) = "on", True, False)
                                bIncludeHeaders = IIf(formData("SuppressHeader_Level" & pIndex) = "on", False, True)
                                bIncludeFooters = IIf(formData("SuppressFooter_Level" & pIndex) = "on", False, True)
                                bPrintImageFullPage = IIf(formData("PrintImageFullPage_Level" & pIndex) = "on", True, False)
                                bPrintImageFirstPageOnly = IIf(formData("PrintImageFirstPageOnly_Level" & pIndex) = "on", True, False)
                                bIncludeAnnotations = IIf(formData("PrintImageRedlining_Level" & pIndex) = "on", True, False)
                                bPrintDataRow = IIf(formData("SuppressImageDataRow_Level" & pIndex) = "on", False, True)
                                bIncludeImgFileInfo = IIf(formData("SuppressImageFooter_Level" & pIndex) = "on", False, True)
                                pLeftIndent = IIf(formData("LeftIndent_Level" & pIndex) = "", 0, formData("LeftIndent_Level" & pIndex))
                                pRightIndent = IIf(formData("RightIndent_Level" & pIndex) = "", 0, formData("RightIndent_Level" & pIndex))
                                pLeftMargin = IIf(formData("PrintImageLeftMargin_Level" & pIndex) = "", 0, formData("PrintImageLeftMargin_Level" & pIndex))
                                pRightMargin = IIf(formData("PrintImageRightMargin_Level" & pIndex) = "", 0, formData("PrintImageRightMargin_Level" & pIndex))
                                bTrackingEverContained = IIf(formData("TrackingEverContained_Level" & pIndex) = "on", True, False)
                                Ids = formData("ViewColList_Level" & pIndex).Split(",")
                                chksState = formData("ViewColChkStates_Level" & pIndex).Split(",")
                                'Added on 26th April 2016.
                                trackingHistoryIndex = formData("Level" & pIndex & "TrackingHis")
                                printColumnHeadersIndex = formData("rdPrintColHeaders_Level" & pIndex)
                                ChildColumnHeaders = formData("rdPrintColHeaders" & pIndex + 1)

                                'Added on 03/03/2016
                                Dim initialViewId As Integer = Convert.ToInt16(formData("InitialViewID_Level" & pIndex))
                                Dim initialViewEntity As View = _iView.All().Where(Function(m) m.Id = initialViewId).FirstOrDefault()

                                pViewObject = New View()
                                pViewObject.TableName = lblTableName
                                pViewObject.ViewName = lblReportName
                                pViewObject.ReportStylesId = pReportStyle
                                pViewObject.GrandTotal = bGrandTotal
                                pViewObject.PrintImages = bIncludeImages
                                pViewObject.SuppressHeader = bIncludeHeaders
                                pViewObject.SuppressFooter = bIncludeFooters
                                pViewObject.PrintImageFullPage = bPrintImageFullPage
                                pViewObject.PrintImageFirstPageOnly = bPrintImageFirstPageOnly
                                pViewObject.PrintImageRedlining = bIncludeAnnotations
                                pViewObject.SuppressImageDataRow = bPrintDataRow
                                pViewObject.SuppressImageFooter = bIncludeImgFileInfo
                                pViewObject.LeftIndent = pLeftIndent
                                pViewObject.RightIndent = pRightIndent
                                pViewObject.PrintImageLeftMargin = pLeftMargin
                                pViewObject.PrintImageRightMargin = pRightMargin
                                pViewObject.TrackingEverContained = bTrackingEverContained
                                pViewObject.Printable = True
                                pViewObject.AltViewId = 0
                                pViewObject.DeleteGridAvail = False
                                pViewObject.FiltersActive = False
                                pViewObject.RowHeight = 0
                                pViewObject.SQLStatement = "SELECT * FROM " & lblTableName
                                pViewObject.TablesId = 0
                                pViewObject.UseExactRowCount = False
                                pViewObject.VariableColWidth = True
                                pViewObject.VariableFixedCols = False
                                pViewObject.VariableRowHeight = True
                                pViewObject.ViewGroup = 0
                                pViewObject.ViewOrder = 1
                                pViewObject.ViewType = 0
                                pViewObject.Visible = True
                                pViewObject.ChildColumnHeaders = ChildColumnHeaders
                                pViewObject.DisplayMode = 1
                                pViewObject.PrintAttachments = 0
                                pViewObject.CustomFormView = 0
                                '25 is the new default as it is only used for Web Access 
                                ' and new default of 5000 for desktop.  RVW 03/06/2019
                                pViewObject.MaxRecsPerFetch = pViewObject.MaxRecsPerFetch
                                pViewObject.MaxRecsPerFetchDesktop = pViewObject.MaxRecsPerFetchDesktop
                                pViewObject.InTaskList = False
                                pViewObject.SearchableView = True
                                pViewObject.SubViewId = 0
                                pViewObject.WorkFlow1 = initialViewEntity.WorkFlow1
                                pViewObject.RowHeight = initialViewEntity.RowHeight
                                pViewObject.ViewGroup = initialViewEntity.ViewGroup
                                pViewObject.MaxRecsPerFetch = initialViewEntity.MaxRecsPerFetch
                                pViewObject.MaxRecsPerFetchDesktop = initialViewEntity.MaxRecsPerFetchDesktop
                                pViewObject.WorkFlow1 = initialViewEntity.WorkFlow1
                                pViewObject.WorkFlowDesc1 = initialViewEntity.WorkFlowDesc1
                                pViewObject.WorkFlowToolTip1 = initialViewEntity.WorkFlowToolTip1
                                pViewObject.TablesId = initialViewEntity.TablesId
                                pViewObject.UseExactRowCount = initialViewEntity.UseExactRowCount

                                'Added on 26th April 2016.
                                If trackingHistoryIndex > 0 Then
                                    pViewObject.SubTableName = "<<Tracking>>"
                                End If

                                If pIndex = 2 Or pIndex = 3 Then
                                    pViewObject.PrintWithoutChildren = IIf(formData("PrintWithoutChildren_Level" & pIndex) = "on", True, False)
                                End If

                                _iView.Add(pViewObject)
                                If pIndex = 1 Then
                                    parentTblName = lblTableName
                                    parentViewName = lblReportName

                                    _iSecureObject.BeginTransaction()
                                    Dim pNewSecureObject As Models.SecureObject = New Models.SecureObject()

                                    Dim pSecureObjectData = _iSecureObject.All().FirstOrDefault(Function(x) x.Name.Trim().ToLower().Equals(lblReportName) And x.SecureObjectTypeID = Enums.SecureObjectType.Reports)
                                    If Not pSecureObjectData Is Nothing Then
                                        Dim pSecureObjectPermission = _iSecureObjectPermission.All.Where(Function(x) x.SecureObjectID = pSecureObjectData.SecureObjectID)
                                        _iSecureObjectPermission.DeleteRange(pSecureObjectPermission)

                                        _iSecureObject.Delete(pSecureObjectData)
                                    End If

                                    Dim pSecureObject = _iSecureObject.All().FirstOrDefault(Function(x) x.Name.Trim().ToLower().Equals(lblTableName) And x.SecureObjectTypeID = Enums.SecureObjectType.Table)
                                    If Not pSecureObject Is Nothing Then
                                        BaseSecureObjId = pSecureObject.SecureObjectID
                                        pNewSecureObject.BaseID = pSecureObject.SecureObjectID
                                        pNewSecureObject.SecureObjectTypeID = Enums.SecureObjectType.Reports
                                        pNewSecureObject.Name = lblReportName
                                        _iSecureObject.Add(pNewSecureObject)
                                        _iSecureObject.CommitTransaction()

                                        AddSecureObjectPermissionsBySecureObjectType(pNewSecureObject.SecureObjectID, BaseSecureObjId, Enums.SecureObjects.Reports)

                                        bUpdateState = False
                                        level1ID = pViewObject.Id
                                        SaveViewColumns(Ids, chksState, lstViewColumns, bUpdateState, pViewObject.Id, formData, pIndex)
                                    End If

                                ElseIf pIndex = 2 Then
                                    parentLevel2TblName = lblTableName
                                    parentLevel2ViewName = lblReportName

                                    UpdateLevelWiseReportsView(lblReportName, pOldReportName, parentTblName, parentViewName, parentLevel2TblName, parentLevel2ViewName)

                                    'Add columns for View
                                    bUpdateState = False
                                    SaveViewColumns(Ids, chksState, lstViewColumns, bUpdateState, pViewObject.Id, formData, pIndex)
                                ElseIf pIndex = 3 Then
                                    level3ChildTblName = lblTableName
                                    level3ViewName = lblReportName

                                    UpdateLevelWiseReportsView(lblReportName, pOldReportName, parentLevel2TblName, parentLevel2ViewName, level3ChildTblName, level3ViewName)

                                    bUpdateState = False
                                    SaveViewColumns(Ids, chksState, lstViewColumns, bUpdateState, pViewObject.Id, formData, pIndex)
                                End If

                            Else
                                Keys.ErrorType = "w"
                                Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlAlreadyDefinedAsViewOrRpt"), lblReportName, lblTableName)
                                bIsWarnning = True
                            End If
                        End If
                    End If
                Next

                'Fill the secure permissions dataset after new report creation.
                CollectionsClass.ReloadPermissionDataSet()

                If bIsWarnning = False Then
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlRptSaveSuccessfully")
                End If
            Catch dbEx As DbEntityValidationException
                For Each validationErrors In dbEx.EntityValidationErrors
                    For Each validationError In validationErrors.ValidationErrors
                        Trace.TraceInformation(String.Format(Languages.Translation("msgAdminCtrlProperty"), validationError.PropertyName, validationError.ErrorMessage))
                    Next
                Next
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .level1ID = level1ID
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Save the columns for Priting in ViewColumns.
        Private Function SaveViewColumns(Ids As Array, chksState As Array, lstViewColumns As List(Of ViewColumn), bUpdateState As Boolean, vId As Integer, formData As FormCollection, iIndex As Integer) As Boolean
            Dim ViewColumnObj As ViewColumn
            Dim icount As Integer = 0

            _iViewColumn.BeginTransaction()

            'Delete all data of current view.
            Dim lSViewColEntities = _iViewColumn.All().Where(Function(x) x.ViewsId = vId)
            _iViewColumn.DeleteRange(lSViewColEntities)

            'If bUpdateState Then
            '    For Each id In Ids
            '        ViewColumnObj = lstViewColumns.Where(Function(item) item.Id = id).FirstOrDefault()
            '        ViewColumnObj.Id = 0
            '        ViewColumnObj.SuppressPrinting = chksState(icount)
            '        ViewColumnObj.ColumnNum = icount
            '        ViewColumnObj.ViewsId = vId
            '        _iViewColumn.Add(ViewColumnObj)
            '        icount = icount + 1
            '    Next
            'Else
            For Each id In Ids
                ViewColumnObj = lstViewColumns.Where(Function(item) item.Id = id).FirstOrDefault()
                ViewColumnObj.Id = 0
                ViewColumnObj.SuppressPrinting = IIf(chksState(icount) = "0", False, True)
                ViewColumnObj.ColumnNum = icount
                ViewColumnObj.ViewsId = vId
                _iViewColumn.Add(ViewColumnObj)
                icount = icount + 1
            Next
            'End If
            _iViewColumn.CommitTransaction()

            Return True
        End Function

        'Add the Permission object for added report
        Public Function AddSecureObjectPermissionsBySecureObjectType(pSecureObjectID As Integer, pBaseSecureObjectID As Integer, pSecureObjectType As Integer) As Boolean
            Dim bSucceed = False
            Try
                Dim sSql = "INSERT INTO SecureObjectPermission (GroupID, SecureObjectID, PermissionID) SELECT GroupID," & pSecureObjectID & " AS SecureObjectId, PermissionID FROM SecureObjectPermission AS SecureObjectPermission WHERE     (SecureObjectID = " & pBaseSecureObjectID & ") AND (PermissionID IN (SELECT     PermissionID FROM          SecureObjectPermission AS SecureObjectPermission_1 WHERE (SecureObjectID = " & pSecureObjectType & ") AND (GroupID = 0)))"

                _IDBManager.ConnectionString = Keys.GetDBConnectionString
                bSucceed = _IDBManager.ExecuteNonQuery(System.Data.CommandType.Text, sSql)
                _IDBManager.Dispose()
            Catch ex As Exception
                Return False
            End Try
            Return bSucceed
        End Function

        'Remove the currently active tab after REMOVE THIS LEVEL button.
        Public Function RemoveActiveLevel(pViewIDs As Array) As ActionResult
            Try
                _iView.BeginTransaction()
                For Each item As String In pViewIDs
                    Dim parentView = _iView.All().Where(Function(x) x.SubViewId = item).FirstOrDefault()
                    If Not parentView Is Nothing Then
                        parentView.SubTableName = ""
                        parentView.SubViewId = 0
                        _iView.Update(parentView)
                    End If

                    Dim viewEntity = _iView.All().Where(Function(x) x.Id = item).FirstOrDefault()

                    If Not viewEntity Is Nothing Then
                        _iView.Delete(viewEntity)
                    End If

                Next
                _iView.CommitTransaction()

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlLvlRmvSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
                _iView.RollBackTransaction()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function LoadTrackingTables() As List(Of Table)
            Dim iContainerNum As Integer
            Dim iLowContainer As Integer
            Dim lstTables As List(Of Table) = New List(Of Table)
            Dim oSaveTable As Table = Nothing
            iLowContainer = 0
            Dim tableEntity = _iTable.All()

            Do
                iContainerNum = 9999
                oSaveTable = Nothing

                For Each oTable As Table In tableEntity
                    If ((oTable.TrackingTable > iLowContainer) And (oTable.TrackingTable < iContainerNum)) Then
                        iContainerNum = oTable.TrackingTable
                        oSaveTable = oTable
                    End If
                Next oTable

                If (oSaveTable Is Nothing) Then Exit Do
                lstTables.Add(oSaveTable)
                iLowContainer = oSaveTable.TrackingTable
            Loop

            Return lstTables

        End Function

        Public Function NotSubReport(oView As View, pTableName As String) As Boolean
            Dim tableEntity = _iTable.All()
            Dim oTable As Table
            Dim oTempView As View
            Dim lViewEntities = _iView.All()
            Dim lLoopViewEntities = Nothing

            NotSubReport = True

            For Each oTable In tableEntity
                lLoopViewEntities = lViewEntities.Where(Function(x) x.TableName.Trim().ToLower() = oTable.TableName)

                If Not IsNothing(lLoopViewEntities) Then
                    For Each oTempView In lLoopViewEntities
                        If (oTempView.SubViewId = oView.Id) Then
                            NotSubReport = False
                            Exit For
                        End If
                    Next oTempView
                End If
            Next oTable

            oTempView = Nothing
        End Function

        Public Function UpdateLevelWiseReportsView(reportName As String, oldReportName As String, parentTblName As String, parentViewName As String, childTblName As String, childViewName As String)
            Try
                'If bAdd Then
                '    Dim parentViewEntity = _iView.All().Where(Function(x) x.TableName = parentTblName And x.ViewName = parentViewName).FirstOrDefault()
                '    Dim childViewEntity = _iView.All().Where(Function(x) x.TableName = childTblName And x.ViewName = childViewName).FirstOrDefault()
                '    If Not childViewEntity Is Nothing Then
                '        parentViewEntity.SubTableName = childTblName
                '        parentViewEntity.SubViewId = childViewEntity.Id
                '    Else
                '        parentViewEntity.SubTableName = ""
                '        parentViewEntity.SubViewId = 0
                '    End If
                '    _iView.Update(parentViewEntity)
                'End If

                Dim parentViewEntity = _iView.All().Where(Function(x) x.TableName = parentTblName And x.ViewName = parentViewName).FirstOrDefault()
                Dim childViewEntity = _iView.All().Where(Function(x) x.TableName = childTblName And x.ViewName = childViewName).FirstOrDefault()
                If Not childViewEntity Is Nothing Then
                    parentViewEntity.SubTableName = childTblName
                    parentViewEntity.SubViewId = childViewEntity.Id
                Else
                    parentViewEntity.SubTableName = ""
                    parentViewEntity.SubViewId = 0
                End If
                _iView.Update(parentViewEntity)

                Dim pSecureObject = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals(oldReportName) And x.SecureObjectTypeID = Enums.SecureObjectType.Reports).FirstOrDefault()

                If oldReportName <> reportName Then
                    If Not pSecureObject Is Nothing Then
                        _iSecureObject.BeginTransaction()
                        Dim pSecureObjectID = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals(childTblName) And x.SecureObjectTypeID = Enums.SecureObjectType.Table).FirstOrDefault().SecureObjectID
                        pSecureObject.BaseID = pSecureObjectID
                        pSecureObject.SecureObjectTypeID = 7
                        pSecureObject.Name = reportName
                        _iSecureObject.Update(pSecureObject)
                        _iSecureObject.CommitTransaction()
                    End If
                End If
            Catch ex As Exception

            End Try
            Return True
        End Function
#End Region

#Region "Report Definitions"

        Public Function LoadViewColumn() As PartialViewResult
            Return PartialView("_AddColumnViewPartial")
        End Function

        Public Function GetDataFromViewColumn(lViewsCustomModelEntites As ViewsCustomModel, viewColumnId As Integer, LevelNum As Integer, currentHeading As String, Optional ByVal viewId As Integer = 0, Optional tableName As String = "") As ActionResult
            Try
                Dim viewColumnEntity As New ViewColumn
                Dim DisplayStyleData As Boolean
                Dim DuplicateType As Boolean
                Dim CurrentViewColumn As New List(Of ViewColumn)
                Dim editSetting As New Dictionary(Of String, Boolean)
                If (lViewsCustomModelEntites.ViewsModel IsNot Nothing) Then
                    viewId = lViewsCustomModelEntites.ViewsModel.Id
                End If

                If (Not TempData Is Nothing) Then
                    If (viewId <> 0) Then
                        CurrentViewColumn = TempData.Peek("TempViewColumns_" & viewId)
                        viewColumnEntity = CurrentViewColumn.Where(Function(item) item.Id = viewColumnId And item.Heading.Trim.ToLower.Equals(currentHeading.Trim.ToLower)).FirstOrDefault()
                    Else
                        CurrentViewColumn = TempData.Peek("TempViewColumns_" & LevelNum)
                        viewColumnEntity = CurrentViewColumn.Where(Function(item) item.Id = viewColumnId And item.Heading.Trim.ToLower.Equals(currentHeading.Trim.ToLower)).FirstOrDefault()
                    End If
                    ValidateEditSettingsOnEdit(editSetting, viewColumnEntity, CurrentViewColumn, tableName, lViewsCustomModelEntites.ViewsModel)
                End If


                If (viewColumnEntity.LookupType = Enums.geViewColumnsLookupType.ltChildLookdownCommaDisplayDups) Then
                    DisplayStyleData = False
                    DuplicateType = False
                ElseIf (viewColumnEntity.LookupType = Enums.geViewColumnsLookupType.ltChildLookdownLFDisplayDups) Then
                    DisplayStyleData = True
                    DuplicateType = False
                ElseIf (viewColumnEntity.LookupType = Enums.geViewColumnsLookupType.ltChildLookdownCommaHideDups) Then
                    DisplayStyleData = False
                    DuplicateType = True
                ElseIf (viewColumnEntity.LookupType = Enums.geViewColumnsLookupType.ltChildLookdownLFHideDups) Then
                    DisplayStyleData = True
                    DuplicateType = True
                End If
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim viewColumnJSON = JsonConvert.SerializeObject(viewColumnEntity, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim DisplayStyleDataJSON = JsonConvert.SerializeObject(DisplayStyleData, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim DuplicateTypeJSON = JsonConvert.SerializeObject(DuplicateType, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim editSettingsJSON = JsonConvert.SerializeObject(editSetting, Newtonsoft.Json.Formatting.Indented, Setting)
                Keys.ErrorType = "s"
                Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                                  Key .DisplayStyleDataJSON = DisplayStyleDataJSON,
                                  Key .DuplicateTypeJSON = DuplicateTypeJSON,
                                   Key .editSettingsJSON = editSettingsJSON,
                                 Key .viewColumnJSON = viewColumnJSON
                            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Return Json(New With {
                  Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try

        End Function

        Public Function FillViewColumnControl(TableName As String, viewFlag As Boolean, Optional ByVal viewId As Integer = 0) As ActionResult
            Try
                Dim tableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(TableName.Trim.ToLower())).FirstOrDefault
                Dim tableVar = tableEntity.TableName
                Dim myBasePage As New BaseWebPage
                Dim columnType As New List(Of KeyValuePair(Of Integer, String))
                Dim visualAttribute As New List(Of KeyValuePair(Of Integer, String))
                Dim allignment As New List(Of KeyValuePair(Of Integer, String))
                columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltDirect, Languages.Translation("ddlAdminCtrlDirect")))
                columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltRowNumber, Languages.Translation("ddlAdminCtrlRowNumber")))
                Dim RelationParentEntity = _iRelationShip.All.Where(Function(m) m.LowerTableName.Trim.ToLower.Equals(tableVar.Trim.ToLower))
                Dim RelationChildEntity = _iRelationShip.All.Where(Function(m) m.UpperTableName.Trim.ToLower.Equals(tableVar.Trim.ToLower))
                If (Not (RelationParentEntity Is Nothing)) Then
                    For Each relationObj As RelationShip In RelationParentEntity
                        Dim UpperTableVar = relationObj.UpperTableName
                        Dim sADOConn As ADODB.Connection = DataServices.DBOpen()
                        'Get ADO connection name
                        If (Not (tableEntity Is Nothing)) Then
                            sADOConn = DataServices.DBOpen(tableEntity, _iDatabas.All())
                        End If
                        Dim tableSchemaInfo = SchemaInfoDetails.GetTableSchemaInfo(tableVar, sADOConn)
                        If (tableSchemaInfo.Count > 1) Then
                            columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltLookup, Languages.Translation("ddlAdminCtrlParentLookup")))
                            Exit For
                        End If
                    Next
                End If

                If (Not (tableEntity Is Nothing)) Then
                    If (tableEntity.Attachments) Then
                        columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltImageFlag, Languages.Translation("ddlAdminCtrlImageFlag")))
                        columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltFaxFlag, Languages.Translation("ddlAdminCtrlFaxFlag")))
                        columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltPCFilesFlag, Languages.Translation("ddlAdminCtrlPCFilesFlag")))
                        columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltAnyFlag, Languages.Translation("ddlAdminCtrlAnyAttachmentFlag")))
                    End If
                    Dim boolval = myBasePage.Passport.CheckPermission(tableVar.Trim, Enums.SecureObjects.Table, Enums.PassportPermissions.Transfer)
                    If (boolval) Then
                        columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltTrackingStatus, Languages.Translation("ddlAdminCtrlTrackingStatus")))
                        columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltTrackingLocation, Languages.Translation("ddlAdminCtrlTrackingLocation")))
                    End If
                End If

                If (Not (RelationChildEntity Is Nothing)) Then
                    If (RelationChildEntity.Count > 0) Then
                        columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltChildrenFlag, Languages.Translation("ddlAdminCtrlChildFlag")))
                        columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltChildrenCounts, Languages.Translation("ddlAdminCtrlChildCount")))
                        columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltChildLookdownCommaDisplayDups, Languages.Translation("ddlAdminCtrlChildLookdown")))
                        columnType.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnsLookupType.ltChildLookdownTotals, Languages.Translation("ddlAdminCtrlChildTotals")))
                    End If
                End If
                Dim lookupEntity = _iLookupType.All.Where(Function(m) m.LookupTypeForCode.Trim.ToUpper.Equals(("CLMALN").Trim.ToUpper)).OrderBy(Function(m) m.SortOrder)
                visualAttribute.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnDisplayType.cvAlways, Languages.Translation("ddlAdminCtrlAlwaysVisible")))
                visualAttribute.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnDisplayType.cvBaseTab, Languages.Translation("ddlAdminCtrlVisibleOnLevel1Only")))
                visualAttribute.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnDisplayType.cvPopupTab, Languages.Translation("ddlAdminCtrlVisibleOnLevel2AndBelow")))
                visualAttribute.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnDisplayType.cvNotVisible, Languages.Translation("ddlAdminCtrlNotVisible")))
                visualAttribute.Add(New KeyValuePair(Of Integer, String)(Enums.geViewColumnDisplayType.cvSmartColumns, Languages.Translation("ddlAdminCtrlSmartColumn")))
                If (Not (lookupEntity Is Nothing)) Then
                    For Each lookupObj As LookupType In lookupEntity
                        allignment.Add(New KeyValuePair(Of Integer, String)(lookupObj.LookupTypeCode, lookupObj.LookupTypeValue))
                    Next
                End If
                'If (viewFlag = True) Then
                '    Dim lstTEMPViewColumns As List(Of ViewColumn) = New List(Of ViewColumn)
                '    If (viewId <> 0) Then
                '        Dim viewColumnEntity = _iViewColumn.All().Where(Function(x) x.ViewsId = viewId).OrderByField("ColumnNum", True)
                '        If (Not TempData.ContainsKey("TempViewColumns_" & viewId)) Then
                '            If (Not (viewColumnEntity Is Nothing)) Then
                '                For Each viewColObj As ViewColumn In viewColumnEntity
                '                    lstTEMPViewColumns.Add(viewColObj)
                '                Next
                '                If lstTEMPViewColumns.Count > 0 Then
                '                    TempData("TempViewColumns_" & viewId) = lstTEMPViewColumns
                '                End If
                '            End If
                '        End If
                '    Else
                '        If (Not TempData.ContainsKey("TempViewColumns_" & viewId)) Then
                '            TempData("TempViewColumns_" & viewId) = lstTEMPViewColumns
                '        End If

                '    End If
                'End If

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim columnTypeJSON = JsonConvert.SerializeObject(columnType, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim visualAttributeJSON = JsonConvert.SerializeObject(visualAttribute, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim allignmentJSON = JsonConvert.SerializeObject(allignment, Newtonsoft.Json.Formatting.Indented, Setting)
                Keys.ErrorType = "s"
                Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .columnTypeJSON = columnTypeJSON,
                                Key .allignmentJSON = allignmentJSON,
                            Key .visualAttributeJSON = visualAttributeJSON
                            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Return Json(New With {
                  Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

            End Try
        End Function

        Public Function FillInternalFieldName(ColumnTypeVar As Enums.geViewColumnsLookupType, TableName As String, viewFlag As Boolean, IsLocationChecked As Boolean, msSQL As String) As ActionResult
            Try
                Dim FieldNameList As New List(Of KeyValuePair(Of String, String))
                Dim tableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(TableName.Trim.ToLower)).FirstOrDefault
                Dim TableVar = tableEntity.TableName
                Dim DBConName As String = ""
                If (Not (tableEntity Is Nothing)) Then
                    DBConName = tableEntity.DBName
                End If
                Dim sADOConn = DataServices.DBOpen()
                If (Not (tableEntity Is Nothing)) Then
                    sADOConn = DataServices.DBOpen(tableEntity, _iDatabas.All())
                End If
                Dim sSql As String = ""
                Dim sErrorMessage = ""
                Dim lError = 0
                Dim rsADO
                If (viewFlag) Then
                    msSQL = msSQL
                Else
                    Dim oFirsView = _iView.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(TableName.Trim.ToLower) And m.Printable = 0).OrderBy(Function(m) m.ViewOrder).FirstOrDefault
                    If (oFirsView IsNot Nothing) Then
                        msSQL = oFirsView.SQLStatement
                    End If
                End If
                Dim bIsAView = False
                Dim schemaTableVar As List(Of SchemaTable) = SchemaTable.GetSchemaTable(sADOConn, Enums.geTableType.AllTableTypes, TableVar)
                If (Not (schemaTableVar Is Nothing)) Then
                    If (schemaTableVar(0).TableType.Trim.ToLower.Equals("Views")) Then
                        bIsAView = True
                    End If
                End If

                Select Case ColumnTypeVar
                    Case Enums.geViewColumnsLookupType.ltDirect
                        sSql = DataServices.InjectWhereIntoSQL(msSQL, "0=1")
                        sADOConn = DataServices.DBOpen(tableEntity, _iDatabas.All())
                        rsADO = DataServices.GetADORecordset(sSql, tableEntity, _iDatabas.All(), , , , 1, , True, lError, sErrorMessage)
                        Dim sBaseTableName = ""
                        Dim sTableName = ""
                        If (rsADO IsNot Nothing) Then
                            For iCol = 0 To rsADO.Fields.Count - 1
                                If (Not SchemaInfoDetails.IsSystemField(rsADO.Fields(iCol).Name)) Then
                                    If (InStr(rsADO.Fields(iCol).Name, ".") = 0) Then
                                        sBaseTableName = ""

                                        If (Not (IsDBNull(rsADO.Fields(iCol).Properties("BASETABLENAME").Value))) Then
                                            sBaseTableName = Replace$(Replace$(rsADO.Fields(iCol).Properties("BASETABLENAME").value, "[", ""), "]", "")
                                            sTableName = sBaseTableName
                                            If (InStr(sTableName, " ") > 0) Then sTableName = "[" & sTableName & "]"
                                        End If

                                        If ((Len(sBaseTableName) > 0&) And (StrComp(sBaseTableName, Replace$(Replace$(tableEntity.TableName, "[", ""), "]", ""), vbTextCompare) <> 0)) Then
                                            If (Not bIsAView) Then
                                                FieldNameList.Add(New KeyValuePair(Of String, String)(Trim(sTableName + "." + Trim$(rsADO.Fields(iCol).Name)), Trim(sTableName + "." + Trim$(rsADO.Fields(iCol).Name))))
                                            Else
                                                Dim SchemaInfo = SchemaInfoDetails.GetSchemaInfo(tableEntity.TableName, sADOConn, Trim$(rsADO.Fields(iCol).Name.ToString))
                                                If (SchemaInfo.Count > 0) Then
                                                    FieldNameList.Add(New KeyValuePair(Of String, String)(Trim(tableEntity.TableName) + "." + Trim$(rsADO.Fields(iCol).Name), Trim$(rsADO.Fields(iCol).Name)))
                                                Else
                                                    FieldNameList.Add(New KeyValuePair(Of String, String)(Trim(sTableName) & "." & Trim$(rsADO.Fields(iCol).Name), Trim(sTableName) & "." & Trim$(rsADO.Fields(iCol).Name)))
                                                End If
                                            End If
                                        Else
                                            FieldNameList.Add(New KeyValuePair(Of String, String)(Trim(tableEntity.TableName) + "." + Trim(rsADO.Fields(iCol).Name), Trim$(rsADO.Fields(iCol).Name)))
                                        End If
                                    Else
                                        FieldNameList.Add(New KeyValuePair(Of String, String)(Trim(tableEntity.TableName) + "." + Trim(rsADO.Fields(iCol).Name), Trim$(rsADO.Fields(iCol).Name)))
                                    End If
                                End If
                            Next iCol
                            Dim ShouldIncludeLocation As Boolean
                            If (viewFlag) Then
                                ShouldIncludeLocation = IsLocationChecked
                            Else
                                Dim ViewEntity As View
                                ViewEntity = _iView.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(TableVar.Trim.ToLower)).OrderBy(Function(m) m.ViewOrder).FirstOrDefault
                                ShouldIncludeLocation = IIf(ViewEntity.IncludeTrackingLocation Is Nothing, False, ViewEntity.IncludeTrackingLocation)
                            End If
                            If (ShouldIncludeLocation) Then
                                FieldNameList.Add(New KeyValuePair(Of String, String)(ReportsModel.TRACKED_LOCATION_NAME, ReportsModel.TRACKED_LOCATION_NAME))
                            End If

                        End If

                        ' Old Web Content
                        'Dim schemaTableVar As List(Of SchemaTable) = SchemaTable.GetSchemaTable(sADOConn, Enums.geTableType.AllTableTypes, TableVar)
                        'If (Not (schemaTableVar Is Nothing)) Then
                        '    Dim tableType = schemaTableVar(0).TableType
                        '    Dim schemaColumn As List(Of SchemaColumns)
                        '    If (Not tableType.Trim.ToLower.Equals("Views")) Then
                        '        schemaColumn = SchemaInfoDetails.GetTableSchemaInfo(TableVar, sADOConn)
                        '        If (Not (schemaColumn Is Nothing)) Then
                        '            For Each schemaColObj As SchemaColumns In schemaColumn
                        '                If (Not SchemaInfoDetails.IsSystemField(schemaColObj.ColumnName)) Then
                        '                    FieldNameList.Add(New KeyValuePair(Of String, String)(Trim(schemaColObj.TableName + "." + schemaColObj.ColumnName), schemaColObj.ColumnName))
                        '                End If
                        '            Next
                        '        End If
                        '        Dim ShouldIncludeLocation As Boolean
                        '        If (viewFlag) Then
                        '            ShouldIncludeLocation = IsLocationChecked
                        '        Else
                        '            Dim ViewEntity As View
                        '            ViewEntity = _iView.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(TableVar.Trim.ToLower)).OrderBy(Function(m) m.ViewOrder).FirstOrDefault
                        '            ShouldIncludeLocation = ViewEntity.IncludeTrackingLocation
                        '        End If

                        '        If (ShouldIncludeLocation) Then
                        '            FieldNameList.Add(New KeyValuePair(Of String, String)(ReportsModel.TRACKED_LOCATION_NAME, ReportsModel.TRACKED_LOCATION_NAME))
                        '        End If
                        '    End If
                        'End If
                    Case Enums.geViewColumnsLookupType.ltLookup
                        Dim relationShipEntity = _iRelationShip.All.Where(Function(m) m.LowerTableName.Trim.ToLower.Equals(TableVar.Trim.ToLower)).OrderBy(Function(m) m.TabOrder)
                        LoadFieldTable(FieldNameList, sADOConn, tableEntity, relationShipEntity, True, 1, False)
                    Case Enums.geViewColumnsLookupType.ltImageFlag, Enums.geViewColumnsLookupType.ltFaxFlag, Enums.geViewColumnsLookupType.ltPCFilesFlag, Enums.geViewColumnsLookupType.ltRowNumber, Enums.geViewColumnsLookupType.ltAnyFlag
                        If (Not (tableEntity.IdFieldName Is Nothing)) Then
                            Dim IdName = Trim(tableEntity.TableName + "." + DatabaseMap.RemoveTableNameFromField(tableEntity.IdFieldName))
                            FieldNameList.Add(New KeyValuePair(Of String, String)(IdName, tableEntity.IdFieldName))
                        End If
                    Case Enums.geViewColumnsLookupType.ltChildrenCounts, Enums.geViewColumnsLookupType.ltChildrenFlag
                        If (Not (tableEntity.IdFieldName Is Nothing)) Then
                            Dim IdName = Trim(tableEntity.TableName + "." + DatabaseMap.RemoveTableNameFromField(tableEntity.IdFieldName))
                            FieldNameList.Add(New KeyValuePair(Of String, String)(IdName, IdName))
                        End If
                        Dim ChildTable = _iRelationShip.All.Where(Function(m) m.UpperTableName.Trim.ToLower.Equals(tableEntity.TableName.Trim.ToLower))
                        For Each relationObj As RelationShip In ChildTable
                            Dim lowerTableField = Trim(relationObj.LowerTableName + "." + DatabaseMap.RemoveTableNameFromField(relationObj.LowerTableFieldName))
                            FieldNameList.Add(New KeyValuePair(Of String, String)(lowerTableField, lowerTableField))
                        Next
                    Case Enums.geViewColumnsLookupType.ltTrackingStatus
                        Dim systemEntity = _iSystem.All.OrderBy(Function(m) m.Id).FirstOrDefault
                        FieldNameList.Add(New KeyValuePair(Of String, String)("TrackingStatus.TransactionDateTime", "TrackingStatus.TransactionDateTime"))
                        If (systemEntity.TrackingOutOn) Then
                            FieldNameList.Add(New KeyValuePair(Of String, String)("TrackingStatus.Out", "TrackingStatus.Out"))
                            If (systemEntity.DateDueOn) Then
                                FieldNameList.Add(New KeyValuePair(Of String, String)("TrackingStatus.DateDue", "TrackingStatus.DateDue"))
                            End If
                        End If
                        FieldNameList.Add(New KeyValuePair(Of String, String)("TrackingStatus.UserName", "TrackingStatus.UserName"))
                    Case Enums.geViewColumnsLookupType.ltTrackingLocation
                        Dim TrackingTableEntity = _iTable.All.Where(Function(m) m.TrackingTable > 0)
                        For Each trackObj As Table In TrackingTableEntity
                            If (trackObj.TrackingTable > tableEntity.TrackingTable) Then
                                Dim fieldId = Trim("TrackingStatus." + trackObj.TrackingStatusFieldName)
                                FieldNameList.Add(New KeyValuePair(Of String, String)(fieldId, trackObj.TrackingStatusFieldName))
                            Else
                                Dim fieldId = Trim("TrackingStatus." + trackObj.TrackingStatusFieldName)
                                FieldNameList.Add(New KeyValuePair(Of String, String)(fieldId, trackObj.TrackingStatusFieldName))
                            End If
                        Next
                    Case Enums.geViewColumnsLookupType.ltChildLookdownCommaDisplayDups, Enums.geViewColumnsLookupType.ltChildLookdownLFDisplayDups, Enums.geViewColumnsLookupType.ltChildLookdownCommaHideDups, Enums.geViewColumnsLookupType.ltChildLookdownLFHideDups
                        Dim relationShipEntity = _iRelationShip.All.Where(Function(m) m.UpperTableName.Trim.ToLower.Equals(TableVar.Trim.ToLower))
                        LoadFieldTable(FieldNameList, sADOConn, tableEntity, relationShipEntity, False, 1, False)
                    Case Enums.geViewColumnsLookupType.ltChildLookdownTotals
                        Dim relationShipEntity = _iRelationShip.All.Where(Function(m) m.UpperTableName.Trim.ToLower.Equals(TableVar.Trim.ToLower))
                        LoadFieldTable(FieldNameList, sADOConn, tableEntity, relationShipEntity, False, 1, True)
                End Select

                Keys.ErrorType = "s"
                ' Dim FieldName As New List(Of KeyValuePair(Of String, String))
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim FieldNameJSON = JsonConvert.SerializeObject(FieldNameList, Newtonsoft.Json.Formatting.Indented, Setting)
                Return Json(New With {
                           Key .errortype = Keys.ErrorType,
                           Key .FieldNameJSON = FieldNameJSON
                           }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Return Json(New With {
           Key .errortype = Keys.ErrorType
           }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try
        End Function

        Public Sub LoadFieldTable(ByRef FieldNameList As List(Of KeyValuePair(Of String, String)), sADOConn As ADODB.Connection, orgTable As Table, relationShipEntity As IQueryable(Of RelationShip), bDoUpper As Boolean, iLevel As Integer, bNumericOnly As Boolean)
            Try
                Dim tableObjList = _iTable.All()
                Dim relationObjList = _iRelationShip.All()
                ReportsModel.FillViewColField(tableObjList, relationObjList, FieldNameList, sADOConn, orgTable, relationShipEntity, bDoUpper, iLevel, bNumericOnly)
            Catch ex As Exception

            End Try

        End Sub

        Public Function FillFieldTypeAndSize(TableVar As String, FieldName As String) As ActionResult
            Try
                Dim sFieldType As String = ""
                Dim sFieldSize As String = ""
                Dim sTableName As String = ""
                Dim sEditMaskLength As Long
                Dim sInputMaskLength As Long
                Dim sADOConn As ADODB.Connection = DataServices.DBOpen()
                'Dim flagSubTotal As Boolean

                Dim lDatabas = _iDatabas.All.OrderBy(Function(m) m.Id)
                Dim oTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(TableVar.Trim.ToLower)).FirstOrDefault
                If (InStr(FieldName, ".") > 1) Then
                    sTableName = (Left$(FieldName, (InStr(FieldName, ".") - 1)))
                Else
                    sTableName = oTable.TableName
                End If
                If (Not (oTable Is Nothing)) Then
                    ViewModel.GetFieldTypeAndSize(oTable, lDatabas, FieldName, sFieldType, sFieldSize)
                    sADOConn = DataServices.DBOpen(oTable, _iDatabas.All())
                Else
                    ViewModel.BindTypeAndSize(sADOConn, FieldName, sTableName, sFieldType, sFieldSize, Nothing)
                End If
                Dim fieldType = sFieldType
                'If (fieldType = Common.FT_DOUBLE Or fieldType = Common.FT_SHORT_INTEGER Or fieldType = Common.FT_LONG_INTEGER) Then
                '    flagSubTotal = True
                'Else
                '    flagSubTotal = False
                'End If
                SetMaskLength(sTableName, sADOConn, FieldName, sEditMaskLength, sInputMaskLength)
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim sFieldTypeJSON = JsonConvert.SerializeObject(sFieldType, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim sFieldSizeJSON = JsonConvert.SerializeObject(sFieldSize, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim sEditMaskLengthJSON = JsonConvert.SerializeObject(sEditMaskLength, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim sInputMaskLengthJSON = JsonConvert.SerializeObject(sInputMaskLength, Newtonsoft.Json.Formatting.Indented, Setting)
                ' Dim flagSubTotalJSON = JsonConvert.SerializeObject(flagSubTotal, Newtonsoft.Json.Formatting.Indented, Setting)
                Keys.ErrorType = "s"
                Return Json(New With {
                           Key .errortype = Keys.ErrorType,
                           Key .sFieldTypeJSON = sFieldTypeJSON,
                           Key .sFieldSizeJSON = sFieldSizeJSON,
                            Key .sEditMaskLengthJSON = sEditMaskLengthJSON,
                             Key .sInputMaskLengthJSON = sInputMaskLengthJSON
                           }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Return Json(New With {
           Key .errortype = Keys.ErrorType
           }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try
        End Function

        Public Sub SetMaskLength(tableName As String, sADOConn As ADODB.Connection, FieldName As String, ByRef sEditMaskLength As Long, ByRef sInputMaskLength As Long)
            Try
                Dim sTableName = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower)).FirstOrDefault.TableName
                Dim sDefaultADOConn = DataServices.DBOpen()
                Dim sDataEditLength As Long
                Dim sDataInputLength As Long
                Dim EditSchemaCol As List(Of SchemaColumns)
                EditSchemaCol = SchemaInfoDetails.GetSchemaInfo("ViewColumns", sDefaultADOConn, "EditMask")
                If (EditSchemaCol.Count > 0) Then
                    sDataEditLength = EditSchemaCol.Item(0).CharacterMaxLength
                End If

                Dim InputSchemaCol As List(Of SchemaColumns)
                InputSchemaCol = SchemaInfoDetails.GetSchemaInfo("ViewColumns", sDefaultADOConn, "InputMask")
                If (InputSchemaCol.Count > 0) Then
                    sDataInputLength = InputSchemaCol.Item(0).CharacterMaxLength
                End If

                Dim FieldSchemaCol As List(Of SchemaColumns)
                Dim sFieldName As String = ""

                If (InStr(FieldName, ".") > 1) Then
                    Dim posCar = InStr(FieldName, ".")
                    sFieldName = FieldName.Substring(posCar)
                End If
                sEditMaskLength = sDataEditLength
                sInputMaskLength = sDataInputLength
                FieldSchemaCol = SchemaInfoDetails.GetSchemaInfo(sTableName, sADOConn, sFieldName)
                If (FieldSchemaCol.Count > 0) Then
                    If (FieldSchemaCol.Item(0).IsString) Then
                        sEditMaskLength = FieldSchemaCol.Item(0).CharacterMaxLength
                        sInputMaskLength = FieldSchemaCol.Item(0).CharacterMaxLength
                    End If
                End If

                If (sDataEditLength < sEditMaskLength) Then
                    sEditMaskLength = sDataEditLength
                End If
                If (sDataInputLength < sInputMaskLength) Then
                    sInputMaskLength = sDataInputLength
                End If
            Catch ex As Exception
            End Try

        End Sub

        Public Function SetColumnInTempViewCol(formEntity As ViewColumn,
                                               DisplayStyleData As Integer,
                                               DuplicateType As Integer,
                                               TableName As String,
                                               reportNameOrId As String,
                                               LevelNum As Integer,
                                               SQLString As String,
                                               Optional FieldNameTB As String = Nothing,
                                               Optional LookupNumber As Enums.geViewColumnsLookupType = Nothing,
                                               Optional IsReportColumn As Boolean = False,
                                               Optional DropDownFlagBool As Boolean = False,
                                                Optional pPageBreakField As Boolean = False,
                                                Optional pSuppressDuplicates As Boolean = False,
                                                Optional pCountColumn As Boolean = False,
                                                Optional pSubtotalColumn As Boolean = False,
                                                Optional pRestartPageNumber As Boolean = False,
                                                Optional pUseAsPrintId As Boolean = False,
                                                Optional pSortableField As Boolean = False,
                                                Optional pFilterField As Boolean = False,
                                                Optional pEditAllowed As Boolean = False,
                                                Optional pColumnVisible As Boolean = False,
                                                Optional pDropDownSuggestionOnly As Boolean = False,
                                                Optional pMaskInclude As Boolean = False
                                               ) As ActionResult
            Dim lstViewColumnJSON As String = ""
            Try
                Dim sortFieldValue As Boolean
                Dim filterFieldValue As Boolean
                If (IsReportColumn) Then
                    sortFieldValue = True
                    filterFieldValue = True
                Else
                    sortFieldValue = pSortableField
                    filterFieldValue = pFilterField
                End If
                formEntity.DropDownFlag = DropDownFlagBool
                formEntity.EditAllowed = pEditAllowed
                formEntity.PageBreakField = pPageBreakField
                formEntity.SuppressDuplicates = pSuppressDuplicates
                formEntity.CountColumn = pCountColumn
                formEntity.SubtotalColumn = pSubtotalColumn
                formEntity.RestartPageNumber = pRestartPageNumber
                formEntity.UseAsPrintId = pUseAsPrintId
                formEntity.SortableField = pSortableField
                formEntity.FilterField = pFilterField
                formEntity.EditAllowed = pEditAllowed
                formEntity.ColumnVisible = pColumnVisible
                formEntity.DropDownSuggestionOnly = pDropDownSuggestionOnly
                formEntity.MaskInclude = pMaskInclude
                If Not (String.IsNullOrEmpty(FieldNameTB)) Then
                    formEntity.FieldName = FieldNameTB
                End If

                Dim msSql As String = ""
                Dim sTempFieldName = String.Empty
                Dim iLookupColumn = 0
                'If (Not String.IsNullOrEmpty(TableName)) Then
                '    msSql = "SELECT * From [" + TableName + "]"
                'End If
                If (Not String.IsNullOrEmpty(SQLString)) Then
                    msSql = SQLString
                End If

                Dim tableEntity = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(TableName.Trim.ToLower)).FirstOrDefault
                ValidateAlternateField(formEntity, sortFieldValue, filterFieldValue, msSql, tableEntity, sTempFieldName)
                If (sTempFieldName <> "") Then
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = sTempFieldName
                    Exit Try
                End If
                If (Not TempData.ContainsKey("TempViewColumns_" & LevelNum)) Then
                    Dim lViewColumnsList As New List(Of ViewColumn)
                    TempData("TempViewColumns_" & LevelNum) = lViewColumnsList
                End If
                If (Not TempData Is Nothing) Then
                    Dim CurrentViewColumn As New List(Of ViewColumn)
                    Dim viewColumnId As New Int64
                    CurrentViewColumn = TempData("TempViewColumns_" & LevelNum)
                    If (Not String.IsNullOrEmpty(reportNameOrId)) Then
                        If (reportNameOrId.Contains("_")) Then
                            Dim viewColArray As String() = reportNameOrId.Split("_")
                            viewColumnId = Convert.ToInt64(viewColArray(1))
                        End If
                    End If
                    'Added New on date - 23rd June 2015.
                    If (Not CurrentViewColumn Is Nothing) Then
                        If (IsReportColumn) Then
                            formEntity.SortableField = True
                            formEntity.FilterField = True
                        End If
                        If viewColumnId <> 0 Then
                            For Each viewColObj As ViewColumn In CurrentViewColumn
                                If (viewColObj.Id = viewColumnId) Then
                                    formEntity.Id = viewColumnId
                                    formEntity.LookupType = LookupNumber
                                    formEntity.FieldName = FieldNameTB
                                    formEntity.ColumnNum = viewColObj.ColumnNum
                                    formEntity.ColumnWidth = viewColObj.ColumnWidth
                                    formEntity.SortOrder = viewColObj.SortOrder
                                    formEntity.SortOrderDesc = viewColObj.SortOrderDesc
                                    AddUpdateViewColumn(viewColObj, formEntity)
                                    Exit For
                                End If
                            Next
                            Keys.ErrorMessage = Languages.Translation("msgAdminCtrlReUpdatedSuccessfully")
                            Keys.ErrorType = "s"
                        Else

                            SetChildLookDown(formEntity, DisplayStyleData, DuplicateType)
                            SetLookupIdColOnAdd(iLookupColumn, formEntity, CurrentViewColumn, TableName, msSql, tableEntity)
                            formEntity.LookupIdCol = iLookupColumn
                            Dim iMinNumber = -1
                            If (CurrentViewColumn.Count <> 0) Then
                                iMinNumber = CurrentViewColumn.Min(Function(x) x.Id)
                                If (iMinNumber < 0) Then
                                    iMinNumber = iMinNumber - 1
                                Else
                                    iMinNumber = -1
                                End If
                            End If
                            formEntity.Id = iMinNumber
                            If ((Not String.IsNullOrEmpty(formEntity.FieldName)) And (Not String.IsNullOrEmpty(tableEntity.RetentionFieldName))) Then
                                If (formEntity.FieldName.Trim.ToLower.Equals(tableEntity.RetentionFieldName.Trim.ToLower)) Then
                                    formEntity.DropDownFlag = -1
                                Else
                                    If (formEntity.DropDownFlag) Then
                                        formEntity.DropDownFlag = -1
                                    Else
                                        formEntity.DropDownFlag = 0
                                    End If
                                End If
                            Else
                                If (formEntity.DropDownFlag) Then
                                    formEntity.DropDownFlag = -1
                                Else
                                    formEntity.DropDownFlag = 0
                                End If
                            End If

                            Dim ColumnCount = CurrentViewColumn.Count
                            Dim pColumnNumber = ColumnCount

                            'If ColumnCount > -1 Then
                            '    Dim oView = _iView.All().Where(Function(x) x.TableName.ToLower().Trim().Equals(TableName.Trim().ToLower())).FirstOrDefault()
                            '    pColumnNumber = _iViewColumn.All().Where(Function(x) x.ViewsId = oView.Id).Max(Function(x) x.ColumnNum) + 1
                            'End If

                            formEntity.ColumnNum = pColumnNumber 'ColumnCount
                            'If (formEntity.LookupType = Enums.geViewColumnsLookupType.ltDirect) Then
                            '    formEntity.FieldName = DatabaseMap.RemoveTableNameFromField(formEntity.FieldName)
                            'End If
                            formEntity.FieldName = formEntity.FieldName

                            AddUpdateViewColumn(formEntity, formEntity)

                            CurrentViewColumn.Add(formEntity)

                            Keys.ErrorMessage = Languages.Translation("msgAdminCtrlReColumnAddedSuccessfully")
                            Keys.ErrorType = "s"
                        End If
                        If CurrentViewColumn.Count > 0 Then
                            TempData("TempViewColumns_" & LevelNum) = CurrentViewColumn
                            'TempData.Keep("TempViewColumns_" & LevelNum)
                        End If
                    End If


                End If
                If (Not (TempData Is Nothing)) Then
                    Dim Setting = New JsonSerializerSettings
                    Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                    Dim lstViewColumn As New List(Of ViewColumn)
                    lstViewColumn = TempData.Peek("TempViewColumns_" & LevelNum)
                    lstViewColumnJSON = JsonConvert.SerializeObject(lstViewColumn, Newtonsoft.Json.Formatting.Indented, Setting)
                    Keys.ErrorType = "s"
                End If

            Catch ex As Exception
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Keys.ErrorType = "e"
            End Try
            Return Json(New With {
            Key .lstViewColumnJSON = lstViewColumnJSON,
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Sub ValidateAlternateField(moViewColumn As ViewColumn, sortFieldValue As Boolean, filterFieldValue As Boolean, msSQL As String, moTables As Table, ByRef sTempReturnMessage As String)
            Try
                Dim sSQL As String
                Dim iWherePos As Integer
                Dim sFieldName As String
                Dim sErrorMessage As String = String.Empty
                Dim lError As Integer
                Dim rsTestSQL As ADODB.Recordset
                Dim bIsMemo As Boolean
                Dim oSchemaColumns As New SchemaColumns
                Dim conObj = DataServices.DBOpen(moTables, _iDatabas.All())
                Dim sTempFieldName
                If ((sortFieldValue) Or (filterFieldValue)) Then
                    sSQL = DataServices.NormalizeString(msSQL)
                    'sSQL = NormalizeString(msSQL)

                    If ((InStr(1, sSQL, "SELECT DISTINCT TOP", vbTextCompare) <= 0&) And (InStr(1, sSQL, "SELECT DISTINCTROW TOP", vbTextCompare) <= 0&) And (InStr(1, sSQL, "SELECT TOP", vbTextCompare) <= 0&)) Then
                        If (InStr(1, sSQL, "SELECT DISTINCT ", vbTextCompare) > 0&) Then
                            sSQL = Replace$(sSQL, "SELECT DISTINCT ", "SELECT DISTINCT TOP " & Format$(1) & " ", 1, 1, vbTextCompare)
                        ElseIf (InStr(1, sSQL, "SELECT DISTINCTROW ", vbTextCompare) > 0&) Then
                            sSQL = Replace$(sSQL, "SELECT DISTINCTROW ", "SELECT DISTINCTROW TOP " & Format$(1) & " ", 1, 1, vbTextCompare)
                        Else
                            sSQL = Replace$(sSQL, "SELECT ", "SELECT TOP " & Format$(1) & " ", 1, 1, vbTextCompare)
                        End If
                    End If

                    iWherePos = InStr(1, sSQL, "GROUP BY", vbTextCompare)
                    If (iWherePos = 0) Then iWherePos = InStr(1, sSQL, "ORDER BY", vbTextCompare)
                    If (iWherePos > 0) Then sSQL = Left$(sSQL, iWherePos - 1&)

                    iWherePos = InStr(1, sSQL, " WHERE ", vbTextCompare)
                    If iWherePos > 0 Then
                        sSQL = Left$(sSQL, iWherePos - 1&)
                    End If

                    sSQL = Trim$(sSQL) & " WHERE ("
                    sTempFieldName = DatabaseMap.RemoveTableNameFromField(moViewColumn.FieldName)

                    If (StrComp(sTempFieldName, "SLFileRoomOrder", vbTextCompare) = 0) Then
                        sFieldName = "[" & moTables.TableName & "].[" & DatabaseMap.RemoveTableNameFromField(moTables.IdFieldName) & "]"
                        sSQL = sSQL & sFieldName & " IS NULL)"
                    ElseIf (StrComp(sTempFieldName, ReportsModel.TRACKED_LOCATION_NAME, vbTextCompare) = 0) Then
                        '      Dim trackingServiceObj As TrackingServices = New TrackingServices(_IDBManager, _iTable, _iDatabas, _iScanList, _iTabset, _iTabletab, _iRelationShip, _iView, _iSystem, _iTrackingHistory)
                        sSQL = TrackingServices.BuildTrackingLocationSQL(_iTable.All(), _iDatabas.All(), msSQL, moTables)
                    Else
                        If (Trim$(moViewColumn.AlternateFieldName) = "") Then
                            sFieldName = "[" & moTables.TableName & "].[" & DatabaseMap.RemoveTableNameFromField(moViewColumn.FieldName) & "]"
                        Else
                            sFieldName = moViewColumn.AlternateFieldName
                        End If

                        sSQL = sSQL & sFieldName & " IS NULL)"
                    End If


                    rsTestSQL = DataServices.GetADORecordset(sSQL, moTables, _iDatabas.All(), Enums.CursorTypeEnum.rmOpenForwardOnly, , , 1, , True, lError, sErrorMessage)
                    If (lError <> 0&) Then
                        If (Trim$(moViewColumn.AlternateFieldName) = "") Then
                            sTempReturnMessage = String.Format(Languages.Translation("msgAdminCtrlAltFieldNameIsRequired"), vbCrLf, sErrorMessage)
                        Else
                            sTempReturnMessage = String.Format(Languages.Translation("msgAdminCtrlAlternateFieldIsInvalid"), vbCrLf, sErrorMessage)
                        End If
                        Exit Sub
                    ElseIf (Not (rsTestSQL Is Nothing)) Then
                        rsTestSQL.Close()
                        rsTestSQL = Nothing
                    End If
                End If
                'Validate the ORDER BY statement
                If (sortFieldValue) Then
                    If (StrComp(moViewColumn.FieldName, "SLFileRoomOrder", vbTextCompare) <> 0) And (StrComp(moViewColumn.FieldName, "SLTrackedDestination", vbTextCompare) <> 0) Then
                        sSQL = DataServices.NormalizeString(msSQL)

                        If ((InStr(1, sSQL, "SELECT DISTINCT TOP", vbTextCompare) <= 0&) And (InStr(1, sSQL, "SELECT DISTINCTROW TOP", vbTextCompare) <= 0&) And (InStr(1, sSQL, "SELECT TOP", vbTextCompare) <= 0&)) Then
                            If (InStr(1, sSQL, "SELECT DISTINCT ", vbTextCompare) > 0&) Then
                                sSQL = Replace$(sSQL, "SELECT DISTINCT ", "SELECT DISTINCT TOP " & Format$(1) & " ", 1, 1, vbTextCompare)
                            ElseIf (InStr(1, sSQL, "SELECT DISTINCTROW ", vbTextCompare) > 0&) Then
                                sSQL = Replace$(sSQL, "SELECT DISTINCTROW ", "SELECT DISTINCTROW TOP " & Format$(1) & " ", 1, 1, vbTextCompare)
                            Else
                                sSQL = Replace$(sSQL, "SELECT ", "SELECT TOP " & Format$(1) & " ", 1, 1, vbTextCompare)
                            End If
                        End If

                        If (InStr(1, sSQL, "ORDER BY", vbTextCompare) = 0) Then
                            iWherePos = InStr(1, sSQL, " WHERE ", vbTextCompare)
                            If iWherePos > 0 Then sSQL = Left$(sSQL, iWherePos)
                            sSQL = Trim$(sSQL) & " WHERE (0=1)"

                            If (Trim$(moViewColumn.AlternateFieldName) = "") Then
                                lError = 0&
                                ' 01/16/2003 MEF - Added. Fixed SetViewSQL in frmLibrarian to add CONVERT(VARCHAR, to Order by so it can be sortable.
                                bIsMemo = False
                                If (Not (moTables Is Nothing)) Then
                                    If (Not String.IsNullOrEmpty(moViewColumn.FieldName)) Then
                                        Dim oSchemaColumnsList = SchemaInfoDetails.GetSchemaInfo(moTables.TableName, conObj, DatabaseMap.RemoveTableNameFromField(moViewColumn.FieldName))
                                        If (oSchemaColumnsList.Count <> 0) Then
                                            oSchemaColumns = oSchemaColumnsList(0)
                                        End If
                                        ' oSchemaColumns = oTmpTables.ColumnSchema(RemoveTableNameFromField(txtFieldName.Text))
                                        If (Not (oSchemaColumns Is Nothing)) Then
                                            If ((oSchemaColumns.IsString) And ((oSchemaColumns.CharacterMaxLength <= 0) Or (oSchemaColumns.CharacterMaxLength > 8000))) Then
                                                bIsMemo = True
                                            End If

                                            oSchemaColumns = Nothing
                                        End If
                                        If (bIsMemo) Then
                                            sSQL = sSQL & " ORDER BY CONVERT(VARCHAR(8000), [" & Trim$(Replace$(moViewColumn.FieldName, ".", "].[")) & "])"
                                        Else
                                            sSQL = sSQL & " ORDER BY [" & Trim$(Replace$(moViewColumn.FieldName, ".", "].[")) & "]"
                                        End If
                                    End If


                                End If

                                rsTestSQL = DataServices.GetADORecordset(sSQL, moTables, _iDatabas.All(), Enums.CursorTypeEnum.rmOpenForwardOnly, , , 1, , True, lError, sErrorMessage)
                                '  rsTestSQL = theApp.Data.GetADORecordset(sSQL, moTables.TableName, CursorTypeEnum_rmOpenForwardOnly, , , 1, , True, lError, sErrorMessage)

                                If (lError <> 0&) Then
                                    sTempReturnMessage = String.Format(Languages.Translation("msgAdminCtrlAltFieldNameIsRequired"), vbCrLf, sErrorMessage)
                                    Exit Sub
                                ElseIf (Not (rsTestSQL Is Nothing)) Then
                                    rsTestSQL.Close()
                                    rsTestSQL = Nothing
                                End If
                            Else
                                lError = 0&
                                sSQL = sSQL & " ORDER BY " & moViewColumn.AlternateFieldName
                                rsTestSQL = DataServices.GetADORecordset(sSQL, moTables, _iDatabas.All(), Enums.CursorTypeEnum.rmOpenForwardOnly, , , 1, , True, lError, sErrorMessage)
                                ' rsTestSQL = theApp.Data.GetADORecordset(sSQL, moTables.TableName, , , , 1, , True, lError, sErrorMessage)

                                If (lError <> 0&) Then
                                    '  CenterPopupOnForm hWnd
                                    sTempReturnMessage = String.Format(Languages.Translation("msgAdminCtrlAlternateFieldIsInvalid"), vbCrLf, sErrorMessage)
                                    Exit Sub
                                ElseIf (Not (rsTestSQL Is Nothing)) Then
                                    rsTestSQL.Close()
                                    rsTestSQL = Nothing
                                End If
                            End If
                        End If
                    End If
                End If
            Catch ex As Exception
                sTempReturnMessage = ex.Message.ToString
            End Try

        End Sub

        Public Sub SetChildLookDown(ByRef formEntity As ViewColumn, DisplayStyleData As Integer, DuplicateType As Integer)
            If (formEntity.LookupType = Enums.geViewColumnsLookupType.ltChildLookdownCommaDisplayDups) Then
                If (DisplayStyleData = 0 And DuplicateType = 1) Then
                    formEntity.LookupType = Enums.geViewColumnsLookupType.ltChildLookdownCommaHideDups
                ElseIf (DisplayStyleData = 0 And DuplicateType = 0) Then
                    formEntity.LookupType = Enums.geViewColumnsLookupType.ltChildLookdownCommaDisplayDups
                ElseIf (DisplayStyleData = 1 And DuplicateType = 1) Then
                    formEntity.LookupType = Enums.geViewColumnsLookupType.ltChildLookdownLFHideDups
                ElseIf (DisplayStyleData = 1 And DuplicateType = 0) Then
                    formEntity.LookupType = Enums.geViewColumnsLookupType.ltChildLookdownLFDisplayDups
                End If
            Else
                formEntity.LookupType = formEntity.LookupType
            End If
        End Sub

        Public Sub AddUpdateViewColumn(ByRef viewColumnEntity As ViewColumn, formEntity As ViewColumn)
            viewColumnEntity.Id = formEntity.Id
            If (Not (formEntity.ViewsId Is Nothing)) Then
                viewColumnEntity.ViewsId = formEntity.ViewsId
            End If
            If (Not (formEntity.FieldName Is Nothing)) Then
                viewColumnEntity.FieldName = formEntity.FieldName
            End If
            If (Not (formEntity.Heading Is Nothing)) Then
                viewColumnEntity.Heading = formEntity.Heading
            End If
            If (Not (formEntity.LookupType Is Nothing)) Then
                viewColumnEntity.LookupType = formEntity.LookupType
            End If
            viewColumnEntity.EditMask = formEntity.EditMask
            viewColumnEntity.AlternateFieldName = formEntity.AlternateFieldName
            If (Not (formEntity.DropDownFlag Is Nothing)) Then
                viewColumnEntity.DropDownFlag = formEntity.DropDownFlag
            End If
            viewColumnEntity.MaskPromptChar = formEntity.MaskPromptChar
            If (Not (formEntity.ColumnNum Is Nothing)) Then
                viewColumnEntity.ColumnNum = formEntity.ColumnNum
            End If
            If (Not (formEntity.MaxPrintLines Is Nothing)) Then
                viewColumnEntity.MaxPrintLines = formEntity.MaxPrintLines
            Else
                viewColumnEntity.MaxPrintLines = 0
            End If
            viewColumnEntity.InputMask = formEntity.InputMask
            If (formEntity.LookupIdCol IsNot Nothing) Then
                viewColumnEntity.LookupIdCol = formEntity.LookupIdCol
            End If
            If (formEntity.ColumnWidth Is Nothing) Then
                viewColumnEntity.ColumnWidth = 3000
            Else
                viewColumnEntity.ColumnWidth = formEntity.ColumnWidth
            End If
            viewColumnEntity.ColumnOrder = formEntity.ColumnOrder
            viewColumnEntity.ColumnStyle = formEntity.ColumnStyle
            viewColumnEntity.ColumnVisible = formEntity.ColumnVisible
            viewColumnEntity.SortableField = formEntity.SortableField
            viewColumnEntity.FilterField = formEntity.FilterField
            viewColumnEntity.EditAllowed = formEntity.EditAllowed
            viewColumnEntity.DropDownSuggestionOnly = formEntity.DropDownSuggestionOnly
            viewColumnEntity.MaskInclude = formEntity.MaskInclude
            viewColumnEntity.CountColumn = formEntity.CountColumn
            viewColumnEntity.SubtotalColumn = formEntity.SubtotalColumn
            viewColumnEntity.PrintColumnAsSubheader = False
            viewColumnEntity.RestartPageNumber = formEntity.RestartPageNumber
            viewColumnEntity.UseAsPrintId = formEntity.UseAsPrintId
            viewColumnEntity.SuppressPrinting = formEntity.SuppressPrinting
            viewColumnEntity.ValueCount = False
            viewColumnEntity.DropDownReferenceColNum = 0
            viewColumnEntity.FormColWidth = 0
            viewColumnEntity.MaskClipMode = False
            viewColumnEntity.SortOrderDesc = formEntity.SortOrderDesc
            viewColumnEntity.SuppressDuplicates = formEntity.SuppressDuplicates
            viewColumnEntity.VisibleOnForm = True
            viewColumnEntity.VisibleOnPrint = True
            viewColumnEntity.PageBreakField = formEntity.PageBreakField

            viewColumnEntity.FreezeOrder = 0
            viewColumnEntity.AlternateSortColumn = 0
            viewColumnEntity.PrinterColWidth = 0
            viewColumnEntity.SortOrder = formEntity.SortOrder
            viewColumnEntity.LabelJustify = 0
            viewColumnEntity.LabelLeft = 0
            viewColumnEntity.LabelTop = 0
            viewColumnEntity.LabelWidth = 0
            viewColumnEntity.LabelHeight = 0
            viewColumnEntity.ControlLeft = 0
            viewColumnEntity.ControlTop = 0
            viewColumnEntity.ControlWidth = 0
            viewColumnEntity.ControlHeight = 0
            viewColumnEntity.TabOrder = 0
            '   viewColumnEntity.ColumnWidth = 3000
            viewColumnEntity.SortField = Nothing

        End Sub

        Public Function ValidateViewColEditSetting(viewCustModel As ViewsCustomModel, TableName As String, LookupType As Enums.geViewColumnsLookupType, FieldName As String, FieldType As String) As ActionResult
            Try
                Dim mbLookup As Boolean
                Dim editSettings As New Dictionary(Of String, Boolean)
                Dim lError As Long
                Dim rsADO As ADODB.Recordset = Nothing
                Dim sSql As String = ""
                Dim sADOConn As ADODB.Connection
                Dim oFields As ADODB.Field = Nothing
                Dim msSQL As String = ""
                editSettings.Add("Capslock", True)
                editSettings.Add("Editable", True)
                editSettings.Add("Filterable", True)
                editSettings.Add("Sortable", True)
                editSettings.Add("DropDown", True)
                editSettings.Add("DropDownSuggestionOnly", True)
                editSettings.Add("MaskIncludeDB", True)
                editSettings.Add("SubTotal", True)

                Dim oTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(TableName.Trim.ToLower)).FirstOrDefault
                If (Not (oTable Is Nothing)) Then
                    'editSettings("DropDown") = False
                    'editSettings("DropDownSuggestionOnly") = False
                    Dim oRelation = _iRelationShip.All.Where(Function(m) m.LowerTableName.Trim.ToLower.Equals(oTable.TableName.Trim.ToLower))
                    If (Not (oRelation Is Nothing)) Then
                        mbLookup = False
                        For Each relationObj As RelationShip In oRelation
                            If (DatabaseMap.RemoveTableNameFromField(relationObj.LowerTableFieldName).Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(FieldName).Trim.ToLower)) Then
                                mbLookup = True
                                Exit For
                            End If
                        Next
                        editSettings("DropDown") = mbLookup
                        editSettings("DropDownSuggestionOnly") = mbLookup
                    End If
                End If
                If (viewCustModel.ViewsModel Is Nothing) Then
                    msSQL = "Select * From [" + TableName + "]"
                Else
                    msSQL = viewCustModel.ViewsModel.SQLStatement
                End If
                sSql = DataServices.InjectWhereIntoSQL(msSQL, "0=1")
                sADOConn = DataServices.DBOpen(oTable, _iDatabas.All())
                Dim sErrorMessage = ""
                rsADO = DataServices.GetADORecordset(sSql, oTable, _iDatabas.All(), , , , 1, , True, lError, sErrorMessage)
                ' rsADO = DataServices.GetADORecordset(sSql, sADOConn)
                If (rsADO IsNot Nothing) Then
                    If (rsADO.Fields IsNot Nothing) Then
                        oFields = ViewModel.FieldWithOrWithoutTable(FieldName, rsADO.Fields, False)
                    End If
                End If

                If (lError = 0) Then
                    If (oFields IsNot Nothing) Then
                        If (SchemaInfoDetails.IsADateType(oFields.Type)) Then
                            editSettings("Capslock") = False
                            editSettings("SubTotal") = False
                        ElseIf (SchemaInfoDetails.IsAStringType(oFields.Type)) Then
                            editSettings("SubTotal") = False
                        Else
                            editSettings("Capslock") = False
                            Select Case oFields.Type
                                Case Enums.DataTypeEnum.rmBoolean, Enums.DataTypeEnum.rmUnsignedTinyInt
                                    editSettings("SubTotal") = False
                                Case Enums.DataTypeEnum.rmDouble, Enums.DataTypeEnum.rmCurrency, Enums.DataTypeEnum.rmDecimal, Enums.DataTypeEnum.rmNumeric, Enums.DataTypeEnum.rmSingle, Enums.DataTypeEnum.rmVarNumeric
                                    editSettings("SubTotal") = True
                                Case Enums.DataTypeEnum.rmBigInt, Enums.DataTypeEnum.rmUnsignedBigInt, Enums.DataTypeEnum.rmInteger
                                    If (oFields.Properties("ISAUTOINCREMENT").Value) Then
                                        editSettings("Editable") = False
                                        editSettings("SubTotal") = False
                                    Else
                                        Dim boolVal = (StrComp(DatabaseMap.RemoveTableNameFromField(oFields.Name), DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName), vbTextCompare = 0))
                                        If ((oTable.CounterFieldName <> "") And (boolVal = 0)) Then
                                            editSettings("SubTotal") = False
                                        Else
                                            editSettings("SubTotal") = True
                                        End If
                                    End If
                                Case Enums.DataTypeEnum.rmBinary
                                    editSettings("Editable") = False
                                    editSettings("SubTotal") = False
                                Case Enums.DataTypeEnum.rmSmallInt, Enums.DataTypeEnum.rmTinyInt, Enums.DataTypeEnum.rmUnsignedInt, Enums.DataTypeEnum.rmUnsignedSmallInt
                                    editSettings("SubTotal") = True
                            End Select
                        End If
                        rsADO.Close()
                        rsADO = Nothing
                    Else
                        editSettings("SubTotal") = False
                    End If
                Else
                    editSettings("SubTotal") = False
                End If
                If (LookupType = Enums.geViewColumnsLookupType.ltLookup) Then
                    lError = 1
                    lError = ReportsModel.mcLevel.Item(FieldName)
                    If (lError = 1) Then
                        editSettings("DropDown") = True
                        editSettings("Editable") = False
                    Else
                        editSettings("DropDown") = False
                        editSettings("Editable") = False
                    End If
                    editSettings("DropDownSuggestionOnly") = False
                End If
                If (LookupType <> Enums.geViewColumnsLookupType.ltDirect) Then
                    If (LookupType <> Enums.geViewColumnsLookupType.ltLookup) Then
                        editSettings("Editable") = False
                    End If
                    editSettings("Sortable") = False
                    editSettings("Filterable") = False
                    editSettings("MaskIncludeDB") = False
                    editSettings("Capslock") = False
                End If
                If (Not String.IsNullOrEmpty(oTable.RetentionFieldName)) Then
                    If (DatabaseMap.RemoveTableNameFromField(oTable.RetentionFieldName).Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(FieldName).Trim.ToLower)) Then
                        If (Not oTable.RetentionAssignmentMethod Is Nothing) Then
                            If (oTable.RetentionAssignmentMethod = Enums.meRetentionCodeAssignment.rcaCurrentTable Or oTable.RetentionAssignmentMethod = Enums.meRetentionCodeAssignment.rcaRelatedTable) Then
                                editSettings("Editable") = False
                            End If
                        End If
                    End If
                End If
                If (editSettings.Item("DropDown") = False) Then
                    editSettings("DropDownSuggestionOnly") = False
                End If
                'FUS-5789
                If (editSettings.Item("DropDown") = False) Then
                    If (Not (oTable Is Nothing)) Then
                        Dim oRelation = _iRelationShip.All.Where(Function(m) m.LowerTableName.Trim.ToLower.Equals(oTable.TableName.Trim.ToLower))
                        If (Not (oRelation Is Nothing)) Then
                            For Each relationObj As RelationShip In oRelation
                                If (relationObj.UpperTableFieldName.Split(".")(0).Trim.ToLower.Equals(FieldName.Split(".")(0).Trim.ToLower)) Then
                                    editSettings("Editable") = False
                                    Exit For
                                End If
                            Next
                        End If
                    End If
                End If
                Keys.ErrorType = "s"
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim editSettingsJSON = JsonConvert.SerializeObject(editSettings, Newtonsoft.Json.Formatting.Indented, Setting)
                Return Json(New With {
                           Key .errortype = Keys.ErrorType,
                           Key .editSettingsJSON = editSettingsJSON
                           }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Return Json(New With {
           Key .errortype = Keys.ErrorType
           }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try
        End Function


        Public Sub ValidateEditSettingsOnEdit(ByRef editSettingList As Dictionary(Of String, Boolean), viewColumnEntity As ViewColumn, CurrentViewColumn As List(Of ViewColumn), tableName As String, oView As View)
            Try
                Dim bIsSecondLevel As Boolean
                Dim mbLocalLookup As Boolean
                Dim bLocked As Boolean
                Dim sADOConn As New ADODB.Connection
                editSettingList.Add("Capslock", True)
                editSettingList.Add("Editable", True)
                editSettingList.Add("Filterable", True)
                editSettingList.Add("Sortable", True)
                'editSettingList.Add("DropDown", True)
                'editSettingList.Add("DropDownSuggestionOnly", True)
                editSettingList.Add("MaskIncludeDB", True)
                editSettingList.Add("DropDown", False)
                editSettingList.Add("DropDownSuggestionOnly", False)
                editSettingList.Add("SubTotal", True)
                Dim moTable As New Table
                If (Not viewColumnEntity Is Nothing) Then
                    '  Dim tableName = _iView.All.Where(Function(m) m.Id = viewColumnEntity.ViewsId).FirstOrDefault.TableName
                    moTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower)).FirstOrDefault
                    Select Case viewColumnEntity.LookupType
                        Case Enums.geViewColumnsLookupType.ltLookup
                            bIsSecondLevel = True
                            If ((viewColumnEntity.LookupIdCol >= 0) And (viewColumnEntity.LookupIdCol < CurrentViewColumn.Count)) Then
                                Dim tempViewCol = CurrentViewColumn.Where(Function(m) m.ColumnNum = viewColumnEntity.LookupIdCol).FirstOrDefault
                                '  Dim tempViewCol = CurrentViewColumn.Item(viewColumnEntity.LookupIdCol + 1)
                                If (Not tempViewCol Is Nothing) Then
                                    bIsSecondLevel = tempViewCol.LookupType <> Enums.geViewColumnsLookupType.ltDirect
                                End If
                            End If
                            If (Not bIsSecondLevel) Then
                                editSettingList("DropDown") = True
                                editSettingList("Editable") = False
                            Else
                                editSettingList("DropDown") = False
                                editSettingList("Editable") = False
                            End If
                        Case Enums.geViewColumnsLookupType.ltChildLookdownCommaDisplayDups, Enums.geViewColumnsLookupType.ltChildLookdownCommaHideDups, Enums.geViewColumnsLookupType.ltChildLookdownLFDisplayDups, Enums.geViewColumnsLookupType.ltChildLookdownLFHideDups, Enums.geViewColumnsLookupType.ltChildLookdownTotals
                            Dim childTable As New Table
                            If (viewColumnEntity.LookupIdCol > -1) Then
                                If ((viewColumnEntity.LookupIdCol >= 0) And (viewColumnEntity.LookupIdCol < CurrentViewColumn.Count)) Then
                                    Dim tempViewCol = CurrentViewColumn.Where(Function(m) m.ColumnNum = viewColumnEntity.LookupIdCol).FirstOrDefault
                                    Dim TempTableName = DatabaseMap.RemoveFieldNameFromField(tempViewCol.FieldName)
                                    childTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(TempTableName.Trim.ToLower))
                                    If (Not (childTable Is Nothing)) Then
                                        editSettingList("DropDown") = True
                                    End If
                                End If
                            Else
                                Dim TempTableName = DatabaseMap.RemoveFieldNameFromField(viewColumnEntity.FieldName)
                                childTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(TempTableName.Trim.ToLower)).FirstOrDefault
                                If (Not (childTable Is Nothing)) Then
                                    Dim ParentTable = _iRelationShip.All.Where(Function(m) m.LowerTableName.Trim.ToLower.Equals(childTable.TableName.Trim.ToLower))
                                    If (Not (ParentTable Is Nothing)) Then
                                        For Each relationObj As RelationShip In ParentTable
                                            If (relationObj.LowerTableFieldName.Trim.ToLower.Equals(viewColumnEntity.FieldName.Trim.ToLower)) Then
                                                If (Not (relationObj.UpperTableName.Trim.ToLower.Equals(moTable.TableName.Trim.ToLower))) Then
                                                    editSettingList("DropDown") = True
                                                    Exit For
                                                End If
                                            End If
                                        Next
                                    End If
                                End If
                            End If
                            If (editSettingList("DropDown")) Then
                                If (Not (childTable Is Nothing)) Then
                                    If (Trim(childTable.CounterFieldName) = "") Then
                                        'Get ADO connection name
                                        If (Not (childTable Is Nothing)) Then
                                            '  Dim dbObj = _iDatabas.All.Where(Function(m) m.DBName.Trim.ToLower.Equals(DBConName.Trim.ToLower)).FirstOrDefault
                                            sADOConn = DataServices.DBOpen(childTable, _iDatabas.All())
                                        End If
                                        Dim sSql = "SELECT [" + Replace(childTable.IdFieldName, ".", "].[") + "] FROM [" + childTable.TableName + "] WHERE 0=1;"
                                        '  Dim rsAdo = DataServices.GetADORecordset(sSql, sADOConn)
                                        Dim rsAdo = DataServices.GetADORecordset(sSql, childTable, _iDatabas.All(), , , , 1, , True, , )
                                        If (Not (rsAdo Is Nothing)) Then
                                            If (Not (rsAdo.Fields(0).Properties("IsAutoIncrement").Value)) Then
                                                editSettingList("DropDown") = False
                                                editSettingList("Editable") = False
                                            End If
                                        End If
                                    End If
                                End If
                            Else
                                editSettingList("DropDown") = False
                            End If

                        Case Enums.geViewColumnsLookupType.ltDirect
                            Dim ParentTable = _iRelationShip.All.Where(Function(m) m.LowerTableName.Trim.ToLower.Equals(moTable.TableName.Trim.ToLower))

                            If (Not (ParentTable Is Nothing)) Then
                                For Each relationObj As RelationShip In ParentTable
                                    If (StrComp(DatabaseMap.RemoveTableNameFromField(relationObj.LowerTableFieldName), DatabaseMap.RemoveTableNameFromField(viewColumnEntity.FieldName), vbTextCompare) = 0) Then
                                        mbLocalLookup = True
                                        Exit For
                                    End If
                                    'If (DatabaseMap.RemoveTableNameFromField(relationObj.LowerTableFieldName).Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(viewColumnEntity.FieldName))) Then
                                    '    mbLocalLookup = True
                                    '    Exit For
                                    'End If
                                Next
                                editSettingList("DropDown") = mbLocalLookup
                                'FUS-5789
                                If (editSettingList.Item("DropDown") = False) Then
                                    If (Not (moTable Is Nothing)) Then
                                        If (Not (ParentTable Is Nothing)) Then
                                            For Each relationObj As RelationShip In ParentTable
                                                If (relationObj.UpperTableFieldName.Split(".")(0).Trim.ToLower.Equals(viewColumnEntity.FieldName.Split(".")(0).Trim.ToLower)) Then
                                                    editSettingList("Editable") = False
                                                    Exit For
                                                End If
                                            Next
                                        End If
                                    End If
                                End If
                            End If
                            If (DatabaseMap.RemoveTableNameFromField(moTable.RetentionFieldName).Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(viewColumnEntity.FieldName).Trim.ToLower)) Then
                                editSettingList("Editable") = moTable.RetentionAssignmentMethod <> Enums.meRetentionCodeAssignment.rcaCurrentTable And moTable.RetentionAssignmentMethod <> Enums.meRetentionCodeAssignment.rcaRelatedTable
                                editSettingList("DropDown") = editSettingList("Editable")
                            End If
                    End Select

                    Select Case viewColumnEntity.LookupType
                        Case Enums.geViewColumnsLookupType.ltLookup, Enums.geViewColumnsLookupType.ltChildLookdownCommaDisplayDups, Enums.geViewColumnsLookupType.ltChildLookdownLFDisplayDups, Enums.geViewColumnsLookupType.ltChildLookdownCommaHideDups, Enums.geViewColumnsLookupType.ltChildLookdownLFHideDups, Enums.geViewColumnsLookupType.ltChildLookdownTotals
                            bLocked = False
                        Case Else
                            'Get ADO connection name
                            If (Not (moTable Is Nothing)) Then
                                '  Dim dbObj = _iDatabas.All.Where(Function(m) m.DBName.Trim.ToLower.Equals(DBConName.Trim.ToLower)).FirstOrDefault
                                sADOConn = DataServices.DBOpen(moTable, _iDatabas.All())
                            End If
                            Dim sSql = "SELECT [" + DatabaseMap.RemoveTableNameFromField(viewColumnEntity.FieldName) + "] FROM [" + moTable.TableName + "] WHERE 0=1;"
                            Dim rsAdo = DataServices.GetADORecordset(sSql, moTable, _iDatabas.All(), , , , 1, , True, , )
                            ' Dim rsAdo = DataServices.GetADORecordset(sSql, sADOConn)
                            bLocked = ViewModel.DataLocked(viewColumnEntity.FieldName, rsAdo)
                    End Select
                    If (bLocked) Then
                        editSettingList("Editable") = False
                        If (viewColumnEntity.LookupType <> Enums.geViewColumnsLookupType.ltLookup) Then
                            editSettingList("DropDown") = False
                        End If
                    End If
                    If (viewColumnEntity.LookupType <> Enums.geViewColumnsLookupType.ltDirect) Then
                        If (viewColumnEntity.LookupType <> Enums.geViewColumnsLookupType.ltLookup) Then
                            editSettingList("Editable") = False
                        End If
                        editSettingList("Sortable") = False
                        editSettingList("Filterable") = False
                        editSettingList("MaskIncludeDB") = False
                        editSettingList("Capslock") = False
                    End If
                    If (editSettingList("DropDown") And mbLocalLookup) Then
                        editSettingList("DropDownSuggestionOnly") = True
                    Else
                        editSettingList("DropDownSuggestionOnly") = False
                    End If
                    SetEditSettingOnEdit(editSettingList, viewColumnEntity, tableName, oView)
                End If

            Catch ex As Exception
            End Try

        End Sub

        Public Sub SetEditSettingOnEdit(ByRef editSettingList As Dictionary(Of String, Boolean), viewColumnEntity As ViewColumn, sTableName As String, oView As View)
            Try
                Dim msSQL As String = ""

                Dim oTable As Table = Nothing
                Dim lError As Integer
                Dim rsADO As ADODB.Recordset
                Dim sErrorMessage As String = String.Empty
                Dim oFields As ADODB.Field = Nothing
                If (Not String.IsNullOrEmpty(sTableName)) Then
                    oTable = _iTable.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(sTableName.Trim.ToLower)).FirstOrDefault
                End If
                If (oView Is Nothing) Then
                    msSQL = "SELECT * FROM [" + sTableName + "]"
                Else
                    msSQL = oView.SQLStatement
                End If
                Dim sSql As String = String.Empty
                Dim sOrderByStr As String = String.Empty
                Dim iWherePos As Integer
                If (DatabaseMap.RemoveTableNameFromField(viewColumnEntity.FieldName).Trim.Equals("SLTrackedDestination") Or DatabaseMap.RemoveTableNameFromField(viewColumnEntity.FieldName).Trim.Equals("SLFileRoomOrder")) Then
                    editSettingList("SubTotal") = False
                    editSettingList("Editable") = False
                Else
                    If (InStr(viewColumnEntity.FieldName, ".") > 1) Then
                        sTableName = DatabaseMap.RemoveFieldNameFromField(viewColumnEntity.FieldName)
                    End If

                    If (viewColumnEntity.LookupType = Enums.geViewColumnsLookupType.ltDirect) Then
                        sSql = DataServices.NormalizeString(msSQL)
                        iWherePos = InStr(1, sSql, "GROUP BY", vbTextCompare)
                        If (iWherePos = 0) Then
                            iWherePos = InStr(1, sSql, "ORDER BY", vbTextCompare)
                        End If
                        If (iWherePos > 0) Then
                            sOrderByStr = Mid$(sSql, iWherePos)
                            sSql = Left$(sSql, (iWherePos - 2))
                        End If
                        iWherePos = InStr(1, sSql, " WHERE ", vbTextCompare)
                        If iWherePos > 0 Then
                            sSql = Left$(sSql, (iWherePos + 6)) & " (" & Mid$(sSql, (iWherePos + 7)) & ")"
                            sSql = sSql & " AND ("
                        Else
                            sSql = sSql & " WHERE ("
                        End If
                        sSql = sSql & "1 = 0)" & sOrderByStr
                        rsADO = DataServices.GetADORecordset(sSql, oTable, _iDatabas.All(), , , , 1, , True, lError, sErrorMessage)
                    Else
                        If (viewColumnEntity.AlternateFieldName <> "") Then
                            rsADO = DataServices.GetADORecordset("SELECT " & viewColumnEntity.AlternateFieldName & " FROM [" & sTableName & "] WHERE 0 = 1", oTable, _iDatabas.All(), , , , 1, , True, lError, sErrorMessage)
                        Else
                            rsADO = DataServices.GetADORecordset("SELECT [" & Replace$(viewColumnEntity.FieldName.Text, ".", "].[") & "] FROM [" & sTableName & "] WHERE 0 = 1", oTable, _iDatabas.All(), , , , 1, , True, lError, sErrorMessage)
                        End If
                    End If
                    If (rsADO IsNot Nothing) Then
                        If (rsADO.Fields IsNot Nothing) Then
                            oFields = ViewModel.FieldWithOrWithoutTable(viewColumnEntity.FieldName, rsADO.Fields, False)
                        End If
                    End If
                    If (lError = 0) Then
                        If (Not (oFields Is Nothing)) Then
                            If (SchemaInfoDetails.IsADateType(oFields.Type)) Then
                                editSettingList("Capslock") = False
                                editSettingList("SubTotal") = False
                            ElseIf (SchemaInfoDetails.IsAStringType(oFields.Type)) Then
                                editSettingList("SubTotal") = False
                            Else
                                editSettingList("Capslock") = False
                                Select Case oFields.Type
                                    Case Enums.DataTypeEnum.rmBoolean, Enums.DataTypeEnum.rmUnsignedTinyInt
                                        editSettingList("SubTotal") = False
                                    Case Enums.DataTypeEnum.rmDouble, Enums.DataTypeEnum.rmCurrency, Enums.DataTypeEnum.rmDecimal, Enums.DataTypeEnum.rmNumeric, Enums.DataTypeEnum.rmSingle, Enums.DataTypeEnum.rmVarNumeric
                                        editSettingList("SubTotal") = True
                                    Case Enums.DataTypeEnum.rmBigInt, Enums.DataTypeEnum.rmUnsignedBigInt, Enums.DataTypeEnum.rmInteger
                                        If (oFields.Properties("ISAUTOINCREMENT").Value) Then
                                            editSettingList("Editable") = False
                                            editSettingList("SubTotal") = False
                                        Else
                                            Dim boolVal = StrComp(DatabaseMap.RemoveTableNameFromField(oFields.Name), DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName), vbTextCompare = 0)
                                            If ((oTable.CounterFieldName <> "") And (boolVal = 0)) Then
                                                editSettingList("SubTotal") = False
                                            Else
                                                editSettingList("SubTotal") = True
                                            End If
                                        End If
                                    Case Enums.DataTypeEnum.rmBinary
                                        editSettingList("Editable") = False
                                        editSettingList("SubTotal") = False
                                    Case Enums.DataTypeEnum.rmSmallInt, Enums.DataTypeEnum.rmTinyInt, Enums.DataTypeEnum.rmUnsignedInt, Enums.DataTypeEnum.rmUnsignedSmallInt
                                        editSettingList("SubTotal") = True
                                End Select
                            End If
                            rsADO.Close()
                            rsADO = Nothing
                        Else
                            editSettingList("SubTotal") = False
                        End If
                    Else
                        editSettingList("SubTotal") = False
                    End If
                    oFields = Nothing
                End If

                If (viewColumnEntity.LookupType <> Enums.geViewColumnsLookupType.ltDirect) Then
                    editSettingList("Sortable") = False
                    editSettingList("Filterable") = False
                End If

            Catch ex As Exception

            End Try
        End Sub


        Public Function DropDownValidation(currentStatus As Boolean, editStatus As Boolean, tableName As String, lFieldNameVar As String, lookUpVar As Enums.geViewColumnsLookupType) As ActionResult
            Try
                Dim chkEditable = editStatus
                Dim chkDropDownSuggest As Boolean
                Dim mbLocalLookup = False
                If (Not String.IsNullOrEmpty(tableName)) Then
                    Dim parentTable = _iRelationShip.All.Where(Function(m) m.LowerTableName.Trim.ToLower.Equals(tableName.Trim.ToLower))
                    If (parentTable.Count > 0) Then
                        For Each relationObj As RelationShip In parentTable
                            If (DatabaseMap.RemoveTableNameFromField(relationObj.LowerTableFieldName).Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(lFieldNameVar).Trim.ToLower)) Then
                                mbLocalLookup = True
                                Exit For
                            End If
                        Next
                    End If
                End If
                If (Not currentStatus) Then
                    If ((Not mbLocalLookup) Or (lookUpVar = Enums.geViewColumnsLookupType.ltLookup)) Then
                        chkEditable = False
                    End If
                    chkDropDownSuggest = False
                Else
                    If ((Not mbLocalLookup) Or (lookUpVar = Enums.geViewColumnsLookupType.ltLookup)) Then
                        chkEditable = True
                    End If
                    chkDropDownSuggest = mbLocalLookup
                End If
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim chkEditableJSON = JsonConvert.SerializeObject(chkEditable, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim chkDropDownSuggestJSON = JsonConvert.SerializeObject(chkDropDownSuggest, Newtonsoft.Json.Formatting.Indented, Setting)
                Return Json(New With {
                           Key .errortype = Keys.ErrorType,
                           Key .chkEditableJSON = chkEditableJSON,
                           Key .chkDropDownSuggestJSON = chkDropDownSuggestJSON
                           }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Return Json(New With {
           Key .errortype = Keys.ErrorType
           }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try
        End Function

        Public Function DeleteViewColumn(vViewId As Integer, vViewColumnId As Integer, arrSerialized As String) As JsonResult

            Dim lstViewColumns As List(Of ViewColumn)
            Dim pViewColumn As ViewColumn

            Try
                If (Not TempData Is Nothing) Then
                    Dim bInUse = False
                    lstViewColumns = TempData.Peek("TempViewColumns_" & vViewId)
                    pViewColumn = lstViewColumns.FirstOrDefault(Function(m) m.Id = vViewColumnId)
                    If Not pViewColumn Is Nothing Then

                        For Each viewColObj As ViewColumn In lstViewColumns
                            If viewColObj.LookupType <> Enums.geViewColumnsLookupType.ltDirect Then
                                If (viewColObj.LookupIdCol = pViewColumn.ColumnNum And viewColObj.Id <> pViewColumn.Id) Then
                                    bInUse = True
                                    Exit For
                                End If
                            End If
                        Next
                        If (Not bInUse) Then
                            Dim filterColNum As Object = New JavaScriptSerializer().Deserialize(Of Object)(arrSerialized)
                            If (Not filterColNum Is Nothing) Then
                                For Each iCount As String In filterColNum
                                    If (Not String.IsNullOrEmpty(iCount)) Then
                                        If (pViewColumn.ColumnNum = Convert.ToInt64(iCount)) Then
                                            bInUse = True
                                            Exit For
                                        End If
                                    End If

                                Next
                            End If
                        End If
                        If (bInUse) Then
                            Keys.ErrorMessage = Languages.Translation("msgAdminCtrlSelectedColUsedAsLookupId")
                            Keys.ErrorType = "w"
                        Else
                            Dim ColumnNumVar = pViewColumn.ColumnNum
                            Dim tempViewColumn = Nothing

                            For Each objViewCol As ViewColumn In lstViewColumns
                                If (objViewCol.ColumnNum = pViewColumn.LookupIdCol And objViewCol.ColumnNum <> 0) Then
                                    Dim IsUsedByOther = lstViewColumns.Any(Function(m) m.LookupIdCol = objViewCol.ColumnNum)
                                    If (Not IsUsedByOther) Then
                                        ColumnNumVar = objViewCol.ColumnNum
                                        tempViewColumn = objViewCol
                                    End If
                                End If
                            Next
                            If (Not tempViewColumn Is Nothing) Then
                                lstViewColumns.Remove(tempViewColumn)
                            End If
                            lstViewColumns.Remove(pViewColumn)
                            lstViewColumns.OrderBy(Function(m) m.ColumnNum)
                            ColumnNumVar = 0
                            Dim list As New List(Of KeyValuePair(Of Integer, Integer))
                            For Each viewColObj As ViewColumn In lstViewColumns
                                Dim IfDependent = lstViewColumns.Any(Function(m) m.LookupIdCol = viewColObj.ColumnNum And m.LookupIdCol <> 0)
                                If (IfDependent) Then
                                    list.Add(New KeyValuePair(Of Integer, Integer)(ColumnNumVar, viewColObj.ColumnNum))
                                End If
                                viewColObj.ColumnNum = ColumnNumVar
                                ColumnNumVar = ColumnNumVar + 1
                            Next
                            For Each viewColObj As ViewColumn In lstViewColumns
                                If (viewColObj.LookupType = 1) Then
                                    Dim YesNo = list.Any(Function(m) m.Value = viewColObj.LookupIdCol)
                                    If (YesNo) Then
                                        viewColObj.LookupIdCol = list.Where(Function(m) m.Value = viewColObj.LookupIdCol).FirstOrDefault.Key
                                    End If
                                End If
                            Next
                            TempData("TempViewColumns_" & vViewId) = lstViewColumns
                            TempData.Peek("TempViewColumns_" & vViewId)
                            Keys.ErrorMessage = Languages.Translation("msgAdminCtrlColRmvSuccessfully")
                            Keys.ErrorType = "s"
                        End If
                    End If
                End If
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS
            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Sub SetLookupIdColOnAdd(ByRef iLookupColumn As Integer, formEntity As ViewColumn, CurrentViewColumn As List(Of ViewColumn), currentTableName As String, msSql As String, moTables As Table)
            Try
                'Dim iLookupColumn As Integer
                Dim oRelationships As RelationShip
                Dim oParentRelationships As New RelationShip
                Dim iLookupColumn2 As Integer
                Dim oTmpViewColumns As ViewColumn
                Dim sFieldTableName As String
                Dim sTmpTableName As String
                Dim ParentTable = _iRelationShip.All.Where(Function(m) m.LowerTableName.Trim.ToLower.Equals(currentTableName.Trim.ToLower))
                Select Case formEntity.LookupType
                    Case Enums.geViewColumnsLookupType.ltLookup
                        iLookupColumn = -1
                        For Each oTmpViewColumns In CurrentViewColumn
                            'If (Not oTmpViewColumns.Deleted) Then
                            If (ReportsModel.mcLevel.Item(UCase$(Trim$(formEntity.FieldName))) = 1) Then
                                If (oTmpViewColumns.LookupType = Enums.geViewColumnsLookupType.ltDirect) Then
                                    If (UCase$(Trim$(DatabaseMap.RemoveTableNameFromField(oTmpViewColumns.FieldName))) = UCase$(Trim$(DatabaseMap.RemoveTableNameFromField(ReportsModel.mcFieldName.Item(UCase$(Trim$(formEntity.FieldName))))))) Then
                                        iLookupColumn = oTmpViewColumns.ColumnNum
                                        Exit For
                                    End If
                                End If
                            End If
                            If (ReportsModel.mcLevel.Item(UCase$(Trim$(formEntity.FieldName))) = 2) Then
                                If (oTmpViewColumns.LookupType = Enums.geViewColumnsLookupType.ltLookup) Then
                                    If (UCase$(Trim$(oTmpViewColumns.FieldName)) = UCase$(Trim$(ReportsModel.mcFieldName.Item(UCase$(Trim$(formEntity.FieldName)))))) Then
                                        iLookupColumn = CheckForDirectRelationship(formEntity.FieldName, ParentTable, CurrentViewColumn, msSql, moTables, formEntity)
                                        'Private Function CheckForDirectRelationship(ByVal sUpperFieldName As String, ByVal ParentTable As IQueryable(Of RelationShip), currentViewColumn As List(Of ViewColumn), msSql As String, moTables As Table, FormEntity As ViewColumn) As Integer
                                        If (iLookupColumn < 0) Then
                                            iLookupColumn = oTmpViewColumns.ColumnNum
                                        End If

                                        Exit For
                                    End If
                                End If
                            End If
                            'End If
                        Next
                        oTmpViewColumns = Nothing
                        If (iLookupColumn < 0) Then
                            If (ReportsModel.mcLevel.Item(UCase$(Trim$(formEntity.FieldName))) = 1) Then

                                'iLookupColumn = CreateViewColumns(geViewColumnsLookupType_ltDirect, 0, RemoveTableNameFromFieldIfNotCurrentTable(mcFieldName.Item(UCase$(Trim$(cboFieldName.List(cboFieldName.ListIndex))))), "Id For " & cboFieldName.List(cboFieldName.ListIndex), False, False)
                                iLookupColumn = CreateViewColumnsForLookupIdCol(CurrentViewColumn, Enums.geViewColumnsLookupType.ltDirect, 0, DatabaseMap.RemoveTableNameFromFieldIfNotCurrentTable(ReportsModel.mcFieldName.Item(UCase$(Trim$(formEntity.FieldName))), currentTableName), "Id For " & formEntity.FieldName, False, False, msSql, moTables, formEntity)
                                ' iLookupColumn = CreateViewColumns(Enums.geViewColumnsLookupType.ltDirect, 0, DatabaseMap.RemoveTableNameFromFieldIfNotCurrentTable(ReportsModel.mcFieldName.Item(UCase$(Trim$(formEntity.FieldName))), currentTableName), "Id For " & formEntity.FieldName, False, False)
                            Else
                                oRelationships = ReportsModel.mcRelationships.Item(UCase$(Trim$(formEntity.FieldName)))

                                For Each oParentRelationships In ParentTable
                                    If (UCase$(Trim$(oParentRelationships.UpperTableName)) = UCase$(Trim$(oRelationships.LowerTableName))) Then
                                        Exit For
                                    End If
                                Next
                                If (Not (oParentRelationships Is Nothing)) Then
                                    iLookupColumn2 = -1
                                    For Each oTmpViewColumns In CurrentViewColumn
                                        'If (Not oTmpViewColumns.Deleted) Then
                                        If (oTmpViewColumns.LookupType = Enums.geViewColumnsLookupType.ltDirect) Then
                                            If (UCase$(Trim$(DatabaseMap.RemoveTableNameFromField(oTmpViewColumns.FieldName))) = UCase$(Trim$(DatabaseMap.RemoveTableNameFromField(oParentRelationships.LowerTableFieldName)))) Then
                                                iLookupColumn2 = oTmpViewColumns.ColumnNum
                                                Exit For
                                            End If
                                        End If
                                        'End If
                                    Next
                                    oTmpViewColumns = Nothing
                                    If (iLookupColumn2 < 0) Then
                                        'Private Function CreateViewColumnsForLookupIdCol(ByRef CurrentViewColumn As List(Of ViewColumn), eLookupType As Enums.geViewColumnsLookupType, ByVal iLookupCol As Integer, ByVal sFieldName As String, ByVal sFieldDesc As String, ByVal bDoDropDownFlag As Boolean, ByVal bVisible As Boolean, ByVal msSQL As String, moTables As Table, formEntity As ViewColumn) As Integer
                                        iLookupColumn2 = CreateViewColumnsForLookupIdCol(CurrentViewColumn, Enums.geViewColumnsLookupType.ltDirect, 0, Trim$(oParentRelationships.LowerTableFieldName), "Id For " & oRelationships.LowerTableFieldName, False, False, msSql, moTables, formEntity)
                                    End If
                                    iLookupColumn = CreateViewColumnsForLookupIdCol(CurrentViewColumn, Enums.geViewColumnsLookupType.ltLookup, iLookupColumn2, Trim$(oRelationships.LowerTableFieldName), "Id For " & formEntity.FieldName, False, False, msSql, moTables, formEntity)
                                    'iLookupColumn = CreateViewColumns(geViewColumnsLookupType_ltLookup, iLookupColumn2, Trim$(oRelationships.LowerTableFieldName), "Id For " & cboFieldName.List(cboFieldName.ListIndex), False, False)
                                End If
                            End If
                        End If
                    Case Enums.geViewColumnsLookupType.ltChildLookdownCommaDisplayDups, Enums.geViewColumnsLookupType.ltChildLookdownCommaHideDups, Enums.geViewColumnsLookupType.ltChildLookdownLFDisplayDups, Enums.geViewColumnsLookupType.ltChildLookdownLFHideDups, Enums.geViewColumnsLookupType.ltChildLookdownTotals
                        iLookupColumn = -1 'Level One Items still set this as a flag that it is a level one look down not up.
                        Dim uCaseVar = UCase$(Trim$(formEntity.FieldName))
                        If (ReportsModel.mcLevel.Item(UCase$(Trim$(formEntity.FieldName))) = 2) Then
                            iLookupColumn = -1
                            sFieldTableName = UCase$(Trim$(ReportsModel.mcFieldName.Item(UCase$(Trim$(formEntity.FieldName)))))
                            If (InStr(sFieldTableName, ".") > 1) Then
                                sFieldTableName = Left$(sFieldTableName, InStr(sFieldTableName, ".") - 1)
                            Else
                                sFieldTableName = ""
                            End If
                            If (sFieldTableName <> "") Then
                                For Each oTmpViewColumns In CurrentViewColumn
                                    'If (Not oTmpViewColumns.Deleted) Then
                                    If (oTmpViewColumns.LookupIdCol = -1) Then 'This indicates the look down record we need
                                        Select Case oTmpViewColumns.LookupType
                                            Case Enums.geViewColumnsLookupType.ltChildLookdownCommaDisplayDups, Enums.geViewColumnsLookupType.ltChildLookdownCommaHideDups, Enums.geViewColumnsLookupType.ltChildLookdownLFDisplayDups, Enums.geViewColumnsLookupType.ltChildLookdownLFHideDups, Enums.geViewColumnsLookupType.ltChildLookdownTotals
                                                'Check if table names are the same
                                                sTmpTableName = UCase$(Trim$(oTmpViewColumns.FieldName))
                                                If (InStr(sTmpTableName, ".") > 1) Then
                                                    sTmpTableName = Left$(sTmpTableName, InStr(sTmpTableName, ".") - 1)
                                                Else
                                                    sTmpTableName = ""
                                                End If
                                                If (sTmpTableName = sFieldTableName) Then
                                                    iLookupColumn = oTmpViewColumns.ColumnNum
                                                    Exit For
                                                End If
                                            Case Else
                                        End Select
                                    End If
                                    'End If
                                Next
                            End If
                            oTmpViewColumns = Nothing
                            If (iLookupColumn < 0) Then
                                oRelationships = ReportsModel.mcRelationships.Item(UCase$(Trim$(formEntity.FieldName)))
                                iLookupColumn = CreateViewColumnsForLookupIdCol(CurrentViewColumn, formEntity.LookupType, iLookupColumn2, Trim$(oRelationships.LowerTableFieldName), "Id For " & formEntity.FieldName, False, False, msSql, moTables, formEntity)
                                'iLookupColumn = CreateViewColumns(eType, -1, Trim$(oRelationships.LowerTableFieldName), "Id For " & cboFieldName.List(cboFieldName.ListIndex), False, False)
                                oRelationships = Nothing
                            End If
                        End If
                    Case Else
                End Select

                'bIsSecondLevel = False

                'If (iLookupColumn > 0) Then
                '    If ((moViewColumns.LookupIdCol >= 0) And (iLookupColumn < moViews.ViewColumns.Count)) Then
                '        oViewColumns = moViews.ViewColumns.Item(iLookupColumn + 1)
                '        If (Not (oViewColumns Is Nothing)) Then
                '            bIsSecondLevel = (oViewColumns.LookupType <> geViewColumnsLookupType_ltDirect)
                '        End If
                '        oViewColumns = Nothing
                '    End If
                'End If

                'If (mcLevel.Count > 0) Then
                '    iLevel = mcLevel.Item(cboFieldName.List(cboFieldName.ListIndex))
                'End If
            Catch ex As Exception
                Throw ex.InnerException
            End Try
        End Sub

        Private Function CheckForDirectRelationship(ByVal sUpperFieldName As String, ByVal ParentTable As IQueryable(Of RelationShip), currentViewColumn As List(Of ViewColumn), msSql As String, moTables As Table, FormEntity As ViewColumn) As Integer
            Try
                Dim iCol As Integer
                Dim iLookupColumn As Integer
                Dim sLowerFieldName As String
                Dim sUpperTableName As String
                Dim oRelationships As RelationShip
                Dim oViewColumns As ViewColumn
                Dim rsADO As ADODB.Recordset
                Dim sSQL As String
                Dim sADOCon As New ADODB.Connection
                sADOCon = DataServices.DBOpen(moTables, _iDatabas.All())
                iLookupColumn = -1
                sUpperTableName = DatabaseMap.RemoveFieldNameFromField(sUpperFieldName)

                For Each oRelationships In ParentTable
                    If (StrComp(oRelationships.UpperTableName, sUpperTableName, vbTextCompare) = 0) Then
                        sLowerFieldName = DatabaseMap.RemoveTableNameFromField(oRelationships.LowerTableFieldName)
                        oRelationships = Nothing

                        For Each oViewColumns In currentViewColumn
                            If (StrComp(sLowerFieldName, DatabaseMap.RemoveTableNameFromField(oViewColumns.FieldName), vbTextCompare) = 0) Then
                                iLookupColumn = oViewColumns.ColumnNum
                                Exit For
                            End If
                        Next

                        oViewColumns = Nothing

                        If (iLookupColumn < 0) Then
                            sSQL = DataServices.NormalizeString(msSql)
                            If ((InStr(1, sSQL, "SELECT DISTINCT TOP", vbTextCompare) <= 0&) And (InStr(1, sSQL, "SELECT DISTINCTROW TOP", vbTextCompare) <= 0&) And (InStr(1, sSQL, "SELECT TOP", vbTextCompare) <= 0&)) Then
                                If (InStr(1, sSQL, "SELECT DISTINCT ", vbTextCompare) > 0&) Then
                                    sSQL = Replace$(sSQL, "SELECT DISTINCT ", "SELECT DISTINCT TOP " & Format$(1) & " ", 1, 1, vbTextCompare)
                                ElseIf (InStr(1, sSQL, "SELECT DISTINCTROW ", vbTextCompare) > 0&) Then
                                    sSQL = Replace$(sSQL, "SELECT DISTINCTROW ", "SELECT DISTINCTROW TOP " & Format$(1) & " ", 1, 1, vbTextCompare)
                                Else
                                    sSQL = Replace$(sSQL, "SELECT ", "SELECT TOP " & Format$(1) & " ", 1, 1, vbTextCompare)
                                End If
                            End If

                            rsADO = DataServices.GetADORecordSet(sSQL, sADOCon)

                            For iCol = 0 To rsADO.Fields.Count - 1
                                If (StrComp(sLowerFieldName, rsADO.Fields(iCol).Name, vbTextCompare) = 0) Then
                                    iLookupColumn = CreateViewColumnsForLookupIdCol(currentViewColumn, Enums.geViewColumnsLookupType.ltDirect, 0, sLowerFieldName, sLowerFieldName, False, False, msSql, moTables, FormEntity)
                                    Exit For
                                End If
                            Next iCol

                            rsADO = Nothing
                        End If

                        Exit For
                    End If
                Next

                CheckForDirectRelationship = iLookupColumn
            Catch ex As Exception
                CheckForDirectRelationship = -1
                Throw ex.InnerException
            End Try

        End Function

        Private Function CreateViewColumnsForLookupIdCol(ByRef CurrentViewColumn As List(Of ViewColumn), eLookupType As Enums.geViewColumnsLookupType, ByVal iLookupCol As Integer, ByVal sFieldName As String, ByVal sFieldDesc As String, ByVal bDoDropDownFlag As Boolean, ByVal bVisible As Boolean, ByVal msSQL As String, moTables As Table, formEntity As ViewColumn) As Integer
            Try
                Dim sSQL As String
                Dim rsTestSQL As ADODB.Recordset
                Dim lError As Long
                Dim sErrorMessage As String = String.Empty
                Dim iWherePos As Integer
                Dim sTestFieldName As String
                Dim oViewColumns As New ViewColumn
                Dim iMinNumber = -1
                Dim columnNum = 0

                AddUpdateViewColumn(oViewColumns, formEntity)
                If (Not CurrentViewColumn Is Nothing) Then
                    If (CurrentViewColumn.Count <> 0) Then
                        iMinNumber = CurrentViewColumn.Min(Function(x) x.Id)
                        If (iMinNumber < 0) Then
                            iMinNumber = iMinNumber - 1
                        Else
                            iMinNumber = -1
                        End If
                        columnNum = CurrentViewColumn.Max(Function(x) x.ColumnNum)
                        columnNum = columnNum + 1

                    End If
                End If
                oViewColumns.Id = iMinNumber
                oViewColumns.ViewsId = formEntity.ViewsId
                oViewColumns.ColumnNum = columnNum

                If (bVisible) Then
                    oViewColumns.ColumnOrder = Enums.geViewColumnDisplayType.cvAlways 'Visible Flag
                Else
                    oViewColumns.ColumnOrder = Enums.geViewColumnDisplayType.cvNotVisible 'Visible Flag
                End If

                oViewColumns.FieldName = sFieldName
                oViewColumns.Heading = Left$(sFieldDesc, 30)
                oViewColumns.FreezeOrder = 0
                oViewColumns.SortOrder = 0
                oViewColumns.LookupType = eLookupType
                If ((oViewColumns.FilterField) Or (oViewColumns.SortableField)) Then
                    sSQL = msSQL
                    sSQL = Replace$(sSQL, vbCr, " ")
                    sSQL = Replace$(sSQL, vbLf, " ")

                    iWherePos = InStr(1, sSQL, "GROUP BY", vbTextCompare)
                    If (iWherePos = 0) Then
                        iWherePos = InStr(1, sSQL, "ORDER BY", vbTextCompare)
                    End If

                    If (iWherePos > 0) Then
                        sSQL = Left$(sSQL, (iWherePos - 2))
                    End If

                    iWherePos = InStr(1, sSQL, " WHERE ", vbTextCompare)

                    If iWherePos > 0 Then
                        sSQL = Left$(sSQL, (iWherePos + 6)) & " (" & Mid$(sSQL, (iWherePos + 7)) & ")"
                        sSQL = sSQL & " AND ("
                    Else
                        sSQL = sSQL & " WHERE ("
                    End If

                    If (StrComp(DatabaseMap.RemoveTableNameFromField(oViewColumns.FieldName), "SLFileRoomOrder", vbTextCompare) = 0) Then
                        sTestFieldName = "[" & Replace$(moTables.IdFieldName, ".", "].[") & "]"
                    Else
                        If (Trim$(oViewColumns.AlternateFieldName) = "") Then
                            sTestFieldName = "[" & Replace$(oViewColumns.FieldName, ".", "].[") & "]"
                        Else
                            sTestFieldName = oViewColumns.AlternateFieldName
                        End If
                    End If

                    sSQL = sSQL & sTestFieldName & " IS NULL)"
                    rsTestSQL = DataServices.GetADORecordset(sSQL, moTables, _iDatabas.All(), , , , 1, , True, lError, sErrorMessage)
                    ' rsTestSQL = theApp.Data.GetADORecordset(sSQL, moTables.TableName, , , , 1, , True, lError, sErrorMessage)
                    If (lError) Then
                        oViewColumns.FilterField = False
                        oViewColumns.SortableField = False
                    ElseIf (Not (rsTestSQL Is Nothing)) Then
                        rsTestSQL.Close()
                        rsTestSQL = Nothing
                    End If
                End If
                If ((bDoDropDownFlag) Or (UCase$(moTables.RetentionFieldName) = UCase$(oViewColumns.FieldName))) Then
                    oViewColumns.DropDownFlag = -1
                    oViewColumns.EditAllowed = True
                Else
                    oViewColumns.DropDownFlag = 0
                End If
                oViewColumns.MaskPromptChar = "_"
                oViewColumns.MaxPrintLines = 1
                oViewColumns.LookupIdCol = iLookupCol
                oViewColumns.ColumnStyle = 0
                CurrentViewColumn.Add(oViewColumns)
                CreateViewColumnsForLookupIdCol = oViewColumns.ColumnNum
            Catch ex As Exception
                CreateViewColumnsForLookupIdCol = 0
                Throw ex.InnerException
            End Try

        End Function

#End Region

#Region "Report Style"

        Public Function LoadReportStyle() As PartialViewResult
            Return PartialView("_ReportStylesPartial")
        End Function

        Public Function GetReportStyles(sord As String, page As Integer, rows As Integer) As ActionResult
            Dim reportEntity = _iReportStyle.All.OrderBy(Function(m) m.ReportStylesId)
            If reportEntity Is Nothing Then
                Return Json(JsonRequestBehavior.AllowGet)
            Else
                Dim jsonData = reportEntity.GetJsonListForGrid(sord, page, rows, "Id")
                Return Json(jsonData, JsonRequestBehavior.AllowGet)
            End If
        End Function

        Public Function LoadAddReportStyle() As PartialViewResult
            Return PartialView("_AddReportStylePartial")
        End Function

        Public Function GetReportStylesData(reportStyleVar As String, Optional ByVal selectedRowsVar As Integer = 0, Optional ByVal cloneFlag As Boolean = False) As ActionResult
            Dim reportStyleEntity
            Dim allReportStyle = Nothing
            If (selectedRowsVar <> 0) Then
                reportStyleEntity = _iReportStyle.All.Where(Function(m) m.Id.Equals(reportStyleVar.Trim()) And m.ReportStylesId.Equals(selectedRowsVar)).FirstOrDefault
            Else
                reportStyleEntity = _iReportStyle.All.Where(Function(m) m.Id.Equals(reportStyleVar.Trim())).FirstOrDefault
            End If

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(reportStyleEntity, Newtonsoft.Json.Formatting.Indented, Setting)
            If (cloneFlag) Then
                allReportStyle = _iReportStyle.All.OrderBy(Function(m) m.Id)
                Dim bFound = False
                Dim iNextReport As Integer = 0
                'Modified by Hemin for Bug fix
                'Dim sReportStyleName As String = Languages.Translation("msgAdminCtrlNewReportStyle")
                Dim sReportStyleName As String = "New Report Style"
                Do
                    bFound = False
                    If (iNextReport = 0) Then
                        'Modified by Hemin for Bug fix
                        ' sReportStyleName = Languages.Translation("msgAdminCtrlNewReportStyle")
                        sReportStyleName = "New Report Style"
                    Else
                        'Modified by Hemin for Bug fix
                        'sReportStyleName = String.Format(Languages.Translation("msgAdminCtrlNewReportStyle1"), iNextReport)
                        sReportStyleName = "New Report Style " & iNextReport
                    End If

                    For Each oReportStyle As ReportStyle In allReportStyle
                        If (StrComp(oReportStyle.Id.Trim().ToLower(), sReportStyleName.Trim().ToLower(), vbTextCompare) = 0) Then
                            iNextReport = iNextReport + 1
                            sReportStyleName = oReportStyle.Id
                            bFound = True
                            Exit For
                        End If
                    Next oReportStyle
                    If (Not bFound) Then
                        Exit Do
                    End If
                Loop

                Dim sReportStyleNameJSON = JsonConvert.SerializeObject(sReportStyleName, Newtonsoft.Json.Formatting.Indented, Setting)
                Return Json(New With {
                            Key .sReportStyleNameJSON = sReportStyleNameJSON,
                            Key .jsonObject = jsonObject
                            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Else
                Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End If
        End Function

        Public Function RemoveReportStyle(selectedRowsVar As Integer, reportStyleVar As String) As ActionResult
            Try
                Dim reportStyleEntity = _iReportStyle.All.Where(Function(m) m.Id.Trim.ToLower.Equals(reportStyleVar.Trim.ToLower) And m.ReportStylesId = selectedRowsVar).FirstOrDefault
                If (Not (reportStyleEntity Is Nothing)) Then
                    _iReportStyle.Delete(reportStyleEntity)
                End If
                Keys.ErrorMessage = Keys.DeleteSuccessMessage
                Keys.ErrorType = "s"
            Catch ex As Exception
                Keys.ErrorMessage = Keys.ErrorMessageJS
                Keys.ErrorType = "e"
            End Try
            Return Json(New With {
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function SetReportStylesData(formEntity As ReportStyle, pFixedLines As Boolean, pAltRowShading As Boolean, pReportCentered As Boolean) As ActionResult
            Try
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                formEntity.FixedLines = pFixedLines
                formEntity.AltRowShading = pAltRowShading
                formEntity.ReportCentered = pReportCentered
                If (formEntity.ReportStylesId > 0) Then
                    Dim reportStyleEntity = _iReportStyle.All.Where(Function(m) m.ReportStylesId = formEntity.ReportStylesId).FirstOrDefault
                    '  Dim flagBool = reportStyleEntity.ReportStylesName.Trim.ToLower.Equals(formEntity.ReportStylesName.Trim.ToLower)
                    If (Not String.IsNullOrEmpty(reportStyleEntity.Id)) Then
                        If (Not (reportStyleEntity.Id.Trim.ToLower.Equals(formEntity.Id.Trim.ToLower))) Then
                            Dim reportStyleAll = _iReportStyle.All.OrderBy(Function(m) m.ReportStylesId)
                            For Each reportObj As ReportStyle In reportStyleAll
                                If (reportObj.Id.Trim.ToLower.Equals(formEntity.Id.Trim.ToLower) And reportObj.ReportStylesId <> formEntity.ReportStylesId) Then
                                    Keys.ErrorType = "w"
                                    Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlRptStyleExists"), reportObj.Id)
                                    Return Json(New With {
                                        Key .errortype = Keys.ErrorType,
                                        Key .message = Keys.ErrorMessage
                                        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
                                End If
                            Next
                        End If
                    End If

                    reportStyleEntity = AddReportStyle(reportStyleEntity, formEntity)
                    _iReportStyle.Update(reportStyleEntity)
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlReUpdatedSuccessfully")
                Else
                    _iReportStyle.Add(formEntity)
                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Keys.SaveSuccessMessage
                End If
                Dim reportBack = _iReportStyle.All.Where(Function(m) m.Id.Trim.ToLower.Equals(formEntity.Id.Trim.ToLower)).FirstOrDefault
                Dim reportBackJSON = JsonConvert.SerializeObject(reportBack, Newtonsoft.Json.Formatting.Indented, Setting)

                Return Json(New With {
                            Key .reportBackJSON = reportBackJSON,
                        Key .errortype = Keys.ErrorType,
                        Key .message = Keys.ErrorMessage
                        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS

                Return Json(New With {
                        Key .errortype = Keys.ErrorType,
                        Key .message = Keys.ErrorMessage
                        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try
        End Function

        Public Function AddReportStyle(reportStyleEntity As ReportStyle, formEntity As ReportStyle) As ReportStyle
            reportStyleEntity.ReportStylesId = formEntity.ReportStylesId
            reportStyleEntity.Id = formEntity.Id
            reportStyleEntity.Description = formEntity.Description
            reportStyleEntity.Heading1Left = formEntity.Heading1Left
            reportStyleEntity.Heading1Center = formEntity.Heading1Center
            reportStyleEntity.Heading1Right = formEntity.Heading1Right
            reportStyleEntity.Heading2Center = formEntity.Heading2Center
            reportStyleEntity.FooterLeft = formEntity.FooterLeft
            reportStyleEntity.FooterCenter = formEntity.FooterCenter
            reportStyleEntity.FooterRight = formEntity.FooterRight
            reportStyleEntity.Orientation = formEntity.Orientation
            reportStyleEntity.HeaderSize = formEntity.HeaderSize
            reportStyleEntity.ShadowSize = formEntity.ShadowSize
            reportStyleEntity.MinColumnWidth = formEntity.MinColumnWidth
            reportStyleEntity.BlankLineSpacing = formEntity.BlankLineSpacing
            reportStyleEntity.ColumnSpacing = formEntity.ColumnSpacing
            reportStyleEntity.BoxWidth = formEntity.BoxWidth
            reportStyleEntity.MaxLines = formEntity.MaxLines
            reportStyleEntity.FixedLines = formEntity.FixedLines
            reportStyleEntity.AltRowShading = formEntity.AltRowShading
            reportStyleEntity.ReportCentered = formEntity.ReportCentered
            reportStyleEntity.TextForeColor = formEntity.TextForeColor
            reportStyleEntity.LineColor = formEntity.LineColor
            reportStyleEntity.ShadeBoxColor = formEntity.ShadeBoxColor
            reportStyleEntity.ShadowColor = formEntity.ShadowColor
            reportStyleEntity.ShadedLineColor = formEntity.ShadedLineColor
            reportStyleEntity.LeftMargin = formEntity.LeftMargin
            reportStyleEntity.RightMargin = formEntity.RightMargin
            reportStyleEntity.TopMargin = formEntity.TopMargin
            reportStyleEntity.BottomMargin = formEntity.BottomMargin
            reportStyleEntity.HeadingL1FontBold = formEntity.HeadingL1FontBold
            reportStyleEntity.HeadingL1FontItalic = formEntity.HeadingL1FontItalic
            reportStyleEntity.HeadingL1FontUnderlined = formEntity.HeadingL1FontUnderlined
            reportStyleEntity.HeadingL1FontSize = formEntity.HeadingL1FontSize
            reportStyleEntity.HeadingL1FontName = formEntity.HeadingL1FontName

            reportStyleEntity.HeadingL2FontBold = formEntity.HeadingL2FontBold
            reportStyleEntity.HeadingL2FontItalic = formEntity.HeadingL2FontItalic
            reportStyleEntity.HeadingL2FontUnderlined = formEntity.HeadingL2FontUnderlined
            reportStyleEntity.HeadingL2FontSize = formEntity.HeadingL2FontSize
            reportStyleEntity.HeadingL2FontName = formEntity.HeadingL2FontName


            reportStyleEntity.SubHeadingFontBold = formEntity.SubHeadingFontBold
            reportStyleEntity.SubHeadingFontItalic = formEntity.SubHeadingFontItalic
            reportStyleEntity.SubHeadingFontUnderlined = formEntity.SubHeadingFontUnderlined
            reportStyleEntity.SubHeadingFontName = formEntity.SubHeadingFontName
            reportStyleEntity.SubHeadingFontSize = formEntity.SubHeadingFontSize

            reportStyleEntity.ColumnHeadingFontBold = formEntity.ColumnHeadingFontBold
            reportStyleEntity.ColumnHeadingFontItalic = formEntity.ColumnHeadingFontItalic
            reportStyleEntity.ColumnHeadingFontUnderlined = formEntity.ColumnHeadingFontUnderlined
            reportStyleEntity.ColumnHeadingFontName = formEntity.ColumnHeadingFontName
            reportStyleEntity.ColumnHeadingFontSize = formEntity.ColumnHeadingFontSize

            reportStyleEntity.ColumnFontBold = formEntity.ColumnFontBold
            reportStyleEntity.ColumnFontItalic = formEntity.ColumnFontItalic
            reportStyleEntity.ColumnFontUnderlined = formEntity.ColumnFontUnderlined
            reportStyleEntity.ColumnFontName = formEntity.ColumnFontName
            reportStyleEntity.ColumnFontSize = formEntity.ColumnFontSize

            reportStyleEntity.FooterFontBold = formEntity.FooterFontBold
            reportStyleEntity.FooterFontItalic = formEntity.FooterFontItalic
            reportStyleEntity.FooterFontUnderlined = formEntity.FooterFontUnderlined
            reportStyleEntity.FooterFontName = formEntity.FooterFontName
            reportStyleEntity.FooterFontSize = formEntity.FooterFontSize

            Return reportStyleEntity
        End Function

        Public Function LoadFontModel() As JsonResult
            Dim fontJSON As String = ""
            Dim fontStyleJSON As String = ""
            Dim fontSize() As String = {"8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72"}
            Dim fontSizeJson As String = ""

            'Dim fontBold As String = ""
            'Dim fontItalic As String = ""
            'Dim fontUndeline As String = ""

            Try
                Dim fonts As InstalledFontCollection = New InstalledFontCollection()
                Dim FontList As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
                Dim FontStyleList As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
                Dim FontSizeList As List(Of KeyValuePair(Of String, String)) = New List(Of KeyValuePair(Of String, String))
                For Each font As FontFamily In fonts.Families
                    FontList.Add(New KeyValuePair(Of String, String)(font.Name, font.Name))

                Next font

                Dim styles() As FontStyle
                Dim style As FontStyle
                styles = System.Enum.GetValues(GetType(FontStyle))
                For Each style In styles
                    FontStyleList.Add(New KeyValuePair(Of String, String)(style.ToString(), style.ToString()))
                    'combobox1.items.add(style.ToString)
                Next style
                For Each fontSizeElement In fontSize
                    FontSizeList.Add(New KeyValuePair(Of String, String)(fontSizeElement, fontSizeElement))
                Next

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                fontJSON = JsonConvert.SerializeObject(FontList, Newtonsoft.Json.Formatting.Indented, Setting)
                fontStyleJSON = JsonConvert.SerializeObject(FontStyleList, Newtonsoft.Json.Formatting.Indented, Setting)
                fontSizeJson = JsonConvert.SerializeObject(FontSizeList, Newtonsoft.Json.Formatting.Indented, Setting)

            Catch ex As Exception

            End Try
            Return Json(New With {
                      Key .fontJSON = fontJSON,
                      Key .fontStyleJSON = fontStyleJSON,
                      Key .fontSizeJson = fontSizeJson
                      }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
#End Region

#Region "Security"
        'Load the view for Security
        Public Function LoadSecurityTab() As PartialViewResult
            Return PartialView("_SecurityTabPartial")
        End Function

        'Check for module level access of Admin Manager.
        Public Function CheckModuleLevelAccess() As ActionResult
            Dim mdlAccessDictionary As New Dictionary(Of String, Boolean)
            Dim bAddTabApplication As Boolean = False
            Dim bAddTabDatabase As Boolean = False
            Dim bAddTabDirectories As Boolean = False
            Dim bAddTabData As Boolean = False
            Dim bAddTabTables As Boolean = False
            Dim bAddTabViews As Boolean = False
            Dim bAddTabReports As Boolean = False
            Dim bAddTabSecuirty As Boolean = False

            Dim mbSecuriyGroup As Boolean = False
            Dim mbMgrGroup As Boolean = False
            Dim bAtLeastOneTablePermission As Boolean = False
            Dim bAtLeastOneViewPermission As Boolean = False
            Dim bAdminPermission As Boolean = False
            Dim iCntRpts As Integer = 0

            Try
                Dim BaseWebPage = New BaseWebPage()
                Dim lTableEntities = _iTable.All()
                Dim lViewEntities = _iView.All()

                mbSecuriyGroup = BaseWebPage.Passport.CheckPermission(Common.SECURE_SECURITY, Enums.SecureObjects.Application, Enums.PassportPermissions.Access) Or BaseWebPage.Passport.CheckPermission(Common.SECURE_SECURITY_USER, Enums.SecureObjects.Application, Enums.PassportPermissions.Access)
                mbMgrGroup = BaseWebPage.Passport.CheckAdminPermission(Permissions.Permission.Access)

                If (mbMgrGroup) Then
                    bAddTabApplication = True
                    bAddTabDatabase = True
                    bAddTabData = True
                End If
                bAddTabDirectories = BaseWebPage.Passport.CheckPermission(Common.SECURE_STORAGE, Enums.SecureObjects.Application, Enums.PassportPermissions.Access)

                iCntRpts = CollectionsClass.CheckReportsPermission(_iTable.All(), _iView.All(), BaseWebPage)
                bAddTabReports = mbMgrGroup Or iCntRpts > 0 Or BaseWebPage.Passport.CheckPermission(Common.SECURE_REPORT_STYLES, Enums.SecureObjects.Application, Enums.PassportPermissions.Access)

                If mbSecuriyGroup Then
                    bAddTabSecuirty = True
                End If

                bAtLeastOneTablePermission = CollectionsClass.CheckTablesPermission(lTableEntities, mbMgrGroup, BaseWebPage)
                bAtLeastOneViewPermission = CollectionsClass.CheckViewsPermission(lViewEntities, mbMgrGroup, BaseWebPage)
                bAdminPermission = BaseWebPage.Passport.CheckAdminPermission(Permissions.Permission.Access)

                bAddTabTables = mbMgrGroup Or bAtLeastOneTablePermission
                bAddTabViews = mbMgrGroup Or bAtLeastOneViewPermission

                mdlAccessDictionary.Add("Application", bAddTabApplication)
                mdlAccessDictionary.Add("Database", bAddTabDatabase)
                mdlAccessDictionary.Add("Directories", bAddTabDirectories)
                mdlAccessDictionary.Add("Data", bAddTabData)
                mdlAccessDictionary.Add("Tables", bAddTabTables)
                mdlAccessDictionary.Add("Views", bAddTabViews)
                mdlAccessDictionary.Add("Reports", bAddTabReports)
                mdlAccessDictionary.Add("Security", bAddTabSecuirty)
                mdlAccessDictionary.Add("AdminPermission", bAdminPermission)
            Catch ex As Exception

            End Try

            Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage,
                            Key .mdlAccessDictionary = mdlAccessDictionary
                        }, JsonRequestBehavior.AllowGet)
        End Function

        Public Function ValidateApplicationLink(pModuleNameStr As String) As ActionResult
            Dim BaseWebPage As BaseWebPage = New BaseWebPage()
            Dim oTables = _iTable.All()
            Dim bHaveRights As Boolean = False

            If (BaseWebPage.Passport.CheckPermission(pModuleNameStr, Smead.Security.SecureObject.SecureObjectType.Application, Permissions.Permission.Access)) Then
                If pModuleNameStr = "Import Setup" Then
                    For Each oTable In oTables
                        If ((Not (CollectionsClass.IsEngineTable(oTable.TableName))) Or (CollectionsClass.IsEngineTableOkayToImport(oTable.TableName))) Then
                            If (BaseWebPage.Passport.CheckPermission(oTable.TableName, Enums.SecureObjects.Table, Enums.PassportPermissions.Import)) Then
                                bHaveRights = True
                                Exit For
                            End If
                        End If
                    Next

                    If (Not bHaveRights) Then
                        'If (BaseWebPage.Passport.CheckPermission(Common.SECURE_TRACKING, Enums.SecureObjects.Application, Enums.PassportPermissions.Access) Or BaseWebPage.Passport.CheckAdminPermission(Enums.PassportPermissions.Access)) Then
                        If (BaseWebPage.Passport.CheckPermission(Common.SECURE_TRACKING, Enums.SecureObjects.Application, Enums.PassportPermissions.Access)) Then
                            bHaveRights = True
                        End If
                    End If

                    If bHaveRights Then
                        Return Json(1)
                    Else
                        Return Json(2) ' Here 2 indicates permission issues for importing table.
                    End If
                Else
                    Return Json(1)
                End If
            Else
                Return Json(0)
            End If


        End Function
        ''Check for Tables if any table has permission of Configure for a user.
        'Public Function CheckTablesPermission(mbMgrGroup As Boolean, BaseWebPage As BaseWebPage) As Boolean
        '    Dim bAtLeastOneTablePermission As Boolean = False
        '    Try
        '        If IsNothing(Session("TablesPermission")) Then
        '            If Not mbMgrGroup Then
        '                For Each oTable In _iTable.All()
        '                    If Not CollectionsClass.IsEngineTable(oTable.TableName) Then
        '                        If (BaseWebPage.Passport.CheckPermission(oTable.TableName, Enums.SecureObjects.Table, Enums.PassportPermissions.Configure)) Then
        '                            bAtLeastOneTablePermission = True
        '                            Exit For
        '                        End If
        '                    End If
        '                Next
        '            End If
        '            Session("TablesPermission") = bAtLeastOneTablePermission
        '        Else
        '            bAtLeastOneTablePermission = CBool(Session("TablesPermission"))
        '        End If
        '    Catch ex As Exception

        '    End Try

        '    Return bAtLeastOneTablePermission
        'End Function
        ''Check for Views if any view has permission of Configure for a user.
        'Public Function CheckViewsPermission(mbMgrGroup As Boolean, BaseWebPage As BaseWebPage) As Boolean
        '    Dim bAtLeastOneViewPermission As Boolean = False
        '    Try
        '        If IsNothing(Session("ViewPermission")) Then
        '            If Not mbMgrGroup Then
        '                For Each oView In _iView.All()
        '                    If (BaseWebPage.Passport.CheckPermission(oView.ViewName, Enums.SecureObjects.View, Enums.PassportPermissions.Configure)) Then
        '                        bAtLeastOneViewPermission = True
        '                        Exit For
        '                    End If
        '                Next
        '            End If
        '            Session("ViewPermission") = bAtLeastOneViewPermission
        '        Else
        '            bAtLeastOneViewPermission = CBool(Session("ViewPermission"))
        '        End If
        '    Catch ex As Exception

        '    End Try

        '    Return bAtLeastOneViewPermission
        'End Function
        ''Check for Reports if any Report has permission access for a user in group
        'Public Function CheckReportsPermission(BaseWebPage As BaseWebPage) As Integer
        '    Dim iCntRpts As Integer = 0

        '    If IsNothing(Session("iCntRpts")) Then
        '        For Each oTable In _iTable.All()
        '            If (Not CollectionsClass.IsEngineTable(oTable.TableName)) Then
        '                If (BaseWebPage.Passport.CheckPermission(oTable.TableName, Enums.SecureObjects.Table, Enums.PassportPermissions.View)) Then
        '                    Dim lTableViewList = _iView.All().Where(Function(x) x.TableName.Trim().ToLower() = oTable.TableName.Trim().ToLower())
        '                    For Each oView In lTableViewList
        '                        If (oView.Printable) Then
        '                            If (BaseWebPage.Passport.CheckPermission(oView.ViewName, Enums.SecureObjects.Reports, Enums.PassportPermissions.Configure)) Then
        '                                If (BaseWebPage.Passport.CheckPermission(oView.ViewName, Enums.SecureObjects.Reports, Enums.PassportPermissions.View)) Then
        '                                    If NotSubReport(oView, oTable.TableName) Then
        '                                        iCntRpts = iCntRpts + 1
        '                                        Session("iCntRpts") = iCntRpts
        '                                        Exit For
        '                                    End If
        '                                End If
        '                            End If
        '                        End If
        '                    Next
        '                    If iCntRpts > 0 Then Exit For
        '                End If
        '            End If
        '        Next
        '    End If
        '    Return Session("iCntRpts")
        'End Function
#Region "Users"
        'Load the view of Security->Users
        Public Function LoadSecurityUsersTab() As PartialViewResult
            Return PartialView("_SecurityUsersPartial")
        End Function
        'Load the view for users proile.
        Public Function LoadSecurityUserProfileView() As PartialViewResult
            Return PartialView("_AddSecurityUserProfilePartial")
        End Function
        'Load user security grid.
        Public Function LoadSecurityUserGridData(sidx As String, sord As String, page As Integer, rows As Integer, pId As String) As JsonResult

            Dim pSecureUserEntities = From t In _iSecureUser.All()
                                      Where t.UserID <> -1 And t.AccountType.ToLower = "s"
                                      Select t.UserID, t.UserName, t.Email, t.FullName, t.AccountDisabled, t.MustChangePassword

            Dim jsonData = pSecureUserEntities.GetJsonListForGrid(sord, page, rows, "UserName")

            Return Json(jsonData, JsonRequestBehavior.AllowGet)
        End Function
        'Set the user details.
        Public Function SetUserDetails(pUserEntity As SecureUser) As ActionResult
            Try
                Dim pNextUserID As Integer = 0
                If pUserEntity.UserID > 0 Then
                    If _iSecureUser.All().Any(Function(x) x.UserName.Trim().ToLower() = pUserEntity.UserName.Trim().ToLower() AndAlso x.UserID <> pUserEntity.UserID) = False Then
                        Dim pUserProfileEntity = _iSecureUser.All().Where(Function(x) x.UserID = pUserEntity.UserID).FirstOrDefault()
                        pUserProfileEntity.UserName = IIf((pUserEntity.UserName Is Nothing), "", pUserEntity.UserName)
                        pUserProfileEntity.FullName = IIf((pUserEntity.FullName Is Nothing), "", pUserEntity.FullName)
                        pUserProfileEntity.Email = IIf((pUserEntity.Email Is Nothing), "", pUserEntity.Email)
                        pUserProfileEntity.Misc1 = pUserEntity.Misc1
                        pUserProfileEntity.Misc2 = pUserEntity.Misc2
                        pUserProfileEntity.AccountDisabled = pUserEntity.AccountDisabled

                        _iSecureUser.Update(pUserProfileEntity)

                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminEditUsers") ' Fixed FUS-6054
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlTheUserName"), pUserEntity.UserName)
                        Exit Try
                    End If
                Else
                    If _iSecureUser.All().Any(Function(x) x.UserName.Trim().ToLower() = pUserEntity.UserName.Trim().ToLower()) = False Then

                        'pNextUserID = _iSecureUser.All().ToList().LastOrDefault().UserID + 1
                        'pUserEntity.PasswordHash = Smead.Security.Encrypt.HashPassword(pNextUserID, "password$")
                        pUserEntity.PasswordHash = ""
                        pUserEntity.AccountType = "S"
                        pUserEntity.PasswordUpdate = DateTime.Now()
                        pUserEntity.MustChangePassword = True   'Modified by Hemin on 11/18/2016
                        pUserEntity.FullName = IIf((pUserEntity.FullName Is Nothing), "", pUserEntity.FullName)
                        pUserEntity.Email = IIf((pUserEntity.Email Is Nothing), "", pUserEntity.Email)
                        pUserEntity.AccountDisabled = False
                        pUserEntity.DisplayName = pUserEntity.UserName

                        _iSecureUser.Add(pUserEntity)
                        pNextUserID = pUserEntity.UserID
                        pUserEntity.PasswordHash = Smead.Security.Encrypt.HashPassword(pNextUserID, "password$")
                        _iSecureUser.Update(pUserEntity)

                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminAddUsers") ' Fixed FUS-6057
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlTheUserName"), pUserEntity.UserName)
                        Exit Try
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

        'Get the user details for EDIT purpose.
        Public Function EditUserProfile(pRowSelected As Array) As ActionResult
            If pRowSelected Is Nothing Then
                Return Json(New With {Key .success = False})
            End If
            If pRowSelected.Length = 0 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pUserId = Convert.ToInt32(pRowSelected.GetValue(0))
            If pUserId = 0 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pUserProfileEntity = _iSecureUser.All().Where(Function(x) x.UserID = pUserId).FirstOrDefault()

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pUserProfileEntity, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'DELETE user.
        Public Function DeleteUserProfile(pRowSelected As Array) As ActionResult

            Try
                If pRowSelected Is Nothing Then
                    Return Json(New With {Key .success = False})
                End If
                If pRowSelected.Length = 0 Then
                    Return Json(New With {Key .success = False})
                End If

                Dim pUserId = Convert.ToInt32(pRowSelected.GetValue(0))
                If pUserId = 0 Then
                    Return Json(New With {Key .success = False})
                End If

                _iSecureUser.BeginTransaction()
                _iSecureUserGroup.BeginTransaction()
                Dim pUserProfileEntity = _iSecureUser.All().Where(Function(x) x.UserID = pUserId).FirstOrDefault()
                Dim pUserGroupEntities = _iSecureUserGroup.All().Where(Function(x) x.UserID = pUserId)

                _iSecureUser.Delete(pUserProfileEntity)
                _iSecureUser.CommitTransaction()
                _iSecureUserGroup.DeleteRange(pUserGroupEntities)


                _iSecureUserGroup.CommitTransaction()
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminDeleteUsers") 'Fixed FUS-6058

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'SET USER PASSWORD
        Public Function SetUserPassword(pUserId As Integer, pUserPassword As String, pCheckedState As Boolean) As ActionResult
            Dim pUserEntity = _iSecureUser.All().Where(Function(x) x.UserID = pUserId).FirstOrDefault()
            Try
                pUserEntity.PasswordHash = Smead.Security.Encrypt.HashPassword(pUserId, pUserPassword)
                pUserEntity.MustChangePassword = pCheckedState
                _iSecureUser.Update(pUserEntity)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlPwdChangedSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
        'Assign Groups to user.
        Public Function SetGroupsAgainstUser(pUserID As Integer, pGroupList As Array) As ActionResult
            Dim pSecureUserGroup As SecureUserGroup = New SecureUserGroup()
            Try
                _iSecureUserGroup.BeginTransaction()
                Dim pUserGrpEntities = _iSecureUserGroup.All().Where(Function(x) x.UserID = pUserID)
                _iSecureUserGroup.DeleteRange(pUserGrpEntities)
                If Not pGroupList(0).ToString().Equals("None") Then
                    If pGroupList.Length > 0 Then
                        For Each gid In pGroupList
                            pSecureUserGroup.UserID = pUserID
                            pSecureUserGroup.GroupID = gid
                            _iSecureUserGroup.Add(pSecureUserGroup)
                        Next
                    End If
                End If
                _iSecureUserGroup.CommitTransaction()

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminSecurityGroupsToUser")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
                _iSecureUserGroup.RollBackTransaction()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'GET the list of assigned groups for User.
        Public Function GetAssignedGroupsForUser(pUserID As Integer) As ActionResult
            Dim lstGroups = New List(Of String)
            Dim jsonObject = Nothing
            Dim pSecureGroupEntities = Nothing
            Dim pSecureGroupUserEntities As List(Of SecureUserGroup)

            Try
                pSecureGroupUserEntities = _iSecureUserGroup.All().Where(Function(x) x.UserID = pUserID).ToList()

                For Each item As SecureUserGroup In pSecureGroupUserEntities
                    lstGroups.Add(item.GroupID)
                Next

                pSecureGroupEntities = From t In _iSecureGroup.All()
                                       Where lstGroups.Contains(t.GroupID)
                                       Order By t.GroupName Ascending

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                jsonObject = JsonConvert.SerializeObject(pSecureGroupEntities, Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlDataRetrieved")

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .jsonObject = jsonObject
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
        'GET all the list of groups from system.
        Public Function GetAllGroupsList(pUserID As Integer) As ActionResult
            Dim lstAllGroups As List(Of SecureGroup)
            Dim grpJsonObject = Nothing

            Try
                lstAllGroups = _iSecureGroup.All().Where(Function(x) x.GroupID <> -1).OrderBy(Function(x) x.GroupName).ToList()

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                grpJsonObject = JsonConvert.SerializeObject(lstAllGroups, Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlDataRetrieved")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .grpJsonObject = grpJsonObject
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
        'Unlock the user account.
        Public Function UnlockUserAccount(pOperatorId As String) As ActionResult
            Try
                Dim BaseWebPage As BaseWebPage = New BaseWebPage()
                BaseWebPage.Passport.LogFailedLogs("Unlock", pOperatorId)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = String.Format(Languages.Translation("msgAdminCtrlUACUnlockedSuccessfully"), pOperatorId)
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
#End Region
#Region "Groups"
        'Load the view of Security->Groups
        Public Function LoadSecurityGroupsTab() As PartialViewResult
            Return PartialView("_SecurityGroupsPartial")
        End Function
        'Load the view for groups proile.
        Public Function LoadSecurityGroupProfileView() As PartialViewResult
            Return PartialView("_AddSecurityGroupProfilePartial")
        End Function
        'Load group security grid.
        Public Function LoadSecurityGroupGridData(sidx As String, sord As String, page As Integer, rows As Integer, pId As String) As JsonResult

            'Dim pSecureGroupEntities = From t In _iSecureGroup.All()
            '                           Select t.GroupID, t.GroupName, t.Description, t.AutoLockSeconds, t.AutoLogOffSeconds
            'Made change to have duration in minutes from DB.
            Dim pSecureGroupEntities = From t In _iSecureGroup.All()
                                       Select New With {.GroupID = t.GroupID, .GroupName = t.GroupName, .Description = t.Description, .AutoLockSeconds = (t.AutoLockSeconds / 60), .AutoLogOffSeconds = (t.AutoLogOffSeconds / 60)}

            Dim jsonData = pSecureGroupEntities.GetJsonListForGrid(sord, page, rows, "GroupName")

            Return Json(jsonData, JsonRequestBehavior.AllowGet)
        End Function
        'Set Group profile
        Public Function SetGroupDetails(pGroupEntity As SecureGroup) As ActionResult
            Try
                If pGroupEntity.GroupID > -2 Then
                    Dim pGroupProfileEntity = _iSecureGroup.All().Where(Function(x) x.GroupID = pGroupEntity.GroupID).FirstOrDefault()

                    pGroupProfileEntity.GroupName = pGroupEntity.GroupName
                    pGroupProfileEntity.Description = IIf((pGroupEntity.Description Is Nothing), "", pGroupEntity.Description)
                    pGroupProfileEntity.AutoLockSeconds = IIf((pGroupEntity.AutoLockSeconds), pGroupEntity.AutoLockSeconds * 60, 0)
                    pGroupProfileEntity.AutoLogOffSeconds = IIf((pGroupEntity.AutoLogOffSeconds), pGroupEntity.AutoLogOffSeconds * 60, 0)

                    _iSecureGroup.Update(pGroupProfileEntity)

                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminEditGroups") 'Fixed FUS-6055
                Else
                    If _iSecureGroup.All().Any(Function(x) x.GroupName.Trim().ToLower() = pGroupEntity.GroupName.Trim().ToLower()) = False Then
                        pGroupEntity.GroupName = IIf((pGroupEntity.GroupName Is Nothing), "", pGroupEntity.GroupName)
                        pGroupEntity.Description = IIf((pGroupEntity.Description Is Nothing), "", pGroupEntity.Description)
                        pGroupEntity.AutoLockSeconds = IIf((pGroupEntity.AutoLockSeconds), pGroupEntity.AutoLockSeconds * 60, 0)
                        pGroupEntity.AutoLogOffSeconds = IIf((pGroupEntity.AutoLogOffSeconds), pGroupEntity.AutoLogOffSeconds * 60, 0)
                        pGroupEntity.GroupType = "USERGROUP"

                        _iSecureGroup.Add(pGroupEntity)

                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminAddGroups") 'Fixed FUS-6056
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Languages.Translation("msgAdminCtrlGnAlreadyDefined")
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

        Public Function EditGroupProfile(pRowSelected As Array) As ActionResult

            If pRowSelected Is Nothing Then
                Return Json(New With {Key .success = False})
            End If
            If pRowSelected.Length = 0 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pGroupId = Convert.ToInt32(pRowSelected.GetValue(0))
            If pGroupId = -2 Then
                Return Json(New With {Key .success = False})
            End If

            Dim pGroupProfileEntity = _iSecureGroup.All().Where(Function(x) x.GroupID = pGroupId).FirstOrDefault()

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pGroupProfileEntity, Newtonsoft.Json.Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'DELETE Group.
        Public Function DeleteGroupProfile(pRowSelected As Array) As ActionResult

            Try
                If pRowSelected Is Nothing Then
                    Return Json(New With {Key .success = False})
                End If
                If pRowSelected.Length = 0 Then
                    Return Json(New With {Key .success = False})
                End If

                Dim pGroupId = Convert.ToInt32(pRowSelected.GetValue(0))
                If pGroupId = -2 Then
                    Return Json(New With {Key .success = False})
                End If

                _iSecureGroup.BeginTransaction()
                _iSecureUserGroup.BeginTransaction()
                Dim pGroupProfileEntity = _iSecureGroup.All().Where(Function(x) x.GroupID = pGroupId).FirstOrDefault()
                Dim pUserGroupEntities = _iSecureUserGroup.All().Where(Function(x) x.GroupID = pGroupId)

                _iSecureGroup.Delete(pGroupProfileEntity)
                _iSecureGroup.CommitTransaction()
                _iSecureUserGroup.DeleteRange(pUserGroupEntities)

                _iSecureUserGroup.CommitTransaction()
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminDeleteGroups") 'Fixed FUS-6059

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try
            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'GET the list of assigned users for Group.
        Public Function GetAssignedUsersForGroup(pGroupId As Integer) As ActionResult
            Dim lstUsers = New List(Of String)
            Dim jsonObject = Nothing
            Dim pSecureUserEntities = Nothing
            Dim pSecureGroupUserEntities As List(Of SecureUserGroup)

            Try
                pSecureGroupUserEntities = _iSecureUserGroup.All().Where(Function(x) x.GroupID = pGroupId).ToList()

                For Each item As SecureUserGroup In pSecureGroupUserEntities
                    lstUsers.Add(item.UserID)
                Next

                pSecureUserEntities = From t In _iSecureUser.All()
                                      Where lstUsers.Contains(t.UserID)
                                      Order By t.UserName Ascending

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                jsonObject = JsonConvert.SerializeObject(pSecureUserEntities, Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlDataSavedSuccessfully")

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .jsonObject = jsonObject
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'GET all the list of groups from system.
        Public Function GetAllUsersList() As ActionResult
            Dim lstAllUsers As List(Of SecureUser)
            Dim usrJsonObject = Nothing

            Try
                lstAllUsers = _iSecureUser.All().Where(Function(x) x.UserID <> -1).OrderBy(Function(x) x.UserName).ToList()

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                usrJsonObject = JsonConvert.SerializeObject(lstAllUsers, Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlDataRetrieved")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .usrJsonObject = usrJsonObject
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Assign Users to group.
        Public Function SetUsersAgainstGroup(pGroupID As Integer, pUserList As String()) As ActionResult
            Dim pSecureUserGroup As SecureUserGroup = New SecureUserGroup()

            Try
                _iSecureUserGroup.BeginTransaction()
                Dim pUserGrpEntities = _iSecureUserGroup.All().Where(Function(x) x.GroupID = pGroupID)
                _iSecureUserGroup.DeleteRange(pUserGrpEntities)
                If pUserList IsNot Nothing Then
                    If pUserList.Length > 0 Then
                        For Each uid In pUserList
                            pSecureUserGroup.GroupID = pGroupID
                            pSecureUserGroup.UserID = uid
                            _iSecureUserGroup.Add(pSecureUserGroup)
                        Next

                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("msgAdminSecurityUsersToGroup")

                    End If
                End If
                _iSecureUserGroup.CommitTransaction()
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()

                _iSecureUserGroup.RollBackTransaction()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
#End Region
#Region "Securables"
        'Load the view for Securables
        Public Function LoadSecuritySecurablesTab() As PartialViewResult
            Return PartialView("_SecuritySecurablesPartial")
        End Function
        'Get the list of Securable types.
        Public Function GetListOfSecurablesType() As ActionResult
            Dim pSecureObjectEntity = Nothing
            Dim jsonObject = Nothing
            Try
                pSecureObjectEntity = _iSecureObject.All().Where(Function(x) x.BaseID = 0 And x.SecureObjectID > 0 And Left(x.Name, 1) <> " ").OrderBy(Function(x) x.Name)

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                jsonObject = JsonConvert.SerializeObject(pSecureObjectEntity, Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlDataRetrievedSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .jsonObject = jsonObject
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
        'Get the list of Securable objects list.
        Public Function GetListOfSecurableObjects(pSecurableTypeID As Integer) As ActionResult
            Dim pSecureObjectEntity = Nothing
            Dim jsonObject = Nothing
            Try
                Dim sopData As List(Of SecureObjectPermission) = Nothing
                sopData = _iSecureObjectPermission.All().ToList()
                pSecureObjectEntity = From o In _iSecureObject.All()
                                      Group Join v In _iSecureObject.All()
                                      On o.BaseID Equals v.SecureObjectID
                                      Into ov = Group
                                      Let ParentName = ov.FirstOrDefault().Name
                                      Where o.BaseID <> 0 And o.SecureObjectTypeID = pSecurableTypeID And Not (o.Name.StartsWith("slRetention")) And Not (o.Name.StartsWith("security"))
                                      Order By o.Name
                                      Select o.SecureObjectID, o.Name, o.SecureObjectTypeID, o.BaseID, ParentName

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                jsonObject = JsonConvert.SerializeObject(pSecureObjectEntity, Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlDataRetrievedSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .jsonObject = jsonObject
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
        'Get the permission data for Securable Object.
        Public Function GetPermissionsForSecurableObject(pSecurableObjID As Integer) As ActionResult
            Dim dsPermissions As DataSet = New DataSet()
            Dim dtPermissions As DataTable = New DataTable()
            Dim jsonObject = Nothing
            Try
                _IDBManager.ConnectionString = Keys.GetDBConnectionString
                _IDBManager.CreateParameters(1)
                _IDBManager.AddParameters(0, "@SecurableObjID", pSecurableObjID)

                dsPermissions = _IDBManager.ExecuteDataSet(System.Data.CommandType.StoredProcedure, "SP_RMS_GetPermissionInfoForSecurableObj")
                _IDBManager.Dispose()
                dtPermissions = dsPermissions.Tables(0)

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                jsonObject = JsonConvert.SerializeObject(dtPermissions, Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlDataRetrievedSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .jsonObject = jsonObject
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
        'Set the permissions to securable object.
        Public Function SetPermissionsToSecurableObject(pSecurableObjIds As Array, pPermisionIds As List(Of Integer), pPermissionRvmed As List(Of Integer)) As ActionResult

            Dim pSecurableObjectList = Nothing
            Dim pTempPermissionIds As List(Of Integer) = New List(Of Integer)
            Dim pPermissionEntity As SecureObjectPermission = New SecureObjectPermission()
            Dim pSecurableIdsForView As List(Of Models.SecureObject) = New List(Of Models.SecureObject)

            Try
                If pSecurableObjIds.Length > 0 Then
                    _iSecureObjectPermission.BeginTransaction()
                    For Each pSecurableID As Integer In pSecurableObjIds

                        'Add all permission Id's which are new.
                        If Not IsNothing(pPermisionIds) Then
                            If pPermisionIds.Count > 0 Then
                                For Each pPermissionId In pPermisionIds
                                    If Not _iSecureObjectPermission.All().Any(Function(x) x.GroupID = 0 AndAlso x.SecureObjectID = pSecurableID And x.PermissionID = pPermissionId) Then
                                        ''Assigned new permission
                                        AddNewSecureObjectPermission(pSecurableID, pPermissionId)
                                    End If
                                Next
                            End If
                        End If

                        'Remove permission ids
                        If Not IsNothing(pPermissionRvmed) Then
                            If pPermissionRvmed.Count > 0 Then
                                'Remove all associated secure object permission for Views - added by Ganesh 12/01/2016.
                                pSecurableIdsForView = _iSecureObject.All().Where(Function(x) x.BaseID = pSecurableID And x.SecureObjectTypeID = Enums.SecureObjectType.View).ToList()
                                If pSecurableIdsForView.Count > 0 Then
                                    For Each SecureObj In pSecurableIdsForView
                                        Dim SecureObjID = SecureObj.SecureObjectID
                                        For Each pPermissionId In pPermissionRvmed
                                            'Changed by Ganesh - 06/01/2016.
                                            If Not (pPermissionId = Enums.PassportPermissions.Configure) Then
                                                If _iSecureObjectPermission.All().Any(Function(x) x.SecureObjectID = SecureObj.SecureObjectID And x.PermissionID = pPermissionId) Then
                                                    Dim SecureObjectPerEntities = _iSecureObjectPermission.All().Where(Function(x) x.SecureObjectID = SecureObj.SecureObjectID And x.PermissionID = pPermissionId)
                                                    _iSecureObjectPermission.DeleteRange(SecureObjectPerEntities)
                                                End If
                                            End If
                                        Next
                                    Next
                                    'Else
                                    '    For Each pPermissionId In pPermissionRvmed
                                    '        If _iSecureObjectPermission.All().Any(Function(x) x.SecureObjectID = pSecurableID And x.PermissionID = pPermissionId) Then
                                    '            Dim SecureObjectPerEntities = _iSecureObjectPermission.All().Where(Function(x) x.SecureObjectID = pSecurableID And x.PermissionID = pPermissionId)
                                    '            _iSecureObjectPermission.DeleteRange(SecureObjectPerEntities)
                                    '        End If
                                    '    Next
                                End If

                                'Remove all associated secure object permission for Annotation and Attachments - added by Ganesh 12/01/2016.
                                Dim selectedSecureObj = _iSecureObject.All().Where(Function(x) x.SecureObjectID = pSecurableID).FirstOrDefault()
                                'Execute this code if current selected Secure Object is from TABLE.
                                If selectedSecureObj.SecureObjectTypeID = Enums.SecureObjectType.Table Then
                                    Dim relatedAnnotationObj = _iSecureObject.All().Where(Function(x) x.Name = selectedSecureObj.Name And (x.SecureObjectTypeID = Enums.SecureObjectType.Annotations Or x.SecureObjectTypeID = Enums.SecureObjectType.Attachments)).ToList()

                                    If relatedAnnotationObj.Count > 0 Then
                                        For Each relatedObj In relatedAnnotationObj
                                            For Each pPermissionId In pPermissionRvmed
                                                If _iSecureObjectPermission.All().Any(Function(x) x.SecureObjectID = relatedObj.SecureObjectID And x.PermissionID = pPermissionId) Then
                                                    Dim SecureObjectPerEntities = _iSecureObjectPermission.All().Where(Function(x) x.SecureObjectID = relatedObj.SecureObjectID And x.PermissionID = pPermissionId)
                                                    _iSecureObjectPermission.DeleteRange(SecureObjectPerEntities)
                                                End If
                                            Next
                                        Next
                                    End If
                                End If
                                For Each pPermissionId In pPermissionRvmed
                                    If _iSecureObjectPermission.All().Any(Function(x) x.SecureObjectID = pSecurableID And x.PermissionID = pPermissionId) Then
                                        Dim SecureObjectPerEntities = _iSecureObjectPermission.All().Where(Function(x) x.SecureObjectID = pSecurableID And x.PermissionID = pPermissionId)
                                        _iSecureObjectPermission.DeleteRange(SecureObjectPerEntities)
                                        ''Keep sync Tables -> Tracking tab Tracking Object and Allow Requiresting checkboxs and Security Securables tab
                                        ''Removed permission updates in Tables table
                                        If pPermissionId = 8 Or pPermissionId = 9 Then
                                            UpdateTablesTrackingObject("D", pSecurableID, pPermissionId)
                                        End If
                                    End If

                                    'START: Delete entries for My query and My Fav
                                    Dim SecureObject = _iSecureObject.All().Where(Function(x) x.SecureObjectID = pSecurableID).FirstOrDefault()
                                    If SecureObject.Name.Equals(Common.SECURE_MYQUERY) Then
                                        RemovePreviousDataForMyQueryOrFavoriate(Common.SECURE_MYQUERY)
                                    ElseIf SecureObject.Name.Equals(Common.SECURE_MYFAVORITE) Then
                                        RemovePreviousDataForMyQueryOrFavoriate(Common.SECURE_MYFAVORITE)
                                    End If
                                    'END: Delete entries for My query and My Fav
                                Next
                            End If
                        End If
                    Next
                    _iSecureObjectPermission.CommitTransaction()
                    'Reload the permissions dataset after updation of permissions.
                    CollectionsClass.ReloadPermissionDataSet()

                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlPermissionSavedSuccessfully")
                End If
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
                _iSecureObjectPermission.RollBackTransaction()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Remove previous data for My query and My Favorites.
        Private Sub RemovePreviousDataForMyQueryOrFavoriate(typeOfFunctionality As String, Optional pGroupId As Integer = 0)
            If pGroupId = 0 Then
                'Handle removing data if action performed on "Securable" section.
                If typeOfFunctionality.Equals(Common.SECURE_MYQUERY) Then
                    Dim allSavedCritriaForMyQuery = _is_SavedCriteria.All().Where(Function(x) x.SavedType = 0)

                    For Each savedCritria In allSavedCritriaForMyQuery
                        Dim savedChildrenQuery = _is_SavedChildrenQuery.All().Where(Function(q) q.SavedCriteriaId = savedCritria.Id)
                        _is_SavedChildrenQuery.DeleteRange(savedChildrenQuery)
                    Next

                    _is_SavedCriteria.DeleteRange(allSavedCritriaForMyQuery)
                ElseIf typeOfFunctionality.Equals(Common.SECURE_MYFAVORITE) Then
                    Dim allSavedCritriaForMyFav = _is_SavedCriteria.All().Where(Function(x) x.SavedType = 1)

                    For Each savedCritria In allSavedCritriaForMyFav
                        Dim savedChildrenFav = _is_SavedChildrenFavorite.All().Where(Function(q) q.SavedCriteriaId = savedCritria.Id)
                        _is_SavedChildrenFavorite.DeleteRange(savedChildrenFav)
                    Next

                    _is_SavedCriteria.DeleteRange(allSavedCritriaForMyFav)
                End If
            Else
                ''Handle remove data if action performed on "Permissions" section.
                Dim lstUsersUnderGrpBeingDel = _iSecureUserGroup.All().Where(Function(x) x.GroupID = pGroupId).Select(Function(y) y.UserID).ToList()
                Dim allSavedCriteria = _is_SavedCriteria.All().Select(Function(x) x.UserId).Distinct().ToList()
                Dim secureObjectIdForMyQuery = _iSecureObject.All().Where(Function(x) x.Name = Common.SECURE_MYQUERY).Select(Function(y) y.SecureObjectID).FirstOrDefault()
                Dim secureObjectIdForMyFav = _iSecureObject.All().Where(Function(x) x.Name = Common.SECURE_MYFAVORITE).Select(Function(y) y.SecureObjectID).FirstOrDefault()
                Dim IsMyQueryForEveryone As Boolean = _iSecureObjectPermission.All().Any(Function(x) x.GroupID = -1 And x.SecureObjectID = secureObjectIdForMyQuery)
                Dim IsMyFavForEveryone As Boolean = _iSecureObjectPermission.All().Any(Function(x) x.GroupID = -1 And x.SecureObjectID = secureObjectIdForMyFav)
                Dim cntOfGrpUserPartOf As Integer = 0
                Dim SQLQuery As String

                _IDBManager.ConnectionString = Keys.GetDBConnectionString()

                For Each userid In lstUsersUnderGrpBeingDel
                    If (allSavedCriteria.Contains(userid)) Then
                        If (typeOfFunctionality.Equals(Common.SECURE_MYQUERY)) Then
                            SQLQuery = String.Format("SELECT COUNT(SUG.GroupId) as cntGroups FROM SecureUser SU
                                                        INNER JOIN SecureUserGroup SUG ON SU.UserID = SUG.UserID
                                                        INNER JOIN SecureObjectPermission SOG ON SUG.GroupID = SOG.GroupID
                                                        WHERE SU.UserID = {0} AND SecureObjectID = (SELECT SecureObjectID FROM SecureObject WHERE Name = '{1}')", userid, Common.SECURE_MYQUERY)

                            cntOfGrpUserPartOf = _IDBManager.ExecuteScalar(CommandType.Text, SQLQuery)
                            _IDBManager.Dispose()

                            If (Not IsMyQueryForEveryone) Then
                                'If user is not part of other group with 'My Queries' permission, then DELETE "Saved Queries" for that user.
                                If (cntOfGrpUserPartOf = 0) Then
                                    'Delete entries of my query for user under current group
                                    Dim allSavedCritriaForMyQuery = _is_SavedCriteria.All().Where(Function(x) x.SavedType = 0 And x.UserId = userid)

                                    For Each savedCritria In allSavedCritriaForMyQuery
                                        Dim savedChildrenQuery = _is_SavedChildrenQuery.All().Where(Function(q) q.SavedCriteriaId = savedCritria.Id)
                                        _is_SavedChildrenQuery.DeleteRange(savedChildrenQuery)
                                    Next
                                    _is_SavedCriteria.DeleteRange(allSavedCritriaForMyQuery)
                                End If
                            End If
                        ElseIf typeOfFunctionality.Equals(Common.SECURE_MYFAVORITE) Then
                            Try
                                SQLQuery = String.Format("SELECT COUNT(SUG.GroupId) as cntGroups FROM SecureUser SU
                                                        INNER JOIN SecureUserGroup SUG ON SU.UserID = SUG.UserID
                                                        INNER JOIN SecureObjectPermission SOG ON SUG.GroupID = SOG.GroupID
                                                        WHERE SU.UserID = {0} AND SecureObjectID = (SELECT SecureObjectID FROM SecureObject WHERE Name = '{1}')", userid, Common.SECURE_MYFAVORITE)

                                cntOfGrpUserPartOf = _IDBManager.ExecuteScalar(CommandType.Text, SQLQuery)
                                _IDBManager.Dispose()
                                If (Not IsMyFavForEveryone) Then
                                    'If user is not part of other group with 'My Favorites' permission, then DELETE "Saved Favorites" for that user.
                                    If (cntOfGrpUserPartOf = 0) Then
                                        'Delete entries of my favorites for user under current group
                                        Dim allSavedCritriaForMyFav = _is_SavedCriteria.All().Where(Function(x) x.SavedType = 1 And x.UserId = userid)
                                        For Each savedCritria In allSavedCritriaForMyFav
                                            Dim savedChildrenFav = _is_SavedChildrenFavorite.All().Where(Function(q) q.SavedCriteriaId = savedCritria.Id)
                                            _is_SavedChildrenFavorite.DeleteRange(savedChildrenFav)
                                        Next
                                        _is_SavedCriteria.DeleteRange(allSavedCritriaForMyFav)
                                    End If
                                End If
                            Catch ex As Exception
                                Keys.ErrorType = "e"
                                Keys.ErrorMessage = Keys.ErrorMessageJS()
                            End Try
                        End If
                    End If
                    cntOfGrpUserPartOf = 0
                    SQLQuery = ""
                Next
                ''Handle Scenario where users don't have My Query/My Fav permission with assigned group(s), but everyone group had permission.
                If (typeOfFunctionality.Equals(Common.SECURE_MYQUERY)) Then
                    If (Not IsMyQueryForEveryone And pGroupId = -1) Then
                        Dim dsUserIds As DataSet = New DataSet()
                        Dim dtUserIds As DataTable = New DataTable()

                        SQLQuery = String.Format("
                        SELECT Distinct UserId FROM s_SavedCriteria 
                        WHERE UserId NOT IN (
                                SELECT SU.UserID FROM SecureUser SU
                                INNER JOIN SecureUserGroup SUG ON SU.UserID = SUG.UserID
                                INNER JOIN SecureObjectPermission SOG ON SUG.GroupID = SOG.GroupID
	                            INNER JOIN SecureGroup SG ON SUG.GroupID = SG.GroupID    
	                            AND SecureObjectID = (SELECT SecureObjectID FROM SecureObject WHERE Name = '{0}')
                        )", Common.SECURE_MYQUERY)

                        dsUserIds = _IDBManager.ExecuteDataSet(CommandType.Text, SQLQuery)
                        dtUserIds = dsUserIds.Tables(0)
                        _IDBManager.Dispose()

                        For Each useridRow As DataRow In dtUserIds.Rows
                            Dim userid As Integer = Convert.ToInt32(useridRow("UserId"))
                            Dim allSavedCritriaForMyQuery = _is_SavedCriteria.All().Where(Function(x) x.SavedType = 0 And x.UserId = userid)

                            For Each savedCritria In allSavedCritriaForMyQuery
                                Dim savedChildrenQuery = _is_SavedChildrenQuery.All().Where(Function(q) q.SavedCriteriaId = savedCritria.Id)
                                _is_SavedChildrenQuery.DeleteRange(savedChildrenQuery)
                            Next
                            _is_SavedCriteria.DeleteRange(allSavedCritriaForMyQuery)
                        Next
                    End If
                ElseIf typeOfFunctionality.Equals(Common.SECURE_MYFAVORITE) Then

                    If (Not IsMyFavForEveryone And pGroupId = -1) Then
                        Dim dsUserIds As DataSet = New DataSet()
                        Dim dtUserIds As DataTable = New DataTable()

                        SQLQuery = String.Format("
                        SELECT Distinct UserId FROM s_SavedCriteria 
                        WHERE UserId NOT IN (
                                SELECT SU.UserID FROM SecureUser SU
                                INNER JOIN SecureUserGroup SUG ON SU.UserID = SUG.UserID
                                INNER JOIN SecureObjectPermission SOG ON SUG.GroupID = SOG.GroupID
	                            INNER JOIN SecureGroup SG ON SUG.GroupID = SG.GroupID    
	                            AND SecureObjectID = (SELECT SecureObjectID FROM SecureObject WHERE Name = '{0}')
                        )", Common.SECURE_MYFAVORITE)

                        dsUserIds = _IDBManager.ExecuteDataSet(CommandType.Text, SQLQuery)
                        dtUserIds = dsUserIds.Tables(0)
                        _IDBManager.Dispose()

                        For Each useridRow As DataRow In dtUserIds.Rows
                            Dim userid As Integer = Convert.ToInt32(useridRow("UserId"))
                            Dim allSavedCritriaForMyFav = _is_SavedCriteria.All().Where(Function(x) x.SavedType = 1 And x.UserId = userid)

                            For Each savedCritria In allSavedCritriaForMyFav
                                Dim savedChildrenFav = _is_SavedChildrenQuery.All().Where(Function(q) q.SavedCriteriaId = savedCritria.Id)
                                _is_SavedChildrenQuery.DeleteRange(savedChildrenFav)
                            Next
                            _is_SavedCriteria.DeleteRange(allSavedCritriaForMyFav)
                        Next
                    End If
                End If
            End If
        End Sub

#End Region
#Region "Permissions"
        'Load the view for Permissions.
        Public Function LoadSecurityPermissionsTab() As PartialViewResult
            Return PartialView("_SecurityPermissionsPartial")
        End Function

        'Get the list of groups
        Public Function GetPermisionsGroupList() As ActionResult
            Dim jsonObject = Nothing
            Dim pSecureGroupEntity = Nothing
            Try
                pSecureGroupEntity = _iSecureGroup.All().Where(Function(x) x.GroupID <> 0).OrderBy(Function(x) x.GroupName)

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                jsonObject = JsonConvert.SerializeObject(pSecureGroupEntity, Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlDataRetrievedSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .jsonObject = jsonObject
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Get the list of Securable objects list.
        Public Function GetListOfSecurableObjForPermissions(pSecurableTypeID As Integer) As ActionResult
            Dim dsSecurables As DataSet = New DataSet()
            Dim dtSecurables As DataTable = New DataTable()
            Dim jsonObject = Nothing
            Try
                _IDBManager.ConnectionString = Keys.GetDBConnectionString
                _IDBManager.CreateParameters(2)
                _IDBManager.AddParameters(0, "@GroupID", 0)
                _IDBManager.AddParameters(1, "@SecurableTypeID", pSecurableTypeID)

                dsSecurables = _IDBManager.ExecuteDataSet(System.Data.CommandType.StoredProcedure, "SP_RMS_GetListOfSecurablesById")
                _IDBManager.Dispose()
                dtSecurables = dsSecurables.Tables(0)

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                jsonObject = JsonConvert.SerializeObject(dtSecurables, Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlDataRetrievedSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .jsonObject = jsonObject
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Get the permission data for Securable Object.
        Public Function GetPermissionsBasedOnGroupId(pGroupID As Integer, pSecurableObjID As Integer) As ActionResult
            Dim dsPermissions As DataSet = New DataSet()
            Dim dtPermissions As DataTable = New DataTable()
            Dim jsonObject = Nothing
            Try
                _IDBManager.ConnectionString = Keys.GetDBConnectionString
                _IDBManager.CreateParameters(2)
                _IDBManager.AddParameters(0, "@GroupID", pGroupID)
                _IDBManager.AddParameters(1, "@SecurableObjID", pSecurableObjID)

                dsPermissions = _IDBManager.ExecuteDataSet(System.Data.CommandType.StoredProcedure, "SP_RMS_GetPermissionInfoObjBasedOnGroup")
                _IDBManager.Dispose()
                dtPermissions = dsPermissions.Tables(0)

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                jsonObject = JsonConvert.SerializeObject(dtPermissions, Newtonsoft.Json.Formatting.Indented, Setting)

                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgAdminCtrlDataRetrievedSuccessfully")
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .jsonObject = jsonObject
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        'Set the permisions for group.
        Public Function SetGroupPermissions(pGroupIds As Array, pSecurableObjIds As Array, pPermisionIds As List(Of Integer)) As ActionResult
            Dim pSecurableObjectList = Nothing
            Dim pTempPermissionIds As List(Of Integer) = New List(Of Integer)
            Dim pPermissionEntity As SecureObjectPermission = New SecureObjectPermission()

            Try
                If pSecurableObjIds.Length > 0 Then
                    For Each pGroupId As Integer In pGroupIds
                        For Each pSecurableID As Integer In pSecurableObjIds

                            pSecurableObjectList = _iSecureObjectPermission.All().Where(Function(x) x.SecureObjectID = pSecurableID And x.GroupID = pGroupId).ToList()
                            If Not IsNothing(pPermisionIds) Then
                                pTempPermissionIds.Clear()
                                pTempPermissionIds.AddRange(pPermisionIds)
                            End If

                            'Check for new permission ids and remove from list if exists system already.
                            For Each pSecurableObject In pSecurableObjectList
                                _iSecureObjectPermission.BeginTransaction()
                                If pTempPermissionIds.Count > 0 Then
                                    If pTempPermissionIds.Find(Function(x As Integer) x = pSecurableObject.PermissionID) > 0 Then
                                        pTempPermissionIds.Remove(pTempPermissionIds.Find(Function(x) x = pSecurableObject.PermissionID))
                                    Else
                                        _iSecureObjectPermission.Delete(pSecurableObject)
                                    End If
                                ElseIf pTempPermissionIds.Count = 0 Then
                                    _iSecureObjectPermission.Delete(pSecurableObject)
                                End If
                                _iSecureObjectPermission.CommitTransaction()
                                'START: Delete entries for My query and My Fav
                                Dim SecureObject = _iSecureObject.All().Where(Function(x) x.SecureObjectID = pSecurableID).FirstOrDefault()
                                If SecureObject.Name.Equals(Common.SECURE_MYQUERY) Then
                                    RemovePreviousDataForMyQueryOrFavoriate(Common.SECURE_MYQUERY, pGroupId)
                                ElseIf SecureObject.Name.Equals(Common.SECURE_MYFAVORITE) Then
                                    RemovePreviousDataForMyQueryOrFavoriate(Common.SECURE_MYFAVORITE, pGroupId)
                                End If
                                'END: Delete entries for My query and My Fav
                            Next
                            'Get the new permissions ids and Insert those into system.
                            For Each pPermissionId In pTempPermissionIds
                                _iSecureObjectPermission.BeginTransaction()
                                pPermissionEntity.GroupID = pGroupId
                                pPermissionEntity.SecureObjectID = pSecurableID
                                pPermissionEntity.PermissionID = pPermissionId
                                _iSecureObjectPermission.Add(pPermissionEntity)
                                _iSecureObjectPermission.CommitTransaction()
                            Next
                        Next
                    Next

                    'Reload the permissions dataset after updation of permissions.
                    CollectionsClass.ReloadPermissionDataSet()

                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgAdminCtrlPermissionSavedSuccessfully")
                End If
            Catch ex As Exception

            End Try

            Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
#End Region
#End Region

#Region "Localize"
        Public Function LoadLocalizePartial() As PartialViewResult
            Return PartialView("_LocalizePartial")
        End Function

        Public Function GetAvailableLang() As ActionResult
            Try

                Dim pDateForm = _iLookupType.All.Where(Function(m) m.LookupTypeForCode.Trim.ToUpper.Equals(("DTFRM").Trim.ToUpper)).OrderBy(Function(m) m.SortOrder)

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects

                '' Fill languages dropdown
                Dim resouceObject As New Dictionary(Of String, String)()
                resouceObject = Resource.Languages.GetXMLLanguages()

                Dim pLang = JsonConvert.SerializeObject(resouceObject, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim pDateFormS = JsonConvert.SerializeObject(pDateForm, Newtonsoft.Json.Formatting.Indented, Setting)
                Dim pLocData = "0"
                If Not pDateForm Is Nothing Then
                    Dim pLookupType = pDateForm.Where(Function(x) x.LookupTypeValue.Trim().ToLower().Equals(Keys.GetUserPreferences().sPreferedDateFormat.ToString().Trim().ToLower())).FirstOrDefault()
                    If Not pLookupType Is Nothing Then
                        pLocData = pLookupType.LookupTypeCode
                    End If
                End If
                'Dim strCulture As String = Keys.GetCultureCookies().Name
                Dim data = Request.Cookies(Keys.CurrentUserName)
                Dim strCulture = data.Item("PreferedLanguage")
                Return Json(New With {
                          Key .pLangS = resouceObject,
                          Key .cultureCode = strCulture,
                          Key .pDateFormS = pDateFormS,
                          Key .pLocData = pLocData,
                          Key .errortype = Keys.ErrorType,
                          Key .message = Keys.ErrorMessage
                          }, JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Keys.ErrorMessage = Keys.ErrorMessageJS()
                Keys.ErrorType = "e"
                Return Json(New With {
              Key .errortype = Keys.ErrorType,
              Key .message = Keys.ErrorMessage
              }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

            End Try

        End Function

        Public Function SetLocalizeData(pPreferedLanguage As String, pPreferedDateFormat As String) As ActionResult
            Try
                If String.IsNullOrEmpty(pPreferedDateFormat) Then
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("MsgLocalizeDateValidate")
                Else
                    Dim pLookupType = _iLookupType.All().Where(Function(m) m.LookupTypeForCode.Trim.ToUpper.Equals(("DTFRM").Trim.ToUpper) AndAlso m.LookupTypeCode.Equals(pPreferedDateFormat)).FirstOrDefault()

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
                    'aCookie.Values("PreferedLanguage") = IIf((pPreferedLanguage Is Nothing), "en-US", pPreferedLanguage)
                    If Not pLookupType Is Nothing Then
                        aCookie.Values("PreferedDateFormat") = pLookupType.LookupTypeValue
                    Else
                        aCookie.Values("PreferedDateFormat") = New CultureInfo(aCookie.Values("PreferedLanguage")).DateTimeFormat.ShortDatePattern
                        'aCookie.Values("PreferedDateFormat") = Keys.GetCultureCookies().DateTimeFormat.ShortDatePattern
                    End If
                    'aCookie.Values("PreferedDateFormat") = IIf(pLookupType Is Nothing, Keys.GetCultureCookies().DateTimeFormat.ShortDatePattern, pLookupType.LookupTypeValue)
                    aCookie.Expires = DateTime.Now.AddDays(180)
                    Response.Cookies.Add(aCookie)

                    Keys.ErrorType = "s"
                    Keys.ErrorMessage = Languages.Translation("msgLocalizeSave") 'Fixed: FUS-6229
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
#End Region

#Region "Before Login warning message"

        Public Function LoadWarningMessageView() As PartialViewResult
            Return PartialView("_LoginWarningMsgPartial")
        End Function

        <HttpGet>
        Public Function GetWarningMessage() As JsonResult
            Dim showMessage As String = String.Empty
            Dim warningMessage As String = String.Empty
            Dim path As String = IO.Path.Combine(Common.GetBaseFolder, "ImportFiles\WarningMessageXML.xml")
            If (IO.File.Exists(path)) Then
                Dim document As XmlReader = New XmlTextReader(path)
                While (document.Read())
                    Dim type = document.NodeType
                    If (type = XmlNodeType.Element) Then
                        If (document.Name = "ShowMessage") Then showMessage = document.ReadInnerXml.ToString()
                        If (document.Name = "WarningMessage") Then warningMessage = document.ReadInnerXml.ToString()
                    End If
                End While
                document.Close()
            End If
            warningMessage = warningMessage.Remove(0, 1) 'remove first last character of a string
            warningMessage = warningMessage.Remove(warningMessage.Length - 1) ' remove last character of a string
            Dim data = showMessage + "||" + warningMessage
            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(data, Newtonsoft.Json.Formatting.Indented, Setting)
            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        <HttpPost>
        Public Function SetWarningMessage(pWarningMessage As String, pShowMessage As String) As JsonResult
            Try
                If pShowMessage.Trim().ToLower() = "yes" AndAlso String.IsNullOrEmpty(pWarningMessage) Then
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("lblValShowLoginWarningMsg")
                Else
                    If Not String.IsNullOrEmpty(pWarningMessage) Then
                        If pWarningMessage.TrimStart.Chars(0) <> """" Then pWarningMessage = """" + pWarningMessage 'firstLetter
                        If pWarningMessage.Last() <> """" Then pWarningMessage = pWarningMessage + """" 'lastLetter
                    End If

                    Dim settings As New XmlWriterSettings()
                    settings.Indent = True
                    Dim path As String = IO.Path.Combine(Common.GetBaseFolder, "ImportFiles\WarningMessageXML.xml")
                    Dim XmlWrt As XmlWriter = XmlWriter.Create(path, settings)
                    With XmlWrt
                        ' Write the Xml declaration.
                        .WriteStartDocument()
                        ' Write a comment.
                        .WriteComment("Before login Warning Message Data.")
                        ' Write the root element.
                        .WriteStartElement("Data")
                        ' Write element.
                        .WriteStartElement("ShowMessage")
                        .WriteString(pShowMessage)
                        .WriteEndElement()
                        .WriteStartElement("WarningMessage")
                        .WriteString(pWarningMessage)
                        .WriteEndElement()
                        ' Close the XmlTextWriter.
                        .WriteEndDocument()
                        .Close()
                    End With
                    Keys.ErrorType = "s"
                    If pShowMessage.Trim().ToLower() = "no" Then
                        Keys.ErrorMessage = Languages.Translation("successMessageLoginWarningNo")
                    Else
                        Keys.ErrorMessage = Languages.Translation("successMessageLoginWarning")
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
#End Region

        Public Function OpenAboutUs() As ActionResult
            Dim tokens As String = My.Resources.about
            tokens = Replace(tokens, "VersionToken", My.Application.Info.Version.ToString)
            tokens = Replace(tokens, "DescriptionToken", String.Format(Languages.Translation("lblAboutUsDescriptionToken"), "TAB FusionRMS")) 'My.Application.Info.Description
            tokens = Replace(tokens, "TradeMarkToken", String.Format(Languages.Translation("lblAboutUsTradeMarkToken"), "TAB FusionRMS", "TAB")) 'My.Application.Info.Trademark
            tokens = Replace(tokens, "CopyrightToken", My.Application.Info.Copyright.Replace("2012", Year(Now).ToString))
            tokens = Replace(tokens, "CurrentYearToken", Year(Now).ToString)
            tokens = Replace(tokens, "AboutToken", String.Format(Languages.Translation("lblAboutAbout"), My.Application.Info.Title))
            tokens = Replace(tokens, "WarningTxtTkn", Languages.Translation("lblAboutWarning"))
            tokens = Replace(tokens, "TechSupportTxtTkn", String.Format(Languages.Translation("lblAboutTechSupport"), "(877) 306-8875"))
            tokens = Replace(tokens, "VersionTxtTkn", String.Format("{0} {1}", Languages.Translation("lblAboutVersion"), My.Application.Info.Version.ToString))

            Dim returnView = RenderPartialViewToString("~/Views/Admin/_AddAboutPartial.vbhtml")
            Dim sb = String.Format(returnView, String.Format(Languages.Translation("lblAboutAbout"), My.Application.Info.Title), tokens)
            Return Json(sb)
        End Function

        Protected Function RenderPartialViewToString(viewName As String) As String
            If (viewName = Nothing) Then Throw New ArgumentNullException("viewName")
            If (String.IsNullOrEmpty(viewName)) Then
                viewName = ControllerContext.RouteData.GetRequiredString("action")
            End If
            Dim sw = New System.IO.StringWriter
            Dim ViewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName)
            Dim ViewContext = New ViewContext(ControllerContext, ViewResult.View, ViewData, TempData, sw)
            ViewResult.View.Render(ViewContext, sw)
            Return sw.GetStringBuilder().ToString()
        End Function

    End Class
End Namespace
