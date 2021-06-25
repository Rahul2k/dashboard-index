$(function () {    
    if ($("#lstTABQUIKList").length > 0)        
        GetOnestripJobList();
});

$("#btnAdd").on('click', function () {
    $("#hdnButtonClicked").val("Add");
    OpenFileDialog();
});

$('#FileInputForLabel').on('change', function () {
    var uploadedFile = document.getElementById('FileInputForLabel').files[0];
    var proceedToLoadScreen2 = false;
    var allowEdit = true;
    var JobName = "";

    var selectedJobName = $("#lstTABQUIKList option:selected").text();
    var uploadedFileName = uploadedFile.name.split('.')[0];
    var uploadFileExtention = uploadedFile.name.split('.')[1];
    var btnClicked = $("#hdnButtonClicked").val();
    
    if (uploadFileExtention.toUpperCase() == "FLD" && (selectedJobName != uploadedFileName) && btnClicked !="Add") { allowEdit = false; }

    //Check if file selected is FLD then proceed.
    if ((uploadFileExtention.toUpperCase() == "FLD") && allowEdit) {
        var data = new FormData();
        data.append(uploadedFile.name, uploadedFile);
        data.append("sOperation", $("#hdnButtonClicked").val());

        $.ajax({
            url: urls.TABQUIK.UploadColorLabelFiles,
            type: "POST",
            data: data,
            async: false,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.errortype == "s") {
                    proceedToLoadScreen2 = true;
                    JobName = uploadedFile.name.split('.')[0];
                }
                else if (response.errortype == "w") {
                    proceedToLoadScreen2 = false;
                    showAjaxReturnMessage(response.message, response.errortype);
                }
                else if (response.errortype == "e") {
                    proceedToLoadScreen2 = false;
                    showAjaxReturnMessage(response.message, response.errortype);
                }
            }
        });
    }
    else {
        proceedToLoadScreen2 = false;
        if (!allowEdit) {
            showAjaxReturnMessage(vrClientsRes['msgSelectFile'] + ": " + selectedJobName + ".fld", "w");            
        } else {
            showAjaxReturnMessage(vrApplicationRes['msgJsSelectFLDFile'], "w");
        }
    }

    if (proceedToLoadScreen2) {
        LoadTABQUIKFieldMappingPartial(JobName, $("#hdnButtonClicked").val());
    }
});

$("#btnEdit").on('click', function () {
    $("#hdnButtonClicked").val("Edit");
    var selectedOptionText = $("#lstTABQUIKList option:selected").text();
    if (selectedOptionText == "" || selectedOptionText === null || selectedOptionText === undefined) {
        showAjaxReturnMessage(vrApplicationRes['msgJEditTabquikFieldMapping'], "w");
        return false;
    }
    var fldDataExists = checkFLDDataExistsForJob(selectedOptionText);

    if (fldDataExists){
        LoadTABQUIKFieldMappingPartial(selectedOptionText, "Edit");
    }
    else {
        OpenFileDialog();
    }
});

$("#btnDelete").on('click', function () {
    $("#hdnButtonClicked").val("Delete");
    var selectedOptionValue = $("#lstTABQUIKList option:selected").val();
    if (selectedOptionValue === null || selectedOptionValue === undefined) {
        showAjaxReturnMessage(vrApplicationRes['msgJDeleteTabquikFieldMapping'], "w");
        return false;
    }
    if (selectedOptionValue != null) {
        $.ajax({
            url: urls.TABQUIK.RemoveSelectedJob,
            type: "POST",
            data: { pTabquikJobId: selectedOptionValue },
            async: false,
            success: function (data) {
                if (data.errortype == "s") {
                    GetOnestripJobList();
                }
                else if (data.errortype == "e") {

                }
            }
        });
    }
});

$("#btnAutoFill").on('click', function () {
    $(this).confirmModal({
        confirmTitle: 'TAB FusionRMS',
        confirmMessage: vrApplicationRes['msgTABQUIKMappingAutoFill'],
        confirmOk: vrCommonRes['Yes'],
        confirmCancel: vrCommonRes['No'],
        confirmStyle: 'default',
        confirmCallback: ProcessAutoFillMapping
    });
});

function checkFLDDataExistsForJob(sJobName) {
    var fldDataExists = false;

    $.ajax({
        url: urls.TABQUIK.IsFLDNamesExists,
        type: "POST",
        data: { jobName: sJobName },
        async: false,
        success: function (data) {
            if (data.errortype == "s") {
                if (data.fldNamesExists) fldDataExists = true;

            }
            else if (data.errortype == "e") {

            }
        }
    });

    return fldDataExists;
}

