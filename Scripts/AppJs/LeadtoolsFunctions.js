/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.js">
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Controls.js">
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.Automation.js">
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.Designers.js">
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.Core.js">
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.Documents.js">
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.JavaScript.js">
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.Rendering.JavaScript.js">
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Documents.js">
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Documents.UI.js">
/// <reference path="~/Content/themes/TAB/js/jQuery-2.1.3min.js">


//dictionaty Leadtools application;
//lt = object that direct to all leadtools libraries.
//TabLTApplication = class object for documents stracture.
//TabLTApplication.CheckLicense = check license in serviceConfig.json file in the run time.
//TabLTApplication.loadDocument = function call to load new document to the dom.
//TabLTApplication.viewPart = function to call zooming features on the dom.
//TabLTApplication.updateView = function that run on view changes

//start of classes
var elementHandler = "";
class TabLTApplication {
    constructor() {
        this.VirtualDocumentPages = [];
        this.checkLicense();
        this.isDocumentPlaced = false;
    }
    checkLicense() {
        lt.Documents.DocumentFactory.serviceHost = window.location.origin;
        lt.Documents.DocumentFactory.servicePath = "";
        lt.Documents.DocumentFactory.serviceApiPath = "api";


    }
    loadDocument(FilePath) {
        this.Dialog = new Dialogs();
        this.documentContainer = {
            imageViewerDiv: "#imageViewerDiv",
            thumbnailsTab: "#thumbnailsTab"
        };
        //this.filepath = $(this.documentContainer.filepath).val();

        $(this.documentContainer.imageViewerDiv).html("");
        $(this.documentContainer.thumbnailsTab).html("");
        this.createOptions = new lt.Documents.UI.DocumentViewerCreateOptions();
        this.createOptions.viewCreateOptions.useElements = false;
        this.createOptions.thumbnailsCreateOptions.useElements = false;
        this.createOptions.thumbnailsContainer = document.getElementById("thumbnailsTab");
        this.createOptions.viewContainer = document.getElementById("imageViewerDiv");

        this.documentViewer = lt.Documents.UI.DocumentViewerFactory.createDocumentViewer(this.createOptions);
        //this.documentViewer.view.imageViewer.enableRequestAnimationFrame = true;
        //this.documentViewer.view.lazyLoad = true;
        //this.documentViewer.thumbnails.lazyLoad = true;
        this.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactivePanZoom);
        this.documentViewer.view.preferredItemType = lt.Documents.UI.DocumentViewerItemType.svg;
        this.documentViewer.thumbnails.imageViewer.viewHorizontalAlignment = lt.Controls.ControlAlignment.center;
        //_this.documentViewer.thumbnails.imageViewer.imageBorderThickness = 2
        this.loadOption = new lt.Documents.LoadDocumentOptions();
        this.loadOption.maximumImagePixelSize = 2048;
        //this.documentViewer.view.imageViewer.enableRequestAnimationFrame = true;
        this.documentViewer.view.lazyLoad = true;
        this.documentViewer.thumbnails.lazyLoad = true;
        //create virtual document for scanner scenario;
        var createOptions = new lt.Documents.CreateDocumentOptions();
        var c = lt.Documents.DocumentFactory.create(createOptions);
        c.name = "VirtualDocument";
        return new Promise((resolve, reject) => {
            lt.Documents.DocumentFactory.loadFromUri(FilePath, this.loadOption)
                .done((document) => {
                    if (func.isScannig === true) {
                        var docPage = document.pages;
                        for (var i = 0; i < docPage.count; i++) {
                            var addPages = docPage.item(i);
                            this.VirtualDocumentPages.push(addPages);
                        }

                        for (var j = 0; j < this.VirtualDocumentPages.length; j++) {
                            c.pages.add(this.VirtualDocumentPages[j]);
                        }

                        VirtualDocObject = c.documents.document;
                        this.documentViewer.setDocument(VirtualDocObject);
                        this.isDocumentPlaced = true;
                        this.viewPart(this.documentViewer, this.Dialog);
                        this.updatePage(this.documentViewer, "");
                        func.RunSpliter(true);
                    } else if (func.isScannig === false) {
                        this.documentViewer.setDocument(document);
                        //this.viewPart(this.documentViewer, this.Dialog);
                        //conditions after doc object created if doc created then activate all functions;
                        if (this.documentViewer.hasDocument) {
                            this.isDocumentPlaced = true;
                            this.viewPart(this.documentViewer, this.Dialog);
                            this.updatePage(this.documentViewer, "");
                            func.RunSpliter(true);
                        }
                        resolve();
                    }

                })
                .fail(function (jqXHR, statusText, errorThrown) {
                    var serviceError = lt.Documents.ServiceError.parseError(jqXHR, statusText, errorThrown);
                    if (serviceError.detail.toLowerCase() == "Invalid file format".toLowerCase()) {
                        func.FirstClickAttachment(elementHandler, true, true);
                    } else {
                        lt.LTHelper.log(serviceError);
                        var lines = [];
                        lines.push("Document Viewer Error:");
                        lines.push(serviceError.message);
                        lines.push(serviceError.detail);
                        lines.push("See console for details.");
                        showAjaxReturnMessage(lines.join("\n"), "e");
                    }
                });
            //reject();
        });
    }
    viewPart(DocView, dialog) {
        var _this = this;
        this.headerToolbar_ViewMenu_click = {
            viewMenuItem: "#viewMenuItem",
            rotateCounterClockwiseMenuItem: "#rotateCounterClockwise",
            rotateClockwiseMenuItem: "#rotateClockwise",
            zoomOutMenuItem: "#zoomOut",
            zoomInMenuItem: "#zoomIn",
            actualSizeMenuItem: "#actualSize",
            fitMenuItem: "#fit",
            fitWidthMenuItem: "#fitWidth",
            fitHeightMenuItem: "#fitHeight",
            asImageMenuItem: "#viewAsImage",
            asSvgMenuItem: "#viewAsSVG",
            documentProperties: "#documentProperties",
            printDialog: "#print"
        };
        this.headerToolbar_PageMenu = {
            pageMenuItem: "#pageMenuItem",
            firstPageMenuItem: "#firstPage",
            previousPageMenuItem: "#previousPage",
            nextPageMenuItem: "#nextPage",
            lastPageMenuItem: "#lastPage",
            currentPageGetTextMenuItem: "#currentPageGetText",
            allPagesGetTextMenuItem: "#allPagesGetText",
            readPageBarcodesMenuItem: "#readPageBarcodes",
            readAllBarcodesMenuItem: "#readAllBarcodes",
            singlePageDisplayMenuItem: "#singlePageDisplay",
            doublePagesDisplayMenuItem: "#doublePagesDisplay",
            verticalPagesDisplayMenuItem: "#verticalPagesDisplay",
            horizontalPagesDisplayMenuItem: "#horizontalPagesDisplay"
        };
        // Shortcuts
        this.shortcuts = {
            zoomOutBtn: "#zoomOut_shortcut",
            zoomInBtn: "#zoomIn_shortcut",
            zoomValuesSelectElement: {
                SelectElement: "#zoomValues",
                currentZoomValueOption: "#currentZoomValue",
                customZoomValue: -1
            },
            actualSizeBtn: "#actualSize_shortcut",
            fitBtn: "#fit_shortcut",
            fitWidthBtn: "#fitWidth_shortcut"
        };
        this.shortcuts_page = {
            dividers: ".shortcutsbar>.verticalDivider",
            previousPageBtn: "#previousPage_shortcut",
            nextPageBtn: "#nextPage_shortcut",
            pageNumberTextInput: "#pageNumber",
            pageCountLabel: "#pageCount",
            singlePageDisplayBtn: "#singlePageDisplay_shortcut",
            doublePagesDisplayBtn: "#doublePagesDisplay_shortcut",
            verticalPagesDisplayBtn: "#verticalPagesDisplay_shortcut",
            horizontalPagesDisplayBtn: "#horizontalPagesDisplay_shortcut",
            processAllPagesBtn: "#processAllPages_shortcut",
            thumbnailsPage_Click: "#thumbnailsTab"
        };
        $(this.updateView(DocView, this, ""));

        //view functions
        /*paging*/
        //Thumbnails click
        $(this.shortcuts_page.thumbnailsPage_Click).on("click", function (e) {
            _this.updatePage(DocView, "ThumbnailsClick");
        });

        //nextPage
        $(this.shortcuts_page.nextPageBtn).on("click", function () {
            _this.updatePage(DocView, "nextPage");
        });
        //previousPage
        $(this.shortcuts_page.previousPageBtn).on("click", function () {
            _this.updatePage(DocView, "previousPage");
        });

        //enterPage
        $(this.shortcuts_page.pageNumberTextInput).on("keypress", function (e) {
            var value = $(this).val();
            if (e.keyCode === 13) {
                if (value <= DocView.pageCount && value > 0) {
                    DocView.gotoPage(value);
                } else {
                    //alert("Page not found");
                    showAjaxReturnMessage(vrHTMLViewerRes["msgJsPageNotFound"], "e");
                }
            }
        });
        /*End paging*/

        var txtName = "";
        //fitAlways
        $(this.headerToolbar_ViewMenu_click.fitMenuItem).on("click", function () {
            DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.fitAlways, 1, DocView.view.imageViewer.defaultZoomOrigin);
            txtName = $(this).text();
            _this.updateView(DocView, _this, txtName);
        });
        //ActualSize
        $(this.headerToolbar_ViewMenu_click.actualSizeMenuItem).on("click", function () {
            DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.actualSize, 1, DocView.view.imageViewer.defaultZoomOrigin);
            txtName = $(this).text();
            _this.updateView(DocView, _this, txtName);
        });
        //fitWidth
        $(this.headerToolbar_ViewMenu_click.fitWidthMenuItem).on("click", function () {
            DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.fitWidth, 1, DocView.view.imageViewer.defaultZoomOrigin)
            txtName = $(this).text();
            _this.updateView(DocView, _this, txtName);
        });
        //fitHeight
        $(this.headerToolbar_ViewMenu_click.fitHeightMenuItem).on("click", function () {
            DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.fitHeight, 1, DocView.view.imageViewer.defaultZoomOrigin)
            txtName = $(this).text();
            _this.updateView(DocView, _this, txtName);
        });

        //zoomIn
        $(this.headerToolbar_ViewMenu_click.zoomInMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewZoomIn)
            _this.updateView(DocView, _this, "");
        });
        //zoomOut
        $(this.headerToolbar_ViewMenu_click.zoomOutMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewZoomOut);
            _this.updateView(DocView, _this, "");
        });
        //rotateCounterClockwise
        $(this.headerToolbar_ViewMenu_click.rotateCounterClockwiseMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewRotateCounterClockwise);
        });
        //
        //rotateClockwiseMenuItem
        $(this.headerToolbar_ViewMenu_click.rotateClockwiseMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewRotateClockwise);
        });

        //singlePageDisplayMenuItem
        $(this.headerToolbar_PageMenu.singlePageDisplayMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.layoutSingle);
        });

        //doublePagesDisplayMenuItem
        $(this.headerToolbar_PageMenu.doublePagesDisplayMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.layoutDouble);
        });

        //verticalPagesDisplayMenuItem
        $(this.headerToolbar_PageMenu.verticalPagesDisplayMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.layoutVertical);
        });

        //horizontalPagesDisplayMenuItem
        $(this.headerToolbar_PageMenu.horizontalPagesDisplayMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.layoutHorizontal);
        });

        //zoom_shortcut dropdown
        $(this.shortcuts.zoomValuesSelectElement.SelectElement).on("change", function () {
            var text = $(this).val();
            switch (text) {
                case "Actual Size":
                    DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.actualSize, 1, DocView.view.imageViewer.defaultZoomOrigin);
                    break;
                case "Fit Page":
                    DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.fitAlways, 1, DocView.view.imageViewer.defaultZoomOrigin);
                    break;
                case "Fit Width":
                    DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.fitWidth, 1, DocView.view.imageViewer.defaultZoomOrigin);
                    break;
                case "Fit Height":
                    DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.fitHeight, 1, DocView.view.imageViewer.defaultZoomOrigin);
                    break;
                default:
                    if (text !== null && text !== "") {
                        var percentage = parseFloat(text.substring(0, text.length - 1));
                        DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.none, percentage / 100, DocView.view.imageViewer.defaultZoomOrigin);
                    }
                    break;
            }
        });

        $(this.shortcuts.zoomInBtn).on("click", function (e) {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewZoomIn);
            _this.updateView(DocView, _this, "");
        });

        $(this.shortcuts.zoomOutBtn).on("click", function (e) {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewZoomOut)
            _this.updateView(DocView, _this, "");
        });

        //Init dialogs
        //documents property
        $(this.headerToolbar_ViewMenu_click.documentProperties).on("click", function (e) {
            dialog.documentProperties_Dialog(DocView.document);
        });
        //pringing dialog
        $(this.headerToolbar_ViewMenu_click.printDialog).on("click", function (e) {
            if (func.SecurePermissions("Print") == false) {
                showAjaxReturnMessage(vrHTMLViewerRes["msgJsPrintAttachmentPermission"], "w");
                return;
            }
            e.preventDefault();
            dialog.PrintDocument_Dialog(DocView);
        });
    }
    updateView(DocView, elements, txtName) {
        if (DocView.hasDocument) {
            var percentage = DocView.view.imageViewer.scaleFactor * 100.0;
            if (elements.shortcuts.zoomValuesSelectElement.customZoomValue !== percentage) {
                elements.shortcuts.zoomValuesSelectElement.customZoomValue = percentage;
                $(elements.shortcuts.zoomValuesSelectElement.currentZoomValueOption).text(percentage.toFixed(1) + "%");
                // Select the currentZoomValueOption
                switch (txtName) {
                    case "Actual Size":
                        $(elements.shortcuts.zoomValuesSelectElement.SelectElement).prop("selectedIndex", 14);
                        break;
                    case "Fit":
                        $(elements.shortcuts.zoomValuesSelectElement.SelectElement).prop("selectedIndex", 15);
                        break;
                    case "Fit Width":
                        $(elements.shortcuts.zoomValuesSelectElement.SelectElement).prop("selectedIndex", 16);
                        break;
                    case "Fit Height":
                        $(elements.shortcuts.zoomValuesSelectElement.SelectElement).prop("selectedIndex", 17);
                        break;
                    default:
                        $(elements.shortcuts.zoomValuesSelectElement.SelectElement).prop("selectedIndex", 0);
                        break;
                }
            }
        }
        else {
            this._customZoomValue = -1;
            $(elements.shortcuts.zoomValuesSelectElement.currentZoomValueOption).text("");
            // Select the currentZoomValueOption 
            $(elements.shortcuts.zoomValuesSelectElement.SelectElement).prop("selectedIndex", 0);
        }
    }
    updatePage(DocView, txtName) {
        this.shortcuts_page = {
            dividers: ".shortcutsbar>.verticalDivider",
            previousPageBtn: "#previousPage_shortcut",
            nextPageBtn: "#nextPage_shortcut",
            pageNumberTextInput: "#pageNumber",
            pageCountLabel: "#pageCount",
            singlePageDisplayBtn: "#singlePageDisplay_shortcut",
            doublePagesDisplayBtn: "#doublePagesDisplay_shortcut",
            verticalPagesDisplayBtn: "#verticalPagesDisplay_shortcut",
            horizontalPagesDisplayBtn: "#horizontalPagesDisplay_shortcut",
            processAllPagesBtn: "#processAllPages_shortcut",
            thumbnailsPage_Click: "#thumbnailsTab"
        };
        var pageNumber = $(this.shortcuts_page.pageNumberTextInput).val(DocView.currentPageNumber);
        var PageCount = DocView.pageCount;
        var CurrentNumber = DocView.currentPageNumber;
        $(this.shortcuts_page.pageCountLabel).text("/ " + DocView.pageCount);

        switch (txtName) {
            case "ThumbnailsClick":
                //pageNumber.val(CurrentNumber);
                if (CurrentNumber === 1) {
                    $(this.shortcuts_page.previousPageBtn).attr("disabled", true);
                } else {
                    $(this.shortcuts_page.previousPageBtn).attr("disabled", false);
                }
                if (CurrentNumber === PageCount) {
                    $(this.shortcuts_page.nextPageBtn).attr("disabled", true);
                } else {
                    $(this.shortcuts_page.nextPageBtn).attr("disabled", false);
                }
                break;
            case "nextPage":
                var pageUp = CurrentNumber + 1;
                if (pageUp < PageCount) {
                    $(this.shortcuts_page.previousPageBtn).attr("disabled", false);
                    pageNumber.val(pageUp);
                    DocView.gotoPage(pageUp);
                } else if (pageUp === PageCount) {
                    $(this.shortcuts_page.nextPageBtn).attr("disabled", true);
                    $(this.shortcuts_page.previousPageBtn).attr("disabled", false);
                    pageNumber.val(pageUp);
                    DocView.gotoPage(pageUp);
                }
                break;
            case "previousPage":
                var pageDown = CurrentNumber - 1;
                if (pageDown > 0) {
                    $(this.shortcuts_page.previousPageBtn).attr("disabled", false);
                    $(this.shortcuts_page.nextPageBtn).attr("disabled", false);
                    pageNumber.val(pageDown);
                    DocView.gotoPage(pageDown);
                } else {
                    $(this.shortcuts_page.previousPageBtn).attr("disabled", true);
                }
                break;
            default:
                break;

        }
    }
    LoadFromCache(funcall, formdata) {
        var Dialog = new Dialogs();
        var _this = this;
        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        return new Promise((resolve, reject) => {
            ajaxOptions.url = "/DocumentViewer/IsfileCreatedInDesktop";
            //ajaxOptions.enctype = 'multipart/form-data';
            ajaxOptions.type = "POST";
            ajaxOptions.dataType = "json";
            ajaxOptions.contentType = false;
            ajaxOptions.processData = false;
            ajaxOptions.data = formdata;
            $.ajax(ajaxOptions).done(function (data) {
                if (data.pageCount > 1) {
                    lt.Documents.DocumentFactory.loadFromCache(data.documentid)
                        .done(function (doc) {
                            $("#imageViewerDiv").html("");
                            $("#thumbnailsTab").html("");
                            _this.createOptions = new lt.Documents.UI.DocumentViewerCreateOptions();
                            _this.createOptions.viewCreateOptions.useElements = false;
                            _this.createOptions.thumbnailsCreateOptions.useElements = false;
                            _this.createOptions.thumbnailsContainer = document.getElementById("thumbnailsTab");
                            _this.createOptions.viewContainer = document.getElementById("imageViewerDiv");
                            _this.documentViewer = lt.Documents.UI.DocumentViewerFactory.createDocumentViewer(_this.createOptions);
                            _this.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactivePanZoom);
                            _this.documentViewer.view.preferredItemType = lt.Documents.UI.DocumentViewerItemType.svg;
                            _this.documentViewer.thumbnails.imageViewer.viewHorizontalAlignment = lt.Controls.ControlAlignment.center;
                            _this.loadOption = new lt.Documents.LoadDocumentOptions();
                            _this.loadOption.maximumImagePixelSize = 2048;
                            _this.documentViewer.view.lazyLoad = true;
                            _this.documentViewer.thumbnails.lazyLoad = true;
                            _this.documentViewer.setDocument(doc);
                            _this.updatePage(_this.documentViewer, "");
                            _this.viewPart(_this.documentViewer, Dialog);
                        }).fail(function (jqXHR, statusText, errorThrown) {

                        });
                } else {
                    leadtools.loadDocument(funcall.FilePath).then(function () {
                        funcall.CheckCallFromSearchGrid();
                    });
                }
                resolve();
            }).fail(function (jqXHR, textStatus) {
                alert(jqXHR);
                alert(textStatus);
                reject();
            });
        });
    }
}


