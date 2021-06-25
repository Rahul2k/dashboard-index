var jsTreeName = '#jstree_view_div';
var bupperlast = false;
var blowerlast = false;

$(function () {
    $.ajaxSetup({ cache: false });
});

function RootItemClick(vRootId) {
    if (vRootId != undefined) {        
        var vNodeId = vRootId.trim().split('_')[2];
        $('#title, #navigation').text(vrCommonRes['mnuViews']);
        var root = $('#' + vRootId).parent().parent().parent().find('a')[0].id;
        $('#' + root).parent().find('ul#ulViews li ul li').find('a').removeClass('selectedMenu');
        setCookie('hdnAdminMnuIds', (root + '|' + vRootId), 1);
        $('#' + vRootId).parent().find('ul li a').removeAttr('style');
        $("#rootTreeNode").val(vRootId);
        $.ajax({
            url: urls.Views.LoadViewsList,
            contentType: 'application/html; charset=utf-8',
            type: 'GET',
            dataType: 'html'
        })
       .done(function (result) {
           $('#LoadUserControl').empty();
           $('#LoadUserControl').html(result);
           if (bupperlast) {
               $('#btnUp').attr('disabled', 'disabled');
               $('#btnDown').removeAttr('disabled');
           }
           if (blowerlast) {
               $('#btnDown').attr('disabled', 'disabled');
               $('#btnUp').removeAttr('disabled');
           }
           /* Secuirty Integration - Added by Ganesh*/
           if (!IS_ADMIN) {
               $('#btnAdd').remove();
               $('#btnDelete').remove();
           }
           /* End Security Integration */           
           $('#pnlViews').show();
           $('#lblViewName').text($('#' + vRootId).html());

           var vChildNode = $('#' + vRootId).parent().find('ul li');
           $('#lstViewsList').empty();
           var i = 0;
           if (vChildNode.length <= 1)
               $("#btnDelete").attr('disabled', 'disabled');
           else
               $("#btnDelete").removeAttr('disabled');

           var elemId = '';
           var elemText = '';
           var firstChildId = '';
           $(vChildNode).each(function (index, value) {
               elemId = value.innerHTML.split('id="')[1].split('"')[0];
               elemText = value.innerHTML.split('">')[1].split('</')[0];
               if (i == 0) {
                   firstChildId = elemId;
               }
               if (i == vChildNode.length - 1)
                   i = -1;
               $('#lstViewsList').append("<option class='checkvalidation' check_data=" + i + " value='" + elemId + "'>" + elemText + "</option>");
               i++;
           });

           if (vChildNode.length >= 1) { $("#lstViewsList").val(firstChildId); }
           $('#lstViewsList').change(function () {               
               $("#lstViewsList option:selected").each(function () {                   
                   if ($(this).attr("check_data").toString().trim() == "0")
                       $('#btnUp').attr('disabled', 'disabled');
                   else
                       $('#btnUp').removeAttr('disabled');
                   if ($(this).attr("check_data").toString().trim() == "-1")
                       $('#btnDown').attr('disabled', 'disabled');
                   else
                       $('#btnDown').removeAttr('disabled');
                   if ($(this).attr("check_data").toString().trim() != "-1" && $(this).attr("check_data").toString().trim() != "0") {
                       $('#btnUp, #btnDown').removeAttr('disabled');
                   }
               });
           }).change();
           if ($('#lstViewsList option').length == 1) {
               $('#btnUp, #btnDown').attr('disabled', 'disabled');
           }           
           $('#btnUp').on('click', function () {               
               var vSelectedViewId = $("#lstViewsList").val().split('_')[1];
               $("#childTreeNode").val("test_childViews_" + vSelectedViewId);
               if (vSelectedViewId == undefined || vSelectedViewId == "" || vSelectedViewId == 0) {
                   showAjaxReturnMessage(vrViewsRes["msgJsViewsPlzSelectViewfrmLst"], 'w');
                   return false;
               }
               ViewsOrderChange("U", vSelectedViewId);
               return true;
           });
           $('#btnDown').on('click', function () {               
               var vSelectedViewId = $("#lstViewsList").val().split('_')[1];
               $("#childTreeNode").val("test_childViews_" + vSelectedViewId);
               if (vSelectedViewId == undefined || vSelectedViewId == "" || vSelectedViewId == 0) {
                   showAjaxReturnMessage(vrViewsRes["msgJsViewsPlzSelectViewfrmLst"], 'w');
                   return false;
               }
               ViewsOrderChange("D", vSelectedViewId);
               return true;
           });
           $('#btnEdit').on('click', function () {
               var vSelectedViewId = $("#lstViewsList").val().split('_')[1];
               if (vSelectedViewId == undefined || vSelectedViewId == "" || vSelectedViewId == 0) {
                   showAjaxReturnMessage(vrViewsRes["msgJsViewsPlzSelectViewfrmLst"], 'w');
                   return false;
               }
               GetViewDetailData(vSelectedViewId, "E");
               //CheckTableExistence(vSelectedViewId, "E");
               $('.drillDownMenu').find('a').removeClass('selectedMenu');
               $('#ulViews li ul.displayed').find('a#FAL_' + vSelectedViewId).addClass('selectedMenu');
               return true;
           });
           $('#btnAdd').on('click', function () {
               //var vSelectedViewId = $('ul#ulViews li ul.displayed').parent().find('a')[0].id.split('_')[2];
               var vSelectedViewId;
               if ($("#lstViewsList").val() == null) {
                   vSelectedViewId = getCookie('hdnAdminMnuIds').split('_')[2];
               }
               else {
                   vSelectedViewId = ($('#FAL_' + $("#lstViewsList").val().split('_')[1]).parent().parent().parent().find('a')[0].id.split('_')[2]);
                   if (!$('#' + $("#lstViewsList").val()).parent().parent().hasClass('.displayed')) {
                       $('#' + $('#' + $("#lstViewsList").val()).parent().parent().parent().find('a')[0].id).trigger('click');
                   }
               }
               
               if (vSelectedViewId == "" || vSelectedViewId == 0) {
                   ShowErrorMessge(); 
                   return false;
               }
               $("#childTreeNode").val('');
               GetViewDetailData(vSelectedViewId, "N");
               //CheckTableExistence(vSelectedViewId, "N");
               return true;
           });
           $('#btnDelete').on('click', function () {
               var vSelectedViewId = $("#lstViewsList").val().split('_')[1]; //$("#lstViewsList").val();
               if (vSelectedViewId == undefined || vSelectedViewId == "" || vSelectedViewId == 0) {
                   showAjaxReturnMessage(vrViewsRes["msgJsViewsPlzSelectViewfrmLst"], 'w');
                   return false;
               }

               $(this).confirmModal({
                   confirmTitle: 'TAB FusionRMS',
                   confirmMessage: vrViewsRes['tlJsViewsAreUSureUWant2DelTheSelView'],
                   confirmOk: vrCommonRes['Yes'],
                   confirmCancel: vrCommonRes['No'],
                   confirmStyle: 'default',
                   confirmObject: vSelectedViewId,
                   confirmCallback: DeleteView
               });
               return true;
           });
           
           //if (!$('#' + vRootId).parent().find('ul').hasClass('displayed active')) {          
           //    setCookie('hdnAdminMnuIds', 'treeViews|' + vRootId, 1);               
           //    window.location.reload();
           //}
           return true;
       })
       .fail(function (xhr, status) {
           ShowErrorMessge();
       });
    }
}
function ChildItemClick(root, firstLvl, vChildId) {
    $('#pnlViews').hide();
    var vViewId = vChildId.split('_')[1];
    setCookie('hdnAdminMnuIds', (root + '|' + firstLvl + '|' + vChildId), 1);
    $('ul#ulViews li ul.displayed li a').removeAttr('style');
    $('.divMenu').find('a.selectedMenu').removeClass('selectedMenu');
    $('#' + vChildId).addClass('selectedMenu');
    GetViewDetailData(vViewId, "E");
    //CheckTableExistence(vViewId, "E");
}
function ViewsOrderChange(vAction, vViewId) {
    $.ajax({
        async: true,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: urls.Views.ViewsOrderChange,
        data: { pAction: vAction, pViewId: vViewId }
    })
        .done(function (result) {
            var listbox = document.getElementById('lstViewsList');
            var selIndex = listbox.selectedIndex;

            var increment = -1;
            if (vAction == 'U')
                increment = -1;
            else
                increment = 1;

            if ((selIndex + increment) < 0 ||
                (selIndex + increment) > (listbox.options.length - 1)) {
                return;
            }

            var selValue = listbox.options[selIndex].value;
            var selText = listbox.options[selIndex].text;
            listbox.options[selIndex].value = listbox.options[selIndex + increment].value;
            listbox.options[selIndex].text = listbox.options[selIndex + increment].text;

            listbox.options[selIndex + increment].value = selValue;
            listbox.options[selIndex + increment].text = selText;

            listbox.selectedIndex = selIndex + increment;
            var newMenuList = '';
            var parentId = $('ul#ulViews').find('#' + selValue).parent().parent().parent().find('a')[0].id;

            //Added By Akruti
            if (listbox.selectedIndex <= 0) {
                $('#btnUp').attr('disabled', 'disabled');
                $('#btnDown').removeAttr('disabled', 'disabled');
            } else if (listbox.selectedIndex >= listbox.options.length - 1) {
                $('#btnDown').attr('disabled', 'disabled');
                $('#btnUp').removeAttr('disabled', 'disabled');
            } else {
                $('#btnDown').removeAttr('disabled', 'disabled');
                $('#btnUp').removeAttr('disabled', 'disabled');
            }

            //Added By Akruti
            $('#lstViewsList option').each(function (index, value) {
                $(this).attr('check_data', (index == 0 ? '0' : ((index == $('#lstViewsList option').length - 1) ? '-1' : '1')));
                newMenuList += '<li><a id="' + $(this).val() + '" onclick="ChildItemClick(\'treeViews\',\'' + parentId + '\',\'' + $(this).val() + '\')">' + $(this).text() + '</a></li>';
            });
            //$('ul#ulViews li ul.displayed').html(newMenuList);
            $('ul#ulViews').find('#' + selValue).parent().parent().parent().find('ul').html(newMenuList);
        })
        .fail(function (xhr, status) {
            ShowErrorMessge();
        });
}
//function CheckTableExistence(vViewId, vAction) {
//    $.ajax({
//        url: urls.Views.CheckTableExistence,
//        contentType: 'application/html; charset=utf-8',
//        type: 'GET',
//        data: { pViewId: vViewId, sAction: vAction },
//        dataType: 'html'
//    }).success(function (data) {
//        var jsonObject = $.parseJSON(data);
//        if (jsonObject.exists == true) {
//            GetViewDetailData(vViewId, vAction);
//        } else {
//            showAjaxReturnMessage(vrViewsRes["msgJsViewsInvalidObjName"], 'w');
//        }



