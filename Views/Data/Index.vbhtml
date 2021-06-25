@Code
    ViewData("Title") = Languages.Translation("tiDocumentViewerTabDocViewer")
    Layout = "~/Views/Shared/_LayoutData.vbhtml"
End Code

<link href="~/Content/themes/TAB/css/theme.css" type="text/css" rel="stylesheet" />
@*<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">*@
<link rel="stylesheet" href="~/Content/themes/TAB/css/jquery.contextMenu.min.css" />
<link rel="stylesheet" href="~/Content/themes/TAB/css/HandsOnTable/handsontable.full.css" />
@*<link rel="stylesheet" href="https://printjs-4de6.kxcdn.com/print.min.css" />*@
  
<style type="text/css">
    .umand {
        color: red !important;
    }

    .grid_wrapper {
        position: relative;
        overflow-y: auto;
        /*width: 100%;*/
    }

    .fixed-footer .modal-action input {
        margin-right: 5px;
    }

    /*handsontable fix design*/
    .show_attachment {
        position: fixed;
        right: 5%;
        bottom: 0;
        top: 0;
        width: 550px;
        height: 80vh;
        margin: auto;
        z-index: 10000;
        display: none;
    }


    .handsontable td, .handsontable th {
        border-top-width: 0;
        border-left-width: 0;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        height: 34px;
        empty-cells: show;
        line-height: 21px;
        padding: 0 4px;
        vertical-align: top;
        overflow: hidden;
        outline-width: 0;
        white-space: pre-line;
        background-clip: padding-box;
    }

    .handsontable th {
        font-weight: 600;
        background-color: #e7e7e7;
        color: #002949;
    }

    .handsontable td {
        font-family: DPLight;
        color: black;
    }
    .handsontable .htDimmed {
        font-family: DPLight;
        color: black;
    }
    /*new change for cell moti mashiah*/
    /*.ht_master tr td {
        background-color: black;
        color: white;
        font-size:14px;
    }*/
    .fa-stack-1x {
        line-height: initial;
    }

    /*.handsontable * {
        font-size: disable;
    }*/

    .userOptions {
        border: 2px solid gray;
        height: 400px;
        width: 250px;
        padding-left: 15px;
        position: absolute;
        right: 27px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

        .userOptions input[type="number"] {
            border: 0;
            outline: 0;
            background: transparent;
            border-bottom: 1px solid black;
            width: 200px;
            display: block;
            margin-bottom: 16px;
        }

        .userOptions input[type="button"] {
            position: absolute;
            bottom: 35px;
        }

        .userOptions select {
            border: 0;
            outline: 0;
            background: transparent;
            border-bottom: 1px solid black;
            width: 200px;
            display: block;
        }

    .handsontable .htAutocompleteArrow {
        color: blue; /* styling the arrow */
    }

    /*.handsontable .blue {
        color: blue;*/ /* cell font color }*/


    .handsontable .listbox TD {
        background: ghostwhite; /* styling list */
    }

    .currentRow {
        background-color: #00A1E1 !important;
        /*color: #fff;*/
    }
    .currentRowReport {
        background-color: black !important;
    }

    .isEmpty {
        background-color: red;
    }

    .pagination {
        display: flex;
        align-items: center;
    }

        .pagination > li {
            margin-right: 10px;
        }

        .pagination input {
            width: 80px;
        }

    .page-navigation {
        display: flex;
        justify-content: space-between;
    }

    .LinqScriptTd1 {
        width: 50%;
    }

    .LinqScriptTd2 {
        width: 50%;
    }

    .top_action_content ul li span {
        font-size: 14px;
    }
</style>

<div class="container-fluid">
    <!--breadcrumbs-->
    <div class="col-sm-12">
        <ul id="breadcrumbs" class="breadcrumb breadcrumb_new" style="list-style-type:none">
          
        </ul>
    </div>
    <!--task List-->
    <div class="col-sm-12" id="TaskContainer">
        <div class="panel-group col-xs-12 no_padding">
            <div class="panel panel-default col-xs-12 no_padding">
                <div class="panel-heading col-xs-12 no_padding top_action_header">
                    <div class="col-xs-6 col-sm-6 top_action_header_block">
                        <span class="font_awesome theme_color"><i class="fa fa-tasks"></i></span>@Languages.Translation("lblDataTaskList")
                        <div id="hdnMenuIds"></div>
                    </div>
                    <div class="col-xs-6 col-sm-6 top_action_header_block">
                        <span class="font_awesome theme_color"><i class="fa fa-info"></i></span>@Languages.Translation("tiINFO")
                        <a class="show-hide pull-right" onclick="TaskListSetHideShowText(this,0)" data-toggle="collapse" href="#top_action_items">@Languages.Translation("Show") [+]</a>
                    </div>
                </div>
                <div id="top_action_items" class="panel-collapse collapse col-xs-12 no_padding top_action_content">
                    <div class="col-xs-6 col-sm-6">
                        <ul id="tasklist" class="tastk_list">@MvcHtmlString.Create(Model.Taskbar.TaskList)</ul>
                    </div>
                    <div class="col-xs-6 col-sm-6">
                        <ul class="req_status">
                            <li><span class="theme_color"><i class="fa fa-user" style="width: 15px"></i></span>@Languages.Translation("lblMainUser") :<label>@Session("UserName").ToString()</label></li>
                            <li><span class="theme_color"><i class="fa fa-server" style="width: 15px"></i></span>@Languages.Translation("lblMainSERVER") :<label>@Session("Server").ToString()</label></li>
                            <li><span class="theme_color"><i class="fa fa-database" style="width: 15px"></i></span>@Languages.Translation("lblMainDATABASE") :<label>@Session("DatabaseDisplayName").ToString()</label></li>
                            <li><span class="theme_color"><i class="fa fa-code-fork" style="width: 15px"></i></span>@Languages.Translation("lblAboutVersion") :<label><Label Id="lblVersionInfo"></Label></label></li>
                            <li>
                                <a id="ancRequestNewButton" href="@Model.Taskbar.ancRequestNewButton">
                                    <span>
                                        <img id="imgRequestNewButton" src="@Model.Taskbar.imgRequestNewButton " width="15" height="15" />
                                    </span>
                                    <span id="RequestNewButtonLabel">@Model.TaskBar.RequestNewButtonLabel </span>
                                </a>
                                =
                                <label id="RequestNewButton">@Model.Taskbar.RequestNewButton</label>
                            </li>
                            <li>
                                <a id="ancRequestBatchButton" href="@Model.Taskbar.ancRequestBatchButton">
                                    <span>
                                        <img id="imgRequestBatchButton" src="@Model.Taskbar.imgRequestBatchButton" width="15" height="15" />
                                    </span>
                                    <span id="RequestBatchButtonLabel">@Model.Taskbar.RequestBatchButtonLabel </span>
                                </a>
                                =
                                <label id="RequestBatchButton" runat="server">@Model.Taskbar.RequestBatchButton</label>
                            </li>
                            <li>
                                <a id="ancRequestExceptionButton" href="@Model.Taskbar.ancRequestExceptionButton">
                                    <span>
                                        <img id="imgRequestExceptionButton" src="@Model.Taskbar.imgRequestExceptionButton" width="15" height="15" />
                                    </span>
                                    <span id="RequestExceptionButtonLabel">@Model.Taskbar.RequestExceptionButtonLabel </span>
                                </a>
                                =
                                <label id="RequestExceptionButton">@Model.Taskbar.RequestExceptionButton </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="mainContainer" class="container-fluid">
    <!--news Feeds-->
    <div id="divNews" class="col-sm-12" style="overflow:auto; max-height:90%">
        <div style="border: 1px solid #666666; background-color: White; padding: 5px 5px 30px 5px;">
            <label Id="lblNews" Style="color: #002949; font-size: 18px;">@Model.NewsFeed.TitleNews</label>
            <div id="SetNewsURL" style="float: right; margin-top: 0px; margin-bottom: 5px;">
                URL:
                <input type="text" id="txtNewsURL" class="form-control" style="width:300px;display: inline-block;">
                <input type="button" value="Save" id="btnSaveNewsURL" class="btn btn-success">
            </div>
            <table id="TabNewsTable" frameborder="0" style="background-color: White; display:none; width: 100%;">
                @For Each news In Model.NewsFeed.LstBlockHtml
                    @<tr><td>@MvcHtmlString.Create(news)</td></tr>
                Next
            </table>
            <iframe id="NewsFrame" src="@Model.NewsFeed.UrlNewsFeed" frameborder="0" style="background-color:White; display:unset" width="100%" height="95%"></iframe>
        </div>
    </div>
    <!--footer-->
    <div class="col-ms-12" id="FooterTask" style="position:fixed; width:100%; bottom:0">
        <div Class="row footer-container">
            <footer class="client-footer" style="">
                <div class="col-lg-12">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <span class="pull-left footer-text footer-box-gap">
                            <span id="LastAttamptid">@MvcHtmlString.Create(Model.Footer.LblAttempt)</span>
                        </span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 footer-copyright-text text-right">
                        <span>@Model.Footer.LblService</span>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</div>


@Scripts.Render("~/bundles/DatamvcJS")
@*@Scripts.Render("~/bundles/Datapage")*@
<input type="hidden" id="isTabfeed" value="@Model.NewsFeed.IsTabNewsFeed" />
@*<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js"></script>*@
@*<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js"></script>*@
<script src="~/Content/themes/TAB/js/jquery.contextMenu.min.js"></script>
<script src="~/Content/themes/TAB/js/jquery.ui.position.js"></script>
<script src="~/Content/themes/TAB/js/HandsOnTable/handsontable.full.js"></script>
@*<script src="https://printjs-4de6.kxcdn.com/print.min.js"></script>*@
<script>
    var runfeed = new NewsFeed()
    $(document).ready(function () {
        //run feed.
        //$(document).ajaxStart(function () {
        //    $("#spinningWheel").show();
        //}).ajaxStop(function () {
        //    $("#spinningWheel").hide();
        //});
        //$('[data-toggle="tooltip"]').tooltip()
        
        runfeed.NewFeedSetup()
    });
    (function () {
        // hold onto the drop down menu
        var dropdownfix;

        // and when you show it, move it to the body
        $(window).on('show.bs.dropdown', function (e) {
            // grab the menu
            dropdownfix = $(e.target).find('.grid_drildown');

            // detach it and append it to the body
            $('body').append(dropdownfix.detach());

            // grab the new offset position
            var eOffset = $(e.target).offset();

            // make sure to place it where it would normally go (this could be improved)
            dropdownfix.css({
                'display': 'block',
                'top': eOffset.top + $(e.target).outerHeight(),
                'left': eOffset.left
            });
        });

        // and when you hide it, reattach the drop down, and hide it normally
        $(window).on('hide.bs.dropdown', function (e) {
            if (dropdownfix != undefined) {
                $(e.target).append(dropdownfix.detach());
                dropdownfix.hide();
            }
        });
        $('input[type="checkbox"]').on('change', function () {
            console.log($(this).data('row'));
        })
    })();
</script>

