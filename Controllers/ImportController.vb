Imports TabFusionRMS.Models
Imports TabFusionRMS.RepositoryVB
Imports TabFusionRMS.DataBaseManagerVB
Imports Newtonsoft.Json
Imports System.Data
Imports System.Data.Sql
Imports System.Web.Script.Serialization
Imports System.Data.SqlClient
Imports System.Web.Helpers
Imports System.IO
Imports System.Data.OleDb
Imports Microsoft.Win32
Imports System.Collections.Specialized
Imports System.Globalization
Imports System.Text.RegularExpressions
Imports Smead.RecordsManagement

Public Structure TRACKDESTELEMENTS
    Dim bDoRecon As Boolean
    Dim sDestination As String
    Dim sUserName As String
    Dim dDateDue As Date
    Dim dTransactionDateTime As Date
    Dim sTrackingAdditionalField1 As String
    Dim sTrackingAdditionalField2 As String
End Structure

Public Class ImportController
    Inherits BaseController

    Private Const IMPORT_TRACK As String = "<<TRACKING IMPORT>>"
    Private Const SECURE_TRACKING As String = "Tracking"
    Private Const TRACK_DEST As String = "<<TRACKING DESTINATION>>"
    Private Const TRACK__OBJ As String = "<<TRACKING OBJECT>>"
    Private Const TRACK_DATE As String = "<<TRACKING DATE>>"
    Private Const TRACK_OPER As String = "<<TRACKING OPERATOR>>"
    Private Const TRACK_RECN As String = "<<TRACKING RECONCILATION>>"
    Private Const TRACK__DUE As String = "<<TRACKING DUE DATE>>"
    Private Const TRACK_ADDIT_FIELD1 As String = "<<TRACKING TEXT FIELD>>"
    Private Const TRACK_ADDIT_FIELD2 As String = "<<TRACKING MEMO FIELD>>"
    Private Const SKIP_FIELD As String = "<<SKIP FIELD>>"
    Private Const IMAGE_COPY As String = "<<IMAGE COPY>>"
    Private Const TRACK_OCR As String = "<<OCR TEXT>>"
    Private Const PCFILE_COPY As String = "<<PCFILE COPY>>"
    Private Const TRACK_PC_OCR As String = "<<PCFILE TEXT>>"
    Private Const ATTMT_LINK As String = "<<ATTACHMENT LINK>>"
    Private Const NON_FIELDS As String = "|" & SKIP_FIELD & "|" & ATTMT_LINK & "|" & IMAGE_COPY & "|" & TRACK_DEST &
                                                "|" & TRACK__OBJ & "|" & TRACK_OPER & "|" & TRACK__DUE & "|" & TRACK_DATE &
                                                "|" & TRACK_RECN & "|" & TRACK_ADDIT_FIELD1 & "|" & TRACK_ADDIT_FIELD2 & "|" &
                                                "|" & TRACK_OCR & "|" & PCFILE_COPY & "|" & TRACK_PC_OCR & "|"
    Private Const IMAGE_FIELDS As String = "|" & IMAGE_COPY & "|" & PCFILE_COPY & "|"

    Private Const BOTH_DISPLAY As String = "Overwrite Existing and Add New Records"
    Private Const BOTH_DB_TEXT As String = "UPDATE"
    Private Const OVERWRITE_DISPLAY As String = "Overwrite Existing Records Only"
    Private Const OVERWRITE_DB_TEXT As String = "SKIPNONDUPS"
    Private Const NEW_DISPLAY As String = "Add New Records Only"
    Private Const NEW_DB_TEXT As String = "SKIP"
    Private Const NEW_SKIP_DISPLAY As String = "Add New Records Only / Skip Duplicates"
    Private Const NEW_SKIP_DB_TEXT As String = "IGNORE"

    Private Const PRINT_NEW_ONLY As String = "Print New Records Only"
    Private Const PRINT_EXISTING_ONLY As String = "Print Existing Only"
    Private Const PRINT_ALL As String = "Print New and Existing Records"
    Private Const IMPORTBY_NONE As String = "(None) - for Adding New Records Only"

    Private Const IMPORT_ONLY = 0

    'Private Property _IDBManager As IDBManager
    Private Property _iTables As IRepository(Of Table)
    Private Property _iDatabas As IRepository(Of Databas)
    Private Property _iImportLoad As IRepository(Of ImportLoad)
    Private Property _iImportJob As IRepository(Of ImportJob)
    Private Property _iSystem As IRepository(Of Models.System)
    Private Property _iSetting As IRepository(Of Setting)
    Private Property _iImportField As IRepository(Of ImportField)
    Private Property _iOneStripJob As IRepository(Of OneStripJob)
    Private Property _iScanList As IRepository(Of ScanList)
    Private Property _iTabSet As IRepository(Of TabSet)
    Private Property _iTableTab As IRepository(Of TableTab)
    Private Property _iRelationship As IRepository(Of RelationShip)
    Private Property _iView As IRepository(Of View)
    Private Property _iSLTrackingSelectData As IRepository(Of SLTrackingSelectData)
    Private Property _iSLTextSearchItems As IRepository(Of SLTextSearchItem)
    Private Property _iSLRequestor As IRepository(Of SLRequestor)
    Private Property _iSLIndexer As IRepository(Of SLIndexer)
    Private Property _iSLAuditUpdate As IRepository(Of SLAuditUpdate)
    Private Property _iSLAuditUpdChildren As IRepository(Of SLAuditUpdChildren)
    Private Property _iTrackingHistory As IRepository(Of TrackingHistory)
    Private Property _iSLDestCertItem As IRepository(Of SLDestructCertItem)
    Private Property _iSLRetentionCode As IRepository(Of SLRetentionCode)
    Private Property _iSecureObject As IRepository(Of SecureObject)
    Private Property _iSecureObjectPermission As IRepository(Of SecureObjectPermission)
    Private Property _iSecureUser As IRepository(Of SecureUser)
    Private Property _iOutputSetting As IRepository(Of OutputSetting)
    Private Property _iVolume As IRepository(Of Volume)
    Private Property _iImageTablesList As IRepository(Of ImageTablesList)
    Private Property _iUserLink As IRepository(Of Userlink)
    Private Property _iTrackables As IRepository(Of Trackable)
    Private Property _iPCFilePointer As IRepository(Of PCFilesPointer)
    Private Property _iScanRule As IRepository(Of ScanRule)
    Private Property _iTrackingStatus As IRepository(Of TrackingStatu)
    Private Property _iAssetStatus As IRepository(Of AssetStatu)
    Dim _IDBManager As IDBManager = New DBManager
    'IDBManager As IDBManager, 
    Public Sub New(iTable As IRepository(Of Table),
                   iDatabase As IRepository(Of Databas),
                   iImportLoad As IRepository(Of ImportLoad),
                   iImportJob As IRepository(Of ImportJob),
                   iSystem As IRepository(Of Models.System),
                   iSetting As IRepository(Of Setting),
                   iImportField As IRepository(Of ImportField),
                   iOneStripJob As IRepository(Of OneStripJob),
                   iScanList As IRepository(Of ScanList),
                   iTabSet As IRepository(Of TabSet),
                   iTableTab As IRepository(Of TableTab),
                   iRelationship As IRepository(Of RelationShip),
                   iView As IRepository(Of View),
                    iSLTrackingSelectData As IRepository(Of SLTrackingSelectData),
                    iSLTextSearchItems As IRepository(Of SLTextSearchItem),
                    iSLRequestor As IRepository(Of SLRequestor),
                    iSLIndexer As IRepository(Of SLIndexer),
                    iSLAuditUpdate As IRepository(Of SLAuditUpdate),
                    iSLAuditUpdChildren As IRepository(Of SLAuditUpdChildren),
                    iTrackingHistory As IRepository(Of TrackingHistory),
                    iSLDestCertItem As IRepository(Of SLDestructCertItem),
                    iSLRetentionCode As IRepository(Of SLRetentionCode),
                    iSecureObject As IRepository(Of SecureObject),
                    iSecureObjectPermission As IRepository(Of SecureObjectPermission),
                    iSecureUser As IRepository(Of SecureUser),
                    iOutputSetting As IRepository(Of OutputSetting),
                    iVolume As IRepository(Of Volume),
                    iImageTablesList As IRepository(Of ImageTablesList),
                    iUserLink As IRepository(Of Userlink),
                    iTrackable As IRepository(Of Trackable),
                    iPCFilePointer As IRepository(Of PCFilesPointer),
                    iScanRule As IRepository(Of ScanRule),
                    iTrackingStatus As IRepository(Of TrackingStatu),
                    iAssetStatus As IRepository(Of AssetStatu)
                   )
        MyBase.New()
        '_IDBManager = IDBManager
        _iTables = iTable
        _iDatabas = iDatabase
        _iImportLoad = iImportLoad
        _iImportJob = iImportJob
        _iSystem = iSystem
        _iSetting = iSetting
        _iImportField = iImportField
        _iOneStripJob = iOneStripJob
        _iScanList = iScanList
        _iTabSet = iTabSet
        _iTableTab = iTableTab
        _iRelationship = iRelationship
        _iView = iView
        _iSLTrackingSelectData = iSLTrackingSelectData
        _iSLTextSearchItems = iSLTextSearchItems
        _iSLRequestor = iSLRequestor
        _iSLIndexer = iSLIndexer
        _iSLAuditUpdate = iSLAuditUpdate
        _iSLAuditUpdChildren = iSLAuditUpdChildren
        _iTrackingHistory = iTrackingHistory
        _iSLDestCertItem = iSLDestCertItem
        _iSLRetentionCode = iSLRetentionCode
        _iSecureObject = iSecureObject
        _iSecureObjectPermission = iSecureObjectPermission
        _iSecureUser = iSecureUser
        _iOutputSetting = iOutputSetting
        _iVolume = iVolume
        _iImageTablesList = iImageTablesList
        _iUserLink = iUserLink
        _iTrackables = iTrackable
        _iPCFilePointer = iPCFilePointer
        _iScanRule = iScanRule
        _iTrackingStatus = iTrackingStatus
        _iAssetStatus = iAssetStatus
    End Sub
    ' GET: /Import

