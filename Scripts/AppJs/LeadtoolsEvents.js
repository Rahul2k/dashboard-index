//click add attachment
var scanningService = new lt.Scanning.JavaScript.TwainScanning("http://localhost/ScanService/");
$("body").on('click', "#AddAttachmentId", function () {
    const outputSetting = func.ValidateOutputSettings("Add");
    if (outputSetting == false) return;

    const checkPermission = func.SecurePermissions("Add");
    if (checkPermission != true) {
        showAjaxReturnMessage(vrHTMLViewerRes["msgJsAddAttachmentPermission"], "w");
        return;
    }

    //prevent comma into input
    var NameAttachment = document.getElementById("AttachmentID");
    NameAttachment.value = "";
    NameAttachment.addEventListener("keydown", function (e) {
        if (e.keyCode == 188) {
            e.preventDefault();
        }
    });

    $('#FileUploadForAttach').trigger('click');
});
//upload attachment
$("body").on("change", "#FileUploadForAttach", function () {
    var files = this.files;
    func.UploadAttachment(ActiveFunction, files);
});
//approve add attachment
$('body').on("click", "#AddAttachmentBtnOk", function () {
    if (func.CallFromDragDrop == true) {
        func.CallFromDragDrop = false;
    } else {
        func.Storefile = $("#FileUploadForAttach").get(0).files;
    }
    func.AddAttachment(ActiveFunction, func.Storefile);
});
//delete attachment
$('body').on("click", "#delete_files_id", function () {
    func.CheckMultipleFilesIfcheckOutBeforeDelete(ActiveFunction);
});
//delete attachment approve
$("body").on("click", "#DelAttachmentsaccept", function () {
    func.ApprovedDeleteFiles(ActiveFunction);
});
//checkout file - attachment
$("body").on("click", "#checkOutFile_id", function () {
    func.HasAttachEditPermission = func.ValidAttachmentPermission('Edit');
    var CheckPermissions = func.SecurePermissions("Edit");
    //if (CheckPermissions == false) return alert("You don't have permission to Checkout, please contact your administrator!");
    if (CheckPermissions == false) {
        showAjaxReturnMessage(vrHTMLViewerRes["msgJsCheckOutAttachmentPermission"], "w");
        return;
    }
    func.CheckIncheckOut(ActiveFunction, this);
});
//add page
$("body").on("click", "#addpage_id", function () {
    $(DomElements.addpageFromFile).trigger("click");
});
//add page from file
$("body").on("change", "#addpageFromFile_id", function () {
    func.AddPages(ActiveFunction, this);
    $(DomElements.deletePageid).show();
});
//delete page
$("body").on("click", "#deletePage_id", function () {
    func.DeletePages(ActiveFunction, this);
});
//cancel save version
$("body").on("click", "#cancelCheckout_id", function () {
    func.CancleCheckout(ActiveFunction, this);
});
//add version
$("body").on("change", "#FileUploadVersion_id", function () {
    func.Uploadversions(ActiveFunction, this);
});
$("body").on("click", "#AddVersion_Id", function () {
    const validOutput = func.ValidateOutputSettings("Edit");
    if (validOutput == false) return;

    const addpermission = func.SecurePermissions("Add");
    if (addpermission == false) {
        showAjaxReturnMessage(vrHTMLViewerRes["msgJsAddVersionPermission"], "w");
        return;
    }
    $("#FileUploadVersion_id").trigger("click");
    //hide extra buttons if exist
    $(DomElements.ifCheckboxcheckedDiv).hide();
});
//download files
$("body").on("click", "#downloadfiles_id", function () {
    var listCheckbox = $(DomElements.Listofcheckboxs);
    var countCheckboxChecked = 0;
    for (var i = 0; i < listCheckbox.length; i++) {
        if (listCheckbox[i].checked) {
            countCheckboxChecked++;
        }
    }
    if (countCheckboxChecked > 50) {
        showAjaxReturnMessage(vrHTMLViewerRes["msgDownloadattchsLimit"] + "(" + countCheckboxChecked + ")", "w");
        return;
    }
    func.CheckIfFileExistBeforedownload();
});
//magnify glass
$("body").on("click", "#magnifyGlassId", function () {
    func.MagnifyGlassCall(ActiveFunction, this);
});
//ocr call
$("body").on("click", "#OcrcallId", function () {
    try {
        //if (leadtools.documentViewer.document.mimeType == "text/plain") { return alert("Text file not support By OCR") }
        if (leadtools.documentViewer.document.mimeType == "text/plain") {
            showAjaxReturnMessage(vrHTMLViewerRes["msgJsNoSupportForOCR"], "w");
            return;
        }
        func.EnableOcr(ActiveFunction, this);
    } catch (e) {
        showAjaxReturnMessage(vrHTMLViewerRes["msgNoDocToOCR"] + " " + e.message, "e");
    }

});
$("body").on("click", "#cancel_progress", function () {
    $(this).attr("disabled", true);
    func.cancelUpload = true;
});
//SearchForText
$("body").on("keypress", "#txtSearch_id", function (e) {
    var textlen = $(this).val();
    var textOutput = $("#textOutput_id");
    if (textlen.length < 3) {
        textOutput.show();
        textOutput.html("<span style='color:red'>" + vrHTMLViewerRes["msgJs3CharsMin"] + "</span>");
        return;
    }
    if (e.which == 13) {
        e.preventDefault();
        e.stopPropagation();
        //func.SearchForText(ActiveFunction, this);
        func.SearchForText(ActiveFunction, this);
    }

});
document.addEventListener("keydown", function (e) {
    if (e.which == 37) {
        func.SearchForText(ActiveFunction, 'pre');
    }
    if (e.which == 39) {
        func.SearchForText(ActiveFunction, '');
    }
});
//button search
$('body').on('click', '#btnSearch', function () {
    e = jQuery.Event("keypress");
    e.which = 13;
    $("#txtSearch_id").keypress(function () { }).trigger(e);
});
//var isChecked = false;
$("body").on("click", "#CheckAll_id", function () {
    var check = this.text.length;
    attchDownload = $("#attachmentsList li");
    var chekboxChecked = $(this);
    //23 means /check the length of the checkbox all message and if it is 23 mean check all
    if (check == 23) {
        chekboxChecked.text(vrHTMLViewerRes["msgunCheckAttachment"]);
        for (var i = 0; i < attchDownload.length; i++) {
            var isAnno = attchDownload[i].children[9].value;
            if (isAnno == 0) {
                attchDownload[i].childNodes[1].firstElementChild.checked = true;
            }
        }
        $(DomElements.ifCheckboxcheckedDiv).fadeIn(1000);
        func.RemoveAttachmentfunc();
    } else {
        chekboxChecked.text(vrHTMLViewerRes["lblmnuIndexCheckAll"]);
        for (var i = 0; i < attchDownload.length; i++) {
            attchDownload[i].childNodes[1].firstElementChild.checked = false;
        }
        $(DomElements.ifCheckboxcheckedDiv).fadeOut(1000);
        func.ShowAttachmentFunc();
    }
});
$("body").on("click", "#ScanNew_id", function () {
    const outputSetting = func.ValidateOutputSettings("Add");
    if (outputSetting != true) return;
    const HasAddPermission = func.SecurePermissions("Add");
    if (HasAddPermission != true) {
        showAjaxReturnMessage(vrHTMLViewerRes["msgJsAddAttachmentPermission"], "w");
        return;
    }
    
    if (isScanServicerunning === false) {
        func.startScanningService(function onSuccess() {
            scanningService.isAvailable(function (available) {
                if (!available) {
                    //alert("No TWAIN Data Source installed");
                    showAjaxReturnMessage(vrHTMLViewerRes["msgJsNoTWAINDSInstalled"], "w");
                    //_this.enableScanningControls(false);
                }
                else {
                    func.ScanGetSources();
                    // Custom User command sample (Calling Load Command to append pages from the specified url)
                    //func.ScanGetsources();
                }
            }, null);
        });
    } else {
        func.ScanGetSources();
    }
});
$("body").on("click", "#scanBtnClick", function () {
    func.RunScanning();
});
$("body").on("change", "#selecttwain_id", function () {
    func.selectScanSource(this);
});
$("body").on("click", "#cancelscanMode_id", function () {
    //var conf = confirm("Are you sure you want to cancel your scanning without saving?")
    //if (conf) {
    //    func.CancelscanOperation();
    //}

    $(this).confirmModal({
        confirmTitle: 'TAB FusionRMS',
        confirmMessage: vrHTMLViewerRes['msgJsConfirmCancelScanWithoutSave'],
        confirmOk: vrCommonRes['Yes'],
        confirmCancel: vrCommonRes['No'],
        confirmStyle: 'default',
        confirmCallback: function () {
            func.CancelscanOperation();
        }
    });
});
//open dialog for scanning
$("body").on("click", "#saveScanNewAttachment_options", function () {
    var selectTiff = document.getElementById("selectFormatid");
    selectTiff.selectedIndex = 0;
    $("#AttachmentNameID").val("");
    $("#scanSaveNewDlg").modal("show");
});
//save scanning to a new attachment.
$("body").on("click", "#AddAttachmentScanBtnOk", function () {
    var selectFormat = $("#selectFormatid").val();
    func.EndscanOperation(parseInt(selectFormat));
})
//shopping cart events
$("body").on("click", "#cartList_Id", function () {
    var note = document.getElementById("Noteid");
    var checkbox = document.getElementById("checkallattachmentCartId");
    checkbox.checked = false;
    func.ShoppingCart(ActiveFunction, this);
});

