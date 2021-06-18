
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

<div class="content-wrapper" style="margin-left: 0px; margin-top: 50px;">
    <div style="position:relative;">

        <!-- <div class="popup">
        <ul>
            <li>Task List <button onclick="widgetType('tasks')">Add</button></li>
            <li>Bar Chart <button onclick="widgetType('bar-chart')">Add</button></li>
            <li>Pie Chart <button onclick="widgetType('pie-chart')">Add</button></li>
            <li>Data Grid <button onclick="widgetType('data-grid')">Add</button></li>
            <li>System-Chart-1 <button onclick="widgetType('system-bar-chart-1')">Add</button></li>
            <li>System-Chart-2 <button onclick="widgetType('system-bar-chart-2')">Add</button></li>
            <li>System-Chart-3 <button onclick="widgetType('system-bar-chart-3')">Add</button></li>
        </ul>
    </div> -->

        <div class="dashBar" style="display: flex; height: 60px; width: 100%; background-color: #bdbdbd; ">

            <button type="button" class="new-dash" value="new-dash">New Dashboard</button>
            <select class="dashboards">
                <option>Dash 1</option>
                <option>Dash 2</option>
                <option>Dash 3</option>
            </select>
        </div>

        <div class="box">
            <div class="sortable">

                <!--<div id="widget-add" class=".content" style="cursor:pointer" onclick="popupFunc()">-->
                <div id="widget-add" class="widget" style="cursor:pointer;" onclick="myFunc()">

                </div>

                <div id="tasks" class="widget">
                    <div class="navBar">
                        <button style="margin-top:3px; margin-left:400px;" type="button" class="btn btn-warning" value="enlarge">+</button>
                        <button style="margin-top:3px; margin-left:10px;" type="button" class="btn btn-warning" value="reset">...</button>
                        <button style="margin-top:3px; margin-left:10px;" type="button" class="btn btn-danger" value="remove" onclick="remove('tasks')">X</button>
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
                        <button style="margin-top:3px; margin-left:400px;" type="button" class="btn btn-warning" value="enlarge">+</button>
                        <button style="margin-top:3px; margin-left:10px;" type="button" class="btn btn-warning" value="reset">...</button>
                        <button style="margin-top:3px; margin-left:10px;" type="button" class="btn btn-danger" value="remove" onclick="remove('bar-chart')">X</button>
                    </div>
                    <div class="content">
                        <canvas id="myChart" width="100" height="500"></canvas>
                    </div>
                </div>


            </div>

        </div>
    </div>
</div>


    <script >

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

            $(function () {
                //Make list sortable:
                $(".sortable").sortable({}).disableSelection();
            });

        });


//        function popupFunc() {
        //
       // }

        function myFunc(id) {
            $('.sortable').append('<div id="bar-chart" class="widget" > <div class="navBar"> <button style="margin-top:3px; margin-left:400px;" type="button" class="btn btn-warning" value="enlarge">+</button> <button style="margin-top: 3px; margin-left: 10px; padding-top: 3px;" type="button" class="btn btn-warning" value="reset">...</button><button style="margin-top:3px; margin-left:10px;" type="button" class="btn btn-danger" value="remove">X</button></div><div class="content"></div></div>');
        }

//        function myFunc(htmlElement) {
  //          $('.sortable').append(htmlElement);
    //    }

        function remove(id) {
            $("#" + id).remove();
        }

    </script>