const pel = {
    thumbnailDiv: "#thumbnailsTab",
    attachListDiv: "#attachmentsList",
    versionsListDiv: "#versionsList",
    thumnailBtn: "#thumbnailsTabBtn",
    attachmentBtn: "#attachmentBtn",
    versionBtn: "#versionBtn",
    AttachmentList: "#attachmentsList li",
    versionsList: "#versionsList a",
    DltAttachmentId: "#DltAttachmentId",
    AddVersionId: "#AddVersionId",
    RenameAttachmentId: "#RenameAttachmentId",
    cartListClick: "#cartList_Id",
    cartListdialog: "#cartList_dialog",
    splitter: ".splitter",
    notedialog: "#Notelist_dialog"

};
var DomElements = {
    CheckoutFile: "#checkOutFile_id",
    checkOutFileDiv: "#checkOutFileDiv_id",
    checkOutbuttonClick: "#checkOutFile_id",
    AddpageId: "#addpage_id",
    addpageFromFile: "#addpageFromFile_id",
    deletePageid: "#deletePage_id",
    SaveTopdf: "#SaveTopdf_id",
    checkoutbuttonDiv: "#checkoutbutton_div_id",
    attachmentDivButton: "#attachmentDivButton_id",
    ifCheckboxcheckedDiv: "#ifCheckboxcheckedDiv_id",
    Listofcheckboxs: "#attachmentsList ul li span input",
    deleteFiles: "#delete_files_id",
    showFilenameTitle: "#showFilename_id",
    cancelCheckout: "#cancelCheckout_id",
    ConfirmDeleteAttachmentDialog: "#ConfirmDeleteAttachmentDialog_id",
    DeleteAttachmentLabel: "#DeleteAttachmentLabelID",
    DeleteAttachmentList: "#DeleteAttachmentList",
    AddVersiontoAttachment: "#AddVersion_Id",
    OcrDialogbox: "#TextDialogid",
    progDlg: "#ProgressloadingDialog",
    Bar: "#progressbar",
    barLeft: ".progress-left .progress-bar",
    barRight: ".progress-right .progress-bar",
    percentage: "#progressPercentage",
    cancelProgress: "#cancel_progress",
    RunSpinningWheel: "#spinningWheel",
    GetScansourcesDialog: "#GetScansources_id",
    OcrdivButton: "#ocrDivButton_id",
    saveScanNewAttachmentOption: "#saveScanNewAttachment_options",
    removePageFromscan: "#removePageFromscan_id",
    OCRtxtSearch_id: "#txtSearch_id",
    noteidDiv: "#noteid_Div",
    scanneridDiv: "#scannerid_Div",
    removePageFromscanDiv: "#removePageFromscan_idDiv",
    DivCustomSearch1: "#divCustomSearch1"

};