//    }).error(function (e) { });
//}


function GetViewDetailData(vViewId, vAction) {
    /* Hasmukh : Added on 04/04/2016 - Security check */
    var vliApplication = $("#liViews");
    if (vliApplication.length == 0) {
        $('#LoadUserControl').empty();
        $('#title').text('');
        $('#navigation').text('');
        return false;
    }
    $.ajax({
        url: urls.Views.LoadViewsSettings,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        data: { pViewId: vViewId, sAction: vAction },
        dataType: 'html'
    }).done(function (result) {
                $('#LoadUserControl').empty();
                $('#LoadUserControl').html(result);
                /* Start - View Details settings */

                var sortGrid = true;
                $.getJSON(urls.Views.GetViewsRelatedData, { sTableName: $("#ViewsModel_TableName").val(), pViewId: vViewId }, function (data) {
                    if (data.errortype == "s") {
                        $("#ViewsModel_SearchableView").prop('checked', data.bSearchableView);
                        $("#ViewsModel_InTaskList").prop('checked', data.bTaskList);
                        $("#ViewsModel_IncludeFileRoomOrder").prop('checked', data.bInFileRoomOrder);
                        $("#ViewsModel_IncludeTrackingLocation").prop('checked', data.bIncludeTrackingLocation);

                        if (vAction == "E")
                            $("#txtViewId").val(vViewId);
                        else {
                            $("#txtViewId").val("New");
                            $("#ViewsModel_MaxRecsPerFetch").val(data.MaxRecsPerFetch);
                        }

                        $("#ViewsModel_MaxRecsPerFetch").OnlyNumericWithoutDot();

                        if ($("#ViewsModel_MultiParent").val() != undefined) {
                            if ($("#ViewsModel_MultiParent").val().trim().toString().toLowerCase() == "true") {
                                $("#ViewsModel_IncludeFileRoomOrder").prop("disabled", true);
                                $("#ViewsModel_IncludeTrackingLocation").prop("disabled", true);
                                $("#ViewsModel_SearchableView").prop("disabled", true);
                                $("#ViewsModel_MaxRecsPerFetch").val("0");
                                $("#ViewsModel_MaxRecsPerFetch").prop("disabled", true);
                                $("#ViewsModel_InTaskList").prop("disabled", true);
                                $("#ViewsModel_TaskListDisplayString").prop("disabled", true);
                            }
                        }

                        if (!$("#ViewsModel_InTaskList").is(':checked'))
                            $("#ViewsModel_TaskListDisplayString").prop("disabled", true);

                        if (data.sltableFileRoomOrderCount == 0)
                            $("#ViewsModel_IncludeFileRoomOrder").prop("disabled", true);
                        else
                            $("#ViewsModel_IncludeFileRoomOrder").prop("disabled", false);

                        if (data.bTrackable == false)
                            $("#ViewsModel_IncludeTrackingLocation").prop("disabled", true);
                        else
                            $("#ViewsModel_IncludeTrackingLocation").prop("disabled", false);

                        if (data.btnColumnAdd == false) {
                            $('#btnAddColumn, #btnEditColumn, #btnDeleteColumn, #btnSortByColumn').hide();
                            sortGrid = false;
                        }
                        if (data.ShouldEnableMoveFilter == true)
                            $('#btnMoveFilterintoSQL').removeAttr('disabled');
                        else
                            $('#btnMoveFilterintoSQL').attr('disabled', 'disabled');

                        $("#bSaveViews").val("true");
                        $("#grdViewColumns").gridLoadViews(urls.Views.GetViewColumnsList + '?intViewsId=' + vViewId + '&sAction=' + vAction, 'View Columns', false, sortGrid);


                        $('#ViewFilterList_0__OpenParen').AllowOnlyCharater('(');
                        $('#ViewFilterList_0__CloseParen').AllowOnlyCharater(')');

                        if (parseInt($("#hdnGridColCount").val()) <= 0) {
                            $("#btnFilterByColumn, #btnEditColumn, #btnDeleteColumn, #btnSortByColumn").attr('disabled', 'disabled');
                        }
                        else {
                            $("#btnFilterByColumn, #btnEditColumn, #btnDeleteColumn, #btnSortByColumn").removeAttr('disabled');
                        }

                        //Added by Akruti
                        $('#btnAddColumn').click(function () {
                            $("#bSaveViews").val("false");
                            var tableName = $("#ViewsModel_TableName").val();
                            var oViewId = $("#ViewsModel_Id").val();
                            LoadViewColumn(tableName, oViewId, true, vAction, sortGrid);
                        });

                        $('#btnEditColumn').click(function () {
                            var reportNameOrId = $('#grdViewColumns').getGridParam('selrow');
                            if (reportNameOrId == null) {
                                showAjaxReturnMessage(vrViewsRes["msgJsViewsPlzSelectTheRow2EditViewCol"], 'w');
                                return false;
                            } else {
                                var tableName = $("#ViewsModel_TableName").val();
                                var oViewId = $("#ViewsModel_Id").val();
                                LoadViewColumn(tableName, oViewId, false, vAction, sortGrid);
                            }
                            return true;
                        });

                        $('#btnDeleteColumn').click(function (data) {
                            var vViewColumnId = $('#grdViewColumns').getGridParam('selrow');
                            if (vViewColumnId == null) {
                                showAjaxReturnMessage(vrViewsRes["msgJsViewsPlzSelectTheRow2EditViewCol"], 'w');
                                return false;
                            } else {
                                $(this).confirmModal({
                                    confirmTitle: 'TAB FusionRMS',
                                    confirmMessage: vrDirectoriesRes['msgJsDirectoriesSure2RemoveRec'],
                                    confirmOk: vrCommonRes["Yes"],
                                    confirmCancel: vrCommonRes["No"],
                                    confirmStyle: 'default',
                                    confirmCallback: function () {
                                        var oViewId = $("#ViewsModel_Id").val();
                                        var rowCount = $("#divFilterRow").find('.filterfullrow').length;
                                        var FilteColNumrArray = [];
                                        for (i = 0; i <= rowCount - 1; i++) {
                                            FilteColNumrArray.push($('#ViewFilterList_' + i + '__ColumnNum').val());
                                        }
                                        var arrSerialized = JSON.stringify(FilteColNumrArray);
                                        $.post(urls.Reports.DeleteViewColumn, { vViewId: oViewId, vViewColumnId: vViewColumnId, arrSerialized: arrSerialized }, function (data) {
                                            if (data) {
                                                if (data.errortype == "s") {
                                                    var tableName = $("#ViewsModel_TableName").val();
                                                    $.post(urls.Views.RefreshViewColGrid, { vViewId: oViewId, tableName: tableName }, function (data) {
                                                        if (data) {
                                                            if (data.errortype == "s") {
                                                                $("#grdViewColumns").refreshJqGrid();
                                                                var records = jQuery("#grdViewColumns").jqGrid('getGridParam', 'records');
                                                                if (records <= 1) {
                                                                    $("#btnEditColumn, #btnDeleteColumn, #btnFilterByColumn, #btnSortByColumn").attr('disabled', 'disabled');
                                                                }
                                                                else {
                                                                    $("#btnEditColumn, #btnDeleteColumn, #btnFilterByColumn, #btnSortByColumn").removeAttr('disabled');
                                                                }
                                                            }
                                                        }
                                                    });
                                                    showAjaxReturnMessage(data.message, data.errortype);
                                                } else if (data.errortype == "w") {
                                                    confirmTitle = 'TAB FusionRMS';
                                                    confirmMessage = data.message;
                                                    confirmOk = vrCommonRes["Ok"];
                                                    ShowWarning(confirmTitle, confirmMessage, confirmOk);
                                                }
                                            }
                                        });
                                        return true;
                                    }
                                });
                                return true;
                            }
                        });
                    }
                    else {
                        showAjaxReturnMessage(data.errorMessage, data.errortype);
                    }

                    setTimeout(function () {
                        if ($('.content-wrapper').hasScrollBar()) {
                            $('#btnApplyViewSetting').parent().addClass('stick');
                            var s = $(".sticker");
                            $('.content-wrapper').scroll(function () {
                                if ($(this)[0].scrollHeight >= (($(this).height() + $(this).scrollTop()) + 10)) {
                                    s.addClass("stick");
                                }
                                else {
                                    s.removeClass("stick");
                                }
                            });
                        }
                        else {
                            $('#btnApplyViewSetting').parent().removeClass('stick');
                        }
                    }, 1000);
                });
                restrictSpecialWord();
                /* End - View Details settings */

                /* Start - View Advance filters.... */
                $("#ViewsModel_InTaskList").on('click', function (e) {
                    if ($(this).is(":checked"))
                        $("#ViewsModel_TaskListDisplayString").prop("disabled", false);
                    else
                        $("#ViewsModel_TaskListDisplayString").prop("disabled", true);
                });
                /* End - View Advance filters.... */

                /* Start - Filter by.... */
                $("#btnFilterByColumn").on('click', function (e) {

                    $("#ViewFilterList_0__ViewsId").val($("#ViewsModel_Id").val());

                    $.ajax({
                        async: false,
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: urls.Views.GetFilterData1,
                        data: { oViewId: $("#ViewsModel_Id").val() },
                        success: function (response) {
                            var pFilterDataObj = $.parseJSON(response.filterColumnsJSON);
                            var pColumnsDataObj = $.parseJSON(response.jsonColumns);
                            $('#ViewFilterList_0__ColumnNum').empty();
                            if (response.AdvancedJsonFlag || response.joinOrOperatorExist) {
                                $("#chkAdvanceFilters").prop('checked', true);
                                $('#chkAdvanceFilters').attr('disabled', 'disabled');
                            }
                            else {
                                $("#chkAdvanceFilters").prop('checked', false);
                                $('#chkAdvanceFilters').removeAttr('disabled', 'disabled');
                            }
                            $(pColumnsDataObj).each(function (i, item) {
                                var ColumnNumVal;
                                var LookupIdColVal;
                                if (item.Value.indexOf("_") >= 0) {
                                    var array = item.Value.split('_');
                                    ColumnNumVal = parseInt(array[0]);
                                    LookupIdColVal = parseInt(array[1]);
                                    if (item.Value.indexOf("*") >= 0) {
                                        $('#ViewFilterList_0__ColumnNum').append("<option value=" + LookupIdColVal + " id=" + ColumnNumVal + "_" + LookupIdColVal + ">" + item.Key + "</option>");
                                    } else {
                                        $('#ViewFilterList_0__ColumnNum').append("<option value=" + ColumnNumVal + " id=" + ColumnNumVal + "_" + ColumnNumVal + ">" + item.Key + "</option>");
                                    }
                                }
                            });

                            var control = $('#ViewFilterList_0__ColumnNum');
                            if (pFilterDataObj.length <= 0) {
                                $('#ViewFilterList_0__Id').val("-1");
                                $('#ViewFilterList_0__ColumnNum option:first').attr('selected', true);
                                var optionId = $('#ViewFilterList_0__ColumnNum :selected').attr('Id');
                                var optionVal = $('#ViewFilterList_0__ColumnNum :selected').val();
                                var iColumnNumVar = 0;
                                if (optionId !== undefined && optionId !== null) {
                                    iColumnNumVar = parseInt(optionId.split('_')[0] == null ? 0 : optionId.split('_')[0]);
                                    if (optionId !== (optionVal + "_" + optionVal)) {
                                        $("#ViewFilterList_0__DisplayColumnNum").val(Number(Number(iColumnNumVar) - 1));
                                    } else {
                                        $("#ViewFilterList_0__DisplayColumnNum").val("-1");
                                    }
                                }

                                $.post(urls.Views.GetOperatorDDLData, { iViewId: $("#ViewsModel_Id").val(), iColumnNum: iColumnNumVar })
                                    .done(function (response) {
                                        var jsonObjectOperator = $.parseJSON(response.jsonObjectOperator);
                                        var jsonFilterControls = $.parseJSON(response.jsonFilterControls);
                                        /* Fill Operator DDL */
                                        var ddlOperatorObject = control.closest('.filterfullrow').find('.ddlOperator');
                                        ddlOperatorObject.empty();
                                        $(jsonObjectOperator).each(function (i, item) {
                                            $("#ViewFilterList_0__Operator").append($("<option>", { value: item.Key, html: item.Value }));
                                        });
                                        var divId = ddlOperatorObject.attr('id');

                                        $("#hdnOperatorData").val(response.jsonObjectOperator);

                                        ValidateFilterControls(jsonFilterControls, divId);
                                        if (jsonFilterControls["FieldDDL"]) {
                                            var sValueFieldNameJSON = $.parseJSON(response.sValueFieldNameJSON);
                                            var sLookupFieldJSON = $.parseJSON(response.sLookupFieldJSON);
                                            var sFirstLookupJSON = $.parseJSON(response.sFirstLookupJSON);
                                            var sSecondLookupJSON = $.parseJSON(response.sSecondLookupJSON);
                                            var sRecordJSON = $.parseJSON(response.sRecordJSON);
                                            FillFieldComboBox(sValueFieldNameJSON, sLookupFieldJSON, sFirstLookupJSON, sSecondLookupJSON, sRecordJSON, divId);
                                        }

                                    })
                                .fail(function (xhr, status, error) {
                                    ShowErrorMessge();
                                });

                                $('#hdnFilterRow').empty();
                                $('#hdnFilterRow').val($('.filterfullrow').html());
                                $("#divFilterRow").empty();
                            }
                            else {
                                $(pFilterDataObj).each(function (i, item) {
                                    if (i == 0) {
                                        $('#hdnFilterRow').empty();
                                        $('#hdnFilterRow').val($('.filterfullrow').html());
                                        $("#divFilterRow").empty();
                                    }

                                    $("#hdnCallfrom").val('Y');
                                    $("#btnNewLine").trigger("click");
                                    var colNo = 0;
                                    $("#ViewFilterList_" + i + "__DisplayColumnNum").val(item.DisplayColumnNum);
                                    $("#ViewFilterList_" + i + "__Id").val(item.Id);
                                    $("#ViewFilterList_" + i + "__OpenParen").val(item.OpenParen);
                                    $("#ViewFilterList_" + i + "__CloseParen").val(item.CloseParen);
                                    if (item.JoinOperator !== null)
                                        $('input[name="ViewFilterList[' + i + '].JoinOperator"]').filter('[value=' + item.JoinOperator + ']').attr('checked', 'checked');
                                    else
                                        $('input[name="ViewFilterList[' + i + '].JoinOperator"]').each(function () { $(this).prop('checked', false); });
                                    $("#ViewFilterList_" + i + "__Active").prop('checked', item.Active);
                                    if (item.DisplayColumnNum > 0) {
                                        $("#ViewFilterList_" + i + "__ColumnNum option[id='" + (Number(item.DisplayColumnNum) - 1) + "_" + item.ColumnNum + "']").attr('selected', true);
                                        colNo = (Number(item.DisplayColumnNum) - 1);
                                    }
                                    else {
                                        $("#ViewFilterList_" + i + "__ColumnNum option[id='" + item.ColumnNum + "_" + item.ColumnNum + "']").attr('selected', true);
                                        colNo = item.ColumnNum;
                                    }
                                    $.ajax({
                                        async: false,
                                        type: "GET",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        url: urls.Views.GetOperatorDDLData,
                                        data: { iViewId: $("#ViewsModel_Id").val(), iColumnNum: colNo },
                                        success: function (response) {
                                            var jsonObjectOperator = $.parseJSON(response.jsonObjectOperator);
                                            var jsonFilterControls = $.parseJSON(response.jsonFilterControls);
                                            /* Fill Operator DDL */
                                            var control = $("#ViewFilterList_" + i + "__ColumnNum");
                                            var ddlOperatorObject = control.closest('.filterfullrow').find('.ddlOperator');
                                            ddlOperatorObject.empty();
                                            $(jsonObjectOperator).each(function (i, item) {
                                                ddlOperatorObject.append($("<option>", { value: item.Key, html: item.Value }));
                                            });
                                            if (i == 0)
                                                $("#hdnOperatorData").val(response.jsonObjectOperator);
                                            $("#ViewFilterList_" + i + "__Operator option[value='" + item.Operator + "']").attr('selected', true);
                                            var divId = ddlOperatorObject.attr('id');

                                            ValidateFilterControls(jsonFilterControls, divId);

                                            if (jsonFilterControls["FieldDDL"]) {
                                                var sValueFieldNameJSON = $.parseJSON(response.sValueFieldNameJSON);
                                                var sLookupFieldJSON = $.parseJSON(response.sLookupFieldJSON);
                                                var sFirstLookupJSON = $.parseJSON(response.sFirstLookupJSON);
                                                var sSecondLookupJSON = $.parseJSON(response.sSecondLookupJSON);
                                                var sRecordJSON = $.parseJSON(response.sRecordJSON);
                                                FillFieldComboBox(sValueFieldNameJSON, sLookupFieldJSON, sFirstLookupJSON, sSecondLookupJSON, sRecordJSON, divId);
                                                $("#ViewFilterList_" + i + "__sscComboBox option[value='" + item.FilterData + "']").attr('selected', true);
                                            }
                                            if (jsonFilterControls["FieldTextBox"]) {
                                                $("#ViewFilterList_" + i + "__txtFilterData").val(item.FilterData);
                                            }
                                            if (jsonFilterControls["chkYesNoField"]) {
                                                if (item.FilterData == "1") {
                                                    $("#ViewFilterList_" + i + "__chkYesNoField").prop("checked", true);
                                                    $("#ViewFilterList_" + i + "__chkYesNoField").val("1");
                                                }
                                                else {
                                                    $("#ViewFilterList_" + i + "__chkYesNoField").prop('checked', false);
                                                    $("#ViewFilterList_" + i + "__chkYesNoField").val("0");
                                                }
                                            }
                                        }
                                    });
                                });
                            }
                            var rowCounts = pFilterDataObj.length;
                            DisabledFilterControls(rowCounts);
                            $("#mdlViewsFilters").ShowModel();
                        }
                    });
                });
                /* End - Filter by.... */

                /* Start - View Advance filters.... */
                $("#chkAdvanceFilters").on('click', function (e) {
                    if ($(this).is(":checked"))
                        $(".hideControls").show();
                    else
                        $(".hideControls").hide();
                });
                /* End - View Advance filters.... */

                /* Start - New Line add */
                $("#btnNewLine").on('click', function (e) {
                    var strHTML = $('#hdnFilterRow').val();
                    var rowCountForcontrol = $("#divFilterRow").find('.filterfullrow').length;
                    var rowCount = $("#divFilterRow").find('.filterfullrow:visible').length;
                    for (i = 0; i <= rowCountForcontrol - 1 ; i++) {
                        if (!$('input[name="ViewFilterList[' + i + '].JoinOperator"]').is(":checked")) {
                            $('input[name="ViewFilterList[' + i + '].JoinOperator"]').filter('[value=And]').attr('checked', 'checked');
                        }
                    }
                    if (rowCount < 10) {
                        var reg = new RegExp("\[0]", "gi");
                        var reg1 = new RegExp("_0__", "g");
                        strHTML = strHTML.replace(reg1, "_" + rowCountForcontrol + "__");
                        strHTML = strHTML.replace(/\[0]/gi, "[" + rowCountForcontrol + "]");
                        $('#divFilterRow').append("<div class=\"filterfullrow\">" + strHTML + "</div>");
                        $('#ViewFilterList_' + rowCountForcontrol + '__OpenParen').AllowOnlyCharater('(');
                        $('#ViewFilterList_' + rowCountForcontrol + '__CloseParen').AllowOnlyCharater(')');
                        if ($('#ViewFilterList_' + rowCountForcontrol + '__Id').val() == "")
                            $('#ViewFilterList_' + rowCountForcontrol + '__Id').val('-' + (Number(rowCountForcontrol) + 1));

                        if ($("#chkAdvanceFilters").is(":checked"))
                            $(".hideControls").show();
                        else
                            $(".hideControls").hide();

                        if ($("#hdnOperatorData").val() != "") {
                            if ($("#hdnCallfrom").val() == '') {
                                getValue($("#ViewFilterList_" + rowCountForcontrol + "__Operator"));
                            }

                        }
                        var rowCountForcontrolLast = $("#divFilterRow").find('.filterfullrow').length;
                        $('input[name="ViewFilterList[' + (rowCountForcontrolLast - 1) + '].JoinOperator"]').each(function () { $(this).prop('checked', false); });
                        $("#hdnCallfrom").val('');

                        //Operator Change Event..... Added by Akruti
                        $('input[name="ViewFilterList[' + rowCountForcontrol + '].JoinOperator"]').on('change', function (e) {
                            //This sections is used to disable/enable 'Advanced Filter' checkbox
                            var flag = true;
                            if ($(this).val() == "And") {
                                var checkCounterTrue = 0;
                                $("#divFilterRow ").find('.filterfullrow:visible').find("input[name$='.Active']").each(function () {
                                    if (this.checked)
                                        checkCounterTrue = checkCounterTrue + 1;
                                });

                                $("#divFilterRow").find('.filterfullrow').each(function (i, item) {
                                    if ($(this).is(':visible')) {
                                        var JoinOperatorVal = $('input[name="ViewFilterList[' + i + '].JoinOperator"]:checked').val();
                                        var OpenPar = $("#ViewFilterList_" + i + "__OpenParen").val();
                                        var Closepar = $("#ViewFilterList_" + i + "__CloseParen").val();
                                        var IsAllActive = checkCounterTrue == $("#divFilterRow ").find('.filterfullrow:visible').find("input[name$='.Active']").length;

                                        if (JoinOperatorVal == "Or" || (OpenPar !== "" && OpenPar !== null) || (Closepar !== "" && Closepar !== null) || IsAllActive == false) {
                                            flag = false;
                                            return false;
                                        }
                                    }
                                    return true;
                                });
                                if (flag)
                                    $('#chkAdvanceFilters').removeAttr('disabled');
                                else
                                    $('#chkAdvanceFilters').attr('disabled', 'disabled');
                            } else if ($(this).val() == "Or") {
                                $('#chkAdvanceFilters').attr('disabled', 'disabled');
                            }
                            //This sections is used to disable/enable 'Advanced Filter' checkbox


                            //This section is used to add a new line
                            var totalRowDiv = $("#divFilterRow").find('.filterfullrow').length;
                            var i;
                            flag = true;
                            for (i = (rowCountForcontrol + 1) ; i < totalRowDiv ; i++) {
                                var viewsIdVal = $('#ViewFilterList_' + (i) + '__ViewsId').val();
                                if (viewsIdVal !== undefined && parseInt(viewsIdVal) !== -1) {
                                    flag = true;
                                    break;
                                }
                                else {
                                    flag = false;
                                }
                            }
                            var viewsIdValNext = $('#ViewFilterList_' + (rowCountForcontrol + 1) + '__ViewsId').val();
                            if ((viewsIdValNext == undefined) || (flag == false))
                                $("#btnNewLine").trigger("click");
                        });
                        //This section is used to add a new line
                        //Operator Change Event..... Added By Akruti
                    }
                    else {
                        //Modified by Hemin
                        //showAjaxReturnMessage('There is a limit of 10 filters.', 'e');
                        showAjaxReturnMessage(vrViewsRes["msgJsViewsThrIsLimitOf10Filters"], 'e');
                    }
                    var rowCounts = $("#divFilterRow").find('.filterfullrow:visible').length;
                    DisabledFilterControls(rowCounts);
                });
                /* End - New Line add */

                /* Start - Remove All.... */
                $("#btnRemoveAll").on('click', function (e) {
                    $(".hktest").val("-1");
                    $(".filterfullrow").hide();
                    var rowCounts = $("#divFilterRow").find('.filterfullrow:visible').length;
                    DisabledFilterControls(rowCounts);
                    $('#chkAdvanceFilters').removeAttr('disabled');
                });
                /* End - Remove All.... */

                /* Start - Cancel Filter.... */

                $("#btnCancel").on('click', function (e) {
                    if ($('#divFilterRow').is(':empty')) {
                        var rowCount123 = $("#hdnFilterRow").val();
                        $('#divFilterRow').empty();
                        $('#divFilterRow').append("<div style='display:none' class=\"filterfullrow\">" + rowCount123 + "</div>");
                        $('#hdnFilterRow').val("");
                    }
                    $("#mdlViewsFilters").HideModel();
                });
                /* Start - Cancel Filter.... */

                /* Start - Ok Click.... */
                $("#btnOk").on('click', function (e) {
                    var rowCount = $("#divFilterRow").find('.filterfullrow:visible').length;
                    var $form = $('#frmViewsSettings');
                    var serializedForm = $form.serialize() + "&EventFlag=true";
                    console.log(serializedForm);
                    $.post(urls.Views.ValidateFilterData, serializedForm)
                        .done(function (response) {
                            var moveFilterFlag = $.parseJSON(response.moveFilterFlagJSON);
                            if (moveFilterFlag == true)
                                $('#btnMoveFilterintoSQL').removeAttr('disabled');
                            else
                                $('#btnMoveFilterintoSQL').attr('disabled', 'disabled');
                            if (response.errortype == 'w') {
                                var sErrorJSON = $.parseJSON(response.sErrorJSON);
                                if (sErrorJSON !== null && sErrorJSON !== "") {
                                    showAjaxReturnMessage(sErrorJSON, response.errortype);
                                    return false;
                                }
                                else {
                                    $("#mdlViewsFilters").HideModel();
                                }
                            } else if (response.errortype == "e") {
                                showAjaxReturnMessage(response.errorMessage, response.errortype);
                            } else {

                                $("#mdlViewsFilters").HideModel();
                            }
                            return true;
                        })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });
                    var rowCountLength = $("#divFilterRow").find('.filterfullrow:visible').length;
                    if ($('#divFilterRow').is(':empty') || rowCountLength == 0) {
                        var rowCount123 = $("#hdnFilterRow").val();
                        $('#divFilterRow').empty();
                        $('#divFilterRow').append("<div style='display:none' class=\"filterfullrow\">" + rowCount123 + "</div>");
                        $('#hdnFilterRow').val("");
                    }
                });
                /* End - Ok Click.... */

                /* Start - Test Filter.... */
                $('#btnTestFilter').on('click', function (e) {
                    var $form = $('#frmViewsSettings');
                    var serializedForm = $form.serialize() + "&EventFlag=false";
                    $.post(urls.Views.ValidateFilterData, serializedForm)
                  .done(function (response) {
                      if (response.errortype == 'w') {
                          var sErrorJSON = $.parseJSON(response.sErrorJSON);
                          if (sErrorJSON !== null && sErrorJSON !== "") {
                              showAjaxReturnMessage(sErrorJSON, response.errortype);
                          } else if (sErrorJSON == "") {
                              showAjaxReturnMessage(vrViewsRes["msgJsViewsNoErrorsFound"], "s");
                          }
                      } else if (response.errortype == "e") {
                          showAjaxReturnMessage(response.errorMessage, response.errortype);
                      } else if (response.errortype == "s") {
                          showAjaxReturnMessage(vrViewsRes["msgJsViewsNoErrorsFound"], "s");
                      }
                  })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
                });
                /* End - Test FIlter.... */

                /* Start - Move Filter in SQL.... */
                $("#btnMoveFilterintoSQL").on('click', function (e) {
                    var $form = $('#frmViewsSettings');
                    var serializedForm = $form.serialize();
                    $.post(urls.Views.MoveFilterInSQL, serializedForm)
                        .done(function (response) {
                            if (response.errortype == 's') {
                                var jsonBool = $.parseJSON(response.jsonBool);
                                var jsonSQLState = $.parseJSON(response.jsonSQLState);
                                $('#btnMoveFilterintoSQL').attr('disabled', 'disabled');
                                $('#ViewsModel_SQLStatement').val(jsonSQLState);
                            } else if (response.errortype == "w") {
                                showAjaxReturnMessage(response.message, response.errortype);
                                return false;
                            }
                            return true;
                        })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });
                });
                /* End - Move Filter in SQL.... */

                /* Start : Apply click */
                $("#btnApplyViewSetting").on('click', function (e) {
                    $("#bSaveViews").val("true");
                    var lErrorMsg = "<ul>";
                    var lhasError = false;

                    if ($("#ViewsModel_SQLStatement").val() == "") {
                        lErrorMsg = String.format(vrViewsRes["msgJsViewsViewSQLStatementIsRequired"], lErrorMsg) + "\n";
                        lhasError = true;
                    }

                    if ($("#ViewsModel_ViewName").val() == "") {
                        lErrorMsg = String.format(vrViewsRes["msgJsViewsViewNameIsRequired"], lErrorMsg) + "\n";
                        lhasError = true;
                    }

                    var minRecs = 25;
                    if (($("#ViewsModel_MaxRecsPerFetch").val() == "" || parseInt($("#ViewsModel_MaxRecsPerFetch").val()) < minRecs) && (parseInt($("#ViewsModel_MaxRecsPerFetch").val()) != 0)) {
                        lErrorMsg = String.format(vrViewsRes["msgJsViewsMaxRecordsMustBeAtLeastXOrSetTo0"], lErrorMsg, minRecs) + "\n";
                        lhasError = true;
                    }
                    if ($("#ViewsModel_InTaskList").is(':checked')) {
                        if ($("#ViewsModel_TaskListDisplayString").val() == "") {
                            lErrorMsg = String.format(vrViewsRes["msgJsViewsATaskListDisplayDiscriptionIsRequired"], lErrorMsg) + "\n";
                            lhasError = true;
                        }
                    }
                    //Added by Ganesh - 23/02/2016
                    if (lhasError == false)
                        $('#ViewsModel_TaskListDisplayString').removeAttr('disabled');

                    var $form = $('#frmViewsSettings');
                    var serializedForm = $form.serialize() + "&pIncludeFileRoomOrder=" + $("#ViewsModel_IncludeFileRoomOrder").is(':checked') + "&pIncludeTrackingLocation=" + $("#ViewsModel_IncludeTrackingLocation").is(':checked') + "&pInTaskList=" + $("#ViewsModel_InTaskList").is(':checked');
                    //Add validateSqlFunction - kirti
                    $.post(urls.Views.ValidateSqlStatement, serializedForm)
                   .done(function (response) {
                       var err = 'e';
                       if (response.errortype != undefined)
                           err = response.errortype.toString();
                       if (err.valueOf() == "w") {
                           showAjaxReturnMessage(response.message, err);
                       }
                       else {
                           if (lhasError == true) {
                               showAjaxReturnMessage(lErrorMsg + "</ul>", 'w');
                               return false;
                           }
                           else {
                               $.post(urls.Views.SetViewsDetails, serializedForm)
                                       .done(function (response) {
                                           showAjaxReturnMessage(response.message, response.errortype);
                                           if (response.errortype == 's') {
                                               var ViewIdJSON = $.parseJSON(response.ViewIdJSON);
                                               $("#ViewsModel_Id").val(ViewIdJSON);
                                               $("#txtViewId").val(ViewIdJSON);
                                               var parentId = $('#ulViews li ul.displayed').parent().find('a')[0].id;
                                               $('.drillDownMenu').find('a').removeClass('selectedMenu');
                                               if ($('#' + parentId).parent().find('ul.displayed').find('#FAL_' + $("#txtViewId").val()).length == 0) {
                                                   var newLI = '<li><a id="FAL_' + $("#txtViewId").val() + '" onclick="ChildItemClick(\'treeViews\',\'' + parentId + '\',\'FAL_' + $("#txtViewId").val() + '\')">' + $('#ViewsModel_ViewName').val() + '</a></li>';
                                                   $('#' + parentId).parent().find('ul.displayed').prepend(newLI);
                                                   $('#FAL_' + $("#txtViewId").val()).addClass('selectedMenu');
                                                   $('#liViews').parent().height($('#liViews').parent().height() + 60);
                                               }
                                               else {
                                                   $('#' + parentId).parent().find('ul.displayed').find('#FAL_' + $("#txtViewId").val()).text($('#ViewsModel_ViewName').val()).addClass('selectedMenu');
                                               }
                                               //Added by Ganesh - 23/02/2016
                                               if (!$("#ViewsModel_InTaskList").is(':checked'))
                                                   $("#ViewsModel_TaskListDisplayString").prop("disabled", true);

                                               $("#grdViewColumns").refreshJqGrid();
                                           }
                                           return true;
                                       })
                                       .fail(function (xhr, status, error) {
                                           ShowErrorMessge();
                                           return false;
                                       });
                               return true;
                           }
                       }
                       return undefined;
                   })
                   .fail(function (xhr, status, error) {
                       ShowErrorMessge();
                   });
                    return true;
                });
                /* End : Apply click */
            })
            .fail(function (xhr, status) {
                ShowErrorMessge();
            });
    return true;
}
function DeleteView(vSelectedViewId) {
    $.post(urls.Views.DeleteView, $.param({ pViewId: vSelectedViewId }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        $('#lstViewsList option[value="' + $("#lstViewsList option:selected").val() + '"]').remove();
        $("#lstViewsList").val($("#lstViewsList option:first").val());
        var newMenuList = '';
        var parentId = $('ul#ulViews li ul.displayed').parent().find('a')[0].id;

        $('#lstViewsList option').each(function (index, value) {
            $(this).attr('check_data', (index == 0 ? '0' : ((index == $('#lstViewsList option').length - 1) ? '-1' : '1')));
            newMenuList += '<li><a id="' + $(this).val() + '" onclick="ChildItemClick(\'treeViews\',\'' + parentId + '\',\'' + $(this).val() + '\')">' + $(this).text() + '</a></li>';
        });
        $('ul#ulViews li ul.displayed').html(newMenuList);
        $('#liViews').parent().height($('#liViews').parent().height() - 25);
        var vChildNode = $('#' + parentId).parent().find('ul li');
        if (vChildNode.length <= 1)
            $("#btnDelete").attr('disabled', 'disabled');
        else
            $("#btnDelete").removeAttr('disabled');

        setTimeout(function () { window.location.reload(); }, 1000);
        
    });
}
//Added by Akruti
//Display View Column form when click on 'Add/Edit' button
function mdlViewColumnModelHide() {
    $('#mdlViewColumn').HideModel();
    $('#AddViewColumn').hide();
}
function LoadViewColumn(tableName, oViewId, bAddFlag, vAction, sortGrid) {
    window.tableName = tableName;
    window.LevelNum = oViewId;
    $('#AddViewColumn').empty();
    $('#AddViewColumn').load(urls.Reports.LoadViewColumn, function () {
        $('#AddViewColumn').show();
        $('#mdlViewColumn').ShowModel();
        $('#viewColumnDiv').show();
        $('#viewColumnCheck').attr('checked', true);

        if (bAddFlag) {
            DisplayFieldText(false);
            LoadOnAddClick(tableName, true, oViewId);
            LoadViewColEditSetting(bAddFlag);
            window.reportNameOrId = null;
        }
        else {
            var reportNameOrId = $('#grdViewColumns').getGridParam('selrow');
            var rowData = jQuery("#grdViewColumns").getRowData(reportNameOrId);
            var currentHeading = rowData["ColumnName"];
            DisplayFieldText(true);
            LoadOnEditClick(tableName, reportNameOrId, LevelNum, currentHeading, oViewId);
            window.reportNameOrId = "Id_" + reportNameOrId;
            //FUS-6025            
            $('#mdlViewColumn #myModalLabel.modal-title').text(vrViewsRes["tiEditCoulmnViewPartialColPrintProp"]);
        }
        // Apply add column validation
        $('#frmViewColumnDetails').validate({
            rules: {
                LookupTypeId: { required: true },
                FieldName: { required: true },
                Heading: { required: true }
            },
            ignore: ":hidden:not(select)",
            messages: {
                LookupTypeId: { required: "" },
                FieldName: { required: "" },
                Heading: { required: "" }
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
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            }
        });

        // Apply add column validation
        $('#btnColumnOk').click(function () {
            //var IsReportColumn = false;
            var $form = $('#frmViewColumnDetails');
            if ($form.valid()) {

                var fieldTypeVar = $('#FieldType').val();
                var displayMask = $('#EditMask').val();
                var fieldSizeVar = parseInt($('#FieldSize').val());
                if ((fieldTypeVar.trim() == "Text" && fieldSizeVar > 255 && displayMask !== "" && displayMask !== null) || (fieldTypeVar.trim() == "Memo" && displayMask !== "" && displayMask !== null)) {
                    var sMaskError;
                    if (fieldTypeVar.trim() == "Text")
                        sMaskError = String.format(vrViewsRes["msgJsViewsFieldGreaterThan25InSize"], fieldTypeVar);
                    else
                        sMaskError = String.format(vrViewsRes["msgJsViewsField"], fieldTypeVar);
                    $(this).confirmModal({
                        confirmTitle: 'TAB FusionRMS',
                        confirmMessage: String.format(vrViewsRes["msgJsViewsApplyingADisplayMaskToA"], sMaskError),
                        confirmOk: vrCommonRes["Yes"],
                        confirmCancel: vrCommonRes["No"],
                        confirmStyle: 'default',
                        confirmObject: false,
                        confirmCallback: SaveData
                    });
                }
                else {
                    SaveData(false);
                }
            }
        });
        restrictSpecialWord();
        setTimeout(function () {
            if ($('#mdlViewColumn').hasScrollBar()) {
                $('#mdlViewColumnClone').empty().html($('#mdlViewColumn .modal-footer').clone());
                $('#mdlViewColumnClone .modal-footer').find('#btnColumnOk').click(function () {
                    $('.modal-content .modal-footer').find('#btnColumnOk').trigger('click');
                });
                $('#mdlViewColumnClone .modal-footer').css({ 'width': ($('#mdlViewColumn').find('.modal-footer').width() + 30) + 'px', 'padding': '15px 7px 15px 15px' });

                if (($('#mdlViewColumn').get(0).scrollHeight - $('#mdlViewColumn').height()) <= 30) {
                    $('#mdlViewColumnClone').removeClass('affixed');
                }

                $('#mdlViewColumn').on('scroll', function () {
                    if ($('#mdlViewColumn').get(0).scrollHeight > (($('#mdlViewColumn').height() + $('#mdlViewColumn').scrollTop()) + 60)) {
                        $('#mdlViewColumnClone').addClass("affixed");
                    }
                    else {
                        $('#mdlViewColumnClone').removeClass("affixed");
                    }
                });
                $('#mdlViewColumn').on('hide.bs.modal', function (e) {
                    $('#mdlViewColumnClone').removeClass('affixed');
                });
            }
            else { $('#mdlViewColumnClone').hide(); }

        }, 1000);
        return undefined;
    });
} //Added by Akruti
//This section is used to enable/disable 'Advanced Feature' checkbox .....Added By Akruti
function BracketOnChange() {
    var flag = true;
    $("#divFilterRow").find('.filterfullrow').each(function (i, item) {
        if ($(this).is(':visible')) {
            var JoinOperatorVal = $('input[name="ViewFilterList[' + i + '].JoinOperator"]:checked').val();
            var OpenPar = $("#ViewFilterList_" + i + "__OpenParen").val();
            var Closepar = $("#ViewFilterList_" + i + "__CloseParen").val();
            if (JoinOperatorVal == "Or" || (OpenPar !== "" && OpenPar !== null) || (Closepar !== "" && Closepar !== null)) {
                flag = false;
                return false;
            }
        }
        return true;
    });
    if (flag)
        $('#chkAdvanceFilters').removeAttr('disabled');
    else
        $('#chkAdvanceFilters').attr('disabled', 'disabled');
}//This section is used to enable/disable 'Advanced Feature' checkbox .....Added By Akruti
function flagForFilterButton() {
    var checkCounterTrue = 0;
    var checkCounterFalse = 0;
    var AnyOr = false;
    var numberofPar = $("#divFilterRow").find('.filterfullrow:visible').find("input[name$='CloseParen']").length;

    $("#divFilterRow ").find('.filterfullrow:visible').find("input[name$='.Active']").each(function () {
        if (this.checked) {
            checkCounterTrue = checkCounterTrue + 1;
        }
        else {
            checkCounterFalse = checkCounterFalse + 1;
        }
    });
    if (checkCounterFalse == $("#divFilterRow ").find('.filterfullrow:visible').find("input[name$='.Active']").length) {
        $('#chkActiveFooter').attr('disabled', 'disabled');
    }
    else {
        $('#chkActiveFooter').removeAttr('disabled');
    }

    $("#divFilterRow ").find('.filterfullrow:visible').find("input[name$='.JoinOperator']").each(function () {
        if ($(this).is(":checked")) {
            if ($(this).val() == "Or") {
                AnyOr = true;
                return false;
            }
        }
        return true;
    });

    if ((checkCounterTrue == $("#divFilterRow ").find('.filterfullrow:visible').find("input[name$='.Active']").length) && AnyOr == false) {
        $('#chkAdvanceFilters').removeAttr('disabled');
    }
    else {
        $('#chkAdvanceFilters').attr('disabled', 'disabled');
    }

    $("#divFilterRow ").find('.filterfullrow:visible').find("input[name$='CloseParen']").each(function () {
        if (this.value) {
            $('#chkAdvanceFilters').attr('disabled', 'disabled');
        }
    });

}
function RemoveFilterRow(row) {
    row.closest('.filterfullrow').hide();
    row.closest('.filterfullrow').find('.hktest').val(-1);
    var rowCounts = $("#divFilterRow").find('.filterfullrow:visible').length;
    //var rowsData = $("#divFilterRow").find('.filterfullrow:visible');
    DisabledFilterControls(rowCounts);
    var totalCount = $("#divFilterRow").find('.filterfullrow').length;
    //Added by akruti
    var btnVal = row.val();
    var iCount;
    var m;
    var visibleCount = -1;
    var viewsIdVal;

    if (btnVal.indexOf("_") >= 0) {
        var btnIndex = btnVal.split('_');
        iCount = parseInt(btnIndex[1]);
    }
    if (iCount == parseInt(totalCount - 1)) {
        visibleCount = 0;
    }
    else {
        for (m = (iCount + 1) ; m < totalCount; m++) {
            viewsIdVal = $('#ViewFilterList_' + (m) + '__ViewsId').val();
            if (viewsIdVal !== undefined && parseInt(viewsIdVal) !== -1) {
                visibleCount = 1;
                break;
            } else {
                visibleCount = 0;
            }
        }
    }
    if (visibleCount == 0 && iCount !== 0) {
        for (m = parseInt(iCount) - 1 ; m >= 0; m--) {
            viewsIdVal = $('#ViewFilterList_' + (m) + '__ViewsId').val();
            if (viewsIdVal !== undefined && parseInt(viewsIdVal) !== -1) {
                var checkedval = $('input:radio[name="ViewFilterList[' + m + '].JoinOperator"]:checked').val();
                $('input[name="ViewFilterList[' + m + '].JoinOperator"]').filter('[value=' + checkedval + ']').removeAttr('checked', 'checked');
                break;
            }
        }
    } //Added by akruti
    flagForFilterButton();
}

