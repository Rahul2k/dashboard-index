
@Code
    ViewData("Title") = Languages.Translation("tiDocumentViewerTabDocViewer")
    Layout = "~/Views/Shared/_LayoutDashboard.vbhtml"
End Code

@Styles.Render("~/Styles/DashboardIndexCss")
@*<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />*@


<style>
    .hidden-e {
        display: none;
    }
    /*.widget-content{
        height:initial;
    }*/
    .row {
        margin: initial !important;
    }
</style>

<!-- Add Dashboard Modal -->
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

<!--Delete Dashboard Modal-->
<div class="modal faden" id="modalDeleteDashboard" tabindex="-1" role="dialog" aria-labelledby="myModalDeleteDashboard">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalDeleteDashboard">Add New Dashboard</h4>
            </div>
            <div class="modal-body">
                <p class="p-delete-msg">Are you sure you want to delete the selected dashboard?</p>
            </div>
            <div class="modal-footer">
                <button id="btnDeleteDashboard" type="button" class="btn btn-primary">@Languages.Translation("Yes")</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("No")</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<div class="modal fade" id="openModal" tabindex="-1" role="dialog" aria-labelledby="myopenModal">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Choose a Widget</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <div class="text-center">
                        <div class="">
                            @*<ul class="p-10 text-center wibold">
                                    <li><img src="~/Content/themes/TAB/css/images/task.png" class="img1">Task List &nbsp&nbsp&nbsp<a href="#" onclick="dashboardfunc.AddWidget('tasks')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                    <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img1">Bar Chart&nbsp&nbsp<a href="#" onclick="dashboardfunc.AddWidget('bar')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                    <li><img src="~/Content/themes/TAB/css/images/pie.png" class="img1">Pie Chart&nbsp&nbsp<a href="#" onclick="dashboardfunc.AddWidget('pie')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                    <li><img src="~/Content/themes/TAB/css/images/data.png" class="img1">Data Grid&nbsp <a href="#" onclick="dashboardfunc.AddWidget('data')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                    <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img2">Bar Chart Objects Tracked By Day <a href="#" onclick="dashboardfunc.AddWidget('chart-1')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img22"></a></li>
                                    <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img3">Bar Chart Objects User Operations By Day<a href="#" onclick="dashboardfunc.AddWidget('chart-2')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img33"></a></li>
                                    <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img4">Bar Chart Time Series <a href="#" onclick="dashboardfunc.AddWidget('chart-3')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img44"></a></li>
                                </ul>*@

                            <ul class="p-10 text-center wibold">
                                <li><img src="~/Content/themes/TAB/css/images/task.png" class="img1">Task List &nbsp&nbsp&nbsp<a href="#" onclick="dashboardfunc.AddWidget_('TASKS')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img1">Bar Chart&nbsp&nbsp<a href="#" onclick="dashboardfunc.AddWidget_('BAR')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/pie.png" class="img1">Pie Chart&nbsp&nbsp<a href="#" onclick="dashboardfunc.AddWidget_('PIE')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/data.png" class="img1">Data Grid&nbsp <a href="#" onclick="dashboardfunc.AddWidget_('DATA')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img2">Bar Chart Objects Tracked By Day <a href="#" onclick="dashboardfunc.AddWidget_('CHART_1')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img22"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img3">Bar Chart Objects User Operations By Day<a href="#" onclick="dashboardfunc.AddWidget_('CHART_2')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img33"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img4">Bar Chart Time Series <a href="#" onclick="dashboardfunc.AddWidget_('CHART_3')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img44"></a></li>
                            </ul>

                            @*<ul class="p-10 text-center wibold">
                                    <li><img src="~/Content/themes/TAB/css/images/task.png" class="img1">Task List &nbsp&nbsp&nbsp<a href="#" onclick="dashboardfunc.AddWidget('tasks')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                    <li onclick="dashboardfunc.OpenModalChart('Bar Chart')"><img src="~/Content/themes/TAB/css/images/bar.png" class="img1">Bar Chart&nbsp&nbsp<a href="#"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                    <li onclick="dashboardfunc.OpenModalChart('Pie Chart')"><img src="~/Content/themes/TAB/css/images/pie.png" class="img1">Pie Chart&nbsp&nbsp<a href="#"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                    <li onclick="dashboardfunc.OpenModalChart('Grid View')"><img src="~/Content/themes/TAB/css/images/data.png" class="img1">Data Grid&nbsp <a href="#"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                    <li onclick="dashboardfunc.OpenModalTracked()"><img src="~/Content/themes/TAB/css/images/bar.png" class="img2">Bar Chart Objects Tracked By Day <a href="#"><img src="~/Content/themes/TAB/css/images/pl.png" class="img22"></a></li>
                                    <li onclick="dashboardfunc.OpenModalOperation()"><img src="~/Content/themes/TAB/css/images/bar.png" class="img3">Bar Chart Objects User Operations By Day<a><img src="~/Content/themes/TAB/css/images/pl.png" class="img33"></a></li>
                                    <li onclick="dashboardfunc.OpenModalSeries()"><img src="~/Content/themes/TAB/css/images/bar.png" class="img4">Bar Chart Time Series <a><img src="~/Content/themes/TAB/css/images/pl.png" class="img44"></a></li>
                                </ul>*@

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
<div class="modal fade" id="openModal1" tabindex="-1" role="dialog" aria-labelledby="myopenModal1">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="dashboardfunc.Clean()">×</button>
                <h4 class="modal-title">Enlarged View</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <div id="widgetContent" class="text-center">

                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!--Pie and Bar Chart, View Grid Modal-->
