$(function () {
    //This will update connection names to selection list.
    $(document).ready(function () {
        UpdateList();
    });
    //On Click method for 'Edit'. This will load modal and fill up the details of selected item from list.
    $('#btnEditDB').on('click', function () {
        element = document.getElementById("lstExtDB");
        selected_index = element.selectedIndex;
        if (selected_index != -1) {
            AddDBToList();
            $('#frmAddNewDb').resetControls();
            $('#myModalLabelAdd').empty();
            $('#myModalLabelAdd').append(String.format(vrDatabaseRes["lblEditDatabasePartial"]));
            $('#mdlAddDatabase').ShowModel();
            var dbName = $('#lstExtDB').val();
            SetSelectedData(dbName);
        } else {
            showAjaxReturnMessage(vrDatabaseRes['msgJsExternalDBSelect1Row'], 'w');
        }
    });

    //On click event for 'Disconnect'. This method is used for disconnecting selected external database.
    $('#btnRemoveDB').on('click', function () {
        element = document.getElementById("lstExtDB");
        selected_index = element.selectedIndex;
        if (selected_index != -1) {
            var connName = $('#lstExtDB').val();
            $.post(urls.ExternalDB.DisconnectDBCheck, { connName: connName })
                .done(function (response) {
                    if (response.errortype == "s") {
                        $(this).confirmModal({
                            confirmTitle: 'TAB FusionRMS',
                            confirmMessage:String.format(vrDatabaseRes['msgJsExternalDBSure2Disconnect'],connName),
                            confirmOk: vrCommonRes['Yes'],
                            confirmCancel: vrCommonRes['No'],
                            confirmStyle: 'default',
                            confirmCallback: DisconnectConnection,
                            confirmObject: connName
                        });
                    } else {
                        showAjaxReturnMessage(response.message, response.errortype);
                    }
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
        } else {
            showAjaxReturnMessage(vrDatabaseRes['msgJsExternalDBSelect1Row'], 'w');
        }
    });

    //On click event for 'Add'. This method is used for adding new external database.
    $('#btnAddDB').on('click', function (e) {
        //$('#AddEditDBDialog').empty();
        //$('#AddEditDBDialog').load(urls.ExternalDB.LoadAddDBView, function () {
        $('#frmAddNewDb').resetControls();
        $('#myModalLabelAdd').empty();
        $('#myModalLabelAdd').append("Add New Database");
        $('#DBDatabase').empty();
        $('#myModalLabelAdd').empty();
        $('#myModalLabelAdd').append(String.format(vrDatabaseRes["lblAddNewDatabasePartialAND"]));
            $('#mdlAddDatabase').ShowModel();
            $('#txtConTimeOut').val("10");
            AddDBToList();    
    });
    $("#txtConTimeOut").OnlyNumeric();
    $("select#DBServer").change(function () {
        var serverName = $(this).val();
        if (serverName) {
            $("select#DBDatabase").val(serverName);
            setDBField(serverName, "");
        }
        $('#txtUserID').val('');
        $('#txtPwd').val('');
        $('#DBDatabase').empty();
    });

    $('#txtUserID').change(function () {
        if ($('#mdlAddDatabase').hasClass('in')) {
            var name = $("select#DBServer").val();
            setDBField(name, "");
        }
    });

    $('#txtPwd').change(function () {
        if ($('#mdlAddDatabase').hasClass('in')) {
            var names = $("select#DBServer").val();
            setDBField(names, "");
        }
    });

    $('#btnSaveDB').on('click', function (e) {
        EditConnection();
    });

    $('#btnCancelDB').on('click', function (e) {
        var $form = $('#frmAddNewDb');
        if ($form.valid()) {
            var serializedForm = $form.serialize();
            $.post(urls.ExternalDB.CheckIfDateChanged, serializedForm)
                .done(function (response) {
                    if (response == "True") {
                        $(this).confirmModal({
                            confirmTitle: 'TAB FusionRMS',
                            confirmMessage: vrDatabaseRes['msgJsExternalDBConnModifiedWant2Change'],
                            confirmOk: vrCommonRes['Yes'],
                            confirmCancel: vrCommonRes['No'],
                            confirmStyle: 'default',
                            confirmCallback: EditConnection
                        });
                    } else {
                        $("#mdlAddDatabase").HideModel();
                    }
                })
                .fail(function (xhr, status, error) {

                });
        } else {
            $("#mdlAddDatabase").HideModel();
        }
    });
    
    $('#frmAddNewDb').validate({
        rules: {
            DBName: { required: true,maxlength:50 },
            DBServer: { required: true },
            "DBDatabase": "ValidateDBDatabase",
            DBConnectionTimeout: { required: true, min: 0, max: 2147483647 }
        },
        ignore: ":hidden:not(select)",
        messages: {
            DBName: {
                required: vrDatabaseRes["msgJsExternalDBConnNameMustBSpecified"],
                maxlength: vrDatabaseRes["msgJsExternalDB50CharAllowed"]
            },
            DBServer: vrDatabaseRes["msgJsExternalDBExistingServerMustBSpecified"],
            DBDatabase: vrDatabaseRes["msgJsExternalDBMustBSpecified"],
            DBConnectionTimeout: {
                required: vrDatabaseRes["msgJsExternalDBConnTymOut"],
                min: vrDatabaseRes["msgJsExternalDBConnTymOut"]
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

    $.validator.addMethod('ValidateDBDatabase', function (value, element) {
        var ErrorMsg =vrDatabaseRes["msgJsExternalDBMustBSpecified"];
        var IsError = true;
        if (value == 'null' || value == null) {
            $.validator.messages.myvalidator = ErrorMsg;
            IsError = false;
        }
        return IsError;
    }, function (ErrorMsg, element) {
        return $.validator.messages.myvalidator;
    });
});


//This will edit connection properties if modified.
function EditConnection() {

    var $form = $('#frmAddNewDb');
    if ($form.valid()) {
        var serializedForm = $form.serialize();
        $.post(urls.ExternalDB.AddNewDB, serializedForm)
            .done(function (response) {
                if (response.errortype == 'e') {
                    showAjaxReturnMessage(response.message, response.errortype);
                } else {
                    showAjaxReturnMessage(response.message, response.errortype);
                    $("#mdlAddDatabase").HideModel();
                    UpdateList();
                }
            })
            .fail(function (xhr, status, error) {
                ShowErrorMessge();
            });
    }
}//End method.

//This will disconnect the external database connection.
function DisconnectConnection(connName) {
    $.post(urls.ExternalDB.DisconnectDB, $.param({ connName: connName }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        UpdateList();
    });
}//End method

//This will update connection names to selection list.
function UpdateList() {
    $.ajax({
        url: urls.ExternalDB.GetAllSavedInstances,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
            var pOutputObject = $.parseJSON(data);
            $('#lstExtDB').empty();
            $(pOutputObject).each(function (i, v) {
                $('#lstExtDB').append($("<option>", { value: v.DBName, html: v.DBName }));
            });
            //Fixed : FUS-6102
            if (pOutputObject.length > 0) {
                $("#btnEditDB").prop('disabled', false);
                $("#btnRemoveDB").prop('disabled', false);
            }
            else {
                $("#btnEditDB").prop('disabled', true);
                $("#btnRemoveDB").prop('disabled', true);
            }
        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });
}//Method complete.
//This method is for validation.

//This method is used for adding new external database.
function AddDBToList() {
    $.ajax({
        url: urls.ExternalDB.GetAllSQLInstance,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
            var pOutputObject = $.parseJSON(data);
            $('#DBServer').empty();
            $(pOutputObject).each(function (i, v) {
                $('#DBServer').append($("<option>", { value: pOutputObject[i], html: pOutputObject[i] }));
            });
        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });
}//Method complete.

//This method is used for adding Database name to dropdown accroding to the selected SQL Instance.
function setDBField(serverName, DBName) {
    var userID = $('#txtUserID').val();
    var pass = $('#txtPwd').val();

    $.post(urls.ExternalDB.GetDatabaseList, { instance: serverName, userID: userID, pass: pass })
               .done(function (data) {
                   
                   if (data.errortype == 's') {
                       var pOutputObject = $.parseJSON(data.jsonObject);
                       $('#DBDatabase').empty();
                       $('#DBDatabase').append($("<option>", { value: 'null', html: ''}));
                       $(pOutputObject).each(function (i, v) {
                           $('#DBDatabase').append($("<option>", { value: pOutputObject[i], html: pOutputObject[i] }));
                       });
                       if (DBName) {
                           $('#DBDatabase').val(DBName);
                       }
                   } else {
                       showAjaxReturnMessage(data.message, data.errortype);
                       $('#DBDatabase').empty();
                   }
               })
               .fail(function (xhr, status, error) {
                   ShowErrorMessge();
               });
}//Method complete.

//Setting selected data to modal for 'Edit'.
function SetSelectedData(dbName) {
    var dbServer, userId, pass, dbDatabase, connTimeOut, id;

    $.ajax({
        url: urls.ExternalDB.GetAllSavedInstances,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
            var pOutputObject = $.parseJSON(data);
            $(pOutputObject).each(function (i, v) {
                if (pOutputObject[i].DBName == dbName) {
                    dbServer = pOutputObject[i].DBServer;
                    userId = pOutputObject[i].DBUserId;
                    pass = pOutputObject[i].DBPassword;
                    dbDatabase = pOutputObject[i].DBDatabase;
                    connTimeOut = pOutputObject[i].DBConnectionTimeout;
                    id = pOutputObject[i].Id;
                }
            });
            $('#txtConnectName').val(dbName);
            var abc = dbServer.replace(/\//g, '\\');
            $('select#DBServer').val(abc);
            $('#txtUserID').val(userId);
            $('#txtPwd').val(pass);
            setDBField(dbServer, dbDatabase);
            $('select#DBDatabase').val(dbDatabase);
            $('#txtConTimeOut').val(connTimeOut);
            $('#Id').val(id);
        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });
}//Method complete.