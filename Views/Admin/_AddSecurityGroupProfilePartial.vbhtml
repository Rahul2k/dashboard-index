@Imports TabFusionRMS.Models
@ModelType SecureGroup

@Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmGroupAddEditScreen", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})

    @<div class="modal fade" id="mdlSecurityGroupsAddEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel"><label id="lblSecurityTitlelbl"> @Languages.Translation("tiASGPPartialAddNewGrp")</label></h4>
                </div>
                <div Class="modal-body">
                    @Html.HiddenFor(Function(m) m.GroupID, New With {.value = "0"})
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiASGPPartialGrpProfile")</legend>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="GroupName">@Languages.Translation("lblASGPPartialGrpName"):</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.GroupName, New With {.class = "form-control", .placeholder = Languages.Translation("lblASGPPartialGrpName"), .required = "", .autofocus = "", .maxlength = "50"})
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="Description">@Languages.Translation("Description"):</label>
                                <div class="col-sm-8">
                                    @Html.TextAreaFor(Function(m) m.Description, New With {.class = "form-control", .placeholder = Languages.Translation("Description"), .required = "", .autofocus = "", .maxlength = "100"})
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="AutoLockSeconds">@Languages.Translation("lblASGPPartialAutoLock"):</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.AutoLockSeconds, New With {.class = "form-control", .placeholder = Languages.Translation("lblASGPPartialAutoLock"), .required = "", .autofocus = ""})
                                    @Languages.Translation("lblASGPPartialAutoLockMsg")
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="AutoLogOffSeconds">@Languages.Translation("lblASGPPartialAutoLogOff") :</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.AutoLogOffSeconds, New With {.class = "form-control", .required = "", .autofocus = "", .maxlength = "4"})
                                    @Languages.Translation("lblASGPPartialAutoLogOffMsg")
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button id="btnSaveSecurityGroup" type="button" class="btn btn-primary">@Languages.Translation("Save")</button>
                    <button id="btnSecurityGroupClose" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
End Using