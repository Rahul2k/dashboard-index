var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var InputDlg = (function () {
            function InputDlg() {
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#inputDialog",
                    title: "#dialogTitle",
                    description: "#dialogDescription",
                    input: "#dialogInput",
                    OkBtn: "#inputDialog_OK",
                    closeCancelBtn: "#inputDialog_CloseCancel",
                };
                this.Init();
            }
            Object.defineProperty(InputDlg.prototype, "title", {
                set: function (value) {
                    $(this.dialogUI.title).text(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputDlg.prototype, "description", {
                set: function (value) {
                    $(this.dialogUI.description).text(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputDlg.prototype, "inputInitialValue", {
                set: function (value) {
                    $(this.dialogUI.input).val(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputDlg.prototype, "isPassword", {
                set: function (value) {
                    if (value) {
                        $(this.dialogUI.input).attr("type", "password");
                        $(this.dialogUI.input).val("");
                    }
                    else {
                        $(this.dialogUI.input).attr("type", "text");
                    }
                },
                enumerable: true,
                configurable: true
            });
            InputDlg.prototype.Init = function () {
                $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
            };
            InputDlg.prototype.show = function () {
                $(this.dialogUI.dialog).modal();
            };
            Object.defineProperty(InputDlg.prototype, "OkClick", {
                // Events mutators
                set: function (value) {
                    // Hide the okClick if a falsy value is passed
                    if (!!value) {
                        $(this.dialogUI.OkBtn).show();
                        $(this.dialogUI.closeCancelBtn).text("Cancel");
                    }
                    else {
                        $(this.dialogUI.OkBtn).hide();
                        $(this.dialogUI.closeCancelBtn).text("Close");
                    }
                    this._OkClick = value;
                },
                enumerable: true,
                configurable: true
            });
            InputDlg.prototype.OkBtn_Click = function (e) {
                $(this.dialogUI.dialog).modal("hide");
                if (this._OkClick != null)
                    // fire the OkClick event
                    this._OkClick($(this.dialogUI.input).val());
            };
            return InputDlg;
        }());
        Dialogs.InputDlg = InputDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
