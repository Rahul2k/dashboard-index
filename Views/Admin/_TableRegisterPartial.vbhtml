@Imports TabFusionRMS.Models
@*@<h2>Table Registration</h2>*@
<section class="content">
    @Using Html.BeginForm("RegisterTable", "Admin", FormMethod.Post, New With {.id = "frmTableRegister", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnURL")})
        @<div id="parent">
            <fieldset class="admin_fieldset">
                <legend>@Languages.Translation("tiTableRegisterPartialRegATable")</legend>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label id="labelDatabse" class="col-lg-3 col-md-4 control-label">@Languages.Translation("lblTableRegisterPartialAvailableDbs") :</label>
                        <div class="col-lg-4 col-md-6 controls">
                            <select name="DatabaseDDL" id="DatabaseDDL" class="form-control"></select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label id="labelTable" class="col-lg-3 col-md-4 control-label">@Languages.Translation("lblTableRegisterPartialAvailableTables") :</label>
                        <div class="col-lg-4 col-md-6 controls">
                            <select name="TableDDL" id="TableDDL" class="form-control"></select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4"></div>
                        <div class="col-lg-4 col-md-6">
                            <div hidden="hidden" id="LongTableNameLable" class="alert alert-info"><i class="fa fa-info-circle">&nbsp;</i>@Languages.Translation("lblTableRegisterPartialTabNamMoreThen20CharWereExcluded")</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label id="labelField" class="col-lg-3 col-md-4 control-label">@Languages.Translation("lblTableRegisterPartialPrimaryField") :</label>
                        <div class="col-lg-4 col-md-6 controls">
                            <select name="FieldDDL" id="FieldDDL" class="form-control"></select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-lg-3 col-md-4"></div>
                        <div class="col-md-6">
                            <input type="button" id="btnRegister" value="@Languages.Translation("btnTableRegisterPartialRegister")" class="btn btn-primary" />
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset class="admin_fieldset">
                <legend>@Languages.Translation("tiTableRegisterPartialUnRegATable")</legend>
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 bottom_space">
                            <select size="12" name="RegisterList" class="form-control" id="SelectTable"></select>
                        </div>
                        <div class="col-md-8">
                            <div class="well well-lg">
                                <label>@Languages.Translation("lblTableRegisterPartialPERMANENTLYDeleteTheTable")</label><br />
                                <input type="button" value="@Languages.Translation("btnTableRegisterPartialDrop")" id="btnDrop" class="btn btn-primary" disabled="disabled" />
                            </div>
                            <div class="well well-lg">
                                <label>@Languages.Translation("lblTableRegisterPartialUnRegWillLeaveTblNData")</label><br />
                                <input type="button" value="@Languages.Translation("btnTableRegisterPartialUnRegister")" id="btnUnregister" class="btn btn-primary" disabled="disabled" />
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>

    End Using
</section>
<script src="~/scripts/appjs/TableRegister.js"></script>