function FillOperator(control, eventFlag) {
    var controlId = control.attr("Id");
    var controlOrder = controlId.split('_')[1];
    var optionId = $('#' + controlId + ' :selected').attr('Id');
    var optionVal = $('#' + controlId + ' :selected').val();
    var iColumnNumVar = parseInt(optionId.split('_')[0]);
    if (optionId !== (optionVal + "_" + optionVal)) {
        $("#ViewFilterList_" + controlOrder + "__DisplayColumnNum").val(Number(Number(iColumnNumVar) + 1));
    } else {
        $("#ViewFilterList_" + controlOrder + "__DisplayColumnNum").val("-1");
    }
    if (control.val() != undefined && control.val() >= 0) {
        $.post(urls.Views.GetOperatorDDLData, { iViewId: $("#ViewsModel_Id").val(), iColumnNum: iColumnNumVar })
                        .done(function (response) {
                            if (response.errortype == "s") {
                                var jsonObjectOperator = $.parseJSON(response.jsonObjectOperator);
                                var jsonFilterControls = $.parseJSON(response.jsonFilterControls);
                                var divId = control.closest('.filterfullrow').find('.ddlOperator').attr('id');
                                ValidateFilterControls(jsonFilterControls, divId);
                                control.closest('.filterfullrow').find('.ddlOperator').empty();
                                $(jsonObjectOperator).each(function (i, item) {
                                    control.closest('.filterfullrow').find('.ddlOperator').append($("<option>", { value: item.Key, html: item.Value }));
                                });
                                if (jsonFilterControls["FieldDDL"]) {
                                    //console.log(jsonFilterControls["FieldDDL"]);
                                    var sValueFieldNameJSON = $.parseJSON(response.sValueFieldNameJSON);
                                    var sLookupFieldJSON = $.parseJSON(response.sLookupFieldJSON);
                                    var sFirstLookupJSON = $.parseJSON(response.sFirstLookupJSON);
                                    var sSecondLookupJSON = $.parseJSON(response.sSecondLookupJSON);
                                    var sRecordJSON = $.parseJSON(response.sRecordJSON);
                                    FillFieldComboBox(sValueFieldNameJSON, sLookupFieldJSON, sFirstLookupJSON, sSecondLookupJSON, sRecordJSON, divId);
                                }
                                if (eventFlag) {
                                    $('#hdnFilterRow').empty();
                                    $('#hdnFilterRow').val($('.filterfullrow').html());
                                    $("#divFilterRow").empty();
                                }
                            }
                            else {
                                showAjaxReturnMessage(response.message, response.errortype);
                            }
                        })
                        .fail(function (xhr, status, error) {
                            ShowErrorMessge();
                        });
    }
}

