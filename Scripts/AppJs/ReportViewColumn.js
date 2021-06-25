function LoadReportColumn(tableName, reportNameOrId, viewsId, LevelNum, currentHeading, addFlag) {
    window.tableName = tableName;
    window.LevelNum = LevelNum;
    $('#AddViewColumn').empty();
    $('#AddViewColumn').load(urls.Reports.LoadViewColumn, function () {
        $('#AddViewColumn').show(); //Added by Hemin on 12/14/2016
        $('#mdlViewColumn').ShowModel();
        $('#printReportDiv').show();
        $('#viewColumnCheck').attr('checked', false);
        $('#MaxPrintLines').OnlyNumericWithoutDot();
        if (addFlag) {
            window.reportNameOrId = null;
            DisplayFieldText(false);
            LoadOnAddClick(tableName, true, null);
        }
        else {
            window.reportNameOrId = reportNameOrId;
            DisplayFieldText(true);
            LoadOnEditClick(tableName, reportNameOrId, LevelNum, currentHeading, null);
        }
        $('#ViewsId').val(viewsId);

        // Apply add column validation
        $('#frmViewColumnDetails').validate({
            rules: {
                LookupTypeId: { required: true },
                FieldName: { required: true },
                Heading: { required: true }
            },
            ignore: ":hidden:not(select)",
            messages: {
                LookupTypeId: { required: "" },
                FieldName: { required: "" },
                Heading: { required: "" }
            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            }
        });

        // Apply add column validation
        $('#btnColumnOk').click(function () {
           //var IsReportColumn = true;
            var $form = $('#frmViewColumnDetails');
            if ($form.valid()) {
                var fieldTypeVar = $('#FieldType').val();
                var displayMask = $('#EditMask').val();
                var fieldSizeVar = parseInt($('#FieldSize').val());
                if ((fieldTypeVar.trim() == "Text" && fieldSizeVar > 255 && displayMask !== "" && displayMask !== null) || (fieldTypeVar.trim() == "Memo" && displayMask !== "" && displayMask !== null)) {
                    var sMaskError;
                    if (fieldTypeVar.trim() == "Text")
                        sMaskError = String.format(vrViewsRes['msgJsViewsFieldGreaterThan25InSize'], fieldTypeVar);
                    else
                        sMaskError = String.format(vrViewsRes['msgJsReportViewColumnField'], fieldTypeVar);
                    $(this).confirmModal({
                        confirmTitle: 'TAB FusionRMS',
                        confirmMessage: String.format(vrViewsRes['msgJsViewsApplyingADisplayMaskToA'], sMaskError, "\n"),
                        confirmOk: vrCommonRes['Yes'],
                        confirmCancel: vrCommonRes['No'],
                        confirmStyle: 'default',
                        confirmObject: true,
                        confirmCallback: SaveData
                    });
                }
                else {
                    SaveData(true);
                }
            }

        });
        restrictSpecialWord();
        setTimeout(function () {
            if ($('#mdlViewColumn').hasScrollBar()) {
                $('#mdlViewColumnClone').empty().html($('#mdlViewColumn .modal-footer').clone());
                $('#mdlViewColumnClone .modal-footer').find('#btnColumnOk').click(function () {
                    $('.modal-content .modal-footer').find('#btnColumnOk').trigger('click');
                });
                $('#mdlViewColumnClone .modal-footer').css({ 'width': ($('#mdlViewColumn').find('.modal-footer').width() + 30) + 'px', 'padding': '15px 7px 15px 15px' });

                if (($('#mdlViewColumn').get(0).scrollHeight - $('#mdlViewColumn').height()) <= 30) {
                    $('#mdlViewColumnClone').removeClass('affixed');
                }

                $('#mdlViewColumn').on('scroll', function () {
                    if ($('#mdlViewColumn').get(0).scrollHeight > (($('#mdlViewColumn').height() + $('#mdlViewColumn').scrollTop()) + 60)) {
                        $('#mdlViewColumnClone').addClass("affixed");
                    }
                    else {
                        $('#mdlViewColumnClone').removeClass("affixed");
                    }
                });
                $('#mdlViewColumn').on('hide.bs.modal', function (e) {
                    $('#mdlViewColumnClone').removeClass('affixed');
                });
            }
            else { $('#mdlViewColumnClone').hide(); }

        }, 800);
    });
}

