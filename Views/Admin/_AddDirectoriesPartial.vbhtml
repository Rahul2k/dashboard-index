@Imports TabFusionRMS.Models
@ModelType SystemAddress

@Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmDriveDetails", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})

    @<div class="modal fade" id="mdlDriveDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiAddDirectoryesPartialDriveDetails")</h4>
                </div>
                <div class="modal-body">
                    @Html.HiddenFor(Function(m) m.Id, New With {.value = "0"})
                    
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="FirstName">@Languages.Translation("Name")</label>
                                <div class="col-sm-9">
                                    @Html.TextBoxFor(Function(m) m.DeviceName, New With {.class = "form-control", .placeholder = Languages.Translation("phAddDirectoryesPartialDeviceName"), .required = "", .autofocus = "", .maxlength = "50"})
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="LastName">@Languages.Translation("lblAddDirectoryesPartialDriveLtrUNC")</label>
                                <div class="col-sm-9">
                                    @Html.TextBoxFor(Function(m) m.PhysicalDriveLetter, New With {.class = "form-control", .placeholder = Languages.Translation("phAddDirectoryesPartialDriveLtrUNC"), .required = "", .autofocus = "", .maxlength = "2", .Style = "text-transform:uppercase;"})
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button id="btnSaveDrive" type="button" class="btn btn-primary">@Languages.Translation("Save")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

End Using
@*<script src="@Url.Content("~/Scripts/AppJs/Directories.js")"></script>*@