function FillFieldComboBox(sValueFieldName, sLookupFieldJSON, sFirstLookupJSON, sSecondLookupJSON, sRecordJSON, divId) {
    var array = divId.split("__");
    if (sLookupFieldJSON !== null && sLookupFieldJSON !== "") {
        $(sRecordJSON).each(function (i, item) {
            $('#' + array[0] + '__sscComboBox').append("<option value=" + sRecordJSON[i][sValueFieldName] + " id=" + sRecordJSON[i][sLookupFieldJSON] + ">[" + sRecordJSON[i][sLookupFieldJSON] + "] </option>");
        });
        if (sFirstLookupJSON !== null && sFirstLookupJSON !== "" && (sSecondLookupJSON == null || sSecondLookupJSON == "")) {
            $('#' + array[0] + '__sscComboBox').empty();
            $(sRecordJSON).each(function (i, item) {
                $('#' + array[0] + '__sscComboBox').append("<option value=" + sRecordJSON[i][sValueFieldName] + " id=" + sRecordJSON[i][sLookupFieldJSON] + ">[" + sRecordJSON[i][sLookupFieldJSON] + "]   |   [" + sRecordJSON[i][sFirstLookupJSON] + "]</option>");
            });
        }
        else if (sSecondLookupJSON !== null && sSecondLookupJSON !== "" && (sFirstLookupJSON == null || sFirstLookupJSON == "")) {
            $('#' + array[0] + '__sscComboBox').empty();
            $(sRecordJSON).each(function (i, item) {
                $('#' + array[0] + '__sscComboBox').append("<option value=" + sRecordJSON[i][sValueFieldName] + " id=" + sRecordJSON[i][sLookupFieldJSON] + ">[" + sRecordJSON[i][sLookupFieldJSON] + "]   |   [" + sRecordJSON[i][sSecondLookupJSON] + "]</option>");
            });
        }
        else if (sFirstLookupJSON !== null && sFirstLookupJSON !== "" && sSecondLookupJSON !== null && sSecondLookupJSON !== "") {
            $('#' + array[0] + '__sscComboBox').empty();
            $(sRecordJSON).each(function (i, item) {
                $('#' + array[0] + '__sscComboBox').append("<option value=" + sRecordJSON[i][sValueFieldName] + " id=" + sRecordJSON[i][sLookupFieldJSON] + ">[" + sRecordJSON[i][sLookupFieldJSON] + "]   |   [" + sRecordJSON[i][sFirstLookupJSON] + "]  |   [" + sRecordJSON[i][sSecondLookupJSON] + "]</option>");
            });
        }
    }
}

