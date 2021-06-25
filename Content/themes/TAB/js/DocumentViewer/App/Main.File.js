var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        // Contains the file part
        var FilePart = (function () {
            function FilePart(main) {
                // Reference to the DocumentViewerDemoApp
                this._mainApp = null;
                // File menu items
                this.headerToolbar_FileMenu = {
                    uploadDocumentMenuItem: "#uploadDocument",
                    openDocumentFromUrlMenuItem: "#openDocumentFromUrl",
                    loadDocumentFromCacheMenuItem: "#loadDocumentFromCache",
                    openFromDocumentStorageMenuItem: "#openFromDocumentStorage",
                    saveDocumentMenuItem: "#saveDocument",
                    saveToCacheMenuItem: "#saveToCache",
                    printMenuItem: "#print",
                    closeDocumentMenuItem: "#closeDocument",
                    menuDivider: ".divider.fileMenuDivider",
                    exportTextMenuItem: "#exportText",
                    documentPropertiesMenuItem: "#documentProperties"
                };
                // Shortcuts
                this.shortcuts = {
                    ocrSaveBtn: "#ocrSave_shortcut",
                };
                // Help menu items
                this.headerToolbar_HelpMenu = {
                    aboutMenuItem: "#about"
                };
                this.mobileVersionMainControls = {
                    mainControls: "#mainControls",
                    mainControlsItems: ".mainControlsItem"
                };
                this._mainApp = main;
                this.initFileUI();
            }
            FilePart.prototype.initFileUI = function () {
                var _this = this;
                // File menu
                var isIOS = (lt.LTHelper.device == lt.LTDevice.mobile || lt.LTHelper.device == lt.LTDevice.tablet) && (lt.LTHelper.OS == lt.LTOS.iOS);
                var isIE9OrBelow = (lt.LTHelper.browser == lt.LTBrowser.internetExplorer && lt.LTHelper.version <= 9);
                if (isIE9OrBelow || isIOS) {
                    // Hide the upload document button, for mobiles and tablets running iOS,
                    // since only images are accessible for upload
                    // Hide from IE9 and below, since FileReader is not supported
                    $(this.headerToolbar_FileMenu.uploadDocumentMenuItem).hide();
                }
                else {
                    // bind to click as normal
                    $(this.headerToolbar_FileMenu.uploadDocumentMenuItem).bind("click", $.proxy(this.uploadDocumentMenuItem_Click, this));
                }
                $(this.headerToolbar_FileMenu.openDocumentFromUrlMenuItem).bind("click", $.proxy(this.openDocumentFromUrlMenuItem_Click, this));
                $(this.headerToolbar_FileMenu.loadDocumentFromCacheMenuItem).bind("click", $.proxy(this.loadDocumentFromCacheMenuItem_Click, this));
                if (isIE9OrBelow) {
                    // We do not support IE9 and below opening from external sources, so hide the menu item
                    $(this.headerToolbar_FileMenu.openFromDocumentStorageMenuItem).hide();
                }
                else {
                    // bind as normal
                    $(this.headerToolbar_FileMenu.openFromDocumentStorageMenuItem).bind("click", $.proxy(this.openFromDocumentStorageMenuItem_Click, this));
                }
                $(this.headerToolbar_FileMenu.saveDocumentMenuItem).bind("click", $.proxy(this.saveDocumentMenuItem_Click, this));
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Default || this._mainApp.demoMode == DocumentViewerDemo.DemoMode.OCR) {
                    $(this.shortcuts.ocrSaveBtn).click(this.saveDocumentMenuItem_Click.bind(this));
                }
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Default) {
                    $(this.headerToolbar_FileMenu.saveToCacheMenuItem).bind("click", $.proxy(this.saveToCacheMenuItem_Click, this));
                }
                $(this.headerToolbar_FileMenu.printMenuItem).bind("click", $.proxy(this.printMenuItem_Click, this));
                $(this.headerToolbar_FileMenu.closeDocumentMenuItem).bind("click", $.proxy(this.closeDocumentMenuItem_Click, this));
                $(this.headerToolbar_FileMenu.exportTextMenuItem).bind("click", $.proxy(this.exportTextMenuItem_Click, this));
                $(this.headerToolbar_FileMenu.documentPropertiesMenuItem).bind("click", $.proxy(this.documentPropertiesMenuItem_Click, this));
                // Only for mobile version
                if (DocumentViewerDemo.DocumentViewerDemoApp.isMobileVersion) {
                    $(this.mobileVersionMainControls.mainControlsItems).bind("click", $.proxy(this.mainControlsItems_itemClicked, this));
                    $(this._mainApp.headerToolbarContainer).focusout(function (e) { return _this.headerToolbarContainer_focusout(e); });
                }
                // Help menu
                $(this.headerToolbar_HelpMenu.aboutMenuItem).bind("click", $.proxy(this.aboutMenuItem_Click, this));
            };
            FilePart.prototype.bindElements = function () {
                // File menu
                var elements = this._mainApp.commandsBinder.elements;
                var element;
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Default || this._mainApp.demoMode == DocumentViewerDemo.DemoMode.OCR) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.userInterfaceElement = $(this.headerToolbar_FileMenu.saveDocumentMenuItem);
                    element.hasDocumentEmptyEnabled = false;
                    elements.push(element);
                }
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.headerToolbar_FileMenu.closeDocumentMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.headerToolbar_FileMenu.menuDivider);
                elements.push(element);
                if (this._mainApp.demoMode != DocumentViewerDemo.DemoMode.Barcode) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.userInterfaceElement = $(this.headerToolbar_FileMenu.exportTextMenuItem);
                    elements.push(element);
                }
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.headerToolbar_FileMenu.documentPropertiesMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.headerToolbar_FileMenu.printMenuItem);
                element.hasDocumentEmptyEnabled = false;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.headerToolbar_FileMenu.saveToCacheMenuItem);
                elements.push(element);
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.OCR) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.userInterfaceElement = $(this.shortcuts.ocrSaveBtn);
                    elements.push(element);
                }
            };
            FilePart.prototype.uploadDocumentMenuItem_Click = function (e) {
                var _this = this;
                this._mainApp.uploadDocumentDlg.show();
                this._mainApp.uploadDocumentDlg.OkClick = function (e) {
                    _this._mainApp.uploadDocument(e.documenFile, e.annotationFile, e.loadEmbeddedAnnotations);
                };
            };
            FilePart.prototype.openDocumentFromUrlMenuItem_Click = function (e) {
                var _this = this;
                this._mainApp.openDocumentFromUrlDlg.show();
                this._mainApp.openDocumentFromUrlDlg.loadClick = function (e) {
                    _this._mainApp.loadDocument(e.fileUrl, e.annotationsUrl, e.loadEmbeddedAnnotations);
                };
            };
            FilePart.prototype.loadDocumentFromCacheMenuItem_Click = function (e) {
                var _this = this;
                this._mainApp.loadDocumentFromCacheDlg.show();
                this._mainApp.loadDocumentFromCacheDlg.loadClick = function (id) {
                    _this._mainApp.loadCachedDocument(id, true);
                };
            };
            FilePart.prototype.printMenuItem_Click = function (e) {
                var _this = this;
                if (lt.LTHelper.OS == lt.LTOS.android) {
                    if (lt.LTHelper.browser == lt.LTBrowser.opera || lt.LTHelper.browser == lt.LTBrowser.firefox) {
                        window.alert("Printing is not supported natively in this browser");
                        return;
                    }
                }
                var documentViewer = this._mainApp.documentViewer;
                var doc = documentViewer.document;
                // Get the starting orientation
                var orientation = lt.Documents.UI.PrintOrientation.portrait;
                if (doc) {
                    var size = doc.pages.item(0).size;
                    if (size.width > size.height)
                        orientation = lt.Documents.UI.PrintOrientation.landscape;
                }
                this._mainApp.printDlg.show(doc, documentViewer.currentPageNumber, orientation);
                this._mainApp.printDlg.printClick = function (options) {
                    _this._mainApp.doPrint(options);
                };
            };
            FilePart.prototype.openFromDocumentStorageMenuItem_Click = function (e) {
                var _this = this;
                this._mainApp.openFromDocumentStorageDlg.show();
                this._mainApp.openFromDocumentStorageDlg.OkClick = function (e) {
                    // Check if there's an annotations file
                    var annFile = null;
                    if (e.annotationsFile) {
                        if (e.annotationsFile.link && e.annotationsFile.link.length > 0)
                            annFile = e.annotationsFile.link;
                        else if (e.annotationsFile.fileBlob)
                            annFile = e.annotationsFile.fileBlob;
                    }
                    if (e.documentFile.link && e.documentFile.link.length > 0) {
                        _this._mainApp.loadDocument(e.documentFile.link, annFile, e.loadEmbeddedAnnotations, e.documentFile.name);
                    }
                    else if (e.documentFile.fileBlob) {
                        _this._mainApp.uploadDocument(e.documentFile.fileBlob, annFile, e.loadEmbeddedAnnotations);
                    }
                };
            };
            FilePart.prototype.saveDocumentMenuItem_Click = function (e) {
                var _this = this;
                this._mainApp.documentConverterDlg.totalPages = this._mainApp.documentViewer.document.pages.count;
                this._mainApp.documentConverterDlg.currentPageNumber = this._mainApp.documentViewer.currentPageNumber;
                this._mainApp.documentConverterDlg.show();
                this._mainApp.documentConverterDlg.OkClick = function (jobData) {
                    // Send the annotations along, instead of using whatever may be already saved
                    // In case this document was pre-cached
                    if (jobData.annotationsMode != lt.Documents.DocumentConverterAnnotationsMode.none && _this._mainApp.documentViewer.annotations) {
                        var pageCount = _this._mainApp.documentViewer.document.pages.count;
                        var allContainers = _this._mainApp.documentViewer.annotations.automation.containers;
                        var modifiedContainers = [];
                        for (var pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
                            if (_this._mainApp.documentViewer.annotations.isContainerModified(pageNumber)) {
                                modifiedContainers.push(allContainers.item(pageNumber - 1));
                            }
                        }
                        if (modifiedContainers.length > 0) {
                            var annotations = new lt.Annotations.Core.AnnCodecs().saveAll(modifiedContainers, lt.Annotations.Core.AnnFormat.annotations);
                            jobData.annotations = annotations;
                        }
                    }
                    _this._mainApp.convertDocument(jobData);
                };
            };
            FilePart.prototype.saveToCacheMenuItem_Click = function (e) {
                var _this = this;
                var hasChanged = this._mainApp.documentViewer.prepareToSave();
                var document = this._mainApp.documentViewer.document;
                if (hasChanged || document.cacheStatus === lt.Documents.DocumentCacheStatus.notSynced) {
                    this._mainApp.beginBusyOperation();
                    this._mainApp.loadingDlg.show(false, false, "Saving to cache...");
                    // Save will update the document in the server
                    var saveToCachePromise = lt.Documents.DocumentFactory.saveToCache(document);
                    saveToCachePromise.fail(function (jqXHR, statusText, errorThrown) {
                        DocumentViewerDemo.DocumentViewerDemoApp.showServiceError("Error saving the document.", jqXHR, statusText, errorThrown);
                    });
                    saveToCachePromise.always(function () {
                        _this._mainApp.endBusyOperation();
                        _this.showSaveResultDialog(true);
                    });
                }
                else {
                    this.showSaveResultDialog(false);
                }
            };
            FilePart.prototype.showSaveResultDialog = function (didSave) {
                var _this = this;
                setTimeout(function () {
                    // Inform the user about the cache ID. Use the input dialog so it's easy to copy.
                    _this._mainApp.inputDlg.title = "Save To Cache";
                    var text = "Use the cache ID below to load this cached document in the future.";
                    if (didSave) {
                        text = "This document's cache entry has been updated. " + text;
                    }
                    else {
                        text = "This document is up to date and does not require saving. " + text;
                    }
                    _this._mainApp.inputDlg.description = text;
                    _this._mainApp.inputDlg.inputInitialValue = _this._mainApp.documentViewer.document.documentId;
                    _this._mainApp.inputDlg.isPassword = false;
                    _this._mainApp.inputDlg.show();
                    _this._mainApp.inputDlg.OkClick = null;
                }, 500);
            };
            FilePart.prototype.closeDocumentMenuItem_Click = function (e) {
                this._mainApp.closeDocument();
                this._mainApp.updateContainers();
            };
            FilePart.prototype.exportTextMenuItem_Click = function (e) {
                var _this = this;
                var currentPageNumber = this._mainApp.documentViewer.currentPageNumber;
                var pageCount = this._mainApp.documentViewer.pageCount;
                this._mainApp.pagesDlg.show("Export Text", pageCount, currentPageNumber);
                this._mainApp.pagesDlg.OkClick = function () {
                    var hasText = _this._mainApp.documentViewer.text.hasDocumentPageText(_this._mainApp.pagesDlg.pageNumber);
                    if (hasText) {
                        _this.doExportText();
                    }
                    else {
                        // we need to get the text
                        var message = (_this._mainApp.pagesDlg.pageNumber == 0) ? "Not all pages have their text parsed.\nParse text for all pages?" : "Page number " + _this._mainApp.pagesDlg.pageNumber + " doesn't have its text parsed.\nParse text for this page?";
                        var confirm = window.confirm(message);
                        if (confirm) {
                            // Inform what to do after getting text
                            _this._mainApp.getTextOperation = lt.Documents.UI.DocumentViewerCommands.textExport;
                            _this._mainApp.getPagesText(_this._mainApp.pagesDlg.pageNumber);
                        }
                    }
                };
            };
            FilePart.prototype.doExportText = function () {
                var text = this._mainApp.documentViewer.text.exportText(this._mainApp.pagesDlg.pageNumber);
                if (text)
                    text = text.trim();
                if (text) {
                    this._mainApp.textResultDlg.show("Export Text", text);
                }
                else {
                    window.alert("This selection does not contain any text.\nIf this is a raster document, check that your service has included OCR functionality.");
                }
            };
            FilePart.prototype.documentPropertiesMenuItem_Click = function (e) {
                this._mainApp.documentPropertiesDlg.show(this._mainApp.documentViewer.document);
            };
            FilePart.prototype.aboutMenuItem_Click = function (e) {
                this._mainApp.aboutDlg.show();
            };
            FilePart.prototype.mainControlsItems_itemClicked = function (e) {
                $(this.mobileVersionMainControls.mainControls).collapse('hide');
            };
            FilePart.prototype.headerToolbarContainer_focusout = function (e) {
                var _this = this;
                if ($(this.mobileVersionMainControls.mainControls).hasClass("in")) {
                    window.setTimeout(function () {
                        $(_this.mobileVersionMainControls.mainControls).collapse('hide');
                    }, 100);
                }
            };
            return FilePart;
        }());
        DocumentViewerDemo.FilePart = FilePart;
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
})(HTML5Demos || (HTML5Demos = {}));
