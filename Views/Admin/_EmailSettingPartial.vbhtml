@Imports TabFusionRMS.Models
@ModelType TabFusionRMS.Models.System

<div class="modal fade" id="mdlEmailDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiEmailSettingsTitle")</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-3 control-label" for="UserName">@Languages.Translation("Username") :</label>
                            <div class="col-sm-9">
                                @Html.TextBoxFor(Function(m) m.SMTPUserAddress, New With {.class = "form-control", .placeholder = Languages.Translation("Username"), .autofocus = ""})
                                <span id="user_validate" hidden="hidden">@Languages.Translation("msgEmailSettingsUserNameRequired")</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-3 control-label" for="Password">@Languages.Translation("Password") :</label>
                            <div class="col-sm-9">
                                @Html.TextBoxFor(Function(m) m.SMTPUserPassword, New With {.Type = "password", .class = "form-control", .placeholder = Languages.Translation("Password"), .autofocus = ""})
                                <span id="pwd_validate" hidden="hidden">@Languages.Translation("msgEmailSettingsPasswordRequired")</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btnOk" type="button" class="btn btn-primary" data-dismiss="modal">@Languages.Translation("Ok")</button>
                <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
