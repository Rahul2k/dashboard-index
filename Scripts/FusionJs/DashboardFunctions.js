
const WIDGETHEADING = {
    TASKS: "TASK LIST",
    DATA: "DATA GRID",
    BAR: "BAR CHART",
    PIE: "PIE CHART",
    CHART_1: "BAR CHART OBJECTS TRACKED BY DAY",
    CHART_2: "BAR CHART USER OPERATIONS BY DAY",
    CHART_3: "BAR CHART TIME SERIES"
}

class DashboardFunc {
    constructor() {
    }

    CreateNavbar(id, widgetType) {

        console.log('Navbar created');

        var navbar = document.createElement('div');
        navbar.setAttribute("class", "panel-heading col-xs-12 no_padding no-margin top_action_header nav-bar");

        var temp = widgetType;

        if (temp == 'tasks') {
            temp = 'TASK LIST';
        }

        else if (temp == 'data') {
            temp = 'DATA GRID';
        }

        else if (temp != 'pie') {

            if (temp == 'bar') {
                temp = 'BAR CHART';
            }

            else if (temp == 'chart-1') {
                temp = 'BAR CHART OBJECTS TRACKED BY DAY';
            }

            else if (temp == 'chart-2') {
                temp = 'BAR CHART USER OPERATIONS BY DAY';
            }

            else if (temp == 'chart-3') {
                temp = 'BAR CHART TIME SERIES';
            }
        }

        else {
            temp = 'PIE CHART';
        }

        navbar.innerHTML = '<div class="col-xs-8 col-sm-8 top_action_header_block no-margin widget-name"><span class="font_awesome theme_color"><i class="fa fa-tasks"></i></span>' + temp + '</div><div class="col-xs-2 col-sm-2 top_action_header_block no_padding no-margin"></div><div class="col-xs-2 col-sm-2 top_action_header_block no_padding no-margin options"><svg xmlns="http://www.w3.org/2000/svg" data-toggle="modal" data-target="#openModal1" onclick="dashboardfunc.Enlarge(' + id + ', \'' + widgetType + '\')" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg><svg xmlns="http://www.w3.org/2000/svg" data-toggle="modal" data-target="#openModal2" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg><svg xmlns="http://www.w3.org/2000/svg" onclick="dashboardfunc.Remove(' + id + ')" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div>';
        return navbar;
    }

    ChartDraw(id, chartType) {

        console.log('Chart created');

        var canvas = document.createElement('canvas');
        canvas.setAttribute("id", "mychart" + id);

        if (chartType != 'pie') {
            chartType = 'bar';
        }

        canvas.setAttribute("height", "300px");
        canvas.setAttribute("width", "500px");
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

        return canvas;
    }

    CreateWidget(widgetType) {

        var id = new Date().getTime().toString();
        var widget = document.createElement('div');

        widget.setAttribute("id", id);
        widget.setAttribute("class", "panel panel-default col-xs-6 no_padding no-margin widget");

        var navbar = this.CreateNavbar(id, widgetType);

        var content = document.createElement('div');

        content.setAttribute("class", "panel-collapse col-xs-12 no_padding top_action_content widget-content");
        content.setAttribute("aria-expanded", "true");

        var container = document.createElement('div');
        container.setAttribute("class", "col-xs-12 col-sm-12");

        if (widgetType == 'tasks') {
            console.log('task created');
            container.innerHTML = '<ul id="tasks-list" class="tastk_list"><li><a href="handler.aspx?tasks=1&amp;viewid=52">There are 1 Folders labels to print.</a></li><li><a href="handler.aspx?tasks=1&amp;viewid=75">There are 2 HR labels to print.</a></li><li><a href="handler.aspx?tasks=1&amp;viewid=110">All HR Employees 1</a></li></ul>';
        }

        else if (widgetType == 'data') {
            console.log('grid created');
            container.innerHTML = '<table id="data-grid" class="table"><thead><tr><th>ID</th><th>Description</th><th>Type</th><th>Date</th><th>Files</th><th>Location</th><th>Signature</th><th>Remarks</th><th>Col1</th><th>Col2</th><th>Col3</th><th>Col4</th><th>Col5</th><th>Col6</th><th>Col7</th><th>Col8</th><th>Col9</th></tr></thead><tr><td>1</td><td>Description 1</td><td>Type 1</td><td>17/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><td>remark 1</td></tr><tr><td>2</td><td>Description 2</td><td>Type 2</td><td>17/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><td>remark 1</td></tr><tr><td>3</td><td>Description 3</td><td>Type 1</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><th>remark 1</td></tr><tr><td>4</td><td>Description 4</td><td>Type 2</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><th>remark 1</td></tr><tr><td>5</td><td>Description 5</td><td>Type 2</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><th>remark 1</td></tr><tr><td>6</td><td>Description 6</td><td>Type 2</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><th>remark 1</td></tr><tr><td>7</td><td>Description 7</td><td>Type 1</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><th>remark 1</td></tr><tr><td>8</td><td>Description 8</td><td>Type 1</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><th>remark 1</td></tr></table>';
        }

        else {
            container.appendChild(this.ChartDraw(id, widgetType));
        }

        content.appendChild(container);
        widget.appendChild(navbar);
        widget.appendChild(content);

        return widget;
    }

