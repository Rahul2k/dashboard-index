var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var ParsePageLinksDlg = (function () {
            function ParsePageLinksDlg() {
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#parsePageLinksDialog",
                    yesBtn: "#parsePageLinksDlg_Yes",
                    noBtn: "#parsePageLinksDlg_No",
                    rememberMyDecisionCheckbox: "#rememberMyDecision",
                    messageParagraph: "#parsePageLinksMsg"
                };
                this._confirm = false;
                this.Init();
            }
            ParsePageLinksDlg.prototype.Init = function () {
                $(this.dialogUI.dialog).bind("hide.bs.modal", $.proxy(this.dialog_Close, this));
                $(this.dialogUI.yesBtn).bind("click", $.proxy(this.yesBtn_Click, this));
                $(this.dialogUI.noBtn).bind("click", $.proxy(this.noBtn_Click, this));
            };
            ParsePageLinksDlg.prototype.show = function (maxPageCount) {
                $(this.dialogUI.messageParagraph).text("This document has more than " + maxPageCount + " pages and may contain internal links between the pages. Parsing these links could be a time consuming operation. Do you want to automatically parse these links from these types of documents?");
                $(this.dialogUI.dialog).modal();
            };
            Object.defineProperty(ParsePageLinksDlg.prototype, "rememberMyDecision", {
                get: function () {
                    return $(this.dialogUI.rememberMyDecisionCheckbox).is(':checked');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ParsePageLinksDlg.prototype, "confirm", {
                get: function () {
                    return this._confirm;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ParsePageLinksDlg.prototype, "closed", {
                // Events mutators
                set: function (value) {
                    this._closed = value;
                },
                enumerable: true,
                configurable: true
            });
            ParsePageLinksDlg.prototype.yesBtn_Click = function (e) {
                this._confirm = true;
            };
            ParsePageLinksDlg.prototype.noBtn_Click = function (e) {
                this._confirm = false;
            };
            ParsePageLinksDlg.prototype.dialog_Close = function (e) {
                if (this._closed != null)
                    // fire the OkClick event
                    this._closed();
            };
            return ParsePageLinksDlg;
        }());
        Dialogs.ParsePageLinksDlg = ParsePageLinksDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