$("body").on("click", "#checkallattachmentCartId", function () {
    var _this = this;
    var lenAttachs = _this.parentElement.parentElement.parentElement.parentElement.children[1].children.length;
    if (_this.checked === true) {
        for (var i = 0; i < lenAttachs; i++) {
            //if row is hidden it means that user remove the row and we are not checking the hidden row for download.
            var elem = _this.parentElement.parentElement.parentElement.parentElement.children[1].children[i];
            if (i % 2 === 0 && elem.hidden === false) {
                elem.children[2].firstChild.checked = true;
            }
        }
    } else if (_this.checked === false) {
        for (var j = 0; j < lenAttachs; j++) {
            if (j % 2 === 0) {
                _this.parentElement.parentElement.parentElement.parentElement.children[1].children[j].children[2].firstChild.checked = false;
            }
        }
    }
});

$("body").on("click", "#cartList_dialog tbody tr td input[type=checkbox]", function () {
    var listCheckBox = $("#cartList_dialog tbody tr td input[type=checkbox]");
    var checkAll = $("#checkallattachmentCartId");
    var countFalse = 0;
    var countTrue = 0;
    for (var i = 0; i < listCheckBox.length; i++) {
        var isChecked = listCheckBox[i].checked;
        if (isChecked == true) {
            countTrue++;
        } else {
            countFalse++;
        }
    }

    if (countFalse > 0) {
        checkAll[0].checked = false;
    } else {
        checkAll[0].checked = true;
    }

});

