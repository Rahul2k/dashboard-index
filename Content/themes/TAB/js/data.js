var lastCall;
var oldRow;
var currentRow;
var urls = {
    Common: {
        GetImageFlyOut: '@Url.Action("GetImageFlyOut", "Common")'

    }
};
function saveedits() {
    window.frames['ctl00_ContentPlaceHolder1_IframeEdit'].$('#form1').data("changed", false);
    //alert(window.frames['ctl00_ContentPlaceHolder1_IframeEdit'].$('#form1').data("changed"));
    window.frames['ctl00_ContentPlaceHolder1_IframeEdit'].document.forms['form1'].submit();
}

function changeRecord(obj, view, pkey, cols, disposition, requestable, pkeyControlID, rowNum) {
    //alert(obj.id);
    if (obj == null) return;
    var timeout = false;
    //    if (window.frames['ctl00_ContentPlaceHolder1_IframeEdit'].document.forms['form1'] != null) {

    //        if (window.frames['ctl00_ContentPlaceHolder1_IframeEdit'].$('#form1').data("changed")) {
    //            //alert("test2");
    //            window.frames['ctl00_ContentPlaceHolder1_IframeEdit'].document.forms['form1'].submit();
    //            timeout = true;
    //            //setTimeout(function() { myFrameEdit.src = 'edit.aspx?w=' + view + '&cv=' + pkey + '&c=' + cols; ; }, 500);
    //        }
    //    }
    //obj.style.backgroundColor = '#c5d6fc';
    var lastRow = document.getElementById(lastCall);
    if (lastRow != null) {
        /*orginal : 
        lastRow.style.backgroundColor = '#ffffff';
        lastRow.style.color = '#000000';
        lastRow.style.color = 'rgba(0,0,0,0.6)';
        */
        if (lastRow.className.indexOf('dragandrophandler') > -1)
            lastRow.className = 'tbsorterselectionremoved dragandrophandler';
        else
            lastRow.className = 'tbsorterselectionremoved';

        oldRow = lastCall;
    }
    lastCall = obj.id;
    currentRow = lastCall;

    if (obj.id != '') {
        /*orignal : 
        obj.style.backgroundColor = '#fff6bd';
        obj.style.backgroundColor = '#00A1E1';
        obj.style.color = '#fff';
        */
        if (obj.className.indexOf('dragandrophandler') > -1)
            obj.className = 'tbsorterselection dragandrophandler';
        else
            obj.className = 'tbsorterselection';
        //var activeCells = obj.getElementsByTagName("td");
        //activeCells[1].style.color = '#ffffff';
    }
    //alert(pkey + " " + pkeyControlID);
    var pkeyControl = document.getElementById(pkeyControlID);
    var rowControl = document.getElementById(pkeyControlID.replace("Edit", "RowNum"));
    if (pkeyControl != null) {
        var saveControl = document.getElementById(pkeyControlID.replace("Edit", "Save"));
        if (saveControl != null)
            saveControl.value = pkeyControl.value;
        pkeyControl.value = pkey;
    }
    if (rowControl != null) {
        rowControl.value = rowNum;
    }
    //alert(pkeyControl.value);
    CalcDisposition(disposition);
    //    if (timeout)
    //        setTimeout(function() { SetIFrames(view, pkey, cols); }, 500);
    //    else
    SetIFrames(view, pkey, cols);
    //alert(obj.getBoundingClientRect().top);
    //SetScroll(obj.getBoundingClientRect().top);
}

function SendTabQuik(windowID, domain, data) {
    var iFrame = document.getElementById(windowID);

    var window = iFrame.contentWindow;
    //iFrame.postMessage(data, domain);
    window.postMessage(data, '*');
}

function setSrc(domain) { document.open(); document.domain = domain; document.close(); return 'WrapUpDialog.html'; }

function Trigger(buttonID) {
    //alert(buttonID);

    var trigger = document.getElementById(buttonID);
    if (trigger != null) {
        AddLoader();
        trigger.click();
    }
}

function RemoveLoader() {
    $("#ContentPlaceHolder1_divSelect").removeClass("loaderMain-wrapper");
    $("#ContentPlaceHolder1_divInnerSelect").removeClass("loaderMain");
}

function AddLoader() {
    $("#ContentPlaceHolder1_divSelect").addClass("loaderMain-wrapper");
    $("#ContentPlaceHolder1_divInnerSelect").addClass("loaderMain");
}

