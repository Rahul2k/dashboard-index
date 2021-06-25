<section class="content">
    <div class="modal fade" id="mdlAssignCitationCode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiAssignCitationCodeCitations")</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        @*<div class="col-sm-12 col-md-12">
                            <label>@Languages.Translation("tiAssignCitationCodeCitationCodes")</label>
                        </div>*@
                        <div class="col-sm-12 col-md-12">
                            <div class="table-responsive jqgrid-cus">
                                <div id="divAssignCitationCodeGrid">
                                    <table id="grdCitationCode" align="center"></table>
                                    <div id="grdCitationCode_pager">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnCitationDetails" type="button" class="btn btn-primary">@Languages.Translation("btnAddRetentionCodeDetails")</button>
                    <button id="btnSelect" type="button" class="btn btn-primary">@Languages.Translation("lblSelect")</button>
                    <button id="btnCitatonCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
        </div>
    </div>
</section>