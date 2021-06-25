
@Code
    Layout = Nothing
End Code

<!DOCTYPE html>

<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <link href="~/Content/themes/TAB/css/bootstrap.min.css" rel="stylesheet">
    <link href="~/Content/themes/TAB/css/Fusion10.css" rel="stylesheet" />
    <link href="~/Content/themes/TAB/css/custom.css" rel="stylesheet" />
    <title>TabQuik</title>
</head>
<body>
    <div class="wrapper">
        <header class="main-header" style="z-index:999;">
            <nav class="navbar navbar-default navbar-fixed-top tab-nave" role="navigation">
                <div class="container-fluid">
                    <a id="aLogo" class="logo navbar-brand" href="/Data.aspx"><img src="/Images/logo.png" class="img-responsive"></a>
                    <div class="navbar-custom-menu pull-left" id="importSetup"></div>
                    <div class="navbar-custom-menu pull-left scanmenu"></div>
                    <span style="visibility:hidden" id="lblLoginUserName">administrator</span>

                    <div class="collapse navbar-collapse navbar-right tab-menu" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li>
                                <a id="hlHome" href="/Data">Home</a>
                            </li>
                            <li>
                                <a id="hlHelp" href="/help/Default.htm" target="Help">Help</a>
                            </li>
                            <li>
                                <a id="hlAboutUs">About</a>
                            </li>
                            <li>
                                <a id="hlSignout" href="/logout.aspx">Sign Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </div>
    <div style="text-align: center; position: absolute; top: 65px; background-color: #A9A9A9; right: 0px; left: 0px; bottom: 0px; z-index: 0; overflow: auto;">
        <iframe id="tabQuikId" style="position: absolute; left: 0px; width:100%; top: 0px; height: 100%;"></iframe>
    </div>
    <div class="form-horizontal" id="divAboutInfo"></div>
</body>
</html>


<script src="~/Content/themes/TAB/js/jquery-3.4.1.min.js"></script>
<script src="~/Content/themes/TAB/js/bootstrap.min.js"></script>

<script>
    $(document).ready(function () {
        $('#hlAboutUs').click(function () {
            $.ajax({
                type: "POST",
                url: '../Admin/OpenAboutUs',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (response) {
                    var msg = response;
                    $('#divAboutInfo').html(msg);
                    $('#dialog-form-AboutUs').modal('show');
                    //$("#dialog-form-AboutUs .modal-dialog").draggable({ disabled: true });
                },
                failure: function (response) {
                    return false;
                }
            });
        });
        placeTabquick();
    });
    var iFrame = document.getElementById("tabQuikId");
    function placeTabquick() {
            iFrame.src = "@Model.srcUrl";
            setTimeout(function () {
                var window = iFrame.contentWindow;
                var data = "@Model.DataTQ";
                window.postMessage(data, '*');
            }, 1000)
    }

</script>
