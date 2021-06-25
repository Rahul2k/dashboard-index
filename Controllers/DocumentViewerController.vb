Imports Newtonsoft.Json
Imports Smead.Security
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.Mvc
Imports TabFusionRMS.Models
Imports TabFusionRMS.RepositoryVB
Imports TabFusionRMS.DataBaseManagerVB
Imports System.Globalization
Imports System.Data.SqlClient
Imports System.Drawing
Imports System.Drawing.Text
Imports System.Threading
Imports Smead.RecordsManagement.Imaging
Imports Smead.RecordsManagement.Navigation
Imports Leadtools
Imports Leadtools.Codecs
Imports Leadtools.Forms.DocumentWriters
Imports Leadtools.Svg
Imports Leadtools.Documents
Imports Leadtools.Documents.Document
Imports Leadtools.Caching
Imports Leadtools.Annotations.Core
Imports Leadtools.Forms.Ocr
Imports Leadtools.Drawing
Imports Leadtools.WinForms
Imports Exceptions = Smead.RecordsManagement.Imaging.Permissions.ExceptionString
Imports System.IO
Imports System.IO.Compression
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Helpers
Imports Smead.RecordsManagement

Public Class DocumentViewerController
    Inherits BaseController

    Dim Basewebpage As New BaseWebPage
    '
    ' GET:  
    'Private Shared cacheLead As Leadtools.Documents.Document
    Private ReadOnly Property _passport() As Passport
        Get
            Return CType(Session("Passport"), Passport)
        End Get
    End Property
    Private _annotations As IRepository(Of Annotation)
    Private _iSystem As IRepository(Of Models.System)
    Private _iTable As IRepository(Of Table)
    Private _iDatabas As IRepository(Of Databas)
    Private _iPCFilePointer As IRepository(Of PCFilesPointer)
    Private _iImagePointer As IRepository(Of ImagePointer)
    Private _iUserLink As IRepository(Of Userlink)
    Private _trackable As IRepository(Of Trackable)

    'call first
    Function Index(ByVal documentKey As String) As ActionResult
        Dim ViewModel = New DocumentViewerModel()
        If documentKey Is Nothing Then
            ViewModel.HasLink = "False"
        Else
            Try
                ViewModel.HasLink = "True"
                ViewModel.documentKey = documentKey
                GetListOfAttachments(ViewModel, -1)
            Catch ex As Exception
                slimShared.logError(ex.Message)
            End Try
        End If
        Return View(ViewModel)
    End Function

    'step 1 - this method must be called for every return to view without param
    Public Sub GetListOfAttachments(viewModel As DocumentViewerModel, Optional AttachmentNumber As Integer = -1)
        Dim TABDocService = ConfigurationManager.AppSettings("DocumentServicePort")
        'Dim volPermission = GetDefaultSystemDrive("View")
        'Dim bPermission = volPermission.ToString().Split(",")(1).Split(":")(1).ToString()
        'If bPermission.ToLower.Equals("true") Then
        MySession.Current.sConnectionString = Keys.GetDBConnectionString()
        _iTable = New RepositoryVB.Repositories(Of Table)
        _iDatabas = New RepositoryVB.Repositories(Of Databas)
        _iSystem = New RepositoryVB.Repositories(Of Models.System)
        _iPCFilePointer = New RepositoryVB.Repositories(Of PCFilesPointer)
        _iUserLink = New RepositoryVB.Repositories(Of Userlink)
        _iImagePointer = New RepositoryVB.Repositories(Of ImagePointer)
        Dim oSystem = _iSystem.All.FirstOrDefault()
        viewModel.renameOnScan = oSystem.RenameOnScan
        Dim queryString As String = viewModel.documentKey
        queryString = viewModel.documentKey.Substring(queryString.IndexOf("?") + 1)
        queryString = Common.DecryptURLParameters(queryString)
        Dim values() As String = queryString.Split("&")
        'Dim tabName = values(1).Split("=")(1)
        viewModel.TableName = values(1).Split("=")(1)
        viewModel.AttachmentNumberClick = values(2).Split("=")(1)
        viewModel.Tableid = values(0).Split("=")(1)
        'Dim AttachmentNumber As Integer = values(2).Split("=")(1)
        'AttachmentNumber = values(2).Split("=")(1)
        'If (values.Count = 4) Then
        '    Dim RedirectVal() = values(3).Split("=")
        '    If (RedirectVal(0).ToString.Equals("itemname")) Then
        '        ViewAttachmentOnLoad(viewModel, False, AttachmentNumber)
        '    ElseIf ((RedirectVal(0).ToString.Equals("redirect")) And (Convert.ToInt16(RedirectVal(1)) = 1)) Then
        '        ViewAttachmentOnLoad(viewModel, False, AttachmentNumber)
        '    ElseIf (RedirectVal(0).ToString.Equals("redirect")) And (Convert.ToInt16(RedirectVal(1)) = 0) Then
        '        ViewAttachmentOnLoad(viewModel, False, AttachmentNumber)
        '    End If
        'Else
        '    ViewAttachmentOnLoad(viewModel, False, AttachmentNumber)
        'End If
        ViewAttachmentOnLoad(viewModel, False, AttachmentNumber)
        'End If
    End Sub

    Private Sub ViewAttachmentOnLoad(ViewModel As DocumentViewerModel, Optional ShouldLast As Boolean = False, Optional AttachmentNumber As Integer = -1)
        Try
            Dim baseWebPage = Keys.BasePageObj
            If Not baseWebPage.Passport.CheckPermission(ViewModel.TableName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.View) Then
                ViewModel.ErrorMsg = Languages.Translation("msgHTML5CtrlNoPermissionViews") '"no permissions to view"
                Return
            End If

            Dim canviewOtherVersions As Boolean = baseWebPage.Passport.CheckPermission(ViewModel.TableName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Versioning)

            Dim loutput As DataSet = GetAllAttachmentVersion(ViewModel)
            Dim cnt = loutput.Tables(0).Rows.Count
            Dim CurrentVersion As Integer = 0
            If (cnt = 0) Then
                ViewModel.FilePath = "empty"
            Else
                ViewModel.FilePath = loutput.Tables(0).Rows(0).Item("FullPath")
                'Dim checkVersion As String = "False"
                Dim lastAttachmentNumber As Integer = -1

                For Each row In loutput.Tables(0).Rows
                    'Dim addAttachment As Boolean = False

                    If lastAttachmentNumber = -1 Then
                        lastAttachmentNumber = CInt(row.Item("AttachmentNumber"))
                        CurrentVersion = 0
                    Else
                        If lastAttachmentNumber <> CInt(row.Item("AttachmentNumber")) Then
                            lastAttachmentNumber = CInt(row.Item("AttachmentNumber"))
                            CurrentVersion = 0
                            'Else
                            '    addAttachment = False
                        End If
                    End If

                    Dim PageNumber As Integer = row.Item("PageNumber")
                    Dim path As String = row.Item("FullPath")
                    Dim Name = row.Item("OrgFileName")
                    Dim noteCount = CInt(row.Item("NoteCount"))
                    Dim Version = CInt(row.Item("RecordVersion"))
                    Dim pointerid = CInt(row.Item("PointerId"))
                    If CurrentVersion = 0 Then CurrentVersion = Version
                    Dim attchNumber = Convert.ToString(row.Item("AttachmentNumber"))
                    Dim RecordType = Convert.ToInt32(row.Item("RecordType"))
                    Dim trackbalesId = Convert.ToInt32(row.Item("TrackablesId"))
                    'Dim hasAnnotation As Boolean = CheckAnnotation(pointerid, attchNumber, Version, PageNumber)
                    Dim noName = String.Format(Languages.Translation("ddlDocumentViewerAttachmentName"), row.Item("AttachmentNumber").ToString())
                    If (IsDBNull(row.Item("OrgFileName"))) Then Name = noName

                    If (PageNumber = 0 OrElse PageNumber = 1) Then
                        If (canviewOtherVersions) OrElse (Not canviewOtherVersions AndAlso Version = CurrentVersion) Then
                            If (Version > 0) OrElse (IsDBNull(row.item("CheckedOutUserId")) OrElse baseWebPage.Passport.UserId = CInt(row.item("CheckedOutUserId"))) Then
                                Dim VolumName = Convert.ToString(row.item("VolumnName"))
                                If baseWebPage.Passport.CheckPermission(VolumName, Smead.Security.SecureObject.SecureObjectType.Volumes, Smead.Security.Permissions.Permission.View) Then
                                    ViewModel.AttachmentList.Add(New UIparams(Name, path, attchNumber, Math.Abs(Version), PageNumber, RecordType, noteCount, pointerid, trackbalesId, baseWebPage, ViewModel))
                                End If

                                'ElseIf addAttachment Then
                                '    ViewModel.AttachmentList.Add(New UIparams(Name, path, attchNumber, Math.Abs(Version), PageNumber, RecordType))
                            End If
                        End If
                    End If
                Next
            End If
        Catch ex As Exception
            slimShared.logError(String.Format("Error ""{0}"" occurred in DocumentViewerController.ViewAttachmentOnLoad", ex.Message))
        End Try
    End Sub


    <HttpPost>
    Function GetAttachmtsPermissions(getVariable As List(Of String)) As String
        Dim queryString = Common.DecryptURLParameters(getVariable(0))
        Dim values() As String = queryString.Split("&")
        Dim oTableName = values(1).Split("=")(1)
        Dim aPermission As Boolean = False
        Dim tabName As String = oTableName
        Dim baseWebPageTest = Keys.BasePageObj
        Try
            Select Case getVariable(1)
                Case "Add"
                    aPermission = baseWebPageTest.Passport.CheckPermission(tabName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Add)
                Case "Edit"
                    aPermission = baseWebPageTest.Passport.CheckPermission(tabName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Edit)
                Case "Delete"
                    aPermission = baseWebPageTest.Passport.CheckPermission(tabName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Delete)
                Case "Print"
                    aPermission = baseWebPageTest.Passport.CheckPermission(tabName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Print)
                Case Else
                    aPermission = False
            End Select
        Catch ex As Exception
            aPermission = ex.Message
        End Try
        Return aPermission.ToString()

    End Function
    Private Function GetAllAttachmentVersion(viewModel As DocumentViewerModel) As DataSet

        Dim queryString = viewModel.documentKey
        Dim recordIdParam As String = ""
        queryString = queryString.Substring(queryString.IndexOf("?") + 1)
        queryString = Common.DecryptURLParameters(queryString)

        Dim values() As String = queryString.Split("&")
        viewModel.TableName = values(1).Split("=")(1)
        'fix-https://jiratabfusion.atlassian.net/browse/FUS-6424
        'check the id type
        Dim command = String.Format("select TOP 1 * from {0}", viewModel.TableName)
        Dim cmd = New SqlCommand(command, Basewebpage.Passport.Connection)
        Dim reader = cmd.ExecuteReader(CommandBehavior.KeyInfo)
        Dim schematable = reader.GetSchemaTable()
        Dim idType = schematable.Rows(0).Item("DataType").ToString



        If idType = "System.Int32" Then
            recordIdParam = values(0).Split("=")(1).PadLeft(30, "0"c)
            viewModel.RecordId = Convert.ToInt32(values(0).Split("=")(1))
        Else
            viewModel.RecordId = HttpUtility.HtmlDecode(values(0).Split("=")(1))
            recordIdParam = HttpUtility.HtmlDecode(values(0).Split("=")(1))
        End If


        'gets crumbs
        viewModel.crumbName = _iTable.Where(Function(a) a.TableName = viewModel.TableName).FirstOrDefault().DescFieldPrefixOne
        Dim attachmentId = values(2).Split("=")(1)

        Dim oTable = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(viewModel.TableName.Trim().ToLower())).FirstOrDefault()
        If oTable Is Nothing Then Return Nothing

        Dim idFieldName = oTable.IdFieldName
        Dim csADOConn = New ADODB.Connection
        csADOConn = DataServices.DBOpen(_iDatabas.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(oTable.DBName.Trim().ToLower())).FirstOrDefault())

        If csADOConn IsNot Nothing Then
            If Not (DataServices.IdFieldIsString(csADOConn, viewModel.TableName, idFieldName)) Then viewModel.RecordId = viewModel.RecordId
            csADOConn.Close()
        End If

        Using abc As New DBManager(Keys.GetDBConnectionString)
            abc.CreateParameters(2)
            abc.AddParameters(0, "@tableId", recordIdParam)
            abc.AddParameters(1, "@tableName", viewModel.TableName)
            Return abc.ExecuteDataSet(System.Data.CommandType.StoredProcedure, "SP_RMS_GetAllAttchmentVersion")
        End Using
    End Function

    <HttpGet>
    Public Function GetDefaultSystemDrive(ByVal opt As String) As String
        Dim bIsValidOutputSettings As Boolean = False
        Dim bIsOutputSettingsActive As Boolean = False
        Dim vPermission As Boolean = False
        Try
            Dim _iSystem As RepositoryVB.Repositories(Of Models.System) = New RepositoryVB.Repositories(Of Models.System)
            Dim _iOutputSetting As RepositoryVB.Repositories(Of Models.OutputSetting) = New RepositoryVB.Repositories(Of Models.OutputSetting)
            Dim _iVolume As RepositoryVB.Repositories(Of Models.Volume) = New RepositoryVB.Repositories(Of Models.Volume)
            Dim _iSystemAddress As RepositoryVB.Repositories(Of Models.SystemAddress) = New RepositoryVB.Repositories(Of Models.SystemAddress)
            Dim oSystem = _iSystem.All.FirstOrDefault()
            Dim baseWebPage = Keys.BasePageObj

            If Not oSystem Is Nothing Then
                Dim oOutputSetting = _iOutputSetting.All().Where(Function(x) x.Id.Trim().ToLower().Equals(oSystem.DefaultOutputSettingsId.Trim.ToLower())).FirstOrDefault()
                If Not oOutputSetting Is Nothing Then
                    Dim oVolume = _iVolume.All().Where(Function(x) x.Id = oOutputSetting.VolumesId).FirstOrDefault()
                    If Not oVolume Is Nothing Then
                        Select Case opt
                            Case "Add"
                                vPermission = baseWebPage.Passport.CheckPermission(oVolume.Name, Smead.Security.SecureObject.SecureObjectType.Volumes, Smead.Security.Permissions.Permission.Add)
                            Case "Edit"
                                vPermission = baseWebPage.Passport.CheckPermission(oVolume.Name, Smead.Security.SecureObject.SecureObjectType.Volumes, Smead.Security.Permissions.Permission.Edit)
                            Case "Delete"
                                vPermission = baseWebPage.Passport.CheckPermission(oVolume.Name, Smead.Security.SecureObject.SecureObjectType.Volumes, Smead.Security.Permissions.Permission.Delete)
                            Case Else
                                vPermission = baseWebPage.Passport.CheckPermission(oVolume.Name, Smead.Security.SecureObject.SecureObjectType.Volumes, Smead.Security.Permissions.Permission.View)
                        End Select

                        If oVolume.Active <> False Then
                            Dim oSystemAddress = _iSystemAddress.All().Where(Function(x) x.Id = oVolume.SystemAddressesId).FirstOrDefault()
                            If Not oSystemAddress Is Nothing Then
                                Dim checkPath As String = oSystemAddress.PhysicalDriveLetter
                                If checkPath.StartsWith("\\") Then checkPath &= String.Format("{0}{1}",
                                    If(oVolume.PathName.StartsWith("\"), String.Empty, "\"), oVolume.PathName)
                                bIsValidOutputSettings = IO.Directory.Exists(checkPath) AndAlso baseWebPage.Passport.CheckPermission(oOutputSetting.Id, Smead.Security.SecureObject.SecureObjectType.OutputSettings, Smead.Security.Permissions.Permission.Access)
                                bIsOutputSettingsActive = CBoolean(oOutputSetting.InActive) = False
                            End If
                        End If
                    End If
                End If
            End If
        Catch ex As Exception

        End Try
        Return "ValidOutput:" + bIsValidOutputSettings.ToString() + ", vPermission:" + vPermission.ToString() + ", OutputActive:" + bIsOutputSettingsActive.ToString()
    End Function
#Region "ADD Attachment"
    <HttpPost>
    Public Function BtnOkClickAddFileWithName(getVariable As List(Of String)) As ActionResult
        Try
            Dim keydocument As String = getVariable(0)
            Dim filenamerequst As String = getVariable(1)
            Dim File As HttpPostedFileBase = Request.Files(0)
            Dim queryString As String = keydocument
            Dim ViewModel As New DocumentViewerModel()
            ViewModel.documentKey = keydocument
            queryString = Common.DecryptURLParameters(queryString)
            Dim values() As String = queryString.Split("&")
            Dim oTableName = HttpUtility.UrlDecode(values(1).Split("=")(1))
            Dim oTableId = HttpUtility.UrlDecode(values(0).Split("=")(1))
            Dim PostedFile As HttpPostedFileBase = Request.Files(0)
            'Dim FileName As String = System.Guid.NewGuid.ToString()
            'Dim ServerPath = Server.MapPath("~/ImportFiles/")
            Dim ServerPath = Server.MapPath("~/ImportFiles/" + _passport.UserId.ToString() + "/")
            If (Not System.IO.Directory.Exists(ServerPath)) Then
                System.IO.Directory.CreateDirectory(ServerPath)
            End If
            'FileName = FileName + Path.GetExtension(PostedFile.FileName)
            'Dim filePath = Server.MapPath("~/ImportFiles/" + FileName)
            Dim filePath = ServerPath + PostedFile.FileName
            PostedFile.SaveAs(filePath)
            Dim oAttachName As String = filenamerequst 'Request.Form("AttachmentID")
            AddAnAttachmentToDataBaseAndHardDrive(oTableName, oTableId, filePath, oAttachName)
            GetListOfAttachments(ViewModel, -1)
            Return PartialView("_DocviewerInit", ViewModel)
        Catch ex As Exception
            Throw
        End Try
    End Function
    <HttpPost>
    Public Function AddAttachmentFromScan(getVariable As List(Of String)) As ActionResult
        'Dim fileNameAfterSave As String
        Dim ViewModel As New DocumentViewerModel()
        Dim directory = System.Configuration.ConfigurationManager.AppSettings("lt.Cache.Directory")
        Try
            Dim keydocument As String = getVariable(0)
            Dim filenamerequst As String = getVariable(1)
            Dim queryString As String = keydocument
            ViewModel.documentKey = keydocument
            queryString = Common.DecryptURLParameters(queryString)
            Dim values() As String = queryString.Split("&")
            Dim oTableName = HttpUtility.UrlDecode(values(1).Split("=")(1))
            Dim oTableId = HttpUtility.UrlDecode(values(0).Split("=")(1))
            Dim filePath = directory + "/" + getVariable(2)
            Dim oAttachName As String = filenamerequst
            AddAnAttachmentToDataBaseAndHardDrive(oTableName, oTableId, filePath, oAttachName)
            GetListOfAttachments(ViewModel, -1)
            'fileNameAfterSave = ViewModel.AttachmentList.Where(Function(a) a.attchNumber = ViewModel.AttachmentList.Count).FirstOrDefault().FileName
            Return PartialView("_DocviewerInit", ViewModel)
        Catch ex As Exception
            Return PartialView("_DocviewerInit", ViewModel)
            'Return Json("your file didn't save, please connect your administrator " + ex.Message, JsonRequestBehavior.AllowGet)
        End Try
        'Return Json("Your attachment saved As  " + fileNameAfterSave, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function returnListOfAttachment(keydocument As String) As ActionResult
        Dim ViewModel As New DocumentViewerModel()
        ViewModel.documentKey = keydocument
        GetListOfAttachments(ViewModel, -1)
        Return PartialView("_DocviewerInit", ViewModel)
    End Function
    <HttpPost>
    Public Function AddMultipleAttachments(Keydocument As String) As ActionResult
        Dim ViewModel As New DocumentViewerModel()
        Try
            Dim queryString As String = Keydocument
            queryString = Common.DecryptURLParameters(queryString)
            ViewModel.documentKey = Keydocument
            Dim values() As String = queryString.Split("&")
            Dim oTableName = HttpUtility.UrlDecode(values(1).Split("=")(1))
            Dim oTableId = HttpUtility.UrlDecode(values(0).Split("=")(1))
            Dim ServerPath = Server.MapPath("~/ImportFiles/")
            If (Not System.IO.Directory.Exists(ServerPath)) Then
                System.IO.Directory.CreateDirectory(ServerPath)
            End If
            If (Request.Files.Count > 1) Then
                For i As Integer = 0 To Request.Files.Count - 1
                    Dim PostedFile As HttpPostedFileBase = Request.Files(i)
                    If PostedFile.ContentLength > 0 Then
                        Dim FileName As String = System.Guid.NewGuid.ToString()
                        FileName = FileName + Path.GetExtension(PostedFile.FileName)
                        PostedFile.SaveAs(Server.MapPath("~/ImportFiles/" + FileName))
                        Dim filePath = Server.MapPath("~/ImportFiles/" + FileName)
                        AddAnAttachmentToDataBaseAndHardDrive(oTableName, oTableId, filePath, String.Empty)
                    End If
                Next
                GetListOfAttachments(ViewModel, -1)
                'Return PartialView("_DocviewerInit", ViewModel)
            End If
        Catch ex As Exception
            Throw
        End Try
        Return PartialView("_DocviewerInit", ViewModel)
    End Function

    Private Sub AddAnAttachmentToDataBaseAndHardDrive(oTableName As String, oTableId As String, filePath As String, name As String)
        Dim BaseWebPageMain = Keys.BasePageObj
        If VerifyDrivePermissions("Add") AndAlso VerifySecurePermission("Add", oTableName) Then
            _iSystem = New RepositoryVB.Repositories(Of Models.System)
            Dim ticket = BaseWebPageMain.Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()), oTableName, oTableId).ToString()
            Dim oDefaultOutputSetting = _iSystem.All.FirstOrDefault.DefaultOutputSettingsId
            Dim info = Common.GetCodecInfoFromFile(filePath, System.IO.Path.GetExtension(filePath))
            If info Is Nothing Then
                Smead.RecordsManagement.Imaging.Attachments.AddAnAttachment(ticket,
                                                                            BaseWebPageMain.Passport.UserId,
                                                                            String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                            oTableName,
                                                                            oTableId,
                                                                            0,
                                                                            oDefaultOutputSetting,
                                                                            filePath,
                                                                            filePath,
                                                                            System.IO.Path.GetExtension(filePath),
                                                                            False,
                                                                            name, False, 1, 0, 0, 0)
            Else
                Smead.RecordsManagement.Imaging.Attachments.AddAnAttachment(ticket,
                                                                            BaseWebPageMain.Passport.UserId,
                                                                            String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                            oTableName,
                                                                            oTableId,
                                                                            0,
                                                                            oDefaultOutputSetting,
                                                                            filePath,
                                                                            filePath,
                                                                            System.IO.Path.GetExtension(filePath),
                                                                            False,
                                                                            name, True, info.TotalPages, info.Height, info.Width, info.SizeDisk)
            End If
        End If
    End Sub

#End Region
    Public Function VerifyDrivePermissions(objc As String) As Boolean
        'this method created to check again if there is any hacking on the browser level.
        Dim hasPermision = GetDefaultSystemDrive(objc)
        Dim validOutput = hasPermision.Split(",")(0).Split(":")(1)
        Dim vPermission = hasPermision.Split(",")(1).Split(":")(1)
        Dim OutputActive = hasPermision.Split(",")(2).Split(":")(1)
        If Not validOutput = "True" OrElse Not vPermission = "True" OrElse Not OutputActive = "True" Then
            Return False
        Else
            Return True
        End If
    End Function
    Public Function VerifySecurePermission(objc As String, tabName As String) As Boolean
        'this method created to check again if there is any hacking on the browser level.
        Dim aPermission As Boolean = False
        Dim baseWebPageTest = Keys.BasePageObj
        Try
            Select Case objc
                Case "Add"
                    aPermission = baseWebPageTest.Passport.CheckPermission(tabName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Add)
                Case "Edit"
                    aPermission = baseWebPageTest.Passport.CheckPermission(tabName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Edit)
                Case "Delete"
                    aPermission = baseWebPageTest.Passport.CheckPermission(tabName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Delete)
                Case "Print"
                    aPermission = baseWebPageTest.Passport.CheckPermission(tabName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Print)
                Case Else
                    aPermission = False
            End Select
        Catch ex As Exception
            aPermission = ex.Message
        End Try
        Return aPermission
    End Function
#Region "DELETE Attachment"

    Public Function BtnokClickDeleteAttachment(Keydocument As String, attachments As List(Of String)) As ActionResult
        If (Not VerifyDrivePermissions("Delete") = True) Then
            Return New EmptyResult
        End If

        Try
            Dim ViewModel As New DocumentViewerModel()
            ViewModel.documentKey = Keydocument
            Dim queryString = Keydocument
            queryString = Common.DecryptURLParameters(queryString)

            Dim values() As String = queryString.Split("&")
            Dim oTableName = values(1).Split("=")(1)
            Dim oTableId = values(0).Split("=")(1)
            Dim VersionNumber As Integer = 0
            Dim ReturnMessage As Attachment = Nothing

            For Each v In attachments
                Dim getValueRow = v.Split(",")
                Dim attachmentNum = getValueRow(0)
                Dim versionNum = getValueRow(1)
                Dim PageNum = getValueRow(2)
                Dim IsAttachmentDelete As Int16 = 1
                Dim AttachmentNumber = Convert.ToInt32(attachmentNum)
                If Basewebpage.Passport.CheckPermission(oTableName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Versioning) Then
                    VersionNumber = Convert.ToInt32(versionNum)
                Else
                    VersionNumber = 0
                End If
                'delete from the cart in case the file appear there
                Try
                    Dim command1 As String = "delete from s_AttachmentCart where attachmentNumber = @attachmentNumber and versionNumber = @versionNumber"
                    Using cmd As New SqlCommand(command1, Basewebpage.Passport.Connection)
                        cmd.Parameters.AddWithValue("@attachmentNumber", AttachmentNumber)
                        cmd.Parameters.AddWithValue("@versionNumber", versionNum)
                        cmd.ExecuteNonQuery()
                        'Dim adp = New SqlDataAdapter(cmd)
                        'Dim dTable = New DataTable()
                        'Dim datat = adp.Fill(dTable)
                        'For Each row As DataRow In dTable.Rows
                        '    'buildAttachmetList.Add(row("filePath"))
                        'Next
                    End Using
                Catch ex As Exception

                End Try



                Dim PageNumber = Convert.ToInt32(PageNum)
                Dim BaseWebPageMain = Keys.BasePageObj
                Dim ticket = BaseWebPageMain.Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()), oTableName, oTableId).ToString()
                Dim ChckOutVersion = CheckIfIsCheckOut(AttachmentNumber, Keydocument)
                If (IsAttachmentDelete = 0) Then
                    If (ChckOutVersion = 0) Then
                        ReturnMessage = Smead.RecordsManagement.Imaging.Attachments.DeleteAttachment(ticket,
                                                                                                BaseWebPageMain.Passport.UserId,
                                                                                                String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                                                oTableName,
                                                                                                oTableId,
                                                                                                AttachmentNumber,
                                                                                                0,
                                                                                                False)
                    Else
                        'Dim warningmsg = String.Format(Languages.Translation("msgDocViewerAttachIsCheckedOutAndCanNotBeDel"), AttachmentNumber)
                        'Dim scriptVar = "$('#WarningLabelID').empty();$('#WarningLabelID').append('" + warningmsg + "');$('#ConfirmWarning').modal('show');"
                        'ScriptManager.RegisterStartupScript(Me, Me.GetType(), "AttachmentWarning", scriptVar.ToString(), True)
                        'Exit Sub
                    End If

                ElseIf (IsAttachmentDelete = 1) Then
                    If (ChckOutVersion = 0) Then
                        ReturnMessage = Smead.RecordsManagement.Imaging.Attachments.DeleteAttachment(ticket,
                                                                                                     BaseWebPageMain.Passport.UserId,
                                                                                                     String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                                                     oTableName,
                                                                                                     oTableId,
                                                                                                     AttachmentNumber,
                                                                                                     VersionNumber,
                                                                                                     False)
                    Else
                        'Dim warningmsg = String.Format(Languages.Translation("msgDocViewerVersionsCantBDelWhenAttachIsChckdOut"), AttachmentNumber)
                        'Dim scriptVar = "$('#WarningLabelID').empty();$('#WarningLabelID').append('" + warningmsg + "');$('#ConfirmWarning').modal('show');"
                        'ScriptManager.RegisterStartupScript(Me, Me.GetType(), "VersionWarning", scriptVar.ToString(), True)
                        'Exit Sub
                    End If

                ElseIf (IsAttachmentDelete = 2) Then
                    If (ChckOutVersion = 0) Then
                        'Dim warningmsg = Languages.Translation("msgDocViewerToDelCurrentPageItMustBChckedOut")
                        'Dim scriptVar = "$('#WarningLabelID').empty();$('#WarningLabelID').append('" + warningmsg + "');$('#ConfirmWarning').modal('show');"
                        'ScriptManager.RegisterStartupScript(Me, Me.GetType(), "PageWarning", scriptVar.ToString(), True)
                        'Exit Sub
                    Else
                        Dim ReturnString As String = Smead.RecordsManagement.Imaging.Attachments.DeletePage(ticket,
                                                                                        BaseWebPageMain.Passport.UserId,
                                                                                        String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                                        oTableName,
                                                                                        oTableId,
                                                                                        AttachmentNumber,
                                                                                        ChckOutVersion,
                                                                                        PageNumber
                                                                                        )
                        If Not String.IsNullOrWhiteSpace(ReturnString) Then
                            ReturnMessage = New ErrorAttachment(New Exception(ReturnString), BaseWebPageMain.Passport.UserId, Session("Database"), oTableName, oTableId)
                        End If
                    End If
                End If

                If ReturnMessage IsNot Nothing Then
                    If TypeOf ReturnMessage Is ErrorAttachment Then
                        If String.IsNullOrWhiteSpace(ViewModel.ErrorMsg) Then
                            ViewModel.ErrorMsg = DirectCast(ReturnMessage, ErrorAttachment).Message
                        Else
                            ViewModel.ErrorMsg = String.Format("{0}{1}{2}", ViewModel.ErrorMsg, Environment.NewLine, DirectCast(ReturnMessage, ErrorAttachment).Message)
                        End If
                    End If
                    ReturnMessage = Nothing
                End If
            Next

            GetListOfAttachments(ViewModel, -1)
            Return PartialView("_DocviewerInit", ViewModel)
        Catch ex As Exception
            Throw
        End Try
    End Function
    Public Function UIMultipelFilecallCheckIffileIscheckOut(documentKey As String, attachments As List(Of String)) As JsonResult
        Dim ViewModel As New DocumentViewerModel()

        Dim queryString = documentKey
        queryString = Common.DecryptURLParameters(queryString)
        Dim values() As String = queryString.Split("&")
        Dim tabName = values(1).Split("=")(1)

        If Basewebpage.Passport.CheckPermission(tabName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Delete) Then
            For Each a In attachments
                Dim value = a.Split(",")
                Dim number = Convert.ToInt32(value(0))
                Dim FileFullName = value(1)
                Dim isCheckedOut = CheckIfIsCheckOut(number, documentKey)
                If isCheckedOut = 0 Then
                    'ViewModel.MsgFileCheckout.Add(FileFullName + "  Delete approve")
                    ViewModel.MsgFileCheckout.Add(String.Format(Languages.Translation("msgHTML5CtrlDelApprove"), FileFullName))
                Else
                    'ViewModel.MsgFileCheckout.Add(FileFullName + "  File is checked out can't be delete")
                    ViewModel.MsgFileCheckout.Add(String.Format(Languages.Translation("msgHTML5CtrlFileCheckedOutNoDel"), FileFullName))
                End If
            Next
            ViewModel.ErrorMsg = ""
        Else
            ViewModel.ErrorMsg = Languages.Translation("msgHTML5CtrlNoDelPer") '"Don't have Delete permissions"
        End If
        Return Json(ViewModel, JsonRequestBehavior.AllowGet)
    End Function

