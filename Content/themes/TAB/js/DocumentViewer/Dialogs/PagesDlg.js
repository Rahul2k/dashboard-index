var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var PagesDlg = (function () {
            function PagesDlg() {
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#pagesDialog",
                    operationNameLabel: "#operationName",
                    operationInfoParagraph: "#operationInfo",
                    pageCountParagraph: "#pagesDlg_pageCount",
                    allPagesCheckbox: "#allPages",
                    pageNumberTextInput: "#pagesDlg_PageNumber",
                    currentPageNumberParagraph: "#currentPageNumber",
                    OkBtn: "#pagesDlg_OK"
                };
                this.Init();
            }
            PagesDlg.prototype.Init = function () {
                $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
                $(this.dialogUI.allPagesCheckbox).bind("click", $.proxy(this.allPagesCheckbox_Click, this));
            };
            PagesDlg.prototype.show = function (operation, pageCount, currentPageNumber) {
                $(this.dialogUI.operationNameLabel).text(operation);
                $(this.dialogUI.operationInfoParagraph).text("Select the page number(s) for the " + operation + " operation");
                this._pageCount = pageCount;
                $(this.dialogUI.pageCountParagraph).text("Document contains " + this._pageCount + " pages");
                this._currentPageNumber = currentPageNumber;
                $(this.dialogUI.pageNumberTextInput).val(this._currentPageNumber.toString());
                $(this.dialogUI.currentPageNumberParagraph).text("Current page number is " + this._currentPageNumber);
                $(this.dialogUI.allPagesCheckbox).prop('checked', false);
                $(this.dialogUI.pageNumberTextInput).prop('disabled', false);
                $(this.dialogUI.dialog).modal();
            };
            Object.defineProperty(PagesDlg.prototype, "OkClick", {
                // Events mutators
                set: function (value) {
                    this._OkClick = value;
                },
                enumerable: true,
                configurable: true
            });
            PagesDlg.prototype.allPagesCheckbox_Click = function (e) {
                $(this.dialogUI.pageNumberTextInput).prop("disabled", $(this.dialogUI.allPagesCheckbox).is(":checked"));
            };
            PagesDlg.prototype.OkBtn_Click = function (e) {
                var forAllPages = $(this.dialogUI.allPagesCheckbox).is(":checked");
                if (forAllPages) {
                    this.pageNumber = 0;
                }
                else {
                    var pageNumber = parseInt($(this.dialogUI.pageNumberTextInput).val());
                    // Do we have valid page number
                    if (pageNumber && pageNumber >= 1 && pageNumber <= this._pageCount) {
                        this.pageNumber = pageNumber;
                    }
                    else {
                        window.alert("Please enter a valid page number between 1 and " + this._pageCount);
                        $(this.dialogUI.pageNumberTextInput).val(this._currentPageNumber.toString());
                        return;
                    }
                }
                $(this.dialogUI.dialog).modal("hide");
                if (this._OkClick != null)
                    // fire the OkClick event
                    this._OkClick();
            };
            return PagesDlg;
        }());
        Dialogs.PagesDlg = PagesDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
