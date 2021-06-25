@Imports TabFusionRMS.Models
@ModelType TabFusionRMS.Models.ViewColumn

@Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmViewColumnDetails", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnUrl")})
    @<section class="content">

        <div class="modal fade" id="mdlViewColumn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" onclick="mdlViewColumnModelHide()">×</button>
                        <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiAddCoulmnViewPartialColPrintProp")</h4>
                    </div>
                    <div class="modal-body">

                        @Html.HiddenFor(Function(m) m.ViewsId)
                        <input id="ViewColumnId" name="Id" type="text" hidden="hidden" />
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label id="lblType" for="LookupType" class="col-md-4 control-label">@Languages.Translation("lblAddCoulmnViewPartialColType")</label>
                                    <div class="col-md-8">
                                        <select id="LookupTypeId" name="LookupType" class="form-control"></select>
                                        <input type="text" id="LookupChildType" name="LookupChildType" class="form-control" hidden="hidden" disabled="disabled" />
                                        <input type="number" id="LookupNumber" name="LookupNumber" hidden="hidden">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label id="lblField" for="FieldName" class="col-md-4 control-label">@Languages.Translation("lblAddCoulmnViewPartialInternalFieldName")</label>
                                    <div class="col-md-8">
                                        <select id="FieldName" name="FieldName" class="form-control"></select>
                                        <input type="text" id="FieldNameTB" name="FieldNameTB" class="form-control" hidden="hidden" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label id="lblType" class="col-md-4 control-label">@Languages.Translation("lblAddColumnViewPartialIntenalFieldType")</label>
                                    <div class="col-md-8">
                                        <div class="input-group col-sm-12">
                                            <input type="text" name="FieldType" id="FieldType" style="width:75%;" class="form-control" disabled="disabled" />

                                            <input type="text" name="FieldSize" id="FieldSize" style="width:25%;" class="form-control" disabled="disabled" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="col-md-4 control-label" id="lblField" for="FileNamePrefix">@Languages.Translation("lblAddCoulmnViewPartialHeading")</label>
                                    <div class="col-md-8">
                                        @Html.TextBoxFor(Function(m) m.Heading, New With {.class = "form-control", .placeholder = Languages.Translation("lblAddCoulmnViewPartialHeading"), .autofocus = "", .maxlength = 30})
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label id="lblDisplay" for="EditMask" class="col-md-4 control-label">@Languages.Translation("lblAddColumnViewPartialDisplayMask")</label>
                                    <div class="col-md-8">
                                        @Html.TextBoxFor(Function(m) m.EditMask, New With {.class = "form-control", .placeholder = Languages.Translation("lblAddColumnViewPartialDisplayMask")})
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label id="lblInput" for="InputMask" class="col-md-4 control-label">@Languages.Translation("lblAddColumnViewPartialInputMask")</label>

                                    <div class="col-md-8">
                                        @Html.TextBoxFor(Function(m) m.InputMask, New With {.class = "form-control", .placeholder = Languages.Translation("lblAddColumnViewPartialInputMask")})
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label id="lblMaskPrompt" for="MaskPromptChar" class="col-md-4 control-label">@Languages.Translation("lblAddColumnViewPartialMaskPrompt")</label>
                                    <div class="col-md-8">
                                        @Html.TextBoxFor(Function(m) m.MaskPromptChar, New With {.class = "form-control", .placeholder = Languages.Translation("lblAddColumnViewPartialMaskPrompt"), .maxlength = "1"})
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label id="lblFieldName" for="AlternateFieldName" class="col-md-4 control-label">@Languages.Translation("lblAddColumnViewPartialAlternateFieldName")</label>
                                    <div class="col-md-8">
                                        @Html.TextBoxFor(Function(m) m.AlternateFieldName, New With {.class = "form-control", .placeholder = Languages.Translation("lblAddColumnViewPartialAlternateFieldName")})
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label id="lblVisible" for="ColumnOrder" class="col-md-4 control-label">@Languages.Translation("lblAddColumnViewPartialVisualAttributes")</label>
                                    <div class="col-md-8">
                                        <select id="ColumnOrder" name="ColumnOrder" class="form-control"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label id="lblStyle" for="ColumnStyle" class="col-md-4 control-label">@Languages.Translation("lblAddColumnViewPartialAlignment")</label>
                                    <div class="col-md-8">
                                        @*@Html.DropDownList("ColumnStyle", DirectCast(ViewBag.ColumnStyleList, SelectList), New With {.class = "form-control", .placeholder = "Select Allignment"})*@
                                        <select id="ColumnStyle" name="ColumnStyle" class="form-control"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <fieldset class="admin_fieldset">
                                    <legend class="admin_leg" title="@Languages.Translation("tiAddColumnViewPartialChildLookdownDataDisplay")">@Languages.Translation("tiAddColumnViewPartialChildLookdownDataDisplay")</legend>
                                    <div class="row" id="divDisplayStyle">
                                        <div class="col-sm-6">
                                            <span class="radio-cus">
                                                <input type="radio" name="DisplayStyle" id="CommaRadio" value="0" checked="checked" />
                                                <label id="comma_label" class="radio-inline" for="CommaRadio">@Languages.Translation("lblAddColumnViewPartialCommaSeparated")</label>
                                            </span>
                                        </div>
                                        <div class="col-sm-6">
                                            <span class="radio-cus">
                                                <input type="radio" name="DisplayStyle" id="SeparateRadio" value="1" />
                                                <label id="separate_label" class="radio-inline" for="SeparateRadio">@Languages.Translation("lblAddColumnViewPartialSeparateLines")</label>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-6">
                                            <label id="lblVisible" For="ColumnOrder" class="control-label">@Languages.Translation("lblAddColumnViewPartialEx")</label>
                                            <textarea rows="3" cols="15" disabled="disabled" class="form-control" dir="ltr">
                                                @Languages.Translation("txtAddColumnViewPartialItem1234")
                                            </textarea>
                                        </div>
                                        <div class="col-sm-6">
                                            <label id="lblVisible" For="ColumnOrder" class="control-label">@Languages.Translation("lblAddColumnViewPartialEx")</label>
                                            <textarea rows="3" cols="15" disabled="disabled" class="form-control" dir="rtl">
                                                @Languages.Translation("txtAddColumnViewPartialItem1")
                                            </textarea>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset class="admin_fieldset">
                                    <legend class="admin_leg" title="@Languages.Translation("tiAddColumnViewPartialChildLookdownDupDataHandling")">@Languages.Translation("tiAddColumnViewPartialChildLookdownDupDataHandling")</legend>
                                    <div class="col-sm-12">
                                        <div class="form-group" id="divDuplicateData">
                                            <span class="radio-cus">
                                                <input type="radio" name="DuplicateData" id="DisplayRadio" value="0" checked="checked">
                                                <label id="display_label" class="radio-inline" for="DisplayRadio">@Languages.Translation("lblAddColumnViewPartialDisplayed")</label>
                                            </span>
                                            <span class="radio-cus">
                                                <input type="radio" name="DuplicateData" id="SuppresseRadio" value="1" />
                                                <label id="suppress_label" class="radio-inline" for="SuppresseRadio">@Languages.Translation("lblAddColumnViewPartialSuppressed")</label>
                                            </span>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>

                            <div id="printReportDiv" class="col-md-6" hidden="hidden">
                                <fieldset class="admin_fieldset">
                                    <legend class="admin_leg" title="@Languages.Translation("tiAddColumnViewPartialPrintSetting")">@Languages.Translation("tiAddColumnViewPartialPrintSetting") </legend>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                @*@Html.CheckBoxFor(Function(m) m.PageBreakField)*@
                                                <input id="PageBreakField" name="PageBreakField" value="false" type="checkbox" />
                                                <label id="page_label" class="checkbox-inline" for="PageBreakField">@Languages.Translation("lblAddColumnViewPartialPageBreak")</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                @*@Html.CheckBoxFor(Function(m) m.SuppressDuplicates)*@
                                                <input id="SuppressDuplicates" name="SuppressDuplicates" value="false" type="checkbox" />
                                                <label id="suppress_label" class="checkbox-inline" for="SuppressDuplicates">@Languages.Translation("lblAddColumnViewPartialDoNotPrintDuplicates")</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label id="print_label" class="col-md-7 control-label" for="MaxPrintLines">@Languages.Translation("lblAddColumnViewPartialMaxLinesPerRow")</label>
                                        <div class="col-md-4">
                                            @Html.TextBoxFor(Function(m) m.MaxPrintLines, New With {.maxlength = "3", .class = "form-control input-sm"})
                                        </div>
                                    </div>
                                    <fieldset class="admin_fieldset">
                                        <legend>@Languages.Translation("tiAddColumnViewPartialAppliesToFormattedReportOnly")</legend>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    @*@Html.CheckBoxFor(Function(m) m.CountColumn)*@
                                                    <input id="CountColumn" name="CountColumn" value="false" type="checkbox" />
                                                    <label id="count_label" class="checkbox-inline" for="CountColumn">@Languages.Translation("lblAddColumnViewPartialCount")</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    @*@Html.CheckBoxFor(Function(m) m.SubtotalColumn)*@
                                                    <input id="SubtotalColumn" name="SubtotalColumn" value="false" type="checkbox" />
                                                    <label id="subtotal_label" class="checkbox-inline" for="SubtotalColumn">@Languages.Translation("lblAddColumnViewPartialSubtotals")</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    @*@Html.CheckBoxFor(Function(m) m.RestartPageNumber)*@
                                                    <input id="RestartPageNumber" name="RestartPageNumber" value="false" type="checkbox" />
                                                    <label id="page_label" class="checkbox-inline" for="RestartPageNumber">@Languages.Translation("lblAddColumnViewPartialRestartPageNumberOnPageBreak")</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="checkbox-cus">
                                                    @*@Html.CheckBoxFor(Function(m) m.UseAsPrintId)*@
                                                    <input id="UseAsPrintId" name="UseAsPrintId" value="false" type="checkbox" />
                                                    <label id="id_label" class="checkbox-inline" for="UseAsPrintId">@Languages.Translation("lblAddColumnViewPartialUseAsIdInHeaderFooter")</label>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </fieldset>
                            </div>
                            <div id="viewColumnDiv" class="col-md-6" hidden="hidden">
                                <input type="checkbox" hidden="hidden" name="viewColumnCheck" id="viewColumnCheck" />
                                <fieldset class="admin_fieldset">
                                    <legend class="admin_leg" title="@Languages.Translation("tiAddColumnViewPartialEditSettings")">@Languages.Translation("tiAddColumnViewPartialEditSettings")</legend>
                                    <div class="form-group">
                                        <div class="col-sm-6">
                                            <div class="checkbox-cus">
                                                @*@Html.CheckBoxFor(Function(m) m.SortableField)*@
                                                <input id="SortableField" name="SortableField" value="false" type="checkbox" />
                                                <label id="sortable_label" class="checkbox-inline" for="SortableField">@Languages.Translation("lblAddColumnViewPartialSortable")</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="checkbox-cus">
                                                @*@Html.CheckBoxFor(Function(m) m.FilterField)*@
                                                <input id="FilterField" name="FilterField" value="false" type="checkbox" />
                                                <label id="filter_label" class="checkbox-inline" for="FilterField">@Languages.Translation("lblAddColumnViewPartialFilterable")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-6">
                                            <div class="checkbox-cus">
                                                @*@Html.CheckBoxFor(Function(m) m.EditAllowed)*@
                                                <input id="EditAllowed" name="EditAllowed" value="false" type="checkbox" />
                                                <label id="edit_label" class="checkbox-inline" for="EditAllowed">@Languages.Translation("lblAddColumnViewPartialEditable")</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="checkbox-cus">
                                                @*@Html.CheckBoxFor(Function(m) m.ColumnVisible)*@
                                                <input id="ColumnVisible" name="ColumnVisible" value="false" type="checkbox" />                                               
                                                <label id="visible_label" class="checkbox-inline" for="ColumnVisible">@Languages.Translation("lblAddColumnViewPartialCapslock")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-6">
                                            <div class="checkbox-cus">
                                                <input type="checkbox" id="DropDownFlag" name="DropDownFlag">
                                                <label id="dropdown_label" class="checkbox-inline" for="DropDownFlag">@Languages.Translation("lblAddColumnViewPartialDropDown")</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="checkbox-cus">
                                                @*@Html.CheckBoxFor(Function(m) m.DropDownSuggestionOnly)*@
                                                <input id="DropDownSuggestionOnly" name="DropDownSuggestionOnly" value="false" type="checkbox" />
                                                <label id="suggestion_label" class="checkbox-inline" for="DropDownSuggestionOnly">@Languages.Translation("lblAddColumnViewPartialSuggestionOnly")</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <div class="checkbox-cus">
                                                @*@Html.CheckBoxFor(Function(m) m.MaskInclude)*@   
                                                <input id="MaskInclude" name="MaskInclude" value="false" type="checkbox" />
                                                <label id="maskData_label" class="checkbox-inline" for="MaskInclude">@Languages.Translation("lblAddColumnViewPartialIncludeMaskInData")</label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input id="btnColumnOk" type="button" class="btn btn-primary" value=@Languages.Translation("Ok").ToUpper() />
                        <input id="btnCancel" type="button" class="btn btn-default" onclick="mdlViewColumnModelHide()" value=@Languages.Translation("Cancel") />
                    </div>
                </div>
            </div>
            <div id="mdlViewColumnClone" class="fixed-footer affixed"></div>
        </div>
    </section>
End Using


