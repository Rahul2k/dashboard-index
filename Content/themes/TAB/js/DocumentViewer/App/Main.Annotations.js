var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        // Contains the annotations part
        var AnnotationsPart = (function () {
            function AnnotationsPart(main) {
                // Reference to the DocumentViewerDemoApp
                this._mainApp = null;
                this._loadPictureTimeout = -1;
                // annotations Objects buttons
                this._annotationsObjectsBtns = ".annotationObjectBtn";
                // Annotations menu items
                this.headerToolbar_AnnotationsMenu = {
                    annotationsMenuItem: "#annotationsMenuItem",
                    userModeMenuItems: {
                        runModeMenuItem: "#runUserMode",
                        designModeMenuItem: "#designUserMode",
                        renderModeMenuItem: "#renderUserMode",
                    },
                    customizeRenderModeMenuItem: "#customizeRenderMode",
                    bringToFrontMenuItem: "#bringToFront",
                    sendToBackMenuItem: "#sendToBack",
                    bringToFirstMenuItem: "#bringToFirst",
                    sendToLastMenuItem: "#sendToLast",
                    verticalFlipMenuItem: "#verticalFlip",
                    horizontalFlipMenuItem: "#horizontalFlip",
                    groupSelectedObjectsMenuItem: "#groupSelectedObjects",
                    ungroupMenuItem: "#ungroup",
                    lockObjectMenuItem: "#lockObject",
                    unlockObjectMenuItem: "#unlockObject",
                    resetRotatePointMenuItem: "#resetRotatePoint",
                    annotationsPropertiesMenuItem: "#annotationsProperties",
                    useRotateThumbMenuItem: "#useRotateThumb",
                    renderOnThumbnailsMenuItem: "#renderOnThumbnails",
                    deselectOnDownMenuItem: "#deselectOnDown",
                    rubberbandSelectMenuItem: "#rubberbandSelect"
                };
                this.mobileVersionAnnotationsEditControls = {
                    showAnnotationsEditControlsBtn: "#showAnnotationsEditControls",
                    doneAnnotationsEditBtn: "#doneAnnotationsEdit",
                    annotationsEditControls: ".annotationsEditControls"
                };
                this._mainApp = main;
                this.initAnnotationsUI();
            }
            AnnotationsPart.prototype.initAnnotationsUI = function () {
                if (HTML5Demos.Utils.DemoHelper.isTouchDevice()) {
                    $("#deselectOnDown>.icon").addClass("deselectOnDown-TouchIcon");
                }
                else {
                    $("#deselectOnDown>.icon").addClass("deselectOnDown-MouseIcon");
                }
                if (HTML5Demos.Utils.DemoHelper.isTouchDevice()) {
                    $("#rubberbandSelect>.icon").addClass("rubberbandSelect-TouchIcon");
                }
                else {
                    $("#rubberbandSelect>.icon").addClass("rubberbandSelect-MouseIcon");
                }
                // Annotations menu
                $(this.headerToolbar_AnnotationsMenu.annotationsMenuItem).bind("click", $.proxy(this.annotationsMenuItem_Click, this));
                $(this.headerToolbar_AnnotationsMenu.customizeRenderModeMenuItem).bind("click", $.proxy(this.customizeRenderModeMenuItem_Click, this));
                $(this.headerToolbar_AnnotationsMenu.lockObjectMenuItem).bind("click", $.proxy(this.lockObjectMenuItem_Click, this));
                $(this.headerToolbar_AnnotationsMenu.unlockObjectMenuItem).bind("click", $.proxy(this.unlockObjectMenuItem_Click, this));
                $(this.headerToolbar_AnnotationsMenu.deselectOnDownMenuItem).bind("click", $.proxy(this.deselectOnDownMenuItem_Click, this));
                $(this.headerToolbar_AnnotationsMenu.rubberbandSelectMenuItem).bind("click", $.proxy(this.rubberbandSelectMenuItem_Click, this));
                // Annotations objects 
                $(this._annotationsObjectsBtns).bind("click", $.proxy(this.annotationsObjectsBtns_BtnClicked, this));
                // Navigation bar
                $(this._mainApp.navigationbar.showAnnotationsListControlsBtn).bind("click", $.proxy(this.showAnnotationsListBtn_Click, this));
                // Only for mobile version
                if (DocumentViewerDemo.DocumentViewerDemoApp.isMobileVersion) {
                    $(this.mobileVersionAnnotationsEditControls.showAnnotationsEditControlsBtn).bind("click", $.proxy(this.showAnnotationsObjectsBtn_Click, this));
                    $(this.mobileVersionAnnotationsEditControls.doneAnnotationsEditBtn).bind("click", $.proxy(this.doneAnnotationsEditBtn_Click, this));
                }
            };
            AnnotationsPart.prototype.initAutomation = function () {
                var _this = this;
                if (this._mainApp.documentViewer.annotations == null)
                    return;
                // Get the automation manager from the document viewer
                var automationManager = this._mainApp.documentViewer.annotations.automationManager;
                automationManager.userModeChanged.add(function (sender, e) {
                    // Hide/Show the toolbars
                    if (automationManager.userMode == lt.Annotations.Core.AnnUserMode.design) {
                        if ($(_this._annotationsObjectsBtns).is(":disabled"))
                            $(_this._annotationsObjectsBtns).prop("disabled", false);
                    }
                    else {
                        if (!$(_this._annotationsObjectsBtns).is(":disabled"))
                            $(_this._annotationsObjectsBtns).prop("disabled", true);
                    }
                    // Disable/Enable annotations menu UI elements   
                    _this.updateAnnotationsMenu();
                    if (automationManager.userMode == lt.Annotations.Core.AnnUserMode.render) {
                        // Setup our custom renderer
                        automationManager.renderingEngine.renderers = _this._renderModeRenderers;
                    }
                    else {
                        automationManager.renderingEngine.renderers = _this._originalRenderers;
                    }
                    _this._mainApp.documentViewer.view.invalidate(lt.LeadRectD.empty);
                    if (_this._mainApp.documentViewer.thumbnails != null)
                        _this._mainApp.documentViewer.thumbnails.invalidate(lt.LeadRectD.empty);
                });
                // Create the manager helper. This sets the rendering engine
                this._automationManagerHelper = new lt.Annotations.JavaScript.AutomationManagerHelper(automationManager, "Resources");
                // Save the rendering engine
                this._originalRenderers = automationManager.renderingEngine.renderers;
                // And create the render mode renderers, make a copy of it
                this._renderModeRenderers = {};
                for (var key in this._originalRenderers) {
                    if (this._originalRenderers.hasOwnProperty(key)) {
                        this._renderModeRenderers[key] = this._originalRenderers[key];
                    }
                }
                // Inform the document viewer that automation manager helper is created
                this._mainApp.documentViewer.annotations.initialize();
                // Update our automation objects (set transparency, etc)
                this._automationManagerHelper.updateAutomationObjects();
                // Automation objects list is not supported on mobile version
                if (!DocumentViewerDemo.DocumentViewerDemoApp.isMobileVersion)
                    this._automationObjectsList = new lt.Annotations.JavaScript.AutomationObjectsListControl();
            };
            AnnotationsPart.prototype.bindElements = function () {
                var elements = this._mainApp.commandsBinder.elements;
                var element;
                // Annotations menu
                if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Default) {
                    element = new DocumentViewerDemo.CommandBinderElement();
                    element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.annotationsMenuItem);
                    element.updateEnabled = false;
                    element.updateVisible = true;
                    element.canRun = function (documentViewer, value) {
                        return documentViewer != null && documentViewer.hasDocument && documentViewer.annotations != null;
                    };
                    elements.push(element);
                }
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsUserModeRun;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.userModeMenuItems.runModeMenuItem);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsUserModeDesign;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.userModeMenuItems.designModeMenuItem);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsUserModeRender;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.userModeMenuItems.renderModeMenuItem);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsBringToFront;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.bringToFrontMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsSendToBack;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.sendToBackMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsBringToFirst;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.bringToFirstMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsSendToLast;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.sendToLastMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsFlip;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.verticalFlipMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsReverse;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.horizontalFlipMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsGroup;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.groupSelectedObjectsMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsUngroup;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.ungroupMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsLock;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.lockObjectMenuItem);
                element.autoRun = false;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsUnlock;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.unlockObjectMenuItem);
                element.autoRun = false;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsResetRotatePoints;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.resetRotatePointMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsProperties;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.annotationsPropertiesMenuItem);
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsUseRotateThumbs;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.useRotateThumbMenuItem);
                element.updateChecked = true;
                elements.push(element);
                element = new DocumentViewerDemo.CommandBinderElement();
                element.commandName = lt.Documents.UI.DocumentViewerCommands.annotationsRenderOnThumbnails;
                element.userInterfaceElement = $(this.headerToolbar_AnnotationsMenu.renderOnThumbnailsMenuItem);
                element.updateChecked = true;
                elements.push(element);
            };
            AnnotationsPart.prototype.interactiveService_keyDown = function (e) {
                // Delete the selected annotations object, if delete key was pressed
                if (e.keyCode == 46) {
                    var automation = this._mainApp.documentViewer.annotations.automation;
                    if (automation.canDeleteObjects) {
                        automation.deleteSelectedObjects();
                        this.removeAutomationTextArea(false);
                    }
                }
            };
            AnnotationsPart.prototype.annotationsObjectsBtns_BtnClicked = function (e) {
                this._mainApp.documentViewer.annotations.automationManager.currentObjectId = parseInt($(e.currentTarget).val());
                this.UpdateAnnotationsObjectsBtnsCheckedState();
            };
            AnnotationsPart.prototype.updateAnnotationsMenu = function () {
                if (this._automationManagerHelper == null)
                    return;
                var designMode = (this._automationManagerHelper.automationManager.userMode == lt.Annotations.Core.AnnUserMode.design);
                // Only the user mode is available
                for (var item in this.headerToolbar_AnnotationsMenu) {
                    if (this.headerToolbar_AnnotationsMenu.hasOwnProperty(item)) {
                        if (item != "annotationsMenuItem" && item != "customizeRenderModeMenuItem") {
                            $(this.headerToolbar_AnnotationsMenu[item]).prop("disabled", !designMode);
                        }
                    }
                }
            };
            AnnotationsPart.prototype.updateAnnotationsControlsVisiblity = function () {
                if (this._mainApp.documentViewer.annotations == null || this._mainApp.documentViewer.annotations.automation == null) {
                    $(this.headerToolbar_AnnotationsMenu.annotationsMenuItem).hide();
                    $(this._mainApp.navigationbar.showAnnotationsListControlsBtn).removeClass("activeNavigationbarBtn");
                    if (!($(this._mainApp.navigationbar.showAnnotationsListControlsBtn).is(":disabled")))
                        $(this._mainApp.navigationbar.showAnnotationsListControlsBtn).prop("disabled", true);
                    $(this._mainApp.annotationsListControlsContainer).hide();
                }
                else {
                    if (this._mainApp.demoMode == DocumentViewerDemo.DemoMode.Default)
                        $(this.headerToolbar_AnnotationsMenu.annotationsMenuItem).show();
                    if (this._mainApp.documentViewer.annotations.automationManager.userMode == lt.Annotations.Core.AnnUserMode.design) {
                        if ($(this._mainApp.navigationbar.showAnnotationsListControlsBtn).is(":disabled"))
                            $(this._mainApp.navigationbar.showAnnotationsListControlsBtn).prop("disabled", false);
                    }
                    else {
                        if (!($(this._mainApp.navigationbar.showAnnotationsListControlsBtn).is(":disabled")))
                            $(this._mainApp.navigationbar.showAnnotationsListControlsBtn).prop("disabled", true);
                    }
                }
            };
            AnnotationsPart.prototype.handleContainersAddedOrRemoved = function () {
                if (this._automationObjectsList)
                    this._automationObjectsList.populate();
            };
            AnnotationsPart.prototype.handleCreateAutomation = function () {
                var _this = this;
                this.updateAnnotationsControlsVisiblity();
                if (!this._mainApp.documentViewer.hasDocument)
                    return;
                // Get the automation object from the document viewer
                var automation = this._mainApp.documentViewer.annotations.automation;
                if (automation == null)
                    return;
                // Optional: If the document is PDF then switch annotations to use PDF mode
                // This will instruct the document viewer to render automation in a similar manner to Adobe Acrobat where
                var mimeType = this._mainApp.documentViewer.document.mimeType;
                if (mimeType && mimeType.toLowerCase() == "application/pdf") {
                    automation.manager.usePDFMode = true;
                }
                else {
                    automation.manager.usePDFMode = false;
                }
                var automationControl = this._mainApp.documentViewer.annotations.automationControl;
                var automationManager = this._mainApp.documentViewer.annotations.automationManager;
                var renderingEngine = this._mainApp.documentViewer.annotations.automationManager.renderingEngine;
                // Hook to the events
                automationManager.currentObjectIdChanged.add(function (sender, e) { return _this.automationManager_CurrentObjectIdChanged(sender, e); });
                automation.setCursor.add(function (sender, e) { return _this.automation_SetCursor(sender, e); });
                automation.restoreCursor.add(function (sender, e) { return _this.automation_RestoreCursor(sender, e); });
                automation.onShowObjectProperties.add(function (sender, e) { return _this.automation_OnShowObjectProperties(sender, e); });
                automation.editText.add(function (sender, e) { return _this.automation_EditText(sender, e); });
                automation.editContent.add(function (sender, e) { return _this.automation_EditContent(sender, e); });
                if (DocumentViewerDemo.DocumentViewerDemoApp.isMobileVersion) {
                    automation.edit.add(function (sender, e) { return _this.automation_edit(sender, e); });
                }
                renderingEngine.loadPicture.add(function (sender, e) { return _this.renderingEngine_LoadPicture(sender, e); });
                // Set https://www.leadtools.com as the default hyperlink for all object templates
                var automationObjectsCount = automationManager.objects.count;
                for (var i = 0; i < automationObjectsCount; i++) {
                    var automationObject = automationManager.objects.get_item(i);
                    var annObjectTemplate = automationObject.objectTemplate;
                    if (annObjectTemplate != null) {
                        // Set the object draw cursor
                        automationObject.drawCursor = this._automationManagerHelper.getAutomationObjectCursor(automationObject.id);
                        automationObject.toolBarImage = this._automationManagerHelper.getAutomationObjectImage(automationObject.id);
                        if (annObjectTemplate instanceof lt.Annotations.Core.AnnAudioObject) {
                            var audioObject = annObjectTemplate;
                            audioObject.media.source1 = "https://demo.leadtools.com/media/mp3/NewAudio.mp3";
                            audioObject.media.type1 = "audio/mp3";
                            audioObject.media.source2 = "https://demo.leadtools.com/media/wav/newaudio.wav";
                            audioObject.media.type2 = "audio/wav";
                            audioObject.media.source3 = "https://demo.leadtools.com/media/OGG/NewAudio_uncompressed.ogg";
                            audioObject.media.type3 = "audio/ogg";
                        }
                        else if (annObjectTemplate instanceof lt.Annotations.Core.AnnMediaObject) {
                            var videoObject = annObjectTemplate;
                            videoObject.media.source1 = "https://demo.leadtools.com/media/mp4/dada_h264.mp4";
                            videoObject.media.type1 = "video/mp4";
                            videoObject.media.source2 = "https://demo.leadtools.com/media/WebM/DaDa_VP8_Vorbis.mkv";
                            videoObject.media.type2 = "video/webm";
                            videoObject.media.source3 = "https://demo.leadtools.com/media/OGG/DaDa_Theora_Vorbis.ogg";
                            videoObject.media.type3 = "video/ogg";
                        }
                        annObjectTemplate.hyperlink = "https://www.leadtools.com";
                    }
                }
                automationManager.resources = this.loadResources();
                // Automation bjects list is not supported on mobile version
                if (!DocumentViewerDemo.DocumentViewerDemoApp.isMobileVersion) {
                    this._automationObjectsList.automation = automation;
                    this._automationObjectsList.imageViewer = this._mainApp.documentViewer.view.imageViewer;
                    lt.Annotations.JavaScript.AutomationObjectsListControl.userName = this._mainApp.documentViewer.userName;
                    this._automationObjectsList.listContainerDiv = document.getElementById("annotationslist");
                    this._automationObjectsList.populate();
                }
            };
            AnnotationsPart.prototype.handleDestroyAutomation = function () {
                this.removeAutomationTextArea(true);
            };
            AnnotationsPart.prototype.loadResources = function () {
                var resources = new lt.Annotations.Core.AnnResources();
                var rubberStampsResources = resources.rubberStamps;
                var imagesResources = resources.images;
                var objects = "Resources/Objects/";
                var rubberStamps = "Resources/Objects/RubberStamps/";
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampApproved] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Approved.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampAssigned] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Assigned.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampClient] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Client.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampChecked] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Checked.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampCopy] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Copy.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampDraft] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Draft.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampExtended] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Extended.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampFax] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Fax.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampFaxed] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Faxed.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampImportant] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Important.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampInvoice] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Invoice.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampNotice] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Notice.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampPaid] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Paid.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampOfficial] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Official.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampOnFile] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Onfile.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampPassed] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Passed.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampPending] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Pending.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampProcessed] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Processed.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampReceived] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Received.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampRejected] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Rejected.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampRelease] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Release.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampSent] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Sent.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampShipped] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Shipped.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampTopSecret] = new lt.Annotations.Core.AnnPicture(rubberStamps + "TopSecret.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampUrgent] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Urgent.png");
                rubberStampsResources[lt.Annotations.Core.AnnRubberStampType.stampVoid] = new lt.Annotations.Core.AnnPicture(rubberStamps + "Void.png");
                imagesResources[0] = new lt.Annotations.Core.AnnPicture(objects + "Point.png");
                imagesResources[1] = new lt.Annotations.Core.AnnPicture(objects + "Lock.png");
                imagesResources[2] = new lt.Annotations.Core.AnnPicture(objects + "Hotspot.png");
                imagesResources[3] = new lt.Annotations.Core.AnnPicture(objects + "Audio.png");
                imagesResources[4] = new lt.Annotations.Core.AnnPicture(objects + "Video.png");
                imagesResources[5] = new lt.Annotations.Core.AnnPicture(objects + "EncryptPrimary.png");
                imagesResources[6] = new lt.Annotations.Core.AnnPicture(objects + "EncryptSecondary.png");
                imagesResources[7] = new lt.Annotations.Core.AnnPicture(objects + "Note.png");
                imagesResources[8] = new lt.Annotations.Core.AnnPicture(objects + "StickyNote.png");
                return resources;
            };
            AnnotationsPart.prototype.automationManager_CurrentObjectIdChanged = function (sender, e) {
                this.UpdateAnnotationsObjectsBtnsCheckedState();
            };
            // Update which button is currently Checked
            AnnotationsPart.prototype.UpdateAnnotationsObjectsBtnsCheckedState = function () {
                var manager = this._mainApp.documentViewer.annotations.automationManager;
                if (manager == null)
                    return;
                var currentObjectId = manager.currentObjectId;
                var btns = $(this._annotationsObjectsBtns);
                btns.each(function () {
                    // "this" here is for current JQuery element (i.e current Annotations Object Button)
                    if ($(this).val() != null) {
                        var buttonObjectId = parseInt($(this).val());
                        if (buttonObjectId == lt.Annotations.Core.AnnObject.selectObjectId)
                            HTML5Demos.Utils.DemoHelper.checked($(this), (buttonObjectId == currentObjectId || currentObjectId == lt.Annotations.Core.AnnObject.none));
                        else
                            HTML5Demos.Utils.DemoHelper.checked($(this), (buttonObjectId == currentObjectId));
                    }
                });
            };
            AnnotationsPart.prototype.automation_SetCursor = function (sender, e) {
                // If there's an interactive mode working and its not automation, then don't do anything
                var imageViewer = this._mainApp.documentViewer.view.imageViewer;
                if (imageViewer.workingInteractiveMode != null && imageViewer.workingInteractiveMode.id != lt.Documents.UI.DocumentViewer.annotationsInteractiveModeId)
                    return;
                // Get the canvas the viewer is using to listen to the events.
                var cursorCanvas = imageViewer.eventCanvas ? imageViewer.eventCanvas : imageViewer.foreCanvas;
                var automation = sender;
                var newCursor = null;
                switch (e.designerType) {
                    case lt.Annotations.Automation.AnnDesignerType.draw:
                        {
                            var allow = true;
                            var drawDesigner = automation.currentDesigner;
                            if (drawDesigner != null && !drawDesigner.isTargetObjectAdded && e.pointerEvent != null) {
                                // See if we can draw or not
                                var container = automation.activeContainer;
                                allow = false;
                                if (automation.hitTestContainer(e.pointerEvent.location, false) != null)
                                    allow = true;
                            }
                            if (allow) {
                                var annAutomationObject = automation.manager.findObjectById(e.id);
                                if (annAutomationObject != null)
                                    newCursor = annAutomationObject.drawCursor;
                            }
                            else {
                                newCursor = "not-allowed";
                            }
                        }
                        break;
                    case lt.Annotations.Automation.AnnDesignerType.edit:
                        if (e.isRotateCenter)
                            newCursor = this._automationManagerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.rotateCenterControlPoint];
                        else if (e.isRotateGripper)
                            newCursor = this._automationManagerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.rotateGripperControlPoint];
                        else if (e.thumbIndex < 0) {
                            if (e.dragDropEvent != null && !e.dragDropEvent.allowed)
                                newCursor = "not-allowed";
                            else
                                newCursor = this._automationManagerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.selectedObject];
                        }
                        else {
                            newCursor = this._automationManagerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.controlPoint];
                        }
                        break;
                    case lt.Annotations.Automation.AnnDesignerType.run:
                        newCursor = this._automationManagerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.run];
                        break;
                    default:
                        newCursor = this._automationManagerHelper.automationCursors[lt.Annotations.JavaScript.AnnCursorType.selectObject];
                        break;
                }
                if (cursorCanvas.style.cursor != newCursor)
                    cursorCanvas.style.cursor = newCursor;
            };
            AnnotationsPart.prototype.automation_RestoreCursor = function (sender, e) {
                var imageViewer = this._mainApp.documentViewer.view.imageViewer;
                var cursor = "default";
                var interactiveModeCursor = null;
                // Get the canvas the viewer is using to listen to the events.
                var cursorCanvas = imageViewer.eventCanvas ? imageViewer.eventCanvas : imageViewer.foreCanvas;
                // See if we have an interactive mode, use its cursor
                // Is any working?
                if (imageViewer.workingInteractiveMode != null) {
                    interactiveModeCursor = imageViewer.workingInteractiveMode.workingCursor;
                }
                else if (imageViewer.hitTestStateInteractiveMode != null) {
                    interactiveModeCursor = imageViewer.hitTestStateInteractiveMode.hitTestStateCursor;
                }
                else if (imageViewer.idleInteractiveMode != null) {
                    interactiveModeCursor = imageViewer.idleInteractiveMode.idleCursor;
                }
                if (interactiveModeCursor != null)
                    cursor = interactiveModeCursor;
                if (cursorCanvas.style.cursor != cursor) {
                    cursorCanvas.style.cursor = cursor;
                }
            };
            AnnotationsPart.prototype.automation_OnShowObjectProperties = function (sender, e) {
                // Get the automation object from the document viewer
                var automation = this._mainApp.documentViewer.annotations.automation;
                if (automation == null)
                    return;
                var isSelectionObject = lt.Annotations.Core.AnnSelectionObject.isInstanceOfType(automation.currentEditObject);
                // If is is a text or selection , hide the content
                if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(automation.currentEditObject) || isSelectionObject) {
                    this._mainApp.automationUpdateObjectDlg.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Content, false);
                    if (isSelectionObject) {
                        this._mainApp.automationUpdateObjectDlg.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Reviews, false);
                    }
                }
                this._mainApp.automationUpdateObjectDlg.userName = this._mainApp.documentViewer.userName;
                this._mainApp.automationUpdateObjectDlg.automation = this._mainApp.documentViewer.annotations.automation;
                this._mainApp.automationUpdateObjectDlg.targetObject = automation.currentEditObject;
                this._mainApp.automationUpdateObjectDlg.show();
            };
            AnnotationsPart.prototype.automation_EditText = function (sender, e) {
                var _this = this;
                var automation = this._mainApp.documentViewer.annotations.automation;
                if (automation == null)
                    return;
                this.removeAutomationTextArea(true);
                if (e.textObject == null)
                    return;
                var imageViewer = this._mainApp.documentViewer.view.imageViewer;
                this._automationTextArea = new lt.Annotations.JavaScript.AutomationTextArea(imageViewer.mainDiv.parentNode, automation, e, function (update) { return _this.removeAutomationTextArea(update); });
                e.cancel;
            };
            AnnotationsPart.prototype.automation_EditContent = function (sender, e) {
                // Get the automation object from the document viewer
                var automation = this._mainApp.documentViewer.annotations.automation;
                if (automation == null)
                    return;
                if (automation.currentEditObject.id == lt.Annotations.Core.AnnObject.groupObjectId || automation.currentEditObject.id == lt.Annotations.Core.AnnObject.selectObjectId)
                    return;
                if (lt.Annotations.Core.AnnTextObject.isInstanceOfType(automation.currentEditObject))
                    return;
                this._mainApp.automationUpdateObjectDlg.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Properties, false);
                this._mainApp.automationUpdateObjectDlg.setTabVisible(lt.Annotations.JavaScript.AutomationUpdateObjectDlgTab.Reviews, false);
                this._mainApp.automationUpdateObjectDlg.userName = this._mainApp.documentViewer.userName;
                this._mainApp.automationUpdateObjectDlg.automation = this._mainApp.documentViewer.annotations.automation;
                this._mainApp.automationUpdateObjectDlg.targetObject = automation.currentEditObject;
                this._mainApp.automationUpdateObjectDlg.show();
            };
            AnnotationsPart.prototype.automation_edit = function (sender, e) {
                $(this._mainApp.mobileVersionControlsContainers).removeClass('visiblePanel');
                $(this.mobileVersionAnnotationsEditControls.annotationsEditControls).addClass('visiblePanel');
            };
            AnnotationsPart.prototype.closeDocument = function () {
                // The document has been closed or a new one is set, clear the load picture timeout if we have any
                if (this._loadPictureTimeout !== -1) {
                    clearTimeout(this._loadPictureTimeout);
                    this._loadPictureTimeout = -1;
                }
            };
            AnnotationsPart.prototype.renderingEngine_LoadPicture = function (sender, e) {
                // The renderingEngine.loadPicture occurs for every annotation object that has an embedded image
                // So instead of re-rendering the annotations everytime one of these images loaded, we will use a timer
                // to group the paints together for optimization.
                var _this = this;
                if (this._loadPictureTimeout !== -1) {
                    return;
                }
                this._loadPictureTimeout = setTimeout(function () {
                    _this._loadPictureTimeout = -1;
                    _this._mainApp.documentViewer.annotations.automation.invalidate(lt.LeadRectD.empty);
                    if (_this._mainApp.documentViewer.thumbnails != null)
                        _this._mainApp.documentViewer.thumbnails.invalidate(lt.LeadRectD.empty);
                }, 1000);
            };
            AnnotationsPart.prototype.removeAutomationTextArea = function (update) {
                if (this._automationTextArea == null)
                    return;
                this._automationTextArea.remove(update);
                this._automationTextArea = null;
            };
            AnnotationsPart.prototype.annotationsMenuItem_Click = function (e) {
                if (this._automationManagerHelper == null)
                    return;
                HTML5Demos.Utils.DemoHelper.checked($(this.headerToolbar_AnnotationsMenu.deselectOnDownMenuItem).find(".icon"), this._automationManagerHelper.automationManager.deselectOnDown);
                HTML5Demos.Utils.DemoHelper.checked($(this.headerToolbar_AnnotationsMenu.rubberbandSelectMenuItem).find(".icon"), !this._automationManagerHelper.automationManager.forceSelectionModifierKey);
            };
            AnnotationsPart.prototype.customizeRenderModeMenuItem_Click = function (e) {
                var _this = this;
                this._mainApp.customizeRenderModeDlg.automationManager = this._automationManagerHelper.automationManager;
                this._mainApp.customizeRenderModeDlg.allRenderers = this._originalRenderers;
                this._mainApp.customizeRenderModeDlg.currentRenderers = this._renderModeRenderers;
                this._mainApp.customizeRenderModeDlg.show();
                this._mainApp.customizeRenderModeDlg.OkClick = function () {
                    // Clear render mode renderers
                    _this._renderModeRenderers = {};
                    // Get the result renderers
                    for (var key in _this._mainApp.customizeRenderModeDlg.resultRenderers) {
                        if (_this._originalRenderers.hasOwnProperty(key)) {
                            _this._renderModeRenderers[key] = _this._mainApp.customizeRenderModeDlg.resultRenderers[key];
                        }
                    }
                    // If in render mode , update the renderers
                    if (_this._automationManagerHelper.automationManager.userMode == lt.Annotations.Core.AnnUserMode.render) {
                        _this._automationManagerHelper.automationManager.renderingEngine.renderers = _this._renderModeRenderers;
                    }
                    // Invalidate
                    _this._mainApp.documentViewer.view.invalidate(lt.LeadRectD.empty);
                    if (_this._mainApp.documentViewer.thumbnails != null)
                        _this._mainApp.documentViewer.thumbnails.invalidate(lt.LeadRectD.empty);
                };
            };
            AnnotationsPart.prototype.lockObjectMenuItem_Click = function (e) {
                var _this = this;
                var automation = this._mainApp.documentViewer.annotations.automation;
                if (automation == null)
                    return;
                this._mainApp.automationPasswordDlg.show(true);
                this._mainApp.automationPasswordDlg.OkClick = function () {
                    automation.currentEditObject.lock(_this._mainApp.automationPasswordDlg.password);
                    automation.invalidate(lt.LeadRectD.empty);
                    _this._mainApp.updateUIState();
                };
            };
            AnnotationsPart.prototype.unlockObjectMenuItem_Click = function (e) {
                var _this = this;
                var automation = this._mainApp.documentViewer.annotations.automation;
                if (automation == null)
                    return;
                this._mainApp.automationPasswordDlg.show(false);
                this._mainApp.automationPasswordDlg.OkClick = function () {
                    automation.currentEditObject.unlock(_this._mainApp.automationPasswordDlg.password);
                    if (automation.currentEditObject.isLocked)
                        window.alert("Invalid password");
                    automation.invalidate(lt.LeadRectD.empty);
                    _this._mainApp.updateUIState();
                };
            };
            AnnotationsPart.prototype.deselectOnDownMenuItem_Click = function (e) {
                if (this._automationManagerHelper == null)
                    return;
                this._automationManagerHelper.automationManager.deselectOnDown = !this._automationManagerHelper.automationManager.deselectOnDown;
                HTML5Demos.Utils.DemoHelper.checked($(this.headerToolbar_AnnotationsMenu.deselectOnDownMenuItem).find(".icon"), this._automationManagerHelper.automationManager.deselectOnDown);
            };
            AnnotationsPart.prototype.rubberbandSelectMenuItem_Click = function (e) {
                if (this._automationManagerHelper == null)
                    return;
                this._automationManagerHelper.automationManager.forceSelectionModifierKey = !this._automationManagerHelper.automationManager.forceSelectionModifierKey;
                HTML5Demos.Utils.DemoHelper.checked($(this.headerToolbar_AnnotationsMenu.rubberbandSelectMenuItem).find(".icon"), !this._automationManagerHelper.automationManager.forceSelectionModifierKey);
            };
            AnnotationsPart.prototype.showAnnotationsListBtn_Click = function (e) {
                var visibleAnnotationsList = !HTML5Demos.Utils.UI.isHidden($(this._mainApp.annotationsListControlsContainer));
                if (!visibleAnnotationsList) {
                    $(this._mainApp.navigationbar.showAnnotationsListControlsBtn).addClass("activeNavigationbarBtn");
                    $(this._mainApp.annotationsListControlsContainer).show();
                }
                else {
                    $(this._mainApp.navigationbar.showAnnotationsListControlsBtn).removeClass("activeNavigationbarBtn");
                    $(this._mainApp.annotationsListControlsContainer).hide();
                }
                this._mainApp.updateContainers();
            };
            AnnotationsPart.prototype.showAnnotationsObjectsBtn_Click = function (e) {
                $(this._mainApp.mobileVersionControlsContainers).removeClass('visiblePanel');
                $(this.mobileVersionAnnotationsEditControls.annotationsEditControls).addClass('visiblePanel');
            };
            AnnotationsPart.prototype.doneAnnotationsEditBtn_Click = function (e) {
                $(this.mobileVersionAnnotationsEditControls.annotationsEditControls).removeClass('visiblePanel');
            };
            return AnnotationsPart;
        }());
        DocumentViewerDemo.AnnotationsPart = AnnotationsPart;
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
})(HTML5Demos || (HTML5Demos = {}));
