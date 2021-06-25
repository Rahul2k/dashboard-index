$(function () {
    getResourcesByModule('data');
});

var pk = null;
var primaryKey = null;

function DeleteConfirm() {
    if ($("#grdData").is(':visible')) {
        var selectedrows = $("#grdData").getSelectedRowsIds();
        var tableName = $("#grdData").getGridParam('caption').replace(' ' + vrDataRes['tiJsDataList'], '');
        if (tableName == "GridColumn" || tableName == "GridSettings" || tableName == "LookupType") {
            showAjaxReturnMessage(vrDataRes["msgJsDataDontHaveRights"], 'w');
            ReloadGrid(tableName);
        } else {
            if (selectedrows.length == 0) {
                showAjaxReturnMessage(vrDataRes["msgJsDataSelectOneRow"], 'w');
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
                    confirmCallback: DeleteSelectedRows,
                    confirmObject: selectedrows
                });
            }
        }
    } else {

    }
}

function GetGridPopulated(e, tblName) {
    e.stopPropagation();
    if ($("#grdData").length == 0) {
        $.ajax({
            url: urls.Admin.LoadDataView,
            contentType: 'application/html; charset=utf-8',
            type: 'GET',
            dataType: 'html',
            async: false
        }).done(function (result) {
            $('#LoadUserControl').empty();
            $('#LoadUserControl').html(result);
            restrictSpecialWord();
            GetGridPopulatedData(e, tblName);
            $('#title, #navigation').text(vrCommonRes['ptDataView']);
        })
        .fail(function (xhr, status) {
            ShowErrorMessge();
        });
    }
    else {
        GetGridPopulatedData(e, tblName);
    }
}
function GetGridPopulatedData(e, tblName) {
    $("#grdData").jqGrid('GridUnload');
    var ptableName = tblName.attr("id");
    ptableName = ptableName.replace("*", "");
    $("#grdData").gridLoadDatas(urls.Admin.GetDataList, ptableName + ' ' + vrDataRes['tiJsDataList'], ptableName);
    setCookie('hdnAdminMnuIds', ('Data|' + ptableName), 1);
    $("#ulData li a").each(function (a, b) {
        $(this).removeClass('selectedMenu');
    });
    $('.divMenu').find('a.selectedMenu').removeClass('selectedMenu');
    tblName.addClass('selectedMenu');
    /* Hasmukh : Added on 04/04/2016 - Security check */
    CheckModuleLevelAccess("liData");
    }

function ReloadGrid(tableName) {
    $("#grdData").jqGrid('GridUnload');
    $("#grdData").gridLoadDatas(urls.Admin.GetDataList, tableName + ' ' + vrDataRes['tiJsDataList'], tableName);
}
function DeleteSelectedRows(selectedrows) {
    var rowData;
    var Id = new Array();
    var sel_id = $("#grdData").getSelectedRowsIds();
    var columnNames = $("#grdData").getGridParam('colNames');
    var colName = "";
    for (var i = 0; i < columnNames.length; i++) {
        if (columnNames[i] == "Id") {
            colName = "Id";
        }
    }
    if (!colName) {
        colName = columnNames[1].toString();
    }

    var key = $("#grdData").getGridParam("selrow");
    for (var j = 0; j < sel_id.length; j++) {
        rowData = jQuery("#grdData").getRowData(sel_id[j]);
        Id[j] = rowData[colName];
    }

    var sels_id = $("#grdData").getSelectedRowsIds();
    var rowsData = jQuery("#grdData").getRowData(sels_id);
    var columnsNames = $("#grdData").getGridParam('colNames');
    var fdafdsfsasdfasd = columnsNames.toString();
    var rowDataString = [];
    var viewData = {
        rowData: []
    };
    var jsonData = {};
    for (var k = 1; k < columnsNames.length; k++) {
        rowsData = jQuery("#grdData").getRowData(sels_id);
        jsonData[[columnsNames[k]]] = rowsData[columnsNames[k]];
    }
    viewData.rowData.push(jsonData);
    var a = JSON.stringify(viewData);
    var id = Id.toString();
    var tableName = $("#grdData").getGridParam('caption').replace(' ' + vrDataRes['tiJsDataList'], '');

    $.post(urls.Admin.DeleteSelectedRows, $.param({ tablename: tableName, rows: id, col: colName }))
    .done(function (response) {
        ReloadGrid(tableName);
        $("#grdData").refreshJqGrid();
    }).fail(function (xhr, status, error) { });
}

