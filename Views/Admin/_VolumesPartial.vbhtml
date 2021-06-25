@Imports TabFusionRMS.Models
@ModelType Volume


@Using Html.BeginForm("SetVolumesDetails", "Admin", FormMethod.Post, New With {.id = "frmVolumesDetails", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})

    @<div class="modal fade" id="mdlVolumeDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiValumnsPartialVD")</h4>
                </div>
                <div class="modal-body">
                    @*@Html.HiddenFor(Function(m) m.SystemAddressesId, New With {.value = ViewBag.SystemAddressId})*@
                    @Html.HiddenFor(Function(m) m.SystemAddressesId, New With {.value = 0})
                    @Html.HiddenFor(Function(m) m.Id, New With {.value = "0"})
                    @Html.HiddenFor(Function(m) m.ViewGroup, New With {.value = "0"})
                   
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="Name">@Languages.Translation("Name")</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.Name, New With {.class = "form-control", .placeholder = Languages.Translation("Name"), .required = "", .autofocus = "", .maxlength = "50"})
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="PathName">@Languages.Translation("lblValumnsPartialPath")</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.PathName, New With {.class = "form-control", .placeholder = Languages.Translation("lblValumnsPartialPath"), .required = "", .autofocus = ""})
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="DirDiskMBLimitation">@Languages.Translation("lblValumnsPartialSizeLimtInMB")</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.DirDiskMBLimitation, New With {.class = "form-control", .placeholder = Languages.Translation("lblValumnsPartialSizeLimtInMB"), .autofocus = "", .maxlength = "10"})
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="DirCountLimitation">@Languages.Translation("lblValumnsPartialMaxNoOfFiles")</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.DirCountLimitation, New With {.class = "form-control", .placeholder = Languages.Translation("lblValumnsPartialMaxNoOfFiles"), .autofocus = "", .maxlength = "10"})
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="Active">@Languages.Translation("lblValumnsPartialAcptNewFiles")</label>
                                <div class="col-sm-1">
                                    <div class="checkbox-cus">
                                    @*@Html.CheckBoxFor(Function(m) m.Active, New With {.class = "form-control", .autofocus = ""})*@
                                    <input id="Active" name="Active" class="form-control" value="false" type="checkbox" autofocus="" />
                                    <label class="checkbox-inline" for="Active">&nbsp;</label>
                                </div></div>
                            </div>
                        </div>
                    </div>
                    
                    @*<div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="Online">@Languages.Translation("lblValumnsPartialOnline")</label>
                                <div class="col-sm-1">
                                    <div class="checkbox-cus">
                                    @Html.CheckBoxFor(Function(m) m.Online, New With {.class = "form-control", .autofocus = ""})
                                        <input id="Online" name="Online" class="form-control" value="false" type="checkbox" autofocus="" />
                                    <label class="checkbox-inline" for="Online">&nbsp;</label>
                                </div></div>
                            </div>
                        </div>
                    </div>*@
                    @*<div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="OfflineLocation">@Languages.Translation("lblValumnsPartialOffLinDesc")</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.OfflineLocation, New With {.class = "form-control", .placeholder = Languages.Translation("lblValumnsPartialOffLinDesc"), .autofocus = "", .maxlength = "50"})
                                </div>
                            </div>
                        </div>
                    </div>*@
                    
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="ImageTableName">@Languages.Translation("lblValumnsPartialImgTable")</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.ImageTableName, New With {.class = "form-control", .placeholder = Languages.Translation("lblValumnsPartialImgTable"), .autofocus = "", .maxlength = "20"})
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
                <div class="modal-footer">
                    <button id="btnSaveVolumes" type="button" class="btn btn-primary">@Languages.Translation("Save")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

End Using

@*<script src="@Url.Content("~/Scripts/AppJs/Directories.js")"></script>*@