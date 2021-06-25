<div>
    <div class="modal-body">
        <div class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="control-label col-sm-3">
                        <span>Favorite: </span>
                    </label>
                    <div class="col-sm-8">
                        <input id="newfavinput" type="text" maxlength="60" class="form-control" placeholder="Enter Favorite Name">
                    </div>
                    <div class="col-sm-1">
                        <span style="color:Red;visibility:hidden;">*</span>
                        <span style="color:Red;visibility:hidden;">*</span>
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <span id="Dialog_Favourites_lblError" style="color:Red;"></span>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <div class="col-xs-12">
            <input onclick="dlg.CloseDialog(false)" value="Cancel" class="btn btn-default text-uppercas">
            <input id="favoriveOk" value="OK" class="btn btn-success">
        </div>
    </div>
</div>