//detect browswer
var CurrentCheckout = false;
var sBrowser = navigator.userAgent;
var VirtualDocumentPages = [];
var VirtualDocObject;
var scanningService;
var isScanServicerunning = false;
class FunctionsCall {
    constructor() {
        this.Attachmentformats = { TIF: 1, PDF: 2 };
        this.downloadFilesList = [];
        this.attachmentArray = [];
        this.documentNumber = -1;
        this.HasAnnotation = 0;
        this.documentKey = $("#documentKey").val();
        this.versionNumber = -1;
        this.RecordType = "";
        this.isCheckout = -1;
        this.ischeckOutToMe = -1;
        this.isCheckoutDesktop = -1;
        this.FilePath = "";
        this.pageNumber = -1;
        this.documentNumberClick = $("#documentNumberClick").val();
        this.TurnMagnifyGlassOnOff = false;
        this.OcrOn_Off = true;
        this.MagnifyOn_Off = true;
        this.UploadfileSize = 0;
        this.ajaxCall;
        this.cancelUpload = false;
        this.StartcircleSpiner = false;
        this.indexScan = 0;
        this.LastCountscan = 0;
        this.isScannig = false;
        this.CallFromDragDrop = false;
        this.Storefile = "";
        this.getPagesArray = true;
        this.pagesArrayList;
        this.onSearchChang = "";
        this.pointerID = "";
        this.NoteCount = 0;
        this.userName = $.cookie("lastUsername");
        this.userDisplayName = $.cookie("lastUsername");
        this.TodayDate = "";
        this.CurrentFileFileName = "";
        this.recordId = $("#recordId").val();
        this.crumbName = $("#crumbName").val();
        this.trackingId = "";
        this.Prvprop = {};
        this.AccessProp = "";
        this.previousList = [];
        this.TableName = "";
        this.TableId = "";
        this.viewId = "";
    }
    RunstartupPartialView(ActiveFunc = false) {
        /*initiate the first must functions in the dom*/
        if (ActiveFunc == false) { return }
        var _this = this;
        //check if there is attachment on the dom
        if (leadtools.isDocumentPlaced == false) {
            $(DomElements.noteidDiv).hide();
        }
        _this.CheckboxChecked();
        _this.GetResizable();
        //check if there are attachments in the list
        var Attachment = $("#attachmentsList li");
        if (Attachment.length < 1) {
            $("#optional_menu_doc").hide();
            $(DomElements.checkOutFileDiv).hide();
            leadtools.isDocumentPlaced = false;
        }
    }
    Runstartup(ActiveFunc = false) {
        //scanner call from grid
        var _this = this;
        //set up viewid for checking download permission later
        //scenario when user access to attachviewer on clicking the clips of scanner.
        _this.viewId = localStorage.getItem("viewId");

        var isScannerCall = localStorage.getItem("callFromScanner");
        if (isScannerCall == 1) {
            localStorage.setItem("callFromScanner", 0);
            $("#ScanNew_id").trigger("click");
            return;
        }

        var _this = this;
        if (ActiveFunc == false) { return }
        //get the first attachment to show
        var AttachSelected = $("#attachmentsList a");
        for (var i = 0; i < AttachSelected.length; i++) {
            var sAttach = AttachSelected[i].parentElement.childNodes[2].value;
            if (sAttach == _this.documentNumberClick) {
                _this.FirstClickAttachment(AttachSelected[i], true, false);
                return;
            }
        }
    }
    RunSpliter(ActiveFunc) {
        /*spliter will make the thumbnails responsive*/
        if (ActiveFunc == false) { return }
        //resize thumbnails 
        $("#spliter_id").on("mousedown", function (e) {
            console.log("mousedown");
        }).on('mouseup', function () {
            console.log("mouseup");
            leadtools.documentViewer.setDocument(leadtools.documentViewer.document);
            leadtools.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactivePanZoom);
        });
    }
    //on click row show file on viewer
    FirstClickAttachment(_thisElem, ActiveFunc = false, isErrorInvalidFormat) {
        var _this = this;
        elementHandler = _thisElem;
        if (ActiveFunc == false) { return; }
        //reset Ocr icon color
        //$("#spinningWheel").show();
        $("#OcrcallId").css("backgroundColor", "");
        //if ($("#checkOutFileDiv_id").find("i").hasClass("fa-unlock")) return alert("checkin your document or undo checkin to move to another attachment");
        if (CurrentCheckout === true) {
            showAjaxReturnMessage(vrHTMLViewerRes["msgJsCheckInOrMove"], "w");
            return;
        } else {
            CurrentCheckout = false;
        }
        var lstofattachment = $("#attachmentsList li").css("background-color", "");
        $(_thisElem).parent().css("background-color", "LightCyan");
        //activate and show pages container
        $(pel.thumnailBtn).trigger('click');
        try {
            leadtools.documentViewer.setDocument(null);
        } catch (e) {
            console.log("Developer message" + e.message + " ignore this error as we build the leadtools controllers on the first click of attachment and the click comes before the creation. ");
        }
        //setup the file in the dom
        const notfound = _thisElem.href.substring(_thisElem.href.lastIndexOf("/") + 1);
        if (notfound == "NF") {
            _this.NoFilefound(_thisElem);
        } else if (isErrorInvalidFormat){
            _this.InvalidFormatErrorHandler(_thisElem);
        } else {
            this.FilePath = FilePath;
            func.OnclickAttachment(true, _thisElem);
        }
        //clear ocr search text
        $(DomElements.OCRtxtSearch_id).val("");
        //hide extra buttons if exist
        $(DomElements.ifCheckboxcheckedDiv).hide();
        //clear checkboxs on new attachment select
        var chkboxes = $(DomElements.Listofcheckboxs);
        for (var i = 0; i < chkboxes.length; i++) {
            chkboxes[i].checked = false;
        }
        $("#CheckAll_id").text(vrHTMLViewerRes["lblmnuIndexCheckAll"]);
    }
    InvalidFormatErrorHandler(_thisElem) {
         var _this = this;
        _this.trackingId = _thisElem.parentElement.childNodes[8].value;
        _this.pointerID = _thisElem.parentElement.childNodes[7].value;
        _this.NoteCount = _thisElem.parentElement.childNodes[6].value;
        _this.RecordType = _thisElem.parentElement.childNodes[5].value;
        _this.pageNumber = _thisElem.parentElement.childNodes[4].value;
        _this.documentNumber = parseInt(_thisElem.parentElement.childNodes[2].value);
        _this.versionNumber = parseInt(_thisElem.parentElement.childNodes[3].value);
        //_this.FilePath = _thisElem.href;
        leadtools.loadDocument(window.location.origin + "/resources/images/InvalidFormat.PNG");
        _this.CheckCallFromSearchGrid();
        $("#showFilename_id").show();
        $("#showFilename_id").html("<span style='color:#666666;font-size: 15px; text-transform: capitalize'>" + _this.crumbName + "|" + _this.recordId + "</span><br><span color:#666666;font-size: 15px;'>" + vrHTMLViewerRes["lblCurrentAttachment"] + " - </span><span>" + vrHTMLViewerRes["lblAttachmentInvalidFormatErr"] + "</span><input type='hidden' value='' />");
    }
    NoFilefound() {
        var _this = this;
        _this.trackingId = _thisElem.parentElement.childNodes[8].value;
        _this.pointerID = _thisElem.parentElement.childNodes[7].value;
        _this.NoteCount = _thisElem.parentElement.childNodes[6].value;
        _this.RecordType = _thisElem.parentElement.childNodes[5].value;
        _this.pageNumber = _thisElem.parentElement.childNodes[4].value;
        _this.documentNumber = parseInt(_thisElem.parentElement.childNodes[2].value);
        _this.versionNumber = parseInt(_thisElem.parentElement.childNodes[3].value);
        //_this.FilePath = _thisElem.href;
        leadtools.loadDocument(window.location.origin + "/resources/images/invalid.png");
        _this.CheckCallFromSearchGrid();
        $("#showFilename_id").show();
        $("#showFilename_id").html("<span style='color:#666666;font-size: 15px; text-transform: capitalize'>" + _this.crumbName + "|" + _this.recordId + "</span><br><span color:#666666;font-size: 15px;'>" + vrHTMLViewerRes["lblCurrentAttachment"] + " - </span><span>" + vrHTMLViewerRes["lblAttachmentNotFound"] + "</span><input type='hidden' value='' />");
    }
    OnclickAttachment(ActiveFunc = false, _thisElem) {
        var _this = this;
        if (ActiveFunc == false) return;

        //setup properties and title
        _this.OnclickAttachmentSetupProperties(true, _thisElem);
        //setup if checkout or checkin
        _this.OnclickAttachmentCheckPermissionAndCheckout(true, _thisElem);
        //allow menu options for attachment.
        $("#optional_menu_doc").show();
        //check if user request find text through search in grid if yes search the word
    }
    OnclickAttachmentSetupProperties(ActiveFunc = false, _thisElem) {
        var _this = this;
        _this.AccessProp = _thisElem;
        if (ActiveFunc == false) return;
        _this.HasAnnotation = _thisElem.parentElement.childNodes[9].value;
        _this.trackingId = _thisElem.parentElement.childNodes[8].value;
        _this.pointerID = _thisElem.parentElement.childNodes[7].value;
        _this.NoteCount = parseInt(_thisElem.parentElement.childNodes[6].value);
        _this.RecordType = _thisElem.parentElement.childNodes[5].value;
        _this.pageNumber = _thisElem.parentElement.childNodes[4].value;
        _this.documentNumber = parseInt(_thisElem.parentElement.childNodes[2].value);
        _this.versionNumber = parseInt(_thisElem.parentElement.childNodes[3].value);
        _this.FilePath = _thisElem.href.split("DocumentViewer/")[1];
        _this.MagnifyOn_Off = true;
        _this.OcrOn_Off = true;
        _this.CurrentFileFileName = $(_thisElem).text();
        //var countRecordId = _this.recordId.length;
        //if (countRecordId == 30) {
        // _this.recordId = parseInt(_this.recordId);
        //} else {
        //_this.recordId;
        //}
        $("#showFilename_id").show();
        $("#showFilename_id").html("<span style='color:#666666;font-size: 15px; text-transform: capitalize'>" + _this.crumbName + "|" + _this.recordId + "</span><br><span style='color:#666666;font-size: 15px;text-transform: capitalize''>" + vrHTMLViewerRes["lblCurrentAttachment"] + " - </span><span style='color:rgb(0, 161, 225)'>" + _this.CurrentFileFileName + "</span><input type='hidden' value='" + this.documentNumber + "' />");
    }
    OnclickAttachmentCheckPermissionAndCheckout(ActiveFunc = false) {
        var _this = this;
        if (ActiveFunc === false) return;
        //show note button for every attachment
        $(DomElements.noteidDiv).show();
        //get two values 1. ischeckout 2. ischeckouttome
        _this.GetIscheckOutNcheckOutToMeProps(true);
        //valide if user have permission on attachment level.
        //_this.HasAttachEditPermission = _this.ValidAttachmentPermission("Edit")
        var CheckEditPermissions = _this.SecurePermissions("Edit");
        //conditions for pc files
        if (_this.RecordType == 5) {
            _this.RunPcFiles(CheckEditPermissions);
        }

        //conditions for image files
        if (_this.RecordType == 1) {
            _this.RunImageFiles(CheckEditPermissions);
        }
    }
    RunPcFiles(CheckEditPermissions) {
        var _this = this;
        if (CheckEditPermissions === true && _this.isCheckout == 0) {
            $(DomElements.AddVersiontoAttachment).show();
            $(DomElements.checkOutFileDiv).show();
        } else if (CheckEditPermissions == true && _this.isCheckoutTome > 0) {
            $(DomElements.AddVersiontoAttachment).show();
        } else {
            //$(DomElements.AddVersiontoAttachment).hide();
        }
        $(DomElements.checkOutFileDiv).hide();
        leadtools.loadDocument(_this.FilePath).then(function () {
            _this.CheckCallFromSearchGrid();
        });
        //check if file has note;
        var note = document.getElementById("Noteid");
        if (_this.NoteCount > 0) {
            note.style.backgroundColor = "greenyellow";
        } else {
            note.style.backgroundColor = "white";
        }

        //always show search bar for pc files as they never contain annotation
        $(DomElements.DivCustomSearch1).show();
        $(DomElements.OcrdivButton).show();
    }
    RunImageFiles(CheckEditPermissions) {
        var _this = this;
        if (_this.ischeckOutToMe > 0 && _this.isCheckoutDesktop === 0) {
            _this.CancelcheckoutServerside(true);
            //window.location.reload();
        }
        var notebtn = document.getElementById("Noteid");
        //var checkinBtn = document.getElementById("checkOutFile_id");
        if (CheckEditPermissions === true && _this.isCheckout === 0 && _this.isCheckoutDesktop === 0) {
            $(DomElements.checkOutFileDiv).show();
            $(DomElements.checkOutbuttonClick).prop("disabled", false);
            $(DomElements.CheckoutFile).find("i").removeClass("fa-unlock");
            $(DomElements.CheckoutFile).find("i").addClass("fa-lock");
            //_this.StartCreartingVirtualDocument();
            $(DomElements.AddVersiontoAttachment).show();
        } else if (CheckEditPermissions) {
            $(DomElements.checkOutFileDiv).show();
            $(DomElements.checkOutbuttonClick).prop("disabled", true);
            $(DomElements.CheckoutFile).find("i").removeClass("fa-lock");
            $(DomElements.CheckoutFile).find("i").addClass("fa-unlock");
            if (_this.isCheckout > 0 && _this.ischeckOutToMe === 0) {
                $(DomElements.checkOutbuttonClick).prop('title', vrHTMLViewerRes["titleCheckoutByanotherUser"]);
            } else if (_this.isCheckoutDesktop > 0 && _this.ischeckOutToMe > 0) {
                $(DomElements.checkOutbuttonClick).prop('title', vrHTMLViewerRes["tltleYouCheckoutFromDesktop"]);
            }

            $(DomElements.checkoutbuttonDiv).hide();
            $(DomElements.attachmentDivButton).show();
            //$(DomElements.AddVersiontoAttachment).hide();
        }

        //check note
        if (_this.NoteCount >= 1) {
            notebtn.style.backgroundColor = "greenyellow";
        } else {
            notebtn.style.backgroundColor = "white";
        }
        //check annotation
        if (_this.HasAnnotation >= 1) {
            leadtools.loadDocument(window.location.origin + "/resources/images/HasAnnotations.png");
            notebtn.disabled = true;
            //checkinBtn.disabled = true;
            $(DomElements.DivCustomSearch1).hide();
            $(DomElements.OcrdivButton).hide();

        } else {
            //check if image file create in desktop
            _this.CheckIfImageBuiltInDesktop();
            notebtn.disabled = false;
            //checkinBtn.disabled = false;
            $(DomElements.DivCustomSearch1).show();
            $(DomElements.OcrdivButton).show();
        }
    }
    CheckIfImageBuiltInDesktop() {
        var _this = this;
        var formdata = new FormData();
        formdata.append('variables', _this.documentKey);
        formdata.append('variables', _this.documentNumber);
        formdata.append('variables', _this.versionNumber);

        leadtools.LoadFromCache(_this, formdata).then(function () {
            leadtools.isDocumentPlaced = true;
        });
    }
    //add attachment
    UploadAttachment(ActiveFunc = false, files) {
        /*upload file from local location 
        handle two conditions for one file and multiples file*/
        var _this = this;
        _this.GetIscheckOutNcheckOutToMeProps(true);
        if (_this.isCheckout > 0 && CurrentCheckout === true) {
            showAjaxReturnMessage(vrHTMLViewerRes["msgJsCantAddFileInCheckOut"], "w");
            return;
        }
        var format;
        if (ActiveFunc == false) return;
        if (files.length == 1) {
            format = files[0].name.toString();
            format = format.split(".");
            var cFileFormat = _this.IsSupportedFile(format[format.length - 1]);
            var renameOnScan = $('#renameOnScan').val();
            if (cFileFormat) {
                $('#AttachmentID').val("");
                if (renameOnScan != 'False') {
                    $('#WriteAttachmentName').modal('show');
                } else {
                    $('#BtnRename').trigger('click');
                }
            } else {
                var fileFormat = "<span style='color:red;'>" + format[1] + "</span>";
                //$("#Messages_short_Id").find("label").html("The file format <span style='color:red;'>" + format[1] + "</span>  is not supported");
                $("#Messages_short_Id").find("label").html(String.format(vrHTMLViewerRes["msgJsFileFormatNotSupported"], fileFormat));
                $("#Messages_short_Id").modal('show');
                document.getElementById("FileUploadForAttach").value = "";
                //showAjaxReturnMessageDViewer(vrClientsRes["msgDocViewerInvalidFileFormat"], 'w');
            }
        } else {
            var NewFiles = $("#FileUploadForAttach").get(0).files;
            _this.AddmultipleFiles(NewFiles);
            document.getElementById("FileUploadForAttach").value = "";
            //$('#UploadAttachmentId').trigger('click');
        }
    }
    AddAttachment(ActiveFunc = false, getfile) {
        var _this = this;
        /*add single attachment and send send it to the save method*/
        $('#WriteAttachmentName').modal('hide');
        //var _this = this;
        if (ActiveFunc == false) return;
        if (changeFileNameField == "") {
            //alert("Please enter file name");
            showAjaxReturnMessage(vrHTMLViewerRes["msgJsEnterFileName"], "w");
            return;
        }
        var queryString = $("#documentKey").val();
        var NewFile = getfile;
        //get file size
        //_this.UploadfileSize = _this.CalculateFileSize(NewFile[0].size)
        //$(DomElements.progDlg).find('label').text("File Size: " + _this.UploadfileSize)

        var changeFileNameField = $("#AttachmentID").val();

        var formdata = new FormData();
        formdata.append(NewFile[0].name, NewFile[0]);
        //get querystring key and file name change
        var variables = [queryString, changeFileNameField];
        for (var i = 0; i < variables.length; i++) {
            formdata.append('getVariable', variables[i]);
        }
        _this.SaveAttachmentAfterAdd(true, formdata);

    }
    SaveAttachmentAfterAdd(ActiveFunc = false, formdata) {
        /*save to the database and hard drive 
        then return the file and show it on the dom*/
        var _this = this;
        if (ActiveFunc == false) return;
        var ajaxOptions = {};
        ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/BtnOkClickAddFileWithName";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "html";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        ajaxOptions.xhr = function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.onprogress = function (e) {
                //if (e.lengthComputable) {

                //}
            },
                xhr.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        var prec = Math.floor((e.loaded / e.total) * 100);
                        var total = _this.CalculateFileSize(e.total);
                        var loaded = _this.CalculateFileSize(e.loaded);
                        var mbleft = parseInt(total - loaded);
                        _this.StartingProgressBar(prec, mbleft, total, e.total);
                    }
                };
            return xhr;
        };

        _this.ajaxCall = $.ajax(ajaxOptions).done(function (data) {
            //return partial view

            _this.dataReturn = data;
            $("#docviewerPartial_ID").html(data);
            $("#attachmentsList a").last().trigger("click");
            //hide dialog box
            $('#WriteAttachmentName').modal('hide');
            //clear file element
            document.getElementById("FileUploadForAttach").value = "";
            //click on the new file
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR);
            alert(textStatus);
        });
    }
    AddmultipleFiles(NewFiles) {
        /*in case user upload more than one file this method will initiate and 
        save multiple files on database and hard-drive*/
        var _this = this;
        var queryString = $("#documentKey").val();
        var changeFileNameField = $("#AttachmentID").val();
        //save multiple files
        var formdata = new FormData();
        formdata.append('Keydocument', queryString);

        //get list of files and check if support file format
        for (var i = 0; i < NewFiles.length; i++) {
            var CheckFormat = NewFiles[i].name.toString();
            CheckFormat = CheckFormat.split(".");
            var cFileFormat = _this.IsSupportedFile(CheckFormat[CheckFormat.length - 1]);
            if (cFileFormat) {
                formdata.append(NewFiles[i].name, NewFiles[i]);
            } else {
                var fileFormat = "<span style='color:red;'>" + CheckFormat[1] + "</span>"
                //$("#Messages_short_Id").find("label").html("The file format <span style='color:red;'>" + CheckFormat[1] + "</span>  is not supported");
                $("#Messages_short_Id").find("label").html(String.format(vrHTMLViewerRes["msgJsFileFormatNotSupported"], fileFormat));
                $("#Messages_short_Id").modal('show');
                return;
            }

        }
        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/AddMultipleAttachments";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "html";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        ajaxOptions.xhr = function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.onprogress = function (e) {
                //if (e.lengthComputable) {

                //}
            }
            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    var prec = Math.floor((e.loaded / e.total) * 100);
                    var total = _this.CalculateFileSize(e.total);
                    var loaded = _this.CalculateFileSize(e.loaded);
                    var mbleft = parseInt(total - loaded);
                    _this.StartingProgressBar(prec, mbleft, total, e.total);
                }
            }
            return xhr;
        }
        _this.ajaxCall = $.ajax(ajaxOptions).done(function (data) {
            //clear files from element
            document.getElementById("FileUploadForAttach").value = "";
            //bind partial view into the dom
            $("#docviewerPartial_ID").html(data);
            _this.RemoveAttachmentfunc('AllAttachments');
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR);
            alert(textStatus);
        });
    }
    //remove attachment functionality if no attachment place in the dom
    RemoveAttachmentfunc(funCall) {
        $(DomElements.noteidDiv).hide();
        $(DomElements.DivCustomSearch1).hide();
        $(DomElements.checkOutFileDiv).hide();
        //shaow messages.
        switch (funCall) {
            case 'AllAttachments':
                $("#showFilename_id").show();
                $("#showFilename_id").html('<p style="color:rgb(0, 161, 225)">' + vrHTMLViewerRes['msgJselectAttachmentFromPane'] + '</p>');
                break;
            default:
        }
    }
    ShowAttachmentFunc() {
        $(DomElements.noteidDiv).show();
        $(DomElements.checkOutFileDiv).show();
        $(DomElements.DivCustomSearch1).show();
        $(DomElements.checkOutFileDiv).show();

    }
    //End add attachment
    //add versions
    Uploadversions(ActiveFunc = false, _thisElem) {
        var _this = this;
        var attachNumber = _this.documentNumber;
        var queryString = $("#documentKey").val();
        var NewFileVersion = $("#FileUploadVersion_id").get(0).files;
        //save multiple files
        var formdata = new FormData();
        formdata.append('getvalues', queryString);
        formdata.append('getvalues', attachNumber);

        //get list of files and check if support file format
        for (var i = 0; i < NewFileVersion.length; i++) {
            var CheckFormat = NewFileVersion[i].name.toString();
            CheckFormat = CheckFormat.split(".");
            var cFileFormat = _this.IsSupportedFile(CheckFormat[CheckFormat.length - 1]);
            if (cFileFormat) {
                formdata.append(NewFileVersion[i].name, NewFileVersion[i]);
            } else {
                //$("#Messages_short_Id").find("label").html("The file format <span style='color:red;'>" + CheckFormat[1] + "</span>  is not supported");
                var fileFormat = "<span style='color:red;'>" + CheckFormat[1] + "</span>";
                $("#Messages_short_Id").find("label").html(String.format(vrHTMLViewerRes["msgJsFileFormatNotSupported"], fileFormat));
                $("#Messages_short_Id").modal('show');
                return;
            }
        }

        _this.SaveNewVersion(formdata).then(function () {

        });

    }
    UploadAssembelyVersions(filePath) {
        var _this = this;
        //var attachNumber = _this.documentNumber//$("#showFilename_id input")[0].value
        //var queryString = $("#documentKey").val();
        //save multiple files
        var formdata = new FormData();
        formdata.append('getvalues', _this.documentKey);
        formdata.append('getvalues', _this.documentNumber);
        formdata.append('getvalues', filePath);
        formdata.append('getvalues', _this.versionNumber);
        _this.SaveNewAssembelyVersionToServer(formdata);
    }
    SaveNewAssembelyVersionToServer(formdata) {
        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/UploadAssemblyVersion";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "html";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            //bind partial view into the dom
            $("#docviewerPartial_ID").html(data);
            var lista = $("#attachmentsList a");
            for (var i = 0; i < lista.length; i++) {
                if (func.CurrentFileFileName.split("-")[0] == lista[i].text.split("-")[0]) {
                    lista[i].click();
                    break;
                }
            }

        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR);
            alert(textStatus);
        });
    }
    SaveNewVersion(formdata) {

        var _this = this;
        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/UploadVersionAndsave";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "html";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        ajaxOptions.xhr = function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.onprogress = function (e) {
                //if (e.lengthComputable) {

                //}
            }
            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    var prec = Math.floor((e.loaded / e.total) * 100);
                    var total = _this.CalculateFileSize(e.total);
                    var loaded = _this.CalculateFileSize(e.loaded);
                    var mbleft = parseInt(total - loaded);
                    _this.StartingProgressBar(prec, mbleft, total, e.total);
                }
            }
            return xhr;
        };
        return new Promise((resolve, reject) => {
            _this.ajaxCall = $.ajax(ajaxOptions).done(function (data) {
                //clear files from element
                $("#showFilename_id span:nth-child(3)").html("");
                $("#showFilename_id span:nth-child(4)").html("");
                //bind partial view into the dom
                $("#docviewerPartial_ID").html(data);
                document.getElementById("FileUploadVersion_id").value = "";

                var lista = $("#attachmentsList a");
                for (var i = 0; i < lista.length; i++) {
                    if (func.CurrentFileFileName.split("-")[0] == lista[i].text.split("-")[0]) {
                        lista[i].click();
                        break;
                    }
                }

            }).fail(function (jqXHR, textStatus) {
                alert(jqXHR);
                alert(textStatus);
            });
        });
    }
    IsSupportedFile(format) {
        //method for checking support files format
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
            case 'xwd': case 'cgm': case 'cmx': case 'dgn': case 'drw': case 'dwf': case 'dwfx': case 'dwg': case 'e00':
            case 'emf': case 'gbr': case 'mif': case 'nap': case 'pcl': case 'pcl6': case 'pct': case 'plt': case 'shp': case 'svg':
            case 'wmf': case 'wmz': case 'wpg': case 'doc': case 'docx': case 'eml': case 'mobi': case 'epub': case 'html': case 'msg':
            case 'ppt': case 'pptx': case 'pst': case 'rtf': case 'txt': case 'xls': case 'xlsx':
                isSupported = true;
                break;
            default:
                isSupported = false;
        }

        return isSupported;
    }
    CheckboxChecked() {
        /*check if any checkbox true 
        in case one of the checkboxs true show the button bar [add to cart, delete attachment, download attachment]
        this method run in the Runstartup()*/
        var _this = this;
        var checkboxes = $(DomElements.Listofcheckboxs); //$("#attachmentsList ul li span input");
        var checked;

        $(DomElements.Listofcheckboxs).click(function () {
            var countFalse = 0;
            var countTrue = 0;
            for (var i = 0; i < checkboxes.length; i++) {
                checked = checkboxes[i].checked;
                if (checked == true) {
                    countTrue++;
                } else {
                    countFalse++;
                }
            }

            if (countTrue > 0) {
                $(DomElements.ifCheckboxcheckedDiv).fadeIn(1000);
            } else {
                $(DomElements.ifCheckboxcheckedDiv).fadeOut(1000);
            }

            if (countFalse > 0) {
                $("#CheckAll_id").text(vrHTMLViewerRes["lblmnuIndexCheckAll"]);
            } else {
                $("#CheckAll_id").text(vrHTMLViewerRes["msgunCheckAttachment"]);
            }
        });


    }
    //rename attachment
    RenameAttachment(renameValue) {
        //if (renameValue == "") { return alert("Input is empty!");}
        if (renameValue == "") { showAjaxReturnMessage(vrHTMLViewerRes["msgJsEmptyInput"], "w"); return; }

        var _this = this;
        var formdata = new FormData();
        formdata.append('variables', _this.documentKey);
        formdata.append('variables', _this.documentNumber);
        formdata.append('variables', renameValue);

        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/RenameAttachment";
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "html";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            $("#docviewerPartial_ID").html(data);
            //$("#attachmentsList a").last().trigger("click");
            //hide dialog box
            $('#WriteRenameAttachmentName').modal('hide');
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR);
            alert(textStatus);
        });
    }
    //delete attachmnets
    CheckMultipleFilesIfcheckOutBeforeDelete(ActiveFunc = false) {
        /*check if file is checkedout.
        in case one of the attachments you selected is checkedout you will get popup notification 
        which file is checkedout and can't be modified or delete
        this method will let user to delete the files who didn't checked out*/

        var _this = this;
        if (ActiveFunc == false) return;
        //var attachmentArray = []
        var queryString = $("#documentKey").val();
        var formdata = new FormData();
        var attachmentlist = $("#attachmentsList li");
        formdata.append("documentKey", queryString);
        //clear the array object and create new one
        _this.attachmentArray = [];
        //get attachments values
        for (var i = 0; i < attachmentlist.length; i++) {
            var fileChecked = attachmentlist[i].childNodes[1].firstElementChild.checked;
            var attachNumber = attachmentlist[i].childNodes[2].value;
            var versionNumber = attachmentlist[i].childNodes[3].value;
            var pageNumber = attachmentlist[i].childNodes[4].value;
            var fileFullName = attachmentlist[i].firstElementChild.text;
            if (fileChecked) {
                _this.attachmentArray.push(attachNumber + "," + versionNumber + "," + pageNumber);
                formdata.append("attachments", attachNumber + "," + fileFullName);
            }
        }
        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/UIMultipelFilecallCheckIffileIscheckOut";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            $(DomElements.DeleteAttachmentList).html("");
            if (data.ErrorMsg == "") {
                for (var i = 0; i < data.MsgFileCheckout.length; i++) {
                    var fileName = data.MsgFileCheckout[i];
                    if (fileName.includes(";")) {
                        //fix for service pack moti mashiah
                        $(DomElements.DeleteAttachmentList).append('<li style="color:red"> ' + fileName + '</li>');
                    } else {
                        $(DomElements.DeleteAttachmentList).append('<li> ' + fileName + '</li>');
                    }

                    $(DomElements.ConfirmDeleteAttachmentDialog).modal('show');
                }
            } else {
                //alert(data.ErrorMsg);
                showAjaxReturnMessage(data.ErrorMsg, "w");
            }
        });
    }
    ApprovedDeleteFiles(ActiveFunc = false) {
        /*get all the selected attachments
        send all the selected attachment to the server and delete from hard drive and database*/
        var _this = this;
        if (ActiveFunc === false) return;

        var queryString = $("#documentKey").val();
        var formdata = new FormData();
        formdata.append("Keydocument", queryString);
        var AllAttachmentList = $("#attachmentsList li");
        var attachmentList = _this.attachmentArray;
        //var ifAttachmentVersion;
        //var CountVersions = 0;
        //var current = null;
        for (var i = 0; i < attachmentList.length; i++) {
            var value = attachmentList[i].split(",");
            var attachNumber = value[0];
            var versionNumber = value[1];
            var pageNumber = value[2];
            formdata.append("attachments", attachNumber + "," + versionNumber + "," + pageNumber);
        }

        //check delete permission.
        const hasValidOutputdeletePermision = _this.ValidateOutputSettings("Delete");
        if (hasValidOutputdeletePermision) {
            var ajaxOptions = {};
            //ajaxOptions.cache = false;
            ajaxOptions.url = "/DocumentViewer/BtnokClickDeleteAttachment";
            //ajaxOptions.enctype = 'multipart/form-data';
            ajaxOptions.type = "POST";
            ajaxOptions.dataType = "html";
            ajaxOptions.contentType = false;
            ajaxOptions.processData = false;
            ajaxOptions.data = formdata;
            $.ajax(ajaxOptions).done(function (data) {
                //return partial view
                $("#docviewerPartial_ID").html(data);
                //clear file title 
                $(DomElements.showFilenameTitle).hide();
                //clear the buttons from the screen
                $(DomElements.ifCheckboxcheckedDiv).fadeOut('1000');
                //close the dialog
                $(DomElements.ConfirmDeleteAttachmentDialog).modal("hide");
                //disable note
                leadtools.isDocumentPlaced = false;
                //hide the note button and checkin button
                $(DomElements.checkOutFileDiv).hide();
                $(DomElements.noteidDiv).hide();
            }).fail(function (jqXHR, textStatus) {
                alert(jqXHR);
                alert(textStatus);
            });
        } else {
            //alert("you don't have permission to delete attachments!!");
            //showAjaxReturnMessage(vrHTMLViewerRes["msgJsDeleteAttachmentPermission"], "w");
        }

    }
    //End delete attachmnets
    GetResizable() {
        /*give the function of resizable between the thumbnails to the main viewer
        using resizable jqury plug in
        this method run at the Runstartup()*/
        $(".panel-left").resizable({
            handleSelector: ".splitter",
            resizeHeight: false,
        });

        $(".panel-top").resizable({
            handleSelector: ".splitter-horizontal",
            resizeWidth: false
        });
    }
    //checkinConcept
    GetIscheckOutNcheckOutToMeProps(ActiveFunc = false) {
        //return to variables to check 
        //a. if attachment is checkout
        //b. if attachment checkout to me
        var _this = this;
        if (ActiveFunc === false) return;

        var getdata = "";
        var formdata = new FormData();
        var documentNum = this.documentNumber;
        var queryString = $("#documentKey").val();
        formdata.append("getVariables", queryString);
        formdata.append("getVariables", documentNum);
        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.async = false,
            ajaxOptions.url = "/DocumentViewer/CheckBothIfcheckoutTomeAndcheckout";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            getdata = data;
            //this.isCheckedout = data.isCheckout;
            //this.isCheckouttoMe = data.isCheckoutTome;
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR);
            alert(textStatus);
        });
        this.isCheckout = getdata.isCheckout;
        this.ischeckOutToMe = getdata.isCheckoutTome;
        this.isCheckoutDesktop = Math.abs(getdata.isCheckoutDesktop);
    }
    CheckIncheckOut(ActiveFunc = false, _thisElem) {
        /* checkin checkout concept 
         * conditions where user checkin and checkout document
         * this method includs: 
         * checking if document setup on the dom
         * chcking if attachment is not checkedout in the database
         * when user checkin the method will initiate method CompleteVirtualDocAndSaveToCache() to save document as pdf file version
         * */
        if (leadtools.documentViewer.pageCount == 1)
            $(DomElements.deletePageid).hide();
        else
            $(DomElements.deletePageid).show();

        var _this = this;
        //check if attafchment is checkout server side.
        _this.GetIscheckOutNcheckOutToMeProps(true);
        //if (_this.isCheckout > 0 && _this.ischeckOutToMe == 0) { return alert("Attachment is checked out just now."); }
        if (_this.isCheckout > 0 && _this.ischeckOutToMe == 0) { showAjaxReturnMessage(vrHTMLViewerRes["msgJsAttachmentCheckoutStatus"], "s"); }
        if (ActiveFunc == false) { return; }
        var isCheckout = $(_thisElem).find("i").hasClass("fa-lock");
        if (leadtools.isDocumentPlaced === true) {
            if (isCheckout === true) {
                _this.DragAndDropPages();
                $(DomElements.noteidDiv).hide();
                $(DomElements.scanneridDiv).hide();
                _this.StartCreartingVirtualDocument();
                $(_thisElem).find("i").removeClass("fa-lock");
                $(_thisElem).find("i").addClass("fa-unlock");
                $(_thisElem).prop("title", "CheckIn");
                CurrentCheckout = true;
                $(DomElements.checkoutbuttonDiv).show();
                $(DomElements.attachmentDivButton).hide();
                _this.CheckOutServerSide(true);
            } else {
                var GetHtml = $("#showFilename_id span:nth-child(3)").html();
                var getFileName = GetHtml.split("-")[0];
                $(DomElements.noteidDiv).show();
                $(DomElements.scanneridDiv).show();
                $(this).confirmModal({
                    confirmTitle: 'TAB FusionRMS',
                    confirmMessage: String.format(vrHTMLViewerRes['msgJsConfirmSaveTheVersion'], getFileName),
                    confirmOk: vrCommonRes['Yes'],
                    confirmCancel: vrCommonRes['No'],
                    confirmStyle: 'default',
                    confirmCallback: function () {
                        _this.CompleteVirtualDocAndSaveToCache().then(function () {
                            $(DomElements.attachmentDivButton).show();
                            $(_thisElem).prop("title", "CheckOut");
                            $(_thisElem).find("i").removeClass("fa-unlock");
                            $(_thisElem).find("i").addClass("fa-lock");
                            //checkOutFile_id = false;
                            CurrentCheckout = false;
                            $(DomElements.checkoutbuttonDiv).hide();
                        });

                        //need implementation call to database to unlock the file;
                    },
                    confirmCallbackCancel: function () {
                        showAjaxReturnMessage(vrHTMLViewerRes["msgJsFileNotsaved"], "w");
                    }
                });

            }
        } else {
            //alert("You didn't set any document :) ");
            showAjaxReturnMessage(vrHTMLViewerRes["msgJsNotSetAnyDoc"], "e");
        }

    }
    CheckOutServerSide(ActiveFunc = false) {
        if (ActiveFunc === false) { return; }
        var _this = this;

        var formdata = new FormData();
        formdata.append("getVariables", _this.documentKey);
        formdata.append("getVariables", _this.FilePath);
        formdata.append("getVariables", _this.documentNumber);
        formdata.append("getVariables", _this.versionNumber);
        formdata.append("getVariables", _this.pageNumber);


        var ajaxOptions = {};
        ajaxOptions.url = "/DocumentViewer/CheckOutAttachment";
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "html";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR);
            alert(textStatus);
        });
    }
    CancleCheckout(ActiveFunc = false, _thisElem) {
        /*cancel the changes made by user and refresh the page to clear the object 
         and prepare to the next object*/
        var _this = this;
        if (ActiveFunc === false) { return; }
        //var _this = this;
        //var conf = confirm("Are you sure you want to cancel your changes??")
        //if (conf) {
        //    _this.CancelcheckoutServerside(true);
        //    window.location.reload();
        //}
        $(this).confirmModal({
            confirmTitle: 'TAB FusionRMS',
            confirmMessage: vrHTMLViewerRes['msgJsConfirmCancel'],
            confirmOk: vrCommonRes['Yes'],
            confirmCancel: vrCommonRes['No'],
            confirmStyle: 'default',
            confirmCallback: function () {
                _this.CancelcheckoutServerside(true);
                window.location.reload();
            }
        });
        CurrentCheckout = false;
    }
    CancelcheckoutServerside(ActiveFunc = false) {
        var _this = this;
        if (ActiveFunc == false) { return; }
        var formdata = new FormData();
        formdata.append("getVariables", _this.documentKey);
        formdata.append("getVariables", _this.documentNumber);
        formdata.append("getVariables", _this.versionNumber);

        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/UndoCheckOut";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            var x = data;
        }).fail(function (jqXHR, textStatus) {

        });
    }
    StartCreartingVirtualDocument() {
        //after checkout start building virtual document from the existing document
        //create virtual doc as VirtualDocObject
        var createOptions = new lt.Documents.CreateDocumentOptions();
        var c = lt.Documents.DocumentFactory.create(createOptions);
        c.name = "VirtualDocument";
        lt.Documents.DocumentFactory.loadFromCache(leadtools.documentViewer.document.documentId)
            .done(function (doc) {
                var docPage = doc.pages;
                for (var i = 0; i < docPage.count; i++) {
                    var addPages = docPage.item(i);
                    c.pages.add(addPages);
                    VirtualDocumentPages.push(addPages);
                }
                VirtualDocObject = c.documents.document;
                leadtools.documentViewer.setDocument(VirtualDocObject);
            })
            .fail(function (jqXHR, statusText, errorThrown) {
                showServiceError(jqXHR, statusText, errorThrown);
                //reject()
            });
    }
    DeletePages(ActiveFunc = false, _thisElem) {
        if (ActiveFunc == false) { return; }
        var currentPage = leadtools.documentViewer.currentPageNumber - 1;
        $(this).confirmModal({
            confirmTitle: 'TAB FusionRMS',
            confirmMessage: String.format(vrHTMLViewerRes['msgJsConfirmPageDelete'], parseInt(currentPage + 1)),
            confirmOk: vrCommonRes['Yes'],
            confirmCancel: vrCommonRes['No'],
            confirmStyle: 'default',
            confirmCallback: function () {
                leadtools.documentViewer.document.pages.removeAt(currentPage);
                if (leadtools.documentViewer.pageCount == 1)
                    $(DomElements.deletePageid).hide();
                else
                    $(DomElements.deletePageid).show();
            }
        });
    }
    AddPages(ActiveFunc = false, _thisElem) {
        //add pages from files
        //get the upload file and send it to leadtools upload method
        //then use addpagetExistingdoc() method in order to add the pages to the dom
        if (ActiveFunc == false) { return }
        var _this = this;
        var fileUpload = _thisElem.files[0];
        var FileSizebytes = fileUpload.size;

        if (fileUpload.type == "text/plain") {
            //alert("Can't add txt file as a page!");
            showAjaxReturnMessage(vrHTMLViewerRes["msgJsCantAddTXTFile"], "w");
            //clear file value
            $(_thisElem).val("");
            return;
        }
        var uploadPromise = lt.Documents.DocumentFactory.uploadFile(fileUpload);
        uploadPromise.done(function (uploadedDocumentUrl) {
        }).fail(error => { console.log(error) })
            .always(function (CachFile) {
                _this.AddpageToExistingDoc(CachFile);
                //clear file value
                $(_thisElem).val("");
            });
        uploadPromise.progress(function (percentage) {
            _this.AddingpagesProgressBar(Math.round(percentage.progress), FileSizebytes);
            if (_this.cancelUpload == true) {
                $(_thisElem).val("");

                uploadPromise.abort();
                cancelupload = false;
            }
        });

    }
    AddpageToExistingDoc(cachFile) {
        //Finally add the pages to the existing document on the dom
        //the concept here is to get all pages and add them to the virtual doc object "VirtualDocObject"
        //this object VirtualDocObject created in a time you checkout the attachment
        var loadDocumentOptions = new lt.Documents.LoadDocumentOptions();
        loadDocumentOptions.maximumImagePixelSize = 2048;
        lt.Documents.DocumentFactory.loadFromUri(cachFile, loadDocumentOptions)
            .done(function (doc) {
                var docPage = doc.pages;
                for (var i = 0; i < docPage.count; i++) {
                    var addPages = docPage.item(i);
                    //leadtools.documentViewer.document.pages.beginAdd()
                    VirtualDocObject.pages.add(addPages);
                    //leadtools.documentViewer.document.pages.endAdd();
                    VirtualDocumentPages.push(addPages);

                }
            }).fail(error => { console.log(error) }).always(function (newid) {
            });
    }
    CompleteVirtualDocAndSaveToCache() {
        //first save the virtual document "VirtualDocObject" to cache 
        //then run the SaveNewVersionToPdf() method in order to save the new version
        return new Promise((resolve, reject) => {
            var _this = this;
            lt.Documents.DocumentFactory.saveToCache(VirtualDocObject)
                .done(function () {
                    resolve();
                    _this.ConvertToTiff("NewVersion");
                })
                .fail(function (jqXHR, statusText, errorThrown) {
                    reject();
                    showServiceError(jqXHR, statusText, errorThrown);
                }).always(function (val) {
                });
        });
    }
    ConvertToPdf(convertFor) {
        var _this = this;
        this.loadOpetions = new lt.Documents.LoadDocumentOptions();
        lt.Documents.DocumentFactory.loadFromCache(leadtools.documentViewer.document.documentId, this.loadOpetions)
            .done(function (doc) {
                // Create a new PDF document with: PDF and no image/text 
                var pdfOptions = new lt.Documents.Writers.PdfDocumentOptions();
                pdfOptions.documentType = lt.Documents.Writers.PdfDocumentType.pdf;
                pdfOptions.fontEmbedMode = lt.Documents.Writers.DocumentFontEmbedMode.none;
                pdfOptions.imageOverText = true;
                pdfOptions.linearized = false;
                //pdfOptions.title = "TEST TITLE";
                //pdfOptions.subject = "TEST SUBJECT";
                //pdfOptions.keywords = "TEST KEYWORDS";
                //pdfOptions.author = "TEST AUTHOR";
                //pdfOptions.isProtected = true;
                //pdfOptions.userPassword = "password";
                //pdfOptions.ownerPassword = "Owner password";
                pdfOptions.encryptionMode = lt.Documents.Writers.PdfDocumentEncryptionMode.rc128Bit;
                pdfOptions.printEnabled = true;
                pdfOptions.highQualityPrintEnabled = true;
                pdfOptions.copyEnabled = true;
                pdfOptions.editEnabled = true;
                pdfOptions.annotationsEnabled = false;
                pdfOptions.assemblyEnabled = false;
                pdfOptions.oneBitImageCompression = lt.Documents.Writers.OneBitImageCompressionType.flate;
                pdfOptions.coloredImageCompression = lt.Documents.Writers.ColoredImageCompressionType.flateJpeg;
                pdfOptions.qualityFactor = 2;
                var jobData = new lt.Documents.DocumentConverterJobData();
                jobData.documentFormat = lt.Documents.Writers.DocumentFormat.pdf;
                jobData.rasterImageFormat = lt.Documents.RasterImageFormat.unknown;
                // Set document options 
                jobData.documentOptions = pdfOptions;
                doc.convert(jobData)
                    .done(function (result) {
                        if (result.document === null) {
                            //return alert("something went wrong!! version didn't save");
                            showAjaxReturnMessage(vrHTMLViewerRes["msgJsSomethingWentWrongVer"], "w"); return;
                        }
                        var filePath = result.document.url.split("/")[2] + "/file.pdf";
                        switch (convertFor) {
                            case "NewScan":
                                _this.SaveScanNewAttachment(filePath);
                                break;
                            case "NewVersion":
                                _this.UploadAssembelyVersions(filePath);
                                break;
                            default:
                        }
                    }).fail().always(function (val) {

                        //lt.Documents.DocumentFactory.deleteFromCache(VirtualDocObject.documentId)
                    });
            })
            .fail();

    }
    ConvertToTiff(convertFor) {
        var _this = this;
        var loadDocumentOptions = new lt.Documents.LoadDocumentOptions();
        lt.Documents.DocumentFactory.loadFromCache(leadtools.documentViewer.document.documentId, loadDocumentOptions)
            .done(function (doc) {
                // Convert this document to mulitple tiff.
                var jobData = new lt.Documents.DocumentConverterJobData();
                jobData.documentFormat = lt.Documents.Writers.DocumentFormat.user;
                jobData.rasterImageFormat = lt.Documents.RasterImageFormat.tifJpeg422;
                doc.convert(jobData)
                    .done(function (result) {
                        //if (result.document == null) { return alert("something went wrong!! version didn't save"); }
                        if (result.document == null) { showAjaxReturnMessage(vrHTMLViewerRes["msgJsSomethingWentWrongVer"], "w"); return; }
                        var filePath = result.document.url.split("/")[2] + "/file.tif";
                        switch (convertFor) {
                            case "NewScan":
                                _this.SaveScanNewAttachment(filePath);
                                break;
                            case "NewVersion":
                                _this.UploadAssembelyVersions(filePath);
                                break;
                            default:
                        }

                    })
                    .fail(function () {

                    });
            })
            .fail(function () {

            });
    }
    //download attachments
    CheckIfFileExistBeforedownload() {
        //moti mashiah
        var _this = this;
        var attachmentsBind;
        _this.downloadFilesList = [];
        var attchDownload = $("#attachmentsList li");
        var formdata = new FormData();
        for (var i = 0; i < attchDownload.length; i++) {
            var fileChecked = attchDownload[i].childNodes[1].firstElementChild.checked;
            if (fileChecked) {
                var attchNumber = attchDownload[i].children[2].value;
                var attchVersion = attchDownload[i].children[3].value;
                var AttachmentSelected = attchDownload.find("a")[i].href;
                attachmentsBind = decodeURI(AttachmentSelected.split("DocumentViewer/")[1]);
                if (attachmentsBind == undefined) attachmentsBind = false;
                formdata.append("FileToDownload", attachmentsBind);
                //_this.downloadFilesList.push(attachmentsBind);
                _this.downloadFilesList.push({ Path: attachmentsBind, TableName: _this.TableName, TableId: _this.TableId, AttachNum: attchNumber, AttachVer: attchVersion })
            }
        }
        _this.DownloadAttachment(attachmentsBind);

    }
    DownloadAttachment(attachmentsBind) {
        var _this = this;
        if (attachmentsBind !== false) {
            var data = JSON.stringify({ params: func.downloadFilesList, viewid: func.viewId });
            var xhr = new XMLHttpRequest();
           $("#spinningWheel").show();
            xhr.open('POST', "/DocumentViewer/DownloadFiles", true);
            xhr.responseType = "blob";
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var blob = xhr.response;
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    // the filename you want
                    a.download = 'Attachments.zip';
                    document.body.appendChild(a);
                    a.click();
                    $("#spinningWheel").hide();
                }
            };
            xhr.send(data);
        } else {
            //alert("One of the selected files doesn't exist in the hard drive!!");
            showAjaxReturnMessage(vrHTMLViewerRes["msgJsFileNotExistsOnHD"], "e");
        }

    }
    //get temporary file from images
    GettemopFilefromImages() {
        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/CreateTempFileCachec";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
        }).fail(function () {

        });

    }
    //security module.
    SecurePermissions(secureAssign) {
        //private properties
        var _this = this;
        var getSecure;
        let _HasAttachEditPermission = new WeakMap();
        let _HasAttachmentAddPermission = new WeakMap();
        let _HasAttachDeletePermission = new WeakMap();
        let _HasAttachPrintPermission = new WeakMap();
        switch (secureAssign) {
            case "Add":
                _HasAttachmentAddPermission.set(this, _this.ValidAttachmentPermission("Add"));
                const Add1 = _HasAttachmentAddPermission.get(this);
                if (Add1 == true) {
                    getSecure = true;
                } else {
                    getSecure = false;
                }
                break;
            case "Edit":
                _HasAttachEditPermission.set(this, _this.ValidAttachmentPermission("Edit"));
                const Edit1 = _HasAttachEditPermission.get(this);
                if (Edit1 == true) {
                    getSecure = true;
                } else {
                    getSecure = false;
                }
                break;
            case "Delete":
                //not complete yet
                _HasAttachDeletePermission.set(this, func.ValidAttachmentPermission("Delete"));
                break;
            case "Print":
                _HasAttachPrintPermission.set(this, func.ValidAttachmentPermission("Print"));
                const print = _HasAttachPrintPermission.get(this);
                if (print == true) {
                    getSecure = true;
                } else {
                    getSecure = false;
                }
                break;
            default:
                break;
        }
        return getSecure;
    }
    ValidateOutputSettings(opt) {
        /*send requst to server to check if user has permission for:
        delete, add, edit attachments;*/
        var valid = false;
        $.ajax({
            type: "GET",
            data: { opt: opt },
            url: "/DocumentViewer/GetDefaultSystemDrive",
            dataType: "html",
            async: false,
            success: function (response) {
                const res = response.toLowerCase();
                const ValidOutput = res.split(",")[0].split(":")[1];
                const OutputActive = res.split(",")[2].split(":")[1];
                const vPermission = res.split(",")[1].split(":")[1];

                if (ValidOutput == "true") {
                    valid = true;
                } else {
                    showAjaxReturnMessage(vrHTMLViewerRes["msgInvalidOutputSetting"], 'e');
                    valid = false;
                    return;
                }

                if (OutputActive == "true") {
                    valid = true;
                } else {
                    showAjaxReturnMessage(vrHTMLViewerRes["msgInactiveOutput"], "e");
                    valid = false;
                    return;
                }

                if (vPermission == "true") {
                    valid = true;
                } else {
                    showAjaxReturnMessage(vrHTMLViewerRes["msgJsAddAttachmentPermission"], "w");
                    valid = false;
                    return;
                }
            },
            error: function (xhr, status, error) {
                alert(xhr);
                //showAjaxReturnMessageDViewer(vrClientsRes["msgDocViewerInvalidOutPutSettings"], 'e');
                valid = false;
            }
        });
        return valid;
    }
    ValidAttachmentPermission(opt) {
        var _this = this;
        var valid = false;

        var formdata = new FormData();
        formdata.append("getVariable", _this.documentKey);
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
    //end security module
    MagnifyGlassCall(ActiveFunc = false, _thisElem) {
        var _this = this;
        if (ActiveFunc == false) { return }
        //disable OCR when magnify glass clicked
        _this.OcrOn_Off = true;
        $("#OcrcallId").css("backgroundColor", "");
        if (_this.MagnifyOn_Off == true) {
            $(_thisElem).css("backgroundColor", "yellow");
            leadtools.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactiveMagnifyGlass);
            _this.MagnifyOn_Off = false;
        } else {
            $(_thisElem).css("backgroundColor", "");
            leadtools.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactivePanZoom)
            _this.MagnifyOn_Off = true;
        }
    }
    EnableOcr(ActiveFunc = false, _thisElem) {
        var _this = this;
        if (ActiveFunc === false) { return }
        //disable magnify glass when OCR on
        _this.MagnifyOn_Off = true;
        $("#magnifyGlassId").css("backgroundColor", "");
        if (_this.OcrOn_Off == true) {
            $(_thisElem).css("backgroundColor", "yellow");
            _this.OcrOn_Off = false;
            //var _this = this;
            if (ActiveFunc == false) { return }
            var imageViewer = leadtools.documentViewer.view.imageViewer;
            var rubberBandMode = imageViewer.interactiveModes.findById(lt.Controls.ImageViewerInteractiveMode.rubberBandModeId);
            leadtools.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactiveRubberBand);
            _this.OcronAndOff = true;
            imageViewer.defaultInteractiveMode = rubberBandMode;
            rubberBandMode.rubberBandCompleted.add(function (sender, e) {
                if (e.isCanceled)
                    return;
                var searchArea = lt.LeadRectD.fromLTRB(e.points[0].x, e.points[0].y, e.points[1].x, e.points[1].y);
                var visibleRect = imageViewer.getViewBounds(true, true);
                searchArea.intersect(visibleRect);
                searchArea = imageViewer.convertRect(null, lt.Controls.ImageViewerCoordinateType.control, lt.Controls.ImageViewerCoordinateType.image, searchArea);
                if (searchArea.x < 0)
                    searchArea.x = 0;
                if (searchArea.y < 0)
                    searchArea.y = 0;
                if (searchArea.width > 3 && searchArea.height > 3)
                    _this.GetTextOcr(searchArea, imageViewer);
            });
        } else {
            leadtools.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactivePanZoom)
            $(_thisElem).css("backgroundColor", "");
            _this.OcrOn_Off = true;
        }
    }
    GetTextOcr(searchArea, imageViewer, rubberBandMode) {
        var _this = this;
        var rest = "/Ocr/GetText";
        var imageSize = imageViewer.imageSize;
        var params = {
            uri: _this.FilePath,
            imageWidth: Math.floor(imageSize.width),
            imageHeight: Math.floor(imageSize.height),
            pageNumber: leadtools.documentViewer.currentPageNumber
        };
        if (!searchArea.isEmpty) {
            params["left"] = Math.floor(searchArea.left);
            params["top"] = Math.floor(searchArea.top);
            params["right"] = Math.floor(searchArea.right);
            params["bottom"] = Math.floor(searchArea.bottom);
        }
        $.get(rest, params).done(function (result) {
            if (result === null || result.length <= 0) {
                //alert("No text was found in the specified area");
                showAjaxReturnMessage(vrHTMLViewerRes["msgJsNoTextFoundInArea"], "w");
                return;
            }
            $(DomElements.OcrDialogbox).modal('show');
            $(DomElements.OcrDialogbox).find('textarea').html(result);
        });
    }
    AddingpagesProgressBar(percentage, bytes) {
        var _this = this;
        var fileSize = _this.CalculateFileSize(bytes);
        var Unit = _this.GetfileUnit(bytes);
        if (fileSize > 3 && Unit == "MB" || Unit == "GB" || Unit == "TB") {
            $(DomElements.progDlg).modal('show');
            const degree = percentage * 3.6;
            if (degree <= 180) {
                $(DomElements.barRight).css('transform', `rotate(${degree}deg)`);
                $(DomElements.barLeft).css('transform', 'rotate(0deg)');
            } else {
                $(DomElements.barRight).css('transform', `rotate(180deg)`);
                $(DomElements.barLeft).css('transform', `rotate(${180 + degree}deg)`);
            }

            $(DomElements.progDlg).find('label').text("File: " + fileSize + Unit);
            $(DomElements.percentage).text(percentage + "%");
            if (percentage == 100) {
                setTimeout(function () { $(DomElements.progDlg).modal('hide'); }, 1000);
                percentage = 0;
            }
        }
    }
    StartingProgressBar(percentage, mbleft, Filetotal, bytes) {
        var _this = this;
        var Unit = _this.GetfileUnit(bytes);
        $("#spinningWheel").hide();
        if (Filetotal > 50 && Unit == "MB" || Unit == "GB" || Unit == "TB") {
            $(DomElements.progDlg).modal('show');
            const degree = percentage * 3.6;
            if (degree <= 180) {
                $(DomElements.barRight).css('transform', `rotate(${degree}deg)`);
                $(DomElements.barLeft).css('transform', 'rotate(0deg)');
            } else {
                $(DomElements.barRight).css('transform', `rotate(180deg)`);
                $(DomElements.barLeft).css('transform', `rotate(${180 + degree}deg)`);
            }
            //var fileSize = _this.CalculateFileSize(totalbytes)

            $(DomElements.progDlg).find('label').text("File: " + Filetotal + Unit + " Left: " + mbleft + Unit);
            $(DomElements.percentage).text(percentage + "%");
            if (percentage == 100) {
                setTimeout(function () { $(DomElements.progDlg).modal('hide'); }, 100);
                percentage = 0;
            }
        }
    }
    GetfileUnit(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return sizes[i];
    }
    CalculateFileSize(bytes) {
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2);
    }
    //scan methods
    startScanningService(onSuccess) {
        var _this = this;
        var started = false;
        var count = 10;
        var timeout = 5000;
        var appUrl = "Leadtools.WebScanning.Host:" + lt.LTHelper.browser;
        var interval = setInterval(function () {
            scanningService.init(function () {
                // Scanning service - init succeed
                clearInterval(interval);
                scanningService.start(function () {
                    // Scanning service - start succeed
                    if (onSuccess !== null)
                        onSuccess();
                    started = true;
                }, function () {
                    // Scanning service - start failed
                    //alert("Scanning service - start failed");
                    showAjaxReturnMessage(vrHTMLViewerRes["msgJsScanningServiceFailed"], "e");
                });
            }, function () {
                // Scanning service - init failed
                if (!started) {
                    window.location.href = appUrl;
                }
                if (count-- === 0) {
                    $("#downloadMSI").modal("show");
                    clearInterval(interval);
                }
            });
        }, timeout);
    }
    ScanGetSources() {
        isScanServicerunning = true;
        scanningService.getStatus(
            (status) => {
                // Scanning service - getStatus succeed
                var scanSource = status.selectedSource;
                scanningService.getSources(
                    (sources) => {
                        // Scanning service - getSources succeed
                        var options = "";
                        for (var i = 0; i < sources.length; i++) {
                            if (sources[i] === scanSource)
                                options += "<option selected='selected'>" + sources[i] + "</option>";
                            else
                                options += "<option>" + sources[i] + "</option>";
                        }

                        if (sources.length == 0) {
                            //alert("please, exit the client and refresh your page, then click on scan again!!");
                            //showAjaxReturnMessage(vrHTMLViewerRes["msgJsScanningExistThePage"], "w");
                            scanningService.stop();
                            localStorage.setItem("isTwainConnectionfailed", true);
                            window.location.reload();
                        } else {
                            $("#GetScansources_id").modal("show");
                            var dropdown = $("#GetScansources_id").find("select");
                            dropdown.html(options);
                        }
                    },
                    () => {
                        // Scanning service - getSources failed
                        //alert(" Scanning service - getSources failed");
                        showAjaxReturnMessage(vrHTMLViewerRes["msgJsScanningServiceResFailed"], "e");
                    });
            },
            () => {
                // Scanning service - getStatus failed
                //alert("Status error faild to start, please refresh your page!!");
                showAjaxReturnMessage(vrHTMLViewerRes["msgJsScanningStatusErrFailed"], "w");
            });
    }
    RunScanning(e) {
        var _this = this;
        //this.beginOperation("Scanning...");
        scanningService.acquire(function (status) {
            // Scanning service - acquire succeed
            _this.LastCountscan = status.pageCount - _this.LastCountscan;
            _this.BeginscanOperation(status, _this.LastCountscan);
        }, function () {
            // Scanning service - acquire failed
            //_this.startScanningService(function () {
            //    _this.scanBtn_Click(e);
            //});
        });
    }
    BeginscanOperation(status, lastCount) {
        /*conditions of going to a scanning mode*/
        //scanning mode true 
        this.isScannig = true;
        //hide notes
        $(DomElements.noteidDiv).hide();
        //hide search ocr text
        $(DomElements.DivCustomSearch1).hide();
        //hide attachment addingfunction
        $(DomElements.attachmentDivButton).hide();
        //hide ocr button (can't functioning on scaner scenario)
        $(DomElements.OcrdivButton).hide();
        //mover user to the click pages tab
        $(pel.thumnailBtn).trigger("click");
        //clear the div of pages for new scanning
        //$(pel.thumbnailDiv).html("");
        //hide pages and attachment tabs
        $("#thumbnailsBookmarksPanel").hide();
        //hide the functional button in case they are showed
        $(DomElements.ifCheckboxcheckedDiv).hide();
        //in case checkout button appear hide it before you enter to scan mode;
        $(DomElements.checkOutFileDiv).hide();
        //message user they are in scanning mode
        $(DomElements.showFilenameTitle).show();
        $(DomElements.showFilenameTitle).html('<span style="color:red;">' + vrHTMLViewerRes["msgJsScanningMode"] + ' - <a onclick="func.CancelscanOperation()" style="color:blue">' + vrHTMLViewerRes["msgJsExitScanningMode"] + '</a></span>');
        //show buttons cancel scan and save scan to a new file
        $(DomElements.saveScanNewAttachmentOption).parent().show();
        $(DomElements.removePageFromscan).parent().show();
        /*end conditions*/

        var width = 3000;
        var height = 4000;
        var getPages = [];
        if (!status.isScanning) {
            for (var i = 0; i < lastCount; i++) {
                this.indexScan++;
                var url = scanningService.getPage(this.indexScan, lt.Twain.JavaScript.RasterImageFormat.Unknown, 0, width, height);
                getPages.push(url);
            }
        }
        this.LastCountscan = status.pageCount;
        //check if there is at least one page to start building file object
        if (getPages.length >= 1) {
            this.FetchImages(getPages);
        }
        //enable the save button after scan pages
        $("#saveScanNewAttachment_options").attr("disabled", false);

    }
    FetchImages(pages) {
        var _this = this;
        var counter = 0;
        var formdataSave = new FormData();
        var file;
        for (var i = 0; i < pages.length; i++) {
            fetch(pages[i]).then(res => res.blob()).then(blob => {
                if (sBrowser.indexOf("Edge") > -1) {
                    file = new Blob([blob], { type: "image/png" });
                    file = this.blobToFile(file, "fefi.png");
                } else {
                    file = new File([blob], 'fefi.png', blob);
                }
                formdataSave.append("url", file);
            }).then(function () {
                counter++;
                if (counter == pages.length) {
                    _this.SaveTempImagesToServer(formdataSave);
                }
            });
        }

    }
    blobToFile(Blob, fileName) {
        var b = Blob;
        b.lastModifiedDate = new Date();
        b.name = fileName;
        return b;
    }
    SaveTempImagesToServer(formdataSave) {
        var _this = this;

        var formdataDelete = new FormData();
        var ajaxOptions = {};

        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/SaveTempfileForScanning";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdataSave;
        $.ajax(ajaxOptions).done(function (data) {
            //bind files to dom
            Promise.all(data.fileServerPath.map(file => leadtools.loadDocument(file))).then((data) => {
                //delete enctypted files
                for (var j = 0; j < data.fileEncryptPath.length; j++) {
                    formdataDelete.append("ListOftempFiles", data.fileEncryptPath[j]);
                }
            });

        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR);
            alert(textStatus);

        }).then(function () {
            //delete all pages after scan and bind to dom id done.
            _this.DeleteScanTempfiles(formdataDelete);
        });


    }
    DeleteScanTempfiles(formdataDelete) {
        var _this = this;
        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/DeleteTempfileForScanning";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "html";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdataDelete;
        $.ajax(ajaxOptions).done(function (data) {
            console.log("Developer message:" + data);
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR);
            alert(textStatus);
            reject();
        });
    }
    EndscanOperation(selectFormat) {
        try {
            //check if there is a document in the dom level
            var leaddoc = leadtools.documentViewer.document.documentId;
        } catch (e) {
            //alert("you can't save empty document!! please, scan at least one page before you save!");
            showAjaxReturnMessage(vrHTMLViewerRes["msgJsScanningCantSaveEmptyDoc"], "w");
            console.log("Tab fustion developer message:  " + e.message);
            return;
        }

        var _this = this;
        lt.Documents.DocumentFactory.saveToCache(leadtools.documentViewer.document)
            .done(function () {
                if (selectFormat === _this.Attachmentformats.TIF) {
                    _this.ConvertToTiff("NewScan");
                } else if (selectFormat === _this.Attachmentformats.PDF) {
                    _this.ConvertToPdf("NewScan");
                }
                //show ocr on dom after conversion done
                $("#OcrcallId").show();
            })
            .fail(function (jqXHR, statusText, errorThrown) {
                showServiceError(jqXHR, statusText, errorThrown);
            }).always(function (val) {
                if (leadtools.isDocumentPlaced == true) {
                    //leadtools.documentViewer.setDocument(null);
                    leadtools.VirtualDocumentPages = [];
                }
            });
        //bring back the buttons we hide after scan
        $(DomElements.attachmentDivButton).show();
        //show ocr button (can't functioning on scaner scenario)
        $(DomElements.OcrdivButton).show();
        //show notes
        $(DomElements.noteidDiv).show();
        //show search ocr text
        $(DomElements.DivCustomSearch1).show();

    }
    SaveScanNewAttachment(filePath) {
        var _this = this;
        _this.isScannig = false;
        //show notes
        $(DomElements.noteidDiv).show();
        //show search ocr text
        $(DomElements.DivCustomSearch1).show();
        var attachName = $("#AttachmentNameID").val();
        var formdata = new FormData();
        formdata.append('getVariable', _this.documentKey);
        formdata.append('getVariable', attachName);
        formdata.append('getVariable', filePath);

        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/AddAttachmentFromScan";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "html";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            //bind partial view into the dom
            $("#scanSaveNewDlg").modal('hide');
            $(DomElements.saveScanNewAttachmentOption).parent().hide();
            $(DomElements.removePageFromscan).parent().hide();
            $("#docviewerPartial_ID").html(data);
            $("#attachmentsList a").last().trigger("click");
            $(DomElements.attachmentDivButton).show();
            leadtools.documentViewer.setDocument(null);
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR);
            alert(textStatus);
        });
    }
    DeleteScanPages(ActiveFunc = false, _thisElem) {
        if (ActiveFunc == false) { return; }
        var currentPage = leadtools.documentViewer.currentPageNumber - 1;
        $(this).confirmModal({
            confirmTitle: 'TAB FusionRMS',
            confirmMessage: String.format(vrHTMLViewerRes['msgJsConfirmPageDelete'], parseInt(currentPage + 1)),
            confirmOk: vrCommonRes['Yes'],
            confirmCancel: vrCommonRes['No'],
            confirmStyle: 'default',
            confirmCallback: function () {
                //delete from leadtools object. 
                leadtools.documentViewer.document.pages.removeAt(currentPage);
                //delete from the array object.
                leadtools.VirtualDocumentPages.splice(currentPage, 1);

                if (leadtools.VirtualDocumentPages.length <= 0) {
                    $(DomElements.removePageFromscanDiv).hide();
                    $("#saveScanNewAttachment_options").attr("disabled", true);

                } else {
                    $(DomElements.removePageFromscanDiv).show();
                    $("#saveScanNewAttachment_options").attr("disabled", false);
                }

            }
        });
    }
    CancelscanOperation() {
        var _this = this;
        $(this).confirmModal({
            confirmTitle: 'TAB FusionRMS',
            confirmMessage: vrHTMLViewerRes['msgJsConfirmExistScanMode'],
            confirmOk: vrCommonRes['Yes'],
            confirmCancel: vrCommonRes['No'],
            confirmStyle: 'default',
            confirmCallback: function () {
                /*conditions of going to a scanning mode*/
                //scanning mode true 
                _this.isScannig = false;
                //show attachment addingfunction
                //hide delete page from scan button
                $(DomElements.removePageFromscan).parent().hide();
                $(DomElements.attachmentDivButton).show();
                //show ocr button (can't functioning on scaner scenario)
                $(DomElements.OcrdivButton).show();
                //show notes
                $(DomElements.noteidDiv).show();
                //show search ocr text
                $(DomElements.DivCustomSearch1).show();
                //mover user to the click pages tab
                $(pel.attachListDiv).trigger("click");
                //clear the div of pages for new scanning
                $(pel.thumbnailDiv).html("");
                //show pages and attachment tabs
                $("#thumbnailsBookmarksPanel").show();
                //message user they are in scanning mode
                $(DomElements.showFilenameTitle).html('<span style="color:red;">' + vrHTMLViewerRes["msgJsScanningModeCanceled"] + '</span>');
                //hide buttons cancel scan and save scan to a new file
                $(DomElements.saveScanNewAttachmentOption).parent().hide();
                //clear paging scanner object 
                leadtools.VirtualDocumentPages = [];
                $(pel.attachmentBtn).trigger("click");
                _this.RemoveAttachmentfunc();

                var formdata = new FormData();
                formdata.append("keydocument", _this.documentKey);
                var ajaxOptions = {};
                //ajaxOptions.cache = false;
                ajaxOptions.url = "/DocumentViewer/returnListOfAttachment";
                //ajaxOptions.enctype = 'multipart/form-data';
                ajaxOptions.type = "POST";
                ajaxOptions.dataType = "html";
                ajaxOptions.contentType = false;
                ajaxOptions.processData = false;
                ajaxOptions.data = formdata;
                $.ajax(ajaxOptions).done(function (data) {
                    //bind partial view into the dom
                    $("#docviewerPartial_ID").html(data);
                }).fail(function (jqXHR, textStatus) {
                    alert(jqXHR);
                    alert(textStatus);
                });
            }
        });
        /*end conditions*/
    }
    selectScanSource(scanSource) {
        // var _this = this;
        var SourceSelected = $(scanSource).val();
        //this.beginOperation("Selecting Source");
        scanningService.selectSource(SourceSelected, function () {
            // Scanning service - selectSource succeed

        }, function () {
            //Scanning service - selectSource failed
            //alert("Scanning service - selectSource failed");
            showAjaxReturnMessage(vrHTMLViewerRes["msgJsScanningSelectSourceFailed"], "e");
        });
    }
    //shopping cart
    AddAttachmnetsToShoppingCart() {
        var _this = this;
        _this.downloadFilesList = [];
        var attchDownload = $("#attachmentsList li");
        var formdata = new FormData();
        formdata.append("keydocument", _this.documentKey);
        for (var i = 0; i < attchDownload.length; i++) {
            var fileChecked = attchDownload[i].childNodes[1].firstElementChild.checked;
            if (fileChecked) {
                var fileName = attchDownload[i].firstElementChild.innerText;
                var AttachmentSelected = attchDownload.find("a")[i].href;
                var filePath = decodeURI(AttachmentSelected).split("DocumentViewer/")[1];
                //var filePath = AttachmentSelected.split('///')[1];
                if (filePath == undefined) attachmentsBind = false;
                _this.downloadFilesList.push(filePath, fileName);
                var attchNumber = attchDownload[i].childNodes[2].value;
                var versionNumber = attchDownload[i].childNodes[3].value;
                formdata.append("filesList", filePath + "," + fileName + "," + attchNumber + "," + versionNumber);
                // formdata.append("getvalues", fileName);
                // _this.downloadFilesList.push(attachmentsBind);
            }
        }

        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/AddAttachmenToShoppingCart";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            if (data == "true") {
                //alert("your attachments added to attachment cart successfuly!");
                showAjaxReturnMessage(vrHTMLViewerRes["msgJsAttachmentAddedToCart"], "s");
            } else {
                //var messsage = "you attachment didn't add to attachment cart issue:  " + data;
                //alert(messsage);

                var messsage = vrHTMLViewerRes["msgJsAttachmentCartAddIssue"] + data;
                showAjaxReturnMessage(messsage, "w");
            }
        }).fail(function (jqXHR, textStatus) {
            alert(jqXHR);
            alert(textStatus);
        });
    }
    ShoppingCart(ActiveFunc = false, _thisElem) {
        if (ActiveFunc == false) { return; }
        var cartDialog = $(pel.cartListdialog);
        cartDialog.modal("show");
        cartDialog.find("tbody").html("");
        $.getJSON("/DocumentViewer/GetListOfAttachmentUI", function (data) {
            if (data.ErrorMsg == "false") {
                $.each(data.AttachmentCartList, function (k, v) {
                    var desc = v.Record.split(" ")[0];
                    var record = parseInt(v.Record.split(" ")[1]);
                    var tableid = v.Record.split(" ")[1];

                    if (isNaN(record)) {
                        cartDialog.find("tbody").append('<tr dataset.record="' + tableid + '" dataset.table="' + desc + '" dataset.attachNume="' + v.attachNum + '" dataset.version="' + v.attachVer +'" ><td><a href="' + v.filePath + '">' + v.fileName + '</a></td><td>' + v.Record + '</td><td><input type="checkbox"><input type="hidden" value=' + v.Id + ' /></td><tr>');
                    } else {
                        cartDialog.find("tbody").append('<tr dataset.record="' + tableid + '" dataset.table="' + desc + '" dataset.attachNume="' + v.attachNum + '" dataset.version="' + v.attachVer +'" ><td><a href="' + v.filePath + '">' + v.fileName + '</a></td><td>' + desc + " " + record + '</td><td><input type="checkbox"><input type="hidden" value=' + v.Id + ' /></td><tr>');
                    }

                });
            } else {
                alert(data.ErrorMsg);
            }
        }).fail(function () {
            showAjaxReturnMessage(vrHTMLViewerRes["msgJsSomethingWentWrong"], "w");
        });
    }
    ClickOnCartAttachment(_thisDom) {
        var record = _thisDom.parentElement.parentElement.children[1].innerText;
        var fileName = _thisDom.text;
        var attachmentPath = _thisDom.href.split("/DocumentViewer/")[1];
        $(DomElements.checkOutFileDiv).hide();

        $(pel.thumnailBtn).trigger('click');
        try {
            leadtools.documentViewer.setDocument(null);
        } catch (e) {
            //console.log("Developer message" + e.message + " ignore this error as we build the leadtools controllers on the first click of attachment and the click comes before the creation. ");
        }
        $("#cartList_dialog").modal("hide");

        leadtools.loadDocument(attachmentPath);
        $("#showFilename_id").show();
        $("#showFilename_id").html("<span style='color:#666666;font-size: 15px; text-transform: capitalize'>" + vrHTMLViewerRes["msgJsLabelCurrFile"] + " - </span><span style='color:#666666;font-size: 15px'>" + fileName + "</span><span style='margin-left:3px; color:green;'> - " + vrHTMLViewerRes["msgJsRecordLabel"] + ":  " + record + "</span><input type='hidden' value='nothing' />");
    }
    CheckIfFileExistBeforedownloadCart() {
        var _this = this;
        var attachmentsBind;
        _this.downloadFilesList = [];
        var attchDownload = $(pel.cartListdialog).find("tbody tr:even");
        var formdata = new FormData();
        for (var i = 0; i < attchDownload.length; i++) {
            var fileChecked = attchDownload[i].childNodes[2].firstElementChild.checked;
            if (fileChecked) {
                var AttachmentSelected = attchDownload[i].firstElementChild.firstElementChild.href;
                attachmentsBind = decodeURI(AttachmentSelected.split("DocumentViewer/")[1]);
                if (attachmentsBind == undefined) attachmentsBind = false;
                formdata.append("FileToDownload", attachmentsBind);
                //_this.downloadFilesList.push(attachmentsBind);
                _this.downloadFilesList.push({ Path: attachmentsBind, TableName: attchDownload[i].getAttribute("dataset.table"), TableId: attchDownload[i].getAttribute("dataset.record"), AttachNum: attchDownload[i].getAttribute("dataset.attachnume"), AttachVer: attchDownload[i].getAttribute("dataset.version") })
            }
        }
        if (_this.downloadFilesList.length > 0) {
            _this.DownloadAttachment(attachmentsBind);
        }
        else {
            //FUS-6299: [Usability] - Add a Waring message when user click directly on Download in Attachment Cart
            showAjaxReturnMessage(vrHTMLViewerRes["msgJSAttachmentCartAtleastOneRec"], "w");
        }

    }
    RemoveFromCart() {
        var _this = this;
        var cartDialog = $(pel.cartListdialog);
        var attachmentsToDeleteServer = [];
        var attachmentsToDeleteUI = [];

        var attchDownload = $(pel.cartListdialog).find("tbody tr:even");
        var formdata = new FormData();
        for (var i = 0; i < attchDownload.length; i++) {
            var fileChecked = attchDownload[i].childNodes[2].firstElementChild.checked;
            if (fileChecked) {
                var id = attchDownload[i].childNodes[2].childNodes[1].value;
                formdata.append("ListId", id);
                attachmentsToDeleteServer.push(id);
                attachmentsToDeleteUI.push(attchDownload[i]);
            }
        }

        if (attachmentsToDeleteServer.length > 0) {
            var ajaxOptions = {};
            ajaxOptions.url = "/DocumentViewer/RemoveAttachmentFromCart";
            ajaxOptions.type = "POST";
            ajaxOptions.dataType = "json";
            ajaxOptions.contentType = false;
            ajaxOptions.processData = false;
            ajaxOptions.data = formdata;
            $.ajax(ajaxOptions).done(function (data) {
                if (data.ErrorMsg == "false") {
                    for (var i = 0; i < attachmentsToDeleteUI.length; i++) {
                        attachmentsToDeleteUI[i].children[2].children[0].checked = false;
                        attachmentsToDeleteUI[i].hidden = true;
                    }
                } else {
                    alert(data.ErrorMsg);
                }

            }).fail(function (jqXHR, textStatus) {
                alert(jqXHR);
                alert(textStatus);
            });
        }
        else {
            //FUS-6300: [Usability] - Add a Waring message when user click directly on Remove in Attachment Cart
            showAjaxReturnMessage(vrHTMLViewerRes["msgJSAttachmentCartAtleastOneRec"], "w");
        }
    }
    //dragAnddropFiles
    DragAnddropNewFileToclips() {
        var _this = this;
        var newFile = document.getElementById("attachmentDivButton_id");
        newFile.ondrop = function (e) {
            e.preventDefault();
            const Hasaddpermission = _this.SecurePermissions("Add");
            const HasOutputPermission = _this.ValidateOutputSettings("Add");
            if (Hasaddpermission != true || HasOutputPermission != true) {
                showAjaxReturnMessage(vrHTMLViewerRes["msgJsAddAttachmentPermission"], "w");
                newFile.style.border = "1px solid white";
                return;
            }
            _this.Storefile = e.dataTransfer.files;
            if (_this.Storefile.length > 1) {
                func.AddmultipleFiles(_this.Storefile);
                newFile.style.border = "1px solid white";
            } else {
                _this.CallFromDragDrop = true;
                func.UploadAttachment(true, _this.Storefile);
                newFile.style.border = "1px solid white";
            }
        };
        newFile.ondragover = function () {
            newFile.style.border = "1px dashed gray";
            return false;
        };
        newFile.ondragleave = function () {
            newFile.style.border = "1px solid white";
            return false;
        };
    }
    DragAnddropNewFileToDiv() {
        var _this = this;
        var newFile = document.getElementById("attachmentsList");
        newFile.ondrop = function (e) {
            e.preventDefault();
            const Hasaddpermission = _this.SecurePermissions("Add");
            const HasOutputPermission = _this.ValidateOutputSettings("Add");
            if (Hasaddpermission != true || HasOutputPermission != true) {
                showAjaxReturnMessage(vrHTMLViewerRes["msgJsAddAttachmentPermission"], "w");
                newFile.style.border = "1px solid white";
                return;
            }
            _this.Storefile = e.dataTransfer.files;
            if (_this.Storefile.length > 1) {
                func.AddmultipleFiles(_this.Storefile);
                newFile.style.border = "1px solid white";
            } else {
                _this.CallFromDragDrop = true;

                func.UploadAttachment(true, _this.Storefile);
                newFile.style.border = "1px solid white";
            }
        };
        newFile.ondragover = function () {
            newFile.style.border = "5px dashed gray";
            return false;
        };
        newFile.ondragleave = function () {
            newFile.style.border = "1px solid white";
            return false;
        };
    }
    DragAndDropPages() {
        var _this = this;
        var newPage = document.getElementById("thumbnailsTab");
        newPage.ondrop = function (e) {
            e.preventDefault();
            var files = e.dataTransfer.files;
            if (files.length > 1) {
                //alert("you can add one file at the time!!");
                showAjaxReturnMessage(vrHTMLViewerRes["msgJsDragAndDropOneFile"], "w");
                newPage.style.border = "1px solid white";
                return;
            }
            _this.AddpagesFromDrag(files);
            newPage.style.border = "1px solid white";
        };

        newPage.ondragover = function () {
            newPage.style.border = "5px dashed gray";
            return false;
        };
        newPage.ondragleave = function () {
            newPage.style.border = "1px solid white";
            return false;
        };

    }
    AddpagesFromDrag(files) {
        var _this = this;
        var fileUpload = files[0];
        var FileSizebytes = fileUpload.size;

        if (fileUpload.type == "text/plain") {
            //alert("Can't add txt file as a page!");
            showAjaxReturnMessage(vrHTMLViewerRes["msgJsCantAddTXTFile"], "w");
            return;
        }
        var uploadPromise = lt.Documents.DocumentFactory.uploadFile(fileUpload);
        uploadPromise.done(function (uploadedDocumentUrl) {
        }).fail(error => { console.log(error) })
            .always(function (CachFile) {
                _this.AddpageToExistingDoc(CachFile);
            });
        uploadPromise.progress(function (percentage) {
            _this.AddingpagesProgressBar(Math.round(percentage.progress), FileSizebytes);
            if (_this.cancelUpload == true) {
                uploadPromise.abort();
                cancelupload = false;
            }
        });
    }
    //search word OCR
    SearchForText(ActiveFunc = false, _thisElem) {
        var _this = this;
        if (ActiveFunc === false || leadtools.isDocumentPlaced == false) return;
        var text = leadtools.documentViewer.text;
        var Gettext = $("#txtSearch_id").val();
        var outputText = $("#textOutput_id");
        if (Gettext.length >= 3) {
            text.autoGetText = true;
            var options = new lt.Documents.UI.DocumentViewerFindText();
            options.text = Gettext;
            options.matchCase = false;
            options.wholeWordsOnly = false;
            options.findAll = false;
            //must be true if you want to change color
            options.renderResults = true;
            lt.Documents.UI.DocumentViewerText.foundTextFill = "rgba(252, 252, 3, .5)";
            var isFindingNext = true;
            var bottomOfLastPage = lt.Documents.UI.DocumentViewerTextPosition.createEndOfPage(leadtools.documentViewer.pageCount);
            //Add this code for optimizing OCR search
            // this code is calling the database and check which pages the keyword located in.
            // this code requires Full text OCR to run before using it.
            //in case you didn't run full text OCE the search will start from the first page.
            var topOfFirstPage;
            if (_thisElem == "pre") {
                _this.PreviousTextFind(options, topOfFirstPage, bottomOfLastPage);
            } else {
                _this.previousList.push(leadtools.documentViewer.currentPageNumber);
                //now its hard coded - we will implement ajax call to get the proper dynamic array.
                if (_this.onSearchChang != Gettext) {
                    //clear the previous array.
                    _this.previousList = [];
                    //if (_this.getPagesArray === true) {
                    _this.pagesArrayList = _this.CallFullTextOCR(Gettext);
                    _this.getPagesArray = false;
                    _this.onSearchChang = Gettext;
                    _this.previousList = [];
                    //}
                }
                if (leadtools.documentViewer.pageCount > 50 && _this.pagesArrayList.length !== 0) {
                    for (var i = 0; i < _this.pagesArrayList.length; i++) {
                        if (i === 0) {
                            var pageNumber = _this.pagesArrayList[i].PageNumber;
                            topOfFirstPage = lt.Documents.UI.DocumentViewerTextPosition.createBeginOfPage(pageNumber);
                            _this.pagesArrayList.shift();
                            //if (_this.pagesArrayList.length === 0) _this.getPagesArray = true;
                            break;
                        }
                    }
                } else {
                    //topOfFirstPage = lt.Documents.UI.DocumentViewerTextPosition.createBeginOfPage(1);
                }

                if (isFindingNext) {
                    // Make the beginning bound "higher up" the page so we search "down" the page.
                    options.beginPosition = topOfFirstPage;
                    options.endPosition = bottomOfLastPage;
                }
                else {
                    // Make the beginning bound "lower down" the page so we search "up" the page. 
                    options.beginPosition = bottomOfLastPage;
                    options.endPosition = topOfFirstPage;
                }
                options.selectFirstResult = true;
                if (text.hasAnySelectedText) {
                    // Setting this value to AfterSelection allows us to search forward from the selection, so multiple 
                    // uses of this same options object will cycle us through all the matches! 
                    // (If no selected text actually exists, search will default to beginPosition.) 
                    options.start = lt.Documents.UI.DocumentViewerFindTextStart.afterSelection;

                }
                else {
                    // We could start at the begin position, but it makes more UI sense to start from the user's current page. 
                    // Search will loop back around to the begin position - this just changes the starting point and order of results. 
                    options.start = lt.Documents.UI.DocumentViewerFindTextStart.manualPosition;
                    if (isFindingNext)
                        options.manualStartPosition = lt.Documents.UI.DocumentViewerTextPosition.createBeginOfPage(leadtools.documentViewer.currentPageNumber);
                    else
                        options.manualStartPosition = lt.Documents.UI.DocumentViewerTextPosition.createEndOfPage(leadtools.documentViewer.currentPageNumber);
                }
            }


            text.clearRenderedFoundText();
            outputText.show();
            outputText.text(vrHTMLViewerRes["msgJsSearchingPlzWait"]);
            text.find(options, function (results) {
                var resultsCount = results !== null ? results.length : 0;
                var resultText;
                if (resultsCount > 0) {
                    //resultText = "use arrows to find next and previous" //"Found " + resultsCount + " results for '" + options.text + "'.";
                    outputText.text(resultText);
                    outputText.text("");
                } else {
                    resultText = vrHTMLViewerRes["msgJsNoMatchFound"];
                    outputText.text(resultText);
                }
            });
        } else {
            //text.clearLastFindText();
            //text.clearRenderedFoundText()
            outputText.text("");
        }
    }
    PreviousTextFind(options, topOfFirstPage, bottomOfLastPage) {
        var _this = this;
        var pre = _this.previousList.reverse();
        for (var i = 0; i < pre.length; i++) {
            var pageNum = pre[i];
            topOfFirstPage = lt.Documents.UI.DocumentViewerTextPosition.createBeginOfPage(pageNum);
            options.beginPosition = topOfFirstPage;
            options.endPosition = bottomOfLastPage;
            _this.previousList.shift();
            break;
        }
    }
    CallFullTextOCR(Search) {
        var _this = this;
        var listOfPages = 0;
        var formdata = new FormData();
        formdata.append('variables', _this.documentKey);
        formdata.append('variables', _this.documentNumber);
        formdata.append('variables', _this.versionNumber);
        formdata.append('variables', Search);

        var ajaxOptions = {};
        ajaxOptions.async = false;
        ajaxOptions.url = "/DocumentViewer/OCRSearchIndataBase";
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            listOfPages = data;
        }).fail(function (jqXHR, textStatus) {

        });
        return listOfPages;
    }

    //Note for attachment
    Getnotes() {
        var _this = this;
        var NoteDialog = $(pel.notedialog);
        NoteDialog.modal("show");
        NoteDialog.find("tbody").html("");

        var formdata = new FormData();
        formdata.append('variables', _this.pointerID);

        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/GetListofNotes";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            $.each(data, function (k, v) {
                //var fullDate = _this.ConvertDateAndTime(v);
                var fullDate = v.NoteDateTime;
                if (_this.userName == v.UserName) {
                    NoteDialog.find("tbody").append('<tr><td>' + fullDate + '</td><td><textarea id="changeEditNote" rows="2" cols="50">' + v.Annotation1 + '</textarea></td><td>' + v.UserName + '</td><td id="delnote" style="cursor: pointer;" class="glyphicon glyphicon-trash"><input type="hidden" value="' + v.Id + '" /></td><tr>');
                } else {
                    NoteDialog.find("tbody").append('<tr><td>' + fullDate + '</td><td><textarea disabled="disabled" id="changeEditNote" rows="2" cols="50">' + v.Annotation1 + '</textarea></td><td>' + v.UserName + '</td><td style="cursor: pointer;">-<input type="hidden" value="' + v.Id + '" /></td><tr>');
                }

            });
        }).fail(function () {

        });
    }
    DeleteNote(id, userNameCreated) {
        var _this = this;
        if (_this.userName !== userNameCreated) { return; }
        var NoteDialog = $(pel.notedialog);
        var formdata = new FormData();
        formdata.append('variables', id);
        formdata.append('variables', _this.pointerID);

        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/DeleteNote";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            //condition for Note
            var note = document.getElementById("Noteid");
            if (data.length > 0) {
                note.style.backgroundColor = "greenyellow";
            } else {
                note.style.backgroundColor = "white";
            }
            NoteDialog.find("tbody").html("");
            $.each(data, function (k, v) {
                var fullDate = _this.ConvertDateAndTime(v);
                if (_this.userName == v.UserName) {
                    NoteDialog.find("tbody").append('<tr><td>' + fullDate + '</td><td><textarea id="changeEditNote" rows="2" cols="50">' + v.Annotation1 + '</textarea></td><td>' + v.UserName + '</td><td id="delnote" style="cursor: pointer;" class="glyphicon glyphicon-trash"><input type="hidden" value="' + v.Id + '" /></td><tr>');
                } else {
                    NoteDialog.find("tbody").append('<tr><td>' + fullDate + '</td><td><textarea disabled="disabled" id="changeEditNote" rows="2" cols="50">' + v.Annotation1 + '</textarea></td><td>' + v.UserName + '</td><td style="cursor: pointer;">-<input type="hidden" value="' + v.Id + '" /></td><tr>');
                }
            });
            parseInt(_this.AccessProp.parentElement.childNodes[6].value--);
        }).fail(function (e) {

        });
    }
    AddnewNote(text) {
        var _this = this;
        var NoteDialog = $(pel.notedialog);
        var formdata = new FormData();
        formdata.append('variables', _this.pointerID);
        formdata.append('variables', _this.userName);
        formdata.append('variables', text);
        formdata.append('variables', _this.RecordType);

        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/AddNewNote";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            var note = document.getElementById("Noteid");
            if (data.length > 0) {
                note.style.backgroundColor = "greenyellow";
            } else {
                note.style.backgroundColor = "white";
            }
            $.each(data, function (k, v) {
                var fullDate = _this.ConvertDateAndTime(v);
                NoteDialog.find("tbody").prepend('<tr><td>' + fullDate + '</td><td><textarea id="changeEditNote" rows="2" cols="50">' + v.Annotation1 + '</textarea></td><td>' + v.UserName + '</td><td id="delnote" style="cursor: pointer;" class="glyphicon glyphicon-trash"><input type="hidden" value="' + v.Id + '" /></td><tr>');
            });
            parseInt(_this.AccessProp.parentElement.childNodes[6].value++);
        }).fail(function (e) {

        });
    }
    EditNote(text, id) {
        var _this = this;
        var NoteDialog = $(pel.notedialog);
        var formdata = new FormData();
        formdata.append('variables', id);
        formdata.append('variables', text);

        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/EditNewNote";
        //ajaxOptions.enctype = 'multipart/form-data';
        ajaxOptions.type = "POST";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = formdata;
        $.ajax(ajaxOptions).done(function (data) {
            if (data == "saved") {
                console.log("developer message: the data saved successfuly!");
            }
        }).fail(function (e) {
            console.log(e.message);
        });
    }
    ConvertDateAndTime(value) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value.NoteDateTime);
        var dt = new Date(parseFloat(results[1]));
        var dd = dt.getDate();
        var mm = dt.getMonth();
        mm++;
        if (dd < 10) { dd = '0' + dd; }
        if (mm < 10) { mm = '0' + mm; }
        var getdate = dt.getFullYear() + "-" + mm + "-" + dd;
        return getdate;
    }
    GenerateTimeAndDate() {
        var _this = this;
        var ajaxOptions = {};
        //ajaxOptions.cache = false;
        ajaxOptions.url = "/DocumentViewer/GenerateDate";
        ajaxOptions.async = false;
        ajaxOptions.type = "GET";
        ajaxOptions.dataType = "json";
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        $.ajax(ajaxOptions).done(function (data) {
            _this.TodayDate = data;
        }).fail(function (e) {

        });
        return _this.TodayDate;
    }

    //call from search grid 
    CheckCallFromSearchGrid() {
        if (getCookie("searchInput") != null) {
            var _this = this;
            $("#txtSearch_id").val(getCookie("searchInput"));
            var e = jQuery.Event("keypress");
            e.which = 13;
            $("#txtSearch_id").keypress(function () { }).trigger(e);
            //delete cookie on server after find the text in the doc, then deltete cookie.
            $.get("/documentViewer/deleteCookie", function (data) { });
        }





    }

}