function SaveData(IsReportColumn) {
    var FieldNameTB = $('#FieldNameTB').val();
    var LookupNumber = $('#LookupNumber').val();
    var $form = $('#frmViewColumnDetails');
        var DisplayStyleData = parseInt($('input:radio[name=DisplayStyle]:checked').val());
        var DuplicateType = parseInt($('input:radio[name=DuplicateData]:checked').val());
        var DropDownFlagBool= $('#DropDownFlag').is(':checked');
        var EditAllowedBool = $('#EditAllowed').is(':checked');
        var sSQLString = "";

        if ($("#ViewsModel_SQLStatement").length)
            sSQLString = $("#ViewsModel_SQLStatement").val();

        var serializedForm = $form.serialize()
            + "&DisplayStyleData=" + DisplayStyleData
            + "&DuplicateType=" + DuplicateType
            + "&TableName=" + tableName
            + "&reportNameOrId=" + reportNameOrId
            + "&LevelNum=" + LevelNum
            + "&SQLString="+sSQLString
            + "&FieldNameTB=" + FieldNameTB
            + "&LookupNumber=" + LookupNumber
            + "&IsReportColumn=" + IsReportColumn
            + "&DropDownFlagBool=" + DropDownFlagBool
            + "&pPageBreakField=" + $("#PageBreakField").is(':checked')
            + "&pSuppressDuplicates=" + $("#SuppressDuplicates").is(':checked')
            + "&pCountColumn=" + $("#CountColumn").is(':checked')
            + "&pSubtotalColumn=" + $("#SubtotalColumn").is(':checked')
            + "&pRestartPageNumber=" + $("#RestartPageNumber").is(':checked')
            + "&pUseAsPrintId=" + $("#UseAsPrintId").is(':checked')
            + "&pSortableField=" + $("#SortableField").is(':checked')
            + "&pFilterField=" + $("#FilterField").is(':checked')
            + "&pEditAllowed=" + $("#EditAllowed").is(':checked')
            + "&pColumnVisible=" + $("#ColumnVisible").is(':checked')
            + "&pDropDownSuggestionOnly=" + $("#DropDownSuggestionOnly").is(':checked')
            + "&pMaskInclude=" + $("#MaskInclude").is(':checked');
        $.post(urls.Reports.SetColumnInTempViewCol, serializedForm, function (data) {
            showAjaxReturnMessage(data.message, data.errortype);
            if (data.errortype == "s") {
                var pViewColumnObj = $.parseJSON(data.lstViewColumnJSON);
                if (!$('#viewColumnCheck').is(':checked')) {
                    RefreshColumnList(pViewColumnObj, LevelNum);
                }
                else {
                    $.post(urls.Views.RefreshViewColGrid, { vViewId: LevelNum, tableName: tableName }, function (data) {
                        if (data) {
                            if (data.errortype == "s") {
                                $("#grdViewColumns").refreshJqGrid();
                                $("#btnFilterByColumn, #btnEditColumn, #btnDeleteColumn").removeAttr('disabled'); //Modified by Hemin on 12/14/2016
                            }
                        }
                    });
                }
                $('#mdlViewColumn').HideModel();
                $('#AddViewColumn').hide();
            } else {
                return false;
            }
            return true;
        });
}


