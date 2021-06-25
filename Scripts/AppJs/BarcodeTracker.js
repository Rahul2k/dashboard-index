//function dropDownList() {
//    $.ajax({
//        type: "GET",
//        url: "/BarcodeTracker/Dropdownlist",
//        dataType: "json",
//        success: function (data) {
//            var dropdown = '<select ID="ddlAdditional1" class="form-control"><option></option>';
//            $.each(data, function (key, value) {
//                dropdown += '<option value="' + value.Value + '">' + value.Text + '</option>';
//            });
//            dropdown += '</select>';
//            $("#trlblAdditional1_1").html(dropdown);
//        }, error: function (jqXHR, textStatus, errorThrown) {
//            alert(JSON.stringify(jqXHR) + ' ' + textStatus + '  ' + errorThrown);
//        }
//    });
//}
function dropDownList() {
    var chkType = $("#chekAdditionalField1Type").val();
    var dropdown = "";
    $.ajax({
        type: "GET",
        url: "/BarcodeTracker/Dropdownlist",
        dataType: "json",
        success: function (data) {
            if (chkType == 2) {
                dropdown = '<input id="ddlAdditional1Input" list="ddlAdditional1" type="text" class="form-control" />';
            } else {
                dropdown = '<input id="ddlAdditional1Input" list="ddlAdditional1" type="text" class="form-control" /><datalist ID="ddlAdditional1"><option></option>';
                $.each(data, function (key, value) {
                    dropdown += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });
                dropdown += '</datalist>';
            }

            $("#trlblAdditional1_1").html(dropdown);
        }, error: function (jqXHR, textStatus, errorThrown) {
            alert(JSON.stringify(jqXHR) + ' ' + textStatus + '  ' + errorThrown);
        }
    });
    //chk if textbox if yes remove dropdown


}

