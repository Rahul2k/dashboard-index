var valid = false;
var FlyoutUploderFiles;
var attachsNumber = 0;
var attachsCounter = 0;

$(document).ready(function () {

    $("#ModalAddAttachment").on('click', function () {
        //ValidateOutputSettings('Add');
        //if (valid == true) {
        //$('#FileUploadForAddAttach').off().change(function () {

        $('#FileUploadForAddAttach').off().on('change', function () {
            oFileUpload = document.getElementById("FileUploadForAddAttach");
            FlyoutUploderFiles = oFileUpload.files;
            UploadAttachmentOnNewAdd();
        });
        $("#FileUploadForAddAttach").val("");
        $("#FileUploadForAddAttach").click();
        //}
        //return false;
    });

    $("#AddAttachmentId").on('click', function () {
        //$('#FileUploadForAttach').trigger('click');
        ValidateOutputSettings('Add');
        if (valid == true) {
            $('#FileUploadForAttach').trigger('click');
        }
        return false;
    });

    $('#AddVersionId').on('click', function () {
        //$('#FileUploadForVersion').trigger('click');
        ValidateOutputSettings('Edit');
        if (valid == true) {
            $('#FileUploadForVersion').trigger('click');
        }
        return false;
    });

    $('#AddPageId').on('click', function () {
        var IsAnImageFileVal = parseInt($('#IsAnImageFile').val());
        if (IsAnImageFileVal == 1) {
            //$('#FileUploadForPage').trigger('click');
            ValidateOutputSettings('Edit');
            if (valid == true) {
                $('#FileUploadForPage').trigger('click');
            }
            return false;
        } else {
            $("#WarningLabelID").empty();
            $("#WarningLabelID").append(String.format(vrClientsRes["tiHTML5ViewerJSOpenInNativeWarning"]));
            $('#ConfirmWarning').modal('show');
            return false;
        }
    });

    $('#DltAttachmentId').on('click', function () {
        ValidateOutputSettings('Delete');
        if (valid == true) {
            var SelectedAttachment = $('#AttachmentsDDL option:selected').text();
            $('#DeleteBtnType').val("0");
            $("#DeleteLabelID").empty();
            $("#DeleteLabelID").append(String.format(vrClientsRes["tiHTML5ViewerJSRemoveEntireAttachment"], SelectedAttachment));
            $('#ConfirmDelete').modal('show');
        }
        return false;
    });

    $('#DltVersionId').on('click', function () {
        ValidateOutputSettings('Delete');
        if (valid == true) {
            var SelectedAttachment = $('#AttachmentsDDL option:selected').text();
            var SelectedVersion = $('#VersionDDL option:selected').text();
            $('#DeleteBtnType').val("1");
            $("#DeleteLabelID").empty();
            $("#DeleteLabelID").append(String.format(vrClientsRes["tiHTML5ViewerJSRemoveEntireVersion"], SelectedVersion, SelectedAttachment));
            $('#ConfirmDelete').modal('show');
        }
        return false;
    });

    $('#DltPageId').on('click', function () {
        ValidateOutputSettings('Delete');
        if (valid == true) {
            var SelectedAttachment = $('#AttachmentsDDL option:selected').text();
            var SelectedVersion = $('#VersionDDL option:selected').text();
            $('#DeleteBtnType').val("2");
            $("#DeleteLabelID").empty();
            $("#DeleteLabelID").append(String.format(vrClientsRes["tiHTML5ViewerJSRemoveCurrentPageOfVersion"], SelectedVersion, SelectedAttachment));
            $('#ConfirmDelete').modal('show');
        }
        return false;
    });

    $('#RenameAttachmentId').on('click', function () {
        ValidateOutputSettings('Edit');
        if (valid == true) {
            var SelectedAttachment = $('#AttachmentsDDL option:selected').text();
            $('#RenameTBId').val("");
            $('#RenameTBId').val(SelectedAttachment);
            $('#RenameAttachment').modal('show');
        }
        return false;
    });

    $('#CheckInId').on('click', function () {
        var IsAnImageFileVal = parseInt($('#IsAnImageFile').val());
        if (IsAnImageFileVal == 0) {
            $('#IsImageCheckIn').modal('show');
            return false;
        } else {
            $('#CheckInType').val("0");
            $('#CheckIdHideButton').trigger('click');
            return false;
        }
    });

    $('#CheckInAsOfficialId').on('click', function () {
        var IsAnImageFileVal = parseInt($('#IsAnImageFile').val());
        if (IsAnImageFileVal == 0) {
            $('#IsImageCheckIn').modal('show');
            return false;
        } else {
            $('#CheckInType').val("1");
            $('#CheckIdHideButton').trigger('click');
            return false;
        }
    });

    $('#BtnCancel').on('click', function () {
        document.getElementById("FileUploadForAttach").value = "";
        $('#WriteAttachmentName').modal('hide');
    });

});

