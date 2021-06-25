@ModelType TabFusionRMS.WebVB.DocumentViewerModel
@Code
    ViewData("Title") = Languages.Translation("tiDocumentViewerTabDocViewer")
    Layout = "~/Views/Shared/_LayoutDocumentViewer.vbhtml"
End Code

<head>
    <meta charset="utf-8">
    <title>resizable demo</title>
    <link href="~/Resources/Styles/DocumentViewerDemo.css" rel="stylesheet" />
    <link href="~/Content/themes/TAB/css/simple-sidebar.css" rel="stylesheet" />
    <link href="~/Resources/Styles/Toolbar.css" rel="stylesheet" />
    <link href="~/Resources/Styles/Sidebar.css" rel="stylesheet" />
    <link rel="stylesheet" href="~/Resources/Styles/ImageViewerThumbnailStyles.css" type="text/css" />
    @*<link href="~/Content/themes/TAB/css/admin_custom.css" rel="stylesheet" />*@
    
    <style>
        /*table fix with scroll*/



        /*fix for shopping cart*/
        .attachment-list {
            height: 100%;
            list-style: none;
            padding: 0 0;
            overflow: auto;
        }

        #resizable {
            background: #fff;
        }

        .lt-imageviewer.lt - thumb - item - Text {
            color: #333;
            font-size: 14px;
            bottom: 0;
            width: inherit;
            margin-Left(): -48px;
        }

        .modal input[type=radio] {
            outline: none;
            margin: 3px 5px 0px -18px;
        }

        /*bar ajustment*/


        #ifCheckboxcheckedDiv_id {
            margin-left: 65px;
            display: none;
        }

            #ifCheckboxcheckedDiv_id div {
                margin-left: 4px;
            }

        #checkoutbutton_div_id > .btn-group {
            margin-left: 4px;
        }

        .sidebar-tab-conent {
            padding: 0px 6px 0px 6px;
        }
        /*overwrite class which comes from custom.css*/
        .btn_menu li a {
            padding: 5px 10px;
            border-bottom: 1px solid #e9e9e9;
            color: #4e4e4e;
            font-size: 12px;
            font-weight: normal;
            cursor: pointer;
            display: block;
        }
        #divCustomSearch1 div:nth-child(2) {
            display: inline-grid;
            float:left;
            margin:2px;
            margin-top:9px;
        }
        #divCustomSearch1 div:nth-child(1) {
            float: left;
            margin:2px;
        }
        #divCustomSearch1 div:nth-child(3) {
            display: inline-block;
        }

        #divCustomSearch1 div:nth-child(2) i {
            border: solid black;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 3px;
            cursor:pointer;
          
        }
        .arrowsup {
            transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
        }

        .arrowsdown {
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }
    </style>
</head>

<input type="hidden" id="FilePath" value="@Model.FilePath" />
<input type="hidden" id="documentKey" value="@Model.documentKey" />
<input type="hidden" id="documentNumberClick" value="@Model.AttachmentNumberClick" />
<input type="hidden" id="recordId" value="@Model.RecordId" />
<input type="hidden" id="crumbName" value="@Model.crumbName" />

<script src="/Scripts/AppJs/LeadtoolsFunctions.js"></script>
<script src="~/Scripts/AppJs/LeadtoolsEvents.js"></script>