<div class="modal faden" id="modal13" tabindex="-1" role="dialog" aria-labelledby="myModal13">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Add Chart</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select Type</label>
                            <div class="col-sm-8">
                                <select id="lstTypeChart" name="lstTypeChart" class="form-control">
                                    <option value="Pie Chart">Pie Chart</option>
                                    <option value="Grid View">Grid View</option>
                                    <option value="Bar Chart">Bar Chart</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select Parent View</label>
                            <div class="col-sm-8">
                                <select id="lstView" name="lstView" class="form-control">
                                    <option value="0" selected></option>
                                    <option value="2">View 1</option>
                                    <option value="3">View 1</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select Column</label>
                            <div class="col-sm-8">
                                <select id="lstView" name="lstView" class="form-control">
                                    <option value="0" selected></option>
                                    <option value="2">Column One</option>
                                    <option value="3">Column Two</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btnAddChart" type="button" class="btn btn-primary">Add</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">Close</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!--Bar Chart Tracked objects by Day-->
<div class="modal faden" id="modalTracked" tabindex="-1" role="dialog" aria-labelledby="myModalTracked">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Add Bar Chart Tracked objects by Day</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select Object/Table</label>
                            <div class="col-sm-8">
                                <select id="lstTypeChart" name="lstTypeChart" class="form-control">
                                    <option value="Pie Chart">Table 1</option>
                                    <option value="Grid View">Table 2</option>
                                    <option value="Bar Chart">Table 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select Period</label>
                            <div class="col-sm-8">
                                <select id="lstView" name="lstView" class="form-control">
                                    <option value="0" selected></option>
                                    <option value="2">Last Week</option>
                                    <option value="3">Last Month</option>
                                    <option value="3">Last Quarter</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button id="btnAddTrackedObjectsChart" type="button" class="btn btn-primary">Add</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">Close</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!--Bar Chart User Operation by Day-->