class Dialogs {
    constructor() {
    }
    //property info model
    documentProperties_Dialog(document) {
        func.GetIscheckOutNcheckOutToMeProps(true);
        document = leadtools.documentViewer.document;
        //get dialog id 
        if (leadtools.isDocumentPlaced != true) return;
        this.documentPropertiesDlg = "#documentPropertiesDialog";
        this.DialogContentInfo = "#documentInfo";
        this.Metadata = "#metadata";

        //create data object to dom
        this.documentInfo = new Array();
        this.documentInfo["Description"] = $("#showFilename_id")[0].childNodes[3].textContent;
        this.documentInfo["Attachment Id"] = func.documentNumber;
        this.documentInfo["Tracking Id"] = func.trackingId;
        this.documentInfo["Pointer Id"] = parseInt(func.pointerID);
        this.documentInfo["File Name"] = document.name;
        if (getCookie("lastUsername") == "administrator") {
            var getCleanUri = decodeURIComponent(document.uri);
            this.documentInfo["URL"] = getCleanUri;
        }
        this.documentInfo["MIME Type"] = document.mimeType;
        this.documentInfo["Check out status"] = func.isCheckout == 0 ? "Checked In" : "Checked Out";

        var documentInfo = this.documentInfo;
        var tableInfo = "";
        for (var key in documentInfo) {
            if (documentInfo.hasOwnProperty(key)) {
                var value = documentInfo[key];
                var length = value ? value.length : 0;
                tableInfo += "<tr>";
                tableInfo += "<td>" + key + "</td>";
                tableInfo += "<td><span class='documentInfoField'>" + value + "</span></td>";
                tableInfo += "</tr>";
            }
        }
        $(this.DialogContentInfo).html(tableInfo);
        $(this.documentPropertiesDlg).modal('show');
    }
    //print model 
    PrintDocument_Dialog(documentObject) {
        //set print all to default
        $("#printDialog").find('label')[0].firstElementChild.checked = true;
        var printD = new PrintDlg();
        var doc = documentObject.document;
        // Get the starting orientation
        var orientation = lt.Documents.UI.PrintOrientation.portrait;
        if (doc) {
            var size = doc.pages.item(0).size;
            if (size.width > size.height)
                orientation = lt.Documents.UI.PrintOrientation.landscape;
        }
        printD.show(documentObject, documentObject.currentPageNumber, orientation);
        document.getElementById("pages").value = "";
    }
}

var leadtools = new TabLTApplication();
const func = new FunctionsCall();

//checking scanning service on page load











