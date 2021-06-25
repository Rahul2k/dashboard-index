function LoadSecurablesTabData() {
    $.ajax({
        url: urls.Security.LoadSecuritySecurablesTab,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html'
    }).done(function (result) {
     $('#LoadTabContent').empty();
     $('#LoadTabContent').html(result);

     GetListOfSecurablesType();

     $('#btnCopyPermissions').attr('disabled', 'disabled');
     $('#btnSaveSecurables').attr('disabled', 'disabled');
     $('#lblPermissionPasteInfo').css('display', 'none');

     //Get the list of Securable object list.
     $('#lstSecurableTypes').on('change', function () {
         $('#ulPermissions').empty();
         GetListOfSecurableObjects($('#lstSecurableTypes').val());
     });

     $('#lstSecurables').on('change', function () {
         if ($('#btnCopyPermissions').text() != vrCommonRes["Paste"])
             GetPermissionsForSecurableObject($(this).val());
         else if ($('#btnCopyPermissions').text() == vrCommonRes["Paste"]) {
             $('#btnCopyPermissions').removeAttr('disabled');
             $('#btnSaveSecurables').removeAttr('disabled');
         }
         else {
             $('#btnCopyPermissions').removeAttr('disabled');
             $('#btnSaveSecurables').attr('disabled', 'disabled');
         }
     });

     $('#chkSelectAll').on('change', function () {
         if ($(this).is(':checked')) {
             $(".Permissions").each(function () {
                 if ($('#' + $(this).attr('id') + '_children').length > 0) {
                     //Check if parent chk, if not chked then fire event
                     if (($('#' + $(this).attr('id')).is(':checked') != true)) {
                         $('#' + $(this).attr('id')).trigger('click');
                     }
                 }
                 if ($(this).is(':checked') == false) {
                     $(this).attr('checked', true);
                     $(this).removeAttr('disabled');

                     $('#btnCopyPermissions').attr('disabled', 'disabled');
                     $('#btnSaveSecurables').removeAttr('disabled');
                 }
             });
         }
         else if ($(this).is(':checked') == false) {
             $(".Permissions").each(function () {
                 if ($('#' + $(this).attr('id') + '_children').length > 0)
                     $('#' + $(this).attr('id')).trigger('click');

                 if ($(this).is(':checked')) {
                     $(this).attr('checked', false);

                     $('#btnCopyPermissions').attr('disabled', 'disabled');
                     $('#btnSaveSecurables').removeAttr('disabled');
                 }
             });
         }
     });

     //Copy and Paste the permissions.
     $('#btnCopyPermissions').on('click', function () {
         if ($('#btnCopyPermissions').text().trim() == vrSecurityRes['lblSPPartialCopy']) {
             $('#lstSecurableTypes').attr('disabled', 'disabled');
             $("#btnCopyPermissions").html(vrCommonRes['Paste']);
             $("#btnSaveSecurables").html(vrCommonRes['Cancel']);
             $('#btnSaveSecurables').removeAttr('disabled');
             $('#lstSecurables').attr('multiple', 'multiple');
             $('#chkSelectAll').attr('disabled', 'disabled');
             $('#lblPermissionPasteInfo').css('display', 'block');

             //Disabled all the checkboxes from Permissions.
             $('.Permissions').each(function () {
                 $('#' + $(this).attr('id')).attr('disabled', 'disabled');
             });
         }
         else if ($('#btnCopyPermissions').text() == vrCommonRes['Paste']) {
             if ($('#lstSecurables option:selected').length > 0) {
                 SetPermissionsToSecurableObject();

                 $('#lstSecurableTypes').removeAttr('disabled');
                 $("#btnCopyPermissions").html(vrSecurityRes['lblSPPartialCopy']);
                 $("#btnSaveSecurables").html(vrCommonRes['Apply']);
                 $('#btnSaveSecurables').attr('disabled', 'disabled');
                 $('#lstSecurables').removeAttr('multiple');
                 $('#chkSelectAll').removeAttr('disabled');
                 $('#lblPermissionPasteInfo').css('display', 'none');
                 //Remove all the disabled checkboxes from Permissions.
                 $('.Permissions').each(function () {
                     $('#' + $(this).attr('id')).removeAttr('disabled');
                 });
             }
             else {
                 showAjaxReturnMessage(vrSecurityRes['msgJsSTSSelect1SecurableObj'], 'w');
             }
         }
     });

     //APPLY/Save the Permissions.
     $('#btnSaveSecurables').on('click', function () {
         if ($("#btnSaveSecurables").text().trim() == vrCommonRes['Apply']) {
             SetPermissionsToSecurableObject();
         }
         else if ($("#btnSaveSecurables").text() == vrCommonRes['Cancel']) {
             $('#lstSecurables').prop('selectedIndex', -1);
             $('#ulPermissions').empty();
             $('#lstSecurableTypes').removeAttr('disabled');
             $('#lstSecurables').removeAttr('multiple');
             $("#btnCopyPermissions").html(vrSecurityRes['lblSPPartialCopy']);
             $("#btnSaveSecurables").html(vrCommonRes['Apply']);
             $('#chkSelectAll').removeAttr('disabled');
             $('#btnSaveSecurables').attr('disabled', 'disabled');
             $('#btnCopyPermissions').attr('disabled', 'disabled');
             $('#lblPermissionPasteInfo').css('display', 'none');

             //Disabled all the checkboxes from Permissions.
             $('.Permissions').each(function () {
                 $('#' + $(this).attr('id')).removeAttr('disabled');
             });
         }
         $('#chkSelectAll').prop('checked', false);
     });

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
function GetListOfSecurablesType() {
    $.post(urls.Security.GetListOfSecurablesType, function (data) {
        if (data.errortype == 's') {
            var securablesJson = $.parseJSON(data.jsonObject);

            $('#lstSecurableTypes').empty();
            $.each(securablesJson, function (i, item) {
                $('#lstSecurableTypes').append("<option value='" + item.SecureObjectID + "'>" + item.Name + "</option>");
            });

            $('#lstSecurableTypes').val($('#lstSecurableTypes option:first').val()).trigger('change');
        }
    });
}
//Get the list of Securable objects based on securable type.
function GetListOfSecurableObjects(securableTypeID) {
    $.post(urls.Security.GetListOfSecurableObjects, $.param({ pSecurableTypeID: securableTypeID }, true), function (data) {
        if (data.errortype == 's') {
            var securablesObjJson = $.parseJSON(data.jsonObject);

            $('#lstSecurables').empty();
            $.each(securablesObjJson, function (i, item) {

                if (item.Name == 'My Queries') {
                    $('#lstSecurables').append("<option value='" + item.SecureObjectID + "'>" + item.Name + " (" + vrSecurityRes['txtJSMyQueryInfoMsg'] + ")</option>");
                }
                else if (item.Name == 'My Favorites') {
                    $('#lstSecurables').append("<option value='" + item.SecureObjectID + "'>" + item.Name + " (" + vrSecurityRes['txtJSMyFavInfoMsg'] + ")</option>");
                }
                else if (securableTypeID != 3) {
                    $('#lstSecurables').append("<option value='" + item.SecureObjectID + "'>" + item.Name + "</option>");
                }
                else if (securableTypeID == 3) {
                    $('#lstSecurables').append("<option value='" + item.SecureObjectID + "'>" + item.ParentName + " > " + item.Name + "</option>");
                }
            });
            $('#lstSecurables').val($('#lstSecurables option:first').val()).trigger('change');

            //Disable both Copy and Apply buttons.
            $('#chkSelectAll').prop('checked', false);
            $('#btnSaveSecurables').attr('disabled', 'disabled');
            $('#btnCopyPermissions').attr('disabled', 'disabled');
        }
    });
}

//Get the permission data for Securable Object.
function GetPermissionsForSecurableObject(securableObjID) {
    $.post(urls.Security.GetPermissionsForSecurableObject, $.param({ pSecurableObjID: securableObjID }, true), function (data) {
        if (data.errortype == 's') {
            var permissionObj = $.parseJSON(data.jsonObject);
            var htmlData = "";
            var childArrayLen = 0;
            var childArray = new Array();
            var checkedEles = [];
            var selectedSecurableType = $('#lstSecurableTypes :selected').text().trim();

            $('#ulPermissions').empty();
            $.each(permissionObj, function (i, item) {
                childArrayLen = item.Children.split(",").length;
                if (item.checked)
                    checkedEles.push(item.PermissionID);

                if (item.Description != '' && selectedSecurableType != 'Application' && selectedSecurableType != 'Retention' && selectedSecurableType != 'Workgroups' && selectedSecurableType != 'Scan Rules') {
                    if (childArrayLen > 1) {
                        childArray = item.Children.split(",");
                        htmlData = htmlData + "<input type='hidden' id=" + item.PermissionID + "_children value=" + childArray.toString() + ">";
                        htmlData = htmlData + "<li class='checkbox-cus'><input type='checkbox' id=" + item.PermissionID + " class='Permissions' onclick='OperateChildPermissions(this,\"" + item.Children + "\")'> <label class='checkbox-inline' for=" + item.PermissionID + "> " + item.Permission + " &nbsp;<i class='fa fa-caret-right'></i>&nbsp;" + item.Description + "</label></li>";
                        htmlData = htmlData + "<ul style='list-style-type:none;'>";
                        return true;
                    }

                    if (item.Indent) {
                        htmlData = htmlData + "<li class='checkbox-cus'><input type='checkbox' id=" + item.PermissionID + " class='Permissions'><label class='checkbox-inline' for=" + item.PermissionID + "> " + item.Permission + " &nbsp;<i class='fa fa-caret-right'></i>&nbsp;" + item.Description + "</label></li>";
                        return true;
                    }
                    else {
                        htmlData = htmlData + "</ul>";
                        if (item.PermissionID == 1 && (selectedSecurableType == 'Tables' || selectedSecurableType == 'Volumes' || selectedSecurableType == 'Output Settings'))
                            htmlData = htmlData + "<li class='checkbox-cus'><input type='checkbox' id=" + item.PermissionID + " class='Permissions'><label class='checkbox-inline' for=" + item.PermissionID + "> " + item.Permission + " &nbsp;<i class='fa fa-caret-right'></i>&nbsp;" + item.Description + " " + $('#lstSecurables :selected').text() + "</label></li>";
                        else
                            htmlData = htmlData + "<li class='checkbox-cus'><input type='checkbox' id=" + item.PermissionID + " class='Permissions'><label class='checkbox-inline' for=" + item.PermissionID + "> " + item.Permission + " &nbsp;<i class='fa fa-caret-right'></i>&nbsp;" + item.Description + "</label></li>";
                    }
                }
                else if (item.Description != '' && (selectedSecurableType == 'Application' || selectedSecurableType != 'Retention' || selectedSecurableType != 'Workgroups') || selectedSecurableType == 'Scan Rules') {

                    var arrSplitTexts = $('#lstSecurables :selected').text().split("(");

                    if (arrSplitTexts[0].trim() == "My Queries" || arrSplitTexts[0].trim() == "My Favorites")
                        htmlData = htmlData + "<li class='checkbox-cus'><input type='checkbox' id=" + item.PermissionID + " class='Permissions'><label class='checkbox-inline' for=" + item.PermissionID + "> " + item.Permission + " &nbsp;<i class='fa fa-caret-right'></i>&nbsp;" + item.Description + " " + arrSplitTexts[0] + " <span style='color:red'>(" + arrSplitTexts[1] + "</span></label></li>";
                    else
                        htmlData = htmlData + "<li class='checkbox-cus'><input type='checkbox' id=" + item.PermissionID + " class='Permissions'><label class='checkbox-inline' for=" + item.PermissionID + "> " + item.Permission + " &nbsp;<i class='fa fa-caret-right'></i>&nbsp;" + item.Description + " " + $('#lstSecurables :selected').text() + "</label></li>";


                }
                return true;
            });

            $('#ulPermissions').append(htmlData);

            $('.Permissions').each(function () {
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

            $('.Permissions').on('change', function () {
                $('#btnCopyPermissions').attr('disabled', 'disabled');
                $('#btnSaveSecurables').removeAttr('disabled');
            });

            $('#btnCopyPermissions').removeAttr('disabled');
            $('#btnSaveSecurables').attr('disabled', 'disabled');
        }
    });
}

//Set the permissions for Securable object.
function SetPermissionsToSecurableObject() {
    var vPermisionIds = new Array();
    var vPermissionRvmed = new Array();

    $(".Permissions").each(function () {
        if ($('#' + $(this).attr('id')).is(':checked')) {
            vPermisionIds.push($(this).attr('id'));
        }
        else if (!$('#' + $(this).attr('id')).is(':checked')) {
            vPermissionRvmed.push($(this).attr('id'));
        }
    });
    //console.log("Permission removed are: " + vPermissionRvmed);
    $.post(urls.Security.SetPermissionsToSecurableObject, $.param({ pSecurableObjIds: $('#lstSecurables').val(), pPermisionIds: vPermisionIds, pPermissionRvmed: vPermissionRvmed }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        if (data.errortype == 's') {
            $('#btnCopyPermissions').removeAttr('disabled');
            $('#btnSaveSecurables').attr('disabled', 'disabled');
        }
    });
}

//Enable/Disable child elements based on Parent.
function OperateChildPermissions(eleID, childArrayStr) {
    var childArray = new Array();
    childArray = childArrayStr.split(",");

    if ($(eleID).is(':checked')) {
        $.each(childArray, function (index, value) {
            $('#' + value).prop('checked', false);
            $('#' + value).removeAttr('disabled');
        });
    }
    else {
        $.each(childArray, function (index, value) {
            $('#' + value).prop('checked', false);
            $('#' + value).attr('disabled', 'disabled');
        });
    }
}