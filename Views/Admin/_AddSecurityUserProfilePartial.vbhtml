@Imports TabFusionRMS.Models
@ModelType SecureUser

@Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmUserAddEditScreen", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})

    @<div class="modal fade" id="mdlSecurityUsersAddEdit" tabindex="-1" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="hdSecurityUsersHeader"></h4>
                </div>
                <div class="modal-body">
                    @Html.HiddenFor(Function(m) m.UserID, New With {.value = "0"})
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiASUPPartialUserProfile")</legend>
                        <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="UserName">@Languages.Translation("Username"):</label>
                            <div class="col-sm-8">
                                @Html.TextBoxFor(Function(m) m.UserName, New With {.class = "form-control", .placeholder = Languages.Translation("Username"), .required = "", .autofocus = ""})
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="FullName">@Languages.Translation("lblASUPPartialFullName"):</label>
                            <div class="col-sm-8">
                                @Html.TextBoxFor(Function(m) m.FullName, New With {.class = "form-control", .placeholder = Languages.Translation("lblASUPPartialFullName"), .required = "", .autofocus = "", .maxlength = "50"})
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-4 control-label">
                                @Languages.Translation("lblASUPPartialEmailAddress"):
                            </label>
                            <div class="col-sm-8">
                                @Html.TextBoxFor(Function(m) m.Email, New With {.class = "form-control", .placeholder = Languages.Translation("lblASUPPartialEmailAddress"), .required = "", .autofocus = ""})
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-4 control-label">
                                @Languages.Translation("lblASUPPartialMiscellaneous"):
                            </label>
                            <div class="col-sm-4">
                                @Html.TextBoxFor(Function(m) m.Misc1, New With {.class = "form-control", .required = "", .autofocus = "", .maxlength = "30"})
                            </div>
                            <div class="col-sm-4">
                                @Html.TextBoxFor(Function(m) m.Misc2, New With {.class = "form-control", .required = "", .autofocus = "", .maxlength = "30"})
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-4 control-label">
                                @Languages.Translation("lblASUPPartialAccountDisabled"):
                            </label>
                            <div class="col-sm-8">
                                <div class="checkbox-cus">
                                    @Html.CheckBoxFor(Function(m) m.AccountDisabled, New With {.autofocus = ""})
                                    <label class="checkbox-inline" for="AccountDisabled">
                                        @Languages.Translation("lblASUPPartialDeniesAccessToSystem")
                                    </label>
                                </div>
                            </div>
                        </div></div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button id="btnSaveSecurityUser" type="button" class="btn btn-primary">@Languages.Translation("Save")</button>
                    <button id="btnSecurityUserClose" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
End Using