function UploadAttachmentOnNewAdd() {
    var totalsize = 0;
    var successFilesforPopup = [];
    var failedFilesforPopup = [];
    for (var i = 0; i < FlyoutUploderFiles.length; i++) {
        var format = FlyoutUploderFiles[i].name.toString();
        format = format.split(".");
        var cFileFormat = IsSupportedFile(format[format.length - 1]);
        if (cFileFormat) {
            var size = FlyoutUploderFiles[i].size;
            totalsize = parseInt(totalsize) + parseInt(size);
            successFilesforPopup.push(FlyoutUploderFiles[i].name.toString());
        } else {
            failedFilesforPopup.push(FlyoutUploderFiles[i].name.toString());
        }
    }

    if (failedFilesforPopup.length > 0) {
        $('#ContentPlaceHolder1_h4title').html(vrClientsRes["lblMSGErrorMessage"]);
        $('#ContentPlaceHolder1_divMessage').html('<p>' + vrClientsRes["msgDocViewerInvalidFileFormat"] + '</p>');
        OpenMessage();
    }
    else {
        var sizeKB = parseInt(totalsize) / 1024;
        var filesizeMB = parseInt(sizeKB) / 1024;
        CheckFileMaxSizelimitforPopup(filesizeMB, false);
    }
}


function UploadAttachment(queryString) {
    $.ajax({
        type: "POST",
        url: "../DocumentViewer.aspx/DragAndDropAttachment",
        data: '{queryString: "' + queryString + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            // refresh flyout popup after adding new attachment from new add pin in flyout pouup. 
            ShowDialogFormAttachment(globalDocData, globalcurrentanchor);
        },
        failure: function (response) {
            alert(response.d);
        }
    });
}

function UploadAttachmentFile(fileUpload) {
    if (fileUpload.files.length == 1) {
        var format = fileUpload.files[0].name.toString();
        format = format.split(".");
        var cFileFormat = IsSupportedFile(format[format.length - 1]);
        var renameOnScan = $('#renameOnScan').val();
        if (cFileFormat) {
            $('#AttachmentID').val("");
            if (renameOnScan != 'False') {
                $('#WriteAttachmentName').modal('show');
            } else {
                $('#BtnRename').trigger('click');
            }
        } else {
            document.getElementById("FileUploadForAttach").value = "";
            showAjaxReturnMessageDViewer(vrClientsRes["msgDocViewerInvalidFileFormat"], 'w');
        }
    } else {
        $('#UploadAttachmentId').trigger('click');
    }
}

function UploadVersionFile(fileUpload) {
    if (fileUpload.files.length > 0) {
        var format = fileUpload.files[0].name.toString();
        format = format.split(".");
        var cFileFormat = IsSupportedFile(format[format.length - 1]);
        if (cFileFormat) {
            $('#UploadVersionId').trigger('click');
        } else {
            document.getElementById("FileUploadForVersion").value = "";
            showAjaxReturnMessageDViewer(vrClientsRes["msgDocViewerInvalidFileFormat"], 'w');
        }
    }
}

