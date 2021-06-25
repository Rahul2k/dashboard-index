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
    @Using Html.BeginForm("SetTracking", "Admin", FormMethod.Post, New With {.id = "frmTrackingDetails", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnUrl")})
        @<div id="parent">
                <div class="row">
                    <div class="col-lg-3 col-md-4">
                        <div class="form-group">
                            <div class="col-sm-12">
                                @*<div class="checkbox-cus">
                                    <input id="ReconciliationOn" name="ReconciliationOn" value="false" type="checkbox" />
                                    <label class="checkbox-inline" for="ReconciliationOn">@Languages.Translation("lblTrackingPartialTracReconOn")</label>
                                </div>*@
                                <div class="checkbox-cus">
                                    @*@Html.CheckBoxFor(Function(m) m.TrackingOutOn)*@
                                    <input id="TrackingOutOn" name="TrackingOutOn" value="false" type="checkbox" />
                                    <label class="checkbox-inline" for="TrackingOutOn">@Languages.Translation("lblTrackingPartialTracUseOut")</label>
                                    <div class="col-lg-12 checkbox-cus">
                                        @*@Html.CheckBoxFor(Function(m) m.DateDueOn)*@
                                        <input id="DateDueOn" name="DateDueOn" value="false" type="checkbox" disabled="disabled"/>
                                        <label class="checkbox-inline" for="DateDueOn">@Languages.Translation("lblTrackingPartialTracDueDate")</label>
                                    </div>
                                  </div>
                           
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9 col-md-8">
                        @*<div class="form-group">
                            <div class="col-md-6 col-lg-4"></div>
                            <div class="col-md-6 col-lg-4">
                                <input type="button" id="btnclear" class="btn btn-primary" value="@Languages.Translation("lblTrackingPartialClearReconciliation")" disabled="disabled" />
                            </div>
                        </div>*@
                        <div id="duebackdays_group" class="form-group">
                            <label class="col-md-6 col-lg-4 control-label" id="dueBack_label">@Languages.Translation("lblTrackingPartialDeftDueBacDays")</label>
                            <div class="col-lg-4 col-md-6">
                                @Html.TextBoxFor(Function(m) m.DefaultDueBackDays, New With {.class = "form-control", .MaxLength = "4"})
                            </div>
                        </div>
                    </div>
                </div>
                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("tiTrackingPartialHistory")</legend>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-lg-3 col-md-4 control-label" id="dueBack_label">@Languages.Translation("lblTrackingPartialMaxDays")</label>
                            <div class="col-md-4 controls">
                                @Html.TextBoxFor(Function(m) m.MaxHistoryDays, New With {.class = "form-control", .MaxLength = "5"})
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 col-md-4 control-label" id="dueBack_label">@Languages.Translation("lblTrackingPartialMaxItems")</label>
                            <div class="col-md-4 controls">
                                @Html.TextBoxFor(Function(m) m.MaxHistoryItems, New With {.class = "form-control", .MaxLength = "5"})
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-lg-3 col-md-4"></div>
                            <div class="col-md-8">
                                <input type="button" id="btntruncate" class="btn btn-primary" value="@Languages.Translation("lblTrackingPartialTruncHistNow")" />
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("tiTrackingPartialAddTracData")</legend>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-lg-3 col-md-4 control-label" id="field_label">@Languages.Translation("lblTrackingPartialFildDesc")</label>
                            <div class="col-md-4 controls">
                                @Html.TextBoxFor(Function(m) m.TrackingAdditionalField1Desc, New With {.class = "form-control", .MaxLength = "25"})
                            </div>
                            <div class="col-md-4">
                                <input type="button" id="btnedit" disabled="disabled" value="@Languages.Translation("btnTrackingPartialEditList")" class="btn btn-primary" />
                            </div>
                        </div>
                        <div class="form-group" id="fieldgroup">
                            <label id="field_label" class="col-lg-3 col-md-4 control-label" disabled="disabled">@Languages.Translation("lblTrackingPartialFildTyp")</label>
                            <div class="col-lg-9 col-md-8 controls">
                                <span class="radio-cus">
                                    <input type="radio" name="fieldtype" value="0" id="selection_radio" disabled="disabled">
                                    <label class="radio-inline" for="selection_radio" value="selection_label">@Languages.Translation("lblTrackingPartialSelList")</label>
                                </span>
                                <span class="radio-cus">
                                    <input type="radio" name="fieldtype" value="1" id="suggestion_radio" disabled="disabled">
                                    <label class="radio-inline" for="suggestion_radio" value="suggestion_label">@Languages.Translation("lblTrackingPartialSuggList")</label>
                                </span>
                                <span class="radio-cus">
                                    <input type="radio" name="fieldtype" value="2" id="text_radio" disabled="disabled">
                                    <label class="radio-inline" for="text_radio" value="text_label">@Languages.Translation("lblTrackingPartialTxtField")</label>
                                </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 col-md-4 control-label" id="memo_label">@Languages.Translation("lblTrackingPartialMemoFildDesc")</label>
                            <div class="col-lg-4 col-md-4 controls">
                                @Html.TextBoxFor(Function(m) m.TrackingAdditionalField2Desc, New With {.class = "form-control", .MaxLength = "25"})
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("tiTrackingPartialSigCap")</legend>
                    <div class="col-sm-12">
                        <div class="form-group">
                            @Html.HiddenFor(Function(m) m.SignatureCaptureOn)
                            <div class="col-md-4 col-lg-3">
                                <div class="checkbox-cus">
                                    <input type="checkbox" id="manual_check">
                                    <label class="checkbox-inline" id="manual_label" for="manual_check">@Languages.Translation("lblTrackingPartialManTransfer")</label>
                                </div>
                            </div>
                            <div class="col-md-5 col-lg-4">
                                <div class="checkbox-cus">
                                    <input type="checkbox" id="tracking_check">
                                    <label class="checkbox-inline" id="manual_label" for="tracking_check">@Languages.Translation("lblTrackingPartialTracking")</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div class="form-group">
                    <div class="sticker stick">
                        <input type="button" id="btnApplyTracking" class="btn btn-primary pull-right" value="@Languages.Translation("Apply")" />
                    </div>
                </div>     
        </div>
    End Using
    <div id="AddTrackingField">
    </div>
</section>
<script src="@Url.Content("~/Scripts/AppJs/Tracking.js")"></script>