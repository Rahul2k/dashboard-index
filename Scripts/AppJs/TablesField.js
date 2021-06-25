
$(function () {
    $('#grdTablesField').jqGrid('setLabel', 'Field_Name', 'Field Name', { 'text-align': 'left' });
});

//JQuery Code for Print Function

// Create a jquery plugin that prints the given element.
jQuery.fn.print = function (pTableName) {
    //alert("Table Name: "+pTableName);
    // NOTE: We are trimming the jQuery collection down to the
    // first element in the collection.
    if (this.size() > 1) {
        this.eq(0).print();
        return;
    } else if (!this.size()) {
        return;
    }
    // ASSERT: At this point, we know that the current jQuery
    // collection (as defined by THIS), contains only one
    // printable element.

    // Create a random name for the print frame.
    var strFrameName = ("printer-" + (new Date()).getTime());

    // Create an iFrame with the new name.
    var jFrame = $("<iframe name='" + strFrameName + "'>");

    // Hide the frame (sort of) and attach to the body.
    jFrame
    .css("width", $(document).width())
    .css("height", "0px")
    .css("position", "absolute")
    .css("bottom", "0px")
    .css("left", "0px")
    .appendTo($("body:first"))
    ;

    // Get a FRAMES reference to the new frame.
    var objFrame = window.frames[strFrameName];

    // Get a reference to the DOM in the new frame.
    var objDoc = objFrame.document;

    // Grab all the style tags and copy to the new
    // document so that we capture look and feel of
    // the current document.

    // Create a temp document DIV to hold the style tags.
    // This is the only way I could find to get the style
    // tags into IE.
    var jStyleDiv = $("<div>").append(
    $("style").clone()
    );

    jStyleDiv = $("<div style=' border-radius: 25px;'>").append("<center><p><h2>TAB FusionRMS</b></h2></center>")
                .append("<center><p><u><b>" + String.format(vrTablesRes["tiJsTableFieldFieldListing"], pTableName) + "</b></u></p></center>");

    //alert(this.html());
    //$('.exclude_pager').remove();
    var htmlData = this.html();
    // Write the HTML for the document. In this, we will
    // write out the HTML of the current element.
    objDoc.open();
    objDoc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
    objDoc.write("<html>");
    objDoc.write("<body>");
    objDoc.write("<head>");
    objDoc.write("<title>");
    objDoc.write(document.title);
    objDoc.write("</title>");
    objDoc.write(jStyleDiv.html());
    objDoc.write("</head>");
    objDoc.write(this.html());
    objDoc.write("</body>");
    objDoc.write("</html>");
    objDoc.close();

    $(objDoc).find(".ui-jqgrid-title").remove();
    $(objDoc).find("input:checkbox").remove();
    $(objDoc).find("th").css("text-align", "left");

    // Print the document.    
    objFrame.focus();
    objFrame.print();

    // Have the frame remove itself in about a minute so that
    // we don't build up too many of these frames.

    //Modified by Hemin for Bug Fixes on 11/02/2016
    //setTimeout(
    //function () {
    //    jFrame.remove();
    //},
    //(60 * 1000)
    //);
    jFrame.remove();
}
//End Of Print Function

