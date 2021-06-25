var jsTreeName = '#jstree_reports_div';

$(function () {
    $.ajaxSetup({ cache: false });
});

function ReportRootItemClick(vRootId) {
    if (vRootId != undefined) {
        var vNodeId = vRootId.trim().split('_')[1];
        var root = $('#' + vRootId).parent().parent().parent().find('a')[0].id;
        $('#' + root).parent().find('#ulReports li ul').find('a').removeClass('selectedMenu');
        setCookie('hdnAdminMnuIds', (root + '|' + vRootId), 1);
        $('#' + vRootId).parent().find('ul li a').removeAttr('style');
        $('#title, #navigation').text(vrCommonRes['mnuReports']);
        $.ajax({
            url: urls.Reports.ReportListPartial,
            contentType: 'application/html; charset=utf-8',
            type: 'GET',
            dataType: 'html'
        }).done(function (result) {
            $('#LoadUserControl').empty();
            $('#LoadUserControl').html(result);
            /* Secuirty Integration - Added by Ganesh*/
            if (!IS_ADMIN) {
                $('#btnAdd').remove();
                $('#btnDelete').remove();
            }
            /* End Security Integration */
            $('#pnlReports').show();
            $("#btnAdd").on('click', function () {
                GetReportsView(0, "", "", 1);
            });

            //Report Definitions => EDIT Feature.
            $("#btnEdit").on('click', function () {
                if ($("#lstReportList :selected").length > 0) {
                    var vReportID = $("#lstReportList :selected").val().split('_')[1];
                    var tableName = $("#lstReportList :selected").text();
                    var reportName = $("#lstReportList :selected").text();
                    tableName = tableName.split('(')[1].replace(")", "").trim();
                    reportName = reportName.split('(')[0].replace(")", "").trim();

                    GetReportsView(vReportID, tableName, reportName, 0);
                    $('.drillDownMenu').find('a').removeClass('selectedMenu');
                    $('#FALRPT_' + vReportID).addClass('selectedMenu');
                }
                else {//Modified by Hemin
                    showAjaxReturnMessage(vrReportsRes["msgJsReportsPlzSelectAtLeast1Row"], "w");
                }
            });

            //Report Definitions => DELETE Feature.
            $("#btnDelete").on('click', function () {
                if ($("#lstReportList :selected").length > 0) {
                    var vReportID = $("#lstReportList :selected").val().split('_')[1];
                    var combinval = vReportID;

                    $(this).confirmModal({
                        confirmTitle: 'TAB FusionRMS',
                        //Modified by Hemin
                        confirmMessage: vrReportsRes['msgJsReportsRUSureUWant2DelTheSelectedRpt'],
                        confirmOk: vrCommonRes['Yes'],
                        confirmCancel: vrCommonRes['No'],
                        confirmStyle: 'default',
                        confirmObject: combinval,
                        confirmCallback: DeleteReport
                    });
                }
                else {
                    //Modified By Hemin
                    showAjaxReturnMessage(vrReportsRes["msgJsReportsPlzSelectAtLeast1Row"], "w");
                }
            });
            var vChildNode = $('#' + vRootId).parent().find('ul li');
            $('#lstReportList').empty();

            //Modified By Akruti
            if (vChildNode.length == 0){
                $("#btnDelete").attr('disabled', 'disabled');
                $("#btnEdit").attr('disabled', 'disabled');
            }
            else{
                $("#btnDelete").removeAttr('disabled');
                $("#btnEdit").removeAttr('disabled');
            }
         
            var elemId = '';
            var elemText = '';
            var firstChildId = '';
            $(vChildNode).each(function (index, value) {
                elemId = value.innerHTML.split('id="')[1].split('"')[0];
                elemText = value.innerHTML.split('">')[1].split('</')[0];
                if (index == 0) {
                    firstChildId = elemId;
                }
                $('#lstReportList').append("<option value='" + elemId + "'>" + elemText + "</option>");
            });

            if (vChildNode.length >= 1) { $("#lstReportList").val(firstChildId); }
        })
        .fail(function (xhr, status) {
            ShowErrorMessge();
        });
    }
}

function ReportStyleRootItemClick(vRootId) {
    var root = $('#' + vRootId).parent().parent().parent().find('a')[0].id;
    $('#' + root).parent().find('#ulReports li ul').find('a').removeClass('selectedMenu');
    setCookie('hdnAdminMnuIds', (root + '|' + vRootId), 1);
    $('#' + vRootId).parent().find('ul li a').removeAttr('style');
    $('#title, #navigation').text(vrCommonRes['mnuReports']);
    GetReportStyleGrid();
}

function ReportStyleChildItemClick(root, firstLvl, vChildId) {
    setCookie('hdnAdminMnuIds', (root + '|' + firstLvl + '|' + vChildId), 1);
    $('ul#ulReports li ul.displayed li a').removeAttr('style');
    $('.divMenu').find('a.selectedMenu').removeClass('selectedMenu');
    $('#' + vChildId).addClass('selectedMenu');
    var pReportStyleId = $('#' + vChildId).html().trim();
    GetReportStyleView(pReportStyleId);
}

function ReportChildItemClick(root, firstLvl, vChildId) {
    var vReportId = vChildId.split('_')[1];
    $('#title, #navigation').text(vrCommonRes['mnuReports']);
    setCookie('hdnAdminMnuIds', (root + '|' + firstLvl + '|' + vChildId), 1);
    $('ul#ulReports li ul.displayed li a').removeAttr('style');
    $('.divMenu').find('a.selectedMenu').removeClass('selectedMenu');
    $('#' + vChildId).addClass('selectedMenu');
    var tableName = "";
    var reportName = "";
    tableName = $('#' + vChildId).html().trim().split('(')[1].replace(")", "").trim();
    reportName = $('#' + vChildId).html().trim().split('(')[0].replace(")", "").trim();
    GetReportsView(vReportId, tableName, reportName, 0);
}