var Level1 = 0;
var Level2 = 1;
var Level3 = 3;
var vOldReportName;
var resetViewId = false;

$(document).ready(function () {
    getResourcesByModule('clients');
});
//Load the View for reports
function GetReportsView(reportID, tableName, reportName, bAdd) {
    $.ajax({
        url: urls.Reports.LoadReportsView,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html'
    })
    .done(function (result) {
        $('#LoadUserControl').empty();
        $('#LoadUserControl').html(result);

        $("#txtReportName").val("");
        $("#btnLevel1Edit, #btnLevel2Edit, #btnLevel3Edit").attr('disabled', 'disabled');
        $("#btnLevel1Delete, #btnLevel2Delete, #btnLevel3Delete").attr('disabled', 'disabled');
        $("#btnRemoveLevel").hide();

        //OnlyNumericWithDot
        $("#txtLevel1LeftIntent").OnlyNumericWithDot();
        $("#txtLevel1RightIntent").OnlyNumericWithDot();
        $("#txtLevel1LeftMargin").OnlyNumericWithDot();
        $("#txtLevel1RightImgWidth").OnlyNumericWithDot();

        $("#txtLevel2LeftIntent").OnlyNumericWithDot();
        $("#txtLevel2RightIntent").OnlyNumericWithDot();
        $("#txtLevel2LeftMargin").OnlyNumericWithDot();
        $("#txtLevel2RightImgWidth").OnlyNumericWithDot();

        $("#txtLevel3LeftIntent").OnlyNumericWithDot();
        $("#txtLevel3RightIntent").OnlyNumericWithDot();
        $("#txtLevel3LeftMargin").OnlyNumericWithDot();
        $("#txtLevel3RightImgWidth").OnlyNumericWithDot();

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            targetId = $(e.target).attr("id");
            switch (targetId) {
                case "aPane1":
                    $("#btnRemoveLevel").hide();
                    cloneActionButtons();
                    break;
                case "aPane2":
                    $("#btnRemoveLevel").show();
                    cloneActionButtons();
                    break;
                case "aPane3":
                    $("#btnRemoveLevel").show();
                    cloneActionButtons();
                    break;
                default:
                    break;
            }
        });

        $("#lstReportStyle").on('change', function () {
            var bExists = $('#lstReportStyle').find('option[value=0]').length > 0;
            if (bExists)
                $("#lstReportStyle option[value='0']").remove();
        });

        LoadInitialReportData(reportID, tableName, reportName, bAdd);
        
        //Added by Akruti
        //Display level 1 ViewColumn form on 'Add' button click
        $("#btnLevel1Add").on('click', function () {
            var viewsId = $("#lstLevel1ViewName").val();
            var LevelNum = 1;
            var currentHeading = $("#ulLevel1Cols li.highlightClass").text();
            var reportName = $("#txtReportName").val();
            var tableName = $('#lstLevel1TblName :selected').val();
            if (!tableName) {
                showAjaxReturnMessage(vrClientsRes["msgJsAdminReportTblMustBeSelected"], "w");
                return false;
            }
            if (viewsId == null || viewsId == "") {
                showAjaxReturnMessage(String.format(vrClientsRes["msgJsAdminReportTblMustContainAnyView"], tableName), "w");
                return false;
            }
            LoadReportColumn(tableName, reportName, viewsId, LevelNum, currentHeading, true);
            return true;
        });

        //Display level 1 ViewColumn form on 'Edit' button click
        $('#btnLevel1Edit').on('click', function () {
            var viewsId = $("#lstLevel1ViewName").val();
            var currentId = $("#ulLevel1Cols li.highlightClass").attr('id');
            var currentHeading = $("#ulLevel1Cols li.highlightClass").text();
            var LevelNum = 1;
            var tableName = $('#lstLevel1TblName :selected').val();
            LoadReportColumn(tableName, currentId, viewsId, LevelNum, currentHeading, false);

        });

        //Display level 2 ViewColumn form on 'Add' button click
        $("#btnLevel2Add").on('click', function () {
            var viewsId = $("#lstLevel2ViewName").val();
            var LevelNum = 2;
            var currentHeading = $("#ulLevel2Cols li.highlightClass").text();
            var tableName = $('#lstLevel2TblName :selected').val();
            if (!tableName) {
                showAjaxReturnMessage(vrClientsRes["msgJsAdminReportTblMustBeSelected"], "w");
                return false;
            }
            if (viewsId == null || viewsId == "") {
                showAjaxReturnMessage(String.format(vrClientsRes["msgJsAdminReportTblMustContainAnyView"], tableName), "w");
                return false;
            }
            LoadReportColumn(tableName, reportName, viewsId, LevelNum, currentHeading, true);
            return true;
        });

        //Display level 2 ViewColumn form on 'Edit' button click
        $('#btnLevel2Edit').on('click', function () {
            var viewsId = $("#lstLevel2ViewName").val();
            var currentId = $("#ulLevel2Cols li.highlightClass").attr('id');
            var LevelNum = 2;
            var currentHeading = $("#ulLevel2Cols li.highlightClass").text();
            var tableName = $('#lstLevel2TblName :selected').val();
            LoadReportColumn(tableName, currentId, viewsId, LevelNum, currentHeading, false);
        });

        //Display level 3 ViewColumn form on 'Add' button click
        $("#btnLevel3Add").on('click', function () {
            var viewsId = $("#lstLevel3ViewName").val();
            var LevelNum = 3;
            var currentHeading = $("#ulLevel3Cols li.highlightClass").text();
            var tableName = $('#lstLevel3TblName :selected').val();
            if (!tableName) {
                showAjaxReturnMessage(vrClientsRes["msgJsAdminReportTblMustBeSelected"], "w");
                return false;
            }
            if (viewsId == null || viewsId == "") {
                showAjaxReturnMessage(string.format(vrClientsRes["msgJsAdminReportTblMustContainAnyView"], tableName), "w");
                return false;
            }
            LoadReportColumn(tableName, reportName, viewsId, LevelNum, currentHeading, true);
            return true;
        });

        //Display level 3 ViewColumn form on 'Edit' button click
        $('#btnLevel3Edit').on('click', function () {
            var viewsId = $("#lstLevel3ViewName").val();
            var currentId = $("#ulLevel3Cols li.highlightClass").attr('id');
            var LevelNum = 3;
            var currentHeading = $("#ulLevel3Cols li.highlightClass").text();
            var tableName = $('#lstLevel3TblName :selected').val();
            LoadReportColumn(tableName, currentId, viewsId, LevelNum, currentHeading, false);
        });
        //Added by Akruti

        //APPLY
        $(".btnRptsApply").on('click', function () {
            if ($("#lstLevel1TblName").val() != '') {
                SetViewColumnIds();
                $("#lstLevel1TblName, #lstLevel2TblName, #lstLevel3TblName").removeAttr('disabled');

                //Since disabled state value can't be passed in serialized form needs to remote attribute.
                $("#chkLevel1IncludeFooters, #chkLevel2IncludeFooters, #chkLevel3IncludeFooters").removeAttr('disabled');
                var $form = $('#frmReportDefinitionsPartial');
                var levelCount = 0;
                var bIsDisabled = false;

                if ($('#chkLevel1IncludeImg').prop('disabled')) {
                    $('#chkLevel1IncludeImg').removeAttr('disabled');
                    bIsDisabled = true;
                }
                else {
                    $('#chkLevel1IncludeImg').removeAttr('disabled');
                    bIsDisabled = false;
                }
                $("#fldImagesLevel1").removeAttr('disabled');

                if ($form.valid() && validateReportData()) {
                    var serializedForm = $form.serialize();
                    $.post(urls.Reports.SetReportDefinitionValues + "?pReportStyle=" + encodeURIComponent($("#lstReportStyle :selected").text()) + "&pOldReportName=" + encodeURIComponent(vOldReportName), serializedForm)
                        .done(function (response) {
                            showAjaxReturnMessage(response.message, response.errortype);
                            if (response.errortype == 's') {
                                $('.drillDownMenu').find('a').removeClass('selectedMenu');
                                if (bAdd == 1) {
                                    reportID = response.level1ID;
                                    GetReportsView(reportID, $('#lstLevel1TblName').val(), $('#txtReportName').val(), 0);
                                    var newLI = '<li><a id="FALRPT_' + reportID + '" onclick="ReportChildItemClick(\'treeReports\',\'ALRPT_1\',\'FALRPT_' + reportID + '\')">' + $('#txtReportName').val() + ' (' + $('#lstLevel1TblName').val() + ')</a></li>';
                                    $('#ALRPT_1').parent().find('ul.displayed').prepend(newLI);
                                    $('#FALRPT_' + reportID).addClass('selectedMenu');
                                    if ($("ul#ulReports >li:first ul").hasClass("displayed")) {
                                        $('#liReports').parent().height($('#liReports').parent().height() + 60);
                                    }
                                }
                                else {
                                    reportName = $("#txtReportName").val();
                                    $('#FALRPT_' + reportID + '.selectedMenu').text(reportName+ ' (' + $("#lstLevel1TblName").val() + ')');
                                    GetReportsView(reportID, tableName, reportName, 0);
                                }
                                vOldReportName = $("#txtReportName").val();
                                if (bIsDisabled)
                                    $('#chkLevel1IncludeImg').attr('disabled', 'disabled');

                                if ($("#chkLevel1IncludeImg").prop('disabled'))
                                    $("#fldImagesLevel1").attr('disabled', 'disabled');
                                else
                                    $("#fldImagesLevel1").removeAttr('disabled');

                                $("#lstLevel1TblName, #lstLevel2TblName, #lstLevel3TblName").attr('disabled', 'disabled');
                            }
                            else if (response.errortype == 'w') {
                                if (bAdd == 1) {
                                    $("#lstLevel1TblName, #lstLevel2TblName, #lstLevel3TblName").removeAttr('disabled');
                                }
                                else {
                                    $("#lstLevel1TblName, #lstLevel2TblName, #lstLevel3TblName").attr('disabled', 'disabled');
                                }
                            }
                        })
                        .fail(function (xhr, status, error) {
                            ShowErrorMessge();
                        });
                }
                else {
                    $("#lstLevel1TblName, #lstLevel2TblName, #lstLevel3TblName").attr('disabled', 'disabled');
                }
            }
            else {
                showAjaxReturnMessage(vrClientsRes["msgJsAdminReport1ColIncluded"], 'w');
            }
        });

        //REMOVE THIS LEVEL Button Functionality.
        $(".btnRemoveLevel").on('click', function () {
            var tabIndex = $('#tabList .active').index();
            var pIndex = 0;
            var pViewID = 0;
            var pViewId_Level2 = 0;
            var confirmMsg = '';
            var combinval = '';

            pIndex = tabIndex + 1;
            pViewID = $("#hdnLevel" + pIndex + "ID").val();

            if (pIndex == 2 && $("#lstLevel3TblName").val() != '') {
                pViewId_Level2 = $("#hdnLevel" + (pIndex + 1) + "ID").val();
                combinval = pViewID + "#" + pViewId_Level2 + "#" + tableName + "#" + reportName + "#" + pIndex;
                confirmMsg = vrClientsRes['msgJsAdminReportWillRemoveLvl2N3'];
            }
            else {
                combinval = pViewID + "#" + tableName + "#" + reportName + "#" + pIndex;
                confirmMsg = String.format(vrClientsRes['msgJsAdminReportWillRemoveLvl'], pIndex);
            }

            $(this).confirmModal({
                confirmTitle: 'TAB FusionRMS',
                confirmMessage: confirmMsg,
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmObject: combinval,
                confirmCallback: RemoveActiveLevel
            });
        });

        //Include Column LEVEL1 - DELETE
        $("#btnLevel1Delete").on('click', function () {
            $(this).confirmModal({
                confirmTitle: vrCommonRes['msgJsDelConfim'],
                confirmMessage: vrDirectoriesRes['msgJsDirectoriesSure2RemoveRec'],
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmCallback: function () {
                    var currentId = $("#ulLevel1Cols li.highlightClass").attr('id');
                    var columnID = currentId.substr(currentId.indexOf("_") + 1);


                    $.post(urls.Reports.DeleteReportsPrintingColumn, $.param({ pColumnId: columnID, pIndex: 1 }, true), function (data) {
                        showAjaxReturnMessage(data.message, data.errortype);
                        if (data.errortype == 's') {
                            var levelNo = 1;
                            OperationBeforeDelete(columnID, levelNo);
                        }
                    });

                }
            });
            
        });

        //Include Column LEVEL2 - DELETE
        $("#btnLevel2Delete").on('click', function () {
            $(this).confirmModal({
                confirmTitle: vrCommonRes['msgJsDelConfim'],
                confirmMessage: vrDirectoriesRes['msgJsDirectoriesSure2RemoveRec'],
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmCallback: function () {
                    var currentId = $("#ulLevel2Cols li.highlightClass").attr('id');
                    var columnID = currentId.substr(currentId.indexOf("_") + 1);

                    $.post(urls.Reports.DeleteReportsPrintingColumn, $.param({ pColumnId: columnID, pIndex: 2 }, true), function (data) {
                        showAjaxReturnMessage(data.message, data.errortype);
                        if (data.errortype == 's') {
                            var levelNo = 2;
                            OperationBeforeDelete(columnID, levelNo);
                        }
                    });
                }
            });

           
        });

        //Include Column LEVEL3 - DELETE
        $("#btnLevel3Delete").on('click', function () {
            $(this).confirmModal({
                confirmTitle: vrCommonRes['msgJsDelConfim'],
                confirmMessage: vrDirectoriesRes['msgJsDirectoriesSure2RemoveRec'],
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmCallback: function () {
                    var currentId = $("#ulLevel3Cols li.highlightClass").attr('id');
                    var columnID = currentId.substr(currentId.indexOf("_") + 1);

                    $.post(urls.Reports.DeleteReportsPrintingColumn, $.param({ pColumnId: columnID, pIndex: 3 }, true), function (data) {
                        showAjaxReturnMessage(data.message, data.errortype);
                        if (data.errortype == 's') {
                            var levelNo = 3;
                            OperationBeforeDelete(columnID, levelNo);
                        }
                    });
                }
            });
            
        });

        //LEVEL 1
        $("#ulLevel1Cols").sortable({
            start: function (event, ui) {
                $(ui.item).click();
            },
            stop: function (event, ui) {
                $("#ulLevel1Cols li.highlightClass").removeClass('highlightClass');
                ui.item.addClass('highlightClass');

                var chkId = ui.item.find('input:checkbox').attr('id');
                OperateState(chkId, 1);
            }
        });

        $("#ulLevel1Cols").on('click', "li", function () {
            $("#ulLevel1Cols li.highlightClass").removeClass('highlightClass');
            $(this).addClass('highlightClass');

            var chkId = $(this).find('input:checkbox').attr('id');
            OperateState(chkId, 1);
        });

        //LEVEL 2
        $("#ulLevel2Cols").sortable({
            start: function (event, ui) {
                $(ui.item).click();
            },
            stop: function (event, ui) {
                $("#ulLevel2Cols li.highlightClass").removeClass('highlightClass');
                ui.item.addClass('highlightClass');

                var chkId = ui.item.find('input:checkbox').attr('id');
                OperateState(chkId, 2);
            }
        });

        $("#ulLevel2Cols").on('click', "li", function () {
            $("#ulLevel2Cols li.highlightClass").removeClass('highlightClass');
            $(this).addClass('highlightClass');

            var chkId = $(this).find('input:checkbox').attr('id');
            OperateState(chkId, 2);
        });

        //LEVEL 3
        $("#ulLevel3Cols").sortable({
            start: function (event, ui) {
                $(ui.item).click();
            },
            stop: function (event, ui) {
                $("#ulLevel3Cols li.highlightClass").removeClass('highlightClass');
                ui.item.addClass('highlightClass');

                var chkId = ui.item.find('input:checkbox').attr('id');
                OperateState(chkId, 3);
            }
        });

        $("#ulLevel3Cols").on('click', "li", function () {
            $("#ulLevel3Cols li.highlightClass").removeClass('highlightClass');
            $(this).addClass('highlightClass');

            var chkId = $(this).find('input:checkbox').attr('id');
            OperateState(chkId, 3);
        });

        //Select ALL
        $("#btnLevel1SelectAll").on('click', function () {            
            var iIndex = 1;
            OperateBtnSelectAll(iIndex);            
        });

        $("#btnLevel2SelectAll").on('click', function () {
            var iIndex = 2;
            OperateBtnSelectAll(iIndex);            
        });

        $("#btnLevel3SelectAll").on('click', function () {            
            var iIndex = 3;
            OperateBtnSelectAll(iIndex);            
        });

        //Unselect ALL
        $("#btnLevel1UnselectAll").on('click', function () {            
            var iIndex = 1;
            OperateBtnUnSelectAll(iIndex);            
        });

        $("#btnLevel2UnselectAll").on('click', function () {
            var iIndex = 2;
            OperateBtnUnSelectAll(iIndex);            
        });

        $("#btnLevel3UnselectAll").on('click', function () {
            var iIndex = 3;
            OperateBtnUnSelectAll(iIndex);            
        });

        $("#lstLevel1TblName").on('change', function () {
            $.post(urls.Reports.GetTablesView, $.param({ pTableName: $("#lstLevel1TblName").val() }, true), function (data) {
                var ViewsList = $.parseJSON(data.lstViewsList);
                var lstChildTBlObj = $.parseJSON(data.lstChildTablesObjStr);

                $("#lstLevel1ViewName, #lstLevel2ViewName, #lstLevel3ViewName").empty();
                $("#lstLevel2TblName, #lstLevel3TblName").empty();
                $("#ulLevel2Cols, #ulLevel3Cols").empty();

                $(ViewsList).each(function (i, item) {
                    $("#lstLevel1ViewName").append("<option value=" + item.Key + ">" + item.Value + "</option>");
                });
                $('#lstLevel1TblName option[value=\'\']').remove();
                $("#lstLevel2TblName").append("<option value=''> </option>");
                $(lstChildTBlObj).each(function (i, item) {
                    $("#lstLevel2TblName").append("<option value=" + item.Key + ">" + item.Value + "</option>");
                });

                if (reportName != "") {
                    $("#lstLevel1ViewName option:contains(" + reportName + ")").attr("selected", "selected");
                    $('#lstLevel1ViewName').trigger('change');
                    $("#lstLevel1ViewName, #lstLevel1TblName").attr('disabled', 'disabled');
                }
                else {
                    $('#lstLevel1ViewName option:first-child').attr("selected", "selected");
                    $('#lstLevel1ViewName').trigger('change');
                }

                //ENABLE or DISABLE TABs based child tables.
                if ($("#lstLevel2TblName > option").length > 1) {
                    $("#liPane2").removeAttr("disabled");
                    $("#liPane2 a").attr("data-toggle", "tab");
                }
                else {
                    $("#liPane2").attr("disabled", "disabled");
                    $("#liPane2 a").removeAttr("data-toggle");

                    $("#liPane3").attr("disabled", "disabled");
                    $("#liPane3 a").removeAttr("data-toggle");
                }
            });
        });

        $("#lstLevel1ViewName").on('change', function () {
            if ($("#lstLevel1TblName").val() != '') {
                $.post(urls.Reports.GetColumnsForPrinting, $.param({ pTableName: $("#lstLevel1TblName").val(), pViewId: $("#lstLevel1ViewName").val(), pIndex: 1 }, true), function (data) {
                    var pViewColumnObj = $.parseJSON(data.viewColumnEntityObj);
                    var pViewParams = $.parseJSON(data.lstViewObjStr);
                    var lstTrackingHisObj = $.parseJSON(data.lstTrackedHisObj);
                    var TblentityObjStr = JSON.parse(data.tableEntityObjStr);
                    var chkStatus = false;
                    var bTrackable = data.bTrackable;
                    $("#ulLevel1Cols").empty();
                    $("#lstLevel1TrackingHis").empty();
                    //Added on 03/03/2016
                    $("#hdnInitialLevel1ID").val($('#lstLevel1ViewName :selected').val());

                    $(pViewColumnObj).each(function (i, item) {
                        $("#ulLevel1Cols").append("<li id= Id_" + pViewColumnObj[i].Id + " class='list-group-item checkbox-cus'><input type='checkbox' id='Level1_" + pViewColumnObj[i].ColumnNum + "' class='printableColLevel1' value='false'/><label class='checkbox-inline' for='Level1_" + pViewColumnObj[i].ColumnNum + "'> " + pViewColumnObj[i].Heading + "</label></li>");
                        $("#Level1_" + pViewColumnObj[i].ColumnNum).attr('checked', !pViewColumnObj[i].SuppressPrinting);
                    });
                    $("#ulLevel1Cols li").first().addClass('highlightClass');
                    if ($("#ulLevel1Cols li").length > 1) {
                        $("#btnLevel1UnselectAll").removeAttr('disabled');
                    }

                    $(lstTrackingHisObj).each(function (i, item) {
                        $("#lstLevel1TrackingHis").append("<option value=" + item.Key + ">" + item.Value + "</option>");
                    });

                    $("input[name=rdPrintColHeaders2][value=" + pViewParams[0].ChildColumnHeaders + "]").prop('checked', true);

                    //Set all Initial Parameters against view.
                    SetReportParameters(pViewParams[0], TblentityObjStr, bTrackable, 1, bAdd);
                    if (bAdd != 1) {
                        LoadSubViewData(pViewParams[0], 2);
                    }

                    $("#chkLevel1IncludeImg").on('change', function () {
                        if ($("#chkLevel1IncludeImg").is(':checked')) {
                            $("#fldImagesLevel1, #txtLevel1LeftMargin, #txtLevel1RightImgWidth").removeAttr('disabled');
                        }
                        else {
                            $("#fldImagesLevel1, #txtLevel1LeftMargin, #txtLevel1RightImgWidth").attr('disabled', 'disabled');
                        }
                    });

                    $('.printableColLevel1').on('change', function () {
                        var iIndex = 1;
                        HandleIncludedColumns(this, iIndex);                        
                    });

                });
            }
        });

        //LEVEL 2 Table Name Onchange Event.
        $("#lstLevel2TblName").on('change', function () {
            $.post(urls.Reports.GetTablesView, $.param({ pTableName: $("#lstLevel2TblName").val() }, true), function (data) {

                var ViewsList = $.parseJSON(data.lstViewsList);
                var lstChildTBlObj = $.parseJSON(data.lstChildTablesObjStr);

                $("#lstLevel2ViewName").empty();
                $("#lstLevel3TblName").empty();
                $("#lstLevel3ViewName").empty();

                $("#ulLevel3Cols").empty();
                $(ViewsList).each(function (i, item) {
                    $("#lstLevel2ViewName").append("<option value=" + item.Key + ">" + item.Value + "</option>");
                });
                $('#lstLevel2TblName option[value=\'\']').remove();
                $("#lstLevel3TblName").append("<option value=''> </option>");
                $(lstChildTBlObj).each(function (i, item) {
                    $("#lstLevel3TblName").append("<option value=" + item.Key + ">" + item.Value + "</option>");
                });

                if (reportName != "") {
                    if (parseInt($("#hdnSubViewLevel2ID").val()) > 0)
                        $("#lstLevel2ViewName").append("<option value=\"" + (parseInt($("#hdnSubViewLevel2ID").val())) + "\">" + reportName + " </option>");

                    $("#lstLevel2ViewName option:contains(" + reportName + ")").attr("selected", "selected");
                    $('#lstLevel2ViewName').trigger('change');
                }
                else {
                    $('#lstLevel2ViewName option:first-child').attr("selected", "selected");
                    $('#lstLevel2ViewName').trigger('change');
                }

                //ENABLE or DISABLE TABs based child tables.
                if ($("#lstLevel3TblName > option").length > 1) {
                    $("#liPane3").removeAttr("disabled");
                    $("#liPane3 a").attr("data-toggle", "tab");
                }
                else {
                    $("#liPane3").attr('disabled', 'disabled');
                    $("#liPane3 a").removeAttr("data-toggle");
                }
            });
        });

        $("#lstLevel2ViewName").on('change', function () {
            if ($("#lstLevel2TblName").val() != '') {
                $.post(urls.Reports.GetColumnsForPrinting, $.param({ pTableName: $("#lstLevel2TblName").val(), pViewId: $("#lstLevel2ViewName").val(), pIndex: 2 }, true), function (data) {
                    var pViewColumnObj = $.parseJSON(data.viewColumnEntityObj);
                    var pViewParams = $.parseJSON(data.lstViewObjStr);
                    var lstTrackingHisObj = $.parseJSON(data.lstTrackedHisObj);
                    var TblentityObjStr = JSON.parse(data.tableEntityObjStr);
                    var chkStatus = false;
                    var bTrackable = data.bTrackable;

                    $("#ulLevel2Cols").empty();
                    $("#lstLevel2TrackingHis").empty();
                    //Added on 03/03/2016
                    $("#hdnInitialLevel2ID").val($('#lstLevel2ViewName :selected').val());

                    $(pViewColumnObj).each(function (i, item) {
                        $("#ulLevel2Cols").append("<li id= Id_" + pViewColumnObj[i].Id + " class='list-group-item checkbox-cus'><input type='checkbox' id='Level2_" + pViewColumnObj[i].ColumnNum + "' class='printableColLevel2' value='false'/> <label class='checkbox-inline' for='Level2_" + pViewColumnObj[i].ColumnNum + "'>" + pViewColumnObj[i].Heading + "</label></li>");
                        $("#Level2_" + pViewColumnObj[i].ColumnNum).attr('checked', !pViewColumnObj[i].SuppressPrinting);
                    });
                    $("#ulLevel2Cols li").first().addClass('highlightClass');
                    if ($("#ulLevel2Cols li").length > 1) {
                        $("#btnLevel2UnselectAll").removeAttr('disabled', 'disabled');
                    }

                    $(lstTrackingHisObj).each(function (i, item) {
                        $("#lstLevel2TrackingHis").append("<option value=" + item.Key + ">" + item.Value + "</option>");
                    });

                    $("input[name=rdPrintColHeaders3][value=" + pViewParams[0].ChildColumnHeaders + "]").prop('checked', true);

                    //Set all Initial Parameters against view.
                    SetReportParameters(pViewParams[0], TblentityObjStr, bTrackable, 2, bAdd);
                    if (bAdd != 1) {
                        LoadSubViewData(pViewParams[0], 3);
                    }
                    $("#chkLevel2IncludeImg").on('change', function () {
                        if ($("#chkLevel2IncludeImg").is(':checked')) {
                            $("#fldImagesLevel2").removeAttr('disabled');
                            $("#txtLevel2LeftMargin").removeAttr('disabled');
                            $("#txtLevel2RightImgWidth").removeAttr('disabled');
                        }
                        else {
                            $("#fldImagesLevel2").attr('disabled', 'disabled');
                            $("#txtLevel2LeftMargin").attr('disabled', 'disabled');
                            $("#txtLevel2RightImgWidth").attr('disabled', 'disabled');
                        }
                    });

                    $('.printableColLevel2').on('change', function () {
                        var iIndex = 2;
                        HandleIncludedColumns(this, iIndex);                        
                    });

                });
            }
        });

        //LEVEL 3 Table Name Onchange Event.
        $("#lstLevel3TblName").on('change', function () {
            $.post(urls.Reports.GetTablesView, $.param({ pTableName: $("#lstLevel3TblName").val() }, true), function (data) {
                var ViewsList = $.parseJSON(data.lstViewsList);
                var lstChildTBlObj = $.parseJSON(data.lstChildTablesObjStr);

                $("#lstLevel3ViewName").empty();

                $(ViewsList).each(function (i, item) {
                    $("#lstLevel3ViewName").append("<option value=" + item.Key + ">" + item.Value + "</option>");
                });
                if (reportName != "") {
                    if (parseInt($("#hdnSubViewLevel3ID").val()) > 0)
                        $("#lstLevel3ViewName").append("<option value='" + (parseInt($("#hdnSubViewLevel3ID").val())) + "'>" + reportName + " </option>");
                    $("#lstLevel3ViewName option:contains(" + reportName + ")").attr("selected", "selected");
                    $('#lstLevel3ViewName').trigger('change');
                }
                else {
                    $('#lstLevel3ViewName option:first-child').attr("selected", "selected");
                    $('#lstLevel3ViewName').trigger('change');
                }
            });
        });

        $("#lstLevel3ViewName").on('change', function () {
            if ($("#lstLevel3TblName").val() != '') {
                $.post(urls.Reports.GetColumnsForPrinting, $.param({ pTableName: $("#lstLevel3TblName").val(), pViewId: $("#lstLevel3ViewName").val(), pIndex: 3 }, true), function (data) {
                    var pViewColumnObj = $.parseJSON(data.viewColumnEntityObj);
                    var pViewParams = $.parseJSON(data.lstViewObjStr);
                    var lstTrackingHisObj = $.parseJSON(data.lstTrackedHisObj);
                    var TblentityObjStr = JSON.parse(data.tableEntityObjStr);
                    var chkStatus = false;
                    var bTrackable = data.bTrackable;

                    $("#ulLevel3Cols").empty();
                    $("#lstLevel3TrackingHis").empty();
                    //Added on 03/03/2016
                    $("#hdnInitialLevel3ID").val($('#lstLevel3ViewName :selected').val());

                    $('#lstLevel3TblName option[value=\'\']').remove();
                    $(pViewColumnObj).each(function (i, item) {
                        $("#ulLevel3Cols").append("<li id= Id_" + pViewColumnObj[i].Id + " class='list-group-item checkbox-cus'><input type='checkbox' id='Level3_" + pViewColumnObj[i].ColumnNum + "' class='printableColLevel3' value='false'/><label class='checkbox-inline' for='Level3_" + pViewColumnObj[i].ColumnNum + "'> " + pViewColumnObj[i].Heading + "</label></li>");
                        $("#Level3_" + pViewColumnObj[i].ColumnNum).attr('checked', !pViewColumnObj[i].SuppressPrinting);
                    });
                    $("#ulLevel3Cols li").first().addClass('highlightClass');
                    if ($("#ulLevel3Cols li").length > 1) {
                        $("#btnLevel3UnselectAll").removeAttr('disabled');
                    }

                    $(lstTrackingHisObj).each(function (i, item) {
                        $("#lstLevel3TrackingHis").append("<option value=" + item.Key + ">" + item.Value + "</option>");
                    });

                    //Set all Initial Parameters against view.
                    SetReportParameters(pViewParams[0], TblentityObjStr, bTrackable, 3, bAdd);
                    $("#chkLevel3IncludeImg").on('change', function () {
                        if ($("#chkLevel3IncludeImg").is(':checked')) {
                            $("#fldImagesLevel3").removeAttr('disabled');
                            $("#txtLevel3LeftMargin").removeAttr('disabled');
                            $("#txtLevel3RightImgWidth").removeAttr('disabled');
                        }
                        else {
                            $("#fldImagesLevel3").attr('disabled', 'disabled');
                            $("#txtLevel3LeftMargin").attr('disabled', 'disabled');
                            $("#txtLevel3RightImgWidth").attr('disabled', 'disabled');
                        }
                    });

                    $('.printableColLevel3').on('change', function () {
                        var iIndex = 3;
                        HandleIncludedColumns(this, iIndex);                        
                    });

                });
            }
        });

        //TRACKING HISTORY Change Event  - LEVEL: 1
        $("#lstLevel1TrackingHis").on('change', function () {
            var iIndex = 1;
            HandleTrackingHistoryChangeEvent(iIndex);            
        });

        //TRACKING HISTORY Change Event  - LEVEL: 2
        $("#lstLevel2TrackingHis").on('change', function () {
            var iIndex = 2;
            HandleTrackingHistoryChangeEvent(iIndex);            
        });

        //TRACKING HISTORY Change Event  - LEVEL: 3
        $("#lstLevel3TrackingHis").on('change', function () {
            var iIndex = 3;
            HandleTrackingHistoryChangeEvent(iIndex);            
        });
    })
    .fail(function (xhr, status) {
        ShowErrorMessge();
    });
}