var SQLQuery = "";
function FormTABQUIKSQLQuery(sTABQUIKFieldsData){
    var selectedTable = $("#ddlTableList option:selected").val();
    
    var postData = {        
        pTableName: selectedTable,
        dtTABQUIKData: sTABQUIKFieldsData
    };

    $.ajax({
        url: urls.TABQUIK.FormTABQUIKSelectSQLStatement,
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(postData),
        async: false
    }).done(function (response) {
        if (response.errortype == "s") {
            SQLQuery = response.SQLStatement;            
        }
        else if (response.errortype == "e") {
            showAjaxReturnMessage(response.message, response.errortype);
        }
    }).fail(function (xhr, status) {
        ShowErrorMessge();
    });
}

function IsValidSQLStatement(sSQLStatement, isSelectStatement){
    var selectedTable = $("#ddlTableList option:selected").val();
    var isValid = true;
    var postData = {
        SQLStatement: sSQLStatement,
        sTableName: selectedTable, 
        IsSelectStatement: isSelectStatement 
    };

    $.ajax({
        url: urls.TABQUIK.ValidateTABQUIKSQLStatments,
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(postData),
        async: false
    }).done(function (response) {
        if (response.errortype == "s"){
            isValid = true;
        }
        else {
            isValid = false
            showAjaxReturnMessage(response.message, response.errortype);
        }
    }).fail(function (xhr, status) {
        ShowErrorMessge();
    });

    return isValid;
}


function GetTABQUIKGridDataIntoJson(){
    //Form JSON object to send all field mappings    
    var sData = "["
    var rows = jQuery("#grdTABQUIK").getDataIDs();
    for (var index = 0; index < rows.length; index++) {
        row = jQuery("#grdTABQUIK").getRowData(rows[index]);
        
        if (rows.length != (index + 1))
            sData += "{ \"TABQUIKField\": \"" + row.TABQUIKField + "\", \"TABFusionRMSField\": \"" + row.TABFusionRMSField + "\", \"Manual\": \"" + row.Manual + "\", \"Format\": \"" + row.Format + "\"},";
        else
            sData += "{ \"TABQUIKField\": \"" + row.TABQUIKField + "\", \"TABFusionRMSField\": \"" + row.TABFusionRMSField + "\", \"Manual\": \"" + row.Manual + "\", \"Format\": \"" + row.Format + "\"}";
    }
    sData += "]"
    
    return sData;
}

var isFieldMappingCorrect = true;

$("#btnTABQUIKApply").on('click', function () {        
    //Save and restore last edited row
    var rowKey = jQuery("#grdTABQUIK").jqGrid('getGridParam', "selrow");
    jQuery("#grdTABQUIK").jqGrid('saveRow', rowKey);
    jQuery("#grdTABQUIK").jqGrid('restoreRow', rowKey);
    
    //Get JSON object of field mappings
    var strTABQUIKData = "";

    if (isFieldMappingCorrect) {
        strTABQUIKData = GetTABQUIKGridDataIntoJson();            
        FormTABQUIKSQLQuery(strTABQUIKData);
    }

    var sSELECTStmt = SQLQuery;
    var sUpdateStmt = $("#txtUpdateQuery").val();
    var isSELECTStmtValid = true;
    var isUPDATEStmtValid = true;
    var selectedTable = $("#ddlTableList option:selected").val();

    //Validate the SQL statements first    
    if (sSELECTStmt != "") {
        isSELECTStmtValid = IsValidSQLStatement(sSELECTStmt, true);
    }

    if (sUpdateStmt != "") {
        isUPDATEStmtValid = IsValidSQLStatement(sUpdateStmt, false);
    }
    
    if (isSELECTStmtValid && isUPDATEStmtValid && isFieldMappingCorrect) {
        var postData = {
            sOperation: $("#hdnOperation").val(),
            JobName: $("#hdnJobName").val(),
            TableName: selectedTable,
            SQLSelectString:sSELECTStmt,
            SQLUpdateString: sUpdateStmt,
            dtTABQUIKData: strTABQUIKData
        };

        //Process to SAVE data
        $.ajax({
            url: urls.TABQUIK.SaveTABQUIKFields,
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(postData),
            async: false
        }).done(function (response) {
            showAjaxReturnMessage(response.message, response.errortype);
            $("#hdnOperation").val("Add");
            LoadTABQUIKJobsList();
        }).fail(function (xhr, status) {            
            ShowErrorMessge();
        });
    }
});