#End Region

#Region "Add version"
    Public Function UploadVersionAndsave(getvalues As List(Of String)) As ActionResult
        Dim ViewModel As New DocumentViewerModel()
        Try
            Dim keyDocument As String = getvalues(0)
            Dim AttachmentNumber As Integer = Convert.ToInt32(getvalues(1))
            ViewModel.documentKey = keyDocument
            'Dim ServerPath = Server.MapPath("~/ImportFiles/")
            Dim ServerPath = Server.MapPath("~/ImportFiles/" + _passport.UserId + "/")
            'Dim AttachmentNumber As Integer = Convert.ToInt32(Request.Form("AttachmentsDDL"))
            If (Not System.IO.Directory.Exists(ServerPath)) Then
                System.IO.Directory.CreateDirectory(ServerPath)
            End If

            If (Request.Files.Count > 0) Then
                Dim ChckOutVersion = CheckIfIsCheckOut(AttachmentNumber, keyDocument)
                If (ChckOutVersion = 0) Then
                    Dim queryString = keyDocument 'Request.RawUrl.ToString()
                    'queryString = Uri.UnescapeDataString(queryString)
                    'queryString = queryString.Replace("%2f", "/")
                    queryString = queryString.Substring(queryString.IndexOf("?") + 1)
                    queryString = Common.DecryptURLParameters(queryString)
                    Dim values() As String = queryString.Split("&")
                    Dim oTableName = values(1).Split("=")(1)
                    Dim oTableId = values(0).Split("=")(1)
                    Dim URLAttachment = AttachmentNumber 'values(2).Split("=")(1)
                    For i As Integer = 0 To Request.Files.Count - 1
                        Dim PostedFile As HttpPostedFileBase = Request.Files(i)
                        If PostedFile.ContentLength > 0 Then
                            'Dim FileName As String = System.Guid.NewGuid.ToString()
                            'FileName = FileName + Path.GetExtension(PostedFile.FileName)
                            Dim FileName = ServerPath + PostedFile.FileName
                            PostedFile.SaveAs(FileName)
                            'Dim filePath = Server.MapPath("~/ImportFiles/" + FileName)
                            AddAVersion(oTableName, oTableId, FileName, String.Empty, AttachmentNumber)
                        End If
                    Next
                    'queryString = queryString.Replace("&attachment=" + URLAttachment, "&attachment=" + AttachmentNumber.ToString())
                    'RedirectOnSamePage(queryString, False)
                Else
                    ViewModel.ErrorMsg = Languages.Translation("msgHTML5CtrlFileCheckedOutNoNewVersion") '"File checked out, you can't add a new versions"
                    'Dim PostedFile As HttpPostedFileBase = Request.Files(1)
                    'Dim warningMsg = String.Format(Languages.Translation("msgDocViewerTheFollowingErrOccuredWhileAdd"), PostedFile.FileName)
                    'Dim scriptVar = "$('#WarningLabelID').empty();$('#WarningLabelID').append('" + warningMsg + "');$('#ConfirmWarning').modal('show');"
                    'ScriptManager.RegisterStartupScript(Me, Me.GetType(), "sample", scriptVar.ToString(), True)
                    'filePath.Value = ""
                End If
                GetListOfAttachments(ViewModel, -1)
            End If
        Catch ex As Exception
            Throw
        End Try
        Return PartialView("_DocviewerInit", ViewModel)
    End Function

    Public Function UploadAssemblyVersion(getvalues As List(Of String)) As ActionResult
        Dim directory = System.Configuration.ConfigurationManager.AppSettings("lt.Cache.Directory")
        Dim ViewModel As New DocumentViewerModel()
        'prepare veriables
        Dim keyDocument As String = getvalues(0)
        ViewModel.documentKey = keyDocument
        Dim AttachmentNumber As Integer = Convert.ToInt32(getvalues(1))
        Dim versionNumber As Integer = Convert.ToInt32(getvalues(3))
        Dim filePath = directory + "/" + getvalues(2)
        Dim queryString = keyDocument
        queryString = queryString.Substring(queryString.IndexOf("?") + 1)
        queryString = Common.DecryptURLParameters(queryString)
        Dim values() As String = queryString.Split("&")
        Dim oTableName = values(1).Split("=")(1)
        Dim oTableId = values(0).Split("=")(1)

        'undo checkin before you add version 
        'this is a temporary solution for web checkin process.
        Dim params = New List(Of String)
        params.Add(keyDocument)
        params.Add(AttachmentNumber)
        params.Add(versionNumber)
        UndoCheckOut(params)

        AddAVersion(oTableName, oTableId, filePath, String.Empty, AttachmentNumber)
        GetListOfAttachments(ViewModel, -1)
        Return PartialView("_DocviewerInit", ViewModel)
    End Function
    Private Sub AddAVersion(oTableName As String, oTableId As String, filePath As String, name As String, AttachmentNumber As Integer)
        _iSystem = New RepositoryVB.Repositories(Of Models.System)
        Dim BaseWebPageMain = Keys.BasePageObj
        Dim ticket = BaseWebPageMain.Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()), oTableName, oTableId).ToString()
        Dim oDefaultOutputSetting = _iSystem.All.FirstOrDefault.DefaultOutputSettingsId
        Dim info = Common.GetCodecInfoFromFile(filePath, System.IO.Path.GetExtension(filePath))
        If info Is Nothing Then
            Smead.RecordsManagement.Imaging.Attachments.AddAVersion(ticket,
                                                                        BaseWebPageMain.Passport.UserId,
                                                                        String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                        oTableName,
                                                                        oTableId,
                                                                        AttachmentNumber,
                                                                        0,
                                                                        oDefaultOutputSetting,
                                                                        filePath,
                                                                        filePath,
                                                                        False,
                                                                        System.IO.Path.GetExtension(filePath),
                                                                        False, False, 0, 0, 0, 0)
        Else
            Smead.RecordsManagement.Imaging.Attachments.AddAVersion(ticket,
                                                                        BaseWebPageMain.Passport.UserId,
                                                                        String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                        oTableName,
                                                                        oTableId,
                                                                        AttachmentNumber,
                                                                        0,
                                                                        oDefaultOutputSetting,
                                                                        filePath,
                                                                        filePath,
                                                                        False,
                                                                        System.IO.Path.GetExtension(filePath),
                                                                        False, True, info.TotalPages, info.Height, info.Width, info.SizeDisk)
        End If
        'If System.IO.File.Exists(filePath) Then
        '    System.IO.File.Delete(filePath)
        'End If
    End Sub
