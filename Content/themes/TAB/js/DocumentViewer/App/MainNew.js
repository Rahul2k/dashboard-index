/// <reference path="MainNew.js" />
/// <reference path="~/js/jquery-2.2.4.min.js" />
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.js" />
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Controls.js" />
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.Automation.js" />
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.Designers.js" />
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.Core.js" />
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.Documents.js" />
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.JavaScript.js" />
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Annotations.Rendering.JavaScript.js" />
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Documents.js" />
/// <reference path="~/Content/themes/TAB/js/LeadTools/Leadtools.Documents.UI.js" />
/// <reference path="~/Content/themes/TAB/js/jQuery-2.1.3min.js" />


//dictionaty Leadtools application;
//lt = object that direct to all leadtools libraries.
//TabLTApplication = class object for documents stracture.
//TabLTApplication.CheckLicense = check license in serviceConfig.json file in the run time.
//TabLTApplication.loadDocument = function call to load new document to the dom.
//TabLTApplication.viewPart = function to call zooming features on the dom.
//TabLTApplication.updateView = function that run on view changes

// start of classes
class TabLTApplication {
    constructor() {
        this.checkLicense();
    }
    //so here is the license as you know
    checkLicense() {
        return new Promise((resolve, reject) => {
            $.getJSON("../serviceConfig.json", { _: new Date().getTime() })
                .done(function (json) {
                    lt.Documents.DocumentFactory.serviceHost = (json && json["serviceHost"] !== undefined) ? json["serviceHost"] : null;
                    lt.Documents.DocumentFactory.servicePath = (json && json["servicePath"] !== undefined) ? json["servicePath"] : null;
                    lt.Documents.DocumentFactory.serviceApiPath = (json && json["serviceApiPath"] !== undefined) ? json["serviceApiPath"] : "api";
                    resolve();
                })
                .fail(function () {
                    alert("no License - (Temprory message Reggie)")
                    reject();
                });
        });
    }
    loadDocument(FilePath) {
        this.Dialog = new Dialogs();
        this.documentContainer = {
            //filepath: "#filePath",
            imageViewerDiv: "#imageViewerDiv",
            thumbnailsTab: "#thumbnailsTab",
            DocumentObjectFunctionsOnOff: "#DocumentObjectFunctionsOnOff"
        }
        //this.filepath = $(this.documentContainer.filepath).val();
        $(this.documentContainer.imageViewerDiv).html("")
        $(this.documentContainer.thumbnailsTab).html("")
        this.createOptions = new lt.Documents.UI.DocumentViewerCreateOptions();
        this.createOptions.viewCreateOptions.useElements = false;
        this.createOptions.thumbnailsCreateOptions.useElements = false;
        this.createOptions.thumbnailsContainer = document.getElementById("thumbnailsTab");
        this.createOptions.viewContainer = document.getElementById("imageViewerDiv");
        this.documentViewer = lt.Documents.UI.DocumentViewerFactory.createDocumentViewer(this.createOptions);
        this.documentViewer.view.imageViewer.enableRequestAnimationFrame = true;
        this.documentViewer.view.lazyLoad = true;
        this.documentViewer.thumbnails.lazyLoad = true;
        this.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactivePanZoom);
        this.documentViewer.view.preferredItemType = lt.Documents.UI.DocumentViewerItemType.svg;
        this.documentViewer.thumbnails.imageViewer.viewHorizontalAlignment = lt.Controls.ControlAlignment.center;
        //_this.documentViewer.thumbnails.imageViewer.imageBorderThickness = 2;

