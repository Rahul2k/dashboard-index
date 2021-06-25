function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = value + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function delCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
function fn_cancelQueryWindow() {
    $('.cancelQueryWindow').off('click').click(function () {
        setCancelQueryWindow_Click();
    });
}


function modalPopupAsync() {
    //$('.modal').modal({
    //    keyboard: false,
    //    show: true,
    //    backdrop: 'static'
    //});
    // Jquery draggable
    $('.modal-dialog').draggable({
        handle: ".modal-header",
        stop: function (event, ui) {
            var vrLeftTop = Math.round(ui.position.left) + ',' + Math.round(ui.position.top);
            $('#HiddenField1').val(vrLeftTop);
            if ($('.modal-title span').attr('id').toLowerCase().indexOf('linkscript') > 0) {
                setCookie('dialogPositionLinkScript', $('#HiddenField1').val(), 180);
            }
            else if ($('.modal-title span').attr('id').toLowerCase().indexOf('processordelete') > 0) {
                setCookie('dialogPositionProcessorDelete', $('#HiddenField1').val(), 180);
            }
            else if ($('.modal-title span').attr('id').toLowerCase().indexOf('move') > 0) {
                setCookie('dialogPositionMove', $('#HiddenField1').val(), 180);
            }
            else if ($('.modal-title span').attr('id').toLowerCase().indexOf('none') > 0) {
                setCookie('dialogPositionNone', $('#HiddenField1').val(), 180);
            }
            else if ($('.modal-title span').attr('id').toLowerCase().indexOf('query') > 0) {
                setCookie('dialogPositionQuery', $('#HiddenField1').val(), 180);
            }
            else if ($('.modal-title span').attr('id').toLowerCase().indexOf('search') > 0) {
                setCookie('dialogPositionSearch', $('#HiddenField1').val(), 180);
            }
        }
    });
}

function fn_FloatingButtons_QueryWindow() {
    setTimeout(function () {
        if ($('.modalblock').hasScrollBar()) {
            $('#mdlFooterClone').empty().html($('.model-Content .modal-footer').clone());
            $('#mdlFooterClone').find('.modal-footer').css({ 'width': $('.model-Content .modal-footer').width() + 'px' });
            if (($('.modalblock').get(0).scrollHeight - $('.modalblock').height()) <= 30) {
                $('#mdlFooterClone').removeClass('affixed');
            }
            $('.modalblock').scroll(function () {
                if ($('.modalblock').get(0).scrollHeight > (($('.modalblock').height() + $('.modalblock').scrollTop()) + 95)) {
                    $('#mdlFooterClone').addClass('affixed');
                }
                else {
                    $('#mdlFooterClone').removeClass('affixed');
                }
            });
        }
        else {
            $('#mdlFooterClone, #mdlFilterFormFooterClone').hide();
        }
    }, 800);
    //--Start:Query Window Pop Up Footer Button Panel Change on Window Resize-Added by Milan Patel
    $(window).resize(function () {
        if ($('.modalblock').get(0).scrollHeight > (($('.modalblock').height() + $('.modalblock').scrollTop()) + 95)) {
            $('#mdlFooterClone').addClass('affixed');
        }
        else {
            $('#mdlFooterClone').removeClass('affixed');
        }
    });
    //--End:Query Window Pop Up Footer Button Panel Change on Window Resize
}