//Load the data of Subview on LEVEL 2/3.
function LoadSubViewData(subViewData, iIndex) {
    if (subViewData.SubTableName != "" && subViewData.SubTableName != undefined && subViewData.SubTableName != "<<Tracking>>") {

        $("#lstLevel" + iIndex + "TblName").val(subViewData.SubTableName);
        if (resetViewId == false)
            $("#hdnLevel" + iIndex + "ID").val(subViewData.SubViewId);
        else
            $("#hdnLevel" + iIndex + "ID").val(0);
        $("#lstLevel" + iIndex + "TblName").trigger('change');
        $("#lstLevel" + iIndex + "ViewName").attr('disabled', 'disabled');
        $("#lstLevel" + iIndex + "TblName").attr('disabled', 'disabled');
        $("#lstLevel" + iIndex + "TblName").attr('disabled', 'disabled');
    }
}

//Load the data of existing saved Reports from system.
function LoadInitialReportData(reportID, tableName, reportName, isAdd) {
    //Reset the View Id
    if (isAdd)
        resetViewId = true;
    else
        resetViewId = false;
    $.post(urls.Reports.GetReportInformation, $.param({ pReportID: reportID, bIsAdd: isAdd }, true), function (data) {
        if (data.sReportName == "") {
            vOldReportName = reportName;
        }
        else {
            vOldReportName = data.sReportName;
            reportName = vOldReportName;
            tableName = data.tblName;
            $("#hdnSubViewLevel2ID").val(data.subViewId2);
            $("#hdnSubViewLevel3ID").val(data.subViewId3);
            $("#txtReportName").val(data.sReportName);
        }

        var ReportStyleObj = $.parseJSON(data.lstReportStylesList);
        var TblNamesObj = $.parseJSON(data.lstTblNamesList);
        var lstChildTBlObj = $.parseJSON(data.lstChildTablesObjStr);

        $("#lstReportStyle").empty();
        $("#lstLevel1TblName").empty();
        $("#lstLevel2TblName").empty();

        //Added on 17/12/2015 by Ganesh.
        $("#lstReportStyle").append("<option value='0'> </option>");
        $(ReportStyleObj).each(function (i, item) {
            $("#lstReportStyle").append("<option value=" + item.Key + ">" + item.Value + "</option>");
        });

        $("#lstLevel1TblName").append("<option value=''> </option>");
        $(TblNamesObj).each(function (i, item) {
            $("#lstLevel1TblName").append("<option value=" + item.Key + ">" + item.Value + "</option>");
        });

        $("#lstLevel2TblName").append("<option value=''> </option>");
        $(lstChildTBlObj).each(function (i, item) {
            $("#lstLevel2TblName").append("<option value=" + item.Key + ">" + item.Value + "</option>");
        });

        if ($("#lstLevel2TblName > option").length > 1) {
            $("#liPane2").removeAttr("disabled");
            $("#liPane2 a").attr("data-toggle", "tab");
        }
        else {
            $("#liPane2").attr('disabled', 'disabled');
            $("#liPane2 a").removeAttr("data-toggle");

            $("#liPane3").attr('disabled', 'disabled');
            $("#liPane3 a").removeAttr("data-toggle");
        }

        if ($("#lstLevel3TblName > option").length > 1) {
            $("#liPane3").removeAttr("disabled");
            $("#liPane3 a").attr("data-toggle", "tab");
        }
        else {
            $("#liPane3").attr('disabled', 'disabled');
            $("#liPane3 a").removeAttr("data-toggle");
        }
        if (isAdd)
            $("#lstReportStyle option[value='0']").remove();
        else
            $("#lstReportStyle").val(0);

        if (reportName != "") {
            $("#txtReportName").val(reportName);
            $('#lstLevel1TblName').val(tableName);

            if ($('#lstLevel1TblName').val() != '')
                $('#lstLevel1TblName').trigger('change');
        }
        else {
            $('#lstLevel1TblName option:first-child').attr("selected", "selected");
            $('#lstLevel1TblName').trigger('change');
        }
        setTimeout(function () {
            $('.content-wrapper').unbind('scroll');
            if ($('.content-wrapper').hasScrollBar()) {
                cloneActionButtons();
                $('.content-wrapper').scroll(function () {
                    if ($(this).get(0).scrollHeight > ($(this).height() + $(this).scrollTop() + 50)) {
                        $('#divRptActionClone').addClass('aaffixed');
                        $('#divRptAction').removeClass('sticker');
                    }
                    else {
                        $('#divRptActionClone').removeClass('aaffixed');
                        $('#divRptAction').addClass('sticker');
                    }
                });
            }
            else {
                $('#divRptActionClone').hide();
            }
        }, 800);
    });
}
function cloneActionButtons() {
    $('#divRptActionClone').empty().html($('#divRptAction').clone()).addClass('aaffixed');
    $('#divRptActionClone').find('#btnRptsApply').click(function () { $('#divRptAction').find('#btnRptsApply').trigger('click'); });
    $('#divRptActionClone').find('#btnRemoveLevel').click(function () { $('#divRptAction').find('#btnRemoveLevel').trigger('click'); });
}
//SET Report parameters according to LEVEL's
function SetReportParameters(result, tblEntityObjStr, bTrackable, iIndex, bAdd) {
    if ($(".printableColLevel" + iIndex).first().is(':checked')) {
        $("#btnLevel" + iIndex + "Edit").removeAttr('disabled');
        if ($("#ulLevel" + iIndex + "Cols li").length > 1)
        $("#btnLevel" + iIndex + "Delete").removeAttr('disabled');
    }
    else {
        $("#btnLevel" + iIndex + "Edit").attr('disabled', 'disabled');
        $("#btnLevel" + iIndex + "Delete").attr('disabled', 'disabled');
    }
    if (result.SubTableName == "<<Tracking>>") {
        $("#lstLevel" + iIndex + "TrackingHis").val(result.SubViewId).trigger('change');
    }
    else {
        $("#lstLevel" + iIndex + "TrackingHis").val(0).trigger('change');
    }

    if (bAdd != 1) {
        if (result.ReportStylesId != undefined && result.ReportStylesId != "") {
            $('#lstReportStyle option').map(function () {
                if ($(this).text().trim() == result.ReportStylesId.trim()) {
                    return this;
                } else {
                    return null;
                }
            }).attr('selected', 'selected');
        }
        else {
            $("#lstReportStyle").val(0);
        }
    }

    if (result.LeftIndent != null)
        $("#txtLevel" + iIndex + "LeftIntent").val(result.LeftIndent);
    else
        $("#txtLevel" + iIndex + "LeftIntent").val(0);
    if (result.RightIndent != null)
        $("#txtLevel" + iIndex + "RightIntent").val(result.RightIndent);
    else
        $("#txtLevel" + iIndex + "RightIntent").val(0);
    if (result.PrintImageLeftMargin != null)
        $("#txtLevel" + iIndex + "LeftMargin").val(result.PrintImageLeftMargin);
    else
        $("#txtLevel" + iIndex + "LeftMargin").val(0);
    if (result.PrintImageRightMargin != null)
        $("#txtLevel" + iIndex + "RightImgWidth").val(result.PrintImageRightMargin);
    else
        $("#txtLevel" + iIndex + "RightImgWidth").val(0);

    //Start Enable-Disable Fields
    if (tblEntityObjStr.TrackingTable || bTrackable)//tblEntityObjStr.Trackable
        $("#lstLevel" + iIndex + "TrackingHis").removeAttr('disabled');
    else
        $("#lstLevel" + iIndex + "TrackingHis").attr('disabled', 'disabled');

    if (tblEntityObjStr.Attachments)
        $("#chkLevel" + iIndex + "IncludeImg").removeAttr('disabled');
    else
        $("#chkLevel" + iIndex + "IncludeImg").attr('disabled', 'disabled');

    var bShowFields = $('#chkLevel' + iIndex + 'IncludeImg').is(':disabled') && $("#chkLevel" + iIndex + "IncludeImg").is(':checked');

    if (bShowFields) {
        $("#chkLevel" + iIndex + "IncludeFooters").removeAttr('disabled');
        $("#fldImagesLevel" + iIndex).removeAttr('disabled', 'disabled');
        $("#txtLevel" + iIndex + "LeftMargin").removeAttr('disabled');
        $("#txtLevel" + iIndex + "RightImgWidth").removeAttr('disabled');
    }
    else {
        $("#chkLevel" + iIndex + "IncludeFooters").attr('disabled', 'disabled');
        $("#fldImagesLevel" + iIndex).attr('disabled', 'disabled');
        $("#txtLevel" + iIndex + "LeftMargin").attr('disabled', 'disabled');
        $("#txtLevel" + iIndex + "RightImgWidth").attr('disabled', 'disabled');
    }
    //End Enable-Disable Fields
    if (iIndex == 1 && resetViewId == false)
        $("#hdnLevel1ID").val(result.Id);
    else if (iIndex == 1 && resetViewId == true)
        $("#hdnLevel1ID").val(0);

    if (result.GrandTotal)
        $("#chkLevel" + iIndex + "GrandTotal").prop('checked', true);
    else
        $("#chkLevel" + iIndex + "GrandTotal").prop('checked', false);
    if (result.SuppressHeader)
        $("#chkLevel" + iIndex + "IncludeHeaders").prop('checked', false);
    else
        $("#chkLevel" + iIndex + "IncludeHeaders").prop('checked', true);

    if (result.SuppressFooter)
        $("#chkLevel" + iIndex + "IncludeFooters").prop('checked', false);
    else
        $("#chkLevel" + iIndex + "IncludeFooters").prop('checked', true);

    if (result.TrackingEverContained)
        $("#chkLevel" + iIndex + "IncludeTrackedObj").prop('checked', true);
    else
        $("#chkLevel" + iIndex + "IncludeTrackedObj").prop('checked', false);

    if (result.PrintImages) {
        $("#chkLevel" + iIndex + "IncludeImg").prop('checked', true);
        $("#fldImagesLevel" + iIndex).removeAttr('readonly');
    }
    else {
        $("#chkLevel" + iIndex + "IncludeImg").prop('checked', false);
        $("#fldImagesLevel" + iIndex).attr('disabled', 'disabled');
    }

    if (result.PrintImageFullPage)
        $("#chkLevel" + iIndex + "ImgSeperatePage").prop('checked', true);
    else
        $("#chkLevel" + iIndex + "ImgSeperatePage").prop('checked', false);

    if (result.PrintImageFirstPageOnly)
        $("#chkLevel" + iIndex + "FirstImgOnly").prop('checked', true);
    else
        $("#chkLevel" + iIndex + "FirstImgOnly").prop('checked', false);

    if (result.PrintImageRedlining)
        $("#chkLevel" + iIndex + "Annotations").prop('checked', true);
    else
        $("#chkLevel" + iIndex + "Annotations").prop('checked', false);

    if (result.SuppressImageDataRow)
        $("#chkLevel" + iIndex + "DataRow").prop('checked', false);
    else
        $("#chkLevel" + iIndex + "DataRow").prop('checked', true);

    if (result.SuppressImageFooter)
        $("#chkLevel" + iIndex + "ImgFileInfo").prop('checked', false);
    else
        $("#chkLevel" + iIndex + "ImgFileInfo").prop('checked', true);

    //Applied to LEVEL2 Only.
    if (iIndex == 2 || iIndex == 3) {
        if (result.PrintWithoutChildren)
            $("#chkLevelPrintWithoutChildren" + iIndex).prop('checked', true);
        else
            $("#chkLevelPrintWithoutChildren" + iIndex).prop('checked', false);
    }
}

