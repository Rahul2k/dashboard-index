$(function () {
    $.getJSON(urls.Appearance.GetSystemList, function (data) {
        var pSystemObject = $.parseJSON(data);
        var flag = pSystemObject[0].AlternateRowColors;
        if (flag)
        {
            $('#cbAltRowCol').attr('checked', true);
        }
    });

    //Save data in database philips hr1351/c 250W
    $("#bApplyAppearance").on('click', function (e) {
        var $form = $('#frmAppearanceDetails');
        if ($form.valid()) {
            var serializedForm = $form.serialize();
            $.post(urls.Appearance.SetSystemDetails, serializedForm)
                .done(function (response) {
                    showAjaxReturnMessage(response.message, response.errortype);
                    //if (response.errortype == 's') {
                    //    $("#grdDrive").refreshJqGrid();
                    //    $('#mdlDriveDetails').modal('hide');
                    //}
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
        }
    });    //Save data in database 


    $("#radio-group").change(function () {
        if ($('#current_theme').is(':checked')) {
            $('#color-picker').removeClass('hidden');
        } else {
            $('#color-picker').addClass('hidden');
        }
    });

    //$(".pick-a-color").pickAColor({
    //    saveColorsPerElement: false,
    //    allowBlank: true,
    //});
    
    $("#txtGridBackColorOdd").on("change", function () {
        $('#lbOddSample').css('background-color', '#'+$(this).val());
    });
    
    $("#txtGridForeColorOdd").on("change", function () {
        $('#lbOddSample').css('color', '#' + $(this).val());
    });

    $("#txtGridBackColorEven").on("change", function () {
        $('#lbEveSample').css('background-color', '#' + $(this).val());
    });

    $("#txtGridForeColorEven").on("change", function () {
        $('#lbEveSample').css('color', '#' + $(this).val());
    });

    $('#bRestore').on('click', function () {
        $('#lbEveSample').css('color', 'black');
        $('#lbEveSample').css('background-color', 'white');
        $('#lbOddSample').css('color', 'black');
        $('#lbOddSample').css('background-color', 'white');

        //$("#txtGridBackColorOdd").colorpicker('setValue', '000');
        //$(".color-preview current-color").css('background', 'none');
        
        //$("#txtGridBackColorOdd").empty();
        //$(".pick-a-color").pickAColor();
        //alert($("#txtGridBackColorOdd").data('.pick-a-color').color);
    });
});




