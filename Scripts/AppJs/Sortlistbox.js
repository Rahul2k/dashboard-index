
$(document).ready(function () {

    $("#btnSortByColumn").on('click', function (e) {
        BindViewDualPanel($("#ViewsModel_Id").val());
        $("#mdlSortBy").ShowModel();
        $("#divSortBy").hide();
    });

    $("#btnSortCancel").on('click', function (e) {
        $("#mdlSortBy").HideModel();
    });

    $("#btnMoveSelected").on('click', function (e) {
        var totalRecord = $("#nonSelectedColumnList option").length;
        var selectedCount = $("#nonSelectedColumnList option:selected").length;

        if (totalRecord > 0 && selectedCount > 0) {
            var nonSelectedIndex = $("#nonSelectedColumnList").prop('selectedIndex');
            var nonSelectedValue = $("#nonSelectedColumnList option:selected").val();
            var nonSelectedText = $("#nonSelectedColumnList option:selected").text();
            var IsDesc = $('#nonSelectedColumnList option:selected').attr("SortOrderDesc");
            var selectedIndex = $("#selectedColumnList").prop('selectedIndex');

            if (selectedIndex == -1) {
                $("#selectedColumnList").append("<option SortOrderDesc=" + IsDesc + " value=" + nonSelectedValue + " >" + nonSelectedText + "</option>");
            }
            else {
                $("#selectedColumnList option:eq(" + selectedIndex + ")").after("<option SortOrderDesc=" + IsDesc + " value=" + nonSelectedValue + " >" + nonSelectedText + "</option>");
            }

            $("#nonSelectedColumnList option:selected").remove();
            $('#selectedColumnList').val(nonSelectedValue);

            if (nonSelectedIndex == 0 && totalRecord > 1) {
                $('#nonSelectedColumnList option')[nonSelectedIndex].selected = true;
            }
            else if (nonSelectedIndex > 0) {
                $('#nonSelectedColumnList option')[nonSelectedIndex - 1].selected = true;
            }

            SelectSortByRadioButton($('#selectedColumnList option:selected').attr("SortOrderDesc"));
        }
    });

    $("#btnRemoveSelected").on('click', function (e) {
        var totalRecord = $("#selectedColumnList option").length;
        var selectedCount = $("#selectedColumnList option:selected").length;

        if (totalRecord > 0 && selectedCount > 0) {
            var selectedIndex = $("#selectedColumnList").prop('selectedIndex');
            var selectedValue = $("#selectedColumnList option:selected").val();
            var selectedText = $("#selectedColumnList option:selected").text();

            var nonSelectedIndex = $("#nonSelectedColumnList").prop('selectedIndex');

            if (nonSelectedIndex == -1) {
                $("#nonSelectedColumnList").append("<option SortOrderDesc=false value=" + selectedValue + " >" + selectedText + "</option>");
            }
            else {
                $("#nonSelectedColumnList option:eq(" + nonSelectedIndex + ")").after("<option SortOrderDesc=false value=" + selectedValue + " >" + selectedText + "</option>");
            }

            $("#selectedColumnList option:selected").remove();
            $('#nonSelectedColumnList').val(selectedValue);

            if (selectedIndex == 0 && totalRecord > 1) {
                $('#selectedColumnList option')[selectedIndex].selected = true;
            }
            else if (selectedIndex > 0) {
                $('#selectedColumnList option')[selectedIndex - 1].selected = true;
            }

            SelectSortByRadioButton($('#selectedColumnList option:selected').attr("SortOrderDesc"));

            if (totalRecord == 1) {
                $("#divSortBy").hide();
            }
        }
    });

    $("#btnRemoveAllSelected").on('click', function (e) {
        var selectedTbls = $('#selectedColumnList option');

        selectedTbls.each(function (i, v) {
            $("#nonSelectedColumnList").append("<option SortOrderDesc=false value=" + v.value + " >" + v.text + "</option>");
        });

        $("#selectedColumnList").empty();

        if ($('#nonSelectedColumnList option').length > 0) {
            $('#nonSelectedColumnList').val($('#nonSelectedColumnList option:first').val());
        }

        $("#divSortBy").hide();
    });

    $("#btnSortOk").on('click', function (e) {
        var selectedTbls = $('#selectedColumnList option');
        var vTableIds = [];
        selectedTbls.each(function (i, v) {
            vTableIds.push(v.value + "|" + v.getAttribute("SortOrderDesc"));
        });

        $.post(urls.Admin.SaveSortedColumnToList, $.param({ pTableIds: vTableIds, pViewId: $("#ViewsModel_Id").val() }, true))
                .done(function (response) {
                    //showAjaxReturnMessage(response.message, response.errortype);
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });

        $("#mdlSortBy").HideModel();
    });

    $("#selectedColumnList").on('change', function (e) {
        SelectSortByRadioButton($('option:selected', this).attr('SortOrderDesc'));
    });

    $("input[name=rbSortBy]:radio").on('change', function (e) {
        $('#selectedColumnList option:selected').attr("SortOrderDesc", $(this).val());
    });

    $("#btnSortByUp").on('click', function (e) {
        var selected = $("#selectedColumnList").find(":selected");
        var before = selected.prev();
        if (before.length > 0) {
            selected.detach().insertBefore(before);
        }
    });

    $("#btnSortByDown").on('click', function (e) {
        var selected = $("#selectedColumnList").find(":selected");
        var next = selected.next();
        if (next.length > 0) {
            selected.detach().insertAfter(next);
        }
    });

});

function BindViewDualPanel(viewId) {
    $.getJSON(urls.Admin.GetSortedColumnList + "?pViewId=" + viewId, function (data) {
        var pOutputObject = $.parseJSON(data);
        $('#selectedColumnList').empty();
        $('#nonSelectedColumnList').empty();

        if (pOutputObject != "") {
            $.each(pOutputObject, function (i, item) {
                if (item.SortOrder > 0) {
                    $('#selectedColumnList').append("<option SortOrderDesc=" + item.SortOrderDesc + " value=" + item.Id + " >" + item.Heading + "</option>");
                } else {
                    $('#nonSelectedColumnList').append("<option SortOrderDesc=" + item.SortOrderDesc + " value=" + item.Id + "  >" + item.Heading + "</option>");
                }
            });

            if ($('#nonSelectedColumnList option').length > 0) {
                $('#nonSelectedColumnList').val($('#nonSelectedColumnList option:first').val());
            }

            if ($('#selectedColumnList option').length > 0) {
                $('#selectedColumnList').val($('#selectedColumnList option:first').val());
                $("divSortBy").show();
                SelectSortByRadioButton($('#selectedColumnList option:first').attr("SortOrderDesc"));
            }
        }
    });
}

function SelectSortByRadioButton(IsDesc) {
    $("#divSortBy").show();
    if (IsDesc == "true")
        $("#rbDescending").prop('checked', true);
    else
        $("#rbAscending").prop('checked', true);
}

