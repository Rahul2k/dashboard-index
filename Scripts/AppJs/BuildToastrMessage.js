var vrApplicationRes = [];
var vrClientsRes = [];
var vrCommonRes = [];
var vrDataRes = [];
var vrDatabaseRes = [];
var vrDirectoriesRes = [];
var vrImportRes = [];
var vrLabelManagerRes = [];
var vrReportsRes = [];
var vrRetentionRes = [];
var vrScannerRes = [];
var vrSecurityRes = [];
var vrTablesRes = [];
var vrViewsRes = [];
var vrHTMLViewerRes = [];


function getResourcesByModule(prModuleName) {
    $.ajax({
        url: '/Resource/GetResources',
        type: 'GET',
        async: false, 
        data: { moduleName: prModuleName },
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            switch (prModuleName.toLowerCase()) {
                case 'application':
                    vrApplicationRes = response;
                    break;
                case 'clients':                    
                    vrClientsRes = response;
                    break;
                case 'common':
                    vrCommonRes = response;
                    break;
                case 'data':
                    vrDataRes = response;
                    break;
                case 'database':
                    vrDatabaseRes = response;
                    break;
                case 'directories':
                    vrDirectoriesRes = response;
                    break;
                case 'import':
                    vrImportRes = response;
                    break;
                case 'labelmanager':
                    vrLabelManagerRes = response;
                    break;
                case 'reports':
                    vrReportsRes = response;
                    break;
                case 'retention':
                    vrRetentionRes = response;
                    break;
                case 'scanner':
                    vrScannerRes = response;
                    break;
                case 'security':
                    vrSecurityRes = response;
                    break;
                case 'tables':                    
                    vrTablesRes = response;
                    break;
                case 'views':                    
                    vrViewsRes = response;
                    break;
                case 'htmlviewer':                    
                    vrHTMLViewerRes = response;
                    break;
                case 'all':
                    vrApplicationRes = response.resApp;
                    vrClientsRes = response.resClient;
                    vrCommonRes = response.resCommon;
                    vrDataRes = response.resData;
                    vrDatabaseRes = response.resDatabase;
                    vrDirectoriesRes = response.resDirectories;
                    vrImportRes = response.resImport;
                    vrLabelManagerRes = response.resLabelmanager;
                    vrReportsRes = response.resReports;
                    vrRetentionRes = response.resRetention;
                    vrScannerRes = response.resScanner;
                    vrSecurityRes = response.resSecurity;
                    vrTablesRes = response.resTables;
                    vrViewsRes = response.resViews;
                    vrHTMLViewerRes = response.resHTMLViewer;
                    break;
            }
        },
        error: function (xhr, status, error) {
        }
    });
}

function LoadErrorMessage(errorType, message, msgTitle) {

    var i = -1;
    var toastCount = 0;
    var $toastlast;
    var getMessage = '';
    var getMessageWithClearButton = function (msg) {
        msg = msg ? msg : 'Clear itself?';
        msg += '<br /><br /><button type="button" class="btn clear">Yes</button>';
        return msg;
    };

    var shortCutFunction = errorType;
    var msg = message;
    var title = msgTitle || '';
    var $showDuration = 300;
    var $hideDuration = 1000;
    var $timeOut = 5000;
    var $extendedTimeOut = 1000;
    var $showEasing = 'swing';
    var $hideEasing = 'linear';
    var $showMethod = 'fadeIn';
    var $hideMethod = 'fadeOut';
    var toastIndex = toastCount++;
    var addClear = false;

    toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
        onclick: null
    };

    if ($showDuration.length) {
        toastr.options.showDuration = 10;
    }

    if ($hideDuration.length) {
        toastr.options.hideDuration = $hideDuration;
    }

    if ($timeOut.length) {
        toastr.options.timeOut = $timeOut;//addClear ? 0 : $timeOut;
    }

    if ($extendedTimeOut.length) {
        toastr.options.extendedTimeOut = $extendedTimeOut;// addClear ? 0 : $extendedTimeOut;
    }

    if ($showEasing.length) {
        toastr.options.showEasing = $showEasing;
    }

    if ($hideEasing.length) {
        toastr.options.hideEasing = $hideEasing;
    }

    if ($showMethod.length) {
        toastr.options.showMethod = $showMethod;
    }

    if ($hideMethod.length) {
        toastr.options.hideMethod = $hideMethod;
    }

    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
    $toastlast = $toast;

    if (typeof $toast === 'undefined' || $toast === null) {
        return;
    }

    if ($toast.find('#okBtn').length) {
        $toast.delegate('#okBtn', 'click', function () {
            $toast.remove();
        });
    }
    if ($toast.find('#surpriseBtn').length) {
        $toast.delegate('#surpriseBtn', 'click', function () {
            //alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
        });
    }
    if ($toast.find('.clear').length) {
        $toast.delegate('.clear', 'click', function () {
            toastr.clear($toast, { force: true });
        });
    }
    function getLastToast() {
        return $toastlast;
    }
}

function showAjaxReturnMessage(message, msgType) {
    var divId = '';
    var msgcls = '';
    var msgTitle = '';
    switch (msgType.toLowerCase()) {
        case 'warning': case 'w':
            msgcls = 'warning';
            msgTitle = vrCommonRes["Warning"];
            break;
        case 'error': case 'e':
            msgcls = 'error';
            msgTitle = vrCommonRes["msgError"];
            break;
        case 'success': case 's':
            msgcls = 'success';
            msgTitle = vrCommonRes["Success"];
            break;
        case 'info': case 'i':
            msgcls = 'info';
            msgTitle = vrCommonRes["Information"];
            break;
        case 'loading':
            divId = 'ajaxloading';
            break;
    }
    LoadErrorMessage(msgcls, message, msgTitle);
}

String.format = function () {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
}

$.fn.ShowModel = function () {
    $(this).modal({ show: true, keyboard: false, backdrop: 'static' });
}
$.fn.HideModel = function () {
    $('body').removeClass("modal-open");
    $(this).modal('hide');
}