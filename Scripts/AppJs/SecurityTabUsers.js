function LoadUsersTabData() {
    $.ajax({
        url: urls.Security.LoadSecurityUsersTab,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html'
    }).done(function (result) {
     $('#LoadTabContent').empty();
     $('#LoadTabContent').html(result);

     $('#divSecurityTab').css('display', 'block');
     
     $("#grdSecurityUsers").gridLoad(urls.Security.LoadSecurityUserGridData, vrSecurityRes["lblSTPartialUsers"], false);
     var $grid = $("#grdSecurityUsers");

     $grid.bind("jqGridSelectRow", function (id, e) {
         //var $target = $(e.target);
         var selRowId = $("#grdSecurityUsers").jqGrid('getGridParam', 'selrow');
         var celValue = $("#grdSecurityUsers").jqGrid('getCell', selRowId, 'UserID');
         var userName = $("#grdSecurityUsers").jqGrid('getCell', selRowId, 'UserName');

         if (celValue != false) {
             $('#lgdAssignedGrp').text(vrSecurityRes["lblJsSTUAssignedGroupsFor"]);
             $('#displaySelUserName').text(userName);
             $('#displaySelUserName').attr('title',userName);


             LoadAssignedGroups(celValue);
         }
         else {
             $('#lgdAssignedGrp').text(vrSecurityRes["tiSUPartialAssignedGroups"]);
             $('#displaySelUserName').text(""); //Added by Hemin on 11/11/2016
             $('#displaySelUserName').removeAttr('title');  //Added by Hemin on 11/11/2016
             $('#selAssignedGroups').empty();
         }
     });

     //ADD user profile details.
     $('#btnAddUser').on('click', function () {         
         LoadSecurityUserProfile('ADD', null);
     });

     //EDIT user profile details.
     $('#btnEditUser').on('click', function () {
         var rowSelection = $('#grdSecurityUsers').getGridParam('selrow');
         if (rowSelection == null) {
             showAjaxReturnMessage(vrSecurityRes["msgJsSTUSelectARow"], 'w');
             return;
         }
         else {
             LoadSecurityUserProfile('EDIT', rowSelection);
         }
     });
     //DELETE user profile details.
     $('#btnDeleteUser').on('click', function () {
         var selRowId = $("#grdSecurityUsers").jqGrid('getGridParam', 'selrow');
         var celValue = $("#grdSecurityUsers").jqGrid('getCell', selRowId, 'UserName');
         var selectedrows = $("#grdSecurityUsers").getSelectedRowsIds();
         var rowSelection = $('#grdSecurityUsers').getGridParam('selrow');

         if (rowSelection == null) {
             showAjaxReturnMessage(vrSecurityRes["msgJsSTUSelectARow"], 'w');
             return;
         }
         else if (celValue.toLowerCase().trim() == 'administrator') {
             showAjaxReturnMessage(vrSecurityRes["msgJsSTUCannotDelAdminUser"], 'e');
             return;
         }

         $(this).confirmModal({
             confirmTitle: vrSecurityRes['tiJsSTUDeleteUser'],
             confirmMessage: String.format(vrSecurityRes['msgJsSTURUSure2DeleteUser'], celValue),
             confirmOk: vrCommonRes['Yes'],
             confirmCancel: vrCommonRes['No'],
             confirmStyle: 'default',
             confirmObject: rowSelection,
             confirmCallback: DeleteUserProfile
         });
     });

     //Assign Groups    
     $('#btnAssignGrp').on('click', function () {
         var selRowId = $("#grdSecurityUsers").jqGrid('getGridParam', 'selrow');
         var celValue = $("#grdSecurityUsers").jqGrid('getCell', selRowId, 'UserName');
         var userID = $("#grdSecurityUsers").jqGrid('getCell', selRowId, 'UserID');
         var rowSelection = $('#grdSecurityUsers').getGridParam('selrow');

         if (rowSelection == null) {
             showAjaxReturnMessage(vrSecurityRes['msgJsSTUSelectARow'], 'w');
             return;
         }

         $('#mdlListGroups').ShowModel();
         $.post(urls.Security.GetAllGroupsList, $.param({ pUserId: userID }, true), function (data) {
             var grpsJsonObj = $.parseJSON(data.grpJsonObject);
             $("#ulGroups").empty();
             $(grpsJsonObj).each(function (i, item) {
                 $("#ulGroups").append("<li id= LiId_" + grpsJsonObj[i].GroupID + " class='list-group-item checkbox-cus'><input type='checkbox' id='" + grpsJsonObj[i].GroupID + "' value='false' class='chkAssignedGrp'/><label class='checkbox-inline' for=" + grpsJsonObj[i].GroupID + "> " + grpsJsonObj[i].GroupName + "</label></li>");
             });

             $.getJSON(urls.Security.GetAssignedGroupsForUser, $.param({ pUserId: userID }, true), function (data) {
                 var grpJson = $.parseJSON(data.jsonObject);
                 $.each(grpJson, function (i, item) {
                     $("#" + grpJson[i].GroupID).attr('checked', true);
                 });
             });
         });

         //Save the assigned groups to user
         $('#btnSaveGrpToUsr').off().on('click', function () {
             var IDs = [];
             $(".chkAssignedGrp").each(function () {
                 if (this.checked)
                     IDs.push($(this).attr('id'));
             });

             if (IDs.length == 0) {
                 IDs.push("None");
             }
             if (IDs.length >= 0) {
                 $.post(urls.Security.SetGroupsAgainstUser, $.param({ pUserID: userID, pGroupList: IDs }, true), function (data) {
                     showAjaxReturnMessage(data.message, data.errortype);
                     $('#mdlListGroups').HideModel();
                     LoadAssignedGroups(userID);
                 });
             }
             else {
                 $('#mdlListGroups').HideModel();
             }
         });

     });

     //SET PASSWORD
     $('#btnSetPwd').on('click', function () {
         var selRowId = $("#grdSecurityUsers").jqGrid('getGridParam', 'selrow');
         var celValue = $("#grdSecurityUsers").jqGrid('getCell', selRowId, 'UserName');
         var userID = $("#grdSecurityUsers").jqGrid('getCell', selRowId, 'UserID');
         var mustChangePwd = $("#grdSecurityUsers").jqGrid('getCell', selRowId, 'MustChangePassword');
         var rowSelection = $('#grdSecurityUsers').getGridParam('selrow');
         
         if (rowSelection == null) {
             showAjaxReturnMessage(vrSecurityRes['msgJsSTUSelectARow'], 'w');
             return;
         }
         
         $('#mdlSetUserPassword').ShowModel();
         $("#txtNewPassword").val("");
         $("#txtConfirmPassword").val("");

         if (mustChangePwd.toString() == "false") {
             $("#chkRequireLogin").prop('checked', false);
         } else {
             $("#chkRequireLogin").prop('checked', true);
         }
         $("#lblUserName").text(String.format(vrSecurityRes['txtJsSTUPlzEnterPassword'], celValue));

         $('#btnSaveUserPwd').off().on('click', function () {
             if ($('#txtNewPassword').val() == "" && $('#txtConfirmPassword').val() == "") {
                 showAjaxReturnMessage(vrSecurityRes['msgJsSTUPlzEnterPasswordB4ClickOkBtn'], 'e');
                 return;
             }
             else if ($('#txtNewPassword').val().length < 6 || $('#txtNewPassword').val().length > 20) {
                 showAjaxReturnMessage(vrSecurityRes['msgJsSTUPasswordLen6To20'], 'e');
                 return;
             }
             else if ($('#txtNewPassword').val() != $('#txtConfirmPassword').val()) {
                 showAjaxReturnMessage(vrSecurityRes['msgJsSTUPasswordNotMatched'], 'w');
                 return;
             }
             else if ($("#txtNewPassword").val().toLowerCase() == celValue.toLowerCase()) {
                 showAjaxReturnMessage(vrSecurityRes['msgJsSTUPasswordNotMatchedWithUserName'], 'w');
                 return;
             }
             else if (!validateCharacters($("#txtNewPassword").val())) {
                 showAjaxReturnMessage(vrSecurityRes['msgJsSTUPasswordHvInvalidChar'], 'e');
                 return;
             }
             else if (IsSequentialCharacters($('#txtNewPassword').val())) {
                 showAjaxReturnMessage(vrSecurityRes['msgJsSTUPWDNotHv3SeqChar'], 'e');
                 return;
             }
             else if (IsRepeatingCharacters($('#txtNewPassword').val())) {
                 showAjaxReturnMessage(vrSecurityRes['msgJsSTUPWDNotHvMor3RepeatingChar'], 'e');
                 return;
             }
             else {
                 //change the password for user.
                 $.post(urls.Security.SetUserPassword, $.param({ pUserId: userID, pUserPassword: $("#txtNewPassword").val(), pCheckedState: $('#chkRequireLogin').is(':checked') }, true), function (data) {
                     showAjaxReturnMessage(data.message, data.errortype);
                     $('#mdlSetUserPassword').HideModel();
                 });

             }
         });
     });

     //UNLOCK ACCOUNT
     $('#btnUnlockAcc').on('click', function () {
         var selRowId = $("#grdSecurityUsers").jqGrid('getGridParam', 'selrow');
         var userName = $("#grdSecurityUsers").jqGrid('getCell', selRowId, 'UserName');
         var userID = $("#grdSecurityUsers").jqGrid('getCell', selRowId, 'UserID');
         var rowSelection = $('#grdSecurityUsers').getGridParam('selrow');

         if (rowSelection == null) {
             showAjaxReturnMessage(vrSecurityRes['msgJsSTUSelectARow'], 'w');
             return;
         }

         $.post(urls.Security.UnlockUserAccount, $.param({ pOperatorId: userName }, true), function (data) {
             showAjaxReturnMessage(data.message, data.errortype);
             if (data.errortype == 's') {
                 console.log(vrSecurityRes['msgJsSTUserACInLockedSuccess']);
             }
         });
     });

 })
    .fail(function (xhr, status) {
        ShowErrorMessge();
    });
}

