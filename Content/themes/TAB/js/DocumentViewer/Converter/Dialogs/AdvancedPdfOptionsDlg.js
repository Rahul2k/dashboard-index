var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        var Converter;
        (function (Converter) {
            var Dialogs;
            (function (Dialogs) {
                var AdvancedPdfOptionsDlg = (function () {
                    function AdvancedPdfOptionsDlg() {
                        this.dialogUI = {
                            dialog: "#advancedPdfOptionsDialog",
                            DescriptionTab: {
                                titleTextInput: "#pdfTitle",
                                subjectTextInput: "#pdfSubject",
                                authorTextInput: "#pdfAuthor",
                                keywordsTextInput: "#pdfKeywords"
                            },
                            fontTab: {
                                fontEmbeddingSelectElement: "#pdfFontEmbedding",
                                linearizedCheckbox: "#pdfLinearized"
                            },
                            securityTab: {
                                inputElements: ".securityTabInput",
                                protectedDocumentCheckbox: "#pdfProtectedDocument",
                                encryptionModeSelectElement: "#pdfEncryptionMode",
                                userPasswordTextInput: "#pdfUserPassword",
                                ownerPasswordTextInput: "#pdfOwnerPassword",
                                permissionsGroup: ".permissionsGroup",
                                copyEnabledCheckbox: "#pdfCopyEnabled",
                                editEnabledCheckbox: "#pdfEditEnabled",
                                annotationsEnabledCheckbox: "#pdfAnnotationsEnabled",
                                printEnabledCheckbox: "#pdfPrintEnabled",
                                assemblyEnabledCheckbox: "#pdfAssemblyEnabled",
                                highQualityPrintEnabledCheckbox: "#pdfHighQualityPrintEnabled"
                            },
                            compressionTab: {
                                oneBitImageCompressionSelectElement: "#pdfOneBitImageCompression",
                                coloredImageCompressionSelectElement: "#pdfColoredImageCompression",
                                qualityFactorTextInput: "#pdfQualityFactor",
                                imageOverTextSizeSelectElement: "#pdfImageOverTextSize",
                                imageOverTextModeSelectElement: "#pdfImageOverTextMode",
                            },
                            initialViewTab: {
                                documentPageModeTypeSelectElement: "#PdfDocumentPageModeType",
                                documentPageLayoutTypeSelectElement: "#PdfDocumentPageLayoutType",
                                documentPageFitTypeSelectElement: "#PdfDocumentPageFitType",
                                initialPageNumberTextInput: "#pdfInitialPageNumber",
                                totalPagesLable: "#totalPages",
                                fitWindowCheckbox: "#pdfFitWindow",
                                centerWindowCheckbox: "#pdfCenterWindow",
                                displayDocTitleSelectElement: "#pdfDisplayDocTitle",
                                hideMenubarCheckbox: "#pdfHideMenubar",
                                hideToolbarCheckbox: "#pdfHideToolbar",
                                hideWindowUICheckbox: "#pdfHideWindowUI",
                            },
                            OkBtn: "#advancedPdfOptionsDialog_OK"
                        };
                        this.Init();
                    }
                    Object.defineProperty(AdvancedPdfOptionsDlg.prototype, "pdfOptions", {
                        set: function (value) {
                            this._pdfOptions = value;
                            this.initInputsValues();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(AdvancedPdfOptionsDlg.prototype, "totalPages", {
                        set: function (value) {
                            this._totalPages = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    AdvancedPdfOptionsDlg.prototype.Init = function () {
                        $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
                        $(this.dialogUI.securityTab.protectedDocumentCheckbox).bind("change", $.proxy(this.protectedDocumentCheckbox_CheckedChanged, this));
                        $(this.dialogUI.securityTab.encryptionModeSelectElement).bind("change", $.proxy(this.encryptionModeSelectElement_SelectedIndexChanged, this));
                        $(this.dialogUI.securityTab.printEnabledCheckbox).bind("change", $.proxy(this.printEnabledCheckbox_CheckedChanged, this));
                        $(this.dialogUI.securityTab.editEnabledCheckbox).bind("change", $.proxy(this.editEnabledCheckbox_CheckedChanged, this));
                        $(this.dialogUI.compressionTab.coloredImageCompressionSelectElement).bind("change", $.proxy(this.coloredImageCompressionSelectElement_SelectedIndexChanged, this));
                        $(this.dialogUI.compressionTab.qualityFactorTextInput).bind("change", $.proxy(this.qualityFactorTextInput_Changed, this));
                        $(this.dialogUI.initialViewTab.initialPageNumberTextInput).bind("change", $.proxy(this.initialPageNumberTextInput_Changed, this));
                        $(this.dialogUI.initialViewTab.hideMenubarCheckbox).bind("change", $.proxy(this.hideMenubarCheckbox_CheckedChanged, this));
                        $(this.dialogUI.initialViewTab.hideWindowUICheckbox).bind("change", $.proxy(this.hideWindowUICheckbox_CheckedChanged, this));
                    };
                    AdvancedPdfOptionsDlg.prototype.initInputsValues = function () {
                        // Description tab options
                        $(this.dialogUI.DescriptionTab.titleTextInput).val(this._pdfOptions.title);
                        $(this.dialogUI.DescriptionTab.subjectTextInput).val(this._pdfOptions.subject);
                        $(this.dialogUI.DescriptionTab.authorTextInput).val(this._pdfOptions.author);
                        $(this.dialogUI.DescriptionTab.keywordsTextInput).val(this._pdfOptions.keywords);
                        // Font tab options
                        $(this.dialogUI.fontTab.fontEmbeddingSelectElement).prop("selectedIndex", this._pdfOptions.fontEmbedMode);
                        $(this.dialogUI.fontTab.linearizedCheckbox).prop('checked', this._pdfOptions.linearized);
                        // Security tab options
                        $(this.dialogUI.securityTab.protectedDocumentCheckbox).prop('checked', this._pdfOptions.isProtected);
                        $(this.dialogUI.securityTab.encryptionModeSelectElement).prop("selectedIndex", this._pdfOptions.encryptionMode);
                        $(this.dialogUI.securityTab.userPasswordTextInput).val(this._pdfOptions.userPassword);
                        $(this.dialogUI.securityTab.ownerPasswordTextInput).val(this._pdfOptions.ownerPassword);
                        $(this.dialogUI.securityTab.copyEnabledCheckbox).prop('checked', this._pdfOptions.copyEnabled);
                        $(this.dialogUI.securityTab.editEnabledCheckbox).prop('checked', this._pdfOptions.editEnabled);
                        $(this.dialogUI.securityTab.annotationsEnabledCheckbox).prop('checked', this._pdfOptions.annotationsEnabled);
                        $(this.dialogUI.securityTab.printEnabledCheckbox).prop('checked', this._pdfOptions.printEnabled);
                        $(this.dialogUI.securityTab.assemblyEnabledCheckbox).prop('checked', this._pdfOptions.assemblyEnabled);
                        $(this.dialogUI.securityTab.highQualityPrintEnabledCheckbox).prop('checked', this._pdfOptions.highQualityPrintEnabled);
                        // Compression tab options
                        $(this.dialogUI.compressionTab.oneBitImageCompressionSelectElement).prop("selectedIndex", this._pdfOptions.oneBitImageCompression);
                        $(this.dialogUI.compressionTab.coloredImageCompressionSelectElement).prop("selectedIndex", this._pdfOptions.coloredImageCompression);
                        $(this.dialogUI.compressionTab.qualityFactorTextInput).val(this._pdfOptions.qualityFactor.toString());
                        $(this.dialogUI.compressionTab.imageOverTextSizeSelectElement).prop("selectedIndex", this._pdfOptions.imageOverTextSize);
                        $(this.dialogUI.compressionTab.imageOverTextModeSelectElement).prop("selectedIndex", this._pdfOptions.imageOverTextMode);
                        // Initial view tab options
                        $(this.dialogUI.initialViewTab.documentPageModeTypeSelectElement).prop("selectedIndex", this._pdfOptions.pageModeType);
                        $(this.dialogUI.initialViewTab.documentPageLayoutTypeSelectElement).prop("selectedIndex", this._pdfOptions.pageLayoutType);
                        if (this._pdfOptions.zoomPercent == 0) {
                            $(this.dialogUI.initialViewTab.documentPageFitTypeSelectElement).prop("selectedIndex", this._pdfOptions.pageFitType);
                        }
                        else {
                            var options = $(this.dialogUI.initialViewTab.documentPageFitTypeSelectElement)[0].options;
                            for (var key in options) {
                                if (options.hasOwnProperty(key)) {
                                    var optionVal = parseInt(options[key].value);
                                    if (this._pdfOptions.zoomPercent == optionVal) {
                                        $(this.dialogUI.initialViewTab.documentPageFitTypeSelectElement).prop("selectedIndex", parseInt(key));
                                    }
                                }
                            }
                        }
                        $(this.dialogUI.initialViewTab.initialPageNumberTextInput).val(this._pdfOptions.initialPageNumber.toString());
                        $(this.dialogUI.initialViewTab.totalPagesLable).text("of " + this._totalPages.toString());
                        $(this.dialogUI.initialViewTab.fitWindowCheckbox).prop('checked', this._pdfOptions.fitWindow);
                        $(this.dialogUI.initialViewTab.centerWindowCheckbox).prop('checked', this._pdfOptions.centerWindow);
                        $(this.dialogUI.initialViewTab.displayDocTitleSelectElement).prop("selectedIndex", (this._pdfOptions.displayDocTitle) ? 1 : 0);
                        $(this.dialogUI.initialViewTab.hideMenubarCheckbox).prop('checked', this._pdfOptions.hideMenubar);
                        $(this.dialogUI.initialViewTab.hideToolbarCheckbox).prop('checked', this._pdfOptions.hideToolbar);
                        $(this.dialogUI.initialViewTab.hideWindowUICheckbox).prop('checked', this._pdfOptions.hideWindowUI);
                        this.updateUIState();
                    };
                    AdvancedPdfOptionsDlg.prototype.updateUIState = function () {
                        if (this._pdfOptions.documentType == lt.Documents.Writers.PdfDocumentType.pdfA) {
                            // Disable the font embedding option
                            $(this.dialogUI.fontTab.fontEmbeddingSelectElement).prop("disabled", true);
                            // Disable the all security options
                            $(this.dialogUI.securityTab.inputElements).prop("disabled", true);
                        }
                        else {
                            $(this.dialogUI.fontTab.fontEmbeddingSelectElement).prop("disabled", false);
                            $(this.dialogUI.securityTab.inputElements).prop("disabled", false);
                            var protectedDocument = $(this.dialogUI.securityTab.protectedDocumentCheckbox).is(':checked');
                            // disable encryption mode , passwords, and the permissions options if not protected document
                            $(this.dialogUI.securityTab.encryptionModeSelectElement).prop("disabled", !protectedDocument);
                            $(this.dialogUI.securityTab.userPasswordTextInput).prop("disabled", !protectedDocument);
                            $(this.dialogUI.securityTab.ownerPasswordTextInput).prop("disabled", !protectedDocument);
                            $(this.dialogUI.securityTab.permissionsGroup).prop("disabled", !protectedDocument);
                            if (protectedDocument && $(this.dialogUI.securityTab.encryptionModeSelectElement).val() != null) {
                                var encryptionMode = ($(this.dialogUI.securityTab.encryptionModeSelectElement).val());
                                var enabledAssemblyEnabledCheckbox = (encryptionMode == lt.Documents.Writers.PdfDocumentEncryptionMode.rc128Bit) && !($(this.dialogUI.securityTab.editEnabledCheckbox).is(':checked'));
                                $(this.dialogUI.securityTab.assemblyEnabledCheckbox).prop("disabled", !enabledAssemblyEnabledCheckbox);
                                var enabledHighQualityPrintEnabledCheckbox = (encryptionMode == lt.Documents.Writers.PdfDocumentEncryptionMode.rc128Bit) && ($(this.dialogUI.securityTab.printEnabledCheckbox).is(':checked'));
                                $(this.dialogUI.securityTab.highQualityPrintEnabledCheckbox).prop("disabled", !enabledHighQualityPrintEnabledCheckbox);
                            }
                        }
                        // Disable the image over text options if not image over text
                        $(this.dialogUI.compressionTab.imageOverTextSizeSelectElement).prop("disabled", !this._pdfOptions.imageOverText);
                        $(this.dialogUI.compressionTab.imageOverTextModeSelectElement).prop("disabled", !this._pdfOptions.imageOverText);
                        if ($(this.dialogUI.compressionTab.coloredImageCompressionSelectElement).val() != null) {
                            var coloredImageCompression = ($(this.dialogUI.compressionTab.coloredImageCompressionSelectElement).val());
                            if (coloredImageCompression == lt.Documents.Writers.ColoredImageCompressionType.flateJpeg ||
                                coloredImageCompression == lt.Documents.Writers.ColoredImageCompressionType.lzwJpeg ||
                                coloredImageCompression == lt.Documents.Writers.ColoredImageCompressionType.jpeg ||
                                coloredImageCompression == lt.Documents.Writers.ColoredImageCompressionType.flateJpx ||
                                coloredImageCompression == lt.Documents.Writers.ColoredImageCompressionType.lzwJpx ||
                                coloredImageCompression == lt.Documents.Writers.ColoredImageCompressionType.jpx) {
                                $(this.dialogUI.compressionTab.qualityFactorTextInput).prop("disabled", false);
                            }
                            else {
                                $(this.dialogUI.compressionTab.qualityFactorTextInput).prop("disabled", true);
                            }
                        }
                    };
                    AdvancedPdfOptionsDlg.prototype.show = function () {
                        $(this.dialogUI.dialog).modal();
                    };
                    AdvancedPdfOptionsDlg.prototype.protectedDocumentCheckbox_CheckedChanged = function (e) {
                        this.updateUIState();
                    };
                    AdvancedPdfOptionsDlg.prototype.encryptionModeSelectElement_SelectedIndexChanged = function (e) {
                        this.updateUIState();
                    };
                    AdvancedPdfOptionsDlg.prototype.printEnabledCheckbox_CheckedChanged = function (e) {
                        this.updateUIState();
                    };
                    AdvancedPdfOptionsDlg.prototype.editEnabledCheckbox_CheckedChanged = function (e) {
                        this.updateUIState();
                    };
                    AdvancedPdfOptionsDlg.prototype.coloredImageCompressionSelectElement_SelectedIndexChanged = function (e) {
                        this.updateUIState();
                    };
                    AdvancedPdfOptionsDlg.prototype.qualityFactorTextInput_Changed = function (e) {
                        var qualityFactor = parseInt($(e.currentTarget).val());
                        // Check for valid integer number between [2 - 255]
                        if (!(qualityFactor && qualityFactor >= 2 && qualityFactor <= 255)) {
                            if (qualityFactor > 255) {
                                $(e.currentTarget).val("255");
                            }
                            else if (qualityFactor < 2) {
                                $(e.currentTarget).val("2");
                            }
                            else {
                                $(e.currentTarget).val(this._pdfOptions.qualityFactor.toString());
                            }
                        }
                    };
                    AdvancedPdfOptionsDlg.prototype.initialPageNumberTextInput_Changed = function (e) {
                        var initialPageNumber = parseInt($(e.currentTarget).val());
                        if (!(initialPageNumber && initialPageNumber >= 1 && initialPageNumber <= this._totalPages)) {
                            $(e.currentTarget).val(this._pdfOptions.initialPageNumber.toString());
                        }
                    };
                    AdvancedPdfOptionsDlg.prototype.hideMenubarCheckbox_CheckedChanged = function (e) {
                        // Hide Window Controls and Hide Menubar doesn't work together even on Adobe Acrobat side, so we will uncheck the other one if one of them is checked
                        if ($(this.dialogUI.initialViewTab.hideWindowUICheckbox).is(':checked')) {
                            $(this.dialogUI.initialViewTab.hideWindowUICheckbox).prop('checked', false);
                        }
                    };
                    AdvancedPdfOptionsDlg.prototype.hideWindowUICheckbox_CheckedChanged = function (e) {
                        // Hide Window Controls and Hide Menubar doesn't work together even on Adobe Acrobat side, so we will uncheck the other one if one of them is checked
                        if ($(this.dialogUI.initialViewTab.hideMenubarCheckbox).is(':checked')) {
                            $(this.dialogUI.initialViewTab.hideMenubarCheckbox).prop('checked', false);
                        }
                    };
                    AdvancedPdfOptionsDlg.prototype.OkBtn_Click = function (e) {
                        // Description options
                        this._pdfOptions.title = $(this.dialogUI.DescriptionTab.titleTextInput).val();
                        this._pdfOptions.subject = $(this.dialogUI.DescriptionTab.subjectTextInput).val();
                        this._pdfOptions.author = $(this.dialogUI.DescriptionTab.authorTextInput).val();
                        this._pdfOptions.keywords = $(this.dialogUI.DescriptionTab.keywordsTextInput).val();
                        // Font options
                        this._pdfOptions.fontEmbedMode = parseInt($(this.dialogUI.fontTab.fontEmbeddingSelectElement).val());
                        this._pdfOptions.linearized = $(this.dialogUI.fontTab.linearizedCheckbox).is(':checked');
                        // Security options
                        this._pdfOptions.isProtected = $(this.dialogUI.securityTab.protectedDocumentCheckbox).is(':checked');
                        this._pdfOptions.encryptionMode = parseInt($(this.dialogUI.securityTab.encryptionModeSelectElement).val());
                        this._pdfOptions.userPassword = $(this.dialogUI.securityTab.userPasswordTextInput).val();
                        this._pdfOptions.ownerPassword = $(this.dialogUI.securityTab.ownerPasswordTextInput).val();
                        this._pdfOptions.copyEnabled = $(this.dialogUI.securityTab.copyEnabledCheckbox).is(':checked');
                        this._pdfOptions.editEnabled = $(this.dialogUI.securityTab.editEnabledCheckbox).is(':checked');
                        this._pdfOptions.annotationsEnabled = $(this.dialogUI.securityTab.annotationsEnabledCheckbox).is(':checked');
                        this._pdfOptions.printEnabled = $(this.dialogUI.securityTab.printEnabledCheckbox).is(':checked');
                        this._pdfOptions.assemblyEnabled = $(this.dialogUI.securityTab.assemblyEnabledCheckbox).is(':checked');
                        this._pdfOptions.highQualityPrintEnabled = $(this.dialogUI.securityTab.highQualityPrintEnabledCheckbox).is(':checked');
                        // Compression options
                        this._pdfOptions.oneBitImageCompression = parseInt($(this.dialogUI.compressionTab.oneBitImageCompressionSelectElement).val());
                        this._pdfOptions.coloredImageCompression = parseInt($(this.dialogUI.compressionTab.coloredImageCompressionSelectElement).val());
                        this._pdfOptions.qualityFactor = parseInt($(this.dialogUI.compressionTab.qualityFactorTextInput).val());
                        this._pdfOptions.imageOverTextSize = parseInt($(this.dialogUI.compressionTab.imageOverTextSizeSelectElement).val());
                        this._pdfOptions.imageOverTextMode = parseInt($(this.dialogUI.compressionTab.imageOverTextModeSelectElement).val());
                        // Initial view options
                        this._pdfOptions.pageModeType = parseInt($(this.dialogUI.initialViewTab.documentPageModeTypeSelectElement).val());
                        this._pdfOptions.pageLayoutType = parseInt($(this.dialogUI.initialViewTab.documentPageLayoutTypeSelectElement).val());
                        var selectedPageFitVal = parseInt($(this.dialogUI.initialViewTab.documentPageFitTypeSelectElement).val());
                        if (selectedPageFitVal >= 0 && selectedPageFitVal <= 5) {
                            // Selected value is one of the original enum members, so just use it
                            this._pdfOptions.pageFitType = selectedPageFitVal;
                            this._pdfOptions.zoomPercent = 0;
                        }
                        else {
                            this._pdfOptions.zoomPercent = selectedPageFitVal;
                        }
                        this._pdfOptions.initialPageNumber = parseInt($(this.dialogUI.initialViewTab.initialPageNumberTextInput).val());
                        this._pdfOptions.fitWindow = $(this.dialogUI.initialViewTab.fitWindowCheckbox).is(':checked');
                        this._pdfOptions.centerWindow = $(this.dialogUI.initialViewTab.centerWindowCheckbox).is(':checked');
                        this._pdfOptions.displayDocTitle = ($(this.dialogUI.initialViewTab.displayDocTitleSelectElement).val() == "1") ? true : false;
                        this._pdfOptions.hideMenubar = $(this.dialogUI.initialViewTab.hideMenubarCheckbox).is(':checked');
                        this._pdfOptions.hideToolbar = $(this.dialogUI.initialViewTab.hideToolbarCheckbox).is(':checked');
                        this._pdfOptions.hideWindowUI = $(this.dialogUI.initialViewTab.hideWindowUICheckbox).is(':checked');
                    };
                    return AdvancedPdfOptionsDlg;
                }());
                Dialogs.AdvancedPdfOptionsDlg = AdvancedPdfOptionsDlg;
            })(Dialogs = Converter.Dialogs || (Converter.Dialogs = {}));
        })(Converter = DocumentViewerDemo.Converter || (DocumentViewerDemo.Converter = {}));
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
})(HTML5Demos || (HTML5Demos = {}));
