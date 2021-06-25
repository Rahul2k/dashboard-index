@ModelType TabFusionRMS.Models.SLTableFileRoomOrder

<section class="content">
    <div class="row">
        <div id="divFileRoomOrderButtons" class="col-sm-12">

            <div class="btn-toolbar pull-right">
                <input type="button" id="gridAdd" name="gridAdd" value="@Languages.Translation("Add")" class="btn btn-primary" />
                <input type="button" id="gridEdit" name="gridEdit" value="@Languages.Translation("Edit")" class="btn btn-primary" />
                <input type="button" id="gridRemove" name="gridRemove" value="@Languages.Translation("Remove")" class="btn btn-primary" />
            </div>

        </div>
    </div>
    <div class="row top_space">
        <div class="col-sm-12">
            <div id="divFileRoomOrderGrid" class="jqgrid-cus">
                <table id="grdFileRoomOrder"></table>
                <div id="grdFileRoomOrder_pager">
                </div>
            </div>
        </div>
    </div>
</section>
@Using Html.BeginForm("TableFileRoomOrder", "Admin", FormMethod.Post, New With {.id = "frmTableFileRoomOrder", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlFileRoomOrder" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="btnClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiTableFileRoomOrderFileRoomOrdrAddLn")</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            @Html.HiddenFor(Function(m) m.Id, New With {.value = 0})
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="lstFields">@Languages.Translation("lblTableFileRoomOrderFieldName") :</label>
                                <div class="col-sm-8">
                                    <select id="lstFields" name="FieldName" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row bottom_space">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="chkStartFromEnd">@Languages.Translation("lblTableFileRoomOrderStartFrmEnd") :</label>
                                <div class="col-sm-1">
                                    <div class="checkbox-cus">
                                        @*@Html.CheckBoxFor(Function(m) m.StartFromFront, New With {.name = "StartFromFront", .id = "chkStartFromEnd", .autofocus = ""})*@
                                        <input id="chkStartFromEnd" name="StartFromFront" value="false" type="checkbox" autofocus="" />
                                        <label class="checkbox-inline" for="chkStartFromEnd">&nbsp;</label>
                                        @*<input id="chkStartFromEnd" type="checkbox" name="StartFromFront" value="false"/>*@
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="txtStartingPosition">@Languages.Translation("lblTableFileRoomOrderStartPos") :</label>
                                <div class="col-sm-8">
                                    <input id="txtStartingPosition" class="form-control" type="text" name="StartingPosition" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="col-sm-4 control-label" for="txtNumOfChars">@Languages.Translation("lblTableFileRoomOrderNoOfChars") :</label>
                                <div class="col-sm-8">
                                    <input id="txtNumOfChars" type="text" name="NumberofCharacters" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnSave" type="button" name="btnSave" class="btn btn-primary">@Languages.Translation("Save")</button>
                    <button id="btnClose" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Close")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
End Using
@*<script src="@Url.Content("~/Scripts/AppJs/TablesFileRoomOrder.js")"></script>*@