function UploadPageFile(fileUpload) {
    if (fileUpload.files.length > 0) {
        var format = fileUpload.files[0].name.toString();
        format = format.split(".");
        var cFileFormat = IsSupportedFile(format[format.length - 1]);
        if (cFileFormat) {
            $('#UploadPageId').trigger('click');
        } else {
            document.getElementById("FileUploadForPage").value = "";
            showAjaxReturnMessageDViewer(vrClientsRes["msgDocViewerInvalidFileFormat"], 'w');
        }
    }
}

function formatTable() {
    $('#WarningLabelID').empty();
    $('#WarningLabelID').append(vrClientsRes["tiHTML5ViewerJSWarningNotToAddFileForImage"]);
    $('#ConfirmWarning').modal('show');
    return false;
}

function ValidateOutputSettings(opt) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            data: '{ opt:"' + opt + '" }',
            url: "DocumentViewer.aspx/GetDefaultSystemDrive",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                //var value = document.getElementById("hdnInvalidOutputSettings");
                var res = response.d.toLowerCase();
                if (res.split(",")[0].split(":")[1] == "true" && res.split(",")[1].split(":")[1] == "true" && res.split(",")[2].split(":")[1] == "true") {
                    valid = true;
                } else {
                    if (res.split(",")[1].split(":")[1] == "false") {
                        $('#ContentPlaceHolder1_h4title').html(vrClientsRes["lblMSGErrorMessage"]);
                        $('#ContentPlaceHolder1_divMessage').html(vrClientsRes["msgDocViewerVolumePermission"]);
                        OpenMessage();
                        RemoveLoader();
                        //showAjaxReturnMessageDViewer(vrClientsRes["msgDocViewerVolumePermission"], 'w');
                    } else if (res.split(",")[0].split(":")[1] == "false") {
                        $('#ContentPlaceHolder1_h4title').html(vrClientsRes["lblMSGErrorMessage"]);
                        $('#ContentPlaceHolder1_divMessage').html(vrClientsRes["msgDocViewerInvalidOutPutSettings"]);
                        OpenMessage();
                        RemoveLoader();
                        //showAjaxReturnMessageDViewer(vrClientsRes["msgDocViewerInvalidOutPutSettings"], 'w');
                    } else {
                        $('#ContentPlaceHolder1_h4title').html(vrClientsRes["lblMSGErrorMessage"]);
                        $('#ContentPlaceHolder1_divMessage').html(vrClientsRes["msgDocViewerInactiveOutPutSettings"]);
                        OpenMessage();
                        RemoveLoader();
                    }
                    valid = false;
                }
                resolve();
            },
            error: function (xhr, status, error) {
                showAjaxReturnMessageDViewer(vrClientsRes["msgDocViewerInvalidOutPutSettings"], 'e');
                valid = false;
                reject();
            }
        });
    });
}
function showAjaxReturnMessageDViewer(message, msgType) {
    var divId = '';
    var msgcls = '';
    var msgTitle = '';
    switch (msgType.toLowerCase()) {
        case 'warning': case 'w':
            msgcls = 'warning';
            msgTitle = vrCommonRes["Warning"];
            break;
        case 'error': case 'e':
            msgcls = 'error';
            msgTitle = vrCommonRes["msgError"];
            break;
        case 'success': case 's':
            msgcls = 'success';
            msgTitle = vrCommonRes["Success"];
            break;
        case 'info': case 'i':
            msgcls = 'info';
            msgTitle = vrCommonRes["Information"];
            break;
        case 'loading':
            divId = 'ajaxloading';
            break;
    }
    LoadErrorMessage(msgcls, message, msgTitle);
}