//#
//onclick first textbox
function OnClickfirstTextCode() {
    var txtDestination = $("#txtDestination").val();
    var txtObject = $("#txtObject").val();
    var hdnPrefixes = $("#hdnPrefixes").val();
    $("#lblObject").html("");
    //var radiOselected = parseInt($("input[type='radio'][name='radDestination']:checked").val());

    $.ajax({
        type: "GET",
        url: "/BarcodeTracker/ClickBarcodeTextDestination",
        dataType: "json",
        data: { txtDestination: txtDestination, txtObject: txtObject, hdnPrefixes: hdnPrefixes },
        success: function (data) {
            if (data.serverErrorMsg == "") {
                scanProcedureOnfirstEnter(data)
                DueBackDate(data)
            } else {
                $("#lblDestination").html(data.serverErrorMsg).css("color", "red");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            alert(JSON.stringify(jqXHR) + ' ' + textStatus + '  ' + errorThrown);
        }
    });
}

function DueBackDate(data) {
    if (data.chkDueBackDate == true) {
        $("#calendarContainer").html('<input type="text" ID="txtDueBackDate" value=" ' + data.DueBackDateText + '" Class="form-control datepicker">')
        $('#txtDueBackDate').datepicker({
            dateFormat: getDatePreferenceCookie(), //Changed by Hasmukh on 06/15/2016 for date format changes
            changeMonth: true,
            changeYear: true,
        });
        $('#DueBackDateClass').show();
    } else if (data.chkDueBackDate == false) {
        $("#calendarContainer").html('<input type="text" ID="txtDueBackDate" value="[None]" disabled="disabled" Class="form-control datepicker">')
        $('#DueBackDateClass').hide();
    }
}




function scanProcedureOnfirstEnter(data) {
    if (data.CheckgetDestination == true) {
        $("#lblDestination").html(data.getDestination).css("color", "green");
        $("#txtObject").focus().val("");
    } else if (data.CheckgetDestination == false) {
        $("#lblDestination").html(data.getDestination).css("color", "red");
        $("#txtDestination").val("");
    }
}
//end onclick first textbox
//#############################
//onclick second textbox
function OnClicksecondTextCode() {
    var txtDestination = $("#txtDestination").val();
    var txtObject = $("#txtObject").val();
    var radiOselected = parseInt($("input[type='radio'][name='radDestination']:checked").val());
    var hdnPrefixes = $("#hdnPrefixes").val();
    //var ddlAdditional11 = $("#ddlAdditional1 option:selected").val();
    var ddlAdditional1Input = $("#ddlAdditional1Input");
    var txtAdditional2 = $("#txtAdditional2");
    var txtDueBackDate = $("#txtDueBackDate").val();


    if (radiOselected == 1) {
        DetectDestinationChange();
    } else {
        $.ajax({
            type: "GET",
            url: "/BarcodeTracker/ClickBarckcodeTextTolistBox",
            dataType: "json",
            data: {
                txtDestination: txtDestination,
                txtObject: txtObject,
                hdnPrefixes: hdnPrefixes,
                txtDueBackDate: txtDueBackDate,
                additional1: ddlAdditional1Input.val(),
                additional2: txtAdditional2.val()
            },
            success: function (data) {
                if (data.serverErrorMsg == "") {
                    $("#lblObject").html("");
                    scanProcedureOnsecondEnter(data, radiOselected);
                    $("#btnReport").attr("disabled", false);
                    ddlAdditional1Input.val("");
                    txtAdditional2.val("");
                } else {
                    $("#lblObject").html(data.serverErrorMsg).css("color", "red");
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                alert(JSON.stringify(jqXHR) + ' ' + textStatus + '  ' + errorThrown);
            }
        });
    }

}

var startRecord = 0
var lastDest;
function lastDestination(currentDestination) {
    if (startRecord == 0) {
        lastDest = currentDestination;
    } else if (currentDestination != lastDest) {
        lastDest = currentDestination;
        return true;
    } else {
        return false
    }
}

function scanProcedureOnsecondEnter(data, radiOselected) {
    var tablelst = $("#lstTracked")
    var desTination = data.returnDestination
    var desTsplit = desTination.split(" ")[0];
    var ObjectIndestination = data.returnObjectItem;
    var txtObject = $("#txtObject")
    var destinationText = $("#txtDestination")
    var desChange = lastDestination(desTsplit);
    var chkDesIfinList = IfDestinationExistInList(desTsplit, ObjectIndestination);
    $("#lblObject").html("");

    switch (radiOselected) {
        case 0:
            if (chkDesIfinList == 0) {
                tablelst.append('<tr class="alert alert-info"><td>' + desTination + '</td></tr><tr><td>' + ObjectIndestination + '</td></tr>')
                txtObject.val("");
                startRecord = 1;
            }
            break;
        case 2:
            if (chkDesIfinList == 0) {
                tablelst.append('<tr class="alert alert-info"><td>' + desTination + '</td></tr><tr><td>' + ObjectIndestination + '</td></tr>')
                txtObject.val("");
                destinationText.val("").focus();
                $("#lblDestination").html("");
            } else {
                txtObject.val("");
                destinationText.val("").focus();
                $("#lblDestination").html("");
            }
            break;
        default:
    }
}

function IfDestinationExistInList(destination, objectItem) {
    var result = 0;
    $("#lstTracked tr.alert").each(function (i, el) {
        var $tds = $(this).find("td");
        sl = $tds.eq(0).text();
        Des = sl.split(" ")[0];
        if (Des == destination) {
            $(this).after('<tr class=""><td>' + objectItem + '</td></tr>')
            $("#txtObject").val("");
            result = 1;
        }
    });
    return result;
}


//check destination from txtObjex ##function for option 2
function DetectDestinationChange() {
    var tablelst = $("#lstTracked")
    var txtObjectui = $("#txtObject");
    var destinationText = $("#txtDestination");
    var txtObjectNon = "";
    var hdnPrefixes = $("#hdnPrefixes").val();
    $("#lblObject").html("");

    $.ajax({
        type: "GET",
        url: "/BarcodeTracker/DetectDestinationChange",
        dataType: "json",
        data: { txtDestination: destinationText.val(), txtObject: txtObjectui.val(), hdnPrefixes: hdnPrefixes },
        success: function (data) {
            //check if destination from object textbox
            if (data.detectDestination == true) {
                destinationText.val(txtObjectui.val());
                txtObjectui.val("");
                e = jQuery.Event("keypress");
                e.which = 13;
                destinationText.keypress(function () { }).trigger(e);
                txtObjectui.focus();
            } else if (data.detectDestination == false) {
                startTransFering(destinationText.val(), txtObjectui.val(), hdnPrefixes).done(function (data) {
                    var desTination;
                    var desTsplit;
                    var ObjectIndestination;
                    if (data.serverErrorMsg == "") {
                         desTination = data.returnDestination;
                         desTsplit = desTination.split(" ")[0];
                         ObjectIndestination = data.returnObjectItem;
                        var desChange = lastDestination(desTsplit);

                        var chkDesIfinList = IfDestinationExistInList(desTsplit, ObjectIndestination);
                        if (chkDesIfinList == 0) {
                            tablelst.append('<tr class="alert alert-info"><td>' + desTination + '</td></tr><tr><td>' + ObjectIndestination + '</td></tr>')
                            txtObjectui.val("");
                            startRecord = 1;
                        }
                        $("#btnReport").attr("disabled", false);
                    }
                    else {
                        $("#lblObject").html(data.serverErrorMsg).css("color", "red");
                    }
                });
            }

        }, error: function (jqXHR, textStatus, errorThrown) {
            //alert(JSON.stringify(jqXHR) + ' ' + textStatus + '  ' + errorThrown);
        }
    });
}

function startTransFering(txtDestination, txtObject, hdnPrefixes) {
    var ddlAdditional1 = $("#ddlAdditional1 option:selected").text();
    var txtAdditional2 = $("#txtAdditional2").val();
    var txtDueBackDate = $("#txtDueBackDate").val();

    return $.ajax({
        type: "GET",
        url: "/BarcodeTracker/ClickBarckcodeTextTolistBox",
        dataType: "json",
        data: {
            txtDestination: txtDestination,
            txtObject: txtObject,
            hdnPrefixes: hdnPrefixes,
            txtDueBackDate: txtDueBackDate,
            additional1: ddlAdditional1,
            additional2: txtAdditional2
        },
    });
}

function setDate() {
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();

    var newdate = month + "/" + day + "/" + year;
    return newdate;

}

function PrintListOfItem() {
    var newWin = window.open('', 'Print report', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
    newWin.document.open();
    var gateDate = setDate();
    var TotalItem = 0;

    //count result total
    $("#lstTracked tr").each(function (i, el) {
        var trhead = $(this);
        if (!$(this).hasClass('alert')) {
            TotalItem++;
        }
    });

    newWin.document.write('<table><tr><td>Record Count: ' + TotalItem + ' </td></tr><tr><td>Report date:' + gateDate + ' </td></tr></table>');
    newWin.document.write("<br/>");
    newWin.document.write('<html><head><style>.borderPrint{border:1px solid gray; width:400px;}</style></head><body><div class="container">');
    newWin.document.write("<h2>Transmittal Report</h2>")
    newWin.document.write('<div style="font-weight:bolder;border:1px solid gray;width:120px">Trackable Items</div>');


    var TotalTablesRows = $("#lstTracked tr").length;
    var countItems = 0;
    var subtotal = 0;
    $("#lstTracked tr").each(function (i, el) {
        var $tds = $(this).find("td");
        Record = $tds.eq(0).text();
        //newWin.document.write('<table style="border-collapse:collapse;border:1px solid gray;">');
        if ($(this).hasClass('alert')) {
            if (i > 0) {
                subtotal = countItems;
                newWin.document.write('<div style="font-weight:bolder;width:120px" class="borderPrint">Subtotal:' + subtotal + '</div>')
            }
            newWin.document.write('<div style="font-weight:bolder;" class="borderPrint">' + Record + '</div>');
            countItems = 0;
        } else if (!$(this).hasClass('alert')) {
            newWin.document.write('<div class="borderPrint">' + Record + '</div>');
            countItems++;
        }

        if (i + 1 === TotalTablesRows) {
            subtotal = countItems;
            newWin.document.write('<div style="font-weight:bolder;width:120px" class="borderPrint">Subtotal: ' + subtotal + '</div>')
        }

        //newWin.document.write('</table>')
    });

    newWin.document.write('</div></body></html>');

    newWin.document.write("<br/>")
    newWin.document.write("End of Report");
    newWin.print()
    newWin.document.close();
}







