
<style type="text/css">
    .tblFilter tbody td, .tblFilter tbody th {
        padding-left: 5px;
    }

    .tblFilter td:first-child, .tblFilter th:first-child {
        padding-left: 0px;
    }

    input, textarea, text, label {
        word-break: keep-all;
    }

    #Dialog_Query_DialogQuery_tblQuery tbody td {
        word-break: keep-all;
    }
</style>

<div class="modal-body" id="modelBody">
    <div class="table-responsive">
        <label Id="lblError" style="color:red;display:none"></label>
        <div style="max-height:400px;">
            <Table id="querytableid" class="table table-noborder table-form">
                @For Each row In Model.ListOfRows
                    @MvcHtmlString.Create(row)
                Next
            </Table><!--get saved queries-->
        </div>
        @*<div>

            <div class="col-xs-12">
                    <input type="checkbox" class="pull-left" Id="cbRememberQuery" checked />@Languages.Translation("cbQueryControlRemQuery").
                </div>
        </div>*@
    </div>
</div>
<div class="modal-footer">
    <div class="row">
        <div Class="col-xs-12" style="display: inline-flex;">
            <input type="checkbox" id="chekBasicQuery" Class="pull-left" onclick="obJquerywindow.CheckboxQueryClick(this)" /><span style="margin-top:-3px">@Languages.Translation("cbQueryControlAlwaysShowQueryInView")</span>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 modal-action p-t-5 sticker">
            <button Id="btnSaveQuery" Issaved="0" class="btn btn-success pull-left">@Languages.Translation("SaveQuery")</button>
            <button onclick="querywindow.ClearInputs()" class="btn btn-default pull-left">@Languages.Translation("Clear")</button>
            <div class="text-right">
                <button Id="OkQuery" class="btn btn-success" onclick="obJquerywindow.QueryOkButton();">@Languages.Translation("Ok")</button>
                <button Id="btnCancel" class="btn btn-default mdlCancel" onclick="obJquerywindow.CloseQuery(this)">@Languages.Translation("Cancel")</button>
                <button Id="btnQueryApply" class="btn btn-success" onclick="obJquerywindow.QueryApplybutton()">@Languages.Translation("Apply")</button>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    app.ServerDataReturn.QueryData = @Html.Raw(Json.Encode(Model.MyqueryList));
    $(document).ready(function () {

    });

</script>


