/*global obejcts explain
###showAjaxReturnMessage### ? toast popup object for messaging.
###rowselected### ? handsontable row selected.
###app### ? global object that return all fusion objectives
###buildQuery### ? build query object to the query window.
###currentFavorite### ? create element from the current query.
###hot### ? for handsontable object
*/
let dlg;
let rowselected = [];
var buildQuery = [];
let currentFavorite = "";
let currentQuery = "";
let LinkScriptObjective;
let hot;
let hotRetention
var bc = document.querySelector(app.domMap.Breadcrumb.olContainer);
//GRID FUNCTIONS
class GridFunc {
    constructor() {
        this.StartQuery = getCookie('startQuery');
        this.SaveQueryContent = "";
        this.ViewId = "";
        this.ViewName = "";
        this.TableName = "";
        this.pageNum = "";
        this.ViewTitle = "";
        this.RowKeyid = "";
        this.FavCeriteriaid = "";
        this.FavCriteriaType = "";
        this._isTableTrackble = "";
        this.KeyValue = "";
        this.AfterChange = "";
        this.BeforeChange = "";
        this.LastLeftmenuClick = "";
        this.isPagingClick = false;
    }
    LoadView(elemnt, viewId) {
        app.DomLocation.Current = elemnt;
        this.isPagingClick = false;
        bc.innerHTML = "";
        //reset and empty objects 
        obJbreadcrumb = new BreadCrumb();
        obJdrildownclick = new DrilldownClick();
        buildQuery = [];

        this.ViewId = viewId;
        this.ViewTitle = elemnt.innerText;
        this.StartQuery = getCookie('startQuery');

        //this.MyQueryName = getCookie('myQueryName');
        //setup myquery.updatemode to false as it doenst call from the myquery
        obJmyquery.updatemode = false;
        //this.StartQuery = "True";
        //check if requeired open query window
        if (this.StartQuery == "True") {
            obJreports.isCustomeReportCall = false;
            obJquerywindow.LoadQueryWindow(0);
        } else {
            this.LoadViewTogrid(viewId, 1);
        }
        this.MarkSelctedMenu(elemnt)
    }
    MarkSelctedMenu(elemnt) {
        //select the menu clicked.
        $('.divMenu').find('a.selectedMenu').removeClass('selectedMenu');
        elemnt.className = 'selectedMenu';
    }
    LoadViewTogrid(viewId, PageNum) {
        var _this = this;
        this.pageNum = PageNum;
        var data = JSON.stringify({ params: this, searchQuery: buildQuery });
        return new Promise((resolve, reject) => {
            var call = new DataAjaxCall(app.url.server.RunQuery, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "")
            $(app.SpinningWheel.Main).show();
            call.Send().then((data) => {
                _this.LoadGridpartialView(data).then(function () {
                    $(app.SpinningWheel.Main).hide();
                    resolve(true);
                });
            });
        });
    }
    //main call to return grid data to the dom;
    LoadGridpartialView(data) {
        //clear array builder for query.
        var _this = this;
        app.globalverb.Isnewrow = false;
        _this.ViewTitle = data.ViewName;
        _this.TableName = data.TableName;
        _this.ViewName = data.ViewName
        return new Promise((resolve, reject) => {
            $("#mainContainer").load(app.url.server.DataGridView, function () {
                resolve();
                app.data = data;
                _this.AfterLoadPartialToGrid(data);
            });
        });
    }
    AfterLoadPartialToGrid(data) {
        var _this = this;
        obJgridfunc.ViewId = data.ViewId;
        $(app.domMap.DataGrid.ToolsBarDiv).html(data.ToolBarHtml);
        //check if there are attach, drilldown row if yes? give static width
        //obJHst.colWidthArray = _this.CalcFirstThreeColsWidth(data);
        //check if table is empty if yes add new empty row
        _this.CheckIfTableisEmpty(data)
        //reset condition variable for rows
        this.isConditionPass = true;
        HandsOnTableViews.RunhandsOnTable(data);
        //check condition before showing the TrackingStatusDiv
        _this._isTableTrackble = data.ShowTrackableTable;
        data.ShowTrackableTable != true ? $(app.domMap.DataGrid.TrackingStatusDiv).hide() : $(app.domMap.DataGrid.TrackingStatusDiv).show();
        $(app.domMap.DataGrid.MainDataContainerDiv).height($("#page-content-wrapper").height() - $('.footer').height() - $('#TaskContainer').height());
        //condition for update query if the query open from myquey create delete button.
        if (obJmyquery.updatemode) {
            $(app.domMap.ToolBarButtons.DivFavOptions).after(app.domBuilder.BtnRemoveMyquery);
        }
        //checkboxes condition for global search
        document.querySelector(app.domMap.GlobalSearching.ChkCurrentTable).parentElement.style.display = "block";
        document.querySelector(app.domMap.GlobalSearching.ChkUnderRow).parentElement.style.display = "block";
        //clear the app.globalverb.SaveBuildRow array to start new array before saving
        app.globalverb.BuildRowFromCells = [];
        //check the first column and start in the first available cell
        hot.selectCell(0, _this.StartInCell());
        //click on the dom after new view loaded(the purpose of doing it is because we want to refresh the drill down link)
        var MainContainer = document.querySelector(app.domMap.DataGrid.MainDataContainerDiv);
        MainContainer.click();
        //creat bread crumbs
        obJbreadcrumb.CreateFirstCrumb(data);
    }
    CheckIfTableisEmpty(data) {
        var arr = [];
        if (data.ListOfDatarows.length === 0 || data.ListOfDatarows.length === 1) {
            data.ListOfHeaders.map((each, i) => {
                if (i === 0)
                    arr.push(null);
                else
                    if (data.ListOfHeaders[i].DataType === "Boolean") {
                        arr.push("False");
                    } else {
                        arr.push("");
                    }
            });
            var addRows = 0;
            if (data.ListOfDatarows.length === 0) {
                addRows = 2;
            } else if (data.ListOfDatarows.length === 1) {
                addRows = 1;
            }

            for (var i = 0; i < addRows; i++) {
                var clone = Array.from(arr)
                data.ListOfDatarows.unshift(clone);
            }
        }
    }
    HideQueryBody(elem) {
        var arrow = $(elem);
        if (arrow.hasClass("fa fa-angle-up")) {
            $("#modelBody").hide().next().hide();
            arrow.removeClass("fa fa-angle-up");
            arrow.addClass("fa fa-angle-down");
        } else {
            $("#modelBody").show().next().show();
            arrow.removeClass("fa fa-angle-down");
            arrow.addClass("fa fa-angle-up");
        }
    }
    Pagechange(elem) {
        this.isPagingClick = true;
        this.pageNum = parseInt(elem.value);
        this.SendQueryToserver()
    }
    goNext() {
        this.isPagingClick = true;
        var inputField = document.getElementsByClassName('page-number')[0];
        var txtTotalPages = document.getElementsByClassName('total-pages')[0];
        var currentPage = parseInt(inputField.value);
        var TotalPages = parseInt(txtTotalPages.innerHTML);
        if (currentPage < TotalPages) {
            this.pageNum = currentPage + 1;
            this.SendQueryToserver()
            inputField.value = currentPage + 1;
        }
    }
    goBack() {
        this.isPagingClick = true;
        var inputField = document.getElementsByClassName('page-number')[0];
        var currentPage = parseInt(inputField.value);
        if (currentPage > 1) {
            this.pageNum = currentPage - 1;
            //setCookie("CurrentviewId", this.ViewId + "," + parseInt(this.pageNum));
            this.SendQueryToserver();
            inputField.value = currentPage - 1;
            //this.LoadViewTogrid(this.ViewId, currentPage - 1);

        }
    }
    InsertNewrow() {
        var btnNew = document.querySelector(app.domMap.ToolBarButtons.BtnNewRow);
        //create new row array
        if (app.globalverb.Isnewrow === false) {
            //bind the row inside the object
            //check if row one or two is a new row already 
            var rows = [hot.getDataAtRow(0)[0], hot.getDataAtRow(1)[0]]
            var needNewRow = true;
            rows.map((v, i) => {
                if (v === null) {
                    needNewRow = false;
                    this.AfterInsertNewrow(i);
                }
            });

            if (needNewRow === false) { return }
            //insert to the top
            hot.alter("insert_row", 0, 1);
            ////scroll up to the top
            hot.scrollViewportTo(0, 0);
            ////highlight the row and cell
            hot.selectCell(0, this.StartInCell());
            this.AfterInsertNewrow(0);
            ////design the new btn for different approach. 
            //btnNew.disabled = true;
            btnNew.value = "Cancel";
            btnNew.style.backgroundColor = "red"
            app.globalverb.Isnewrow = true;
            ////place validation fields
            this.CheckNewRowConditions();
        } else {
            this.CancelNewRow(btnNew);
            //hot.alter('remove_row', 0);
            //btnNew.value = "New";
            //btnNew.style.backgroundColor = "white"
            //app.globalverb.Isnewrow = false;
            //obJgridfunc.isConditionPass = true;

            //showAjaxReturnMessage("Row saved successfuly", "s");
            ////design the new btn for different approach. 
            //btnNew.disabled = false;
            //isnewrow = false;
        }
    }
    CancelNewRow(btnNew) {
        hot.alter('remove_row', 0);
        btnNew.value = "New";
        btnNew.style.backgroundColor = "white"
        app.globalverb.Isnewrow = false;
        obJgridfunc.isConditionPass = true;
    }
    AfterInsertNewrow(index) {
        var cell = hot.getCell(index, this.StartInCell());
        cell.innerHTML = "<b>new row!</b>"
        cell.style.textAlign = "center";
        cell.style.color = "green";
    }
    GetRowTrackTableData() {
        var call = new DataAjaxCall(app.url.server.GetTrackbaleDataPerRow, app.ajax.Type.Get, app.ajax.DataType.Json, this, "", "", "", "")

        call.Send().then((data) => {
            document.getElementById("lblTrackTime").innerHTML = data.lblTrackTime;
            document.getElementById("lblTracking").innerHTML = data.lblTracking;
            document.getElementById("lblDueBack").innerHTML = data.lblDueBack;
        });

    }
    SendQueryToserver() {
        var _this = this;
        //ajax call
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ params: this, searchQuery: buildQuery });
            var call = new DataAjaxCall(app.url.server.RunQuery, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "", "")
            $(app.SpinningWheel.Main).show();
            call.Send().then((data) => {
                _this.LoadGridpartialView(data).then(() => {
                    $(app.SpinningWheel.Main).hide();
                    resolve(true);
                });
            })
        });
        //$("#mainDataContainer").height($("#page-content-wrapper").height() - $('.footer').height() - $('#TaskContainer').height());
    }
    GetSelectedRowskey() {
        var RowKeys = [];
        rowselected.sort(function (a, b) { return a - b })
        for (var i = 0; i < rowselected.length; i++) {
            var rowkey = hot.getDataAtRow(rowselected[i])[0]
            RowKeys.push({ rowKeys: rowkey, })
        }
        return RowKeys
    }
    GridControlKeys(event, coords) {
        //when saving to server stop any keys
        if (app.globalverb.IsServerProcessing) {
            event.stopImmediatePropagation();
        }
        //const keyCodes = [40, 38, 39, 37, 9, 13];
        const keyCodes = [40, 38, 13];
        if (keyCodes.includes(event.keyCode)) {
            console.log(event.keyCode);
            if (this.isConditionPass === false) {
                event.stopImmediatePropagation();
                hot.selectCell(obJgridfunc.row, obJgridfunc.cell);
            }
            //if call to server running
            //if (app.globalverb.Isnewrow) {
            //    if (event.keyCode === 40 || event.keyCode === 38 || event.type === 'mousedown' && coords.row !== 0) {
            //        if (this.CheckNewRowConditions() !== 0) {
            //            event.stopImmediatePropagation();
            //        }
            //    } else {
            //        if (this.CheckNewRowConditions() !== 0) {
            //        }
            //    }
            //} else {
            //    for edit
            //    if (this.isConditionPass === false) {
            //        hot.selectCell(obJgridfunc.row, obJgridfunc.cell);
            //        event.stopImmediatePropagation();
            //    }
            //}
        }
    }
    CheckNewRowConditions() {
        var counter = 0;
        for (var i = 0; i < hot.countCols(); i++) {
            var MaxLength = app.data.ListOfHeaders[i].MaxLength;
            var cell = hot.getCell(0, i);
            var maxString = hot.getDataAtCell(0, i) === null ? 0 : hot.getDataAtCell(0, i).length;
            if (hot.getCellMeta(0, i).allowEmpty === false) {
                if (hot.getDataAtCell(0, i) === "" || hot.getDataAtCell(0, i) === null) {
                    cell.innerHTML = "<b>Required!</b>"
                    cell.style.textAlign = "center";
                    cell.style.color = "#990000";
                    counter++;
                }
            }

            //if (maxString > MaxLength && MaxLength !== -1 && hot.getCellMeta(0, i).allowEmpty !== true) {
            //    cell.innerHTML = '<b>' + app.data.ListOfHeaders[i].MaxLength + ' char max</b>'
            //    cell.style.textAlign = "center";
            //    cell.style.color = "red";
            //    counter++;
            //}
        }
        //count if any field required
        if (counter === 0) {
            this.isConditionPass = true
            this.isInsertNewCompleted = true;
        } else {
            this.isConditionPass = false;
            this.isInsertNewCompleted = false;
        }

        return counter;
    }
    CheckRowConditions(change) {
        //first check if afterChange k built the properties if not it meant that cell never change and there is no reason to run this function.
        /*if (change.row === undefined && change.cell === undefined && change.Bchange === undefined && change.Achange === undefined) return Promise.resolve(true);*/
        //var _this = this;
        //this.isConditionPass = true;
        var isPass = true;
        //var cell = hot.getCell(change.row, change.cell);
        var MaxLength = app.data.ListOfHeaders[change.cell].MaxLength;
        var maxString = change.Achange === null ? 0 : change.Achange.length;
        if (maxString > MaxLength && MaxLength !== -1) {
            var cell = hot.getCell(change.row, change.cell)
            hot.setDataAtCell(change.row, change.cell, "");
            cell.innerHTML = '<b>' + app.data.ListOfHeaders[change.cell].MaxLength + ' char max</b>'
            cell.style.textAlign = "center";
            cell.style.color = "#990000";
            //hot.selectCell(change.row, i)
            return false;
        }

        for (var i = 0; i < hot.countCols(); i++) {
            if (i >= obJgridfunc.StartInCell()) {
                var cell = hot.getCell(change.row, i);
                if (hot.getCellMeta(change.row, i).allowEmpty === false && !hot.getDataAtCell(change.row, i)) {
                    cell.innerHTML = "<b>Required!<b/>"
                    cell.style.textAlign = "center";
                    cell.style.color = "red";
                    //hot.selectCell(change.row, i)
                    return false;
                }


                //if (hot.getCellMeta(change.row, change.cell).valid === false) {
                //    cell.innerHTML = "<b>wrong format!<b/>"
                //    cell.style.textAlign = "center";
                //    cell.style.color = "red";
                //    hot.selectCell(change.row, i)
                //    isPass = false;
                //}

            }
        }
        return isPass;
    }
    GetPrimaryKeyColumn() {
        const primaryKeyIndex = app.data.ListOfHeaders.findIndex(eachColumnHeader => eachColumnHeader.IsPrimarykey);
        return primaryKeyIndex;
    }
    BuildOneRowBeforeSave(currentrow) {
        //reset the prperties from afterchange hook
        this._BuildRowFromCell = app.globalverb.BuildRowFromCells;
        this.CurrentRow = app.globalverb.LastRowSelected
        return new Promise((resolve, reject) => {
            if (app.globalverb.LastRowSelected !== null && app.globalverb.LastRowSelected !== currentrow) {
                if (this._BuildRowFromCell.length > 0) {
                    //this.CurrentRow = app.globalverb.LastRowSelected;
                    this.pkey = hot.getDataAtRow(app.globalverb.LastRowSelected)[0];
                    //build row parentID
                    if (app.data.fvList.length > 0) {
                        var dt = app.data.fvList[0];
                        this._BuildRowFromCell.push({ value: dt.value, columnName: dt.Field, DataTypeFullName: dt.DataType })
                    }
                    //if (obJbreadcrumb.rowid != 0) {
                    //    this._BuildRowFromCell.push({ value: obJbreadcrumb.rowid, columnName: obJbreadcrumb.childkeyField, DataTypeFullName: obJbreadcrumb.columnType })
                    //}
                    //build row pkey
                    this._BuildRowFromCell.push({ value: this.pkey, columnName: "", DataTypeFullName: "" })

                    //fire save method
                    this.SaveRowAfterBuild().then(isError => resolve(!isError));
                } else {
                    app.globalverb.LastRowSelected = currentrow;
                    this.CurrentRow = app.globalverb.LastRowSelected;
                }
            } else {
                app.globalverb.LastRowSelected = currentrow;
                this.CurrentRow = app.globalverb.LastRowSelected;
            }
        })
    }
    SaveRowAfterBuild() {

        var _this = this;
        var params = {};
        params.ViewId = obJgridfunc.ViewId;
        params.BeforeChange = _this.BeforeChange;
        params.AfterChange = _this.AfterChange;
        params.scriptDone = app.Linkscript.ScriptDone;
        var data = JSON.stringify({ Rowdata: this._BuildRowFromCell, params: params });
        app.globalverb.IsServerProcessing = true;
        $(app.SpinningWheel.Grid).show();
        var call = new DataAjaxCall(app.url.server.SetDatabaseChanges, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        return new Promise(resolve => {
            call.Send().then((data) => {
                if (data.scriptReturn.isBeforeAddLinkScript && app.Linkscript.ScriptDone == false) {
                    app.Linkscript.isBeforeAdd = data.scriptReturn.isBeforeAddLinkScript
                    app.Linkscript.id = data.scriptReturn.ScriptName;
                    $(app.SpinningWheel.Grid).hide();
                    //run linkscript
                    obJlinkscript.ClickButton(app.Linkscript);
                } else if (data.scriptReturn.isBeforeEditLinkScript && app.Linkscript.ScriptDone == false) {
                    app.Linkscript.isBeforeEdit = data.scriptReturn.isBeforeEditLinkScript;
                    app.Linkscript.id = data.scriptReturn.ScriptName;
                    $(app.SpinningWheel.Grid).hide();
                    //run linkscript
                    obJlinkscript.ClickButton(app.Linkscript);
                } else {
                    _this.AfterSaveRow(data)
                    resolve(data.isError);
                    $(app.SpinningWheel.Grid).hide();
                    app.globalverb.IsServerProcessing = false;
                }
                resolve();
            });
        })
    }
    AfterSaveRow(data) {
        //check for error
        if (this.ErrorHandler(data)) { return }
        //compare the two keys after return from the server (concept for if user change the pkey in the field)
        if (this.pkey !== data.keyvalue) {
            for (var i = 0; i < app.data.ListOfHeaders.length; i++) {
                var isempty = hot.getDataAtRow(this.CurrentRow)[i];
                if (app.data.ListOfHeaders[i].IsPrimarykey)
                    hot.setDataAtCell(this.CurrentRow, i, data.keyvalue);
            }

            //set the pkey
            hot.setDataAtCell(this.CurrentRow, 0, data.keyvalue);
            var btnNew = document.querySelector(app.domMap.ToolBarButtons.BtnNewRow);
            if (app.globalverb.Isnewrow) {
                btnNew.value = "New";
                btnNew.style.backgroundColor = "white"
                app.globalverb.Isnewrow = false;
            }
        }
        //var rownum = this.CurrentRow;
        showAjaxReturnMessage('Row - ' + this.CurrentRow + ' Id: ' + this.pkey + ' saved successfuly!', 's')
        //linkscript after
        if (data.scriptReturn.isAfterAddLinkScript) {
            app.Linkscript.isAfterAdd = data.scriptReturn.isAfterAddLinkScript
            app.Linkscript.id = data.scriptReturn.ScriptName;
            $(app.SpinningWheel.Grid).hide();
            obJlinkscript.ClickButton(app.Linkscript);
        } else if (data.scriptReturn.isAfterEditLinkScript) {
            app.Linkscript.isAfterEdit = data.scriptReturn.isAfterEditLinkScript;
            app.Linkscript.id = data.scriptReturn.ScriptName;
            $(app.SpinningWheel.Grid).hide();
            obJlinkscript.ClickButton(app.Linkscript);
        }
    }
    ErrorHandler(data) {
        this.isError = data.isError;
        if (data.isError) {
            switch (data.errorNumber) {
                case app.Enums.Error.DuplicatedId:
                    hot.selectCell(this.CurrentRow, this.GetPrimaryKeyColumn())
                    hot.setDataAtCell(this.CurrentRow, this.GetPrimaryKeyColumn(), "");
                    showAjaxReturnMessage(data.Msg, "e");
                    break;
                case app.Enums.Error.ConversionFailed:
                    hot.selectCell(this.CurrentRow, this.cell)
                    hot.setDataAtCell(this.CurrentRow, this.cell, "");
                    showAjaxReturnMessage(data.Msg, "e");
                    break;
                default:
                    hot.selectCell(this.CurrentRow, this.cell);
                    obJgridfunc.isConditionPass = false;
                    showAjaxReturnMessage(data.Msg, "e");
            }
        };
        return this.isError;
    }
    StartInCell() {
        var cell = 0; //never be zero
        if (app.data.HasAttachmentcolumn && app.data.HasDrillDowncolumn) {
            cell = 3;
        } else if (app.data.HasAttachmentcolumn === false && app.data.HasDrillDowncolumn === false) {
            cell = 1;
        } else if (app.data.HasAttachmentcolumn === true && app.data.HasDrillDowncolumn === false) {
            cell = 2;
        } else if (app.data.HasAttachmentcolumn === false && app.data.HasDrillDowncolumn === true) {
            cell = 2
        }
        return cell;
    }
    CalcFirstThreeColsWidth(data) {
        if (data.HasAttachmentcolumn && app.data.HasDrillDowncolumn) {
            return [0, 10, 17];
        } else if (data.HasAttachmentcolumn === false && app.data.HasDrillDowncolumn === false) {
            return []
        } else if (data.HasAttachmentcolumn === true && app.data.HasDrillDowncolumn === false) {
            return [0, 5];
        } else if (data.HasAttachmentcolumn === false && app.data.HasDrillDowncolumn === true) {
            return [0, 5];
        }
    }
}
//DRILLDOWN FUNCTIONS 
class DrilldownClick {
    constructor() {
    }
    Run(childtablename, childKeyfield, childviewid, childusername, index, Parentviewid, viewname, ChildKeyType, calltype = "") {
        //check if is new row if yes don't allow drilldown
        if (hot.getDataAtRow(rowselected)[0] === null) {
            var cell = hot.getCell(rowselected[0], obJgridfunc.StartInCell())
            cell.innerHTML = "<b>new row!</b>"
            cell.style.textAlign = "center";
            cell.style.color = "green";
            showAjaxReturnMessage("New row! can't drill down", "w");
            return;
        }

        //keep the previous viewid and viewname after the call to server end in line 576
        var preViewid = obJgridfunc.ViewId;
        var preViewname = obJgridfunc.ViewName
        var prevQuery = Array.from(buildQuery);
        //prepare params to send to the API RunQuery
        obJgridfunc.ViewId = childviewid;
        obJgridfunc.pageNum = 1;
        obJgridfunc.preTableName = app.data.TableName;
        obJgridfunc.Childid = hot.getDataAtCell(rowselected, 0);

        buildQuery = [];
        buildQuery.push({ columnName: childKeyfield, ColumnType: ChildKeyType, operators: "=", values: obJgridfunc.GetSelectedRowskey()[0].rowKeys, islevelDownProp: true });

        var data = JSON.stringify({ params: obJgridfunc, searchQuery: buildQuery })
        var call = new DataAjaxCall(app.url.server.RunQuery, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((data) => {
            obJgridfunc.LoadGridpartialView(data).then(() => {
                obJbreadcrumb.RightClickList = data.ListOfBreadCrumbsRightClick;
                //build crumbs
                bc.children[bc.children.length - 1].remove()
                obJbreadcrumb.CreateHtmlCrumbLink(hot.getDataAtCell(rowselected, 0), childKeyfield, ChildKeyType, preViewid, preViewname, prevQuery);
                obJbreadcrumb.CreateCrumbHeader(viewname, "");
            });
        });
    }
}
//BREAD CRUMBS FUNCTIONS
class BreadCrumb {
    constructor() {
        this.BreadCrumbsList = [];
        this.RightClickList = [];
        this.brcounter = -1;
        this.rowid = 0;
        this.childkeyField = "";
        this.columnType = "";
        this.CrumbOrder = 0;
        this.previousChildid = "";
    }
    CreateFirstCrumb(data) {
        //this.rowid = "";
        //this.childkeyField = "";
        if (bc.children.length === 0) {
            bc.innerHTML += "<li style='font-weight:bold;cursor: pointer' onclick='obJbreadcrumb.ClickOnFirstBreadCrumbs()' data-toggle='tooltip' data-original-title='" + data.ViewName + "'><a href='#'><u>" + data.ViewName + "</u></a></li>"
            $('[data-toggle="tooltip"]').tooltip()
        }
        //bc.children[0].dataset.lastQuery = JSON.stringify(buildQuery)
        //bc.innerHTML += "<li style='font-weight:bold' data-toggle='tooltip' data-original-title='" + data.ViewName + "'>" + data.ViewName + "</li>"
        //$('[data-toggle="tooltip"]').tooltip()
    }
    ClickOnFirstBreadCrumbs() {
        app.DomLocation.Current.click()
    }
    CreateCrumbHeader(viewName, calltype) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        li.setAttribute("data-toggle", "tooltip");
        span.style.fontWeight = "bold";
        li.append(span);
        bc.append(li);

