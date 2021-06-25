@Code
    ViewData("Title") = Languages.Translation("tiImportMainFormIW")
    Layout = "~/Views/Shared/_LayoutNoMenu.vbhtml"
End Code
@Imports TabFusionRMS.Models
@ModelType TabFusionRMS.Models.ImportLoad
<script src="@Url.Content("~/Content/themes/TAB/js/bootstrap.fd.js")"></script>
<link href="@Url.Content("~/Content/themes/TAB/css/bootstrap.fd.css")" rel="stylesheet" />
<style type="text/css">
    .ui-spinner.ui-widget-content {
        display: block;
    }
        .addZIndex {
        z-index:9999;
    }
</style>

@*http://bootsnipp.com/snippets/featured/form-wizard-using-tabs*@
<h1 class="main_title">
    <span id="title">@Languages.Translation("tiImportMainFormIW")</span>
</h1>

@*<section class="content">*@
<div id="parent">
    @Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmFirstImport", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
        @Html.AntiForgeryToken
    @<div class="row">

        <div class="col-md-offset-1 col-md-10 col-sm-12">

            <div class="wizard">
                <div class="wizard-inner">
                    <ul id="TabControl" class="nav nav-tabs" role="tablist" data-tabs="tabs">
                        <li role="presentation" class="active">
                            <a class="tabA" href="#divMain" id="tabMain" title="@Languages.Translation("lnkImportMainFormMain")"><span class="round-tab"><i class="fa fa-home fa-1x"></i></span></a>
                        </li>
                        <li role="presentation" class="disabled">
                            <a class="tabA" href="#divFormat" id="tabFormat" title="@Languages.Translation("lnkImportMainFormFormat")"><span class="round-tab"><i class="fa fa-paint-brush"></i></span></a>
                        </li>
                        <li role="presentation" class="disabled">
                            <a class="tabA" href="#divField" id="tabField" title="@Languages.Translation("lnkImportMainFormField")"><span class="round-tab"><i class="fa fa-tasks"></i></span></a>
                        </li>
                        <li role="presentation" class="disabled">
                            <a class="tabA" href="#divInfo" id="tabInfo" title="@Languages.Translation("lnkImportMainFormInfo")"><span class="round-tab"><i class="fa fa-info"></i></span></a>
                        </li>
                        <li role="presentation" class="disabled">
                            <a class="tabA" href="#divImages" id="tabImages" title="@Languages.Translation("lnkImportMainFormImages")"><span class="round-tab"><i class="fa fa-picture-o"></i></span></a>
                        </li>
                    </ul>
                </div>
                <form role="form">
                    <div class="form-horizontal">
                        <div id="my-tab-content" class="tab-content">
                            <div class="tab-pane active" id="divMain">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row col-lg-offset-2 col-lg-8">
                                            <div class="main-box">
                                                <div class="form-group">
                                                    <label class="col-sm-3 control-label" for="slcImportLoads">@Languages.Translation("lblImportMainFormSavedImp")</label>
                                                    <div class="col-sm-9">
                                                        <select id="slcImportLoads" class="form-control" name="slcImportLoads"></select>
                                                    </div>
                                                </div>
                                                <div class="form-group top_space">
                                                    <div class="col-sm-3"></div>
                                                    <div class="col-sm-9">
                                                        <input type="file" id="fileInput" name="fileInput" accept=".xls,.xlsx,.txt,.csv,.dbf,.mdb,.accdb" style="display:none;" value="@Languages.Translation("lblImportMainFormUpload")" dirname="" class="m-t-5" />
                                                        <input type="file" id="FileInputForRun" name="FileInputForRun" style="display:none" class="m-t-5"/>
                                                        <input type="button" id="btnRun" name="nameRun" onclick="openFileAttachDialog();" value="@Languages.Translation("lblImportMainFormRun")" class="btn btn-primary m-r-10 m-t-5" />
                                                        <input type="button" id="btnInSetup" name="nameSetup" value="@Languages.Translation("lblImportMainFormSetup")" class="btn btn-primary m-r-10 m-t-5" />
                                                        <input type="button" id="btnRemove" name="nameRemove" value="@Languages.Translation("Remove")" class="btn btn-primary m-r-10 m-t-5" />
                                                        <input type="button" id="NewLoadId" name="NewLoadId" value="@Languages.Translation("lblImportMainFormNewLoad")" class="btn btn-primary m-t-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="divFormat">
                                <div class="row">
                                    <fieldset class="admin_fieldset">
                                        <legend>File Configuration</legend>
                                        <div class="col-md-6">
                                                <div class="form-group">
                                                    <div class="col-md-12">
                                                        <label class="" id="lblImportName" for="LoadName">@Languages.Translation("lblImportMainFormImptName")</label>
                                                        @Html.TextBoxFor(Function(m) m.LoadName, New With {.maxlength = "50", .class = "form-control", .placeholder = Languages.Translation("lblImportMainFormImptName")})
                                                    </div>
                                                </div>
                                        </div>
                                        <div class="col-md-6">

                                            <div class="form-group">
                                                <div class="col-md-12">
                                                    <label class="" id="lblSourceFile" for="InputFileName">@Languages.Translation("lblImportMainFormSourceFile")</label>
                                                    <div class="input-group">
                                                        <input type="text" name="InputFileName" id="InputFileName" class="form-control" placeholder="@Languages.Translation("lblImportMainFormSourceFile")" />
                                                        <span class="input-group-btn">
                                                            <input type="file" id="fileSource" name="fileSource" accept=".xls,.xlsx,.txt,.csv,.dbf,.mdb,.accdb" style="display:none" />
                                                            <input type="button" value="..." id="btnSource" name="btnSource" class="btn btn-secondary" style="height:41px;" />
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group" style="display:none">
                                                <label class="col-sm-3 control-label" id="lblFilePath" for="txtFilePath">@Languages.Translation("lblImportMainFormSourceFilePath")</label>
                                                <div Class="col-sm-8">
                                                    @Html.TextBoxFor(Function(m) m.TempInputFile, New With {.maxlength = "255", .class = "form-control"})
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <label for="txtSampling">@Languages.Translation("lblImportMainFormSampleRows")</label>
                                                <input type="text" name="txtSampling" id="txtSampling" class="form-control" value="20" max="90" min="10" maxlength="2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <div class="checkbox-cus m-t-20">
                                                    <input id="FirstRowHeader" name="FirstRowHeader" class="checkbox-inline" value="false" type="checkbox" /> <label class="checkbox-inline" for="FirstRowHeader">@Languages.Translation("lblImportMainForm1stRoFN")</label>
                                                </div>
                                                <input type="checkbox" id="knowDiv" name="knowDiv" hidden="hidden" />
                                                <input type="text" id="msHoldName" name="msHoldName" hidden="hidden" />
                                                @Html.HiddenFor(Function(m) m.FromHandHeldEnum)
                                                @Html.HiddenFor(Function(m) m.ID)
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-12">
                                        <div id="textDiv" name="TextDivName">
                                            <fieldset class="admin_fieldset" style="display:none">
                                                <legend>@Languages.Translation("Format")</legend>
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                        <input type="radio" name="RecordType" id="delimited_radio" value="@Languages.Translation("rdbImportMainFormCOMMA")" checked="checked" />
                                                        <label id="delimited_label" class="control-label" for="delimited_radio">@Languages.Translation("lblImportMainFormDelimited")</label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset class="admin_fieldset">
                                                <legend>@Languages.Translation("lblImportMainFormCDelimiter")</legend>
                                                <div class="row">
                                                    <div class="col-sm-2 radio-cus">
                                                        <input type="radio" name="Delimiter" id="comma_radio" checked="checked" value="," />
                                                        <label id="comma_label" for="comma_radio" class="radio-inline">@Languages.Translation("lblImportMainFormComma")</label>
                                                    </div>
                                                    <div class="col-sm-2 radio-cus">
                                                        <input type="radio" name="Delimiter" id="Tab_radio" value="t" />
                                                        <label id="Tab_label" for="Tab_radio" class="radio-inline">@Languages.Translation("lblImportMainFormTab")</label>
                                                    </div>
                                                    <div class="col-sm-2 radio-cus">
                                                        <input type="radio" name="Delimiter" id="semicolon_radio" value=";"/>
                                                        <label id="semicolon_label" for="semicolon_radio" class="radio-inline">@Languages.Translation("lblImportMainFormSemiColon")</label>
                                                    </div>
                                                    <div class="col-sm-2 radio-cus">
                                                        <input type="radio" name="Delimiter" id="space_radio" value=" " />
                                                        <label id="space_label" for="space_radio" class="radio-inline">@Languages.Translation("lblImportMainFormSpace")</label>
                                                    </div>
                                                    <div class="col-sm-2 radio-cus">
                                                        <input type="radio" name="Delimiter" id="other_radio" value="" />
                                                        <label id="other_label" for="other_radio" class="radio-inline">@Languages.Translation("lblImportMainFormOther")</label>
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <input type="text" name="textOther" id="textOther" maxlength="1" disabled="disabled" class="form-control" />
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div id="sheetDiv" style="display:none">
                                            <div class="form-group">
                                                <div class="col-md-12">
                                                    <label id="sheetDivLabel" for="SelectTable"></label>
                                                    <select size="10" name="TableSheetName" id="SelectTable" class="form-control"></select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="divField" class="tab-pane">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="row col-lg-offset-2 col-lg-8">
                                            <div class="main-box">
                                                <div class="form-group">
                                                    <label class="col-sm-3 control-label" id="labelTables" for="FileName">@Languages.Translation("lblImportMainFormDest")</label>
                                                    <div class="col-sm-9">
                                                        <select id="FileName" name="FileName" class="form-control"></select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row form-group">
                                            <div class="col-sm-11">
                                                <div class="pull-right"><input type="button" id="btnProprties" class="btn btn-primary pull-left" value="@Languages.Translation("btnImportMainFormProperties")" /></div>
                                                <div class="clearfix"></div>
                                                <select id="SelectField" multiple="multiple" size="10" name="duallistbox_demo" class="eItems"></select>
                                            </div>
                                            <div class="col-sm-1 m-t-40">
                                                <br />
                                                <button type="button" class="btn btn-default" aria-label="Up" id="btnImportUp">
                                                    <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
                                                </button>
                                                <button type="button" class="btn btn-default" aria-label="Down" id="btnImportDown">
                                                    <span class="glyphicon glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="divInfo" class="tab-pane">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="clearfix"></div>
                                        <div Class="row">
                                            <fieldset class="admin_fieldset">
                                                <legend>File Configuration</legend>
                                                <div Class="col-sm-6">

                                                    <div Class="form-group">
                                                        <div Class="col-md-12">
                                                            <Label Class="control-label" id="lblOverwrite" for="Duplicate">@Languages.Translation("lblImportMainFormOWA")</Label>
                                                            <select id="Duplicate" name="Duplicate" class="form-control"></select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <div class="col-md-12">
                                                            <label class="control-label" id="lblImportBy" for="IdFieldName">@Languages.Translation("lblImportMainFormImportBy")</label>
                                                            <select id="IdFieldName" name="IdFieldName" class="form-control" disabled="disabled"></select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12">
                                                    <div class="checkbox-cus">
                                                        <input type="checkbox" name="chkReverseOrder" id="chkReverseOrder">
                                                        <label class="checkbox-inline" for="chkReverseOrder">@Languages.Translation("lblImportMainFormReverseOrder")</label>
                                                    </div>
                                                </div>
                                          </fieldset>

                                            <fieldset class="admin_fieldset">
                                                <legend>Tracking</legend>
                                                <div Class="col-sm-6">
                                                    <div Class="form-group">
                                                        <div Class="col-md-12">
                                                            <Label Class="control-label" id="lblTrackDestinationId" for="TrackDestinationId">@Languages.Translation("lblImportMainFormDest")</label>
                                                            @Html.TextBoxFor(Function(m) m.TrackDestinationId, New With {.id = "TrackDestinationId", .class = "form-control", .maxlength = "50", .placeholder = Languages.Translation("lblImportMainFormDest")})
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6" id="DivDateDue">
                                                    <div class="form-group">
                                                        <div class="col-md-12">
                                                            <label class="control-label" id="lblDateDue" for="DateDue1">@Languages.Translation("lblImportMainFormDateDue")</label>
                                                            <input type="text" id="DateDue" name="DateDue" class="form-control datepicker" placeholder="@Languages.Translation("lblImportMainFormDateDue")" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="divImages" class="tab-pane">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <fieldset class="admin_fieldset">
                                            <legend>@Languages.Translation("lblImportMainFormImgSetting")</legend>
                                            <div class="form-group">
                                                <input type="checkbox" id="ShowImage" name="ShowImage" hidden="hidden">
                                                <label class="col-sm-2 control-label" id="lblOutput" for="ScanRule">@Languages.Translation("lblImportMainFormOptSettings")</label>
                                                <div class="col-sm-10">
                                                    <select name="ScanRule" id="ScanRule" class="form-control" style="font-family:monospace"></select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label" id="lblDisplay">@Languages.Translation("lblImportMainFormSaveAsNew")</label>
                                                <div class="col-sm-10">
                                                    <div class="radio-cus">
                                                        <input type="radio" name="SaveAsNew" id="SaveAsAttachment" value="0" checked="checked" />
                                                        <label id="lblAttach" class="radio-inline" for="SaveAsAttachment">@Languages.Translation("Attachment")</label>
                                                    </div>
                                                    <div class="radio-cus">
                                                        <input type="radio" name="SaveAsNew" id="SaveImageAsNewPage" value="1" />
                                                        <label id="lblPage" class="radio-inline" for="SaveImageAsNewPage">@Languages.Translation("Page")</label>
                                                    </div>
                                                    <div class="radio-cus">
                                                        <input type="radio" name="SaveAsNew" id="SaveImageAsNewVersion" value="2" />
                                                        <label id="lblVersion" class="radio-inline" for="SaveImageAsNewVersion">@Languages.Translation("rdbImportImagesVersion")</label>
                                                    </div>
                                                    <div class="radio-cus">
                                                        <input type="radio" name="SaveAsNew" id="SaveImageAsNewVersionAsOfficialRecord" value="3" />
                                                        <label id="lblOfficialVersion" class="radio-inline" for="SaveImageAsNewVersionAsOfficialRecord">@Languages.Translation("lblImportMainFormVerOffRec")</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div id="tableDIv" class="col-sm-12" style="display:none; overflow:auto;">
                                        <div class="form-group">
                                            <div class="table-responsive jqgrid-cus">
                                                <table id="grdImport"></table>
                                                <div id="grdImport_pager"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12" id="errorDiv" style="display:none;">
                                    <Label id="lblError"></Label>
                                </div>
                            </div>
                        </div>
                        <div Class="m-t-10 tab-pane-bottom-line">
                          <div class="row">
                            <div Class="col-sm-4">
                                <input id="btnPrevious" type="button" Class="btn btn-primary pull-left" value="@Languages.Translation("Back")" disabled="disabled" />
                            </div>
                              <div Class="col-sm-4" style="text-align:center;">
                                  <input type="button" Class="m-r-10 btn btn-primary" style="display:none;" id="btnReport" name="btnReport" onclick="javascript:ShowLogFiles(this);" value="@Languages.Translation("lblImportMainFormViewRept")">
                                  <input type="button" Class="m-r-10 btn btn-primary" style="display:none;" id="btnError" name="btnError" onclick="javascript:ShowLogFiles(this);" value="@Languages.Translation("lblImportMainFormViewError")">
                              </div>
                            <div Class="col-sm-4">
                                <input id="btnFinish" type="button" Class="btn btn-primary  pull-right" value="@Languages.Translation("lblImportMainFormFinish")" onclick="FinishClick()" />
                                <input id="btnNext" type="button" Class="btn btn-primary pull-right m-r-10" value="@Languages.Translation("lblImportMainFormNext")" />
                            </div>
                          </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div Class="col-sm-1"></div>
    </div>
    End Using
