$(function () {   
    $('#divVolumesGrid').hide();
    $('#divVolumesButtons').hide();
    $('#divDriveGrid').show();
    $('#divDriveButtons').show();

    $("#grdDrive").gridLoad(urls.Directories.GetSystemAddressList, vrDirectoriesRes["tiJsDirectoriesList"]);
    //$("#grdDrive").jqGrid('sortableRows');

    //Add Popup open
    $("#gridAdd").click(function () {
        LoadDrivePartial('a', null);
    });
    //Add Popup open

    // Edit Grid Record
    $("#gridEdit").click(function () {
        var selectedrows = $("#grdDrive").getSelectedRowsIds();
        if (selectedrows.length > 1 || selectedrows.length == 0) {
            showAjaxReturnMessage(vrDirectoriesRes["msgJsDirectoriesSelect1Row"], 'w');
            return;
        }
        else {

            if (selectedrows.length == 1)
                LoadDrivePartial('e', selectedrows);
        }
    });

    // Edit Grid Record

    $("#gridDelete").on('click', function (e) {
        var selectedrows = $("#grdDrive").getSelectedRowsIds();
        if (selectedrows.length > 1 || selectedrows.length == 0) {
            showAjaxReturnMessage(vrDirectoriesRes["msgJsDirectoriesSelect1Row"], 'w');
            return;
        }
        $(this).confirmModal({
            confirmTitle: vrCommonRes['msgJsDelConfim'],
            confirmMessage: vrDirectoriesRes['msgJsDirectoriesSure2RemoveRec'],
            confirmOk: vrCommonRes['Yes'],
            confirmCancel: vrCommonRes['No'],
            confirmStyle: 'default',
            confirmCallback: DeleteSystemAddress
        });
    });

    //Volumes

    //Populate volume gridview based on drive selection 
    $("#gridUpDown").on('click', function (e) {
        
        if ($(this).val() != vrDirectoriesRes['btnJsDirectoriesUp1Lvl']) {
            var selectedrows = $("#grdDrive").getSelectedRowsIds();
            if (selectedrows.length > 1 || selectedrows.length == 0) {
                showAjaxReturnMessage(vrDirectoriesRes["msgJsDirectoriesSelect1Row"], 'w');
                return;
            }
            var myGrid = $("#grdDrive"),
            selRowId = myGrid.jqGrid('getGridParam', 'selrow'),
            celValue = myGrid.jqGrid('getCell', selRowId, 'DeviceName');
            if (celValue != undefined && celValue != "")
            {
                $('#navigation').text('\''+vrDirectoriesRes['mnuJsDirectoriestxt']+'\'');
                $('#navigation').closest('ol').append('<li class="active custome">' + celValue + '</li>');
            }

            $('#SystemAddressesId1').val(selectedrows);
            $('#divVolumesGrid').show();
            $('#divVolumesButtons').show();
            $('#divDriveGrid').hide();
            $('#divDriveButtons').hide();
            $(this).val(vrDirectoriesRes['btnJsDirectoriesUp1Lvl']);            
            $("#grdVolumes").jqGrid('GridUnload');
            //$("#grdVolumes").hideCol("Online");
            $("#grdVolumes").gridLoad(urls.Directories.GetVolumesList + "?pId=" + selectedrows, vrDirectoriesRes['tiJsDirectoriesValumnsList']);            
        }
        else {
            $('#divVolumesGrid').hide();
            $('#divVolumesButtons').hide();
            $('#divDriveGrid').show();
            $('#divDriveButtons').show();
            $('#SystemAddressesId1').val(0);
            $('#navigation').text('\'' + vrDirectoriesRes['mnuJsDirectoriestxt'] + '\'');
            $('#navigation').closest('ol').find('.custome').remove();
            $(this).val(vrDirectoriesRes['btnDirectoriesPartialDown1Lvl']);
        }
        
    });

    //Populate volume gridview based on drive selection 

    //Add Popup open
    $("#gridVolumesAdd").click(function () {
        //$("#grdDrive").refreshJqGrid();
        LoadVolumePartial('a', null);
    });
    //Add Popup open

    // Edit Grid Record

    $("#gridVolumesEdit").click(function () {

        //$('#AddEditVolumeDialog').load(urls.Directories.LoadVolumeView, function () {

        var selectedrows = $("#grdVolumes").getSelectedRowsIds();
        if (selectedrows.length > 1 || selectedrows.length == 0) {
            showAjaxReturnMessage(vrDirectoriesRes['msgJsDirectoriesSelect1Row'], 'w');
            return;
        }
        else {
            if (selectedrows.length == 1)
                LoadVolumePartial('e', selectedrows);
        }

        //});

    });

    // Edit Grid Record

    $("#gridVolumesDelete").on('click', function (e) {
        var selectedrows = $("#grdVolumes").getSelectedRowsIds();
        if (selectedrows.length > 1 || selectedrows.length == 0) {
            showAjaxReturnMessage(vrDirectoriesRes['msgJsDirectoriesSelect1Row'], 'w');
            return;
        }
        $(this).confirmModal({
            confirmTitle: vrCommonRes['msgJsDelConfim'],
            confirmMessage: vrDirectoriesRes['msgJsDirectoriesSure2RemoveRow'],
            confirmOk: vrCommonRes[' Yes'],
            confirmCancel: vrCommonRes['No'],
            confirmStyle: 'default',
            confirmCallback: DeleteVolumesEntity
        });
    });
    //Volumes

    jQuery.validator.addMethod('atleaseOneAlpha', function (value, element) { 
        return this.optional(element) || (value.match(/[a-zA-Z]/));
    });
});