$("body").on("click", "#Addtocart_id", function () {
    func.AddAttachmnetsToShoppingCart();
});

$("body").on("click", "#cartList_dialog tbody a", function (e) {
    var note = document.getElementById("Noteid");
    note.disabled = true;
    var attachClick = $(this);
    e.preventDefault();
    func.ClickOnCartAttachment(attachClick[0]);
});
$("body").on("click", "#downloadCart", function () {
    //limite download to 20 attachments
    var listCheckBox = $("#cartList_dialog tbody tr td input[type=checkbox]");
    var countCheckboxChecked = 0;
    for (var i = 0; i < listCheckBox.length; i++) {
        var isChecked = listCheckBox[i].checked;
        if (isChecked == true) {
            countCheckboxChecked++;
        }
    }
    if (countCheckboxChecked > 50) {
        showAjaxReturnMessage(vrHTMLViewerRes["msgDownloadattchsLimit"] + "(" + countCheckboxChecked + ")", "w");
        return;
    }
    func.CheckIfFileExistBeforedownloadCart();
});
$("body").on("click", "#removeFromCart", function () {
    func.RemoveFromCart();
})
//notes
$("body").on("click", "#Noteid", function (e) {
    func.Getnotes();
});

$("body").on("click", "#delnote", function () {
    var id = parseInt($(this).find("input").val());
    var UserName = this.parentElement.childNodes[2].innerText;
    func.DeleteNote(id, UserName);
});

