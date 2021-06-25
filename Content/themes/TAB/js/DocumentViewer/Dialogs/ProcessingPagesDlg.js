var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var ProcessingPagesDlg = (function () {
            function ProcessingPagesDlg() {
                // Create shortcuts for the dialog UI elements
                this.dialogUI = {
                    dialog: "#processingPagesDialog",
                    nameElements: "#processingPagesDialog .process-name",
                    pagesElements: "#processingPagesDialog .process-pages",
                    cancelElement: "#processingPagesDialog .process-cancel",
                    resultsElement: "#processingPagesDialog .process-content",
                    statusElement: "#processingPagesDialog .process-status",
                    summaryElement: "#processingPagesDialog .process-summary",
                    closeElement: "#processingPagesDialog .process-close",
                    loadingElement: "#processingPagesDialog .process-loading"
                };
                this.tableSchema = null;
                this.tableBody = null;
                this.dataPerPage = null;
                this._isCanceled = false;
            }
            ProcessingPagesDlg.prototype.show = function (process, pages, headings) {
                var _this = this;
                this._isCanceled = false;
                this.dataPerPage = [];
                $(this.dialogUI.summaryElement).empty();
                $(this.dialogUI.loadingElement).show();
                $(this.dialogUI.nameElements).text(process);
                $(this.dialogUI.pagesElements).text(pages);
                $(this.dialogUI.cancelElement).prop("disabled", false);
                $(this.dialogUI.cancelElement).click(function () {
                    _this._isCanceled = true;
                    _this.updateStatus(process + " canceled.");
                    _this.finishProcessing();
                });
                $(this.dialogUI.closeElement).click(function () {
                    // Add an additional click handler to stop our loop on close
                    _this._isCanceled = true;
                });
                $(this.dialogUI.resultsElement).empty();
                this.buildTable(headings);
                $(this.dialogUI.dialog).modal();
            };
            ProcessingPagesDlg.prototype.finishProcessing = function () {
                $(this.dialogUI.cancelElement).prop("disabled", true);
                $(this.dialogUI.loadingElement).hide();
            };
            ProcessingPagesDlg.prototype.updateStatus = function (statusMessage) {
                $(this.dialogUI.statusElement).text(statusMessage);
            };
            ProcessingPagesDlg.prototype.buildTable = function (headings) {
                // Create table and headings
                var table = document.createElement("table");
                lt.LTHelper.addClass(table, "table");
                var tableHead = document.createElement("thead");
                var tableHeadRow = document.createElement("tr");
                headings.forEach(function (heading) {
                    var tableHeading = document.createElement("th");
                    tableHeading.innerHTML = heading;
                    tableHeadRow.appendChild(tableHeading);
                });
                tableHead.appendChild(tableHeadRow);
                table.appendChild(tableHead);
                // create body
                this.tableBody = document.createElement("tbody");
                table.appendChild(this.tableBody);
                $(this.dialogUI.resultsElement).append(table);
            };
            // sent as an array because object properties are iterated in arbitrary order.
            ProcessingPagesDlg.prototype.addData = function (pageNumber, data) {
                var tableRow = document.createElement("tr");
                data = [pageNumber.toString()].concat(data);
                data.forEach(function (value, index) {
                    var tableDefinition = document.createElement("td");
                    if (index == 0) {
                        tableDefinition.id = "firstOfPage" + pageNumber;
                    }
                    tableDefinition.innerHTML = value;
                    tableRow.appendChild(tableDefinition);
                });
                this.tableBody.appendChild(tableRow);
                if (!this.dataPerPage[pageNumber])
                    this.dataPerPage[pageNumber] = 1;
                else
                    this.dataPerPage[pageNumber]++;
                this.updateSummary();
            };
            ProcessingPagesDlg.prototype.updateSummary = function () {
                var totals = [];
                this.dataPerPage.forEach(function (count, pageNumber) {
                    totals.push("page " + pageNumber + (count > 1 ? " (" + count + ")" : ""));
                });
                $(this.dialogUI.summaryElement).empty().text("Entries: " + totals.join(", "));
            };
            Object.defineProperty(ProcessingPagesDlg.prototype, "isCanceled", {
                get: function () {
                    return this._isCanceled;
                },
                enumerable: true,
                configurable: true
            });
            return ProcessingPagesDlg;
        }());
        Dialogs.ProcessingPagesDlg = ProcessingPagesDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
