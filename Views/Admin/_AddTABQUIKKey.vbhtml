
<div class="form-group">
    <fieldset class="admin_fieldset">
        <div class="row">
            <div class="col-md-12">
                <label>@Languages.Translation("lblTABQUIKIntegrationKey"):</label>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <input type="text" name="IntegrationKey" id="txtIntegrationKey" class="form-control" maxlength="10"/>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <span>@Languages.Translation("lblTABQUIKSupport"): <a href="mailto:support@tab.com">support@tab.com</a></span>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-2 col-md-3">
                &nbsp;
            </div>
        </div>
        <div class="row">            
            <div class="col-md-3">
                <button id="btnApplyKey" type="button" class="btn btn-primary">@Languages.Translation("Apply")</button>
            </div>
        </div>
    </fieldset>
</div>
<script src="@Url.Content("~/Scripts/AppJs/TABQUIK.js")"></script>
