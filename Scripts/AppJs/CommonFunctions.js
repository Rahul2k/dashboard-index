$(document).ajaxStart(function () {
    $("#ajaxloading").show();
});
$(document).ajaxComplete(function () {
    $("#ajaxloading").hide();
});
var IS_ADMIN = false;

//var vrApplicationRes = [];
//var vrClientsRes = [];
//var vrCommonRes = [];
//var vrDataRes = [];
//var vrDatabaseRes = [];
//var vrDirectoriesRes = [];
//var vrImportRes = [];
//var vrLabelManagerRes = [];
//var vrReportsRes = [];
//var vrRetentionRes = [];
//var vrScannerRes = [];
//var vrSecurityRes = [];
//var vrTablesRes = [];
//var vrViewsRes = [];

$(document).ajaxError(function (e, xhr) {
    toastr.remove();
    if (xhr.status == 401) {
        if (window.location.href.toLowerCase().indexOf("retention") > -1) {
            window.location = "../data.aspx";
        }
        else {
            window.location = "data.aspx";
        }
    }
    else if (xhr.status == 403) {
        showAjaxReturnMessage(xhr.error, 'e');
        //window.location = "signin.aspx";
    }
});
function bindDynamicMenus(ctrl, e) {
    switch (ctrl.id.toLowerCase()) {
        case 'data':
            BindAccordianData();
            RedirectOnAccordian(urls.Admin.LoadDataView);
            $('#title, #navigation').text(vrCommonRes['ptDataView']);
            break;
        case 'tablesmain':
            BindAccordianTable();
            RedirectOnAccordian(urls.TableTracking.LoadTableTab);
            $('#title, #navigation').text(vrCommonRes['mnuTables']);
            break;
    }
}
function setFirstMenuSelected(ctrl) {
    if (!$('#' + ctrl.id).parent().find('ul').hasClass('displayed')) {
        setTimeout(function () {
            var vFirstChild = $('#' + ctrl.id).parent().find('ul li a')[0].id;
            $('#' + vFirstChild).trigger('click');
        }, 100);
    }
}
function setBodyHeight() {    
    $('.content-wrapper,.content-wrapper1').height($(window).height() - (110 - ($('.main-footer').css('display') == 'none' ? 40 : 0))).css({ 'overflow-y': 'auto' });
    if ($('.main-footer').height() > 30)
    {
        $('.content-wrapper').height($('.content-wrapper').height() - ($('.main-footer').height()-30));
    }
    if (window.location.href.toLowerCase().indexOf('labelmanager') >= 0 || window.location.href.toLowerCase().indexOf('import') >= 0 || window.location.href.toLowerCase().indexOf('backgroundstatus') >= 0) {
        $(".main-footer").css("width", $(".main-header").outerWidth());
    }
    else {
        $(".main-footer").css("width", $(".main-header").outerWidth() - 230);
    }
}
$(window).resize(function () {
    setBodyHeight();
});
$(document).ready(function () {
    $('.drillDownMenu').linkesDrillDown({ cookieName: 'hdnAdminMnuIds' });
    setBodyHeight();
    $.ajaxSetup({ cache: false });
    //Check for Module level access for logged-in user.
    CheckModuleLevelAccess();
    $(".divMenu").mCustomScrollbar();
    $.ajax({
        url: urls.Common.SetCulture,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html'
    });
    LoadViewPartial(); //Bind View Menu
    ReportsTreePartial(); //Bind Reports Menu
    if (decodeURI(getCookie('hdnAdminMnuIds')) == 'null' || decodeURI(getCookie('hdnAdminMnuIds')) == undefined) {
        setCookie('hdnAdminMnuIds', 'RALADM0|Attachments', 1);
    }
    if (decodeURI(getCookie('hdnAdminMnuIds')) != null && decodeURI(getCookie('hdnAdminMnuIds')) != undefined && window.location.href.toLowerCase().indexOf('admin') > -1) {
        var vrArr = decodeURI(getCookie('hdnAdminMnuIds')).split('|');
        $.each(vrArr, function (index, value) {
            if (((vrArr.length - 1) >= index) || vrArr[0] == 'treeReports' || vrArr[0] == 'treeViews') {
                if (value != "undefined") {
                    $('#' + value).trigger('click');
                }
            }
        });
    }
    $("#Appearance").on('click', function (e) {
        ActiveMenu($(this));
        RedirectOnAccordian(urls.Appearance.LoadApplicationView);
        $('#title').text(vrCommonRes['ptAppearance']);
        $('#navigation').text(vrCommonRes['ptAppearance']);
    });
    //Security recheck on each module if user has opened 'Admin Manager' with different tabs.
    $("#liApplication").on('click', function () {
        CheckModuleLevelAccess();
    });
    $("#liDatabase").on('click', function () {
        CheckModuleLevelAccess();
    });
    $("#liDirectories").on('click', function () {
        CheckModuleLevelAccess();
    });
    $("#liData").on('click', function () {
        CheckModuleLevelAccess();
    });
    $("#liTables").on('click', function () {
        CheckModuleLevelAccess();
    });
    $("#liViews").on('click', function () {
        CheckModuleLevelAccess();
    });
    $("#liReports").on('click', function () {
        CheckModuleLevelAccess();
    });
    $("#liSecurity").on('click', function () {
        CheckModuleLevelAccess();
    });
    getResourcesByModule('all');

    setFooterWidth();
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("body").toggleClass("sidebar-collapse", "slow");
        setFooterWidth();
    });

    $('.sidebar-menu li.active a').next('ul.treeview-menu').find("li:first").addClass("active").find("a").trigger("click");
    $('.sidebar-menu li').find("ul.treeview-menu").find("li a").click(function () {
        $(this).parent().parent().find("li").removeClass('active');
        $(this).parent().addClass('active');
    });
    $(".sidebar-menu li.treeview").find("a:first").click(function () {
        $(".treeview").removeClass("active");
        $(this).parent().addClass('active');
        if ($(this).next('ul.treeview-menu').find("div").length == 0) {
            $(this).next('ul.treeview-menu').find("li:first").addClass("active").find("a").trigger("click");
        }
    });
    //setTimeout(function () {
    //    var contentHeight = (($('.content-wrapper').height() - $('.main-footer').height())+30);
    //    $('.content-wrapper').css({'height': contentHeight.toString()});
    //}, 1500);
});
function staticMenus(me) {
    $('.drillDownMenu li ul li a').removeAttr('style');
    $('.divMenu').find('a.selectedMenu').removeClass('selectedMenu');
    $('#' + me.id).addClass('selectedMenu');
    ActiveMenu($('#' + me.id));
    var aId = me.id;
    var parentId = $('#' + me.id).parent().parent().parent().find('a')[0].id;

    /* set Selected Menu id in cookie */
    if (decodeURI(getCookie('hdnAdminMnuIds')) != null && decodeURI(getCookie('hdnAdminMnuIds')) != undefined) {
        setCookie('hdnAdminMnuIds', (parentId + '|' + aId), 1);
    }
    /* ----------------------------- */
    
    switch (aId.toLowerCase()) {
        case 'attachments':
            RedirectOnAccordian(urls.Admin.LoadAttachmentParticalView);
            $('#title, #navigation').text(vrCommonRes['Attachments']);
            break;
        case 'auditing':
            RedirectOnAccordian(urls.Admin.LoadAuditingView);
            $('#title, #navigation').text(vrCommonRes['mnuAuditing']);
            break;
        case 'bar_code_view':
            RedirectOnAccordian(urls.BarCodeSearchOrder.LoadBarCodeSearchView);
            $('#title, #navigation').text(vrCommonRes['ptBarcodeSearchOrder']);
            break;
        case 'email_notify':
            RedirectOnAccordian(urls.EmailNotification.LoadEmailNotificationView);
            $('#title, #navigation').text(vrCommonRes['mnuEmailNotification']);
            break;
        case 'requestor':
            RedirectOnAccordian(urls.Requestor.LoadRequestorView);
            $('#title, #navigation').text(vrCommonRes['mnuRequestor']);
            break;
        case 'retention':
            RedirectOnAccordian(urls.Retention.AdminRetentionPartial);
            $('#title, #navigation').text(vrCommonRes['mnuRetention']);
            break;
        case 'tracking':
            RedirectOnAccordian(urls.Tracking.LoadTrackingView);
            $('#title, #navigation').text(vrCommonRes['mnuTracking']);
            break;
        case 'backgroundprocess':
            RedirectOnAccordian(urls.Admin.LoadBackgroundProcessView);
            $('#title, #navigation').text(vrCommonRes['mnuBackGroundProcess']);
            break;
        case 'external_db':
            RedirectOnAccordian(urls.ExternalDB.LoadExternalDBView);
            $('#title, #navigation').text(vrCommonRes['mnuExternalDatabase']);
            break;
        case 'map':
            RedirectOnAccordian(urls.Admin.LoadMapView);
            $('#title, #navigation').text(vrCommonRes['ptDatabaseMap']);
            break;
        case 'table_register':
            RedirectOnAccordian(urls.TableRegister.LoadTableRegisterView);
            $('#title, #navigation').text(vrCommonRes['mnuTableRegistration']);
            break;
        case 'tabquikkey':
            RedirectOnAccordian(urls.TABQUIK.TABQUIKKeyPartial);
            $('#title, #navigation').text("TABQUIK");
            break;
        case 'tabquikfieldmapping':
            RedirectOnAccordian(urls.TABQUIK.LoadTABQUIKFieldMappingPartial);
            $('#title, #navigation').text("TABQUIK");
            break;
            /*------------------ Single Menus selection --------------------*/
        case 'storage':
            RedirectOnAccordian(urls.Directories.LoadDirectoriesView);
            $('#title, #navigation').text(vrCommonRes['mnuDirectories']);
            break;
        case 'configuration':
            RedirectOnAccordian(urls.Security.LoadSecurityTab);
            $('#title, #navigation').text(vrCommonRes['mnuSecurity']);
            setTimeout(function () { LoadConfiguration(); }, 1000);

            break;
        case 'ullocalize':
            RedirectOnAccordian(urls.Localize.LoadLocalizePartial);
            $('#title, #navigation').text(vrCommonRes['mnuLocalize']);
            break;
        case 'login_warning_msg':
            RedirectOnAccordian(urls.BeforeLoginWarning.LoadBeforeLoginWarningPartial);
            $('#title, #navigation').text(vrCommonRes['mnuLoginWarningMsg']);
            break;
            /*------------------ Single Menus selection End --------------------*/
    }
}


