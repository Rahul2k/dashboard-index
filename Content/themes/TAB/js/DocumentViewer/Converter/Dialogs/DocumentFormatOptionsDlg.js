var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        var Converter;
        (function (Converter) {
            var Dialogs;
            (function (Dialogs) {
                var DocumentFormatOptionsDlg = (function () {
                    function DocumentFormatOptionsDlg() {
                        // Create shortcuts for the dialog UI elements 
                        this.dialogUI = {
                            dialog: "#documentFormatOptionsDialog",
                            documentFormatNameLabel: "#documentFormatName",
                            optionsControls: {
                                controlsDivs: ".optionsControls",
                                pdfOptionsControl: {
                                    Div: "#pdfOptionsControl",
                                    // Options
                                    pdfDocumentTypeSelectElement: "#pdfDocumentType",
                                    pdfAdvancedOptionsBtn: "#pdfAdvancedOptions",
                                    pdfImageOverTextCheckbox: "#pdfImageOverText"
                                },
                                docOptionsControl: {
                                    Div: "#docOptionsControl",
                                    // Options
                                    frameTextCheckbox: "#docFrameText"
                                },
                                rtfOptionsControl: {
                                    Div: "#rtfOptionsControl",
                                    // Options
                                    frameTextCheckbox: "#rtfFrameText"
                                },
                                htmOptionsControl: {
                                    Div: "#htmOptionsControl",
                                    // Options
                                    htmEmbedFontModeSelectElement: "#htmEmbedFontMode",
                                    htmUseBackgroundColorCheckbox: "#htmUseBackgroundColor",
                                    htmBackgroundColor: "#htmBackgroundColor"
                                },
                                txtOptionsControl: {
                                    Div: "#txtOptionsControl",
                                    // Options
                                    txtDocumentTypeSelectElement: "#txtDocumentType",
                                    txtAddPageNumberCheckbox: "#txtAddPageNumber",
                                    txtAddPageBreakeCheckbox: "#txtAddPageBreake",
                                    txtFormattedCheckbox: "#txtFormatted"
                                },
                                emfOptionsControl: {
                                    Div: "#emfOptionsControl"
                                },
                                docxOptionsControl: {
                                    Div: "#docxOptionsControl",
                                    // Options
                                    frameTextCheckbox: "#docxFrameText"
                                },
                                noOptionsFormats: {
                                    Div: "#noOptionsFormats"
                                }
                            },
                            OkBtn: "#documentFormatsOptionsDialog_OK"
                        };
                        this.Init();
                    }
                    Object.defineProperty(DocumentFormatOptionsDlg.prototype, "documentFormat", {
                        set: function (value) {
                            this._documentFormat = value;
                            this.initInputsValues();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(DocumentFormatOptionsDlg.prototype, "totalPages", {
                        set: function (value) {
                            this._totalPages = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    DocumentFormatOptionsDlg.prototype.Init = function () {
                        $(this.dialogUI.optionsControls.pdfOptionsControl.pdfAdvancedOptionsBtn).bind("click", $.proxy(this.pdfAdvancedOptionsBtn_Click, this));
                        $(this.dialogUI.optionsControls.htmOptionsControl.htmUseBackgroundColorCheckbox).bind("click", $.proxy(this.htmUseBackgroundColorCheckbox_Click, this));
                        $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
                        // Init advanced PDF options dialog
                        this._advancedPdfOptionsDlg = new Converter.Dialogs.AdvancedPdfOptionsDlg();
                    };
                    DocumentFormatOptionsDlg.prototype.initInputsValues = function () {
                        switch (this._documentFormat.extension) {
                            case "pdf":
                                var pdfOptions = this._documentFormat.options;
                                $(this.dialogUI.optionsControls.pdfOptionsControl.pdfDocumentTypeSelectElement).prop("selectedIndex", pdfOptions.documentType);
                                $(this.dialogUI.optionsControls.pdfOptionsControl.pdfImageOverTextCheckbox).prop('checked', pdfOptions.imageOverText);
                                break;
                            case "doc":
                                var docOptions = this._documentFormat.options;
                                $(this.dialogUI.optionsControls.docOptionsControl.frameTextCheckbox).prop('checked', docOptions.textMode == lt.Documents.Writers.DocumentTextMode.framed);
                                break;
                            case "rtf":
                                var rtfOptions = this._documentFormat.options;
                                $(this.dialogUI.optionsControls.rtfOptionsControl.frameTextCheckbox).prop('checked', rtfOptions.textMode == lt.Documents.Writers.DocumentTextMode.framed);
                                break;
                            case "docx":
                                var docxOptions = this._documentFormat.options;
                                $(this.dialogUI.optionsControls.docxOptionsControl.frameTextCheckbox).prop('checked', docxOptions.textMode == lt.Documents.Writers.DocumentTextMode.framed);
                                break;
                            case "htm":
                                var htmlOptions = this._documentFormat.options;
                                $(this.dialogUI.optionsControls.htmOptionsControl.htmEmbedFontModeSelectElement).prop("selectedIndex", htmlOptions.fontEmbedMode);
                                $(this.dialogUI.optionsControls.htmOptionsControl.htmUseBackgroundColorCheckbox).prop('checked', htmlOptions.useBackgroundColor);
                                $(this.dialogUI.optionsControls.htmOptionsControl.htmBackgroundColor).spectrum({ color: htmlOptions.backgroundColor });
                                break;
                            case "txt":
                                var textOptions = this._documentFormat.options;
                                // use utf8 instead of ansi
                                if (textOptions.documentType == lt.Documents.Writers.TextDocumentType.ansi)
                                    textOptions.documentType = lt.Documents.Writers.TextDocumentType.utf8;
                                $(this.dialogUI.optionsControls.txtOptionsControl.txtDocumentTypeSelectElement).prop("selectedIndex", textOptions.documentType);
                                $(this.dialogUI.optionsControls.txtOptionsControl.txtAddPageNumberCheckbox).prop('checked', textOptions.addPageNumber);
                                $(this.dialogUI.optionsControls.txtOptionsControl.txtAddPageBreakeCheckbox).prop('checked', textOptions.addPageNumber);
                                $(this.dialogUI.optionsControls.txtOptionsControl.txtFormattedCheckbox).prop('checked', textOptions.formatted);
                                break;
                        }
                    };
                    DocumentFormatOptionsDlg.prototype.show = function () {
                        // Set the dialog name to format friendly name
                        $(this.dialogUI.documentFormatNameLabel).text(this._documentFormat.friendlyName);
                        // Hide all controls divs
                        $(this.dialogUI.optionsControls.controlsDivs).hide();
                        // Show the selected control div
                        switch (this._documentFormat.extension) {
                            case "pdf":
                                $(this.dialogUI.optionsControls.pdfOptionsControl.Div).show();
                                break;
                            case "doc":
                                $(this.dialogUI.optionsControls.docOptionsControl.Div).show();
                                break;
                            case "rtf":
                                $(this.dialogUI.optionsControls.rtfOptionsControl.Div).show();
                                break;
                            case "htm":
                                $(this.dialogUI.optionsControls.htmOptionsControl.Div).show();
                                break;
                            case "txt":
                                $(this.dialogUI.optionsControls.txtOptionsControl.Div).show();
                                break;
                            case "docx":
                                $(this.dialogUI.optionsControls.docxOptionsControl.Div).show();
                                break;
                            case "emf":
                                $(this.dialogUI.optionsControls.emfOptionsControl.Div).show();
                                break;
                            default:
                                $(this.dialogUI.optionsControls.noOptionsFormats.Div).show();
                                break;
                        }
                        $(this.dialogUI.dialog).modal();
                    };
                    DocumentFormatOptionsDlg.prototype.pdfAdvancedOptionsBtn_Click = function (e) {
                        this._advancedPdfOptionsDlg.totalPages = this._totalPages;
                        this._documentFormat.options.documentType = parseInt($(this.dialogUI.optionsControls.pdfOptionsControl.pdfDocumentTypeSelectElement).val());
                        this._documentFormat.options.imageOverText = $(this.dialogUI.optionsControls.pdfOptionsControl.pdfImageOverTextCheckbox).is(':checked');
                        this._advancedPdfOptionsDlg.pdfOptions = this._documentFormat.options;
                        this._advancedPdfOptionsDlg.show();
                    };
                    DocumentFormatOptionsDlg.prototype.htmUseBackgroundColorCheckbox_Click = function (e) {
                        var useBackgroundColor = $(e.currentTarget).is(':checked');
                        // Disable/Enable color picker
                        if (useBackgroundColor) {
                            $(this.dialogUI.optionsControls.htmOptionsControl.htmBackgroundColor).spectrum("enable");
                        }
                        else {
                            $(this.dialogUI.optionsControls.htmOptionsControl.htmBackgroundColor).spectrum("disable");
                        }
                    };
                    DocumentFormatOptionsDlg.prototype.OkBtn_Click = function (e) {
                        $(this.dialogUI.dialog).modal("hide");
                        switch (this._documentFormat.extension) {
                            case "pdf":
                                this._documentFormat.options.documentType = parseInt($(this.dialogUI.optionsControls.pdfOptionsControl.pdfDocumentTypeSelectElement).val());
                                this._documentFormat.options.imageOverText = $(this.dialogUI.optionsControls.pdfOptionsControl.pdfImageOverTextCheckbox).is(':checked');
                                break;
                            case "doc":
                                this._documentFormat.options.textMode = $(this.dialogUI.optionsControls.docOptionsControl.frameTextCheckbox).is(':checked') ? lt.Documents.Writers.DocumentTextMode.framed : lt.Documents.Writers.DocumentTextMode.nonFramed;
                                break;
                            case "rtf":
                                this._documentFormat.options.textMode = $(this.dialogUI.optionsControls.rtfOptionsControl.frameTextCheckbox).is(':checked') ? lt.Documents.Writers.DocumentTextMode.framed : lt.Documents.Writers.DocumentTextMode.nonFramed;
                                break;
                            case "docx":
                                this._documentFormat.options.textMode = $(this.dialogUI.optionsControls.docxOptionsControl.frameTextCheckbox).is(':checked') ? lt.Documents.Writers.DocumentTextMode.framed : lt.Documents.Writers.DocumentTextMode.nonFramed;
                                break;
                            case "htm":
                                this._documentFormat.options.fontEmbedMode = parseInt($(this.dialogUI.optionsControls.htmOptionsControl.htmEmbedFontModeSelectElement).val());
                                this._documentFormat.options.useBackgroundColor = $(this.dialogUI.optionsControls.htmOptionsControl.htmUseBackgroundColorCheckbox).is(':checked');
                                this._documentFormat.options.backgroundColor = $(this.dialogUI.optionsControls.htmOptionsControl.htmBackgroundColor).spectrum('get').toHexString();
                                break;
                            case "txt":
                                this._documentFormat.options.documentType = parseInt($(this.dialogUI.optionsControls.txtOptionsControl.txtDocumentTypeSelectElement).val());
                                this._documentFormat.options.addPageNumber = $(this.dialogUI.optionsControls.txtOptionsControl.txtAddPageNumberCheckbox).is(':checked');
                                this._documentFormat.options.addPageBreak = $(this.dialogUI.optionsControls.txtOptionsControl.txtAddPageBreakeCheckbox).is(':checked');
                                this._documentFormat.options.formatted = $(this.dialogUI.optionsControls.txtOptionsControl.txtFormattedCheckbox).is(':checked');
                                break;
                        }
                    };
                    return DocumentFormatOptionsDlg;
                }());
                Dialogs.DocumentFormatOptionsDlg = DocumentFormatOptionsDlg;
            })(Dialogs = Converter.Dialogs || (Converter.Dialogs = {}));
        })(Converter = DocumentViewerDemo.Converter || (DocumentViewerDemo.Converter = {}));
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
})(HTML5Demos || (HTML5Demos = {}));