function RemoveActiveLevel(combinval) {
    var data = [];
    var tableName = "";
    var reportName = "";
    var vViewIDs = [];
    var vIndex = 0;
    if (combinval != null)
        data = combinval.split("#");

    if (data.length == 4) {
        vViewIDs.push(data[0]);
        tableName = data[1];
        reportName = data[2];
        vIndex = data[3];
    }
    else {
        vViewIDs.push(data[0]);
        vViewIDs.push(data[1]);
        tableName = data[2];
        reportName = data[3];
        vIndex = data[4];
    }
    if (vViewIDs[0] != 0) {
        $.post(urls.Reports.RemoveActiveLevel, $.param({ pViewIDs: vViewIDs }, true), function (data) {
            showAjaxReturnMessage(data.message, data.errortype);

            if (data.errortype == "s") {
                GetReportsView($('#hdnLevel1ID').val(), tableName, reportName, 0);
                //ReloadLeftTree($("#hdnLevel1ID").val());
            }
        });
    }
    else {
        if (vViewIDs.length > 1) {
            ResetTabData(2);
            ResetTabData(3);
            //Disable 3rd Level after removing 2nd & 3rd level.
            $("#liPane3").attr('disabled', 'disabled');
            $("#liPane3 a").removeAttr("data-toggle");
        }
        else
            ResetTabData(vIndex);
    }
}

