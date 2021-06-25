@Imports TabFusionRMS.Models
@ModelType Databas

@*<h2>External Database</h2>*@
<section class="content">
    <div id="parent">

        <div class="form-group row">
            <label class="col-sm-12">@Languages.Translation("tiExternalDBPartialEDC")</label>
            <div class="col-md-10">
                <select id="lstExtDB" size="10" class="form-control"></select>
            </div>
        </div>
        <div class="row" id="divDataButtons">
            <div class="col-sm-12">
                <div class="btn-toolbar">
                    <input type="button" id="btnAddDB" name="btnAddDB" value="@Languages.Translation("Add")" class="btn btn-primary" />
                    <input type="button" id="btnEditDB" name="btnEditDB" value="@Languages.Translation("Edit")" class="btn btn-primary" />
                    <input type="button" id="btnRemoveDB" name="btnRemoveDB" value="@Languages.Translation("btnExternalDBPartialDisconnect")" class="btn btn-primary" />
                </div>
            </div>
        </div>
    </div>
</section>
@*<div id="AddEditDBDialog">
    </div>*@

@Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmAddNewDb", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlAddDatabase" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabelAdd">@Languages.Translation("lblAddNewDatabasePartialAND")</h4>
                </div>

                <!-- Text input-->
                <div class="modal-body">
                    @Html.HiddenFor(Function(m) m.Id, New With {.id = "Id", .name = "Id"})
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-4 control-label" for="txtConnectName">@Languages.Translation("lblAddNewDatabasePartialConnName")</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.DBName, New With {.class = "form-control input-md", .id = "txtConnectName", .name = "txtConnectName", .type = "text", .autofocus = ""})
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Select Basic -->

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-4 control-label" for="lstServerName">@Languages.Translation("lblAddNewDatabasePartialServerName")</label>
                                <div class="col-sm-8">
                                    <select id="DBServer" name="DBServer" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Text input-->

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-4 control-label" for="txtUserID">@Languages.Translation("lblAddNewDatabasePartialUserId")</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.DBUserId, New With {.class = "form-control input-md", .id = "txtUserID", .name = "txtUserID", .type = "text", .autofocus = ""})
                                    @*<input id="txtUserID" name="txtUserID" type="text" placeholder="" class="form-control input-md" />*@
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Text input-->
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-4 control-label" for="txtPwd">@Languages.Translation("Password") :</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.DBPassword, New With {.class = "form-control input-md", .id = "txtPwd", .name = "txtPwd", .type = "password", .autofocus = ""})
                                    @*<input id="txtPwd" name="txtPwd" type="password" placeholder="" class="form-control input-md" />*@
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Select Basic -->
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-4 control-label" for="lstDB">@Languages.Translation("lblAddNewDatabasePartialDatabase") :</label>
                                <div class="col-sm-8">
                                    <select id="DBDatabase" name="DBDatabase" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Text input-->
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group ">
                                <label class="col-sm-4 control-label" for="txtConTimeOut">@Languages.Translation("lblAddNewDatabasePartialConnTymOut")</label>
                                <div class="col-sm-8">
                                    @Html.TextBoxFor(Function(m) m.DBConnectionTimeout, New With {.class = "form-control", .id = "txtConTimeOut", .name = "txtConTimeOut", .type = "number", .autofocus = ""})
                                    @*<input id="txtConTimeOut" name="txtConTimeOut" type="number" placeholder="" class="form-control input-md" />*@
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnSaveDB" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    <button id="btnCancelDB" type="button" class="btn btn-default" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
        </div>
    </div>
End Using
<script src="@Url.Content("~/Scripts/AppJs/ExternalDB.js")"></script>