<div class="content-wrapper" style="padding-left: 20px; margin-top: 87px;">
    <div Class="row m-r-le-t">
        <div Class="btn-toolbar">
            <div id="attachmentDivButton_id" Class="btn-group" data-toggle="tooltip" title="@Languages.Translation("Attachments")">
                <button class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="dropdown" type="button">
                    <i class="fa fa-paperclip fa-fw"></i>
                    <i class="fa fa-angle-down"></i>
                </button>
                <ul class="dropdown-menu btn_menu">
                    <li>
                        <a id="AddAttachmentId"> @Languages.Translation("lblmnuIndexAddAttachment")...</a>
                        <input type="file" id="FileUploadForAttach" name="FileUploadForAttach" multiple="multiple" style="display: none" />
                    </li>
                    <div id="optional_menu_doc" style="display:none">
                        <!--Note: Visible when pc files documents-->
                        <li>
                            @*<a id="AddVersion_Id">Add version's</a>*@
                            <a id="AddVersion_Id">@Languages.Translation("lblmnuIndexAddVersion")</a>
                            <input type="file" id="FileUploadVersion_id" name="FileUploadForversion" multiple="multiple" style="display: none" />
                        </li>
                        <li>
                            @*<a id="rename_doc_id">Rename Documents</a>*@
                            <a id="rename_doc_id">@Languages.Translation("lblmnuIndexRename")</a>
                        </li>
                        <li>
                            @*<a id="print"> Print Current file</a>*@
                            <a id="print"> @Languages.Translation("lblmnuIndexPrintCurtFile")</a>
                        </li>
                        <li>
                            @*<a id="CheckAll_id">Check All</a>*@
                            <a id="CheckAll_id">@Languages.Translation("lblmnuIndexCheckAll")</a>
                        </li>
                        @*<li>
                                <a id="currentPageGetText">Get Text For Current Page</a>
                            </li>
                            <li>
                                <a id="allPagesGetText">Get Text For All Pages</a>
                            </li>
                            <li>
                                <a id="selectAllText">Select All Text</a>
                            </li>
                            <li>
                                <a id="copyText">Copy Text</a>
                            </li>
                            <li>
                                <a id="findText">Find Text</a>
                            </li>*@
                    </div>
                    <!--if attachment is exist show this menu-->
                    @*<div id="attachmentMenuonOff">
                            <li>
                                <a id="AddVersionId"> Add Version(s)...</a>
                            </li>
                            <li>
                                <a id="RenameAttachmentId"> Rename Attachment</a>
                            </li>
                            <li>
                                <a id="CheckInAsOfficialId"> Check In As Official Record</a>
                            </li>
                            <li>
                                <a id="print"> Print</a>
                            </li>
                            <li>
                                <a id="DltAttachmentId"> Delete Attachment</a>
                            </li>
                        </div>*@
                    @*<div style="display:none" id="addAnddeletepagesonOff">
                            <li>
                                <a id="AddPageId"> Add Page(s)...</a>
                            </li>
                            <li>
                                <a id="DltPageId"> Delete Page</a>
                            </li>
                            <li>
                                <a id="DltVersionId"> Delete Version</a>
                            </li>
                        </div>*@
                </ul>
            </div>
            @*<div class="btn-group" data-toggle="tooltip" title="Edit" style="display:none">*@
            <!--Note: Visible when pc files documents-->
            @*<button class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="dropdown" type="button">
                        <i class="fa fa-hand-o-up fa-fw f-s-20" style="font-size: 20px; padding-right: 5px;"></i>
                        <i class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu btn_menu">

                    </ul>
                </div>*@
            <div class="btn-group" title="@Languages.Translation("View")">
                <button class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="dropdown" type="button">
                    <i class="fa fa-eye fa-fw"></i>
                    <i class="fa fa-angle-down"></i>
                </button>
                <ul class="dropdown-menu btn_menu">
                    <li>
                        <a id="rotateCounterClockwise">@Languages.Translation("tiHTML5ViewerRotateCounterClockwise")</a>
                    </li>
                    <li>
                        <a id="rotateClockwise">@Languages.Translation("tiHTML5ViewerRotateClockwise")</a>
                    </li>
                    <li>
                        <a id="zoomIn">@Languages.Translation("tiHTML5ViewerZoomIn")</a>
                    </li>
                    <li>
                        <a id="zoomOut">@Languages.Translation("tiHTML5ViewerZoomOut")</a>
                    </li>
                    <li>
                        <a id="actualSize">@Languages.Translation("tiHTML5ViewerActualSize")</a>
                    </li>
                    <li>
                        <a id="fit">@Languages.Translation("tiDocumentViewerFit")</a>
                    </li>
                    <li>
                        <a id="fitWidth">@Languages.Translation("tiHTML5ViewerFitWidth")</a>
                    </li>
                    <li>
                        <a id="fitHeight">@Languages.Translation("lblDocumentViewerFitHeight")</a>
                    </li>
                    <li>
                        <a id="documentProperties">@Languages.Translation("tiHTML5ViewerDocumentProperties")</a>
                    </li>
                </ul>
            </div>
            <div class="btn-group" data-toggle="tooltip" title="Page">
                <button class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="dropdown" type="button">
                    <i class="fa fa-file-text-o fa-fw"></i>
                    <i class="fa fa-angle-down"></i>
                </button>
                <ul class="dropdown-menu btn_menu">
                    <li>
                        <a id="singlePageDisplay">@Languages.Translation("tiHTML5ViewerSinglePageDisplay")</a>
                    </li>
                    <li>
                        <a id="doublePagesDisplay">@Languages.Translation("tiHTML5ViewerDoublePagesDisplay")</a>
                    </li>
                    <li>
                        <a id="verticalPagesDisplay">@Languages.Translation("tiHTML5ViewerVerticalPagesDisplay")</a>
                    </li>
                    <li>
                        <a id="horizontalPagesDisplay">@Languages.Translation("tiHTML5ViewerHorizontalPagesDisplay")</a>
                    </li>
                </ul>
            </div>
            @*<div class="btn-group">
                    <button class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="View Versions" type="button">
                        <i class="fa fa-code-fork fa-fw f-s-20"></i>
                    </button>
                </div>*@
            @*<div class="btn-group">
                    <button id="about" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="@Languages.Translation("Help")" type="button">
                        <i class="fa fa-question-circle-o fa-fw f-s-20"></i>
                    </button>
                </div>*@
            <div class="btn-group">
                <button id="magnifyGlassId" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="@Languages.Translation("lblmnuIndexMagniGlass")" type="button">
                    <i class="fa fa-binoculars fa-fw"></i>
                </button>
            </div>
            <div id="ocrDivButton_id" class="btn-group">
                <button id="OcrcallId" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="@Languages.Translation("lblmnuIndexGetText")" type="button">
                    <i class="fa fa-cut fa-fw"></i>
                </button>
            </div>
            <div id="checkOutFileDiv_id" class="btn-group" style="display:none">
                <button id="checkOutFile_id" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="@Languages.Translation("lblmnuIndexCheckout")" type="button">
                    <span class="fa-stack stack-custom">
                        <i class="fa fa-lock fa-fw"></i>
                    </span>
                </button>
            </div>
            @*checkout buttons show*@
            <div id="checkoutbutton_div_id" style="display:none">
                <div class="btn-group">
                    <button id="addpage_id" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="@Languages.Translation("lblmnuIndexAddPages")">
                        <span class="fa-stack stack-custom">
                            <i class="fa fa-file-text-o"></i>
                            <i class="fa fa-plus fa-stack-1x support-icon"></i>
                        </span>
                    </button>
                    <input type="file" id="addpageFromFile_id" style="display:none" />
                </div>
                <div class="btn-group">
                    <button id="deletePage_id" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="@Languages.Translation("lblmnuIndexDeletePage")">
                        <span class="fa-stack stack-custom">
                            <i class="fa fa-file-text-o"></i>
                            <i class="fa fa-close fa-stack-1x text-danger support-icon"></i>
                        </span>
                    </button>
                </div>
                <div class="btn-group">
                    <button id="cancelCheckout_id" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="@Languages.Translation("lblmnuIndexCancelCheckin")">
                        <span class="fa-stack stack-custom">
                            <i class="fa fa-lock" style="font-size:16px"></i>
                            <i class="fa fa-undo fa-stack-1x support-icon"></i>
                        </span>
                    </button>
                </div>
            </div>
            <div id="scannerid_Div" class="btn-group">
                <button id="ScanNew_id" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="@Languages.Translation("lblmnuIndexScanNewDoc")" type="button">
                    @*<span class="fa-stack stack-custom">
                            <i class="fa fa-barcode fa-fw"></i>
                        </span>*@
                    <img alt="Scan Documents" src="~/Images/scanner.png" />
                </button>
            </div>
            <div id="noteid_Div" class="btn-group">
                <button id="Noteid" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="@Languages.Translation("lblmnuIndexNotes")" type="button">
                    <span class="fa-stack stack-custom">
                        <i class="fa fa-sticky-note"></i>
                    </span>
                </button>
            </div>
            <div class="btn-group" style="display:none">
                <button id="saveScanNewAttachment_options" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="@Languages.Translation("lblmnuIndexSAveNewScantoAttach")" type="button">
                    <span class="fa-stack stack-custom">
                        <i class="fa fa-floppy-o fa-fw"></i>
                    </span>
                </button>
            </div>
            <div id="removePageFromscan_idDiv" class="btn-group" style="display:none">
                <button id="removePageFromscan_id" onclick="func.DeleteScanPages(true)" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="tooltip" title="@Languages.Translation("lblmnuIndexRemovePage")" type="button">
                    <span class="fa-stack stack-custom">
                        <i class="fa fa-file-text-o"></i>
                        <i class="fa fa-close fa-stack-1x text-danger support-icon"></i>
                    </span>
                </button>
            </div>
            @*on checkbox click show this div*@
            <div id="ifCheckboxcheckedDiv_id">
                <div class="btn-group" title="@Languages.Translation("lblmnuIndexAddAttachToCart")">
                    <button id="Addtocart_id" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="dropdown" type="button">
                        <i class="fa fa-shopping-cart"></i>
                    </button>
                    @*<span id="Addtocart_id" class="fa-stack" style="cursor:pointer">
                            <i class="fa fa-shopping-cart fa-stack-1x"></i>
                            <i class="fa fa-circle-thin fa-stack-2x"></i>
                        </span>*@
                    @*<button id="Addtocart_id" class="btn btn-danger" data-toggle="tooltip" title="Add to cart">
                            <i>Add to cart</i>
                        </button>*@
                </div>
                <div class="btn-group" title="@Languages.Translation("lblmnuIndexRemoveAttach")">
                    <button id="delete_files_id" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="dropdown" type="button">
                        <i class="fa fa-remove"></i>
                    </button>
                    @*<span id="delete_files_id" class="fa-stack" style="cursor:pointer">
                            <i class="fa fa-remove fa-stack-1x"></i>
                            <i class="fa fa-circle-thin fa-stack-2x"></i>
                        </span>*@
                    @*<button id="delete_files_id" class="btn btn-danger" data-toggle="tooltip" title="delete checked file">
                            <i>Delete files</i>
                        </button>*@
                </div>
                <div class="btn-group" title="@Languages.Translation("lblmnuIndexDownloadAttach")">
                    <button id="downloadfiles_id" class="btn btn-secondary dropdown-toggle tab_btn" data-toggle="dropdown" type="button">
                        <i class="fa fa-arrow-down"></i>
                    </button>
                    @*<span id="downloadfiles_id" class="fa-stack" style="cursor:pointer">
                            <i class="fa fa-arrow-down fa-stack-1x"></i>
                            <i class="fa fa-circle-thin fa-stack-2x"></i>
                        </span>*@
                    @*<button id="downloadfiles_id" class="btn btn-danger" data-toggle="tooltip" title="download attachments">
                            <i>Download Attachments</i>
                        </button>*@
                </div>
            </div>
            <div class="btn-group">
                <div title="@Languages.Translation("lblCurrentAttachment")" style="margin-top:10px; margin-left:38px">
                    <i id="showFilename_id" style="text-transform:uppercase; color:blue"></i>
                </div>
            </div>
            <div class="btn-group pull-right">
                @*<div id="divCustomSearch1">*@
                <div id="divCustomSearch1">
                    <div>
                        <input name="txtSearch" type="text" maxlength="256" id="txtSearch_id" title="@Languages.Translation("lblIndexEnterSearch")" class="form-control" autocomplete="off">
                    </div>
                    <div>
                        <i class="arrowsup" title="Previous" onclick="func.SearchForText(true, 'pre')"></i>
                        <i class="arrowsdown" title="Next" onclick="func.SearchForText(true, '')"></i>
                    </div>
                </div>
                <div style="display: inline-block;">
                    <i style="display:none" id="textOutput_id"></i>
                    @*<span onclick="func.SearchForText(true, 'pre')" class="glyphicon glyphicon-arrow-down"></span>*@
                </div>
            </div>

            @*<div id="divCustomSearch1" class="input-group search_box bottom_space">
                    <input name="txtSearch" type="text" maxlength="256" id="txtSearch" title="Search" class="form-control" autocomplete="off">
                    <span class="input-group-btn">
                        <button id="btnSearch" title="Search" class="btn btn-default glyphicon glyphicon-search"></button>
                    </span>
                </div>*@
        </div>
    </div>
