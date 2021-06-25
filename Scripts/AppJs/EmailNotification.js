$(function () {
    var userName = null;
    var password = null;
    //get Email details from database and set it into form
    $.get(urls.EmailNotification.GetSMTPDetails, { flagSMTP: false }, function (data) {
        if (data) {
            var result = $.parseJSON(data);
            //   1 or 0x1 = Delivery
            //   2 or 0x2 = Wait List
            //   4 or 0x4 = Exception
            // 128 or 0x80 = Background
            if (result.NotificationEnabled & 0x1)
                $('#EMailDeliveryEnabled').attr('checked', true);
            if (result.NotificationEnabled & 0x2)
                $('#EMailWaitListEnabled').attr('checked', true);
            if (result.NotificationEnabled & 0x4)
                $('#EMailExceptionEnabled').attr('checked', true);
            if (result.NotificationEnabled & 0x80)
                $('#EMailBackgroundEnabled').attr('checked', true);
            /*
            if (result.EMailDeliveryEnabled)
                $('#EMailDeliveryEnabled').attr('checked', true);
            if (result.EMailWaitListEnabled)
                $('#EMailWaitListEnabled').attr('checked', true);
            if (result.EMailExceptionEnabled)
                $('#EMailExceptionEnabled').attr('checked', true);
            */
            if (result.SMTPAuthentication) {
                $('#setting_btn').removeAttr('disabled');
                $('#SMTPAuthentication').attr('checked', true);
            }
            
            $('#SMTPPort').val(result.SMTPPort);
            $('#SMTPServer').val(result.SMTPServer);
            $("#SMTPUserAddress").val(result.SMTPUserAddress);
            $("#SMTPUserPassword").val(result.SMTPUserPassword);
            SetSpan(result.EMailConfirmationType);
            $('#EMailConfirmationType').val(result.EMailConfirmationType);
        }
    });    //get Email details from database and set it into form


    //Disable/Enable Setting button
    $('#SMTPAuthentication').on('change', function () {
        if ($(this).is(':checked')) {
            $('#setting_btn').removeAttr('disabled');
        }
        else {
            $('#setting_btn').attr('disabled', 'disabled');
        }
    });//Disable/Enable Setting button


    //Display pop-up window
    $('#setting_btn').click(function () {
        $('#AddEmailSetting').empty();
        $('#AddEmailSetting').load(urls.EmailNotification.EmailSettingPartialView, function () {
            $('#mdlEmailDetails').modal({
                show: true,
                backdrop: 'static'
            });

            if ((userName !== null) && (password !== null)) {
                $('#SMTPUserAddress').val(userName);
                $('#SMTPUserPassword').val(password);
            }
            else {
                GetEmailDetails();
            }

            $('#btnCancel').on('click', function () {
                GetEmailDetails();
                var tempUser = $('#SMTPUserAddress').val();
                var tempPwd = $('#SMTPUserPassword').val();
                if ((tempUser == "" || tempPwd == "") && (userName == "" || userName == null)) {
                    $('#setting_btn').attr('disabled', 'disabled');
                    $('#SMTPAuthentication').attr('checked', false);
                }

            });
            $('#btnOk').on('click', function () {
                var SMTPUser = $('#SMTPUserAddress').val().trim();
                var SMTPPwd = $('#SMTPUserPassword').val().trim();
                $('#user_validate').addClass('help-block');
                $('#pwd_validate').addClass('help-block');
                if ((SMTPUser.length == 0) && (SMTPPwd.length == 0)) {
                    $('#btnOk').removeAttr('data-dismiss');
                    $('#user_validate').show();
                    $('#pwd_validate').show();
                    $('#SMTPUserAddress').closest('.form-group').addClass('has-error');
                    $('#SMTPUserPassword').closest('.form-group').addClass('has-error');
                }
                else if (SMTPUser.length == 0 && SMTPPwd.length > 0) {
                    $('#btnOk').removeAttr('data-dismiss');
                    $('#user_validate').show();
                    $('#pwd_validate').hide();
                    $('#SMTPUserAddress').closest('.form-group').addClass('has-error');
                    $('#SMTPUserPassword').closest('.form-group').removeClass('has-error');
                }
                else if (SMTPUser.length > 0 && SMTPPwd.length == 0) {
                    $('#btnOk').removeAttr('data-dismiss');
                    $('#pwd_validate').show();
                    $('#user_validate').hide();
                    $('#SMTPUserPassword').closest('.form-group').addClass('has-error');
                    $('#SMTPUserAddress').closest('.form-group').removeClass('has-error');
                }
                else {
                    if ((SMTPUser.length > 255) && (SMTPPwd.length > 255)) {
                        $('#btnOk').removeAttr('data-dismiss');
                        $('#pwd_validate').show();
                        $('#pwd_validate').text(vrApplicationRes['msgJsEmailNotificationNotMoreThan255Char']);
                        $('#user_validate').show();
                        $('#user_validate').text(vrApplicationRes['msgJsEmailNotificationNotMoreThan255Char']);
                        $('#SMTPUserAddress').closest('.form-group').addClass('has-error');
                        $('#SMTPUserPassword').closest('.form-group').addClass('has-error');
                    } else if ((SMTPUser.length > 255) && (SMTPPwd.length <= 255)) {
                        $('#btnOk').removeAttr('data-dismiss');
                        $('#user_validate').show();
                        $('#user_validate').text(vrApplicationRes['msgJsEmailNotificationNotMoreThan255Char']);
                        $('#pwd_validate').hide();
                        $('#pwd_validate').text(vrApplicationRes["msgEmailSettingsPasswordRequired"]);
                        $('#SMTPUserAddress').closest('.form-group').addClass('has-error');
                        $('#SMTPUserPassword').closest('.form-group').removeClass('has-error');
                    } else if ((SMTPUser.length <= 255) && (SMTPPwd.length > 255)) {
                        $('#btnOk').removeAttr('data-dismiss');
                        $('#pwd_validate').show();
                        $('#pwd_validate').text(vrApplicationRes['msgJsEmailNotificationNotMoreThan255Char']);
                        $('#user_validate').hide();
                        $('#user_validate').text(vrApplicationRes["msgEmailSettingsUserNameRequired"]);
                        $('#SMTPUserPassword').closest('.form-group').addClass('has-error');
                        $('#SMTPUserAddress').closest('.form-group').removeClass('has-error');
                    } else {
                        $('#mdlEmailDetails').modal("hide");
                        userName = SMTPUser;
                        password = SMTPPwd;
                    }
                }
            });
        });
    });//Display pop-up window

    $('#frmEmailDetails').validate({
        rules: {
            SMTPServer: { maxlength: 255 }
        },
        ignore: ":hidden:not(select)",
        messages: {

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

    //Save data in database 
    $("#btnApplyEmail").on('click', function (e) {
        $('#Id').val("1");
        var $form = $('#frmEmailDetails');
        if ($form.valid()) {
            var serializedForm = $form.serialize()
                + "&pEMailDeliveryEnabled=" + $('#EMailDeliveryEnabled').is(':checked')
                + "&pEMailWaitListEnabled=" + $('#EMailWaitListEnabled').is(':checked')
                + "&pEMailExceptionEnabled=" + $('#EMailExceptionEnabled').is(':checked')
                + "&pEMailBackgroundEnabled=" + $('#EMailBackgroundEnabled').is(':checked')
                + "&pSMTPAuthentication=" + $('#SMTPAuthentication').is(':checked');
            $.post(urls.EmailNotification.SetEmailDetails, serializedForm)
                .done(function (response) {
                    showAjaxReturnMessage(response.message, response.errortype);
                }).fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
        }
    }); //Save data in database 

    $('#SMTPPort').keypress(function (event) {
        if ((event.which != 8 && isNaN(String.fromCharCode(event.which))) || (event.which == 32)) {
            event.preventDefault();
        }
    });

    $('#pLevel1_check').on('change', function () {
        if ($(this).is(':checked')) {
            DisplayLevel($(this).attr('id'));
        }
        ShowSpan();
    });

    $('#pLevel2_check').on('change', function () {
        if ($(this).is(':checked')) {
            DisplayLevel($(this).attr('id'));
        }
        ShowSpan();
    });

    $('#wLevel1_check').on('change', function () {
        if ($(this).is(':checked')) {
            DisplayLevel($(this).attr('id'));
        }
        ShowSpan();
    });

    $('#wLevel2_check').on('change', function () {
        if ($(this).is(':checked')) {
            DisplayLevel($(this).attr('id'));
        }
        ShowSpan();
    });

});

//Break the line in label
$.fn.multiline = function (text) {
    this.text(text);
    this.html(this.html().replace(/\n/g, '<br/>'));
    return this;
}//Break the line in label

//Display description window on change 
function ShowSpan() {
    var plevel1 = $("#pLevel1_check").is(':checked');
    var plevel2 = $("#pLevel2_check").is(':checked');
    var wlevel1 = $("#wLevel1_check").is(':checked');
    var wlevel2 = $("#wLevel2_check").is(':checked');

    //console.log("pLevel Val : " + plevel1);
    //console.log("pLevel Val2 : " + plevel2);
    //console.log("wLevel Val1 : " + wlevel1);
    //console.log("wLevel Val2 : " + wlevel2);
    if ((plevel1 == false) && (plevel2 == false) && (wlevel1 == false) && (wlevel2 == false)) {
        $('#EMailConfirmationType').val("0");
        $('#1nnnn').multiline(vrApplicationRes['msgJsEmailNotificationAllContLblNoAction']);
    }
    else if ((plevel1 == true) && (plevel2 == false) && (wlevel1 == false) && (wlevel2 == false)) {
        $('#EMailConfirmationType').val("1");
        $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType1'], '\n', '\n\n'));
    }
    else if ((plevel1 == false) && (plevel2 == true) && (wlevel1 == false) && (wlevel2 == false)) {
        $('#EMailConfirmationType').val("2");
        $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType2'], '\n', '\n\n'));
    }
    else if ((plevel1 == true) && (plevel2 == true) && (wlevel1 == false) && (wlevel2 == false)) {
        $('#EMailConfirmationType').val("3");
        $('#1nnnn').multiline(vrApplicationRes["msgJsEmailNotificationAllContLvlPromptEmailAdd"]);
    }
    else if ((plevel1 == false) && (plevel2 == false) && (wlevel1 == true) && (wlevel2 == false)) {
        $('#EMailConfirmationType').val("4");
        $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType4'], '\n', '\n\n'));
    }
    else if ((plevel1 == false) && (plevel2 == true) && (wlevel1 == true) && (wlevel2 == false)) {
        $('#EMailConfirmationType').val("6");
        $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType6'], '\n', '\n\n'));
    }
    else if ((plevel1 == false) && (plevel2 == false) && (wlevel1 == false) && (wlevel2 == true)) {
        $('#EMailConfirmationType').val("8");
        $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType8'], '\n', '\n\n'));
    }
    else if ((plevel1 == true) && (plevel2 == false) && (wlevel1 == false) && (wlevel2 == true)) {
        $('#EMailConfirmationType').val("9");
        $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType9'], '\n', '\n\n'));
    }
    else if ((plevel1 == false) && (plevel2 == false) && (wlevel1 == true) && (wlevel2 == true)) {
        $('#EMailConfirmationType').val("12");
        $('#1nnnn').multiline(vrApplicationRes['msgJsEmailNotificationAllContLblDisplayWarning']);
    }
    else {
        $('#EMailConfirmationType').val("0");
        $('#1nnnn').multiline(vrApplicationRes['msgJsEmailNotificationAllContLblNoAction']);
    }
}//Display description window on change 


//Set Confirmation controls based on data value
function SetSpan(ConfirmTypeVar) {
    switch (ConfirmTypeVar) {
        case 1:
            $('#pLevel1_check').attr('checked', true);
            $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType1'], '\n', '\n\n'));
            break;
        case 2:
            $('#pLevel2_check').attr('checked', true);
            $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType2'], '\n', '\n\n'));
            break;
        case 3:
            $('#pLevel1_check').attr('checked', true);
            $('#pLevel2_check').attr('checked', true);
            $('#1nnnn').multiline(vrApplicationRes["msgJsEmailNotificationAllContLvlPromptEmailAdd"]);
            break;
        case 4:
            $('#wLevel1_check').attr('checked', true);
            $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType4'], '\n', '\n\n'));
            break;
        case 6:
            $('#pLevel2_check').attr('checked', true);
            $('#wLevel1_check').attr('checked', true);
            $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType6'], '\n', '\n\n'));
            break;
        case 8:
            $('#wLevel2_check').attr('checked', true);
            $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType8'], '\n', '\n\n'));
            break;
        case 9:
            $('#pLevel1_check').attr('checked', true);
            $('#wLevel2_check').attr('checked', true);
            $('#1nnnn').multiline(String.format(vrApplicationRes['msgJsEmailNotificationMailConfType9'], '\n', '\n\n'));
            break;
        case 12:
            $('#wLevel1_check').attr('checked', true);
            $('#wLevel2_check').attr('checked', true);
            $('#1nnnn').multiline(vrApplicationRes["msgJsEmailNotificationAllContLblDisplayWarning"]);
            break;
        default:
            $('#1nnnn').multiline(vrApplicationRes["msgJsEmailNotificationAllContLblNoAction"]);
            break;
    }
}//Set Confirmation controls based on data value

//Container level condition
function DisplayLevel(CheckBoxId) {
    var pLevelVal1 = $("#pLevel1_check").is(':checked');
    var pLevelVal2 = $("#pLevel2_check").is(':checked');
    var wLevelVal1 = $("#wLevel1_check").is(':checked');
    var wLevelVal2 = $("#wLevel2_check").is(':checked');
    switch (CheckBoxId) {

        case 'pLevel1_check':
            if (wLevelVal1 == true) {
                $('#wLevel1_check').attr('checked', false);
            }
            break;
        case 'pLevel2_check':
            if (wLevelVal2 == true) {
                $('#wLevel2_check').attr('checked', false);
            }
            break;
        case 'wLevel1_check':
            if (pLevelVal1 == true) {
                $('#pLevel1_check').attr('checked', false);
            }
            break;
        case 'wLevel2_check':
            if (pLevelVal2 == true) {
                $('#pLevel2_check').attr('checked', false);
            }
            break;
        default:
            break;

    }
}//Container level condition

//get email data from database and set in fields
function GetEmailDetails() {
    var selectedValue = $('#SMTPAuthentication').is(':checked');
    $.post(urls.EmailNotification.GetSMTPDetails, { flagSMTP: true }, function (data) {
        if (data) {
            var result = $.parseJSON(data);
            if (selectedValue) {
                $("#SMTPUserAddress").val(result.SMTPUserAddress);
                $("#SMTPUserPassword").val(result.SMTPUserPassword);
            }
        }
        else {
            showAjaxReturnMessage(data.message, data.errortype);
        }
    });
}
//get email data from database and set in fields

