@Imports TabFusion.Modals.Models
@ModelType View
@Using Html.BeginForm("SetReportDefinitionValues", "Admin", FormMethod.Post, New With {.id = "frmReportDefinitionsPartial", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnUrl")})
    @<section class="content">
        <div id="parent">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="txtReportName">@Languages.Translation("lblReportDefinitionsPartialRptName")</label>
                        <div class="col-md-8">
                            <input type="text" class="form-control" id="txtReportName" name="ReportName" maxlength="60" />
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="lstReportStyle">@Languages.Translation("lblReportDefinitionsPartialRptStyle")</label>
                        <div class="col-md-8">
                            <select id="lstReportStyle" class="form-control" name="ReportSyle"></select>
                        </div>
                    </div>
                </div>
            </div>

            <div id="tabList" class="tab-content" style="margin-top:10px;">
                <ul class="nav nav-tabs nav-justified nav-cus">
                    <li class="active" id="liPane1"><a id="aPane1" href="#pane1" data-toggle="tab">@Languages.Translation("mnuReportDefinitionsPartialLvl1")</a></li>
                    <li id="liPane2"><a id="aPane2" href="#pane2" data-toggle="tab">@Languages.Translation("mnuReportDefinitionsPartialLvl2")</a></li>
                    <li id="liPane3"><a id="aPane3" href="#pane3">@Languages.Translation("mnuReportDefinitionsPartialLvl3")</a></li>
                </ul>
                <div id="pane1" class="tab-pane active cus-tabs" role="tabpanel">

                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">
                                        @Languages.Translation("Table")
                                    </label>
                                    <div class="col-md-8">
                                        <select id="lstLevel1TblName" class="form-control" name="TableName_Level1"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">
                                        @Languages.Translation("View")
                                    </label>
                                    <div class="col-md-8">
                                        <select id="lstLevel1ViewName" class="form-control" name="ViewName_Level1"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <input type="hidden" id="hdnLstLevel1ViewColChkStates" value="0" name="ViewColChkStates_Level1" />
                            <input type="hidden" id="hdnLstLevel1ViewCols" value="0" name="ViewColList_Level1" />
                            <input type="hidden" id="hdnLevel1ID" value="0" name="ViewID_Level1" />
                            <input type="hidden" id="hdnInitialLevel1ID" value="0" name="InitialViewID_Level1" />
                            <div class="col-md-6">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tlReportDefinitionsPartialIncludedCols")</legend>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="btn-toolbar">
                                                <button type="button" id="btnLevel1Add" class="btn btn-primary">@Languages.Translation("Add")</button>
                                                <button type="button" id="btnLevel1Edit" class="btn btn-primary">@Languages.Translation("Edit")</button>
                                                <button type="button" id="btnLevel1Delete" class="btn btn-primary">@Languages.Translation("Delete")</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div id="lstLevel1TblColumns">
                                                <ul id="ulLevel1Cols" class="list-group available_listgroup" style="height: 156px !important"></ul>
                                            </div>
                                        </div>
                                        @*<div class="col-sm-4 col-md-6">
                                            <div class="col-sm-2 col-md-1">
                                            <div class="row">
                                            <div class="col-sm-2 col-md-1">
                                            <button type="button" id="btnLevel1Add" class="btn btn-primary">Add</button>
                                            </div>
                                            </div>
                                            <div class="row">
                                            <div class="col-sm-2 col-md-1">
                                            <button type="button" id="btnLevel1Edit" class="btn btn-primary" style="margin-top:2px;">Edit</button>
                                            </div>
                                            </div>
                                            <div class="row">
                                            <div class="col-sm-2 col-md-1">
                                            <button type="button" id="btnLevel1Delete" class="btn btn-primary" style="margin-top:2px;">Delete</button>
                                            </div>
                                            </div>
                                            </div>
                                            </div>*@
                                        @*<div class="col-sm-1 col-md-1" style="margin-left:15px ;margin-top:15px">
                                            <button type="button" class="btn btn-default" aria-label="Up" id="btnLevel1Up">
                                            <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
                                            </button>
                                            <button type="button" class="btn btn-default" aria-label="Down" id="btnLevel1Down">
                                            <span class="glyphicon glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
                                            </button>
                                            </div>*@
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="btn-toolbar">
                                                <button type="button" id="btnLevel1SelectAll" class="btn btn-primary">@Languages.Translation("cbSelectAll")</button>
                                                <button type="button" id="btnLevel1UnselectAll" class="btn btn-primary">@Languages.Translation("btnReportDefinitionsPartialUnselectAll")</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-lg-4 col-md-5 control-label" for="lstLevel1TrackingHis">
                                            @Languages.Translation("lblReportDefinitionsPartialTrackingHistory")
                                        </label>
                                        <div class="col-lg-8 col-md-7">
                                            <select id="lstLevel1TrackingHis" class="form-control"></select>
                                        </div>
                                    </div>
                                    <div class="form-group bottom_space">
                                        <div class="col-lg-4 col-md-5"></div>
                                        <div class="col-lg-8 col-md-7">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel1IncludeTrackedObj" name="TrackingEverContained_Level1" />
                                                <label class="checkbox-inline" for="chkLevel1IncludeTrackedObj"> @Languages.Translation("chkReportDefinitionsPartialIncludeTrackedobjsEverConained")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-4 col-md-5 control-label" for="txtLevel1LeftIntent">
                                            @Languages.Translation("lblReportDefinitionsPartialLftIndent")
                                        </label>
                                        <div class="col-lg-4 col-md-7">
                                            <input type="text" class="form-control" id="txtLevel1LeftIntent" value="0" name="LeftIndent_Level1" maxlength="6" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-4 col-md-5 control-label" for="txtLevel1RightIntent">
                                            @Languages.Translation("lblReportDefinitionsPartialRgtIndent")
                                        </label>
                                        <div class="col-lg-4 col-md-7">
                                            <input type="text" class="form-control" id="txtLevel1RightIntent" value="0" name="RightIndent_Level1" maxlength="6" />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-md-6">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tlReportDefinitionsPartialPrinting")</legend>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel1GrandTotal" name="GrandTotal_Level1" />
                                                <label class="checkbox-inline" for="chkLevel1GrandTotal">@Languages.Translation("chkReportDefinitionsPartialGrandTotalPageOnly")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel1IncludeImg" name="PrintImages_Level1" />
                                                <label class="checkbox-inline" for="chkLevel1IncludeImg">@Languages.Translation("chkReportDefinitionsPartialIncludeImages")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel1IncludeHeaders" name="SuppressHeader_Level1" />
                                                <label class="checkbox-inline" for="chkLevel1IncludeHeaders">@Languages.Translation("chkReportDefinitionsPartialIncludeHeaders")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel1IncludeFooters" name="SuppressFooter_Level1" />
                                                <label class="checkbox-inline" for="chkLevel1IncludeFooters">@Languages.Translation("chkReportDefinitionsPartialIncludeFooters")</label>
                                            </div>
                                        </div>
                                    </div>

                                    <fieldset id="fldImagesLevel1" class="admin_fieldset">
                                        <legend>@Languages.Translation("chkReportDefinitionsPartialIncludeImages")</legend>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel1ImgSeperatePage" name="PrintImageFullPage_Level1" />
                                                    <label class="checkbox-inline" for="chkLevel1ImgSeperatePage">@Languages.Translation("chkReportDefinitionsPartialPrintImageOnSepPage")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel1FirstImgOnly" name="PrintImageFirstPageOnly_Level1" />
                                                    <label class="checkbox-inline" for="chkLevel1FirstImgOnly">    @Languages.Translation("chkReportDefinitionsPartialPrintFirstPageOfImageOnly")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel1Annotations" name="PrintImageRedlining_Level1" />
                                                    <label class="checkbox-inline" for="chkLevel1Annotations"> @Languages.Translation("chkReportDefinitionsPartialIncludeAnnotations")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel1DataRow" name="SuppressImageDataRow_Level1" />
                                                    <label class="checkbox-inline" for="chkLevel1DataRow">@Languages.Translation("chkReportDefinitionsPartialPrintDataRow")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel1ImgFileInfo" name="SuppressImageFooter_Level1" />
                                                    <label class="checkbox-inline" for="chkLevel1ImgFileInfo"> @Languages.Translation("chkReportDefinitionsPartialIncludeImgFileInformation")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="col-lg-6 col-md-5 control-label" for="txtLevel1LeftMargin">
                                                        @Languages.Translation("lblReportDefinitionsPartialLftMargin")
                                                    </label>
                                                    <div class="col-lg-6 col-md-7">
                                                        <input type="text" class="form-control" id="txtLevel1LeftMargin" value="0" name="PrintImageLeftMargin_Level1" maxlength="6" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="col-lg-6 col-md-5 control-label" for="txtLevel1RightImgWidth">
                                                        @Languages.Translation("lblReportDefinitionsPartialImgWidth")
                                                    </label>
                                                    <div class="col-lg-6 col-md-7">
                                                        <input type="text" class="form-control" id="txtLevel1RightImgWidth" value="0" name="PrintImageRightMargin_Level1" maxlength="6" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </fieldset>
                            </div>
                        </div>
                    </div>

                </div>
                <div id="pane2" class="tab-pane cus-tabs" role="tabpanel">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">
                                        @Languages.Translation("Table")
                                    </label>
                                    <div class="col-md-8">
                                        <select id="lstLevel2TblName" class="form-control" name="TableName_Level2"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">
                                        @Languages.Translation("View")
                                    </label>
                                    <div class="col-md-8">
                                        <select id="lstLevel2ViewName" class="form-control" name="ViewName_Level2"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @*<div class="row">
                            <div class="col-sm-12 col-md-1">
                            Table:
                            </div>
                            <div class="col-sm-12 col-md-4">
                            <select id="lstLevel2TblName" class="form-control" name="TableName_Level2"></select>
                            </div>
                            <div class="col-sm-12 col-md-1">
                            View:
                            </div>
                            <div class="col-sm-12 col-md-4">
                            <select id="lstLevel2ViewName" class="form-control" name="ViewName_Level2"></select>
                            </div>
                            </div>*@
                        <div class="row">
                            <input type="hidden" id="hdnLstLevel2ViewColChkStates" value="0" name="ViewColChkStates_Level2" />
                            <input type="hidden" id="hdnLstLevel2ViewCols" value="0" name="ViewColList_Level2" />
                            <input type="hidden" id="hdnLevel2ID" value="0" name="ViewID_Level2" />
                            <input type="hidden" id="hdnInitialLevel2ID" value="0" name="InitialViewID_Level2" />
                            <input type="hidden" id="hdnSubViewLevel2ID" value="0" />
                            <div class="col-md-6">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tlReportDefinitionsPartialIncludedCols")</legend>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="btn-toolbar">
                                                <button type="button" id="btnLevel2Add" class="btn btn-primary">@Languages.Translation("Add")</button>
                                                <button type="button" id="btnLevel2Edit" class="btn btn-primary">@Languages.Translation("Edit")</button>
                                                <button type="button" id="btnLevel2Delete" class="btn btn-primary">@Languages.Translation("Delete")</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div id="lstLevel2TblColumns">
                                                <ul id="ulLevel2Cols" class="list-group available_listgroup" style="height:306px !important"></ul>
                                            </div>
                                        </div>
                                        @*<div class="col-sm-4 col-md-6">
                                            <div class="col-sm-2 col-md-1">
                                            <div class="row">
                                            <div class="col-sm-2 col-md-1">
                                            <button type="button" id="btnLevel2Add" class="btn btn-primary">Add</button>
                                            </div>
                                            </div>
                                            <div class="row">
                                            <div class="col-sm-2 col-md-1">
                                            <button type="button" id="btnLevel2Edit" class="btn btn-primary" style="margin-top:2px;">Edit</button>
                                            </div>
                                            </div>
                                            <div class="row">
                                            <div class="col-sm-2 col-md-1">
                                            <button type="button" id="btnLevel2Delete" class="btn btn-primary" style="margin-top:2px;">Delete</button>
                                            </div>
                                            </div>
                                            </div>
                                            </div>*@
                                        @*<div class="col-sm-1 col-md-1" style="margin-left:15px ;margin-top:15px">
                                            <button type="button" class="btn btn-default" aria-label="Up" id="btnLevel2Up">
                                            <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
                                            </button>
                                            <button type="button" class="btn btn-default" aria-label="Down" id="btnLevel2Down">
                                            <span class="glyphicon glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
                                            </button>
                                            </div>*@
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="btn-toolbar">
                                                <button type="button" id="btnLevel2SelectAll" class="btn btn-primary">@Languages.Translation("cbSelectAll")</button>
                                                <button type="button" id="btnLevel2UnselectAll" class="btn btn-primary">@Languages.Translation("btnReportDefinitionsPartialUnselectAll")</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-4 col-md-5 control-label" for="lstLevel2TrackingHis">
                                            @Languages.Translation("lblReportDefinitionsPartialTrackingHistory")
                                        </label>
                                        <div class="col-lg-8 col-md-7">
                                            <select id="lstLevel2TrackingHis" class="form-control"></select>
                                        </div>
                                    </div>
                                    <div class="form-group bottom_space">
                                        <div class="col-lg-4 col-md-5"></div>
                                        <div class="col-lg-8 col-md-7">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel2IncludeTrackedObj" name="TrackingEverContained_Level2" />
                                                <label class="checkbox-inline" for="chkLevel2IncludeTrackedObj">@Languages.Translation("chkReportDefinitionsPartialIncludeTrackedobjsEverConained")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-4 col-md-5 control-label" for="txtLevel2LeftIntent">
                                            @Languages.Translation("lblReportDefinitionsPartialLftIndent")
                                        </label>
                                        <div class="col-lg-4 col-md-7">
                                            <input type="text" class="form-control" id="txtLevel2LeftIntent" value="0" name="LeftIndent_Level2" maxlength="6" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-4 col-md-5 control-label" for="txtLevel2RightIntent">
                                            @Languages.Translation("lblReportDefinitionsPartialRgtIndent")
                                        </label>
                                        <div class="col-lg-4 col-md-7">
                                            <input type="text" class="form-control" id="txtLevel2RightIntent" value="0" name="RightIndent_Level2" maxlength="6" />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div Class="col-md-6">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tlReportDefinitionsPartialPrinting")</legend>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel2GrandTotal" name="GrandTotal_Level2" />
                                                <label class="checkbox-inline" for="chkLevel2GrandTotal">@Languages.Translation("chkReportDefinitionsPartialGrandTotalPageOnly")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel2IncludeImg" name="PrintImages_Level2" />
                                                <label class="checkbox-inline" for="chkLevel2IncludeImg">@Languages.Translation("chkReportDefinitionsPartialIncludeImages")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel2IncludeHeaders" name="SuppressHeader_Level2" />
                                                <label class="checkbox-inline" for="chkLevel2IncludeHeaders">@Languages.Translation("chkReportDefinitionsPartialIncludeHeaders")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel2IncludeFooters" name="SuppressFooter_Level2" />
                                                <label class="checkbox-inline" for="chkLevel2IncludeFooters"> @Languages.Translation("chkReportDefinitionsPartialIncludeFooters")</label>
                                            </div>
                                        </div>
                                    </div>

                                    <fieldset id="fldPrintColHeaders" class="admin_fieldset">
                                        <legend>@Languages.Translation("tiReportDefinitionsPartialPrtColHeaders")</legend>
                                        <div class="form-group">
                                            <div class="col-sm-6 col-md-12">
                                                <span class="radio-cus">
                                                    <input type="radio" id="rdLevel2Never" name="rdPrintColHeaders_Level2" value="1" />
                                                    <label class="radio-inline" for="rdLevel2Never"> @Languages.Translation("rdReportDefinitionsPartialNever")</label>
                                                </span>
                                                <span class="radio-cus">
                                                    <input type="radio" id="rdLevel2EachOccurrence" name="rdPrintColHeaders_Level2" checked="checked" value="0" />
                                                    <label class="radio-inline" for="rdLevel2EachOccurrence">@Languages.Translation("rdReportDefinitionsPartialEachOccurrence")</label>
                                                </span>
                                                <span class="radio-cus">
                                                    <input type="radio" id="rdLevel2TopofPageOnly" name="rdPrintColHeaders_Level2" value="2" />
                                                    <label class="radio-inline" for="rdLevel2TopofPageOnly">@Languages.Translation("rdReportDefinitionsPartialAtTopOfPageOnly")</label>
                                                </span>
                                            </div>
                                        </div>

                                        <div Class="form-group">
                                            <div Class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel2PrintWithoutChildren" name="PrintWithoutChildren_Level2" />
                                                    <label class="checkbox-inline" for="chkLevel2PrintWithoutChildren"> @Languages.Translation("chkReportDefinitionsPartialPrtWhenNoData")</label>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset id="fldImagesLevel2" class="admin_fieldset">
                                        <legend>@Languages.Translation("tlReportDefinitionsPartialImages")</legend>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel2ImgSeperatePage" name="PrintImageFullPage_Level2" />
                                                    <label class="checkbox-inline" for="chkLevel2ImgSeperatePage">@Languages.Translation("chkReportDefinitionsPartialPrintImageOnSepPage")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel2FirstImgOnly" name="PrintImageFirstPageOnly_Level2" />
                                                    <label class="checkbox-inline" for="chkLevel2FirstImgOnly">@Languages.Translation("chkReportDefinitionsPartialPrintFirstPageOfImageOnly")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel2Annotations" name="PrintImageRedlining_Level2" />
                                                    <label class="checkbox-inline" for="chkLevel2Annotations">@Languages.Translation("chkReportDefinitionsPartialIncludeAnnotations")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel2DataRow" name="SuppressImageDataRow_Level2" />
                                                    <label class="checkbox-inline" for="chkLevel2DataRow">@Languages.Translation("chkReportDefinitionsPartialPrintDataRow")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel2ImgFileInfo" name="SuppressImageFooter_Level2" />
                                                    <label class="checkbox-inline" for="chkLevel2ImgFileInfo">@Languages.Translation("chkReportDefinitionsPartialIncludeImgFileInformation")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="col-lg-6 col-md-5 control-label" for="txtLevel2LeftMargin">
                                                        @Languages.Translation("lblReportDefinitionsPartialLftMargin")
                                                    </label>
                                                    <div class="col-lg-6 col-md-7">
                                                        <input type="text" class="form-control" id="txtLevel2LeftMargin" value="0" name="PrintImageLeftMargin_Level2" maxlength="6" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="col-lg-6 col-md-5 control-label" for="txtLevel2RightImgWidth">
                                                        @Languages.Translation("lblReportDefinitionsPartialImgWidth")
                                                    </label>
                                                    <div class="col-lg-6 col-md-7">
                                                        <input type="text" class="form-control" id="txtLevel2RightImgWidth" value="0" name="PrintImageRightMargin_Level2" maxlength="6" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </fieldset>
                            </div>
                        </div>
                    </div>

                </div>
                <div id="pane3" class="tab-pane cus-tabs" role="tabpanel">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">
                                        @Languages.Translation("Table")
                                    </label>
                                    <div class="col-md-8">
                                        <select id="lstLevel3TblName" class="form-control" name="TableName_Level3"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label">
                                        @Languages.Translation("View")
                                    </label>
                                    <div class="col-md-8">
                                        <select id="lstLevel3ViewName" class="form-control" name="ViewName_Level3"></select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        @*<div class="row">
                            <div class="col-sm-12 col-md-1">
                            Table:
                            </div>
                            <div class="col-sm-12 col-md-4">
                            <select id="lstLevel3TblName" class="form-control" name="TableName_Level3"></select>
                            </div>
                            <div class="col-sm-12 col-md-1">
                            View:
                            </div>
                            <div class="col-sm-12 col-md-4">
                            <select id="lstLevel3ViewName" class="form-control" name="ViewName_Level3"></select>
                            </div>
                            </div>*@
                        <div class="row">
                            <input type="hidden" id="hdnLstLevel3ViewColChkStates" value="0" name="ViewColChkStates_Level3" />
                            <input type="hidden" id="hdnLstLevel3ViewCols" value="0" name="ViewColList_Level3" />
                            <input type="hidden" id="hdnLevel3ID" value="0" name="ViewID_Level3" />
                            <input type="hidden" id="hdnInitialLevel3ID" value="0" name="InitialViewID_Level3" />
                            <input type="hidden" id="hdnSubViewLevel3ID" value="0" />
                            <div class="col-md-6">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tlReportDefinitionsPartialIncludedCols")</legend>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="btn-toolbar">
                                                <button type="button" id="btnLevel3Add" class="btn btn-primary">@Languages.Translation("Add")</button>
                                                <button type="button" id="btnLevel3Edit" class="btn btn-primary">@Languages.Translation("Edit")</button>
                                                <button type="button" id="btnLevel3Delete" class="btn btn-primary">@Languages.Translation("Delete")</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div id="lstLevel3TblColumns">
                                                <ul id="ulLevel3Cols" class="list-group available_listgroup" style="height:306px !important"></ul>
                                            </div>
                                        </div>
                                        @*<div class="col-sm-4 col-md-6">
                                            <div class="col-sm-2 col-md-1">
                                            <div class="row">
                                            <div class="col-sm-2 col-md-1">
                                            <button type="button" id="btnLevel3Add" class="btn btn-primary">Add</button>
                                            </div>
                                            </div>
                                            <div class="row">
                                            <div class="col-sm-2 col-md-1">
                                            <button type="button" id="btnLevel3Edit" class="btn btn-primary" style="margin-top:2px;">Edit</button>
                                            </div>
                                            </div>
                                            <div class="row">
                                            <div class="col-sm-2 col-md-1">
                                            <button type="button" id="btnLevel3Delete" class="btn btn-primary" style="margin-top:2px;">Delete</button>
                                            </div>
                                            </div>
                                            </div>
                                            </div>*@
                                        @*<div class="col-sm-1 col-md-1" style="margin-left:15px ;margin-top:15px">
                                            <button type="button" class="btn btn-default" aria-label="Up" id="btnLevel3Up">
                                            <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
                                            </button>
                                            <button type="button" class="btn btn-default" aria-label="Down" id="btnLevel3Down">
                                            <span class="glyphicon glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
                                            </button>
                                            </div>*@
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="btn-toolbar">
                                                <button type="button" id="btnLevel3SelectAll" class="btn btn-primary">@Languages.Translation("cbSelectAll")</button>
                                                <button type="button" id="btnLevel3UnselectAll" class="btn btn-primary">@Languages.Translation("btnReportDefinitionsPartialUnselectAll")</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-4 col-md-5 control-label" for="lstLevel3TrackingHis">
                                            @Languages.Translation("lblReportDefinitionsPartialTrackingHistory")
                                        </label>
                                        <div class="col-lg-8 col-md-7">
                                            <select id="lstLevel3TrackingHis" class="form-control"></select>
                                        </div>
                                    </div>
                                    <div class="form-group bottom_space">
                                        <div class="col-lg-4 col-md-5"></div>
                                        <div class="col-lg-8 col-md-7">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel3IncludeTrackedObj" name="TrackingEverContained_Level3" />
                                                <label class="checkbox-inline" for="chkLevel3IncludeTrackedObj">@Languages.Translation("chkReportDefinitionsPartialIncludeTrackedobjsEverConained")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-4 col-md-5 control-label" for="txtLevel3LeftIntent">
                                            @Languages.Translation("lblReportDefinitionsPartialLftIndent")
                                        </label>
                                        <div class="col-lg-4 col-md-7">
                                            <input type="text" class="form-control" id="txtLevel3LeftIntent" value="0" name="LeftIndent_Level3" maxlength="6" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-4 col-md-5 control-label" for="txtLevel3RightIntent">
                                            @Languages.Translation("lblReportDefinitionsPartialRgtIndent")
                                        </label>
                                        <div class="col-lg-4 col-md-7">
                                            <input type="text" class="form-control" id="txtLevel3RightIntent" value="0" name="RightIndent_Level3" maxlength="6" />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-md-6">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tlReportDefinitionsPartialPrinting")</legend>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel3GrandTotal" name="GrandTotal_Level3" />
                                                <label class="checkbox-inline" for="chkLevel3GrandTotal">@Languages.Translation("chkReportDefinitionsPartialGrandTotalPageOnly")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel3IncludeImg" name="PrintImages_Level3" />
                                                <label class="checkbox-inline" for="chkLevel3IncludeImg">@Languages.Translation("chkReportDefinitionsPartialIncludeImages")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel3IncludeHeaders" name="SuppressHeader_Level3" />
                                                <label class="checkbox-inline" for="chkLevel3IncludeHeaders">@Languages.Translation("chkReportDefinitionsPartialIncludeHeaders")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="chkLevel3IncludeFooters" name="SuppressFooter_Level3" />
                                                <label class="checkbox-inline" for="chkLevel3IncludeFooters">@Languages.Translation("chkReportDefinitionsPartialIncludeFooters")</label>
                                            </div>
                                        </div>
                                    </div>

                                    <fieldset id="fldPrintColHeaders" class="admin_fieldset">
                                        <legend>@Languages.Translation("tiReportDefinitionsPartialPrtColHeaders")</legend>
                                        <div class="form-group">
                                            <div class="col-sm-6 col-md-12">
                                                <span class="radio-cus">
                                                    <input type="radio" id="rdLevel3Never" name="rdPrintColHeaders_Level3" value="1" />
                                                    <label class="radio-inline" for="rdLevel3Never">@Languages.Translation("rdReportDefinitionsPartialNever")</label>
                                                </span>
                                                <span class="radio-cus">
                                                    <input type="radio" id="rdLevel3EachOccurrence" name="rdPrintColHeaders_Level3" checked="checked" value="0" />
                                                    <label class="radio-inline" for="rdLevel3EachOccurrence"> @Languages.Translation("rdReportDefinitionsPartialEachOccurrence")</label>
                                                </span>

                                                <span Class="radio-cus">
                                                    <input type="radio" id="rdLevel3TopofPageOnly" name="rdPrintColHeaders_Level3" value="2" />
                                                    <label class="radio-inline" for="rdLevel3TopofPageOnly"> @Languages.Translation("rdReportDefinitionsPartialAtTopOfPageOnly")</label>
                                                </span>
                                            </div>
                                        </div>
                                        <div Class="form-group">
                                            <div Class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel3PrintWithoutChildren" name="PrintWithoutChildren_Level3" />
                                                    <label class="checkbox-inline" for="chkLevel3PrintWithoutChildren">@Languages.Translation("chkReportDefinitionsPartialPrtWhenNoData")</label>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset id="fldImagesLevel3" class="admin_fieldset">
                                        <legend>@Languages.Translation("tlReportDefinitionsPartialImages")</legend>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel3ImgSeperatePage" name="PrintImageFullPage_Level3" />
                                                    <label class="checkbox-inline" for="chkLevel3ImgSeperatePage">@Languages.Translation("chkReportDefinitionsPartialPrintImageOnSepPage")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel3FirstImgOnly" name="PrintImageFirstPageOnly_Level3" />
                                                    <label class="checkbox-inline" for="chkLevel3FirstImgOnly"> @Languages.Translation("chkReportDefinitionsPartialPrintFirstPageOfImageOnly")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel3Annotations" name="PrintImageRedlining_Level3" />
                                                    <label class="checkbox-inline" for="chkLevel3Annotations"> @Languages.Translation("chkReportDefinitionsPartialIncludeAnnotations")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel3DataRow" name="SuppressImageDataRow_Level3" />
                                                    <label class="checkbox-inline" for="chkLevel3DataRow"> @Languages.Translation("chkReportDefinitionsPartialPrintDataRow")</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    <input type="checkbox" id="chkLevel3ImgFileInfo" name="SuppressImageFooter_Level3" />
                                                    <label class="checkbox-inline" for="chkLevel3ImgFileInfo">@Languages.Translation("chkReportDefinitionsPartialIncludeImgFileInformation")</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="col-lg-6 col-md-5 control-label" for="txtLevel3LeftMargin">
                                                        @Languages.Translation("lblReportDefinitionsPartialLftMargin")
                                                    </label>
                                                    <div class="col-lg-6 col-md-7">
                                                        <input type="text" Class="form-control" id="txtLevel3LeftMargin" value="0" name="PrintImageLeftMargin_Level3" maxlength="6" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="col-lg-6 col-md-5 control-label" for="txtLevel3RightImgWidth">
                                                        @Languages.Translation("lblReportDefinitionsPartialImgWidth")
                                                    </label>
                                                    <div class="col-lg-6 col-md-7">
                                                        <input type="text" Class="form-control" id="txtLevel3RightImgWidth" value="0" name="PrintImageRightMargin_Level3" maxlength="6" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div Class="form-group top_space">
                <div class="col-sm-12">
                    <div id="divRptAction" class="btn-toolbar">
                        <Button type="button" id="btnRptsApply" class="btn btn-primary pull-right btnRptsApply">@Languages.Translation("Apply")</Button>
                        <Button type="button" id="btnRemoveLevel" class="btn btn-primary pull-right btnRemoveLevel">@Languages.Translation("btnReportDefinitionsPartialRemoveThisLevel")</Button>
                    </div>
                    <div id="divRptActionClone" class="sticker stick" style="display:none;"></div>
                </div>
            </div>
        </div>
    </section>
End Using
<div id="AddViewColumn">
</div>
<style>
    .highlightClass {
        background: rgba(0, 161, 225, 0.2) !important;
    }
    /*.highlightClass {
        background: #fffce8 !important;
    }*/
    .aaffixed {display: block !important;}
    .sticker.stick {
        right: 63px;
    }

    .sticker {
        right: 18px;
        margin-bottom: 15px;
    }
</style>
