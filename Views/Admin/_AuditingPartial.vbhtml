@*<section class="content-header">
        <h1>
            Auditing
        </h1>
        <ol class="breadcrumb">
            <li><a href="@Url.Action("Index", "Admin")"><i class="fa fa-dashboard"></i>Home</a></li>
            <li class="active">Auditing</li>
        </ol>
    </section>
    <hr />*@
<section class="content">
    <div id="parent">
        <div class="form-group row">
            <div class="col-sm-12">
                <input type="hidden" id="hdnIsPopView" value="0" />
                <input type="button" id="btnSetupAuditTables" name="btnSetupAuditTables" value="@Languages.Translation("btnAuditingPartialSetupAuditTables")" class="btn btn-primary" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("lblAuditingPartialUpdateTables")</legend>
                    @*<span id="spnUpdateTable"></span>*@
                    <div style="height:100px;overflow:auto">
                        <ul id="ulUpdateTable"></ul>
                    </div>
                </fieldset>
            </div>
            <div class="col-md-6">
                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("lblAuditingPartialConfidentialTbls")</legend>
                    @*<span id="spnConfTable"></span>*@
                    <div style="height:100px;overflow:auto">
                        <ul id="ulConfTable"></ul>
                    </div>
                </fieldset>
            </div>
        </div>
        <fieldset class="admin_fieldset">
            <legend>@Languages.Translation("lblAuditingPartialPurgeAuditData")</legend>
            @Using Html.BeginForm("PurgeAuditData", "Admin", FormMethod.Post, New With {.id = "frmPurgeData", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
                @<div class="col-sm-12">
                    <div class="form-group">
                        <div class="col-lg-3">
                            @*<div class="col-lg-12 col-md-12 columns">
                                    <label class="checkbox-inline" for="chkPurgeUpdateData">
                                        <input type="checkbox" id="chkPurgeUpdateData" /> Purge Update Data
                                    </label>
                                    <label class="checkbox-inline" for="chkPurgeConfData">
                                        <input type="checkbox" id="chkPurgeConfData" /> Purge Confidential Data
                                    </label>
                                    <label class="checkbox-inline" for="chkPurgeSucsLoginData">
                                        <input type="checkbox" id="chkPurgeSucsLoginData" /> Purge Successful Login Data
                                    </label>
                                    <label class="checkbox-inline" for="chkPurgeFailLoginData">
                                        <input type="checkbox" id="chkPurgeFailLoginData" /> Purge Failed Login Data
                                    </label>
                                </div>*@

                            <div class="checkbox-cus">
                                <input type="checkbox" id="chkPurgeUpdateData">
                                <label class="checkbox-inline" for="chkPurgeUpdateData">@Languages.Translation("lblAuditingPartialPurgeUpdateData")</label>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="checkbox-cus">
                                <input type="checkbox" id="chkPurgeConfData">
                                <label class="checkbox-inline" for="chkPurgeConfData">@Languages.Translation("lblAuditingPartialPurgeConfData")</label>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="checkbox-cus">
                                <input type="checkbox" id="chkPurgeSucsLoginData">
                                <label class="checkbox-inline" for="chkPurgeSucsLoginData">@Languages.Translation("lblAuditingPartialPurgeSuccLog")</label>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="checkbox-cus">
                                <input type="checkbox" id="chkPurgeFailLoginData">
                                <label class="checkbox-inline" for="chkPurgeFailLoginData">@Languages.Translation("lblAuditingPartialPurgeFailedLog")</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-6 col-md-4 col-lg-3">
                            <input type="text" id="PurgeDate" name="PurgeDate" class="form-control datepicker" readonly="readonly" placeholder="@Languages.Translation("plAuditingPartialDateForPurgeData")" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <input type="button" id="btnPurgeData" name="btnPurgeData" value="@Languages.Translation("btnAuditingPartialPurgeSelectedData")" class="btn btn-primary" />
                        </div>
                    </div>
                </div>
            End Using

        </fieldset>
    </div>
</section>

<div class="modal fade" id="mdlAuditTables" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="overflow:auto;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                @*<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>*@
                <h4 class="modal-title" id="myModalLabel">@Languages.Translation("lblAuditPartialAuditTables")</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <div class="col-sm-12">
                        <select multiple="multiple" size="10" name="duallistbox_demo2" class="eItems" id="SelectProduct"></select>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12 text-right">
                        <button id="btnAuditProperties" type="button" class="btn btn-primary">@Languages.Translation("lblAuditPartialProperties")</button>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                @*<button id="btnSaveAuditTables" type="button" class="btn btn-primary">Save</button>*@
                <button id="btnAuditTablesClose" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Close")</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<div class="form-horizontal">
    <div class="modal fade" id="mdlAuditProperties" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    @*<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>*@
                    <h4 class="modal-title" id="myModalLabel"><span id="auditPropName"></span> @Languages.Translation("lblAuditPartialAuditProp")</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="col-sm-4">
                            <div class="checkbox-cus">
                                <input type="hidden" id="hdnActionType" value="N" />
                                <input type="checkbox" id="chkConfData">
                                <label class="checkbox-inline" for="chkConfData">@Languages.Translation("lblAuditingPartialConfidentialData")</label>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="checkbox-cus">
                                <input type="checkbox" id="chkUpdates">
                                <label class="checkbox-inline" for="chkUpdates">@Languages.Translation("lblAuditingPartialUpdates")</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="checkbox-cus">
                                <input type="checkbox" id="chkAttachments">
                                <label class="checkbox-inline" for="chkAttachments">@Languages.Translation("Attachments")</label>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="modal-footer">
                    <button id="btnSaveAuditProp" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    <button id="btnCancelAudit" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</div>

<script src="@Url.Content("~/Scripts/AppJs/Auditduallistbox.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/Auditing.js")"></script>