function LoadErrorMessage(errorType, message, msgTitle) {
    var i = -1;
    var toastCount = 0;
    var $toastlast;
    var getMessage = '';
    var getMessageWithClearButton = function (msg) {
        msg = msg ? msg : 'Clear itself?';
        msg += '<br /><br /><button type="button" class="btn clear">Yes</button>';
        return msg;
    };

    var shortCutFunction = errorType;
    var msg = message;
    var title = msgTitle || '';
    var $showDuration = 300;
    var $hideDuration = 1000;
    var $timeOut = 5000;
    var $extendedTimeOut = 1000;
    var $showEasing = 'swing';
    var $hideEasing = 'linear';
    var $showMethod = 'fadeIn';
    var $hideMethod = 'fadeOut';
    var toastIndex = toastCount++;
    var addClear = false;

    toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
        onclick: null
    };

    if ($showDuration.length) {
        toastr.options.showDuration = $showDuration;
    }

    if ($hideDuration.length) {
        toastr.options.hideDuration = $hideDuration;
    }

    if ($timeOut.length) {
        toastr.options.timeOut = $timeOut;//addClear ? 0 : $timeOut;
    }

    if ($extendedTimeOut.length) {
        toastr.options.extendedTimeOut = $extendedTimeOut;// addClear ? 0 : $extendedTimeOut;
    }

    if ($showEasing.length) {
        toastr.options.showEasing = $showEasing;
    }

    if ($hideEasing.length) {
        toastr.options.hideEasing = $hideEasing;
    }

    if ($showMethod.length) {
        toastr.options.showMethod = $showMethod;
    }

    if ($hideMethod.length) {
        toastr.options.hideMethod = $hideMethod;
    }

    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
    $toastlast = $toast;

    if (typeof $toast === 'undefined' || $toast === null) {
        return;
    }

    if ($toast.find('#okBtn').length) {
        $toast.delegate('#okBtn', 'click', function () {
            $toast.remove();
        });
    }
    if ($toast.find('#surpriseBtn').length) {
        $toast.delegate('#surpriseBtn', 'click', function () {
            //alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
        });
    }
    if ($toast.find('.clear').length) {
        $toast.delegate('.clear', 'click', function () {
            toastr.clear($toast, { force: true });
        });
    }
    function getLastToast() {
        return $toastlast;
    }

}

function IsSupportedFile(format) {
    var isSupported = true;
    switch (format.toString().toLowerCase()) {
        case 'abc': case 'abic': case 'afp': case 'ani': case 'anz': case 'arw': case 'bmp': case 'cal': case 'cin': case 'clp':
        case 'cmp': case 'cmw': case 'cr2': case 'crw': case 'cur': case 'cut': case 'dcr': case 'dcs': case 'dcm': case 'dcx':
        case 'dng': case 'dxf': case 'eps': case 'exif': case 'fax': case 'fit': case 'flc': case 'fpx': case 'gif': case 'gtiff':
        case 'hdp': case 'ico': case 'iff': case 'ioca': case 'ingr': case 'img': case 'itg': case 'jbg': case 'jb2': case 'jpg':
        case 'jpeg': case 'j2k': case 'jp2': case 'jpm': case 'jpx': case 'kdc': case 'mac': case 'mng': case 'mob': case 'msp':
        case 'mrc': case 'nef': case 'nitf': case 'nrw': case 'orf': case 'pbm': case 'pcd': case 'pcx': case 'pdf': case 'pgm':
        case 'png': case 'pnm': case 'ppm': case 'ps': case 'psd': case 'psp': case 'ptk': case 'ras': case 'raf': case 'raw':
        case 'rw2': case 'sct': case 'sff': case 'sgi': case 'smp': case 'snp': case 'sr2': case 'srf': case 'tdb': case 'tfx':
        case 'tga': case 'tif': case 'tifx': case 'vff': case 'wbmp': case 'wfx': case 'x9': case 'xbm': case 'xpm': case 'xps':
        case 'xwd': case 'cgm': case 'cmx': case 'dgn': case 'drw': case 'dxf': case 'dwf': case 'dwfx': case 'dwg': case 'e00':
        case 'emf': case 'gbr': case 'mif': case 'nap': case 'pcl': case 'pcl6': case 'pct': case 'plt': case 'shp': case 'svg':
        case 'wmf': case 'wmz': case 'wpg': case 'doc': case 'docx': case 'eml': case 'mobi': case 'epub': case 'html': case 'msg':
        case 'ppt': case 'pptx': case 'pst': case 'rtf': case 'svg': case 'txt': case 'xls': case 'xlsx': case 'xps':
            isSupported = true;
            break;
        default:
            isSupported = false;
    }

    return isSupported;
}