//Code For File Room Order Grid.
jQuery.fn.gridLoadFields = function (getUrl, caption, tableName) {
    var gridobject = $(this);
    //alert("Table Name in gridLoadFileRoomOrder: "+tableName);

    $.post(urls.Common.GetGridViewSettings, { pGridName: "grdTablesField" })
                .done(function (response) {
                    BindFieldsGrid(gridobject, getUrl, $.parseJSON(response), caption, tableName);
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

function BindFieldsGrid(gridobject, getUrl, arrColSettings, caption, tableName) {
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
    //$("#1").attr("disabled", "disabled");
    for (var i = 0; i < arrColSettings.length; i++) {
        arryDisplayCol.push([arrColSettings[i].displayName]);
        globalColumnOrder.push([arrColSettings[i].srno]);
        if (arrColSettings[i].srno == -1) {
            arryColSettings.push({ key: true, hidden: true, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable, align: 'left' });
        }
        else {
            arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable, align: 'left' });
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
        onSelectRow: function (rowid, status, e) {
            //if(rowid == 1)
            //{
            //    $("#gridEdit").attr("disabled", "disabled");
            //    $("#gridRemove").attr("disabled", "disabled");
            //}
            //else
            //{
            //    $("#gridEdit").removeAttr("disabled", "disabled");
            //    $("#gridRemove").removeAttr("disabled", "disabled");
            //}
        },
        emptyrecords: vrCommonRes["NoRecordsToDisplay"],
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
        multiselect: true//IsCheckbox//,
    }).navGrid(pPagerName, { edit: false, add: false, del: false, search: false, refresh: true, refreshtext: vrCommonRes["Refresh"] }
    );//.trigger("reloadGrid", [{ current: true, page: 1 }]);

    //display select all checkbox in Fields grid
    $('#jqgh_grdTablesField_cb').hide();
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


function LoadFieldsView(TableName) {
    if ($('#LoadTabContent').length == 0) {
        RedirectOnAccordian(urls.TableTracking.LoadTableTab);
        $('#title, #navigation').text(vrCommonRes['mnuTables']);
    }
    $.ajax({
        url: urls.TableFields.LoadFieldsTab,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html'
    }).done(function (result) {
        $('#LoadTabContent').empty();
        $('#LoadTabContent').html(result);

        var Operation = "";

        //$("#grdFileRoomOrder").jqGrid("unload");
        //Modified by Hemin
        //$("#grdTablesField").gridLoadFields(urls.TableFields.LoadFieldData, "Fields", TableName);
        $("#grdTablesField").gridLoadFields(urls.TableFields.LoadFieldData, vrTablesRes["mnuTableTabPartialFields"], TableName);

        $("#gridAdd").off().on('click', function () {
            Operation = "ADD";
            ShowFieldsPopup(TableName, Operation);
        });

        $("#gridEdit").off().on('click', function () {
            Operation = "EDIT";
            ShowFieldsPopup(TableName, Operation);
        });

        $("#gridRemove").off().on('click', function () {
            //urls.TableFields.RemoveFieldFromTable
            var selRowId = $("#grdTablesField").jqGrid('getGridParam', 'selrow');
            var celValue = $("#grdTablesField").jqGrid('getCell', selRowId, 'Field_Name');

            var selectedrows = $("#grdTablesField").getSelectedRowsIds();

            if (selectedrows.length > 1 || selectedrows.length == 0) {
                showAjaxReturnMessage(vrCommonRes["msgSelectOneRowToRemove"], 'w');
                return;
            }
            else {

                if (selRowId == 1) {
                    showAjaxReturnMessage(vrTablesRes["msgJsTableFieldSrryUCantRemvField"], 'w');
                    return;
                }
                else {
                    $.post(urls.TableFields.CheckBeforeRemoveFieldFromTable, $.param({ pTableName: TableName, pFieldName: celValue }, true), function (data) {
                        //bDeleteIndexes
                        //$("#grdTablesField").refreshJqGrid();
                        //showAjaxReturnMessage(data.message, data.errortype);
                        var combinval = TableName + "#" + celValue + "#" + data.bDeleteIndexes;
                        //console.log("Combine value in CheckBeforeRemoveFieldFromTable: "+combinval);
                        if (data.bDeleteIndexes == true) {
                            //show error message here.
                            $(this).confirmModal({
                                confirmTitle: 'TAB FusionRMS',
                                confirmMessage: data.message,
                                confirmOk: vrCommonRes['Ok'],
                                confirmStyle: 'default',
                                confirmOnlyOk: true
                            });
                        }
                        else {
                            //    //Show error msg and show confirmation box also.
                            $(this).confirmModal({
                                confirmTitle: 'TAB FusionRMS',
                                confirmMessage: data.message,
                                confirmOk: vrCommonRes['Yes'],
                                confirmCancel: vrCommonRes['No'],
                                confirmStyle: 'default',
                                //confirmOnlyOk: true,
                                confirmObject: combinval,
                                confirmCallback: DeleteTableField
                            });
                        }
                    });
                }
            }

        });

        $("#gridPrint").on('click', function () {
            $("#gview_grdTablesField").print(TableName);
        });
    })
    .fail(function (xhr, status) {
        ShowErrorMessge();
    });
}

//Delete the Table Field
function DeleteTableField(combinval) {
    var data = [];

    if (combinval != null) {
        data = combinval.split("#");

        $.post(urls.TableFields.RemoveFieldFromTable, $.param({ pTableName: data[0], pFieldName: data[1], pDeleteIndexes: data[2] }, true), function (data) {
            showAjaxReturnMessage(data.message, data.errortype);

            if (data.errortype == "s") {
                $('#mdlAddTablesField').HideModel();
                $("#grdTablesField").refreshJqGrid();
            }
        });
    }
}

function ShowFieldsPopup(TableName, Operation) {

    var vOriginalInternalName = "";
    var vOriginalFieldSize = 0;
    var vOriginalFieldType = 0;
    var selRowId;
    var celValue;

    $("#txtInternalName").SpecialCharactersSpaceNotAllowed();
    $("#txtFieldLength").OnlyNumeric();

    if (Operation == "EDIT") {

        selRowId = $("#grdTablesField").jqGrid('getGridParam', 'selrow');
        celValue = $("#grdTablesField").jqGrid('getCell', selRowId, 'Field Name');

        var selectedrows = $("#grdTablesField").getSelectedRowsIds();

        if (selectedrows.length > 1 || selectedrows.length == 0) {
            showAjaxReturnMessage(vrTablesRes["msgJsTableFieldPlzSelOnlyOneRow"], 'w');
            return;
        }
        else {
            if (selRowId == 1) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableFieldSryUCantEditField"], 'w');
                return;
            }
            else {
                //CheckFieldBeforeEdit
                vOriginalInternalName = $("#grdTablesField").jqGrid('getCell', selRowId, 'Field_Name');
                vOriginalFieldSize = $("#grdTablesField").jqGrid('getCell', selRowId, 'Field_Size');
                vOriginalFieldType = $("#grdTablesField").jqGrid('getCell', selRowId, 'Field_Type');

                $.post(urls.TableFields.CheckFieldBeforeEdit, $.param({ pTableName: TableName, sFieldName: vOriginalInternalName }, true), function (data) {

                    if (data.IndexMsg != "") {
                        $(this).confirmModal({
                            confirmTitle: 'TAB FusionRMS',
                            confirmMessage: data.IndexMsg,
                            confirmOk: vrCommonRes['Ok'],
                            confirmStyle: 'default',
                            confirmOnlyOk: true
                        });
                    }
                    else {
                        if (data.Message != "")
                            $("#txtInternalName").attr("disabled", "disabled");
                        else
                            $("#txtInternalName").removeAttr("disabled", "disabled");

                        $('#mdlAddTablesField').ShowModel();
                        LoadFieldTypes(TableName);

                        $("#txtInternalName").val("");
                        $("#txtFieldLength").val("");

                        $('#lblTableName').text(String.format(vrTablesRes["lblJsTableFieldModify"], vOriginalInternalName, TableName));

                        $("#txtInternalName").val(vOriginalInternalName);
                        if (vOriginalFieldType == "Binary")
                            $("#lstFieldTypes").val("3").change();
                        else
                            $("#lstFieldTypes option:contains(" + vOriginalFieldType + ")").attr('selected', 'selected').change();

                        $("#txtFieldLength").val(vOriginalFieldSize);
                    }
                });
            }
        }
    }
    else {
        $('#mdlAddTablesField').ShowModel();

        //New Added on date - May 29th 2015 - Reported by Dhaval.
        $("#txtInternalName").removeAttr("disabled", "disabled");
        $("#txtInternalName").val("");
        $("#txtFieldLength").val("");

        LoadFieldTypes(TableName);

        $('#lblTableName').text(String.format(vrTablesRes["lblJsTableFieldCreateNewFieldIn"], TableName));
    }

    $("#lstFieldTypes").on('change', function () {
        var selectedVal = $("#lstFieldTypes").val();
        //console.log("selectedVal: " + selectedVal);

        switch (selectedVal) {
            case "2":
                $("#txtFieldLength").val("10");// Bug FUS-6072: Fixed by Nikunj.
                $("#txtFieldLength").removeAttr("disabled", "disabled");
                break;
            case "0":
                $("#txtFieldLength").attr("disabled", "disabled");
                $("#txtFieldLength").val("4");
                break;
            case "3":
                $("#txtFieldLength").attr("disabled", "disabled");
                $("#txtFieldLength").val("2");
                break;
            case "4":
                $("#txtFieldLength").attr("disabled", "disabled");
                $("#txtFieldLength").val("1");
                break;
            case "5":
                $("#txtFieldLength").attr("disabled", "disabled");
                $("#txtFieldLength").val("8");
                break;
            case "6":
                $("#txtFieldLength").attr("disabled", "disabled");
                $("#txtFieldLength").val("8");
                break;
            case "7":
                $("#txtFieldLength").attr("disabled", "disabled");
                $("#txtFieldLength").val("N/A");
                break;
            case "8":
                $("#txtFieldLength").attr("disabled", "disabled");
                $("#txtFieldLength").val("4");
                break;
            default:
                break;
        }
    });

    $("#btnOk").off().on('click', function () {
        var vNewInternalName = $("#txtInternalName").val();
        var vFieldType = $("#lstFieldTypes").val();
        var vFieldSize = $("#txtFieldLength").val();

        vOriginalFieldType = $("#grdTablesField").jqGrid('getCell', selRowId, 'Field_Type');
        vOriginalFieldType = $("#lstFieldTypes option:contains(" + vOriginalFieldType + ")").val();

        if (vOriginalFieldType === undefined) {
            vOriginalFieldType = "0";
        }
        var combinval = Operation + "#" + TableName + "#" + vNewInternalName + "#" + vOriginalInternalName + "#" + vFieldType + "#" + vOriginalFieldType + "#" + vFieldSize + "#" + vOriginalFieldSize;

        if ($("#txtInternalName").val() == "") {
            showAjaxReturnMessage(vrTablesRes["msgJsTableFieldIntNameReq"], 'w');
            return;
        }
        if ($("#txtFieldLength").val() == "") {
            showAjaxReturnMessage(vrTablesRes["msgJsTableFieldFieldLenCanNotEmpty"], 'w');
            return;
        }
        if ($("#txtFieldLength").val() < 1 || $("#txtFieldLength").val() > 8000) {
            showAjaxReturnMessage(vrTablesRes["msgJsTableFieldFieldSizeBet1To8000"], 'w');
            return;
        }
        if (Operation == "EDIT") {
            if ((parseInt(vFieldType) != 7) && ((parseInt(vOriginalFieldSize) > parseInt(vFieldSize)) || (parseInt(vOriginalFieldType) != parseInt(vFieldType)))) {
                var sMessage =String.format(vrTablesRes['msgJsTableFieldUChoseChangeTypeOrDecSize'] , vNewInternalName);

                $(this).confirmModal({
                    confirmTitle: 'TAB FusionRMS',
                    confirmMessage: sMessage,
                    confirmOk: vrCommonRes['Yes'],
                    confirmCancel: vrCommonRes['No'],
                    confirmStyle: 'default',
                    //confirmOnlyOk: true,
                    confirmObject: combinval,
                    confirmCallback: AddEditTablesField
                });
            }
            else if (parseInt(vOriginalFieldType) == 6 && vFieldType == 7) {
                //Added on 11/01/2016.
                if(vFieldType !=2)
                {
                    var msgtoshow = String.format(vrTablesRes['msgJsTableFieldCantUpdateThe'] , TableName );

                    $(this).confirmModal({
                        confirmTitle: 'TAB FusionRMS',
                        confirmMessage: msgtoshow,
                        confirmOk: vrCommonRes['Ok'],
                        confirmStyle: 'default',
                        confirmOnlyOk: true
                    });
                }
            }
            else {
                AddEditTablesField(combinval);
            }
        }
        else {
            AddEditTablesField(combinval);
        }

    });
}

function AddEditTablesField(combinval) {
    var data = [];

    var Operation = "";
    var TableName = "";
    var vNewInternalName = "";
    var vOriginalInternalName = "";
    var vFieldType = "";
    var vOriginalFieldType = "";
    var vFieldSize = "";
    var vOriginalFieldSize = "";

    if (combinval != null) {
        data = combinval.split("#");
        Operation = data[0];
        TableName = data[1];
        vNewInternalName = data[2];
        vOriginalInternalName = data[3];
        vFieldType = data[4];
        vOriginalFieldType = data[5];
        vFieldSize = data[6];
        vOriginalFieldSize = data[7];
    }

    $.post(urls.TableFields.AddEditField, $.param({ pOperationName: Operation, pTableName: TableName, pNewInternalName: vNewInternalName, pOriginalInternalName: vOriginalInternalName, pFieldType: vFieldType, pOriginalFieldType: vOriginalFieldType, pFieldSize: vFieldSize, pOriginalFieldSize: vOriginalFieldSize }, true), function (data) {

        showAjaxReturnMessage(data.message, data.errortype);

        if (data.errortype == 's') {
            $('#mdlAddTablesField').HideModel();
            $("#grdTablesField").refreshJqGrid();
        }
    });

}

//Load list of FieldTypes
function LoadFieldTypes(TableName) {
    $.ajax({
        url: urls.TableFields.GetFieldTypeList,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({ pTableName: TableName }),
        contentType: 'application/json; charset=utf-8',
        async: false,
        processData: false,
        cache: false,
        success: function (data) {
            //console.log("Data: " + $.parseJSON(data.lstFieldTypesJson));
            var fieldTypesJSONList = $.parseJSON(data.lstFieldTypesJson);
            if (data.errortype == "s") {
                $("#lstFieldTypes").empty();

                $(fieldTypesJSONList).each(function (i, item) {
                    $("#lstFieldTypes").append("<option value=" + item.Key + ">" + item.Value + "</option>");
                });
                $("#lstFieldTypes option[value='1']").remove();
                $("#lstFieldTypes option:contains('Text')").attr('selected', 'selected').change();
                $("#txtFieldLength").val("10");// Bug: Fixed reported by Dhaval 29 May 2015.
            }
        },
        error: function (xhr, status, error) {
            //console.log("Error: " + error);
            ShowErrorMessge();
        }
    });
}