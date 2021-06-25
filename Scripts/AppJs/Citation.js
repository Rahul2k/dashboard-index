$(function () {
    var operationFlag = "";
    $('#aRetentionCodeMaint').parent("li").removeClass("active");
    $('#aCitationCodeMaint').parent("li").addClass("active");
    
    $("#aRetentionCodeMaint").on('click', function (e) {
        window.location.href = urls.Retention.RetentionCodeMaintenance;
    });    
    $("#grdCitationCode").gridLoad(urls.Retention.GetCitationCodes, $('#tiAssignCitationCodeCitations').val());

    //Grid Add Functionality.
    $("#gridAdd").click(function () {
        $("#grdCitationCode").jqGrid('resetSelection');
        operationFlag = "ADD";
        LoadCitationMaintenancePartial(operationFlag);
    });

    //Grid Edit Functionality
    $("#gridEdit").click(function () {
        operationFlag = "EDIT";

        var selRowId = $("#grdCitationCode").jqGrid('getGridParam', 'selrow');
        var celValue = $("#grdCitationCode").jqGrid('getCell', selRowId, 'SLRetentionCitationId');

        var selectedrows = $("#grdCitationCode").getSelectedRowsIds();

        if (selectedrows.length > 1 || selectedrows.length == 0) {
            //showAjaxReturnMessage(vrCommonRes["PlzSelOnlyOneRow"], 'w');
            showAjaxReturnMessage(vrRetentionRes['msgCitationSelectForEdit'], 'w');
            return;
        }
        else {
            $.getJSON(urls.Retention.EditCitationCode, $.param({ pRowSelected: selectedrows, pCitationCodeId: celValue }, true), function (data) {
                if (data) {
                    //console.log("Data: " + data);
                    var result = $.parseJSON(data);
                    LoadCitationMaintenancePartial(operationFlag, result);
                }
            });
        }
    });

    //gridRemove
    $("#gridRemove").click(function (e) {
        var selRowId = $("#grdCitationCode").jqGrid('getGridParam', 'selrow');
        var celValue = $("#grdCitationCode").jqGrid('getCell', selRowId, 'Citation');
        var retentionCount = 0;

        var selectedrows = $("#grdCitationCode").getSelectedRowsIds();

        if (selectedrows.length > 1 || selectedrows.length == 0) {
            //showAjaxReturnMessage(vrCommonRes["PlzSelOnlyOneRow"], 'w');
            showAjaxReturnMessage(vrRetentionRes["msgCitationSelectForRemove"], 'w');
            return;
        }
        else {
            $.post(urls.Retention.GetCountOfRetentionCodesForCitation, $.param({ pCitationCodeId: celValue }, true), function (data) {
                retentionCount = data.retentionCodeCount;
                if (retentionCount > 0) {
                    $(this).confirmModal({
                        //Modified byu hemin
                        //confirmTitle: vrRetentionRes["msgJsDelConfim"],
                       // confirmMessage: String.format(vrRetentionRes["msgJsCitationThisCitaCurrAssign2"], retentionCount),
                        confirmTitle: vrCommonRes['msgJsDelConfim'],
                        confirmMessage: String.format(vrRetentionRes['msgJsCitationThisCitaCurrAssign2'],retentionCount,'\n'),
                        confirmOk: vrCommonRes['Yes'],
                        confirmCancel: vrCommonRes['No'],
                        confirmStyle: 'default',
                        confirmCallback: DeleteCitationCodeRecord
                    });
                }
                else if (retentionCount == 0) {
                    $(this).confirmModal({
                        //Modified by hemin
                        // confirmTitle: vrRetentionRes["msgJsDelConfim"],
                        confirmTitle: vrCommonRes['msgJsDelConfim'],
                        confirmMessage: vrRetentionRes['msgJsCitationRUSureUWant2DelCitation'],
                        confirmOk: vrCommonRes['Yes'],
                        confirmCancel: vrCommonRes['No'],
                        confirmStyle: 'default',
                        confirmCallback: DeleteCitationCodeRecord
                    });
                }
            });
        }
    });
});