//Load flyout popup with all attachments
var globalDocData;
var globalcurrentanchor;
var url_Link;


var scannerCall = document.getElementById("");

function ShowDialogFormAttachment(docdata, currentanchor) {
    //fix for service pack1 moti mashiah
    var sBrowser = navigator.userAgent;
    var IE = sBrowser.indexOf("rv:11");
    if (IE > 0) {
        $("#gotoScanner").hide();
        $("#openAttachViewer").unbind().click(function () {
            window.open(url_Link, "_blank")
        });
    } else {
        ("dragdropattachment").split("?")[1];
        $("#gotoScanner").unbind().click(function (e) {
            localStorage.setItem("callFromScanner", 1);
            window.open(url_Link, "_blank");
        });
        $("#openAttachViewer").unbind().click(function () {
            localStorage.setItem("callFromScanner", 0);
            window.open(url_Link, "_blank");
        });
    }
    url_Link = "";
    if (IE > 0) {
        url_Link = window.location.origin + "/undocked.aspx?v=" + currentanchor.getAttribute("onclick").split("('")[1].split("',")[0]
    } else {
        url_Link = window.location.origin + "/DocumentViewer/Index?documentKey=" + currentanchor.getAttribute("dragdropattachment").split("?")[1];
    }
    return new Promise(function (resolve, reject) {
        //setTimeout(function () {
            if ($(currentanchor).closest('tr').attr('class').indexOf('dragandrophandler') > -1) {
                if ($("#AttachmentModalBody").attr('class').indexOf('dragandrophandlerpopup') <= 0)
                    //$("#AttachmentModalBody").addClass('dragandrophandlerpopup');
                $('#ModalAddAttachment').find('i').removeClass('gray-color');
                $('#ModalAddAttachment').removeClass('a-disable');
            } else {
                if ($("#AttachmentModalBody").attr('class').indexOf('dragandrophandlerpopup') > -1)
                    $("#AttachmentModalBody").removeClass('dragandrophandlerpopup');
                $('#ModalAddAttachment').find('i').addClass('gray-color');
                $('#ModalAddAttachment').addClass('a-disable');
            }

            globalcurrentanchor = currentanchor;
            globalDocData = docdata;
            var imageURL = '../Common/LoadFlyoutPartial';
            //return new Promise(function (resolve, reject) {
            $.ajax({
                url: imageURL,
                data: { 'docdata': docdata, isMVC: false },
                type: "get",
                cache: false,
                success: function (result) {
                    resolve();
                    //$('#dialog-form-attachment').modal('show');
                    $('#dialog-form-attachment').modal({ backdrop: 'static', keyboard: false });
                    $('#AttachmentModalBody').empty();
                    $('#AttachmentModalBody').html(result);
                    var pdisplayCount = $("#ThumbnailDetails img").length;
                    var pageText = String.format(vrClientsRes["lblAttachmentPopupPagging"],
                        pdisplayCount.toString(),
                        $("#totalRecCount").val());
                    //$("#resultDisplay").text("Attachments display " + pdisplayCount.toString() + " from " + $("#totalRecCount").val());
                    $("#resultDisplay").text(pageText);
                    if ($("#totalRecCount").val() <= 6) {
                        $("#AttachmentModalBody").css("max-height", "calc(100vh - 273px)");
                    } else {
                        $("#AttachmentModalBody").css("max-height", "500px");
                    }
                    //bind scroll down event for paggination
                  
                    $("#AttachmentModalBody").unbind('scroll').bind('scroll',
                        function (e) {
                            if (Math.ceil($(this).scrollTop() + $(this).innerHeight()) >= $(this)[0].scrollHeight) {
                                var displayCount = $("#ThumbnailDetails img").length;
                                var vTotalCount =
                                    parseInt($("#totalRecCount").val() == "" ? 0 : $("#totalRecCount").val());
                                if (displayCount != vTotalCount) {
                                    var pageIndex =
                                        parseInt($("#sPageIndex").val() == "" ? 1 : $("#sPageIndex").val()) + 1;
                                    var pageSize = parseInt($("#sPageSize").val() == "" ? 0 : $("#sPageSize").val());
                                    $.ajax({
                                        url: '../Common/LazyLoadPopupAttachments',
                                        data: { 'docdata': docdata, 'PageIndex': pageIndex, 'PageSize': pageSize, 'viewName': $("#viewName").val(), 'isMVC': false },
                                        type: "get",
                                        cache: false,
                                        success: function (result) {
                                            var pOutputObject = JSON.parse(result.flyoutModel);
                                            var loopObject = pOutputObject.FlyOutDetails;
                                            $.each(loopObject,
                                                function (key, value) {
                                                    var urlParameterEncode = "filePath=" +
                                                        encodeURIComponent(value.sOrgFilePath) +
                                                        "&fileName=" +
                                                        encodeURIComponent(value.sAttachmentName) +
                                                        "&docKey=" + value.downloadEncryptAttachment;
                                                    var url = '/Common/DownloadAttachment?' + urlParameterEncode;
                                                    var html = '<div Class="col-lg-4 col-md-6 col-sm-6 col-xs-12" >' +
                                                        '<div Class="Thmbnail-main">' +
                                                        '<div Class="Thmbnail-header">' +
                                                        value.sAttachmentName +
                                                        '</div>' +
                                                        '<a href="' +
                                                        value.sViewerLink +
                                                        '" target="_blank">' +
                                                        '<div Class="Thmbnail-body">' +
                                                        '<div Class="caption">' +
                                                        '<div Class="caption-content">' +
                                                        '<i Class="fa fa-eye fa-3x"></i> ' +
                                                        '</div>' +
                                                        '</div>' +
                                                        "<img src='" +
                                                        "data:image/jpg;base64," +
                                                        value.sFlyoutImages +
                                                        "' id='1' Class='img-responsive' width='300px' height='280px' onclick='Demo()' />" +
                                                        '</div>' +
                                                        '</a>' +
                                                        '<div Class="Thmbnail-footer">' +
                                                        '<div Class="col-md-12 col-sm-12 col-xs-12">' +
                                                        '<span Class="fa-stack">';
                                                    if (pOutputObject.downloadPermission) {
                                                        html += '<a href="' +
                                                            url +
                                                            '" Class="a-color" data-toggle="tooltip" title="Download" >' +
                                                            '<span class="fa-stack">' +
                                                            '<i class="fa fa-arrow-down fa-stack-1x"></i>' +
                                                            '<i class="fa fa-circle-thin fa-stack-2x"></i>' +
                                                            '</span>' +
                                                            '</a>';
                                                    } else {
                                                        html +=
                                                            '<a href="#" Class="a-disable" data-toggle="tooltip" title="Download" style="color:gray !important">' +
                                                            '<span class="fa-stack">' +
                                                            '<i class="fa fa-arrow-down fa-stack-1x"></i>' +
                                                            '<i class="fa fa-circle-thin fa-stack-2x"></i>' +
                                                            '</span>' +
                                                            '</a>';
                                                    }
                                                    html += '</span>' +
                                                        '</div>' +
                                                        '<div Class="clearfix"></div>' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '</div>';
                                                    $("#ThumbnailDetails").append(html);
                                                });
                                            //$("#spinningWheel").hide();
                                            displayCount = $("#ThumbnailDetails img").length;
                                            var pageText = String.format(vrClientsRes["lblAttachmentPopupPagging"],
                                                displayCount.toString(),
                                                $("#totalRecCount").val());
                                            //$("#resultDisplay").text("Attachments display " + displayCount.toString() + " from " + $("#totalRecCount").val());
                                            $("#resultDisplay").text(pageText);

                                            $("#sPageIndex").val(pageIndex);
                                            $("#sPageSize").val(pageSize);
                                        },
                                        error: function (xhr, ajaxOptions, thrownError) {
                                            console.log(xhr);
                                        }
                                    });
                                }
                            }
                        });
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    reject();
                    console.log(xhr);
                }
            },
                1000);
            //});
        //});
    })
}

