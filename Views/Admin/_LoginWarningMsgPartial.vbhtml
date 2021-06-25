<div class="form-group">
    <fieldset class="admin_fieldset">
        <form class="form-horizontal" method="post" role="form" novalidate="novalidate">
            
                <div class="col-md-12">
                    <label>@Languages.Translation("lblShowLoginWarningMsg"):</label>
                </div>
           
                <div class="col-sm-3">
                    <span class="radio-cus">
                        <input type="radio" name="ShowMessage" id="YesRadio" value="Yes" />
                        <label id="Yes_label" class="radio-inline" for="YesRadio">@Languages.Translation("Yes")</label>
                    </span>
                    <span class="radio-cus">
                        <input type="radio" name="ShowMessage" id="NoRadio" value="No" />
                        <label id="No_label" class="radio-inline" for="NoRadio">@Languages.Translation("No")</label>
                    </span>
                </div>
            
                <div class="col-md-12">
                    <label>@Languages.Translation("lblLoginWarningMsg"):</label>
                </div>
            
                <div class="col-md-4">
                    <textarea class="form-control" rows="10" name="IntegrationKey" id="txtWarningMessage"></textarea>
                </div>
                <div class="clearfix"></div>
                <div class="col-md-3">
                    <button id="btnApplyWarningMsg" type="button" class="btn btn-primary">@Languages.Translation("Apply")</button>
                </div>
        </form>
    </fieldset>
</div>

<Script src="@Url.Content("~/Scripts/AppJs/LoginWarningMessage.js")"></Script>
