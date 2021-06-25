var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var LinkValueDlg = (function () {
            function LinkValueDlg() {
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#linkValueDialog",
                    linkValueElement: "#linkValue",
                    preventLinkValueQuestionCheckbox: "#preventLinkValueQuestion",
                };
                this._confirm = false;
                this.Init();
            }
            LinkValueDlg.prototype.Init = function () {
                $(this.dialogUI.dialog).bind("hide.bs.modal", $.proxy(this.dialog_Closed, this));
            };
            LinkValueDlg.prototype.show = function (linkValue) {
                $(this.dialogUI.linkValueElement).text(linkValue);
                if ((linkValue.toLowerCase().slice(0, "http:".length) != "http:") && (linkValue.toLowerCase().slice(0, "https:".length) != "https:")) {
                    $(this.dialogUI.linkValueElement).prop("href", "http://" + linkValue);
                }
                else {
                    $(this.dialogUI.linkValueElement).prop("href", linkValue);
                }
                $(this.dialogUI.linkValueElement).prop("target", "_blank");
                $(this.dialogUI.dialog).modal();
            };
            Object.defineProperty(LinkValueDlg.prototype, "doNotShowAgain", {
                get: function () {
                    return $(this.dialogUI.preventLinkValueQuestionCheckbox).is(':checked');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinkValueDlg.prototype, "confirm", {
                get: function () {
                    return this._confirm;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinkValueDlg.prototype, "closed", {
                // Events mutators
                set: function (value) {
                    this._closed = value;
                },
                enumerable: true,
                configurable: true
            });
            LinkValueDlg.prototype.dialog_Closed = function (e) {
                if (this._closed != null)
                    // fire close event
                    this._closed();
            };
            return LinkValueDlg;
        }());
        Dialogs.LinkValueDlg = LinkValueDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