function CloseFormAttachment() {
    $('.modal-body').css('overflow-y', 'auto');
    $("#AttachmentModalBody").unbind('scroll');
    $('#dialog-form-attachment').modal('hide');
    //$('#AttachmentModalBody').empty();
}



function CheckFileMaxSizelimit(filesizeMB, $this) {
    ValidateOutputSettings('Add');
    if (valid == true) {
        $.ajax({
            type: "POST",
            url: "../Data.aspx/CheckMaxSizelimit",
            data: '{filesizeMB: "' + filesizeMB + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var values = result.d.toString().split("~");
                var showWarringMsg = values[0];
                var warringMsg = values[1];
                if (showWarringMsg == 'True') {
                    $('#ContentPlaceHolder1_h4title').html(vrClientsRes["lblMSGErrorMessage"]);
                    $('#ContentPlaceHolder1_divMessage').html('<p>' + warringMsg + '</p>');
                    OpenMessage();
                }
                else {
                    var href = $this.find('td.Column3 > a').attr("dragdropattachment");
                    var value = href.toString().split("?");
                    queryString = value[1];
                    ShowConfirmPopup(queryString);
                }
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }
}

function ShowConfirmPopup(queryString) {
    $.ajax({
        type: "POST",
        url: "../Data.aspx/GetTableIdValue",
        data: '{queryString: "' + queryString + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var value = result.d.toString();
            $('#msgDragAndDropAttachmentConfirm').html('');
            $('#msgDragAndDropAttachmentConfirm').html(value);
            $('#dialog-form-drag-and-drop-ConfirmMessage').modal('show');
        },
        failure: function (response) {
            alert(response.d);
        }
    });
}

function AttachmentConfirmMessageOkClick(queryString, dropfiles) {
    CloseDragAndDropAttachmentConfirmMessage();
    AddLoader();
    //setTimeout(function () {
    var sURL = "DragAndDropAttachmentHandler.ashx";
    for (var i = 0; i < dropfiles.length; i++) {
        var data = new FormData();
        data.append(dropfiles[i].name, dropfiles[i]);
        $.ajax({
            type: "POST",
            url: sURL,
            data: data,
            processData: false,
            contentType: false,
            async: false,
            success: function (data, status) {
                DragAndDropAttachmentProcess(queryString).then(function () {
                    attachsCounter++;
                    if (dropfiles.length == attachsCounter) {
                        RemoveLoader();
                        attachsCounter = 0;
                    }
                });
            }
        });
    }
    //}, 2000);
    //setTimeout(function () {
    //    RemoveLoader();
    //}, 1500);
}

function DragAndDropAttachmentProcess(queryString) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "../DocumentViewer.aspx/DragAndDropAttachment",
            data: '{queryString: "' + queryString + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                resolve();
            },
            failure: function (response) {
                alert(response.d);
                reject();
            }
        });
    });
}

