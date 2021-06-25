jQuery.fn.gridLoadBackground = function (getUrl, caption) {
    var gridobject = $(this);
    BindImportJobGrid(gridobject, getUrl, caption);
};

$(function () {
    $("#grdBackground").jqGrid('GridUnload');
    $("#grdBackground").gridLoadBackground(urls.Admin.GetBackgroundProcess, vrApplicationRes["lblBackgroundProcess"]);

    var dateToday = new Date();
    $('.datepicker').datepicker({
        dateFormat: getDatePreferenceCookie(), //Changed by Hasmukh on 06/15/2016 for date format changes
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        maxDate: dateToday,
        //beforeShow: function (textbox, instance) {
        //    var txtBoxOffset = $(this).offset();
        //    var top = txtBoxOffset.top;
        //    var left = txtBoxOffset.left;
        //    var textBoxWidth = $(this).outerWidth();
        //    //alert(textbox.offsetHeight);
        //    //console.log('top: ' + top + 'left: ' + left);
        //    setTimeout(function () {
        //        instance.dpDiv.css({
        //            top: top - 190, //you can adjust this value accordingly
        //            left: left + textBoxWidth//show at the end of textBox
        //        });
        //    }, 0);
        //}
        beforeShow: function (input, inst) {
            var calendar = inst.dpDiv;
            setTimeout(function () {
                calendar.position({
                    my: 'left bottom',
                    at: 'left top',
                    collision: 'none',
                    of: input
                });
            }, 1);
        }
    });
});


