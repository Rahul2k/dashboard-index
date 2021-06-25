var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        var Converter;
        (function (Converter) {
            var Dialogs;
            (function (Dialogs) {
                var DocumentConverterDlg = (function () {
                    function DocumentConverterDlg() {
                        // Create shortcuts for the dialog UI elements 
                        this.dialogUI = {
                            dialog: "#documentConverterDialog",
                            documentTab: {
                                multiplePagesOptions: {
                                    startPageTextInput: "#startPage",
                                    firstPageCheckbox: "#documentConverterDialog_FirstPage",
                                    endPageTextInput: "#endPage",
                                    lastPageCheckbox: "#documentConverterDialog_LastPage"
                                },
                                mainConverterFormatsSelectElement: "#mainConverterFormats",
                                documentFormatsControlsDiv: "#documentFormatsControls",
                                documentFormatsSelectElement: "#documentFormats",
                                documentFormatOptionsBtn: "#documentFormatOptions",
                                rasterFormatsSelectElement: "#rasterFormats",
                                annotationsModeSelectElement: "#annotationsMode"
                            },
                            optionsTab: {
                                enableSvgConversionCheckbox: "#enableSvgConversion",
                                jobErrorModeCheckbox: "#jobErrorMode",
                                svgImagesRecognitionModeSelectElement: "#svgImagesRecognitionMode",
                                emptyPageModeSelectElement: "#emptyPageMode",
                                jobNameTextInput: "#jobName",
                                pageNumberingTemplateTextInput: "#pageNumberingTemplate",
                                preprocessorDeskewCheckbox: "#preprocessorDeskew",
                                preprocessorInvertCheckbox: "#preprocessorInvert",
                                preprocessorOrientCheckbox: "#preprocessorOrient",
                                defaultsBtn: "#revertToDefaults"
                            },
                            OkBtn: "#documentConverterDialog_OK"
                        };
                        this._convertJobData = new lt.Documents.DocumentConverterJobData();
                        this._convertJobData.jobName = "My Job";
                        this.Init();
                    }
                    Object.defineProperty(DocumentConverterDlg.prototype, "totalPages", {
                        set: function (value) {
                            this._totalPages = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(DocumentConverterDlg.prototype, "currentPageNumber", {
                        set: function (value) {
                            this._currentPageNumber = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(DocumentConverterDlg.prototype, "OkClick", {
                        set: function (value) {
                            this._OkClick = value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    DocumentConverterDlg.prototype.Init = function () {
                        // Add the document formats options to documentFormatsSelectElement
                        this.createDocumentFormatsOptions();
                        // Add the raster formats options to rasterFormatsSelectElement
                        this.createRasterFormatsOptions();
                        $(this.dialogUI.documentTab.documentFormatsControlsDiv).show();
                        $(this.dialogUI.documentTab.rasterFormatsSelectElement).hide();
                        // Init document format options dialog
                        this._documentFormatOptionsDlg = new Converter.Dialogs.DocumentFormatOptionsDlg();
                        this._documentFormatOptionsDlg.documentFormat = Converter.Formats.documentFormats[0];
                        $(this.dialogUI.documentTab.mainConverterFormatsSelectElement).bind("change", $.proxy(this.mainConverterFormatsSelectElement_SelectedIndexChanged, this));
                        $(this.dialogUI.documentTab.documentFormatsSelectElement).bind("change", $.proxy(this.documentFormatsSelectElement_SelectedIndexChanged, this));
                        $(this.dialogUI.documentTab.documentFormatOptionsBtn).bind("click", $.proxy(this.documentFormatOptionsBtn_Click, this));
                        $(this.dialogUI.documentTab.multiplePagesOptions.firstPageCheckbox).bind("change", $.proxy(this.firstPageCheckbox_CheckedChanged, this));
                        $(this.dialogUI.documentTab.multiplePagesOptions.startPageTextInput).bind("change", $.proxy(this.startPageTextInput_Changed, this));
                        $(this.dialogUI.documentTab.multiplePagesOptions.lastPageCheckbox).bind("change", $.proxy(this.lastPageCheckbox_CheckedChanged, this));
                        $(this.dialogUI.documentTab.multiplePagesOptions.endPageTextInput).bind("change", $.proxy(this.endPageTextInput_Changed, this));
                        $(this.dialogUI.optionsTab.defaultsBtn).bind("click", $.proxy(this.defaultsBtn_Click, this));
                        $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
                    };
                    DocumentConverterDlg.prototype.createDocumentFormatsOptions = function () {
                        var formats = DocumentViewerDemo.Converter.Formats.documentFormats;
                        var options = "";
                        for (var i = 0; i < formats.length; i++) {
                            // Add the option , set the value to the index
                            options += "<option value=" + i + ">" + formats[i].friendlyName + " (" + formats[i].extension.toUpperCase() + ")</option>";
                        }
                        $(this.dialogUI.documentTab.documentFormatsSelectElement).html(options);
                    };
                    DocumentConverterDlg.prototype.createRasterFormatsOptions = function () {
                        var formats = Converter.Formats.rasterFormats;
                        var options = "";
                        for (var i = 0; i < formats.length; i++) {
                            // Add the option , set the value to the index
                            options += "<option value=" + i + ">" + formats[i].friendlyName + " (" + formats[i].extension.toUpperCase() + ")</option>";
                        }
                        $(this.dialogUI.documentTab.rasterFormatsSelectElement).html(options);
                    };
                    DocumentConverterDlg.prototype.show = function () {
                        $(this.dialogUI.documentTab.multiplePagesOptions.startPageTextInput).val("1");
                        // set firstPageCheckbox as checked
                        if (!$(this.dialogUI.documentTab.multiplePagesOptions.firstPageCheckbox).is(':checked')) {
                            $(this.dialogUI.documentTab.multiplePagesOptions.firstPageCheckbox).click();
                        }
                        $(this.dialogUI.documentTab.multiplePagesOptions.endPageTextInput).val(this._totalPages.toString());
                        // set lastPageCheckbox as checked 
                        if (!$(this.dialogUI.documentTab.multiplePagesOptions.lastPageCheckbox).is(':checked')) {
                            $(this.dialogUI.documentTab.multiplePagesOptions.lastPageCheckbox).click();
                        }
                        this.initOptionsTabInputsValues();
                        $(this.dialogUI.dialog).modal();
                    };
                    DocumentConverterDlg.prototype.initOptionsTabInputsValues = function () {
                        $(this.dialogUI.optionsTab.enableSvgConversionCheckbox).prop('checked', this._convertJobData.enableSvgConversion);
                        $(this.dialogUI.optionsTab.svgImagesRecognitionModeSelectElement).prop("selectedIndex", this._convertJobData.svgImagesRecognitionMode);
                        $(this.dialogUI.optionsTab.emptyPageModeSelectElement).prop("selectedIndex", this._convertJobData.emptyPageMode);
                        $(this.dialogUI.optionsTab.jobErrorModeCheckbox).prop('checked', (this._convertJobData.jobErrorMode == lt.Documents.DocumentConverterJobErrorMode.resume));
                        $(this.dialogUI.optionsTab.pageNumberingTemplateTextInput).val(this._convertJobData.pageNumberingTemplate);
                        $(this.dialogUI.optionsTab.jobNameTextInput).val(this._convertJobData.jobName);
                        $(this.dialogUI.optionsTab.preprocessorDeskewCheckbox).prop('checked', this._convertJobData.preprocessorDeskew);
                        $(this.dialogUI.optionsTab.preprocessorInvertCheckbox).prop('checked', this._convertJobData.preprocessorInvert);
                        $(this.dialogUI.optionsTab.preprocessorOrientCheckbox).prop('checked', this._convertJobData.preprocessorOrient);
                    };
                    DocumentConverterDlg.prototype.mainConverterFormatsSelectElement_SelectedIndexChanged = function (e) {
                        var selectedOptionValue = $(e.currentTarget).val();
                        if (selectedOptionValue == "document") {
                            $(this.dialogUI.documentTab.documentFormatsControlsDiv).show();
                            $(this.dialogUI.documentTab.rasterFormatsSelectElement).hide();
                        }
                        else if (selectedOptionValue == "raster") {
                            $(this.dialogUI.documentTab.documentFormatsControlsDiv).hide();
                            $(this.dialogUI.documentTab.rasterFormatsSelectElement).show();
                        }
                    };
                    DocumentConverterDlg.prototype.documentFormatsSelectElement_SelectedIndexChanged = function (e) {
                        this._documentFormatOptionsDlg.documentFormat = Converter.Formats.documentFormats[$(e.currentTarget).val()];
                        ;
                    };
                    DocumentConverterDlg.prototype.documentFormatOptionsBtn_Click = function (e) {
                        this._documentFormatOptionsDlg.totalPages = this._totalPages;
                        this._documentFormatOptionsDlg.show();
                    };
                    DocumentConverterDlg.prototype.firstPageCheckbox_CheckedChanged = function (e) {
                        $(this.dialogUI.documentTab.multiplePagesOptions.startPageTextInput).prop("disabled", $(e.currentTarget).is(':checked'));
                        $(this.dialogUI.documentTab.multiplePagesOptions.startPageTextInput).val("1");
                    };
                    DocumentConverterDlg.prototype.startPageTextInput_Changed = function (e) {
                        var startPage = parseInt($(e.currentTarget).val());
                        var endPage = parseInt($(this.dialogUI.documentTab.multiplePagesOptions.endPageTextInput).val());
                        if (startPage && startPage >= 1 && startPage <= this._totalPages) {
                            if (startPage > endPage) {
                                $(this.dialogUI.documentTab.multiplePagesOptions.endPageTextInput).val(startPage.toString());
                            }
                        }
                        else {
                            $(e.currentTarget).val("1");
                        }
                    };
                    DocumentConverterDlg.prototype.lastPageCheckbox_CheckedChanged = function (e) {
                        $(this.dialogUI.documentTab.multiplePagesOptions.endPageTextInput).prop("disabled", $(e.currentTarget).is(':checked'));
                        $(this.dialogUI.documentTab.multiplePagesOptions.endPageTextInput).val(this._totalPages.toString());
                    };
                    DocumentConverterDlg.prototype.endPageTextInput_Changed = function (e) {
                        var startPage = parseInt($(this.dialogUI.documentTab.multiplePagesOptions.startPageTextInput).val());
                        var endPage = parseInt($(e.currentTarget).val());
                        if (endPage && endPage >= 1 && endPage <= this._totalPages) {
                            if (startPage > endPage) {
                                $(this.dialogUI.documentTab.multiplePagesOptions.startPageTextInput).val(endPage.toString());
                            }
                        }
                        else {
                            $(e.currentTarget).val(this._totalPages.toString());
                        }
                    };
                    DocumentConverterDlg.prototype.defaultsBtn_Click = function (e) {
                        // Create ConvertCommand object , to set default values
                        var jobData = new lt.Documents.DocumentConverterJobData();
                        $(this.dialogUI.optionsTab.enableSvgConversionCheckbox).prop('checked', jobData.enableSvgConversion);
                        $(this.dialogUI.optionsTab.svgImagesRecognitionModeSelectElement).prop("selectedIndex", jobData.svgImagesRecognitionMode);
                        $(this.dialogUI.optionsTab.emptyPageModeSelectElement).prop("selectedIndex", jobData.emptyPageMode);
                        $(this.dialogUI.optionsTab.jobErrorModeCheckbox).prop('checked', (jobData.jobErrorMode == lt.Documents.DocumentConverterJobErrorMode.resume));
                        $(this.dialogUI.optionsTab.pageNumberingTemplateTextInput).val(jobData.pageNumberingTemplate);
                        $(this.dialogUI.optionsTab.preprocessorDeskewCheckbox).prop('checked', jobData.preprocessorDeskew);
                        $(this.dialogUI.optionsTab.preprocessorInvertCheckbox).prop('checked', jobData.preprocessorInvert);
                        $(this.dialogUI.optionsTab.preprocessorOrientCheckbox).prop('checked', jobData.preprocessorOrient);
                    };
                    DocumentConverterDlg.prototype.OkBtn_Click = function (e) {
                        var jobData = new lt.Documents.DocumentConverterJobData();
                        $(this.dialogUI.dialog).modal("hide");
                        // Set the start page
                        jobData.inputDocumentFirstPageNumber = parseInt($(this.dialogUI.documentTab.multiplePagesOptions.startPageTextInput).val());
                        // Set the end page
                        jobData.inputDocumentLastPageNumber = parseInt($(this.dialogUI.documentTab.multiplePagesOptions.endPageTextInput).val());
                        // Set the selected output format
                        var mainSelectedFormat = $(this.dialogUI.documentTab.mainConverterFormatsSelectElement).val();
                        if (mainSelectedFormat == "document") {
                            jobData.documentFormat = Converter.Formats.documentFormats[$(this.dialogUI.documentTab.documentFormatsSelectElement).val()].format;
                            jobData.documentOptions = Converter.Formats.documentFormats[$(this.dialogUI.documentTab.documentFormatsSelectElement).val()].options;
                            jobData.rasterImageFormat = lt.Documents.RasterImageFormat.unknown;
                        }
                        else if (mainSelectedFormat == "raster") {
                            jobData.rasterImageFormat = Converter.Formats.rasterFormats[$(this.dialogUI.documentTab.rasterFormatsSelectElement).val()].format;
                            jobData.rasterImageBitsPerPixel = Converter.Formats.rasterFormats[$(this.dialogUI.documentTab.rasterFormatsSelectElement).val()].bitsPerPixel;
                            jobData.documentFormat = lt.Documents.Writers.DocumentFormat.user;
                        }
                        // Set the selected annotations mode
                        jobData.annotationsMode = parseInt($(this.dialogUI.documentTab.annotationsModeSelectElement).val());
                        jobData.enableSvgConversion = $(this.dialogUI.optionsTab.enableSvgConversionCheckbox).is(':checked');
                        jobData.svgImagesRecognitionMode = parseInt($(this.dialogUI.optionsTab.svgImagesRecognitionModeSelectElement).val());
                        jobData.emptyPageMode = parseInt($(this.dialogUI.optionsTab.emptyPageModeSelectElement).val());
                        jobData.jobErrorMode = $(this.dialogUI.optionsTab.jobErrorModeCheckbox).is(':checked') ? lt.Documents.DocumentConverterJobErrorMode.resume : lt.Documents.DocumentConverterJobErrorMode.abort;
                        jobData.jobName = $(this.dialogUI.optionsTab.jobNameTextInput).val();
                        jobData.pageNumberingTemplate = $(this.dialogUI.optionsTab.pageNumberingTemplateTextInput).val();
                        jobData.preprocessorDeskew = $(this.dialogUI.optionsTab.preprocessorDeskewCheckbox).is(':checked');
                        jobData.preprocessorInvert = $(this.dialogUI.optionsTab.preprocessorInvertCheckbox).is(':checked');
                        jobData.preprocessorOrient = $(this.dialogUI.optionsTab.preprocessorOrientCheckbox).is(':checked');
                        // Set the dialog convert command, to initialize the dialog input when the dialog opens again 
                        this._convertJobData = jobData;
                        if (this._OkClick != null)
                            // fire the OkClick event, pass the selected main format
                            this._OkClick(jobData);
                    };
                    return DocumentConverterDlg;
                }());
                Dialogs.DocumentConverterDlg = DocumentConverterDlg;
            })(Dialogs = Converter.Dialogs || (Converter.Dialogs = {}));
        })(Converter = DocumentViewerDemo.Converter || (DocumentViewerDemo.Converter = {}));
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
})(HTML5Demos || (HTML5Demos = {}));