function CloseDragAndDropAttachmentConfirmMessage() {
    $('#dialog-form-drag-and-drop-ConfirmMessage').modal('hide');
}

function CheckFileMaxSizelimitforPopup(filesizeMB, IsDragAndDrop) {
    ValidateOutputSettings('Add').then(function () {
        if (valid == true) {
            AddLoader();
            $.ajax({
                type: "POST",
                url: "../Data.aspx/CheckMaxSizelimit",
                data: '{filesizeMB: "' + filesizeMB + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var values = result.d.toString().split("~");
                    var showWarringMsg = values[0];
                    var warringMsg = values[1];
                    if (showWarringMsg == 'True') {
                        $('#ContentPlaceHolder1_h4title').html(vrClientsRes["lblMSGErrorMessage"]);
                        $('#ContentPlaceHolder1_divMessage').html('<p>' + warringMsg + '</p>');
                        RemoveLoader();
                        OpenMessage();
                    }
                    else {
                        var tablerowid = globalcurrentanchor.parentElement.parentElement.id;
                        var href = $('#' + tablerowid).find('td.Column3 > a').attr("dragdropattachment");
                        var value = href.toString().split("?");
                        queryString = value[1];
                        var hasPermission = ValidAttachmentPermission(queryString, "Add");
                        if (hasPermission) {
                            UploadDragandDropAttachmentforPopup(queryString, IsDragAndDrop);
                        } else {
                            $('#ContentPlaceHolder1_h4title').html(vrClientsRes["lblMSGErrorMessage"]);
                            $('#ContentPlaceHolder1_divMessage').html(vrClientsRes["msgDocViewerAddPermission"]);
                            OpenMessage();
                            RemoveLoader();
                        }
                        
                    }
                },
                failure: function (response) {
                    alert(response.d);
                }
            });
        }
    });
    return false;
}

