var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        //Annotations Load Options 
        var AnnotationsLoadOption;
        (function (AnnotationsLoadOption) {
            AnnotationsLoadOption[AnnotationsLoadOption["none"] = 0] = "none";
            AnnotationsLoadOption[AnnotationsLoadOption["embedded"] = 1] = "embedded";
            AnnotationsLoadOption[AnnotationsLoadOption["external"] = 2] = "external";
        })(AnnotationsLoadOption || (AnnotationsLoadOption = {}));
        var FileUrlLoadOption;
        (function (FileUrlLoadOption) {
            FileUrlLoadOption[FileUrlLoadOption["sample"] = 0] = "sample";
            FileUrlLoadOption[FileUrlLoadOption["url"] = 1] = "url";
        })(FileUrlLoadOption || (FileUrlLoadOption = {}));
        // Custom event args for the UploadDocumentDlg load event
        var UploadDocumentEventArgs = (function () {
            function UploadDocumentEventArgs() {
                this.loadEmbeddedAnnotations = false;
            }
            return UploadDocumentEventArgs;
        }());
        Dialogs.UploadDocumentEventArgs = UploadDocumentEventArgs;
        // Custom event args for the OpenDocumentFromUrlDlg load event
        var OpenDocumentFromUrlEventArgs = (function () {
            function OpenDocumentFromUrlEventArgs() {
                this.fileUrl = "";
                this.annotationsUrl = "";
                this.loadEmbeddedAnnotations = false;
            }
            return OpenDocumentFromUrlEventArgs;
        }());
        Dialogs.OpenDocumentFromUrlEventArgs = OpenDocumentFromUrlEventArgs;
        // Custom event args for the OpenDocumentFromUrlDlg load event
        var OpenFromDocumentStorageEventArgs = (function () {
            function OpenFromDocumentStorageEventArgs() {
                this.loadEmbeddedAnnotations = false;
            }
            return OpenFromDocumentStorageEventArgs;
        }());
        Dialogs.OpenFromDocumentStorageEventArgs = OpenFromDocumentStorageEventArgs;
        var UploadDocumentDlg = (function () {
            function UploadDocumentDlg() {
                this._uploadEventArgs = null;
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#uploadDocumentDialog",
                    documentFileInput: "#documentFile",
                    annotationsLoadOptionsRadioBtnsGroup: "input[name=uploadDocumentDialog_annotationsLoadOptions]",
                    loadExternalAnnotationsControlsDiv: "#loadExternalAnnotationsControls",
                    annotationsFileInput: "#annotationsFile",
                    OkBtn: "#uploadDocumentDialog_OK"
                };
                // Create the arguments
                this._uploadEventArgs = new UploadDocumentEventArgs();
                this.Init();
            }
            UploadDocumentDlg.prototype.Init = function () {
                // Reset the dialog input elements, to avoid cached data
                $(this.dialogUI.documentFileInput).val("");
                $(this.dialogUI.annotationsFileInput).val("");
                $(this.dialogUI.annotationsLoadOptionsRadioBtnsGroup).first().click();
                $(this.dialogUI.annotationsLoadOptionsRadioBtnsGroup).bind("click", $.proxy(this.annotationsLoadOptionsRadioBtnsGroup_BtnClicked, this));
                $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
            };
            UploadDocumentDlg.prototype.show = function () {
                $(this.dialogUI.dialog).modal();
            };
            UploadDocumentDlg.prototype.OkBtn_Click = function (e) {
                // Get the file object
                var documentFile = $(this.dialogUI.documentFileInput)[0].files[0];
                if (documentFile == null) {
                    window.alert("Must choose a document file first");
                    return;
                }
                else {
                    this._uploadEventArgs.documenFile = documentFile;
                }
                var selectedAnnotationsLoadOption = $(this.dialogUI.annotationsLoadOptionsRadioBtnsGroup).filter(':checked').val();
                if (selectedAnnotationsLoadOption == AnnotationsLoadOption.none) {
                    this._uploadEventArgs.loadEmbeddedAnnotations = false;
                    this._uploadEventArgs.annotationFile = null;
                }
                else if (selectedAnnotationsLoadOption == AnnotationsLoadOption.embedded) {
                    this._uploadEventArgs.loadEmbeddedAnnotations = true;
                    this._uploadEventArgs.annotationFile = null;
                }
                else if (selectedAnnotationsLoadOption == AnnotationsLoadOption.external) {
                    this._uploadEventArgs.loadEmbeddedAnnotations = false;
                    var annotationsFile = $(this.dialogUI.annotationsFileInput)[0].files[0];
                    if (annotationsFile == null) {
                        window.alert("Must choose an annotations file first");
                        return;
                    }
                    else {
                        this._uploadEventArgs.annotationFile = annotationsFile;
                    }
                }
                $(this.dialogUI.dialog).modal("hide");
                if (this._OkClick != null)
                    // fire the OK click event and pass the upload args
                    this._OkClick(this._uploadEventArgs);
            };
            UploadDocumentDlg.prototype.annotationsLoadOptionsRadioBtnsGroup_BtnClicked = function (e) {
                var selectedAnnotationsLoadOption = $(e.currentTarget).val();
                // If load external annotations , enable annotations file input
                $(this.dialogUI.annotationsFileInput).prop("disabled", !(selectedAnnotationsLoadOption == AnnotationsLoadOption.external));
            };
            Object.defineProperty(UploadDocumentDlg.prototype, "OkClick", {
                // Events mutators
                set: function (value) {
                    this._OkClick = value;
                },
                enumerable: true,
                configurable: true
            });
            return UploadDocumentDlg;
        }());
        Dialogs.UploadDocumentDlg = UploadDocumentDlg;
        var OpenDocumentFromUrlDlg = (function () {
            function OpenDocumentFromUrlDlg(sampleDocuments) {
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#openDocumentFromUrlDialog",
                    urlLoadOptionsRadioBtnsGroup: "input[name=openDocumentFromUrlDialog_urlOptions]",
                    fileSampleSelectElement: "#fileSelect",
                    fileUrlTextInput: "#fileUrl",
                    annotationsLoadOptionsRadioBtnsGroup: "input[name=openDocumentFromUrlDialog_annotationsLoadOptions]",
                    annotationsUrlTextInput: "#annotationsUrl",
                    loadBtn: "#openDocumentFromUrlDialog_load"
                };
                this._openFromUrlEventArgs = null;
                this._selectedLoadAnnotations = AnnotationsLoadOption.none;
                this._selectedLoadFileUrl = FileUrlLoadOption.sample;
                this._sampleDocuments = null;
                // Create the arguments
                this._openFromUrlEventArgs = new OpenDocumentFromUrlEventArgs();
                this._sampleDocuments = sampleDocuments.slice();
                this.Init();
            }
            OpenDocumentFromUrlDlg.prototype.Init = function () {
                // Reset the dialog input elements, to avoid cached data
                var $fileSelectElement = $(this.dialogUI.fileSampleSelectElement);
                $fileSelectElement.empty();
                $fileSelectElement.prop("selectedIndex", 0);
                // Add the options to the <select>
                this._sampleDocuments.forEach(function (documentUrl, index) {
                    var $option = $(document.createElement("option")).text(documentUrl);
                    if (index === 0)
                        $option.attr("selected", "");
                    $fileSelectElement.append($option);
                });
                var $fileLoadOptions = $(this.dialogUI.urlLoadOptionsRadioBtnsGroup);
                $fileLoadOptions.bind("click", $.proxy(this.urlLoadOptionsRadioBtnsGroup_BtnClicked, this));
                var $annLoadOptions = $(this.dialogUI.annotationsLoadOptionsRadioBtnsGroup);
                $annLoadOptions.bind("click", $.proxy(this.annotationsLoadOptionsRadioBtnsGroup_BtnClicked, this));
                this.updateUI();
                $(this.dialogUI.loadBtn).bind("click", $.proxy(this.loadBtn_Click, this));
            };
            OpenDocumentFromUrlDlg.prototype.show = function () {
                $(this.dialogUI.dialog).modal();
            };
            OpenDocumentFromUrlDlg.prototype.urlLoadOptionsRadioBtnsGroup_BtnClicked = function (e) {
                var fileUrl = parseInt($(e.currentTarget).val(), 10);
                this._selectedLoadFileUrl = fileUrl;
                this.updateUI();
            };
            OpenDocumentFromUrlDlg.prototype.annotationsLoadOptionsRadioBtnsGroup_BtnClicked = function (e) {
                var selectedAnnotationsLoadOption = parseInt($(e.currentTarget).val());
                this._selectedLoadAnnotations = selectedAnnotationsLoadOption;
                this.updateUI();
            };
            OpenDocumentFromUrlDlg.prototype.updateUI = function () {
                $(this.dialogUI.fileUrlTextInput).prop("disabled", this._selectedLoadFileUrl !== FileUrlLoadOption.url);
                $(this.dialogUI.annotationsLoadOptionsRadioBtnsGroup).prop("disabled", this._selectedLoadFileUrl !== FileUrlLoadOption.url);
                $(this.dialogUI.annotationsUrlTextInput).prop("disabled", this._selectedLoadFileUrl !== FileUrlLoadOption.url || this._selectedLoadAnnotations !== AnnotationsLoadOption.external);
                $(this.dialogUI.fileSampleSelectElement).prop("disabled", this._selectedLoadFileUrl !== FileUrlLoadOption.sample);
            };
            OpenDocumentFromUrlDlg.prototype.loadBtn_Click = function (e) {
                var urlLoadOption = this._selectedLoadFileUrl;
                var annLoadOption = this._selectedLoadAnnotations;
                if (urlLoadOption === FileUrlLoadOption.sample) {
                    var selectedSampleIndex = $(this.dialogUI.fileSampleSelectElement).find(":selected").index();
                    var sample = this._sampleDocuments[selectedSampleIndex];
                    // If using a sample document, no annotations
                    annLoadOption = AnnotationsLoadOption.none;
                    this._openFromUrlEventArgs.fileUrl = OpenDocumentFromUrlDlg.getSampleUrl(sample);
                }
                else {
                    var documentUrl = $(this.dialogUI.fileUrlTextInput).val();
                    if (documentUrl == null || documentUrl == "") {
                        window.alert("Must enter a document URL first");
                        return;
                    }
                    else {
                        this._openFromUrlEventArgs.fileUrl = documentUrl;
                    }
                }
                if (annLoadOption == AnnotationsLoadOption.none) {
                    this._openFromUrlEventArgs.loadEmbeddedAnnotations = false;
                    this._openFromUrlEventArgs.annotationsUrl = null;
                }
                else if (annLoadOption == AnnotationsLoadOption.embedded) {
                    this._openFromUrlEventArgs.loadEmbeddedAnnotations = true;
                    this._openFromUrlEventArgs.annotationsUrl = null;
                }
                else if (annLoadOption == AnnotationsLoadOption.external) {
                    this._openFromUrlEventArgs.loadEmbeddedAnnotations = false;
                    var annotationsUrl = $(this.dialogUI.annotationsUrlTextInput).val();
                    if (annotationsUrl == null || annotationsUrl == "") {
                        window.alert("Must enter an external annotations URL first");
                        return;
                    }
                    else {
                        this._openFromUrlEventArgs.annotationsUrl = $(this.dialogUI.annotationsUrlTextInput).val();
                    }
                }
                $(this.dialogUI.dialog).modal("hide");
                if (this._loadClick != null)
                    // fire the loadClick event , and pass the load args
                    this._loadClick(this._openFromUrlEventArgs);
            };
            Object.defineProperty(OpenDocumentFromUrlDlg.prototype, "loadClick", {
                // Events mutators
                set: function (value) {
                    this._loadClick = value;
                },
                enumerable: true,
                configurable: true
            });
            OpenDocumentFromUrlDlg.getSampleUrl = function (name) {
                if (name.indexOf("http") === 0) {
                    return name;
                }
                else {
                    var newDocumentUrl = 'Samples/' + name;
                    var serviceBase = lt.Documents.DocumentFactory.serviceUri;
                    var serviceApiPath = lt.Documents.DocumentFactory.serviceApiPath;
                    if (serviceApiPath) {
                        var serviceApiPathIndex = serviceBase.indexOf(serviceApiPath);
                        if (serviceApiPathIndex !== -1) {
                            serviceBase = serviceBase.substring(0, serviceApiPathIndex);
                        }
                    }
                    if (serviceBase.charAt(serviceBase.length - 1) !== "/")
                        serviceBase += "/";
                    return serviceBase + newDocumentUrl;
                }
            };
            return OpenDocumentFromUrlDlg;
        }());
        Dialogs.OpenDocumentFromUrlDlg = OpenDocumentFromUrlDlg;
        var LoadDocumentFromCacheDlg = (function () {
            function LoadDocumentFromCacheDlg() {
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#loadDocumentFromCacheDialog",
                    cacheIdTextInput: "#cacheId",
                    loadBtn: "#loadDocumentFromCacheDialog_load"
                };
                this.Init();
            }
            LoadDocumentFromCacheDlg.prototype.Init = function () {
                $(this.dialogUI.loadBtn).bind("click", $.proxy(this.loadBtn_Click, this));
            };
            LoadDocumentFromCacheDlg.prototype.show = function () {
                $(this.dialogUI.dialog).modal();
            };
            LoadDocumentFromCacheDlg.prototype.loadBtn_Click = function (e) {
                var cacheId = $(this.dialogUI.cacheIdTextInput).val();
                if (cacheId == null || cacheId == "") {
                    window.alert("Must enter a cache ID first");
                    return;
                }
                else {
                    this._cacheId = $(this.dialogUI.cacheIdTextInput).val();
                }
                $(this.dialogUI.dialog).modal("hide");
                if (this._loadClick != null)
                    // fire the loadClick event , and pass cache id
                    this._loadClick(this._cacheId);
            };
            Object.defineProperty(LoadDocumentFromCacheDlg.prototype, "loadClick", {
                // Events mutators
                set: function (value) {
                    this._loadClick = value;
                },
                enumerable: true,
                configurable: true
            });
            return LoadDocumentFromCacheDlg;
        }());
        Dialogs.LoadDocumentFromCacheDlg = LoadDocumentFromCacheDlg;
        var OpenFromDocumentStorageDlg = (function () {
            function OpenFromDocumentStorageDlg() {
                this._openFromDocumentStorageEventArgs = null;
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#openFromDocumentStorageDialog",
                    openFromDocumentStorageInformation: "#openFromDocumentStorageInformation",
                    //openDocumentFromOneDriveBtn: "#openDocumentFromOneDrive",
                    //openDocumentFromSharePointBtn: "#openDocumentFromSharePoint",
                    //openDocumentFromGoogleDriveBtn: "#openDocumentFromGoogleDrive",
                    documentFileNameTextInput: "#documentFileName",
                    documentLoadingImage: "#documentLoading",
                    annotationsLoadOptionsRadioBtnsGroup: "input[name=openFromDocumentStorageDialog_annotationsLoadOptions]",
                    //openAnnotationsFromOneDriveBtn: "#openAnnotationsFromOneDrive",
                    //openAnnotationsFromSharePointBtn: "#openAnnotationsFromSharePoint",
                    //openAnnotationsFromGoogleDriveBtn: "#openAnnotationsFromGoogleDrive",
                    annotationsFileNameTextInput: "#annotationsFileName",
                    annotationsLoadingImage: "#annotationsLoading",
                    OkBtn: "#openFromDocumentStorageDialog_OK"
                };
                // Create the arguments
                this._openFromDocumentStorageEventArgs = new OpenFromDocumentStorageEventArgs();
                //this._oneDriveHelper = new HTML5Demos.DriveHelper.LTOneDrive.OneDriveHelper();
                //this._googleDriveHelper = new HTML5Demos.DriveHelper.LTGoogleDrive.GoogleDriveHelper();
            }
            //Object.defineProperty(OpenFromDocumentStorageDlg.prototype, "googleDriveHelper", {
            //    get: function () {
            //        return this._googleDriveHelper;
            //    },
            //    enumerable: true,
            //    configurable: true
            //});
            //Object.defineProperty(OpenFromDocumentStorageDlg.prototype, "sharePointHelper", {
            //    set: function (value) {
            //        this._sharePointHelper = value;
            //    },
            //    enumerable: true,
            //    configurable: true
            //});
            // SharePoint should be set and Google Drive should be registered before calling init
            //OpenFromDocumentStorageDlg.prototype.init = function () {
            //    var _this = this;
            //    // OneDrive
            //    this._oneDriveHelper.openDone = function (file) { return _this.openDone(file); };
            //    // SharePoint
            //    this._sharePointHelper.openDone = function (file) { return _this.openDone(file); };
            //    // GoogleDrive
            //    // if IE9, Google Drive (which is not supported) will throw an error. So don't create it.
            //    if (!(lt.LTHelper.browser === lt.LTBrowser.internetExplorer && lt.LTHelper.version <= 9)) {
            //        this._googleDriveHelper.openDone = function (file) { return _this.openDone(file); };
            //    }
            //    // Reset the dialog input elements, to avoid cached data
            //    $(this.dialogUI.annotationsLoadOptionsRadioBtnsGroup).first().click();
            //    // Right now Google Drive and Microsoft OneDrive will get blocked on Microsoft Edge, so we disable them.
            //    if (lt.LTHelper.browser == lt.LTBrowser.edge) {
            //        $(this.dialogUI.openFromDocumentStorageInformation).text("Open from Microsoft OneDrive or Google Drive is not currently supported by Microsoft Edge.");
            //        $(this.dialogUI.openDocumentFromOneDriveBtn).prop("disabled", true);
            //        $(this.dialogUI.openDocumentFromGoogleDriveBtn).prop("disabled", true);
            //        $(this.dialogUI.openAnnotationsFromOneDriveBtn).prop("disabled", true);
            //        $(this.dialogUI.openAnnotationsFromGoogleDriveBtn).prop("disabled", true);
            //    }
            //    else {
            //        var googleIsRegistered = this._googleDriveHelper && this._googleDriveHelper.isRegisteredForLoad;
            //        var oneDriveIsRegistered = this._oneDriveHelper && this._oneDriveHelper.isRegisteredForLoadSave;
            //        if (googleIsRegistered) {
            //            $(this.dialogUI.openDocumentFromGoogleDriveBtn).bind("click", $.proxy(this.openDocumentFromGoogleDriveBtn_Clicked, this));
            //            $(this.dialogUI.openAnnotationsFromGoogleDriveBtn).bind("click", $.proxy(this.openAnnotationsFromGoogleDriveBtn_Clicked, this));
            //        }
            //        else {
            //            $(this.dialogUI.openDocumentFromGoogleDriveBtn).prop("disabled", true);
            //            $(this.dialogUI.openAnnotationsFromGoogleDriveBtn).prop("disabled", true);
            //        }
            //        if (oneDriveIsRegistered) {
            //            $(this.dialogUI.openDocumentFromOneDriveBtn).bind("click", $.proxy(this.openDocumentFromOneDriveBtn_Clicked, this));
            //            $(this.dialogUI.openAnnotationsFromOneDriveBtn).bind("click", $.proxy(this.openAnnotationsFromOneDriveBtn_Clicked, this));
            //        }
            //        else {
            //            $(this.dialogUI.openDocumentFromOneDriveBtn).prop("disabled", true);
            //            $(this.dialogUI.openAnnotationsFromOneDriveBtn).prop("disabled", true);
            //        }
            //        var vendorsDisabled = "";
            //        if (!googleIsRegistered) {
            //            vendorsDisabled = "Google Drive";
            //        }
            //        if (!oneDriveIsRegistered) {
            //            if (!googleIsRegistered)
            //                vendorsDisabled += " and ";
            //            vendorsDisabled += "OneDrive";
            //        }
            //        if (vendorsDisabled) {
            //            $(this.dialogUI.openFromDocumentStorageInformation).text(vendorsDisabled + " must be registered before loading or saving is available.");
            //        }
            //    }
            //    $(this.dialogUI.openDocumentFromSharePointBtn).bind("click", $.proxy(this.openDocumentFromSharePointBtn_Clicked, this));
            //    $(this.dialogUI.openAnnotationsFromSharePointBtn).bind("click", $.proxy(this.openAnnotationsFromSharePointBtn_Clicked, this));
            //    $(this.dialogUI.annotationsLoadOptionsRadioBtnsGroup).bind("click", $.proxy(this.annotationsLoadOptionsRadioBtnsGroup_BtnClicked, this));
            //    $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
            //};
            OpenFromDocumentStorageDlg.prototype.show = function () {
                $(this.dialogUI.dialog).modal();
            };
            //OpenFromDocumentStorageDlg.prototype.openDocumentFromOneDriveBtn_Clicked = function (e) {
            //    this._isAnnotationsFile = false;
            //    this._oneDriveHelper.open();
            //    $(this.dialogUI.documentLoadingImage).css("display", "block");
            //};
            //OpenFromDocumentStorageDlg.prototype.openDocumentFromSharePointBtn_Clicked = function (e) {
            //    this._isAnnotationsFile = false;
            //    this._sharePointHelper.open();
            //    $(this.dialogUI.documentLoadingImage).css("display", "block");
            //};
            //OpenFromDocumentStorageDlg.prototype.openDocumentFromGoogleDriveBtn_Clicked = function (e) {
            //    this._isAnnotationsFile = false;
            //    this._googleDriveHelper.open();
            //    $(this.dialogUI.documentLoadingImage).css("display", "block");
            //};
            //OpenFromDocumentStorageDlg.prototype.openAnnotationsFromOneDriveBtn_Clicked = function (e) {
            //    this._isAnnotationsFile = true;
            //    this._oneDriveHelper.open();
            //    $(this.dialogUI.annotationsLoadingImage).css("display", "block");
            //};
            //OpenFromDocumentStorageDlg.prototype.openAnnotationsFromSharePointBtn_Clicked = function (e) {
            //    this._isAnnotationsFile = true;
            //    this._sharePointHelper.open();
            //    $(this.dialogUI.annotationsLoadingImage).css("display", "block");
            //};
            //OpenFromDocumentStorageDlg.prototype.openAnnotationsFromGoogleDriveBtn_Clicked = function (e) {
            //    this._isAnnotationsFile = true;
            //    this._googleDriveHelper.open();
            //    $(this.dialogUI.annotationsLoadingImage).css("display", "block");
            //};
            // Open done handler 
            OpenFromDocumentStorageDlg.prototype.openDone = function (file) {
                if (!this._isAnnotationsFile) {
                    // Open document file
                    $(this.dialogUI.documentLoadingImage).css("display", "none");
                    if (file) {
                        $(this.dialogUI.documentFileNameTextInput).css("visibility", "visible");
                        $(this.dialogUI.documentFileNameTextInput).val(file.name);
                        this._openFromDocumentStorageEventArgs.documentFile = file;
                    }
                }
                else {
                    // Open annotations file
                    $(this.dialogUI.annotationsLoadingImage).css("display", "none");
                    if (file) {
                        $(this.dialogUI.annotationsFileNameTextInput).css("visibility", "visible");
                        $(this.dialogUI.annotationsFileNameTextInput).val(file.name);
                        this._openFromDocumentStorageEventArgs.annotationsFile = file;
                    }
                }
            };
            //OpenFromDocumentStorageDlg.prototype.annotationsLoadOptionsRadioBtnsGroup_BtnClicked = function (e) {
            //    var selectedAnnotationsLoadOption = $(e.currentTarget).val();
            //    var loadExternal = selectedAnnotationsLoadOption == AnnotationsLoadOption.external;
            //    // If load external annotations , enable annotations url text input
            //    $(this.dialogUI.openAnnotationsFromSharePointBtn).prop("disabled", !loadExternal);
            //    // They must be disabled on Microsoft Edge
            //    if (lt.LTHelper.browser != lt.LTBrowser.edge) {
            //        $(this.dialogUI.openAnnotationsFromOneDriveBtn).prop("disabled", !loadExternal || !this._oneDriveHelper || !this._oneDriveHelper.isRegisteredForLoadSave);
            //        $(this.dialogUI.openAnnotationsFromGoogleDriveBtn).prop("disabled", !loadExternal || !this._googleDriveHelper || !this._googleDriveHelper.isRegisteredForLoad);
            //    }
            //};
            OpenFromDocumentStorageDlg.prototype.OkBtn_Click = function (e) {
                if (this._openFromDocumentStorageEventArgs.documentFile == null) {
                    window.alert("Must choose a document file first");
                    return;
                }
                var selectedAnnotationsLoadOption = $(this.dialogUI.annotationsLoadOptionsRadioBtnsGroup).filter(':checked').val();
                if (selectedAnnotationsLoadOption == AnnotationsLoadOption.none) {
                    this._openFromDocumentStorageEventArgs.loadEmbeddedAnnotations = false;
                    this._openFromDocumentStorageEventArgs.annotationsFile = null;
                }
                else if (selectedAnnotationsLoadOption == AnnotationsLoadOption.embedded) {
                    this._openFromDocumentStorageEventArgs.loadEmbeddedAnnotations = true;
                    this._openFromDocumentStorageEventArgs.annotationsFile = null;
                }
                else if (selectedAnnotationsLoadOption == AnnotationsLoadOption.external) {
                    this._openFromDocumentStorageEventArgs.loadEmbeddedAnnotations = false;
                    var annotationsFile = this._openFromDocumentStorageEventArgs.annotationsFile;
                    if (annotationsFile == null) {
                        window.alert("Must choose an annotations file first");
                        return;
                    }
                }
                $(this.dialogUI.dialog).modal("hide");
                if (this._OkClick != null)
                    // fire the OkClick event , and pass the open args
                    this._OkClick(this._openFromDocumentStorageEventArgs);
            };
            Object.defineProperty(OpenFromDocumentStorageDlg.prototype, "OkClick", {
                // Events mutators
                set: function (value) {
                    this._OkClick = value;
                },
                enumerable: true,
                configurable: true
            });
            return OpenFromDocumentStorageDlg;
        }());
        Dialogs.OpenFromDocumentStorageDlg = OpenFromDocumentStorageDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
