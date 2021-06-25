
<section class="content form-horizontal" id="pnlTABQUIKList" >
    <div id="parent">
        <div class="form-group">
            <label class="col-md-12">
                <span>This is where TAB Fusion to TABQuik Integration is setup. To create a new mapping click New below. To edit an existing mapping, select the mapping then click edit or double click on the mapping name. </span>
            </label>
            <label class="col-md-12">
                <span class="spanThemeColor">NOTE</span> - Removing a mapping is permanent and can not be undone.
            </label>
            <div class="col-sm-12">
                <select id="lstTABQUIKList" size="10" class="form-control">                    
                </select>
            </div>
            @*<div class="col-sm-2 col-lg-1" style="margin-top:70px">
                <button id="btnUp" type="button" class="btn btn-primary btn-block"><i class="fa fa-arrow-up"></i></button>
                <button id="btnDown" type="button" class="btn btn-primary btn-block"><i class="fa fa-arrow-down "></i></button>
            </div>*@
        </div>

        <div class="form-group">
            <div class="col-sm-10">
                <div class="btn-toolbar">
                    <input type="file" id="fileInput" name="fileInput" accept=".def,text/def" style="display:none;" value="@Languages.Translation("lblImportMainFormUpload")" dirname="" class="m-t-5" />
                    <input type="file" id="FileInputForLabel" name="FileInputForLabel" style="display:none" class="m-t-5"/>
                    <button id="btnAdd" type="button" class="btn btn-primary">@Languages.Translation("Add")</button>
                    <button id="btnEdit" type="button" class="btn btn-primary">@Languages.Translation("Edit")</button>
                    <button id="btnDelete" type="button" class="btn btn-primary">@Languages.Translation("Delete")</button>
                    <input type="hidden" id="hdnButtonClicked" value=""/>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="@Url.Content("~/Scripts/AppJs/TABQUIKFieldMapping.js")"></script>
