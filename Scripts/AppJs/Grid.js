
var gridheight = 0;
var size = 0;
var IsMethodExecuting = false;
var lastScrollTop = 0;
var obj = {};
var arrayName = "columnWidthArray";
var hasData = true;

function pageLoad() {
    var url = window.location.search;
    url = url.replace("?", '');
    if (url.toLowerCase() == "deletecookies=1") {
        delCookie('columnWidthArray');
    }

    CalculateNews(0, false);
    GridSetting();
    BindSelectAllCheckboxClick();

    $(".nhn").click(function () {
        $(this).addClass("umand");
    });

    $(".show_form_btn, .hide_form_btn").click(function () {
        var effect = 'slide';
        var options = { direction: "right" };
        var duration = 600;
        var gridName;

        if ($("#ContentPlaceHolder1_RMSTable").is(':visible')) {
            gridName = "_gridcontainer";
        }
        else {
            gridName = "_grid_main";
        }

        if ($(this).hasClass('show_form_btn')) {
            $("div[id$='" + gridName + "']").addClass("grid_show_form").removeClass("grid_hide_form");
            $('#right-form-box').show(effect, options, duration);
            CalculateEdit();
            LoadShowForm(true);
        }
        else {
            $('#right-form-box').hide(effect, options, duration);
            $("div[id$='" + gridName + "']").removeClass("grid_show_form").addClass("grid_hide_form");
            LoadShowForm(false);
        }
    });

    $("div[id$='_grid_main']").find('table.grid_table').on('scroll', function () {
        $("div[id$='_grid_main']").find('table.grid_table > *').width($("table").width() + $("table").scrollLeft());
    });

    $("div[id$='_gridcontainer']").find('table.list_table').on('scroll', function () {
        $("div[id$='_gridcontainer']").find('table.list_table > *').width($("table").width() + $("table").scrollLeft());
    });

    $("#left-panel-arrow").click(function () {
        $(this).toggleClass("fa-caret-right");
    });

    //$("a.dropdown-toggle").unbind().click(function () {
    //    var x = $(this).offset().top;
    //    var y = $("#test").offset().top;

    //    var parent = $(this).parent();
    //    var diglogHeight = parent.find("ul").height() + 50;

    //    parent.removeClass("dropup");
    //    if (y - x < diglogHeight) {
    //        parent.addClass("dropup");
    //    }
    //});

    formShowHide((getCookie('showform') == "1") ? true : false);
}

function CalculateNews(divheight, IsPluse) {
    if ($("#ContentPlaceHolder1_divNews").is(':visible')) {
        var windowHeight = $(window).height();
        var top = $("#ContentPlaceHolder1_divNews").offset().top;

        if (IsPluse) {
            $("#ContentPlaceHolder1_divNews").height(windowHeight - top - 50 + divheight);
        }
        else {
            $("#ContentPlaceHolder1_divNews").height(windowHeight - top - 50 - divheight);
        }
    }
}

function Setting() {
    GridSetting();
    BindSelectAllCheckboxClick();
}

function BindSelectAllCheckboxClick() {
    $(document).on('change', '#ContentPlaceHolder1_gridSelectAll', function () {
        $("#ContentPlaceHolder1_grid_table input[type=checkbox]").prop('checked', $(this).prop("checked"));
    });

    $(document).on('change', '#ContentPlaceHolder1_cbSelectAll', function () {
        $("#ContentPlaceHolder1_RMSTable tbody input[type=checkbox]").prop('checked', $(this).prop("checked"));
    });
}