function SetViewColumnIds() {
    var IDs = new Array();
    var chkState = new Array();

    $("#lstLevel1TblColumns li").each(function (i, viewcol_list) {
        IDs.push($(viewcol_list).attr("id").split("_").pop());
    });

    $("#lstLevel1TblColumns input:checkbox").each(function () {
        if (this.checked)
            chkState.push(0);
        else
            chkState.push(1);
    });

    $("#hdnLstLevel1ViewCols").val(IDs);
    $("#hdnLstLevel1ViewColChkStates").val(chkState);

    IDs = [];
    chkState = [];
    $("#lstLevel2TblColumns li").each(function (i, viewcol_list) {
        IDs.push($(viewcol_list).attr("id").split("_").pop());
    });

    $("#lstLevel2TblColumns input:checkbox").each(function () {
        if (this.checked)
            chkState.push(0);
        else
            chkState.push(1);
    });

    $("#hdnLstLevel2ViewCols").val(IDs);
    $("#hdnLstLevel2ViewColChkStates").val(chkState);
    IDs = [];
    chkState = [];
    $("#lstLevel3TblColumns li").each(function (i, viewcol_list) {
        IDs.push($(viewcol_list).attr("id").split("_").pop());
    });

    $("#lstLevel3TblColumns input:checkbox").each(function () {
        if (this.checked)
            chkState.push(0);
        else
            chkState.push(1);
    });
    $("#hdnLstLevel3ViewCols").val(IDs);
    $("#hdnLstLevel3ViewColChkStates").val(chkState);
}