function BindImportJobGrid(gridobject, getUrl, caption) {
    var IsCheckbox = true;
    var pDatabaseGridName = gridobject.attr('id');
    var pPagerName = '#' + pDatabaseGridName + '_pager';

    $("#filterButton").click(function (event) {
        event.preventDefault();
        filterGrid(gridobject);
    });

    var myData = {
        tableName: function () {
            var tableNames = $("#grdBackground").getGridParam('caption');
            return tableNames;
        }
    };
    gridobject.jqGrid({
        url: getUrl,
        datatype: 'json',
        mtype: 'Get',
        colModel: [
            {
                key: false, name: 'Id', index: 'Id', label: 'Id', hidden: true
            },
                 {
                     name: 'Section', label: vrApplicationRes['lblBackgroundSection'], resizable: false, search: false, width: 10, sortable: false, editable: true, editrules: { required: true }, formatter: 'text', edittype: 'select', editoptions: {
                         value: FillSectionArray
                     }, title: false, index: 'Section'
                 }
               ,
                {
                    name: 'MinValue', id: 'MinValue', label: vrApplicationRes['lblBackgroundMinValue'], index: 'MinValue', width: 15, editable: true, editrules: { required: true, number: true, custom: true, custom_func: IsNegative }, editoptions: {
                    }
                },
                 {
                     name: 'MaxValue', id: 'MaxValue', label: vrApplicationRes['lblBackgroundMaxValue'], index: 'MaxValue', width: 15, editable: true, editrules: { required: true, number: true, custom: true, custom_func: IsGreaterThanMax }, editoptions: {
                     }
                 }
        ],
        pager: jQuery(pPagerName),
        rowNum: 20,
        rowList: [20, 40, 80, 100],
        height: '100%',
        viewrecords: true,
        loadonce: false,
        grouping: false,
        caption: caption,
        emptyrecords: vrCommonRes['NoRecordsToDisplay'],
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        autowidth: true,
        shrinkToFit: true,
        multiselect: true,
        editData: true,
        editurl: urls.Admin.SetBackgroundData,
        serializeRowData: function (postdata) {
            var selectedrows = $("#grdBackground").getSelectedRowsIds();
            var pBackgroundObj = {};
            pBackgroundObj["Id"] = selectedrows;
            pBackgroundObj["Section"] = $('#' + selectedrows + '_Section').val();
            pBackgroundObj["MinValue"] = $('#' + selectedrows + '_MinValue').val();
            pBackgroundObj["MaxValue"] = $('#' + selectedrows + '_MaxValue').val();
            return { x01: JSON.stringify(pBackgroundObj) };
        },
        reloadAfterSubmit: true,
        onSelectRow: function () {
            var selectedrows = $("#grdBackground").getSelectedRowsIds();
            if (selectedrows.length == 1) {
                $("#grdBackground_iledit").removeClass('ui-state-disabled');
                //$("#navbar_delete").removeClass('ui-state-disabled');
            }
            if (selectedrows.length == 0) {
                $("#grdBackground_iledit").addClass('ui-state-disabled');
                $("#navbar_delete").addClass('ui-state-disabled');
                $("#grdBackground_ilsave").addClass('ui-state-disabled');
            }
            if (selectedrows.length > 1) {
                //$("#navbar_delete").removeClass('ui-state-disabled');
                $("#grdBackground_iledit").addClass('ui-state-disabled');
                return false;
            }
            return true;
        }

    }).navGrid(pPagerName, {
        edit: false,
        add: false,
        del: false,
        search: false,
        refresh: true,
        refreshtext: vrCommonRes["Refresh"],
        beforeRefresh: function () {
            ReloadGrid();
        }
    });

    gridobject.jqGrid('inlineNav', pPagerName,
                    {
                        edit: true,
                        editicon: "ui-icon-pencil",
                        add: true,
                        addicon: "ui-icon-plus",
                        save: true,
                        saveicon: "ui-icon-disk",
                        cancel: true,
                        cancelicon: "ui-icon-cancel",
                        editParams: {
                            keys: false,
                            oneditfunc: null,
                            successfunc: function (val) {
                                if (val.status == 200) {
                                    if (val.responseJSON.errortype == "s") {
                                        showAjaxReturnMessage(val.responseJSON.message, 's');
                                        ReloadGrid();
                                    } else {
                                        showAjaxReturnMessage(val.responseJSON.message, val.responseJSON.errortype);
                                    }
                                }
                            },
                            url: null,
                            aftersavefunc: null,
                            errorfunc: null,
                            afterrestorefunc: null,
                            restoreAfterError: true,
                            mtype: "POST"
                        },
                        addParams: {
                            useDefValues: true,
                            addRowParams: {
                                keys: true,
                                extraparam: {},
                                successfunc: function (val) {

                                    if (val.status == 200) {
                                        showAjaxReturnMessage(val.responseJSON.message, 's');
                                        if (val.responseText != "") {
                                            ReloadGrid();
                                        }
                                    }
                                }
                            }
                        }
                    });

    gridobject.jqGrid('navButtonAdd', pPagerName, {
        caption: vrCommonRes["Delete"],
        buttonicon: "ui-icon-trash",
        onClickButton: DeleteConfirm,
        id: "navbar_delete",
        position: "last"
    });

    $("#grdBackground_iledit").addClass('ui-state-disabled');
    $("#navbar_delete").addClass('ui-state-disabled');

    $("#grdBackground_iladd").on('click', function () {
        var selectedrows = $("#grdBackground").getSelectedRowsIds();
        if (selectedrows.length > 1) {
            var oNewRow = selectedrows[parseInt(selectedrows.length) - 1];
            selectedrows.splice(parseInt(selectedrows.length) - 1, 1);
            $.each(selectedrows, function (index, value) {
                $("#" + value).removeClass("ui-state-highlight");
                $("#jqg_grdBackground_" + value).prop("checked", false);
            });
            selectedrows.splice(0, parseInt(selectedrows.length));
            selectedrows.push(oNewRow);
        }
        $("#navbar_delete").addClass('ui-state-disabled');
    });
}

