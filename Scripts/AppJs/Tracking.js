$(function () {
    //get tracking details from database and set it into form
    $.get(urls.Tracking.GetTrackingSystemEntity, function (data) {
        if (data) {
            var result = $.parseJSON(data);
            $('#DefaultDueBackDays').val(result.DefaultDueBackDays);
            $('#MaxHistoryDays').val(result.MaxHistoryDays);
            $('#MaxHistoryItems').val(result.MaxHistoryItems);
            $('#TrackingAdditionalField2Desc').val(result.TrackingAdditionalField2Desc);

            if (result.TrackingOutOn) {
                $('#TrackingOutOn').attr('checked', true);
                $('#DateDueOn').removeAttr('disabled', 'disabled');
                if (result.DateDueOn)
                    $('#DateDueOn').attr('checked', true);
            } else {
                $('#DateDueOn').attr('disabled', 'disabled');
            }
  
            //if (result.ReconciliationOn) {
            //    $('#ReconciliationOn').attr('checked', true);
            //    $('#btnclear').removeAttr('disabled');
            //}
            if (result.TrackingAdditionalField1Desc !== null) {
                $('#TrackingAdditionalField1Desc').val(result.TrackingAdditionalField1Desc);
                $('input:radio[name=fieldtype][value=' + result.TrackingAdditionalField1Type + ']').attr('checked', 'checked');
                $('#btnedit').removeAttr('disabled');
                $('#fieldgroup *').removeAttr('disabled');
            }
            else {
                $('input:radio[name=fieldtype][id=selection_radio]').attr('checked', 'checked');
                $('#btnedit').attr('disabled', 'disabled');
                $('#fieldgroup *').attr('disabled', 'disabled');
            }
            EnableTruncateButton(result.MaxHistoryDays, result.MaxHistoryItems);
            SetSpan(result.SignatureCaptureOn);
            ActiveDueBackDays(result.DateDueOn, result.TrackingOutOn);

            var printVal = $('input:radio[name=fieldtype]:checked').attr('id');
            var trackingFieldVal = $('#TrackingAdditionalField1Desc').val();
            if (printVal !== "text_radio" && trackingFieldVal !== "") {
                $('#btnedit').removeAttr('disabled');
            }
            else {
                $('#btnedit').attr('disabled', 'disabled');
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
    });    //get tracking details from database and set it into form


    //enable/disable "Clear reconciliation" button on click
    //$('#ReconciliationOn').on('click', function () {
    //    if ($('#ReconciliationOn').is(':checked'))
    //        $('#btnclear').removeAttr('disabled');
    //    else
    //        $('#btnclear').attr('disabled', 'disabled');
    //});    //enable/disable "Clear reconciliation" button on click

    $('#btntruncate').on('click', function () {
        $(this).confirmModal({
            confirmTitle: vrCommonRes['msgJsDelConfim'],
            confirmMessage: String.format(vrApplicationRes['msgJsTrackingDelMsg'], '\n'),
            confirmOk: vrCommonRes['Yes'],
            confirmCancel: vrCommonRes['No'],
            confirmStyle: 'default',
            confirmCallback: DeleteTrackingHistory
        });
    });

    //show delete confirmation modal
    //$('#btnclear').on('click', function (data) {
    //    $.post(urls.Tracking.GetReconciliation, function (data) {
    //        if (data) {
    //            var result = $.parseJSON(data);
    //            switch (result) {
    //                case 0:
    //                    showAjaxReturnMessage(vrApplicationRes['msgJsTrackingNoRecInReconcilation'], "w");
    //                    $('#btnclear').attr('disabled', 'disabled');
    //                    break;
    //                case 1:
    //                    $(this).confirmModal({
    //                        confirmTitle: vrCommonRes['msgJsDelConfim'],
    //                        confirmMessage: String.format(vrApplicationRes['msgJsTrackingThisWillDel'], result, '\n'),
    //                        confirmOk: vrCommonRes['Yes'],
    //                        confirmCancel: vrCommonRes['No'],
    //                        confirmStyle: 'default',
    //                        confirmCallback: DeleteReconciliation
    //                    });
    //                    break;
    //                default:
    //                    $(this).confirmModal({
    //                        confirmTitle: vrCommonRes['msgJsDelConfim'],
    //                        confirmMessage: String.format(vrApplicationRes['msgJsTrackingThisWillDel'], result, '\n'),
    //                        confirmOk: vrCommonRes['Yes'],
    //                        confirmCancel: vrCommonRes['No'],
    //                        confirmStyle: 'default',
    //                        confirmCallback: DeleteReconciliation
    //                    });
    //                    break;
    //            }
    //        }
    //    });
    //});    //show delete confirmation modal


    //Show the modal in when click on 'Edit' button
    $('#btnedit').click(function () {
        $('#AddTrackingField').empty();
        $('#AddTrackingField').load(urls.Tracking.TrackingFieldPartialView, function () {
            $('#mdlTrackingField').ShowModel();
            $('#grdField').gridLoad(urls.Tracking.GetTrackingFieldList, vrApplicationRes['msgJsTrackingAddTrackField']);
            setTimeout(function () {
                var vWidth = $(".ui-widget-content").find('div.ui-jqgrid-bdiv').width();
                $(".ui-widget-content").find('div.ui-jqgrid-bdiv').removeAttr('style');
                $(".ui-widget-content").find('div.ui-jqgrid-bdiv').css({ 'height': '100%', 'width': vWidth + 'px' });
            }, 400);

            $('#btnAddField').on('click', function () {
                $('#SLTrackingSelectDataId').val("");
                $('#Id').val("");
                $('#fieldGroup').show();
                $('#btnEditField').attr('disabled', true);
                $('#btnRemoveField').attr('disabled', true);

            });    //Show the modal in edit mode when click on 'Edit' button

            //$('#frmTrackingFieldDetails').validate({
            //    rules: {
            //        FieldName: { required: true },
            //    },
            //    ignore: ":hidden:not(select)",
            //    messages: {
            //        FieldName: "",
            //    },
            //    highlight: function (element) {
            //        $(element).closest('.form-group').addClass('has-error');
            //    },
            //    unhighlight: function (element) {
            //        $(element).closest('.form-group').removeClass('has-error');
            //    },
            //    errorElement: 'span',
            //    errorClass: 'help-block',
            //    errorPlacement: function (error, element) {
            //        if (element.parent('.input-group').length) {
            //            error.insertAfter(element.parent());
            //        } else {
            //            error.insertAfter(element);
            //        }
            //    }
            //});

            //Show div in edit mode and edit a tracking field 
            $('#btnEditField').on('click', function () {
                var selectedRows = $('#grdField').getSelectedRowsIds();
                if (selectedRows.length > 1 || selectedRows.length == 0) {
                    if (selectedRows.length > 1) {
                        showAjaxReturnMessage(vrApplicationRes['msgJsBarCodeSearchOnlyOneRow'], 'w');
                    }
                    else {
                        showAjaxReturnMessage(vrApplicationRes['msgJsTrackingSelectRowToEditData'], 'w');
                    }
                    $('#fieldGroup').hide();
                    return;
                }
                else {
                    $.post(urls.Tracking.GetTrackingField, $.param({ pRowSelected: selectedRows }, true), function (data) {
                        if (data) {
                            var result = $.parseJSON(data);
                            $('#Id').val($.trim(result.Id));
                            $('#SLTrackingSelectDataId').val(result.SLTrackingSelectDataId);
                            $('#btnRemoveField').attr('disabled', true);
                            $('#btnAddField').attr('disabled', true);
                        }
                    });
                    $('#fieldGroup').show();
                }
            });//Show div in edit mode and edit a tracking field 

            $('#btnRemoveField').on('click', function (e) {
                var selectedRows = $('#grdField').getSelectedRowsIds();
                if (selectedRows.length == 0 || selectedRows.length > 1) {
                    if (selectedRows.length > 1) {
                        showAjaxReturnMessage(vrApplicationRes['msgJsBarCodeSearchOnlyOneRow'], 'w');
                    }
                    else {
                        showAjaxReturnMessage(vrApplicationRes['msgJsTrackingSelRow2Remove'], 'w');
                    }
                }
                else {
                    $('#btnEditField').attr('disabled', true);
                    $('#btnAddField').attr('disabled', true);
                    $(this).confirmModal({
                        confirmTitle: vrCommonRes['msgJsDelConfim'],
                        confirmMessage: vrApplicationRes['msgJsTrackingSureToDelTrackingRec'],
                        confirmOk: vrCommonRes['Yes'],
                        confirmCancel: vrCommonRes['No'],
                        confirmStyle: 'default',
                        confirmCallback: DeleteTrackingField,
                        confirmCallbackCancel: DeleteCancel
                    });
                }
            });

            //get data from 'additional tracking field' form and add in database
            $('#btnSaveField').click(function () {
                var $form = $('#frmTrackingFieldDetails');
                if ($form.valid()) {
                    if ($('#Id').val().trim() == "") {
                        showAjaxReturnMessage(vrApplicationRes['msgJsTrackingDescriptionIsRequired'], "w");
                        return;
                    }
                    var serializedForm = $form.serialize();
                    $.post(urls.Tracking.SetTrackingField, serializedForm)
                        .done(function (response) {
                            showAjaxReturnMessage(response.message, response.errortype);
                            if (response.errortype == 's') {
                                $('#btnEditField').attr('disabled', false);
                                $('#btnRemoveField').attr('disabled', false);
                                $('#btnAddField').attr('disabled', false);
                                $('#grdField').refreshJqGrid();
                                $('#fieldGroup').hide();
                            }
                        })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });
                }
            });//get data from 'additional tracking field' form and add in database

            //hide a div in 'additional tracking field' modal
            $('#btnCancelField').click(function () {
                $('#fieldGroup').hide();
                $('#btnEditField').attr('disabled', false);
                $('#btnRemoveField').attr('disabled', false);
                $('#btnAddField').attr('disabled', false);
            });  //hide a div in 'additional tracking field' modal

        });
    });

    //get data from 'additional tracking field' form and add in database
    $('#btnApplyTracking').click(function () {
        SetSignatureData();
        var $form = $('#frmTrackingDetails');
        if ($form.valid()) {
            var serializeFormData = $form.serialize();
            var trackingFieldType = $('input:radio[name=fieldtype]:checked').val();
            var serializeForm = serializeFormData + "&TrackingAdditionalField1Type=" + trackingFieldType + "&pDateDueOn=" + $("#DateDueOn").is(':checked') + "&pTrackingOutOn=" + $("#TrackingOutOn").is(':checked');
            $.post(urls.Tracking.SetTrackingSystemEntity, serializeForm)
                .done(function (response) {
                    showAjaxReturnMessage(response.message, response.errortype);

                }).fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
        }
    });   //get data from 'additional tracking field' form and add in database

    //enable/disable due back input control on change
    $('#DateDueOn').on('change', function () {
        var dateDue = $('#DateDueOn').is(':checked');
        var useOut = $('#TrackingOutOn').is(':checked');
        ActiveDueBackDays(dateDue, useOut);
    });

    $('#TrackingOutOn').on('change', function () {
        var useOut = $('#TrackingOutOn').is(':checked');
        if (useOut) {
            $('#DateDueOn').removeAttr('disabled', 'disabled');
        }
        else {
            $('#DateDueOn').removeAttr('checked', 'checked');
            $('#DateDueOn').attr('disabled', 'disabled');
        }
        var dateDue = $('#DateDueOn').is(':checked');
        ActiveDueBackDays(dateDue, useOut);
    });//enable/disable due back input control on change

    //validation of textbox and allow only numeric number
    $('#MaxHistoryDays').OnlyNumeric();

    $('#MaxHistoryDays').keyup(function (event) {
        var daysVar = $('#MaxHistoryDays').val();
        var itemsVar = $('#MaxHistoryItems').val();
        EnableTruncateButton(daysVar, itemsVar);
    });

    $('#MaxHistoryItems').OnlyNumeric();

    $('#MaxHistoryItems').keyup(function (event) {
        var daysVar = $('#MaxHistoryDays').val();
        var itemsVar = $('#MaxHistoryItems').val();
        EnableTruncateButton(daysVar, itemsVar);
    });

    $('#DefaultDueBackDays').OnlyNumeric();
    //validation of textbox and allow only numeric number

    //enable/disable controls on keyboard event
    $('#TrackingAdditionalField1Desc').keyup(function (event) {
        var trackingFieldValue = $('#TrackingAdditionalField1Desc').val();
        var printVar = $('input:radio[name=fieldtype]:checked').attr('id');
        if (trackingFieldValue !== "") {
            if (printVar !== "text_radio") {
                $('#btnedit').removeAttr('disabled');
            }
            $('#fieldgroup *').removeAttr('disabled', false);
        }
        else {
            $('#btnedit').attr('disabled', 'disabled');
            $('#fieldgroup *').attr('disabled', 'disabled');
        }
    });//enable/disable controls on keyboard event

    //enable/disable button on radio click
    $('input:radio[name=fieldtype]').click(function () {
        var printVar = $('input:radio[name=fieldtype]:checked').attr('id');
        var trackingFieldValue = $('#TrackingAdditionalField1Desc').val();
        if (printVar !== "text_radio" && trackingFieldValue !== "") {
            $('#btnedit').removeAttr('disabled');
        }
        else {
            $('#btnedit').attr('disabled', 'disabled');
        }
    });//enable/disable button on radio click
});
//remove data from database
function DeleteTrackingField() {
    $('#btnEditField').attr('disabled', false);
    $('#btnRemoveField').attr('disabled', false);
    $('#btnAddField').attr('disabled', false);
    var selectedRows = $('#grdField').getSelectedRowsIds();
    $.post(urls.Tracking.RemoveTrackingField, $.param({ pRowSelected: selectedRows }, true), function (data) {
        if (data.errortype == 's') {
            showAjaxReturnMessage(data.message, 's');
            $('#grdField').refreshJqGrid();
            $('#fieldGroup').hide();
        }
        else {
            showAjaxReturnMessage(data.message, 'w');
        }
    });

} //remove data from database

