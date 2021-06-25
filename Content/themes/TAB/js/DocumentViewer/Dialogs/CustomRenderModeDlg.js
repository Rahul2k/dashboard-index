var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var CustomRenderModeDlg = (function () {
            function CustomRenderModeDlg() {
                // Create shortcuts for the dialog UI elements 
                this.dialogUI = {
                    dialog: "#customRenderModeDialog",
                    moveToInvisibleBtn: "#moveToInvisible",
                    moveToVisibleBtn: "#moveToVisible",
                    OkBtn: "#customRenderModeDlg_OK",
                };
                this.Init();
            }
            CustomRenderModeDlg.prototype.Init = function () {
                var _this = this;
                // Create select element objectes (acts as list boxes)
                this._visibleObjectsListBox = document.getElementById("visibleObjectList");
                this._invisibleObjectsListBox = document.getElementById("invisibleObjectList");
                this._visibleObjectsListBox.addEventListener("click", function (e) { return _this.visibleObjectsListBox_Clicked(e); }, false);
                this._visibleObjectsListBox.addEventListener("change", function (e) { return _this.visibleObjectsListBox_SelectedIndexChanged(e); }, false);
                this._visibleObjectsListBox.addEventListener("keydown", function (e) { return _this.visibleObjectsListBox_Keydown(e); }, false);
                this._invisibleObjectsListBox.addEventListener("click", function (e) { return _this.invisibleObjectsListBox_Clicked(e); }, false);
                this._invisibleObjectsListBox.addEventListener("change", function (e) { return _this.invisibleObjectsListBox_SelectedIndexChanged(e); }, false);
                this._invisibleObjectsListBox.addEventListener("keydown", function (e) { return _this.invisibleObjectsListBox_Keydown(e); }, false);
                $(this.dialogUI.moveToInvisibleBtn).bind("click", $.proxy(this.moveToInvisibleBtn_Click, this));
                $(this.dialogUI.moveToVisibleBtn).bind("click", $.proxy(this.moveToVisibleBtn_Click, this));
                $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
            };
            CustomRenderModeDlg.prototype.show = function () {
                // Clear visible objects list
                while (this._visibleObjectsListBox.options.length > 0)
                    this._visibleObjectsListBox.remove(0);
                // Clear invisible objects list
                while (this._invisibleObjectsListBox.options.length > 0)
                    this._invisibleObjectsListBox.remove(0);
                for (var key in this.allRenderers) {
                    if (this.allRenderers.hasOwnProperty(key)) {
                        var annObjectId = key;
                        switch (parseInt(annObjectId)) {
                            // ignore these types
                            case lt.Annotations.Core.AnnObject.selectObjectId:
                            case lt.Annotations.Core.AnnObject.imageObjectId:
                                break;
                            default:
                                var automationObject = this.automationManager.findObjectById(parseInt(annObjectId));
                                if (automationObject != null) {
                                    // currentRenderers : current renderers in RenderMode
                                    var inCurrentRenderers = false;
                                    for (var key in this.currentRenderers) {
                                        if (this.allRenderers.hasOwnProperty(key)) {
                                            if (annObjectId == key) {
                                                inCurrentRenderers = true;
                                                break;
                                            }
                                        }
                                    }
                                    // Listbox item -> HTMLOptionElement
                                    var listBoxItem = document.createElement("option");
                                    listBoxItem.value = annObjectId;
                                    listBoxItem.text = automationObject.name;
                                    if (inCurrentRenderers)
                                        // Visible means its in RenderMode
                                        this._visibleObjectsListBox.add(listBoxItem);
                                    else
                                        this._invisibleObjectsListBox.add(listBoxItem);
                                }
                                break;
                        }
                    }
                }
                this.updateUIState();
                $(this.dialogUI.dialog).modal();
            };
            CustomRenderModeDlg.prototype.visibleObjectsListBox_Clicked = function (e) {
                this.updateUIState();
            };
            CustomRenderModeDlg.prototype.invisibleObjectsListBox_Clicked = function (e) {
                this.updateUIState();
            };
            CustomRenderModeDlg.prototype.visibleObjectsListBox_SelectedIndexChanged = function (e) {
                this.updateUIState();
            };
            CustomRenderModeDlg.prototype.invisibleObjectsListBox_SelectedIndexChanged = function (e) {
                this.updateUIState();
            };
            CustomRenderModeDlg.prototype.visibleObjectsListBox_Keydown = function (e) {
                e.preventDefault();
                // Ctrl + A
                if (e.keyCode == 65 && e.ctrlKey) {
                    // Select all options
                    var options = this._visibleObjectsListBox && this._visibleObjectsListBox.options;
                    for (var i = 0; i < options.length; i++) {
                        var option = options[i];
                        option.selected = true;
                    }
                }
            };
            CustomRenderModeDlg.prototype.invisibleObjectsListBox_Keydown = function (e) {
                e.preventDefault();
                // Ctrl + A
                if (e.keyCode == 65 && e.ctrlKey) {
                    // Select all options
                    var options = this._invisibleObjectsListBox && this._invisibleObjectsListBox.options;
                    for (var i = 0; i < options.length; i++) {
                        var option = options[i];
                        option.selected = true;
                    }
                }
            };
            CustomRenderModeDlg.prototype.updateUIState = function () {
                var visibleSelectedItems = this.getSelectedItems(this._visibleObjectsListBox);
                $(this.dialogUI.moveToInvisibleBtn).prop("disabled", !(visibleSelectedItems.length > 0));
                var invisibleSelectedItems = this.getSelectedItems(this._invisibleObjectsListBox);
                $(this.dialogUI.moveToVisibleBtn).prop("disabled", !(invisibleSelectedItems.length > 0));
            };
            // Get list of selected option , in a select element
            CustomRenderModeDlg.prototype.getSelectedItems = function (selectElement) {
                var selectedItem = new Array();
                var options = selectElement && selectElement.options;
                for (var i = 0; i < options.length; i++) {
                    var option = options[i];
                    if (option.selected) {
                        selectedItem.push(option);
                    }
                }
                return selectedItem;
            };
            CustomRenderModeDlg.prototype.moveToInvisibleBtn_Click = function (e) {
                this.moveObjects(this._visibleObjectsListBox, this._invisibleObjectsListBox);
            };
            CustomRenderModeDlg.prototype.moveToVisibleBtn_Click = function (e) {
                this.moveObjects(this._invisibleObjectsListBox, this._visibleObjectsListBox);
            };
            CustomRenderModeDlg.prototype.moveObjects = function (sourceListBox, targetListBox) {
                var selectedItems = this.getSelectedItems(sourceListBox);
                if (selectedItems.length == 0)
                    return;
                for (var i = 0; i < selectedItems.length; i++) {
                    sourceListBox.remove(selectedItems[i].index);
                    targetListBox.add(selectedItems[i]);
                }
                this.updateUIState();
            };
            Object.defineProperty(CustomRenderModeDlg.prototype, "OkClick", {
                // Events mutators
                set: function (value) {
                    this._OkClick = value;
                },
                enumerable: true,
                configurable: true
            });
            CustomRenderModeDlg.prototype.OkBtn_Click = function (e) {
                $(this.dialogUI.dialog).modal("hide");
                // Get items in visible
                var visableItems = this._visibleObjectsListBox && this._visibleObjectsListBox.options;
                this.resultRenderers = {};
                for (var i = 0; i < visableItems.length; i++) {
                    var option = visableItems[i];
                    this.resultRenderers[option.value] = this.allRenderers[option.value];
                }
                if (this._OkClick != null) { }
                // fire the OkClick event
                this._OkClick();
            };
            return CustomRenderModeDlg;
        }());
        Dialogs.CustomRenderModeDlg = CustomRenderModeDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
