
@Code
    ViewData("Title") = Languages.Translation("tiDocumentViewerTabDocViewer")
    Layout = "~/Views/Shared/_LayoutBasic.vbhtml"
End Code

<link href="~/Content/themes/TAB/css/Dashboard.css" rel="stylesheet" />
<link rel="stylesheet" href="~/Content/themes/TAB/css/images/icon.png" />
<link rel="stylesheet" href="~/Content/themes/TAB/css/images/p1.png" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.3.2/chart.min.js"></script>

<style>
    #modalAddNewDashboard .modal-dialog {
        width: 441px !important;
    }

    #modalAddNewDashboard {
        z-index: 99999;
    }

    #openModal {
        z-index: 99999;
    }

    #openModal1 {
        z-index: 99999;
    }
    .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
        text-align: center;
        padding: 8px;
        line-height: 1.42857143;
        vertical-align: top;
        border-top: 1px solid #ddd;
    }

</style>


<!-- Add Dashboard Name -->
<!-- Add Dashboard Name -->


<div class="modal fade" id="modalAddNewDashboard" tabindex="-1" role="dialog" aria-labelledby="myModalmodalAddNewDashboard">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalmodalAddNewDashboard">Add New Dashboard</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label class="col-sm-4 control-label" for="txtNewDashboardName">Name: </label>
                    <div class="col-sm-8">
                        <input id="txtNewDashboardName" type="text" class="form-control" />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btnSaveName" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>



<div class="modal fade" id="openModal" tabindex="-1" role="dialog" aria-labelledby="myModalmodalAddNewDashboard">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalmodalAddNewDashboard">Choose a Widget</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <div class="text-center">
                        <div class="">

                            <ul class="p-10 text-center" style="font-size:15px; font-weight:bold;">
                                <li><img src="~/Content/themes/TAB/css/images/task.png" width="120px;" style="right:32%; position:relative;">Task List &nbsp&nbsp&nbsp<a href="#" onclick="addWidget('tasks')"><img src="~/Content/themes/TAB/css/images/pl.png" style="left:31%; position:relative;" width="30px;"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" width="120px;" style="right:32%; position:relative;">Bar Chart&nbsp&nbsp<a href="#" onclick="addWidget('bar')"><img src="~/Content/themes/TAB/css/images/pl.png" style="left: 31%; position: relative;" width="30px;"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/pie.png" width="120px;" style="right:32%; position:relative;">Pie Chart&nbsp&nbsp<a href="#" onclick="addWidget('pie')"><img src="~/Content/themes/TAB/css/images/pl.png" style="left: 31%; position: relative;" width="30px;"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/data.png" width="120px;" style="right:32%; position:relative;">Data Grid&nbsp <a href="#" onclick="addWidget('data')"><img src="~/Content/themes/TAB/css/images/pl.png" style="left: 31%; position: relative;" width="30px;"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" width="120px;" style="right:21%; position:relative;">Bar Chart Objects Tracked By Day <a href="#" onclick="addWidget('chart-1')"><img src="~/Content/themes/TAB/css/images/pl.png" style="left:20%; position:relative;" width="30px;"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" width="120px;" style="right:17%; position:relative;">Bar Chart Objects User Operations By Day<a href="#" onclick="addWidget('chart-2')"><img src="~/Content/themes/TAB/css/images/pl.png" style="left:16%; position:relative;" width="30px;"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" width="120px;" style="right:26%; position:relative;">Bar Chart Time Series <a href="#" onclick="addWidget('chart-3')"><img src="~/Content/themes/TAB/css/images/pl.png" style="left:25%; position:relative;" width="30px;"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>


<!-- Enlarged View | Widget-->


<div class="modal fade" id="openModal1" tabindex="-1" role="dialog" aria-labelledby="myModalmodalAddNewDashboard">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="clean()">×</button>
                <h4 class="modal-title" id="myModalmodalAddNewDashboard">Enlarged View</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <div id="chartContent" class="text-center">

                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>



<!-- Dashboard -->

<div class="content-wrapper" style="margin-left: 0px; margin-top: 20px;">
    <div style="position:relative;">

        <!-- Dashboard NavBar-->

        <div class="dashbar">

            <button type="button" class="new-dash" value="new-dash" style="height: 30px; margin: 6px; margin-left: 15px; border-color: #22415C; color: #292929; border-radius: 7px;" data-toggle="modal" data-target="#modalAddNewDashboard">New</button>
            <select class="dashboards">
                <option>Dash 1</option>
                <option>Dash 2</option>
                <option>Dash 3</option>
            </select>
            <a data-toggle="modal" data-target="#openModal"><button id="widget-add" value="widget-add" style="color: #292929;">Add Widget</button></a>

        </div>

        <div class="box m-t1">
            <div class="sortable" style="margin-top:50px;">

                <!-- Dashboard Widgets Here -->

            </div>
        </div>
    </div>
</div>