//Delete function for deleteing Retention code info from list of codes.
function DeleteCitationCodeRecord() {
    var selRowId = $("#grdCitationCode").jqGrid('getGridParam', 'selrow');
    var celValue = $("#grdCitationCode").jqGrid('getCell', selRowId, 'Citation');

    var selectedrows = $("#grdCitationCode").getSelectedRowsIds();

    $.post(urls.Retention.RemoveCitationCodeEntity, $.param({ pRowSelected: selectedrows, pCitationCodeId: celValue }, true), function (data) {
        $("#grdCitationCode").refreshJqGrid();
        showAjaxReturnMessage(data.message, data.errortype);
    });
}

function LoadCitationMaintenancePartial(OperationFlag, result) {
    //console.log("Inside LoadCitationMaintenancePartial method..");
    $('#AddEditCitationCodeDialog').empty();

    $('#AddEditCitationCodeDialog').load(urls.Retention.LoadAddCitationCodeView, function () {
        $('#frmCitationCodeDetails').resetControls();
        $('#mdlCitationCode').ShowModel();
        //$('#txtLegalPeriod').OnlyNumeric();
        $("#btnGetAssigenedRetentionCodes").attr("disabled", "disabled");

        if (OperationFlag == "EDIT")
            BindEditFields(result);

        //Validation for Retention Code Maintenance screen
        $('#frmCitationCodeDetails').validate({
            rules: {
                Citation: { required: true },
                Subject: { required: true }
            },
            ignore: ":hidden:not(select)",
            messages: {
                txtRetentionCode: "",
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

        $('#btnSaveCitationCode').on('click', function (e) {

            var $form = $('#frmCitationCodeDetails');
            if ($form.valid()) {
                var serializedForm = $form.serialize();
                $.post(urls.Retention.SetCitationCode, serializedForm)
                    .done(function (response) {
                        showAjaxReturnMessage(response.message, response.errortype);
                        if (response.errortype == 's') {
                            $("#grdCitationCode").refreshJqGrid();
                            $('#mdlCitationCode').HideModel();
                        }
                    })
                    .fail(function (xhr, status, error) {
                        //console.log(error);
                        ShowErrorMessge();
                    });
            }
        });

        $('#btnGetAssigenedRetentionCodes').on('click', function (e) {
            $("#mdlListRetentionCodes").ShowModel();
            BindRetentionCodes();
        });

    });
}

//Bind data to Form for EDIT purpose.
function BindEditFields(result) {
    $("#btnGetAssigenedRetentionCodes").removeAttr("disabled");

    $("#SLRetentionCitationId").val(result.SLRetentionCitationId);
    $("#txtCitation").val(result.Citation);
    $("#txtSubject").val(result.Subject);
    $("#txtNotation").val(result.Notation);
    $("#txtLegalPeriod").val(result.LegalPeriod);
}

//Bind data to list of retention codes based on Citation Code.
function BindRetentionCodes() {
    var selRowId = $("#grdCitationCode").jqGrid('getGridParam', 'selrow');
    var celValue = $("#grdCitationCode").jqGrid('getCell', selRowId, 'SLRetentionCitationId');
    var CitationCode = $("#grdCitationCode").jqGrid('getCell', selRowId, 'Citation');

    var selectedrows = $("#grdCitationCode").getSelectedRowsIds();

    $.getJSON(urls.Retention.GetRetentionCodesByCitation, $.param({ pCitationCodeId: CitationCode }, true), function (data) {
        $("#lblCitationCode").text("");
        $("#lblCitationCode").text(String.format(vrRetentionRes["msgJsCitationRetCodesAssignFor"],CitationCode));
        var pRetentionObject = $.parseJSON(data);

        $('#lstRetentionCodes').empty();
        $.each(pRetentionObject, function (i, item) {
            //console.log("item.SLRetentionCodesId: " + item.SLRetentionCodesId);
            //$('#lstRetentionCodes').append("<option value='" + item.SLRetentionCodesId + "'>" + item.Id + "</option>");
            $('#lstRetentionCodes').append("<option value='" + item.SLRetentionCodesId + "'>" + item.Id + "©" + item.Description + "</option>");
        });
        FormatListData("lstRetentionCodes");
    });
}