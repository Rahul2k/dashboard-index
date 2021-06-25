@Code
    ViewData("Title") = "Index"
    Layout = Nothing
End Code
<head>
    @*to support IE9*@
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
</head>

<style type="text/css">
    .show_attachment {
        position: fixed;
        right: 5%;
        bottom: 0;
        top: 0;
        width: 550px;
        height: 80vh;
        margin: auto;
        z-index: 10000;
        display: none;
    }

    /*#grid_main {
        position:relative;
        overflow: auto;
        max-height: 600%;

    }*/

    #grid_main {
        position: relative;
        overflow: scroll;
        max-height: 85%;
        max-width: 100%;
    }
</style>



<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,400italic,700,600italic" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" href="favicon.ico" />
<link href="~/Content/themes/TAB/css/bootstrap.min.css" rel="stylesheet" />

@*<link href="~/Content/themes/TAB/css/media.css" rel="stylesheet" />*@
<link href="~/Content/themes/TAB/css/font-awesome.css" rel="stylesheet" />
@*<link href="~/Content/themes/TAB/css/simple-sidebar.css" rel="stylesheet" />*@
@*<link href="~/Content/themes/TAB/css/linkes_drilldown.css" rel="stylesheet" />*@
@*<link href="~/Content/themes/TAB/css/toastrmin.css" rel="stylesheet" />*@
@*<link href="~/Content/themes/TAB/css/jquery.mCustomScrollbar.css" rel="stylesheet" type="text/css" />*@
@*<link href="~/Content/themes/TAB/css/chosen.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/themes/TAB/css/custom.css" rel="stylesheet" media="screen, print" />*@
<link href="~/Content/themes/TAB/css/Fusion10.css" rel="stylesheet" />
<link href="~/Content/themes/TAB/css/theme.css" type="text/css" rel="stylesheet" />



<div class="container">
    <br />
    @Html.Partial("_gridView")
</div>

<input id="getdataRows" value="@ViewBag.tableRowsCell" type="hidden" />
<input id="getHeaderCell" value="@ViewBag.tableHeaderCell" type="hidden" />
<input id="chkIfAttchment" value="@ViewBag.chkIfAttachment.ToString" type="hidden" />
<input id="storeVariable" value="@ViewBag.storeVariables" type="hidden" />





@*<script src="~/Scripts/AppJs/GridTableApi.js"></script>*@

@*@Scripts.Render("~/bundles/Tablesorter")*@

<script src="~/Content/themes/TAB/js/jquery-3.4.1.min.js"></script>
<script src="~/Content/themes/TAB/js/bootstrap.js"></script>
<script src="~/Content/themes/TAB/js/jquery.tablesorter.js"></script>
<script src="~/Content/themes/TAB/js/jquery.tablesorter.widgets.js"></script>
<script src="~/Content/themes/TAB/js/jquery.metadata.js"></script>


