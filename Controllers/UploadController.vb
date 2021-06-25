Imports TabFusionRMS.Models
Imports TabFusionRMS.RepositoryVB
Imports System.IO
Imports System.Reflection

Public Class UploadController
    Inherits BaseController

    Private Property _iOutputSetting As IRepository(Of OutputSetting)
    Private Property _iTable As IRepository(Of Table)
    Private Property _iVolume As IRepository(Of Volume)
    Private Property _iSystemAddress As IRepository(Of SystemAddress)

    Public Sub New(
                        iSystem As IRepository(Of Models.System),
                        iOutputSetting As IRepository(Of OutputSetting),
                        iVolume As IRepository(Of Volume),
                        iSystemAddress As IRepository(Of SystemAddress),
                        iTable As IRepository(Of Table)
                        )


        MyBase.New()
        _iOutputSetting = iOutputSetting
        _iTable = iTable
        _iVolume = iVolume
        _iSystemAddress = iSystemAddress
    End Sub

    Function Index() As ActionResult

        Dim lOutputSettings = _iOutputSetting.All()
        Dim lTableEntities = _iTable.All()

        ViewBag.OutputSettingsList = lOutputSettings.Where(Function(x) x.InActive = False).CreateSelectList("Id", "Id", Nothing)
        ViewBag.TablesList = lTableEntities.Where(Function(x) x.Attachments = True).CreateSelectList("TableName", "UserName", Nothing)

        Return View()
    End Function

    Function AttachDocument(ByVal pTableName As String, ByVal pTableId As String, ByVal pOutPutSetting As String) As ActionResult
        If Session("fileName") Is Nothing AndAlso String.IsNullOrEmpty(pTableName) AndAlso String.IsNullOrEmpty(pTableId) AndAlso String.IsNullOrEmpty(pOutPutSetting) Then
            Return Json(New With { _
                    Key .errortype = "e", _
                    Key .message = Keys.ErrorMessageJS() _
                }, JsonRequestBehavior.AllowGet)
        End If
        Try

            Dim oOutputSettings = _iOutputSetting.All().Where(Function(x) x.Id.Trim().ToLower().Equals(pOutPutSetting.Trim().ToLower())).FirstOrDefault()
            If oOutputSettings Is Nothing Then
                Return Json(New With {Key .errortype = "w", Key .message = Languages.Translation("msgUploadControllerInvalidDirPath")}, JsonRequestBehavior.AllowGet)
            End If
            Dim oVolumns = _iVolume.All().Where(Function(x) x.Id = oOutputSettings.VolumesId).FirstOrDefault()
            If oVolumns Is Nothing Then
                Return Json(New With {Key .errortype = "w", Key .message = Languages.Translation("msgUploadControllerInvalidDirPath")}, JsonRequestBehavior.AllowGet)
            End If
            Dim oSystemAddress = _iSystemAddress.All().Where(Function(x) x.Id = oVolumns.SystemAddressesId).FirstOrDefault()
            If oSystemAddress Is Nothing Then
                Return Json(New With {Key .errortype = "w", Key .message = Languages.Translation("msgUploadControllerInvalidDirPath")}, JsonRequestBehavior.AllowGet)
            End If

            If Not System.IO.Directory.Exists(oSystemAddress.PhysicalDriveLetter) Then
                Return Json(New With {Key .errortype = "w", Key .message = Languages.Translation("msgUploadControllerInvalidDirPath")}, JsonRequestBehavior.AllowGet)
            End If

            Dim pFileName = Session("fileName").ToString()
            Dim BaseWebPageMain = New BaseWebPage()

            Dim filepath = Path.GetTempPath() + pFileName  'Environment.GetFolderPath(Environment.SpecialFolder.Windows) + "\Temp\" + pFileName

            If Not System.IO.File.Exists(filepath) Then
                filepath = Environment.GetFolderPath(Environment.SpecialFolder.Windows) + "\Temp\" + pFileName
            End If


            If Not System.IO.File.Exists(filepath) Then
                Return Json(New With { _
                    Key .errortype = "e", _
                    Key .message = Languages.Translation("msgUploadControllerFilenExiOnPath") _
                }, JsonRequestBehavior.AllowGet)
            End If


            Dim ticket = BaseWebPageMain.Passport.CreateTicket(String.Format("{0}\{1}", Session("Server").ToString, Session("databaseName").ToString), pTableName, pTableId).ToString()

            Dim attach As Smead.RecordsManagement.Imaging.Attachment = Smead.RecordsManagement.Imaging.Attachments.AddAttachment(ticket, BaseWebPageMain.Passport.UserId, String.Format("{0}\{1}", _
                                                                            Session("Server").ToString, Session("databaseName").ToString), pTableName, pTableId, 0, _
                                                                        pOutPutSetting, _
                                                                        filepath, _
                                                                        filepath, _
                                                                        System.IO.Path.GetExtension(pFileName), False, String.Empty)
            Session.Remove("fileName")
            If System.IO.File.Exists(filepath) Then
                System.IO.File.Delete(filepath)
            End If
            Keys.ErrorType = "s"
            Keys.ErrorMessage = Languages.Translation("msgUploadControllerDocAttachSucc") 'DirectCast(attach, Smead.RecordsManagement.Imaging.ErrorAttachment).Message 
            Exit Try
        Catch ex As Exception
            Keys.ErrorType = "e"
            Keys.ErrorMessage = ex.Message.ToString()
        End Try
        
        Return Json(New With { _
                    Key .errortype = Keys.ErrorType, _
                    Key .message = Keys.ErrorMessage _
                }, JsonRequestBehavior.AllowGet)
    End Function

End Class