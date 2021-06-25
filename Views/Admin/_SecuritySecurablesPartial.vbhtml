<style>
    .sticker.stick {right: 63px;}
    .sticker {right: 16px;margin-bottom: 15px;}
</style>
<section class="content form-horizontal">
    <div class="form-group">
        <label class="col-lg-2 col-md-3 control-label" for="lstSecurableTypes">@Languages.Translation("lblSPPartialType"): </label>
        <div class="col-lg-4 col-md-6">
            <select id="lstSecurableTypes" class="form-control"></select>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <fieldset class="admin_fieldset">
                <legend>@Languages.Translation("tiSPPartialSecurables")</legend>
                <div class="col-sm-12">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <select id="lstSecurables" size="15" class="form-control"></select>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="col-lg-6">
            <fieldset class="admin_fieldset">
                <legend>@Languages.Translation("tiSPPartialPermission")</legend>
                <div class="col-sm-12">
                    <div id="divPermissions" style="height: 329px; overflow-y: auto; overflow-x: auto;">
                        <div class="checkbox-cus">
                            <input id="chkSelectAll" type="checkbox" />
                            <label class="checkbox-inline" for="chkSelectAll"> @Languages.Translation("cbSelectAll")</label>
                        </div>
                        <ul id="ulPermissions" style="list-style-type:none;"></ul>
                    </div>
                </div>
            </fieldset>
        </div>
        @*</div>*@
    </div>
    <div class="row">
        <div class="col-sm-12">
            <div id="lblPermissionPasteInfo" class="alert alert-info">
                <i class="fa fa-info-circle"></i>
                <span style="line-height:2;">@Languages.Translation("tiSPPartialCopyPermissionInfo")</span>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="sticker stick">
            <button id="btnSaveSecurables" type="button" class="btn btn-primary pull-right">@Languages.Translation("Apply")</button>
            <button id="btnCopyPermissions" type="button" class="btn btn-primary pull-right m-r-10">@Languages.Translation("lblSPPartialCopy")</button>
        </div>
    </div>
</section>