function GridSetting() {
    if ($("#ContentPlaceHolder1_RMSTable").is(':visible')) {
        $("#ContentPlaceHolder1_RMSTable tbody").on("scroll", function (e) {
            var $o = $(e.currentTarget);
            if ($o[0].scrollHeight - $o.scrollTop() <= $o.outerHeight()) {
                GetListRecords();
            }
        });
    }
    else if ($("#ContentPlaceHolder1_grid_table").is(':visible')) {
        var columnWidth = [];
        columnWidth.push("50px");
        columnWidth.push("50px");
        columnWidth.push("50px");

        $("#ContentPlaceHolder1_grid_table").find("tr:first th").each(function () {
            var cName = $(this)[0].attributes["columnName"].nodeValue;
            if (cName.length > 0) {
                var key = $("#ContentPlaceHolder1_viewId").val() + "-" + cName;
                var value = getProperty(key);
                if (value == undefined) {
                    columnWidth.push("250px");
                }
                else {
                    columnWidth.push(value + "px");
                }
            }
        });

        // Reference from this site https://github.com/Mottie/tablesorter/issues/874
        $('#ContentPlaceHolder1_grid_table').trigger("destroy", false);

        $('#ContentPlaceHolder1_grid_table').tablesorter({
            widgets: ['stickyHeaders', 'resizable'],
            widgetOptions: {
                stickyHeaders_attachTo: '.grid_wrapper',
                stickyHeaders_includeCaption: false,
                storage_useSessionStorage: false,
                storage_useLocalStorage: false,
                resizable_addLastColumn: true,
                resizable_widths: columnWidth
            }
        });

        if ($("#ContentPlaceHolder1_hdnClickButtonName").val() != "ctl00$ContentPlaceHolder1$triggerEdit") {
            $('#ContentPlaceHolder1_grid_table').trigger('resetToLoadState');
        }

        $('#ContentPlaceHolder1_grid_table').on('resize', function (event, columns) {
            var nodeValue = columns[0].attributes["columnName"].nodeValue;
            if (nodeValue.length > 0) {
                clientWidth = columns[0].clientWidth + 1;
                clientName = nodeValue;

                var key = $("#ContentPlaceHolder1_viewId").val() + "-" + clientName;

                if (getCookie(arrayName) == undefined) {
                    obj[key] = clientWidth;
                    setCookie(arrayName, JSON.stringify(obj), 180);
                }
                else {
                    var arrayString = getCookie(arrayName);
                    var array = JSON.parse(arrayString);
                    array[key] = clientWidth;
                    setCookie(arrayName, JSON.stringify(array), 180);
                }
            }
        });

        $('#ContentPlaceHolder1_grid_table').bind('tablesorter-ready', function (e, table) {
            $('#ContentPlaceHolder1_divloader').hide();
            $("#ContentPlaceHolder1_grid_main").css("visibility", "visible");
        });

        $("#ContentPlaceHolder1_grid_main").on("scroll", function (e) {
            var st = $("#ContentPlaceHolder1_grid_main").scrollTop();
            if (st > lastScrollTop) {
                var $o = $(e.currentTarget);
                if ($o[0].scrollHeight - $o.scrollTop() <= $o.outerHeight()) {
                    GetRecords();
                }
            }
            lastScrollTop = st;
        });
    }
}

var getProperty = function (propertyName) {
    var arrayString = getCookie(arrayName);
    var array = JSON.parse(arrayString);
    if (array != null)
        return array[propertyName];
    else
        return undefined;
};

function CalculateEdit() {
    var cal, elmnt, edittable;
    if (size != 0) {
        var space;
        if ($("#ContentPlaceHolder1_RMSTable").is(':visible'))
            space = size + 65;
        else
            space = size + 30;

        if ($("#ContentPlaceHolder1_edit_lblError").height() != null) {
            cal = space - 160 - $("#ContentPlaceHolder1_edit_lblError").height();
        } else {
            cal = space - 110;
        }

        elmnt = document.getElementById("Edittable");
        if (elmnt == null) return;
        edittable = elmnt.scrollHeight + 5;

        if (edittable > cal) {
            $("#right-form-box").height(space);
            $("#Edittable").height(cal);
        }
        else {
            $("#right-form-box").height("auto");
            $("#Edittable").height("auto");
        }
    }
    else if ($("#right-form-box").offset() != undefined) {
        var windowHeight = $(window).height();
        var gridTopOffSet = $("#right-form-box").offset().top;
        cal = (windowHeight - gridTopOffSet) - 140;
        elmnt = document.getElementById("Edittable");
        edittable = elmnt.scrollHeight + 5;

        if (edittable > cal) {
            $("#right-form-box").height(windowHeight - (gridTopOffSet + 20));
            $("#Edittable").height(cal);
        }
        else {
            $("#right-form-box").height("auto");
            $("#Edittable").height("auto");
        }
    }
}

// Fixed : FUS-5767 by Nikunj 
$(window).resize(function () {
    CalculateGrid();
});

