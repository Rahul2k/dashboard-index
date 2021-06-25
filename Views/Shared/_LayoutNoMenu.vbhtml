<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>@ViewData("Title") - TAB FusionRMS</title>
    <link href="@Url.Content("~/Images/TabFusion.ico")" rel="shortcut icon" type="image/x-icon" />
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,400italic,300" rel="stylesheet" type="text/css">
    <link href="@Url.Content("~/Content/themes/TAB/css/custom.css")" rel="stylesheet" />
    @Styles.Render("~/Styles/css")
    @Scripts.Render("~/bundles/jQuery")
    @Scripts.Render("~/bundles/masterjs")
    @Scripts.Render("~/bundles/modernizr")

    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            $('.divMenu #mCSB_1_container .l_drillDownWrapper').each(function (index, value) {
                if ($(this).children().length == 1) {
                    $(this).remove();
                }
            });
            
            $('#hlAboutUs').click(function(){                    
                $.ajax({
                    type: "POST",
                    url: 'Admin/OpenAboutUs',                    
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",                        
                    async: false,
                    success: function (response) { 
                        var msg = response;                                                    
                        $('#divAboutInfo').html(msg);
                        $('#dialog-form-AboutUs').modal('show');
                        $("#dialog-form-AboutUs .modal-dialog").draggable({ disabled: true });
                    },
                    failure: function(response) {
                        return false;
                    }
                });
            });
        });

        window.onfocus = function () {
            if (getCookie("Islogin") == "False") {
                window.location.href = window.location.origin + "/signin.aspx?out=1"
            }
            if (getCookie("lastUsername").toLowerCase() != ($("#lblLoginUserName").html() !=undefined? $("#lblLoginUserName").html().toLowerCase().trim():$("#lblLoginUserName").html())) {
                window.location.reload();
            }
        };

        var urls = {
            Admin: {
                DefaultPage: '@Url.Action("Index", "Admin")'
            },
            Common: {
                SetCulture: '@Url.Action("SetCulture", "Common")',
                GetTableListLabel: '@Url.Action("GetTableListLabel","Common")',
                GetColumnList: '@Url.Action("GetColumnList", "Common")',
                GetFontFamilies: '@Url.Action("GetFontFamilies", "Common")'
            },
            Security: {
                CheckModuleLevelAccess: '@Url.Action("CheckModuleLevelAccess", "Admin")'
            },
            LabelManager: {
                Index: '@Url.Action("Index", "LabelManager")',
                GetFirstValue: '@Url.Action("GetFirstValue", "LabelManager")',
                AddLabel: '@Url.Action("AddLabel", "LabelManager")',
                SetLableObjects: '@Url.Action("SetLableObjects", "LabelManager")',
                GetAllLabelList: '@Url.Action("GetAllLabelList", "LabelManager")',
                GetLabelDetails: '@Url.Action("GetLabelDetails", "LabelManager")',
                LoadAddEditLabel: '@Url.Action("LoadAddEditLabel", "LabelManager")',
                DeleteLable: '@Url.Action("DeleteLable", "LabelManager")',
                GetFormList: '@Url.Action("GetFormList", "LabelManager")',
                CreateSQLString: '@Url.Action("CreateSQLString", "LabelManager")',
                GetNextRecord: '@Url.Action("GetNextRecord", "LabelManager")',
                SetAsDefault: '@Url.Action("SetAsDefault", "LabelManager")'
            },
            Import: {
                SendFileContent: '@Url.Action("SendFileContent","Import")',
                GetImportDDL: '@Url.Action("GetImportDDL","Import")',
                GetGridDataFromFile: '@Url.Action("GetGridDataFromFile","Import")',
                ConvertDataToGrid: '@Url.Action("ConvertDataToGrid","Import")',
                GetDestinationDDL: '@Url.Action("GetDestinationDDL","Import")',
                GetAvailableField: '@Url.Action("GetAvailableField","Import")',
                ValidateOnMoveClick: '@Url.Action("ValidateOnMoveClick", "Import")',
                RemoveOnClick: '@Url.Action("RemoveOnClick", "Import")',
                ReorderImportField: '@Url.Action("ReorderImportField","Import")',
                GetPropertyByType: '@Url.Action("GetPropertyByType","Import")',
                SaveImportProperties: '@Url.Action("SaveImportProperties","Import")',
                CloseAllObject: '@Url.Action("CloseAllObject","Import")',
                LoadTabInfoDDL: '@Url.Action("LoadTabInfoDDL","Import")',
                @*ValidateLoadName: '@Url.Action("ValidateLoadName", "Import")',*@
                GetImportLoadData: '@Url.Action("GetImportLoadData","Import")',
                ValidateTrackingField: '@Url.Action("ValidateTrackingField","Import")',
                SubmitImportData: '@Url.Action("SubmitImportData","Import")',
                CheckIfInUsed: '@Url.Action("CheckIfInUsed", "Import")',
                RemoveImportLoad: '@Url.Action("RemoveImportLoad","Import")',
                @*GetImportJob: '@Url.Action("GetImportJob","Import")',*@
                @*GetAllImportLoad: '@Url.Action("GetAllImportLoad","Import")',*@
                @*AddJobInTempData: '@Url.Action("AddJobInTempData","Import")',*@
                @*SendJobFileContent: '@Url.Action("SendJobFileContent","Import")',*@
                SetJobInfo: '@Url.Action("SetJobInfo","Import")',
                SaveImportLoadOnConfrim: '@Url.Action("SaveImportLoadOnConfrim","Import")',
                @*DisplayFileNameOnRun: '@Url.Action("DisplayFileNameOnRun","Import")',*@
                @*ProcessLoad: '@Url.Action("ProcessLoad", "Import")',*@
                ShowLogFiles: '@Url.Action("ShowLogFiles","Import")',
                @*RemoveLoadFromJobList: '@Url.Action("RemoveLoadFromJobList","Import")',*@
                @*GetLoadFromJob: '@Url.Action("GetLoadFromJob","Import")',*@
                FillOutputSetting: '@Url.Action("FillOutputSetting","Import")',
                AttachImages: '@Url.Action("AttachImages","Import")',
                SetTrackingInfo: '@Url.Action("SetTrackingInfo","Import")',
                SetImageInfo: '@Url.Action("SetImageInfo","Import")',
                ValidateLoadOnEdit: '@Url.Action("ValidateLoadOnEdit","Import")',
                @*UploadFileOnRun: '@Url.Action("UploadFileOnRun","Import")',*@
                @*GetCurrentLoadFileName: '@Url.Action("GetCurrentLoadFileName", "Import")',*@
                ProcessLoadForQuietProcessing:'@Url.Action("ProcessLoadForQuietProcessing", "Import")',
                UploadFileAndRunLoad:'@Url.Action("UploadFileAndRunLoad", "Import")',
                UploadSingleFile: '@Url.Action("UploadSingleFile", "Import")'
            },
            BackgroundStatus:{
                GetBackgroundStatusList: '@Url.Action("GetBackgroundStatusList", "BackgroundStatus")'
            }
        }
        var vTimeOutSecounds = @ViewBag.TimeOutSecounds * 1000;
        var vAutoRedirectURL = '@ViewBag.AutoRedirectURL';
        var time = new Date().getTime();
        //Fixed : FUS-4617
        $(document).bind("mousemove keypress",'body', function (e) {
            time = new Date().getTime();
        });
        function refresh() {
            if (new Date().getTime() - time >= vTimeOutSecounds)
                window.location.href=vAutoRedirectURL;
            else
                setTimeout(refresh, 30000);
        }
        setTimeout(refresh, 30000);
    </script>

    <style type="text/css">
        .content-wrapper, .right-side, .main-footer {
            margin-left: 0px !important;
            z-index: 820;
        }

        .sidebar-toggle {
            position: absolute;
            z-index: 11;
            right: -15px;
            height: 100%;
            background: #404040;
            width: 15px;
        }

        #left-panel-arrow {
            vertical-align: middle;
            color: #ffffff;
            position: relative;
            top: 40%;
            bottom: 60%;
            padding-left: 4px;
            font-size: 15px;
        }
    </style>
