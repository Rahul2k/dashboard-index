
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<link href="~/Images/TabFusion.ico" rel="shortcut icon" type="image/x-icon" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Page-Enter" content="blendTrans(duration=0)" />
<meta http-equiv="Page-Exit" content="blendTrans(duration=0)" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="CACHE-CONTROL" content="NO-CACHE" />
<title>@Languages.Translation("pgTiTABWebAccess")</title>

<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,400italic,700,600italic" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" href="~/favicon.ico" />
@Styles.Render("~/Styles/MVCLayoutCSS")
<script src="~/Content/themes/TAB/js/es6-promise.auto.min.js"></script>
@Scripts.Render("~/bundles/MVCLayoutJS")

<style>
    .modal-allow-interact {
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        bottom: auto;
        width: 800px; /* this can be however wide you want the modal to be */
        margin: 0 auto;
    }

        .modal-allow-interact .modal-dialog {
            margin: 0;
        }
</style>

<input type="hidden" id="hdnHomeVal" value="@Languages.Translation("mnuAdminHome")" />

<div style="position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; min-height: 500px;">
    <nav class="navbar navbar-default navbar-fixed-top tab-nave" id="AdminMenu">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">@Languages.Translation("lsgTogglenavigation")</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/Data">
                    <img src="/Images/logo.png" width="" height="" alt="Tab Fusion" class="img-responsive" />
                </a>
            </div>

            <div class="collapse navbar-collapse navbar-right tab-menu" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a id="hlBackgroundStatus" target="_blank" class="notification-container" title="Background Status" href="~/BackgroundStatus">@Languages.Translation("lblMSGExportBackgroundStatus")</a>
                        @If Model.Layout.BackgroundStatusNotification > 0 Then
                            @<span Class="notification-counter" id="spanBackgroundStatusNotification" style="padding:1px 3px">
                                @Model.Layout.BackgroundStatusNotification
                            </span>
                        Else
                            @<span Class="notification-counter" id="spanBackgroundStatusNotification"></span>
                        End If

                    </li>
                    <li Id="hlAdmin">
                        @MvcHtmlString.Create(Model.Layout.LinkAdmin)
                    </li>
                    <li id="hlLabelManager">
                        @MvcHtmlString.Create(Model.Layout.LinkLabelManager)
                    </li>

                    <li Id="hlImport">
                        @MvcHtmlString.Create(Model.Layout.LinkImport)
                    </li>
                    <li>
                        <a Id="lbTools" onclick="toolsmodel.DialogRun(ids.Tools)" title="Tools">@Languages.Translation("Tools")</a>
                    </li>
                    <li Id="hlTracking">
                        @MvcHtmlString.Create(Model.Layout.LinkTracking)
                    </li>
                    <!--new implementation for dashboad need to add permission etc..-->
                    <li>
                        <a href="/Dashboard/Index" target="_blank">Dashboard</a>
                    </li>
                    <li>
                        <a href="/help/Default.htm" target="_blank" title="Help">@Languages.Translation("Help")</a>
                    </li>
                    <li>
                        <a Id="lbAboutUs">@Languages.Translation("About")</a>
                    </li>
                    <li>
                        <a ID="hlSignout" title="Sign Out" href="/logout.aspx">@Languages.Translation("SignOut")</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>
    <!--Search-->
    <div id="wrapper">
        <!-- left panel start -->
        <div class="sidebar-wrapper" id="divSearch">
            <div Id="upserch">
                <ContentTemplate>
                    <div class="search_box_main l_drillDownWrapper" id="divSearchContent">
                        <div id="pnlSearch">
                            <div id="divCustomSearch1" class="input-group search_box">
                                <input type="text" id="txtSearch" AutoCompleteType="Search" MaxLength="256" class="form-control"
                                       title="Searches all views in the database for matching words.">
                                <span class="input-group-btn">
                                    <button type="button" id="btnSearch" title="Search" class="btn btn-default glyphicon glyphicon-search"></button>

                                </span>
                                <div id="search_info"></div>
                            </div>
                            <Button Id="btnDefaultSearch" style="display:none;" name="Search" />
                        </div>
                        <div class="input-group checkbox search_checkbox m-t-5">
                            <input type="checkbox" Id="chkAttachments" ToolTip="Search attachment text" /><label>Include attachments</label>
                        </div>

                        <div class="input-group checkbox search_checkbox" style="display:none">
                            <input type="checkbox" Id="chkCurrentTable" ToolTip="Only search current table" /><label>Current table only</label>
                        </div>

                        <div class="input-group checkbox search_checkbox" style="display:none">
                            <input type="checkbox" Id="chkUnderRow" ToolTip="Only search for items under the selected item" /><label>Under this row only</label>
                        </div>
                    </div>
                </ContentTemplate>
            </div>
            <asp:UpdateProgress ID="upsearch" AssociatedUpdatePanelID="upserch" DynamicLayout="true">
                <ProgressTemplate>
                    @*<div class="loaderMain-wrapper">
                            <div class="loaderMain"></div>
                        </div>*@
                </ProgressTemplate>
            </asp:UpdateProgress>
            <div id="divMenu" class="divMenu">

            </div>

            <a href="#menu-toggle" class="toggle_btn" id="menu-toggle"><i class="fa fa-caret-left" id="left-panel-arrow"></i></a>

            @*<div style="visibility: hidden">
                    <input type="hidden" Id="hdnviewId" Value="51" />
                    <input type="hidden" Id="hdnBreadCrumbsClick" Value="0" />
                    <input type="hidden" Id="btnitem" Visible="true" value="Menu" />
                </div>*@
        </div>
        <div id="page-content-wrapper">
            @RenderBody()
            @*<asp:ContentPlaceHolder ID="ContentPlaceHolder1" >
                </asp:ContentPlaceHolder>*@
        </div>
    </div>

    <!--spinningwheel-->
    <div id="spinningWheel" style="display:none" class="loaderMain-wrapper">
        <div class="loaderMain"></div>
    </div>
    <div id="spingrid" style="display:none;" class="loaderMain-wrapper">
        <i class="fa fa-refresh fa-spin" style="display:inline-flex;position:relative;margin-left:50%;margin-top:17%;font-size:20px"></i>
    </div>

    <div class="form-horizontal" id="divAboutInfo">

    </div>
