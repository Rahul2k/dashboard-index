Imports System.Collections.Generic
Imports System.Diagnostics
Imports System.Linq
Imports System.Net
Imports System.Net.Http
Imports System.Web.Http

Imports Leadtools

Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Exceptions
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Helpers
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Model
Imports TabFusionRMS.WebVB.TABFusionRMS.Web.Tool.Model.Test
Imports System.Runtime.Serialization

Namespace TABFusionRMS.Web.Controllers
    ''' <summary>
    ''' Used with the DocumentFactory class of the LEADTOOLS Documents JavaScript library.
    ''' </summary>
    Public Class TestController
        Inherits ApiController
        ' This Ping() method is used to detect that everything is working fine
        '       * before a demo begins. Otherwise, errors from loading the initial document
        '       * may tell the wrong story because the user hasn't set up the service yet.
        '       


        ''' <summary>
        '''   Pings the service to ensure a connection, returning data about the status of the LEADTOOLS license.
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA1801:ReviewUnusedParameters", MessageId:="request")>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The service is not available", MethodName:="VerifyService")>
        <HttpPost, HttpGet>
        Public Function Ping(<FromBody> request As Request) As PingResponse
            Trace.WriteLine("Leadtools Documents Service: Ready")

            Dim response As PingResponse = New PingResponse()
            response.Message = "Ready"
            response.Time = DateTime.Now

            Trace.WriteLine("Getting Toolkit status")
            response.IsLicenseChecked = ServiceHelper.IsLicenseChecked
            response.IsLicenseExpired = ServiceHelper.IsKernelExpired
            If response.IsLicenseChecked Then
                response.KernelType = RasterSupport.KernelType.ToString().ToUpper()
            Else
                response.KernelType = Nothing
            End If

            Try
                ServiceHelper.CheckCacheAccess()
                response.IsCacheAccessible = True
            Catch generatedExceptionName As Exception
                response.IsCacheAccessible = False
            End Try

            ' Add OCR Status
            response.OcrEngineStatus = CInt(ServiceHelper.OcrEngineStatus)

            Return response
        End Function

        ' Modify and return user data
        ''' <summary>
        ''' A test method, not used, to show the use of "userData".
        ''' </summary>
        <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")>
        <ServiceErrorAttribute(Message:="The user data could not be accessed")>
        <HttpPost>
        Public Function CheckUserData(request As Request) As Response
            Dim userData As Object = request.UserData
            Dim newUserData As Object = New ReturnUserDataObject() With {
               .Data = userData,
               .Message = "Welcome to the Documents Service: " & DateTime.Now.ToLongTimeString()
            }
            Return New Response() With {
               .UserData = newUserData
            }
        End Function

        <DataContract>
        Friend Class ReturnUserDataObject
            <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")>
            <DataMember>
            Public Property Data() As Object
                Get
                    Return m_Data
                End Get
                Set
                    m_Data = Value
                End Set
            End Property
            Private m_Data As Object

            <System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")>
            <DataMember>
            Public Property Message() As String
                Get
                    Return m_Message
                End Get
                Set
                    m_Message = Value
                End Set
            End Property
            Private m_Message As String
        End Class
    End Class
End Namespace