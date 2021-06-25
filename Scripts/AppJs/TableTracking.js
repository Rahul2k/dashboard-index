var StatusField = "";
$(function () {
    $('#TrackingStatusFieldName').bind('cut paste', function (e) {
        e.preventDefault();
    });

    
    $("#Trackable").on('change', function () {
        var tableName = $('#TableName').val();
        var IsTrackable = $('#Trackable').is(':checked');
        var requestval = $('#AllowBatchRequesting').is(':checked');
        if (!IsTrackable)
            $('#AllowBatchRequesting').attr('checked', false);
        GetIntialDestination(tableName, true, IsTrackable, requestval);

        trackableFlag = true;
        DispositionTableAttach = $('#tableLabel').text();
        trackableValue = $('#Trackable').is(':checked');
        if (DispositionTable != null && DispositionType != null) {
            if (DispositionTable == $('#tableLabel').text()) {
                if ((DispositionType == 1)) {
                    confirmTitle = 'TAB FusionRMS';
                    confirmMessage = vrTablesRes["msgJsTableTrackingTblMustBTrackingObj"] + "\n " + vrTablesRes["msgJsTableTrackingIfUWouldLike2Chang"];
                    confirmOk = vrCommonRes["Ok"].toUpperCase();
                    ShowWarning(confirmTitle, confirmMessage, confirmOk);
                    $('#Trackable').attr('checked', true);
                }
            }
        }

    });

    $('#TrackingTable').change(function () {
        var containerLevel = parseInt($('#TrackingTable :selected').val());
        if (containerLevel == 0)
            $('#TrackingStatusFieldName').val("");
        else
            $('#TrackingStatusFieldName').val(StatusField);
        var OutTypeVar = parseInt($('#OutTable :selected').val());
        DisableControlOnCLevel(containerLevel);
        DisableDueBackDays(containerLevel, OutTypeVar);
            var boolSignature = (signatureVar && containerLevel);
            DisableSigntureRequired(boolSignature);
        if (containerLevel == 1) {
            if (DispositionTable != null && DispositionType != null) {
                if (DispositionTable == $('#tableLabel').text()) {
                    if ((DispositionType == 1)) {
                        confirmTitle = 'TAB FusionRMS';
                        confirmMessage = vrTablesRes["msgJsTableTrackingTblMustBTrackingObj"] + "\n " + vrTablesRes["msgJsTableTrackingIfUWouldLike2Chang"];
                        confirmOk = vrCommonRes["Ok"].toUpperCase();
                        ShowWarning(confirmTitle, confirmMessage, confirmOk);
                    }
                }
            }
        }
    });

    $('#OutTable').change(function () {
        var OutTypeVar = parseInt($('#OutTable :selected').val());
        var containerLevel = parseInt($('#TrackingTable :selected').val());
        DisableOutField(OutTypeVar);
        DisableDueBackDays(containerLevel, OutTypeVar);
    });


    $('#AutoAssignOnAdd').on('change', function () {
        var trackableObj = $('#Trackable').is(':checked');
        var destinationVar = $('#DefaultTrackingId option').size();
        var autoAssignVar = $('#AutoAssignOnAdd').is(':checked');
        DisableAutoTracking(trackableObj, destinationVar, autoAssignVar);
    });

    //$('#DefaultTrackingDetails').change(function () {
    //    var DefaultId = parseInt($('#DefaultTrackingDetails :selected').attr('Id'));
    //    //var DefaultVal = $('#DefaultTrackingDetails :selected').val();
    //    var DefaultTable = $('#lblDestination').text();
    //    $('#DefaultTrackingId').val(DefaultId);
    //    $('#DefaultTrackingTable').val(DefaultTable);
    //});

    $('#btnApply').on('click', function () {
        var tableVar = $('#TableName').val();
        var cLevelInfo = $('#TrackingTable :selected').val();
        var statusFieldInfo = $('#TrackingStatusFieldName').val();
        var outFieldStatus = $('#TrackingOUTFieldName').is(':disabled');
        var outTypeInfoVal = parseInt($('#OutTable :selected').val());
        var outTypeInfoText = $('#OutTable :selected').text();
        var outFieldInfoVal = parseInt($('#TrackingOUTFieldName :selected').val());
        var outFieldInfoText = $('#TrackingOUTFieldName :selected').text();
        var activeFieldInfoVal = parseInt($('#TrackingACTIVEFieldName :selected').val());
        var activeFieldInfoText = $('#TrackingACTIVEFieldName :selected').text();
        var requestableInfoVal = parseInt($('#TrackingRequestableFieldName :selected').val());
        var requestableInfoText = $('#TrackingRequestableFieldName :selected').text();
        var inactiveStorageVal = parseInt($('#InactiveLocationField :selected').val());
        var inactiveStorageText = $('#InactiveLocationField :selected').text();
        var archiveFieldVal = parseInt($('#ArchiveLocationField :selected').val());
        var archiveFieldText = $('#ArchiveLocationField :selected').text();
        var signatureFieldVal = parseInt($('#SignatureRequiredFieldName :selected').val());
        var signatureFieldText = $('#SignatureRequiredFieldName :selected').text();
        var autoAssignStatus = ($('#AutoAssignOnAdd').is(':checked')) && !($('#AutoAssignOnAdd').is(':disabled'));
        var destinationVar = $('#DefaultTrackingId').val();
        if (statusFieldInfo !== null)
            statusFieldInfo = $('#TrackingStatusFieldName').val();
        else
            statusFieldInfo = null;

        if (cLevelInfo > 0 && statusFieldInfo == "") {
            showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingTrackingStatusReq"], "w");
            return false;
        }
        if (statusFieldInfo !== null) {
            var firstCharCode = statusFieldInfo.charCodeAt(0);
            if ((48 <= firstCharCode && firstCharCode <= 57) || (firstCharCode == 95)) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingFieldCantBeginWithUScore"], "w");
                return false;
            }
        }

        if ((!outFieldStatus) && (cLevelInfo > 0) && (outFieldInfoVal == 0 && outFieldInfoText.trim() == "{No Out Field}")) {
            showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingOutFldMustSelected"], "w");
            return false;
        }
        if ((outTypeInfoVal == 0) && (outFieldInfoText.trim() !== "{No Out Field}")) {
            if (activeFieldInfoText.trim() !== "{No Active Field}") {
                if ($('#TrackingACTIVEFieldName').val() == $('#TrackingOUTFieldName').val()) {
                    showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingOutAndActiveMustDiff"], "w");
                    return false;
                }
            }
            if (requestableInfoText.trim() !== "{No Requestable Field}") {
                if ($('#TrackingRequestableFieldName').val() == $('#TrackingOUTFieldName').val()) {
                    showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingOutAndReqMustDiff"], "w");
                    return false;
                }
            }
            if (inactiveStorageText.trim() !== "{No Inactive Storage Field}") {
                if ($('#InactiveLocationField').val() == $('#TrackingOUTFieldName').val()) {
                    showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingOutAndInActiveMustDiff"], "w");
                    return false;
                }
            }
            if (archiveFieldText.trim() !== "{No Archive Storage Field}") {
                if ($('#ArchiveLocationField').val() == $('#TrackingOUTFieldName').val()) {
                    showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingOutAndArchiveStrgMustDiff"], "w");
                    return false;
                }
            }
            if (signatureFieldText.trim() !== "{No Signature Required Field}") {
                if ($('#SignatureRequiredFieldName').val() == $('#TrackingOUTFieldName').val()) {
                    showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingOutAndSignReqMustDiff"], "w");
                    return false;
                }
            }
        }
        if ((requestableInfoText.trim() !== "{No Requestable Field}") && (activeFieldInfoText.trim() !== "{No Active Field}")) {
            if ($('#TrackingRequestableFieldName').val() == $('#TrackingACTIVEFieldName').val()) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingTrackReqAndActiveMustDiff"], "w");
                return false;
            }
        }
        if ((inactiveStorageText.trim() !== "{No Inactive Storage Field}") && (activeFieldInfoText.trim() !== "{No Active Field}")) {
            if ($('#InactiveLocationField').val() == $('#TrackingACTIVEFieldName').val()) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingInActiveStAndActiveMustDiff"], "w");
                return false;
            }
        }
        if ((archiveFieldText.trim() !== "{No Archive Storage Field}") && (activeFieldInfoText.trim() !== "{No Active Field}")) {
            if ($('#ArchiveLocationField').val() == $('#TrackingACTIVEFieldName').val()) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingArchiveAndActiveMustDiff"], "w");
                return false;
            }
        }
        if ((signatureFieldText.trim() !== "{No Signature Required Field}") && (activeFieldInfoText.trim() !== "{No Active Field}")) {
            if ($('#SignatureRequiredFieldName').val() == $('#TrackingACTIVEFieldName').val()) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingSignReqAndActiveMustDiff"], "w");
                return false;
            }
        }
        if (( requestableInfoText.trim() !== "{No Requestable Field}") && (inactiveStorageText.trim() !== "{No Inactive Storage Field}")) {
            if ($('#TrackingRequestableFieldName').val() == $('#InactiveLocationField').val()) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingTraReqAndInActiveMustDiff"], "w");
                return false;
            }
        }
        if ((requestableInfoText.trim() !== "{No Requestable Field}") && (archiveFieldText.trim() !== "{No Archive Storage Field}")) {
            if ($('#TrackingRequestableFieldName').val() == $('#ArchiveLocationField').val()) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingTraReqAndArchiveMustDiff"], "w");
                return false;
            }
        }
        if (( signatureFieldText.trim() !== "{No Signature Required Field}") && (inactiveStorageText.trim() !== "{No Inactive Storage Field}")) {
            if ($('#SignatureRequiredFieldName').val() == $('#InactiveLocationField').val()) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingSignReqAndInActiveMustDiff"], "w");
                return false;
            }
        }
        if ((archiveFieldText.trim() !== "{No Archive Storage Field}") && (inactiveStorageText.trim() !== "{No Inactive Storage Field}")) {
            if ($('#ArchiveLocationField').val() == $('#InactiveLocationField').val()) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingInActAndArchiveStrgMustDiff"], "w");
                return false;
            }
        }
        if ((signatureFieldText.trim() !== "{No Signature Required Field}") && (archiveFieldText.trim() !== "{No Archive Storage Field}")) {
            if ($('#SignatureRequiredFieldName').val() == $('#ArchiveLocationField').val()) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingSignReqAndArchiveStrgMustDiff"], "w");
                return false;
            }
        }
        if ((signatureFieldText.trim() !== "{No Signature Required Field}") && (requestableInfoText.trim() !== "{No Requestable Field}")) {
            if ($('#SignatureRequiredFieldName').val() == $('#TrackingRequestableFieldName').val()) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingReqAndSignReqMustDiff"], "w");
                return false;
            }
        }
        if (autoAssignStatus && (destinationVar == null || destinationVar == "")) {
            showAjaxReturnMessage(vrTablesRes["msgJsTableTrackingIniTrackingDestMustSel"], "w");
            return false;
        }

        $.get(urls.TableTracking.GetTableEntity, $.param({ containerInfo: cLevelInfo, tableName: tableVar, statusFieldText: statusFieldInfo }), function (data) {
            if (data) {
                if (data.errortype == "w") {
                    showAjaxReturnMessage(data.message, data.errortype);
                    return false;
                }else{
                    if (data.errortype == "r") {
                        $(this).confirmModal({
                            confirmTitle: 'TAB FusionRMS',
                            confirmMessage: data.message,
                            confirmOk: vrCommonRes['Yes'],
                            confirmCancel: vrCommonRes['No'],
                            confirmStyle: 'default',
                            confirmCallback: RemoveStatusFieldYes,
                            confirmCallbackCancel: RemoveStatusFieldNo

                        });
                    } else if (data.errortype == "s") {
                        RemoveStatusField(false);
                    }
                }
            }
            return true;
        });
        return true;
    });
});