function DeleteReport(combinval) {
    var data = [];
    var vReportID = 0;
    var vChildNode;

    if (combinval != null)
        data = combinval.split("#");

    vReportID = data[0];
    $.post(urls.Reports.DeleteReport, $.param({ pReportID: vReportID }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        if (data.errortype == 's') {
            var selectedVal = $("#lstReportList option:selected").val();
            $("#lstReportList option[value='" + selectedVal + "']").remove();
            $("#lstReportList").val($("#lstReportList option:first").val());
            $('#' + selectedVal).parent().remove();
            $('#liReports').parent().height($('#liReports').parent().height() - 25);

            var vChildNode = $("#lstReportList option");
            if (vChildNode.length == 0){
                $("#btnDelete").attr('disabled', 'disabled');
                $("#btnEdit").attr('disabled', 'disabled');
            }
            else{
                $("#btnEdit").removeAttr('disabled');
                $("#btnDelete").removeAttr('disabled');
            }
            setTimeout(function () { window.location.reload(); }, 1500);
        }
    });
}

function validateReportData() {
    var reportName = $("#txtReportName").val().trim();
    var tblLevel1Name = $("#lstLevel1TblName :selected").val();
    var tblLevel2Name = $("#lstLevel2TblName :selected").val();
    var tblLevel3Name = $("#lstLevel3TblName :selected").val();

    var level1ChkStates = $("#hdnLstLevel1ViewColChkStates").val();
    var level2ChkStates = $("#hdnLstLevel2ViewColChkStates").val();
    var level3ChkStates = $("#hdnLstLevel3ViewColChkStates").val();

    if (reportName == "") {
        showAjaxReturnMessage(vrClientsRes["msgJsAdminReportRptNameShouoldNotBlank"], "w");
        return false;
    }
    else if (reportName.length < 3) {
        showAjaxReturnMessage(vrClientsRes["msgJsAdminReportRptNameMustHv3Char"], "w");
        return false;
    }
    else if (!(level1ChkStates.indexOf("0") >= 0) && tblLevel1Name != "") {
        showAjaxReturnMessage(vrClientsRes["msgJsAdminReport1ColIncluded"], "w");
        return false;
    }
    else if (!(level2ChkStates.indexOf("0") >= 0) && tblLevel2Name != "" && tblLevel2Name != undefined) {
        showAjaxReturnMessage(vrClientsRes["msgJsAdminReport1ColIncluded"], "w");
        return false;
    }
    else if (!(level3ChkStates.indexOf("0") >= 0) && tblLevel3Name != "" && tblLevel3Name != undefined) {
        showAjaxReturnMessage(vrClientsRes["msgJsAdminReport1ColIncluded"], "w");
        return false;
    }
    return true;
}

