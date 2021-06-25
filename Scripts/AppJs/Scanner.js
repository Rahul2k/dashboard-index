$(function () {

    /* Start : Hide side panel */

    $('body').addClass("sidebar-collapse");
    $(".main-footer").css("width", $(".main-header").outerWidth());
    $(".sidebar-toggle").hide();

    /* End : Hide side panel */
    
    //GetScanMenu();

    /* Start : Attach file */
    $("#TableId").OnlyNumericWithoutDot();
    $('#frmAttachFile').validate({
        rules: {
            ddlOutputSettings: {
                required: true
            },
            ddlTables: {
                required: true
            },
            TableId: {
                required: true,
                number: true
            }
        },
        ignore: ":hidden:not(select)",
        messages: {
            ddlOutputSettings: {
                required: ""
            },
            ddlTables: {
                required: ""
            },
            TableId:
                {
                    required: "",
                    number: vrScannerRes["msgJsScannerNoRAllowed"]
                }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });


    $("#open_btn").on('click', function (e) {
        
        RefereshPage("Scanner");
        //alert(window.outerHeight)
        //alert(window.innerHeight)
        //alert($('.modal-content').height());
        //alert($('.modal-content').innerHeight());
        //alert($('.modal-content').outerHeight());

        var $form = $('#frmAttachFile');
        if ($form.valid()) {
            $.FileDialog({ multiple: true, accept: "image/*,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.pdf,.csv,application/msword,application/msword,application/vnd.ms-powerpoint,image/tiff,image/tiff" }).on('files.bs.filedialog', function (ev) {
                var files = ev.files;

                var filesSize = 0;
                $.each(files, function (index, value) {
                    filesSize = filesSize + value.size;
                });

                if (filesSize > 2147483648)
                {
                    showAjaxReturnMessage(vrScannerRes["msgJsScannerMaxSize2GBAllow"], 'w');
                    return false;
                }

                var data = new FormData();
                var errMsg = vrScannerRes["msgJsScannerAttachFilesFailed"] + "</br></br>";
                var invalidFiles = "";
                var Isvalid = true;
                var arrValidExts = ["txt", "docx", "doc", "png", "jpg", "jpeg", "xls", "xlsx", "ppt", "pptx", "pdf","csv","tif","pdf","gif"];
                for (var i = 0; i < files.length; i++) {
                    var ext = files[i].name.split('.').pop().toLowerCase();
                    if (jQuery.inArray(ext, arrValidExts) >= 0) {
                        data.append(files[i].name, files[i]);
                    }
                    else {
                        invalidFiles = invalidFiles + files[i].name + "</br>";
                        Isvalid = false;
                    }
                }


                data.append('OutPutSettings', $("#ddlOutputSettings").val());
                data.append('TableName', $("#ddlTables").val());
                data.append('TableId', $("#TableId").val());
                if (Isvalid) {
                    $.ajax({
                        url: urls.Scanner.AttachDocuments,//
                        type: "POST",
                        data: data,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            showAjaxReturnMessage(result.message, result.errortype);
                        },
                        error: function (err) {
                            showAjaxReturnMessage(err.statusText, 'e');
                        }
                    });
                }
                else {
                    showAjaxReturnMessage(errMsg + invalidFiles, "e");
                }
                return true;
            }).on('cancel.bs.filedialog', function (ev) {
                //alert("Cancelled!");
            });


        }
        return false;
    });

    /* End : Attach file */




    $('#frmRule').validate({
        rules: {
            Id: {
                required: true,
                minlength: 3
            },
            ScanRule: {
                required: true
            }
        },
        ignore: ":hidden:not(select)",
        messages: {
            Id:
                {
                    required: "",
                    minlength: vrScannerRes["msgJsScannerRuleName3OrMore"]
                },
            ScanRule: {
                required: ""
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $("#liNewRule").on('click', function (e) {
        $('#frmRule').resetControls();
        $("#modelTitle").text(vrScannerRes["tiJsScannerNewRuleCrea"]);
        $("#fdExistingRule").hide();
        $("#fdNewRule").show();
        $("#hdnAction").val('N');
        $('#ScanRule')[0].selectedIndex = 1;
        $("#mdlRules").ShowModel();
    });

    $("#liDeleteRule").on('click', function (e) {
        $('#frmRule').resetControls();
        $("#modelTitle").text(vrScannerRes["tiJsScannerDelExisRule"]);
        $("#fdExistingRule").show();
        $("#fdNewRule").hide();
        $("#hdnAction").val('D');
        $("#Id").val('D');
        UpdateScanRulesDropDown();
        $("#mdlRules").ShowModel();
    });

    $("#liCloneRule").on('click', function (e) {
        $('#frmRule').resetControls();
        $("#modelTitle").text(vrScannerRes["tiJsScannerCloneExiRule"]);
        $("#fdExistingRule").show();
        $("#fdNewRule").show();
        $("#hdnAction").val('C');
        UpdateScanRulesDropDown();
        $("#mdlRules").ShowModel();
    });

    $("#liRenameRule").on('click', function (e) {
        $('#frmRule').resetControls();
        $("#modelTitle").text(vrScannerRes["tiJsScannerRenameExisRule"]);
        $("#fdExistingRule").show();
        $("#fdNewRule").show();
        $("#hdnAction").val('R');
        var vScanRuleName = $('#ScanRule option:selected').text();
        $("#Id").val(vScanRuleName);
        UpdateScanRulesDropDown();
        $("#mdlRules").ShowModel();
    });

    $("#liDiskSourceInputSet").on('click', function (e) {
        //alert(1);

        //$.ajax({
        //    async: false,
        //    type: "GET",
        //    contentType: 'application/html; charset=utf-8',
        //    dataType: "html",
        //    url: urls.Scanner.LoadDiskSourceInputSettingPartial,
        //    success: function (response) {
        //        $('#LoadUserControl').html(response);
        //        $("#mdlDiskSource").ShowModel();
        //    }
        //});

        $('#LoadUserControl').load(urls.Scanner.LoadDiskSourceInputSettingPartial, function () {

            $("#mdlDiskSource").ShowModel();

        });


    });

    $('#ScanRule').on('change', function (e) {
        var vScanRuleName = $('#ScanRule option:selected').text();
        var vAction = $("#hdnAction").val();
        if (vAction != 'C')
            $("#Id").val(vScanRuleName);
    });

    $("#btnOkRule").on('click', function (e) {
        var $form = $('#frmRule');
        if ($form.valid()) {
            var vRuleName = $("#Id").val(), vRuleId = $("#ScanRule").val(), vAction = $("#hdnAction").val();
            $.post(urls.Scanner.SetScanRule, { pScanRuleName: vRuleName, pScanRuleId: vRuleId, pAction: vAction })
          .done(function (response) {

              if (response.errortype == 's') {
                  if (vAction == 'R') {
                      $(this).confirmModal({
                          confirmTitle: vrScannerRes['tiJsScannerRenameRule'],
                          confirmMessage: response.message,
                          confirmOk: vrCommonRes['Yes'],
                          confirmCancel: vrCommonRes['No'],
                          confirmStyle: 'default',
                          confirmCallback: RenameScanRule
                      });
                  }
                  else {
                      showAjaxReturnMessage(response.message, response.errortype);
                      $('#mdlRules').HideModel();
                  }

              }
              else {
                  showAjaxReturnMessage(response.message, response.errortype);
              }
          })
          .fail(function (xhr, status, error) {
              ShowErrorMessge();
          });

        }
    });

});


function RenameScanRule() {
    var vRuleName = $("#Id").val(), vRuleId = $("#ScanRule").val();
    $.post(urls.Scanner.RenameRule, { pScanRuleName: vRuleName, pScanRuleId: vRuleId })
            .done(function (response) {
                showAjaxReturnMessage(response.message, response.errortype);
                if (response.errortype == 's') {
                    $('#mdlRules').HideModel();
                }
            })
            .fail(function (xhr, status, error) {
                ShowErrorMessge();
            });
}

function UpdateScanRulesDropDown() {
    $.get(urls.Scanner.UpdateScanRulesDropDown)
                    .done(function (response) {
                        var pAttachObject = $.parseJSON(response);
                        $('#ScanRule').empty();
                        $(pAttachObject).each(function (i, v) {
                            $('#ScanRule').append($("<option>", { value: v.ScanRulesId, html: v.Id }));
                        });
                    })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });
}

/* Start : Bind scan menu */
function GetScanMenu() {
    $('.scanmenu').empty();
    $('.scanmenu').append(
    '<ul class=\"nav navbar-nav\">' +
            ' <li class=\"dropdown user user-menu\">' +
                '<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">' +
                    '<span class=\"hidden-xs\">' + vrScannerRes["mnuJsScannerScanning"] + '</span>  <i class=\"fa fa-angle-down \"></i>' +
                '</a>' +
                '<ul class=\"dropdown-menu multi-level\" role=\"menu\" aria-labelledby=\"dropdownMenu\">' +
                    '<li class=\"dropdown-submenu\">' +
                        '<a tabindex=\"-1\" href=\"#\">' + vrScannerRes["mnuJsScannerRule"] + '</a>' +
                        '<ul class=\"dropdown-menu\">' +
                            '<li><a id=\"liNewRule\" href=\"#\">' + vrScannerRes["mnuJsScannerNewRule"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerSaveActiveRule"] + '</a></li>' +
                            '<li><a id=\"liDeleteRule\" href=\"#\">' + vrScannerRes["mnuJsScannerDelRule"] + '</a></li>' +
                            '<li class=\"divider\"></li>' +
                            '<li><a id=\"liCloneRule\" href=\"#\">' + vrScannerRes["mnuJsScannerCloneRule"] + '</a></li>' +
                            '<li><a id=\"liRenameRule\" href=\"#\">' + vrScannerRes["mnuJsScannerRenameRule"] + '</a></li>' +
                        '</ul>' +
                    '</li>' +
                    '<li class=\"dropdown-submenu\">' +
                        '<a tabindex=\"-1\" href=\"#\">' + vrScannerRes["mnuJsScannerSources"] + '</a>' +
                        '<ul class=\"dropdown-menu\">' +
                            '<li><a tabindex=\"-1\" href=\"#\">' + vrScannerRes["mnuJsScannerNewRule"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerSaveActiveRule"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerDelRule"] + '</a></li>' +
                            '<li class=\"divider\"></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerCloneRule"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerRenameRule"] + '</a></li>' +
                        '</ul>' +
                    '</li>' +
                    '<li class=\"dropdown-submenu\">' +
                        '<a tabindex=\"-1\" href=\"#\">' + vrScannerRes["mnuJsScannerDocs"] + '</a>' +
                        '<ul class=\"dropdown-menu\">' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerDefLnkScript"] + '</a></li>' +
                            '<li class=\"dropdown-submenu\">' +
                                '<a href=\"#\">' + vrScannerRes["mnuJsScannerNewDocRule"] + '</a>' +
                                '<ul class=\"dropdown-menu\">' +
                                    '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerEveryPg"] + '</a></li>' +
                                    '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerEveryBlnkPg"] + '</a></li>' +
                                    '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerEveryBarCode"] + '</a></li>' +
                                    '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerErveryPatchCode"] + '</a></li>' +
                                '</ul>' +
                            '</li>' +
                            '<li class=\"dropdown-submenu\">' +
                                '<a href=\"#\">' + vrScannerRes["mnuJsScannerSaveDuplicate"] + '</a>' +
                                '<ul class=\"dropdown-menu\">' +
                                    '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerNewPg"] + '</a></li>' +
                                    '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerNewVersion"] + '</a></li>' +
                                '</ul>' +
                            '</li>' +
                        '</ul>' +
                    '</li>' +
                    '<li class=\"dropdown-submenu\">' +
                        '<a tabindex=\"-1\" href=\"#\">' + vrScannerRes["mnuJsScannerIpOp"] + '</a>' +
                        '<ul class=\"dropdown-menu\">' +
                            '<li><a id=\"liDiskSourceInputSet\" href=\"#\">' + vrScannerRes["mnuJsScannerDiskSourceIpSett"] + '</a></li>' +
                            '<li class=\"divider\"></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerOpSettings"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerStorage"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerMultiPg"] + '</a></li>' +
                        '</ul>' +
                    '</li>' +
                    '<li class=\"dropdown-submenu\">' +
                        '<a tabindex=\"-1\" href=\"#\">' + vrScannerRes["mnuJsScannerImgProcessing"] + '</a>' +
                        '<ul class=\"dropdown-menu\">' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerAutoEndorse"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerBarCodeProp"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerBlackBorderProp"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerDeshadeProp"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerDeskewProp"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerDespProp"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerImgFilterProp"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerLineRmvProp"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerPatchCodeProp"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerPatchCodePropAdv"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerStreakProp"] + '</a></li>' +
                        '</ul>' +
                    '</li>' +
                    '<li class=\"dropdown-submenu\">' +
                        '<a tabindex=\"-1\" href=\"#\">' + vrScannerRes["mnuJsScannerScan"] + '</a>' +
                        '<ul class=\"dropdown-menu\">' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerLocateOldBatch"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerNewBatch"] + '</a></li>' +
                            '<li class=\"divider\"></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerScanSinglePg"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerContinuous"] + '</a></li>' +
                            '<li class=\"divider\"></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerStartDiskProc"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerStopDiskProc"] + '</a></li>' +
                        '</ul>' +
                    '</li>' +
                    '<li class=\"dropdown-submenu\">' +
                        '<a tabindex=\"-1\" href=\"#\">' + vrScannerRes["mnuJsScannerModify"] + '</a>' +
                        '<ul class=\"dropdown-menu\">' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerReproDiskImg"] + '</a></li>' +
                            '<li><a href=\"#\">' + vrScannerRes["mnuJsScannerRescanImg"] + '</a></li>' +
                        '</ul>' +
                    '</li>' +
                '</ul>' +
            '</li>' +
        '</ul>');

}

/* End : Bind scan menu */