#End Region

#Region "Rename attachment"
    Public Function RenameAttachment(variables As List(Of String)) As ActionResult
        Dim ViewModel As New DocumentViewerModel()
        Try
            _iPCFilePointer = New RepositoryVB.Repositories(Of PCFilesPointer)
            _iImagePointer = New RepositoryVB.Repositories(Of ImagePointer)
            _iUserLink = New RepositoryVB.Repositories(Of Userlink)
            ViewModel.documentKey = variables(0)
            Dim queryString = variables(0)
            queryString = queryString.Substring(queryString.IndexOf("?") + 1)
            queryString = Common.DecryptURLParameters(queryString)
            Dim values() As String = queryString.Split("&")
            Dim oTableName = values(1).Split("=")(1).ToString
            Dim oTableId = values(0).Split("=")(1)
            Dim oAttachmentNumber = Convert.ToInt32(variables(1))
            Dim BaseWebPageMain = Keys.BasePageObj
            Dim ticket = BaseWebPageMain.Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()), oTableName, oTableId).ToString
            Dim pcFilePointer = _iPCFilePointer.All().AsEnumerable()
            Dim userLink = _iUserLink.All().AsEnumerable()
            Dim imagePointer = _iImagePointer.All().AsEnumerable()
            Dim oTableIdString = oTableId
            If Not Smead.RecordsManagement.Navigation.FieldIsAString(oTableName, Keys.BasePageObj.Passport.StaticConnection) Then oTableIdString = TrackingServices.ZeroPaddedString(oTableId)
            Dim pcFileId = (From p In pcFilePointer Join u In userLink On p.TrackablesId Equals u.TrackablesId Where u.AttachmentNumber = Convert.ToInt32(oAttachmentNumber) And u.IndexTable = oTableName And u.IndexTableId = oTableIdString Select p.Id)
            Dim imageId = (From i In imagePointer Join u In userLink On i.TrackablesId Equals u.TrackablesId Where u.AttachmentNumber = Convert.ToInt32(oAttachmentNumber) And u.IndexTable = oTableName And u.IndexTableId = oTableIdString Select i.Id)

            Dim NewAttachmentName = variables(2)
            'If (NewAttachmentName = "") Then
            '    NewAttachmentName = String.Format(Languages.Translation("ddlDocumentViewerAttachmentName"), oAttachmentNumber)
            'End If
            If (pcFileId.Count <> 0) Then
                For Each a In pcFileId
                    Dim oRename As Boolean = Smead.RecordsManagement.Imaging.Attachments.RenameAttachment(ticket,
                                                              BaseWebPageMain.Passport.UserId,
                                                              String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                              oTableName,
                                                              oTableId,
                                                              oAttachmentNumber,
                                                              a,
                                                              False,
                                                              NewAttachmentName
                                                              )
                Next
            End If
            If (imageId.Count <> 0) Then
                For Each a In imageId
                    Dim oRename As Boolean = Smead.RecordsManagement.Imaging.Attachments.RenameAttachment(ticket,
                                                      BaseWebPageMain.Passport.UserId,
                                                      String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                      oTableName,
                                                      oTableId,
                                                      oAttachmentNumber,
                                                      a,
                                                      True,
                                                      NewAttachmentName
                                                      )
                Next
            End If

        Catch ex As Exception
            Throw
        End Try
        GetListOfAttachments(ViewModel, -1)
        Return PartialView("_DocviewerInit", ViewModel)
    End Function

