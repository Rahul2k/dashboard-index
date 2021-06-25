var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var DocumentViewerDemoLoadingDlg = (function () {
            function DocumentViewerDemoLoadingDlg() {
                // Create shortcuts for the dialog UI elements
                this.dialogUI = {
                    dialog: "#documentViewerDemoLoadingDlg",
                    processTextLabel: "#processText",
                    progress: {
                        bar: "#progressbar",
                        percentage: "#progressPercentage"
                    },
                    cancelDiv: "#cancelDiv",
                    cancelBtn: "#cancel"
                };
                this.cancelClick = null;
                $(this.dialogUI.cancelBtn).bind("click", $.proxy(this.cancelBtn_Click, this));
            }
            DocumentViewerDemoLoadingDlg.prototype.show = function (enableCancellation, enableProgress, processText) {
                this.isCancelled = false;
                $(this.dialogUI.cancelBtn).prop("disabled", false);
                if (enableProgress) {
                    $(this.dialogUI.progress.bar).width("0%");
                    $(this.dialogUI.progress.bar).attr("aria-valuenow", 0);
                }
                else {
                    $(this.dialogUI.progress.bar).width("100%");
                    $(this.dialogUI.progress.bar).attr("aria-valuenow", 100);
                }
                $(this.dialogUI.progress.percentage).text("");
                enableCancellation ? $(this.dialogUI.cancelDiv).css("display", "block") : $(this.dialogUI.cancelDiv).css("display", "none");
                $(this.dialogUI.processTextLabel).text(processText);
                $(this.dialogUI.dialog).modal();
            };
            DocumentViewerDemoLoadingDlg.prototype.processing = function (processText) {
                // To change process text , while the dialog is already shown
                $(this.dialogUI.processTextLabel).text(processText);
            };
            DocumentViewerDemoLoadingDlg.prototype.progress = function (percentage) {
                $(this.dialogUI.progress.bar).width(percentage + "%");
                $(this.dialogUI.progress.bar).attr("aria-valuenow", percentage);
                $(this.dialogUI.progress.percentage).text(percentage + "%");
            };
            DocumentViewerDemoLoadingDlg.prototype.hide = function () {
                $(this.dialogUI.dialog).modal("hide");
            };
            DocumentViewerDemoLoadingDlg.prototype.cancelBtn_Click = function (e) {
                this.isCancelled = true;
                this.processing("Canceling Operation...");
                $(this.dialogUI.cancelBtn).prop("disabled", true);
                if (this.cancelClick)
                    this.cancelClick();
            };
            return DocumentViewerDemoLoadingDlg;
        }());
        Dialogs.DocumentViewerDemoLoadingDlg = DocumentViewerDemoLoadingDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
