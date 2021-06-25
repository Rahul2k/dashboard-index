
var PrintPageUnits;
(function (PrintPageUnits) {
    PrintPageUnits[PrintPageUnits["inches"] = 0] = "inches";
    PrintPageUnits[PrintPageUnits["millimeters"] = 1] = "millimeters";
})(PrintPageUnits || (PrintPageUnits = {}));

var PageOption;
(function (PageOption) {
    PageOption[PageOption["All"] = 0] = "All";
    PageOption[PageOption["Current"] = 1] = "Current";
    PageOption[PageOption["Select"] = 2] = "Select";
})(PageOption || (PageOption = {}));


var PrintPageSize = (function () {
    function PrintPageSize(name, width, height, unit) {
        var unitsPerInch = lt.Documents.Document.unitsPerInch;
        this._name = name;
        this._size = lt.LeadSizeD.create(width, height);
        this._units = unit;
        if (this._units === PrintPageUnits.inches) {
            this._documentUnits = lt.LeadSizeD.create(this._size.width * unitsPerInch, this._size.height * unitsPerInch);
        }
        else {
            this._documentUnits = lt.LeadSizeD.create(this._size.width / 25.4 * unitsPerInch, this._size.height / 25.4 * unitsPerInch);
        }
    }
    Object.defineProperty(PrintPageSize.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintPageSize.prototype, "size", {
        get: function () { return this._size; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintPageSize.prototype, "units", {
        get: function () { return this._units; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrintPageSize.prototype, "documentUnits", {
        get: function () { return this._documentUnits; },
        enumerable: true,
        configurable: true
    });
    PrintPageSize.prototype.toString = function () {
        var unit = this._units === PrintPageUnits.inches ? "in" : "mm";
        return this._name + " (" + this._size.width + " x " + this._size.height + " " + unit + ")";
    };
    return PrintPageSize;
}());

//and here I call this one to popup the print dialog
var PrintDlg = (function () {
    function PrintDlg() {
        this._title = null;
        // Create shortcuts for the dialog UI elements 
        this.dialogUI = {
            dialog: "#printDialog",
            pageOptionRadioBtnsGroup: "input[name=pageOption]",
            currentPageLabel: "#printCurrentPageLabel",
            orientationSelectElement: "#orientation",
            pageSizeSelectElement: "#pageSize",
            showAnnotationsCheckbox: "#showAnnotations",
            removeMarginsContainer: "#removeMarginsContainer",
            removeMarginsCheckbox: "#removeMargins",
            pagesTextInput: "#pages",
            printBtn: "#doPrint"
        };
        this._sizes = [];
        this._sizes = [
            // Normal Inches Sizes
            new PrintPageSize("Letter", 8.5, 11, PrintPageUnits.inches),
            new PrintPageSize("Legal", 8.5, 14, PrintPageUnits.inches),
            new PrintPageSize("Foolscap", 8, 13, PrintPageUnits.inches),
            new PrintPageSize("Tabloid", 11, 17, PrintPageUnits.inches),
            // A Page Sizes
            new PrintPageSize("A0", 841, 1189, PrintPageUnits.millimeters),
            new PrintPageSize("A1", 594, 841, PrintPageUnits.millimeters),
            new PrintPageSize("A2", 420, 594, PrintPageUnits.millimeters),
            new PrintPageSize("A3", 297, 420, PrintPageUnits.millimeters),
            new PrintPageSize("A4", 210, 297, PrintPageUnits.millimeters),
            // Arch Page Sizes
            new PrintPageSize("Arch A", 9, 12, PrintPageUnits.inches),
            new PrintPageSize("Arch B", 12, 18, PrintPageUnits.inches),
            new PrintPageSize("Arch C", 18, 24, PrintPageUnits.inches),
            new PrintPageSize("Arch D", 24, 36, PrintPageUnits.inches),
            new PrintPageSize("Arch E", 36, 48, PrintPageUnits.inches),
            new PrintPageSize("Arch E1", 30, 42, PrintPageUnits.inches),
            new PrintPageSize("Arch E2", 26, 38, PrintPageUnits.inches),
            new PrintPageSize("Arch E3", 27, 39, PrintPageUnits.inches),
        ];
        this.Init();
    }
    Object.defineProperty(PrintDlg.prototype, "printClick", {
        set: function (value) { this._printClick = value; },
        enumerable: true,
        configurable: true
    });
    PrintDlg.prototype.Init = function () {
        $(this.dialogUI.pagesTextInput).bind("click", $.proxy(this.pagesTextInput_Click, this));
        $(this.dialogUI.printBtn).bind("click", $.proxy(this.printBtn_Click, this));
        if (lt.LTHelper.browser === lt.LTBrowser.safari) {
            // RemoveMargins will have no effect in safari, so let's just hide it.
            $(this.dialogUI.removeMarginsContainer).hide();
        }
        // Add all the page sizes
        var $select = $(this.dialogUI.pageSizeSelectElement);
        $select.html("");
        this._sizes.forEach(function (entry) {
            var toString = entry.toString();
            var $option = $(document.createElement("option")).text(toString).val(toString);
            $select.append($option);
        });
    };
    PrintDlg.prototype.show = function (doc, currentPageNumber, orientation) {
        this._title = doc.name || null;
        this._pageCount = leadtools.documentViewer.pageCount;
        this._currentPageNumber = currentPageNumber;
        $(this.dialogUI.currentPageLabel).text(" (Page " + currentPageNumber + ")");
        $(this.dialogUI.orientationSelectElement).val(orientation.toString());
        $(this.dialogUI.dialog).modal();
    };
    PrintDlg.prototype.pagesTextInput_Click = function (e) {
        $(this.dialogUI.pageOptionRadioBtnsGroup).prop('checked', false);
        $(this.dialogUI.pageOptionRadioBtnsGroup + "[value=" + PageOption.Select + "]").prop('checked', true);
    };
    PrintDlg.prototype.validateInput = function (input) {
        input = input.trim();
        if (input.search(new RegExp("(([0-9]|[,*])+-?)")) == 0) {
            // Start and end with a number
            if (input.search(new RegExp("^([0-9])")) == 0 && input.search(new RegExp("([0-9]$)")) != -1) {
                return true;
            }
            return false;
        }
        return false;
    };
    PrintDlg.prototype.validatePageNumbersRange = function (pageNumbers) {
        for (var i = 0; i < pageNumbers.length; i++) {
            if (pageNumbers[i] > leadtools.documentViewer.pageCount)
                return false;
        }
        return true;
    };
    PrintDlg.prototype.parseInput = function (input) {
        var inputArray = input.split(",");
        var pageNumbers = new Array();
        for (var index in inputArray) {
            if (inputArray.hasOwnProperty(index)) {
                // Add range
                if (inputArray[index].indexOf("-") != -1) {
                    var start = parseInt(inputArray[index].split("-")[0]);
                    var end = parseInt(inputArray[index].split("-")[1]);
                    for (var i = start; i <= end; i++) {
                        if (pageNumbers.indexOf(i) == -1) {
                            pageNumbers.push(i);
                        }
                    }
                }
                else {
                    // Add a single page
                    if (pageNumbers.indexOf(i) == -1) {
                        var pageNum = inputArray[index].trim();
                        pageNumbers.push(parseInt(pageNum));
                    }
                }
            }
        }
        return pageNumbers;
    };
    PrintDlg.prototype.printBtn_Click = function (e) {
        //clear input range;
        var options = new lt.Documents.UI.PrintDocumentOptions();
        var pageOption = $(this.dialogUI.pageOptionRadioBtnsGroup).filter(':checked').val();
        if (pageOption != PageOption.All) {
            if (pageOption == PageOption.Current) {
                var curpage = this._currentPageNumber - 1;
                options.pagesList.push(curpage);
            }
            else {
                var input = $(this.dialogUI.pagesTextInput).val();
                var isValidInput = this.validateInput(input);
                if (isValidInput) {
                    var pageNumbers = this.parseInput(input);
                    var inRange = this.validatePageNumbersRange(pageNumbers);
                    if (inRange) {
                        for (var i = 0; i < pageNumbers.length; i++) {
                            options.pagesList.push(pageNumbers[i] - 1);
                        }
                    }
                    else {
                        //window.alert("Out of range.\nPlease enter a page number between 1 and " + this._pageCount);
                        //showAjaxReturnMessage(vrHTMLViewerRes["msgPrtOutofRange"] + " " + this._pageCount, "w");
                        $(this.dialogUI.pagesTextInput).val("");
                        return;
                    }
                }
                else {
                    //window.alert("Please enter a valid page range.");
                    showAjaxReturnMessage(vrHTMLViewerRes["msgPrtValidpagerange"], "w");
                    $(this.dialogUI.pagesTextInput).val("");
                    return;
                }
            }
        }
        // Uncomment to manage client rendering pixel size (more pixels means more memory usage - default is 2000px, recommended max is 4000)
        //options.clientRenderSizePixels = 4000;
        var printElement = "";
        if (lt.LTHelper.OS == lt.LTOS.android && lt.LTHelper.browser == lt.LTBrowser.chrome) {
            // For Android Chrome: use the printDIV instead of iframe element - window.print prints the whole screen regardless
            printElement = document.getElementById("printDiv");
        }
        else {
            // Use iframe element directly
            printElement = document.getElementById("printFrame");
            if (lt.LTHelper.OS == lt.LTOS.iOS && printElement) {
                // Prevent issues with iOS post-print UI
                printElement.style.position = "relative";
            }
        }

        options.title = this._title;
        options.orientation = parseInt($(this.dialogUI.orientationSelectElement).val());
        var selectedIndex = parseInt($(this.dialogUI.pageSizeSelectElement).prop("selectedIndex"));
        var entry = this._sizes[selectedIndex];
        options.pageSize = entry.documentUnits;
        options.showAnnotations = $(this.dialogUI.showAnnotationsCheckbox).is(":checked");
        options.removeMargins = $(this.dialogUI.removeMarginsCheckbox).is(":checked");
        $(this.dialogUI.dialog).modal("hide");
        $("#spinningWheel").show();
        options.parent = printElement;
        var printProgress = leadtools.documentViewer.print(options).done(function (data) {
            $("#spinningWheel").hide();
        }).fail(function (err) {
            //showAjaxReturnMessage(err, "e");
            $("#spinningWheel").hide();
            //window.alert(err);
        })
    };
    return PrintDlg;
}());