var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        // Contains the interactive part
        var InteractivePart = (function () {
            function InteractivePart(main) {
                // Reference to the DocumentViewerDemoApp
                this._mainApp = null;
                // Reference to main imageviewer's useElements mode
                this._useElements = false;
                // Interactive menu items
                this.headerToolbar_InteractiveMenu = {
                    interactiveMenuItem: "#interactiveMenuItem",
                    panZoomModeMenuItem: "#panZoomMode",
                    panModeMenuItem: "#panMode",
                    zoomModeMenuItem: "#zoomMode",
                    zoomToModeMenuItem: "#zoomToMode",
                    magnifyGlassModeMenuItem: "#magnifyGlassMode",
                    rubberBandInteractiveModeMenuItem: "#rubberBandInteractiveMode",
                    selectTextModeMenuItem: "#selectTextMode",
                    autoPanMenuItem: "#autoPan",
                    inertiaScrollMenuItem: "#inertiaScroll"
                };
                // Shortcuts
                this.shortcuts = {
                    panZoomModeBtn: "#panZoomMode_shortcut",
                    panModeBtn: "#panMode_shortcut",
                    zoomModeBtn: "#zoomMode_shortcut",
                    zoomToModeBtn: "#zoomToMode_shortcut",
                    magnifyGlassModeBtn: "#magnifyGlassMode_shortcut",
                    rubberBandInteractiveModeBtn: "#rubberBandInteractiveMode_shortcut",
                    selectTextModeBtn: "#selectTextMode_shortcut",
                };
                this._mainApp = main;
                this.initInteractiveUI();
            }
            InteractivePart.prototype.initInteractiveUI = function () {
                $(this.headerToolbar_InteractiveMenu.rubberBandInteractiveModeMenuItem).bind("click", $.proxy(this.rubberBandInteractiveModeMenuItem_Click, this));
                $(this.shortcuts.rubberBandInteractiveModeBtn).bind("click", $.proxy(this.rubberBandInteractiveModeBtn_Click, this));
                $(this.headerToolbar_InteractiveMenu.interactiveMenuItem).bind("click", $.proxy(this.interactiveMenuItem_Click, this));
                $(this.headerToolbar_InteractiveMenu.inertiaScrollMenuItem).bind("click", $.proxy(this.inertiaScrollMenuItem_Click, this));
            };
            InteractivePart.prototype.bindElements = function () {
                var elements = this._mainApp.commandsBinder.elements;
                var element;
                // Interactive menu
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.headerToolbar_InteractiveMenu.interactiveMenuItem);
                element.updateEnabled = false;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.interactivePanZoom;
                element.userInterfaceElement = $(this.headerToolbar_InteractiveMenu.panZoomModeMenuItem);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.interactivePan;
                element.userInterfaceElement = $(this.headerToolbar_InteractiveMenu.panModeMenuItem);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.interactiveZoom;
                element.userInterfaceElement = $(this.headerToolbar_InteractiveMenu.zoomModeMenuItem);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.interactiveZoomTo;
                element.userInterfaceElement = $(this.headerToolbar_InteractiveMenu.zoomToModeMenuItem);
                element.updateChecked = true;
                elements.push(element);
                //if (!this._mainApp.useElements) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.interactiveMagnifyGlass;
                    element.userInterfaceElement = $(this.headerToolbar_InteractiveMenu.magnifyGlassModeMenuItem);
                    element.updateChecked = true;
                    elements.push(element);
                //}
                //else {
                    //$(this.headerToolbar_InteractiveMenu.magnifyGlassModeMenuItem).remove();
                //}
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.OCR) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.interactiveRubberBand;
                    element.userInterfaceElement = $(this.headerToolbar_InteractiveMenu.rubberBandInteractiveModeMenuItem);
                    element.updateChecked = true;
                    element.autoRun = false;
                    elements.push(element);
                }
                if (this._mainApp.demoMode != DocumentViewerDemo.DemoMode.Barcode) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.interactiveSelectText;
                    element.userInterfaceElement = $(this.headerToolbar_InteractiveMenu.selectTextModeMenuItem);
                    element.updateChecked = true;
                    elements.push(element);
                }
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.interactiveAutoPan;
                element.userInterfaceElement = $(this.headerToolbar_InteractiveMenu.autoPanMenuItem);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.userInterfaceElement = $(this.headerToolbar_InteractiveMenu.inertiaScrollMenuItem);
                elements.push(element);
                // Shortcuts
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.interactivePanZoom;
                element.userInterfaceElement = $(this.shortcuts.panZoomModeBtn);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.interactivePan;
                element.userInterfaceElement = $(this.shortcuts.panModeBtn);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.interactiveZoom;
                element.userInterfaceElement = $(this.shortcuts.zoomModeBtn);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.interactiveZoomTo;
                element.userInterfaceElement = $(this.shortcuts.zoomToModeBtn);
                element.updateChecked = true;
                elements.push(element);
                //if (!this._mainApp.useElements) {
                    // Remove the magnifyGlass option in Elements Mode
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.interactiveMagnifyGlass;
                    element.userInterfaceElement = $(this.shortcuts.magnifyGlassModeBtn);
                    element.updateChecked = true;
                    elements.push(element);
                //}
                //else {
                    //$(this.shortcuts.magnifyGlassModeBtn).remove();
                //}
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.OCR || this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Barcode) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.interactiveRubberBand;
                    element.userInterfaceElement = $(this.shortcuts.rubberBandInteractiveModeBtn);
                    element.updateChecked = true;
                    elements.push(element);
                }
                if (this._mainApp.demoMode != DocumentViewerDemo.DemoMode.Barcode) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.commandName = lt.Documents.UI.DocumentViewerCommands.interactiveSelectText;
                    element.userInterfaceElement = $(this.shortcuts.selectTextModeBtn);
                    element.updateChecked = true;
                    elements.push(element);
                }
                // Set up the rubberband options, only once
                this.setRubberBandInteractiveMode();
            };
            InteractivePart.prototype.rubberBandInteractiveModeMenuItem_Click = function (e) {
                this._mainApp.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactiveRubberBand, null);
            };
            InteractivePart.prototype.rubberBandInteractiveModeBtn_Click = function (e) {
                this._mainApp.documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactiveRubberBand, null);
            };
            InteractivePart.prototype.setRubberBandInteractiveMode = function () {
                var _this = this;
                var rubberbandMode = this._mainApp.documentViewer.view.imageViewer.interactiveModes.findById(lt.Controls.ImageViewerInteractiveMode.rubberBandModeId);
                rubberbandMode.rubberBandCompleted.add(function (sender, e) { return _this.rubberBandCompleted(sender, e); });
                rubberbandMode.autoItemMode = lt.Controls.ImageViewerAutoItemMode.autoSet;
            };
            InteractivePart.prototype.rubberBandCompleted = function (sender, e) {
                if (e.isCanceled)
                    return;
                var imageViewer = this._mainApp.documentViewer.view.imageViewer;
                var rubberBand = sender;
                var item = rubberBand.item;
                // Confirm that the search area is still at least partially on screen
                var searchAreaInControl = lt.LeadRectD.fromLTRB(e.points[0].x, e.points[0].y, e.points[1].x, e.points[1].y);
                // Intersect the search area with the control. If completely outside the screen, cancel.
                var controlSize = imageViewer.controlSize;
                var intersect = lt.LeadRectD.intersectRects(searchAreaInControl, lt.LeadRectD.create(0, 0, controlSize.width, controlSize.height));
                if (intersect.isEmpty || intersect.width <= 0 || intersect.height <= 0)
                    return;
                var searchArea = imageViewer.convertRect(item, lt.Controls.ImageViewerCoordinateType.control, lt.Controls.ImageViewerCoordinateType.image, searchAreaInControl);
                if (searchArea.width > 3 && searchArea.height > 3) {
                    // If > 3, it's not a click. Call readBarcodes.
                    var pageIndex = imageViewer.items.indexOf(item);
                    var document = this._mainApp.documentViewer.document;
                    searchArea = document.rectToDocument(searchArea);
                    var page = document.pages.item(pageIndex);
                    if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.OCR)
                        this._mainApp.recognize(page, searchArea);
                    else if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Barcode)
                        this._mainApp.readBarcodes(page, searchArea);
                }
                else if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Barcode) {
                    // If < 3, consider it a click, and show the barcode if it's in the current barcode list.
                    var pageIndex = imageViewer.items.indexOf(item);
                    var document = this._mainApp.documentViewer.document;
                    searchArea = document.rectToDocument(searchArea);
                    this._mainApp.checkBarcodeData(pageIndex, searchArea);
                }
            };
            InteractivePart.prototype.interactiveMenuItem_Click = function (e) {
                HTML5Demos.Utils.DemoHelper.checked($(this.headerToolbar_InteractiveMenu.inertiaScrollMenuItem).find(".icon"), this._mainApp.preferencesPart.enableInertiaScroll);
            };
            InteractivePart.prototype.inertiaScrollMenuItem_Click = function (e) {
                this._mainApp.toggleInertiaScroll();
                HTML5Demos.Utils.DemoHelper.checked($(this.headerToolbar_InteractiveMenu.inertiaScrollMenuItem).find(".icon"), this._mainApp.preferencesPart.enableInertiaScroll);
            };
            return InteractivePart;
        }());
        DocumentViewerDemo.InteractivePart = InteractivePart;
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
})(HTML5Demos || (HTML5Demos = {}));
