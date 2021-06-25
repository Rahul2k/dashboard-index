@Imports TabFusionRMS.Models
@ModelType TabFusionRMS.Models.System

<section class="content">
    @Using Html.BeginForm("SetEmailDetails", "Admin", FormMethod.Post, New With {.id = "frmEmailDetails", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnUrl")})
        @<div id="parent">

            <div class="row">
                <div class="col-lg-4 col-md-3">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="checkbox-cus">
                                @*@Html.CheckBoxFor(Function(m) m.EMailDeliveryEnabled)*@
                                <input id="EMailDeliveryEnabled" name="EMailDeliveryEnabled" value="false" type="checkbox"/>
                                <label id="delivery_label" class="checkbox-inline" for="EMailDeliveryEnabled">@Languages.Translation("lblEmailNotificationPartialDeliveryEmail")</label>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="checkbox-cus">
                                @*@Html.CheckBoxFor(Function(m) m.EMailWaitListEnabled)*@
                                <input id="EMailWaitListEnabled" name="EMailWaitListEnabled" value="false" type="checkbox"/>
                                <label id="waitlist_label" class="checkbox-inline" for="EMailWaitListEnabled">@Languages.Translation("lblEmailNotificationPartialWaitListEmail")</label>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="checkbox-cus">
                                @*@Html.CheckBoxFor(Function(m) m.EMailExceptionEnabled)*@
                                <input id="EMailExceptionEnabled" name="EMailExceptionEnabled" value="false" type="checkbox" />
                                <label id="exception_label" class="checkbox-inline" for="EMailExceptionEnabled">@Languages.Translation("lblEmailNotificationPartialExceptionEmail")</label>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="checkbox-cus">
                                <input id="EMailBackgroundEnabled" name="EMailBackgroundEnabled" value="false" type="checkbox" />
                                <label id="exception_label" class="checkbox-inline" for="EMailBackgroundEnabled">@Languages.Translation("lblEmailNotificationPartialEMailBackgroundEnabled")</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-9 col-lg-8">
                    <div class="form-group">
                        <label id="server_label" class="col-lg-3 col-md-4 control-label">@Languages.Translation("lblEmailNotificationPartialOutgoingServer") :</label>
                        <div class="col-md-8 col-lg-7">
                            @Html.TextBoxFor(Function(m) m.SMTPServer, New With {.class = "form-control"})
                        </div>
                    </div>

                    <div class="form-group">
                        <label id="port_label" class="col-lg-3 col-md-4 control-label">@Languages.Translation("lblEmailNotificationPartialOutgoingPort") :</label>
                        <div class="col-md-8 col-lg-7">
                            @Html.TextBoxFor(Function(m) m.SMTPPort, New With {.class = "form-control", .MaxLength = "5"})
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="clearfix visible-lg-block visible-md-block col-lg-3 col-md-4 control-label"></label>
                        <div class="col-md-6 col-lg-5 col-sm-7">
                            <div class="checkbox-cus">
                                @*@Html.CheckBoxFor(Function(m) m.SMTPAuthentication)*@
                                <input id="SMTPAuthentication" name="SMTPAuthentication" value="false" type="checkbox"/>
                                <label id="port_label" class="checkbox-inline" for="SMTPAuthentication">@Languages.Translation("lblEmailNotificationPartialReqauthMessage")</label>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-5">
                            <input type="button" id="setting_btn" disabled="disabled" value="@Languages.Translation("lblEmailNotificationPartialSettings")" class="btn btn-primary pull-right" />
                        </div>
                    </div>
                </div>
            </div>
            <fieldset Class="admin_fieldset">
                <legend>@Languages.Translation("lblEmailNotificationPartialActionToTake")</legend>

                <div Class="col-md-6">
                    <fieldset Class="admin_fieldset">
                        <legend>@Languages.Translation("lblEmailNotificationPartialPrompt4Address")</legend>

                        <div Class="col-sm-12">
                            <div Class="checkbox-cus">
                                <input type="checkbox" id="pLevel1_check" />
                                <Label id="pLevel1_label" For="pLevel1_check" Class="checkbox-inline">@Languages.Translation("lblEmailNotificationPartialContainerL1")</Label>
                            </div>
                        </div>
                        <div Class="col-sm-12">
                            <div Class="checkbox-cus">
                                <input type="checkbox" id="pLevel2_check" />
                                <Label id="pLevel2_label" For="pLevel2_check" Class="checkbox-inline">@Languages.Translation("lblEmailNotificationPartialContainerL2up")</Label>
                            </div>
                        </div>

                    </fieldset>
                    <fieldset Class="admin_fieldset">
                        <legend>@Languages.Translation("lblEmailNotificationPartialWarningMsg")</legend>

                        <div Class="col-sm-12">
                            <div Class="checkbox-cus">
                                <input type="checkbox" id="wLevel1_check" />
                                <Label id="wLevel1_label" Class="checkbox-inline" For="wLevel1_check">@Languages.Translation("lblEmailNotificationPartialContainerL1")</Label>
                            </div>
                        </div>
                        <div Class="col-sm-12">
                            <div Class="checkbox-cus">
                                <input type="checkbox" id="wLevel2_check" />
                                <Label id="wLevel2_label" Class="checkbox-inline" For="wLevel2_check">
                                    @Languages.Translation("lblEmailNotificationPartialContainerL2up")
                                </Label>
                            </div>
                        </div>

                    </fieldset>
                </div>
                <div Class="col-md-6">
                    <div Class="well well-lg well-note">
                        <Label id="1nnnn">
                            @Languages.Translation("msgJsEmailNotificationAllContLblNoAction")
                        </Label>
                        @Html.HiddenFor(Function(m) m.EMailConfirmationType)
                    </div>
                </div>

            </fieldset>
            <div Class="form-group">
                <div Class="col-sm-12">
                    <input id="btnApplyEmail" type="button" Class="btn btn-primary pull-right" value="@Languages.Translation("Apply")" />
                </div>
            </div>
        </div>

            @<div id="AddEmailSetting">
            </div>
    End Using
</section>
<script src="@Url.Content("~/Scripts/AppJs/EmailNotification.js")"></script>
