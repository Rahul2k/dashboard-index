$(function () {
    $('#lstPurgeOptionList').multiselect();
    FillUpdateConfTables();
    var dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + 1);

    $('.datepicker').datepicker({
            dateFormat: getDatePreferenceCookie(), //Changed by Hasmukh on 06/15/2016 for date format changes
            defaultDate: "+1w",
            changeMonth: true,
            changeYear: true,
            maxDate: dateToday,
            beforeShow: function (textbox, instance) {
                var txtBoxOffset = $(this).offset();
                var top = txtBoxOffset.top;
                var left = txtBoxOffset.left;
                var textBoxWidth = $(this).outerWidth();
                //alert(textbox.offsetHeight);
                //console.log('top: ' + top + 'left: ' + left);
                setTimeout(function () {
                    instance.dpDiv.css({
                        top: top - 190, //you can adjust this value accordingly
                        left: left + textBoxWidth//show at the end of textBox
                    });
                }, 0);
        }
    });
    $.ajaxSetup({ cache: false });
    $("#btnSetupAuditTables").on('click', function (e) {
        //$('.eItems').bootstrapDualListbox('destroy');
        var demo2 = $('.eItems').AuditbootstrapDualListbox({
            nonSelectedListLabel: vrApplicationRes['msgJsAuditingAvailTables'],
            selectedListLabel: vrApplicationRes['msgJsAuditingTablesSelected'],
            preserveSelectionOnMove: vrApplicationRes['msgJsAuditingMoved'],
            multipleSelection: false,
            moveOnSelect: false,
            showFilterInputs: false,
            selectorMinimalHeight: 200
        });
        //demo2.trigger('bootstrapduallistbox.refresh');
        $('select[name="duallistbox_demo2"]').parent().find('.moveall').prop('disabled', true);
        BindDualPanel();
        $('#mdlAuditTables').ShowModel();
    });

    //$("#btnAuditProperties").on('click', function (e) {
    //    //alert($('select[name="duallistbox_demo2_helper2"] option:selected').text() + ' : ' + $('#bootstrap-duallistbox-selected-list_duallistbox_demo2 option:selected').text() + ' = ' + $('select[name="duallistbox_demo2_helper2"]').val() + ' = ' + $('select[name="duallistbox_demo2_helper2"]').text());
    //    var selectObject = $('select[name="duallistbox_demo2_helper2"] option:selected');
    //    $("#auditPropName").text(selectObject.text());
    //    ;
    //    if (selectObject.length == 1) {
    //        $.post(urls.Auditing.GetAuditPropertiesData, { pTableId: selectObject.val() == null || selectObject.val() == undefined ? -1 : selectObject.val() })
    //            .done(function (data) {
    //                if (data.errortype == 's') {
    //                    $("#chkConfData").attr('checked', data.isconfchecked);
    //                    $("#chkUpdates").attr('checked', data.isupdatechecked);
    //                    $("#chkAttachments").attr('checked', data.isattachchecked);
    //                    $("#chkConfData").attr('disabled', data.confenabled);
    //                    $("#chkAttachments").attr('disabled', data.attachenabled);

    //                    $('#mdlAuditProperties').ShowModel();
    //                    $('#hdnIsPopView').val(1);
    //                }
    //                else {
    //                    showAjaxReturnMessage(data.message, data.errortype);
    //                }
    //            })
    //            .fail(function (xhr, status, error) {
    //                ShowErrorMessge();
    //            });
    //    }
    //    else {
    //        showAjaxReturnMessage('Please select one from selected record', 'e');
    //    }
        

    //});

    //$("#btnSaveAuditProp").on('click', function (e) {
    //    var vTableId = $('select[name="duallistbox_demo2_helper2"] option:selected').val();
    //    var vchkConfData = $("#chkConfData").is(":checked") ? "true" : "false";
    //    var vchkUpdates = $("#chkUpdates").is(":checked") ? "true" : "false";
    //    var vchkAttachments = $("#chkAttachments").is(":checked") ? "true" : "false";
    //    ;
    //    $.post(urls.Auditing.SetAuditPropertiesData, { pTableId: vTableId, pAuditConfidentialData: vchkConfData, pAuditUpdate: vchkUpdates, pAuditAttachments: vchkAttachments })
    //            .done(function (response) {
    //                if (response.errortype == 's') {
    //                    //CancelAuditPropertiesChange();
    //                    $('#hdnIsPopView').val(0);
    //                    $('#mdlAuditProperties').HideModel();
    //                }
    //                showAjaxReturnMessage(response.message, response.errortype);
    //            })
    //            .fail(function (xhr, status, error) {
    //                ShowErrorMessge();
    //            });

    //});

    $("#btnCancelAudit").on('click', function (e) {
        $('#mdlAuditProperties').resetControls();
    });

    $("#btnAuditTablesClose").on('click', function (e) {
        FillUpdateConfTables();
        $("#mdlAuditTables").HideModel();
    });

    // Add/Edit validation
    $('#frmPurgeData').validate({
        rules: {
            PurgeDate: { required: true }
        },
        ignore: ":hidden:not(select)",
        messages: {
            PurgeDate: ""
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            //if (element.parent('.input-group').length) {
            //    error.insertAfter(element.parent());
            //} else {
            //    error.insertAfter(element);
            //}
        }
    });
    // Add/Edit validation

    $("#btnPurgeData").on('click', function (e) {
        var vPurgeDate = $("#PurgeDate").val();
        var vchkPurgeUpdateData = $("#chkPurgeUpdateData").is(":checked") ? "true" : "false";
        var vchkPurgeConfData = $("#chkPurgeConfData").is(":checked") ? "true" : "false";
        var vchkPurgeSucsLoginData = $("#chkPurgeSucsLoginData").is(":checked") ? "true" : "false";
        var vchkPurgeFailLoginData = $("#chkPurgeFailLoginData").is(":checked") ? "true" : "false";
        var vpurgeDate = $("#PurgeDate").val();

        if (vchkPurgeUpdateData == "false" && vchkPurgeConfData == "false" && vchkPurgeSucsLoginData == "false" && vchkPurgeFailLoginData == "false") {
            showAjaxReturnMessage(vrApplicationRes['msgJsAuditingWantToPurge'], 'w');
            return false;
        }
        
        if ($('#frmPurgeData').valid()) {
            var msg = '';
            if (vchkPurgeUpdateData == "true")
                msg = msg + vrApplicationRes['lblAuditingPartialUpdates'] + ',';
            if (vchkPurgeConfData == "true")
                msg = msg + vrApplicationRes['msgJsAuditingConfidentialAccess'] + ',';
            if (vchkPurgeSucsLoginData == "true")
                msg = msg + vrApplicationRes['msgJsAuditingSuccessfulLogins'] + ',';
            if (vchkPurgeFailLoginData == "true")
                msg = msg + vrApplicationRes['msgJsAuditingFailedLogins'] + ', ';
            msg = String.format(vrApplicationRes['msgJsAuditingPurge'],msg.slice(0, -1), vpurgeDate);
            $(this).confirmModal({
                confirmTitle: vrApplicationRes['msgJsAuditingPurgeConfirm'],
                confirmMessage: msg, //'Are you sure you want to purge data from selected audit tables?',
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmCallback: PurgeAuditData
            });
        }
        return true;
    });

});

