<style>
    .sticker.stick {
        right: 48px;
    }

    .sticker {
        right: 0px;
        margin-bottom: 15px;
    }
</style>
<section class="content form-horizontal">
    <div>
        <div class="row">
            <div class="col-sm-10">
                <label id="lblLevel1Container"></label>
            </div>
        </div>
    </div>

    <div id="parentTblRet">
        <fieldset class="admin_fieldset">
            <legend>@Languages.Translation("tiTableRetenntionPartialTitle")</legend>
            <div class="form-group">
                <div class="col-sm-6">
                    <input type="hidden" id="hdnActionType" value="N" />
                    <span class="radio-cus">
                        <input type="radio" name="disposition" value="0" checked="checked" id="rdbNone" />
                        <label class="radio-inline" for="rdbNone">@Languages.Translation("None")</label>
                    </span>
                    <p><h5><small class="small-font">@Languages.Translation("lblTableRetenntionPartialRetentionDisable4Tbl")</small></h5></p>
                </div>
                <div class="col-sm-6">
                    <span class="radio-cus">
                        <input type="radio" name="disposition" value="2" id="rdbDestruction" />
                        <label class="radio-inline" for="rdbDestruction">@Languages.Translation("lblTableRetenntionPartialDestruction")</label>
                    </span>
                    <p><h5><small class="small-font">@Languages.Translation("lblTableRetenntionPartialDestructionMsg")</small></h5></p>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <span class="radio-cus">
                        <input type="radio" name="disposition" value="1" disabled="disabled" id="rdbPermanentArchiv" />
                        <label class="radio-inline" for="rdbPermanentArchiv">@Languages.Translation("lblTableRetenntionPartialPermanentArchive")</label>
                    </span>
                    <p><h5><small id="lblPermanentArchive" class="small-font"></small></h5></p>
                </div>
                <div class="col-sm-6">
                    <span class="radio-cus">
                        <input type="radio" name="disposition" value="3" id="rdbPartialPurge" />
                        <label class="radio-inline" for="rdbPartialPurge">@Languages.Translation("lblTableRetenntionPartialPurge")</label>
                    </span>
                    <p><h5><small class="small-font">@Languages.Translation("lblTableRetenntionPartialPurgeMsg")</small></h5></p>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <p><h5><small class="small-font">@Languages.Translation("lblTableRetenntionPartialarchDefinedInDB")</small></h5></p>
                </div>
            </div>
        </fieldset>

        <div class="form-group">
            <div class="col-md-6">
                <div class="checkbox-cus">
                    <input type="checkbox" id="chkInactivity" name="Inactivity" />
                    <label class="checkbox-inline" for="chkInactivity">@Languages.Translation("lblTableRetenntionPartialInactivity")</label>
                </div>
            </div>
        </div>

        <fieldset class="admin_fieldset">
            <legend>@Languages.Translation("tiTableRetenntionPartialRetCodeAssignMethod")</legend>
            <div class="form-group">
                <div class="col-sm-4">
                    <span class="radio-cus">
                        <input type="radio" name="assignment" value="0" checked="checked" id="rdbPartialManually" />
                        <label class="radio-inline" for="rdbPartialManually">@Languages.Translation("lblTableRetenntionPartialManually")</label>
                    </span>
                    <p><h5><small class="small-font">@Languages.Translation("lblTableRetenntionPartialManuallyDesc")</small></h5></p>
                </div>
                <div class="col-sm-4">
                    <span class="radio-cus">
                        <input type="radio" name="assignment" value="1" id="rdbByCurrentTbl" />
                        <label class="radio-inline" for="rdbByCurrentTbl">@Languages.Translation("lblTableRetenntionPartialByCurTbl")</label>
                    </span>
                    <p><h5><small class="small-font">@Languages.Translation("lblTableRetenntionPartialByCurTblDesc")</small></h5></p>
                </div>
                <div class="col-sm-4">
                    <span class="radio-cus">
                        <input type="radio" name="assignment" value="2" disabled="disabled" id="rdbByRelateTbl" />
                        <label class="radio-inline" for="rdbByRelateTbl">@Languages.Translation("lblTableRetenntionPartialByRelTbl")</label>
                    </span>
                    <p><h5><small class="small-font">@Languages.Translation("lblTableRetenntionPartialByRelTblDesc")</small></h5></p>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiTableRetenntionPartialDefRetCode")</legend>
                        <select id="lstRetentionCodes" class="form-control"></select>
                    </fieldset>
                </div>
                <div class="col-sm-6">
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiTableRetenntionPartialRetTable")</legend>
                        <select id="lstRelatedTables" disabled="disabled" class="form-control"></select>
                    </fieldset>
                </div>
            </div>
        </fieldset>

        <fieldset class="admin_fieldset">
            <legend>@Languages.Translation("tiRetentionPropertiesPartialFielsDefinitions")</legend>

            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <label class="col-sm-12">@Languages.Translation("lblTableRetenntionPartialRetenCode")</label>
                        <div class="col-md-6 controls">
                            <select id="lstFieldRetentionCode" class="form-control"></select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-sm-12">@Languages.Translation("lblTableRetenntionPartialDateOpened")</label>
                        <div class="col-sm-12 controls">
                            <select id="lstFieldDateOpened" class="form-control"></select>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-sm-12">@Languages.Translation("lblTableRetenntionPartialDateClosed")</label>
                        <div class="col-sm-12 controls">
                            <select id="lstFieldDateClosed" class="form-control"></select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-sm-12">@Languages.Translation("lblTableRetenntionPartialDateCreated")</label>
                        <div class="col-sm-12 controls">
                            <select id="lstFieldDateCreated" class="form-control"></select>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-sm-12">@Languages.Translation("lblTableRetenntionPartialOtherDate")</label>
                        <div class="col-sm-12 controls">
                            <select id="lstFieldOtherDate" class="form-control"></select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <p><h5><small id="lblStarField" class="small-font">@Languages.Translation("lblTableRetenntionPartialStartField")</small></h5></p>
                </div>
            </div>

        </fieldset>
        <div class="row">
            <div class="col-sm-12 sticker stick">
                <button id="btnSaveRetentionInfo" type="button" class="btn btn-primary pull-right">@Languages.Translation("Apply")</button>
            </div>
        </div>
    </div>
</section>
@*<script src="@Url.Content("~/Scripts/AppJs/TableRetention.js")"></script>*@