<script>

    $(document).ready(function () {

        $(function () {
            //Make list sortable:
            $(".sortable").sortable({}).disableSelection();
        });

    });


    function createChart(chartType) {

        var id = new Date().getTime().toString();

        var chartWidget = document.createElement('div');
        chartWidget.setAttribute("id", id);
        chartWidget.setAttribute("class", "widget");

        var navbar = document.createElement('div');
        navbar.setAttribute("class", "navBar");

        // here
        if (chartType != 'pie') {

            var temp = chartType;
            chartType = 'bar';

            if (temp == 'bar') {
                navbar.innerHTML = '<div class="nev-header"><h3>Bar Chart</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="enlarge(' + id + ', \'' + chartType + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div >';
            }

            else if (temp == 'chart-1') {
                navbar.innerHTML = '<div class="nev-header"><h3>Bar Chart Objects Tracked By Day</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="enlarge(' + id + ', \'' + chartType + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div >';
            }

            else if (temp == 'chart-2') {
                navbar.innerHTML = '<div class="nev-header"><h3>Bar Chart User Operations By Day</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="enlarge(' + id + ', \'' + chartType + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div >';
            }

            else if (temp == 'chart-3') {
                navbar.innerHTML = '<div class="nev-header"><h3>Bar Chart Time Series</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="enlarge(' + id + ', \'' + chartType + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div >';
            }
        }

        else {
            navbar.innerHTML = '<div class="nev-header"><h3>Pie Chart</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="enlarge(' + id + ', \'' + chartType + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div >';
        }

        var content = document.createElement('div');
        content.setAttribute("class", "content");

        var canvas = document.createElement('canvas');
        canvas.setAttribute("id", "mychart" + id);
        content.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        var myChart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '#sample 1',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: '0x292929',
                    borderWidth: .5,
                    barPercentage: 1,
                    barThickness: 20,
                    maxBarThickness: 20,
                    minBarLength: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    // barPercentage: 0.1,
                    y: {
                        beginAtZero: true,
                    },
                    x: {
                        grid: {
                            offset: true
                        }
                    }
                }
            }
        });

        chartWidget.appendChild(navbar);
        chartWidget.appendChild(content);

        return chartWidget;

    }


    function createWidget(widgetName) {

        var id = new Date().getTime().toString();

        // here
        if (widgetName == 'tasks') {
            return '<div id=' + id + ' class="widget"><div class="navBar"><div class="nev-header"><h3>Task List</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="enlarge(' + id + ', \'' + widgetName + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div ></div><div class="content"><ul id="task-list"><li>Task1</li><li>Task2</li><li>Task3</li><li>Task4</li><li>Task5</li><li>Task6</li><li>Task7</li></ul></div></div>';
        }

        else if (widgetName == 'data') {
            return '<div id=' + id + ' class="widget"><div class="navBar"><div class="nev-header"><h3>Data Grid</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="enlarge(' + id + ', \'' + widgetName + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div></div><div class="content"><table id="data-grid" class="table"><thead><tr><th>ID</th><th>Description</th><th>Type</th><th>Date</th></tr></thead><tr><td>1</td><td>Description 1</td><td>Type 1</td><td>17/6/21</td></tr><tr><td>2</td><td>Description 2</td><td>Type 2</td><td>17/6/21</td></tr><tr><td>3</td><td>Description 3</td><td>Type 1</td><td>18/6/21</td></tr><tr><td>4</td><td>Description 4</td><td>Type 2</td><td>18/6/21</td></tr></table></div></div>';
        }
    }

    function enlarge(id, widgetType) {

        var enlarge;

        if (widgetType == 'tasks') {
            enlarge = '<ul class="modal-title" style ="padding-left : 1.5%"><li>Task1</li><li>Task2</li><li>Task3</li><li>Task4</li><li>Task5</li><li>Task6</li><li>Task7</li></ul>';
        }

        else if (widgetType == 'data') {
            enlarge = '<table id="data-grid" class="table" ><tr><th>ID</th><th>Description</th><th>Type</th><th>Date</th></tr><tr><td>1</td><td>Description 1</td><td>Type 1</td><td>17/6/21</td></tr><tr><td>2</td><td>Description 2</td><td>Type 2</td><td>17/6/21</td></tr><tr><td>3</td><td>Description 3</td><td>Type 1</td><td>18/6/21</td></tr><tr><td>4</td><td>Description 4</td><td>Type 2</td><td>18/6/21</td></tr></table>';
        }

        else {

            id = new Date().getTime().toString();
            var canvas = document.createElement('canvas');
            canvas.setAttribute("id", "mychart" + id);
            canvas.setAttribute("width", 300);
            canvas.setAttribute("height", 500);

            // data = element(id).data

            var ctx = canvas.getContext('2d');
            var myChart = new Chart(ctx, {
                type: widgetType,
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '#sample 1',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: '0x292929',
                        borderWidth: .5,
                        barPercentage: 1,
                        barThickness: 20,
                        maxBarThickness: 20,
                        minBarLength: 2,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        // barPercentage: 0.1,
                        y: {
                            beginAtZero: true,
                        },
                        x: {
                            grid: {
                                offset: true
                            }
                        }
                    }
                }
            });

            enlarge = canvas;
        }

        $('#chartContent').append(enlarge);
    }

    function clean() {
        $("#chartContent").empty();
    }

    function addWidget(widgetName) {

        var widget;

        if (widgetName == 'tasks' || widgetName == 'data') {
            widget = createWidget(widgetName);
        }
        else {
            widget = createChart(widgetName);
        }

        $('.sortable').append(widget);
    }

    function remove(id) {
        console.log(id);
        $("#" + id).remove();
    }

    $("#btnSaveName").click(() => {
        var Name = $("#txtNewDashboardName").val();
        if (Name == '') {
            return false;
        }
        $("#selectDashboardList").append("<option>" + Name + "</option>")
        $("#modalAddNewDashboard").modal("hide");
        $('#selectDashboardList').trigger("chosen:updated");
        $('#toast-container').fnAlertMessage({ title: '', msgTypeClass: 'toast-success', message: 'Added Successfully' });
        setTimeout(() => { window.location.reload(); }, 500);
    });

</script>