</div>
<!--document viewer starting from here-->
<div id="docviewerPartial_ID" class="document-main clearfix">
    @Html.Partial("_DocviewerInit", Model)
</div>



<!--Dialogs_popup-->
<div id="customRenderModeDialog" class="modal fade" data-keyboard="false" tabindex="-1" role=" " aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">@Languages.Translation("tiDocumentViewerCustomRenderMode")</h4>
            </div>
            <div class="modal-body">
                <div class="groupBox">
                    <div class="row">
                        @Languages.Translation("lblDocumentViewerUsethetwoTxt")
                        @Languages.Translation("lblDocumentViewerExRedactionTxt")
                        <br />
                        <br />
                        <div class="col-xs-6 col-md-6">
                            <label>@Languages.Translation("lblDocumentViewerVisibleObjects")</label>
                            <div style="border: 1px solid darkgray;">
                                <select id="visibleObjectList" class="form-control listbox" multiple="multiple" size="15"></select>
                            </div>
                            <br />
                            <button id="moveToInvisible" type="button" class="btn btn-default" style="float: right;">&gt;&gt;</button>
                        </div>
                        <div class="col-xs-6 col-md-6">
                            <label>@Languages.Translation("lblDocumentViewerInvisibleObjects")</label>
                            <div style="border: 1px solid darkgray;">
                                <select id="invisibleObjectList" class="form-control listbox" multiple="multiple" size="15"></select>
                            </div>
                            <br />
                            <button id="moveToVisible" type="button" class="btn btn-default">&lt;&lt;</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="customRenderModeDlg_OK" class="btn btn-primary" data-dismiss="modal">@Languages.Translation("Ok").ToUpper()</button>
                <button class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
            </div>
        </div>
    </div>