function UploadDragandDropAttachmentforPopup(queryString, IsDragAndDrop) {
    var oFileContainer = "";
    var sURL = "DragAndDropAttachmentHandler.ashx";
    if (IsDragAndDrop == true) {
        oFileContainer = dropfilesforPopup;
    } else {
        oFileContainer = FlyoutUploderFiles;
    }
    for (var i = 0; i < oFileContainer.length; i++) {
        var data = new FormData();
        data.append(oFileContainer[i].name, oFileContainer[i]);
        $.ajax({
            type: "POST",
            url: sURL,
            data: data,
            processData: false,
            contentType: false,
            async: false,
            success: function (data, status) {
                attachsNumber = oFileContainer.length;
                DragAndDropAttachmentProcessforPopup(queryString);
            }, error: function (error) {

            }
        });
    }
    //setTimeout(function () {
    //    RemoveLoader();
    //}, 1500);
}

function DragAndDropAttachmentProcessforPopup(queryString) {
    $.ajax({
        type: "POST",
        url: "../DocumentViewer.aspx/DragAndDropAttachment",
        data: '{queryString: "' + queryString + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            ShowDialogFormAttachment(globalDocData, globalcurrentanchor).then(function () {
                attachsCounter++;
                if (attachsCounter == attachsNumber) {
                    RemoveLoader();
                    attachsCounter = 0;
                }

            });
        },
        failure: function (response) {
            alert(response.d);
        }
    });
}
//check permission for add, edit and delte attachment.
function ValidAttachmentPermission(DocString, opt) {
    var valid = false;

    var formdata = new FormData();
    formdata.append("getVariable", DocString);
    formdata.append("getVariable", opt);

    var ajaxOptions = {};
    ajaxOptions.url = "/DocumentViewer/GetAttachmtsPermissions";
    ajaxOptions.type = "POST";
    ajaxOptions.dataType = "html";
    ajaxOptions.async = false;
    ajaxOptions.contentType = false;
    ajaxOptions.processData = false;
    ajaxOptions.data = formdata;
    $.ajax(ajaxOptions).done(function (data) {
        if (data == "True") {
            valid = true;
        } else {
            valid = false;
        }

    }).fail(function (jqXHR, textStatus) {
        alert(jqXHR);
        alert(textStatus);
    });
    return valid;
}
