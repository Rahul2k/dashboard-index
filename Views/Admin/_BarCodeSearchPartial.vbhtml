@Imports TabFusionRMS.Models
@ModelType ScanList

@*<section class="content-header">
        <h1>
            BarCode Search Order
        </h1>
        <ol class="breadcrumb">
            <li><a href="@Url.Action("Index", "Admin")"><i class="fa fa-dashboard"></i>Home</a></li>
            <li class="active">BarCode Search Order</li>
        </ol>
    </section>
    <hr />*@
<style>
    .mgr-btm {
        margin-bottom: 15px;
    }
</style>
@Using Html.BeginForm("SetbarCodeSearchEntity", "Admin", FormMethod.Post, New With {.id = "frmBarCodeSearchOrder", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlBarCodeSearch" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiJsBarCodeSearchBCSO")</h4>
                </div>
                <div class="modal-body">
                    @Html.HiddenFor(Function(m) m.Id, New With {.value = "0"})

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="DefaultOutputSetting">@Languages.Translation("Table") :</label>
                                <div class="col-sm-9">
                                    @Html.DropDownListFor(Function(m) m.TableName, DirectCast(ViewBag.BarCodeTableList, IEnumerable(Of SelectListItem)), "", New With {.class = "form-control", .placeholder = Languages.Translation("lblBarCodeSearchOutputVolume"), .required = "", .id = "lstBarCodeList", .autofocus = ""})
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="DefaultOutputSetting">@Languages.Translation("lblBarCodeSearchField") :</label>
                                <div class="col-sm-9">
                                    <select id="FieldName" name="FieldName" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="txtStripChar">@Languages.Translation("lblBarCodeSearchStripCharacters") :</label>
                                <div class="col-sm-9">
                                    @Html.TextBoxFor(Function(m) m.IdStripChars, New With {.class = "form-control", .maxlength = "10", .id = "txtStripChar", .name = "txtStripChar", .autofocus = ""})
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="txtMask">@Languages.Translation("lblBarCodeSearchMask") :</label>
                                <div class="col-sm-9">
                                    @Html.TextBoxFor(Function(m) m.IdMask, New With {.class = "form-control", .maxlength = "20", .id = "txtMask", .name = "txtMask", .autofocus = ""})
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button id="btnSaveOutputSettings" type="button" class="btn btn-primary">@Languages.Translation("Save")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
End Using
<section class="content form-horizontal">
    @*@Using Html.BeginForm("SaveScanListEntity", "Admin", FormMethod.Post, New With {.id = "frmBarCodeSearchOrderSave", .ReturnUrl = ViewData("ReturnUrl")})*@
    @*<div id="parent">*@
    @*<div class="form-group row">
            <div id="divBarCodeButtons">
                <div class="col-sm-1 col-md-1">
                    <input type="button" id="gridAdd" name="gridAdd" value="Add" class="btn btn-primary" />
                </div>
                <div class="col-sm-1 col-md-1">
                    <input type="button" id="gridEdit" name="gridEdit" value="Edit" class="btn btn-primary" />
                </div>
                <div class="col-sm-1 col-md-1">
                    <input type="button" id="gridRemove" name="gridRemove" value="Remove" class="btn btn-primary" />
                </div>
            </div>
        </div>*@
    <div class="form-group">
        <div class="col-sm-12">
            <div class="btn-toolbar">
                <input type="button" id="gridAdd" name="gridAdd" value="@Languages.Translation("Add")" class="btn btn-primary" />
                <input type="button" id="gridEdit" name="gridEdit" value="@Languages.Translation("Edit")" class="btn btn-primary" />
                <input type="button" id="gridRemove" name="gridRemove" value="@Languages.Translation("Remove")" class="btn btn-primary" />
            </div>
        </div>
    </div>
    <div class="row top_space">
            <div id="divBarCodeGrid" class="col-sm-12 jqgrid-cus">
                <table id="grdBarCode"></table>
                <div id="grdDrive_pager"></div>
            </div>
        @*<div class="col-sm-12 col-md-12">
                <div class="form-group row">
                    <div class="col-sm-12 col-md-12 table-responsive">

                    </div>
                </div>
            </div>*@
    </div>
    @*</div>*@
    @*End Using*@
</section>
<script src="@Url.Content("~/Content/themes/TAB/js/common.jqgrid.views.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/BarCodeSearch.js")"></script>

