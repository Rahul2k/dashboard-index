var HTML5Demos;
(function (HTML5Demos) {
    var Dialogs;
    (function (Dialogs) {
        var DocumentPropertiesDlg = (function () {
            function DocumentPropertiesDlg() {
                // Create shortcuts for the dialog UI elements
                this.dialogUI = {
                    dialog: "#documentPropertiesDialog",
                    documentInfoTableBodyElement: "#documentInfo",
                    metadataTableBodyElement: "#metadata"
                };
            }
            DocumentPropertiesDlg.prototype.show = function (document) {
                this.setup(document);
                $(this.dialogUI.dialog).modal();
            };
            DocumentPropertiesDlg.prototype.setup = function (document) {
                // Ensure that any open panels are closed before showing the dialog
                $('#dialogPanelsContainer .in').collapse('hide');
                var documentInfo = new Array();
                documentInfo["Document ID"] = document.documentId;
                documentInfo["Name"] = document.name;
                documentInfo["URL"] = document.uri;
                documentInfo["MIME Type"] = document.mimeType;
                documentInfo["Encrypted"] = document.isDecrypted ? "Yes" : "No";
                if (document.annotations.annotationsUri != null) {
                    documentInfo["Annotations URL"] = document.annotations.annotationsUri;
                }
                documentInfo["Pages"] = document.pages.count.toString();
                documentInfo["Cache Status"] = document.cacheStatus === lt.Documents.DocumentCacheStatus.synced ? "Synced" : "Not Synced";
                documentInfo["Last Synced"] = document.lastCacheSyncTime.toString();
                if (document.pages.count > 0) {
                    var page = document.pages.item(0);
                    var pageSize = page.size;
                    var sizeInches = lt.LeadSizeD.create(pageSize.width / lt.Documents.Document.unitsPerInch, pageSize.height / lt.Documents.Document.unitsPerInch);
                    var sizeMm = lt.LeadSizeD.create(sizeInches.width * 25.4, sizeInches.height * 25.4);
                    var sizePixels = document.sizeToPixels(pageSize);
                    documentInfo["Page size"] = sizeInches.width.toFixed(3) + " x " + sizeInches.height.toFixed(3) + " in, " + sizeMm.width.toFixed(3) + " x " + sizeMm.height.toFixed(3) + " mm, " + sizePixels.width.toString() + " x " + sizePixels.height.toString() + " px";
                }
                this.generateDocumentInfoTable(documentInfo);
                this.generateMetadataTable(document.metadata);
                $(this.dialogUI.dialog).modal();
            };
            DocumentPropertiesDlg.prototype.generateDocumentInfoTable = function (documentInfo) {
                var table = "";
                for (var key in documentInfo) {
                    if (documentInfo.hasOwnProperty(key)) {
                        var value = documentInfo[key];
                        var length = value ? value.length : 0;
                        table += "<tr>";
                        table += "<td>" + key + "</td>";
                        table += "<td><input type='text' value='" + value + "' size='" + length + "' class='documentInfoField' readonly /></td>";
                        table += "</tr>";
                    }
                }
                $(this.dialogUI.documentInfoTableBodyElement).html(table);
            };
            DocumentPropertiesDlg.prototype.generateMetadataTable = function (metadata) {
                var table = "";
                for (var key in metadata) {
                    if (metadata.hasOwnProperty(key)) {
                        var value = metadata[key];
                        if (DocumentPropertiesDlg._dates.indexOf(key.toLowerCase()) !== -1) {
                            try {
                                var date = new Date(Date.parse(value));
                                value = date.toString();
                            }
                            catch (e) { }
                        }
                        var length = value ? value.length : 0;
                        table += "<tr>";
                        table += "<td>" + key + "</td>";
                        table += "<td><input type='text' value='" + value + "' size='" + length + "' class='metadataInfoField' readonly /></td>";
                        table += "</tr>";
                    }
                }
                $(this.dialogUI.metadataTableBodyElement).html(table);
            };
            DocumentPropertiesDlg._dates = ["created", "accessed", "modified"];
            return DocumentPropertiesDlg;
        }());
        Dialogs.DocumentPropertiesDlg = DocumentPropertiesDlg;
    })(Dialogs = HTML5Demos.Dialogs || (HTML5Demos.Dialogs = {}));
})(HTML5Demos || (HTML5Demos = {}));
