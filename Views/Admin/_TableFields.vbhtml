<section class="content">
    <div class="row">
        <div class="col-sm-12" id="divTablesFieldButtons">
            <div class="btn-toolbar pull-right">
                <input type="button" id="gridAdd" name="gridAdd" value="@Languages.Translation("Add")" class="btn btn-primary" />
                <input type="button" id="gridEdit" name="gridEdit" value="@Languages.Translation("Edit")" class="btn btn-primary" />
                <input type="button" id="gridRemove" name="gridRemove" value="@Languages.Translation("Remove")" class="btn btn-primary" />
                <input type="button" id="gridPrint" name="gridPrint" value="@Languages.Translation("Print")" class="btn btn-primary" />
            </div><!-- /btn-group -->
        </div>
    </div>

    <div class="row top_space">
        <div class="col-sm-12">
            <div id="divTablesFieldGrid" class="table-responsive jqgrid-cus">
                <table id="grdTablesField"></table>
                <div id="grdTablesField_pager" class="exclude_pager">
                </div>
            </div>
        </div>
    </div>

</section>
<div class="form-horizontal">
    <div class="modal fade" id="mdlAddTablesField" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel"><label id="lblTableName"></label></h4>
                </div>
                <div class="modal-body">

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="txtInternalName">@Languages.Translation("lblTableFieldsInternalName") :</label>
                                <div class="col-sm-8">
                                    <input type="text" id="txtInternalName" name="InternalName" class="form-control" maxlength="50" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="lstFieldTypes">@Languages.Translation("lblTableFieldsFieldType") :</label>
                                <div class="col-sm-8">
                                    <select id="lstFieldTypes" name="FieldTypes" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="txtFieldLength">@Languages.Translation("lblTableFieldsFieldLength") :</label>
                                <div class="col-sm-8">
                                    <input type="text" id="txtFieldLength" name="FieldLength" class="form-control" maxlength="4" />
                                </div>
                            </div>
                        </div>
                    </div>



                    @*<div class="form-group row">
                            <div class="col-sm-6 col-md-6">
                                Internal Name:
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <input type="text" id="txtInternalName" name="InternalName" class="form-control" maxlength="50"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6 col-md-6">
                                Field Type:
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <select id="lstFieldTypes" name="FieldTypes" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6 col-md-6">
                                Field Length:
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <input type="text" id="txtFieldLength" name="FieldLength" class="form-control" maxlength="4"/>
                            </div>
                        </div>*@
                </div>
                <div class="modal-footer">
                    <button id="btnOk" type="button" class="btn btn-primary">@Languages.Translation("Ok").ToUpper()</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</div>
@*<script src="@Url.Content("~/Scripts/AppJs/TablesField.js")"></script>*@