function setFooterWidth() {
    if (window.location.pathname.indexOf("LabelManager") == -1 && window.location.pathname.indexOf("Import") == -1 && window.location.pathname.indexOf("BackgroundStatus") == -1) {
        $("body").hasClass("sidebar-collapse") == true ? $(".main-footer").css("width", $(".main-header").outerWidth()) : $(".main-footer").css("width", $(".main-header").outerWidth() - 230);
    }
}
function ActiveMenu(n) {
    $(".sidebar").find("li > ul > li.active").removeClass("active"), n.parent("li").addClass("active"), $(".sidebar").find("li > ul > li").find(".fa-play-circle").removeClass("fa-play-circle").addClass("fa-circle-o"), n.find("i").removeClass("fa-circle-o").addClass("fa-play-circle"), $("#navigation").closest("ol").find(".custome").remove();
}
function ShowErrorMessge() {
    showAjaxReturnMessage(vrCommonRes["GenErrorMessage"], 'e');
}

//Check for Module level access for logged-in user.
function CheckModuleLevelAccess(moduleName) {
    $.ajax({
        url: urls.Security.CheckModuleLevelAccess,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html',
        async: false
    }).done(function (result) {
        var jsonSecureObj = $.parseJSON(result);
        $.each(jsonSecureObj.mdlAccessDictionary, function (key, value) {
            if (key == 'AdminPermission')
                IS_ADMIN = value;
            else if (!value)
                $('#li' + key).remove();
        });
    });

}
//Check SubTabs for Security access.
function CheckTabLevelAccessPermission(vSecureObjectName, vSecureObjectType, vPassportPermissions) {
    var bAccess = false;
    $.ajax({
        url: urls.Common.CheckTabLevelAccessPermission,
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        data: JSON.stringify({ pSecureObjectName: vSecureObjectName, pSecureObjectType: vSecureObjectType, pPassportPermissions: vPassportPermissions }),
        dataType: 'json',
        async: false,
        processData: false
    }).done(function (result) {
        bAccess = result;
    });
    return bAccess;
}
function BindAccordianTable() {
    if ($("#ulTable").hasClass('mCustomScrollbar')) {
        $("#ulTable .mCSB_container").empty();
    }
    else {
        $("#ulTable").empty();
    }
    $('#navigation').closest('ol').find('.custome').remove();
    $.getJSON(urls.TableTracking.LoadAccordianTable, function (data) {
        var pOutputObject = $.parseJSON(data);
        var HTMLString = '';
        for (var i = 0; i < pOutputObject.length; i++) {
            var str = pOutputObject[i].TableName;
            HTMLString = HTMLString + '<li style="cursor:pointer" ><a id="' + str + '" onclick="javascript:loadTabData(event,$(this));" name="' + pOutputObject[i].TableId + '" > ' + pOutputObject[i].UserName + '</a></li>';
        }
        if ($("#ulTable").hasClass('mCustomScrollbar')) {
            $("#ulTable .mCSB_container").append(HTMLString);
        }
        else {
            $("#ulTable").append(HTMLString);
        }
        setTimeout(function () {
            $("#ulTable").mCustomScrollbar();
            var vrCookiesVal = decodeURI(getCookie('hdnAdminMnuIds'));

            if (vrCookiesVal.indexOf('Tables|') >= 0) {
                var vrArr = vrCookiesVal.split('|');
                $.each(vrArr, function (index, value) {
                    $('#' + value).addClass('selectedMenu');
                    if ($("#ulTable").hasClass('mCustomScrollbar')) {
                        $("#ulTable").find('#' + value).trigger('click');
                    }
                    else {
                        $('#' + value).trigger('click');
                    }
                });
            }
            else {
                $('#ulTable li a').first().trigger("click");
            }
        }, 600);
    });
}

