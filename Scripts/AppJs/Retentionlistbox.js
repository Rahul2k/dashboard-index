; (function ($, window, document, undefined) {
    // Create the defaults once
    var pluginName = 'RetentionbootstrapDualListbox',
      defaults = {
          bootstrap2Compatible: false,
          filterTextClear: 'show all',
          filterPlaceHolder: 'Filter',
          moveSelectedLabel: vrRetentionRes["lblRetentionPartialMoveSel"],
          moveAllLabel: vrRetentionRes["lblRetentionPartialMoveAll"],
          removeSelectedLabel: vrRetentionRes["lblRetentionPartialRemvSel"],
          removeAllLabel: vrRetentionRes["lblRetentionPartialRemvAll"],
          moveOnSelect: true,                                                                 // true/false (forced true on androids, see the comment later)
          preserveSelectionOnMove: false,                                                     // 'all' / 'moved' / false
          selectedListLabel: false,                                                           // 'string', false
          nonSelectedListLabel: false,                                                        // 'string', false
          helperSelectNamePostfix: '_helper',                                                 // 'string_of_postfix' / false
          selectorMinimalHeight: 100,
          showFilterInputs: true,                                                             // whether to show filter inputs
          nonSelectedFilter: '',                                                              // string, filter the non selected options
          selectedFilter: '',                                                                 // string, filter the selected options
          infoText: vrRetentionRes["lblRetentionPartialShowingAll"] + ' {0}',                                                        // text when all options are visible / false for no info text
          infoTextFiltered: '<span class="label label-warning">' + vrRetentionRes["lblRetentionPartialFiltered"] + '</span> {0} ' + vrCommonRes["From"].toLowerCase() + ' {1}', // when not all of the options are visible due to the filter
          infoTextEmpty: vrRetentionRes["lblRetentionPartialEmptyList"],                                                        // when there are no options present in the list
          filterOnValues: false,                                                               // filter by selector's values, boolean
          multipleSelection: true
      },
      // Selections are invisible on android if the containing select is styled with CSS
      // http://code.google.com/p/android/issues/detail?id=16922
      isBuggyAndroid = /android/i.test(navigator.userAgent.toLowerCase());

    // The actual plugin constructor
    function RetentionBootstrapDualListbox(element, options) {
        this.element = $(element);
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    function triggerChangeEvent(dualListbox) {
        dualListbox.element.trigger('change');
    }
    function updateSelectionStates(dualListbox) {
        dualListbox.element.find('option').each(function (index, item) {
            var $item = $(item);
            if (typeof ($item.data('original-index')) === 'undefined') {
                $item.data('original-index', dualListbox.elementCount++);
            }
            if (typeof ($item.data('_selected')) === 'undefined') {
                $item.data('_selected', false);
            }
        });
    }
    function changeSelectionState(dualListbox, original_index, selected) {
        dualListbox.element.find('option').each(function (index, item) {
            var $item = $(item);
            if ($item.data('original-index') === original_index) {
                $item.prop('selected', selected);
            }
        });
    }
    function formatString(s, args) {
        return s.replace(/\{(\d+)\}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }
    function refreshInfo(dualListbox) {
        if (!dualListbox.settings.infoText) {
            return;
        }
        var visible1 = dualListbox.elements.select1.find('option').length,
          visible2 = dualListbox.elements.select2.find('option').length,
          all1 = dualListbox.element.find('option').length - dualListbox.selectedElements,
          all2 = dualListbox.selectedElements,
          content = '';

        if (all1 === 0) {
            content = dualListbox.settings.infoTextEmpty;
        } else if (visible1 === all1) {
            content = formatString(dualListbox.settings.infoText, [visible1, all1]);
        } else {
            content = formatString(dualListbox.settings.infoTextFiltered, [visible1, all1]);
        }
        dualListbox.elements.info1.html(content);
        dualListbox.elements.box1.toggleClass('filtered', !(visible1 === all1 || all1 === 0));
        if (all2 === 0) {
            content = dualListbox.settings.infoTextEmpty;
        } else if (visible2 === all2) {
            content = formatString(dualListbox.settings.infoText, [visible2, all2]);
        } else {
            content = formatString(dualListbox.settings.infoTextFiltered, [visible2, all2]);
        }

        dualListbox.elements.info2.html(content);
        dualListbox.elements.box2.toggleClass('filtered', !(visible2 === all2 || all2 === 0));
    }
    function refreshSelects(dualListbox) {
        dualListbox.selectedElements = 0;
        dualListbox.elements.select1.empty();
        dualListbox.elements.select2.empty();
        dualListbox.element.find('option').each(function (index, item) {
            var $item = $(item);
            if ($item.prop('selected')) {
                dualListbox.selectedElements++;
                dualListbox.elements.select2.append($item.clone(true).prop('selected', $item.data('_selected')));
            } else {
                dualListbox.elements.select1.append($item.clone(true).prop('selected', $item.data('_selected')));
            }
        });
        if (dualListbox.settings.showFilterInputs) {
            filter(dualListbox, 1);
            filter(dualListbox, 2);
        }
        refreshInfo(dualListbox);
    }
    function filter(dualListbox, selectIndex) {
        if (!dualListbox.settings.showFilterInputs) {
            return;
        }
        saveSelections(dualListbox, selectIndex);
        dualListbox.elements['select' + selectIndex].empty().scrollTop(0);
        var regex = new RegExp($.trim(dualListbox.elements['filterInput' + selectIndex].val()), 'gi'),
          options = dualListbox.element;

        if (selectIndex === 1) {
            options = options.find('option').not(':selected');
        } else {
            options = options.find('option:selected');
        }
        options.each(function (index, item) {
            var $item = $(item),
              isFiltered = true;
            if (item.text.match(regex) || (dualListbox.settings.filterOnValues && $item.attr('value').match(regex))) {
                isFiltered = false;
                dualListbox.elements['select' + selectIndex].append($item.clone(true).prop('selected', $item.data('_selected')));
            }
            dualListbox.element.find('option').eq($item.data('original-index')).data('filtered' + selectIndex, isFiltered);
        });
        refreshInfo(dualListbox);
    }
    function saveSelections(dualListbox, selectIndex) {
        dualListbox.elements['select' + selectIndex].find('option').each(function (index, item) {
            var $item = $(item);
            dualListbox.element.find('option').eq($item.data('original-index')).data('_selected', $item.prop('selected'));
        });
    }
    function sortOptions(select) {
        select.find('option').sort(function (a, b) {
            return ($(a).data('original-index') > $(b).data('original-index')) ? 1 : -1;
        }).appendTo(select);
    }
    function clearSelections(dualListbox) {
        dualListbox.elements.select1.find('option').each(function () {
            dualListbox.element.find('option').data('_selected', false);
        });
    }
    function move(dualListbox) {
        //alert("Inside move(dualListbox) method....");
        if (dualListbox.settings.preserveSelectionOnMove === 'all' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
            saveSelections(dualListbox, 2);
        } else if (dualListbox.settings.preserveSelectionOnMove === 'moved' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
        }
        dualListbox.elements.select1.find('option:selected').each(function (index, item) {
            var $item = $(item);
            if (!$item.data('filtered1')) {
                changeSelectionState(dualListbox, $item.data('original-index'), true);
            }
        });
        refreshSelects(dualListbox);
        triggerChangeEvent(dualListbox);
        sortOptions(dualListbox.elements.select2);
    }
    function checkSelectedList(dualListbox, selectIndex) {
        var vSelectedCount = dualListbox.elements['select' + selectIndex].find('option:selected').length;
        if (vSelectedCount != undefined) {
            if (vSelectedCount > 1 || vSelectedCount <= 0) {
                showAjaxReturnMessage(vrRetentionRes["msgJsRetentionlistboxPlzSelOnly1Itm"], 'w');
                return false;
            }
            else {
                return true;
            }
        }
        else { return false; }
    }
    function remove(dualListbox) {
        if (dualListbox.settings.preserveSelectionOnMove === 'all' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
            saveSelections(dualListbox, 2);
        } else if (dualListbox.settings.preserveSelectionOnMove === 'moved' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 2);
        }
        dualListbox.elements.select2.find('option:selected').each(function (index, item) {
            var $item = $(item);
            if (!$item.data('filtered2')) {
                changeSelectionState(dualListbox, $item.data('original-index'), false);
            }
        });
        refreshSelects(dualListbox);
        triggerChangeEvent(dualListbox);
        sortOptions(dualListbox.elements.select1);
    }
    function moveAll(dualListbox) {
        if (dualListbox.settings.preserveSelectionOnMove === 'all' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
            saveSelections(dualListbox, 2);
        } else if (dualListbox.settings.preserveSelectionOnMove === 'moved' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
        }
        dualListbox.element.find('option').each(function (index, item) {
            var $item = $(item);
            if (!$item.data('filtered1')) {
                $item.prop('selected', true);
            }
        });
        refreshSelects(dualListbox);
        triggerChangeEvent(dualListbox);
    }
    function removeAll(dualListbox) {
        if (dualListbox.settings.preserveSelectionOnMove === 'all' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
            saveSelections(dualListbox, 2);
        } else if (dualListbox.settings.preserveSelectionOnMove === 'moved' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 2);
        }
        dualListbox.element.find('option').each(function (index, item) {
            var $item = $(item);
            if (!$item.data('filtered2')) {
                $item.prop('selected', false);
            }
        });
        refreshSelects(dualListbox);
        triggerChangeEvent(dualListbox);
    }
    function bindEvents(dualListbox) {
        dualListbox.elements.form.submit(function (e) {
            if (dualListbox.elements.filterInput1.is(':focus')) {
                e.preventDefault();
                dualListbox.elements.filterInput1.focusout();
            } else if (dualListbox.elements.filterInput2.is(':focus')) {
                e.preventDefault();
                dualListbox.elements.filterInput2.focusout();
            }
        });
        dualListbox.element.on('RetentionbootstrapDualListbox.refresh', function (e, mustClearSelections) {
            dualListbox.refresh(mustClearSelections);
        });
        dualListbox.elements.filterClear1.on('click', function () {
            dualListbox.setNonSelectedFilter('', true);
        });
        dualListbox.elements.filterClear2.on('click', function () {
            dualListbox.setSelectedFilter('', true);
        });
        dualListbox.elements.moveButton.on('click', function () {
            //alert('move');
            var vmultipleSelection = dualListbox.settings.multipleSelection;
            if (vmultipleSelection == false) {
                if (checkSelectedList(dualListbox, 1) == true) {
                    GetRetentionPropertiesData('n', dualListbox);
                }
            }
            else
                move(dualListbox);
        });
        dualListbox.elements.moveAllButton.on('click', function () {
            moveAll(dualListbox);
        });
        $("#btnRetentionProperties").on('click', function (e) {
            //alert($('select[name="duallistbox_demo2_helper2"] option:selected').text() + ' : ' + $('#bootstrap-duallistbox-selected-list_duallistbox_demo2 option:selected').text() + ' = ' + $('select[name="duallistbox_demo2_helper2"]').val() + ' = ' + $('select[name="duallistbox_demo2_helper2"]').text());
            //var selectObject = $('select[name="duallistbox_demo2_helper2"] option:selected');
            //console.log("Inside btnRetentionProperties method...");
            GetRetentionPropertiesData('s', dualListbox);
        });
        dualListbox.elements.removeButton.on('click', function () {
            var selectedTbls = $('#bootstrap-duallistbox-selected-list_duallistbox_Retention option:selected');
            var vTableIds = [];
            selectedTbls.each(function (i, v) {
                vTableIds.push(v.value);
            });
            removeTableFromList(vTableIds, 1, dualListbox);
        });
        dualListbox.elements.removeAllButton.on('click', function () {
            var vTableIds = $('#SelectRetentionTableName').val();
            removeTableFromList(vTableIds, 2, dualListbox);
        });
        dualListbox.elements.filterInput1.on('change keyup', function () {
            filter(dualListbox, 1);
        });
        dualListbox.elements.filterInput2.on('change keyup', function () {
            filter(dualListbox, 2);
        });
    }
    function RetentionPropertiesChildInclude(dualListbox) {
        SetRetentionPropertiesDetails('Y', dualListbox);
    }
    function RetentionPropertiesChildNotInclude(dualListbox) {
        SetRetentionPropertiesDetails('N', dualListbox);
    }
    function SetRetentionPropertiesDetails(vtype, dualListbox, vInActivity, vAssignment, vDisposition, vDefaultRetentionId, vRelatedTable, vRetentionCode, vDateOpened, vDateClosed, vDateCreated, vOtherDate) {        
        var vTableId = "";
        if (vtype == 'Y') {
            vTableId = $('#bootstrap-duallistbox-selected-list_duallistbox_Retention option:selected').val();
            //console.log("Inside SetRetentionProp Details SELECTED: "+vTableId);
        }
        else {
            vTableId = $('#bootstrap-duallistbox-nonselected-list_duallistbox_Retention option:selected').val();
            //console.log("Inside SetRetentionProp Details NON-SELECTED: " + vTableId);
        }

        //alert(vTableId);

        $.post(urls.Retention.SetRetentionTblPropData, { pTableId: vTableId, pInActivity: vInActivity, pAssignment: vAssignment, pDisposition: vDisposition, pDefaultRetentionId: vDefaultRetentionId, pRelatedTable: vRelatedTable, pRetentionCode: vRetentionCode, pDateOpened: vDateOpened, pDateClosed: vDateClosed, pDateCreated: vDateCreated, pOtherDate: vOtherDate })
           .done(function (response) {
               if (response.errortype == 's') {
                   move(dualListbox);

                   if (response.msgVerifyRetDisposition != "") {
                       $(this).confirmModal({
                           confirmTitle: 'TAB FusionRMS',
                           confirmMessage: response.msgVerifyRetDisposition,
                           confirmOk: vrCommonRes['Ok'],
                           confirmStyle: 'default',
                           confirmOnlyOk: true,           //Modified by Hemin on 12/15/2016        
                           //confirmObject: vtype,
                           confirmCallback: HideAndReloadDuallistBox
                           //confirmCallbackCancel: HideAndReloadDuallistBox    //Modified by Hemin on 12/15/2016
                       });
                   }
                   else {
                       //console.log("Inside else part .... ");
                       if (vtype === "N"){
                           showAjaxReturnMessage(vrRetentionRes["msgJsRetentionPropSavedSuccess"], 's');
                       } else {
                           showAjaxReturnMessage(vrRetentionRes["msgJsRetentionPropUpdateSuccess"], 's');
                       }

                       $('#mdlTblRetentionProperties').resetControls();
                       $('#mdlTblRetentionProperties').HideModel();
                       $('.eItems').RetentionbootstrapDualListbox('refresh', true);
                   }
               }
           })
           .fail(function (xhr, status, error) {
               ShowErrorMessge();
           });

    }
    function HideAndReloadDuallistBox() {
        //alert("Inside HideAndReloadDuallistBox.... ");
        //console.log("vType from HideAndReloadDuallistBox: " + vType);
        showAjaxReturnMessage(vrRetentionRes["msgJsRetentionPropUpdateSuccess"], 's');

        $('#mdlTblRetentionProperties').resetControls();
        $('#mdlTblRetentionProperties').HideModel();
        $('.eItems').RetentionbootstrapDualListbox('refresh', true);
    }
    function GetRetentionPropertiesData(selectType, dualListbox) {
        var saveFlag = 'Y';
        var IsRelatedTblEnabled = false;
        var selectObject;
        if (selectType == 's') {
            selectObject = $('#bootstrap-duallistbox-selected-list_duallistbox_Retention option:selected');
            saveFlag = 'Y';
        }
        else {
            selectObject = $('#bootstrap-duallistbox-nonselected-list_duallistbox_Retention option:selected');
            saveFlag = 'N';
        }

        var tableName = selectObject.text();
        if (selectObject.length == 1) {
            $.post(urls.Retention.GetRetentionPropertiesData, { pTableId: selectObject.val() == null || selectObject.val() == undefined ? -1 : selectObject.val() })
                .done(function (data) {
                    if (data.errortype == 's') {
                        var tableEntityJson = $.parseJSON(data.tableEntity);
                        var pRetentionCodes = $.parseJSON(data.pRetentionCodes);
                        //console.log("TrackingTable value: " + typeof tableEntityJson.TrackingTable);
                        if (tableEntityJson.TrackingTable != 1) {
                            $('#divLoadRetentionProp').empty();
                            $('#divLoadRetentionProp').load(urls.Retention.LoadRetentionPropView, function () {
                                $('#mdlTblRetentionProperties').ShowModel();
                                $("#retentionPropName").text("");
                                $("#retentionPropName").text(tableName);
                                GetRetentionCodeList(pRetentionCodes);

                                //Set Permanent Archive based on Trackable status.
                                $("#lblPermanentArchive").val("");
                                if (data.bTrackable) {//Changed from tableEntityJson.Trackable to based on 'Transfer' permission. - 15/12/2015 By Ganesh.
                                    $("#lblPermanentArchive").text(vrRetentionRes["lblJsRetentionlistboxRecsRMarkedArchive"]);
                                    $("input[name=disposition][value= '1']").removeAttr('disabled');
                                }
                                else {
                                    $("#lblPermanentArchive").text(vrRetentionRes["lblJsRetentionlistboxMustBDefAsTracking"]);
                                    $("input[name=disposition][value= '1']").attr('disabled', 'disabled');
                                }

                                $("input[name=disposition][value=" + tableEntityJson.RetentionFinalDisposition + "]").attr('checked', 'checked');
                                $("input[name=assignment][value=" + tableEntityJson.RetentionAssignmentMethod + "]").prop('checked', true).change();

                                $("#chkInactivity").prop("checked", tableEntityJson.RetentionInactivityActive);
                                $("#lstRetentionCodes").val(tableEntityJson.DefaultRetentionId);
                                var pRetIdsObject = $.parseJSON(data.RetIdFieldsList);
                                var pRetDateObject = $.parseJSON(data.RetDateFieldsList);
                                $('#lstFieldRetentionCode').empty();
                                $("#lstFieldDateOpened").empty();
                                $("#lstFieldDateClosed").empty();
                                $("#lstFieldDateCreated").empty();
                                $("#lstFieldOtherDate").empty();
                                $('#lstRelatedTables').empty();

                                var jsonRelatedTblObj = $.parseJSON(data.relatedTblObj);
                                //$('#lstRelatedTables').append($("<option>", { value: "", html: "" }));

                                $(jsonRelatedTblObj).each(function (i, v) {
                                    $('#lstRelatedTables').append($("<option>", { value: jsonRelatedTblObj[i].TableName, html: jsonRelatedTblObj[i].UserName }));
                                    IsRelatedTblEnabled = true;
                                });
                                //Added by Ganesh - SEP 24
                                if (IsRelatedTblEnabled)
                                    $("input[name=assignment][value= '2']").removeAttr('disabled');

                                if (!$("#chkInactivity").is(":checked") & $('input:radio[name=disposition]:checked').val() == 0) {
                                    disbleRetentionPropFields();
                                }
                                else {
                                    enableRetentionPropFields();
                                }

                                if ($("input:radio[name='assignment']:checked").val() == 2) {
                                    $("#lstRelatedTables").removeAttr('disabled', 'disabled');
                                    $("#lstRetentionCodes").attr('disabled', 'disabled');
                                }

                                //Changes made on 15/12/2015.
                                if (($("input[name=assignment][value= '0']").is(':enabled') && $("input[name=assignment][value= '1']").is(':enabled')) & ($("input:radio[name='assignment']:checked").val() == 0 || $("input:radio[name='assignment']:checked").val() == 1)) {
                                    $("#lstRelatedTables").attr('disabled', 'disabled');
                                    $("#lstRetentionCodes").removeAttr('disabled', 'disabled');
                                }
                                if (data.lstRetentionCode != "") {
                                    $('#lstFieldRetentionCode').append($("<option>", { value: "* RetentionCodesId", html: data.lstRetentionCode }));
                                    $('#lstFieldRetentionCode option:first').attr('selected', 'selected');

                                }
                                if (data.lstDateOpened != "") {
                                    $('#lstFieldDateOpened').append($("<option>", { value: data.lstDateOpened, html: data.lstDateOpened }));
                                    $('#lstFieldDateOpened option:first').attr('selected', 'selected');
                                }
                                if (data.lstDateClosed != "") {
                                    $('#lstFieldDateClosed').append($("<option>", { value: data.lstDateClosed, html: data.lstDateClosed }));
                                    $('#lstFieldDateClosed option:first').attr('selected', 'selected');
                                }
                                if (data.lstDateCreated != "") {
                                    $('#lstFieldDateCreated').append($("<option>", { value: data.lstDateCreated, html: data.lstDateCreated }));
                                    $('#lstFieldDateCreated option:first').attr('selected', 'selected');
                                }
                                if (data.lstDateOther != "") {
                                    $('#lstFieldOtherDate').append($("<option>", { value: data.lstDateOther, html: data.lstDateOther }));
                                    $('#lstFieldOtherDate option:first').attr('selected', 'selected');
                                }

                                //Show and Hide Star Field Label
                                if (!data.bFootNote)
                                    $("#lblStarField").hide();

                                $(pRetIdsObject).each(function (i, v) {
                                    $('#lstFieldRetentionCode').append($("<option>", { value: pRetIdsObject[i], html: pRetIdsObject[i] }));
                                });
                                $(pRetDateObject).each(function (i, v) {
                                    $('#lstFieldDateOpened').append($("<option>", { value: pRetDateObject[i], html: pRetDateObject[i] }));
                                    $('#lstFieldDateClosed').append($("<option>", { value: pRetDateObject[i], html: pRetDateObject[i] }));
                                    $('#lstFieldDateCreated').append($("<option>", { value: pRetDateObject[i], html: pRetDateObject[i] }));
                                    $('#lstFieldOtherDate').append($("<option>", { value: pRetDateObject[i], html: pRetDateObject[i] }));
                                });

                                //Handle None and InActivity Flag.
                                $("input[name='disposition']").on("change", function () {
                                    var boolInActivity = $("#chkInactivity").is(":checked");

                                    if (this.value == 1 || this.value == 2 || this.value == 3) {
                                        enableRetentionPropFields();
                                    }
                                    else if (this.value == 0 & boolInActivity == false) {
                                        disbleRetentionPropFields();
                                    }
                                });
                                $("#lstRelatedTables").val(tableEntityJson.RetentionRelatedTable);
                                if (tableEntityJson.RetentionFieldName !== null)
                                    $("#lstFieldRetentionCode").val(tableEntityJson.RetentionFieldName);
                                if (tableEntityJson.RetentionDateOpenedField !== null)
                                    $("#lstFieldDateOpened").val(tableEntityJson.RetentionDateOpenedField);
                                if (tableEntityJson.RetentionDateCreateField !== null)
                                    $("#lstFieldDateCreated").val(tableEntityJson.RetentionDateCreateField);
                                if (tableEntityJson.RetentionDateClosedField !== null)
                                    $("#lstFieldDateClosed").val(tableEntityJson.RetentionDateClosedField);
                                if (tableEntityJson.RetentionDateOtherField !== null)
                                    $("#lstFieldOtherDate").val(tableEntityJson.RetentionDateOtherField);

                                $("input[name='assignment']").on("change", function () {
                                    switch (this.value) {
                                        case "0":
                                            if ($("#lstRetentionCodes option[value='0']").length == 0) {
                                                //console.log("Inside If...");
                                                ($("<option>", { value: "0", html: "" })).prependTo('#lstRetentionCodes');
                                            }
                                            $("#lstRelatedTables").attr('disabled', 'disabled');
                                            $("#lstRetentionCodes").removeAttr('disabled', 'disabled');
                                            break;
                                        case "1":

                                            if ($("#lstRetentionCodes option[value='0']").length) {
                                                $('#lstRetentionCodes option[value="0"]').remove();
                                            }
                                            $("#lstRelatedTables").attr('disabled', 'disabled');
                                            $("#lstRetentionCodes").removeAttr('disabled', 'disabled');
                                            break;
                                        case "2":
                                            //console.log('Inside switch 2 assignment..');
                                            $("#lstRelatedTables").removeAttr('disabled', 'disabled');
                                            $("#lstRetentionCodes").attr('disabled', 'disabled');
                                            break;
                                        default:
                                            $("#lstRelatedTables").attr('disabled', 'disabled');
                                            break;
                                    }
                                });
                                $('#chkInactivity').change(function () {

                                    if ($(this).is(":checked")) {
                                        enableRetentionPropFields();
                                    }
                                    else if (!$(this).is(":checked") & $('input:radio[name=disposition]:checked').val() == 0) {
                                        disbleRetentionPropFields();
                                    }

                                });
                                $("#btnSaveRetentionProp").on('click', function (e) {
                                    var pInActivity = $("#chkInactivity").is(":checked");;
                                    var pDisposition = $('input:radio[name=disposition]:checked').val();
                                    var pAssignment = $('input:radio[name=assignment]:checked').val();
                                    var pDefaultRetentionId = $('#lstRetentionCodes').val();
                                    var pRelatedTable = $("#lstRelatedTables").val();
                                    var pRetentionCode = $("#lstFieldRetentionCode").val();
                                    var pDateOpened = $("#lstFieldDateOpened").val();
                                    var pDateClosed = $("#lstFieldDateClosed").val();
                                    var pDateCreated = $("#lstFieldDateCreated").val();
                                    var pOtherDate = $("#lstFieldOtherDate").val();
                                    //console.log("Action Type: " + saveFlag);

                                    SetRetentionPropertiesDetails(saveFlag, dualListbox, pInActivity, pAssignment, pDisposition, pDefaultRetentionId, pRelatedTable, pRetentionCode, pDateOpened, pDateClosed, pDateCreated, pOtherDate);
                                });

                            });
                        }
                        else {
                            //showAjaxReturnMessage("The " + tableEntityJson.UserName + " table is currently configured as a level 1 tracking container and cannot be set up for retention.", "w");

                            $(this).confirmModal({
                                confirmTitle: vrRetentionRes['tiJsRetentionlistboxRetTblSetup'],
                                confirmMessage: String.format(vrRetentionRes['msgJsRetentionlistboxTblCurrentlyConfigLvl1'], tableEntityJson.UserName),
                                confirmOk: vrCommonRes['Ok'],
                                confirmStyle: 'default',
                                confirmOnlyOk: true
                            });
                        }
                        //If Ends.
                        setTimeout(function () {
                            cloneMdlTblRetentionPropertiesFooter();
                            if ($('#mdlTblRetentionProperties').get(0).scrollHeight > (($('#mdlTblRetentionProperties').height() + $('#mdlTblRetentionProperties').scrollTop()) + 90)) {
                                $('#mdlTblRetentionPropertiesClone').addClass("affixed");
                            }
                            $('#mdlTblRetentionProperties').on('scroll', function () {
                                if ($('#mdlTblRetentionProperties').get(0).scrollHeight > (($('#mdlTblRetentionProperties').height() + $('#mdlTblRetentionProperties').scrollTop()) + 90)) {
                                    $('#mdlTblRetentionPropertiesClone').addClass("affixed");
                                }
                                else {
                                    $('#mdlTblRetentionPropertiesClone').removeClass("affixed");
                                }
                            });
                            $('#mdlTblRetentionProperties').on('hide.bs.modal', function (e) {
                                $('#mdlTblRetentionPropertiesClone').removeClass('affixed');
                            });
                        }, 1000);
                    }
                    else {
                        showAjaxReturnMessage(data.message, data.errortype);
                    }
                })
                .fail(function (xhr, status, error) {
                    ShowErrorMessge();
                });
        }
        else {
            showAjaxReturnMessage(vrRetentionRes["msgJsRetentionlistboxPlzSel1TblFrmSelTbls"], 'e');
        }
    }
    function cloneMdlTblRetentionPropertiesFooter() {
        $('#mdlTblRetentionPropertiesClone').empty().html($('#mdlTblRetentionProperties .modal-footer').clone());
        $('#mdlTblRetentionPropertiesClone .modal-footer').find('#btnSaveRetentionProp').click(function () {
            $('.modal-content .modal-footer').find('#btnSaveRetentionProp').trigger('click');
        });
        $('#mdlTblRetentionPropertiesClone .modal-footer').css({ 'width': ($('#mdlTblRetentionProperties .modal-dialog').find('.modal-footer').width() + 30) + 'px', 'padding': '15px 7px 15px 15px' });
    }
    function disbleRetentionPropFields() {
        //$('input[name="assignment"]').attr('disabled', 'disabled');        
        $("#btnSaveRetentionProp").attr('disabled', 'disabled');
        cloneMdlTblRetentionPropertiesFooter();
        $("input[name=assignment][value= 0]").attr('disabled', 'disabled');
        $("input[name=assignment][value= 1]").attr('disabled', 'disabled');
        $("input[name=assignment][value= 2]").attr('disabled', 'disabled');
        $("#lstRetentionCodes").attr('disabled', 'disabled');

        if ($('#lstRelatedTables option').length >= 1) {
            //$("#lstRelatedTables").attr('disabled', 'disabled');
            $("input[name=assignment][value= 2]").attr('disabled', 'disabled');
        }

        $("#lstFieldRetentionCode").attr('disabled', 'disabled');
        $("#lstFieldDateOpened").attr('disabled', 'disabled');
        $("#lstFieldDateClosed").attr('disabled', 'disabled');
        $("#lstFieldDateCreated").attr('disabled', 'disabled');
        $("#lstFieldOtherDate").attr('disabled', 'disabled');

    }
    function enableRetentionPropFields() {
        //$('input[name="assignment"]').removeAttr('disabled', 'disabled');
        var vAssignmentSelection = $("input:radio[name='assignment']:checked").val();
        $("#btnSaveRetentionProp").removeAttr('disabled', 'disabled');        
        cloneMdlTblRetentionPropertiesFooter();
        $("input[name=assignment][value= 0]").removeAttr('disabled', 'disabled');
        $("input[name=assignment][value= 1]").removeAttr('disabled', 'disabled');
        $("#lstRetentionCodes").removeAttr('disabled', 'disabled');

        if (vAssignmentSelection != 0 && vAssignmentSelection != 1)
            $("#lstRelatedTables").removeAttr('disabled', 'disabled');

        if ($('#lstRelatedTables option').length >= 1) {
            //$("#lstRelatedTables").removeAttr('disabled', 'disabled');
            $("input[name=assignment][value= 2]").removeAttr('disabled', 'disabled');
        }

        $("#lstFieldRetentionCode").removeAttr('disabled', 'disabled');
        $("#lstFieldDateOpened").removeAttr('disabled', 'disabled');
        $("#lstFieldDateClosed").removeAttr('disabled', 'disabled');
        $("#lstFieldDateCreated").removeAttr('disabled', 'disabled');
        $("#lstFieldOtherDate").removeAttr('disabled', 'disabled');
    }


    function GetRetentionCodeList(pRetentionCodes) {
        $('#lstRetentionCodes').empty();
        $('#lstRetentionCodes').append($("<option>", { value: " ", html: "" }));
        $(pRetentionCodes).each(function (i, v) {
            $('#lstRetentionCodes').append($("<option>", { value: v.Id, html: v.Id }));
        });
    }

    //function GetRetentionCodeList() {
    //    $.ajax({
    //        url: urls.Retention.GetRetentionCodeList,
    //        dataType: "json",
    //        type: "GET",
    //        contentType: 'application/json; charset=utf-8',
    //        async: false,
    //        processData: false,
    //        cache: false,
    //        success: function (data) {
    //            var pRetentionObject = $.parseJSON(data);

    //            $('#lstRetentionCodes').empty();

    //            $('#lstRetentionCodes').append($("<option>", { value: "0", html: "" }));
    //            $(pRetentionObject).each(function (i, v) {
    //                $('#lstRetentionCodes').append($("<option>", { value: v.Id, html: v.Id }));
    //            });
    //        },
    //        error: function (xhr, status, error) {
    //            //console.log("Error: " + error);
    //            ShowErrorMessge();
    //        }
    //    });
    //}

    function removeTableFromList(vTableIds, vtype, dualListbox) {
        //alert("remove table from list...");
        if (vTableIds != undefined && vTableIds.length > 0) {
            $.post(urls.Retention.RemoveRetentionTableFromList, $.param({ pTableIds: vTableIds }, true))
                    .done(function (response) {
                        if (response.errortype == 's') {
                            if (vtype == 1)
                                remove(dualListbox);
                            else
                                removeAll(dualListbox);
                        }
                        showAjaxReturnMessage(response.message, response.errortype);
                    })
                    .fail(function (xhr, status, error) {
                        ShowErrorMessge();
                    });
        }
        else {
            showAjaxReturnMessage(vrRetentionRes["msgJsRetentionlistboxPlzSelAtList1TblFrmSelTbls"], 'w');
            return false;
        }
        return true;
    }

    RetentionBootstrapDualListbox.prototype = {
        init: function () {
            // Add the custom HTML template
            this.container = $('' +
              '<div class="bootstrap-duallistbox-container">' +
              ' <div class="box1">' +
              '   <label></label>' +
              '   <span class="info-container">' +
              '     <span class="info"></span>' +
              '     <button type="button" class="btn clear1 pull-right"></button>' +
              '   </span>' +
              '   <input class="filter" type="text">' +
              '   <div class="btn-group buttons">' +
              '     <button type="button" class="btn moveall">' +
              '       <i></i>' +
              '       <i></i>' +
              '     </button>' +
              '     <button type="button" class="btn move">' +
              '       <i></i>' +
              '     </button>' +
              '   </div>' +
              '   <select multiple="multiple"></select>' +
              ' </div>' +
              ' <div class="box2">' +
              '   <label></label>' +
              '   <span class="info-container">' +
              '     <span class="info"></span>' +
              '     <button type="button" class="btn clear2 pull-right"></button>' +
              '   </span>' +
              '   <input class="filter" type="text">' +
              '   <div class="btn-group buttons">' +
              '     <button type="button" class="btn remove">' +
              '       <i></i>' +
              '     </button>' +
              '     <button type="button" class="btn removeall">' +
              '       <i></i>' +
              '       <i></i>' +
              '     </button>' +
              '   </div>' +
              '   <select multiple="multiple"></select>' +
              ' </div>' +
              '</div>')
              .insertBefore(this.element);

            // Cache the inner elements
            this.elements = {
                originalSelect: this.element,
                box1: $('.box1', this.container),
                box2: $('.box2', this.container),
                filterInput1: $('.box1 .filter', this.container),
                filterInput2: $('.box2 .filter', this.container),
                filterClear1: $('.box1 .clear1', this.container),
                filterClear2: $('.box2 .clear2', this.container),
                label1: $('.box1 > label', this.container),
                label2: $('.box2 > label', this.container),
                info1: $('.box1 .info', this.container),
                info2: $('.box2 .info', this.container),
                select1: $('.box1 select', this.container),
                select2: $('.box2 select', this.container),
                moveButton: $('.box1 .move', this.container),
                removeButton: $('.box2 .remove', this.container),
                moveAllButton: $('.box1 .moveall', this.container),
                removeAllButton: $('.box2 .removeall', this.container),
                form: $($('.box1 .filter', this.container)[0].form)
            };

            // Set select IDs
            this.originalSelectName = this.element.attr('name') || '';
            var select1Id = 'bootstrap-duallistbox-nonselected-list_' + this.originalSelectName,
              select2Id = 'bootstrap-duallistbox-selected-list_' + this.originalSelectName;
            this.elements.select1.attr('id', select1Id);
            this.elements.select2.attr('id', select2Id);
            this.elements.label1.attr('for', select1Id);
            this.elements.label2.attr('for', select2Id);

            // Apply all settings
            this.selectedElements = 0;
            this.elementCount = 0;
            this.setBootstrap2Compatible(this.settings.bootstrap2Compatible);
            this.setFilterTextClear(this.settings.filterTextClear);
            this.setFilterPlaceHolder(this.settings.filterPlaceHolder);
            this.setMoveSelectedLabel(this.settings.moveSelectedLabel);
            this.setMoveAllLabel(this.settings.moveAllLabel);
            this.setRemoveSelectedLabel(this.settings.removeSelectedLabel);
            this.setRemoveAllLabel(this.settings.removeAllLabel);
            this.setMoveOnSelect(this.settings.moveOnSelect);
            this.setPreserveSelectionOnMove(this.settings.preserveSelectionOnMove);
            this.setSelectedListLabel(this.settings.selectedListLabel);
            this.setNonSelectedListLabel(this.settings.nonSelectedListLabel);
            this.setHelperSelectNamePostfix(this.settings.helperSelectNamePostfix);
            this.setSelectOrMinimalHeight(this.settings.selectorMinimalHeight);

            updateSelectionStates(this);

            this.setShowFilterInputs(this.settings.showFilterInputs);
            this.setNonSelectedFilter(this.settings.nonSelectedFilter);
            this.setSelectedFilter(this.settings.selectedFilter);
            this.setInfoText(this.settings.infoText);
            this.setInfoTextFiltered(this.settings.infoTextFiltered);
            this.setInfoTextEmpty(this.settings.infoTextEmpty);
            this.setFilterOnValues(this.settings.filterOnValues);
            this.setmultipleSelection(this.settings.multipleSelection);
            // Hide the original select
            this.element.hide();

            bindEvents(this);
            refreshSelects(this);

            return this.element;
        },
        setBootstrap2Compatible: function (value, refresh) {
            this.settings.bootstrap2Compatible = value;
            if (value) {
                this.container.removeClass('row').addClass('row-fluid bs2compatible');
                this.container.find('.box1, .box2').removeClass('col-md-6').addClass('span6');
                this.container.find('.clear1, .clear2').removeClass('btn-default btn-xs').addClass('btn-mini');
                this.container.find('input, select').removeClass('form-control');
                this.container.find('.btn').removeClass('btn-default');
                this.container.find('.moveall > i, .move > i').removeClass('glyphicon glyphicon-arrow-right').addClass('icon-arrow-right');
                this.container.find('.removeall > i, .remove > i').removeClass('glyphicon glyphicon-arrow-left').addClass('icon-arrow-left');
            } else {
                this.container.removeClass('row-fluid bs2compatible').addClass('row');
                this.container.find('.box1, .box2').removeClass('span6').addClass('col-md-6');
                this.container.find('.clear1, .clear2').removeClass('btn-mini').addClass('btn-default btn-xs');
                this.container.find('input, select').addClass('form-control');
                this.container.find('.btn').addClass('btn-default');
                this.container.find('.moveall > i, .move > i').removeClass('icon-arrow-right').addClass('glyphicon glyphicon-arrow-right');
                this.container.find('.removeall > i, .remove > i').removeClass('icon-arrow-left').addClass('glyphicon glyphicon-arrow-left');
            }
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setFilterTextClear: function (value, refresh) {
            this.settings.filterTextClear = value;
            this.elements.filterClear1.html(value);
            this.elements.filterClear2.html(value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setFilterPlaceHolder: function (value, refresh) {
            this.settings.filterPlaceHolder = value;
            this.elements.filterInput1.attr('placeholder', value);
            this.elements.filterInput2.attr('placeholder', value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setMoveSelectedLabel: function (value, refresh) {
            this.settings.moveSelectedLabel = value;
            this.elements.moveButton.attr('title', value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setMoveAllLabel: function (value, refresh) {
            this.settings.moveAllLabel = value;
            this.elements.moveAllButton.attr('title', value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setRemoveSelectedLabel: function (value, refresh) {
            this.settings.removeSelectedLabel = value;
            this.elements.removeButton.attr('title', value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setRemoveAllLabel: function (value, refresh) {
            this.settings.removeAllLabel = value;
            this.elements.removeAllButton.attr('title', value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setMoveOnSelect: function (value, refresh) {
            if (isBuggyAndroid) {
                value = true;
            }
            this.settings.moveOnSelect = value;
            if (this.settings.moveOnSelect) {
                this.container.addClass('moveonselect');
                var self = this;
                this.elements.select1.on('change', function () {
                    move(self);
                });
                this.elements.select2.on('change', function () {
                    remove(self);
                });
            } else {
                this.container.removeClass('moveonselect');
                this.elements.select1.off('change');
                this.elements.select2.off('change');
            }
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setPreserveSelectionOnMove: function (value, refresh) {
            // We are forcing to move on select and disabling preserveSelectionOnMove on Android
            if (isBuggyAndroid) {
                value = false;
            }
            this.settings.preserveSelectionOnMove = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setSelectedListLabel: function (value, refresh) {
            this.settings.selectedListLabel = value;
            if (value) {
                this.elements.label2.show().html(value);
            } else {
                this.elements.label2.hide().html(value);
            }
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setNonSelectedListLabel: function (value, refresh) {
            this.settings.nonSelectedListLabel = value;
            if (value) {
                this.elements.label1.show().html(value);
            } else {
                this.elements.label1.hide().html(value);
            }
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setHelperSelectNamePostfix: function (value, refresh) {
            this.settings.helperSelectNamePostfix = value;
            if (value) {
                this.elements.select1.attr('name', this.originalSelectName + value + '1');
                this.elements.select2.attr('name', this.originalSelectName + value + '2');
            } else {
                this.elements.select1.removeAttr('name');
                this.elements.select2.removeAttr('name');
            }
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setSelectOrMinimalHeight: function (value, refresh) {
            this.settings.selectorMinimalHeight = value;
            var height = this.element.height();
            if (this.element.height() < value) {
                height = value;
            }
            this.elements.select1.height(height);
            this.elements.select2.height(height);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setShowFilterInputs: function (value, refresh) {
            if (!value) {
                this.setNonSelectedFilter('');
                this.setSelectedFilter('');
                refreshSelects(this);
                this.elements.filterInput1.hide();
                this.elements.filterInput2.hide();
            } else {
                this.elements.filterInput1.show();
                this.elements.filterInput2.show();
            }
            this.settings.showFilterInputs = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setNonSelectedFilter: function (value, refresh) {
            if (this.settings.showFilterInputs) {
                this.settings.nonSelectedFilter = value;
                this.elements.filterInput1.val(value);
                if (refresh) {
                    refreshSelects(this);
                }
                return this.element;
            }
            return null;
        },
        setSelectedFilter: function (value, refresh) {
            if (this.settings.showFilterInputs) {
                this.settings.selectedFilter = value;
                this.elements.filterInput2.val(value);
                if (refresh) {
                    refreshSelects(this);
                }
                return this.element;
            }
            return null;
        },
        setInfoText: function (value, refresh) {
            this.settings.infoText = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setInfoTextFiltered: function (value, refresh) {
            this.settings.infoTextFiltered = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setInfoTextEmpty: function (value, refresh) {
            this.settings.infoTextEmpty = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setFilterOnValues: function (value, refresh) {
            this.settings.filterOnValues = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setmultipleSelection: function (value, refresh) {
            this.settings.multipleSelection = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        getContainer: function () {
            return this.container;
        },
        refresh: function (mustClearSelections) {
            updateSelectionStates(this);

            if (!mustClearSelections) {
                saveSelections(this, 1);
                saveSelections(this, 2);
            } else {
                clearSelections(this);
            }

            refreshSelects(this);
        },
        destroy: function () {
            this.container.remove();
            this.element.show();
            $.data(this, 'plugin_' + pluginName, null);
            return this.element;
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted, instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                // If this is not a select
                if (!$(this).is('select')) {
                    $(this).find('select').each(function (index, item) {
                        // For each nested select, instantiate the Dual List Box
                        $(item).RetentionbootstrapDualListbox(options);
                    });
                } else if (!$.data(this, 'plugin_' + pluginName)) {
                    // Only allow the plugin to be instantiated once so we check that the element has no plugin instantiation yet

                    // if it has no instance, create a new one, pass options to our plugin constructor,
                    // and store the plugin instance in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new RetentionBootstrapDualListbox(this, options));
                }
            });
            // If the first parameter is a string and it doesn't start with an underscore or "contains" the `init`-function,
            // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call to make it possible to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                // Tests that there's already a plugin-instance and checks that the requested public method exists
                if (instance instanceof RetentionBootstrapDualListbox && typeof instance[options] === 'function') {
                    // Call the method of our plugin instance, and pass it the supplied arguments.
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });

            // If the earlier cached method gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
        return null;
    };

})(jQuery, window, document);