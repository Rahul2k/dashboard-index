@ModelType TabFusionRMS.Models.SLRetentionCode


@Using Html.BeginForm("SetRetentionCode", "Retention", FormMethod.Post, New With {.id = "frmRetentionCodeDetails", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlRetentionCode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("RetentionCodeMaintenance")</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <div class="form-group">
                                @Html.HiddenFor(Function(m) m.SLRetentionCodesId, New With {.value = 0})
                                <label class="col-sm-4 control-label" for="RetentionCodesName">@Languages.Translation("lblAddRetentionCodeRetCode")</label>
                                <div class="col-sm-8">
                                    <input type="text" id="txtRetentionCode" name="Id" class="form-control" maxlength="20" placeholder="@Languages.Translation("lblAddRetentionCodeRetCode")" />
                                    <input type="hidden" id="hdnRetentionCode" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="Description">@Languages.Translation("lblAddRetentionCodeDescription")</label>
                                <div class="col-sm-8">
                                    <input type="text" id="txtDescription" name="Description" class="form-control" maxlength="100" placeholder="@Languages.Translation("lblAddRetentionCodeDescription")" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="DeptOfRecord">@Languages.Translation("lblAddRetentionCodeDeptOfRec")</label>
                                <div class="col-sm-8">
                                    <input type="text" id="txtDepOfRecord" name="DeptOfRecord" class="form-control" maxlength="100" placeholder="@Languages.Translation("lblAddRetentionCodeDeptOfRec")" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="Notes">@Languages.Translation("lblAddRetentionCodeNotes")</label>
                                <div class="col-sm-8">
                                    <textarea id="txtNotes" name="Notes" cols="20" rows="4" style="resize:none;" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-6">
                            <fieldset class="admin_fieldset">
                                <legend>@Languages.Translation("chkRetentionPropertiesPartialInActivity")</legend>
                                <div class="form-group">
                                    <label class="col-sm-5 col-md-5 control-label" for="EventType">@Languages.Translation("lblAddRetentionCodeEventType")</label>
                                    <div class="col-sm-7 col-md-7">
                                        <select id="lstEventTypeList" name="InactivityEventType" class="form-control">
                                            <option value="">@Languages.Translation("optAddRetentionCodeSelectType")</option>
                                            <option value="Date Opened">@Languages.Translation("optAddRetentionCodeOpened")</option>
                                            <option value="Date Created">@Languages.Translation("optAddRetentionCodeCreated")</option>
                                            <option value="Date Closed">@Languages.Translation("optAddRetentionCodeClosed")</option>
                                            <option value="Date Other">@Languages.Translation("optAddRetentionCodeOther")</option>
                                            <option value="Date Last Tracked">@Languages.Translation("optAddRetentionCodelastTracked")</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-5 col-md-5 control-label" for="InactivityPeriod">@Languages.Translation("lblAddRetentionCodeInActivityPeriod")</label>
                                    <div class="col-sm-7 col-md-7">
                                        <div class="input-group">
                                            <input type="text" id="txtInactivityPeriod" name="InactivityPeriod" class="form-control" maxlength="4" />
                                            <label class="input-group-addon desc-info">
                                                @Languages.Translation("lblAddCitationCodeInYears")
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-12 text-right">
                                        <div class="checkbox-cus">
                                            <input type="checkbox" id="chkForceToEndOfTear" name="chkForceToEndOfTear">
                                            <label class="checkbox-inline" for="chkForceToEndOfTear">@Languages.Translation("chkAddRetentionCodeForce2EndOfYear")</label>
                                        </div>
                                        <span id="lblInactivityYearStarts" class="span-info"></span>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class="col-sm-6 col-md-6">
                            <fieldset class="admin_fieldset">
                                <legend class="retention_leg" style="max-width: 230px;" title="@Languages.Translation("tiAddRetentionCodeRetPeriodOfficialRec")">@Languages.Translation("tiAddRetentionCodeRetPeriodOfficialRec")</legend>
                                <div class="form-group">
                                    <label class="col-sm-5 col-md-5 control-label" for="EventType">@Languages.Translation("lblAddRetentionCodeEventType")</label>
                                    <div class="col-sm-7 col-md-7">
                                        <select id="lstEventTypeListOfficialRcd" name="RetentionEventType" class="form-control">
                                            <option value="">@Languages.Translation("optAddRetentionCodeSelectType")</option>
                                            <option value="Date Opened">@Languages.Translation("optAddRetentionCodeOpened")</option>
                                            <option value="Date Created">@Languages.Translation("optAddRetentionCodeCreated")</option>
                                            <option value="Date Closed">@Languages.Translation("optAddRetentionCodeClosed")</option>
                                            <option value="Date Other">@Languages.Translation("optAddRetentionCodeOther")</option>
                                            <option value="Date Last Tracked">@Languages.Translation("optAddRetentionCodelastTracked")</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-5 col-md-5 control-label" for="RetentionLegalPeriod">@Languages.Translation("lblAddRetentionCodeLegal")</label>
                                    <div class="col-sm-7 col-md-7">
                                        <div class="input-group">
                                            <input type="text" id="txtLegalPeriod" name="RetentionPeriodLegal" class="form-control" maxlength="4" /><label class="input-group-addon desc-info">@Languages.Translation("lblAddCitationCodeInYears")</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-5 col-md-5 control-label" for="RetentionPeriodUser">@Languages.Translation("User")</label>
                                    <div class="col-sm-7 col-md-7">
                                        <div class="input-group">
                                            <input type="text" id="txtRetentionPeriodUser" name="RetentionPeriodUser" class="form-control" maxlength="4" /><label class="input-group-addon desc-info">@Languages.Translation("lblAddCitationCodeInYears")</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-5 col-md-5 control-label" for="RetentionPeriodTotal">@Languages.Translation("lblAddRetentionCodeTotal")</label>
                                    <div class="col-sm-7 col-md-7">
                                        <div class="input-group">
                                            <input type="text" id="txtRetentionPeriodTotal" name="RetentionPeriodTotal" class="form-control" maxlength="4" readonly="readonly" />
                                            <label class="input-group-addon desc-info">@Languages.Translation("lblAddCitationCodeInYears")</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-12 text-right checkbox-cus">
                                        <input type="checkbox" id="chkLegalHold" name="RetentionLegalHold">
                                        <label class="checkbox-inline" for="chkLegalHold">@Languages.Translation("chkAddRetentionCodeLegalHold")</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-12 text-right">
                                        <div class="checkbox-cus">
                                            <input type="checkbox" id="chkForceToEndOfYearRetPeriodOffitial" name="RetentionPeriodForceToEndOfYear">
                                            <label class="checkbox-inline" for="chkForceToEndOfYearRetPeriodOffitial">@Languages.Translation("chkAddRetentionCodeForce2EndOfYear")</label>
                                        </div>
                                        <span id="lblRetentionYearStarts" class="span-info"></span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div></div>
                                </div>
                            </fieldset>
                        </div>
                        <div class="col-sm-offset-4 col-sm-4">
                            <button id="btnReferencedCitations" type="button" class="btn btn-primary btn-block">@Languages.Translation("btnAddRetentionCodeRefCitations")</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="modal-action">
                        <button id="btnSaveAsRetentionCode" type="button" class="btn btn-primary SaveAsRetentionCode" disabled="disabled">@Languages.Translation("btnAddRetentionCodeSaveAs")</button>
                        <!--<button id="btnSaveAndClearRetentionCode" type="button" class="btn btn-primary">@Languages.Translation("Save") & @Languages.Translation("Clear")</button>-->
                        <button id="btnSaveRetentionCode" type="button" class="btn btn-primary">@Languages.Translation("Save")</button>
                        <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                    </div>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <div id="mdlRetentionCodeClone" class="fixed-footer affixed"></div>
        <!-- /.modal-dialog -->
    </div>

    @<div class="modal fade" id="mdlReferencedCitations" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel"><span id="codeAssignmentVal"><label id="lblRetentionCode"></label></span></h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <label>@Languages.Translation("tiAddRetentionCodeCurrAssignedCita")</label>
                        </div>
                        <div class="col-sm-12 col-md-12">
                            <select id="lstCitationCodes" size="10" class="form-control ListStyle"></select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnAdd" type="button" class="btn btn-primary">@Languages.Translation("Add")</button>
                    <button id="btnDetails" type="button" class="btn btn-primary">@Languages.Translation("btnAddRetentionCodeDetails")</button>
                    <button id="btnRemove" type="button" class="btn btn-primary">@Languages.Translation("Remove")</button>
                    <button id="btnClose" type="button" class="btn btn-default">@Languages.Translation("Close")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
End Using

<div id="AddDetailsCitationDialog"></div>
<div id="DetailsCitationDialog"></div>