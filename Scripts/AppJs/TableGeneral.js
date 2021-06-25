//Break the line in label
$.fn.multiline = function (text) {
    this.text(text);
    this.html(this.html().replace(/\\n/g, '<br/>'));
    return this;
}//Break the line in label

var miOfficialRecordConversion = 0;
$(function () {

    $('#BarCodePrefix').keypress(function (event) {
        var key = event.which;
        if (!((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || (key == 8) || (key != 9) || (event.keyCode == 37) || (event.keyCode == 38) || (event.keyCode == 39) || (event.keyCode == 40))) {
            event.preventDefault();
            return true;
        }
        if (key >= 97 && key <= 122) {
            event.preventDefault();
            key = key - 32;
            var barCode = $('#BarCodePrefix').val();
            if (barCode.length < 10) {
                $("#BarCodePrefix").val($('#BarCodePrefix').val() + String.fromCharCode(key));
                return true;
            }
            return false;
        } else {
            return false;
        }
    });

    $('#OfficialRecordHandling').on('change', function () {
        var officialRecord = $('#OfficialRecordHandling').is(':checked');
        var SelectedTable = $('#TableName').val();
        $.post(urls.TableGeneral.OfficialRecordWarning, $.param({ recordStatus: officialRecord, tableName: SelectedTable }), function (data) {
            if (data) {
                if (data.errortype == "w") {
                    if (officialRecord == true) {
                        $('#warningLabel').multiline(data.message);
                        $('#fourTrueBtn').show();
                        $('#threeFalseBtn').hide();
                        $('#mdlOfficialRecord').ShowModel();
                        $('#btnFirst').on('click', function () {
                            miOfficialRecordConversion = 1;
                        });
                        $('#btnLast').on('click', function () {
                            miOfficialRecordConversion = 2;
                        });
                        $('#btnNotSet').on('click', function () {
                            miOfficialRecordConversion = 0;
                        });
                        $('#btnCancel').on('click', function () {
                            $('#OfficialRecordHandling').attr('checked', true);
                        });

                    }
                    else {
                        $('#warningLabel').multiline(data.message);
                        $('#fourTrueBtn').hide();
                        $('#threeFalseBtn').show();
                        $('#mdlOfficialRecord').ShowModel();
                        $('#btnRemove').on('click', function () {
                            miOfficialRecordConversion = 4;
                        });
                        $('#btnCancel').on('click', function () {
                            $('#OfficialRecordHandling').attr('checked', false);
                        });
                    }

                }
            }
        });

    });

    $('#BarCodePrefix').bind('cut paste', function (e) {
        e.preventDefault();
    });

    $('#AttachmentCheck').on('change', function () {
        var attachmentState = $('#AttachmentCheck').is(':checked');
        DisableAttachment(attachmentState);
    });

    ValidateNumeric('#DescFieldPrefixOneWidth');
    ValidateNumeric('#DescFieldPrefixTwoWidth');
    ValidateNumeric('#ADOQueryTimeout');
    ValidateNumeric('#ADOCacheSize');
    ValidateNumeric('#MaxRecsOnDropDown');

    $('#btnChange').on('click', function () {
        var SelectedTable = $('#TableName').val();
        $('#mdlIconSetting').ShowModel();
        $.post(urls.TableGeneral.LoadIconWindow, { TableName: SelectedTable }, function (data) {
            if (data) {
                if (data.errortype == "s") {
                    var IconListJSON = $.parseJSON(data.IconListJSON);
                    var PictureNameJSON = $.parseJSON(data.PictureNameJSON);
                    if (PictureNameJSON == null || PictureNameJSON == "")
                        PictureNameJSON = "FOLDERS.ICO";
                    $("#selectable").empty();
                    $(IconListJSON).each(function (i, item) {
                        if (item.Value.toLowerCase().trim() == PictureNameJSON.toLowerCase().trim())
                            $("#selectable").append("<li id=" + item.Value + " class='highlightClass'><a class='dd-option'><img class='dd-option-image' src=" + item.Key + ">&nbsp;&nbsp;&nbsp;&nbsp;" + item.Value + "</a></li>");
                        else
                            $("#selectable").append("<li id=" + item.Value + "><a class='dd-option'><img class='dd-option-image' src=" + item.Key + ">&nbsp;&nbsp;&nbsp;&nbsp;" + item.Value + "</a></li>");
                    });

                } else {
                    showAjaxReturnMessage(data.message, data.errortype);
                }
            }
        });


        $("#selectable").selectable({
            selected: function (event, ui) {
                if ($(ui.selected).hasClass('ui-selected')) {
                    $("#selectable li.highlightClass").removeClass('highlightClass');
                    $(ui.selected).closest('li').addClass('highlightClass');
                } else {
                    $(ui.selected).closest('li').removeClass('highlightClass');
                }
            }
        });
    });

    $('#btnSave').on('click', function () {
        var pictureId = $('.highlightClass').attr('id');
        if (pictureId != undefined) {
            var imgPath = "/Images/icons/" + pictureId;
            $("#iconDefault").attr('src', imgPath);
            $('#Picture').val(pictureId);
        }

    });

    $('#btnApply').on('click', function () {
        var $form = $('#frmTableGeneral');
        if ($form.valid()) {
            var serverCursor = $('input:radio[name=ADOServerCursor]:checked').val();
            var maxRecords = parseInt($('#MaxRecsOnDropDown').val());
            if (maxRecords < 100 && maxRecords !== 0) {
                showAjaxReturnMessage(vrTablesRes["msgJsTableGeneralMaxDrpDwnRecs100OrHigh"], "w");
                return false;
            }
            //debugger;
            //var maxSQLIntVal = 2147483647;
            //var maxRecords = parseInt($('#ADOQueryTimeout').val());
            //if(maxRecords > maxSQLIntVal)
            //{
            //    showAjaxReturnMessage("The value should be between 0 to 2,147,483,647", "w");
            //    return false;
            //}

            if (serverCursor == 'client')
                $('input:radio[name=ADOServerCursor]:checked').val(false);
            else
                $('input:radio[name=ADOServerCursor]:checked').val(true);
            var serializedForm = $form.serialize() + "&Attachments=" + $('#AttachmentCheck').is(':checked') + "&miOfficialRecord=" + miOfficialRecordConversion;
            $.post(urls.TableGeneral.SetGeneralDetails, serializedForm)
                .done(function (response) {
                    if (response.warnMsgJSON !== "") {
                        $(this).confirmModal({
                            confirmTitle: 'TAB FusionRMS',
                            confirmMessage: response.warnMsgJSON,
                            confirmOk: vrCommonRes['Ok'].toUpperCase(),
                            confirmStyle: 'default',
                            confirmOnlyOk: true
                        });
                    } else {
                        showAjaxReturnMessage(response.message, response.errortype);
                    }
                    var searchValue = $.parseJSON(response.searchValueJSON);
                    $.post(urls.TableGeneral.SetSearchOrder, function (data) {
                        if (data) {
                            if (data.errortype == "s") {
                                var searchOrderList = $.parseJSON(data.searchOrderListJSON);
                                LoadOutField('#SearchOrder', searchOrderList);
                                $('#SearchOrder option[value=' + searchValue + ']').attr('selected', true);
                            }
                        }
                    });
                    // showAjaxReturnMessage(response.message, response.errortype);
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
        }
        return true;
    });

});



function GetTableGeneralData(tblName) {
    if ($('#divTableTab').length == 0) {
        RedirectOnAccordian(urls.TableTracking.LoadTableTab);
        $('#title, #navigation').text(vrCommonRes['mnuTables']);
    }
    $.ajax({
        url: urls.TableGeneral.LoadGeneralTab,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html',
        async: false
    }).done(function (result) {
        $('#LoadTabContent').html('');
        $('#LoadTabContent').html(result);
        $.post(urls.TableGeneral.GetGeneralDetails, $.param({ tableName: tblName }), function (data) {
            if (data) {
                if (data.errortype == 's') {
                    var cursorFlag = $.parseJSON(data.cursorFlagJSON);
                    var auditflag = $.parseJSON(data.auditflagJSON);
                    var tableGeneralData = $.parseJSON(data.pSelectTableJSON);
                    var displayFieldList = $.parseJSON(data.displayFieldListJSON);
                    var ServerPath = $.parseJSON(data.ServerPathJSON);
                    var DBUserNameJSON = $.parseJSON(data.DBUserNameJSON);

                    var UserTableIcon = $.parseJSON(data.UserTableIconJSON);
                    //Added by Hasmukh for fix : FUS-2317
                    $("#hdnTableId").val(tableGeneralData.TableId);

                    if (UserTableIcon == "false")
                        $("#UserTableIcon").hide();
                    else
                        $("#UserTableIcon").show();

                    LoadOutField('#DescFieldNameOne', displayFieldList);
                    LoadOutField('#DescFieldNameTwo', displayFieldList);
                    $("#DescFieldNameOne").prepend("<option value='' selected='selected'></option>");
                    $("#DescFieldNameTwo").prepend("<option value='' selected='selected'></option>");
                    if (tableGeneralData.TableName !== null && tableGeneralData.TableName !== '')
                        $('#TableName').val(tableGeneralData.TableName.trim());
                    if (DBUserNameJSON !== null && DBUserNameJSON !== '')
                        $('#DBName').val(DBUserNameJSON.trim());
                    if (tableGeneralData.BarCodePrefix !== null && tableGeneralData.BarCodePrefix !== '')
                        $('#BarCodePrefix').val(tableGeneralData.BarCodePrefix.trim());
                    if (tableGeneralData.IdStripChars !== null && tableGeneralData.IdStripChars !== '')
                        $('#IdStripChars').val(tableGeneralData.IdStripChars.trim());
                    else
                        $('#IdStripChars').val("");
                    if (tableGeneralData.IdMask !== null && tableGeneralData.IdMask !== '')
                        $('#IdMask').val(tableGeneralData.IdMask.trim());
                    else
                        $('#IdMask').val("");
                    if (tableGeneralData.DescFieldPrefixOne !== null && tableGeneralData.DescFieldPrefixOne !== '')
                        $('#DescFieldPrefixOne').val(tableGeneralData.DescFieldPrefixOne.trim());
                    else
                        $('#DescFieldPrefixOne').val("");
                    if (tableGeneralData.DescFieldPrefixTwo !== null && tableGeneralData.DescFieldPrefixTwo !== '')
                        $('#DescFieldPrefixTwo').val(tableGeneralData.DescFieldPrefixTwo.trim());
                    else
                        $('#DescFieldPrefixTwo').val("");
                    if (tableGeneralData.DescFieldPrefixOneWidth !== null)
                        $('#DescFieldPrefixOneWidth').val(tableGeneralData.DescFieldPrefixOneWidth);
                    else
                        $('#DescFieldPrefixOneWidth').val("");
                    if (tableGeneralData.DescFieldPrefixTwoWidth !== null)
                        $('#DescFieldPrefixTwoWidth').val(tableGeneralData.DescFieldPrefixTwoWidth);
                    else
                        $('#DescFieldPrefixTwoWidth').val("");
                    if (tableGeneralData.Attachments)
                        $('#AttachmentCheck').attr('checked', true);
                    else
                        $('#AttachmentCheck').attr('checked', false);
                    if (tableGeneralData.OfficialRecordHandling)
                        $('#OfficialRecordHandling').attr('checked', true);
                    else
                        $('#OfficialRecordHandling').attr('checked', false);
                    if (tableGeneralData.CanAttachToNewRow)
                        $('#CanAttachToNewRow').attr('checked', true);
                    else
                        $('#CanAttachToNewRow').attr('checked', false);
                    if (tableGeneralData.Picture !== null && tableGeneralData.Picture !== '')
                        $('#Picture').val(tableGeneralData.Picture.trim());
                    if (tableGeneralData.ADOQueryTimeout !== null)
                        $('#ADOQueryTimeout').val(tableGeneralData.ADOQueryTimeout);
                    else
                        $('#ADOQueryTimeout').val("");
                    if (tableGeneralData.ADOCacheSize !== null)
                        $('#ADOCacheSize').val(tableGeneralData.ADOCacheSize);
                    else
                        $('#ADOCacheSize').val("");
                    if (tableGeneralData.MaxRecsOnDropDown !== null)
                        $('#MaxRecsOnDropDown').val(tableGeneralData.MaxRecsOnDropDown);
                    else
                        $('#MaxRecsOnDropDown').val("");
                    if (tableGeneralData.ADOServerCursor)
                        $('input:radio[name=ADOServerCursor][value=server]').attr('checked', 'checked');
                    else
                        $('input:radio[name=ADOServerCursor][value=client]').attr('checked', 'checked');
                    if (tableGeneralData.AuditAttachments)
                        $('#AuditAttachments').attr('checked', true);
                    else
                        $('#AuditAttachments').attr('checked', false);
                    if (tableGeneralData.AuditConfidentialData)
                        $('#AuditConfidentialData').attr('checked', true);
                    else
                        $('#AuditConfidentialData').attr('checked', false);
                    if (tableGeneralData.AuditUpdate)
                        $('#AuditUpdate').attr('checked', true);
                    else
                        $('#AuditUpdate').attr('checked', false);
                    if (tableGeneralData.Picture !== null && tableGeneralData.Picture !== '')
                        $('#iconDefault').attr('src', ServerPath + tableGeneralData.Picture);
                    else
                        $('#iconDefault').attr('src', ServerPath + 'FOLDERS.ICO');
                    if (tableGeneralData.DescFieldNameOne !== null && tableGeneralData.DescFieldNameOne !== '')
                        $('#DescFieldNameOne option[value=' + tableGeneralData.DescFieldNameOne + ']').attr('selected', true);
                    if (tableGeneralData.DescFieldNameTwo !== null && tableGeneralData.DescFieldNameTwo !== '')
                        $('#DescFieldNameTwo option[value=' + tableGeneralData.DescFieldNameTwo + ']').attr('selected', true);
                    if (cursorFlag)
                        $('#cursor_location *').prop("disabled", true);
                    else
                        $('#cursor_location *').prop("disabled", false);
                    if (auditflag)
                        $('#AuditConfidentialData').attr('disabled', false);
                    else
                        $('#AuditConfidentialData').attr('disabled', true);
                    DisableAttachment(tableGeneralData.Attachments);

                    $.post(urls.TableGeneral.SetSearchOrder, function (data) {
                        if (data) {
                            if (data.errortype == "s") {
                                var searchOrderList = $.parseJSON(data.searchOrderListJSON);
                                LoadOutField('#SearchOrder', searchOrderList);
                                if (tableGeneralData.SearchOrder !== null)
                                    $('#SearchOrder option[value=' + tableGeneralData.SearchOrder + ']').attr('selected', true);
                            }
                        }
                    });
                    setTimeout(function () {
                        var s = $(".sticker");
                        $('.content-wrapper').scroll(function () {
                            if ($(this).scrollTop() + $(this).innerHeight() + 40 >= $(this)[0].scrollHeight) {
                                s.removeClass("stick", 10);
                            }
                            else {
                                s.addClass("stick");
                            }
                        });
                    }, 800);
                }
                else {
                    showAjaxReturnMessage(data.message, data.errortype);
                }
            }
        });
    })
.fail(function (xhr, status) {
    ShowErrorMessge();
});
}

function ValidateNumeric(fieldId) {
    $(fieldId).keypress(function (event) {
        if (event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 9) {
            if ((event.which != 8 && isNaN(String.fromCharCode(event.which))) || (event.which == 32)) {
                event.preventDefault();
                return false;
            }
            return true;
        } else {
            return false;
        }
    });
    $(fieldId).bind('cut copy paste', function (e) {
        e.preventDefault();
    });
}


function DisableAttachment(attachmentState) {

    if (attachmentState) {
        $('#OfficialRecordHandling').removeAttr('disabled');
        $('#CanAttachToNewRow').removeAttr('disabled');
        $('#AuditAttachments').removeAttr('disabled');
    }
    else {
        $('#OfficialRecordHandling').attr('disabled', 'disabled');
        $('#CanAttachToNewRow').attr('disabled', 'disabled');
        $('#AuditAttachments').attr('disabled', 'disabled');
    }
}