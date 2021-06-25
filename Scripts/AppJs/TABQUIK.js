$(function () {

    //Validation for integration key text field.
    $("#txtIntegrationKey").OnlyNumericWithHyphen();

    $.get(urls.TABQUIK.GetTabquikKey, function (data) {
        var tabSettings = JSON.parse(data);
        $("#txtIntegrationKey").val(tabSettings.ItemValue);
    });
});

$("#btnApplyKey").on('click', function () {
    if (validateTABQUIK($("#txtIntegrationKey").val())) {
        $.post(urls.TABQUIK.SetTabquikKey, { pTabquikkey: $("#txtIntegrationKey").val() }).done(function (response) {
            if ($("#txtIntegrationKey").val() != "")
                showAjaxReturnMessage(response.message, response.errortype);
        }).fail(function (xhr, status, error) {
            ShowErrorMessge();
        });
    }
});

function validateTABQUIK(key) {
    var reg = '^[0-9]{4}-[0-9]{4,5}$';
    if (key === "") {
        showAjaxReturnMessage(vrApplicationRes["msgJsTabquikEmptyKeyValidation"], "s");
        return true;
    }
    if (key.match(reg)) {
        return true;  
    }  
    else {  
        showAjaxReturnMessage(vrApplicationRes["msgJsTabquikKeyValidation"], "w");
        return false;  
    }  
}  