<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>@Languages.Translation("tiBarcodeTracking") - TAB FusionRMS</title>
    <link href="@Url.Content("~/Images/TabFusion.ico")" rel="shortcut icon" type="image/x-icon" />
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,400italic,300" rel="stylesheet" type="text/css">
    <link href="@Url.Content("~/Content/themes/TAB/css/custom.css")" rel="stylesheet" />
    @Styles.Render("~/Styles/css")
    <link href="~/Content/themes/TAB/css/jquery.mCustomScrollbar.css" rel="stylesheet" />

    <script type="text/javascript" src="~/Content/themes/TAB/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="~/Content/themes/TAB/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="~/Content/themes/TAB/js/jquery-ui-1.10.4.custom.js"></script>
    <script src="~/Content/themes/TAB/js/jquery.mCustomScrollbar.js"></script>
    <script src="~/Content/themes/TAB/js/jquery.mousewheel.min.js"></script>
    <script src="~/Content/themes/TAB/js/jquery-cookie-plugin.js"></script>
    <script src="~/Content/themes/TAB/js/globalizeDateFormat.js"></script>
    @*<link href="@Url.Content("~/Content/themes/TAB/css/jsTreeThemes/style.min.css")" rel="stylesheet" />
    @Styles.Render("~/Styles/css")
    @Scripts.Render("~/bundles/jQuery")
    @Scripts.Render("~/bundles/masterjs")
    @Scripts.Render("~/bundles/modernizr")*@
    
    
    <script src="~/Scripts/AppJs/Barcodetracker.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $(".divMenu").mCustomScrollbar();

            $('#hlAboutUs').click(function () {
                $.ajax({
                    type: "POST",
                    url: '../Admin/OpenAboutUs',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (response) {
                        var msg = response;
                        $('#divAboutInfo').html(msg);
                        $('#dialog-form-AboutUs').modal('show');
                        $("#dialog-form-AboutUs .modal-dialog").draggable({ disabled: true });
                    },
                    failure: function (response) {
                        return false;
                    }
                });
            });
        });
    </script>
    <style type="text/css">
        /*.sidebar-toggle {
            position: absolute;
            z-index: 11;
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

        ul {
            list-style-type: none;
        }

        .main-title {
            font-size: 14px;
            text-transform: capitalize;
            padding-bottom: 13px;
            border-bottom: 1px dashed #dfdfdf;
            font-weight: 600;
            margin-bottom: 25px;
        }

        .main-sidebar {
            padding-right: 5px;
        }

        .sidebar-menu, .divMenu {
            list-style: none;
            margin: 0;
            padding: 0;
            cursor: pointer;
            height: 89vh;
            overflow: auto;
        }*/

    </style>
</head>

