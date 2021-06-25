<input type="hidden" value="@Model.Title" id="titleid" />
<input type="hidden" value="@Model.objLocalization.pLocData" id="pDateChosen" />
<input type="hidden" value="@Model.objLocalization.resouceObjectLenguage" id="Reslanguages" />
<input type="hidden" value="@Model.objLocalization.SelectedCountry" id="selectedCountry" />

<link href="~/Content/themes/TAB/css/flags.css" rel="stylesheet" />

<div class="modal-body">
    <div class="form-horizontal">
        <div class="form-group">
            <label class="col-sm-3 control-label" for="userLangSelect">@Languages.Translation("lblLocalizePartialLanguage")</label>
            <div class="col-md-4">
                <div class="btn-group">
                    <div id="userLangSelect" data-input-name="country" style="width: 100% !important"></div>
                    <asp:HiddenField ID="hiddenSelLangValue" Value="" />
                </div>
            </div>
        </div>
        <div class="form-group row top_space">
            <label class="col-sm-3 control-label" for="PrefDateForm">@Languages.Translation("lblLocalizePartialDateFormat")</label>
            <div class="col-md-4">
                <select class="chosen-select" style="width:206px">
                    @For Each m In Model.ListLocalization
                        @<option value="@m.LookupTypeCode">@m.LookupTypeValue</option>
                    Next
                    @*<li class="active-result result-selected" data-option-array-index="3" style="">dd/MMM/yyyy</li>*@
                </select>
                <p Id="RequiredFieldValidator1" style="font-weight:bold;color:red"></p>
            </div>
        </div>
    </div>
</div>

<div Class="modal-footer">
    <Button onclick="toolsmodel.LocalizationSaveClick()" Id="btnSaveLocData" Class="btn btn-success">@Languages.Translation("Save")</Button>
    <Button onclick="toolsmodel.DialogRun(ids.Tools)" Class="btn btn-default" data-dismiss="modal">@Languages.Translation("Cancel")</Button>
</div>