</div>
<div id="documentPropertiesDialog" class="modal fade" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header text-right">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">@Languages.Translation("tiHTML5ViewerDocumentProperties")</h4>
            </div>
            <div class="modal-body">
                <div class="panel-group" id="dialogPanelsContainer">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="modal-title">
                                @*<a class="accordion-toggle" data-toggle="collapse" data-parent="#dialogPanelsContainer" href="#documentInfoPanel">*@
                                <label style="border: none;">@Languages.Translation("lblDocumentViewerDocumentInfo")</label>
                                @*</a>*@
                            </h4>
                        </div>
                        <div id="documentInfoPanel">
                            <!--class="panel-collapse collapse"-->
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered">
                                    <thead id="tblHead">
                                        <tr>
                                            <th>@Languages.Translation("lblDocumentViewerKey")</th>
                                            <th>@Languages.Translation("lblDocumentViewerValue")</th>
                                        </tr>
                                    </thead>
                                    <tbody id="documentInfo"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    @*<div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="modal-title">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#dialogPanelsContainer" href="#metadataPanel">
                                        <label class="collapse-expand toggleToExpand" style="border: none;">@Languages.Translation("lblDocumentViewerMetadata")</label>
                                    </a>
                                </h4>
                            </div>
                            <div id="metadataPanel" class="panel-collapse collapse">
                                <div class="table-responsive" style="border: 1px solid silver;">
                                    <table class="table table-striped table-bordered">
                                        <thead id="tblHeads">
                                            <tr>
                                                <th>@Languages.Translation("lblDocumentViewerKey")</th>
                                                <th>@Languages.Translation("lblDocumentViewerValue")</th>
                                            </tr>
                                        </thead>
                                        <tbody id="metadata"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>*@
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-sm-12 text-right">
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Close")</button>
                </div>

            </div>
        </div>
    </div>