<div class="modal faden" id="modalOperation" tabindex="-1" role="dialog" aria-labelledby="myModalOperation">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Add Bar Chart User Operation by Day</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select Object/Table</label>
                            <div class="col-sm-8">
                                <select id="lstTypeChart" name="lstTypeChart" class="form-control">
                                    <option value="Pie Chart">Table 1</option>
                                    <option value="Grid View">Table 2</option>
                                    <option value="Bar Chart">Table 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select User(s) </label>
                            <div class="col-sm-8">
                                <select id="lstUsers" name="lstUsers" class="form-control">
                                    <option value="Pie Chart">User 1</option>
                                    <option value="Grid View">User 2</option>
                                    <option value="Bar Chart">User 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select Audit Type </label>
                            <div class="col-sm-8">
                                <select id="lstAuditType" name="lstAuditType" class="form-control">
                                    <option value="Pie Chart">Type 1</option>
                                    <option value="Grid View">Type 2</option>
                                    <option value="Bar Chart">Type 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select Period</label>
                            <div class="col-sm-8">
                                <select id="lstView" name="lstView" class="form-control">
                                    <option value="0" selected></option>
                                    <option value="2">Last Week</option>
                                    <option value="3">Last Month</option>
                                    <option value="3">Last Quarter</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button id="btnAddUserOperationChart" type="button" class="btn btn-primary">Add</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">Close</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!--Bar Chart Time Series-->
<div class="modal faden" id="modalSeries" tabindex="-1" role="dialog" aria-labelledby="myModalSeries">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Add Bar Chart Time Series</h4>
            </div>
            <div class="modal-body">

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select Parent View</label>
                            <div class="col-sm-8">
                                <select id="lstView" name="lstView" class="form-control">
                                    <option value="0" selected></option>
                                    <option value="2">View 1</option>
                                    <option value="3">View 1</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select Column</label>
                            <div class="col-sm-8">
                                <select id="lstView" name="lstView" class="form-control">
                                    <option value="0" selected></option>
                                    <option value="2">Column One</option>
                                    <option value="3">Column Two</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 control-label" for="lstView">Select Period</label>
                            <div class="col-sm-8">
                                <select id="lstPeriod" name="lstPeriod" class="form-control">
                                    <option value="0" selected></option>
                                    <option value="2">Last Week</option>
                                    <option value="3">Last Month</option>
                                    <option value="3">Last Quarter</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button id="btnSeries" type="button" class="btn btn-primary">Add</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">Close</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<!-- Dashboard -->
