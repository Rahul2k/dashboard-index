<div>
    <div class="modal-body">
        <div class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="control-label col-sm-3">
                        <span>@Model.label</span>
                    </label>
                    <div class="col-sm-8">
                        <select id="DDLfavorite" Class="form-control">
                            <option value="0">@Model.placeholder</option>
                            @for Each item In Model.ListAddtoFavorite
                                @<option value="@item.value">@item.text</option>
                            Next
                        </select>
                    </div>
                </div>
            </div>
            <div Class="col-sm-12">
                <span id="addtoFavlblError" style="color:Red;"></span>
            </div>
        </div>
    </div>
    <div Class="modal-footer">
        <div Class="col-xs-12">
            <input value="Cancel" onclick="dlgClose.CloseDialog(false)" Class="btn btn-default text-uppercas">
            <input value="OK" id="AddtofavoriteOK" Class="btn btn-success">
        </div>
    </div>

</div>
<Script>
    //vrClientsRes["FavoriteListDdl"];
    //vrClientsRes["lblAddFavourite"];
</Script>