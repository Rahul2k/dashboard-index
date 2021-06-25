Imports Newtonsoft.Json.Linq
Imports System.Web.Http
Imports System.Linq
Imports System.Resources
Imports System.Globalization
Imports System.ServiceModel
Imports System.Configuration
Imports System.Text
Imports System.Collections.ObjectModel
Imports System.Collections.Generic
Imports System.Dynamic
Imports TabFusionRMS.Resource
Imports System.Collections
Namespace TABFusionRMS.Web.Controllers
    Public Class ResourceController
        Inherits BaseController
        <HttpGet>
        Public Function GetMobileResources(moduleName As Languages.ResModule) As Object
            Try
                Dim resouceObject As Dictionary(Of String, String)
                resouceObject = Languages.GetValuesByModule(moduleName)

                '#Region "Add keys in Dictionary"
                Dim resourceSetCommon As New Dictionary(Of String, String)
                resourceSetCommon = Languages.GetValuesByModule(Languages.ResModule.common)

                For Each resource As Object In resourceSetCommon
                    If (Not resouceObject.ContainsKey(resource.Key)) Then
                        resouceObject.Add(resource.Key, resource.Value)
                    End If
                Next
                '#End Region
                'Return resouceObject
                Response.BufferOutput = True
                Return Json(resouceObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
            Catch e As Exception
                Throw e
            End Try
        End Function

        <HttpGet>
        Public Function GetResources(moduleName As Languages.ResModule) As ActionResult
            Try
                Dim resouceObject As New Dictionary(Of String, String)

                If moduleName = Languages.ResModule.all Then
                    Dim resObjApplication As New Dictionary(Of String, String)
                    Dim resObjClients As New Dictionary(Of String, String)
                    Dim resObjData As New Dictionary(Of String, String)
                    Dim resObjDatabase As New Dictionary(Of String, String)
                    Dim resObjDirectories As New Dictionary(Of String, String)
                    Dim resObjImport As New Dictionary(Of String, String)
                    Dim resObjLabelmanager As New Dictionary(Of String, String)
                    Dim resObjReports As New Dictionary(Of String, String)
                    Dim resObjRetention As New Dictionary(Of String, String)
                    Dim resObjScanner As New Dictionary(Of String, String)
                    Dim resObjSecurity As New Dictionary(Of String, String)
                    Dim resObjTables As New Dictionary(Of String, String)
                    Dim resObjViews As New Dictionary(Of String, String)
                    Dim resObjCommon As New Dictionary(Of String, String)
                    Dim resObjHtmlViewer As New Dictionary(Of String, String)

                    resObjApplication = Languages.GetValuesByModule(Languages.ResModule.application)
                    resObjClients = Languages.GetValuesByModule(Languages.ResModule.clients)
                    resObjData = Languages.GetValuesByModule(Languages.ResModule.data)
                    resObjDatabase = Languages.GetValuesByModule(Languages.ResModule.database)
                    resObjDirectories = Languages.GetValuesByModule(Languages.ResModule.directories)
                    resObjImport = Languages.GetValuesByModule(Languages.ResModule.import)
                    resObjLabelmanager = Languages.GetValuesByModule(Languages.ResModule.labelmanager)
                    resObjReports = Languages.GetValuesByModule(Languages.ResModule.reports)
                    resObjRetention = Languages.GetValuesByModule(Languages.ResModule.retention)
                    resObjScanner = Languages.GetValuesByModule(Languages.ResModule.scanner)
                    resObjSecurity = Languages.GetValuesByModule(Languages.ResModule.security)
                    resObjTables = Languages.GetValuesByModule(Languages.ResModule.tables)
                    resObjViews = Languages.GetValuesByModule(Languages.ResModule.views)
                    resObjCommon = Languages.GetValuesByModule(Languages.ResModule.common)
                    resObjHtmlViewer = Languages.GetValuesByModule(Languages.ResModule.htmlviewer)
                    Return Json(New With {
                                            Key .resApp = resObjApplication,
                                            Key .resClient = resObjClients,
                                            Key .resData = resObjData,
                                            Key .resDatabase = resObjDatabase,
                                            Key .resDirectories = resObjDirectories,
                                            Key .resImport = resObjImport,
                                            Key .resLabelmanager = resObjLabelmanager,
                                            Key .resReports = resObjReports,
                                            Key .resRetention = resObjRetention,
                                            Key .resScanner = resObjScanner,
                                            Key .resSecurity = resObjSecurity,
                                            Key .resTables = resObjTables,
                                            Key .resViews = resObjViews,
                                            Key .resCommon = resObjCommon,
                                            Key .resHTMLViewer = resObjHtmlViewer
                                        }, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
                Else
                    resouceObject = Languages.GetValuesByModule(moduleName)
                    Return Json(resouceObject, "application/json; charset=utf-8", JsonRequestBehavior.AllowGet)
                End If
            Catch e As Exception
                Throw e
            End Try
        End Function
    End Class
End Namespace