//Added by Akruti
function RefreshColumnList(pViewColumnObj, LevelNum) {
    switch (LevelNum) {
        case 1:
            $("#ulLevel1Cols").empty();
            $(pViewColumnObj).each(function (i, item) {
                $("#ulLevel1Cols").append("<li id= Id_" + pViewColumnObj[i].Id + " class='list-group-item checkbox-cus'><input type='checkbox' id='Level1_" + pViewColumnObj[i].ColumnNum + "' class='printableColLevel1' value='false'/><label class='checkbox-inline' for='Level1_" + pViewColumnObj[i].ColumnNum + "'> " + pViewColumnObj[i].Heading + "</label></li>");
                $("#Level1_" + pViewColumnObj[i].ColumnNum).attr('checked', !pViewColumnObj[i].SuppressPrinting);
            });
            $("#ulLevel1Cols li").first().addClass('highlightClass');
            break;
        case 2:
            $("#ulLevel2Cols").empty();
            $(pViewColumnObj).each(function (i, item) {
                $("#ulLevel2Cols").append("<li id= Id_" + pViewColumnObj[i].Id + " class='list-group-item checkbox-cus'><input type='checkbox' id='Level2_" + pViewColumnObj[i].ColumnNum + "' class='printableColLevel2' value='false'/><label class='checkbox-inline' for='Level2_" + pViewColumnObj[i].ColumnNum + "'> " + pViewColumnObj[i].Heading + "</label></li>");
                $("#Level2_" + pViewColumnObj[i].ColumnNum).attr('checked', !pViewColumnObj[i].SuppressPrinting);
            });
            $("#ulLevel2Cols li").first().addClass('highlightClass');
            break;
        case 3:
            $("#ulLevel3Cols").empty();
            $(pViewColumnObj).each(function (i, item) {
                $("#ulLevel3Cols").append("<li id= Id_" + pViewColumnObj[i].Id + " class='list-group-item checkbox-cus'><input type='checkbox' id='Level3_" + pViewColumnObj[i].ColumnNum + "' class='printableColLevel3' value='false'/><label class='checkbox-inline' for='Level3_" + pViewColumnObj[i].ColumnNum + "'> " + pViewColumnObj[i].Heading + "</label></li>");
                $("#Level3_" + pViewColumnObj[i].ColumnNum).attr('checked', !pViewColumnObj[i].SuppressPrinting);
            });
            $("#ulLevel3Cols li").first().addClass('highlightClass');
            break;
        default:
            break;
    }
}
//Added by Akruti
function LoadOnEditClick(tableName, ColumnId, LevelNum, currentHeading, vViewId) {
    var viewColId;
    if (ColumnId.indexOf("_") >= 0) {
        var viewColumnId = ColumnId.split('_');
        viewColId = parseInt(viewColumnId[1]);
    }
    else {
        viewColId = parseInt(ColumnId);
    }
    var EditFlag = false;
    EditFlag = LoadOnAddClick(tableName, false, vViewId);
    if (EditFlag) {
        var $form = $('#frmViewsSettings');
        var serializedForm = $form.serialize();
        serializedForm = serializedForm + "&viewColumnId=" + viewColId + "&LevelNum=" + LevelNum + "&currentHeading=" +encodeURIComponent(currentHeading) + "&tableName=" + tableName;
        $.post(urls.Reports.GetDataFromViewColumn, serializedForm, function (data) {
        if (data) {
                if (data.errortype == "s") {

                    if (vViewId !== null) {
                        var editSettingsJSON = $.parseJSON(data.editSettingsJSON);
                        EnableDisableViewSection(editSettingsJSON);
                    }
                    var viewColumnJSON = $.parseJSON(data.viewColumnJSON);
                    if (viewColumnJSON !== null) {
                        if (viewColumnJSON.Id !== null)
                            $('#ViewColumnId').val(viewColumnJSON.Id);
                        if (viewColumnJSON.ViewsId !== null)
                            $('#ViewsId').val(viewColumnJSON.ViewsId);
                        if (viewColumnJSON.LookupType !== '' && viewColumnJSON.LookupType !== null)
                        {
                            $('#LookupNumber').val(viewColumnJSON.LookupType);
                            $('#LookupTypeId option[value=' + viewColumnJSON.LookupType + ']').attr('selected', true);
                        }   
                        if (viewColumnJSON.FieldName !== '' && viewColumnJSON.FieldName !== null) {
                            $('#FieldNameTB').val(viewColumnJSON.FieldName);
                            $('#FieldName').val(viewColumnJSON.FieldName);
                        }
                        SetFieldTypeAndSize(tableName, viewColumnJSON.FieldName, false);
                        if (viewColumnJSON.Heading !== null && viewColumnJSON.Heading !== "")
                            $('#Heading').val(viewColumnJSON.Heading);
                        if (viewColumnJSON.EditMask !== null && viewColumnJSON.EditMask !== "")
                            $('#EditMask').val(viewColumnJSON.EditMask);
                        if (viewColumnJSON.InputMask !== null && viewColumnJSON !== "")
                            $('#InputMask').val(viewColumnJSON.InputMask);
                        if (viewColumnJSON.MaskPromptChar !== null && viewColumnJSON.MaskPromptChar !== "")
                            $('#MaskPromptChar').val(viewColumnJSON.MaskPromptChar);
                        if (viewColumnJSON.AlternateFieldName !== null && viewColumnJSON.AlternateFieldName !== null)
                            $('#AlternateFieldName').val(viewColumnJSON.AlternateFieldName);
                        if (viewColumnJSON.ColumnOrder !== null)
                            $('#ColumnOrder option[value=' + viewColumnJSON.ColumnOrder + ']').attr('selected', true);
                        if (viewColumnJSON.ColumnStyle !== null)
                            $('#ColumnStyle option[value=' + viewColumnJSON.ColumnStyle + ']').attr('selected', true);
                        if (viewColumnJSON.PageBreakField)
                            $('#PageBreakField').attr('checked', true);
                        else
                            $('#PageBreakField').attr('checked', false);
                        if (viewColumnJSON.SuppressDuplicates)
                            $('#SuppressDuplicates').attr('checked', true);
                        else
                            $('#SuppressDuplicates').attr('checked', false);
                        if (viewColumnJSON.CountColumn)
                            $('#CountColumn').attr('checked', true);
                        else
                            $('#CountColumn').attr('checked', false);
                        if (viewColumnJSON.MaxPrintLines !== null)
                            $('#MaxPrintLines').val(viewColumnJSON.MaxPrintLines);
                        if (viewColumnJSON.SubtotalColumn)
                            $('#SubtotalColumn').attr('checked', true);
                        else
                            $('#SubtotalColumn').attr('checked', false);
                        if (viewColumnJSON.RestartPageNumber)
                            $('#RestartPageNumber').attr('checked', true);
                        else
                            $('#RestartPageNumber').attr('checked', false);
                        if (viewColumnJSON.UseAsPrintId)
                            $('#UseAsPrintId').attr('checked', true);
                        else
                            $('#UseAsPrintId').attr('checked', false);
                        if (viewColumnJSON.SortableField)
                            $('#SortableField').attr('checked', true);
                        else
                            $('#SortableField').attr('checked', false);
                        if (viewColumnJSON.FilterField)
                            $('#FilterField').attr('checked', true);
                        else
                            $('#FilterField').attr('checked', false);
                        if (viewColumnJSON.EditAllowed)
                            $('#EditAllowed').attr('checked', true);
                        else
                            $('#EditAllowed').attr('checked', false);
                        if (viewColumnJSON.ColumnVisible)
                            $('#ColumnVisible').attr('checked', true);
                        else
                            $('#ColumnVisible').attr('checked', false);
                        if (viewColumnJSON.DropDownSuggestionOnly)
                            $('#DropDownSuggestionOnly').attr('checked', true);
                        else
                            $('#DropDownSuggestionOnly').attr('checked', false);
                        if (viewColumnJSON.MaskInclude)
                            $('#MaskInclude').attr('checked', true);
                        else
                            $('#MaskInclude').attr('checked', false);
                        if (viewColumnJSON.DropDownFlag)
                            $('#DropDownFlag').attr('checked', true);
                        else
                            $('#DropDownFlag').attr('checked', false);
                        DisableOnEditClick(false);
                        if (viewColumnJSON.LookupType !== null) {
                            if (viewColumnJSON.LookupType == 12 || viewColumnJSON.LookupType == 13 || viewColumnJSON.LookupType == 14 || viewColumnJSON.LookupType == 15) {
                                var DisplayStyleDataJSON = $.parseJSON(data.DisplayStyleDataJSON);
                                $('#LookupChildType').show();
                                $('#LookupTypeId').hide();
                                var DuplicateTypeJSON = $.parseJSON(data.DuplicateTypeJSON);
                                if (DisplayStyleDataJSON == false && DuplicateTypeJSON == false)
                                    $('#LookupChildType').val('Child Lookdown/Comma Separated/Display Dups');
                                if (DisplayStyleDataJSON == true && DuplicateTypeJSON == false)
                                    $('#LookupChildType').val('Child Lookdown/[CR] Separated/Display Dups');
                                if (DisplayStyleDataJSON == false && DuplicateTypeJSON == true)
                                    $('#LookupChildType').val('Child Lookdown/Comma Separated/Skip Dups');
                                if (DisplayStyleDataJSON == true && DuplicateTypeJSON == true)
                                    $('#LookupChildType').val('Child Lookdown/[CR] Separated/Skip Dups');
                            }
                            else {
                                $('#LookupChildType').hide();
                                $('#LookupTypeId').show();
                            }

                        }
                    }
                }
                else {
                    showAjaxReturnMessage(data.message, data.errortype);
                }
            }
        });
    }
}

