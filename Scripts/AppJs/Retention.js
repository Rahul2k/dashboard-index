var setExistenceFlag = false;
var oldRetentionCode = "";
var newRetentionCode = "";
var oldRetentionId = 0;

$(function () {
    $("#aCitationCodeMaint").on('click', function (e) {
        window.location.href = urls.Retention.CitationMaintenance;
    });

    var operationFlag = "";
    $('#aCitationCodeMaint').parent("li").removeClass("active");
    $('#aRetentionCodeMaint').parent("li").addClass("active");

    //Modified by hemin
    //$("#grdRetentionCode").gridLoad(urls.Retention.GetRetentionCodes, vrCommonRes["RetentionCodeMaintenance"]);
    $("#grdRetentionCode").gridLoad(urls.Retention.GetRetentionCodes, vrRetentionRes["msgJsCitationRetCodes"]);

    //Grid Add Functionality.
    $("#gridAdd").click(function () {
        $("#grdRetentionCode").jqGrid('resetSelection');
        operationFlag = "ADD";
        LoadRetentionCodeMaintenancePartial(operationFlag);
    });

    //Grid Edit Functionality
    $("#gridEdit").click(function () {
        operationFlag = "EDIT";
        var selRowId = $("#grdRetentionCode").jqGrid('getGridParam', 'selrow');
        var celValue = $("#grdRetentionCode").jqGrid('getCell', selRowId, 'Id');

        var selectedrows = $("#grdRetentionCode").getSelectedRowsIds();

        if (selectedrows.length > 1 || selectedrows.length == 0) {
            showAjaxReturnMessage(vrCommonRes["msgRetentionCodeDirectEdit"], 'w');
            return;
        }
        else {

            $.post(urls.Retention.EditRetentionCode, $.param({ pRowSelected: selectedrows, pRetentionCode: celValue }, true), function (data) {
                if (data) {
                    var result = $.parseJSON(data);
                    LoadRetentionCodeMaintenancePartial(operationFlag, result);
                    //$("#txtRetentionCode").attr('readonly', true);
                }
            });
        }

    });

    //gridRemove
    $("#gridRemove").click(function (e) {
        var selRowId = $("#grdRetentionCode").jqGrid('getGridParam', 'selrow');
        var celValue = $("#grdRetentionCode").jqGrid('getCell', selRowId, 'Id');

        var selectedrows = $("#grdRetentionCode").getSelectedRowsIds();

        if (selectedrows.length > 1 || selectedrows.length == 0) {
            showAjaxReturnMessage(vrCommonRes["msgRetentionCodeDirectRemove"], 'w');
            return;
        }
        else {
            $.ajax({
                url: urls.Retention.IsRetentionCodeInUse,
                dataType: "json",
                type: "POST",
                data: JSON.stringify({ pRetentionCode: celValue }),
                contentType: 'application/json; charset=utf-8',
                async: false,
                processData: false,
                cache: false,
                success: function (data) {
                    if (!data.IsRetCodeUsed) {
                        $(this).confirmModal({
                            confirmTitle: vrCommonRes['msgJsDelConfim'],
                            confirmMessage: vrRetentionRes['msgJsRetentionAreUSureUWant2RemoveRecord'],
                            confirmOk: vrCommonRes['Yes'],
                            confirmCancel: vrCommonRes['No'],
                            confirmStyle: 'default',
                            confirmCallback: DeleteRetentionCodeRecord
                        });
                    }
                    else {
                        showAjaxReturnMessage(data.message, data.errortype);
                    }
                },
                error: function (xhr, status, error) {
                    //console.log("Error: " + error);
                    ShowErrorMessge();
                }
            });
        }
    });
});

//Delete function for deleteing Retention code info from list of codes.
function DeleteRetentionCodeRecord() {
    var selRowId = $("#grdRetentionCode").jqGrid('getGridParam', 'selrow');
    var celValue = $("#grdRetentionCode").jqGrid('getCell', selRowId, 'Id');

    var selectedrows = $("#grdRetentionCode").getSelectedRowsIds();

    $.post(urls.Retention.RemoveRetentionCodeEntity, $.param({ pRowSelected: selectedrows, pRetentionCode: celValue }, true), function (data) {
        $("#grdRetentionCode").refreshJqGrid();
        showAjaxReturnMessage(data.message, data.errortype);
    });
}

//Check If Retention Already Exists or Not.
function isRetentionCodeExists() {
    var isCodeExists = false;
    $.ajax({
        url: urls.Retention.CheckRetentionCodeExists,
        dataType: "json",
        type: "POST",
        data: JSON.stringify({ pRetentionCode: $("#txtRetentionCode").val() }),
        contentType: 'application/json; charset=utf-8',
        async: false,
        processData: false,
        cache: false,
        success: function (data) {

            if (data.errortype == "s") {
                isCodeExists = true;
                showAjaxReturnMessage(data.message, "w");
            }
            else
                isCodeExists = false;
        },
        error: function (xhr, status, error) {
            //console.log("Error: " + error);
            ShowErrorMessge();
        }
    });

    //return isCodeExists;
}