function BindAccordianData() {
    if ($("#ulData").hasClass('mCustomScrollbar')) {
        $("#ulData .mCSB_container").empty();
    }
    else {
        $("#ulData").empty();
    }
    $('#navigation').closest('ol').find('.custome').remove();
    $.getJSON(urls.Admin.BindAccordian, function (data) {
        var pOutputObject = JSON.parse(data);
        var HTMLString = "";
        $.each(pOutputObject, function (key, value) {
            HTMLString += '<li><a id="' + key + '" onclick="javascript:GetGridPopulated(event,$(this))"> ' + value + '</a></li>';
        });
        if ($("#ulData").hasClass('mCustomScrollbar')) {
            $("#ulData .mCSB_container").append(HTMLString);
        }
        else {
            $("#ulData").append(HTMLString);
        }
        setTimeout(function () {
            $("#ulData").mCustomScrollbar();
            var vrCookiesVal = decodeURI(getCookie('hdnAdminMnuIds'));

            if (vrCookiesVal.indexOf('Data|') >= 0) {
                var vrArr = vrCookiesVal.split('|');
                $.each(vrArr, function (index, value) {
                    if ($("#ulData").hasClass('mCustomScrollbar')) {
                        $("#ulData").find('#' + value).trigger('click');
                    }
                    else {
                        $('#' + value).trigger('click');
                    }
                });
            }
            else {
                $('#ulData li a').first().trigger("click");
            }
        }, 600);
    });
}
function LoadViewPartial() {
    $(".divMenu").css("visibility", "hidden");
    $('#divmenuloader').show();
    if ($("#ulViews").hasClass('mCustomScrollbar')) {
        $("#ulViews .mCSB_container").empty();
    }
    else {
        $("#ulViews").empty();
    }
    $.ajax({
        async: false,
        type: "GET",
        contentType: 'text/plain; charset=utf-8',
        dataType: "text",
        data: { 'root': 'treeViews' },
        url: urls.Admin.ViewTreePartial,
    }).done(function (response) {
        if ($("#ulViews").hasClass('mCustomScrollbar')) {
            $("#ulViews .mCSB_container").empty().append(response);
        }
        else {
            $("#ulViews").empty().html(response);
        }
        $('#liViews').linkesDrillDown({ cookieName: 'hdnAdminMnuIds' });
    });
}
function ReportsTreePartial() {
    if ($("#ulReports").hasClass('mCustomScrollbar')) {
        $("#ulReports .mCSB_container").empty();
    }
    else {
        $("#ulReports").empty();
    }
    $.ajax({
        async: false,
        type: "GET",
        contentType: 'text/plain; charset=utf-8',
        dataType: "text",
        data: { 'root': 'treeReports' },
        url: urls.Admin.ReportsTreePartial
    }).done(function (response) {
            if ($("#ulReports").hasClass('mCustomScrollbar')) {
                $("#ulReports .mCSB_container").append(response);
            }
            else {
                $("#ulReports").append(response);
            }
            $('#liReports').linkesDrillDown({ cookieName: 'hdnAdminMnuIds' });
        })
}