function ValidateFilterControls(jsonFilterControls, divId) {
    var array = divId.split("__");
    var aryName = divId.split("_");
    var filterId = $('#' + array[0] + '__Id').val();
    if (jsonFilterControls["FieldDDL"]) {
        $('#' + array[0] + '__sscComboBox').attr('name', 'ViewFilterList[' + aryName[1] + '].FilterData');
        $('#' + array[0] + '__sscComboBox').show();
    }
    else {
        $('#' + array[0] + '__sscComboBox').attr('name', aryName[0] + '.sscComboBox');
        $('#' + array[0] + '__sscComboBox').hide();
    }
    if (jsonFilterControls["chkYesNoField"]) {
        $('#' + array[0] + '__chkYesNoField').attr('name', 'ViewFilterList[' + aryName[1] + '].FilterData');
        $('#' + array[0] + '__chkYesNoField').show();
    }
    else {
        $('#' + array[0] + '__chkYesNoField').attr('name', aryName[0] + '.chkYesNoField');
        $('#' + array[0] + '__chkYesNoField').hide();
    }
    if (jsonFilterControls["FieldTextBox"]) {
        $('#' + array[0] + '__txtFilterData').attr('name', 'ViewFilterList[' + aryName[1] + '].FilterData');
        $('#' + array[0] + '__txtFilterData').show();
    }
    else {
        $('#' + array[0] + '__txtFilterData').attr('name', aryName[0] + '.txtFilterData');
        $('#' + array[0] + '__txtFilterData').hide();
    }
}

