$(function () {

    $('body').addClass("sidebar-collapse");
    $(".main-footer").css("width", $(".main-header").outerWidth());
    $(".sidebar-toggle").hide();

    //Start of attachment main form
    $.ajaxSetup({ cache: false });
    // Load attachment form in edit mode

    // Apply all settings finally
    //$('#mdlOutputSetting').ShowModel();

    $("#btnAttachFile").on('click', function (e) {
        var vOutPutSetting = $('#ddlOutputSettings option:selected').val();
        var vTableName = $('#ddlTables option:selected').val();
        var vTableId = $('#TableId').val();
        $.post(urls.Upload.AttachDocument, { pOutPutSetting: vOutPutSetting, pTableName: vTableName, pTableId: vTableId })
                .done(function (response) {
                    showAjaxReturnMessage(response.message, response.errortype);

                    if (response.errortype == 's') {
                        //window.location = "data.aspx";
                    }
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });

    });


    $("#btnCancel").on('click', function (e) {
        window.location = "signin.aspx?timeout=1";
    });

    // Apply all settings finally



});