function RedirectOnAccordian(vUrl) {
    $.ajax({
        url: vUrl,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html',
        async: false
    }).done(function (result) {
        $('#LoadUserControl').empty();
        $('#LoadUserControl').html(result);
        restrictSpecialWord();
    }).fail(function (xhr, status) {
        ShowErrorMessge();
    });
}
function restrictSpecialWord() {
    $('input[type=text]').bind('keyup blur', function (event) {
        var vrStrArray = ("<??????|%<??????|%<?|%<?>|<?^$#%*$^($&$@)$@)(|<?|>?<??????").split('|');
        var lastIndex = $(this).val().lastIndexOf(" ");
        var lastWord = $(this).val().substring(lastIndex, $(this).val().length);
        if ($.inArray(lastWord.trim(), vrStrArray) > 0) {
            $(this).val($(this).val().substring(0, lastIndex));
        }
    });
}

//This method is for setting the height of Accordion panel.
function SetAccordionHeight() {
    windowHeight = $(window).innerHeight() - 30;

    var header = $("#divHeader").height();
    var footer = $("#divFooter").height();

    $('#accordion').css('max-height', windowHeight - (header + footer));
    $('#LoadUserControl').css('max-height', windowHeight - (header + footer));

}

function setHeight() {
    windowHeight = $(window).innerHeight() - 150;
    windowHeight = (windowHeight - $(".firsttab").height()) + 10;

    var count = $("#accordion h3").length;
    var hgt3 = $(".h3height").height();
    $('.sidebar').css('min-height', windowHeight - (hgt3 * count));
};

function navigateAccordianPage(nodeObject) {
    $(".ui-accordion-content-active").hide();
}

function selectedAccordianNode(nodeText) {
    for (var i = 0; i < $('.h3height').length; i++) {
        var pnodeText = $('.h3height')[i].textContent;
        if (pnodeText == nodeText) {
            $("#accordion").accordion("option", "active", i);
            break;
        }
    }
}


/* enter press save button */
$.fn.OnEnterPressSaveButton =
function (btnid) {
    $(this).keypress(function (e) {
        e = e || event;
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#' + btnid).click();
            return false;
        }
        return true;
    });
};

$.fn.resetControls = function () {
    $(':input', this).each(function () {
        var type = this.type;
        var tag = this.tagName.toLowerCase(); // normalize case
        // to reset the value attr of text inputs,
        // password inputs, fileUpload and textareas
        if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'file' || type == 'hidden')
        { this.value = ""; }
            // checkboxes and radios need to have their checked state cleared                
        else if (type == 'checkbox' || type == 'radio')
        { this.checked = false; }
            // select elements need to have their 'selectedIndex' property set to -1
            // (this works for both single and multiple select elements)
        else if (tag == 'select')
        { this.selectedIndex = 0; }

        $(this).next('span').remove();
    });
    $(this).find('.has-error').removeClass('has-error');
}