function DeleteCancel() {
    $('#btnEditField').attr('disabled', false);
    $('#btnRemoveField').attr('disabled', false);
    $('#btnAddField').attr('disabled', false);
}

function ActiveDueBackDays(dateDue, useOut) {
    if (dateDue && useOut) 
        $('#DefaultDueBackDays').removeAttr('disabled');
    else 
        $('#DefaultDueBackDays').attr('disabled', 'disabled');
}

function EnableTruncateButton(daysVar, itemsVar) {
    if (daysVar > 0 || itemsVar > 0) {
        $('#btntruncate').removeAttr('disabled');
    }
    else {
        $('#btntruncate').attr('disabled', 'disabled');
    }
}

//clear reconciliation table
//function DeleteReconciliation() {
//    $.post(urls.Tracking.RemoveReconciliation, function (data) {
//        showAjaxReturnMessage(data.message, data.errortype);
//        $('#btnclear').attr('disabled', 'disabled');
//    });
//}//clear reconciliation table

//clear truncate history
function DeleteTrackingHistory() {
    var $form = $('#frmTrackingDetails');
    if ($form.valid()) {
        var serializeFormData = $form.serialize();
        $.post(urls.Tracking.SetTrackingHistoryData, serializeFormData, function (data) {
            //if (data.errortype == "s") {
            //    $.post(urls.Common.TruncateTrackingHistory, function (data) {
            //        showAjaxReturnMessage(data.message, data.errortype);
            //        //if (data.errortype == "s" && data.message == "History has been truncated.") {
            //        //    showAjaxReturnMessage("History has been truncated.", "s");
            //        //}
            //    });
            //}
            //else {
                showAjaxReturnMessage(data.message, data.errortype);
            //}
        });
    }
}//clear truncate history