$('#TrackingStatusFieldName').SpecialCharactersSpaceNotAllowed();

function RemoveStatusFieldYes() {
    RemoveStatusField(true);
}

function RemoveStatusFieldNo() {
    RemoveStatusField(false);
}
function RemoveStatusField(FieldFlag) {
    var $form = $('#frmTableTracking');
    if ($form.valid()) {

        var serializedForm = $form.serialize() + "&FieldFlag=" + FieldFlag + "&pAutoAddNotification=" + $("#AutoAddNotification").is(':checked') + "&pAllowBatchRequesting=" + $("#AllowBatchRequesting").is(':checked') + "&pTrackable=" + $("#Trackable").is(':checked');

        $.ajax({
            url: urls.TableTracking.SetTableTrackingDetails,
            type: "POST",
            dataType: 'json',
            async: false,
            data:  serializedForm ,
            success: function (response) {
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
                var tableVar = $('#TableName').val();
                GetTableTrackingData(tableVar);
            }
        });
    }
}

function GetTableTrackingData(tblName) {
    if ($('#LoadTabContent').length == 0) {
        RedirectOnAccordian(urls.TableTracking.LoadTableTab);
        $('#title, #navigation').text(vrCommonRes['mnuTables']);
    }
    $.ajax({
        url: urls.TableTracking.LoadTableTracking,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html',
        async:false
    }).done(function (result) {
         $('#LoadTabContent').empty();
         $('#LoadTabContent').html(result);
         $.post(urls.TableTracking.GetTableTrackingProperties, $.param({ tableName: tblName }), function (data) {
             if (data) {
                 if (data.errortype == 's') {
                     var pSystemObject = $.parseJSON(data.systemObject);
                      oTrackingOutOn = pSystemObject.TrackingOutOn;
                      oDateDueOutOn = pSystemObject.DateDueOn;
                     if (data.lblDestinationJSON !== "null" && data.lblDestinationJSON !== "" && data.lblDestinationJSON !== undefined) {
                         var lblDestinationJSON = $.parseJSON(data.lblDestinationJSON);
                         $('#lblDestination').text(lblDestinationJSON + ":");
                     }                   
                     signatureVar = pSystemObject.SignatureCaptureOn;
                     var containerJSONList = $.parseJSON(data.containerJSONList);
                     var tableObject = $.parseJSON(data.oneTableObj);
                     var outFieldJSONList = $.parseJSON(data.outFieldJSONList);
                     var dueBackJSONList = $.parseJSON(data.dueBackJSONList);
                     var activeFieldJSONList = $.parseJSON(data.activeFieldJSONList);
                     var emailAddressJSONList = $.parseJSON(data.emailAddressJSONList);
                     var requestFieldJSONList = $.parseJSON(data.requestFieldJSONList);
                     var inactiveJSONList = $.parseJSON(data.inactiveJSONList);
                     var archiveJSONList = $.parseJSON(data.archiveJSONList);
                     var userFieldJSONList = $.parseJSON(data.userFieldJSONList);
                     var phoneFieldJSONList = $.parseJSON(data.phoneFieldJSONList);
                     var mailStopJSONList = $.parseJSON(data.mailStopJSONList);
                     var signatureJSONList = $.parseJSON(data.signatureJSONList);
                     LoadOutField('#TrackingTable', containerJSONList);
                     LoadOutField('#TrackingOUTFieldName', outFieldJSONList);
                     LoadOutField('#TrackingDueBackDaysFieldName', dueBackJSONList);
                     LoadOutField('#TrackingACTIVEFieldName', activeFieldJSONList);
                     LoadOutField('#TrackingEmailFieldName', emailAddressJSONList);
                     LoadOutField('#TrackingRequestableFieldName', requestFieldJSONList);
                     LoadOutField('#InactiveLocationField', inactiveJSONList);
                     LoadOutField('#ArchiveLocationField', archiveJSONList);
                     LoadOutField('#OperatorsIdField', userFieldJSONList);
                     LoadOutField('#TrackingPhoneFieldName', phoneFieldJSONList);
                     LoadOutField('#TrackingMailStopFieldName', mailStopJSONList);
                     LoadOutField('#SignatureRequiredFieldName', signatureJSONList);
                     $('#TableName').val(tableObject.TableName.trim());
                     $('#TrackingTable option[value=' + tableObject.TrackingTable + ']').attr('selected', true);
                     if (tableObject.TrackingStatusFieldName !== null && tableObject.TrackingStatusFieldName !== "") {
                          StatusField = tableObject.TrackingStatusFieldName.trim();
                         $('#TrackingStatusFieldName').val(tableObject.TrackingStatusFieldName.trim());
                     }
                     else {
                         $('#TrackingStatusFieldName').val("");
                     }
                 
                     $('#OutTable option[value=' + tableObject.OutTable + ']').attr('selected', true);
                     if (tableObject.TrackingDueBackDaysFieldName !== '' && tableObject.TrackingDueBackDaysFieldName !== null)
                         $('[name=TrackingDueBackDaysFieldName] option').filter(function () {
                             return ($(this).val() == tableObject.TrackingDueBackDaysFieldName);
                         }).prop('selected', true);
                     if (tableObject.TrackingOUTFieldName !== '' && tableObject.TrackingOUTFieldName !== null)
                         $('[name=TrackingOUTFieldName] option').filter(function () {
                             return ($(this).val() == tableObject.TrackingOUTFieldName);
                         }).prop('selected', true);
                     if (tableObject.TrackingACTIVEFieldName != '' && tableObject.TrackingACTIVEFieldName !== null)
                         $('[name=TrackingACTIVEFieldName] option').filter(function () {
                             return ($(this).val() == tableObject.TrackingACTIVEFieldName);
                         }).prop('selected', true);
                     if (tableObject.TrackingEmailFieldName !== '' && tableObject.TrackingEmailFieldName !== null)
                         $('[name=TrackingEmailFieldName] option').filter(function () {
                             return ($(this).val() == tableObject.TrackingEmailFieldName);
                         }).prop('selected', true);
                     if (tableObject.TrackingRequestableFieldName !== '' && tableObject.TrackingRequestableFieldName !== null)
                         $('[name=TrackingRequestableFieldName] option').filter(function () {
                             return ($(this).val() == tableObject.TrackingRequestableFieldName);
                         }).prop('selected', true);
                     if (tableObject.TrackingPhoneFieldName !== '' && tableObject.TrackingPhoneFieldName !== null)
                         $('[name=TrackingPhoneFieldName] option').filter(function () {
                             return ($(this).val() == tableObject.TrackingPhoneFieldName);
                         }).prop('selected', true);
                     if (tableObject.InactiveLocationField !== '' && tableObject.InactiveLocationField !== null)
                         $('[name=InactiveLocationField] option').filter(function () {
                             return ($(this).val() == tableObject.InactiveLocationField);
                         }).prop('selected', true);
                     if (tableObject.TrackingMailStopFieldName !== '' && tableObject.TrackingMailStopFieldName !== null)
                         $('[name=TrackingMailStopFieldName] option').filter(function () {
                             return ($(this).val() == tableObject.TrackingMailStopFieldName);
                         }).prop('selected', true);
                     if (tableObject.ArchiveLocationField !== '' && tableObject.ArchiveLocationField !== null)
                         $('[name=ArchiveLocationField] option').filter(function () {
                             return ($(this).val() == tableObject.ArchiveLocationField);
                         }).prop('selected', true);
                     if (tableObject.OperatorsIdField !== '' && tableObject.OperatorsIdField !== null)
                         $('[name=OperatorsIdField] option').filter(function () {
                             return ($(this).val() == tableObject.OperatorsIdField);
                         }).prop('selected', true);
                     if (tableObject.SignatureRequiredFieldName !== '' && tableObject.SignatureRequiredFieldName !== null)
                         $('[name=SignatureRequiredFieldName] option').filter(function () {
                             return ($(this).val() == tableObject.SignatureRequiredFieldName);
                         }).prop('selected', true);
                     DisableOutSetup(oTrackingOutOn, tableObject.OutTable)
                     //DisableOutField(tableObject.OutTable);
                     DisableDueBackDays(tableObject.TrackingTable, tableObject.OutTable);
                     var boolSignature = (signatureVar && tableObject.TrackingTable);
                     DisableSigntureRequired(boolSignature);
                     DisableControlOnCLevel(tableObject.TrackingTable);
                     GetIntialDestination(tblName,false,false,false);
                     if (tableObject.AutoAddNotification)
                         $('#AutoAddNotification').attr('checked', true);
                     else
                         $('#AutoAddNotification').removeAttr('checked', true);
              
                     if (!(dispositionFlag && (DispositionTable == $('#tableLabel').text()))) {
                         dispositionFlag = false;
                         DispositionTable = $('#tableLabel').text();
                         DispositionType = tableObject.RetentionFinalDisposition;
                     }
                 }
                 setTimeout(function () {
                     var s = $(".sticker");
                     $('.content-wrapper').scroll(function () {
                         if ($(this).scrollTop() + $(this).innerHeight() + 60 >= $(this)[0].scrollHeight) {
                             s.removeClass("stick", 10);
                         }
                         else {
                             s.addClass("stick");
                         }
                     });
                 }, 800);
             }
             else {
                 ShowErrorMessge();
             }
         });

     })
.fail(function (xhr, status) {
    ShowErrorMessge();
});
}