//function showAjaxReturnMessage(message, msgType) {
//    var divId = '';
//    var msgcls = '';
//    var msgTitle = '';
//    switch (msgType.toLowerCase()) {
//        case 'warning': case 'w':
//            msgcls = 'warning';
//            msgTitle = vrCommonRes["Warning"];
//            break;
//        case 'error': case 'e':
//            msgcls = 'error';
//            msgTitle = vrCommonRes["msgError"];
//            break;
//        case 'success': case 's':
//            msgcls = 'success';
//            msgTitle = vrCommonRes["Success"];
//            break;
//        case 'info': case 'i':
//            msgcls = 'info';
//            msgTitle = vrCommonRes["Information"];
//            break;
//        case 'loading':
//            divId = 'ajaxloading';
//            break;
//    }
//    LoadErrorMessage(msgcls, message, msgTitle);
//}

function ConvertToDate(pDate) {
    var vPurgeDate = new Date(pDate).toDateString();
    return vPurgeDate;
}

$.fn.ForceNumericOnly = function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (
                key == 8 || key == 190 || key == 110 ||
                key == 9 ||
                key == 46 ||
                (key >= 35 && key <= 39) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};

/* Not allowed special characters */
$.fn.OnlyNumericWithDot = function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            var regex = new RegExp("^[0-9.]+$");
            e = e || event;
            return regex.test(String.fromCharCode(e.charCode || e.keyCode))
                    || !!(!e.charCode && ~[37, 38, 39, 40, 8, 9].indexOf(e.keyCode))
                || !!(!e.charCode && ~[65].indexOf(e.keyCode) && e.ctrlKey === true);
        });
    });
};
/* Only numeric without Dot */
$.fn.OnlyNumericWithoutDot = function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            var regex = new RegExp("^[0-9]+$");
            e = e || event;
            return regex.test(String.fromCharCode(e.charCode || e.keyCode))
                    || !!(!e.charCode && ~[37, 38, 39, 40, 46, 8, 9].indexOf(e.keyCode))
                || !!(!e.charCode && ~[65].indexOf(e.keyCode) && e.ctrlKey === true);
        });
    });
};

/* Only numeric  */
$.fn.OnlyNumeric = function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            var regex = new RegExp("^[0-9]+$");
            e = e || event;
            return regex.test(String.fromCharCode(e.charCode || e.keyCode))
                    || !!(!e.charCode && ~[37, 38, 39, 40, 46, 8, 9].indexOf(e.keyCode))
                || !!(!e.charCode && ~[65].indexOf(e.keyCode) && e.ctrlKey === true);
        });
    });
};

/*Only numeric and hyphen character*/
$.fn.OnlyNumericWithHyphen = function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            return (e.which != 8 && e.which != 0 && String.fromCharCode(e.which) != '-' && (e.which < 48 || e.which > 57)) ? false : true;
        });
    });
};

/* Only numeric and alphabet charaters */
$.fn.OnlyCharectorAndNumbers = function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            var characterReg = /([A-Za-z0-9]+)/gm;
            e = e || event;
            return characterReg.test(String.fromCharCode(e.charCode || e.keyCode))
                    || !!(!e.charCode && ~[37, 38, 39, 40, 46, 8, 9].indexOf(e.keyCode))
                || !!(!e.charCode && ~[65].indexOf(e.keyCode) && e.ctrlKey === true);
        });
    });
};

/* Only alphabet charaters and semi colon allowed*/
$.fn.OnlyCharectorAndColon = function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            var characterReg = /([A-Za-z:]+)/gm;
            e = e || event;
            return characterReg.test(String.fromCharCode(e.charCode || e.keyCode))
                    || !!(!e.charCode && ~[37, 38, 39, 40, 46, 8, 9].indexOf(e.keyCode))
                || !!(!e.charCode && ~[65].indexOf(e.keyCode) && e.ctrlKey === true);
        });
    });
};

/* Only alphabet charaters */
$.fn.OnlyCharectors = function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            //var key = e.key;
            var code = e.charCode === 0 ? e.which : e.charCode;
            var key = String.fromCharCode(code);
            var characterReg = /([A-Za-z])/gm;
            /*
            //arrror up - 38,left -37,down - 40right - 39backspace - 8delete - 46tab -9control key - home - 36end -35back - 8,
            */
            e = e || event;
            return characterReg.test(String.fromCharCode(e.charCode || e.keyCode))
                    || !!(!e.charCode && ~[37, 38, 39, 40, 46, 8, 9].indexOf(e.keyCode))
                || !!(!e.charCode && ~[65].indexOf(e.keyCode) && e.ctrlKey === true);

        });
    });
};