<body>
    <input type="hidden" id="hdnHomeVal" value="@Languages.Translation("mnuAdminHome")" />
    @*<div id="ajaxloading" class="loaderMain-wrapper">
            <div class="loaderMain-admin"></div>
        </div>*@
    @*<div id="divmenuloader" class="loaderMain-wrapper">
            <div class="loaderMain-admin" style="left: 6.5% !important"></div>
        </div>*@
    <input id="hdnRefInfo" type="hidden" />
    <div class="container-fluid">
        <header class="main-header" style="z-index:999; background:white;">
            <nav class="navbar navbar-default navbar-fixed-top tab-nave" role="navigation">
                <div class="container-fluid">
                    <a id="aLogo" class="logo navbar-brand" href="/"><img src="/Images/logo.png" class="img-responsive"></a>
                    @*<div class="navbar-custom-menu pull-left scanmenu"></div>*@
                    <div class="collapse navbar-collapse navbar-right tab-menu" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li>
                                <a id="hlHome" href="~/Data.aspx">@Languages.Translation("Home")</a>
                            </li>
                            <li>
                                <a id="hlHelp" href="~/help/Default.htm" target="Help">@Languages.Translation("Help")</a>
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
            <div class="container-fluid">
                <div class="row" style="margin-top: 78px;border-bottom: 1px dashed #dfdfdf;">
                    <span class="barcodeTrackingText">
                        <img src="/images/Bar-code.gif" alt="Bar-code Image" class="img-responsive pull-left">
                        <span class="barCodeTitle">@Languages.Translation("tiBarcodeTracking").ToUpper()</span>
                    </span>
                </div>
            </div>
        </header>

        @*<header class="main-header" style="z-index:999; background:white;">
            <nav class="navbar navbar-fixed-top" role="navigation">
                <div class="container-fluid">
                    <a id="aLogo" class="logo navbar-brand" href="/"><img src="@Url.Content("~/Images/logo.png")" class="img-responsive" /></a>
                    <div class="navbar-custom-menu pull-left scanmenu"></div>
                    <div class="pull-right">
                        <div class="dropdown admin_dropdown">
                            <span class="barcodeTrackingText">
                                <img src="~/images/Bar-code.gif" alt="Bar-code Image" class="img-responsive pull-left" />
                                <span class="barCodeTitle">@Languages.Translation("tiBarcodeTracking").ToUpper()</span>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </header>*@

        <aside class="main-sidebar" style="position:fixed;margin-top: 54px;">
            <a href="#menu-toggle" class="sidebar-toggle" id="menu-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">@Languages.Translation("ToggleNavigation")</span>
                <i class="fa fa-caret-left" id="left-panel-arrow"></i>
            </a>

            <section class="sidebar divMenu">
                <div class="col-sm-12">
                    <div class="form-group ">
                        <h2 class="trackableItemInfo" style="margin-top: 30px;">@Languages.Translation("lblBarCodeTrackingDestContainer")</h2>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group ">
                        <label for="lblBarcode">@Languages.Translation("lblBarCodeTrackingDestinationBarcode"):</label>
                        <div class="barcodeBox">
                            <input type="text" ID="txtDestination" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group ">
                        <label for="lblDescription">@Languages.Translation("Description"):</label>
                        <div class="barcodeBox" style="border: 1px solid #c6c6c6; min-height:50px">
                            <label ID="lblDestination" Text=""></label>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="form-group ">
                        <label for="lblDescription">@Languages.Translation("lblBarCodeTrackingScanProcedure"):</label>
                        <table id="radDestination" cellspacing="0" style="border-collapse:collapse;">
                            <tbody>
                                <tr>
                                    <td><input id="radDestination_0" type="radio" name="radDestination" value="0" checked="checked"><label for="radDestination_0">@Languages.Translation("lstBarCodeTrackingLockToDest")</label></td>
                                </tr>
                                <tr>
                                    <td><input id="radDestination_1" type="radio" name="radDestination" value="1"><label for="radDestination_1">@Languages.Translation("lstBarCodeTrackingDetectDest")</label></td>
                                </tr>
                                <tr>
                                    <td><input id="radDestination_2" type="radio" name="radDestination" value="2"><label for="radDestination_2">@Languages.Translation("lstBarCodeTrackingReqOnEach")</label></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-sm-12" id="DueBackDateClass" hidden="hidden">
                    <div class="form-group ">
                        <label for="lblDescription">@Languages.Translation("lblBarCodeTrackingDueBackDate"):</label>
                        <div class="barcodeBox">
                            <div id="calendarContainer" class="ContainerForemost">
                                @*<input type="text" ID="txtDueBackDate" value="[None]" disabled="disabled" Class="form-control">*@
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group ">
                        <div class="trackableItemInfo">@Languages.Translation("tiTrackableItemInfo")</div>
                        <label for="lblDescription">@Languages.Translation("lblBarCodeTrackingObjectBarcode"):</label>
                        <div class="barcodeBox">
                            <input type="text" ID="txtObject" Class="form-control">
                        </div>
                        <label ID="lblObject" Text=""></label>
                        <div id="trlblAdditional1_2" style="margin-top: -10px;">
                            <label ID="lblAdditional1">@Model.lblAdditional1</label>
                        </div>
                        <div id="trlblAdditional1_1" hidden="hidden">
                       
                        </div>
                        <div id="trlblAdditional2_1" hidden="hidden" style="margin-top: 12px;">
                            <label ID="lblAdditional2">@Model.lblAdditional2</label>
                        </div>
                        <div id="trlblAdditional2_2" style="display:none">
                            <textarea ID="txtAdditional2" Class="form-control" style="width:100%"></textarea>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12" style="margin-bottom: 40px;">
                    <div class="form-group ">
                        <a ID="btnTransfer">
                            <span class="fa-stack fa-lg">
                                <i class="fa fa-folder-open-o fa-2x"></i>
                                <i class="fa fa-arrow-right btArrow-Right"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </aside>

        <div class="content-wrapper" style="padding-left: 20px; margin-top: 40px; margin-bottom: 43px;">
            <div class="container-fluid">
                @RenderBody()
            </div>
        </div>
        @*<footer class="main-footer visible-md visible-lg" style="position: fixed; bottom: 0px;">
                <div class="col-lg-12">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <span class="pull-left footer-text footer-box-gap"><i class="fa fa-server" style="width: 15px"></i>@Languages.Translation("lblMainSERVER") <br> @TabFusionRMS.WebVB.Keys.ServerName</span>
                        <span class="pull-left footer-text footer-box-gap"><i class="fa fa-database" style="width: 15px"></i>@Languages.Translation("lblMainDATABASE") <br> @TabFusionRMS.WebVB.Keys.DatabaseName</span>
                        <span class="pull-left footer-text footer-box-gap"><i class="fa fa-user" style="width: 15px"></i>@Languages.Translation("lblMainUser")  <br> @TabFusionRMS.WebVB.Keys.CurrentUserName </span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 footer-copyright-text text-right">
                        @String.Format(Languages.Translation("Copyright"), DateTime.Now.ToUniversalTime.Year, ViewContext.Controller.GetType().Assembly.GetName().Version.ToString())
                    </div>
                </div>
            </footer>*@
    </div>
    <div class="form-horizontal" id="divAboutInfo">
    </div>   
</body>
</html>
