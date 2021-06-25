$(function () {
    LoadActiveInActiveRetPeriodTables();

    $("#txtInterval").OnlyNumeric();

    $("#btnApply").click(function () {
        var vIsUseCitaions = $("#chkUseCitation").is(":checked") ? false : true;
        var vYearEnd = $("#lstYear").val();
        var vInactivityPeriod = $("#txtInterval").val();
        if (vInactivityPeriod == 0) {
            $("#txtInterval").val("1440");
            vInactivityPeriod = 1440;
        }

        $.post(urls.Retention.SetRetentionParameters, $.param({ pIsUseCitaions: vIsUseCitaions, pYearEnd: vYearEnd, pInactivityPeriod: vInactivityPeriod }, true), function (data) {
            if (data.errortype == "s") {
                showAjaxReturnMessage(data.message, data.errortype);
            }
            else
            {
                ShowErrorMessge();
            }
        });

    });


    $("#btnSetupRetentionTables").click(function () {

        var retentionListBox = $('.eItems').RetentionbootstrapDualListbox({
            nonSelectedListLabel: vrRetentionRes["msgJsAdminRetentionAvailblTbls"],
            selectedListLabel: vrRetentionRes["msgJsAdminRetentionTblsSel"],
            preserveSelectionOnMove: 'moved',
            multipleSelection: false,
            moveOnSelect: false,
            showFilterInputs: false,
            selectorMinimalHeight: 200
        });

        $('select[name="duallistbox_Retention"]').parent().find('.moveall').prop('disabled', true);
        BindDualPanel();
        $('#mdlRetentionTables').ShowModel();
    });

    $("#btnClose").click(function () {
        LoadActiveInActiveRetPeriodTables();
    });

    $("#btnRetentionTablesClose").click(function () {
        //console.log("btnCancelRetention.....");
        LoadActiveInActiveRetPeriodTables();
    });
});

function BindDualPanel() {
    $.getJSON(urls.Common.GetTableList, function (data) {
        var pOutputObject = $.parseJSON(data);
        $('#SelectRetentionTableName').empty();
        $.each(pOutputObject, function (i, item) {

            if (item.UserName != 'Operators') {
                if ((item.RetentionPeriodActive == true) || (item.RetentionInactivityActive == true))
                    $('.eItems').append("<option value=" + item.TableId + " selected='selected' >" + item.UserName + "</option>");
                else
                    $('.eItems').append("<option value=" + item.TableId + "  >" + item.UserName + "</option>");
            }
        });
        $('.eItems').RetentionbootstrapDualListbox('refresh', true);
    });

}

function LoadActiveInActiveRetPeriodTables() {
    var IsDataExists = false;

    $("#chkUseCitation").prop('checked', false);
    $("#lstYear").val("1");
    $("#txtInterval").val("");

    $.getJSON(urls.Retention.GetRetentionPeriodTablesList, function (data) {
        if (data.errortype == 's') {
            var pOutputObject = $.parseJSON(data.ltablelist);
            var pSystemObject = $.parseJSON(data.lsystemlist);
            var pServiceObject = $.parseJSON(data.lservicelist);
            var IsUseCitation = pSystemObject[0].RetentionTurnOffCitations == true ? false : true;

            //console.log("pSystemObject: " + pSystemObject[0].RetentionYearEnd);

            $("#ulRetentionActiveTables").empty();
            $("#ulRetentionInactiveTables").empty();
            $.each(pOutputObject, function (i, item) {

                if (item.UserName != 'Operators') {
                    if (item.RetentionPeriodActive == true) {
                        IsDataExists = true;
                        $("#ulRetentionActiveTables").append("<li>" + item.UserName + "</li>");
                    }

                    if (item.RetentionInactivityActive == true) {
                        IsDataExists = true;
                        $("#ulRetentionInactiveTables").append("<li>" + item.UserName + "</li>");
                    }
                }

            });

            if (IsDataExists == false) {
                $("#chkUseCitation").attr('disabled', 'disabled');
                $("#lstYear").attr('disabled', 'disabled');
            }
            else {
                $("#chkUseCitation").removeAttr('disabled', 'disabled');
                $("#lstYear").removeAttr('disabled', 'disabled');
            }

            $("#chkUseCitation").prop('checked', IsUseCitation);
            $("#lstYear").val(pSystemObject[0].RetentionYearEnd.toString());
            var str = (pServiceObject[0].Interval).toString();
            $("#txtInterval").val(str.substr(0, 4));

        }
    });


}