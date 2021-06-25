
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
Imports Leadtools.Drawing
Imports Leadtools.WinForms
Imports Exceptions = Smead.RecordsManagement.Imaging.Permissions.ExceptionString


Namespace TABFusionRMS.Web.Controllers
    Public Class CommonController
        Inherits BaseController
        Dim Basewebpage As New BaseWebPage
        Public ReadOnly Property Passport() As Passport
            Get
                Passport = CType(Session("Passport"), Passport)
            End Get
        End Property

        Private Property _ivwGridSetting As IRepository(Of vwGridSetting)
        Private Property _iGridSetting As IRepository(Of GridSetting)
        Private Property _iGridColumn As IRepository(Of GridColumn)
        Private Property _iTable As IRepository(Of Table)
        Private Property _ivwColumnsAll As IRepository(Of vwColumnsAll)
        Private Property _iDatabase As IRepository(Of Databas)
        Private Property _iTrackingHistory As IRepository(Of TrackingHistory)
        Public Property _iSystem As IRepository(Of Models.System)
        'Public Property _IDBManager As IDBManager
        Dim _IDBManager As IDBManager = New DBManager
        Public Property _ivwTablesAll As IRepository(Of vwTablesAll)
        Public Property _iScanList As IRepository(Of ScanList)
        Public Property _iTabSet As IRepository(Of TabSet)
        Public Property _iTableTab As IRepository(Of TableTab)
        Public Property _iRelationship As IRepository(Of RelationShip)
        Public Property _iView As IRepository(Of View)
        Public cultureInfo As CultureInfo
        'IDBManager As IDBManager,
        Public Sub New(ivwGridSetting As IRepository(Of vwGridSetting),
                       iGridSetting As IRepository(Of GridSetting),
                       iGridColumn As IRepository(Of GridColumn),
                       iTable As IRepository(Of Table),
                       ivwColumnsAll As IRepository(Of vwColumnsAll),
                       iDatabse As IRepository(Of Databas),
                       iTrackingHistory As IRepository(Of TrackingHistory),
                       iSystem As IRepository(Of Models.System),
                       iScanList As IRepository(Of ScanList),
                       ivwTablesAll As IRepository(Of vwTablesAll),
                       iTabSet As IRepository(Of TabSet),
                       iTableTab As IRepository(Of TableTab),
                       iRelationship As IRepository(Of RelationShip),
                       iView As IRepository(Of View)
                       )
            MyBase.New()
            _ivwColumnsAll = ivwColumnsAll
            _ivwGridSetting = ivwGridSetting
            _iGridSetting = iGridSetting
            _iGridColumn = iGridColumn
            '_IDBManager = IDBManager
            _iTable = iTable
            _iDatabase = iDatabse
            _iTrackingHistory = iTrackingHistory
            _iSystem = iSystem
            _ivwTablesAll = ivwTablesAll
            _iScanList = iScanList
            _iTabSet = iTabSet
            _iTableTab = iTableTab
            _iRelationship = iRelationship
            _iView = iView
        End Sub

        Public Function GetGridViewSettings(pGridName As String) As JsonResult
            Dim lGridColumns = _ivwGridSetting.All().Where(Function(x) x.GridSettingsName.ToLower().Trim().Equals(pGridName.ToLower().Trim()) AndAlso x.IsActive = True).[Select](Function(a) New With {
                Key .srno = a.GridColumnSrNo,
                Key .name = a.GridColumnName,
                Key .sortable = a.IsSortable,
                Key .columnWithCheckbox = a.IsCheckbox,
                Key .displayName = a.GridColumnDisplayName
            })

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(lGridColumns, Formatting.Indented, Setting)
            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

        End Function

        Public Function GetGridViewSettings1(pGridName As String) As JsonResult
            Try
                Dim dtRecords As DataTable = Nothing
                Dim pTableEntity = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pGridName.Trim().ToLower())).FirstOrDefault()
                Dim pDatabaseEntity = Nothing
                If Not pTableEntity Is Nothing Then
                    If Not String.IsNullOrEmpty(pTableEntity.DBName) Then
                        pDatabaseEntity = _iDatabase.Where(Function(x) x.DBName.Trim().ToLower().Equals(pTableEntity.DBName.Trim().ToLower())).FirstOrDefault()
                        _IDBManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)
                    Else
                        _IDBManager.ConnectionString = Keys.GetDBConnectionString
                    End If
                Else
                    _IDBManager.ConnectionString = Keys.GetDBConnectionString
                End If
                _IDBManager.CreateParameters(6)
                _IDBManager.AddParameters(0, "@TableName", pGridName)
                _IDBManager.AddParameters(1, "@PageNo", 1)
                _IDBManager.AddParameters(2, "@PageSize", 0)
                _IDBManager.AddParameters(3, "@DataAndColumnInfo", False)
                _IDBManager.AddParameters(4, "@ColName", "")
                _IDBManager.AddParameters(5, "@Sort", "")
                Dim loutput = _IDBManager.ExecuteDataSetWithSchema(System.Data.CommandType.StoredProcedure, "SP_RMS_GetTableData")
                _IDBManager.Dispose()
                dtRecords = loutput.Tables(0)
                Dim dateColumn = New List(Of Integer)
                Dim i As Integer = 0
                Dim GridColumnEntities = New List(Of GridColumns)()
                For Each column As DataColumn In dtRecords.Columns
                    Dim GridColumnEntity As New GridColumns()
                    GridColumnEntity.ColumnSrNo = i + 1
                    GridColumnEntity.ColumnId = i + 1
                    GridColumnEntity.ColumnName = column.ColumnName
                    GridColumnEntity.ColumnDisplayName = column.ColumnName
                    GridColumnEntity.ColumnDataType = column.DataType.Name
                    GridColumnEntity.ColumnMaxLength = column.MaxLength
                    GridColumnEntity.IsPk = column.Unique
                    GridColumnEntity.AutoInc = column.AutoIncrement
                    GridColumnEntity.IsNull = column.AllowDBNull
                    GridColumnEntity.ReadOnlye = column.ReadOnly
                    GridColumnEntities.Add(GridColumnEntity)
                    If column.DataType.Name.Trim.ToString.IndexOf("Date") >= 0 Then
                        dateColumn.Add(i)
                    End If
                    i = i + 1
                Next

                Dim j As Integer = 0
                For Each rows As DataRow In loutput.Tables(0).Rows
                    For Each item As Integer In dateColumn
                        Dim tempDate = loutput.Tables(0).Rows(j).ItemArray(item)
                        If Not IsDBNull(tempDate) Then
                            Dim convertInDate As DateTime
                            If Date.TryParse(tempDate, convertInDate) Then
                                'rows.Item(item) = Keys.ConvertCultureDate(convertInDate, convertInDate.IncludesTime)
                                rows.Item(item) = Date.Parse(tempDate) '.ToString(CultureInfo.InvariantCulture) 'Don't convert data grid shown directly from database
                            End If
                            'ViewBag.UniDate = Date.Parse(tempDate).ToUniversalTime.ToClientTimeDate
                            'rows.Item(item) = DirectCast(tempDate, Date)
                        End If
                    Next
                    j = j + 1
                Next

                Dim lGridColumns = GridColumnEntities.[Select](Function(a) New With {
                    Key .srno = a.ColumnSrNo,
                    Key .name = a.ColumnName,
                    Key .displayName = a.ColumnDisplayName,
                    Key .dataType = a.ColumnDataType,
                    Key .maxLength = a.ColumnMaxLength,
                    Key .isPk = a.IsPk,
                    Key .isNull = Not (a.IsNull),
                    Key .autoInc = a.AutoInc,
                    Key .readOnly = a.ReadOnlye
                })
                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                Dim jsonObject = JsonConvert.SerializeObject(lGridColumns, Formatting.Indented, Setting)
                Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch ex As Exception
                Throw
            End Try
        End Function

        Public Function ArrangeGridOrder(pGridOrders As List(Of GridSettingsColumns)) As ActionResult
            Session("GridOrders") = pGridOrders
            Return Json(Languages.Translation("Success"), "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Sub SetCulture()
            cultureInfo = New CultureInfo(Request.UserLanguages(0))
            If cultureInfo.IsNeutralCulture Then
                cultureInfo = System.Globalization.CultureInfo.CreateSpecificCulture(cultureInfo.Name)
            End If
            Threading.Thread.CurrentThread.CurrentCulture = cultureInfo
            Threading.Thread.CurrentThread.CurrentUICulture = cultureInfo
        End Sub

        Public Function SetGridOrders(pGridName As String) As ActionResult
            If Session("GridOrders") Is Nothing Then
                Return Json("Error", "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End If
            If String.IsNullOrEmpty(pGridName) Then
                Return Json(Languages.Translation("msgCommonGridNameNotValid"), "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End If

            Dim lGridSettingsColumnsEntities = DirectCast(Session("GridOrders"), List(Of GridSettingsColumns))

            Dim pGridSettingsEntity = _ivwGridSetting.All().Where(Function(x) x.GridSettingsName.ToLower().Trim().Equals(pGridName.ToLower().Trim())).FirstOrDefault()

            If pGridSettingsEntity Is Nothing Then
                Return Json(Languages.Translation("msgCommonReOrderYourColumn"), "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End If

            Dim pGridSettingId As Integer = pGridSettingsEntity.GridSettingsId
            Dim lGridColumnEntities = _iGridColumn.Where(Function(x) x.GridSettingsId = pGridSettingId AndAlso x.IsActive = True)
            Dim iCount As Integer = 0
            For Each pGridSettingsColumnsEntity As GridSettingsColumns In lGridSettingsColumnsEntities
                If pGridSettingsColumnsEntity.index IsNot Nothing Then

                    Dim pGridColumnEntities = lGridColumnEntities.Where(Function(x) x.GridColumnName.Trim().ToLower().Equals(pGridSettingsColumnsEntity.index.Trim().ToLower())).FirstOrDefault()

                    If pGridSettingsColumnsEntity.key = True Then
                        pGridColumnEntities.GridColumnSrNo = -1
                    Else
                        pGridColumnEntities.GridColumnSrNo = iCount
                    End If

                    _iGridColumn.Update(pGridColumnEntities)

                    If pGridSettingsColumnsEntity.key = False Then
                        iCount += 1
                    End If
                End If
            Next

            Session.Remove("GridOrders")

            Return Json(Languages.Translation("Success"), "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
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

        Public Function GetTableListLabel() As JsonResult
            Dim BaseWebPage As BaseWebPage = New BaseWebPage()

            Dim pTableList = From t In _iTable.All().SortBy("TableName")
            Dim lAllTables = _ivwTablesAll.All().Select(Function(x) x.TABLE_NAME).ToList()
            pTableList = pTableList.Where(Function(x) lAllTables.Contains(x.TableName))

            Dim tableList As List(Of Table) = New List(Of Table)

            For Each tempTable As Table In pTableList
                If (BaseWebPage.Passport.CheckPermission(tempTable.TableName, Smead.Security.SecureObject.SecureObjectType.Table, Smead.Security.Permissions.Permission.View)) Then
                    tableList.Add(tempTable)
                End If
            Next

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(tableList, Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetTrackableTableList() As JsonResult
            Dim pTableList = _iTable.Where(Function(m) m.TrackingTable > 0 Or m.Trackable = True)
            '   Dim pTableList = From t In _iTable.Where(MachineKey,).SortBy("TableName")
            Dim lAllTables = _ivwTablesAll.All().Select(Function(x) x.TABLE_NAME).ToList()
            pTableList = pTableList.Where(Function(x) lAllTables.Contains(x.TableName))

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pTableList, Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetTableList() As JsonResult
            Dim pTableList = From t In _iTable.All().SortBy("TableName")
            '   Dim pTableList = From t In _iTable.Where(MachineKey,).SortBy("TableName")
            Dim lAllTables = _ivwTablesAll.All().Select(Function(x) x.TABLE_NAME).ToList()
            pTableList = pTableList.Where(Function(x) lAllTables.Contains(x.TableName))

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pTableList, Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetColumnList(pTableName As String, type As Integer) As JsonResult

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects

            Dim sSQL
            Dim sAdoConn As ADODB.Connection
            Dim pColumns As ADODB.Recordset
            Dim dataAdapter As New System.Data.OleDb.OleDbDataAdapter()
            Dim dataSet As New DataSet()

            If type = 0 Then
                Dim pColumnLists = _ivwColumnsAll.All()
                Dim pColumnList = pColumnLists.Where(Function(x) x.TABLE_NAME.Trim().ToLower().Equals(pTableName.Trim().ToLower()))
                pColumnList = pColumnList.Where(Function(x) Not x.COLUMN_NAME.StartsWith("%sl"))

                '''' added by hk 
                'Dim pIDBManager As IDBManager = New DBManager(Keys.GetDBConnectionString)
                'pIDBManager.ConnectionString = Keys.GetDBConnectionString
                'Dim strin = String.Format("SELECT * from [vwColumnsAll] where TABLE_NAME = '{0}'; ", pTableName.Trim())
                'Dim result = pIDBManager.ExecuteDataSet(CommandType.Text, strin)
                'pIDBManager.Dispose()
                '''' added by hk 

                Dim jsonObject = JsonConvert.SerializeObject(pColumnList, Formatting.Indented, Setting)

                If jsonObject.Count = 2 Then
                    Dim oTables = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(pTableName.Trim().ToLower())).FirstOrDefault()
                    sAdoConn = DataServices.DBOpen(oTables, _iDatabase.All())
                    sSQL = "SELECT ROW_NUMBER() OVER (ORDER BY COLUMN_NAME) AS ID, COLUMN_NAME, TABLE_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + pTableName + "'"
                    pColumns = DataServices.GetADORecordSet(sSQL, sAdoConn)
                    dataAdapter.Fill(dataSet, pColumns, "Columns")
                    jsonObject = JsonConvert.SerializeObject(dataSet, Formatting.Indented, Setting)
                End If
                Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Else
                _IDBManager.ConnectionString = Keys.GetDBConnectionString
                sSQL = pTableName.Split(New String() {"WHERE"}, StringSplitOptions.None)(0)
                Dim loutput = _IDBManager.ExecuteDataSet(System.Data.CommandType.Text, sSQL)

                Dim tColumnList = New List(Of String)

                For i As Integer = 0 To loutput.Tables(0).Columns.Count - 1
                    If Not loutput.Tables(0).Columns(i).ToString().StartsWith("%sl") Then
                        tColumnList.Add(loutput.Tables(0).Columns(i).ToString)
                    End If
                Next

                Dim jsonObj = JsonConvert.SerializeObject(tColumnList, Formatting.Indented, Setting)
                Return Json(jsonObj, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End If


        End Function

        Public Function TruncateTrackingHistory(Optional sTableName As String = "", Optional sId As String = "") As JsonResult
            Try
                ' Dim trackingServiceObj As New TrackingServices()
                Dim catchFlag As Boolean
                Dim KeysType As String = ""
                '      Dim trackingServiceObj As New TrackingServices(_IDBManager, _iTable, _iDatabase, _iScanList, _iTabSet, _iTableTab, _iRelationship, _iView, _iSystem, _iTrackingHistory)
                catchFlag = TrackingServices.InnerTruncateTrackingHistory(_iSystem.All(), _iTrackingHistory, sTableName, sId, KeysType)
                If (catchFlag = True) Then
                    If (KeysType = "s") Then
                        Keys.ErrorType = "s"
                        Keys.ErrorMessage = Languages.Translation("HistoryHasBeenTruncated")
                    Else
                        Keys.ErrorType = "w"
                        Keys.ErrorMessage = Languages.Translation("NoMoreHistoryToTruncate")
                    End If

                Else
                    Keys.ErrorType = "w"
                    Keys.ErrorMessage = Languages.Translation("ForAnotherUse")
                End If

            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessageJS()
            Finally

            End Try
            Return Json(New With {
                Key .errortype = Keys.ErrorType,
                Key .message = Keys.ErrorMessage
                }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function



        ' Get all registered databases
        Public Function GetRegisteredDatabases() As ActionResult
            Dim pDatabase = From t In _iDatabase.All()

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(pDatabase, Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetCheckSession() As ActionResult
            Dim IsSessionExpired = False
            Try
                If Not System.Web.HttpContext.Current Is Nothing Then
                    If System.Web.HttpContext.Current.Session("Passport") Is Nothing Then
                        IsSessionExpired = True
                    End If
                End If
            Catch ex As Exception
            End Try
            Return Json(New With {
                    Key .isexpire = IsSessionExpired
                }, JsonRequestBehavior.AllowGet)
        End Function

        Public Shadows Function RedirectToAction(action As String, controller As String) As RedirectToRouteResult
            Return MyBase.RedirectToAction(action, controller)
        End Function

        Public Function SessionExpired() As ActionResult
            If Not System.Web.HttpContext.Current Is Nothing Then
                If System.Web.HttpContext.Current.Session("Passport") Is Nothing Then
                    Response.Redirect("~/SignIn.aspx", True)
                End If
            End If
            Return Redirect("~/SignIn.aspx")
        End Function

        'Check the permission for submodules.
        Public Function CheckTabLevelAccessPermission(pSecureObjectName As String, pSecureObjectType As Integer, pPassportPermissions As Integer) As ActionResult
            Dim bAccess As Boolean = False
            Dim jsonObject = Nothing
            Dim BaseWebPage As BaseWebPage = New BaseWebPage()
            Try
                bAccess = BaseWebPage.Passport.CheckPermission(pSecureObjectName, pSecureObjectType, pPassportPermissions)

                Dim Setting = New JsonSerializerSettings
                Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
                jsonObject = JsonConvert.SerializeObject(bAccess, Formatting.Indented, Setting)
            Catch ex As Exception

            End Try

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
        Public Function GetFontFamilies() As ActionResult
            Dim fontFamily() As FontFamily
            Dim installFonts As New InstalledFontCollection()
            fontFamily = installFonts.Families

            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(fontFamily, Formatting.Indented, Setting)

            Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function
        Private Function SafeInt(ByVal value As String) As Integer
            Try
                Return CInt(value)
            Catch ex As Exception
                Return 0
            End Try
        End Function
        Public Function DownloadAttachment(ByVal filePath As String, ByVal fileName As String, docKey As String) As FileResult
            Dim oParams As Smead.RecordsManagement.Parameters = CType(HttpContext.Session("LevelManager"), Smead.RecordsManagement.LevelManager).ActiveLevel.Parameters
            Dim fileContent() As Byte = Nothing
            Dim fileExtension As String = String.Empty
            Dim responseMessage As String = String.Empty
            Dim mimeType As String = String.Empty
            If Basewebpage.Passport.CheckPermission(oParams.ViewName, Smead.Security.SecureObject.SecureObjectType.View, Smead.Security.Permissions.Permission.Export) Then
                'check if file created in desktop
                'Dim params = Common.DecryptURLParameters(docKey.Substring(docKey.IndexOf("=") + 1))
                Dim params = Common.DecryptURLParameters(docKey)
                Dim downloadModel As FileDownloads = New FileDownloads()

                downloadModel.deleteTempFile = New List(Of String)
                'downloadModel.AttachNum = params.Split("&")(2).Split("=")(1)
                'downloadModel.AttachVer = attchVersion
                downloadModel.TableId = params.Split("&")(0).Split("=")(1)
                downloadModel.TableName = params.Split("&")(1).Split("=")(1)

                If Not String.IsNullOrEmpty(filePath) Then
                    downloadModel._passport = Basewebpage.Passport
                    downloadModel._serverPath = Server.MapPath("~/Downloads/")
                    If (downloadModel.CheckIsDesktopFileBeforeDownload(downloadModel)) Then
                        filePath = downloadModel.SaveTempPDFFileToDisk(IO.Path.GetFileName(Common.DecryptURLParameters(HttpUtility.UrlDecode(filePath))))
                    Else
                        filePath = Common.DecryptURLParameters(HttpUtility.UrlDecode(filePath))
                    End If
                End If
                Try
                    If System.IO.File.Exists(filePath) Then
                        fileExtension = IO.Path.GetExtension(filePath)
                        mimeType = System.Web.MimeMapping.GetMimeMapping(filePath)
                        'Read the bytes from file
                        Using fs As New IO.FileStream(filePath, IO.FileMode.Open, IO.FileAccess.Read)
                            Using binaryReader As New IO.BinaryReader(fs)
                                Dim byteLength As Long = New IO.FileInfo(filePath).Length
                                fileContent = binaryReader.ReadBytes(byteLength)
                            End Using
                        End Using
                    Else
                        Throw New System.Exception("File does not exists.")
                    End If
                Catch ex As Exception
                    Throw New System.Exception(ex.Message)
                End Try

                For Each del In downloadModel.deleteTempFile
                    Try
                        My.Computer.FileSystem.DeleteFile(del)
                    Catch ex As Exception
                        'do nothing, it's a temporary file anyway
                    End Try
                Next
                Return File(fileContent, mimeType, fileName & "." & IIf(fileExtension.Contains("."), fileExtension.Trim("."), fileExtension))
            Else
                Return File(fileContent, mimeType, fileName & "." & IIf(fileExtension.Contains("."), fileExtension.Trim("."), fileExtension))
            End If

        End Function

        Public Function LoadAttachmentData(ByVal docdata As String, ByVal PageIndex As Integer, ByVal PageSize As Integer, ByVal viewName As String) As FlyoutModel
            Try
                Dim BaseWebPage As BaseWebPage = New BaseWebPage()
                Dim params() As String = {String.Empty, String.Empty, String.Empty, String.Empty, String.Empty}
                Dim data() As String = Split(DecryptString(docdata), DelimiterText)
                Dim count As Integer = data.GetUpperBound(0)
                For i As Integer = 0 To 4
                    If i < count Then params(i) = data(i)
                Next
                Dim TableName = params(3)
                Dim TableId = params(4)
                Dim IsStringId As Boolean = True

                Dim flyoutModel As FlyoutModel = New FlyoutModel()
                Dim lstFlyOutDetails As List(Of FlyOutDetails) = New List(Of FlyOutDetails)
                flyoutModel.sPageSize = PageSize
                flyoutModel.sPageIndex = PageIndex

                Dim oTable = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(TableName.Trim().ToLower())).FirstOrDefault()
                If oTable Is Nothing Then Return Nothing

                Dim idFieldName = oTable.IdFieldName
                Dim csADOConn = New ADODB.Connection
                csADOConn = DataServices.DBOpen(_iDatabase.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(oTable.DBName.Trim().ToLower())).FirstOrDefault())
                If csADOConn IsNot Nothing Then
                    If Not (DataServices.IdFieldIsString(csADOConn, TableName, idFieldName)) Then
                        TableId = TableId.PadLeft(30, "0")
                        IsStringId = False
                    End If
                    csADOConn.Close()
                End If
                Dim totalRowCount As Int32 = 0
                Using dbManger As New DBManager(Keys.GetDBConnectionString)
                    dbManger.CreateParameters(6)
                    dbManger.AddParameters(0, "@tableId", TableId)
                    dbManger.AddParameters(1, "@tableName", TableName)
                    dbManger.AddParameters(2, "@PageNo", PageIndex)
                    dbManger.AddParameters(3, "@RecsPerPage", PageSize)
                    dbManger.AddParameters(4, "@UserId", params(1))
                    dbManger.AddParameters(5, "@totalRecCount", totalRowCount, ParameterDirection.Output, DbType.Int32)

                    Dim ds = dbManger.ExecuteDataSet(System.Data.CommandType.StoredProcedure, "SP_RMS_GetPopupAttachments", dbManger.Command)
                    Dim dt As DataTable = ds.Tables(0)
                    totalRowCount = DirectCast(dbManger.Command.Parameters("@totalRecCount").Value, Int32)
                    flyoutModel.totalRecCount = totalRowCount

                    Const CachedFlyouts As String = "Flyouts"
                    Dim fullPath As String = String.Empty
                    Dim pastAttachNumber As Integer = 0
                    Dim oParams As Smead.RecordsManagement.Parameters = CType(HttpContext.Session("LevelManager"), Smead.RecordsManagement.LevelManager).ActiveLevel.Parameters
                    If String.IsNullOrWhiteSpace(viewName) Then
                        viewName = CType(HttpContext.Session("LevelManager"), Smead.RecordsManagement.LevelManager).ActiveLevel.Parameters.ViewName
                    End If

                    flyoutModel.viewName = viewName
                    For Each oDataRow As DataRow In dt.Rows
                        Dim isFormatValid As Boolean = True
                        Dim filePath As String = IO.Path.Combine(IO.Path.GetDirectoryName(oDataRow("FullPath")), CachedFlyouts, String.Format("{0}.{1}", IO.Path.GetFileNameWithoutExtension(oDataRow("FullPath")), Export.Output.Format.Jpg.ToString.ToLower))
                        Dim validAttachment = IO.File.Exists(filePath)
                        If Not validAttachment Then fullPath = oDataRow("FullPath")
                        Dim flyOutDetails As FlyOutDetails = New FlyOutDetails()

                        Try
                            If (Not System.IO.Directory.Exists(System.IO.Path.GetDirectoryName(filePath))) Then System.IO.Directory.CreateDirectory(System.IO.Path.GetDirectoryName(filePath))
                        Catch ex As Exception
                            slimShared.logInformation(String.Format("Info {0} in CommonController.LoadAttachmentData", ex.Message))
                        End Try

                        'conditions comes here moti mashiah
                        Dim checkAnnotation = InitCheckAnnotation(TableId, TableName, oDataRow("AttachmentNumber"), oDataRow("TrackablesRecordVersion"))
                        flyOutDetails.attchVersion = oDataRow("TrackablesRecordVersion")
                        If checkAnnotation Then
                            filePath = HttpContext.Server.MapPath("~/resources/images/HasAnnotations.png")
                            flyOutDetails.sOrgFilePath = "disabled"
                        Else
                            flyOutDetails.sOrgFilePath = Common.EncryptURLParameters(Server.UrlDecode(oDataRow("FullPath")))
                        End If
                        'written for handling invalid format exception usually happening with kinda of xlsx files
                        Dim fileStreamResult As FileStreamResult = Nothing
                        Try
                            fileStreamResult = GetSubImageFlyOut(filePath, fullPath, validAttachment)
                        Catch ex As Exception
                            If "Invalid file format".ToLower() = ex.Message.ToLower() Then
                                Dim fileReplace = HttpContext.Server.MapPath("~/resources/images/InvalidFormat.PNG")
                                fileStreamResult = GetSubImageFlyOut(fileReplace, fileReplace, validAttachment)
                                isFormatValid = False
                            End If
                        End Try

                        Dim filesize As Long = fileStreamResult.FileStream.Length
                        Dim buffer(filesize) As Byte
                        fileStreamResult.FileStream.Read(buffer, 0, filesize)


                        flyOutDetails.sAttachmentName = IIf(String.IsNullOrEmpty((oDataRow("OrgFileName").ToString())), "Attachment " + oDataRow("AttachmentNumber").ToString(), oDataRow("OrgFileName").ToString())
                        flyOutDetails.sFlyoutImages = buffer
                        flyOutDetails.sAttachId = oDataRow("TrackablesId")

                        Dim dr As DataRow() = oParams.Data.Select("pkey=" + IIf(IsStringId, "'" + TableId + "'", TableId))
                        Dim encryptURL = Common.EncryptURLParameters("id=" + Convert.ToString(TableId) + "&Table=" + Convert.ToString(TableName) + "&attachment=" + Convert.ToString(oDataRow.Item("AttachmentNumber")) + "&itemname=" + Convert.ToString(dr(0)("ItemName")))

                        If (HttpContext.Request.Browser.Browser.ToString.Equals("IE") Or HttpContext.Request.Browser.Browser.ToString.Equals("InternetExplorer")) Then
                            Dim oIEURL As String = Nothing
                            Dim paramIE As String = DecryptString(docdata).ToString
                            docdata = EncryptString(paramIE.Substring(0, paramIE.Length - 1) & Convert.ToString(oDataRow.Item("AttachmentNumber")))
                            flyOutDetails.sViewerLink = "undocked.aspx?v=" + Server.UrlEncode(docdata)
                            flyOutDetails.downloadEncryptAttachment = encryptURL
                        Else
                            'flyOutDetails.sViewerLink = "documentviewer.aspx?" + encryptURL
                            If isFormatValid Then
                                flyOutDetails.sViewerLink = "/DocumentViewer/Index?documentKey=" + encryptURL
                            Else
                                flyOutDetails.sViewerLink = "0"
                            End If

                            flyOutDetails.downloadEncryptAttachment = encryptURL
                        End If
                        'FUS-6339 security fix for view permission in voliumn level - moti mashiah
                        Dim VolumName = Convert.ToString(oDataRow("VolumnName"))
                        If BaseWebPage.Passport.CheckPermission(VolumName, Smead.Security.SecureObject.SecureObjectType.Volumes, Smead.Security.Permissions.Permission.View) Then
                            lstFlyOutDetails.Add(flyOutDetails)
                        End If

                    Next
                    flyoutModel.stringQuery = Common.EncryptURLParameters("id=" + Convert.ToString(TableId) + "&Table=" + Convert.ToString(TableName) + "&attachment=0")
                    flyoutModel.FlyOutDetails = lstFlyOutDetails
                    'Dim BaseWebPage As BaseWebPage = New BaseWebPage()
                    If BaseWebPage.Passport.CheckPermission(viewName, Smead.Security.SecureObject.SecureObjectType.View, Smead.Security.Permissions.Permission.Export) Then
                        flyoutModel.downloadPermission = True
                    Else
                        flyoutModel.downloadPermission = False
                    End If


                    'If (HttpContext.Request.Browser.Browser.ToString.Equals("IE") Or HttpContext.Request.Browser.Browser.ToString.Equals("InternetExplorer")) Then
                    '    Dim oIEURL As String = Nothing
                    '    flyoutModel.sViewerLink = "undocked.aspx?v=" + Server.UrlEncode(docdata)
                    'Else
                    '    Dim RMSparams As Smead.RecordsManagement.Parameters = CType(HttpContext.Session("LevelManager"), Smead.RecordsManagement.LevelManager).ActiveLevel.Parameters
                    '    Dim dr As DataRow() = RMSparams.Data.Select("pkey=" + TableId)
                    '    Dim encryptURL = Common.EncryptURLParameters("id=" + TableId + "&Table=" + TableName + "&attachment=0&itemname=" + Convert.ToString(dr(0)("ItemName")))
                    '    flyoutModel.sViewerLink = "documentviewer.aspx?" + encryptURL
                    'End If
                    Return flyoutModel
                End Using
            Catch ex As Exception
                slimShared.logError(String.Format("Error {0} in CommonController.LoadAttachmentData", ex.Message))
                Throw ex
            End Try
        End Function

        'check for annotation
        Private Function InitCheckAnnotation(tableid As String, tableName As String, AttachmentNumber As Integer, VarsionNumber As Integer) As Boolean
            Using cmd As New SqlCommand("SP_RMS_GetFilesPaths", Basewebpage.Passport.Connection)
                cmd.CommandType = CommandType.StoredProcedure
                cmd.Parameters.AddWithValue("@tableId", tableid)
                cmd.Parameters.AddWithValue("@tableName", tableName)
                cmd.Parameters.AddWithValue("@AttachmentNumber", AttachmentNumber)
                cmd.Parameters.AddWithValue("@RecordVersion", VarsionNumber)

                Dim adp = New SqlDataAdapter(cmd)
                Dim dTable = New DataTable()
                Dim datat = adp.Fill(dTable)
                For Each row As DataRow In dTable.Rows
                    Dim getpath = row("FullPath")
                    Dim pointerid = Convert.ToInt32(row("pointerId"))
                    Dim cAnnotation = Me.CheckAnnotation(pointerid, Basewebpage)

                    'check for annotation;
                    If cAnnotation Then
                        Return True
                    End If
                Next
                Return False
            End Using
        End Function
        Private Function CheckAnnotation(pointerid As Integer, BaseWebPage As BaseWebPage) As Boolean
            Dim lstImages = New List(Of Integer)
            Dim sql As String = "select * from Annotations a where a.[Table] = 'REDLINE' and a.TableId = '010001' + RIGHT('000000000000000000000000' + CAST(@pointerid AS VARCHAR), 24)"
            Using conn As SqlConnection = BaseWebPage.Passport.Connection
                Using cmd As New SqlCommand(sql, conn)
                    cmd.Parameters.AddWithValue("@pointerid", pointerid)
                    Return CBool(cmd.ExecuteScalar)
                End Using
            End Using
        End Function



        Public Function LoadFlyoutPartial(ByVal docdata As String, isMVC As Boolean) As PartialViewResult
            'if the call comes from the new MVC model create encryp and pass the variable
            Dim viewName As String = String.Empty
            If isMVC Then
                Dim tblName As String = docdata.Split(",")(0).ToString()
                Dim pkidValue As String = docdata.Split(",")(1).ToString()
                viewName = docdata.Split(",")(2).ToString()
                Dim tableName As String = tblName & DelimiterText
                Dim tableid As String = "***pkey***" & DelimiterText
                Dim userid As String = Passport.UserId.ToString & DelimiterText
                Dim database As String = String.Format("{0}\{1}", Session("Server").ToString, Session("databaseName").ToString) & DelimiterText
                Dim attachmentNumber As String = "0"
                Dim pass = "***ticket***" & DelimiterText & userid & database & tableName & tableid & attachmentNumber
                Dim rowPass = pass.Replace("***pkey***", pkidValue).Replace("%%%pkey%%%", pkidValue).Replace("***ticket***", Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString, Session("databaseName").ToString), tblName, "1"))
                Dim encryptedRowPass = EncryptString(rowPass)
                docdata = encryptedRowPass
            End If

            Dim flyoutModel = LoadAttachmentData(docdata, 1, 6, viewName)
            Return PartialView("_FlyoutPartial", flyoutModel)
        End Function

        Public Function LazyLoadPopupAttachments(ByVal docdata As String, ByVal PageIndex As Int16, ByVal PageSize As Int16, viewName As String, isMVC As Boolean) As ActionResult
            'if the call comes from the new MVC model create encryp and pass the variable
            If isMVC Then
                Dim tblName As String = docdata.Split(",")(0).ToString()
                Dim pkidValue As String = docdata.Split(",")(1).ToString()
                viewName = docdata.Split(",")(2).ToString()
                Dim tableName As String = tblName & DelimiterText
                Dim tableid As String = "***pkey***" & DelimiterText
                Dim userid As String = Passport.UserId.ToString & DelimiterText
                Dim database As String = String.Format("{0}\{1}", Session("Server").ToString, Session("databaseName").ToString) & DelimiterText
                Dim attachmentNumber As String = "0"
                Dim pass = "***ticket***" & DelimiterText & userid & database & tableName & tableid & attachmentNumber
                Dim rowPass = pass.Replace("***pkey***", pkidValue).Replace("%%%pkey%%%", pkidValue).Replace("***ticket***", Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString, Session("databaseName").ToString), tblName, "1"))
                Dim encryptedRowPass = EncryptString(rowPass)
                docdata = encryptedRowPass
            End If

            Dim flyoutModel = LoadAttachmentData(docdata, PageIndex, PageSize, viewName)
            Dim Setting = New JsonSerializerSettings
            Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
            Dim jsonObject = JsonConvert.SerializeObject(flyoutModel, Formatting.Indented, Setting)
            Return Json(New With {
                    Key .flyoutModel = jsonObject
               }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetAllImageFlyOut(ByVal docdata As String,
                                          ByRef oTableId As String,
                                          ByRef oTableName As String,
                                          ByRef OrgFilePath As List(Of String),
                                          ByRef AttachmentName As List(Of String),
                                          ByRef AttchUniqueId As List(Of Int16)) As List(Of FileStreamResult)
            Try
                Dim params() As String = {String.Empty, String.Empty, String.Empty, String.Empty, String.Empty}
                Dim data() As String = Split(DecryptString(docdata), DelimiterText)
                Dim count As Integer = data.GetUpperBound(0)
                Dim oList As New List(Of FileStreamResult)
                For i As Integer = 0 To 4
                    If i < count Then params(i) = data(i)
                Next
                Dim tableName = params(3)
                Dim tableId = params(4)
                oTableName = params(3)
                oTableId = params(4)
                Dim oTable = _iTable.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(tableName.Trim().ToLower())).FirstOrDefault()
                If oTable Is Nothing Then Return Nothing

                Dim idFieldName = oTable.IdFieldName
                Dim csADOConn = New ADODB.Connection
                csADOConn = DataServices.DBOpen(_iDatabase.All().Where(Function(x) x.DBName.Trim().ToLower().Equals(oTable.DBName.Trim().ToLower())).FirstOrDefault())

                If csADOConn IsNot Nothing Then
                    If Not (DataServices.IdFieldIsString(csADOConn, tableName, idFieldName)) Then tableId = tableId.PadLeft(30, "0")
                    csADOConn.Close()
                End If

                Using dbManger As New DBManager(Keys.GetDBConnectionString)
                    dbManger.CreateParameters(2)
                    dbManger.AddParameters(0, "@tableId", tableId)
                    dbManger.AddParameters(1, "@tableName", tableName)
                    Dim ds = dbManger.ExecuteDataSet(System.Data.CommandType.StoredProcedure, "SP_RMS_GetAttchmentName")
                    Dim dt As DataTable = ds.Tables(0)
                    dt = dt.Select("", "AttachmentNumber ASC").CopyToDataTable()
                    Const CachedFlyouts As String = "Flyouts"
                    Dim fullPath As String = String.Empty
                    Dim pastAttachNumber As Integer = 0
                    For Each oDataRow As DataRow In dt.Rows
                        If (Not pastAttachNumber.Equals(oDataRow.Item("AttachmentNumber"))) Then
                            Dim filePath As String = IO.Path.Combine(IO.Path.GetDirectoryName(oDataRow("FullPath")), CachedFlyouts, String.Format("{0}.{1}", IO.Path.GetFileNameWithoutExtension(oDataRow("FullPath")), Export.Output.Format.Jpg.ToString.ToLower))
                            Dim validAttachment = IO.File.Exists(filePath)
                            If Not validAttachment Then
                                fullPath = oDataRow("FullPath")
                            End If
                            oList.Add(GetSubImageFlyOut(filePath, fullPath, validAttachment))
                            AttchUniqueId.Add(oDataRow("TrackablesId"))
                            OrgFilePath.Add(oDataRow("FullPath"))
                            AttachmentName.Add(IIf(String.IsNullOrEmpty((oDataRow("OrgFileName").ToString())), "Attachment " + oDataRow("AttachmentNumber").ToString(), oDataRow("OrgFileName").ToString()))
                            pastAttachNumber = oDataRow.Item("AttachmentNumber")
                        End If
                    Next
                    Return oList
                End Using
            Catch ex As Exception
                Throw
            End Try
        End Function

        Public Function GetSubImageFlyOut(filePath As String, fullPath As String, validAttachment As Boolean) As FileStreamResult
            Try
                Dim stampWithMessage As Boolean = False
                Dim bmp As Bitmap = Export.Output.NotAvailableImage

                If Not validAttachment Then
                    If Not String.IsNullOrEmpty(fullPath) And IO.File.Exists(fullPath) Then
                        '2. realize redactions (cannot be done)

                        Dim format As Export.Output.Format = Export.Output.Format.Jpg

                        Using codec As New RasterCodecs
                            Using img As RasterImage = codec.Load(fullPath, 1)

                                Dim rc As New System.Drawing.Rectangle(0, 0, Attachment.FlyoutSize.Width, Attachment.FlyoutSize.Height)

                                If img.BitsPerPixel <= 2 Then format = Export.Output.Format.Tif
                                If img.Width < Attachment.FlyoutSize.Width OrElse img.Height < Attachment.FlyoutSize.Height Then
                                    rc.Width = img.Width
                                    rc.Height = img.Height
                                End If

                                rc = RasterImageList.GetFixedAspectRatioImageRectangle(img.Width, img.Height, rc)

                                Dim command As New ImageProcessing.ResizeCommand
                                command.Flags = RasterSizeFlags.None
                                command.DestinationImage = New RasterImage(RasterMemoryFlags.Conventional, rc.Width, rc.Height, img.BitsPerPixel, img.Order, img.ViewPerspective, img.GetPalette(), IntPtr.Zero, 0)
                                command.Run(img)

                                codec.Save(command.DestinationImage, filePath, TranslateToLeadToolsFormat(format, img.BitsPerPixel), Attachment.ConvertBitsPerPixel(format, img.BitsPerPixel))

                                Dim reason As ImageIncompatibleReason = RasterImageConverter.TestCompatible(command.DestinationImage, True)
                                Dim pf As Imaging.PixelFormat = RasterImageConverter.GetNearestPixelFormat(command.DestinationImage)
                                If reason <> ImageIncompatibleReason.Compatible Then RasterImageConverter.MakeCompatible(command.DestinationImage, pf, True)

                                Using bmp1 As Bitmap = RasterImageConverter.ConvertToImage(command.DestinationImage, ConvertToImageOptions.None)
                                    Using stream As New System.IO.MemoryStream
                                        bmp1.Save(stream, Imaging.ImageFormat.Jpeg)
                                        Return New FileStreamResult(New System.IO.MemoryStream(stream.ToArray), "image/jpg")
                                    End Using
                                End Using
                            End Using
                        End Using

                    Else
                        If Not String.IsNullOrEmpty(filePath) Then
                            If filePath.ToLower.StartsWith(Exceptions.FileNotFound.ToLower) Then
                                bmp = Export.Output.Invalid
                                If stampWithMessage Then Attachments.DrawTextOnErrorImage(bmp, Exceptions.FileNotFound)
                            Else
                                If bmp Is Nothing Then bmp = Export.Output.NotAvailableImage
                                If stampWithMessage Then Attachments.DrawTextOnErrorImage(bmp, filePath)
                            End If
                        Else
                            If bmp Is Nothing Then bmp = Export.Output.NotAvailableImage
                            If stampWithMessage Then Attachments.DrawTextOnErrorImage(bmp, "File Not Found")
                        End If

                        Using stream As New System.IO.MemoryStream
                            bmp.Save(stream, Imaging.ImageFormat.Jpeg)
                            Return New FileStreamResult(New System.IO.MemoryStream(stream.ToArray), "image/jpg")
                        End Using
                    End If
                Else
                    Using codec As New RasterCodecs
                        Using img As RasterImage = codec.Load(filePath, 1)
                            Dim reason As ImageIncompatibleReason = RasterImageConverter.TestCompatible(img, True)
                            Dim pf As Imaging.PixelFormat = RasterImageConverter.GetNearestPixelFormat(img)
                            If reason <> ImageIncompatibleReason.Compatible Then RasterImageConverter.MakeCompatible(img, pf, True)

                            Using bmp1 As Bitmap = RasterImageConverter.ConvertToImage(img, ConvertToImageOptions.None)
                                Using stream As New System.IO.MemoryStream
                                    bmp1.Save(stream, Imaging.ImageFormat.Jpeg)
                                    Return New FileStreamResult(New System.IO.MemoryStream(stream.ToArray), "image/jpg")
                                End Using
                            End Using
                        End Using
                    End Using
                End If
            Catch ex As Exception
                Throw ex
            End Try

        End Function

        Public Function GetImageFlyOut(ByVal docdata As String) As FileStreamResult
            Dim stampWithMessage As Boolean = False
            Dim message As String = String.Empty
            Dim validAttachment As Boolean = False
            Dim fullPath As String = String.Empty
            Dim bmp As Bitmap = Export.Output.NotAvailableImage

            Dim params() As String = {String.Empty, String.Empty, String.Empty, String.Empty, String.Empty}
            Dim data() As String = Split(DecryptString(docdata), DelimiterText)
            Dim count As Integer = data.GetUpperBound(0)

            For i As Integer = 0 To 4
                If i < count Then params(i) = data(i)
            Next
            Try
                Dim filePath As String = Attachments.GetImageFlyout(params(0).Replace("'", String.Empty).Replace("""", String.Empty), SafeInt(params(1)), params(2), params(3), params(4), validAttachment, fullPath)

                If Not validAttachment Then
                    If Not String.IsNullOrEmpty(fullPath) Then
                        '2. realize redactions (cannot be done)

                        Dim format As Export.Output.Format = Export.Output.Format.Jpg

                        Using codec As New RasterCodecs
                            Using img As RasterImage = codec.Load(fullPath, 1)

                                Dim rc As New System.Drawing.Rectangle(0, 0, Attachment.FlyoutSize.Width, Attachment.FlyoutSize.Height)

                                If img.BitsPerPixel <= 2 Then format = Export.Output.Format.Tif
                                If img.Width < Attachment.FlyoutSize.Width OrElse img.Height < Attachment.FlyoutSize.Height Then
                                    rc.Width = img.Width
                                    rc.Height = img.Height
                                End If

                                rc = RasterImageList.GetFixedAspectRatioImageRectangle(img.Width, img.Height, rc)

                                Dim command As New ImageProcessing.ResizeCommand
                                command.Flags = RasterSizeFlags.None
                                command.DestinationImage = New RasterImage(RasterMemoryFlags.Conventional, rc.Width, rc.Height, img.BitsPerPixel, img.Order, img.ViewPerspective, img.GetPalette(), IntPtr.Zero, 0)
                                command.Run(img)

                                codec.Save(command.DestinationImage, filePath, TranslateToLeadToolsFormat(format, img.BitsPerPixel), Attachment.ConvertBitsPerPixel(format, img.BitsPerPixel))

                                Dim reason As ImageIncompatibleReason = RasterImageConverter.TestCompatible(command.DestinationImage, True)
                                Dim pf As Imaging.PixelFormat = RasterImageConverter.GetNearestPixelFormat(command.DestinationImage)
                                If reason <> ImageIncompatibleReason.Compatible Then RasterImageConverter.MakeCompatible(command.DestinationImage, pf, True)

                                Using bmp1 As Bitmap = RasterImageConverter.ConvertToImage(command.DestinationImage, ConvertToImageOptions.None)
                                    Using stream As New System.IO.MemoryStream
                                        bmp1.Save(stream, Imaging.ImageFormat.Jpeg)
                                        Return New FileStreamResult(New System.IO.MemoryStream(stream.ToArray), "image/jpg")
                                    End Using
                                End Using
                            End Using
                        End Using

                    Else
                        If Not String.IsNullOrEmpty(filePath) Then
                            If filePath.ToLower.StartsWith(Exceptions.FileNotFound.ToLower) Then
                                bmp = Export.Output.Invalid
                                If stampWithMessage Then Attachments.DrawTextOnErrorImage(bmp, Exceptions.FileNotFound)
                            Else
                                If bmp Is Nothing Then bmp = Export.Output.NotAvailableImage
                                If stampWithMessage Then Attachments.DrawTextOnErrorImage(bmp, filePath)
                            End If
                        Else
                            If bmp Is Nothing Then bmp = Export.Output.NotAvailableImage
                            If stampWithMessage Then Attachments.DrawTextOnErrorImage(bmp, "File Not Found")
                        End If

                        Using stream As New System.IO.MemoryStream
                            bmp.Save(stream, Imaging.ImageFormat.Jpeg)
                            Return New FileStreamResult(New System.IO.MemoryStream(stream.ToArray), "image/jpg")
                        End Using
                    End If
                Else
                    Using codec As New RasterCodecs
                        Using img As RasterImage = codec.Load(filePath, 1)
                            Dim reason As ImageIncompatibleReason = RasterImageConverter.TestCompatible(img, True)
                            Dim pf As Imaging.PixelFormat = RasterImageConverter.GetNearestPixelFormat(img)
                            If reason <> ImageIncompatibleReason.Compatible Then RasterImageConverter.MakeCompatible(img, pf, True)

                            Using bmp1 As Bitmap = RasterImageConverter.ConvertToImage(img, ConvertToImageOptions.None)
                                Using stream As New System.IO.MemoryStream
                                    bmp1.Save(stream, Imaging.ImageFormat.Jpeg)
                                    Return New FileStreamResult(New System.IO.MemoryStream(stream.ToArray), "image/jpg")
                                End Using
                            End Using
                        End Using
                    End Using
                End If
            Catch
                Return Nothing
            End Try
        End Function
        'add new attachment start from here.
        <HttpPost>
        Public Function AddNewAttachment(params As PopupdocViewerModel.popupdocViewerUI) As JsonResult
            Dim pop = New PopupdocViewerModel()
            pop.checkConditions = "success"
            'check permission
            Dim files As HttpFileCollectionBase = Request.Files

            Try
                If CheckaddNewAttachmentPermission(params.tabName) Then
                    'check if file over size
                    Dim s_Setting As RepositoryVB.IRepository(Of Models.Setting) = New RepositoryVB.Repositories(Of Models.Setting)
                    Dim expMaxSize = s_Setting.Where(Function(x) x.Section = "DragAndDropAttachment" And x.Item = "MaxSize").FirstOrDefault().ItemValue
                    If Not CheckFilesize(files) Then
                        pop.checkConditions = "maxsize"
                        pop.WarringMsg = String.Format(Languages.Translation("msgDragAndDropAttachmentWarringMsg"), expMaxSize)
                    Else
                        'load attachment and save
                        SaveNewAttachment(params, GetTemporaryFilePaths(files))
                    End If

                Else
                    pop.checkConditions = "permission"
                End If
            Catch ex As Exception
                DataErrorHandler.ErrorHendler(ex, Me, ErrorType.AttachmentPopup, params.viewId, Passport.DatabaseName)
                pop.checkConditions = "error"
                pop.Msg = ex.Message
            End Try

            Return Json(pop, JsonRequestBehavior.AllowGet)
        End Function

        Private Function CheckFilesize(files As HttpFileCollectionBase) As Boolean
            Dim s_Setting As RepositoryVB.IRepository(Of Models.Setting) = New RepositoryVB.Repositories(Of Models.Setting)
            Dim expMaxSize = s_Setting.Where(Function(x) x.Section = "DragAndDropAttachment" And x.Item = "MaxSize").FirstOrDefault().ItemValue
            For i As Integer = 0 To files.Count - 1
                If Math.Round(Convert.ToDecimal(expMaxSize)) < Math.Round(Convert.ToDecimal((files(i).ContentLength / 1024) / 1024)) Then
                    Return False
                End If
            Next
            Return True
        End Function
        <HttpPost>
        Private Sub SaveNewAttachment(param As PopupdocViewerModel.popupdocViewerUI, filePathList As List(Of String))
            Dim BaseWebPageMain = Keys.BasePageObj
            Dim ticket = BaseWebPageMain.Passport.CreateTicket(String.Format("{0}\{1}", Passport.ServerName, Passport.DatabaseName), param.tabName, param.tableId).ToString()
            'Dim oDefaultOutputSetting = _iSystem.All.FirstOrDefault.DefaultOutputSettingsId
            Dim oDefaultOutputSetting = String.Empty
            For Each path In filePathList
                Dim info = Common.GetCodecInfoFromFile(path, System.IO.Path.GetExtension(path))
                If info Is Nothing Then
                    Smead.RecordsManagement.Imaging.Attachments.AddAnAttachment(ticket,
                                                                            BaseWebPageMain.Passport.UserId,
                                                                            String.Format("{0}\{1}", Passport.ServerName, Passport.DatabaseName),
                                                                            param.tabName,
                                                                            param.tableId,
                                                                            0,
                                                                            oDefaultOutputSetting,
                                                                            path,
                                                                            path,
                                                                            System.IO.Path.GetExtension(path),
                                                                            False,
                                                                            param.name, False, 1, 0, 0, 0)
                Else
                    Smead.RecordsManagement.Imaging.Attachments.AddAnAttachment(ticket,
                                                                            BaseWebPageMain.Passport.UserId,
                                                                            String.Format("{0}\{1}", Passport.ServerName, Passport.DatabaseName),
                                                                            param.tabName,
                                                                            param.tableId,
                                                                            0,
                                                                            oDefaultOutputSetting,
                                                                            path,
                                                                            path,
                                                                            System.IO.Path.GetExtension(path),
                                                                            False,
                                                                            param.name, True, info.TotalPages, info.Height, info.Width, info.SizeDisk)
                End If
            Next
        End Sub
        Function GetTemporaryFilePaths(files As HttpFileCollectionBase) As List(Of String)
            Dim lst = New List(Of String)
            For i As Integer = 0 To files.Count - 1
                Dim PostedFile As HttpPostedFileBase = files(i)
                If PostedFile.ContentLength > 0 Then
                    Dim FileName As String = System.Guid.NewGuid.ToString()
                    FileName = FileName + System.IO.Path.GetExtension(PostedFile.FileName)
                    PostedFile.SaveAs(Server.MapPath("~/Downloads/" + FileName))
                    Dim filePath = Server.MapPath("~/Downloads/" + FileName)
                    lst.Add(filePath)
                End If
            Next
            Return lst
        End Function

        Public Function CheckaddNewAttachmentPermission(tableName As String) As Boolean
            Dim hasPermissions = False
            Dim _iSystem As RepositoryVB.Repositories(Of Models.System) = New RepositoryVB.Repositories(Of Models.System)
            Dim _iOutputSetting As RepositoryVB.Repositories(Of Models.OutputSetting) = New RepositoryVB.Repositories(Of Models.OutputSetting)
            Dim _iVolume As RepositoryVB.Repositories(Of Models.Volume) = New RepositoryVB.Repositories(Of Models.Volume)
            Dim _iSystemAddress As RepositoryVB.Repositories(Of Models.SystemAddress) = New RepositoryVB.Repositories(Of Models.SystemAddress)
            Dim oSystem = _iSystem.All.FirstOrDefault()
            Dim oOutputSetting = _iOutputSetting.All().Where(Function(x) x.Id.Trim().ToLower().Equals(oSystem.DefaultOutputSettingsId.Trim.ToLower())).FirstOrDefault()
            Dim oVolume = _iVolume.All().Where(Function(x) x.Id = oOutputSetting.VolumesId).FirstOrDefault()

            If Basewebpage.Passport.CheckPermission(tableName, Smead.Security.SecureObject.SecureObjectType.Attachments, Smead.Security.Permissions.Permission.Add) Then
                hasPermissions = True
            End If
            If Basewebpage.Passport.CheckPermission(oVolume.Name, Smead.Security.SecureObject.SecureObjectType.Volumes, Smead.Security.Permissions.Permission.Add) Then
                hasPermissions = True
            End If

            Return hasPermissions

        End Function
        Public Shared Function TranslateToLeadToolsFormat(ByVal format As Export.Output.Format, ByVal bitsPerPixel As Integer) As RasterImageFormat
            Select Case format
                Case Export.Output.Format.Bmp
                    Return RasterImageFormat.Bmp
                Case Export.Output.Format.Gif
                    Return RasterImageFormat.Gif
                Case Export.Output.Format.Png
                    Return RasterImageFormat.Png
                Case Export.Output.Format.Tif
                    If bitsPerPixel <= 2 Then Return RasterImageFormat.TifxFaxG4
                    Return RasterImageFormat.Tif
                Case Else
                    Return RasterImageFormat.Jpeg
            End Select
        End Function

    End Class
End Namespace