function getValue(vOperatorObject) {
    var optionId = $('#ViewFilterList_0__ColumnNum :selected').attr('Id');
    var optionVal = $('#ViewFilterList_0__ColumnNum :selected').val();
    var iColumnNumVar = 0;
    if (optionId !== undefined && optionId != null) {
        iColumnNumVar = parseInt(optionId.split('_')[0] == null ? 0 : optionId.split('_')[0]);
        if (optionId !== (optionVal + "_" + optionVal)) {
            $("#ViewFilterList_0__DisplayColumnNum").val(Number(Number(iColumnNumVar) - 1));

        } else {
            $("#ViewFilterList_0__DisplayColumnNum").val("-1");
        }
    }
    $.post(urls.Views.GetOperatorDDLData, { iViewId: $("#ViewsModel_Id").val(), iColumnNum: iColumnNumVar })
        .done(function (response) {
            var jsonObjectOperator = $.parseJSON(response.jsonObjectOperator);
            var jsonFilterControls = $.parseJSON(response.jsonFilterControls);
            /* Fill Operator DDL */
            var ddlOperatorObject = vOperatorObject;//control.closest('.filterfullrow').find('.ddlOperator');
            ddlOperatorObject.empty();
            $(jsonObjectOperator).each(function (i, item) {
                ddlOperatorObject.append($("<option>", { value: item.Key, html: item.Value }));
            });
            var divId = ddlOperatorObject.attr('id');
            ValidateFilterControls(jsonFilterControls, divId);

            if (jsonFilterControls["FieldDDL"]) {
                var sValueFieldNameJSON = $.parseJSON(response.sValueFieldNameJSON);
                var sLookupFieldJSON = $.parseJSON(response.sLookupFieldJSON);
                var sFirstLookupJSON = $.parseJSON(response.sFirstLookupJSON);
                var sSecondLookupJSON = $.parseJSON(response.sSecondLookupJSON);
                var sRecordJSON = $.parseJSON(response.sRecordJSON);
                FillFieldComboBox(sValueFieldNameJSON, sLookupFieldJSON, sFirstLookupJSON, sSecondLookupJSON, sRecordJSON, divId);
            }
        })
    .fail(function (xhr, status, error) {
        ShowErrorMessge();
    });
}
function DisabledFilterControls(rowCounts) {
    if (rowCounts == 0) {
        $('#newLineLabel').show();
        $('#chkActiveFooter, #btnRemoveAll, #btnTestFilter').attr('disabled', 'disabled');
    }
    else {
        $('#newLineLabel').hide();
        $('#chkActiveFooter, #btnRemoveAll, #btnTestFilter').removeAttr('disabled');
    }
}
function SetCheckValue(control) {
    var cbControlId = control.attr("Id");
    var controlId = '#' + cbControlId;
    var stateOfCB = $(controlId).is(':checked');
    if (stateOfCB) {
        $(controlId).val(1);
    }
    else {
        $(controlId).val(0);
    }
}