function LoadSecurityUserProfile(OperationType, selectedrows) {
    $('#divLoadAddEditUserProfile').empty();
    $('#divLoadAddEditUserProfile').load(urls.Security.LoadSecurityUserProfileView, function () {
        $('#mdlSecurityUsersAddEdit').ShowModel();
        $('#hdSecurityUsersHeader').text(OperationType == "ADD" ? vrSecurityRes['tiASUPPartialAddNewUser'] : vrSecurityRes['tiASUPPartialEditUser']);
        $('#UserName').SpecialCharactersSpaceNotAllowed();
        $('#UserName').SomeCharacterNotAllowed("_");
        $('#FullName').SomeCharacterNotAllowed('~_,?=:)+-(!#$%^&*"`|][{}.\\/;><\'@');
        $('#frmUserAddEditScreen').validate({
            rules: {
                UserName: {
                    required: true,
                    rangelength: [2, 20]
                },
                FullName: {
                    required: false
                },
                Email: {
                    required: false,
                    ValidateEmailAddress: true,
                    maxlength: 320
                },
                Misc1: {
                    required: false
                },
                Misc2: {
                    required: false
                }
            },
            ignore: ":hidden:not(select)",
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

        $.validator.addMethod("ValidateEmailAddress", function (value, element) {
            //return this.optional(element) || /^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w{2}\w*$/.test(value); // Commented By : Prakash Jadav 03-Nov-2016
            var isPass = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value.trim());
            //if (isPass) {
            //    isPass = new RegExp(/[^\S]/).test(value.trim());
            //    isPass = !isPass;
            //}
            return isPass;
        }, vrSecurityRes['msgJsSTEnterValidEmailID']);

        //Save/Edit user details to system.
        $('#btnSaveSecurityUser').on('click', function () {
            var $form = $('#frmUserAddEditScreen');
            if ($form.valid()) {
                var serializedForm = $form.serialize();

                $.post(urls.Security.SetUserDetails, serializedForm)
                    .done(function (response) {
                        showAjaxReturnMessage(response.message, response.errortype);
                        if (response.errortype == 's') {
                            $('#mdlSecurityUsersAddEdit').HideModel();
                            $("#grdSecurityUsers").refreshJqGrid();
                            $('#lgdAssignedGrp').text(vrSecurityRes['tiSUPartialAssignedGroups']);
                            $('#displaySelUserName').text("");  //Added by Hemin on 11/11/2016
                            $('#displaySelUserName').removeAttr('title');   //Added by Hemin on 11/11/2016
                            $('#selAssignedGroups').empty();
                        }
                        else if (response.errortype == 'w') {
                        }
                    })
                    .fail(function (xhr, status, error) {
                        console.log(error);
                        ShowErrorMessge();
                    });
            }
        });

        if (OperationType == 'EDIT') {
            $.post(urls.Security.EditUserProfile, $.param({ pRowSelected: selectedrows }, true), function (data) {
                if (data) {
                    var result = $.parseJSON(data);
                    $("#UserID").val(result.UserID);
                    $("#UserName").val(result.UserName);
                    $("#FullName").val(result.FullName);
                    $("#Email").val(result.Email);
                    $("#Misc1").val(result.Misc1);
                    $("#Misc2").val(result.Misc2);
                    $("#AccountDisabled").prop('checked', result.AccountDisabled);

                    if (result.UserName.toLowerCase().trim() == 'administrator') {
                        $("#UserName").attr("readonly", true);
                        $("#FullName").attr("readonly", true);
                        $("#AccountDisabled").attr("disabled", "disabled");
                    }
                    else {
                        $("#UserName").removeAttr("readonly");
                        $("#FullName").removeAttr("readonly");
                        $("#AccountDisabled").removeAttr("disabled", "disabled");
                    }
                }
            });
        }
    });
}

function DeleteUserProfile(selectedrows) {
    $.post(urls.Security.DeleteUserProfile, $.param({ pRowSelected: selectedrows }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        $("#grdSecurityUsers").refreshJqGrid();
        $('#lgdAssignedGrp').text(vrSecurityRes['tiSUPartialAssignedGroups']);
        $('#displaySelUserName').text("");  //Added by Hemin on 11/11/2016
        $('#displaySelUserName').removeAttr('title');   //Added by Hemin on 11/11/2016
        $('#selAssignedGroups').empty();
    });
}

function LoadAssignedGroups(vUserID) {
    $.post(urls.Security.GetAssignedGroupsForUser, $.param({ pUserID: vUserID }, true), function (data) {
        var grpJson = $.parseJSON(data.jsonObject);

        $('#selAssignedGroups').empty();
        $.each(grpJson, function (i, item) {
            $('#selAssignedGroups').append("<option value='" + item.GroupID + "'>" + item.GroupName + "</option>");
        });
    });
}

function IsSequentialCharacters(pwdString) {
    var regex = /0123|1234|2345|3456|4567|5678|6789|ABCD|BCDE|CDEF|DEFG|EFGH|FGHI|GHIJ|HIJK|IJKL|JKLM|KLMN|LMNO|MNOP|NOPQ|OPQR|PQRS|QRST|RSTU|STUV|TUVW|UVWX|VWXY|WXYZ|abcd|bcde|cdef|defg|efgh|fghi|ghij|hijk|ijkl|jklm|klmn|lmno|mnop|nopq|opqr|pqrs|qrst|rstu|stuv|tuvw|uvwx|vwxy|wxyz/;
    if (!regex.test(pwdString)) {
        return false;
    } else {
        return true;
    }
}

function IsRepeatingCharacters(pwdString) {
    //var regex = new RegExp("(.)\1{3,}");
    var regex = /(.)\1{3,}/gm;
    return regex.test(pwdString);
}

function validateCharacters(pwdString) {
    var regex = /^[^'"]*$/;
    return regex.test(pwdString);
}