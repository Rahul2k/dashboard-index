<div class="modal-body">
    <div class="form-horizontal">
        <div class="form-group">
            <div class="col-sm-12">
                <div class="col-sm-9 pull-right">
                    <table class="cus-radio">
                        <tbody>
                            <tr>
                                <td><input id="chkHoldTypeRetention" type="checkbox" value="Retention hold"><label>Retention hold</label></td>
                                <td><input id="chkHoldTypeLegal" type="checkbox" value="Legal hold"><label>Legal hold</label></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <label class="control-label col-sm-3">
                    <span>@Languages.Translation("lblRetentionInfoHoldReason")</span>
                </label>
                <div class="col-sm-9">
                    <textarea rows="3" cols="20" id="holdReason" disabled="disabled" class="aspNetDisabled form-control"></textarea>
                </div>
            </div>
        </div>
        <hr>
        <div class="form-group">
            <div class="col-sm-12">
                <label class="col-sm-3 text-right">
                    <input type="button" value="@Languages.Translation("btnRetentionInfoSnooze")" id="btnSnooze" class="btn btn-default">
                </label>
                <div class="col-sm-9">
                    <input type="date" id="txtSnoozeDate" disabled="disabled" class="aspNetDisabled form-control">
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="col-xs-12">
                <input type="button" value="@Languages.Translation("OK")" id="btnHoldOk" class="btn btn-success">
                <input type="button" value="@Languages.Translation("Cancel")" onclick="($('#RetentionHoldingDialog').hide())" class="btn btn-default">
            </div>
        </div>
        @*<div class="form-group">
            <div class="col-sm-12">
                <label class="control-label col-sm-3">
                </label>
                <div class="col-sm-9">
                    <label>
                        <input id="Dialog_RetentionInformation_DialogRetentionInfo_chkSnooze" type="checkbox" name="ctl00$Dialog_RetentionInformation$DialogRetentionInfo$chkSnooze" onclick="javascript:setTimeout('__doPostBack(\'ctl00$Dialog_RetentionInformation$DialogRetentionInfo$chkSnooze\',\'\')', 0)"><label for="Dialog_RetentionInformation_DialogRetentionInfo_chkSnooze">Enable Snooze</label>
                    </label>
                </div>
            </div>
        </div>*@
    </div>
</div>
