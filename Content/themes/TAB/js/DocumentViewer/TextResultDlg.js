var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var TextResultDlg = (function () {
            function TextResultDlg() {
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#resultsDialog",
                    label: "#dialogLabel",
                    resultsTextArea: "#results"
                };
            }
            TextResultDlg.prototype.show = function (label, text) {
                // New line for IE versions
                if (lt.LTHelper.browser == lt.LTBrowser.internetExplorer && lt.LTDevice.desktop) {
                    if (lt.LTHelper.version == 9) {
                        text = text.replace(new RegExp('\r\n|\n', 'g'), '\n\r');
                    }
                    else if (lt.LTHelper.version > 9) {
                        text = text.replace(new RegExp('\r\n', 'g'), '\n');
                    }
                }
                $(this.dialogUI.label).text(label);
                $(this.dialogUI.resultsTextArea).text(text);
                $(this.dialogUI.dialog).modal();
            };
            return TextResultDlg;
        }());
        Dialogs.TextResultDlg = TextResultDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
//# sourceMappingURL=TextResultDlg.js.map