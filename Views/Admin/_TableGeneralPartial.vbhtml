@Imports TabFusionRMS.Models
@ModelType TabFusionRMS.Models.Table
<style>
    .sticker.stick {right:63px;}
    .sticker {right:0px;margin-bottom:15px;}
</style>
<section class="content">
    @Using Html.BeginForm("GeneralForm", "Admin", FormMethod.Post, New With {.id = "frmTableGeneral", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnURL")})
        @<div id="parent">
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label class="col-lg-4 col-md-3 control-label" for="TableName" title="@Languages.Translation("lblTableGeneralPartialIntName")">@Languages.Translation("lblTableGeneralPartialIntName")</label>
                        <div class="col-lg-8 col-md-7  controls">
                            @Html.TextBoxFor(Function(m) m.TableName, New With {.readonly = "readonly", .class = "form-control", .placeholder = Languages.Translation("phTableFieldsInternalName")})
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label class="col-lg-4 col-md-3 control-label" for="DBName" title="@Languages.Translation("lblTableGeneralPartialIntDB")">@Languages.Translation("lblTableGeneralPartialIntDB")</label>
                        <div class="col-lg-8 col-md-7  controls">
                            @Html.TextBoxFor(Function(m) m.DBName, New With {.readonly = "readonly", .class = "form-control", .placeholder = Languages.Translation("phTableGeneralPartialIntDB")})
                        </div>
                    </div>
                </div>
            </div>
            <fieldset Class="admin_fieldset">
                <legend>@Languages.Translation("tiTableGeneralPartialJuml2Info") </legend>
                <div Class="col-lg-4">
                    <div Class="form-group">
                        <Label Class="col-lg-5 col-md-3 control-label" for="BarCodePrefix" title="@Languages.Translation("lblTableGeneralPartialBarCodePrefix")">@Languages.Translation("lblTableGeneralPartialBarCodePrefix")</Label>
                        <div Class="col-md-7 controls">
                            @Html.TextBoxFor(Function(m) m.BarCodePrefix, New With {.class = "form-control", .MaxLength = "10", .placeholder = Languages.Translation("phTableGeneralPartialBarCodePrefix")})
                        </div>
                    </div>
                </div>
                <div Class="col-lg-4">
                    <div Class="form-group">
                        <Label Class="col-lg-5 col-md-3 control-label" for="IdStripChars" title="@Languages.Translation("lblTableGeneralPartialBarStripChars")">@Languages.Translation("lblTableGeneralPartialBarStripChars")</Label>
                        <div Class="col-md-7 controls">
                            @Html.TextBoxFor(Function(m) m.IdStripChars, New With {.class = "form-control", .MaxLength = "10", .placeholder = Languages.Translation("phTableGeneralPartialBarStripChars")})
                        </div>
                    </div>
                </div>
                <div Class="col-lg-4">
                    <div Class="form-group">
                        <Label Class="col-lg-5 col-md-3 control-label" for="IdStripChars" title="@Languages.Translation("lblTableGeneralPartialMask")">@Languages.Translation("lblTableGeneralPartialMask")</Label>
                        <div Class="col-md-7 controls">
                            @Html.TextBoxFor(Function(m) m.IdMask, New With {.class = "form-control", .MaxLength = "20", .placeholder = Languages.Translation("phTableGeneralPartialMask")})
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset Class="admin_fieldset">
                <legend>@Languages.Translation("tiTableGeneralPartialDisplay")</legend>
                <div Class="col-lg-4">
                    <div Class="form-group">
                        <Label Class="col-lg-5 col-md-3 control-label" for="DescFieldPrefixOne" title="@Languages.Translation("lblTableGeneralPartialHeading1")">@Languages.Translation("lblTableGeneralPartialHeading1")</Label>
                        <div Class="col-md-7 controls">
                            @Html.TextBoxFor(Function(m) m.DescFieldPrefixOne, New With {.class = "form-control", .MaxLength = "20", .placeholder = Languages.Translation("lblTableGeneralPartialHeading1")})
                        </div>
                    </div>
                </div>
                <div Class="col-lg-4">
                    <div Class="form-group">
                        <Label Class="col-lg-5 col-md-3 control-label" for="DescFieldNameOne" title="@Languages.Translation("lblTableGeneralPartialField1")">@Languages.Translation("lblTableGeneralPartialField1")</Label>
                        <div Class="col-md-7 controls">
                            <select id="DescFieldNameOne" name="DescFieldNameOne" Class="form-control"></select>
                        </div>
                    </div>
                </div>
                <div Class="col-lg-4">
                    <div Class="form-group">
                        <Label Class="col-lg-5 col-md-3 control-label" for="DescFieldPrefixOneWidth" title="@Languages.Translation("lblTableGeneralPartialWidth1")">@Languages.Translation("lblTableGeneralPartialWidth1")</Label>
                        <div Class="col-md-7 controls">
                            @Html.TextBoxFor(Function(m) m.DescFieldPrefixOneWidth, New With {.class = "form-control", .MaxLength = "20", .min = "0", .placeholder = Languages.Translation("lblTableGeneralPartialWidth1")})
                        </div>
                    </div>
                </div>
                <div Class="col-lg-4">
                    <div Class="form-group">
                        <Label Class="col-lg-5 col-md-3 control-label" for="DescFieldPrefixTwo" title="@Languages.Translation("lblTableGeneralPartialHeading2")">@Languages.Translation("lblTableGeneralPartialHeading2")</Label>
                        <div Class="col-md-7 controls">
                            @Html.TextBoxFor(Function(m) m.DescFieldPrefixTwo, New With {.class = "form-control", .MaxLength = "20", .placeholder = Languages.Translation("lblTableGeneralPartialHeading2")})
                        </div>
                    </div>
                </div>
                <div Class="col-lg-4">
                    <div Class="form-group">
                        <Label Class="col-lg-5 col-md-3 control-label" for="DescFieldNameTwo" title="@Languages.Translation("lblTableGeneralPartialField2")">@Languages.Translation("lblTableGeneralPartialField2")</Label>
                        <div Class="col-md-7 controls">
                            <select id="DescFieldNameTwo" name="DescFieldNameTwo" Class="form-control"></select>
                        </div>
                    </div>
                </div>
                <div Class="col-lg-4">
                    <div Class="form-group">
                        <Label Class="col-lg-5 col-md-3 control-label" for="DescFieldPrefixTwoWidth" title="@Languages.Translation("lblTableGeneralPartialWidth2")">@Languages.Translation("lblTableGeneralPartialWidth2")</Label>
                        <div Class="col-md-7 controls">
                            @Html.TextBoxFor(Function(m) m.DescFieldPrefixTwoWidth, New With {.class = "form-control", .MaxLength = "20", .min = "0", .placeholder = Languages.Translation("lblTableGeneralPartialWidth2")})
                        </div>
                    </div>
                </div>
            </fieldset>
            <div Class="form-group">
                <div Class="col-lg-9">
                    <fieldset Class="admin_fieldset">
                        <legend>@Languages.Translation("Attachment")</legend>
                        <div Class="col-sm-12">
                            <div Class="form-group">
                                <div Class="col-lg-3">
                                    <div Class="checkbox-cus">
                                        @Html.CheckBox("AttachmentCheck")
                                        <Label Class="checkbox-inline" for="AttachmentCheck" title="@Languages.Translation("chkTableGeneralPartialAllowAttach")">@Languages.Translation("chkTableGeneralPartialAllowAttach")</Label>
                                    </div>
                                </div>
                                <div Class="col-lg-5">
                                    <div Class="checkbox-cus">
                                        @Html.CheckBox("OfficialRecordHandling", New With {.disabled = "disabled"})
                                        <Label Class="checkbox-inline" for="OfficialRecordHandling" title="@Languages.Translation("chkTableGeneralPartialSupportOfficialRec")">@Languages.Translation("chkTableGeneralPartialSupportOfficialRec")</Label>
                                    </div>
                                </div>
                                <div Class="col-lg-4">
                                    <div Class="checkbox-cus">
                                        @Html.CheckBox("CanAttachToNewRow", New With {.disabled = "disabled"})
                                        <Label Class="checkbox-inline" for="CanAttachToNewRow" title="@Languages.Translation("chkTableGeneralPartialCanAddNewRow")">@Languages.Translation("chkTableGeneralPartialCanAddNewRow")</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div Class="col-lg-3">
                    <fieldset Class="admin_fieldset">
                        <legend>@Languages.Translation("tiTableGeneralPartialIcon")</legend>
                        @*<div class="col-sm-2 col-md-2"></div>*@
                        @Html.HiddenFor(Function(m) m.Picture)
                        <div Class="col-sm-7 text-right">
                            <input type="button" id="btnChange" value="@Languages.Translation("btnTableGeneralPartialChange")" Class="btn btn-primary btn-sm" title="@Languages.Translation("btnTableGeneralPartialChange")"/>
                        </div>
                        <div Class="col-sm-5">
                            <img Class="pull-left" src="@Url.Content("~/Images/icons/FOLDERS.ICO")" id="iconDefault" width="32" height="32" />
                        </div>
                    </fieldset>
                </div>
            </div>
            <fieldset Class="admin_fieldset">
                <legend>@Languages.Translation("tiTableGeneralPartialDBTuning")</legend>
                <div Class="col-lg-9">
                    <div Class="row">
                        <div Class="col-lg-6">
                            <div Class="form-group">
                                <Label Class="control-label col-md-3 col-lg-6" for="ADOQueryTimeout" title="@Languages.Translation("lblTableGeneralPartialQryTimeOut")">@Languages.Translation("lblTableGeneralPartialQryTimeOut")</Label>
                                <div Class="col-lg-6 col-md-7 controls">
                                    @Html.TextBoxFor(Function(m) m.ADOQueryTimeout, New With {.class = "form-control", .MaxLength = "9"})
                                </div>
                            </div>
                            <div Class="form-group">
                                <Label Class="control-label col-md-3 col-lg-6" for="ADOCacheSize" title="@Languages.Translation("lblTableGeneralPartialCacheSize")">@Languages.Translation("lblTableGeneralPartialCacheSize")</Label>
                                <div Class="col-lg-6 col-md-7 controls">
                                    @Html.TextBoxFor(Function(m) m.ADOCacheSize, New With {.class = "form-control", .MaxLength = "9"})
                                </div>
                            </div>
                        </div>
                        <div Class="col-lg-6">
                            <div Class="form-group">
                                <Label Class="control-label col-md-3 col-lg-6" title="@Languages.Translation("lblTableGeneralPartialMaxDropDwnRec")">@Languages.Translation("lblTableGeneralPartialMaxDropDwnRec")</Label>
                                <div Class="col-lg-6 col-md-7 controls">
                                    @Html.TextBoxFor(Function(m) m.MaxRecsOnDropDown, New With {.class = "form-control", .MaxLength = "9"})
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="cursor_location" Class="col-lg-3">
                    <fieldset Class="admin_fieldset">
                        <legend>@Languages.Translation("tiTableGeneralPartialCursorLocation")</legend>
                        <div Class="col-sm-12">
                            <span Class="radio-cus">
                                <input type="radio" name="ADOServerCursor" id="client" value="client">
                                <Label Class="radio-inline" for="client" title="@Languages.Translation("lblTableGeneralPartialClientSide")">@Languages.Translation("lblTableGeneralPartialClientSide")</Label>
                            </span>
                            <span Class="radio-cus">
                                <input type="radio" name="ADOServerCursor" id="server" value="server">
                                <Label Class="radio-inline" for="server" title="@Languages.Translation("lblTableGeneralPartialServerSide")">@Languages.Translation("lblTableGeneralPartialServerSide")</Label>
                            </span>
                        </div>
                    </fieldset>
                </div>
            </fieldset>
            <fieldset Class="admin_fieldset">
                <legend>@Languages.Translation("tiTableGeneralPartialAuditing")</legend>
                <div class="col-sm-12">
                    <div class="form-group">
                        <div Class="col-lg-3">
                            <div Class="checkbox-cus">
                                @Html.CheckBox("AuditConfidentialData")
                                <Label for="AuditConfidentialData" class="checkbox-inline" title="@Languages.Translation("chkTableGeneralPartialAuditConfidnlDataAcce")">@Languages.Translation("chkTableGeneralPartialAuditConfidnlDataAcce")</Label>
                            </div>
                        </div>
                        <div Class="col-lg-4">
                            <div Class="checkbox-cus">
                                @Html.CheckBox("AuditUpdate")
                                <Label for="AuditUpdate" Class="checkbox-inline" title="@Languages.Translation("chkTableGeneralPartialAuditUpdate")">@Languages.Translation("chkTableGeneralPartialAuditUpdate")</Label>
                            </div>
                        </div>
                        <div Class="col-lg-4">
                            <div Class="checkbox-cus">
                                @Html.CheckBox("AuditAttachments")
                                <Label for="AuditAttachments" class="checkbox-inline" title="@Languages.Translation("chkTableGeneralPartialAuditAttach")">@Languages.Translation("chkTableGeneralPartialAuditAttach")</Label>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset Class="admin_fieldset">
                <legend>@Languages.Translation("tiTableGeneralPartialFullTxtSearch")</legend>
                <Label Class="col-lg-2 col-md-3 control-label" for="SearchOrder" title="@Languages.Translation("lblTableGeneralPartialSortOrdr")">@Languages.Translation("lblTableGeneralPartialSortOrdr")</Label>
                <div Class="col-lg-6 col-md-7 controls">
                    <select id="SearchOrder" name="SearchOrder" Class="form-control"></select>
                </div>
            </fieldset>
            <div Class="sticker stick">
                    <input type="button" id="btnApply" value="@Languages.Translation("Apply")" Class="btn btn-primary pull-right" />
            </div>
        <div class="clearfix"></div>
        </div>
    End Using
    <style>
        .highlightClass {background: #faffd2;}
        .highlightClass a {color: #7e0036;}
        .dd-option {color: #232323;}
    </style>
    @Using Html.BeginForm("GeneralIconChange", "Admin", FormMethod.Post, New With {.id = "frmIconChange", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
        @<div class="modal fade" id="mdlIconSetting" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiTableGeneralPartialIconSel")</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div id="scrollDiv" style="overflow:auto;height:400px;">
                                <ul id="selectable" style="list-style:none;cursor:pointer;"></ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="btnSave" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Ok").ToUpper()</button>
                        <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                    </div>
                </div>
            </div>
        </div>
    End Using
    <div class="modal fade" id="mdlOfficialRecord" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" style="height:200px">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiTableGeneralPartialIconSel")</h4>
                </div>
                <div class="modal-body">
                    <label id="warningLabel" class="control-label"></label>
                </div>
                <div class="modal-footer">
                    <div id="fourTrueBtn">
                        <button id="btnFirst" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">@Languages.Translation("btnTableGeneralPartial1stVersion")</button>
                        <button id="btnLast" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">@Languages.Translation("btnTableGeneralPartialLastVersion")</button>
                        <button id="btnNotSet" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">@Languages.Translation("btnTableGeneralPartialDontSet")</button>
                        <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                    </div>
                    <div id="threeFalseBtn">
                        <button id="btnRemove" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Remove")</button>
                        <button id="btnRetain" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">@Languages.Translation("btnTableGeneralPartialRetain")</button>
                        <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<script src="@Url.Content("~/Scripts/AppJs/TableGeneral.js")"></script>