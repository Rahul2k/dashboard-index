(function ($) {
    $.fn.confirmModal = function (opts) {
        var body = $('body');
        var defaultOptions = {
        //Modified by Hemin
        //confirmTitle: 'Please confirm',
        // confirmMessage: 'Are you sure you want to perform this action ?',
        //confirmOk: 'Yes',
        //confirmCancel: 'Cancel',
            confirmTitle: vrCommonRes["tiPleaseConfirm"],
            confirmMessage: vrCommonRes["msgAreUSureUWant2PerformThisAction"],
            confirmOk: vrCommonRes["Yes"],
            confirmCancel: vrCommonRes["Cancel"],
            confirmDirection: 'rtl',
            confirmStyle: 'warning',
            confirmCallback: defaultCallback,
            confirmCallbackCancel: defaultCancel,
            confirmOnlyOk:false,
            confirmObject:null
        };
        var options = $.extend(defaultOptions, opts);
        var time = Date.now();

        var buttonTemplate =
                       '<button class="btn btn-' + options.confirmStyle + '"  aria-hidden="true" id="cancelButton">' + options.confirmCancel + '</button>' +
                       '<button class="btn btn-primary" id="okButton" data-dismiss="ok" >' + options.confirmOk + '</button>';
        if (options.confirmDirection == 'ltr') {
            buttonTemplate =
                '<button class="btn btn-' + options.confirmStyle + '" id="okButton" data-dismiss="ok" >' + options.confirmOk + '</button>' +
                '<button class="btn btn-primary" aria-hidden="true" id="cancelButton">' + options.confirmCancel + '</button>';
        }
        if (options.confirmOnlyOk == true) {
            buttonTemplate =
                '<button class="btn btn-primary" id="okOnly" data-dismiss="ok" >' + options.confirmOk + '</button>';
        }

        var confirmModal =
                       $('<div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                           '<div class="modal-dialog">' +
                               '<div class="modal-content">' +
                                   '<div class="modal-header">' +
                                       '<h3>' + options.confirmTitle + '</h3>' +
                                   '</div>' +
                                   '<div class="modal-body">' +
                                       '<p style="word-wrap:break-word">' + options.confirmMessage + '</p>' +
                                   '</div>' +
                                   '<div class="modal-footer">' +
                                       buttonTemplate +
                                   '</div>' +
                               '</div>' +
                           '</div>' +
                       '</div>');



        confirmModal.find('#okButton').click(function (event) {
            options.confirmCallback(options.confirmObject);
            confirmModal.modal('hide');
        });

        confirmModal.find('#cancelButton').click(function (event) {
            options.confirmCallbackCancel(options.confirmObject);
            confirmModal.modal('hide');
        });
        confirmModal.find('#okOnly').click(function (event) {
            options.confirmCallback(options.confirmObject);
            confirmModal.modal('hide');
            //showAjaxReturnMessage(vrApplicationRes['msgJsRequestorRecSaveSuccessfully'], 's');
        });

        confirmModal.ShowModel();

        function defaultCallback() {

        }

        function defaultCancel() {

        }
    };
})(jQuery);

