var TempVar = null;
var SelectedLoad = null;
var states = {};
var inputFile = "";
var fileContent = null;
var processLoadErrorType;
var lastSucceed = 0;
var GlobaljsonObject;
var IsLoad = true;
var HasError = false;
$arySort = [];
var jobErrorStatus = {};
var IsUserCameFromModifyOp = false;



$(function () {
    /* Start : Hide side panel */
    $('.nav-tabs > li a[title]').tooltip();
    $.ajax({
        type: "POST",
        url: 'Admin/ValidateApplicationLink',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ pModuleNameStr: 'Import Setup' }),
        async: false,
        success: function (response) {
            var responseCode = parseInt(response);
            if (responseCode == 0 || responseCode == 2) {
                $.post(urls.Import.GetImportDDL, function (response) {
                    if (response !== null && response !== "" && response !== undefined) {
                        if (response.errortype == "s") {
                            var oImportDDLJSON = $.parseJSON(response.oImportDDLJSON);
                            BindDDLDynamically('#slcImportLoads', oImportDDLJSON);
                        } else {
                            showAjaxReturnMessage(response.errorMessage, response.errortype);
                        }
                    }
                });
                $('#NewLoadId, #btnRemove, #btnInSetup, #btnNext, #btnFinish, #btnPrevious, #btnError, #btnReport').hide();
                if (responseCode == 2) {
                    $('#btnRun').hide();
                    showAjaxReturnMessage(vrImportRes["msgJsImportDoNotHaveRights"], "w");
                }
            }
            else {
                $('#btnError').hide();
                $('#btnReport').hide();
                $('#mdlImportSetup').ShowModel();

                $.post(urls.Import.GetImportDDL, function (response) {
                    if (response !== null && response !== "" && response !== undefined) {
                        if (response.errortype == "s") {
                            var oImportDDLJSON = $.parseJSON(response.oImportDDLJSON);
                            if (oImportDDLJSON.length == 0) {
                                $('#btnRun').attr('disabled', 'disabled');
                                $('#btnInSetup').attr('disabled', 'disabled');
                                $('#btnRemove').attr('disabled', 'disabled');
                                $('#btnMonitor').attr('disabled', 'disabled');
                                $('#btnNext').attr('disabled', 'disabled');
                            } else {
                                $('#btnRun').removeAttr('disabled', 'disabled');
                                $('#btnInSetup').removeAttr('disabled', 'disabled');
                                $('#btnRemove').removeAttr('disabled', 'disabled');
                                $('#btnMonitor').removeAttr('disabled', 'disabled');
                                $('#btnNext').removeAttr('disabled', 'disabled');
                            }
                            $('#btnFinish').attr('disabled', 'disabled');
                            $('#btnPrevious').attr('disabled', 'disabled');
                            $('#tableDIv').hide();
                            $('#errorDiv').hide();
                            BindDDLDynamically('#slcImportLoads', oImportDDLJSON);
                        } else {
                            showAjaxReturnMessage(response.errorMessage, response.errortype);
                        }
                    }
                });

                $('#slcImportLoads').on('change', function () {
                    $('#btnNext').removeAttr('disabled', 'disabled');
                    $('#btnError').hide();
                    $('#btnReport').hide();
                });
            }

            //$('#FileInputForRun').change(function () {
            //    alert('ran');
            //    var HasAttachmentVal = $("#slcImportLoads option:selected").attr("HasAttachment");
            //    var ImportLoadName = $("#slcImportLoads option:selected").val();
            //    if (HasAttachmentVal == "true") {
            //        var Tempfile = document.getElementById('FileInputForRun').files[0];
            //        var control = $('#FileInputForRun');
            //        control.replaceWith(control.clone(false));
            //        var UploadedFile = new FormData();
            //        UploadedFile.append("File", Tempfile);
            //        UploadedFile.append("ImportLoadName", ImportLoadName);
            //        $.ajax({
            //            url: urls.Import.UploadSingleFile,
            //            data: UploadedFile,
            //            async: false,
            //            processData: false,
            //            contentType: false,
            //            type: 'POST',
            //            success: function (data) {
            //                $('#FileInputForRun').val("");
            //                if (data.errortype == "s") {
            //                    $.FileDialog({ multiple: true }).on('files.bs.filedialog', function (ev) {
            //                        var files = ev.files;
            //                        var filesSize = 0;
            //                        $.each(files, function (index, value) {
            //                            filesSize = filesSize + value.size;
            //                        });

            //                        if (filesSize > 2147483648) {
            //                            showAjaxReturnMessage(vrImportRes["msgJsImportAllowed2GB"], 'w');
            //                            return false;
            //                        }
            //                        var data = new FormData();
            //                        for (var i = 0; i < files.length; i++) {
            //                            data.append(files[i].name, files[i]);
            //                        }
            //                        data.append("ImportLoadName", ImportLoadName);
            //                        $.ajax({
            //                            url: urls.Import.AttachImages,//
            //                            type: "POST",
            //                            data: data,
            //                            contentType: false,
            //                            async: false,
            //                            processData: false,
            //                            success: function (data) {
            //                                if (data.IsProcessLoad == false) {
            //                                    showAjaxReturnMessage(data.message, data.errortype);
            //                                }
            //                                else {
            //                                    var msgss = data.message.replace(/(<<)/g, '<< ');
            //                                    msgss = msgss.replace(/(>>)/g, ' >>');
            //                                    if (data.errortype == "p") {
            //                                        $('#btnError').hide();
            //                                        $('#btnReport').hide();
            //                                        showAjaxReturnMessage(msgss, "w");
            //                                    } else {
            //                                        $('#btnError').show();
            //                                        $('#btnReport').show();
            //                                        if (data.errortype == "s") {
            //                                            $('#btnError').hide();
            //                                            showAjaxReturnMessage(msgss, "s");
            //                                        } else if (data.errortype == "c") {
            //                                            $('#btnReport').hide();
            //                                            showAjaxReturnMessage(msgss, "e");
            //                                        } else if (data.errortype == "r") {
            //                                            showAjaxReturnMessage(msgss, "e");
            //                                        } else {
            //                                            showAjaxReturnMessage(msgss, data.errortype);
            //                                        }
            //                                    }
            //                                }
            //                            },
            //                            error: function (err) {
            //                                showAjaxReturnMessage(err.statusText, 'e');
            //                            }
            //                        });
            //                        return undefined;
            //                    }).on('cancel.bs.filedialog', function (ev) {

            //                    });
            //                } else {
            //                    showAjaxReturnMessage(data.message, data.errortype);
            //                }
            //            },
            //            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //                console.log("status: " + textStatus + " Error: " + errorThrown);
            //            }
            //        });
            //    }
            //    else {
            //        console.log("inside FileInputForRun change Event")
            //        var Tempfile = document.getElementById('FileInputForRun').files[0];
            //        var control = $('#FileInputForRun');
            //        control.replaceWith(control.clone(false));
            //        var UploadedFile = new FormData();
            //        UploadedFile.append("File", Tempfile);
            //        UploadedFile.append("ImportLoadName", ImportLoadName);
            //        $.ajax({
            //            url: urls.Import.UploadFileAndRunLoad,
            //            data: UploadedFile,
            //            async: false,
            //            processData: false,
            //            contentType: false,
            //            type: 'POST',
            //            global: true,
            //            success: function (data) {
            //                $('#FileInputForRun').val("");
            //                if (data.IsProcessLoad == false) {
            //                    showAjaxReturnMessage(data.message, data.errortype);
            //                }
            //                else {
            //                    var msgss = data.message.replace(/(<<)/g, '<< ');
            //                    msgss = msgss.replace(/(>>)/g, ' >>');
            //                    if (data.errortype == "p") {
            //                        $('#btnError').hide();
            //                        $('#btnReport').hide();
            //                        showAjaxReturnMessage(msgss, "w");
            //                    } else {
            //                        $('#btnError').show();
            //                        $('#btnReport').show();
            //                        if (data.errortype == "s") {
            //                            $('#btnError').hide();
            //                            showAjaxReturnMessage(msgss, "s");
            //                        } else if (data.errortype == "c") {
            //                            $('#btnReport').hide();
            //                            showAjaxReturnMessage(msgss, "e");
            //                        } else if (data.errortype == "r") {
            //                            showAjaxReturnMessage(msgss, "e");
            //                        } else {
            //                            showAjaxReturnMessage(msgss, data.errortype);
            //                        }
            //                    }
            //                }
            //            },
            //            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //                console.log("status: " + textStatus + " Error: " + errorThrown);
            //            }
            //        });
            //    }
            //});

            //$('#btnRun').off('click').on('click', function (e) {
            //    var HasAttachmentVal = $("#slcImportLoads option:selected").attr("HasAttachment");
            //    var ImportLoadName = $("#slcImportLoads option:selected").val();
            //    if (HasAttachmentVal == "true") {
            //        //$('#FileInputForRun').click();
            //        //$('#FileInputForRun').off('change');

            //        $('#FileInputForRun').change(function () {
            //            var Tempfile = document.getElementById('FileInputForRun').files[0];
            //            var control = $('#FileInputForRun');
            //            control.replaceWith(control.clone(false));
            //            var UploadedFile = new FormData();
            //            UploadedFile.append("File", Tempfile);
            //            UploadedFile.append("ImportLoadName", ImportLoadName);
            //            $.ajax({
            //                url: urls.Import.UploadSingleFile,
            //                data: UploadedFile,
            //                async: false,
            //                processData: false,
            //                contentType: false,
            //                type: 'POST',
            //                success: function (data) {
            //                    $('#FileInputForRun').val("");
            //                    if (data.errortype == "s") {
            //                        $.FileDialog({ multiple: true }).on('files.bs.filedialog', function (ev) {
            //                            var files = ev.files;
            //                            var filesSize = 0;
            //                            $.each(files, function (index, value) {
            //                                filesSize = filesSize + value.size;
            //                            });

            //                            if (filesSize > 2147483648) {
            //                                showAjaxReturnMessage(vrImportRes["msgJsImportAllowed2GB"], 'w');
            //                                return false;
            //                            }
            //                            var data = new FormData();
            //                            for (var i = 0; i < files.length; i++) {
            //                                data.append(files[i].name, files[i]);
            //                            }
            //                            data.append("ImportLoadName", ImportLoadName);
            //                            $.ajax({
            //                                url: urls.Import.AttachImages,//
            //                                type: "POST",
            //                                data: data,
            //                                contentType: false,
            //                                async: false,
            //                                processData: false,
            //                                success: function (data) {
            //                                    if (data.IsProcessLoad == false) {
            //                                        showAjaxReturnMessage(data.message, data.errortype);
            //                                    }
            //                                    else {
            //                                        var msgss = data.message.replace(/(<<)/g, '<< ');
            //                                        msgss = msgss.replace(/(>>)/g, ' >>');
            //                                        if (data.errortype == "p") {
            //                                            $('#btnError').hide();
            //                                            $('#btnReport').hide();
            //                                            showAjaxReturnMessage(msgss, "w");
            //                                        } else {
            //                                            $('#btnError').show();
            //                                            $('#btnReport').show();
            //                                            if (data.errortype == "s") {
            //                                                $('#btnError').hide();
            //                                                showAjaxReturnMessage(msgss, "s");
            //                                            } else if (data.errortype == "c") {
            //                                                $('#btnReport').hide();
            //                                                showAjaxReturnMessage(msgss, "e");
            //                                            } else if (data.errortype == "r") {
            //                                                showAjaxReturnMessage(msgss, "e");
            //                                            } else {
            //                                                showAjaxReturnMessage(msgss, data.errortype);
            //                                            }
            //                                        }
            //                                    }
            //                                },
            //                                error: function (err) {
            //                                    showAjaxReturnMessage(err.statusText, 'e');
            //                                }
            //                            });
            //                            return undefined;
            //                        }).on('cancel.bs.filedialog', function (ev) {

            //                        });
            //                    } else {
            //                        showAjaxReturnMessage(data.message, data.errortype);
            //                    }
            //                },
            //                error: function (XMLHttpRequest, textStatus, errorThrown) {
            //                    console.log("status: " + textStatus + " Error: " + errorThrown);
            //                }
            //            });
            //        });
            //        $('#FileInputForRun').click();
            //    } else {
            //        //console.log("before FileInputForRun Click Event")
            //        //$('#FileInputForRun').click();
            //        ////$('#FileInputForRun').off('change');
            //        //console.log("before FileInputForRun change Event")
            //        ////$('#FileInputForRun').on('change',(function () {
            //        ////}));

            //        //$('#FileInputForRun').indeterminate = true;
            //        //$('#FileInputForRun').on('change', function () {
            //        //    alert('change');
            //        //});

            //        $('#FileInputForRun').change(function () {
            //            console.log("inside FileInputForRun change Event")
            //            var Tempfile = document.getElementById('FileInputForRun').files[0];
            //            var control = $('#FileInputForRun');
            //            control.replaceWith(control.clone(false));
            //            var UploadedFile = new FormData();
            //            UploadedFile.append("File", Tempfile);
            //            UploadedFile.append("ImportLoadName", ImportLoadName);
            //            $.ajax({
            //                url: urls.Import.UploadFileAndRunLoad,
            //                data: UploadedFile,
            //                async: false,
            //                processData: false,
            //                contentType: false,
            //                type: 'POST',
            //                global: true,
            //                success: function (data) {
            //                    $('#FileInputForRun').val("");
            //                    if (data.IsProcessLoad == false) {
            //                        showAjaxReturnMessage(data.message, data.errortype);
            //                    }
            //                    else {
            //                        var msgss = data.message.replace(/(<<)/g, '<< ');
            //                        msgss = msgss.replace(/(>>)/g, ' >>');
            //                        if (data.errortype == "p") {
            //                            $('#btnError').hide();
            //                            $('#btnReport').hide();
            //                            showAjaxReturnMessage(msgss, "w");
            //                        } else {
            //                            $('#btnError').show();
            //                            $('#btnReport').show();
            //                            if (data.errortype == "s") {
            //                                $('#btnError').hide();
            //                                showAjaxReturnMessage(msgss, "s");
            //                            } else if (data.errortype == "c") {
            //                                $('#btnReport').hide();
            //                                showAjaxReturnMessage(msgss, "e");
            //                            } else if (data.errortype == "r") {
            //                                showAjaxReturnMessage(msgss, "e");
            //                            } else {
            //                                showAjaxReturnMessage(msgss, data.errortype);
            //                            }
            //                        }
            //                    }
            //                },
            //                error: function (XMLHttpRequest, textStatus, errorThrown) {
            //                    console.log("status: " + textStatus + " Error: " + errorThrown);
            //                }
            //            });

            //        });
            //        console.log("after FileInputForRun change Event")
            //        $('#FileInputForRun').click();
            //    }
            //});
        },
        failure: function (response) {
        }
    });

    $('#btnRemove').off('click').on('click', function (e) {
        IsUserCameFromModifyOp = false;
        $('#btnError').hide();
        $('#btnReport').hide();
        var currentLoad = $("#slcImportLoads option:selected").text();
        $.ajax({
            url: urls.Import.CheckIfInUsed,
            type: "POST",
            async: false,
            data: { currentLoad: currentLoad },
            success: function (data) {
                if (data) {
                    if (data.errortype == "r") {
                        var ActiveLoadListJSON = $.parseJSON(data.ActiveLoadListJSON);
                        var jobList = data.message + "<br/><br/>";
                        $(ActiveLoadListJSON).each(function (i, item) {
                            jobList = jobList + item.Value + ": '" + item.Key + "'<br/>";
                        });
                        $(this).confirmModal({
                            confirmTitle: 'TAB FusionRMS',
                            confirmMessage: jobList,
                            confirmOk: vrCommonRes['Ok'].toUpperCase(),
                            confirmStyle: 'default',
                            confirmOnlyOk: true
                        });
                    } else if (data.errortype == "w") {
                        var showMsg = "";
                        var currentLoadVal = $("#slcImportLoads option:selected").val();
                        showMsg = String.format(vrImportRes['lblJsImportSure2RmvImportLoad'], currentLoadVal);
                        $(this).confirmModal({
                            confirmTitle: vrCommonRes['msgJsDelConfim'],
                            confirmMessage: showMsg,
                            confirmOk: vrCommonRes['Yes'],
                            confirmCancel: vrCommonRes['No'],
                            confirmStyle: 'default',
                            confirmCallback: RemoveImportLoad
                        });
                    }
                }
            }
        });
    });
    
    $('#btnInSetup').off().click(function (e) {
        TempVar = null;
        $('#btnError').hide();
        $('#btnReport').hide();
        var loadName = $('#slcImportLoads option:selected').text();
        SelectedLoad = loadName;
        if (loadName !== null && loadName !== "")
            $('#btnFinish').removeAttr('disabled', 'disabled');
        else
            $('#btnFinish').attr('disabled', 'disabled');

        if (loadName != null && loadName !== "") {
            IsUserCameFromModifyOp = true;
            LoadTabMain();
        }
    });

    //Switch to tab using 'Next' and 'Back' button
    $('#btnNext').off().click(function (event) {
        var ImportLoadVal = $('#LoadName').val();
        var InputFileVal = $('#TempInputFile').val();
        $('#btnPrevious').removeAttr('disabled', 'disabled');
        var currentStep = $('.nav-tabs > .active').find('a').attr('id');
        if (currentStep.trim() == 'tabMain') {
            var loadName = $('#slcImportLoads option:selected').text();
            if (loadName !== null && loadName !== "" && loadName !== undefined) {
                LoadTabMain();
                SelectedLoad = loadName;
                $('#btnNext').removeAttr('disabled', 'disabled');
            }
        } else if (currentStep.trim() == 'tabFormat') {
            if (ImportLoadVal.trim() !== null && ImportLoadVal.trim() !== "" && InputFileVal.trim() !== null && InputFileVal.trim() !== "") {
                LoadTabField();
            }
            else {
                if (ImportLoadVal.trim() == null || ImportLoadVal.trim() == "") {
                    showAjaxReturnMessage(String.format(vrImportRes["msgImportCtrlImprtNameAndFileNotEmpty"], "Import Name"), 'w');
                    $('#LoadName').closest('.form-group').addClass('has-error');
                }
                else if (InputFileVal.trim() == null || InputFileVal.trim() == "") {
                    showAjaxReturnMessage(String.format(vrImportRes["msgImportCtrlImprtNameAndFileNotEmpty"], "Source File"), 'w');
                    $('#TempInputFile').closest('.form-group').addClass('has-error');
                }

                return false;
            }
        } else if (currentStep.trim() == 'tabField') {
            if ($('select#bootstrap-duallistbox-selected-list_duallistbox_demo option').length <= 0) {
                showAjaxReturnMessage(vrImportRes['msgImportFieldMappings'], "w");
                return false;
            }
            LoadTabInfo();
            setNextStep(currentStep);
        } else if (currentStep.trim() == 'tabInfo') {
            var value = $('#DateDue').val();
            if (value) {
                if (isValidDate(value)) {
                    if ($('#ShowImage').is(':checked')) {
                        setNextStep(currentStep);
                        $('#btnNext').attr('disabled', 'disabled');
                        FillOutputSettingDDL();
                    }
                } else {
                    showAjaxReturnMessage(String.format(vrImportRes["msgJsImportNotvalidDueDate"], value), "w");
                    return false;
                }
            } else {
                if ($('#ShowImage').is(':checked')) {
                    setNextStep(currentStep);
                    $('#btnNext').attr('disabled', 'disabled');
                    FillOutputSettingDDL();
                }
            }
        }
        setCompletedStep();
        if (ImportLoadVal.trim() !== null && ImportLoadVal.trim() !== "" && InputFileVal.trim() !== null && InputFileVal.trim() !== "") {
            $('#btnFinish').removeAttr('disabled', 'disabled');
        }
        else {
            $('#btnFinish').attr('disabled', 'disabled');
        }
        return undefined;
    });

    $('#btnPrevious').off().click(function (event) {
        $('#btnNext').removeAttr('disabled', 'disabled');
        var currentStep = $('.nav-tabs > .active').find('a').attr('id');
        if (currentStep.trim() == 'tabFormat') {
            $('#btnFinish').attr('disabled', 'disabled');
            var DDLLength = $("#slcImportLoads :selected").length;
            if (DDLLength == 0)
                $('#btnNext').attr('disabled', 'disabled');
            $('#btnPrevious').attr('disabled', 'disabled');
            $('#errorDiv').hide();
            $('#tableDIv').hide();
            setPreviousStep(currentStep);
        } else if (currentStep.trim() == 'tabField') {
            $('#btnPrevious').removeAttr('disabled', 'disabled');
            setPreviousStep(currentStep);
        } else if (currentStep.trim() == 'tabInfo') {
            $('#btnPrevious').removeAttr('disabled', 'disabled');
            var value = $('#DateDue').val();
            if (value !== "") {
                if (isValidDate(value)) {
                    SetTrackingInfo();
                    $('#btnPrevious').removeAttr('disabled', 'disabled');
                    setPreviousStep(currentStep);
                } else {
                    showAjaxReturnMessage(String.format(vrImportRes["msgJsImportNotvalidDueDate"], value), "w");
                    return false;
                }
            } else {
                SetTrackingInfo();
                $('#btnPrevious').removeAttr('disabled', 'disabled');
                setPreviousStep(currentStep);
            }
        }
        else if (currentStep.trim() == 'tabImages') {
            SetImageInfo();
            $('#btnPrevious').removeAttr('disabled', 'disabled');
            setPreviousStep(currentStep);
        }
        setCompletedStep();
        return undefined;
    });    //Switch to tab using 'Next' and 'Back' button

    //validation of 'Sampling' and 'Monitor Interval' Field
    var SampleSpinner = $("#txtSampling").spinner();
    SampleSpinner.spinner({ step: "10" });
    $('#txtSampling').OnlyNumeric();
    var RowNumberVal1 = 20;
    $('#txtSampling').on('spinstop', function () {
        RowNumberVal = $('#txtSampling').val();
        if (RowNumberVal !== RowNumberVal1) {
            var firstSheet = null;
            var Delimiter = null;
            if ($('#knowDiv').is(':checked')) {
                firstSheet = $('#SelectTable :selected').val();
            } else {
                var DelimiterId = $('input:radio[name=Delimiter]:checked').attr('id');
                if (DelimiterId == "other_radio") {
                    Delimiter = $('#textOther').val();
                }
                if (Delimiter == null || Delimiter == "")
                    Delimiter = ",";
            }
            DisplayGridFunc(firstSheet, Delimiter);
        }
        else {
            return false;
        }
        RowNumberVal1 = RowNumberVal;
        return true;
    });

    $('#txtSampling').keypress(function (event) {
        if (!(event.which == 32))
            event.preventDefault();
    });

    $('#txtSampling').keydown(function (event) {
        if (event.which == 8 || event.which == 46)
            event.preventDefault();
    });//validation of 'Sampling' and 'Monitor Interval' Field


    //Add New Load From 'Load' button
    $('#NewLoadId').off().click(function () {
        IsUserCameFromModifyOp = false;
        SelectedLoad = null;
        $('#btnError').hide();
        $('#btnReport').hide();
        $('#frmFirstImport')[0].reset();
        $('input[name="Delimiter"]').prop('checked', false);
        $('input[type=checkbox]').attr('checked', false);
        $("input:radio[name=Delimiter][id='comma_radio']").attr('checked', 'checked');
        $('#LoadName').closest('.form-group').removeClass('has-error');
        TempVar = null;
        $('#fileInput').on('change', function () {
            $('#ID').val("0");
            //Modified by Hemin for bug Fix on 05/12/2016
            var setNextStepFlag = FileChangeFunction("fileInput", true);
            if (setNextStepFlag) {
                var currentStep = $('.nav-tabs > .active').find('a').attr('id');
                setNextStep(currentStep);
                setCompletedStep();
            }
        });
        $("#fileInput").click();

    });    //Add New Load From 'Load' button

    $('#btnSource').off().click(function () {
        $('#fileSource').val("");
        $("#fileSource").click();
        $('#fileSource').change(function () {
            FileChangeFunction("fileSource", false);
        });
    });

    $('#FirstRowHeader').on('change', function () {
        var firstSheet = null;
        var Delimiter = null;
        if ($('#knowDiv').is(':checked')) {
            firstSheet = $('#SelectTable :selected').val();
        } else {
            var DelimiterId = $('input:radio[name=Delimiter]:checked').attr('id');
            if (DelimiterId == "other_radio") {
                Delimiter = $('#textOther').val();
                if (Delimiter == null || Delimiter == "")
                    Delimiter = ",";
            }
        }
        DisplayGridFunc(firstSheet, Delimiter);
    });

    $('#SelectTable').on('change', function () {
        var firstSheet = $('#SelectTable :selected').val();
        DisplayGridFunc(firstSheet, null);
    });

    $('#textOther').on('keyup', function (event) {
        var DelimiterVal = $('#textOther').val();
        var keyVal = event.which;
        var DelimiterId = $('input:radio[name=Delimiter]:checked').attr('id');
        if (((keyVal == 32) || (keyVal >= 48 && keyVal <= 57) || (keyVal >= 65 && keyVal <= 90) || (keyVal >= 96 && keyVal <= 111) || (keyVal >= 186 && keyVal <= 192) || (keyVal >= 219 && keyVal <= 222))) {
            var Delimiter, textLength;
            var DelimiterValCharCode = DelimiterVal.charCodeAt();
            if ((DelimiterValCharCode == 46 || DelimiterValCharCode == 34 || DelimiterValCharCode == 57 || DelimiterValCharCode == 116)) {
                $('#textOther').val("");
                showAjaxReturnMessage(vrImportRes["msgJsImportNotPermitedChar"], 'w');
                event.preventDefault();
                return false;
            } else {
                Delimiter = $('#textOther').val();
                textLength = $('#textOther').val().length;
                if (textLength == 1) {
                    $("input:radio[name=Delimiter][id=" + DelimiterId + "]").val(Delimiter);
                    DisplayGridFunc(null, Delimiter);
                }
            }
        }
        return true;
    });

    $('#LoadName').keyup(function (event) {
        var ImportLoadVal = $('#LoadName').val();
        var InputFileVal = $('#TempInputFile').val();
        SelectedLoad = ImportLoadVal;
        if (ImportLoadVal.trim() !== null && ImportLoadVal.trim() !== "" && InputFileVal.trim() !== null && InputFileVal.trim() !== "") {
            $('#btnFinish').removeAttr('disabled', 'disabled');
            if (ImportLoadVal.trim() !== null && ImportLoadVal.trim() !== "")
                $('#LoadName').closest('.form-group').removeClass('has-error');
            if (InputFileVal.trim() !== null && InputFileVal.trim() !== "")
                $('#TempInputFile').closest('.form-group').removeClass('has-error');
        }
        else {
            $('#btnFinish').attr('disabled', 'disabled');
        }
    });

    $("input:radio[name=Delimiter]").click(function () {
        var DelimiterId = $('input:radio[name=Delimiter]:checked').attr('id');
        if (DelimiterId == "other_radio") {
            $('#textOther').removeAttr('disabled', 'disabled');
        }
        else {
            $('#textOther').val("");
            $('#textOther').attr('disabled', 'disabled');
            DisplayGridFunc(null, null);
        }
    });

    $('#btnClose').on('click', function () {
        $.post(urls.Import.CloseAllObject, function (data) {
        });
    });

    $("#AttachBtn").off().on('click', function (e) {
        $.FileDialog({ multiple: true }).on('files.bs.filedialog', function (ev) {
            var files = ev.files;
            var filesSize = 0;
            $.each(files, function (index, value) {
                filesSize = filesSize + value.size;
            });

            if (filesSize > 2147483648) {
                showAjaxReturnMessage(vrImportRes["msgJsImportAllowed2GB"], 'w');
                return false;
            }
            var data = new FormData();
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].name, files[i]);
            }
            $.ajax({
                url: urls.Import.AttachImages,//
                type: "POST",
                data: data,
                contentType: false,
                processData: false,
                success: function (result) {
                    showAjaxReturnMessage(result.message, result.errortype);
                },
                error: function (err) {
                    showAjaxReturnMessage(err.statusText, 'e');
                }
            });
            return undefined;
        }).on('cancel.bs.filedialog', function (ev) {

        });
        return false;
    });

    /* End : Attach file */

    $('#frmFirstImport').validate({
        rules: {
            LoadName: { required: true },
            InputFile: { required: true }
        },
        ignore: ":hidden:not(select)",
        messages: {
            LoadName: {
                required: ""
            },
            InputFile: { required: "" }
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

});


function openFileAttachDialog() {
    $('#FileInputForRun').off().on('change', function () {
        IsUserCameFromModifyOp = false;
        var HasAttachmentVal = $("#slcImportLoads option:selected").attr("HasAttachment");
        var ImportLoadName = $("#slcImportLoads option:selected").val();
        if (HasAttachmentVal == "true") {
            var Tempfile = document.getElementById('FileInputForRun').files[0];
            var control = $('#FileInputForRun');
            control.replaceWith(control.clone(false));
            var UploadedFile = new FormData();
            UploadedFile.append("File", Tempfile);
            UploadedFile.append("ImportLoadName", ImportLoadName);
            $.ajax({
                url: urls.Import.UploadSingleFile,
                data: UploadedFile,
                async: true,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {
                    $('#FileInputForRun').val("");
                    if (data.errortype == "s") {
                        $.FileDialog({ multiple: true }).on('files.bs.filedialog', function (ev) {
                            var files = ev.files;
                            var filesSize = 0;
                            $.each(files, function (index, value) {
                                filesSize = filesSize + value.size;
                            });

                            if (filesSize > 2147483648) {
                                showAjaxReturnMessage(vrImportRes["msgJsImportAllowed2GB"], 'w');
                                return false;
                            }
                            var data = new FormData();
                            for (var i = 0; i < files.length; i++) {
                                data.append(files[i].name, files[i]);
                            }
                            data.append("ImportLoadName", ImportLoadName);
                            $.ajax({
                                url: urls.Import.AttachImages,//
                                type: "POST",
                                data: data,
                                contentType: false,
                                async: false,
                                processData: false,
                                success: function (data) {
                                    if (data.IsProcessLoad == false) {
                                        showAjaxReturnMessage(data.message, data.errortype);
                                    }
                                    else {
                                        var msgss = data.message.replace(/(<<)/g, '<< ');
                                        msgss = msgss.replace(/(>>)/g, ' >>');
                                        if (data.errortype == "p") {
                                            $('#btnError').hide();
                                            $('#btnReport').hide();
                                            showAjaxReturnMessage(msgss, "w");
                                        } else {
                                            $('#btnError').show();
                                            $('#btnReport').show();
                                            if (data.errortype == "s") {
                                                $('#btnError').hide();
                                                showAjaxReturnMessage(msgss, "s");
                                            } else if (data.errortype == "c") {
                                                $('#btnReport').hide();
                                                showAjaxReturnMessage(msgss, "e");
                                            } else if (data.errortype == "r") {
                                                showAjaxReturnMessage(msgss, "e");
                                            } else {
                                                showAjaxReturnMessage(msgss, data.errortype);
                                            }
                                        }
                                    }
                                },
                                error: function (err) {
                                    showAjaxReturnMessage(err.statusText, 'e');
                                }
                            });
                            return undefined;
                        }).on('change', function (ev) {                            
                            //$('.bfd-files .row:hidden').remove();
                            $('input[type=file]').val(null);
                        }).on('cancel.bs.filedialog', function (ev) {

                        });
                    } else {
                        showAjaxReturnMessage(data.message, data.errortype);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("status: " + textStatus + " Error: " + errorThrown);
                }
            });
        }
        else {
            var Tempfile = document.getElementById('FileInputForRun').files[0];
            var control = $('#FileInputForRun');
            control.replaceWith(control.clone(false));
            var UploadedFile = new FormData();
            UploadedFile.append("File", Tempfile);
            UploadedFile.append("ImportLoadName", ImportLoadName);
            $.ajax({
                url: urls.Import.UploadFileAndRunLoad,
                data: UploadedFile,
                async: true,
                processData: false,
                contentType: false,
                type: 'POST',
                global: true,
                success: function (data) {
                    $('#FileInputForRun').val("");
                    if (data.IsProcessLoad == false) {
                        showAjaxReturnMessage(data.message, data.errortype);
                    }
                    else {
                        var msgss = data.message.replace(/(<<)/g, '<< ');
                        msgss = msgss.replace(/(>>)/g, ' >>');
                        if (data.errortype == "p") {
                            $('#btnError').hide();
                            $('#btnReport').hide();
                            showAjaxReturnMessage(msgss, "w");
                        } else {
                            $('#btnError').show();
                            $('#btnReport').show();
                            if (data.errortype == "s") {
                                $('#btnError').hide();
                                showAjaxReturnMessage(msgss, "s");
                            } else if (data.errortype == "c") {
                                $('#btnReport').hide();
                                showAjaxReturnMessage(msgss, "e");
                            } else if (data.errortype == "r") {
                                showAjaxReturnMessage(msgss, "e");
                            } else {
                                showAjaxReturnMessage(msgss, data.errortype);
                            }
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("status: " + textStatus + " Error: " + errorThrown);
                }
            });
        }
        $('#FileInputForRun').unbind("change");
    });

    $('#FileInputForRun').click();
}

function ShowLogFiles(currentControl) {
    var logType = 1;
    var currentLoadName = $('#slcImportLoads option:selected').val();
    if (currentControl.id.trim() == "btnError")
        logType = 0;
    window.open("Import/ShowLogFiles?LogType=" + logType + "&LoadName=" + currentLoadName);
}


function SetOnFinish() {
    $('#TabControl li').removeAttr('class').addClass('disabled');
    $('#TabControl li:first').addClass('active');
    $('#my-tab-content').find('.tab-pane').removeClass('active');
    $('#divMain').addClass('active');
    $('#btnFinish').attr('disabled', 'disabled');
    $('#btnPrevious').attr('disabled', 'disabled');
    $('#tableDIv').hide();
    $('#errorDiv').hide();
}

function setNextStep(currentStep) {
    var NextStep = $('.nav-tabs > .active').next('li').find('a').attr('id');
    var currentStepId = $('.nav-tabs > .active').find('a').attr('href');
    var NextStepId = $('.nav-tabs > .active').next('li').find('a').attr('href');

    $('#' + currentStep).parent().removeClass('active');
    $('#' + NextStep).parent().addClass('active');
    $('.tab-pane').removeClass('active');
    $(NextStepId).addClass('active');
}

function setPreviousStep(currentStep) {
    var prevStep = $('.nav-tabs > .active').prev('li').find('a').attr('id');
    var currentStepId = $('.nav-tabs > .active').find('a').attr('href');
    var prevStepId = $('.nav-tabs > .active').prev('li').find('a').attr('href');

    $('#' + currentStep).parent().removeClass('active');
    $('#' + prevStep).parent().addClass('active').removeClass('completed');
    $('.tab-pane').removeClass('active');
    $(prevStepId).addClass('active');
}

function setCompletedStep() {
    $('#TabControl li.active').removeClass('completed');
    $('#TabControl li.active').prevAll().removeClass('disabled').addClass('completed');
    $('#TabControl li.active').nextAll().removeClass('completed').addClass('disabled');
}

function SetTrackingInfo() {
    var $form = $('#frmFirstImport');
    if ($form.valid()) {
        var serializedForm = $form.serialize() + "&pReverseOrder=" + $("#chkReverseOrder").is(':checked');
        $.ajax({
            url: urls.Import.SetTrackingInfo,
            dataType: "json",
            type: "POST",
            data: serializedForm,
            contentType: 'application/json; charset=utf-8',
            async: false,
            processData: false,
            cache: false,
            success: function (data) {
            },
            error: function (xhr) {
                ShowErrorMessge();
            }
        });
    }
}

function SetImageInfo() {
    var $form = $('#frmFirstImport');
    if ($form.valid()) {
        var SaveAsNewVal = $('input:radio[name=SaveAsNew]:checked').val();
        var serializedForm = $form.serialize() + "&SaveAsNewVal=" + SaveAsNewVal;
        $.ajax({
            url: urls.Import.SetImageInfo,
            dataType: "json",
            type: "GET",
            data: serializedForm,
            contentType: 'application/json; charset=utf-8',
            async: false,
            processData: false,
            cache: false,
            success: function (data) {
            },
            error: function (xhr) {
                ShowErrorMessge();
            }
        });
    }
}

function FillOutputSettingDDL() {
    var $form = $('#frmFirstImport');
    if ($form.valid()) {
        var serializedForm = $form.serialize() + "&pReverseOrder=" + $("#chkReverseOrder").is(':checked');
        $.ajax({
            url: urls.Import.FillOutputSetting,
            dataType: "json",
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            data: serializedForm,
            async: false,
            processData: false,
            cache: false,
            success: function (data) {
                var pOutputObject = $.parseJSON(data.JSONResult);
                var ImportLoadJSON = $.parseJSON(data.ImportLoadJSON);
                $('#ScanRule').empty();
                var first;
                //Modified by Hemin
                $('#ScanRule').append($("<option>", { value: "", html: vrCommonRes["Id"] + "+" + vrImportRes["optJsImportPath"] + "+" + vrImportRes["optJsImportPrefix"] }));
                $(pOutputObject).each(function (i, v) {
                    $('#ScanRule').append($("<option>", { value: v.Id, html: v.Id + "+" + v.Path + "+" + v.Prefix }));
                });
                var formValue = $('#ScanRule').val().toString().split(',');
                var spacesToAdd = 5;
                var firstLength = secondLength = thirdLength = fourthLength = 0;
                $("select#ScanRule option").each(function (i, v) {
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
                });

                var padLength = firstLength + spacesToAdd;
                var padLength1 = secondLength + spacesToAdd;
                var padLength2 = thirdLength + spacesToAdd;
                $("select#ScanRule option").each(function (i, v) {
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

                    $(this).text(parts[0].replace(/ /g, '\u00a0') + parts[1].replace(/ /g, '\u00a0') + parts[2].replace(/ /g, '\u00a0'));
                });
                if (ImportLoadJSON.ScanRule !== '' && ImportLoadJSON.ScanRule !== null)
                    $('[name=ScanRule] option').filter(function () {
                        return ($(this).val() == ImportLoadJSON.ScanRule);
                    }).prop('selected', true);
                //$('#DeleteSourceImage').attr('checked', ImportLoadJSON.DeleteSourceImage);
                if (ImportLoadJSON.SaveImageAsNewPage)
                    $("input:radio[name=SaveAsNew][id='SaveImageAsNewPage']").attr('checked', 'checked');
                else if (ImportLoadJSON.SaveImageAsNewVersion)
                    $("input:radio[name=SaveAsNew][id='SaveImageAsNewVersion']").attr('checked', 'checked');
                else if (ImportLoadJSON.SaveImageAsNewVersionAsOfficialRecord)
                    $("input:radio[name=SaveAsNew][id='SaveImageAsNewVersionAsOfficialRecord']").attr('checked', 'checked');
                else
                    $("input:radio[name=SaveAsNew][id='SaveAsAttachment']").attr('checked', 'checked');
            },
            error: function (xhr) {
                ShowErrorMessge();
            }
        });

    }
}

function RemoveImportLoad() {
    var currentLoad = $("#slcImportLoads option:selected").text();
    var currentLoadVal = $("#slcImportLoads option:selected").val();
    $.ajax({
        url: urls.Import.RemoveImportLoad,
        type: "POST",
        data: { currentLoad: currentLoad, currentLoadVal: currentLoadVal },
        async: false,
        success: function (data) {
            if (data.errortype == "s") {
                showAjaxReturnMessage(data.message, data.errortype);
                $.post(urls.Import.GetImportDDL, function (response) {
                    if (response !== null && response !== "" && response !== undefined) {
                        if (response.errortype == "s") {
                            var oImportDDLJSON = $.parseJSON(response.oImportDDLJSON);
                            $('#slcImportLoads').empty();
                            if (oImportDDLJSON.length == 0) {
                                $('#btnRun').attr('disabled', 'disabled');
                                $('#btnInSetup').attr('disabled', 'disabled');
                                $('#btnRemove').attr('disabled', 'disabled');
                                $('#btnMonitor').attr('disabled', 'disabled');
                                $('#btnNext').attr('disabled', 'disabled');
                            } else {
                                $('#btnRun').removeAttr('disabled', 'disabled');
                                $('#btnInSetup').removeAttr('disabled', 'disabled');
                                $('#btnRemove').removeAttr('disabled', 'disabled');
                                $('#btnMonitor').removeAttr('disabled', 'disabled');
                                $('#btnNext').removeAttr('disabled', 'disabled');
                            }
                            $('#btnFinish').attr('disabled', 'disabled');
                            $('#btnPrevious').attr('disabled', 'disabled');
                            $('#tableDIv').hide();
                            $('#errorDiv').hide();
                            BindDDLDynamically('#slcImportLoads', oImportDDLJSON);
                        } else {
                            showAjaxReturnMessage(response.errorMessage, response.errortype);
                        }
                    }
                });
            } else {
                showAjaxReturnMessage(data.message, data.errortype);
                return false;
            }
            return true;
        }
    });

}

function FinishClick() {
    var $form = $('#frmFirstImport');
    var serializedForm = $form.serialize();
    var Delimiter = "";
    var RecordType = $('input:radio[name=RecordType]:checked').val();
    var FirstRowHeader = $('#FirstRowHeader').is(':checked');
    var ReverseOrder = $('#chkReverseOrder').is(':checked');
    var SaveAsNewVal = $('input:radio[name=SaveAsNew]:checked').val();
    var TableSheetName = "";
    var SaveAsNewVal = $('input:radio[name=SaveAsNew]:checked').val();
    if ($('#knowDiv').is(':checked')) {
        TableSheetName = $('#SelectTable option:selected').val();
        if (TableSheetName == undefined)
            TableSheetName = ""
    } else {
        var radioId = $('input:radio[name=Delimiter]:checked').attr('id');
        switch (radioId) {
            case "comma_radio":
                Delimiter = ",";
                break;
            case "Tab_radio":
                Delimiter = "t";
                break;
            case "semicolon_radio":
                Delimiter = ";";
                break;
            case "space_radio":
                Delimiter = "";
                break;
            case "other_radio":
                Delimiter = $('#textOther').val();
                break;
            default:
                Delimiter = ",";
                break;
        }
    }
    var Id = $('#ID').val();
    var msHoldName = $('#msHoldName').val();
    serializedForm = serializedForm + "&strmsHoldName=" + msHoldName
                                    + "&RecordType=" + RecordType
                                    + "&pFirstRowHeader=" + FirstRowHeader
                                    + "&Delimiter=" + Delimiter
                                    + "&TableSheetName=" + encodeURIComponent(TableSheetName)
                                    + "&pReverseOrder=" + ReverseOrder
                                    + "&SaveAsNewVal=" + SaveAsNewVal;
    var currentDiv = $('.nav-tabs > .active').find('a').attr('id');
    var fileName = $('#FileName').val();
    if (fileName !== null || IsUserCameFromModifyOp == true) {
        if (currentDiv.trim() == 'tabField') {
            if ($('select#bootstrap-duallistbox-selected-list_duallistbox_demo option').length <= 0) {
                showAjaxReturnMessage(vrImportRes['msgImportFieldMappings'], "w");
                return false;
            }
        }
        if (currentDiv.trim() == 'tabInfo') {
            var value = $('#DateDue').val();
            if (value) {
                if (isValidDate(value)) {
                    FinishOnLastTab(serializedForm);
                } else {
                    showAjaxReturnMessage(String.format(vrImportRes['msgJsImportNotvalidDueDate'], value), "w");
                    return false;
                }
            } else {
                FinishOnLastTab(serializedForm);
            }
        } else {
            FinishOnLastTab(serializedForm);
        }
    } else {
        showAjaxReturnMessage(String.format(vrImportRes['msgJsImportDestinationRequired'], value), "w");
    }


    return true;
}

function FinishOnLastTab(serializedForm) {
    var Duplicateval = $('#Duplicate option:selected').val();
    var IdFieldNameVal = $('#IdFieldName option:selected').val();
    if (Duplicateval !== "" && Duplicateval !== undefined && Duplicateval !== null && IdFieldNameVal !== "" && IdFieldNameVal !== undefined && IdFieldNameVal !== null) {
        if (Duplicateval.trim() == "SKIPNONDUPS" && IdFieldNameVal == "0") {
            var warningMsg = String.format(vrImportRes["msgJsImportwarningMsg"], "<br/>", "<br/><br/>");
            $(this).confirmModal({
                confirmTitle: "TAB FusionRMS",
                confirmMessage: warningMsg,
                confirmOk: vrCommonRes['Yes'],
                confirmCancel: vrCommonRes['No'],
                confirmStyle: 'default',
                confirmObject: serializedForm,
                confirmCallback: ValidateLoadOnEdit
            });
        } else {
            ValidateLoadOnEdit(serializedForm);
        }
    } else {
        ValidateLoadOnEdit(serializedForm);
    }

}

function ValidateLoadOnEdit(serializedForm) {
    var msHoldName = $('#msHoldName').val();
    var loadName = $('#LoadName').val();
    var TrackDestinationId = $('#TrackDestinationId').val();
    $.post(urls.Import.ValidateLoadOnEdit, { LoadName: loadName, msHoldName: msHoldName, TrackDestinationId: TrackDestinationId }, function (data) {
        if (data.errortype == "r") {
            var validTrackingJSON = $.parseJSON(data.validTrackingJSON);
            if (validTrackingJSON) {
                $(this).confirmModal({
                    confirmTitle: "TAB FusionRMS",
                    confirmMessage: String.format(vrImportRes["msgJsImportWish2SaveThisConf"], data.message, "<br/>"),
                    confirmOk: vrCommonRes['Yes'],
                    confirmCancel: vrCommonRes['No'],
                    confirmStyle: 'default',
                    confirmObject: serializedForm,
                    confirmCallback: SaveImportLoad
                });
            } else {
                SaveImportLoad(serializedForm);
            }
        } else {
            showAjaxReturnMessage(data.message, data.errortype);
            return false;
        }
        return true;
    });

}

function SaveImportLoad(serializedForm) {
    $.post(urls.Import.SaveImportLoadOnConfrim, serializedForm, function (data) {
        if (data) {
            if (data.errortype == "s") {
                $.post(urls.Import.GetImportDDL, function (response) {
                    if (response !== null && response !== "" && response !== undefined) {
                        if (response.errortype == "s") {
                            var oImportDDLJSON = $.parseJSON(response.oImportDDLJSON);
                            if (oImportDDLJSON.length == 0) {
                                $('#btnRun').attr('disabled', 'disabled');
                                $('#btnInSetup').attr('disabled', 'disabled');
                                $('#btnRemove').attr('disabled', 'disabled');
                                $('#btnMonitor').attr('disabled', 'disabled');
                                $('#btnNext').attr('disabled', 'disabled');
                            } else {
                                $('#btnRun').removeAttr('disabled', 'disabled');
                                $('#btnInSetup').removeAttr('disabled', 'disabled');
                                $('#btnRemove').removeAttr('disabled', 'disabled');
                                $('#btnMonitor').removeAttr('disabled', 'disabled');
                                $('#btnNext').removeAttr('disabled', 'disabled');
                            }
                            SetOnFinish();
                            BindDDLDynamically('#slcImportLoads', oImportDDLJSON);
                            showAjaxReturnMessage(data.message, data.errortype);
                        } else {
                            showAjaxReturnMessage(response.errorMessage, response.errortype);
                        }
                    }
                });
            }
        }
    });
}

function LoadTabMain() {
    $('#btnPrevious').removeAttr('disabled', 'disabled');
    var loadName = $('#slcImportLoads option:selected').text();
    $.post(urls.Import.GetImportLoadData, { loadName: loadName }, function (data) {
        if (data) {
            if (data.errortype == "s" || data.errortype == "p") {
                if (data.errortype == "p") {
                    $('#lblError').text(data.message);
                    $('#errorDiv').show();
                }
                setNextStep('tabMain');
                setCompletedStep();
                $('#btnNext').removeAttr('disabled', 'disabled');
                var oImportLoadJSON = $.parseJSON(data.oImportLoadJSON);
                var extensionJSON = $.parseJSON(data.extensionJSON);
                var InputFileNameJSON = $.parseJSON(data.InputFileNameJSON);
                ShowDivBasedOnFile(extensionJSON);
                $('#ID').val(oImportLoadJSON.ID);
                if (oImportLoadJSON.LoadName !== null && oImportLoadJSON.LoadName !== "")
                    $('#msHoldName').val(oImportLoadJSON.LoadName);
                else
                    $('#msHoldName').val("");
                if (oImportLoadJSON.TempInputFile !== null && oImportLoadJSON.TempInputFile !== "")
                    $('#TempInputFile').val(oImportLoadJSON.TempInputFile);
                else
                    $('#TempInputFile').val("");
                var headerFlag = oImportLoadJSON.FirstRowHeader;
                if (headerFlag)
                    $('#FirstRowHeader').attr('checked', 'checked');
                else
                    $('#FirstRowHeader').removeAttr('checked', 'checked');
                $('#TableSheetName').val(oImportLoadJSON.TableSheetName);
                $('#InputFileName').val(InputFileNameJSON);
                var firstSheet = null;
                var DelimiterId = null;
                var Delimiter = null;
                if ($('#knowDiv').is(':checked')) {
                    var sheetTableListJSON = $.parseJSON(data.sheetTableListJSON);
                    var SheetType = $.parseJSON(data.SheetTypeJSON);
                    $('#SelectTable').empty();
                    $(sheetTableListJSON).each(function (i, item) {
                        $('#SelectTable').append('<option value="' + item.Key + '" >' + item.Value + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + SheetType + '</option>');
                    });
                    if (oImportLoadJSON.TableSheetName !== null && oImportLoadJSON.TableSheetName !== "") {
                        $('[name=TableSheetName] option').filter(function () {
                            return ($(this).val() == oImportLoadJSON.TableSheetName); //To select Blue
                        }).prop('selected', true);
                    } else {
                        $('#SelectTable option:first').attr('selected', true);
                    }
                    firstSheet = $('#SelectTable option:selected').val();
                }
                else {
                    switch (oImportLoadJSON.Delimiter) {
                        case ",":
                            $("input:radio[name=Delimiter][id='comma_radio']").attr('checked', 'checked');
                            break;
                        case "t":
                            $("input:radio[name=Delimiter][id='Tab_radio']").attr('checked', 'checked');
                            break;
                        case ";":
                            $("input:radio[name=Delimiter][id='semicolon_radio']").attr('checked', 'checked');
                            break;
                        case " ", null:
                            $("input:radio[name=Delimiter][id='space_radio']").attr('checked', 'checked');
                            break;
                        default:
                            $("input:radio[name=Delimiter][id='other_radio']").attr('checked', 'checked');
                            break;
                    }
                    DelimiterId = $('input:radio[name=Delimiter]:checked').attr('id');
                    if (DelimiterId.trim() == "other_radio") {
                        $('#textOther').val(oImportLoadJSON.Delimiter);
                        Delimiter = $('#textOther').val();
                    } else {
                        $('#textOther').val("");
                    }
                }
                if (oImportLoadJSON.RecordType !== null && oImportLoadJSON.RecordType !== "")
                    $('input:radio[name=RecordType][value=' + oImportLoadJSON.RecordType + ']').attr('checked', 'checked');
                var RecordTypeVal = $('input:radio[name=RecordType]:checked').attr('id');
                var mbFixedWidth = false;
                if (RecordTypeVal !== undefined && RecordTypeVal !== "" && RecordTypeVal !== null) {
                    if (RecordTypeVal.trim() == "fixed_radio")
                        mbFixedWidth = true;
                    else
                        mbFixedWidth = false;
                }

                if (oImportLoadJSON.LoadName !== null && oImportLoadJSON.LoadName !== "")
                    $('#LoadName').val(oImportLoadJSON.LoadName);
                else
                    $('#LoadName').val("");
                if (data.errortype == "s") {
                    var formatFlag = true;
                    var numberOfRow = $('#txtSampling').val();
                    $.post(urls.Import.GetGridDataFromFile + '?filePath=' + encodeURIComponent(oImportLoadJSON.TempInputFile) + '&headerFlag=' + headerFlag + '&sCurrentLoad=' + encodeURIComponent(oImportLoadJSON.LoadName) + '&numberOfRow=' + numberOfRow + '&firstSheet=' + encodeURIComponent(firstSheet) + '&DelimiterId=' + DelimiterId + '&Delimiter=' + Delimiter + '&mbFixedWidth=' + mbFixedWidth + "&formatFlag=" + formatFlag, function (data) {
                        if (data) {
                            if (data.errortype == "s") {
                                var columndata = $.parseJSON(data.jsonObject);
                                var GridCaptionJSON = $.parseJSON(data.GridCaptionJSON);
                                $("#grdImport").jqGrid('GridUnload');
                                $('#tableDIv').show();
                                BindGrid($("#grdImport"), urls.Import.ConvertDataToGrid, columndata, GridCaptionJSON, false, false);
                                $('#errorDiv').hide();
                            }
                            else if (data.errortype == "w") {
                                $('#lblError').text(data.message);
                                $('#errorDiv').show();
                            }
                            else {
                                showAjaxReturnMessage(data.message, data.errortype);
                                $('#errorDiv').hide();
                            }
                        }
                    });
                } else {
                    $('#lblError').text(data.message);
                    $('#errorDiv').show();
                }
            } else {
                showAjaxReturnMessage(data.message, data.errortype);
            }
        }
    });
}

function FileChangeFunction(fileInputObj, formatFlag) {
    if (formatFlag == true)
        ImportLoadName = "";
    else
        ImportLoadName = $('#LoadName').val();
    var Tempfile = document.getElementById(fileInputObj).files[0];
    var fileName = Tempfile["name"];
    var extensionArray = fileName.split(".");
    var extensionLength = extensionArray.length;
    var extension = null;
    if (extensionLength !== 0 && extensionLength !== 1)
        extension = extensionArray[extensionLength - 1];
    if (extension == null || extension == "") {
        extension = "txt";
    }
    extension = extension.trim().toLowerCase();
    var extArray = ["mdb", "accdb", "txt", "csv", "xls", "xlsx", "dbf"];
    var allowFlag = jQuery.inArray(extension, extArray);
    if (allowFlag == -1) {
        showAjaxReturnMessage(vrImportRes["msgJsImportTabAllowedFile"], 'w');
        return false;
    }
    else {
        var tempFlag = true;
        var control = $('#' + fileInputObj);
        control.replaceWith(control.clone(false));
        var UploadedFile = new FormData();
        UploadedFile.append("File", Tempfile);
        UploadedFile.append("ImportLoadName", ImportLoadName);
        UploadedFile.append("formatFlag", formatFlag);
        $.ajax({
            url: urls.Import.SendFileContent,
            data: UploadedFile,
            async: false,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (response) {
                if (response.errortype == "s") {
                    if (formatFlag) {
                        $('#LoadName').val("");
                        $('#msHoldName').val("");
                    }
                    $('#btnPrevious').removeAttr('disabled', 'disabled');
                    $('#btnNext').removeAttr('disabled', 'disabled');
                    ShowDivBasedOnFile(extension);
                    var iOriginalInputFileJSON = $.parseJSON(response.OriginalInputFileJSON);
                    $('#TempInputFile').val(iOriginalInputFileJSON);
                    $('#InputFileName').val(fileName);
                    var firstSheet = null;
                    var DelimiterId = null;
                    var Delimiter = null;

                    if ($('#knowDiv').is(':checked')) {
                        var sheetTableListJSON = $.parseJSON(response.sheetTableListJSON);
                        var SheetType = $.parseJSON(response.SheetTypeJSON);
                        $('#SelectTable').empty();
                        $(sheetTableListJSON).each(function (i, item) {
                            $('#SelectTable').append('<option value="' + item.Key + '" >' + item.Value + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + SheetType + '</option>');
                        });
                        $('#SelectTable option:first').attr('selected', true);
                        firstSheet = $('#SelectTable option:selected').val();
                    }
                    else {
                        DelimiterId = $('input:radio[name=Delimiter]:checked').attr('id');
                        switch (DelimiterId) {
                            case "comma_radio":
                                Delimiter = ",";
                                break;
                            case "Tab_radio":
                                Delimiter = "t";
                                break;
                            case "semicolon_radio":
                                Delimiter = ";";
                                break;
                            case "space_radio":
                                Delimiter = "";
                                break;
                            case "other_radio":
                                Delimiter = $('#textOther').val();
                                break;
                            default:
                                Delimiter = ",";
                                break;
                        }
                    }
                    var headerFlag = false;
                    headerFlag = $('#FirstRowHeader').is(':checked');
                    var sCurrentLoad = $('#LoadName').val();
                    var RecordTypeVal = $('input:radio[name=RecordType]:checked').attr('id');
                    var mbFixedWidth = false;
                    var numberOfRow = $('#txtSampling').val();
                    if (RecordTypeVal !== undefined && RecordTypeVal !== null && RecordTypeVal !== "") {
                        if (RecordTypeVal.trim() == "fixed_radio")
                            mbFixedWidth = true;
                        else
                            mbFixedWidth = false;
                    }
                    $.ajax({
                        url: urls.Import.GetGridDataFromFile,
                        data: 'filePath=' + encodeURIComponent(iOriginalInputFileJSON) + '&headerFlag=' + headerFlag + '&sCurrentLoad=' + encodeURIComponent(sCurrentLoad) + '&numberOfRow=' + numberOfRow + '&firstSheet=' + encodeURIComponent(firstSheet) + '&DelimiterId=' + DelimiterId + '&Delimiter=' + Delimiter + '&mbFixedWidth=' + mbFixedWidth + '&formatFlag=' + formatFlag,
                        async: false,
                        type: 'POST',
                        success: function (data) {
                            if (data) {
                                if (data.errortype == "s") {
                                    if (formatFlag)
                                        $('#tabFormat').click();

                                    var columndata = $.parseJSON(data.jsonObject);
                                    var GridCaptionJSON = $.parseJSON(data.GridCaptionJSON);
                                    $("#grdImport").jqGrid('GridUnload');
                                    $('#tableDIv').show();
                                    BindGrid($("#grdImport"), urls.Import.ConvertDataToGrid, columndata, GridCaptionJSON, false, false);
                                    $('#errorDiv').hide();
                                }
                                else if (data.errortype == "w") {
                                    $('#lblError').text(data.message);
                                    $('#errorDiv').show();
                                }
                                else {
                                    tempFlag = false;
                                    showAjaxReturnMessage(data.message, data.errortype);
                                    $('#errorDiv').hide();
                                }
                            }
                        }
                    });
                }
                else {
                    tempFlag = false;
                    showAjaxReturnMessage(response.message, response.errortype);
                    return;
                }
            }
        });
        if (tempFlag == true) {
            return true;
        }
        else {
            return false;
        }
    }
}

function LoadTabInfo() {
    var dateToday = new Date();
    var currentMonth = dateToday.getMonth();
    var currentDate = dateToday.getDate();
    var currentYear = dateToday.getFullYear();
    $('.datepicker').datepicker({
        dateFormat: getDatePreferenceCookie(), //Changed by Hasmukh on 06/15/2016 for date format changes
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        maxDate: new Date((currentYear + 1), (currentMonth + 1), (currentDate + 1))
    });

    var tableName = $('#FileName option:selected').val();
    var tableName1 = JSON.stringify(tableName);
    $.post(urls.Import.LoadTabInfoDDL, { tableName1: tableName1 }, function (data) {
        if (data) {
            if (data.errortype == "s") {
                var OverwriteListJSON = $.parseJSON(data.OverwriteListJSON);
                var ImportByListJSON = $.parseJSON(data.ImportByListJSON);
                var ImporLoadJSON = $.parseJSON(data.ImporLoadJSON);
                var DateDueJSON = $.parseJSON(data.DateDueJSON);
                var ShowImageTabJSON = $.parseJSON(data.ShowImageTabJSON);
                var DisplayDateJSON = $.parseJSON(data.DisplayDateJSON);
                BindDDLDynamically('#Duplicate', OverwriteListJSON);
                BindDDLDynamically('#IdFieldName', ImportByListJSON);
                $('#ShowImage').attr('checked', ShowImageTabJSON);
                if (ImporLoadJSON.Duplicate !== null && ImporLoadJSON.Duplicate !== "")
                    $('#Duplicate option[value=' + ImporLoadJSON.Duplicate + ']').attr('selected', 'selected');
                if (ImporLoadJSON.IdFieldName !== null && ImporLoadJSON.IdFieldName !== "")
                    $('#IdFieldName option[value=' + ImporLoadJSON.IdFieldName + ']').attr('selected', 'selected');
                if (ImporLoadJSON.TrackDestinationId !== null && ImporLoadJSON.TrackDestinationId !== "")
                    $('#TrackDestinationId').val(ImporLoadJSON.TrackDestinationId);
                else
                    $('#TrackDestinationId').val("");
                if ($('#knowDiv').is(':checked'))
                    $('#chkReverseOrder').removeAttr('disabled', 'disabled');
                else
                    $('#chkReverseOrder').attr('disabled', 'disabled');
                if (ImporLoadJSON.ReverseOrder)
                    $('#chkReverseOrder').attr('checked', true);
                else
                    $('#chkReverseOrder').attr('checked', false);
                if (DateDueJSON)
                    $("#DivDateDue").show();
                else
                    $("#DivDateDue").hide();
                if (DisplayDateJSON !== null && DisplayDateJSON !== "")
                    $('#DateDue').val(DisplayDateJSON.split('T')[0]);
                else
                    $('#DateDue').val("");
                if ($('#ShowImage').is(':checked'))
                    $('#btnNext').removeAttr('disabled', 'disabled');
                else
                    $('#btnNext').attr('disabled', 'disabled');
            }
        }

    });
}

function BindDDLDynamically(ddlObject, JSONObject) {
    if (JSONObject.length == 0) {
        $('#btnRun').attr('disabled', 'disabled');
    } else {
        $('#btnRun').removeAttr('disabled', 'disabled');
        $(ddlObject).empty();

        if (ddlObject.trim() == "#slcImportLoads") {
            $.each(JSONObject, function (i, item) {
                $(ddlObject).append($('<option />', {
                    value: item.Key,
                    text: item.Key
                }));
            });
            $(ddlObject).find('option').each(function (index, item) {
                $(item).attr('HasAttachment', JSONObject[index].Value);
            });
        } else {
            $.each(JSONObject, function (i, item) {
                $(ddlObject).append($('<option />', {
                    value: item.Key,
                    text: item.Value
                }));
            });
        }
        $(ddlObject + ' option:first').attr('selected', true);
    }
}

function LoadTabField() {
    var demo2 = $('.eItems').ImportbootstrapDualListbox({
        nonSelectedListLabel: vrImportRes['msgJsImportAvailableFields'],
        selectedListLabel: vrImportRes['msgJsImportSelectedFields'],
        preserveSelectionOnMove: false,
        multipleSelection: false,
        moveOnSelect: false,
        showFilterInputs: false,
        selectorMinimalHeight: 200
    });
    demo2.trigger('bootstrapduallistbox.refresh');
    $('select[name="duallistbox_demo"]').parent().find('.moveall').prop('disabled', true);
    $('#DateFormat').val("");
    var radioId = $('input:radio[name=Delimiter]:checked').attr('id');
    var Delimiter;
    switch (radioId) {
        case "comma_radio":
            Delimiter = ",";
            break;
        case "Tab_radio":
            Delimiter = "t";
            break;
        case "semicolon_radio":
            Delimiter = ";";
            break;
        case "space_radio":
            Delimiter = "";
            break;
        case "other_radio":
            Delimiter = $('#textOther').val();
            break;
        default:
            Delimiter = ",";
            break;
    }
    var RecordType = $('input:radio[name=RecordType]:checked').val();
    var FirstRowHeader = $('#FirstRowHeader').is(':checked');
    var InputFile = $('#TempInputFile').val();
    var TableSheetName = "";
    if ($('#knowDiv').is(':checked')) {
        TableSheetName = $('#SelectTable option:selected').val();
        if (TableSheetName == undefined)
            TableSheetName = ""
    }
    var Id = $('#ID').val();
    var msHoldName = $('#msHoldName').val();
    var serializedVal = "LoadName=" + $('#LoadName').val() + "&strmsHoldName=" + msHoldName + "&RecordType=" + RecordType + "&FirstRowHeader=" + FirstRowHeader + "&InputFile=" + encodeURIComponent(InputFile) + "&TableSheetName=" + encodeURIComponent(TableSheetName) + "&Id=" + Id + "&Delimiter=" + Delimiter;
    $.ajax({
        url: urls.Import.GetDestinationDDL,
        type: "POST",
        data: serializedVal,
        async: false,
        success: function (data) {
            if (data.errortype == "w") {
                $('#btnFinish').attr('disabled', 'disabled');
                showAjaxReturnMessage(data.message, data.errortype);
                $('#LoadName').val(msHoldName);
                return;
            }
            else if (data.errortype == "s") {
                var tableListJSON = $.parseJSON(data.tableListJSON);
                var oImportLoadJSON = $.parseJSON(data.oImportLoadJSON);
                $('#FileName').empty();
                $.each(tableListJSON, function (i, item) {
                    $('#FileName').append($('<option />', {
                        value: item.Key,
                        text: item.Value
                    }));
                });
                if (oImportLoadJSON.FileName !== null && oImportLoadJSON.FileName !== "") {
                    $('[name=FileName] option').filter(function () {
                        return ($(this).val() == oImportLoadJSON.FileName);
                    }).prop('selected', true);
                } else {
                    $('#FileName option:first').attr('selected', true);
                }
                var tableName = $('#FileName option:selected').val();
                if (TempVar !== undefined && TempVar !== null && TempVar !== "") {
                    tableName = TempVar;
                    $('[name=FileName] option').filter(function () {
                        return ($(this).val() == tableName);
                    }).prop('selected', true);
                }
                BindDualPanel(tableName, false, false);
                setNextStep('tabFormat');
                $('#btnNext').removeAttr('disabled', 'disabled');
            }
        }
    });

    $('#FileName').off('click').on('change', function () {
        var tableName = $('#FileName option:selected').val();
        TempVar = tableName;
        BindDualPanel(tableName, true, false);
    });

    $('#bootstrap-duallistbox-selected-list_duallistbox_demo').on('change', function () {
        DisableUpDownImport();
    });

    $('#btnImportUp').off().on('click', function () {
        var isFieldSelected = CheckFieldSelection();
        if (isFieldSelected){
            listbox_move('bootstrap-duallistbox-selected-list_duallistbox_demo', 'up');
        } else {
            showAjaxReturnMessage(vrImportRes['msgJsSelectAtleastOneField'], "w");
        }
    });

    $('#btnImportDown').off().on('click', function () {
        var isFieldSelected = CheckFieldSelection();
        if (isFieldSelected){
            listbox_move('bootstrap-duallistbox-selected-list_duallistbox_demo', 'down');
        } else {
            showAjaxReturnMessage(vrImportRes['msgJsSelectAtleastOneField'], "w");
        }
    });

    $('#btnProprties').off('click').on('click', function () {
        var listbox = document.getElementById('bootstrap-duallistbox-selected-list_duallistbox_demo');
        var selIndex = listbox.selectedIndex;
        if (-1 == selIndex) {
            showAjaxReturnMessage(vrImportRes["msgJsImportSelect1Field4Prop"], "w");
            return;
        } else {
            var tableName = $('#FileName option:selected').val();
            var sTableName = JSON.stringify(tableName);
            var FieldName = listbox.options[selIndex].value;
            var sFieldName = JSON.stringify(FieldName);
            $.post(urls.Import.GetPropertyByType, { sFieldName1: sFieldName, sTableName1: sTableName }, function (data) {
                if (data) {
                    if (data.errortype == "s") {
                        var pImportFieldJSON = $.parseJSON(data.pImportFieldJSON);
                        var bAttachmentLinkJSON = $.parseJSON(data.bAttachmentLinkJSON);
                        var fieldIsDateJSON = $.parseJSON(data.fieldIsDateJSON);
                        $('#myModelId').text(String.format(vrImportRes['titleProperty'], sFieldName)); //titleProperty
                        if (bAttachmentLinkJSON)
                            $('#attachmentDiv').show();
                        else
                            $('#attachmentDiv').hide();
                        if (fieldIsDateJSON)
                            $('#dateDiv').show();
                        else
                            $('#dateDiv').hide();
                        if (pImportFieldJSON.DefaultValue !== '' && pImportFieldJSON.DefaultValue !== null)
                            $('#DefaultValue').val(pImportFieldJSON.DefaultValue);
                        else
                            $('#DefaultValue').val("");
                        $('#SwingYear').val(pImportFieldJSON.SwingYear);
                        $('[name=DateFormat] option').filter(function () {
                            return ($(this).val() == pImportFieldJSON.DateFormat);
                        }).prop('selected', true);
                    }
                }
            });
        }
        $('#mdlImportProperties').ShowModel();
        $('#DefaultValue').on('keypress', function (e) {
            if (e.which == 64) {
                var availableOptions = ["@@SL_UserName", "@@Today", "@@Now", "@@Time"];
            } else {
                var availableOptions = [];
            }
            $("#DefaultValue").autocomplete({
                source: availableOptions,
                classes: {
                    "ui-autocomplete": "addZIndex"
                }
            });
        });
    });


    $('#btnOkProperty').on('click', function () {
        var listbox = document.getElementById('bootstrap-duallistbox-selected-list_duallistbox_demo');
        var selIndex = listbox.selectedIndex;
        var sFieldName = listbox.options[selIndex].value;
        var sFieldName1 = JSON.stringify(sFieldName);
        var $form = $('#frmImportProperty');
        var serializedForm = $form.serialize() + "&sFieldName1=" + sFieldName1;
        $.post(urls.Import.SaveImportProperties, serializedForm, function (data) {
            if (data) {
                if (data.errortype == "e") {
                    showAjaxReturnMessage(data.message, "e");
                }
            }
        });
    });

    $('#DateFormat').on('change', function (data) {
        var strDate = $('#DateFormat option:selected').val();
        var boolVal = strDate.indexOf("yyyy");
        if (boolVal == -1)
            $('#SwingYear').removeAttr('disabled', 'disabled');
        else
            $('#SwingYear').attr('disabled', 'disabled');
    });
}

function DisableUpDownImport() {
    var listbox = document.getElementById('bootstrap-duallistbox-selected-list_duallistbox_demo');
    var length = $('select#bootstrap-duallistbox-selected-list_duallistbox_demo option').length;
    var selIndex = listbox.selectedIndex;
    if (selIndex <= 0) {
        $('#btnImportUp').attr('disabled', 'disabled');
        $('#btnImportDown').removeAttr('disabled', 'disabled');
    } else if (selIndex >= length - 1) {
        $('#btnImportDown').attr('disabled', 'disabled');
        $('#btnImportUp').removeAttr('disabled', 'disabled');
    } else {
        $('#btnImportDown').removeAttr('disabled', 'disabled');
        $('#btnImportUp').removeAttr('disabled', 'disabled');
    }
}

function BindDualPanel(tableName, changeFlag, IsSkipField) {
    var currentLoad = $('#LoadName').val();
    var tableName1 = JSON.stringify(tableName);
    $.post(urls.Import.GetAvailableField, { currentLoad: currentLoad, tableName1: tableName1, changeFlag: changeFlag, IsSkipField: IsSkipField }, function (data) {
        if (data) {
            if (data.errortype == "s") {
                var tableListJSON = $.parseJSON(data.tableListJSON);
                var flagImportByJSON = $.parseJSON(data.flagImportByJSON);
                var flagOverwriteAddJSON = $.parseJSON(data.flagOverwriteAddJSON);
                DisableField("#IdFieldName", flagImportByJSON);
                DisableField("#Duplicate", flagOverwriteAddJSON);
                $('#SelectField').empty();
                $arySort = [];
                $.each(tableListJSON, function (i, item) {
                    $('.eItems').append($("<option />", {
                        value: item.Key.trim(),
                        text: item.Value.trim()
                    }));
                });
                $(".eItems option").each(function () {
                    if ($(this).val() == "Selected") {
                        $(this).val($(this).text());
                        $(this).attr('selected', 'selected');
                        $arySort.push($(this).text());
                    }
                });
                $('.eItems').ImportbootstrapDualListbox('refresh', true);
            }
        }
    });
}

function DisableField(fieldObj, fieldValue) {
    if (fieldValue)
        $(fieldObj).removeAttr('disabled', 'disabled');
    else
        $(fieldObj).attr('disabled', 'disabled');
}

function listbox_move(listID, direction) {
    var listbox = document.getElementById(listID);
    var length = $('select#' + listID + ' option').length;
    var selIndex = listbox.selectedIndex;
    if (direction == 'up' && selIndex <= 0)
        return;
    if (direction == 'down' && selIndex >= length - 1)
        return;
    var increment = -1;
    if (direction == 'up')
        increment = -1;
    else
        increment = 1;

    var selValue = listbox.options[selIndex].value;
    var selValue1 = JSON.stringify(selValue);
    var selText = listbox.options[selIndex].text;

    $.ajax({
        url: urls.Import.ReorderImportField,
        type: "POST",
        data: { selValue: selValue1, increment: increment, selIndex: selIndex },
        async: false,
        success: function (data) {
            if (data.errortype == "s") {
                listbox.options[selIndex].value = listbox.options[selIndex + increment].value;
                listbox.options[selIndex].text = listbox.options[selIndex + increment].text;

                listbox.options[selIndex + increment].value = selValue;
                listbox.options[selIndex + increment].text = selText;

                listbox.selectedIndex = selIndex + increment;
                DisableUpDownImport();
            }
        }
    });
}

function DisplayGridFunc(firstSheet, Delimiter) {
    var filePath = $('#TempInputFile').val();
    var headerFlag = $('#FirstRowHeader').is(':checked');
    var DelimiterId = $('input:radio[name=Delimiter]:checked').attr('id');
    var DelVal = $('input:radio[name=Delimiter]:checked').val();
    var sCurrentLoad = $('#LoadName').val();
    var RecordTypeVal = $('input:radio[name=RecordType]:checked').attr('id');
    var mbFixedWidth = false;
    if (RecordTypeVal !== undefined && RecordTypeVal !== null && RecordTypeVal !== "") {
        if (RecordTypeVal.trim() == "fixed_radio")
            mbFixedWidth = true;
        else
            mbFixedWidth = false;
    }
    var numberOfRow = $('#txtSampling').val();
    //Modified by Hemin for bug fix on 12/05/2016
    $.post(urls.Import.GetGridDataFromFile + '?filePath=' + encodeURIComponent(filePath) + '&headerFlag=' + headerFlag + '&sCurrentLoad=' + encodeURIComponent(sCurrentLoad) + '&numberOfRow=' + numberOfRow + '&firstSheet=' + encodeURIComponent(firstSheet) + '&DelimiterId=' + DelimiterId + '&Delimiter=' + encodeURIComponent(Delimiter) + '&mbFixedWidth=' + mbFixedWidth + "&formatFlag=false", function (data) {
        if (data) {
            if (data.errortype == "s") {
                var columndata = $.parseJSON(data.jsonObject);
                var GridCaptionJSON = $.parseJSON(data.GridCaptionJSON);
                //var flagReverseOrderJSON = $.parseJSON(data.flagReverseOrderJSON);
                //DisableField("#ReverseOrder", flagReverseOrderJSON);
                $("#grdImport").jqGrid('GridUnload');
                $('#tableDIv').show();
                BindGrid($("#grdImport"), urls.Import.ConvertDataToGrid, columndata, GridCaptionJSON, false, false);
                $('#errorDiv').hide();
            }
            else if (data.errortype == "w") {
                $('#lblError').text(data.message);
                $('#errorDiv').show();
            }
            else {
                showAjaxReturnMessage(data.message, data.errortype);
                $('#errorDiv').hide();
            }
        }
    });

}

function ShowDivBasedOnFile(extension) {
    if (extension !== null && extension !== "" && extension !== undefined) {
        if (extension == "txt" || extension == "csv") {
            $('#RowDiv').show();
            $('#knowDiv').removeAttr('checked', 'checked');
            $('#textDiv').show();
            $('#sheetDiv').hide();
            $('input:radio[name=RecordType][value=COMMA]').attr('checked', 'checked');
        } else if (extension == "mdb" || extension == "accdb") {
            $('#RowDiv').hide();
            $('#knowDiv').attr('checked', 'checked');
            $('#textDiv').hide();
            $('#sheetDiv').show();
            $('#sheetDivLabel').text(vrImportRes["msgJsImportSelectTblFromList"] + " :");
        } else if (extension == "xls" || extension == "xlsx") {
            $('#RowDiv').show();
            $('#knowDiv').attr('checked', 'checked');
            $('#textDiv').hide();
            $('#sheetDiv').show();
            $('#sheetDivLabel').text(vrImportRes["msgJsImportSelectWorkSheetOrRng"] + " :");
        } else {
            $('#RowDiv').hide();
            $('#textDiv').hide();
            $('#sheetDiv').hide();
        }
    }
}
//Code for displaying data in grid
function BindGrid(gridobject, getUrl, arrColSettings, caption, IsCheckbox, IsSortableRow) {
    var pDatabaseGridName = gridobject.attr('id');
    var pPagerName = '#' + pDatabaseGridName + '_pager';
    var arryDisplayCol = [];
    var arryColSettings = [];
    var globalColumnOrder = [];
    for (var i = 0; i < arrColSettings.length; i++) {
        arryDisplayCol.push([arrColSettings[i].displayName]);
        globalColumnOrder.push([arrColSettings[i].srno]);
        if (arrColSettings[i].srno == -1) {
            arryColSettings.push({ key: true, hidden: true, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
        }
        else {
            arryColSettings.push({ key: false, name: arrColSettings[i].name, index: arrColSettings[i].name, sortable: arrColSettings[i].sortable });
        }
    }

    gridobject.jqGrid({
        url: getUrl,
        datatype: 'json',
        mtype: 'Get',
        colNames: arryDisplayCol,
        colModel: arryColSettings,
        pager: jQuery(pPagerName),
        rowNum: 10,
        rowList: [10, 20, 30, 40, 50, 60, 70, 80, 90],
        height: '100%',
        viewrecords: true,
        loadonce: false,
        grouping: false,
        caption: caption,
        autowidth: true,
        shrinkToFit: true,
        emptyrecords: vrCommonRes["NoRecordsToDisplay"],
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        }
    });
}//Code for displaying data in grid

function CheckFieldSelection() {
    var isAnyFieldSelected = true;
    var listbox = document.getElementById('bootstrap-duallistbox-selected-list_duallistbox_demo');
    var selIndex = listbox.selectedIndex;
    if (selIndex == -1)
        isAnyFieldSelected = false;

    return isAnyFieldSelected;
}
