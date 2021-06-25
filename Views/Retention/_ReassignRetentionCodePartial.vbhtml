
@Using Html.BeginForm("ReassignRetentionCode", "Retention", FormMethod.Post, New With {.id = "frmReassignRetentionCode", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    @*@Html.AntiForgeryToken*@

@<div class="modal fade" id="mdlReassignRetentionCode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiReassignRetentionCodePartialReassignARetCode")</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-12">
                                @Languages.Translation("lblReassignRetentionCodePartialUtilityAllowsU2ReassignAllRecs")
                            </label>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 col-md-3 control-label" for="TableName">@Languages.Translation("Table")</label>
                            <div class="col-sm-9 col-md-9">
                                <select id="lstTable" name="TableName" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 col-md-3 control-label" for="OldRetentionCode">@Languages.Translation("lblReassignRetentionCodePartialOldRetCode")</label>
                            <div class="col-sm-9 col-md-9">
                                <select id="lstOldRetentionCode" name="OldRetentionCode" class="form-control"></select>
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-sm-3 col-md-3 control-label" for="NewRetentionCode">@Languages.Translation("lblReassignRetentionCodePartialNewRetCode")</label>
                             <div class="col-sm-9 col-md-9">
                                 <select id="lstNewRetentionCode" name="NewRetentionCode" class="form-control"></select>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btnOk" type="button" class="btn btn-primary" disabled="disabled">@Languages.Translation("Ok").ToUpper()</button>
                <button id="btnReassignCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

                          End Using

@*<script src="@Url.Content("~/Scripts/AppJs/ReassignRetentionCode.js")"></script>*@