</div>
<!-- Print dialog -->
<div id="printDialog" class="modal fade" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">
                    @*<span class="theme_color">*@@Languages.Translation("titlPrintDlgPrintOption")@*</span>*@
                </h4>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-noborder table-form">
                        <tbody>
                            <tr>
                                <td valign="middle"> @Languages.Translation("lblDocViewerPages"):</td>
                                <td>
                                    <div class="radio">
                                        <label> <input type="radio" name="pageOption" value="0" checked>@Languages.Translation("lblPrintDlgPrintAll")</label>
                                    </div>
                                </td>
                                <td>
                                    <div class="radio">
                                        <label> <input type="radio" name="pageOption" value="1">@Languages.Translation("lblPrintDlgPrintCurnt")<span id="printCurrentPageLabel"></span></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="radio">
                                        <label style="width:100%;display:block">
                                            <input type="radio" name="pageOption" value="2">
                                            <input id="pages" type="text" placeholder="e.g. 1-3, 5" class="form-control input-xs" />
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle"> @Languages.Translation("lblPrintDlgOrientation") :</td>
                                <td colspan="3">
                                    <select id="orientation" class="form-control">
                                        <option selected="selected" value="0">Portrait</option>
                                        <option value="1"> Landscape</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle"> @Languages.Translation("lblDocViewerPageSize") :</td>
                                <td colspan="3">
                                    @*<div class="print-message">(Size of first page is<span id="print_documentSize"></span>. Pages are resized by fit-width.)</div>*@
                                    <div class="print-message">(@Languages.Translation("lblPrintDlgInfoMessage1")<span id="print_documentSize"></span>. @Languages.Translation("lblPrintDlgInfoMessage2"))</div>
                                    <select id="pageSize" class="form-control"></select>
                                </td>
                            </tr>
                            @*<tr>
                                    <td valign="middle"> @Languages.Translation("lblPrintDlgAdditionalOpt") :</td>
                                    <td colspan="2">
                                        <div id="showAnnotationsContainer" class="pull-left m-t-10">
                                            <input id="showAnnotations" type="checkbox" />
                                            <label for="showAnnotations">@Languages.Translation("lblPrintDlgShowAnnotations")</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div id="removeMarginsContainer" class="pull-left m-t-10">
                                            <input id="removeMargins" type="checkbox" />
                                            <label for="removeMargins">@Languages.Translation("lblPrintDlgRemoveMargins")</label>
                                        </div>
                                    </td>
                                </tr>*@
                        </tbody>
                    </table>
                </div>
                @*<div class="groupBox">
                        <label> Pages</label>
                        <div id="printPagesMessageContainer"></div>
                        <div class="form">
                            <div class="radio">
                                <label> <input type="radio" name="pageOption" value="0" checked>Print All</label>
                            </div>
                            <div class="radio">
                                <label> <input type="radio" name="pageOption" value="1">Print Current<span id="printCurrentPageLabel"></span></label>
                            </div>
                            <div class="radio">
                                <label style="width:100%;">
                                    <input type="radio" name="pageOption" value="2">
                                    <input id="pages" type="text" placeholder="e.g. 1-3, 5" class="form-control input-xs" />
                                </label>
                            </div>
                        </div>
                    </div>*@
                @*<div class="groupBox">
                        <p> Orientation : </p>
                        <select id="orientation" class="form-control">
                            <option selected="selected" value="0">Portrait</option>
                            <option value="1"> Landscape</option>
                        </select>
                        <br />
                        <p> Page Size:</p>
                        <p class="print-message">(Size of first page is<span id="print_documentSize"></span>. Pages are resized by fit-width.)</p>
                        <select id="pageSize" class="form-control"></select>
                        <br />
                        <p> Additional Options:</p>
                        <div id="showAnnotationsContainer">
                            <input id="showAnnotations" type="checkbox" />
                            <label for="showAnnotations">Show Annotations</label>
                        </div>
                        <div id="removeMarginsContainer">
                            <input id="removeMargins" type="checkbox" />
                            <label for="removeMargins">Remove Margins</label>
                        </div>
                    </div>*@
            </div>
            <div class="modal-footer">
                <div class="pull-right">
                    <button id="doPrint" class="btn btn-primary">@Languages.Translation("Print")</button>
                    <button class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div>
    <!-- Print containers -->
    <!-- i'm referring to the one below oh sorry -->
    <div id="printDiv" class="lt-print print-div">
    </div>
    <iframe style="display:none" id="printFrame" class="lt-print print-frame"></iframe>