function ScrollNew(obj) {
    if (obj != null)
        SetScroll(obj.getBoundingClientRect().top - 220);
}

function ShowFlyOut(docdata) {
    var img = document.getElementById('flyoutimage');
    if (img == null) return;
    var imageURL = '../Common/GetImageFlyOut/' + docdata;
    img.src = '/Resources/Images/loading.gif';
    $.ajax({
        url: imageURL,
        type: 'GET',
        datatype: 'image/jpg',
        data: {},
        timeout: 15000,
        //success: function (data) {
        //    img.src = imageURL; //+ '?' + new Date().getTime();
        //},
        complete: function (data) {
            img.src = imageURL;
        }
    });


    $("#flyoutdiv").show();

}

function HideFlyOut() {
    $("#flyoutdiv").hide();
}

function SetIFrames(view, pkey, cols) {
    var myFrameTracking = document.getElementById('ContentPlaceHolder1_IframeTracking');
    if (myFrameTracking != null) {
        myFrameTracking.src = "tracking.aspx?w=" + view + "&cv=" + pkey;
    }

    var myRequestsTracking = document.getElementById('ContentPlaceHolder1_IframeRequests');
    if (myRequestsTracking != null) {
        myRequestsTracking.src = "waitlist.aspx?w=" + view + "&cv=" + pkey;
    }

    var myFrameEdit = document.getElementById('ContentPlaceHolder1_IframeEdit');
    if (myFrameEdit != null) {
        //        if (window.frames['ctl00_ContentPlaceHolder1_IframeEdit'].document.forms['form1'] != null) {

        //            if (window.frames['ctl00_ContentPlaceHolder1_IframeEdit'].$('#form1').data("changed")) {
        //                //alert("test2");
        //                window.frames['ctl00_ContentPlaceHolder1_IframeEdit'].document.forms['form1'].submit();
        //                setTimeout(function() { myFrameEdit.src = 'edit.aspx?w=' + view + '&cv=' + pkey + '&c=' + cols; ; }, 500);
        //            }
        //            else
        //                myFrameEdit.src = 'edit.aspx?w=' + view + '&cv=' + pkey + '&c=' + cols;
        //        }
        //        else
        myFrameEdit.src = 'edit.aspx?w=' + view + '&cv=' + pkey + '&c=' + cols;
    }
}