function LoadRetentionCodeMaintenancePartial(OperationFlag, result) {
    //console.log("Inside LoadRetentionCodeMaintenancePartial method..");
    var citationIds = new Array();
    var retCodes = "";
    var retCodeVal = "";
    var retCodeName = "";
    $('#AddEditRetentionCodeDialog').empty();
    $('#AddEditRetentionCodeDialog').load(urls.Retention.LoadRetentionCodeView, function () {
        $('#frmRetentionCodeDetails').resetControls();
        $('#mdlRetentionCode').ShowModel();
        $("#btnReferencedCitations").attr("disabled", "disabled");
        //Number Validations
        $("#txtLegalPeriod").OnlyNumericWithDot();
        $("#txtRetentionPeriodUser").OnlyNumericWithDot();
        $("#txtRetentionPeriodTotal").OnlyNumericWithDot();
        $("#txtInactivityPeriod").OnlyNumericWithDot();
        $("#txtLegalPeriod").val(0);
        $("#txtRetentionPeriodUser").val(0);
        $("#txtRetentionPeriodTotal").val(0);
        $("#txtInactivityPeriod").val(0);
        GetRetentionYearEndValue();
        //Bind existing data to Form if operation is EDIT.
        if (OperationFlag == "EDIT") {
            oldRetentionCode = "";
            newRetentionCode = "";
            BindEditFields(result);
            oldRetentionCode = $("#txtRetentionCode").val();

            $("#txtRetentionCode").off().on('change', function () {
                newRetentionCode = $("#txtRetentionCode").val();
                //console.log("Old Retention Code: " + oldRetentionCode + " New Retention Code: " + newRetentionCode);
                if (oldRetentionCode == newRetentionCode)
                    setExistenceFlag = false;
                else {
                    setExistenceFlag = true;
                    //oldRetentionId = $("")
                }
                //console.log("setExistenceFlag: " + setExistenceFlag);
            });
        }

        //Validation for Retention Code Maintenance screen
        $('#frmRetentionCodeDetails').validate({
            rules: {
                Id: { required: true },
                Description: { required: true }
            },
            ignore: ":hidden:not(select)",
            messages: {
                Id: "",
                txtDescription: ""
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
                    //error.insertAfter(element.parent());
                } else {
                    //error.insertAfter(element);
                }
            }
        });
        //Removed the disabled attribute once Retention code changes
        $("#txtRetentionCode").on('keyup', function (e) {
            if (retCodeVal != "" && retCodeVal !== undefined) {
                $(".SaveAsRetentionCode").removeAttr("disabled");
            }
            $("#btnReferencedCitations").removeAttr("disabled");
            if ($(this).val().toLowerCase() == $('#hdnRetentionCode').val().toLowerCase()) {
                $(".SaveAsRetentionCode").attr("disabled", "disabled");
                $("#btnReferencedCitations").attr("disabled", "disabled");
            }
        });
        $('#btnSaveRetentionCode').on('click', function (e) {
            var hideModal = 1;
            var btnType = 'Save';
            var params = btnType + "©" + hideModal + "©" + "";
            //Check for existence of Retention Code.
            //if (setExistenceFlag == true)
            //    $("#Id").val(0);
            //Changes add on May 28th 2015
            if (retCodeVal != "" && retCodeVal !== undefined) {
                $("#SLRetentionCodesId").val(retCodeVal);
            }
            ValidateAndSaveRetentionCode(params, result);
        });
        $('#btnSaveAsRetentionCode').on('click', function (e) {
            var hideModal = 1;
            var btnType = 'SaveAs';

            $("#SLRetentionCodesId").val(0);

            var params = btnType + "©" + hideModal + "©" + retCodeName;

            ValidateAndSaveRetentionCode(params, result);
            //SaveRetentionCode(params);
        });
        $('#btnSaveAndClearRetentionCode').on('click', function (e) {
            var hideModal = 0;
            var btnType = 'SaveAndClear';
            $("#btnSaveAsRetentionCode").attr("disabled", "disabled");
            OperationFlag = "ADD";
            //Check for existence of Retention Code.
            if (setExistenceFlag == true) {
                //Changes add on May 28th 2015
                $("#SLRetentionCodesId").val(0);
            }
            else if (retCodeVal != "" && retCodeVal !== undefined) {
                $("#SLRetentionCodesId").val(retCodeVal);
                retCodeVal = 0;
            }
            var params = btnType + "©" + hideModal + "©" + "";

            ValidateAndSaveRetentionCode(params, result);
            //SaveRetentionCode(params);
        });
        //Get Referenced Citation screen.
        $("#btnReferencedCitations").on('click', function (e) {
            var $form = $('#frmRetentionCodeDetails');
            var params = null;
            var hideModel = null;
            var btnType = null;
            if ($form.valid() && IsSaveOkay()) {
                if (OperationFlag == "ADD") {
                    hideModel = 3;
                    btnType = 'Save';
                    params = btnType + "©" + hideModel + "©" + "";
                    ValidateAndSaveRetentionCode(params, result);
                }
                    //else if (result != "undefined" || typeof result != 'undefined' && typeof result != undefined && result != null) {
                else if (result != undefined || result != null) {
                    hideModel = 3;
                    btnType = 'Save';
                    params = btnType + "©" + hideModel + "©" + "";
                    ValidateAndSaveRetentionCode(params, result);
                }
                else {
                    $("#mdlReferencedCitations").ShowModel();
                    BindCitationCodes(OperationFlag, retCodeVal, retCodeName);
                }

                //Get the details of selected Citation code.
                $("#btnDetails").off().on('click', function (e) {
                    //Check is Citation code is selected from list or not.
                    if ($("#lstCitationCodes option:selected").length > 0) {

                        var selectedCitation = $("#lstCitationCodes option:selected").val();
                        var citationID = selectedCitation.substr(0, selectedCitation.indexOf('©'));
                        var citationCode = selectedCitation.substr(selectedCitation.indexOf('©') + 1);

                        $('#AddDetailsCitationDialog').empty();
                        $('#AddDetailsCitationDialog').load(urls.Retention.DetailedCitationCode, function () {
                            $("#mdlDetailedCitationCode").ShowModel();
                            //$("#lstCitationCodes option:selected").val().split("©")[0]
                            $.post(urls.Retention.EditCitationCode, $.param({ pRowSelected: 2, pCitationCodeId: citationID }, true), function (data) {
                                if (data) {
                                    var result = $.parseJSON(data);

                                    $("#txtCitation").val(result.Citation);
                                    $("#txtSubject").val(result.Subject);
                                    $("#txtNotation").val(result.Notation);

                                    if (parseFloat(result.LegalPeriod) > 0) {
                                        $("#txtDetailedLegalPeriod").val(result.LegalPeriod);
                                        //$("#txtDetailedLegalPeriod").val(result.LegalPeriod + " years");
                                    }
                                }
                            });

                        });
                    }
                    else {
                        showAjaxReturnMessage(vrRetentionRes["msgJsRetentionPlzSelCitaCode"], 'w');
                    }

                });

                //Assign new Citation code to Retention code.
                $("#btnAdd").off().on('click', function (e) {
                    $('#AddDetailsCitationDialog').empty();
                    $('#AddDetailsCitationDialog').load(urls.Retention.GetAssignCitationCode, function () {

                        $("#mdlAssignCitationCode").ShowModel();
                        var selRowId = $("#grdRetentionCode").jqGrid('getGridParam', 'selrow');
                        var celValue = $("#grdRetentionCode").jqGrid('getCell', selRowId, 'Id');
                        //alert("celValue while add: " + retCodeName);
                        //var retentionCodeVal = retCodeVal;
                        //console.log("btnAdd: Ret Code value..: " + retCodeName);

                        if (retCodeName !== false && retCodeName != "")
                            celValue = retCodeName;

                        $("#grdCitationCode").jqGrid('GridUnload');
                        $("#grdCitationCode").gridLoad(urls.Retention.GetCitationsCodeToAdd + "?pRetentionCodeId=" + encodeURIComponent(celValue), vrRetentionRes["tiAssignCitationCodeCitationCodes"]);

                        //Add selected Citation code against Retention Code.
                        $("#btnSelect").off().on('click', function (e) {
                            var selRowId = $("#grdCitationCode").jqGrid('getGridParam', 'selrow');
                            var citationCodeVal = $("#grdCitationCode").jqGrid('getCell', selRowId, 'Citation');
                            //console.log("Citation Codes Id: " + retentionCodeVal);

                            var selectedrows = $("#grdCitationCode").getSelectedRowsIds();

                            if (selectedrows.length > 1 || selectedrows.length == 0) {
                                showAjaxReturnMessage(vrCommonRes["PlzSelOnlyOneRow"], 'w');
                                return;
                            }
                            else {
                                $.post(urls.Retention.AssignCitationToRetention, $.param({ pRetentionCodeId: celValue, pCitationCodeId: citationCodeVal }, true))
                                        .done(function (response) {
                                            //showAjaxReturnMessage(response.message, response.errortype);
                                            if (response.errortype == 's') {
                                                //$("#grdCitationCode").refreshJqGrid();                                
                                                $('#mdlAssignCitationCode').HideModel();
                                                BindCitationCodes(OperationFlag, retCodeVal, retCodeName);
                                            }
                                        });
                            }
                        });

                        $("#btnCitationDetails").off().on('click', function (e) {
                            var selRowId = $("#grdCitationCode").jqGrid('getGridParam', 'selrow');
                            var celValue = $("#grdCitationCode").jqGrid('getCell', selRowId, 'SLRetentionCitationId');

                            var selectedrows = $("#grdCitationCode").getSelectedRowsIds();

                            if (selectedrows.length > 1 || selectedrows.length == 0) {
                                showAjaxReturnMessage(vrCommonRes["PlzSelOnlyOneRow"], 'w');
                                return;
                            }
                            else {

                                $('#DetailsCitationDialog').empty();
                                $('#DetailsCitationDialog').load(urls.Retention.DetailedCitationCode, function () {

                                    $("#mdlDetailedCitationCode").ShowModel();
                                    $("#txtDetailedLegalPeriod").OnlyNumeric();
                                    $.post(urls.Retention.EditCitationCode, $.param({ pRowSelected: 2, pCitationCodeId: celValue }, true), function (data) {
                                        if (data) {
                                            var result = $.parseJSON(data);
                                            $("#txtCitation").val(result.Citation);
                                            $("#txtSubject").val(result.Subject);
                                            $("#txtNotation").val(result.Notation);

                                            if (parseFloat(result.LegalPeriod) > 0)
                                                $("#txtDetailedLegalPeriod").val(result.LegalPeriod);
                                        }
                                    });

                                });
                            }

                        });

                    });

                });
                //Remove selected Citation code from Retention code.
                $("#btnRemove").off().on('click', function (e) {

                    var selRowId = $("#grdRetentionCode").jqGrid('getGridParam', 'selrow');
                    var celValue = $("#grdRetentionCode").jqGrid('getCell', selRowId, 'Id');
                    var selectedrows = $("#grdCitationCode").getSelectedRowsIds();
                    var combinval = retCodeVal + "©" + retCodeName + "©" + OperationFlag;

                    //$("#lstCitationCodes option:selected").val().split("©")[1]
                    if ($("#lstCitationCodes option:selected").length > 0) {

                        var selectedCitation = $("#lstCitationCodes option:selected").val();
                        var citationID = selectedCitation.substring(0, selectedCitation.indexOf('©'));
                        var citationCode = selectedCitation.substring(selectedCitation.indexOf('©') + 1);

                        if (retCodeName == "") {
                            $(this).confirmModal({
                                confirmTitle: vrCommonRes['msgJsDelConfim'],
                                confirmMessage: String.format(vrRetentionRes['msgJsRetentionAreUSureUWant2RemoveRecordFromRetCode'], citationCode, celValue),
                                confirmOk: vrCommonRes['Yes'],
                                confirmCancel: vrCommonRes['No'],
                                confirmStyle: 'default',
                                confirmCallback: RemoveAssignedCitationCode
                            });
                        }
                        else {
                            $(this).confirmModal({
                                confirmTitle: vrCommonRes['msgJsDelConfim'],
                                confirmMessage: String.format(vrRetentionRes['msgJsRetentionAreUSureUWant2RemoveRecordFromRetCode'], citationCode, retCodeName),
                                confirmOk: vrCommonRes['Yes'],
                                confirmCancel: vrCommonRes['No'],
                                confirmStyle: 'default',
                                confirmObject: combinval,
                                confirmCallback: RemoveAssignedCitationCode
                            });
                        }
                    }
                    else {
                        showAjaxReturnMessage(vrRetentionRes["msgJsRetentionPlzSelCitaCode"], 'w');
                    }
                });
                $("#btnClose").on('click', function () {
                    $("#mdlReferencedCitations").modal('hide');
                    setTimeout(function () { $('body').addClass('modal-open') }, 500);
                });
            }
        });
        //Bind the existing data to Form for EDIT purpose.
        function BindEditFields(result) {
            $("#btnReferencedCitations").removeAttr("disabled");
            $("#SLRetentionCodesId").val(result.SLRetentionCodesId);
            //New Changes made on Aug 17
            retCodeVal = result.SLRetentionCodesId;
            retCodeName = result.Id;
            $('#hdnRetentionCode').val(result.Id);
            $("#txtRetentionCode").val(result.Id);
            $("#txtDescription").val(result.Description);
            $("#txtDepOfRecord").val(result.DeptOfRecord);
            $("#txtNotes").val(result.Notes);
            if (result.InactivityEventType == 'N/A')
                $("#lstEventTypeList").val("");
            else
                $("#lstEventTypeList").val(result.InactivityEventType);
            $("#txtInactivityPeriod").val(result.InactivityPeriod);
            $("#chkForceToEndOfTear").prop('checked', result.InactivityForceToEndOfYear);

            if (result.RetentionEventType == 'N/A')
                $("#lstEventTypeListOfficialRcd").val("");
            else
                $("#lstEventTypeListOfficialRcd").val(result.RetentionEventType);
            $("#txtLegalPeriod").val(result.RetentionPeriodLegal);
            $("#txtRetentionPeriodUser").val(result.RetentionPeriodUser);
            $("#txtRetentionPeriodTotal").val(result.RetentionPeriodTotal);

            $("#chkLegalHold").prop('checked', result.RetentionLegalHold);


            $("#chkForceToEndOfYearRetPeriodOffitial").prop('checked', result.RetentionPeriodForceToEndOfYear);
        }

        //SAVE the Retention Code data.
        function SaveRetentionCode(combinval) {
            var $form = $('#frmRetentionCodeDetails');

            if ($form.valid() && IsSaveOkay()) {
                if (combinval != null)
                    data = combinval.split("©");

                if (data.length > 0) {
                    btnType = data[0];
                    hideModal = data[1];
                    retCodeName = data[2];
                }

                var serializedForm = $form.serialize();
                $.post(urls.Retention.SetRetentionCode, serializedForm)
                    .done(function (response) {
                        if (response.errortype == 's') {
                            setExistenceFlag = false;
                            $("#grdRetentionCode").refreshJqGrid();
                            var jsonData = $.parseJSON(response.jsonRetObj);

                            if (hideModal == 1 && btnType != 'SaveAs') {
                                showAjaxReturnMessage(response.message, response.errortype);
                                $('#mdlRetentionCode').HideModel();
                            }
                            else if (hideModal == 1 && btnType == 'SaveAs') {
                                showAjaxReturnMessage(response.message, response.errortype);
                                $.post(urls.Retention.ReplicateCitationForRetentionOnSaveAs, $.param({ pCopyFromRetCode: retCodeName, pCopyToRetCode: jsonData.Id }, true), function (data) {
                                    $('#mdlRetentionCode').HideModel();
                                });
                            }
                            else if (hideModal == 0) {
                                showAjaxReturnMessage(response.message, response.errortype);

                                //Clear All fields of Retention code screen.
                                ClearRetentionFields();
                                result = undefined;
                            }
                            else if (hideModal == 3) {
                                //retCodeVal = jsonData[0].Id;
                                $("#btnSaveAsRetentionCode").removeAttr("disabled");
                                $("#grdRetentionCode").refreshJqGrid();

                                result = jsonData;
                                retCodeVal = jsonData.SLRetentionCodesId;
                                retCodeName = jsonData.Id;
                                $("#SLRetentionCodesId").val(retCodeVal);
                                OperationFlag = "EDIT";
                                $("#mdlReferencedCitations").ShowModel();
                                BindCitationCodes(OperationFlag, retCodeVal, retCodeName);
                            }

                        }
                        else if (response.errortype == 'e' || response.errortype == 'w') {
                            showAjaxReturnMessage(response.message, response.errortype);
                        }
                    })
                    .fail(function (xhr, status, error) {
                        //console.log(error);
                        ShowErrorMessge();
                    });
            }
        }

        //CHECK if any fields changed.
        function ValidateAndSaveRetentionCode(params, result) {
            var $form = $('#frmRetentionCodeDetails');

            if ($form.valid() && IsSaveOkay()) {
                //if (result != "undefined" && typeof result != 'undefined' && typeof result != undefined && result != null) {
                if (result != undefined || result != null) {
                    var IsFieldsChanged = false;
                    var currLstEventTypeList = ($('#lstEventTypeList').val() == "" || $('#lstEventTypeList').val() == null) ? "N/A" : $('#lstEventTypeList').val();
                    var currLstEventTypeListOfficialRcd = ($('#lstEventTypeListOfficialRcd').val() == "" || $('#lstEventTypeListOfficialRcd').val() == null) ? "N/A" : $('#lstEventTypeListOfficialRcd').val();
                    var currTxtRetentionPeriodUser = $('#txtRetentionPeriodUser').val();
                    var currTxtInactivityPeriod = $('#txtInactivityPeriod').val();
                    var currTxtLegalPeriod = $('#txtLegalPeriod').val();
                    var currChkForceToEndOfYear = $('#chkForceToEndOfYear').is(':checked') == true ? "true" : "false";
                    var currChkForceToEndOfYearRetPeriodOffitial = $('#chkForceToEndOfYearRetPeriodOffitial').is(':checked') == true ? "true" : "false";

                    var msg = "<p>" + vrRetentionRes['msgJsRetention1OfFollowFieldsChanged'] + "</br><ul><li>" + vrRetentionRes['msgJsRetentionInActivityEventType'] + "</li><li>" + vrRetentionRes['msgJsRetentionRetEventType'] + "</li><li>" + vrRetentionRes['msgJsRetentionRetUserPeriod'] + "</li><li>" + vrRetentionRes['msgJsRetentionInActivityPeriod'] + "</li><li>" + vrRetentionRes['msgJsRetentionRetLegalPeriod'] + "</li><li>" + vrRetentionRes['msgJsRetentionInActivityForce2EndOfYear'] + "</li><li>" + vrRetentionRes['msgJsRetentionRetForce2EndOfYear'] + "</li></ul></br></br>" + vrRetentionRes['msgJsRetentionInOrdr2EnsureDataIntigrity'] + "</br></br>" + vrRetentionRes['msgJsRetentionWouldULike2ContiSavingRetCode'] + "</p>";

                    if (currLstEventTypeList != result.InactivityEventType
                                    || currLstEventTypeListOfficialRcd != result.RetentionEventType
                                    || parseFloat(currTxtRetentionPeriodUser) != result.RetentionPeriodUser
                                    || parseFloat(currTxtInactivityPeriod) != result.InactivityPeriod
                                    || parseFloat(currTxtLegalPeriod) != result.RetentionPeriodLegal
                                    || currChkForceToEndOfYear != result.InactivityForceToEndOfYear.toString()
                                    || currChkForceToEndOfYearRetPeriodOffitial != result.RetentionPeriodForceToEndOfYear.toString()) {

                        $(this).confirmModal({
                            confirmTitle: 'TAB FusionRMS',
                            confirmMessage: msg,
                            confirmOk: vrCommonRes['Yes'],
                            confirmCancel: vrCommonRes['No'],
                            confirmStyle: 'default',
                            confirmCallback: function () {
                                SaveRetentionCode(params);
                            },
                            confirmCallbackCancel: function () {
                                setTimeout(function () {
                                    $('body').addClass('modal-open');
                                }, 400);
                            }
                        });
                    }
                    else {
                        SaveRetentionCode(params);
                    }
                }
                else {
                    SaveRetentionCode(params);
                }
            }
        }
        //Add Years on textbox change event to Total textbox
        $("#txtLegalPeriod").on('keyup', function () {
            $("#txtRetentionPeriodTotal").val("");

            if ($("#txtLegalPeriod").val().length == 0) {
                if ($("#txtRetentionPeriodUser").val().length > 0)
                    $("#txtRetentionPeriodTotal").val(parseFloat($("#txtRetentionPeriodUser").val()));
                else
                    $("#txtLegalPeriod").val("");
            }
            else if ($("#txtLegalPeriod").val().length > 0 && $("#txtRetentionPeriodUser").val().length == 0)
                $("#txtRetentionPeriodTotal").val(parseFloat($("#txtLegalPeriod").val()));
            else if (parseFloat($("#txtLegalPeriod").val()) >= parseFloat($("#txtRetentionPeriodUser").val()))
                $("#txtRetentionPeriodTotal").val(parseFloat($("#txtLegalPeriod").val()));
            else if (parseFloat($("#txtLegalPeriod").val()) <= parseFloat($("#txtRetentionPeriodUser").val()))
                $("#txtRetentionPeriodTotal").val(parseFloat($("#txtRetentionPeriodUser").val()));
        });

        //Add Years on textbox change event to Total textbox
        $("#txtRetentionPeriodUser").on('keyup', function () {
            $("#txtRetentionPeriodTotal").val("");

            if ($("#txtRetentionPeriodUser").val().length == 0) {
                if ($("#txtLegalPeriod").val().length > 0)
                    $("#txtRetentionPeriodTotal").val(parseFloat($("#txtLegalPeriod").val()));
                else
                    $("#txtRetentionPeriodUser").val("");

            }
            else if ($("#txtRetentionPeriodUser").val().length > 0 && $("#txtLegalPeriod").val().length == 0)
                $("#txtRetentionPeriodTotal").val(parseFloat($("#txtRetentionPeriodUser").val()));
            else if (parseFloat($("#txtLegalPeriod").val()) >= parseFloat($("#txtRetentionPeriodUser").val()))
                $("#txtRetentionPeriodTotal").val(parseFloat($("#txtLegalPeriod").val()));
            else if (parseFloat($("#txtLegalPeriod").val()) <= parseFloat($("#txtRetentionPeriodUser").val()))
                $("#txtRetentionPeriodTotal").val(parseFloat($("#txtRetentionPeriodUser").val()));
        });
        setTimeout(function () {
            if ($('#mdlRetentionCode').hasScrollBar()) {
                $('#mdlRetentionCodeClone').empty().html($('#mdlRetentionCode .modal-footer').clone());
                if ($('#mdlRetentionCodeClone').hasClass("affixed")) {
                    $('.modal-content .modal-footer .modal-action').hide();
                }
                $('#mdlRetentionCodeClone .modal-footer').find('#btnSaveAsRetentionCode').click(function () {
                    $('.modal-content .modal-footer').find('#btnSaveAsRetentionCode').trigger('click');
                });
                $('#mdlRetentionCodeClone .modal-footer').find('#btnSaveAndClearRetentionCode').click(function () {
                    $('.modal-content .modal-footer').find('#btnSaveAndClearRetentionCode').trigger('click');
                });
                $('#mdlRetentionCodeClone .modal-footer').find('#btnSaveRetentionCode').click(function () {
                    $('.modal-content .modal-footer').find('#btnSaveRetentionCode').trigger('click');
                });

                $('#mdlRetentionCodeClone .modal-footer').css({ 'width': ($('#mdlRetentionCode').find('.modal-footer').width() + 30) + 'px', 'padding': '15px 7px 15px 15px' });
                $('#mdlRetentionCode').on('scroll', function () {
                    if ($('#mdlRetentionCode').get(0).scrollHeight > (($('#mdlRetentionCode').height() + $('#mdlRetentionCode').scrollTop()) + 70)) {
                        $('#mdlRetentionCodeClone').addClass("affixed");
                        $('.modal-content .modal-footer .modal-action').hide();
                        $('#mdlRetentionCodeClone .modal-footer .modal-action').show();
                    }
                    else {
                        $('#mdlRetentionCodeClone').removeClass("affixed");
                        $('.modal-content .modal-footer .modal-action').show();
                        $('#mdlRetentionCodeClone .modal-footer .modal-action').hide();
                    }
                });
                $('#mdlRetentionCode').on('hide.bs.modal', function (e) {
                    $('#mdlRetentionCodeClone').removeClass('affixed');
                });
            }
        }, 600);
    });
}

