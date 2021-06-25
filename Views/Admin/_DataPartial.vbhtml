<section class="content">
<div id="parent">
            @*<div class="form-group row">
                <div id="divDataButtons">
                    <div class="col-sm-1 col-md-1">
                        <input type="button" id="gridDataAdd" name="gridDataAdd" value="Add" class="btn btn-primary" />
                    </div>
                    <div class="col-sm-1 col-md-1">
                        <input type="button" id="gridDataEdit" name="gridDataEdit" value="Edit" class="btn btn-primary" />
                    </div>
                    <div class="col-sm-1 col-md-1">
                        <input type="button" id="gridDataDelete" name="gridDataDelete" value="Delete" class="btn btn-primary" />
                    </div>
                </div>
            </div>*@
            <div class="form-group row">
                <div class="col-sm-12 table-responsive jqgrid-cus">
                    <table id="grdData"></table>
                    <div id="grdData_pager"></div>
                </div>
            </div>
    </div>
</section>

<script src="@Url.Content("~/Content/themes/tab/js/jquery-ui-timepicker-addon.js")"></script>
<link href="@Url.Content("~/Content/themes/tab/css/jquery-ui-timepicker-addon.css")" rel="stylesheet" />
<script src="@Url.Content("~/Scripts/AppJs/Data.js")"></script>