function CalculateGrid(pixel, IsPluse) {
    var gridName = "";
    var gridTopOffset = 0;

    if ($("#ContentPlaceHolder1_RMSTable").is(':visible')) {
        gridName = $('#ContentPlaceHolder1_RMSTable');
        gridTopOffset = gridName.children('tbody').offset().top;
    }
    else if ($("#ContentPlaceHolder1_grid_table").is(':visible')) {
        gridName = $('#ContentPlaceHolder1_grid_main');
        gridTopOffset = gridName.offset().top;
    }

    if (pixel == undefined || IsPluse == undefined) {
        IsPluse = false;
        pixel = 0;

        if ($("#ContentPlaceHolder1_RMSTable").is(':visible'))
            gridheight = gridName.children('tbody').height();
        else if ($("#ContentPlaceHolder1_grid_table").is(':visible')) {
            gridheight = (gridName).height();
        }
    }

    if (gridheight != 0) {
        if ($('#ContentPlaceHolder1_TrackingStatus').offset() == undefined) {
            var windowHeight = $(window).height();
            if (IsPluse)
                size = (windowHeight - 35) - (gridTopOffset) + pixel;
            else
                size = (windowHeight - 35 - pixel) - (gridTopOffset);
        }
        else {
            var trackingOffset = $('#ContentPlaceHolder1_TrackingStatus').offset().top;
            if (IsPluse)
                size = (trackingOffset - 35) - (gridTopOffset) + pixel;
            else
                size = (trackingOffset - 35 - pixel) - (gridTopOffset);
        }

        if (gridheight < size) {
            if ($("#ContentPlaceHolder1_RMSTable").is(':visible'))
                gridName.children('tbody').css("height", size + "px");
            else
                gridName.css("height", (size + 15) + "px");

            //if ($("#ContentPlaceHolder1_RMSTable").is(':visible'))
            //    gridName.children('tbody').css("height", "auto");
            //else
            //    gridName.css("height", "auto");
        }
        else {
            if ($("#ContentPlaceHolder1_RMSTable").is(':visible'))
                gridName.children('tbody').css("height", size + "px");
            else
                gridName.css("height", (size + 15) + "px");
        }
    }
}

function HideShowClick(id, parameter) {
    var result = $(id).text().split(" ");
    var divheight = 0;

    if (parameter == 0) {
        $("#top_action_items").removeAttr("style");
        divheight = $("#top_action_items").height();
    }
    else if (parameter == 1) {
        $("#top_action_items1").removeAttr("style");
        divheight = $("#top_action_items1").height();
    }

    if (result[result.length - 1] == "[+]") {
        CalculateGrid(divheight, false);
        CalculateEdit();
        CalculateNews(divheight, false);
    }
    else {
        $("body").css("overflow", "hidden");
        CalculateGrid(divheight, true);
        CalculateEdit();
        CalculateNews(divheight, true);
    }

    SetHideShowText($(id));

}

function HideShowSetting() {
    formShowHide((getCookie('showform') == "1") ? true : false);
}

function formShowHide(IsShow) {

    if ($("#ContentPlaceHolder1_RMSTable").is(':visible')) {
        gridName = "_gridcontainer";
    }
    else {
        gridName = "_grid_main";
    }

    if (IsShow) {
        $('#right-form-box').show('slide', { direction: "right" }, 600);
        $("div[id$='" + gridName + "']").addClass("grid_show_form").removeClass("grid_hide_form");
        CalculateEdit();
    }
    else {
        $('#right-form-box').hide('slide', { direction: "right" }, 600);
        $("div[id$='" + gridName + "']").removeClass("grid_show_form").addClass("grid_hide_form");
    }
}

function LoadShowForm(IsShow) {
    var Position = $("#ContentPlaceHolder1_hdScrollPosition").val();

    $.ajax({
        type: "POST",
        url: "Data.aspx/HideShowPanel",
        data: '{"IsShow":"' + IsShow + '","Position":"' + Position + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        failure: function (response) {
        },
        error: function (xhr, status, error) {
        }
    });
}

function SetInitialValue() {
    hasData = true
}

function GetRecords() {

    if (IsMethodExecuting == false && hasData == true) {
        IsMethodExecuting = true;
        if ($("[id$=ContentPlaceHolder1_grid_table] .loader").length == 0) {
            var row = $("[id$=ContentPlaceHolder1_grid_table] tr").eq(0).clone(true);
            var count = row[0].cells.length;
            row.addClass("loader");
            row.children().remove();
            row.append("<td colspan = " + count + " style = 'background-color:white;text-align:left;padding-left:15px'><img id='loader' alt='' src='103.gif'  /></td>");
            $("[id$=ContentPlaceHolder1_grid_table]").append(row);
        }

        $.ajax({
            type: "POST",
            url: "Data.aspx/LazyLoadData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            failure: function (response) {
                $("[id$=ContentPlaceHolder1_grid_table] .loader").remove();
                $("#loader").hide();
                IsMethodExecuting = false;
            },
            error: function (xhr, status, error) {
                //var err = eval("(" + xhr.responseText + ")");
                //alert(err.Message);
                $("[id$=ContentPlaceHolder1_grid_table] .loader").remove();
                $("#loader").hide();
                IsMethodExecuting = false;
            }
        });
    }
}

