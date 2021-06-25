@ModelType TabFusionRMS.WebVB.BarcodeTrackerModel

@Code
    Layout = "~/Views/Shared/_LayoutBarcodeTracker.vbhtml"
End Code

@*<link rel="stylesheet" href="~/barcodetracking.css" type="text/css" media="screen" />*@

    @*
    <link href="~/Content/themes/TAB/css/bootstrap.min.css" rel="stylesheet" />
    <link href="~/Content/themes/TAB/css/custom.css" rel="stylesheet" />
    <link href="~/Content/themes/TAB/css/Fusion10.css" rel="stylesheet" />
    <link href="~/Content/themes/TAB/css/media.css" rel="stylesheet" />
    <link href="~/Content/themes/TAB/css/font-awesome.css" rel="stylesheet" />*@
@*<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,400italic,700,600italic" rel="stylesheet" type="text/css" />*@



<style>
    .barcodeBox {
        min-height: 0px;
    }
    /*for additional dropdown field*/
    input::-webkit-calendar-picker-indicator {
        display: none;
    }
</style>
    <script type="text/javascript">
        $(document).ready(function () {
            //onload conditions
            var chkAdditionalFields1 = $("#chekAdditionalField1Type").val()
            var chkAdditionalFields2 = $("#chekAdditionalField2").val()
            var chekAdditionSystemseting = $("#chekAdditionSystemseting").val();
            

            //check what the type of text or dropdown if text ...which is 2
           
            //check if additional fields been added.
            if (chkAdditionalFields1 != "") {
                $("#trlblAdditional1_1").show();
                dropDownList()
                $("#trlblAdditional1_2").show();
                //$("#btnTransfer").show();
            } else {
                $("#trlblAdditional1_1").hide();
                $("#trlblAdditional1_2").hide();
                $("#ddlAdditional1").hide();
                //$("#btnTransfer").hide();
            }
            if (chkAdditionalFields2 != "") {
                $("#trlblAdditional2_1").show();
                $("#trlblAdditional2_2").show();
                //$("#btnTransfer").show();
            } else {
                $("#trlblAdditional2_1").hide();
                $("#trlblAdditional2_2").hide();
                //$("#btnTransfer").hide();
            }
            //End onload conditions
            //onclick first textbox
            $('#txtDestination').keypress(function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    return OnClickfirstTextCode();
                }
                event.stopPropagation();
            });
            //Added by akruti
            $('#txtDestination').blur(function (event) {
                return OnClickfirstTextCode();
            });
            //Added by akruti
            //onclick second textbox
            $('#txtObject').keypress(function (event) {
                if (chekAdditionSystemseting != 1) {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if (keycode == '13') {
                        return OnClicksecondTextCode();
                    }
                    event.stopPropagation();
                }
            });


            $("input[type='radio'][name='radDestination']").change(function () {
                if (this.value == '0') {
                    startRecordlocked = 0;
                    $("#txtDestination").focus().val("");
                    $("#txtObject").val("");
                }
                if (this.value == '1') {
                    startRecordlocked = 0;
                    $("#txtDestination").focus().val("");
                    $("#txtObject").val("");
                }
                if (this.value == '2') {
                    startRecordlocked = 0;
                    $("#txtDestination").focus().val("");
                    $("#txtObject").val("");
                }
            });

            $("#btnTransfer").click(function () {
                //if (chekAdditionSystemseting == 1) {
                   // OnClickfirstTextCode();
                    OnClicksecondTextCode();
                    $("#txtObject").focus();
                //}
            });
            setFooterWidth()
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("body").toggleClass("sidebar-collapse", "slow");
                setFooterWidth()
            });
           
        });

        function setFooterWidth() {
            if (window.location.pathname.indexOf("LabelManager") == -1 && window.location.pathname.indexOf("Import") == -1) {
                $("body").hasClass("sidebar-collapse") == true ? $(".main-footer").css("width", $(".main-header").outerWidth()) : $(".main-footer").css("width", $(".main-header").outerWidth() - 230);
            }
        }

        window.onfocus = function () {
            if (getCookie("Islogin") == "False") {
                window.location.href = window.location.origin + "/signin.aspx?out=1";
            }
        };
        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
    </script>

    <input type="hidden" value="@Model.additionalField1Type" id="chekAdditionalField1Type" />
    <input type="hidden" value="@Model.additionalField2" id="chekAdditionalField2" />
    <input type="hidden" value="@Model.chekAdditionSystemseting" id="chekAdditionSystemseting" />
    <input type="hidden" value="@Model.hdnPrefixes" id="hdnPrefixes" />


    <div class="row">
        <div class="col-xs-12 col-sm-12">
            <div class="row">
                <div class="col-xs-12 col-sm-12">
                    <div class="trackableItemInfo">
                        <span>@Languages.Translation("lblBarCodeTrackingTrackedItem")</span>
                        <input type="button" ID="btnReport" onclick="PrintListOfItem()" value="Print Transmittal Report" disabled="disabled" Class="btn btn-primary btn-sm pull-right" />
                    </div>
                    @*<textarea Style="border:none ;min-height:350px; width:100%;" ID="lstTracked" spellcheck="false"></textarea>*@
                    <div style="border:1px solid gray; overflow:auto; height:60vh;">
                        <table class="table table-hover" id="lstTracked"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>






    @*<asp:HiddenField ID="hdnPrefixes" runat="server" />
        <asp:HiddenField ID="hdnUserName" runat="server" />
        <asp:HiddenField ID="hdnRequestorTableName" runat="server" />*@


