$(function () {
    //Start of attachment main form
    $.ajaxSetup({ cache: false });
    // Load attachment form in edit mode

    $.get(urls.Attachments.EditAttachmentSettingsEntity, function (data) {
        if (data.errortype == 's') {
            
            FillOutputSettingsDDL(data.defaultsettingid);
            //$('#lstOutputSettingList').multiselect('select', data.defaultsettingid)
            //$('#lstOutputSettingList').multiselect('refresh');
            $("#PrintimgFooter").attr('checked', data.printimgfooter);
            $("#RenameOnScan").attr('checked', data.renameonscan);
            if (data.customelocation != "") {
                $("input[type='radio'][id='ImgCustomeLocation']").prop("checked", true);
                $('#CustomeLocation').attr('readonly', false);
                $('#ImgSlimLocationAddress').attr('readonly', true);
            }
            $('#CustomeLocation').val(data.customelocation);
            $('#ImgSlimLocationAddress').val(data.slimlocation);
        }
        else {
            showAjaxReturnMessage(data.message, data.errortype);
        }
    });

    // Load attachment form in edit mode

    // Apply all settings validation

    $('#frmAttachmentSettings').validate({
        rules: {
            lstOutputSettingList: { required: true },
            ImgSlimLocationAddress: "ValidateImgLocation",//ImgSlimLocationAddress: { required: true },
            CustomeLocation: "ValidateCustomeLocation"
        },
        ignore: ":hidden:not(select)",
        messages: {
            lstOutputSettingList: ""
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

    // Apply all settings validation

    // Apply all settings finally

    $("#btnApplyAttachment").on('click', function (e) {
        var vDefaultOpSettingsId = $('#lstOutputSettingList option:selected').val();
        if (vDefaultOpSettingsId == undefined) {
            showAjaxReturnMessage(vrApplicationRes["msgJsAttachmentsSelectValidSettings"], "w");
        }
        else {
            var $form = $('#frmAttachmentSettings');
            if ($form.valid()) {
                var vPrintImageFooter = $("#PrintimgFooter").is(":checked") ? "true" : "false";
                var vRenameOnScan = $("#RenameOnScan").is(":checked") ? "true" : "false";
                var vCustomeLocation = $("#CustomeLocation").val() == '' ? null : $("#CustomeLocation").val();
                var vImgSlimLocationAddress = $("#ImgSlimLocationAddress").val();
                $.post(urls.Attachments.SetAttachmentSettingsEntity, { pDefaultOpSettingsId: vDefaultOpSettingsId, pPrintImageFooter: vPrintImageFooter, pCustomeLocation: vCustomeLocation, pImgSlimLocationAddress: vImgSlimLocationAddress, pRenameOnScan: vRenameOnScan })
                    .done(function (response) {
                        showAjaxReturnMessage(response.message, response.errortype);
                        if (response.errortype == 's') {
                        }
                    })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });
            }
        }
    });

    // Apply all settings finally

    // Radio button change event

    $("input[type='radio'][name='ImgServiceLocation']").on('change', function (e) {
        var selected = $("input[type='radio'][name='ImgServiceLocation']:checked");
        $('#CustomeLocation').val('');

        if (selected.val() == 2) {
            $('#CustomeLocation').attr('readonly', false);
            $('#ImgSlimLocationAddress').next('span').remove();
            $('#ImgSlimLocationAddress').closest(".has-error").removeClass('has-error');
            $('#CustomeLocation').next('span').remove();
            $('#CustomeLocation').closest(".has-error").removeClass('has-error');
            $('#ImgSlimLocationAddress').attr('readonly', true);
        }
        else {
            $('#ImgSlimLocationAddress').next('span').remove();
            $('#ImgSlimLocationAddress').closest(".has-error").removeClass('has-error');
            $('#CustomeLocation').next('span').remove();
            $('#CustomeLocation').closest(".has-error").removeClass('has-error');
            $('#CustomeLocation').attr('readonly', true);
            $('#ImgSlimLocationAddress').attr('readonly', false);
        }
    });

    // Radio button change event

    //End of attachment main form

    //Start of output setting form

    // Add/Edit validation
    $('#frmOutputSettings').validate({
        rules: {
            DirName: {
                required: true,
                minlength: 3
            },
            FileNamePrefix: { required: true },
            FileExtension: { required: true },
            NextDocNum: { required: true },
            VolumesId: { required: true }
        },
        ignore: ":hidden:not(select)",
        messages: {
            DirName: {
                required: "",
                minlength: vrApplicationRes["msgJsAttachmentsValidation3OrMoreChar"]
            },
            FileNamePrefix: "",
            FileExtension: "",
            NextDocNum: "",
            VolumesId: ""
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
    // Add/Edit validation

    // Add popups window
    $("#btnAddOutputSettings").on('click', function (e) {
        $('#DirName').attr('readonly', false);
        $('#NextFileExtension').text('');
        $('#frmOutputSettings').resetControls();
        $("#DefaultOutputSettingsId").val('0');
        $("#DirectoriesId").val('0');
        $("#ViewGroup").val('0');
        $("#InActive").attr('checked', true);
        //$('#mdlOutputSetting').modal('show');
        //$('#mdlOutputSetting').modal(
        //    {
        //        show: true,
        //        keyboard: false,
        //        backdrop: 'static'
        //    })
        $('#mdlOutputSetting').ShowModel();
    });
    // Add popups window

    //Add/Edit Submit
    $("#btnSaveOutputSettings").on('click', function (e) {
        var $form = $('#frmOutputSettings');
        var vDefaultOpSettingsId = $('#lstOutputSettingList option:selected').val();
        if ($form.valid()) {
            var serializedForm = $form.serialize() + "&DirName=" + $('#DirName').val() + "&pInActive=" + $("#InActive").is(':checked');
            $.post(urls.Attachments.SetOutputSettingsEntity, serializedForm)
                .done(function (response) {
                    showAjaxReturnMessage(response.message, response.errortype);
                    if (response.errortype == 's') {
                        FillOutputSettingsDDL(vDefaultOpSettingsId);
                        //$('#mdlOutputSetting').modal('hide');
                        $('#mdlOutputSetting').HideModel();
                    }
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
        }
    });
    //Add/Edit Submit

    //Edit screen load
    $("#btnEditOutputSettings").on('click', function (e) {

        var vDefaultOpSettingsId = $('#lstOutputSettingList option:selected').val();
        if (vDefaultOpSettingsId == undefined) {
            showAjaxReturnMessage(vrApplicationRes["msgJsAttachmentsSelectValidSettingsForEdit"], "w");
        }
        else {
            //$('#DirName').next('span').remove();
            $('#frmOutputSettings').resetControls();
            $('#DirName').val($('#lstOutputSettingList option:selected').text());
            //$('#DefaultOutputSettingsId').val($('#lstOutputSettingList option:selected').val());
            $('#DirName').attr('readonly', true);
            var selectedrows = $('#lstOutputSettingList option:selected').val();
            $.post(urls.Attachments.EditOutputSettingsEntity, $.param({ pRowSelected: selectedrows }, true), function (data) {
                if (data.errortype == 's') {
                    if (data) {
                        var result = $.parseJSON(data.jsonObject);
                        $("#Id").val(result.Id);
                        $("#NextFileExtension").text(data.fileName);
                        $("#DefaultOutputSettingsId").val(result.DefaultOutputSettingsId);
                        $("#FileNamePrefix").val(result.FileNamePrefix);
                        $("#FileExtension").val(result.FileExtension);
                        $("#NextDocNum").val(result.NextDocNum);
                        $("#InActive").attr('checked', result.InActive);
                        $("#VolumesId").val(result.VolumesId);
                        $("#DirectoriesId").val(result.DirectoriesId);
                        $("#ViewGroup").val(result.ViewGroup);
                        //$('#mdlOutputSetting').modal('show');
                        $('#mdlOutputSetting').ShowModel();
                    }
                }
                else {
                    showAjaxReturnMessage(data.message, data.errortype);
                }
            });
        }
    });
    //Edit screen load

    //Remove settings
    $("#btnRemoveOutputSettings").on('click', function (e) {
        var vDefaultOpSettingsId = $('#lstOutputSettingList option:selected').val();
        if (vDefaultOpSettingsId == undefined) {
            showAjaxReturnMessage(vrApplicationRes["msgJsAttachmentsSelectValidSettingsForRemove"], "w");
        }
        else {
            $(this).confirmModal({
                confirmTitle: vrCommonRes['msgJsDelConfim'],
                confirmMessage: String.format(vrApplicationRes['msgJsAttachmentsConfirmToRemove'],$('#lstOutputSettingList option:selected').text()),
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmCallback: DeleteOutputSettings
            });
        }
    });
    //Remove settings

    //Next file name using textbox change event
    $("#FileNamePrefix").on('keyup', function (e) {
        GenerateFileName();
    });
    $("#FileExtension").on('keyup', function (e) {
        GenerateFileName();
    });
    $("#NextDocNum").on('keyup', function (e) {
        GenerateFileName();
    });
    $("#NextDocNum").OnlyNumeric();
    $("#FileExtension").OnlyCharectors();
    $("#FileNamePrefix").OnlyCharectorAndNumbers();
    //Next file name using textbox change event

    //End of output setting form

    //FUS-5991
    $("#InActive").on('change', function () {
        if (!$(this).is(":checked"))
            showAjaxReturnMessage(vrApplicationRes["msgJSInActiveOutputSetting"], "w");
    });
});

$.validator.addMethod('ValidateCustomeLocation', function (value, element) {
    var IsError = true;
    var selected = $("input[type='radio'][name='ImgServiceLocation']:checked");
    if (selected.val() == 2) {
        if ($("#CustomeLocation").val() == "") {
            $.validator.messages.required = '';
            IsError = false;
        }
        else {
            if (!URLValidation($("#CustomeLocation").val())) {
                $.validator.messages.required = vrApplicationRes["msgJsAttachmentsValidateImgLocation"];
                IsError = false;
                return false;
            }
            IsError = true;
        }

    }
    var ErrorMsg = "";
    return IsError;
}, function (ErrorMsg, element) {
    return $.validator.messages.required;
});

$.validator.addMethod('ValidateImgLocation', function (value, element) {
    var IsError = true;
    var selected = $("input[type='radio'][name='ImgServiceLocation']:checked");
    if (selected.val() == 1) {
        if ($("#ImgSlimLocationAddress").val() == "") {
            $.validator.messages.required = '';
            IsError = false;
        }
        else {
            if (!URLValidation($("#ImgSlimLocationAddress").val())) {
                $.validator.messages.required = vrApplicationRes["msgJsAttachmentsValidateImgLocation"];
                IsError = false;
                return false;
            }
            IsError = true;
        }

    }
    var ErrorMsg = "";
    return IsError;
}, function (ErrorMsg, element) {
    return $.validator.messages.required;
});

function URLValidation(vurl) {
    if (vurl.toLowerCase().indexOf('http://') != 0 && vurl.toLowerCase().indexOf('https://') != 0 && vurl.toLowerCase().indexOf('net.tcp://') != 0) {
        return false;
    } else if (vurl.toLowerCase().trim().indexOf('http://') == 0 && vurl.length == ('http://').length) {
            return false;
    } else if (vurl.toLowerCase().trim().indexOf('net.tcp://') == 0 && vurl.length == ('net.tcp://').length) {
        return false;
    } else if (vurl.toLowerCase().trim().indexOf('https://') == 0 && vurl.length == ('https://').length) {
        return false;
    } else if (check(vurl) == true) {
        return false;
    }
    return true;
}

var check = function (string) {
    var specialChars = " ;?%&@#^*<>|\"";
    for (i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
            return true;
        }
    }
    return false;
}

function GenerateFileName() {
    var vNextDocNum = $("#NextDocNum").val();
    var vFileNamePrefix = $("#FileNamePrefix").val();
    var vFileExtension = $("#FileExtension").val();

    if (vNextDocNum == '')
        $("#NextFileExtension").text(vFileNamePrefix + '.' + vFileExtension);
    else {
        if (vNextDocNum != '') {
            $.post(urls.Attachments.SetExampleFileName, $.param({ pNextDocNum: vNextDocNum, pFileNamePrefix: vFileNamePrefix, pFileExtension: vFileExtension }, true), function (data) {
                if (data) {
                    $("#NextFileExtension").text(data.toString());
                }
                else { $("#NextFileExtension").text(''); }
            });
        }
        else { $("#NextFileExtension").text(vFileNamePrefix + '.' + vFileExtension); }
    }
}

function FillOutputSettingsDDL(vSelectedValue) {
    $.ajax({
        url: urls.Attachments.GetOutputSettingList,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
            var pOutputObject = $.parseJSON(data);
            $('#lstOutputSettingList').empty();
            //Modified by Ganesh for Security Bug Fix.
            $(pOutputObject).each(function (i, v) {
                $('#lstOutputSettingList').append($("<option>", { value: v.toString().trim().toLowerCase(), html: v }));
            });
            //$(pOutputObject).each(function (i, v) {                
            //    $('#lstOutputSettingList').append($("<option>", { value: v.Name.toString().trim().toLowerCase(), html: v.Name }));
            //});
            if (vSelectedValue != undefined){
            if (vSelectedValue != "")
                $('#lstOutputSettingList').val(vSelectedValue.toString().trim().toLowerCase());
            }
            $('#lstOutputSettingList').multiselect('rebuild');

        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });
}

function DeleteOutputSettings() {
    var pOutputSettingId = $('#lstOutputSettingList option:selected').val();
    
    $.post(urls.Attachments.RemoveOutputSettingsEntity, $.param({ pRowSelected: pOutputSettingId }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        if (data.errortype == 's') {
            FillOutputSettingsDDL("");
        }
    });
}