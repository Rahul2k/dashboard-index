var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTML5Demos;
(function (HTML5Demos) {
    var DocumentViewerDemo;
    (function (DocumentViewerDemo) {
        var Converter;
        (function (Converter) {
            var Format = (function () {
                function Format(name, extension) {
                    this.friendlyName = name;
                    this.extension = extension;
                }
                return Format;
            }());
            Converter.Format = Format;
            var RasterFormat = (function (_super) {
                __extends(RasterFormat, _super);
                function RasterFormat(name, bpp, format, extension) {
                    _super.call(this, name, extension);
                    this.bitsPerPixel = bpp;
                    this.format = format;
                }
                return RasterFormat;
            }(Format));
            Converter.RasterFormat = RasterFormat;
            var DocumentFormat = (function (_super) {
                __extends(DocumentFormat, _super);
                function DocumentFormat(name, format, options, extension) {
                    _super.call(this, name, extension);
                    this.format = format;
                    this.options = options;
                }
                return DocumentFormat;
            }(Format));
            Converter.DocumentFormat = DocumentFormat;
            var Formats = (function () {
                function Formats() {
                }
                Formats.rasterFormats = [
                    new RasterFormat("TIFF Color", 24, lt.Documents.RasterImageFormat.tifJpeg422, "tif"),
                    new RasterFormat("TIFF B/W", 1, lt.Documents.RasterImageFormat.ccittGroup4, "tif"),
                    new RasterFormat("PDF Color", 24, lt.Documents.RasterImageFormat.rasPdfJpeg, "pdf"),
                    new RasterFormat("PDF B/W", 1, lt.Documents.RasterImageFormat.rasPdfG4, "pdf"),
                ];
                Formats.documentFormats = [
                    // PDF
                    new DocumentFormat("Adobe Portable Document Format", lt.Documents.Writers.DocumentFormat.pdf, new lt.Documents.Writers.PdfDocumentOptions(), "pdf"),
                    // DOCX
                    new DocumentFormat("Microsoft Word", lt.Documents.Writers.DocumentFormat.docx, new lt.Documents.Writers.DocxDocumentOptions(), "docx"),
                    // RTF
                    new DocumentFormat("Rich Text Format", lt.Documents.Writers.DocumentFormat.rtf, new lt.Documents.Writers.RtfDocumentOptions(), "rtf"),
                    // TXT
                    new DocumentFormat("Text", lt.Documents.Writers.DocumentFormat.text, new lt.Documents.Writers.TextDocumentOptions(), "txt"),
                    // DOC
                    new DocumentFormat("Microsoft Word (97-2003)", lt.Documents.Writers.DocumentFormat.doc, new lt.Documents.Writers.DocDocumentOptions(), "doc"),
                    // XLS
                    new DocumentFormat("Microsoft Excel (97-2003)", lt.Documents.Writers.DocumentFormat.xls, new lt.Documents.Writers.XlsDocumentOptions(), "xls"),
                    // HTML
                    new DocumentFormat("Hyper Text Markup Language", lt.Documents.Writers.DocumentFormat.html, new lt.Documents.Writers.HtmlDocumentOptions(), "htm"),
                    // EMF
                    new DocumentFormat("Windows Enhanced Metafile", lt.Documents.Writers.DocumentFormat.emf, new lt.Documents.Writers.DocumentOptions(lt.Documents.Writers.DocumentFormat.emf), "emf"),
                    // XPS
                    new DocumentFormat("Open XML Paper Specification", lt.Documents.Writers.DocumentFormat.xps, new lt.Documents.Writers.XpsDocumentOptions(), "xps"),
                    // EPUB
                    new DocumentFormat("Electronic Publication", lt.Documents.Writers.DocumentFormat.pub, new lt.Documents.Writers.PubDocumentOptions(), "epub"),
                    // MOB
                    new DocumentFormat("Mobipocket", lt.Documents.Writers.DocumentFormat.mob, new lt.Documents.Writers.MobDocumentOptions(), "mob"),
                    // SVG
                    new DocumentFormat("Scalable Vector Graphics", lt.Documents.Writers.DocumentFormat.svg, new lt.Documents.Writers.SvgDocumentOptions(), "svg")
                ];
                return Formats;
            }());
            Converter.Formats = Formats;
        })(Converter = DocumentViewerDemo.Converter || (DocumentViewerDemo.Converter = {}));
    })(DocumentViewerDemo = HTML5Demos.DocumentViewerDemo || (HTML5Demos.DocumentViewerDemo = {}));
})(HTML5Demos || (HTML5Demos = {}));