function LoadOnAddClick(tableName, addEditFlag, vViewId) {
    var viewFlag;
    if ($('#viewColumnCheck').is(':checked'))
        viewFlag = true;
    else
        viewFlag = false;

    $.post(urls.Reports.FillViewColumnControl, { TableName: tableName, viewFlag: viewFlag, viewId: vViewId }, function (data) {
        if (data) {
            if (data.errortype == "s") {
                $('#ViewColumnId').val(parseInt(0));
                var columnTypeJSON = $.parseJSON(data.columnTypeJSON);
                var visualAttributeJSON = $.parseJSON(data.visualAttributeJSON);
                var allignmentJSON = $.parseJSON(data.allignmentJSON);
                LoadDDLField('#LookupTypeId', columnTypeJSON);
                LoadDDLField('#ColumnOrder', visualAttributeJSON);
                LoadDDLField('#ColumnStyle', allignmentJSON);
                $('#LookupTypeId option:first').attr('selected', true);
                var lookUpVar = $('#LookupTypeId option:selected').val();
                if (addEditFlag)
                    LoadColumnType(lookUpVar, tableName, addEditFlag);
                ValidateChildLook(lookUpVar);
            }
            else {
                showAjaxReturnMessage(data.message, data.errortype);
            }
        }
    });

    $('#LookupTypeId').on('change', function () {
        var lookUpVar = $('#LookupTypeId option:selected').val();
        LoadColumnType(lookUpVar, tableName, true);
        ValidateChildLook(lookUpVar);
    });

    $('#FieldName').on('change', function () {
        var lFieldNameVar = $('#FieldName option:selected').val();
        SetFieldTypeAndSize(tableName, lFieldNameVar, true);
    });

    $('#DropDownFlag').on('click', function () {
        var IdVal = parseInt($('#ViewColumnId').val());
        if (IdVal == 0) {
            lFieldNameVar = $('#FieldName option:selected').val();
        }
        else {
            lFieldNameVar = $('#FieldNameTB').val();
        }
        var editStatus = $('#EditAllowed').is(':enabled');
        var lookUpVar = $('#LookupTypeId option:selected').val();
        var currentStatus = $('#DropDownFlag').is(':checked');
        $.post(urls.Reports.DropDownValidation, { currentStatus: currentStatus, editStatus: editStatus, tableName: tableName, lFieldNameVar: lFieldNameVar, lookUpVar: lookUpVar }, function (data) {
            if (data) {
                if (data.errortype == "s") {
                    var chkEditable = $.parseJSON(data.chkEditableJSON);
                    var chkDropDownSuggest = $.parseJSON(data.chkDropDownSuggestJSON);
                    if (chkEditable) {
                        $('#EditAllowed').attr('checked', true);
                    } else {
                        $('#EditAllowed').attr('checked', false);
                    }
                    if (chkDropDownSuggest) {
                        $('#DropDownSuggestionOnly').attr('disabled', false);
                    } else {
                        $('#DropDownSuggestionOnly').attr('checked', false);
                        $('#DropDownSuggestionOnly').attr('disabled', true);
                    }
                }
            }
        });
    });
    return true;
}