function DeleteConfirm() {
    if ($("#grdBackground").is(':visible')) {
        var selectedrows = $("#grdBackground").getSelectedRowsIds();
        if (selectedrows.length == 0) {
            showAjaxReturnMessage(vrDataRes['msgJsDataSelectOneRow'], 'w');
            return;
        }
        else {
            var message;
            if (selectedrows.length == 1) {
                message = String.format(vrDataRes['msgJsDataRowForDeletion'], selectedrows.length);
            } else {
                message = String.format(vrDataRes['msgJsDataRowsForDeletion'], selectedrows.length);
            }
            $(this).confirmModal({
                confirmTitle: vrCommonRes['msgJsDelConfim'],
                confirmMessage: message,
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmCallback: DeleteSelectedRows
            });
        }
    }
}

function DeleteSelectedRows() {
    var sel_id = $("#grdBackground").getSelectedRowsIds();
    var SectionArray = [];
    if (sel_id.length > 0) {
        $(sel_id).each(function (i, item) {
            var rowData = jQuery("#grdBackground").getRowData(item);
            var SectionValue = rowData["Section"];
            SectionArray.push(SectionValue);
        });
    }
    var SectionArrayObject = JSON.stringify(SectionArray);
    $.post(urls.Admin.RemoveBackgroundSection, { SectionArrayObject: SectionArrayObject }, function (data) {
        if (data) {
            if (data.errortype == "e") {
                showAjaxReturnMessage(data.message, data.errortype);
                return;
            } else if (data.errortype == "s") {
                ReloadGrid();
            }
        }
    });
}

function ReloadGrid() {
    $("#grdBackground").jqGrid('GridUnload');
    $("#grdBackground").gridLoadBackground(urls.Admin.GetBackgroundProcess, vrApplicationRes["lblBackgroundProcess"]);
}

function FillSectionArray() {
    var arySort = {};
    $.ajax({
        url: urls.Admin.GetBackgroundOptions,
        type: "GET",
        async: false,
        success: function (data) {
            if (data.errorType == "s") {
                var oBackgroundOptionJSON = $.parseJSON(data.BackgroundOptionJSON);
                $.each(oBackgroundOptionJSON, function (i, item) {
                    arySort[item.Key] = item.Value;
                });
            }
        }
    });
    return arySort;
}

function IsGreaterThanMax(maxValue, colName) {
    var selectedrows = $("#grdBackground").getSelectedRowsIds();
    var minValue = $('#' + selectedrows + '_MinValue').val();
    if (parseInt(maxValue) < 0) {
        return [false, vrApplicationRes['msgJsBackgroundNegativeNotAllowed']];
    } else {
        if (parseInt(minValue) < parseInt(maxValue))
            return [true, ""];
        else
            return [false, vrApplicationRes['msgJsBackgroundShouldBeGreater']];
    }
}

function IsNegative(value) {
    if (parseInt(value) < 0)
        return [false, vrApplicationRes['msgJsBackgroundNegativeNotAllowed']];
    else
        return [true, ""];
}


$("#btnDaleteTask").on('click', function (e) {
    var vchkBGStatusCompleted = $("#chkBGStatusCompleted").is(":checked") ? "true" : "false";
    var vchkBGStatusError = $("#chkBGStatusError").is(":checked") ? "true" : "false";
    var vBGEndDate = $("#BGEndDate").val();

    if (vchkBGStatusCompleted == "true" || vchkBGStatusError == "true") {
        if (vBGEndDate == "") {
            //showAjaxReturnMessage(vrCommonRes['msgAdminBGwarningDateSelect'], 'w');
            showAjaxReturnMessage('Select any EndDate for Tasks Deletion', 'w');
            return;
        }
        
        $.post(urls.Admin.DeleteBackgroundProcessTasks, { pBGEndDate: vBGEndDate, pchkBGStatusCompleted: vchkBGStatusCompleted, pchkBGStatusError: vchkBGStatusError }).done(function (response) {
            showAjaxReturnMessage(response.message, response.errortype);
        }).fail(function (xhr, status, error) {
            ShowErrorMessge();
        });
    }
    else
    {
        //showAjaxReturnMessage(vrCommonRes['msgAdminBGwarningTasksSelect'], 'w');
        showAjaxReturnMessage('Make any selection for Tasks Deletion', 'w');
        return;
    }
    return true;
});