function LoadDrivePartial(opType, selectedrows) {
    $('#AddEditVolumeDialog').empty();
    $('#AddEditVolumeDialog').load(urls.Directories.LoadDriveView, function () {
        $('#frmDriveDetails').resetControls();

        $("#PhysicalDriveLetter").OnlyCharectorAndColon();
        $('#mdlDriveDetails').ShowModel();
        $('#frmDriveDetails').validate({
            rules: {
                DeviceName: { required: true, atleaseOneAlpha: true },
                "PhysicalDriveLetter": "ValidateDriveLetterWithUNC"
            },
            ignore: ":hidden:not(select)",
            messages: {
                DeviceName:
                    {
                        required: "",
                        atleaseOneAlpha: vrDirectoriesRes['msgJsDirectories1AlfaCharVal']
                    },
                PhysicalDriveLetter:
                    {
                        required: ""
                    },
                PhysicalDriveLetter:
                    {
                        required: ""
                    }
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
        
        $.validator.addMethod('ValidateDriveLetterWithUNC', function (value, element) {
            var ErrorMsg = vrDirectoriesRes['msgJsDirectoriesValidDrvWithUNC'];
            var IsError = true;
            if (value.length != 2) {
                $.validator.messages.myvalidator = String.format(vrDirectoriesRes["msgJsDirectoriesNotValidDriveEmpty"], value.toUpperCase());
                //$.validator.messages.myvalidator = '"' + value.toUpperCase() + " " + vrDirectoriesRes["msgJsDirectoriesNotValidDriveEmpty"];
                IsError = false;
            }
            if (value.charAt(1) != ':') {
                $.validator.messages.myvalidator = String.format(vrDirectoriesRes["msgJsDirectoriesNotValidUNC"], value.toUpperCase());
                //$.validator.messages.myvalidator = '"' + value.toUpperCase() +" "+ vrDirectoriesRes["msgJsDirectoriesNotValidUNC"];
                IsError = false;
            }
            return IsError;
        }, function (ErrorMsg, element) {
            return $.validator.messages.myvalidator;
        });

        // Add/Edit validation

        //Add/Edit Submit
        $("#btnSaveDrive").on('click', function (e) {
            var $form = $('#frmDriveDetails');
            if ($form.valid()) {
                var serializedForm = $form.serialize();
                $.post(urls.Directories.SetSystemAddressDetails, serializedForm)
                    .done(function (response) {
                        showAjaxReturnMessage(response.message, response.errortype);
                        if (response.errortype == 's') {
                            $("#grdDrive").refreshJqGrid();
                            //$('#mdlDriveDetails').modal('hide');
                            $('#mdlDriveDetails').HideModel();
                        }
                    })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });
            }
        });
        //Add/Edit Submit

        if (opType == 'e') {
            $.post(urls.Directories.EditSystemAddress, $.param({ pRowSelected: selectedrows }, true), function (data) {
                if (data) {
                    var result = $.parseJSON(data);
                    $("#Id").val(result.Id);
                    $("#DeviceName").val(result.DeviceName);
                    $("#PhysicalDriveLetter").val(result.PhysicalDriveLetter);
                }
            });
        }
    });

    return true;
}

function LoadVolumePartial(opType, selectedrows) {
    
    $('#AddEditVolumeDialog').empty();
    $('#AddEditVolumeDialog').load(urls.Directories.LoadVolumeView, function () {

        $('#PathName').bind('copy paste cut', function (e) {
            e.preventDefault(); //disable cut,copy,paste
            showAjaxReturnMessage(vrDirectoriesRes["msgJsDirectoriesCutCopyPasteDisabled"], 'w'); 
        });

        $('#frmVolumesDetails').resetControls();
        $('#SystemAddressesId').val('0');
        $('#Id').val('0');
        $('#ViewGroup').val('0');
        $("#DirDiskMBLimitation").val('0');
        $("#DirCountLimitation").val('0');
        $("#DirDiskMBLimitation").OnlyNumeric();
        $("#DirCountLimitation").OnlyNumeric();
        $("#Active").attr('checked', true);
        //$("#Online").attr('checked', true);
        //$("#PathName").OnlyCharectorAndForwardSlace();
        //var specialChars = ' ;><:?/|*"';
        $("#PathName").SomeCharacterNotAllowed(specialChar.VolumeSpecialChar);

        $('#SystemAddressesId').val($('#SystemAddressesId1').val());
        $('#mdlVolumeDetails').ShowModel();

        // Add/Edit validation
        $('#frmVolumesDetails').validate({
            rules: {
                Name: {
                    required: true,
                    minlength: 3,
                    atleaseOneAlpha: true
                },
                PathName: { required: true, atleaseOneAlpha: true }
            },
            ignore: ":hidden:not(select)",
            messages: {
                Name: {
                    required: "",
                    minlength: vrDirectoriesRes["msgJsDirectoriesNameLessThen3Char"],
                    atleaseOneAlpha: vrDirectoriesRes["msgJsDirectoriesAtList1Alpha"]
                },
                PathName:
                    {
                        required: "",
                        atleaseOneAlpha: vrDirectoriesRes["msgJsDirectoriesplzEnterValidUNC"]
                    }
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

        //Add/Edit Submit

        $("#btnSaveVolumes").on('click', function (e) {
            var $form = $('#frmVolumesDetails');
            if ($form.valid()) {
                var serializedForm = $form.serialize() + "&pActive=" + $("#Active").is(':checked');
                $.post(urls.Directories.SetVolumeDetails, serializedForm)
                    .done(function (response) {
                        showAjaxReturnMessage(response.message, response.errortype);
                        if (response.errortype == 's') {
                            $("#grdVolumes").refreshJqGrid();
                            //$('#mdlVolumeDetails').modal('hide');
                            $('#mdlVolumeDetails').HideModel();
                        }
                    })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });
            }
        });


        if (opType == 'e') {
            $.post(urls.Directories.EditVolumeDetails, $.param({ pRowSelected: selectedrows }, true), function (data) {
                if (data) {
                    var result = $.parseJSON(data);
                    $("#Id").val(result.Id);
                    $("#SystemAddressesId").val(result.SystemAddressesId);
                    $("#Name").val(result.Name);
                    $("#PathName").val(result.PathName);
                    $("#DirDiskMBLimitation").val(result.DirDiskMBLimitation);
                    $("#DirCountLimitation").val(result.DirCountLimitation);
                    $("#Active").attr('checked', result.Active);
                    //$("#Online").attr('checked', result.Online);
                    //$("#Active").prop('checked', result.Active);
                    //$("#Online").prop('checked', result.Online);
                    $("#ViewGroup").val(result.ViewGroup);
                    //$("#OfflineLocation").val(result.OfflineLocation);
                    $("#ImageTableName").val(result.ImageTableName);
                }
            });
        }
        //Add/Edit Submit
    });
}

function DeleteSystemAddress() {
    var selectedrows = $("#grdDrive").getSelectedRowsIds();
    $.post(urls.Directories.DeleteSystemAddress, $.param({ pRowSelected: selectedrows }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        if (data.errortype == 's') {
            $("#grdDrive").refreshJqGrid();
        }
    });
}

function DeleteVolumesEntity() {
    var selectedrows = $("#grdVolumes").getSelectedRowsIds();
    $.post(urls.Directories.DeleteVolumesEntity, $.param({ pRowSelected: selectedrows }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        if (data.errortype == 's') {
            $("#grdVolumes").refreshJqGrid();
        }
    });
}