function DisableOnEditClick(flagOff) {
    if (flagOff) {
        $('#LookupTypeId').removeAttr('disabled', 'disabled');
        $('#FieldName').removeAttr('disabled', 'disabled');
        $('#FieldType').removeAttr('disabled', 'disabled');
        $('#FieldSize').removeAttr('disabled', 'disabled');
        $('#FieldNameTB').removeAttr('disabled', 'disabled');
        $('#LookupChildType').removeAttr('disabled', 'disabled');

    }
    else {
        $('#LookupTypeId').attr('disabled', 'disabled');
        $('#FieldName').attr('disabled', 'disabled');
        $('#FieldType').attr('disabled', 'disabled');
        $('#FieldSize').attr('disabled', 'disabled');
        $('#FieldNameTB').attr('disabled', 'disabled');
        $('#LookupChildType').attr('disabled', 'disabled');
    }
}

function DisplayFieldText(editFlag) {
    if (editFlag) {
        $('#FieldNameTB').show();
        $('#FieldName').hide();
    }
    else
    {
        $('#FieldNameTB').hide();
        $('#FieldName').show();
    }

}
function LoadColumnType(lookUpVar, tableName, addEditFlag) {
    var viewFlag;
    var msSQL = null;
    if ($('#viewColumnCheck').is(':checked')) {
        viewFlag = true;
        msSQL = $('#ViewsModel_SQLStatement').val();
    }
    else {
        viewFlag = false;
        msSQL = null;
    } 
    var IsLocationChecked = $('#ViewsModel_IncludeTrackingLocation').is(':checked');
    $.post(urls.Reports.FillInternalFieldName, { ColumnTypeVar: lookUpVar, TableName: tableName, viewFlag: viewFlag, IsLocationChecked: IsLocationChecked, msSQL: msSQL }, function (data) {
        if (data) {
            if (data.errortype == "s") {
                var FieldNameJSON = $.parseJSON(data.FieldNameJSON);
                LoadDDLField('#FieldName', FieldNameJSON);
                EnableOkField();
                if ($('#FieldName option').size() !== 0) {
                    $('#FieldName option:first').attr('selected', true);
                    var lFieldNameVar = $('#FieldName option:selected').val();
                    SetFieldTypeAndSize(tableName, lFieldNameVar, addEditFlag);
                }
            }
        }
    });
}

