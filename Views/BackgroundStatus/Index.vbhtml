@Code
    ViewData("Title") = "Background Status"
    'ViewData("Title") = Languages.Translation("tiScannerScanner")
    Layout = "~/Views/Shared/_LayoutNoMenu.vbhtml"
End Code

<head>
    @*<meta charset="utf-8">    
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <link href="~/content/themes/tab/css/evol.colorpicker.css" rel="stylesheet" type="text/css">
    <style>
        #resizable {
            background: #fff;
        }
    </style>*@
</head>
<script type="text/javascript">
    window.onfocus = function () {
        if (getCookie("Islogin") == "False") {
            window.location.href = window.location.origin + "/signin.aspx?out=1"
        }
    };    
</script>
<h1 class="main_title">
    @*<span id="title"> @Languages.Translation("tiIndexLabelManager")</span>*@
    <span id="title"> @Languages.Translation("lblMSGExportBackgroundStatus")</span>
</h1>
<div class="row">
    <div class="col-sm-12">
        <section class="content form-horizontal">
            <div id="parent">
                <div class="row top_space">
                    <div class="col-sm-12 col-md-12 table-responsive jqgrid-cus">
                        <div id="divDriveGrid">
                            <table id="grdDrive"></table>
                            <div id="grdDrive_pager"></div>
                        </div>
                        <div id="divVolumesGrid">
                            <table id="grdVolumes"></table>
                            <div id="grdVolumes_pager"></div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" id="SystemAddressesId1" value="0" />         
        </section>                
        <script src="@Url.Content("~/Scripts/AppJs/BackgroundStatus.js")"></script>
    </div>
</div>