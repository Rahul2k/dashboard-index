@Imports TabFusionRMS.Models
@ModelType OneStripJob

@Code
    ViewData("Title") = Languages.Translation("tiIndexLabelManager")
    Layout = "~/Views/Shared/_LayoutNoMenu.vbhtml"
End Code

<head>
    <meta charset="utf-8">
    <title>resizable demo</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <link href="~/content/themes/tab/css/evol.colorpicker.css" rel="stylesheet" type="text/css">
    <style>
        #resizable {
            background: #fff;
        }
    </style>
</head>


<script type="text/javascript">
    window.onfocus = function () {
        if (getCookie("Islogin") == "False") {
            window.location.href = window.location.origin + "/signin.aspx?out=1"
        }
    };
</script>
<h1 class="main_title">
    <span id="title"> @Languages.Translation("tiIndexLabelManager")</span>
</h1>
<div class="row">
    <div class="col-sm-12">
        <div id="LoadUserControl" style="overflow-y:auto; overflow-x:hidden; "></div>
    </div>
</div>

@Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmAddNewLabel", .ReturnUrl = ViewData("ReturnUrl")})
    @Html.AntiForgeryToken
    @<div class="modal fade" id="mdlAddNewLabel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-lblMng">
            <div class="modal-content">
                <div class="modal-header cursor-drag-icon">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">@Languages.Translation("tiIndexEnterLabelInfo")</h4>
                </div>
                <!-- Select Basic -->
                <div class="modal-body">
                    <div class="form-horizontal">
                        @Html.HiddenFor(Function(m) m.Id, New With {.id = "Id", .name = "Id"})
                        <div class="form-group">
                            <label for="labelName" class="col-sm-4 control-label">@Languages.Translation("lblIndexLabelName")</label>
                            <div class="col-sm-8">
                                @Html.TextBoxFor(Function(m) m.Name, New With {.class = "form-control input-md", .id = "labelName", .name = "labelName", .type = "text", .autofocus = "", .maxlength = "50"})
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="fieldName" class="col-sm-4 control-label">@Languages.Translation("TableName")</label>
                            <div class="col-sm-8">
                                <select id="TableName" name="TableName" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="fieldName" class="col-sm-4 control-label">@Languages.Translation("lblIndexForm")</label>
                            <div class="col-sm-8">
                                <select id="FormName" name="FormName" class="form-control" style="font-family:monospace;font-size: 11px;">
                                    <option value="abc" disabled>@Languages.Translation("ddlOptIndexFormName")</option>
                                </select>
                            </div>
                        </div>
                        <hr />
                        <div class="form-group">
                            <label for="fieldFormat" class="col-sm-4 control-label">@Languages.Translation("lblIndexSQLStatement")</label>
                            <div class="col-sm-8">
                                @Html.TextAreaFor(Function(m) m.SQLString, New With {.class = "form-control input-md", .id = "sqlString", .rows = "4", .name = "sqlString", .type = "text", .autofocus = "", .style = "resize: none;"})
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sampling" class="col-sm-4 control-label">@Languages.Translation("lblIndexRowsToSample")</label>
                            <div class="col-sm-5">
                                @Html.TextBoxFor(Function(m) m.Sampling, New With {.class = "form-control", .id = "sampling", .name = "sampling", .type = "number", .autofocus = "", .maxlength = "50", .step = "10", .min = "0", .max = "90"})
                            </div>
                            <div class="col-sm-3">
                                <button id="btnSQLString" type="button" class="btn btn-primary btn-block">@Languages.Translation("lblIndexCreateSQL")</button>
                            </div>
                        </div>
                        <hr />
                        <div class="form-group">
                            <label for="fieldFormat" class="col-sm-4 control-label">@Languages.Translation("lblIndexSQLUpdate")</label>
                            <div class="col-sm-8">
                                @Html.TextAreaFor(Function(m) m.SQLUpdateString, New With {.class = "form-control input-md", .id = "sqlUpdate", .rows = "4", .name = "sqlUpdate", .type = "text", .autofocus = "", .style = "resize: none;"})
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="drawLabels" class="col-sm-4 control-label">@Languages.Translation("lblIndexDisplayLblOutline")</label>
                            <div class="col-sm-8 m-t-5">
                                <div class="checkbox-cus">
                                    <input id="DrawLabels" name="DrawLabels" type="checkbox" />
                                    <label class="checkbox-inline" for="DrawLabels">&nbsp;</label>
                                    @*@Html.CheckBoxFor(Function(m) m.DrawLabels)*@
                                </div>
                            </div>
                        </div>
                        <div class="form-group" style="display:none">
                            <label for="barWidth" class="col-sm-4 control-label">@Languages.Translation("lblAddBarCodePartialWidth")</label>
                            <div class="col-sm-8">
                                @Html.TextBoxFor(Function(m) m.LabelWidth, New With {.class = "form-control input-md", .id = "stageWidth", .name = "stageWidth", .type = "text", .autofocus = ""})
                            </div>
                        </div>
                        <div class="form-group" style="display:none">
                            <label for="barHeight" class="col-sm-4 control-label">@Languages.Translation("lblIndexHeight")</label>
                            <div class="col-sm-8">
                                @Html.TextBoxFor(Function(m) m.LabelHeight, New With {.class = "form-control input-md", .id = "stageHeight", .name = "stageHeight", .type = "text", .autofocus = ""})
                            </div>
                        </div>
                        <div class="form-group" style="display:none">
                            <label for="barHeight" class="col-sm-4 control-label">@Languages.Translation("lblIndexFormId")</label>
                            <div class="col-sm-8">
                                @Html.TextBoxFor(Function(m) m.OneStripFormsId, New With {.class = "form-control input-md", .id = "formId", .name = "formId", .type = "text", .autofocus = ""})
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnAddNewLabel" onclick="fn_AddNewLabel()" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                    <button id="btnReset" onclick="fn_ResetAddNewLabel()" type="button" class="btn btn-primary">@Languages.Translation("Reset")</button>
                </div>
            </div>
        </div>
        <div id="mdlAddNewLabelClone" class="fixed-footer affixed"></div>
    </div>
End Using

<script src="~/content/themes/tab/js/kinetic-v5.1.0.min.js"></script>
<script src="~/content/themes/tab/js/jsbarcode.js"></script>
<script src="~/content/themes/tab/js/code128.js"></script>
<script src="~/content/themes/tab/js/code39.js"></script>
<script src="~/content/themes/tab/js/ean_upc.js"></script>
<script src="~/content/themes/tab/js/itf.js"></script>
<script src="~/content/themes/tab/js/itf14.js"></script>
<script src="~/content/themes/tab/js/jquery.qrcode-0.12.0.min.js"></script>
<script src="~/content/themes/tab/js/canvas-toblob.js"></script>
<script src="~/content/themes/tab/js/evol.colorpicker.min.js"></script>
<script src="~/scripts/appjs/labelmanager.js"></script>

