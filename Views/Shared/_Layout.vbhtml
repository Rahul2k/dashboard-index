<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>@ViewData("Title") - TAB FusionRMS</title>
    <link href="~/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <meta name="viewport" content="width=device-width" />
    @Styles.Render("~/Content/tabfusion")
    @*<link href="@Url.Content("~/Content/themes/tabfusion/jquery-ui-1.10.4.custom/css/tabfusion/jquery-ui-1.10.4.custom.css")" rel="stylesheet" />
    <link href="@Url.Content("~/Content/jquery.jqGrid/ui.jqgrid.css")" rel="stylesheet" />
    <link href="@Url.Content("~/Content/Bootstrap/css/bootstrap.css")" rel="stylesheet" />
    <link href="@Url.Content("~/Content/font-awesome/css/font-awesome.css")" rel="stylesheet" />*@

    @Scripts.Render("~/bundles/jquery")
    @Scripts.Render("~/bundles/jqGridView")
    @Scripts.Render("~/bundles/modernizr")
    <script src="@Url.Content("~/Scripts/jquery.jqGrid.min.js")"></script>
    <script src="@Url.Content("~/Scripts/common.jqgrid.js")"></script>
    
    <script>
    var dateformatmaster = "mm/dd/yyyy";
    var dateformatWithfullMonth = "dd-M-yyyy";
    var urls = {
        Common: {
            GetGridViewSettings: '@Url.Action("GetGridViewSettings", "Common")',
            GetGridViewSettings1: '@Url.Action("GetGridViewSettings1", "Common")',
            ArrangeGridOrder: '@Url.Action("ArrangeGridOrder", "Common")',
            GetGridSelectedRowsIds: '@Url.Action("GetGridSelectedRowsIds", "Common")',
            SetGridOrders: '@Url.Action("SetGridOrders", "Common")',
        },
        Users: {
            GetUsersList: '@Url.Action("GetUsersList", "User")',
            SetUserDetails: '@Url.Action("SetUserDetails", "User")',
            EditUsers: '@Url.Action("EditUsers", "User")',
        },
        Data: {
            GetDataList: '@Url.Action("GetDataList", "Data")',
            BindAccordian: '@Url.Action("BindAccordian", "Data")',
        }
    }
    </script>
</head>
<body>
    <!--navbar  start-->
    @*<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">*@
        <div class="container">
            <div class="navbar-header">
                @*<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                
                <a href="@Url.Action("Index","Home")">
                    <img src="@Url.Content("~/Images/logo.png")" alt="Tab FusionRMS" class="img img-responsive" />
                </a>*@
                <div id="divHeader" style="position: absolute; left: 0px; right: 0px; top: 20px; height: 128px;">
                    <table cellpadding="0" cellspacing="0" style="height: 128px; background-color: White; width: 100%; min-width: 1000px;">
                        <tr>
                            <td style="background-image: url(Images/WA-Header-Left.png); background-repeat: no-repeat; width: 384px;"></td>
                            <td style="background-image: url(Images/WA-Header-Repeat.png); background-repeat: repeat-x; width: auto;"></td>
                            <td align="left" style="background-image: url(Images/WA-Header-Right.png); background-repeat: no-repeat; width: 766px; vertical-align: top; padding-right: 0px; padding-top: 4px;"></td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            @*<div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav navbar-right" style="margin-top: 1%; text-align:center;">
                    <li>
                        @Html.ActionLink("Home", "Index", "Home")
                    </li>
                    <li>
                        @Html.ActionLink("User List", "Index", "User")
                    </li>
                </ul>
            </div>*@
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    @*</nav>*@
    <!--end nav-->
    <!-- end order now-->
    <!-- start body is rendered-->
    @RenderSection("featured", required:=False)
    @RenderBody()
    <!-- /#page-wrapper -->
    <!--  end body is rendered -->
    
    <!--- start footer --->
    <div class="container">
        <footer>

            <div id="divFooter" style="color: #eeeeee; height:44px;  font-size: 8pt; position: absolute; bottom: 0px; right: 0px; left: 0px; min-width: 1000px; background-image: url(images/signinbar.png); background-repeat: repeat-x; z-index:-1; ">
                <div class="row">
                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <p style="font-size:12px;padding-top:10px;">@String.Format("{0} &copy; TAB FusionRMS {1}", Languages.Translation("lblLayoutCopyright"), DateTime.Now.Year)</p>
                    </div>
                </div>
            </div>
        </footer>

    </div>
    <!-- /.container -->
    <!--End Footer -->

    @RenderSection("scripts", required:=False)
</body>
</html>
