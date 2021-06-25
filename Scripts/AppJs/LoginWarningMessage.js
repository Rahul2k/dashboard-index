$(function () {

    $.get(urls.BeforeLoginWarning.GetWarningMessage, function (data) {
        var tabSettings = JSON.parse(data);

        var value = tabSettings.toString().split("||");
        var showMessage = value[0];
        var warningMessage = value[1];

        if (showMessage == 'Yes')
            $('input:radio[name="ShowMessage"][value="Yes"]').prop('checked', true);
        else if (showMessage == 'No')
            $('input:radio[name="ShowMessage"][value="No"]').prop('checked', true);
        $("#txtWarningMessage").val(warningMessage);
    });
});

$("#btnApplyWarningMsg").on('click', function () {
    var selectedVal = "";
    var selected = $("input[type='radio'][name='ShowMessage']:checked");
    if (selected.length > 0) {
        selectedVal = selected.val();
    }

    $.post(urls.BeforeLoginWarning.SetWarningMessage, { pWarningMessage: $("#txtWarningMessage").val(), pShowMessage: $("input[type='radio'][name='ShowMessage']:checked").val() }).done(function (response) {
        showAjaxReturnMessage(response.message, response.errortype);
    }).fail(function (xhr, status, error) {
        ShowErrorMessge();
    });
});