#End Region

    'written for delete function 
    Private Function CheckIfIsCheckOut(attachmentNum As Integer, documentKey As String)
        Try
            Dim queryString = documentKey
            'queryString = Uri.UnescapeDataString(queryString)
            ''queryString = queryString.Replace("%2f", "/")
            'queryString = queryString.Substring(queryString.IndexOf("?") + 1)
            queryString = Common.DecryptURLParameters(queryString)
            Dim values() As String = queryString.Split("&")
            Dim id = values(0).Split("=")(1)
            Dim tableName = values(1).Split("=")(1)
            Dim AttachmentsDDLVal = attachmentNum 'AttachmentsDDL.SelectedItem.Value()
            Dim BaseWebPageMain = Keys.BasePageObj
            Dim CheckOutVar As Integer = Smead.RecordsManagement.Imaging.Attachments.IsCheckedOutPublic(tableName,
                                        TrackingServices.ZeroPaddedString(id),
                                        AttachmentsDDLVal,
                                        BaseWebPageMain.Passport.Connection)
            Return CheckOutVar
        Catch ex As Exception
            Throw
        End Try
    End Function


#Region "CHECKOUT\IN CONCEPT"
    Private Function CheckIfIsCheckOutToMe(attachmentNum As Integer, documentKey As String)
        Try
            Dim queryString = documentKey
            'queryString = Uri.UnescapeDataString(queryString)
            ''queryString = queryString.Replace("%2f", "/")
            queryString = queryString.Substring(queryString.IndexOf("?") + 1)
            queryString = Common.DecryptURLParameters(queryString)

            Dim values() As String = queryString.Split("&")

            Dim id = HttpUtility.UrlDecode(values(0).Split("=")(1))
            Dim tableName = values(1).Split("=")(1)
            Dim Attachmentsnum = attachmentNum
            Dim BaseWebPageMain = Keys.BasePageObj
            Dim CheckOutVar As Integer = Smead.RecordsManagement.Imaging.Attachments.IsCheckedOutToMePublic(BaseWebPageMain.Passport.UserId,
                                                                                                            tableName,
                                                                                                            TrackingServices.ZeroPaddedString(id),
                                                                                                            Attachmentsnum,
                                                                                                            BaseWebPageMain.Passport.Connection)
            Return CheckOutVar
        Catch ex As Exception
            Throw
        End Try
    End Function

    Public Function CheckBothIfcheckoutTomeAndcheckout(getVariables As List(Of String)) As JsonResult
        Dim ViewModel As New DocumentViewerModel()
        Dim documentKey As String = getVariables(0)
        Dim attachmentNum As Integer = Convert.ToInt32(getVariables(1))
        Try
            ViewModel.isCheckout = CheckIfIsCheckOut(attachmentNum, documentKey)
            ViewModel.isCheckoutTome = CheckIfIsCheckOutToMe(attachmentNum, documentKey)
            ViewModel.isCheckoutDesktop = isCheckoutInDesktop(attachmentNum, documentKey)
        Catch ex As Exception
            ViewModel.ErrorMsg = ex.Message + "couldn't get values"
        End Try

        Return Json(ViewModel, JsonRequestBehavior.AllowGet)
    End Function

    Private Function isCheckoutInDesktop(attachmentNum As Integer, documentKey As String) As Integer
        Dim queryString = documentKey
        queryString = queryString.Substring(queryString.IndexOf("?") + 1)
        queryString = Common.DecryptURLParameters(queryString)
        Dim values() As String = queryString.Split("&")
        Dim id = values(0).Split("=")(1)
        Dim tableName = values(1).Split("=")(1)
        Dim Attachmentsnum = attachmentNum
        Dim isCheckoutDesktop As Integer

        Dim sqlcmd As String = "select b.persistedcheckout from Userlinks a join Trackables b on a.TrackablesId = b.Id where IndexTable = @tableName and IndexTableId = @tableId and AttachmentNumber = @AttachmentNumber"
        Using cmd As New SqlCommand(sqlcmd, Basewebpage.Passport.Connection)
            cmd.Parameters.AddWithValue("@tableId", id)
            cmd.Parameters.AddWithValue("@tableName", tableName)
            cmd.Parameters.AddWithValue("@AttachmentNumber", Attachmentsnum)

            Dim adp = New SqlDataAdapter(cmd)
            Dim dTable = New DataTable()
            Dim datat = adp.Fill(dTable)
            isCheckoutDesktop = dTable.Rows(0)(0)
        End Using

        Return isCheckoutDesktop
    End Function

    Public Sub UndoCheckOut(getVariables As List(Of String))
        Try
            Dim queryString = getVariables(0)
            queryString = Common.DecryptURLParameters(queryString)
            Dim values = queryString.Split("&")
            Dim oTableId = values(0).Split("=")(1)
            Dim oTableName = values(1).Split("=")(1)
            'Dim URLAttachment = values(2).Split("=")(1)
            Dim oAttachmentNumber = getVariables(1)
            Dim oVersionNumber = getVariables(2)
            Dim oAttachment As Smead.RecordsManagement.Imaging.Attachment = Nothing
            Dim BaseWebPageMain = Keys.BasePageObj
            Dim ticket = BaseWebPageMain.Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()), oTableName, oTableId).ToString()
            oAttachment = Smead.RecordsManagement.Imaging.Attachments.UndoCheckOut(ticket,
                                                                                  BaseWebPageMain.Passport.UserId,
                                                                                  String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                                  oTableName,
                                                                                  oTableId,
                                                                                  oAttachmentNumber,
                                                                                  oVersionNumber,
                                                                                  False
                                                                                  )

        Catch ex As Exception
            Throw
        End Try
    End Sub

    Public Sub CheckOutAttachment(getVariables As List(Of String))
        Try
            Dim queryString = getVariables(0)
            Dim filePath As String = getVariables(1)
            queryString = Common.DecryptURLParameters(queryString)
            Dim values() As String = queryString.Split("&")
            Dim oTableName = values(1).Split("=")(1)
            Dim oTableId = values(0).Split("=")(1)
            Dim BaseWebPageMain = Keys.BasePageObj
            Dim ticket = BaseWebPageMain.Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()), oTableName, oTableId).ToString()
            Dim AttachmentNumber As Integer = getVariables(2)
            Dim VersionNumber As Integer = getVariables(3)
            Dim PageNumber = getVariables(4)
            'Dim URLAttachment = values(2).Split("=")(1)
            Dim info = Common.GetCodecInfoFromFile(filePath, System.IO.Path.GetExtension(filePath))
            If info Is Nothing Then
                Dim attachment As Smead.RecordsManagement.Imaging.Attachment = Smead.RecordsManagement.Imaging.Attachments.CheckOut(
                                                                                                         ticket,
                                                                                                         BaseWebPageMain.Passport.UserId,
                                                                                                         String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                                                         oTableName, oTableId, AttachmentNumber,
                                                                                                         VersionNumber, String.Empty,
                                                                                                         BaseWebPageMain.Passport.IPAddress,
                                                                                                         BaseWebPageMain.Passport.MACAddr,
                                                                                                         False, False)
            Else
                Dim attachment As Smead.RecordsManagement.Imaging.Attachment = Smead.RecordsManagement.Imaging.Attachments.CheckOut(
                                                                                                         ticket,
                                                                                                         BaseWebPageMain.Passport.UserId,
                                                                                                         String.Format("{0}\{1}", Session("Server").ToString(), Session("databaseName").ToString()),
                                                                                                         oTableName, oTableId, AttachmentNumber,
                                                                                                         VersionNumber, String.Empty,
                                                                                                         BaseWebPageMain.Passport.IPAddress,
                                                                                                         BaseWebPageMain.Passport.MACAddr,
                                                                                                         False, info.TotalPages)

                If TypeOf (attachment) Is ErrorAttachment Then
                    If DirectCast(attachment, ErrorAttachment).Message.ToLower.StartsWith("could not load file or assembly 'leadtools") Then
                        If info.TotalPages > 1 Then
                            Dim codec As New Codecs.RasterCodecs

                            For i As Integer = 1 To info.TotalPages
                                Using img As RasterImage = codec.Load(filePath, 0, CodecsLoadByteOrder.RgbOrGray, i, i)
                                    codec.Save(img, Path.Combine(Path.GetDirectoryName(filePath), Path.GetFileNameWithoutExtension(filePath)) & "_" & i.ToString & Path.GetExtension(filePath), img.OriginalFormat, img.BitsPerPixel)
                                End Using
                            Next
                        End If
                    End If
                Else
                    If info.TotalPages > 1 Then
                        Dim codec As New Codecs.RasterCodecs

                        For i As Integer = 1 To info.TotalPages
                            Using img As RasterImage = codec.Load(filePath, 0, CodecsLoadByteOrder.RgbOrGray, i, i)
                                codec.Save(img, Path.Combine(Path.GetDirectoryName(filePath), Path.GetFileNameWithoutExtension(filePath)) & "_" & i.ToString & Path.GetExtension(filePath), img.OriginalFormat, img.BitsPerPixel)
                            End Using
                        Next
                    End If
                End If

            End If



        Catch ex As Exception
            Dim msg = ex.Message
        End Try
    End Sub