//Remove the selected Citation code.
function RemoveAssignedCitationCode(combinval) {
    var data = [];
    var retId = "";
    var retCodeName = "";
    var OPFlag = "";

    if (combinval != null)
        data = combinval.split("©");

    var selRowId = $("#grdRetentionCode").jqGrid('getGridParam', 'selrow');
    var celValue = $("#grdRetentionCode").jqGrid('getCell', selRowId, 'Id');

    if (data.length > 0) {
        celValue = data[1];
        retId = celValue;
        retCodeName = data[1];
        OPFlag = data[2];
    }

    var selectedrows = $("#grdCitationCode").getSelectedRowsIds();
    var selectedCitation = $("#lstCitationCodes option:selected").val();
    var citationID = selectedCitation.substr(0, selectedCitation.indexOf('©'));
    var citationCode = selectedCitation.substr(selectedCitation.indexOf('©') + 1);
    //$("#lstCitationCodes option:selected").val().split("©")[1]
    $.post(urls.Retention.RemoveAssignedCitationCode, $.param({ pRetentionCodeId: celValue, pCitationCodeId: citationCode }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        BindCitationCodes(OPFlag, retId, retCodeName);
    });
}

//Clear out all the retention code screen fields.
function ClearRetentionFields() {

    $("#SLRetentionCodesId").val(0);
    $("#txtRetentionCode").val("");
    $("#txtDescription").val("");
    $("#txtDepOfRecord").val("");
    $("#txtNotes").val("");
    $("#lstEventTypeList").val("");
    $("#txtInactivityPeriod").val("");

    $("#lstEventTypeListOfficialRcd").val("");
    $("#txtLegalPeriod").val("");
    $("#txtRetentionPeriodUser").val("");
    $("#txtRetentionPeriodTotal").val("");

    $("#chkLegalHold").prop('checked', false);
    $("#chkForceToEndOfTear").prop('checked', false);
    $("#chkForceToEndOfYearRetPeriodOffitial").prop('checked', false);

}

