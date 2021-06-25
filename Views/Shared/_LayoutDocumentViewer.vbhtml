
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
    @Styles.Render("~/Styles/cssViewer")
    @*<link href="~/Content/themes/TAB/css/custom.css" rel="stylesheet" />*@
    @*@Scripts.Render("/Scripts/AppJs/CommonFunctions.js")*@
    @Scripts.Render("~/bundles/jQueryViewer")
    <script src="~/Content/themes/TAB/js/jquery-cookie-plugin.js"></script>
    <script src="~/Scripts/AppJs/BuildToastrMessage.js
            "></script>
    @*<script src="~/Scripts/AppJs/CommonFunctions.js"></script>*@
    @*@Scripts.Render("~/bundles/masterjs")*@
    @Scripts.Render("~/bundles/modernizr")
    @Scripts.Render("~/bundles/leadTools")


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
                        $("#spinningWheel").hide();
                        $('#dialog-form-AboutUs').modal('show');
                        $("#dialog-form-AboutUs .modal-dialog").draggable({ disabled: true });
                    },
                    failure: function(response) {
                        return false;
                    }
                });
            });

            getResourcesByModule('common');
            getResourcesByModule('htmlviewer');
            //getResourcesByModule('all');
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

        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        @*var urls = {
           Admin: {
                DefaultPage: '@Url.Action("Index", "Admin")'
            },
            Common: {
                SetCulture: '@Url.Action("SetCulture", "Common")',
                GetGridViewSettings: '@Url.Action("GetGridViewSettings", "Common")',
                GetGridViewSettings1: '@Url.Action("GetGridViewSettings1", "Common")',
            },
            Security:{
                CheckModuleLevelAccess: '@Url.Action("CheckModuleLevelAccess", "Admin")'
            }
        }*@ //End of variable diclaration


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

        .modal-header .close {
            font-size: 29px !important;
            line-height: 29px !important;
            color: #002949 !important;
            padding: 0 5px !IMPORTANT;
            opacity: 1 !important;
            font-weight: bolder;
        }
    </style>
</head>

<body>
    <input type="hidden" id="hdnHomeVal" value="@Languages.Translation("mnuAdminHome")" />
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
                                <a id="cartList_Id">@Languages.Translation("lblAttachmentCart")</a>
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


        @*<div class="content-wrapper" style="padding-left: 20px; margin-top: 70px; margin-bottom: 43px;">*@
        <div class="container-fluid">
            @*@RenderSection("featured", required:=False)*@
            @RenderBody()
        </div>
        @*</div>*@
        @*<footer class="main-footer visible-md visible-lg" style="position: fixed; bottom: 0px; width: 1433px;">
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
            </footer>*@
    </div>
    <div class="form-horizontal" id="divAboutInfo">
    </div>
    @RenderSection("scripts", required:=False)

    <script>
        @*$(".sidebar-toggle").show();
        var vTimeOutSecounds = @ViewBag.TimeOutSecounds * 1000;
        var vAutoRedirectURL = '@ViewBag.AutoRedirectURL';
        var time = new Date().getTime();*@
        //Fixed : FUS-4617
        $(document).bind("mousemove keypress", 'body', function (e) {
            time = new Date().getTime();
        });

        //function refresh() {
        //    if (new Date().getTime() - time >= vTimeOutSecounds)
        //        //window.location.reload(true);
        //        window.location.href=vAutoRedirectURL;
        //    else
        //        setTimeout(refresh, 30000);
        //}
        //setTimeout(refresh, 30000);
    </script>
</body>
</html>
