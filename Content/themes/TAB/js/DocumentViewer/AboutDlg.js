var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var AboutDlg = (function () {
            function AboutDlg(demoName) {
                // Create shortcuts for the dialog UI elements
                this.dialogUI = {
                    dialog: "#aboutDialog",
                    demoNameLable: "#demoName"
                };
                $(this.dialogUI.demoNameLable).text(demoName);
            }
            AboutDlg.prototype.show = function () {
                $(this.dialogUI.dialog).modal();
            };
            return AboutDlg;
        }());
        Dialogs.AboutDlg = AboutDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
//# sourceMappingURL=AboutDlg.js.map