
@Code
    ViewData("Title") = Languages.Translation("tiDocumentViewerTabDocViewer")
    Layout = "~/Views/Shared/_LayoutBasic.vbhtml"
End Code

<link href="~/Content/themes/TAB/css/Dashboard.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.3.2/chart.min.js"></script>
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>

<!--
<script src="~/Content/themes/TAB/js/jquery-3.4.1.min.js"></script>
<script src="~/Content/themes/TAB/js/jquery-uimin.js"></script>
-->

<meta name="viewport" content="width=device-width" />
<title>Dashboard</title>
<br />
<br />

<!-- Enlarged View | Widget-->
<div id="openModal1" class="modalDialog1">
    <div class="text-cenetr">
        <a href="#close" title="Close" class="close">X</a>

        <div class="content">
            <ul id="">
                <li>Task1</li>
                <li>Task2</li>
                <li>Task3</li>
                <li>Task4</li>
            </ul>
        </div>

    </div>
</div>


<!-- Pop-Up Box | Widget-->

<div id="openModal" class="modalDialog">
    <div class="text-cenetr">
        <a href="#close" title="Close" class="close">X</a>
        <div class="">
            <h4 class="text-center m-t1 ">Choose a Widget</h4>
            <ul class="p-10 text-center m-t1">
                <li>
                    <img src="img/icon.png" width="50px;" style="margin-right: 27px;">Task List &nbsp&nbsp&nbsp
                    <button class="ml pdb" onclick="addWidget('tasks')">Add</button>
                </li>
                <li>
                    <img src="img/icon.png" width="50px;" style="margin-right: 27px;">Bar Chart&nbsp&nbsp<button class="ml pdb" onclick="addWidget('bar-chart')">
                        Add
                    </button>
                </li>
                <li>
                    <img src="img/icon.png" width="50px;" style="margin-right: 27px;">Pie Chart&nbsp&nbsp <button class="ml pdb" onclick="addWidget('pie-chart')">
                        Add
                    </button>
                </li>
                <li>
                    <img src="img/icon.png" width="50px;" style="margin-right: 27px;">Data Grid&nbsp <button class="ml pdb" onclick="addWidget('data-grid')">
                        Add
                    </button>
                </li>
                <li>
                    <img src="img/icon.png" width="50px;" style="margin-right: 27px;">System-Chart-1 <button class=" pdb" onclick="addWidget('system-chart-1')">
                        Add
                    </button>
                </li>
                <li>
                    <img src="img/icon.png" width="50px;" style="margin-right: 27px;">System-Chart-2 <button class=" pdb" onclick="addWidget('system-chart-2')">
                        Add
                    </button>
                </li>
                <li>
                    <img src="img/icon.png" width="50px;" style="margin-right: 27px;">System-Chart-3 <button class=" pdb" onclick="addWidget('system-chart-3')">
                        Add
                    </button>
                </li>

            </ul>

        </div>
    </div>
</div>


<!-- Dashboard -->