    Enlarge_(id, widgetType) {

        var enlarge;

        if (widgetType == 'TASKS') {
            var clone = $(".task-clone").clone();
            enlarge = clone; //'<ul class="tastk_list"><li><a href="handler.aspx?tasks=1&amp;viewid=52">There are 1 Folders labels to print.</a></li><li><a href="handler.aspx?tasks=1&amp;viewid=75">There are 2 HR labels to print.</a></li><li><a href="handler.aspx?tasks=1&amp;viewid=110">All HR Employees 1</a></li></ul>';
        }

        else if (widgetType == 'DATA') {
            var clone = $(".grid-clone").clone();
            enlarge = clone //'<table id="data-grid" class="table" ><tr><th>ID</th><th>Description</th><th>Type</th><th>Date</th></tr><tr><td>1</td><td>Description 1</td><td>Type 1</td><td>17/6/21</td></tr><tr><td>2</td><td>Description 2</td><td>Type 2</td><td>17/6/21</td></tr><tr><td>3</td><td>Description 3</td><td>Type 1</td><td>18/6/21</td></tr><tr><td>4</td><td>Description 4</td><td>Type 2</td><td>18/6/21</td></tr></table>';
        }

        else {
            id = new Date().getTime().toString();
            enlarge = this.ChartDraw(id, widgetType);
        }

        $('#widgetContent').append(enlarge);
    }

    Clean() {

        $("#widgetContent").empty();
    }

    AddWidget(widgetName) {

        var widget = this.CreateWidget(widgetName);
        $('.sortable').append(widget);
    }

    AddWidget_(widgetName) {
        //debugger;
        var UId = new Date().getTime().toString();

        this.GenerateWidget(UId, widgetName);

        if (widgetName == "DATA") {
            $("#Grid_" + UId).removeClass("hidden-e");
        } else if (widgetName == "TASKS") {
            $("#Task_" + UId).removeClass("hidden-e");
        } else {
            $("#CanvasDiv_" + UId).removeClass("hidden-e");
            this.GenerateChart(UId, widgetName);
        }

        this.ReloadEvent(UId);
    }

    GenerateWidget(id, widgetName) {
        var wc = $("#widget-clone").clone();
        var htmlString = wc[0].innerHTML.replace("[ReplaceWidgetName]", WIDGETHEADING[widgetName]).replaceAll("[ReplaceWidgetId]", id).replace("[ReplaceWidgetName]", widgetName);
        $('.sortable').append(htmlString);
    }

    ReloadEvent(UId) {
        $("#" + UId).resizable({
            maxHeight: 250,
            minHeight: 250,
            minWidth: 400,
        });
    }

    GenerateChart(id, chartType) {
        var canvas = document.getElementById("Canvas_" + id);

        if (chartType != 'PIE') {
            chartType = 'BAR';
        }

        var ctx = canvas.getContext('2d');
        var myChart = new Chart(ctx, {
            type: chartType.toLowerCase(),
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
    }

    Remove(id) {

        $("#" + id).remove();
    }

    OpenModalChart(val) {

        $("#openModal").modal("hide");

        setTimeout(() => { $("#modal13").modal("show"); }, 1000);
        $("#lstTypeChart").val(val);

    }

    OpenModalTracked() {
        $("#openModal").modal("hide");
        setTimeout(() => { $("#modalTracked").modal("show"); }, 1000);
    }

    OpenModalOperation() {
        $("#openModal").modal("hide");
        setTimeout(() => { $("#modalOperation").modal("show"); }, 1000);
    }

    OpenModalSeries() {
        $("#openModal").modal("hide");
        setTimeout(() => { $("#modalSeries").modal("show"); }, 1000);
    }
}

//FIRST OBJECT CREATED ON THE FIRST RUN.
const dashboardfunc = new DashboardFunc();