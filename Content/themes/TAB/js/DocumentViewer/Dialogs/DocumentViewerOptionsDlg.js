var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var DocumentViewerOptionsDlg = (function () {
            function DocumentViewerOptionsDlg() {
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#DocumentViewerOptionsDialog",
                    hookPrepareAjax: "#hookPrepareAjax",
                    useAjaxImageLoading: "#useAjaxImageLoading",
                    usePDFRenderingCheckbox: "#usePDFRendering",
                    viewOptions: {
                        numberOfWorkersTextInput: "#viewNumberOfWorkers",
                        lazyLoadCheckbox: "#viewLazyLoad",
                        useCSSTransitions: "#viewCSSTransitions"
                    },
                    thumbnailsOptions: {
                        numberOfWorkersTextInput: "#thumbnailsNumberOfWorkers",
                        lazyLoadCheckbox: "#thumbnailsLazyLoad",
                        useGridsCheckbox: "#useGrids",
                        pixelSizeTextInput: "#pixelSize",
                    },
                    OkBtn: "#DocumentViewerOptionsDlg_OK",
                };
                // Track whether we have logged to the console that PDF Rendering is unavailable.
                this._hasGivenPDFRenderingWarning = false;
                this.Init();
            }
            Object.defineProperty(DocumentViewerOptionsDlg.prototype, "documentViewer", {
                set: function (value) {
                    this._documentViewer = value;
                    if (!this._hasGivenPDFRenderingWarning && !lt.Documents.UI.DocumentViewer.isPDFRenderingSupported) {
                        this._hasGivenPDFRenderingWarning = true;
                        // PDF Rendering is only supported on certain browsers and devices, and "shouldUsePDFRendering" checks for the presence of the global PDF Rendering object and the browser.
                        lt.LTHelper.logWarning("PDF Rendering is unavailable, and thus not selectable.");
                        $(this.dialogUI.usePDFRenderingCheckbox).prop("disabled", true);
                    }
                    // Initialize the inputs values from the viewer
                    this.initInputsValues(false);
                },
                enumerable: true,
                configurable: true
            });
            DocumentViewerOptionsDlg.prototype.Init = function () {
                $(this.dialogUI.usePDFRenderingCheckbox).bind("change", $.proxy(this.usePDFRenderingCheckbox_Changed, this));
                $(this.dialogUI.viewOptions.numberOfWorkersTextInput).bind("change", $.proxy(this.viewNumberOfWorkersTextInput_Changed, this));
                $(this.dialogUI.thumbnailsOptions.numberOfWorkersTextInput).bind("change", $.proxy(this.thumbnailsNumberOfWorkersTextInput_Changed, this));
                $(this.dialogUI.thumbnailsOptions.pixelSizeTextInput).bind("change", $.proxy(this.pixelSizeTextInput_Changed, this));
                $(this.dialogUI.thumbnailsOptions.useGridsCheckbox).bind("change", $.proxy(this.useGridsCheckbox_CheckedChanged, this));
                $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
            };
            // Run each time the PDF Rendering checkbox is set
            DocumentViewerOptionsDlg.prototype.initInputsValues = function (afterPDFRenderingChange) {
                var usePDFRendering = this._documentViewer.usePDFRendering;
                $(this.dialogUI.usePDFRenderingCheckbox).prop("checked", usePDFRendering);
                // Document Viewer
                if (!afterPDFRenderingChange) {
                    // Hook Prepare Ajax
                    var $hookPrepareAjax = $(this.dialogUI.hookPrepareAjax);
                    $hookPrepareAjax.prop("checked", this.hookPrepareAjax);
                }
                // Use Ajax Image Loading (off for pages when using PDF Rendering)
                var $useAjaxImageLoading = $(this.dialogUI.useAjaxImageLoading);
                $useAjaxImageLoading.prop("checked", this._documentViewer.useAjaxImageLoading);
                // View
                // Number of Workers - (not used with PDF Rendering)
                var $viewNumberOfWorkersTextInput = $(this.dialogUI.viewOptions.numberOfWorkersTextInput);
                $viewNumberOfWorkersTextInput.val(this._documentViewer.view.workerCount.toString());
                // Lazy Load - (not used with PDF Rendering)
                var $viewLazyLoadCheckbox = $(this.dialogUI.viewOptions.lazyLoadCheckbox);
                $viewLazyLoadCheckbox.prop("checked", this._documentViewer.view.lazyLoad);
                // CSS Transitions
                if (!afterPDFRenderingChange) {
                    var $viewUseCSSTransitions = $(this.dialogUI.viewOptions.useCSSTransitions);
                    $viewUseCSSTransitions.prop("checked", this.useCSSTransitions);
                }
                // Thumbnails
                var $thumbNumberOfWorkersTextInput = $(this.dialogUI.thumbnailsOptions.numberOfWorkersTextInput);
                var $thumbLazyLoadCheckbox = $(this.dialogUI.thumbnailsOptions.lazyLoadCheckbox);
                var $thumbUseGridsCheckbox = $(this.dialogUI.thumbnailsOptions.useGridsCheckbox);
                var $thumbPixelSizeTextInput = $(this.dialogUI.thumbnailsOptions.pixelSizeTextInput);
                if (this._documentViewer.thumbnails == null) {
                    // Disable and clear all thumbnails options
                    $thumbNumberOfWorkersTextInput.prop("disabled", true);
                    $thumbNumberOfWorkersTextInput.val("");
                    $thumbLazyLoadCheckbox.prop("disabled", true);
                    $thumbLazyLoadCheckbox.prop("checked", false);
                    $thumbUseGridsCheckbox.prop("disabled", true);
                    $thumbUseGridsCheckbox.prop("checked", false);
                    $thumbPixelSizeTextInput.prop("disabled", true);
                    $thumbPixelSizeTextInput.val("");
                }
                else {
                    // Enable all thumbnails options, and set the values from the viewer
                    // Number of Workers - (not used with PDF Rendering)
                    $thumbNumberOfWorkersTextInput.val(this._documentViewer.thumbnails.workerCount.toString());
                    // Lazy Load - (not used with PDF Rendering)
                    $thumbLazyLoadCheckbox.prop("checked", this._documentViewer.thumbnails.lazyLoad);
                    // Use Grids - (not used with PDF Rendering)
                    $thumbUseGridsCheckbox.prop("checked", this._documentViewer.thumbnails.useGrids);
                    // Pixel Size - (not used with PDF Rendering)
                    $thumbPixelSizeTextInput.prop("disabled", !this._documentViewer.thumbnails.useGrids);
                    $thumbPixelSizeTextInput.val(this._documentViewer.thumbnails.gridPixelSize.toString());
                }
            };
            DocumentViewerOptionsDlg.prototype.show = function () {
                $(this.dialogUI.dialog).modal();
            };
            DocumentViewerOptionsDlg.prototype.usePDFRenderingCheckbox_Changed = function (e) {
                // It must not be disabled at this point
                // We update this ourselves now, so we don't need to when the OK button is clicked
                this._documentViewer.usePDFRendering = $(e.currentTarget).is(':checked') && lt.Documents.UI.DocumentViewer.isPDFRenderingSupported;
                this.initInputsValues(true);
            };
            DocumentViewerOptionsDlg.prototype.viewNumberOfWorkersTextInput_Changed = function (e) {
                // Check for valid inputs from the user(integer number : must be 1 and up)
                var value = parseInt($(e.currentTarget).val());
                if (!(value && value >= 1)) {
                    $(e.currentTarget).val(this._documentViewer.view.workerCount.toString());
                }
            };
            DocumentViewerOptionsDlg.prototype.thumbnailsNumberOfWorkersTextInput_Changed = function (e) {
                // Check for valid inputs from the user(integer number : must be 1 and up)
                var value = parseInt($(e.currentTarget).val());
                if (!(value && value >= 1)) {
                    $(e.currentTarget).val(this._documentViewer.thumbnails.workerCount.toString());
                }
            };
            DocumentViewerOptionsDlg.prototype.pixelSizeTextInput_Changed = function (e) {
                // Check for valid inputs from the user(integer number : must be 1 and up)
                var value = parseInt($(e.currentTarget).val());
                if (!(value && value >= 1 && value <= 4000)) {
                    $(e.currentTarget).val(this._documentViewer.thumbnails.gridPixelSize.toString());
                }
            };
            DocumentViewerOptionsDlg.prototype.useGridsCheckbox_CheckedChanged = function (e) {
                $(this.dialogUI.thumbnailsOptions.pixelSizeTextInput).prop("disabled", !($(e.currentTarget).is(':checked')));
            };
            DocumentViewerOptionsDlg.prototype.OkBtn_Click = function (e) {
                $(this.dialogUI.dialog).modal("hide");
                this.hookPrepareAjax = $(this.dialogUI.hookPrepareAjax).is(':checked');
                this.useCSSTransitions = $(this.dialogUI.viewOptions.useCSSTransitions).is(':checked');
                this._documentViewer.useAjaxImageLoading = $(this.dialogUI.useAjaxImageLoading).is(':checked');
                this._documentViewer.view.workerCount = parseInt($(this.dialogUI.viewOptions.numberOfWorkersTextInput).val());
                this._documentViewer.view.lazyLoad = $(this.dialogUI.viewOptions.lazyLoadCheckbox).is(':checked');
                if (this._documentViewer.thumbnails != null) {
                    this._documentViewer.thumbnails.workerCount = parseInt($(this.dialogUI.thumbnailsOptions.numberOfWorkersTextInput).val());
                    this._documentViewer.thumbnails.lazyLoad = $(this.dialogUI.thumbnailsOptions.lazyLoadCheckbox).is(':checked');
                    this._documentViewer.thumbnails.useGrids = $(this.dialogUI.thumbnailsOptions.useGridsCheckbox).is(':checked');
                    this._documentViewer.thumbnails.gridPixelSize = parseInt($(this.dialogUI.thumbnailsOptions.pixelSizeTextInput).val());
                }
                if (this.ok != null) {
                    this.ok();
                }
            };
            return DocumentViewerOptionsDlg;
        }());
        Dialogs.DocumentViewerOptionsDlg = DocumentViewerOptionsDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