<div class="content-wrapper" style="margin-left: 0px; margin-top: 50px;">
    <div style="position:relative;">

        <!-- Dashboard NavBar-->

        <div class="dashbar">

            <button type="button" class="new-dash" value="new-dash">New Dashboard</button>
            <select class="dashboards">
                <option>Dash 1</option>
                <option>Dash 2</option>
                <option>Dash 3</option>
            </select>
            <a href="#openModal"><button id="widget-add" value="widget-add">Add Widget</button></a>

        </div>

        <div class="box m-t1">
            <div class="sortable">

                <!-- Dashboard Widgets -->

                <div id="tasks" class="widget">
                    <div class="navBar">
                        <div class="nev-header"><h3>Task List</h3></div>
                        <div class="all-icons">

                            <a href="#openModal1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                                </svg>
                            </a>

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove('pie-chart')">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>

                    <div class="content">
                        <ul id="task-list">
                            <li>Task1</li>
                            <li>Task2</li>
                            <li>Task3</li>
                            <li>Task4</li>
                            <li>Task5</li>
                            <li>Task6</li>
                            <li>Task7</li>
                        </ul>
                    </div>
                </div>

                <div id="bar-chart" class="widget">
                    <div class="navBar">
                        <div class="nev-header"><h3>Bar Chart</h3></div>
                        <div class="all-icons">
                            <a href="#openModal1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                                </svg>
                            </a>

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove('pie-chart')">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>

                    <div class="content">
                        <canvas id="myChart" width="100" height="500"></canvas>
                    </div>
                </div>

                <div id="pie-chart" class="widget">
                    <div class="navBar">
                        <div class="nev-header"><h3>Pie Chart</h3></div>
                        <div class="all-icons">
                            <a href="#openModal1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                                </svg>
                            </a>

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove('pie-chart')">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>

                    <div class="content">
                        <canvas id="myChart2" width="100" height="500"></canvas>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>


<script>

    var widgetCount = 2;
    var id = 0;

    $(document).ready(function () {

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
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

        var ctx = document.getElementById('myChart2').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
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
            }
        });

        $(function () {
            //Make list sortable:
            $(".sortable").sortable({}).disableSelection();
        });

    });

    function widgetType(widgetName) {

        //  '<div class="navBar"><div class="nev-header"><h3>Pie Chart</h3></div><div class="all-icons"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove('pie-chart')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div></div>

        if (widgetName == 'bar-chart') {
            id++;
            return '<div id="bar-chart" class="widget"><div class="navBar"><div class="nev-header"><h3>Bar Chart</h3></div><div class="all-icons"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(\'bar-chart\')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div></div><div class="content"><canvas id="myChart"+id width="100" height="500"></canvas></div></div>';
        }

        else if (widgetName == 'tasks') {
            return '<div id="tasks" class="widget"><div class="navBar"><div class="nev-header"><h3>Task List</h3></div><div class="all-icons"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(\'tasks\')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div></div><div class="content"><ul id="task-list"><li>Task1</li><li>Task2</li><li>Task3</li><li>Task4</li><li>Task5</li><li>Task6</li><li>Task7</li></ul></div></div></div>';
        }

        else if (widgetName == 'pie-chart') {
            return '<div id = "pie-chart" class="widget"><div class="navBar"><div class="nev-header"><h3>Pie Chart</h3></div><div class="all-icons"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(\'pie-chart\')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div></div><div class="content"></div></div></div>';
        }

        else if (widgetName == 'system-chart-1') {
            return '<div id = "system-chart-1" class= "widget" ><div class="navBar"><div class="nev-header"><h3>System Chart 1</h3></div><div class="all-icons"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(\'system-chart-1\')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div></div><div class="content"></div></div>';
        }

        else if (widgetName == 'system-chart-2') {
            return '<div id = "system-chart-2" class= "widget" ><div class="navBar"><div class="nev-header"><h3>System Chart 2</h3></div><div class="all-icons"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(\'system-chart-2\')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div></div><div class="content"></div></div>';
        }

        else if (widgetName == 'system-chart-3') {
            return '<div id = "system-chart-3" class= "widget" ><div class="navBar"><div class="nev-header"><h3>System Chart 3</h3></div><div class="all-icons"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(\'system-chart-3\')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div></div><div class="content"></div></div>';
        }

        else if (widgetName == 'data-grid') {
            return '<div id = "data-grid" class= "widget" ><div class="navBar"><div class="nev-header"><h3>Data Grid</h3></div><div class="all-icons"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /> </svg><svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(\'data-grid\')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div></div><div class="content"></div></div>';
        }
    }

    function addWidget(widgetName) {

        var widget = widgetType(widgetName);
        $('.sortable').append(widget);
    }

    function remove(id) {
        console.log(id);
        widgetCount -= 1;
        $("#" + id).remove();
    }

</script>

