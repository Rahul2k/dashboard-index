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
Imports System.Web.Helpers
Imports System.Drawing.Text
Imports System.Drawing
Imports System.Globalization

Public Class LabelManagerController
    Inherits BaseController
    Dim _IDBManager As IDBManager = New DBManager
    'Private Property _IDBManager As IDBManager
    Private Property _iOneStripJob As IRepository(Of OneStripJob)
    Private Property _iOneStripJobsField As IRepository(Of OneStripJobField)
    Private Property _iOneStripForms As IRepository(Of OneStripForm)
    Private Property _iTables As IRepository(Of Table)
    Private Property _iDatabas As IRepository(Of Databas)
    'IDBManager As IDBManager, 
    Public Sub New(iOneStripJob As IRepository(Of OneStripJob),
                   iOneStripJobField As IRepository(Of OneStripJobField), iOneStripForms As IRepository(Of OneStripForm), iTable As IRepository(Of Table), iDatabase As IRepository(Of Databas))
        MyBase.New()
        '_IDBManager = IDBManager
        _iOneStripJob = iOneStripJob
        _iOneStripJobsField = iOneStripJobField
        _iOneStripForms = iOneStripForms
        _iTables = iTable
        _iDatabas = iDatabase
    End Sub

    Function Index() As ActionResult
        'Keys.iLabelRefId = Keys.GetUserId
        Session("iLabelRefId") = Keys.GetUserId
        Return View()
    End Function

    Function LoadAddEditLabel() As PartialViewResult
        Return PartialView("_AddBarCodePartial")
    End Function

    Function GetFirstValue(table As String, field As String, SQL_String As String) As ActionResult

        Dim sString = Nothing
        Dim sSql = Nothing
        Dim loutput = Nothing
        Dim oBarCodePrefix = Nothing
        Dim oDBManager = New DBManager

        Try
            Dim pTable = _iTables.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(table.Trim().ToLower()) AndAlso Not String.IsNullOrEmpty(x.DBName.Trim().ToLower())).FirstOrDefault()

            Dim oTable = _iTables.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(table.Trim().ToLower())).FirstOrDefault()

            oBarCodePrefix = oTable.BarCodePrefix

            Dim pDatabaseEntity = Nothing
            If Not pTable Is Nothing Then
                pDatabaseEntity = _iDatabas.Where(Function(x) x.DBName.Trim().ToLower().Equals(pTable.DBName.Trim().ToLower())).FirstOrDefault()
                oDBManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)
            Else
                oDBManager.ConnectionString = Keys.GetDBConnectionString
            End If

            Dim finalSQL = SQL_String.Split(New String() {"WHERE"}, StringSplitOptions.None)(0)

            Dim dateColumn = True
            If field.ToString.ToLower.Contains("date") Then
                sSql = "SELECT TOP 1 *, CONVERT(VARCHAR(19)," + field + ",121) As DateColumn, " + finalSQL.Substring(7)
                'sSql = "SELECT TOP 1 *,CONVERT(VARCHAR(19)," + field + ",121) As DateColumn FROM " + table
                dateColumn = True
            Else
                sSql = "SELECT TOP 1 " + finalSQL.Substring(7)
                'sSql = "SELECT TOP 1 * FROM " + table
                dateColumn = False
            End If


            'sSql = "SELECT TOP 1 [" + field + "] FROM " + table + " ORDER BY [" + field + "] ASC"

            loutput = oDBManager.ExecuteDataSet(System.Data.CommandType.Text, sSql)

            If loutput.Tables(0).Rows.Count = 0 Then
                sString = field
            Else
                If dateColumn Then
                    ''Changed by Hasmukh on 06/15/2016 for date format changes
                    sString = Keys.ConvertCultureDate(loutput.Tables(0).Rows(0).Item("DateColumn").ToString(), True, False) 'Date.Parse(loutput.Tables(0).Rows(0).Item("DateColumn").ToString()).ToString(Keys.GetCultureCookies().DateTimeFormat.ShortDatePattern, CultureInfo.InvariantCulture)
                    'String = loutput.Tables(0).Rows(0).Item("DateColumn").ToString()
                Else
                    sString = loutput.Tables(0).Rows(0).Item(field).ToString()
                End If

                'sString = loutput.Tables(0).Rows(0).Item(0).ToString()
            End If

            oDBManager.CommitTransaction()

        Catch ex As Exception
            sString = field
            oDBManager.CommitTransaction()
            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.UnableToConnect("")
        End Try
        Return Json(New With {Key .value = sString, _
                              Key .barCodePrefix = oBarCodePrefix, _
                                Key .errortype = Keys.ErrorType, _
                                  Key .message = Keys.ErrorMessage _
                                      }, JsonRequestBehavior.AllowGet)
    End Function

    Function AddLabel(pOneStripJobs As OneStripJob, pDrawLabels As Boolean) As ActionResult

        Dim labelId = Nothing
        Dim onestripjobs = Nothing
        Dim onestripjobfields = Nothing
        Dim lError As Integer = 0
        Dim sErrorMessage As String = Nothing
        Dim sMessage As String = String.Empty
        Dim rsTestSQL As New ADODB.Recordset
        Dim ValidateSQL As Boolean = True
        Dim oBarCodePrefix = Nothing

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects

        Dim oTable = _iTables.All().Where(Function(x) x.TableName = pOneStripJobs.TableName).FirstOrDefault()

        oBarCodePrefix = oTable.BarCodePrefix

        Dim sSQL = pOneStripJobs.SQLString.Replace("%ID%", 0)

        Dim uSQL = pOneStripJobs.SQLUpdateString

        If (Len(Trim(sSQL)) = 0) Then
            ValidateSQL = True
        Else

            rsTestSQL = DataServices.GetADORecordset(sSQL, oTable, _iDatabas.All(), , , , , , , lError, sErrorMessage)

            If (lError <> 0&) Then
                If (lError = -2147217865) Then
                    'sMessage = sMessage & " contains an Invalid Table Name."
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Languages.Translation("msgLabelManagerCtrlSQLStrHvInvalidTblName")
                Else
                    'sMessage = sMessage & " is Invalid."
                    Keys.ErrorType = "e"
                    Keys.ErrorMessage = Languages.Translation("msgLabelManagerCtrlSQLStatementInvalid")
                End If
                'Fail
                Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
            Else
                ValidateSQL = True
            End If

            If (Not (rsTestSQL Is Nothing)) Then
                rsTestSQL.Close()
                rsTestSQL = Nothing
            End If

            If (uSQL IsNot Nothing) Then
                uSQL = uSQL.Replace("%ID%", 0)
                uSQL = DataServices.InjectWhereIntoSQL(uSQL, "0=1")

                rsTestSQL = DataServices.GetADORecordset(uSQL, oTable, _iDatabas.All(), , , , , , , lError, sErrorMessage)

                If (lError <> 0&) Then
                    If (lError = -2147217865) Then
                        'sMessage = sMessage & " contains an Invalid Table Name."
                        Keys.ErrorType = "e"
                        Keys.ErrorMessage = Languages.Translation("msgLabelManagerCtrlSQLStrHvInvalidTblName")
                    Else
                        'sMessage = sMessage & " is Invalid."
                        Keys.ErrorType = "e"
                        Keys.ErrorMessage = Languages.Translation("msgLabelManagerCtrlSQLUpdateStrInvalid")
                    End If
                    'Fail
                    Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage
                }, JsonRequestBehavior.AllowGet)
                Else
                    ValidateSQL = True
                End If

                If (Not (rsTestSQL Is Nothing)) Then
                    rsTestSQL.Close()
                    rsTestSQL = Nothing
                End If
            End If
        End If

        If pOneStripJobs.Id > 0 Then
            Dim tempOneStripJobs = _iOneStripJob.All().Where(Function(x) x.Name.Trim.ToLower.Equals(pOneStripJobs.Name.Trim.ToLower) AndAlso x.Id <> pOneStripJobs.Id).FirstOrDefault()
            If tempOneStripJobs Is Nothing Then
                pOneStripJobs.Inprint = 0
                pOneStripJobs.UserUnits = 0
                pOneStripJobs.LastCounter = 0
                pOneStripJobs.DrawLabels = pDrawLabels
                _iOneStripJob.Update(pOneStripJobs)
                labelId = _iOneStripJob.All().Where(Function(x) x.Name.Trim.ToLower = pOneStripJobs.Name.Trim.ToLower).FirstOrDefault.Id
                Dim oOneStripJobs = _iOneStripJob.All().Where(Function(x) x.Name.Trim().ToLower().Equals(pOneStripJobs.Name.Trim().ToLower())).FirstOrDefault()
                Dim oOneStripJobFields = _iOneStripJobsField.All().Where(Function(x) x.OneStripJobsId = pOneStripJobs.Id)
                onestripjobfields = JsonConvert.SerializeObject(oOneStripJobFields, Formatting.Indented, Setting)
                onestripjobs = JsonConvert.SerializeObject(oOneStripJobs, Formatting.Indented, Setting)
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgLabelManagerCtrlLblUpdatedSuccessfully")
            Else
                Keys.ErrorType = "w"
                Keys.ErrorMessage = Languages.Translation("msgLabelManagerCtrlLblNameExists")
            End If
        Else
            Dim pOneStripJob = _iOneStripJob.All().Where(Function(x) x.Name.Trim().ToLower().Equals(pOneStripJobs.Name.Trim().ToLower())).FirstOrDefault()
            If pOneStripJob Is Nothing Then
                pOneStripJobs.Inprint = 0
                pOneStripJobs.UserUnits = 0
                pOneStripJobs.LastCounter = 0
                pOneStripJobs.DrawLabels = pDrawLabels
                _iOneStripJob.Add(pOneStripJobs)
                labelId = _iOneStripJob.All().Where(Function(x) x.Name.Trim.ToLower = pOneStripJobs.Name.Trim.ToLower).FirstOrDefault.Id
                Keys.ErrorType = "s"
                Keys.ErrorMessage = Languages.Translation("msgLabelManagerCtrlLblCreatedSuccessfully")
            Else
                labelId = Nothing
                Keys.ErrorType = "w"
            End If
        End If

        Dim tableName = pOneStripJobs.TableName.ToString()

        Dim rowCount = GetCount(tableName)

        Return Json(New With {
                    Key .errortype = Keys.ErrorType,
                    Key .message = Keys.ErrorMessage,
                    Key .onestripjob = onestripjobs,
                    Key .onestripjobfields = onestripjobfields,
                    Key .labelId = labelId,
                    Key .count = rowCount,
                    Key .barCodePrefix = oBarCodePrefix
                }, JsonRequestBehavior.AllowGet)

    End Function

    Function SetLableObjects(jsonArray As String, id As Integer) As ActionResult

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        Dim jsonObject = JsonConvert.DeserializeObject(jsonArray)

        Dim LabelObjectType = New DataTable()
        LabelObjectType.Columns.Add("Id", GetType(Integer))
        LabelObjectType.Columns.Add("OneStripJobsId", GetType(Integer))
        LabelObjectType.Columns.Add("FieldName", GetType(String))
        LabelObjectType.Columns.Add("Format", GetType(String))
        LabelObjectType.Columns.Add("Type", GetType(String))
        LabelObjectType.Columns.Add("XPos", GetType(Double))
        LabelObjectType.Columns.Add("YPos", GetType(Double))
        LabelObjectType.Columns.Add("BCStyle", GetType(Integer))
        LabelObjectType.Columns.Add("BCWidth", GetType(Double))
        LabelObjectType.Columns.Add("BCHeight", GetType(Double))
        LabelObjectType.Columns.Add("Order", GetType(Integer))
        LabelObjectType.Columns.Add("ForeColor", GetType(String))
        LabelObjectType.Columns.Add("BackColor", GetType(String))
        LabelObjectType.Columns.Add("FontSize", GetType(Double))
        LabelObjectType.Columns.Add("FontName", GetType(String))
        LabelObjectType.Columns.Add("FontBold", GetType(Boolean))
        LabelObjectType.Columns.Add("FontItalic", GetType(Boolean))
        LabelObjectType.Columns.Add("FontUnderline", GetType(Boolean))
        LabelObjectType.Columns.Add("FontStrikeThru", GetType(Boolean))
        LabelObjectType.Columns.Add("FontTransparent", GetType(Boolean))
        LabelObjectType.Columns.Add("FontOrientation", GetType(Integer))
        LabelObjectType.Columns.Add("Alignment", GetType(Integer))
        LabelObjectType.Columns.Add("BCBarWidth", GetType(Double))
        LabelObjectType.Columns.Add("BCDirection", GetType(Integer))
        LabelObjectType.Columns.Add("BCUPCNotches", GetType(Integer))
        LabelObjectType.Columns.Add("StartChar", GetType(Integer))
        LabelObjectType.Columns.Add("MaxLen", GetType(Integer))
        LabelObjectType.Columns.Add("SpecialFunctions", GetType(Integer))

        Dim OneStripJobsId = id

        For i As Integer = 0 To jsonObject.count Step 1
            If Not IsNothing(jsonObject.GetValue(i)) Then
                Dim FieldName
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("FieldName").ToString) Then
                    FieldName = jsonObject.GetValue(i).GetValue("FieldName")
                Else
                    FieldName = Nothing
                End If

                Dim Format
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("Format").ToString) Then
                    Format = jsonObject.GetValue(i).GetValue("Format")
                Else
                    Format = Nothing
                End If

                Dim Type = jsonObject.GetValue(i).GetValue("Type")
                Dim XPos = Double.Parse(jsonObject.GetValue(i).GetValue("XPos").ToString())
                Dim YPos = Double.Parse(jsonObject.GetValue(i).GetValue("YPos").ToString())


                Dim ForeColor = Nothing
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("ForeColor").ToString) Then
                    ForeColor = jsonObject.GetValue(i).GetValue("ForeColor").ToString()
                End If

                Dim BackColor = Nothing
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("BackColor").ToString) Then
                    BackColor = jsonObject.GetValue(i).GetValue("BackColor").ToString()
                End If

                Dim BCStyle
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("BCStyle").ToString) Then
                    BCStyle = Integer.Parse(jsonObject.GetValue(i).GetValue("BCStyle").ToString())
                Else
                    BCStyle = 0
                End If

                Dim BCWidth
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("BCWidth").ToString()) Then
                    BCWidth = Double.Parse(jsonObject.GetValue(i).GetValue("BCWidth").ToString())
                Else
                    BCWidth = 0
                End If

                Dim BCHeight
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("BCHeight").ToString()) Then
                    BCHeight = Double.Parse(jsonObject.GetValue(i).GetValue("BCHeight").ToString())
                Else
                    BCHeight = 0
                End If

                Dim objID
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("Id").ToString) Then
                    objID = Integer.Parse(jsonObject.GetValue(i).GetValue("Id").ToString())
                Else
                    objID = 0
                End If

                Dim fontSize
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("FontSize").ToString) Then
                    fontSize = Double.Parse(jsonObject.GetValue(i).GetValue("FontSize").ToString())
                Else
                    fontSize = 0
                End If

                Dim fontName
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("FontName").ToString) Then
                    fontName = jsonObject.GetValue(i).GetValue("FontName").ToString()
                Else
                    fontName = Nothing
                End If

                Dim fontBold = False
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("FontBold").ToString) Then
                    fontBold = Boolean.Parse(jsonObject.GetValue(i).GetValue("FontBold").ToString())
                End If

                Dim fontItalic = False
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("FontItalic").ToString) Then
                    fontItalic = Boolean.Parse(jsonObject.GetValue(i).GetValue("FontItalic").ToString())
                End If

                Dim fontUnderline = False
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("FontUnderline").ToString) Then
                    fontUnderline = Boolean.Parse(jsonObject.GetValue(i).GetValue("FontUnderline").ToString())
                End If

                Dim fontStrike = False
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("FontStrikeThru").ToString) Then
                    fontStrike = Boolean.Parse(jsonObject.GetValue(i).GetValue("FontStrikeThru").ToString())
                End If

                Dim fontTrans = False
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("FontTransparent").ToString) Then
                    fontTrans = Boolean.Parse(jsonObject.GetValue(i).GetValue("FontTransparent").ToString())
                End If

                Dim orientation
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("FontOrientation").ToString) Then
                    orientation = Integer.Parse(jsonObject.GetValue(i).GetValue("FontOrientation").ToString())
                Else
                    orientation = 0
                End If

                Dim align = Nothing
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("Alignment").ToString) Then
                    align = Integer.Parse(jsonObject.GetValue(i).GetValue("Alignment").ToString())
                End If

                Dim BCBarWidth
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("BCBarWidth").ToString) Then
                    BCBarWidth = Double.Parse(jsonObject.GetValue(i).GetValue("BCBarWidth").ToString())
                Else
                    BCBarWidth = 0
                End If

                Dim BCDirection
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("BCDirection").ToString) Then
                    BCDirection = Integer.Parse(jsonObject.GetValue(i).GetValue("BCDirection").ToString())
                Else
                    BCDirection = 0
                End If

                Dim BCUPCNotches
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("BCUPCNotches").ToString) Then
                    BCUPCNotches = Integer.Parse(jsonObject.GetValue(i).GetValue("BCUPCNotches").ToString())
                Else
                    BCUPCNotches = 0
                End If

                Dim StartChar
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("StartChar").ToString) Then
                    StartChar = Integer.Parse(jsonObject.GetValue(i).GetValue("StartChar").ToString())
                Else
                    StartChar = 0
                End If

                Dim MaxLen
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("MaxLen").ToString) Then
                    MaxLen = Integer.Parse(jsonObject.GetValue(i).GetValue("MaxLen").ToString())
                Else
                    MaxLen = 0
                End If

                Dim SpecialFunctions
                If Not String.IsNullOrEmpty(jsonObject.GetValue(i).GetValue("SpecialFunctions").ToString) Then
                    SpecialFunctions = Integer.Parse(jsonObject.GetValue(i).GetValue("SpecialFunctions").ToString())
                Else
                    SpecialFunctions = 0
                End If

                Dim Order = Integer.Parse(jsonObject.GetValue(i).GetValue("Order").ToString())

                LabelObjectType.Rows.Add(objID, OneStripJobsId, FieldName, Format, Type, XPos, YPos, BCStyle, BCWidth, BCHeight, Order, ForeColor, BackColor, fontSize, fontName, fontBold, fontItalic, fontUnderline, fontStrike, fontTrans, orientation, align, BCBarWidth, BCDirection, BCUPCNotches, StartChar, MaxLen, SpecialFunctions)
            End If
        Next

        _IDBManager.ConnectionString = Keys.GetDBConnectionString
        _IDBManager.CreateParameters(2)
        _IDBManager.AddParameters(0, "LabelObjectType", LabelObjectType)
        _IDBManager.AddParameters(1, "OneStripJobsId", OneStripJobsId)

        Dim loutput = _IDBManager.ExecuteNonQuery(System.Data.CommandType.StoredProcedure, "SP_RMS_AddEditLabelObjectDetails")
        _IDBManager.Dispose()

        Dim pOneStripJobFields = _iOneStripJobsField.All().Where(Function(x) x.OneStripJobsId = id)

        Dim oneStripJobFieldObject = JsonConvert.SerializeObject(pOneStripJobFields, Formatting.Indented, Setting)

        Return Json(New With { _
                    Key .errortype = Keys.ErrorType, _
                    Key .message = Keys.ErrorMessage, _
                        Key .oneStripJobFieldObject = oneStripJobFieldObject _
                }, JsonRequestBehavior.AllowGet)
    End Function

    Function GetAllLabelList() As ActionResult

        Dim pOneStripJob = _iOneStripJob.All().Where(Function(x) x.Inprint = 0)
        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        Dim jsonObject = JsonConvert.SerializeObject(pOneStripJob, Formatting.Indented, Setting)

        Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

    End Function

    Function GetFormList() As ActionResult

        Dim pOneStripForm = _iOneStripForms.All.Where(Function(x) x.Inprint = 0)

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        Dim jsonObject = JsonConvert.SerializeObject(pOneStripForm, Formatting.Indented, Setting)

        Return Json(jsonObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)

    End Function

    Function GetLabelDetails(name As String) As ActionResult

        Dim pOneStripJobs = _iOneStripJob.All().Where(Function(x) x.Name.Trim.ToLower = name.Trim.ToLower).FirstOrDefault()

        Dim jobsId = _iOneStripJob.All().Where(Function(x) x.Name.Trim.ToLower = name.Trim.ToLower).FirstOrDefault().Id

        Dim pOneStripJobField = _iOneStripJobsField.All().Where(Function(x) x.OneStripJobsId = jobsId)

        Dim oTable = _iTables.All().Where(Function(x) x.TableName = pOneStripJobs.TableName).FirstOrDefault()

        Dim pOneStripForm = _iOneStripForms.All().Where(Function(x) x.Id = pOneStripJobs.OneStripFormsId).FirstOrDefault()

        Dim oBarCodePrefix = ""
        Dim tableName = ""
        Dim rowCount = 0

        If Not oTable Is Nothing Then
            oBarCodePrefix = oTable.BarCodePrefix
            tableName = pOneStripJobs.TableName
            rowCount = GetCount(tableName)
        End If

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects
        Dim onestripjobfields = JsonConvert.SerializeObject(pOneStripJobField, Formatting.Indented, Setting)
        Dim onestripjobs = JsonConvert.SerializeObject(pOneStripJobs, Formatting.Indented, Setting)
        Dim onestripform = JsonConvert.SerializeObject(pOneStripForm, Formatting.Indented, Setting)

        Return Json(New With { _
                    Key .errortype = Keys.ErrorType, _
                    Key .message = Keys.ErrorMessage, _
                    Key .onestripjob = onestripjobs, _
                    Key .onestripform = onestripform, _
                    Key .barCodePrefix = oBarCodePrefix, _
                    Key .count = rowCount, _
                    Key .onestripjobfields = onestripjobfields _
                }, JsonRequestBehavior.AllowGet)

    End Function


    Function DeleteLable(name As String) As ActionResult
        Try
            Dim pOneStripJob = _iOneStripJob.All().Where(Function(x) x.Name.Trim().ToLower().Equals(name.Trim().ToLower())).FirstOrDefault()

            Dim jobsId = _iOneStripJob.All().Where(Function(x) x.Name.Trim.ToLower = name.Trim.ToLower).FirstOrDefault().Id

            Dim pOneStripJobField = _iOneStripJobsField.All().Where(Function(x) x.OneStripJobsId = jobsId)

            _iOneStripJob.Delete(pOneStripJob)

            _iOneStripJobsField.DeleteRange(pOneStripJobField)

            Keys.ErrorType = "s"
            Keys.ErrorMessage = Languages.Translation("msgLabelManagerCtrlLblDeletedSuccessfully")
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = Keys.ErrorMessageJS()
        End Try

        Return Json(New With { _
                Key .errortype = Keys.ErrorType, _
                Key .message = Keys.ErrorMessage _
            }, JsonRequestBehavior.AllowGet)

    End Function

    Function CreateSQLString(tableName As String) As ActionResult

        Dim pTable = _iTables.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(tableName.Trim().ToLower()) AndAlso Not String.IsNullOrEmpty(x.DBName.Trim().ToLower())).FirstOrDefault()
        Dim dbManager As New DBManager

        Dim pDatabaseEntity = Nothing
        If Not pTable Is Nothing Then
            pDatabaseEntity = _iDatabas.Where(Function(x) x.DBName.Trim().ToLower().Equals(pTable.DBName.Trim().ToLower())).FirstOrDefault()
            dbManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)
        Else
            dbManager.ConnectionString = Keys.GetDBConnectionString
        End If

        Dim sSql = "SELECT * FROM [" + tableName + "]"
        Dim loutput = dbManager.ExecuteDataSetWithSchema(System.Data.CommandType.Text, sSql)

        Dim pColumn = Nothing

        If loutput.Tables(0).PrimaryKey.Length = 0 Then
            For i As Integer = 0 To loutput.Tables(0).Columns.Count - 1 Step 1
                If loutput.Tables(0).Columns(i).Caption.Trim().ToLower().Equals("id") Then
                    pColumn = loutput.Tables(0).Columns(i).Caption
                End If

                If pColumn Is Nothing And loutput.Tables(0).Columns.Count > 0 Then
                    pColumn = loutput.Tables(0).Columns(0).Caption
                End If
            Next
        Else
            pColumn = loutput.Tables(0).PrimaryKey(0).ToString
        End If

        Dim SQLString

        If pColumn Is Nothing Then
            SQLString = "SELECT [" + tableName + "].* FROM [" + tableName + "]" ' WHERE " + tableName + "." + pColumn + " = '%ID%'"
        Else
            SQLString = "SELECT [" + tableName + "].* FROM [" + tableName + "] WHERE " + tableName + "." + pColumn + " = '%ID%'"
        End If

        Return Json(New With {Key .value = SQLString, _
                                Key .errortype = Keys.ErrorType, _
                                  Key .message = Keys.ErrorMessage _
                                      }, JsonRequestBehavior.AllowGet)

    End Function

    Function GetCount(tableName As String) As Integer
        Dim pTable = _iTables.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(tableName.Trim().ToLower()) AndAlso Not String.IsNullOrEmpty(x.DBName.Trim().ToLower())).FirstOrDefault()
        Dim dbManager As New DBManager

        Dim pDatabaseEntity = Nothing
        If Not pTable Is Nothing Then
            pDatabaseEntity = _iDatabas.Where(Function(x) x.DBName.Trim().ToLower().Equals(pTable.DBName.Trim().ToLower())).FirstOrDefault()
            dbManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)
        Else
            dbManager.ConnectionString = Keys.GetDBConnectionString
        End If

        Dim countQuery = "SELECT COUNT(1) FROM " + tableName
        Dim loutput = dbManager.ExecuteScalar(System.Data.CommandType.Text, countQuery)
        Return CInt(loutput)
    End Function

    Function GetNextRecord(rowNo As Integer, tableName As String, SQL_String As String) As ActionResult
        Dim pTable = _iTables.All().Where(Function(x) x.TableName.Trim().ToLower().Equals(tableName.Trim().ToLower()) AndAlso Not String.IsNullOrEmpty(x.DBName.Trim().ToLower())).FirstOrDefault()
        Dim dbManager As New DBManager

        Dim pDatabaseEntity = Nothing
        If Not pTable Is Nothing Then
            pDatabaseEntity = _iDatabas.Where(Function(x) x.DBName.Trim().ToLower().Equals(pTable.DBName.Trim().ToLower())).FirstOrDefault()
            dbManager.ConnectionString = Keys.GetDBConnectionString(pDatabaseEntity)
        Else
            dbManager.ConnectionString = Keys.GetDBConnectionString
        End If

        Dim finalSQL = SQL_String.Split(New String() {"WHERE"}, StringSplitOptions.None)(0)

        'Dim countQuery As String = "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER (ORDER BY (SELECT '')) AS  RowNum FROM " + tableName + " ) T1 WHERE T1.RowNum = " + rowNo.ToString()

        Dim countQuery As String = "Select * from (SELECT ROW_NUMBER() OVER (ORDER BY (SELECT '')) AS  RowNum, " + finalSQL.Substring(7) + ") T1 WHERE T1.RowNum = " + rowNo.ToString()

        Dim loutput
        Try
            loutput = dbManager.ExecuteDataSet(System.Data.CommandType.Text, countQuery)
        Catch ex As Exception
            loutput = Nothing
        End Try

        Dim Setting = New JsonSerializerSettings
        Setting.PreserveReferencesHandling = PreserveReferencesHandling.Objects

        Dim rowData = Nothing
        If Not loutput Is Nothing Then
            rowData = JsonConvert.SerializeObject(loutput.Tables(0), Formatting.Indented, Setting)
        Else
            rowData = "[]"
        End If


        Return Json(New With { _
                    Key .errortype = Keys.ErrorType, _
                    Key .message = Keys.ErrorMessage, _
                    Key .rowdata = rowData _
                }, JsonRequestBehavior.AllowGet)

    End Function

    Public Function SetAsDefault(oneStripJobsId As Integer, oneStripFormsId As Integer) As ActionResult

        Try
            Dim oONeStripJobs = _iOneStripJob.All().Where(Function(x) x.Id = oneStripJobsId).FirstOrDefault()
            Dim oOneStripForms = _iOneStripForms.All().Where(Function(x) x.Id = oneStripFormsId).FirstOrDefault()

            oONeStripJobs.OneStripFormsId = oneStripFormsId
            oONeStripJobs.LabelHeight = oOneStripForms.LabelHeight
            oONeStripJobs.LabelWidth = oOneStripForms.LabelWidth

            _iOneStripJob.Update(oONeStripJobs)
            Keys.ErrorType = "s"
            Keys.ErrorMessage = ""
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ""
        End Try

        Return Json(New With { _
                Key .errortype = Keys.ErrorType, _
                Key .message = Keys.ErrorMessage _
            }, JsonRequestBehavior.AllowGet)

    End Function

End Class