<input type="hidden" value="@Model.Title" id="titleid">

<div class="modal-body">
    <div class="form-horizontal">
        <div class="form-group">
            <label for="txtOldPass" class="col-md-4 control-label">@Languages.Translation("OldPass")</label>
            <div class="col-md-7">
                <input Id="txtOldPass" type="password" class="form-control">
            </div>
            <div class="col-md-1">
                @*<asp:RequiredFieldValidator Id="rfvTxtOldPass" ValidationGroup="ChangePassword"
                                            ControlToValidate="txtOldPass" ErrorMessage="*" ForeColor="red">
                </asp:RequiredFieldValidator>*@
            </div>
        </div>
        <div class="form-group">
            <label for="txtNewPass1" class="col-md-4 control-label">@Languages.Translation("NewPass")</label>
            <div class="col-md-7">
                <input Id="txtNewPass1" MaxLength="20" type="password" class="form-control">
            </div>
            <div class="col-md-1">
                @*<asp:RequiredFieldValidator Id="rfvtxtNewPass1" runat="server" ValidationGroup="ChangePassword"
                                            ControlToValidate="txtNewPass1" ErrorMessage="*" ForeColor="red">
                </asp:RequiredFieldValidator>*@
            </div>
        </div>
        <div class="form-group">
            <label for="txtNewPass2" class="col-md-4 control-label">@Languages.Translation("ConfrmPass")</label>
            <div class="col-md-7">
                <input Id="txtNewPass2" MaxLength="20" type="password" class="form-control">
            </div>
            <div class="col-md-1">
                @*<asp:RequiredFieldValidator Id="rfvtxtNewPass2" runat="server" ValidationGroup="ChangePassword"
                                            ControlToValidate="txtNewPass2" ErrorMessage="*" ForeColor="red">
                </asp:RequiredFieldValidator>*@
            </div>
        </div>
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-8">
                <Label Id="passMsg"></Label>
            </div>
        </div>
    </div>
</div>
<div class="modal-footer">
    <Button onclick="toolsmodel.PasswordSaveClick()" class="btn btn-success text-uppercase">Change Password</Button>
</div>



