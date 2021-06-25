<style>
    .mgr-btm {
        margin-bottom: 15px;
    }
</style>
<section class="content">
    <div id="parent" class="form-horizontal">
        <div class="form-group">
            <div class="col-sm-12">
                <input type="button" id="btnSetupRetentionTables" name="btnSetupRetentionTables" value="@Languages.Translation("btnRetentionPartialSetUpRetTbls")" class="btn btn-primary" />
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("tiRetentionPartialRetPeriod")</legend>
                    <div style="height:100px;overflow:auto">
                        <ul id="ulRetentionActiveTables"></ul>
                    </div>
                </fieldset>
            </div>
            <div class="col-md-6">
                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("tiRetentionPartialInActPeriod")</legend>
                    <div style="height:100px;overflow:auto">
                        <ul id="ulRetentionInactiveTables"></ul>
                    </div>
                </fieldset>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 col-md-4 control-label" for="lstYear">@Languages.Translation("lblRetentionPartialYearEnd")</label>
            <div class="col-lg-4 col-md-5">
                <select id="lstYear" class="form-control">
                    <option value="1">@Languages.Translation("optRetentionPartialJan")</option>
                    <option value="2">@Languages.Translation("optRetentionPartialFeb")</option>
                    <option value="3">@Languages.Translation("optRetentionPartialMar")</option>
                    <option value="4">@Languages.Translation("optRetentionPartialApril")</option>
                    <option value="5">@Languages.Translation("optRetentionPartialMay")</option>
                    <option value="6">@Languages.Translation("optRetentionPartialJune")</option>
                    <option value="7">@Languages.Translation("optRetentionPartialJuly")</option>
                    <option value="8">@Languages.Translation("optRetentionPartialAug")</option>
                    <option value="9">@Languages.Translation("optRetentionPartialSept")</option>
                    <option value="10">@Languages.Translation("optRetentionPartialOcto")</option>
                    <option value="11">@Languages.Translation("optRetentionPartialNov")</option>
                    <option value="12">@Languages.Translation("optRetentionPartialDec")</option>
                </select>
            </div>
        </div>


        @*<div class="form-group row">
            <div class="col-sm-1 col-md-1"></div>
            <label class="checkbox-inline" for="chkUseCitation">
                <input type="checkbox" id="chkUseCitation" /> @Languages.Translation("chkRetentionPartialUseCitations")
            </label>*@
        @*<label class="control-label">Use Citations:</label>
            <input type="checkbox" id="chkUseCitation" />*@
        @*</div>*@

        <div class="form-group">
            <div class="col-lg-3 col-md-4"></div>
            <div class="col-lg-4 col-md-5">
                <div class="checkbox-cus">
                    <input type="checkbox" id="chkUseCitation">
                    <label class="checkbox-inline" for="chkUseCitation">@Languages.Translation("chkRetentionPartialUseCitations")</label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 col-md-4 control-label">@Languages.Translation("lblRetentionPartialRunRetInActivity")</label>
            <div class="col-lg-4 col-md-5">
                <div class="input-group">
                    <input id="txtInterval" type="text" size="4" maxlength="4" class="form-control" />
                    <span class="input-group-addon desc-info" id="basic-addon2">@Languages.Translation("lblRetentionPartialMinutes")</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <input type="button" id="btnApply" value="@Languages.Translation("Apply")" class="btn btn-primary" />
            </div>
        </div>
    </div>

    <div class="modal fade" id="mdlRetentionTables" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="overflow:auto;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiRetentionPartialRetAndInActivityTbls")</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <div class="col-sm-12">
                                <select multiple="multiple" size="10" name="duallistbox_Retention" class="eItems" id="SelectRetentionTableName"></select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <button id="btnRetentionProperties" type="button" class="btn btn-primary pull-right">@Languages.Translation("btnRetentionPartialProps")</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnRetentionTablesClose" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Close")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

    <div id="divLoadRetentionProp">
    </div>
</section>
@*<div class="modal fade" id="mdlTblRetentionProperties" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel"><span id="retentionPropName"></span> Retention Properties</h4>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                    <button id="btnSaveRetentionProp" type="button" class="btn btn-primary">Ok</button>
                    <button id="btnCancelRetention" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Cancel</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>*@

<script src="@Url.Content("~/Scripts/AppJs/Retentionlistbox.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/AdminRetention.js")"></script>
