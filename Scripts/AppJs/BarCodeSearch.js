$(function () {
    $("#grdBarCode").gridLoadViews(urls.BarCodeSearchOrder.GetBarCodeList, vrApplicationRes['tiJsBarCodeSearchBCSO'], false, true);
    $("#btnSaveOutputSettings").on('click', function (e) {
        var sel_id = $("#grdBarCode").getGridParam('selrow');
        if (sel_id == null) {
            sel_id = 0;
        }
        var last_row = jQuery("#grdBarCode").jqGrid('getGridParam', 'records');
        var $form = $('#frmBarCodeSearchOrder');
        if ($form.valid()) {
            var serializedForm = $form.serialize() + "&scanOrder=" + last_row;
            $.post(urls.BarCodeSearchOrder.SetbarCodeSearchEntity, serializedForm)
                .done(function (response) {
                    showAjaxReturnMessage(response.message, response.errortype);
                    $("#mdlBarCodeSearch").HideModel();
                    $("#grdBarCode").refreshJqGrid();
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
        }
    });    //Save data in database 

    $("select#lstBarCodeList").on('change', function () {
        var tableName = $(this).val();
        $("select#FieldName").val(tableName.trim().toLowerCase());
        setTableField(tableName, "");
    });

    $("#gridAdd").click(function () {
        FillTableName();
        $("#mdlBarCodeSearch").ShowModel();
        $('#frmBarCodeSearchOrder').resetControls();
        $('#FieldName').empty();
        var tableName = $('#lstBarCodeList').val();
        setTableField(tableName, "");
    });

    $("#gridEdit").click(function () {
        FillTableName();
        //var selectedrows = $("#grdBarCode").getSelectedRowsIds();
        var selectedrows = $('#grdBarCode').getGridParam('selrow');
        if (selectedrows == null) {
            showAjaxReturnMessage(vrApplicationRes['msgJsBarCodeSearchOnlyOneRow'], 'w');
            return;
        }
        else {
            $('#frmBarCodeSearchOrder').resetControls();
            $('#FieldName').empty();
            var sel_id = $("#grdBarCode").getGridParam('selrow');
            var selected = $("#grdBarCode").jqGrid('getInd', sel_id);
            var rowData = jQuery("#grdBarCode").getRowData(sel_id);
            var colData = rowData['TableName'];
            var strip = rowData['IdStripChars'];
            var id = rowData['Id'];
            var mask = rowData['IdMask'];
            //colData = colData.charAt(0).toUpperCase() + colData.slice(1);
            var fieldData = rowData['FieldName'];
            $("select#lstBarCodeList").val(colData.trim().toLowerCase());
            setTableField(colData, fieldData);
            $("#mdlBarCodeSearch").ShowModel();
            $("#txtStripChar").val(strip);
            $("#txtMask").val(mask);
            $('#Id').val(id);
        }

    });

    $("#gridRemove").click(function () {
        //var selectedrows = $("#grdBarCode").getSelectedRowsIds();
        var selectedrows = $('#grdBarCode').getGridParam('selrow');
        if (selectedrows == null) {
            showAjaxReturnMessage(vrApplicationRes['msgJsBarCodeSearchOnlyOneRow'], 'w');
            return;
        }
        else {
            $(this).confirmModal({
                confirmTitle: vrCommonRes['msgJsDelConfim'],
                confirmMessage: vrApplicationRes['msgJsRUSureWantToRemove'],
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmCallback: DeleteBarCodeSearchEntity
            });
        }

    });

});

function setTableField(tableName, fieldData) {
    $.post(urls.Common.GetColumnList, { pTableName: tableName, type : 0 })
               .done(function (data) {
                   var pOutputObject = $.parseJSON(data);
                   $('#FieldName').empty();
                   if (pOutputObject.Columns) {
                       $(pOutputObject.Columns).each(function (i, v) {
                           if (v.COLUMN_NAME.indexOf('%') < 0 ) {
                               $('#FieldName').append($("<option>", { value: v.COLUMN_NAME.trim().toLowerCase(), html: v.COLUMN_NAME }));
                           }
                       });
                   } else {
                       $(pOutputObject).each(function (i, v) {
                           if (v.COLUMN_NAME.indexOf('%') < 0 ) {
                               $('#FieldName').append($("<option>", { value: v.COLUMN_NAME.trim().toLowerCase(), html: v.COLUMN_NAME }));
                           }
                       });
                   }
                   
                   if (fieldData) {
                       $('#FieldName').val(fieldData.trim().toLowerCase());
                   }
               })
               .fail(function (xhr, status, error) {
                   ShowErrorMessge();
               });

}

function DeleteBarCodeSearchEntity() {
    var sel_id = $("#grdBarCode").getGridParam('selrow');

    var selectedrows = $("#grdBarCode").jqGrid('getInd', sel_id) - 1;
    $.post(urls.BarCodeSearchOrder.RemoveBarCodeSearchEntity, $.param({ pId: sel_id, scan: selectedrows }, true), function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        if (data.errortype == 's') {
            $("#grdBarCode").refreshJqGrid();
        }
    });

}

function FillTableName() {
    $.ajax({
        url: urls.Common.GetTrackableTableList,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: false,
        processData: false,
        cache: false,
        success: function (data) {
            var pOutputObject = $.parseJSON(data);
            $('#lstBarCodeList').empty();
            $(pOutputObject).each(function (i, v) {
                if (v.TableName.indexOf('%') < 0 && v.UserName.indexOf('%') < 0) {
                    $('#lstBarCodeList').append($("<option>", { value: v.TableName.trim().toLowerCase(), html: v.UserName }));
                }
            });
        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });

}