</div>
<!--modal is used when single attachment is attached to record-->
<div id="WriteAttachmentName" class="modal fade" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header text-left">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">@Languages.Translation("tiHTML5ViewerName_nameAttachment")</h4>
            </div>
            <div class="modal-body">
                <div class="form-horizontal row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label ID="AttachmentLabelID" name="AttachmentLabelName" class="control-label col-sm-4">Name:</label>
                            <div class="col-sm-8">
                                <input ID="AttachmentID" placeholder="@Languages.Translation("lblWriteAttachFileName")" name="AttachmentName" AutoCompleteType="Disabled" MaxLength="50" class="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-sm-12 text-right">
                    <button ID="AddAttachmentBtnOk" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    @*<button ID="BtnRename" class="btn btn-primary" onclick="BtnRename_Click">Don't Rename</button>*@
                    <button type="button" id="BtnCancel" name="BtnCancel" data-dismiss="modal" aria-hidden="true" class="btn btn-default">@Languages.Translation("Close")</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="WriteRenameAttachmentName" class="modal fade" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header text-left">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">@Languages.Translation("tiHTML5ViewerName_RenameAttachment")</h4>
            </div>
            <div class="modal-body">
                <div class="form-horizontal row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label ID="AttachmentLabelID" name="AttachmentLabelName" class="control-label col-sm-4">@Languages.Translation("Rename"):</label>
                            <div class="col-sm-8">
                                <input ID="RenameAttachmentID" placeholder="@Languages.Translation("lblWriteAttachFileName")" name="AttachmentName" AutoCompleteType="Disabled" MaxLength="50" class="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-sm-12 text-right">
                    <button ID="RenameAttachmentBtnOk" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    @*<button ID="BtnRename" class="btn btn-primary" onclick="BtnRename_Click">Don't Rename</button>*@
                    <button type="button" id="BtnCancel" name="BtnCancel" data-dismiss="modal" aria-hidden="true" class="btn btn-default">@Languages.Translation("Close")</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="Messages_short_Id" class="modal fade" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <label></label>
            </div>
        </div>
    </div>
