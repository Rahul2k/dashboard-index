<style type="text/css">
    .gridHeader {
        Font-Size: 14px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        background-color: #e7e7e7;
        color: #000;
        padding-left: 5px;
    }

    .gridData {
        Font-Size: 14px;
        font-family: 'Open Sans', sans-serif;
        color: #000;
        padding-left: 5px;
    }
</style>
<br />
<div class="modal-body">
    <div class="form-horizontal">
        <div class="form-group">
            <div class="col-sm-12">
                <label class="control-label col-sm-3">@Languages.Translation("lblRetentionInfoRetCode") </label>
                <div class="col-sm-9">
     
                    @If Model.DDLDrop = False Then
                        @<select id="ddlRetentionCode" Class="form-control" disabled="disabled"></select>
                    Else
                        @<select id="ddlRetentionCode" Class="form-control">
                         <option></option>
                            @For Each item In Model.DropdownRetentionCode
                                If item.selected Then
                                    @<option selected value="@item.value">@item.text</option>
                                Else
                                    @<option value="@item.value">@item.text</option>
                                End If
                            Next
                        </select>
                    End If

                </div>
            </div>
        </div>
        <div Class="form-group">
            <div Class="col-sm-12">
                <Label Class="control-label col-sm-3">@Languages.Translation("lblRetentionInfoDescription")</Label>
                <div Class="col-sm-9 m-t-5">
                    @If Not Model.RetentionDescription = String.Empty Then
                        @<Label id="RetinCodeDesc">@Model.RetentionDescription</Label>
                    Else
                        @<Label id="RetinCodeDesc">N/A</Label>
                    End If
                </div>
            </div>
        </div>
        <hr />
        <div Class="form-group">
            <div Class="col-sm-12">
                <Label Class="control-label col-sm-3">@Languages.Translation("lblRetentionInfoRetItem")</Label>
                <div Class="col-sm-9 m-t-5">
                    <Label ID="RetinItemName" Text="Label">@Model.RetentionItem</Label>
                </div>
            </div>
        </div>
        <div Class="form-group">
            <div Class="col-sm-12">
                <Label Class="control-label col-sm-3">@Languages.Translation("lblRetentionInfoRetStatus")</Label>
                <div Class="col-sm-9 m-t-5">
                    @If Model.RetentionStatus.color = "red" Then
                        @<label id="RetinStatus" style="color:red" Text="Label">@Model.RetentionStatus.text</label>
                    Else
                        @<label id="RetinStatus" Text="Label">@Model.RetentionStatus.text</label>
                    End If
                </div>
            </div>
        </div>
        <div Class="form-group">
            <div Class="col-sm-12">
                <Label Class="control-label col-sm-3">@Languages.Translation("lblRetentionInfoInactivityDate")</Label>
                <div Class="col-sm-9 m-t-5">
                    @If Model.RetentionInfoInactivityDate.color = "red" Then
                        @<label id="RetinInactiveDate" style="color:red">@Model.RetentionInfoInactivityDate.text</label>
                    ElseIf Model.RetentionInfoInactivityDate.color = "black" Then
                        @<label id="RetinInactiveDate" style="color:black">@Model.RetentionInfoInactivityDate.text</label>
                    End If
                </div>
            </div>
        </div>
        <div Class="form-group">
            <div Class="col-sm-12">
                <Label id="lblRetinArchive" Class="control-label col-sm-3">@Model.lblRetentionArchive</Label>
                <div Class="col-sm-9 m-t-5">
                    @If Model.RetentionArchive.color = "red" Then
                        @<label id="RetinArchive" style="color:red">@Model.RetentionArchive.text</label>
                    ElseIf Model.RetentionArchive.color = "black" Then
                        @<label id="RetinArchive" style="color:black">@Model.RetentionArchive.text</label>
                    End If
                </div>
            </div>
        </div>
        <hr />
        <div Class="form-group">
            <div Class="col-sm-12">
                <div id="handsOnTableRetinfo" style="display:none;">

                </div>
            </div>
        </div>
        <div Class="form-group">
            <div Class="col-sm-12">

                <Button id="btnAddRetin" Class="btn btn-success">@Languages.Translation("Add")</Button>
                @if Model.ListOfRows.Count > 0 Then
                    @<Button id="btnEditRetin" Class="btn btn-success">@Languages.Translation("Edit")</Button>
                Else
                    @<Button id="btnEditRetin" disabled="disabled" Class="btn btn-success">@Languages.Translation("Edit")</Button>
                End If
                @if Model.ListOfRows.Count > 0 Then
                    @<Button id="btnRemoveRetin" Class="btn btn-danger pull-right">@Languages.Translation("Remove")</Button>
                Else
                    @<Button id="btnRemoveRetin" disabled="disabled" Class="btn btn-danger pull-right">@Languages.Translation("Remove")</Button>
                End If
            </div>
        </div>
    </div>
    <div Class="modal-footer">
        <div Class="col-xs-12">
            <Button id="btnOkRetin" Class="btn btn-success">@Languages.Translation("OK")</Button>
            <Button id="btnCancelRetin" Class="btn btn-default">@Languages.Translation("Cancel")</Button>
        </div>
    </div>
</div>

<Script>
      var retinfodata = @Html.Raw(Json.Encode(Model));
</Script>
