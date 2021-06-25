function loadTableRetentionInformation() {
    if ($('#LoadTabContent').length == 0) {
        RedirectOnAccordian(urls.TableTracking.LoadTableTab);
        $('#title, #navigation').text(vrCommonRes['mnuTables']);
    }
    var IsRelatedTblEnabled = false;

    $.ajax({
        url: urls.Retention.LoadTablesRetentionView,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html'
    }).done(function (result) {
            $('#LoadTabContent').empty();
            $('#LoadTabContent').html(result);

            $.post(urls.Retention.GetRetentionPropertiesData, { pTableId: TableId })
                    .done(function (data) {

                        if (data.errortype == 's') {

                            var tableEntityJson = $.parseJSON(data.tableEntity);

                            //console.log("TrackingTable value: " + tableEntityJson);

                            if (tableEntityJson.TrackingTable != 1) {
                                $("#parentTblRet").show();
                                $('#lblLevel1Container').text("");
                                
                                var pRetentionCodes = $.parseJSON(data.pRetentionCodes);
                                GetRetentionCodeList(pRetentionCodes);
                                //Set Permanent Archive based on Trackable status.
                                //console.log("IsTrackable Status in TableRetention.js: " + IsTrackable);
                                $("#lblPermanentArchive").val("");
                                if (data.bTrackable) {//Changed from tableEntityJson.Trackable to based on 'Transfer' permission. - 15/12/2015 By Ganesh.
                                    $("#lblPermanentArchive").text(vrApplicationRes['lblJsTableRetenntionPartialStartFieldPerArch']);
                                    $("input[name=disposition][value= '1']").removeAttr('disabled');
                                }
                                else {
                                    $("#lblPermanentArchive").text(vrApplicationRes['lblJsTableRetenntionPartialStartFieldPerArchTrc']);
                                    $("input[name=disposition][value= '1']").attr('disabled', 'disabled');
                                }                                
                                //Change made on 02/03/2016.
                                if (tableEntityJson.RetentionPeriodActive || tableEntityJson.RetentionInactivityActive)
                                    $("input[name=disposition][value=" + tableEntityJson.RetentionFinalDisposition + "]").attr('checked', 'checked');

                                $("input[name=assignment][value=" + tableEntityJson.RetentionAssignmentMethod + "]").prop('checked', true).change();
                                $("#chkInactivity").prop("checked", tableEntityJson.RetentionInactivityActive);
                                $("#lstRetentionCodes").val(tableEntityJson.DefaultRetentionId);

                                var pRetIdsObject = $.parseJSON(data.RetIdFieldsList);
                                var pRetDateObject = $.parseJSON(data.RetDateFieldsList);

                                $('#lstFieldRetentionCode').empty();
                                $("#lstFieldDateOpened").empty();
                                $("#lstFieldDateClosed").empty();
                                $("#lstFieldDateCreated").empty();
                                $("#lstFieldOtherDate").empty();
                                $('#lstRelatedTables').empty();

                                var jsonRelatedTblObj = $.parseJSON(data.relatedTblObj);
                                //$('#lstRelatedTables').append($("<option>", { value: "", html: "" }));

                                $(jsonRelatedTblObj).each(function (i, v) {
                                    $('#lstRelatedTables').append($("<option>", { value: jsonRelatedTblObj[i].TableName, html: jsonRelatedTblObj[i].UserName }));
                                    IsRelatedTblEnabled = true;
                                });
                                //Added by Ganesh - SEP 24
                                if (IsRelatedTblEnabled)
                                    $("input[name=assignment][value= '2']").removeAttr('disabled');


                                if (!$("#chkInactivity").is(":checked") & $('input:radio[name=disposition]:checked').val() == 0) {
                                    //console.log('Initial Inactivity click...');
                                    disableRetentionPropFields();
                                }
                                else {
                                    enableRetentionPropFields();
                                }

                                if ($("input:radio[name='assignment']:checked").val() == 2) {
                                    $("#lstRelatedTables").removeAttr('disabled', 'disabled');
                                    $("#lstRetentionCodes").attr('disabled', 'disabled');
                                }
                                //Changes made on 15/12/2015.
                                if (($("input[name=assignment][value= '0']").is(':enabled') && $("input[name=assignment][value= '1']").is(':enabled')) & ($("input:radio[name='assignment']:checked").val() == 0 || $("input:radio[name='assignment']:checked").val() == 1)) {
                                    $("#lstRelatedTables").attr('disabled', 'disabled');
                                    $("#lstRetentionCodes").removeAttr('disabled', 'disabled');
                                }

                                if (data.lstRetentionCode != "") {
                                    $('#lstFieldRetentionCode').append($("<option>", { value: "* RetentionCodesId", html: data.lstRetentionCode }));
                                    $('#lstFieldRetentionCode option:first').attr('selected', 'selected');

                                }

                                if (data.lstDateOpened != "") {
                                    $('#lstFieldDateOpened').append($("<option>", { value: data.lstDateOpened, html: data.lstDateOpened }));
                                    $('#lstFieldDateOpened option:first').attr('selected', 'selected');
                                }

                                if (data.lstDateClosed != "") {
                                    $('#lstFieldDateClosed').append($("<option>", { value: data.lstDateClosed, html: data.lstDateClosed }));
                                    $('#lstFieldDateClosed option:first').attr('selected', 'selected');
                                }

                                if (data.lstDateCreated != "") {
                                    $('#lstFieldDateCreated').append($("<option>", { value: data.lstDateCreated, html: data.lstDateCreated }));
                                    $('#lstFieldDateCreated option:first').attr('selected', 'selected');
                                }

                                if (data.lstDateOther != "") {
                                    $('#lstFieldOtherDate').append($("<option>", { value: data.lstDateOther, html: data.lstDateOther }));
                                    $('#lstFieldOtherDate option:first').attr('selected', 'selected');
                                }

                                //Show and Hide Star Field Label
                                if (!data.bFootNote)
                                    $("#lblStarField").hide();

                                $(pRetIdsObject).each(function (i, v) {
                                    $('#lstFieldRetentionCode').append($("<option>", { value: pRetIdsObject[i], html: pRetIdsObject[i] }));
                                });

                                $(pRetDateObject).each(function (i, v) {
                                    $('#lstFieldDateOpened').append($("<option>", { value: pRetDateObject[i], html: pRetDateObject[i] }));
                                    $('#lstFieldDateClosed').append($("<option>", { value: pRetDateObject[i], html: pRetDateObject[i] }));
                                    $('#lstFieldDateCreated').append($("<option>", { value: pRetDateObject[i], html: pRetDateObject[i] }));
                                    $('#lstFieldOtherDate').append($("<option>", { value: pRetDateObject[i], html: pRetDateObject[i] }));
                                });

                                $("#lstRelatedTables").val(tableEntityJson.RetentionRelatedTable);

                                if (tableEntityJson.RetentionFieldName !== null)
                                    $("#lstFieldRetentionCode").val(tableEntityJson.RetentionFieldName);
                                if (tableEntityJson.RetentionDateOpenedField !== null)
                                    $("#lstFieldDateOpened").val(tableEntityJson.RetentionDateOpenedField);
                                if (tableEntityJson.RetentionDateCreateField !== null)
                                    $("#lstFieldDateCreated").val(tableEntityJson.RetentionDateCreateField);
                                if (tableEntityJson.RetentionDateClosedField !== null)
                                    $("#lstFieldDateClosed").val(tableEntityJson.RetentionDateClosedField);
                                if (tableEntityJson.RetentionDateOtherField !== null)
                                    $("#lstFieldOtherDate").val(tableEntityJson.RetentionDateOtherField);

                                $("input:radio[name=disposition]").click(function () {
                                    //console.log("Inside disposistion type clicked...");
                                    var SelectConfirmValueVar = parseInt($('input:radio[name=disposition]:checked').val());
                                    dispositionFlag = true;
                                    DispositionTable = $('#tableLabel').text();
                                    DispositionType = SelectConfirmValueVar;
                                });

                                //Handle None and InActivity Flag.
                                $("input[name='disposition']").on("change", function () {
                                    //console.log("Inside disposistion type change...");
                                    var boolInActivity = $("#chkInactivity").is(":checked");

                                    if (this.value == 1 || this.value == 2 || this.value == 3) {
                                        enableRetentionPropFields();
                                    }
                                    else if (this.value == 0 & boolInActivity == false) {
                                        disableRetentionPropFields();
                                    }
                                });

                                $("input[name='assignment']").on("change", function () {
                                    switch (this.value) {
                                        case "0":
                                            if ($("#lstRetentionCodes option[value='0']").length == 0) {
                                                //console.log("Inside If...");
                                                ($("<option>", { value: "0", html: "" })).prependTo('#lstRetentionCodes');
                                            }
                                            $("#lstRelatedTables").attr('disabled', 'disabled');
                                            $("#lstRetentionCodes").removeAttr('disabled', 'disabled');
                                            break;
                                        case "1":

                                            if ($("#lstRetentionCodes option[value='0']").length) {
                                                $('#lstRetentionCodes option[value="0"]').remove();
                                            }
                                            $("#lstRelatedTables").attr('disabled', 'disabled');
                                            $("#lstRetentionCodes").removeAttr('disabled', 'disabled');
                                            break;
                                        case "2":
                                            $("#lstRelatedTables").removeAttr('disabled', 'disabled');
                                            $("#lstRetentionCodes").attr('disabled', 'disabled');
                                            break;
                                        default:
                                            $("#lstRelatedTables").attr('disabled', 'disabled');
                                            break;
                                    }
                                });

                                $('#chkInactivity').change(function () {
                                    //console.log("Inside InActivity type change...");
                                    if ($(this).is(":checked")) {
                                        enableRetentionPropFields();
                                    }
                                    else if (!$(this).is(":checked") & $('input:radio[name=disposition]:checked').val() == 0) {
                                        disableRetentionPropFields();
                                    }

                                });

                                $("#btnSaveRetentionInfo").on('click', function (e) {

                                    var pInActivity = $("#chkInactivity").is(":checked");;
                                    var pDisposition = $('input:radio[name=disposition]:checked').val();
                                    var pAssignment = $('input:radio[name=assignment]:checked').val();
                                    var pDefaultRetentionId = $('#lstRetentionCodes').val();
                                    var pRelatedTable = $("#lstRelatedTables").val();

                                    var pRetentionCode = $("#lstFieldRetentionCode").val();
                                    var pDateOpened = $("#lstFieldDateOpened").val();
                                    var pDateClosed = $("#lstFieldDateClosed").val();
                                    var pDateCreated = $("#lstFieldDateCreated").val();
                                    var pOtherDate = $("#lstFieldOtherDate").val();

                                    if (TableId != "")
                                        setRetentionData(TableId, pInActivity, pAssignment, pDisposition, pDefaultRetentionId, pRelatedTable, pRetentionCode, pDateOpened, pDateClosed, pDateCreated, pOtherDate);
                                });

                            }//End of IF
                            else {
                                $("#parentTblRet").hide();
                                $('#lblLevel1Container').text(vrApplicationRes['lblJsTableRetenntionPartialReteCantSetLvl1']);
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
                    });
        })
        .fail(function (xhr, status) {
            ShowErrorMessge();
        });
}

function setRetentionData(vTableId, vInActivity, vAssignment, vDisposition, vDefaultRetentionId, vRelatedTable, vRetentionCode, vDateOpened, vDateClosed, vDateCreated, vOtherDate) {
    $.post(urls.Retention.SetRetentionTblPropData, { pTableId: vTableId, pInActivity: vInActivity, pAssignment: vAssignment, pDisposition: vDisposition, pDefaultRetentionId: vDefaultRetentionId, pRelatedTable: vRelatedTable, pRetentionCode: vRetentionCode, pDateOpened: vDateOpened, pDateClosed: vDateClosed, pDateCreated: vDateCreated, pOtherDate: vOtherDate })
           .done(function (response) {
               if (response.errortype == 's') {

                   if (response.msgVerifyRetDisposition != "") {

                       //Made change on 18/02/2016 - By Ganesh to fix bug #64  from spreadsheet.
                       $(this).confirmModal({
                           confirmTitle: 'TAB FusionRMS',
                           confirmMessage: response.msgVerifyRetDisposition,
                           confirmOk: vrCommonRes['Ok'],
                           confirmStyle: 'default',
                           confirmOnlyOk: true,                           
                           confirmCallback: ReloadRetentionData                           
                       });                       
                       //showAjaxReturnMessage('Record saved successfully.', 's');
                   }
                   else {
                       //showAjaxReturnMessage(vrApplicationRes['msgJsRequestorRecSaveSuccessfully'], 's');
                       showAjaxReturnMessage(vrTablesRes['msgAdminCtrlRecordUpdatedSuccessfully'], 's');
                       loadTableRetentionInformation();
                   }

               }
           })
           .fail(function (xhr, status, error) {
               ShowErrorMessge();
           });
}

function ReloadRetentionData() {
    loadTableRetentionInformation();
}

function enableRetentionPropFields() {
    //$('input[name="assignment"]').removeAttr('disabled', 'disabled');
    //console.log("Inside enableRetentionPropFields() method..." + $('#lstRelatedTables option').length);
    var vAssignmentSelection = $("input:radio[name='assignment']:checked").val();
    $("#btnSaveRetentionProp").removeAttr('disabled', 'disabled');

    $("input[name=assignment][value= 0]").removeAttr('disabled', 'disabled');
    $("input[name=assignment][value= 1]").removeAttr('disabled', 'disabled');
    $("#lstRetentionCodes").removeAttr('disabled', 'disabled');
    if (vAssignmentSelection != 0 && vAssignmentSelection != 1)
        $("#lstRelatedTables").removeAttr('disabled', 'disabled');

    if ($('#lstRelatedTables option').length >= 1) {
        //$("#lstRelatedTables").removeAttr('disabled', 'disabled');        
        $("input[name=assignment][value= 2]").removeAttr('disabled', 'disabled');
    }

    $("#lstFieldRetentionCode").removeAttr('disabled', 'disabled');
    $("#lstFieldDateOpened").removeAttr('disabled', 'disabled');
    $("#lstFieldDateClosed").removeAttr('disabled', 'disabled');
    $("#lstFieldDateCreated").removeAttr('disabled', 'disabled');
    $("#lstFieldOtherDate").removeAttr('disabled', 'disabled');
}


function disableRetentionPropFields() {
    //$('input[name="assignment"]').attr('disabled', 'disabled');
    //console.log("Inside disableRetentionPropFields() method...");
    $("#btnSaveRetentionProp").attr('disabled', 'disabled');
    $("#lstRelatedTables").attr('disabled', 'disabled');
    $("input[name=assignment][value= 0]").attr('disabled', 'disabled');
    $("input[name=assignment][value= 1]").attr('disabled', 'disabled');
    $("input[name=assignment][value= 2]").attr('disabled', 'disabled');
    $("#lstRetentionCodes").attr('disabled', 'disabled');

    if ($('#lstRelatedTables option').length >= 1) {
        //$("#lstRelatedTables").attr('disabled', 'disabled');
        $("input[name=assignment][value= 2]").attr('disabled', 'disabled');
    }

    $("#lstFieldRetentionCode").attr('disabled', 'disabled');
    $("#lstFieldDateOpened").attr('disabled', 'disabled');
    $("#lstFieldDateClosed").attr('disabled', 'disabled');
    $("#lstFieldDateCreated").attr('disabled', 'disabled');
    $("#lstFieldOtherDate").attr('disabled', 'disabled');
}

//function GetRetentionCodeList() {
//    alert("GetRetentionCodeList");
//    $.ajax({
//        url: urls.Retention.GetRetentionCodeList,
//        dataType: "json",
//        type: "GET",
//        contentType: 'application/json; charset=utf-8',
//        async: false,
//        processData: false,
//        cache: false,
//        success: function (data) {
//            alert("Inside SUccess");
//            debugger;
//            var pRetentionObject = $.parseJSON(data);

//            $('#lstRetentionCodes').empty();

//            $('#lstRetentionCodes').append($("<option>", { value: "0", html: "" }));
//            $(pRetentionObject).each(function (i, v) {
//                $('#lstRetentionCodes').append($("<option>", { value: v.Id, html: v.Id }));
//            });
//        },
//        error: function (xhr, status, error) {
//            //console.log("Error: " + error);
//            ShowErrorMessge();
//        }
//    });
//}


function GetRetentionCodeList(pRetentionObject) {
    $('#lstRetentionCodes').empty();
    $('#lstRetentionCodes').append($("<option>", { value: "0", html: "" }));
    $(pRetentionObject).each(function (i, v) {
        $('#lstRetentionCodes').append($("<option>", { value: v.Id, html: v.Id }));
    });
}