/* Special Characters, Space not allowed */
$.fn.SpecialCharactersSpaceNotAllowed = function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            var spaceReg = /\s+/g;
            var characterReg = /[^a-z0-9\s_]/gi;
            e = e || event;
            return !(spaceReg.test(String.fromCharCode(e.charCode || e.keyCode))
                || characterReg.test(String.fromCharCode(e.charCode || e.keyCode)))
                    || !!(!e.charCode && ~[37, 38, 39, 40, 46, 8, 9].indexOf(e.keyCode))
                || !!(!e.charCode && ~[65].indexOf(e.keyCode) && e.ctrlKey === true);

        });
    });
};
//$.fn.ShowModel = function () {
//    $(this).modal({ show: true, keyboard: false, backdrop: 'static' });
//}
//$.fn.HideModel = function () {
//    $('body').removeClass("modal-open");
//    $(this).modal('hide');
//}
/* Only applied special charater string not allowed */
$.fn.SomeCharacterNotAllowed = function (specialChars) {
    return this.each(function () {
        $(this).keypress(function (e) {
            var code = e.charCode === 0 ? e.which : e.charCode;
            var key = String.fromCharCode(code);
            for (i = 0; i < specialChars.length; i++) {
                if (key.toLowerCase() == specialChars[i].toLowerCase())
                    return false;
            }
            if (key.toLowerCase() == 'divide' && specialChars.indexOf('/') != -1)
                return false;
            return true;
        });
    });
};

$.fn.SomeCharacterNotAllowed1 = function (specialChars, vstring) {
    for (i = 0; i < specialChars.length; i++) {
        if (vstring.indexOf(specialChars[i]) > -1) {
            return true;
        }
    }
    return false;
}

/* Only applied special charater string not allowed */
$.fn.AllowOnlyCharater = function (character) {
    return this.each(function () {
        $(this).keypress(function (e) {
            var code = e.charCode === 0 ? e.which : e.charCode;
            var key = String.fromCharCode(code);

            e = e || event;
            if (!!(!e.charCode && ~[37, 38, 39, 40, 46, 8, 9].indexOf(e.keyCode))
                || !!(!e.charCode && ~[65].indexOf(e.keyCode) && e.ctrlKey === true)) {
                return true;
            }

            if (key.toLowerCase() == character)
                return true;
            return false;
        });
    });
};

//String.format = function () {
//    // The string containing the format items (e.g. "{0}")
//    // will and always has to be the first argument.
//    var theString = arguments[0];

//    // start with the second argument (i = 1)
//    for (var i = 1; i < arguments.length; i++) {
//        // "gm" = RegEx options for Global search (more than one instance)
//        // and for Multiline search
//        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
//        theString = theString.replace(regEx, arguments[i]);
//    }
//    return theString;
//}


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

function confirm(heading, question, cancelButtonTxt, okButtonTxt, callback) {
    var confirmModal =
        $('<div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<h3>' + heading + '</h3>' +
                    '</div>' +
                    '<div class="modal-body">' +
                        '<p>' + question + '</p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-default" data-dismiss="modal">' +
                        cancelButtonTxt + '</button>' +
                        '<a href="#" id="okButton" class="btn btn-danger btn-ok">' +
                      okButtonTxt +
                    '</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');

    confirmModal.find('#okButton').click(function (event) {
       var x = callback();
        confirmModal.modal('hide');
    });
    confirmModal.ShowModel();
};

function ShowWarning(heading, warning, cancelButtonTxt) {
    var warningModal =
        $('<div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<h3>' + heading + '</h3>' +
                    '</div>' +
                    '<div class="modal-body">' +
                        '<p>' + warning + '</p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-default" data-dismiss="modal">' +
                        cancelButtonTxt + '</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');
    warningModal.ShowModel();
};

//function LoadErrorMessage(errorType, message, msgTitle) {

//    var i = -1;
//    var toastCount = 0;
//    var $toastlast;
//    var getMessage = '';
//    var getMessageWithClearButton = function (msg) {
//        msg = msg ? msg : 'Clear itself?';
//        msg += '<br /><br /><button type="button" class="btn clear">Yes</button>';
//        return msg;
//    };

//    var shortCutFunction = errorType;
//    var msg = message;
//    var title = msgTitle || '';
//    var $showDuration = 300;
//    var $hideDuration = 1000;
//    var $timeOut = 5000;
//    var $extendedTimeOut = 1000;
//    var $showEasing = 'swing';
//    var $hideEasing = 'linear';
//    var $showMethod = 'fadeIn';
//    var $hideMethod = 'fadeOut';
//    var toastIndex = toastCount++;
//    var addClear = false;

//    toastr.options = {
//        closeButton: false,
//        debug: false,
//        newestOnTop: false,
//        progressBar: false,
//        positionClass: 'toast-top-center',
//        preventDuplicates: true,
//        onclick: null
//    };

//    if ($showDuration.length) {
//        toastr.options.showDuration = $showDuration;
//    }

//    if ($hideDuration.length) {
//        toastr.options.hideDuration = $hideDuration;
//    }

