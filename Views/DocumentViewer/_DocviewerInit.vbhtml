
@Code

End Code
<style>

    .list-group-item > .badge {
        background-color: transparent;
        position: absolute;
        left: 0px;
        float: inherit;
    }

    .badge input[type="checkbox"], input[type="radio"] {
        margin: 0
    }

    #attachmentsList .list-group .list-group-item {
        margin-bottom: 3px;
        border: 1px dashed #d4d4d4;
        white-space: normal;
        padding-left: 25px;
    }

    .list-group-item.active {
        background-color: yellow;
    }

    .attachment-container {
        float: left;
        min-width: 250px;
        border: 1px solid gray;
    }

    .page-container {
        margin: 20px;
    }

    .content-wrapper {
        margin-left: 0;
        margin-top: 70px
    }
    /* horizontal panel*/

    .panel-container {
        display: flex;
        flex-direction: row;
        border: 1px solid silver;
        overflow: hidden;
        /* avoid browser level touch actions */
        /*xtouch-action: none;*/
    }

    .panel-left {
        flex: 0 0 auto;
        /* only manually resize */
        padding: 10px;
        width: 250px;
        min-height: 700px;
        /*min-width: 150px;*/
        white-space: nowrap;
        color: white;
    }

    .splitter {
        flex: 0 0 auto;
        width: 14px;
        background: url(https://raw.githubusercontent.com/RickStrahl/jquery-resizable/master/assets/vsizegrip.png) center center no-repeat #666666;
        min-height: 200px;
        cursor: col-resize;
    }

    .panel-right {
        flex: 1 1 auto;
        /* resizable */
        padding: 10px;
        width: 75%;
        min-height: 700px;
        /*min-width: 200px;*/
        background: aliceblue;
    }


    /* vertical panel */

    .panel-container-vertical {
        display: flex;
        flex-direction: column;
        height: 500px;
        border: 1px solid silver;
        overflow: hidden;
    }

    .panel-top {
        flex: 0 0 auto;
        /* only manually resize */
        padding: 10px;
        height: 150px;
        width: 100%;
        white-space: nowrap;
        background: #838383;
        color: white;
    }

    .splitter-horizontal {
        flex: 0 0 auto;
        height: 18px;
        background: url(https://raw.githubusercontent.com/RickStrahl/jquery-resizable/master/assets/hsizegrip.png) center center no-repeat #535353;
        cursor: row-resize;
    }

    .panel-bottom {
        flex: 1 1 auto;
        /* resizable */
        padding: 10px;
        min-height: 200px;
        background: #eee;
    }

    pre {
        margin: 20px;
        padding: 10px;
        background: #eee;
        border: 1px solid silver;
        border-radius: 4px;
        overflow: auto;
    }

    .stack-custom {
        width: inherit;
        height: inherit;
        line-height: inherit;
    }

    .support-icon {
        padding: 10px 0px 0px 8px;
        font-size: 10px;
    }

    .print-message {
        position: relative;
        top: 5px;
    }
</style>

<link href="~/Content/themes/TAB/css/progress.css" rel="stylesheet" />

<div class="row">
    <div class="panel-container">
        <div class="col-md-5 col-sm-5 panel-left">
            <div class="left">
                <div class="sidebarContainer">
                    <div class="ContentDiv-left">
                        <div id="thumbnailsBookmarksPanel">
                            <ul class="nav nav-tabs" style="float: left;">
                                <li class="active"><a id="attachmentBtn" data-toggle="tab">@Languages.Translation("lblDocViewerInitAttachment")</a></li>
                                @*<li class="" id="varsionTab"><a id="versionBtn" href="#versionsList" data-toggle="tab">Ver</a></li>*@
                                <li class=""><a id="thumbnailsTabBtn" data-toggle="tab">@Languages.Translation("lblDocViewerInitPages")</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-conent sidebar-tab-conent">
                <div id="thumbnailsTab" style="display:none">

                </div>
                <div id="attachmentsList" style="height:100%;width:100%">
                    @*<div class="list-group" role="tablist">*@

                    <input type="hidden" id="errorMsg" value="@Model.ErrorMsg" />
                    <ul class="list-group">
                        @For Each doc In Model.AttachmentList
                            @If doc.HasAnnotation > 0 Then
                                @<li class="list-group-item d-flex justify-content-between align-items-center" style="text-align:left"><a draggable="false" href="*">@doc.FileName - <span style="color:brown">[V @doc.VersionNumber]</span></a><span class="badge"><input type="checkbox" style="display:none" /></span><input type="hidden" value="@doc.attchNumber" title="attachNum" /><input type="hidden" value="@doc.VersionNumber" title="versionNum" /><input type="hidden" value="@doc.PageNumber" title="pageNum" /><input type="hidden" value="@doc.RecordType" title="recordType" /><input type="hidden" value="@doc.Note" title="notCount" /><input type="hidden" value="@doc.PointerId" title="pointerId" /><input type="hidden" value="@doc.TrackbleId" title="trackingid" /><input type="hidden" value="@doc.HasAnnotation" title="Annotation" /></li>
                            Else
                                @<li class="list-group-item d-flex justify-content-between align-items-center" style="text-align:left"><a draggable="false" href="@doc.path">@doc.FileName - <span style="color:brown">[V @doc.VersionNumber]</span></a><span class="badge"><input type="checkbox" /></span><input type="hidden" value="@doc.attchNumber" title="attachNum" /><input type="hidden" value="@doc.VersionNumber" title="versionNum" /><input type="hidden" value="@doc.PageNumber" title="pageNum" /><input type="hidden" value="@doc.RecordType" title="recordType" /><input type="hidden" value="@doc.Note" title="notCount" /><input type="hidden" value="@doc.PointerId" title="pointerId" /><input type="hidden" value="@doc.TrackbleId" title="trackingid" /><input type="hidden" value="@doc.HasAnnotation" title="Annotation" /></li>
                            End If
                        Next
                    </ul>
                    @*</div>*@
                </div>
                @*<div id="versionsList" style="display:none">
                        <div class="list-group" role="tablist">

                        </div>
                    </div>*@
                @*<div class="attachment-block">
                        <img id="loadingThumbnailsBar" src="../Resources/Images/LoadingBar-Small.gif" />
                    </div>*@
                @*<div class="attachment-block">
                        <img class="img-responsive" src="~/Images/attachment.PNG" style="height:250px">
                        <span>Attachment 2</span>
                    </div>
                    <div class="attachment-block">
                        <img class="img-responsive" src="~/Images/attachment.PNG" style="height:250px">
                        <span>Attachment 3</span>
                    </div>*@
            </div>
        </div>
        <div id="spliter_id" class="splitter">

        </div>
        <div class="panel-right col-md-7 col-md-7">
            <!-- The viewer will be dynamically created inside imageViewerDiv -->
            <div class="document-area">
                <div id="imageViewerDiv">

                </div>
            </div>
            <div class="clearfix"></div>
            <!-- Start Footer -->
            <div class="outerToolbarContainer">
                <div class="toolbar footerToolbarDiv">
                    <div class="inputGroupContainer">
                        <div class="input-group">
                            <div class="input-group-btn">
                                <!-- Previous page -->
                                <button id="previousPage_shortcut" class="btn btn-default btn-sm btn-docopt" title="@Languages.Translation("PreviousPage")">
                                    <i class="fa fa-arrow-left"></i>
                                </button>
                                <!-- Next page -->
                                <button id="nextPage_shortcut" class="btn btn-default btn-sm btn-docopt" title="@Languages.Translation("NextPage")">
                                    <i class="fa fa-arrow-right"></i>
                                </button>
                            </div>
                            <input id="pageNumber" type="text" class="form-control input-sm btn-docopt" style="float: none; width: 50px;">
                            <span id="pageCount" class="input-group-addon">/ 1</span>
                        </div>
                    </div>
                    <div class="inputGroupContainer">
                        <div class="input-group">
                            <div class="input-group-btn">
                                <button id="zoomIn_shortcut" class="btn btn-default btn-sm btn-docopt">
                                    <i class="fa fa-search-plus"></i>
                                </button>
                                <button id="zoomOut_shortcut" class="btn btn-default btn-sm btn-docopt">
                                    <i class="fa fa-search-minus"></i>

                                </button>
                            </div>
                            <select id="zoomValues" class="form-control input-sm" style="float: none;">
                                <option id="currentZoomValue" style="display: none;" disabled></option>
                                <option>10%</option>
                                <option>25%</option>
                                <option>50%</option>
                                <option>75%</option>
                                <option>100%</option>
                                <option>125%</option>
                                <option>200%</option>
                                <option>400%</option>
                                <option>800%</option>
                                <option>1600%</option>
                                <option>2400%</option>
                                <option>3200%</option>
                                <option>6400%</option>
                                <option selected>@Languages.Translation("tiHTML5ViewerActualSize")</option>
                                <option>@Languages.Translation("lblDocumentViewerFitPage")</option>
                                <option>@Languages.Translation("tiHTML5ViewerFitWidth")</option>
                                <option>@Languages.Translation("lblDocumentViewerFitHeight")</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@*<div id="ProgressloadingDialog" class="modal" tabindex="-1" role="dialog" style="display:block; margin-top:20%;margin-left:50%">*@
@*<div class="modal-dialog loading-dialog" role="document">*@
@*<div class="modal-content" style="width: 190px; background-color: transparent">*@
@*<div class="modal-body">*@
<div id="ProgressloadingDialog" class="modal" tabindex="-1" role="dialog" style="margin-top:20%;margin-left:50%">
    <label style="color:rgb(0, 161, 225)"></label>
    <div class="row">
        <div class="col-md-3 col-sm-6">
            <div class="progress blue">
                <span class="progress-left">
                    <span class="progress-bar"></span>
                </span>
                <span class="progress-right">
                    <span class="progress-bar"></span>
                </span>
                <div class="progress-value"><span id="progressPercentage"></span></div>
            </div>
        </div>
    </div>
</div>
@*</div>*@
@*</div>*@
@*</div>*@
@*</div>*@
<div id="spinningWheel" style="display:none" class="loaderMain-wrapper">
    <div class="loaderMain"></div>
</div>

<script type="text/javascript">
    //window.onafterprint = function () {
    //    console.log("Printing completed...");
    //    $("#spinningWheel").hide();
    //}

    $(document).ajaxStart(function (event) {
        $("#spinningWheel").show();
    }).ajaxStop(function () {
        $("#spinningWheel").hide();
    });


    func.RunstartupPartialView(true);

    //activate drag and drop
    func.DragAnddropNewFileToclips();
    func.DragAnddropNewFileToDiv();
    func.TableName = '@Model.TableName'
    func.TableId = '@Model.Tableid'
</script>

