Imports Smead.Security
Imports System.Linq
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
Imports System.Data.Entity.Validation
Imports System.Drawing.Text
Imports System.Drawing
Imports TabFusionRMS.Models.Table
Imports Smead.RecordsManagement
Imports Smead.RecordsManagement.Navigation
Imports Smead.RecordsManagement.Tracking
Imports System.Web.HttpContext


Public Class WebApiController
    Inherits BaseController

    Dim Basewebpage As New BaseWebPage
    Public ReadOnly Property LevelManager() As LevelManager
        Get
            Return CType(Session("LevelManager"), LevelManager)
        End Get
    End Property


    '
    ' GET: /WebApi

    Function Index() As ActionResult
        Dim Header = TempData("tblheader")
        Dim RowCell = TempData("tblrows")
        Dim chkattch = TempData("chkIfAttachment")

        If Header IsNot Nothing And RowCell IsNot Nothing Then
            ViewBag.tableRowsCell = RowCell.tableRowsCellsdata
            ViewBag.tableHeaderCell = Header.tableHeaderCelldata
            ViewBag.chkIfAttachment = chkattch
            ViewBag.storeVariables = TempData("storeVariable")
        End If

        Return View()
    End Function


    Public Function GetChildren(view1 As String, view2 As String, rowid As String) As ActionResult

        Dim query As New Query(Basewebpage.Passport)
        Dim isRowExist = False
        Dim Gmodel As New GridviewModel()
        Dim TableHeader As New GridHeaderCell()
        Dim TableRowcell As New GridRowsCells()
        Dim login = Request.Cookies("Islogin")
        Dim chkAttachment As Boolean
        Dim storeVariables As String = ""

        If login IsNot Nothing Then
            If login.Value = True Then
                Dim db = New TABFusionRMSContext(Basewebpage.Passport.ConnectionString)
                Try
                    Dim viewidParentView = checkIfViewsExist(db, view1, view2)
                    isRowExist = checkifRowExisting(viewidParentView, query, rowid)
                Catch ex As Exception
                    Gmodel.ErrorMessage = "Can not find one of the views: " + " " + view1 + " " + "or" + " " + view2
                    Return Json(Gmodel.ErrorMessage, JsonRequestBehavior.AllowGet)
                End Try
                Dim viewidchildView = db.Views.Where(Function(a) a.ViewName = view2).FirstOrDefault().Id
                Dim v2 = New Parameters(viewidchildView, Basewebpage.Passport)
                'if parent row exist show child view 
                If isRowExist = True Then
                    Try
                        Dim upperTable = db.Views.Where(Function(a) a.ViewName = view1).FirstOrDefault().TableName
                        Dim lowerTable = db.Views.Where(Function(a) a.ViewName = view2).FirstOrDefault().TableName
                        Dim haveAttachment = db.Tables.Where(Function(a) a.TableName = lowerTable).FirstOrDefault().Attachments
                        Dim ForeignKeyName = GetLowerTableForeignKeyField(upperTable, lowerTable, Basewebpage.Passport).Split(".")(1)
                        v2.ParentField = ForeignKeyName
                        v2.ParentValue = rowid
                        v2.Paged = True
                        v2.Data = query.FillData(v2)

                        TableHeader.tableHeaderCelldata = BuildNewTableHeaderData(v2)
                        TableRowcell.tableRowsCellsdata = BuildNewTeableFieldsData(v2)
                        storeVariables = String.Format("{0},{1},{2},{3}", view1, rowid, view2, v2.TotalRows)
                        chkAttachment = haveAttachment

                        If Basewebpage.Passport.CheckPermission(upperTable, Smead.Security.SecureObject.SecureObjectType.Table, Permissions.Permission.Access) AndAlso Basewebpage.Passport.CheckPermission(view1, Smead.Security.SecureObject.SecureObjectType.View, Permissions.Permission.View) AndAlso Basewebpage.Passport.CheckPermission(lowerTable, Smead.Security.SecureObject.SecureObjectType.Table, Permissions.Permission.Access) AndAlso Basewebpage.Passport.CheckPermission(view2, Smead.Security.SecureObject.SecureObjectType.View, Permissions.Permission.View) Then
                            'send TempData to index
                            TempData("tblheader") = TableHeader
                            TempData("tblrows") = TableRowcell
                            TempData("chkIfAttachment") = chkAttachment
                            TempData("storeVariable") = storeVariables
                            Return RedirectToAction("Index", "WebApi")
                        Else
                            Gmodel.ErrorMessage = Server.UrlDecode("You don't have permission to access this views " + view1 + " or " + view2)
                            Return Json(Gmodel.ErrorMessage, JsonRequestBehavior.AllowGet)
                        End If
                    Catch ex As Exception
                        'Gmodel.ErrorMessage = "Something went wrong, please try again!!"
                        Gmodel.ErrorMessage = ex.Message
                        'Return Json(Gmodel.ErrorMessage, JsonRequestBehavior.AllowGet)
                    End Try
                Else
                    Gmodel.ErrorMessage = "Can't access to this row"
                    'Return Json(Gmodel.ErrorMessage, JsonRequestBehavior.AllowGet)
                End If

            Else
                Session("ApiRequest") = Current.Request.Url.AbsoluteUri
                'Session("ApiRequest") = Current.Request.
                Return New EmptyResult()
            End If
        Else
            Session("ApiRequest") = Current.Request.Url.AbsoluteUri
            'Session("ApiRequest") = Current.Request.
            Return New EmptyResult()
        End If
        Return New EmptyResult()
    End Function
    Public Function lazyLoadData(view1 As String, rowid As String, view2 As String, pageNum As Integer) As JsonResult
        Dim db = New TABFusionRMSContext(Basewebpage.Passport.ConnectionString)
        Dim query As New Query(Basewebpage.Passport)
        Dim viewidchildView = db.Views.Where(Function(a) a.ViewName = view2).FirstOrDefault().Id
        Dim v2 = New Parameters(viewidchildView, Basewebpage.Passport)
        Dim upperTable = db.Views.Where(Function(a) a.ViewName = view1).FirstOrDefault().TableName
        Dim lowerTable = db.Views.Where(Function(a) a.ViewName = view2).FirstOrDefault().TableName
        Dim haveAttachment = db.Tables.Where(Function(a) a.TableName = lowerTable).FirstOrDefault().Attachments
        Dim ForeignKeyName = GetLowerTableForeignKeyField(upperTable, lowerTable, Basewebpage.Passport).Split(".")(1)
        v2.ParentField = ForeignKeyName
        v2.ParentValue = rowid
        v2.PageIndex = pageNum
        v2.Paged = True
        'v2.RequestedRows = pageNum
        v2.Data = query.FillData(v2)
        Dim dataReturn = BuildNewTeableFieldsData(v2)
        Return Json(dataReturn, JsonRequestBehavior.AllowGet)
    End Function

    Private Function checkIfViewsExist(db As TABFusionRMSContext, view1 As String, view2 As String) As Integer
        Dim viewidParentView = db.Views.Where(Function(a) a.ViewName = view1).FirstOrDefault().Id
        Dim viewidchildView = db.Views.Where(Function(a) a.ViewName = view2).FirstOrDefault().Id
        Return viewidParentView
    End Function

    Private Function checkifRowExisting(viewidParentView As Integer, query As Query, rowid As String) As Boolean
        Dim isRowExist = False
        'Dim v1
        Dim v1 = New Parameters(viewidParentView, Basewebpage.Passport)
        v1.QueryType = queryTypeEnum.OpenTable
        v1.Scope = ScopeEnum.Table
        v1.ParentField = String.Empty
        v1.ParentValue = String.Empty

        v1.WhereClause = String.Format("{0} in ({1}) ", v1.KeyField, String.Format("select {1} from {0} where {1} = '{2}'", v1.TableName, v1.KeyField, rowid))
        v1.Data = query.FillData(v1)
        If v1.Data.Rows.Count > 0 Then
            isRowExist = True
        End If
        Return isRowExist
    End Function

    Private Function BuildNewTeableFieldsData(v2 As Object) As String
        'formating and converting to json data
        Dim lstCell = New List(Of String)
        Dim dataCell As New GridRowsCells
        Dim lstrows As New List(Of List(Of String))

        'properties for attachments
        Dim tableName As String = v2.TableName & DelimiterText
        Dim tableid As String = "***pkey***" & DelimiterText
        Dim userid As String = Basewebpage.Passport.UserId.ToString & DelimiterText
        Dim database As String = String.Format("{0}\{1}", Session("Server").ToString, Session("databaseName").ToString) & DelimiterText
        Dim attachmentNumber As String = "0"
        Dim pass = "***ticket***" & DelimiterText & userid & database & tableName & tableid & attachmentNumber

        'id=29&table=Documents&attachment=0"
        For Each dr As DataRow In v2.Data.Rows
            Dim rowPass = pass.Replace("***pkey***", dr("pkey").ToString()).Replace("%%%pkey%%%", dr("pkey").ToString).Replace("***ticket***", Basewebpage.Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString, Session("databaseName").ToString), v2.TableName, dr("pkey").ToString))
            Dim encryptedRowPass = EncryptString(rowPass)
            Dim doc = New HtmlAgilityPack.HtmlDocument()

            Dim valuesLink = "id=" + dr("pkey").ToString.PadLeft(30, "0"c) + "&table=" + v2.TableName + "&attachment=" + dr("Attachments").ToString + "&itemname=" + dr("ItemName").ToString
            Dim encryptedValue = Common.EncryptURLParameters(valuesLink)
            dataCell = New GridRowsCells

            For Each col As DataColumn In v2.Data.Columns
                If ShowColumn(col) Then
                    Select Case col.DataType.ToString
                        Case Is = "System.Boolean"
                            If CBoolean(dr(col.ColumnName)) Then
                                dataCell.textCell = "Yes"
                            Else
                                dataCell.textCell = "No"
                            End If
                        Case Is = "System.DateTime"
                            dataCell.textCell = Keys.ConvertCultureDate(dr(col.ColumnName).ToString(), bDetectTime:=True)
                        Case Else
                            Try
                                Select Case col.ExtendedProperties("editmask").ToString.ToLower
                                    Case "", "@", "&", "!"
                                        dataCell.textCell = dr(col.ColumnName).ToString
                                    Case "<"
                                        dataCell.textCell = dr(col.ColumnName).ToString.ToLower
                                    Case ">"
                                        dataCell.textCell = dr(col.ColumnName).ToString.ToUpper
                                    Case "yes/no"
                                        dataCell.textCell = CDbl(Replace(dr(col.ColumnName).ToString, "-", "")).ToString(col.ExtendedProperties("editmask").ToString).ToString
                                    Case Else
                                        If Not String.IsNullOrEmpty(dr(col.ColumnName).ToString) Then
                                            dataCell.textCell = CDbl(Replace(dr(col.ColumnName).ToString, "-", "")).ToString(col.ExtendedProperties("editmask").ToString).ToString
                                        End If
                                End Select
                            Catch ex As Exception
                                dataCell.textCell = dr(col.ColumnName).ToString
                            End Try

                            If CBoolean(col.ExtendedProperties("caplocks")) Then
                                dataCell.textCell = dataCell.Text.ToUpper()
                            End If
                            If col.ColumnName = "Attachments" Then
                                Dim countAttach = dr(col.ColumnName).ToString
                                'dataCell.textCell = String.Format("<a onmouseout='HideFlyOut()' ;="" class='theme_color' onmouseover='ShowFlyOut({0})' href='\documentviewer.aspx?{1}'><i class='fa fa-paperclip fa-flip-horizontal fa-2x theme_color'></i></a>", encryptedRowPass, encryptedValue) 
                                dataCell.textCell = encryptedRowPass + "," + encryptedValue + "," + countAttach
                            End If

                    End Select
                    lstCell.Add(dataCell.textCell)
                End If
            Next
            lstrows.Add(lstCell)
            lstCell = New List(Of String)
        Next

        Dim jsonObject = JsonConvert.SerializeObject(lstrows)
        Return jsonObject
    End Function

    Private Function BuildNewTableHeaderData(v2 As Object) As String
        Dim lst = New List(Of String)

        For Each col As DataColumn In v2.Data.Columns
            If ShowColumn(col) Then
                lst.Add(col.ExtendedProperties("heading").ToString)
            End If
        Next
        Dim jsonObject = JsonConvert.SerializeObject(lst)
        Return jsonObject
    End Function

    Private Function ShowColumn(ByVal col As DataColumn) As Boolean
        'If CBoolean(col.ExtendedProperties("columnvisible")) = False Then Return False
        If col.ColumnName <> "Attachments" Then
            Select Case CInt(col.ExtendedProperties("columnvisible"))
                Case 3  'Not visible
                    Return False
                Case 1  'Visible on level 1 only
                    If Basewebpage.LevelManager.CurrentLevel <> 0 Then Return False
                Case 2  'Visible on level 2 and below only
                    If Basewebpage.LevelManager.CurrentLevel < 1 Then Return False
                Case 4  'Smart column- not visible in a drill down when it's the parent.
                    'If Basewebpage.LevelManager.CurrentLevel > 0 And Basewebpage.LevelManager.ActiveLevel.Parameters.ParentField.ToLower = col.ColumnName.ToLower Then
                    Return False
                    'End If
            End Select
        End If

        If col.ColumnName.ToLower = "formattedid" Then Return False
        'If col.ColumnName.ToLower = "id" Then Return False
        'If col.ColumnName.ToLower = "attachments" Then Return False
        If col.ColumnName.ToLower = "slrequestable" Then Return False
        If col.ColumnName.ToLower = "itemname" Then Return False
        If col.ColumnName.ToLower = "pkey" Then Return False
        If col.ColumnName.ToLower = "dispositionstatus" Then Return False
        If col.ColumnName.ToLower = "processeddescfieldnameone" Then Return False
        If col.ColumnName.ToLower = "processeddescfieldnametwo" Then Return False
        If col.ColumnName.ToLower = "rownum" Then Return False
        Return True
    End Function

    'methods for attachment encryp

End Class