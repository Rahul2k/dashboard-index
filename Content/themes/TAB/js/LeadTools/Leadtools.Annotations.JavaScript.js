var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var AnnPropertyInfo = (function () {
                function AnnPropertyInfo(propertyName, readOnly, value, category, description, displayName, visible, editorType) {
                    var _this = this;
                    this.editorType_OnValueChanged = function (oldValue, newValue) {
                        _this._value = newValue;
                        if (_this.valueChanged != null)
                            _this.valueChanged(oldValue, newValue);
                    };
                    this._values = {};
                    this._isReadOnly = readOnly;
                    this._type = value;
                    this._category = category;
                    this._description = description;
                    this._isVisible = visible;
                    if (isNullOrEmptyString(displayName)) {
                        this._displayName = propertyName;
                    }
                    else {
                        this._displayName = displayName;
                    }
                    this._editorType = new editorType(value, category, propertyName, this._displayName);
                    this._editorType.onValueChanged = this.editorType_OnValueChanged;
                    this._value = value;
                }
                Object.defineProperty(AnnPropertyInfo.prototype, "editorType", {
                    get: function () { return this._editorType; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "isReadOnly", {
                    get: function () { return this._isReadOnly; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "isVisible", {
                    get: function () { return this._isVisible; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.valueChanged != null)
                            this.valueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "displayName", {
                    get: function () { return this._displayName; },
                    set: function (value) { this._displayName = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "values", {
                    get: function () { return this._values; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "type", {
                    get: function () { return this._type; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "hasValues", {
                    get: function () { return this._hasValues; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "category", {
                    get: function () { return this._category; },
                    set: function (value) { this._category = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPropertyInfo.prototype, "description", {
                    get: function () { return this._description; },
                    set: function (value) { this._description = value; },
                    enumerable: true,
                    configurable: true
                });
                return AnnPropertyInfo;
            }());
            JavaScript.AnnPropertyInfo = AnnPropertyInfo;
            function isNullOrEmptyString(str) {
                return (str == "" || str == null);
            }
            JavaScript.isNullOrEmptyString = isNullOrEmptyString;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var AudioPlayerDialog = (function () {
                function AudioPlayerDialog() {
                    this.dialogUI = {
                        dialog: "#audioPlayerDialog",
                        OkBtn: "#audioPlayerDlg_OK",
                        dialogNameLable: "#audioDialogName",
                        audioObject: "audioObject"
                    };
                    this.Init();
                }
                AudioPlayerDialog.prototype.Init = function () {
                    $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
                };
                AudioPlayerDialog.prototype.show = function (source1, source2, source3) {
                    if ((source1 == "" && source1 == null) && (source2 == "" && source2 == null) && (source3 == "" && source3 == null))
                        return;
                    $(this.dialogUI.dialogNameLable).text("Audio Player");
                    $(this.dialogUI.dialog).modal();
                    this._audioElement = document.getElementById(this.dialogUI.audioObject);
                    if (typeof (this._audioElement.play) != "function") {
                        this._audioElement.innerHTML = "Your browser does not support HTML5 video.";
                    }
                    else {
                        this._sourceElement1 = document.createElement("source");
                        this._sourceElement1.src = source1;
                        this._sourceElement2 = document.createElement("source");
                        this._sourceElement2.src = source2;
                        this._sourceElement3 = document.createElement("source");
                        this._sourceElement3.src = source3;
                        this._audioElement.appendChild(this._sourceElement1);
                        this._audioElement.appendChild(this._sourceElement2);
                        this._audioElement.appendChild(this._sourceElement3);
                        this._audioElement.load();
                        this._audioElement.play();
                    }
                };
                Object.defineProperty(AudioPlayerDialog.prototype, "audioElement", {
                    get: function () {
                        return this._audioElement;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AudioPlayerDialog.prototype, "OkClick", {
                    set: function (value) {
                        this._OkClick = null;
                        this._OkClick = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                AudioPlayerDialog.prototype.OkBtn_Click = function (e) {
                    if (this._audioElement != null) {
                        this._audioElement.pause();
                        this._audioElement.removeChild(this._sourceElement1);
                        this._audioElement.removeChild(this._sourceElement2);
                        this._audioElement.removeChild(this._sourceElement3);
                    }
                    if (this._OkClick != null) {
                        this._OkClick();
                    }
                    $(this.dialogUI.dialog).modal("hide");
                };
                return AudioPlayerDialog;
            }());
            JavaScript.AudioPlayerDialog = AudioPlayerDialog;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var AutomationUpdateObjectDialog = (function () {
                function AutomationUpdateObjectDialog() {
                    var _this = this;
                    this._initialPage = AutomationUpdateObjectDlgTab.Properties;
                    this._targetObject = null;
                    this._automation = null;
                    this._userName = "";
                    this._tabVisible = [true, true, true];
                    this.dialogUI = {
                        dialog: "#automationUpdateObjectDialog",
                        dialogBodyDiv: "#automationUpdateObjectDialog_Body",
                        propertiesTab: "annPropertiesTab",
                        contentTab: "annContentTab",
                        reviewsTab: "annReviewsTab"
                    };
                    this.show = function () {
                        if (_this._automation != null && _this._targetObject == null) {
                            _this._targetObject = _this._automation.currentEditObject;
                        }
                        if (_this._targetObject == null) {
                            alert("No target object specified");
                            return;
                        }
                        if (_this._automation == null)
                            _this._tabVisible[AutomationUpdateObjectDlgTab.Properties] = false;
                        _this.generateDialogTabs();
                        _this.initPropertiestab(_this._tabVisible[AutomationUpdateObjectDlgTab.Properties]);
                        _this.initContenttab(_this._tabVisible[AutomationUpdateObjectDlgTab.Content]);
                        _this.initReviewstab(_this._tabVisible[AutomationUpdateObjectDlgTab.Reviews]);
                        $(_this.dialogUI.dialog).modal();
                    };
                    this.generateDialogTabs = function () {
                        var body = "";
                        body += "<ul class='nav nav-tabs'>";
                        if (_this._tabVisible[AutomationUpdateObjectDlgTab.Properties])
                            body += "<li class='active'><a id='annPropertiesTabBtn' href='#annPropertiesTab' data-toggle='tab'>Properties</a></li>";
                        if (_this._tabVisible[AutomationUpdateObjectDlgTab.Content])
                            body += "<li><a id='annContentTabBtn' href='#annContentTab' data-toggle='tab'>Content</a></li>";
                        if (_this._tabVisible[AutomationUpdateObjectDlgTab.Reviews])
                            body += "<li><a id='annReviewsTabBtn' href='#annReviewsTab' data-toggle='tab'>Reviews</a></li>";
                        body += "</ul>";
                        body += "<div class='tab-content'>";
                        if (_this._tabVisible[AutomationUpdateObjectDlgTab.Properties]) {
                            body += "<div class='tab-pane active' id='" + _this.dialogUI.propertiesTab + "'>";
                            body += "</div>";
                        }
                        if (_this._tabVisible[AutomationUpdateObjectDlgTab.Content]) {
                            var active = _this._tabVisible[AutomationUpdateObjectDlgTab.Properties] ? "" : " active";
                            body += "<div class='tab-pane " + active + "' id='" + _this.dialogUI.contentTab + "'>";
                            body += "</div>";
                        }
                        if (_this._tabVisible[AutomationUpdateObjectDlgTab.Reviews]) {
                            var active = (_this._tabVisible[AutomationUpdateObjectDlgTab.Properties] || _this._tabVisible[AutomationUpdateObjectDlgTab.Content]) ? "" : " active";
                            body += "<div class='tab-pane " + active + "' id='" + _this.dialogUI.reviewsTab + "'>";
                            body += "</div>";
                        }
                        body += "</div>";
                        $(_this.dialogUI.dialogBodyDiv).html(body);
                    };
                    this._propertiesPage = new lt.Annotations.JavaScript.PropertiesPage();
                    this._contentPage = new lt.Annotations.JavaScript.ContentPage();
                    this._reviewsPage = new lt.Annotations.JavaScript.ReviewsPage();
                    $(this.dialogUI.dialog).on('hidden.bs.modal', $.proxy(this.automationUpdateObjectDialog_Hide, this));
                }
                Object.defineProperty(AutomationUpdateObjectDialog.prototype, "initialPage", {
                    get: function () { return this._initialPage; },
                    set: function (value) { this._initialPage = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationUpdateObjectDialog.prototype, "targetObject", {
                    get: function () { return this._targetObject; },
                    set: function (value) {
                        if (this._targetObject != value) {
                            this._targetObject = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationUpdateObjectDialog.prototype, "automation", {
                    get: function () { return this._automation; },
                    set: function (value) {
                        if (this._automation != value) {
                            if (this._automation != null)
                                this._automation.active = false;
                            this._automation = value;
                            this._automation.active = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationUpdateObjectDialog.prototype, "userName", {
                    get: function () { return this._userName; },
                    set: function (value) { this._userName = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationUpdateObjectDialog.prototype, "tabVisible", {
                    get: function () { return this._tabVisible; },
                    set: function (value) { this._tabVisible = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationUpdateObjectDialog.prototype, "onHide", {
                    set: function (value) {
                        this._onHide = null;
                        this._onHide = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                AutomationUpdateObjectDialog.prototype.automationUpdateObjectDialog_Hide = function () {
                    if (this._tabVisible[AutomationUpdateObjectDlgTab.Reviews]) {
                        this._reviewsPage.replacesReviewsIn(this._targetObject);
                        this._reviewsPage.cleanUp();
                    }
                    for (var i = 0; i < this._tabVisible.length; i++) {
                        this._tabVisible[i] = true;
                    }
                    var annObjCol = new lt.Annotations.Core.AnnObjectCollection();
                    annObjCol.add(this._targetObject);
                    this._automation.invokeAfterObjectChanged(annObjCol, lt.Annotations.Automation.AnnObjectChangedType.modified);
                    this._automation.invokeAfterObjectChanged(annObjCol, lt.Annotations.Automation.AnnObjectChangedType.metadata);
                    this._automation.invalidate(lt.LeadRectD.empty);
                    if (this._onHide != null) {
                        this._onHide();
                    }
                };
                AutomationUpdateObjectDialog.prototype.initPropertiestab = function (isVisible) {
                    var _this = this;
                    if (isVisible) {
                        this._propertiesPage.automation = this._automation;
                        this._propertiesPage.outputDivId = this.dialogUI.propertiesTab;
                        lt.Annotations.JavaScript.PropertiesPage.onPropertiesChanged = function () {
                            _this._automation.invalidate(lt.LeadRectD.empty);
                        };
                        this._propertiesPage.initialize();
                    }
                };
                AutomationUpdateObjectDialog.prototype.initContenttab = function (isVisible) {
                    var _this = this;
                    if (isVisible) {
                        this._contentPage.outputDivId = this.dialogUI.contentTab;
                        if (this._targetObject != null) {
                            var metadata = this._targetObject.metadata;
                            if (metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] != undefined || metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] != null)
                                this._contentPage.contentText = this._targetObject.metadata[lt.Annotations.Core.AnnObject.contentMetadataKey];
                        }
                        this._contentPage.targetObject = this._targetObject;
                        this._contentPage.initialize();
                        this._contentPage.onContentChange = function () {
                            _this._reviewsPage.updateContent(_this.targetObject);
                        };
                    }
                };
                AutomationUpdateObjectDialog.prototype.initReviewstab = function (isVisible) {
                    if (isVisible) {
                        this._reviewsPage.pageUI.page = this.dialogUI.reviewsTab;
                        this._reviewsPage.userName = this._userName;
                        this._reviewsPage.initialize();
                        this._reviewsPage.copyReviewsFrom(this._targetObject);
                    }
                };
                AutomationUpdateObjectDialog.prototype.setTabVisible = function (tab, value) {
                    this._tabVisible[tab] = value;
                };
                return AutomationUpdateObjectDialog;
            }());
            JavaScript.AutomationUpdateObjectDialog = AutomationUpdateObjectDialog;
            (function (AutomationUpdateObjectDlgTab) {
                AutomationUpdateObjectDlgTab[AutomationUpdateObjectDlgTab["Properties"] = 0] = "Properties";
                AutomationUpdateObjectDlgTab[AutomationUpdateObjectDlgTab["Content"] = 1] = "Content";
                AutomationUpdateObjectDlgTab[AutomationUpdateObjectDlgTab["Reviews"] = 2] = "Reviews";
            })(JavaScript.AutomationUpdateObjectDlgTab || (JavaScript.AutomationUpdateObjectDlgTab = {}));
            var AutomationUpdateObjectDlgTab = JavaScript.AutomationUpdateObjectDlgTab;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var ContentPage = (function () {
                function ContentPage() {
                    var _this = this;
                    this._outputDivId = "ContentPageDiv";
                    this._targetObject = null;
                    this._contentText = "";
                    this.initialize = function () {
                        _this.empty();
                        _this.createUIElement();
                        $("#contentTextArea").val(_this._contentText);
                        $("#contentTextArea").change(function () {
                            _this._contentText = $("#contentTextArea").val();
                            _this._targetObject.metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] = _this._contentText;
                            if (_this._onContentChange != null) {
                                _this._onContentChange();
                            }
                        });
                    };
                    this.empty = function () {
                        document.getElementById(_this._outputDivId).innerHTML = '';
                    };
                    this.createUIElement = function () {
                        var htmlOut = "";
                        htmlOut += "<div id='contentGridContainer' align='center'>";
                        htmlOut += "<br />";
                        htmlOut += "<textarea id='contentTextArea' rows = '7' style='width: 100%;overflow-y: scroll;resize: none;'>";
                        htmlOut += "</textarea>";
                        htmlOut + "</div>";
                        document.getElementById(_this._outputDivId).innerHTML = htmlOut;
                    };
                }
                Object.defineProperty(ContentPage.prototype, "outputDivId", {
                    get: function () { return this._outputDivId; },
                    set: function (value) { this._outputDivId = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ContentPage.prototype, "targetObject", {
                    get: function () { return this._targetObject; },
                    set: function (value) {
                        if (this._targetObject != value) {
                            this._targetObject = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ContentPage.prototype, "onContentChange", {
                    set: function (value) {
                        this._onContentChange = null;
                        this._onContentChange = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ContentPage.prototype, "contentText", {
                    get: function () { return this._contentText; },
                    set: function (value) { this._contentText = value; },
                    enumerable: true,
                    configurable: true
                });
                return ContentPage;
            }());
            JavaScript.ContentPage = ContentPage;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var ListTreeNode = (function () {
                function ListTreeNode() {
                    this._isTouchHold = false;
                    this._currentTouchPoint = null;
                    this._touchMoveTolerance = 20;
                    this._isExpanded = false;
                }
                Object.defineProperty(ListTreeNode.prototype, "childNodes", {
                    get: function () {
                        return this._childNodes;
                    },
                    set: function (value) {
                        this._childNodes = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "isExpanded", {
                    get: function () {
                        return this._isExpanded;
                    },
                    set: function (value) {
                        this._isExpanded = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "parentDiv", {
                    get: function () {
                        return this._parentDiv;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "headingDiv", {
                    get: function () {
                        return this._headingDiv;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "headingLabel", {
                    get: function () {
                        return this._headingLabel;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "collapseExpandBtn", {
                    get: function () {
                        return this._collapseExpandBtn;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "contentDiv", {
                    get: function () {
                        return this._contentDiv;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "contextMenu", {
                    set: function (value) {
                        this._contextMenu = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListTreeNode.prototype, "contextMenu_collapseExpandBtn", {
                    set: function (value) {
                        this._contextMenu_collapseExpandBtn = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                ListTreeNode.prototype.createTreeNode = function () {
                    var _this = this;
                    this._parentDiv = document.createElement("div");
                    lt.LTHelper.addClass(this._parentDiv, "panel");
                    lt.LTHelper.addClass(this._parentDiv, "panel-default");
                    this._headingDiv = document.createElement("div");
                    lt.LTHelper.addClass(this._headingDiv, "panel-heading");
                    this._collapseExpandBtn = document.createElement("a");
                    lt.LTHelper.addClass(this._collapseExpandBtn, "accordion-toggle");
                    this._collapseExpandBtn.setAttribute("data-toggle", "collapse");
                    this._collapseExpandBtn.onclick = function (e) { return _this.collapseExpandBtn_Click(e); };
                    this._headingLabel = document.createElement("label");
                    lt.LTHelper.addClass(this._headingLabel, "collapse-expand");
                    lt.LTHelper.addClass(this._headingLabel, "toggleToExpand");
                    this._contentDiv = document.createElement("div");
                    lt.LTHelper.addClass(this._contentDiv, "panel-collapse");
                    lt.LTHelper.addClass(this._contentDiv, "collapse");
                    this._collapseExpandBtn.appendChild(this._headingLabel);
                    this._headingDiv.appendChild(this._collapseExpandBtn);
                    this._parentDiv.appendChild(this._headingDiv);
                    this._parentDiv.appendChild(this._contentDiv);
                    if (this._contextMenu) {
                        if (lt.LTHelper.supportsTouch) {
                            this._headingDiv.addEventListener("touchstart", function (e) { return _this.touchstart(e); }, false);
                            this._headingDiv.addEventListener("touchmove", function (e) { return _this.touchmove(e); }, false);
                            this._headingDiv.addEventListener("touchend", function (e) { return _this.touchend(e); }, false);
                        }
                        else {
                            $(this._headingDiv).bind("contextmenu", $.proxy(this.contextmenu, this));
                        }
                        $(document).bind("click", $.proxy(this.hideContextMenu, this));
                    }
                    this.updateNodeExpansion();
                };
                ListTreeNode.prototype.clearContent = function () {
                    while (this._contentDiv.firstChild) {
                        this._contentDiv.removeChild(this._contentDiv.firstChild);
                    }
                };
                ListTreeNode.prototype.collapseExpandBtn_Click = function (e) {
                    this._isExpanded = !this._isExpanded;
                    this.updateNodeExpansion();
                    this.updateObjectInfoVisibility();
                };
                ListTreeNode.prototype.updateNodeExpansion = function () {
                    if (this._isExpanded) {
                        lt.LTHelper.removeClass(this._headingLabel, "toggleToExpand");
                        lt.LTHelper.addClass(this._headingLabel, "toggleToCollapse");
                        lt.LTHelper.removeClass(this._collapseExpandBtn, "collapsed");
                        lt.LTHelper.addClass(this._contentDiv, "in");
                    }
                    else {
                        lt.LTHelper.removeClass(this._headingLabel, "toggleToCollapse");
                        lt.LTHelper.addClass(this._headingLabel, "toggleToExpand");
                        lt.LTHelper.addClass(this._collapseExpandBtn, "collapsed");
                        lt.LTHelper.removeClass(this._contentDiv, "in");
                    }
                };
                ListTreeNode.prototype.updateObjectInfoVisibility = function () {
                    var objectInfoContainerDiv = this._headingDiv.getElementsByClassName("objectInfoContainer").item(0);
                    if (objectInfoContainerDiv) {
                        var objectNameLabel = objectInfoContainerDiv.getElementsByClassName("objectName").item(0);
                        objectNameLabel.style.visibility = this.isExpanded ? "visible" : "hidden";
                        var dateTimeLabel = objectInfoContainerDiv.getElementsByClassName("dateTime").item(0);
                        dateTimeLabel.style.visibility = this.isExpanded ? "visible" : "hidden";
                    }
                };
                ListTreeNode.prototype.showContextMenu = function (point) {
                    var _this = this;
                    this.onShowContextMenu();
                    this._contextMenu_collapseExpandBtn.children[0].textContent = this._isExpanded ? "Collapse" : "Expand";
                    this._contextMenu_collapseExpandBtn.onclick = null;
                    this._contextMenu_collapseExpandBtn.onclick = function (e) { return _this.contextMenu_collapseExpandBtn_Click(e); };
                    var menus = $(".dropup.clearfix");
                    menus.css("display", "none");
                    if (point != null) {
                        $(this._contextMenu).css({
                            display: "block",
                            left: point.x,
                            top: point.y
                        });
                    }
                };
                ListTreeNode.prototype.onShowContextMenu = function () { };
                ListTreeNode.prototype.contextMenu_collapseExpandBtn_Click = function (e) {
                    this._isExpanded = !this._isExpanded;
                    this.updateNodeExpansion();
                    this.updateObjectInfoVisibility();
                };
                ListTreeNode.prototype.hideContextMenu = function (e) {
                    $(this._contextMenu).hide();
                };
                ListTreeNode.prototype.contextmenu = function (e) {
                    e.preventDefault();
                    var point = lt.LeadPointD.create(e.pageX, e.pageY);
                    this.showContextMenu(point);
                };
                ListTreeNode.prototype.touchstart = function (e) {
                    var _this = this;
                    this._isTouchHold = true;
                    this._currentTouchPoint = lt.LeadPointD.create(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
                    this._touchHoldTimeOutHandler = window.setTimeout(function () {
                        if (_this._isTouchHold) {
                            _this.showContextMenu(_this._currentTouchPoint);
                        }
                    }, 500);
                };
                ListTreeNode.prototype.touchmove = function (e) {
                    var hasShownMenu = $("#annTreeNodeContextMenu").css("display") == "block" || $("#annReviewNodeContextMenu").css("display") == "block";
                    if (hasShownMenu)
                        e.preventDefault();
                    var point = lt.LeadPointD.create(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
                    var dx = point.x - this._currentTouchPoint.x;
                    var dy = point.y - this._currentTouchPoint.y;
                    if (dx > this._touchMoveTolerance || dx < -(this._touchMoveTolerance) || dy > this._touchMoveTolerance || dy < -(this._touchMoveTolerance)) {
                        window.clearTimeout(this._touchHoldTimeOutHandler);
                        this._isTouchHold = false;
                    }
                };
                ListTreeNode.prototype.touchend = function (e) {
                    window.clearTimeout(this._touchHoldTimeOutHandler);
                    this._isTouchHold = false;
                };
                ListTreeNode.BtnChecked = function (btn, check) {
                    check ? btn.addClass("checked") : btn.removeClass("checked");
                };
                return ListTreeNode;
            }());
            JavaScript.ListTreeNode = ListTreeNode;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var AnnObjectTreeNode = (function (_super) {
                __extends(AnnObjectTreeNode, _super);
                function AnnObjectTreeNode(owner, automation, imageViewer, annContainer, annObject) {
                    if (automation == null)
                        throw new Error("automation cannot be null");
                    if (imageViewer == null)
                        throw new Error("imageViewer cannot be null");
                    if (annContainer == null)
                        throw new Error("annContainer cannot be null");
                    if (annObject == null)
                        throw new Error("annObject cannot be null");
                    if (annObject.id == lt.Annotations.Core.AnnObject.selectObjectId || annObject.id == lt.Annotations.Core.AnnObject.none)
                        throw new Error("Cannot create this item with a selection or none annotation object");
                    _super.call(this);
                    this._owner = owner;
                    this._automation = automation;
                    this._imageViewer = imageViewer;
                    this._annContainer = annContainer;
                    this._annObject = annObject;
                    this.contextMenu = document.getElementById("annTreeNodeContextMenu");
                    this.contextMenu_collapseExpandBtn = document.getElementById("annTreeNodeContextMenu_collapseExpand");
                    this._contextMenu_replyBtn = document.getElementById("annTreeNodeContextMenu_reply");
                    this._contextMenu_deleteBtn = document.getElementById("annTreeNodeContextMenu_delete");
                    this._contextMenu_propertiesBtn = document.getElementById("annTreeNodeContextMenu_properties");
                    this.childNodes = new Array();
                    this.createTreeNode();
                    this.customizeTreeNode();
                    this.updateContent();
                    this.hookEvents();
                }
                Object.defineProperty(AnnObjectTreeNode.prototype, "annObject", {
                    get: function () {
                        return this._annObject;
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnObjectTreeNode.createContextMenu = function () {
                    var menuHtml = "";
                    menuHtml += "<div id='annTreeNodeContextMenu' class='dropup clearfix' tabindex='-1' style='display:none;'>";
                    menuHtml += "<ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu' style='display:block;margin-bottom:5px;'>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annTreeNodeContextMenu_collapseExpand' class='menuItem'>";
                    menuHtml += "<span class='text'></span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annTreeNodeContextMenu_reply' class='menuItem'>";
                    menuHtml += "<span class='text'>Reply</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annTreeNodeContextMenu_delete' class='menuItem'>";
                    menuHtml += "<span class='text'>Delete</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annTreeNodeContextMenu_properties' class='menuItem'>";
                    menuHtml += "<span class='text'>Properties</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "</ul>";
                    menuHtml += "</div>";
                    var contextMenu = document.createElement("div");
                    contextMenu.innerHTML = menuHtml;
                    document.body.appendChild(contextMenu);
                };
                AnnObjectTreeNode.prototype.customizeTreeNode = function () {
                    lt.LTHelper.addClass(this.parentDiv, "object-panel");
                    var labelSpan = document.createElement("span");
                    lt.LTHelper.addClass(labelSpan, "annObjectImage");
                    this.headingDiv.appendChild(labelSpan);
                    var objectInfoContainerDiv = document.createElement("div");
                    lt.LTHelper.addClass(objectInfoContainerDiv, "objectInfoContainer");
                    this.headingDiv.appendChild(objectInfoContainerDiv);
                    var userNameLabel = document.createElement("label");
                    lt.LTHelper.addClass(userNameLabel, "userName");
                    var objectNameLabel = document.createElement("label");
                    lt.LTHelper.addClass(objectNameLabel, "objectName");
                    objectNameLabel.style.visibility = "hidden";
                    var dateTimeLabel = document.createElement("label");
                    lt.LTHelper.addClass(dateTimeLabel, "dateTime");
                    dateTimeLabel.style.visibility = "hidden";
                    objectInfoContainerDiv.appendChild(userNameLabel);
                    objectInfoContainerDiv.appendChild(objectNameLabel);
                    objectInfoContainerDiv.appendChild(dateTimeLabel);
                    var annAutomationObject = this._automation.manager.findObjectById(this._annObject.id);
                    if (annAutomationObject != null) {
                        objectNameLabel.textContent = annAutomationObject.name;
                        labelSpan.style.backgroundImage = "url(" + annAutomationObject.toolBarImage + ")";
                    }
                    else {
                        objectNameLabel.textContent = this._annObject.friendlyName;
                        labelSpan.style.backgroundImage = null;
                    }
                    if (this._annObject.metadata[lt.Annotations.Core.AnnObject.authorMetadataKey] != null && this._annObject.metadata[lt.Annotations.Core.AnnObject.authorMetadataKey] != "") {
                        userNameLabel.textContent = this._annObject.metadata[lt.Annotations.Core.AnnObject.authorMetadataKey];
                    }
                    else {
                        userNameLabel.textContent = "[Author]";
                    }
                    if (this._annObject.metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey] != null && this._annObject.metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey] != "") {
                        var date = this._annObject.metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey];
                        dateTimeLabel.textContent = date.substring(0, date.indexOf("GMT"));
                    }
                    else {
                        dateTimeLabel.textContent = "[Date]";
                    }
                    if (!lt.Annotations.Core.AnnTextObject.isInstanceOfType(this._annObject)) {
                        var textareaContainerDiv = document.createElement("div");
                        lt.LTHelper.addClass(textareaContainerDiv, "textareaContainer");
                        this._contentTextArea = document.createElement("textarea");
                        this._contentTextArea.setAttribute("rows", "2");
                        textareaContainerDiv.appendChild(this._contentTextArea);
                        this._contentTextArea.textContent = this._annObject.metadata[lt.Annotations.Core.AnnObject.contentMetadataKey];
                        this.headingDiv.appendChild(textareaContainerDiv);
                    }
                };
                AnnObjectTreeNode.prototype.updateContent = function () {
                    if (this._annObject.reviews.length > 0) {
                        for (var i = 0; i < this._annObject.reviews.length; i++) {
                            var annReview = this._annObject.reviews[i];
                            var reviewNode = this.childNodes.filter(function (node) { return (node.annReview == annReview); })[0];
                            if (reviewNode) {
                                reviewNode.clearContent();
                                this.contentDiv.appendChild(reviewNode.parentDiv);
                                reviewNode.updateContent();
                            }
                            else {
                                reviewNode = new JavaScript.ReviewTreeNode(this._automation, this._annObject, this._annObject.reviews[i], this);
                                this.childNodes.push(reviewNode);
                                this.contentDiv.appendChild(reviewNode.parentDiv);
                                reviewNode.updateContent();
                            }
                        }
                    }
                };
                AnnObjectTreeNode.prototype.hookEvents = function () {
                    var _this = this;
                    this.parentDiv.onmousedown = function (e) { return _this.parentDiv_MouseDown(e); };
                    if (!lt.Annotations.Core.AnnTextObject.isInstanceOfType(this._annObject))
                        this._contentTextArea.onchange = function (e) { return _this.contentTextArea_Change(e); };
                };
                AnnObjectTreeNode.prototype.parentDiv_MouseDown = function (e) {
                    if (e.button != 1) {
                        $(".object-panel>.panel-heading").removeClass("selected");
                        lt.LTHelper.addClass(this.headingDiv, "selected");
                        var invalidRect = lt.LeadRectD.empty;
                        if (this._annObject != null)
                            invalidRect = lt.LeadRectD.unionRects(invalidRect, this._automation.getObjectInvalidateRect(this._annObject));
                        this._automation.activeContainer = this._annContainer;
                        this._automation.selectObject(this._annObject);
                        this._imageViewer.ensureBoundsVisible(invalidRect);
                    }
                };
                AnnObjectTreeNode.prototype.contentTextArea_Change = function (e) {
                    var hasChanged = false;
                    var metadata = this._annObject.metadata;
                    if (metadata[Annotations.Core.AnnObject.contentMetadataKey] || metadata[Annotations.Core.AnnObject.contentMetadataKey] === "") {
                        var newVal = this._contentTextArea.value || "";
                        var oldVal = metadata[Annotations.Core.AnnObject.contentMetadataKey] || "";
                        if (newVal.toLowerCase() !== oldVal.toLowerCase()) {
                            metadata[Annotations.Core.AnnObject.contentMetadataKey] = newVal;
                            hasChanged = true;
                        }
                    }
                    if (hasChanged && this._owner && this._automation) {
                        var modifiedObjects = new Annotations.Core.AnnObjectCollection();
                        modifiedObjects.add(this._annObject);
                        this._owner.beginIgnoreChanged();
                        try {
                            this._automation.invokeAfterObjectChanged(modifiedObjects, Annotations.Automation.AnnObjectChangedType.metadata);
                        }
                        finally {
                            this._owner.endIgnoreChanged();
                        }
                    }
                };
                AnnObjectTreeNode.prototype.selectNode = function (select) {
                    if (select) {
                        lt.LTHelper.addClass(this.headingDiv, "selected");
                    }
                    else {
                        lt.LTHelper.removeClass(this.headingDiv, "selected");
                    }
                };
                AnnObjectTreeNode.prototype.onShowContextMenu = function () {
                    var _this = this;
                    this._contextMenu_deleteBtn.disabled = !this._automation.canDeleteObjects;
                    this._contextMenu_propertiesBtn.disabled = !this._automation.canShowObjectContextMenu;
                    this._contextMenu_replyBtn.onclick = null;
                    this._contextMenu_replyBtn.onclick = function (e) { return _this.contextMenu_replyBtn_Click(e); };
                    this._contextMenu_deleteBtn.onclick = null;
                    this._contextMenu_deleteBtn.onclick = function (e) { return _this.contextMenu_deleteBtn_Click(e); };
                    this._contextMenu_propertiesBtn.onclick = null;
                    this._contextMenu_propertiesBtn.onclick = function (e) { return _this.contextMenu_propertiesBtn_Click(e); };
                };
                AnnObjectTreeNode.prototype.contextMenu_replyBtn_Click = function (e) {
                    var review = new lt.Annotations.Core.AnnReview();
                    review.author = JavaScript.AutomationObjectsListControl.userName;
                    review.date = new Date();
                    review.status = lt.Annotations.Core.AnnReview.reply;
                    this._annObject.reviews.push(review);
                    var reviewNode = new JavaScript.ReviewTreeNode(this._automation, this._annObject, review, this);
                    this.childNodes.push(reviewNode);
                    this.contentDiv.appendChild(reviewNode.parentDiv);
                    reviewNode.updateContent();
                    this.isExpanded = true;
                    this.updateNodeExpansion();
                    this.updateObjectInfoVisibility();
                };
                AnnObjectTreeNode.prototype.contextMenu_deleteBtn_Click = function (e) {
                    this._automation.deleteSelectedObjects();
                };
                AnnObjectTreeNode.prototype.contextMenu_propertiesBtn_Click = function (e) {
                    if (this._automation != null && this._automation.canShowObjectProperties)
                        this._automation.showObjectProperties();
                };
                return AnnObjectTreeNode;
            }(JavaScript.ListTreeNode));
            JavaScript.AnnObjectTreeNode = AnnObjectTreeNode;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var AutomationObjectsListControl = (function () {
                function AutomationObjectsListControl() {
                    this._ignoreChangedCounter = 0;
                    this._pages = new Array();
                    JavaScript.ReviewTreeNode.createContextMenu();
                    JavaScript.AnnObjectTreeNode.createContextMenu();
                }
                Object.defineProperty(AutomationObjectsListControl.prototype, "automation", {
                    get: function () {
                        return this._automation;
                    },
                    set: function (value) {
                        if (this._automation != value) {
                            if (this._automation != null) {
                                this.hookEvents(false);
                                this._pages = new Array();
                            }
                        }
                        this._automation = value;
                        if (this._automation != null)
                            this.hookEvents(true);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationObjectsListControl.prototype, "imageViewer", {
                    get: function () {
                        return this._imageViewer;
                    },
                    set: function (value) {
                        this._imageViewer = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationObjectsListControl.prototype, "listContainerDiv", {
                    get: function () {
                        return this._listContainerDiv;
                    },
                    set: function (value) {
                        this._listContainerDiv = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                AutomationObjectsListControl.prototype.hookEvents = function (hook) {
                    var _this = this;
                    if (hook) {
                        this._automation_AfterObjectChanged = this._automation.afterObjectChanged.add(function (sender, e) { return _this.automation_AfterObjectChanged(sender, e); });
                        this._automationContainers_CollectionChanged = this._automation.containers.collectionChanged.add(function (sender, e) { return _this.automationContainers_CollectionChanged(sender, e); });
                        this._automation_CurrentDesignerChanged = this._automation.currentDesignerChanged.add(function (sender, e) { return _this.automation_CurrentDesignerChanged(sender, e); });
                        this._automation_AfterUndoRedo = this._automation.afterUndoRedo.add(function (sender, e) { return _this.automation_AfterUndoRedo(sender, e); });
                        this._automation_Edit = this._automation.edit.add(function (e) { return _this.automation_Edit(e); });
                    }
                    else {
                        this._automation.afterObjectChanged.remove(this._automation_AfterObjectChanged);
                        this._automation.containers.collectionChanged.remove(this._automationContainers_CollectionChanged);
                        this._automation.currentDesignerChanged.remove(this._automation_CurrentDesignerChanged);
                        this._automation.afterUndoRedo.remove(this._automation_AfterUndoRedo);
                        this._automation.edit.remove(this._automation_Edit);
                    }
                };
                AutomationObjectsListControl.prototype.automationContainers_CollectionChanged = function (sender, e) {
                    this.populate();
                };
                AutomationObjectsListControl.prototype.automation_AfterUndoRedo = function (sender, e) {
                    this.populate();
                };
                AutomationObjectsListControl.prototype.automation_Edit = function (e) {
                    this.populateContainer(this._automation.activeContainer);
                };
                AutomationObjectsListControl.prototype.beginIgnoreChanged = function () {
                    this._ignoreChangedCounter++;
                };
                AutomationObjectsListControl.prototype.endIgnoreChanged = function () {
                    this._ignoreChangedCounter--;
                };
                AutomationObjectsListControl.prototype.automation_AfterObjectChanged = function (sender, e) {
                    if (this._ignoreChangedCounter > 0)
                        return;
                    switch (e.changeType) {
                        case lt.Annotations.Automation.AnnObjectChangedType.added:
                        case lt.Annotations.Automation.AnnObjectChangedType.designerDraw:
                        case lt.Annotations.Automation.AnnObjectChangedType.deleted:
                        case lt.Annotations.Automation.AnnObjectChangedType.modified:
                        case lt.Annotations.Automation.AnnObjectChangedType.metadata:
                            this.populateContainer(this._automation.activeContainer);
                            break;
                        default:
                            break;
                    }
                };
                AutomationObjectsListControl.prototype.automation_CurrentDesignerChanged = function (sender, e) {
                    var editObject = this._automation.currentEditObject;
                    if (editObject != null) {
                        var selectedNodes;
                        if (lt.Annotations.Core.AnnSelectionObject.isInstanceOfType(editObject)) {
                            var selectionObject = editObject;
                            selectedNodes = new Array();
                        }
                        for (var i = 0; i < this._pages.length; i++) {
                            if (this._pages[i].annContainer != this._automation.activeContainer)
                                continue;
                            var annObjectNodes = this._pages[i].childNodes;
                            for (var j = 0; j < annObjectNodes.length; j++) {
                                if (selectionObject == null) {
                                    if (annObjectNodes[j].annObject == editObject) {
                                        annObjectNodes[j].selectNode(true);
                                    }
                                    else {
                                        annObjectNodes[j].selectNode(false);
                                    }
                                }
                                else {
                                    for (var k = 0; k < selectionObject.selectedObjects.count; k++) {
                                        if (annObjectNodes[j].annObject == selectionObject.selectedObjects.item(k)) {
                                            annObjectNodes[j].selectNode(true);
                                            selectedNodes.push(annObjectNodes[j]);
                                        }
                                        else {
                                            var node = selectedNodes.filter(function (node) { return (node.annObject == selectionObject.selectedObjects.item(k)); })[0];
                                            if (!node) {
                                                annObjectNodes[j].selectNode(false);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        $(".object-panel").removeClass("selected");
                    }
                };
                AutomationObjectsListControl.prototype.clear = function () {
                    //debugger;
                    //while (this._listContainerDiv.firstChild) {
                        //this._listContainerDiv.removeChild(this._listContainerDiv.firstChild);
                    //}
                };
                AutomationObjectsListControl.prototype.populate = function () {
                    this.clear();
                    if (this._automation != null) {
                        for (var i = 0; i < this._automation.containers.count; i++) {
                            var container = this._automation.containers.get_item(i);
                            if (container.children.count > 0) {
                                var pageNode = this._pages.filter(function (node) { return (node.annContainer.pageNumber == container.pageNumber); })[0];
                                if (pageNode) {
                                    pageNode.clearContent();
                                    this._listContainerDiv.appendChild(pageNode.parentDiv);
                                    pageNode.updateContent();
                                }
                                else {
                                    pageNode = new JavaScript.PageTreeNode(this, this._automation, this._imageViewer, container);
                                    this._pages.push(pageNode);
                                    this._listContainerDiv.appendChild(pageNode.parentDiv);
                                    pageNode.updateContent();
                                }
                            }
                        }
                    }
                };
                AutomationObjectsListControl.prototype.populateContainer = function (annContainer) {
                    var pageNode = this._pages.filter(function (node) { return (node.annContainer.pageNumber == annContainer.pageNumber); })[0];
                    if (pageNode) {
                        pageNode.clearContent();
                        if (annContainer.children.count > 0) {
                            pageNode.updateContent();
                        }
                        else {
                            var nodeIndex = this._pages.indexOf(pageNode);
                            this._pages.splice(nodeIndex, 1);
                            this._listContainerDiv.removeChild(pageNode.parentDiv);
                        }
                    }
                    else {
                        if (annContainer.children.count > 0) {
                            pageNode = new JavaScript.PageTreeNode(this, this._automation, this._imageViewer, annContainer);
                            pageNode.updateContent();
                            this._pages.push(pageNode);
                            this._pages.sort(function (a, b) { return (a.annContainer.pageNumber - b.annContainer.pageNumber); });
                            var pageAfter = this._pages.filter(function (node) { return (node.annContainer.pageNumber > annContainer.pageNumber); })[0];
                            if (pageAfter) {
                                this._listContainerDiv.insertBefore(pageNode.parentDiv, pageAfter.parentDiv);
                            }
                            else {
                                this._listContainerDiv.appendChild(pageNode.parentDiv);
                            }
                        }
                    }
                };
                return AutomationObjectsListControl;
            }());
            JavaScript.AutomationObjectsListControl = AutomationObjectsListControl;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var PageTreeNode = (function (_super) {
                __extends(PageTreeNode, _super);
                function PageTreeNode(owner, automation, imageViewer, annContainer) {
                    if (automation == null)
                        throw new Error("automation cannot be null");
                    if (imageViewer == null)
                        throw new Error("imageViewer cannot be null");
                    if (annContainer == null)
                        throw new Error("annContainer cannot be null");
                    _super.call(this);
                    this._owner = owner;
                    this._automation = automation;
                    this._imageViewer = imageViewer;
                    this._annContainer = annContainer;
                    this.isExpanded = true;
                    this.createTreeNode();
                    lt.LTHelper.addClass(this.parentDiv, "page-panel");
                    this.headingLabel.textContent = "Page " + annContainer.pageNumber;
                }
                Object.defineProperty(PageTreeNode.prototype, "annContainer", {
                    get: function () {
                        return this._annContainer;
                    },
                    enumerable: true,
                    configurable: true
                });
                PageTreeNode.prototype.updateContent = function () {
                    this.childNodes = new Array();
                    for (var j = 0; j < this._annContainer.children.count; j++) {
                        var annObject = this._annContainer.children.get_item(j);
                        if (annObject.id != lt.Annotations.Core.AnnObject.selectObjectId && annObject.id != lt.Annotations.Core.AnnObject.none) {
                            var annNode = new JavaScript.AnnObjectTreeNode(this._owner, this._automation, this._imageViewer, this._annContainer, annObject);
                            this.childNodes.push(annNode);
                            this.contentDiv.appendChild(annNode.parentDiv);
                            annNode.updateContent();
                        }
                    }
                };
                return PageTreeNode;
            }(JavaScript.ListTreeNode));
            JavaScript.PageTreeNode = PageTreeNode;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var ReviewTreeNode = (function (_super) {
                __extends(ReviewTreeNode, _super);
                function ReviewTreeNode(automation, annObject, annReview, parentTreeNode) {
                    if (automation == null)
                        throw new Error("automation cannot be null");
                    if (annObject == null)
                        throw new Error("annObject cannot be null");
                    if (annObject.id == lt.Annotations.Core.AnnObject.selectObjectId || annObject.id == lt.Annotations.Core.AnnObject.none)
                        throw new Error("Cannot create this item with a selection or none annotation object");
                    _super.call(this);
                    this._automation = automation;
                    this._annObject = annObject;
                    this._annReview = annReview;
                    this._parentTreeNode = parentTreeNode;
                    this.contextMenu = document.getElementById("annReviewNodeContextMenu");
                    this.contextMenu_collapseExpandBtn = document.getElementById("annReviewNodeContextMenu_collapseExpand");
                    this._contextMenu_replyBtn = document.getElementById("annReviewNodeContextMenu_reply");
                    this._contextMenu_checkBtn = document.getElementById("annReviewNodeContextMenu_check");
                    this._contextMenu_addBtn = document.getElementById("annReviewNodeContextMenu_add");
                    this._contextMenu_deleteBtn = document.getElementById("annReviewNodeContextMenu_delete");
                    this._statusBtns = $(".reviewStatus");
                    this.childNodes = new Array();
                    this.createTreeNode();
                    this.customizeTreeNode();
                    this.updateContent();
                    this.hookEvents();
                }
                Object.defineProperty(ReviewTreeNode.prototype, "annReview", {
                    get: function () {
                        return this._annReview;
                    },
                    enumerable: true,
                    configurable: true
                });
                ReviewTreeNode.createContextMenu = function () {
                    var menuHtml = "";
                    menuHtml += "<div id='annReviewNodeContextMenu' class='dropup clearfix' tabindex='-1' style='display:none;'>";
                    menuHtml += "<ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu' style='display:block;margin-bottom:5px;'>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annReviewNodeContextMenu_collapseExpand' class='menuItem'>";
                    menuHtml += "<span class='text'></span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annReviewNodeContextMenu_reply' class='menuItem'>";
                    menuHtml += "<span class='text'>Reply</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='dropdown-submenu'>";
                    menuHtml += "<button class='menuItem'>";
                    menuHtml += "<span class='text'>Set Status</span>";
                    menuHtml += "</button>";
                    menuHtml += "<ul class='dropdown-menu'>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='accepted' value='Accepted' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Accepted</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='cancelled' value='Cancelled' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Cancelled</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='completed' value='Completed' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Completed</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='creted' value='Created' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Created</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='modified' value='Modified' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Modified</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='none' value='None' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>None</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='rejected' value='Rejected' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Rejected</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='reply' value='Reply' class='menuItem reviewStatus'>";
                    menuHtml += "<span class='text'>Reply</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "</ul>";
                    menuHtml += "</li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annReviewNodeContextMenu_check' class='menuItem'>";
                    menuHtml += "<span class='text'></span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annReviewNodeContextMenu_add' class='menuItem'>";
                    menuHtml += "<span class='text'>Add</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "<li class='divider'></li>";
                    menuHtml += "<li>";
                    menuHtml += "<button id='annReviewNodeContextMenu_delete' class='menuItem'>";
                    menuHtml += "<span class='text'>Delete</span>";
                    menuHtml += "</button>";
                    menuHtml += "</li>";
                    menuHtml += "</ul>";
                    var contextMenu = document.createElement("div");
                    contextMenu.innerHTML = menuHtml;
                    document.body.appendChild(contextMenu);
                };
                ReviewTreeNode.prototype.customizeTreeNode = function () {
                    var labelSpan = document.createElement("span");
                    lt.LTHelper.addClass(labelSpan, "annObjectImage");
                    labelSpan.style.backgroundImage = ReviewTreeNode.undoImageUrl;
                    this.headingDiv.appendChild(labelSpan);
                    lt.LTHelper.addClass(this.parentDiv, "review-panel");
                    this._checkedCheckbox = document.createElement("input");
                    this._checkedCheckbox.type = "checkbox";
                    this.headingDiv.appendChild(this._checkedCheckbox);
                    var objectInfoContainerDiv = document.createElement("div");
                    lt.LTHelper.addClass(objectInfoContainerDiv, "objectInfoContainer");
                    this.headingDiv.appendChild(objectInfoContainerDiv);
                    var userNameLabel = document.createElement("label");
                    lt.LTHelper.addClass(userNameLabel, "userName");
                    var objectNameLabel = document.createElement("label");
                    lt.LTHelper.addClass(objectNameLabel, "objectName");
                    objectNameLabel.style.visibility = "hidden";
                    this._dateTimeLabel = document.createElement("label");
                    lt.LTHelper.addClass(this._dateTimeLabel, "dateTime");
                    this._dateTimeLabel.style.visibility = "hidden";
                    objectInfoContainerDiv.appendChild(userNameLabel);
                    objectInfoContainerDiv.appendChild(objectNameLabel);
                    objectInfoContainerDiv.appendChild(this._dateTimeLabel);
                    var annAutomationObject = this._automation.manager.findObjectById(this._annObject.id);
                    if (annAutomationObject != null) {
                        objectNameLabel.textContent = annAutomationObject.name;
                    }
                    else {
                        objectNameLabel.textContent = this._annObject.friendlyName;
                    }
                    if (this._annReview.author != null && this._annReview.author != "") {
                        userNameLabel.textContent = this._annReview.author;
                    }
                    else {
                        userNameLabel.textContent = "[Author]";
                    }
                    this._dateTimeLabel.textContent = this._annReview.status + ": " + this._annReview.date.toLocaleString();
                    var textareaContainerDiv = document.createElement("div");
                    lt.LTHelper.addClass(textareaContainerDiv, "textareaContainer");
                    this._commentTextArea = document.createElement("textarea");
                    this._commentTextArea.setAttribute("rows", "2");
                    textareaContainerDiv.appendChild(this._commentTextArea);
                    this._commentTextArea.textContent = this._annReview.comment;
                    this._checkedCheckbox.checked = this._annReview.isChecked;
                    this.headingDiv.appendChild(textareaContainerDiv);
                };
                ReviewTreeNode.prototype.updateContent = function () {
                    if (this._annReview.replies.length > 0) {
                        for (var i = 0; i < this._annReview.replies.length; i++) {
                            var reply = this._annReview.replies[i];
                            var reviewNode = this.childNodes.filter(function (node) { return (node.annReview == reply); })[0];
                            if (reviewNode) {
                                reviewNode.clearContent();
                                this.contentDiv.appendChild(reviewNode.parentDiv);
                                reviewNode.updateContent();
                            }
                            else {
                                reviewNode = new ReviewTreeNode(this._automation, this._annObject, reply, this);
                                this.childNodes.push(reviewNode);
                                this.contentDiv.appendChild(reviewNode.parentDiv);
                                reviewNode.updateContent();
                            }
                        }
                    }
                };
                ReviewTreeNode.prototype.hookEvents = function () {
                    var _this = this;
                    this._checkedCheckbox.onchange = function (e) { return _this.checkedCheckbox_Change(e); };
                    this._commentTextArea.onchange = function (e) { return _this.commentTextArea_Change(e); };
                };
                ReviewTreeNode.prototype.checkedCheckbox_Change = function (e) {
                    this._annReview.isChecked = this._checkedCheckbox.checked;
                };
                ReviewTreeNode.prototype.commentTextArea_Change = function (e) {
                    this._annReview.comment = this._commentTextArea.value;
                };
                ReviewTreeNode.prototype.onShowContextMenu = function () {
                    var _this = this;
                    this._contextMenu_checkBtn.children[0].textContent = this._annReview.isChecked ? "Uncheck" : "Check";
                    JavaScript.ListTreeNode.BtnChecked(this._statusBtns, false);
                    JavaScript.ListTreeNode.BtnChecked($(document.getElementById(this._annReview.status.toLowerCase())), true);
                    $(this._statusBtns).unbind("click");
                    $(this._statusBtns).bind("click", $.proxy(this.statusBtns_BtnClicked, this));
                    this._contextMenu_replyBtn.onclick = null;
                    this._contextMenu_replyBtn.onclick = function (e) { return _this.contextMenu_replyBtn_Click(e); };
                    this._contextMenu_checkBtn.onclick = null;
                    this._contextMenu_checkBtn.onclick = function (e) { return _this.contextMenu_checkBtn_Click(e); };
                    this._contextMenu_addBtn.onclick = null;
                    this._contextMenu_addBtn.onclick = function (e) { return _this.contextMenu_addBtn_Click(e); };
                    this._contextMenu_deleteBtn.onclick = null;
                    this._contextMenu_deleteBtn.onclick = function (e) { return _this.contextMenu_deleteBtn_Click(e); };
                };
                ReviewTreeNode.prototype.contextMenu_replyBtn_Click = function (e) {
                    var review = new lt.Annotations.Core.AnnReview();
                    review.author = JavaScript.AutomationObjectsListControl.userName;
                    review.date = new Date();
                    review.status = lt.Annotations.Core.AnnReview.reply;
                    this.annReview.replies.push(review);
                    var reviewNode = new ReviewTreeNode(this._automation, this._annObject, review, this);
                    this.childNodes.push(reviewNode);
                    this.contentDiv.appendChild(reviewNode.parentDiv);
                    reviewNode.updateContent();
                    this.isExpanded = true;
                    this.updateNodeExpansion();
                    this.updateObjectInfoVisibility();
                };
                ReviewTreeNode.prototype.contextMenu_checkBtn_Click = function (e) {
                    this._checkedCheckbox.checked = !this._checkedCheckbox.checked;
                    this._annReview.isChecked = this._checkedCheckbox.checked;
                };
                ReviewTreeNode.prototype.contextMenu_addBtn_Click = function (e) {
                    var review = new lt.Annotations.Core.AnnReview();
                    review.author = JavaScript.AutomationObjectsListControl.userName;
                    review.date = new Date();
                    review.status = lt.Annotations.Core.AnnReview.reply;
                    this._annObject.reviews.push(review);
                    var reviewNode = new ReviewTreeNode(this._automation, this._annObject, review, this._parentTreeNode);
                    this._parentTreeNode.childNodes.push(reviewNode);
                    this._parentTreeNode.contentDiv.appendChild(reviewNode.parentDiv);
                    reviewNode.updateContent();
                };
                ReviewTreeNode.prototype.contextMenu_deleteBtn_Click = function (e) {
                    var index = this._parentTreeNode.childNodes.indexOf(this);
                    this._parentTreeNode.childNodes.splice(index, 1);
                    if (JavaScript.AnnObjectTreeNode.isInstanceOfType(this._parentTreeNode)) {
                        this._parentTreeNode.annObject.reviews.splice(index, 1);
                    }
                    else if (ReviewTreeNode.isInstanceOfType(this._parentTreeNode)) {
                        this._parentTreeNode.annReview.replies.splice(index, 1);
                    }
                    this._parentTreeNode.contentDiv.removeChild(this.parentDiv);
                };
                ReviewTreeNode.prototype.statusBtns_BtnClicked = function (e) {
                    this._annReview.status = $(e.currentTarget).val();
                    JavaScript.ListTreeNode.BtnChecked(this._statusBtns, false);
                    JavaScript.ListTreeNode.BtnChecked($(document.getElementById(this._annReview.status.toLowerCase())), true);
                    this._dateTimeLabel.textContent = this._annReview.status + ": " + this._annReview.date.toLocaleString();
                };
                return ReviewTreeNode;
            }(JavaScript.ListTreeNode));
            JavaScript.ReviewTreeNode = ReviewTreeNode;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var AutomationTextArea = (function () {
                function AutomationTextArea(parent, automation, editTextEvent, removeAction) {
                    var _this = this;
                    this.textAreaElement_FocusOut = function (e) {
                        if (_this._removeAction != null)
                            _this._removeAction(true);
                    };
                    this.viewer_GotFocus = function (sender, e) {
                        if (_this._removeAction != null)
                            _this._removeAction(true);
                    };
                    if (parent == null)
                        throw new Error("parent passed as null");
                    if (editTextEvent == null)
                        throw new Error("editTextEvent passed as null");
                    this.textObject = editTextEvent.textObject;
                    if (this.textObject == null)
                        throw new Error("No annotation text object was found in the event");
                    this._removeAction = removeAction;
                    this._automation = automation;
                    this._textAreaElement = document.createElement("textArea");
                    this._textAreaElement.style.left = editTextEvent.bounds.left + 'px';
                    this._textAreaElement.style.top = editTextEvent.bounds.top + 'px';
                    this._textAreaElement.style.position = 'absolute';
                    this._textAreaElement.style.zIndex = '100';
                    this._textAreaElement.style.height = editTextEvent.bounds.height + 'px';
                    this._textAreaElement.style.width = editTextEvent.bounds.width + 'px';
                    this._textAreaElement.value = editTextEvent.textObject.text;
                    this._textAreaElement.style.color = editTextEvent.textObject.textForeground.color;
                    this._textAreaElement.style.fontFamily = editTextEvent.textObject.font.fontFamilyName;
                    this._textAreaElement.style.fontSize = editTextEvent.textObject.font.fontSize + 'pt';
                    this._textAreaElement.wrap = "off";
                    parent.appendChild(this._textAreaElement);
                    this._textAreaElement.focus();
                    this._textAreaElement.addEventListener("focusout", this.textAreaElement_FocusOut);
                    this._textAreaElement.onkeydown = function (e) { return _this.textAreaElement_KeyDown(e); };
                    var imageViewerAutomationControl = this._automation.automationControl;
                    imageViewerAutomationControl.imageViewer.interactiveService.tap.add(function (sender, e) { return _this.viewer_GotFocus(sender, e); });
                }
                AutomationTextArea.prototype.remove = function (update) {
                    this._removeAction = null;
                    if (update)
                        this.updateTextObject();
                    var parent = this._textAreaElement.parentElement;
                    if (parent != null) {
                        this._textAreaElement.parentElement.removeChild(this._textAreaElement);
                        this._textAreaElement = null;
                        parent.focus();
                    }
                };
                AutomationTextArea.prototype.updateTextObject = function () {
                    if (this.textObject == null)
                        return;
                    this.textObject.text = this._textAreaElement.value;
                    if (this._automation != null) {
                        var annObjects = new lt.Annotations.Core.AnnObjectCollection();
                        annObjects.add(this.textObject);
                        this._automation.invokeObjectModified(annObjects, lt.Annotations.Automation.AnnObjectChangedType.text);
                        this._automation.invokeAfterObjectChanged(annObjects, lt.Annotations.Automation.AnnObjectChangedType.text);
                    }
                    this._automation.invalidate(lt.LeadRectD.empty);
                };
                AutomationTextArea.prototype.textAreaElement_KeyDown = function (e) {
                    if (this._removeAction != null && e.keyCode == 27)
                        this._removeAction(false);
                    if (e.ctrlKey && e.keyCode == 13) {
                        if (this._removeAction != null)
                            this._removeAction(true);
                    }
                };
                return AutomationTextArea;
            }());
            JavaScript.AutomationTextArea = AutomationTextArea;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var TreeView = (function () {
                function TreeView(divID) {
                    this._selectedNode = null;
                    this._nodes = [];
                    this.childNodesDiv = document.createElement("div");
                    this.mainDiv = document.getElementById(divID);
                    this.mainDiv.appendChild(this.childNodesDiv);
                }
                Object.defineProperty(TreeView.prototype, "selectedNode", {
                    get: function () { return this._selectedNode; },
                    set: function (value) {
                        if (this._selectedNode != null)
                            this._selectedNode.isSelected = false;
                        this._selectedNode = value;
                        if (this._selectedNode != null)
                            this._selectedNode.isSelected = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeView.prototype, "nodes", {
                    get: function () { return this._nodes; },
                    set: function (value) { this._nodes = value; },
                    enumerable: true,
                    configurable: true
                });
                TreeView.prototype.addNode = function (node) {
                    node.parentDiv = this.mainDiv;
                    node.parent = null;
                    this.childNodesDiv.appendChild(node.mainDiv);
                    this._nodes.push(node);
                };
                TreeView.prototype.deleteNode = function (node) {
                    this.childNodesDiv.removeChild(node.mainDiv);
                    var index = this._nodes.indexOf(node, 0);
                    if (index != undefined) {
                        this._nodes.splice(index, 1);
                    }
                    this.selectedNode = null;
                };
                TreeView.prototype.updateUIElements = function () {
                };
                return TreeView;
            }());
            JavaScript.TreeView = TreeView;
            var TreeNode = (function () {
                function TreeNode(treeView) {
                    var _this = this;
                    this.isCollapsed = true;
                    this._isSelected = false;
                    this._nodes = [];
                    this.contentDiv = document.createElement("div");
                    this.childNodesDiv = document.createElement("div");
                    $(this.childNodesDiv).hide();
                    this.collapseLabel = document.createElement("label");
                    this.collapseLabel.textContent = "+";
                    this.collapseLabel.style.cssFloat = "left";
                    this.collapseLabel.style.fontSize = "large";
                    this.collapseLabel.style.marginRight = "3px";
                    this.collapseLabel.addEventListener("click", function (ev) { return _this.collapseLabel_Click(ev); });
                    this.mainDiv = document.createElement("div");
                    this.mainDiv.className = this.mainDiv.className + "treeNode";
                    this.mainDiv.appendChild(this.collapseLabel);
                    this.mainDiv.appendChild(this.contentDiv);
                    this.mainDiv.appendChild(this.childNodesDiv);
                    this.mainDiv.addEventListener("click", function (ev) { return _this.mainDiv_Click(ev); }, true);
                    this.treeView = treeView;
                }
                Object.defineProperty(TreeNode.prototype, "isSelected", {
                    get: function () { return this._isSelected; },
                    set: function (value) {
                        this._isSelected = value;
                        if (this._isSelected == true) {
                            this.contentDiv.style.background = "#39aac3";
                        }
                        else {
                            this.contentDiv.style.background = "transparent";
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeNode.prototype, "nodes", {
                    get: function () { return this._nodes; },
                    set: function (value) { this._nodes = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeNode.prototype, "tag", {
                    get: function () { return this._tag; },
                    set: function (value) { this._tag = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeNode.prototype, "content", {
                    get: function () { return this._content; },
                    set: function (value) {
                        this._content = value;
                        while (this.contentDiv.firstChild) {
                            this.contentDiv.removeChild(this.contentDiv.firstChild);
                        }
                        this.contentDiv.appendChild(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                TreeNode.prototype.mainDiv_Click = function (ev) {
                    this.treeView.selectedNode = this;
                    if (this.treeView.onSelectionChanged != null) {
                        this.treeView.onSelectionChanged(ev);
                    }
                };
                TreeNode.prototype.collapseLabel_Click = function (ev) {
                    this.isCollapsed = !this.isCollapsed;
                    if (this.isCollapsed) {
                        this.collapseLabel.textContent = "+";
                        $(this.childNodesDiv).hide();
                    }
                    else {
                        this.collapseLabel.textContent = "-";
                        $(this.childNodesDiv).show();
                    }
                };
                TreeNode.prototype.addNode = function (node) {
                    node.parentDiv = this.mainDiv;
                    node.parent = this;
                    this.childNodesDiv.appendChild(node.mainDiv);
                    this._nodes.push(node);
                };
                TreeNode.prototype.deleteNode = function (node) {
                    this.childNodesDiv.removeChild(node.mainDiv);
                    var index = this._nodes.indexOf(node, 0);
                    if (index != undefined) {
                        this._nodes.splice(index, 1);
                    }
                    this.treeView.selectedNode = null;
                };
                return TreeNode;
            }());
            JavaScript.TreeNode = TreeNode;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var MediaPlayerDialog = (function () {
                function MediaPlayerDialog() {
                    this.dialogUI = {
                        dialog: "#mediaPlayerDialog",
                        OkBtn: "#mediaPlayerDlg_OK",
                        dialogNameLable: "#mediaDialogName",
                        videoObject: "videoObject"
                    };
                    this.Init();
                }
                MediaPlayerDialog.prototype.Init = function () {
                    $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
                };
                MediaPlayerDialog.prototype.show = function (source1, source2, source3) {
                    if ((source1 == "" && source1 == null) && (source2 == "" && source2 == null) && (source3 == "" && source3 == null))
                        return;
                    $(this.dialogUI.dialogNameLable).text("Media Player");
                    $(this.dialogUI.dialog).modal();
                    this._videoElement = document.getElementById(this.dialogUI.videoObject);
                    if (typeof (this._videoElement.play) != "function") {
                        this._videoElement.innerHTML = "Your browser does not support HTML5 video.";
                    }
                    else {
                        this._sourceElement1 = document.createElement("source");
                        this._sourceElement1.src = source1;
                        this._sourceElement2 = document.createElement("source");
                        this._sourceElement2.src = source2;
                        this._sourceElement3 = document.createElement("source");
                        this._sourceElement3.src = source3;
                        this._videoElement.appendChild(this._sourceElement1);
                        this._videoElement.appendChild(this._sourceElement2);
                        this._videoElement.appendChild(this._sourceElement3);
                        this._videoElement.load();
                        this._videoElement.play();
                    }
                };
                Object.defineProperty(MediaPlayerDialog.prototype, "videoElement", {
                    get: function () {
                        return this._videoElement;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MediaPlayerDialog.prototype, "OkClick", {
                    set: function (value) {
                        this._OkClick = null;
                        this._OkClick = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                MediaPlayerDialog.prototype.OkBtn_Click = function (e) {
                    if (this._videoElement != null) {
                        this._videoElement.pause();
                        this._videoElement.removeChild(this._sourceElement1);
                        this._videoElement.removeChild(this._sourceElement2);
                        this._videoElement.removeChild(this._sourceElement3);
                    }
                    if (this._OkClick != null) {
                        this._OkClick();
                    }
                    $(this.dialogUI.dialog).modal("hide");
                };
                return MediaPlayerDialog;
            }());
            JavaScript.MediaPlayerDialog = MediaPlayerDialog;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var norbergObjectId = -1008;
            var AnnColorEditor = (function () {
                function AnnColorEditor(color, category) {
                    this._properties = null;
                    this._category = category;
                    this.value = color;
                }
                Object.defineProperty(AnnColorEditor.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnColorEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnColorEditor.prototype, "value", {
                    get: function () { return this._color; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._color, value);
                        this._color = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnColorEditor;
            }());
            JavaScript.AnnColorEditor = AnnColorEditor;
            var AnnBooleanEditor = (function () {
                function AnnBooleanEditor(value, category) {
                    this._properties = null;
                    this._value = value;
                    this._category = category;
                }
                Object.defineProperty(AnnBooleanEditor.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnBooleanEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnBooleanEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnBooleanEditor;
            }());
            JavaScript.AnnBooleanEditor = AnnBooleanEditor;
            var AnnLengthEditor = (function () {
                function AnnLengthEditor(annLength, category, propertyName, displayName) {
                    var _this = this;
                    this._properties = {};
                    this.info_ValueChanged = function (oldValue, newValue) {
                        _this._annLength.value = newValue;
                        _this.onValueChanged(oldValue, newValue);
                    };
                    this._annLength = annLength;
                    this._category = category;
                    var info = new JavaScript.AnnPropertyInfo(propertyName, false, annLength.get_value(), category, "Length", displayName, true, AnnDoubleEditor);
                    info.valueChanged = this.info_ValueChanged;
                    this._properties[propertyName] = info;
                }
                Object.defineProperty(AnnLengthEditor.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnLengthEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnLengthEditor;
            }());
            JavaScript.AnnLengthEditor = AnnLengthEditor;
            var AnnSolidColorBrushEditor = (function () {
                function AnnSolidColorBrushEditor(annSolidColorBrush, category, propertyName, displayName) {
                    var _this = this;
                    this._properties = {};
                    this._annSolidColorBrush = null;
                    this.info_ValueChanged = function (oldValue, newValue) {
                        if (_this._annSolidColorBrush != null) {
                            _this._annSolidColorBrush.color = newValue;
                        }
                        if (_this.onValueChanged != null) {
                            _this.onValueChanged(oldValue, newValue);
                        }
                    };
                    this._annSolidColorBrush = annSolidColorBrush;
                    this._category = category;
                    var info;
                    if (annSolidColorBrush != null) {
                        info = new JavaScript.AnnPropertyInfo(propertyName, false, annSolidColorBrush.get_color(), category, "Color", displayName, true, AnnColorEditor);
                    }
                    else {
                        info = new JavaScript.AnnPropertyInfo(propertyName, false, "transparent", category, "Color", displayName, true, AnnColorEditor);
                    }
                    info.valueChanged = this.info_ValueChanged;
                    this._properties[propertyName] = info;
                }
                Object.defineProperty(AnnSolidColorBrushEditor.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnSolidColorBrushEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnSolidColorBrushEditor;
            }());
            JavaScript.AnnSolidColorBrushEditor = AnnSolidColorBrushEditor;
            var AnnDoubleEditor = (function () {
                function AnnDoubleEditor(value, category) {
                    this._properties = null;
                    this._value = 0;
                    this._category = category;
                    this.value = value;
                }
                Object.defineProperty(AnnDoubleEditor.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnDoubleEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnDoubleEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnDoubleEditor;
            }());
            JavaScript.AnnDoubleEditor = AnnDoubleEditor;
            var AnnStringEditor = (function () {
                function AnnStringEditor(value, category) {
                    this._properties = null;
                    this._value = "";
                    this._category = category;
                    this.value = value;
                }
                Object.defineProperty(AnnStringEditor.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnStringEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnStringEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnStringEditor;
            }());
            JavaScript.AnnStringEditor = AnnStringEditor;
            var AnnPictureEditor = (function () {
                function AnnPictureEditor(value, category) {
                    this._properties = null;
                    this._value = lt.Annotations.Core.AnnPicture.empty;
                    this._category = category;
                    this.value = value;
                }
                Object.defineProperty(AnnPictureEditor.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPictureEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnPictureEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnPictureEditor;
            }());
            JavaScript.AnnPictureEditor = AnnPictureEditor;
            var AnnMediaEditor = (function () {
                function AnnMediaEditor(value, category) {
                    this._properties = null;
                    this._value = new lt.Annotations.Core.AnnMedia();
                    this._category = category;
                    this.value = value;
                }
                Object.defineProperty(AnnMediaEditor.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnMediaEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnMediaEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnMediaEditor;
            }());
            JavaScript.AnnMediaEditor = AnnMediaEditor;
            var AnnIntegerEditor = (function () {
                function AnnIntegerEditor(value, category) {
                    this._properties = null;
                    this._value = 0;
                    this._category = category;
                    this.value = value;
                }
                Object.defineProperty(AnnIntegerEditor.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnIntegerEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnIntegerEditor.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (value) {
                        if (this.onValueChanged != null)
                            this.onValueChanged(this._value, value);
                        this._value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnIntegerEditor;
            }());
            JavaScript.AnnIntegerEditor = AnnIntegerEditor;
            var AnnStrokeEditor = (function () {
                function AnnStrokeEditor(annStroke, category) {
                    var _this = this;
                    this._properties = {};
                    this.strokePropertyInfo_ValueChanged = function (oldValue, newValue) {
                        if (_this.onValueChanged != null) {
                            _this.onValueChanged(oldValue, newValue);
                        }
                    };
                    this._category = category;
                    var strokePropertyInfo = new JavaScript.AnnPropertyInfo("Stroke", false, annStroke.get_stroke(), category, "Stroke", "", true, AnnSolidColorBrushEditor);
                    strokePropertyInfo.valueChanged = this.strokePropertyInfo_ValueChanged;
                    this._properties["Stroke"] = strokePropertyInfo;
                    var thicknessPropertyInfo = new JavaScript.AnnPropertyInfo("Thickness", false, annStroke.get_strokeThickness(), category, "Thickness", "", true, AnnLengthEditor);
                    thicknessPropertyInfo.valueChanged = this.strokePropertyInfo_ValueChanged;
                    this._properties["Thickness"] = thicknessPropertyInfo;
                }
                Object.defineProperty(AnnStrokeEditor.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnStrokeEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnStrokeEditor;
            }());
            JavaScript.AnnStrokeEditor = AnnStrokeEditor;
            var AnnFontEditor = (function () {
                function AnnFontEditor(annFont, category) {
                    var _this = this;
                    this._properties = {};
                    this._annFont = null;
                    this.fontSize_ValueChanged = function (oldValue, newValue) {
                        _this._annFont.fontSize = newValue;
                    };
                    this.fontFamilyName_ValueChanged = function (oldValue, newValue) {
                        _this._annFont.fontFamilyName = newValue;
                        _this.onValueChanged(oldValue, newValue);
                    };
                    this._category = category;
                    this._annFont = annFont;
                    var fontFamilyNameInfo = new JavaScript.AnnPropertyInfo("", false, annFont.get_fontFamilyName(), category, "Stroke", "Family Name", true, AnnStringEditor);
                    fontFamilyNameInfo.valueChanged = this.fontFamilyName_ValueChanged;
                    fontFamilyNameInfo.values["Arial"] = "Arial";
                    fontFamilyNameInfo.values["Courier New"] = "Courier New";
                    fontFamilyNameInfo.values["Times New Roman"] = "Times New Roman";
                    fontFamilyNameInfo.values["Verdana"] = "Verdana";
                    var fontSize = new JavaScript.AnnPropertyInfo("", false, annFont.get_fontSize(), category, "FontSize", "Size in Points", true, AnnDoubleEditor);
                    fontSize.values["8"] = 8;
                    fontSize.values["10"] = 10;
                    fontSize.values["11"] = 11;
                    fontSize.values["12"] = 12;
                    fontSize.values["13"] = 13;
                    fontSize.values["14"] = 14;
                    fontSize.values["16"] = 16;
                    fontSize.values["18"] = 18;
                    fontSize.values["20"] = 20;
                    fontSize.valueChanged = this.fontSize_ValueChanged;
                    this._properties["FontFamilyName"] = fontFamilyNameInfo;
                    this._properties["FontSize"] = fontSize;
                }
                Object.defineProperty(AnnFontEditor.prototype, "category", {
                    get: function () {
                        return this._category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnnFontEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnnFontEditor;
            }());
            JavaScript.AnnFontEditor = AnnFontEditor;
            var AnnObjectEditor = (function () {
                function AnnObjectEditor(annObject) {
                    var _this = this;
                    this._properties = {};
                    this.wordWrapInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(_this._annObject)) {
                            var annTextObject = _this._annObject;
                            annTextObject.set_wordWrap(_this.properties["WordWrap"].values[newValue]);
                        }
                    };
                    this.pictureInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnStampObject.isInstanceOfType(_this._annObject)) {
                            var annStampObject = _this._annObject;
                            annStampObject.set_picture(newValue);
                        }
                        if (lt.Annotations.Core.AnnHotspotObject.isInstanceOfType(_this._annObject)) {
                            var annHotspotObject = _this._annObject;
                            annHotspotObject.set_picture(newValue);
                        }
                        if (lt.Annotations.Core.AnnFreehandHotspotObject.isInstanceOfType(_this._annObject)) {
                            var annFreehandHotspotObject = _this._annObject;
                            annFreehandHotspotObject.set_picture(newValue);
                        }
                    };
                    this.hyperlink_ValueChanged = function (oldValue, newValue) {
                        if (_this._annObject != null) {
                            _this._annObject.set_hyperlink(newValue);
                        }
                    };
                    this.showPictureInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPointObject.isInstanceOfType(_this._annObject)) {
                            var annPointObject = _this._annObject;
                            annPointObject.set_showPicture(_this.properties["ShowPicture"].values[newValue]);
                        }
                    };
                    this.expandedInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextRollupObject.isInstanceOfType(_this._annObject)) {
                            var annTextRollup = _this._annObject;
                            annTextRollup.set_expanded(_this.properties["Expanded"].values[newValue]);
                        }
                    };
                    this.fillPropertyInfo_ValueChanged = function (oldValue, newValue) {
                        if (newValue != null) {
                            if (_this._annObject != null) {
                                if (lt.Annotations.Core.AnnHiliteObject.isInstanceOfType(_this._annObject)) {
                                    var annHiliteObject = _this._annObject;
                                    annHiliteObject.set_hiliteColor(newValue);
                                }
                                else {
                                    _this._annObject.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create(newValue));
                                }
                            }
                        }
                    };
                    this.strokePropertyInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(_this._annObject)) {
                            var annPolyRulerObject = _this._annObject;
                            annPolyRulerObject.set_tickMarksStroke(annPolyRulerObject.stroke);
                        }
                    };
                    this.ruberStampTypeinfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnRubberStampObject.isInstanceOfType(_this._annObject)) {
                            var annRubberStampObject = _this._annObject;
                            annRubberStampObject.set_rubberStampType(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnRubberStampType, "Stamp" + _this.properties["RuberStampType"].values[newValue]));
                        }
                        if (lt.Annotations.Core.AnnSelectionObject.isInstanceOfType(_this._annObject)) {
                            var annSelectionObject = _this._annObject;
                            annSelectionObject.applyProperties();
                            for (var i = 0; i < annSelectionObject.get_selectedObjects().count; i++) {
                                var ruler = annSelectionObject.get_selectedObjects().item(i);
                                if (ruler != null) {
                                    ruler.set_stroke(annSelectionObject.get_stroke());
                                    ruler.set_tickMarksStroke(annSelectionObject.get_stroke());
                                }
                            }
                        }
                    };
                    this.acuteInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnProtractorObject.isInstanceOfType(_this._annObject)) {
                            var annProtractorObject = _this._annObject;
                            annProtractorObject.set_acute(_this.properties["Acute"].values[newValue]);
                        }
                    };
                    this.fixedPointerInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextPointerObject.isInstanceOfType(_this._annObject)) {
                            var annTextPointerObject = _this._annObject;
                            annTextPointerObject.set_fixedPointer(_this.properties["FixedPointer"].values[newValue]);
                        }
                    };
                    this.anglePrecisionInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnProtractorObject.isInstanceOfType(_this._annObject)) {
                            var annProtractorObject = _this._annObject;
                            annProtractorObject.set_anglePrecision(_this.properties["AnglePrecision"].values[newValue]);
                        }
                    };
                    this.precisionInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(_this._annObject)) {
                            var annPolyRulerObject = _this._annObject;
                            annPolyRulerObject.set_precision(_this.properties["Precision"].values[newValue]);
                        }
                    };
                    this.angularUnitInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnProtractorObject.isInstanceOfType(_this._annObject)) {
                            var annProtractorObject = _this._annObject;
                            annProtractorObject.set_angularUnit(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnAngularUnit, _this.properties["AngularUnit"].values[newValue]));
                        }
                    };
                    this.showTickMarksInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(_this._annObject)) {
                            var annPolyRulerObject = _this._annObject;
                            annPolyRulerObject.set_showTickMarks(_this.properties["ShowTickMarks"].values[newValue]);
                        }
                    };
                    this.measurementUnitInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(_this._annObject)) {
                            var annPolyRulerObject = _this._annObject;
                            annPolyRulerObject.set_measurementUnit(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnUnit, _this.properties["MeasurementUnit"].values[newValue]));
                        }
                    };
                    this.showGauge_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(_this._annObject)) {
                            var annPolyRulerObject = _this._annObject;
                            annPolyRulerObject.set_showGauge(_this.properties["ShowGauge"].values[newValue]);
                        }
                    };
                    this.tensionInfo_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnCurveObject.isInstanceOfType(_this._annObject)) {
                            var curve = _this._annObject;
                            var tenstion = newValue;
                            if (tenstion < 0) {
                                tenstion = 0;
                                alert("set value between 0 and 1");
                            }
                            else if (tenstion > 1) {
                                tenstion = 1;
                                alert("set value between 0 and 1");
                            }
                            curve.tension = tenstion;
                        }
                    };
                    this.horizontalAlignment_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(_this._annObject)) {
                            var annTextObject = _this._annObject;
                            annTextObject.set_horizontalAlignment(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnHorizontalAlignment, _this.properties["HorizontalAlignment"].values[newValue]));
                        }
                    };
                    this.verticalAlignment_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(_this._annObject)) {
                            var annTextObject = _this._annObject;
                            annTextObject.set_verticalAlignment(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnVerticalAlignment, _this.properties["VerticalAlignment"].values[newValue]));
                        }
                    };
                    this.text_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(_this._annObject)) {
                            var annTextObject = _this._annObject;
                            annTextObject.set_text(newValue);
                        }
                    };
                    this.media_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnMediaObject.isInstanceOfType(_this._annObject)) {
                            var annVideoObject = _this._annObject;
                            annVideoObject.set_media(newValue);
                        }
                    };
                    this.encryptKey_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnEncryptObject.isInstanceOfType(_this._annObject)) {
                            var annEncryptObject = _this._annObject;
                            annEncryptObject.set_key(newValue);
                        }
                    };
                    this.encryptor_ValueChanged = function (oldValue, newValue) {
                        if (lt.Annotations.Core.AnnEncryptObject.isInstanceOfType(_this._annObject)) {
                            var annEncryptObject = _this._annObject;
                            annEncryptObject.set_encryptor(_this.properties["Encryptor"].values[newValue]);
                        }
                    };
                    this._annObject = annObject;
                    if (annObject.get_supportsFill() && !(lt.Annotations.Core.AnnHotspotObject.isInstanceOfType(annObject))) {
                        var fill = null;
                        if (lt.Annotations.Core.AnnHiliteObject.isInstanceOfType(annObject)) {
                            var annHiliteObject = annObject;
                            fill = lt.Annotations.Core.AnnSolidColorBrush.create(annHiliteObject.get_hiliteColor());
                            var fillPropertyInfo = new JavaScript.AnnPropertyInfo("Hilite", false, fill, "Hilite", "Hilite the object", "", annObject.get_supportsFill(), AnnSolidColorBrushEditor);
                            fillPropertyInfo.valueChanged = this.fillPropertyInfo_ValueChanged;
                        }
                        else {
                            fill = annObject.get_fill();
                            if (fill == null) {
                                annObject.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create("Transparent"));
                                fill = annObject.get_fill();
                            }
                            var fillPropertyInfo = new JavaScript.AnnPropertyInfo("Fill", false, fill, "Fill", "Fill the object", "", annObject.get_supportsFill(), AnnSolidColorBrushEditor);
                            fillPropertyInfo.valueChanged = this.fillPropertyInfo_ValueChanged;
                        }
                        this._properties["Fill"] = fillPropertyInfo;
                    }
                    if (annObject.get_supportsStroke() && !(lt.Annotations.Core.AnnHotspotObject.isInstanceOfType(annObject))) {
                        var strokePropertyInfo = new JavaScript.AnnPropertyInfo("Stroke", false, annObject.get_stroke(), "Stroke", "Stroke the object", "", annObject.get_supportsStroke(), AnnStrokeEditor);
                        strokePropertyInfo.valueChanged = this.strokePropertyInfo_ValueChanged;
                        this._properties["Stroke"] = strokePropertyInfo;
                    }
                    if (annObject.get_supportsFont()) {
                        this._properties["Font"] = new JavaScript.AnnPropertyInfo("", false, annObject.get_font(), "Font", "Select Font", "", annObject.get_supportsFont(), AnnFontEditor);
                    }
                    var hyperlink = new JavaScript.AnnPropertyInfo("", false, annObject.get_hyperlink(), "Hyperlink", "Hyperlink", "Hyperlink", true, AnnStringEditor);
                    hyperlink.valueChanged = this.hyperlink_ValueChanged;
                    this._properties["Hyperlink"] = hyperlink;
                    if (lt.Annotations.Core.AnnCurveObject.isInstanceOfType(annObject)) {
                        var closedCurveObject = annObject;
                        var tensionInfo;
                        if (closedCurveObject != null) {
                            tensionInfo = new JavaScript.AnnPropertyInfo("", false, closedCurveObject.get_tension(), "Curve", "Tension", "Tension", true, AnnDoubleEditor);
                        }
                        else {
                            var curveObject = annObject;
                            tensionInfo = new JavaScript.AnnPropertyInfo("", false, curveObject.get_tension(), "Curve", "Tension", "Tension", true, AnnDoubleEditor);
                        }
                        tensionInfo.valueChanged = (this.tensionInfo_ValueChanged);
                        this._properties["Tension"] = tensionInfo;
                    }
                    if (lt.Annotations.Core.AnnPolyRulerObject.isInstanceOfType(annObject) && this._annObject.id != norbergObjectId) {
                        var annPolyRulerObject = annObject;
                        var showGauge = new JavaScript.AnnPropertyInfo("", false, annPolyRulerObject.get_showGauge(), "Ruler", "ShowGauge", "Show Gauge", true, AnnBooleanEditor);
                        showGauge.values["True"] = true;
                        showGauge.values["False"] = false;
                        showGauge.valueChanged = this.showGauge_ValueChanged;
                        this._properties["ShowGauge"] = showGauge;
                        var gaugeLengthInfo = new JavaScript.AnnPropertyInfo("GaugeLength", false, annPolyRulerObject.get_gaugeLength(), "Ruler", "GaugeLength", "Gauge Length", true, AnnLengthEditor);
                        this._properties["GaugeLength"] = gaugeLengthInfo;
                        var tickMarksLengthInfo = new JavaScript.AnnPropertyInfo("TickMarksLength", false, annPolyRulerObject.get_tickMarksLength(), "Ruler", "TickMarksLength", "TickMarks Length", true, AnnLengthEditor);
                        this._properties["TickMarksLength"] = tickMarksLengthInfo;
                        var measurementUnit = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnUnit, annPolyRulerObject.get_measurementUnit());
                        var measurementUnitInfo = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, measurementUnit, "Ruler", "Measurement Unit", "Measurement Unit", true, AnnStringEditor);
                        measurementUnitInfo.valueChanged = this.measurementUnitInfo_ValueChanged;
                        this.fillEnumValue(measurementUnitInfo, lt.Annotations.Core.AnnUnit);
                        this._properties["MeasurementUnit"] = measurementUnitInfo;
                        var precisionInfo = new JavaScript.AnnPropertyInfo("", false, annPolyRulerObject.get_precision(), "Ruler", "Precision", "Precision", true, AnnStringEditor);
                        precisionInfo.values["0"] = 0;
                        precisionInfo.values["1"] = 1;
                        precisionInfo.values["2"] = 2;
                        precisionInfo.values["3"] = 3;
                        precisionInfo.values["4"] = 4;
                        precisionInfo.values["5"] = 5;
                        precisionInfo.values["6"] = 6;
                        precisionInfo.valueChanged = this.precisionInfo_ValueChanged;
                        this._properties["Precision"] = precisionInfo;
                        var showTickMarksInfo = new JavaScript.AnnPropertyInfo("", false, annPolyRulerObject.get_showTickMarks(), "Ruler", "ShowTickMarks", "Show Tick Marks", true, AnnBooleanEditor);
                        showTickMarksInfo.values["True"] = true;
                        showTickMarksInfo.values["False"] = false;
                        showTickMarksInfo.valueChanged = this.showTickMarksInfo_ValueChanged;
                        this._properties["ShowTickMarks"] = showTickMarksInfo;
                    }
                    if (lt.Annotations.Core.AnnProtractorObject.isInstanceOfType(annObject)) {
                        var annProtractorObject = annObject;
                        var acuteInfo = new JavaScript.AnnPropertyInfo("", false, annProtractorObject.get_acute(), "Protractor", "Acute", "Acute", true, AnnStringEditor);
                        acuteInfo.values["True"] = true;
                        acuteInfo.values["False"] = false;
                        acuteInfo.valueChanged = this.acuteInfo_ValueChanged;
                        this._properties["Acute"] = acuteInfo;
                        var anglePrecisionInfo = new JavaScript.AnnPropertyInfo("", false, annProtractorObject.get_anglePrecision(), "Protractor", "Angle Precision", "Precision", true, AnnStringEditor);
                        anglePrecisionInfo.values["0"] = 0;
                        anglePrecisionInfo.values["1"] = 1;
                        anglePrecisionInfo.values["2"] = 2;
                        anglePrecisionInfo.values["3"] = 3;
                        anglePrecisionInfo.values["4"] = 4;
                        anglePrecisionInfo.values["5"] = 5;
                        anglePrecisionInfo.values["6"] = 6;
                        anglePrecisionInfo.valueChanged = this.anglePrecisionInfo_ValueChanged;
                        this._properties["AnglePrecision"] = anglePrecisionInfo;
                        var angulartUnit = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnAngularUnit, annProtractorObject.get_angularUnit());
                        var angularUnitInfo = new JavaScript.AnnPropertyInfo("", false, angulartUnit, "Protractor", "AngularUnit", "Angular Unit", true, AnnStringEditor);
                        angularUnitInfo.valueChanged = this.angularUnitInfo_ValueChanged;
                        this.fillEnumValue(angularUnitInfo, lt.Annotations.Core.AnnAngularUnit);
                        this._properties["AngularUnit"] = angularUnitInfo;
                    }
                    if (lt.Annotations.Core.AnnRubberStampObject.isInstanceOfType(annObject)) {
                        var annRubberStampObject = annObject;
                        var rubberStamp = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnRubberStampType, annRubberStampObject.get_rubberStampType());
                        rubberStamp = rubberStamp.replace("Stamp", "");
                        var ruberStampTypeinfo = new JavaScript.AnnPropertyInfo("", false, rubberStamp, "RubberStamp", "RuberStampType", "Rubber Stamp Type", true, AnnStringEditor);
                        this.fillEnumValue(ruberStampTypeinfo, lt.Annotations.Core.AnnRubberStampType);
                        ruberStampTypeinfo.valueChanged = this.ruberStampTypeinfo_ValueChanged;
                        this._properties["RuberStampType"] = ruberStampTypeinfo;
                    }
                    if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(annObject)) {
                        var annTextObject = annObject;
                        this._properties["TextBackground"] = new JavaScript.AnnPropertyInfo("TextBackground", false, annTextObject.textBackground, "Text", "TextBackground", "Background", true, AnnSolidColorBrushEditor);
                        this._properties["TextForeground"] = new JavaScript.AnnPropertyInfo("TextForeground", false, annTextObject.textForeground, "Text", "TextForeground", "Foreground", true, AnnSolidColorBrushEditor);
                        var text = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, annTextObject.get_text(), "Text", "Acute", "Text", true, AnnStringEditor);
                        text.valueChanged = this.text_ValueChanged;
                        this._properties["Text"] = text;
                        var vertical = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnVerticalAlignment, annTextObject.get_verticalAlignment());
                        var verticalAlignment = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, vertical, "Text", "VerticalAlignment", "Vertical Alignment", true, AnnStringEditor);
                        verticalAlignment.valueChanged = this.verticalAlignment_ValueChanged;
                        this.fillEnumValue(verticalAlignment, lt.Annotations.Core.AnnVerticalAlignment);
                        this._properties["VerticalAlignment"] = verticalAlignment;
                        var horizontal = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnHorizontalAlignment, annTextObject.get_horizontalAlignment());
                        var horizontalAlignment = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, horizontal, "Text", "HorizontalAlignment", "Horizontal Alignment", true, AnnStringEditor);
                        horizontalAlignment.valueChanged = this.horizontalAlignment_ValueChanged;
                        this.fillEnumValue(horizontalAlignment, lt.Annotations.Core.AnnHorizontalAlignment);
                        this._properties["HorizontalAlignment"] = horizontalAlignment;
                        var wordWrapInfo = new JavaScript.AnnPropertyInfo("", false, annTextObject.get_wordWrap(), "Text", "Word Wrap", "Word Wrap", true, AnnBooleanEditor);
                        wordWrapInfo.values["True"] = true;
                        wordWrapInfo.values["False"] = false;
                        this._properties["WordWrap"] = wordWrapInfo;
                        wordWrapInfo.valueChanged = this.wordWrapInfo_ValueChanged;
                    }
                    if (lt.Annotations.Core.AnnTextRollupObject.isInstanceOfType(annObject)) {
                        var annTextRollupObject = annObject;
                        var expandedInfo = new JavaScript.AnnPropertyInfo("", false, annTextRollupObject.get_expanded(), "TextRollup", "Expanded", "Expanded", true, AnnBooleanEditor);
                        expandedInfo.values["True"] = true;
                        expandedInfo.values["False"] = false;
                        expandedInfo.valueChanged = this.expandedInfo_ValueChanged;
                        this._properties["Expanded"] = expandedInfo;
                    }
                    if (lt.Annotations.Core.AnnTextPointerObject.isInstanceOfType(annObject)) {
                        var annTextPointerObject = annObject;
                        var fixedPointerInfo = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, annTextPointerObject.get_fixedPointer(), "TextPointer", "FixedPointer", "Fixed", true, AnnStringEditor);
                        fixedPointerInfo.valueChanged = this.fixedPointerInfo_ValueChanged;
                        fixedPointerInfo.values["True"] = true;
                        fixedPointerInfo.values["False"] = false;
                        this._properties["FixedPointer"] = fixedPointerInfo;
                    }
                    if (lt.Annotations.Core.AnnStampObject.isInstanceOfType(annObject)) {
                        var annStampObject = annObject;
                        var pictureInfo = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, annStampObject.get_picture(), "Picture", "Picture", "Picture", true, AnnPictureEditor);
                        pictureInfo.valueChanged = this.pictureInfo_ValueChanged;
                        this._properties["Picture"] = pictureInfo;
                    }
                    if (lt.Annotations.Core.AnnHotspotObject.isInstanceOfType(annObject)) {
                        var annHotspotObject = annObject;
                        var pictureInfo = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, annHotspotObject.get_picture(), "Picture", "Picture", "Picture", true, AnnPictureEditor);
                        pictureInfo.valueChanged = this.pictureInfo_ValueChanged;
                        this._properties["Picture"] = pictureInfo;
                    }
                    if (lt.Annotations.Core.AnnFreehandHotspotObject.isInstanceOfType(annObject)) {
                        var annFreehandHotspotObject = annObject;
                        var pictureInfo = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, annFreehandHotspotObject.get_picture(), "Picture", "Picture", "Picture", true, AnnPictureEditor);
                        pictureInfo.valueChanged = this.pictureInfo_ValueChanged;
                        this._properties["Picture"] = pictureInfo;
                    }
                    if (lt.Annotations.Core.AnnPointObject.isInstanceOfType(annObject)) {
                        var annPointObject = annObject;
                        var showPictureInfo = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, annPointObject.get_showPicture(), "Point", "ShowPicture", "Show Picture", true, AnnBooleanEditor);
                        showPictureInfo.values["True"] = true;
                        showPictureInfo.values["False"] = false;
                        showPictureInfo.valueChanged = this.showPictureInfo_ValueChanged;
                        this._properties["ShowPicture"] = showPictureInfo;
                    }
                    if (annObject.get_id() == lt.Annotations.Core.AnnObject.mediaObjectId || annObject.get_id() == lt.Annotations.Core.AnnObject.audioObjectId) {
                        var annMediaObject = annObject;
                        var media = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, annMediaObject.get_media(), "Media", "Media", "Source", true, AnnMediaEditor);
                        media.valueChanged = this.media_ValueChanged;
                        this._properties["Media"] = media;
                    }
                    if (annObject.get_id() == lt.Annotations.Core.AnnObject.encryptObjectId) {
                        var annEncryptObject = annObject;
                        if (annEncryptObject != null) {
                            var key = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, annEncryptObject.get_key(), "Encrypt", "", "Key", true, AnnIntegerEditor);
                            key.valueChanged = this.encryptKey_ValueChanged;
                            this._properties["Key"] = key;
                            if (!annEncryptObject.get_isEncrypted()) {
                                var encryptor = new lt.Annotations.JavaScript.AnnPropertyInfo("", false, annEncryptObject.get_encryptor(), "Encrypt", "", "Encryptor", true, AnnBooleanEditor);
                                encryptor.values["True"] = true;
                                encryptor.values["False"] = false;
                                encryptor.valueChanged = this.encryptor_ValueChanged;
                                this._properties["Encryptor"] = encryptor;
                            }
                        }
                    }
                }
                Object.defineProperty(AnnObjectEditor.prototype, "properties", {
                    get: function () {
                        return this._properties;
                    },
                    enumerable: true,
                    configurable: true
                });
                AnnObjectEditor.prototype.RubberStampTypeToString = function (type) {
                    return lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnRubberStampType, type);
                };
                AnnObjectEditor.prototype.fillEnumValue = function (info, type) {
                    for (var entry in type) {
                        var member = entry.substr(0, 1).toUpperCase() + entry.substr(1);
                        if (member == "__typeName")
                            break;
                        member = member.replace("Stamp", "");
                        info.values[member] = member;
                    }
                };
                return AnnObjectEditor;
            }());
            JavaScript.AnnObjectEditor = AnnObjectEditor;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var ObjectsAlignmentDialog = (function () {
                function ObjectsAlignmentDialog() {
                    this._automation = null;
                    this.dialogUI = {
                        dialog: "#objectsAlignmentDialog",
                        okBtn: "#objectsAlignmentDialogOkBtn",
                        dialogNameLable: "#objectsAlignmentDialogName",
                        enableCheckBox: "#objectsAlignmentDialogEnableCheckBox",
                        objectsAlignmentBtns: ".objectsAlignmentBtn",
                    };
                    this.Init();
                }
                Object.defineProperty(ObjectsAlignmentDialog.prototype, "onHide", {
                    set: function (value) {
                        this._onHide = null;
                        this._onHide = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ObjectsAlignmentDialog.prototype, "automation", {
                    get: function () { return this._automation; },
                    set: function (value) {
                        if (this._automation != value) {
                            this._automation = value;
                            this._automation.active = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ObjectsAlignmentDialog.prototype.Init = function () {
                    $(this.dialogUI.enableCheckBox).bind("change", $.proxy(this.enableObjectsAlignment_Change, this));
                    $(this.dialogUI.objectsAlignmentBtns).bind("click", $.proxy(this.objectsAlignmentButtons_Click, this));
                    $(this.dialogUI.okBtn).bind("click", $.proxy(this.okButton_Click, this));
                };
                ObjectsAlignmentDialog.prototype.show = function () {
                    var isCheckedBox = document.getElementById(this.dialogUI.enableCheckBox.substr(1));
                    isCheckedBox.checked = this._automation.manager.enableObjectsAlignment;
                    $(this.dialogUI.objectsAlignmentBtns).prop("disabled", !(this._automation.manager.enableObjectsAlignment && this._automation.canAlign));
                    $(this.dialogUI.dialogNameLable).text("Objects Alignment");
                    $(this.dialogUI.dialog).modal();
                };
                ObjectsAlignmentDialog.prototype.enableObjectsAlignment_Change = function (e) {
                    var isCheckedBox = document.getElementById(this.dialogUI.enableCheckBox.substr(1));
                    this._automation.manager.enableObjectsAlignment = isCheckedBox.checked;
                    $(this.dialogUI.objectsAlignmentBtns).prop("disabled", !(this._automation.manager.enableObjectsAlignment && this._automation.canAlign));
                };
                ObjectsAlignmentDialog.prototype.objectsAlignmentButtons_Click = function (e) {
                    var actionId = parseInt($(e.currentTarget).val());
                    $(this.dialogUI.dialog).modal("hide");
                    if (this._onHide != null) {
                        this._onHide(actionId);
                    }
                };
                ObjectsAlignmentDialog.prototype.okButton_Click = function (e) {
                    $(this.dialogUI.dialog).modal("hide");
                };
                ObjectsAlignmentDialog.ToLeftActionId = -1;
                ObjectsAlignmentDialog.ToCenterActionId = -2;
                ObjectsAlignmentDialog.ToRightActionId = -3;
                ObjectsAlignmentDialog.ToTopActionId = -4;
                ObjectsAlignmentDialog.ToMiddleActionId = -5;
                ObjectsAlignmentDialog.ToBottomActionId = -6;
                ObjectsAlignmentDialog.SameWidthtActionId = -7;
                ObjectsAlignmentDialog.SameHeightActionId = -8;
                ObjectsAlignmentDialog.SameSizeActionId = -9;
                return ObjectsAlignmentDialog;
            }());
            JavaScript.ObjectsAlignmentDialog = ObjectsAlignmentDialog;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var PasswordDialog = (function () {
                function PasswordDialog() {
                    this._password = "";
                    this.dialogUI = {
                        dialog: "#automationPasswordDialog",
                        OkBtn: "#automationPasswordDlg_OK",
                        dialogNameLable: "#passwordDialogName",
                        objectPasswordInput: "#objectPassword"
                    };
                    this.Init();
                }
                PasswordDialog.prototype.Init = function () {
                    $(this.dialogUI.OkBtn).bind("click", $.proxy(this.OkBtn_Click, this));
                };
                PasswordDialog.prototype.show = function (lock) {
                    this._lock = lock;
                    $(this.dialogUI.dialogNameLable).text(this._lock ? "Lock" : "Unlock");
                    $(this.dialogUI.objectPasswordInput).val("");
                    $(this.dialogUI.dialog).modal();
                };
                Object.defineProperty(PasswordDialog.prototype, "password", {
                    get: function () {
                        return this._password;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PasswordDialog.prototype, "OkClick", {
                    set: function (value) {
                        this._OkClick = null;
                        this._OkClick = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                PasswordDialog.prototype.OkBtn_Click = function (e) {
                    this._password = $(this.dialogUI.objectPasswordInput).val();
                    if (this._password != null && this._password != "") {
                        $(this.dialogUI.dialog).modal("hide");
                        if (this._OkClick != null)
                            this._OkClick();
                    }
                    else {
                        window.alert("Password Can't be empty");
                    }
                };
                return PasswordDialog;
            }());
            JavaScript.PasswordDialog = PasswordDialog;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var norbergObjectId = -1008;
            var PropertiesPage = (function () {
                function PropertiesPage() {
                    var _this = this;
                    this._outputDivId = "PropertyPageDiv";
                    this._automation = null;
                    this.dialogUI = {
                        commonTab: "annCommonTab",
                        textTab: "annTextTab",
                        curveTab: "annCurveTab",
                        rulerTab: "annRulerTab",
                        protractorTab: "annProtractorTab",
                        rubberStampTab: "annRubberStampTab",
                        textRollupTab: "annTextRollupTab",
                        textPointerTab: "annTextPointerTab",
                        pictureTab: "annPictureTab",
                        pointTab: "annPointTab",
                        mediaTab: "annMediaTab",
                        encryptTab: "annEncryptTab"
                    };
                    this._groupCount = 0;
                    this._properties = new Array();
                    this._subGroupCount = 0;
                    this._cssItem = 0;
                    this.createUIElement = function () {
                        try {
                            _this.createObjectPropertiesTabs();
                        }
                        catch (e) {
                            alert(e);
                        }
                        $('.panel-collapse').on('hidden.bs.collapse', function (e) {
                            $(e.currentTarget).prev().find(".collapse-expand").removeClass("toggleToCollapse");
                            $(e.currentTarget).prev().find(".collapse-expand").addClass("toggleToExpand");
                        });
                        $('.panel-collapse').on('show.bs.collapse', function (e) {
                            $(e.currentTarget).prev().find(".collapse-expand").removeClass("toggleToExpand");
                            $(e.currentTarget).prev().find(".collapse-expand").addClass("toggleToCollapse");
                        });
                    };
                    this.createObjectPropertiesTabs = function () {
                        for (var i = 0; i < _this._properties.length; i++) {
                            var htmlOut = "";
                            htmlOut += "<br />";
                            htmlOut += "<div class='panel panel-default'>";
                            htmlOut += "<div class='panel-heading'>";
                            htmlOut += "<h4 class='panel-title'>";
                            htmlOut += "<a class='accordion-toggle' data-toggle='collapse' href='#" + _this._properties[i].OutputDivId + "'>";
                            htmlOut += "<label class='collapse-expand toggleToExpand' style='border: none;'>" + _this._properties[i].GroupName + "</label>";
                            htmlOut += "</a>";
                            htmlOut += "</h4>";
                            htmlOut += "</div>";
                            htmlOut += "<div id='" + _this._properties[i].OutputDivId + "' class='panel-collapse collapse'>";
                            htmlOut += "<div id='child" + _this._properties[i].OutputDivId + "'>";
                            for (var x = 0; x < _this._properties[i].Items.length; x++) {
                                htmlOut += "<br />";
                                htmlOut += _this.renderGridInput(_this._properties[i].Items[x].Type, _this._properties[i].Items[x].OutputDivId, _this._properties[i].Items[x].CssId, _this._properties[i].Items[x].DropFields, _this._properties[i].Items[x].DefaultValue, _this._properties[i].Items[x].DisplayName);
                            }
                            if (_this._properties[i].SubGroups.length > 0) {
                                for (var ii = 0; ii < _this._properties[i].SubGroups.length; ii++) {
                                    htmlOut += "<div id='" + _this._properties[i].SubGroups[ii].OutputDivId + "' class='pgSubGroup' onclick='lt.Annotations.JavaScript.PropertiesPage.Expand('" + _this._properties[i].SubGroups[ii].OutputDivId + "','true');'><div id='image" + _this._properties[i].SubGroups[ii].OutputDivId + "' class='pgSubGroupShrink bkMinimiseSub'>&nbsp;</div><div class='pgSubGroupText'>" + _this._properties[i].SubGroups[ii].GroupName + "</div></div>";
                                    htmlOut += "<div id='child" + _this._properties[i].SubGroups[ii].OutputDivId + "'>";
                                    for (var xx = 0; xx < _this._properties[i].SubGroups[ii].Items.length; xx++) {
                                        htmlOut += _this.renderGridInput(_this._properties[i].SubGroups[ii].Items[xx].Type, _this._properties[i].SubGroups[ii].Items[xx].OutputDivId, _this._properties[i].SubGroups[ii].Items[xx].CssId, _this._properties[i].SubGroups[ii].Items[xx].DropFields, _this._properties[i].Items[x].DefaultValue, _this._properties[i].Items[x].DisplayName);
                                    }
                                    htmlOut += "</div>";
                                }
                            }
                            htmlOut += "</div>";
                            htmlOut += "</div>";
                            _this.appendToGroup(_this._properties[i].GroupName, htmlOut);
                        }
                    };
                    this.createPropertiestabs = function () {
                        var body = "";
                        body += "<div class='tab-pane active'>";
                        body += "<ul class='nav nav-tabs'>";
                        body += "</ul>";
                        body += "<div class='tab-content'>";
                        body += "<div class='tab-pane active' id='PropertiesPageContainer'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.commonTab + "'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.textTab + "'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.curveTab + "'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.rulerTab + "'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.protractorTab + "'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.rubberStampTab + "'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.textRollupTab + "'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.textPointerTab + "'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.pictureTab + "'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.pointTab + "'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.mediaTab + "'>";
                        body += "</div>";
                        body += "<div class='tab-pane active' id='" + _this.dialogUI.encryptTab + "'>";
                        body += "</div>";
                        body += "</div>";
                        body += "</div>";
                        return body;
                    };
                    this.appendToGroup = function (groupName, htmlOut) {
                        groupName = groupName.replace(" ", "");
                        switch (groupName) {
                            case "Font":
                            case "Text":
                                if (document.getElementById(_this.dialogUI.textTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annTextTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annTextTabBtn' href='#" + _this.dialogUI.textTab + "' data-toggle='tab'>Text</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                }
                                document.getElementById(_this.dialogUI.textTab).innerHTML += htmlOut + "</div>";
                                break;
                            case "Curve":
                                if (document.getElementById(_this.dialogUI.curveTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annCurveTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annCurveTabBtn' href='#" + _this.dialogUI.curveTab + "' data-toggle='tab'>Curve</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                }
                                document.getElementById(_this.dialogUI.curveTab).innerHTML += htmlOut + "</div>";
                                break;
                            case "Ruler":
                                if (_this._automation.currentEditObject.id == norbergObjectId)
                                    break;
                                if (document.getElementById(_this.dialogUI.rulerTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annRulerTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annRulerTabBtn' href='#" + _this.dialogUI.rulerTab + "' data-toggle='tab'>Ruler</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                }
                                document.getElementById(_this.dialogUI.rulerTab).innerHTML += htmlOut + "</div>";
                                break;
                            case "Protractor":
                                if (document.getElementById(_this.dialogUI.protractorTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annProtractorTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annProtractorTabBtn' href='#" + _this.dialogUI.protractorTab + "' data-toggle='tab'>Protractor</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                }
                                document.getElementById(_this.dialogUI.protractorTab).innerHTML += htmlOut + "</div>";
                                break;
                            case "RubberStamp":
                                if (document.getElementById(_this.dialogUI.rubberStampTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annRubberStampTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annRubberStampTabBtn' href='#" + _this.dialogUI.rubberStampTab + "' data-toggle='tab'>RubberStamp</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                }
                                document.getElementById(_this.dialogUI.rubberStampTab).innerHTML += htmlOut + "</div>";
                                break;
                            case "TextRollup":
                                if (document.getElementById(_this.dialogUI.textRollupTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annTextRollupTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annTextRollupTabBtn' href='#" + _this.dialogUI.textRollupTab + "' data-toggle='tab'>TextRollup</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                }
                                document.getElementById(_this.dialogUI.textRollupTab).innerHTML += htmlOut + "</div>";
                                break;
                            case "TextPointer":
                                if (document.getElementById(_this.dialogUI.textPointerTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annTextPointerTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annTextPointerTabBtn' href='#" + _this.dialogUI.textPointerTab + "' data-toggle='tab'>TextPointer</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                }
                                document.getElementById(_this.dialogUI.textPointerTab).innerHTML += htmlOut + "</div>";
                                break;
                            case "Picture":
                                if (document.getElementById(_this.dialogUI.pictureTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annPictureTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annPictureTabBtn' href='#" + _this.dialogUI.pictureTab + "' data-toggle='tab'>Picture</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                }
                                document.getElementById(_this.dialogUI.pictureTab).innerHTML += htmlOut + "</div>";
                                break;
                            case "Point":
                                if (document.getElementById(_this.dialogUI.pointTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annPointTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annPointTabBtn' href='#" + _this.dialogUI.pointTab + "' data-toggle='tab'>Point</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                }
                                document.getElementById(_this.dialogUI.pointTab).innerHTML += htmlOut + "</div>";
                                break;
                            case "Media":
                                if (document.getElementById(_this.dialogUI.mediaTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annMediaTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annMediaTabBtn' href='#" + _this.dialogUI.mediaTab + "' data-toggle='tab'>Media</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                    if (document.getElementById("annCommonTabBtn") == null)
                                        $("#annMediaTabBtn").click();
                                }
                                document.getElementById(_this.dialogUI.mediaTab).innerHTML += htmlOut + "</div>";
                                break;
                            case "Encrypt":
                                if (document.getElementById(_this.dialogUI.encryptTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annEncryptTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annEncryptTabBtn' href='#" + _this.dialogUI.encryptTab + "' data-toggle='tab'>Encrypt</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                }
                                document.getElementById(_this.dialogUI.encryptTab).innerHTML += htmlOut + "</div>";
                                break;
                            default:
                                if (document.getElementById(_this.dialogUI.commonTab).innerHTML.indexOf(groupName) != -1)
                                    break;
                                if (document.getElementById("annCommonTabBtn") == null) {
                                    var outputDiv = document.getElementById(_this._outputDivId).innerHTML;
                                    var index = outputDiv.lastIndexOf("</li>");
                                    var body = "<li><a id='annCommonTabBtn' href='#" + _this.dialogUI.commonTab + "' data-toggle='tab'>Common</a></li>";
                                    if (index != -1) {
                                        outputDiv = outputDiv.substring(0, index + 5) + body + outputDiv.substring(index + 5, outputDiv.length);
                                    }
                                    else {
                                        index = outputDiv.indexOf("</ul>");
                                        outputDiv = outputDiv.substring(0, index) + body + outputDiv.substring(index, outputDiv.length);
                                    }
                                    document.getElementById(_this._outputDivId).innerHTML = outputDiv;
                                    $("#annCommonTabBtn").click();
                                }
                                document.getElementById(_this.dialogUI.commonTab).innerHTML += htmlOut + "</div>";
                                break;
                        }
                    };
                    this.empty = function () {
                        _this._properties = new Array();
                        PropertiesPage._editorsLookup = new Array();
                        PropertiesPage._propertiesLookup = new Array();
                        _this._groupCount = 0;
                        _this._subGroupCount = 0;
                        _this._cssItem = 0;
                        document.getElementById(_this._outputDivId).innerHTML = '';
                    };
                    this.editObject = function (annObject) {
                        _this.empty();
                        if (annObject != null) {
                            document.getElementById(_this._outputDivId).innerHTML += _this.createPropertiestabs();
                            if (annObject.id == lt.Annotations.Core.AnnObject.selectObjectId) {
                                var selection = _this._automation.currentEditObject;
                                for (var i = 0; i < selection.selectedObjects.count; i++) {
                                    var annEditObject = new lt.Annotations.JavaScript.AnnObjectEditor(selection.selectedObjects.item(i));
                                    if (selection.selectedObjects.item(i).get_id() == lt.Annotations.Core.AnnObject.mediaObjectId || selection.selectedObjects.item(i).get_id() == lt.Annotations.Core.AnnObject.audioObjectId) {
                                        delete annEditObject.properties["Hyperlink"];
                                    }
                                    _this.enumEditObject(annEditObject.properties, "", "");
                                    _this.createUIElement();
                                }
                            }
                            else {
                                var annEditObject = new lt.Annotations.JavaScript.AnnObjectEditor(annObject);
                                if (annObject.get_id() == lt.Annotations.Core.AnnObject.mediaObjectId || annObject.get_id() == lt.Annotations.Core.AnnObject.audioObjectId) {
                                    delete annEditObject.properties["Hyperlink"];
                                }
                                _this.enumEditObject(annEditObject.properties, "", "");
                                _this.createUIElement();
                            }
                        }
                    };
                }
                Object.defineProperty(PropertiesPage.prototype, "outputDivId", {
                    get: function () { return this._outputDivId; },
                    set: function (value) { this._outputDivId = value; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropertiesPage.prototype, "automation", {
                    get: function () { return this._automation; },
                    set: function (value) {
                        if (this._automation != value) {
                            if (this._automation != null)
                                this._automation.active = false;
                            this._automation = value;
                            this._automation.active = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PropertiesPage.prototype, "groupCount", {
                    get: function () { return this._properties.length; },
                    enumerable: true,
                    configurable: true
                });
                PropertiesPage.prototype.initialize = function () {
                    if (this._automation == null)
                        return;
                    var editObject = this._automation.get_currentEditObject();
                    if (editObject != null) {
                        if (editObject.get_isLocked()) {
                            alert('Cannot change properties for a locked object.');
                            return;
                        }
                    }
                    this.editObject(editObject);
                };
                PropertiesPage.prototype.createItem = function (groupName, rowType, propertyName, drpFields, isSubGroup, userData, defaultValue, displayName) {
                    var foundGroup = false;
                    for (var i = 0; i < this._properties.length; i++) {
                        if (this._properties[i].GroupName == groupName) {
                            if (isSubGroup != "") {
                                var foundSubGroup = false;
                                for (var x = 0; x < this._properties[i].SubGroups.length; x++) {
                                    if (this._properties[i].SubGroups[x].GroupName == isSubGroup) {
                                        foundSubGroup = true;
                                        this._properties[i].SubGroups[x].Items[this._properties[i].SubGroups[x].Items.length] = new ClassItem(propertyName, rowType, drpFields, this._cssItem, userData, defaultValue, displayName);
                                        this._cssItem++;
                                    }
                                }
                                if (!foundSubGroup) {
                                    this._properties[i].SubGroups[this._properties[i].SubGroups.length] = new Group(isSubGroup, this._subGroupCount, true);
                                    this._properties[i].SubGroups[this._properties[i].SubGroups.length - 1].Items[this._properties[i].SubGroups[this._properties[i].SubGroups.length - 1].Items.length] = new ClassItem(propertyName, rowType, drpFields, this._cssItem, userData, defaultValue, displayName);
                                    this._cssItem++;
                                    this._subGroupCount++;
                                }
                            }
                            else {
                                this._properties[i].Items[this._properties[i].Items.length] = new ClassItem(propertyName, rowType, drpFields, this._cssItem, userData, defaultValue, displayName);
                                this._cssItem++;
                            }
                            foundGroup = true;
                        }
                    }
                    if (!foundGroup) {
                        this._properties[this._properties.length] = new Group(groupName, this._groupCount, false);
                        if (!isSubGroup) {
                            this._properties[this._properties.length - 1].Items[this._properties[this._properties.length - 1].Items.length] = new ClassItem(propertyName, rowType, drpFields, this._cssItem, userData, defaultValue, displayName);
                        }
                        else {
                            this._properties[this._properties.length - 1].SubGroups[this._properties[this._properties.length - 1].SubGroups.length] = new Group(isSubGroup, this._subGroupCount, true);
                            this._properties[this._properties.length - 1].SubGroups[this._properties[this._properties.length - 1].SubGroups.length - 1].Items[this._properties[this._properties.length - 1].SubGroups[this._properties[this._properties.length - 1].SubGroups.length - 1].Items.length] = new ClassItem(propertyName, rowType, drpFields, this._cssItem, userData, defaultValue, '');
                            this._cssItem++;
                            this._subGroupCount++;
                        }
                        this._groupCount++;
                        this._cssItem++;
                    }
                };
                PropertiesPage.prototype.renderGridInput = function (type, outputDivId, cssId, fields, defaultValue, displayName) {
                    switch (type) {
                        case 'label':
                            var inputId = outputDivId;
                            var label = "<div data-role=\"fieldcontain\">" +
                                "<label for=\"" + inputId + "\" style=\"text-align:left;\">" + displayName + "</label>" +
                                "<input class='form-control' id=\"" + inputId + "\"value=\"" + defaultValue + "\"></input>" +
                                "</div>";
                            return label;
                        case 'input':
                            var inputId = outputDivId;
                            var label = "<div data-role=\"fieldcontain\">" +
                                "<label for=\"" + inputId + "\" style=\"text-align:left;\">" + displayName + "</label>" +
                                "<input class='form-control' style=\"text-align:center;\"id=\"" + inputId + "\" onchange=\"Javascript:lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInner('" + cssId + "','" + inputId + "', this.value);\" value=\"" + defaultValue + "\"></input>" +
                                "</div>";
                            return label;
                        case 'integerInput':
                            var inputId = outputDivId;
                            var label = "<div data-role=\"fieldcontain\">" +
                                "<label for=\"" + inputId + "\" style=\"text-align:left;\">" + displayName + "</label>" +
                                "<input class='form-control' type=\"number\" style=\"text-align:center;\"id=\"" + inputId + "\" onkeypress='Javascript:lt.Annotations.JavaScript.PropertiesPage.validateNumbericalKey(event)' onchange=\"Javascript:lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInner('" + cssId + "','" + inputId + "', this.value);\" value=\"" + defaultValue + "\"></input>" +
                                "</div>";
                            return label;
                        case 'boolean':
                            var inputId = outputDivId;
                            var label = "<div data-role=\"fieldcontain\">" +
                                "<label for=\"" + outputDivId + "\" style=\"text-align:center;\">" + displayName + "</label>" +
                                "<select class='form-control' name=\"slider\" id=\"" + outputDivId + "\" data-role=\"slider\" data-theme=\"a\"onchange=\"Javascript:lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInner('" + cssId + "','" + outputDivId + "', this.value);\">";
                            var items1 = fields.split('|');
                            for (var i = 0; i < items1.length; i++) {
                                if (items1[i].toString().toLowerCase() == defaultValue.toString().toLowerCase()) {
                                    label += "<option value=\"" + items1[i] + "\"selected>" + items1[i] + "</option>";
                                }
                                else {
                                    label += "<option value=\"" + items1[i] + "\">" + items1[i] + "</option>";
                                }
                            }
                            label += "</select> " + "</div>";
                            "</select> " +
                                "</div>";
                            return label;
                        case 'color':
                            var inputId = outputDivId;
                            var label = "<div data-role=\"fieldcontain\">" +
                                "<label for=\"" + inputId + "\" style=\"text-align:left;\">" + displayName + "</label>" +
                                "<select class='form-control' name=\"slider\" id=\"" + inputId + "\" data-theme=\"a\"onchange=\"Javascript:lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInner('" + cssId + "','" + outputDivId + "', this.value);\">";
                            var items = fields.split('|');
                            for (i = 0; i < items.length; i++) {
                                label += "<option value=\"" + items[i] + "\">" + items[i] + "</option>";
                            }
                            label += "</select> " + "</div>";
                            return label;
                        case 'num':
                            var inputId = outputDivId;
                            var label = "<div data-role=\"fieldcontain\">" +
                                "<label for=\"" + inputId + "\" style=\"text-align:left;\">" + displayName + "</label>" +
                                "<input class='form-control' style=\"text-align:center;\" id=\"" + inputId + "\" class=\"pgInputNum\" onchange=\"Javascript:lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInnerNum('" + cssId + "','" + inputId + "', this.value);\" value=\"" + defaultValue + "\"></input>" +
                                "</div>";
                            return label;
                        case 'picture':
                            var inputId = outputDivId;
                            var source = "";
                            if (defaultValue != null) {
                                source = defaultValue.get_source();
                            }
                            var label = "<div data-role=\"fieldcontain\">" +
                                "<label for=\"" + inputId + "\" style=\"text-align:left;\">" + displayName + " URL" + "</label>" +
                                "<input class='form-control' style=\"text-align:center;\"id=\"" + inputId + "\" onchange=\"Javascript:lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInner('" + cssId + "','" + inputId + "', String.isNullOrEmpty(this.value) ? null : new lt.Annotations.Core.AnnPicture(this.value));\" value=\"" + source + "\"></input>" +
                                "</div>";
                            return label;
                        case 'media':
                            var inputId = outputDivId;
                            var source1 = "";
                            var source2 = "";
                            var source3 = "";
                            if (defaultValue.get_source1() != null) {
                                source1 = defaultValue.get_source1();
                            }
                            if (defaultValue.get_source2() != null) {
                                source2 = defaultValue.get_source2();
                            }
                            if (defaultValue.get_source3() != null) {
                                source3 = defaultValue.get_source3();
                            }
                            var label = "<div data-role=\"fieldcontain\">" +
                                "<label for=\"" + inputId + "\" style=\"text-align:left;\">" + " URL 1" + "</label>" +
                                "<input class='form-control' style=\"text-align:center;\"id=\"" + inputId + "\" onchange=\"Javascript:lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInnerMedia('" + cssId + "','" + inputId + "','" + "1" + "', this.value);\" value=\"" + source1 + "\"></input>" +
                                "</div>" +
                                "<div data-role=\"fieldcontain\">" +
                                "<label for=\"" + inputId + "\" style=\"text-align:left;\">" + " URL 2" + "</label>" +
                                "<input class='form-control' style=\"text-align:center;\"id=\"" + inputId + "\" onchange=\"Javascript:lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInnerMedia('" + cssId + "','" + inputId + "','" + "2" + "', this.value);\" value=\"" + source2 + "\"></input>" +
                                "</div>" +
                                "<div data-role=\"fieldcontain\">" +
                                "<label for=\"" + inputId + "\" style=\"text-align:left;\">" + " URL 3" + "</label>" +
                                "<input class='form-control' style=\"text-align:center;\"id=\"" + inputId + "\" onchange=\"Javascript:lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInnerMedia('" + cssId + "','" + inputId + "','" + "3" + "', this.value);\" value=\"" + source3 + "\"></input>" +
                                "</div>";
                            return label;
                        case 'drop':
                            return "<div id=\"hold" + outputDivId + "\" class=\"pgGroupItem\"><div class=\"pgGroupItemText\">" + displayName + "</div><div class=\"pgInputHolder\"><select id=\"" + outputDivId + "\" class=\"pgInputDrop\" onchange=\"Javascript:lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInner('" + cssId + "','" + outputDivId + "',this.value);\"><option value='none'>none</option><option value='solid'>solid</option><option value='ridge'>ridge</option><option value='dashed'>dashed</option><option value='dotted'>dotted</option><option value='double'>double</option><option value='groove'>groove</option><option value='inset'>inset</option></select></div></div>";
                        case 'cdrop':
                            var inputId = outputDivId;
                            var label = "<div data-role=\"fieldcontain\">" +
                                "<label for=\"" + inputId + "\" style=\"text-align:left;\">" + displayName + "</label>" +
                                "<select class='form-control' name=\"slider\" id=\"" + inputId + "\" data-theme=\"a\"onchange=\"Javascript:lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInner('" + cssId + "','" + outputDivId + "', this.value);\">";
                            var items = fields.split('|');
                            for (i = 0; i < items.length; i++) {
                                if (items[i].toLowerCase() == defaultValue.toString().toLowerCase()) {
                                    label += "<option value=\"" + items[i] + "\"selected>" + items[i] + "</option>";
                                }
                                else {
                                    label += "<option value=\"" + items[i] + "\">" + items[i] + "</option>";
                                }
                            }
                            label += "</select> " + "</div>";
                            return label;
                        default:
                            return "<div id=\"hold" + outputDivId + "\" class=\"pgGroupItem\"><div class=\"pgGroupItemText\">" + cssId + "</div><div class=\"pgInputHolder\"><input id=\"" + outputDivId + "\" class=\"pgInput\"></input></div></div>";
                    }
                };
                PropertiesPage.validateNumbericalKey = function (event) {
                    var keyEvent = (event || window.event);
                    var key = keyEvent.keyCode || keyEvent.which;
                    switch (key) {
                        case 8:
                        case 37:
                        case 39:
                        case 46:
                            return;
                    }
                    key = parseFloat(String.fromCharCode(key).toString());
                    var regex = /[0-9]/;
                    if (!regex.test(key.toString())) {
                        if (keyEvent.preventDefault) {
                            keyEvent.preventDefault();
                        }
                    }
                };
                PropertiesPage.UpdateStyleInnerNum = function (cssId, divId, value) {
                    for (var i = 0; i < PropertiesPage._propertiesLookup.length; i++) {
                        if (PropertiesPage._propertiesLookup[i][0] == cssId) {
                            if (value.indexOf('px') != -1 || value.indexOf('em') != -1) {
                                lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInner(cssId, PropertiesPage._propertiesLookup[i][1], parseFloat(value));
                            }
                            else {
                                lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInner(cssId, PropertiesPage._propertiesLookup[i][1], parseFloat(value));
                            }
                        }
                    }
                };
                PropertiesPage.UpdateStyleInnerMedia = function (cssId, divId, id, value) {
                    for (var i = 0; i < PropertiesPage._propertiesLookup.length; i++) {
                        if (PropertiesPage._propertiesLookup[i][0] == cssId) {
                            var media = PropertiesPage._editorsLookup[cssId + PropertiesPage._propertiesLookup[i][1]].value;
                            switch (id) {
                                case "1":
                                    media.set_source1(value);
                                    break;
                                case "2":
                                    media.set_source2(value);
                                    break;
                                case "3":
                                    media.set_source3(value);
                                    break;
                            }
                            lt.Annotations.JavaScript.PropertiesPage.UpdateStyleInner(cssId, divId, media);
                        }
                    }
                };
                PropertiesPage.UpdateStyleInner = function (cssId, divId, value) {
                    for (var i = 0; i < PropertiesPage._propertiesLookup.length; i++) {
                        if (PropertiesPage._propertiesLookup[i][0] == cssId) {
                            if (PropertiesPage._editorsLookup[cssId + PropertiesPage._propertiesLookup[i][1]] instanceof lt.Annotations.JavaScript.AnnDoubleEditor) {
                                if (isNaN(value))
                                    alert("Insert Numerical Value");
                                else
                                    PropertiesPage._editorsLookup[cssId + PropertiesPage._propertiesLookup[i][1]].value = value;
                            }
                            else {
                                PropertiesPage._editorsLookup[cssId + PropertiesPage._propertiesLookup[i][1]].value = value;
                            }
                            if (PropertiesPage.onPropertiesChanged != null) {
                                PropertiesPage.onPropertiesChanged(value, PropertiesPage._editorsLookup[cssId + PropertiesPage._propertiesLookup[i][1]]);
                            }
                        }
                    }
                };
                PropertiesPage.Expand = function (id, sub) {
                    if (document.getElementById('child' + id).style.display == "" || document.getElementById('child' + id).style.display == "block") {
                        document.getElementById('child' + id).style.display = "none";
                        if (sub == 'true') {
                            $("#image" + id).removeClass('bkMinimiseSub').addClass('bkExpandSub');
                        }
                        else {
                            $("#image" + id).removeClass('bkMinimise').addClass('bkExpand');
                        }
                    }
                    else {
                        document.getElementById('child' + id).style.display = "block";
                        if (sub == 'true') {
                            $("#image" + id).removeClass('bkExpandSub').addClass('bkMinimiseSub');
                        }
                        else {
                            $("#image" + id).removeClass('bkExpand').addClass('bkMinimise');
                        }
                    }
                };
                PropertiesPage.prototype.clearValues = function () {
                    for (var i = 0; i < PropertiesPage._propertiesLookup.length; i++) {
                        var propLookup = PropertiesPage._propertiesLookup[i][1];
                        document.getElementById(propLookup).nodeValue = "";
                    }
                };
                PropertiesPage.prototype.hideItems = function () {
                    $("div[id*=childpg1_group_]").css('display', 'none');
                    $("div[id*=childpg1_subgroup_]").css('display', 'none');
                    $("div[id*=imagepg1_group_]").removeClass('bkMinimise').addClass('bkExpand');
                    $("div[id*=imagepg1_subgroup_]").removeClass('bkMinimiseSub').addClass('bkExpandSub');
                };
                PropertiesPage.prototype.fillCss2 = function () {
                    this.empty();
                    this.createItem("background", "input", "background", "", "");
                    this.createItem("background", "input", "background-image", "", "");
                    this.createItem("background", "input", "background-position", "", "");
                    this.createItem("background", "color", "background-color", "", "");
                    this.createItem("background", "cdrop", "background-repeat", "|repeat|no-repeat|repeat-x|repeat-y", "");
                    this.createItem("font", "input", "font", "", "");
                    this.createItem("font", "cdrop", "font-family", " |Arial|Arial Black|Bookman Old Style|Comic Sans MS|Courier|Courier New|Gadget|Garamond|Georgia|Helvetica|Impact|Lucida Console|Lucida Sans Unicode|Lucida Grande|MS Sans Serif|MS Serif|Palatino Linotype|Symbol|Tahoma|Times New Roman|Trebuchet MS|Verdana|Webdings|Wingdings", "");
                    this.createItem("font", "cdrop", "font-style", "|normal|italic|oblique|inherit", "");
                    this.createItem("font", "num", "font-size", "", "");
                    this.createItem("font", "num", "font-weight", "bold|bolder|lighter|normal", "");
                    this.createItem("font", "cdrop", "font-varient", "|normal|small-caps", "");
                    this.createItem("text", "input", "text", "", "");
                    this.createItem("text", "cdrop", "text-align", "|center|justify|left|right", "");
                    this.createItem("text", "cdrop", "text-decoration", "|underline|overline|none|blink|both", "");
                    this.createItem("text", "input", "text-indent", "", "");
                    this.createItem("text", "cdrop", "text-justify", "|auto|distribute|distribute-all-lines|inter-word|newspaper", "");
                    this.createItem("text", "cdrop", "text-transform", "|capitalize|lowercase|none|uppercase", "");
                    this.createItem("text", "color", "color", "", "");
                    this.createUIElement();
                };
                PropertiesPage.prototype.enumEditObject = function (properties, group, subgroup) {
                    for (var propertyName in properties) {
                        var propetyInfo = properties[propertyName];
                        var values = "";
                        if (propetyInfo != null && propetyInfo.isVisible) {
                            if (propetyInfo.editorType && propetyInfo.editorType.properties != null) {
                                this.enumEditObject(propetyInfo.editorType.properties, propetyInfo.category);
                            }
                            else {
                                var editorType = propetyInfo.editorType;
                                var uiEditor = "label";
                                if (editorType instanceof (lt.Annotations.JavaScript.AnnStringEditor)) {
                                    if (!propetyInfo.isReadOnly)
                                        uiEditor = "input";
                                    else
                                        uiEditor = "label";
                                }
                                else if (editorType instanceof (lt.Annotations.JavaScript.AnnColorEditor)) {
                                    uiEditor = 'color';
                                }
                                else if (editorType instanceof (lt.Annotations.JavaScript.AnnBooleanEditor)) {
                                    uiEditor = 'boolean';
                                }
                                else if (editorType instanceof (lt.Annotations.JavaScript.AnnDoubleEditor)) {
                                    uiEditor = 'num';
                                }
                                else if (editorType instanceof (lt.Annotations.JavaScript.AnnPictureEditor)) {
                                    var uiEditor = "picture";
                                }
                                else if (editorType instanceof (lt.Annotations.JavaScript.AnnIntegerEditor)) {
                                    var uiEditor = "integerInput";
                                }
                                else if (editorType instanceof (lt.Annotations.JavaScript.AnnMediaEditor)) {
                                    var uiEditor = "media";
                                }
                                if (uiEditor != 'boolean') {
                                    if (uiEditor == 'color') {
                                        uiEditor = 'cdrop';
                                        values += "Transparent|" + "Red|" + "Blue|" + "Green|" + "Yellow|" + "Black|" + "White";
                                    }
                                    else {
                                        for (var i in propetyInfo.values) {
                                            uiEditor = 'cdrop';
                                            values += i + "|";
                                        }
                                        values = values.slice(0, values.length - 1);
                                    }
                                }
                                else {
                                    for (var i in propetyInfo.values) {
                                        uiEditor = 'boolean';
                                        values += i + "|";
                                    }
                                    values = values.slice(0, values.length - 1);
                                }
                                this.createItem(propetyInfo.category, uiEditor, propertyName, values, "", propetyInfo.editorType, propetyInfo.value, propetyInfo.displayName);
                            }
                        }
                    }
                };
                PropertiesPage.prototype.canDeleteObject = function () {
                    var canDelete = this._automation != null && this._automation.get_canDeleteObjects();
                    if (canDelete) {
                        var textElement = document.getElementById("textObject");
                        if (textElement != null) {
                            canDelete = false;
                        }
                    }
                    return canDelete;
                };
                PropertiesPage._editorsLookup = new Array();
                PropertiesPage._propertiesLookup = new Array();
                return PropertiesPage;
            }());
            JavaScript.PropertiesPage = PropertiesPage;
            var Group = (function () {
                function Group(groupName, id, subgroup) {
                    this.GroupName = groupName;
                    if (subgroup) {
                        this.OutputDivId = 'pg1_subgroup_' + id;
                    }
                    else {
                        this.OutputDivId = 'pg1_group_' + id;
                    }
                    this.Items = new Array();
                    this.SubGroups = new Array();
                }
                return Group;
            }());
            var ClassItem = (function () {
                function ClassItem(propertyName, rowType, drpFields, id, userData, defaultValue, displayName) {
                    this.CssId = propertyName;
                    this.DisplayName = displayName;
                    this.OutputDivId = 'pg1_item_' + id;
                    this.Type = rowType;
                    this.Value = '';
                    this.DropFields = drpFields;
                    this.UserData = userData;
                    this.DefaultValue = defaultValue;
                    PropertiesPage._propertiesLookup[PropertiesPage._propertiesLookup.length] = [propertyName, this.OutputDivId, rowType];
                    PropertiesPage._editorsLookup[propertyName + this.OutputDivId] = userData;
                }
                return ClassItem;
            }());
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var ReviewsPage = (function () {
                function ReviewsPage() {
                    var _this = this;
                    this._userName = "";
                    this.date = new Date();
                    this.pageUI = {
                        page: "reviewsPageDiv",
                        header: "reviewsHeader",
                        contnet: "reviewsContnetText",
                        details: "detailsDiv",
                        author: "authorTextInput",
                        day: "dayInput",
                        month: "monthInput",
                        year: "yearInput",
                        status: "statusMenu",
                        checked: "isCheckedBox",
                        comment: "commentTextArea",
                        replay: "replayNode",
                        add: "addNode",
                        deleteBtn: "deleteNode",
                        treeView: "treeViewDiv",
                    };
                    this.empty = function () {
                        document.getElementById(_this.pageUI.page).innerHTML = '';
                    };
                    this.createUIElement = function () {
                        var htmlText = "";
                        htmlText += "<div class='row'>";
                        htmlText += "<div class='col-xs-5'>";
                        htmlText += "<h6 id='" + _this.pageUI.header + "'>By [Author] at [Date]</h6>";
                        htmlText += "<textarea id='" + _this.pageUI.contnet + "' disabled='disabled'></textarea>";
                        htmlText += "<br />";
                        htmlText += "<div class='btn-group btn-group-sm' role='group' aria-label='Small button group' style='width:100%'>";
                        htmlText += "<div class='btn-custom-div'>";
                        htmlText += "<button id='" + _this.pageUI.replay + "' type='button' class='btn btn-default form-control'>Reply</button>";
                        htmlText += "</div>";
                        htmlText += "<div class='btn-custom-div'>";
                        htmlText += "<button id='" + _this.pageUI.add + "' type='button' class='btn btn-default form-control'>Add</button>";
                        htmlText += "</div>";
                        htmlText += "<div class='btn-custom-div'>";
                        htmlText += "<button id='" + _this.pageUI.deleteBtn + "' type='button' class='btn btn-default form-control'>Delete</button>";
                        htmlText += "</div>";
                        htmlText += "</div>";
                        htmlText += "<div id='" + _this.pageUI.treeView + "'/>";
                        htmlText += "</div>";
                        htmlText += "<fieldset class='col-xs-5' id='" + _this.pageUI.details + "'>";
                        htmlText += "<h6>Details</h6>";
                        htmlText += "<input id='" + _this.pageUI.author + "' type='text' class='form-control' placeholder='Author' aria-describedby='basic-addon1'>";
                        htmlText += "<div class='date-control'>";
                        htmlText += "<input  id='" + _this.pageUI.day + "' type='text' class='form-control' placeholder='Day'>";
                        htmlText += "</div>";
                        htmlText += "<div class='date-control'>";
                        htmlText += "<input  id='" + _this.pageUI.month + "' type='text' class='form-control' placeholder='Month'>";
                        htmlText += "</div>";
                        htmlText += "<div class='date-control'>";
                        htmlText += "<input id='" + _this.pageUI.year + "' type='text' class='form-control' placeholder='Year'>";
                        htmlText += "</div>";
                        htmlText += "<select id='" + _this.pageUI.status + "' class='form-control'>";
                        htmlText += "<option value='Accepted'>Accepted</option>";
                        htmlText += "<option value='Cancelled'>Cancelled</option>";
                        htmlText += "<option value='Completed'>Completed</option>";
                        htmlText += "<option value='Created'>Created</option>";
                        htmlText += "<option value='Modified'>Modified</option>";
                        htmlText += "<option value='None'>None</option>";
                        htmlText += "<option value='Rejected'>Rejected</option>";
                        htmlText += "<option value='Reply' selected>Reply</option>";
                        htmlText += "</select>";
                        htmlText += "<div class='checkbox'>";
                        htmlText += "<label>";
                        htmlText += "<input id='" + _this.pageUI.checked + "' type='checkbox'> Checked";
                        htmlText += "</label>";
                        htmlText += "</div>";
                        htmlText += "<textarea id='" + _this.pageUI.comment + "' placeholder='Comment'></textarea>";
                        htmlText += "</fieldset>";
                        htmlText += "</div>";
                        document.getElementById(_this.pageUI.page).innerHTML = htmlText;
                    };
                    this.treeView_SelectionChanged = function (ev) {
                        _this.updateUIState();
                        _this.reviewToDetails();
                    };
                }
                Object.defineProperty(ReviewsPage.prototype, "userName", {
                    get: function () { return this._userName; },
                    set: function (value) { this._userName = value; },
                    enumerable: true,
                    configurable: true
                });
                ReviewsPage.prototype.initialize = function () {
                    this.empty();
                    this.createUIElement();
                    this.addUIEventHandler();
                    this.treeView = new JavaScript.TreeView("treeViewDiv");
                    this.treeView.onSelectionChanged = this.treeView_SelectionChanged;
                };
                ReviewsPage.prototype.addUIEventHandler = function () {
                    $("#" + this.pageUI.author).bind("change", $.proxy(this.detailsTextBox_TextChanged, this));
                    $("#" + this.pageUI.day).bind("change", $.proxy(this.dateTimePicker_ValueChanged, this));
                    $("#" + this.pageUI.month).bind("change", $.proxy(this.dateTimePicker_ValueChanged, this));
                    $("#" + this.pageUI.year).bind("change", $.proxy(this.dateTimePicker_ValueChanged, this));
                    $("#" + this.pageUI.status).bind("change", $.proxy(this.detailsTextBox_TextChanged, this));
                    $("#" + this.pageUI.checked).bind("change", $.proxy(this.checkedCheckBox_ValueChanged, this));
                    $("#" + this.pageUI.comment).bind("change", $.proxy(this.detailsTextBox_TextChanged, this));
                    $("#" + this.pageUI.replay).bind("click", $.proxy(this.replayNode_Click, this));
                    $("#" + this.pageUI.add).bind("click", $.proxy(this.addNode_Click, this));
                    $("#" + this.pageUI.deleteBtn).bind("click", $.proxy(this.deleteNode_Click, this));
                };
                ReviewsPage.prototype.copyReviewsFrom = function (annObject) {
                    if (annObject == null)
                        throw new Error("annObject cannot be null");
                    this.updateContent(annObject);
                    for (var i = 0; i < annObject.reviews.length; i++) {
                        lt.Annotations.JavaScript.ReviewsPage.addNode(this.treeView, null, true, annObject.reviews[i]);
                    }
                    this.updateUIState();
                };
                ReviewsPage.prototype.updateContent = function (annObject) {
                    var metadata = annObject.metadata;
                    var author = "";
                    if (metadata[lt.Annotations.Core.AnnObject.authorMetadataKey] != undefined || metadata[lt.Annotations.Core.AnnObject.authorMetadataKey] != null)
                        author = metadata[lt.Annotations.Core.AnnObject.authorMetadataKey];
                    if (!author)
                        author = "[author]";
                    var lastModified = "";
                    if (metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey] != undefined || metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey] != null)
                        lastModified = metadata[lt.Annotations.Core.AnnObject.modifiedMetadataKey];
                    if (!lastModified)
                        lastModified = "[date]";
                    $("#" + this.pageUI.header).val("By " + author + " at " + lastModified);
                    var text = "";
                    if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(annObject)) {
                        var textObject = annObject;
                        text = textObject.text;
                    }
                    else {
                        if (metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] != undefined || metadata[lt.Annotations.Core.AnnObject.contentMetadataKey] != null)
                            text = metadata[lt.Annotations.Core.AnnObject.contentMetadataKey];
                    }
                    $("#" + this.pageUI.contnet).val(text);
                };
                ReviewsPage.prototype.replacesReviewsIn = function (annObject) {
                    if (annObject == null)
                        throw new Error("annObject cannot be null");
                    annObject.reviews.splice(0, annObject.reviews.length);
                    for (var i = 0; i < this.treeView.nodes.length; i++) {
                        lt.Annotations.JavaScript.ReviewsPage.getNode(this.treeView, this.treeView.nodes[i], annObject, null);
                    }
                };
                ReviewsPage.getNode = function (treeView, node, annObject, parentReview) {
                    var nodeReview = node != null ? node.tag : null;
                    var review = nodeReview != null ? nodeReview.clone() : null;
                    for (var i = 0; i < node.nodes.length; i++) {
                        lt.Annotations.JavaScript.ReviewsPage.getNode(treeView, node.nodes[i], annObject, review);
                    }
                    if (parentReview != null)
                        parentReview.replies.push(review);
                    else
                        annObject.reviews.push(review);
                };
                ReviewsPage.addNode = function (treeView, relativeNode, sibling, review) {
                    var node = new JavaScript.TreeNode(treeView);
                    node.tag = review != null ? review.clone() : null;
                    review = node.tag;
                    for (var i = 0; i < review.replies.length; i++) {
                        lt.Annotations.JavaScript.ReviewsPage.addNode(treeView, node, true, review.replies[i]);
                    }
                    review.replies.splice(0, review.replies.length);
                    if (sibling) {
                        if (relativeNode != null)
                            relativeNode.addNode(node);
                        else
                            treeView.addNode(node);
                    }
                    else {
                        if (relativeNode != null) {
                            if (relativeNode.parent != null)
                                relativeNode.parent.addNode(node);
                            else
                                treeView.addNode(node);
                        }
                        else {
                            treeView.addNode(node);
                        }
                    }
                    var label = document.createElement("label");
                    label.className = label.className + "treeNodeLabel";
                    label.textContent = this.getReviewNodeText(review);
                    node.content = label;
                    return node;
                };
                ReviewsPage.getReviewNodeText = function (review) {
                    var text = "";
                    if (review == null)
                        return text;
                    var author = review != null ? review.author : "";
                    if (!author)
                        author = "[author]";
                    text += author + ":  ";
                    var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    if (review != null) {
                        text += review.status.toLowerCase() + " " + monthArray[review.date.getMonth()] + " " + review.date.getDate() + " " + review.date.getFullYear();
                        text += "  " + review.comment;
                    }
                    return text;
                };
                ReviewsPage.prototype.updateUIState = function () {
                    var node = this.treeView.selectedNode;
                    var isDisabled = node != null ? false : true;
                    if (isDisabled) {
                        $("#" + this.pageUI.replay).prop("disabled", true);
                        $("#" + this.pageUI.deleteBtn).prop("disabled", true);
                        $("#" + this.pageUI.details).prop("disabled", true);
                        $("#" + this.pageUI.comment).prop("disabled", true);
                    }
                    else {
                        $("#" + this.pageUI.replay).prop("disabled", false);
                        $("#" + this.pageUI.deleteBtn).prop("disabled", false);
                        $("#" + this.pageUI.details).prop("disabled", false);
                        $("#" + this.pageUI.comment).prop("disabled", false);
                    }
                };
                ReviewsPage.prototype.replayNode_Click = function () {
                    this.addOrReply(this.treeView.selectedNode, true);
                };
                ReviewsPage.prototype.addNode_Click = function () {
                    this.addOrReply(null, false);
                };
                ReviewsPage.prototype.deleteNode_Click = function () {
                    this.deleteReview(this.treeView.selectedNode);
                };
                ReviewsPage.prototype.deleteReview = function (node) {
                    if (node == null)
                        return;
                    if (node.parent != null) {
                        var parentReview = node.parent.tag;
                        node.parent.deleteNode(node);
                    }
                    else
                        this.treeView.deleteNode(node);
                    this.updateUIState();
                    this.reviewToDetails();
                };
                ReviewsPage.prototype.addOrReply = function (node, isReply) {
                    var review = new lt.Annotations.Core.AnnReview();
                    review.author = this._userName;
                    review.date = this.date;
                    review.status = lt.Annotations.Core.AnnReview.reply;
                    review.comment = "";
                    var newNode = lt.Annotations.JavaScript.ReviewsPage.addNode(this.treeView, node, isReply, review);
                    this.treeView.selectedNode = newNode;
                    this.updateUIState();
                    this.reviewToDetails();
                };
                ReviewsPage.prototype.detailsTextBox_TextChanged = function () {
                    this.detailsToReview();
                };
                ReviewsPage.prototype.checkedCheckBox_ValueChanged = function () {
                    this.detailsToReview();
                };
                ReviewsPage.prototype.dateTimePicker_ValueChanged = function () {
                    this.detailsToReview();
                };
                ReviewsPage.prototype.reviewToDetails = function () {
                    var node = this.treeView.selectedNode;
                    var review = node != null ? node.tag : null;
                    $("#" + this.pageUI.details).prop("disabled", node != null ? false : true);
                    $("#" + this.pageUI.author).val(review != null ? review.author : "");
                    var date = review != null ? review.date : this.date;
                    $("#" + this.pageUI.day).val(date.getDate().toString());
                    $("#" + this.pageUI.month).val((date.getMonth() + 1).toString());
                    $("#" + this.pageUI.year).val(date.getFullYear().toString());
                    var statusSelectMenu = $("#" + this.pageUI.status);
                    if (review != null) {
                        statusSelectMenu[0].selectedIndex = this.getStatusSelectIndex(review.status);
                    }
                    else {
                        statusSelectMenu[0].selectedIndex = this.getStatusSelectIndex("accepted");
                    }
                    var isCheckedBox = document.getElementById(this.pageUI.checked);
                    if (review != null) {
                        isCheckedBox.checked = review.isChecked;
                    }
                    else {
                        isCheckedBox.checked = false;
                    }
                    $("#" + this.pageUI.comment).val(review != null ? review.comment : "");
                };
                ReviewsPage.prototype.detailsToReview = function () {
                    var node = this.treeView.selectedNode;
                    if (node == null)
                        return;
                    var review = node.tag;
                    var author = $("#" + this.pageUI.author).val();
                    var year = $("#" + this.pageUI.year).val();
                    if (year < 1900 || isNaN(year)) {
                        alert("Please Enter Valid Value");
                        year = 2014;
                    }
                    var month = $("#" + this.pageUI.month).val();
                    if (month < 1 || month > 12 || isNaN(month)) {
                        alert("Please Enter Valid Value");
                        month = 1;
                    }
                    else {
                        month -= 1;
                    }
                    var day = $("#" + this.pageUI.day).val();
                    if (day < 1 || day > 31 || isNaN(day)) {
                        alert("Please Enter Valid Value");
                        day = 1;
                    }
                    var date = new Date(year, month, day);
                    var status = $("#" + this.pageUI.status).val() == null ? "reply" : $("#" + this.pageUI.status).val().toLowerCase();
                    var isCheckedBox = document.getElementById(this.pageUI.checked);
                    var isChecked = isCheckedBox.checked;
                    var comment = $("#" + this.pageUI.comment).val();
                    if (review != null) {
                        if (review.author != author)
                            review.author = author;
                        if (review.date != date)
                            review.date = date;
                        if (review.status.toLowerCase() != status)
                            review.status = status;
                        if (review.isChecked != isChecked)
                            review.isChecked = isChecked;
                        if (review.comment != comment)
                            review.comment = comment;
                    }
                    var label = document.createElement("label");
                    label.className = label.className + "treeNodeLabel";
                    label.textContent = lt.Annotations.JavaScript.ReviewsPage.getReviewNodeText(review);
                    node.content = label;
                };
                ReviewsPage.prototype.getStatusSelectIndex = function (value) {
                    switch (value) {
                        case "accepted":
                            return 0;
                        case "cancelled":
                            return 1;
                        case "completed":
                            return 2;
                        case "created":
                            return 3;
                        case "modified":
                            return 4;
                        case "none":
                            return 5;
                        case "rejected":
                            return 6;
                        case "reply":
                            return 7;
                        default:
                            return 7;
                    }
                };
                ReviewsPage.prototype.cleanUp = function () {
                    $(this.pageUI.treeView).empty();
                    $(this.pageUI.treeView).remove();
                };
                return ReviewsPage;
            }());
            JavaScript.ReviewsPage = ReviewsPage;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var SnapToGridPropertiesDialog = (function () {
                function SnapToGridPropertiesDialog() {
                    this.dialogUI = {
                        dialog: "#snapToGridPropertiesDialog",
                        dialogNameLable: "#snapToGridPropertiesDialogName",
                        showGridInput: "snapToGridPropertiesShowGridInput",
                        gridColorSelect: "snapToGridPropertiesGridColorSelect",
                        lineStyleSelect: "snapToGridPropertiesLineStyleSelect",
                        gridLengthInput: "snapToGridPropertiesGridLengthInput",
                        lineSpacingInput: "snapToGridPropertiesLineSpacingInput",
                        enableSnapInput: "snapToGridPropertiesEnableSnapInput",
                        okBtn: "#snapToGridPropertiesOkBtn",
                    };
                    this.Init();
                }
                Object.defineProperty(SnapToGridPropertiesDialog.prototype, "automation", {
                    get: function () {
                        return this._automation;
                    },
                    set: function (value) {
                        this._automation = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                SnapToGridPropertiesDialog.prototype.Init = function () {
                    $(this.dialogUI.okBtn).bind("click", $.proxy(this.okBtn_Click, this));
                };
                SnapToGridPropertiesDialog.prototype.show = function () {
                    this._snapToGridOptions = this._automation.manager.snapToGridOptions.clone();
                    var showGridCheckBox = document.getElementById(this.dialogUI.showGridInput);
                    showGridCheckBox.checked = this._snapToGridOptions.showGrid;
                    var lineSpacingTextBox = document.getElementById(this.dialogUI.lineSpacingInput);
                    lineSpacingTextBox.value = this._snapToGridOptions.lineSpacing.toString();
                    var gridLengthTextBox = document.getElementById(this.dialogUI.gridLengthInput);
                    gridLengthTextBox.value = this._snapToGridOptions.gridLength.toString();
                    var gridColorComboBox = document.getElementById(this.dialogUI.gridColorSelect);
                    gridColorComboBox.selectedIndex = this.getSelectedColorFromStroke(this._snapToGridOptions.gridStroke);
                    var lineStyleComboBox = document.getElementById(this.dialogUI.lineStyleSelect);
                    lineStyleComboBox.selectedIndex = this.getLineStyleFromStrok(this._snapToGridOptions.gridStroke);
                    var enableSnapCheckBox = document.getElementById(this.dialogUI.enableSnapInput);
                    enableSnapCheckBox.checked = this._snapToGridOptions.enableSnap;
                    $(this.dialogUI.dialogNameLable).text("Snap To Grid Properties");
                    $(this.dialogUI.dialog).modal();
                };
                SnapToGridPropertiesDialog.prototype.getLineStyleFromStrok = function (annStroke) {
                    if (annStroke.strokeDashArray == null) {
                        return 0;
                    }
                    else {
                        return 1;
                    }
                };
                SnapToGridPropertiesDialog.prototype.getSelectedColorFromStroke = function (annStroke) {
                    var color = annStroke.stroke.color;
                    switch (color.toUpperCase()) {
                        case "BLACK":
                            return 0;
                        case "BLUE":
                            return 1;
                        case "GRAY":
                            return 2;
                        case "GREEN":
                            return 3;
                        case "RED":
                            return 4;
                        case "WHITE":
                            return 5;
                        case "YELLOW":
                            return 6;
                        default:
                            return -1;
                    }
                };
                Object.defineProperty(SnapToGridPropertiesDialog.prototype, "onHide", {
                    set: function (value) {
                        this._onHide = null;
                        this._onHide = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                SnapToGridPropertiesDialog.prototype.okBtn_Click = function (e) {
                    var showGridCheckBox = document.getElementById(this.dialogUI.showGridInput);
                    var lineSpacingTextBox = document.getElementById(this.dialogUI.lineSpacingInput);
                    var gridLengthTextBox = document.getElementById(this.dialogUI.gridLengthInput);
                    var gridColorComboBox = document.getElementById(this.dialogUI.gridColorSelect);
                    var lineStyleComboBox = document.getElementById(this.dialogUI.lineStyleSelect);
                    var enableSnapCheckBox = document.getElementById(this.dialogUI.enableSnapInput);
                    this._snapToGridOptions.showGrid = showGridCheckBox.checked;
                    this._snapToGridOptions.gridStroke.stroke = lt.Annotations.Core.AnnSolidColorBrush.create(gridColorComboBox.value.toString());
                    if (lineStyleComboBox.selectedIndex == 0)
                        this._snapToGridOptions.gridStroke.strokeDashArray = null;
                    else
                        this._snapToGridOptions.gridStroke.strokeDashArray = [4, 4];
                    this._snapToGridOptions.gridLength = parseInt(gridLengthTextBox.value);
                    this._snapToGridOptions.lineSpacing = parseInt(lineSpacingTextBox.value);
                    this._snapToGridOptions.enableSnap = enableSnapCheckBox.checked;
                    this._automation.manager.snapToGridOptions = this._snapToGridOptions.clone();
                    if (this._onHide != null) {
                        this._onHide();
                    }
                    $(this.dialogUI.dialog).modal("hide");
                };
                return SnapToGridPropertiesDialog;
            }());
            JavaScript.SnapToGridPropertiesDialog = SnapToGridPropertiesDialog;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            (function (AnnCursorType) {
                AnnCursorType[AnnCursorType["selectObject"] = 0] = "selectObject";
                AnnCursorType[AnnCursorType["selectedObject"] = 1] = "selectedObject";
                AnnCursorType[AnnCursorType["controlPoint"] = 2] = "controlPoint";
                AnnCursorType[AnnCursorType["controlPointNWSE"] = 3] = "controlPointNWSE";
                AnnCursorType[AnnCursorType["controlPointNS"] = 4] = "controlPointNS";
                AnnCursorType[AnnCursorType["controlPointNESW"] = 5] = "controlPointNESW";
                AnnCursorType[AnnCursorType["controlPointWE"] = 6] = "controlPointWE";
                AnnCursorType[AnnCursorType["selectRectangle"] = 7] = "selectRectangle";
                AnnCursorType[AnnCursorType["run"] = 8] = "run";
                AnnCursorType[AnnCursorType["rotateCenterControlPoint"] = 9] = "rotateCenterControlPoint";
                AnnCursorType[AnnCursorType["rotateGripperControlPoint"] = 10] = "rotateGripperControlPoint";
                AnnCursorType[AnnCursorType["Default"] = 11] = "Default";
                AnnCursorType[AnnCursorType["count"] = 12] = "count";
            })(JavaScript.AnnCursorType || (JavaScript.AnnCursorType = {}));
            var AnnCursorType = JavaScript.AnnCursorType;
            var AutomationManagerHelper = (function () {
                function AutomationManagerHelper(manager, resourcesPath) {
                    this._resourcesPath = "../Resources";
                    this._drawCursors = {};
                    this._objectsImages = {};
                    if (manager == null)
                        alert("Error, AnnAutomationManager is null");
                    this._manager = manager;
                    if (this._manager.renderingEngine == null) {
                        this._manager.renderingEngine = new lt.Annotations.Rendering.AnnHtml5RenderingEngine();
                    }
                    AutomationManagerHelper._automationCursors[AnnCursorType.controlPoint] = "url('##RESOURCES_PATH##/Cursors/Edit/ControlPoint.cur'),default";
                    AutomationManagerHelper._automationCursors[AnnCursorType.rotateCenterControlPoint] = "url('##RESOURCES_PATH##/Cursors/Edit/Anchor.cur'), default";
                    AutomationManagerHelper._automationCursors[AnnCursorType.rotateGripperControlPoint] = "url('##RESOURCES_PATH##/Cursors/Edit/Rotate.cur'),default";
                    AutomationManagerHelper._automationCursors[AnnCursorType.selectObject] = "url('##RESOURCES_PATH##/Cursors/Edit/SelectObject.cur'), default";
                    AutomationManagerHelper._automationCursors[AnnCursorType.selectedObject] = "url('##RESOURCES_PATH##/Cursors/Edit/SelectedObject.cur'),default";
                    AutomationManagerHelper._automationCursors[AnnCursorType.run] = "pointer";
                    this.updateResourcePaths(resourcesPath);
                    if (lt.LTHelper.supportsMouse) {
                        lt.Controls.InteractiveService.registerGlobalModifierKeys();
                        var callbacks = lt.Annotations.Automation.AnnAutomationManager.platformCallbacks;
                        callbacks.checkModifier = AutomationManagerHelper.checkModifierKey;
                    }
                    this.updateAutomationObjects();
                }
                Object.defineProperty(AutomationManagerHelper.prototype, "automationManager", {
                    get: function () {
                        return this._manager;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationManagerHelper.prototype, "drawCursors", {
                    get: function () {
                        return this._drawCursors;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationManagerHelper.prototype, "automationCursors", {
                    get: function () {
                        return AutomationManagerHelper._automationCursors;
                    },
                    enumerable: true,
                    configurable: true
                });
                AutomationManagerHelper.prototype.updateResourcePaths = function (resourcesPath) {
                    for (var key in AutomationManagerHelper._drawCursorsTemplate) {
                        var originalValue = AutomationManagerHelper._drawCursorsTemplate[key];
                        var thisValue = originalValue.replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                        this._drawCursors[key] = thisValue;
                    }
                    for (var key in AutomationManagerHelper._objectsImagesTemplate) {
                        var originalValue = AutomationManagerHelper._objectsImagesTemplate[key];
                        var thisValue = originalValue.replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                        this._objectsImages[key] = thisValue;
                    }
                    AutomationManagerHelper._automationCursors[AnnCursorType.controlPoint] = AutomationManagerHelper._automationCursors[AnnCursorType.controlPoint].replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                    AutomationManagerHelper._automationCursors[AnnCursorType.rotateCenterControlPoint] = AutomationManagerHelper._automationCursors[AnnCursorType.rotateCenterControlPoint].replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                    AutomationManagerHelper._automationCursors[AnnCursorType.rotateGripperControlPoint] = AutomationManagerHelper._automationCursors[AnnCursorType.rotateGripperControlPoint].replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                    AutomationManagerHelper._automationCursors[AnnCursorType.selectObject] = AutomationManagerHelper._automationCursors[AnnCursorType.selectObject].replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                    AutomationManagerHelper._automationCursors[AnnCursorType.selectedObject] = AutomationManagerHelper._automationCursors[AnnCursorType.selectedObject].replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                    JavaScript.ReviewTreeNode.undoImageUrl = AutomationManagerHelper._undoImageUrlTemplate.replace(AutomationManagerHelper._resourcesTamplate, resourcesPath);
                };
                AutomationManagerHelper.prototype.updateAutomationObjects = function () {
                    if (this._manager == null)
                        return;
                    for (var i = 0; i < this._manager.objects.count; i++) {
                        var automationObject = this._manager.objects.item(i);
                        AutomationManagerHelper.updateAutomationObject(automationObject);
                    }
                };
                AutomationManagerHelper.updateAutomationObject = function (automationObject) {
                    if (automationObject.objectTemplate != null && automationObject.objectTemplate.supportsFill && automationObject.objectTemplate.fill == null)
                        automationObject.objectTemplate.fill = lt.Annotations.Core.AnnSolidColorBrush.create("transparent");
                };
                AutomationManagerHelper.prototype.getAutomationObjectCursor = function (objectId) {
                    if (objectId == lt.Annotations.Core.AnnObject.imageObjectId)
                        return null;
                    if (objectId == lt.Annotations.Core.AnnObject.textHiliteObjectId ||
                        objectId == lt.Annotations.Core.AnnObject.textStrikeoutObjectId ||
                        objectId == lt.Annotations.Core.AnnObject.textUnderlineObjectId ||
                        objectId == lt.Annotations.Core.AnnObject.textRedactionObjectId)
                        return "text";
                    if (objectId == lt.Annotations.Core.AnnObject.stickyNoteObjectId)
                        return "crosshair";
                    var annObject = this._manager.findObjectById(objectId);
                    if (annObject != null) {
                        return this._drawCursors[objectId.toString()];
                    }
                    return null;
                };
                AutomationManagerHelper.prototype.getAutomationObjectImage = function (objectId) {
                    var annObject = this._manager.findObjectById(objectId);
                    if (annObject != null) {
                        return this._objectsImages[objectId.toString()];
                    }
                    return null;
                };
                AutomationManagerHelper.checkModifierKey = function (annKey) {
                    var AnnKeys = lt.Annotations.Core.AnnKeys;
                    var ControlsKeys = lt.Controls.Keys;
                    var ControlsModifierKeys = lt.Controls.InteractiveService.modifierKeys;
                    if ((annKey & AnnKeys.shift) == AnnKeys.shift)
                        return (ControlsModifierKeys & ControlsKeys.shift) === ControlsKeys.shift;
                    if ((annKey & lt.Annotations.Core.AnnKeys.control) == lt.Annotations.Core.AnnKeys.control)
                        return (ControlsModifierKeys & ControlsKeys.control) === ControlsKeys.control;
                    if ((annKey & lt.Annotations.Core.AnnKeys.alt) == lt.Annotations.Core.AnnKeys.alt)
                        return (ControlsModifierKeys & ControlsKeys.alt) === ControlsKeys.alt;
                    return false;
                };
                AutomationManagerHelper.prototype.LoadPackage = function (annPackage) {
                    if (annPackage != null) {
                        var handler = this._manager.objects.collectionChanged.add(function (sender, e) {
                            if (e.action == lt.Annotations.Core.AnnNotifyCollectionChangedAction.add) {
                                for (var i = 0; i < e.newItems.length; i++)
                                    var automationObject = e.newItems[i];
                                AutomationManagerHelper.updateAutomationObject(automationObject);
                            }
                        });
                        this._manager.loadPackage(annPackage, annPackage.get_friendlyName());
                        this._manager.objects.collectionChanged.remove(handler);
                    }
                };
                AutomationManagerHelper._resourcesTamplate = "##RESOURCES_PATH##";
                AutomationManagerHelper._drawCursorsTemplate = {
                    "-2": "url('##RESOURCES_PATH##/Cursors/Draw/ToolLine.cur'),default",
                    "-3": "url('##RESOURCES_PATH##/Cursors/Draw/ToolRectangle.cur'),default",
                    "-4": "url('##RESOURCES_PATH##/Cursors/Draw/ToolEllipse.cur'),default",
                    "-5": "url('##RESOURCES_PATH##/Cursors/Draw/ToolPolyline.cur'),default",
                    "-6": "url('##RESOURCES_PATH##/Cursors/Draw/ToolPolygon.cur'),default",
                    "-7": "url('##RESOURCES_PATH##/Cursors/Draw/ToolCurve.cur'),default",
                    "-8": "url('##RESOURCES_PATH##/Cursors/Draw/ToolClosedCurve.cur'),default",
                    "-9": "url('##RESOURCES_PATH##/Cursors/Draw/ToolPointer.cur'),default",
                    "-10": "url('##RESOURCES_PATH##/Cursors/Draw/ToolFreehand.cur'),default",
                    "-11": "url('##RESOURCES_PATH##/Cursors/Draw/ToolHilite.cur'),default",
                    "-12": "url('##RESOURCES_PATH##/Cursors/Draw/ToolText.cur'),default",
                    "-14": "url('##RESOURCES_PATH##/Cursors/Draw/ToolTextPointer.cur'),default",
                    "-15": "url('##RESOURCES_PATH##/Cursors/Draw/ToolNote.cur'),default",
                    "-16": "url('##RESOURCES_PATH##/Cursors/Draw/ToolStamp.cur'),default",
                    "-17": "url('##RESOURCES_PATH##/Cursors/Draw/ToolRubberStamp.cur'),default",
                    "-18": "url('##RESOURCES_PATH##/Cursors/Draw/ToolHotspot.cur'),default",
                    "-19": "url('##RESOURCES_PATH##/Cursors/Draw/ToolFreehandHotspot.cur'),default",
                    "-21": "url('##RESOURCES_PATH##/Cursors/Draw/ToolPoint.cur'),default",
                    "-22": "url('##RESOURCES_PATH##/Cursors/Draw/ToolRedaction.cur'),default",
                    "-23": "url('##RESOURCES_PATH##/Cursors/Draw/ToolRuler.cur'),default",
                    "-24": "url('##RESOURCES_PATH##/Cursors/Draw/ToolPolyruler.cur'),default",
                    "-25": "url('##RESOURCES_PATH##/Cursors/Draw/ToolProtractor.cur'),default",
                    "-26": "url('##RESOURCES_PATH##/Cursors/Draw/ToolCrossProduct.cur'),default",
                    "-13": "url('##RESOURCES_PATH##/Cursors/Draw/ToolTextRollup.cur'),default",
                    "-28": "url('##RESOURCES_PATH##/Cursors/Draw/ToolAudio.cur'),default",
                    "-30": "url('##RESOURCES_PATH##/Cursors/Draw/ToolVideo.cur'),default",
                    "-27": "url('##RESOURCES_PATH##/Cursors/Draw/ToolEncrypt.cur'),default"
                };
                AutomationManagerHelper._objectsImagesTemplate = {
                    "-2": "##RESOURCES_PATH##/Images/Icons/Line.png",
                    "-3": "##RESOURCES_PATH##/Images/Icons/Rectangle.png",
                    "-4": "##RESOURCES_PATH##/Images/Icons/Circle.png",
                    "-5": "##RESOURCES_PATH##/Images/Icons/Polyline.png",
                    "-6": "##RESOURCES_PATH##/Images/Icons/Polygon.png",
                    "-7": "##RESOURCES_PATH##/Images/Icons/SCurve.png",
                    "-8": "##RESOURCES_PATH##/Images/Icons/BSpline.png",
                    "-9": "##RESOURCES_PATH##/Images/Icons/Pointer.png",
                    "-10": "##RESOURCES_PATH##/Images/Icons/Pen.png",
                    "-11": "##RESOURCES_PATH##/Images/Icons/Highlight.png",
                    "-12": "##RESOURCES_PATH##/Images/Icons/A.png",
                    "-14": "##RESOURCES_PATH##/Images/Icons/AArrow.png",
                    "-15": "##RESOURCES_PATH##/Images/Icons/Note.png",
                    "-16": "##RESOURCES_PATH##/Images/Icons/Image.png",
                    "-17": "##RESOURCES_PATH##/Images/Icons/Stamp.png",
                    "-18": "##RESOURCES_PATH##/Images/Icons/H.png",
                    "-19": "##RESOURCES_PATH##/Images/Icons/HSquiggles.png",
                    "-21": "##RESOURCES_PATH##/Images/Icons/RoundX.png",
                    "-22": "##RESOURCES_PATH##/Images/Icons/Redact.png",
                    "-23": "##RESOURCES_PATH##/Images/Icons/Ruler.png",
                    "-24": "##RESOURCES_PATH##/Images/Icons/90DegreeRuler.png",
                    "-25": "##RESOURCES_PATH##/Images/Icons/Protractor.png",
                    "-26": "##RESOURCES_PATH##/Images/Icons/Intersect.png",
                    "-13": "##RESOURCES_PATH##/Images/Icons/Pin.png",
                    "-28": "##RESOURCES_PATH##/Images/Icons/Sound.png",
                    "-30": "##RESOURCES_PATH##/Images/Icons/Video.png",
                    "-27": "##RESOURCES_PATH##/Images/Icons/Lock.png",
                    "-33": "##RESOURCES_PATH##/Images/Icons/THighlight.png",
                    "-34": "##RESOURCES_PATH##/Images/Icons/Strikethrough.png",
                    "-35": "##RESOURCES_PATH##/Images/Icons/Underline.png",
                    "-36": "##RESOURCES_PATH##/Images/Icons/TRedact.png",
                    "-32": "##RESOURCES_PATH##/Images/Icons/StickyNotes.png",
                };
                AutomationManagerHelper._undoImageUrlTemplate = "url('##RESOURCES_PATH##/Images/Icons/Undo.png')";
                AutomationManagerHelper._automationCursors = {};
                return AutomationManagerHelper;
            }());
            JavaScript.AutomationManagerHelper = AutomationManagerHelper;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var AutomationImageViewer = (function (_super) {
                __extends(AutomationImageViewer, _super);
                function AutomationImageViewer(createOptions) {
                    var _this = this;
                    _super.call(this, createOptions);
                    this.handleGotFocus = function () {
                        _this.automationGotFocus.invoke(_this, lt.LeadEventArgs.empty);
                    };
                    this.automationPointerDown = lt.LeadEvent.create(this, "automationPointerDown");
                    this.automationPointerMove = lt.LeadEvent.create(this, "automationPointerMove");
                    this.automationPointerUp = lt.LeadEvent.create(this, "automationPointerUp");
                    this.automationDoubleClick = lt.LeadEvent.create(this, "automationDoubleClick");
                    this.automationEnabledChanged = lt.LeadEvent.create(this, "automationEnabledChanged");
                    this.automationLostFocus = lt.LeadEvent.create(this, "automationLostFocus");
                    this.automationGotFocus = lt.LeadEvent.create(this, "automationGotFocus");
                    this.automationSizeChanged = lt.LeadEvent.create(this, "automationSizeChanged");
                    this.automationTransformChanged = lt.LeadEvent.create(this, "automationTransformChanged");
                    this.automationUseDpiChanged = lt.LeadEvent.create(this, "automationUseDpiChanged");
                    this.automationAntiAlias = false;
                    this.renderingEngine = null;
                    this.automationContainerIndex = -1;
                    this.get_interactiveService().add_tap(this.handleGotFocus);
                }
                AutomationImageViewer.prototype.get_automationObject = function () { return this.automationObject; };
                AutomationImageViewer.prototype.set_automationObject = function (value) { this.automationObject = value; };
                AutomationImageViewer.prototype.add_automationPointerDown = function (value) { this.automationPointerDown.add(value); };
                AutomationImageViewer.prototype.remove_automationPointerDown = function (value) { this.automationPointerDown.remove(value); };
                AutomationImageViewer.prototype.add_automationPointerMove = function (value) { this.automationPointerMove.add(value); };
                AutomationImageViewer.prototype.remove_automationPointerMove = function (value) { this.automationPointerMove.remove(value); };
                AutomationImageViewer.prototype.add_automationPointerUp = function (value) { this.automationPointerUp.add(value); };
                AutomationImageViewer.prototype.remove_automationPointerUp = function (value) { this.automationPointerUp.remove(value); };
                AutomationImageViewer.prototype.add_automationDoubleClick = function (value) { this.automationDoubleClick.add(value); };
                AutomationImageViewer.prototype.remove_automationDoubleClick = function (value) { this.automationDoubleClick.remove(value); };
                AutomationImageViewer.prototype.onAutomationPointerDown = function (args) {
                    if (this.automationPointerDown != null) {
                        this.automationPointerDown.invoke(this, args);
                    }
                };
                AutomationImageViewer.prototype.onAutomationPointerMove = function (args) {
                    if (this.automationPointerMove != null)
                        this.automationPointerMove.invoke(this, args);
                };
                AutomationImageViewer.prototype.onAutomationPointerUp = function (args) {
                    if (this.automationPointerUp != null)
                        this.automationPointerUp.invoke(this, args);
                };
                AutomationImageViewer.prototype.onAutomationDoubleClick = function (args) {
                    if (this.automationDoubleClick != null)
                        this.automationDoubleClick.invoke(this, args);
                };
                AutomationImageViewer.prototype.get_automationDpiX = function () { return 96; };
                AutomationImageViewer.prototype.get_automationDpiY = function () { return 96; };
                AutomationImageViewer.prototype.get_automationEnabled = function () { return true; };
                AutomationImageViewer.prototype.add_automationEnabledChanged = function (value) { this.automationEnabledChanged.add(value); };
                AutomationImageViewer.prototype.remove_automationEnabledChanged = function (value) { this.automationEnabledChanged.remove(value); };
                AutomationImageViewer.prototype.onEnabledChanged = function (e) {
                    if (this.automationEnabledChanged != null)
                        this.automationEnabledChanged.invoke(this, lt.LeadEventArgs.empty);
                };
                AutomationImageViewer.prototype.add_automationLostFocus = function (value) { this.automationLostFocus.add(value); };
                AutomationImageViewer.prototype.remove_automationLostFocus = function (value) { this.automationLostFocus.remove(value); };
                AutomationImageViewer.prototype.add_automationGotFocus = function (value) { this.automationGotFocus.add(value); };
                AutomationImageViewer.prototype.remove_automationGotFocus = function (value) { this.automationGotFocus.remove(value); };
                AutomationImageViewer.prototype.add_automationSizeChanged = function (value) { this.automationSizeChanged.add(value); };
                AutomationImageViewer.prototype.remove_automationSizeChanged = function (value) { this.automationSizeChanged.remove(value); };
                AutomationImageViewer.prototype.onItemChanged = function (e) {
                    switch (e.get_reason()) {
                        case lt.Controls.ImageViewerItemChangedReason.url:
                        case lt.Controls.ImageViewerItemChangedReason.image:
                        case lt.Controls.ImageViewerItemChangedReason.imageChanged:
                        case lt.Controls.ImageViewerItemChangedReason.size:
                        case lt.Controls.ImageViewerItemChangedReason.transform:
                            if (this.isAutomationAttached) {
                                if (this.automationTransformChanged != null)
                                    this.automationTransformChanged.invoke(this, lt.LeadEventArgs.empty);
                                if (this.automationSizeChanged != null)
                                    this.automationSizeChanged.invoke(this, lt.LeadEventArgs.empty);
                            }
                            break;
                        default:
                            break;
                    }
                    _super.prototype.onItemChanged.call(this, e);
                };
                AutomationImageViewer.prototype.get_automationTransform = function () { return this.getImageTransformWithDpi(false); };
                AutomationImageViewer.prototype.add_automationTransformChanged = function (value) { this.automationTransformChanged.add(value); };
                AutomationImageViewer.prototype.remove_automationTransformChanged = function (value) { this.automationTransformChanged.remove(value); };
                AutomationImageViewer.prototype.onTransformChanged = function (e) {
                    _super.prototype.onTransformChanged.call(this, e);
                    if (this.isAutomationAttached() && this.automationTransformChanged != null) {
                        this.automationTransformChanged.invoke(this, lt.LeadEventArgs.empty);
                    }
                };
                AutomationImageViewer.prototype.get_automationUseDpi = function () { return this.useDpi; };
                AutomationImageViewer.prototype.add_automationUseDpiChanged = function (value) { this.automationUseDpiChanged.add(value); };
                AutomationImageViewer.prototype.remove_automationUseDpiChanged = function (value) { this.automationUseDpiChanged.remove(value); };
                AutomationImageViewer.prototype.get_useDpi = function () { return _super.prototype.get_useDpi.call(this); };
                AutomationImageViewer.prototype.set_useDpi = function (value) {
                    if (_super.prototype.get_useDpi.call(this) != value) {
                        _super.prototype.set_useDpi.call(this, value);
                        if (this.automationUseDpiChanged != null)
                            this.automationUseDpiChanged.invoke(this, lt.LeadEventArgs.empty);
                    }
                };
                AutomationImageViewer.prototype.get_automationXResolution = function () { return this.imageResolution.width; };
                AutomationImageViewer.prototype.get_automationYResolution = function () { return this.imageResolution.height; };
                AutomationImageViewer.prototype.automationInvalidate = function (rc) {
                    if (rc.isEmpty) {
                        this.invalidate(lt.LeadRectD.empty);
                    }
                    else {
                        var rect = lt.LeadRectD.create((rc.x + 0.5), (rc.y + 0.5), (rc.width + 0.5), (rc.height + 0.5));
                        this.invalidate(rect);
                    }
                };
                AutomationImageViewer.prototype.get_automationAntiAlias = function () { return this.automationAntiAlias; };
                AutomationImageViewer.prototype.set_automationAntiAlias = function (value) {
                    this.automationAntiAlias = value;
                    this.invalidate(lt.LeadRectD.empty);
                };
                AutomationImageViewer.prototype.get_renderingEngine = function () { return this.renderingEngine; };
                AutomationImageViewer.prototype.set_renderingEngine = function (value) { this.renderingEngine = value; };
                AutomationImageViewer.prototype.onPostRender = function (e) {
                    if (e == null)
                        alert("Error, ImageViewerRenderEventArgs equals null");
                    if (this.isAutomationAttached()) {
                        var engine = this.get_renderingEngine();
                        var context = e.context;
                        var saveSmoothingMode = context.msImageSmoothingEnabled;
                        try {
                            if (this.get_automationAntiAlias()) {
                                if (context.msImageSmoothingEnabled != true)
                                    context.msImageSmoothingEnabled = true;
                            }
                            else {
                                if (context.msImageSmoothingEnabled != false)
                                    context.msImageSmoothingEnabled = false;
                            }
                            if (this.automationGetContainersCallback != null) {
                                var containers = this.automationGetContainersCallback().toArray();
                                for (var i = 0; i < containers.length; i++) {
                                    lt.Annotations.JavaScript.AutomationImageViewer.renderContainer(e, engine, containers[i]);
                                }
                            }
                            else {
                                lt.Annotations.JavaScript.AutomationImageViewer.renderContainer(e, engine, this.container);
                            }
                        }
                        finally {
                            if (context.msImageSmoothingEnabled != saveSmoothingMode)
                                context.msImageSmoothingEnabled = saveSmoothingMode;
                        }
                    }
                    _super.prototype.onPostRender.call(this, e);
                };
                AutomationImageViewer.renderContainer = function (e, engine, container) {
                    var context = e.get_context();
                    var clipRectangle = e.get_clipRectangle();
                    try {
                        engine.attach(container, context);
                        var rc = lt.LeadRectD.empty;
                        engine.render(rc, true);
                    }
                    finally {
                        engine.detach();
                    }
                };
                AutomationImageViewer.prototype.get_automationGetContainersCallback = function () { return this.automationGetContainersCallback; };
                AutomationImageViewer.prototype.set_automationGetContainersCallback = function (value) { this.automationGetContainersCallback = value; };
                AutomationImageViewer.prototype.get_automationContainerIndex = function () { return this.automationContainerIndex; };
                AutomationImageViewer.prototype.set_automationContainerIndex = function (value) { this.automationContainerIndex = value; };
                AutomationImageViewer.prototype.automationAttach = function (container) {
                    this.container = container;
                };
                AutomationImageViewer.prototype.automationDetach = function () { this.container = null; };
                AutomationImageViewer.prototype.get_automationContainer = function () { return this.container; };
                AutomationImageViewer.prototype.isAutomationAttached = function () { return this.renderingEngine != null; };
                AutomationImageViewer.prototype.get_automationDataProvider = function () { return this.automationDataProvider; };
                AutomationImageViewer.prototype.set_automationDataProvider = function (value) { this.automationDataProvider = value; };
                AutomationImageViewer.prototype.get_automationScrollOffset = function () {
                    return this.get_scrollOffset();
                };
                return AutomationImageViewer;
            }(lt.Controls.ImageViewer));
            JavaScript.AutomationImageViewer = AutomationImageViewer;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var AutomationInteractiveMode = (function (_super) {
                __extends(AutomationInteractiveMode, _super);
                function AutomationInteractiveMode() {
                    var _this = this;
                    _super.call(this);
                    this.automationId = AutomationInteractiveMode.userModeId;
                    this._id = this.automationId;
                    this.interactiveService_DragStarted = function (sender, e) {
                        if (_this.canStartWork(e)) {
                            _this.onWorkStarted(lt.LeadEventArgs.empty);
                            var annArgs = lt.Annotations.JavaScript.AutomationInteractiveMode.convertPointerEventArgs(e, false);
                            if (!e.isHandled) {
                                _this.workAutomationControl.onAutomationPointerDown(annArgs);
                                e.isHandled = annArgs.isHandled;
                                if (!e.isHandled)
                                    _this.onWorkCompleted(lt.LeadEventArgs.empty);
                            }
                        }
                    };
                    this.interactiveService_DragDelta = function (sender, e) {
                        if (_this.isWorking) {
                            var annArgs = lt.Annotations.JavaScript.AutomationInteractiveMode.convertPointerEventArgs(e, false);
                            if (!e.isHandled) {
                                _this.workAutomationControl.onAutomationPointerMove(annArgs);
                                e.isHandled = annArgs.isHandled;
                            }
                        }
                    };
                    this.interactiveService_DragCompleted = function (sender, e) {
                        if (_this.isWorking) {
                            var annArgs = lt.Annotations.JavaScript.AutomationInteractiveMode.convertPointerEventArgs(e, false);
                            if (!e.isHandled) {
                                _this.workAutomationControl.onAutomationPointerUp(annArgs);
                                e.isHandled = annArgs.isHandled;
                                _this.onWorkCompleted(lt.LeadEventArgs.empty);
                            }
                        }
                    };
                    this.interactiveService_Tap = function (sender, e) {
                        if (!_this.isWorking && _this.canStartWork(e)) {
                            var annArgs = lt.Annotations.JavaScript.AutomationInteractiveMode.convertPointerEventArgs(e, true);
                            if (!e.isHandled) {
                                _this.workAutomationControl.onAutomationPointerUp(annArgs);
                                e.isHandled = annArgs.isHandled;
                            }
                        }
                    };
                    this.interactiveService_DoubleTap = function (sender, e) {
                        if (_this.canStartWork(e)) {
                            var annArgs = lt.Annotations.JavaScript.AutomationInteractiveMode.convertPointerEventArgs(e, true);
                            if (!e.isHandled) {
                                _this.onWorkStarted(lt.LeadEventArgs.empty);
                                _this.workAutomationControl.onAutomationDoubleClick(annArgs);
                                e.isHandled = annArgs.isHandled;
                                _this.onWorkCompleted(lt.LeadEventArgs.empty);
                            }
                        }
                    };
                    this.interactiveService_Move = function (sender, e) {
                        if (_this.workAutomationControl == null) {
                            return;
                        }
                        var annArgs = lt.Annotations.JavaScript.AutomationInteractiveMode.convertPointerEventArgs(e, false);
                        _this.workAutomationControl.onAutomationPointerMove(annArgs);
                    };
                    this.mouseButtons = lt.Controls.MouseButtons.left;
                    this.autoItemMode = lt.Controls.ImageViewerAutoItemMode.autoSet;
                    this.itemPart = lt.Controls.ImageViewerItemPart.image;
                    this.workOnBounds = false;
                    this.isDragMouseWheelEnabled = false;
                }
                AutomationInteractiveMode.prototype.get_id = function () { return this._id; };
                AutomationInteractiveMode.prototype.setId = function (value) {
                    this._id = value;
                };
                Object.defineProperty(AutomationInteractiveMode.prototype, "automationControl", {
                    get: function () {
                        return this._automationControl;
                    },
                    set: function (value) {
                        this._automationControl = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AutomationInteractiveMode.prototype, "workAutomationControl", {
                    get: function () {
                        if (this._automationControl != null)
                            return this._automationControl;
                        else
                            return (this.imageViewer);
                    },
                    enumerable: true,
                    configurable: true
                });
                AutomationInteractiveMode.prototype.get_name = function () {
                    return "AutomationInteractiveMode";
                };
                AutomationInteractiveMode.prototype.canStartWork = function (e) {
                    return _super.prototype.canStartWork.call(this, e) && this.workAutomationControl != null;
                };
                AutomationInteractiveMode.prototype.start = function (imageViewer) {
                    _super.prototype.start.call(this, imageViewer);
                    var interactiveService = this.interactiveService;
                    this._dragStartedHandler = interactiveService.dragStarted.add(this.interactiveService_DragStarted);
                    this._dragDeltaHandler = interactiveService.dragDelta.add(this.interactiveService_DragDelta);
                    this._dragCompletedHandler = interactiveService.dragCompleted.add(this.interactiveService_DragCompleted);
                    this._tapHandler = interactiveService.tap.add(this.interactiveService_Tap);
                    this._doubleTapHandler = interactiveService.doubleTap.add(this.interactiveService_DoubleTap);
                    this._moveHandler = interactiveService.move.add(this.interactiveService_Move);
                };
                AutomationInteractiveMode.prototype.stop = function (imageViewer) {
                    if (this.isStarted) {
                        var interactiveService = _super.prototype.get_interactiveService.call(this);
                        interactiveService.dragStarted.remove(this._dragStartedHandler);
                        interactiveService.dragDelta.remove(this._dragDeltaHandler);
                        interactiveService.dragCompleted.remove(this._dragCompletedHandler);
                        interactiveService.tap.remove(this.interactiveService_Tap);
                        interactiveService.doubleTap.remove(this._doubleTapHandler);
                        interactiveService.move.remove(this._moveHandler);
                        _super.prototype.stop.call(this, imageViewer);
                    }
                };
                AutomationInteractiveMode.convertPointerEventArgs = function (e, isDoubleTap) {
                    var point = lt.LeadPointD.create(e.position.x, e.position.y);
                    var mouseButton = lt.Annotations.Core.AnnMouseButton.none;
                    if (!isDoubleTap) {
                        if (e.mouseButton == lt.Controls.MouseButtons.left)
                            mouseButton = lt.Annotations.Core.AnnMouseButton.left;
                        if (e.mouseButton == lt.Controls.MouseButtons.right)
                            mouseButton = lt.Annotations.Core.AnnMouseButton.right;
                    }
                    else {
                        mouseButton = lt.Annotations.Core.AnnMouseButton.left;
                    }
                    var args = lt.Annotations.Core.AnnPointerEventArgs.create(mouseButton, point);
                    args.isHandled = e.isHandled;
                    return args;
                };
                return AutomationInteractiveMode;
            }(lt.Controls.ImageViewerInteractiveMode));
            JavaScript.AutomationInteractiveMode = AutomationInteractiveMode;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var DocumentPackDialog = (function () {
                function DocumentPackDialog() {
                    this.dialogUI = {
                        dialog: "#documentPackDialog",
                        CancelBtn: "#documentPackDlg_Cancel",
                        dialogNameLable: "#documentPackDialogName",
                        documentObjectBtns: ".documentObjectBtn",
                    };
                    this.Init();
                }
                DocumentPackDialog.prototype.Init = function () {
                    $(this.dialogUI.CancelBtn).bind("click", $.proxy(this.CancelBtn_Click, this));
                    $(this.dialogUI.documentObjectBtns).bind("click", $.proxy(this.documentObjectBtns_BtnClicked, this));
                    $(this.dialogUI.dialog).on('hidden.bs.modal', $.proxy(this.documentPackDialog_Hide, this));
                };
                DocumentPackDialog.prototype.show = function () {
                    this._objectID = lt.Annotations.Core.AnnObject.selectObjectId;
                    $(this.dialogUI.dialogNameLable).text("Document Pack");
                    $(this.dialogUI.dialog).modal();
                };
                Object.defineProperty(DocumentPackDialog.prototype, "objectID", {
                    get: function () {
                        return this._objectID;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DocumentPackDialog.prototype, "onHide", {
                    set: function (value) {
                        this._onHide = null;
                        this._onHide = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                DocumentPackDialog.prototype.documentPackDialog_Hide = function (e) {
                    if (this._onHide != null) {
                        this._onHide(this._objectID);
                    }
                };
                DocumentPackDialog.prototype.documentObjectBtns_BtnClicked = function (e) {
                    this._objectID = parseInt($(e.currentTarget).val());
                    $(this.dialogUI.dialog).modal("hide");
                };
                DocumentPackDialog.prototype.CancelBtn_Click = function (e) {
                    this._objectID = lt.Annotations.Core.AnnObject.selectObjectId;
                    $(this.dialogUI.dialog).modal("hide");
                };
                return DocumentPackDialog;
            }());
            JavaScript.DocumentPackDialog = DocumentPackDialog;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var CanvasDataProvider = (function (_super) {
                __extends(CanvasDataProvider, _super);
                function CanvasDataProvider(acitveCanvas) {
                    _super.call(this);
                    this._acitveCanvas = null;
                    this._orginalImageData = null;
                    this._acitveCanvas = acitveCanvas;
                    var context = this._acitveCanvas.getContext("2d");
                    this._orginalImageData = context.getImageData(0, 0, this._acitveCanvas.width, this._acitveCanvas.height);
                }
                CanvasDataProvider.prototype.applyEncryptDecrypt = function (flags, bounds, key) {
                    var data = this.getImageData(null, lt.LeadRectD.empty);
                    flags |= lt.Annotations.Core.ScrambleImageFlags.intersect;
                    var scrambleImage = new lt.Annotations.Core.ScrambleImage();
                    scrambleImage.set_key(key.toString());
                    scrambleImage.set_flags(flags);
                    scrambleImage.set_rectangle(bounds);
                    scrambleImage.set_imageWidth(this._acitveCanvas.width);
                    scrambleImage.set_imageHeight(this._acitveCanvas.height);
                    scrambleImage.set_imageData(data.data);
                    var imageBounds = lt.LeadRectD.create(0, 0, this._acitveCanvas.width, this._acitveCanvas.height);
                    if (imageBounds.containsRect(bounds)) {
                        scrambleImage.scramble();
                    }
                    this.setImageData(null, lt.LeadRectD.create(0, 0, this._acitveCanvas.width, this._acitveCanvas.height), data);
                };
                CanvasDataProvider.prototype.decrypt = function (container, bounds, key) {
                    this.applyEncryptDecrypt(lt.Annotations.Core.ScrambleImageFlags.decrypt, bounds, key);
                };
                CanvasDataProvider.prototype.encrypt = function (container, bounds, key) {
                    this.applyEncryptDecrypt(lt.Annotations.Core.ScrambleImageFlags.encrypt, bounds, key);
                };
                CanvasDataProvider.prototype.fill = function (container, bounds, color) {
                    var canvas = document.createElement("canvas");
                    var width = bounds.width;
                    var height = bounds.height;
                    canvas.width = width;
                    canvas.height = height;
                    var tmpContext = canvas.getContext("2d");
                    tmpContext.fillStyle = color;
                    tmpContext.fillRect(0, 0, bounds.width, bounds.height);
                    var imageData = tmpContext.getImageData(0, 0, bounds.width, bounds.height);
                    this.setImageData(container, bounds, imageData);
                };
                CanvasDataProvider.prototype.getImageData = function (container, bounds) {
                    var imageCanvas = this._acitveCanvas;
                    var imageData;
                    var context = imageCanvas.getContext('2d');
                    if (bounds.get_isEmpty()) {
                        imageData = context.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
                    }
                    else {
                        imageData = context.getImageData(bounds.x, bounds.y, bounds.width, bounds.height);
                    }
                    return imageData;
                };
                CanvasDataProvider.prototype.setImageData = function (container, bounds, data) {
                    if (bounds.isEmpty || data == null)
                        return;
                    var imageCanvas = this._acitveCanvas;
                    var context = imageCanvas.getContext("2d");
                    context.putImageData(data, bounds.x, bounds.y);
                };
                return CanvasDataProvider;
            }(lt.Annotations.Core.AnnDataProvider));
            JavaScript.CanvasDataProvider = CanvasDataProvider;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            (function (AutomationControlMultiContainerMode) {
                AutomationControlMultiContainerMode[AutomationControlMultiContainerMode["SinglePage"] = 0] = "SinglePage";
                AutomationControlMultiContainerMode[AutomationControlMultiContainerMode["MultiPage"] = 1] = "MultiPage";
            })(JavaScript.AutomationControlMultiContainerMode || (JavaScript.AutomationControlMultiContainerMode = {}));
            var AutomationControlMultiContainerMode = JavaScript.AutomationControlMultiContainerMode;
            var ImageViewerAutomationControl = (function () {
                function ImageViewerAutomationControl() {
                    var _this = this;
                    this._multiContainerMode = AutomationControlMultiContainerMode.SinglePage;
                    this.handleGotFocus = function () {
                        _this.automationGotFocus.invoke(_this, lt.LeadEventArgs.empty);
                    };
                    this.automationPointerDown = lt.LeadEvent.create(this, "automationPointerDown");
                    this.automationPointerMove = lt.LeadEvent.create(this, "automationPointerMove");
                    this.automationPointerUp = lt.LeadEvent.create(this, "automationPointerUp");
                    this.automationDoubleClick = lt.LeadEvent.create(this, "automationDoubleClick");
                    this.automationEnabledChanged = lt.LeadEvent.create(this, "automationEnabledChanged");
                    this.automationLostFocus = lt.LeadEvent.create(this, "automationLostFocus");
                    this.automationGotFocus = lt.LeadEvent.create(this, "automationGotFocus");
                    this.automationSizeChanged = lt.LeadEvent.create(this, "automationSizeChanged");
                    this.imageViewer_ItemChanged = function (sender, e) {
                        switch (e.get_reason()) {
                            case lt.Controls.ImageViewerItemChangedReason.url:
                            case lt.Controls.ImageViewerItemChangedReason.image:
                            case lt.Controls.ImageViewerItemChangedReason.imageChanged:
                            case lt.Controls.ImageViewerItemChangedReason.size:
                            case lt.Controls.ImageViewerItemChangedReason.transform:
                                if (_this.automationTransformChanged != null)
                                    _this.automationTransformChanged.invoke(_this, lt.LeadEventArgs.empty);
                                if (_this.automationSizeChanged != null)
                                    _this.automationSizeChanged.invoke(_this, lt.LeadEventArgs.empty);
                                break;
                            default:
                                break;
                        }
                    };
                    this.imageViewer_ActiveItemChanged = function (sender, e) {
                        _this.syncActiveItemContainer(true);
                    };
                    this.automationObject_ActiveContainerChanged = function (sender, e) {
                        _this.syncActiveItemContainer(false);
                    };
                    this.automationTransformChanged = lt.LeadEvent.create(this, "automationTransformChanged");
                    this.imageViewer_TransformChanged = function (sender, e) {
                        if (_this.automationTransformChanged != null)
                            _this.automationTransformChanged.invoke(_this, lt.LeadEventArgs.empty);
                    };
                    this.automationUseDpiChanged = lt.LeadEvent.create(this, "automationUseDpiChanged");
                    this.imageViewer_PropertyChanged = function (sender, e) {
                        switch (e.propertyName) {
                            case "UseDpi":
                                if (_this.automationUseDpiChanged != null)
                                    _this.automationUseDpiChanged.invoke(_this, lt.LeadEventArgs.empty);
                                break;
                            default:
                                break;
                        }
                    };
                    this.automationAntiAlias = false;
                    this.renderingEngine = null;
                    this.imageViewer_PostRender = function (sender, e) {
                        var renderingEngine = _this.renderingEngine;
                        if (renderingEngine == null)
                            return;
                        var runMode = false;
                        if (_this.automationObject != null && _this.automationObject.manager != null)
                            runMode = (_this.automationObject.manager.userMode == lt.Annotations.Core.AnnUserMode.run);
                        var context = e.get_context();
                        var saveSmoothingMode = context.msImageSmoothingEnabled;
                        try {
                            if (_this.get_automationAntiAlias()) {
                                if (context.msImageSmoothingEnabled != true)
                                    context.msImageSmoothingEnabled = true;
                            }
                            else {
                                if (context.msImageSmoothingEnabled != false)
                                    context.msImageSmoothingEnabled = false;
                            }
                            var container;
                            if (_this.automationGetContainersCallback != null) {
                                var containers = _this.automationGetContainersCallback().toArray();
                                if (containers != null) {
                                    switch (_this._multiContainerMode) {
                                        case AutomationControlMultiContainerMode.MultiPage:
                                            for (var index = 0; index < containers.length; index++) {
                                                if (index < _this._imageViewer.get_items().get_count()) {
                                                    var container = containers[index];
                                                    var item = _this._imageViewer.get_items().get_item(index);
                                                    var containerBounds = _this.automationObject.getContainerInvalidRect(container, true);
                                                    var intersects = !containerBounds.get_isEmpty();
                                                    if (intersects || !_this._imageViewer.getItemViewBounds(item, lt.Controls.ImageViewerItemPart.item, true).isEmpty)
                                                        lt.Annotations.JavaScript.ImageViewerAutomationControl.renderContainer(e, renderingEngine, container, runMode);
                                                }
                                            }
                                            break;
                                        case AutomationControlMultiContainerMode.SinglePage:
                                        default:
                                            if (_this._imageViewer.activeItem != null &&
                                                !_this._imageViewer.getItemViewBounds(_this._imageViewer.activeItem, lt.Controls.ImageViewerItemPart.item, true).isEmpty) {
                                                for (var index = 0; index < containers.length; index++) {
                                                    var container = containers[index];
                                                    var containerBounds = _this.automationObject.getContainerInvalidRect(container, true);
                                                    var intersects = !containerBounds.get_isEmpty();
                                                    if (intersects)
                                                        lt.Annotations.JavaScript.ImageViewerAutomationControl.renderContainer(e, renderingEngine, container, runMode);
                                                }
                                            }
                                            break;
                                    }
                                }
                            }
                            else {
                                container = _this._container;
                                if (container != null)
                                    lt.Annotations.JavaScript.ImageViewerAutomationControl.renderContainer(e, renderingEngine, container, runMode);
                            }
                        }
                        finally {
                            if (context.msImageSmoothingEnabled != saveSmoothingMode)
                                context.msImageSmoothingEnabled = saveSmoothingMode;
                        }
                    };
                    this.automationContainerIndex = -1;
                    this.automationDataProvider = new lt.Annotations.Core.AnnDataProvider();
                }
                Object.defineProperty(ImageViewerAutomationControl.prototype, "multiContainerMode", {
                    get: function () { return this._multiContainerMode; },
                    set: function (value) { this._multiContainerMode = value; },
                    enumerable: true,
                    configurable: true
                });
                ImageViewerAutomationControl.prototype.dispose = function () { this.unHook(); };
                Object.defineProperty(ImageViewerAutomationControl.prototype, "imageViewer", {
                    get: function () { return this._imageViewer; },
                    set: function (value) {
                        if (this._imageViewer != value) {
                            this.unHook();
                            this._imageViewer = value;
                            this.hook();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ImageViewerAutomationControl.prototype.hook = function () {
                    if (this._imageViewer == null)
                        return;
                    this._imageViewer.add_propertyChanged(this.imageViewer_PropertyChanged);
                    this._imageViewer.add_itemChanged(this.imageViewer_ItemChanged);
                    this._imageViewer.add_activeItemChanged(this.imageViewer_ActiveItemChanged);
                    this._imageViewer.add_transformChanged(this.imageViewer_TransformChanged);
                    this._imageViewer.add_postRender(this.imageViewer_PostRender);
                    this._imageViewer.get_interactiveService().add_tap(this.handleGotFocus);
                };
                ImageViewerAutomationControl.prototype.unHook = function () {
                    if (this._imageViewer == null)
                        return;
                    this._imageViewer.remove_propertyChanged(this.imageViewer_PropertyChanged);
                    this._imageViewer.remove_itemChanged(this.imageViewer_ItemChanged);
                    this._imageViewer.remove_activeItemChanged(this.imageViewer_ActiveItemChanged);
                    this._imageViewer.remove_transformChanged(this.imageViewer_TransformChanged);
                    this._imageViewer.remove_postRender(this.imageViewer_PostRender);
                    this._imageViewer.get_interactiveService().remove_tap(this.handleGotFocus);
                    if (this.automationObject != null)
                        this.automationObject.remove_activeContainerChanged(this.automationObject_ActiveContainerChanged);
                };
                ImageViewerAutomationControl.prototype.get_automationObject = function () { return this.automationObject; };
                ImageViewerAutomationControl.prototype.set_automationObject = function (value) {
                    this.automationObject = value;
                    if (this.automationObject != null)
                        this.automationObject.remove_activeContainerChanged(this.automationObject_ActiveContainerChanged);
                    this.automationObject = value;
                    if (this.automationObject != null)
                        this.automationObject.add_activeContainerChanged(this.automationObject_ActiveContainerChanged);
                };
                ImageViewerAutomationControl.prototype.add_automationPointerDown = function (value) { this.automationPointerDown.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationPointerDown = function (value) { this.automationPointerDown.remove(value); };
                ImageViewerAutomationControl.prototype.add_automationPointerMove = function (value) { this.automationPointerMove.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationPointerMove = function (value) { this.automationPointerMove.remove(value); };
                ImageViewerAutomationControl.prototype.add_automationPointerUp = function (value) { this.automationPointerUp.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationPointerUp = function (value) { this.automationPointerUp.remove(value); };
                ImageViewerAutomationControl.prototype.add_automationDoubleClick = function (value) { this.automationDoubleClick.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationDoubleClick = function (value) { this.automationDoubleClick.remove(value); };
                ImageViewerAutomationControl.prototype.onAutomationPointerDown = function (args) {
                    if (this.automationPointerDown != null) {
                        this.automationPointerDown.invoke(this, args);
                    }
                };
                ImageViewerAutomationControl.prototype.onAutomationPointerMove = function (args) {
                    if (this.automationPointerMove != null)
                        this.automationPointerMove.invoke(this, args);
                };
                ImageViewerAutomationControl.prototype.onAutomationPointerUp = function (args) {
                    if (this.automationPointerUp != null)
                        this.automationPointerUp.invoke(this, args);
                };
                ImageViewerAutomationControl.prototype.onAutomationDoubleClick = function (args) {
                    if (this.automationDoubleClick != null)
                        this.automationDoubleClick.invoke(this, args);
                };
                ImageViewerAutomationControl.prototype.get_automationDpiX = function () { return this._imageViewer != null ? this._imageViewer.get_screenDpi().get_width() : 96; };
                ImageViewerAutomationControl.prototype.get_automationDpiY = function () { return this._imageViewer != null ? this._imageViewer.get_screenDpi().get_height() : 96; };
                ImageViewerAutomationControl.prototype.get_automationEnabled = function () { return true; };
                ImageViewerAutomationControl.prototype.add_automationEnabledChanged = function (value) { this.automationEnabledChanged.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationEnabledChanged = function (value) { this.automationEnabledChanged.remove(value); };
                ImageViewerAutomationControl.prototype.onEnabledChanged = function (e) {
                    if (this.automationEnabledChanged != null)
                        this.automationEnabledChanged.invoke(this, lt.LeadEventArgs.empty);
                };
                ImageViewerAutomationControl.prototype.add_automationLostFocus = function (value) { this.automationLostFocus.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationLostFocus = function (value) { this.automationLostFocus.remove(value); };
                ImageViewerAutomationControl.prototype.add_automationGotFocus = function (value) { this.automationGotFocus.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationGotFocus = function (value) { this.automationGotFocus.remove(value); };
                ImageViewerAutomationControl.prototype.add_automationSizeChanged = function (value) { this.automationSizeChanged.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationSizeChanged = function (value) { this.automationSizeChanged.remove(value); };
                ImageViewerAutomationControl.prototype.syncActiveItemContainer = function (fromViewer) {
                    if (this.automationObject == null || this._imageViewer == null)
                        return;
                    var itemsCount = this._imageViewer.get_items().get_count();
                    var containersCount = this.automationObject.get_containers().get_count();
                    if (itemsCount == 0 || itemsCount != containersCount)
                        return;
                    var imageViewerIndex = this._imageViewer.get_items().indexOf(this._imageViewer.get_activeItem());
                    var containerIndex = -1;
                    if (this.automationObject.get_activeContainer() != null)
                        containerIndex = this.automationObject.get_containers().indexOf(this.automationObject.get_activeContainer());
                    if (imageViewerIndex != containerIndex) {
                        if (fromViewer) {
                            if (imageViewerIndex != -1)
                                this.automationObject.set_activeContainer(this.automationObject.get_containers().get_item(imageViewerIndex));
                        }
                        else {
                            if (containerIndex != -1)
                                this._imageViewer.set_activeItem(this._imageViewer.get_items().get_item(containerIndex));
                        }
                    }
                };
                ImageViewerAutomationControl.prototype.getItemForCurrentContainer = function () {
                    if (this._imageViewer == null)
                        return null;
                    if (this.automationContainerIndex != -1) {
                        switch (this._multiContainerMode) {
                            case AutomationControlMultiContainerMode.MultiPage:
                                if (this.automationContainerIndex >= 0 && this.automationContainerIndex < this._imageViewer.get_items().get_count())
                                    return this._imageViewer.get_items().get_item(this.automationContainerIndex);
                                return null;
                            case AutomationControlMultiContainerMode.SinglePage:
                            default:
                                return this._imageViewer.activeItem;
                        }
                    }
                    else {
                        return this._imageViewer.activeItem;
                    }
                };
                ImageViewerAutomationControl.prototype.getCurrentContainer = function () {
                    if (this.automationObject != null && this.automationContainerIndex != -1)
                        return this.automationObject.get_containers().get_item(this.automationContainerIndex);
                    return null;
                };
                ImageViewerAutomationControl.prototype.get_automationTransform = function () {
                    var item = this.getItemForCurrentContainer();
                    var container = this.getCurrentContainer();
                    if (item != null) {
                        return this._imageViewer.getItemImageTransformWithDpi(item, false);
                    }
                    else
                        return lt.LeadMatrix.identity;
                };
                ImageViewerAutomationControl.prototype.add_automationTransformChanged = function (value) { this.automationTransformChanged.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationTransformChanged = function (value) { this.automationTransformChanged.remove(value); };
                ImageViewerAutomationControl.prototype.get_automationUseDpi = function () { return this._imageViewer != null && this._imageViewer.get_useDpi(); };
                ImageViewerAutomationControl.prototype.add_automationUseDpiChanged = function (value) { this.automationUseDpiChanged.add(value); };
                ImageViewerAutomationControl.prototype.remove_automationUseDpiChanged = function (value) { this.automationUseDpiChanged.remove(value); };
                ImageViewerAutomationControl.prototype.get_automationXResolution = function () {
                    var item = this.getItemForCurrentContainer();
                    if (item != null)
                        return item.get_resolution().get_width();
                    else
                        return 96.0;
                };
                ImageViewerAutomationControl.prototype.get_automationYResolution = function () {
                    var item = this.getItemForCurrentContainer();
                    if (item != null)
                        return item.get_resolution().get_height();
                    else
                        return 96.0;
                };
                ImageViewerAutomationControl.prototype.automationInvalidate = function (rc) {
                    if (this._imageViewer != null) {
                        this._imageViewer.invalidate(rc);
                    }
                };
                ImageViewerAutomationControl.prototype.get_automationAntiAlias = function () { return this.automationAntiAlias; };
                ImageViewerAutomationControl.prototype.set_automationAntiAlias = function (value) {
                    this.automationAntiAlias = value;
                    if (this._imageViewer) {
                        this._imageViewer.invalidate(lt.LeadRectD.empty);
                    }
                };
                ImageViewerAutomationControl.prototype.get_renderingEngine = function () { return this.renderingEngine; };
                ImageViewerAutomationControl.prototype.set_renderingEngine = function (value) { this.renderingEngine = value; };
                ImageViewerAutomationControl.renderContainer = function (e, renderingEngine, container, runMode) {
                    var context = e.get_context();
                    var clipRectangle = e.get_clipRectangle();
                    renderingEngine.attach(container, context);
                    try {
                        var annClipRect = container.mapper.rectToContainerCoordinates(clipRectangle);
                        renderingEngine.render(annClipRect, runMode);
                    }
                    finally {
                        renderingEngine.detach();
                    }
                };
                ImageViewerAutomationControl.prototype.get_automationGetContainersCallback = function () { return this.automationGetContainersCallback; };
                ImageViewerAutomationControl.prototype.set_automationGetContainersCallback = function (value) { this.automationGetContainersCallback = value; };
                ImageViewerAutomationControl.prototype.get_automationContainerIndex = function () { return this.automationContainerIndex; };
                ImageViewerAutomationControl.prototype.set_automationContainerIndex = function (value) { this.automationContainerIndex = value; };
                ImageViewerAutomationControl.prototype.automationAttach = function (container) { this._container = container; };
                ImageViewerAutomationControl.prototype.automationDetach = function () { this._container = null; };
                ImageViewerAutomationControl.prototype.get_automationDataProvider = function () { return this.automationDataProvider; };
                ImageViewerAutomationControl.prototype.set_automationDataProvider = function (value) { this.automationDataProvider = value; };
                ImageViewerAutomationControl.prototype.get_automationScrollOffset = function () {
                    return this._imageViewer != null ? this._imageViewer.get_scrollOffset() : lt.LeadPointD.create(0, 0);
                };
                return ImageViewerAutomationControl;
            }());
            JavaScript.ImageViewerAutomationControl = ImageViewerAutomationControl;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var MedicalPackDialog = (function () {
                function MedicalPackDialog() {
                    this.dialogUI = {
                        dialog: "#medicalPackDialog",
                        CancelBtn: "#medicalPackDlg_Cancel",
                        dialogNameLable: "#medicalPackDialogName",
                        medicalObjectBtns: ".medicalObjectBtn",
                    };
                    this.Init();
                }
                MedicalPackDialog.prototype.Init = function () {
                    $(this.dialogUI.CancelBtn).bind("click", $.proxy(this.CancelBtn_Click, this));
                    $(this.dialogUI.medicalObjectBtns).bind("click", $.proxy(this.medicalObjectBtns_BtnClicked, this));
                    $(this.dialogUI.dialog).on('hidden.bs.modal', $.proxy(this.medicalPackDialog_Hide, this));
                };
                MedicalPackDialog.prototype.show = function () {
                    this._objectID = lt.Annotations.Core.AnnObject.selectObjectId;
                    $(this.dialogUI.dialogNameLable).text("Medical Pack");
                    $(this.dialogUI.dialog).modal();
                };
                Object.defineProperty(MedicalPackDialog.prototype, "objectID", {
                    get: function () {
                        return this._objectID;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MedicalPackDialog.prototype, "onHide", {
                    set: function (value) {
                        this._onHide = null;
                        this._onHide = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                MedicalPackDialog.prototype.medicalPackDialog_Hide = function (e) {
                    if (this._onHide != null) {
                        this._onHide(this._objectID);
                    }
                };
                MedicalPackDialog.prototype.medicalObjectBtns_BtnClicked = function (e) {
                    this._objectID = parseInt($(e.currentTarget).val());
                    $(this.dialogUI.dialog).modal("hide");
                };
                MedicalPackDialog.prototype.CancelBtn_Click = function (e) {
                    this._objectID = lt.Annotations.Core.AnnObject.selectObjectId;
                    $(this.dialogUI.dialog).modal("hide");
                };
                return MedicalPackDialog;
            }());
            JavaScript.MedicalPackDialog = MedicalPackDialog;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
var lt;
(function (lt) {
    var Annotations;
    (function (Annotations) {
        var JavaScript;
        (function (JavaScript) {
            var RightClickInteractiveMode = (function (_super) {
                __extends(RightClickInteractiveMode, _super);
                function RightClickInteractiveMode() {
                    var _this = this;
                    _super.call(this);
                    this._automation = null;
                    this.RightClickInteractiveMode_ServiceTap = function (sender, e) {
                        if (_this._automation == null)
                            return;
                        if (!_this.canStartWork(e)) {
                            return;
                        }
                        if (_this._automation.manager.userMode === lt.Annotations.Core.AnnUserMode.run) {
                            return;
                        }
                        _this.onWorkStarted(lt.LeadEventArgs.empty);
                        _this.onWorkCompleted(lt.LeadEventArgs.empty);
                        var automation = _this._automation;
                        var currentDesigner = automation.currentDesigner;
                        if (currentDesigner != null && (currentDesigner instanceof lt.Annotations.Designers.AnnDrawDesigner)) {
                            var drawingObject = currentDesigner.targetObject;
                            currentDesigner.end();
                            if (drawingObject != null) {
                                automation.selectObject(drawingObject);
                            }
                            return;
                        }
                        if (_this.onRightClick != null) {
                            _this.onRightClick(e.position.x, e.position.y);
                        }
                    };
                }
                Object.defineProperty(RightClickInteractiveMode.prototype, "automation", {
                    get: function () { return this._automation; },
                    set: function (value) {
                        if (this._automation != value) {
                            if (this._automation != null)
                                this._automation.active = false;
                            this._automation = value;
                            this._automation.active = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                RightClickInteractiveMode.prototype.toString = function () {
                    return "RightClick";
                };
                RightClickInteractiveMode.prototype.start = function (viewer) {
                    this.workOnBounds = false;
                    _super.prototype.start.call(this, viewer);
                    var service = _super.prototype.get_interactiveService.call(this);
                    service.tap.add(this.RightClickInteractiveMode_ServiceTap);
                };
                RightClickInteractiveMode.prototype.stop = function (viewer) {
                    if (this.isStarted) {
                        var service = _super.prototype.get_interactiveService.call(this);
                        service.tap.remove(this.RightClickInteractiveMode_ServiceTap);
                        _super.prototype.stop.call(this, viewer);
                    }
                };
                return RightClickInteractiveMode;
            }(lt.Controls.ImageViewerInteractiveMode));
            JavaScript.RightClickInteractiveMode = RightClickInteractiveMode;
        })(JavaScript = Annotations.JavaScript || (Annotations.JavaScript = {}));
    })(Annotations = lt.Annotations || (lt.Annotations = {}));
})(lt || (lt = {}));
