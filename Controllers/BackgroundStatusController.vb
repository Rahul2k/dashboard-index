Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.Mvc
Imports TabFusionRMS.Models
Imports TabFusionRMS.RepositoryVB
Imports Newtonsoft.Json
Imports System.IO
Imports System.Globalization
Imports TabFusionRMS.DataBaseManagerVB
Imports System.Web.Hosting

Namespace TABFusionRMS.Web.Controllers
    Public Class BackgroundStatusController
        Inherits BaseController

        Private Property _iTable As IRepository(Of Table)
        Private Property _iDatabas As IRepository(Of Databas)
        Private Property _iSLServiceTask As IRepository(Of SLServiceTask)

        Dim _IDBManager As IDBManager = New DBManager

        Public Sub New(iSLServiceTask As IRepository(Of SLServiceTask), iTable As IRepository(Of Table), iDatabas As IRepository(Of Databas))
            MyBase.New()
            _iSLServiceTask = iSLServiceTask
            _iTable = iTable
            _iDatabas = iDatabas
        End Sub

        Function Index() As ActionResult
            Return View()
        End Function

        Public Function GetBackgroundStatusList1(sidx As String, sord As String, page As Integer, rows As Integer) As JsonResult

            Dim dtRecords As DataTable = Nothing
            Dim totalRecords As Integer = 0
            _IDBManager.ConnectionString = Keys.GetDBConnectionString
            _IDBManager.CreateParameters(6)
            _IDBManager.AddParameters(0, "@TableName", "SLServiceTasks")
            _IDBManager.AddParameters(1, "@PageNo", page)
            _IDBManager.AddParameters(2, "@PageSize", rows)
            _IDBManager.AddParameters(3, "@DataAndColumnInfo", True)
            _IDBManager.AddParameters(4, "@ColName", sidx)
            _IDBManager.AddParameters(5, "@Sort", sord)
            Dim loutput = _IDBManager.ExecuteDataSetWithSchema(System.Data.CommandType.StoredProcedure, "SP_RMS_GetTableData")
            _IDBManager.Dispose()
            dtRecords = loutput.Tables(0)
            Dim list = loutput.Tables(0).Rows.Cast(Of DataRow).ToList()
            Dim lBackgroundServiceTask As New List(Of BackgroundServiceTask)()
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
                For Each rowData In list
                    Dim objJobServiceTask As BackgroundServiceTask = New BackgroundServiceTask()

                    Select Case rowData("Status").ToString()
                        Case [Enum].GetName(GetType(Enums.BackgroundTaskStatus), 1).ToString() '--Pending
                            objJobServiceTask.Status = If(String.IsNullOrEmpty(rowData("Status")), "", "<span style='color:red'>" + rowData("Status") + "</span>")
                            objJobServiceTask.ReportLocation = "-"
                            objJobServiceTask.DownloadLocation = "-"
                        Case [Enum].GetName(GetType(Enums.BackgroundTaskStatus), 2).ToString() '--In-Progress
                            objJobServiceTask.Status = If(String.IsNullOrEmpty(rowData("Status")), "", "<span style='color:darkgoldenrod'>" + rowData("Status") + "</span>")
                            objJobServiceTask.ReportLocation = "-"
                            objJobServiceTask.DownloadLocation = "-"
                        Case [Enum].GetName(GetType(Enums.BackgroundTaskStatus), 4).ToString() '--Error
                            objJobServiceTask.Status = If(String.IsNullOrEmpty(rowData("Status")), "", "<span style='color:red'>" + rowData("Status") + "</span>")
                            objJobServiceTask.DownloadLocation = "-"
                            Dim mainPath As String = Nothing
                            If Not String.IsNullOrEmpty(rowData("ReportLocation")) Then
                                If System.IO.File.Exists(rowData("ReportLocation")) Then
                                    Dim path = rowData("ReportLocation").Split("\")
                                    mainPath = "\BackgroundFiles\" + path.Last
                                    objJobServiceTask.ReportLocation = "<a href='" + Url.Action("DownloadBackgroundStatus", "BackgroundStatus", New With {.url = (Common.EncryptURLParameters(mainPath))}) + "'><i class='fa fa-eye' aria-hidden='True'></i></a>"
                                Else
                                    objJobServiceTask.ReportLocation = "-"
                                End If
                            Else
                                objJobServiceTask.ReportLocation = "-"
                            End If
                        Case [Enum].GetName(GetType(Enums.BackgroundTaskStatus), 3).ToString() '--Completed
                            objJobServiceTask.Status = If(String.IsNullOrEmpty(rowData("Status")), "", "<span style='color:green'>" + rowData("Status") + "</span>")
                            Dim mainPath As String = Nothing
                            If rowData("TaskType") = Enums.BackgroundTaskType.Export Then
                                If Not String.IsNullOrEmpty(rowData("DownloadLocation")) Then
                                    If System.IO.File.Exists(rowData("DownloadLocation")) Then
                                        Dim path = rowData("DownloadLocation").Split("\")
                                        mainPath = "\BackgroundFiles\" + path.Last
                                        objJobServiceTask.DownloadLocation = "<a href='" + Url.Action("DownloadBackgroundStatus", "BackgroundStatus", New With {.url = (Common.EncryptURLParameters(mainPath))}) + "'><i class='fa fa-download' aria-hidden='True'></i></a>"
                                    Else
                                        objJobServiceTask.DownloadLocation = "-"
                                    End If
                                Else
                                    objJobServiceTask.DownloadLocation = "-"
                                End If
                                objJobServiceTask.ReportLocation = "-"
                            Else
                                objJobServiceTask.DownloadLocation = "-"
                                If Not String.IsNullOrEmpty(rowData("ReportLocation")) Then
                                    If System.IO.File.Exists(rowData("ReportLocation")) Then
                                        Dim path = rowData("ReportLocation").Split("\")
                                        mainPath = "\BackgroundFiles\" + path.Last
                                        objJobServiceTask.ReportLocation = "<a href='" + Url.Action("DownloadBackgroundStatus", "BackgroundStatus", New With {.url = (Common.EncryptURLParameters(mainPath))}) + "'><i class='fa fa-eye' aria-hidden='True'></i></a>"
                                    Else
                                        objJobServiceTask.ReportLocation = "-"
                                    End If
                                Else
                                    objJobServiceTask.ReportLocation = "-"
                                End If
                            End If
                    End Select
                    objJobServiceTask.Id = rowData("Id")
                    objJobServiceTask.StartDate = If(String.IsNullOrEmpty(rowData("StartDate").ToString()), "-", rowData("StartDate"))
                    objJobServiceTask.EndDate = If(String.IsNullOrEmpty(rowData("EndDate").ToString()), "-", rowData("EndDate"))
                    objJobServiceTask.Type = rowData("Type")
                    objJobServiceTask.RecordCount = rowData("RecordCount")
                    lBackgroundServiceTask.Add(objJobServiceTask)
                Next
            End If

            Dim totalPages = CInt(Math.Truncate(Math.Ceiling(CSng(totalRecords) / CSng(rows))))
            Dim jsonData = New With {Key .total = totalPages, Key .page = page, Key .records = totalRecords, Key .rows = lBackgroundServiceTask}
            Return Json(jsonData, JsonRequestBehavior.AllowGet)
        End Function

        Public Function GetBackgroundStatusList(sidx As String, sord As String, page As Integer, rows As Integer) As JsonResult
            Try
                Dim BaseWebPage As BaseWebPage = New BaseWebPage()
                Dim totalRecords As Integer = 0
                BackgroundStatus.ChangeNotification(BaseWebPage.Passport.UserId)
                Dim recordsList As List(Of SLServiceTask)

                If (BaseWebPage.Passport.IsAdmin) Then
                    recordsList = _iSLServiceTask.All().Where(Function(x) (x.TaskType = Enums.BackgroundTaskType.Transfer Or x.TaskType = Enums.BackgroundTaskInDetail.ExportCSV Or x.TaskType = Enums.BackgroundTaskInDetail.ExportTXT)).ToList()
                Else
                    recordsList = _iSLServiceTask.All().Where(Function(x) x.UserId = BaseWebPage.Passport.UserId And (x.TaskType = Enums.BackgroundTaskType.Transfer Or x.TaskType = Enums.BackgroundTaskInDetail.ExportCSV Or x.TaskType = Enums.BackgroundTaskInDetail.ExportTXT)).ToList()
                End If
                totalRecords = recordsList.Count()

                Select Case sidx
                    Case "CreateDate"
                        If sord.ToLower() = "asc" Then
                            recordsList = recordsList.OrderBy(Function(y) y.CreateDate).Skip(rows * (page - 1)).Take(rows).ToList()
                        Else
                            recordsList = recordsList.OrderByDescending(Function(y) y.CreateDate).Skip(rows * (page - 1)).Take(rows).ToList()
                        End If
                    Case "StartDate"
                        If sord.ToLower() = "asc" Then
                            recordsList = recordsList.OrderBy(Function(y) y.StartDate).Skip(rows * (page - 1)).Take(rows).ToList()
                        Else
                            recordsList = recordsList.OrderByDescending(Function(y) y.StartDate).Skip(rows * (page - 1)).Take(rows).ToList()
                        End If
                    Case "EndDate"
                        If sord.ToLower() = "asc" Then
                            recordsList = recordsList.OrderBy(Function(y) y.StartDate).Skip(rows * (page - 1)).Take(rows).ToList()
                        Else
                            recordsList = recordsList.OrderByDescending(Function(y) y.StartDate).Skip(rows * (page - 1)).Take(rows).ToList()
                        End If
                    Case "Type"
                        If sord.ToLower() = "asc" Then
                            recordsList = recordsList.OrderBy(Function(y) y.EndDate).Skip(rows * (page - 1)).Take(rows).ToList()
                        Else
                            recordsList = recordsList.OrderByDescending(Function(y) y.EndDate).Skip(rows * (page - 1)).Take(rows).ToList()
                        End If
                    Case "Status"
                        If sord.ToLower() = "asc" Then
                            recordsList = recordsList.OrderBy(Function(y) y.Status).Skip(rows * (page - 1)).Take(rows).ToList()
                        Else
                            recordsList = recordsList.OrderByDescending(Function(y) y.Status).Skip(rows * (page - 1)).Take(rows).ToList()
                        End If
                    Case "UserName"
                        If sord.ToLower() = "asc" Then
                            recordsList = recordsList.OrderBy(Function(y) y.UserName).Skip(rows * (page - 1)).Take(rows).ToList()
                        Else
                            recordsList = recordsList.OrderByDescending(Function(y) y.UserName).Skip(rows * (page - 1)).Take(rows).ToList()
                        End If
                    Case Else
                        If sord.ToLower() = "asc" Then
                            recordsList = recordsList.OrderBy(Function(y) y.StartDate).Skip(rows * (page - 1)).Take(rows).ToList()
                        Else
                            recordsList = recordsList.OrderByDescending(Function(y) y.StartDate).Skip(rows * (page - 1)).Take(rows).ToList()
                        End If
                End Select

                'totalRecords = _iSLServiceTask.All().Where(Function(x) x.TaskType = Enums.BackgroundTaskType.Transfer Or x.TaskType = Enums.BackgroundTaskType.Export).Count()
                If totalRecords <= 0 Then
                    Return Json(Languages.Translation("msgAdminCtrlNullValue"), JsonRequestBehavior.AllowGet)
                Else
                    Dim lBackgroundServiceTask As New List(Of BackgroundServiceTask)()
                    For Each rowData In recordsList
                        Dim objJobServiceTask As BackgroundServiceTask = New BackgroundServiceTask()
                        Select Case rowData.Status
                            Case [Enum].GetName(GetType(Enums.BackgroundTaskStatus), 1).ToString() '--Pending
                                objJobServiceTask.Status = If(rowData.Status Is Nothing, "", "<span style='color:red'><b>" + rowData.Status + "</b></span>")
                                objJobServiceTask.ReportLocation = "-"
                                objJobServiceTask.DownloadLocation = "-"
                            Case [Enum].GetName(GetType(Enums.BackgroundTaskStatus), 2).ToString() '--In-Progress
                                objJobServiceTask.Status = If(rowData.Status Is Nothing, "", "<span style='color:darkgoldenrod'><b>" + rowData.Status + "</b></span>")
                                objJobServiceTask.ReportLocation = "-"
                                objJobServiceTask.DownloadLocation = "-"
                            Case [Enum].GetName(GetType(Enums.BackgroundTaskStatus), 4).ToString() '--Error
                                objJobServiceTask.Status = If(rowData.Status Is Nothing, "", "<span style='color:red'><b>" + rowData.Status + "</b></span>")
                                objJobServiceTask.DownloadLocation = "-"
                                Dim mainPath As String = Nothing
                                If rowData.ReportLocation IsNot Nothing Then
                                    If System.IO.File.Exists(rowData.ReportLocation) Then
                                        Dim path = rowData.ReportLocation.Split("\")
                                        mainPath = "\BackgroundFiles\" + path.Last
                                        objJobServiceTask.ReportLocation = "<a href='" + Url.Action("DownloadBackgroundStatus", "BackgroundStatus", New With {.url = (Common.EncryptURLParameters(mainPath))}) + "'><i class='fa fa-eye' aria-hidden='True'></i></a>"
                                    Else
                                        objJobServiceTask.ReportLocation = "-"
                                    End If
                                Else
                                    objJobServiceTask.ReportLocation = "-"
                                End If
                            Case [Enum].GetName(GetType(Enums.BackgroundTaskStatus), 3).ToString() '--Completed
                                objJobServiceTask.Status = If(rowData.Status Is Nothing, "", "<span style='color:green'><b>" + rowData.Status + "</b></span>")
                                Dim mainPath As String = Nothing
                                If rowData.TaskType = Enums.BackgroundTaskInDetail.ExportCSV OrElse rowData.TaskType = Enums.BackgroundTaskInDetail.ExportTXT Then
                                    If rowData.DownloadLocation IsNot Nothing Then
                                        If System.IO.File.Exists(rowData.DownloadLocation) Then
                                            Dim path = rowData.DownloadLocation.Split("\")
                                            mainPath = "\BackgroundFiles\" + path.Last
                                            objJobServiceTask.DownloadLocation = "<a href='" + Url.Action("DownloadBackgroundStatus", "BackgroundStatus", New With {.url = (Common.EncryptURLParameters(mainPath))}) + "'><i class='fa fa-download' aria-hidden='True'></i></a>"
                                        Else
                                            objJobServiceTask.DownloadLocation = "-"
                                        End If
                                    Else
                                        objJobServiceTask.DownloadLocation = "-"
                                    End If
                                    objJobServiceTask.ReportLocation = "-"
                                Else
                                    objJobServiceTask.DownloadLocation = "-"
                                    If rowData.ReportLocation IsNot Nothing Then
                                        If System.IO.File.Exists(rowData.ReportLocation) Then
                                            Dim path = rowData.ReportLocation.Split("\")
                                            mainPath = "\BackgroundFiles\" + path.Last
                                            objJobServiceTask.ReportLocation = "<a href='" + Url.Action("DownloadBackgroundStatus", "BackgroundStatus", New With {.url = (Common.EncryptURLParameters(mainPath))}) + "'><i class='fa fa-eye' aria-hidden='True'></i></a>"
                                        Else
                                            objJobServiceTask.ReportLocation = "-"
                                        End If
                                    Else
                                        objJobServiceTask.ReportLocation = "-"
                                    End If

                                End If
                            Case [Enum].GetName(GetType(Enums.BackgroundTaskStatus), 5).ToString() '--In Que
                                objJobServiceTask.Status = If(rowData.Status Is Nothing, "", "<span style='color:navy'><b>" + rowData.Status + "</b></span>")
                                objJobServiceTask.ReportLocation = "-"
                                objJobServiceTask.DownloadLocation = "-"
                        End Select
                        objJobServiceTask.Id = rowData.Id
                        objJobServiceTask.CreateDate = If(rowData.CreateDate Is Nothing, "-", Keys.ConvertCultureDate(rowData.CreateDate.ToString, bDetectTime:=True))
                        objJobServiceTask.StartDate = If(rowData.StartDate Is Nothing, "-", Keys.ConvertCultureDate(rowData.StartDate.ToString, bDetectTime:=True))
                        objJobServiceTask.EndDate = If(rowData.EndDate Is Nothing, "-", Keys.ConvertCultureDate(rowData.EndDate.ToString, bDetectTime:=True))
                        objJobServiceTask.Type = rowData.Type
                        objJobServiceTask.RecordCount = rowData.RecordCount
                        objJobServiceTask.UserName = rowData.UserName
                        lBackgroundServiceTask.Add(objJobServiceTask)
                    Next

                    Dim totalPages = CInt(Math.Truncate(Math.Ceiling(CSng(totalRecords) / CSng(rows))))
                    Dim jsonData = New With {Key .total = totalPages, Key .page = page, Key .records = totalRecords, Key .rows = lBackgroundServiceTask}
                    Return Json(jsonData, JsonRequestBehavior.AllowGet)
                End If
            Catch ex As Exception
                Keys.ErrorType = "e"
                Keys.ErrorMessage = Keys.ErrorMessage
                Return Json(New With {
                            Key .errortype = Keys.ErrorType,
                            Key .message = Keys.ErrorMessage
                            }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            End Try
        End Function

        <HttpGet>
        Public Function DownloadBackgroundStatus(url As String) As FileResult
            Dim contentType As String = String.Empty
            Dim rootPath As String = String.Empty
            rootPath = HostingEnvironment.MapPath(Common.DecryptURLParameters(url))
            contentType = MimeMapping.GetMimeMapping(rootPath)
            Dim filedata As Byte() = System.IO.File.ReadAllBytes(rootPath)
            Dim cd As New System.Net.Mime.ContentDisposition
            cd.FileName = Path.GetFileName(rootPath)
            cd.Inline = False
            System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", cd.ToString())
            Return File(rootPath, contentType)
        End Function
    End Class
    Public Class BackgroundServiceTask
        Public Id As Integer
        Public CreateDate As String
        Public StartDate As String
        Public EndDate As String
        Public Type As String
        Public Status As String
        Public RecordCount As String
        Public ReportLocation As String
        Public DownloadLocation As String
        Public UserName As String
    End Class
End Namespace