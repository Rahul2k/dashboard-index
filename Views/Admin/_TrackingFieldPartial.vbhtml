@Imports TabFusionRMS.Models
@ModelType TabFusionRMS.Models.SLTrackingSelectData
@Using Html.BeginForm("SetTracking", "Admin", FormMethod.Post, New With {.id = "frmTrackingFieldDetails", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlTrackingField" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiTrackingFieldPartialAdditionalTrackingField")</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="btn-toolbar">
                                <input type="button" id="btnAddField" value="@Languages.Translation("Add")" class="btn btn-primary" />
                                <input type="button" id="btnEditField" value="@Languages.Translation("Rename")" class="btn btn-primary" />
                                <input type="button" id="btnRemoveField" value="@Languages.Translation("Remove")" class="btn btn-primary" />
                            </div>
                        </div>
                    </div>

                    <fieldset class="admin_fieldset" id="fieldGroup" hidden="hidden">
                        <legend>@Languages.Translation("tiTrackingFieldPartialTrackingFieldEntry")</legend>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label id="description" class="col-sm-3 control-label">@Languages.Translation("Description") :</label>
                                <div class="col-sm-9">
                                    @Html.TextBoxFor(Function(m) m.Id, New With {.class = "form-control", .MaxLength = "50"})
                                </div>
                            </div>
                            @Html.HiddenFor(Function(m) m.SLTrackingSelectDataId, New With {.value = "0"})
                            <div class="form-group">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-9">
                                    <div class="btn-toolbar">
                                        <input type="button" id="btnSaveField" value="@Languages.Translation("Save")" class="btn btn-primary" />
                                        <input type="button" id="btnCancelField" value="@Languages.Translation("Cancel")" class="btn btn-default" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div class="row top_space">
                        <div class="col-sm-12 table-responsive jqgrid-cus">
                            <table id="grdField"></table>
                            <div id="grdField_pager"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    @*<input id="btnOk" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true" value="OK" />*@
                    <input id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true" value="@Languages.Translation("Close")" />
                </div>
            </div>
        </div>
    </div>
End Using

