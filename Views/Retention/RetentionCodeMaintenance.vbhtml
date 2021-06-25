@Code
    ViewData("Title") = Languages.Translation("RetentionCodeMaintenance")
    Layout = "~/Views/Shared/_LayoutRetention.vbhtml"
End Code

<section class="content-header">
    <h1 class="main_title">
        <span id="title">@Languages.Translation("RetentionCodeMaintenance")</span>
    </h1>
    @*<ol class="breadcrumb">
        <li><a href="~/data.aspx"><i class="fa fa-home fa-2x theme_color"></i> @Languages.Translation("mnuAdminHome")</a></li>
        <li class="active"><span id="navigation">@Languages.Translation("msgJsCitationRetCodes")</span></li>
    </ol>*@
</section>

<section class="content">
    <div class="form-group row">
        <div class="col-sm-12 col-md-12">
            <div class="pull-right">
                <input type="button" id="gridAdd" name="gridAdd" value="@Languages.Translation("Add")" class="btn btn-primary" />
                <input type="button" id="gridEdit" name="gridEdit" value="@Languages.Translation("Edit")" class="btn btn-primary" />
                <input type="button" id="gridRemove" name="gridRemove" value="@Languages.Translation("Remove")" class="btn btn-primary" />
                <input type="button" id="btnReassignRetCode" name="btnReassignRetCode" value="@Languages.Translation("btnRetentionCodeMaintenanceReassignRetCode")" class="btn btn-primary" />
            </div>
        </div>
    </div>
    <div class="row">
        @*<div class="col-sm-12 col-md-12">
                <label>@Languages.Translation("msgJsCitationRetCodes")</label>
            </div>*@
        <div class="col-sm-12 col-md-12">
            <div class="table-responsive jqgrid-cus">
                <div id="divRetentionCodeGrid">
                    <table id="grdRetentionCode"></table>
                    <div id="grdRetentionCode_pager">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="AddEditRetentionCodeDialog"></div>
    <div id="ReassignRetentionCodeDialog"></div>
</section>
<script src="@Url.Content("~/Scripts/AppJs/Retention.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/ReassignRetentionCode.js")"></script>