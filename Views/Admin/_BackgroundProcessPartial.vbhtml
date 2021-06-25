<section class="content">
    <div id="parent">
        <div class="form-group row">
            <div class="col-sm-12">
                <div id="dvBGProcess" class="table-responsive jqgrid-cus">
                    <Table id="grdBackground"></Table>
                    <div id="grdBackground_pager"></div>
                </div>
            </div>
        </div>
    </div>
    <br />
    <hr class="linesaperator" />
    <br />
    <fieldset class="admin_fieldset">
        <legend>@Languages.Translation("lblBackgroundProcessDeletion")</legend>
        @Using Html.BeginForm("BackgroundProcessDeletion", "Admin", FormMethod.Post, New With {.id = "frmBackgroundProcessDeletion", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
            @<div class="col-sm-12">
                <div class="form-group">
                    <div class="col-lg-3">
                        <div class="checkbox-cus">
                            <input type="checkbox" id="chkBGStatusCompleted">
                            <label class="checkbox-inline" for="chkBGStatusCompleted">@Languages.Translation("lblBackgroundProcessStatusCompleted")</label>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="checkbox-cus">
                            <input type="checkbox" id="chkBGStatusError">
                            <label class="checkbox-inline" for="chkBGStatusError">@Languages.Translation("lblBackgroundProcessStatusError")</label>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <input type="text" id="BGEndDate" name="BGEndDate" class="form-control datepicker" readonly="readonly" placeholder="@Languages.Translation("lblBackgroundProcessDeletionEndDate")" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-12">
                        <input type="button" id="btnDaleteTask" name="btnDaleteTask" value="@Languages.Translation("DeleteTasks")" class="btn btn-primary" />
                    </div>
                </div>
            </div>
        End Using

    </fieldset>

</section>
<script src="@Url.Content("~/Scripts/AppJs/BackgroundProcess.js")"></script>
