function LoadGroupsTabData() {
    $.ajax({
        url: urls.Security.LoadSecurityGroupsTab,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html'
    }).done(function (result) {
     $('#LoadTabContent').empty();
     $('#LoadTabContent').html(result);

     $("#grdSecurityGroups").gridLoad(urls.Security.LoadSecurityGroupGridData, vrSecurityRes["tiSGPartialGroups"], false);

     var $grid = $("#grdSecurityGroups");

     $grid.bind("jqGridSelectRow", function (id, e) {
         var selRowId = $("#grdSecurityGroups").jqGrid('getGridParam', 'selrow');
         var celValue = $("#grdSecurityGroups").jqGrid('getCell', selRowId, 'GroupID');
         var groupName = $("#grdSecurityGroups").jqGrid('getCell', selRowId, 'GroupName');

         if (celValue != false || parseInt(celValue) == 0) {
             $('#lgdAssignedMembership').text(vrSecurityRes['txtJsSTGGrpMemFpr']);
             $('#displaySelUserName').text(groupName);
             $('#displaySelUserName').attr('title', groupName);
             LoadAssignedMembers(celValue);
         }
         else {
             $('#lgdAssignedMembership').text(vrSecurityRes['tiSGPartialGroupMembers']);
             $('#displaySelUserName').text(""); //Added by Hemin on 11/11/2016
             $('#displaySelUserName').removeAttr('title');  //Added by Hemin on 11/11/2016
             $('#selAssignedMembers').empty();
         }
     });

     //ADD group to system.
     $('#btnAddGroup').on('click', function () {
         LoadSecurityGroupProfile('ADD', null);
     });

     //EDIT group from system.
     $('#btnEditGroup').on('click', function () {
         var rowSelection = $('#grdSecurityGroups').getGridParam('selrow');

         if (rowSelection == null) {
             showAjaxReturnMessage(vrSecurityRes['msgJsSTUSelectARow'], 'w');
             return;
         }
         else {
             LoadSecurityGroupProfile('EDIT', rowSelection);
         }
     });

     //DELETE user profile details.
     $('#btnDeleteGroup').on('click', function () {
         var selRowId = $("#grdSecurityGroups").jqGrid('getGridParam', 'selrow');
         var celValue = $("#grdSecurityGroups").jqGrid('getCell', selRowId, 'GroupName');
         var rowSelection = $('#grdSecurityGroups').getGridParam('selrow');

         if (rowSelection == null) {
             showAjaxReturnMessage(vrSecurityRes['msgJsSTUSelectARow'], 'w');
             return;
         }
         else if (celValue.toLowerCase().trim() == 'administrators group') {
             showAjaxReturnMessage(vrSecurityRes['msgJsSTGCannotDeleteAdminGrp'], 'e');
             return;
         }

         $(this).confirmModal({
             confirmTitle: vrSecurityRes['tiJsSTGDeleteGrp'],
             confirmMessage: String.format(vrSecurityRes['msgJsSTURUSure2DeleteUser'], celValue),
             confirmOk: vrCommonRes['Yes'],
             confirmCancel: vrCommonRes['No'],
             confirmStyle: 'default',
             confirmObject: rowSelection,
             confirmCallback: DeleteGroupProfile
         });
     });

     //Assign members to Group.
     $('#btnAssignMembers').on('click', function () {
         var selRowId = $("#grdSecurityGroups").jqGrid('getGridParam', 'selrow');
         var celValue = $("#grdSecurityGroups").jqGrid('getCell', selRowId, 'GroupName');
         var GroupID = $("#grdSecurityGroups").jqGrid('getCell', selRowId, 'GroupID');
         var rowSelection = $('#grdSecurityGroups').getGridParam('selrow');

         if (rowSelection == null) {
             showAjaxReturnMessage(vrSecurityRes['msgJsSTUSelectARow'], 'w');
             return;
         } else if (celValue.toLowerCase().trim() == 'everyone group') {
             return;
         }

         $('#mdlListMembers').ShowModel();
         $.post(urls.Security.GetAllUsersList, function (data) {
             var usrJsonObject = $.parseJSON(data.usrJsonObject);
             $("#ulMembers").empty();
             $(usrJsonObject).each(function (i, item) {
                 $("#ulMembers").append("<li id= LiId_" + usrJsonObject[i].UserID + " class='list-group-item checkbox-cus'><input type='checkbox' id='" + usrJsonObject[i].UserID + "' value='false' class='chkAssignedUsr'/><label class='checkbox-inline' for=" + usrJsonObject[i].UserID + " > " + usrJsonObject[i].UserName + "</label></li>");
             });

             $.getJSON(urls.Security.GetAssignedUsersForGroup, $.param({ pGroupId: GroupID }, true), function (data) {
                 var usrJson = $.parseJSON(data.jsonObject);
                 $.each(usrJson, function (i, item) {
                     $("#" + usrJson[i].UserID).attr('checked', true);
                 });
             });
         });

         $('#btnSaveUsrToGrp').off().on('click', function () {
             var IDs = new Array();
             $(".chkAssignedUsr").each(function () {
                 if (this.checked)
                     IDs.push($(this).attr('id'));
             });

             $.post(urls.Security.SetUsersAgainstGroup, $.param({ pGroupID: GroupID, pUserList: IDs }, true), function (data) {
                 showAjaxReturnMessage(data.message, data.errortype);
                 $('#mdlListMembers').HideModel();
                 LoadAssignedMembers(GroupID);
             });
         });
     });
 });
}

