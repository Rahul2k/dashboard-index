$(function () {   
    $('#divVolumesGrid').hide();
    $('#divVolumesButtons').hide();
    $('#divDriveGrid').show();
    $('#divDriveButtons').show();
    $("#grdDrive").gridLoad(urls.BackgroundStatus.GetBackgroundStatusList, "Background Status");
    
    //Populate volume gridview based on drive selection 
    $("#gridUpDown").on('click', function (e) {
        if ($(this).val() != vrDirectoriesRes['btnJsDirectoriesUp1Lvl']) {
            var selectedrows = $("#grdDrive").getSelectedRowsIds();
            if (selectedrows.length > 1 || selectedrows.length == 0) {
                showAjaxReturnMessage(vrDirectoriesRes["msgJsDirectoriesSelect1Row"], 'w');
                return;
            }
            var myGrid = $("#grdDrive"),
            selRowId = myGrid.jqGrid('getGridParam', 'selrow'),
            celValue = myGrid.jqGrid('getCell', selRowId, 'DeviceName');
            if (celValue != undefined && celValue != "")
            {
                $('#navigation').text('\''+vrDirectoriesRes['mnuJsDirectoriestxt']+'\'');
                $('#navigation').closest('ol').append('<li class="active custome">' + celValue + '</li>');
            }

            $('#SystemAddressesId1').val(selectedrows);
            $('#divVolumesGrid').show();
            $('#divVolumesButtons').show();
            $('#divDriveGrid').hide();
            $('#divDriveButtons').hide();
            $(this).val(vrDirectoriesRes['btnJsDirectoriesUp1Lvl']);
            $("#grdVolumes").jqGrid('GridUnload');
            $("#grdVolumes").gridLoad(urls.Directories.GetVolumesList + "?pId=" + selectedrows, vrDirectoriesRes['tiJsDirectoriesValumnsList']);
        }
        else {
            $('#divVolumesGrid').hide();
            $('#divVolumesButtons').hide();
            $('#divDriveGrid').show();
            $('#divDriveButtons').show();
            $('#SystemAddressesId1').val(0);
            $('#navigation').text('\'' + vrDirectoriesRes['mnuJsDirectoriestxt'] + '\'');
            $('#navigation').closest('ol').find('.custome').remove();
            $(this).val(vrDirectoriesRes['btnDirectoriesPartialDown1Lvl']);
        }
    });
       
    jQuery.validator.addMethod('atleaseOneAlpha', function (value, element) { 
        return this.optional(element) || (value.match(/[a-zA-Z]/));
    });
});


jQuery.fn.gridLoad = function (getUrl, caption, IsCheckbox, IsSortableRow) {
    var grdHeaderUserName = vrDirectoriesRes['grdHeaderUserName'];
    var grdHeaderCreateDate = vrDirectoriesRes['grdHeaderCreateDate'];
    var grdHeaderStartDate = vrDirectoriesRes['grdHeaderStartDate'];
    var grdHeaderEndDate = vrDirectoriesRes['grdHeaderEndDate'];
    var grdHeaderOperation = vrDirectoriesRes['grdHeaderOperation'];
    var grdHeaderRecordCount = vrDirectoriesRes['grdHeaderRecordCount'];
    var grdHeaderStatus = vrDirectoriesRes['grdHeaderStatus'];
    caption = vrDirectoriesRes['lblMSGExportBackgroundStatus'];
    var gridobject = $(this);
    var pDatabaseGridName = $(this).attr('id');
    var columnNames = [
        {
            "$id": "1",
            "srno": -1,
            "name": "Id",
            "sortable": true,
            "columnWithCheckbox": false,
            "displayName": "Id"
        },
        {
            "$id": "2",
            "srno": 0,
            "name": "CreateDate",
            "sortable": true,
            "columnWithCheckbox": false,
            "displayName": grdHeaderCreateDate
        },
        {
            "$id": "3",
            "srno": 1,
            "name": "StartDate",
            "sortable": true,
            "columnWithCheckbox": false,
            "displayName": grdHeaderStartDate
        },
        {
            "$id": "4",
            "srno": 2,
            "name": "EndDate",
            "sortable": true,
            "columnWithCheckbox": false,
            "displayName": grdHeaderEndDate//"End Date"
        },
    {
        "$id": "5",
        "srno": 3,
        "name": "Type",
        "sortable": true,
        "columnWithCheckbox": false,
        "displayName": grdHeaderOperation//"Operation"
    },
    {
        "$id": "6",
        "srno": 4,
        "name": "RecordCount",
        "sortable": false,
        "columnWithCheckbox": false,
        "displayName": grdHeaderRecordCount//"Record Count"
    },
    {
        "$id": "7",
        "srno": 5,
        "name": "UserName",
        "sortable": true,
        "columnWithCheckbox": false,
        "displayName": grdHeaderUserName//"User Name"
    },
    {
        "$id": "8",
        "srno": 6,
        "name": "Status",
        "sortable": true,
        "columnWithCheckbox": false,
        "displayName": grdHeaderStatus//"Status"
    },
    {
        "$id": "9",
        "srno": 7,
        "name": "ReportLocation",
        "sortable": false,
        "columnWithCheckbox": false,
        "displayName": '<i class="fa fa-eye" aria-hidden="true"></i>'
    },
    {
        "$id": "10",
        "srno": 8,
        "name": "DownloadLocation",
        "sortable": false,
        "columnWithCheckbox": false,
        "displayName": '<i class="fa fa-download" aria-hidden="true"></i>'
    }
    ]
    BindGrid(gridobject, getUrl, columnNames, caption, IsCheckbox, IsSortableRow);
};

jQuery.fn.getSelectedRowsIds = function () {
    var selectedrows = $(this).jqGrid('getGridParam', 'selarrrow');
    return selectedrows;
};

jQuery.fn.refreshJqGrid = function () {
    $(this).trigger('reloadGrid');
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

        else if (arrColSettings[i].name == 'DownloadLocation' || arrColSettings[i].name == 'ReportLocation') {
            arryColSettings.push({ key: false, align: "center", name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable, width: 50, resizable: false, fixed: true });
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
        rowList: [20, 40, 60, 80, 100],
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
        //sortable: {
        //    update: function (relativeColumnOrder) {
        //        var grid = gridobject;
        //        var currentColModel = grid.getGridParam('colModel');
        //        $.ajax({
        //            url: urls.Common.ArrangeGridOrder,
        //            type: 'POST',
        //            data: JSON.stringify(currentColModel),
        //            contentType: 'application/json; charset=utf-8',
        //            success: function (response) {

        //            },
        //            error: function (xhr, status, error) {
        //            }
        //        });
        //    }
        //},
        sortorder: "desc",
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
        shrinkToFit: true//,
        //width: $('#' + pDatabaseGridName).parent('div').width(),
        //multiselect: IsCheckbox//,
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
        $(".content").find('div.ui-jqgrid-bdiv').css("max-height", $('.modal-content').height() - $('.modal-header').height() - 400);

        $('.ui-jqgrid-htable').find('th').slice(0, 3).css('text-align', 'left');
        $('.ui-jqgrid-htable').find('th').slice(0, 4).css('text-align', 'left');
        $('.ui-jqgrid-htable').find('th').slice(0, 6).css('text-align', 'left');
    }, 200);
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



