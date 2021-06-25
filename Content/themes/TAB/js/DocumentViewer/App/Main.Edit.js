var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        // Contains the edit part
        var EditPart = (function () {
            function EditPart(main) {
                // Reference to the DocumentViewerDemoApp
                this._mainApp = null;
                this._isFindText = false;
                this._findNext = false;
                this._currentPage = 1;
                this._gotoNextPage = true;
                // Edit menu items
                this.headerToolbar_EditMenu = {
                    editMenuItem: "#editMenuItem",
                    undoMenuItem: "#undo",
                    redoMenuItem: "#redo",
                    deleteAnnotationMenuItem: "#deleteAnnotation",
                    selectAllTextMenuItem: "#selectAllText",
                    selectAllAnnotationsMenuItem: "#selectAllAnnotations",
                    clearSelectionMenuItem: "#clearSelection",
                    copyTextMenuItem: "#copyText",
                    findTextMenuItem: "#findText"
                };
                this.findTextPanel = {
                    panel: "#findTextPanel",
                    textToFindTextInput: "#textToFind",
                    findPreviousBtn: "#findPrevious",
                    findNextBtn: "#findNext",
                    closeBtn: "#closeFindPanel",
                    // Find options
                    matchCaseCheckbox: "#matchCase",
                    wholeWordsOnlyCheckbox: "#wholeWordsOnly",
                    findInCurrentPageOnlyCheckbox: "#findInCurrentPageOnly",
                };
                this._mainApp = main;
                this.initEditUI();
                this._currentPage = 1;
            }
            Object.defineProperty(EditPart.prototype, "isFindText", {
                get: function () {
                    return this._isFindText;
                },
                enumerable: true,
                configurable: true
            });
            EditPart.prototype.initEditUI = function () {
                var _this = this;
                // Edit menu
                $(this.headerToolbar_EditMenu.selectAllTextMenuItem).bind("click", $.proxy(this.selectAllTextMenuItem_Click, this));
                $(this.headerToolbar_EditMenu.copyTextMenuItem).bind("click", $.proxy(this.copyTextMenuItem_Click, this));
                $(this.headerToolbar_EditMenu.findTextMenuItem).bind("click", $.proxy(this.findTextMenuItem_Click, this));
                // Find panel
                $(this.findTextPanel.findPreviousBtn).bind("click", $.proxy(this.findPreviousBtn_Click, this));
                $(this.findTextPanel.findNextBtn).bind("click", $.proxy(this.findNextBtn_Click, this));
                $(this.findTextPanel.closeBtn).bind("click", $.proxy(function (e) { $(_this.findTextPanel.panel).removeClass('visiblePanel'); }, this));
                $(this.findTextPanel.matchCaseCheckbox).bind("click", $.proxy(function (e) { e.stopPropagation(); }, this));
                $(this.findTextPanel.wholeWordsOnlyCheckbox).bind("click", $.proxy(function (e) { e.stopPropagation(); }, this));
                $(this.findTextPanel.findInCurrentPageOnlyCheckbox).bind("click", $.proxy(function (e) { e.stopPropagation(); }, this));
            };
            EditPart.prototype.bindElements = function () {
                var elements = this._mainApp.commandsBinder.elements;
                var element;
                if (this._mainApp.demoMode != DocumentViewerDemo.DemoMode.Barcode) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.userInterfaceElement = $(this.headerToolbar_EditMenu.editMenuItem);
                    element.updateEnabled = false;
                    elements.push(element);
                }
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Default) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsUndo;
                    element.userInterfaceElement = $(this.headerToolbar_EditMenu.undoMenuItem);
                    elements.push(element);
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsRedo;
                    element.userInterfaceElement = $(this.headerToolbar_EditMenu.redoMenuItem);
                    elements.push(element);
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsDelete;
                    element.userInterfaceElement = $(this.headerToolbar_EditMenu.deleteAnnotationMenuItem);
                    elements.push(element);
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsSelectAll;
                    element.userInterfaceElement = $(this.headerToolbar_EditMenu.selectAllAnnotationsMenuItem);
                    elements.push(element);
                }
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.textSelectAll;
                element.userInterfaceElement = $(this.headerToolbar_EditMenu.selectAllTextMenuItem);
                element.autoRun = false;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandNames = new Array(lt.Documents.UI.DocumentViewerCommands.textClearSelection, lt.Documents.UI.DocumentViewerCommands.annotationsClearSelection);
                element.userInterfaceElement = $(this.headerToolbar_EditMenu.clearSelectionMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.textCopy;
                element.userInterfaceElement = $(this.headerToolbar_EditMenu.copyTextMenuItem);
                element.autoRun = false;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.headerToolbar_EditMenu.findTextMenuItem);
                element.hasDocumentEmptyEnabled = false;
                element.autoRun = false;
                elements.push(element);
            };
            EditPart.prototype.selectAllTextMenuItem_Click = function (e) {
                // Check if all document pages text is parsed 
                var hasText = this._mainApp.documentViewer.text.hasDocumentPageText(0);
                if (hasText) {
                    this._mainApp.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.textSelectAll, 0);
                }
                else {
                    // we need to get the text
                    var confirm = window.confirm("Not all pages have their text parsed.\nParse text for all pages ?");
                    if (confirm) {
                        // Inform what to do after getting text
                        this._mainApp.getTextOperation = lt.Documents.UI.DocumentViewerCommands.textSelectAll;
                        this._mainApp.getPagesText(0);
                    }
                }
            };
            EditPart.prototype.findTextMenuItem_Click = function (e) {
                // If mobile version, hide all controls containers
                if (DocumentViewerDemo.DocumentViewerDemoApp.isMobileVersion)
                    $(this._mainApp.mobileVersionControlsContainers).removeClass('visiblePanel');
                $(this.findTextPanel.panel).toggleClass('visiblePanel');
            };
            EditPart.prototype.copyTextMenuItem_Click = function (e) {
                var text = this._mainApp.documentViewer.text.getSelectedText(0);
                if (text != null)
                    this._mainApp.textResultDlg.show("Copy this text to the clipboard", text.trim());
            };
            EditPart.prototype.findText = function () {
                this._isFindText = false;
                if (!this._mainApp.documentViewer.text.hasDocumentPageText(this._currentPage)) {
                    this._isFindText = true;
                    this._mainApp.getTextOperation = this._findNext ? lt.Documents.UI.DocumentViewerCommands.textFindNext : lt.Documents.UI.DocumentViewerCommands.textFindPrevious;
                    this._mainApp.getPagesText(this._currentPage);
                }
                else {
                    var found = this.findNextPrevious(this._findNext);
                    if (!found) {
                        if (this._findNext)
                            this._currentPage++;
                        else
                            this._currentPage--;
                        if ((this._currentPage < 1 || this._currentPage > this._mainApp.documentViewer.pageCount) || !this._gotoNextPage) {
                            this._mainApp.endBusyOperation();
                            this._currentPage = 1;
                            window.alert("Finished searching - no more results have been found.");
                            return;
                        }
                        this.findText();
                    }
                    else {
                        this._mainApp.endBusyOperation();
                    }
                }
            };
            EditPart.prototype.findPreviousBtn_Click = function (e) {
                // Initialize
                var findInCurrentPage = $(this.findTextPanel.findInCurrentPageOnlyCheckbox).is(':checked');
                this._currentPage = DocumentViewerDemo.DocumentViewerDemoApp.isMobileVersion || findInCurrentPage ? this._mainApp.documentViewer.currentPageNumber : 1;
                this._findNext = false;
                this.findText();
            };
            EditPart.prototype.findNextBtn_Click = function (e) {
                // Initialize
                var findInCurrentPage = $(this.findTextPanel.findInCurrentPageOnlyCheckbox).is(':checked');
                this._currentPage = DocumentViewerDemo.DocumentViewerDemoApp.isMobileVersion || findInCurrentPage ? this._mainApp.documentViewer.currentPageNumber : 1;
                this._findNext = true;
                this.findText();
            };
            EditPart.prototype.findNextPrevious = function (findNext) {
                var text = $(this.findTextPanel.textToFindTextInput).val();
                if (text == null || text == "")
                    return false;
                // Check if have a previous find operation
                var findText = this._mainApp.documentViewer.text.lastFindText;
                var isFirst = false;
                if (findText == null) {
                    findText = new lt.Documents.UI.DocumentViewerFindText();
                    isFirst = true;
                }
                findText.text = text;
                findText.matchCase = $(this.findTextPanel.matchCaseCheckbox).is(':checked');
                findText.wholeWordsOnly = $(this.findTextPanel.wholeWordsOnlyCheckbox).is(':checked');
                findText.gotoNextPage = !$(this.findTextPanel.findInCurrentPageOnlyCheckbox).is(':checked');
                if (!findText.gotoNextPage)
                    findText.pageNumber = this._mainApp.documentViewer.currentPageNumber;
                this._gotoNextPage = findText.gotoNextPage;
                var found = this._mainApp.documentViewer.text.find(findText, isFirst, findNext) != null;
                return found;
            };
            return EditPart;
        }());
        DocumentViewerDemo.EditPart = EditPart;
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
})(HTML5Demos || (HTML5Demos = {}));