function CalcDisposition(disposition) {
    switch (disposition) {
        case 'Destroyed':
            if (typeof (ctl00_ContentPlaceHolder1_btnSave) != 'undefined') { ctl00_ContentPlaceHolder1_btnSave.disabled = "disabled"; }
            if (typeof (ctl00_ContentPlaceHolder1_btnNew) != 'undefined') { ctl00_ContentPlaceHolder1_btnNew.disabled = ""; }
            if (typeof (ctl00_ContentPlaceHolder1_btnDelete) != 'undefined') { ctl00_ContentPlaceHolder1_btnDelete.disabled = "disabled"; }
            if (typeof (ctl00_ContentPlaceHolder1_btnPrint) != 'undefined') { ctl00_ContentPlaceHolder1_btnPrint.disabled = ""; }
            if (typeof (ctl00_ContentPlaceHolder1_btnRequest) != 'undefined') { ctl00_ContentPlaceHolder1_btnRequest.disabled = "disabled"; }
            if (typeof (ctl00_ContentPlaceHolder1_btnTransfer) != 'undefined') { ctl00_ContentPlaceHolder1_btnTransfer.disabled = "disabled"; }
            if (typeof (ctl00_ContentPlaceHolder1_btnSave) != 'undefined') { ctl00_ContentPlaceHolder1_btnSave.href = ""; }
            if (typeof (ctl00_ContentPlaceHolder1_lnkNew) != 'undefined') { ctl00_ContentPlaceHolder1_lnkNew.href = "javascript:__doPostBack('ctl00$ContentPlaceHolder1$lnkNew','')"; }
            if (typeof (ctl00_ContentPlaceHolder1_lnkDelete) != 'undefined') { ctl00_ContentPlaceHolder1_lnkDelete.href = ""; }
            if (typeof (ctl00_ContentPlaceHolder1_lnkPrint) != 'undefined') { ctl00_ContentPlaceHolder1_lnkPrint.href = "javascript:__doPostBack('ctl00$ContentPlaceHolder1$lnkPrint','')"; }
            if (typeof (ctl00_ContentPlaceHolder1_lnkRequest) != 'undefined') { ctl00_ContentPlaceHolder1_lnkRequest.href = ""; }
            if (typeof (ctl00_ContentPlaceHolder1_btnTransfer) != 'undefined') { ctl00_ContentPlaceHolder1_btnTransfer.href = ""; }
            break;
        default:
            if (typeof (ctl00_ContentPlaceHolder1_btnSave) != 'undefined') { ctl00_ContentPlaceHolder1_btnSave.disabled = ""; }
            if (typeof (ctl00_ContentPlaceHolder1_btnNew) != 'undefined') { ctl00_ContentPlaceHolder1_btnNew.disabled = ""; }
            if (typeof (ctl00_ContentPlaceHolder1_btnDelete) != 'undefined') { ctl00_ContentPlaceHolder1_btnDelete.disabled = ""; }
            if (typeof (ctl00_ContentPlaceHolder1_btnPrint) != 'undefined') { ctl00_ContentPlaceHolder1_btnPrint.disabled = ""; }
            if (typeof (ctl00_ContentPlaceHolder1_btnRequest) != 'undefined') { ctl00_ContentPlaceHolder1_btnRequest.disabled = ""; }
            if (typeof (ctl00_ContentPlaceHolder1_btnTransfer) != 'undefined') { ctl00_ContentPlaceHolder1_btnTransfer.disabled = ""; }
            if (typeof (ctl00_ContentPlaceHolder1_btnSave) != 'undefined') { ctl00_ContentPlaceHolder1_btnSave.href = "#"; }

            //if (typeof (ctl00_ContentPlaceHolder1_btnNew) != 'undefined') { ctl00_ContentPlaceHolder1_lnkNew.href = "javascript:__doPostBack('ctl00$ContentPlaceHolder1$lnkNew','')"; } 
            //if (typeof (ctl00_ContentPlaceHolder1_btnDelete) != 'undefined') { ctl00_ContentPlaceHolder1_lnkDelete.href = "javascript:__doPostBack('ctl00$ContentPlaceHolder1$lnkDelete','')"; }
            //if (typeof (ctl00_ContentPlaceHolder1_btnPrint) != 'undefined') { ctl00_ContentPlaceHolder1_lnkPrint.href = "javascript:__doPostBack('ctl00$ContentPlaceHolder1$lnkPrint','')"; }
            //if (typeof (ctl00_ContentPlaceHolder1_btnRequest) != 'undefined') { ctl00_ContentPlaceHolder1_lnkRequest.href = "javascript:__doPostBack('ctl00$ContentPlaceHolder1$lnkRequest','')"; }
            //if (typeof (ctl00_ContentPlaceHolder1_btnTransfer) != 'undefined') { ctl00_ContentPlaceHolder1_btnTransfer.href = "javascript:__doPostBack('ctl00$ContentPlaceHolder1$btnTransfer','')"; }

            break;
    }
}

function GetScroll(val) {
    var scrollPosition = document.getElementById('ContentPlaceHolder1_hdScrollPosition');
    //alert(val.scrollTop);
    if (scrollPosition != null)
        scrollPosition.value = val.scrollTop;
}

function SetScroll(val) {
    var gridcontainer = document.getElementById('ContentPlaceHolder1_gridcontainer');
    var gridcontainer2 = document.getElementById('ContentPlaceHolder1_gridDiv');
    //alert(val);
    if (gridcontainer != null)
        gridcontainer.scrollTop = val;
    if (gridcontainer2 != null)
        gridcontainer2.scrollTop = val;
}

function GetBestScroll() {
    var scrollPosition = document.getElementById('ContentPlaceHolder1_hdScrollPosition');
    //alert(val.scrollTop);
    var gridcontainer = document.getElementById('ContentPlaceHolder1_gridcontainer');
    var gridcontainer2 = document.getElementById('ContentPlaceHolder1_gridDiv');

    if (gridcontainer != null) {
        //alert(gridcontainer.scrollTop);
        scrollPosition.value = gridcontainer.scrollTop;
    }
    if (gridcontainer2 != null) {
        //alert(gridcontainer2.scrollTop);
        scrollPosition.value = gridcontainer2.scrollTop;
    }
}

function Show(show) {
    var item1 = document.getElementById(show);
    if (item1 == null)
        item1 = document.getElementById("ContentPlaceHolder1_" + show);
    if (item1 != null)
        item1.style.visibility = "visible";
}