function GetIntialDestination(tblName, ConfigureTransfer, TransferValue, RequestVal) {
    
    $.post(urls.TableTracking.GetTrackingDestination, $.param({ tableName: tblName, ConfigureTransfer: ConfigureTransfer, TransferValue: TransferValue, RequestVal: RequestVal }), function (response) {
        if (response) {
            if (response.errortype !== "e") {
                var bRequestPermissionJSON = $.parseJSON(response.bRequestPermissionJSON);
                var bTransferPermissionJSON = $.parseJSON(response.bTransferPermissionJSON);
                //trackableFlag = bTransferPermissionJSON;
                var tableObject = $.parseJSON(response.tableObjectJSON);
                trackableValue = bTransferPermissionJSON;
                $('#DefaultTrackingId').empty();
                if (trackableFlag == true && DispositionTableAttach == $('#tableLabel').text()) {
                    trackableFlag = true;
                    DispositionTableAttach=$('#tableLabel').text();
                    $('#Trackable').attr('checked', trackableValue);
                }
                else {
                    trackableFlag = false;
                    DispositionTableAttach =null;
                    $('#Trackable').attr('checked', trackableValue);
                }
                //Check - uncheck based on permission
                $('#AllowBatchRequesting').attr('checked', bRequestPermissionJSON);
                //if (bRequestPermissionJSON)
                //    $('#AllowBatchRequesting').attr('checked', true);
                //else
                //    $('#AllowBatchRequesting').removeAttr('checked', true);

                if (response.errortype == "w") {
                    var sNoRecordMsgJSON = $.parseJSON(response.sNoRecordMsgJSON);
                    $('#InitialListDiv').hide();
                    $('#IntialLabelDiv').show();
                    $('#noRecordLabel').text(sNoRecordMsgJSON);
                }
                else if (response.errortype == "s") {
                    $('#InitialListDiv').show();
                    $('#IntialLabelDiv').hide();
                    var sRecordJSON = $.parseJSON(response.sRecordJSON);
                    var colDataFieldJSON = $.parseJSON(response.colDataFieldJSON);
                    var col1DataFieldJSON = $.parseJSON(response.col1DataFieldJSON);
                    var col2DataFieldJSON = $.parseJSON(response.col2DataFieldJSON);
                    //var lblDestinationJSON = $.parseJSON(response.lblDestinationJSON);
                    var colVisibleJSON = $.parseJSON(response.colVisibleJSON);
                    var col1VisibleJSON = $.parseJSON(response.col1VisibleJSON);
                    var col2VisibleJSON = $.parseJSON(response.col2VisibleJSON);
                    //$('#lblDestination').text(lblDestinationJSON+":");
                    //$('#DefaultTrackingId').append("<option value=''> </option>");
                    
                    if (col1VisibleJSON == true && col2VisibleJSON == true) {
                        $('#DefaultTrackingId').append("<option value='' >" + col1DataFieldJSON + "+" + col2DataFieldJSON + "</option>");
                        $(sRecordJSON).each(function (i, item) {
                            $('#DefaultTrackingId').append("<option value='" + sRecordJSON[i][colDataFieldJSON] + "' >" + sRecordJSON[i][col1DataFieldJSON] + "+" + sRecordJSON[i][col2DataFieldJSON] + "</option>");
                        });
                    } else if (col1VisibleJSON == true && col2VisibleJSON == false) {
                        $('#DefaultTrackingId').append("<option value='' >" + col1DataFieldJSON + "+" + colDataFieldJSON + "</option>");
                        $(sRecordJSON).each(function (i, item) {
                            $('#DefaultTrackingId').append("<option value='" + sRecordJSON[i][colDataFieldJSON] + "' >" + sRecordJSON[i][col1DataFieldJSON] + "+" + sRecordJSON[i][colDataFieldJSON] + " </option>");
                        });
                    } else if (col1VisibleJSON == false && col2VisibleJSON == true) {
                        $('#DefaultTrackingId').append("<option value='' >" + colDataFieldJSON + "+" + col2DataFieldJSON + "</option>");
                        $(sRecordJSON).each(function (i, item) {
                            $('#DefaultTrackingId').append("<option value='" + sRecordJSON[i][colDataFieldJSON] + "' >" + sRecordJSON[i][colDataFieldJSON] + "+" + sRecordJSON[i][col2DataFieldJSON] + "</option>");
                        });
                    } else {
                        $('#DefaultTrackingId').append("<option value='' >" + colDataFieldJSON + "+" + "</option>");
                        $(sRecordJSON).each(function (i, item) {
                            $('#DefaultTrackingId').append("<option value='" + sRecordJSON[i][colDataFieldJSON] + "'>[" + sRecordJSON[i][colDataFieldJSON] + "] </option>");
                        });
                    }

                    var spacesToAdd = 5;
                    var firstLength = secondLength = 0;
                    $("select#DefaultTrackingId option").each(function (i, v) {
                            var parts = $(this).text().split('+');
                            var len = parts[0].length;
                            if (len > firstLength) {
                                firstLength = len;
                            }

                            if (parts[1]) {
                                var len1 = parts[1].length;
                                if (len1 > secondLength) {
                                    secondLength = len1;
                                }
                            }
                    });

                    var padLength = firstLength + spacesToAdd;
                    var padLength1 = secondLength + spacesToAdd;
                    
                    $("select#DefaultTrackingId option").each(function (i, v) {
                        var parts = $(this).text().split('+');
                        var strLength = parts[0].length;

                        for (var x = 0; x < (padLength - strLength) ; x++) {
                            parts[0] = parts[0] + ' ';
                        }

                        if (parts[1]) {
                            $(this).text(parts[0].replace(/ /g, '\u00a0') + parts[1]);
                        } else {
                            $(this).text(parts[0].replace(/ /g, '\u00a0'));
                        }

                    });

                    if (tableObject.DefaultTrackingId !== null) {
                        $('#DefaultTrackingId option[value=' + tableObject.DefaultTrackingId + ']').attr('selected', true);
                        $('#AutoAssignOnAdd').attr('checked', 'checked');
                    } else {
                        $('#DefaultTrackingId option:first').attr('selected', true);
                        $('#AutoAssignOnAdd').removeAttr('checked', 'checked');
                    }
                }
                var autoAssignVar=$('#AutoAssignOnAdd').is(':checked');
                if ($('#DefaultTrackingId').size() == 0)
                    DisableAllowRequest(bTransferPermissionJSON, autoAssignVar, false);
                else 
                    DisableAllowRequest(bTransferPermissionJSON, autoAssignVar, true);
            }
        } else {
            ShowErrorMessge();
        }

    });
}