jQuery.fn.gridLoadDatas = function (getUrl, caption, tableName) {
    var gridobject = $(this);
    var pDatabaseGridName = $(this).attr('id');
    $.post(urls.Common.GetGridViewSettings1, { pGridName: tableName })
    .done(function (response) {
        BindGrids(gridobject, getUrl + "?pTabledName=" + tableName, $.parseJSON(response), caption);
    }).fail(function (xhr, status, error) {
        ShowErrorMessge();
    });
}
function BindGrids(gridobject, getUrl, arrColSettings, caption) {
    var IsCheckbox = true;
    var pDatabaseGridName = gridobject.attr('id');
    var pPagerName = '#' + pDatabaseGridName + '_pager';
    $("#filterButton").click(function (event) {
        event.preventDefault();
        filterGrid(gridobject);
    });
    var myData = {
        tableName: function () {
            var tableNames = $("#grdData").getGridParam('caption').replace(' ' + vrDataRes['tiJsDataList'], '');
            return tableNames;
        }
    };
    var arryDisplayCol = [];
    var arryColSettings = [];
    var globalColumnOrder = [];
    arrColSettings.sort(function (a, b) {
        if (a.srno < b.srno) return -1;
        if (b.srno < a.srno) return 1;
        return 0;
    });
    var jsonType = {};
    var columnNames = [];
    for (var i = 0; i < arrColSettings.length; i++) {
        var dType = arrColSettings[i].dataType;
        jsonType[[arrColSettings[i].displayName]] = dType + "," + arrColSettings[i].autoInc + "," + arrColSettings[i].readOnly;
        columnNames.push([arrColSettings[i].displayName]);
        if (dType != "Byte[]") {
            arryDisplayCol.push([arrColSettings[i].displayName]);
            globalColumnOrder.push([arrColSettings[i].srno]);
            if (arrColSettings[i].srno == -1) {
                arryColSettings.push({ key: true, hidden: true, editable: true, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
            }
            else {
                switch (dType) {
                    case "Int32":
                        if (arrColSettings[i].displayName == "Id" && arrColSettings[i].autoInc) {
                            arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                            primaryKey = arrColSettings[i].name;
                        } else {
                            if (arrColSettings[i].autoInc) {
                                arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                                primaryKey = arrColSettings[i].name;
                            } else {
                                arryColSettings.push({ key: false, editable: true, editrules: { number: true, required: arrColSettings[i].isNull, custom: true, custom_func: checkInt32 }, editoptions: { maxlength: 11 }, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                            }
                        }
                        break;
                    case "Int64":
                        if (arrColSettings[i].displayName == "Id" && arrColSettings[i].autoInc) {
                            arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                            primaryKey = arrColSettings[i].name;
                        } else {
                            if (arrColSettings[i].autoInc) {
                                arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                                primaryKey = arrColSettings[i].name;
                            } else {
                                arryColSettings.push({ key: false, editable: true, editrules: { number: true, required: arrColSettings[i].isNull }, editoptions: { maxlength: arrColSettings[i].maxLength }, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                            }
                        }
                        break;
                    case "Int16":
                        if (arrColSettings[i].displayName == "Id" && arrColSettings[i].autoInc) {
                            arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                            primaryKey = arrColSettings[i].name;
                        } else {
                            if (arrColSettings[i].autoInc) {
                                arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                                primaryKey = arrColSettings[i].name;
                            } else {
                                arryColSettings.push({ key: false, editable: true, editrules: { number: true, required: arrColSettings[i].isNull, custom: true, custom_func: checkInt16 }, editoptions: { maxlength: 6 }, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                            }
                        }
                        break;
                    case "String":
                        if (arrColSettings[i].readOnly == false) {
                            arryColSettings.push({ key: false, editable: true, editrules: { required: arrColSettings[i].isNull }, editoptions: { maxlength: arrColSettings[i].maxLength }, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable, width: 200, fixed: true });
                        } else {
                            arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable, width: 200, fixed: true });
                        }
                        break;
                    case "DateTime":
                        //formatoptions: { srcformat: "Y/m/d h:i", newformat: "Y/m/d h:i" },    formatter: changeToClientTime, 
                        //Changed by Hasmukh on 06/15/2016 for date format changes
                        arryColSettings.push({ key: false, editable: true, formatter: utcDateFormatter, editrules: { datetime: true, custom: true, custom_func: checkValidDate, required: arrColSettings[i].isNull }, editoptions: { dataInit: function (el) { $(el).datetimepicker({ dateFormat: getDatePreferenceCookie() }) } }, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                        //arryColSettings.push({ key: false, editable: true,  editrules: { datetime: true, custom: true, custom_func: checkValidDefaultDate, required: arrColSettings[i].isNull }, editoptions: { dataInit: function (el) { $(el).datetimepicker() } }, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                        break;
                    case "Boolean":
                        arryColSettings.push({ key: false, align: "center", formatter: "checkbox", editable: true, edittype: 'checkbox', editrules: { required: arrColSettings[i].isNull }, editoptions: { value: "1:0" }, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                        break;
                    case "Decimal":
                        arryColSettings.push({ key: false, editable: true, editrules: { number: true, required: arrColSettings[i].isNull }, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                        break;
                    case "Double":
                        arryColSettings.push({ key: false, editable: true, editrules: { number: true, required: arrColSettings[i].isNull }, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
                        break;
                    default:
                        arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable, editable: true, editrules: { required: arrColSettings[i].isNull } });
                        break;
                }
            }
        }
    }

    function utcDateFormatter(cellvalue, options, rowObject) {
        if (cellvalue) {
            var selectedrows = $("#grdData").getSelectedRowsIds();
            if (selectedrows.length > 0)
                return cellvalue;
            var dateFormated = new Date(cellvalue); 
            var dateMonthAsWord = moment(dateFormated).format(getDatePreferenceCookieForMoment().toUpperCase() + ' ' + "HH:mm");
            return dateMonthAsWord;
        } else {
            return '';
        }
    }
    function checkValidDate(value, colname) {
        if (!isValidDate(value)) {
            return [false, vrDataRes['msgJsDataValidDate']];
        } else {
            return [true, ""];
        }
    }

    function checkValidDefaultDate(value, colname) {
        if (!isValidDefaultDate(value)) {
            return [false, vrDataRes['msgJsDataValidDate']];
        } else {
            return [true, ""];
        }
    }

    function checkInt16(value, colname) {
        if (value) {
            if (value <= 32767 && value >= -32768) {
                //Valid date
                return [true, ""];
            } else {
                return [false, vrDataRes['msgJsDataCheckInt16'] + ' ' + colname];
                //Not a valid date
            }
        } else {
            return [true, ""];
        }
    }

    function checkInt32(value, colname) {
        if (value) {
            if (value <= 2147483647 && value >= -2147483648) {
                //Valid date
                return [true, ""];
            } else {
                return [false, vrDataRes['msgJsDataCheckInt32'] + ' ' + colname];
                //Not a valid date
            }
        } else {
            return [true, ""];
        }
    }

    gridobject.jqGrid({
        url: getUrl,
        datatype: 'json',
        mtype: 'Get',
        colNames: arryDisplayCol,
        colModel: arryColSettings,
        pager: jQuery(pPagerName),
        rowNum: 20,
        rowList: [20, 40, 80, 100],
        height: '100%',
        viewrecords: true,
        loadonce: false,
        grouping: false,
        caption: caption,
        emptyrecords: vrDataRes['msgJsDataNoRecordsToDisplay'],
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        sortable: {
            update: function (relativeColumnOrder) {
                var grid = gridobject;
                var currentColModel = grid.getGridParam('colModel');
                $.ajax({
                    url: urls.Common.ArrangeGridOrder,
                    type: 'POST',
                    data: JSON.stringify(currentColModel),
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {

                    },
                    error: function (xhr, status, error) {
                    }
                });
            }
        },
        autowidth: true,
        shrinkToFit: true,
        multiselect: IsCheckbox,
        editData: myData,
        sortname: arrColSettings[0].name,
        editurl: urls.Admin.ProcessRequest,
        serializeRowData: function (postdata) {
            var tableNames = $("#grdData").getGridParam('caption').replace(' ' + vrDataRes['tiJsDataList'], '');
            var columnNames = $("#grdData").getGridParam('colNames');
            var colNames = columnNames.toString();
            var colName = "";
            for (var i = 0; i < columnNames.length; i++) {
                if (columnNames[i] == "Id" && columnNames[i] == primaryKey) {
                    colName = "Id";
                } else {
                    if (columnNames[i] == tableNames + "Id" && columnNames[i] == primaryKey) {
                        colName = tableNames + "Id";
                        break;
                    }
                }
            }
            if (!colName) {
                if (!primaryKey) {
                    colName = columnNames[1].toString();
                } else {
                    colName = primaryKey;
                }

            }
            var sel_id = $("#grdData").getSelectedRowsIds();
            if (sel_id.length > 1) {
                rowData = jQuery("#grdData").getRowData(sel_id[sel_id.length - 1]);
            } else {
                rowData = jQuery("#grdData").getRowData(sel_id);
            }


            var colValue = rowData[colName];
            return { x01: JSON.stringify(postdata), x02: tableNames, x03: colNames, x04: JSON.stringify(jsonType), x05: colName, x06: colValue, x07: pk };
        },
        beforeSelectRow: function (rowid, status) {
            if ($(this).jqGrid("getGridParam", "selrow") === rowid && status.srcElement.id.toString().indexOf("grdData") > -1) {
                if ($('#grdData_ilcancel').hasClass("ui-state-disabled") == false) {
                    $('#grdData_ilcancel').trigger("click");
                }
            }
            return true;
        },
        reloadAfterSubmit: true,
        onSelectRow: function () {
            var selectedrows = $("#grdData").getSelectedRowsIds();
            if (selectedrows.length == 1) {
                $("#grdData_iledit").removeClass('ui-state-disabled');
                $("#navbar_delete").removeClass('ui-state-disabled');
            }
            if (selectedrows.length == 0) {
                $("#grdData_iledit").addClass('ui-state-disabled');
                $("#navbar_delete").addClass('ui-state-disabled');
                $("#grdData_ilsave").addClass('ui-state-disabled');
                $("#grdData_ilcancel").addClass('ui-state-disabled');
                $("#grdData_iladd").removeClass('ui-state-disabled');
            }
            if (selectedrows.length > 1) {
                $("#navbar_delete").removeClass('ui-state-disabled');
                $("#grdData_iledit").addClass('ui-state-disabled');
            }
        },

        onSelectAll: function () {
            var selectedrows = $("#grdData").getSelectedRowsIds();
            if (selectedrows.length > 0) {
                $("#navbar_delete").removeClass('ui-state-disabled');
            } else {
                $("#navbar_delete").addClass('ui-state-disabled');
            }
        }

    }).navGrid(pPagerName, {
        edit: false,
        add: false,
        del: false,
        search: false,
        refresh: true,
        refreshtext: vrCommonRes['Refresh'],
        beforeRefresh: function () {
            var tableName = $("#grdData").getGridParam('caption').replace(' ' + vrDataRes['tiJsDataList'], '');
            ReloadGrid(tableName);
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
                            oneditfunc: function (val) {
                                var tableNames = $("#grdData").getGridParam('caption').replace(' List', '');
                                var columnNames = $("#grdData").getGridParam('colNames');
                                var colNames = columnNames.toString();
                                var colName = "";

                                for (var i = 0; i < columnNames.length; i++) {
                                    if (columnNames[i] == "Id" && columnNames[i] == primaryKey) {
                                        colName = "Id";
                                    } else {
                                        if (columnNames[i] == tableNames + "Id" && columnNames[i] == primaryKey) {
                                            colName = tableNames + "Id";
                                            break;
                                        }
                                    }
                                }

                                if (!colName) {
                                    if (!primaryKey) {
                                        colName = columnNames[1].toString();
                                    } else {
                                        colName = primaryKey;
                                    }

                                }
                                var sel_id = $("#grdData").getSelectedRowsIds();

                                var cell = jQuery('#' + sel_id + '_' + colName);
                                val = cell.val();
                                pk = val;
                            },
                            successfunc: function (val) {
                                if (val.responseText != "") {
                                    if (val.responseText.indexOf("Error") > -1) {
                                        showAjaxReturnMessage(val.responseText, "w");
                                    } else {
                                        showAjaxReturnMessage(val.responseText, "s");
                                    }
                                    var tableName = $("#grdData").getGridParam('caption').replace(' ' + vrDataRes['tiJsDataList'], '');
                                    ReloadGrid(tableName);
                                    $("#grdData").refreshJqGrid();
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
                                    if (val.responseText != "") {
                                        var tableName = $("#grdData").getGridParam('caption').replace(' ' + vrDataRes['tiJsDataList'], '');
                                        ReloadGrid(tableName);
                                    }
                                }
                            }
                        }


                    }
        );

    gridobject.jqGrid('navButtonAdd', pPagerName, {
        caption: vrCommonRes['Delete'],
        buttonicon: "ui-icon-trash",
        onClickButton: DeleteConfirm,
        id: "navbar_delete",
        position: "last"
    });
    $(".content").find('div.ui-jqgrid-bdiv').css("max-height", $(window).height() - $('.main-header').height() - $('.content-header').height() - $('.main-footer').height() - 18 - 15 - 24 - 55 - 50);
    $("#grdData_iledit").addClass('ui-state-disabled');
    $("#navbar_delete").addClass('ui-state-disabled');

    $("#grdData_iladd").on('click', function () {
        $("#navbar_delete").addClass('ui-state-disabled');
    });

    $("#grdData_ilcancel").on('click', function () {
        var sel_id = $("#grdData").getSelectedRowsIds();
        if (sel_id.length != 0) {
            if (sel_id[0].indexOf("jqg") > -1) {
                $("#grdData_iledit").addClass('ui-state-disabled');
            }
        }
    });
}
jQuery.fn.refreshJqGrid = function () {
    $(this).trigger('reloadGrid');
};
function filterGrid(grid) {
    var postDataValues = grid.jqGrid('getGridParam', 'postData');
    $(".filterItem").each(function (index, item) {
        postDataValues[$(item).attr('id')] = $(item).val();
    });
    grid.jqGrid().setGridParam({ postData: postDataValues, page: 1 }).trigger('reloadGrid');
}