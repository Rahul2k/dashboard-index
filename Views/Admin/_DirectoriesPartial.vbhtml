@*<h2>Directories View</h2>*@

<section class="content form-horizontal">
    <div id="parent">

        <div class="form-group">
            <div id="divDriveButtons" class="col-sm-6">
                <div class="btn-toolbar">
                    <input type="button" id="gridAdd" name="gridAdd" value="@Languages.Translation("Add")" class="btn btn-primary" />
                    <input type="button" id="gridEdit" name="gridEdit" value="@Languages.Translation("Edit")" class="btn btn-primary" />
                    <input type="button" id="gridDelete" name="gridDelete" value="@Languages.Translation("Delete")" class="btn btn-primary" />
                </div>
            </div>
            <div id="divVolumesButtons" class="col-sm-6">
                <div class="btn-toolbar">
                    <input type="button" id="gridVolumesAdd" name="gridVolumesAdd" value="@Languages.Translation("Add")" class="btn btn-primary" />
                    <input type="button" id="gridVolumesEdit" name="gridVolumesEdit" value="@Languages.Translation("Edit")" class="btn btn-primary" />
                    <input type="button" id="gridVolumesDelete" name="gridVolumesDelete" value="@Languages.Translation("Delete")" class="btn btn-primary" />
                </div>
            </div>
            @*<label class="col-sm-7 col-md-7 control-label"></label>*@
            <div class="col-sm-6">
                <input type="button" id="gridUpDown" name="gridUpDown" value="@Languages.Translation("btnDirectoriesPartialDown1Lvl")" class="btn btn-primary pull-right" />
            </div>
        </div>
        <div class="row top_space">
            <div class="col-sm-12 col-md-12 table-responsive jqgrid-cus">
                <div id="divDriveGrid">
                    <table id="grdDrive"></table>
                    <div id="grdDrive_pager"></div>
                </div>
                <div id="divVolumesGrid">
                    <table id="grdVolumes"></table>
                    <div id="grdVolumes_pager"></div>
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" id="SystemAddressesId1" value="0" />
    <div id="AddEditDriveDialog">
    </div>
    <div id="AddEditVolumeDialog">
    </div>
</section>
<script src="@Url.Content("~/Scripts/AppJs/Directories.js")"></script>