<script type="text/javascript">
    var total = $("#storeVariable").val().split(",")[3]
    var current = 0

    $(document).ajaxStart(function () {
        $('#ajaxProgress').show();
    });
    $(document).ajaxStop(function () {
        $('#ajaxProgress').hide();
    });

    $(document).ready(function () {
        //setup table first load
        setupTable()
        //$('table').trigger('resizableReset');
        //$('#grid_table').trigger('resizableUpdate');
        $("#grid_table").tablesorter({
            theme: 'blue',
            widgets: ["stickyHeaders", "resizable"],
            widgetOptions: {
                stickyHeaders_attachTo: '#grid_main',
                resizable_addLastColumn: true,
                stickyHeaders_includeCaption: false,
                storage_useSessionStorage: false,
                storage_useLocalStorage: false,
                resizable_widths: true,
                //scroller_height: 600,
            },
        });


        //get record after scrolling down
        $("#grid_main").bind('scroll', function () {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                if (current != total) {
                    loadRecordsOnscrollDown();
                }
            }
        });
    });


    //first method run to initiate new table
    function setupTable() {
        buildHeader();
        var datarows = $("#getdataRows").val();
        var GetDataFirstRows = JSON.parse(datarows);
        buildRows(GetDataFirstRows);
    }
    // load new record on scroll down to the bottom.
    var pageNum = 1;
    function loadRecordsOnscrollDown() {
        debugger;
        var storedVariables = $("#storeVariable").val();
        var view1 = storedVariables.split(',')[0]
        var rowid = storedVariables.split(',')[1]
        var view2 = storedVariables.split(',')[2]
        pageNum = pageNum + 1
        $.ajax({
            url: "/WebApi/lazyLoadData/",
            type: 'GET',
            datatype: 'json',
            data: { view1: view1, rowid: rowid, view2: view2, pageNum: pageNum },
            success: function (data) {
                var getDatarows = JSON.parse(data)
                $("#grid_table").trigger("update");
                buildRows(getDatarows)
            }
        });
    }

    //get header data and place it in table
    function buildHeader() {
        var dataHeader = $("#getHeaderCell").val();
        var mainDiv = $("#grid_main");
        var chkIfAttachmentExist = '@ViewBag.chkIfAttachment';
        var sendDataHeaderToView = JSON.parse(dataHeader)

        mainDiv.html('<table id="grid_table"><thead><tr></tr></thead><tbody></tbody></table>')
        var tablethead = $("#grid_table thead tr")
        for (var i = 0; i < sendDataHeaderToView.length; i++) {
            var value = sendDataHeaderToView[i];
            if (i == 0) {
                if (chkIfAttachmentExist != "False") {
                    tablethead.append('<th><div class="tablesorter-header-inner"><i class="fa fa-paperclip fa-flip-horizontal fa-2x theme_color"></i></div></th>');
                }
            } else {
                tablethead.append('<th class=""><div class="tablesorter-header-inner">' + value + '</div></th>');
            }
        }
    }

    //get rows data and place in table
    function buildRows(data) {
        var chkIfAttachmentExist = '@ViewBag.chkIfAttachment';
        var tableBody = $("#grid_table tbody");

        for (var i = 0; i < data.length; i++) {
            var tdvalue = data[i]
            var GetValue;
            var InsertTTdoArray;
            var InsertArrayToTD = new Array();

            for (var val in tdvalue) {
                var getVal = tdvalue[val]
                var shoeFly = getVal.split(',')[0]
                var clickAttch = getVal.split(',')[1]
                var ifAttach = getVal.split(',')[2]
                if (ifAttach != "") {
                    var rowAttach = '<a onmouseout="HideFlyOut()" ;="" class="theme_color" onmouseover="ShowFlyOut(\'' + shoeFly + '\')" target="_blank" href="/DocumentViewer/Index?documentKey=' + clickAttch + '"><i class="fa fa-paperclip fa-flip-horizontal fa-2x theme_color"></i></a>'
                } else {
                    var rowAttach = '<a onmouseout="HideFlyOut()" ;="" class="theme_color" onmouseover="ShowFlyOut(\'' + shoeFly + '\')" target="_blank" href="/DocumentViewer/Index?documentKey=' + clickAttch + '"><span class="fa-stack theme_color"><i class="fa fa-paperclip fa-flip-horizontal fa-stack-2x"></i><i class="fa fa-plus fa-stack-1x" style="top:16px;left:10px;"></i></span></a>'
                }

                if (val == 0) {
                    if (chkIfAttachmentExist != "False") {
                        GetValue = rowAttach;
                        InsertTTdoArray = "<td>" + GetValue + "</td>"
                        InsertArrayToTD.push(InsertTTdoArray)

                    }
                } else {
                    GetValue = tdvalue[val];
                    InsertTTdoArray = "<td>" + GetValue + "</td>"
                    InsertArrayToTD.push(InsertTTdoArray)
                }
            }
            tableBody.append('<tr> ' + InsertArrayToTD + '</tr>')
        }
        current += data.length;

        $("#spnTotal").html("1" + " to " + current + " of " + total);

    }



    function ShowFlyOut(docdata) {
        $("#flyoutdiv").show();
        var img = document.getElementById('flyoutimage');
        if (img == null) return;
        var imageURL = 'Common/GetImageFlyOut/' + docdata;
        img.src = "Resources/Images/loading.GIF";
        $.ajax({
            url: imageURL,
            global: false,
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
    }

    function HideFlyOut() {
        $("#flyoutdiv").hide();
    }

</script>
