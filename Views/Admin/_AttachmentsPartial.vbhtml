@Imports TabFusionRMS.Models
@ModelType OutputSetting

<section class="content">
    @Using Html.BeginForm("SetAttachmentSettings", "Admin", FormMethod.Post, New With {.id = "frmAttachmentSettings", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
        @<div id="parent">
            <div class="form-group">
                <label class="col-lg-3 col-md-4 col-sm-12 semibld" for="DefaultOutputSetting">@Languages.Translation("lblAttachmentDefaultOutputSetting")</label>
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="form-group">
                        <div class="col-md-4 col-sm-12 bottom_space">
                            <select id="lstOutputSettingList" class="form-control"></select>
                        </div>
                        <div class="col-md-8 col-sm-12">
                            <div class="btn-toolbar">
                                <button id="btnAddOutputSettings" type="button" class="btn btn-primary">@Languages.Translation("lblAttachmentAddSettings")</button>
                                <button id="btnEditOutputSettings" type="button" class="btn btn-primary">@Languages.Translation("lblAttachmentEditSettings")</button>
                                <button id="btnRemoveOutputSettings" type="button" class="btn btn-primary">@Languages.Translation("lblAttachmentRemoveSettings")</button>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-md-3">
                            <div class="checkbox-cus">
                                <input type="checkbox" id="PrintimgFooter" name="PrintimgFooter" />
                                <label class="checkbox-inline" for="PrintimgFooter">@Languages.Translation("lblAttachmentPrintImageFooter")</label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="checkbox-cus">
                                <input type="checkbox" id="RenameOnScan" name="RenameOnScan" />
                                <label class="checkbox-inline" for="RenameOnScan">@Languages.Translation("lblAttachmentNameOnScan")</label>
                            </div>
                        </div>
                    </div>

                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("lblAttachmentISL")</legend>
                        <div class="form-group row">
                            <div class="col-lg-2 col-md-3"></div>
                            <div class="col-lg-9 col-md-9">
                                <span class="radio-cus">
                                    <input type="radio" id="ImgSlimLocation" name="ImgServiceLocation" value="1" checked="checked" />
                                    <label class="radio-inline" for="ImgSlimLocation">@Languages.Translation("lblAttachmentUseSLIMLocation")</label>
                                </span>
                                <span class="radio-cus">
                                    <input type="radio" id="ImgCustomeLocation" name="ImgServiceLocation" value="2" />
                                    <label class="radio-inline" for="ImgCustomeLocation">@Languages.Translation("lblAttachmentUseCustomLocation")</label>
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-horizontal">
                                <div class="col-lg-12 form-group">
                                    <label class="col-lg-2 col-md-3 control-label" for="CustomeLocation">@Languages.Translation("lblAttachmentCustomLocation")</label>
                                    <div class="col-lg-6 col-md-7 col-sm-12 controls">
                                        <input type="text" id="CustomeLocation" name="CustomeLocation" class="form-control" placeholder="@Languages.Translation("phAttachmentLocationURL")" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-horizontal">
                                <div class="col-lg-12 form-group">
                                    <label class="col-lg-2 col-md-3 control-label" for="ImgSlimLocationAddress">@Languages.Translation("lblAttachmentSLIMLocation")</label>
                                    <div class="col-lg-6 col-md-7 col-sm-12 controls">
                                        <input type="text" id="ImgSlimLocationAddress" name="ImgSlimLocationAddress" class="form-control" placeholder="@Languages.Translation("phAttachmentLocationURL")" required="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-lg-2 col-md-3"></div>
                            <div class="col-md-3">
                                <button id="btnApplyAttachment" type="button" class="btn btn-primary">@Languages.Translation("Apply")</button>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>


        </div>
    End Using
</section>
@Using Html.BeginForm("SetOutputSettings", "Admin", FormMethod.Post, New With {.id = "frmOutputSettings", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlOutputSetting" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("lblScannerOutputSetting")</h4>
                </div>
                <div class="modal-body">
                    @Html.HiddenFor(Function(m) m.Id, New With {.value = ""})
                    @Html.HiddenFor(Function(m) m.DefaultOutputSettingsId, New With {.value = "0"})
                    @Html.HiddenFor(Function(m) m.DirectoriesId, New With {.value = "0"})
                    @Html.HiddenFor(Function(m) m.ViewGroup, New With {.value = 0})
                    @*<div class="row">
                            <div class="form-group">
                                <label class="col-sm-3 col-md-3 control-label" for="Name">Name</label>
                                <div class="col-sm-7 col-md-7">

                                </div>
                            </div>
                        </div>*@

                    <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <div class="form-group ">
                                <label class="col-sm-3 col-md-3 control-label" for="DirName">@Languages.Translation("lblAttachmentName")</label>
                                <div class="col-sm-9 col-md-9">
                                    <input type="text" id="DirName" name="DirName" class="form-control" maxlength="20">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <div class="form-group">
                                <label class="col-sm-3 col-md-3 control-label" for="FileNamePrefix">@Languages.Translation("lblAttachmentFilePrefix") :</label>
                                <div class="col-sm-3 col-md-3">
                                    @Html.TextBoxFor(Function(m) m.FileNamePrefix, New With {.class = "form-control", .placeholder = Languages.Translation("lblAttachmentFilePrefix"), .autofocus = "", .maxlength = 2})
                                </div>
                                <label class="col-sm-3 col-md-3 control-label" for="FileExtension">@Languages.Translation("lblAttachmentFileExtension") :</label>
                                <div class="col-sm-3 col-md-3">
                                    @Html.TextBoxFor(Function(m) m.FileExtension, New With {.class = "form-control", .placeholder = Languages.Translation("lblAttachmentFileExtension"), .autofocus = "", .maxlength = 3})
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <div class="form-group">
                                <label class="col-sm-3 col-md-3 control-label" for="NextDocNum">@Languages.Translation("lblAttachmentNextDocNum") :</label>
                                <div class="col-sm-3 col-md-3">
                                    @Html.TextBoxFor(Function(m) m.NextDocNum, New With {.class = "form-control", .placeholder = Languages.Translation("lblAttachmentNextDocNum"), .required = "", .autofocus = "", .maxlength = 10})
                                </div>

                                <label class="col-sm-3 col-md-3 control-label" for="NextFileExtension">@Languages.Translation("lblAttachmentNextFileName") :</label>
                                <label class="col-sm-3 col-md-3 control-label" id="NextFileExtension"></label>
                            </div>
                        </div>
                    </div>
                    @*<div class="row">
                        <div class="col-sm-12 col-md-12">
                            <div class="form-group">
                                <label class="col-sm-3 col-md-3 control-label" for="Active">@Languages.Translation("lblAttachmentActive") :</label>
                                <div class="col-sm-1 col-md-1">
                                    <input id="InActive" name="InActive" class="form-control" value="false" type="checkbox" />
                                </div>*@

                                <div class="row">
                                    <div class="col-sm-12 col-md-12">
                                        <div class="form-group">
                                            <label class="col-sm-3 col-md-3 control-label" for="Active">@Languages.Translation("lblAttachmentActive") :</label>
                                            <div class="col-sm-9">
                                                <div class="checkbox-cus">
                                                    @*@Html.CheckBoxFor(Function(m) m.InActive, New With {.autofocus = "", .value = True})*@
                                                    <input id="InActive" name="InActive" value="false" type="checkbox" />
                                                    <label class="checkbox-inline" for="InActive">&nbsp;</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-12 col-md-12">
                                        <div class="form-group">
                                            <label class="col-sm-3 col-md-3 control-label" for="VolumesId">@Languages.Translation("lblAttachmentOutputVolume") :</label>
                                            <div class="col-sm-9 col-md-9">
                                                @Html.DropDownListFor(Function(m) m.VolumesId, DirectCast(ViewBag.OutputSettingList, SelectList), "", New With {.class = "form-control", .placeholder = Languages.Translation("lblAttachmentOutputVolume"), .required = "", .autofocus = ""})
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-12 col-md-12">
                                        <div class="form-group">
                                            <label class="col-sm-3 col-md-3 control-label"></label>
                                            <div class="col-sm-8 col-md-8">
                                                <span class="span-info">
                                                    @Languages.Translation("msgAttachmentSecurityMessage")
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button id="btnSaveOutputSettings" type="button" class="btn btn-primary">@Languages.Translation("Save")</button>
                                <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>
    '        </div>
    '    </div>
    '</div>
End Using
<script src="@Url.Content("~/Scripts/AppJs/Attachments.js")"></script>