function OpenFileDialog() {
    $("#FileInputForLabel").click();
}

jQuery.fn.gridTABQUIK = function (getUrl, caption) {
    var gridobject = $(this);
    BindTABQUIKGrid(gridobject, getUrl, caption);
};
var tableFields;
var GetTableFields = function () {    
    return tableFields;
};

function BindTABQUIKGrid(gridobject, getUrl, caption) {
    var pDatabaseGridName = gridobject.attr('id');
    var pPagerName = '#' + pDatabaseGridName + '_pager';
    var lastSelectedCell;
    
    var myData = {
        tableName: function () {
            var tableNames = $("#grdTABQUIK").getGridParam('caption');
            return tableNames;
        }
    };
    gridobject.jqGrid({
        url: getUrl + "?sTableName=" + $("#ddlTableList option:selected").val() + "&sOperation=" + $("#hdnOperation").val() + "&sJobName=" + $("#hdnJobName").val(),
        datatype: 'json',
        mtype: 'Get',
        colModel: [
            {
                key: false, name: 'TABQUIKField', index: 'TABQUIKField', label: 'TABQUIK Field', resizable: false, search: false, width: 15, sortable: false
            },
                 {
                     name: 'TABFusionRMSField', label: "TAB FusionRMS Field", resizable: false, search: false, width: 15, sortable: false, editable: true,
                     editrules: { required: true }, formatter: 'select', edittype: 'select',
                     editoptions: {
                         value: GetTableFields(),
                         dataEvents: [
                                      {
                                          type: 'change',
                                          fn: function (e) {                                          
                                          }
                                      }
                         ]
                     }, title: false, index: 'TABFusionRMSField'
                 },
                {
                    name: 'Manual', id: 'Manual', label: "Manual", index: 'Manual', width: 15, editable: true, editrules: { required: false }, editoptions: {
                    }
                },
                {
                    name: 'Format', id: 'Format', label: "Format", index: 'Format', width: 15, editable: true, editrules: { required: false }, editoptions: {
                    }
                }
        ],
        pager: jQuery(pPagerName),
        rowNum: 20,
        rowList: [20, 40, 80, 100],
        height: '100%',
        viewrecords: true,
        celledit: true,
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
        onSelectRow: function (id) {
            var allowEdit = true;

            if (id && id !== lastSelectedCell) {                
                jQuery("#grdTABQUIK").jqGrid('saveRow', lastSelectedCell);
                
                jQuery("#grdTABQUIK").jqGrid('restoreRow', lastSelectedCell, {
                    "afterrestorefunc":
                        function (response) {                            
                            var prevTABFusionRMSField = jQuery("#grdTABQUIK").jqGrid('getCell', lastSelectedCell, 'TABFusionRMSField');
                            var prevManualField = jQuery("#grdTABQUIK").jqGrid('getCell', lastSelectedCell, 'Manual');
                            var prevFormatField = jQuery("#grdTABQUIK").jqGrid('getCell', lastSelectedCell, 'Format');

                            if (prevTABFusionRMSField != null && prevManualField != null && prevTABFusionRMSField != "" && prevManualField != "") {
                                jQuery('#grdTABQUIK').jqGrid('setSelection', lastSelectedCell);
                                jQuery('#grdTABQUIK').jqGrid('editRow', lastSelectedCell, true);
                                allowEdit = false;
                                $(this).confirmModal({
                                    confirmTitle: 'TAB FusionRMS',
                                    confirmMessage: vrApplicationRes['msgJsTABQUIKCantHaveFusionAndManual'],
                                    confirmOk: vrCommonRes['Ok'],                                    
                                    confirmStyle: 'default',
                                    confirmOnlyOk: true,
                                });

                                isFieldMappingCorrect = false;
                            }
                            else if (prevFormatField != null && prevFormatField != "" && (prevTABFusionRMSField != null
                                && prevTABFusionRMSField == "") && (prevManualField != null && prevManualField == "")) {
                                jQuery('#grdTABQUIK').jqGrid('setSelection', lastSelectedCell);
                                jQuery('#grdTABQUIK').jqGrid('editRow', lastSelectedCell, true);
                                allowEdit = false;
                                $(this).confirmModal({
                                    confirmTitle: 'TAB FusionRMS',
                                    confirmMessage: vrApplicationRes['msgJsTABQUIKNoFieldToFormat'],
                                    confirmOk: vrCommonRes['Ok'],
                                    confirmStyle: 'default',
                                    confirmOnlyOk: true,
                                });
                                
                                isFieldMappingCorrect = false;
                            }
                            else {
                                isFieldMappingCorrect = true;
                            }
                        }
                });

                if (allowEdit) {
                    $(this).jqGrid('editRow', id);
                    lastSelectedCell = id
                }
                
            }
        },
        afterEditCell:function (rowid, cellname, value, iRow, iCol){            
        }, 
        beforeRequest: function () {            
        },
        autowidth: true,
        shrinkToFit: true,
        multiselect: false,
    }).navGrid(pPagerName, {
        edit: false,
        add: false,
        del: false,
        search: false,
        refresh: false
    });
}

