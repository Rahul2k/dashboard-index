@Imports TabFusionRMS.Models
@ModelType TabFusionRMS.Models.SLRetentionCitation

@Using Html.BeginForm("SetCitationCode", "Retention", FormMethod.Post, New With {.id = "frmCitationCodeDetails", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlCitationCode" tabindex="-1"  aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("CitationMaintenance")</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                @Html.HiddenFor(Function(m) m.SLRetentionCitationId, New With {.value = "0"})
                                <label class="col-sm-3 control-label" for="Id">@Languages.Translation("lblAddCitationCodeCitation")</label>
                                <div class="col-sm-9">
                                    <input type="text" id="txtCitation" name="Citation" class="form-control" maxlength="20" placeholder="@Languages.Translation("phAddCitationCodeCitationCode")" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="Subject">@Languages.Translation("lblAddCitationCodeSubject")</label>
                                <div class="col-sm-9">
                                    <input type="text" id="txtSubject" name="Subject" class="form-control" maxlength="100" placeholder="@Languages.Translation("lblAddCitationCodeSubject")" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="Notes">@Languages.Translation("lblAddCitationCodeNotation")</label>
                                <div class="col-sm-9">
                                    <textarea id="txtNotation" name="Notation" cols="20" rows="2" style="resize:none;" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="LegalPeriod">@Languages.Translation("lblAddCitationCodeLegalPeriod")</label>
                                <div class="col-sm-9">
                                    @*<div class="input-group">*@
                                        <input type="text" id="txtLegalPeriod" name="LegalPeriod" class="form-control" maxlength="10" />
                                        @*<label class="input-group-addon desc-info">@Languages.Translation("lblAddCitationCodeInYears")</label>*@
                                    @*</div>*@
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-offset-4 col-sm-4">
                                <button id="btnGetAssigenedRetentionCodes" type="button" class="btn btn-primary">@Languages.Translation("btnAddCitationCodeAssignedRetCodes")</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="btnSaveCitationCode" type="button" class="btn btn-primary">@Languages.Translation("Save")</button>
                        <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
        </div>

        @<div class="modal fade" id="mdlListRetentionCodes" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel"><span id="codeAssignmentVal"> <label id="lblCitationCode"></label></span></h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <label class="col-sm-12">@Languages.Translation("tiAddCitationCodeCurrAssignedRetCodes")</label>
                            <div class="col-sm-12">
                                <select id="lstRetentionCodes" size="10" class="form-control"></select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="btnCancelCodes" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Close")</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    End Using