function OnSuccess(response) {

    if (response.d != null) {
        var xmlDoc = $.parseXML(response.d);
        var records = $(xmlDoc).find("records");
        $("[id$=ContentPlaceHolder1_grid_table] .loader").remove();

        if (records.length <= 0) {
            hasData = false;
        }

        records.each(function () {
            var record = $(this);
            var row = $("[id$=ContentPlaceHolder1_grid_table] tr").eq(1).clone(true);
            row.removeAttr("style").removeClass('tbsorterselection');

            var tr = $(record.find("trColumn").text());
            row.attr("id", tr.attr("id"));
            row.attr("onclick", tr.attr("onclick"));

            var length = record.children().length;

            for (var i = 0; i < length - 1 ; i++) {
                var columnName = record.children()[i].nodeName;
                $("." + columnName, row).html(record.find(columnName).text());
            }

            $("[id$=ContentPlaceHolder1_grid_table]").append(row);
        });

        var tdCount = $("[id$=ContentPlaceHolder1_grid_table]").find('tr').length;
        var totalString = $("#ContentPlaceHolder1_spnTotal").text();
        var array = totalString.split(" ");

        if (array.length = 6) {
            array[2] = tdCount - 1;
            $("#ContentPlaceHolder1_spnTotal").text(array.join(" "));
        }

        if ($('#ContentPlaceHolder1_gridSelectAll').is(':checked') == true) {
            $("#ContentPlaceHolder1_grid_table").find("input[type=checkbox]").attr("checked", true);
        }

        $("#ContentPlaceHolder1_grid_table").trigger("update");
        $("#loader").hide();
        IsMethodExecuting = false;
    }
    else {
        alert(response.d);
    }
}

function GetListRecords() {
    if (IsMethodExecuting == false && hasData == true) {
        IsMethodExecuting = true;
        if ($("[id$=ContentPlaceHolder1_RMSTable] .loader").length == 0) {
            var row = $("[id$=ContentPlaceHolder1_RMSTable] tr").eq(0).clone(true);
            var count = row[0].cells.length;
            row.addClass("loader");
            row.children().remove();
            row.append("<td colspan = '5' style = 'background-color:white;text-align:left;padding-left:10px'><img id='loader' alt='' src='103.gif'  /></td>");
            $("[id$=ContentPlaceHolder1_RMSTable]").append(row);
        }

        $.ajax({
            type: "POST",
            url: "Data.aspx/LazyListData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnListSuccess,
            failure: function (response) {
                $("[id$=ContentPlaceHolder1_RMSTable] .loader").remove();
                $("#loader").hide();
                IsMethodExecuting = false;
            },
            error: function (xhr, status, error) {
                //var err = eval("(" + xhr.responseText + ")");
                //alert(err.Message);
                $("[id$=ContentPlaceHolder1_RMSTable] .loader").remove();
                $("#loader").hide();
                IsMethodExecuting = false;
            }
        });
    }
}

function OnListSuccess(response) {
    if (response.d != null) {
        var xmlDoc = $.parseXML(response.d);
        var records = $(xmlDoc).find("records");
        $("[id$=ContentPlaceHolder1_RMSTable] .loader").remove();

        if (records.length <= 0) {
            hasData = false;
        }

        records.each(function () {
            var record = $(this);
            var row = $("[id$=ContentPlaceHolder1_RMSTable] tr").eq(1).clone(true);
            row.removeAttr("style").removeClass('tbsorterselection');

            var tr = $(record.find("trColumn").text());
            row.attr("id", tr.attr("id"));
            row.attr("onclick", tr.attr("onclick"));

            var length = record.children().length;

            for (var i = 0; i < length - 1 ; i++) {
                var columnName = record.children()[i].nodeName;
                $("." + columnName, row).html(record.find(columnName).text());
            }

            $("[id$=ContentPlaceHolder1_RMSTable]").append(row);
        });

        var tdCount = $("[id$=ContentPlaceHolder1_RMSTable]").find('tr').length;
        var totalString = $("#ContentPlaceHolder1_spnTotal").text();
        var array = totalString.split(" ");

        if (array.length = 6) {
            array[2] = tdCount - 1;
            $("#ContentPlaceHolder1_spnTotal").text(array.join(" "));
        }

        if ($('#ContentPlaceHolder1_cbSelectAll').is(':checked') == true) {
            $("#ContentPlaceHolder1_RMSTable tbody").find("input[type=checkbox]").attr("checked", true);
        }

        //$("#ContentPlaceHolder1_grid_table").trigger("update");
        $("#loader").hide();

        IsMethodExecuting = false;
    }
}


//(function () {
//    var dropdownMenu;
//    $(window).on('show.bs.dropdown', function (e) {
//        dropdownMenu = $(e.target).find('.dropdown-menu');
//        $('body').append(dropdownMenu.detach());
//        dropdownMenu.css('display', 'block');
//        dropdownMenu.position({
//            'my': 'right top',
//            'at': 'right bottom',
//            'of': $(e.relatedTarget)
//        })
//    });
//    $(window).on('hide.bs.dropdown', function (e) {
//        $(e.target).append(dropdownMenu.detach());
//        dropdownMenu.hide();
//    });
//})();