
<section class="content">
    <div class="modal fade" id="mdlDetailedCitationCode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("CitationMaintenance")</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="form-group">
                                <label class="col-sm-3 col-md-3 control-label" for="Id">@Languages.Translation("lblAddCitationCodeCitation")</label>
                                <div class="col-sm-7 col-md-7">
                                    <input type="text" id="txtCitation" name="Citation" class="form-control" maxlength="150" placeholder="@Languages.Translation("phAddCitationCodeCitationCode")" disabled="disabled" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 col-md-3 control-label" for="Subject">@Languages.Translation("lblAddCitationCodeSubject")</label>
                                <div class="col-sm-7 col-md-7">
                                    <input type="text" id="txtSubject" name="Subject" class="form-control" maxlength="150" placeholder="@Languages.Translation("lblAddCitationCodeSubject")" disabled="disabled" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 col-md-3 control-label" for="Notes">@Languages.Translation("lblAddCitationCodeNotation")</label>
                                <div class="col-sm-7 col-md-7">
                                    <textarea id="txtNotation" name="Notation" cols="20" rows="2" style="resize:none;" class="form-control" disabled="disabled"></textarea>
                                </div>
                            </div>
                            <div class="form-group m-b-15">
                                <label class="col-sm-3 col-md-3 control-label" for="LegalPeriod">@Languages.Translation("lblAddCitationCodeLegalPeriod")</label>
                                <div class="col-sm-7 col-md-7">
                                    <div class="input-group">
                                        <input type="text" id="txtDetailedLegalPeriod" name="LegalPeriod" class="form-control" maxlength="10" disabled="disabled">
                                        <label class="input-group-addon desc-info">@Languages.Translation("lblAddCitationCodeInYears")</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="btnClose" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Close")</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>