//set data value based on checked checkboxes
function SetSignatureData() {
    var manualVar = $('#manual_check').is(':checked');
    var trackVar = $('#tracking_check').is(':checked');
    if (manualVar == false && trackVar == false)
        $('#SignatureCaptureOn').val("4");
    if (manualVar == true && trackVar == false)
        $('#SignatureCaptureOn').val("5");
    if (manualVar == false && trackVar == true)
        $('#SignatureCaptureOn').val("6");
    if (manualVar == true && trackVar == true)
        $('#SignatureCaptureOn').val("7");
}//set data value based on checked checkboxes

//Set signature capture checkboxes based on data value
function SetSpan(SignatureVar) {
    switch (SignatureVar) {
        case 4:
            $('#manual_check').removeAttr('checked');
            $('#tracking_check').removeAttr('checked');
            break;
        case 5:
            $('#manual_check').attr('checked', true);
            $('#tracking_check').removeAttr('checked');
            break;
        case 6:
            $('#manual_check').removeAttr('checked');
            $('#tracking_check').attr('checked', true);
            break;
        case 7:
            $('#manual_check').attr('checked', true);
            $('#tracking_check').attr('checked', true);
            break;
        default:
            $('#manual_check').removeAttr('checked');
            $('#tracking_check').removeAttr('checked');
            break;
    }
}//Set signature capture checkboxes based on data value