//Validations for Retention Code Maintenance screen.Check if all is okay before save.
function IsSaveOkay() {
    var IsSaveOk = true;
    var RetentionCode = $("#txtRetentionCode").val();
    var InActivityPeriod = $("#txtInactivityPeriod").val() == "" ? 0 : $("#txtInactivityPeriod").val();
    var OffitialLegalPeriod = $("#txtLegalPeriod").val() == "" ? 0 : $("#txtLegalPeriod").val();
    var OffitialRetentionPeriodUser = $("#txtRetentionPeriodUser").val() == "" ? 0 : $("#txtRetentionPeriodUser").val();
    var RetentionPeriodTotal = $("#txtRetentionPeriodTotal").val() == "" ? 0 : $("#txtRetentionPeriodTotal").val();

    var lstEventTypeList = $("#lstEventTypeList").val();
    var lstEventTypeListOfficialRcd = $("#lstEventTypeListOfficialRcd").val();

    if (InActivityPeriod == 0)
        $("#txtInactivityPeriod").val(0);
    if (OffitialLegalPeriod == 0)
        $("#txtLegalPeriod").val(0);
    if (OffitialRetentionPeriodUser == 0)
        $("#txtRetentionPeriodUser").val(0);
    if (RetentionPeriodTotal == 0)
        $("#txtRetentionPeriodTotal").val(0);


    if (RetentionCode.substring(1, 0) == " " && IsSaveOk == true) {
        showAjaxReturnMessage(vrRetentionRes["msgJsRetentionRetCodeCantBeginWithSpace"], 'w');
        IsSaveOk = false;
    }

    if (((((parseFloat(InActivityPeriod) * 100) % 25) != 0) || parseFloat(InActivityPeriod) < 0 || parseFloat(InActivityPeriod) > 1000) && IsSaveOk == true) {
        showAjaxReturnMessage(vrRetentionRes["msgJsRetentionInActivityPeriodBet0To1000"], 'w');
        IsSaveOk = false;
    }
    if (((((parseFloat(OffitialLegalPeriod) * 100) % 25) != 0) || parseFloat(OffitialLegalPeriod) < 0 || parseFloat(OffitialLegalPeriod) > 1000) && IsSaveOk == true) {
        showAjaxReturnMessage(vrRetentionRes["msgJsRetentionLegalRetPeriodBet0To1000"], 'w');
        IsSaveOk = false;
    }
    if (((((parseFloat(OffitialRetentionPeriodUser) * 100) % 25) != 0) || parseFloat(OffitialRetentionPeriodUser) < 0 || parseFloat(OffitialRetentionPeriodUser) > 1000) && IsSaveOk == true) {
        showAjaxReturnMessage(vrRetentionRes["msgJsRetentionUserRetPeriodBet0To1000"], 'w');
        IsSaveOk = false;
    }
    if (((lstEventTypeList == "" || lstEventTypeList == null) && parseFloat(InActivityPeriod) > 0) && IsSaveOk == true) {
        showAjaxReturnMessage(vrRetentionRes["msgJsRetentionInActivityEventTypeReqIfInAct"], 'w');
        IsSaveOk = false;
    }
    if (((lstEventTypeListOfficialRcd == "" || lstEventTypeListOfficialRcd == null) && parseFloat(RetentionPeriodTotal) > 0) && IsSaveOk == true) {
        showAjaxReturnMessage(vrRetentionRes["msgJsRetentionRetEventTypeReqIfLegalOrUser"], 'w');
        IsSaveOk = false;
    }

    return IsSaveOk;
}