#End Region

#Region "DOWNLOADAttachments"
    'Public Function DownloadFiles(attachmentsSelected As String) As ActionResult
    '    'Documents, 17;c:\temp\test
    '    If String.IsNullOrEmpty(attachmentsSelected) Then
    '        Return New EmptyResult
    '    End If
    '    Dim obj As FileDownloads = New FileDownloads()
    '    Dim filesCol = obj.GetFile(attachmentsSelected).ToList()

    '    'For Each info As AttachmentsFileInfo In filesCol
    '    '    info.FilePath = IsfileCreatedInDesktopDownload(variables, info.FilePath)
    '    'Next


    '    Response.Clear()
    '    Response.Buffer = False
    '    Response.AddHeader("Content-Disposition", "attachment;filename=Attachments.zip")
    '    Response.AddHeader("Content-Type", "application/x-zip-compressed")
    '    Using ziparchive = New ZipArchive(New ZipStreamWrapper(Response.OutputStream), ZipArchiveMode.Create)
    '        For i As Integer = 0 To filesCol.Count - 1
    '            Dim entry = ziparchive.CreateEntry(filesCol(i).FileName, CompressionLevel.Optimal)
    '            Using entryStream = entry.Open()
    '                Using fileStream = System.IO.File.OpenRead(filesCol(i).FilePath)
    '                    fileStream.CopyTo(entryStream)
    '                End Using
    '            End Using
    '        Next
    '    End Using
    '    Response.End()

    '    Return New EmptyResult()
    'End Function
    <HttpPost>
    Public Function DownloadFiles(params As List(Of FileDownloads), viewid As Integer) As HttpResponseBase
        Dim viewName = GetViewName(viewid, _passport)
        If Basewebpage.Passport.CheckPermission(viewName, Smead.Security.SecureObject.SecureObjectType.View, Smead.Security.Permissions.Permission.Export) Then
            If params.Count = 0 Then
                'Return New EmptyResult
            End If
            Dim obj As FileDownloads = New FileDownloads()
            Dim ServerPath = Server.MapPath("~/Downloads/")
            Dim filesCol = obj.GetFiles(params, Basewebpage.Passport, ServerPath).ToList()

            'For Each info As AttachmentsFileInfo In filesCol
            '    info.FilePath = IsfileCreatedInDesktopDownload(variables, info.FilePath)
            'Next
            Response.Clear()
            Response.Buffer = False
            Response.AddHeader("Content-Disposition", "attachment;filename=Attachments.zip")
            Response.AddHeader("Content-Type", "application/x-zip-compressed")
            Using ziparchive = New ZipArchive(New ZipStreamWrapper(Response.OutputStream), ZipArchiveMode.Create)
                For i As Integer = 0 To filesCol.Count - 1
                    Dim entry = ziparchive.CreateEntry(filesCol(i).FileName, CompressionLevel.Optimal)
                    Using entryStream = entry.Open()
                        Using fileStream = System.IO.File.OpenRead(filesCol(i).FilePath)
                            fileStream.CopyTo(entryStream)
                        End Using
                    End Using
                Next
            End Using
            Response.End()
            'delete temp files
            For Each del In obj.deleteTempFile
                Try
                    My.Computer.FileSystem.DeleteFile(del)
                Catch ex As Exception
                    'do nothing, it's a temporary file anyway
                End Try
            Next
            Return Response
        Else
            Return Response
        End If
    End Function
