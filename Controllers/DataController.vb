Imports System.Web.Mvc
Imports TabFusionRMS.Models
Imports TabFusionRMS.RepositoryVB
Imports Smead.Security
Imports Smead.RecordsManagement
Imports Smead.RecordsManagement.Navigation
'Imports Smead.RecordsManagement.Tracking
'Imports System.Threading
'Imports System.Data.SqlClient
'Imports System.Web.Helpers
'Imports Microsoft.Ajax.Utilities
'Imports Microsoft.Owin
'Imports System.Net
'Imports SecureObject = Smead.Security.SecureObject

Public Class DataController
    Inherits BaseController
    ' GET: Data

    Private ReadOnly Property _passport() As Passport
        Get
            Return CType(Session("Passport"), Passport)
        End Get
    End Property
    Private ReadOnly Property _levelManager() As LevelManager
        Get
            Return CType(Session("LevelManager"), LevelManager)
        End Get
    End Property
    Private Property _linkscript As IRepository(Of LinkScript)
    Private _is_SavedCriteria As IRepository(Of s_SavedCriteria) = New RepositoryVB.Repositories(Of s_SavedCriteria)
    Private _is_SavedChildrenFavorite As IRepository(Of s_SavedChildrenFavorite) = New RepositoryVB.Repositories(Of s_SavedChildrenFavorite)
    'APP START | API CALL
    Public Function Index() As ActionResult
        Dim model = New LayoutModel(_passport)
        Try
            model.Layout.ExecuteLayout()
            model.Taskbar.ExecuteTasksbar()
            model.NewsFeed.ExecuteNewsFeed()
            model.Footer.ExecuteFooter()
        Catch ex As Exception
            DataErrorHandler.ErrorHendler(ex, model, ErrorType.AppStart, 0, _passport.DatabaseName)
        End Try
        Return View(model)
    End Function
    'NEWS FEED | API CALL
    <HttpPost>
    Public Function SaveNewsURL(NewUrl As String) As JsonResult
        Dim isSuccess As Boolean = True
        Try
            SetSetting("News", "NewsURL", NewUrl, _passport)
        Catch ex As Exception
            isSuccess = False
        End Try
        Return Json(isSuccess, JsonRequestBehavior.AllowGet)
    End Function
    'LOAD QUERY WINDOW | API CALL
    <HttpGet>
    Public Function LoadQueryWindow(viewId As Integer, ceriteriaId As Integer) As ActionResult
        'Dim model = New ViewQueryWindow(_passport, _levelManager)
        Dim model = New ViewQueryWindow(_passport)
        model.DrawQuery(viewId, ceriteriaId)
        Return PartialView("_Query", model)
    End Function
    <HttpPost>
    Public Function RunQuery(params As searchQueryModel.Searchparams, searchQuery As List(Of searchQueryModel)) As JsonResult
        'create grid object
        Dim model = New GridDataBindig(_passport, params.ViewId, params.pageNum)
        model.ItemDescription = GetItemName(params.preTableName, params.Childid, _passport)
        'get list of query fields
        If Not searchQuery Is Nothing Then
            model.fvList = GridDataBindig.CreateQuery(searchQuery)
        End If
        'execute the grid query
        model.ExecuteGridData()
        'setup levelManager | written for aspx 
        Dim levelmanager As LevelManager = New LevelManager(_passport)
        Dim level As Level = New Level(_passport)
        levelmanager.CurrentLevel = 0
        levelmanager.Levels.Add(level)
        levelmanager.ActiveLevel.Parameters = model.params
        Session("LevelManager") = levelmanager

        Dim jsonresult = Json(model, JsonRequestBehavior.AllowGet)
        jsonresult.MaxJsonLength = Integer.MaxValue
        Return jsonresult
    End Function
    <HttpPost>
    Public Function GetTotalrowsForGrid(paramsUI As searchQueryModel.Searchparams, searchQuery As List(Of searchQueryModel)) As JsonResult
        Dim q = New Query(_passport)
        Dim params As Parameters = New Parameters(paramsUI.ViewId, _passport)
        'get list of query fields
        If Not searchQuery Is Nothing Then
            params.FilterList = GridDataBindig.CreateQuery(searchQuery)
        End If

        Dim viewName As String = "FROM " & q.GetSQLViewName(params) & " " & params.WhereFilter
        Dim TotalRows As Integer = q.TotalQueryRowCount(viewName, _passport.Connection)
        Dim TotalPages As Integer = TotalRows / params.RequestedRows
        Return Json(TotalRows & "|" & TotalPages, JsonRequestBehavior.AllowGet)
    End Function
    'LINKSCRIPT | API CALL
    <HttpPost>
    Public Function LinkscriptButtonClick(params As linkscriptPropertiesUI) As JsonResult
        Dim _param = New Parameters(params.ViewId, _passport)
        Dim scriptflow = ScriptEngine.RunScriptWorkFlow(params.WorkFlow, _param.TableName, params.TableId, params.ViewId, _passport, params.Rowids)
        Dim model = New LinkScriptModel()
        If scriptflow.ReturnMessage <> String.Empty Then
            model.ErrorMsg = scriptflow.ReturnMessage
        ElseIf (Not scriptflow.Engine Is Nothing) AndAlso scriptflow.Engine.ShowPromptBool Then
            Session("LinkScriptEngineMvc") = scriptflow.Engine
            model.ErrorMsg = ""
        End If
        If String.IsNullOrEmpty(model.ErrorMsg) AndAlso scriptflow.ScriptControlDictionary IsNot Nothing Then
            model.BuiltControls(scriptflow)
        End If

        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function FlowButtonsClickEvent(linkscriptUidata As List(Of linkscriptUidata)) As JsonResult
        'set engine on session
        Dim engine As Smead.RecordsManagement.InternalEngine = DirectCast(Session("LinkScriptEngineMvc"), Smead.RecordsManagement.InternalEngine)
        Dim Button = linkscriptUidata.Where(Function(a) a.type = "button").FirstOrDefault().id
        Dim _control = engine.ScriptControlDictionary.Item(Button)
        _control.SetProperty(ScriptControls.ControlProperties.cpValue, "TRUE")
        engine.ScriptControlDictionary.Item(Button) = _control
        ' Dim UiResult = New linkscriptResult()
        Dim model = New LinkScriptModel()
        'setup all value which come from the UI to linkscript proprties.
        model.SetUpcontrolsValues(linkscriptUidata, engine)
        'run the script
        Dim successful = ScriptEngine.RunScript(engine, engine.ScriptName, engine.CurrentTableName, engine.RecordId, engine.ViewId, _passport, engine.Caller, engine.GetSelectedRowIds)
        Dim result = New ScriptReturn(successful, engine)
        model.GridRefresh = result.GridRefresh
        model.ReturnMessage = result.ReturnMessage
        model.Successful = result.Successful

        If result.Successful Then Session("LinkScriptEngineMvc") = engine

        If result.Engine IsNot Nothing Then
            If result.Engine.ShowPromptBool Then
                Session("LinkScriptEngineMvc") = result.Engine
                model.BuiltControls(result)
                model.ContinuetoAnotherDialog = result.Engine.ShowPromptBool
            Else
                model.UnloadPromptWindow = True
            End If
        End If


        'Below condition used for SharePoint Move functionality
        If Not ConfigurationManager.AppSettings("SPURL") Is Nothing Then
            Keys.RemoveDocument()
            Keys.IsMovedFromSP = ""
        End If
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    'TABQUIK | API CALL
    <HttpGet>
    Public Function TabQuik() As ActionResult
        Dim getValues = Request.Cookies.Get("TabQuikViewRowselected").Value
        Dim viewId = getValues.Split("^&&^")(0)
        Dim rowsSelected = getValues.Split("^&&^")(2).ToString
        Dim param = New Parameters(viewId, _passport)
        Dim model = New TabquikApi(_passport, param, rowsSelected)
        model.GetLicense()
        model.GetTabquikData()
        model.CreateSecureLink()
        Return View(model)
    End Function
    'TRACKABLE | API CALL
    <HttpGet>
    Public Function GetTrackbaleDataPerRow(track As TrackingModel.trackableUiParams) As JsonResult
        Dim model = New TrackingModel(_passport, track.ViewId, track.RowKeyid)
        model.GetTrackingInfo()
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    'FAVORITE: ADD - DELETE - UPDATE | API CALL
    <HttpGet>
    Public Function ReturnFavoritTogrid(params As MyFavorite.UiParams) As JsonResult
        Dim model = New GridDataBindig(_passport, params.ViewId, 1)
        model.IsWhereClauseRequest = True
        model.WhereClauseStr = "select [TableId] from s_SavedChildrenFavorite where SavedCriteriaId=" + params.FavCriteriaid
        model.ExecuteGridData()

        Dim jsonresult = Json(model, JsonRequestBehavior.AllowGet)
        jsonresult.MaxJsonLength = Integer.MaxValue
        Return jsonresult
    End Function
    <HttpGet>
    Public Function DeleteFavorite(params As MyFavorite.UiParams) As JsonResult
        Dim model = New MyFavorite()
        Try
            Dim isdeleted = SavedCriteria.DeleteSavedCriteria(params.FavCriteriaid, "1")
            If isdeleted Then model.msg = "success"
        Catch ex As Exception
            model.msg = ex.Message
        End Try
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function AddNewFavorite(params As MyFavorite.UiParams, recordkeys As List(Of MyFavorite.UirowsList)) As JsonResult
        Dim listOfKeys = New List(Of String)
        For Each rec In recordkeys
            listOfKeys.Add(rec.rowKeys)
        Next
        Dim model = New MyFavorite()
        model.msg = "success"
        Try
            Dim ps_SavedCriteriaId = SavedCriteria.SaveSavedCriteria(_passport.UserId, model.msg, params.NewFavoriteName, params.ViewId, _is_SavedCriteria)
            If Not ps_SavedCriteriaId = Nothing Then
                Dim pOutPut = SavedCriteria.SaveSavedChildrenFavourite(model.msg, True, ps_SavedCriteriaId, params.ViewId, listOfKeys, _is_SavedCriteria, _is_SavedChildrenFavorite)
                model.SaveCriteriaId = ps_SavedCriteriaId
            End If
        Catch ex As Exception
            model.msg = ex.Message
        End Try
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function UpdateFavorite(params As MyFavorite.UiParams, recordkeys As List(Of MyFavorite.UirowsList)) As JsonResult
        Dim listOfKeys = New List(Of String)
        For Each rec In recordkeys
            listOfKeys.Add(rec.rowKeys)
        Next
        Dim model = New MyFavorite()
        model.msg = "success"
        Try
            SavedCriteria.SaveSavedChildrenFavourite(model.msg, True, params.FavCriteriaid, params.ViewId, listOfKeys, _is_SavedCriteria, _is_SavedChildrenFavorite)
            model.SaveCriteriaId = params.FavCriteriaid

        Catch ex As Exception
            model.msg = ex.Message
        End Try
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function DeleteFavoriteRecord(params As MyFavorite.UiParams, recordkeys As List(Of MyFavorite.UirowsList)) As JsonResult
        Dim lst = New List(Of String)
        Dim model = New MyFavorite()
        model.msg = "success"
        For Each d In recordkeys
            lst.Add(d.rowKeys)
        Next
        Try
            SavedCriteria.DeleteFavouriteRecords(lst, params.FavCriteriaid)
        Catch ex As Exception
            model.msg = ex.Message
        End Try
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    'QUERY: ADD - DELETE - UPDATE | API CALL 
    <HttpPost>
    Public Function SaveNewQuery(params As Myquery.queryList, Querylist As List(Of Myquery.queryList)) As JsonResult
        Dim model = New Myquery(_passport, params, Querylist)
        model.InsertNewQuery()
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function UpdateQuery(params As Myquery.queryList, Querylist As List(Of Myquery.queryList)) As JsonResult
        Dim model = New Myquery(_passport, params, Querylist)
        model.UpdateQuery()
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function DeleteQuery(params As Myquery.queryList) As JsonResult
        Dim model = New Myquery(_passport, params)
        model.DeleteQuery()
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    'GLOBAL SEARCH | API CALL
    <HttpPost>
    Public Function RunglobalSearch(params As GlobalSearch.globalSearchUI) As JsonResult
        Dim model = New GlobalSearch(_passport, params.ViewId, params.SearchInput, params.ChkAttch, params.ChkcurTable, params.ChkUnderRow, params.TableName, params.Currentrow)
        model.HtmlReturn()
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function GlobalSearchClick(params As GlobalSearch.globalSearchUI) As JsonResult
        Dim model = New GridDataBindig(_passport, params.ViewId, 1)
        model.GsIsGlobalSearch = True
        model.GsKeyvalue = params.KeyValue
        model.GsSearchText = params.SearchInput
        model.GsIsAllGlobalRequest = False
        model.ExecuteGridData()
        'setup levelManager | written for aspx 
        Dim levelmanager As LevelManager = New LevelManager(_passport)
        Dim level As Level = New Level(_passport)
        levelmanager.CurrentLevel = 0
        levelmanager.Levels.Add(level)
        levelmanager.ActiveLevel.Parameters = model.params
        Session("LevelManager") = levelmanager

        Dim jsonresult = Json(model, JsonRequestBehavior.AllowGet)
        jsonresult.MaxJsonLength = Integer.MaxValue
        Return jsonresult
    End Function
    <HttpPost>
    Public Function GlobalSearchAllClick(params As GlobalSearch.globalSearchUI) As JsonResult
        Dim model = New GridDataBindig(_passport, params.ViewId, 1)
        model.GsIsGlobalSearch = True
        model.GsSearchText = params.SearchInput
        model.GsIncludeAttchment = params.IncludeAttchment
        model.GsIsAllGlobalRequest = True
        model.ExecuteGridData()

        Dim jsonresult = Json(model, JsonRequestBehavior.AllowGet)
        jsonresult.MaxJsonLength = Integer.MaxValue
        Return jsonresult
    End Function
    'GRIG: ADD - DELETE - EDIT | API CALL
    <HttpPost>
    Public Function SetDatabaseChanges(Rowdata As List(Of Saverows.RowsparamsUI), params As Saverows.paramsUI) As JsonResult
        Dim pkeyId = Rowdata(Rowdata.Count - 1).value
        Dim model = New Saverows(_passport, params, Request.ServerVariables("REMOTE_HOST").ToString, Rowdata, pkeyId)
        If (String.IsNullOrEmpty(pkeyId)) Then
            'insert new row
            model.AddNewRow()
        Else
            'save edit row
            model.EditRow()
        End If
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function CheckForduplicateId(param As Saverows.paramsUI) As JsonResult
        'not in use!!
        Dim isDuplicated As Boolean
        isDuplicated = Navigation.CheckIfDuplicatePrimaryKey(_passport, param.Tablename, param.PrimaryKeyname, param.KeyValue)
        Return Json(isDuplicated, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function DeleteRowsFromGrid(rowData As Deleterows.RowparamsUI, params As Deleterows.paramsUI) As JsonResult
        Dim model = New Deleterows(_passport, rowData.ids, params.viewid, Request.ServerVariables("REMOTE_HOST").ToString)
        model.DeleteRows()
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    'TASKBAR CLICK AND RETURN TABLE | API CALL
    <HttpGet>
    Public Function TaskBarClick(viewId As Integer) As JsonResult
        Dim model = New GridDataBindig(_passport, viewId, 1)
        model.IsOpenWhereClause = True
        model.IsWhereClauseRequest = True
        model.WhereClauseStr = ""
        model.ExecuteGridData()

        Dim JsonResult = Json(model, JsonRequestBehavior.AllowGet)
        JsonResult.MaxJsonLength = Integer.MaxValue
        Return JsonResult
    End Function
    'REPORTING | API CALL
    <HttpPost>
    Public Function Reporting(params As reportingUIparams) As JsonResult
        Dim report = New Reporting(params.Tableid, params.tableName, params.viewId, params.pageNumber, _passport)
        report.ExecuteReporting(params.reportNum)

        Dim JsonResult = Json(report, JsonRequestBehavior.AllowGet)
        JsonResult.MaxJsonLength = Integer.MaxValue
        Return JsonResult
    End Function
    'REPORTING AUDIT SEARCH
    <HttpPost>
    Public Function RunAuditSearch(params As AuditReportSearch.UIproperties) As JsonResult
        Dim model = New AuditReportSearch(_passport)
        model.RunQuery(params)
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    'RETENTION INFORMATION
    <HttpPost>
    Public Function OnDropdownChange(props As retentionInfoUIparams) As JsonResult
        Dim model = New RetentionInfo(props, _passport)
        model.OnDropdownChange()
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    <HttpPost>
    Public Function RetentionInfoUpdate(props As retentionInfoUIparams) As JsonResult
        Dim model = New RetentionInfo(_passport)
        model.StartUpdating(props)
        Return Json(model, JsonRequestBehavior.AllowGet)
    End Function
    '<HttpPost>
    'Public Function RemoveRetentioninfoRows(ids As ICollection(Of Integer)) As JsonResult
    '    Dim model = New RetentionInfo(_passport)
    '    model.RemoveRetentioninfoRows(ids)
    '    Return Json(model, JsonRequestBehavior.AllowGet)
    'End Function
    'PARTIAL VIEW RETURNS
    <HttpGet>
    Public Function DataGridView() As ActionResult
        Return PartialView("_DataGrid")
    End Function
    <HttpGet>
    Public Function ReportingReturn() As ActionResult
        Return PartialView("_Reporting")
    End Function
    <HttpGet>
    Public Function NewFavorite() As ActionResult
        Return PartialView("_NewFavorite")
    End Function
    <HttpGet>
    Public Function CheckBeforeAddTofavorite(viewid As Integer) As JsonResult
        Dim hasList As Boolean = False
        Dim criteriaList = _is_SavedCriteria.Where(Function(a) a.ViewId = viewid And a.SavedType = 1).ToList()
        If criteriaList.Count > 0 Then
            hasList = True
        End If
        Return Json(hasList, JsonRequestBehavior.AllowGet)
    End Function
    <HttpGet>
    Public Function StartDialogAddToFavorite(viewid As Integer) As ActionResult
        Dim model = New MyFavorite()
        model.placeholder = Languages.Translation("FavoriteListDdl")
        model.label = Languages.Translation("lblAddFavourite")
        Try
            Dim criteriaList = _is_SavedCriteria.Where(Function(a) a.ViewId = viewid And a.SavedType = 1).ToList()
            If criteriaList.Count > 0 Then
                For Each lst In criteriaList
                    Dim ddl = New MyFavorite.FavoritedropdownList()
                    Dim name = lst.SavedName
                    ddl.text = name
                    ddl.value = lst.Id
                    model.ListAddtoFavorite.Add(ddl)
                Next
            End If
        Catch ex As Exception
            model.msg = ex.Message
        End Try

        Return PartialView("_AddtoFavorite", model)
    End Function
    <HttpGet>
    Public Function GetauditReportView() As ActionResult
        Dim model = New AuditReportSearch(_passport)
        model.loadDialogReportSearch()
        Return PartialView("_AuditReport", model)
    End Function
    <HttpGet>
    Public Function GetRetentionInfo(id As String, viewId As Integer) As ActionResult
        Dim model = New RetentionInfo(id, viewId, _passport)
        model.GetRetentionInfoPerRow()
        Return PartialView("_RetentionInfo", model)
    End Function
    <HttpGet>
    Public Function RetentionInfoHolde() As ActionResult
        Return PartialView("_RetentionInfoHolde")
    End Function
End Class



