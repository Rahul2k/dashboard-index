<section class="content form-horizontal">


    <div class="form-group">
        <div class="col-lg-5 col-md-4">
            <div class="btn-toolbar">
                <input type="button" id="btnAddUser" value="@Languages.Translation("Add")" class="btn btn-primary" />
                <input type="button" id="btnEditUser" value="@Languages.Translation("Edit")" class="btn btn-primary" />
                <input type="button" id="btnDeleteUser" value="@Languages.Translation("Delete")" class="btn btn-primary" />
            </div>
        </div>
        <div class="col-lg-7 col-md-8">
            <div class="btn-toolbar pull-right">
                <input type="button" id="btnAssignGrp" value="@Languages.Translation("btnSUPartialAssignGroups")" class="btn btn-primary" />
                <input type="button" id="btnUnlockAcc" value="@Languages.Translation("btnSUPartialUnlockAccount")" class="btn btn-primary" />
                <input type="button" id="btnSetPwd" value="@Languages.Translation("btnSUPartialSetPassword")" class="btn btn-primary" />
            </div>
        </div>
    </div>
    <div class="row top_space">
        <div class="col-md-8 col-lg-9">
            <div class="form-group">
                <div class="col-sm-12 table-responsive jqgrid-cus">
                    <table id="grdSecurityUsers" class="table"></table>
                    <div id="grdSecurityUsers_pager"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-lg-3">
            <fieldset class="admin_fieldset">
                <legend id="lgdAssignedGrp">@Languages.Translation("tiSUPartialAssignedGroups")</legend>
                <div class="form-group">
                    <label class="col-sm-12 text-control" id="displaySelUserName"></label>
                    <div class="col-sm-12">
                        <select id="selAssignedGroups" size="15" class="form-control"></select>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
    <div class="row">
        &nbsp;
    </div>
    <!-- Assigned Groups -->
    @*<div class="row">
            <div class="col-sm-12 col-md-12">
                <fieldset>
                    <legend id="lgdAssignedGrp">
                        Assigned Groups
                    </legend>
                    <div class="row">
                        <select id="selAssignedGroups" size="10" class="form-control"></select>
                    </div>
                </fieldset>
            </div>
        </div>*@


    <!--Start for Assign Group-->
    <div class="modal fade" id="mdlListGroups" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="btnGrpClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiSUPartialAvailableGroups")</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="lstGroups">
                                <ul id="ulGroups" class="list-group available_listgroup"></ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnSaveGrpToUsr" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    <button id="btnGrpCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
    </div>
    <!--End for Assign Group-->
    <!--ADD/EDIT User Profile-->
    <div id="divLoadAddEditUserProfile">
    </div>

    <!-- SET PASSWORD -->
    <div class="modal fade" id="mdlSetUserPassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("btnSUPartialSetPassword")</h4>
                </div>
                <div class="modal-body">
                    <fieldset class="admin_fieldset">
                        <legend><label id="lblUserName"></label></legend>
                        <div class="form-group row">
                            <label class="col-sm-4 control-label" for="txtNewPassword">@Languages.Translation("lblSUPartialNewPassword"): </label>
                            <div class="col-sm-8">
                                <input id="txtNewPassword" type="password" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 control-label" for="txtConfirmPassword">@Languages.Translation("lblSUPartialConfirmPassword") : </label>
                            <div class="col-sm-8">
                                <input id="txtConfirmPassword" type="password" class="form-control" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-4"></div>
                            <div class="col-sm-8">
                                <div class="checkbox-cus">
                                    <input id="chkRequireLogin" type="checkbox" checked="checked"/>
                                    <label class="checkbox-inline" for="chkRequireLogin">@Languages.Translation("msgSUPartialUserNeedsChangePassOnNextLogin")</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button id="btnSaveUserPwd" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    <button id="btnUserPwdClose" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</section>