function Hide(hide) {
    var item2 = document.getElementById(hide);
    if (item2 == null)
        item2 = document.getElementById("ContentPlaceHolder1_" + hide);
    if (item2 != null)
        item2.style.visibility = "hidden";
}

function Display(show) {
    //alert(show);
    var item1 = document.getElementById(show);
    if (item1 == null)
        item1 = document.getElementById("ContentPlaceHolder1_" + show);
    if (item1 != null)
        item1.style.display = "block";

    //var table = document.getElementById("ctl00_ContentPlaceHolder1_queryControler_tblQuery");
    //var firstField = document.getElementById("ctl00_ContentPlaceHolder1_queryControler_" + table.getAttribute('firstField'))
    // firstField.focus();
}

function DisplayNone(hide) {
    var item2 = document.getElementById(hide);
    if (item2 == null)
        item2 = document.getElementById("ContentPlaceHolder1_" + hide);
    if (item2 != null)
        item2.style.display = "none";
}

function removeCrLf(obj, e) {
    var text = escape(obj.value);
    if (e.keyCode == 13) {
        e.keyCode = 0;
    }
}

function addAttrForBetween(id) {
    $(id).attr("required", "required");
}
function removeAttrForBetween(id) {
    $(id).removeAttr("required");
}

function betweenSelect(id, nextId) {
    var element = document.getElementById(id + "_Operators");
    if (element == null) {
        element = document.getElementById("Dialog_Query_DialogQuery_" + nextId + "_Operators");
    }
    if (element.value.toLowerCase() == "between") {
        id = "#" + id;
        nextId = "#Dialog_Query_DialogQuery_" + nextId;

        $(id).css("border-color", "");

        if ($(id).val() == "" && $(nextId).val() == "") {
            $(nextId).css("border-color", "");
            $(id).css("border-color", "");
            removeAttrForBetween(nextId);
            removeAttrForBetween(id);
        }
        else if (element.value.toLowerCase() == "between" && $(nextId).val() == "") {
            $(nextId).css("border-color", "Red");
            addAttrForBetween(nextId);
            removeAttrForBetween(id);
        }
        else if (element.value.toLowerCase() == "between" && $(id).val() == "") {
            $(id).css("border-color", "Red");
            addAttrForBetween(id);
            removeAttrForBetween(nextId);
        }
        else {
            $(nextId).css("border-color", "");
            removeAttrForBetween(id);
        }
    }
}

