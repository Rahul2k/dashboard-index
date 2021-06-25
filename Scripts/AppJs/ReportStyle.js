function GetReportStyleGrid() {
    $.ajax({
        url: urls.ReportStyles.LoadReportStyle,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html'
    }).done(function (result) {
            $('#LoadUserControl').empty();
            $('#LoadUserControl').html(result);

        //Display 'Report Style' grid
        //Modified by Hasmukh - added more parameter in grid for select all checkbox hide
        $('#grdReportStyle').gridLoad(urls.ReportStyles.GetReportStyles, vrReportsRes["tiJsReportStyleReportStyles"],false);
            //Display Report Style Form and Save data in database when click on 'Clone'
        
        if ($('.content-wrapper')[0].scrollHeight > $('.content-wrapper').height()) {
            $('#reportStyleAdd').parent().addClass('stick');
        }
        setTimeout(function () {
                $('.content-wrapper').unbind('scroll');
                $('.content-wrapper').scroll(function () {
                    if ($(this).get(0).scrollHeight >= ($(this).height() + $(this).scrollTop() + 40)) {
                        $('#btnApplyStyle').parent().addClass("stick");
                    }
                    else {
                        $('#btnApplyStyle').parent().removeClass("stick", 10);
                    }
                });
            }, 800);

            $('#reportStyleAdd').on('click', function () {
                //var selectedRows = $('#grdReportStyle').getSelectedRowsIds();
                var selectedRows = $('#grdReportStyle').getGridParam('selrow');
                if (selectedRows == null) {
                    showAjaxReturnMessage(vrReportsRes["msgJsReportStylePlzSelectTheRow2CloneRptStyleData"], 'w');
                    return false;
                }
                //if (selectedRows.length == 0 || selectedRows.length > 1) {
                //    if (selectedRows.length > 1) {
                //        showAjaxReturnMessage(vrCommonRes["PlzSelOnlyOneRow"], 'w');
                //        return false;
                //    }
                //    else {
                //        showAjaxReturnMessage(vrReportsRes["msgJsReportStylePlzSelectTheRow2CloneRptStyleData"], 'w');
                //        return false;
                //    }
                //}
                var rowData = jQuery("#grdReportStyle").getRowData(selectedRows);
                var reportStyle = rowData["Id"];
                $.ajax({
                    url: urls.ReportStyles.LoadAddReportStyle,
                    contentType: 'application/html; charset=utf-8',
                    type: 'GET',
                    dataType: 'html'
                }).done(function (result) {
                    $('#LoadUserControl').empty();
                    $('#LoadUserControl').html(result);
                    ValidateControls(reportStyle);
                    $.get(urls.ReportStyles.GetReportStylesData, $.param({ reportStyleVar: reportStyle, selectedRowsVar: selectedRows, cloneFlag: true }), function (data) {
                        if (data) {
                            var formVar = $.parseJSON(data.jsonObject);
                            var sReportStyleNameJSON = $.parseJSON(data.sReportStyleNameJSON);
                            formVar.Id = sReportStyleNameJSON;
                            formVar.ReportStylesId = 0;
                            formVar.Description = "";
                            SetReportStylesDetails(formVar);
                            var serializeFormData = $.param(formVar, true)
                                + "&pFixedLines=" + $('#FixedLines').is(':checked')
                                + "&pAltRowShading=" + $('#AltRowShading').is(':checked')
                                + "&pReportCentered=" + $('#ReportCentered').is(':checked');
                            $.post(urls.ReportStyles.SetReportStylesData, serializeFormData, function (data) {
                                if (data) {
                                    var reportBackVarVar = $.parseJSON(data.reportBackJSON);
                                    if (data.errortype == "s") {
                                        $('#ReportStylesId').val(reportBackVarVar.ReportStylesId);
                                        var idVal = $('#ReportStylesId').val();
                                    }
                                    if (data.reportBackJSON != undefined) {
                                        fnAddNewMenu(data);
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
                    });
                }).fail(function (xhr, status) {
                    ShowErrorMessge();
                });
                return true;
            });
            //Display Selected 'Report Style' view in edit form when click on 'Edit' button
            $('#reportStyleEdit').on('click', function () {
                //var selectedRows = $('#grdReportStyle').getSelectedRowsIds();
                //if (selectedRows.length == 0 || selectedRows.length > 1) {
                //    if (selectedRows.length > 1) {
                //        showAjaxReturnMessage(vrCommonRes["PlzSelOnlyOneRow"], 'w');
                //        return false;
                //    }
                //    else {
                //        showAjaxReturnMessage(vrReportsRes["msgJsReportStylePlzSelectTheRow2EditRptStyleData"], 'w');
                //        return false;
                //    }
                //}
                var selectedRows = $('#grdReportStyle').getGridParam('selrow');
                if (selectedRows == null) {
                    showAjaxReturnMessage(vrReportsRes["msgJsReportStylePlzSelectTheRow2EditRptStyleData"], 'w');
                    return false;
                }
                var rowData = jQuery("#grdReportStyle").getRowData(selectedRows);
                var reportStyle = rowData["Id"];
                var reportStyleID = rowData["ReportStylesId"];
                $.ajax({
                    url: urls.ReportStyles.LoadAddReportStyle,
                    contentType: 'application/html; charset=utf-8',
                    type: 'GET',
                    dataType: 'html'
                }).done(function (result) {
                    $('.drillDownMenu').find('a').removeClass('selectedMenu');
                    $('#ulReports li ul.displayed').find('a#FALRPTSTL_' + reportStyleID).addClass('selectedMenu');
                    $('#LoadUserControl').empty();
                    $('#LoadUserControl').html(result);
                    ValidateControls(reportStyle);
                    $.get(urls.ReportStyles.GetReportStylesData, $.param({ reportStyleVar: reportStyle, selectedRowsVar: reportStyleID, cloneFlag: false }), function (data) {
                        if (data) {
                            var formVar = $.parseJSON(data);
                            SetReportStylesDetails(formVar);
                        }
                        else {
                            showAjaxReturnMessage(data.message, data.errortype);
                        }
                    });
                }).fail(function (xhr, status) {
                    ShowErrorMessge();
                });
                return true;
            });

            //Delete Selected Report Style from database when click on 'Remove' button
            $('#reportStyleRemove').on('click', function () {
                //var selectedRows = $('#grdReportStyle').getSelectedRowsIds();
                //if (selectedRows.length == 0 || selectedRows.length > 1) {
                //    if (selectedRows.length > 1) {
                //        showAjaxReturnMessage(vrCommonRes["PlzSelOnlyOneRow"], 'w');
                //    }
                //    else {
                //        showAjaxReturnMessage(vrReportsRes["msgJsReportStylePlzSelectTheRow2RemoveData"], 'w');
                //    }
                //}
                var selectedRows = $('#grdReportStyle').getGridParam('selrow');
                if (selectedRows == null) {
                    showAjaxReturnMessage(vrReportsRes["msgJsReportStylePlzSelectTheRow2RemoveData"], 'w');
                }
                else {
                    var rowData = jQuery("#grdReportStyle").getRowData(selectedRows);
                    var reportStyle = rowData["Id"];
                    var reportdescription = rowData["Description"];
                    if (reportdescription == "")
                        reportdescription = reportStyle;
                    $(this).confirmModal({
                        confirmTitle: vrCommonRes['msgJsDelConfim'],
                        confirmMessage: String.format(vrReportsRes['msgJsReportStyleRUSureYouWantToRemoveThe'], reportdescription),
                        confirmOk: vrCommonRes['Yes'],
                        confirmCancel: vrCommonRes['No'],
                        confirmStyle: 'default',
                        confirmCallback: DeleteTrackingField
                    });
                }
            });
        }).fail(function (xhr, status) {
            ShowErrorMessge();
        });
}

//Display 'Report Style' form,retrive data from database and set in form.
function GetReportStyleView(ReportStyleId) {
    $.ajax({
        url: urls.ReportStyles.LoadAddReportStyle,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html'
    }).done(function (result) {
        $('#LoadUserControl').empty();
        $('#LoadUserControl').html(result);
        $('#title, #navigation').text(vrCommonRes['mnuReports']);
        $.get(urls.ReportStyles.GetReportStylesData, $.param({ reportStyleVar: ReportStyleId, selectedRowsVar: null, cloneFlag: false }), function (data) {
            if (data) {
                var formVar = $.parseJSON(data);
                ValidateControls(formVar.Id);
                SetReportStylesDetails(formVar);
            }
            else {
                showAjaxReturnMessage(data.message, data.errortype);
            }
        });

    }).fail(function (xhr, status) {
        ShowErrorMessge();
    });
}

//Retrive data from database and fill in the form.
function SetReportStylesDetails(formVar) {
    var color1 = _AccessToHex(formVar.TextForeColor);
    $('#TextForeColor').colorpicker("val", color1);

    var color2 = _AccessToHex(formVar.LineColor);
    $('#LineColor').colorpicker("val", color2);

    var color3 = _AccessToHex(formVar.ShadeBoxColor);
    $('#ShadeBoxColor').colorpicker("val", color3);

    var color4 = _AccessToHex(formVar.ShadowColor);
    $('#ShadowColor').colorpicker("val", color4);

    var color5 = _AccessToHex(formVar.ShadedLineColor);
    $('#ShadedLineColor').colorpicker("val", color5);

    if (formVar.ReportStylesId !== null)
        $('#ReportStylesId').val(formVar.ReportStylesId);
    if (formVar.Id !== null && formVar.Id !== "") {
        $('#Id').val(formVar.Id.trim());
        if (formVar.Id.trim() == "Default")
            $('#Id').attr('readonly', true);
        else
            $('#Id').attr('readonly', false);
    }
    else {
        $('#Id').val("");
    }
    if (formVar.Description !== null && formVar.Description !== "")
        $('#Description').val(formVar.Description.trim());
    else
        $('#Description').val("");
    if (formVar.Heading1Left !== null && formVar.Heading1Left !== "")
        $('#Heading1Left').val(formVar.Heading1Left.trim());
    else
        $('#Heading1Left').val("");
    if (formVar.Heading1Center !== null && formVar.Heading1Center !== "")
        $('#Heading1Center').val(formVar.Heading1Center.trim());
    else
        $('#Heading1Center').val("");
    if (formVar.Heading1Right !== null && formVar.Heading1Right !== "")
        $('#Heading1Right').val(formVar.Heading1Right.trim());
    else
        $('#Heading1Right').val("");
    if (formVar.Heading2Center !== null && formVar.Heading2Center !== "")
        $('#Heading2Center').val(formVar.Heading2Center.trim());
    else
        $('#Heading2Center').val("");
    if (formVar.FooterLeft !== null && formVar.FooterLeft !== "")
        $('#FooterLeft').val(formVar.FooterLeft.trim());
    else
        $('#FooterLeft').val("");
    if (formVar.FooterCenter !== null && formVar.FooterCenter !== "")
        $('#FooterCenter').val(formVar.FooterCenter.trim());
    else
        $('#FooterCenter').val("");
    if (formVar.FooterRight !== null && formVar.FooterRight !== "")
        $('#FooterRight').val(formVar.FooterRight.trim());
    else
        $('#FooterRight').val("");
    if (formVar.Orientation !== null && formVar.Orientation !== "")
        $('#Orientation option[value=' + formVar.Orientation + ']').attr('selected', true);
    if (formVar.HeaderSize !== null)
        $('#HeaderSize').val(formVar.HeaderSize);
    else
        $('#HeaderSize').val("0");
    if (formVar.BoxWidth !== null)
        $('#BoxWidth').val(formVar.BoxWidth);
    else
        $('#BoxWidth').val("0");
    if (formVar.ShadowSize !== null)
        $('#ShadowSize').val(formVar.ShadowSize);
    else
        $('#ShadowSize').val("0");
    if (formVar.MaxLines !== null)
        $('#MaxLines').val(formVar.MaxLines);
    else
        $('#MaxLines').val("0");
    if (formVar.MinColumnWidth !== null)
        $('#MinColumnWidth').val(formVar.MinColumnWidth);
    else
        $('#MinColumnWidth').val("0");
    if (formVar.FixedLines)
        $('#FixedLines').attr('checked', true);
    else
        $('#FixedLines').attr('checked', false);
    if (formVar.BlankLineSpacing !== null)
        $('#BlankLineSpacing').val(formVar.BlankLineSpacing);
    else
        $('#BlankLineSpacing').val("0");
    if (formVar.AltRowShading)
        $('#AltRowShading').attr('checked', true);
    else
        $('#AltRowShading').attr('checked', false);
    if (formVar.ColumnSpacing !== null)
        $('#ColumnSpacing').val(formVar.ColumnSpacing);
    else
        $('#ColumnSpacing').val("0");
    if (formVar.ReportCentered)
        $('#ReportCentered').attr('checked', true);
    else
        $('#ReportCentered').attr('checked', false);
    if (formVar.HeadingL1FontName !== null && formVar.HeadingL1FontName !== "")
        $('#FontName').val(formVar.HeadingL1FontName.trim());
    else
        $('#FontName').val("");
    if (formVar.HeadingL1FontSize !== null)
        $('#FontSize').val(formVar.HeadingL1FontSize);
    else
        $('#FontSize').val("0");
    if (formVar.HeadingL1FontBold)
        $('#FontBold').attr('checked', true);
    else
        $('#FontBold').attr('checked', false);
    if (formVar.HeadingL1FontItalic)
        $('#FontItalic').attr('checked', true);
    else
        $('#FontItalic').attr('checked', false);
    if (formVar.HeadingL1FontUnderlined)
        $('#FontUnderlined').attr('checked', true);
    else
        $('#FontUnderlined').attr('checked', false);

    if (formVar.HeadingL1FontName !== null && formVar.HeadingL1FontName !== "")
        $('#HeadingL1FontName').val(formVar.HeadingL1FontName.trim());
    if (formVar.HeadingL1FontSize !== null)
        $('#HeadingL1FontSize').val(formVar.HeadingL1FontSize);
    if (formVar.HeadingL1FontBold)
        $('#HeadingL1FontBold').val(true);
    else
        $('#HeadingL1FontBold').val(false);
    if (formVar.HeadingL1FontItalic)
        $('#HeadingL1FontItalic').val(true);
    else
        $('#HeadingL1FontItalic').val(false);
    if (formVar.HeadingL1FontUnderlined)
        $('#HeadingL1FontUnderlined').val(true);
    else
        $('#HeadingL1FontUnderlined').val(false);

    if (formVar.HeadingL2FontName !== null && formVar.HeadingL2FontName !== "")
        $('#HeadingL2FontName').val(formVar.HeadingL2FontName.trim());
    if (formVar.HeadingL2FontSize !== null)
        $('#HeadingL2FontSize').val(formVar.HeadingL2FontSize);
    if (formVar.HeadingL2FontBold)
        $('#HeadingL2FontBold').val(true);
    else
        $('#HeadingL2FontBold').val(false);
    if (formVar.HeadingL2FontItalic)
        $('#HeadingL2FontItalic').val(true);
    else
        $('#HeadingL2FontItalic').val(false);
    if (formVar.HeadingL2FontUnderlined)
        $('#HeadingL2FontUnderlined').val(true);
    else
        $('#HeadingL2FontUnderlined').val(false);

    if (formVar.SubHeadingFontName !== null && formVar.SubHeadingFontName !== "")
        $('#SubHeadingFontName').val(formVar.SubHeadingFontName.trim());
    if (formVar.SubHeadingFontSize !== null)
        $('#SubHeadingFontSize').val(formVar.SubHeadingFontSize);
    if (formVar.SubHeadingFontBold)
        $('#SubHeadingFontBold').val(true);
    else
        $('#SubHeadingFontBold').val(false);
    if (formVar.SubHeadingFontItalic)
        $('#SubHeadingFontItalic').val(true);
    else
        $('#SubHeadingFontItalic').val(false);
    if (formVar.SubHeadingFontUnderlined)
        $('#SubHeadingFontUnderlined').val(true);
    else
        $('#SubHeadingFontUnderlined').val(false);

    if (formVar.ColumnHeadingFontName !== null && formVar.ColumnHeadingFontName !== "")
        $('#ColumnHeadingFontName').val(formVar.ColumnHeadingFontName.trim());
    if (formVar.ColumnHeadingFontSize !== null)
        $('#ColumnHeadingFontSize').val(formVar.ColumnHeadingFontSize);
    if (formVar.ColumnHeadingFontBold)
        $('#ColumnHeadingFontBold').val(true);
    else
        $('#ColumnHeadingFontBold').val(false);
    if (formVar.ColumnHeadingFontItalic)
        $('#ColumnHeadingFontItalic').val(true);
    else
        $('#ColumnHeadingFontItalic').val(false);
    if (formVar.ColumnHeadingFontUnderlined)
        $('#ColumnHeadingFontUnderlined').val(true);
    else
        $('#ColumnHeadingFontUnderlined').val(false);

    if (formVar.ColumnFontName !== null && formVar.ColumnFontName !== "")
        $('#ColumnFontName').val(formVar.ColumnFontName.trim());
    if (formVar.ColumnFontSize !== null)
        $('#ColumnFontSize').val(formVar.ColumnFontSize);
    if (formVar.ColumnFontBold)
        $('#ColumnFontBold').val(true);
    else
        $('#ColumnFontBold').val(false);
    if (formVar.ColumnFontItalic)
        $('#ColumnFontItalic').val(true);
    else
        $('#ColumnFontItalic').val(false);
    if (formVar.ColumnFontUnderlined)
        $('#ColumnFontUnderlined').val(true);
    else
        $('#ColumnFontUnderlined').val(false);

    if (formVar.FooterFontName !== null && formVar.FooterFontName !== "")
        $('#FooterFontName').val(formVar.FooterFontName.trim());
    if (formVar.FooterFontSize !== null)
        $('#FooterFontSize').val(formVar.FooterFontSize);
    if (formVar.FooterFontBold)
        $('#FooterFontBold').val(true);
    else
        $('#FooterFontBold').val(false);
    if (formVar.FooterFontItalic)
        $('#FooterFontItalic').val(true);
    else
        $('#FooterFontItalic').val(false);
    if (formVar.FooterFontUnderlined)
        $('#FooterFontUnderlined').val(true);
    else
        $('#FooterFontUnderlined').val(false);

    if (formVar.LeftMargin !== null)
        $('#LeftMargin').val(formVar.LeftMargin);
    else
        $('#LeftMargin').val("0");
    if (formVar.TopMargin !== null)
        $('#TopMargin').val(formVar.TopMargin);
    else
        $('#TopMargin').val("0");
    if (formVar.RightMargin !== null)
        $('#RightMargin').val(formVar.RightMargin);
    else
        $('#RightMargin').val("0");
    if (formVar.BottomMargin !== null)
        $('#BottomMargin').val(formVar.BottomMargin);
    else
        $('#BottomMargin').val("0");
}

//Prevent cut copy paste
function PreventCopy(fieldId) {
    $(fieldId).bind('cut copy paste', function (e) {
        e.preventDefault();
    });
}

//Remove selected record from database
function DeleteTrackingField() {
    //var selectedRows = $('#grdReportStyle').getSelectedRowsIds();
    var selectedRows = $('#grdReportStyle').getGridParam('selrow');
    var selectedRows1 = parseInt(selectedRows);
    var rowData = jQuery("#grdReportStyle").getRowData(selectedRows);
    var reportStyle = rowData["Id"];
    $.get(urls.ReportStyles.RemoveReportStyle, $.param({ selectedRowsVar: selectedRows1, reportStyleVar: reportStyle }), function (data) {
        if (data) {
            showAjaxReturnMessage(data.message, data.errortype);
            if (data.errortype == 's') {
                $("#grdReportStyle").refreshJqGrid();
                $('#FALRPTSTL_' + rowData.ReportStylesId).parent().remove();
                $('#liReports').parent().height($('#liReports').parent().height() - 30);
                window.location.reload();
            }
        }
    });
}//Remove selected record from database

function LoadFontItemDDL(previousVal, boolVal) {

    var reportStyle = $('#Id').val();
    var selectedRows = $('#ReportStylesId').val();
    var selectedVal = $('#FontItem option:selected').val();
    var $form = $('#frmReportStyles');
    if ($form.valid()) {
        if (previousVal == 1) {
            $('#HeadingL1FontName').val($('#FontName').val());
            $('#HeadingL1FontSize').val($('#FontSize').val());
            if ($('#FontBold').is(':checked'))
                $('#HeadingL1FontBold').val(true);
            else
                $('#HeadingL1FontBold').val(false);
            if ($('#FontItalic').is(':checked'))
                $('#HeadingL1FontItalic').val(true);
            else
                $('#HeadingL1FontItalic').val(false);
            if ($('#FontUnderlined').is(':checked'))
                $('#HeadingL1FontUnderlined').val(true);
            else
                $('#HeadingL1FontUnderlined').val(false);
        }
        else if (previousVal == 2) {
            $('#HeadingL2FontName').val($('#FontName').val());
            $('#HeadingL2FontSize').val($('#FontSize').val());
            if ($('#FontBold').is(':checked'))
                $('#HeadingL2FontBold').val(true);
            else
                $('#HeadingL2FontBold').val(false);
            if ($('#FontItalic').is(':checked'))
                $('#HeadingL2FontItalic').val(true);
            else
                $('#HeadingL2FontItalic').val(false);
            if ($('#FontUnderlined').is(':checked'))
                $('#HeadingL2FontUnderlined').val(true);
            else
                $('#HeadingL2FontUnderlined').val(false);
        }
        else if (previousVal == 3) {
            $('#SubHeadingFontName').val($('#FontName').val());
            $('#SubHeadingFontSize').val($('#FontSize').val());
            if ($('#FontBold').is(':checked'))
                $('#SubHeadingFontBold').val(true);
            else
                $('#SubHeadingFontBold').val(false);
            if ($('#FontItalic').is(':checked'))
                $('#SubHeadingFontItalic').val(true);
            else
                $('#SubHeadingFontItalic').val(false);
            if ($('#FontUnderlined').is(':checked'))
                $('#SubHeadingFontUnderlined').val(true);
            else
                $('#SubHeadingFontUnderlined').val(false);
        }
        else if (previousVal == 4) {
            $('#ColumnHeadingFontName').val($('#FontName').val());
            $('#ColumnHeadingFontSize').val($('#FontSize').val());
            if ($('#FontBold').is(':checked'))
                $('#ColumnHeadingFontBold').val(true);
            else
                $('#ColumnHeadingFontBold').val(false);
            if ($('#FontItalic').is(':checked'))
                $('#ColumnHeadingFontItalic').val(true);
            else
                $('#ColumnHeadingFontItalic').val(false);
            if ($('#FontUnderlined').is(':checked'))
                $('#ColumnHeadingFontUnderlined').val(true);
            else
                $('#ColumnHeadingFontUnderlined').val(false);
        }
        else if (previousVal == 5) {
            $('#ColumnFontName').val($('#FontName').val());
            $('#ColumnFontSize').val($('#FontSize').val());
            if ($('#FontBold').is(':checked'))
                $('#ColumnFontBold').val(true);
            else
                $('#ColumnFontBold').val(false);
            if ($('#FontItalic').is(':checked'))
                $('#ColumnFontItalic').val(true);
            else
                $('#ColumnFontItalic').val(false);
            if ($('#FontUnderlined').is(':checked'))
                $('#ColumnFontUnderlined').val(true);
            else
                $('#ColumnFontUnderlined').val(false);
        }
        else if (previousVal == 6) {
            $('#FooterFontName').val($('#FontName').val());
            $('#FooterFontSize').val($('#FontSize').val());
            if ($('#FontBold').is(':checked'))
                $('#FooterFontBold').val(true);
            else
                $('#FooterFontBold').val(false);
            if ($('#FontItalic').is(':checked'))
                $('#FooterFontItalic').val(true);
            else
                $('#FooterFontItalic').val(false);
            if ($('#FontUnderlined').is(':checked'))
                $('#FooterFontUnderlined').val(true);
            else
                $('#FooterFontUnderlined').val(false);
        }
        if (boolVal) {
            var serializeFormData = $form.serialize() + "&pFixedLines=" + $('#FixedLines').is(':checked') + "&pAltRowShading=" + $('#AltRowShading').is(':checked') + "&pReportCentered=" + $('#ReportCentered').is(':checked');
            $.post(urls.ReportStyles.SetReportStylesData, serializeFormData, function (data) {
                if (data) {
                    if (data.errortype == 's') {
                        var formVar = $.parseJSON(data.reportBackJSON);
                        if (selectedVal == 1) {
                            if (formVar.HeadingL1FontName !== null && formVar.HeadingL1FontName !== "")
                                $('#FontName').val(formVar.HeadingL1FontName);
                            else
                                $('#FontName').val("");
                            if (formVar.HeadingL1FontSize !== null)
                                $('#FontSize').val(formVar.HeadingL1FontSize);
                            else
                                $('#FontSize').val("");
                            if (formVar.HeadingL1FontBold)
                                $("#FontBold").attr('checked', true);
                            else
                                $("#FontBold").attr('checked', false);
                            if (formVar.HeadingL1FontItalic)
                                $("#FontItalic").attr('checked', true);
                            else
                                $("#FontItalic").attr('checked', false);
                            if (formVar.HeadingL1FontUnderlined)
                                $("#FontUnderlined").attr('checked', true);
                            else
                                $("#FontUnderlined").attr('checked', false);

                        }
                        else if (selectedVal == 2) {
                            if (formVar.HeadingL2FontName !== null && formVar.HeadingL2FontName !== "")
                                $('#FontName').val(formVar.HeadingL2FontName);
                            else
                                $('#FontName').val("");
                            if (formVar.HeadingL2FontSize !== null)
                                $('#FontSize').val(formVar.HeadingL2FontSize);
                            else
                                $('#FontSize').val("");
                            if (formVar.HeadingL2FontBold)
                                $("#FontBold").attr('checked', true);
                            else
                                $("#FontBold").attr('checked', false);
                            if (formVar.HeadingL2FontItalic)
                                $("#FontItalic").attr('checked', true);
                            else
                                $("#FontItalic").attr('checked', false);
                            if (formVar.HeadingL2FontUnderlined)
                                $("#FontUnderlined").attr('checked', true);
                            else
                                $("#FontUnderlined").attr('checked', false);

                        }
                        else if (selectedVal == 3) {
                            if (formVar.SubHeadingFontName !== null && formVar.SubHeadingFontName !== "")
                                $('#FontName').val(formVar.SubHeadingFontName);
                            else
                                $('#FontName').val("");
                            if (formVar.SubHeadingFontSize !== null)
                                $('#FontSize').val(formVar.SubHeadingFontSize);
                            else
                                $('#FontSize').val("");
                            if (formVar.SubHeadingFontBold)
                                $("#FontBold").attr('selected', true);
                            else
                                $("#FontBold").attr('selected', false);
                            if (formVar.SubHeadingFontItalic)
                                $("#FontItalic").attr('selected', true);
                            else
                                $("#FontItalic").attr('selected', false);
                            if (formVar.SubHeadingFontUnderlined)
                                $("#FontUnderlined").attr('selected', true);
                            else
                                $("#FontUnderlined").attr('selected', false);

                        }
                        else if (selectedVal == 4) {
                            if (formVar.ColumnHeadingFontName !== null && formVar.ColumnHeadingFontName !== "")
                                $('#FontName').val(formVar.ColumnHeadingFontName);
                            else
                                $('#FontName').val("");
                            if (formVar.ColumnHeadingFontSize !== null)
                                $('#FontSize').val(formVar.ColumnHeadingFontSize);
                            else
                                $('#FontSize').val("");
                            if (formVar.ColumnHeadingFontBold)
                                $("#FontBold").attr('selected', true);
                            else
                                $("#FontBold").attr('selected', false);
                            if (formVar.ColumnHeadingFontItalic)
                                $("#FontItalic").attr('selected', true);
                            else
                                $("#FontItalic").attr('selected', false);
                            if (formVar.ColumnHeadingFontUnderlined)
                                $("#FontUnderlined").attr('selected', true);
                            else
                                $("#FontUnderlined").attr('selected', false);

                        }
                        else if (selectedVal == 5) {
                            if (formVar.ColumnFontName !== null && formVar.ColumnFontName !== "")
                                $('#FontName').val(formVar.ColumnFontName);
                            else
                                $('#FontName').val("");
                            if (formVar.ColumnFontSize !== null)
                                $('#FontSize').val(formVar.ColumnFontSize);
                            else
                                $('#FontSize').val("");
                            if (formVar.ColumnFontBold)
                                $("#FontBold").attr('selected', true);
                            else
                                $("#FontBold").attr('selected', false);
                            if (formVar.ColumnFontItalic)
                                $("#FontItalic").attr('selected', true);
                            else
                                $("#FontItalic").attr('selected', false);
                            if (formVar.ColumnFontUnderlined)
                                $("#FontUnderlined").attr('selected', true);
                            else
                                $("#FontUnderlined").attr('selected', false);
                        }
                        else if (selectedVal == 6) {
                            if (formVar.FooterFontName !== null && formVar.FooterFontName !== "")
                                $('#FontName').val(formVar.FooterFontName);
                            else
                                $('#FontName').val("");
                            if (formVar.FooterFontSize !== null)
                                $('#FontSize').val(formVar.FooterFontSize);
                            else
                                $('#HeadingL1FontSize').val("");
                            if (formVar.FooterFontBold)
                                $("#FontBold").attr('selected', true);
                            else
                                $("#FontBold").attr('selected', false);
                            if (formVar.FooterFontItalic)
                                $("#FontItalic").attr('selected', true);
                            else
                                $("#FontItalic").attr('selected', false);
                            if (formVar.FooterFontUnderlined)
                                $("#FontUnderlined").attr('selected', true);
                            else
                                $("#FontUnderlined").attr('selected', false);
                        }
                    }
                    if (data.errortype == "w")
                        return false;
                }
                return true;

            });
        }

    }
}

function ValidateControls(reportStyle) {
    $('#TextForeColor').colorpicker({
        displayIndicator: false
    });

    $('#LineColor').colorpicker({
        displayIndicator: false
    });

    $('#ShadeBoxColor').colorpicker({
        displayIndicator: false
    });

    $('#ShadowColor').colorpicker({
        displayIndicator: false
    });

    $('#ShadedLineColor').colorpicker({
        displayIndicator: false
    });
    $('#FontItem').on('change', function () {
        var selectedVal = $('#FontItem option:selected').val();
        var selectedSize = $('#FontSize').val();
        var previousVal = $(this).attr('previous');
        var newVal = $(this).find(':selected');
        $(this).attr('previous', newVal.val());
        LoadFontItemDDL(previousVal, true);
    });

    $('#btnChoose').on('click', function () {
        $('#mdlFont').ShowModel();
        $.post(urls.ReportStyles.LoadFontModel, function (data) {
            if (data) {
                var fontJSON = $.parseJSON(data.fontJSON);
                var fontSizeJson = $.parseJSON(data.fontSizeJson);
                $('#ddlFont').empty();
                $('#ddlSize').empty();
                $(fontJSON).each(function (i, item) {
                    $('#ddlFont').append('<option value="' + item.Key + '" >' + item.Value + '</option>');
                });
                $(fontSizeJson).each(function (i, item) {
                    $('#ddlSize').append('<option value="' + item.Key + '">' + item.Value + '</option>');
                });

                var fontName = $('#FontName').val();
                var fontSize = $('#FontSize').val();

                var fontBold = $('#FontBold').is(':checked');
                var fontItalic = $('#FontItalic').is(':checked');
                var fontUnderline = $('#FontUnderlined').is(':checked');
                var found = false;
                for (i = 0; i < fontJSON.length && !found; i++) {
                    if (fontJSON[i].Key === fontName) {
                        found = true;
                    }
                }
                if (found) {
                    $("#ddlFont").val(fontName);
                }
                else {
                    showAjaxReturnMessage(String.format(vrReportsRes["msgJsReportStyleIsNotAvailablePlzChooseOtherFont"], fontName), "w");
                }
                $("#ddlSize").val(fontSize);
                $("#textFontSize").val(fontSize);
                var fontF = document.getElementById("ddlFont");
                var fontFamily = fontF.options[fontF.selectedIndex].text;
                $('#lblSampleDemo').css("font-family", fontFamily);
                $('#lblSampleDemo').css("font-size", fontSize + "px");
                $('#pFontBold').attr('checked', fontBold);
                $('#pFontItalic').attr('checked', fontItalic);
                $('#pFontUnderlined').attr('checked', fontUnderline);

                if ($('#pFontBold').is(":checked")) {
                    $('#lblSampleDemo').css('font-weight', 'bold');
                }
                else {
                    $('#lblSampleDemo').css('font-weight', 'normal');
                }

                if ($('#pFontItalic').is(":checked")) {
                    $('#lblSampleDemo').css('font-style', 'italic');
                }
                else {
                    $('#lblSampleDemo').css('font-style', 'normal');
                }

                if ($('#pFontUnderlined').is(":checked")) {
                    $('#lblSampleDemo').css('text-decoration', 'underline');
                }
                else {
                    $('#lblSampleDemo').css('text-decoration', 'none');
                }
            }
        });
    });
    PreventCopy("#HeaderSize");
    PreventCopy("#BoxWidth");
    PreventCopy("#ShadowSize");
    PreventCopy("#MaxLines");
    PreventCopy("#MinColumnWidth");
    PreventCopy("#BlankLineSpacing");
    PreventCopy("#ColumnSpacing");
    PreventCopy("#LeftMargin");
    PreventCopy("#TopMargin");
    PreventCopy("#RightMargin");
    PreventCopy("#BottomMargin");
    $('#HeaderSize').OnlyNumericWithoutDot();
    $('#BoxWidth').OnlyNumericWithoutDot();
    $('#ShadowSize').OnlyNumericWithoutDot();
    $('#MaxLines').OnlyNumericWithoutDot();
    $('#MinColumnWidth').OnlyNumericWithoutDot();
    $('#BlankLineSpacing').OnlyNumericWithoutDot();
    $('#ColumnSpacing').OnlyNumericWithoutDot();
    $('#LeftMargin').OnlyNumericWithoutDot();
    $('#TopMargin').OnlyNumericWithoutDot();
    $('#RightMargin').OnlyNumericWithoutDot();
    $('#BottomMargin').OnlyNumericWithoutDot();
    //Save data in database when click on 'Apply'
    $('#btnApplyStyle').click(function () {
        var textFore = $('#TextForeColor').colorpicker("val");
        $('#TextForeColor').val(_HexToAccess(textFore));

        var textLine = $('#LineColor').colorpicker("val");
        $('#LineColor').val(_HexToAccess(textLine));

        var textBox = $('#ShadeBoxColor').colorpicker("val");
        $('#ShadeBoxColor').val(_HexToAccess(textBox));

        var textShadow = $('#ShadowColor').colorpicker("val");
        $('#ShadowColor').val(_HexToAccess(textShadow));

        var textShadowLine = $('#ShadedLineColor').colorpicker("val");
        $('#ShadedLineColor').val(_HexToAccess(textShadowLine));

        var $form = $('#frmReportStyles');
        var fontVal = $('#FontSize').val();
        if ($form.valid()) {
            if ($('#Id').val().trim() == "") {
                showAjaxReturnMessage(vrReportsRes["msgJsReportStyleTheRptNameIsRequired"], "w");
                return false;
            }
            if (!(8 <= parseInt(fontVal) && parseInt(fontVal) <= 72)) {
                showAjaxReturnMessage(vrReportsRes["msgAddReportStylePartialTheFontSizeMustbebetween8n72"], "w");
                return false;
            }
            var flagValid = ValidateRequiredField("#HeaderSize", vrReportsRes["lblAddReportStylePartialHeaderBoxHgt"]);
            if (flagValid)
                flagValid = ValidateRequiredField("#BoxWidth", vrReportsRes["lblAddReportStylePartialLnThickness"]);
            if (flagValid)
                flagValid = ValidateRequiredField("#ShadowSize", vrReportsRes["lblAddReportStylePartialShadowThickness"]);
            if (flagValid)
                flagValid = ValidateRequiredField("#MaxLines", vrReportsRes["lblAddReportStylePartialMaxRowLns"]);
            if (flagValid)
                flagValid = ValidateRequiredField("#MinColumnWidth", vrReportsRes["lblAddReportStylePartialMinColWidth"]);
            if (flagValid)
                flagValid = ValidateRequiredField("#BlankLineSpacing", vrReportsRes["lblAddReportStylePartialBlankLnSpacing"]);
            if (flagValid)
                flagValid = ValidateRequiredField("#ColumnSpacing", vrReportsRes["lblAddReportStylePartialColSpacing"]);
            if (flagValid)
                flagValid = ValidateRequiredField("#LeftMargin", vrReportsRes["lblAddReportStylePartialLeft"]);
            if (flagValid)
                flagValid = ValidateRequiredField("#TopMargin", vrReportsRes["lblAddReportStylePartialTop"]);
            if (flagValid)
                flagValid = ValidateRequiredField("#RightMargin", vrReportsRes["lblAddReportStylePartialRight"]);
            if (flagValid)
                flagValid = ValidateRequiredField("#BottomMargin", vrReportsRes["lblAddReportStylePartialBottom"]);
            if (flagValid) {
                var previousVal = $('#FontItem').attr('previous');
                LoadFontItemDDL(previousVal, false);
                var serializeFormData = $form.serialize() + "&pFixedLines=" + $('#FixedLines').is(':checked') + "&pAltRowShading=" + $('#AltRowShading').is(':checked') + "&pReportCentered=" + $('#ReportCentered').is(':checked');
                $.post(urls.ReportStyles.SetReportStylesData, serializeFormData, function (data) {
                    if (data) {
                        if (data.reportBackJSON != undefined) {
                            fnAddNewMenu(data);
                        }
                        showAjaxReturnMessage(data.message, data.errortype);
                        if (data.errortype == "w")
                            return false;
                    }   
                    return true;
                });
            }
        }
        return true;
    });
}
function fnAddNewMenu(data) {
    if ($('#liReports').find('#FALRPTSTL_' + JSON.parse(data.reportBackJSON).ReportStylesId).length == 0) {
        $('#liReports').find('a').removeClass('selectedMenu');

        var newLI = '<li><a class="selectedMenu" id="FALRPTSTL_' + JSON.parse(data.reportBackJSON).ReportStylesId + '" onclick="ReportStyleChildItemClick(\'treeReports\',\'ALRPTSTL_2\',\'FALRPTSTL_' + JSON.parse(data.reportBackJSON).ReportStylesId + '\')">' + JSON.parse(data.reportBackJSON).Id + '</a></li>';
        $('#ALRPTSTL_2').parent().find('ul.displayed').prepend(newLI);
        $('#FALRPTSTL_tmp').addClass('selectedMenu');
        if ($("ul#ulReports >li:last ul").hasClass("displayed")) {
            $('#liReports').parent().height($('#liReports').parent().height() + 60);
        }
    }
    else {
        $('#liReports').find('#FALRPTSTL_' + JSON.parse(data.reportBackJSON).ReportStylesId).html(JSON.parse(data.reportBackJSON).Id);
    }
}
function ValidateRequiredField(FieldId, FieldName) {
    if ($(FieldId).val() == "") {
        showAjaxReturnMessage(String.format(vrReportsRes["msgJsReportStyleFieldIsRequired"], FieldName), "w");
        return false;
    }
    else {
        return true;
    }
}

function _AccessToHex(color) {
    if (color == "" || color == null)
        color = 0;
    var colorInHex = "#" + color.toString(16).split("").reverse().join("");
    if (colorInHex.length != 7) {
        while (colorInHex.length != 7) {
            colorInHex = colorInHex + "0";
        }
    }
    return colorInHex;
}

function _HexToAccess(color) {
    return parseInt(color.split("").reverse().join(""), 16);
}