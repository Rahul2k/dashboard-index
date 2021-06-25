
@Code
    ViewData("Title") = Languages.Translation("tiDocumentViewerTabDocViewer")
    Layout = "~/Views/Shared/_LayoutDashboard.vbhtml"
End Code

@Styles.Render("~/Styles/DashboardIndexCss")
@*<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />*@


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
                            <ul class="p-10 text-center wibold">
                                <li><img src="~/Content/themes/TAB/css/images/task.png" class="img1">Task List &nbsp&nbsp&nbsp<a href="#" onclick="dashboardfunc.AddWidget('tasks')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img1">Bar Chart&nbsp&nbsp<a href="#" onclick="dashboardfunc.AddWidget('bar')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/pie.png" class="img1">Pie Chart&nbsp&nbsp<a href="#" onclick="dashboardfunc.AddWidget('pie')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/data.png" class="img1">Data Grid&nbsp <a href="#" onclick="dashboardfunc.AddWidget('data')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img11"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img2">Bar Chart Objects Tracked By Day <a href="#" onclick="dashboardfunc.AddWidget('chart-1')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img22"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img3">Bar Chart Objects User Operations By Day<a href="#" onclick="dashboardfunc.AddWidget('chart-2')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img33"></a></li>
                                <li><img src="~/Content/themes/TAB/css/images/bar.png" class="img4">Bar Chart Time Series <a href="#" onclick="dashboardfunc.AddWidget('chart-3')"><img src="~/Content/themes/TAB/css/images/pl.png" class="img44"></a></li>
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
<div class="modal fade" id="openModal1" tabindex="-1" role="dialog" aria-labelledby="myopenModal1">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="dashboardfunc.Clean()">×</button>
                <h4 class="modal-title">Enlarged View</h4>
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
<div class="content-wrapper">
    <div style="position:relative;">

        <!-- Dashboard NavBar-->

        <div class="dashbar">

            <button class="new-dash" data-toggle="modal" data-target="#modalAddNewDashboard">New</button>
            <select class="dashboards">
                <option>Dash 1</option>
                <option>Dash 2</option>
                <option>Dash 3</option>
            </select>
            <a data-toggle="modal" data-target="#openModal"><button id="widget-add">Add Widget</button></a>

        </div>

        <div class="box m-t1">
            <div class="sortable">

                <!-- Dashboard Widgets Here -->

            </div>
        </div>
    </div>
</div>

@Scripts.Render("~/bundles/DashboardJS")