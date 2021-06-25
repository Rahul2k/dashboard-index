$(function () {

    $('#DocLevel').on('click', function () {
        if ($(this).is(':checked')) {
            $('#docLevelDiv *').prop("disabled", false);
            $('#typeDescription').show();
            var selectedVal = parseInt($('#RecordManageMgmtTypeDoc :selected').val());
            SetTypeListLabel(selectedVal);
        }
        else {
            $('#typeDescription').hide();
            $('#docLevelDiv *').prop("disabled", true);
        }

        if($('#folderLevel').is(':checked'))
        {
            $('#folderLevel').attr('checked', false);
        }
    });

    $('#folderLevel').on('click', function () {

        if ($('#DocLevel').is(':checked')) {
            $('#typeDescription').hide();
            $('#DocLevel').attr('checked', false);
            $('#docLevelDiv *').prop("disabled", true);
        }
    });

    $('#RecordManageMgmtTypeDoc').on('change', function () {
        var selectedVal = parseInt($('#RecordManageMgmtTypeDoc :selected').val());
        SetTypeListLabel(selectedVal);        
    });



    $('#btnApplyAdvanced').on('click', function () {
        var parentFolder = $('#ParentFolderTableName :selected').text();
        var parentDoc = $('#ParentDocTypeTableName :selected').text();
        var parentFolderVal = $('#ParentFolderTableName :selected').val();
        var parentDocVal = $('#ParentDocTypeTableName :selected').val();
        var docLevel = $('#DocLevel').is(':checked');
        var managementType = parseInt($('#RecordManageMgmtTypeDoc :selected').val());
        var totalVal = $("#RecordManageMgmtTypeDoc option").length;
        if (docLevel == true && totalVal==0) {
            showAjaxReturnMessage(vrTablesRes["msgJsTableAdvancedinvalPropIndex"], "w");
            return false;
        }
        if (parentFolderVal !== "" && parentDocVal !== "" && docLevel == true) {
            if (parentFolder === parentDoc) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableAdvancedParentFolAndDocTypeNSame"], "w");
                return false;
            }
        }
        if (parentFolderVal == "" && docLevel == true && (managementType == 2 || managementType == 3 || managementType == 4)) {
            showAjaxReturnMessage(vrTablesRes["msgJsTableAdvancedParentFolTabReq"], "w");
            return false;
        }
        if (parentDocVal == "" && docLevel == true && (managementType == 2 || managementType == 3 || managementType == 4)) {
            showAjaxReturnMessage(vrTablesRes["msgJsTableAdvancedParentDocTypeTabReq"], "w");
            return false;
        }
        SetRecordManageMgmtType();

        var $form = $('#frmTableAdvanced');
        var tableName=$('#TableName').val();
        $.post(urls.TableAdvanced.CheckParentForder, $.param({ parentFolderVar: parentFolder, selectedTableVar: tableName }), function (data) {
            if (data) {
                if (data.errortype == "w" && data.errortype !== "e") {
                    showAjaxReturnMessage(data.message, data.errortype);
                    return false;
                }
                else {
                    if ($form.valid()) {
                        var serializedForm = $form.serialize();
                        $.post(urls.TableAdvanced.SetAdvanceDetails, serializedForm, function (response) {
                            if (response) {
                                if (response.warnMsgJSON !== "") {
                                    $(this).confirmModal({
                                        confirmTitle: 'TAB FusionRMS',
                                        confirmMessage: response.warnMsgJSON,
                                        confirmOk: vrCommonRes['Ok'].toUpperCase(),
                                        confirmStyle: 'default',
                                        confirmOnlyOk: true
                                    });
                                } else {
                                    showAjaxReturnMessage(response.message, response.errortype);
                                }
                            }

                        });
                    }
                }
            }
            return undefined;
        });
        return true;
    });
});