#End Region
#Region "CREAT TEMP FILE IN CACHE"
    Private Function GetFilesPerAttachment(variables As List(Of String)) As List(Of String)
        'if file created in desktop compose file and return cach temp file
        'otherwise show the file.
        ' this method check if file has note and annotation as well.
        Dim pathString As New List(Of String)
        Dim AttachmentNumber = variables(1)
        Dim VarsionNumber = variables(2)
        Dim queryString As String = variables(0)
        Dim documentId As String = ""
        queryString = queryString.Substring(queryString.IndexOf("?") + 1)
        queryString = Common.DecryptURLParameters(queryString)

        Dim values() As String = queryString.Split("&")

        Dim id = values(0).Split("=")(1)
        Dim tableName = values(1).Split("=")(1)
        Dim attachmentId = values(2).Split("=")(1)

        Using cmd As New SqlCommand("SP_RMS_GetFilesPaths", Basewebpage.Passport.Connection)
            cmd.CommandType = CommandType.StoredProcedure
            cmd.Parameters.AddWithValue("@tableId", id)
            cmd.Parameters.AddWithValue("@tableName", tableName)
            cmd.Parameters.AddWithValue("@AttachmentNumber", AttachmentNumber)
            cmd.Parameters.AddWithValue("@RecordVersion", VarsionNumber)

            Dim adp = New SqlDataAdapter(cmd)
            Dim dTable = New DataTable()
            Dim datat = adp.Fill(dTable)
            For Each row As DataRow In dTable.Rows
                Dim getpath = row("FullPath")
                ' Dim pointerid = Convert.ToInt32(row("pointerId"))
                pathString.Add(getpath)
            Next
        End Using

        Return pathString
    End Function

    Public Function IsfileCreatedInDesktop(variables As List(Of String)) As JsonResult
        Dim documentId As String = ""
        Dim pathString As List(Of String) = GetFilesPerAttachment(variables)

        If pathString.Count > 1 Then documentId = SaveTempFileTocache(pathString)
        Return Json(New With {.documentid = documentId, .pageCount = pathString.Count}, JsonRequestBehavior.AllowGet)
    End Function
    Private Function SaveTempFileTocache(pathString As List(Of String)) As String
        Dim documentId As String = Nothing
        Dim cache = ServiceHelper.Cache

        'Dim today = DateTime.Now
        'Dim policies As New CacheItemPolicy
        'policies.AbsoluteExpiration = today.AddDays(2)

        'Create a New document 
        Dim createOptions As New CreateDocumentOptions()
        createOptions.Cache = cache
        createOptions.UseCache = True

        Using document As Leadtools.Documents.Document = DocumentFactory.Create(createOptions)
            document.Name = "TempDocument"
            document.AutoDeleteFromCache = False
            document.AutoDisposeDocuments = True

            For Each item In pathString
                Dim loadOptions As New LoadDocumentOptions()
                loadOptions.Cache = cache
                Dim child = DocumentFactory.LoadFromFile(item, loadOptions)
                child.AutoDeleteFromCache = False
                child.AutoDisposeDocuments = True
                child.SaveToCache()
                'loop through each file and build document
                For Each page In child.Pages
                    document.Pages.Add(page)
                Next
            Next

            document.SaveToCache()


            documentId = document.DocumentId
        End Using

        Return documentId
    End Function