function ValidateAlternateField() {
    var alternateField=$('#AlternateFieldName').val();
    $.post(urls.Reports.ValidateColumnData, { AlterNateField: alternateField }, function (data) {
        if (data) {
            if (data.errortype == "w") {
            }
        }
    });
}


function SetFieldTypeAndSize(tableName, lFieldNameVar, addEditFlag) {
    $.post(urls.Reports.FillFieldTypeAndSize, { TableVar: tableName, FieldName: lFieldNameVar }, function (data) {
        if (data) {
            if (data.errortype == "s") {
                var sFieldTypeJSON = $.parseJSON(data.sFieldTypeJSON);
                var sFieldSizeJSON = $.parseJSON(data.sFieldSizeJSON);
                $("#FieldType").val(sFieldTypeJSON);
                $("#FieldSize").val(sFieldSizeJSON);
                if (addEditFlag) {
                    var lFieldNameVal = $('#FieldName option:selected').text();
                    var headingText = lFieldNameVal;
                    $("#Heading").val(headingText.substring(0, 30));

                }
                var sEditMaskLengthJSON = $.parseJSON(data.sEditMaskLengthJSON);
                var sInputMaskLengthJSON = $.parseJSON(data.sInputMaskLengthJSON);
                ValidateMaskLength(sEditMaskLengthJSON, sInputMaskLengthJSON);
                if (addEditFlag==true) {
                    ValidateViewSection(tableName);
                }
            }
        }
    });
}
function ValidateViewSection(tableName) {
    var lookUpVar = $('#LookupTypeId option:selected').val();
    var lFieldNameVar = $('#FieldName option:selected').val();
    var lFieldType = $("#FieldType").val();
    var $form = $('#frmViewsSettings');
    var serializedForm = $form.serialize();
    serializedForm = serializedForm + "&TableName=" + tableName + "&LookupType=" + lookUpVar + "&FieldName=" + lFieldNameVar + "&FieldType=" + lFieldType;
    $.post(urls.Reports.ValidateViewColEditSetting, serializedForm, function (data) {
        if (data) {
            if (data.errortype == "s") {
                var editSettingsJSON = $.parseJSON(data.editSettingsJSON);
                EnableDisableViewSection(editSettingsJSON);
            }
        }
    });
}