</div>

<!--delete attachment confirm dialog-->
<div id="ConfirmDeleteAttachmentDialog_id" class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header text-right">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="DeleteModalLabel">
                    <label class="control-label">@Languages.Translation("msgJsDelConfim")</label>
                </h4>
            </div>
            <div class="modal-body">
                <div class="control-label" style="line-height: 1.50;max-height:300px;overflow:auto">
                    <ul id="DeleteAttachmentList" class="attachment-list"></ul>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col-md-12 text-right">
                    <input type="button" ID="DelAttachmentsaccept" value="@Languages.Translation("Ok")" class="btn btn-primary">
                    <input type="button" ID="DelAttachCancel" value="@Languages.Translation("Cancel")" class="btn btn-default" data-dismiss="modal" aria-hidden="true">
                </div>
            </div>
        </div>
    </div>
</div>

<!--Shoping cart-->
<div id="cartList_dialog" class="modal fade" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="">
                    @*<h3>@Languages.Translation("lblAttachCartDlgTitle")</h3>*@
                    @Languages.Translation("lblAttachCartDlgTitle")
                </h4>
            </div>

            <div class="modal-body" style="max-height:400px;overflow:auto">
                <table class="table table-stripe">
                    <thead>
                        <tr>
                            <th>@Languages.Translation("Attachment")</th>
                            <th>@Languages.Translation("toolHTMLToolsRecord")</th>
                            <th><input type="checkbox" id="checkallattachmentCartId" /></th>
                        </tr>
                    </thead>
                    <tbody style="overflow:scroll"></tbody>
                </table>
            </div>
            <div class="modal-footer">
                <div class="col-md-12 text-right">
                    <button class="btn btn-primary" id="downloadCart">@Languages.Translation("Download")</button>
                    <button class="btn btn-default" id="removeFromCart">@Languages.Translation("Remove")</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="PdfConvertorDialog_id" class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header text-right">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title alert alert-danger"></h4>
            </div>
        </div>
    </div>
</div>
<div id="TextDialogid" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header text-left">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    @*<span aria-hidden="true">&times;</span>*@×
                </button>
                <h4 class="modal-title">@Languages.Translation("hdrModelGetText")</h4>
            </div>
            <div class="modal-body">
                <textarea name="textreturn" cols="100" rows="15"></textarea>
            </div>
        </div>
    </div>
</div>
<!--Scanning dialog-->
<div id="downloadMSI" class="modal fade" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog about-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <label>@Languages.Translation("msgScanDlgInfoMsg")</label>
                <br />
                <a href="/TabfusionRMS.WebScanning.Setup.msi">@Languages.Translation("msgScanDlgSoftDownloadLink")</a>
            </div>
        </div>
    </div>