#End Region

#Region "Add to attachment cart"
    <HttpPost>
    Public Function AddAttachmenToShoppingCart(keydocument As String, filesList As List(Of String)) As JsonResult
        Dim msg As String = "true"
        Dim ViewModel As New DocumentViewerModel()
        Dim buildAttachmetList As New List(Of String)
        Dim userID = Basewebpage.Passport.UserId
        Dim queryString As String = keydocument
        queryString = queryString.Substring(queryString.IndexOf("?") + 1)
        queryString = Common.DecryptURLParameters(queryString)
        'first check if file exist in the attachment cart already.
        Dim command1 As String = "select * from s_AttachmentCart where UserID = @userID"
        Using cmd As New SqlCommand(command1, Basewebpage.Passport.Connection)
            cmd.Parameters.AddWithValue("@userID", userID)
            Dim adp = New SqlDataAdapter(cmd)
            Dim dTable = New DataTable()
            Dim datat = adp.Fill(dTable)
            For Each row As DataRow In dTable.Rows
                buildAttachmetList.Add(row("filePath"))
            Next
        End Using
        Dim values() As String = queryString.Split("&")
        Dim Id = values(0).Split("=")(1)
        Dim tableName = values(1).Split("=")(1)
        Dim attachmentId = values(2).Split("=")(1)
        Dim record As String = String.Format("{0} {1}", tableName, Id)
        If Not Navigation.FieldIsAString(tableName, _passport) Then
            record = String.Format("{0} {1}", tableName, Convert.ToInt32(Id))
        End If
        Try
            For Each F In filesList
                Dim prop = F.Split(",")
                Dim getfile = Common.DecryptURLParameters(prop(0))
                Dim filePath As String = Server.UrlDecode(getfile)
                Dim fileName As String = prop(1)
                Dim attachmentNum As Integer = Convert.ToInt32(prop(2))
                Dim versionNumber As Integer = Convert.ToInt32(prop(3))
                Dim checkIfExist = buildAttachmetList.Where(Function(a) a = filePath).Count()
                If checkIfExist = 0 Then
                    Dim command As String = "insert into s_AttachmentCart([UserId],[Username], [Record], [filePath], [fileName], [attachmentNumber], [versionNumber]) values(@userID, 'userName', @record, @filePath, @fileName, @attachmentNum, @versionNumber)"
                    Using cmd As New SqlCommand(command, Basewebpage.Passport.Connection)
                        cmd.Parameters.AddWithValue("@userID", userID)
                        cmd.Parameters.AddWithValue("@record", record)
                        cmd.Parameters.AddWithValue("@filePath", filePath)
                        cmd.Parameters.AddWithValue("@fileName", fileName)
                        cmd.Parameters.AddWithValue("@attachmentNum", attachmentNum)
                        cmd.Parameters.AddWithValue("@versionNumber", versionNumber)
                        cmd.ExecuteNonQuery()
                    End Using
                End If
            Next
        Catch ex As Exception
            msg = ex.Message
        End Try
        Return Json(msg, JsonRequestBehavior.AllowGet)
    End Function
    Private Function GetAttachmentCartData() As DocumentViewerModel
        Dim userID = Basewebpage.Passport.UserId
        Dim ViewModel As New DocumentViewerModel()
        Try
            Dim command As String = "select * from s_AttachmentCart where UserID = @userID"
            Using cmd As New SqlCommand(command, Basewebpage.Passport.Connection)
                cmd.Parameters.AddWithValue("@userID", userID)
                Dim adp = New SqlDataAdapter(cmd)
                Dim dTable = New DataTable()
                Dim datat = adp.Fill(dTable)
                For Each row As DataRow In dTable.Rows
                    ViewModel.AttachmentCartList.Add(New AttachmentCart(row("Id"), row("UserId"), row("Record"), row("filePath"), row("fileName"), row("attachmentNumber"), row("versionNumber")))
                Next
                ViewModel.ErrorMsg = "false"
                Return ViewModel
            End Using
        Catch ex As Exception
            ViewModel.ErrorMsg = ex.Message
            Return ViewModel
        End Try
    End Function
    Public Function GetListOfAttachmentUI() As JsonResult
        Dim getData = GetAttachmentCartData()
        Return Json(getData, JsonRequestBehavior.AllowGet)
    End Function
    Public Function RemoveAttachmentFromCart(ListId As List(Of String)) As JsonResult
        Dim getData As DocumentViewerModel = Nothing
        Try
            For Each id In ListId
                Dim command As String = "delete from s_AttachmentCart where Id = @Id"
                Using cmd As New SqlCommand(command, Basewebpage.Passport.Connection)
                    cmd.Parameters.AddWithValue("@Id", id)
                    cmd.ExecuteNonQuery()
                End Using
            Next
            getData = GetAttachmentCartData()
            getData.ErrorMsg = "false"
        Catch ex As Exception
            getData.ErrorMsg = ex.Message
        End Try
        Return Json(getData, JsonRequestBehavior.AllowGet)
    End Function