$("body").on("click", "#addNewRow", function () {
    var NoteDialog = $(pel.notedialog);
    //NoteDialog.find("tbody").html("");
    var todayDate = func.GenerateTimeAndDate();
    NoteDialog.find("tbody").prepend('<tr><td>' + todayDate + '</td><td><textarea id="changeNewNote" rows="2" cols="50"></textarea></td><td>' + func.userName + '</td><td id="deleteEmptyRow" style="cursor: pointer;" class="glyphicon glyphicon-trash"><input type="hidden" value="" /></td><tr>');
});

$("body").on("change", "#changeNewNote", function () {
    var elem = $(this);
    var text = elem.val();
    elem.parent().parent().remove();
    func.AddnewNote(text);
});
$("body").on("change", "#changeEditNote", function () {
    var elem = $(this);
    var text = elem.val();
    var id = elem.parent().parent().children()[3].firstElementChild.value;
    func.EditNote(text, id);
});

$("body").on("click", "#deleteEmptyRow", function () {
    var row = $(this).parent();
    var rm = row.remove();
});
//rename attachment
$('body').on("click", "#rename_doc_id", function () {
    var checkPermission = func.SecurePermissions("Edit");
    if (checkPermission == false) {
        showAjaxReturnMessage(vrHTMLViewerRes["msgRenameAttachmentPermission"], "w");
        return;
    }
    var dlg = $("#WriteRenameAttachmentName");    
    dlg.modal('show');
  
    //prevent comma entering to input
    var renameAttachment = document.getElementById("RenameAttachmentID");
    renameAttachment.value = "";
    renameAttachment.addEventListener("keydown", function (e) {
        if (e.keyCode == 188) {
            e.preventDefault();
        } 
    });
});



$("body").on("click", "#RenameAttachmentBtnOk", function () {
    var renameInput = $("#RenameAttachmentID").val();

    func.RenameAttachment(renameInput);
    $(DomElements.showFilenameTitle).html("<span style='color:#666666;font-size:15px; text-transform:capitalize'>" + vrHTMLViewerRes["msgJsCurrFileChangedFrom"] + " - </span><span style='color:rgb(0, 161, 225)'>" + func.CurrentFileFileName.split('-')[0] + "<span style='color:#666666;font-size:15px; text-transform:capitalize'> - " + vrHTMLViewerRes["msgJsCurrFileChangedTo"] + ": <span style='color:rgb(0, 161, 225)'>" + renameInput + "</span></span></span>");

});

//on checkbox checked
var countCheckboxes = 0;
$('body').on('click', DomElements.Listofcheckboxs, function () {
    var _this = this;
    if (_this.checked) {
        countCheckboxes++;
    } else {
        countCheckboxes--;
    }

    if (countCheckboxes != 0) {
        func.RemoveAttachmentfunc();
    } else {
        func.ShowAttachmentFunc();
    }
});