function SelectReportLink(vLinkID) {
    if (vLinkID != "" && vLinkID != undefined) {
        $('#jstree_reports_div').find('a').each(function () {
            if ($(this).attr('id').indexOf("childReports_" + vLinkID) != -1) {
                $(this).addClass('jstree-clicked');
                $('#ulReports').scrollTop($(this).position().top);
            }
            else {
                $(this).removeClass('jstree-clicked');
            }
        });
    }
}

function OperateState(chkId, iIndex) {
    if ($("#" + chkId).is(':checked')) {
        $("#btnLevel" + iIndex + "Edit").removeAttr('disabled');
        if ($("#ulLevel" + iIndex + "Cols li").length > 1)
        $("#btnLevel" + iIndex + "Delete").removeAttr('disabled');
    }
    else {
        $("#btnLevel" + iIndex + "Edit").attr('disabled', 'disabled');
        $("#btnLevel" + iIndex + "Delete").attr('disabled', 'disabled');
    }
}

function ResetTabData(iIndex) {
    ResetLevel(iIndex);
    $('#tabList a:first').tab('show');
}

function ResetLevel(iIndex) {
    $("#lstLevel" + iIndex + "TblName").val("");
    $("#lstLevel" + iIndex + "ViewName").empty();
    $("#ulLevel" + iIndex + "Cols").empty();
    $("#chkLevel" + iIndex + "GrandTotal").prop('checked', false);
    $("#chkLevel" + iIndex + "IncludeImg").prop('checked', false);
    $("#chkLevel" + iIndex + "IncludeHeaders").prop('checked', false);
    $("#chkLevel" + iIndex + "IncludeFooters").prop('checked', false);
    $("#chkLevel" + iIndex + "ImgSeperatePage").prop('checked', false);
    $("#chkLevel" + iIndex + "FirstImgOnly").prop('checked', false);
    $("#chkLevel" + iIndex + "Annotations").prop('checked', false);
    $("#chkLevel" + iIndex + "DataRow").prop('checked', false);
    $("#chkLevel" + iIndex + "ImgFileInfo").prop('checked', false);
    $("#txtLevel" + iIndex + "LeftIntent").val(0);
    $("#txtLevel" + iIndex + "RightIntent").val(0);
    $("#txtLevel" + iIndex + "LeftMargin").val(0);
    $("#txtLevel" + iIndex + "RightImgWidth").val(0);
    $("#btnLevel" + iIndex + "Edit").attr('disabled', 'disabled');
    $("#btnLevel" + iIndex + "Delete").attr('disabled', 'disabled');
    $("#lstLevel" + iIndex + "TrackingHis").val("0");
}