</div>
@Using Html.BeginForm("SetPropertyDetails", "Admin", FormMethod.Post, New With {.id = "frmImportProperty", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    'Added by hemin
    @Html.AntiForgeryToken
    @Html.Hidden("lblJsDualListBoxShowAll", Languages.Translation("lblJsDualListBoxShowAll"))
    @Html.Hidden("lblJsDualListBoxFilter", Languages.Translation("lblJsDualListBoxFilter"))
    @Html.Hidden("lblJsDualListBoxMoveSelected", Languages.Translation("lblJsDualListBoxMoveSelected"))
    @Html.Hidden("lblJsDualListBoxMoveAll", Languages.Translation("lblJsDualListBoxMoveAll"))
    @Html.Hidden("lblJsDualListBoxRMVSelected", Languages.Translation("lblJsDualListBoxRMVSelected"))
    @Html.Hidden("lblJsDualListBoxRMVAll", Languages.Translation("lblJsDualListBoxRMVAll"))
    @Html.Hidden("lblJsDualListBoxShowingAll", Languages.Translation("lblJsDualListBoxShowingAll"))
    @Html.Hidden("lblJsDualListBoxFiltered", Languages.Translation("lblJsDualListBoxFiltered"))
    @Html.Hidden("lblJsDualListBoxFrom", Languages.Translation("lblJsDualListBoxFrom"))
    @Html.Hidden("lblJsDualListBoxEmptyList", Languages.Translation("lblJsDualListBoxEmptyList"))

    @<div class="modal fade" id="mdlImportProperties" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel"><label id="myModelId">@Languages.Translation("tiImportMainFormDescProp")</label></h4>
                </div>
                <div class="modal-body">
                    <div class="row" id="commanDiv">
                        <div class="col-sm-12 col-md-12">
                            <div class="form-group">
                                <label id="lblDefaultValue" name="lblDefaultValue" for="DefaultValue" class="control-label col-sm-4">@Languages.Translation("lblImportMainFormDftValFunc")</label>
                                <div class="col-sm-8">
                                    <input type="text" name="DefaultValue" id="DefaultValue" class="form-control" maxlength="50">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="dateDiv" style="display:none" class="row">
                        <div class="col-sm-12 col-md-12">
                            <div class="form-group">
                                <label id="lblSwingYear" name="lblSwingYear" for="SwingYear" class="control-label col-sm-4">@Languages.Translation("lblImportMainFormSwingYr")</label>
                                <div class="col-sm-8">
                                    <input type="text" name="SwingYear" id="SwingYear" class="form-control" maxlength="5" disabled="disabled">
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lblDateFormat" name="lblDateFormat" for="EndPosition" class="control-label col-sm-4">@Languages.Translation("lblImportMainFormDtFormat")</label>
                                <div class="col-sm-8">
                                    <select name="DateFormat" id="DateFormat" class="form-control">
                                        <option value=""></option>
                                        <option value="dd/mm/yy">dd/mm/yy</option>  
                                        <option value="dd/mm/yy hh:mm:ss">dd/mm/yy hh:mm:ss</option> 
                                        <option value="dd/mm/yyyy">dd/mm/yyyy</option>  
                                        <option value="dd/mm/yyyy hh:mm:ss">dd/mm/yyyy hh:mm:ss</option>  
                                        <option value="ddmmyy">ddmmyy</option>
                                        <option value="ddmmyyhhmmss">ddmmyyhhmmss</option>
                                        <option value="ddmmyyyy">ddmmyyyy</option>
                                        <option value="ddmmyyyyhhmmss">ddmmyyyyhhmmss</option>
                                        <option value="mm/dd/yy">mm/dd/yy</option>
                                        <option value="mm/dd/yy hh:mm:ss">mm/dd/yy hh:mm:ss</option>
                                        <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                                        <option value="mm/dd/yyyy hh:mm:ss">mm/dd/yyyy hh:mm:ss</option>
                                        <option value="mmddyy">mmddyy</option>
                                        <option value="mmddyyhhmmss">mmddyyhhmmss</option>
                                        <option value="mmddyyyy">mmddyyyy</option>
                                        <option value="mmddyyyyhhmmss">mmddyyyyhhmmss</option>
                                        <option value="yy/dd/mm">yy/dd/mm</option>
                                        <option value="yy/dd/mm hh:mm:ss">yy/dd/mm hh:mm:ss</option>
                                        <option value="yy/mm/dd">yy/mm/dd</option>
                                        <option value="yy/mm/dd hh:mm:ss">yy/mm/dd hh:mm:ss</option>
                                        <option value="yyddmm">yyddmm</option>
                                        <option value="yyddmmhhmmss">yyddmmhhmmss</option>
                                        <option value="yymmdd">yymmdd</option>
                                        <option value="yymmddhhmmss">yymmddhhmmss</option>
                                        <option value="yyyy/dd/mm">yyyy/dd/mm</option>
                                        <option value="yyyy/dd/mm hh:mm:ss">yyyy/dd/mm hh:mm:ss</option>
                                        <option value="yyyy/mm/dd">yyyy/mm/dd</option>
                                        <option value="yyyy/mm/dd hh:mm:ss">yyyy/mm/dd hh:mm:ss</option>
                                        <option value="yyyyddmm">yyyyddmm</option>
                                        <option value="yyyyddmmhhmmss">yyyyddmmhhmmss</option>
                                        <option value="yyyymmdd">yyyymmdd</option>
                                        <option value="yyyymmddhhmmss">yyyymmddhhmmss</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="attachmentDiv" style="display:none" class="row">
                        <div class="col-sm-12">
                            <fieldset class="admin_fieldset">
                                <legend>@Languages.Translation("lblImportMainFormAttTyp")</legend>
                                <span class="radio-cus">
                                    <input type="radio" name="fraFormat" id="file_radio" value="0" />
                                    <label id="file_label" class="control-label" for="file_radio">@Languages.Translation("lblImportMainFormDrmTypFromFile")</label>
                                </span>
                                <span class="radio-cus">
                                    <input type="radio" name="fraFormat" id="image_radio" value="1" />
                                    <label id="image_label" class="control-label" for="image_radio">@Languages.Translation("lblImportMainFormAlwsAnImg")</label>
                                </span>
                                <span class="radio-cus">
                                    <input type="radio" name="fraFormat" id="never_radio" value="2" />
                                    <label id="never_label" class="control-label" for="never_radio">@Languages.Translation("lblImportMainFormNvrAnImg")</label>
                                </span>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnOkProperty" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">@Languages.Translation("OK")</button>
                    <button id="btnCancelProperty" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
End Using
@*</section>*@
<script src="@Url.Content("~/Scripts/AppJs/ImportDualListBox.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/Import.js")"></script>