function DisableAllowRequest(trackableObj,autoAssignVar, destinationVar)
{
    if (trackableObj) {
            $('#AllowBatchRequesting').removeAttr('disabled', 'disabled');
            $('#AutoAssignOnAdd').removeAttr('disabled', 'disabled');
        }
    else {
        //$('#AllowBatchRequesting').attr('checked', false);
            $('#AllowBatchRequesting').attr('disabled', 'disabled');
            $('#AutoAssignOnAdd').attr('disabled', 'disabled');
            $('#AutoAssignOnAdd').attr('checked', false);
        }
            DisableAutoTracking(trackableObj, destinationVar, autoAssignVar);
}

function DisableAutoTracking(trackableObj, destinationVar, autoAssignVar)
{
    if (trackableObj && destinationVar && autoAssignVar) {
        $('#DefaultTrackingId').removeAttr('disabled', 'disabled');
        $('#AutoAddNotification').removeAttr('disabled', 'disabled');
    }
    else {
        $('#DefaultTrackingId').attr('disabled', 'disabled');
        $('#AutoAddNotification').attr('disabled', 'disabled');
        $('#AutoAddNotification').attr('checked', false);
    }
}

function DisableSigntureRequired(boolSignature) {
    if (boolSignature)
        $('#SignatureRequiredFieldName').removeAttr('disabled','disabled');
    else
        $('#SignatureRequiredFieldName').attr('disabled', 'disabled');
}

