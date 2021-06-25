@Imports TabFusionRMS.Models
@ModelType TabFusionRMS.Models.Table
<style>
    .sticker.stick {right: 48px;}
    .sticker {right: 0px;margin-bottom: 15px;}
</style>
<section class="content form-horizontal">
    @Using Html.BeginForm("TrackingForm", "Admin", FormMethod.Post, New With {.id = "frmTableTracking", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnURL")})
        @<div id="parent">
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        @Html.HiddenFor(Function(m) m.TableName)
                        <label class="col-md-4 control-label" for="TrackingTable">@Languages.Translation("lblTableTrackingPartialContainerLvl")</label>
                        <div class="col-lg-8 col-md-7 controls">
                            <select id="TrackingTable" name="TrackingTable" class="form-control"></select>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="TrackingStatusFieldName">@Languages.Translation("lblTableTrackingPartialTrackingStatusField")</label>
                        <div class="col-lg-8 col-md-7 controls">
                            @Html.TextBoxFor(Function(m) m.TrackingStatusFieldName, New With {.disabled = "disabled", .class = "form-control", .maxlength = "50"})
                        </div>
                    </div>
                </div>
            </div>

            <fieldset class="admin_fieldset" id="OutSetupDiv">
                <legend>@Languages.Translation("tiTableTrackingPartialOutSetup") <label id="DisabledOutId" style="display:none"> @Languages.Translation("tiTableTrackingOutSetupLableForDisabled")</label></legend>
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="OutTable">@Languages.Translation("lblTableTrackingPartialOutType")</label>
                                <div class="col-lg-8 col-md-7 controls">
                                    <select id="OutTable" name="OutTable" class="form-control">
                                        <option value="0">@Languages.Translation("optTableTrackingPartialUseOutField")</option>
                                        <option value="1">@Languages.Translation("optTableTrackingPartialAlwaysOut")</option>
                                        <option value="2">@Languages.Translation("optTableTrackingPartialAlwaysIn")</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="TrackingDueBackDaysFieldName">@Languages.Translation("lblTableTrackingPartialDueBackDaysField")</label>
                                <div class="col-lg-8 col-md-7 controls">
                                    <select id="TrackingDueBackDaysFieldName" name="TrackingDueBackDaysFieldName" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-2 col-md-4 control-label" for="TrackingOUTFieldName">@Languages.Translation("lblTableTrackingPartialOutField")</label>
                        <div class="col-lg-4 col-md-7 controls">
                            <select id="TrackingOUTFieldName" name="TrackingOUTFieldName" class="form-control" disabled="disabled"></select>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="TrackingACTIVEFieldName">@Languages.Translation("lblTableTrackingPartialActiveField")</label>
                        <div class="col-lg-8 col-md-7 controls">
                            <select id="TrackingACTIVEFieldName" name="TrackingACTIVEFieldName" class="form-control"></select>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="TrackingEmailFieldName">@Languages.Translation("lblTableTrackingPartialEmailAdd")</label>
                        <div class="col-lg-8 col-md-7 controls">
                            <select id="TrackingEmailFieldName" name="TrackingEmailFieldName" class="form-control"></select>
                        </div>
                    </div>
                </div>
            </div>
            <fieldset class="admin_fieldset">
                <legend>@Languages.Translation("tiTableTrackingPartialContainers")</legend>
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="TrackingRequestableFieldName">@Languages.Translation("lblTableTrackingPartialReqField")</label>
                                <div class="col-lg-8 col-md-7 controls">
                                    <select id="TrackingRequestableFieldName" name="TrackingRequestableFieldName" class="form-control" disabled="disabled"></select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="TrackingPhoneFieldName">@Languages.Translation("lblTableTrackingPartialPhnField")</label>
                                <div class="col-lg-8 col-md-7 controls">
                                    <select id="TrackingPhoneFieldName" name="TrackingPhoneFieldName" class="form-control" disabled="disabled"></select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="InactiveLocationField">@Languages.Translation("lblTableTrackingPartialInActiveStrgField")</label>
                                <div class="col-lg-8 col-md-7 controls">
                                    <select id="InactiveLocationField" name="InactiveLocationField" class="form-control" disabled="disabled"></select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="TrackingMailStopFieldName">@Languages.Translation("lblTableTrackingPartialMailStop")</label>
                                <div class="col-lg-8 col-md-7 controls">
                                    <select id="TrackingMailStopFieldName" name="TrackingMailStopFieldName" class="form-control" disabled="disabled"></select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="ArchiveLocationField">@Languages.Translation("lblTableTrackingPartialArchiveStrgField")</label>
                                <div class="col-lg-8 col-md-7 controls">
                                    <select id="ArchiveLocationField" name="ArchiveLocationField" class="form-control" disabled="disabled"></select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">

                                <label class="col-md-4 control-label" for="SignatureRequiredFieldName">@Languages.Translation("lblTableTrackingPartialSignReq")</label>
                                <div class="col-lg-8 col-md-7 controls">
                                    <select id="SignatureRequiredFieldName" name="SignatureRequiredFieldName" class="form-control" disabled="disabled"></select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="col-md-4  control-label" for="OperatorsIdField">@Languages.Translation("lblTableTrackingPartialUserIdField")</label>
                                <div class="col-lg-8 col-md-7 controls">
                                    <select id="OperatorsIdField" name="OperatorsIdField" class="form-control" disabled="disabled"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="form-group">

                <div class="col-lg-2 col-md-3">
                    <div class="checkbox-cus">
                        @*@Html.CheckBoxFor(Function(m) m.Trackable)*@
                        <input id="Trackable" name="Trackable" value="false" type="checkbox" />
                        <label class="checkbox-inline" for="Trackable">@Languages.Translation("lblTableTrackingPartialTrackingObj")</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="checkbox-cus">
                        @*@Html.CheckBoxFor(Function(m) m.AllowBatchRequesting, New With {.disable = "disabled"})*@
                        <input id="AllowBatchRequesting" name="AllowBatchRequesting" value="false" type="checkbox" disabled="disabled" />
                        <label class="checkbox-inline" for="AllowBatchRequesting">@Languages.Translation("lblTableTrackingPartialAllowReqs")</label>
                    </div>
                </div>
            </div>

            <fieldset class="admin_fieldset top_space">
                <legend>@Languages.Translation("tiTableTrackingPartialIniTrackingDest")</legend>
                <div class="col-sm-12">
                    <div class="row" id="InitialListDiv">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <div class="clearfix visible-md-block col-md-4"></div>
                                <div class="col-lg-6 col-md-8">
                                    <div class="checkbox-cus">
                                        <input type="checkbox" id="AutoAssignOnAdd" disabled="disabled">
                                        <label class="checkbox-inline" for="AutoAssignOnAdd">@Languages.Translation("lblTableTrackingPartialAutoAssignOnAdd")</label>
                                    </div>
                                </div>
                                <div class="clearfix visible-md-block col-md-4"></div>
                                <div class="col-lg-6 col-md-8">
                                    <div class="checkbox-cus">
                                        @*@Html.CheckBoxFor(Function(m) m.AutoAddNotification, New With {.disabled = "disabled"})*@
                                        <input id="AutoAddNotification" name="AutoAddNotification" value="false" title="@Languages.Translation("lblTableTrackingPartialSendDeliveryEmailTooltip")" type="checkbox" disabled="disabled" />
                                        <label class="checkbox-inline" for="AutoAddNotification" title="@Languages.Translation("lblTableTrackingPartialSendDeliveryEmailTooltip")">@Languages.Translation("lblTableTrackingPartialSendDeliveryEmail")</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="DefaultTrackingId" id="lblDestination">@Languages.Translation("lblTableTrackingPartialDestId")</label>

                                <div class="col-lg-8 col-md-7 controls">
                                    @*<select id="DefaultTrackingId" name="DefaultTrackingId" class="form-control" style="font-family:monospace" disabled="disabled">*@
                                    <select id="DefaultTrackingId" name="DefaultTrackingId" class="form-control" style="font-family:monospace" disabled="disabled">
                                        @*@Html.HiddenFor(Function(m) m.DefaultTrackingId)*@
                                        @Html.HiddenFor(Function(m) m.DefaultTrackingTable)
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" id="IntialLabelDiv">
                        <div class="clearfix visible-md-block col-md-4"></div>
                        <div class="col-md-8 col-lg-12">
                            <label class="control-label" id="noRecordLabel" for="noRecordLabel" style="color: red"></label>
                        </div>
                    </div>
                </div>
            </fieldset>

            <div class="row">
                <div class="col-sm-12 sticker stick">
                    <input type="button" id="btnApply" value="@Languages.Translation("Apply")" class="btn btn-primary pull-right" />
                </div>
            </div>
        </div>
    End Using
</section>
<script src="@Url.Content("~/Scripts/AppJs/TableTracking.js")"></script>