function ReloadLeftTree(reportID) {
    $('#ulReports').load(urls.Admin.ReportsTreePartial, function () {
        SelectReportLink(reportID);
    });
}

//Handle all checkbox/columns from 'Included Columns' Section
function HandleIncludedColumns(thisObject, iIndex) {
    var LiId = $(thisObject).closest('li').attr('id');

    $("#ulLevel" + iIndex + "Cols li.highlightClass").removeClass('highlightClass');
    $('#' + LiId).addClass('highlightClass');

    if ($('.printableColLevel' + iIndex + ':not(:checked)').length == $('.printableColLevel' + iIndex).length) {
        $("#btnLevel" + iIndex + "UnselectAll").attr('disabled', 'disabled');
    }

    if ($(thisObject).is(':checked')) {
        $("#btnLevel" + iIndex + "Edit").removeAttr('disabled');
        $("#btnLevel" + iIndex + "UnselectAll").removeAttr('disabled');
        if ($("#ulLevel" + iIndex + "Cols li").length > 1)
            $("#btnLevel" + iIndex + "Delete").removeAttr('disabled');

    }
    else {
        $("#btnLevel" + iIndex + "Edit").attr('disabled', 'disabled');
        $("#btnLevel" + iIndex + "Delete").attr('disabled', 'disabled');
    }
}

