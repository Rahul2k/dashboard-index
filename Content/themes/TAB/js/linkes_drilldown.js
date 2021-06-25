/*
 * Linkes iPod Style Drilldown Menu - jQuery Plugin
 * Simple drilldown menu creator for your websites
 *
 * Examples and documentation at: http://davelinke.tumblr.com/post/32806848769/ipod-style-drilldown-menu-jquery-plugin
 *
 * Copyright (c) 2012 David Linke
 *
 * Version: 1.0 (09/28/2012)
 * Requires: jQuery v1.4.4+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

var mnuOpt = '';
(function ($) {
    $.fn.linkesDrillDown = function (q) {
        var a = $.extend({
            easeHeight: true,
            cookieName: 'curMenuIds',
            menuLevel: 3
        }, q);
        $.fn.linkesDrillDown.sdd = function (o, f) {
            var g = o.hasClass('l_drillDown');
            if (!g) {
                o.addClass('active');
                $.fn.linkesDrillDown.sdd(o.parent().closest('ul'), false)
            } else {
                var h = o.find('ul.active');
                var i = ((o.width() * h.length) * -1) + 'px';
                o.animate({
                    left: i
                }, 'fast')
            }
            if (f) {
                var t = o.siblings('a');
                var j = o.parent();
                var k = t.closest('.l_drillDownWrapper').find('.l_ddbc');
                if (!o.parent().parent().hasClass('l_drillDown')) {
                    var l = '<span>&laquo </span>' + t.parent().parent().siblings('a').text();
                    var m = "goUp"
                } else {
                    var l = '<span>&laquo </span>' + $('#hdnHomeVal').val();
                    var m = "goHome"
                }
                var n = function () {
                    var w = t.closest('.l_drillDownWrapper');
                    var a = w.find('.displayed');
                    var b = w.find('.l_drillDown').outerHeight();
                    if (a.length > 0) b = (w.find('.displayed').outerHeight() + w.find('.l_ddbc').outerHeight());
                    w.animate({
                        height: b
                    }, 'fast', function () {
                            $(window).trigger('resize');
                    })
                };
                var p = $(document.createElement('a')).html(l).addClass(m).attr('href', 'javascript:;').click(function () {
                    var a = $(this).closest('.l_drillDownWrapper');
                    var b = a.find('.displayed');
                    var c = a.find('active');
                    var d = b.parent().parent();
                    var e = d.siblings('a');
                    if (!d.hasClass('l_drillDown')) {
                        e.trigger('click');
                    } else {
                        b.removeClass('displayed');
                        c.removeClass('active');
                        a.find('.l_drillDown').animate({
                            left: 0
                        }, 'fast');
                        $(this).parent().empty().slideUp('fast');
                        n()
                    }
                });
                if ($('#' + $(t).attr('id')).parent().parent().attr('id') == 'ulViews') {
                    if ($('ul#ulViews li ul.displayed').parent().find('a').length > 0) {
                        var backId = $('ul#ulViews li ul.displayed').parent().find('a')[0].id;
                        k.empty().append('<span class="drilldown_Parent">' + '<i class="font_icon theme_color">&#xf1c0;</i><a onclick="RootItemClick(\'' + backId.trim() + '\')">' + t.text() + '</a></span>').append(p).slideDown(50, function () { n() })
                    }
                }
                else if ($('#' + $(t).attr('id')).parent().parent().attr('id') == 'ulReports') {
                    if ($('ul#ulReports li ul.displayed').parent().find('a').length > 0) {
                        var backId = $('ul#ulReports li ul.displayed').parent().find('a')[0].id;
                        if ($('#' + backId).hasClass('ReportDefinitions')) {
                            k.empty().append('<span class="drilldown_Parent">' + '<i class="font_icon theme_color">&#xf1c0;</i><a onclick="ReportRootItemClick(\'' + backId.trim() + '\')">' + t.text() + '</a></span>').append(p).slideDown(50, function () { n() });
                        }
                        if ($('#' + backId).hasClass('ReportStyles')) {
                            k.empty().append('<span class="drilldown_Parent">' + '<i class="font_icon theme_color">&#xf1c0;</i><a onclick="ReportStyleRootItemClick(\'' + backId.trim() + '\')">' + t.text() + '</a></span>').append(p).slideDown(50, function () { n() });
                        }
                    }
                }
                else {
                    k.empty().append('<span class="drilldown_Parent">' + '<i class="font_icon theme_color">&#xf1c0;</i>' + t.text() + '</span>').append(p).slideDown(50, function () { n() });
                }
            }
        };
        var r = this;
        mnuOpt = a;
        r.each(function (a) {
            var d = $(this);
            d.addClass('l_drillDown');
            d.wrap('<div class="l_drillDownWrapper" />');
            d.before('<div class="l_ddbc" />');
            d.find('a[href="#"]').attr('href', 'javascript:;');
            d.find('a').each(function () {
                if (($(this).attr('href') == 'javascript:;') && ($(this).siblings('ul').length > 0)) $(this).parent().addClass('hasSubs');
            });
            d.find('a').click(function () {
                if ($(this).attr('href') == 'javascript:;') {
                    var t = $(this);
                    var c = t.closest('.l_drillDown');
                    var a = (t.closest('ul').position().left - c.position().left) * -1;
                    var b = t.closest('.l_drillDownWrapper').find('.l_ddbc');
                    c.find('ul').removeClass('active').removeClass('displayed');
                    var u = t.siblings('ul');
                    u.addClass('displayed');
                    var vrCookiesVal = '';
                    if (this.id != undefined) {
                        //if (getCookie(mnuOpt.cookieName) == null) {
                        //    setCookie(mnuOpt.cookieName, this.id, 1);
                        //}
                        //else {
                        var ddd = getCookie(mnuOpt.cookieName);

                        if (getCookie(mnuOpt.cookieName) != null) {
                            vrCookiesVal = getCookie(mnuOpt.cookieName);
                            vrCookiesVal = ((vrCookiesVal == undefined) ? '' : vrCookiesVal);
                            if (vrCookiesVal.indexOf(this.id) == -1) {
                                if (vrCookiesVal.indexOf('|AL') >= 0) {
                                    var ids = vrCookiesVal.split('|');
                                    var idsString = '';
                                    for (i = 0; i < ids.length; i++) {
                                        if (ids[i].indexOf('AL') >= 0 && i == 1) {
                                            ids[i] = this.id;
                                        }
                                        idsString += ((idsString == '') ? ids[i] : '|' + ids[i]);
                                    }
                                    setCookie(mnuOpt.cookieName, idsString, 1);
                                }
                                else {
                                    if (mnuOpt.menuLevel == 3) {
                                        setCookie(mnuOpt.cookieName, (getCookie(mnuOpt.cookieName) == '' ? this.id : (getCookie(mnuOpt.cookieName) + '|' + this.id)), 1);
                                    }
                                }
                            }
                        }
                    }
                    $.fn.linkesDrillDown.sdd(u, true);
                }
            })
        })
        $('#divmenuloader').hide();
        $("#divMenu,.divMenu").css("visibility", "visible");
    }
})(jQuery);