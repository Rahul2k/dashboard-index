function LoadPermissionsTabData() {
    $.ajax({
        url: urls.Security.LoadSecurityPermissionsTab,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html'
    }).done(function (result) {
     $('#LoadTabContent').empty();
     $('#LoadTabContent').html(result);

     GetPermissionGroupsList();
     GetListOfSecurablesTypeForPermissions();

     $('#btnCopy').attr('disabled', 'disabled');
     $('#btnSavePermission').attr('disabled', 'disabled');
     $('#lblPermissionPasteInfo_2').css('display', 'none');

     //Get the list of Securable object list.
     $('#lstSecurableTypesForPermissions').on('change', function () {
         $('#ulForPermissions').empty();
         GetListOfPermissionObjects($('#lstSecurableTypesForPermissions').val());
     });

     $('#lstGroups').on('change', function () {
         if ($('#btnCopy').text() != vrCommonRes['Paste'])
             GetPermissionsBasedOnGroupId($(this).val(), $('#lstSecurablesForPermissions :selected').val());
         else if ($('#btnCopy').text() == vrCommonRes['Paste']) {
             $('#btnCopy').removeAttr('disabled');
             $('#btnSavePermission').removeAttr('disabled');
         }
         else {
             $('#btnCopy').removeAttr('disabled');
             $('#btnSavePermission').attr('disabled', 'disabled');
         }
     });

     $('#lstSecurablesForPermissions').on('change', function () {
         if ($('#btnCopy').text() != vrCommonRes['Paste'])
             GetPermissionsBasedOnGroupId($('#lstGroups :selected').val(), $(this).val());
         else if ($('#btnCopy').text() == vrCommonRes['Paste']) {
             $('#btnCopy').removeAttr('disabled');
             $('#btnSavePermission').removeAttr('disabled');
         }
         else {
             $('#btnCopy').removeAttr('disabled');
             $('#btnSavePermission').attr('disabled', 'disabled');
         }
     });

     $('#chkSelectAllForPermissions').on('change', function () {        
         if ($(this).is(':checked')) {
             $(".Permissions_2").each(function () {
                 if ($('#' + $(this).attr('id') + '_children').length > 0) {
                     //Check if parent chk, if not chked then fire event
                     if (($('#' + $(this).attr('id')).is(':checked') != true)) {
                         $('#' + $(this).attr('id')).trigger('click');
                     }
                 }
                 if ($(this).is(':checked') == false) {
                     $(this).attr('checked', true);
                     $(this).removeAttr('disabled');

                     $('#btnCopy').attr('disabled', 'disabled');
                     $('#btnSavePermission').removeAttr('disabled');
                 }
             });
         }
         else {
             $(".Permissions_2").each(function () {
                 if ($('#' + $(this).attr('id') + '_children').length > 0)
                     $('#' + $(this).attr('id')).trigger('click');

                 if ($(this).is(':checked')) {
                     $(this).attr('checked', false);

                     $('#btnCopy').attr('disabled', 'disabled');
                     $('#btnSavePermission').removeAttr('disabled');
                 }
             });
         }
     });

     //Copy and Paste the permissions.
     $('#btnCopy').on('click', function () {
         if ($('#btnCopy').text() == vrSecurityRes['lblSPPartialCopy']) {
             $('#lstSecurableTypesForPermissions').attr('disabled', 'disabled');
             $("#btnCopy").html(vrCommonRes['Paste']);
             $("#btnSavePermission").html(vrCommonRes['Cancel']);
             $('#btnSavePermission').removeAttr('disabled');
             $('#lstSecurablesForPermissions').attr('multiple', 'multiple');
             $('#lstGroups').attr('multiple', 'multiple');
             $('#chkSelectAllForPermissions').attr('disabled', 'disabled');
             $('#lblPermissionPasteInfo_2').css('display', 'block');

             //Disabled all the checkboxes from Permissions.
             $('.Permissions_2').each(function () {
                 $('#' + $(this).attr('id')).attr('disabled', 'disabled');
             });
         }
         else if ($('#btnCopy').text() == vrCommonRes['Paste']) {
             if ($('#lstGroups option:selected').length > 0 && $('#lstSecurablesForPermissions option:selected').length > 0) {
                 SetGroupPermissions();

                 $('#lstSecurableTypesForPermissions').removeAttr('disabled');
                 $("#btnCopy").html(vrSecurityRes['lblSPPartialCopy']);
                 $("#btnSavePermission").html(vrCommonRes['Apply']);
                 $('#btnSavePermission').attr('disabled', 'disabled');
                 $('#lstSecurablesForPermissions').removeAttr('multiple');
                 $('#lstGroups').removeAttr('multiple');
                 $('#chkSelectAllForPermissions').removeAttr('disabled');
                 $('#lblPermissionPasteInfo_2').css('display', 'none');
                 //Remove all the disabled checkboxes from Permissions.
                 $('.Permissions_2').each(function () {
                     $('#' + $(this).attr('id')).removeAttr('disabled');
                 });
             }
             else {
                 showAjaxReturnMessage(vrSecurityRes["msgJsSTPSelect1GrpAndSecurable"], 'w');
             }
         }
     });

     ////APPLY/Save the Permissions.
     $('#btnSavePermission').on('click', function () {
         if ($("#btnSavePermission").text() == vrCommonRes['Apply']) {
             SetGroupPermissions();
         }
         else if ($("#btnSavePermission").text() == vrCommonRes['Cancel']) {
             $('#lstSecurablesForPermissions').prop('selectedIndex', -1);
             $('#ulForPermissions').empty();
             $('#lstSecurableTypesForPermissions').removeAttr('disabled');
             $('#lstSecurablesForPermissions').removeAttr('multiple');
             $('#lstGroups').removeAttr('multiple');
             $("#btnCopy").html(vrSecurityRes['lblSPPartialCopy']);
             $("#btnSavePermission").html(vrCommonRes['Apply']);
             $('#chkSelectAllForPermissions').removeAttr('disabled');
             $('#btnSavePermission').attr('disabled', 'disabled');
             $('#btnCopy').attr('disabled', 'disabled');
             $('#lblPermissionPasteInfo_2').css('display', 'none');

             //Disabled all the checkboxes from Permissions.
             $('.Permissions').each(function () {
                 $('#' + $(this).attr('id')).removeAttr('disabled');
             });
         }
     });
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
}

//Get the list of Securable types
function GetListOfSecurablesTypeForPermissions() {
    $.post(urls.Security.GetListOfSecurablesType, function (data) {
        if (data.errortype == 's') {
            var securablesJson = $.parseJSON(data.jsonObject);

            $('#lstSecurableTypesForPermissions').empty();
            $.each(securablesJson, function (i, item) {
                $('#lstSecurableTypesForPermissions').append("<option value='" + item.SecureObjectID + "'>" + item.Name + "</option>");
            });

            $('#lstSecurableTypesForPermissions').val($('#lstSecurableTypesForPermissions option:first').val()).trigger('change');
        }
    });
}
//Get the list of Securable objects based on securable type.
function GetListOfPermissionObjects(securableTypeID) {
    $.post(urls.Security.GetListOfSecurableObjForPermissions, $.param({ pSecurableTypeID: securableTypeID }, true), function (data) {
        if (data.errortype == 's') {
            var securablesObjJson = $.parseJSON(data.jsonObject);

            $('#lstSecurablesForPermissions').empty();
            $.each(securablesObjJson, function (i, item) {
                if (securableTypeID != 3) {
                    $('#lstSecurablesForPermissions').append("<option value='" + item.SecureObjectID + "'>" + item.Name + "</option>");
                }
                else if (securableTypeID == 3) {
                    $('#lstSecurablesForPermissions').append("<option value='" + item.SecureObjectID + "'>" + item.ParentName + " > " + item.Name + "</option>");
                }
            });
            $('#lstSecurablesForPermissions').val($('#lstSecurablesForPermissions option:first').val()).trigger('change');

            //Disable both Copy and Apply buttons.
            $('#chkSelectAllForPermissions').prop('checked', false);
            $('#btnSavePermission').attr('disabled', 'disabled');
            $('#btnCopy').attr('disabled', 'disabled');
        }
    });
}

//Get the list of groups.
function GetPermissionGroupsList() {
    $.ajax({
        url: urls.Security.GetPermisionsGroupList,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: false,
        processData: false,
        cache: false,
        success: function (data) {
            var permissionsObjJson = $.parseJSON(data.jsonObject);

            $('#lstGroups').empty();
            $.each(permissionsObjJson, function (i, item) {
                $('#lstGroups').append("<option value='" + item.GroupID + "'>" + item.GroupName + "</option>");
            });
            $('#lstGroups').val($('#lstGroups option:first').val());
        },
        error: function (xhr, status, error) {
            //console.log("Error: " + error);
            ShowErrorMessge();
        }
    });
}

//Get the permission data for Securable Object.
function GetPermissionsBasedOnGroupId(groupID, securableObjID) {
    $.post(urls.Security.GetPermissionsBasedOnGroupId, $.param({ pGroupID: groupID, pSecurableObjID: securableObjID }, true), function (data) {
        if (data.errortype == 's') {
            var permissionObj = $.parseJSON(data.jsonObject);
            var htmlData = "";
            var childArrayLen = 0;
            var childArray = new Array();
            var checkedEles = [];
            var selectedSecurableTypeForPermissions = $('#lstSecurableTypesForPermissions :selected').text().trim();

            $('#ulForPermissions').empty();
            $.each(permissionObj, function (i, item) {
                childArrayLen = item.Children.split(",").length;
                if (item.checked)
                    checkedEles.push(item.PermissionID);

                if (item.Description != '' && selectedSecurableTypeForPermissions != 'Application' && selectedSecurableTypeForPermissions != 'Retention' && selectedSecurableTypeForPermissions != 'Workgroups' && selectedSecurableTypeForPermissions != 'Scan Rules') {
                    if (childArrayLen > 1) {
                        childArray = item.Children.split(",");
                        htmlData = htmlData + "<input type='hidden' id=" + item.PermissionID + "_children value=" + childArray.toString() + ">";
                        htmlData = htmlData + "<li class='checkbox-cus'><input type='checkbox' id=" + item.PermissionID + " class='Permissions_2' onclick='OperateChildPermissions(this,\"" + item.Children + "\")'><label class='checkbox-inline' for=" + item.PermissionID + " > " + item.Permission + " &nbsp;<i class='fa fa-caret-right'></i>&nbsp;" + item.Description + "</label></li>";
                        htmlData = htmlData + "<ul style='list-style-type:none;'>";
                        return true;
                    }

                    if (item.Indent) {
                        htmlData = htmlData + "<li class='checkbox-cus'><input type='checkbox' id=" + item.PermissionID + " class='Permissions_2'><label class='checkbox-inline' for=" + item.PermissionID + " > " + item.Permission + " &nbsp;<i class='fa fa-caret-right'></i>&nbsp;" + item.Description + "</label></li>";
                        return true;
                    }
                    else {
                        htmlData = htmlData + "</ul>";
                        if (item.PermissionID == 1 && (selectedSecurableTypeForPermissions == 'Tables' || selectedSecurableTypeForPermissions == 'Volumes' || selectedSecurableTypeForPermissions == 'Output Settings'))
                            htmlData = htmlData + "<li class='checkbox-cus'><input type='checkbox' id=" + item.PermissionID + " class='Permissions_2'><label class='checkbox-inline' for=" + item.PermissionID + " > " + item.Permission + " &nbsp;<i class='fa fa-caret-right'></i>&nbsp;" + item.Description + " " + $('#lstSecurablesForPermissions :selected').text() + "</label></li>";
                        else
                            htmlData = htmlData + "<li class='checkbox-cus'><input type='checkbox' id=" + item.PermissionID + " class='Permissions_2'><label class='checkbox-inline' for=" + item.PermissionID + " > " + item.Permission + " &nbsp;<i class='fa fa-caret-right'></i>&nbsp;" + item.Description + "</label></li>";
                    }
                }
                else if (item.Description != '' && (selectedSecurableTypeForPermissions == 'Application' || selectedSecurableTypeForPermissions != 'Retention' || selectedSecurableTypeForPermissions != 'Workgroups') || selectedSecurableTypeForPermissions == 'Scan Rules') {
                    htmlData = htmlData + "<li class='checkbox-cus'><input type='checkbox' id=" + item.PermissionID + " class='Permissions_2'><label class='checkbox-inline' for=" + item.PermissionID + " > " + item.Permission + " &nbsp;<i class='fa fa-caret-right'></i>&nbsp;" + item.Description + " " + $('#lstSecurablesForPermissions :selected').text() + "</label></li>";
                }
                return true;
            });

            $('#ulForPermissions').append(htmlData);

            $('.Permissions_2').each(function () {
                if ($.inArray(parseInt($(this).attr('id')), checkedEles) !== -1) {
                    if ($('#' + $(this).attr('id') + '_children').length > 0) {
                        $('#' + $(this).attr('id')).prop('checked', true);
                        OperateChildPermissions(this, $('#' + $(this).attr('id') + '_children').val());
                    }
                    else
                        $('#' + $(this).attr('id')).prop('checked', true);
                }
                else {
                    if ($('#' + $(this).attr('id') + '_children').length > 0) {
                        $('#' + $(this).attr('id')).prop('checked', false);
                        OperateChildPermissions(this, $('#' + $(this).attr('id') + '_children').val());
                    }
                    else
                        $('#' + $(this).attr('id')).prop('checked', false);
                }
            });

            $('.Permissions_2').on('change', function () {
                $('#btnCopy').attr('disabled', 'disabled');
                $('#btnSavePermission').removeAttr('disabled');
            });

            $('#chkSelectAllForPermissions').prop('checked', false);
            $('#btnCopy').removeAttr('disabled');
            $('#btnSavePermission').attr('disabled', 'disabled');
        }
    });
}

//Set the permissions for Securable object.
function SetGroupPermissions() {

    var vPermisionIds = new Array();
    $(".Permissions_2").each(function () {
        if ($('#' + $(this).attr('id')).is(':checked')) {
            vPermisionIds.push($(this).attr('id'));
        }
    });

    $.post(urls.Security.SetGroupPermissions, $.param({ pGroupIds: $('#lstGroups').val(), pSecurableObjIds: $('#lstSecurablesForPermissions').val(), pPermisionIds: vPermisionIds }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        if (data.errortype == 's') {
            $('#btnCopy').removeAttr('disabled');
            $('#btnSavePermission').attr('disabled', 'disabled');
        }
    });
}

//Enable/Disable child elements based on Parent.
//function OperateChildPermissions(eleID, childArrayStr) {
//    console.log("Inside OperateChildPermissions...");
//    var childArray = new Array();
//    childArray = childArrayStr.split(",");

//    if ($(eleID).is(':checked')) {
//        console.log("Inside OperateChildPermissions...mannnn");
//        $.each(childArray, function (index, value) {
//            $('#' + value).prop('checked', false);
//            $('#' + value).removeAttr('disabled');
//        });
//    }
//    else {
//        console.log("inside else part man...");
//        $.each(childArray, function (index, value) {
//            $('#' + value).prop('checked', false);
//            $('#' + value).attr('disabled', 'disabled');
//        });
//    }
//}