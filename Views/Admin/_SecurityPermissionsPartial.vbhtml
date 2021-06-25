<style>
    .sticker.stick {
        right: 63px;
    }

    .sticker {
        right: 16px;
        margin-bottom: 15px;
    }
</style>
<section class="content form-horizontal">
    <div class="form-group">
        <label class="col-md-2 control-label" for="lstSecurableTypesForPermissions">@Languages.Translation("lblSPPartialType") : </label>
        <div class="col-md-4">
            <select id="lstSecurableTypesForPermissions" class="form-control"></select>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <fieldset class="admin_fieldset">
                <legend>@Languages.Translation("tiSGPartialGroups")</legend>
                <div class="col-sm-12">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <select id="lstGroups" size="10" class="form-control"></select>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="col-md-6">
            <fieldset class="admin_fieldset">
                <legend>@Languages.Translation("tiSPPartialSecurables")</legend>
                <div class="col-sm-12">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <select id="lstSecurablesForPermissions" size="10" class="form-control"></select>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
    <fieldset class="admin_fieldset">
        <legend>@Languages.Translation("tiSPPartialPermission")</legend>
        <div class="col-sm-12">
            <div id="divForPermissions" style="height: 200px; overflow-y: auto; overflow-x: auto;">
                <div class="checkbox-cus">
                    <input id="chkSelectAllForPermissions" type="checkbox" />
                    <label class="checkbox-inline" for="chkSelectAllForPermissions">@Languages.Translation("cbSelectAll")</label>
                </div>
                <ul id="ulForPermissions" style="list-style-type:none;"></ul>
            </div>
        </div>
    </fieldset>
    <div class="row">
        <div class="col-sm-12">
            <div id="lblPermissionPasteInfo_2" class="alert alert-info">
                <i class="fa fa-info-circle"></i>
                <span style="line-height:2;">@Languages.Translation("tiSPPartialCopyPermissionInfo")</span>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="sticker stick">
            <button id="btnSavePermission" type="button" class="btn btn-primary pull-right">@Languages.Translation("Apply")</button>
            <button id="btnCopy" type="button" class="btn btn-primary pull-right m-r-10">@Languages.Translation("lblSPPartialCopy")</button>
        </div>
    </div>
</section>