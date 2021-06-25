$(function () {
    FillAvailableDatabseDDL();
    $.get(urls.TableRegister.LoadRegisterList, function (data) {
        if (data) {
            if (data.errortype == "s") {
                BindDualPanel(data.RegisterBlock);
                DisableOtherButton();
                DisableRegisterButton();
            }
            else {
                showAjaxReturnMessage(data.message, data.errortype);
            }
        }
    });

    $("select#DatabaseDDL").change(function () {
        var DatabaseName = $('#DatabaseDDL :selected').text();
        var DatabaseServer = $('#DatabaseDDL :selected').val();
        FillAvailableTableDDL(DatabaseName, DatabaseServer);
    });

    $('#TableDDL').change(function () {
        var TableName = $('#TableDDL :selected').text();
        var conName = $('#TableDDL :selected').val();
        FillAvailableFieldDDL(TableName, conName);
    });

    $('#btnRegister').click(function () {
        var DatabaseName = $('#TableDDL :selected').val();
        var TableName = $('#TableDDL :selected').text();
        var FieldName = $('#FieldDDL :selected').text();
        $.post(urls.TableRegister.SetRegisterTable, {dbName: DatabaseName, tbName: TableName, fldName: FieldName }, function (data) {
            if (data) {
                if (data.errortype == 's') {
                    showAjaxReturnMessage(vrDatabaseRes["msgJsTableRegisterTblRegSuccessfully"], "s");
                    $('#SelectTable').append("<option value=" + encodeURIComponent(DatabaseName) + ">" + TableName + "</option>");
                    $('#TableDDL').empty();
                    $('#FieldDDL').empty();
                    FillAvailableDatabseDDL();
                    DisableOtherButton();
                    DisableRegisterButton();
                }
                else {
                    showAjaxReturnMessage(data.message, data.errortype);
                    return false;
                }
            }
            return true;
        });

    });

    $('#btnUnregister').on('click', function () {
        var TableName = $('#SelectTable :selected').text();
        if (TableName === "") {
            showAjaxReturnMessage(vrDatabaseRes["msgJsTableRegisterSelectTbl4UnReg"], 'w');
        }
        else {
            $(this).confirmModal({
                confirmTitle: vrDatabaseRes['msgJsTableRegisterUnRegConf'],
                confirmMessage: String.format(vrDatabaseRes['msgJsTableRegisterSure2UnReg'],TableName),
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmCallback: UnregisterTableFromDB
            });
        }
    });

    $('#btnDrop').on('click', function () {
        var TableName = $('#SelectTable :selected').text();
        if (TableName === "") {
            showAjaxReturnMessage(vrDatabaseRes["msgJsTableRegisterSelectTbl2Drop"], 'w');
        }
        else {
            $(this).confirmModal({
                confirmTitle: vrDatabaseRes['msgJsTableRegisterDropConf'],
                confirmMessage: String.format(vrDatabaseRes['msgJsTableRegisterSure2DropTbl'],TableName),
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmCallback: DropTableFromDB
            });
        }
    });


});

function DisableOtherButton() {
    if ($('#SelectTable option').size() == 0) {
        $('#btnUnregister').attr('disabled', 'disabled');
        $('#btnDrop').attr('disabled', 'disabled');
    }
    else {
        $('#btnUnregister').removeAttr('disabled', 'disabled');
        $('#btnDrop').removeAttr('disabled', 'disabled');
    }
}
function DisableRegisterButton() {
    if ($('#TableDDL option').size() == 0) {
        $('#btnRegister').attr('disabled', 'disabled');
    }
    else {
        $('#btnRegister').removeAttr('disabled', 'disabled');
    }
}
function UnregisterTableFromDB() {
    var DatabaseName = $('#SelectTable :selected').val();
    var TableName = $('#SelectTable :selected').text();
    $.post(urls.TableRegister.UnRegisterTable, { dbName: decodeURIComponent(DatabaseName), tbName: TableName }, function (data) {
            if (data.errortype == "s") {
                showAjaxReturnMessage(vrDatabaseRes["msgJsTableRegisterTblUnRegSuccessfully"], "s");
                $('#SelectTable :selected').remove();
                FillAvailableDatabseDDL();
                DisableRegisterButton();
                DisableOtherButton();
                if ($("#ulTable .mCSB_container").length > 0) {
                    $("#ulTable .mCSB_container").find('#' + TableName).parent().remove();
                }
            }
            else {
                showAjaxReturnMessage(data.message, data.errortype);
            }
        });
}

