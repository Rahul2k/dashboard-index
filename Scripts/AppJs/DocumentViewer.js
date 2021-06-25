window.onload = function () {
    // Init the document viewer, pass along the panels
    var createOptions = new lt.Documents.UI.DocumentViewerCreateOptions();
    // Set thumbnailsContainer
    createOptions.thumbnailsContainer = document.getElementById("thumbnailsDiv");
    // Set viewContainer
    createOptions.viewContainer = document.getElementById("documentViewerDiv");
             
    // Create the document viewer
    this._documentViewer = lt.Documents.UI.DocumentViewerFactory.createDocumentViewer(createOptions);
             
    // Set interactive mode
    this._documentViewer.commands.run(lt.Documents.UI.DocumentViewerCommands.interactivePanZoom);
             
    // We prefer SVG viewing
    this._documentViewer.view.preferredItemType = lt.Documents.UI.DocumentViewerItemType.svg;
    var _this = this;
             
    // Load a PDF document
    var url = "http://demo.leadtools.com/images/pdf/leadtools.pdf";
			 
    var loadDocumentCommand = lt.Documents.LoadDocumentCommand.create(url);
                
    loadDocumentCommand.run()
    .done(function (document) {
        // Set the document in the viewer
        _this._documentViewer.setDocument(url);
    })
    .fail(function (error) {
        alert(String.format(vrApplicationRes["msgJsDocumentViewerErrLoadingDoc"], error));
    });
};