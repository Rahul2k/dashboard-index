@Code
    ViewData("Title") = Languages.Translation("CitationMaintenance")
    Layout = "~/Views/Shared/_LayoutRetention.vbhtml"
End Code

<section class="content-header">
    <h1 class="main_title">
        <span id="title">@Languages.Translation("tiCitationMaintenanceCitaCodeMaintenance")</span>
    </h1>
    @*<ol class="breadcrumb">
        <li><a href="~/data.aspx"><i class="fa fa-home fa-2x theme_color"></i> @Languages.Translation("mnuAdminHome")</a></li>
        <li class="active"><span id="navigation">@Languages.Translation("tiAssignCitationCodeCitationCodes")</span></li>
    </ol>*@
</section>
<section class="content">
    <div class="row">
        <div class="col-sm-12 col-md-12 ">
            <div class="pull-right">
                <input type="button" id="gridAdd" name="gridAdd" value="@Languages.Translation("Add")" class="btn btn-primary" />
                <input type="button" id="gridEdit" name="gridEdit" value="@Languages.Translation("Edit")" class="btn btn-primary" />
                <input type="button" id="gridRemove" name="gridRemove" value="@Languages.Translation("Remove")" class="btn btn-primary" />
            </div>
        </div>
        <div class="col-sm-12 col-md-12 m-t-10">
            <div class="table-responsive jqgrid-cus">
                @Html.Hidden("tiAssignCitationCodeCitations", Languages.Translation("tiAssignCitationCodeCitationCodes"))
                <div id="divCitationCodeGrid">
                    <table id="grdCitationCode"></table>
                    <div id="grdCitationCode_pager">
                    </div>
                </div>
            </div>
        </div>
        <div id="AddEditCitationCodeDialog"></div>
    </div>
</section>
<script src="@Url.Content("~/Scripts/AppJs/Citation.js")"></script>