function LoadSecurityGroupProfile(OperationType, selectedrows) {
    $('#divLoadAddEditGroupProfile').empty();
    $('#divLoadAddEditGroupProfile').load(urls.Security.LoadSecurityGroupProfileView, function () {
        $('#mdlSecurityGroupsAddEdit').ShowModel();

        if (OperationType == 'EDIT')
            $("#lblSecurityTitlelbl").text(vrSecurityRes['tiASGPPartialUpdateGrp']);
        else
            $("#lblSecurityTitlelbl").text(vrSecurityRes['tiASGPPartialAddNewGrp']);

        $('#GroupName').SpecialCharactersSpaceNotAllowed();
        $('#GroupName').SomeCharacterNotAllowed("_");
        $('#AutoLockSeconds').OnlyNumeric();
        $('#AutoLogOffSeconds').OnlyNumeric();
        $('#AutoLockSeconds').val("0");
        //$('#AutoLogOffSeconds').val("0");

        $.validator.addMethod('minStrict', function (value, el, param) {
            return value > param;
        });

        $('#frmGroupAddEditScreen').validate({
            rules: {
                GroupID: {
                    required: false
                },
                GroupName: {
                    required: true,
                    maxlength: 50
                },
                Description: {
                    required: false,
                    CheckMaxLength: true
                },
                AutoLockSeconds: {
                    required: false
                },
                AutoLogOffSeconds: {
                    required: false//,
                    //minStrict:0       Fixed: FUS-6221
                }
            },
            messages: {
                //AutoLogOffSeconds: {
                //    minStrict: 'Auto LogOff value should be greater than 0.'
                //}
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

        $.validator.addMethod("CheckMaxLength", function (value, element) {
            return value.length <= 99;
        }, vrSecurityRes['msgJsSTGGrpDescLessThen100Char']);

        //AutoLockSeconds/AutoLogOffSeconds Validation.
        $('#AutoLockSeconds').on('focusout', function () {
            if ($(this).val() > 1440) {
                $(this).val(1440);
            }
        });
        $('#AutoLogOffSeconds').on('focusout', function () {
            if ($(this).val() > 1440) {
                $(this).val(1440);
            }
        });
        //Save/Edit group details to system.
        $('#btnSaveSecurityGroup').on('click', function () {
            //Set the default value if GroupID(hidden field) is empty.
            if ($('#GroupID').val() == "") {
                $('#GroupID').val(-2);
            }

            var $form = $('#frmGroupAddEditScreen');
            if ($form.valid()) {
                var serializedForm = $form.serialize();

                $.post(urls.Security.SetGroupDetails, serializedForm)
                    .done(function (response) {
                        showAjaxReturnMessage(response.message, response.errortype);
                        if (response.errortype == 's') {
                            $('#mdlSecurityGroupsAddEdit').HideModel();
                            $("#grdSecurityGroups").refreshJqGrid();
                            $('#lgdAssignedMembership').text(vrSecurityRes['tiSGPartialGroupMembers']);
                            $('#displaySelUserName').text("");  //Added by Hemin on 11/11/2016
                            $('#displaySelUserName').removeAttr('title');   //Added by Hemin on 11/11/2016
                            $('#selAssignedMembers').empty();
                        }
                        else if (response.errortype == 'w') {
                        }
                    })
                    .fail(function (xhr, status, error) {
                        //console.log(error);
                        ShowErrorMessge();
                    });
            }
        });
        if (OperationType == 'EDIT') {
            $.post(urls.Security.EditGroupProfile, $.param({ pRowSelected: selectedrows }, true), function (data) {
                if (data) {
                    var result = $.parseJSON(data);
                    $("#GroupID").val(result.GroupID);
                    $("#GroupName").val(result.GroupName);
                    $("#Description").val(result.Description);
                    $("#AutoLockSeconds").val(parseInt(result.AutoLockSeconds) / 60);
                    $("#AutoLogOffSeconds").val(parseInt(result.AutoLogOffSeconds) / 60);

                    if (result.GroupName.toLowerCase().trim() == 'everyone group' || result.GroupName.toLowerCase().trim() == 'administrators group') {
                        $("#GroupName").attr("readonly", true);
                        $("#Description").attr("readonly", true);
                    }
                    else {
                        $("#GroupName").removeAttr("readonly");
                        $("#Description").removeAttr("readonly");
                    }
                }
            });
        }
    });
}

function LoadAssignedMembers(vGroupID) {
    $.post(urls.Security.GetAssignedUsersForGroup, $.param({ pGroupId: vGroupID }, true), function (data) {
        var grpJson = $.parseJSON(data.jsonObject);

        $('#selAssignedMembers').empty();
        $.each(grpJson, function (i, item) {
            $('#selAssignedMembers').append("<option value='" + item.UserID + "'>" + item.UserName + "</option>");
        });
    });
}

function DeleteGroupProfile(selectedrows) {
    $.post(urls.Security.DeleteGroupProfile, $.param({ pRowSelected: selectedrows }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        $("#grdSecurityGroups").refreshJqGrid();
        $('#lgdAssignedMembership').text(vrSecurityRes['tiSGPartialGroupMembers']);
        $('#displaySelUserName').text("");  //Added by Hemin on 11/11/2016
        $('#displaySelUserName').removeAttr('title');   //Added by Hemin on 11/11/2016
        $('#selAssignedMembers').empty();
    });
}