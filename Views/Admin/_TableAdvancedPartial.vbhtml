@Imports TabFusionRMS.Models
@ModelType TabFusionRMS.Models.Table
<section class="content">
    @Using Html.BeginForm("SetAdvanced", "Admin", FormMethod.Post, New With {.id = "frmTableAdvanced", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnUrl")})
        @<div id="parent">


            <fieldset class="admin_fieldset">
                <legend>@Languages.Translation("lblTableAdvancedPartialLevel")</legend>
                <div class="col-sm-12">
                    <div class="form-group">
                        @Html.HiddenFor(Function(m) m.TableName)
                        @Html.HiddenFor(Function(m) m.RecordManageMgmtType)
                        <div class="col-md-4 col-lg-2">
                            <div class="checkbox-cus">
                                <input type="checkbox" id="folderLevel" name="folderLevel">
                                <label class="checkbox-inline" id="folderLevelLabel" for="folderLevel">@Languages.Translation("lblTableAdvancedPartialFolderLevel")</label>
                            </div>
                        </div>
                        <div class="col-md-5 col-lg-4">
                            <div class="checkbox-cus">
                                <input type="checkbox" id="DocLevel" name="DocLevel">
                                <label class="checkbox-inline" id="DocLevelLabel" for="DocLevel">@Languages.Translation("lblTableAdvancedPartialDocLevel")</label>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>


            <div id="docLevelDiv">
                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("tiTableAdvancedPartialDocLevelProp")</legend>
                    <div class="col-sm-12">
                        <label id="typeDescription" name="typeDescription" hidden="hidden">
                        </label>

                        <div class="form-group">
                            <label class="col-lg-3 col-md-4 control-label" for="RecordManageMgmtTypeDoc">@Languages.Translation("lblTableAdvancedPartialType")</label>
                            <div class="col-lg-4 col-md-7 controls">
                                <select id="RecordManageMgmtTypeDoc" name="RecordManageMgmtTypeDoc" class="form-control"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 col-md-4 control-label" for="ParentFolderTableName">@Languages.Translation("lblTableAdvancedPartialParentFoldTable")</label>
                            <div class="col-lg-4 col-md-7  controls">
                                <select id="ParentFolderTableName" name="ParentFolderTableName" class="form-control"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-lg-3 col-md-4 control-label" for="ParentDocTypeTableName">@Languages.Translation("lblTableAdvancedPartialParentDocTypeTable")</label>
                            <div class="col-lg-4 col-md-7  controls">
                                <select id="ParentDocTypeTableName" name="ParentDocTypeTableName" class="form-control"></select>
                            </div>
                        </div>
                        @*<div class="row form-group">
                                <div class="col-sm-5 col-md-5">
                                    <label class="control-label" id="memo_label">Type:</label>
                                </div>
                                <div class="col-sm-7 col-md-7">
                                    <select id="RecordManageMgmtTypeDoc" name="RecordManageMgmtTypeDoc" class="form-control"></select>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-sm-5 col-md-5"></div>
                                <div class="col-sm-7 col-md-7">
                                    <label id="typeDescription" name="typeDescription" hidden="hidden">
                                    </label>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-sm-5 col-md-5">
                                    <label class="control-label" id="memo_label">Parent Folder Table:</label>
                                </div>
                                <div class="col-sm-7 col-md-7">
                                    <select id="ParentFolderTableName" name="ParentFolderTableName" class="form-control"></select>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-sm-5 col-md-5">
                                    <label class="control-label" id="memo_label">Parent DocType Table:</label>
                                </div>
                                <div class="col-sm-7 col-md-7">
                                    <select id="ParentDocTypeTableName" name="ParentDocTypeTableName" class="form-control"></select>
                                </div>
                            </div>*@
                    </div>
                </fieldset>
            </div>
            @*<div class="row">
                    <div class="col-sm-6 col-md-6">
                    </div>
                    <div class="col-sm-1 col-md-1">
                        <input type="button" id="btnApplyAdvanced" class="btn btn-primary" value="Apply" />
                    </div>
                </div>*@
            <div class="form-group">
                <div class="col-sm-12">
                    @*<label class="col-lg-5 col-md-6 col-sm-12 control-label" for="RecordManageMgmtTypeDoc"></label>*@
                    <input type="button" id="btnApplyAdvanced" class="btn btn-primary pull-right" value="@Languages.Translation("Apply")" />
                </div>
            </div>
        </div>

    End Using
</section>
<script src="@Url.Content("~/Scripts/AppJs/TableAdvanced.js")"></script>