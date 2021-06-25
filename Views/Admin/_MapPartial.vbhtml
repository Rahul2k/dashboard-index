@ModelType TabFusionRMS.WebVB.JSTreeView.TreeView
@Imports TabFusionRMS.WebVB
<link href="@Url.Content("~/Content/themes/TAB/css/jsTreeThemes/style.min.css")" rel="stylesheet" />
<script src="@Url.Content("~/Content/themes/TAB/js/jstreemin.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/Map.js")"></script>
@*<h2>Database Map</h2>*@
<style type="text/css">
    .jstree li > a > .jstree-icon {
        display: inline-block !important;
    }
    /*.jstree-default .jstree-open > .jstree-ocl {
        background-position: -100px -4px !important;
    }*/

    /*.FixButton {
      left: 74%;
      position: fixed;
      top: 100px;
    }*/
    .FixButton {
        right: 5%;
        position: fixed;
        top: 190px;
    }
</style>
<section class="content">
    <div id="parent">
        <div class="col-sm-11 col-md-11" id="jstree_demo_div">
            <ul>
                @Html.RenderJsTreeNodes(Model.Nodes)
            </ul>
        </div>
        <div class="col-sm-2 col-md-1 FixButton">
            <button id="btnUp" type="button" class="btn btn-primary btn-block btn-default"><i class="fa fa-arrow-up"></i></button><br />
            <button id="btnDown" type="button" class="btn btn-primary btn-block btn-default"><i class="fa fa-arrow-down "></i></button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <input type="hidden" id="hdnRenameOperation" />
    </div>
</section>
@Using Html.BeginForm(Nothing, Nothing, FormMethod.Get, New With {.id = "frmNewWorkGroup", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlAddNewWorkGroup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiMapPartialNewWorkgroup")</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="WorkGroupName">@Languages.Translation("lblMapPartialName") :</label>
                                <div class="col-sm-9">
                                    @*<input id="hdnNameType" type="hidden" />
                                        <input id="NodeLevel" type="hidden" />*@
                                    <input id="TabsetParentId" type="hidden" />
                                    <input id="TabsetsId" type="hidden" />
                                    <input type="text" class="form-control" placeholder="@Languages.Translation("phMapPartialWorkgroupName")" maxlength="30" id="WorkGroupName" name="WorkGroupName" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnSaveWorkGroup" type="button" class="btn btn-primary">@Languages.Translation("Save")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
End Using

@Using Html.BeginForm(Nothing, Nothing, FormMethod.Get, New With {.id = "frmNewTable", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal" id="mdlAddNewTable" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiMapPartialNewTable")</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="ddlDatabaseList">@Languages.Translation("lblAddNewDatabasePartialDatabase")</label>
                                <div class="col-sm-9">
                                    <input type="hidden" id="ParentId" />
                                    <input type="hidden" id="NodeLevel" />
                                    @Html.DropDownList("ddlDatabaseList", DirectCast(ViewBag.DatabaseList, IEnumerable(Of SelectListItem)), New With {.class = "form-control", .placeholder = Languages.Translation("phMapPartialSelectDatabase")})
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="TableName">@Languages.Translation("lblMapPartialUserName")</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" placeholder="@Languages.Translation("TableName")" maxlength="50" id="TableName" name="TableName" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="InternalName">@Languages.Translation("TableName")</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" placeholder="@Languages.Translation("phMapPartialInternalName")" maxlength="20" id="InternalName" name="InternalName" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="UniqueField">@Languages.Translation("lblMapPartialUniqueField")</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" placeholder="@Languages.Translation("lblMapPartialUniqueField")" maxlength="30" id="UniqueField" name="UniqueField" value="Id" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="ddlFieldTypeList">@Languages.Translation("lblMapPartialFieldType")</label>
                                <div class="col-sm-9">
                                    @Html.DropDownList("ddlFieldTypeList", DirectCast(ViewBag.FieldTypeList, SelectList), New With {.class = "form-control", .placeholder = Languages.Translation("phMapPartialSelectFieldType")})
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="FieldLength">@Languages.Translation("lblMapPartialFieldLength")</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" placeholder="@Languages.Translation("lblMapPartialFieldLength")" maxlength="2" id="FieldLength" name="FieldLength" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button id="btnSaveTable" type="button" class="btn btn-primary">@Languages.Translation("Save")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
End Using

@Using Html.BeginForm(Nothing, Nothing, FormMethod.Get, New With {.id = "frmAttachTable", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal" id="mdlAttachTable" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel1">@Languages.Translation("tiMapPartialAttachTable")</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="ExistingTables">@Languages.Translation("lblMapPartialExistingTables")</label>
                                <div class="col-sm-9">
                                    <select id="ExistingTables" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button id="btnSaveAttachTable" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
End Using

@Using Html.BeginForm(Nothing, Nothing, FormMethod.Get, New With {.id = "frmAttachExistingTable", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlAttachExistingTable" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiMapPartialAttachTables")</h4>
                </div>
                <div class="modal-body">
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiMapPartialCurrentTable")</legend>
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="ExistingTablesField">@Languages.Translation("lblMapPartialExistingTables")</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" placeholder="@Languages.Translation("lblMapPartialExistingTables")" id="ExistingTablesField" name="ExistingTablesField" readonly="readonly" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label class="col-sm-3 control-label" for="IdField">@Languages.Translation("lblMapPartialIdField")</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" placeholder="@Languages.Translation("lblMapPartialIdField")" id="IdField" name="IdField" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="admin_fieldset">
                        <legend>@Languages.Translation("tiMapPartialAttachTo")</legend>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="ddlExistingTables">@Languages.Translation("lblMapPartialExistingTables")</label>
                                <div class="col-sm-9">
                                    @Html.DropDownList("ddlExistingTables", DirectCast(ViewBag.ExistingTablesList, IEnumerable(Of SelectListItem)), New With {.class = "form-control", .placeholder = Languages.Translation("phMapPartialSelectDatabase")})
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="Fields">@Languages.Translation("lblMapPartialField")</label>
                                <div class="col-sm-9">
                                    @Html.DropDownList("Fields", DirectCast(ViewBag.FieldsList, IEnumerable(Of SelectListItem)), New With {.class = "form-control", .placeholder = Languages.Translation("phMapPartialSelectDatabase")})
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button id="btnSaveAttachExistingTable" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
End Using