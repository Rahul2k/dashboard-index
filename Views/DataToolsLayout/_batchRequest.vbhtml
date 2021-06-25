<input type="hidden" value="@Model.Title" id="titleid">
<link rel="stylesheet" href="Content/themes/TAB/css/data.css" type="text/css" media="screen" />
<link rel="stylesheet" href="Content/themes/TAB/css/Grid.css" type="text/css" media="screen" />

<script type="text/javascript">
    function uploadComplete(sender) {
        alert("test2");
    }
    function uploadError(sender) {
        alert("test2");
    }
</script>
<div id="divLocate" class="model-Content divLocate">
    <div class="modal-body">
        <h4>
            <Label ID="lblLocate">Existing Batch Requests</Label>
        </h4>
        <div ID="lvLocate" DataKeyNames="Id">
            <LayoutTemplate>
                <div class="table-responsive">
                    <table class="table table-hover table-condensed">
                        <tr>
                            <th style="width: 10%">@Languages.Translation("Id")</th>
                            <th style="width: 20%">@Languages.Translation("lblBatchRequestCreateDateTime")</th>
                            <th style="width: 10%">@Languages.Translation("User")</th>
                            <th style="width: 10%">@Languages.Translation("Table")</th>
                            <th>@Languages.Translation("Comment")</th>
                        </tr>
                        <asp:PlaceHolder ID="itemPlaceHolder" />
                    </table>
                </div>
            </LayoutTemplate>
            <ItemTemplate>
                <tr id="itemRow" style="cursor: pointer;">
                    <td class="gridcell">
                        @*<asp:LinkButton ID="lnkSelect" Text="Select" CommandName="Select" runat="server" Style="display: none" /><%#Eval("Id")%>*@
                    </td>
                    <td id="tdDateCreated" class="gridcell"><%# Eval("DateCreated")%></td>
                    <td class="gridcell"><%#Eval("OperatorsId")%></td>
                    <td class="gridcell"><%#Eval("RequestedTable")%></td>
                    <td class="gridcell"><%#Eval("Comment")%></td>
                </tr>
            </ItemTemplate>
            <select>
                <tr class="success" id="itemRow">
                    <td class="gridcell">
                        <button ID="lnkSelect" CommandName="Select" Style="display:none">Select</button>
                    </td>
                    <td id="tdDateCreated" class="gridcell"><%#Eval("DateCreated")%></td>
                    <td class="gridcell"><%#Eval("OperatorsId")%></td>
                    <td class="gridcell"><%#Eval("RequestedTable")%></td>
                    <td class="gridcell"><%#Eval("Comment")%></td>
                </tr>
            </select>
        </div>
        <input type="checkbox" Id="cbLocate" class="alignCB" />Current User Batch Requests Only
    </div>
    <div style="padding-bottom: 12px;">
        <label style="color :red; margin-left:32px;font-weight: bold" ID="lblMessage"></label>
    </div>
    <div class="modal-footer">
        <div class="row">
            <div class="col-xs-12 modal-action">
                <button Id="btnLocateOK" class="btn btn-success">OK</button>
                <button Id="btnLocateNew" class="btn btn-success">New</button>
                <button Id="btnLocateDelete" class="btn btn-danger">Delete</button>
                <button class="btn btn-default" onclick="toolsmodel.DialogClose()">Cancel</button>
            </div>
        </div>
    </div>
</div>
@*<%--<div id="mdlFooterClone" class="fixed-footer affixed"></div>--%>*@
<div id="divWorkpad" style="display: none" class="divWorkpad">
    <div class="modal-body">
        <div class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-3 control-label" for="ddlFrom">@Languages.Translation("lblBatchRequestRequestingFrom"):</label>
                <div class="col-sm-9">
                    <select ID="ddlFrom" CssClass="form-control"></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="ddlFrom"></label>
                <div class="col-sm-9">
                    <input Id="txtIDs" Rows="4"class ="form-control" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="txtComment">@Languages.Translation("Comment"):</label>
                <div class="col-sm-9">
                    <textarea Id="txtComment" rows="4" cols="4" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="txtComment"></label>
                <div class="col-sm-9">
                    <textarea Id="txtError" rows="4" role="4" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="ddlBy">@Languages.Translation("RequestedBy"):</label>
                <div class="col-sm-9">
                    <select Id="ddlBy" class="form-control"></select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="rblPriority">@Languages.Translation("lblBatchRequestPriority"):</label>
                <div class="col-sm-9">
                    <div Id="rblPriority" class="cus-radio">
                        <input type="checkbox">Standard
                        <input type="checkbox" Value="0">High
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label" for="fuImport"></label>
                <div class="col-sm-6">
                    <div class="input-group">
                        <label class="input-group-btn">
                            <span class="btn btn-primary">
                                @Languages.Translation("btnJsBootstrapfdBrowse")<input type="file" Id="fuImport" Style="display: none;" />
                            </span>
                        </label>
                        <input type="text" id="SelFile" class="form-control" readonly>
                    </div>

                </div>
                <div class="col-sm-3">
                    <button Id="btnImport" runat="server" Text="Import" class="btn btn-warning" />
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-3"></div>
                <div class="col-sm-9">
                    <label style="color:red;font-weight:bold">@Languages.Translation("lblNoteOnlyCsvAndTxtAllowed")</label>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <div class="row">
            <div class="col-xs-12 modal-action">
                <button Id="btnSubmit" class="btn btn-success">Submit</button>
                <button Id="btnClear" class="btn btn-default">Clear</button>
                <button onclick="toolsmodel.DialogClose()" class="btn btn-default">Cancel</button>
                <button Id="btnSave" class="btn btn-success">Save & Close</button>
            </div>
        </div>
    </div>
</div>
<style>
    .fixed-footer .modal-action input {
        margin-right: 0px !important;
    }
</style>

