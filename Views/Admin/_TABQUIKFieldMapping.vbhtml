
<section class="content">
    <div id="parent">
        <div class="form-group">
            <fieldset class="admin_fieldset">
                <legend>Table Selection</legend>
                <label class="col-md-12">
                    <span>This is where  you select the TAB FusionRMS table to associate with the mapping. Changing the table will delete the existing field mapping and SQL below.</span>
                </label>
                <div class="col-md-6 form-group">
                    <select id="ddlTableList" Class="form-control">                        
                    </select>
                </div>
            </fieldset>
            <fieldset class="admin_fieldset">
                <legend>Mapping</legend>
                <label class="col-md-12">
                    <span>Here is where you map the label fields to the TAB FusionRMS fields. Also, you have the ability to create Manual Fields (i.e., to concatenate a field such as First + Last Name) and to apply a Format to the field.</span>
                </label>
                <div class="form-group">
                    <div class="col-sm-12">
                        <div class="table-responsive jqgrid-cus">
                            @*<table >
                                <thead class="ui-jqgrid-htable">
                                    <tr class="ui-jqgrid-labels">
                                        <th class="ui-state-default ui-th-column ui-th-ltr">TABQUIK Field</th>
                                        <th class="ui-state-default ui-th-column ui-th-ltr">TAB FusionRMS Field</th>
                                        <th class="ui-state-default ui-th-column ui-th-ltr">Manual</th>
                                        <th class="ui-state-default ui-th-column ui-th-ltr">Format</th>
                                    </tr>
                                </thead>
                                <tbody class="ui-jqgrid-btable" role="grid">
                                    <tr class="jqgfirstrow">
                                        <td>COLOR BAR TEXT</td>
                                        <td>
                                            <select class="form-control">
                                                <option>Table Field1</option>
                                                <option>Table Field1</option>
                                            </select>
                                        </td>
                                        <td >
                                            <input type="text" class="form-control" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" />
                                        </td>
                                    </tr>
                                    <tr class="ui-widget-content jqgrow ui-row-ltr">
                                        <td>CLASSIFICATION</td>
                                        <td>
                                            <select class="form-control">
                                                <option>Table Field1</option>
                                                <option>Table Field1</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" />
                                        </td>
                                    </tr>
                                    <tr class="ui-widget-content jqgrow ui-row-ltr">
                                        <td>COLOR CODE #(2)</td>
                                        <td>
                                            <select class="form-control">
                                                <option>Table Field1</option>
                                                <option>Table Field1</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" />
                                        </td>
                                    </tr>
                                    <tr class="ui-widget-content jqgrow ui-row-ltr">
                                        <td>YEAR (YY)</td>
                                        <td>
                                            <select class="form-control">
                                                <option>Table Field1</option>
                                                <option>Table Field1</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" />
                                        </td>
                                    </tr>
                                    <tr class="ui-widget-content jqgrow ui-row-ltr">
                                        <td>BARCODE (9max)</td>
                                        <td>
                                            <select class="form-control">
                                                <option>Table Field1</option>
                                                <option>Table Field1</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>*@


                            @*Grid goes here*@
                            <Table id="grdTABQUIK"></Table>
                            @*<div id="grdTABQUIK_pager"></div>*@
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 pull-left">
                    <button id="btnAutoFill" type="button" class="btn btn-primary">Auto Fill</button>
                    <input id ="hdnOperation" type="hidden" value="Add"/>
                    <input id="hdnJobName" type="hidden" value="" />
                    <input id="hdnTableName" type="hidden" value="@TempData("sTableName")" />
                    <input id="hdnSQLUpdateString" type="hidden" value="@TempData("sSQLUpdateString")" />
                    @*<button id="btnViewSQL" type="button" class="btn btn-primary">View SQL</button>*@
                </div>
            </fieldset>
            <fieldset class="admin_fieldset">
                <legend>SQL</legend>
                <label class="col-md-12">
                    <span>Here is where you can confirm the SQL and SQL Updates statements.</span>
                </label>
                <div class="col-sm-12">
                    @*<div class="form-group">
                        <textarea id="txtSelectQuery" rows="3" class="form-control"></textarea>                        
                    </div>*@
                    <div class="form-group">
                        <textarea id="txtUpdateQuery" rows="3" class="form-control"></textarea>
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="form-group">
            <div class="sticker stick">
                <button id="btnTABQUIKApply" type="button" class="btn btn-primary pull-right">@Languages.Translation("Apply")</button>
            </div>
        </div>
    </div>
</section>
<style>
    .editable {
        display: block;
        width: 100%;
        height: 100%!important;
        padding: 5px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #4a4a4a;
        background-color: #fff;
        background-image: none;
        border: 1px solid #c6c6c6;
        border-radius: 3px;
        -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;  
    }

</style>

<script src="@Url.Content("~/Scripts/AppJs/TABQUIKFieldMapping.js")"></script>
