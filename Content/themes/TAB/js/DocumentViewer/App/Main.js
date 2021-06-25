var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        (function (DemoMode) {
            DemoMode[DemoMode["Default"] = 0] = "Default";
            DemoMode[DemoMode["SVG"] = 1] = "SVG";
            DemoMode[DemoMode["OCR"] = 2] = "OCR";
            DemoMode[DemoMode["Barcode"] = 3] = "Barcode";
        })(DocumentViewerDemo.DemoMode || (DocumentViewerDemo.DemoMode = {}));
        var DemoMode = DocumentViewerDemo.DemoMode;
        var DocumentViewerDemoApp = (function () {
            function DocumentViewerDemoApp() {
                var _this = this;
                // These are set in the OpenFromUrlDialog
                this.sampleDocuments = [
                    "Leadtools.pdf",
                    "OCR1-4.tif",
                    "barcodes.pdf",
                    "Combined.pdf"
                ];
                // For opening documents in other demos
                this.app3Location = null;
                this.app3LocationLink = "#openInComparison";
                this.app4Location = null;
                this.app4LocationLink = "#openInVirtualDocument";
                // Demo parts
                this._filePart = null;
                this._editPart = null;
                this._viewPart = null;
                this._PagePart = null;
                this._interactivePart = null;
                this._annotationsPart = null;
                this.preferencesPart = null;
                // Document viewer
                this._documentViewer = null;
                this._isInsideBusyOperation = false;
                // UI element , indicates that the thumbnails are still in loading operation
                this._loadingThumbnailsBar = "#loadingThumbnailsBar";
                // UI element , indicates that the annotations are still in loading operation
                this._loadingAnnotationsBar = "#loadingAnnotationsBar";
                // Tooltip element
                this._tooltip = "#tooltip";
                this._automaticallyRunLinks = false;
                this._useElements = false;
                this.imageViewerContainerDiv = "#imageViewerContainer";
                this.navigationbar = {
                    showThumbnailsBtn: "#showThumbnails",
                    ///showBookmarksBtn: "#showBookmarks",
                    showAnnotationsListControlsBtn: "#showAnnotationsListControls",
                };
                this.headerToolbarContainer = "#headerToolbarContainer";
                this.footerToolbarContainer = ".footerToolbar";
                this.navigationbarContainer = "#navigationbar";
                this.thumbnailsContainer = "#thumbnailsControl";
                //this.thumbnailsContainer = "#thumbnailsTab";
                
                ///this.bookmarksContainer = "#bookmarksControl";
                //this.bookmarksContainer = "#bookmarksTab";
                
                this.annotationsListControlsContainer = "#annotationsListControls";
                // Viewer, thumbnails and bookmarks containers
                // These containers will have same top/bottom effects when window resized
                // Or when show/hide annotations list 
                this.affectedContainers = ".affectedContainers";
                // All mobile version controls containers
                this.mobileVersionControlsContainers = ".mobileVersionControls";
                this.getTextOperation = null;
                // Operations names
                this._documentViewerOperationDictionary = {
                    0: "setDocument",
                    1: "loadingThumbnails",
                    2: "getThumbnail",
                    3: "loadingPages",
                    4: "getPage",
                    5: "runCommand",
                    6: "gotoPage",
                    7: "itemTypeChanged",
                    8: "getText",
                    9: "pageTextSelectionChanged",
                    10: "textSelectionChanged",
                    11: "renderItemPlaceholder",
                    12: "renderSelectedText",
                    13: "gotoBookmark",
                    14: "runLink",
                    15: "loadingAnnotations",
                    16: "getAnnotations",
                    17: "createAutomation",
                    18: "destroyAutomation",
                    19: "automationStateChanged",
                    20: "selectedTextToReviewObject",
                    21: "loadingBookmarks"
                };
                this._prepareAjaxEventHandler = null;
                // By default, all CSS Transitions are on. setting this value
                // to false in the preferences dialog will stop CSS Transitions.
                this._useCSSTransitions = true;
                this._cssTransitionsCallbackPending = false;
                this._cssTransitionsEnded = function (event) {
                    if (_this._cssTransitionsCallbackPending) {
                        /// DONE ///
                        _this._cssTransitionsStopListening();
                    }
                };
                this.imageViewer_elementsUpdatedCSS = function (sender, e) {
                    if (!e.isTransitionsEnabled) {
                        // transitions are disabled. End our listening.
                        if (_this._cssTransitionsCallbackPending)
                            _this._cssTransitionsStopListening();
                    }
                    else if (!_this._cssTransitionsCallbackPending) {
                        /// START ///
                        _this._cssTransitionsCallbackPending = true;
                        var imageViewer = _this._documentViewer.view.imageViewer;
                        imageViewer.viewDiv.addEventListener("transitionend", _this._cssTransitionsEnded, false);
                        lt.LTHelper.addClass(imageViewer.foreCanvas, DocumentViewerDemoApp._cssTransformsHideCanvasClass);
                    }
                };
                // Will hold the location of any image loading errors, so we can apply special classes each time they are 
                // auto-added (when they come into view). This is not necessary if no special stylings are desired or if 
                // "AutoRemoveItemElements" is false (it is true by default), or if Elements Mode is not used.
                // We clear this array on a new document, and set the item errors in the "documentViewer_Operation" callback.
                this._elementsPageErrorClass = "image_error";
                this._elementsPageAllErrored = false;
                this._elementsPageErrors = [];
                // Class applied to images that are in the process of loading, for special styles
                // This can be configured in CreateOptions
                // Logic is similar to applying image errors
                this._elementsPageLoadingClass = "image_loading";
                this._elementsPagesLoading = [];
                this._loadDocumentAnnotationsFile = null;
                this._documentPrintCanceled = false;
                this._allBarcodes = null;
                this._currentBarcodes = [];
                window.onresize = (function (e) { return _this.onResize(e); });
                window.onunload = (function (e) { return _this.onUnload(e); });
                this.InitUI();
                // Bind necessary functions
                this._endDocumentPrint = this._endDocumentPrint.bind(this);
            }
            Object.defineProperty(DocumentViewerDemoApp.prototype, "useElements", {
                get: function () {
                    return this._useElements;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DocumentViewerDemoApp.prototype, "demoName", {
                set: function (value) {
                    this._demoName = value;
                    // demo title
                    $("#demoTitle").text(value);
                    // demo name label in the about dialog 
                    $("#demoName").text(value);
                },
                enumerable: true,
                configurable: true
            });
            DocumentViewerDemoApp.prototype.onResize = function (e) {
                // Hide all menus
                var menus = $(".dropup.clearfix");
                menus.css("display", "none");
                this.updateContainers();
            };
            DocumentViewerDemoApp.prototype.InitContainers = function () {
                if (DocumentViewerDemoApp.isMobileVersion) {
                    // We only need to update thumbnails Container, bookmarks container not included in mobile version too
                    //$(this.thumbnailsContainer).css({ "left": 0, "right": 0, "width": "inherit" });
                }
            };
            DocumentViewerDemoApp.prototype.updateContainers = function () {
                var headerToolbarContainer = !DocumentViewerDemoApp.isMobileVersion ? $(this.headerToolbarContainer) : $(this.headerToolbarContainer).children(".navbar-header");
                var headerToolbarContainerHeight = $(headerToolbarContainer).height();
                var footerToolbarContainerHeight = this.demoMode == DemoMode.Default ? $(this.footerToolbarContainer).height() : 0;
                // Check visibility
                var visibleAnnotationsListControls = !HTML5Demos.Utils.UI.isHidden($(this.annotationsListControlsContainer));
                //var visibleThumbnails = !HTML5Demos.Utils.UI.isHidden($(this.thumbnailsContainer));
                ///var visibleBookmarks = !HTML5Demos.Utils.UI.isHidden($(this.bookmarksContainer));
                // Update navigationbar container top/bottom
                $(this.navigationbarContainer).css("top", headerToolbarContainerHeight);
                $(this.navigationbarContainer).css("bottom", footerToolbarContainerHeight);
                //if (!DocumentViewerDemoApp.isMobileVersion)
                //    $(this._editPart.findTextPanel.panel).css("top", headerToolbarContainerHeight);
                // Update annotations list controls bottom
                $(this.annotationsListControlsContainer).css("bottom", footerToolbarContainerHeight);
                // Update affected containers top/bottom
                $(this.affectedContainers).css("top", headerToolbarContainerHeight);
                var affectedContainersBottom = footerToolbarContainerHeight;
                if (visibleAnnotationsListControls)
                    affectedContainersBottom += $(this.annotationsListControlsContainer).height();
                $(this.affectedContainers).css("bottom", affectedContainersBottom);
                if (!DocumentViewerDemoApp.isMobileVersion) {
                    var navigationbarContainerWidth = $(this.navigationbarContainer).width();
                    // Both thumbnails and bookmarks Containers has same width
                    // Use thumbnails container as common
                    ///var thumbnailsBookmarksContainerWidth = $(this.thumbnailsContainer).width();
                    // Now update viewer container
                    var imageViewerContainerDivLeft = navigationbarContainerWidth;
                    ///if (visibleThumbnails || visibleBookmarks)
                        ///imageViewerContainerDivLeft += thumbnailsBookmarksContainerWidth;
                    $(this.imageViewerContainerDiv).css("left", imageViewerContainerDivLeft);
                }
                // The viewer container size might be changed; call onSizeChanged
                this._documentViewer.view.imageViewer.onSizeChanged();
                if (this.documentViewer.thumbnails != null) {
                    this.documentViewer.thumbnails.imageViewer.onSizeChanged();
                    this.documentViewer.thumbnails.imageViewer.invalidate(lt.LeadRectD.empty);
                }
            };
            DocumentViewerDemoApp.prototype.onUnload = function (e) {
                if (this._documentViewer != null) {
                    this._documentViewer.operation.remove(this._operationHandler);
                    this._documentViewer.dispose();
                }
            };
            DocumentViewerDemoApp.prototype.InitUI = function () {
                HTML5Demos.Utils.DemoHelper.initCollapsiblePanels();
                //$(this.thumbnailsContainer).hide();
                ///$(this.bookmarksContainer).hide();
                $(this.annotationsListControlsContainer).hide();
                if (lt.LTHelper.device == lt.LTDevice.mobile || lt.LTHelper.device == lt.LTDevice.tablet) {
                    $(".shortcutsbar").css({
                        "overflow-y": "hidden",
                        "overflow-x": "auto",
                        "white-space": "nowrap"
                    });
                }
                this.InitContainers();
                this.InitDialogs();
            };
            DocumentViewerDemoApp.prototype.InitDialogs = function () {
                var _this = this;
                // Upload document dialog
                this.uploadDocumentDlg = new HTML5Demos.Dialogs.UploadDocumentDlg();
                // Open document from url dialog
                this.openDocumentFromUrlDlg = new HTML5Demos.Dialogs.OpenDocumentFromUrlDlg(this.sampleDocuments);
                // Load document from cache dialog
                this.loadDocumentFromCacheDlg = new HTML5Demos.Dialogs.LoadDocumentFromCacheDlg();
                // Print dialog
                this.printDlg = new HTML5Demos.Dialogs.PrintDlg();
                // Document Converter dialog
                this.documentConverterDlg = new DocumentViewerDemo.Converter.Dialogs.DocumentConverterDlg();
                // Use same SharePoint helper instance for both open and save dialogs
                //var sharePointHelper = new HTML5Demos.DriveHelper.LTSharePoint.SharePointHelper();
                // Open from external document storage dialog
                //this.openFromDocumentStorageDlg = new HTML5Demos.Dialogs.OpenFromDocumentStorageDlg();
                //this.openFromDocumentStorageDlg.sharePointHelper = sharePointHelper;
                // Wait to init until we have Google Drive credentials
                // Save to dialog
                this.saveToDlg = new DocumentViewerDemo.Converter.Dialogs.SaveToDlg();
                //this.saveToDlg.sharePointHelper = sharePointHelper;
                this.saveToDlg.init();
                // Text result dialog
                this.textResultDlg = new HTML5Demos.Dialogs.TextResultDlg();
                // Automation properties dialog
                this.automationUpdateObjectDlg = new lt.Annotations.JavaScript.AutomationUpdateObjectDialog();
                // About dialog
                this.aboutDlg = new HTML5Demos.Dialogs.AboutDlg("");
                // Loading dialog 
                this.loadingDlg = new HTML5Demos.Dialogs.DocumentViewerDemoLoadingDlg();
                // Processing pages dialog
                this.processingPagesDlg = new HTML5Demos.Dialogs.ProcessingPagesDlg();
                // Document viewer options dialog
                this.documentViewerOptionsDlg = new HTML5Demos.Dialogs.DocumentViewerOptionsDlg();
                this.documentViewerOptionsDlg.ok = function () {
                    _this.hookPrepareAjax = _this.documentViewerOptionsDlg.hookPrepareAjax;
                    _this.useCSSTransitions = _this.documentViewerOptionsDlg.useCSSTransitions;
                };
                // User name dialog
                this.inputDlg = new HTML5Demos.Dialogs.InputDlg();
                if (!DocumentViewerDemoApp.isMobileVersion) {
                    // Pages dialog
                    this.pagesDlg = new HTML5Demos.Dialogs.PagesDlg();
                    // Document properties dialog
                    this.documentPropertiesDlg = new HTML5Demos.Dialogs.DocumentPropertiesDlg();
                    // Customize render mode dialog
                    this.customizeRenderModeDlg = new HTML5Demos.Dialogs.CustomRenderModeDlg();
                    // Automation password dialog
                    this.automationPasswordDlg = new lt.Annotations.JavaScript.PasswordDialog();
                    // Link value dialog
                    this.linkValueDlg = new HTML5Demos.Dialogs.LinkValueDlg();
                }
                $(document).on('hidden.bs.modal', '.modal', function () {
                    $('.modal:visible').length && $(document.body).addClass('modal-open');
                });
            };
            DocumentViewerDemoApp.prototype.run = function () {
                this.browserPageSetup();
                //this.setDemoMode();
                this.Init();
            };
            DocumentViewerDemoApp.prototype.browserPageSetup = function () {
                // a place for all initializing browser-specific code.
                /* For IE9 and IE10:
                 * If
                 *    - You have an <input> element not inside a <form>
                 *    - You have any <button> element anywhere in the HTML
                 *    - You acquire selection of that input element (clicking, typing, etc)
                 *    - You hit the "enter" key
                 * Then IE tries to find a suitable button to click because it still believes
                 * it is inside a form that must be submitted.
                 *
                 * To prevent this, all buttons must have 'type="button"'.
                 * At the start, we add a hook with JQuery to add this attribute to an element
                 * when created if it doesn't have it.
                 */
                if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer && (lt.LTHelper.version == 9 || lt.LTHelper.version == 10)) {
                    // First, get all our elements without a "type" attribute
                    $("button:not([type])").each(function (idx, el) {
                        el.setAttribute("type", "button");
                    });
                    // Write a hook for future dynamically-created elements (DOMNodeInserted is now deprecated, but works in IE9 and IE10)
                    $("body").on("DOMNodeInserted", "button:not([type])", function () {
                        this.setAttribute("type", "button");
                    });
                }
                if (lt.LTHelper.OS == lt.LTOS.android && lt.LTHelper.browser == lt.LTBrowser.chrome) {
                    // For Android Chrome: use the printDIV instead of iframe element - window.print prints the whole screen regardless
                    this._printElement = document.getElementById("printDiv");
                    $("#printFrame").remove();
                }
                else {
                    // Use iframe element directly
                    this._printElement = document.getElementById("printFrame");
                    if (lt.LTHelper.OS == lt.LTOS.iOS && this._printElement) {
                        // Prevent issues with iOS post-print UI
                        this._printElement.style.position = "relative";
                    }
                }
            };
            DocumentViewerDemoApp.prototype.checkDemoMode = function () {
                // We can check for 3 different styles:
                // - .../[demo_name]/ in URL
                // - param ?mode=[demo_name] in params
                // - param ?mode=[demo_index] in params (1, 2, or 3)
                // by default, regular
                var mode = 0;
                // get our demo modes as an array of lowercase strings from the enum
                var demoNames = Object.keys(DemoMode)
                    .filter(function (mode) { return isNaN(parseInt(mode, 10)); })
                    .map(function (mode) { return mode.toLowerCase(); });
                var pathname = decodeURIComponent(window.location.pathname).toLowerCase();
                if (pathname) {
                    // check for the name of the demo in the url path
                    demoNames.some(function (demoName, demoIndex) {
                        var index = pathname.indexOf(demoName);
                        if (index > -1) {
                            mode = demoIndex;
                            return true;
                        }
                        return false;
                    });
                }
                // check the params. If it's in the params, it should override whatever is
                // previously found in the path.
                var paramKey = "mode=";
                var paramsString = decodeURIComponent(window.location.search).toLowerCase();
                if (!paramsString) {
                    // if no params string, it may be a hash-based URL (".../#/...?mode=...")
                    paramsString = decodeURI(window.location.href).toLowerCase();
                }
                if (paramsString) {
                    var splitQMark = paramsString.indexOf("?");
                    if (splitQMark > -1) {
                        paramsString = paramsString.substring(splitQMark + 1, paramsString.length);
                    }
                }
                if (paramsString) {
                    // look for "mode=" and the value that comes after
                    var modeIndex = paramsString.lastIndexOf(paramKey);
                    if (modeIndex > -1) {
                        paramsString = paramsString.substring(modeIndex + paramKey.length, paramsString.length);
                        var checkValue = paramsString.split("&")[0];
                        if (checkValue) {
                            demoNames.some(function (demoName, demoIndex) {
                                if (checkValue === demoName) {
                                    mode = demoIndex;
                                    return true;
                                }
                                if (parseInt(checkValue, 10) === demoIndex) {
                                    mode = demoIndex;
                                    return true;
                                }
                                return false;
                            });
                        }
                    }
                }
                return mode;
            };
            DocumentViewerDemoApp.prototype.setDemoMode = function () {
                var mode = this.checkDemoMode();
                var url = window.location.href;
                //var modeIndex = url.search("mode=") + 5;
                //var mode = <DemoMode>parseInt(url.charAt(modeIndex));
                this.demoMode = mode;
                switch (mode) {
                    case DemoMode.SVG:
                        this.demoName = "LEADTOOLS JS SVG Demo";
                        // Set default sample 
                        this._defaultSampleDocument = "Combined.pdf";
                        // Hide bookmarks
                        $(this.navigationbar.showBookmarksBtn).hide();
                        $(this.bookmarksContainer).hide();
                        // Hide save
                        $("#saveDocument").hide();
                        // Hide user name
                        $("#userNameMenuItem").hide();
                        break;
                    case DemoMode.OCR:
                        this.demoName = "LEADTOOLS JS OCR Demo";
                        // Set default sample 
                        this._defaultSampleDocument = "OCR1-4.tif";
                        // Hide bookmarks
                        $(this.navigationbar.showBookmarksBtn).hide();
                        $(this.bookmarksContainer).hide();
                        // Hide save
                        $("#saveDocument").hide();
                        // Hide user name
                        $("#userNameMenuItem").hide();
                        $("#rubberBandInteractiveMode").show();
                        $("#rubberBandInteractiveMode>.text").text("Recognize area");
                        $("#rubberBandInteractiveMode_shortcut").prop('title', 'Recognize area');
                        $("#rubberBandInteractiveMode_shortcut").show();
                        $("#ocrSave_shortcut").show();
                        break;
                    case DemoMode.Barcode:
                        this.demoName = "LEADTOOLS JS Barcode Demo";
                        // Set default sample 
                        this._defaultSampleDocument = "barcodes.pdf";
                        // Hide bookmarks
                        $(this.navigationbar.showBookmarksBtn).hide();
                        $(this.bookmarksContainer).hide();
                        // Hide annotations stuff
                        $(".annotations").hide();
                        // Hide save
                        $("#saveDocument").hide();
                        // Hide user name
                        $("#userNameMenuItem").hide();
                        // Hide all references to text.
                        $("#exportText").hide();
                        $("#editMenuItem").hide();
                        $("#currentPageGetText").hide();
                        $("#allPagesGetText").hide();
                        $("#verticalDividerGetText").hide();
                        $("#selectTextMode").hide();
                        $("#selectTextMode_shortcut").hide();
                        $("#showTextIndicators").hide();
                        if (DocumentViewerDemoApp.isMobileVersion) {
                            $(".footerTextControls").hide();
                        }
                        $("#readPageBarcodes").show();
                        $("#readAllBarcodes").show();
                        $("#rubberBandInteractiveMode").show();
                        $("#rubberBandInteractiveMode>.text").text("Select barcode area");
                        $("#rubberBandInteractiveMode_shortcut").prop('title', 'Select barcode area');
                        $("#rubberBandInteractiveMode_shortcut").show();
                        $("#processAllPages_shortcut").prop('title', 'Read all barcodes');
                        $("#processAllPages_shortcut").show();
                        break;
                    default:
                        this.demoName = "LEADTOOLS JS Document Viewer and Converter Demo";
                        this.demoMode = DemoMode.Default;
                        this._defaultSampleDocument = "Leadtools.pdf";
                        $(".about-dialog").addClass("documentViewerMode-about-dialog");
                        $("#demoDescription").show();
                        // Show annotations stuff
                        $(".annotations").show();
                        $("#saveToCache").show();
                        break;
                }
            };
            DocumentViewerDemoApp.prototype.Init = function () {
                var _this = this;
                // Demo parts
                var FilePath = $('#filePath').val();
                this._filePart = new DocumentViewerDemo.FilePart(this);
                this._editPart = new DocumentViewerDemo.EditPart(this);
                this._viewPart = new DocumentViewerDemo.ViewPart(this);
                this._PagePart = new DocumentViewerDemo.PagePart(this);
                this._interactivePart = new DocumentViewerDemo.InteractivePart(this);
                this._annotationsPart = new DocumentViewerDemo.AnnotationsPart(this);
                this.preferencesPart = new DocumentViewerDemo.PreferencesPart(this);
                if (!(FilePath == "" || FilePath == null)) {
                    // Init the document viewer...
                    this.initDocumentViewer();
                    this._annotationsPart.initAutomation();
                    this.commandsBinder = new DocumentViewerDemo.CommandsBinder(this._documentViewer);
                    this._filePart.bindElements();
                    this._editPart.bindElements();
                    this._viewPart.bindElements();
                    this._PagePart.bindElements();
                    this._interactivePart.bindElements();
                    this._annotationsPart.bindElements();
                    this.commandsBinder.bindActions();
                    // Init the UI
                    this.updateDemoUIState();
                    // Before starting, verify that the service is hooked up
                    this.beginBusyOperation();
                    this.loadingDlg.show(false, false, "Verifying Service Connection...");
                    // The Documents Library contains properties to set that will connect to the Documents service.
                    // However, sometimes these values may need to be specified outside of the client side code, like in a configuration file.
                    // Here we show how that approach is used, and provide manual setting of the properties as a backup.
                    $.getJSON("./serviceConfig.json", { _: new Date().getTime() })
                        .done(function (json) {
                            // You can set the directory in which to check the license (client side)
                            // commented out, because we're using the default value ("./LEADTOOLS")
                            //lt.LTHelper.licenseDirectory = json["licenseDirectory"];
                            _this.initFromJSON(json);
                        })
                        .fail(function () {
                            // You can set the directory in which to check the license (client side)
                            // commented out, because we're using the default value ("./LEADTOOLS")
                            //lt.LTHelper.licenseDirectory = "leadtools_license_dir";
                            // The json configuration file wasn't found. Just manually set.
                            _this.initFromJSON(null);
                        })
                        .always(function () {
                            // Regardless of what happens, this runs after.
                            lt.Documents.DocumentFactory.verifyService()
                                .done(function (response) {
                                    var message = [];
                                    // Check if the LEADTOOLS license on the server is usable, otherwise, show a warning
                                    if (!response.isLicenseChecked) {
                                        // The server has failed to check the license, could be an invalid license or one that does not exist
                                        message = ["Warning!", "The LEADTOOLS License used in the service could not be found. This demo may not function as expected."];
                                        window.alert(message.join("\n\n"));
                                        lt.LTHelper.logWarning(message.join(" "));
                                    }
                                    else if (response.isLicenseExpired) {
                                        // The server has detected that the license used has expired
                                        message = ["Warning!", "The LEADTOOLS Kernel has expired. This demo may not function as expected."];
                                        window.alert(message.join("\n\n"));
                                        lt.LTHelper.logWarning(message.join(" "));
                                    }
                                    if (!response.isCacheAccessible) {
                                        // The cache directory set in the .config for the server doesn't exist or has improper permissions
                                        message = ["Warning!", "The server's cache directory does not exist or cannot be written to. This demo may not function as expected."];
                                        window.alert(message.join("\n\n"));
                                        lt.LTHelper.logWarning(message.join(" "));
                                    }
                                    if (response.kernelType != null && response.kernelType != "Release") {
                                        // If the kernel is not release, log it (for debugging)
                                        lt.LTHelper.log("Server LEADTOOLS Kernel type: " + response.kernelType);
                                    }
                                    if (response.ocrEngineStatus !== lt.Documents.OcrEngineStatus.ready) {
                                        // The OCR Engine on the service is not working properly
                                        if (response.ocrEngineStatus === lt.Documents.OcrEngineStatus.unset)
                                            lt.LTHelper.logWarning("The LEADTOOLS OCR Engine Runtime was not set on the service. OCR is not supported.");
                                        else if (response.ocrEngineStatus === lt.Documents.OcrEngineStatus.error)
                                            lt.LTHelper.logError("The LEADTOOLS OCR Engine setup experienced an error. OCR is not supported.");
                                    }
                                    var cacheIdArray = Network.queryString["cacheId"];
                                    if (cacheIdArray) {
                                        // The demo is called from another demo (Comparison, External Storage, Virtual Document)
                                        _this.loadCachedDocument(cacheIdArray[0], false);
                                    }
                                    else {
                                        // Load default sample, which is on the server root.
                                        // We will need to remove the ServiceApiPath, so make sure it is set correctly.
                                        //var defaultDocument = HTML5Demos.Dialogs.OpenDocumentFromUrlDlg.getSampleUrl(_this._defaultSampleDocument);
                                        //lt.LTHelper.log("Loading initial document from '" + defaultDocument + "'. If this is the incorrect URL, check your values in serviceConfig.json");
                                        _this.loadDocument(FilePath, null, false);
                                    }
                                })
                                .fail(function (jqXHR, statusText, errorThrown) {
                                    window.alert("Cannot reach the LEADTOOLS Documents Service.\nVerify that the service path is correct.");
                                    _this.endBusyOperation();
                                });
                        });
                }
            };
            Object.defineProperty(DocumentViewerDemoApp.prototype, "hookPrepareAjax", {
                get: function () {
                    return this._prepareAjaxEventHandler != null;
                },
                set: function (value) {
                    if (value && this._prepareAjaxEventHandler == null) {
                        // Add our handler to DocumentFactory.prepareAjax
                        this._prepareAjaxEventHandler = lt.Documents.DocumentFactory.prepareAjax.add(DocumentViewerDemoApp.prepareAjaxHandler);
                    }
                    else if (!value && this._prepareAjaxEventHandler != null) {
                        // Remove our handler to DocumentFactory.prepareAjax
                        lt.Documents.DocumentFactory.prepareAjax.remove(this._prepareAjaxEventHandler);
                        this._prepareAjaxEventHandler = null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            // DocumentFactory.prepareAjax event handler to inspect (or modify) all calls made to DocumentsService
            DocumentViewerDemoApp.prepareAjaxHandler = function (sender, e) {
                // In this demo, we will collect information and output the result into the console
                // Show the Leadtools.Documents class and method making the call
                var msg = "documentFactory.prepareAjax " + e.sourceClass + "." + e.sourceMethod;
                // Parse the message for more info
                // If this is a POST method, the data is in a string, otherwise, it is an object.
                var dataObj;
                if (e.settings.type == "POST") {
                    dataObj = JSON.parse(e.settings.data);
                }
                else {
                    dataObj = e.settings.data;
                }
                // Here, we will parse some of the data
                if (e.sourceMethod == "LoadFromUri") {
                    // Load from URL, get the URL being used
                    msg += " uri:" + dataObj["uri"];
                }
                else {
                    // Everything else will have a document ID
                    var documentId = dataObj["documentId"];
                    if (documentId) {
                        msg += " documentId:" + documentId;
                    }
                    // Most will have a page number (for example, GetSvg or GetImage)
                    var pageNumber = dataObj["pageNumber"];
                    if (pageNumber) {
                        msg += " pageNumber:" + pageNumber;
                    }
                    // Thumbnails grid use first and last page number
                    var firstPageNumber = dataObj["firstPageNumber"];
                    var lastPageNumber = dataObj["lastPageNumber"];
                    if (firstPageNumber && lastPageNumber) {
                        msg += " firstPageNumber:" + firstPageNumber + " lastPageNumber:" + lastPageNumber;
                    }
                }
                lt.LTHelper.log(msg);
            };
            DocumentViewerDemoApp.prototype.initFromJSON = function (json) {
                // Change the path from our client side to service routing
                lt.Documents.DocumentFactory.serviceHost = (json && json["serviceHost"] !== undefined) ? json["serviceHost"] : null;
                lt.Documents.DocumentFactory.servicePath = (json && json["servicePath"] !== undefined) ? json["servicePath"] : null;
                lt.Documents.DocumentFactory.serviceApiPath = (json && json["serviceApiPath"] !== undefined) ? json["serviceApiPath"] : "api";
                //if (json) {
                //    // Set possible links to other applications
                //    this.app3Location = json["app3"] || null;
                //    this.app4Location = json["app4"] || null;
                //}
                //var openFromDocStorageDlg = this.openFromDocumentStorageDlg;
                //if (json) {
                //    // Set up Google Drive credentials
                //    var googleClientId = json["GoogleDriveLoad_ClientID"];
                //    var googleApiKey = json["GoogleDriveLoad_APIKey"];
                //    if (googleClientId && googleApiKey) {
                //        var googleDriveHelper = openFromDocStorageDlg.googleDriveHelper;
                //        if (googleDriveHelper)
                //            googleDriveHelper.registerForLoad(googleClientId, googleApiKey);
                //    }
                //}
                //openFromDocStorageDlg.init();
            };
            Object.defineProperty(DocumentViewerDemoApp.prototype, "useCSSTransitions", {
                get: function () {
                    return this._useCSSTransitions;
                },
                set: function (value) {
                    if (this._useCSSTransitions === value)
                        return;
                    this._useCSSTransitions = value;
                    this.updateUseCSSTransitions();
                },
                enumerable: true,
                configurable: true
            });
            DocumentViewerDemoApp.prototype.updateUseCSSTransitions = function () {
                if (this.useElements && lt.LTHelper.supportsCSSTransitions) {
                    var imageViewer = this._documentViewer.view.imageViewer;
                    this._cssTransitionsCallbackPending = false;
                    if (this._useCSSTransitions) {
                        lt.LTHelper.addClass(imageViewer.foreCanvas, DocumentViewerDemoApp._cssTransformsReadyCanvasClass);
                        lt.LTHelper.addClass(imageViewer.viewDiv, DocumentViewerDemoApp._cssTransformsReadyCanvasClass);
                        if (imageViewer.passthroughDiv)
                            lt.LTHelper.addClass(imageViewer.passthroughDiv, DocumentViewerDemoApp._cssTransformsReadyCanvasClass);
                        imageViewer.elementsUpdated.add(this.imageViewer_elementsUpdatedCSS);
                    }
                    else {
                        this._cssTransitionsStopListening();
                        lt.LTHelper.removeClass(imageViewer.foreCanvas, DocumentViewerDemoApp._cssTransformsReadyCanvasClass);
                        lt.LTHelper.removeClass(imageViewer.viewDiv, DocumentViewerDemoApp._cssTransformsReadyCanvasClass);
                        if (imageViewer.passthroughDiv)
                            lt.LTHelper.removeClass(imageViewer.passthroughDiv, DocumentViewerDemoApp._cssTransformsReadyCanvasClass);
                        imageViewer.elementsUpdated.remove(this.imageViewer_elementsUpdatedCSS);
                    }
                }
            };
            DocumentViewerDemoApp.prototype._cssTransitionsStopListening = function () {
                this._cssTransitionsCallbackPending = false;
                var imageViewer = this._documentViewer.view.imageViewer;
                imageViewer.viewDiv.removeEventListener("transitionend", this._cssTransitionsEnded, false);
                lt.LTHelper.removeClass(imageViewer.foreCanvas, DocumentViewerDemoApp._cssTransformsHideCanvasClass);
            };
            // Create the document viewer
            DocumentViewerDemoApp.prototype.initDocumentViewer = function () {
                var _this = this;
                // For interpolation
                //lt.Controls.ImageViewer.imageProcessingLibrariesPath = "./Common/Libs";
                lt.Controls.ImageViewer.imageProcessingLibrariesPath = "../Common/Libs";
                var createOptions = new lt.Documents.UI.DocumentViewerCreateOptions();
                // Set the UI part where the main view is displayed
                createOptions.viewContainer = document.getElementById("imageViewerDiv");
                // Set the UI part where the thumbnails are displayed
                //createOptions.thumbnailsContainer = document.getElementById("thumbnails");
                createOptions.thumbnailsContainer = document.getElementById("thumbnailsTab");
                // Set the UI part where the bookmarks are displayed (Set bookmarks container will show them in simple list)
                //createOptions.bookmarksContainer = document.getElementById("bookmarks");
                //createOptions.bookmarksContainer = document.getElementById("bookmarksTab");
                //createOptions.useAnnotations = this.demoMode == DemoMode.Default;

                createOptions.useAnnotations = true;

                // Now create the viewer
                this._documentViewer = lt.Documents.UI.DocumentViewerFactory.createDocumentViewer(createOptions);
                // Uncomment to use Ajax to load Images, instead of the typical image.src way
                // You can also change this value from Preferences/Document Viewer options dialog.
                //this._documentViewer.useAjaxImageLoading = false;
                // UseElements Mode
                this._useElements = this._documentViewer.view.imageViewer.useElements;
                // Speeding up the Annotations
                this._documentViewer.view.imageViewer.enableRequestAnimationFrame = true;
                // Lazy loading can be used for the view and thumbnails to only initially load what is on screen
                // Disabled by default and can be enabled with this code (or from Preferences/Document Viewer Options dialog)
                this._documentViewer.view.lazyLoad = true;
                this._documentViewer.thumbnails.lazyLoad = true;
                // Set the user name
                this._documentViewer.userName = "Author";
                this._documentViewer.view.preferredItemType = this.preferencesPart.preferredItemType;
                var imageViewer = this._documentViewer.view.imageViewer;
                // Helps with debugging of there was a rendering error
                imageViewer.renderError.add(function (sender, e) {
                    var item = e.item != null ? imageViewer.items.indexOf(e.item) : -1;
                    var message = "Error during render item " + item + " part" + (e.part) + ": " + (e.error.message);
                    throw new Error(message);
                });
                imageViewer.interpolation.add(function (sender, e) {
                    // For errors during the interpolation command
                    if (e.error) {
                        var message = "Interpolation: " + (e.error.message);
                        throw new Error(message);
                    }
                });
                if (this.useElements) {
                    this.updateUseCSSTransitions();
                    var checkForErrorsOrLoading = function (sender, e) {
                        var item = e.item;
                        var itemIndex = imageViewer.items.indexOf(item);
                        if (itemIndex === -1)
                            return;
                        // Check if this page previously errored-out or is loading
                        _this._elementsPageErrorUpdate(itemIndex, item);
                        _this._elementsPageLoadingUpdate(itemIndex, item);
                    };
                    imageViewer.autoItemElementsAdded.add(checkForErrorsOrLoading.bind(this));
                }
                this._documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactiveAutoPan, null);
                this._documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactivePanZoom, null);
                // Set view mode to svg
                //this._viewPart.setViewMode(true);
                // See if we need to enable inertia scroll
                if (this.preferencesPart.enableInertiaScroll)
                    this.toggleInertiaScroll(true);
                this._operationErrors = [];
                this._operationHandler = this._documentViewer.operation.add(function (sender, e) { return _this.documentViewer_Operation(sender, e); });
                // Hook to a post render handler, to render text indicators
                this._documentViewer.view.imageViewer.postRenderItem.add(function (sender, e) { return _this.imageViewer_PostRenderItem(sender, e); });
                if (this._documentViewer.thumbnails != null)
                    this._documentViewer.thumbnails.imageViewer.postRenderItem.add(function (sender, e) { return _this.imageViewer_PostRenderItem(sender, e); });
                // Set runLinkKeyModifier for the page links interactive mode (Ctrl + Click, will run page links)
                var imageViewerInteractiveModes = imageViewer.interactiveModes;
                imageViewerInteractiveModes.beginUpdate();
                for (var i = 0; i < imageViewerInteractiveModes.count; i++) {
                    var mode = imageViewerInteractiveModes.item(i);
                    if (mode.id == lt.Documents.UI.DocumentViewer.pageLinksInteractiveModeId) {
                        mode.runLinkKeyModifier = lt.Controls.Keys.control;
                    }
                }
                imageViewerInteractiveModes.endUpdate();
                // Set up the ImageViewer keydown to delete annotation
                var parentDiv = imageViewer.interactiveService.eventsSource;
                var $parentDiv = $(parentDiv);
                $parentDiv.attr("tabIndex", "1");
                $parentDiv.on("mousedown pointerdown", function (e) {
                    if (parentDiv !== document.activeElement)
                        parentDiv.focus();
                });
                $parentDiv.on("keydown", function (e) {
                    _this._annotationsPart.interactiveService_keyDown(e);
                });
            };
            DocumentViewerDemoApp.prototype._elementsPageErrorUpdate = function (index, item) {
                if (!this._useElements || !this._documentViewer.document)
                    return;
                if (this._elementsPageAllErrored || this._elementsPageErrors[index]) {
                    if (!item)
                        item = this._documentViewer.view.imageViewer.items.item(index);
                    if (item)
                        $(item.itemElement).addClass(this._elementsPageErrorClass);
                }
            };
            DocumentViewerDemoApp.prototype._elementsPageLoadingUpdate = function (index, item) {
                if (!this._useElements || !this._documentViewer.document)
                    return;
                var loading = this._elementsPagesLoading[index] || false;
                if (!item)
                    item = this._documentViewer.view.imageViewer.items.item(index);
                if (item)
                    $(item.itemElement).toggleClass(this._elementsPageLoadingClass, loading);
            };
            // Update the UI state of the app
            DocumentViewerDemoApp.prototype.updateDemoUIState = function () {
                var hasDocument = this._documentViewer.hasDocument;
                if (hasDocument) {
                    if (HTML5Demos.Utils.UI.isHidden($(this.imageViewerContainerDiv))) {
                        $(this.imageViewerContainerDiv).show();
                        this._documentViewer.view.imageViewer.updateTransform();
                    }
                    if ($(this.navigationbar.showThumbnailsBtn).is(":disabled"))
                        $(this.navigationbar.showThumbnailsBtn).prop("disabled", false);
                    if ($(this.navigationbar.showAnnotationsListControlsBtn).is(":disabled"))
                        $(this.navigationbar.showAnnotationsListControlsBtn).prop("disabled", false);
                    if (this._documentViewer.document.isStructureSupported) {
                        if ($(this.navigationbar.showBookmarksBtn).is(":disabled"))
                            $(this.navigationbar.showBookmarksBtn).prop("disabled", false);
                    }
                    else {
                        $(this.navigationbar.showBookmarksBtn).removeClass("activeNavigationbarBtn");
                        if (!($(this.navigationbar.showBookmarksBtn).is(":disabled")))
                            $(this.navigationbar.showBookmarksBtn).prop("disabled", true);
                        if (!HTML5Demos.Utils.UI.isHidden($(this.bookmarksContainer)))
                            $(this.bookmarksContainer).hide();
                    }
                    this._annotationsPart.updateAnnotationsControlsVisiblity();
                }
                else {
                    if (!HTML5Demos.Utils.UI.isHidden($(this.imageViewerContainerDiv)))
                        $(this.imageViewerContainerDiv).hide();
                    $(this.navigationbar.showThumbnailsBtn).removeClass("activeNavigationbarBtn");
                    if (!($(this.navigationbar.showThumbnailsBtn).is(":disabled")))
                        $(this.navigationbar.showThumbnailsBtn).prop("disabled", true);
                    if (!HTML5Demos.Utils.UI.isHidden($(this.thumbnailsContainer)))
                        $(this.thumbnailsContainer).hide();
                    $(this.navigationbar.showBookmarksBtn).removeClass("activeNavigationbarBtn");
                    if (!($(this.navigationbar.showBookmarksBtn).is(":disabled")))
                        $(this.navigationbar.showBookmarksBtn).prop("disabled", true);
                    if (!HTML5Demos.Utils.UI.isHidden($(this.bookmarksContainer)))
                        $(this.bookmarksContainer).hide();
                    $(this.navigationbar.showAnnotationsListControlsBtn).removeClass("activeNavigationbarBtn");
                    if (!($(this.navigationbar.showAnnotationsListControlsBtn).is(":disabled")))
                        $(this.navigationbar.showAnnotationsListControlsBtn).prop("disabled", true);
                    if (!HTML5Demos.Utils.UI.isHidden($(this.annotationsListControlsContainer)))
                        $(this.annotationsListControlsContainer).hide();
                }
                // Set the links to the other demos, if applicable
                var urlEnd = hasDocument ? "?cacheId=" + this.documentViewer.document.documentId : "";
                $(this.app3LocationLink).toggle(!!this.app3Location && hasDocument).attr("href", !!this.app3Location && hasDocument ? this.app3Location + urlEnd : "#");
                $(this.app4LocationLink).toggle(!!this.app4Location && hasDocument).attr("href", !!this.app4Location && hasDocument ? this.app4Location + urlEnd : "#");
                $(this._editPart.findTextPanel.panel).removeClass('visiblePanel');
                this.updateUIState();
            };
            DocumentViewerDemoApp.prototype.updateUIState = function () {
                this.commandsBinder.run();
                this.updateContainers();
            };
            DocumentViewerDemoApp.showServiceError = function (message, jqXHR, statusText, errorThrown) {
                var serviceError = lt.Documents.ServiceError.parseError(jqXHR, statusText, errorThrown);
                var serviceMessage;
                if (!serviceError.isParseError && !serviceError.isBrowserError) {
                    var parts = [];
                    parts.push(serviceError.detail);
                    parts.push("\nMethod name: " + serviceError.methodName);
                    parts.push("Exception type: " + serviceError.exceptionType);
                    if (serviceError.exceptionType.indexOf("Leadtools") != -1) {
                        // This is a LEADTOOLS error, get the details
                        parts.push("Code: " + serviceError.code);
                    }
                    if (serviceError.link) {
                        parts.push("Link: " + serviceError.link);
                        lt.LTHelper.logError("Service Error - Help Link:");
                        lt.LTHelper.logError(serviceError.link);
                        lt.LTHelper.logError(serviceError);
                    }
                    else {
                        lt.LTHelper.logError("Service Error");
                        lt.LTHelper.logError(serviceError);
                    }
                    parts.push("\nInformation available in the console.");
                    serviceMessage = parts.join("\n");
                }
                else {
                    serviceMessage = serviceError.errorThrown;
                }
                window.alert(message + "\n" + serviceMessage);
            };
            DocumentViewerDemoApp.prototype.setDocument = function (document) {
                this._annotationsPart.closeDocument();
                // Check if the document is encrypted
                if (document.isEncrypted && !document.isDecrypted) {
                    // This document requires a password
                    this.endBusyOperation();
                    this.decryptDocument(document);
                }
                else {
                    this.checkParseStructure(document);
                }
            };
            DocumentViewerDemoApp.prototype.decryptDocument = function (document) {
                var _this = this;
                this.inputDlg.title = "Enter Password";
                this.inputDlg.description = "This document is encrypted. Enter the password to decrypt it.";
                this.inputDlg.isPassword = true;
                this.inputDlg.show();
                this.inputDlg.OkClick = function (password) {
                    var decryptPromise = document.decrypt(password);
                    decryptPromise.done(function () {
                        _this.beginBusyOperation();
                        _this.loadingDlg.show(false, false);
                        _this.checkParseStructure(document);
                    });
                    decryptPromise.fail(function (jqXHR, statusText, errorThrown) {
                        DocumentViewerDemoApp.showServiceError("Error decrypting the document.", jqXHR, statusText, errorThrown);
                        _this.inputDlg.show();
                    });
                };
            };
            DocumentViewerDemoApp.prototype.checkParseStructure = function (document) {
                // See if we need to parse the document structure
                if (document.isStructureSupported) {
                    if (document.structure.isParsed) {
                        this.checkLoadAnnotationsFile(document);
                        // Customize bookmarks list
                        this.populateBookmarks(document.structure);
                    }
                    else {
                        this.parseStructure(document);
                    }
                }
                else {
                    // Structure not supported
                    this.clearBookmarks();
                    this.checkLoadAnnotationsFile(document);
                }
            };
            DocumentViewerDemoApp.prototype.parseStructure = function (document) {
                var _this = this;
                document.structure.parse()
                    .done(function (document) {
                    _this.checkLoadAnnotationsFile(document);
                    // Customize bookmarks list
                    _this.populateBookmarks(document.structure);
                })
                    .fail(function (jqXHR, statusText, errorThrown) {
                    DocumentViewerDemoApp.showServiceError("Error parsing the document structure.", jqXHR, statusText, errorThrown);
                    _this.checkLoadAnnotationsFile(document);
                });
            };
            DocumentViewerDemoApp.prototype.populateBookmarks = function (structure) {
                this.clearBookmarks();
                var list = document.getElementById("bookmarksTree");
                if (list) {
                    if (structure != null && structure.bookmarks != null) {
                        var bookmarks = new Array(structure.bookmarks.length);
                        for (var i = 0; i < structure.bookmarks.length; i++)
                            bookmarks[i] = structure.bookmarks[i];
                        this.addBookmarks(bookmarks, list);
                    }
                }
            };
            DocumentViewerDemoApp.prototype.clearBookmarks = function () {
                var list = document.getElementById("bookmarksTree");
                if (list) {
                    for (var i = list.childNodes.length - 1; i >= 0; i--)
                        list.removeChild(list.childNodes[i]);
                }
            };
            DocumentViewerDemoApp.prototype.addBookmarks = function (bookmarks, baseElement) {
                var _this = this;
                if (bookmarks == null)
                    return;
                for (var i = 0; i < bookmarks.length; i++) {
                    var titleElement = document.createElement("li");
                    if (i + 1 == bookmarks.length)
                        lt.LTHelper.addClass(titleElement, "last");
                    // If bookmark has children, add collapse/expand checkbox
                    if (bookmarks[i].children.length > 0) {
                        lt.LTHelper.addClass(titleElement, "hasChildren");
                        var checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        // Create unique id for the checkbox
                        checkbox.id = (bookmarks[i].title + Date.now().toString()).replace(/\s/g, '');
                        // Create checkbox label
                        var checkboxLabel = document.createElement("label");
                        checkboxLabel.setAttribute("for", checkbox.id);
                        titleElement.appendChild(checkbox);
                        titleElement.appendChild(checkboxLabel);
                    }
                    // Create title span
                    var titleSpan = document.createElement("span");
                    titleSpan.textContent = bookmarks[i].title;
                    lt.LTHelper.addClass(titleSpan, "bookmark");
                    // attach current bookmark as data to the title span
                    $(titleSpan).data("bookmark", bookmarks[i]);
                    titleElement.appendChild(titleSpan);
                    baseElement.appendChild(titleElement);
                    // handle click event, to go to the selected bookmark
                    // using the attached data
                    titleSpan.onclick = function (e) { return _this.titleSpan_Click(e); };
                    var parentElement = titleElement;
                    if (bookmarks[i].children.length > 0) {
                        parentElement = document.createElement("ul");
                        titleElement.appendChild(parentElement);
                    }
                    this.addBookmarks(bookmarks[i].children, parentElement);
                }
            };
            DocumentViewerDemoApp.prototype.titleSpan_Click = function (e) {
                // Get attached data
                var bookmark = $(e.currentTarget).data("bookmark");
                this._documentViewer.gotoBookmark(bookmark);
                // Unmark all bookmarks
                HTML5Demos.Utils.DemoHelper.checked($(".bookmark"), false);
                // Mark the selected one
                HTML5Demos.Utils.DemoHelper.checked($(e.currentTarget), true);
            };
            DocumentViewerDemoApp.prototype.finishSetDocument = function (document) {
                var _this = this;
                // Remove any previous tooltips that may remain
                $(this._tooltip).hide();
                // When disposing a virtual document, also disposal all its sub-documents
                document.autoDisposeDocuments = true;
                this._documentViewer.setDocument(document);
                if (this.documentViewer.thumbnails != null)
                    this.documentViewer.thumbnails.imageViewer.selectedItemsChanged.add(function (sender, e) { return _this.thumbnailsActiveItemChanged(sender, e); });
                this.setInterpolationMode(document, !this._documentViewer.commands.canRun(lt.Documents.UI.DocumentViewerCommands.viewItemType, lt.Documents.UI.DocumentViewerItemType.svg));
                // Update the UI
                this.updateDemoUIState();
                // Call onResize so the DIV sizes get updated
                this.onResize(null);
                // If using ElementsMode, clear our image error array
                // Used to hold indices of images that could not be found so we can do special operations.
                this._elementsPageErrors = [];
                this._elementsPageAllErrored = false;
                // Clear all barcodes so they aren't redrawn in a place that doesn't make sense
                this._currentBarcodes = [];
                this._allBarcodes = null;
                if (DocumentViewerDemoApp.isMobileVersion)
                    this.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.viewFitWidth, null);
                else
                    this.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.viewFitPage, null);
                this.endBusyOperation();
            };
            DocumentViewerDemoApp.prototype.checkLoadAnnotationsFile = function (document) {
                var _this = this;
                var annotations = this._loadDocumentAnnotationsFile;
                this._loadDocumentAnnotationsFile = null;
                // Check if annotations passed as file or blob - Since File extends Blob, we only need to check if the object is an instance of the base class Blob.
                if (annotations && lt.LTHelper.supportsFileReader && annotations instanceof Blob) {
                    var fileReader = new FileReader();
                    fileReader.readAsText(annotations);
                    fileReader.onload = function (ev) {
                        // done reading annotations
                        var annotations = ev.target.result;
                        if (annotations != null && annotations.length > 0) {
                            var annCodecs = new lt.Annotations.Core.AnnCodecs();
                            var containers = annCodecs.loadAll(annotations);
                            if (containers != null && containers.length > 0) {
                                var setAnnotationsPromise = document.annotations.setAnnotations(containers);
                                setAnnotationsPromise.fail(function (jqXHR, statusText, errorThrown) {
                                    DocumentViewerDemoApp.showServiceError("Error setting document annotations.", jqXHR, statusText, errorThrown);
                                });
                                setAnnotationsPromise.always(function () {
                                    // Even if error occurred while setting document annotations, we should still be able to view the document without annotations
                                    _this.finishSetDocument(document);
                                });
                            }
                            else {
                                alert("No annotations could be found in the provided annotations file.");
                                _this.finishSetDocument(document);
                            }
                        }
                        else {
                            // Text is empty
                            _this.finishSetDocument(document);
                            window.alert("The provided annotations file is empty.");
                        }
                    };
                    fileReader.onerror = function (ev) {
                        // could not read as text
                        _this.finishSetDocument(document);
                        window.alert("An error has occurred while reading annotations file as text.\nError : " + ev.message);
                    };
                }
                else {
                    this.finishSetDocument(document);
                }
            };
            DocumentViewerDemoApp.prototype.thumbnailsActiveItemChanged = function (sender, e) {
                // Hide thumbnails container after select page on mobile version
                if (DocumentViewerDemoApp.isMobileVersion) {
                    //var visibleThumbnails = !HTML5Demos.Utils.UI.isHidden($(this.thumbnailsContainer));
                    //if (visibleThumbnails) {
                    //    $(this.navigationbar.showThumbnailsBtn).removeClass("activeNavigationbarBtn");
                    //    $(this.thumbnailsContainer).hide();
                    //    this.updateContainers();
                    //}
                }
            };
            DocumentViewerDemoApp.prototype.closeDocument = function () {
                if (this._documentViewer.document == null)
                    return;
                this._annotationsPart.closeDocument();
                this._documentViewer.setDocument(null);
                this.updateDemoUIState();
                this.clearBookmarks();
                $(this._printElement).hide();
            };
            DocumentViewerDemoApp.prototype._endDocumentPrint = function () {
                if (!this._documentPrintCanceled) {
                    if (this.loadingDlg && this.loadingDlg.cancelClick === this._endDocumentPrint)
                        this.loadingDlg.cancelClick = null;
                    this._documentPrintCanceled = true;
                    this.endBusyOperation();
                }
            };
            DocumentViewerDemoApp.prototype.doPrint = function (options) {
                this._documentPrintCanceled = false;
                var didSetCancel = false;
                try {
                    this.beginBusyOperation();
                    this.loadingDlg.show(true, true, "Preparing for print...");
                    this.loadingDlg.progress(0);
                    this.loadingDlg.cancelClick = this._endDocumentPrint;
                    didSetCancel = true;
                    this._documentViewer.print(this._printElement, options);
                }
                catch (ex) {
                    this.endBusyOperation();
                    if (didSetCancel && this.loadingDlg.cancelClick === this._endDocumentPrint)
                        this.loadingDlg.cancelClick = null;
                    window.alert(ex);
                }
            };
            DocumentViewerDemoApp.prototype.documentViewer_Operation = function (sender, e) {
                var index = e.pageNumber - 1;
                // If we have an error, show it
                if (e.error != null) {
                    if (e.operation == lt.Documents.UI.DocumentViewerOperation.getPage && this._useElements) {
                        this._elementsPageErrors[index] = true;
                        this._elementsPageErrorUpdate(index);
                    }
                    // If using client PDF rendering, setDocument may have an error as well
                    if (e.operation === lt.Documents.UI.DocumentViewerOperation.setDocument && e.pageNumber === -1) {
                        var viewer = sender;
                        this._elementsPageAllErrored = true;
                        $(viewer.view.imageViewer.viewDiv).find(".lt-item").addClass(this._elementsPageErrorClass);
                    }
                    // Check if we had this error before
                    if (this._operationErrors.indexOf(e.operation) == -1) {
                        this._operationErrors.push(e.operation);
                        var postPre = e.isPostOperation ? "Post-" : "Pre-";
                        var message = "Error in '" + (this._documentViewerOperationDictionary[e.operation]) + "' " + postPre + "operation. \n" + (e.error.message ? e.error.message : e.error);
                        window.alert(message);
                    }
                }
                switch (e.operation) {
                    case lt.Documents.UI.DocumentViewerOperation.getThumbnail:
                    case lt.Documents.UI.DocumentViewerOperation.getAnnotations:
                    case lt.Documents.UI.DocumentViewerOperation.renderItemPlaceholder:
                        // We are not interested in these
                        return;
                }
                var documentViewer = sender;
                var document = (documentViewer != null) ? documentViewer.document : null;
                switch (e.operation) {
                    case lt.Documents.UI.DocumentViewerOperation.printPages:
                        if (e.isPostOperation || this._documentPrintCanceled) {
                            e.abort = true;
                            this._endDocumentPrint();
                        }
                        else {
                            var progress = e.data1;
                            if (progress) {
                                var progressInt = parseInt((progress.pagesCompleted / progress.pagesTotal * 100).toString(), 10);
                                this.loadingDlg.progress(progressInt);
                            }
                        }
                        break;
                    case lt.Documents.UI.DocumentViewerOperation.loadingPages:
                    case lt.Documents.UI.DocumentViewerOperation.getPage:
                        if (this.loadingDlg.isCancelled) {
                            if (e.isPostOperation) {
                                e.abort = true;
                                this.endBusyOperation();
                            }
                        }
                        else if (this._useElements) {
                            if (index !== -1) {
                                // Track our pages that are loading
                                this._elementsPagesLoading[index] = !e.isPostOperation;
                                this._elementsPageLoadingUpdate(index);
                            }
                        }
                        break;
                    case lt.Documents.UI.DocumentViewerOperation.setDocument:
                        if (this._currentBarcodes.length > 0) {
                            this._currentBarcodes = [];
                            this._documentViewer.view.imageViewer.invalidate(lt.LeadRectD.empty);
                            $(this._printElement).show();
                        }
                        break;
                    case lt.Documents.UI.DocumentViewerOperation.loadingThumbnails:
                        !e.isPostOperation ? $(this._loadingThumbnailsBar).css("display", "block") : $(this._loadingThumbnailsBar).css("display", "none");
                        break;
                    case lt.Documents.UI.DocumentViewerOperation.loadingAnnotations:
                        !e.isPostOperation ? $(this._loadingAnnotationsBar).css("display", "block") : $(this._loadingAnnotationsBar).css("display", "none");
                        break;
                    case lt.Documents.UI.DocumentViewerOperation.pagesAdded:
                    case lt.Documents.UI.DocumentViewerOperation.pagesRemoved:
                        if (e.isPostOperation) {
                            if (this._documentViewer.annotations)
                                this._annotationsPart.handleContainersAddedOrRemoved();
                            this.updateDemoUIState();
                        }
                        break;
                    case lt.Documents.UI.DocumentViewerOperation.getText:
                        {
                            if (!e.isPostOperation) {
                                if (this._isInsideBusyOperation) {
                                    this.loadingDlg.processing("Get Text For Page " + e.pageNumber);
                                }
                                else {
                                    // This was not requested by the demo(e.g select text interactive mode), cancel it, and let the demo get the text
                                    e.abort = true;
                                    this.getTextOperation = null;
                                    this.getPagesText(e.pageNumber);
                                }
                            }
                            else {
                                if (e.error == null)
                                    this.getNextPageText();
                                else
                                    this.finishGetText(false);
                            }
                        }
                        break;
                    case lt.Documents.UI.DocumentViewerOperation.gotoPage:
                        HTML5Demos.Utils.DemoHelper.checked($(".bookmark"), false);
                        $(this._tooltip).hide();
                        break;
                    case lt.Documents.UI.DocumentViewerOperation.createAutomation:
                        if (e.isPostOperation)
                            this._annotationsPart.handleCreateAutomation();
                        break;
                    case lt.Documents.UI.DocumentViewerOperation.destroyAutomation:
                        if (!e.isPostOperation)
                            this._annotationsPart.handleDestroyAutomation();
                        break;
                    case lt.Documents.UI.DocumentViewerOperation.runLink:
                        if (e.isPostOperation && e.error == null) {
                            // Get the link and check if its an external one
                            var link = e.data1;
                            if (link.linkType == lt.Documents.DocumentLinkType.value && (link.value != null || link.value != "")) {
                                this.runValueLink(link.value);
                            }
                        }
                        break;
                    case lt.Documents.UI.DocumentViewerOperation.hoverLink:
                        if (e.isPostOperation && e.error == null) {
                            if (e.data1 != null) {
                                this.showLinkTooltip(e.data1, e.data2);
                            }
                            else {
                                $(this._tooltip).hide();
                            }
                        }
                        break;
                    default:
                        break;
                }
                if (e.isPostOperation)
                    this.updateUIState();
            };
            DocumentViewerDemoApp.prototype.showLinkTooltip = function (link, interactiveEventArgs) {
                // Get the link and check if its an external one
                var tooltipLink = null;
                if (link.linkType == lt.Documents.DocumentLinkType.value) {
                    if (link.value != null && link.value.length > 0) {
                        var tooltipLink;
                        // Check if this is an email address
                        if (link.value.toLowerCase().slice(0, "mailto:".length) != "mailto:" && DocumentViewerDemoApp._emailRegEx.test(link.value)) {
                            // Yes
                            tooltipLink = "mailto:" + link.value;
                        }
                        else {
                            tooltipLink = link.value;
                        }
                    }
                }
                else if (link.linkType == lt.Documents.DocumentLinkType.targetPage) {
                    tooltipLink = "Go to page " + link.target.pageNumber.toString();
                }
                if (tooltipLink != null) {
                    // Get mouse position
                    var mouseEvent = interactiveEventArgs.nativeEvent;
                    var position = lt.LeadPointD.create(mouseEvent.pageX, mouseEvent.pageY);
                    // Create tooltip content
                    var tooltipContent = "";
                    tooltipContent += tooltipLink;
                    tooltipContent += "<br />";
                    tooltipContent += "<b>Ctrl+Click to follow link</b>";
                    $(this._tooltip).html(tooltipContent);
                    // Show link tooltip
                    $(this._tooltip).css({
                        display: "block",
                        left: position.x,
                        top: position.y - 50
                    });
                }
            };
            DocumentViewerDemoApp.prototype.beginBusyOperation = function () {
                // Get ready ...
                this._isInsideBusyOperation = true;
            };
            DocumentViewerDemoApp.prototype.endBusyOperation = function () {
                if (this._isInsideBusyOperation) {
                    this._isInsideBusyOperation = false;
                    this.loadingDlg.hide();
                    // clear the errors
                    this._operationErrors = [];
                }
            };
            DocumentViewerDemoApp.prototype.toggleInertiaScroll = function (turnOn) {
                // These commands have ImageViewerPanZoomInteractiveMode in the tag, update the value
                var commandNames = [lt.Documents.UI.DocumentViewerCommands.interactivePanZoom, lt.Documents.UI.DocumentViewerCommands.interactivePan];
                for (var i = 0; i < commandNames.length; i++) {
                    var mode = this._documentViewer.commands.getCommand(commandNames[i]).tag;
                    if (mode != null) {
                        // Use "turnOn" value if defined, else toggle
                        var isEnabled = turnOn !== undefined ? turnOn : !mode.inertiaScrollOptions.isEnabled;
                        mode.inertiaScrollOptions.isEnabled = isEnabled;
                        this.preferencesPart.enableInertiaScroll = isEnabled;
                    }
                }
            };
            DocumentViewerDemoApp.prototype.getPagesText = function (pageNumber) {
                this.beginBusyOperation();
                this.loadingDlg.show(true, false, "Start Get Text...");
                this._getTextPagesList = new Array();
                if (pageNumber == 0) {
                    // Get text for all pages
                    var pageCount = this._documentViewer.pageCount;
                    for (var i = 1; i <= pageCount; i++) {
                        var hasText = this.documentViewer.text.hasDocumentPageText(i);
                        // Add pages that didn't have their text parsed
                        if (!hasText)
                            this._getTextPagesList.push(i);
                    }
                }
                else {
                    this._getTextPagesList.push(pageNumber);
                }
                this.getNextPageText();
            };
            DocumentViewerDemoApp.prototype.getNextPageText = function () {
                if (this._getTextPagesList.length < 1 || this.loadingDlg.isCancelled) {
                    this.finishGetText(true);
                    return;
                }
                var pageNumber = this._getTextPagesList.shift();
                this._documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.textGet, pageNumber);
            };
            DocumentViewerDemoApp.prototype.finishGetText = function (success) {
                if (success) {
                    // Check if the get text operation, intended for other operations
                    if (this.getTextOperation != null) {
                        switch (this.getTextOperation) {
                            case lt.Documents.UI.DocumentViewerCommands.textExport:
                                this._filePart.doExportText();
                                break;
                            case lt.Documents.UI.DocumentViewerCommands.textSelectAll:
                                this._documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.textSelectAll, 0);
                                break;
                            case lt.Documents.UI.DocumentViewerCommands.textFindNext:
                            case lt.Documents.UI.DocumentViewerCommands.textFindPrevious:
                                if (!this._editPart.isFindText)
                                    return;
                                this._editPart.findText();
                                break;
                        }
                    }
                    this._documentViewer.view.imageViewer.invalidate(lt.LeadRectD.empty);
                    if (this._documentViewer.thumbnails != null)
                        this._documentViewer.thumbnails.imageViewer.invalidate(lt.LeadRectD.empty);
                }
                this._getTextPagesList = [];
                var isFindTextOperation = this.getTextOperation == lt.Documents.UI.DocumentViewerCommands.textFindNext || this.getTextOperation == lt.Documents.UI.DocumentViewerCommands.textFindPrevious;
                if (!isFindTextOperation)
                    this.endBusyOperation();
            };
            DocumentViewerDemoApp.prototype.setInterpolationMode = function (document, isSvg) {
                var interpolationMode = lt.Controls.InterpolationMode.none;
                // If we are viewing as SVG, then we should not do any interpolation.
                // Also don't do interpolation if we're in UseElements Mode, because all browsers (except IE) will do decent interpolation of img elements.
                if (document != null && !isSvg && (!this._useElements || (lt.LTHelper.browser === lt.LTBrowser.internetExplorer || lt.LTHelper.browser === lt.LTBrowser.edge))) {
                    // We are viewing as an image, instruct the image viewer in the view to perform interpolation to smooth out the image
                    // when zoomed out
                    // If the document is B/W, then it is faster to perform the interpolation using scale to gray. Otherwise, use resample
                    if (document.defaultBitsPerPixel == 1) {
                        interpolationMode = lt.Controls.InterpolationMode.scaleToGray;
                    }
                    else {
                        interpolationMode = lt.Controls.InterpolationMode.resample;
                    }
                }
                this._documentViewer.view.imageViewer.interpolationMode = interpolationMode;
            };
            DocumentViewerDemoApp.prototype.imageViewer_PostRenderItem = function (sender, e) {
                if (this.demoMode === DemoMode.Barcode && sender === this._documentViewer.view.imageViewer)
                    this.drawBarcodes(e.item, e.context);
                //if (this.preferencesPart.showTextIndicators) {
                var official = $('#officialRecord').text();
                if (official == 'True') {
                    var imageViewer = sender;
                    this.drawTextIndicators(imageViewer, e.item, e.context);
                }
            };
            DocumentViewerDemoApp.prototype.drawTextIndicators = function (imageViewer, item, context) {
                // render a small T at the top-right corner
                var pageNumber = imageViewer.items.indexOf(item) + 1;
                var hasText = this._documentViewer.text.hasDocumentPageText(pageNumber);
                hasText = true;
                var transform = imageViewer.getItemImageTransform(item);
                var imageSize = item.imageSize;
                var bounds = lt.LeadRectD.create(0, 0, imageSize.width, imageSize.height);
                var corners = [
                    lt.LeadPointD.create(bounds.left, bounds.top),
                    lt.LeadPointD.create(bounds.right, bounds.top),
                    lt.LeadPointD.create(bounds.right, bounds.bottom),
                    lt.LeadPointD.create(bounds.left, bounds.bottom) 
                ];
                transform.transformPoints(corners);
                // Get the top-right point
                var topRight = corners[0];
                for (var i = 1; i < corners.length; i++) {
                    if (corners[i].x > topRight.x)
                        topRight.x = corners[i].x;
                    if (corners[i].y < topRight.y)
                        topRight.y = corners[i].y;
                }
                // To solve FUS-4486 Remove ©
                //var text = "\u00A9"; //For ©
                var fontSize = 15;
                context.font = "bold " + fontSize + "px Arial";
                context.fillStyle = "black";

                // To solve FUS-4486 Remove ©
                // context.fillText(text, (topRight.x - fontSize), (topRight.y + fontSize));
                context.fillText("",(topRight.x - fontSize), (topRight.y + fontSize));

            };
            DocumentViewerDemoApp.prototype.runValueLink = function (linkValue) {
                var _this = this;
                // Check if this is an email address
                if (linkValue.toLowerCase().slice(0, "mailto:".length) != "mailto:" && DocumentViewerDemoApp._emailRegEx.test(linkValue)) {
                    // Yes
                    linkValue = "mailto:" + linkValue;
                    window.location.href = linkValue;
                }
                else {
                    if (this._automaticallyRunLinks) {
                        if ((linkValue.toLowerCase().slice(0, "http:".length) != "http:") && (linkValue.toLowerCase().slice(0, "https:".length) != "https:")) {
                            window.open("http://" + linkValue);
                        }
                        else {
                            window.open(linkValue);
                        }
                    }
                    else {
                        this.linkValueDlg.show(linkValue);
                        this.linkValueDlg.closed = function () {
                            _this._automaticallyRunLinks = _this.linkValueDlg.doNotShowAgain;
                        };
                    }
                }
            };
            Object.defineProperty(DocumentViewerDemoApp.prototype, "documentViewer", {
                get: function () {
                    return this._documentViewer;
                },
                enumerable: true,
                configurable: true
            });
            // annotations may be passed as File or as string
            DocumentViewerDemoApp.prototype.loadDocument = function (documentUri, annotations, loadEmbeddedAnnotations, documentName) {
                var _this = this;
                this.beginBusyOperation();
                this.loadingDlg.show(false, false, "Loading Document...");
                // Setup the document load options
                var loadOptions = new lt.Documents.LoadDocumentOptions();
                loadOptions.loadEmbeddedAnnotations = loadEmbeddedAnnotations;
                if (documentName)
                    loadOptions.name = documentName;
                // Check if annotations passed as file uri
                if (typeof annotations === "string")
                    loadOptions.annotationsUri = annotations;
                // Clear the errors
                this._operationErrors = [];
                // Clear the pages loading
                this._elementsPagesLoading = [];
                // Check the device to set max image size (for scaling)
                if (lt.LTHelper.device == lt.LTDevice.desktop)
                    loadOptions.maximumImagePixelSize = 4096;
                else
                    loadOptions.maximumImagePixelSize = 2048;
                lt.Documents.DocumentFactory.loadFromUri(documentUri, loadOptions)
                    .fail(function (jqXHR, statusText, errorThrown) {
                    _this.endBusyOperation();
                    DocumentViewerDemoApp.showServiceError("Error loading the document.", jqXHR, statusText, errorThrown);
                })
                    .done(function (document) {
                    _this.loadingDlg.processing("Set Document...");
                    // Check if annotations passed as file or blob - Since File extends Blob, we only need to check if the object is an instance of the base class Blob.
                    if (annotations && lt.LTHelper.supportsFileReader && annotations instanceof Blob) {
                        // Set this provided file for us to load after everything else
                        _this._loadDocumentAnnotationsFile = annotations;
                    }
                    else {
                        // we're here either because the annotations were a URI or we don't support FileReader
                        if (annotations && !loadOptions.annotationsUri && !lt.LTHelper.supportsFileReader) {
                            alert("Your browser does not support the FileReader API, so annotations could not be loaded.");
                        }
                        _this._loadDocumentAnnotationsFile = null;
                    }
                    _this.setDocument(document);
                });
            };
            DocumentViewerDemoApp.prototype.uploadDocument = function (documentFile, annotationsFile, loadEmbeddedAnnotations) {
                var _this = this;
                this.beginBusyOperation();
                this.loadingDlg.show(true, true, "Uploading Document...");
                var uploadPromise = lt.Documents.DocumentFactory.uploadFile(documentFile);
                uploadPromise.done(function (uploadedDocumentUrl) {
                    _this.loadingDlg.progress(100);
                    _this.loadDocument(uploadedDocumentUrl, annotationsFile, loadEmbeddedAnnotations, documentFile.name);
                });
                uploadPromise.fail(function (jqXHR, statusText, errorThrown) {
                    var serviceError = lt.Documents.ServiceError.parseError(jqXHR, statusText, errorThrown);
                    if (serviceError.isAbortError) {
                        // aborted
                        return;
                    }
                    _this.endBusyOperation();
                    DocumentViewerDemoApp.showServiceError("Error uploading document.", jqXHR, statusText, errorThrown);
                });
                uploadPromise.progress(function (progressOb) {
                    _this.loadingDlg.progress(Math.round(progressOb.progress));
                    if (_this.loadingDlg.isCancelled) {
                        uploadPromise.abort();
                        _this.loadingDlg.progress(100);
                    }
                });
            };
            DocumentViewerDemoApp.prototype.loadCachedDocument = function (cacheId, showLoadFromCacheDialog) {
                var _this = this;
                this.beginBusyOperation();
                this.loadingDlg.show(false, false, "Loading Cached Document...");
                var loadFromCachePromise = lt.Documents.DocumentFactory.loadFromCache(cacheId);
                loadFromCachePromise.done(function (document) {
                    if (document) {
                        _this.loadingDlg.processing("Set Document...");
                        _this._loadDocumentAnnotationsFile = null;
                        _this.setDocument(document);
                    }
                    else {
                        // Delay for UI smoothing
                        setTimeout(function () {
                            // No document was found in the cache, try again
                            if (showLoadFromCacheDialog) {
                                _this.loadDocumentFromCacheDlg.show();
                            }
                            _this.endBusyOperation();
                            var message = "No document could be found in the cache for the identifier '" + cacheId + "'.";
                            lt.LTHelper.logError(message);
                            alert(message);
                        }, 500);
                    }
                });
                loadFromCachePromise.fail(function (jqXHR, statusText, errorThrown) {
                    _this.endBusyOperation();
                    DocumentViewerDemoApp.showServiceError("Error loading cached document.", jqXHR, statusText, errorThrown);
                });
            };
            DocumentViewerDemoApp.prototype.convertDocument = function (jobData) {
                var _this = this;
                var doc = this.documentViewer.document;
                // Finally, try to add the name of the document for the conversion result
                var name = null;
                var uri = doc.uri;
                if (uri && uri.indexOf("http:") === 0) {
                    if (uri[uri.length - 1] === "/")
                        uri = uri.slice(0, -1);
                    name = uri.substring(uri.lastIndexOf("/") + 1);
                    if (name) {
                        var dotIndex = name.indexOf(".");
                        if (dotIndex !== -1) {
                            name = name.substring(0, dotIndex);
                        }
                    }
                }
                if (!name && doc.metadata) {
                    name = doc.metadata["title"] || null;
                }
                if (name)
                    name = name.toLowerCase();
                jobData.documentName = name;
                // Prepare to save will update the document in the server
                // if needed (such as annotations)
                var hasChanged = this.documentViewer.prepareToSave();
                this.beginBusyOperation();
                this.loadingDlg.show(false, false, "Saving to cache...");
                if (hasChanged || doc.cacheStatus === lt.Documents.DocumentCacheStatus.notSynced) {
                    // Save will update the document in the server
                    var saveToCachePromise = lt.Documents.DocumentFactory.saveToCache(doc);
                    saveToCachePromise.done(function () {
                        _this.runConvertPromise(doc, jobData);
                    });
                    saveToCachePromise.fail(function (jqXHR, statusText, errorThrown) {
                        _this.endBusyOperation();
                        DocumentViewerDemoApp.showServiceError("Error saving the document.", jqXHR, statusText, errorThrown);
                    });
                }
                else {
                    this.runConvertPromise(doc, jobData);
                }
            };
            DocumentViewerDemoApp.prototype.runConvertPromise = function (documentToConvert, jobData) {
                var _this = this;
                this.loadingDlg.processing("Converting...");
                // Now convert it
                var convertPromise = documentToConvert.convert(jobData);
                convertPromise.done(function (docConversion) {
                    // If we have an archive, that's all we will have.
                    // If it doesn't exist, handle the document and possible annotations
                    if (docConversion.archive && docConversion.archive.url) {
                        _this.saveToDlg.show([docConversion.archive]);
                    }
                    else if (docConversion.document && docConversion.document.url) {
                        var items = [docConversion.document];
                        if (docConversion.annotations && docConversion.annotations.url) {
                            items.push(docConversion.annotations);
                        }
                        _this.saveToDlg.show(items);
                    }
                });
                convertPromise.fail(function (jqXHR, statusText, errorThrown) {
                    DocumentViewerDemoApp.showServiceError("Error converting the document.", jqXHR, statusText, errorThrown);
                });
                convertPromise.always(function () {
                    _this.endBusyOperation();
                });
            };
            // OCR mode
            DocumentViewerDemoApp.prototype.recognize = function (page, searchArea) {
                var _this = this;
                var promcmd = page.getText(searchArea);
                this.beginBusyOperation();
                this.loadingDlg.show(false, false, "Recognizing...");
                promcmd.done(function (pageText) {
                    var text = "";
                    if (pageText) {
                        pageText.buildText();
                        var text = pageText.text;
                    }
                    _this.textResultDlg.show("Results", text.trim());
                });
                promcmd.fail(function (jqXHR, statusText, errorThrown) {
                    DocumentViewerDemoApp.showServiceError("Error getting text", jqXHR, statusText, errorThrown);
                });
                promcmd.always(function () {
                    _this.endBusyOperation();
                });
            };
            DocumentViewerDemoApp.prototype.readBarcodes = function (page, searchArea) {
                // If we have a page, process just that page (with the bounds, if available)
                // If we have a null page and haven't processed all pages before, process all pages (with no bounds)
                var _this = this;
                if (page == null && searchArea.isEmpty) {
                    if (this._allBarcodes) {
                        // We've done this before. Show the data.
                        this.showPreviousBarcodeData(this._allBarcodes);
                        return;
                    }
                    else {
                        this._allBarcodes = [];
                    }
                }
                var barcodesRead = 0;
                var currentPageNumber = 1; // 1-based
                var length = 1;
                var index = 0;
                var pages = [];
                if (page == null) {
                    // do all pages
                    length = this._documentViewer.document.pages.count;
                    // 0-based
                    for (var i = 0; i < length; i++) {
                        pages.push(this._documentViewer.document.pages.item(i));
                    }
                }
                else {
                    // 1 page total
                    pages = [page];
                }
                // Show our dialog
                this.processingPagesDlg.show("Reading Barcodes", pages.length, [
                    "Page",
                    "Symbology",
                    "Value",
                    "Location",
                ]);
                var pageDone = function (barcodes) {
                    if (!_this.processingPagesDlg.isCanceled) {
                        _this._currentBarcodes[currentPageNumber - 1] = barcodes;
                        if (page == null && searchArea.isEmpty) {
                            _this._allBarcodes.push(barcodes);
                        }
                        if (barcodes) {
                            barcodesRead += barcodes.length;
                            barcodes.forEach(function (barcodeData) {
                                _this.processingPagesDlg.addData(currentPageNumber, [
                                    DocumentViewerDemoApp._barcodeSymbologyNames[barcodeData.symbology],
                                    barcodeData.value,
                                    [barcodeData.bounds.top, barcodeData.bounds.right, barcodeData.bounds.bottom, barcodeData.bounds.left]
                                        .map(function (val) {
                                        // clean up
                                        return parseFloat(val.toFixed(2));
                                    })
                                        .join(", "),
                                ]);
                            });
                        }
                        // Draw the barcodes
                        _this._documentViewer.view.imageViewer.invalidate(lt.LeadRectD.empty);
                        index++;
                        if (index < length) {
                            chooseNext();
                        }
                        else {
                            _this.processingPagesDlg.finishProcessing();
                            _this.processingPagesDlg.updateStatus("Barcode reading complete - " + barcodesRead + " found.");
                        }
                    }
                    else {
                        // It was canceled, don't save this work
                        _this._allBarcodes = null;
                    }
                };
                var pageFail = function (jqXHR, statusText, errorThrown) {
                    _this._allBarcodes = null;
                    _this.processingPagesDlg.finishProcessing();
                    _this.processingPagesDlg.updateStatus("Barcode reading failed on page " + currentPageNumber + ".");
                    DocumentViewerDemoApp.showServiceError("Error reading barcodes", jqXHR, statusText, errorThrown);
                };
                var chooseNext = function () {
                    var newPage = pages[index];
                    currentPageNumber = newPage.pageNumber;
                    _this.processingPagesDlg.updateStatus("Processing page " + currentPageNumber);
                    newPage.readBarcodes(searchArea, 0, null)
                        .done(pageDone)
                        .fail(pageFail);
                };
                chooseNext();
                //this.beginBusyOperation();
                //this.endBusyOperation();
            };
            DocumentViewerDemoApp.prototype.checkBarcodeData = function (index, searchArea) {
                if (this._currentBarcodes && this._currentBarcodes[index] && this._currentBarcodes[index].length > 0) {
                    var pageBarcodes = this._currentBarcodes[index];
                    var searchX = searchArea.x;
                    var searchY = searchArea.y;
                    var barcodesToShow = pageBarcodes.filter(function (data) {
                        if (searchX > data.bounds.left && searchX < data.bounds.right && searchY > data.bounds.top && searchY < data.bounds.bottom)
                            return true;
                    });
                    if (barcodesToShow.length > 0) {
                        // make into a [][], by page index
                        var barcodesByPage = [];
                        barcodesByPage[index] = barcodesToShow;
                        this.showPreviousBarcodeData(barcodesByPage);
                    }
                }
            };
            DocumentViewerDemoApp.prototype.showPreviousBarcodeData = function (barcodePages) {
                var _this = this;
                var count = barcodePages.filter(function (barcodePage) {
                    return barcodePage && barcodePage.length > 0;
                }).length;
                this.processingPagesDlg.show("Barcode", count, [
                    "Page",
                    "Symbology",
                    "Value",
                    "Location",
                ]);
                this.processingPagesDlg.updateStatus("Barcodes previously read.");
                this.processingPagesDlg.finishProcessing();
                barcodePages.forEach(function (barcodeDataPage, pageIndex) {
                    barcodeDataPage.forEach(function (barcodeData) {
                        _this.processingPagesDlg.addData(pageIndex + 1, [
                            DocumentViewerDemoApp._barcodeSymbologyNames[barcodeData.symbology],
                            barcodeData.value,
                            [barcodeData.bounds.top, barcodeData.bounds.right, barcodeData.bounds.bottom, barcodeData.bounds.left]
                                .map(function (val) {
                                // clean up
                                return parseFloat(val.toFixed(2));
                            })
                                .join(", "),
                        ]);
                    });
                });
            };
            DocumentViewerDemoApp.prototype.drawBarcodes = function (item, context) {
                var _this = this;
                var itemIndex = this._documentViewer.view.imageViewer.items.indexOf(item);
                if (this._currentBarcodes != null && this._currentBarcodes[itemIndex] && this._currentBarcodes[itemIndex].length > 0) {
                    var imageViewer = this._documentViewer.view.imageViewer;
                    var mat = this._documentViewer.view.imageViewer.getItemImageTransform(item);
                    // Draw the barcodes we found
                    context.save();
                    context.beginPath();
                    var itemBarcodes = this._currentBarcodes[itemIndex];
                    itemBarcodes.forEach(function (barcodeData) {
                        var bounds = _this._documentViewer.document.rectToPixels(barcodeData.bounds);
                        bounds = mat.transformRect(bounds);
                        context.lineWidth = 3;
                        context.strokeStyle = "red";
                        context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
                        bounds.inflate(3, 3);
                        context.strokeStyle = "green";
                        context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
                    });
                    context.closePath();
                    context.restore();
                }
            };
            // We'll do certain actions only for the mobile version
            DocumentViewerDemoApp.isMobileVersion = false;
            DocumentViewerDemoApp._cssTransformsHideCanvasClass = "hide-for-transitions";
            DocumentViewerDemoApp._cssTransformsReadyCanvasClass = "ready-for-transitions";
            DocumentViewerDemoApp._emailRegEx = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
            // Friendly Names
            DocumentViewerDemoApp._barcodeSymbologyNames = [
                "Unknown", "EAN-13", "EAN-8", "UPC-A", "UPC-E", "Code 3 Of 9", "Code 128", "Code Interleaved 2 Of 5", "CODABAR",
                "UCC/EAN 128", "Code 93", "EAN-EXT-5", "EAN-EXT-2", "MSI", "Code 11", "Code Standard 2 Of 5", "GS1 Databar",
                "GS1 Databar Limited", "GS1 Databar Expanded", "Patch Code", "POSTNET", "Planet", "Australian Post 4State",
                "Royal Mail (RM4SCC)", "USPS OneCode Intelligent Mail", "GS1 Databar Stacked", "GS1 Databar Expanded Stacked",
                "PDF417", "MicroPDF417", "Datamatrix", "QR", "Aztec", "Maxi", "MicroQR", "Pharma Code"
            ];
            return DocumentViewerDemoApp;
        }());
        DocumentViewerDemo.DocumentViewerDemoApp = DocumentViewerDemoApp;
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
    var Network = (function () {
        function Network() {
        }
        Object.defineProperty(Network, "queryString", {
            get: function () {
                return Network._queryString;
            },
            enumerable: true,
            configurable: true
        });
        ;
        // Example: ..../index.html?a=b&c=d&e=f&a=g ==> {"a":["b","g"], "c":["d"], "e":["f"]}
        // All values are strings
        Network._queryString = (function () {
            var queryString = {};
            var search = window.location.search;
            var hash = window.location.hash;
            if (search === "" && hash) {
                search = hash;
            }
            var query = search.substring(1);
            // Trim the slash if it's at the end
            if (query[query.length - 1] === "/")
                query = query.substring(0, query.length - 1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var keyVal = vars[i].split("=");
                var key = keyVal[0];
                var val = decodeURIComponent(keyVal[1]);
                if (typeof queryString[key] === "undefined") {
                    queryString[key] = [val];
                }
                else {
                    queryString[key].push(val);
                }
            }
            return queryString;
        })();
        return Network;
    }());
    HTML5Demos.Network = Network;
})(HTML5Demos || (HTML5Demos = {}));
window.onload = function () {
    //if (lt.LTHelper.device == lt.LTDevice.mobile) {
    //    // Run mobile version
    //    HTML5Demos.DocumentViewerDemo.DocumentViewerDemoApp.isMobileVersion = true;
    //    if (window.location.href.toLocaleLowerCase().indexOf("index.mobile.html") == -1) {
    //        var cacheId = "";
    //        if (window.location.href.indexOf("?cacheId") > -1) {
    //            // The demo is called from external storage manager
    //            // So run the default mode
    //            cacheId = window.location.href.substring(window.location.href.indexOf("?cacheId"));
    //            window.location.href = "index.mobile.html" + cacheId;
    //            return;
    //        }
    //        var demoMode = "";
    //        if (window.location.href.indexOf("?mode") > -1)
    //            demoMode = window.location.href.substring(window.location.href.indexOf("?mode"));
    //        window.location.href = "index.mobile.html" + demoMode;
    //        return;
    //    }
    //}
    //else {
    //    // Run desktop version
    //    if (window.location.href.toLocaleLowerCase().indexOf("index.html") == -1) {
    //        var cacheId = "";
    //        if (window.location.href.indexOf("?cacheId") > -1) {
    //            // The demo is called from external storage manager
    //            // So run the defualt mode
    //            cacheId = window.location.href.substring(window.location.href.indexOf("?cacheId"));
    //            window.location.href = "index.html" + cacheId;
    //            return;
    //        }
    //        var demoMode = "";
    //        if (window.location.href.indexOf("?mode") > -1)
    //            demoMode = window.location.href.substring(window.location.href.indexOf("?mode"));
    //        window.location.href = "index.html" + demoMode;
    //        return;
    //    }
    //}
    //$(document.body).css("display", "block");
    new HTML5Demos.DocumentViewerDemo.DocumentViewerDemoApp().run();
};