//    if ($timeOut.length) {
//        toastr.options.timeOut = $timeOut;//addClear ? 0 : $timeOut;
//    }

//    if ($extendedTimeOut.length) {
//        toastr.options.extendedTimeOut = $extendedTimeOut;// addClear ? 0 : $extendedTimeOut;
//    }

//    if ($showEasing.length) {
//        toastr.options.showEasing = $showEasing;
//    }

//    if ($hideEasing.length) {
//        toastr.options.hideEasing = $hideEasing;
//    }

//    if ($showMethod.length) {
//        toastr.options.showMethod = $showMethod;
//    }

//    if ($hideMethod.length) {
//        toastr.options.hideMethod = $hideMethod;
//    }

//    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
//    $toastlast = $toast;

//    if (typeof $toast === 'undefined' || $toast === null) {
//        return;
//    }

//    if ($toast.find('#okBtn').length) {
//        $toast.delegate('#okBtn', 'click', function () {
//            $toast.remove();
//        });
//    }
//    if ($toast.find('#surpriseBtn').length) {
//        $toast.delegate('#surpriseBtn', 'click', function () {
//            //alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
//        });
//    }
//    if ($toast.find('.clear').length) {
//        $toast.delegate('.clear', 'click', function () {
//            toastr.clear($toast, { force: true });
//        });
//    }
//    function getLastToast() {
//        return $toastlast;
//    }
//}

function FormatListData(pListboxid) {
    var l = 0;
    var d = '';

    $("#" + pListboxid + " > option").each(function () {
        if (this.text.split('©')[0].length > l) l = this.text.split('©')[0].length;
    });
    $("#" + pListboxid + " > option").each(function () {
        d = '';
        line = this.text.split('©');
        l1 = (l - line[0].length);

        for (j = 0; j < (l1 + 4) ; j++) {
            d += '\u00a0';
        }
        this.text = line[0] + d + line[1];
    });
}

function storeValue(key, value) {
    localStorage.setItem(key, value);
}

function getStoredValue(key) {
    return localStorage.getItem(key);
}

function RefereshPage(vPageName) {
    $.get(urls.Common.GetRefereshDetails, { strPageName: vPageName }, function (data) {
        if (!data) {
            if (vPageName == 'Scanner' || vPageName == 'Retention' || vPageName == 'LabelManager')
                window.location = "/Data.aspx";
            else
                window.location = "/" + vPageName;
        }
    });
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);

    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
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

function removeCookie(name) {
    setCookie(name, "", -1);
}

function getDatePreferenceCookie() {
    var vUserName = $.cookie('lastUsername');
    if ($.cookie(vUserName)) {
        var dateFormat = 'mm/dd/yy';
        var readCookie = $.cookie(vUserName);
        readCookie = readCookie.split('&');
        for (i = 0; i < readCookie.length; i++) {
            var readCookieArray = readCookie[i].split('=');
            if (readCookieArray[0] == 'PreferedDateFormat') {
                var dtFormatJS = readCookieArray[1].toLowerCase();
                var countYear = (dtFormatJS.match(/y/g) || []).length;
                var countMonth = (dtFormatJS.match(/m/g) || []).length;
                var countDay = (dtFormatJS.match(/d/g) || []).length;
                if (countYear == 4)
                    dtFormatJS = dtFormatJS.replace("yyyy", "yy");
                if (countYear == 2)
                    dtFormatJS = dtFormatJS.replace("yy", "y");
                if (countMonth == 3)
                    dtFormatJS = dtFormatJS.replace("mmm", "M");
                dateFormat = dtFormatJS;
            }
        }
        return dateFormat;
    }
    return undefined;
}

function isValidDate(str) {
    var d = moment(str, getDatePreferenceCookieForMoment().toUpperCase());
    if (d == null || !d.isValid()) return false;

    return str.indexOf(d.format(getDatePreferenceCookieForMoment().toUpperCase())) >= 0;
}

function isValidDefaultDate(str) {
    var d = moment(str);
    if (d == null || !d.isValid()) return false;
    return true;
}

function getDatePreferenceCookieForMoment(bWithTime) {
    var vUserName = $.cookie('lastUsername');
    if ($.cookie(vUserName)) {
        var dateFormat = 'mm/dd/yy';
        var readCookie = $.cookie(vUserName);
        readCookie = readCookie.split('&');
        for (i = 0; i < readCookie.length; i++) {
            var readCookieArray = readCookie[i].split('=');
            if (readCookieArray[0] == 'PreferedDateFormat') {
                dateFormat = readCookieArray[1];
            }
        }
        if (bWithTime)
            return dateFormat.toUpperCase() + ' ' + "hh:mm:ss";
        else
            return dateFormat.toUpperCase();
    }
    return undefined;
}

