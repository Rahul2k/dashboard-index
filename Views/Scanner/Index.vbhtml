@Code
    ViewData("Title") = Languages.Translation("tiScannerScanner")
        Layout = "~/Views/Shared/_LayoutAdmin.vbhtml"
End Code

<section class="content-header">
    <h1>
        <span id="title">@Languages.Translation("tiScannerScanner")</span>
    </h1>
    <ol class="breadcrumb">
        <li><a href="@Url.Action("Index", "Admin")"><img src="@Url.Content("~/Images/favicon.ico")" /> @Languages.Translation("mnuAdminHome")</a></li>
        <li class="active"><span id="navigation">@Languages.Translation("lblScannerScanner")</span></li>
    </ol>
</section>
<hr />

@*<script src="~/Content/themes/TAB/js/bootstrap.fd.js" type="text/javascript"></script>*@
@*<link href="~/Content/themes/TAB/css/bootstrap.fd.css" rel="stylesheet" type="text/css" />*@

<script src="@Url.Content("~/Content/themes/TAB/js/bootstrap.fd.js")"></script>
<link href="@Url.Content("~/Content/themes/TAB/css/bootstrap.fd.css")" rel="stylesheet" />

<style>
    .bfd-dropfield-inner{
        height:200px !important;
        padding-top:69px !important;
    }
    .modal-body {
        height:500px !important;
        overflow:auto;
    }
</style>

<div id="LoadUserControl">
    @Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmAttachFile", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
        @<div>
            <div class="form-group row">
                <label class="col-sm-3 col-md-3 control-label" for="ddlOutputSettings">@Languages.Translation("lblScannerOutputSetting")</label>
                <div class="col-sm-5 col-md-5">
                    @Html.DropDownList("ddlOutputSettings", DirectCast(ViewBag.OutputSettingsList, IEnumerable(Of SelectListItem)), New With {.class = "form-control"})
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-md-3 control-label" for="ddlTables">@Languages.Translation("lblScannerTables")</label>
                <div class="col-sm-5 col-md-5">
                    @Html.DropDownList("ddlTables", DirectCast(ViewBag.TablesList, IEnumerable(Of SelectListItem)), New With {.class = "form-control"})
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-md-3 control-label" for="TableId">@Languages.Translation("lblScannerRecordId")</label>
                <div class="col-sm-5 col-md-5">
                    <input type="text" class="form-control" placeholder="@Languages.Translation("phScannerRecordId")" maxlength="5" id="TableId" name="TableId" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-md-3 control-label"></label>
                <div class="col-sm-5 col-md-5">
                    <input type="button" id="open_btn" class="btn btn-primary" value="@Languages.Translation("btnScannerAttachFiles")">
                    <button id="btnCancel" type="button" class="btn btn-primary" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            @*<div class="form-group row pull-left">
                    <button id="btnAttachFile" type="button" class="btn btn-primary">Attach File</button>
                    <button id="btnCancel" type="button" class="btn btn-primary" aria-hidden="true">Cancel</button>
                </div>*@
        </div>
    End Using
</div>

@Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmRule", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlRules" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel"><span id="modelTitle">@Languages.Translation("tiScannerNewRuleCreation")</span></h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="ScanRulesId" name="ScanRulesId" value="0" />
                    <input type="hidden" id="hdnAction" value="N" />
                    <fieldset id="fdExistingRule">
                        <legend>@Languages.Translation("legScannerExistingRuleSele")</legend>
                        <div class="row">
                            <div class="form-group">
                                <label class="col-sm-3 col-md-3 control-label" for="ScanRule">@Languages.Translation("lblScannerSelExistingRuleId")</label>
                                <div class="col-sm-8 col-md-8">
                                    @Html.DropDownList("ScanRule", DirectCast(ViewBag.ScanRuleList, SelectList), New With {.class = "form-control", .placeholder = Languages.Translation("phScannerSelExistingRuleId"), .required = "", .autofocus = ""})
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset id="fdNewRule">
                        <legend>@Languages.Translation("legScannerNewRuleCreation")</legend>
                        <div class="row">
                            <div class="form-group">
                                <label class="col-sm-3 col-md-3 control-label" for="Id">@Languages.Translation("lblScannerNewRuleId")</label>
                                <div class="col-sm-8 col-md-8">
                                    @Html.TextBox("Id", "", New With {.class = "form-control", .placeholder = Languages.Translation("phScannerNewRuleId"), .required = "", .autofocus = ""})
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button id="btnOkRule" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    <button id="btnCancel" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
                    End Using
<script>
    //$(document.body).bind("click", function (e) {
    //    RefereshPage("Scanner");
    //});
</script>

<script src="@Url.Content("~/Scripts/AppJs/Scanner.js")"></script>
