
<section class="content form-horizontal">
    <div class="modal fade" id="mdlTblRetentionProperties" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel"><span id="retentionPropName"></span> @Languages.Translation("tiRetentionPropertiesPartialRetProps")</h4>
                </div>
                <div class="modal-body">
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiRetentionPropertiesPartialRetFinalDisposition")</legend>
                        <div class="row">
                            <div class="col-sm-6">
                                <input type="hidden" id="hdnActionType" value="N" />
                                <span class="radio-cus">
                                    <input type="radio" name="disposition" value="0" checked="checked" id="rdbNone">
                                    <label class="radio-inline" for="rdbNone">@Languages.Translation("None")</label>
                                </span>
                                <p><h5><small class="small-font">@Languages.Translation("lblRetentionPropertiesPartialRetDisable4Tbl")</small></h5></p>
                            </div>
                            <div class="col-sm-6">
                                <span class="radio-cus">
                                    <input type="radio" name="disposition" value="2" id="rdbDestruction" />
                                    <label class="radio-inline" for="rdbDestruction">@Languages.Translation("chkRetentionPropertiesPartialDestruction")</label>
                                </span>
                                <p><h5><small class="small-font">@Languages.Translation("lblRetentionPropertiesPartialRecsRMarkedAsDestroyed")</small></h5></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <span class="radio-cus">
                                    <input type="radio" name="disposition" value="1" disabled="disabled" id="rdbPermanentArchiv" />
                                    <label class="radio-inline" for="rdbPermanentArchiv">@Languages.Translation("chkRetentionPropertiesPartialPermanentArchiv")</label>
                                </span>
                                <p><h5><small class="small-font" id="lblPermanentArchive"></small></h5></p>
                            </div>
                            <div class="col-sm-6">
                                <span class="radio-cus">
                                    <input type="radio" name="disposition" value="3" id="rdbPartialPurge" />
                                    <label class="radio-inline" for="rdbPartialPurge">@Languages.Translation("chkRetentionPropertiesPartialPurge")</label>
                                </span>
                                <p><h5><small class="small-font">@Languages.Translation("lblRetentionPropertiesPartialRecsAttachRPermanentlyDel")</small></h5></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <p><h5><small class="small-font">@Languages.Translation("lblRetentionPropertiesPartialThrRNoArciveLocations")</small></h5></p>
                            </div>
                        </div>
                    </fieldset>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="checkbox-cus">
                                <input type="checkbox" id="chkInactivity" name="Inactivity" />
                                <label class="checkbox-inline" for="chkInactivity">@Languages.Translation("chkRetentionPropertiesPartialInActivity")</label>
                            </div>
                        </div>
                    </div>
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiRetentionPropertiesPartialInRetCodeAssign")</legend>
                        <div class="row">
                            <div class="col-sm-4">
                                <span class="radio-cus">
                                    <input type="radio" name="assignment" value="0" checked="checked" id="rdbPartialManually" />
                                    <label class="radio-inline" for="rdbPartialManually">@Languages.Translation("chkRetentionPropertiesPartialManually")</label>
                                </span>
                                @*Modified by hemin
                                    <p><h5><small>@Languages.Translation("lblRetentionPropertiesPartialAllowUsr2SelRetCode</small>")</h5></p>*@
                                <p><h5><small class="small-font">@Languages.Translation("lblRetentionPropertiesPartialAllowUsr2SelRetCode")</small></h5></p>
                            </div>
                            <div class="col-sm-4">
                                <span class="radio-cus">
                                    <input type="radio" name="assignment" value="1" id="rdbByCurrentTbl" />
                                    <label class="radio-inline" for="rdbByCurrentTbl">@Languages.Translation("chkRetentionPropertiesPartialByCurrentTbl")</label>
                                </span>
                                <p><h5><small class="small-font">@Languages.Translation("lblRetentionPropertiesPartialAutoSetSingleRetCode")</small></h5></p>
                            </div>
                            <div class="col-sm-4">
                                <span class="radio-cus">
                                    <input type="radio" name="assignment" value="2" disabled="disabled" id="rdbByRelateTbl" />
                                    <label class="radio-inline" for="rdbByRelateTbl">@Languages.Translation("chkRetentionPropertiesPartialByRelateTbl")</label>
                                </span>
                                <p><h5><small class="small-font">@Languages.Translation("lblRetentionPropertiesPartialAutoSetRetCodeRelatedTbl")</small></h5></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiRetentionPropertiesPartialDefRetCode")</legend>
                                    <select id="lstRetentionCodes" class="form-control"></select>
                                </fieldset>
                            </div>
                            <div class="col-sm-6">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiRetentionPropertiesPartialRetTbls")</legend>
                                    <select id="lstRelatedTables" disabled="disabled" class="form-control"></select>
                                </fieldset>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiRetentionPropertiesPartialFielsDefinitions")</legend>
                        @*<div class="row">
                                <div class="col-sm-12 col-md-6">
                                    @Languages.Translation("lblRetentionPropertiesPartialRetCode") <select id="lstFieldRetentionCode" class="form-control"></select>
                                </div>
                            </div>*@
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label class="col-sm-12">@Languages.Translation("lblRetentionPropertiesPartialRetCode")</label>
                                    <div class="col-md-6">
                                        <select id="lstFieldRetentionCode" class="form-control"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-sm-12">@Languages.Translation("lblRetentionPropertiesPartialDateOpened") </label>
                                    <div class="col-sm-12">
                                        <select id="lstFieldDateOpened" class="form-control"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-sm-12">@Languages.Translation("lblRetentionPropertiesPartialDateClosed")</label>
                                    <div class="col-sm-12">
                                        <select id="lstFieldDateClosed" class="form-control"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-sm-12">@Languages.Translation("lblRetentionPropertiesPartialDateCreated")</label>
                                    <div class="col-sm-12">
                                        <select id="lstFieldDateCreated" class="form-control"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-sm-12">@Languages.Translation("lblRetentionPropertiesPartialOthrDate")</label>
                                    <div class="col-sm-12">
                                        <select id="lstFieldOtherDate" class="form-control"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <p><h5><small id="lblStarField" class="small-font">@Languages.Translation("lblRetentionPropertiesPartialFieldNotCurrInTbl")</small></h5></p>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button id="btnSaveRetentionProp" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    <button id="btnCancelRetentionProp" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <div id="mdlTblRetentionPropertiesClone" class="fixed-footer"></div>
        <!-- /.modal-dialog -->
    </div>
</section>