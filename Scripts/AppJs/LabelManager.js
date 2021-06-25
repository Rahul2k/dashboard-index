var FORM_HAS_CHANGED = false;
var FIRST_BAR_CODE = false;
var SQL_STRING = null;
var TEXT_X, TEXT_Y;
var OBJ_COUNT = 0;

var stage;
var layer;

var i = 1;
var myobject;
var myline;
var myRect;
var myStrike;
var mygroup;
var dRatio = 1;
var total_label_record = 0;
var current_label_record = 1;
var current_label_tablename = "";

$(document).ready(function () {

    $('#mdlAddNewLabel .modal-dialog').draggable({
        handle: ".modal-header"
    });

    $("#frmAddNewLabel input, select").change(function () {
        FORM_HAS_CHANGED = true;
    });

    $.ajax({
        url: urls.LabelManager.LoadAddEditLabel,
        contentType: 'application/html; charset=utf-8',
        type: "GET",
        async: true,
        processData: false,
        cache: false
    }).done(function (result) {
        $('#LoadUserControl').empty();
        $('#LoadUserControl').html(result);
        UpdateLabelList();
        enableDisable();
        $('#btnRemoveLabel').on('click', function () {

            element = document.getElementById("lstExtLabel");
            selected_index = element.selectedIndex;
            var labelName = element.value.toString();
            if (selected_index != -1) {
                $(this).confirmModal({
                    confirmTitle: 'TAB FusionRMS',
                    confirmMessage: String.format(vrLabelManagerRes['magJsLabelMngSure2Delete'], labelName),
                    confirmOk: vrCommonRes['Yes'],
                    confirmCancel: vrCommonRes['No'],
                    confirmStyle: 'default',
                    confirmCallback: DeleteLable,
                    confirmObject: labelName
                });
            }
            else {
                showAjaxReturnMessage(vrLabelManagerRes['magJsLabelMngSelectLbl2Continue'], 'w');
            }
        });
        $('#frmAddNewLabel').validate({
            rules: {
                Name: {
                    required: true,
                    maxlength: 50
                },
                TableName: { required: true },
                LabelWidth: { required: true },
                LabelHeight: { required: true },
                Sampling: { required: true, min: 0 },
                "SQLString": "ValidateSQLString",
                "SQLUpdateString": "ValidateUpdateSQLString"
            },
            ignore: ":hidden:not(select)",
            messages: {
                Name: vrLabelManagerRes["magJsLabelMngLblNameMustBEntered"],
                TableName: vrLabelManagerRes["magJsLabelMngTblNameMustBEntered"],
                LabelWidth: vrLabelManagerRes["magJsLabelMngLblHeightMustBEntered"],
                LabelHeight: vrLabelManagerRes["magJsLabelMngLblWidthMustBEntered"]
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
        $.validator.addMethod('ValidateSQLString', function (value, element) {            
            var ErrorMsg = vrLabelManagerRes["magJsLabelMngSQLStrMustBEntered"];
            var IsError = true;
            if (value.length == 0) {
                $.validator.messages.myvalidator = vrLabelManagerRes["magJsLabelMngSQLStrMustBEntered"];
                IsError = false;
                return IsError;
            }
            var sqlSplitwords = value.split(" ");
            if (sqlSplitwords[0].toLowerCase() != "select") {
                $.validator.messages.myvalidator = vrLabelManagerRes["magJsLabelMngSQLStrStartsWithSELECT"];
                IsError = false;
                return IsError;
            }
            if (value.toLowerCase() == "select" || value.toLowerCase() == "select ") {
                switch (value.toLowerCase()) {
                    case 'select':
                        $.validator.messages.myvalidator = vrLabelManagerRes["magJsLabelMngSQLStrStartsWithSELECT"];
                        IsError = false;
                        break;
                    case 'select ':
                        $.validator.messages.myvalidator = vrLabelManagerRes['magJsLabelMngSQLStatementInvalid'];
                        IsError = false;
                        break;
                }
                return IsError;
            }
            if (value.indexOf('%ID%') == -1) {
                $.validator.messages.myvalidator = vrLabelManagerRes['magJsLabelMngSQLStrMustHvId'];
                IsError = false;
                return IsError;
            }

            if ((value.match(/%ID%/g) || []).length > 1) {
                $.validator.messages.myvalidator = vrLabelManagerRes['magJsLabelMngSQLStatementInvalid'];
                IsError = false;
                return IsError;
            }
            return true;
        }, function (ErrorMsg, element) {
            return $.validator.messages.myvalidator;
        });
        $.validator.addMethod('ValidateUpdateSQLString', function (value, element) {
            var IsError = true;
            if (value.length > 0) {
                if (value.indexOf("UPDATE") != 0 && value.indexOf("DELETE") != 0) {
                    $.validator.messages.myvalidator = vrLabelManagerRes['magJsLabelMngSQLStrStartsWithUpdateDelete'];
                    IsError = false;
                }
            }
            return IsError;
        }, function (ErrorMsg, element) {
            return $.validator.messages.myvalidator;
        });
        $('#btnEditLabel').on('click', function () {
            element = document.getElementById("lstExtLabel");
            selected_index = element.selectedIndex;
            if (selected_index != -1) {
                var lblName = $('#lstExtLabel').val();
                $.ajax({
                    url: urls.LabelManager.GetLabelDetails,
                    data: { name: lblName },
                    type: 'GET',
                    datatype: 'text/json'
                }).done(function (data) {
                    var pOnestripjobs = $.parseJSON(data.onestripjob);
                    var pOutputObject = $.parseJSON(data.onestripjobfields);
                    var pOneStripForm = $.parseJSON(data.onestripform);
                    if (data.count) {
                        if (data.count < pOnestripjobs.Sampling) {
                            total_label_record = data.count;
                        } else {
                            total_label_record = pOnestripjobs.Sampling;
                        }
                        current_label_tablename = pOnestripjobs.TableName;
                        if (data.count <= 1) {
                            getActionPage('');
                        }
                    }
                    $('.index').hide();
                    $('#label').show();
                    enableDisable();
                    SQL_STRING = pOnestripjobs.SQLString;
                    var width = pOneStripForm.LabelWidth.toString();
                    var height = pOneStripForm.LabelHeight.toString();

                    $('#labelHeight').text(height);
                    $('#labelWidth').text(width);
                    $('#barCodePrefix').text(data.barCodePrefix);
                    initialize(height, width);
                    $('#tableForLabel').text(String.format(vrCommonRes["UserTableName"], pOnestripjobs.TableName));
                    $('#newLabelName').text(String.format(vrCommonRes["LabelName"], pOnestripjobs.Name));
                    $('#labelID').text(pOnestripjobs.Id.toString());
                    drawExistingLabel(pOutputObject, 1);
                    $("#bSaveLabel").attr("disabled", "disabled");
                    changeIconState(true);
                }).fail(function (xhr, status) {
                    ShowErrorMessge();
                });
            } else {
                showAjaxReturnMessage(vrLabelManagerRes['magJsLabelMngSelectLbl2Continue'], 'w');
            }
        });
        $('#editLabel').on('click', function () {
            var lblName = $('#newLabelName').text().split(":")[1].toString();
            $.ajax({
                url: urls.LabelManager.GetLabelDetails,
                data: { name: lblName },
                type: 'GET',
                datatype: 'text/json'
            }).done(function (data) {
                var pOnestripjobs = $.parseJSON(data.onestripjob);
                showEditLabel(pOnestripjobs);
            }).fail(function (xhr, status) {
                ShowErrorMessge();
            });

            setTimeout(function () {
                if ($('#mdlAddNewLabel').hasScrollBar()) {
                    $('#mdlAddNewLabelClone').empty().html($('#mdlAddNewLabel .modal-footer').clone());

                    $('#mdlAddNewLabelClone .modal-footer').css({ 'width': ($('#mdlAddNewLabel').find('.modal-footer').width() + 30) + 'px', 'padding': '15px 7px 15px 15px' });
                    $('#mdlAddNewLabel').on('scroll', function () {
                        if ($('#mdlAddNewLabel').get(0).scrollHeight > ($('#mdlAddNewLabel').height() + $('#mdlAddNewLabel').scrollTop() + 95)) {
                            $('#mdlAddNewLabelClone').show().addClass("affixed");
                        }
                        else {
                            $('#mdlAddNewLabelClone').hide().removeClass("affixed");
                        }
                    });
                    $('#mdlAddNewLabel').on('hide.bs.modal', function (e) {
                        $('#mdlAddNewLabelClone').hide().removeClass('affixed');
                    });
                }
            }, 400);
        });
        $('#btnClsoeWindow').on('click', function () {
            window.close();
        });
        $('#btnAddLabel').on('click', function () {
            $('#frmAddNewLabel').resetControls();
            $('#mdlAddNewLabel').ShowModel();
            $('#sampling').val(20);
            FillTableNameForNewLabel("");
            FillFormNameForNewLabel("");
        });
        $('#FormName').on('change', function (e) {
            var formValue = $('#FormName').val().toString().split(',');
            $('#stageWidth').val(formValue[1].toString());
            $('#stageHeight').val(formValue[2].toString());
            $('#formId').val(formValue[3].toString());
        });
        $('#bSaveLabel').on('click', function () {
            var jsonObj = getOneStripFormObjects();
            var tableName = $('#newLabelName').text().split(":")[1].toString();
            var labelId = $('#labelID').text();

            $.post(urls.LabelManager.SetLableObjects, { jsonArray: JSON.stringify(jsonObj), id: labelId })
                       .done(function (data) {
                           showAjaxReturnMessage(vrLabelManagerRes['magJsLabelMngLblObjSaved'], 's');
                           var pOutputObject = $.parseJSON(data.oneStripJobFieldObject);
                           layer.removeChildren();
                           $('#firstQR').text('true');
                           drawExistingLabel(pOutputObject, current_label_record);
                           changeIconState(true);
                       })
                       .fail(function (xhr, status, error) {

                       });

            var hgud = stage.find("#image1")[0];
            var inMemoryCanvas = document.getElementsByTagName('canvas')[0];
            var ter = document.getElementById('abcd');
            var ters = document.getElementsByClassName('kineticjs-content');

            stage.toDataURL({
                callback: function (dataUrl) {
                }
            });
            $('#labelChanged').text('false');
            $("#bSaveLabel").attr("disabled", "disabled");
            changeIconState(true);
        });
        $('#removeObject').on('click', function () {

            var children = stage.find(".layer")[0].children;
            var childrenlength = children.length;

            for (var j = childrenlength - 1; j >= 0; j--) {
                var currObj = children[j];
                if (currObj.children) {
                    if (currObj.children[0].attrs.stroke == "Red") {
                        children[j].remove();
                        OBJ_COUNT = OBJ_COUNT - 1;
                    }
                } else {
                    if (currObj.attrs.stroke == "Red") {
                        children[j].remove();
                        OBJ_COUNT = OBJ_COUNT - 1;
                    }
                }
            }

            myobject = null;
            myline = null;
            myStrike = null;
            myRect = null;
            mygroup = null;

            layer.draw();
            enableDisable();
            $('#labelChanged').text('true');
            $("#bSaveLabel").removeAttr("disabled");
            changeIconState(true);
        });
        $('#bFieldObj').on('click', function () {
            ClearOutline();
            var tableName = $('#tableForLabel').text().split(":")[1].toString();
            var containerHeight = parseFloat($("#abcd").height().toString());
            var containerWidth = parseFloat($("#abcd").width().toString());
            $('#mdlAddFieldObj').resetControls();
            $('#mdlAddFieldObj').ShowModel();
            $('#radiosf1').attr('checked', 'checked');
            $('#startCharPosition').val(0);
            $('#maxChars').val(0);
            $('#boxHeight').val(0);
            $('#boxWidth').val(0);
            $('#fontSize').val(14);
            $('#fontSize').attr('max', Math.round(containerWidth * dRatio));
            $('#boxHeight').attr('max', Math.round(containerWidth * dRatio));
            $('#boxWidth').attr('max', Math.round(containerWidth * dRatio));
            $("#transparent").attr('checked', true);
            setTableFieldObj(SQL_STRING, "");
            BindFontFamilies("fontName", "");
            $('#fieldTextColor').colorpicker("val", "#000000");
            $('#fieldBgColor').colorpicker("val", "#ffffff");

            setTimeout(function () {
                if ($('#mdlAddFieldObj').hasScrollBar()) {
                    $('#mdlAddFieldObjClone').empty().html($('#mdlAddFieldObj .modal-footer').clone());
                    $('#mdlAddFieldObjClone .modal-footer').css({ 'width': ($('#mdlAddFieldObj').find('.modal-footer').width() + 30) + 'px', 'padding': '15px 7px 15px 15px' });
                    $('#mdlAddFieldObj').on('scroll', function () {
                        if ($('#mdlAddFieldObj').get(0).scrollHeight > ($('#mdlAddFieldObj').height() + $('#mdlAddFieldObj').scrollTop() + 95)) {
                            $('#mdlAddFieldObjClone').show().addClass("affixed");
                        }
                        else {
                            $('#mdlAddFieldObjClone').hide().removeClass("affixed");
                        }
                    });
                    $('#mdlAddFieldObj').on('hide.bs.modal', function (e) {
                        $('#mdlAddFieldObjClone').hide().removeClass('affixed');
                    });
                }
            }, 400);
        });
        $('#bQRCode').on('click', function () {
            ClearOutline();
            var tableName = $('#tableForLabel').text().split(":")[1].toString();
            var containerHeight = $(".navbar-default").height();
            var containerWidth = $(".navbar-default").width();

            var pageViewerHeight = $("#abcd").height();
            var pageViewerWidth = $("#abcd").width();

            var labelWidth = parseFloat($('#labelWidth').text()) / 15;
            var labelHeight = parseFloat($('#labelHeight').text()) / 15;
            var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;
            var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');

            labelLeft = parseFloat(labelLeft);
            if (labelWidth != 0) {
                dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
            }
            $('#mdlAddQRCode').resetControls();
            $('#mdlAddQRCode').ShowModel();
            $('#qrWidth').attr('max', Math.round(containerWidth * dRatio));
            $('#radiosqr1').attr('checked', 'checked');
            $('#qrTextColor').colorpicker("val", "#000000");
            $('#qrBgColor').colorpicker("val", "#ffffff");
            $('#qrStartCharPosition').val(0);
            $('#qrMaxChars').val(0);
            $('#qrBoxHeight').val(0);
            $('#qrBoxWidth').val(0);
            $('#qrBarWidth').val(0);
            $('#qrWidth').val(Math.round(((144 / dRatio) + 0.13333) * 15));
            $('#qrHeight').val(Math.round(((144 / dRatio) + 0.13333) * 15));
            $('#firstQR').text('true');
            setTableFieldQR(SQL_STRING, "");

            $('#mdlAddQRCodeClone').empty().html($('#mdlAddQRCode .modal-footer').clone());

            setTimeout(function () {
                $('#mdlAddQRCodeClone .modal-footer').css({ 'width': ($('#mdlAddQRCode').find('.modal-footer').width() + 30) + 'px', 'padding': '15px 7px 15px 15px' });
                $('#mdlAddQRCode').on('scroll', function () {
                    if ($('#mdlAddQRCode').get(0).scrollHeight > ($('#mdlAddQRCode').height() + $('#mdlAddQRCode').scrollTop() + 95)) {
                        $('#mdlAddQRCodeClone').addClass("affixed");
                    }
                    else {
                        $('#mdlAddQRCodeClone').removeClass("affixed");
                    }
                });
                $('#mdlAddQRCode').on('hide.bs.modal', function (e) {
                    $('#mdlAddQRCodeClone').removeClass('affixed');
                });
            }, 400);
        });
        $('#btnSQLString').on('click', function () {
            var tableName = $('#TableName').val();
            if (tableName) {
                $.post(urls.LabelManager.CreateSQLString, { tableName: tableName })
                       .done(function (data) {
                           var sqlString = data.value;
                           $('#sqlString').val(sqlString);
                           $('#sqlString').closest('.form-group').removeClass('has-error');
                           $('#sqlString').parent().find('.help-block').remove();
                       })
                       .fail(function (xhr, status, error) {

                       });
            } else {
                ShowErrorMessge();
            }
        });
        $('#frmAddBarCode').validate({
            rules: {
                barStartCharPosition: { required: true, min: 0, digits: true, maxlength: 3 },
                barMaxChars: { required: true, min: 0, digits: true, maxlength: 3 },
                barWidth: { required: true, min: 0, digits: true },
                barHeight: { required: true, min: 20, digits: true },
                barBarWidth: { required: true, min: 0, digits: true, maxlength: 2 }
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
        $('#frmMdlAddQR').validate({
            rules: {
                qrStartCharPosition: { required: true, min: 0, digits: true, maxlength: 3 },
                qrMaxChars: { required: true, min: 0, digits: true, maxlength: 3 },
                qrWidth: { required: true, min: 10, digits: true }
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
        $('#frmmdlAddFieldObj').validate({
            rules: {
                startCharPosition: { required: true, min: 0, digits: true, maxlength: 3 },
                maxChars: { required: true, min: 0, digits: true, maxlength: 3 },
                boxHeight: { required: true, min: 0, digits: true },
                boxWidth: { required: true, min: 0, digits: true },
                fontSize: { required: true, min: 3, digits: true }
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
        $('#frmmdlAddText').validate({
            rules: {
                staticText: { required: true, minlength: 1 },
                boxHeightText: { required: true, min: 0, digits: true },
                boxWidthText: { required: true, min: 0, digits: true },
                fontSizeText: { required: true, min: 3, digits: true }
            },
            ignore: ":hidden:not(select)",
            messages: {
                staticText: { required: vrLabelManagerRes["magJsLabelMngStaticTxtMustBEntered"] }
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
        //$('#btnAddBarCodeLabel').on('click', function (e) {
        //This method is used when refresh event occurs.
        $(window).bind('beforeunload', function () {
            //save info somewhere
            if (!$(".index").is(':visible')) {
                if ($('#labelChanged').text() == 'true') {
                    return vrLabelManagerRes["magJsLabelMngSureUrChangesWillBLost"];
                }
            }
            return undefined;
        });
        $('#bBarCode').on('click', function (e) {
            ClearOutline();
            FIRST_BAR_CODE = true;

            var containerHeight = $(".navbar-default").height();
            var containerWidth = $(".navbar-default").width();

            var pageViewerHeight = $("#abcd").height();
            var pageViewerWidth = $("#abcd").width();

            var labelWidth = parseFloat($('#labelWidth').text()) / 15;
            var labelHeight = parseFloat($('#labelHeight').text()) / 15;

            var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;


            var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
            labelLeft = parseFloat(labelLeft);


            if (labelWidth != 0) {
                dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
            }

            $('#mdlAddBarCode').resetControls();
            $('#mdlAddBarCode').ShowModel();
            $('#barWidth').attr('max', Math.round(labelWidth * 15 * dRatio));
            $('#barHeight').attr('max', Math.round(labelHeight * 15 * dRatio));
            $('#radiosbar1').attr('checked', 'checked');
            $('#barTextColor').colorpicker("val", "#000000");
            $('#barBgColor').colorpicker("val", "#ffffff");
            $('#barStartCharPosition').val(0);
            $('#barMaxChars').val(0);
            $('#barBoxHeight').val(0);
            $('#barBoxWidth').val(0);
            $('#barBarWidth').val(0);
            var tableName = $('#tableForLabel').text().split(":")[1].toString();
            var containerHeights = parseFloat($("#abcd").height().toString());
            var containerWidths = parseFloat($("#abcd").width().toString());
            $('#barWidth').val(Math.round((labelWidth / 2) * 15));
            $('#barHeight').val(Math.round((labelHeight / 5) * 15));
            setTableField(SQL_STRING, "");
            
            setTimeout(function () {
                if ($('#mdlAddBarCode').hasScrollBar()) {
                    $('#mdlAddBarCodeClone').empty().html($('#mdlAddBarCode .modal-footer').clone());
                    $('#mdlAddBarCodeClone .modal-footer').css({ 'width': ($('#mdlAddBarCode').find('.modal-footer').width() + 30) + 'px', 'padding': '15px 7px 15px 15px' });
                    $('#mdlAddBarCode').on('scroll', function () {
                        if ($('#mdlAddBarCode').get(0).scrollHeight > ($('#mdlAddBarCode').height() + $('#mdlAddBarCode').scrollTop() + 98)) {
                            $('#mdlAddBarCodeClone').addClass("affixed");
                        }
                        else {
                            $('#mdlAddBarCodeClone').removeClass("affixed");
                        }
                    });
                    $('#mdlAddBarCode').on('hide.bs.modal', function (e) {
                        $('#mdlAddBarCodeClone').removeClass('affixed');
                    });
                }
            }, 400);
            //--Start:Label Manager Window Pop Up Footer Button Panel Change on Window Resize-Added by Milan Patel
            $(window).resize(function () {
                if ($('#mdlAddBarCode').get(0).scrollHeight > ($('#mdlAddBarCode').height() + $('#mdlAddBarCode').scrollTop() + 98)) {
                    $('#mdlAddBarCodeClone').addClass("affixed");
                }
                else {
                    $('#mdlAddBarCodeClone').removeClass("affixed");
                }
            });
            //--End:Label Manager Window Pop Up Footer Button Panel Change on Window Resize
        });
        $('#txtTextColor').colorpicker({
            displayIndicator: false
        });
        $('#txtBgColor').colorpicker({
            displayIndicator: false
        });
        $('#fieldTextColor').colorpicker({
            displayIndicator: false
        });
        $('#fieldBgColor').colorpicker({
            displayIndicator: false
        });
        $('#qrTextColor').colorpicker({
            displayIndicator: false
        });
        $('#qrBgColor').colorpicker({
            displayIndicator: false
        });
        $('#barTextColor').colorpicker({
            displayIndicator: false
        });
        $('#barBgColor').colorpicker({
            displayIndicator: false
        });
        $('#bAddText').on('click', function () {
            ClearOutline();
            var containerHeight = $(".navbar-default").height();
            var containerWidth = $(".navbar-default").width();
            $('#mdlAddText').resetControls();
            $('#mdlAddText').ShowModel();
            $('#radiost1').attr('checked', 'checked');
            $('#boxHeightText').val(0);
            $('#boxWidthText').val(0);
            $('#fontSizeText').val(14);
            $('#fontSizeText').attr('max', Math.round(containerWidth * dRatio));
            $('#boxHeightText').attr('max', Math.round(containerHeight * dRatio));
            $('#boxWidthText').attr('max', Math.round(containerWidth * dRatio));
            $("#transparenttext").attr('checked', true);
            $('#txtTextColor').colorpicker("val", "#000000");
            $('#txtBgColor').colorpicker("val", "#ffffff");
            BindFontFamilies("fontNameText", "");

            setTimeout(function () {
                if ($('#mdlAddText').hasScrollBar()) {
                    $('#mdlAddTextClone').empty().html($('#mdlAddText .modal-footer').clone());
                    $('#mdlAddTextClone .modal-footer').css({ 'width': ($('#mdlAddText').find('.modal-footer').width() + 30) + 'px', 'padding': '15px 7px 15px 15px' });
                    $('#mdlAddText').on('scroll', function () {
                        if ($('#mdlAddText').get(0).scrollHeight > (($('#mdlAddText').height() + $('#mdlAddText').scrollTop()) + 90)) {
                            $('#mdlAddTextClone').show().addClass("affixed");
                        }
                        else {
                            $('#mdlAddTextClone').hide().removeClass("affixed");
                        }
                    });
                    $('#mdlAddText').on('hide.bs.modal', function (e) {
                        $('#mdlAddTextClone').hide().removeClass('affixed');
                    });
                }
            }, 400);
        });

        $("input[type=number]").bind('keyup keypress', function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                return false;
            }
            return undefined;
        });
        /* Start code for lable next prev record */
        $('.nextPre').on('click', function () {
            getActionPage($(this).attr('id'));
        });
        function getActionPage(button_id) {
            if (button_id == "first_page") {
                current_label_record = 1;
                $("#first_page").attr("disabled", "disabled");
                $("#previous_page").attr("disabled", "disabled");
                $("#next_page").removeAttr("disabled");
                $("#last_page").removeAttr("disabled");
            }
            else if (button_id == "previous_page") {
                if (current_label_record > 1) {
                    current_label_record = current_label_record - 1;

                    $("#next_page").removeAttr("disabled");
                    $("#last_page").removeAttr("disabled");
                    if (current_label_record == 1) {
                        $("#first_page").attr("disabled", "disabled");
                        $("#previous_page").attr("disabled", "disabled");

                    }
                }

            }
            else if (button_id == "next_page") {
                if (current_label_record <= total_label_record) {
                    current_label_record = current_label_record + 1;

                    $("#first_page").removeAttr("disabled");
                    $("#previous_page").removeAttr("disabled");

                    if (current_label_record == total_label_record) {

                        $("#next_page").attr("disabled", "disabled");
                        $("#last_page").attr("disabled", "disabled");
                    }
                }

            }
            else if (button_id == "last_page") {
                current_label_record = total_label_record;
                $("#first_page").removeAttr("disabled");
                $("#previous_page").removeAttr("disabled");
                $("#next_page").attr("disabled", "disabled");
                $("#last_page").attr("disabled", "disabled");
            }
            else {
                $("#first_page").attr("disabled", "disabled");
                $("#previous_page").attr("disabled", "disabled");
                $("#next_page").attr("disabled", "disabled");
                $("#last_page").attr("disabled", "disabled");
            }

            if (button_id != "") {
                var jsonObj = getOneStripFormObjects();

                var children = stage.find(".layer")[0].children;
                var childrenlength = children.length;

                for (var j = childrenlength - 1; j >= 0; j--) {
                    var currObj = children[j];
                    currObj.remove();
                    OBJ_COUNT = OBJ_COUNT - 1;
                }

                myobject = null;
                myline = null;
                myStrike = null;
                myRect = null;
                mygroup = null;

                layer.draw();
                enableDisable();
                $('#labelChanged').text('true');
                $("#bSaveLabel").removeAttr("disabled");
                drawExistingLabel(jsonObj, current_label_record);
                changeIconState(false);
                layer.draw();
            }


        }
        /* End code for lable next prev record */
        $('#bBackLabel').on('click', function () {
            FORM_HAS_CHANGED = false;

            if ($('#labelChanged').text() == 'true') {
                $(this).confirmModal({
                    confirmTitle: 'TAB FusionRMS',
                    confirmMessage: vrLabelManagerRes['magJsLabelMngSaveChanges'],
                    confirmOk: vrCommonRes['Yes'],
                    confirmCancel: vrCommonRes['No'],
                    confirmStyle: 'default',
                    confirmCallback: SaveLabel,
                    confirmCallbackCancel: function (e) {
                        $('#label').hide();
                        $('.index').show();
                        current_label_record = 1;
                        OBJ_COUNT = 0;
                        UpdateLabelList();
                        if (myobject) {
                            if (myobject.children) {
                                if (myline) {
                                    myline.remove();
                                }
                                if (myRect) {
                                    myRect.remove();
                                }
                                if (myStrike) {
                                    myStrike.remove();
                                }
                                if (mygroup) {
                                    mygroup.remove();
                                }
                            } else {
                                myobject.remove();
                            }
                        }
                        myobject = null;
                        myline = null;
                        myStrike = null;
                        myRect = null;
                        mygroup = null;
                    }
                });
            } else {
                $('.index').show();
                $('#label').hide();
                UpdateLabelList();
                if (myobject) {
                    if (myobject.children) {
                        if (myline) {
                            myline.remove();
                        }
                        if (myRect) {
                            myRect.remove();
                        }
                        if (myStrike) {
                            myStrike.remove();
                        }
                        if (mygroup) {
                            mygroup.remove();
                        }
                    } else {
                        myobject.remove();
                    }
                }
                myobject = null;
                myline = null;
                myStrike = null;
                myRect = null;
                mygroup = null;
            }

        });
        $('#selectAllObj').on('click', function () {

            var children = stage.find(".layer")[0].children;
            var childrenlength = children.length;

            for (var j = 0; j < childrenlength; j++) {

                var currObj = children[j];
                if (currObj.children) {
                    if (currObj.children[0].attrs.stroke == "Red") {

                    } else {
                        currObj.children[0].setStrokeWidth(1);
                        currObj.children[0].setStroke("Red");
                    }
                } else {
                    if (currObj.attrs.stroke == "Red") {

                    } else {
                        currObj.setStrokeWidth(1);
                        currObj.setStroke("Red");
                    }
                }

                stage.add(layer);
                changeIconState(false);
            }
        });
        $('#centerHor').on('click', function () {
            var children = stage.find(".layer")[0].children;
            var childrenlength = children.length;
            var pageViewerHeight = $("#abcd").height();
            var pageViewerWidth = $("#abcd").width();
            var labelWidth = parseFloat($('#labelWidth').text()) / 15;
            for (var j = 0; j < childrenlength; j++) {

                var currObj = children[j];
                if (currObj.children) {
                    if (currObj.children[0].attrs.stroke == "Red") {
                        currObj.attrs.oX = labelWidth / 2;
                        var tempObjAttr = currObj.children[1].attrs;

                        currObj.attrs.oX = labelWidth / 2;

                        var boxChanged;
                        if ((currObj.attrs.boxHeight > 0) || (currObj.attrs.boxWidth > 0)) {
                            if (currObj.attrs.orie == 0) {
                                boxChanged = true;
                            } else {
                                boxChanged = false;
                            }
                        } else {
                            boxChanged = false;
                        }

                        var textHeight = currObj.attrs.textHeight;
                        var textWidth = currObj.attrs.textWidth;


                        var iXadd, iTmpAngle, iSizePix, textWHeight, iSizePixX;
                        iSizePix = currObj.attrs.fontSize;
                        textWHeight = 0;

                        if ((boxChanged) && (currObj.attrs.boxWidth > 0)) {
                            iXadd = currObj.attrs.boxWidth;
                        } else {
                            iXadd = textWidth;
                            iSizePixX = iXadd;
                            iTmpAngle = currObj.attrs.orie;


                            if ((currObj.attrs.orie > 90) && (currObj.attrs.orie <= 180)) {
                                iTmpAngle = 180 - iTmpAngle;
                            }

                            if ((currObj.attrs.orie > 270) && (currObj.attrs.orie <= 360)) {
                                iTmpAngle = 360 - iTmpAngle;
                            }

                            textWidth = (iXadd * Math.cos(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
                            textWHeight = (iXadd * Math.sin(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.cos(iTmpAngle * (3.1456927 / 180)));
                            textHeight = (iXadd * Math.sin(iTmpAngle * (3.1456927 / 180)));
                            iXadd = (iXadd * Math.cos(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
                        }


                        switch (currObj.attrs.align) {
                            case "Right":
                                iXadd = iXadd;
                                break;
                            case "Center":
                                iXadd = iXadd / 2;
                                break;
                            case "Left":
                                iXadd = 0;
                                break;
                        }


                        var xpos = currObj.attrs.oX;
                        var ypos = currObj.attrs.oY;

                        var iXPix = xpos * dRatio;
                        var iYPix = ypos * dRatio;


                        var finalX, finalY;
                        var r1Left, r1Right, r1Top, r1Bottom;
                        var r2Left, r2Right, r2Top, r2Bottom;
                        var dBoxWidth, dBoxHeight;

                        if (boxChanged) {

                            r1Left = iXPix;
                            r1Right = parseFloat(r1Left) + parseFloat(currObj.attrs.boxWidth);
                            r1Top = iYPix;
                            if (currObj.attrs.boxHeight > 0) {
                                r1Bottom = parseFloat(r1Top) + parseFloat(currObj.attrs.boxHeight);
                            } else {
                                r1Bottom = parseFloat(r1Top) + parseFloat(textWHeight);
                            }

                            r2Left = r1Left / dRatio;
                            r2Right = r1Right / dRatio;
                            r2Top = r1Top / dRatio;
                            r2Bottom = r1Bottom / dRatio;

                            r2Right = parseFloat(r1Left) + (parseFloat(r2Right) - parseFloat(r2Left));
                            r2Bottom = parseFloat(r1Top) + (parseFloat(r2Bottom) - parseFloat(r2Top));

                            r2Top = r1Top;
                            r2Left = r1Left;

                            dBoxWidth = parseFloat(r2Right) - parseFloat(r2Left);
                            dBoxHeight = parseFloat(r2Bottom) - parseFloat(r2Top);

                            switch (currObj.attrs.align) {
                                case "Right":
                                    iXadd = dBoxWidth;
                                    break;
                                case "Center":
                                    iXadd = dBoxWidth / 2;
                                    break;
                                case "Left":
                                    iXadd = 0;
                                    break;
                            }

                            r2Left = parseFloat(r2Left) - parseFloat(iXadd);
                            r2Right = parseFloat(r2Right) - parseFloat(iXadd);

                            finalX = r2Left;
                            finalY = r2Top;
                        } else if ((currObj.attrs.orie >= 0) && (currObj.attrs.orie <= 90)) {
                            finalX = iXPix - iXadd;
                            finalY = iYPix + textHeight;
                        } else if ((currObj.attrs.orie > 90) && (currObj.attrs.orie <= 180)) {
                            finalX = iXPix - iXadd + (iSizePixX * Math.cos(iTmpAngle * (3.1456927 / 180)));
                            finalY = iYPix + textHeight + (iSizePix * Math.cos(iTmpAngle * (3.1456927 / 180)));
                        } else if ((currObj.attrs.orie > 180) && (currObj.attrs.orie <= 270)) {
                            finalX = iXPix - iXadd;
                            finalY = iYPix + (iSizePix * Math.cos((iTmpAngle - 180) * (3.1456927 / 180)));
                        } else if ((currObj.attrs.orie > 270) && (currObj.attrs.orie <= 360)) {
                            finalX = iXPix - iXadd + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
                            finalY = iYPix;
                        }

                        currObj.x(finalX);
                    }
                } else {
                    if (currObj.attrs.stroke == "Red") {
                        currObj.attrs.oX = labelWidth / 2;

                        var oXPos;

                        var height = (currObj.attrs.oHeight / 15) * dRatio;
                        var width = (currObj.attrs.oWidth / 15) * dRatio;

                        var tWidth = width / dRatio;
                        var tHeight = height / dRatio;

                        switch (currObj.attrs.align) {
                            case "Right":
                                oXPos = currObj.attrs.oX - tWidth;
                                break;
                            case "Center":
                                oXPos = currObj.attrs.oX - (tWidth / 2);
                                break;
                            case "Left":
                                oXPos = currObj.attrs.oX;
                                break;
                        }

                        var barXPos;

                        barXPos = RestrictBarcodeXToLabel(oXPos, tWidth, dRatio, pageViewerWidth);

                        oXPos = barXPos * dRatio;
                        if (currObj.attrs.type == 'Q') {
                            var offsetX = currObj.attrs.boxWidth / 2;
                            oXPos = oXPos + offsetX;
                        }
                        currObj.x(oXPos);
                    }
                }

                stage.add(layer);
                $('#labelChanged').text('true');
                $("#bSaveLabel").removeAttr("disabled");
                changeIconState(true);
            }
        });
        $('#centerVer').on('click', function () {
            var children = stage.find(".layer")[0].children;
            var childrenlength = children.length;
            var pageViewerHeight = $("#abcd").height();
            var pageViewerWidth = $("#abcd").width();
            var labelWidth = parseFloat($('#labelWidth').text()) / 15;
            var labelHeight = parseFloat($('#labelHeight').text()) / 15;
            var dYSum = 0;
            var iItemCnt = 0;
            for (var k = 0; k < childrenlength; k++) {
                var currObjs = children[k];
                if (currObjs.children) {
                    if (currObjs.children[0].attrs.stroke == "Red") {
                        dYSum = dYSum + currObjs.attrs.textHeight;
                        iItemCnt = iItemCnt + 1;
                    }
                } else {
                    if (currObjs.attrs.stroke == "Red") {
                        var height = (currObjs.attrs.oHeight / 15) * dRatio;
                        dYSum = dYSum + height;
                        iItemCnt = iItemCnt + 1;
                    }
                }
            }
            var dYAdd = (pageViewerHeight - dYSum) / (iItemCnt + 1);
            var dYOffset = dYAdd;
            for (var j = 0; j < childrenlength; j++) {
                var currObj = children[j];
                if (currObj.children) {
                    if (currObj.children[0].attrs.stroke == "Red") {
                        if (currObj.attrs.y != dYOffset) {
                            currObj.attrs.oY = dYOffset / dRatio;
                        }
                        var tempObjAttr = currObj.children[1].attrs;
                        var boxChanged;
                        if ((currObj.attrs.boxHeight > 0) || (currObj.attrs.boxWidth > 0)) {
                            if (currObj.attrs.orie == 0) {
                                boxChanged = true;
                            } else {
                                boxChanged = false;
                            }
                        } else {
                            boxChanged = false;
                        }
                        var textHeight = currObj.attrs.textHeight;
                        var textWidth = currObj.attrs.textWidth;
                        var iXadd, iTmpAngle, iSizePix, textWHeight, iSizePixX;
                        iSizePix = currObj.attrs.fontSize;
                        textWHeight = 0;
                        if ((boxChanged) && (currObj.attrs.boxWidth > 0)) {
                            iXadd = currObj.attrs.boxWidth;
                        } else {
                            iXadd = textWidth;
                            iSizePixX = iXadd;
                            iTmpAngle = currObj.attrs.orie;
                            if ((currObj.attrs.orie > 90) && (currObj.attrs.orie <= 180)) {
                                iTmpAngle = 180 - iTmpAngle;
                            }
                            if ((currObj.attrs.orie > 270) && (currObj.attrs.orie <= 360)) {
                                iTmpAngle = 360 - iTmpAngle;
                            }
                            textWidth = (iXadd * Math.cos(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
                            textWHeight = (iXadd * Math.sin(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.cos(iTmpAngle * (3.1456927 / 180)));
                            textHeight = (iXadd * Math.sin(iTmpAngle * (3.1456927 / 180)));
                            iXadd = (iXadd * Math.cos(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
                        }
                        switch (currObj.attrs.align) {
                            case "Right":
                                iXadd = iXadd;
                                break;
                            case "Center":
                                iXadd = iXadd / 2;
                                break;
                            case "Left":
                                iXadd = 0;
                                break;
                        }
                        var xpos = currObj.attrs.oX;
                        var ypos = currObj.attrs.oY;
                        var iXPix = xpos * dRatio;
                        var iYPix = ypos * dRatio;
                        var finalX, finalY;
                        var r1Left, r1Right, r1Top, r1Bottom;
                        var r2Left, r2Right, r2Top, r2Bottom;
                        var dBoxWidth, dBoxHeight;
                        if (boxChanged) {
                            r1Left = iXPix;
                            r1Right = parseFloat(r1Left) + parseFloat(currObj.attrs.boxWidth);
                            r1Top = iYPix;
                            if (currObj.attrs.boxHeight > 0) {
                                r1Bottom = parseFloat(r1Top) + parseFloat(currObj.attrs.boxHeight);
                            } else {
                                r1Bottom = parseFloat(r1Top) + parseFloat(textWHeight);
                            }
                            r2Left = r1Left / dRatio;
                            r2Right = r1Right / dRatio;
                            r2Top = r1Top / dRatio;
                            r2Bottom = r1Bottom / dRatio;
                            r2Right = parseFloat(r1Left) + (parseFloat(r2Right) - parseFloat(r2Left));
                            r2Bottom = parseFloat(r1Top) + (parseFloat(r2Bottom) - parseFloat(r2Top));
                            r2Top = r1Top;
                            r2Left = r1Left;
                            dBoxWidth = parseFloat(r2Right) - parseFloat(r2Left);
                            dBoxHeight = parseFloat(r2Bottom) - parseFloat(r2Top);
                            switch (currObj.attrs.align) {
                                case "Right":
                                    iXadd = dBoxWidth;
                                    break;
                                case "Center":
                                    iXadd = dBoxWidth / 2;
                                    break;
                                case "Left":
                                    iXadd = 0;
                                    break;
                            }
                            r2Left = parseFloat(r2Left) - parseFloat(iXadd);
                            r2Right = parseFloat(r2Right) - parseFloat(iXadd);

                            finalX = r2Left;
                            finalY = r2Top;
                        } else if ((currObj.attrs.orie >= 0) && (currObj.attrs.orie <= 90)) {
                            finalX = iXPix - iXadd;
                            finalY = iYPix + textHeight;
                        } else if ((currObj.attrs.orie > 90) && (currObj.attrs.orie <= 180)) {
                            finalX = iXPix - iXadd + (iSizePixX * Math.cos(iTmpAngle * (3.1456927 / 180)));
                            finalY = iYPix + textHeight + (iSizePix * Math.cos(iTmpAngle * (3.1456927 / 180)));
                        } else if ((currObj.attrs.orie > 180) && (currObj.attrs.orie <= 270)) {
                            finalX = iXPix - iXadd;
                            finalY = iYPix + (iSizePix * Math.cos((iTmpAngle - 180) * (3.1456927 / 180)));
                        } else if ((currObj.attrs.orie > 270) && (currObj.attrs.orie <= 360)) {
                            finalX = iXPix - iXadd + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
                            finalY = iYPix;
                        }
                        currObj.y(finalY);
                        dYOffset = dYOffset + dYAdd + currObj.attrs.textHeight;
                    }
                } else {
                    if (currObj.attrs.stroke == "Red") {
                        if (currObj.attrs.y != dYOffset) {
                            currObj.attrs.y = dYOffset;
                            currObj.attrs.oY = dYOffset / dRatio;
                        }
                        var oXPos = currObj.attrs.y;
                        var heights = (currObj.attrs.oHeight / 15) * dRatio;
                        currObj.y(oXPos);
                        dYOffset = dYOffset + dYAdd + heights;
                    }
                }
                stage.add(layer);
                $('#labelChanged').text('true');
                $("#bSaveLabel").removeAttr("disabled");
                changeIconState(true);
            }
        });
    }).fail(function (xhr, status) {
        ShowErrorMessge();
    });
});

function fn_AddTextReset() {
    if (myobject) {
        if (myobject.attrs.type == 'S') {
            $('#mdlAddText').resetControls();
            BindFontFamilies("fontNameText", myobject.attrs.fontFamily);
            $('#staticText').val(myobject.attrs.text.toString());
            $('#txtTextColor').colorpicker("val", myobject.attrs.fill);
            $('#txtBgColor').colorpicker("val", myobject.attrs.bColorHex);
            $('#fontNameText').val(myobject.attrs.fontFamily);
            $('#fontSizeText').val(myobject.attrs.font);
            $('input:radio[name=alignmentText][value=' + myobject.attrs.align + ']').attr('checked', 'checked');
            $('#boxHeightText').val(Math.round(myobject.attrs.boxHeight));
            $('#boxWidthText').val(Math.round(myobject.attrs.boxWidth));
            $('#fontOriText').val(myobject.attrs.orie);
            $("#strikethrutext").attr('checked', myobject.attrs.strikethru);
            $("#boldtext").attr('checked', myobject.attrs.bold);
            $("#italictext").attr('checked', myobject.attrs.italic);
            $("#underlinetext").attr('checked', myobject.attrs.underline);
            $("#transparenttext").attr('checked', myobject.attrs.trans);
            $('#staticText').focus();
            $('#editText').text("true");
        }
    } else {
        var containerHeight = $(".navbar-default").height();
        var containerWidth = $(".navbar-default").width();
        $('#mdlAddText').resetControls();
        $('#radiost1').attr('checked', 'checked');
        $('#boxHeightText').val(0);
        $('#boxWidthText').val(0);
        $('#fontSizeText').val(14);
        $('#fontSizeText').attr('max', Math.round(containerWidth * dRatio));
        $('#boxHeightText').attr('max', Math.round(containerHeight * dRatio));
        $('#boxWidthText').attr('max', Math.round(containerWidth * dRatio));
        $("#transparenttext").attr('checked', true);
        $('#txtTextColor').colorpicker("val", "#000000");
        $('#txtBgColor').colorpicker("val", "#ffffff");
        BindFontFamilies("fontNameText", "");
    }
}
function fn_AddTextObjLabel() {
    var form = $('#frmmdlAddText');
    if (form.valid()) {
        var save = false;
        var containerHeight = $(".navbar-default").height();
        var containerWidth = $(".navbar-default").width();
        var pageViewerHeight = $("#abcd").height();
        var pageViewerWidth = $("#abcd").width();
        var labelWidth = parseFloat($('#labelWidth').text()) / 15;
        var labelHeight = parseFloat($('#labelHeight').text()) / 15;
        var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;
        var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
        labelLeft = parseFloat(labelLeft);
        dRatio = 1;
        if (labelWidth != 0) {
            dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
        }

        var temp = $('#staticText').val();
        var editText = $('#editText').text();
        var type = 'S';
        var color = $('#txtTextColor').colorpicker("val");
        var fontFamily = $('#fontNameText').val();
        var fontSize = $('#fontSizeText').val();
        var bgColor = $('#txtBgColor').val();
        var alignment = $('input:radio[name=alignmentText]:checked').val();
        var boxHeight = $('#boxHeightText').val();
        var boxWidth = $('#boxWidthText').val();
        var orie = $('#fontOriText').val();
        var fontStyle;
        var strikethru = $("#strikethrutext").is(':checked');
        var bold = $("#boldtext").is(':checked');
        var italic = $("#italictext").is(':checked');
        var width = 0;
        var height = 0;
        var xpos = labelWidth / 2;
        var ypos = ((pageViewerHeight - height) / 2) / dRatio;
        barXPos = xpos;
        barYPos = ypos;

        if (bold) {
            fontStyle = "bold";
        }
        if (italic) {
            if (fontStyle) {
                fontStyle = fontStyle + " italic";
            } else {
                fontStyle = "italic";
            }
        } else {
            if (!fontStyle) {
                fontStyle = "normal";
            }
        }
        var underline = $("#underlinetext").is(':checked');
        var transparent = $("#transparenttext").is(':checked');
        if (myobject) {
            if (myobject.attrs.type == 'S' && editText == 'true') {
                myobject.remove();
                myline.remove();
                myStrike.remove();
                myRect.remove();
                mygroup.remove();
                drawText(temp.toString(), type, myobject.attrs.oX, myobject.attrs.oY, "", "", color, bgColor, fontFamily, fontSize, alignment, orie, fontStyle, transparent, underline, strikethru, "", "", boxHeight, boxWidth, save);
            } else {
                drawText(temp.toString(), type, barXPos, barYPos, "", "", color, bgColor, fontFamily, fontSize, alignment, orie, fontStyle, transparent, underline, strikethru, "", "", boxHeight, boxWidth, save);
            }
        } else {
            drawText(temp.toString(), type, barXPos, barYPos, "", "", color, bgColor, fontFamily, fontSize, alignment, orie, fontStyle, transparent, underline, strikethru, "", "", boxHeight, boxWidth, save);
        }
        $('#mdlAddText').HideModel();
        $('#labelChanged').text('true');
        $("#bSaveLabel").removeAttr("disabled");
    }
}
function fn_ResetAddNewLabel() {
    var id = $('#Id').val();
    if (id) {
        $('#editLabel').trigger("click");
    } else {
        $('#btnAddLabel').trigger("click");
    }
}
function fn_AddNewLabel() {
    var $form = $('#frmAddNewLabel');
    if ($form.valid()) {
        var serializedForm = $form.serialize() + "&pDrawLabels=" + $("#DrawLabels").is(':checked');
        $.post(urls.LabelManager.AddLabel, serializedForm).done(function (data) {
            var bIndex = false;
            if (data.errortype == 'w') {
                showAjaxReturnMessage(vrLabelManagerRes['magJsLabelMngLblNameExists'], 'w');
            } else if (data.errortype == 'e') {
                showAjaxReturnMessage(data.message, 'e');
            } else {
                if (FORM_HAS_CHANGED) {
                    showAjaxReturnMessage(data.message, data.errortype);
                }
                total_label_record = $('#sampling').val();
                if ($('.index').is(':visible')) {
                    bIndex = true;
                    $('.index').hide();
                    $('#label').show();
                }
                if (data.count) {
                    if (data.count < total_label_record) {
                        total_label_record = data.count;
                    }
                    current_label_tablename = $('#TableName').val();
                    if (data.count <= 1) {
                        getActionPage('');
                    }
                }
                SQL_STRING = $('#sqlString').val();
                var width = $('#stageWidth').val();
                var height = $('#stageHeight').val();
                $('#FormName').empty();
                $('#mdlAddNewLabel').HideModel();
                $('#newLabelName').text(String.format(vrCommonRes["LabelName"], $('#labelName').val()));
                $('#tableForLabel').text(String.format(vrCommonRes["UserTableName"], $('#TableName').val()));
                $('#labelID').text(data.labelId.toString());
                $('#labelHeight').text(height);
                $('#labelWidth').text(width);
                $('#barCodePrefix').text(data.barCodePrefix);
                if (bIndex) {
                    initialize(height, width);
                    if (data.onestripjob) {
                        var pOutputObject = $.parseJSON(data.onestripjobfields);
                        var pOnestripjobs = $.parseJSON(data.onestripjob);
                        $('#tableForLabel').text(String.format(vrCommonRes["UserTableName"], pOnestripjobs.TableName));
                        $('#labelID').text(pOnestripjobs.Id.toString());
                        drawExistingLabel(pOutputObject, 1);
                    }
                }
            }
            changeIconState(true);
        })
        .fail(function (xhr, status, error) { });
    }
}
function fn_ResetFieldObjLabel() {
    var tableName = $('#tableForLabel').text().split(":")[1].toString();
    if (myobject) {
        if (myobject.attrs.type == 'T') {
            $('#mdlAddFieldObj').resetControls();
            setTableFieldObj(SQL_STRING, myobject.attrs.field);
            BindFontFamilies("fontName", myobject.attrs.fontFamily);
            $('#startCharPosition').val(myobject.attrs.startChar);
            $('#maxChars').val(myobject.attrs.maxLen);
            $('#fieldTextColor').colorpicker("val", myobject.attrs.fill);
            $('#fieldBgColor').colorpicker("val", myobject.attrs.bColorHex);
            $('#fontName').val(myobject.attrs.fontFamily);
            $('#fontSize').val(myobject.attrs.font);
            $('input:radio[name=alignmentField][value=' + myobject.attrs.align + ']').attr('checked', 'checked');
            $('#boxHeight').val(Math.round(myobject.attrs.boxHeight));
            $('#boxWidth').val(Math.round(myobject.attrs.boxWidth));
            $('#fontOri').val(myobject.attrs.orie);
            $("#strikethru").attr('checked', myobject.attrs.strikethru);
            $("#bold").attr('checked', myobject.attrs.bold);
            $("#italic").attr('checked', myobject.attrs.italic);
            $("#underline").attr('checked', myobject.attrs.underline);
            $("#transparent").attr('checked', myobject.attrs.trans);
            $('#formatField').val(myobject.attrs.format);
            $('#editField').text("true");
        }
    } else {
        var containerHeight = parseFloat($("#abcd").height().toString());
        var containerWidth = parseFloat($("#abcd").width().toString());
        $('#mdlAddFieldObj').resetControls();
        $('#radiosf1').attr('checked', 'checked');
        $('#startCharPosition').val(0);
        $('#maxChars').val(0);
        $('#boxHeight').val(0);
        $('#boxWidth').val(0);
        $('#fontSize').val(14);
        $('#fontSize').attr('max', Math.round(containerWidth * dRatio));
        $('#boxHeight').attr('max', Math.round(containerWidth * dRatio));
        $('#boxWidth').attr('max', Math.round(containerWidth * dRatio));
        $("#transparent").attr('checked', true);
        setTableFieldObj(SQL_STRING, "");
        BindFontFamilies("fontName", "");
        $('#fieldTextColor').colorpicker("val", "#000000");
        $('#fieldBgColor').colorpicker("val", "#ffffff");
    }
}
function fn_AddFieldObjLabel() {
    var form = $('#frmmdlAddFieldObj');
    if (form.valid()) {
        var save = false;
        var containerHeight = $(".navbar-default").height();
        var containerWidth = $(".navbar-default").width();
        var pageViewerHeight = $("#abcd").height();
        var pageViewerWidth = $("#abcd").width();

        var labelWidth = parseFloat($('#labelWidth').text()) / 15;
        var labelHeight = parseFloat($('#labelHeight').text()) / 15;

        var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;
        var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
        labelLeft = parseFloat(labelLeft);

        dRatio = 1;
        if (labelWidth != 0) {
            dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
        }

        var tableName = $('#tableForLabel').text().split(":")[1].toString();
        var fieldName = $('#fieldNameObj').val();
        var editField = $('#editField').text();
        var format = $('#formatField').val();
        var color = $('#fieldTextColor').colorpicker("val");
        var fontFamily = $('#fontName').val();
        var fontSize = $('#fontSize').val();
        var bgColor = $('#fieldBgColor').colorpicker("val");
        var startChar = $('#startCharPosition').val();
        var maxLen = $('#maxChars').val();

        var alignment = $('input:radio[name=alignmentField]:checked').val();
        var boxHeight = $('#boxHeight').val();
        var boxWidth = $('#boxWidth').val();
        var orie = $('#fontOri').val();
        var fontStyle;
        var strikethru = $("#strikethru").is(':checked');
        var bold = $("#bold").is(':checked');
        if (bold) {
            fontStyle = "bold";
        }
        var italic = $("#italic").is(':checked');
        if (italic) {
            if (fontStyle) {
                fontStyle = fontStyle + " italic";
            } else {
                fontStyle = "italic";
            }
        } else {
            if (!fontStyle) {
                fontStyle = "normal";
            }
        }
        var underline = $("#underline").is(':checked');
        var transparent = $("#transparent").is(':checked');
        var width = 0;
        var height = 0;
        var xpos = labelWidth / 2;
        var ypos = ((pageViewerHeight - height) / 2) / dRatio;
        barXPos = xpos;
        barYPos = ypos;
        $.post(urls.LabelManager.GetFirstValue, { table: tableName, field: fieldName, SQL_String: SQL_STRING }).done(function (data) {
            var fValue;
            if (data.value) {
                fValue = data.value;
            } else {
                fValue = 0;
            }

            var tmpFormat;
            startChar = parseInt(startChar);
            maxLen = parseInt(maxLen);
            if (fValue != 0) {
                if (startChar != 0) {
                    if (maxLen != 0) {
                        fValue = fValue.substring(startChar - 1, startChar - 1 + maxLen);
                    } else {
                        fValue = fValue.substring(startChar - 1);
                    }
                } else {
                    if (maxLen != 0) {
                        fValue = fValue.substring(maxLen, startChar);
                    }
                }
            }
            if (fieldName.toLowerCase().indexOf("date") >= 0) {
                //Changed by Hasmukh on 06/15/2016 for date format changes - 6
                if (fValue.length > 9) {
                    //fValue = moment(fValue).format(getDatePreferenceCookieForMoment().toUpperCase());
                    var dateFormated = ConvertStringDateinDate(fValue, true);
                    //var dateFormated = new Date('2016-01-01 12:00:00 AM');
                    var dtFormat = getDatePreferenceCookieForMoment(true);
                    fValue = moment(dateFormated).format(dtFormat);
                    if (parseInt(dateFormated.getHours()) <= 12)
                        fValue = fValue + ' AM';
                    else
                        fValue = fValue + ' PM';
                }
            }
            if (fValue != 0) {
                if (format) {
                    if (fieldName.toLowerCase().indexOf("date") >= 0) {
                        //var date = new Date(fValue);
                        fValue = fValue;
                    } else {
                        var tempFValue, tFormat;
                        tempFormat = format.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                        if (tempFormat != format) {
                            var fLength = tempFormat.length;
                            tFormat = tempFormat.substring(0, fLength - 1);
                            tempFValue = tFormat + fValue;
                            fValue = tempFValue;
                        } else {
                            fValue = fValue;
                        }
                    }
                }
            }
            if (fValue) {
                fValue = fValue.toString();
            }
            var type = "T";
            if (myobject) {
                if (myobject.attrs.type == 'T' && editField == 'true') {
                    barXPos = myobject.attrs.oX;
                    barYPos = myobject.attrs.oY;
                    myobject.remove();
                    myline.remove();
                    myStrike.remove();
                    myRect.remove();
                    mygroup.remove();
                }
            }
            drawText(fValue, type, barXPos, barYPos, fieldName, "", color, bgColor, fontFamily, fontSize, alignment, orie, fontStyle, transparent, underline, strikethru, startChar, maxLen, boxHeight, boxWidth, format, save);
        })
                   .fail(function (xhr, status, error) { });
        $('#mdlAddFieldObj').HideModel();
        $('#labelChanged').text('true');
        $("#bSaveLabel").removeAttr("disabled");
    }
}
function fn_AddQRCodeLabel() {
    var form = $('#frmMdlAddQR');
    var barCodePrefix = $('#barCodePrefix').text();
    var format = $('#fieldFormatQR').val();
    var valid = true;
    var tempFormat;
    var length = barCodePrefix.length;
    tempFormat = format.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    tmpFormat = tempFormat.substring(0, length);
    if (format != "" && tmpFormat.toLowerCase() != barCodePrefix.toLowerCase()) {
        $(this).confirmModal({
            confirmTitle: 'TAB FusionRMS',
            confirmMessage: vrLabelManagerRes['magJsLabelMngFormatNotMatched'],
            confirmOk: vrCommonRes['Yes'],
            confirmCancel: vrCommonRes['No'],
            confirmStyle: 'default',
            confirmCallback: function (e) {
                var format = $('#fieldFormatQR').val();
                format = format.replace(tmpFormat, barCodePrefix);
                $('#origFormat').text('true');
                valid = true;

                if (form.valid()) {
                    var save = false;
                    var containerHeight = $(".navbar-default").height();
                    var containerWidth = $(".navbar-default").width();
                    var pageViewerHeight = $("#abcd").height();
                    var pageViewerWidth = $("#abcd").width();
                    var labelWidth = parseFloat($('#labelWidth').text()) / 15;
                    var labelHeight = parseFloat($('#labelHeight').text()) / 15;
                    var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;
                    var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
                    labelLeft = parseFloat(labelLeft);
                    dRatio = 1;
                    if (labelWidth != 0) {
                        dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
                    }
                    var tableName = $('#tableForLabel').text().split(":")[1].toString();
                    var fieldName = $('#fieldNameQR').val();
                    var width, height;
                    var qrWidth = $('#qrWidth').val();
                    if (qrWidth) {
                        width = (qrWidth / 15);
                        height = width;
                    } else {
                        width = (144 / dRatio) + 0.133;
                        height = (144 / dRatio) + 0.133;
                    }
                    $('#qrWidth').val(Math.round(width));
                    $('#qrHeight').val(Math.round(height));
                    var barType = $('#eccType').val();
                    var editQR = $('#editQR').text();
                    var bcstyle = document.getElementById("eccType").selectedIndex + 1;
                    var type = "Q";
                    var color = $('#qrTextColor').colorpicker("val");
                    var bgColor = $('#qrBgColor').colorpicker("val");
                    var startChar = $('#qrStartCharPosition').val();
                    var maxLen = $('#qrMaxChars').val();
                    var alignment = $('input:radio[name=alignmentQR]:checked').val();
                    var quiteZone = $('#qrQuite').val();
                    var orientation = $('#qrOrie').val();
                    var xpos = labelWidth / 2;
                    var ypos = ((pageViewerHeight - height) / 2) / dRatio;
                    barXPos = xpos;
                    barYPos = ypos;
                    if (myobject) {
                        if (myobject.attrs.type == 'Q' && editQR == 'true') {
                            xpos = myobject.attrs.oX;
                            ypos = myobject.attrs.oY;
                            myobject.remove();
                            $('#editQR').text('false');
                            barXPos = xpos;
                            barYPos = ypos;
                        }
                    }
                    displayWidth = width * dRatio;
                    displayHeight = height * dRatio;
                    if (!width) { width = 100; }
                    if (!height) { height = 100; }
                    $.post(urls.LabelManager.GetFirstValue, { table: tableName, field: fieldName, SQL_String: SQL_STRING })
                               .done(function (data) {
                                   var fValue;
                                   if (data.value) {
                                       fValue = data.value;
                                   } else {
                                       fValue = 0;
                                   }
                                   startChar = parseInt(startChar);
                                   maxLen = parseInt(maxLen);
                                   if (fValue != 0) {
                                       if (startChar != 0) {
                                           if (maxLen != 0) {
                                               fValue = fValue.substring(startChar - 1, startChar - 1 + maxLen);
                                           } else {
                                               fValue = fValue.substring(startChar - 1);
                                           }
                                       } else {
                                           if (maxLen != 0) {
                                               fValue = fValue.substring(maxLen, startChar);
                                           }
                                       }
                                   }
                                   if (fieldName.toLowerCase().indexOf("date") >= 0) {
                                       //Changed by Hasmukh on 06/15/2016 for date format changes - 2
                                       if (fValue.length > 9) {
                                           //fValue = moment(fValue).format(getDatePreferenceCookieForMoment().toUpperCase());
                                           var dateFormated = ConvertStringDateinDate(fValue, true);
                                           fValue = moment(dateFormated).format(getDatePreferenceCookieForMoment(true));
                                       }
                                   }
                                   if (fValue != 0) {
                                       if (format) {
                                           if (fieldName.toLowerCase().indexOf("date") >= 0) {
                                               //if (format != barCodePrefix) {
                                               //var date = new Date(fValue);
                                               //fValue = date.toString();
                                               //} else {
                                               fValue = fValue;
                                               //fValue = moment(fValue).format(getDatePreferenceCookieForMoment().toUpperCase());
                                               //}
                                           } else {
                                               var tempFValue, tFormat;
                                               tempFormat = format.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                                               if (tempFormat != format) {
                                                   var fLength = tempFormat.length;
                                                   tFormat = tempFormat.substring(0, fLength - 1);
                                                   tempFValue = tFormat + fValue;
                                                   fValue = tempFValue;
                                               } else {
                                                   fValue = fValue;
                                               }
                                           }
                                       }
                                   }
                                   var imageObj = new Image();
                                   var options = {
                                       ecLevel: barType,
                                       fill: color,
                                       background: bgColor,
                                       text: fValue.toString(),
                                       quiet: quiteZone,
                                       size: displayWidth
                                   };
                                   $('#output').empty();
                                   $('#output').qrcode(options);
                                   var canvas = $('#output canvas');
                                   imageObj.src = canvas.get(0).toDataURL("image/png");
                                   drawImage(imageObj, displayWidth, displayHeight, fieldName, type, bcstyle, barXPos, barYPos, "", color, bgColor, alignment, startChar, maxLen, format, quiteZone, orientation, "", save);
                               })
                               .fail(function (xhr, status, error) { });
                    $('#mdlAddQRCode').HideModel();
                    $('#labelChanged').text('true');
                    $("#bSaveLabel").removeAttr("disabled");
                }
            },
            confirmCallbackCancel: function (e) {
                format = format;
                $('#origFormat').text('');
                valid = false;
            }
        });
    } else {
        if (form.valid()) {
            var save = false;
            var containerHeight = $(".navbar-default").height();
            var containerWidth = $(".navbar-default").width();

            var pageViewerHeight = $("#abcd").height();
            var pageViewerWidth = $("#abcd").width();

            var labelWidth = parseFloat($('#labelWidth').text()) / 15;
            var labelHeight = parseFloat($('#labelHeight').text()) / 15;

            var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;;

            var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
            labelLeft = parseFloat(labelLeft);

            dRatio = 1;

            if (labelWidth != 0) {
                dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
            }

            var tableName = $('#tableForLabel').text().split(":")[1].toString();
            var fieldName = $('#fieldNameQR').val();

            var width, height;

            var qrWidth = $('#qrWidth').val();

            if (qrWidth) {
                width = (qrWidth / 15);
                height = width;
            } else {
                width = (144 / dRatio) + 0.133;
                height = (144 / dRatio) + 0.133;
            }

            $('#qrWidth').val(Math.round(width));
            $('#qrHeight').val(Math.round(height));

            var barType = $('#eccType').val();
            var editQR = $('#editQR').text();
            var bcstyle = document.getElementById("eccType").selectedIndex + 1;
            var type = "Q";
            var color = $('#qrTextColor').colorpicker("val");

            var bgColor = $('#qrBgColor').colorpicker("val");
            var startChar = $('#qrStartCharPosition').val();
            var maxLen = $('#qrMaxChars').val();

            var alignment = $('input:radio[name=alignmentQR]:checked').val();

            var quiteZone = $('#qrQuite').val();
            var orientation = $('#qrOrie').val();

            var xpos = labelWidth / 2;
            var ypos = ((pageViewerHeight - height) / 2) / dRatio;

            barXPos = xpos;
            barYPos = ypos;

            if (myobject) {
                if (myobject.attrs.type == 'Q' && editQR == 'true') {
                    xpos = myobject.attrs.oX;
                    ypos = myobject.attrs.oY;
                    myobject.remove();
                    $('#editQR').text('false');
                    barXPos = xpos;
                    barYPos = ypos;
                }
            }
            displayWidth = width * dRatio;
            displayHeight = height * dRatio;
            if (!width) { width = 100; }
            if (!height) { height = 100; }
            $.post(urls.LabelManager.GetFirstValue, { table: tableName, field: fieldName, SQL_String: SQL_STRING })
                       .done(function (data) {
                           var fValue;
                           if (data.value) {
                               fValue = data.value;
                           } else {
                               fValue = 0;
                           }
                           startChar = parseInt(startChar);
                           maxLen = parseInt(maxLen);
                           if (fValue != 0) {
                               if (startChar != 0) {
                                   if (maxLen != 0) {
                                       fValue = fValue.substring(startChar - 1, startChar - 1 + maxLen);
                                   } else {
                                       fValue = fValue.substring(startChar - 1);
                                   }
                               } else {
                                   if (maxLen != 0) {
                                       fValue = fValue.substring(maxLen, startChar);
                                   }
                               }
                           }
                           if (fieldName.toLowerCase().indexOf("date") >= 0) {
                               //Changed by Hasmukh on 06/15/2016 for date format changes - 3
                               if (fValue.length > 9) {
                                   //fValue = moment(fValue).format(getDatePreferenceCookieForMoment().toUpperCase());
                                   var dateFormated = ConvertStringDateinDate(fValue, true);
                                   fValue = moment(dateFormated).format(getDatePreferenceCookieForMoment(true));
                               }
                           }
                           if (fValue != 0) {
                               if (format) {
                                   if (fieldName.toLowerCase().indexOf("date") >= 0) {
                                       //if (format != barCodePrefix) {
                                       //  var date = new Date(fValue);
                                       //fValue = date.toString();
                                       //} else {
                                       fValue = fValue;
                                       //}
                                   } else {
                                       var tempFValue, tFormat;
                                       tempFormat = format.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                                       if (tempFormat != format) {
                                           var fLength = tempFormat.length;
                                           tFormat = tempFormat.substring(0, fLength - 1);
                                           tempFValue = tFormat + fValue;
                                           fValue = tempFValue;
                                       } else {
                                           fValue = fValue;
                                       }
                                   }
                               }
                           }
                           var imageObj = new Image();
                           var options = {
                               ecLevel: barType,
                               fill: color,
                               background: bgColor,
                               text: fValue.toString(),
                               quiet: quiteZone,
                               size: displayWidth
                           };
                           $('#output').empty();
                           $('#output').qrcode(options);
                           var canvas = $('#output canvas');
                           imageObj.src = canvas.get(0).toDataURL("image/png");
                           drawImage(imageObj, displayWidth, displayHeight, fieldName, type, bcstyle, barXPos, barYPos, "", color, bgColor, alignment, startChar, maxLen, format, quiteZone, orientation, "", save);
                       })
                       .fail(function (xhr, status, error) { });
            $('#mdlAddQRCode').HideModel();
            $('#labelChanged').text('true');
            $("#bSaveLabel").removeAttr("disabled");
        }
    }
}
function fn_ResetQRCode() {
    var tableName = $('#tableForLabel').text().split(":")[1].toString();
    if (myobject) {
        if (myobject.attrs.type == 'Q') {
            $('#mdlAddQRCode').resetControls();
            $('#qrTextColor').colorpicker("val", myobject.attrs.textHexColor);
            $('#qrBgColor').colorpicker("val", myobject.attrs.backHexColor);
            $('#fieldFormatQR').val(myobject.attrs.format);
            setTableFieldQR(SQL_STRING, myobject.attrs.field.toString());
            $('#qrWidth').val(Math.round(myobject.attrs.oWidth).toString());
            $('#qrHeight').val(Math.round(myobject.attrs.oHeight).toString());
            var bcstyle = ConvertToQRType(myobject.attrs.bcstyle);
            $('#eccType').val(bcstyle);
            $('#qrStartCharPosition').val(myobject.attrs.startChar);
            $('#qrMaxChars').val(myobject.attrs.maxLen);
            $('input:radio[name=alignmentQR][value=' + myobject.attrs.align + ']').attr('checked', 'checked');
            $('#qrQuite').val(myobject.attrs.upc);
            $('#qrOrie').val(myobject.attrs.direc);
            $('#editQR').text("true");
        }
    } else {
        var containerHeight = parseFloat($("#abcd").height().toString());
        var containerWidth = parseFloat($("#abcd").width().toString());
        $('#mdlAddQRCode').resetControls();
        $('#qrWidth').attr('max', Math.round(containerWidth * dRatio));
        $('#radiosqr1').attr('checked', 'checked');
        $('#qrStartCharPosition').val(0);
        $('#qrMaxChars').val(0);
        $('#qrBoxHeight').val(0);
        $('#qrBoxWidth').val(0);
        $('#qrBarWidth').val(0);
        $('#qrWidth').val(Math.round(((144 / dRatio) + 0.13333) * 15));
        $('#qrHeight').val(Math.round(((144 / dRatio) + 0.13333) * 15));
        $('#firstQR').text('true');
        setTableFieldQR(SQL_STRING, "");
    }
}
function fn_AddBarCodeLabel() {
    var $form = $('#frmAddBarCode');
    var barCodePrefix = $('#barCodePrefix').text();
    var format = $('#fieldFormat').val();
    var valid = true;
    var tempFormat;
    var length = barCodePrefix.length;
    tempFormat = format.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    tmpFormat = tempFormat.substring(0, length);
    if (format != "" && tmpFormat.toLowerCase() != barCodePrefix.toLowerCase()) {
        $(this).confirmModal({
            confirmTitle: 'TAB FusionRMS',
            confirmMessage: vrLabelManagerRes['magJsLabelMngFormatNotMatched'],
            confirmOk: vrCommonRes['Yes'],
            confirmCancel: vrCommonRes['No'],
            confirmStyle: 'default',
            confirmCallback: function (e) {
                var format = $('#fieldFormat').val();
                format = format.replace(tmpFormat, barCodePrefix);
                $('#origFormat').text('true');
                valid = true;

                if ($form.valid()) {
                    var save = false;
                    var containerHeight = $(".navbar-default").height();
                    var containerWidth = $(".navbar-default").width();

                    var pageViewerHeight = $("#abcd").height();
                    var pageViewerWidth = $("#abcd").width();

                    var labelWidth = parseFloat($('#labelWidth').text()) / 15;
                    var labelHeight = parseFloat($('#labelHeight').text()) / 15;

                    var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;;


                    var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
                    labelLeft = parseFloat(labelLeft);

                    dRatio = 1;

                    if (labelWidth != 0) {
                        dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
                    }

                    var tableName = $('#tableForLabel').text().split(":")[1].toString();
                    var fieldName = $('#fieldName').val();

                    var barcodeWidth = $('#barWidth').val();
                    var barcodeHeight = $('#barHeight').val();
                    var labelWidths, labelHeights;
                    if (barcodeWidth) {
                        labelWidths = barcodeWidth / 15;
                    }

                    if (barcodeHeight) {
                        labelHeights = barcodeHeight / 15;
                    }

                    var width = labelWidths;
                    var height = labelHeights;
                    $('#barWidth').val(Math.round(width));
                    $('#barHeight').val(Math.round(height));
                    var barType = $('#barType').val();
                    var editBar = $('#editBar').text();
                    var bcstyle = document.getElementById("barType").selectedIndex + 1;
                    var color = $('#barTextColor').colorpicker("val");

                    var bgColor = $('#barBgColor').colorpicker("val");
                    var startChar = $('#barStartCharPosition').val();
                    var maxLen = $('#barMaxChars').val();

                    var alignment = $('input:radio[name=alignmentBar]:checked').val();

                    var UPC = $('#barUPC').val();
                    var directiron = $('#barDirec').val();
                    var barWidth = $('#barBarWidth').val();

                    var type = "B";

                    var xpos, ypos;

                    if (FIRST_BAR_CODE) {
                        xpos = labelWidth / 2;
                        var heights = labelHeight / 5;
                        ypos = ((pageViewerHeight - heights) / 2) / dRatio;
                    } else {
                        xpos = labelWidths / 2;
                        ypos = ((pageViewerHeight - height) / 2) / dRatio;
                    }

                    barXPos = xpos;
                    barYPos = ypos;

                    if (myobject) {
                        if (myobject.attrs.type == 'B' && editBar == 'true') {
                            xpos = myobject.attrs.oX;
                            ypos = myobject.attrs.oY;

                            myobject.remove();
                            $('#editBar').text('false');

                            barXPos = xpos;
                            barYPos = ypos;
                        }
                    }

                    displayWidth = width * dRatio;
                    displayHeight = height * dRatio;

                    $.post(urls.LabelManager.GetFirstValue, { table: tableName, field: fieldName, SQL_String: SQL_STRING })
                               .done(function (data) {
                                   var fValue;
                                   if (data.value) {
                                       fValue = data.value;
                                   } else {
                                       fValue = 0;
                                   }
                                   var tmpFormat;
                                   startChar = parseInt(startChar);
                                   maxLen = parseInt(maxLen);
                                   if (fValue != 0) {
                                       if (startChar != 0) {
                                           if (maxLen != 0) {
                                               fValue = fValue.substring(startChar - 1, startChar - 1 + maxLen);
                                           } else {
                                               fValue = fValue.substring(startChar - 1);
                                           }
                                       } else {
                                           if (maxLen != 0) {
                                               fValue = fValue.substring(maxLen, startChar);
                                           }
                                       }
                                   }

                                   if (fieldName.toLowerCase().indexOf("date") >= 0) {
                                       //Changed by Hasmukh on 06/15/2016 for date format changes - 4
                                       if (fValue.length > 9) {
                                           //fValue = moment(fValue).format(getDatePreferenceCookieForMoment().toUpperCase());
                                           var dateFormated = ConvertStringDateinDate(fValue, true);
                                           fValue = moment(dateFormated).format(getDatePreferenceCookieForMoment(true));
                                       }
                                   }
                                   if (fValue != 0) {
                                       if (format) {
                                           if (fieldName.toLowerCase().indexOf("date") >= 0) {
                                               //if (format != barCodePrefix) {
                                               //  var date = new Date(fValue);
                                               //  fValue = date.toString();
                                               //} else {
                                               fValue = fValue;

                                               //}
                                           } else {
                                               var tempFValue, tFormat;
                                               tempFormat = format.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                                               if (tempFormat != format) {
                                                   var fLength = tempFormat.length;
                                                   tFormat = tempFormat.substring(0, fLength - 1);
                                                   tempFValue = tFormat + fValue;
                                                   fValue = tempFValue;
                                               } else {
                                                   fValue = fValue;
                                               }
                                           }
                                       }
                                   }
                                   var finalBarType;
                                   switch (barType) {
                                       case 'EAN':
                                           if (fValue != '1234567890128') {
                                               finalBarType = 'CODE128';
                                           }
                                           break;
                                       case 'UPC':
                                           if (fValue != '123456789999') {
                                               finalBarType = 'CODE128';
                                           }
                                           break;
                                       case 'ITF14':
                                           if (fValue != '10012450017') {
                                               finalBarType = 'CODE128';
                                           }
                                           break;
                                       case 'ITF':
                                           if (!isNaN(fValue)) {
                                               if (fValue.length % 2 != 0) {
                                                   finalBarType = 'CODE128';
                                               }
                                           }
                                           break;
                                   }
                                   if (finalBarType) {
                                       barType = finalBarType;
                                   }

                                   var imageObj = new Image();
                                   imageObj.id = fValue;

                                   imageObj.height = Math.round(displayHeight);
                                   imageObj.width = Math.round(displayWidth);

                                   if (imageObj.height == 0) {
                                       imageObj.height = 1;
                                   }

                                   if (imageObj.width == 0) {
                                       imageObj.width = 1;
                                   }

                                   var imgID = imageObj.getAttribute('id');

                                   if (barWidth != 0) {
                                       $('#tempimg').JsBarcode(fValue.toString(), { height: displayHeight, format: barType, lineColor: color, width: barWidth, backgroundColor: bgColor });
                                   } else {
                                       $('#tempimg').JsBarcode(fValue.toString(), { height: displayHeight, format: barType, lineColor: color, backgroundColor: bgColor });
                                   }
                                   var loc = $('#tempimg').attr("src");

                                   imageObj.src = loc;
                                   drawImage(imageObj, displayWidth, displayHeight, fieldName, type, bcstyle, barXPos, barYPos, "", color, bgColor, alignment, startChar, maxLen, format, UPC, directiron, barWidth, save);
                               })
                               .fail(function (xhr, status, error) {

                               });
                    $('#mdlAddBarCode').HideModel();
                    $('#labelChanged').text('true');
                    $("#bSaveLabel").removeAttr("disabled");
                }
            },
            confirmCallbackCancel: function (e) {
                format = format;
                $('#origFormat').text('');
                valid = false;

            }
        });
    } else {
        if ($form.valid()) {
            var save = false;
            var containerHeight = $(".navbar-default").height();
            var containerWidth = $(".navbar-default").width();

            var pageViewerHeight = $("#abcd").height();
            var pageViewerWidth = $("#abcd").width();

            var labelWidth = parseFloat($('#labelWidth').text()) / 15;
            var labelHeight = parseFloat($('#labelHeight').text()) / 15;

            var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;;


            var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
            labelLeft = parseFloat(labelLeft);

            dRatio = 1;

            if (labelWidth != 0) {
                dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
            }

            var tableName = $('#tableForLabel').text().split(":")[1].toString();
            var fieldName = $('#fieldName').val();

            var barcodeWidth = $('#barWidth').val();
            var barcodeHeight = $('#barHeight').val();
            var labelWidths, labelHeights;
            if (barcodeWidth) {
                labelWidths = barcodeWidth / 15;
            }

            if (barcodeHeight) {
                labelHeights = barcodeHeight / 15;
            }

            var width = labelWidths;
            var height = labelHeights;
            $('#barWidth').val(Math.round(width));
            $('#barHeight').val(Math.round(height));
            var barType = $('#barType').val();
            var editBar = $('#editBar').text();
            var bcstyle = document.getElementById("barType").selectedIndex + 1;
            var color = $('#barTextColor').colorpicker("val");

            var bgColor = $('#barBgColor').colorpicker("val");
            var startChar = $('#barStartCharPosition').val();
            var maxLen = $('#barMaxChars').val();

            var alignment = $('input:radio[name=alignmentBar]:checked').val();

            var UPC = $('#barUPC').val();
            var directiron = $('#barDirec').val();
            var barWidth = $('#barBarWidth').val();

            var type = "B";

            var xpos, ypos;

            if (FIRST_BAR_CODE) {
                xpos = labelWidth / 2;
                var heights = labelHeight / 5;
                ypos = ((pageViewerHeight - heights) / 2) / dRatio;
            } else {
                xpos = labelWidths / 2;
                ypos = ((pageViewerHeight - height) / 2) / dRatio;
            }

            barXPos = xpos;
            barYPos = ypos;

            if (myobject) {
                if (myobject.attrs.type == 'B' && editBar == 'true') {
                    xpos = myobject.attrs.oX;
                    ypos = myobject.attrs.oY;

                    myobject.remove();
                    $('#editBar').text('false');

                    barXPos = xpos;
                    barYPos = ypos;
                }
            }

            displayWidth = width * dRatio;
            displayHeight = height * dRatio;

            $.post(urls.LabelManager.GetFirstValue, { table: tableName, field: fieldName, SQL_String: SQL_STRING })
                       .done(function (data) {
                           var fValue;
                           if (data.value) {
                               fValue = data.value;
                           } else {
                               fValue = 0;
                           }
                           var tmpFormat;


                           startChar = parseInt(startChar);
                           maxLen = parseInt(maxLen);
                           if (fValue != 0) {
                               if (startChar != 0) {
                                   if (maxLen != 0) {
                                       fValue = fValue.substring(startChar - 1, startChar - 1 + maxLen);
                                   } else {
                                       fValue = fValue.substring(startChar - 1);
                                   }
                               } else {
                                   if (maxLen != 0) {
                                       fValue = fValue.substring(maxLen, startChar);
                                   }
                               }
                           }

                           if (fieldName.toLowerCase().indexOf("date") >= 0) {
                               //Changed by Hasmukh on 06/15/2016 for date format changes - 5
                               if (fValue.length > 9) {
                                   //fValue = moment(fValue).format(getDatePreferenceCookieForMoment().toUpperCase());
                                   var dateFormated = ConvertStringDateinDate(fValue, true);
                                   fValue = moment(dateFormated).format(getDatePreferenceCookieForMoment(true));
                               }
                           }
                           if (fValue != 0) {
                               if (format) {
                                   if (fieldName.toLowerCase().indexOf("date") >= 0) {
                                       //if (format != barCodePrefix) {
                                       //var date = new Date(fValue);
                                       //fValue = date.toString();
                                       //} else {
                                       fValue = fValue;
                                       //}
                                   } else {
                                       var tempFValue, tFormat;
                                       tempFormat = format.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                                       if (tempFormat != format) {
                                           var fLength = tempFormat.length;
                                           tFormat = tempFormat.substring(0, fLength - 1);
                                           tempFValue = tFormat + fValue;
                                           fValue = tempFValue;
                                       } else {
                                           fValue = fValue;
                                       }
                                   }
                               }
                           }
                           var finalBarType;
                           switch (barType) {
                               case 'EAN':
                                   if (fValue != '1234567890128') {
                                       finalBarType = 'CODE128';
                                   }
                                   break;
                               case 'UPC':
                                   if (fValue != '123456789999') {
                                       finalBarType = 'CODE128';
                                   }
                                   break;
                               case 'ITF14':
                                   if (fValue != '10012450017') {
                                       finalBarType = 'CODE128';
                                   }
                                   break;
                               case 'ITF':
                                   if (!isNaN(fValue)) {
                                       if (fValue.length % 2 != 0) {
                                           finalBarType = 'CODE128';
                                       }
                                   }
                                   break;
                           }
                           if (finalBarType) {
                               barType = finalBarType;
                           }

                           var imageObj = new Image();
                           imageObj.id = fValue;

                           imageObj.height = Math.round(displayHeight);
                           imageObj.width = Math.round(displayWidth);

                           if (imageObj.height == 0) {
                               imageObj.height = 1;
                           }

                           if (imageObj.width == 0) {
                               imageObj.width = 1;
                           }

                           var imgID = imageObj.getAttribute('id');

                           if (barWidth != 0) {
                               $('#tempimg').JsBarcode(fValue.toString(), { height: displayHeight, format: barType, lineColor: color, width: barWidth, backgroundColor: bgColor });
                           } else {
                               $('#tempimg').JsBarcode(fValue.toString(), { height: displayHeight, format: barType, lineColor: color, backgroundColor: bgColor });
                           }
                           var loc = $('#tempimg').attr("src");

                           imageObj.src = loc;
                           drawImage(imageObj, displayWidth, displayHeight, fieldName, type, bcstyle, barXPos, barYPos, "", color, bgColor, alignment, startChar, maxLen, format, UPC, directiron, barWidth, save);
                       })
                       .fail(function (xhr, status, error) {

                       });
            $('#mdlAddBarCode').HideModel();
            $('#labelChanged').text('true');
            $("#bSaveLabel").removeAttr("disabled");
        }
    }
}
function fn_ResetBarCode() {
    var tableName = $('#tableForLabel').text().split(":")[1].toString();
    if (myobject) {
        if (myobject.attrs.type == 'B') {
            $('#mdlAddBarCode').resetControls();
            $('#barTextColor').colorpicker("val", myobject.attrs.textHexColor);
            $('#barBgColor').colorpicker("val", myobject.attrs.backHexColor);
            setTableField(SQL_STRING, myobject.attrs.field.toString());
            $('#barWidth').val(Math.round(myobject.attrs.oWidth).toString());
            $('#barHeight').val(Math.round(myobject.attrs.oHeight).toString());
            var bcstyle = ConvertToBCType(myobject.attrs.bcstyle);
            $('#barType').val(bcstyle);
            $('#barStartCharPosition').val(myobject.attrs.startChar);
            $('#barMaxChars').val(myobject.attrs.maxLen);
            $('input:radio[name=alignmentBar][value=' + myobject.attrs.align + ']').attr('checked', 'checked');
            $('#barUPC').val(myobject.attrs.upc);
            $('#barDirec').val(myobject.attrs.direc);
            $('#barBarWidth').val(myobject.attrs.barWidth);
            $('#editBar').text("true");
        }
    } else {
        FIRST_BAR_CODE = true;
        var containerHeight = $(".navbar-default").height();
        var containerWidth = $(".navbar-default").width();
        var pageViewerHeight = $("#abcd").height();
        var pageViewerWidth = $("#abcd").width();
        var labelLeft = containerWidth - pageViewerWidth;
        var labelWidth = parseFloat($('#labelWidth').text()) / 15;
        var labelHeight = parseFloat($('#labelHeight').text()) / 15;

        $('#mdlAddBarCode').resetControls();
        $('#barWidth').attr('max', Math.round(containerWidth * dRatio));
        $('#barHeight').attr('max', Math.round(containerHeight * dRatio));
        $('#radiosbar1').attr('checked', 'checked');
        $('#barTextColor').colorpicker("val", "#000000");
        $('#barBgColor').colorpicker("val", "#ffffff");
        $('#barStartCharPosition').val(0);
        $('#barMaxChars').val(0);
        $('#barBoxHeight').val(0);
        $('#barBoxWidth').val(0);
        $('#barBarWidth').val(0);
        var containerHeights = parseFloat($("#abcd").height().toString());
        var containerWidths = parseFloat($("#abcd").width().toString());
        $('#barWidth').val(Math.round((labelWidth / 2) * 15));
        $('#barHeight').val(Math.round((labelHeight / 5) * 15));
        setTableField(SQL_STRING, "");
    }
}
function enableDisable() {
    if (OBJ_COUNT == 0) {
        $('#selectAllObj').attr("disabled", "disabled");
        $('#centerHor').attr("disabled", "disabled");
        $('#centerVer').attr("disabled", "disabled");
        $('#removeObject').attr("disabled", "disabled");
    } else if (OBJ_COUNT == 1) {
        $('#selectAllObj').removeAttr("disabled");
        //$('#centerHor').removeAttr("disabled");
        //$('#centerVer').removeAttr("disabled");
        //$('#removeObject').removeAttr("disabled");
        EnableDeleteButton();
    }
}

function changeIconState(disable) {
    if (disable) {
        $('#centerHor').attr("disabled", "disabled");
        $('#centerVer').attr("disabled", "disabled");
        $('#removeObject').attr("disabled", "disabled");
    } else {
        //$('#centerHor').removeAttr("disabled");
        //$('#centerVer').removeAttr("disabled");
        //$('#removeObject').removeAttr("disabled");
        EnableDeleteButton();
    }
}

function getOneStripFormObjects() {
    if (stage.find(".layer")) {
        var children = stage.find(".layer")[0].children;
        var childrenlength = children.length;
        var containerHeight = $(".navbar-default").height();
        var containerWidth = $(".navbar-default").width();
        var pageViewerHeight = $("#abcd").height();
        var pageViewerWidth = $("#abcd").width();
        var labelWidth = parseFloat($('#labelWidth').text()) / 15;
        var labelHeight = parseFloat($('#labelHeight').text()) / 15;
        var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;;
        var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
        labelLeft = parseFloat(labelLeft);
        dRatio = 1;
        if (labelWidth != 0) {
            dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
        }
        var jsonObj = {};
        var line = 0;
        for (var j = 0; j < childrenlength; j++) {
            var item = {};
            item["Name"] = $('#newLabelName').text().split(":")[1].toString();
            if (children[j].attrs.field) {
                item["FieldName"] = children[j].attrs.field;
            } else {
                item["FieldName"] = null;
            }
            if (children[j].attrs.type == 'S') {
                item["Format"] = children[j].attrs.text;
            } else {
                item["Format"] = children[j].attrs.format;
            }
            if (children[j].attrs.bcstyle) {
                if (children[j].attrs.type == 'Q') {
                    item["BCStyle"] = children[j].attrs.bcstyle;
                } else {
                    switch (children[j].attrs.bcstyle) {
                        case 1:
                            item["BCStyle"] = 6;
                            break;
                        case 2:
                            item["BCStyle"] = 13;
                            break;
                        case 3:
                            item["BCStyle"] = 9;
                            break;
                        case 4:
                            item["BCStyle"] = 3;
                            break;
                        case 5, 6:
                            item["BCStyle"] = 7;
                        default:
                            item["BCStyle"] = 6;
                    }
                }
            } else {
                item["BCStyle"] = null;
            }
            item["Type"] = children[j].attrs.type;

            var width = children[j].attrs.oWidth;
            var height = children[j].attrs.oHeight;
            var xpos = children[j].attrs.oX;
            var ypos = children[j].attrs.oY;
            if (children[j].attrs.type == 'B' || children[j].attrs.type == 'Q') {

                item["XPos"] = xpos * 15;
                item["YPos"] = ypos * 15;

            } else {
                var xposText = (children[j].attrs.oX) / dRatio;
                var yposText = (children[j].attrs.oY) / dRatio;
                var widthText = heightText = 0;

                xposText = RestrictBarcodeXToLabel(xposText, widthText, dRatio, pageViewerWidth);
                yposText = RestrictBarcodeYToLabel(yposText, heightText, dRatio, pageViewerHeight);

                item["XPos"] = xpos * 15;
                item["YPos"] = ypos * 15;
            }
            item["ForeColor"] = children[j].attrs.textColor;
            item["BackColor"] = children[j].attrs.backColor;
            if (children[j].attrs.type == 'T' || children[j].attrs.type == 'S') {
                item["BCWidth"] = children[j].attrs.boxWidth;
                item["BCHeight"] = children[j].attrs.boxHeight;
            } else {
                item["BCWidth"] = children[j].attrs.oWidth;
                item["BCHeight"] = children[j].attrs.oHeight;
            }

            item["Order"] = j + 1;
            if (children[j].attrs.id) {
                item["Id"] = children[j].attrs.id;
            } else {
                item["Id"] = null;
            }

            if (children[j].attrs.type == 'T' || children[j].attrs.type == 'S') {
                item["FontSize"] = children[j].attrs.font;
                item["FontName"] = children[j].attrs.fontFamily;
                item["FontBold"] = children[j].attrs.bold;
                item["FontItalic"] = children[j].attrs.italic;
                item["FontUnderline"] = children[j].attrs.underline;
                item["FontStrikeThru"] = children[j].attrs.strikethru;
                item["FontTransparent"] = children[j].attrs.trans;
                item["FontOrientation"] = children[j].attrs.orie;
            } else {
                item["FontSize"] = 0;
                item["FontName"] = null;
                item["FontBold"] = false;
                item["FontItalic"] = false;
                item["FontUnderline"] = false;
                item["FontStrikeThru"] = false;
                item["FontTransparent"] = false;
                item["FontOrientation"] = 0;
            }
            var alignment;
            switch (children[j].attrs.align) {
                case "Left":
                    alignment = 0;
                    break;
                case "Center":
                    alignment = 2;
                    break;
                case "Right":
                    alignment = 1;
                    break;
            }

            item["Alignment"] = alignment;
            if (children[j].attrs.type == 'B' || children[j].attrs.type == 'Q') {
                item["BCBarWidth"] = children[j].attrs.barWidth;
                item["BCDirection"] = children[j].attrs.direc;
                item["BCUPCNotches"] = children[j].attrs.upc;
            } else {
                item["BCBarWidth"] = 0;
                item["BCDirection"] = 0;
                item["BCUPCNotches"] = 0;
            }

            item["StartChar"] = children[j].attrs.startChar;
            item["MaxLen"] = children[j].attrs.maxLen;
            item["SpecialFunctions"] = 0;

            if (children[j].className != "Line") {
                jsonObj[[line]] = item;
                line = line + 1;
            }
        }
        return jsonObj;
    }
    return undefined;
}
function ClearOutline() {
    if (myobject) {
        if (myobject.children) {
            if (myobject.children[0].attrs.stroke == "Red") {
                myRect.setStroke(null);
            }
        } else {
            myobject.setStroke(null);
        }
        layer.add(myobject);
        stage.add(layer);
        myobject = null;
        myRect = null;
        myline = null;
        myStrike = null;
        mygroup = null;
    }
}
function SaveLabel() {
    $("#bSaveLabel").trigger("click");
    $('.index').show();
    $('#label').hide();
    current_label_record = 1;
    OBJ_COUNT = 0;
    UpdateLabelList();
}
function DeleteLable(labelName) {
    $.ajax({
        url: urls.LabelManager.DeleteLable,
        data: { name: labelName },
        type: 'GET',
        datatype: 'text/json'
    }).done(function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        UpdateLabelList();
    }).fail(function (xhr, status) {
        ShowErrorMessge();
    });
}//End method
function UpdateLabelList() {
    $.ajax({
        url: urls.LabelManager.GetAllLabelList,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
            var pOutputObject = $.parseJSON(data);
            $('#lstExtLabel').empty();
            $(pOutputObject).each(function (i, v) {
                $('#lstExtLabel').append($("<option>", { value: v.Name, html: v.Name }));
            });
        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });
}
function BindFontFamilies(id, font) {
    $.ajax({
        url: urls.Common.GetFontFamilies,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
            var pOutputObject = $.parseJSON(data);
            $('#' + id).empty();
            $(pOutputObject).each(function (i, v) {
                $('#' + id).append($("<option>", { value: v.Name, html: v.Name }));
            });

            if (font) {
                $('#' + id).val(font);
            } else {
                $('#' + id).val("Arial");
            }
        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });
}
function showEditLabel(jsonObject) {
    $('#frmAddNewLabel').resetControls();
    $('#mdlAddNewLabel').ShowModel();
    var tableName = jsonObject.TableName;
    var formID = jsonObject.OneStripFormsId;
    FillTableNameForNewLabel(tableName);
    FillFormNameForNewLabel(formID);

    $('#labelName').val(jsonObject.Name);
    $('#TableName').val(jsonObject.TableName);
    $('#sqlString').val(jsonObject.SQLString);
    $('#sqlUpdate').val(jsonObject.SQLUpdateString);
    $('#sampling').val(jsonObject.Sampling);
    $('#DrawLabels').attr('checked', jsonObject.DrawLabels);
    $('#stageWidth').val(jsonObject.LabelWidth);
    $('#stageHeight').val(jsonObject.LabelHeight);
    $('#Id').val(jsonObject.Id);
}
function drawExistingLabel(jsonObject, rowNum) {
    var containerHeight = $(".navbar-default").height();
    var containerWidth = $(".navbar-default").width();
    var barCodePrefix = $('#barCodePrefix').text();
    var pageViewerHeight = $("#abcd").height();
    var pageViewerWidth = $("#abcd").width();

    var labelWidth = parseFloat($('#labelWidth').text()) / 15;
    var labelHeight = parseFloat($('#labelHeight').text()) / 15;

    var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;;

    var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
    labelLeft = parseFloat(labelLeft);

    dRatio = 1;

    if (labelWidth != 0) {
        dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
    }

    var temp = [];

    var array = $.map(jsonObject, function (v, i) {
        var save = true;
        var type = v.Type;
        var tableName = $('#tableForLabel').text().split(":")[1].toString();
        var fieldName = v.FieldName;
        if (fieldName != null) {
            fieldName = RemoveTableNameFromField(fieldName);
        }
        var width = v.BCWidth;
        var height = v.BCHeight;
        var xpos = v.XPos;
        var ypos = v.YPos;
        var id = v.Id;
        if (id) {
            id = id;
        } else {
            id = "";
        }
        var foreColor = v.ForeColor;
        var backColor = v.BackColor;

        var fontSize = v.FontSize;
        var fontName = v.FontName;
        var fontStyle;
        var fontBold = v.FontBold;
        var fontItalic = v.FontItalic;
        var UPC = v.BCUPCNotches;
        var direc = v.BCDirection;
        var barWidth = v.BCBarWidth;
        var align = v.Alignment;
        var format = v.Format;
        var xposPixel = (xpos / 15);
        var yposPixel = (ypos / 15);

        var widthPixel = (width / 15);
        var heightPixel = (height / 15);

        barXPos = xposPixel;
        barYPos = yposPixel;

        widthPixel = widthPixel * dRatio;
        heightPixel = heightPixel * dRatio;

        if (fontBold) {
            fontStyle = "bold";
        }

        if (fontItalic) {
            if (fontStyle) {
                fontStyle = fontStyle + " italic";
            } else {
                fontStyle = "italic";
            }
        } else {
            if (!fontStyle) {
                fontStyle = "normal";
            }
        }
        var fontUnderline = v.FontUnderline;
        var fontStrike = v.FontStrikeThru;
        var fontTrans = v.FontTransparent;
        var fontOri = v.FontOrientation;
        var alignment;
        switch (align) {
            case 0:
                alignment = "Left";
                break;
            case 1:
                alignment = "Right";
                break;
            case 2:
                alignment = "Center";
                break;
        }
        var startChar = v.StartChar;
        var maxLen = v.MaxLen;
        var spcFunction = v.SpecialFunctions;
        var values;
        var txtColor;
        txtColor = _AccessToHex(foreColor);

        if (txtColor.length != 7) {
            while (txtColor.length != 7) {
                txtColor = txtColor + "0";
            }
        }
        var bgColor;
        bgColor = _AccessToHex(backColor);
        if (bgColor.length != 7) {
            while (bgColor.length != 7) {
                bgColor = bgColor + "0";
            }
        }
        if (type != 'S') {
            $.ajax({
                url: urls.LabelManager.GetNextRecord,
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                data: { rowNo: rowNum, tableName: tableName, SQL_String: SQL_STRING },
                dataType: 'json',
                async: false,
                success: function (val) {
                    var oRowData = $.parseJSON(val.rowdata);
                    var data;
                    if (oRowData.length == 0) {
                        data = fieldName;
                    } else {
                        data = oRowData[0][fieldName];
                    }

                    var values;
                    if (data) {
                        values = data;
                    } else {
                        values = 0;
                    }
                    values = values.toString();
                    startChar = parseInt(startChar);
                    maxLen = parseInt(maxLen);
                    if (values != 0) {
                        if (startChar != 0) {
                            if (maxLen != 0) {
                                values = values.substring(startChar - 1, startChar - 1 + maxLen);
                            } else {
                                values = values.substring(startChar - 1);
                            }
                        } else {
                            if (maxLen != 0) {
                                values = values.substring(maxLen, startChar);
                            }
                        }
                    } else {
                        values = values.toString();
                    }

                    if (values != 0) {
                        if (format) {
                            if (fieldName.toLowerCase().indexOf("date") >= 0) {
                                //if (format != barCodePrefix) {
                                //var date = new Date(values);
                                //values = date.toString();
                                //} else {
                                values = values;
                                //}
                            } else {
                                var tempFValue, tFormat;
                                tempFormat = format.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                                if (tempFormat != format) {
                                    var fLength = tempFormat.length;
                                    tFormat = tempFormat.substring(0, fLength - 1);
                                    tempFValue = tFormat + values;
                                    values = tempFValue;
                                } else {
                                    values = values;
                                }
                            }
                        }
                    }

                    if (fieldName.toLowerCase().indexOf("date") >= 0) {
                        if (values.indexOf('T') >= 0) {
                            values = values.replace('T', ' ');
                        }
                        //Changed by Hasmukh on 06/15/2016 for date format changes - 1
                        if (values.length > 9) {
                            //values = moment(values).format(getDatePreferenceCookieForMoment().toUpperCase());
                            //var dt = new Date(values);
                            var dt = StringToDateFromDB(values);
                            var ampm = "";
                            if (parseInt(dt.getHours()) <= 12)
                                ampm = ' AM';
                            else
                                ampm = ' PM';
                            values = moment(dt).format(getDatePreferenceCookieForMoment(true)) + ampm;
                            //var dateFormated = ConvertStringDateinDate(values, true);
                            //values = moment(dateFormated).format(getDatePreferenceCookieForMoment(true));
                        }
                    }

                    switch (type) {
                        case "B":
                        case "Q":
                            var barcodestyle = v.BCStyle;
                            switch (barcodestyle) {
                                case 1:
                                case 2:
                                case 6:
                                case 7:
                                case 8:
                                    barcodestyle = 1;
                                    break;
                                case 13:
                                case 14:
                                    barcodestyle = 2;
                                    break;
                                case 9:
                                    barcodestyle = 3;
                                    break;
                                case 3:
                                case 4:
                                case 5:
                                case 10:
                                case 11:
                                case 12:
                                    barcodestyle = 4;
                                    break;
                                case 15:
                                    barcodestyle = 5;
                                    break;
                                default:
                                    barcodestyle = 1;
                            }
                            var barWidth = v.BCBarWidth;
                            var bcDirection = v.BCDirection;
                            var UPCNotches = v.BCUPCNotches;
                            var imageObj = new Image();
                            var bcstyle;
                            if (type == 'B') {
                                switch (barcodestyle) {
                                    case 1:
                                        bcstyle = "CODE128";
                                        break;
                                    case 2:
                                        bcstyle = "EAN";
                                        break;
                                    case 3:
                                        bcstyle = "UPC";
                                        break;
                                    case 4:
                                        bcstyle = "CODE39";
                                        break;
                                    case 5:
                                        bcstyle = "ITF14";
                                        break;
                                    case 6:
                                        bcstyle = "ITF";
                                        break;
                                    default:
                                        bcstyle = "CODE128";
                                        break;
                                }
                                var finalBarType;
                                switch (bcstyle) {
                                    case 'EAN':
                                        if (values != '1234567890128') {
                                            finalBarType = 'CODE128';
                                        }
                                        break;
                                    case 'UPC':
                                        if (values != '123456789999') {
                                            finalBarType = 'CODE128';
                                        }
                                        break;
                                    case 'ITF14':
                                        if (values != '10012450017') {
                                            finalBarType = 'CODE128';
                                        }
                                        break;
                                    case 'ITF':
                                        if (!isNaN(values)) {
                                            if (values.length % 2 != 0) {
                                                finalBarType = 'CODE128';
                                            }
                                        }
                                        break;
                                }

                                if (finalBarType) {
                                    bcstyle = finalBarType;
                                }
                                imageObj.id = values;
                                imageObj.height = heightPixel;
                                imageObj.width = widthPixel;
                                var imgID = imageObj.getAttribute('id');
                                if (barWidth != 0) {
                                    $('#tempimg').JsBarcode(values.toString(), { height: heightPixel, format: bcstyle, lineColor: txtColor, width: barWidth, backgroundColor: bgColor });
                                } else {
                                    $('#tempimg').JsBarcode(values.toString(), { height: heightPixel, format: bcstyle, lineColor: txtColor, backgroundColor: bgColor });
                                }
                                var loc = $('#tempimg').attr("src");
                                imageObj.onload = function () {

                                };
                                imageObj.src = loc;
                                drawImage(imageObj, widthPixel, heightPixel, fieldName, type, barcodestyle, barXPos, barYPos, id, foreColor, backColor, alignment, startChar, maxLen, v.Format, UPCNotches, bcDirection, barWidth, save);
                            } else {
                                switch (barcodestyle) {
                                    case 1:
                                        bcstyle = "L";
                                        break;
                                    case 2:
                                        bcstyle = "M";
                                        break;
                                    case 3:
                                        bcstyle = "Q";
                                        break;
                                    case 4:
                                        bcstyle = "H";
                                        break;
                                    default:
                                        bcstyle = "L";
                                        break;
                                }
                                imageObj.id = "qrcodes";

                                var options = {
                                    ecLevel: bcstyle,
                                    fill: txtColor,
                                    background: bgColor,
                                    text: values.toString(),
                                    quiet: UPCNotches,
                                    size: widthPixel
                                };
                                $('#output').empty();
                                $('#output').qrcode(options);
                                var canvas = $('#output canvas');
                                imageObj.src = canvas.get(0).toDataURL("image/png");
                                drawImage(imageObj, widthPixel, heightPixel, fieldName, type, barcodestyle, barXPos, barYPos, id, foreColor, backColor, alignment, startChar, maxLen, v.Format, UPCNotches, bcDirection.toString(), "", save);
                            }
                            break;
                        case "T":
                            drawText(values.toString(), type, barXPos, barYPos, fieldName, id, foreColor, backColor, fontName, fontSize, alignment, fontOri, fontStyle, fontTrans, fontUnderline, fontStrike, startChar, maxLen, height, width, v.Format, save);
                            break;
                    }
                },
                fail: function (xhr, status, error) { }
            });
        } else {
            drawText(v.Format, type, barXPos, barYPos, fieldName, id, foreColor, backColor, fontName, fontSize, alignment, fontOri, fontStyle, fontTrans, fontUnderline, fontStrike, "", "", height, width, "", save);
        }
    });
}
function FillTableNameForNewLabel(tableName) {
    $.ajax({
        url: urls.Common.GetTableListLabel,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
            var pOutputObject = $.parseJSON(data);
            $('#TableName').empty();
            $(pOutputObject).each(function (i, v) {
                $('#TableName').append($("<option>", { value: v.TableName, html: v.UserName }));
            });
            if (tableName) {
                $('#TableName').val(tableName);
            }
        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });
}
function FillFormNameForNewLabel(formID) {
    $.ajax({
        url: urls.LabelManager.GetFormList,
        dataType: "json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        success: function (data) {
            var pOutputObject = $.parseJSON(data);
            $('#FormName').empty();

            var first;
            //$('#FormName').append($("<option>", { value: "Form,Label Width(inches), Label Height(inches),Across, Down", html: "Form +Label Width(inches) +Label Height(inches) +Across +Down" }));
            $('#FormName').append($("<option>", {
                value: '' + vrLabelManagerRes["ddlFormForm"] + ', ' + vrLabelManagerRes["ddlFormLabelWidth_inches"] + ', ' +
                vrLabelManagerRes["ddlFormLabelHeight_Inches"] + ', ' + vrLabelManagerRes["ddlFormAcross"] + ', ' + vrLabelManagerRes["ddlFormDown"] + '',
                html: '' + vrLabelManagerRes["ddlFormForm"] + '+ ' + vrLabelManagerRes["ddlFormLabelWidth_inches"] + '+ ' +
                vrLabelManagerRes["ddlFormLabelHeight_Inches"] + '+ ' + vrLabelManagerRes["ddlFormAcross"] + '+ ' + vrLabelManagerRes["ddlFormDown"] + ''
            }));
            $(pOutputObject).each(function (i, v) {
                var ilWidth = v.LabelWidth / 1440;
                var ilHeight = v.LabelHeight / 1440;
                $('#FormName').append($("<option>", { value: v.Name + "," + v.LabelWidth + "," + v.LabelHeight + "," + v.Id, html: v.Name + "+" + ilWidth + "+" + ilHeight + "+" + v.LabelsAcross + "+" + v.LabelsDown }));
                if (i == 0) {
                    first = v.Name + "," + v.LabelWidth + "," + v.LabelHeight + "," + v.Id;
                }
            });

            if (formID) {
                $("select#FormName option").each(function () {
                    if ($(this).val().toString() != "abc") {
                        var values = $(this).val().toString().split(',');
                        var fId = values[3].toString();
                        if (fId == formID) {
                            $('#FormName').val($(this).val());
                        }
                    }
                });
            } else {
                $('#FormName').val(first);
            }

            var formValue = $('#FormName').val().toString().split(',');
            $('#stageWidth').val(formValue[1].toString());
            $('#stageHeight').val(formValue[2].toString());
            $('#formId').val(formValue[3].toString());

            var spacesToAdd = 2;
            var firstLength = secondLength = thirdLength = fourthLength = 0;
            $("select#FormName option").each(function (i, v) {
                if (i == 0) {
                    $(this).attr("disabled", "disabled");
                }
                //$("option[value='Form,Label Width(inches), Label Height(inches),Across, Down']").attr("disabled", "disabled");
                var parts = $(this).text().split('+');
                var len = parts[0].length;
                if (len > firstLength) {
                    firstLength = len;
                }

                var len1 = parts[1].length;
                if (len1 > secondLength) {
                    secondLength = len1;
                }

                var len2 = parts[2].length;
                if (len2 > thirdLength) {
                    thirdLength = len2;
                }

                var len3 = parts[3].length;
                if (len3 > fourthLength) {
                    fourthLength = len3;
                }
                //}
            });

            var padLength = firstLength + spacesToAdd;
            var padLength1 = secondLength + spacesToAdd;
            var padLength2 = thirdLength + spacesToAdd;
            var padLength3 = fourthLength + spacesToAdd;
            $("select#FormName option").each(function (i, v) {
                var parts = $(this).text().split('+');
                var strLength = parts[0].length;

                for (var x = 0; x < (padLength - strLength) ; x++) {
                    parts[0] = parts[0] + ' ';
                }
                var strLength1 = parts[1].length;
                for (var y = 0; y < (padLength1 - strLength1) ; y++) {
                    parts[1] = parts[1] + ' ';
                }
                var strLength2 = parts[2].length;

                for (var z = 0; z < (padLength2 - strLength2) ; z++) {
                    parts[2] = parts[2] + ' ';
                }
                var strLength3 = parts[3].length;
                for (var w = 0; w < (padLength3 - strLength3) ; w++) {
                    parts[3] = parts[3] + ' ';
                }
                $(this).text(parts[0].replace(/ /g, '\u00a0') + parts[1].replace(/ /g, '\u00a0') + parts[2].replace(/ /g, '\u00a0') + parts[3].replace(/ /g, '\u00a0') + parts[4]);
            });
        },
        error: function (xhr) {
            ShowErrorMessge();
        }
    });
}
function initialize(height, width) {
    width = parseFloat(width.toString()) / 15;
    height = parseFloat(height.toString()) / 15;
    var containerHeight = screen.availHeight - (64 + 32);
    var containerWidth = screen.width;
    $('.navbar-default').css('width', containerWidth);
    $('.navbar-default').css('height', containerHeight);
    var pageViewerHeight = $("#abcd").height();
    var pageViewerWidth = $("#abcd").width();
    var displayHeight, displayWidth, displayTop, displayLeft;
    var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
    labelLeft = parseFloat(labelLeft);

    dRatio = 1;
    if (width != 0) {
        dRatio = (containerWidth - 4 - (labelLeft * 2)) / width;
    }
    displayWidth = width * dRatio;
    if (displayWidth < 0) {
        displayWidth = 0;
    }
    displayHeight = height * dRatio;
    if (displayHeight < 0) {
        displayHeight = 0;
    }
    displayLeft = labelLeft;
    displayTop = ((containerHeight - displayHeight) / 2) - 4;

    if (displayTop < labelLeft) {
        displayTop = labelLeft;
    }
    $('#abcd').css('width', displayWidth);
    $('#abcd').css('height', displayHeight);
    $('#abcd').css('left', displayLeft);
    $('#abcd').css('top', displayTop);
    if (width != 0) {
        var picWidth = $('#abcd').width();
        dRatio = picWidth / width;
    } else {
        dRatio = 1;
    }

    stage = new Kinetic.Stage({
        container: "abcd",
        width: parseFloat(displayWidth),
        height: parseFloat(displayHeight)
    });

    layer = new Kinetic.Layer({
        name: 'layer'
    });
    stage.on('contentClick', function (e) {
        var stroke = $('#stroke').text();
        if (stroke == 'true') {
            if (stage.find(".layer")[0]) {
                var children = stage.find(".layer")[0].children;
                var childrenlength = children.length;
                for (var j = 0; j < childrenlength; j++) {
                    var currObj = children[j];
                    if (currObj.children) {
                        if (currObj.children[0].attrs.stroke == "Red") {
                            currObj.children[0].setStroke(null);
                        }
                    } else {
                        if (currObj.attrs.stroke == "Red") {
                            currObj.setStroke(null);
                        }
                    }
                    stage.add(layer);
                    myobject = null;
                    myRect = null;
                    myline = null;
                    myStrike = null;
                    mygroup = null;
                    //$('#stroke').text('false');
                    changeIconState(true);
                }
            }
        }
        $('#stroke').text('true');
    });
    //OnClick event for container  contentClick
    stage.on('click', function (e) {
        var stroke = $('#stroke').text();
        if (stroke == 'true') {
            if (e.target.className == 'Image' || e.target.className == 'Text') {
                $('#stroke').text('false');
            } else {
                changeIconState(true);
            }
        }
    });
}
function AddLabel(serializedForm) {
    $.post(urls.LabelManager.AddLabel, { pOneStripJobs: serializedForm }).done(function (data) {
        if (data.errortype == 'w') {
            showAjaxReturnMessage(data.message, 'w');
        }
    }).fail(function (xhr, status, error) { });
}
function drawImage(imageObj, width, height, fieldName, type, bcstyle, xpos, ypos, id, color, bgColor, align, startChar, maxLen, format, upcNocthes, direction, barWidth, save) {
    var dragX, dragY;
    if (myobject) {
        dragX = xpos;
        dragY = ypos;
    } else {
        dragX = 0;
        dragY = 0;
    }
    var containerHeight = $(".navbar-default").height();
    if (ypos) {
        containerWidth = $(".navbar-default").width();
    } else {
        containerWidth = $(".navbar-default").width();
    }
    var pageViewerHeight = $("#abcd").height();
    var pageViewerWidth = $("#abcd").width();
    var labelWidth = parseFloat($('#labelWidth').text()) / 15;
    var labelHeight = parseFloat($('#labelHeight').text()) / 15;
    var displayHeight, displayWidth, displayTop, displayLeft;
    var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
    labelLeft = parseFloat(labelLeft);
    dRatio = 1;
    if (labelWidth != 0) {
        dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
    }
    var ID;
    if (id) {
        ID = id;
    } else {
        ID = null;
    }

    var oXPos;
    var oYPos;

    oXPos = xpos;
    oYPos = ypos;

    var tWidth = width / dRatio;
    var tHeight = height / dRatio;

    switch (align) {
        case "Right":
            oXPos = xpos - tWidth;
            break;
        case "Center":
            oXPos = xpos - (tWidth / 2);
            break;
        case "Left":
            oXPos = xpos;
            break;
    }
    var barXPos, barYPos;

    barXPos = RestrictBarcodeXToLabel(oXPos, tWidth, dRatio, pageViewerWidth);
    barYPos = RestrictBarcodeYToLabel(oYPos, tHeight, dRatio, pageViewerHeight);

    oXPos = barXPos * dRatio;
    oYPos = barYPos * dRatio;

    if (color && !id) {
        var valueTypes = typeof (color);
        if (valueTypes == 'string') {
            txtColor = _HexToAccess(color);
        } else {
            color = _AccessToHex(color);
            if (color.length != 7) {
                while (color.length != 7) {
                    color = color + "0";
                }
            }
            txtColor = _HexToAccess(color);
        }
    } else {
        if (!id) {
            txtColor = "0";
            color = "#000000";
        } else {
            color = _AccessToHex(color);
            if (color.length != 7) {
                while (color.length != 7) {
                    color = color + "0";
                }
            }
            txtColor = _HexToAccess(color);
        }
    }

    if (bgColor && !id) {
        var valueType = typeof (bgColor);
        if (valueType == 'string') {
            backColor = _HexToAccess(bgColor);
        } else {
            bgColor = _AccessToHex(bgColor);
            if (bgColor.length != 7) {
                while (bgColor.length != 7) {
                    bgColor = bgColor + "0";
                }
            }
            backColor = _HexToAccess(bgColor);
        }
    } else {
        if (!id) {
            backColor = "0";
            bgColor = "#000000";
        } else {
            bgColor = _AccessToHex(bgColor);
            if (bgColor.length != 7) {
                while (bgColor.length != 7) {
                    bgColor = bgColor + "0";
                }
            }
            backColor = _HexToAccess(bgColor);
        }
    }

    var offsetX = 0;
    var offsetY = 0;
    if (type == 'Q') {
        offsetX = width / 2;
        offsetY = width / 2;
    }

    displayHeight = (height / dRatio) * 15;
    displayWidth = (width / dRatio) * 15;

    var CanvasImage = new Kinetic.Image({
        image: imageObj,
        x: parseFloat(oXPos.toString()),
        y: parseFloat(oYPos.toString()),
        oX: parseFloat(xpos.toString()),
        oY: parseFloat(ypos.toString()),
        oWidth: displayWidth,
        oHeight: displayHeight,
        draggable: true,
        resizable: true,
        id: ID,
        field: fieldName,
        type: type,
        bcstyle: bcstyle,
        align: align,
        startChar: startChar,
        maxLen: maxLen,
        backColor: backColor,
        boxHeight: height,
        boxWidth: width,
        format: format,
        upc: upcNocthes,
        direc: direction,
        barWidth: barWidth,
        textColor: txtColor,
        textHexColor: color,
        backHexColor: bgColor,
        offset: { x: offsetX, y: offsetY }
    });

    CanvasImage.setListening(true);
    CanvasImage.on("click", function () {
        if (myobject) {
            if (myobject.children) {
                if (myobject.children[0].attrs.stroke == "Red") {
                    myRect.setStroke(null);
                }
            } else {
                myobject.setStroke(null);//<<<<<<<<<<<
            }
        }
        myobject = this; //<<<<<<<<<<<<<<<<<<<<<< sets clicked on rectangle as active
        myobject.setStrokeWidth(2);
        myobject.setStroke("Red");
        layer.add(myobject);
        stage.add(layer);
        changeIconState(false);
    });

    CanvasImage.on("dragend", function (e) {
        var lastX, lastY;
        var offsetX = this.attrs.boxWidth / 2;
        var offsetY = this.attrs.boxWidth / 2;

        if (this.attrs.type == 'Q') {
            lastX = this.attrs.x - offsetX;
            lastY = this.attrs.y - offsetY;
        } else {
            lastX = this.attrs.x;
            lastY = this.attrs.y;
        }

        var tWidth = this.attrs.boxWidth / dRatio;
        var tHeight = this.attrs.boxHeight / dRatio;

        var pageViewerHeight = $("#abcd").height();
        var pageViewerWidth = $("#abcd").width();

        lastX = lastX / dRatio;
        lastY = lastY / dRatio;


        var align = this.attrs.align;

        var oXpos, oYpos;

        switch (align) {
            case "Right":
                oXPos = lastX + tWidth;
                break;
            case "Center":
                oXPos = lastX + (tWidth / 2);
                break;
            case "Left":
                oXPos = lastX;
                break;
        }

        var resX = RestrictBarcodeXToLabel(oXPos, tWidth, dRatio, pageViewerWidth);
        var resY = RestrictBarcodeYToLabel(lastY, tHeight, dRatio, pageViewerHeight);

        this.attrs.oX = resX;
        this.attrs.oY = resY;
        FORM_HAS_CHANGED = true;
        $('#labelChanged').text('true');
        $("#bSaveLabel").removeAttr("disabled");
    });

    CanvasImage.on('dblclick', function () {
        var tableName = $('#tableForLabel').text().split(":")[1].toString();
        var bcstyle = ConvertToBCType(myobject.attrs.bcstyle);
        if (myobject.attrs.type == 'B') {
            $('#mdlAddBarCode').resetControls();
            $('#mdlAddBarCode').ShowModel();
            $('#barTextColor').colorpicker("val", myobject.attrs.textHexColor);
            $('#barBgColor').colorpicker("val", myobject.attrs.backHexColor);
            setTableField(SQL_STRING, myobject.attrs.field.toString());
            $('#fieldFormat').val(myobject.attrs.format);
            $('#barWidth').val(Math.round(myobject.attrs.oWidth).toString());
            $('#barHeight').val(Math.round(myobject.attrs.oHeight).toString());
            $('#barType').val(bcstyle);
            $('#barStartCharPosition').val(myobject.attrs.startChar);
            $('#barMaxChars').val(myobject.attrs.maxLen);
            $('input:radio[name=alignmentBar][value=' + myobject.attrs.align + ']').attr('checked', 'checked');
            $('#barUPC').val(myobject.attrs.upc);
            $('#barDirec').val(myobject.attrs.direc);
            $('#barBarWidth').val(myobject.attrs.barWidth);
            $('#editBar').text("true");
        } else {
            var qrType = ConvertToQRType(myobject.attrs.bcstyle);
            $('#mdlAddQRCode').resetControls();
            $('#mdlAddQRCode').ShowModel();
            $('#qrTextColor').colorpicker("val", myobject.attrs.textHexColor);
            $('#qrBgColor').colorpicker("val", myobject.attrs.backHexColor);
            $('#fieldFormatQR').val(myobject.attrs.format);
            setTableFieldQR(SQL_STRING, myobject.attrs.field.toString());
            $('#qrWidth').val(Math.round(myobject.attrs.oWidth).toString());
            $('#qrHeight').val(Math.round(myobject.attrs.oHeight).toString());
            $('#eccType').val(qrType);
            $('#qrStartCharPosition').val(myobject.attrs.startChar);
            $('#qrMaxChars').val(myobject.attrs.maxLen);
            $('input:radio[name=alignmentQR][value=' + myobject.attrs.align + ']').attr('checked', 'checked');
            $('#qrQuite').val(myobject.attrs.upc);
            $('#qrOrie').val(myobject.attrs.direc);
            $('#editQR').text("true");
        }
    });

    // add cursor styling
    CanvasImage.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    CanvasImage.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    if (direction && type == 'Q') {
        var firstQR = $('#firstQR').text();
        CanvasImage.x(CanvasImage.attrs.x + offsetX);
        CanvasImage.y(CanvasImage.attrs.y + offsetY);
        $('#firstQR').text("false");

        var orie;
        switch (direction) {
            case "0":
                orie = 0;
                break;
            case "1":
                orie = 90;
                CanvasImage.rotate(orie);
                break;
            case "2":
                orie = 180;
                CanvasImage.rotate(orie);
                break;
            case "3":
                orie = 270;
                CanvasImage.rotate(orie);
                break;
        }
    }
    if (myobject) {
        if (myobject.children) {
            if (myobject.children.length) {
                if (myobject.children[0].attrs.stroke == "Red") {
                    myRect.setStroke(null);
                }
            }
        } else {
            myobject.setStroke(null);//<<<<<<<<<<<
        }
    }
    myobject = CanvasImage; //<<<<<<<<<<<<<<<<<<<<<< sets clicked on rectangle as active
    if (!save) {
        myobject.setStrokeWidth(2);
        myobject.setStroke("Red");
    }
    OBJ_COUNT = OBJ_COUNT + 1;
    enableDisable();
    layer.add(CanvasImage);
    window.setTimeout(function () { stage.add(layer); }, 100);
    changeIconState(false);
}
function ConvertToBCType(barcodestyle) {
    var bcstyle;
    switch (barcodestyle) {
        case 1:
            bcstyle = "CODE128";
            break;
        case 2:
            bcstyle = "EAN";
            break;
        case 3:
            bcstyle = "UPC";
            break;
        case 4:
            bcstyle = "CODE39";
            break;
        case 5:
            bcstyle = "ITF14";
            break;
        case 6:
            bcstyle = "ITF";
            break;
        default:
            bcstyle = "CODE39";
            break;
    }
    return bcstyle;
}
function ConvertToQRType(barcodestyle) {
    var bcstyle;
    switch (barcodestyle) {
        case 1:
            bcstyle = "L";
            break;
        case 2:
            bcstyle = "M";
            break;
        case 3:
            bcstyle = "Q";
            break;
        case 4:
            bcstyle = "H";
            break;
        default:
            bcstyle = "L";
            break;
    }
    return bcstyle;
}
function drawText(txtObj, type, xpos, ypos, fieldName, id, color, bgColor, fontFamily, fontSize, align, orie, fontStyle, transparent, underline, strike, startChar, maxLen, boxHeight, boxWidth, format, save) {
    var ID;
    var txtColor, backColor;

    var containerHeight = $(".navbar-default").height();
    if (ypos) {
        containerWidth = $(".navbar-default").width();
    } else {
        containerWidth = $(".navbar-default").width();
    }


    var pageViewerHeight = $("#abcd").height();
    var pageViewerWidth = $("#abcd").width();

    var labelWidth = parseFloat($('#labelWidth').text()) / 15;
    var labelHeight = parseFloat($('#labelHeight').text()) / 15;

    var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;;

    var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
    labelLeft = parseFloat(labelLeft);

    dRatio = 1;

    if (labelWidth != 0) {
        dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
    }

    if (id) {
        ID = id;
    } else {
        ID = null;
    }

    var oXPos;
    var oYPos;

    var fieldNames;
    if (type == 'T') {
        fieldNames = fieldName;
    } else {
        fieldNames = null;
    }

    oXPos = xpos;
    oYPos = ypos;

    xpos = RestrictBarcodeXToLabel(xpos, boxWidth, dRatio, pageViewerWidth);
    ypos = RestrictBarcodeYToLabel(ypos, boxHeight, dRatio, pageViewerHeight);

    if (color && !id) {
        var valueTypes = typeof (color);
        if (valueTypes == 'string') {
            if (color == 0) {
                txtColor = _HexToAccess(color);
                color = "#000000";
            } else {
                txtColor = _HexToAccess(color);
            }
        } else {
            color = _AccessToHex(color);
            if (color.length != 7) {
                while (color.length != 7) {
                    color = color + "0";
                }
            }
            txtColor = _HexToAccess(color);

        }
    } else {
        if (!id) {
            txtColor = "0";
            color = "#000000";
        } else {
            color = _AccessToHex(color);
            if (color.length != 7) {
                while (color.length != 7) {
                    color = color + "0";
                }
            }
            txtColor = _HexToAccess(color);
        }
    }

    if (bgColor && !id) {
        var valueType = typeof (bgColor);
        if (valueType == 'string') {
            backColor = _HexToAccess(bgColor);
        } else {
            bgColor = _AccessToHex(bgColor);
            if (bgColor.length != 7) {
                while (bgColor.length != 7) {
                    bgColor = bgColor + "0";
                }
            }
            backColor = _HexToAccess(bgColor);
        }

    } else {
        if (!id) {
            backColor = "0";
            bgColor = "#000000";
        } else {
            bgColor = _AccessToHex(bgColor);
            if (bgColor.length != 7) {
                while (bgColor.length != 7) {
                    bgColor = bgColor + "0";
                }
            }
            backColor = _HexToAccess(bgColor);
        }
    }

    var fontPixel = fontSize * dRatio * 1.333333;
    var bold, italic;
    if (fontStyle) {
        if (fontStyle.indexOf("bold") > -1) {
            bold = true;
        } else {
            bold = false;
        }

        if (fontStyle.indexOf("italic") > -1) {
            italic = true;
        } else {
            italic = false;
        }
    }
    if (!txtObj) {
        txtObj = 0;
        txtObj = txtObj.toString();
    }

    var textGroup = new Kinetic.Group({
        x: parseFloat(oXPos.toString()),
        y: parseFloat(oYPos.toString()),
        draggable: true,
        oX: parseFloat(oXPos.toString()),
        oY: parseFloat(oYPos.toString()),
        text: txtObj,
        fill: color,
        testing: true,
        id: ID,
        type: type,
        field: fieldNames,
        textColor: txtColor,
        fontFamily: fontFamily,
        fontSize: fontPixel,
        font: fontSize,
        fontStyle: fontStyle,
        align: align,
        orie: orie,
        underline: underline,
        strikethru: strike,
        trans: transparent,
        startChar: startChar,
        maxLen: maxLen,
        bold: bold,
        italic: italic,
        backColor: backColor,
        bColorHex: bgColor,
        boxHeight: boxHeight,
        boxWidth: boxWidth,
        textHeight: 1,
        textWidth: 1,
        format: format
    });

    textGroup.setListening(true);

    var text = new Kinetic.Text({
        x: 0,
        y: 0,
        oX: parseInt(xpos.toString()),
        oY: parseInt(ypos.toString()),
        text: txtObj,
        fill: color,
        id: ID,
        type: type,
        field: fieldNames,
        textColor: txtColor,
        fontFamily: fontFamily,
        fontSize: fontPixel,
        font: fontSize,
        fontStyle: fontStyle,
        align: align,
        orie: orie,
        underline: underline,
        strikethru: strike,
        trans: transparent,
        startChar: startChar,
        maxLen: maxLen,
        bold: bold,
        italic: italic,
        backColor: backColor,
        bColorHex: bgColor,
        boxHeight: boxHeight,
        boxWidth: boxWidth,
        format: format
    });

    text.setListening(true);

    if (orie) {
        var tmpOrie = 360 - orie;
        textGroup.rotate(tmpOrie);
    }

    var boxChanged;
    if ((boxHeight > 0) || (boxWidth > 0)) {
        if (orie == 0) {
            boxChanged = true;
        } else {
            boxChanged = false;
        }
    } else {
        boxChanged = false;
    }
    var textHeight = text.getTextHeight();
    var textWidth = text.getTextWidth();

    textGroup.attrs.textHeight = textHeight;
    textGroup.attrs.textWidth = textWidth;

    var atextHeight = parseInt(oXPos.toString()) - textWidth;
    var atextWidth = parseInt(oYPos.toString()) - textHeight;

    var iXadd, iTmpAngle, iSizePix, textWHeight, iSizePixX;
    iSizePix = fontSize * dRatio;
    textWHeight = 0;

    if ((boxChanged) && (boxWidth > 0)) {
        iXadd = boxWidth;
    } else {
        iXadd = textWidth;
        iSizePixX = iXadd;
        iTmpAngle = orie;
        if ((orie > 90) && (orie <= 180)) {
            iTmpAngle = 180 - iTmpAngle;
        }

        if ((orie > 270) && (orie <= 360)) {
            iTmpAngle = 360 - iTmpAngle;
        }
        textWidth = (iXadd * Math.cos(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
        textWHeight = (iXadd * Math.sin(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.cos(iTmpAngle * (3.1456927 / 180)));
        textHeight = (iXadd * Math.sin(iTmpAngle * (3.1456927 / 180)));
        iXadd = (iXadd * Math.cos(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
    }
    var editField = $('#editField').text();
    var editText = $('#editText').text();

    switch (align) {
        case "Right":
            iXadd = iXadd;
            break;
        case "Center":
            iXadd = iXadd / 2;
            break;
        case "Left":
            iXadd = 0;
            break;
    }

    var iChars = text.length;
    var iXPix = xpos * dRatio;
    var iYPix = ypos * dRatio;

    var tempX, tempY;
    tempX = parseInt(oXPos.toString());
    tempY = parseInt(oYPos.toString());

    var finalX, finalY;
    var r1Left, r1Right, r1Top, r1Bottom;
    var r2Left, r2Right, r2Top, r2Bottom;
    var dBoxWidth, dBoxHeight;

    if (boxChanged) {
        r1Left = iXPix;
        r1Right = parseFloat(r1Left) + parseFloat(boxWidth);
        r1Top = iYPix;
        if (boxHeight > 0) {
            r1Bottom = parseFloat(r1Top) + parseFloat(boxHeight);
        } else {
            r1Bottom = parseFloat(r1Top) + parseFloat(textWHeight);
        }

        r2Left = r1Left / dRatio;
        r2Right = r1Right / dRatio;
        r2Top = r1Top / dRatio;
        r2Bottom = r1Bottom / dRatio;

        r2Right = parseFloat(r1Left) + (parseFloat(r2Right) - parseFloat(r2Left));
        r2Bottom = parseFloat(r1Top) + (parseFloat(r2Bottom) - parseFloat(r2Top));

        r2Top = r1Top;
        r2Left = r1Left;

        dBoxWidth = parseFloat(r2Right) - parseFloat(r2Left);
        dBoxHeight = parseFloat(r2Bottom) - parseFloat(r2Top);

        switch (align) {
            case "Right":
                iXadd = dBoxWidth;
                break;
            case "Center":
                iXadd = dBoxWidth / 2;
                break;
            case "Left":
                iXadd = 0;
                break;
        }

        r2Left = parseFloat(r2Left) - parseFloat(iXadd);
        r2Right = parseFloat(r2Right) - parseFloat(iXadd);

        finalX = r2Left;
        finalY = r2Top;
    } else if ((orie >= 0) && (orie <= 90)) {
        finalX = iXPix - iXadd;
        finalY = iYPix + textHeight;
    } else if ((orie > 90) && (orie <= 180)) {
        finalX = iXPix - iXadd + (iSizePixX * Math.cos(iTmpAngle * (3.1456927 / 180)));
        finalY = iYPix + textHeight + (iSizePix * Math.cos(iTmpAngle * (3.1456927 / 180)));
    } else if ((orie > 180) && (orie <= 270)) {
        finalX = iXPix - iXadd;
        finalY = iYPix + (iSizePix * Math.cos((iTmpAngle - 180) * (3.1456927 / 180)));
    } else if ((orie > 270) && (orie <= 360)) {
        finalX = iXPix - iXadd + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
        finalY = iYPix;
    }

    if (finalX < -50) {
        finalX = -20;
    }

    if (finalY < 10) {
        finalY = 10;
    }

    textGroup.x(finalX);
    textGroup.y(finalY);

    var origX = textGroup.attrs.x;
    var origY = textGroup.attrs.y;
    textGroup.on("dragstart", function () {
        TEXT_X = this.attrs.x;
        TEXT_Y = this.attrs.y;
    });
    // on dragend, calc if the rect has moved >400px
    textGroup.on("dragend", function () {
        var boxChanged;
        if ((this.attrs.boxHeight > 0) || (this.attrs.boxWidth > 0)) {
            if (this.attrs.orie == 0) {
                boxChanged = true;
            } else {
                boxChanged = false;
            }
        } else {
            boxChanged = false;
        }

        var textObject = this.attrs.text.toString();

        var textHeight = this.attrs.textHeight;
        var textWidth = this.attrs.textWidth;

        var iXadd, iTmpAngle, iSizePix, textWHeight, iSizePixX;
        iSizePix = this.attrs.fontSize;
        textWHeight = 0;
        if ((boxChanged) && (this.attrs.boxWidth > 0)) {
            iXadd = this.attrs.boxWidth;
        } else {
            iXadd = textWidth;
            iSizePixX = iXadd;
            iTmpAngle = this.attrs.orie;

            if ((this.attrs.orie > 90) && (this.attrs.orie <= 180)) {
                iTmpAngle = 180 - iTmpAngle;
            }

            if ((this.attrs.orie > 270) && (this.attrs.orie <= 360)) {
                iTmpAngle = 360 - iTmpAngle;
            }

            textWidth = (iXadd * Math.cos(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
            textWHeight = (iXadd * Math.sin(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.cos(iTmpAngle * (3.1456927 / 180)));
            textHeight = (iXadd * Math.sin(iTmpAngle * (3.1456927 / 180)));
            iXadd = (iXadd * Math.cos(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
        }

        var editField = $('#editField').text();
        var editText = $('#editText').text();

        switch (this.attrs.align) {
            case "Right":
                iXadd = iXadd;
                break;
            case "Center":
                iXadd = iXadd / 2;
                break;
            case "Left":
                iXadd = 0;
                break;
        }

        var iChars = text.length;
        var iXPix, iYPix;

        var tempX, tempY;
        tempX = parseInt(oXPos.toString());
        tempY = parseInt(oYPos.toString());

        var finalX = this.attrs.x;
        var finalY = this.attrs.y;
        var r1Left, r1Right, r1Top, r1Bottom;
        var r2Left, r2Right, r2Top, r2Bottom;
        var dBoxWidth, dBoxHeight;

        if (boxChanged) {
            r1Left = finalX;
            r1Right = parseFloat(r1Left) + parseFloat(boxWidth);
            r1Top = finalY;
            if (boxHeight > 0) {
                r1Bottom = parseFloat(r1Top) + parseFloat(boxHeight);
            } else {
                r1Bottom = parseFloat(r1Top) + parseFloat(textWHeight);
            }

            r2Left = r1Left / dRatio;
            r2Right = r1Right / dRatio;
            r2Top = r1Top / dRatio;
            r2Bottom = r1Bottom / dRatio;

            r2Right = parseFloat(r1Left) + (parseFloat(r2Right) - parseFloat(r2Left));
            r2Bottom = parseFloat(r1Top) + (parseFloat(r2Bottom) - parseFloat(r2Top));

            r2Top = r1Top;
            r2Left = r1Left;

            dBoxWidth = parseFloat(r2Right) - parseFloat(r2Left);
            dBoxHeight = parseFloat(r2Bottom) - parseFloat(r2Top);

            switch (align) {
                case "Right":
                    iXadd = dBoxWidth;
                    break;
                case "Center":
                    iXadd = dBoxWidth / 2;
                    break;
                case "Left":
                    iXadd = 0;
                    break;
            }

            r2Left = parseFloat(r2Left) + parseFloat(iXadd);
            r2Right = parseFloat(r2Right) - parseFloat(iXadd);

            iXPix = r2Left;
            iYPix = r2Top;
        } else if ((orie >= 0) && (orie <= 90)) {
            iXPix = finalX + iXadd;
            iYPix = finalY - textHeight;
        } else if ((orie > 90) && (orie <= 180)) {
            iXPix = finalX + iXadd - (iSizePixX * Math.cos(iTmpAngle * (3.1456927 / 180)));
            iYPix = finalY - textHeight - (iSizePix * Math.cos(iTmpAngle * (3.1456927 / 180)));
        } else if ((orie > 180) && (orie <= 270)) {
            iXPix = finalX + iXadd;
            iYPix = finalY - (iSizePix * Math.cos((iTmpAngle - 180) * (3.1456927 / 180)));
        } else if ((orie > 270) && (orie <= 360)) {
            iXPix = finalX + iXadd - (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
            iYPix = finalY;
        }

        this.attrs.oX = iXPix / dRatio;
        this.attrs.oY = iYPix / dRatio;
        FORM_HAS_CHANGED = true;
        $('#labelChanged').text('true');
        $('#bSaveLabel').removeAttr("disabled");
    });
    textGroup.on('dblclick', function () {
        if (myobject.attrs.type == 'S') {
            $('#mdlAddText').resetControls();
            $('#mdlAddText').ShowModel();
            BindFontFamilies("fontNameText", myobject.attrs.fontFamily);
            $('#staticText').val(myobject.attrs.text.toString());
            $('#txtTextColor').colorpicker("val", myobject.attrs.fill);
            $('#txtBgColor').colorpicker("val", myobject.attrs.bColorHex);
            $('#fontNameText').val(myobject.attrs.fontFamily);
            $('#fontSizeText').val(myobject.attrs.font);
            $('input:radio[name=alignmentText][value=' + myobject.attrs.align + ']').attr('checked', 'checked');
            $('#boxHeightText').val(Math.round(myobject.attrs.boxHeight));
            $('#boxWidthText').val(Math.round(myobject.attrs.boxWidth));
            $('#fontOriText').val(myobject.attrs.orie);
            $("#strikethrutext").attr('checked', myobject.attrs.strikethru);
            $("#boldtext").attr('checked', myobject.attrs.bold);
            $("#italictext").attr('checked', myobject.attrs.italic);
            $("#underlinetext").attr('checked', myobject.attrs.underline);
            $("#transparenttext").attr('checked', myobject.attrs.trans);
            $('#staticText').focus();
            $('#editText').text("true");
        } else {
            var tableName = $('#tableForLabel').text().split(":")[1].toString();
            $('#mdlAddFieldObj').resetControls();
            $('#mdlAddFieldObj').ShowModel();
            setTableFieldObj(SQL_STRING, myobject.attrs.field);
            BindFontFamilies("fontName", myobject.attrs.fontFamily);
            $('#startCharPosition').val(myobject.attrs.startChar);
            $('#maxChars').val(myobject.attrs.maxLen);
            $('#fieldTextColor').colorpicker("val", myobject.attrs.fill);
            $('#fieldBgColor').colorpicker("val", myobject.attrs.bColorHex);
            $('#fontName').val(myobject.attrs.fontFamily);
            $('#fontSize').val(myobject.attrs.font);
            $('input:radio[name=alignmentField][value=' + myobject.attrs.align + ']').attr('checked', 'checked');
            $('#boxHeight').val(Math.round(myobject.attrs.boxHeight));
            $('#boxWidth').val(Math.round(myobject.attrs.boxWidth));
            $('#fontOri').val(myobject.attrs.orie);
            $("#strikethru").attr('checked', myobject.attrs.strikethru);
            $("#bold").attr('checked', myobject.attrs.bold);
            $("#italic").attr('checked', myobject.attrs.italic);
            $("#underline").attr('checked', myobject.attrs.underline);
            $("#transparent").attr('checked', myobject.attrs.trans);
            $('#formatField').val(myobject.attrs.format);
            $('#editField').text("true");
        }
    });

    var tHeight, tWidth;

    if (boxChanged) {
        tWidth = dBoxWidth;
        tHeight = dBoxHeight;
    } else {
        tWidth = text.getTextWidth();
        tHeight = text.getTextHeight();
    }

    if (tWidth == 0) {
        tWidth = 5;
    }
    else if (tHeight == 0) {
        tHeight = 5;
    }
    textGroup.width(tWidth);
    textGroup.height(tHeight);
    text.width(tWidth);
    text.height(tHeight);

    var box = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: tWidth,
        height: tHeight
    });

    if (transparent) {
        box.opacity(0.9);
    } else {
        box.fill(bgColor);
    }

    textGroup.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });

    textGroup.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });

    var ul = new Kinetic.Line({
        points: [0, parseFloat(fontPixel), parseFloat(tWidth), parseFloat(fontPixel)],
        strokeWidth: 1,
        stroke: color
    });

    var sThrough = new Kinetic.Line({
        points: [0, parseFloat(fontPixel / 2), parseFloat(tWidth), parseFloat(fontPixel / 2)],
        strokeWidth: 3,
        stroke: color
    });

    textGroup.on("click", function () {
        if (myobject) {
            if (myobject.children) {
                if (myobject.children[0].attrs.stroke == "Red") {
                    myRect.setStroke(null);
                }
            } else {
                myobject.setStroke(null);//<<<<<<<<<<<
            }
        }
        myobject = this; //<<<<<<<<<<<<<<<<<<<<<< sets clicked on rectangle as active
        myline = ul;
        myStrike = sThrough;
        myRect = box;
        mygroup = textGroup;
        myRect.setStrokeWidth(1);
        myRect.setStroke("Red");
        mygroup.add(myRect);
        mygroup.add(text);
        if (myobject.attrs.underline == true) {
            mygroup.add(myline);
        }
        if (myobject.attrs.strikethru == true) {
            mygroup.add(myStrike);
        }
        layer.add(mygroup);
        stage.add(layer);
        changeIconState(false);
    });

    stage.add(layer);
    layer.add(textGroup);
    textGroup.add(box);
    textGroup.add(text);

    if (underline) {
        textGroup.add(ul);
    }
    if (strike) {
        textGroup.add(sThrough);
    }
    if (myobject) {
        if (myobject.children) {
            if (myobject.children.length) {
                if (myobject.children[0].attrs.stroke == "Red") {
                    myRect.setStroke(null);
                }
            }
        } else {
            if (myobject.nodeType == 'Group') {

            } else {
                myobject.setStroke(null);//<<<<<<<<<<<
            }
        }
    }
    myobject = textGroup; //<<<<<<<<<<<<<<<<<<<<<< sets clicked on rectangle as active
    myline = ul;
    myStrike = sThrough;
    myRect = box;
    mygroup = textGroup;
    if (!save) {
        myRect.setStrokeWidth(1);
        myRect.setStroke("Red");
    }
    mygroup.add(myRect);
    mygroup.add(text);
    if (myobject.attrs.underline == true) {
        mygroup.add(myline);
    }
    if (myobject.attrs.strikethru == true) {
        mygroup.add(myStrike);
    }
    layer.draw();
    OBJ_COUNT = OBJ_COUNT + 1;
    enableDisable();
    changeIconState(false);

}
function _AccessToHex(color) {
    return "#" + color.toString(16).split("").reverse().join("");
}
function _HexToAccess(color) {
    return parseInt(color.split("").reverse().join(""), 16);
}
function _pixelToPts(num) {
    return num * 0.75; //Point = Pixel * 0.75
}
function _PtsToPixel(num) {
    return num * 1.33; //Pixel = Point * 1.33
}
function setTableFieldObj(tableName, fieldData) {
    $.post(urls.Common.GetColumnList, { pTableName: tableName, type: 1 }, function () { }, "json").done(function (data) {
        var pOutputObject = $.parseJSON(data);
        $('#fieldNameObj').empty();
        if (pOutputObject.Columns) {
            $(pOutputObject.Columns).each(function (i, v) {
                $('#fieldNameObj').append($("<option>", { value: v.COLUMN_NAME, html: v.COLUMN_NAME }));
            });
        } else {
            $(pOutputObject).each(function (i, v) {
                $('#fieldNameObj').append($("<option>", { value: v, html: v }));
            });
        }
        if (fieldData) {
            $('#fieldNameObj').val(fieldData);
        }
    })
    .fail(function (xhr, status, error) {
        ShowErrorMessge();
    });
}
function setTableField(tableName, fieldData) {
    $.post(urls.Common.GetColumnList, { pTableName: tableName, type: 1 }).done(function (data) {
        var pOutputObject = $.parseJSON(data);
        $('#fieldName').empty();
        if (pOutputObject.Columns) {
            $(pOutputObject.Columns).each(function (i, v) {
                $('#fieldName').append($("<option>", { value: v.COLUMN_NAME, html: v.COLUMN_NAME }));
            });
        } else {
            $(pOutputObject).each(function (i, v) {
                $('#fieldName').append($("<option>", { value: v, html: v }));
            });
        }
        if (fieldData) {
            $('#fieldName').val(fieldData);
        }
    })
    .fail(function (xhr, status, error) {
        ShowErrorMessge();
    });
}
function setTableFieldQR(tableName, fieldData) {
    $.post(urls.Common.GetColumnList, { pTableName: tableName, type: 1 }, function () { }, "json").done(function (data) {
        var pOutputObject = $.parseJSON(data);
        $('#fieldNameQR').empty();
        if (pOutputObject.Columns) {
            $(pOutputObject.Columns).each(function (i, v) {
                $('#fieldNameQR').append($("<option>", { value: v.COLUMN_NAME, html: v.COLUMN_NAME }));
            });
        } else {
            $(pOutputObject).each(function (i, v) {
                $('#fieldNameQR').append($("<option>", { value: v, html: v }));
            });
        }
        if (fieldData) {
            $('#fieldNameQR').val(fieldData);
        }
    })
    .fail(function (xhr, status, error) {
        ShowErrorMessge();
    });
}

function RestrictBarcodeXToLabel(xpos, width, dRatio, picWidth) {
    var tempXPos = xpos;

    if ((xpos * dRatio) >= (picWidth - 6.667)) {
        tempXPos = (picWidth - 6.667) / dRatio;
    } else if ((xpos + width) <= 6.667) {
        tempXPos = (width * -1) + 6.667;
    }
    return tempXPos;
}
function RestrictBarcodeYToLabel(ypos, height, dRatio, picHeight) {
    var tempYPos = ypos;

    if ((ypos * dRatio) >= (picHeight - 6.667)) {
        tempYPos = (picHeight - 6.667) / dRatio;
    } else if ((ypos + height) <= 6.667) {
        tempYPos = (height * -1) + 6.667;
    }
    return tempYPos;
}
function RemoveTableNameFromField(sFieldName) {
    var i, tmpField;

    tmpField = sFieldName;
    i = sFieldName.indexOf(".");
    if (i > 1) {
        tmpField = sFieldName.substring(i + 1);
    }
    tmpField = tmpField.trim();
    return tmpField;
}

function EnableDeleteButton() {
    if (stage.find(".layer")[0] === undefined || stage.find(".layer")[0] === null) {
        return false;
    }
    var children = stage.find(".layer")[0].children;
    var childrenlength = children.length;
    for (var j = 0; j < childrenlength; j++) {
        var currObj = children[j];
        if (currObj.children) {
            if (currObj.children[0].attrs.stroke == "Red") {
                $('#removeObject').removeAttr("disabled");
                $('#centerHor').removeAttr("disabled");
                $('#centerVer').removeAttr("disabled");
            }
        } else {
            if (currObj.attrs.stroke == "Red") {
                $('#removeObject').removeAttr("disabled");
                $('#centerHor').removeAttr("disabled");
                $('#centerVer').removeAttr("disabled");
            }
        }
    }
}