//Bind data to list of citation codes based on retention Code.
function BindCitationCodes(OperationFlag, RetentionCodeId, RetentionCodeName) {
    var selRowId = $("#grdRetentionCode").jqGrid('getGridParam', 'selrow');
    var celValue = $("#grdRetentionCode").jqGrid('getCell', selRowId, 'SLRetentionCodesId');
    var codeValue = $("#grdRetentionCode").jqGrid('getCell', selRowId, 'Id');
    var cntCurrentlyAssignedCita = 0;

    //console.log("celValue in BindCitationCodes: " + celValue);
    //console.log("RetentionCodeId: " + celValue + " RetentionCodeName" + RetentionCodeName);

    if (OperationFlag == "ADD")
        celValue = false;
    if (celValue == false && RetentionCodeId != "") {
        celValue = RetentionCodeId;
        codeValue = RetentionCodeName;
    }

    var selectedrows = $("#grdCitationCode").getSelectedRowsIds();

    if (celValue != false) {
        $.getJSON(urls.Retention.GetCitationCodesByRetenton, $.param({ pRetentionCodeId: codeValue }, true), function (data) {

            $("#lblRetentionCode").text("");
            $("#lblRetentionCode").text(String.format(vrRetentionRes["lblJsRetentionCitationForRetCode"], codeValue));
            var pCitationObject = $.parseJSON(data);

            $('#lstCitationCodes').empty();
            $.each(pCitationObject, function (i, item) {
                $('#lstCitationCodes').append("<option value='" + item.SLRetentionCitationId + "©" + item.Citation + "'>" + item.Citation + "©" + item.Subject + "</option>");
            });
            FormatListData("lstCitationCodes");
            cntCurrentlyAssignedCita = $('#lstCitationCodes > option').length;

            if (cntCurrentlyAssignedCita > 0) {
                $('#btnDetails').removeAttr('disabled', 'disabled');
                $('#btnRemove').removeAttr('disabled', 'disabled');
            }
            else {
                $('#btnDetails').attr('disabled', 'disabled');
                $('#btnRemove').attr('disabled', 'disabled');
            }
        });
    }
    else {
        $("#lblRetentionCode").text("");
        $("#lblRetentionCode").text(String.format(vrRetentionRes["lblJsRetentionCitationForRetCode"], $("#txtRetentionCode").val()));
        $('#lstCitationCodes').empty();
    }
}

//GET the Retention Year End Value for retention code maintaince.
function GetRetentionYearEndValue() {
    //Added by Hemin on 12/20/2016 for bug Fix
    //$.getJSON(urls.Retention.GetRetentionYearEndValue, function (data) {
    //    $('#lblRetentionYearStarts').text(data.lblRetentionYrEnd);
    //    $('#lblInactivityYearStarts').text(data.lblRetentionYrEnd);
    //    if (data.citaStatus) {
    //        $("#btnReferencedCitations").hide();
    //    }
    //});


    $.ajax({
        url: urls.Retention.GetRetentionYearEndValue,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (data) {
            $('#lblRetentionYearStarts').text(data.lblRetentionYrEnd);
            $('#lblInactivityYearStarts').text(data.lblRetentionYrEnd);
            if (data.citaStatus) {
                $("#btnReferencedCitations").hide();
            }
        }
    });
}