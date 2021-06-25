<section class="content form-horizontal" id="pnlViews" style="display:none">
    <div id="parent">
        @*<ul id="sortable">
            </ul>*@
        @*<label class="col-sm-1 col-md-1"></label>*@
        @*<label class="col-sm-1 col-md-1"></label>*@
        <div class="form-group">
            <label class="col-md-12">
                <span>@Languages.Translation("lblViewsListPartialViewsFor") </span><label id="lblViewName"></label>
            </label>
            <div class="col-sm-10">
                <select id="lstViewsList" size="10" class="form-control"></select>
            </div>
            <div class="col-sm-2 col-lg-1" style="margin-top:70px">
                    <button id="btnUp" type="button" class="btn btn-primary btn-block"><i class="fa fa-arrow-up"></i></button>
                    <button id="btnDown" type="button" class="btn btn-primary btn-block"><i class="fa fa-arrow-down "></i></button>
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-10">
                <div class="btn-toolbar">
                    <button id="btnAdd" type="button" class="btn btn-primary">@Languages.Translation("Add")</button>
                    <button id="btnEdit" type="button" class="btn btn-primary">@Languages.Translation("Edit")</button>
                    <button id="btnDelete" type="button" class="btn btn-primary">@Languages.Translation("Delete")</button>
                </div>
            </div>
        </div>
    </div>
</section>