function DropTableFromDB() {
    var DatabaseName = $('#SelectTable :selected').val();
    var TableName = $('#SelectTable :selected').text();
    $.post(urls.TableRegister.DropTable, { dbName: DatabaseName, tbName: TableName }, function (data) {
        if (data.errortype == "s") {
            showAjaxReturnMessage(data.message, "s");
            $('#SelectTable :selected').remove();
            FillAvailableDatabseDDL();
            DisableRegisterButton();
            DisableOtherButton();
            if ($("#ulTable .mCSB_container").length > 0) {
                $("#ulTable .mCSB_container").find('#' + TableName).parent().remove();
            }
        }
        else {
            showAjaxReturnMessage(data.message, data.errortype);
        }
        DisableOtherButton();
    });
}

function FillAvailableDatabseDDL() {
    $.ajax({
        url: urls.TableRegister.GetAvailableDatabase,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
            var pDBList = $.parseJSON(data.ExternalDB);
            var pSystemDB = $.parseJSON(data.systemDB);
            $('#DatabaseDDL').empty();
            $('#DatabaseDDL').append($("<option>", { value: pSystemDB[0].Value, html: pSystemDB[0].Key })).attr("selected",true);
            $(pDBList).each(function (i, v) {
                $('#DatabaseDDL').append($("<option>", { value: v.DBServer, html: v.DBName }));
            });
            $('#DatabaseDDL option:first').attr('selected', true);
            var DatabaseName = $('#DatabaseDDL :selected').text();
            var DatabaseServer = $('#DatabaseDDL :selected').val();
            FillAvailableTableDDL(DatabaseName, DatabaseServer);

        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });
}

function FillAvailableTableDDL(DatabaseName, DatabaseServer) {
    $.ajax({
        url: urls.TableRegister.GetAvailableTable,
        dataType: "json",
        data: { dbName: DatabaseName, server: DatabaseServer },
        contentType: 'application/json; charset=utf-8',
        type: 'GET'
    }).done(function (data) {
           if (data) {
               $('#TableDDL').empty();
               $('#FieldDDL').empty();
               if (data.errortype == 's') {
                   var pTableList = $.parseJSON(data.unregisterListJSON);
                   $(pTableList).each(function (i, item) {
                       $('#TableDDL').append($("<option>", { value: item.Value, html: item.Key }));
                   });
                   $('#TableDDL option:first').attr('selected', true);
                   var tableName = $('#TableDDL :selected').text();
                   var conName = $('#TableDDL :selected').val();
                   FillAvailableFieldDDL(tableName, conName);
                   if (data.flag == true) {
                       $('#LongTableNameLable').show();
                   }
                   else {
                       $('#LongTableNameLable').hide();
                   }
               }
               else {
                   if (data.errortype == 'e')
                       showAjaxReturnMessage(data.message, data.errortype);
               }
               DisableRegisterButton();
           }
       })
       .fail(function (xhr, status, data) {
           ShowErrorMessge();
       });


    //$.post(urls.TableRegister.GetAvailableTable, { dbName: DatabaseName, server: DatabaseServer }, function (data) {
    //    if(data)
    //    {
    //        $('#TableDDL').empty();
    //        if (data.errortype == 's') {
    //            var pTableList = $.parseJSON(data.unregisterListJSON);
    //                $(pTableList).each(function (i, item) {
    //                    $('#TableDDL').append($("<option>", { value: item.Value, html: item.Key }));
    //                });
    //                $('#TableDDL option:first').attr('selected', true);
    //                var tableName =$('#TableDDL :selected').text();
    //                var conName = $('#TableDDL :selected').val();
    //                FillAvailableFieldDDL(tableName,conName );
    //                if (data.flag == true) {
    //                    $('#LongTableNameLable').show();
    //                }
    //                else {
    //                    $('#LongTableNameLable').hide();
    //                }
    //            }
    //        else 
    //        {
    //            if (data.errortype == 'e')
    //            showAjaxReturnMessage(data.message,data.errortype);
    //        }
    //        DisableRegisterButton();
    //    }    

    //})
    //.fail(function (data) {
    //    showAjaxReturnMessage(data.message, data.errortype);
    //});
}

function FillAvailableFieldDDL(tableName, conName) {
    $.post(urls.TableRegister.GetPrimaryField, { TableName: tableName, ConName: conName }, function (data) {
        if (data) {
            $('#FieldDDL').empty();
            if (data.errortype == 's') {
                var pFieldList = $.parseJSON(data.fieldListJSON);
                $(pFieldList).each(function (i, item) {
                    $('#FieldDDL').append($("<option>", { value: item.Value, html: item.Key }));
                });
                $('#FieldDDL option:first').attr('selected', true);
            }
            else {
                if (data.errortype == 'e')
                    showAjaxReturnMessage(data.message, data.errortype);
            }
        }

    });
}

function BindDualPanel(jsonObject) {

    var pOutputObject = $.parseJSON(jsonObject);
    $('#SelectTable').empty();
    $.each(pOutputObject, function (i, item) {
        $('#SelectTable').append("<option value=" + encodeURIComponent(item.Value) + ">" + item.Key + "</option>");

    });

}