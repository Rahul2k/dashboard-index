var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        // Binds document viewer command to UI elements
        var CommandBinderElement = (function () {
            function CommandBinderElement() {
                this.updateEnabled = true;
                this.hasDocumentVisible = true;
                this.hasDocumentEmptyEnabled = true;
                this.autoRun = true;
            }
            CommandBinderElement.prototype.runCommand = function (documentViewer) {
                if (this.commandName != null) {
                    documentViewer.commands.run(this.commandName, this.getValue != null ? this.getValue() : null);
                }
                else if (this.commandNames != null) {
                    for (var i = 0; i < this.commandNames.length; i++)
                        documentViewer.commands.run(this.commandNames[i], this.getValue != null ? this.getValue() : null);
                }
            };
            CommandBinderElement.prototype.canRunCommand = function (documentViewer) {
                if (this.commandName != null)
                    return documentViewer.commands.canRun(this.commandName, this.getValue != null ? this.getValue() : null);
                for (var i = 0; i < this.commandNames.length; i++) {
                    if (documentViewer.commands.canRun(this.commandNames[i], this.getValue != null ? this.getValue() : null))
                        return true;
                }
                return false;
            };
            Object.defineProperty(CommandBinderElement.prototype, "hasAnyCommand", {
                get: function () {
                    return (this.commandName != null || this.commandNames != null);
                },
                enumerable: true,
                configurable: true
            });
            return CommandBinderElement;
        }());
        DocumentViewerDemo.CommandBinderElement = CommandBinderElement;
        var CommandsBinder = (function () {
            function CommandsBinder(documentViewer) {
                var _this = this;
                this._elements = new Array();
                this._postRuns = new Array();
                this.itemClick = function (e) {
                    var element = _this._elements[parseInt($(e.currentTarget).data("commandIndex"), 10)];
                    element.runCommand(_this._documentViewer);
                };
                this._documentViewer = documentViewer;
            }
            Object.defineProperty(CommandsBinder.prototype, "elements", {
                get: function () {
                    return this._elements;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CommandsBinder.prototype, "postRuns", {
                get: function () {
                    return this._postRuns;
                },
                enumerable: true,
                configurable: true
            });
            CommandsBinder.prototype.bindActions = function () {
                for (var i = 0; i < this._elements.length; i++) {
                    if (this._elements[i].autoRun && this._elements[i].hasAnyCommand) {
                        this._elements[i].userInterfaceElement.data("commandIndex", i);
                        this._elements[i].userInterfaceElement.bind("click", this.itemClick);
                    }
                }
            };
            CommandsBinder.prototype.run = function () {
                var hasDocument = this._documentViewer.hasDocument;
                var isDocumentEmpty = this._documentViewer.pageCount === 0;
                for (var i = 0; i < this._elements.length; i++) {
                    var element = this._elements[i];
                    var userInterfaceElement = element.userInterfaceElement;
                    var canRun = false;
                    if (element.canRun != null) {
                        canRun = element.canRun(this._documentViewer, element.canRunValue);
                    }
                    else if (element.hasDocumentVisible) {
                        canRun = hasDocument;
                        HTML5Demos.Utils.UI.toggleHideClass(userInterfaceElement, canRun);
                    }
                    if (canRun && element.hasAnyCommand)
                        canRun = element.canRunCommand(this._documentViewer);
                    var updateCheckedState = element.updateChecked;
                    var command = null;
                    if (element.commandName != null) {
                        // This might be a state command, check
                        command = this._documentViewer.commands.getCommand(element.commandName);
                    }
                    if (!updateCheckedState)
                        updateCheckedState = (command != null && command.hasState);
                    if (!updateCheckedState) {
                        if (canRun && !element.hasDocumentEmptyEnabled && isDocumentEmpty)
                            canRun = false;
                        if (element.updateEnabled && (!userInterfaceElement.is(":disabled") != canRun))
                            userInterfaceElement.prop("disabled", !canRun);
                    }
                    else {
                        if (hasDocument) {
                            userInterfaceElement.prop("disabled", false);
                            var checkedState = false;
                            if (command != null && command.hasState)
                                checkedState = command.state;
                            else
                                checkedState = !canRun;
                            if (userInterfaceElement.hasClass("menuItem")) {
                                HTML5Demos.Utils.DemoHelper.checked(userInterfaceElement.find(".icon"), checkedState);
                            }
                            else {
                                HTML5Demos.Utils.DemoHelper.checked(userInterfaceElement, checkedState);
                            }
                        }
                        else {
                            if (userInterfaceElement.hasClass("menuItem")) {
                                HTML5Demos.Utils.DemoHelper.checked(userInterfaceElement.find(".icon"), false);
                            }
                            else {
                                HTML5Demos.Utils.DemoHelper.checked(userInterfaceElement, false);
                            }
                            userInterfaceElement.prop("disabled", true);
                        }
                    }
                    if (element.updateVisible)
                        HTML5Demos.Utils.UI.toggleHideClass(userInterfaceElement, canRun);
                }
                for (var i = 0; i < this._postRuns.length; i++)
                    this._postRuns[i]();
            };
            return CommandsBinder;
        }());
        DocumentViewerDemo.CommandsBinder = CommandsBinder;
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
})(HTML5Demos || (HTML5Demos = {}));
