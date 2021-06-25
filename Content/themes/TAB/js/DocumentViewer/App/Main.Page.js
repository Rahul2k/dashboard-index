var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        // Contains the page options part  
        var PagePart = (function () {
            function PagePart(main) {
                // Reference to the DocumentViewerDemoApp
                this._mainApp = null;
                // Page menu items
                this.headerToolbar_PageMenu = {
                    pageMenuItem: "#pageMenuItem",
                    firstPageMenuItem: "#firstPage",
                    previousPageMenuItem: "#previousPage",
                    nextPageMenuItem: "#nextPage",
                    lastPageMenuItem: "#lastPage",
                    currentPageGetTextMenuItem: "#currentPageGetText",
                    allPagesGetTextMenuItem: "#allPagesGetText",
                    readPageBarcodesMenuItem: "#readPageBarcodes",
                    readAllBarcodesMenuItem: "#readAllBarcodes",
                    singlePageDisplayMenuItem: "#singlePageDisplay",
                    doublePagesDisplayMenuItem: "#doublePagesDisplay",
                    verticalPagesDisplayMenuItem: "#verticalPagesDisplay",
                    horizontalPagesDisplayMenuItem: "#horizontalPagesDisplay"
                };
                // Shortcuts
                this.shortcuts = {
                    dividers: ".shortcutsbar>.verticalDivider",
                    previousPageBtn: "#previousPage_shortcut",
                    nextPageBtn: "#nextPage_shortcut",
                    pageNumberTextInput: "#pageNumber",
                    pageCountLabel: "#pageCount",
                    singlePageDisplayBtn: "#singlePageDisplay_shortcut",
                    doublePagesDisplayBtn: "#doublePagesDisplay_shortcut",
                    verticalPagesDisplayBtn: "#verticalPagesDisplay_shortcut",
                    horizontalPagesDisplayBtn: "#horizontalPagesDisplay_shortcut",
                    processAllPagesBtn: "#processAllPages_shortcut"
                };
                // Thumbnails context menu
                this.thumbnailsContextMenu = {
                    container: "#thumbnails",
                    menu: "#thumbnailsContextMenu",
                    thisPageGetTextMenuItem: "#contextMenu_thisPageGetText",
                    allPagesGetTextMenuItem: "#contextMenu_allPagesGetText"
                };
                // Handle long touch on the thumbnails container
                this._isTouchHold = false;
                this._currentTouchPoint = null;
                this._touchMoveTolerance = 20;
                this._mainApp = main;
                this.initPageUI();
            }
            PagePart.prototype.initPageUI = function () {
                var _this = this;
                // Page menu
                $(this.headerToolbar_PageMenu.currentPageGetTextMenuItem).bind("click", $.proxy(this.currentPageGetTextMenuItem_Click, this));
                $(this.headerToolbar_PageMenu.allPagesGetTextMenuItem).bind("click", $.proxy(this.allPagesGetTextMenuItem_Click, this));
                $(this.headerToolbar_PageMenu.readPageBarcodesMenuItem).bind("click", $.proxy(this.readPageBarcodesMenuItem_Click, this));
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Barcode) {
                    // If Barcode, allow read barcode on all pages
                    $(this.headerToolbar_PageMenu.readAllBarcodesMenuItem).click(this.readAllBarcodesMenuItem_Click.bind(this));
                    $(this.shortcuts.processAllPagesBtn).click(this.readAllBarcodesMenuItem_Click.bind(this));
                }
                $(this.thumbnailsContextMenu.thisPageGetTextMenuItem).bind("click", $.proxy(this.thisPageGetTextMenuItem_Click, this));
                $(this.thumbnailsContextMenu.allPagesGetTextMenuItem).bind("click", $.proxy(this.allPagesGetTextMenuItem_Click, this));
                $(document).bind("click", $.proxy(this.hideThumbnailsContextMenu, this));
                // Navigation bar
                $(this._mainApp.navigationbar.showThumbnailsBtn).bind("click", $.proxy(this.showThumbnailsBtn_Click, this));
                $(this._mainApp.navigationbar.showBookmarksBtn).bind("click", $.proxy(this.showBookmarksBtn_Click, this));
                // If the demo run on touch device , we need to handle the long touch to show thumbnails context menu
                if (HTML5Demos.Utils.DemoHelper.isTouchDevice()) {
                    var thumbnailsDiv = document.getElementById("thumbnails");
                    thumbnailsDiv.addEventListener("touchstart", function (e) { return _this.touchstart(e); }, false);
                    thumbnailsDiv.addEventListener("touchmove", function (e) { return _this.touchmove(e); }, false);
                    thumbnailsDiv.addEventListener("touchend", function (e) { return _this.touchend(e); }, false);
                }
                else {
                    // For desktop device , handle context menu event
                    $(this.thumbnailsContextMenu.container).bind("contextmenu", $.proxy(this.contextmenu, this));
                }
            };
            PagePart.prototype.bindElements = function () {
                var _this = this;
                var elements = this._mainApp.commandsBinder.elements;
                var element;
                // Page menu
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.headerToolbar_PageMenu.pageMenuItem);
                element.updateEnabled = false;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.pageFirst;
                element.userInterfaceElement = $(this.headerToolbar_PageMenu.firstPageMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.pagePrevious;
                element.userInterfaceElement = $(this.headerToolbar_PageMenu.previousPageMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.pageNext;
                element.userInterfaceElement = $(this.headerToolbar_PageMenu.nextPageMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.pageLast;
                element.userInterfaceElement = $(this.headerToolbar_PageMenu.lastPageMenuItem);
                elements.push(element);
                if (this._mainApp.demoMode != DocumentViewerDemo.DemoMode.Barcode) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.textGet;
                    element.userInterfaceElement = $(this.headerToolbar_PageMenu.currentPageGetTextMenuItem);
                    element.autoRun = false;
                    element.getValue = function () {
                        return _this._mainApp.documentViewer.currentPageNumber;
                    };
                    elements.push(element);
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.textGet;
                    element.userInterfaceElement = $(this.headerToolbar_PageMenu.allPagesGetTextMenuItem);
                    element.autoRun = false;
                    element.getValue = function () {
                        return 0;
                    };
                    elements.push(element);
                }
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Barcode) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.userInterfaceElement = $(this.headerToolbar_PageMenu.readPageBarcodesMenuItem);
                    element.autoRun = false;
                    elements.push(element);
                }
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.layoutSingle;
                element.userInterfaceElement = $(this.headerToolbar_PageMenu.singlePageDisplayMenuItem);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.layoutDouble;
                element.userInterfaceElement = $(this.headerToolbar_PageMenu.doublePagesDisplayMenuItem);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.layoutVertical;
                element.userInterfaceElement = $(this.headerToolbar_PageMenu.verticalPagesDisplayMenuItem);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.layoutHorizontal;
                element.userInterfaceElement = $(this.headerToolbar_PageMenu.horizontalPagesDisplayMenuItem);
                element.updateChecked = true;
                elements.push(element);
                // Shortcuts
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.shortcuts.dividers);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.pagePrevious;
                element.userInterfaceElement = $(this.shortcuts.previousPageBtn);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.pageNext;
                element.userInterfaceElement = $(this.shortcuts.nextPageBtn);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.shortcuts.pageNumberTextInput);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.shortcuts.pageCountLabel);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.layoutSingle;
                element.userInterfaceElement = $(this.shortcuts.singlePageDisplayBtn);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.layoutDouble;
                element.userInterfaceElement = $(this.shortcuts.doublePagesDisplayBtn);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.layoutVertical;
                element.userInterfaceElement = $(this.shortcuts.verticalPagesDisplayBtn);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.layoutHorizontal;
                element.userInterfaceElement = $(this.shortcuts.horizontalPagesDisplayBtn);
                element.updateChecked = true;
                elements.push(element);
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Barcode) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.userInterfaceElement = $(this.shortcuts.processAllPagesBtn);
                    elements.push(element);
                }
                this.bindPageNumber();
            };
            PagePart.prototype.bindPageNumber = function () {
                var _this = this;
                this._mainApp.commandsBinder.postRuns.push(function () {
                    if (_this._mainApp.documentViewer.hasDocument) {
                        var pageNumber = _this._mainApp.documentViewer.currentPageNumber;
                        var pageCount = _this._mainApp.documentViewer.pageCount;
                        $(_this.shortcuts.pageNumberTextInput).val(pageNumber.toString());
                        $(_this.shortcuts.pageCountLabel).text("/ " + pageCount.toString());
                    }
                    else {
                        $(_this.shortcuts.pageNumberTextInput).val("0");
                        $(_this.shortcuts.pageCountLabel).text("/ " + "0");
                    }
                });
                $(this.shortcuts.pageNumberTextInput).focusout(function (e) {
                    if (!_this._mainApp.documentViewer.hasDocument)
                        return;
                    var pageNumber = _this._mainApp.documentViewer.currentPageNumber;
                    $(_this.shortcuts.pageNumberTextInput).val(pageNumber.toString());
                });
                $(this.shortcuts.pageNumberTextInput).keypress(function (e) {
                    if (e.keyCode != 13)
                        return;
                    // User has pressed enter(Go or return for mobile and tablet devices), go to the new page number
                    e.preventDefault();
                    var text = $(_this.shortcuts.pageNumberTextInput).val();
                    var newPageNumber = parseInt(text);
                    var pageNumber = _this._mainApp.documentViewer.currentPageNumber;
                    var pageCount = _this._mainApp.documentViewer.pageCount;
                    if (newPageNumber && newPageNumber != pageNumber && newPageNumber >= 1 && newPageNumber <= pageCount) {
                        try {
                            _this._mainApp.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.pageGoto, newPageNumber);
                        }
                        catch (ex) {
                            window.alert(ex);
                        }
                    }
                    else {
                        $(_this.shortcuts.pageNumberTextInput).val(pageNumber.toString());
                    }
                });
            };
            PagePart.prototype.currentPageGetTextMenuItem_Click = function (e) {
                // Nothing to do after getting text 
                this._mainApp.getTextOperation = null;
                this._mainApp.getPagesText(this._mainApp.documentViewer.currentPageNumber);
            };
            PagePart.prototype.allPagesGetTextMenuItem_Click = function (e) {
                // Nothing to do after getting text 
                this._mainApp.getTextOperation = null;
                this._mainApp.getPagesText(0);
            };
            PagePart.prototype.readPageBarcodesMenuItem_Click = function (e) {
                var page = this._mainApp.documentViewer.document.pages.item(this._mainApp.documentViewer.currentPageNumber - 1);
                this._mainApp.readBarcodes(page, lt.LeadRectD.empty);
            };
            PagePart.prototype.readAllBarcodesMenuItem_Click = function (e) {
                this._mainApp.readBarcodes(null, lt.LeadRectD.empty);
            };
            PagePart.prototype.thisPageGetTextMenuItem_Click = function (e) {
                var pageNumber = parseInt($(e.currentTarget).data("pageNumber"));
                // Nothing to do after getting text 
                this._mainApp.getTextOperation = null;
                this._mainApp.getPagesText(pageNumber);
            };
            PagePart.prototype.showThumbnailsBtn_Click = function (e) {
                var visibleThumbnails = !HTML5Demos.Utils.UI.isHidden($(this._mainApp.thumbnailsContainer));
                var visibleBookmarks = !HTML5Demos.Utils.UI.isHidden($(this._mainApp.bookmarksContainer));
                if (!visibleThumbnails) {
                    if (visibleBookmarks) {
                        // Hide bookmarks
                        $(this._mainApp.bookmarksContainer).hide();
                        $(this._mainApp.navigationbar.showBookmarksBtn).removeClass("activeNavigationbarBtn");
                    }
                    $(this._mainApp.navigationbar.showThumbnailsBtn).addClass("activeNavigationbarBtn");
                    $(this._mainApp.thumbnailsContainer).show();
                }
                else {
                    $(this._mainApp.navigationbar.showThumbnailsBtn).removeClass("activeNavigationbarBtn");
                    $(this._mainApp.thumbnailsContainer).hide();
                }
                this._mainApp.updateContainers();
            };
            PagePart.prototype.showBookmarksBtn_Click = function (e) {
                var visibleThumbnails = !HTML5Demos.Utils.UI.isHidden($(this._mainApp.thumbnailsContainer));
                var visibleBookmarks = !HTML5Demos.Utils.UI.isHidden($(this._mainApp.bookmarksContainer));
                if (!visibleBookmarks) {
                    if (visibleThumbnails) {
                        // Hide thumbnails
                        $(this._mainApp.thumbnailsContainer).hide();
                        $(this._mainApp.navigationbar.showThumbnailsBtn).removeClass("activeNavigationbarBtn");
                    }
                    $(this._mainApp.navigationbar.showBookmarksBtn).addClass("activeNavigationbarBtn");
                    $(this._mainApp.bookmarksContainer).show();
                }
                else {
                    $(this._mainApp.navigationbar.showBookmarksBtn).removeClass("activeNavigationbarBtn");
                    $(this._mainApp.bookmarksContainer).hide();
                }
                this._mainApp.updateContainers();
            };
            PagePart.prototype.showThumbnailsContextMenu = function (point) {
                if (!this._mainApp.documentViewer.hasDocument) {
                    return;
                }
                // Right now it's all text stuff - so we don't show in barcode mode
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Barcode) {
                    return;
                }
                var thumbnails = this._mainApp.documentViewer.thumbnails;
                if (thumbnails == null) {
                    return;
                }
                var pageNumber = -1;
                var imageViewer = thumbnails.imageViewer;
                var bound = imageViewer.foreCanvas.getBoundingClientRect();
                var position = lt.LeadPointD.create(point.x - bound.left, point.y - bound.top);
                var item = imageViewer.hitTestItem(position);
                if (item != null) {
                    pageNumber = imageViewer.items.indexOf(item) + 1;
                    if (!(this._mainApp.documentViewer.commands.canRun(lt.Documents.UI.DocumentViewerCommands.textGet, pageNumber)))
                        pageNumber = -1;
                }
                if (pageNumber != -1) {
                    $(this.thumbnailsContextMenu.thisPageGetTextMenuItem).data("pageNumber", pageNumber);
                    $(this.thumbnailsContextMenu.thisPageGetTextMenuItem).prop("disabled", false);
                }
                else {
                    $(this.thumbnailsContextMenu.thisPageGetTextMenuItem).data("pageNumber", pageNumber);
                    $(this.thumbnailsContextMenu.thisPageGetTextMenuItem).prop("disabled", true);
                }
                $(this.thumbnailsContextMenu.allPagesGetTextMenuItem).prop("disabled", !(this._mainApp.documentViewer.commands.canRun(lt.Documents.UI.DocumentViewerCommands.textGet, 0)));
                // Hide all menus
                var menus = $(".dropdown.clearfix");
                menus.css("display", "none");
                // Show thumbnails menu
                if (point != null) {
                    $(this.thumbnailsContextMenu.menu).css({
                        display: "block",
                        left: point.x,
                        top: point.y
                    });
                }
            };
            PagePart.prototype.hideThumbnailsContextMenu = function (e) {
                $(this.thumbnailsContextMenu.menu).hide();
            };
            // Handle context menu on desktop devices (for thumbnails container)
            PagePart.prototype.contextmenu = function (e) {
                e.preventDefault();
                var point = lt.LeadPointD.create(e.pageX, e.pageY);
                this.showThumbnailsContextMenu(point);
            };
            PagePart.prototype.touchstart = function (e) {
                var _this = this;
                e.preventDefault();
                this._isTouchHold = true;
                this._currentTouchPoint = lt.LeadPointD.create(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
                this._touchHoldTimeOutHandler = window.setTimeout(function () {
                    if (_this._isTouchHold) {
                        _this.showThumbnailsContextMenu(_this._currentTouchPoint);
                    }
                }, 500);
            };
            PagePart.prototype.touchmove = function (e) {
                e.preventDefault();
                var point = lt.LeadPointD.create(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
                var dx = point.x - this._currentTouchPoint.x;
                var dy = point.y - this._currentTouchPoint.y;
                // +20 / -20 move tolerance
                if (dx > this._touchMoveTolerance || dx < -(this._touchMoveTolerance) || dy > this._touchMoveTolerance || dy < -(this._touchMoveTolerance)) {
                    window.clearTimeout(this._touchHoldTimeOutHandler);
                    this._isTouchHold = false;
                }
            };
            PagePart.prototype.touchend = function (e) {
                e.preventDefault();
                window.clearTimeout(this._touchHoldTimeOutHandler);
                this._isTouchHold = false;
            };
            return PagePart;
        }());
        DocumentViewerDemo.PagePart = PagePart;
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
})(HTML5Demos || (HTML5Demos = {}));