        this.loadOption = new lt.Documents.LoadDocumentOptions();
        this.loadOption.maximumImagePixelSize = 2048;
        this.documentViewer.view.imageViewer.enableRequestAnimationFrame = true;
        this.documentViewer.view.lazyLoad = true;
        this.documentViewer.thumbnails.lazyLoad = true;
        lt.Documents.DocumentFactory.loadFromUri(FilePath, this.loadOption)
            .done((document) => {
                this.documentViewer.setDocument(document);
                //this.viewPart(this.documentViewer, this.Dialog);
                //conditions after doc object created if doc created then activate all functions;
                if (this.documentViewer.hasDocument) {
                    $(this.documentContainer.DocumentObjectFunctionsOnOff).show();
                    $(this.viewPart(this.documentViewer, this.Dialog));
                    $(this.updatePage(this.documentViewer, ""));
                }
            })
            .fail(function (jqXHR, statusText, errorThrown) {
                var serviceError = lt.Document.ServiceError.parseError(jqXHR, statusText, errorThrown);
                lt.LTHelper.log(serviceError);
                var lines = [];
                lines.push("Document Viewer Error:");
                lines.push(serviceError.message);
                lines.push(serviceError.detail);
                lines.push("See console for details.");
                alert(lines.join("\n"));
            });
    }
    viewPart(DocView, dialog) {
        var _this = this;
        //here basically I mapped all the dom into an object and call by the time.
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
            fitWidthBtn: "#fitWidth_shortcut",
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
            _this.updatePage(DocView, "ThumbnailsClick")
        });

        //nextPage
        $(this.shortcuts_page.nextPageBtn).on("click", function () {
            _this.updatePage(DocView, "nextPage")
        });
        //previousPage
        $(this.shortcuts_page.previousPageBtn).on("click", function () {
            _this.updatePage(DocView, "previousPage")
        });

        //enterPage
        $(this.shortcuts_page.pageNumberTextInput).on("keypress", function (e) {
            var value = $(this).val();
            if (e.keyCode == 13) {
                if (value <= DocView.pageCount && value > 0) {
                    DocView.gotoPage(value);
                } else {
                    alert("Page not found");
                }
            }
        });
        /*End paging*/

        var txtName = "";
        //fitAlways
        $(this.headerToolbar_ViewMenu_click.fitMenuItem).on("click", function () {
            DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.fitAlways, 1, DocView.view.imageViewer.defaultZoomOrigin);
            txtName = $(this).text();
            _this.updateView(DocView, _this, txtName)
        });
        //ActualSize
        $(this.headerToolbar_ViewMenu_click.actualSizeMenuItem).on("click", function () {
            DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.actualSize, 1, DocView.view.imageViewer.defaultZoomOrigin);
            txtName = $(this).text();
            _this.updateView(DocView, _this, txtName)
        });
        //fitWidth
        $(this.headerToolbar_ViewMenu_click.fitWidthMenuItem).on("click", function () {
            DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.fitWidth, 1, DocView.view.imageViewer.defaultZoomOrigin)
            txtName = $(this).text();
            _this.updateView(DocView, _this, txtName)
        });
        //fitHeight
        $(this.headerToolbar_ViewMenu_click.fitHeightMenuItem).on("click", function () {
            DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.fitHeight, 1, DocView.view.imageViewer.defaultZoomOrigin)
            txtName = $(this).text();
            _this.updateView(DocView, _this, txtName)
        });

        //zoomIn
        $(this.headerToolbar_ViewMenu_click.zoomInMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewZoomIn)
            _this.updateView(DocView, _this, "")
        });
        //zoomOut
        $(this.headerToolbar_ViewMenu_click.zoomOutMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewZoomOut);
            _this.updateView(DocView, _this, "")
        });
        //rotateCounterClockwise
        $(this.headerToolbar_ViewMenu_click.rotateCounterClockwiseMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewRotateCounterClockwise)
        });
        //
        //rotateClockwiseMenuItem
        $(this.headerToolbar_ViewMenu_click.rotateClockwiseMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewRotateClockwise);
        });

        //singlePageDisplayMenuItem
        $(this.headerToolbar_PageMenu.singlePageDisplayMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.layoutSingle)
        });

        //doublePagesDisplayMenuItem
        $(this.headerToolbar_PageMenu.doublePagesDisplayMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.layoutDouble)
        });

        //verticalPagesDisplayMenuItem
        $(this.headerToolbar_PageMenu.verticalPagesDisplayMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.layoutVertical)
        });

        //horizontalPagesDisplayMenuItem
        $(this.headerToolbar_PageMenu.horizontalPagesDisplayMenuItem).on("click", function () {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.layoutHorizontal)
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
                    if (text != null && text != "") {
                        var percentage = parseFloat(text.substring(0, text.length - 1));
                        DocView.view.imageViewer.zoom(lt.Controls.ControlSizeMode.none, percentage / 100, DocView.view.imageViewer.defaultZoomOrigin);
                    }
                    break;
            }
        });

        $(this.shortcuts.zoomInBtn).on("click", function (e) {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewZoomIn)
            _this.updateView(DocView, _this, "")
        });

        $(this.shortcuts.zoomOutBtn).on("click", function (e) {
            DocView.commands.run(lt.Documents.UI.DocumentViewerCommands.viewZoomOut)
            _this.updateView(DocView, _this, "")
        });

        //Init dialogs
        //documents property
        $(this.headerToolbar_ViewMenu_click.documentProperties).on("click", function (e) {
            dialog.documentProperties_Dialog(DocView.document);
        });
        //pringing dialog
        $(this.headerToolbar_ViewMenu_click.printDialog).on("click", function (e) {
            e.preventDefault();
            dialog.PrintDocument_Dialog(DocView)
        })
    }
    updateView(DocView, elements, txtName) {
        if (DocView.hasDocument) {
            var percentage = DocView.view.imageViewer.scaleFactor * 100.0;
            if (elements.shortcuts.zoomValuesSelectElement.customZoomValue !== percentage) {
                elements.shortcuts.zoomValuesSelectElement.customZoomValue = percentage;
                $(elements.shortcuts.zoomValuesSelectElement.currentZoomValueOption).text(percentage.toFixed(1) + "%")
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
                if (CurrentNumber == 1) {
                    $(this.shortcuts_page.previousPageBtn).attr("disabled", true);
                } else {
                    $(this.shortcuts_page.previousPageBtn).attr("disabled", false);
                }
                if (CurrentNumber == PageCount) {
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
                } else if (pageUp == PageCount) {
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
}
//I built this class specially for dialogs as you see.
class Dialogs {
    constructor() {
    }
    //property info model
    documentProperties_Dialog(document) {
        //get dialog id 
        this.documentPropertiesDlg = "#documentPropertiesDialog";
        this.DialogContentInfo = "#documentInfo";
        this.Metadata = "#metadata";

        //create data object to dom
        this.documentInfo = new Array();
        this.documentInfo["Document ID"] = document.documentId;
        this.documentInfo["Name"] = document.name;
        this.documentInfo["URL"] = document.uri;
        this.documentInfo["MIME Type"] = document.mimeType;
        this.documentInfo["Encrypted"] = document.isDecrypted ? "Yes" : "No";
        if (document.annotations.annotationsUri != null) {
            this.documentInfo["Annotations URL"] = document.annotations.annotationsUri;
        }
        this.documentInfo["Pages"] = document.pages.count.toString();
        this.documentInfo["Cache Status"] = document.cacheStatus === lt.Documents.DocumentCacheStatus.synced ? "Synced" : "Not Synced";
        this.documentInfo["Last Synced"] = document.lastCacheSyncTime.toString();
        if (document.pages.count > 0) {
            this.page = document.pages.item(0);
            this.pageSize = this.page.size;
            this.sizeInches = lt.LeadSizeD.create(this.pageSize.width / lt.Documents.Document.unitsPerInch, this.pageSize.height / lt.Documents.Document.unitsPerInch);
            this.sizeMm = lt.LeadSizeD.create(this.sizeInches.width * 25.4, this.sizeInches.height * 25.4);
            this.sizePixels = document.sizeToPixels(this.pageSize);
            this.documentInfo["Page size"] = this.sizeInches.width.toFixed(3) + " x " + this.sizeInches.height.toFixed(3) + " in, " + this.sizeMm.width.toFixed(3) + " x " + this.sizeMm.height.toFixed(3) + " mm, " + this.sizePixels.width.toString() + " x " + this.sizePixels.height.toString() + " px";
        }
        //table info
        var documentInfo = this.documentInfo;
        var tableInfo = "";
        for (var key in documentInfo) {
            if (documentInfo.hasOwnProperty(key)) {
                var value = documentInfo[key];
                var length = value ? value.length : 0;
                tableInfo += "<tr>";
                tableInfo += "<td>" + key + "</td>";
                tableInfo += "<td><input type='text' value='" + value + "' size='" + length + "' class='documentInfoField' readonly /></td>";
                tableInfo += "</tr>";
            }
        }
        $(this.DialogContentInfo).html(tableInfo);

        //metaData 
        var tableMeta = "";
        var metadata = document.metadata;
        for (var key in metadata) {
            if (metadata.hasOwnProperty(key)) {
                var value = metadata[key];
                var date = new Date(Date.parse(value));
                value = date.toString();
                var length = value ? value.length : 0;
                tableMeta += "<tr>";
                tableMeta += "<td>" + key + "</td>";
                tableMeta += "<td><input type='text' value='" + value + "' size='" + length + "' class='metadataInfoField' readonly /></td>";
                tableMeta += "</tr>";
            }
        }
        $(this.Metadata).html(tableMeta);
        $(this.documentPropertiesDlg).modal('show')
    }
    //print model 
    PrintDocument_Dialog(documentObject) {
        debugger;
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
    }

}


const leadtools = new TabLTApplication();

$(document).ready(function () {
    //leadtools.loadDocument()
});



// end of classes you don't have the file







