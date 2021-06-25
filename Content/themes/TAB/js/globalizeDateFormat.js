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