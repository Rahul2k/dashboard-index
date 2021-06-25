$(function () {

    $("#btnReassignRetCode").off().click(function (e) {

        $('#ReassignRetentionCodeDialog').empty();
        $('#ReassignRetentionCodeDialog').load(urls.Retention.ReassignRetentionCode, function () {
            $('#frmReassignRetentionCode').resetControls();

            $('#mdlReassignRetentionCode').ShowModel();


            //This will get names of retention tables for selection list.
            GetRetentionTablesList();

            //Get the list of all retention codes from system.
            GetRetentionCodeList();

            $('#lstOldRetentionCode').on('change', function () {
                validateCodeFields();
            });
            $('#lstNewRetentionCode').on('change', function () {
                validateCodeFields();
            });
            $("#lstTable").on('change', function () {
                validateCodeFields();
            });

            //Validation for Retention Code Maintenance screen
            $('#frmReassignRetentionCode').validate({
                rules: {
                    TableName: { required: true },
                    OldRetentionCode: { required: true },
                    NewRetentionCode: { required: true }
                },
                ignore: ":hidden:not(select)",
                messages: {
                    TableName: "",
                    OldRetentionCode: "",
                    NewRetentionCode: ""
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

            $("#btnOk").off().on('click', function (e) {
                var sMessage = "";
                var lstRetentionTableName = $("#lstTable option:selected").val();
                var lblTableName = $("#lstTable option:selected").text();

                //frmReassignRetentionCode
                var $form = $('#frmReassignRetentionCode');
                var oldRetentionCode = $("#lstOldRetentionCode option:selected").val();
                var newRetentionCode = $("#lstNewRetentionCode option:selected").val();

                if ($form.valid()) {
                    //console.log("oldRetentionCode: " + typeof oldRetentionCode);
                    //console.log("newRetentionCode: " + newRetentionCode);
                    var combinval = lstRetentionTableName + "©" + newRetentionCode + "©" + oldRetentionCode;                    
                 //   if (oldRetentionCode != "0" & newRetentionCode != "0") {
                        if (oldRetentionCode == newRetentionCode) {
                            showAjaxReturnMessage(vrRetentionRes["msgJsReassignRetentionCodeOldAndNewRetCodesDiffForReAssign"], 'e');
                        }
                        else {
                            //Apply the logic to update all oldRentention code entries with newRetention code.
                            sMessage =String.format(vrRetentionRes['msgJsReassignRetentionCodeWouldULike2UpdtAllPreExi'], lblTableName );

                            //For old retention code.
                            if (oldRetentionCode.length > 0)
                                sMessage = sMessage + " " + vrRetentionRes['msgJsReassignRetentionCodeWith'];
                            else
                                sMessage = sMessage + " " + vrRetentionRes['msgJsReassignRetentionCodeContainingNoRetCodeWith'];

                            //For new retention code.
                            if (newRetentionCode.length > 0)
                                sMessage = sMessage + " " + vrRetentionRes['msgJsReassignRetentionCodeNewDefaultRetCode'] + " \"" + newRetentionCode + "\"?";
                            else
                                sMessage = sMessage + " " + vrRetentionRes['msgJsReassignRetentionCodeNoRetCode'];

                            sMessage = sMessage + "</br></br>" + vrRetentionRes['msgJsReassignRetentionCodeNoteThisCouldTakeConsiAmountOfTime'] + "</br>" + "</br>" + vrRetentionRes['msgJsReassignRetentionCodeWouldULike2Continue'];

                            $(this).confirmModal({
                                confirmTitle: 'TAB FusionRMS',
                                confirmMessage: sMessage,
                                confirmOk: vrCommonRes['Yes'],
                                confirmCancel: vrCommonRes['No'],
                                confirmStyle: 'default',
                                //confirmOnlyOk: true,
                                confirmObject: combinval,
                                confirmCallback: ReplaceRetentionCode
                            });

                        }
                    //}
                }
            });
        });

    });
    
});

function validateCodeFields() {
    if ($('#lstNewRetentionCode').val() == "" || $('#lstOldRetentionCode').val() == "" || $('#lstTable').val() == " ") {
        $('#btnOk').attr("disabled", "disabled");
    }
    else {
        $('#btnOk').removeAttr("disabled", "disabled");
    }
}

//Replace all Old Retention code by New Retention code.
function ReplaceRetentionCode(combinval) {
    var data = [];
    var vTableId = "";
    var vNewRetentionCode = "";
    var vOldRetentionCode = "";
    
    if (combinval != null) {
        data = combinval.split("©");

        vTableId = data[0];
        vNewRetentionCode = data[1];
        vOldRetentionCode = data[2];
    }

    $.post(urls.Retention.ReplaceRetentionCode, $.param({ pTableId: vTableId, pNewRetentionCode: vNewRetentionCode, pOldRetentionCode: vOldRetentionCode }, true), function (data) {
        //console.log("Data: " + data.message);
        showAjaxReturnMessage(data.message, data.errortype);
        $('#mdlReassignRetentionCode').HideModel();
    });
}

//Get the list of Retention table names.
function GetRetentionTablesList()
{
    $.ajax({
        url: urls.Retention.GetRetentionTablesList,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {            
            var pTablesObject = $.parseJSON(data);
            //console.log(pTablesObject);
            
            $('#lstTable').empty();

            $('#lstTable').append($("<option>", { value: " ", html: " " }));
            $(pTablesObject).each(function (i, v) {
                $('#lstTable').append($("<option>", { value: v.TableId, html: v.TableName }));
            });
        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });
}

function GetRetentionCodeList()
{
    $.ajax({
        url: urls.Retention.GetRetentionCodeList,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {            
            var pRetentionObject = $.parseJSON(data);            

            $('#lstOldRetentionCode').empty();
            $('#lstNewRetentionCode').empty();

            $('#lstOldRetentionCode').append($("<option>", { value: "", html: "" }));
            $('#lstNewRetentionCode').append($("<option>", { value: "", html: "" }));
            $(pRetentionObject).each(function (i, v) {
                $('#lstOldRetentionCode').append($("<option>", { value: v.Id, html: v.Id }));
                $('#lstNewRetentionCode').append($("<option>", { value: v.Id, html: v.Id }));
            });
        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });
}