function PurgeAuditData() {
    var vPurgeDate = $("#PurgeDate").val();
    var vchkPurgeUpdateData = $("#chkPurgeUpdateData").is(":checked") ? "true" : "false";
    var vchkPurgeConfData = $("#chkPurgeConfData").is(":checked") ? "true" : "false";
    var vchkPurgeSucsLoginData = $("#chkPurgeSucsLoginData").is(":checked") ? "true" : "false";
    var vchkPurgeFailLoginData = $("#chkPurgeFailLoginData").is(":checked") ? "true" : "false";

    $.post(urls.Auditing.PurgeAuditData, { pPurgeDate: vPurgeDate, pUpdateData: vchkPurgeUpdateData, pConfData: vchkPurgeConfData, pSuccessLoginData: vchkPurgeSucsLoginData, pFailLoginData: vchkPurgeFailLoginData })
                       .done(function (response) {
                           if (response.errortype == 's') {
                           }
                           showAjaxReturnMessage(response.message, response.errortype);
                       })
                       .fail(function (xhr, status, error) {
                           ShowErrorMessge();
                       });
}

function BindDualPanel() {
    $.getJSON(urls.Common.GetTableList, function (data) {
        var pOutputObject = $.parseJSON(data);
        $('#SelectProduct').empty();
        $.each(pOutputObject, function (i, item) {

            if ((item.AuditConfidentialData) || (item.AuditUpdate) || (item.AuditAttachments))
                $('.eItems').append("<option value=" + item.TableId + " selected='selected'>" + item.UserName + "</option>");
            else
                $('.eItems').append("<option value=" + item.TableId + "  >" + item.UserName + "</option>");
        });
        $('.eItems').AuditbootstrapDualListbox('refresh', true);
    });

}

function FillUpdateConfTables() {
    $.getJSON(urls.Auditing.GetTablesForLabel, function (data) {
        if (data.errortype == 's') {
            var pOutputObject = $.parseJSON(data.ltablelist);
            $("#ulUpdateTable").empty();
            $("#ulConfTable").empty();
            $.each(pOutputObject, function (i, item) {

                if (item.AuditUpdate == true)
                    $("#ulUpdateTable").append("<li>" + item.UserName + "</li>");
                if (item.AuditConfidentialData == true || item.AuditAttachments == true)
                    $("#ulConfTable").append("<li>" + item.UserName + "</li>");
            });
        }
    });
}

function sortUL(selector) {
    $(selector).children("option").sort(function (a, b) {
        var upA = $(a).text().toUpperCase();
        var upB = $(b).text().toUpperCase();
        return (upA < upB) ? -1 : (upA > upB) ? 1 : 0;
    }).appendTo(selector);
}