function autoSelect(value, id) {
    var lastChar = id.substr(id.length - 1);
    if (lastChar == "2") {
        id = id.substr(0, id.length - 1)
    }

    var element = document.getElementById(id + "_Operators");
    if (element == null)
        element = document.getElementById("ContentPlaceHolder1_queryControler_" + id + "_Operators");
    if (element == null)
        element = document.getElementById("ContentPlaceHolder1_dialog1_queryControler_" + id + "_Operators");
    if (element == null)
        element = document.getElementById("Dialog_Query_DialogQuery_" + id + "_Operators");

    if (element != null && element.value == " ") {
        element.value = value;
    }
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

function setCurrentDate(elem) {
    var today = new Date();
    if (event.keyCode == 116) {
        event.keyCode = undefined;        
        //elem.value = moment(today).format(getDatePreferenceCookieForMoment().toUpperCase());        
        var todayFormattedDate = moment(today).format(getDatePreferenceCookieForMoment().toUpperCase());
        setInterval(function () {
            elem.value = todayFormattedDate;
        }, 10);
    }
}

function autoUnselect(value, id) {
    if (value == "") {
        var lastChar = id.substr(id.length - 1);
        if (lastChar == "2") {
            id = id.substr(0, id.length - 1)
        }
        var element = document.getElementById(id + "_Operators");
        if (element == null)
            element = document.getElementById("ContentPlaceHolder1_queryControler_" + id + "_Operators");

        if (element != null && element.value.toLowerCase() != "between") {
            element.value = " ";
        }
    }
}

function SelectAll(value, range) {
    for (i = 0; i < range.length; i++) {
        var element = $get("ContentPlaceHolder1_" + range[i]);

        if (element != null)
            element.checked = value;
    }
}

function ClearQuery(range) {
    //alert(range + " " + range.length);
    for (i = 0; i < range.length; i++) {
        //alert(i + " " + range[i]);
        var element = $get(range[i]);
        //alert(range[i]);
        if (element != null) {
            element.value = "";
        }
        else {
            element = $get(range[i] + "_lookup");
            if (element != null)
                element.value = "";
        }

        var betweenOperator = $get(range[i] + "2");
        if (betweenOperator != null) {
            betweenOperator.value = "";
        }
        //alert(range[i]+ " " +element.value);
        var operator = $get(range[i] + "_Operators");
        if (operator != null)
            operator.value = " ";
        else {
            operator = $get(range[i] + "_lookup" + "_Operators");
            if (operator != null)
                operator.value = " ";
        }
    }
}

function setTimezoneCookie() {
    var timezone_cookie = "timezoneoffset";

    // if the timezone cookie not exists create one.
    if (!$.cookie(timezone_cookie)) {
        // check if the browser supports cookie
        var test_cookie = 'test cookie';
        $.cookie(test_cookie, true);

        // browser supports cookie
        if ($.cookie(test_cookie)) {

            // delete the test cookie
            $.cookie(test_cookie, null);

            // create a new cookie 
            $.cookie(timezone_cookie, new Date().getTimezoneOffset());
            // re-load the page
            location.reload();
        }
    }
        // if the current timezone and the one stored in cookie are different
        // then store the new timezone in the cookie and refresh the page.
    else {
        var storedOffset = parseInt($.cookie(timezone_cookie));
        var currentOffset = new Date().getTimezoneOffset();
        // user may have changed the timezone
        if (storedOffset !== currentOffset) {
            $.cookie(timezone_cookie, new Date().getTimezoneOffset());
            location.reload();
        }
    }
}

function ChangeDropdown(control) {
    var selectValue = $('#' + control.id + ' :selected').val().toLowerCase();
    var textbox = control.id.replace("Dialog_Query_DialogQuery_", "").replace("_Operators", "")
    var type = $("#Dialog_Query_DialogQuery_" + textbox).attr('type');

    if (type == "text") {
        if (selectValue == "between") {
            $("#Dialog_Query_DialogQuery_" + textbox + "2").css("display", "block");
            $("#Dialog_Query_DialogQuery_" + textbox + "2").css("width", "45%");
            $("#Dialog_Query_DialogQuery_" + textbox + "2").css("margin-left", "3px");
            $("#Dialog_Query_DialogQuery_" + textbox).css("width", "45%");

            $("#Dialog_Query_DialogQuery_" + textbox).attr("placeholder", $("#Dialog_Query_DialogQuery_hdnStart").val());
            $("#Dialog_Query_DialogQuery_" + textbox + "2").attr("placeholder", $("#Dialog_Query_DialogQuery_hdnEnd").val());
            $("#Dialog_Query_DialogQuery_" + textbox + "2").attr("tabindex", parseInt($("#Dialog_Query_DialogQuery_" + textbox).attr('tabindex')) + 1);
        }
        else if (selectValue == " ") {
            $("#Dialog_Query_DialogQuery_" + textbox).val("");
            $("#Dialog_Query_DialogQuery_" + textbox + "2").val("");
            $("#Dialog_Query_DialogQuery_" + textbox + "2").css("display", "none");
            $("#Dialog_Query_DialogQuery_" + textbox).attr("placeholder", "");
            $("#Dialog_Query_DialogQuery_" + textbox).attr("style", "");
            $("#Dialog_Query_DialogQuery_" + textbox + "2").css("border-color", "");
            removeAttrForBetween("#Dialog_Query_DialogQuery_" + textbox + "2");
            removeAttrForBetween("#Dialog_Query_DialogQuery_" + textbox);
        }
        else {
            $("#Dialog_Query_DialogQuery_" + textbox + "2").css("display", "none");
            $("#Dialog_Query_DialogQuery_" + textbox).css("width", "91%");
            $("#Dialog_Query_DialogQuery_" + textbox).removeAttr("placeholder");
            $("#Dialog_Query_DialogQuery_" + textbox + "2").removeAttr("placeholder");
            $("#Dialog_Query_DialogQuery_" + textbox).css("border-color", "");
            $("#Dialog_Query_DialogQuery_" + textbox + "2").val("");
            removeAttrForBetween("#Dialog_Query_DialogQuery_" + textbox + "2");
            removeAttrForBetween("#Dialog_Query_DialogQuery_" + textbox);
        }
    }
    else if (type == "checkbox") {
        if (selectValue == " ") {
            $("#Dialog_Query_DialogQuery_" + textbox).prop("checked", false);
        }
    }
    else {
        if (selectValue == " ") {
            $("#Dialog_Query_DialogQuery_" + textbox).val("");
        }
    }
}