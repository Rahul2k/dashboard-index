@Imports TabFusionRMS.Models
@ModelType LookupType

<section class="content">
    @Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmaddLocalizeData", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
        @<div id="parent">
            <div class="form-group">
                <label class="col-lg-2 col-md-3 control-label" for="userLangSelect">@Languages.Translation("lblLocalizePartialLanguage")</label>
                <div class="col-md-4 ">
                    <div class="btn-group">
                        <div id="userLangSelect" data-input-name="country" style="width: 100% !important"></div>
                    </div>
                </div>
            </div>
            <div class="form-group top_space">
                <label class="col-lg-2 col-md-3 control-label" for="PrefDateForm">@Languages.Translation("lblLocalizePartialDateFormat")</label>
                <div class="col-md-4">
                    @*<select data-placeholder="@Languages.Translation("lblLocalizePartialChooseDateFormat")" class="chosen-select" name="PreferedDateFormat" id="PrefDateForm" style="width:206px;" tabindex="2"></select>*@
                    <select class="chosen-select" name="PreferedDateFormat" id="PrefDateForm" style="width:206px;" tabindex="2"></select>
                    <span id="lblDateFormatRequired" style="display:none;color:red;font-weight:bold">*</span>
                </div>
            </div>

            <div class="form-group">
                <div class="col-lg-2  col-md-3 control-label"></div>
                <div class="col-md-6">
                    <button id="btnSaveLocData" type="button" class="btn btn-primary">@Languages.Translation("Apply")</button>
                </div>
            </div>
        </div>
    End Using
</section>

<link href="~/Content/themes/TAB/css/chosen.css" rel="stylesheet" />
<script src="~/Content/themes/TAB/js/chosen.jquery.js"></script>
<script src="~/Content/themes/TAB/js/jquery.flagstrap.js"></script>

<script type="text/javascript">
    function FillAvailableLang() {
        $.ajax({
            url: urls.Localize.GetAvailableLang,
            dataType: "json",
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: false,
            processData: false,
            cache: false,
            success: function (data) {
                var pDateFrmLIst = $.parseJSON(data.pDateFormS);
                var pLocData = data.pLocData;
                var vrLanguages = data.pLangS;
                $('#userLangSelect').flagStrap({
                    countries: vrLanguages
                    , reload_change: false,
                    selectedCountry: data.cultureCode
                });
                $('#PrefDateForm').empty();
                $('#PrefDateForm').append($("<option>", { value: 0, html: "Select Date Format" }));
                $(pDateFrmLIst).each(function (i, v) {
                    $('#PrefDateForm').append($("<option>", { value: v.LookupTypeCode, html: v.LookupTypeValue }));
                });
                $('#PrefDateForm').val(pLocData);
                $('.chosen-select').chosen({ enable_split_word_search: false });
            },
            error: function (xhr) {
                ShowErrorMessge();
            }
        });
    }
    $('#btnSaveLocData').on('click', function (e) {
        if ($("#PrefDateForm").val() == "0" || $("#PrefDateForm").val() == null) {
            $("#lblDateFormatRequired").css("display", "inline-block");
            return;
        }
        else {
            $("#lblDateFormatRequired").css("display", "none");
        }
        var vrFormData = {
            PreferedDateFormat: $("#PrefDateForm").val() == "0" ? null : $("#PrefDateForm").val()
           , PreferedLanguage: $("select[id^='flagstrap-']").val()
        }
        $.post(urls.Localize.SetLocalizeData, { pPreferedLanguage: vrFormData.PreferedLanguage, pPreferedDateFormat: vrFormData.PreferedDateFormat })
                .done(function (response) {
                    showAjaxReturnMessage(response.message, response.errortype);
                    setTimeout(function () { location.reload(); }, 2000);
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
    });
    $("#PrefDateForm").on("change", function () {
        if ($("#PrefDateForm").val() == "0" || $("#PrefDateForm").val() == null)
            $("#lblDateFormatRequired").css("display", "inline-block");
        else
            $("#lblDateFormatRequired").css("display", "none");
    });
    $(document).ready(function () {
        FillAvailableLang();
    });
</script>