function DisableDueBackDays(containerLevel, OutTypeVar) {
    if (oTrackingOutOn == true && oDateDueOutOn == true) {
        if ((containerLevel > 0) && ((OutTypeVar == 0) || (OutTypeVar == 1)))
            $('#TrackingDueBackDaysFieldName').removeAttr('disabled', 'disabled');
        else
            $('#TrackingDueBackDaysFieldName').attr('disabled', 'disabled');
    } else {
        $('#TrackingDueBackDaysFieldName').attr('disabled', 'disabled');
    }
}

function DisableOutField(OutTypeVar) {
    if (OutTypeVar == 0 || OutTypeVar == null) {
        $('#TrackingOUTFieldName').removeAttr('disabled', 'disabled');
    }
    else {
        $('#TrackingOUTFieldName').attr('disabled', 'disabled');
    }

}

function DisableControlOnCLevel(containerLevel) {
    switch (containerLevel) {
        case 0:
            $('#Trackable').removeAttr('disabled', 'disabled');
            $('#TrackingStatusFieldName').val('');
            $('#TrackingRequestableFieldName').attr('disabled', 'disabled');
            $('#InactiveLocationField').attr('disabled', 'disabled');
            $('#ArchiveLocationField').attr('disabled', 'disabled');
            $('#TrackingPhoneFieldName').attr('disabled', 'disabled');
            $('#TrackingMailStopFieldName').attr('disabled', 'disabled');
            $('#OperatorsIdField').attr('disabled', 'disabled');
            $('#TrackingStatusFieldName').attr('disabled', 'disabled');
            break;
        case 1:
            $('#Trackable').attr('checked', false);
            $('#Trackable').attr('disabled', 'disabled');
            $('#TrackingRequestableFieldName').removeAttr('disabled', 'disabled');
            $('#InactiveLocationField').removeAttr('disabled', 'disabled');
            $('#ArchiveLocationField').removeAttr('disabled', 'disabled');
            $('#TrackingPhoneFieldName').attr('disabled', 'disabled');
            $('#TrackingMailStopFieldName').attr('disabled', 'disabled');
            $('#OperatorsIdField').attr('disabled', 'disabled');
            $('#TrackingStatusFieldName').removeAttr('disabled', 'disabled');
            var trackableObj = $('#Trackable').is(':checked');
            var destinationVar = $('#DefaultTrackingId option').size();
            var autoAssignVar = $('#AutoAssignOnAdd').is(':checked');
            DisableAllowRequest(trackableObj, autoAssignVar, destinationVar);
            break;
        case 2:
            $('#Trackable').removeAttr('disabled', 'disabled');
            $('#TrackingRequestableFieldName').attr('disabled', 'disabled');
            $('#InactiveLocationField').attr('disabled', 'disabled');
            $('#ArchiveLocationField').attr('disabled', 'disabled');
            $('#TrackingPhoneFieldName').removeAttr('disabled', 'disabled');
            $('#TrackingMailStopFieldName').removeAttr('disabled', 'disabled');
            $('#OperatorsIdField').removeAttr('disabled', 'disabled');
            $('#TrackingStatusFieldName').removeAttr('disabled', 'disabled');
            break;
        default:
            $('#TrackingRequestableFieldName').attr('disabled', 'disabled');
            $('#InactiveLocationField').attr('disabled', 'disabled');
            $('#ArchiveLocationField').attr('disabled', 'disabled');
            $('#TrackingPhoneFieldName').attr('disabled', 'disabled');
            $('#TrackingMailStopFieldName').attr('disabled', 'disabled');
            $('#OperatorsIdField').attr('disabled', 'disabled');
            $('#TrackingStatusFieldName').removeAttr('disabled', 'disabled');
            $('#Trackable').removeAttr('disabled', 'disabled');
            break;
    }
}

function DisableOutSetup(TrackingOutOn, IsOutField) {
    if (TrackingOutOn == true) {
        $("#OutSetupDiv").removeAttr('disabled', 'disabled');
        DisableOutField(IsOutField);
        $('#DisabledOutId').hide();
    } else {
        $("#OutSetupDiv").attr('disabled', 'disabled');
        $('#DisabledOutId').show();
    }

}