function LoadTableAdvancedData(tblName) {
    if ($('#LoadTabContent').length == 0) {
        RedirectOnAccordian(urls.TableTracking.LoadTableTab);
        $('#title, #navigation').text(vrCommonRes['mnuTables']);
    }
        $.ajax({
            url: urls.TableAdvanced.LoadAdvancedTab,
            contentType: 'application/html; charset=utf-8',
            type: 'GET',
            dataType: 'html'
        }).done(function (result) {
        $('#LoadTabContent').empty();
        $('#LoadTabContent').html(result);

        $.post(urls.TableAdvanced.GetAdvanceDetails, $.param({ tableName: tblName }), function (data) {
            if (data) {
                if (data.errortype == 's') {
                    var tableEntity = $.parseJSON(data.tableEntityJSON);
                    var parentFolderListJSON = $.parseJSON(data.parentFolderListJSON);
                    var parentDocListJSON = $.parseJSON(data.parentDocListJSON);
                    var flag = $.parseJSON(data.flagJSON);
                    if (tableEntity.TableName !== null)
                        $('#TableName').val(tableEntity.TableName);
                    if (parentFolderListJSON !== null)
                        LoadOutField('#ParentFolderTableName', parentFolderListJSON);
                    if (flag) {
                        SetTypeList();
                    }
                    else {
                        $("#RecordManageMgmtTypeDoc").append('<option></option>');
                    }
                    if (parentDocListJSON !== null)
                        LoadOutField('#ParentDocTypeTableName', parentDocListJSON);
                    $("#ParentFolderTableName").prepend("<option value='' selected='selected'>" + vrTablesRes["optJsTableAdvancedNoParentFolder"] + "</option>");
                    $("#ParentDocTypeTableName").prepend("<option value='' selected='selected'>" + vrTablesRes["optJsTableAdvancedNoParentDocType"] + "</option>");
                    if (tableEntity.RecordManageMgmtType !== null) {
                        if (tableEntity.RecordManageMgmtType == 0) {
                            $('#folderLevel').attr('checked', false);
                            $('#DocLevel').attr('checked', false);
                            $('#docLevelDiv *').prop("disabled", true);
                        }
                        else if (tableEntity.RecordManageMgmtType == 1) {
                            $('#folderLevel').attr('checked', true);
                            $('#DocLevel').attr('checked', false);
                            $('#docLevelDiv *').prop("disabled", true);
                        }
                        else {
                           // SetTypeList();
                                 $('#RecordManageMgmtTypeDoc option[value=' + tableEntity.RecordManageMgmtType + ']').attr('selected', true);
                            $('#folderLevel').attr('checked', false);
                            $('#DocLevel').attr('checked', true);
                            $('#docLevelDiv *').prop("disabled", false);
                            SetTypeListLabel(tableEntity.RecordManageMgmtType);
                        }
                    }
                    if (tableEntity.ParentFolderTableName !== null && tableEntity.ParentFolderTableName !== "")
                        $('#ParentFolderTableName option[value=' + tableEntity.ParentFolderTableName + ']').attr('selected', true);
                    if (tableEntity.ParentFolderTableName !== null && tableEntity.ParentFolderTableName !== "")
                        $('#ParentDocTypeTableName option[value=' + tableEntity.ParentDocTypeTableName + ']').attr('selected', true);
              
                }
                }
        });
        })
        .fail(function (xhr, status) {
        ShowErrorMessge();
    });
}

function SetTypeList() {
    $('#RecordManageMgmtTypeDoc').append("<option value=2 selected='selected'>" + vrTablesRes["optJsTableAdvancedFixedDocTypeList"] + "</option>");
    $('#RecordManageMgmtTypeDoc').append("<option value=3>" + vrTablesRes["optJsTableAdvancedSingleDocTypeList"] + "</option>");
    $('#RecordManageMgmtTypeDoc').append("<option value=4>" + vrTablesRes["optJsTableAdvancedCreateNewDocAlwys"] + "</option>");
}

function SetTypeListLabel(selectedVal) {
    switch (selectedVal) {
        case 2:
            $('#typeDescription').addClass("col-sm-12 alert alert-info");
            $('#typeDescription').text(vrTablesRes["lblJsTableAdvancedFixNoOfDocsEachParent"]);
            $('#typeDescription').show();
            break;
        case 3:
            $('#typeDescription').addClass("col-sm-12 alert alert-info");
            $('#typeDescription').text(vrTablesRes["lblJsTableAdvancedSingleDocOfDocType"]);
            $('#typeDescription').show();
            break;
        case 4:
            $('#typeDescription').addClass("col-sm-12 alert alert-info");
            $('#typeDescription').text(vrTablesRes["lblJsTableAdvancedCreateDocOfDocTypeNExi"]);
            $('#typeDescription').show();
            break;
        default:
            break;
    }
}


function SetRecordManageMgmtType() {
    var folderLevel = $('#folderLevel').is(':checked');
    var docLevel = $('#DocLevel').is(':checked');
    var selectedVal = parseInt($('#RecordManageMgmtTypeDoc :selected').val());
    if (folderLevel == false && docLevel == false) {
        $('#RecordManageMgmtType').val('0');
        return;
    }
    if (folderLevel==true && docLevel==false) {
        $('#RecordManageMgmtType').val('1');
        return;
    }
    if (docLevel == true && folderLevel == false) {
        if (selectedVal == 2) {
            $('#RecordManageMgmtType').val('2');
            return;
        }
        else if (selectedVal == 3) {
            $('#RecordManageMgmtType').val('3');
            return;
        }
        else if (selectedVal == 4) {
            $('#RecordManageMgmtType').val('4');
            return;
        }
        else {
            $('#RecordManageMgmtType').val('0');
            return;

        }
    } 
   
}

