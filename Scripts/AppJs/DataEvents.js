//calcualte divs after collapse
//$(document).on("click", function () {
//    $(domMap.DataGrid.MainDataContainerDiv).height($("#page-content-wrapper").height() - $('#TaskContainer').height() - $(domMap.DataGrid.TrackingStatusDiv).height());
//});
//handling handsonTable when user click out of the grid
//$(document).click(function () {
//    if (hot !== undefined) {
//        hot.selectRows(0)
//        gridfunc.StartInCell()
//    }
//})
//$('body').on('click', app.domMap.DataGrid.HandsOnTableContainer, function () {
//    event.stopPropagation();
//});
//End handling handsonTable when user click out of the grid



//toolbar event

$('body').on("click", app.domMap.ToolBarButtons.BtnPrint, function () {
    obJtoolbarmenufunc.PrintTable("")
});
$('body').on("click", app.domMap.ToolBarButtons.BtnQuery, function () {
    obJreports.isCustomeReportCall = false;
    obJquerywindow.LoadQueryWindow(-1)
});
$('body').on("click", app.domMap.ToolBarButtons.BtnBlackWhite, function () {
    alert("underdeveloped");
})
$('body').on("click", app.domMap.ToolBarButtons.BtnExportCSVSelected, function () {
    alert("underdeveloped");
})
$('body').on("click", app.domMap.ToolBarButtons.BtnExportCSVAll, function () {
    alert("underdeveloped");
})
$('body').on("click", app.domMap.ToolBarButtons.BtnExportTXTSelected, function () {
    alert("underdeveloped");
})
$('body').on("click", app.domMap.ToolBarButtons.BtnExportTXTAll, function () {
    alert("underdeveloped");
})
$('body').on("click", app.domMap.ToolBarButtons.BtnRequest, function () {
    alert("underdeveloped");
})
$('body').on("click", app.domMap.ToolBarButtons.BtnTransfer, function () {
    alert("underdeveloped");
})
$('body').on("click", app.domMap.ToolBarButtons.BtnTransferAll, function () {
    alert("underdeveloped");
})
$('body').on("click", app.domMap.ToolBarButtons.BtnMoverows, function () {
    alert("underdeveloped");
})
$('body').on("click", app.domMap.ToolBarButtons.BtnTracking, function () {
    if ($(this).html() === "Hide Tracking") {
        $(this).html("Show Tracking")
        $(app.domMap.DataGrid.TrackingStatusDiv).hide();
    } else {
        $(this).html("Hide Tracking")
        $(app.domMap.DataGrid.TrackingStatusDiv).show();
    }

})
$('body').on('shown.bs.collapse', function () {
    console.log("open");
    $(app.domMap.DataGrid.MainDataContainerDiv).height($("#page-content-wrapper").height() - $('#TaskContainer').height() - $(app.domMap.DataGrid.TrackingStatusDiv).height());
});
$('body').on('hidden.bs.collapse', function () {
    console.log("close");
    $(app.domMap.DataGrid.MainDataContainerDiv).height($("#page-content-wrapper").height() - $('#TaskContainer').height() - $(app.domMap.DataGrid.TrackingStatusDiv).height());
});
//tracking hide and show functions
function TrackingHideShowClick(id) {
    var result = $(id).text().split(" ");
    if (result[0] === "Hide") {
        $(id).text(app.language["Show"] + " [+]");
    } else {
        $(id).text(app.language["Hide"] + " [-]");
    }
}
function TaskListSetHideShowText(sel) {
    var result = $(sel).text().split(" ");
    if (result[result.length - 1] == "[+]") {
        $(sel).text(app.language["Hide"] + " [-]");
    } else {
        $(sel).text(app.language["Show"] + " [+]");
    }
}
$("body").on("click", app.domMap.NewsFeed.BtnSaveNewsURL, function () {
    runfeed.SaveNewUrl();
});
//click on tabuik button
$("body").on('click', app.domMap.ToolBarButtons.BtnTabquikId, function () {
    if (rowselected.length < 1) {
        //$('#toast-container').fnAlertMessage({ title: '', msgTypeClass: 'toast-warning', message: app.language["msgJsDataSelectOneRow"], timeout: 3000 });
        showAjaxReturnMessage(app.language["msgJsDataSelectOneRow"], "w");
    } else {
        var rowids = [];
        for (var i = 0; i < rowselected.length; i++) {
            let rowid = hot.getDataAtRow(rowselected[i])[0];
            rowids.push(rowid);
        }
        setCookie('TabQuikViewRowselected', obJgridfunc.ViewId + "^&&^" + rowids, { expires: 1 });
        let url = window.location.origin;
        window.open(url + '/Data/TabQuik', '_blank');
    }
});
//delete row from grid
$("body").on('click', app.domMap.ToolBarButtons.BtnDeleterow, function (e) {
    obJtoolbarmenufunc.BeforeDeleteRow();
});
//favorite
//delete ceriteria
$("body").on("click", app.domMap.ToolBarButtons.BtnDeleteCeriteria, function () {
    obJfavorite.DeleteCeriteria();
})
//new favorite
$("body").on("click", app.domMap.ToolBarButtons.BtnNewFavorite, function () {
    obJfavorite.LoadNewFavorite();
});
//creat Favorite
$("body").on("click", app.domMap.Favorite.NewFavorite.Ok, function (e) {
    var favName = document.querySelector(app.domMap.Favorite.NewFavorite.FavNewInputBox).value;
    if (favName == "") { return showAjaxReturnMessage("please, insert favorite name (needs to add the language file)(needs to add the language file)", "w") }
    obJfavorite.AddNewFavorite(favName);
});
//add to favorite
$("body").on("click", app.domMap.ToolBarButtons.BtnUpdateFavourite, function () {
    obJfavorite.BeforeAddToFavorite();
});
//update favorite
$("body").on("click", app.domMap.Favorite.AddToFavorite.AddtofavoriteOK, function () {
    obJfavorite.UpdateFavorite();
});
//start popup delete favorit message
$("body").on("click", app.domMap.ToolBarButtons.BtnremoveFromFavorite, function () {
    if (rowselected.length <= 0) return showAjaxReturnMessage(app.language["msgFavoriteRecordSelection"], "w")
    var dlg = new DialogBoxBasic("<h3>" + app.language["FavoriteDeleteConfBox"] + "</h3>", app.url.Html.DialogMsghtmlConfirm, app.domMap.Dialogboxbasic.Type.PartialView)
    dlg.ShowDialog().then(() => {
        document.querySelector(app.domMap.Dialogboxbasic.Dlg.DialogMsgConfirm.DialogMsgTxt).innerHTML = app.language["FavoriteDeleteConfBoxMessage"];
        document.querySelector(app.domMap.Dialogboxbasic.Dlg.DialogMsgConfirm.DialogYes).id = "removeRecord"
    })
});
//remove favorite
$("body").on("click", app.domMap.Favorite.RemoveFavorite.RemoveConfimed, function () {
    obJfavorite.DeleteFavoriteRecords();
})
//my query
$("body").on("click", app.domMap.Myqury.BtnDeleteMyquery, function () {
    obJmyquery.DeleteQuery();
});
//global search
$("body").on("click", app.domMap.GlobalSearching.BtnSearch, function () {
    var attachment = document.querySelector(app.domMap.GlobalSearching.ChkAttachments).checked;
    var currentTable = document.querySelector(app.domMap.GlobalSearching.ChkCurrentTable).checked;
    var currentrow = document.querySelector(app.domMap.GlobalSearching.ChkUnderRow).checked;
    var value = document.querySelector(app.domMap.GlobalSearching.TxtSearch).value;
    obJglobalsearch.RunSearch(false, value, attachment, currentTable, currentrow);
});
$("body").on("keypress", app.domMap.GlobalSearching.TxtSearch, function (e) {
    if (e.keyCode === 13) {
        var attachment = document.querySelector(app.domMap.GlobalSearching.ChkAttachments).checked;
        var currentTable = document.querySelector(app.domMap.GlobalSearching.ChkCurrentTable).checked;
        var currentrow = document.querySelector(app.domMap.GlobalSearching.ChkUnderRow).checked;
        var value = document.querySelector(app.domMap.GlobalSearching.TxtSearch).value;
        obJglobalsearch.RunSearch(false, value, attachment, currentTable, currentrow);
    }
});
$("body").on("keypress", app.domMap.GlobalSearching.DialogSearchInput, function (e) {
    if (e.keyCode === 13) {
        var value = document.querySelector(app.domMap.GlobalSearching.DialogSearchInput).value;
        var isattach = document.querySelector(app.domMap.GlobalSearching.DialogchkAttachments).checked;
        var isCurTable = document.querySelector(app.domMap.GlobalSearching.DialogCurrenttable).checked;
        var isRow = document.querySelector(app.domMap.GlobalSearching.DialogUnderthisrow).checked;
        obJglobalsearch.RunSearch(true, value, isattach, isCurTable, isRow);
    }
});
$("body").on("click", app.domMap.GlobalSearching.DialogchkAttachments, function () {
    var value = document.querySelector(app.domMap.GlobalSearching.DialogSearchInput).value;
    var isattach = this.checked;
    var isCurTable = document.querySelector(app.domMap.GlobalSearching.DialogCurrenttable).checked;
    var isRow = document.querySelector(app.domMap.GlobalSearching.DialogUnderthisrow).checked;
    obJglobalsearch.RunSearch(true, value, isattach, isCurTable, isRow);

});
$("body").on("click", app.domMap.GlobalSearching.DialogSearchButton, function () {
    var value = document.querySelector(app.domMap.GlobalSearching.DialogSearchInput).value;
    var isattach = document.querySelector(app.domMap.GlobalSearching.DialogchkAttachments).checked;
    var isCurTable = document.querySelector(app.domMap.GlobalSearching.DialogCurrenttable).checked;
    var isRow = document.querySelector(app.domMap.GlobalSearching.DialogUnderthisrow).checked;
    obJglobalsearch.RunSearch(true, value, isattach, isCurTable, isRow);
});
$("body").on("click", app.domMap.GlobalSearching.DialogCurrenttable, function () {
    var value = document.querySelector(app.domMap.GlobalSearching.DialogSearchInput).value;
    var isattach = document.querySelector(app.domMap.GlobalSearching.DialogchkAttachments).checked;
    var isCurTable = document.querySelector(app.domMap.GlobalSearching.DialogCurrenttable).checked;
    var isRow = document.querySelector(app.domMap.GlobalSearching.DialogUnderthisrow).checked;
    obJglobalsearch.RunSearch(true, value, isattach, isCurTable, isRow);
});
$("body").on("click", app.domMap.GlobalSearching.DialogUnderthisrow, function () {
    var value = document.querySelector(app.domMap.GlobalSearching.DialogSearchInput).value;
    var isattach = document.querySelector(app.domMap.GlobalSearching.DialogchkAttachments).checked;
    var isCurTable = document.querySelector(app.domMap.GlobalSearching.DialogCurrenttable).checked;
    var isRow = document.querySelector(app.domMap.GlobalSearching.DialogUnderthisrow).checked;
    obJglobalsearch.RunSearch(true, value, isattach, isCurTable, isRow);
});
//attachment popup
$("body").on("click", app.domMap.DialogAttachment.BtnAddAttachment, function (e) {
    e.stopPropagation();
    $(app.domMap.DialogAttachment.FileUploadForAddAttach).off().on('change', function (e) {
        oFileUpload = document.querySelector(app.domMap.DialogAttachment.FileUploadForAddAttach);
        FlyoutUploderFiles = oFileUpload.files;
        obJattachmentsview.UploadAttachmentOnNewAdd(FlyoutUploderFiles);
    });
    $(app.domMap.DialogAttachment.FileUploadForAddAttach).val("");
    $(app.domMap.DialogAttachment.FileUploadForAddAttach).click();

});
$("body").on("click", app.domMap.DialogAttachment.GotoScanner, function (e) {
    scannerLink = window.location.origin + "/DocumentViewer/Index?documentKey=" + document.querySelector(app.domMap.DialogAttachment.StringQuery).value;
    localStorage.setItem("callFromScanner", 1);
    var url = scannerLink;
    window.open(url, "_blank");
});
$("body").on("click", app.domMap.DialogAttachment.BtnopenAttachViewer, function (e) {
    scannerLink = window.location.origin + "/DocumentViewer/Index?documentKey=" + document.querySelector(app.domMap.DialogAttachment.StringQuery).value;
    localStorage.setItem("callFromScanner", 0);
    var url = scannerLink;
    window.open(url, "_blank");
});
//audit reports
var auditEvents = {
    BtnOkClick: (event) => {
        if (auditEvents.Validation() === 0) {
            obJreports.RunAuditReport();
        }
    },
    userChange: () => {
        auditEvents.CheckBoxConditions();
    },
    ObjectChange: (event) => {
        auditEvents.CheckBoxConditions();
    },
    CheckBoxConditions: (event) => {
        var m = auditEvents.properties();
        if (m.UserName.value === "-1" && m.ObjectId.value === "-1") {
            m.SuccessLogin.disabled = false;
            m.FailedLogin.disabled = false;
            m.AddEditDelete.disabled = true;
            m.AddEditDelete.checked = false;
            m.ConfDataAccess.disabled = true;
            m.ConfDataAccess.checked = false;
            m.ChildTable.disabled = true;
            m.ChildTable.checked = false;
            m.Id.value = "";
            m.Id.disabled = true;
        } else if (m.UserName.value !== "-1" && m.ObjectId.value === "-1") {
            m.SuccessLogin.disabled = false;
            m.FailedLogin.disabled = false;
            m.AddEditDelete.disabled = false;
            m.ConfDataAccess.disabled = false;
            m.ChildTable.disabled = false;
            m.Id.value = "";
            m.Id.disabled = true;
        } else if (m.UserName.value === "-1" && m.ObjectId.value !== "-1" && parseInt(m.ObjectId.value.split("|")[1]) === 0) {
            m.SuccessLogin.disabled = true;
            m.FailedLogin.disabled = true;
            m.AddEditDelete.disabled = false;
            m.ConfDataAccess.disabled = false;
            m.ChildTable.disabled = true;
            m.ChildTable.checked = false;
            m.Id.disabled = false;
        } else if (m.UserName.value === "-1" && m.ObjectId.value !== "-1" && parseInt(m.ObjectId.value.split("|")[1]) > 0) {
            m.SuccessLogin.disabled = true;
            m.SuccessLogin.checked = false;
            m.FailedLogin.disabled = true;
            m.FailedLogin.checked = false;
            m.AddEditDelete.disabled = false;
            m.ConfDataAccess.disabled = false;
            m.ChildTable.disabled = false;
            m.Id.disabled = false;
        } else if (m.UserName.value !== "-1" && m.ObjectId.value !== "-1" && parseInt(m.ObjectId.value.split("|")[1]) > 0) {
            m.SuccessLogin.disabled = true;
            m.SuccessLogin.checked = false;
            m.FailedLogin.disabled = true;
            m.FailedLogin.checked = false;
            m.AddEditDelete.disabled = false;
            m.ConfDataAccess.disabled = false;
            m.ChildTable.disabled = false;
            m.Id.disabled = false
        } else if (m.UserName.value !== "-1" && m.ObjectId.value !== "-1" && parseInt(m.ObjectId.value.split("|")[1]) === 0) {
            m.SuccessLogin.disabled = true;
            m.SuccessLogin.checked = false;
            m.FailedLogin.disabled = true;
            m.FailedLogin.checked = false;
            m.AddEditDelete.disabled = false;
            m.ConfDataAccess.disabled = false;
            m.ChildTable.disabled = true;
            m.ChildTable.checked = false;
            m.Id.disabled = false;
        }

        m.Id.setAttribute("placeholder", "");
        m.Id.style.border = "1px solid black";
    },
    Validation() {
        var isNotValid = 0;
        var m = auditEvents.properties();
        //checkboxes
        var checkbox = [m.SuccessLogin.checked, m.FailedLogin.checked, m.ConfDataAccess.checked, m.AddEditDelete.checked, m.ChildTable.checked];
        if (!checkbox.includes(true)) {
            document.querySelector(app.domMap.AuditReport.CheckboxMsg).innerHTML = app.language["msgSelectchkAuditReport"];
            isNotValid++;
        } else {
            document.querySelector(app.domMap.AuditReport.CheckboxMsg).innerHTML = "";
        }
        //dateStart
        if (m.StartDate.value === "") {
            m.StartDate.parentElement.parentElement.children[0].firstElementChild.style.display = "initial";
            isNotValid++;
        } else {
            m.StartDate.parentElement.parentElement.children[0].firstElementChild.style.display = "none";
        }
        //dateEnd
        if (m.EndDate.value === "") {
            m.EndDate.parentElement.parentElement.children[0].firstElementChild.style.display = "initial";
            isNotValid++;
        } else {
            m.EndDate.parentElement.parentElement.children[0].firstElementChild.style.display = "none";
        }
        //id text
        if (m.ObjectId.value !== "-1" && m.Id.value === "") {
            m.Id.setAttribute("placeholder", "Required!");
            m.Id.style.border = "2px solid red";
            isNotValid++
        } else {
            m.Id.setAttribute("placeholder", "");
            m.Id.style.border = "1px solid black";
        }

        return isNotValid;
    },
    properties: () => {
        var model = {};
        model.UserName = document.querySelector(app.domMap.AuditReport.ddlUser);
        model.ObjectId = document.querySelector(app.domMap.AuditReport.ddlObject);
        model.Id = document.querySelector(app.domMap.AuditReport.txtObjectId);
        model.StartDate = document.querySelector(app.domMap.AuditReport.dtStartDate);
        model.EndDate = document.querySelector(app.domMap.AuditReport.dtEndDate);
        model.AddEditDelete = document.querySelector(app.domMap.AuditReport.chkAddEditDelL);
        model.SuccessLogin = document.querySelector(app.domMap.AuditReport.chkSuccessLogin);
        model.ConfDataAccess = document.querySelector(app.domMap.AuditReport.chkConfidential);
        model.FailedLogin = document.querySelector(app.domMap.AuditReport.chkFailedLogin);
        model.ChildTable = document.querySelector(app.domMap.AuditReport.chkChildTable);
        return model;
    }
}
//Retention information
$('body').on('change', app.domMap.Retentioninfo.ddlRetentionCode, (e) => {
    var getddl = e.currentTarget.options[e.currentTarget.selectedIndex];
    var elem = {};
    elem.description = document.querySelector(app.domMap.Retentioninfo.RetinCodeDesc);
    elem.retentionItem = document.querySelector(app.domMap.Retentioninfo.RetinItemName);
    elem.status = document.querySelector(app.domMap.Retentioninfo.RetinStatus);
    elem.inArchiveDate = document.querySelector(app.domMap.Retentioninfo.RetinInactiveDate);
    elem.lblArchive = document.querySelector(app.domMap.Retentioninfo.lblRetinArchive);
    elem.retArchive = document.querySelector(app.domMap.Retentioninfo.RetinArchive);

    if (getddl.value === "") {
        elem.description.innerText = "N/A";
        elem.retentionItem.innerText = "Record Details";
        elem.status.innerText = "N/A";
        elem.inArchiveDate.innerText = "N/A";
        elem.retArchive.innerText = "N/A";
        return;
    }
    objc = {};
    objc.rowid = obJgridfunc.RowKeyid
    objc.viewid = obJgridfunc.ViewId;
    objc.RetDescription = getddl.value;
    objc.RetentionItemText = getddl.innerText;
    var data = JSON.stringify({ props: objc })
    var call = new DataAjaxCall(app.url.server.OnDropdownChange, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "")
    call.Send().then((model) => {
        obJretentioninfo.DropdownReturnAfterChange(model, elem)
    });

});
$('body').on("click", app.domMap.Retentioninfo.btnOkRetin, () => {
    obJretentioninfo.UpdateRecordInfo();
});
$('body').on("click", app.domMap.Retentioninfo.btnRemoveRetin, () => {
    obJretentioninfo.RemoveRows();
});
$('body').on('click', app.domMap.Retentioninfo.btnCancelRetin, () => {
    var dlgClose = new DialogBoxBasic();
    dlgClose.CloseDialog();
});
//popup holding table to add more rows
$('body').on('click', app.domMap.Retentioninfo.btnAddRetin, () => {
    obJretentioninfo.StartAddingRow();
});
//Retention holding
//btn snooz button
$('body').on('click', app.domMap.RetentioninfoHold.btnSnooze, () => {
    var snooz = document.querySelector(app.domMap.RetentioninfoHold.txtSnoozeDate);
    var retType = document.querySelector(app.domMap.RetentioninfoHold.chkHoldTypeRetention);
    var LegType = document.querySelector(app.domMap.RetentioninfoHold.chkHoldTypeLegal);
    var reason = document.querySelector(app.domMap.RetentioninfoHold.holdReason);
    if (snooz.disabled === false) {
        IncreaseDateByoneMonth(snooz);
    } else {
        if (!LegType.checked) {
            retType.checked = true;
        }
        reason.disabled = false;
        snooz.disabled = false;
    }
});
//btn retention type checkbox
$('body').on('click', app.domMap.RetentioninfoHold.chkHoldTypeRetention, () => {
    obJretentioninfo.HoldingConditions("retention");
});
//btn legal checkbox
$('body').on('click', app.domMap.RetentioninfoHold.chkHoldTypeLegal, () => {
   obJretentioninfo.HoldingConditions("legal");
});
//btn Ok button
$('body').on('click', app.domMap.RetentioninfoHold.btnHoldOk, () => {
    if (obJretentioninfo.isEditMode) {
        obJretentioninfo.EditHoldingRow();
    } else {
        obJretentioninfo.AddnewHolding();
    }
    //hide holding dialog after Ok button click
    $(app.domMap.RetentioninfoHold.Dialog.RetentionHoldingDialog).hide();
});
$('body').on('click', app.domMap.Retentioninfo.btnEditRetin, () => {
    if (hotRetention.getSelected() === undefined) {
        showAjaxReturnMessage("Please, select row to edit!", "w")
    } else if (obJretentioninfo.GetrowsSelected().length > 1){
        showAjaxReturnMessage("You can't edit more than one row!", "w")
    } else {
        $(app.domMap.RetentioninfoHold.Dialog.RetentionHoldingDialog).show();
        $(app.domMap.RetentioninfoHold.Dialog.DlgHoldingTitle).html(app.language["lblRetentionInformationHoldInfo"]);
        $(app.domMap.RetentioninfoHold.Dialog.RetentionHoldingContent).load(app.url.server.RetentionInfoHolde, () => {
            obJretentioninfo.StartEditHoldingRow();
        })
    }
    
});