</head>

<body>
    <div id="ajaxloading" class="loaderMain-wrapper">
        <div class="loaderMain-admin"></div>
    </div>
    <input id="hdnRefInfo" type="hidden" />
    <div class="wrapper">
        <header class="main-header" style="z-index:999;">
            <nav class="navbar navbar-defaultLabel navbar-fixed-top tab-nave" role="navigation">
                <div class="container-fluid">

                    <a id="aLogo" class="logo navbar-brand" href="/"><img src="@Url.Content("~/Images/logo.png")" class="img-responsive" /></a>
                    <div class="navbar-custom-menu pull-left" id="importSetup"></div>
                    <div class="navbar-custom-menu pull-left scanmenu"></div>
                    <span style="visibility:hidden" id="lblLoginUserName">@TabFusionRMS.WebVB.Keys.CurrentUserName</span>
                    @*<div class="pull-right">
                    <div class="admin_dropdown">
                        <a class="btn btn-inv dropdown-toggle theme_color" href="/logout.aspx">
                            <i class="fa fa-sign-out"></i>
                            @Languages.Translation("mnuSignOut")
                        </a>
                    </div>
                </div>*@
                    <div class="collapse navbar-collapse navbar-right tab-menu" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li>
                                <a id="hlHome" href="~/Data.aspx">@Languages.Translation("Home")</a>
                            </li>
                            <li>
                                <a id="hlHelp" href="help/Default.htm" target="Help">@Languages.Translation("Help")</a>
                            </li>
                            <li>
                                <a id="hlAboutUs">@Languages.Translation("About")</a>
                            </li>
                            <li>
                                <a id="hlSignout" href="/logout.aspx">@Languages.Translation("SignOut")</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <div class="content-wrapper1" style="padding-left: 15px; margin-top: 70px; margin-bottom: 43px; min-height:0px !important ; overflow-x:hidden; padding-right:15px;">
            <div class="container-fluid">
                @*@RenderSection("featured", required:=False)*@
                @RenderBody()
            </div>
        </div>
        <footer class="main-footer visible-md visible-lg" style="position: fixed; bottom: 0px;">
            <div class="row">
                <div class="col-lg-12">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 no_padding">
                        <span class="pull-left footer-text footer-box-gap"><i class="fa fa-server" style="width: 15px"></i>@Languages.Translation("lblMainSERVER") <br> @TabFusionRMS.WebVB.Keys.ServerName</span>
                        <span class="pull-left footer-text footer-box-gap"><i class="fa fa-database" style="width: 15px"></i>@Languages.Translation("lblMainDATABASE") <br> @TabFusionRMS.WebVB.Keys.DatabaseName</span>
                        <span class="pull-left footer-text footer-box-gap"><i class="fa fa-user" style="width: 15px"></i>@Languages.Translation("lblMainUser")  <br> @TabFusionRMS.WebVB.Keys.CurrentUserName </span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 footer-copyright-text text-right">
                        @String.Format(Languages.Translation("Copyright"), DateTime.Now.ToUniversalTime.Year, ViewContext.Controller.GetType().Assembly.GetName().Version.ToString())
                    </div>
                </div>
            </div>
        </footer>
    </div>
    <div class="form-horizontal" id="divAboutInfo">
    </div>   
    @RenderSection("scripts", required:=False)
</body>
</html>