function BindChangeEventForDDLTableList() {
    $("#ddlTableList").on('change', function () {        

        var selectedTable = $("#ddlTableList option:selected").val();

        $.ajax({
            url: urls.TABQUIK.GetTableFieldsListAndParentTableFields,
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            dataType: 'json',
            data: { pTableName: selectedTable },
            async: false
        }).done(function (response) {
            tableFields = JSON.parse(response);
        }).fail(function (xhr, status) {
            ShowErrorMessge();
        });
        $("#grdTABQUIK").jqGrid('GridUnload');
        $('#grdTABQUIK').gridTABQUIK(urls.TABQUIK.GetTABQUIKMappingGrid, "TABQUIK");        
    });
}

function BindTableNames() {
    var sOperation = $("#hdnOperation").val();

    $.ajax({
        url: urls.TableTracking.LoadAccordianTable,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'json',
        data: {},
        async: false
    }).done(function (data) {
        $("#ddlTableList").empty();
        var pTableObjects = $.parseJSON(data);
        for (var i = 0; i < pTableObjects.length; i++) {
            $("#ddlTableList").append($('<option>', { value: pTableObjects[i].TableName, text: pTableObjects[i].UserName }));
        }
        BindChangeEventForDDLTableList();

        if (sOperation == "Add") {
            $("#ddlTableList").val($("#ddlTableList option:first").val());
            $("#ddlTableList").change();
        }
        else if (sOperation == "Edit") {
            var sTableName = $("#hdnTableName").val();
            $("#ddlTableList").val(sTableName);
            $("#ddlTableList").change();
        }
    });
}

function LoadTABQUIKFieldMappingPartial(JobName,sOperation) {   
    var lstTABQUIKListValue = $("#lstTABQUIKList option:selected").val();

    // Load TABQUIKFieldMappingPartial screen
    $.ajax({
        url: urls.TABQUIK.TABQUIKFieldMappingPartial,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html',
        data: { pTabquikId: lstTABQUIKListValue != null & lstTABQUIKListValue != undefined ? lstTABQUIKListValue : 0 },
        async: true
    }).done(function (result) {
        $('#LoadUserControl').empty();
        $('#LoadUserControl').html(result);
        $("#hdnOperation").val(sOperation);
        $("#hdnJobName").val(JobName);
        
        var sTableName = $("#hdnTableName").val();
        var sSQLUpdateString = $("#hdnSQLUpdateString").val();
        //Get table list for selection
        BindTableNames();

        if (sSQLUpdateString != "") {
            $("#txtUpdateQuery").val(sSQLUpdateString);
        }
        else {
            $("#txtUpdateQuery").val("UPDATE <YourTable> SET <FieldToUpdate> = getdate() WHERE ID = %ID%");
        }
    })
    .fail(function (xhr, status) {
        ShowErrorMessge();
    });    
}

function GetOnestripJobList() {
    //Get the list of JOBS
    $.get(urls.TABQUIK.GetOneStripJobs, function (data) {
        $("#lstTABQUIKList").empty();
        $.each(data, function (i, JSONObj) {
            $("#lstTABQUIKList").append($('<option>', { value: JSONObj.Value, text: JSONObj.Name }));
        });
    });
}

function ProcessAutoFillMapping() {
    $("#grdTABQUIK").jqGrid('GridUnload');
    //Fill TABQUIK grid with auto mapped fields
    $('#grdTABQUIK').gridTABQUIK(urls.TABQUIK.GetTABQUIKMappingGridWithAutoFill, "TABQUIK");
}

function LoadTABQUIKJobsList(){
    $.ajax({
        url: urls.TABQUIK.LoadTABQUIKFieldMappingPartial,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html',
        data: {},
        async: false
    }).done(function (result) {
        $('#LoadUserControl').empty();
        $('#LoadUserControl').html(result);
    })
.fail(function (xhr, status) {
    ShowErrorMessge();
});
}