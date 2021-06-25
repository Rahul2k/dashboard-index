//ajax helper class and options object
/*how to use this class: 
 *  create a class object, pass the arguments into the constructor
 *  the first 3 are mendatory to pass/
 *  the one you don't use pass "";
 *  after you created the object just run Send() method to complete ajax call to the server.
 *  
 *  Note: if you call server and pass model app.ajax.ContentType.Utf8 you must stringify the data
 *  example: JSON.stringify({ params: this, Querylist: querywindow.SubmmitQuery(true) })
*/
class DataAjaxCall {
    constructor(url, type, datatype, data, contenttype, processdata, async, cache) {
        this._url = url;
        this._type = type;
        this._datatype = datatype;
        this._data = data;
        this._contenttype = contenttype;
        this._processData = processdata;
        this._async = async;
        this._cache = cache;
    }
    Send() {
        if (this.IsPropertiesPass() === false) { return; };
        return new Promise((resolve, reject) => {
            var ajaxOptions = {};
            if (this._url === "") { 0; } else { ajaxOptions.url = this._url };
            if (this._type === "") { 0; } else { ajaxOptions.type = this._type };
            if (this._datatype === "") { 0; } else { ajaxOptions.dataType = this._datatype }
            if (this._data === "") { 0; } else { ajaxOptions.data = this._data };
            if (this._async === "") { 0; } else { ajaxOptions.async = this._async };
            if (this._cache === "") { 0; } else { ajaxOptions.cache = this._cache; };
            if (this._processData === "") { 0; } else { ajaxOptions.processData = this._processData; };
            if (this._contenttype === "") { 0; } else { ajaxOptions.contentType = this._contenttype; };
            $.ajax(ajaxOptions).done(function (data) {
                resolve(data);
            }).fail(function (jqXHR) {
                showAjaxReturnMessage(jqXHR.statusText + " can't reach the server or server rejected the request, please contact your system administrator!", "e");
                reject();
                setTimeout(() => {
                    window.location.reload();
                }, 5000);

            });
        });
    }
    IsPropertiesPass() {
        var ispass = true;
        if (this._url === undefined || this._url === "") {
            ispass = false;
            alert("Url: is a mendatory param to pass to constructor!!");
        }
        if (this._type === undefined || this._type === "") {
            ispass = false;
            alert("type: is a mendatory param to pass to constructor!!");
        }
        if (this._datatype === undefined || this._datatype === "") {
            ispass = false;
            alert("Datatype: is a mendatory param to pass to constructor!!");
        }
        if (this._data === undefined) {
            ispass = false;
            alert("Data: if you don't have anyting to pass then pass empty string to constructor!!");
        }
        if (this._contenttype === undefined) {
            ispass = false;
            alert("ContentType: if you don't have anyting to pass then pass empty string to constructor!!");
        }
        if (this._processData === undefined) {
            ispass = false;
            alert("ProcessData: if you don't have anyting to pass then pass empty string to constructor!!");
        }
        if (this._async === undefined) {
            ispass = false;
            alert("Async: if you don't have anyting to pass then pass empty string to constructor!!");
        }
        if (this._cache === undefined) {
            ispass = false;
            alert("Cache: if you don't have anyting to pass then pass empty string to constructor!!");
        }

        return ispass;
    }
}
class DialogBoxBasic {
    constructor(title, contentHtml, type) {
        this._title = title;
        this._content = contentHtml;
        this.isconfirm = "";
        this.Type = type;
    }
    ShowDialog() {
        var _this = this;
        document.querySelector(app.domMap.Dialogboxbasic.DlgBsTitle).innerHTML = _this._title;
        if (this.Type === app.domMap.Dialogboxbasic.Type.PartialView) {
            return new Promise((resolve, reject) => {
                this.LoadPatialViewDialog().then((data) => {
                    resolve(data);
                });
            });
        } else if (this.Type === app.domMap.Dialogboxbasic.Type.Content) {
            this.LoadContentDialog();
        }

    }
    LoadPatialViewDialog() {
        //need to pass the dialog model-body class
        //option: to return direct partial view from the server. 
        return new Promise((resolve, reject) => {
            $(app.domMap.Dialogboxbasic.DlgBsContent).load(this._content, function () {
                $(app.domMap.Dialogboxbasic.BasicDialog).show();
                $('.modal-dialog').draggable({
                    handle: ".modal-header",
                    stop: function (event, ui) {
                    }
                });
                resolve(true);
            });
        });

    }
    LoadContentDialog() {
        //dont need to pass teh dialog model-body class as we build it for you.
        $(app.domMap.Dialogboxbasic.DlgBsContent).html("<div id='dlgbodyId' class='modal-body' style='overflow:auto; max-height:500px'>" + this._content + "</div>");
        $(app.domMap.Dialogboxbasic.BasicDialog).show();
        $('.modal-dialog').draggable({
            handle: ".modal-header",
            stop: function (event, ui) {
            }
        });
    }
    CloseDialog(isConfirmed) {
        //if (isConfirmed === undefined) return alert("Developer, pass true or false arguments in DialogBoxBasic object #Function: closeDialog()")
        //this.isconfirm = isConfirmed === undefined ? "" : isConfirmed;
        $(app.domMap.Dialogboxbasic.BasicDialog).hide();
    }
}


