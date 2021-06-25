@Code
    ViewData("Title") = Languages.Translation("tiUploadAttachFile")
    Layout = "~/Views/Shared/_LayoutAdmin.vbhtml"
End Code

<section class="content">
    <div id="LoadUserControl">
        <div class="form-group row">
            <label class="col-sm-3 col-md-3 control-label" for="ddlOutputSettings">@Languages.Translation("lblScannerOutputSetting")</label>
            <div class="col-sm-5 col-md-5">
                @Html.DropDownList("ddlOutputSettings", DirectCast(ViewBag.OutputSettingsList, IEnumerable(Of SelectListItem)), New With {.class = "form-control"})
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-3 col-md-3 control-label" for="ddlTables">@Languages.Translation("lblUploadTables")</label>
            <div class="col-sm-5 col-md-5">
                @Html.DropDownList("ddlTables", DirectCast(ViewBag.TablesList, IEnumerable(Of SelectListItem)), New With {.class = "form-control"})
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-3 col-md-3 control-label" for="TableId">@Languages.Translation("lblUploadTableId")</label>
            <div class="col-sm-5 col-md-5">
                <input type="text" class="form-control" placeholder=@Languages.Translation("phUploadTableId") maxlength="5" id="TableId" name="TableId" />
            </div>
        </div>
        <div class="form-group row pull-left">
            <button id="btnAttachFile" type="button" class="btn btn-primary">@Languages.Translation("btnUploadAttachFile")</button>
            <button id="btnCancel" type="button" class="btn btn-primary" aria-hidden="true">@Languages.Translation("Cancel")</button>
        </div>
    </div>
</section>
<script src="@Url.Content("~/Scripts/AppJs/UploadDocument.js")"></script>