</div>
<div id="GetScansources_id" class="modal fade" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog about-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <label>@Languages.Translation("msgScanResDlgSelectSource")</label>
                <br />
                <select class="form-control" id="selecttwain_id"></select>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="scanBtnClick">@Languages.Translation("mnuJsScannerScan")</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">@Languages.Translation("Close")</button>
            </div>
        </div>
    </div>
</div>
<div id="scanSaveNewDlg" class="modal fade" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header text-left">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">@Languages.Translation("tiHTML5ViewerName_RenameAttachment")</h4>
            </div>
            <div class="modal-body">
                <div class="form-horizontal row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label ID="AttachmentLabelID" name="AttachmentLabelName" class="control-label col-sm-4">@Languages.Translation("tiHTML5ViewerName_Rename")</label>
                            <div class="col-sm-8">
                                <input ID="AttachmentNameID" placeholder="@Languages.Translation("lblWriteAttachFileName")" name="AttachmentName" AutoCompleteType="Disabled" MaxLength="50" class="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-horizontal row">
                    <div class="col-sm-12">
                        <div class="col-ms-4"></div>
                        <div id="scSaveOptions" class="col-sm-8 pull-right">
                            <select id="selectFormatid" style="margin-left: -6px; width:35%" class="form-control">
                                <option value="1">Save As TIFF</option>
                                <option value="2">Save As PDF</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <div class="col-sm-12 text-right">
                    <button ID="AddAttachmentScanBtnOk" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    @*<button ID="BtnRename" class="btn btn-primary" onclick="BtnRename_Click">Don't Rename</button>*@
                    <button type="button" id="BtnscanCancel" name="BtnCancel" data-dismiss="modal" aria-hidden="true" class="btn btn-default">@Languages.Translation("Close")</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="Notelist_dialog" class="modal fade" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">
                    @Languages.Translation("lblmnuIndexNotes")

                </h4>
            </div>
            <div class="modal-body">
                <table class="table table-stripe">
                    <thead>
                        <tr>
                            <th>@Languages.Translation("lblNoteDlggrdDateCol")</th>
                            <th>@Languages.Translation("lblNoteDlggrdNote")</th>
                            <th>@Languages.Translation("lblNoteDlggrdAuther")</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <div class="col-md-12 text-right">
                    <span title="@Languages.Translation("lblNoteDlgAddNote")" style="cursor:pointer; margin-left: 5px" class="btn btn-primary" id="addNewRow">Add</span>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!--rename attachment dialog-->
<div id="RenameAttachmentDialog" class="modal fade" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <label>@Languages.Translation("tiHTML5ViewerRenameAttchment") - <span style="color:blue"></span></label>
                <div class="row">
                    <div class="col-xs-7"><input class="form-control" /></div>
                    <div class="col-xs-5"><button id="submitRenameId" class="btn btn-primary">@Languages.Translation("Submit")</button></div>
                </div>


            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    //global variables;
    var ActiveFunction = true;
    //var firstCallFunc = false;
    $(document).ready(function () {
        //first entery to documentviewer
        //reset scanner service
        $("body").on("click", "#thumbnailsTabBtn", function () {
            $(this).addClass('active');
            $(pel.attachmentBtn).removeClass('active');
            $(pel.thumbnailDiv).show();
            $(pel.attachListDiv).hide();
            $(pel.versionsListDiv).hide();
            //$(pel.splitter).show();
        });
        $("body").on("click", "#attachmentBtn", function () {
            $(this).addClass('active');
            $(pel.thumnailBtn).removeClass('active');
            $(pel.thumbnailDiv).hide();
            $(pel.versionsListDiv).hide();
            $(pel.attachListDiv).show();
            //$(pel.splitter).hide();
        });
        $("#thumnailBtn").trigger("click");
        //$(pel.attachmentBtn).trigger('click');

        //function initiator;
        //click on attachment
        $('body').on('click', '#attachmentsList a', function (e) {
            e.preventDefault()
            var _this = this;
            func.FirstClickAttachment(_this, ActiveFunction, false)
        });
        var checkTwain = localStorage.getItem("isTwainConnectionfailed");
        if (checkTwain == "true") {
            localStorage.setItem("isTwainConnectionfailed", false);
            $("#ScanNew_id").trigger("click")
        } 
    });

    setTimeout(function () {
        func.Runstartup(true);
    }, 50);


</script>
