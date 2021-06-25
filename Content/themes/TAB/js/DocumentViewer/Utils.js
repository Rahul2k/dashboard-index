var HTML5Demos;
(function (HTML5Demos) {
    var Utils;
    (function (Utils) {
        var DemoHelper = (function () {
            function DemoHelper() {
            }
            DemoHelper.byteArrayToArrayBuffer = function (array) {
                var bytes = new Uint8Array(array.length);
                array.forEach(function (val, i) {
                    bytes[i] = val;
                });
                return bytes.buffer;
            };
            DemoHelper.createThumbnailCanvas = function (originalCanvas, thumbnailCanvas, maxWidth, maxHeight) {
                var scaleFactor = 1;
                var originalWidth = originalCanvas.width;
                var originalHeight = originalCanvas.height;
                if (originalWidth > originalHeight)
                    scaleFactor = maxWidth / originalWidth;
                else
                    scaleFactor = maxHeight / originalHeight;
                thumbnailCanvas.width = originalWidth * scaleFactor;
                thumbnailCanvas.height = originalHeight * scaleFactor;
                var thumbnailCtx = thumbnailCanvas.getContext("2d");
                thumbnailCtx.scale(scaleFactor, scaleFactor);
                thumbnailCtx.drawImage(originalCanvas, 0, 0);
            };
            DemoHelper.cloneCanvas = function (oldCanvas) {
                var newCanvas = document.createElement('canvas');
                var context = newCanvas.getContext('2d');
                newCanvas.width = oldCanvas.width;
                newCanvas.height = oldCanvas.height;
                context.drawImage(oldCanvas, 0, 0);
                return newCanvas;
            };
            DemoHelper.isTouchDevice = function () {
                return DemoHelper._isTouchDevice;
            };
            DemoHelper.touchScroll = function (div) {
                if (DemoHelper.isTouchDevice()) {
                    div.addEventListener('touchstart', function (e) { return DemoHelper.touchScrollStart(e); }, false);
                    div.addEventListener('touchmove', function (e) { return DemoHelper.touchScrollMove(e); }, false);
                }
            };
            DemoHelper.touchScrollStart = function (e) {
                var targetTouchePageY = e.touches[0].pageY;
                var targetTouchePageX = e.touches[0].pageX;
                e.currentTarget._scrollStartPosY = e.currentTarget.scrollTop + targetTouchePageY;
                e.currentTarget._scrollStartPosX = e.currentTarget.scrollLeft + targetTouchePageX;
            };
            DemoHelper.touchScrollMove = function (e) {
                e.preventDefault();
                var targetTouchePageY = e.touches[0].pageY;
                var targetTouchePageX = e.touches[0].pageX;
                e.currentTarget.scrollTop = e.currentTarget._scrollStartPosY - targetTouchePageY;
                e.currentTarget.scrollLeft = e.currentTarget._scrollStartPosX - targetTouchePageX;
            };
            DemoHelper.checked = function (element, check) {
                check ? element.addClass("checked") : element.removeClass("checked");
            };
            DemoHelper.initSidebars = function () {
                // For collapsing left sidebar
                if ($('.sidebar-left').length > 0) {
                    $('#sidebarCollapseBtn-left').click(function () {
                        $('.sidebar-left').toggleClass('activeSidebar');
                        $('#sidebarCollapseBtn-left').toggleClass('collapseIcon');
                    });
                }
                // For collapsing right sidebar
                if ($('.sidebar-right').length > 0) {
                    $('#sidebarCollapseBtn-right').click(function () {
                        $('.sidebar-right').toggleClass('activeSidebar');
                        $('#sidebarCollapseBtn-right').toggleClass('collapseIcon');
                    });
                }
            };
            DemoHelper.resetSidebars = function () {
                // Reset left sidebar
                if ($('.sidebar-left').length > 0) {
                    $('.sidebar-left').removeClass('activeSidebar');
                    $('#sidebarCollapseBtn-left').removeClass('collapseIcon');
                }
                // Reset right sidebar
                if ($('.sidebar-right').length > 0) {
                    $('.sidebar-right').removeClass('activeSidebar');
                    $('#sidebarCollapseBtn-right').removeClass('collapseIcon');
                }
            };
            DemoHelper.initCollapsiblePanels = function () {
                // change the status of collapsible panels headers             
                $('.panel-collapse').on('hidden.bs.collapse', function (e) {
                    $(e.currentTarget).prev().find(".collapse-expand").removeClass("toggleToCollapse");
                    $(e.currentTarget).prev().find(".collapse-expand").addClass("toggleToExpand");
                });
                $('.panel-collapse').on('show.bs.collapse', function (e) {
                    $(e.currentTarget).prev().find(".collapse-expand").removeClass("toggleToExpand");
                    $(e.currentTarget).prev().find(".collapse-expand").addClass("toggleToCollapse");
                });
            };
            DemoHelper.selectText = function (textElement, startIndex, endIndex) {
                if (textElement.setSelectionRange) {
                    textElement.setSelectionRange(startIndex, endIndex);
                }
                else if (textElement["createTextRange"]) {
                    var range = textElement["createTextRange"]();
                    range.moveStart("character", startIndex);
                    range.moveEnd("character", endIndex);
                    range.select();
                }
                textElement.focus();
            };
            DemoHelper.isValidURI = function (uri) {
                var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                if (RegExp.test(uri)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            DemoHelper.showRequestError = function (jqueryXHR, statusText, errorThrown) {
                var body = null;
                var detail = null;
                try {
                    body = JSON.parse(jqueryXHR.responseText);
                    detail = "(" + body["detail"] + ")";
                    (window.console && console.log && console.log("Error: " + detail));
                }
                catch (e) {
                    (window.console && console.log && console.log("Could not parse JSON from Error"));
                    detail = "(Error " + jqueryXHR.status + ": " + jqueryXHR.statusText + ")";
                }
                var message = [
                    "An error has occurred in the application.",
                    detail
                ].join("\n");
                window.alert(message);
                jqueryXHR = null;
            };
            DemoHelper._isTouchDevice = (function () {
                return 'ontouchstart' in window;
            })();
            return DemoHelper;
        }());
        Utils.DemoHelper = DemoHelper;
        var Slider = (function () {
            function Slider(root) {
                // Initial checks
                if (!root)
                    throw "No element provided";
                this.$root = $(root);
                var parentNode = root.parentNode;
                if (!parentNode)
                    throw "Root does not have parent node";
                // init
                this.scrollOn = false;
                this.scrollOffset = 0;
                this.viewWidth = 0;
                // Left is the designated class, else we exit
                var left = root.querySelector("." + Slider.class_button_left);
                if (!left) {
                    throw "No left button element";
                }
                this.$left = $(left);
                this.$left.click(this.scrollButton.bind(this, true));
                // Right is the designated class, else we exit
                var right = root.querySelector("." + Slider.class_button_right);
                if (!right) {
                    throw "No right button element";
                }
                this.$right = $(right);
                this.$right.click(this.scrollButton.bind(this, false));
                // View is the designated class, else we exit
                var view = root.querySelector("." + Slider.class_view);
                if (!view) {
                    throw "No view element";
                }
                this.$view = $(view);
                this.$view.scroll(this.scroll.bind(this));
                // List is the designated class or the first (ul | ol), else we exit
                var list = root.querySelector("." + Slider.class_list);
                if (!list) {
                    var lists = Array.prototype.slice.call(root.querySelectorAll("ol, ul"));
                    if (lists.length)
                        list = lists[0];
                    else
                        throw "No list element";
                }
                this.$list = $(list);
                // Add the resize, and run it once
                window.addEventListener("resize", this.resize.bind(this));
                this.resize();
            }
            // Static Constructor
            Slider.search = function () {
                $("[" + Slider.attr_slider + "]").each(function () {
                    Slider.create(this);
                });
            };
            Slider.create = function (root) {
                return new Slider(root);
            };
            Slider.prototype.scroll = function () {
                this.scrollOffset = this.$view.scrollLeft();
                this.checkDisabled();
            };
            Slider.prototype.checkDisabled = function () {
                if (this.scrollOn) {
                    var view = this.$view.get(0);
                    this.$left.toggleClass(Slider.class_button_disabled, this.scrollOffset === 0);
                    this.$left.prop("disabled", this.scrollOffset === 0);
                    this.$right.toggleClass(Slider.class_button_disabled, this.scrollOffset + view.clientWidth === view.scrollWidth);
                    this.$right.prop("disabled", this.scrollOffset + view.clientWidth === view.scrollWidth);
                }
            };
            Slider.prototype.resize = function () {
                // update our state
                this.scrollOffset = this.$view.scrollLeft();
                var view = this.$view.get(0);
                this.scrollOn = view.scrollWidth > view.clientWidth;
                // Based on whether scrolling is present, show the buttons
                if (this.scrollOn) {
                    this.$root.addClass(Slider.class_buttons_visible);
                    this.checkDisabled();
                }
                else {
                    this.$root.removeClass(Slider.class_buttons_visible);
                }
            };
            Slider.prototype.scrollButton = function (doScrollLeft) {
                var fudge = 30;
                var change = this.$view.outerWidth(true) / 2;
                if (doScrollLeft) {
                    change = this.scrollOffset - change;
                    if (change <= fudge)
                        change = 0;
                }
                else {
                    change = this.scrollOffset + change;
                    var scrollWidth = this.$view.get(0).scrollWidth;
                    var clientWidth = this.$view.get(0).clientWidth;
                    if (change + fudge + clientWidth >= scrollWidth)
                        change = change + fudge;
                }
                var options = {
                    duration: 200,
                    complete: this.scroll.bind(this)
                };
                this.$view.animate({ scrollLeft: change }, options);
            };
            // attr to look for in HTML
            Slider.attr_slider = "data-lt-slider";
            // our classes
            //private static class_button_left_visible: string = "lt-slider-left-on";
            //private static class_button_right_visible: string = "lt-slider-right-on";
            Slider.class_buttons_visible = "lt-slider-buttons-on";
            Slider.class_button_disabled = "lt-slider-button-disabled";
            // our classes for element discovery
            Slider.class_button_left = "lt-slider-left";
            Slider.class_button_right = "lt-slider-right";
            Slider.class_view = "lt-slider-view";
            Slider.class_list = "lt-slider-list";
            return Slider;
        }());
        Utils.Slider = Slider;
        var UI = (function () {
            function UI() {
            }
            UI._init = function () {
                if (this._hideElementsClassStyle)
                    return;
                // Create and append a style declaration for hiding elements
                this._hideElementsClassStyle = document.createElement("style");
                this._hideElementsClassStyle.innerHTML = "." + this._hideElementClass + " { display: none !important; }";
                document.head.appendChild(this._hideElementsClassStyle);
            };
            // Only returns for first element
            // Modeled after the JQuery "isHiddenWithinTree" function
            // Whereas "toggle" will use the classes, this function falls back on JQuery if toggle() has not been called before
            UI.isHidden = function (element) {
                return element.length &&
                    ((this._hideElementsClassStyle && lt.LTHelper.hasClass(element[0], this._hideElementClass)) ||
                        element[0].style.display === "none" ||
                        (element[0].style.display === "" && element.css("display") === "none"));
            };
            // Not to be mixed with JQuery's toggle()
            // Simply adds or removes the class created from _init()
            UI.toggleHideClass = function (elements, showOrHide) {
                var toggleEach = typeof showOrHide === "undefined";
                // Can't remove the class if not yet initialized!
                if (!this._hideElementsClassStyle && !toggleEach && showOrHide)
                    return;
                this._init();
                var remove;
                for (var i = 0; i < elements.length; i++) {
                    var el = elements[i];
                    if (toggleEach)
                        remove = lt.LTHelper.hasClass(el, this._hideElementClass);
                    else
                        remove = showOrHide;
                    if (remove)
                        lt.LTHelper.removeClass(el, this._hideElementClass);
                    else
                        lt.LTHelper.addClass(el, this._hideElementClass);
                }
            };
            /* JQuery, although helpful for most things, does not have the best performance when it comes to toggling element visibility.
             * The utility functions below provide better speed for showing and hiding UI elements by using classes instead of
             * directly modifying the DOM. These functions also only deal with the passed elements, not their parent elements as .is(":visible")
             * and is(":hidden") do.
             */
            UI._hideElementClass = "_utils_hide";
            UI._hideElementsClassStyle = null;
            return UI;
        }());
        Utils.UI = UI;
    })(Utils = HTML5Demos.Utils || (HTML5Demos.Utils = {}));
})(HTML5Demos || (HTML5Demos = {}));
//# sourceMappingURL=Utils.js.map