
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
    @*@Scripts.Render("/Scripts/AppJs/CommonFunctions.js")*@
    @Scripts.Render("~/bundles/jQuery")
    @*<script src="~/Scripts/AppJs/CommonFunctions.js"></script>*@
    @Scripts.Render("~/bundles/masterjs")
    @Scripts.Render("~/bundles/modernizr")

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
            if($("#lblLoginUserName").html()!= undefined){
                if(getCookie("lastUsername").toLowerCase()!=$("#lblLoginUserName").html().toLowerCase().trim()){
                    window.location.reload();
                }
            }
        };

        var urls = {
            Admin: {
                DefaultPage: '@Url.Action("Index", "Admin")'
            },
            Common: {
                SetCulture: '@Url.Action("SetCulture", "Common")',

                GetGridViewSettings: '@Url.Action("GetGridViewSettings", "Common")',
                GetGridViewSettings1: '@Url.Action("GetGridViewSettings1", "Common")',
                @*ArrangeGridOrder: '@Url.Action("ArrangeGridOrder", "Common")',
                GetGridSelectedRowsIds: '@Url.Action("GetGridSelectedRowsIds", "Common")',
                SetGridOrders: '@Url.Action("SetGridOrders", "Common")',

                GetTableList: '@Url.Action("GetTableList", "Common")',
                GetColumnList: '@Url.Action("GetColumnList", "Common")',
                TruncateTrackingHistory: '@Url.Action("TruncateTrackingHistory", "Common")',
                GetRegisteredDatabases: '@Url.Action("GetRegisteredDatabases", "Common")',
                GetCheckSession: '@Url.Action("GetCheckSession", "Common")',
                CheckTabLevelAccessPermission: '@Url.Action("CheckTabLevelAccessPermission", "Common")',
                GetFontFamilies:'@Url.Action("GetFontFamilies", "Common")',
                GetRefereshDetails:'@Url.Action("GetRefereshDetails", "Base")',
                GetTableListLabel: '@Url.Action("GetTableListLabel", "Common")'*@
            },
            Retention: {
                AdminRetentionPartial: '@Url.Action("AdminRetentionPartial", "Admin")',
                GetRetentionPeriodTablesList: '@Url.Action("GetRetentionPeriodTablesList", "Admin")',
                SetRetentionParameters: '@Url.Action("SetRetentionParameters", "Admin")',
                LoadRetentionPropView: '@Url.Action("LoadRetentionPropView", "Admin")',
                GetRetentionPropertiesData: '@Url.Action("GetRetentionPropertiesData", "Admin")',
                SetRetentionTblPropData: '@Url.Action("SetRetentionTblPropData", "Admin")',
                RemoveRetentionTableFromList: '@Url.Action("RemoveRetentionTableFromList", "Admin")',
                LoadTablesRetentionView: '@Url.Action("LoadTablesRetentionView", "Admin")',
                ReplicateCitationForRetentionOnSaveAs: '@Url.Action("ReplicateCitationForRetentionOnSaveAs", "Retention")',
                GetRetentionYearEndValue: '@Url.Action("GetRetentionYearEndValue", "Retention")',
                IsRetentionCodeInUse: '@Url.Action("IsRetentionCodeInUse", "Retention")',

                GetRetentionCodes: '@Url.Action("GetRetentionCodes", "Retention")',
                LoadRetentionCodeView: '@Url.Action("LoadRetentionCodeView", "Retention")',
                SetRetentionCode: '@Url.Action("SetRetentionCode", "Retention")',
                EditRetentionCode: '@Url.Action("EditRetentionCode", "Retention")',
                RemoveRetentionCodeEntity: '@Url.Action("RemoveRetentionCodeEntity", "Retention")',
                CheckRetentionCodeExists: '@Url.Action("CheckRetentionCodeExists", "Retention")',
                GetRetentionCodeId: '@Url.Action("GetRetentionCodeId", "Retention")',

                GetCitationCodes: '@Url.Action("GetCitationCodes", "Retention")',
                LoadAddCitationCodeView: '@Url.Action("LoadAddCitationCodeView", "Retention")',
                SetCitationCode: '@Url.Action("SetCitationCode", "Retention")',
                EditCitationCode: '@Url.Action("EditCitationCode", "Retention")',
                RemoveCitationCodeEntity: '@Url.Action("RemoveCitationCodeEntity", "Retention")',
                GetRetentionCodesByCitation: '@Url.Action("GetRetentionCodesByCitation", "Retention")',
                GetCitationCodesByRetenton: '@Url.Action("GetCitationCodesByRetenton", "Retention")',
                DetailedCitationCode: '@Url.Action("DetailedCitationCode", "Retention")',
                RemoveAssignedCitationCode: '@Url.Action("RemoveAssignedCitationCode", "Retention")',
                GetAssignCitationCode: '@Url.Action("GetAssignCitationCode", "Retention")',
                AssignCitationToRetention: '@Url.Action("AssignCitationToRetention", "Retention")',
                GetCitationsCodeToAdd: '@Url.Action("GetCitationsCodeToAdd", "Retention")',
                GetCountOfRetentionCodesForCitation: '@Url.Action("GetCountOfRetentionCodesForCitation", "Retention")',

                ReassignRetentionCode: '@Url.Action("ReassignRetentionCode", "Retention")',
                GetRetentionTablesList: '@Url.Action("GetRetentionTablesList", "Retention")',
                GetRetentionCodeList: '@Url.Action("GetRetentionCodeList", "Retention")',
                ReplaceRetentionCode: '@Url.Action("ReplaceRetentionCode", "Retention")',

                //by hasmukh
                RetentionCodeMaintenance: '@Url.Action("RetentionCodeMaintenance", "Retention")',
                CitationMaintenance: '@Url.Action("CitationMaintenance", "Retention")',
            },
            Security:{
                CheckModuleLevelAccess: '@Url.Action("CheckModuleLevelAccess", "Admin")'
            }
        } //End of variable diclaration


        $(document).ready(function () {
            setTimezoneCookie();
        });

        function setTimezoneCookie() {
            var timezone_cookie = "timezoneoffset";
            var sessid = $.cookie('sessid');
            // if the timezone cookie not exists create one.
            if (!$.cookie(timezone_cookie)) {
                // check if the browser supports cookie
                var test_cookie = 'test cookie';
                $.cookie(test_cookie, true);

                // browser supports cookie
                if ($.cookie(test_cookie)) {
                    // delete the test cookie
                    $.cookie(test_cookie, null);
                    // create a new cookie
                    $.cookie(timezone_cookie, new Date().getTimezoneOffset());
                    // re-load the page
                    location.reload();
                }
            }
                // if the current timezone and the one stored in cookie are different
                // then store the new timezone in the cookie and refresh the page.
            else {
                var storedOffset = parseInt($.cookie(timezone_cookie));
                var currentOffset = new Date().getTimezoneOffset();
                // user may have changed the timezone
                if (storedOffset !== currentOffset) {
                    $.cookie(timezone_cookie, new Date().getTimezoneOffset());
                    location.reload();
                }
            }
        }
    </script>

    <style type="text/css">
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
    <input type="hidden" id="hdnHomeVal" value="@Languages.Translation("mnuAdminHome")" />
    <div id="ajaxloading" class="loaderMain-wrapper">
        <div class="loaderMain-admin"></div>
    </div>
    <input id="hdnRefInfo" type="hidden" />
    <div class="wrapper">
        <header class="main-header" style="z-index:999;">
            <nav class="navbar navbar-default navbar-fixed-top tab-nave" role="navigation">
                <div class="container-fluid">
                    <a id="aLogo" class="logo navbar-brand" href="~/Data.aspx"><img src="@Url.Content("~/Images/logo.png")" class="img-responsive" /></a>
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
        </header>

        <aside class="main-sidebar" style="position:fixed;">
            <a href="#menu-toggle" class="sidebar-toggle" id="menu-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">@Languages.Translation("ToggleNavigation")</span>
                <i class="fa fa-caret-left" id="left-panel-arrow"></i>
            </a>
            <section class="sidebar">
                <ul id="ulRetention" class="sidebar-menu">
                    <li class="active treeview">
                        <a>
                            <span>@Languages.Translation("mnuRetention")</span> <i class="fa fa-angle-right pull-right"></i>
                        </a>
                        <ul class="treeview-menu">
                            <li><a id="aRetentionCodeMaint">@Languages.Translation("RetentionCodeMaintenance")</a></li>
                            @If (TabFusionRMS.WebVB.RetentionController.IsRetentionTurnOffCitations = False) Then
                            @<li><a id="aCitationCodeMaint"> @Languages.Translation("CitationMaintenance")</a></li>
                            End If

                            @*<li style="cursor:pointer"><a id="btnReassignRetCode"><i class="fa fa-circle-o"></i> Reassign RetentionCode</a></li>*@
                        </ul>
                    </li>
                </ul>
            </section>
        </aside>

        <div class="content-wrapper" style="padding-left: 20px; margin-top: 70px; margin-bottom: 43px;">
            <div class="container-fluid">
                @*@RenderSection("featured", required:=False)*@
                @RenderBody()
            </div>
        </div>
        <footer class="main-footer visible-md visible-lg" style="position: fixed; bottom: 0px; width: 1433px;">
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
        </footer>
    </div>
    <div class="form-horizontal" id="divAboutInfo">
    </div>   
    @RenderSection("scripts", required:=False)

    <script>
        //$(".main-footer").css("width",$(".main-header").outerWidth() - 230);
        $(".sidebar-toggle").show();
        var vTimeOutSecounds = @ViewBag.TimeOutSecounds * 1000;
        var vAutoRedirectURL = '@ViewBag.AutoRedirectURL';
        var time = new Date().getTime();
        //Fixed : FUS-4617
        $(document).bind("mousemove keypress",'body', function (e) {
            time = new Date().getTime();
        });

        function refresh() {
            if (new Date().getTime() - time >= vTimeOutSecounds)
                //window.location.reload(true);
                window.location.href=vAutoRedirectURL;
            else
                setTimeout(refresh, 30000);
        }
        setTimeout(refresh, 30000);
    </script>
</body>
</html>
