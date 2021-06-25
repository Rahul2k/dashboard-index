
jQuery.fn.gridLoad = function (getUrl, caption, IsCheckbox, IsSortableRow) {
    var gridobject = $(this);
    var pDatabaseGridName = $(this).attr('id');
    $.getJSON(urls.Common.GetGridViewSettings, { pGridName: pDatabaseGridName }, function (data) {
        BindGrid(gridobject, getUrl, $.parseJSON(data), caption, IsCheckbox, IsSortableRow);
    });
};

jQuery.fn.gridLoadTest = function (getUrl, caption, tableName) {
    var gridobject = $(this);
    var pDatabaseGridName = $(this).attr('id');
    $.post(urls.Common.GetGridViewSettings1, { pGridName: tableName })
                .done(function (response) {
                    BindGrid(gridobject, getUrl, $.parseJSON(response), caption)
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
};

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

function BindGrid(gridobject, getUrl, arrColSettings, caption, IsCheckbox, IsSortableRow) {
    if (IsCheckbox == undefined || IsCheckbox == null)
        IsCheckbox = true;
    if (IsSortableRow == undefined || IsSortableRow == null)
        IsSortableRow = false;

    var pDatabaseGridName = gridobject.attr('id');
    var pPagerName = '#' + pDatabaseGridName + '_pager';

    $("#filterButton").click(function (event) {
        event.preventDefault();
        filterGrid(gridobject);
    });

    //var arrColSettings = GetColumnData(pDatabaseGridName);

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
        else if (arrColSettings[i].columnWithCheckbox == 1) {
            arryColSettings.push({ key: false, align: "center", formatter: "checkbox", name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
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
        emptyrecords: 'No records to display',
        //ajaxGridOptions: { contentType: 'application/json; charset=utf-8' },
        //serializeGridData: function (postData) {
        //    return JSON.stringify(postData);
        //},
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
        onSelectRow: function (id, status) {
            if ($(this).attr('id').trim() == "grdReportStyle") {
                var rowData = jQuery("#grdReportStyle").getRowData(id);
                var reportStyle = rowData["Id"];
                if (reportStyle.trim() == "Default") { //&& status == true
                    $('#reportStyleRemove').attr('disabled', 'disabled');
                }
                else {
                    $('#reportStyleRemove').removeAttr('disabled', 'disabled');
                }
            }

        },
        autowidth: true,
        shrinkToFit: true,
        /*width: $('#' + pDatabaseGridName).parent('div').width(),*/
        multiselect: IsCheckbox//,
        //Modified by Hemin
        //}).navGrid(pPagerName, { edit: false, add: false, del: false, search: false, refresh: true, refreshtext: "Refresh" }
    }).navGrid(pPagerName, { edit: false, add: false, del: false, search: false, refresh: true, refreshtext: vrCommonRes['Refresh'] }
    );//.trigger("reloadGrid", [{ current: true, page: 1 }]);

    if (IsSortableRow) {
        gridobject.jqGrid('sortableRows',
            {
                update: function (e, ui) {
                    var ids = gridobject.jqGrid('getDataIDs');
                    $.ajaxSettings.traditional = true;
                    UpdateGridRowSortOrder(ids);
                }
            });
    }

    setTimeout(function () {
        var $grid = gridobject,
        newWidth = $grid.closest(".ui-jqgrid").parent().width();
        $grid.jqGrid("setGridWidth", newWidth, true);
        $(".content").find('div.ui-jqgrid-bdiv').css("max-height", $('.modal-content').height() - $('.modal-header').height() - 400)

    }, 200);

    //gridobject.jqGrid('sortableRows');
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