        switch (calltype) {
            case app.Enums.Reports.AuditHistoryPerRow:
                li.setAttribute("data-original-title", "Audit-Report");
                span.innerText = "Audit-Report";
                break;
            case app.Enums.Reports.TrackingHistoryPerRow:
                li.setAttribute("data-original-title", "Tracking History");
                span.innerText = "Tracking History";
                break;
            case app.Enums.Reports.ContentsPerRow:
                li.setAttribute("data-original-title", "Contents");
                span.innerText = "Contents";
                break;
            default:
                li.setAttribute("data-original-title", viewName);
                li.oncontextmenu = obJbreadcrumb.RightClickBuilder;
                span.innerText = viewName;
        }
        $('[data-toggle="tooltip"]').tooltip();
    }
    CreateHtmlCrumbLink(rowid, childkeyfeild, columType, preViewid, preViewname, prevQuery) {
        //create child fields to use later
        this.rowid = rowid;
        this.childkeyField = childkeyfeild;
        this.columnType = columType;

        var li = document.createElement("li");
        var a = document.createElement("a");
        var span = document.createElement("span");
        var span1 = document.createElement("span");
        a.setAttribute("href", "#");
        a.setAttribute("data-toggle", "tooltip");

        //a.setAttribute("data-original-title", "(" + obJgridfunc.ViewName + ") - row - " + rowid);
        a.setAttribute("data-original-title", app.data.ItemDescription)
        a.innerHTML = "(" + preViewname + ")";
        span.className = "fa fa-level-down";
        span.style.marginLeft = "2px";
        span.style.fontSize = "10px";
        a.innerHTML += " - " + app.data.ItemDescription;
        a.append(span);
        li.append(a);
        span1.className = "fa fa-angle-right";
        span1.style.color = "#3f3f3f";
        span1.style.fontWeight = "bold"
        span1.style.fontSize = "13px";
        span1.style.marginLeft = "3px"
        li.append(span1);
        li.setAttribute("onclick", "obJbreadcrumb.ClickOnCrumb(this)")
        li.dataset.childkeyField = childkeyfeild
        li.dataset.rowid = rowid;
        li.dataset.keyfieldValue = rowid;
        li.dataset.columType = columType;
        li.dataset.viewId = preViewid;
        li.dataset.CrumbOrder = bc.children.length;
        li.dataset.lastQuery = JSON.stringify(prevQuery);
        //li.dataset.lastQuery = JSON.stringify(buildQuery);
        //buildQuery = [];
        bc.append(li);
    }
    ClickOnCrumb(event) {
        var _this = this;
        var _event = event;
        this.firstCall = true;
        var liOrder = parseInt(event.dataset.CrumbOrder);
        var crumbChilds = event.parentElement.children.length - 1;
        for (var i = 0; i < crumbChilds; i++) {
            if (i >= liOrder) {
                event.nextElementSibling.remove();
            }
        }
        //var lastQuery = JSON.parse(event.dataset.lastQuery);
        //var getval = bc.children[liOrder - 1];
        //if (liOrder !== 0) {
        //    lastQuery.unshift({ columnName: getval.dataset.childkeyField, ColumnType: getval.dataset.columType, operators: "=", values: getval.dataset.keyfieldValue })
        //} else {
        //    //reset drilldownclick object
        //    obJdrildownclick = new DrilldownClick();
        //    obJbreadcrumb = new BreadCrumb();
        //}
        obJdrildownclick = new DrilldownClick();
        obJbreadcrumb = new BreadCrumb();
        //get the last crumb query from the html dataset
        buildQuery = [];
        buildQuery = JSON.parse(event.dataset.lastQuery)
        this.ViewId = event.dataset.viewId;
        this.pageNum = 1;
        var data = JSON.stringify({ params: this, searchQuery: buildQuery });
        $(app.SpinningWheel.Main).show();
        var call = new DataAjaxCall(app.url.server.RunQuery, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((data) => {
            obJgridfunc.LoadGridpartialView(data).then(() => {
                obJbreadcrumb.RightClickList = data.ListOfBreadCrumbsRightClick;
                //remove link and create header
                if (parseInt(_event.dataset.CrumbOrder) === 0) {
                    _event.remove();
                    obJbreadcrumb.CreateFirstCrumb(data);
                } else {
                    obJbreadcrumb.rowid = _event.previousElementSibling.dataset.rowid;
                    obJbreadcrumb.childkeyField = _event.previousElementSibling.dataset.childkeyField;
                    _event.remove();
                    obJbreadcrumb.CreateCrumbHeader(data.ViewName);
                }
            });
            $(app.SpinningWheel.Main).hide();
        });

    }
    RightClickBuilder(ev) {
        ev.preventDefault();
        //dynamic position the popup right click list
        var Calcli = 0;
        for (var j = 0; j < bc.children.length; j++) {
            if (bc.children.length !== j + 1) {
                Calcli += bc.children[j].offsetWidth;
            }
        }
        var posY = ev.offsetY + 4;
        var posX = Calcli
        //anytime remove the context popup and build it again 
        $(app.BreadCrumb.CrumbContextmenu).remove();
        //build right click list
        ev.target.innerHTML += "<ul id='CrumbContextmenu' class='context-menu-list context-menu-root' style='width: 206px; top: " + posY + "; left: " + posX + "; z-index: 1999;'>"
        for (var i = 0; i < obJbreadcrumb.RightClickList.length; i++) {
            $(app.BreadCrumb.CrumbContextmenu).append("<li class='context-menu-item' onclick='obJbreadcrumb.ClickOnrightClickView(this," + obJbreadcrumb.RightClickList[i].viewId + ")' style='cursor: pointer; color:#2f2f2f'>" + obJbreadcrumb.RightClickList[i].viewName + "</li></ul>");
        }

        //bread crumns events
        $("body").on("mouseover", app.BreadCrumb.CrumbContextmenu + " li", (ev) => {
            var context = document.querySelector(app.BreadCrumb.CrumbContextmenu)
            for (var i = 0; i < context.children.length; i++) {
                context.children[i].style.backgroundColor = "white";
            }
            ev.target.style.backgroundColor = "#2980b9"
            //ev.currentTarge.style.background = "#2980b9";
        });

        $("body").on("mouseleave", app.BreadCrumb.CrumbContextmenu, (ev) => {
            $(app.BreadCrumb.CrumbContextmenu).remove();
        });

        return false;
    }
    ClickOnrightClickView(elem, viewid) {
        elem.parentElement.parentElement.firstChild.nodeValue = elem.textContent
        var model = {};
        //model.Childid = obJbreadcrumb.rowid;
        //model.ChildKeyField = obJbreadcrumb.childkeyField;
        //model.ChildViewid = viewid;
        model.ViewId = viewid;
        model.pageNum = 1;
        //buildQuery = [];
        var data = JSON.stringify({ params: model, searchQuery: buildQuery })
        var call = new DataAjaxCall(app.url.server.RunQuery, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((data) => {
            obJgridfunc.LoadGridpartialView(data).then(() => {

            });
        });
    }
}
//QUERY WINDOW FUNCTIONS
class QueryWindow {
    constructor() {
        this.SaveQueryContent = "";
    }
    LoadQueryWindow(IsmyQuerycall) {
        var _this = this;
        //always show title in the first dialog popup. hide the input and show the lavel.
        var title = $(app.domMap.DialogQuery.QuerylblTitle);
        $(app.domMap.DialogQuery.QuerySaveInput).hide();
        title.show();
        title.html(obJgridfunc.ViewTitle);
        return new Promise((resolve, reject) => {
            var data = { viewId: obJgridfunc.ViewId, ceriteriaId: IsmyQuerycall };
            var call = new DataAjaxCall(app.url.server.LoadQueryWindow, app.ajax.Type.Get, app.ajax.DataType.Html, data, "", "", "", "");
            call.Send().then((data) => {
                //place content in content div
                _this.SaveQueryContent = data;
                $(app.domMap.DialogQuery.QueryContentDialog).html(data)
                if (getCookie('startQuery') === "True") {
                    _this.ShowPopupWindow();
                } else if (IsmyQuerycall === -1) {
                    _this.ShowPopupWindow();
                }
                resolve(true);
                obJmyquery.updatemode = false;
            })
        })
    }
    ShowPopupWindow() {
        $(app.domMap.DialogQuery.MainDialogQuery).show();
        $('.modal-dialog').draggable({
            handle: ".modal-header",
            stop: function (event, ui) {
            }
        });
        //arrow condition up and down.
        if ($("#arrowUpDown").hasClass("fa fa-angle-down")) {
            $("#arrowUpDown").removeClass("fa fa-angle-down");
            $("#arrowUpDown").addClass("fa fa-angle-up");
        }
        //setup checkbox basic query
        var check = document.querySelector(app.domMap.DialogQuery.ChekBasicQuery);
        this.StartQuery = getCookie('startQuery');
        if (this.StartQuery == "True") {
            check.checked = true;
        } else {
            check.checked = false;
        }
        //create my query events
        obJmyquery.CreateMyQueryEvents();
    }
    QueryOkButton() {
        this.CheckLevelDownprop();
        this.SubmmitQuery();
        $(app.domMap.DialogQuery.MainDialogQuery).hide();
    }
    QueryApplybutton() {
        this.CheckLevelDownprop()
        this.SubmmitQuery();
    }
    CheckLevelDownprop() {
        var index = buildQuery.findIndex(eachone => eachone.islevelDownProp);
        if (index === -1) {
            buildQuery = [];
        } else {
            var getleveldownProp = buildQuery[index];
            buildQuery = [];
            buildQuery.push(getleveldownProp);
        }

    }
    SubmmitQuery(isSaveQueryCall = false) {
        //send operators and values to the server.
        //get value and operators from table
        var _this = this;
        obJgridfunc.pageNum = 1;
        obJgridfunc.isPagingClick = false;

        //buildQuery = [];

        var table = document.querySelector(app.domMap.DialogQuery.Querytableid);
        for (var i = 0; i < table.rows.length; i++) {
            var controlerType = table.rows[i].children[2].children[0].type;
            var columnName = table.rows[i].cells[0].getAttribute("columnname");
            var ColumnType = table.rows[i].cells[0].getAttribute("datatype");
            var operators = table.rows[i].cells[1].children[0].value;
            var values = table.rows[i].cells[2].children[0].value;

            if (operators == "Between") {
                var start = table.rows[i].cells[2].children[0].value;
                var end = table.rows[i].cells[2].children[1].value;
                values = start + "|" + end;
            } else if (controlerType == "select-one") {
                var selected = table.rows[i].children[2].children[0].selectedIndex;
                values = table.rows[i].children[2].children[0].item(selected).value;
            } else if (table.rows[i].children[2].children[0].className == "modal-checkbox") {
                values = table.rows[i].children[2].children[0].children[0].checked.toString().toLowerCase();
            } else {
                values = table.rows[i].cells[2].children[0].value;
            }
            buildQuery.push({ columnName: columnName, ColumnType: ColumnType, operators: operators, values: values, islevelDownProp: false });
        }
        if (isSaveQueryCall) {
            return buildQuery;
        }
        if (obJreports.isCustomeReportCall === true) {
            obJreports.GenerateCustomReport();
        } else {
            //reset save query attribute to one
            var BtnSvn = document.querySelector(app.domMap.DialogQuery.BtnSaveQuery);
            BtnSvn.attributes[1].value = 0;
            obJgridfunc.SendQueryToserver();
        }

    }
    CloseQuery() {
        $("#MainDialogQuery").hide();
    }
    ClearInputs() {
        var title = $(app.domMap.DialogQuery.QuerylblTitle);
        var input = $(app.domMap.DialogQuery.QuerySaveInput);
        input.hide();
        title.show()
        title.html();
        $("#QueryContentDialog").html(this.SaveQueryContent);
    }
    OperatorCondition(elem) {
        var dataType = elem.parentElement.parentElement.firstElementChild.getAttribute("datatype");
        switch (dataType) {
            case "System.String":
                break;
            case "System.Int32":
                this.OperatorNumericSetup(elem);
                break;
            case "System.Double":
                this.OperatorNumericSetup(elem);
                break;
            case "System.Boolean":
                break;
            case "System.DateTime":
                this.OperatorDateSetup(elem);
                break;
            default:
        }
    }
    OperatorNumericSetup(elem) {
        var OprValue = elem.options.item(elem.selectedIndex).value;
        if (OprValue == "Between") {
            elem.parentElement.nextElementSibling.innerHTML = '<input id="numberFiled_start" type="number" style="width:49%;margin-top:5px" placeholder="Start" type="text" class="form-control formWindowTextBox"><input id="numberFiled_end" type="number" style="display:block;width:49%;margin-left:3px;margin-top:5px" placeholder="End" class="form-control formWindowTextBox">';
        } else {
            elem.parentElement.nextElementSibling.innerHTML = '<input type="number" placeholder="" class="form-control">';
        }
    }
    OperatorDateSetup(elem) {
        var OprValue = elem.options.item(elem.selectedIndex).value;
        if (OprValue == "Between") {
            elem.parentElement.nextElementSibling.innerHTML = '<input id="dateFiled_start" style="width:49%;" placeholder="Start" type="text" onfocus="obJquerywindow.OperatorDateFocuse(this)" onblur="obJquerywindow.OperatorDateBlur(this)" class="form-control formWindowTextBox"><input id="dateFiled_end" style="display:block;width:49%;margin-left:3px;margin-top:5px" placeholder="End" onfocus="obJquerywindow.OperatorDateFocuse(this)" onblur="obJquerywindow.OperatorDateBlur(this)" class="form-control formWindowTextBox">';
        } else {
            elem.parentElement.nextElementSibling.innerHTML = '<input id="dateFiled" placeholder="" type="date" class="form-control">';
        }
    }
    OperatorDateFocuse(elem) {
        elem.type = 'date';
        elem.style.marginTop = "5px";
    }
    OperatorDateBlur(elem) {
        elem.type = "text";
        elem.value = elem.value;
    }
    CheckboxQueryClick(elem) {
        if (elem.checked == true) {
            setCookie('startQuery', "True");
        } else {
            setCookie('startQuery', "False");
        }
    }
}
//FAVORITE FUNCTIONS
class Favorite {
    constructor() {
        this.FavCriteria = "";
        this.FavCriteriaType = "";
        this.ViewId = "";
        this.NewFavoriteName = "";
    }
    LoadFavoriteTogrid(elem, params) {
        currentFavorite = elem;
        var splitparams = params.split("_");
        var _this = this;
        obJgridfunc.ViewId = splitparams[0];
        _this.ViewId = splitparams[0];
        _this.FavCriteriaid = splitparams[1];
        _this.FavCriteriaType = splitparams[2];
        var call = new DataAjaxCall(app.url.server.ReturnFavoritTogrid, app.ajax.Type.Get, app.ajax.DataType.Json, _this, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((data) => {
            obJgridfunc.LoadGridpartialView(data).then(() => {
                //create delete button after fav button
                $(app.domMap.ToolBarButtons.DivFavOptions).after('<div style="display:inline-block;" data-toggle="tooltip" data-original-title="Delete My Favorite"><button id="btnDeleteCeriteria" style="height:34px;margin-left:3px" class="btn btn-secondary tab_btn" type="button"><i class="fa fa-trash-o"></i></button></div>')
                $(app.domMap.ToolBarButtons.BtnUpdateFavourite).after("<li><a id='removeFromFavorite'>Remove From Favorite</a></li>")
                var newbtn = document.querySelector(app.domMap.ToolBarButtons.BtnNewRow);
                newbtn.style.display = "none";
            });
        })
        obJgridfunc.MarkSelctedMenu(elem);
    }
    DeleteCeriteria() {
        var _this = this;
        var call = new DataAjaxCall(app.url.server.DeleteFavorite, app.ajax.Type.Get, app.ajax.DataType.Json, this, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((data) => {
            if (data.msg === "success") {
                document.querySelector(app.domMap.DataGrid.ToolsBarDiv).innerHTML = "";
                document.querySelector(app.domMap.DataGrid.TrackingStatusDiv).innerHTML = "";
                //create message deleted favorit and clean the grid and tracking area
                document.querySelector(app.domMap.DataGrid.MainDataContainerDiv).innerHTML = "<h3>Favorite <span style='color:blue'> [" + currentFavorite.innerText + "] </span>deleted successfully </h3>"
                //Hide from dom
                currentFavorite.style.display = "none";
                //click on favorite to refresh the menu
                currentFavorite.parentElement.parentElement.parentElement.firstElementChild.click()
            } else {
                showAjaxReturnMessage(data.msg, "e")
            }
        })
    }
    LoadNewFavorite() {
        if (rowselected.length === 0) return showAjaxReturnMessage("Please, select at least one row (needs to add the language file)", "w");
        dlg = new DialogBoxBasic("New Favorite", app.url.server.NewFavorite, app.domMap.Dialogboxbasic.Type.PartialView)
        dlg.ShowDialog();
    }
    AddNewFavorite(Favoritename) {
        var _this = this;
        //var getRowKey = [];
        this.ViewId = obJgridfunc.ViewId
        this.NewFavoriteName = Favoritename;
        var data = JSON.stringify({ 'params': this, 'recordkeys': obJgridfunc.GetSelectedRowskey() });
        var ajax = new DataAjaxCall(app.url.server.AddNewFavorite, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        ajax.Send().then(function (data) {
            var setparam = (_this.ViewId + "_" + data.SaveCriteriaId + "_" + 1).toString();
            if (data.msg === "success") { _this.AfterAddNewFavorite(setparam) } else { showAjaxReturnMessage(data.msg, "e") }
        })
    }
    AfterAddNewFavorite(getparam) {
        var _this = this;
        dlg.CloseDialog(true);
        var d = new DialogBoxBasic(app.language["lblMSGSuccessMessage"], app.url.Html.DialogMsghtml, app.domMap.Dialogboxbasic.Type.PartialView);
        d.ShowDialog().then(function (solve) {
            if (solve) {
                document.querySelector(app.domMap.Dialogboxbasic.Dlg.DialogMsg.DialogMsgTxt).innerHTML = app.language["msgMyFavoriteAdd"]
                //var x = document.querySelector(app.domMap.MenuNavigation.LeftSideMenu)
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.setAttribute('onclick', "obJfavorite.LoadFavoriteTogrid(this,'" + getparam + "')");
                a.innerHTML = _this.NewFavoriteName + "  <b style='color:green'>New!</b>";
                li.appendChild(a)
                //click on favorite
                var x = document.querySelector(app.domMap.Layout.MenuNavigation.MyFavClickMenu)
                x.click();
                x.parentElement.children[1].appendChild(li);
                //click on the new favorite
                //a.click();
            }
        });
    }
    BeforeAddToFavorite() {
        var data = { viewid: obJgridfunc.ViewId }
        var call = new DataAjaxCall(app.url.server.CheckBeforeAddTofavorite, app.ajax.Type.Get, app.ajax.DataType.Json, data, "", "", "", "");
        call.Send().then((haslist) => {
            if (rowselected.length === 0) return showAjaxReturnMessage(app.language["msgJsDataSelectOneRowForFav"], "w")
            if (haslist) this.AddToFavoriteStartDialog()
            else showAjaxReturnMessage("you have to create new favorite for this view first (needs to add the language file)", "w");
        });
    }
    AddToFavoriteStartDialog() {
        var dlg = new DialogBoxBasic("Add To favorite", app.url.server.StartDialogAddToFavorite + "?viewid=" + obJgridfunc.ViewId, app.domMap.Dialogboxbasic.Type.PartialView);
        dlg.ShowDialog().then(() => {
        });
    }
    UpdateFavorite() {
        var ddl = document.querySelector(app.domMap.Favorite.AddToFavorite.DDLfavorite)
        var _this = this;
        //var getRowKey = [];
        this.ViewId = obJgridfunc.ViewId
        this.FavCriteria = ddl.item(ddl.options.selectedIndex).value;
        var data = JSON.stringify({ 'params': this, 'recordkeys': obJgridfunc.GetSelectedRowskey() });
        var ajax = new DataAjaxCall(app.url.server.UpdateFavorite, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        ajax.Send().then(function (data) {
            if (data.msg === "success") { _this.AfterupdateFavorite() } else { showAjaxReturnMessage(data.msg, "e") }
        })
    }
    AfterupdateFavorite() {
        var dlg = new DialogBoxBasic(app.language["lblMSGSuccessMessage"], app.url.Html.DialogMsghtml, app.domMap.Dialogboxbasic.Type.PartialView);
        dlg.ShowDialog().then(() => {
            document.querySelector(app.domMap.Dialogboxbasic.Dlg.DialogMsg.DialogMsgTxt).innerHTML = app.language["msgMyFavoriteUpdate"];
        });
    }
    DeleteFavoriteRecords() {
        this.ViewId = obJgridfunc.ViewId
        //call server
        var data = JSON.stringify({ 'params': this, 'recordkeys': obJgridfunc.GetSelectedRowskey() });
        var call = new DataAjaxCall(app.url.server.DeleteFavoriteRecord, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((data) => {
            if (data.msg === "success") {
                currentFavorite.click();
                dlgClose.CloseDialog(false);

            }
        });
    }
}
//MY QUERY FUNCTIONS
class MyQuery {
    constructor() {
        this.SavedCriteriaid = "";
        this.updatemode = false;
    }
    LoadSaveQuery(elem, stringParam) {
        var _this = this;
        currentQuery = elem;
        this.SavedCriteriaid = parseInt(stringParam.split("_")[1]);
        obJgridfunc.MarkSelctedMenu(elem);
        //run basic loadquerywindow  function first
        obJgridfunc.ViewId = parseInt(stringParam.split("_")[0]);
        obJgridfunc.ViewTitle = elem.innerHTML;
        obJquerywindow.LoadQueryWindow(this.SavedCriteriaid).then((data) => {
            if (data) {
                if (getCookie('startQuery') == "True") {
                    _this.AfterLoadQuery();
                    _this.ApplyMySavedquery();
                } else {
                    _this.BingQueryDirectTodom();
                }

            }
        })
    }
    AfterLoadQuery() {
        //var btnremove = document.querySelector(app.domMap.Myqury.BtnDeleteMyquery);
        var BtnSvn = document.querySelector(app.domMap.DialogQuery.BtnSaveQuery);
        var btnUpdate = document.querySelector(app.domMap.DialogQuery.BtnSaveQuery)
        var input = $(app.domMap.DialogQuery.QuerySaveInput);
        var label = $(app.domMap.DialogQuery.QuerylblTitle);
        //update the button title to update
        btnUpdate.innerHTML = app.language["UpdateQuery"];
        //set button attribute to 0 as it is not insert and we don't use this attr here.
        BtnSvn.attributes[1].value = 0;
        //hid the label text element
        label.hide();
        //show the input element and insert the title 
        //check if the title has new html element if yes remove it to show only view title in the input
        var ViewTitle = (obJgridfunc.ViewTitle.includes('<b style="color:green">New!</b>')) === true ? obJgridfunc.ViewTitle.split("<b")[0] : obJgridfunc.ViewTitle;
        input.show().val(ViewTitle);
        //set the query window to update mode to let the even't  
        this.updatemode = true;
    }
    BingQueryDirectTodom() {
        obJgridfunc.pageNum = 1;
        buildQuery = [];
        for (var i = 0; i < app.ServerDataReturn.QueryData.length; i++) {
            var prop = app.ServerDataReturn.QueryData[i]
            buildQuery.push({ columnName: prop.columnName, ColumnType: prop.ColumnType, operators: prop.operators, values: prop.values })
        }
        obJgridfunc.SendQueryToserver().then((isgridLoaded) => {
            //creat remove query button
            if (isgridLoaded) {
                $(app.domMap.ToolBarButtons.DivFavOptions).after(app.domBuilder.BtnRemoveMyquery);
            }

        });
    }
    ApplyMySavedquery() {
        var table = document.querySelector(app.domMap.DialogQuery.Querytableid)
        var list = app.ServerDataReturn.QueryData;
        for (var i = 0; i < list.length; i++) {
            var OperCount = table.tBodies[0].children[i].children[1].children[0].childElementCount;
            if (OperCount === 12)
                this.BindOperatorsWithBetween(list[i].operators, table, i, list[i].values)
            else
                this.BindOperators(list[i].operators, table, i, list[i].values);
        }
    }
    BindOperators(Operators, table, index, value) {
        switch (Operators) {
            case "=":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 1;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "<>":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 2;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case ">":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 3;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case ">=":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 4;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "<":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 5;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "<=":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 6;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "BEG":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 7;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "Ends with":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 8;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "Contains":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 9;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "Not contains":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 10;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            default: table.tBodies[0].children[index].children[1].children[0].selectedIndex = "";

        }
    }
    BindOperatorsWithBetween(Operators, table, index, value) {
        switch (Operators) {
            case "=":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 1;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "<>":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 2;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case ">":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 3;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case ">=":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 4;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "<":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 5;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "<=":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 6;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "Between":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 7;
                var elem = table.tBodies[0].children[index].children[1].children[0];
                if (table.tBodies[0].children[index].children[0].getAttribute("datatype") === "System.Int32") {
                    obJquerywindow.OperatorNumericSetup(elem);
                } else {
                    obJquerywindow.OperatorDateSetup(elem);
                }
                var fieldStart = table.tBodies[0].children[index].children[2].firstElementChild;
                var fieldEnd = table.tBodies[0].children[index].children[2].lastElementChild;
                var values = value.split("|");
                fieldStart.value = values[0];
                fieldEnd.value = values[1];
                break
            case "BEG":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 8;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "Ends with":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 9;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "Contains":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 10;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            case "Not contains":
                table.tBodies[0].children[index].children[1].children[0].selectedIndex = 11;
                table.tBodies[0].children[index].children[2].children[0].value = value;
                break;
            default: table.tBodies[0].children[index].children[1].children[0].selectedIndex = "";
        }
    }
    CreateMyQueryEvents() {
        var BtnSvn = document.querySelector(app.domMap.DialogQuery.BtnSaveQuery);
        BtnSvn.attributes[1].value = 0;
        $("body").on("click", app.domMap.DialogQuery.QuerylblTitle, function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            obJmyquery.BeforeSave();
        });
        $("body").on("click", app.domMap.DialogQuery.BtnSaveQuery, function (e) {
            e.stopImmediatePropagation();
            if (obJmyquery.updatemode) obJmyquery.UpdateQuery(); else obJmyquery.Savequery();
        });
    }
    Savequery() {
        var input = $(app.domMap.DialogQuery.QuerySaveInput);
        var label = $(app.domMap.DialogQuery.QuerylblTitle);
        var BtnSvn = document.querySelector(app.domMap.DialogQuery.BtnSaveQuery);
        if (input.val() === "") {
            showAjaxReturnMessage("Enter favorite Name before saving! (needs to add the language file)", "w");
            obJmyquery.BeforeSave();
            return
        }
        if (parseInt(BtnSvn.attributes[1].value) === 1) {
            this.SaveName = input.val();
            this.ViewId = obJgridfunc.ViewId;
            var data = JSON.stringify({ params: this, Querylist: obJquerywindow.SubmmitQuery(true) })
            var call = new DataAjaxCall(app.url.server.SaveNewQuery, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "")
            call.Send().then(function (data) {
                if (data.isNameExist === true) return (input.val() + " " + app.language["msgMyQueryUniqueSavedName"], "w")
                if (data.msg === "success") {
                    showAjaxReturnMessage("Saved query as (needs to add the language file)" + input.val(), "s")
                    BtnSvn.attributes[1].value = 0;
                    input.hide();
                    label.show();
                    obJmyquery.AfterSaved(data, input.val())
                } else {
                    showAjaxReturnMessage(data.msg, "e")
                }
            });
        } else {
            showAjaxReturnMessage("Enter favorite Name before saving!(needs to add the language file)", "w");
            obJmyquery.BeforeSave();
        }
    }
    BeforeSave() {
        var title = $(app.domMap.DialogQuery.QuerylblTitle);
        var BtnSvn = document.querySelector(app.domMap.DialogQuery.BtnSaveQuery);
        var input = $(app.domMap.DialogQuery.QuerySaveInput);
        var issaved = parseInt(BtnSvn.attributes[1].value);
        if (issaved === 0) {
            var val = title.text()
            title.hide();
            input.css("borderBottom", "1px solid gray");
            input.show();
            input.val(val);
            input.focus();
            BtnSvn.attributes[1].value = 1;
        } else {
            BtnSvn.attributes[1].value = 0;
        }
        this.title = input.val()
    }
    AfterSaved(data, savedname) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute('onclick', "obJmyquery.LoadSaveQuery(this,'" + data.uiparam + "')");
        a.innerHTML = savedname + "  <b style='color:green'>New!</b>";
        li.appendChild(a)
        //click on favorite
        var query = document.querySelector(app.domMap.Layout.MenuNavigation.MyQureyClickMenu);
        query.click();
        query.parentElement.children[1].appendChild(li)
    }
    DeleteQuery() {
        var _this = this;
        //call server
        var data = JSON.stringify({ 'params': this });
        var call = new DataAjaxCall(app.url.server.DeleteQuery, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((data) => {
            if (data.msg === "success") {
                currentQuery.parentElement.style.display = "none"
                document.querySelector(app.domMap.Layout.MenuNavigation.MyQureyClickMenu).click();
                document.querySelector(app.domMap.DataGrid.ToolsBarDiv).innerHTML = "";
                document.querySelector(app.domMap.DataGrid.TrackingStatusDiv).innerHTML = "";
                document.querySelector(app.domMap.DataGrid.MainDataContainerDiv).innerHTML = "<h3>Query  <span style='color:blue'> [" + currentQuery.innerText + "] </span> deleted successfully </h3>"
            }
        });
    }
    UpdateQuery() {
        var input = $(app.domMap.DialogQuery.QuerySaveInput);
        this.SaveName = input.val();
        this.ViewId = obJgridfunc.ViewId;
        var data = JSON.stringify({ params: this, Querylist: obJquerywindow.SubmmitQuery(true) })
        var call = new DataAjaxCall(app.url.server.UpdateQuery, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "")
        call.Send().then(function (data) {
            if (data.isNameExist === true) return showAjaxReturnMessage(input.val() + " " + app.language["msgMyQueryUniqueSavedName"], "w")
            currentQuery.innerHTML = input.val();
            if (data.msg === "success") {
                showAjaxReturnMessage("Updated query to (needs to add the language file)" + input.val(), "s")
            } else {
                showAjaxReturnMessage(data.msg, "e")
            }
        });
    }
}
//LINKSCRIPT FUNCTIONS
class Linkscript {
    constructor() {
        this.InputControllersList = [];
        this.ScriptParams = {};
    }
    ClickButton(elem) {
        var _this = this;
        this.ScriptParams.WorkFlow = elem.id;
        this.ScriptParams.ViewId = obJgridfunc.ViewId;
        //concept to return rows id from handsontable
        //work around to get the rows id as handsontable randering the page and duplicate rows.
        if (rowselected.length === 0) {
            this.ScriptParams.Tableid = hot.getDataAtCell(0, 0);
            this.ScriptParams.Rowids = hot.getDataAtCell(0, 0);

        } else {
            //this.ScriptParams.Tableid = hot.getDataAtCell(rowselected[0], 0);;
            this.ScriptParams.Tableid = hot.getDataAtCell(app.globalverb.LastRowSelected, 0);
            var listids = [];
            if (rowselected.length > 1) {
                for (var i = 0; i < rowselected.length; i++) {
                    var tbids = hot.getDataAtCell(rowselected[i], 0);
                    listids.push(tbids);
                }
                this.ScriptParams.Rowids = listids;
            } else {
                this.ScriptParams.Rowids = hot.getDataAtCell(app.globalverb.LastRowSelected, 0);
            }
        }
        //written to hold the before and after change for add and edit rows
        var beforechange = obJgridfunc.BeforeChange;
        var afterchange = obJgridfunc.AfterChange;
        var call = new DataAjaxCall(app.url.server.LinkscriptButtonClick, app.ajax.Type.Post, app.ajax.DataType.Json, this.ScriptParams, "", "", "", "");
        call.Send().then((data) => {
            obJgridfunc.BeforeChange = beforechange;
            obJgridfunc.AfterChange = afterchange;
            LinkScriptObjective = data;
            if (data.ErrorMsg === "" || data.ErrorMsg === null) {
                _this.OpenDialog(data);
            } else {
                showAjaxReturnMessage(data.ErrorMsg, "w")
                //$('#toast-container').fnAlertMessage({ title: '', msgTypeClass: 'toast-warning', message: data.ErrorMsg, timeout: 3000 });
            }
        })
    }
    OpenDialog(data) {
        document.getElementById("LSlblTitle").innerHTML = "";
        document.getElementById("LSlblHeading").innerHTML = "";
        document.getElementById("LStblControls").innerHTML = "";
        document.getElementById("LSdivButtons").innerHTML = "";
        $("#LinkScriptDialogBox").show();
        $('.modal-dialog').draggable({
            handle: ".modal-header",
            stop: function (event, ui) {
            }
        });
        this.SetupControllers(data);
    }
    SetupControllers(data) {
        var TitleLocation = document.getElementById("LSlblTitle");
        var HeadingLocation = document.getElementById("LSlblHeading");
        //create title and heading
        TitleLocation.innerHTML = data.Title;
        HeadingLocation.innerHTML = data.lblHeading;
        //create body;
        this.SetupBodyController(data);
        //create buttons in the footer
        this.SetupButtons(data);
    }
    SetupButtons(data) {
        var _this = this;
        var buttonLocation = document.getElementById("LSdivButtons");
        buttonLocation.innerHTML = "";
        for (var i = 0; i < data.ButtonsList.length; i++) {
            var btn = document.createElement("button");
            btn.id = data.ButtonsList[i].Id;
            btn.className = data.ButtonsList[i].Css;
            btn.innerText = data.ButtonsList[i].Text;
            btn.addEventListener("click", _this.WorkFlowButtonClick);
            buttonLocation.append(btn);
        }
    }
    SetupBodyController(data) {
        this.InputControllersList = [];
        var table = document.getElementById("LStblControls");
        var body = document.createElement("tbody");
        table.innerHTML = "";
        var tr;
        for (var i = 0; i < data.ControllerList.length; i++) {
            var ctr = data.ControllerList[i];
            if (i % 2 === 0) {
                tr = document.createElement("tr");
                body.appendChild(tr);
                table.appendChild(body);
            }
            var td = document.createElement("td");
            switch (ctr.ControlerType) {
                case "textbox":
                    var input = document.createElement("input");
                    input.id = ctr.Id;
                    input.value = ctr.Text;
                    input.className = ctr.Css;
                    input.type = "text";
                    td.appendChild(input);
                    tr.appendChild(td);
                    //var afterCreateTextbox = document.getElementById(input.id);
                    this.InputControllersList.push(input);
                    break;
                case "label":
                    var label = document.createElement("label");
                    label.id = ctr.Id;
                    label.innerText = ctr.Text;
                    label.className = ctr.Css;
                    td.appendChild(label);
                    tr.appendChild(td);
                    break;
                case "dropdown":
                    var dropdown = document.createElement("select");
                    for (var d = 0; d < ctr.dropdownItems.length; d++) {
                        var option = document.createElement("option");
                        option.innerText = ctr.dropdownItems[d].text;
                        option.value = ctr.dropdownItems[d].value;
                        dropdown.appendChild(option);
                        dropdown.selectedIndex = ctr.dropIndex;
                    }
                    //dropdown.type = "dropdown";
                    dropdown.id = ctr.Id;
                    dropdown.className = ctr.Css;
                    td.appendChild(dropdown);
                    tr.appendChild(td);
                    //var afterCreateDropdown = document.getElementById(dropdown.id);
                    this.InputControllersList.push(dropdown);
                    break;
                case "listBox":
                    var listbox = document.createElement("select");
                    for (var d = 0; d < ctr.listboxItems.length; d++) {
                        var option = document.createElement("option");
                        option.innerText = ctr.listboxItems[d].text;
                        option.value = ctr.listboxItems[d].value;
                        listbox.appendChild(option);
                        listbox.selectedIndex = ctr.dropIndex;
                    }
                    listbox.size = parseInt(ctr.rowCounter) + 1;
                    listbox.id = ctr.Id;
                    listbox.className = ctr.Css;
                    td.appendChild(listbox);
                    tr.appendChild(td);
                    //var afterCreateDropdown = document.getElementById(listbox.id);
                    this.InputControllersList.push(listbox);
                    break;
                case "radiobutton":
                    var radio = document.createElement("input");
                    radio.id = ctr.Id;
                    radio.name = ctr.Groupname + ctr.Text;
                    radio.innerText = ctr.Text;
                    radio.className = ctr.Css;
                    radio.type = "radio";
                    td.appendChild(radio);
                    tr.appendChild(td);
                    //var afterCreateRadio = document.getElementById(radio.id);
                    this.InputControllersList.push(radio);
                    break;
                case "checkbox":
                    var checkbox = document.createElement("input");
                    checkbox.id = ctr.Id;
                    checkbox.innerText = ctr.Text;
                    checkbox.className = ctr.Css;
                    checkbox.type = "checkbox";
                    td.appendChild(checkbox);
                    tr.appendChild(td);
                    //var afterCreateCheckbox = document.getElementById(checkbox.id);
                    this.InputControllersList.push(checkbox);
                    break;
                case "textarea":
                    var textarea = document.createElement("textarea");
                    textarea.id = ctr.Id;
                    textarea.innerText = ctr.Text;
                    textarea.className = ctr.Css;
                    td.appendChild(textarea);
                    tr.appendChild(td);
                    //var afterCreateTextarea = document.getElementById(textarea.id)
                    this.InputControllersList.push(textarea);
                    break;
                default:
            }
        }
    }
    CloseDialog(reset) {
        $("#LinkScriptDialogBox").hide();

        if (app.Linkscript.isBeforeAdd) {
            var btnNew = document.querySelector(app.domMap.ToolBarButtons.BtnNewRow);
            obJgridfunc.CancelNewRow(btnNew);
        }

        app.globalverb.IsServerProcessing = false;

        if (reset) {
            app.Linkscript.ScriptDone = false;
            app.Linkscript.isBeforeAdd = false;
            app.Linkscript.isBeforeEdit = false;
            app.Linkscript.isAfterAdd = false;
            app.Linkscript.isAfterEdit = false;
        }
    }
    WorkFlowButtonClick() {
        var elem = this;
        var linkscriptUidata = JSON.stringify({ 'linkscriptUidata': obJlinkscript.GatherDataTosendLinkscript(elem) });
        var call = new DataAjaxCall(app.url.server.FlowButtonsClickEvent, app.ajax.Type.Post, app.ajax.DataType.Json, linkscriptUidata, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((data) => {
            //if data is not successful "true" then the script is broken so stop the process of the script.
            if (!data.Successful) {
                obJlinkscript.CloseDialog(false);
                if (data.ReturnMessage != "") {
                    showAjaxReturnMessage(data.ReturnMessage, "e");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                }
                obJlinkscript.RefreshGrideAfterlinkScriptDone(data);
                return
            }
            //if the UnloadPromptWindow is false it means we jump to the next popup
            if (data.UnloadPromptWindow === false) {
                obJlinkscript.OpenDialog(data);
            } else {
                //finally if the UnloadPromptWindow is true means we don't have more dialogs and we are ready to close the dialog.
                obJlinkscript.CloseDialog(false);
                //if callerType id before: delete, edit or add then run obJgridfunc.SaveRowAfterBuild();
                if (app.Linkscript.isBeforeAdd || app.Linkscript.isBeforeEdit) {
                    app.Linkscript.ScriptDone = true;
                    app.Linkscript.isBeforeAdd = false;
                    app.Linkscript.isBeforeEdit = false;
                    app.Linkscript.isAfterAdd = false;
                    app.Linkscript.isAfterEdit = false;
                    obJgridfunc.SaveRowAfterBuild().then(() => {
                        app.Linkscript.ScriptDone = false;
                    });
                }

                if (app.Linkscript.isBeforeDelete) {
                    app.Linkscript.ScriptDone = true;
                    app.Linkscript.isBeforeDelete = false;
                    obJtoolbarmenufunc.DeleteRowsFromServer();
                }

                //check if linkscript requirs grid refresh 
                obJlinkscript.RefreshGrideAfterlinkScriptDone(data);
            }
        });
    }
    GatherDataTosendLinkscript(elem) {
        var DataArray = [];
        for (var i = 0; i < this.InputControllersList.length; i++) {
            var id = this.InputControllersList[i].id;
            var type = this.InputControllersList[i].type;
            var value = "";
            switch (type) {
                case "text":
                    value = this.InputControllersList[i].value;
                    break;
                case "radio":
                    value = this.InputControllersList[i].checked;
                    break;
                case "checkbox":
                    var ischecked = this.InputControllersList[i].checked != true ? "0" : "1";
                    value = ischecked;
                    break;
                case "select-one":
                    var ddIndex = this.InputControllersList[i].selectedIndex;
                    value = ddIndex + '%&&&%' + this.InputControllersList[i].options[ddIndex].innerText;
                    break;
                default:
            }
            DataArray.push({ id: id, value: value, type: type });
        }
        DataArray.push({ id: elem.id, value: elem.value, type: "button" });
        //DataArray.push({ linkparams: this.Lsparams });
        return DataArray;
    }
    RefreshGrideAfterlinkScriptDone(data) {
        if (data.GridRefresh === true) {
            obJgridfunc.LoadViewTogrid(obJgridfunc.ViewId, obJgridfunc.pageNum).then((istrue) => {
                if (data.ReturnMessage !== "") {
                    showAjaxReturnMessage(data.ReturnMessage, "s")
                }
            }).catch(err => {
                var msg = err;
                if (data.ReturnMessage !== "") {
                    msg + "\r\n" + data.ReturnMessage;
                }
                showAjaxReturnMessage(msg, "e");
            });
        }
    }
};
//GLOBAL SEARCH FUNCTIONS
class GlobalSearch {
    constructor() {
        this.SearchInput = "";
        this.ViewId = "";
        this.TableName = "";
        this.rowselected = "";
        this.ChkAttch = "";
        this.ChkcurTable = "";
        this.ChkUnderRow = "";
        this.KeyValue = "";
        this.IncludeAttchment = "";
    }
    RunSearch(isCallFromInputDialog, input, IncludeAttachment, IscurrentTable, IsCurrentRow) {
        if (input.length < 3) return showAjaxReturnMessage("please, enter at least 3 characters(needs to add the language file)", "w");
        this.ChkAttch = IncludeAttachment
        this.ChkcurTable = IscurrentTable;
        this.ChkUnderRow = IsCurrentRow;
        this.SearchInput = input;
        if (IscurrentTable || IsCurrentRow) {
            var rowIndex = obJgridfunc.GetSelectedRowskey().length;
            this.Currentrow = parseInt(obJgridfunc.GetSelectedRowskey()[rowIndex - 1].rowKeys);
        }
        this.ViewId = obJgridfunc.ViewId;
        this.TableName = obJgridfunc.TableName;
        var data = JSON.stringify({ 'params': this });
        var call = new DataAjaxCall(app.url.server.RunglobalSearch, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "")
        $(app.SpinningWheel.Main).show();
        call.Send().then((data) => {
            if (data.HTMLSearchResults === null) return;
            if (isCallFromInputDialog === true) {
                document.querySelector(app.domMap.Dialogboxbasic.DlgbodyId).innerHTML = data.HTMLSearchResults;
            } else {
                this.FirstSearchClick(data);
            }
            $(app.SpinningWheel.Main).hide();
        })
    }
    FirstSearchClick(data) {
        var dlg = new DialogBoxBasic(app.domBuilder.GlobalSearchTitleInputs, data.HTMLSearchResults, app.domMap.Dialogboxbasic.Type.Content)
        dlg.ShowDialog();
        //pass variables to the dialog;
        document.querySelector(app.domMap.GlobalSearching.DialogSearchInput).value = obJglobalsearch.SearchInput;
        document.querySelector(app.domMap.GlobalSearching.DialogchkAttachments).checked = obJglobalsearch.ChkAttch;
        //for the another checkboxes check I check if view id is not empty in case is not show another 2 check boxs in dialog.
        if (obJgridfunc.ViewId !== "") {
            var currentTable = document.querySelector(app.domMap.GlobalSearching.DialogCurrenttable);
            currentTable.parentElement.style.display = "block";
            currentTable.checked = obJglobalsearch.ChkcurTable;

            var chkunder = document.querySelector(app.domMap.GlobalSearching.DialogUnderthisrow);
            chkunder.parentElement.style.display = "block";
            chkunder.checked = obJglobalsearch.ChkUnderRow;
        }
    }
    SearchAllClick(viewid, search, keyword, includeAttchment) {
        bc.innerHTML = "";
        obJgridfunc.ViewId = viewid;
        this.ViewId = viewid;
        this.IncludeAttchment = includeAttchment;
        this.KeyValue = keyword;
        var data = JSON.stringify({ params: this })
        var call = new DataAjaxCall(app.url.server.GlobalSearchAllClick, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "")
        call.Send().then((data) => {
            obJgridfunc.LoadGridpartialView(data).then(() => {

            })
        });

    }
    SearchClick(dom, viewid, KeyValue, search) {
        bc.innerHTML = "";
        obJgridfunc.ViewId = viewid;
        this.ViewId = viewid;
        this.KeyValue = KeyValue;
        var data = JSON.stringify({ params: this })
        var call = new DataAjaxCall(app.url.server.GlobalSearchClick, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "")
        call.Send().then((data) => {
            obJgridfunc.LoadGridpartialView(data).then(() => {

            })
        });

    }
}
//NEWS FEED FUNCTIONS
class NewsFeed {
    constructor() {
        this.IsTabfeed = document.querySelector(app.domMap.NewsFeed.IsTabfeed)
        this.NewsFrame = document.querySelector(app.domMap.NewsFeed.NewsFrame)
        this.TabNewsTable = document.querySelector(app.domMap.NewsFeed.TabNewsTable)
        this.TxtNewsUrl = document.querySelector(app.domMap.NewsFeed.TxtNewsUrl)
    }
    NewFeedSetup() {
        if (this.IsTabfeed.value == 1) {
            this.NewsFrame.style.display = "none";
            this.TabNewsTable.style.display = "unset";
        } else {
            this.TabNewsTable.style.display = "none";
            this.NewsFrame.style.display = "unset";
        }
    }
    SaveNewUrl() {
        var _this = this;
        var data = { NewUrl: this.TxtNewsUrl.value };
        var call = new DataAjaxCall(app.url.server.SaveNewsURL, app.ajax.Type.Post, app.ajax.DataType.Json, data, "", "", "", "")
        call.Send().then((data) => {
            if (data && this.TxtNewsUrl.value != "") {
                //set new ifram with url
                _this.TabNewsTable.style.display = "none";
                _this.NewsFrame.style.display = "unset";
                _this.NewsFrame.src = _this.TxtNewsUrl.value;
            } else {
                //set tab news
                _this.NewsFrame.style.display = "none";
                _this.TabNewsTable.style.display = "unset";
            }
        })
    }
}

//TASK BAR FUNCTIONS
class TaskBar {
    constructor() {

    }
    TaskbarLinks(viewid, tasks, elem) {
        var data = { viewId: viewid };
        var call = new DataAjaxCall(app.url.server.TaskBarClick, app.ajax.Type.Get, app.ajax.DataType.Json, data, "", "", "", "");
        call.Send().then((data) => {
            //clear bread crumbs 
            bc.innerHTML = "";
            app.DomLocation.Current = elem;
            obJgridfunc.LoadGridpartialView(data).then(() => {

            });
        });
    }
}
//ATTCHMENT VIEWER FUNCTIONS DIALOG
class AttachmentsView {
    constructor() {
        this._imgid = 1;
        this._flyOutImage = "";
        this._downloadUrl = "";
        this._attachName = "";
        this._viewerLink = "";
        this._pageSize = "";
        this._pageIndex = "";
        this._displayCount = "";
    }
    StartAttachmentDialog() {
        debugger;
        //chcek if new row (in case is a new row don't popup the attachment dialog)
        if (hot.getDataAtRow(rowselected)[0] === null) return;
        var docdata = app.data.TableName + "," + hot.getDataAtRow(rowselected[0])[0] + "," + app.data.ViewName
        $(app.SpinningWheel.Main).show();
        var data = { 'docdata': docdata, 'isMVC': true }
        var call = new DataAjaxCall(app.url.server.LoadFlyoutPartial, app.ajax.Type.Get, app.ajax.DataType.Html, data, "", "", "", "")
        call.Send().then((partialData) => {
            document.querySelector(app.domMap.DialogAttachment.AttachmentModalBody).innerHTML = "";
            document.querySelector(app.domMap.DialogAttachment.AttachmentModalBody).innerHTML = partialData;
            this.OpenDialog()
            this.ScrollerBinding();
            this.DragAnddropNewFile();
            $(app.SpinningWheel.Main).hide();
        });
    }
    OpenDialog() {
        $(app.domMap.DialogAttachment.Openformattachment).show();
        $('.modal-dialog').draggable({
            handle: ".modal-header",
            stop: function (event, ui) {
            }
        });
        this.Paging()
        this.ScrollResizing();
    }
    ScrollerBinding(docdata) {
        var _this = this;
        $(app.domMap.DialogAttachment.AttachmentModalBody).unbind('scroll').bind('scroll',
            function (e) {
                var docdata = app.data.TableName + "," + hot.getDataAtRow(rowselected[0])[0] + "," + app.data.ViewName
                if (Math.ceil($(this).scrollTop() + $(this).innerHeight()) >= $(this)[0].scrollHeight) {
                    _this._displayCount = $(app.domMap.DialogAttachment.paging.ListThumbnailDetailsImg).length;
                    var vTotalCount =
                        parseInt($(app.domMap.DialogAttachment.paging.TotalRecCount).val() == "" ? 0 : $(app.domMap.DialogAttachment.paging.TotalRecCount).val());
                    if (_this._displayCount != vTotalCount) {
                        _this._pageIndex =
                            parseInt($(app.domMap.DialogAttachment.paging.SPageIndex).val() == "" ? 1 : $(app.domMap.DialogAttachment.paging.SPageIndex).val()) + 1;
                        _this._pageSize = parseInt($(app.domMap.DialogAttachment.paging.SPageSize).val() == "" ? 0 : $(app.domMap.DialogAttachment.paging.SPageSize).val());
                        var data = { 'docdata': docdata, 'PageIndex': _this._pageIndex, 'PageSize': _this._pageSize, 'viewName': app.data.ViewName, 'isMVC': true };
                        var call = new DataAjaxCall(app.url.server.LazyLoadPopupAttachments, app.ajax.Type.Get, app.ajax.DataType.Json, data, "", "", "", "");
                        call.Send().then((result) => {
                            var pOutputObject = JSON.parse(result.flyoutModel);
                            var loopObject = pOutputObject.FlyOutDetails;
                            $.each(loopObject,
                                function (key, value) {
                                    _this._flyOutImage = value.sFlyoutImages;
                                    _this._imgid = key;
                                    _this._downloadUrl = _this.HtmlDownLoadLinkBuilder(value, pOutputObject);
                                    _this._attachName = value.sAttachmentName;
                                    _this._viewerLink = value.sViewerLink;
                                    var html = _this.ScrollerHtmlBuilder(_this)
                                    $(app.domMap.DialogAttachment.ThumbnailDetails).append(html);
                                });
                            _this.ScrollAfterLoadReturn(_this);
                        });
                    }
                }
            });
    }
    HtmlDownLoadLinkBuilder(value, pOutputObject) {
        var urlParameterEncode = "filePath=" +
            encodeURIComponent(value.sOrgFilePath) +
            "&fileName=" +
            encodeURIComponent(value.sAttachmentName) +
            "&docKey=" + encodeURIComponent(value.sViewerLink.split("=")[1]);
        var url = '/Common/DownloadAttachment?' + urlParameterEncode + "&attchVersion=" + value.attchVersion + "&viewName=" + pOutputObject.viewName;
        return url;
    }
    ScrollerHtmlBuilder(_this) {
        //main div
        var mainDiv = document.createElement("div");
        mainDiv.className = "col-lg-4 col-md-6 col-sm-6 col-xs-12";
        //thmbnail main
        var thmbMain = document.createElement("div");
        thmbMain.className = "Thmbnail-main";
        mainDiv.appendChild(thmbMain);
        //thmbnail header
        var thmbHeader = document.createElement("div");
        thmbHeader.className = "Thmbnail-header";
        thmbHeader.innerHTML = _this._attachName;
        thmbMain.appendChild(thmbHeader);
        //documentviewer/index link call
        var ancorLink = document.createElement("a");
        ancorLink.href = _this._viewerLink;
        ancorLink.target = "_blank";
        thmbMain.appendChild(ancorLink);
        //div thbnail-body
        var thmbBody = document.createElement("div");
        thmbBody.className = "Thmbnail-body";
        ancorLink.appendChild(thmbBody);
        //div caption symble
        var divCaption = document.createElement("div");
        divCaption.className = "caption";
        thmbBody.appendChild(divCaption);
        //div caption content
        var captionContact = document.createElement("div");
        captionContact.className = "caption-content";
        divCaption.appendChild(captionContact);
        //i eye symle icon
        var eyeSymble = document.createElement("i");
        eyeSymble.className = "fa fa-eye fa-3x";
        captionContact.appendChild(eyeSymble);
        //image elemnt
        var img = document.createElement("img");
        img.src = "data:image/jpg;base64," + _this._flyOutImage;
        img.id = _this._imgid; //need to pass 
        img.className = "img-responsive";
        img.style.height = "300px";
        img.style.width = "280px";
        thmbBody.appendChild(img);
        //div footer
        var thmbFooter = document.createElement("div");
        thmbFooter.className = "Thmbnail-footer";
        //div col
        var divCol = document.createElement("div");
        divCol.className = "col-md-12 col-sm-12 col-xs-12";
        thmbFooter.appendChild(divCol);
        //span stack
        var spanStack = document.createElement("span");
        spanStack.className = "fa-stack";
        divCol.appendChild(spanStack);
        //ancor download link
        var downloadLink = document.createElement("a");
        downloadLink.href = _this._downloadUrl;
        downloadLink.className = "a-color";
        downloadLink.setAttribute("data-toggle", "tooltip");
        downloadLink.title = "Download";
        spanStack.appendChild(downloadLink);
        //download symble
        var downSymble = document.createElement("span");
        downSymble.className = "fa-stack";
        downloadLink.appendChild(downSymble);
        //download symble items
        var itm1 = document.createElement("i");
        var itm2 = document.createElement("i");
        itm1.className = "fa fa-arrow-down fa-stack-1x";
        itm1.style.top = 7;
        itm2.className = "fa fa-circle-thin fa-stack-2x";
        downSymble.appendChild(itm1);
        downSymble.appendChild(itm2);
        thmbMain.appendChild(thmbFooter);
        //clearfix div
        var clearfixDiv = document.createElement("div");
        clearfixDiv.className = "clearfix";
        thmbFooter.appendChild(clearfixDiv);
        return mainDiv;
    }
    ScrollAfterLoadReturn(_this) {
        _this.displayCount = $(app.domMap.DialogAttachment.paging.ListThumbnailDetailsImg).length;
        var pageText = String.format(app.language["lblAttachmentPopupPagging"], _this.displayCount.toString(), $(app.domMap.DialogAttachment.paging.TotalRecCount).val());
        $(app.domMap.DialogAttachment.paging.ResultDisplay).text(pageText);
        $(app.domMap.DialogAttachment.paging.SPageIndex).val(_this._pageIndex);
        $(app.domMap.DialogAttachment.paging.SPageSize).val(_this._pageSize);
    }
    Paging() {
        var pdisplayCount = document.querySelectorAll(app.domMap.DialogAttachment.paging.ListThumbnailDetailsImg).length;
        var pageText = String.format(app.language["lblAttachmentPopupPagging"], pdisplayCount.toString(), document.querySelector(app.domMap.DialogAttachment.paging.TotalRecCount).value);
        document.querySelector(app.domMap.DialogAttachment.paging.ResultDisplay).innerText = pageText;
    }
    ScrollResizing() {
        //var attachbody = 
        if (document.querySelector(app.domMap.DialogAttachment.paging.TotalRecCount).value <= 6) {
            document.querySelector(app.domMap.DialogAttachment.AttachmentModalBody).style.maxHeight = "calc(100vh - 273px)";
        } else {
            document.querySelector(app.domMap.DialogAttachment.AttachmentModalBody).style.maxHeight = "500px";
        }
    }
    CloseDialog() {
        $(app.domMap.DialogAttachment.Openformattachment).hide();
    }
    UploadAttachmentOnNewAdd(FlyoutUploderFiles) {
        //var totalsize = 0;
        //var successFilesforPopup = [];
        var isfilesSupported = true;
        //var failedFilesforPopup = [];
        var formdata = new FormData();
        formdata.append("tabName", app.data.TableName);
        formdata.append("tableId", hot.getDataAtRow(rowselected)[0]);
        formdata.append("viewId", app.data.ViewId);
        for (var i = 0; i < FlyoutUploderFiles.length; i++) {
            var format = FlyoutUploderFiles[i].name.toString();
            format = format.split(".");
            var cFileFormat = obJattachmentsview.IsSupportedFile(format[format.length - 1]);
            if (cFileFormat) {
                //var size = FlyoutUploderFiles[i].size;
                //totalsize = parseInt(totalsize) + parseInt(size);
                //successFilesforPopup.push({ tabName: app.data.TableName, tableId: hot.getDataAtRow(rowselected)[0], viewId: app.data.ViewId})
                formdata.append(FlyoutUploderFiles[i].name, FlyoutUploderFiles[i]);
                //successFilesforPopup.push(FlyoutUploderFiles[i].name.toString());
            } else {
                showAjaxReturnMessage(app.language["msgDocViewerInvalidFileFormat"] + "  <b style='color:red'>" + format + "</b>", "w")
                isfilesSupported = false;
                break;
                //failedFilesforPopup.push(FlyoutUploderFiles[i].name.toString());
            }
        }
        if (isfilesSupported === true) {
            obJattachmentsview.SaveNewAttachment(formdata);
        } else {
            return;
        }
    }
    IsSupportedFile(format) {
        var FileFormat = ['abc', 'abic', 'afp', 'ani', 'anz', 'arw', 'bmp', 'cal', 'cin', 'clp'
            , 'cmp', 'cmw', 'cr2', 'crw', 'cur', 'cut', 'dcr', 'dcs', 'dcm', 'dcx'
            , 'dng', 'dxf', 'eps', 'exif', 'fax', 'fit', 'flc', 'fpx', 'gif', 'gtiff'
            , 'hdp', 'ico', 'iff', 'ioca', 'ingr', 'img', 'itg', 'jbg', 'jb2', 'jpg'
            , 'jpeg', 'j2k', 'jp2', 'jpm', 'jpx', 'kdc', 'mac', 'mng', 'mob', 'msp'
            , 'mrc', 'nef', 'nitf', 'nrw', 'orf', 'pbm', 'pcd', 'pcx', 'pdf', 'pgm'
            , 'png', 'pnm', 'ppm', 'ps', 'psd', 'psp', 'ptk', 'ras', 'raf', 'raw'
            , 'rw2', 'sct', 'sff', 'sgi', 'smp', 'snp', 'sr2', 'srf', 'tdb', 'tfx'
            , 'tga', 'tif', 'tifx', 'vff', 'wbmp', 'wfx', 'x9', 'xbm', 'xpm', 'xps'
            , 'xwd', 'cgm', 'cmx', 'dgn', 'drw', 'dxf', 'dwf', 'dwfx', 'dwg', 'e00'
            , 'emf', 'gbr', 'mif', 'nap', 'pcl', 'pcl6', 'pct', 'plt', 'shp', 'svg'
            , 'wmf', 'wmz', 'wpg', 'doc', 'docx', 'eml', 'mobi', 'epub', 'html', 'msg'
            , 'ppt', 'pptx', 'pst', 'rtf', 'svg', 'txt', 'xls', 'xlsx', 'xps'];

        return FileFormat.includes(format.toString().toLowerCase());
    }
    SaveNewAttachment(formdata) {
        $(app.SpinningWheel.Main).show();
        var call = new DataAjaxCall(app.url.server.AddNewAttachment, app.ajax.Type.Post, app.ajax.DataType.Json, formdata, app.ajax.ContentType.False, app.ajax.ProcessData.False, "", "")
        call.Send().then((model) => {
            switch (model.checkConditions) {
                case "success":
                    obJattachmentsview.AfterAddAttachments();
                    break;
                case "permission":
                    showAjaxReturnMessage(app.language["msgDocViewerVolumePermission"], 'w');
                    break;
                case "maxsize":
                    showAjaxReturnMessage(model.WarringMsg, 'w');
                    break;
                case "error":
                    showAjaxReturnMessage(model.WarringMsg, 'w');
                    break;
                default:
            }

            $(app.SpinningWheel.Main).hide();
        });
    }
    AfterAddAttachments() {
        var docdata = app.data.TableName + "," + hot.getDataAtRow(rowselected[0])[0] + "," + app.data.ViewName
        $(app.SpinningWheel.Main).show();
        var data = { 'docdata': docdata, 'isMVC': true }
        var call = new DataAjaxCall(app.url.server.LoadFlyoutPartial, app.ajax.Type.Get, app.ajax.DataType.Html, data, "", "", "", "")
        call.Send().then((partialData) => {
            document.querySelector(app.domMap.DialogAttachment.AttachmentModalBody).innerHTML = "";
            document.querySelector(app.domMap.DialogAttachment.AttachmentModalBody).innerHTML = partialData;
            this.ScrollerBinding();
            this.Paging()
            this.ScrollResizing();
            //change the html to clips with plus
            var td = hot.getCell(rowselected[0], 2);
            td.innerHTML = '<i style="cursor: pointer" onclick="obJattachmentsview.StartAttachmentDialog()" class="fa fa-paperclip fa-flip-horizontal fa-2x theme_color"></i>'
            $(app.SpinningWheel.Main).hide();
        });
    }
    DragAnddropNewFile() {
        var _this = this;
        document.querySelector(app.domMap.DialogAttachment.EmptydropDiv)
        var newFile = document.querySelector(app.domMap.DialogAttachment.AttachmentModalBody);
        newFile.ondrop = function (e) {
            e.preventDefault();
            _this.UploadAttachmentOnNewAdd(e.dataTransfer.files);
            newFile.style.border = "1px solid white";
        };
        newFile.ondragover = function () {
            newFile.style.border = "5px dashed #cccccc";
            return false;
        };
        newFile.ondragleave = function () {
            newFile.style.border = "1px solid white";
            return false;
        };
    }
}
//TOOLBAR MENU FUNCTIONS (RIGHT CLICK AND UPPER TOOLBAR)
class ToolBarMenuFunc {
    constructor() {
        this.ids = [];
    }
    GetMenu() {
        var _this = this;
        return {
            items: {
                "copy": {
                    name: "Copy",
                },
                "exportPrint": {
                    name: "Export/Print",
                    submenu: {
                        items: [
                            {
                                key: "exportPrint:print",
                                name: "Print",
                                callback: function (key, name) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function () {
                                    if (!app.data.RightClickToolBar.Menu1Print) { return true };
                                },

                            },
                            {
                                key: "exportPrint:blackAndWhite",
                                name: "Black & White",
                                callback: function (key, name) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function () {
                                    if (!app.data.RightClickToolBar.Menu1btnBlackWhite) { return true };
                                },
                            },
                            {
                                key: "exportPrint:exportSelectedCsv",
                                name: "Export Selected(csv)",
                                callback: function (key, name) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function () {
                                    if (!app.data.RightClickToolBar.Menu1btnExportCSV) { return true };
                                },
                            },
                            {
                                key: "exportPrint:exportAllCsv",
                                name: "Export All(csv)",
                                callback: function (key, name) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function () {
                                    if (!app.data.RightClickToolBar.Menu1btnExportCSVAll) { return true };
                                },
                            },
                            {
                                key: "exportPrint:exportSelectedTxt",
                                name: "Export Selected(txt)",
                                callback: function (key, name) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function () {
                                    if (!app.data.RightClickToolBar.Menu1btnExportTXT) { return true };
                                },
                            },
                            {
                                key: "exportPrint:exportAllTxt",
                                name: "Export All(txt)",
                                callback: function (key, name) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function () {
                                    if (!app.data.RightClickToolBar.Menu1btnExportTXTAll) { return true };
                                },
                            },
                        ]
                    }
                },
                "transferRequest": {
                    name: "Transfer/Request",
                    submenu: {
                        items: [
                            {
                                key: "transferRequest:Request",
                                name: "Request",
                                callback: function (key, options) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function () {
                                    if (!app.data.RightClickToolBar.Menu2btnRequest) { return true };
                                },
                            },
                            {
                                key: "transferRequest:transferSelected",
                                name: "Transfer Selected",
                                callback: function (key, options) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function (key, options) {
                                    if (!app.data.RightClickToolBar.Menu2btnTransfer) { return true }
                                }
                            },
                            {
                                key: "transferRequest:transferAll",
                                name: "Transfer All",
                                callback: function (key, options) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function (key, options) {
                                    if (!app.data.RightClickToolBar.Menu2btnTransfersTransferAll) { return true }
                                }
                            },
                            {
                                key: "transferRequest:Delete",
                                name: "Delete",
                                callback: function (name, coords, event) {
                                    _this.BeforeDeleteRow();
                                },
                                hidden: function () {
                                    if (!app.data.RightClickToolBar.Menu2delete) { return true };
                                },
                            },
                            {
                                key: "transferRequest:Move",
                                name: "Move",
                                callback: function () {
                                    alert("Developoing in progress!")
                                },
                                hidden: function () {
                                    if (!app.data.RightClickToolBar.Menu2move) { return true };
                                },
                            },

                        ]
                    }
                },
                "favorite": {
                    name: "Favorite",
                    submenu: {
                        items: [
                            {
                                key: "favorite:NewFavorite",
                                name: "New Favorite",
                                callback: function (key, options) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function () {
                                    if (!app.data.RightClickToolBar.Favorive) { return true };
                                },
                            },
                            {
                                key: "favorite:AddToFavorit",
                                name: "Add To Favorit",
                                callback: function (key, options) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function (key, options) {
                                    if (!app.data.RightClickToolBar.Favorive) { return true }
                                }
                            },
                            {
                                key: "favorite:Importintofavorite",
                                name: "Import Into Favorite",
                                callback: function (key, options) {
                                    alert("Developoing in progress!")
                                },
                                hidden: function (key, options) {
                                    if (!app.data.RightClickToolBar.Favorive) { return true }
                                }
                            },
                        ]
                    }
                }
            }
        }
    }
    //delete functions
    BeforeDeleteRow() {
        if (rowselected.length > 200) return showAjaxReturnMessage("You can't delete more than 200 rows at the time!", "w");
        if (rowselected.length === 0) {
            showAjaxReturnMessage(app.language["msgJsDataSelectOneRow"], "w");
            return;
        }

        //check emppty rowselected
        this.DeleteSelectedEmptyRows().then((countRows) => {
            if (countRows === 0) {
                obJgridfunc.LoadViewTogrid(obJgridfunc.ViewId, obJgridfunc.pageNum);
                return;
            } else {
                //clear ids
                this.ids = [];
                dlg = new DialogBoxBasic("Delete Item", app.url.Html.DialogMsghtmlConfirm, app.domMap.Dialogboxbasic.Type.PartialView)
                dlg.ShowDialog().then(() => {
                    var yes = document.querySelector(app.domMap.Dialogboxbasic.Dlg.DialogMsgConfirm.DialogYes)
                    var item = document.querySelector(app.domMap.Dialogboxbasic.Dlg.DialogMsgConfirm.ListItem);
                    var par = document.querySelector(app.domMap.Dialogboxbasic.Dlg.DialogMsgConfirm.DialogMsgTxt).innerHTML = app.language["msgDeleteConfirmation"];
                    for (var i = 0; i < rowselected.length; i++) {
                        var rowData1;
                        var rowData2;
                        var rowids = hot.getDataAtRow(rowselected[i])[0];
                        if (rowids !== null) {
                            this.ids.push(rowids);
                        }
                        if (app.data.HasAttachmentcolumn && app.data.HasDrillDowncolumn) {
                            rowData1 = hot.getDataAtRow(rowselected[i])[3] !== undefined ? hot.getDataAtRow(rowselected[i])[3] : "";
                            rowData2 = hot.getDataAtRow(rowselected[i])[4] !== undefined ? hot.getDataAtRow(rowselected[i])[4] : "";
                        } else if (app.data.HasAttachmentcolumn === false && app.data.HasDrillDowncolumn === false) {
                            rowData1 = hot.getDataAtRow(rowselected[i])[1] !== undefined ? hot.getDataAtRow(rowselected[i])[1] : "";
                            rowData2 = hot.getDataAtRow(rowselected[i])[2] !== undefined ? hot.getDataAtRow(rowselected[i])[2] : "";
                        } else if (app.data.HasAttachmentcolumn === true && app.data.HasDrillDowncolumn === false || app.data.HasAttachmentcolumn === false && app.data.HasDrillDowncolumn === true) {
                            rowData1 = hot.getDataAtRow(rowselected[i])[2] !== undefined ? hot.getDataAtRow(rowselected[i])[2] : "";
                            rowData2 = hot.getDataAtRow(rowselected[i])[3] !== undefined ? hot.getDataAtRow(rowselected[i])[3] : "";
                        }

                        if (rowids !== null) {
                            var li = document.createElement("li");
                            li.innerHTML = "<span>" + hot.getDataAtRow(rowselected[i])[0] + "</span>&nbsp;&nbsp;<span style='color:black'>|</span> <span>" + rowData1 + "</span><span>&nbsp;&nbsp;<span style='color:black'>|</span> " + rowData2 + "</span>";
                            li.style.color = "DarkRed";
                            item.append(li);
                        }
                    }
                    yes.onclick = this.DeleteRowsFromServer;
                });
            }
        });
    }
    DeleteSelectedEmptyRows() {
        var btnNew = document.querySelector(app.domMap.ToolBarButtons.BtnNewRow);
        //var cloneRows = Array.from(rowselected);
        var countRows = rowselected.length;
        var reduceEmpty = countRows;
        rowselected.sort(function (a, b) { return b - a })
        for (var i = 0; i < countRows; i++) {
            if (hot.getDataAtRow(rowselected[i])[0] === null) {
                hot.alter('remove_row', rowselected[i]);
                reduceEmpty--;
            }

            if (rowselected[i] === 0) {
                //design the new btn for different approach.
                btnNew !== null ? btnNew.disabled = false : "";
                btnNew.value = "New";
                btnNew.style.backgroundColor = "white"
                app.globalverb.Isnewrow = false;
            }
        }
        //call server to bind a new table after delete rows.
        return new Promise((resolve, reject) => {
            resolve(reduceEmpty);
        });
    }
    DeleteRowsFromDom() {
        ///call server to delete records.
        var btnNew = document.querySelector(app.domMap.ToolBarButtons.BtnNewRow);
        var cloneRows = Array.from(rowselected);
        cloneRows.sort(function (a, b) { return b - a })
        for (var i = 0; i < cloneRows.length; i++) {
            hot.alter('remove_row', cloneRows[i]);
            if (cloneRows[i] === 0) {
                //design the new btn for different approach.
                btnNew !== null ? btnNew.disabled = false : "";
                btnNew.value = "New";
                btnNew.style.backgroundColor = "white"
                app.globalverb.Isnewrow = false;
            }
        }
        //call server to bing a new table after delte rows.
        obJgridfunc.LoadViewTogrid(obJgridfunc.ViewId, obJgridfunc.pageNum)
        rowselected = [];
    }
    DeleteRowsFromServer() {
        var _this = this;
        var data = JSON.stringify({ rowData: obJtoolbarmenufunc, params: obJgridfunc });
        $(app.SpinningWheel.Main).show();
        var call = new DataAjaxCall(app.url.server.DeleteRowsFromGrid, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "")
        call.Send().then((data) => {
            //before linkscript
            if (data.scriptReturn.isBeforeDeleteLinkScript && app.Linkscript.ScriptDone == false) {
                app.Linkscript.isBeforeDelete = data.scriptReturn.isBeforeDeleteLinkScript;
                app.Linkscript.id = data.scriptReturn.ScriptName;
                $(app.SpinningWheel.Grid).hide();
                $(app.SpinningWheel.Main).hide();
                //run linkscript
                obJlinkscript.ClickButton(app.Linkscript);
            } else {
                if (data.isError) {
                    obJgridfunc.ErrorHandler(data)
                } else {
                    obJtoolbarmenufunc.DeleteRowsFromDom();
                    showAjaxReturnMessage("Delete Successfuly!", "s")
                    if (data.scriptReturn.isAfterDeleteLinkScript) {
                        app.Linkscript.isAfterDelete = data.scriptReturn.isAfterDeleteLinkScript;
                        app.Linkscript.id = data.scriptReturn.ScriptName;
                        $(app.SpinningWheel.Grid).hide();
                        $(app.SpinningWheel.Main).hide();
                        obJlinkscript.ClickButton(app.Linkscript);
                    }
                    app.DomLocation.Current.click();
                }
                $(app.SpinningWheel.Main).hide();
            }
        });
        dlg.CloseDialog();
    }
    //print functions
    PrintTable(title) {
        var Tableheader = []
        //get header
        for (var i = 0; i < app.data.ListOfHeaders.length; i++) {
            if (i >= obJgridfunc.StartInCell()) {
                Tableheader.push(app.data.ListOfHeaders[i].HeaderName);
            }
        }
        var rowsData = [];
        var jsonObject = {};
        //get rows
        for (var r = 0; r < rowselected.length; r++) {
            for (var c = 0; c < app.data.ListOfHeaders.length; c++) {
                if (c >= obJgridfunc.StartInCell()) {
                    jsonObject[app.data.ListOfHeaders[c].HeaderName] = hot.getDataAtRow(rowselected[r])[c];
                }
            }
            rowsData.push(jsonObject);
            jsonObject = {};
        }
        //go to print
        printJS({
            printable: rowsData,
            properties: Tableheader,
            header: "Record count: " + rowselected.length + " " + title,
            headerStyle: "font-weight: 50px; font-size:20px",
            documentTitle: app.data.ViewName,
            gridHeaderStyle: "font-size: 22px;font-weight: bold; border: 1px solid black; width:100%;",
            gridStyle: "font-size: 20px; border: 1px solid black",
            type: 'json'
        });
    }
}
//REPORTS
class Reports {
    constructor() {
        this.title = "";
        this.text = "";
        this.isCustomeReportCall = false;
    }
    LoadCustomReport(elem, viewid) {
        obJgridfunc.MarkSelctedMenu(elem);
        obJgridfunc.ViewId = viewid;
        obJreports.elemCustomReport = elem;

        obJquerywindow.LoadQueryWindow(-1).then(() => {
            $(app.domMap.DialogQuery.QuerylblTitle).html("Query")
            $(app.domMap.DialogQuery.BtnSaveQuery).remove();
            obJreports.isCustomeReportCall = true;
        });
    }
    GenerateCustomeReportHeader(bobj, headerList) {
        var cell = obJgridfunc.StartInCell()
        bobj.ListOfHeader = [];
        for (var i = 0; i < headerList.length; i++) {
            if (i >= cell) {
                bobj.ListOfHeader.push(headerList[i].HeaderName);
            }
        }
    }
    GenerateCustomeReportRows(bobj, rowsList) {
        var cell = obJgridfunc.StartInCell()
        bobj.ListOfRows = [];
        for (var i = 0; i < rowsList.length; i++) {
            var rowbuild = [];
            for (var j = 0; j < rowsList[i].length; j++) {
                if (j >= cell) {
                    rowbuild.push(rowsList[i][j])
                }
            }
            bobj.ListOfRows.push(rowbuild);
        }
    }
    GenerateCustomReport() {
        obJgridfunc.pageNum = 1;
        //var data = { viewId: obJgridfunc.ViewId, PageNum: PageNum };
        var data = JSON.stringify({ params: obJgridfunc, searchQuery: buildQuery });
        var call = new DataAjaxCall(app.url.server.RunQuery, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "", "")
        call.Send().then((data) => {
            app.data = data;
            $("#mainContainer").load(app.url.Html.Reporting, () => {
                document.querySelector(app.domMap.Reporting.ReportTitle).innerHTML = obJreports.elemCustomReport.innerHTML;
                document.querySelector(app.domMap.Reporting.PrintReport).addEventListener("click", () => {
                    obJreports.PrintReport();
                })
                var buildObj = {};
                obJreports.GenerateCustomeReportHeader(buildObj, data.ListOfHeaders);
                obJreports.GenerateCustomeReportRows(buildObj, data.ListOfDatarows);
                HandsOnTableReports.buildHandsonTable(buildObj);
            });
        });
    }
    //Audit report
    LoadAuditReport(elem, reportName) {
        obJgridfunc.MarkSelctedMenu(elem);
        dlg = new DialogBoxBasic(app.language["mnuWorkGroupMenuControlAuditReport"], app.url.server.GetauditReportView, app.domMap.Dialogboxbasic.Type.PartialView);
        dlg.ShowDialog();
    }
    RunAuditReport() {
        var model = auditEvents.properties();
        var m = {};
        m.UserName = model.UserName.options[model.UserName.selectedIndex].innerText.trim();
        m.UserDDLId = model.UserName.value;
        m.ObjectId = model.ObjectId.value;
        m.ObjectName = model.ObjectId.options[model.ObjectId.selectedIndex].innerText.trim();
        m.SuccessLogin = model.SuccessLogin.checked;
        m.FailedLogin = model.FailedLogin.checked;
        m.AddEditDelete = model.AddEditDelete.checked;
        m.ChildTable = model.ChildTable.checked;
        m.ConfDataAccess = model.ConfDataAccess.checked;
        m.EndDate = model.EndDate.value;
        m.StartDate = model.StartDate.value;
        m.Id = model.Id.value;
        //run the spinner
        $(app.SpinningWheel.Main).show();
        var data = JSON.stringify({ params: m });
        var call = new DataAjaxCall(app.url.server.RunAuditSearch, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((rdata) => {
            $("#mainContainer").load(app.url.Html.Reporting, () => {
                document.querySelector(app.domMap.Reporting.ReportTitle).innerHTML = app.language["mnuWorkGroupMenuControlAuditReport"]
                document.querySelector(app.domMap.Reporting.itemDescription).innerHTML = rdata.SubTitle;
                document.querySelector(app.domMap.Reporting.PrintReport).addEventListener("click", () => {
                    obJreports.PrintReport();
                });
                HandsOnTableReports.buildHandsonTable(rdata);
            });
            $(app.SpinningWheel.Main).hide();
        });
    }
    //tracking report
    TrackableReport(elem, reportName) {
        alert("underdeveloped - reportName: " + reportName)
    }
    //requester report
    RequestorReport(elem, reportName) {
        alert("underdeveloped - reportName: " + reportName)
    }
    //retention report
    RetentionReport(elem, reportName) {
        alert("underdeveloped - reportName: " + reportName)
    }
    AuditHistoryRow() {
        var _this = this;
        obJreports.reportType = app.Enums.Reports.AuditHistoryPerRow;
        obJreports.printTitle = "Audit History Report";
        obJreports.reportTitle = "Audit History Report";
        this.GenerateRowReport();
    }
    TrackingHistoryRow() {
        var _this = this;
        obJreports.reportType = app.Enums.Reports.TrackingHistoryPerRow;
        obJreports.printTitle = "Tracking History Report";
        obJreports.reportTitle = "Tracking History Report";
        this.GenerateRowReport();
    }
    ContentsPerRow() {
        obJreports.reportType = app.Enums.Reports.ContentsPerRow;
        obJreports.printTitle = app.data.TableName + " " + "Content Report";
        obJreports.reportTitle = app.data.TableName + " " + "Content Report";
        this.GenerateRowReport();
    }
    GenerateRowReport() {
        //this method required to pass obJreports object with params: reportType, printTitle, reportTitle (pass as an object)
        $(app.SpinningWheel.Main).show();
        var rowSelectedData = hot.getDataAtRow(rowselected)[0];
        //build object data for server params
        var objdata = {}
        objdata.Tableid = hot.getDataAtRow(rowselected)[0];
        objdata.tableName = obJgridfunc.TableName;
        objdata.viewId = obJgridfunc.ViewId;
        objdata.reportNum = obJreports.reportType;
        objdata.pageNumber = 1;

        var data = JSON.stringify({ params: objdata })
        //call server
        var call = new DataAjaxCall(app.url.server.Reporting, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((rdata) => {
            if (rdata.hasPermission === false) {
                showAjaxReturnMessage(rdata.Msg, "w");
                return
            }
            //breadscrumb call
            bc.children[bc.children.length - 1].remove()
            app.data.ItemDescription = rdata.ItemDescription;
            obJbreadcrumb.CreateHtmlCrumbLink(rowSelectedData, obJdrildownclick.ChildKeyField, obJreports.ChildKeyType, obJgridfunc.ViewId, obJgridfunc.ViewName, buildQuery);
            obJbreadcrumb.CreateCrumbHeader(obJdrildownclick.childViewName, obJreports.reportType);
            //load reporting partial view with data
            obJreports.text = rowSelectedData;
            $("#mainContainer").load(app.url.Html.Reporting, () => {
                document.querySelector(app.domMap.Reporting.ReportTitle).innerHTML = obJreports.reportTitle;
                document.querySelector(app.domMap.Reporting.itemDescription).innerHTML = rdata.ItemDescription;
                document.querySelector(app.domMap.Reporting.PrintReport).addEventListener("click", () => {
                    obJreports.PrintReport();
                })
                HandsOnTableReports.buildHandsonTable(rdata);
            });
            $(app.SpinningWheel.Main).hide();
        });
    }
    PrintReport(model) {
        $(app.SpinningWheel.Main).show();
        var Databuilder = {};
        var printData = [];
        var RowsData = hot.getData();
        var Header = hot.getColHeader();

        for (var i = 0; i < RowsData.length; i++) {
            for (var j = 0; j < Header.length; j++) {
                Databuilder[Header[j]] = RowsData[i][j];
            }
            printData.push(Databuilder);
            Databuilder = {};
        }

        printJS({
            printable: printData,
            properties: Header,
            header: "Record count: " + hot.getData().length + " - Id: " + obJreports.text,
            headerStyle: "font-weight: 50px; font-size:20px",
            documentTitle: obJreports.printTitle,
            gridHeaderStyle: "font-size: 22px;font-weight: bold; border: 1px solid black;",
            gridStyle: "font-size: 20px; border: 1px solid black",
            type: 'json'
        });
        $(app.SpinningWheel.Main).hide();
    }
}
class RetentionInfo {
    constructor() {
        this.rowNumber = "";
        this.isEditMode = false;
    }
    GetInfo() {
        var url = app.url.server.GetRetentionInfo + `?id=${hot.getDataAtRow(rowselected[0])[0]}&viewId=${obJgridfunc.ViewId}`;
        var call = new DialogBoxBasic(app.language["tiRetentionInfoRetenInfo"], url, app.domMap.Dialogboxbasic.Type.PartialView);
        call.ShowDialog().then(() => {
            HandsOnTableRetentionRowInfo.buildHandsonTable(retinfodata)
        });
    }
    DropdownReturnAfterChange(model, elem) {
        elem.description.innerText = model.RetentionDescription
        //item
        elem.retentionItem.innerText = model.RetentionItem
        //status
        elem.status.innerText = model.RetentionStatus.text
        model.RetentionStatus.color == "red" ? elem.status.style.color = "red" : elem.status.style.color = "black";
        //inactivedate
        elem.inArchiveDate.innerText = model.RetentionInfoInactivityDate.text;
        model.RetentionInfoInactivityDate.color == "red" ? elem.inArchiveDate.style.color = "red" : elem.inArchiveDate.style.color = "black";
        //archive
        elem.lblArchive.innerText = model.lblRetentionArchive;
        elem.retArchive.innerText = model.RetentionArchive.text;
        model.RetentionArchive.color == "red" ? elem.retArchive.style.color = "red" : elem.retArchive.style.color = "black";
    }
    //updating
    UpdateRecordInfo() {
        var data = JSON.stringify({ props: obJretentioninfo.GatherProperties() });
        var call = new DataAjaxCall(app.url.server.RetentionInfoUpdate, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((model) => {
            if (model.errorNumber === 1) {
                showAjaxReturnMessage("something went wrong!", "e");
            } else {
                var d = new DialogBoxBasic();
                d.CloseDialog();
            }
        });
    }
    GatherProperties() {
        var obj = {};
        obj.rowid = obJgridfunc.RowKeyid
        obj.RetentionItemText = "Record Details";
        obj.TableName = obJgridfunc.TableName;
        var retcode = document.querySelector(app.domMap.Retentioninfo.ddlRetentionCode);
        obj.RetentionItemCode = retcode.options[retcode.selectedIndex].innerText;
        obj.RetnArchive = document.querySelector(app.domMap.Retentioninfo.RetinArchive).innerText;
        obj.RetnInactivityDate = document.querySelector(app.domMap.Retentioninfo.RetinInactiveDate).innerText;
        //the retinfodata object comes from the partial view
        obj.RetTableHolding = this.GetTableRows(obj)
        return obj;
    }
    GetTableRows(obj) {
        var arr = [];
        if (hotRetention.getData().length === 1 && hotRetention.getData()[0][0] === "#####") {  
            arr = 0
            return;
        } 
        for (var i = 0; i < hotRetention.getData().length; i++) {
            var holdType = hotRetention.getData()[i][0];
            var setdata = {};
            if (holdType === "Retention") {
                setdata.RetentionHold = true;
                setdata.LegalHold = false;
            } else {
                setdata.RetentionHold = false;
                setdata.LegalHold = true;
            }
            setdata.SnoozeUntil = hotRetention.getData()[i][1];
            setdata.HoldReason = hotRetention.getData()[i][2];
            setdata.RetentionCode = obj.RetentionItemCode;
            setdata.SLDestructionCertsId = 0;
            setdata.TableId = obj.rowid;
            setdata.TableName = obj.TableName;
            arr.push(setdata);
        }
        return arr;
    }
    RemoveRows() {
        var rowselected = this.GetrowsSelected()
        for (var i = 0; i < rowselected.length; i++) {
            hotRetention.alter('remove_row', rowselected[i]);
        }
        this.OnEmptyTable();
    }
    OnEmptyTable() {
        //on empty table create one row; !!Handsonetale will not show header if there is no rows; 
        var btnremove = document.querySelector(app.domMap.Retentioninfo.btnRemoveRetin);
        var btnedit = document.querySelector(app.domMap.Retentioninfo.btnEditRetin);
        if (hotRetention.getData().length === 0) {
            var data = {};
            data.ListOfHeader = [app.language["tiRetentionInformationHoldType"], app.language["btnRetentionInfoSnooze"], app.language["tiRetentionInformationReason"]]
            data.ListOfRows = [["#####", "#####", "#####"]]
            HandsOnTableRetentionRowInfo.buildHandsonTable(data)
            btnremove.disabled = true;
            btnedit.disabled = true;
        }
    }
    GetrowsSelected() {
        var rowsSelected = [];
        if (hotRetention.getSelected().length === 1) {
            var start = hotRetention.getSelected()[0][0];
            var end = hotRetention.getSelected()[0][2];
            if (start < end) {
                for (var i = start; i < end + 1; i++) {
                    rowsSelected.push(i);
                }
            } else {
                for (var i = end; i < start + 1; i++) {
                    rowsSelected.push(i);
                }
            }
        } else {
            var len = hotRetention.getSelected().length;
            for (var i = 0; i < len; i++) {
                var rowNumber = hotRetention.getSelected()[i][0]
                rowsSelected.push(rowNumber);
            }
        }
        return rowsSelected;
    }
    //holding
    HoldingConditions(btnType) {
        var retType = document.querySelector(app.domMap.RetentioninfoHold.chkHoldTypeRetention);
        var legType = document.querySelector(app.domMap.RetentioninfoHold.chkHoldTypeLegal);
        var reason = document.querySelector(app.domMap.RetentioninfoHold.holdReason);
        var snooz = document.querySelector(app.domMap.RetentioninfoHold.txtSnoozeDate);
        if (legType.checked || retType.checked) {
            if (btnType === 'retention') {
                legType.checked = false;
            } else {
                retType.checked = false;
            }
            reason.disabled = false;
        } else {
            reason.disabled = true;
        }
        if (legType.checked === false && retType.checked === false) {
            snooz.disabled = true;
            reason.disabled = true;
        }
    }
    StartAddingRow() {
        this.isEditMode = false;
        $(app.domMap.RetentioninfoHold.Dialog.RetentionHoldingDialog).show();
        $(app.domMap.RetentioninfoHold.Dialog.DlgHoldingTitle).html(app.language["lblRetentionInformationHoldInfo"]);
        $(app.domMap.RetentioninfoHold.Dialog.RetentionHoldingContent).load(app.url.server.RetentionInfoHolde, () => {
            //set up snooz for next month by default
            document.querySelector(app.domMap.RetentioninfoHold.txtSnoozeDate).value = SetNextMonthDate();
        })
    }
    AddnewHolding() {
        var retType = document.querySelector(app.domMap.RetentioninfoHold.chkHoldTypeRetention);
        var legType = document.querySelector(app.domMap.RetentioninfoHold.chkHoldTypeLegal);
        var snooz = document.querySelector(app.domMap.RetentioninfoHold.txtSnoozeDate);
        var reason = document.querySelector(app.domMap.RetentioninfoHold.holdReason);
        var btnremove = document.querySelector(app.domMap.Retentioninfo.btnRemoveRetin);
        var btnedit = document.querySelector(app.domMap.Retentioninfo.btnEditRetin);
        //delete empty row if there is
        if (hotRetention.getDataAtCell(0, 1) === "#####") {
            hotRetention.alter('remove_row', 0);
        }
        //add new row
        if (retType.checked || legType.checked) {
            hotRetention.alter("insert_row", 0, 1);
            if (retType.checked) {
                hotRetention.setDataAtCell(0, 0, "Retention");
            } else {
                hotRetention.setDataAtCell(0, 0, "Legal");
            }
            if (snooz.disabled === false) {
                var formatDate = snooz.value.split("-");
                var snoozDate = formatDate[1] + "/" + formatDate[2] + "/" + formatDate[0]
                if (snooz.value === "") {
                    hotRetention.setDataAtCell(0, 1, "");
                } else {
                    hotRetention.setDataAtCell(0, 1, snoozDate);
                }
                
            } else {
                hotRetention.setDataAtCell(0, 1, "");
            }
            hotRetention.setDataAtCell(0, 2, reason.value);
        }
        //after add: enable remove and edit buttons in case they are disabled
        btnremove.disabled = false;
        btnedit.disabled = false;
    }
    StartEditHoldingRow() {
        this.isEditMode = true;
        this.rowNumber = this.GetrowsSelected()[0];
        var tbtype = hotRetention.getDataAtRow(this.rowNumber)[0];
        var tbSnooz = hotRetention.getDataAtRow(this.rowNumber)[1];
        var tbreason = hotRetention.getDataAtRow(this.rowNumber)[2];
        if (tbtype == "Retention") {
            document.querySelector(app.domMap.RetentioninfoHold.chkHoldTypeRetention).checked = true;
            document.querySelector(app.domMap.RetentioninfoHold.chkHoldTypeLegal).checked = false;
        } else {
            document.querySelector(app.domMap.RetentioninfoHold.chkHoldTypeRetention).checked = false;
            document.querySelector(app.domMap.RetentioninfoHold.chkHoldTypeLegal).checked = true;
        }
        //set snoz
        if (tbSnooz == "" || tbSnooz == null) {
            document.querySelector(app.domMap.RetentioninfoHold.txtSnoozeDate).value = SetNextMonthDate();
        } else {
            var year = tbSnooz.split("/")[2];
            var month = tbSnooz.split("/")[0].toString();
            if (month.length == 1) {
                month = `0${month}`
            }
            var date = tbSnooz.split("/")[1];
            var dateFormat = `${year}-${month}-${date}`
            document.querySelector(app.domMap.RetentioninfoHold.txtSnoozeDate).disabled = false;
            document.querySelector(app.domMap.RetentioninfoHold.txtSnoozeDate).value = dateFormat;
        }

        if (!tbreason == "" || !tbreason == null) {
            document.querySelector(app.domMap.RetentioninfoHold.holdReason).disabled = false;
            document.querySelector(app.domMap.RetentioninfoHold.holdReason).innerText = tbreason;
        }
  
    }
    EditHoldingRow() {
        var rettype = document.querySelector(app.domMap.RetentioninfoHold.chkHoldTypeRetention);
        var snooz = document.querySelector(app.domMap.RetentioninfoHold.txtSnoozeDate);
        var holdReason = document.querySelector(app.domMap.RetentioninfoHold.holdReason);
        holdReason.disabled = false;
        
        if (rettype.checked) {
            hotRetention.setDataAtCell(this.rowNumber, 0, "Retention");
        } else {
            hotRetention.setDataAtCell(this.rowNumber, 0, "Legal");
        }
        
        if (snooz.disabled) {
            hotRetention.setDataAtCell(this.rowNumber, 1, "");
        } else {
            var year = snooz.value.split("-")[0]
            var month = snooz.value.split("-")[1];
            var date = snooz.value.split("-")[2];
            var formatDate = `${month}/${date}/${year}`
            if (snooz.value === "") {
                hotRetention.setDataAtCell(this.rowNumber, 1, "");
            } else {
                hotRetention.setDataAtCell(this.rowNumber, 1, formatDate);
            }
            
        }
           
        hotRetention.setDataAtCell(this.rowNumber, 2, holdReason.value);
    }
}
//HANDSONTABLS OBJECT, EVENTS AND FUNCTIONS 
let pagingModel = {};
var HandsOnTableViews = {
    container: "",
    hotSettings: "",
    change: "",
    colWidthArray: [],
    //DrillDownLink: "",
    buildHandsonTable: function (data) {
        var _this = this;
        //this.DrillDownLink = data.ListOfdrilldownLinks;
        this.typeColumnEvent = "";
        this.container = document.querySelector(app.domMap.DataGrid.HandsOnTableContainer);
        this.container.style.display = "block";
        //ischecked = false;
        this.hotSettings = {
            data: data.ListOfDatarows,//bind data into handsontable
            copyPasteEnabled: false,
            rowHeaders: false,
            filters: false,
            dropdownMenu: false,
            //height: 700,
            outsideClickDeselects: false,
            disableVisualSelection: false,
            sortIndicator: true,
            columnSorting: true,
            colHeaders: function (col) {
                var checkboxUrl;
                var drilldown;
                var attach;
                //check 3 first columns for checkbox, drilldown, attachment
                switch (col) {
                    case 0:
                        return "pkay";
                    case 1:
                        if (data.HasDrillDowncolumn) {
                            var drill = "<span class='fa-stack theme_color' title='" + app.language["dataGridMenu"] + "'><i class='fa fa-circle-thin fa-stack-2x'></i><i class='fa fa-list fa-stack-1x' style='top:8px;'></i></span>";
                            return drill;
                        } else if (data.HasDrillDowncolumn == false && data.HasAttachmentcolumn == true) {
                            drilldown = '<i class="fa fa-paperclip fa-flip-horizontal fa-2x theme_color"></i>';
                            return drilldown;
                        }
                        break;
                    case 2:
                        if (data.HasAttachmentcolumn && data.HasDrillDowncolumn) {
                            attach = '<i class="fa fa-paperclip fa-flip-horizontal fa-2x theme_color"></i>';
                            return attach;
                        }
                        break;
                    default:
                }

                //loop through dynamic header
                var headers = data.ListOfHeaders;
                for (var i = 0; i < headers.length; i++) {
                    if (col === i) {
                        if (headers[i].isEditable === "False") {
                            return "<div style='display:inline-flex'><span>" + headers[i].HeaderName + "</span> " + '<i class="fa fa-lock formLock" style="color:#002949;font-weight:600;margin-top:-9.9px; margin-left:3px"></i></div>';
                        } else {
                            return headers[i].HeaderName;
                        }
                    }
                }
            },
            stretchH: 'all',
            fillHandle: false,
            manualRowResize: true,
            manualColumnResize: true,
            search: true,
            headerTooltips: true,
            currentRowClassName: 'currentRow',
            renderAllRows: false,
            //afterDeselect: true,
            //colWidths: [0, 10,18],
            //fixedRowsTop: 1,
            //manualColumnFreeze: true,
            comments: true,
            //contextMenu: ['copy', 'freeze_column'],
            //contextMenu: toolbarmenufunc.GetMenu(),
            autoRowSize: false,
            autoWrapCol: false,
            autoWrapRow: false,
            manualRowMove: true,
            manualColumnMove: false,
            licenseKey: "non-commercial-and-evaluation",
            //width: 99 + "%",
            //fixedColumnsLeft: gridfunc.StartInCell(),
            //afterInit: function () {
            //    this.validateCells();
            //},
            cells: function (row, col, prop) {
                var cellProperties = {};
                var datalist = data.ListOfHeaders;
                for (var i = 0; i < datalist.length; i++) {
                    //check if checkbox || drilldown || attachment
                    if (col === datalist[i].columnOrder) {
                        if (datalist[i].DataType === "none" && datalist[i].HeaderName === "pkey") {
                            cellProperties.type = "text";
                            cellProperties.copyable = false;
                        } else if (datalist[i].DataType === "none" && datalist[i].HeaderName === "drilldown") {
                            cellProperties.renderer = _this.RowRenderDrilldown;
                            cellProperties.readOnly = 'true';
                            cellProperties.copyable = false;
                        } else if (datalist[i].DataType === "none" && datalist[i].HeaderName === "attachment") {
                            cellProperties.renderer = _this.RowRendererattachment;
                            cellProperties.readOnly = 'true';
                            cellProperties.copyable = false;
                        } else {
                            //return cells data to the grid.
                            switch (datalist[i].DataTypeFullName) {
                                case "System.String":
                                    if (datalist[i].isEditable === "False") cellProperties.readOnly = 'true';
                                    if (datalist[i].isDropdown === "True") {
                                        cellProperties.type = "dropdown";
                                    } else {
                                        cellProperties.type = "text";
                                        cellProperties.placeholder = datalist[i].editMask;
                                    }
                                    if (cellProperties.readOnly === 'true') {
                                        cellProperties.allowEmpty = true;
                                    } else {
                                        cellProperties.allowEmpty = datalist[i].Allownull;
                                    }
                                    break;
                                case "System.Int64":
                                    if (datalist[i].isEditable === "False") cellProperties.readOnly = 'true';
                                    if (datalist[i].isDropdown === "True") {
                                        cellProperties.type = "dropdown";
                                        //cellProperties.source = [];//fill up on mouse over
                                    } else {
                                        cellProperties.type = "numeric";
                                        cellProperties.placeholder = datalist[i].editMask;
                                    }
                                    if (cellProperties.readOnly === 'true') {
                                        cellProperties.allowEmpty = true;
                                    } else {
                                        cellProperties.allowEmpty = datalist[i].Allownull;
                                    }
                                    break;
                                case "System.Int32":
                                    if (datalist[i].isEditable === "False") cellProperties.readOnly = 'true';
                                    if (datalist[i].isDropdown === "True") {
                                        cellProperties.type = "dropdown";
                                        //cellProperties.source = [];//fill up on mouse over
                                    } else {
                                        cellProperties.type = "numeric";
                                        cellProperties.placeholder = datalist[i].editMask;
                                    }
                                    if (cellProperties.readOnly === 'true') {
                                        cellProperties.allowEmpty = true;
                                    } else {
                                        cellProperties.allowEmpty = datalist[i].Allownull;
                                    }
                                    break;
                                case "System.Int16":
                                    if (datalist[i].isEditable === "False") cellProperties.readOnly = 'true';
                                    if (datalist[i].isDropdown === "True") {
                                        cellProperties.type = "dropdown";
                                    } else {
                                        cellProperties.type = "numeric";
                                        cellProperties.placeholder = datalist[i].editMask;
                                    }
                                    if (cellProperties.readOnly === 'true') {
                                        cellProperties.allowEmpty = true;
                                    } else {
                                        cellProperties.allowEmpty = datalist[i].Allownull;
                                    }
                                    break;
                                case "System.Boolean":
                                    //cellProperties.allowEmpty = datalist[i].Allownull;
                                    if (datalist[i].isEditable === "False") cellProperties.readOnly = 'true';
                                    cellProperties.type = "checkbox";
                                    cellProperties.className = 'htCenter';
                                    cellProperties.maxLength = datalist[i].MaxLength
                                    break;
                                case "System.Double":
                                    if (datalist[i].isEditable === "False") cellProperties.readOnly = 'true';
                                    if (datalist[i].isDropdown === "True") {
                                        cellProperties.type = "dropdown";
                                    } else {
                                        cellProperties.type = "numeric";
                                        cellProperties.placeholder = datalist[i].editMask;
                                    }
                                    if (cellProperties.readOnly === 'true') {
                                        cellProperties.allowEmpty = true;
                                    } else {
                                        cellProperties.allowEmpty = datalist[i].Allownull;
                                    }
                                    break;
                                case "System.DateTime":
                                    if (datalist[i].isEditable === "False") cellProperties.readOnly = 'true';
                                    cellProperties.type = "date";
                                    cellProperties.dateFormat = 'MM/DD/YYYY';
                                    if (cellProperties.readOnly === 'true') {
                                        cellProperties.allowEmpty = true;
                                    } else {
                                        cellProperties.allowEmpty = datalist[i].Allownull;
                                    }
                                    break;
                                default:
                            }
                        }
                    }
                }

                return cellProperties;
            }
        };
        hot = new Handsontable(this.container, this.hotSettings);
        hot.addHook('afterChange', function (changes, source) {
            _this.change = {
                row: changes[0][0],
                cell: changes[0][1],
                Bchange: changes[0][2],
                Achange: changes[0][3],
            }
            obJgridfunc.row = changes[0][0];
            obJgridfunc.cell = changes[0][1];
            obJgridfunc.Bchange = changes[0][2];
            obJgridfunc.Achange = changes[0][3];
            if (app.data.ListOfHeaders[_this.change.cell].isEditable !== "False") {
                var columnName = app.data.ListOfHeaders[_this.change.cell].ColumnName
                var DataTypeFullName = app.data.ListOfHeaders[_this.change.cell].DataTypeFullName
                if (_this.change.Bchange !== _this.change.Achange && _this.change.cell !== 0) {
                    //check for row condition requestFields, max lenght.
                    obJgridfunc.isChanged = true;
                    obJgridfunc.isConditionPass = obJgridfunc.CheckRowConditions(_this.change)
                    //.then((ispass) => {
                    if (obJgridfunc.isConditionPass || _this.change.Achange !== null) {
                        //check if cell already change before, if yes delete the last cell in the array

                        for (var i = 0; i < app.globalverb.BuildRowFromCells.length; i++) {
                            if (app.globalverb.BuildRowFromCells[i].columnName === columnName) {
                                app.globalverb.BuildRowFromCells.splice(i, 1)
                                break;
                            }
                        }
                        //keep building row
                        app.globalverb.BuildRowFromCells.push({ value: _this.change.Achange, columnName: columnName, DataTypeFullName: DataTypeFullName });

                        obJgridfunc.BeforeChange += columnName + ":" + obJgridfunc.Bchange + "- ";
                        obJgridfunc.AfterChange += columnName + ":" + obJgridfunc.Achange + "- ";
                    } else {
                        hot.selectCell(_this.change.row, _this.change.cell)
                    }
                }
            }
        });
        hot.addHook('beforePaste', function (data, coords) {
            if (data.length > 1 || data[0].length > 1) {
                showAjaxReturnMessage("You can't paste more than one cell at the time (needs to add the language file)", "w");
                return false;
            }

        });
        hot.addHook('beforeOnCellMouseDown', function (event, coords, TD, blockCalculations) {
            //check requirments fields and control keys.
            //obJgridfunc.GridControlKeys(event, coords);
            if (obJgridfunc.isConditionPass === false) {
                event.stopImmediatePropagation();
                return;
            }


            //don't show blue mark on the cells when  columns are - drildown || attachments
            if (data.HasAttachmentcolumn == true && data.HasDrillDowncolumn == true) {
                if (coords.col <= 2) {
                    blockCalculations.cells = true;
                    blockCalculations.column = true;
                    hot.selectCell(coords.row, 3)
                }
            } else if (data.HasAttachmentcolumn == true && data.HasDrillDowncolumn == false) {
                if (coords.col <= 1) {
                    blockCalculations.cells = true;
                    blockCalculations.column = true;
                }
            } else if (data.HasAttachmentcolumn == false && data.HasDrillDowncolumn == true) {
                if (coords.col <= 1) {
                    blockCalculations.cells = true;
                    blockCalculations.column = true;
                    hot.selectCell(coords.row, 2)
                }
            } else {
                if (coords.col <= 0) {
                    blockCalculations.cells = true;
                    blockCalculations.column = true;
                }
            }

        });
        hot.addHook('beforeKeyDown', function (event) {
            //check requirments fields and control keys.
            obJgridfunc.GridControlKeys(event);
            var selected = this.getSelected()[0];
            var row = selected[0];
            var col = selected[1];
            var cellProp = this.getCellMeta(row, col);
            var Celldata = hot.getDataAtCell(row, col);
            switch (cellProp.type) {
                case "numeric":
                    var regNumeric = new RegExp(/[0-9]|\./);
                    if (_this.AllowKeysIntegerCell(event) === false) {
                        if (!regNumeric.test(event.key)) {
                            event.returnValue = false;
                        }
                    }
                    break;
                case "text":
                    //if (event.keyCode === 66) {
                    //    event.returnValue  = false;
                    //}
                    break;
                case "date":
                    event.returnValue = false;
                    break;
                case "dropdown":
                    break;
                default:
            }
        });
        hot.addHook('afterSelection', function (row, column, row2, column2, preventScrolling, selectionLayerLevel) {
            //concept to get dropdown item list from server
            if (row === -1) return; //condition for sorting issue
            var itemsList = [];
            itemsList.push("");
            var cellProp = this.getCellMeta(row, column);
            if (cellProp.type == "dropdown") {
                data.ListOfdropdownColumns.forEach(function (prop, i) {
                    if (column == prop.colorder) {
                        var item = prop.display.split(",");
                        item.splice(-1, 1);
                        item.forEach(function (item, i) {
                            itemsList.push(item);
                        });
                    }
                });
                cellProp.source = itemsList;
            }
        });
        hot.addHook('afterSelectionEnd', function (rowstart, colstart, rowend, colend) {
            //build row after selection end - cover edit and add new row
            if (obJgridfunc.isConditionPass) {
                obJgridfunc.BuildOneRowBeforeSave(rowstart).then((issaved) => {
                    if (issaved) {
                        console.log("call aftersaved")
                        //if (gridfunc.isError === false) {
                        //if (gridfunc.isEditPrimaryKey) {
                        //    app.globalverb.ArrOfStaticIds[gridfunc.row] = gridfunc.Achange;
                        //}


                        //}
                        obJgridfunc.AfterChange = "";
                        obJgridfunc.BeforeChange = "";
                        app.globalverb.LastRowSelected = rowstart;
                        app.globalverb.BuildRowFromCells = [];
                    }

                });
            } else if (obJgridfunc.isConditionPass === false) {
                console.log(`before: ${obJgridfunc.isConditionPass}`);
                // obJgridfunc.isConditionPass = true;
                //hot.selectCell(_this.change.row, _this.change.cell);
                //showAjaxReturnMessage("Row number [" + _this.change.row + "] will not save Required fields", "e")
                //obJgridfunc.isConditionPass = false;
            }

            //build rows array for later use.
            if (hot.getSelected().length === 1) {
                //if get selected method comes with one row it means it is starting new row
                //so in this case I clear the array and start all over again.
                rowselected = [];
            }
            if (rowstart < rowend) {
                for (var i = rowstart; i < rowend + 1; i++) {
                    rowselected.push(i);
                }
            } else if (rowstart > rowend) {
                for (var j = rowend; j < rowstart + 1; j++) {
                    rowselected.push(j);
                }
            } else if (rowstart === rowend) {
                rowselected.push(rowstart);
            }
            //check if the table is trackable; if yes return data into the trackble container
            obJgridfunc.RowKeyid = hot.getDataAtRow(rowstart)[0];
            if (obJgridfunc._isTableTrackble == true) {
                obJgridfunc.GetRowTrackTableData();
            }
        });
        hot.addHook('beforeOnCellMouseOver', function (event, coords, TD, blockCalculations) {
            //for drilldown
            if (data.HasDrillDowncolumn == true && coords.col == 1 && coords.row != -1) {
                //drildownclick.Childid = hot.getDataAtCell(coords.row, 0);
                var createNewdrillLinks = "";
                createNewdrillLinks = '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true"><span class="fa-stack theme_color" title="Menu"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-list fa-stack-1x" style="top: 8px;"></i></span></a>'
                    + data.ListOfdrilldownLinks
                TD.innerHTML = createNewdrillLinks;
                //$('.grid_drildown').hide();
            }
            //} else if (TD.children[1] != undefined && coords.col === 1) {
            //    console.log("already got the link from server.");
            //}

        });
        hot.addHook('afterUndo', function (action) {
            var btnNew = document.querySelector(app.domMap.ToolBarButtons.BtnNewRow);
            if (action.actionType === "insert_row") {
                btnNew.value = "New";
                btnNew.style.backgroundColor = "white"
                app.globalverb.Isnewrow = false;
            }
        });
        hot.updateSettings({
            hiddenColumns: {
                columns: [0],
                indicators: true
            },
            //calculate row to get a dynamic height 34px is the row high + 68 is the header hight 
            height: hot.countRows() * 34 + 68,
            //colWidths: this.colWidthArray
        });

    },
    RunhandsOnTable: function (data) {
        if (hot === undefined) {
            this.buildHandsonTable(data);
        } else {
            hot.destroy();
            this.buildHandsonTable(data);
        }
        this.ClearObjectsForNewview();
        this.Pagination(data);
    },
    Pagination: function (data) {
        //paging for grid.
        var inputPagNum = document.getElementsByClassName("page-number")[0];
        inputPagNum.value = data.PageNumber;
        //inputPagNum.attributes.
        var pagingDiv = document.getElementById('paging');
        pagingDiv.style.display = "block";
        inputPagNum.addEventListener("keypress", function (e) {
            var pageNum = this.value + e.key;
            var Checktotalpages = parseInt(document.getElementsByClassName("total-pages")[0].innerHTML);
            if (pageNum > Checktotalpages || e.keyCode === 45 || e.keyCode === 43 || pageNum < "1") {
                e.preventDefault();
            }
        });
        if (obJgridfunc.isPagingClick === true) {
            document.getElementsByClassName("total-rows")[0].innerHTML = pagingModel.TotalRows;
            document.getElementsByClassName("total-pages")[0].innerHTML = pagingModel.TotalPagesNumber;
            document.getElementsByClassName("per-page")[0].innerHTML = pagingModel.RowPerPage;
        } else {
            //get the total rows later written that way to prevent slownes with big data.
            pagingModel.RowPerPage = "Rows per page:  " + data.RowPerPage;
            document.getElementsByClassName("per-page")[0].innerHTML = pagingModel.RowPerPage;
            this.GetTotalRows(pagingModel);
        }

    },
    GetTotalRows: function (pagingModel) {
        obJgridfunc.pageNum = 1;
        var data = JSON.stringify({ paramsUI: obJgridfunc, searchQuery: buildQuery })
        var call = new DataAjaxCall(app.url.server.GetTotalrowsForGrid, app.ajax.Type.Post, app.ajax.DataType.Json, data, app.ajax.ContentType.Utf8, "", "", "");
        call.Send().then((total) => {
            pagingModel.TotalRows = "Total: " + total.split("|")[0];
            pagingModel.TotalPagesNumber = total.split("|")[1];
            document.getElementsByClassName("total-rows")[0].innerHTML = pagingModel.TotalRows.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementsByClassName("total-pages")[0].innerHTML = pagingModel.TotalPagesNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
    },
    ClearObjectsForNewview: function () {
        this.rowcallLinks = [];
    },
    RowRendererCheckBox: function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.HtmlRenderer.apply(this, arguments);
        td.className = "text-center action-icon";
        //td.innerHTML = '<input type="checkbox" checked="checked" onchange="test(this)" data-row="' + row + '">';
        td.innerHTML = '<input type="checkbox" onchange="ListOfCheckboxArray(this)" data-row="' + row + '">';
    },
    RowRenderDrilldown: function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.HtmlRenderer.apply(this, arguments);
        td.className = "Column2 text-center action-icon open";
        td.innerHTML = '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true"><span class="fa-stack theme_color" title="Menu"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-list fa-stack-1x" style="top:8px;"></i></span></a>';
    },
    RowRendererattachment: function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.HtmlRenderer.apply(this, arguments);
        td.style.textAlign = 'center';
        if (value > 0) {
            td.innerHTML = '<i style="cursor: pointer" onclick="obJattachmentsview.StartAttachmentDialog()" class="fa fa-paperclip fa-flip-horizontal fa-2x theme_color"></i>';
        } else {
            td.innerHTML = '<span style="cursor: pointer" onclick="obJattachmentsview.StartAttachmentDialog()" class="fa-stack theme_color"><i class="fa fa-paperclip fa-flip-horizontal fa-stack-2x"></i><i class="fa fa-plus fa-stack-1x" style="top:16px;left:10px;"></i></span>';
        }
    },
    ColumnInteger: function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    },
    ColumnString: function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    },
    ColumnDouble: function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    },
    ColumnDateTime: function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    },
    AllowKeysIntegerCell: function (event) {
        var isAllow = false;
        switch (event.keyCode) {
            case 8: //Backspace
                isAllow = true;
                break;
            case 46: //Delete
                isAllow = true;
                break;
            case 37: //arrow left
                isAllow = true;
                break;
            case 39: //arrow right
                isAllow = true;
                break;
            case 40: //arrow down
                isAllow = true;
                break;
            case 38:
                isAllow = true; //arrow up
                break;
            case 32: //space
                isAllow = true;
                break;
            default:
        }
        return isAllow;
    },
};
var HandsOnTableReports = {
    buildHandsonTable: function (data) {
        this.container = document.querySelector(app.domMap.Reporting.HandsOnTableContainer);
        this.container.style.display = "block";
        this.hotSettings = {
            data: data.ListOfRows,
            rowHeaders: false,
            //dropdownMenu: ['remove_col', '---------', 'alignment'],
            filters: true,
            dropdownMenu: ['filter_by_condition', 'filter_action_bar'],
            //height: 700,
            outsideClickDeselects: false,
            disableVisualSelection: false,
            sortIndicator: true,
            columnSorting: true,
            colHeaders: data.ListOfHeader,
            stretchH: 'all',
            fillHandle: false,
            manualRowResize: true,
            manualColumnResize: true,
            search: true,
            headerTooltips: true,
            //currentRowClassName: 'currentRow',
            //renderAllRows: false,
            //afterDeselect: true,
            //colWidths: [0, 10,18],
            //fixedRowsTop: 1,
            //manualColumnFreeze: true,
            comments: true,
            //contextMenu: ['row_above', 'row_below', 'remove_row'],
            //contextMenu: toolbarmenufunc.GetMenu(),
            autoRowSize: false,
            autoWrapCol: false,
            autoWrapRow: false,
            manualRowMove: true,
            manualColumnMove: true,
            licenseKey: "non-commercial-and-evaluation",
        };
        hot = new Handsontable(this.container, this.hotSettings);
        hot.updateSettings({
            cells: function (row, col) {
                var cellProperties = {};
                cellProperties.readOnly = true;
                return cellProperties;
            },
            //calculate row to get a dynamic height 34px is the row high + 68 is the header hight 
            height: hot.countRows() * 34 + 68,
            //colWidths: this.colWidthArray
        });
    }

}

var HandsOnTableRetentionRowInfo = {
    buildHandsonTable: function (data) {
        this.container = document.querySelector(app.domMap.Retentioninfo.handsOnTableRetinfo);
        this.container.style.display = "block";
        this.hotSettings = {
            data: data.ListOfRows.length == 0 ? [["#####", "#####", "#####"]] : data.ListOfRows,
            rowHeaders: false,
            //dropdownMenu: ['remove_col', '---------', 'alignment'],
            //filters: true,
            //dropdownMenu: ['filter_by_condition', 'filter_action_bar'],
            //height: 700,
            outsideClickDeselects: false,
            disableVisualSelection: false,
            sortIndicator: true,
            columnSorting: true,
            colHeaders: data.ListOfHeader,
            stretchH: 'all',
            fillHandle: false,
            manualRowResize: true,
            manualColumnResize: true,
            //search: true,
            headerTooltips: true,
            currentRowClassName: 'currentRow',
            //renderAllRows: false,
            //afterDeselect: true,
            //colWidths: [0, 10,18],
            //fixedRowsTop: 1,
            //manualColumnFreeze: true,
            comments: true,
            //contextMenu: ['row_above', 'row_below', 'remove_row'],
            //contextMenu: toolbarmenufunc.GetMenu(),
            autoRowSize: false,
            autoWrapCol: false,
            autoWrapRow: false,
            //manualRowMove: true,
            //manualColumnMove: true,
            licenseKey: "non-commercial-and-evaluation",
        };
        hotRetention = new Handsontable(this.container, this.hotSettings);
        hotRetention.updateSettings({
            cells: function (row, col) {
                var cellProperties = {};
                cellProperties.readOnly = true;
                return cellProperties;
            },
            //calculate row to get a dynamic height 34px is the row high + 68 is the header hight 
            height: hotRetention.countRows() * 34 + 68,
            //colWidths: this.colWidthArray
        });
        hotRetention.addHook('afterSelectionEnd', function (rowstart, colstart, rowend, colend) {
            //get rows selected
            if (hot.getSelected().length === 1) {
                rowselectedRetention = [];
            }
            if (rowstart < rowend) {
                for (var i = rowstart; i < rowend + 1; i++) {
                    rowselectedRetention.push(i);
                }
            } else if (rowstart > rowend) {
                for (var j = rowend; j < rowstart + 1; j++) {
                    rowselectedRetention.push(j);
                }
            } else if (rowstart === rowend) {
                rowselectedRetention.push(rowstart);
            }
        });
    }
}




//FIRST OBJECT CREATED ON THE FIRST RUN.
const obJgridfunc = new GridFunc();
const obJfavorite = new Favorite();
const obJquerywindow = new QueryWindow();
const obJlinkscript = new Linkscript();
const obJmyquery = new MyQuery();
const obJglobalsearch = new GlobalSearch();
const obJattachmentsview = new AttachmentsView();
const obJtoolbarmenufunc = new ToolBarMenuFunc();
const obJretentioninfo = new RetentionInfo();
var obJbreadcrumb = new BreadCrumb();
var obJdrildownclick = new DrilldownClick();
var obJreports = new Reports();
var taskbar = new TaskBar();










