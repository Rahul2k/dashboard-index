@Imports TabFusionRMS.Models
@ModelType TabFusionRMS.Models.System
<style>
    .sticker.stick {
        right: 47px;
    }

    .sticker {
        right: 16px;
        margin-bottom: 15px;
    }
</style>
<section class="content">
    @Using Html.BeginForm("SetRequestorDetails", "Admin", FormMethod.Post, New With {.id = "frmRequestorDetails", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnUrl")})
        @*@<h2>Requestor</h2>*@
        @<div id="parent">
            <fieldset class="admin_fieldset">
                <legend>@Languages.Translation("tiRequestorPartialTitle")</legend>

                <div class="col-md-4">
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiRequestorPartialPrintingMethod")</legend>
                        <div class="col-lg-4">
                            <span class="radio-cus">
                                <input type="radio" name="print_method" id="report_radio" value="0" />
                                <label id="report_label" class="radio-inline" for="report_radio">@Languages.Translation("Report")</label>
                            </span>
                            <span class="radio-cus">
                                <input type="radio" name="print_method" id="label_radio" checked="checked" value="1" />
                                <label id="label_label" class="radio-inline" for="label_radio">@Languages.Translation("Labels")</label>
                            </span>
                        </div>
                    </fieldset>
                </div>
                <div class="col-md-8">
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiRequestorPartialLabelSetup")</legend>
                        <div id="label_setup">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="control-label col-sm-4" for="copies_number">@Languages.Translation("lblRequestorPartialCopies")</label>
                                        <div class="col-md-8 col-sm-4 controls">
                                            <input type="text" id="copies_number" class="form-control" value="1" maxlength="1" min="1" max="9" />
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix visible-md-block visible-sm-block col-sm-4"></div>
                                <div class="col-sm-8 col-lg-6">
                                    <div class="btn-toolbar">
                                        <input type="button" id="setup_btn" data-toggle="tooltip" class="btn btn-primary" value="@Languages.Translation("btnRequestorPartialSetupLabel")" />
                                        <button type="button" id="btnResetLabel" class="btn btn-primary">@Languages.Translation("lblRequestorPartialResetLabel")</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="col-sm-12">
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiRequestorPartialAutoPrint")</legend>

                        <div class="col-lg-4">
                                <div class="clearfix visible-lg-block">
                                    <div style="margin-top:45px;"></div>
                                </div>
                            @*<fieldset>
                                <legend>Interval</legend>*@

                            @*<div class="col-sm-12 col-md-12 form-group">
                                      <label class="control-label" for="interval_time">@Languages.Translation("lblRequestorPartialInterval")</label>
                                      <input type="text" class="form-control col-md-2 col-sm-2" id="interval_time" value="30" min="0000" max="9999" maxlength="4" />
                                      <label id="minute_label" class="control-label">@Languages.Translation("lblRequestorPartialIntervalInMin")</label>

                                </div>*@
                            <div class="form-group">
                               
                                    <label class="col-md-3 col-lg-4 col-sm-4 control-label" for="interval_time">@Languages.Translation("lblRequestorPartialInterval")</label>
                                    <div class="col-sm-4 col-md-5 controls">
                                        <input type="text" class="form-control" id="interval_time" value="30" min="0000" max="9999" maxlength="4" />
                                    </div>
                                    <label id="minute_label" class="col-sm-3 top_space desc-info" style="white-space:nowrap;">@Languages.Translation("lblRequestorPartialIntervalInMin")</label>
                               
                            </div>
                            @*</fieldset>*@
                        </div>
                        <div class="col-lg-8">
                            <div class="row">
                                @*<legend>ID Creation</legend>*@
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <div class="clearfix visible-lg-block visible-md-block">
                                            <div style="margin-top:30px;"></div>
                                        </div>
                                        <div class="col-sm-12">
                                            <span class="radio-cus">
                                                <input type="radio" name="id_type" id="individual_radio" value="0" />
                                                <label id="individual_label" class="radio-inline" for="individual_radio">@Languages.Translation("lblRequestorPartialIndividual")</label>
                                            </span>
                                        </div>
                                        <div class="col-sm-12">
                                            <span class="radio-cus">
                                                <input type="radio" name="id_type" id="group_radio" checked="checked" value="1" />
                                                <label id="group_label" class="radio-inline" for="group_radio">@Languages.Translation("lblRequestorPartialGroup")</label>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-9">           
                                        <div class="well well-lg well-note">
                                            <label id="idcreation_label">@Languages.Translation("lblRequestorPartialIdCreation")</label>
                                        </div>            
                                </div>
                            </div>
                            @*<br />*@
                        </div>

                    </fieldset>
                </div>
            </fieldset>
            <div class="form-group top_space">
                <div class="col-lg-6">
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiRequestorPartialConfirmation")</legend>
                        <div class="col-lg-4 col-md-3">
                            <span class="radio-cus">
                                <input type="radio" name="confirm_type" id="once_radio" checked="checked" value="0" />
                                <label id="once_label" class="radio-inline" for="once_radio">@Languages.Translation("lblRequestorPartialOnce")</label>
                            </span>
                            <span class="radio-cus">
                                <input type="radio" name="confirm_type" id="always_radio" value="1" />
                                <label id="always_label" class="radio-inline" for="always_radio">@Languages.Translation("Always")</label>
                            </span>
                            <span class="radio-cus">
                                <input type="radio" name="confirm_type" id="never_radio" value="2" />
                                <label id="never_label" class="radio-inline" for="never_radio">@Languages.Translation("lblRequestorPartialNever")</label>
                            </span>
                        </div>
                        <div class="col-lg-8 col-md-9">
                            <div class="well well-lg well-note">
                                <label id="confirm_label">@Languages.Translation("lblRequestorPartialConfLabel")</label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="col-lg-6 top_space">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="checkbox-cus">
                                @*@Html.CheckBoxFor(Function(m) m.AllowWaitList, New With {.checked = "checked"})*@
                                <input id="AllowWaitList" name="AllowWaitList" value="false" type="checkbox" checked="checked" />
                                <label id="allowlist_label" class="checkbox-inline" for="AllowWaitList">@Languages.Translation("lblRequestorPartialAllowWaitList") </label>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="checkbox-cus">
                                @*@Html.CheckBoxFor(Function(m) m.PopupWaitList)*@
                                <input id="PopupWaitList" name="PopupWaitList" value="false" type="checkbox" checked="checked" />
                                <label id="poplistlist_label" class="checkbox-inline" for="PopupWaitList">@Languages.Translation("lblRequestorPartialWaitListAlert")</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="btn-toolbar">
                                <button type="button" id="btnPurgeFulfilled" class="btn btn-primary">@Languages.Translation("lblRequestorPartialPurgeFulFilReq")</button>
                                <button type="button" id="btnPurgeDeleted" class="btn btn-primary">@Languages.Translation("lblRequestorPartialPurgeDelReq")</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="sticker stick"><button id="btnApplyRequestor" type="button" class="btn btn-primary pull-right">@Languages.Translation("Apply")</button></div>
            </div>
        </div>
    End Using
</section>
<script src="@Url.Content("~/Scripts/AppJs/Requestor.js")"></script>