<div class="content-wrapper">
    <div>

        <!-- Dashboard NavBar-->

        <div class="dashbar">

            <button id="new-dash" class="btn btn-secondary tab_btn" data-toggle="modal" data-target="#modalAddNewDashboard">New</button>
            <button id="new-widget" class="btn btn-secondary tab_btn" data-toggle="modal" data-target="#openModal">Add Widget</button>

        </div>

        <div class="box m-t1">
            <div id="sortable" class="sortable">

                <!--Dashboard Widgets Here -->
                <!--This Widget are using for clone for widget-->
                <div id="widget-clone" class="hidden-e">
                    <div id="[ReplaceWidgetId]" class="panel panel-default col-lg-6 col-sm-12 col-md-12 no_padding no-margin widget clone">
                        <div class="row">
                            <div class="panel-heading col-xs-12 no_padding no-margin top_action_header nav-bar">
                                <div class="col-xs-8 col-sm-8 top_action_header_block no-margin widget-name">
                                    <span class="font_awesome theme_color"><i class="fa fa-tasks"></i></span>
                                    [ReplaceWidgetName]
                                </div>
                                <div class="col-xs-2 col-sm-2 top_action_header_block no_padding no-margin options">
                                    <svg xmlns="http://www.w3.org/2000/svg" data-toggle="modal" data-target="#openModal1" onclick="dashboardfunc.Enlarge_([ReplaceWidgetId],'[ReplaceWidgetName]')" width="24%" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" data-toggle="modal" data-target="#openModal2" width="30%" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" onclick="dashboardfunc.Remove([ReplaceWidgetId])" width="32%" height="30" fill="currentColor" class="icons" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg>
                                </div>
                            </div>
                            <div class="panel-collapse col-xs-12 no_padding top_action_content widget-content" aria-expanded="true">
                                <div class="col-xs-12 col-sm-12 hidden-e task-clone" id="Task_[ReplaceWidgetId]" style="width:100%;height:209px;overflow:hidden">
                                    <ul id="tasks-list" class="tastk_list">
                                        <li><a href="handler.aspx?tasks=1&amp;viewid=52">There are 1 Folders labels to print.</a></li>
                                        <li><a href="handler.aspx?tasks=1&amp;viewid=75">There are 2 HR labels to print.</a></li>
                                        <li><a href="handler.aspx?tasks=1&amp;viewid=110">All HR Employees 1</a></li>
                                    </ul>
                                </div>
                                <div class="col-xs-12 col-sm-12 hidden-e grid-clone" id="Grid_[ReplaceWidgetId]" style="width:100%;height:209px;overflow:auto">
                                    <table id="data-grid" class="table"><thead><tr><th>ID</th><th>Description</th><th>Type</th><th>Date</th><th>Files</th><th>Location</th><th>Signature</th><th>Remarks</th><th>Col1</th><th>Col2</th><th>Col3</th><th>Col4</th><th>Col5</th><th>Col6</th><th>Col7</th><th>Col8</th><th>Col9</th></tr></thead><tr><td>1</td><td>Description 1</td><td>Type 1</td><td>17/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><td>remark 1</td><td>data 1</td><td>data 2</td><td>data 3</td><td>data 4</td><td>data 5</td><td>data 6</td><td>data 7</td><td>data 8</td><td>data 9</td></tr><tr><td>2</td><td>Description 2</td><td>Type 2</td><td>17/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><td>remark 1</td><td>data 1</td><td>data 2</td><td>data 3</td><td>data 4</td><td>data 5</td><td>data 6</td><td>data 7</td><td>data 8</td><td>data 9</td></tr><tr><td>3</td><td>Description 3</td><td>Type 1</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><td>remark 1</td><td>data 1</td><td>data 2</td><td>data 3</td><td>data 4</td><td>data 5</td><td>data 6</td><td>data 7</td><td>data 8</td><td>data 9</td></tr><tr><td>4</td><td>Description 4</td><td>Type 2</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><td>remark 1</td><td>data 1</td><td>data 2</td><td>data 3</td><td>data 4</td><td>data 5</td><td>data 6</td><td>data 7</td><td>data 8</td><td>data 9</td></tr><tr><td>5</td><td>Description 5</td><td>Type 2</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><td>remark 1</td><td>data 1</td><td>data 2</td><td>data 3</td><td>data 4</td><td>data 5</td><td>data 6</td><td>data 7</td><td>data 8</td><td>data 9</td></tr><tr><td>6</td><td>Description 6</td><td>Type 2</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><td>remark 1</td><td>data 1</td><td>data 2</td><td>data 3</td><td>data 4</td><td>data 5</td><td>data 6</td><td>data 7</td><td>data 8</td><td>data 9</td></tr><tr><td>7</td><td>Description 7</td><td>Type 1</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><td>remark 1</td><td>data 1</td><td>data 2</td><td>data 3</td><td>data 4</td><td>data 5</td><td>data 6</td><td>data 7</td><td>data 8</td><td>data 9</td></tr><tr><td>8</td><td>Description 8</td><td>Type 1</td><td>18/6/21</td><td>file1</td><td>loc x</td><td>sign.</td><td>remark 1</td><td>data 1</td><td>data 2</td><td>data 3</td><td>data 4</td><td>data 5</td><td>data 6</td><td>data 7</td><td>data 8</td><td>data 9</td></tr></table>
                                </div>
                                <div class="col-xs-12 col-sm-12 hidden-e" id="CanvasDiv_[ReplaceWidgetId]" style="width:100%;height:209px;overflow:hidden">
                                    <canvas id="Canvas_[ReplaceWidgetId]"></canvas>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
</div>

@Scripts.Render("~/bundles/DashboardJS")