function getDateBasedonPreferedFormat(value) {
    var bValid = false;
    var x = new Date();
    var vDateFormat = getDatePreferenceCookie().split(/[./-]/);
    var vSplitDateTime = value.split(/\s+/);
    var vDate = vSplitDateTime[0].split(/[./-]/);
    var d, m, y;
    for (var i = 0; i < vDateFormat.length; i++) {
        if (vDateFormat[i].toLowerCase().indexOf('d') != -1)
            if (vDate[i] > 31) {
                bValid = false;
                return false;
            }
            else {
                d = vDate[i];
                bValid = true;
            }
        if (vDateFormat[i].toLowerCase().indexOf('m') != -1)
            if (vDate[i] > 12) {
                bValid = false;
                return false;
            }
            else {
                m = vDate[i];
                bValid = true;
            }
        if (vDateFormat[i].toLowerCase().indexOf('y') != -1) {
            if (vDate[i].length > 2) {
                bValid = false;
                return false;
            }
            else {
                y = vDate[i];
                bValid = true;
            }
        }
    }
    return bValid;
}

//Hasmukh - Added for convert string to date
function ConvertStringDateinDate(value, bWithTime) {
    var vDateFormat = getDatePreferenceCookie().split(/[./-]/);
    var vSplitDateTime = value.split(/\s+/);
    var vDate = vSplitDateTime[0].split(/[./-]/);
    var d = "", m = "", y = "";
    for (var i = 0; i < vDateFormat.length; i++) {
        if (vDateFormat[i].toLowerCase().indexOf('d') != -1)
            d = vDate[i];
        if (vDateFormat[i].toLowerCase().indexOf('m') != -1) 
            m = vDate[i];
        if (vDateFormat[i].toLowerCase().indexOf('y') != -1)
            y = vDate[i];
    }
    if (m.length > 2) {
        var objMonth = {
            'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6, 'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
        };
        m = objMonth[m.trim().toLowerCase()];
    }
    if (bWithTime && vSplitDateTime[1].length > 0)
    {
        var h = 0, mnt = 0, s = 0;
        var vTime = vSplitDateTime[1].split(':');
        h = vTime[0] == undefined ? 0 : vTime[0];
        mnt = vTime[1] == undefined ? 0 : vTime[1];
        s = vTime[2] == undefined ? 0 : vTime[2];
        return new Date(y, parseInt(m) - 1, d, h, mnt, s);
    }
    return new Date(y, parseInt(m) - 1, d);
}

function StringToDateFromDB(dateString) {
    var regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
    var dateArray = regex.exec(dateString);
    var dateObject = new Date(
        (+dateArray[1]),
        (+dateArray[2]) - 1, // Careful, month starts at 0!
        (+dateArray[3]),
        (+dateArray[4]),
        (+dateArray[5]),
        (+dateArray[6])
    );
    return dateObject;
}

//function getResourcesByModule(prModuleName) {
//    $.ajax({
//        url: '/Resource/GetResources',
//        type: 'GET',
//        async: false,    //Added by Hemin
//        data: { moduleName: prModuleName },
//        contentType: 'application/json; charset=utf-8',
//        success: function (response) {
//            switch (prModuleName.toLowerCase()) {
//                case 'application':
//                    vrApplicationRes = response;
//                    break;
//                case 'clients':
//                    vrClientsRes = response;
//                    break;
//                case 'common':
//                    vrCommonRes = response;
//                    break;
//                case 'data':
//                    vrDataRes = response;
//                    break;
//                case 'database':
//                    vrDatabaseRes = response;
//                    break;
//                case 'directories':
//                    vrDirectoriesRes = response;
//                    break;
//                case 'import':
//                    vrImportRes = response;
//                    break;
//                case 'labelmanager':
//                    vrLabelManagerRes = response;
//                    break;
//                case 'reports':
//                    vrReportsRes = response;
//                    break;
//                case 'retention':
//                    vrRetentionRes = response;
//                    break;
//                case 'scanner':
//                    vrScannerRes = response;
//                    break;
//                case 'security':
//                    vrSecurityRes = response;
//                    break;
//                case 'tables':
//                    vrTablesRes = response;
//                    break;
//                case 'views':
//                    vrViewsRes = response;
//                    break;
//                case 'all':
//                    vrApplicationRes = response.resApp;
//                    vrClientsRes = response.resClient;
//                    vrCommonRes = response.resCommon;
//                    vrDataRes = response.resData;
//                    vrDatabaseRes = response.resDatabase;
//                    vrDirectoriesRes = response.resDirectories;
//                    vrImportRes = response.resImport;
//                    vrLabelManagerRes = response.resLabelmanager;
//                    vrReportsRes = response.resReports;
//                    vrRetentionRes = response.resRetention;
//                    vrScannerRes = response.resScanner;
//                    vrSecurityRes = response.resSecurity;
//                    vrTablesRes = response.resTables;
//                    vrViewsRes = response.resViews;
//                    break;
//            }
//        },
//        error: function (xhr, status, error) {
//        }
//    });
//}
(function  ($) {
    $.fn.hasScrollBar = function () {
        var isTrue = false;
        if (this.length > 0)
        {
            isTrue = this.get(0).scrollHeight > this.height();
        }
        return isTrue;
    }
})(jQuery);