function EnableDisableViewSection(editSettingsJSON){
    if (editSettingsJSON["Sortable"]) {
        $('#SortableField').attr('checked', true);
        $('#SortableField').attr('disabled', false);
    }
    else {
        $('#SortableField').attr('disabled', true);
        $('#SortableField').attr('checked', false);
    }
    
    if (editSettingsJSON["Filterable"]) {
        $('#FilterField').attr('checked', true);
        $('#FilterField').attr('disabled', false);
    }
    else {
        $('#FilterField').attr('checked', false);
        $('#FilterField').attr('disabled', true);
    }    
    if (editSettingsJSON["Editable"]) {
        $('#EditAllowed').attr('checked', true);
        $('#EditAllowed').attr('disabled', false);
    }
    else {
        $('#EditAllowed').attr('checked', false);
        $('#EditAllowed').attr('disabled', true);
    }
    if (editSettingsJSON["Capslock"])
        $('#ColumnVisible').attr('disabled', false);
    else
        $('#ColumnVisible').attr('disabled', true);
    if (editSettingsJSON["DropDown"])
        $('#DropDownFlag').attr('disabled', false);
    else
        $('#DropDownFlag').attr('disabled', true);
    if (editSettingsJSON["DropDownSuggestionOnly"])
        $('#DropDownSuggestionOnly').attr('disabled', false);
    else
        $('#DropDownSuggestionOnly').attr('disabled', true);
    if (editSettingsJSON["MaskIncludeDB"])
        $('#MaskInclude').attr('disabled', false);
    else
        $('#MaskInclude').attr('disabled', true);
    if (editSettingsJSON["SubTotal"])
        $('#SubtotalColumn').attr('disabled', false);
    else
        $('#SubtotalColumn').attr('disabled', true);
}

function ValidateChildLook(lookUpVar) {
    $('#LookupChildType').hide();
    if (lookUpVar == 12) {
        $('#divDisplayStyle *').removeAttr('disabled', 'disabled');
        $('#divDuplicateData *').removeAttr('disabled', 'disabled');
    } else {
        $('#divDisplayStyle *').attr('disabled', 'disabled');
        $('#divDuplicateData *').attr('disabled', 'disabled');
    }
}

function ValidateMaskLength(sEditMaskLengthJSON, sInputMaskLengthJSON) {
    $("#EditMask").attr('maxlength', sEditMaskLengthJSON);
    $('#InputMask').attr('maxlength', sInputMaskLengthJSON);
}

function EnableOkField() {
    var FieldSize = $('#FieldName option').size();
    if (FieldSize == 0)
        $('#btnColumnOk').attr('disabled', 'disabled');
    else
        $('#btnColumnOk').removeAttr('disabled', 'disabled');
}

function LoadDDLField(DDLListId, FieldJSONList) {
    $(DDLListId).empty();
    $.each(FieldJSONList, function (i, item) {
        $(DDLListId).append($('<option />', {
            value: item.Key,
            text: item.Value
        }));
    });
}


function LoadViewColEditSetting(bAddFlag) {
    if (bAddFlag) {
        $('#SortableField').attr('checked', true);
        $('#FilterField').attr('checked', true);
        $('#EditAllowed').attr('checked', true);
    }
    else {
        $('#SortableField').attr('checked', false);
        $('#FilterField').attr('checked', false);
        $('#EditAllowed').attr('checked', false);
    }
}