</div>

<!--fusion dialog no query for layout-->
<div Id="ToolsDialog" style="display:none">
    <div class="modal modalblock" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header cursor-drag-icon">
                    <button type="button" onclick="toolsmodel.DialogClose()" class="close cancelQueryWindow" data-dismiss="modal" aria-label="Close">
                        <i class="fa fa-close theme-color"></i>
                    </button>
                    <h4 class="modal-title">
                        <label Id="lblTitle" class="theme_color"></label>
                    </h4>
                </div>
                <div id="ContentDialog">

                </div>
            </div>
        </div>
        <div id="mdlFooterClone" class="fixed-footer affixed">

        </div>
    </div>
</div>
<!--dialog for query window-->
<div Id="MainDialogQuery" style="display:none;">
    <div class="modal modalblock" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header cursor-drag-icon">
                    <button type="button" onclick="obJquerywindow.CloseQuery(this)" class="close cancelQueryWindow" data-dismiss="modal" aria-label="Close">
                        <i class="fa fa-close theme-color"></i>
                    </button>
                    <button type='button' class='close cancelQueryWindow'><i id="arrowUpDown" onclick="obJgridfunc.HideQueryBody(this)" class='fa fa-angle-up'></i></button>
                    <h4 class="modal-title">
                        <label Id="QuerylblTitle" style="cursor:grab; width: 60%;" class="theme_color"></label>
                        <input Id="QuerySaveInput" type="text" maxlength="60" data-toggle="tooltip" title="Enter Query Name" style="width: 60%; display: none; border-top:none;border-right:none;border-left:none; outline:none;" autocomplete="off">
                    </h4>
                </div>
                <div id="QueryContentDialog">

                </div>
            </div>
        </div>
        <div id="mdlFooterClone" class="fixed-footer affixed"></div>
    </div>
</div>
<!--LinkScript Dynamic Dialogbox-->
<div id="LinkScriptDialogBox" style="display:none">
    <div class="modal modalblock" tabindex="-1">
        <div class="modal-dialog ui-draggable" style="left: 25px; top: 70px;">
            <div class="modal-content">
                <div class="modal-header cursor-drag-icon">
                    <button type="button" onclick="obJlinkscript.CloseDialog(true)" class="close cancelQueryWindow" data-dismiss="modal" aria-label="Close">
                        <i class="fa fa-close theme-color"></i>
                    </button>
                    <h4 class="modal-title">
                        <span id="LSlblTitle" class="theme_color"></span>
                    </h4>
                </div>
                <div>
                    <div class="modal-body">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <h4>
                                        <span id="LSlblHeading"></span>
                                    </h4>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table id="LStblControls" class="table">
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <div class="col-xs-12">
                            <div id="LSdivButtons">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="mdlFooterClone" class="fixed-footer affixed"></div>
    </div>
</div>
<!--basic dialog box-->
<div Id="BasicDialog" style="display:none">
    <div class="modal modalblock" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header cursor-drag-icon">
                    <button type="button" onclick="dlgClose.CloseDialog(false)" class="close cancelQueryWindow" data-dismiss="modal" aria-label="Close">
                        <i class="fa fa-close theme-color"></i>
                    </button>
                    <button name="arrowUpDown" style="display:none" type="button" class="close cancelQueryWindow"><i class="fa fa-angle-up"></i></button>
                    <h4 class="modal-title">
                        <label Id="dlgBsTitle" class="theme_color"></label>
                    </h4>
                </div>
                <div id="dlgBsContent">

                </div>
            </div>
        </div>
    </div>
