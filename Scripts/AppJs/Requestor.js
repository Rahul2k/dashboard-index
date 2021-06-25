$(function () {
    //input spinner for interval time and copies
    var copiesSpinner = $("#copies_number").spinner();
    var intervalSpinner = $("#interval_time").spinner();
    //input spinner for interval time and copies

    //get requestor details from database and set it into form
    $.get(urls.Requestor.GetRequestorSystemEntity, function (data) {
        if (data) {
            var result = $.parseJSON(data);
            $('input:radio[name=confirm_type][value=' + result.RequestConfirmation + ']').attr('checked','checked');
            $('input:radio[name=id_type][value=' + result.ReqAutoPrintIDType + ']').attr('checked', 'checked');
            $('input:radio[name=print_method][value=' + result.ReqAutoPrintMethod + ']').attr('checked', 'checked');
            if (result.AllowWaitList)
                $('#AllowWaitList').attr('checked', true);
            else
                $('#AllowWaitList').attr('checked', false);
            if (result.PopupWaitList)
                $('#PopupWaitList').attr('checked', true);
            else
                $('#PopupWaitList').attr('checked', false);
            if (result.ReqAutoPrintMethod) {
                $('#label_setup *').prop("disabled", false);
                copiesSpinner.spinner({ disabled: false });
            }
            else {
                $('#label_setup *').prop("disabled", true);
                copiesSpinner.spinner({ disabled: true });
            }
            $("#copies_number").val(result.ReqAutoPrintCopies);
            $("#interval_time").val(result.ReqAutoPrintInterval);
            var SelectConfirmVar = $('input:radio[name=confirm_type]:checked').attr('id');
            var SelectIdVar = $('input:radio[name=id_type]:checked').attr('id');
            SetConfirmTypeLabel(SelectConfirmVar);
            SetIdTypeVar(SelectIdVar);

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
        else
        {
            showAjaxReturnMessage(data.message, data.errortype);
        }
    });    //get requestor details from database and set it into form

    //get data from requestor form and add it into database
    $("#btnApplyRequestor").on('click', function (e) {
        var $form = $('#frmRequestorDetails');
        if ($form.valid()) {
            var ConfirmTypeVar = $('input:radio[name=confirm_type]:checked').val();
            var PrintMethodVar = $('input:radio[name=print_method]:checked').val();
            var IdTypeVar = $('input:radio[name=id_type]:checked').val();
            var AllowListVar = $('#AllowWaitList').is(':checked');
            var PopupListVar = $('#PopupWaitList').is(':checked');
            var PrintCopiesVar = copiesSpinner.spinner('value');
            var PrintIntervalVar = intervalSpinner.spinner('value');
            if (PrintCopiesVar === null) {
                PrintCopiesVar = "1";
                $("#copies_number").val(PrintCopiesVar);
            }
            //if (PrintCopiesVar === null) {
            //    showAjaxReturnMessage("Print copy is required", "w");
            //}
            if (PrintIntervalVar === null) {
                showAjaxReturnMessage(vrApplicationRes["msgJsRequestorIntrFieldReq"], "w");
            }
            else {
                $.post(urls.Requestor.SetRequestorSystemEntity, { pConfirmType: ConfirmTypeVar, pPrintMethod: PrintMethodVar, pIdType: IdTypeVar, pAllowList: AllowListVar, pPopupList: PopupListVar, pPrintCopies: PrintCopiesVar, pPrintInterval: PrintIntervalVar })
                        .done(function (response) {
                            if (response.errortype == 's') {
                                showAjaxReturnMessage(response.message, response.errortype);
                            }
                        }).fail(function (xhr, status, error) {
                            ShowErrorMessge();
                        });
            }
        }

    });    //get data from requestor form and add it into database


    //disable/enable popup wait list checkbox
    $('#AllowWaitList').on('change', function () {
        if($(this).is(':checked'))
        {
            $('#PopupWaitList').removeAttr('disabled');
        }
        else
        {
            $('#PopupWaitList').attr('checked', false);
            $('#PopupWaitList').attr('disabled', 'disabled');
        }
    }); //disable/enable popup wait list checkbox


    //Display message window on confirm radio change
    $("input:radio[name=confirm_type]").click(function () {
        var SelectConfirmVar = $('input:radio[name=confirm_type]:checked').attr('id');
        SetConfirmTypeLabel(SelectConfirmVar);
    });

    $("input:radio[name=id_type]").click(function () {
        var SelectIdVar = $('input:radio[name=id_type]:checked').attr('id');
        SetIdTypeVar(SelectIdVar);
    });    //Display message window on id radio change


    //enable/disable division based on radio select
    $("input:radio[name=print_method]").click(function () {
        var SelectPrintVar = $('input:radio[name=print_method]:checked').attr('id');
        $('#copies_number').val("1");
        if(SelectPrintVar=='report_radio')
        {
            $('#label_setup *').attr("disabled", true);
            copiesSpinner.spinner({ disabled: true });
        }
        else
        {
            $('#label_setup *').attr("disabled", false);
            copiesSpinner.spinner({ disabled: false });
        }
    }); //enable/disable division based on radio select


    //validation of number and length of number
    $('#interval_time').keypress(function (event) {
        if ((event.which != 8 && isNaN(String.fromCharCode(event.which))) || (event.which == 32)) {
            event.preventDefault();
            } 
    });

    $('#copies_number').keypress(function (event) {
        if ((!((event.which > 48 && event.which < 58) || (event.which == 32)))) 
            event.preventDefault();
    });//validation of number and length of number

    $('#copies_number').keydown(function (event) {
        if (event.which==8 || event.which==46) 
            event.preventDefault();
    });

    //$('#copies_number').OnlyNumeric();

//Display confirmation modal on button click
     $("#btnPurgeFulfilled").on('click', function (e) {
         $(this).confirmModal({
             confirmTitle: 'TAB FusionRMS',
             confirmMessage: String.format(vrApplicationRes['msgJsRequestorTABFusionRMSMsg'],'\n'),
             confirmOk: vrCommonRes['Yes'],
             confirmCancel: vrCommonRes['No'],
             confirmStyle: 'default',
             confirmCallback: PurgeFulfilledRequest
         });
     });

     $("#btnPurgeDeleted").on('click', function (e) {
         $(this).confirmModal({
             confirmTitle: 'TAB FusionRMS',
             confirmMessage: String.format(vrApplicationRes['msgJsRequestorPurgeDelMsg'], '\n'),
             confirmOk: vrCommonRes['Yes'],
             confirmCancel: vrCommonRes['No'],
             confirmStyle: 'default',
             confirmCallback: PurgeDeletedRequest
         });
     });

     $("#btnResetLabel").on('click', function (e) {
         $(this).confirmModal({
             confirmTitle: 'TAB FusionRMS',
             confirmMessage:String.format(vrApplicationRes['msgJsRequestorRestLblMsg'],"Requestor Default Label",'\n'),
               //  confirmMessage: vrApplicationRes["msgJsRequestorRestLblMsg"] + " " + "\"Requestor Default Label\"" + " " + vrApplicationRes["msgJsRequestorRestLblMsgL2"] + '\n' + vrApplicationRes["msgJsRequestorTABFusionRMSMsg2"],
             confirmOk: vrCommonRes['Yes'],
             confirmCancel: vrCommonRes['No'],
             confirmStyle: 'default',
             confirmCallback: ResetLabel
         });
     });
});//Display confirmation modal on button click

function SetConfirmTypeLabel(SelectConfirmTypeVar)
{
    switch (SelectConfirmTypeVar) {
        case 'once_radio':
            $('#confirm_label').text(vrApplicationRes["lblJsRequestorSelectConfTypOnceRadio"]);
            break;
        case 'always_radio':
            $('#confirm_label').text(vrApplicationRes["lblJsRequestorSelectConfTypAlwaysRadio"]);
            break;
        case 'never_radio':
            $('#confirm_label').text(vrApplicationRes["lblJsRequestorSelectConfTypNeverRadio"]);
            break;
        default:
            $('#confirm_label').text(vrApplicationRes["lblJsRequestorSelectConfTypConfLbl"]);
            break;
    }
}

function SetIdTypeVar(SelectIdTypeVar)
{
    switch (SelectIdTypeVar) {
        case 'individual_radio':
            $('#idcreation_label').text(vrApplicationRes["lblJsRequestorSelectTypIndividualRadio"]);
            break;
        case 'group_radio':
            $('#idcreation_label').text(vrApplicationRes["lblJsRequestorSelectTypGrpRadio"]);
            break;
        default:
            $('#idcreation_label').text(vrApplicationRes["lblJsRequestorSelectTypIndividualRadio"]);
            break;
    }
}

//Remove data from database on button click
function PurgeFulfilledRequest() {
    var statusValue = "Fulfilled";
    $.post(urls.Requestor.RemoveRequestorEntity, $.param({ statusVar: statusValue }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
    });
}
function PurgeDeletedRequest() {
    var statusValue = "Deleted";
    $.post(urls.Requestor.RemoveRequestorEntity, $.param({ statusVar: statusValue }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
    });
}

function ResetLabel() {
    var tableVar = "SLRequestor";
    $.post(urls.Requestor.ResetRequestorLabel, $.param({ tableName: tableVar }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
    });
}//Remove data from database on button click


