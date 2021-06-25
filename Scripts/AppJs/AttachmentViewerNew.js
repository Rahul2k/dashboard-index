var valid = false;

$(document).ready(function () {
    $("#clickTestid").click(function () {
        //$("#filePath").val("D:\\Google Drive\\Documents\\My procedure\\Torstar VMWare Infrastructure Design and Implementation.docx");
        //$("#filePath").val("D:\\files_test\\testBigPdf.pdf");
        //$("#filePath").val("C:\\Users\\mmashiah\\Desktop\\sample.docx")
        //leadtools.loadDocument("C:\\ProgramData\\TAB\\FusionRMS Demo\\Attachments\\SL000001\\A000042.pdf")
        leadtools.loadDocument("D:\\sample.pdf")
    })

    $("#AddAttachmentId").on('click', function () {
        debugger;
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
    $.ajax({
        type: "GET",
        data: '{ opt:"' + opt + '" }',
        url: "/DocumentViewer/GetDefaultSystemDrive",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            //var value = document.getElementById("hdnInvalidOutputSettings");
            var res = response.d.toLowerCase();
            if (res.split(",")[0].split(":")[1] == "true" && res.split(",")[1].split(":")[1] == "true") {
                valid = true;
            } else {
                if (res.split(",")[1].split(":")[1] == "false") {
                    showAjaxReturnMessageDViewer(vrClientsRes["msgDocViewerVolumePermission"], 'w');
                } else {
                    showAjaxReturnMessageDViewer(vrClientsRes["msgDocViewerInvalidOutPutSettings"], 'w');
                }
                valid = false;
            }
        },
        error: function (xhr, status, error) {
            showAjaxReturnMessageDViewer(vrClientsRes["msgDocViewerInvalidOutPutSettings"], 'e');
            valid = false;
        }
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