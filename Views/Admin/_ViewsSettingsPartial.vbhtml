@Imports TabFusionRMS.WebVB
@ModelType ViewsCustomModel
<style>
    .sticker.stick {
        right: 47px;
    }

    .sticker {
        right: 16px;
        margin-bottom: 15px;
    }
</style>

<section class="content">
    @Using Html.BeginForm("SetViewsSettings", "Admin", FormMethod.Post, New With {.id = "frmViewsSettings", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
        @<div id="parent">
            @Html.HiddenFor(Function(m) m.ViewsModel.MultiParent)@*, New With {.value = "0"}*@
            @Html.HiddenFor(Function(m) m.ViewsModel.TableName, New With {.value = ""})
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="ViewName">@Languages.Translation("Name")</label>
                        <div class="col-md-8">
                            @Html.TextBoxFor(Function(m) m.ViewsModel.ViewName, New With {.class = "form-control", .placeholder = Languages.Translation("plViewsSettingsPartialViewName"), .maxlength = 60})
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="ID">@Languages.Translation("Id").ToUpper()</label>
                        <div class="col-md-8">
                            <input class="form-control" id="txtViewId" type="text" readonly="readonly" />
                            @*@Html.TextBoxFor(Function(m) m.ViewsModel.Id, New With {.class = "form-control", .placeholder = "Id", .ReadOnly = True})*@
                            @Html.HiddenFor(Function(m) m.ViewsModel.Id, New With {.class = "form-control", .placeholder = Languages.Translation("Id"), .style = {"display" = "none"}})
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-10">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="checkbox-cus">
                                @*@Html.CheckBoxFor(Function(m) m.ViewsModel.IncludeFileRoomOrder, New With {.ReadOnly = True, .Id = "ViewsModel_IncludeFileRoomOrder"})*@
                                <input id="ViewsModel_IncludeFileRoomOrder" name="IncludeFileRoomOrder" value="false" type="checkbox" />
                                <label class="checkbox-inline" for="ViewsModel_IncludeFileRoomOrder">@Languages.Translation("chkViewsSettingsPartialIncludeFileRoomOrder")</label>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="checkbox-cus">
                                @*@Html.CheckBoxFor(Function(m) m.ViewsModel.IncludeTrackingLocation, New With {.Id = "ViewsModel_IncludeTrackingLocation"})*@
                                <input id="ViewsModel_IncludeTrackingLocation" name="IncludeTrackingLocation" value="false" type="checkbox" />
                                <label class="checkbox-inline" for="ViewsModel_IncludeTrackingLocation">@Languages.Translation("chkViewsSettingsPartialIncludeTrackingDst")</label>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="checkbox-cus">
                                <input type='checkbox' id="ViewsModel_SearchableView" name='ViewsModel.SearchableView' value='true' />
                                <label class="checkbox-inline" for="ViewsModel_SearchableView">@Languages.Translation("chkViewsSettingsPartialSearchableView")</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                @*<label class="col-sm-2 col-md-2 control-label"></label>
                    <div class="checkbox-inline col-sm-4 col-md-4 ">
                    <label>*@
                @*@If (Model.ViewsModel.SearchableView Is Nothing) Then
                    Model.ViewsModel.SearchableView = False
                    End If*@

                @*@Html.HiddenFor(Function(m) m.ViewsModel.SearchableView)*@
                @*</label>
                    </div>*@
                <label class="col-md-2 control-label" for="MaxRecsPerFetch">@Languages.Translation("lblViewsSettingsPartialMaxRecords")</label>
                <div class="col-md-4">
                    @Html.TextBoxFor(Function(m) m.ViewsModel.MaxRecsPerFetch, New With {.class = "form-control", .placeholder = Languages.Translation("lblViewsSettingsPartialMaxRecords"), .maxlength = 6})
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">@Languages.Translation("lblViewsSettingsPartialSQLStmt")</label>
                <div class="col-md-10">
                    @Html.TextAreaFor(Function(m) m.ViewsModel.SQLStatement, New With {.class = "form-control", .placeholder = Languages.Translation("btnViewsSettingsPartialMovFiltersintoSQLStmt"), .rows = "3"})
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-2"></div>
                <div class="col-md-10">
                    <button id="btnMoveFilterintoSQL" type="button" class="btn btn-primary">@Languages.Translation("btnViewsSettingsPartialMovFiltersintoSQLStmt")</button>
                </div>
            </div>
            <fieldset class="admin_fieldset">
                <legend>@Languages.Translation("tlViewsSettingsPartialTaskList")</legend>
                <div class="col-md-2"></div>
                <div class="col-md-3">
                    <div class="checkbox-cus bottom_space">
                        @*@Html.CheckBoxFor(Function(m) m.ViewsModel.InTaskList, New With {.Id = "ViewsModel_InTaskList"})*@
                        <input id="ViewsModel_InTaskList" name="InTaskList" value="false" type="checkbox" />
                        <label class="checkbox-inline" for="ViewsModel_InTaskList">@Languages.Translation("chkViewsSettingsPartialInTaskList")</label>
                    </div>
                </div>
                <label class="col-md-3 control-label" for="MaxRecsPerFetch">@Languages.Translation("lblViewsSettingsPartialTaskListDisplay")</label>
                <div class="col-md-4">
                    @Html.TextBoxFor(Function(m) m.ViewsModel.TaskListDisplayString, New With {.class = "form-control", .placeholder = Languages.Translation("lblViewsSettingsPartialTaskListDisplay"), .maxlength = 255})
                </div>
            </fieldset>
            <fieldset class=admin_fieldset>
                <legend>@Languages.Translation("tlViewsSettingsPartialColumns")</legend>
                <div class="col-sm-12">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="btn-toolbar pull-right">
                                <button id="btnAddColumn" type="button" class="btn btn-primary">@Languages.Translation("Add")</button>
                                <button id="btnEditColumn" type="button" class="btn btn-primary">@Languages.Translation("Edit")</button>
                                <button id="btnDeleteColumn" type="button" class="btn btn-primary">@Languages.Translation("Delete")</button>
                                <button id="btnSortByColumn" type="button" class="btn btn-primary">@Languages.Translation("Sortby")</button>
                                <button id="btnFilterByColumn" type="button" class="btn btn-primary">@Languages.Translation("btnViewsSettingsPartialFilterBy")</button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group top_space">
                        <div class="col-sm-12 table-responsive jqgrid-cus">
                            <table id="grdViewColumns"></table>
                        </div>
                    </div>
                </div>
            </fieldset>
            <hr style="border-top:1px solid #fff;" />
            <hr style="border-top:1px solid #fff;" />
            <div class="form-group">
                <div class="sticker stick">

                    <button id="btnApplyViewSetting" type="button" class="btn btn-primary pull-right">@Languages.Translation("Apply")</button>
                </div>
            </div>
        </div>

        @<div class="modal fade" id="mdlSortBy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title" id="myModalLabel">@Languages.Translation("viewColumnSorttitleExpressSortList")</h4>
                    </div>
                    <div class="modal-body">
                        <div class="bootstrap-duallistbox-container row">
                            @*<div class="col-sm-12">
                                    <select multiple="multiple" size="10" name="duallistbox_ViewColumns" class="eItems" id="SelectViewColumn"></select>
                                </div>*@
                            <div class="col-sm-5">
                                <label for="bootstrap-duallistbox-nonselected-list_duallistbox_Retention">@Languages.Translation("viewColumnSortAvailableColumns")</label>
                                <div class="btn-group buttons">
                                    <button type="button" class="btn moveall btn-default" title="@Languages.Translation("lblJsDualListBoxMoveAll")" disabled="">
                                        <i class="glyphicon glyphicon-arrow-right"></i>
                                        <i class="glyphicon glyphicon-arrow-right"></i>
                                    </button>
                                    <button type="button" class="btn move btn-default" id="btnMoveSelected" title="@Languages.Translation("lblJsDualListBoxMoveSelected")">
                                        <i class="glyphicon glyphicon-arrow-right"></i>
                                    </button>
                                </div>
                                <select style="height: 202px;" size="10" class="form-control" id="nonSelectedColumnList"></select>
                            </div>
                            <div class="col-sm-5">
                                <label for="bootstrap-duallistbox-selected-list_duallistbox_Retention">@Languages.Translation("viewColumnSortSortedColumns")</label>
                                <div class="btn-group buttons">
                                    <button type="button" class="btn remove btn-default" id="btnRemoveSelected" title="@Languages.Translation("lblJsDualListBoxRMVSelected")">
                                        <i class="glyphicon glyphicon-arrow-left"></i>
                                    </button>
                                    <button type="button" class="btn removeall btn-default" id="btnRemoveAllSelected" title="@Languages.Translation("lblJsDualListBoxRMVAll")">
                                        <i class="glyphicon glyphicon-arrow-left"></i>
                                        <i class="glyphicon glyphicon-arrow-left"></i>
                                    </button>
                                </div>
                                <select style="height: 202px;" size="10" class="form-control" id="selectedColumnList"></select>
                            </div>
                            <div class="col-sm-2">
                                <br>
                                <button type="button" class="btn btn-default" aria-label="Up" id="btnSortByUp" style="margin-top: 5px;">
                                    <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-default" aria-label="Down" id="btnSortByDown">
                                    <span class="glyphicon glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="col-sm-5">
                                </div>
                                <div id="divSortBy" class="col-sm-5">
                                    <div class="radio-inline">
                                        <label><input type="radio" id="rbAscending" name="rbSortBy" value="false">@Languages.Translation("Ascending")</label>
                                    </div>
                                    <div Class="radio-inline">
                                        <Label> <input type="radio" id="rbDescending" name="rbSortBy" value="true">@Languages.Translation("Descending")</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div Class="modal-footer">
                        <Button id="btnSortCancel" type="button" Class="btn btn-default">@Languages.Translation("Cancel")</Button>
                        <button id="btnSortOk" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>


        @<div class="modal fade" id="mdlViewsFilters" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tlViewsSettingsPartialFilter")</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div id="newLineLabel" class="well well-lg well-note">
                                    <label id="lblFilterMsg" style="font-size:large">@Languages.Translation("lblViewsSettingsPartialPressNewLnToCrtANewFilter")</label>
                                </div>
                            </div>
                        </div>
                        <div id="divFilterRow">
                            <div class="filterfullrow" id="filterfullrow_0__Div">
                                <div class="removerow">
                                    <a id="btnRemoveRow" onclick="RemoveFilterRow($(this))" value="btnRemove_0__val">&times;</a>
                                    @*<a id="btnRemoveRow"></a>*@
                                </div>
                                <div class="input-group">
                                    @*<input type="hidden" id="hdnViewsId" name="hdnViewsId" value="0" />*@
                                    @Html.TextBoxFor(Function(m) m.ViewFilterList(0).OpenParen, New With {.class = "form-control input-sm hideControls", .placeholder = "(", .maxlength = "10", .style = "display:none;width: 50px;", .onChange = "BracketOnChnage()"})
                                    @Html.HiddenFor(Function(m) m.ViewFilterList(0).Id, New With {.class = "form-control input-sm"})
                                    @Html.HiddenFor(Function(m) m.ViewFilterList(0).ViewsId, New With {.class = "form-control input-sm hktest"})
                                    @Html.HiddenFor(Function(m) m.ViewFilterList(0).DisplayColumnNum, New With {.class = "form-control input-sm"})

                                    <span class="input-group-btn" style="width:0px;"></span>

                                    <select style="margin-left:-1px;width: 90px;" id="ViewFilterList_0__ColumnNum" name="ViewFilterList[0].ColumnNum" onchange='FillOperator($(this),false)' class="form-control input-sm"></select>

                                    <span class="input-group-btn" style="width:0px;"></span>

                                    <select style="margin-left:-2px" id="ViewFilterList_0__Operator" name="Viewfilterlist[0].Operator" class="form-control input-sm ddlOperator"></select>

                                    <span class="input-group-btn" style="width:0px;"></span>

                                    <input type="checkbox" id="ViewFilterList_0__chkYesNoField" hidden="hidden" onclick="SetCheckValue($(this))">
                                    <select style="margin-left:-3px;display:none;" id="ViewFilterList_0__sscComboBox" class="form-control input-sm" maxlength="255"></select>

                                    <span class="input-group-btn" style="width:0px;"></span>

                                    <input style="margin-left:-3px;display:none;" type="text" id="ViewFilterList_0__txtFilterData" class="form-control input-sm" />

                                    <span class="input-group-btn" style="width:0px;"></span>

                                    @Html.TextBoxFor(Function(m) m.ViewFilterList(0).CloseParen, New With {.class = "form-control input-sm hideControls", .placeholder = ")", .maxlength = "10", .style = "display:none;margin-left:-4px;width: 50px", .onChange = "BracketOnChnage()"})

                                </div>
                                <div class="hideControls" style="display:none">
                                    <span class="radio-cus">
                                        <input type="radio" id="ViewFilterList_0__JoinOperatorAnd" name="ViewFilterList[0].JoinOperator" value="And">
                                        <label class="radio-inline " for="ViewFilterList_0__JoinOperatorAnd">@Languages.Translation("raViewsSettingsPartialAnd")</label>
                                    </span>
                                    <span class="radio-cus">
                                        <input type="radio" id="ViewFilterList_0__JoinOperatorOr" name="ViewFilterList[0].JoinOperator" value="Or">
                                        <Label Class="radio-inline" for="ViewFilterList_0__JoinOperatorOr">@Languages.Translation("raViewsSettingsPartialOr")</Label>
                                    </span>
                                    <div class="pull-right checkbox-cus">
                                        <input type="checkbox" name="ViewFilterList[0].Active" id="ViewFilterList_0__Active" onchange="flagForFilterButton()" value="true" checked="checked">
                                        <Label Class="checkbox-inline" for="ViewFilterList_0__Active">@Languages.Translation("chkViewsSettingsPartialActive")</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-3">
                                <div class="checkbox-cus">
                                    <input type="checkbox" name="chkActiveFooter" id="chkActiveFooter" value="true" checked="checked">
                                    <Label Class="checkbox-inline" for="chkActiveFooter">@Languages.Translation("chkViewsSettingsPartialApplyFilters")</Label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="checkbox-cus">
                                    <input type="checkbox" name="chkAdvanceFilters" id="chkAdvanceFilters" value="false">
                                    <Label Class="checkbox-inline" for="chkAdvanceFilters">@Languages.Translation("chkViewsSettingsPartialAdvancedFeatures")</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="btnCancel" type="button" class="btn btn-default">@Languages.Translation("Cancel")</button>
                        <button id="btnOk" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                        <button id="btnNewLine" type="button" class="btn btn-primary">@Languages.Translation("btnViewsSettingsPartialNewLine")</button>
                        <button id="btnRemoveAll" type="button" class="btn btn-primary">@Languages.Translation("btnViewsSettingsPartialRemoveAll")</button>
                        <button id="btnTestFilter" type="button" class="btn btn-success">@Languages.Translation("btnViewsSettingsPartialTestFilter")</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    End Using
</section>
<input type="hidden" id="bSaveViews" value="" />
<div id="AddViewColumn">
</div>

@*<section class="content">
        @Html.Partial("~/Views/Admin/_ViewsAddFiltersPartial.vbhtml", New TabFusionRMS.WebVB.TestingList)
    </section>*@

@*@Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmViewsFilters", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})

        @


    End Using*@
<input type="hidden" id="hdnGridColCount" value="@ViewBag.ColumnGrdCount" />
<input type="hidden" id="hdnCallfrom" />
<input type="hidden" id="hdnOperatorData" />
<input type="hidden" id="hdnFilterRow" />

<script src="@Url.Content("~/Content/themes/TAB/js/common.jqgrid.views.js")"></script>
<script src="~/Scripts/AppJs/Sortlistbox.js"></script>
<style>
    .removePadding {
        padding: 0 !important;
    }
</style>