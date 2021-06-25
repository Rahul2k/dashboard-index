var signatureVar;
var TableName = "";
var TableId = "";
var targetId = "tableGeneral";
var DispositionTable = null;
var DispositionType = null;
var dispositionFlag = false;
var IsTrackable = false;
var trackableFlag = false;
var trackableValue = false;
var DispositionTableAttach = null;

$(function () {
    /* Secuirty Integration - Added by Ganesh*/
    if (!IS_ADMIN) {
        $('#tabRetention').remove();
    }
    /* End Security Integration */
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        targetId = $(e.target).attr("id");
        //Added by Hasmukh for fix : FUS-2317
        TableId = $("#hdnTableId").val();
        BindTableTabInfo(targetId);
    });
});
function loadTabData(e, linkId) {
    e.stopPropagation();
    TableName = $(linkId).attr("id");
    TableId = $(linkId).attr("name");
    $("#ulTable li a").each(function (a, b) {
        $(this).removeClass('selectedMenu');
    });
    $('.divMenu').find('a.selectedMenu').removeClass('selectedMenu');
    linkId.addClass('selectedMenu');
    $('#tableLabel').html($(linkId).text());
    var currentTab = $("#divTableTab").find('ul').find('li.active > a').attr('id');
    if (currentTab == undefined)
        targetId = "tableGeneral";
    BindTableTabInfo(targetId);
    TableName = $(linkId).attr("id");
    $("#divTableTab").show();
    $("#ulTable").find('li').find('.fa-play-circle').removeClass('fa-play-circle').addClass('fa-circle-o');
    linkId.find('i').removeClass('fa-circle-o').addClass('fa-play-circle');
    setCookie('hdnAdminMnuIds', ('Tables|' + TableName), 1);
    /* Hasmukh : Added on 04/04/2016 - Security check */
    CheckModuleLevelAccess("liTables");
}

//Code for Retention Tab
function BindTableTabInfo(targetId) {
    switch (targetId) {
        case "tableGeneral":
            GetTableGeneralData(TableName);
            break;
        case "tabTableFields":
            LoadFieldsView(TableName);
            break;
        case "tableTracking":
            GetTableTrackingData(TableName);
            break;
        case "tabRetention":
            loadTableRetentionInformation();
            break;
        case "tabFileRoomOrder":
            LoadFileRoomOrderView(TableName);
            break;
        case "tableAdvanced":
            LoadTableAdvancedData(TableName);
            break;
    }
}
function LoadOutField(DDLListId, outFieldJSONList) {
    $(DDLListId).empty();
    $(outFieldJSONList).each(function (i, item) {
        $(DDLListId).append("<option value=" + item.Key + ">" + item.Value + "</option>");
    });
}