</div>
<!--record save dialog-->
<div id="DialogRecordSaveId" data-backdrop="static" data-keyboard="false" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" style="width:300px">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="DialogRecordMsg" class="modal-title"></h5>
            </div>
        </div>
    </div>
</div>
<!--hoding retention info-->
<div Id="RetentionHoldingDialog" style="display:none">
    <div class="modal modalblock" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header cursor-drag-icon">
                    <button type="button" onclick="($('#RetentionHoldingDialog').hide())" class="close cancelQueryWindow" aria-label="Close">
                        <i class="fa fa-close theme-color"></i>
                    </button>
                    <button name="arrowUpDown" style="display:none" type="button" class="close cancelQueryWindow"><i class="fa fa-angle-up"></i></button>
                    <h4 class="modal-title">
                        <label Id="DlgHoldingTitle" class="theme_color"></label>
                    </h4>
                </div>
                <div id="RetentionHoldingContent">

                </div>
            </div>
        </div>
    </div>
</div>

<!--document viewer popup-->
<div id="dialog-form-attachment" style="display:none">
    <div class="modal modalblock" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" onclick="obJattachmentsview.CloseDialog()" class="close" aria-hidden="true">
                        <i class="fa fa-close theme-color"></i>
                    </button>
                    <span class="fa-stack theme_color pull-right modal-add-attchment" id="openAttachViewer">
                        <i class="fa fa-paperclip fa-flip-horizontal fa-stack-2x" style="font-size: 20px;"></i>
                        @*<i class="fa fa-plus fa-stack-1x" style="top: 13px; left: 5px;"></i>*@
                    </span>
                    <span id="gotoScanner" class="pull-right"><img style="margin-right:6px;margin-top:4px; cursor:pointer" alt="Scan Documents" src="/Images/scanner.png" /></span>

                    <input type="file" id="FileUploadForAddAttach" name="FileUploadForAddAttach" multiple="multiple" style="display: none" />
                    <label class="modal-title p-t-5" id="AttachmentsFormHeader">@Languages.Translation("lblAttachmentsFormHeader")</label>

                </div>
                <div class="modal-body document-modal-body dragandrophandlerpopup" id="AttachmentModalBody" >

                </div>
                <div class="modal-footer" style="padding: 10px;">
                    <span id="resultDisplay" class="pull-left"></span>
                    <span><a id="ModalAddAttachment"><u>Browse files</u></a></span>
                    <input type="button" onclick="obJattachmentsview.CloseDialog()" class="btn btn-default pull-right" value="@Languages.Translation("Cancel").ToUpper()" />
                </div>
            </div>
        </div>
    </div>
</div>
<script src="~/Scripts/AppJs/DataLayout.js"></script>
<script>
    $(document).ready(function () {
        //open and close side menu
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
            var vrToggleIcon = $(this).find('i');
            if (vrToggleIcon.hasClass('fa-caret-left')) {
                vrToggleIcon.removeClass('fa-caret-left').addClass('fa-caret-right');
            }
            else {
                vrToggleIcon.removeClass('fa-caret-right').addClass('fa-caret-left');
                $('#divmenuloader').hide();
            }
        });
        var LayoutData = @Html.Raw(Json.Encode(Model.Layout));
        //localStorage.setItem('vrClientsRes', LayoutData.LanguageCulture);
        app.language = JSON.parse(LayoutData.LanguageCulture);
        //bind user access menu
        document.getElementById("divMenu").innerHTML = LayoutData.UserAccessMenuHtml;
        $('.drillDownMenu').linkesDrillDown({ cookieName: null, menuLevel: 3 });
        $(".rightdrildown").click(function () { $(this).addClass("rightdrildown_add"); });
        $(".divMenu").mCustomScrollbar();
    });
    //var vrClientsRes = JSON.parse(localStorage.getItem('vrClientsRes'));

    //tostar messages
    (function ($) {
        $.fn.fnAlertMessage = function (options) {
            var settings = $.extend({
                title: "Success",
                message: "Message",
                timeout: 3000,
                msgTypeClass: 'toast-success'//toast-warning
            }, options);
            return this.each(function () {
                $('#' + this.id).fadeIn(settings.timeout / 2).fadeOut(settings.timeout * 3);
                $('#' + this.id).find('.toast-title').html(settings.title);
                $('#' + this.id).find('.toast-message').html(settings.message);
                $('#toast-container').find('.toast').removeClass('toast-success').addClass(settings.msgTypeClass);
            });
        };
    }(jQuery));

</script>
