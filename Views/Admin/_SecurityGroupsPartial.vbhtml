
<section class="content form-horizontal">

    <div class="form-group">
        <div class="col-lg-5 col-md-4 col-sm-7">
            <div class="btn-toolbar">
                <input type="button" id="btnAddGroup" value="@Languages.Translation("Add")" class="btn btn-primary" />
                <input type="button" id="btnEditGroup" value="@Languages.Translation("Edit")" class="btn btn-primary" />
                <input type="button" id="btnDeleteGroup" value="@Languages.Translation("Delete")" class="btn btn-primary" />
            </div>
        </div>
        <div class="col-lg-7 col-md-8 col-sm-5 text-right">
            <input type="button" id="btnAssignMembers" value="@Languages.Translation("btnSGPartialAssignMembers")" class="btn btn-primary" />
        </div>
    </div>
    <div class="row top_space">
        <div class="col-md-8 col-lg-9">
            <div class="form-group">
                <div class="col-sm-12 table-responsive jqgrid-cus">
                    <table id="grdSecurityGroups" class="table"></table>
                    <div id="grdSecurityGroups_pager"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-lg-3">
            <fieldset class="admin_fieldset">
                <legend id="lgdAssignedMembership">@Languages.Translation("tiSGPartialGroupMembers")</legend>
                <div class="form-group displayuser">
                    <label class="col-sm-12 text-control" id="displaySelUserName"></label>
                    <div class="col-sm-12">
                        <select id="selAssignedMembers" size="10" class="form-control"></select>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>


    <div class="row">
        &nbsp;
    </div>
    <!-- Assigned Members -->
    @*<div class="row">
            <div class="col-sm-12 col-md-12">
                <fieldset>
                    <legend id="lgdAssignedMembership">
                        Group Members
                    </legend>
                    <div class="row">
                        <select id="selAssignedMembers" size="10" class="form-control"></select>
                    </div>
                </fieldset>
            </div>
        </div>*@

    <!--Start for Assign Member/User-->
    <div class="modal fade" id="mdlListMembers" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="btnUsrClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiSGPartialAvailableMembers")</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div id="lstMembers">
                                <ul id="ulMembers" class="list-group available_listgroup"></ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnSaveUsrToGrp" type="button" class="btn btn-primary text-uppercase">@Languages.Translation("Ok")</button>
                    <button id="btnUsrCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
    </div>
    <!--End for Assign Member/User-->
    <!--ADD/EDIT User Profile-->
    <div id="divLoadAddEditGroupProfile">
    </div>
</section>