
jQuery.fn.gridLoadViews = function (getUrl, caption, IsCheckbox, IsSortableRow) {
    var gridobject = $(this);
    var pDatabaseGridName = $(this).attr('id');


    $.ajax({
        url: urls.Common.GetGridViewSettings,
        type: "GET",
        dataType: 'json',
        async: false,
        data: { pGridName: pDatabaseGridName },
        success: function (data) {
            BindGridViews(gridobject, getUrl, $.parseJSON(data), caption, IsCheckbox, IsSortableRow);
            
        }
    });

    //$.getJSON(urls.Common.GetGridViewSettings, { pGridName: pDatabaseGridName }, function (data) {
    //    BindGridViews(gridobject, getUrl, $.parseJSON(data), caption, IsCheckbox, IsSortableRow);
    //});
};

//jQuery.fn.getSelectedRowsIds = function () {
//    var selectedrows = $(this).jqGrid('getGridParam', 'selarrrow');
//    return selectedrows;
//};

//jQuery.fn.refreshJqGrid = function () {
//    $(this).trigger('reloadGrid');
//};

//jQuery.fn.setGridColumnsOrder = function () {
//    var pDatabaseGridName = $(this).attr('id');
//    $.post(urls.Common.SetGridOrders, { pGridName: pDatabaseGridName })
//                .done(function (response) {
//                    //if (!response.MSGWarnning) {

//                    //}
//                    //showAjaxReturnMessage(response.message, (response.MSGWarnning ? 'w' : 's'));
//                })
//                .fail(function (xhr, status, error) {
//                    //ShowErrorMessge();
//                });
//};

function BindGridViews(gridobject, getUrl, arrColSettings, caption, IsCheckbox, IsSortableRow) {
    
    if (IsCheckbox == undefined || IsCheckbox == null)
        IsCheckbox = true;
    if (IsSortableRow == undefined || IsSortableRow == null)
        IsSortableRow = false;

    var pDatabaseGridName = gridobject.attr('id');
    var pPagerName = '#' + pDatabaseGridName + '_pager';

    $(pPagerName).hide();

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
    
    for (var i = 0; i < arrColSettings.length; i++) {
        arryDisplayCol.push([arrColSettings[i].displayName]);
        globalColumnOrder.push([arrColSettings[i].srno]);
        if (arrColSettings[i].srno == -1) {
            arryColSettings.push({ key: true, hidden: true, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: false });
        }
        else {
            arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: false });
        }
        //if (arrColSettings[i].srno != -1 && sortColumnsName == "") {
        //    sortColumnsName = arrColSettings[i].name;
        //}
    }
    gridobject.jqGrid({
        url: getUrl,
        datatype: 'json',
        mtype: 'Get',
        //data: gridData,
        colNames: arryDisplayCol,
        colModel: arryColSettings,
        pager: jQuery(pPagerName),
        rowNum: '10000',
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
        //width: $('#MainWrapper').width(),
        multiselect: IsCheckbox//,
    }).navGrid(pPagerName, { edit: false, add: false, del: false, search: false, refresh: true, refreshtext: vrCommonRes['Refresh'] }
    );//.trigger("reloadGrid", [{ current: true, page: 1 }]);

    if (IsSortableRow) {
        
        
        gridobject.jqGrid('sortableRows',
            {
                update: function (e, ui) {

                    var ids = gridobject.jqGrid('getDataIDs');
                    $.ajaxSettings.traditional = true;
                    if (pDatabaseGridName == 'grdViewColumns') {
                        var bSaveViews = $("#bSaveViews").val();
                        if (bSaveViews == "false") {
                            showAjaxReturnMessage('You must save view before change order, new order will not effect before save view.', 'w');
                            return;
                        }
                        else
                            UpdateGridRowSortOrder(ids, pDatabaseGridName);

                    }
                    else
                        UpdateGridRowSortOrder(ids,pDatabaseGridName);
                }
            });
    }
    $(".ui-jqgrid-titlebar").hide();
    //gridobject.jqGrid('sortableRows');
    //if (pDatabaseGridName == "grdViewColumns")
    //{
    //    alert(gridobject.getGridParam("reccount"));
    //}
}

function UpdateGridRowSortOrder(ids,vGridName) {
    $.ajax({
        url: urls.Views.UpdateGridSortOrder,
        type: 'post',
        dataType: 'json',
        data: { ids: ids, sGridName: vGridName },
        success: function (data) {
            $('#jqgTopMenu').trigger("reloadGrid")
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("status: " + textStatus + " Error: " + errorThrown);
        }
    });
}

//function filterGrid(grid) {
//    var postDataValues = grid.jqGrid('getGridParam', 'postData');
//    $(".filterItem").each(function (index, item) {
//        postDataValues[$(item).attr('id')] = $(item).val();
//    });
//    grid.jqGrid().setGridParam({ postData: postDataValues, page: 1 }).trigger('reloadGrid');
//}

//function sortResults(arr, prop, asc) {
//    arr = arr.sort(function (a, b) {
//        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
//        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
//    });
//    return arr;
//}

//jQuery.fn.sort = function () {
//    return this.pushStack([].sort.apply(this, arguments), []);
//};