#Region "Import"

    Public Function Index() As PartialViewResult
        Session("iImportRefId") = Keys.GetUserId
        Return PartialView("_ImportMainForm")
    End Function

    Public Function GetImportDDL() As JsonResult
        Dim oImportDDLJSON As String = ""
        Try
            Dim importDDLList = Keys.GetImportDDL(_iImportLoad.All(), _iImportField.All())
            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            oImportDDLJSON = JsonConvert.SerializeObject(importDDLList, Formatting.Indented, Setting)
            Keys.ErrorType = "s"
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message
        End Try
        Return Json(New With {
                Key .errortype = Keys.ErrorType,
                Key .errorMessage = Keys.ErrorMessage,
                Key .oImportDDLJSON = oImportDDLJSON
                }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Sub GetConnStringForOLEDB(extension As String, ByRef connString As String, Optional headerFlag As Boolean = False, Optional Delimiter As Char = "", Optional uplodedFilePath As String = "")
        Try
            Dim sb As OleDbConnectionStringBuilder = New System.Data.OleDb.OleDbConnectionStringBuilder()
            Select Case extension
                Case ".mdb", ".accdb"
                    If (StrComp(extension, ".accdb", vbTextCompare) = 0) Then
                        sb.Provider = "Microsoft.ACE.OLEDB.12.0"
                        sb.DataSource = uplodedFilePath
                        ' connString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};"
                    Else
                        sb.Provider = "Microsoft.Jet.OLEDB.4.0"
                        sb.DataSource = uplodedFilePath
                        ' connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};"
                    End If
                    connString = sb.ToString
                    Exit Select
                Case ".xls", ".xlsx"
                    If (StrComp(extension, ".xls", vbTextCompare) = 0) Then
                        If (headerFlag) Then
                            sb.Provider = "Microsoft.Jet.OLEDB.4.0"
                            sb.DataSource = uplodedFilePath
                            sb.Add("Extended Properties", "Excel 8.0;HDR=YES;IMEX=1")
                            '  connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Excel 8.0;HDR=YES;IMEX=1';"
                        Else
                            sb.Provider = "Microsoft.Jet.OLEDB.4.0"
                            sb.DataSource = uplodedFilePath
                            sb.Add("Extended Properties", "Excel 8.0;HDR=NO;IMEX=1")
                            ' connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Excel 8.0;HDR=NO;IMEX=1';"
                        End If
                    Else
                        If (headerFlag) Then
                            sb.Provider = "Microsoft.ACE.OLEDB.12.0"
                            sb.DataSource = uplodedFilePath
                            sb.Add("Extended Properties", "Excel 12.0;HDR=YES;IMEX=1")
                            '  connString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties='Excel 12.0;HDR=YES;IMEX=1';"
                        Else
                            sb.Provider = "Microsoft.ACE.OLEDB.12.0"
                            sb.DataSource = uplodedFilePath
                            sb.Add("Extended Properties", "Excel 12.0;HDR=NO;IMEX=1")
                            ' connString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties='Excel 12.0;HDR=NO;IMEX=1';"
                        End If
                    End If
                    connString = sb.ToString
                    Exit Select
                Case ".dbf"
                    sb.Provider = "Microsoft.Jet.OLEDB.4.0"
                    sb.DataSource = uplodedFilePath
                    sb.Add("Extended Properties", "dBASE IV;User ID=Admin;Password=")
                    'connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties=dBASE IV;User ID=Admin;Password=;"
                    connString = sb.ToString
                    Exit Select
                Case ".txt", ".csv"
                    If (Delimiter = ",") Then
                        If (headerFlag) Then
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Text;HDR=YES;FMT=CsvDelimited';"
                        Else
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Text;HDR=NO;FMT=CsvDelimited';"
                        End If

                    ElseIf (Delimiter = Space(1)) Then
                        If (headerFlag) Then
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Text;HDR=Yes;IMEX=1;FMT=Delimited(" + Space(1) + ")\';"
                        Else
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Text;HDR=NO;IMEX=1;FMT=Delimited(" + Space(1) + " )\';"
                        End If
                    ElseIf (Delimiter = vbTab) Then
                        If (headerFlag) Then
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Text;HDR=YES;IMEX=1;FMT=TabDelimited';"
                        Else
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Text;HDR=NO;IMEX=1;FMT=TabDelimited';"
                        End If
                    ElseIf (Delimiter = ";") Then
                        If (headerFlag) Then
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties=""Text;HDR=YES;IMEX=1;FMT=Delimited(';')\"";"
                        Else
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties=""Text;HDR=NO;IMEX=1;FMT=Delimited(';')\"";"
                        End If
                    Else
                        If (headerFlag) Then
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Text;HDR=YES;IMEX=1;FMT=Delimited(" + Delimiter + ")\';"
                        Else
                            connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source={0};Extended Properties='Text;HDR=NO;IMEX=1;FMT=Delimited(" + Delimiter + ")\';"
                        End If
                    End If
                    connString = String.Format(connString, uplodedFilePath)
                    Exit Select
            End Select
        Catch ex As Exception
            Throw ex
        End Try

    End Sub

    Public Sub FindSheetType(extension As String, UplodedFilePath As String, ByRef sheetTableList As List(Of KeyValuePair(Of String, String)), ByRef SheetType As String, Optional ByRef exceptionFlag As Boolean = False)
        Try
            Dim connString As String = Nothing
            If (Not (extension.Equals(".csv") Or extension.Equals(".txt") Or extension.Equals(".dbf"))) Then
                GetConnStringForOLEDB(extension, connString,,, UplodedFilePath)
                Using excel_con As New OleDbConnection(connString)
                    excel_con.Open()
                    Dim count = excel_con.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, Nothing).Rows.Count
                    For m As Integer = 0 To count - 1
                        Dim sheetName As String = excel_con.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, Nothing).Rows(m)("TABLE_NAME").ToString()
                        Select Case extension
                            Case ".mdb", ".accdb"
                                If (StrComp(Left$(sheetName, 4), "msys", vbTextCompare) <> 0) Then
                                    sheetTableList.Add(New KeyValuePair(Of String, String)(sheetName, sheetName))
                                End If
                                Exit Select
                            Case ".xls", ".xlsx"
                                If ((Left$(sheetName, 1&) = "'") And (Right$(sheetName, 1&) = "'")) Then
                                    sheetName = Mid$(sheetName, 2&)
                                    sheetName = Left$(sheetName, Len(sheetName) - 1&)
                                End If
                                If (Right$(sheetName, 1) <> "_") Then
                                    If (Right$(sheetName, 1) = "$") Then
                                        sheetTableList.Add(New KeyValuePair(Of String, String)(sheetName, Left$(sheetName, Len(sheetName) - 1)))
                                        SheetType = "WorkSheet"
                                    Else
                                        sheetTableList.Add(New KeyValuePair(Of String, String)(sheetName, Left$(sheetName, Len(sheetName) - 1)))
                                        SheetType = "Named Range"
                                    End If
                                End If
                                Exit Select
                        End Select
                    Next
                    'excel_con.Close()
                End Using
            End If
        Catch ex As InvalidOperationException
            exceptionFlag = True
            Throw ex
        Catch ex As Exception
            exceptionFlag = False
            Throw ex
        End Try

    End Sub

    Public Function UploadSingleFile() As JsonResult
        Try
            Dim pfile As HttpPostedFileBase = Request.Files(0)
            Dim ImportLoadName = HttpContext.Request.Params("ImportLoadName")
            Dim UplodedFilePath As String
            Dim UplodedFileName As String = Path.GetFileName(pfile.FileName)
            Dim extension As String = Path.GetExtension(UplodedFileName)
            Dim ServerPath As String = ""
            Dim oImportLoad As ImportLoad = Nothing

            If (Not String.IsNullOrEmpty(ImportLoadName)) Then
                oImportLoad = _iImportLoad.All.Where(Function(m) m.LoadName.Trim.ToLower.Equals(ImportLoadName.Trim.ToLower)).FirstOrDefault
                If (oImportLoad IsNot Nothing) Then
                    'FUS-5700
                    Dim oFileName = If(String.IsNullOrEmpty(oImportLoad.TempInputFile), Path.GetFileName(oImportLoad.InputFile), Path.GetFileName(oImportLoad.TempInputFile))
                    If (oFileName.Trim().ToLower().Equals(UplodedFileName.Trim().ToLower())) Then
                        Dim sGUID As String = System.Guid.NewGuid.ToString()
                        ServerPath = Server.MapPath("~/ImportFiles/" + oImportLoad.LoadName.Trim().ToLower() + "/" + Session("UserName").ToString().Trim().ToLower() + "/" + sGUID + "/")

                        If (Not System.IO.Directory.Exists(ServerPath)) Then
                            System.IO.Directory.CreateDirectory(ServerPath)
                        End If

                        UplodedFilePath = Path.Combine(ServerPath, UplodedFileName)
                        pfile.SaveAs(UplodedFilePath)

                        If (extension.Equals(".txt") Or extension.Equals(".csv")) Then
                            Dim oSourcePath = Path.Combine(Path.GetDirectoryName(UplodedFilePath), "schema.ini")
                            Dim oDestinationPath = Path.Combine(ServerPath, "schema.ini")
                            If (System.IO.File.Exists(oSourcePath)) Then
                                System.IO.File.Copy(oSourcePath, oDestinationPath)
                            End If
                        End If

                        'oImportLoad.InputFile = UplodedFilePath
                        '_iImportLoad.Update(oImportLoad)
                        Session("ImportFilePath") = UplodedFilePath
                        'FUS-5700
                        If String.IsNullOrEmpty(oImportLoad.TempInputFile) Then
                            oImportLoad.TempInputFile = UplodedFilePath
                            _iImportLoad.Update(oImportLoad)
                        End If
                        Keys.ErrorType = "s"
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlSelectProperFile"), oFileName)
                        Exit Try
                    End If

                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("msgImportCtrlDoesNtExist")
                    Exit Try
                End If
                If IO.File.ReadAllText(UplodedFilePath).Length = 0 Then
                    IO.File.Delete(UplodedFilePath)
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgimportctrlisempty"), UplodedFileName)
                    Keys.ErrorType = "w"
                    Exit Try
                End If
            Else
                Keys.ErrorMessage = String.Format(Languages.Translation("msgimportctrlisempty"), UplodedFileName)
                Keys.ErrorType = "w"
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

    Public Function UploadFileAndRunLoad() As JsonResult
        Dim IsProcessLoad As Boolean = False
        Try
            Dim pfile As HttpPostedFileBase = Request.Files(0)
            Dim ImportLoadName = HttpContext.Request.Params("ImportLoadName")
            Dim UplodedFilePath As String = String.Empty
            Dim UplodedFileName As String = Path.GetFileName(pfile.FileName)
            Dim extension As String = Path.GetExtension(UplodedFileName)
            Dim ServerPath As String = ""
            Dim oImportLoad As ImportLoad = Nothing

            If (Not String.IsNullOrEmpty(ImportLoadName)) Then
                oImportLoad = _iImportLoad.All.Where(Function(m) m.LoadName.Trim.ToLower.Equals(ImportLoadName.Trim.ToLower)).FirstOrDefault
                If (oImportLoad IsNot Nothing) Then

                    Dim oFileName = If(String.IsNullOrEmpty(oImportLoad.TempInputFile), Path.GetFileName(oImportLoad.InputFile), Path.GetFileName(oImportLoad.TempInputFile))

                    If (oFileName.Trim().ToLower().Equals(UplodedFileName.Trim().ToLower())) Then
                        Dim sGUID As String = System.Guid.NewGuid.ToString()
                        ServerPath = Server.MapPath("~/ImportFiles/" + oImportLoad.LoadName.Trim().ToLower() + "/" + Session("UserName").ToString().Trim().ToLower() + "/" + sGUID + "/")

                        If (Not System.IO.Directory.Exists(ServerPath)) Then
                            System.IO.Directory.CreateDirectory(ServerPath)
                        End If

                        UplodedFilePath = Path.Combine(ServerPath, UplodedFileName)
                        pfile.SaveAs(UplodedFilePath)

                        If (extension.Equals(".txt") Or extension.Equals(".csv")) Then
                            Dim oSourcePath = Path.Combine(Path.GetDirectoryName(UplodedFilePath), "schema.ini")
                            Dim oDestinationPath = Path.Combine(ServerPath, "schema.ini")
                            If (System.IO.File.Exists(oSourcePath)) Then
                                System.IO.File.Copy(oSourcePath, oDestinationPath)
                            End If
                        End If

                        'oImportLoad.InputFile = UplodedFilePath
                        '_iImportLoad.Update(oImportLoad)                        
                        Session("ImportFilePath") = UplodedFilePath
                        If String.IsNullOrEmpty(oImportLoad.TempInputFile) Then
                            oImportLoad.TempInputFile = UplodedFilePath
                            _iImportLoad.Update(oImportLoad)
                        End If
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlSelectProperFile"), oFileName)
                        Exit Try
                    End If

                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("msgImportCtrlDoesNtExist")
                    Exit Try
                End If
                If IO.File.ReadAllText(UplodedFilePath).Length = 0 Then
                    IO.File.Delete(UplodedFilePath)
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlisEmpty"), UplodedFileName)
                    Keys.ErrorType = "w"
                    Exit Try
                Else
                    IsProcessLoad = True
                    Dim JSONObj = ProcessLoadForQuietProcessing(oImportLoad.LoadName)
                    Keys.ErrorType = JSONObj.Data.errortype
                    Keys.ErrorMessage = JSONObj.Data.message
                End If
            Else
                Keys.ErrorMessage = String.Format(Languages.Translation("msgimportctrlisempty"), UplodedFileName)
                Keys.ErrorType = "w"
            End If


        Catch ex As Exception
            Keys.ErrorMessage = ex.Message
            Keys.ErrorType = "e"
        End Try
        Return Json(New With {
                      Key .IsProcessLoad = IsProcessLoad,
                      Key .errortype = Keys.ErrorType,
                      Key .message = Keys.ErrorMessage
                   }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    <HttpPost>
    Public Function SendFileContent() As JsonResult
        Dim exceptionFlag As Boolean = False
        Dim context = HttpContext
        Dim sheetTableListJSON As String = ""
        Dim SheetTypeJSON As String = ""
        Dim OriginalInputFileJSON As String = ""
        Try
            Dim pfile As HttpPostedFileBase = Request.Files(0)
            Dim formatFlag = context.Request.Params("formatFlag")
            Dim ImportLoadName = context.Request.Params("ImportLoadName")

            Dim IsFirstTime = Convert.ToBoolean(formatFlag)
            If (IsFirstTime = True) Then
                If (TempData.ContainsKey("ImportFields")) Then
                    TempData.Remove("ImportLoad")
                End If
                If (TempData.ContainsKey("ImportLoad")) Then
                    TempData.Remove("ImportLoad")
                End If
            End If

            Dim UplodedFilePath As String
            Dim UplodedFileName As String = Path.GetFileName(pfile.FileName)
            Dim extension As String = Path.GetExtension(UplodedFileName)
            'Dim oInputFile As String = String.Empty
            Dim DirectoryFolder = Nothing
            Dim oImportLoad As ImportLoad = Nothing
            Dim oNewUser = False
            If (String.IsNullOrEmpty(extension)) Then
                extension = ".csv"
            End If
            extension = extension.Trim.ToLower()
            Dim ServerPath As String = ""
            If (TempData.ContainsKey("ImportLoad")) Then
                oImportLoad = TempData.Peek("ImportLoad")
                'If (Not String.IsNullOrEmpty(oImportLoad.InputFile)) Then
                If Not IsNothing(Session("ImportFilePath")) Then
                    'DirectoryFolder = oImportLoad.InputFile.Split(Path.DirectorySeparatorChar)
                    DirectoryFolder = Session("ImportFilePath").ToString().Split(Path.DirectorySeparatorChar)
                    If (DirectoryFolder(DirectoryFolder.Length - 3).Trim().ToLower().Equals(Session("UserName").ToString().Trim().ToLower())) Then
                        'ServerPath = Path.GetDirectoryName(oImportLoad.InputFile)
                        ServerPath = Path.GetDirectoryName(Session("ImportFilePath").ToString())
                        If (System.IO.Directory.Exists(ServerPath)) Then
                            For Each _file As String In System.IO.Directory.GetFiles(ServerPath)
                                System.IO.File.Delete(_file)
                            Next
                        End If
                    Else
                        oNewUser = True
                        Dim sGUID As String = System.Guid.NewGuid.ToString()
                        If (String.IsNullOrEmpty(oImportLoad.LoadName)) Then
                            ServerPath = Server.MapPath("~/ImportFiles/" + Session("UserName").ToString().Trim().ToLower() + "/" + Session("UserName").ToString().Trim().ToLower() + "/" + sGUID + "/")
                        Else
                            ServerPath = Server.MapPath("~/ImportFiles/" + oImportLoad.LoadName.Trim().ToLower() + "/" + Session("UserName").ToString().Trim().ToLower() + "/" + sGUID + "/")
                        End If
                    End If
                Else
                    Dim sGUID As String = System.Guid.NewGuid.ToString()
                    If (String.IsNullOrEmpty(oImportLoad.LoadName)) Then
                        ServerPath = Server.MapPath("~/ImportFiles/" + Session("UserName").ToString().Trim().ToLower() + "/" + Session("UserName").ToString().Trim().ToLower() + "/" + sGUID + "/")
                    Else
                        ServerPath = Server.MapPath("~/ImportFiles/" + oImportLoad.LoadName.Trim().ToLower() + "/" + Session("UserName").ToString().Trim().ToLower() + "/" + sGUID + "/")
                    End If
                End If
                '  oInputFile = Path.Combine(Path.GetDirectoryName(oImportLoad.InputFile), UplodedFileName)
            Else
                Dim sGUID As String = System.Guid.NewGuid.ToString()
                ServerPath = Server.MapPath("~/ImportFiles/" + Session("UserName").ToString().Trim().ToLower() + "/" + Session("UserName").ToString().Trim().ToLower() + "/" + sGUID + "/")
            End If

            If (Not System.IO.Directory.Exists(ServerPath)) Then
                System.IO.Directory.CreateDirectory(ServerPath)
            End If

            UplodedFilePath = Path.Combine(ServerPath, UplodedFileName)
            pfile.SaveAs(UplodedFilePath)

            If IO.File.ReadAllText(UplodedFilePath).Length = 0 Then
                IO.File.Delete(UplodedFilePath)
                Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlisEmpty"), UplodedFileName)
                Keys.ErrorType = "w"
                Exit Try
            End If

            Dim sheetTableList As New List(Of KeyValuePair(Of String, String))
            Dim SheetType As String = ""
            FindSheetType(extension, UplodedFilePath, sheetTableList, SheetType, exceptionFlag)
            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            OriginalInputFileJSON = JsonConvert.SerializeObject(UplodedFilePath, Formatting.Indented, Setting)
            sheetTableListJSON = JsonConvert.SerializeObject(sheetTableList, Formatting.Indented, Setting)
            SheetTypeJSON = JsonConvert.SerializeObject(SheetType, Formatting.Indented, Setting)
            Keys.ErrorType = "s"
            Keys.ErrorMessage = ""
        Catch ex As Exception
            If (exceptionFlag = True) Then
                Keys.ErrorMessage = Languages.Translation("msgImportCtrlProviderNotFound")
            Else
                Keys.ErrorMessage = ex.Message
            End If
            Keys.ErrorType = "e"
        End Try
        Return Json(New With {
                      Key .sheetTableListJSON = sheetTableListJSON,
                      Key .SheetTypeJSON = SheetTypeJSON,
                      Key .OriginalInputFileJSON = OriginalInputFileJSON,
                      Key .errortype = Keys.ErrorType,
                      Key .message = Keys.ErrorMessage
                   }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Sub SetDelimiterById(DelimiterId As String, ByRef DelimiterVal As String, ByRef Delimiter As String)
        Select Case DelimiterId
            Case "comma_radio"
                DelimiterVal = "CsvDelimited"
                Delimiter = ","
                Exit Select
            Case "Tab_radio"
                DelimiterVal = "TabDelimited"
                Delimiter = vbTab
                Exit Select
            Case "semicolon_radio"
                DelimiterVal = "Delimited(;)"
                Delimiter = ";"
                Exit Select
            Case "space_radio"
                DelimiterVal = "Delimited(" + Space(1) + ")"
                Delimiter = Space(1)
                Exit Select
            Case "other_radio"
                DelimiterVal = "Delimited(" + Delimiter + ")"
                Delimiter = Delimiter
                Exit Select
        End Select
    End Sub

    Private Function DetectEncoding(ByVal filename As String) As String
        Dim enc As String = ""

        If System.IO.File.Exists(filename) Then
            Dim filein As New System.IO.FileStream(filename, IO.FileMode.Open, IO.FileAccess.Read)
            If (filein.CanSeek) Then
                Dim bom(4) As Byte
                filein.Read(bom, 0, 4)
                If (((bom(0) = &HEF) And (bom(1) = &HBB) And (bom(2) = &HBF)) Or
                    ((bom(0) = &HFF) And (bom(1) = &HFE)) Or
                    ((bom(0) = &HFE) And (bom(1) = &HFF)) Or
                    ((bom(0) = &H0) And (bom(1) = &H0) And (bom(2) = &HFE) And (bom(3) = &HFF))) Then
                    enc = "Unicode"
                Else
                    enc = "ANSI"
                End If
                filein.Seek(0, System.IO.SeekOrigin.Begin)
            End If
            filein.Close()
        End If
        Return enc
    End Function

    Public Sub CreateINIFileForCSV(Delimiter As String, filepath As String, headerFlag As Boolean, Optional TempDataTable As DataTable = Nothing)
        Try
            Using sw As New IO.StreamWriter(Path.Combine(Path.GetDirectoryName(filepath), "schema.ini"), False, System.Text.Encoding.ASCII)
                sw.WriteLine("[{0}]", IO.Path.GetFileName(filepath))
                sw.WriteLine("ColNameHeader={0}", IIf(headerFlag, "TRUE", "FALSE"))
                sw.WriteLine("Format={0}", Delimiter)
                Dim extension As String = Path.GetExtension(filepath)

                If (Not String.IsNullOrEmpty(extension)) Then
                    If (extension.Trim.ToLower.Equals(".txt")) Then
                        sw.WriteLine("TextDelimiter='")
                        sw.WriteLine("CharacterSet=" + DetectEncoding(filepath))
                    End If
                End If

                If (TempDataTable IsNot Nothing) Then
                    Dim ColumnCount = TempDataTable.Columns.Count
                    Dim oImportFields As New List(Of ImportField)
                    oImportFields = TempData.Peek("ImportFields")
                    Dim ImportFieldCount = 0
                    If (oImportFields IsNot Nothing) Then
                        ImportFieldCount = oImportFields.Count
                    End If
                    If (ColumnCount <> 0) Then
                        Dim iCount = 0
                        If (headerFlag) Then
                            For index As Integer = 1 To TempDataTable.Columns.Count
                                If (Not String.IsNullOrEmpty(TempDataTable.Columns(index - 1).ColumnName)) Then
                                    TempDataTable.Columns(index - 1).ColumnName = TempDataTable.Columns(index - 1).ColumnName.Replace("""", "")
                                End If
                                If (ImportFieldCount <> 0) Then
                                    If (ImportFieldCount <= ColumnCount And iCount < ImportFieldCount) Then
                                        If (oImportFields(iCount).FieldName.Trim.Equals(SKIP_FIELD)) Then
                                            sw.WriteLine("Col" + index.ToString + "=""" + TempDataTable.Columns(index - 1).ColumnName + ":(Skipped)"" Text")
                                        ElseIf (oImportFields(iCount).FieldName.Contains("<<")) Then
                                            sw.WriteLine("Col" + index.ToString + "=""" + TempDataTable.Columns(index - 1).ColumnName + """ Text")
                                        Else
                                            sw.WriteLine("Col" + index.ToString + "=""" + TempDataTable.Columns(iCount).ColumnName + ":" + oImportFields(iCount).FieldName + """ Text")
                                        End If

                                        iCount = iCount + 1
                                    ElseIf (ImportFieldCount > ColumnCount) Then
                                        If (oImportFields(index - 1).FieldName.Trim.Equals(SKIP_FIELD)) Then
                                            sw.WriteLine("Col" + index.ToString + "=""" + TempDataTable.Columns(index - 1).ColumnName + ":(Skipped)"" Text")
                                        ElseIf (oImportFields(index - 1).FieldName.Contains("<<")) Then
                                            sw.WriteLine("Col" + index.ToString + "=""" + TempDataTable.Columns(index - 1).ColumnName + """ Text")
                                        Else
                                            sw.WriteLine("Col" + index.ToString + "=""" + TempDataTable.Columns(index - 1).ColumnName + ":" + oImportFields(index - 1).FieldName + """ Text")
                                        End If
                                    Else
                                        sw.WriteLine("Col" + index.ToString + "=""" + TempDataTable.Columns(index - 1).ColumnName + """ Text")
                                    End If
                                Else
                                    sw.WriteLine("Col" + index.ToString + "=""" + TempDataTable.Columns(index - 1).ColumnName + """ Text")
                                End If
                            Next
                        Else
                            For index As Integer = 1 To ColumnCount
                                If (ImportFieldCount <> 0) Then
                                    If (ImportFieldCount <= ColumnCount And iCount < ImportFieldCount) Then
                                        If (oImportFields(iCount).FieldName.Trim.Equals(SKIP_FIELD)) Then
                                            sw.WriteLine("Col" + index.ToString + "=""F" + index.ToString + ":(Skipped)"" Text")
                                        ElseIf (oImportFields(iCount).FieldName.Contains("<<")) Then
                                            sw.WriteLine("Col" + index.ToString + "=""F" + index.ToString + """ Text")
                                        Else
                                            sw.WriteLine("Col" + index.ToString + "=""F" + index.ToString + ":" + oImportFields(iCount).FieldName + """ Text")
                                        End If

                                        iCount = iCount + 1
                                    ElseIf (ImportFieldCount > ColumnCount) Then
                                        If (oImportFields(index - 1).FieldName.Trim.Equals(SKIP_FIELD)) Then
                                            sw.WriteLine("Col" + index.ToString + "=""F" + index.ToString + ":(Skipped)"" Text")
                                        ElseIf (oImportFields(index - 1).FieldName.Contains("<<")) Then
                                            sw.WriteLine("Col" + index.ToString + "=""F" + index.ToString + """ Text")
                                        Else
                                            sw.WriteLine("Col" + index.ToString + "=""F" + index.ToString + ":" + oImportFields(index - 1).FieldName + """ Text")
                                        End If
                                    Else
                                        sw.WriteLine("Col" + index.ToString + "=""F" + index.ToString + """ Text")
                                    End If
                                Else
                                    sw.WriteLine("Col" + index.ToString + "=""F" + index.ToString + """ Text")
                                End If
                            Next
                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            Throw ex.InnerException
        End Try

    End Sub

    Public Sub SetGridByDelimiter(TempDataTable As DataTable, ByRef dtExcelData As DataTable, DelimiterVal As String, filePath As String, headerFlag As Boolean, connString As String, numberOfRow As Integer, objectName As String)
        Try
            CreateINIFileForCSV(DelimiterVal, filePath, headerFlag, TempDataTable)
            Using excel_con As New OleDbConnection(connString)
                excel_con.Open()
                Dim query = (Convert.ToString("SELECT TOP " & numberOfRow & " * FROM [") & (objectName).Trim()) + "]"
                Using oda As New OleDbDataAdapter(query, excel_con)
                    oda.Fill(dtExcelData)
                End Using
            End Using
        Catch ex As Exception
            Throw
        End Try
    End Sub

    Public Function GetGridDataFromFile(filePath As String, Optional headerFlag As Boolean = False, Optional sCurrentLoad As String = Nothing, Optional numberOfRow As Integer = 10, Optional firstSheet As String = "", Optional DelimiterId As String = "", Optional Delimiter As String = "", Optional mbFixedWidth As Boolean = False, Optional formatFlag As Boolean = True) As JsonResult
        Try
            Dim GridColumnEntities = New List(Of GridColumns)()
            Dim dtExcelData As New DataTable()
            Dim TempDataTable As New DataTable()
            Dim connString As String = Nothing
            Dim extension As String = Path.GetExtension(filePath).ToLower
            Dim varObject As Object = ""
            Dim objectName As String = Path.GetFileName(filePath)
            Dim originalname As String = objectName
            Dim GridCaption As String = ""
            Dim sImportLoad As New ImportLoad
            Dim lstImportField As New List(Of ImportField)
            If (System.IO.File.Exists(filePath)) Then
                Dim DelimiterVal As String = ""
                If (extension.Equals(".csv") Or extension.Equals(".txt") Or extension.Equals(".dbf")) Then
                    Dim pathName As String = Path.GetDirectoryName(filePath)
                    SetDelimiterById(DelimiterId, DelimiterVal, Delimiter)
                    CreateINIFileForCSV(DelimiterVal, filePath, headerFlag)
                    GetConnStringForOLEDB(extension, connString, headerFlag, Delimiter, pathName)
                Else
                    GetConnStringForOLEDB(extension, connString, headerFlag, Delimiter, filePath)
                    objectName = firstSheet
                End If
                Using excel_con As New OleDbConnection(connString)
                    excel_con.Open()
                    Dim query = (Convert.ToString("SELECT TOP " & numberOfRow & " * FROM [") & (objectName).Trim()) + "]"
                    Using oda As New OleDbDataAdapter(query, excel_con)
                        oda.Fill(TempDataTable)
                    End Using
                    Dim objExtension = Path.GetExtension(objectName)

                    If (objExtension.Equals(".csv") Or objExtension.Equals(".txt")) Then
                        SetGridByDelimiter(TempDataTable, dtExcelData, DelimiterVal, filePath, headerFlag, connString, numberOfRow, objectName)
                    Else
                        If (TempDataTable IsNot Nothing) Then
                            Dim ColumnCount = TempDataTable.Columns.Count
                            Dim oImportFields As New List(Of ImportField)
                            oImportFields = TempData.Peek("ImportFields")
                            Dim ImportFieldCount = 0
                            If (oImportFields IsNot Nothing) Then
                                ImportFieldCount = oImportFields.Count
                            End If
                            If (ColumnCount <> 0) Then
                                Dim iCount = 0
                                For index As Integer = 1 To ColumnCount
                                    If (ImportFieldCount <> 0) Then
                                        If (ImportFieldCount <= ColumnCount And iCount < ImportFieldCount) Then
                                            If (oImportFields(iCount).FieldName.Trim.Equals(SKIP_FIELD)) Then
                                                TempDataTable.Columns(index - 1).ColumnName = TempDataTable.Columns(index - 1).ColumnName + ":(Skipped)"
                                            ElseIf (Not oImportFields(iCount).FieldName.Contains("<<")) Then
                                                TempDataTable.Columns(iCount).ColumnName = TempDataTable.Columns(iCount).ColumnName + ":" + oImportFields(iCount).FieldName
                                            End If
                                            iCount = iCount + 1
                                        ElseIf (ImportFieldCount > ColumnCount) Then
                                            If (oImportFields(index - 1).FieldName.Trim.Equals(SKIP_FIELD)) Then
                                                TempDataTable.Columns(index - 1).ColumnName = TempDataTable.Columns(index - 1).ColumnName + ":(Skipped)"
                                            ElseIf (Not oImportFields(index - 1).FieldName.Contains("<<")) Then
                                                TempDataTable.Columns(index - 1).ColumnName = TempDataTable.Columns(index - 1).ColumnName + ":" + oImportFields(index - 1).FieldName
                                            End If
                                        End If
                                    End If
                                Next
                            End If
                        End If
                        dtExcelData = TempDataTable.Copy()
                    End If
                    If (Not TempData Is Nothing) Then
                        If (TempData.ContainsKey("FileDataTable")) Then
                            TempData.Remove("FileDataTable")
                        End If
                        TempData("FileDataTable") = dtExcelData
                    End If
                    Select Case extension
                        Case ".mdb", ".accdb"
                            GridCaption = String.Format(Languages.Translation("tiImportCtrlSampleDataFromTbl"), objectName)
                            Exit Select
                        Case ".xls", ".xlsx"
                            If (Right$(objectName, 1) = "$") Then
                                GridCaption = String.Format(Languages.Translation("tiImportCtrlSampleDataFromWS"), Left$(objectName, Len(objectName) - 1))
                            Else
                                GridCaption = String.Format(Languages.Translation("tiImportCtrlSampleDataFromRange"), objectName)
                            End If
                            Exit Select
                        Case ".dbf"
                            Exit Select
                        Case ".txt", ".csv"
                            If (Not String.IsNullOrEmpty(objectName)) Then
                                GridCaption = String.Format(Languages.Translation("tiImportCtrlSampleDataFromFile"), originalname)
                            End If
                            Exit Select
                    End Select

                    Dim i As Integer = 0
                    If ((Not dtExcelData Is Nothing) And dtExcelData.Rows.Count >= 0) Then
                        For Each column As DataColumn In dtExcelData.Columns
                            Dim GridColumnEntity = New GridColumns()
                            GridColumnEntity.ColumnSrNo = i + 1
                            GridColumnEntity.ColumnId = i + 1
                            GridColumnEntity.ColumnName = column.ColumnName
                            GridColumnEntity.ColumnDisplayName = column.ColumnName
                            GridColumnEntity.ColumnDataType = column.DataType.Name
                            GridColumnEntity.ColumnMaxLength = column.MaxLength
                            GridColumnEntity.IsPk = column.Unique
                            GridColumnEntity.AutoInc = column.AutoIncrement
                            GridColumnEntities.Add(GridColumnEntity)
                            i = i + 1
                        Next
                        Dim lGridColumns = GridColumnEntities.[Select](Function(a) New With {
                                Key .srno = a.ColumnSrNo,
                                Key .name = a.ColumnName,
                                Key .displayName = a.ColumnDisplayName,
                                Key .dataType = a.ColumnDataType,
                                Key .maxLength = a.ColumnMaxLength,
                                Key .isPk = a.IsPk,
                                Key .autoInc = a.AutoInc
                                })
                        If (formatFlag) Then
                            If (TempData.ContainsKey("ImportLoad")) Then
                                TempData.Remove("ImportLoad")
                            End If
                            If (TempData.ContainsKey("ImportFields")) Then
                                TempData.Remove("ImportFields")
                            End If
                            If (sCurrentLoad <> "") Then
                                sImportLoad = _iImportLoad.All.Where(Function(m) m.LoadName.Trim.ToLower.Equals(sCurrentLoad.Trim.ToLower)).FirstOrDefault
                                lstImportField = _iImportField.All.Where(Function(m) m.ImportLoad.Trim.ToLower.Equals(sCurrentLoad.Trim.ToLower)).ToList
                            End If
                            TempData("ImportFields") = lstImportField
                            TempData("ImportLoad") = sImportLoad
                        End If
                        Dim Setting = New JsonSerializerSettings
                        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                        Dim jsonObject = JsonConvert.SerializeObject(lGridColumns, Formatting.Indented, Setting)
                        Dim GridCaptionJSON = JsonConvert.SerializeObject(GridCaption, Formatting.Indented, Setting)
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = ""
                        Return Json(New With {
                             Key .jsonObject = jsonObject,
                             Key .GridCaptionJSON = GridCaptionJSON,
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage
                            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
                    End If
                End Using
            Else
                Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlFileNotFound"), originalname)
                Keys.ErrorType = "w"
            End If
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message
        End Try
        Return Json(New With {
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Function ConvertDataToGrid(sidx As String, sord As String, page As Integer, rows As Integer) As JsonResult
        Dim FileDT As New DataTable
        If (Not TempData Is Nothing) Then
            If (TempData.ContainsKey("FileDataTable")) Then
                FileDT = TempData.Peek("FileDataTable")
            End If
        End If
        Return Json(Common.ConvertDataTableToJQGridResult(FileDT, sidx, sord, page, rows), JsonRequestBehavior.AllowGet)
    End Function

    Public Function GetDestinationDDL(LoadName As String, strmsHoldName As String, RecordType As String, FirstRowHeader As Boolean, InputFile As String, TableSheetName As String, Id As Integer, Optional Delimiter As String = Nothing) As JsonResult
        Dim tableListJSON = ""
        Dim oImportLoadJSON As String = ""
        Try
            Dim myBasePage As New BaseWebPage
            Dim tableList As New List(Of KeyValuePair(Of String, String))
            Dim mTableList = _iTables.All.OrderBy(Function(m) m.TableName)
            'Reload Permissions dataset before loading destination DDL. Bug #680
            CollectionsClass.ReloadPermissionDataSet()

            If (Not String.IsNullOrEmpty(LoadName)) Then
                If (Not strmsHoldName.Trim.ToLower.Equals(LoadName.Trim.ToLower)) Then
                    Dim allImportLoad = _iImportLoad.All.OrderBy(Function(m) m.ID)
                    Dim IsExist = allImportLoad.Any(Function(m) m.LoadName.Trim.ToLower.Equals(LoadName.Trim.ToLower))
                    If (IsExist) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlLoadAlreadyExistsVal"), LoadName)
                        Exit Try
                    End If
                End If
            End If

            For Each tbObj As Table In mTableList
                Dim bDoNotAdd = CollectionsClass.IsEngineTable(tbObj.TableName.Trim.ToLower)
                Dim bDoNotAddImport = CollectionsClass.EngineTablesOkayToImportList.Contains(tbObj.TableName.Trim.ToLower)
                If ((Not bDoNotAdd) Or bDoNotAddImport) Then
                    If (myBasePage.Passport.CheckPermission(tbObj.TableName, Enums.SecureObjectType.Table, Enums.PassportPermissions.Import)) Then
                        tableList.Add(New KeyValuePair(Of String, String)(tbObj.TableName, tbObj.UserName))
                    End If
                End If
            Next
            For Each tableName As String In CollectionsClass.EngineTablesOkayToImportList
                Dim retentionObj = MakeSureIsALoadedTable(tableName)
                If (Not retentionObj Is Nothing) Then
                    Session(tableName.Trim.ToLower) = retentionObj
                End If
                If (myBasePage.Passport.CheckPermission(retentionObj.TableName, Enums.SecureObjectType.Table, Enums.PassportPermissions.Import)) Then
                    tableList.Add(New KeyValuePair(Of String, String)(retentionObj.TableName, retentionObj.UserName))
                End If
            Next

            If (myBasePage.Passport.CheckPermission(SECURE_TRACKING, Enums.SecureObjectType.Application, Enums.PassportPermissions.Access)) Then
                tableList.Add(New KeyValuePair(Of String, String)(IMPORT_TRACK, IMPORT_TRACK))
            End If
            Dim oImportLoad As New ImportLoad
            If (TempData.ContainsKey("ImportLoad")) Then
                oImportLoad = TempData.Peek("ImportLoad")
                If (RecordType.Trim.ToUpper.Equals("COMMA")) Then
                    If (String.IsNullOrWhiteSpace(Delimiter)) Then
                        oImportLoad.Delimiter = Nothing
                    Else
                        oImportLoad.Delimiter = Delimiter
                    End If
                End If
                oImportLoad.ID = Id
                oImportLoad.LoadName = LoadName
                If (Not String.IsNullOrEmpty(InputFile)) Then
                    'oImportLoad.InputFile = HttpUtility.UrlDecode(InputFile)
                    oImportLoad.TempInputFile = HttpUtility.UrlDecode(InputFile)
                End If

                oImportLoad.RecordType = RecordType
                oImportLoad.FirstRowHeader = FirstRowHeader
                If (String.IsNullOrEmpty(TableSheetName)) Then
                    oImportLoad.TableSheetName = Nothing
                Else
                    oImportLoad.TableSheetName = HttpUtility.UrlDecode(TableSheetName)
                End If
                TempData("ImportLoad") = oImportLoad
            End If
            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            tableListJSON = JsonConvert.SerializeObject(tableList, Formatting.Indented, Setting)
            oImportLoadJSON = JsonConvert.SerializeObject(oImportLoad, Formatting.Indented, Setting)
            Keys.ErrorType = "s"
            Keys.ErrorMessage = ""

        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ""
        End Try
        Return Json(New With {
                    Key .tableListJSON = tableListJSON,
                    Key .oImportLoadJSON = oImportLoadJSON,
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Sub AllowAttachmentLinking(ByRef flagAttach As Boolean)
        Try
            Dim settingObj = _iSetting.Where(Function(m) m.Section.Trim.ToLower.Equals(("Import").Trim.ToLower) AndAlso m.Item.Trim.ToLower.Equals(("AllowLinking").Trim.ToLower)).FirstOrDefault
            If (Not settingObj Is Nothing) Then
                If (settingObj.Id <> 0) Then
                    If (Len(settingObj.ItemValue) > 0&) Then
                        If (IsNumeric(settingObj.ItemValue)) Then
                            flagAttach = (CLng(settingObj.ItemValue) <> 0&)
                        Else
                            flagAttach = CBool(settingObj.ItemValue)
                        End If
                    End If
                End If
            End If
        Catch ex As Exception
            Throw ex.InnerException
        End Try
    End Sub

    <HttpPost, ValidateInput(False)>
    Public Function GetAvailableField(currentLoad As String, tableName1 As String, changeFlag As Boolean, Optional IsSkipField As Boolean = False) As JsonResult
        Dim tableListJSON As String = ""
        Dim flagImportByJSON As String = ""
        Dim flagOverwriteAddJSON As String = ""
        Try
            If (changeFlag) Then
                If (TempData.ContainsKey("ImportFields")) Then
                    TempData.Remove("ImportFields")
                End If
            End If
            Dim tableName As String = New JavaScriptSerializer().Deserialize(Of Object)(tableName1)
            Dim SelectedList As New List(Of KeyValuePair(Of String, String))
            Dim tbObj As Table
            Dim tableList As New List(Of KeyValuePair(Of String, String))
            Dim flagImportBy As Boolean = False
            Dim flagOverwriteAdd As Boolean = False
            Dim oSchemaColumns As List(Of SchemaColumns)
            Dim pSystemInfo = _iSystem.All.OrderBy(Function(m) m.Id).FirstOrDefault
            If (tableName.Trim.Equals(IMPORT_TRACK)) Then
                tableList.Add(New KeyValuePair(Of String, String)(TRACK_DEST, TRACK_DEST))
                tableList.Add(New KeyValuePair(Of String, String)(TRACK__OBJ, TRACK__OBJ))
                tableList.Add(New KeyValuePair(Of String, String)(TRACK_DATE, TRACK_DATE))
                tableList.Add(New KeyValuePair(Of String, String)(TRACK_OPER, TRACK_OPER))
                If (pSystemInfo.ReconciliationOn) Then
                    tableList.Add(New KeyValuePair(Of String, String)(TRACK_RECN, TRACK_RECN))
                End If
                If (pSystemInfo.DateDueOn = True) Then
                    tableList.Add(New KeyValuePair(Of String, String)(TRACK__DUE, TRACK__DUE))
                End If
                If (pSystemInfo.TrackingAdditionalField1Desc > "") Then
                    tableList.Add(New KeyValuePair(Of String, String)(TRACK_ADDIT_FIELD1, TRACK_ADDIT_FIELD1))
                End If
                If (pSystemInfo.TrackingAdditionalField2Desc > "") Then
                    tableList.Add(New KeyValuePair(Of String, String)(TRACK_ADDIT_FIELD2, TRACK_ADDIT_FIELD2))
                End If
                tableList.Add(New KeyValuePair(Of String, String)(SKIP_FIELD, SKIP_FIELD))
                flagImportBy = False
                flagOverwriteAdd = False
            Else
                flagImportBy = True
                flagOverwriteAdd = True
                Dim bDoNotAddImport = CollectionsClass.EngineTablesOkayToImportList.Contains(tableName.Trim.ToLower)
                If (bDoNotAddImport) Then
                    tbObj = Session(tableName.Trim.ToLower)
                Else
                    tbObj = _iTables.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower)).FirstOrDefault
                End If
                Dim pDatabaseEntity = _iDatabas.All.Where(Function(m) m.DBName.Trim.ToLower.Equals(tbObj.DBName.Trim.ToLower)).FirstOrDefault
                Dim sADOConn As ADODB.Connection

                If (Not pDatabaseEntity Is Nothing) Then
                    sADOConn = DataServices.DBOpen(pDatabaseEntity)
                Else
                    sADOConn = DataServices.DBOpen()
                End If
                oSchemaColumns = SchemaInfoDetails.GetSchemaInfo(tbObj.TableName, sADOConn)
                For Each schemaColObj As SchemaColumns In oSchemaColumns
                    If (Not SchemaInfoDetails.IsSystemField(schemaColObj.ColumnName)) Then
                        If (DatabaseMap.RemoveTableNameFromField(tbObj.RetentionFieldName).Equals(DatabaseMap.RemoveTableNameFromField(schemaColObj.ColumnName))) Then
                            tableList.Add(New KeyValuePair(Of String, String)(schemaColObj.ColumnName, schemaColObj.ColumnName))
                        Else
                            tableList.Add(New KeyValuePair(Of String, String)(schemaColObj.ColumnName, schemaColObj.ColumnName))
                        End If
                    End If
                Next
                tableList.Add(New KeyValuePair(Of String, String)(SKIP_FIELD, SKIP_FIELD))
                If (tbObj.Attachments) Then
                    tableList.Add(New KeyValuePair(Of String, String)(IMAGE_COPY, IMAGE_COPY))
                    tableList.Add(New KeyValuePair(Of String, String)(PCFILE_COPY, PCFILE_COPY))
                    Dim attachflag = False
                    AllowAttachmentLinking(attachflag)
                    If (attachflag) Then
                        tableList.Add(New KeyValuePair(Of String, String)(ATTMT_LINK, ATTMT_LINK))
                    End If
                End If
                Dim myBasePage As New BaseWebPage
                Dim boolval = myBasePage.Passport.CheckPermission(tbObj.TableName.Trim, Enums.SecureObjects.Table, Enums.PassportPermissions.Transfer)
                If (boolval) Then
                    tableList.Add(New KeyValuePair(Of String, String)(TRACK_DEST, TRACK_DEST))
                    tableList.Add(New KeyValuePair(Of String, String)(TRACK_DATE, TRACK_DATE))
                    tableList.Add(New KeyValuePair(Of String, String)(TRACK_OPER, TRACK_OPER))
                    If (pSystemInfo.DateDueOn = True) Then
                        tableList.Add(New KeyValuePair(Of String, String)(TRACK__DUE, TRACK__DUE))
                    End If
                    If (pSystemInfo.ReconciliationOn) Then
                        tableList.Add(New KeyValuePair(Of String, String)(TRACK_RECN, TRACK_RECN))
                    End If
                    If (pSystemInfo.TrackingAdditionalField1Desc > "") Then
                        tableList.Add(New KeyValuePair(Of String, String)(TRACK_ADDIT_FIELD1, TRACK_ADDIT_FIELD1))
                    End If
                    If (pSystemInfo.TrackingAdditionalField2Desc > "") Then
                        tableList.Add(New KeyValuePair(Of String, String)(TRACK_ADDIT_FIELD2, TRACK_ADDIT_FIELD2))
                    End If
                End If
            End If
            If (TempData.ContainsKey("ImportLoad")) Then
                Dim oImportLoad As ImportLoad
                oImportLoad = TempData.Peek("ImportLoad")
                oImportLoad.FileName = tableName
                TempData("ImportLoad") = oImportLoad
            End If
            If (IsSkipField) Then
                AddMemberToTempData(currentLoad, SKIP_FIELD)
            End If
            If (TempData.ContainsKey("ImportFields")) Then
                Dim lstImportFields As New List(Of ImportField)
                lstImportFields = TempData.Peek("ImportFields")
                If (lstImportFields.Count <> 0) Then
                    lstImportFields = lstImportFields.OrderBy(Function(m) m.ReadOrder).ToList
                    For Each importObj As ImportField In lstImportFields
                        For Each tableObj As KeyValuePair(Of String, String) In tableList.ToList
                            If (tableObj.Value.Trim.ToLower.Equals(importObj.FieldName.Trim.ToLower)) Then
                                If (tableObj.Key.Trim.Equals(("Selected").Trim())) Then
                                    tableList.Add(New KeyValuePair(Of String, String)("Selected", importObj.FieldName))
                                Else
                                    tableList.Remove(New KeyValuePair(Of String, String)(importObj.FieldName, importObj.FieldName))
                                    tableList.Add(New KeyValuePair(Of String, String)("Selected", importObj.FieldName))
                                End If
                                Exit For
                            End If
                        Next
                    Next
                End If
                Dim oSelected = tableList.Where(Function(m) m.Key.Trim().Equals("Selected"))
                Dim IsChanged = False
                If (oSelected.Count < lstImportFields.Count) Then
                    For Each oEach In lstImportFields
                        Dim oKeyValue = oSelected.Any(Function(m) m.Value.Trim().Equals(oEach.FieldName.Trim()))
                        If (oKeyValue = False) Then
                            Dim oImportField = _iImportField.Where(Function(m) m.FieldName.Trim().Equals(oEach.FieldName.Trim())).FirstOrDefault
                            If (oImportField IsNot Nothing) Then
                                _iImportField.Delete(oImportField)
                                IsChanged = True
                            End If
                        End If
                    Next
                    If (IsChanged = True) Then
                        Dim pImportField = _iImportField.All.Where(Function(m) m.ImportLoad.Trim.ToLower.Equals(currentLoad.Trim.ToLower)).OrderBy(Function(m) m.ReadOrder).ToList
                        Dim oReadOrder = 0
                        For Each oImportField In pImportField
                            oReadOrder = oReadOrder + 1
                            oImportField.ReadOrder = oReadOrder
                            _iImportField.Update(oImportField)
                        Next
                        lstImportFields = _iImportField.Where(Function(m) m.ImportLoad.Trim().ToLower().Equals(currentLoad.Trim().ToLower())).ToList()
                        TempData("ImportFields") = lstImportFields
                    End If
                End If

            End If
            If (Not tableList.Contains(New KeyValuePair(Of String, String)(SKIP_FIELD, SKIP_FIELD))) Then
                tableList.Add(New KeyValuePair(Of String, String)(SKIP_FIELD, SKIP_FIELD))
            End If

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            tableListJSON = JsonConvert.SerializeObject(tableList, Formatting.Indented, Setting)
            flagImportByJSON = JsonConvert.SerializeObject(flagImportBy, Formatting.Indented, Setting)
            flagOverwriteAddJSON = JsonConvert.SerializeObject(flagOverwriteAdd, Formatting.Indented, Setting)
            Keys.ErrorType = "s"
            Keys.ErrorMessage = ""

        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ""
        End Try
        Return Json(New With {
            Key .tableListJSON = tableListJSON,
            Key .flagImportByJSON = flagImportByJSON,
            Key .flagOverwriteAddJSON = flagOverwriteAddJSON,
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    <HttpPost, ValidateInput(False)>
    Public Function ValidateOnMoveClick(serializedForm As ImportField, currentLoad As String, AvailableVal1 As String, SelectObjString As String)
        Try
            Dim mAddInSelectList As String = ""
            Dim bHasImageCopy As Boolean = False
            Dim bHasPCFileCopy As Boolean = False
            Dim AvailableVal As String = New JavaScriptSerializer().Deserialize(Of Object)(AvailableVal1)
            If (Not String.IsNullOrEmpty(AvailableVal)) Then
                Dim SelectObjArray As Object = New JavaScriptSerializer().Deserialize(Of Object)(SelectObjString)
                Keys.ErrorType = "s"
                If (AvailableVal.Trim.ToUpper.Equals(ATTMT_LINK.Trim.ToUpper)) Then
                    For Each Str As String In SelectObjArray
                        If (Str.Trim.ToUpper.Equals(ATTMT_LINK.Trim.ToUpper)) Then
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlAlreadySelected"), ATTMT_LINK)
                            Keys.ErrorType = "w"
                            Exit Try
                        ElseIf (Str.Trim.ToUpper.Equals(IMAGE_COPY.Trim.ToUpper)) Then
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlNotImportTheSame"), IMAGE_COPY, ATTMT_LINK)
                            Keys.ErrorType = "w"
                            Exit Try
                        ElseIf (Str.Trim.ToUpper.Equals(PCFILE_COPY.Trim.ToUpper)) Then
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlNotImportTheSame"), PCFILE_COPY, ATTMT_LINK)
                            Keys.ErrorType = "w"
                            Exit Try
                        End If
                    Next
                End If

                If (AvailableVal.Trim.ToUpper.Equals(IMAGE_COPY.Trim.ToUpper)) Then
                    For Each Str As String In SelectObjArray
                        If (Str.Trim.ToUpper.Equals(IMAGE_COPY.Trim.ToUpper)) Then
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlAlreadySelected"), IMAGE_COPY)
                            Keys.ErrorType = "w"
                            Exit Try
                        ElseIf (Str.Trim.ToUpper.Equals(ATTMT_LINK.Trim.ToUpper)) Then
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlNotImportTheSame"), ATTMT_LINK, IMAGE_COPY)
                            Keys.ErrorType = "w"
                            Exit Try
                        ElseIf (Str.Trim.ToUpper.Equals(PCFILE_COPY.Trim.ToUpper)) Then
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlNotImportTheSame"), PCFILE_COPY, IMAGE_COPY)
                            Keys.ErrorType = "w"
                            Exit Try
                        End If
                    Next
                End If

                If (AvailableVal.Trim.ToUpper.Equals(PCFILE_COPY.Trim.ToUpper)) Then
                    For Each Str As String In SelectObjArray
                        If (Str.Trim.ToUpper.Equals(PCFILE_COPY.Trim.ToUpper)) Then
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlAlreadySelected"), PCFILE_COPY)
                            Keys.ErrorType = "w"
                            Exit Try
                        ElseIf (Str.Trim.ToUpper.Equals(ATTMT_LINK.Trim.ToUpper)) Then
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlNotImportTheSame"), ATTMT_LINK, PCFILE_COPY)
                            Keys.ErrorType = "w"
                            Exit Try
                        ElseIf (Str.Trim.ToUpper.Equals(IMAGE_COPY.Trim.ToUpper)) Then
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlNotImportTheSame"), IMAGE_COPY, PCFILE_COPY)
                            Keys.ErrorType = "w"
                            Exit Try
                        End If
                    Next
                End If

                If (AvailableVal.Trim.ToUpper.Equals(TRACK_DEST.Trim.ToUpper)) Then
                    For Each Str As String In SelectObjArray
                        If (Str.Trim.ToUpper.Equals(TRACK_DEST.Trim.ToUpper)) Then
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlAlreadySelected"), TRACK_DEST)
                            Keys.ErrorType = "w"
                            Exit Try
                        End If
                    Next
                End If
                AddMemberToTempData(currentLoad, AvailableVal)
            End If
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message
        End Try
        Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Sub AddMemberToTempData(currentLoad As String, addNewField As String)
        Try
            If (Not TempData.ContainsKey("ImportFields")) Then
                Dim lstImportField As New List(Of ImportField)
                TempData("ImportFields") = lstImportField
            End If
            Dim tempImportFields As New List(Of ImportField)
            tempImportFields = TempData.Peek("ImportFields")

            Dim sImportField As New ImportField
            Dim readOrder As Integer
            If (tempImportFields.Count = 0) Then
                readOrder = 1
            Else
                readOrder = tempImportFields.Max(Function(x) x.ReadOrder) + 1
            End If
            sImportField = SaveImportFields(currentLoad, addNewField, readOrder)
            tempImportFields.Add(sImportField)
            TempData("ImportFields") = tempImportFields
        Catch ex As Exception

        End Try
    End Sub

    Public Function SaveImportFields(loadName As String, addNewField As String, readOrder As Integer, Optional mbHandheldLoad As Boolean = False, Optional optDensoImport As Boolean = False) As ImportField
        Try
            Dim sImportField As New ImportField
            If (mbHandheldLoad) Then
                If (StrComp(addNewField, TRACK__DUE, vbTextCompare) = 0&) Then
                    If (optDensoImport) Then
                        sImportField.DateFormat = "mmddyyyy"
                    Else
                        sImportField.DateFormat = "mm/dd/yyyy"
                    End If
                ElseIf (StrComp(addNewField, TRACK_DATE, vbTextCompare) = 0&) Then
                    If (optDensoImport) Then
                        sImportField.DateFormat = "mmddyyyyhhmmss"
                    Else
                        sImportField.DateFormat = "mm/dd/yyyy hh:mm:ss"
                    End If
                End If
            End If
            sImportField.FieldName = addNewField
            sImportField.ImportLoad = loadName
            sImportField.ReadOrder = readOrder
            sImportField.SwingYear = 29&
            Return sImportField
        Catch ex As Exception
            Throw ex.InnerException
        End Try
    End Function

    <HttpPost, ValidateInput(False)>
    Public Function RemoveOnClick(removeAll As Boolean, Optional SelectObject1 As String = "", Optional arrSerialized As String = "")
        Try
            If (removeAll) Then
                RemoveMemberFromTempData()
                Keys.ErrorType = "s"
            Else
                Dim SelectObject As String = New JavaScriptSerializer().Deserialize(Of Object)(SelectObject1)
                If (Not String.IsNullOrEmpty(SelectObject)) Then
                    Keys.ErrorType = "s"
                    Dim SelectObjArray As Object = New JavaScriptSerializer().Deserialize(Of Object)(arrSerialized)
                    RemoveMemberFromTempData(SelectObject)
                End If
            End If
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message
        End Try
        Return Json(New With {
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Sub RemoveMemberFromTempData(Optional SelectObject As String = Nothing)
        Try
            If (TempData.ContainsKey("ImportFields")) Then
                Dim lstImportFields As New List(Of ImportField)
                lstImportFields = TempData.Peek("ImportFields")
                If (Not lstImportFields Is Nothing) Then
                    lstImportFields = lstImportFields.OrderBy(Function(m) m.ReadOrder).ToList
                    If (Not SelectObject Is Nothing) Then
                        Dim sImportField = lstImportFields.Where(Function(m) m.FieldName.Trim.ToUpper.Equals(SelectObject.Trim.ToUpper)).FirstOrDefault
                        Dim currentOrder = sImportField.ReadOrder
                        lstImportFields.Remove(sImportField)
                        For Each pImportFieldObj As ImportField In lstImportFields
                            If (pImportFieldObj.ReadOrder > currentOrder And pImportFieldObj.ReadOrder <> currentOrder) Then
                                pImportFieldObj.ReadOrder = currentOrder
                                currentOrder = currentOrder + 1
                            End If
                        Next
                        TempData("ImportFields") = lstImportFields
                    Else
                        TempData.Remove("ImportFields")
                    End If
                End If
            End If

        Catch ex As Exception
            Throw ex.InnerException
        End Try
    End Sub

    <HttpPost, ValidateInput(False)>
    Public Function ReorderImportField(selValue As String, increment As Integer, selIndex As Integer) As JsonResult
        Try
            If (TempData.ContainsKey("ImportFields")) Then
                Dim lstImportFields As New List(Of ImportField)
                lstImportFields = TempData.Peek("ImportFields")
                Dim actualVal As Integer
                Dim updateVal As Integer
                Dim selValue1 As String = New JavaScriptSerializer().Deserialize(Of Object)(selValue)
                Dim pImportField = lstImportFields.Where(Function(m) m.FieldName.Trim.ToUpper.Equals(selValue1.Trim.ToUpper) And m.ReadOrder = selIndex + 1).FirstOrDefault
                Dim reOrderVal = pImportField.ReadOrder

                If (increment = -1) Then
                    updateVal = reOrderVal - 1
                    actualVal = reOrderVal
                ElseIf (increment = 1) Then
                    updateVal = reOrderVal + 1
                    actualVal = reOrderVal
                End If
                Dim qImportField = lstImportFields.Where(Function(m) m.ReadOrder = updateVal).FirstOrDefault
                lstImportFields.Remove(pImportField)
                lstImportFields.Remove(qImportField)
                pImportField.ReadOrder = updateVal
                qImportField.ReadOrder = actualVal
                lstImportFields.Add(pImportField)
                lstImportFields.Add(qImportField)
                TempData("ImportFields") = lstImportFields
            End If
            Keys.ErrorMessage = ""
            Keys.ErrorType = "s"
        Catch ex As Exception
            Keys.ErrorMessage = ex.Message
            Keys.ErrorType = "e"
        End Try
        Return Json(New With {
    Key .errortype = Keys.ErrorType,
    Key .message = Keys.ErrorMessage
    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    <HttpPost, ValidateInput(False)>
    Public Function GetPropertyByType(sFieldName1 As String, sTableName1 As String) As JsonResult
        Dim pImportFieldJSON = ""
        Dim bAttachmentLinkJSON = ""
        Dim fieldIsDateJSON = ""
        Try
            Dim bAttachmentLink As Boolean
            Dim fieldIsDate As Boolean
            Dim oTable As Table
            Dim sTableName As String = New JavaScriptSerializer().Deserialize(Of Object)(sTableName1)
            Dim sFieldName As String = New JavaScriptSerializer().Deserialize(Of Object)(sFieldName1)
            Dim sAdoCon As ADODB.Connection = DataServices.DBOpen()
            Dim oSchemaColumn As List(Of SchemaColumns)
            If (TempData.ContainsKey("ImportFields")) Then
                Dim lstImportFields As New List(Of ImportField)
                lstImportFields = TempData.Peek("ImportFields")
                Dim pImportField = lstImportFields.Where(Function(m) m.FieldName.Trim.ToUpper.Equals(sFieldName.Trim.ToUpper)).FirstOrDefault
                If (Not pImportField Is Nothing) Then
                    bAttachmentLink = (StrComp(sFieldName, ATTMT_LINK, vbBinaryCompare) = 0&)
                    If ((Not sFieldName.Trim.ToLower.Equals(IMPORT_TRACK.Trim.ToLower)) And ((InStr(NON_FIELDS, "|" & sFieldName & "|") = 0))) Then
                        oTable = _iTables.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(sTableName.Trim.ToLower)).FirstOrDefault
                        If (Not oTable Is Nothing) Then
                            Dim oDatabase = _iDatabas.All.Where(Function(m) m.DBName.Trim.ToLower.Equals(oTable.DBName.Trim.ToLower)).FirstOrDefault
                            sAdoCon = DataServices.DBOpen(oDatabase)
                        End If
                        oSchemaColumn = SchemaInfoDetails.GetSchemaInfo(oTable.TableName, sAdoCon, DatabaseMap.RemoveTableNameFromField(sFieldName))
                        If (Not oSchemaColumn Is Nothing) Then
                            fieldIsDate = oSchemaColumn(0).IsADate
                        Else
                            fieldIsDate = False
                        End If
                    Else
                        fieldIsDate = InStr("|" & TRACK__DUE & TRACK_DATE & "|", sFieldName)
                    End If
                    Dim Setting = New JsonSerializerSettings
                    Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                    pImportFieldJSON = JsonConvert.SerializeObject(pImportField, Formatting.Indented, Setting)
                    bAttachmentLinkJSON = JsonConvert.SerializeObject(bAttachmentLink, Formatting.Indented, Setting)
                    fieldIsDateJSON = JsonConvert.SerializeObject(fieldIsDate, Formatting.Indented, Setting)
                End If
            End If
            Keys.ErrorMessage = ""
            Keys.ErrorType = "s"
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message
        End Try
        Return Json(New With {
                    Key .pImportFieldJSON = pImportFieldJSON,
                    Key .bAttachmentLinkJSON = bAttachmentLinkJSON,
                    Key .fieldIsDateJSON = fieldIsDateJSON,
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                    }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    <HttpPost, ValidateInput(False)>
    Public Function SaveImportProperties(formEntity As ImportField, sFieldName1 As String)
        Try
            If (TempData.ContainsKey("ImportFields")) Then
                Dim lstImportFields As New List(Of ImportField)
                lstImportFields = TempData.Peek("ImportFields")
                Dim sFieldName As String = New JavaScriptSerializer().Deserialize(Of Object)(sFieldName1)
                Dim pImportField = lstImportFields.Where(Function(m) m.FieldName.Trim.ToUpper.Equals(sFieldName.Trim.ToUpper)).FirstOrDefault
                lstImportFields.Remove(pImportField)
                If (Not pImportField Is Nothing) Then
                    If (Not formEntity.DateFormat Is Nothing) Then
                        pImportField.DateFormat = formEntity.DateFormat
                    End If
                    If (Not formEntity.DefaultValue Is Nothing) Then
                        pImportField.DefaultValue = formEntity.DefaultValue
                    Else
                        pImportField.DefaultValue = Nothing
                    End If
                    If (Not formEntity.EndPosition Is Nothing) Then
                        pImportField.EndPosition = formEntity.EndPosition
                    End If
                    If (Not formEntity.StartPosition Is Nothing) Then
                        pImportField.StartPosition = formEntity.StartPosition
                    End If
                    If (Not formEntity.ImportLoad Is Nothing) Then
                        pImportField.ImportLoad = formEntity.ImportLoad
                    End If
                    If (Not formEntity.ReadOrder Is Nothing) Then
                        pImportField.ReadOrder = formEntity.ReadOrder
                    End If
                    lstImportFields.Add(pImportField)
                End If
            End If
            Keys.ErrorType = "s"
            Keys.ErrorMessage = ""
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message
        End Try
        Return Json(New With {
               Key .errortype = Keys.ErrorType,
               Key .message = Keys.ErrorMessage
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Function CloseAllObject() As JsonResult
        Try
            If (Not TempData Is Nothing) Then
                If (TempData.ContainsKey("FileDataTable")) Then
                    TempData.Remove("FileDataTable")
                End If
                If (TempData.ContainsKey("ImportLoad")) Then
                    TempData.Remove("ImportLoad")
                End If
                If (TempData.ContainsKey("ImportFields")) Then
                    TempData.Remove("ImportFields")
                End If
                If (TempData.ContainsKey("ImportJobs")) Then
                    TempData.Remove("ImportJobs")
                End If
                Keys.ErrorType = "s"
                Keys.ErrorMessage = ""
            End If
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message
        End Try
        Return Json(New With {
                Key .errortype = Keys.ErrorType,
                Key .message = Keys.ErrorMessage
            }, JsonRequestBehavior.AllowGet)
    End Function

    <HttpPost, ValidateInput(False)>
    Public Function LoadTabInfoDDL(tableName1 As String) As JsonResult
        Dim OverwriteListJSON As String = ""
        Dim ImportByListJSON As String = ""
        Dim ImporLoadJSON As String = ""
        Dim DateDueJSON As String = ""
        Dim DisplayDateJSON As String = ""
        Dim ShowImageTabJSON As String = ""
        Try
            Dim tableName As String = New JavaScriptSerializer().Deserialize(Of Object)(tableName1)
            Dim otable = _iTables.All.Where(Function(m) m.TableName.Trim.ToLower.Equals(tableName.Trim.ToLower)).FirstOrDefault
            Dim oImportLoad As New ImportLoad
            Dim OverwriteList As New List(Of KeyValuePair(Of String, String))
            Dim ImportByList As New List(Of KeyValuePair(Of String, String))
            Dim DateDue As Boolean
            Dim oIdFieldName As String = Nothing
            Dim ShowImageTab As Boolean = False
            OverwriteList.Add(New KeyValuePair(Of String, String)(BOTH_DB_TEXT, BOTH_DISPLAY))
            OverwriteList.Add(New KeyValuePair(Of String, String)(OVERWRITE_DB_TEXT, OVERWRITE_DISPLAY))
            OverwriteList.Add(New KeyValuePair(Of String, String)(NEW_DB_TEXT, NEW_DISPLAY))
            OverwriteList.Add(New KeyValuePair(Of String, String)(NEW_SKIP_DB_TEXT, NEW_SKIP_DISPLAY))
            ImportByList.Add(New KeyValuePair(Of String, String)("0", IMPORTBY_NONE))
            If (TempData.ContainsKey("ImportLoad")) Then
                oImportLoad = TempData.Peek("ImportLoad")
                oIdFieldName = oImportLoad.IdFieldName
            End If
            If (TempData.ContainsKey("ImportFields")) Then
                Dim lstImportFields As New List(Of ImportField)
                lstImportFields = TempData.Peek("ImportFields")
                For Each sImportField As ImportField In lstImportFields
                    If ((InStr(NON_FIELDS, "|" & sImportField.FieldName & "|") = 0)) Then
                        ImportByList.Add(New KeyValuePair(Of String, String)(sImportField.FieldName, sImportField.FieldName))
                        If (oImportLoad IsNot Nothing) Then
                            If (oImportLoad.ID = 0) Then
                                If (otable IsNot Nothing) Then
                                    'Fixed - FUS-5848 by Nikunj
                                    'If (StrComp(sImportField.FieldName, DatabaseMap.RemoveTableNameFromField(otable.IdFieldName), vbTextCompare) = 0) Then
                                    '    oIdFieldName = sImportField.FieldName
                                    '    Exit For
                                    'End If
                                ElseIf (tableName.Trim.ToUpper.Equals("SLRETENTIONCODES") Or tableName.Trim.ToUpper.Equals("SLRETENTIONCITACODES")) Then
                                    If (StrComp(sImportField.FieldName, "Id", vbTextCompare) = 0) Then
                                        oIdFieldName = sImportField.FieldName
                                        Exit For
                                    End If
                                ElseIf (tableName.Trim.ToUpper.Equals("SLRETENTIONCITATIONS")) Then
                                    If (StrComp(sImportField.FieldName, "Citation", vbTextCompare) = 0) Then
                                        oIdFieldName = sImportField.FieldName
                                        Exit For
                                    End If
                                End If
                            End If
                        End If
                    End If
                Next

                For Each sImportField As ImportField In lstImportFields
                    If ((InStr(IMAGE_FIELDS, "|" & sImportField.FieldName & "|") <> 0)) Then
                        ShowImageTab = True
                        Exit For
                    End If
                Next
            End If

            If (Not String.IsNullOrEmpty(tableName)) Then
                If (oImportLoad IsNot Nothing) Then
                    oImportLoad.FileName = tableName
                    oImportLoad.IdFieldName = oIdFieldName
                    TempData("ImportLoad") = oImportLoad
                End If
            End If
            DateDue = _iSystem.All.FirstOrDefault.DateDueOn
            Dim DisplayDateStr As String = ""
            If (oImportLoad.DateDue IsNot Nothing) Then
                Dim DisplayDate As Date = Nothing
                DisplayDate = oImportLoad.DateDue
                DisplayDateStr = Keys.ConvertCultureDate(DisplayDate)
            End If

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            DisplayDateJSON = JsonConvert.SerializeObject(DisplayDateStr, Formatting.Indented, Setting)
            OverwriteListJSON = JsonConvert.SerializeObject(OverwriteList, Formatting.Indented, Setting)
            ImportByListJSON = JsonConvert.SerializeObject(ImportByList, Formatting.Indented, Setting)
            ImporLoadJSON = JsonConvert.SerializeObject(oImportLoad, Formatting.Indented, Setting)
            DateDueJSON = JsonConvert.SerializeObject(DateDue, Formatting.Indented, Setting)
            ShowImageTabJSON = JsonConvert.SerializeObject(ShowImageTab, Formatting.Indented, Setting)

            Keys.ErrorType = "s"
            Keys.ErrorMessage = ""
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message
        End Try
        Return Json(New With {
            Key .OverwriteListJSON = OverwriteListJSON,
            Key .ImportByListJSON = ImportByListJSON,
            Key .ImporLoadJSON = ImporLoadJSON,
            Key .DateDueJSON = DateDueJSON,
            Key .DisplayDateJSON = DisplayDateJSON,
            Key .ShowImageTabJSON = ShowImageTabJSON,
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Sub AddInImportLoad(ByRef dbImportLoad As ImportLoad, serializedForm As ImportLoad)
        Try
            dbImportLoad.ID = serializedForm.ID
            dbImportLoad.IdFieldName = serializedForm.IdFieldName
            'dbImportLoad.InputFile = serializedForm.InputFile
            dbImportLoad.TempInputFile = serializedForm.TempInputFile
            dbImportLoad.TableSheetName = serializedForm.TableSheetName
            dbImportLoad.TrackDestinationId = serializedForm.TrackDestinationId
            dbImportLoad.LoadName = serializedForm.LoadName
            dbImportLoad.RecordType = serializedForm.RecordType
            dbImportLoad.Delimiter = serializedForm.Delimiter
            dbImportLoad.Duplicate = serializedForm.Duplicate
            dbImportLoad.ReverseOrder = serializedForm.ReverseOrder
            dbImportLoad.ScanRule = serializedForm.ScanRule
            dbImportLoad.DirectFromHandheld = 0
            dbImportLoad.FromHandHeldEnum = 0
            dbImportLoad.DatabaseName = serializedForm.DatabaseName
            dbImportLoad.DateDue = serializedForm.DateDue
            dbImportLoad.FileName = serializedForm.FileName
            dbImportLoad.FirstRowHeader = serializedForm.FirstRowHeader
            dbImportLoad.SaveImageAsNewVersion = serializedForm.SaveImageAsNewVersion
            dbImportLoad.SaveImageAsNewVersionAsOfficialRecord = serializedForm.SaveImageAsNewVersionAsOfficialRecord
            dbImportLoad.SaveImageAsNewPage = serializedForm.SaveImageAsNewPage
            dbImportLoad.MaxDupCount = Nothing
            dbImportLoad.UpdateParent = 0
            dbImportLoad.DifferentImagePath = False
            dbImportLoad.RecordLength = serializedForm.RecordLength
        Catch ex As Exception
            Throw ex.InnerException
        End Try
    End Sub

    <HttpPost, ValidateInput(False)>
    Public Function GetImportLoadData(loadName As String) As JsonResult
        Dim exceptionFlag = False
        Dim oImportLoadJSON As String = ""
        Dim extensionJSON As String = ""
        Dim sheetTableListJSON As String = ""
        Dim SheetTypeJSON As String = ""
        Dim InputFileNameJSON As String = ""
        Try
            Dim oImportLoad As New ImportLoad
            Dim extension As String = ""
            Dim UplodedFilePath As String = ""
            Dim sheetTableList As New List(Of KeyValuePair(Of String, String))
            Dim SheetType As String = ""
            Dim InputFileName As String = ""
            If (Not String.IsNullOrEmpty(loadName)) Then
                If (TempData.ContainsKey("ImportLoad")) Then
                    TempData.Remove("ImportLoad")
                End If

                oImportLoad = _iImportLoad.Where(Function(m) m.LoadName.Trim.ToLower.Equals(loadName.Trim.ToLower)).FirstOrDefault
                If (Not oImportLoad Is Nothing) Then
                    TempData("ImportLoad") = oImportLoad
                    If (TempData.ContainsKey("ImportFields")) Then
                        TempData.Remove("ImportFields")
                    End If
                    Dim lstImportField As New List(Of ImportField)
                    If (Not String.IsNullOrEmpty(loadName)) Then
                        lstImportField = _iImportField.All.Where(Function(m) m.ImportLoad.Trim.ToLower.Equals(loadName.Trim.ToLower)).OrderBy(Function(m) m.ReadOrder).ToList
                    End If
                    TempData("ImportFields") = lstImportField
                    If ((oImportLoad.FromHandHeldEnum = 0 Or oImportLoad.FromHandHeldEnum Is Nothing) AndAlso Not String.IsNullOrEmpty(oImportLoad.TempInputFile)) Then
                        extension = Path.GetExtension(oImportLoad.TempInputFile)
                        InputFileName = Path.GetFileName(oImportLoad.TempInputFile)

                        If (String.IsNullOrEmpty(extension)) Then
                            extension = ".csv"
                        End If
                        UplodedFilePath = oImportLoad.TempInputFile.Trim
                        If (System.IO.File.Exists(UplodedFilePath)) Then
                            FindSheetType(extension.Trim.ToLower, UplodedFilePath, sheetTableList, SheetType, exceptionFlag)
                            extension = extension.Replace(".", "")
                            Keys.ErrorMessage = ""
                            Keys.ErrorType = "s"
                        Else
                            Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlFileNotFound"), Path.GetFileName(UplodedFilePath))
                            Keys.ErrorType = "p"
                        End If
                    ElseIf (oImportLoad.FromHandHeldEnum <> 0) Then
                        Keys.ErrorMessage = Languages.Translation("msgImportCtrlNeed2AcquireData")
                        Keys.ErrorType = "w"
                    ElseIf (String.IsNullOrEmpty(oImportLoad.TempInputFile)) Then
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlFileNotFound"), "")
                        Keys.ErrorType = "p"
                    End If
                End If
            End If
            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            oImportLoadJSON = JsonConvert.SerializeObject(oImportLoad, Formatting.Indented, Setting)
            extensionJSON = JsonConvert.SerializeObject(extension, Formatting.Indented, Setting)
            sheetTableListJSON = JsonConvert.SerializeObject(sheetTableList, Formatting.Indented, Setting)
            SheetTypeJSON = JsonConvert.SerializeObject(SheetType, Formatting.Indented, Setting)
            InputFileNameJSON = JsonConvert.SerializeObject(InputFileName, Formatting.Indented, Setting)
        Catch ex As Exception
            If (exceptionFlag = True) Then
                Keys.ErrorMessage = Languages.Translation("msgImportCtrlProviderNotFound")
            Else
                Keys.ErrorMessage = ex.Message
            End If
            Keys.ErrorType = "e"
        End Try
        Return Json(New With {
            Key .oImportLoadJSON = oImportLoadJSON,
            Key .extensionJSON = extensionJSON,
            Key .sheetTableListJSON = sheetTableListJSON,
            Key .SheetTypeJSON = SheetTypeJSON,
            Key .InputFileNameJSON = InputFileNameJSON,
            Key .errortype = Keys.ErrorType,
            Key .message = Keys.ErrorMessage
            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    <HttpPost, ValidateInput(False)>
    Public Function SaveImportLoadOnConfrim(serializedForm As ImportLoad,
                                            strmsHoldName As String,
                                            RecordType As String,
                                            pFirstRowHeader As Boolean,
                                            Delimiter As String,
                                            TableSheetName As String,
                                            pReverseOrder As Boolean,
                                            SaveAsNewVal As Integer) As JsonResult
        Try
            Dim oImportLoad As New ImportLoad
            If (TempData.ContainsKey("ImportLoad")) Then
                oImportLoad = TempData.Peek("ImportLoad")
                oImportLoad.ID = serializedForm.ID
                If (serializedForm.LoadName <> "") Then
                    oImportLoad.LoadName = serializedForm.LoadName
                End If
                If (RecordType.Trim.ToUpper.Equals("COMMA")) Then
                    If (String.IsNullOrWhiteSpace(Delimiter)) Then
                        oImportLoad.Delimiter = Nothing
                    Else
                        oImportLoad.Delimiter = Delimiter
                    End If
                End If

                'If (Not String.IsNullOrEmpty(serializedForm.InputFile)) Then
                '    oImportLoad.InputFile = HttpUtility.UrlDecode(serializedForm.InputFile)
                'End If

                If (Not String.IsNullOrEmpty(serializedForm.TempInputFile)) Then
                    oImportLoad.TempInputFile = HttpUtility.UrlDecode(serializedForm.TempInputFile)
                End If

                oImportLoad.RecordType = RecordType
                oImportLoad.FirstRowHeader = pFirstRowHeader
                oImportLoad.ReverseOrder = pReverseOrder
                oImportLoad.RecordLength = 0
                If (String.IsNullOrEmpty(TableSheetName)) Then
                    oImportLoad.TableSheetName = Nothing
                Else
                    oImportLoad.TableSheetName = HttpUtility.UrlDecode(TableSheetName)
                End If

                oImportLoad.TrackDestinationId = serializedForm.TrackDestinationId
                oImportLoad.DateDue = serializedForm.DateDue

                If ((serializedForm.ScanRule IsNot Nothing) And (Not String.IsNullOrEmpty(serializedForm.ScanRule))) Then
                    oImportLoad.ScanRule = serializedForm.ScanRule
                Else
                    oImportLoad.ScanRule = Nothing
                End If
                If (Not String.IsNullOrEmpty(serializedForm.Duplicate)) Then
                    oImportLoad.Duplicate = serializedForm.Duplicate
                Else
                    oImportLoad.Duplicate = BOTH_DB_TEXT
                End If

                If (String.IsNullOrEmpty(serializedForm.IdFieldName) Or serializedForm.IdFieldName = "0") Then
                    oImportLoad.IdFieldName = Nothing
                Else
                    oImportLoad.IdFieldName = serializedForm.IdFieldName
                End If

                Select Case SaveAsNewVal
                    Case 0
                        oImportLoad.SaveImageAsNewPage = False
                        oImportLoad.SaveImageAsNewVersion = False
                        oImportLoad.SaveImageAsNewVersionAsOfficialRecord = False
                        Exit Select
                    Case 1
                        oImportLoad.SaveImageAsNewPage = True
                        oImportLoad.SaveImageAsNewVersion = False
                        oImportLoad.SaveImageAsNewVersionAsOfficialRecord = False
                        Exit Select
                    Case 2
                        oImportLoad.SaveImageAsNewVersion = True
                        oImportLoad.SaveImageAsNewPage = False
                        oImportLoad.SaveImageAsNewVersionAsOfficialRecord = False
                        Exit Select
                    Case 3
                        oImportLoad.SaveImageAsNewVersionAsOfficialRecord = True
                        oImportLoad.SaveImageAsNewPage = False
                        oImportLoad.SaveImageAsNewVersion = False
                        Exit Select
                End Select
                If (oImportLoad.FromHandHeldEnum Is Nothing Or oImportLoad.FromHandHeldEnum = 0) Then
                    Dim basePage As New BaseWebPage
                    oImportLoad.DatabaseName = basePage.Passport.DatabaseName
                Else
                    oImportLoad.DatabaseName = oImportLoad.InputFile
                End If
            End If

            'If (Not String.IsNullOrEmpty(oImportLoad.InputFile)) Then
            If (Not IsNothing(Session("ImportFilePath"))) Then
                'Dim FoldersArray = oImportLoad.InputFile.Split(Path.DirectorySeparatorChar)
                Dim FoldersArray = Session("ImportFilePath").ToString().Split(Path.DirectorySeparatorChar)
                Dim oUserName = Session("UserName").ToString().Trim().ToLower()
                Dim oldDir = Path.GetDirectoryName(Session("ImportFilePath").ToString())
                Dim newDir = Server.MapPath("~/ImportFiles/" + oImportLoad.LoadName.Trim().ToLower() + "/" + oUserName + "/" + FoldersArray(FoldersArray.Length - 2))
                If (Not oldDir.Equals(newDir)) Then
                    If (System.IO.Directory.Exists(Session("ImportFilePath").ToString())) Then
                        FileIO.FileSystem.MoveDirectory(oldDir, newDir)
                        Dim oTemp = Server.MapPath("~/ImportFiles/" + oUserName)
                        Dim oTempSub = Path.Combine(oTemp, oUserName)
                        If System.IO.Directory.Exists(oTempSub) Then
                            For Each _folder As String In System.IO.Directory.GetDirectories(oTempSub)
                                If (_folder.Substring(_folder.Length - 10).Equals("Attachment")) Then
                                    Dim attachDir = Server.MapPath("~/ImportFiles/" + oImportLoad.LoadName.Trim().ToLower() + "/" + oUserName + "/Attachment")
                                    FileIO.FileSystem.MoveDirectory(_folder, attachDir)
                                Else
                                    For Each _file As String In System.IO.Directory.GetFiles(_folder)
                                        System.IO.File.Delete(_file)
                                    Next
                                    System.IO.Directory.Delete(_folder)
                                End If
                            Next
                        End If
                        If (System.IO.Directory.Exists(oTempSub)) Then
                            System.IO.Directory.Delete(oTempSub)
                        End If
                        If (System.IO.Directory.Exists(oTemp)) Then
                            System.IO.Directory.Delete(oTemp)
                        End If
                        'oImportLoad.InputFile = Path.Combine(newDir, FoldersArray(FoldersArray.Length - 1))
                        oImportLoad.TempInputFile = Path.Combine(newDir, FoldersArray(FoldersArray.Length - 1))
                    End If
                End If
            End If

            If (oImportLoad.ID <> 0) Then
                Dim dbImportLoad = _iImportLoad.All.Where(Function(m) m.ID = oImportLoad.ID).FirstOrDefault
                Dim dbImportFields = _iImportField.All.Where(Function(m) m.ImportLoad.Trim.ToLower.Equals(dbImportLoad.LoadName.Trim.ToLower))
                If (Not dbImportFields Is Nothing) Then
                    _iImportField.DeleteRange(dbImportFields)
                End If
                AddInImportLoad(dbImportLoad, oImportLoad)
                _iImportLoad.Update(dbImportLoad)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgModifiedImport")
            Else
                oImportLoad.DirectFromHandheld = 0
                oImportLoad.FromHandHeldEnum = 0
                oImportLoad.FileName = serializedForm.FileName
                oImportLoad.UpdateParent = 0
                oImportLoad.DifferentImagePath = False
                oImportLoad.MaxDupCount = Nothing
                _iImportLoad.Add(oImportLoad)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgNewImportAdded")
            End If
            If (TempData.ContainsKey("ImportFields")) Then
                Dim lstImportFields As List(Of ImportField) = TempData.Peek("ImportFields")
                For Each importFields As ImportField In lstImportFields
                    importFields.ImportLoad = oImportLoad.LoadName
                    _iImportField.Add(importFields)
                Next
                TempData.Remove("ImportFields")
            End If
            If (TempData.ContainsKey("ImportLoad")) Then
                TempData.Remove("ImportLoad")
            End If
            If (TempData.ContainsKey("FileDataTable")) Then
                TempData.Remove("FileDataTable")
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

    <HttpPost, ValidateInput(False)>
    Public Function SetTrackingInfo(serializedForm As ImportLoad, pReverseOrder As Boolean) As JsonResult
        Try
            If (TempData.ContainsKey("ImportLoad")) Then
                Dim oImportLoad As ImportLoad = TempData.Peek("ImportLoad")
                oImportLoad.TrackDestinationId = serializedForm.TrackDestinationId
                oImportLoad.DateDue = serializedForm.DateDue
                oImportLoad.Duplicate = serializedForm.Duplicate
                oImportLoad.IdFieldName = serializedForm.IdFieldName
                oImportLoad.ReverseOrder = pReverseOrder
                TempData("ImportLoad") = oImportLoad
            End If
            Keys.ErrorMessage = ""
            Keys.ErrorType = "s"
        Catch ex As Exception
            Keys.ErrorMessage = ex.Message
            Keys.ErrorType = "e"
        End Try
        Return Json(New With {
        Key .errortype = Keys.ErrorType,
        Key .message = Keys.ErrorMessage
        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Function SetImageInfo(serializedForm As ImportLoad, SaveAsNewVal As Integer) As JsonResult
        Try
            If (TempData.ContainsKey("ImportLoad")) Then
                Dim oImportLoad As ImportLoad = TempData.Peek("ImportLoad")
                If ((serializedForm.ScanRule IsNot Nothing) And (Not String.IsNullOrEmpty(serializedForm.ScanRule))) Then
                    oImportLoad.ScanRule = serializedForm.ScanRule
                Else
                    oImportLoad.ScanRule = Nothing
                End If
                Select Case SaveAsNewVal
                    Case 1
                        oImportLoad.SaveImageAsNewPage = True
                        oImportLoad.SaveImageAsNewVersion = False
                        oImportLoad.SaveImageAsNewVersionAsOfficialRecord = False
                        Exit Select
                    Case 2
                        oImportLoad.SaveImageAsNewVersion = True
                        oImportLoad.SaveImageAsNewPage = False
                        oImportLoad.SaveImageAsNewVersionAsOfficialRecord = False
                        Exit Select
                    Case 3
                        oImportLoad.SaveImageAsNewVersionAsOfficialRecord = True
                        oImportLoad.SaveImageAsNewPage = False
                        oImportLoad.SaveImageAsNewVersion = False
                        Exit Select
                End Select
                TempData("ImportLoad") = oImportLoad
            End If
            Keys.ErrorMessage = ""
            Keys.ErrorType = "s"
        Catch ex As Exception
            Keys.ErrorMessage = ex.Message
            Keys.ErrorType = "e"
        End Try
        Return Json(New With {
        Key .errortype = Keys.ErrorType,
        Key .message = Keys.ErrorMessage
        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Function CheckIfInUsed(currentLoad As String) As JsonResult
        Dim ActiveLoadListJSON As String = ""
        Try
            Keys.ErrorType = "w"
            Dim ActiveLoadList As New List(Of KeyValuePair(Of String, String))
            Dim currentJob As String = ""
            Dim bFlag As Boolean = False
            If (Not String.IsNullOrEmpty(currentLoad)) Then
                Dim sImportJob = _iImportJob.All.OrderBy(Function(m) m.JobName)
                If ((sImportJob IsNot Nothing) And (sImportJob.Count <> 0)) Then
                    currentJob = sImportJob.FirstOrDefault.JobName
                End If

                For Each importJobObj As ImportJob In sImportJob
                    If (Not String.IsNullOrEmpty(importJobObj.LoadName) And Not String.IsNullOrEmpty(currentLoad)) Then
                        If (StrComp(importJobObj.LoadName, currentLoad, vbTextCompare) = 0) Then
                            If (Not String.IsNullOrEmpty(importJobObj.JobName) And Not String.IsNullOrEmpty(currentJob)) Then
                                If ((Not bFlag) Or (Not importJobObj.JobName.Trim.ToLower.Equals(currentJob.Trim.ToLower))) Then
                                    ActiveLoadList.Add(New KeyValuePair(Of String, String)(importJobObj.JobName, "Job"))
                                    Keys.ErrorType = "r"
                                    Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlTheImportLoad"), currentLoad)
                                    currentJob = importJobObj.JobName.Trim
                                    bFlag = True
                                End If
                            End If
                        End If
                    End If
                Next
            End If
            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            ActiveLoadListJSON = JsonConvert.SerializeObject(ActiveLoadList, Formatting.Indented, Setting)
        Catch ex As Exception
            Keys.ErrorType = "e"
        End Try
        Return Json(New With {
        Key .ActiveLoadListJSON = ActiveLoadListJSON,
        Key .errortype = Keys.ErrorType,
        Key .message = Keys.ErrorMessage
        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Function RemoveImportLoad(currentLoad As String, currentLoadVal As String) As JsonResult
        Try
            If (Not String.IsNullOrEmpty(currentLoad)) Then
                If (currentLoad.Trim.Contains("[Job]")) Then
                    Dim oImportJob = _iImportJob.Where(Function(m) m.JobName.Trim.ToLower.Equals(currentLoadVal.Trim.ToLower))
                    If (Not oImportJob Is Nothing) Then
                        _iImportJob.DeleteRange(oImportJob)
                        Keys.ErrorMessage = Languages.Translation("msgImportCtrlJobDelSuccessfully")
                        Keys.ErrorType = "s"
                    End If
                Else
                    Dim oImportLoad = _iImportLoad.Where(Function(m) m.LoadName.Trim.ToLower.Equals(currentLoad.Trim.ToLower)).FirstOrDefault
                    If (Not oImportLoad Is Nothing) Then
                        If (Not String.IsNullOrEmpty(oImportLoad.LoadName)) Then
                            Dim dbImportFields = _iImportField.All.Where(Function(m) m.ImportLoad.Trim.ToLower.Equals(oImportLoad.LoadName.Trim.ToLower))
                            If (Not dbImportFields Is Nothing) Then
                                _iImportField.DeleteRange(dbImportFields)
                            End If
                        End If
                        _iImportLoad.Delete(oImportLoad)
                        Keys.ErrorMessage = Languages.Translation("msgImportCtrlLoadDelSuccessfully")
                        Keys.ErrorType = "s"
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
    'MOTI MASHIAH
    Public Function GetRecordsetOfLoadFile(oImportLoad As ImportLoad, Optional ByRef mcnImport As ADODB.Connection = Nothing) As ADODB.Recordset
        Try
            Dim mrsImport As New ADODB.Recordset
            Dim connString As String = Nothing
            Dim extension As String = String.Empty
            Dim LoadInputFile As String = String.Empty
            Dim oImportLoadFromJob As ImportJob = Nothing
            Dim oUseLoadInputFile As Boolean = True
            'extension = Path.GetExtension(oImportLoad.InputFile).ToLower
            'LoadInputFile = oImportLoad.InputFile
            If Not IsNothing(Session("ImportFilePath")) Then
                extension = Path.GetExtension(Session("ImportFilePath").ToString()).ToLower
                LoadInputFile = Session("ImportFilePath").ToString()
            End If

            Dim objectName As String = ""
            Dim Delimiter As String = ""
            If (extension.Equals(".csv") Or extension.Equals(".txt") Or extension.Equals(".dbf")) Then
                Dim DelimiterVal As String = ""
                SetDelValBydelimiter(oImportLoad.Delimiter, DelimiterVal, Delimiter)
                Dim pathName As String = Path.GetDirectoryName(LoadInputFile)
                GetConnStringForOLEDB(extension, connString, oImportLoad.FirstRowHeader, Delimiter, pathName)
                objectName = Path.GetFileName(LoadInputFile)
                If (Not objectName.Contains(".")) Then
                    objectName = objectName + ".csv"
                End If

                Dim TempDataTable As New DataTable()
                'fix for tab delimited.
                CreateINIFileForCSV(DelimiterVal, LoadInputFile, oImportLoad.FirstRowHeader, TempDataTable)
                Using excel_con As New OleDbConnection(connString)
                    excel_con.Open()
                    Dim query = (Convert.ToString("SELECT TOP 2 * FROM [") & (objectName).Trim()) + "]"
                    Using oda As New OleDbDataAdapter(query, excel_con)
                        oda.Fill(TempDataTable)
                    End Using
                End Using
                'CREAT THE INI FILE MOTI MASH
                CreateINIFileForCSV(DelimiterVal, LoadInputFile, oImportLoad.FirstRowHeader, TempDataTable)
            Else
                    GetConnStringForOLEDB(extension, connString, oImportLoad.FirstRowHeader, oImportLoad.Delimiter, LoadInputFile)
                If (Not String.IsNullOrEmpty(oImportLoad.TableSheetName)) Then
                    objectName = oImportLoad.TableSheetName
                Else
                    Dim sheetTableList As New List(Of KeyValuePair(Of String, String))
                    Dim SheetType As String = String.Empty
                    FindSheetType(extension, LoadInputFile, sheetTableList, SheetType)
                    If (sheetTableList IsNot Nothing) Then
                        objectName = sheetTableList.Item(0).Key
                    End If
                End If
            End If
            If (System.IO.File.Exists(LoadInputFile)) Then
                mcnImport = New ADODB.Connection
                mcnImport.ConnectionString = connString
                mcnImport.CursorLocation = ADODB.CursorLocationEnum.adUseClient
                mcnImport.Open()
                Dim sSQl = (Convert.ToString("SELECT * FROM [") & (objectName).Trim()) + "]"
                mrsImport.Open(sSQl, mcnImport, Enums.CursorTypeEnum.rmOpenStatic, Enums.LockTypeEnum.rmLockReadOnly, Enums.CommandTypeEnum.rmCmdText)
            End If
            Return mrsImport
        Catch ex As Exception
            Throw ex
        End Try

    End Function

    Public Sub SetDelValBydelimiter(importDelimiter As String, ByRef DelimiterVal As String, ByRef Delimiter As String)
        Try
            Select Case importDelimiter
                Case ","
                    DelimiterVal = "CsvDelimited"
                    Delimiter = ","
                    Exit Select
                Case "t"
                    DelimiterVal = "TabDelimited"
                    Delimiter = vbTab
                    Exit Select
                Case ";"
                    DelimiterVal = "Delimited(;)"
                    Delimiter = ";"
                    Exit Select
                Case Nothing
                    DelimiterVal = "Delimited(" + Space(1) + ")"
                    Delimiter = Space(1)
                    Exit Select
                Case Else
                    DelimiterVal = "Delimited(" + importDelimiter.Trim() + ")"
                    Delimiter = importDelimiter.Trim()
                    Exit Select
            End Select
        Catch ex As Exception
            Throw ex.InnerException
        End Try
    End Sub

    Private Sub LoadPaths(ByVal oVolumeId As Integer, ByRef sVolumePath As String)
        Dim sSQL As String
        Dim rsADO As ADODB.Recordset
        Dim sDriveLetterField As String = "PhysicalDriveLetter"
        Dim sTemp As String

        sTemp = System.Configuration.ConfigurationManager.AppSettings("DriveLetterField")

        If (Not (sTemp Is Nothing)) Then
            If (sTemp.Trim().Length() > 0) Then
                sDriveLetterField = sTemp
            End If
        End If
        sSQL = "SELECT  [Volumes].[Id]  as [VolumesId] ,[Volumes].[PathName] as [VolumesPath], [Volumes].[Online] as [VolumesOnline], [Volumes].[ImageTableName] as [VolumesImageTableName], [Volumes].[Name] as [VolumesName], [Volumes].[OfflineLocation] as [VolumesOfflineLocation], [SystemAddresses].[" + sDriveLetterField + "] as PhysicalDriveLetter FROM [Volumes] INNER JOIN [SystemAddresses] ON [Volumes].[SystemAddressesId] = [SystemAddresses].[Id]"
        rsADO = DataServices.GetADORecordSet(sSQL, DataServices.DBOpen())

        If (Not (rsADO Is Nothing)) Then
            Do Until rsADO.EOF
                If (rsADO.Fields("VolumesId").Value = oVolumeId) Then
                    'Set Path...
                    sVolumePath = Trim(rsADO.Fields("PhysicalDriveLetter").Text) & Trim(rsADO.Fields("VolumesPath").Text)
                    If ((Right(sVolumePath, 1) <> "\")) Then
                        sVolumePath = sVolumePath & "\"
                    End If

                    If (Right(sVolumePath, 1) <> "\") Then
                        sVolumePath = sVolumePath & "\"
                    Else
                        sVolumePath = sVolumePath
                    End If
                    rsADO.Close()
                    Exit Do
                End If
                rsADO.MoveNext()
            Loop
        End If
    End Sub

    Public Function FillOutputSetting(serializedForm As ImportLoad, pReverseOrder As Boolean) As JsonResult
        Dim JSONResult = ""
        Dim ImportLoadJSON = ""
        Try
            Dim basePage As New BaseWebPage
            Dim sDirectory As String
            Dim sImageTableName As String
            Dim oImageTableList As ImageTablesList
            Dim oOutputSettings As IQueryable(Of OutputSetting)
            Dim oVolumes As Volume
            Dim dt As New DataTable
            Dim oImportLoad As New ImportLoad
            dt.Columns.Add(New DataColumn("Id"))
            dt.Columns.Add(New DataColumn("Path"))
            dt.Columns.Add(New DataColumn("Prefix"))
            dt.Columns.Add(New DataColumn("ImageTable"))
            oOutputSettings = _iOutputSetting.All()
            For Each oOutputSetObj In oOutputSettings
                If ((oOutputSetObj.InActive = False) And (basePage.Passport.CheckPermission(oOutputSetObj.Id, Enums.SecureObjects.OutputSettings, Enums.PassportPermissions.Access))) Then
                    sImageTableName = ""
                    Dim VolumePath As String = ""
                    LoadPaths(oOutputSetObj.VolumesId, VolumePath)
                    If (VolumePath <> "\") Then
                        sDirectory = VolumePath
                    Else
                        sDirectory = ""
                    End If
                    oVolumes = _iVolume.All.Where(Function(m) m.Id = oOutputSetObj.VolumesId).FirstOrDefault
                    If (Not (oVolumes Is Nothing)) Then
                        If (Len(oVolumes.ImageTableName)) Then
                            oImageTableList = _iImageTablesList.Where(Function(m) m.TableName.Trim.ToLower.Equals(oVolumes.ImageTableName)).FirstOrDefault
                            If (oImageTableList Is Nothing) Then
                                sImageTableName = oVolumes.ImageTableName
                            Else
                                If (oImageTableList.Id = 0) Then
                                    sImageTableName = oVolumes.ImageTableName
                                Else
                                    sImageTableName = oImageTableList.UserName
                                End If
                            End If

                            oImageTableList = Nothing
                            sDirectory = String.Format(Languages.Translation("msgImportCtrlStoreInDatabase"), sImageTableName)
                            sImageTableName = oVolumes.ImageTableName
                        End If
                    End If

                    oVolumes = Nothing
                    Dim dr As DataRow = dt.NewRow
                    dr("Id") = oOutputSetObj.Id
                    dr("Path") = sDirectory
                    dr("Prefix") = oOutputSetObj.FileNamePrefix
                    dt.Rows.Add(dr)
                End If
            Next
            If (TempData.ContainsKey("ImportLoad")) Then
                oImportLoad = TempData.Peek("ImportLoad")
            End If
            oImportLoad.Duplicate = serializedForm.Duplicate
            If (String.IsNullOrEmpty(serializedForm.IdFieldName) Or serializedForm.IdFieldName = "0") Then
                oImportLoad.IdFieldName = Nothing
            Else
                oImportLoad.IdFieldName = serializedForm.IdFieldName
            End If
            oImportLoad.ReverseOrder = pReverseOrder
            oImportLoad.DateDue = serializedForm.DateDue
            oImportLoad.TrackDestinationId = serializedForm.TrackDestinationId
            TempData("ImportLoad") = oImportLoad

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            JSONResult = JsonConvert.SerializeObject(dt, Formatting.Indented, Setting)
            ImportLoadJSON = JsonConvert.SerializeObject(oImportLoad, Formatting.Indented, Setting)
        Catch ex As Exception
            Throw ex.InnerException
        End Try
        Return Json(New With {Key .JSONResult = JSONResult,
                        Key .ImportLoadJSON = ImportLoadJSON,
                           Key .errortype = Keys.ErrorType,
                           Key .message = Keys.ErrorMessage
                          }, JsonRequestBehavior.AllowGet)
    End Function

    <HttpPost>
    Public Function AttachImages(file As Object) As ActionResult
        Dim ProcessLoad As Boolean = True
        Try
            Dim oImportLoad As New ImportLoad
            Dim BaseWebPageMain = New BaseWebPage()
            Dim DirectoryName As String = ""
            Dim oImportLoadName = HttpContext.Request.Params("ImportLoadName")
            oImportLoad = _iImportLoad.Where(Function(m) m.LoadName.Trim.ToLower.Equals(oImportLoadName.Trim.ToLower)).FirstOrDefault
            If (oImportLoad IsNot Nothing) Then
                'If (Not String.IsNullOrEmpty(oImportLoad.InputFile)) Then
                If Not IsNothing(Session("ImportFilePath")) Then
                    'DirectoryName = Path.GetDirectoryName(oImportLoad.InputFile)
                    DirectoryName = Path.GetDirectoryName(Session("ImportFilePath").ToString())
                    Dim DirectoryFolder = DirectoryName.Split(Path.DirectorySeparatorChar)
                        DirectoryName = DirectoryName.Replace(DirectoryFolder(DirectoryFolder.Length - 1), "")
                        DirectoryName = DirectoryName + "Attachment"
                        If (Not System.IO.Directory.Exists(DirectoryName)) Then
                            System.IO.Directory.CreateDirectory(DirectoryName)
                        End If
                    End If

                    For Each pfilePath As String In Request.Files
                    Dim pfile As HttpPostedFileBase = Request.Files(pfilePath)
                    Dim filePath As String = Path.Combine(DirectoryName, pfilePath)
                    pfile.SaveAs(filePath)
                Next

                Dim JSONObj = ProcessLoadForQuietProcessing(oImportLoad.LoadName)
                Keys.ErrorType = JSONObj.Data.errortype
                Keys.ErrorMessage = JSONObj.Data.message
            Else
                ProcessLoad = False
                Keys.ErrorType = "w"
                Keys.ErrorMessage = Languages.Translation("msgImportCtrlDoesNtExist")
            End If
        Catch ex As Exception
            ProcessLoad = False
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message.ToString()
        End Try

        Return Json(New With {
                Key .errortype = Keys.ErrorType,
                Key .message = Keys.ErrorMessage
            }, JsonRequestBehavior.AllowGet)
    End Function

    Public Function ProcessLoadForQuietProcessing(currentLoadName As String) As JsonResult
        Dim mcnImport As ADODB.Connection = Nothing
        Dim oImportLoad As ImportLoad = Nothing
        Dim _IDBManager As IDBManager = New ImportDBManager
        Dim _IDBManagerDefault As IDBManager = New ImportDBManager
        Try
            Dim mrsImport As New ADODB.Recordset
            Dim oTable As Table = Nothing
            Dim oSchemaColumns As New SchemaColumns
            Dim WillDelete As Boolean = False
            Dim tTracking As New TRACKDESTELEMENTS
            Dim lFieldIndex = -1
            Dim bTrackingOnly As Boolean
            Dim bAbort As Boolean
            Dim moTrackDestination = Nothing
            Dim sReturnMessage = ""
            Dim bAutoIncrementCheck As Boolean
            Dim bHasAutoIncrement As Boolean
            Dim maSkipFields As String() = {}
            Dim tableUserName As String
            Dim oOutputSettings As OutputSetting
            Dim oVolume As Volume
            Dim importFields As List(Of ImportField) = Nothing
            Dim myBasePage As New BaseWebPage
            Dim VolumePath As String = String.Empty
            Dim sDirectory As String = String.Empty
            Dim sImageTableName As String = String.Empty
            Dim LoadInputFile = String.Empty
            TrackingServices.StartTime = Now
            Dim recordErrorTrack As Integer = 0
            Dim errorFlag As Boolean = False
            Dim mlRecordsAdded As Integer = 0
            Dim mlRecordsChanged As Integer = 0
            Dim mlRecordsRead As Integer = 0
            Dim mlSQLHits As Integer = 0
            Dim recordIndex As Integer = -1
            Dim bContinue = True
            Dim errorIndex As Integer = 0
            Dim mbQuietProcessing As Boolean = True
            Dim upperTable As DataTable = Nothing
            Dim oTableTrackable As Boolean = False
            Dim oDefaultTrackingDest = Nothing
            Dim TrackingObjectDT = New DataTable
            Dim TrackingDestDT = New DataTable
            Dim IdDataTableForRetention = New DataTable
            Dim DataForUpdateTracking = New DataTable
            Dim oBarCodeTable As Table = Nothing
            Dim oDefaultTrackDestination As FoundBarCode = Nothing
            Dim bGoodConfig As Boolean = False
            '#Region "Get All Data"
            Dim data_iImportLoad As List(Of ImportLoad) = _iImportLoad.All().ToList()
            Dim data_iTables As List(Of Table) = _iTables.All().ToList()
            Dim data_iImportField As List(Of ImportField) = _iImportField.All().ToList()
            Dim data_iOutputSetting As List(Of OutputSetting) = _iOutputSetting.All().ToList()
            Dim data_iVolume As List(Of Volume) = _iVolume.All().ToList()
            Dim data_iImageTablesList As List(Of ImageTablesList) = _iImageTablesList.All().ToList()
            Dim data_iSystem As List(Of Models.System) = _iSystem.All().ToList()
            Dim data_iDatabas As List(Of Databas) = _iDatabas.All().ToList()
            Dim data_iScanList As List(Of ScanList) = _iScanList.All().ToList()
            Dim data_iView As List(Of Models.View) = _iView.All().ToList()
            Dim data_iTableTab As List(Of TableTab) = _iTableTab.All().ToList()
            Dim data_iTabSet As List(Of TabSet) = _iTabSet.All().ToList()
            Dim data_iRelationship As List(Of RelationShip) = _iRelationship.All().ToList()
            Dim data_iSLTrackingSelectData As List(Of SLTrackingSelectData) = _iSLTrackingSelectData.All().ToList()
            Dim data_iSecureUser As List(Of SecureUser) = _iSecureUser.All().ToList()
            Dim data_iSLRetentionCode As List(Of SLRetentionCode) = _iSLRetentionCode.All().ToList()
            Dim data_iSLDestCertItem As List(Of SLDestructCertItem) = _iSLDestCertItem.All().ToList()
            Dim data_iSLRequestor As List(Of SLRequestor) = _iSLRequestor.All().ToList()
            Dim data_iTrackingHistory As IQueryable(Of TrackingHistory) = _iTrackingHistory.All()
            Dim data_iSLTextSearchItems As List(Of SLTextSearchItem) = _iSLTextSearchItems.All().ToList()
            '#End Region
            If (Not String.IsNullOrEmpty(currentLoadName)) Then
                oImportLoad = _iImportLoad.All().Where(Function(m) m.LoadName.Trim().ToLower().Equals(currentLoadName.Trim().ToLower())).FirstOrDefault
            End If

            If (Not String.IsNullOrEmpty(oImportLoad.LoadName)) Then
                If (Not oImportLoad Is Nothing) Then
                    If (oImportLoad.FromHandHeldEnum <> 0) Then
                        Keys.ErrorMessage = Languages.Translation("msgJsImportNotSupportInWebApp")
                        Keys.ErrorType = "p"
                        Exit Try
                    Else
                        If Not IsNothing(Session("ImportFilePath")) Then
                            'If (Not String.IsNullOrEmpty(oImportLoad.InputFile)) Then
                            If (Not String.IsNullOrEmpty(Session("ImportFilePath").ToString())) Then
                                'LoadInputFile = oImportLoad.InputFile
                                LoadInputFile = Session("ImportFilePath").ToString()
                                If (System.IO.File.Exists(LoadInputFile)) Then
                                    bGoodConfig = True
                                Else
                                    'sReturnMessage = String.Format(Languages.Translation("msgImportCtrlImportFileNotExists"), Path.GetFileName(oImportLoad.InputFile))
                                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlImportFileNotExists"), Path.GetFileName(Session("ImportFilePath").ToString()))
                                    Keys.ErrorMessage = sReturnMessage
                                    Keys.ErrorType = "p"
                                    Exit Try
                                End If
                            Else
                                sReturnMessage = Languages.Translation("msgJsImportFileCudNotFound")
                                Keys.ErrorMessage = sReturnMessage
                                Keys.ErrorType = "p"
                                Exit Try
                            End If
                        End If

                        'Open the default connection
                        _IDBManagerDefault.ConnectionString = Keys.GetDBConnectionString()
                        _IDBManagerDefault.Open()

                        importFields = data_iImportField.Where(Function(m) m.ImportLoad.Trim.ToLower.Equals(oImportLoad.LoadName.Trim.ToLower)).ToList()
                        If (Not String.IsNullOrEmpty(oImportLoad.FileName)) Then
                            If (StrComp(oImportLoad.FileName, IMPORT_TRACK, vbTextCompare) <> 0) Then
                                Dim bDoNotAddImport = CollectionsClass.EngineTablesOkayToImportList.Contains(oImportLoad.FileName.Trim.ToLower)
                                If (bDoNotAddImport) Then
                                    Dim retentionObj = GetInfoUsingADONET.MakeSureIsALoadedTable(oImportLoad.FileName.Trim, _iSecureObject, _IDBManagerDefault)
                                    Session(oImportLoad.FileName.Trim.ToLower) = retentionObj
                                    oTable = Session(oImportLoad.FileName.Trim.ToLower)
                                Else
                                    oTable = data_iTables.Where(Function(m) m.TableName.Trim.ToLower.Equals(oImportLoad.FileName.Trim.ToLower)).FirstOrDefault
                                End If
                                bGoodConfig = (Not (oTable Is Nothing))
                            End If
                        End If
                        If (bGoodConfig) Then
                            If (Not importFields Is Nothing) Then
                                'If (importFields.Count = 0) Then
                                '    bGoodConfig = False
                                '    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlNoFieldSelected"), oImportLoad.LoadName)
                                '    Keys.ErrorMessage = sReturnMessage
                                '    Keys.ErrorType = "p"
                                '    Exit Try
                                'End If
                            Else
                                bGoodConfig = False
                                sReturnMessage = String.Format(Languages.Translation("msgImportCtrlNoFieldSelected"), oImportLoad.LoadName)
                                Keys.ErrorMessage = sReturnMessage
                                Keys.ErrorType = "p"
                                Exit Try
                            End If
                        End If

                        If (bGoodConfig) Then
                            Dim IsPCFile As Boolean = importFields.Any(Function(m) m.FieldName.Trim.Equals(PCFILE_COPY))
                            Dim IsImageFile As Boolean = importFields.Any(Function(m) m.FieldName.Trim.Equals(IMAGE_COPY))

                            If (IsPCFile OrElse IsImageFile) Then
                                If (StrComp(oImportLoad.FileName, IMPORT_TRACK, vbTextCompare) <> 0) AndAlso (Not myBasePage.Passport.CheckPermission(oTable.TableName, Enums.SecureObjects.Attachments, Enums.PassportPermissions.Add)) Then
                                    bGoodConfig = False
                                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlNoTableAdd"), oTable.UserName)
                                    Keys.ErrorMessage = sReturnMessage
                                    Keys.ErrorType = "p"
                                    Exit Try
                                End If

                                If (Not String.IsNullOrEmpty(oImportLoad.ScanRule)) Then
                                    oOutputSettings = data_iOutputSetting.Where(Function(m) m.Id.Trim.ToLower.Equals(oImportLoad.ScanRule.Trim.ToLower)).FirstOrDefault
                                    If (oOutputSettings IsNot Nothing) Then
                                        oVolume = data_iVolume.Where(Function(m) m.Id = oOutputSettings.VolumesId).FirstOrDefault
                                        If (oVolume IsNot Nothing) Then
                                            If (IsPCFile) Then
                                                If (Not String.IsNullOrEmpty(oVolume.ImageTableName)) Then
                                                    bGoodConfig = False
                                                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlPCFileNotFoundInTbl"), oVolume.ImageTableName)
                                                    Keys.ErrorMessage = sReturnMessage
                                                    Keys.ErrorType = "p"
                                                End If
                                            End If
                                        End If
                                        If (bGoodConfig) Then
                                            If (Trim$(oOutputSettings.Id) = "") Then
                                                bGoodConfig = False
                                                sReturnMessage = String.Format(Languages.Translation("msgImportCtrlOptSettingRequired"), oImportLoad.LoadName)
                                                Keys.ErrorMessage = sReturnMessage
                                                Keys.ErrorType = "p"
                                            ElseIf (Trim$(oOutputSettings.FileNamePrefix) = "") Then
                                                bGoodConfig = False
                                                sReturnMessage = String.Format(Languages.Translation("msgImportCtrlOptSettingNotValid"), oOutputSettings.Id)
                                                Keys.ErrorMessage = sReturnMessage
                                                Keys.ErrorType = "p"
                                            ElseIf (oOutputSettings.InActive) Then
                                                bGoodConfig = False
                                                sReturnMessage = String.Format(Languages.Translation("msgImportCtrlOptSettingNotActive"), oOutputSettings.Id)
                                                Keys.ErrorMessage = sReturnMessage
                                                Keys.ErrorType = "p"
                                            ElseIf (Not myBasePage.Passport.CheckPermission(oOutputSettings.Id, Enums.SecureObjects.OutputSettings, Enums.PassportPermissions.Access)) Then
                                                bGoodConfig = False
                                                sReturnMessage = String.Format(Languages.Translation("msgImportCtrlNoRights4OptSetting"), oOutputSettings.Id)
                                                Keys.ErrorMessage = sReturnMessage
                                                Keys.ErrorType = "p"
                                            Else
                                                If (oVolume Is Nothing) Then
                                                    bGoodConfig = False
                                                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlOptSetInValid"), oOutputSettings.Id)
                                                    Keys.ErrorMessage = sReturnMessage
                                                    Keys.ErrorType = "p"
                                                Else
                                                    If Not myBasePage.Passport.CheckPermission(oVolume.Name, Enums.SecureObjects.Volumes, Enums.PassportPermissions.Access) Then
                                                        bGoodConfig = False
                                                        sReturnMessage = String.Format(Languages.Translation("msgImportCtrlOptSetInValid"), oOutputSettings.Id)
                                                        Keys.ErrorMessage = sReturnMessage
                                                        Keys.ErrorType = "p"
                                                    ElseIf Not myBasePage.Passport.CheckPermission(oVolume.Name, Enums.SecureObjects.Volumes, Enums.PassportPermissions.Add) Then
                                                        bGoodConfig = False
                                                        sReturnMessage = String.Format(Languages.Translation("msgImportCtrlNoVolumeAdd"), oVolume.Name)
                                                        Keys.ErrorMessage = sReturnMessage
                                                        Keys.ErrorType = "p"
                                                    End If

                                                    oVolume = Nothing
                                                End If
                                            End If
                                        End If

                                        If (bGoodConfig) Then
                                            LoadPaths(oOutputSettings.VolumesId, VolumePath)
                                            If (VolumePath <> "\") Then
                                                sDirectory = VolumePath
                                            Else
                                                sDirectory = ""
                                            End If
                                            Dim oVolumes = data_iVolume.Where(Function(m) m.Id = oOutputSettings.VolumesId).FirstOrDefault
                                            If (Not (oVolumes Is Nothing)) Then
                                                If (Len(oVolumes.ImageTableName)) Then
                                                    Dim oImageTableList = data_iImageTablesList.Where(Function(m) m.TableName.Trim.ToLower.Equals(oVolumes.ImageTableName)).FirstOrDefault
                                                    If (oImageTableList Is Nothing) Then
                                                        sImageTableName = oVolumes.ImageTableName
                                                    Else
                                                        If (oImageTableList.Id = 0) Then
                                                            sImageTableName = oVolumes.ImageTableName
                                                        Else
                                                            sImageTableName = oImageTableList.UserName
                                                        End If
                                                    End If

                                                    oImageTableList = Nothing
                                                    sDirectory = String.Format(Languages.Translation("msgImportCtrlStoreInDatabase"), sImageTableName)
                                                    sImageTableName = oVolumes.ImageTableName
                                                End If
                                            End If
                                        End If
                                    Else
                                        bGoodConfig = False
                                        sReturnMessage = String.Format(Languages.Translation("msgImportCtrlOptSettingRequired"), oImportLoad.LoadName)
                                        Keys.ErrorMessage = sReturnMessage
                                        Keys.ErrorType = "p"
                                    End If
                                Else
                                    bGoodConfig = False
                                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlOptSettingRequired"), oImportLoad.LoadName)
                                    Keys.ErrorMessage = sReturnMessage
                                    Keys.ErrorType = "p"
                                End If
                            End If
                        End If

                        If (bGoodConfig) Then
                            mrsImport = GetRecordsetOfLoadFile(oImportLoad, mcnImport)
                            If (mrsImport.EOF And mrsImport.BOF) Then
                                bGoodConfig = False
                            Else
                                If (TempData.ContainsKey("ImportDataRS")) Then
                                    TempData.Remove("ImportDataRS")
                                End If
                                TempData("ImportDataRS") = mrsImport
                            End If
                        End If

                        If (bGoodConfig) Then
                            If (bContinue And recordIndex = -1) Then
                                mrsImport.MoveFirst()
                                If (oImportLoad.ReverseOrder) Then
                                    recordIndex = mrsImport.RecordCount - 1
                                    mrsImport.MoveLast()
                                End If
                                ' This portion to point record in recordset..Not required for quiet processing
                            ElseIf (bContinue And recordIndex <> -1) Then
                                If (oImportLoad.ReverseOrder = False) Then
                                    If (recordIndex >= mrsImport.RecordCount) Then
                                        If (recordErrorTrack <> 0) Then
                                            Keys.ErrorMessage = Languages.Translation("msgJsImportCompErrOccur")
                                            Keys.ErrorType = "e"
                                            Exit Try
                                        End If
                                    Else
                                        mrsImport.Move(recordIndex)
                                    End If
                                Else
                                    mrsImport.Move(recordIndex)
                                End If
                            End If
                            If (Not String.IsNullOrEmpty(oImportLoad.IdFieldName)) Then
                                If (oImportLoad.IdFieldName <> "0") Then
                                    Dim oImportField = importFields.Where(Function(m) m.FieldName.Trim.ToLower.Equals(oImportLoad.IdFieldName.Trim.ToLower)).FirstOrDefault()
                                    If (oImportField IsNot Nothing) Then
                                        lFieldIndex = oImportField.ReadOrder
                                    End If
                                End If
                            End If

                            If (StrComp(oImportLoad.FileName, IMPORT_TRACK, vbTextCompare) <> 0) Then
                                tableUserName = oTable.UserName
                                bTrackingOnly = False
                            Else
                                tableUserName = IMPORT_TRACK
                                bTrackingOnly = True
                            End If

                            If ((oImportLoad.DoReconciliation) And (data_iSystem.FirstOrDefault.ReconciliationOn)) Then
                                tTracking.bDoRecon = True
                            Else
                                tTracking.bDoRecon = False
                            End If
                            'Initialize Additional Tracking Fields
                            tTracking.sTrackingAdditionalField1 = ""
                            tTracking.sTrackingAdditionalField2 = ""

                            If (Not String.IsNullOrEmpty(oImportLoad.TrackDestinationId)) Then
                                moTrackDestination = GetInfoUsingADONET.BarCodeLookup(Nothing, data_iDatabas, data_iTables, data_iSystem, data_iScanList,
                                                                                      data_iView, data_iTableTab, data_iTabSet, data_iRelationship,
                                                                                      oImportLoad.TrackDestinationId,,,, _IDBManagerDefault, True)
                                If (Not (moTrackDestination Is Nothing)) Then
                                    If (moTrackDestination.oTable.TrackingTable > 0) Then
                                        moTrackDestination = moTrackDestination
                                    Else
                                        moTrackDestination = Nothing
                                    End If
                                End If
                            End If

                            If (oTable IsNot Nothing) Then
                                oTableTrackable = myBasePage.Passport.CheckPermission(oTable.TableName.Trim, Enums.SecureObjects.Table, Enums.PassportPermissions.Transfer)
                                If (Len(oTable.DefaultTrackingId) > 0&) Then
                                    If (Len(oTable.DefaultTrackingTable)) Then
                                        oBarCodeTable = data_iTables.Where(Function(m) m.TableName.Trim.ToLower.Equals(oTable.DefaultTrackingTable.Trim.ToLower)).FirstOrDefault
                                    End If
                                    oDefaultTrackDestination = GetInfoUsingADONET.BarCodeLookup(Nothing, data_iDatabas, data_iTables, data_iSystem, data_iScanList,
                                                                                              data_iView, data_iTableTab, data_iTabSet, data_iRelationship,
                                                                                              oTable.DefaultTrackingId, "", oBarCodeTable, , _IDBManagerDefault, True)
                                End If
                                If (Not String.IsNullOrEmpty(oTable.DBName)) Then
                                    Dim oDatabase = data_iDatabas.Where(Function(m) m.DBName.Trim.ToLower.Equals(oTable.DBName.Trim.ToLower)).FirstOrDefault
                                    'open the external db connection
                                    _IDBManager.ConnectionString = Keys.GetDBConnectionString(oDatabase)
                                    _IDBManager.Open()
                                End If
                            End If

                            Do While (bContinue)
                                sReturnMessage = String.Empty
                                If (mrsImport Is Nothing) Then
                                    bAbort = True
                                Else
                                    bAbort = (Not ImportLoadRecordForQuietProcessing(oImportLoad, importFields, oTable, moTrackDestination, lFieldIndex, bTrackingOnly, tTracking,
                                               sReturnMessage, bAutoIncrementCheck, bHasAutoIncrement, mlRecordsAdded, mlRecordsChanged, mbQuietProcessing,
                                               mlRecordsRead, mlSQLHits, maSkipFields, recordIndex, recordErrorTrack, errorIndex, errorFlag, tableUserName,
                                               sDirectory, data_iDatabas, data_iSystem, data_iSLTrackingSelectData, data_iTables, data_iScanList, data_iView,
                                               data_iTableTab, data_iTabSet, data_iRelationship, data_iSecureUser, data_iSLRetentionCode, data_iSLDestCertItem,
                                               data_iSLRequestor, data_iTrackingHistory, data_iOutputSetting, data_iSLTextSearchItems, oTableTrackable,
                                               VolumePath, oDefaultTrackDestination, _IDBManagerDefault, _IDBManager))
                                    mlRecordsRead = mlRecordsRead + 1
                                End If
                                If (oImportLoad.ReverseOrder = False) Then
                                    bContinue = Not (mrsImport.EOF And mrsImport.EOF)
                                    If (bContinue) Then
                                        mrsImport.MoveNext()
                                    End If
                                Else
                                    bContinue = Not (recordIndex = -1)
                                    If (bContinue) Then
                                        mrsImport.MovePrevious()
                                    End If
                                End If
                                Dim Setting = New JsonSerializerSettings
                                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                                If (bAbort = True) Then
                                    Exit Do
                                ElseIf (bAbort = False) Then
                                    If (sReturnMessage = "") Then
                                        If (oImportLoad.ReverseOrder) Then
                                            recordIndex = recordIndex - 1
                                        Else
                                            If (recordIndex = -1) Then
                                                recordIndex = recordIndex + 2
                                            Else
                                                recordIndex = recordIndex + 1
                                            End If
                                        End If
                                        WillDelete = True
                                    End If
                                End If
                                If (oImportLoad.ReverseOrder = False) Then
                                    bContinue = Not (mrsImport.EOF And mrsImport.EOF)
                                Else
                                    bContinue = Not (recordIndex = -1)
                                End If
                            Loop

                            WriteReportFile(oImportLoad, tableUserName, mlRecordsRead, mlRecordsAdded, mlRecordsChanged, mlSQLHits, recordErrorTrack)

                            If (bAbort = False) Then
                                If (mcnImport IsNot Nothing) Then
                                    mcnImport.Close()
                                    mcnImport = Nothing
                                End If

                                If (WillDelete And oImportLoad.DeleteSourceFile) Then
                                    If (System.IO.File.Exists(LoadInputFile)) Then
                                        System.IO.File.Delete(LoadInputFile)
                                        Dim DirectoryName = Path.GetDirectoryName(LoadInputFile)
                                        Dim schemaFile = DirectoryName + "\schema.ini"
                                        If (System.IO.File.Exists(schemaFile)) Then
                                            System.IO.File.Delete(schemaFile)
                                        End If
                                        System.IO.Directory.Delete(DirectoryName)
                                    End If
                                End If

                                Dim oHasAttachment = data_iImportField.Where(Function(m) m.ImportLoad.Trim().ToLower().Equals(oImportLoad.LoadName.Trim().ToLower())).Any(Function(m) m.FieldName.Trim().ToUpper().Equals(PCFILE_COPY) Or m.FieldName.Trim().ToUpper().Equals(IMAGE_COPY))
                                If (oHasAttachment) Then
                                    Dim _parentfolder = Path.GetDirectoryName(Path.GetDirectoryName(LoadInputFile))
                                    Dim oAttachmentPath = Path.Combine(_parentfolder, "Attachment")
                                    For Each _file As String In System.IO.Directory.GetFiles(oAttachmentPath)
                                        System.IO.File.Delete(_file)
                                    Next
                                End If
                            End If

                            If (bAbort = True) Then
                                Keys.ErrorMessage = sReturnMessage
                                Keys.ErrorType = "w"
                            Else
                                If (recordErrorTrack = 0) Then
                                    Keys.ErrorMessage = Languages.Translation("msgJsImportCompNoError")
                                    Keys.ErrorType = "s"
                                Else
                                    Keys.ErrorMessage = Languages.Translation("msgJsImportCompErrOccur")
                                    Keys.ErrorType = "e"
                                End If
                            End If
                        End If
                    End If
                Else
                    Keys.ErrorMessage = Languages.Translation("msgImportCtrlImportFileNotExistsMsg")
                    Keys.ErrorType = "p"
                    Exit Try
                End If
            End If
        Catch ex As Exception
            Keys.ErrorMessage = ex.Message
            Keys.ErrorType = "c"
            WriteErrorFile(oImportLoad, ex.Message, False, 0, ex)
        Finally
            If (mcnImport IsNot Nothing) Then
                mcnImport.Close()
            End If
            If (_IDBManager.Connection IsNot Nothing) Then
                _IDBManager.Dispose()
            End If
            If (_IDBManagerDefault.Connection IsNot Nothing) Then
                _IDBManagerDefault.Dispose()
            End If
        End Try
        Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

    End Function

    Public Function ImportLoadRecordForQuietProcessing(oImportLoad As ImportLoad, oImportFields As List(Of ImportField), oTable As Table, moTrackDestination As FoundBarCode,
                                     lFieldIndex As Integer, bTrackingOnly As Boolean, tTracking As TRACKDESTELEMENTS, ByRef sReturnMessage As String,
                                     ByRef bAutoIncrementCheck As Boolean, ByRef bHasAutoIncrement As Boolean, ByRef mlRecordsAdded As Long,
                                     ByRef mlRecordsChanged As Long, ByRef mbQuietProcessing As Boolean, ByRef mlRecordsRead As Long, ByRef mlSQLHits As Long,
                                     ByRef maSkipFields As String(), ByRef abortRecordIndex As Integer, ByRef recordErrorTrack As Integer, ByRef errorIndex As Integer,
                                     ByRef errorFlag As Boolean, ByVal tableUserName As String, ByVal sDirectory As String, data_iDatabas As List(Of Databas),
                                     data_iSystem As List(Of Models.System), data_iSLTrackingSelectData As List(Of SLTrackingSelectData),
                                     data_iTables As List(Of Table), data_iScanList As List(Of ScanList), data_iView As List(Of View),
                                     data_iTableTab As List(Of TableTab), data_iTabSet As List(Of TabSet), data_iRelationship As List(Of RelationShip),
                                     data_iSecureUser As List(Of SecureUser), data_iSLRetentionCode As List(Of SLRetentionCode), data_iSLDestCertItem As List(Of SLDestructCertItem),
                                     data_iSLRequestor As List(Of SLRequestor), data_iTrackingHistory As IQueryable(Of TrackingHistory), data_iOutputSetting As List(Of OutputSetting),
                                     data_iSLTextSearchItems As List(Of SLTextSearchItem), ByVal oTableTrackable As Boolean,
                                     VolumePath As String, oDefaultTrackDestination As FoundBarCode, _IDBManagerDefault As IDBManager,
                                     _IDBManager As IDBManager) As Boolean
        Dim bHoldTelxonMode As Boolean
        Dim dHoldTelxonDate As DateTime
        Dim sHoldTelxonUser As String = ""
        Dim mrsImport As New ADODB.Recordset
        Dim commonIDBManager As IDBManager = Nothing
        Try
            Dim myBasePage As New BaseWebPage
            Dim oSchemaColumn As New SchemaColumns
            Dim sSql As String
            Dim vDefaultValue As Object = Nothing
            Dim vFieldIndex As Object = Nothing
            Dim bRecordError As Boolean
            Dim oTrackObject As FoundBarCode = Nothing
            Dim dtRecords As DataTable = Nothing
            Dim lError As Integer = 0
            Dim bFound As Boolean = False
            Dim bDoAddNew As Boolean = False
            Dim oTrackDestination As FoundBarCode = Nothing
            Dim cFieldNames = New Collection
            Dim cFieldBeforeValues = New Collection
            Dim cFieldAfterValues = New Collection
            Dim currentImageName As String = ""
            Dim UpdatedRecordIdVal = ""
            Dim UpdateByFieldVal = ""
            bHoldTelxonMode = TrackingServices.TelxonModeOn
            dHoldTelxonDate = TrackingServices.ScanDateTime
            sHoldTelxonUser = TrackingServices.TelxonUserName
            Dim SchemaTable As DataTable = Nothing
            TrackingServices.ScanDateTime = Now
            TrackingServices.TelxonUserName = ""
            Dim ListOfClsFieldWithVal As New List(Of ClsFieldWithVal)()

            If (TempData.ContainsKey("ImportDataRS")) Then
                mrsImport = TempData.Peek("ImportDataRS")
            End If

            If (lFieldIndex <> -1) Then
                lFieldIndex = lFieldIndex - 1
            End If

            If (bTrackingOnly) Then
                bFound = True
                TrackingServices.TelxonModeOn = True
            Else
                If (oTable IsNot Nothing) Then
                    If (String.IsNullOrEmpty(oTable.DBName)) Then
                        commonIDBManager = _IDBManagerDefault
                    Else
                        commonIDBManager = _IDBManager
                    End If
                End If

                TrackingServices.TelxonModeOn = False
                If ((StrComp(oImportLoad.IdFieldName, IMPORTBY_NONE) = 0) Or lFieldIndex = -1) Then
                    sSql = "SELECT * FROM [" & oTable.TableName & "] WHERE 0 = 1"
                Else
                    SchemaTable = GetInfoUsingADONET.GetSchemaInfo(commonIDBManager, oTable.TableName, DatabaseMap.RemoveTableNameFromField(oImportLoad.IdFieldName))
                    sSql = "SELECT TOP 2 * FROM [" & oTable.TableName & "] WHERE " & oImportLoad.IdFieldName & " = "
                    vDefaultValue = oImportFields.Where(Function(m) m.FieldName.Trim.ToLower.Equals(oImportLoad.IdFieldName.Trim.ToLower)).FirstOrDefault.DefaultValue
                    If IsFunction(vDefaultValue) Then
                        vFieldIndex = ProcessFunctionValue(vDefaultValue)
                    Else
                        vFieldIndex = mrsImport.Fields(lFieldIndex).Value
                    End If
                    If (IsDBNull(vFieldIndex)) Then
                        vFieldIndex = 0
                    Else
                        StripQuotes(vFieldIndex)
                    End If

                    If (SchemaTable IsNot Nothing) Then
                        If (GetInfoUsingADONET.IsAStringForSchema(SchemaTable(0)("DATA_TYPE"))) Then
                            sSql = sSql & "'" & Replace(vFieldIndex, "'", "''") & "'"
                        Else
                            If (Len(Trim(vFieldIndex)) = 0&) Then
                                sReturnMessage = String.Format(Languages.Translation("msgImportCtrlImprtFldNotEmpty"), oImportLoad.IdFieldName)
                                errorIndex = 0
                                errorFlag = False
                                WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing)
                                ImportLoadRecordForQuietProcessing = False
                                Exit Function
                            End If
                            If (GetInfoUsingADONET.IsADateForSchema(SchemaTable(0)("DATA_TYPE"))) Then
                                sSql = sSql & "'" & vFieldIndex & "'"
                            Else
                                bRecordError = ((StrComp(oImportLoad.IdFieldName.Trim(), vFieldIndex, vbTextCompare) = 0&) And (mlRecordsRead = 0))
                                If (bRecordError) Then
                                    Dim errNum = 1
                                    If (errorIndex = errNum) Then
                                        errorFlag = True
                                    Else
                                        errorFlag = False
                                    End If
                                    errorIndex = errNum
                                    If (oImportLoad.ReverseOrder) Then
                                        abortRecordIndex = abortRecordIndex - 1
                                    Else
                                        abortRecordIndex = abortRecordIndex + 1
                                    End If
                                    sReturnMessage = Languages.Translation("msgImportCtrlNotMatchedDT")
                                    WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing)
                                    ImportLoadRecordForQuietProcessing = True
                                    Exit Function
                                End If
                                sSql = sSql & vFieldIndex & ""
                            End If
                        End If
                    End If
                    UpdateByFieldVal = vFieldIndex
                End If

                lError = 0
                dtRecords = GetInfoUsingADONET.GetADONETRecord(sSql, commonIDBManager, sReturnMessage, lError, oTable.TableName)
                If ((Not String.IsNullOrEmpty(sReturnMessage)) Or (dtRecords Is Nothing) Or (lError <> 0)) Then
                    errorIndex = 0
                    errorFlag = False
                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlErrWhileAddRec"), vbNewLine)
                    WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing)
                    ImportLoadRecordForQuietProcessing = False
                    Exit Function
                End If
                If (Not dtRecords Is Nothing) Then
                    bFound = (dtRecords.Rows.Count <> 0)
                End If

                If ((bFound) And ((oImportLoad.Duplicate = BOTH_DB_TEXT) Or (oImportLoad.Duplicate = OVERWRITE_DB_TEXT))) Then
                    If (dtRecords.Rows.Count > 1) Then
                        Dim errNum = 2
                        If (errorIndex = errNum) Then
                            errorFlag = True
                        Else
                            errorFlag = False
                        End If
                        errorIndex = errNum
                        If (oImportLoad.ReverseOrder) Then
                            abortRecordIndex = abortRecordIndex - 1
                        Else
                            abortRecordIndex = abortRecordIndex + 1
                        End If
                        sReturnMessage = Languages.Translation("msgImportCtrlManyRecWhich2Update")
                        WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing)
                        ImportLoadRecordForQuietProcessing = True
                        Exit Function
                    End If

                End If
                SetOverWriteError(oImportLoad.Duplicate, bDoAddNew, bFound, sReturnMessage, recordErrorTrack, errorIndex, errorFlag)

                If (sReturnMessage <> "") Then
                    If (oImportLoad.ReverseOrder) Then
                        abortRecordIndex = abortRecordIndex - 1
                    Else
                        abortRecordIndex = abortRecordIndex + 1
                    End If
                    WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                    ImportLoadRecordForQuietProcessing = True
                    Exit Function
                End If

                If ((bFound) And (oTableTrackable)) Then
                    oTrackObject = New FoundBarCode
                    'Start from here
                    oTrackObject.oTable = oTable
                    Dim sTrackingReturn = ""
                    If (Len(Trim$(tTracking.sDestination))) Then
                        sTrackingReturn = GetInfoUsingADONET.ValidateTracking(data_iDatabas, data_iTables, data_iSystem, data_iScanList, data_iView, data_iTableTab, data_iTabSet,
                                                           data_iRelationship, oTrackObject, oTrackDestination, tTracking.sDestination, False, , , _IDBManagerDefault, True)
                    ElseIf (Not (moTrackDestination Is Nothing)) Then
                        sTrackingReturn = GetInfoUsingADONET.ValidateTracking(data_iDatabas, data_iTables, data_iSystem, data_iScanList, data_iView, data_iTableTab, data_iTabSet,
                                                           data_iRelationship, oTrackObject, oTrackDestination, tTracking.sDestination, True, moTrackDestination, , _IDBManagerDefault, True)
                    End If

                    bFound = Trim$(sTrackingReturn) = ""

                    If (Not bFound) Then
                        oTrackObject = Nothing
                        oTrackDestination = Nothing
                        Dim errNum = 6
                        If (errorIndex = errNum) Then
                            errorFlag = True
                        Else
                            errorFlag = False
                        End If
                        errorIndex = errNum
                        If (oImportLoad.ReverseOrder) Then
                            abortRecordIndex = abortRecordIndex - 1
                        Else
                            abortRecordIndex = abortRecordIndex + 1
                        End If
                        sReturnMessage = sTrackingReturn
                        WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                        ImportLoadRecordForQuietProcessing = True
                        Exit Function
                    End If
                End If
            End If
            If (bFound) AndAlso oTable IsNot Nothing Then
                Dim result As ScriptReturn
                If (bDoAddNew) Then
                    If (Len(oTable.LSBeforeAddRecord) > 0) Then
                        result = ScriptEngine.RunScriptBeforeAdd(oTable.TableName, myBasePage.Passport)
                        bFound = result.Successful
                    End If
                Else
                    If (Len(oTable.LSBeforeEditRecord) > 0) Then
                        result = ScriptEngine.RunScriptBeforeEdit(oTable.TableName, vFieldIndex, myBasePage.Passport)
                        bFound = result.Successful
                    End If
                End If
            End If

            cFieldNames = New Collection
            cFieldBeforeValues = New Collection
            cFieldAfterValues = New Collection
            If (bFound) Then
                tTracking.sDestination = ""
                Dim lIndex As Integer = 0
                Dim sImportName As String
                Dim sFieldName As String
                Dim sDateFormat = ""
                Dim vSwingYear = ""
                Dim vField As Object = ""
                Dim sOCRText As String = ""
                Dim sTemp
                Dim bFoundTrackingSel As Boolean
                Dim oRelationShip As RelationShip
                Dim bFoundRelatedField As Boolean
                Dim asDelimitedText() As String
                Dim bDefaultRetentionCodeUsed As Boolean
                Dim sBeforeValue As String
                Dim sBeforeData As String = ""
                Dim sAfterData As String = ""
                Dim sMultiFieldName As String = ""
                Dim sFindFieldName As String
                Dim lCnt As Integer
                Dim sCitationCode As String = ""
                Dim sRetentionCode As String = ""
                Dim rsTestADO As ADODB.Recordset
                Dim rsTestADONET As DataTable
                Dim bRetentionDescriptionFound As Boolean
                Dim sTrackingReturn As String = ""
                Dim FieldNameCollection As New List(Of KeyValuePair(Of Integer, String))
                Dim sCounterName As String
                Dim sCounterValue As String
                Dim sFusionCounterValue As String
                Dim oTempSys As SystemCustModel = Nothing
                Dim sId As String = ""
                Dim oBarCodeTable As New Table
                Dim sTableName As String = ""
                Dim sImageName As String = ""
                Dim bImageCopyField As Boolean
                Dim bPCFileCopyField As Boolean
                Dim pDefaultValue As Object = Nothing

                For Each importFieldObj As ImportField In oImportFields.OrderBy(Function(m) m.ReadOrder)
                    FieldNameCollection.Add(New KeyValuePair(Of Integer, String)(importFieldObj.ReadOrder, importFieldObj.FieldName))
                Next
                ReDim asDelimitedText(0 To mrsImport.Fields.Count - 1)
                For iCount As Integer = 0 To mrsImport.Fields.Count - 1
                    Dim oFieldVal = mrsImport.Fields(iCount).Value
                    If (Not IsDBNull(oFieldVal)) Then
                        StripQuotes(oFieldVal)
                        asDelimitedText(iCount) = oFieldVal
                    End If
                Next
                Do While (lIndex < oImportFields.Count And lIndex < mrsImport.Fields.Count)
                    If (lIndex <= mrsImport.Fields.Count - 1) Then
                        sImportName = mrsImport.Fields(lIndex).Name
                    Else
                        sImportName = oImportFields.Where(Function(m) m.ReadOrder = lIndex + 1).FirstOrDefault.FieldName
                    End If
                    If (Not String.IsNullOrEmpty(sImportName)) Then
                        StripQuotes(sImportName)
                    End If

                    If (bTrackingOnly) Then
                        ReDim maSkipFields(0 To oImportFields.Count - 1)
                    Else
                        If (Not bAutoIncrementCheck) Then
                            ReDim maSkipFields(0 To oImportFields.Count - 1)

                            For lFieldIndex = 0& To oImportFields.Count - 1&
                                sFieldName = oImportFields.Where(Function(m) m.ReadOrder = lFieldIndex + 1).FirstOrDefault.FieldName()
                                If ((InStr(NON_FIELDS, "|" & sFieldName & "|") = 0)) Then
                                    If (StrComp(sFieldName, dtRecords.Columns(sFieldName).ColumnName, vbTextCompare) = 0&) Then
                                        If (dtRecords.Columns(sFieldName).AutoIncrement) Then
                                            bHasAutoIncrement = True
                                            maSkipFields(lFieldIndex) = SKIP_FIELD
                                        End If
                                    End If
                                End If
                            Next lFieldIndex
                            bAutoIncrementCheck = True
                        End If
                    End If

                    sFieldName = oImportFields.Where(Function(m) m.ReadOrder = lIndex + 1).FirstOrDefault.FieldName
                    If ((StrComp(sFieldName, SKIP_FIELD, vbTextCompare) <> 0&) And (StrComp(maSkipFields(lIndex), SKIP_FIELD, vbTextCompare) <> 0&)) Then
                        sDateFormat = oImportFields.Where(Function(m) m.ReadOrder = lIndex + 1).FirstOrDefault.DateFormat
                        pDefaultValue = oImportFields.Where(Function(m) m.ReadOrder = lIndex + 1).FirstOrDefault.DefaultValue
                        vSwingYear = oImportFields.Where(Function(m) m.ReadOrder = lIndex + 1).FirstOrDefault.SwingYear
                        Dim UseDefaultValue As Boolean = False
                        If (Not String.IsNullOrEmpty(pDefaultValue)) Then
                            Select Case pDefaultValue.ToString().ToUpper()
                                Case "@@SL_USERNAME"
                                    Dim sUserName As String = String.Empty
                                    Dim sUserId = myBasePage.Passport.UserId
                                    If (sUserId <> 0) Then
                                        pDefaultValue = _iSecureUser.Where(Function(m) m.UserID = sUserId).FirstOrDefault.UserName
                                    End If
                                    Exit Select
                                Case "@@TIME"
                                    pDefaultValue = DateTime.Now.ToLongTimeString
                                    'sDateFormat = "mm/dd/yyyy"
                                    Exit Select
                            End Select
                        End If

                        If (lIndex <= mrsImport.Fields.Count - 1) Then
                            vField = mrsImport.Fields(sImportName).Value
                        Else
                            If (Not String.IsNullOrEmpty(pDefaultValue)) Then
                                Dim localValue = pDefaultValue.ToString.Trim().ToUpper()
                                If (localValue.Equals("@@TODAY") Or localValue.Equals("TODAY") Or localValue.Equals("@@NOW")) Then
                                    UseDefaultValue = True
                                End If
                            End If

                            If (IsFunction(pDefaultValue)) Then
                                vField = ProcessFunctionValue(pDefaultValue)
                            Else
                                vField = pDefaultValue
                            End If
                        End If

                        If (IsDBNull(vField)) Then
                            vField = ""
                        Else
                            StripQuotes(vField)
                            If (Len(vField) > 0) Then
                                vField = vField.ToString
                            End If
                        End If
                        Select Case (sFieldName)
                            Case IMAGE_COPY, PCFILE_COPY
                                sImageName = Trim$(vField)
                                If (Len(sImageName) > 0) Then
                                    StripQuotes(sImageName)
                                    bImageCopyField = (StrComp(sFieldName, IMAGE_COPY, vbTextCompare) = 0&)
                                    bPCFileCopyField = (StrComp(sFieldName, PCFILE_COPY, vbTextCompare) = 0&)

                                    If Not IsNothing(Session("ImportFilePath")) Then
                                        'If (Not String.IsNullOrEmpty(oImportLoad.InputFile)) Then
                                        If (Not String.IsNullOrEmpty(Session("ImportFilePath").ToString())) Then
                                            Dim DirectoryName = Path.GetDirectoryName(Session("ImportFilePath").ToString())
                                            Dim DirectoryFolder = DirectoryName.Split(Path.DirectorySeparatorChar)
                                            DirectoryName = DirectoryName.Replace(DirectoryFolder(DirectoryFolder.Length - 1), "")
                                            DirectoryName = DirectoryName + "Attachment"
                                            currentImageName = Path.GetFileName(sImageName)
                                            sImageName = System.IO.Path.Combine(DirectoryName, currentImageName)
                                            If (Not (System.IO.File.Exists(sImageName))) Then
                                                errorFlag = False
                                                If (oImportLoad.ReverseOrder) Then
                                                    abortRecordIndex = abortRecordIndex - 1
                                                Else
                                                    abortRecordIndex = abortRecordIndex + 1
                                                End If
                                                sReturnMessage = String.Format(Languages.Translation("msgImportCtrlFileNotFoundPlzVerify"), currentImageName)
                                                WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, msImport:=mrsImport)
                                                ImportLoadRecordForQuietProcessing = True
                                                Exit Function
                                            ElseIf (oImportLoad.ScanRule Is Nothing) Then
                                                Dim errNum = 25
                                                If (errorIndex = errNum) Then
                                                    errorFlag = True
                                                Else
                                                    errorFlag = False
                                                End If
                                                errorIndex = errNum
                                                If (oImportLoad.ReverseOrder) Then
                                                    abortRecordIndex = abortRecordIndex - 1
                                                Else
                                                    abortRecordIndex = abortRecordIndex + 1
                                                End If
                                                sReturnMessage = Languages.Translation("msgImportCtrlOptSettingsNotFound")
                                                WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                                ImportLoadRecordForQuietProcessing = True
                                                Exit Function
                                            End If
                                        End If
                                    End If
                                End If
                                    Exit Select
                            Case ATTMT_LINK
                                Exit Select
                            Case TRACK_DEST
                                tTracking.sDestination = vField
                                Exit Select
                            Case TRACK_OPER
                                TrackingServices.TelxonUserName = vField
                                If (Not bTrackingOnly) Then
                                    TrackingServices.TelxonModeOn = True
                                    TrackingServices.ScanDateTime = CDate(TrackingServices.StartTime)
                                End If
                                Exit Select
                            Case TRACK__DUE
                                sTemp = ConvertDateTime(vField, sDateFormat, pDefaultValue, vSwingYear, sReturnMessage, errorIndex, errorFlag, UseDefaultValue)
                                If (sReturnMessage <> "") Then
                                    If (oImportLoad.ReverseOrder) Then
                                        abortRecordIndex = abortRecordIndex - 1
                                    Else
                                        abortRecordIndex = abortRecordIndex + 1
                                    End If
                                    WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                    ImportLoadRecordForQuietProcessing = True
                                    Exit Function
                                End If
                                If (Len(sTemp) > 0&) Then
                                    If (StrComp(sTemp, vbNullChar) <> 0&) Then
                                        tTracking.dDateDue = CDate(sTemp)
                                    End If
                                Else
                                    bRecordError = True
                                End If
                            Case TRACK_DATE
                                TrackingServices.TelxonModeOn = True
                                sTemp = ConvertDateTime(vField, sDateFormat, pDefaultValue, vSwingYear, sReturnMessage, errorIndex, errorFlag, UseDefaultValue)
                                If (sReturnMessage <> "") Then
                                    If (oImportLoad.ReverseOrder) Then
                                        abortRecordIndex = abortRecordIndex - 1
                                    Else
                                        abortRecordIndex = abortRecordIndex + 1
                                    End If
                                    WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                    ImportLoadRecordForQuietProcessing = True
                                    Exit Function
                                End If
                                If (Len(sTemp) > 0) Then
                                    If (StrComp(sTemp, vbNullChar) = 0) Then
                                        sReturnMessage = String.Format(Languages.Translation("msgImportCtrlCantBeBlank"), TRACK_DATE)
                                        Dim errNum = 7
                                        If (errorIndex = errNum) Then
                                            errorFlag = True
                                        Else
                                            errorFlag = False
                                        End If
                                        errorIndex = errNum
                                        If (oImportLoad.ReverseOrder) Then
                                            abortRecordIndex = abortRecordIndex - 1
                                        Else
                                            abortRecordIndex = abortRecordIndex + 1
                                        End If
                                        WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                        ImportLoadRecordForQuietProcessing = True
                                        Exit Function
                                    Else
                                        TrackingServices.ScanDateTime = CDate(sTemp)
                                    End If
                                Else
                                    bRecordError = True
                                End If
                            Case TRACK_RECN
                                If (data_iSystem.FirstOrDefault.ReconciliationOn) Then
                                    If (InStr(1, "TR", vField, vbTextCompare)) Then
                                        tTracking.bDoRecon = (StrComp(vField, "R", vbTextCompare) = 0&)
                                    Else
                                        If (Len(Trim(vField)) = 0) Then
                                            If (Len(Trim(pDefaultValue))) Then
                                                tTracking.bDoRecon = pDefaultValue
                                            End If
                                        Else
                                            If (vField.ToString.Trim.ToUpper.Equals("TRUE") Or vField.ToString.Trim.ToUpper.Equals("FALSE")) Then
                                                tTracking.bDoRecon = CBool(vField)
                                            End If
                                        End If
                                    End If
                                End If
                                Exit Select
                            Case TRACK_ADDIT_FIELD1
                                If (Len(data_iSystem.FirstOrDefault.TrackingAdditionalField1Desc)) Then
                                    If ((data_iSystem.FirstOrDefault.TrackingAdditionalField1Type = Enums.SelectionTypes.stSelection) And (Len(Trim(vField)))) Then
                                        Dim SLTrackingSelectDataList = data_iSLTrackingSelectData.OrderBy(Function(m) m.Id)
                                        bFoundTrackingSel = False
                                        For Each oSLTrackingSelections As SLTrackingSelectData In SLTrackingSelectDataList
                                            bFoundTrackingSel = (StrComp(RTrim$(oSLTrackingSelections.Id), RTrim(vField), vbTextCompare) = 0&)
                                            If (bFoundTrackingSel) Then
                                                Exit For
                                            End If
                                        Next oSLTrackingSelections
                                    Else
                                        bFoundTrackingSel = True
                                    End If

                                    If (bFoundTrackingSel) Then
                                        tTracking.sTrackingAdditionalField1 = vField
                                    Else
                                        sReturnMessage = String.Format(Languages.Translation("msgImportCtrlFieldNotValid4Selection"), RTrim(vField), _iSystem.All().FirstOrDefault.TrackingAdditionalField1Desc)
                                        Dim errNum = 8
                                        If (errorIndex = errNum) Then
                                            errorFlag = True
                                        Else
                                            errorFlag = False
                                        End If
                                        errorIndex = errNum
                                        If (oImportLoad.ReverseOrder) Then
                                            abortRecordIndex = abortRecordIndex - 1
                                        Else
                                            abortRecordIndex = abortRecordIndex + 1
                                        End If
                                        WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                        ImportLoadRecordForQuietProcessing = True
                                        Exit Function
                                    End If
                                End If
                                Exit Select
                            Case TRACK_ADDIT_FIELD2
                                If (Len(data_iSystem.FirstOrDefault.TrackingAdditionalField2Desc)) Then
                                    tTracking.sTrackingAdditionalField2 = vField
                                End If
                                Exit Select
                            Case TRACK__OBJ
                                oTrackObject = GetInfoUsingADONET.BarCodeLookup(Nothing, data_iDatabas, data_iTables, data_iSystem, data_iScanList, data_iView,
                                                                   data_iTableTab, data_iTabSet, data_iRelationship, vField, "", , , _IDBManagerDefault, False)
                                If (oTrackObject Is Nothing) Then
                                    Exit Do
                                End If
                                Exit Select
                            Case Else
                                If (StrComp(oTable.TableName, "SLRetentionCodes", vbTextCompare) = 0) Then
                                    If (StrComp(sFieldName, "ID", vbTextCompare) = 0) Then
                                        'importing records directly into the Retention Code table
                                        If (InStr(1, vField, " ") > 0) Then
                                            Dim errNum = 9
                                            If (errorIndex = errNum) Then
                                                errorFlag = True
                                            Else
                                                errorFlag = False
                                            End If
                                            errorIndex = errNum
                                            If (oImportLoad.ReverseOrder) Then
                                                abortRecordIndex = abortRecordIndex - 1
                                            Else
                                                abortRecordIndex = abortRecordIndex + 1
                                            End If
                                            sReturnMessage = Languages.Translation("msgImportCtrlRentCodeNotContainBlankSpace")
                                            WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                            ImportLoadRecordForQuietProcessing = True
                                            Exit Function
                                        End If
                                    ElseIf (StrComp(sFieldName, "Description", vbTextCompare) = 0) Then
                                        If (vField = "") Then
                                            Dim errNum = 10
                                            If (errorIndex = errNum) Then
                                                errorFlag = True
                                            Else
                                                errorFlag = False
                                            End If
                                            errorIndex = errNum
                                            If (oImportLoad.ReverseOrder) Then
                                                abortRecordIndex = abortRecordIndex - 1
                                            Else
                                                abortRecordIndex = abortRecordIndex + 1
                                            End If
                                            sReturnMessage = Languages.Translation("msgImportCtrlRetentionDescRequired")
                                            WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                            ImportLoadRecordForQuietProcessing = True
                                            Exit Function
                                        End If
                                    End If
                                End If

                                If (StrComp(sFieldName, DatabaseMap.RemoveTableNameFromField(oTable.RetentionFieldName), vbTextCompare) = 0) Then
                                    If (InStr(1, vField, " ") > 0) Then
                                        Dim errNum = 11
                                        If (errorIndex = errNum) Then
                                            errorFlag = True
                                        Else
                                            errorFlag = False
                                        End If
                                        errorIndex = errNum
                                        If (oImportLoad.ReverseOrder) Then
                                            abortRecordIndex = abortRecordIndex - 1
                                        Else
                                            abortRecordIndex = abortRecordIndex + 1
                                        End If
                                        sReturnMessage = Languages.Translation("msgImportCtrlRentCodeNotContainBlankSpace")
                                        WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                        ImportLoadRecordForQuietProcessing = True
                                        Exit Function
                                    End If
                                End If

                                If ((oTable.RetentionPeriodActive) Or (oTable.RetentionInactivityActive)) Then
                                    If (StrComp(sFieldName, DatabaseMap.RemoveTableNameFromField(oTable.RetentionFieldName), vbTextCompare) = 0) Then
                                        If (oTable.RetentionAssignmentMethod = Enums.meRetentionCodeAssignment.rcaRelatedTable) Then
                                            oRelationShip = data_iRelationship.Where(Function(m) m.UpperTableName.Trim.ToLower.Equals(oTable.RetentionRelatedTable.Trim.ToLower) And m.LowerTableName.Trim.ToLower.Equals(oTable.TableName.Trim.ToLower)).OrderBy(Function(m) m.TabOrder).FirstOrDefault
                                            If (oRelationShip Is Nothing) Then
                                                Dim errNum = 12
                                                If (errorIndex = errNum) Then
                                                    errorFlag = True
                                                Else
                                                    errorFlag = False
                                                End If
                                                errorIndex = errNum
                                                If (oImportLoad.ReverseOrder) Then
                                                    abortRecordIndex = abortRecordIndex - 1
                                                Else
                                                    abortRecordIndex = abortRecordIndex + 1
                                                End If
                                                sReturnMessage = Languages.Translation("msgImportCtrlRetenTblNotBlank")
                                                WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                                ImportLoadRecordForQuietProcessing = True
                                                Exit Function
                                            Else
                                                bFoundRelatedField = False
                                                Dim oLowerFieldName = DatabaseMap.RemoveTableNameFromField(oRelationShip.LowerTableFieldName)
                                                Dim oRelatedFieldName = _iImportField.All.Where(Function(m) m.FieldName.Trim.ToLower.Equals(oLowerFieldName.Trim.ToLower)).FirstOrDefault
                                                If (oRelatedFieldName IsNot Nothing) Then
                                                    bFoundRelatedField = True
                                                    If (asDelimitedText(oRelatedFieldName.ReadOrder - 1) = "") Then
                                                        Dim errNum = 13
                                                        If (errorIndex = errNum) Then
                                                            errorFlag = True
                                                        Else
                                                            errorFlag = False
                                                        End If
                                                        errorIndex = errNum
                                                        If (oImportLoad.ReverseOrder) Then
                                                            abortRecordIndex = abortRecordIndex - 1
                                                        Else
                                                            abortRecordIndex = abortRecordIndex + 1
                                                        End If
                                                        sReturnMessage = Languages.Translation("msgImportCtrlRetenTblNotBlank")
                                                        WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                                        ImportLoadRecordForQuietProcessing = True
                                                        Exit Function
                                                    Else
                                                        Dim oCodeValue = GetInfoUsingADONET.GetRetentionCodeValueUsingADONET(oTable, data_iTables.Where(Function(m) m.TableName.Trim.ToLower.Equals(oTable.RetentionRelatedTable.Trim.ToLower)).FirstOrDefault, asDelimitedText(oRelatedFieldName.ReadOrder - 1), False, data_iDatabas, _IDBManagerDefault)
                                                        If (StrComp(vField, oCodeValue, vbTextCompare) <> 0) Then
                                                            Dim errNum = 14
                                                            If (errorIndex = errNum) Then
                                                                errorFlag = True
                                                            Else
                                                                errorFlag = False
                                                            End If
                                                            errorIndex = errNum
                                                            If (oImportLoad.ReverseOrder) Then
                                                                abortRecordIndex = abortRecordIndex - 1
                                                            Else
                                                                abortRecordIndex = abortRecordIndex + 1
                                                            End If
                                                            sReturnMessage = Languages.Translation("msgImportCtrlRelTblNotMatchedWithCode")
                                                            WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                                            ImportLoadRecordForQuietProcessing = True
                                                            Exit Function
                                                        End If
                                                    End If
                                                End If

                                                If (Not bFoundRelatedField) Then
                                                    If (StrComp(vField, GetInfoUsingADONET.GetRetentionCodeValueUsingADONET(oTable, data_iTables.Where(Function(m) m.TableName.Trim.ToLower.Equals(oTable.RetentionRelatedTable.Trim.ToLower)).FirstOrDefault, dtRecords.Rows(0)(DatabaseMap.RemoveTableNameFromField(oRelationShip.LowerTableFieldName)), False, data_iDatabas, _IDBManagerDefault), vbTextCompare) <> 0) Then
                                                        Dim errNum = 15
                                                        If (errorIndex = errNum) Then
                                                            errorFlag = True
                                                        Else
                                                            errorFlag = False
                                                        End If
                                                        errorIndex = errNum
                                                        If (oImportLoad.ReverseOrder) Then
                                                            abortRecordIndex = abortRecordIndex - 1
                                                        Else
                                                            abortRecordIndex = abortRecordIndex + 1
                                                        End If
                                                        sReturnMessage = Languages.Translation("msgImportCtrlRelTblNotMatchedWithCode")
                                                        WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                                        ImportLoadRecordForQuietProcessing = True
                                                        Exit Function
                                                    End If
                                                End If
                                            End If
                                        ElseIf (oTable.RetentionAssignmentMethod = Enums.meRetentionCodeAssignment.rcaCurrentTable) Then
                                            ' Make general GetRetentionCodeValue() method for all record
                                            If (StrComp(vField, GetInfoUsingADONET.GetRetentionCodeValueUsingADONET(oTable, Nothing, "", False, data_iDatabas, _IDBManagerDefault), vbTextCompare) <> 0) Then
                                                Dim errNum = 16
                                                If (errorIndex = errNum) Then
                                                    errorFlag = True
                                                Else
                                                    errorFlag = False
                                                End If
                                                errorIndex = errNum
                                                If (oImportLoad.ReverseOrder) Then
                                                    abortRecordIndex = abortRecordIndex - 1
                                                Else
                                                    abortRecordIndex = abortRecordIndex + 1
                                                End If
                                                sReturnMessage = Languages.Translation("msgImportCtrlRelTblNotMatchedWithCode")
                                                WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                                ImportLoadRecordForQuietProcessing = True
                                                Exit Function
                                            End If
                                        Else
                                            bDefaultRetentionCodeUsed = (Len(pDefaultValue) > 0)
                                        End If
                                    End If
                                End If

                                'Added by Akruti
                                Dim recordFieldVal As String = ""
                                If (bDoAddNew) Then
                                    recordFieldVal = ""
                                Else
                                    If (IsDBNull(dtRecords.Rows(0)(sFieldName))) Then
                                        recordFieldVal = ""
                                    Else
                                        recordFieldVal = dtRecords.Rows(0)(sFieldName)
                                    End If
                                End If

                                sBeforeValue = recordFieldVal
                                If (GetInfoUsingADONET.IsAString(dtRecords.Columns(sFieldName).DataType.ToString)) Then
                                    If (Len(Trim(vField)) = 0&) Then
                                        vField = pDefaultValue
                                    End If

                                    If (StrComp(oImportFields.Where(Function(m) m.ReadOrder = lIndex + 1).FirstOrDefault.FieldName, sMultiFieldName, vbTextCompare) = 0) Then
                                        If (Len(Trim(pDefaultValue)) > 0&) Then
                                            If (StrComp(vField, pDefaultValue, vbTextCompare) <> 0&) Then
                                                vField = pDefaultValue & vField
                                            End If
                                        End If
                                        If (dtRecords.Columns(sFieldName).MaxLength < 10000) Then
                                            ListOfClsFieldWithVal.Add(New ClsFieldWithVal() With {.colName = sFieldName, .colVal = Left$(Trim$(dtRecords.Rows(0)(sFieldName)) & vField, (dtRecords.Columns(sFieldName).MaxLength)), .colType = dtRecords.Columns(sFieldName).DataType})
                                        Else
                                            ListOfClsFieldWithVal.Add(New ClsFieldWithVal() With {.colName = sFieldName, .colVal = Trim$(dtRecords.Rows(0)(sFieldName) & vField), .colType = dtRecords.Columns(sFieldName).DataType})
                                        End If
                                    Else
                                        sMultiFieldName = oImportFields.Where(Function(m) m.ReadOrder = lIndex + 1).FirstOrDefault.FieldName
                                        If (dtRecords.Columns(sFieldName).MaxLength < 10000) Then
                                            ListOfClsFieldWithVal.Add(New ClsFieldWithVal() With {.colName = sFieldName, .colVal = Left$(Trim$(vField), dtRecords.Columns(sFieldName).MaxLength), .colType = dtRecords.Columns(sFieldName).DataType})
                                        Else
                                            ListOfClsFieldWithVal.Add(New ClsFieldWithVal() With {.colName = sFieldName, .colVal = Trim$(vField), .colType = dtRecords.Columns(sFieldName).DataType})
                                        End If
                                    End If
                                ElseIf (GetInfoUsingADONET.IsADate(dtRecords.Columns(sFieldName).DataType.ToString)) Then
                                    sTemp = ConvertDateTime(vField, sDateFormat, pDefaultValue, vSwingYear, sReturnMessage, errorIndex, errorFlag, UseDefaultValue)
                                    If (sReturnMessage <> "") Then
                                        If (oImportLoad.ReverseOrder) Then
                                            abortRecordIndex = abortRecordIndex - 1
                                        Else
                                            abortRecordIndex = abortRecordIndex + 1
                                        End If
                                        WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                        ImportLoadRecordForQuietProcessing = True
                                        Exit Function
                                    End If
                                    If (dtRecords.Columns(sFieldName).AllowDBNull OrElse Len(sTemp) > 0&) Then
                                        If (StrComp(sTemp, vbNullChar) = 0&) Then
                                            sTemp = Nothing
                                        ElseIf (Trim$(sTemp) = "" AndAlso dtRecords.Columns(sFieldName).AllowDBNull) Then
                                            sTemp = Nothing
                                        End If
                                        ListOfClsFieldWithVal.Add(New ClsFieldWithVal() With {.colName = sFieldName, .colVal = sTemp, .colType = dtRecords.Columns(sFieldName).DataType})
                                    Else
                                        bRecordError = True
                                    End If
                                Else
                                    If (IsDBNull(vField) Or Len(Trim(vField)) = 0&) Then
                                        vField = pDefaultValue
                                    End If
                                    If (dtRecords.Columns(sFieldName).AutoIncrement = False) Then
                                        ListOfClsFieldWithVal.Add(New ClsFieldWithVal() With {.colName = sFieldName, .colVal = vField, .colType = dtRecords.Columns(sFieldName).DataType})
                                    End If
                                End If
                                If (oTable.AuditUpdate) Then
                                    Dim AfterValRecord = ListOfClsFieldWithVal.Where(Function(m) m.colName.Trim.ToLower.Equals(sFieldName.Trim.ToLower)).FirstOrDefault
                                    Dim AfterVal = Nothing
                                    If (AfterValRecord IsNot Nothing) Then
                                        AfterVal = AfterValRecord.colVal
                                    End If

                                    If (StrComp(sBeforeValue, AfterVal, vbTextCompare) <> 0) Then
                                        sFindFieldName = ""
                                        For lCnt = 1& To cFieldNames.Count
                                            sFindFieldName = cFieldNames.Item(lCnt)
                                            If (StrComp(sFindFieldName, DatabaseMap.RemoveTableNameFromField(sFieldName), vbTextCompare) = 0) Then
                                                Exit For
                                            End If
                                            sFindFieldName = ""
                                        Next lCnt
                                        If (Len(Trim$(sFindFieldName)) = 0) Then
                                            cFieldBeforeValues.Add(sBeforeValue)
                                            cFieldNames.Add(DatabaseMap.RemoveTableNameFromField(sFieldName))
                                            cFieldAfterValues.Add(AfterVal)
                                        Else
                                            cFieldAfterValues.Add(AfterVal, , lCnt)
                                            cFieldAfterValues.Remove(lCnt)
                                        End If
                                    End If
                                End If
                                Exit Select
                        End Select
                    End If
                    lIndex = lIndex + 1&
                Loop
                If (Not bTrackingOnly) Then
                    If (StrComp(oTable.TableName, "SLRetentionCitaCodes", vbTextCompare) = 0&) Then
                        For lRetentionFieldCounter = 0& To oImportFields.Count - 1
                            If (StrComp(FieldNameCollection.Item(lRetentionFieldCounter).Value, "SLRetentionCitationsCitation", vbTextCompare) = 0) Then
                                sCitationCode = asDelimitedText(lRetentionFieldCounter)
                            ElseIf (StrComp(FieldNameCollection.Item(lRetentionFieldCounter).Value, "SLRetentionCodesId", vbTextCompare) = 0) Then
                                sRetentionCode = asDelimitedText(lRetentionFieldCounter)
                            End If
                        Next lRetentionFieldCounter

                        If (sCitationCode > "") And (sRetentionCode > "") Then
                            sSql = "SELECT TOP 1 * FROM [SLRetentionCitaCodes] WHERE [SLRetentionCitationsCitation] = '" & sCitationCode & "' AND [SLRetentionCodesId] = '" & sRetentionCode & "'"
                            rsTestADONET = GetInfoUsingADONET.GetADONETRecord(sSql, _IDBManagerDefault)
                            If (Not (rsTestADONET Is Nothing)) Then
                                If (rsTestADONET.Rows.Count > 0&) Then
                                    rsTestADONET = Nothing
                                    Dim errNum = 17
                                    If (errorIndex = errNum) Then
                                        errorFlag = True
                                    Else
                                        errorFlag = False
                                    End If
                                    errorIndex = errNum
                                    If (oImportLoad.ReverseOrder) Then
                                        abortRecordIndex = abortRecordIndex - 1
                                    Else
                                        abortRecordIndex = abortRecordIndex + 1
                                    End If
                                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlRetentionCodeAlreadyAssignCitationCode"), sRetentionCode, sCitationCode)
                                    WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                    ImportLoadRecordForQuietProcessing = True
                                    Exit Function
                                End If
                            End If
                        End If
                    End If
                    If (StrComp(oTable.TableName, "SLRetentionCodes", vbTextCompare) = 0) Then
                        bRetentionDescriptionFound = False

                        For lRetentionFieldCounter = 0& To FieldNameCollection.Count - 1
                            If (StrComp(FieldNameCollection.Item(lRetentionFieldCounter).Value, "Description", vbTextCompare) = 0&) Then bRetentionDescriptionFound = True
                        Next lRetentionFieldCounter

                        If (Not bRetentionDescriptionFound) Then
                            Dim errNum = 18
                            If (errorIndex = errNum) Then
                                errorFlag = True
                            Else
                                errorFlag = False
                            End If
                            errorIndex = errNum
                            If (oImportLoad.ReverseOrder) Then
                                abortRecordIndex = abortRecordIndex - 1
                            Else
                                abortRecordIndex = abortRecordIndex + 1
                            End If
                            sReturnMessage = Languages.Translation("msgImportCtrlRetentionDescRequired")
                            WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                            ImportLoadRecordForQuietProcessing = True
                            Exit Function
                        End If
                    End If
                End If
                If (Not bRecordError) Then
                    If (bTrackingOnly) Then
                        Dim errNum As Integer
                        sTrackingReturn = ""
                        If (oTrackObject Is Nothing) Then
                            sTrackingReturn = Languages.Translation("msgImportCtrlTracObjNotSupplied")
                            errNum = 19
                        Else
                            If (Len(tTracking.sDestination)) Then
                                sTrackingReturn = GetInfoUsingADONET.ValidateTracking(data_iDatabas, data_iTables, data_iSystem, data_iScanList, data_iView, data_iTableTab,
                                                                   data_iTabSet, data_iRelationship, oTrackObject, oTrackDestination, tTracking.sDestination,
                                                                   False, , errNum, _IDBManagerDefault, True)

                            Else
                                sTrackingReturn = Languages.Translation("msgImportCtrlTracDestNotSupplied")
                                errNum = 32
                            End If
                        End If

                        If (Len(sTrackingReturn) > 0) Then
                            oTrackObject = Nothing
                            oTrackDestination = Nothing
                            If (errorIndex = errNum) Then
                                errorFlag = True
                            Else
                                errorFlag = False
                            End If
                            errorIndex = errNum
                            If (oImportLoad.ReverseOrder) Then
                                abortRecordIndex = abortRecordIndex - 1
                            Else
                                abortRecordIndex = abortRecordIndex + 1
                            End If
                            sReturnMessage = sTrackingReturn
                            WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                            ImportLoadRecordForQuietProcessing = True
                            Exit Function
                        Else
                            errNum = errorIndex
                        End If
                        If (data_iSystem.FirstOrDefault.TrackingOutOn And data_iSystem.FirstOrDefault.DateDueOn) Then
                            If (tTracking.dDateDue = DateTime.MinValue) Then
                                If (oImportLoad.DateDue IsNot Nothing) Then
                                    tTracking.dDateDue = oImportLoad.DateDue
                                Else
                                    If (oTrackDestination.DueBackDays <> Nothing) Then
                                        tTracking.dDateDue = DateTime.Now().AddDays(oTrackDestination.DueBackDays)
                                    Else
                                        tTracking.dDateDue = DateTime.Now().AddDays(data_iSystem.FirstOrDefault.DefaultDueBackDays)
                                    End If
                                End If
                            End If
                            If (oTrackDestination.IsOut) Then
                                If (tTracking.dDateDue = DateTime.MinValue) Then
                                    errNum = 33
                                    sTrackingReturn = Languages.Translation("msgBarCodeTrackingDueBackDateReq")
                                Else
                                    If (Date.Parse(tTracking.dDateDue.ToShortDateString) < Date.Parse(Now.ToShortDateString)) Then
                                        errNum = 34
                                        sTrackingReturn = Languages.Translation("DueBackDateLessThanCurrent")
                                    End If
                                End If
                            End If
                        End If
                        If (sTrackingReturn <> "") Then
                            errorIndex = 0
                            errorFlag = False
                            If (oImportLoad.ReverseOrder) Then
                                abortRecordIndex = abortRecordIndex - 1
                            Else
                                abortRecordIndex = abortRecordIndex + 1
                            End If
                            WriteErrorFile(oImportLoad, sTrackingReturn, errorFlag, recordErrorTrack, Nothing, mrsImport)
                            ImportLoadRecordForQuietProcessing = True
                            Exit Function
                        End If
                        If ((Not (oTrackObject Is Nothing)) And (Not (oTrackDestination Is Nothing))) Then
                            sTrackingReturn = String.Empty
                            TrackingServices.PrepareTransferDataForImport(_IDBManagerDefault, _iSystem, _iSecureUser, _iTables, _iTrackingStatus, _iAssetStatus, _iDatabas, oTrackObject,
                                                                          oTrackDestination, tTracking.bDoRecon, tTracking.dDateDue, tTracking.sTrackingAdditionalField1, tTracking.sTrackingAdditionalField2, , sTrackingReturn)
                            If (sTrackingReturn <> "") Then
                                errorIndex = 0
                                errorFlag = False
                                If (oImportLoad.ReverseOrder) Then
                                    abortRecordIndex = abortRecordIndex - 1
                                Else
                                    abortRecordIndex = abortRecordIndex + 1
                                End If
                                WriteErrorFile(oImportLoad, sTrackingReturn, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                ImportLoadRecordForQuietProcessing = True
                                Exit Function
                            End If
                            If (Len(sTrackingReturn) = 0) Then
                                mlRecordsChanged = mlRecordsChanged + 1
                            End If
                        End If
                    Else
                        Dim IsIdFieldString = GetInfoUsingADONET.IsAString(dtRecords.Columns(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName)).DataType.ToString)
                        Dim oIdFieldObject = ListOfClsFieldWithVal.Where(Function(m) m.colName.Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName).Trim.ToLower)).FirstOrDefault
                        sCounterName = Trim$(oTable.CounterFieldName)
                        If ((Len(sCounterName) > 0) And (Not bHasAutoIncrement)) Then
                            sCounterValue = ""
                            sFusionCounterValue = "0"
                            rsTestADONET = GetInfoUsingADONET.GetADONETRecord("SELECT [" & sCounterName & "] FROM [System]", _IDBManagerDefault)

                            If (Not (rsTestADONET Is Nothing)) Then
                                If (rsTestADONET.Rows.Count > 0) Then sFusionCounterValue = rsTestADONET(0)(sCounterName)
                                rsTestADONET = Nothing
                            End If
                            If (dtRecords.Rows.Count > 0) Then
                                sCounterValue = dtRecords.Rows(0)(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName))
                            Else
                                sCounterValue = 0
                            End If

                            If (Len(Trim$(sCounterValue)) = 0) Then
                                'Make Sure the id in question is not in use
                                Do
                                    oTempSys = GetInfoUsingADONET.IncrementCounter(sCounterName, _IDBManagerDefault)
                                    If (IsIdFieldString) Then
                                        sSql = "SELECT [" & DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName) & "] FROM [" & oTable.TableName & "] WHERE [" & DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName) & "] = '" & Format$(oTempSys.CounterValue(sCounterName)) & "'"
                                    Else
                                        sSql = "SELECT [" & DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName) & "] FROM [" & oTable.TableName & "] WHERE [" & DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName) & "] = " & Format$(oTempSys.CounterValue(sCounterName))
                                    End If
                                    rsTestADONET = GetInfoUsingADONET.GetADONETRecord(sSql, commonIDBManager)
                                    If (Not (rsTestADONET Is Nothing)) Then
                                        If (rsTestADONET.Rows.Count = 0) Then
                                            rsTestADONET = Nothing
                                            Exit Do
                                        End If
                                        rsTestADO = Nothing
                                    End If
                                Loop
                                If (oIdFieldObject IsNot Nothing) Then
                                    ListOfClsFieldWithVal.Remove(oIdFieldObject)
                                    ListOfClsFieldWithVal.Add(New ClsFieldWithVal() With {.colName = DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName), .colVal = oTempSys.CounterValue(sCounterName), .colType = dtRecords.Columns(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName)).DataType})
                                End If
                                oTempSys = Nothing
                            ElseIf IsNumeric(sCounterValue) Then
                                If ((CDbl(sFusionCounterValue) < CDbl(sCounterValue)) Or (CDbl(sCounterValue) = 0.0#)) Then GetInfoUsingADONET.IncrementCounter(sCounterName, _IDBManagerDefault, sCounterValue)
                                If (CDbl(sCounterValue) = 0.0#) Then
                                    If (oIdFieldObject IsNot Nothing) Then
                                        ListOfClsFieldWithVal.Remove(oIdFieldObject)
                                        ListOfClsFieldWithVal.Add(New ClsFieldWithVal() With {.colName = DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName), .colVal = sFusionCounterValue, .colType = dtRecords.Columns(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName)).DataType})
                                    End If
                                End If
                            End If
                        End If

                        lError = 0
                        Dim IsIdAutoIncrement = True
                        Dim oNewIdFieldObject = ListOfClsFieldWithVal.Where(Function(m) m.colName.Trim.ToLower.Equals(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName).Trim.ToLower)).FirstOrDefault
                        If (oNewIdFieldObject IsNot Nothing) Then
                            IsIdAutoIncrement = False
                            UpdatedRecordIdVal = oNewIdFieldObject.colVal
                        End If
                        If (Not bDoAddNew) Then
                            UpdatedRecordIdVal = dtRecords.Rows(0)(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName).Trim.ToLower)
                        End If
                        sReturnMessage = ""
                        Dim sqlFinalQuery = GetInfoUsingADONET.PrepareSQLUsingList(bDoAddNew, bFound, ListOfClsFieldWithVal, oTable, UpdatedRecordIdVal, IsIdFieldString, IsIdAutoIncrement, oImportLoad.IdFieldName, UpdateByFieldVal, sReturnMessage)

                        If (Len(sReturnMessage.Trim()) = 0) Then
                            sReturnMessage = ""
                            dtRecords = GetInfoUsingADONET.GetADONETRecord(sqlFinalQuery, commonIDBManager, sReturnMessage)
                        End If

                        If (dtRecords Is Nothing Or sReturnMessage <> "") Then
                            Dim errNum = 27
                            If (errorIndex = errNum) Then
                                errorFlag = True
                            Else
                                errorFlag = False
                            End If
                            'errorIndex = errNum Changed by nikunj to fix: FUS-5850
                            If (oImportLoad.ReverseOrder) Then
                                abortRecordIndex = abortRecordIndex - 1
                            Else
                                abortRecordIndex = abortRecordIndex + 1
                            End If
                            WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                            ImportLoadRecordForQuietProcessing = True
                            Exit Function
                        End If
                        If (dtRecords.Rows.Count > 0) Then
                            sId = dtRecords.Rows(0)(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName))
                        End If

                        If (Len(sId) > 0) Then
                            If ((oTable.RetentionPeriodActive) Or (oTable.RetentionInactivityActive)) Then
                                If (IsDBNull(dtRecords.Rows(0)(DatabaseMap.RemoveTableNameFromField(oTable.RetentionFieldName)))) Then
                                    If (oTable.RetentionAssignmentMethod = Enums.meRetentionCodeAssignment.rcaManual) Then
                                        If (Not bDefaultRetentionCodeUsed) Then
                                            GetInfoUsingADONET.AssignRetentionCode(oTable, sId, data_iDatabas, data_iTables, data_iRelationship, _IDBManagerDefault, _IDBManager)
                                        End If
                                    Else
                                        GetInfoUsingADONET.AssignRetentionCode(oTable, sId, data_iDatabas, data_iTables, data_iRelationship, _IDBManagerDefault, _IDBManager)
                                    End If
                                End If
                            End If
                        End If
                        Dim TextSearchItems = data_iSLTextSearchItems.Where(Function(m) m.IndexTableName.Trim.ToLower.Equals(oTable.TableName.Trim.ToLower))
                        If ((lError = 0) And (TextSearchItems.Count > 0) And (Len(sId) > 0)) Then
                            GetInfoUsingADONET.UpdateFullTextIndexerFieldType(sId, oTable, dtRecords, bDoAddNew, data_iSLTextSearchItems, _iSLIndexer())
                        End If

                        If (Len(sId) > 0) Then
                            If (oTable.AuditUpdate) Then
                                If (cFieldNames.Count > 0&) Then
                                    If (bDoAddNew) Then
                                        sFindFieldName = ""
                                        For lCnt = 1 To cFieldNames.Count
                                            sFindFieldName = cFieldNames.Item(lCnt)
                                            If (StrComp(sFindFieldName, DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName), vbTextCompare) = 0&) Then
                                                Exit For
                                            End If
                                            sFindFieldName = ""
                                        Next lCnt
                                        If (Len(sFindFieldName) = 0&) Then
                                            cFieldBeforeValues.Add("")
                                            cFieldNames.Add(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName))
                                            cFieldAfterValues.Add(dtRecords.Rows(0)(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName)))
                                        Else
                                            cFieldAfterValues.Add(dtRecords.Rows(0)(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName)), lCnt)
                                            cFieldAfterValues.Remove(lCnt)
                                        End If
                                    End If

                                    For lCnt = 1 To cFieldNames.Count
                                        sBeforeData = sBeforeData & cFieldNames.Item(lCnt) & ": " & cFieldBeforeValues.Item(lCnt) & vbCrLf
                                        sAfterData = sAfterData & cFieldNames.Item(lCnt) & ": " & cFieldAfterValues.Item(lCnt) & vbCrLf
                                    Next lCnt
                                    If (Len(sAfterData) > 2) Then
                                        'Strip last CF LF
                                        sAfterData = Left$(sAfterData, Len(sAfterData) - 2)
                                    End If
                                    If (Len(sBeforeData) > 2) Then
                                        'Strip last CF LF
                                        sBeforeData = Left$(sBeforeData, Len(sBeforeData) - 2)
                                    End If
                                    Dim passport As New Smead.Security.Passport
                                    Dim oSLAuditUpdates As New SLAuditUpdate
                                    With oSLAuditUpdates
                                        .OperatorsId = Session("UserName")
                                        .TableName = oTable.TableName
                                        If (bDoAddNew) Then
                                            .Action = "Add Record"
                                        Else
                                            .DataBefore = sBeforeData
                                            .Action = "Update Record"
                                        End If
                                        .TableId = GetInfoUsingADONET.ZeroPaddedString(oTable, sId, _IDBManagerDefault, IsIdFieldString)
                                        .UpdateDateTime = Now

                                        .DataAfter = sAfterData
                                        .Domain = System.Environment.UserDomainName
                                        .ComputerName = System.Environment.MachineName
                                        .IP = passport.IPAddress
                                        .MacAddress = passport.MACAddr
                                        .Module = "Import Wizard"
                                        .NetworkLoginName = System.Environment.UserName
                                    End With
                                    If (oSLAuditUpdates IsNot Nothing) Then
                                        _iSLAuditUpdate.Add(oSLAuditUpdates)
                                        '' Need to work PJ
                                        GetInfoUsingADONET.WalkRelationshipsForAuditUpdates(sId, oSLAuditUpdates, oTable, oTable, 0&, Now, data_iDatabas, data_iRelationship, data_iTables, _iSLAuditUpdChildren, _IDBManagerDefault, _IDBManager)
                                        oSLAuditUpdates = Nothing
                                    End If
                                End If
                            End If

                            If (bDoAddNew) Then
                                If (Len(oTable.LSAfterAddRecord) > 0) Then
                                    ScriptEngine.RunScriptAfterAdd(oTable.TableName, sId, myBasePage.Passport)
                                End If
                                If ((oTrackDestination Is Nothing) And (Len(oTable.DefaultTrackingId) > 0&)) Then
                                    oTrackDestination = oDefaultTrackDestination
                                End If
                            Else
                                If (Len(oTable.LSAfterEditRecord) > 0) Then
                                    ScriptEngine.RunScriptAfterEdit(oTable.TableName, sId, myBasePage.Passport)
                                End If
                            End If
                            If (lError = 0) Then
                                If (Not (oTrackObject Is Nothing)) Then
                                    Dim errNum As Integer
                                    sTrackingReturn = ""
                                    If (Len(tTracking.sDestination)) Then
                                        sTrackingReturn = GetInfoUsingADONET.ValidateTracking(data_iDatabas, data_iTables, data_iSystem, data_iScanList, data_iView, data_iTableTab,
                                                                           data_iTabSet, data_iRelationship, oTrackObject, oTrackDestination, tTracking.sDestination,
                                                                           False, , errNum, _IDBManagerDefault, True)
                                    ElseIf (Not (moTrackDestination Is Nothing)) Then
                                        sTrackingReturn = GetInfoUsingADONET.ValidateTracking(data_iDatabas, data_iTables, data_iSystem, data_iScanList, data_iView, data_iTableTab,
                                                                           data_iTabSet, data_iRelationship, oTrackObject, oTrackDestination, tTracking.sDestination,
                                                                           True, moTrackDestination, errNum, _IDBManagerDefault, True)
                                    End If
                                    If (Len(sTrackingReturn) = 0) And (Not (oTrackObject.oTable Is Nothing)) Then
                                        sTrackingReturn = GetInfoUsingADONET.ValidateRetention(Nothing, data_iDatabas, oTrackObject.oTable, oTrackObject.Id, _IDBManagerDefault)
                                    End If
                                    If (Len(sTrackingReturn) > 0) Then
                                        oTrackObject = Nothing
                                        oTrackDestination = Nothing
                                        sReturnMessage = sTrackingReturn

                                        If (errorIndex = errNum) Then
                                            errorFlag = True
                                        Else
                                            errorFlag = False
                                        End If
                                        errorIndex = errNum
                                        If (oImportLoad.ReverseOrder) Then
                                            abortRecordIndex = abortRecordIndex - 1
                                        Else
                                            abortRecordIndex = abortRecordIndex + 1
                                        End If
                                        WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                        ImportLoadRecordForQuietProcessing = True
                                        Exit Function
                                    ElseIf (Not (oTrackDestination Is Nothing)) Then
                                        oTrackObject.Id = dtRecords.Rows(0)(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName))
                                        oTrackObject.TypedText = oTable.BarCodePrefix & oTrackObject.Id
                                        oTrackObject.UserLinkId = oTrackObject.Id
                                        If (Not IsIdFieldString) Then
                                            'Append values...
                                            oTrackObject.UserLinkId = GetInfoUsingADONET.ZeroPaddedString(oTrackObject.oTable, oTrackObject.UserLinkId, _IDBManagerDefault, IsIdFieldString)
                                        End If
                                        If (data_iSystem.FirstOrDefault.TrackingOutOn And data_iSystem.FirstOrDefault.DateDueOn) Then
                                            If (tTracking.dDateDue = DateTime.MinValue) Then
                                                If (oImportLoad.DateDue IsNot Nothing) Then
                                                    tTracking.dDateDue = oImportLoad.DateDue
                                                Else
                                                    If (oTrackDestination.DueBackDays <> Nothing) Then
                                                        tTracking.dDateDue = DateTime.Now().AddDays(oTrackDestination.DueBackDays)
                                                    Else
                                                        tTracking.dDateDue = DateTime.Now().AddDays(data_iSystem.FirstOrDefault.DefaultDueBackDays)
                                                    End If
                                                End If
                                            End If
                                            If (oTrackDestination.IsOut) Then
                                                If (tTracking.dDateDue = DateTime.MinValue) Then
                                                    errNum = 33
                                                    sTrackingReturn = Languages.Translation("msgBarCodeTrackingDueBackDateReq")
                                                Else
                                                    If (Date.Parse(tTracking.dDateDue.ToShortDateString) < Date.Parse(Now.ToShortDateString)) Then
                                                        errNum = 34
                                                        sTrackingReturn = Languages.Translation("DueBackDateLessThanCurrent")
                                                    End If
                                                End If
                                            End If
                                        End If

                                        If (Len(sTrackingReturn) > 0) Then
                                            oTrackObject = Nothing
                                            oTrackDestination = Nothing
                                            If (errorIndex = errNum) Then
                                                errorFlag = True
                                            Else
                                                errorFlag = False
                                            End If
                                            errorIndex = errNum
                                            If (oImportLoad.ReverseOrder) Then
                                                abortRecordIndex = abortRecordIndex - 1
                                            Else
                                                abortRecordIndex = abortRecordIndex + 1
                                            End If
                                            sReturnMessage = sTrackingReturn
                                            WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                            ImportLoadRecordForQuietProcessing = True
                                            Exit Function
                                        Else
                                            errNum = errorIndex
                                        End If
                                        sReturnMessage = String.Empty
                                        TrackingServices.PrepareTransferDataForImport(_IDBManagerDefault, _iSystem, _iSecureUser, _iTables, _iTrackingStatus, _iAssetStatus, _iDatabas, oTrackObject,
                                                                          oTrackDestination, tTracking.bDoRecon, tTracking.dDateDue, tTracking.sTrackingAdditionalField1, tTracking.sTrackingAdditionalField2,, sReturnMessage)

                                        If (sReturnMessage <> "") Then
                                            errorIndex = 0
                                            errorFlag = False
                                            If (oImportLoad.ReverseOrder) Then
                                                abortRecordIndex = abortRecordIndex - 1
                                            Else
                                                abortRecordIndex = abortRecordIndex + 1
                                            End If
                                            WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                            ImportLoadRecordForQuietProcessing = True
                                            Exit Function
                                        End If
                                    End If
                                End If

                                If (bDoAddNew) Then
                                    mlRecordsAdded = mlRecordsAdded + 1&
                                Else
                                    mlRecordsChanged = mlRecordsChanged + 1&
                                End If
                            End If
                            If ((bImageCopyField) Or (bPCFileCopyField)) Then
                                Dim sReturnError = ""
                                Dim oOutputSetting = data_iOutputSetting.Where(Function(m) m.Id.Trim.ToLower.Equals(oImportLoad.ScanRule.Trim.ToLower)).FirstOrDefault
                                ImageCopyForQuietProcessing(bImageCopyField, oTable, oOutputSetting, sImageName, dtRecords.Rows(0)(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName)), sOCRText, sReturnError, oImportLoad, _IDBManagerDefault, IsIdFieldString)
                                If (sReturnError <> "") Then
                                    errorIndex = 0
                                    errorFlag = False
                                    If (oImportLoad.ReverseOrder) Then
                                        abortRecordIndex = abortRecordIndex - 1
                                    Else
                                        abortRecordIndex = abortRecordIndex + 1
                                    End If
                                    sReturnMessage = sReturnError
                                    WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                    ImportLoadRecordForQuietProcessing = True
                                    Exit Function
                                End If
                                If (Not System.IO.Directory.Exists(sDirectory)) Then
                                    Dim DefaultsDirectory As String = ""
                                    If (VolumePath <> "\") Then
                                        DefaultsDirectory = VolumePath
                                    Else
                                        DefaultsDirectory = ""
                                    End If
                                    If (Not System.IO.Directory.Exists(DefaultsDirectory)) Then
                                        errorFlag = False
                                        If (oImportLoad.ReverseOrder) Then
                                            abortRecordIndex = abortRecordIndex - 1
                                        Else
                                            abortRecordIndex = abortRecordIndex + 1
                                        End If
                                        sReturnMessage = String.Format(Languages.Translation("msgImportCtrlProblemUsingDefaultOutputWithBR"), " <br/><br/>", currentImageName)
                                        Dim TempsErrorMesg = String.Format(Languages.Translation("msgImportCtrlProblemUsingDefaultOutput"), currentImageName)
                                        WriteErrorFile(oImportLoad, TempsErrorMesg, errorFlag, recordErrorTrack, Nothing, mrsImport)
                                        ImportLoadRecordForQuietProcessing = True
                                        Exit Function
                                    End If
                                End If
                            End If
                        End If
                    End If

                    sId = ""
                    lError = 0
                    sSql = Trim$(oImportLoad.SQLQuery)
                    If (bTrackingOnly) Then
                        If (Not (oTrackObject Is Nothing)) Then
                            sId = oTrackObject.Id
                            sTableName = oTrackObject.oTable.TableName
                        End If
                    Else
                        lIndex = InStr(1, sSql, "%ID%", vbTextCompare)

                        If (lIndex = 0) Then
                            lIndex = InStr(1, sSql, "%VALUE%", vbTextCompare)
                        End If

                        If (lIndex > 0) Then
                            sId = dtRecords.Rows(0)(DatabaseMap.RemoveTableNameFromField(oTable.IdFieldName))
                            sTableName = oTable.TableName
                        End If
                    End If

                    If (Len(sId) > 0) Then
                        lIndex = InStr(1, sSql, "%ID%", vbTextCompare)

                        If (lIndex > 0) Then
                            sSql = Mid$(sSql, 1, lIndex - 1&) & sId & Mid$(sSql, lIndex + 4&)
                        Else
                            lIndex = InStr(1, sSql, "%VALUE%", vbTextCompare)

                            If (lIndex > 0) Then
                                sSql = Mid$(sSql, 1, lIndex - 1) & sId & Mid$(sSql, lIndex + 7)
                            End If
                        End If
                        Dim sTable As Table = Nothing
                        Dim _IDBManagerForsTable As IDBManager = New ImportDBManager
                        If (Not String.IsNullOrEmpty(sTableName)) Then
                            sTable = data_iTables.Where(Function(m) m.TableName.Trim.ToLower.Equals(sTableName.Trim.ToLower)).FirstOrDefault
                            If (Not sTable Is Nothing) Then
                                If (Not String.IsNullOrEmpty(sTable.DBName)) Then
                                    Dim sDatabase = data_iDatabas.Where(Function(m) m.DBName.Trim.ToLower.Equals(sTable.DBName.Trim.ToLower)).FirstOrDefault
                                    _IDBManagerForsTable.ConnectionString = Keys.GetDBConnectionString(sDatabase)
                                    _IDBManagerForsTable.Open()
                                End If
                            End If
                        End If
                        If (lIndex > 0) Then
                            If (Not String.IsNullOrEmpty(sTable.DBName)) Then
                                lIndex = GetInfoUsingADONET.ProcessADONETRecord(sSql, _IDBManagerForsTable, sReturnMessage, lError)
                                _IDBManagerForsTable.Dispose()
                            Else
                                lIndex = GetInfoUsingADONET.ProcessADONETRecord(sSql, _IDBManagerDefault, sReturnMessage, lError)
                            End If
                            If (sReturnMessage <> "") Then
                                errorIndex = 0
                                errorFlag = False
                                WriteErrorFile(oImportLoad, sReturnMessage, errorFlag, recordErrorTrack, Nothing, mrsImport)
                            End If

                            If ((lIndex) And (lError = 0&)) Then
                                mlSQLHits = mlSQLHits + 1&
                            End If
                        End If
                    End If
                End If
            End If

            ImportLoadRecordForQuietProcessing = True
            TrackingServices.TelxonModeOn = bHoldTelxonMode
            TrackingServices.ScanDateTime = dHoldTelxonDate
            TrackingServices.TelxonUserName = sHoldTelxonUser
            Exit Function
        Catch ex As Exception
            Dim errNum = 3
            If (errorIndex = errNum) Then
                errorFlag = True
            Else
                errorFlag = False
            End If
            errorIndex = errNum
            If (oImportLoad.ReverseOrder) Then
                abortRecordIndex = abortRecordIndex - 1
            Else
                abortRecordIndex = abortRecordIndex + 1
            End If
            WriteErrorFile(oImportLoad, ex.Message, errorFlag, recordErrorTrack, ex, mrsImport)
            TrackingServices.TelxonModeOn = bHoldTelxonMode
            TrackingServices.ScanDateTime = dHoldTelxonDate
            TrackingServices.TelxonUserName = sHoldTelxonUser
            sReturnMessage = ex.Message
            ImportLoadRecordForQuietProcessing = True
        End Try
    End Function

    Public Function ValidateLoadOnEdit(LoadName As String, msHoldName As String, TrackDestinationId As String) As JsonResult
        Dim validTrackingJSON As String = ""
        Dim importLoadJSON As String = ""
        Try
            Keys.ErrorType = "r"
            If (Not String.IsNullOrEmpty(LoadName)) Then
                If (Not msHoldName.Trim.ToLower.Equals(LoadName.Trim.ToLower)) Then
                    Dim allImportLoad = _iImportLoad.All.OrderBy(Function(m) m.ID)
                    Dim IsExist = allImportLoad.Any(Function(m) m.LoadName.Trim.ToLower.Equals(LoadName.Trim.ToLower))
                    If (IsExist) Then
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlLoadAlreadyExistsVal"), LoadName)
                        Exit Try
                    End If
                End If
            End If

            Dim oImportLoad As ImportLoad
            Dim validTracking As Boolean = False
            If (TempData.ContainsKey("ImportLoad")) Then
                oImportLoad = TempData.Peek("ImportLoad")
            Else
                oImportLoad = _iImportLoad.Where(Function(m) m.LoadName.Trim.ToLower.Equals(LoadName.Trim.ToLower)).FirstOrDefault
            End If

            If (Not String.IsNullOrEmpty(TrackDestinationId)) Then
                Dim FoundBarCodeObj = TrackingServices.BarCodeLookup(Nothing, _iDatabas.All(), _iTables.All(), _iSystem.All(), _iScanList.All(), _iView.All(), _iTableTab.All(), _iTabSet.All(), _iRelationship.All(), TrackDestinationId)
                If (Not (FoundBarCodeObj Is Nothing)) Then
                    If (FoundBarCodeObj.oTable.TrackingTable > 0) Then
                        FoundBarCodeObj = FoundBarCodeObj
                    Else
                        FoundBarCodeObj = Nothing
                    End If
                End If
                If (FoundBarCodeObj Is Nothing) Then
                    validTracking = True
                    'Keys.ErrorType = "r"
                    Keys.ErrorMessage = String.Format(Languages.Translation("msgImportCtrlTrackingDestination"), TrackDestinationId)
                End If
            End If

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            validTrackingJSON = JsonConvert.SerializeObject(validTracking, Formatting.Indented, Setting)
            importLoadJSON = JsonConvert.SerializeObject(oImportLoad, Formatting.Indented, Setting)
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message
        End Try
        Return Json(New With {
                Key .validTrackingJSON = validTrackingJSON,
                Key .importLoadJSON = importLoadJSON,
                Key .errortype = Keys.ErrorType,
                Key .message = Keys.ErrorMessage
                }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
    End Function

    Public Function ShowLogFiles(LogType As Integer, LoadName As String) As FileResult
        Dim pathNameJSON As String = ""
        Try
            Dim oImportLoad As ImportLoad = Nothing
            Dim ServerPath As String = String.Empty
            Dim path As String = String.Empty
            If (Not String.IsNullOrEmpty(LoadName)) Then
                oImportLoad = _iImportLoad.Where(Function(m) m.LoadName.Trim().ToLower().Equals(LoadName.Trim().ToLower())).FirstOrDefault
            End If
            If (oImportLoad IsNot Nothing) Then
                'ServerPath = System.IO.Path.GetDirectoryName(oImportLoad.InputFile)
                If Not IsNothing(Session("ImportFilePath")) Then
                    ServerPath = System.IO.Path.GetDirectoryName(Session("ImportFilePath").ToString())
                End If
                If (LogType = 1) Then
                        path = System.IO.Path.Combine(ServerPath, "ReportLogFile.txt")
                    Else
                        path = System.IO.Path.Combine(ServerPath, "ErrorLogFile.txt")
                    End If
                End If

                If (LogType = 1) Then
                If (Not System.IO.File.Exists(path)) Then
                    Dim fs As FileStream = System.IO.File.Create(path)
                    fs.Close()
                End If
            Else
                If (Not System.IO.File.Exists(path)) Then
                    Dim fs As FileStream = System.IO.File.Create(path)
                    fs.Close()
                End If
            End If
            Return File(path, "text/plain")
        Catch ex As Exception
            Throw ex.InnerException
        End Try
    End Function

    Public Sub WriteErrorFile(oImportLoad As ImportLoad, sReturnMessage As String, errorFlag As Boolean, ByRef recordErrorTrack As Integer, Optional ByVal Ex As Exception = Nothing, Optional ByVal msImport As ADODB.Recordset = Nothing)
        Try
            Dim path As String = String.Empty
            'Dim errorTableName = oImportLoad.FileName
            'Dim ServerPath = System.IO.Path.GetDirectoryName(oImportLoad.InputFile)
            Dim errorTableName As String = String.Empty
            Dim ServerPath As String = String.Empty
            If Not IsNothing(Session("ImportFilePath")) Then
                errorTableName = oImportLoad.FileName
                ServerPath = System.IO.Path.GetDirectoryName(Session("ImportFilePath").ToString())
            End If
            path = System.IO.Path.Combine(ServerPath, "ErrorLogFile.txt")

            If (Not System.IO.File.Exists(path)) Then
                Dim fs As FileStream = System.IO.File.Create(path)
                fs.Close()
                Using writer As StreamWriter = System.IO.File.AppendText(path)
                    writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlTABFusionRMSImportErrorRecord"), "                      TAB FusionRMS"))
                    writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlStartTime"), "                      ", "             ", Keys.ConvertCultureDate(TrackingServices.StartTime, True)))
                    writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlEndTime"), "                        ", "             ", Keys.ConvertCultureDate(Now, True)))
                    writer.WriteLine("===========================================================================")
                    writer.WriteLine("===========================================================================")
                    If (Not String.IsNullOrEmpty(errorTableName)) Then
                        writer.WriteLine(String.Format(Languages.Translation("UserTableName"), errorTableName))
                    End If
                End Using
            End If
            Using writer As StreamWriter = System.IO.File.AppendText(path)
                Try
                    recordErrorTrack = recordErrorTrack + 1
                    If (errorFlag = False) Then
                        writer.WriteLine()
                        writer.WriteLine()
                        writer.WriteLine(Languages.Translation("msgImportCtrlError"), sReturnMessage)
                    End If
                    If (Not msImport Is Nothing) Then
                        Dim recordString As String = ""
                        For iCount = 0 To msImport.Fields.Count - 1
                            recordString = recordString + "'" & msImport.Fields(iCount).Value & "',"
                        Next
                        recordString = recordString.TrimEnd(",")
                        writer.WriteLine()
                        writer.Write(recordString)
                    End If
                Catch ex1 As Exception
                    WriteErrorFile(oImportLoad, ex1.Message, True, 0, ex1)
                End Try
            End Using
        Catch ex2 As Exception
            WriteErrorFile(oImportLoad, ex2.Message, True, 0, ex2)
            Throw ex2.InnerException
        End Try
    End Sub

    Public Sub WriteReportFile(oImportLoad As ImportLoad, tableUserName As String, mlRecordsRead As Integer, mlRecordsAdded As Integer, mlRecordsChanged As Integer, mlSQLHits As Integer, recordErrorTrack As Integer)
        Try
            'Dim ServerPath = System.IO.Path.GetDirectoryName(oImportLoad.InputFile)
            Dim path As String = ""
            'Dim oImportLoadFileName = System.IO.Path.GetFileName(oImportLoad.InputFile)

            Dim ServerPath As String = String.Empty
            Dim oImportLoadFileName As String = String.Empty

            If Not IsNothing(Session("ImportFilePath")) Then
                ServerPath = System.IO.Path.GetDirectoryName(Session("ImportFilePath").ToString())
                oImportLoadFileName = System.IO.Path.GetFileName(Session("ImportFilePath").ToString())
            End If

            path = System.IO.Path.Combine(ServerPath, "ReportLogFile.txt")
            If (System.IO.File.Exists(path)) Then
                System.IO.File.Delete(path)
            End If
            Dim fs As FileStream = System.IO.File.Create(path)
            fs.Close()

            Using writer As StreamWriter = System.IO.File.AppendText(path)
                writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlTABFusionRMSImportStatusReport"), "                      TAB FusionRMS"))
                writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlStartTime"), "                      ", "             ", Keys.ConvertCultureDate(TrackingServices.StartTime, True)))
                writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlEndTime"), "                        ", "             ", Keys.ConvertCultureDate(Now, True)))
                writer.WriteLine("===========================================================================")
                writer.WriteLine()
                writer.WriteLine()
                writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlLoadNameWithSpace"), "                       ", "             ", oImportLoad.LoadName))
                writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlFileImported"), "                   ", "             ", oImportLoadFileName))
                writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlDatabase"), "                        ", "             ", oImportLoad.DatabaseName))
                writer.WriteLine(String.Format(Languages.Translation("ImportTableWithSpace"), "                           ", "            ", tableUserName))
                writer.WriteLine()
                writer.WriteLine()
                writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlRecordsRead"), "                    ", "             ", mlRecordsRead))
                writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlRecordsAdded"), "                   ", "             ", mlRecordsAdded))
                writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlRecordsChanged"), "                 ", "             ", mlRecordsChanged))
                writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlRecordsError"), "                   ", "             ", recordErrorTrack))
                writer.WriteLine()
                writer.WriteLine(String.Format(Languages.Translation("msgImportCtrlSQLHits"), "                        ", "             ", mlSQLHits))
            End Using

        Catch ex As Exception
            Throw ex.InnerException
        End Try
    End Sub

    Private Sub ImageCopyForQuietProcessing(ByVal bImageCopy As Boolean, ByVal oTables As Table, ByVal oOutputSettings As OutputSetting, ByVal sImageName As String,
                                            ByVal sTableId As String, ByVal sOCRText As String, ByRef sReturnError As String, moImportLoads As ImportLoad,
                                            commonIDBManager As IDBManager, IsIdFieldString As Boolean)
        Dim bBadFile As Boolean = True
        Dim sErrorMessage As String = String.Empty
        Dim lAttachmentNumber As Long
        Dim lVersionNumber As Long
        Dim eSaveAction As Enums.geSaveAction
        ' Dim oTrackable As Trackable
        Dim BaseWebPageMain As New BaseWebPage
        If ((Not bBadFile) And (bImageCopy)) Then
            sReturnError = String.Format(Languages.Translation("msgImportCtrlPoints2PCFileNotImg"), IMAGE_COPY)
            Exit Sub
        ElseIf ((Not bBadFile) And (Not bImageCopy)) Then
            sReturnError = String.Format(Languages.Translation("msgImportCtrlPoints2ImgNotPCFile"), PCFILE_COPY)
            Exit Sub
        End If
        If (moImportLoads.SaveImageAsNewPage) Then
            eSaveAction = Enums.geSaveAction.saNewPage
        ElseIf (moImportLoads.SaveImageAsNewVersion) Or (moImportLoads.SaveImageAsNewVersionAsOfficialRecord) Then
            eSaveAction = Enums.geSaveAction.saNewVersion
        Else
            eSaveAction = Enums.geSaveAction.saNewAttachment
        End If

        If (bImageCopy) Then
            lAttachmentNumber = FindExistingAttachmentForQuietProcessing(sErrorMessage, eSaveAction, Enums.geTrackableType.tkImage, sImageName, oTables, sTableId, commonIDBManager, IsIdFieldString)
        Else
            lAttachmentNumber = FindExistingAttachmentForQuietProcessing(sErrorMessage, eSaveAction, Enums.geTrackableType.tkWPDoc, sImageName, oTables, sTableId, commonIDBManager, IsIdFieldString)
        End If
        Try
            If (Len(sErrorMessage) > 0&) Then
                If (bImageCopy) Then
                    sReturnError = String.Format(Languages.Translation("msgImportCtrlImage"), sErrorMessage)
                Else
                    sReturnError = String.Format(Languages.Translation("msgImportCtrlPCFile"), sErrorMessage)
                End If
            Else
                Dim ticket = BaseWebPageMain.Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()), oTables.TableName, sTableId).ToString()
                Dim attach As Smead.RecordsManagement.Imaging.Attachment = Nothing
                'Dim IsException As Boolean = False
                Dim info As Leadtools.Codecs.CodecsImageInfo = Common.GetCodecInfoFromFile(sImageName, System.IO.Path.GetExtension(sImageName))
                Select Case eSaveAction
                    Case Enums.geSaveAction.saNewAttachment
                        If info Is Nothing Then
                            attach = Smead.RecordsManagement.Imaging.Attachments.AddAttachmentForImport(ticket,
                                                                                                    BaseWebPageMain.Passport.UserId,
                                                                                                    String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                                                    oTables.TableName,
                                                                                                    sTableId,
                                                                                                    0,
                                                                                                    oOutputSettings.Id,
                                                                                                    sImageName,
                                                                                                    sImageName,
                                                                                                    System.IO.Path.GetExtension(sImageName),
                                                                                                    False,
                                                                                                    "",
                                                                                                    False,
                                                                                                    1,
                                                                                                    0,
                                                                                                    0,
                                                                                                    0)
                        Else
                            attach = Smead.RecordsManagement.Imaging.Attachments.AddAttachmentForImport(ticket,
                                                                            BaseWebPageMain.Passport.UserId,
                                                                            String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                            oTables.TableName,
                                                                            sTableId,
                                                                            0,
                                                                            oOutputSettings.Id,
                                                                            sImageName,
                                                                            sImageName,
                                                                            System.IO.Path.GetExtension(sImageName),
                                                                            False,
                                                                            "",
                                                                            True,
                                                                            info.TotalPages,
                                                                            info.Height,
                                                                            info.Width,
                                                                            info.SizeDisk)
                        End If
                    Case Enums.geSaveAction.saNewVersion
                        If (info Is Nothing) Then
                            attach = Smead.RecordsManagement.Imaging.Attachments.AddVersionForImport(ticket,
                                                                         BaseWebPageMain.Passport.UserId,
                                                                         String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                         oTables.TableName,
                                                                         sTableId,
                                                                         lAttachmentNumber,
                                                                         0,
                                                                         oOutputSettings.Id,
                                                                         sImageName,
                                                                         sImageName,
                                                                         moImportLoads.SaveImageAsNewVersionAsOfficialRecord,
                                                                         System.IO.Path.GetExtension(sImageName),
                                                                         False,
                                                                         False,
                                                                         1,
                                                                         0,
                                                                         0,
                                                                         0)
                        Else
                            attach = Smead.RecordsManagement.Imaging.Attachments.AddVersionForImport(ticket,
                                                                                           BaseWebPageMain.Passport.UserId,
                                                                                           String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                                           oTables.TableName,
                                                                                           sTableId,
                                                                                           lAttachmentNumber,
                                                                                           0,
                                                                                           oOutputSettings.Id,
                                                                                           sImageName,
                                                                                           sImageName,
                                                                                           moImportLoads.SaveImageAsNewVersionAsOfficialRecord,
                                                                                           System.IO.Path.GetExtension(sImageName),
                                                                                           False,
                                                                                           True,
                                                                                           info.TotalPages,
                                                                                           info.Height,
                                                                                           info.Width,
                                                                                           info.SizeDisk)
                        End If

                    Case Enums.geSaveAction.saNewPage
                        lVersionNumber = Smead.RecordsManagement.Imaging.Attachments.GetVersionCount(ticket,
                                                                                                          BaseWebPageMain.Passport.UserId,
                                                                                                         String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                                                         oTables.TableName,
                                                                                                         sTableId,
                                                                                                         lAttachmentNumber)
                        If (info Is Nothing) Then
                            Dim returnMessagePage = Smead.RecordsManagement.Imaging.Attachments.AddPageForImport(ticket,
                                                                                         BaseWebPageMain.Passport.UserId,
                                                                                         String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                                         oTables.TableName,
                                                                                         sTableId,
                                                                                         lAttachmentNumber,
                                                                                         lVersionNumber,
                                                                                         oOutputSettings.Id,
                                                                                         sImageName,
                                                                                         sImageName,
                                                                                         System.IO.Path.GetExtension(sImageName),
                                                                                         False,
                                                                                         True,
                                                                                         False,
                                                                                         True,
                                                                                         False,
                                                                                         1,
                                                                                         0,
                                                                                         0,
                                                                                         0)
                        Else
                            Dim returnMessagePage = Smead.RecordsManagement.Imaging.Attachments.AddPageForImport(ticket,
                                                             BaseWebPageMain.Passport.UserId,
                                                             String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                             oTables.TableName,
                                                             sTableId,
                                                             lAttachmentNumber,
                                                             lVersionNumber,
                                                             oOutputSettings.Id,
                                                             sImageName,
                                                             sImageName,
                                                             System.IO.Path.GetExtension(sImageName),
                                                             False,
                                                             True,
                                                             False,
                                                             True,
                                                             True,
                                                             info.TotalPages,
                                                             info.Height,
                                                             info.Width,
                                                             info.SizeDisk)
                        End If

                End Select
                'If (IsException) Then
                '    sReturnError = String.Format(Languages.Translation("msgImportCtrlProblemUsingDefaultOutputImageCopy"), Path.GetFileName(sImageName), vbNewLine)
                'End If
            End If
        Catch ex As Exception
            sReturnError = String.Format(Languages.Translation("msgImportCtrlProblemUsingDefaultOutputImageCopy"), Path.GetFileName(sImageName), vbNewLine)
        End Try

        'If (moImportLoads.DeleteSourceImage) Then
        '    Kill(sImageName)
        'End If
        'oTrackable = Nothing
        Exit Sub
    End Sub

    Public Function FindExistingAttachmentForQuietProcessing(ByRef sErrorMsg As String, ByRef eSaveAction As Enums.geSaveAction, ByVal eTrackableType As Enums.geTrackableType, ByVal sImageName As String, ByVal sTable As Table, ByVal sTableId As String,
                                           ByVal commonIDBManager As IDBManager, ByVal IsIdFieldString As Boolean, Optional ByRef lTrackableId As Long = -1&, Optional ByRef lTrackableVersion As Long = -1&, Optional ByRef lTrackablePageCount As Long = -1&) As Long
        Dim bFoundOne As Boolean
        Dim sExtension As String
        Dim oPCFilePointer As PCFilesPointer
        Dim oTrackable As Trackable
        FindExistingAttachmentForQuietProcessing = 0
        If (eSaveAction = Enums.geSaveAction.saNewAttachment) Then Exit Function
        Dim tempIndex = GetInfoUsingADONET.ZeroPaddedString(sTable, sTableId, commonIDBManager, IsIdFieldString)
        Dim moUserLinks As IQueryable(Of Userlink) = _iUserLink.Where(Function(m) m.IndexTable.Trim.ToLower.Equals(sTable.TableName.Trim.ToLower) And m.IndexTableId = tempIndex).OrderBy(Function(m) m.AttachmentNumber)
        For Each oUserLink In moUserLinks
            Dim moTrackable As IQueryable(Of Trackable) = _iTrackables.Where(Function(m) m.Id = oUserLink.TrackablesId And m.RecordTypesId = eTrackableType).OrderByDescending(Function(m) m.RecordVersion)

            For Each oTrackable In moTrackable
                Select Case eTrackableType
                    Case Enums.geTrackableType.tkImage
                        Dim dDateTime As DateTime = New Date
                        If (Len(IsCheckedOut(oTrackable, dDateTime)) > 0) Then
                            sErrorMsg = String.Format(Languages.Translation("msgImportCtrlIsCheckedOut"), CStr(oUserLink.AttachmentNumber))
                        Else
                            sErrorMsg = ""
                            bFoundOne = True
                            FindExistingAttachmentForQuietProcessing = oUserLink.AttachmentNumber
                            lTrackableId = oUserLink.TrackablesId
                            lTrackableVersion = oTrackable.RecordVersion
                            lTrackablePageCount = oTrackable.PageCount
                            oTrackable = Nothing
                            Exit For
                        End If
                    Case Enums.geTrackableType.tkWPDoc
                        Dim moPcFilePointer As IQueryable(Of PCFilesPointer) = _iPCFilePointer.Where(Function(m) m.TrackablesId = oTrackable.Id And m.TrackablesRecordVersion = oTrackable.RecordVersion).OrderBy(Function(m) m.PageNumber).ThenBy(Function(m) m.Id)
                        sExtension = Path.GetExtension(sImageName)

                        For Each oPCFilePointer In moPcFilePointer
                            FindExistingAttachmentForQuietProcessing = oUserLink.AttachmentNumber
                            lTrackableId = oUserLink.TrackablesId
                            lTrackableVersion = oTrackable.RecordVersion
                            lTrackablePageCount = oTrackable.PageCount

                            If (StrComp(sExtension, Path.GetExtension(oPCFilePointer.FileName), vbTextCompare) = 0) Then
                                Dim dDateTime As DateTime = New Date
                                If (Len(IsCheckedOut(oTrackable, dDateTime)) > 0) Then
                                    sErrorMsg = String.Format(Languages.Translation("msgImportCtrlIsCheckedOut"), CStr(oUserLink.AttachmentNumber))
                                Else
                                    sErrorMsg = ""
                                    bFoundOne = True
                                    If (eSaveAction = Enums.geSaveAction.saNewPage) Then eSaveAction = Enums.geSaveAction.saNewVersion
                                    oPCFilePointer = Nothing
                                    Exit For
                                End If
                            End If
                        Next oPCFilePointer

                        If (bFoundOne) Then
                            oTrackable = Nothing
                            Exit For
                        End If
                    Case Else
                End Select
            Next oTrackable

            If (bFoundOne) Then
                oUserLink = Nothing
                Exit For
            End If
        Next oUserLink

        If (Not bFoundOne) Then eSaveAction = Enums.geSaveAction.saNewAttachment
        Exit Function

    End Function

    Friend Function IsCheckedOut(ByVal oTrackable As Trackable, ByRef dDateTime As DateTime) As String
        Dim sReturn As String = String.Empty

        If ((Not (oTrackable Is Nothing)) AndAlso (oTrackable.Id <> 0)) Then
            Dim moTrackable = _iTrackables.Where(Function(m) m.Id = oTrackable.Id And m.RecordVersion = oTrackable.RecordVersion)
            If (moTrackable IsNot Nothing) Then
                For Each oTmpTrackable As Trackable In moTrackable
                    If (oTmpTrackable.CheckedOut) Then
                        dDateTime = oTmpTrackable.CheckedOutDate
                        sReturn = oTmpTrackable.CheckedOutUser
                        Exit For
                    End If
                Next
            End If
        End If

        Return sReturn
    End Function

    Private Function ConvertDateTime(ByVal vDateTime As Object, ByVal sDateFormat As String, ByVal pDefaultValue As Object, ByVal vSwingYear As Object, ByRef sReturnMessage As String, ByRef errorIndex As Integer, ByRef errorFlag As Boolean, Optional ByVal UseDefaultValue As Boolean = False) As Object
        Try
            Dim errNum = 0
            Dim DateArray() As String = Nothing
            Dim TimeArray() As String = Nothing
            Dim vDateTimeStr As String = Nothing
            Dim localDateFormat As String = Nothing
            If (Trim$(sDateFormat) = "") Then sDateFormat = "mm/dd/yyyy"

            If (String.IsNullOrEmpty(vDateTime)) Then
                vDateTime = ""
            Else
                vDateTime = Replace(vDateTime, "\", "/")
                vDateTime = Replace(vDateTime, "-", "/")
                vDateTime = Replace(vDateTime, " ", "/")
                vDateTime = Replace(vDateTime, ".", ":")
            End If

            If (Trim$(vDateTime) = "") Then
                If (Not String.IsNullOrEmpty(pDefaultValue)) Then
                    pDefaultValue = pDefaultValue.ToString().ToUpper()
                    If (StrComp(pDefaultValue, "TODAY", vbTextCompare) = 0& Or StrComp(pDefaultValue, "@@TODAY", vbTextCompare) = 0&) Then
                        UseDefaultValue = True
                    ElseIf (StrComp(pDefaultValue, "@@TIME", vbTextCompare) = 0&) Then

                    ElseIf (StrComp(pDefaultValue, "@@NOW", vbTextCompare) = 0&) Then
                        UseDefaultValue = True
                    Else
                        If (IsNothing(pDefaultValue)) Then pDefaultValue = ""
                        If (Trim$(pDefaultValue) = "") Then
                            vDateTime = ""
                        Else
                            vDateTime = pDefaultValue
                        End If
                    End If
                End If
            ElseIf (StrComp(vDateTime, "Today", vbTextCompare) = 0&) Then
                vDateTime = DateTime.Now.ToShortDateString
                UseDefaultValue = True
            End If

            'Added by Nikunj - FUS-4357 - Fix:2 - If there are any empty fields in the Excel file - Consider those as empty string on the record 
            If (Trim$(vDateTime) = "" AndAlso UseDefaultValue = False) Then Return vDateTime
            If (UseDefaultValue = True) Then
                Dim oNow = DateTime.Now
                If (sDateFormat.Contains("hh") And pDefaultValue.Equals("@@NOW")) Then
                    sDateFormat = "mm/dd/yyyy hh:mm:ss"
                    ReDim TimeArray(2)
                    TimeArray(0) = oNow.Hour
                    TimeArray(1) = oNow.Minute
                    TimeArray(2) = oNow.Second
                Else
                    sDateFormat = "mm/dd/yyyy"
                End If

                ReDim DateArray(2)
                DateArray(0) = oNow.Month
                DateArray(1) = oNow.Day
                DateArray(2) = oNow.Year
            Else
                vDateTimeStr = vDateTime.ToString()
                sDateFormat = sDateFormat.Trim().ToLower()
                If (InStr(sDateFormat, "/")) Then
                    If (InStr(vDateTimeStr, "/")) Then
                        DateArray = vDateTimeStr.Split("/")
                        If (sDateFormat.Contains("hh:mm:ss") And InStr(vDateTimeStr, ":") And DateArray.Length = 4) Then
                            TimeArray = DateArray(3).Split(":")
                        End If
                    Else
                        errNum = 22
                        GoTo lbl_ConvertDateTime
                    End If
                End If
            End If

            Select Case sDateFormat
                Case "dd/mm/yyyy", "dd/mm/yy", "dd/mm/yyyy hh:mm:ss", "dd/mm/yy hh:mm:ss", "mm/dd/yyyy", "mm/dd/yy", "mm/dd/yyyy hh:mm:ss", "mm/dd/yy hh:mm:ss"
                    If (DateArray.Length >= 3) Then
                        If (sDateFormat.Contains("yy")) Then 'sDateFormat.Contains("yyyy") Fixed: FUS-4357
                            If (DateArray(2).Length <> 4) Then
                                errNum = 20
                                GoTo lbl_ConvertDateTime
                                '  Exit Select
                            End If
                        Else
                            If (DateArray(2).Length <> 2) Then
                                errNum = 20
                                GoTo lbl_ConvertDateTime
                            End If
                        End If
                        If (sDateFormat.Contains("dd/mm/yy")) Then
                            If (DateArray(1) > 12 And DateArray(0) <= 12) Then
                                errNum = 20
                                GoTo lbl_ConvertDateTime
                            End If
                        ElseIf (sDateFormat.Contains("mm/dd/yy")) Then
                            If (DateArray(0) > 12 And DateArray(1) <= 12) Then
                                errNum = 20
                                GoTo lbl_ConvertDateTime
                            End If
                        End If
                        If (DateArray(2).Length = 2) Then
                            DateArray(2) = AddSwingYear(DateArray(2), vSwingYear)
                        End If
                        If (sDateFormat.Contains("dd/mm/yy")) Then
                            vDateTime = DateArray(1) & "/" & DateArray(0) & "/" & DateArray(2)
                        ElseIf (sDateFormat.Contains("mm/dd/yy")) Then
                            vDateTime = DateArray(0) & "/" & DateArray(1) & "/" & DateArray(2)
                        End If
                    Else
                        errNum = 22
                        GoTo lbl_ConvertDateTime
                    End If
                    Exit Select
                Case "yyyy/mm/dd", "yyyy/mm/dd hh:mm:ss", "yy/mm/dd", "yy/mm/dd hh:mm:ss", "yyyy/dd/mm", "yyyy/dd/mm hh:mm:ss", "yy/dd/mm", "yy/dd/mm hh:mm:ss"
                    If (DateArray.Length >= 3) Then
                        If (sDateFormat.Contains("yyyy")) Then
                            If (DateArray(0).Length <> 4) Then
                                errNum = 20
                                GoTo lbl_ConvertDateTime
                            End If
                        Else
                            If (DateArray(0).Length <> 2) Then
                                errNum = 20
                                GoTo lbl_ConvertDateTime
                            End If
                        End If
                        If (sDateFormat.Contains("yy/mm/dd")) Then
                            If (DateArray(1) > 12 And DateArray(2) <= 12) Then
                                errNum = 20
                                GoTo lbl_ConvertDateTime
                            End If
                        ElseIf (sDateFormat.Contains("yy/dd/mm")) Then
                            If (DateArray(2) > 12 And DateArray(1) <= 12) Then
                                errNum = 20
                                GoTo lbl_ConvertDateTime
                            End If
                        End If
                        If (DateArray(0).Length = 2) Then
                            DateArray(0) = AddSwingYear(DateArray(0), vSwingYear)
                        End If
                        If (sDateFormat.Contains("yyyy/mm/dd") Or sDateFormat.Contains("yy/mm/dd")) Then
                            vDateTime = DateArray(1) & "/" & DateArray(2) & "/" & DateArray(0)
                        ElseIf (sDateFormat.Contains("yyyy/dd/mm") Or sDateFormat.Contains("yy/dd/mm")) Then
                            vDateTime = DateArray(2) & "/" & DateArray(1) & "/" & DateArray(0) & " "
                        End If
                    Else
                        errNum = 22
                        GoTo lbl_ConvertDateTime
                    End If
                    Exit Select
                Case "mmddyy", "mmddyyhhmmss", "ddmmyy", "ddmmyyhhmmss", "yyddmm", "yyddmmhhmmss", "yymmdd", "yymmddhhmmss"
                    If (vDateTimeStr.Length = 6 Or vDateTimeStr.Length = 12) Then
                        If (sDateFormat.Contains("mmddyy")) Then
                            vDateTime = Left$(vDateTimeStr, 2) & "/" & Mid$(vDateTimeStr, 3, 2) & "/" & AddSwingYear(Mid$(vDateTimeStr, 5, 2), vSwingYear)
                        ElseIf (sDateFormat.Contains("ddmmyy")) Then
                            vDateTime = Mid$(vDateTimeStr, 3, 2) & "/" & Left$(vDateTimeStr, 2) & "/" & AddSwingYear(Mid$(vDateTimeStr, 5, 2), vSwingYear)
                        ElseIf (sDateFormat.Contains("yyddmm")) Then
                            vDateTime = Mid$(vDateTimeStr, 5, 2) & "/" & Mid$(vDateTimeStr, 3, 2) & "/" & AddSwingYear(Left$(vDateTimeStr, 2), vSwingYear)
                        Else
                            vDateTime = Mid$(vDateTimeStr, 3, 2) & "/" & Mid$(vDateTimeStr, 5, 2) & "/" & AddSwingYear(Left$(vDateTimeStr, 2), vSwingYear)
                        End If
                        If (sDateFormat.Contains("hhmmss")) Then
                            If (sDateFormat.Length = 12) Then
                                If (vDateTimeStr.Length = 12) Then
                                    vDateTime = vDateTime & " " & Mid$(vDateTimeStr, 7, 2) & ":" & Mid$(vDateTimeStr, 9, 2) & ":" & Mid$(vDateTimeStr, 11, 2)
                                ElseIf (vDateTimeStr.Length = 6) Then
                                    vDateTime = vDateTime & " " & "00:00:00"
                                End If
                            Else
                                errNum = 21
                                GoTo lbl_ConvertDateTime
                            End If
                        End If
                    Else
                        errNum = 21
                        GoTo lbl_ConvertDateTime
                    End If
                    Exit Select
                Case "ddmmyyyy", "ddmmyyyyhhmmss", "mmddyyyy", "mmddyyyyhhmmss"
                    If (vDateTimeStr.Length = 8 Or vDateTimeStr.Length = 14) Then
                        If (sDateFormat.Contains("mmddyyyy")) Then
                            vDateTime = Left$(vDateTimeStr, 2) & "/" & Mid$(vDateTimeStr, 3, 2) & "/" & Mid$(vDateTimeStr, 5, 4)
                        ElseIf (sDateFormat.Contains("ddmmyyyy")) Then
                            vDateTime = Mid$(vDateTimeStr, 3, 2) & "/" & Left$(vDateTimeStr, 2) & "/" & Mid$(vDateTimeStr, 5, 4)
                        End If
                        If (sDateFormat.Contains("hhmmss")) Then
                            If (sDateFormat.Length = 14) Then
                                If (vDateTimeStr.Length = 14) Then
                                    vDateTime = vDateTime & " " & Mid$(vDateTimeStr, 9, 2) & ":" & Mid$(vDateTimeStr, 11, 2) & ":" & Mid$(vDateTimeStr, 13, 2)
                                ElseIf (vDateTimeStr.Length = 8) Then
                                    vDateTime = vDateTime & " " & "00:00:00"
                                End If
                            Else
                                errNum = 21
                                GoTo lbl_ConvertDateTime
                            End If
                        End If
                    Else
                        errNum = 21
                        GoTo lbl_ConvertDateTime
                    End If
                    Exit Select
                Case "yyyyddmm", "yyyyddmmhhmmss", "yyyymmdd", "yyyymmddhhmmss"
                    If (vDateTimeStr.Length = 8 Or vDateTimeStr.Length = 14) Then
                        If (sDateFormat.Contains("yyyyddmm")) Then
                            vDateTime = Mid$(vDateTimeStr, 7, 2) & "/" & Mid$(vDateTimeStr, 5, 2) & "/" & Left$(vDateTimeStr, 4)
                        Else
                            vDateTime = Mid$(vDateTimeStr, 5, 2) & "/" & Mid$(vDateTimeStr, 7, 2) & "/" & Left$(vDateTimeStr, 4)
                        End If
                        If (sDateFormat.Contains("hhmmss")) Then
                            If (sDateFormat.Length = 14) Then
                                If (vDateTimeStr.Length = 14) Then
                                    vDateTime = vDateTime & " " & Mid$(vDateTimeStr, 9, 2) & ":" & Mid$(vDateTimeStr, 11, 2) & ":" & Mid$(vDateTimeStr, 13, 2)
                                ElseIf (vDateTimeStr.Length = 8) Then
                                    vDateTime = vDateTime & " " & "00:00:00"
                                End If
                            Else
                                errNum = 21
                                GoTo lbl_ConvertDateTime
                            End If
                        End If
                    Else
                        errNum = 21
                        GoTo lbl_ConvertDateTime
                    End If
                    Exit Select
            End Select

lbl_ConvertDateTime:
            If (errNum <> 0) Then
                If (errorIndex = errNum) Then
                    errorFlag = True
                Else
                    errorFlag = False
                End If
                errorIndex = errNum
                If (errNum = 20) Then
                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlDateFormatInValidORMissing"), vbNewLine)
                ElseIf (errNum = 21) Then
                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlDateFormatLengthNotMatched"), vbNewLine, vbTab, CStr(Len(sDateFormat)), sDateFormat, CStr(Len(vDateTime)), vDateTime)
                Else
                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlDateFormatInvalid"), "frmImportManager.ConvertDateTime")
                End If
            Else
                If (sDateFormat.Contains("hh:mm:ss")) Then
                    If (TimeArray IsNot Nothing) Then
                        vDateTime = vDateTime & " " & TimeArray(0) & ":" & TimeArray(1) & ":" & TimeArray(2)
                    Else
                        vDateTime = vDateTime & " " & "00:00:00"
                    End If
                End If
            End If
        Catch ex As Exception
            sReturnMessage = ex.Message
        End Try
        Return vDateTime
    End Function

    Private Function DateContainsTime(vDateTime As Object) As Boolean
        Dim lPos As Long
        Dim sDateTime As String
        On Error GoTo lbl_DateContainsTime
        sDateTime = vDateTime
        If (Len(sDateTime) = 0&) Then
            DateContainsTime = False
            Exit Function
        End If

        lPos = InStr(sDateTime, " ")
        If (lPos <= 8&) Then
            DateContainsTime = False
            Exit Function
        End If

        If (Len(sDateTime) <= (lPos + 1&)) Then
            DateContainsTime = False
            Exit Function
        End If


        DateContainsTime = IsNumeric(Mid$(sDateTime, lPos + 1&, 1&))
        Exit Function

lbl_DateContainsTime:
        DateContainsTime = True
    End Function

    Private Function AddSwingYear(ByVal vYear As Object, ByVal vSwingYear As Object) As String
        Dim lCentury As Long

        On Error GoTo lbl_AddSwingYear

        lCentury = CLng(Left$(Format$(Now, "yyyy"), 2&))

        If (Len(CStr(vYear)) = 2&) Then
            If Not IsNumeric(vYear) Then
                AddSwingYear = CStr(vYear)
            Else
                If CLng(vYear) <= CLng(vSwingYear) Then
                    AddSwingYear = CStr(lCentury) & CStr(vYear)
                Else
                    AddSwingYear = CStr(lCentury - 1&) & CStr(vYear)
                End If
            End If
        Else
            AddSwingYear = CStr(vYear)
        End If

        Exit Function

lbl_AddSwingYear:
        AddSwingYear = CStr(vYear)
    End Function

    Public Sub SetOverWriteError(eUpdateType As String, ByRef bDoAddNew As Boolean, ByRef bFound As Boolean, ByRef sReturnMessage As String, ByRef recordErrorTrack As Integer, ByRef errorIndex As Integer,
                              ByRef errorflag As Boolean)
        Select Case eUpdateType
            Case BOTH_DB_TEXT
                If (Not bFound) Then
                    bFound = True
                    bDoAddNew = True
                End If
            Case OVERWRITE_DB_TEXT
                If (Not bFound) Then
                    Dim errNum = 4
                    If (errorIndex = errNum) Then
                        errorflag = True
                    Else
                        errorflag = False
                    End If
                    errorIndex = errNum
                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlNoRecFound"), OVERWRITE_DISPLAY)
                End If
            Case NEW_DB_TEXT
                If (Not bFound) Then
                    bFound = True
                    bDoAddNew = True
                Else
                    Dim errNum = 5
                    If (errorIndex = errNum) Then
                        errorflag = True
                    Else
                        errorflag = False
                    End If
                    errorIndex = errNum
                    sReturnMessage = String.Format(Languages.Translation("msgImportCtrlRecFound"), NEW_DISPLAY)
                    bFound = False
                End If
            Case NEW_SKIP_DB_TEXT
                If (Not bFound) Then
                    bFound = True
                    bDoAddNew = True
                Else
                    'we found an existing record, so skip it.
                    bFound = False
                End If
        End Select
    End Sub

    Private Function IsFunction(vDefaultValue As Object) As Boolean
        IsFunction = False
        If (Not (((IsNothing(vDefaultValue)) Or (Trim$(vDefaultValue) = "")))) Then
            If (StrComp("concat::", Left$(Trim$(vDefaultValue), Len("concat::")), vbTextCompare) = 0) Then
                IsFunction = True
            End If
        End If
    End Function

    Private Function ProcessFunctionValue(vDefaultValue As Object) As String
        Dim lFuncIndex As Long
        Dim lFuncLBound As Long
        Dim lFuncUBound As Long
        Dim sReturn As String
        Dim mrsImport As New ADODB.Recordset
        lFuncLBound = -1
        lFuncUBound = -1
        sReturn = StripFunction(vDefaultValue)

        If (Len(Trim$(sReturn)) = 0&) Then
            ProcessFunctionValue = vDefaultValue
            Exit Function
        End If

        If (TempData.ContainsKey("ImportDataRS")) Then
            mrsImport = TempData.Peek("ImportDataRS")
        End If
        For lFuncIndex = 1 To mrsImport.Fields.Count
            Dim FieldValue = mrsImport.Fields(lFuncIndex - 1).Text
            If (Not IsDBNull(FieldValue)) Then
                StripQuotes(FieldValue)
                sReturn = ProcessFunction(sReturn, lFuncIndex, FieldValue)
            End If
        Next

        sReturn = PostProcessFunction(sReturn)
        ProcessFunctionValue = sReturn
    End Function

    Private Function StripFunction(vDefaultValue As Object) As String
        Dim lIndex As Long
        StripFunction = ""

        If (Not (((IsNothing(vDefaultValue)) Or (Trim$(vDefaultValue) = "")))) Then
            lIndex = InStr(1, vDefaultValue, "::", vbTextCompare)

            If (lIndex > 0) Then
                StripFunction = Right$(vDefaultValue, Len(vDefaultValue) - (lIndex + 1))
            End If
        End If
    End Function

    Private Function ProcessFunction(sField As String, lFuncIndex As Long, sReplaceText As String) As String
        Dim sLookFor As String
        Dim sTemp As String

        sTemp = sField
        sTemp = Replace$(sTemp, "\{", "[{[", 1, -1, vbTextCompare)
        sTemp = Replace$(sTemp, "\}", "]}]", 1, -1, vbTextCompare)

        sLookFor = "{f" & Trim$(CStr(lFuncIndex)) & "}"
        sTemp = Replace$(sTemp, sLookFor, sReplaceText, 1, -1, vbTextCompare)

        sTemp = Replace$(sTemp, "[{[", "\{", 1, -1, vbTextCompare)
        sTemp = Replace$(sTemp, "]}]", "\}", 1, -1, vbTextCompare)
        ProcessFunction = sTemp
    End Function

    Private Function PostProcessFunction(sField As String) As String
        Dim sTemp As String
        sTemp = sField
        sTemp = Replace$(sTemp, "\{", "{", 1, -1, vbTextCompare)
        sTemp = Replace$(sTemp, "\}", "}", 1, -1, vbTextCompare)
        PostProcessFunction = sTemp
    End Function

    Public Function StripQuotes(ByRef sStripFrom As String, Optional ByVal sQuote As String = """", Optional ByVal bReturnBlankOK As Boolean = True) As Boolean
        Dim sTestString As String

        On Error Resume Next

        If ((StrComp(Left$(sStripFrom, 1&), sQuote) = 0) And (StrComp(Right$(sStripFrom, 1&), sQuote) = 0)) Then
            sTestString = Mid$(sStripFrom, 2&, Len(sStripFrom) - 2&)
            If ((Len(Trim$(sTestString)) > 0) Or (bReturnBlankOK)) Then sStripFrom = sTestString
            StripQuotes = True
        End If
    End Function

    Public Function CheckIfObjectRegister(ByVal objName As String, ByVal objType As Enums.SecureObjectType) As Boolean
        Try
            Dim returnFlag As Boolean = False
            If ((objName IsNot Nothing) And Not String.IsNullOrEmpty(objName)) Then
                Dim objId = _iSecureObject.Where(Function(m) m.SecureObjectTypeID = objType And m.Name.Trim.ToLower.Equals(objName.Trim.ToLower))
                If (objId Is Nothing) Then
                    returnFlag = False
                Else
                    returnFlag = True
                End If

            End If
            Return returnFlag
        Catch ex As Exception
            Return False
        End Try
    End Function

    Public Sub SetRegisterTable(ByVal objName As String, ByVal objType As Enums.SecureObjectType)
        Try
            If ((objName IsNot Nothing) And Not String.IsNullOrEmpty(objName)) Then
                Dim SecureObjEntity As New SecureObject
                Dim TableTypeId = _iSecureObject.All.Where(Function(m) m.Name = "Tables").FirstOrDefault()
                If (Not (TableTypeId Is Nothing)) Then
                    SecureObjEntity.SecureObjectTypeID = TableTypeId.SecureObjectTypeID
                    SecureObjEntity.BaseID = TableTypeId.SecureObjectTypeID
                End If
                SecureObjEntity.Name = objName.Trim()
                _iSecureObject.Add(SecureObjEntity)
                _iSecureObject.CommitTransaction()
                Dim pSecureObject = _iSecureObject.All().Where(Function(x) x.Name.Trim().ToLower().Equals(objName.Trim.ToLower)).FirstOrDefault()
                Dim sSql = "INSERT INTO SecureObjectPermission (GroupID, SecureObjectID, PermissionID) SELECT GroupID," & pSecureObject.SecureObjectID & " AS SecureObjectId, PermissionID FROM SecureObjectPermission AS SecureObjectPermission WHERE     (SecureObjectID = " & pSecureObject.BaseID & ") AND (PermissionID IN (SELECT     PermissionID FROM          SecureObjectPermission AS SecureObjectPermission_1 WHERE (SecureObjectID = " & objType & ") AND (GroupID = 0)))"

                _IDBManager.ConnectionString = Keys.GetDBConnectionString
                _IDBManager.ExecuteNonQuery(System.Data.CommandType.Text, sSql)
                _IDBManager.Dispose()
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Sub

    Public Function MakeSureIsALoadedTable(ByVal sTableName As String, Optional ByVal sUserName As String = "") As Table
        Dim oTables = New Table
        Dim dbEngine As New DatabaseEngine

        With oTables
            oTables.TableName = sTableName.Trim
            .IdFieldName2 = ""

            If (dbEngine.DBName <> "DB_Engine") Then
                .DBName = dbEngine.DBName
            Else
                .DBName = ""
            End If

            Select Case sTableName.ToUpper
                Case "SYSNEXTTRACKABLE"
                    .IdFieldName = "NextTrackablesId"
                Case "LITIGATIONSUPPORT"
                    .IdFieldName = "CaseNumber"
                Case "LINKSCRIPT"
                    .IdFieldName = "ScriptName"
                    .IdFieldName2 = "ScriptSequence"
                Case "TRACKABLES"
                    .IdFieldName = "Id"
                    .IdFieldName2 = "RecordVersion"
                Case "DATABASES"
                    .IdFieldName = "DBName"
                Case "TABLES"
                    .IdFieldName = "TableName"
                Case "SLRETENTIONCODES"
                    .TableName = "SLRetentionCodes"
                    .IdFieldName = "Id"
                    .DescFieldPrefixOne = "Retention Code"
                    .DescFieldNameOne = "Id"
                    .DescFieldPrefixTwo = "Retention Desc"
                    .DescFieldNameTwo = "Description"
                    If (Len(sUserName) = 0) Then sUserName = "Retention Codes"

                    If (Not CheckIfObjectRegister(sTableName, Enums.SecureObjectType.Table)) Then
                        SetRegisterTable(sTableName, Enums.SecureObjectType.Table)
                    End If
                Case "SLRETENTIONCITATIONS"
                    .TableName = "SLRetentionCitations"
                    .IdFieldName = "Citation"
                    If (Len(sUserName) = 0) Then sUserName = "Citations Codes"

                    If (Not CheckIfObjectRegister(sTableName, Enums.SecureObjectType.Table)) Then
                        SetRegisterTable(sTableName, Enums.SecureObjectType.Table)
                    End If
                Case "SLRETENTIONCITACODES"
                    .TableName = "SLRetentionCitaCodes"
                    .IdFieldName = "Id"
                    If (Len(sUserName) = 0) Then sUserName = "Retention Citations Cross Reference"
                    If (Not CheckIfObjectRegister(sTableName, Enums.SecureObjectType.Table)) Then
                        SetRegisterTable(sTableName, Enums.SecureObjectType.Table)
                    End If
                Case "OPERATORS"
                    .IdFieldName = "UserName"
                Case "SECUREGROUP"
                    .IdFieldName = "GroupId"
                Case "SECUREOBJECT"
                    .IdFieldName = "SecureObjectId"
                Case "SECUREOBJECTPERMISSION"
                    .IdFieldName = "SecureObjectPermissionId"
                Case "SECUREPERMISSION"
                    .IdFieldName = "PermissionId"
                Case "SECUREPERMISSIONDESCRIPTION"
                    .IdFieldName = "SecureObjectId"
                    .IdFieldName2 = "PermissionId"
                Case "SECUREUSER"
                    .IdFieldName = "UserId"
                Case Else
                    .IdFieldName = "Id"
            End Select

            .OutTable = Enums.geTrackingOutType.otUseOutField
            .IdFieldName = (sTableName & "." & .IdFieldName)
            .ADOQueryTimeout = 30
            .ADOCacheSize = 1
            .ADOServerCursor = False
            If (Len(sUserName) > 0) Then
                .UserName = sUserName
            Else
                .UserName = sTableName
            End If
        End With
        Return oTables
    End Function
#End Region

End Class