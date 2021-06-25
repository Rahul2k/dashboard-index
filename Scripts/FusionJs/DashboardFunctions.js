
class DashboardFunc {
    constructor() {
    }

    CreateChart(chartType) {

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
            navbar.innerHTML = '<div class="nev-header"><h3>Bar Chart</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="dashboardfunc.Enlarge(' + id + ', \'' + chartType + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="dashboardfunc.Remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div >';
        }

        else if (temp == 'chart-1') {
            navbar.innerHTML = '<div class="nev-header"><h3>Bar Chart Objects Tracked By Day</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="dashboardfunc.Enlarge(' + id + ', \'' + chartType + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="dashboardfunc.Remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div >';
        }

        else if (temp == 'chart-2') {
            navbar.innerHTML = '<div class="nev-header"><h3>Bar Chart User Operations By Day</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="dashboardfunc.Enlarge(' + id + ', \'' + chartType + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="dashboardfunc.Remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div >';
        }

        else if (temp == 'chart-3') {
            navbar.innerHTML = '<div class="nev-header"><h3>Bar Chart Time Series</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="dashboardfunc.Enlarge(' + id + ', \'' + chartType + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="dashboardfunc.Remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div >';
        }
    }

    else {
        navbar.innerHTML = '<div class="nev-header"><h3>Pie Chart</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="dashboardfunc.Enlarge(' + id + ', \'' + chartType + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="dashboardfunc.Remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div >';
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

    CreateWidget(widgetName) {

    var id = new Date().getTime().toString();

    // here
    if (widgetName == 'tasks') {
        return '<div id=' + id + ' class="widget"><div class="navBar"><div class="nev-header"><h3>Task List</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="enlarge(' + id + ', \'' + widgetName + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div ></div><div class="content"><ul id="task-list"><li>Task1</li><li>Task2</li><li>Task3</li><li>Task4</li><li>Task5</li><li>Task6</li><li>Task7</li></ul></div></div>';
    }

    else if (widgetName == 'data') {
        return '<div id=' + id + ' class="widget"><div class="navBar"><div class="nev-header"><h3>Data Grid</h3></div><div class="all-icons"><a data-toggle="modal" data-target="#openModal1" onclick="enlarge(' + id + ', \'' + widgetName + '\')"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg></a><a href="#openModel"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg></a><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16" onclick="remove(' + id + ')"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></div></div><div class="content"><table id="data-grid" class="table"><thead><tr><th>ID</th><th>Description</th><th>Type</th><th>Date</th></tr></thead><tr><td>1</td><td>Description 1</td><td>Type 1</td><td>17/6/21</td></tr><tr><td>2</td><td>Description 2</td><td>Type 2</td><td>17/6/21</td></tr><tr><td>3</td><td>Description 3</td><td>Type 1</td><td>18/6/21</td></tr><tr><td>4</td><td>Description 4</td><td>Type 2</td><td>18/6/21</td></tr></table></div></div>';
    }
}

    Enlarge(id, widgetType) {

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

    Clean() {
        $("#chartContent").empty();
    }

    AddWidget(widgetName) {

    var widget;

    if (widgetName == 'tasks' || widgetName == 'data') {
        widget = this.CreateWidget(widgetName);
    }
    else {
        widget = this.CreateChart(widgetName);
    }

     $('.sortable').append(widget);

    }

    Remove(id) {
        $("#" + id).remove();
    }
}

//FIRST OBJECT CREATED ON THE FIRST RUN.
const dashboardfunc = new DashboardFunc();