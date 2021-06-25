//Code For File Room Order Grid.
jQuery.fn.gridLoadFileRoomOrder = function (getUrl, caption, tableName) {
    var gridobject = $(this);
    //alert("Table Name in gridLoadFileRoomOrder: "+tableName);    
    $.post(urls.Common.GetGridViewSettings, { pGridName: "grdFileRoomOrder" })
                .done(function (response) {
                    BindFileRoomOrderGrid(gridobject, getUrl, $.parseJSON(response), caption, tableName);
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
}

jQuery.fn.getSelectedRowsIds = function () {
    var selectedrows = $(this).jqGrid('getGridParam', 'selarrrow');
    return selectedrows;
};

jQuery.fn.refreshJqGrid = function () {
    $(this).trigger('reloadGrid');
};

jQuery.fn.setGridColumnsOrder = function () {
    var pDatabaseGridName = $(this).attr('id');
    $.post(urls.Common.SetGridOrders, { pGridName: pDatabaseGridName })
                .done(function (response) {
                    //if (!response.MSGWarnning) {

                    //}
                    //showAjaxReturnMessage(response.message, (response.MSGWarnning ? 'w' : 's'));
                })
                .fail(function (xhr, status, error) {
                    //ShowErrorMessge();
                });
};

function BindFileRoomOrderGrid(gridobject, getUrl, arrColSettings, caption, tableName) {    
    //var IsCheckbox = true;
    var pDatabaseGridName = gridobject.attr('id');
    var pPagerName = '#' + pDatabaseGridName + '_pager';

    $("#filterButton").click(function (event) {
        event.preventDefault();
        filterGrid(gridobject);
    });

    var arryDisplayCol = [];
    var arryColSettings = [];
    var globalColumnOrder = [];

    arrColSettings.sort(function (a, b) {
        if (a.srno < b.srno) return -1;
        if (b.srno < a.srno) return 1;
        return 0;
    });
    var sortColumnsName = '';

    for (var i = 0; i < arrColSettings.length; i++) {        
        arryDisplayCol.push([arrColSettings[i].displayName]);
        globalColumnOrder.push([arrColSettings[i].srno]);
        if (arrColSettings[i].srno == -1) {
            arryColSettings.push({ key: true, hidden: true, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
        }
        else if (arrColSettings[i].name == "StartFromFront")
        {            
            arryColSettings.push({ key: false, align: "center", formatter: "checkbox", editable: false, edittype: 'checkbox', editoptions: { value: "1:0" }, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
        }
        else {
            arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
        }
        if (arrColSettings[i].srno != -1 && sortColumnsName == "") {
            sortColumnsName = arrColSettings[i].name;
        }
    }
    
    gridobject.jqGrid({
        url: getUrl,
        datatype: 'json',
        mtype: 'Get',
        //data: gridData,
        postData: { pTableName: tableName },
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
        emptyrecords: vrCommonRes["NoRecordsToDisplay"],
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
        sortname: sortColumnsName,
        autowidth: true,
        shrinkToFit: true,
        //width: $('#MainWrapper').width(),
        multiselect: true//IsCheckbox//,
    }).navGrid(pPagerName, { edit: false, add: false, del: false, search: false, refresh: true, refreshtext: vrCommonRes["Refresh"] }
    );//.trigger("reloadGrid", [{ current: true, page: 1 }]);

    //hide Select all checkbox in 'File Room Order' grid
    $('#jqgh_grdFileRoomOrder_cb').hide();
}

function filterGrid(grid) {
    var postDataValues = grid.jqGrid('getGridParam', 'postData');
    $(".filterItem").each(function (index, item) {
        postDataValues[$(item).attr('id')] = $(item).val();
    });
    grid.jqGrid().setGridParam({ postData: postDataValues, page: 1 }).trigger('reloadGrid');
}

function sortResults(arr, prop, asc) {
    arr = arr.sort(function (a, b) {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    return arr;
}

jQuery.fn.sort = function () {
    return this.pushStack([].sort.apply(this, arguments), []);
};

//End Grid Code.

function LoadFileRoomOrderView(TableName) {
    if ($('#LoadTabContent').length == 0) {
        RedirectOnAccordian(urls.TableTracking.LoadTableTab);
        $('#title, #navigation').text(vrCommonRes['mnuTables']);
    }
    $.ajax({
        url: urls.TableFileRoomOrder.LoadTablesFileRoomOrderView,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html'
    }).done(function (result) {
        $('#LoadTabContent').empty();
        $('#LoadTabContent').html(result);

        //$("#grdFileRoomOrder").jqGrid("unload");
        $("#grdFileRoomOrder").gridLoadFileRoomOrder(urls.TableFileRoomOrder.GetListOfFileRoomOrders, vrTablesRes["mnuTableTabPartialFileRoomOrder"], TableName);

        $("#gridAdd").off().on('click', function () {
            $("#myModalLabel").empty();
            $('#myModalLabel').append(String.format(vrTablesRes["tiTableFileRoomOrderFileRoomOrdrAddLn"]));
            ShowFileRoomOrderPopup(TableName);
        });

        $("#gridEdit").off().on('click', function () {
            $("#myModalLabel").empty();
            $('#myModalLabel').append(String.format(vrTablesRes["tiTableFileRoomOrderFileRoomOrdrEditLn"]));
            var OperationFlag = "EDIT";

            var selRowId = $("#grdFileRoomOrder").jqGrid('getGridParam', 'selrow');
            var celValue = $("#grdFileRoomOrder").jqGrid('getCell', selRowId, 'Id');

            var selectedrows = $("#grdFileRoomOrder").getSelectedRowsIds();

            if (selectedrows.length > 1 || selectedrows.length == 0) {
                showAjaxReturnMessage(vrCommonRes["PlzSelOnlyOneRow"], 'w');
                return;
            }
            else {

                $.post(urls.TableFileRoomOrder.EditFileRoomOrderRecord, $.param({ pRowSelected: selectedrows, pRecordId: celValue }, true), function (data) {
                    if (data) {
                        var result = $.parseJSON(data);
                        ShowFileRoomOrderPopup(TableName, OperationFlag, result);
                    }
                });
            }
        });

        $("#gridRemove").off().on('click', function () {
            var selRows = $('#grdFileRoomOrder').getSelectedRowsIds();
            if (selRows.length > 1 || selRows.length == 0)
            {
                showAjaxReturnMessage(vrCommonRes["PlzSelOnlyOneRow"], 'w');
                return;
            }
            $(this).confirmModal({
                confirmTitle: 'TAB FusionRMS',
                confirmMessage: vrTablesRes['msgFileRoomOrderTabRecDelete'],
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmCallback: delFileRoomOrder
            });
        });
    })
    .fail(function (xhr, status) {
        ShowErrorMessge();
    });
}
function delFileRoomOrder() {
    var selRowId = $("#grdFileRoomOrder").jqGrid('getGridParam', 'selrow');
    var celValue = $("#grdFileRoomOrder").jqGrid('getCell', selRowId, 'Id');

    var selectedrows = $("#grdFileRoomOrder").getSelectedRowsIds();

    if (selectedrows.length > 1 || selectedrows.length == 0) {
        showAjaxReturnMessage(vrCommonRes["PlzSelOnlyOneRow"], 'w');
        return;
    }
    else {
        $.post(urls.TableFileRoomOrder.RemoveFileRoomOrderRecord, $.param({ pRowSelected: selectedrows, pRecordId: celValue }, true), function (data) {
            $("#grdFileRoomOrder").refreshJqGrid();
            showAjaxReturnMessage(data.message, data.errortype);
        });
    }
}
function ShowFileRoomOrderPopup(TableName, OperationFlag, result)
{    
    $('#frmTableFileRoomOrder').resetControls();
    $('#mdlFileRoomOrder').ShowModel();

    $("#btnSave").off().on('click', function () {
        saveFileRoomOrderRecord(TableName);
    });

    //ForceNumericOnly
    $("#txtStartingPosition").OnlyNumeric();
    $("#txtNumOfChars").OnlyNumeric();

    $.getJSON(urls.TableFileRoomOrder.GetListOfFieldNames, $.param({ pTableName: TableName }, true), function (data) {

        var lstFieldNameObject = $.parseJSON(data.lstFieldNames);

        $('#lstFields').empty();
        $("#chkStartFromEnd").prop("checked", true);
        $(lstFieldNameObject).each(function (i, v) {
            $('#lstFields').append($("<option>", { value: lstFieldNameObject[i].substr(0, lstFieldNameObject[i].indexOf('(')).trim(), html: lstFieldNameObject[i] }));
        });

        $("#lstFields").off().on('change', function () {            
            EnableDisableStartFromEndChk();
        });

        if (OperationFlag == "EDIT") {
                $("#Id").val(result.Id);                
                $("#lstFields").val(result.FieldName);
                EnableDisableStartFromEndChk();
                $("#chkStartFromEnd").prop("checked", result.StartFromFront);
                $("#txtStartingPosition").val(result.StartingPosition);
                $("#txtNumOfChars").val(result.NumberofCharacters);
        }
       else
            EnableDisableStartFromEndChk();
    });
}

function saveFileRoomOrderRecord(vTableName)
{
    var $form = $('#frmTableFileRoomOrder');    
    $('#chkStartFromEnd').removeAttr('disabled');
    var serializedForm = $form.serialize() + "&pStartFromFront=" + $("#chkStartFromEnd").is(':checked');
    $.post(urls.TableFileRoomOrder.SetFileRoomOrderRecord + "?pTableName=" + vTableName, serializedForm)
            .done(function (response) {
                showAjaxReturnMessage(response.message, response.errortype);
                
                if (response.errortype == 's') {
                    $('#mdlFileRoomOrder').HideModel();
                    $("#grdFileRoomOrder").refreshJqGrid();                    
                }
            })
            .fail(function (xhr, status, error) {
                //console.log(error);
                ShowErrorMessge();
            });    
}

function EnableDisableStartFromEndChk()
{
    //console.log("EnableDisableStartFromEndChk and sel text: " + $("#lstFields :selected").text());
    if ($("#lstFields :selected").text().search("(Numeric: padded with leading zeros)") != -1)
        $("#chkStartFromEnd").attr("disabled", "disabled");
    else
        $("#chkStartFromEnd").removeAttr("disabled", "disabled");
}