var jsTreeName = '#jstree_demo_div';

$(function () {

    $.ajaxSetup({ cache: false });

    $('#btnUp, #btnDown').attr('disabled', 'disabled');
    // Load Treeview
    $(jsTreeName).jstree({
        "core": {
            "multiple": false,
            "animation": 0,
            "check_callback": true
        },
        plugins: ["types", "contextmenu"], contextmenu: { items: customMenu },
        "types": { "file": { "icon": "glyphicon glyphicon-file" }, "folder": { "icon": "jstree-default-responsive jstree-folder" } }
    }).bind("select_node.jstree", function (event, data) {
        //alert('selected');
        var oNode = data.node.id.split('_');
        var vNodeOrder = oNode[3];
        var vTotal = oNode[4] - 1;

        if (vNodeOrder == "0" && vTotal == "0") {
            $('#btnUp, #btnDown').attr('disabled', 'disabled');
        } else if (vNodeOrder == "0") {
            $('#btnUp').attr('disabled', 'disabled');
            $('#btnDown').removeAttr('disabled');
        } else if (vNodeOrder == vTotal) {
            $('#btnUp').removeAttr('disabled');
            $('#btnDown').attr('disabled', 'disabled');
        } else {
            $('#btnUp').removeAttr('disabled');
            $('#btnDown').removeAttr('disabled');
        }
        if (oNode[1] == "root") {
            $('#btnUp, #btnDown').attr('disabled', 'disabled');
        }
    });
    //Added by Hemin for Bug Fix on 10/19/2016
    $(jsTreeName).on("show_contextmenu.jstree", function (e, data) {
        var oriHeightContxt = $('.vakata-context').height();
        var contxtTop = $('.vakata-context').offset().top;
        var disFromTopOfContxt = contxtTop + oriHeightContxt;
        var footHeight = $('.main-footer').height();
        var disFootFromTop = $('.main-footer').offset().top;
        var diffBetElements = disFootFromTop - disFromTopOfContxt;
        var updatedTop = contxtTop - footHeight;
        if (diffBetElements <= 0) {
            $('.vakata-context').css("top", updatedTop + 'px');
        }
    });

    // Node open close event changed icon
    //$(jsTreeName).on('open_node.jstree', function (e, data) { data.instance.set_icon(data.node, "glyphicon glyphicon-folder-open"); });
    //$(jsTreeName).on('close_node.jstree', function (e, data) { data.instance.set_icon(data.node, "glyphicon glyphicon-folder-close"); });

    //$(jsTreeName).on('close_node.jstree', function (e, data) { data.instance.set_icon(data.node, "jstree-default-responsive jstree-folder"); });

    $("#btnUp").on('click', function (e) {
        var oNode = $(jsTreeName).jstree(true).get_selected('full', true)[0];
        var vNodeId = oNode.id;
        var vParentNodeId = oNode.parent;
        ChangeNodeOrder(vNodeId, vParentNodeId, 'U');
    });

    $("#btnDown").on('click', function (e) {
        var oNode = $(jsTreeName).jstree(true).get_selected('full', true)[0];
        var vNodeId = oNode.id;
        var vParentNodeId = oNode.parent;
        ChangeNodeOrder(vNodeId, vParentNodeId, 'D');
    });

    // Start: validation for add workgroup
    $('#frmNewWorkGroup').validate({
        rules: {
            WorkGroupName: { required: true, minlength: 3 }
        },
        ignore: ":hidden:not(select)",
        messages: {
            WorkGroupName: { required: "", minlength: vrDatabaseRes["msgJsMapMin3CharValidation"] }
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
    // End: validation for add workgroup

    // Start : Add WorkGroup
    $("#btnSaveWorkGroup").on('click', function (e) {
        var $form = $('#frmNewWorkGroup');
        if ($form.valid()) {
            var vWorkGroupName = $('#WorkGroupName').val();
            var vPrntOrgId = $('#TabsetParentId').val();
            var vTabsetsId = $('#TabsetsId').val() == "" ? 0 : $('#TabsetsId').val();
            $.post(urls.Map.SetNewWorkgroup, { pWorkGroupName: vWorkGroupName, pTabsetsId: vTabsetsId })
                .done(function (response) {
                    showAjaxReturnMessage(response.message, response.errortype);
                    if (response.errortype == 's') {
                        if (vTabsetsId <= 0) {
                            var position = 'last';//"last"
                            jQuery(jsTreeName).jstree(true).create_node(vPrntOrgId, { text: vWorkGroupName, id: response.tabsetId, state: "open" }, position, null, true);
                           // $(jsTreeName).jstree("refresh");
                            RedirectOnAccordian(urls.Admin.LoadMapView);
                            $("#mdlAddNewWorkGroup").HideModel();
                            $('.modal-backdrop').remove();
                        }
                    }
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                    $('.modal-backdrop').remove();
                });
        }
    });
    // End : Add WorkGroup

    // Start: validation for add table 
    $('#frmNewTable').validate({
        rules: {
            ddlDatabaseList: { required: true },
            TableName: { required: true, minlength: 3 },
            InternalName: { required: true, tableNameNotbeginWith: true, minlength: 3 },
            UniqueField: { required: true, idFieldNotbeginWith: true },
            ddlFieldTypeList: { required: true },
            //FieldLength: "idFieldLengthValidation",
            FieldLength: { required: true }
        },
        ignore: ":hidden:not(select)",
        messages: {
            ddlDatabaseList: { required: "" },
            TableName: { required: "", minlength: vrDatabaseRes["msgJsMapMin3CharValidation"] },
            InternalName: { required: "", tableNameNotbeginWith: vrDatabaseRes["msgJsMapInternalNameNotBeginWith"], minlength: vrDatabaseRes["msgJsMapMin3CharValidation"] },
            UniqueField: { required: "", idFieldNotbeginWith: vrDatabaseRes["msgJsMapUniqueNotBeginWith"] },
            ddlFieldTypeList: { required: "" },
            FieldLength: { required: "" }
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
    // End: validation for add table

    // Start : Add Table
    $("#btnSaveTable").on('click', function (e) {
        var $form = $('#frmNewTable');
        if ($form.valid()) {
            //var vTabsetsId = $('#TabsetsId').val() == "" ? 0 : $('#TabsetsId').val();

            var vDatabaseName = $('#ddlDatabaseList').val();
            var vUserName = $('#TableName').val();
            var vTableName = $('#InternalName').val();
            var vUniqueField = $('#UniqueField').val();
            var vFieldType = $('#ddlFieldTypeList').val();
            var vFieldLength = $('#FieldLength').val();
            var vParentNodeId = $('#ParentId').val();
            var vNodeLevel = $('#NodeLevel').val();
            var vPrntOrgId = $('#ParentId').val();
            var vNodeId = $('#ParentId').val().split('_');
            vParentNodeId = vNodeId[2];
            $.post(urls.Map.SetNewTable, { pParentNodeId: vParentNodeId, pDatabaseName: vDatabaseName, pTableName: vTableName, pUserName: vUserName, pIdFieldName: vUniqueField, pFieldType: vFieldType, pFieldSize: vFieldLength, pNodeLevel: vNodeLevel })
                .done(function (response) {
                    showAjaxReturnMessage(response.message, response.errortype);
                    if (response.errortype == 's') {
                        $("#mdlAddNewTable").HideModel();
                        RedirectOnAccordian(urls.Admin.LoadMapView);
                        if ($("#ulTable .mCSB_container").length > 0) {
                            $("#ulTable .mCSB_container").prepend('<li style="cursor:pointer"><a id="' + vTableName + '" onclick="javascript:loadTabData(event,$(this));" name="' + response.nodeId.split('_')[2] + '">' + vUserName + '</a></li>');
                        }
                        $("#ulViews").prepend('<li class="hasSubs"><a href="javascript:;" id="AL_' + vTableName + '_' + response.nodeId.split('_')[2] + '" onclick="RootItemClick(\'AL_' + vTableName + '_' + response.nodeId.split('_')[2] + '\')">' + vTableName + '</a><ul><li><a id="FAL_' + response.viewIdTemp + '" onclick="ChildItemClick(\'treeViews\',\'AL_' + vTableName + '_' + response.nodeId.split('_')[2] + '\',\'FAL_' + response.viewIdTemp + '\')">All ' + vTableName + '</a></li></ul></li>');
                        
                    }
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
        }
    });
    // End : Add Table

    // Start: validation for add table 
    $('#frmAttachTable').validate({
        rules: {
            ExistingTables: { required: true }
        },
        ignore: ":hidden:not(select)",
        messages: {
            ExistingTables: { required: "" }
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
    // End: validation for add table

    // Start : Add Table
    $("#btnSaveAttachTable").on('click', function (e) {
        var $form = $('#frmAttachTable');
        if ($form.valid()) {

            var vNodeId = $('#ParentId').val().split('_');
            var vExistingTables = $('#ExistingTables').val();
            var vParentTableId = $('#ParentId').val().indexOf('Tabletabs') == -1 && $('#ParentId').val().indexOf('RelShips') == -1 ? 0 : vNodeId[2];
            var iTabSetId = $('#ParentId').val().indexOf('Tabsets') == -1 ? 0 : vNodeId[2];
            var conbinval = vParentTableId + "#" + vExistingTables;

            $.post(urls.Map.SetAttachTableDetails, { iParentTableId: vParentTableId, iTableId: vExistingTables, iTabSetId: iTabSetId })
                .done(function (response) {
                    if (response.errortype == 's') {
                        RedirectOnAccordian(urls.Admin.LoadMapView);
                        showAjaxReturnMessage(response.message, response.errortype);
                        $("#mdlAttachTable").HideModel();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                    }
                    else if (response.errortype == 'c') {
                        $(this).confirmModal({
                            confirmTitle: vrDatabaseRes['tiJsMapTableAttachConf'],
                            confirmMessage: response.message,
                            confirmOk: vrCommonRes['Yes'],
                            confirmCancel: vrCommonRes['No'],
                            confirmStyle: 'default',
                            confirmCallback: AttachReuseFieldConfYes,
                            confirmCallbackCancel: AttachReuseFieldConfNo,
                            confirmObject: conbinval
                        });
                    }
                    else {
                        showAjaxReturnMessage(response.message, response.errortype);
                    }
                })
            //.fail(function (response) {
            //    showAjaxReturnMessage(response.message, response.errortype);
            //    //ShowErrorMessge();
            //});
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
        }
    });
    // End : Add Table


    // Start: validation for attach Existing table and fields
    $('#frmAttachExistingTable').validate({
        rules: {
            ExistingTablesField: { required: true },
            IdField: { required: true },
            ddlExistingTables: { required: true },
            Fields: { required: true }
        },
        ignore: ":hidden:not(select)",
        messages: {
            ExistingTablesField: { required: "" },
            IdField: { required: "" },
            ddlExistingTables: { required: "" },
            Fields: { required: "" }
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
    // End: validation for attach Existing table and fields

    // Start : Add Existing Table and Fields
    $("#btnSaveAttachExistingTable").on('click', function (e) {
        var $form = $('#frmAttachExistingTable');
        if ($form.valid()) {
            var vNodeId = $('#ParentId').val().split('_');
            var vTableId = $('#ddlExistingTables').val();
            var vParentTableId = $('#ParentId').val().indexOf('Tabletabs') == -1 && $('#ParentId').val().indexOf('RelShips') == -1 ? 0 : vNodeId[2];
            //var iTabSetId = $('#ParentId').val().indexOf('Tabsets') == -1 ? 0 : vNodeId[2]
            var vIdFieldName = $('#Fields').val();

            $.post(urls.Map.SetAttachExistingTableDetails, { iParentTableId: vParentTableId, iTableId: vTableId, sIdFieldName: vIdFieldName })
                .done(function (response) {
                    showAjaxReturnMessage(response.message, response.errortype);
                    if (response.errortype == 's') {
                        RedirectOnAccordian(urls.Admin.LoadMapView);
                        $("#mdlAttachExistingTable").HideModel();
                        $('.modal-backdrop').remove();
                    }
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                    $('.modal-backdrop').remove();
                });
        }
    });
    // End : Add Existing Table and Fields

    //Start : Rename WorkGroup Name
    $(jsTreeName).on("rename_node.jstree", function (e, data) {
        // rename node
        var vRenameOperation = $("#hdnRenameOperation").val();
        if (vRenameOperation == undefined || vRenameOperation == "") {
            $(jsTreeName).jstree("refresh");
            return false;
        }

        if (data.old.toUpperCase() != data.text.toUpperCase()) {

            //if (data.text.trim().length > 30) {
            //    showAjaxReturnMessage('Workgroup name cannot allowed more than 30 characters.', 'e');
            //    $(jsTreeName).jstree("edit", data.node);
            //    return;
            //}
            var vNodeId = data.node.id.split('_');
            var newNode = data.text.trim().replace(/amp;/g, '');

            var lErrorMsg = "<ul>";
            var lhasError = false;
            //if (vRenameOperation == 'T')
            //{
            if (newNode.length < 3 || vRenameOperation == "") {
                lErrorMsg = lErrorMsg + "<li>" + vrDatabaseRes["msgJsMapMin3CharValidation"] + "</li>" + "\n";
                lhasError = true;
            }
            //}

            if (lhasError == true) {
                showAjaxReturnMessage(lErrorMsg + "</ul>", 'w');
                $(jsTreeName).jstree("refresh");
                $(jsTreeName).jstree("edit", data.node);
                return false;
            }
            else {
                $.post(urls.Map.RenameTreeNode, { pPrevNodeName: data.old.trim(), pNewNodeName: newNode, pId: vNodeId[2], pRenameOperation: vRenameOperation })
                   .done(function (response) {
                       if (response.errortype != 's') {
                           $(jsTreeName).jstree("refresh");
                           //$(jsTreeName).jstree("edit", data.node);
                       }
                       else { RedirectOnAccordian(urls.Admin.LoadMapView); }
                       showAjaxReturnMessage(response.message, response.errortype);
                   })
                   .fail(function (xhr, status, error) {
                       ShowErrorMessge();
                       $(jsTreeName).jstree("edit", data.node);
                   });
            }
        }
        return true;
    });

    //End : Rename WorkGroup Name

    // Start : Remove spaces from user name

    $("#InternalName").on('focus', function (e) {
        if ($("#InternalName").val() == "") {
            var vUserName = $("#TableName").val();
            vUserName = vUserName.replace(/\s+/g, '');
            vUserName = vUserName.replace(/[^a-z0-9\s_]/gi, '');//.replace(/[_]/g, '_')
            if (vUserName.length > 19)
                vUserName = $.trim(vUserName).substring(0, 19);
            $("#InternalName").val(vUserName);
        }
    });

    // End : Remove spaces from user name

    // Start : Change Field Type
    $("#ddlFieldTypeList").on('change', function (e) {
        var vFieldType = $(this).find('option:selected').text();
        if (vFieldType.toUpperCase().indexOf('TEXT') != -1)
            $("#FieldLength").attr('readonly', false);
        else {
            $("#FieldLength").val(4);
            $("#FieldLength").attr('readonly', true);
        }
    });
    // End : Change Field Type

    // Start : Change Field Type
    $("#ddlExistingTables").on('change', function (e) {
        var vTableId = $(this).find('option:selected').val();
        if (vTableId != undefined && vTableId != "") {
            var vParentId = $('#ParentId').val().split('_')[2];
            $('#Fields').empty();
            $.post(urls.Map.GetAttachTableFieldsList, { iParentTableId: vParentId, iTableId: vTableId, sCurrIdFieldName: $('#IdField').val() })
            .done(function (response) {
                if (response.errortype == "s") {
                    var pAttachTableFieldsObject = $.parseJSON(response.jsonObject);
                    $(pAttachTableFieldsObject).each(function (i, v) {
                        $('#Fields').append($("<option>", { value: v, html: v }));
                    });
                }
                else {
                    showAjaxReturnMessage(response.message, response.errortype);
                }
            })
            .fail(function (xhr, status, error) {
                ShowErrorMessge();
            });
        }
        else
            $('#Fields').empty();
    });
    // End : Change Field Type
});

jQuery.validator.addMethod('tableNameNotbeginWith', function (value, element) {
    //($.inArray(value.charAt(0), ['_', 0, 1, 2, 13]) !== -1)
    return this.optional(element) || (!value.charAt(0).match(/[0-9_]/));
});

jQuery.validator.addMethod('idFieldNotbeginWith', function (value, element) {
    return this.optional(element) || (!value.charAt(0).match(/[0-9_%]/));
});

function AttachReuseFieldConf(obj, confres) {
    var res = obj.split("#");
    $.post(urls.Map.ConfirmationForAlreadyExistColumn, { iParentTableId: res[0], iTableId: res[1], ConfAns: confres })
        .done(function (response) {
            showAjaxReturnMessage(response.message, response.errortype);
            if (response.errortype == 's') {
                RedirectOnAccordian(urls.Admin.LoadMapView);
                $("#mdlAttachTable").HideModel();
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            }
        })
        .fail(function (xhr, status, error) {
            ShowErrorMessge();
        });
}

function AttachReuseFieldConfYes(obj) {
    AttachReuseFieldConf(obj, true);
}
function AttachReuseFieldConfNo(obj) {
    AttachReuseFieldConf(obj, false);
}

// Call for delete node below WG
function DeleteTableFromTabletab(Id) {
    var res = Id.split("#");
    $.post(urls.Map.DeleteTableFromTableTab, { iTabSetId: res[0], iNewTableSetId: res[1] })
        .done(function (response) {
            showAjaxReturnMessage(response.message, response.errortype);
            if (response.errortype == 's') {
                RedirectOnAccordian(urls.Admin.LoadMapView);
            }
            if ($("#ulTable .mCSB_container").length > 0) {
                $("#ulTable .mCSB_container").find('#' + TableName).parent().remove();
            }
        })
        .fail(function (xhr, status, error) {
            ShowErrorMessge();
        });
}

function DeleteTableFromRelationship(Id) {
    var res = Id.split("#");
    $.post(urls.Map.DeleteTableFromRelationship, { iParentTableId: res[0], iTableId: res[1] })
    .done(function (response) {
        showAjaxReturnMessage(response.message, response.errortype);
        if (response.errortype == 's') {
            RedirectOnAccordian(urls.Admin.LoadMapView);
        }
        var vrTableId = response.iTableId;
        if ($("#ulTable .mCSB_container").length > 0) {
            var lnt = $("#ulTable .mCSB_container").find('a[name=' + vrTableId + ']').length;
            $("#ulTable .mCSB_container").find('a[name=' + vrTableId + ']').parent().remove();
        }
    })
    .fail(function (xhr, status, error) {
        ShowErrorMessge();
    });
}

function AttachTablePopup() {
    var vNodeId = $('#ParentId').val().split('_');

    var vParentTableId = $('#ParentId').val().indexOf('Tabletabs') == -1 && $('#ParentId').val().indexOf('RelShips') == -1 ? 0 : vNodeId[2];
    var iTabSetId = $('#ParentId').val().indexOf('Tabsets') == -1 ? 0 : vNodeId[2];

    $('#ExistingTables').empty();
    $.post(urls.Map.GetAttachTableList, { iParentTableId: vParentTableId, iTabSetId: iTabSetId })
                    .done(function (response) {
                        var pAttachObject = $.parseJSON(response);
                        //$('#ExistingTables').empty();
                        //$('#ExistingTables').append($("<option>", { value: 0, html: "" }));
                        $(pAttachObject).each(function (i, v) {
                            $('#ExistingTables').append($("<option>", { value: v.TableId, html: v.UserName }));
                        });
                        $("#mdlAttachTable").ShowModel();
                    })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });
}

function AttachExistingTablePopup(node) {
    var vNodeId = $('#ParentId').val().split('_');
    var vParentTableId = $('#ParentId').val().indexOf('Tabletabs') == -1 && $('#ParentId').val().indexOf('RelShips') == -1 ? 0 : vNodeId[2];
    var iTabSetId = $('#ParentId').val().indexOf('Tabsets') == -1 ? 0 : vNodeId[2];
    //var vParentTableId = node.parent.split('_')[2]

    $('#ddlExistingTables').empty();
    $('#Fields').empty();
    $("#frmAttachExistingTable").resetControls();
    $.post(urls.Map.LoadAttachExistingTableScreen, { iParentTableId: vParentTableId, iTabSetId: iTabSetId })
                    .done(function (response) {

                        $('#ExistingTablesField').val(response.tableName);
                        $('#IdField').val(response.tableIdColumn);
                        var pAttachObject = $.parseJSON(response.tablesList);
                        $('#ddlExistingTables').append($("<option>", { value: "", html: "" }));
                        $(pAttachObject).each(function (i, v) {
                            $('#ddlExistingTables').append($("<option>", { value: v.TableId, html: v.UserName }));
                        });

                        var pAttachTableFieldsObject = $.parseJSON(response.tableIdColumnList);
                        $('#Fields').append($("<option>", { value: "", html: "" }));
                        $(pAttachTableFieldsObject).each(function (i, v) {
                            $('#Fields').append($("<option>", { value: v, html: v }));
                        });

                        $("#mdlAttachExistingTable").ShowModel();
                    })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });


}

// Add context menu and also visibility settings
function customMenu($node) {
    var tree = $(jsTreeName).jstree(true);
    var items = {
        newWorkgroup: {
            label: vrDatabaseRes["tiMapPartialNewWorkgroup"],
            action: function (obj) {
                $('#frmNewWorkGroup').resetControls();

                $('#WorkGroupName').OnEnterPressSaveButton('btnSaveWorkGroup');

                //$('#WorkGroupName').keypress(function (e) {
                //    var key = e.which;
                //    if (key == 13)  // the enter key code
                //    {
                //        $('input[name = btnSaveWorkGroup]').click();
                //        return false;
                //    }
                //});

                $("#TabsetsId").val(0);
                $('#TabsetParentId').val($node.id);
                $("#WorkGroupName").SomeCharacterNotAllowed(specialChar.WorkGroupSpecialChar);
                $("#mdlAddNewWorkGroup").ShowModel();
            }
        },
        newTable: {
            label: vrDatabaseRes["tiMapPartialNewTable"] + "...",
            action: function (obj) {
                $('#frmNewTable').resetControls();
                var vNodeId = $node.id.split('_');
                if ($node.id.indexOf('Tabsets') != -1) {
                    $('#ParentId').val($node.id);
                    $('#NodeLevel').val(1);
                }
                if ($node.id.indexOf('Tabletabs') != -1 || $node.id.indexOf('RelShips') != -1) {
                    $('#ParentId').val($node.id);
                    $('#NodeLevel').val(2);
                }

                $("#UniqueField").val("Id");
                $("#FieldLength").val(4);
                $("#FieldLength").OnlyNumericWithoutDot();
                $("#ddlFieldTypeList").val("2");
                $("#mdlAddNewTable").ShowModel();
                $("#FieldLength").attr('readonly', true);

                $('#InternalName').bind('copy paste cut', function (e) {
                    e.preventDefault(); //disable cut,copy,paste
                    //showAjaxReturnMessage('cut,copy & paste options are disabled !!', 'w');
                });

                $("#InternalName").SpecialCharactersSpaceNotAllowed();
                $("#UniqueField").SpecialCharactersSpaceNotAllowed();
                //$node = tree.create_node($node);
                //tree.edit($node);
            }
        },
        attachTable: {
            label: vrDatabaseRes["tiMapPartialAttachTable"],
            "submenu": {
                automatic: {
                    label: vrDatabaseRes["msgJsMapAutomatic"],
                    action: function (obj) {
                        $('#ParentId').val($node.id);
                        AttachTablePopup();
                    }
                },
                usingExistingFields: {
                    label: vrDatabaseRes["msgJsMapUsingExistingFields"],
                    action: function (obj) {
                        $('#ParentId').val($node.id);
                        AttachExistingTablePopup($node);
                    }
                }
            },
            action: function (obj) {
                $('#ParentId').val($node.id);
                AttachTablePopup();
            }
        },
        unAttachTable: {
            label: vrDatabaseRes["tiJsMapUnAttachTable"],
            action: function (obj) {
                var vNodeId = $node.id.split('_');
                var vTableId = vNodeId[2];
                //var vParentTableId = $node.id.indexOf('Tabletabs') == -1 && $node.id.indexOf('RelShips') == -1 ? 0 : vNodeId[2]
                var vParentTableId = $node.parent.split('_')[2];
                var vTabSetId = $node.id.indexOf('Tabletabs') == -1 ? 0 : vNodeId[2];
                var vFinalTabSetId = 0;
                $($node.parents).each(function (i, v) {
                    if (v.indexOf('Tabsets') != -1) {
                        vFinalTabSetId = v.split('_')[2];
                    }
                });

                if (vTabSetId > 0) {
                    //Unattach table from WG
                    $.post(urls.Map.GetDeleteTableNames, { iParentTableId: vParentTableId, iTableId: vTableId })
                    .done(function (response) {
                        if (response.errortype == 's') {
                            $(this).confirmModal({
                                confirmTitle: vrDatabaseRes['tiJsMapTableUnAttachConf'],
                                confirmMessage: String.format(vrDatabaseRes['msgJsMapSureToRemoveAttachment'], response.childTable, response.parentTable),
                                //confirmMessage: vrDatabaseRes["msgJsMapSureToRemoveAttachment"] + "\"" + response.childTable + "\" " + vrDatabaseRes["msgJsMapAnd"] + " \"" + response.parentTable + "\"?",
                                confirmOk: vrCommonRes['Yes'],
                                confirmCancel: vrCommonRes['No'],
                                confirmStyle: 'default',
                                confirmCallback: DeleteTableFromTabletab,
                                confirmObject: vTabSetId + '#' + vFinalTabSetId
                            });
                        }

                    })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });
                }
                else {
                    $.post(urls.Map.DeleteTable, { iParentTableId: vParentTableId, iTableId: vTableId })
                    .done(function (response) {

                        if (response.errortype == 'w') {
                            $(this).confirmModal({
                                confirmTitle: vrDatabaseRes['tiJsMapUnAttachTableDependancyWarning'],
                                confirmMessage: response.message,
                                confirmOk: vrCommonRes['Ok'],
                                confirmStyle: 'default',
                                confirmOnlyOk: true
                            });
                        } else if (response.errortype == 'c') {
                            $(this).confirmModal({
                                confirmTitle: vrDatabaseRes['tiJsMapTableUnAttachConf'],
                                confirmMessage: response.message,
                                confirmOk: vrCommonRes['Yes'],
                                confirmCancel: vrCommonRes['No'],
                                confirmStyle: 'default',
                                confirmCallback: DeleteTableFromRelationship,
                                confirmObject: vParentTableId + "#" + vTableId
                            });
                        }
                        else
                            showAjaxReturnMessage(response.message, response.errortype);
                    })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });
                }
            }
        },
        renameTable: {
            label: vrDatabaseRes["lblJsMapRenameTable"],
            action: function (obj) {
                $("#hdnRenameOperation").val('T');
                var vnode = $node;
                vnode.text = vnode.text.replace(/amp;/g, '');
                tree.edit(vnode);
                $('.jstree-rename-input').attr('maxlength', '50');
                $('.jstree-rename-input').SomeCharacterNotAllowed(specialChar.WorkGroupSpecialChar);
            }
        },
        removeWorkgroup: {
            label: vrDatabaseRes["lblJsMapRemoveWorkGroup"],
            action: function (obj) {
                $(this).confirmModal({
                    confirmTitle: vrDatabaseRes['tiJsMapRemoveConfMSG'],
                    confirmMessage: vrDatabaseRes['msgJsMapSureToDeleteWorkGroup'],
                    confirmOk: vrCommonRes['Yes'],
                    confirmCancel: vrCommonRes['No'],
                    confirmStyle: 'default',
                    confirmCallback: RemoveWorkGroup,
                    confirmObject: $node
                });

            }
        },
        renameWorkgroup: {
            label: vrDatabaseRes["lblJsMapRenameWorkGroup"],
            action: function (obj) {
                $("#hdnRenameOperation").val('W');
                tree.edit($node);
                $('.jstree-rename-input').attr('maxlength', '30');
                $('.jstree-rename-input').SomeCharacterNotAllowed(specialChar.WorkGroupSpecialChar);
                //alert("New Workgroup");
            }
        },
        renameApplication: {
            label: vrDatabaseRes["lblJsMapRenameApplication"],
            action: function (obj) {
                $("#hdnRenameOperation").val('A');
                tree.edit($node);
                $('.jstree-rename-input').attr('maxlength', '50');
                $('.jstree-rename-input').SomeCharacterNotAllowed(specialChar.WorkGroupSpecialChar);
            }
        },
        expandAll: {
            separator_before: true,
            label: vrDatabaseRes["lblJsMapExpandAll"],
            action: function (obj) {
                $(jsTreeName).jstree("open_all");
            }
        },
        expandAllChildren: {
            label: vrDatabaseRes["lblJsMapExpandAllChildren"],
            action: function (obj) {
                $(jsTreeName).jstree("open_all", $node.id);
                //var child = jQuery.jstree._reference(jsTreeName)._get_children($node.id)
                //$("jsTreeName).jstree("open_node", $node.id, false, true);
            }
        },
        collapseAll: {
            label: vrDatabaseRes["lblJsMapCollapseAll"],
            action: function (obj) {
                $(jsTreeName).jstree("close_all");
            }
        },
        collapseAllChildren: {
            label: vrDatabaseRes["lblJsMapCollapseAllChildren"],
            action: function (obj) {
                $(jsTreeName).jstree("close_all", $node.id);
            }
        }
    };
    /*
    var trueprent = $node.parents.length;
    var tre1 = $node.children.length;
    var child = jQuery.jstree.reference(jsTreeName)._cnt
    */
    //if ($node.attr('id').indexOf('root') != -1) {
    if ($node.id.indexOf('root') != -1) {

        delete items.newTable;
        delete items.attachTable;
        delete items.unAttachTable;
        delete items.renameTable;
        delete items.removeWorkgroup;
        delete items.renameWorkgroup;
        if ($node.children.length > 0) {
            items.expandAllChildren._disabled = true;
            items.expandAll._disabled = true;
            items.collapseAllChildren._disabled = true;
            if (!$('#' + $node.children[0]).is(':visible')) {
                items.collapseAll._disabled = true;
            }
            for (i = 1; i <= $node.children_d.length ; i++) {
                if (!$('#' + $node.children_d[i - 1]).is(':visible')) {
                    items.expandAll._disabled = false;
                    break;
                }
            }
        }
        //items.expandAllChildren._disabled = true;
        //items.collapseAllChildren._disabled = true;
    } else if ($node.id.indexOf('Tabsets') != -1) {
        delete items.newWorkgroup;
        delete items.unAttachTable;
        delete items.renameTable;
        delete items.attachTable.submenu.automatic;
        delete items.attachTable.submenu.usingExistingFields;
        delete items.renameApplication;

        if ($node.children.length > 0)
            items.removeWorkgroup._disabled = true;

        IsChildNodeVisible($node, items);

    } else if ($node.id.indexOf('Tabletabs') != -1 || $node.id.indexOf('RelShips') != -1) {
        delete items.newWorkgroup;
        delete items.removeWorkgroup;
        delete items.renameWorkgroup;
        delete items.renameApplication;
        //items.expandAllChildren._disabled = true;
        IsChildNodeVisible($node, items);

       
    }
    return items;
}



function IsChildNodeVisible($node,items) {
    if ($node.children.length > 0) {
        items.expandAllChildren._disabled = true;
        if (!$('#' + $node.children[0]).is(':visible')) {
            items.collapseAllChildren._disabled = true;
        }
        for (i = 1; i <= $node.children_d.length ; i++) {
            if (!$('#' + $node.children_d[i - 1]).is(':visible')) {
                items.expandAllChildren._disabled = false;
                break;
            }
        }
    } else {
        items.expandAllChildren._disabled = true;
        items.collapseAllChildren._disabled = true;
    }

    items.expandAll._disabled = true;
    for (i = $node.parents.length; i >= 1; i--) {
        if ($node.parents[i - 1].indexOf('root') != -1) {
            var RootNode = $(jsTreeName).jstree(true).get_node($node.parents[i - 1]);
            for (i = 1; i <= RootNode.children_d.length ; i++) {
                if (!$('#' + RootNode.children_d[i - 1]).is(':visible')) {
                    items.expandAll._disabled = false;
                    break;
                }
            }
            break;
        }
    }
    return items;
}

function ChangeNodeOrder(node, parentnode, action) {
    var oNode = node.split('_');
    var vTableId = oNode[2];
    var vParentTableId = parentnode.split('_')[2];
    $.post(urls.Map.ChangeNodeOrder, { pUpperTableId: vParentTableId, pTableName: oNode[1], pTableId: vTableId, pAction: action }, function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        if (data.errortype == 's')
            RedirectOnAccordian(urls.Admin.LoadMapView);
        //$.jstree.reference(jsTreeName).delete_node(node)
    });
}

function RemoveWorkGroup(node) {
    var vTabsetsId = node.id.split('_')[2];
    var vNodeText = node.text;
    $.post(urls.Map.RemoveNewWorkgroup, { pTabsetsId: vTabsetsId }, function (data) {
        showAjaxReturnMessage(data.message, data.errortype);
        if (data.errortype == 's')
            $.jstree.reference(jsTreeName).delete_node(node);
    });
}

function customMenu1($node) {
    var tree = $(jsTreeName).jstree(true);
    return {
        "Create": {
            "separator_before": false,
            "separator_after": false,
            "label": "\"" + vrCommonRes["Create"] + "\"",
            "action": function (obj) {
                $node = tree.create_node($node);
                tree.edit($node);
            }
        },
        "Rename": {
            "separator_before": false,
            "separator_after": false,
            "label": "\"" + vrCommonRes["Rename"] + "\"",
            "action": function (obj) {
                tree.edit($node);
            }
        },
        "Remove": {
            "separator_before": false,
            "separator_after": false,
            "label": "\"" + vrCommonRes["Remove"] + "\"",
            "action": function (obj) {
                tree.delete_node($node);
            }
        }
    };
}


//$(jsTreeName).on("changed.jstree", function (e, data) {
//    ;
//    console.log(data.selected);
//});
//$('button').on('click', function () {
//    $('#jstree').jstree(true).select_node('child_node_1');
//    $('#jstree').jstree('select_node', 'child_node_1');
//    $.jstree.reference('#jstree').select_node('child_node_1');
//});

//$(jsTreeName).delegate("a", "click", function (e) {
//    $(jsTreeName).jstree("open_node", this);
//      e.preventDefault();
//      return false;
//    });

//$(jsTreeName).on('create_node.jstree', function (e, data) {
//    console.log('hi', data);
//});

//$(jsTreeName).on("rename_node.jstree", function (e, data) {
//    // rename node
//    alert('rename: ');
//});

//$('#jstree').jstree(true).select_node('child_node_1');
//$('#jstree').jstree('select_node', 'child_node_1');
//$.jstree.reference('#jstree').select_node('child_node_1');