function HandleTrackingHistoryChangeEvent(iIndex) {
    if ($("#lstLevel" + iIndex + "TrackingHis :selected").val() > 0) {
        if (iIndex != 3) {
            for (i = (iIndex + 1) ; i <= 3; i++) {
                if ($("#lstLevel" + (iIndex + 1) + "TblName > option").length > 1) {
                    $("#liPane" + i).attr('disabled', 'disabled');
                    $("#liPane" + i + " a").removeAttr("data-toggle");
                    ResetLevel(i);
                    $("#lstLevel" + i + "TblName option[value='']").remove();
                    $("#lstLevel" + i + "TblName").prepend("<option value='' selected='selected'> </option>");
                }
            }
        }
        if ($("#lstLevel" + iIndex + "TrackingHis :selected").text().indexOf('Contained') >= 0) {
            $("#chkLevel" + iIndex + "IncludeTrackedObj").removeAttr('disabled');
        }
        else {
            $("#chkLevel" + iIndex + "IncludeTrackedObj").attr('disabled', 'disabled');
            $("#chkLevel" + iIndex + "IncludeTrackedObj").prop('checked', false);
        }
    }
    else {
        $("#chkLevel" + iIndex + "IncludeTrackedObj").attr('disabled', 'disabled');
        $("#chkLevel" + iIndex + "IncludeTrackedObj").prop('checked', false);
        ControlLevelState(iIndex);
    }
}

//Handle Select All action for all levels of report.
function OperateBtnSelectAll(iIndex) {
    if ($('#ulLevel' + iIndex + 'Cols').has('li').length > 0) {
        $(".printableColLevel" + iIndex).each(function () {
            $(this).attr('checked', true);
        });
        $("#btnLevel" + iIndex + "Edit").removeAttr('disabled');

        if ($("#ulLevel" + iIndex + "Cols li").length != 1) {
            $("#btnLevel" + iIndex + "Delete").removeAttr('disabled');
            $("#btnLevel" + iIndex + "UnselectAll").removeAttr('disabled');
        }
    }
}

//Handle UnSelect All action for all levels of report.
function OperateBtnUnSelectAll(iIndex) {
    $(".printableColLevel" + iIndex).each(function () {
        $(this).attr('checked', false);
    });

    $("#btnLevel" + iIndex + "Edit").attr('disabled', 'disabled');
    $("#btnLevel" + iIndex + "Delete").attr('disabled', 'disabled');
    $("#btnLevel" + iIndex + "UnselectAll").attr('disabled', 'disabled');
}

function OperationBeforeDelete(columnID, levelNo) {
    var chkId = null;
    if ($("#Id_" + columnID).next().is('li')) {
        $("#Id_" + columnID).next().addClass('highlightClass');
        chkId = $("#Id_" + columnID).next().find('input:checkbox').attr('id');
    }
    else if ($("#Id_" + columnID).prev().is('li')) {
        $("#Id_" + columnID).prev().addClass('highlightClass');
        chkId = $("#Id_" + columnID).prev().find('input:checkbox').attr('id');
    }

    $("#Id_" + columnID).remove();
    $("#btnLevel" + levelNo + "Edit").attr('disabled', 'disabled');
    $("#btnLevel" + levelNo + "Delete").attr('disabled', 'disabled');
    OperateState(chkId, levelNo);
}

//Control the state of report LEVEL's based on tracking history values.
function ControlLevelState(iIndex) {
    if ($("#lstLevel" + (iIndex + 1) + "TblName > option").length > 1) {
        $("#liPane" + (iIndex + 1)).removeAttr("disabled");
        $("#liPane" + (iIndex + 1) + " a").attr("data-toggle", "tab");
        $("#lstLevel" + (iIndex + 1) + "TblName").removeAttr('disabled');
        $("#lstLevel" + (iIndex + 1) + "ViewName").removeAttr('disabled');
    }
    else {
        for (i = (iIndex + 1) ; i <= 3 ; i++) {
            $("#liPane" + i).attr('disabled', 'disabled');
            $("#liPane" + i + " a").removeAttr("data-toggle");
            ResetLevel(i);
        }
    }
}