#End Region
    Function OCRSearchIndataBase(variables As List(Of String)) As JsonResult
        Dim AttachNumber = variables(1)
        Dim Vernumber = variables(2)
        Dim Search = variables(3)
        Dim getListOfpages = New List(Of SLIndexer)
        'get the encryption key
        Try
            Dim queryString As String = variables(0)
            queryString = queryString.Substring(queryString.IndexOf("?") + 1)
            queryString = Common.DecryptURLParameters(queryString)
            Dim values() As String = queryString.Split("&")
            Dim id = Convert.ToInt32(values(0).Split("=")(1))
            Dim tableName = values(1).Split("=")(1)

            Dim db = New TABFusionRMSContext(Basewebpage.Passport.ConnectionString)
            getListOfpages = db.SLIndexers.Where(Function(a) a.IndexType = 4 Or a.IndexType = 5 Or a.IndexType = 6 And a.IndexTableName = tableName And a.IndexTableId = id And a.IndexData.Contains(Search) And a.AttachmentNumber = AttachNumber And a.RecordVersion = Vernumber).OrderBy(Function(a) a.PageNumber).ToList()
        Catch ex As Exception
            Dim msg = ex.Message
        End Try

        Return Json(getListOfpages, JsonRequestBehavior.AllowGet)
    End Function

    'Note: add delete 
    'Dim db = New TABFusionRMSContext(Basewebpage.Passport.ConnectionString)
    Public Function GetListofNotes(variables As List(Of String)) As JsonResult
        Dim pointerID = variables(0)
        _annotations = New RepositoryVB.Repositories(Of Annotation)

        Dim getList = _annotations.Where(Function(a) a.TableId = pointerID).ToList()
        Dim lst = New List(Of AnnotationModel)
        For Each an In getList
            Dim prop = New AnnotationModel()
            prop.Id = an.Id
            prop.Annotation1 = an.Annotation1
            prop.UserName = an.UserName
            prop.NoteDateTime = Keys.ConvertCultureDate(an.NoteDateTime.ToString(), False)
            lst.Add(prop)
        Next
        'String.Format(Languages.Translation("lblTrackingBy"), Keys.ConvertCultureDate(getList.NoteDateTime.ToString(), True))
        Return Json(lst, JsonRequestBehavior.AllowGet)
    End Function

    Public Function DeleteNote(variables As List(Of String)) As JsonResult
        Dim id = CInt(variables(0))
        Dim pointerID = variables(1)
        _annotations = New RepositoryVB.Repositories(Of Annotation)
        Dim anodel = _annotations.Where(Function(a) a.Id = id).FirstOrDefault()
        _annotations.Delete(anodel)
        Dim getList = _annotations.Where(Function(a) a.TableId = pointerID).ToList()
        Return Json(getList, JsonRequestBehavior.AllowGet)
    End Function

    Public Function AddNewNote(variables As List(Of String)) As JsonResult
        Dim pointerID = variables(0)
        Dim username = variables(1)
        Dim text = variables(2)
        Dim recordType = variables(3)
        If recordType = 5 Then
            recordType = "pcfilespointers"
        Else
            recordType = "imagepointers"
        End If
        _annotations = New RepositoryVB.Repositories(Of Annotation)
        Dim ant As New Annotation
        ant.TableId = pointerID
        ant.Table = recordType
        ant.UserName = username
        ant.DeskOf = "" ' DisplayName
        ant.Annotation1 = text
        ant.NoteDateTime = Date.Now.ToString("yyyy MMM dd hh:mm:ss")
        _annotations.Add(ant)

        Dim getList = _annotations.Where(Function(a) a.Id = ant.Id).ToList()
        Return Json(getList, JsonRequestBehavior.AllowGet)
    End Function

    Public Function EditNewNote(variables As List(Of String)) As JsonResult
        Dim id = variables(0)
        Dim text = variables(1)
        _annotations = New RepositoryVB.Repositories(Of Annotation)
        Dim ano = _annotations.Where(Function(a) a.Id = id).FirstOrDefault()
        ano.Annotation1 = text
        _annotations.Update(ano)
        Return Json("saved", JsonRequestBehavior.AllowGet)
    End Function

    Public Function GenerateDate() As JsonResult
        Dim TodayDate = Keys.ConvertCultureDate(Date.Now.ToString(), False)
        Return Json(TodayDate, JsonRequestBehavior.AllowGet)
    End Function

    Public Function deleteCookie() As JsonResult
        Dim searchCookie As HttpCookie = New HttpCookie("searchInput", "")
        searchCookie.Expires = DateTime.Now.AddSeconds(2)
        searchCookie.HttpOnly = False
        Response.Cookies.Add(searchCookie)
        Return Json("cookie successfuly expired!!", JsonRequestBehavior.AllowGet)
    End Function
    'scanner functions
    <HttpPost>
    Public Function SaveTempfileForScanning() As JsonResult

        Dim lst = New FilesScane()
        Try
            For i As Integer = 0 To Request.Files.Count - 1
                Dim PostedFile As HttpPostedFileBase = Request.Files(i)
                If PostedFile.ContentLength > 0 Then
                    Dim FileName As String = System.Guid.NewGuid.ToString()
                    FileName = FileName + Path.GetExtension(PostedFile.FileName)
                    PostedFile.SaveAs(Server.MapPath("~/ImportFiles/" + FileName))
                    lst.fileServerPath.Add(Server.MapPath("~/ImportFiles/" + FileName))
                    lst.fileEncryptPath.Add(Common.EncryptURLParameters(Server.MapPath("~/ImportFiles/" + FileName)))
                End If
            Next
        Catch ex As Exception
            Return Json(ex.Message, JsonRequestBehavior.AllowGet)
        End Try
        Return Json(lst, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function DeleteTempfileForScanning(ListOftempFiles As List(Of String)) As String
        Dim filepaths = ListOftempFiles
        Dim msg As String = ""
        Try
            For i As Integer = 0 To filepaths.Count - 1
                Dim path = Common.DecryptURLParameters(filepaths(i))
                If IO.File.Exists(path) Then
                    IO.File.Delete(path)
                End If
            Next
            msg = "deleted successfuly"
            Return msg
        Catch ex As Exception
            msg = ex.Message
            Return msg
        End Try
    End Function

End Class



Class AnnotationModel
    Property Id As Integer
    Property Annotation1 As String
    Property DeskOf As String
    Property NewAnnotation As String
    Property NewAnnotationComplete As Boolean
    Property NoteDateTime As String
    Property Table As String
    Property TableId As String
    Property UserName As String

End Class
Class FilesScane
    Public Sub New()
        fileEncryptPath = New List(Of String)
        fileServerPath = New List(Of String)
    End Sub
    Property fileEncryptPath As List(Of String)
    Property fileServerPath As List(Of String)
End Class