//set cookies and get cookies for drill_down side menu ##linkes_drilldown.js use it.
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = value + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function SizeOfVerb(object) {
    // initialise the list of objects and size
    var objects = [object];
    var size = 0;
    // loop over the objects
    for (var index = 0; index < objects.length; index++) {
        // determine the type of the object
        switch (typeof objects[index]) {
            // the object is a boolean
            case 'boolean': size += 4; break;
            // the object is a number
            case 'number': size += 8; break;
            // the object is a string
            case 'string': size += 2 * objects[index].length; break;
            // the object is a generic object
            case 'object':
                // if the object is not an array, add the sizes of the keys
                if (Object.prototype.toString.call(objects[index]) != '[object Array]') {
                    for (var key in objects[index]) size += 2 * key.length;
                }
                // loop over the keys
                for (var key in objects[index]) {
                    // determine whether the value has already been processed
                    var processed = false;
                    for (var search = 0; search < objects.length; search++) {
                        if (objects[search] === objects[index][key]) {
                            processed = true;
                            break;
                        }
                    }
                    // queue the value to be processed if appropriate
                    if (!processed) objects.push(objects[index][key]);
                }
        }
    }
    // return the calculated size
    if (size > 1000) {
        size = size * 0.001 + "kb";
    }
    return size;
}
function SetNextMonthDate() {
    var tm = new Date();
    var month = (tm.getMonth() + 2).toString().length == 1 ? "0" + (tm.getMonth() + 2) : (tm.getMonth() + 2);
    var strDate = tm.getFullYear() + "-" + month + "-" + tm.getDate();
    return strDate;
}
function IncreaseDateByoneMonth(elem) {
    var increasByOneMonth = parseInt(elem.value.split("-")[1]) + 1;
    var month = increasByOneMonth.toString().length == 1 ? "0" + increasByOneMonth : increasByOneMonth;
    var year = parseInt(elem.value.split("-")[0]);
    var day = parseInt(elem.value.split("-")[2]);
    day = day.toString().length == 1 ? "0" + day : day;
    if (month == 13) {
        month = "01";
        year = year + 1;
    }
    var strDate = year + "-" + month + "-" + day;
    elem.value = strDate;
}
var app = {
    data: "Store data Return from server",
    language: "Language data comes from server and build object in _LayoutData partial view",
    url: {
        server: {
            DataGridView: "/Data/DataGridView",
            NewFavorite: "/Data/NewFavorite",
            AddNewFavorite: "/Data/AddNewFavorite",
            LoadQueryWindow: "/Data/LoadQueryWindow",
            RunQuery: "/Data/RunQuery",
            GetTrackbaleDataPerRow: "/Data/GetTrackbaleDataPerRow",
            ReturnFavoritTogrid: "/Data/ReturnFavoritTogrid",
            DeleteFavorite: "/Data/DeleteFavorite",
            LinkscriptButtonClick: "/Data/LinkscriptButtonClick",
            FlowButtonsClickEvent: "/Data/FlowButtonsClickEvent",
            SaveNewsURL: "/Data/SaveNewsURL",
            AddToFavorite: "/Data/AddToFavorite",
            StartDialogAddToFavorite: "/data/StartDialogAddToFavorite",
            CheckBeforeAddTofavorite: "/Data/CheckBeforeAddTofavorite",
            UpdateFavorite: "/Data/UpdateFavorite",
            DeleteFavoriteRecord: "/Data/DeleteFavoriteRecord",
            SaveNewQuery: "/Data/SaveNewQuery",
            LoadControls: "/DataToolsLayout/LoadControls",
            BtnSaveLocData_Click: "/DataToolsLayout/btnSaveLocData_Click",
            ChangePassword_click: "/DataToolsLayout/ChangePassword_click",
            DeleteQuery: "/Data/DeleteQuery",
            UpdateQuery: "/Data/UpdateQuery",
            RunglobalSearch: "/Data/RunglobalSearch",
            GlobalSearchClick: "/Data/GlobalSearchClick",
            GlobalSearchAllClick: "/Data/GlobalSearchAllClick",
            SetDatabaseChanges: "/Data/SetDatabaseChanges",
            IsDuplicatePrimaryKey: "/Data/IsDuplicatePrimaryKey",
            CheckForduplicateId: "/Data/CheckForduplicateId",
            DeleteRowsFromGrid: "/Data/DeleteRowsFromGrid",
            Drilldown: "/Data/Drilldown",
            BreadCrumbClick: "/Data/BreadCrumbClick",
            LoadFlyoutPartial: "/Common/LoadFlyoutPartial",
            LazyLoadPopupAttachments: "../Common/LazyLoadPopupAttachments",
            AddNewAttachment: "/Common/AddNewAttachment",
            TaskBarClick: "/Data/TaskBarClick",
            Reporting: "/data/Reporting",
            GetTotalrowsForGrid: "/data/GetTotalrowsForGrid",
            GetauditReportView: "/data/GetauditReportView",
            RunAuditSearch: "/data/RunAuditSearch",
            GetRetentionInfo: "/data/GetRetentionInfo",
            OnDropdownChange: "/data/OnDropdownChange",
            RetentionInfoUpdate: "/data/RetentionInfoUpdate",
            RemoveRetentioninfoRows: "/data/RemoveRetentioninfoRows",
            RetentionInfoHolde: "/data/RetentionInfoHolde"
        },
        Html: {
            DialogMsghtml: "ViewsHtml/DialogMsg.html",
            DialogMsghtmlConfirm: "ViewsHtml/DialogMsgConfirm.html",
            Reporting: "ViewsHtml/Reporting.html"
        }
    },
    domMap: {
        ToolBarButtons: {
            BtnDeleterow: "#btndeleterow",
            BtnTabquikId: "#tabquikId",
            BtnNewRow: "#btnNew",
            BtnPrint: "#btnPrint",
            BtnBlackWhite: "#btnBlackWhite",
            BtnExportCSVSelected: "#btnExportCSV",
            BtnExportCSVAll: "#btnExportCSVAll",
            BtnExportTXTSelected: "#btnExportTXT",
            BtnExportTXTAll: "#btnExportTXTAll",
            BtnRequest: "#btnRequest",
            BtnTransfer: "#btnTransfer",
            BtnTransferAll: "#btnTransferAll",
            BtnMoverows: "#btnMoverows",
            BtnTracking: "#btnTracking",
            BtnDeleteCeriteria: "#btnDeleteCeriteria",
            BtnNewFavorite: "#btnAddFavourite",
            BtnUpdateFavourite: "#btnUpdateFavourite",
            BtnremoveFromFavorite: "#removeFromFavorite",
            BtnImportFavourite: "#btnImportFavourite",
            BtnQuery: "#btnQuery",
            DivFavOptions: "#divFavOptions",
        },
        DataGrid: {
            ContentWrapper: "#page-content-wrapper",
            ToolsBarDiv: "#ToolBar",
            MainDataContainerDiv: "#mainDataContainer",
            TrackingStatusDiv: "#TrackingStatusDiv",
            HandsOnTableContainer: "#handsOnTableContainer",
            Paging: "#paging"
        },
        NewsFeed: {
            BtnSaveNewsURL: "#btnSaveNewsURL",
            TabNewsTable: "#TabNewsTable",
            TxtNewsUrl: "#txtNewsURL",
            NewsFrame: "#NewsFrame",
            MainDataContainer: "#mainDataContainer",
            IsTabfeed: "#isTabfeed",
            FooterTask: "#FooterTask",
            FooterlblAttampt: "#lblAttempt",
            FooterlblService: "#lblService"
        },
        Dialogboxbasic: {
            BasicDialog: "#BasicDialog",
            DlgBsContent: "#dlgBsContent", 
            DlgBsTitle: "#dlgBsTitle",
            Dlg: {
                DialogMsg: {
                    DialogMsgTxt: "#dialogMsgTxt"
                },
                DialogMsgConfirm: {
                    DialogMsgTxt: "#dialogMsgTxt",
                    DialogYes: "#dialogYes",
                    ListItem: "#listItem"
                },
            },
            Type: {
                PartialView: "HtmlPage",
                Content: "Content"
            },
            DlgbodyId: "#dlgbodyId"
        },
        DialogQuery: {
            MainDialogQuery: "#MainDialogQuery",
            QuerylblTitle: "#QuerylblTitle",
            QuerySaveInput: "#QuerySaveInput",
            ChekBasicQuery: "#chekBasicQuery",
            OkQuery: "#OkQuery",
            BtnCancel: "#btnCancel",
            BtnQueryApply: "#btnQueryApply",
            BtnSaveQuery: "#btnSaveQuery",
            QueryContentDialog: "#QueryContentDialog",
            Querytableid: "#querytableid",
            UpdateQuery: "#updateQuery"
        },
        DialogRecord: {
            DialogRecordSaveId: "#DialogRecordSaveId",
            DialogRecordMsg: "#DialogRecordMsg"
        },
        DialogAttachment: {
            Openformattachment: "#dialog-form-attachment",
            AttachmentModalBody: "#AttachmentModalBody",
            ThumbnailDetails: "#ThumbnailDetails",
            BtnAddAttachment: "#ModalAddAttachment",
            BtnopenAttachViewer: "#openAttachViewer",
            FileUploadForAddAttach: "#FileUploadForAddAttach",
            GotoScanner: "#gotoScanner",
            StringQuery: "#stringQuery",
            EmptydropDiv: "#emptydrop",
            StringEncript: "#stringEncript",
            paging: {
                ListThumbnailDetailsImg: "#ThumbnailDetails img",
                TotalRecCount: "#totalRecCount",
                ResultDisplay: "#resultDisplay",
                SPageIndex: "#sPageIndex",
                SPageSize: "#sPageSize"
            }
        },
        Favorite: {
            NewFavorite: {
                Ok: "#favoriveOk",
                ErrorMsg: "#Dialog_Favourites_lblError",
                FavNewInputBox: "#newfavinput"
            },
            AddToFavorite: {
                AddtofavoriteOK: "#AddtofavoriteOK",
                DDLfavorite: "#DDLfavorite"
            },
            RemoveFavorite: {
                RemoveConfimed: "#removeRecord"
            }
        },
        Layout: {
            MenuNavigation: {
                LeftSideMenuContainer: "#mCSB_1_container",
                MyQureyClickMenu: "#MyQueryClickMenu",
                MyFavClickMenu: "#MyfavClickMenu",
                GoHome: ".goHome",
                ToolsDialog: "#ToolsDialog"
            }
        },
        Myqury: {
            BtnDeleteMyquery: "#btnDeletemyquery",
        },
        GlobalSearching: {
            ChkAttachments: "#chkAttachments",
            ChkCurrentTable: "#chkCurrentTable",
            ChkUnderRow: "#chkUnderRow",
            TxtSearch: "#txtSearch",
            BtnSearch: "#btnSearch",
            DialogSearchInput: "#DialogSearchInput",
            DialogchkAttachments: "#DialogchkAttachments",
            DialogCurrenttable: "#DialogCurrenttable",
            DialogUnderthisrow: "#DialogUnderthisrow",
            DialogSearchButton: "#dialogSearchButton"
        },
        Breadcrumb: {
            olContainer: "#breadcrumbs"
        },
        Reporting: {
            ReportTitle: "#ReportTitle",
            PrintReport: "#printReport",
            itemDescription: "#itemDescription",
            HandsOnTableContainer: "#handsOnTableContainer",
            ShadowBox: "#shadowBox",
            Paging: {
            }
        },
        AuditReport: {
            ddlUser: "#ddlUser",
            ddlObject: "#ddlObject",
            txtObjectId: "#txtObjectId",
            dtStartDate: "#dtStartDate",
            dtEndDate: "#dtEndDate",
            chkSuccessLogin: "#chkSuccessLogin",
            chkAddEditDelL: "#chkAddEditDel",
            chkFailedLogin: "#chkFailedLogin",
            chkConfidential: "#chkConfidential",
            chkChildTable: "#chkChildTable",
            BtnauditRepoOk: "#auditReportOk",
            CheckboxMsg: "#CheckboxMsg"
        },
        Retentioninfo: {
            ddlRetentionCode: "#ddlRetentionCode",
            RetinCodeDesc: "#RetinCodeDesc",
            RetinItemName: "#RetinItemName",
            RetinStatus: "#RetinStatus",
            RetinInactiveDate: "#RetinInactiveDate",
            lblRetinArchive: "#lblRetinArchive",
            RetinArchive: "#RetinArchive",
            btnAddRetin: "#btnAddRetin",
            btnEditRetin: "#btnEditRetin",
            btnRemoveRetin:"#btnRemoveRetin",
            btnOkRetin: "#btnOkRetin",
            btnCancelRetin: "#btnCancelRetin",
            handsOnTableRetinfo: "#handsOnTableRetinfo"
        },
        RetentioninfoHold: {
            chkHoldTypeRetention: "#chkHoldTypeRetention",
            chkHoldTypeLegal: "#chkHoldTypeLegal",
            holdReason: "#holdReason",
            btnSnooze: "#btnSnooze",
            btnHoldOk: "#btnHoldOk",
            btnAddHoldeCancel: "#btnAddHoldeCancel",
            txtSnoozeDate: "#txtSnoozeDate",
            Dialog: {
                RetentionHoldingDialog: "#RetentionHoldingDialog",
                RetentionHoldingContent: "#RetentionHoldingContent",
                DlgHoldingTitle: "#DlgHoldingTitle"
            }
        }
    },
    ajax: {
        Type: {
            Post: "POST",
            Get: "GET",
            Put: "PUT",
            Delete: "DELETE"
        },
        DataType: {
            Json: "json",
            Html: "html",
            Text: "text",
            String: "string"
        },
        ContentType: {
            Utf8: "application/json; charset=utf-8",
            AppJson: "application/json",
            False: false,
            True: true
        },
        ProcessData: {
            False: false,
            True: true
        },
        Async: {
            False: false,
            True: true
        },
        Cache: {
            False: false,
            True: true
        }
    },
    ServerDataReturn: {
        QueryData: "Query data set from the server"
    },
    domBuilder: {
        BtnRemoveMyquery: '<div style="display:inline-block;" data-toggle="tooltip" data-original-title="Delete My Query"><button id="btnDeletemyquery" style="height:34px;margin-left:3px" class="btn btn-secondary tab_btn" type="button"><i class="fa fa-trash-o"></i></button></div>',
        GlobalSearchTitleInputs: '<div id = "divCustomSearch1" class="input-group search_box">'
            + '<input type="text" id="DialogSearchInput" autocompletetype="Search" maxlength="256" class="form-control" title="Searches all views in the database for matching words.">'
            + '<span class="input-group-btn">'
            + '<button type="button" id="dialogSearchButton" title="Search" class="btn btn-default glyphicon glyphicon-search"></button></div>'
            + '<div class="input-group checkbox search_checkbox m-t-5" style="display:inline-flex;">'
            + '<span><input type="checkbox" id="DialogchkAttachments" tooltip="Search attachment text"><label>Include attachments</label></span>&nbsp;&nbsp;'
            + '<span style="display:none;"><input type="checkbox" id="DialogCurrenttable" tooltip="Search attachment text"><label>Current table only</label></span>&nbsp;&nbsp;'
            + '<span style="display:none;"><input type="checkbox" id="DialogUnderthisrow" tooltip="Search attachment text"><label>Under this row only</label></span>&nbsp;&nbsp;'
            + '</div>'
    },
    globalverb: {
        BuildRowFromCells: [],
        IsServerProcessing: false,
        SaveRowDialog: "",
        LastRowSelected: null,
        LastLeftmenuClick: "",
        Isnewrow: false,
        beforePast: "",
    },
    SpinningWheel: {
        Main: "#spinningWheel",
        Grid: "#spingrid",
        Total: "#spinTotal"
    },
    BreadCrumb: {
        CrumbContextmenu: "#CrumbContextmenu",
    },
    Enums: {
        Reports: {
            AuditHistoryPerRow: 0,
            TrackingHistoryPerRow: 1,
            ContentsPerRow: 2
        },
        Error: {
            DuplicatedId: 2627,
            ConversionFailed: 245
        }
    },
    DomLocation: {
        Current: "",
        Previous: "",
    },
    Linkscript: {
        isBeforeAdd: false,
        isAfterAdd: false,
        isBeforeEdit: false,
        isAfterEdit: false,
        isBeforeDelete: false,
        isAfterDelete: false,
        ScriptDone: false,
        id: ""
    }
}






var dlgClose = new DialogBoxBasic();


