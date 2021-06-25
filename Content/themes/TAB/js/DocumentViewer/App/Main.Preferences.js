var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        // Contains the preferences part and demo settings
        var PreferencesPart = (function () {
            function PreferencesPart(main) {
                // Reference to the DocumentViewerDemoApp
                this._mainApp = null;
                this.headerToolbar_PreferencesMenu = {
                    preferencesMenuItem: "#preferencesMenuItem",
                    userNameMenuItem: "#userNameMenuItem",
                    showTextIndicatorsMenuItem: "#showTextIndicators",
                    showLinksMenuItem: "#showLinks",
                    documentViewerOptionsMenuItem: "#documentViewerOptions",
                };
                this._mainApp = main;
                this.preferredItemType = lt.Documents.UI.DocumentViewerItemType.image;
                if (this._mainApp.demoMode != DocumentViewerDemo.DemoMode.Barcode)
                    this.showTextIndicators = true;
                this.showLinks = false;
                this.enableInertiaScroll = true;
                this.initPreferencesUI();
            }
            PreferencesPart.prototype.initPreferencesUI = function () {
                $(this.headerToolbar_PreferencesMenu.preferencesMenuItem).bind("click", $.proxy(this.preferencesMenuItem_Click, this));
                $(this.headerToolbar_PreferencesMenu.userNameMenuItem).bind("click", $.proxy(this.userNameMenuItem_Click, this));
                $(this.headerToolbar_PreferencesMenu.showTextIndicatorsMenuItem).bind("click", $.proxy(this.showTextIndicatorsMenuItem_Click, this));
                $(this.headerToolbar_PreferencesMenu.showLinksMenuItem).bind("click", $.proxy(this.showLinksMenuItem_Click, this));
                $(this.headerToolbar_PreferencesMenu.documentViewerOptionsMenuItem).bind("click", $.proxy(this.documentViewerOptionsMenuItem_Click, this));
            };
            PreferencesPart.prototype.preferencesMenuItem_Click = function (e) {
                HTML5Demos.Utils.DemoHelper.checked($(this.headerToolbar_PreferencesMenu.showTextIndicatorsMenuItem).find(".icon"), this.showTextIndicators);
                HTML5Demos.Utils.DemoHelper.checked($(this.headerToolbar_PreferencesMenu.showLinksMenuItem).find(".icon"), this.showLinks);
            };
            PreferencesPart.prototype.userNameMenuItem_Click = function (e) {
                var _this = this;
                this._mainApp.inputDlg.title = "User Name";
                this._mainApp.inputDlg.description = "Enter user name for modifying annotations in the document";
                this._mainApp.inputDlg.inputInitialValue = this._mainApp.documentViewer.userName;
                this._mainApp.inputDlg.isPassword = false;
                this._mainApp.inputDlg.show();
                this._mainApp.inputDlg.OkClick = function (userName) {
                    if (userName != null || userName != "") {
                        _this._mainApp.documentViewer.userName = userName;
                        lt.Annotations.JavaScript.AutomationObjectsListControl.userName = userName;
                    }
                    else {
                        _this._mainApp.documentViewer.userName = "Author";
                        lt.Annotations.JavaScript.AutomationObjectsListControl.userName = "Author";
                    }
                };
            };
            PreferencesPart.prototype.showTextIndicatorsMenuItem_Click = function (e) {
                this.showTextIndicators = !this.showTextIndicators;
                HTML5Demos.Utils.DemoHelper.checked($(this.headerToolbar_PreferencesMenu.showTextIndicatorsMenuItem).find(".icon"), this.showTextIndicators);
                // Invalidate the view
                this._mainApp.documentViewer.view.invalidate(lt.LeadRectD.empty);
                if (this._mainApp.documentViewer.thumbnails != null)
                    this._mainApp.documentViewer.thumbnails.invalidate(lt.LeadRectD.empty);
            };
            PreferencesPart.prototype.showLinksMenuItem_Click = function (e) {
                this.showLinks = !this.showLinks;
                HTML5Demos.Utils.DemoHelper.checked($(this.headerToolbar_PreferencesMenu.showLinksMenuItem).find(".icon"), this.showLinks);
                this._mainApp.documentViewer.diagnostics.showLinks = this.showLinks;
            };
            PreferencesPart.prototype.documentViewerOptionsMenuItem_Click = function (e) {
                // Set the documentViewer for the dialog
                this._mainApp.documentViewerOptionsDlg.hookPrepareAjax = this._mainApp.hookPrepareAjax;
                this._mainApp.documentViewerOptionsDlg.useCSSTransitions = this._mainApp.useCSSTransitions;
                this._mainApp.documentViewerOptionsDlg.documentViewer = this._mainApp.documentViewer;
                this._mainApp.documentViewerOptionsDlg.show();
            };
            return PreferencesPart;
        }());
        DocumentViewerDemo.PreferencesPart = PreferencesPart;
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
})(HTML5Demos || (HTML5Demos = {}));
