@Imports TabFusionRMS.Models
@ModelType Databas

@Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmAddNewDb", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlAddDatabase" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabelAdd"></h4>
                </div>

                <!-- Text input-->
                <div class="modal-body">
                    @Html.HiddenFor(Function(m) m.Id, New With {.id = "Id", .name = "Id"})
                    <div class="form-group row">
                        <label class="col-sm-4 control-label" for="txtConnectName">@Languages.Translation("lblAddNewDatabasePartialConnName")</label>
                        <div class="col-sm-8">
                            @Html.TextBoxFor(Function(m) m.DBName, New With {.class = "form-control", .id = "txtConnectName", .name = "txtConnectName", .type = "text", .autofocus = ""})
                            <!--<input id="txtConnectName" name="txtConnectName" type="text" placeholder="" class="form-control input-md" />-->
                        </div>
                    </div>

                    <!-- Select Basic -->
                    <div class="form-group row">
                        <label class="col-sm-4 control-label" for="lstServerName">@Languages.Translation("lblAddNewDatabasePartialServerName")</label>
                        <div class="col-sm-8">
                            <select id="DBServer" name="DBServer" class="form-control"></select>
                        </div>
                    </div>

                    <!-- Text input-->
                    <div class="form-group row">
                        <label class="col-sm-4 control-label" for="txtUserID">@Languages.Translation("lblAddNewDatabasePartialUserId")</label>
                        <div class="col-sm-8">
                            @Html.TextBoxFor(Function(m) m.DBUserId, New With {.class = "form-control", .id = "txtUserID", .name = "txtUserID", .type = "text", .autofocus = ""})
                            @*<input id="txtUserID" name="txtUserID" type="text" placeholder="" class="form-control input-md" />*@
                        </div>
                    </div>

                    <!-- Text input-->
                    <div class="form-group row">
                        <label class="col-sm-4 control-label" for="txtPwd">@Languages.Translation("Password") :</label>
                        <div class="col-sm-8">
                            @Html.TextBoxFor(Function(m) m.DBPassword, New With {.class = "form-control", .id = "txtPwd", .name = "txtPwd", .type = "password", .autofocus = ""})
                            @*<input id="txtPwd" name="txtPwd" type="password" placeholder="" class="form-control input-md" />*@
                        </div>
                    </div>

                    <!-- Select Basic -->
                    <div class="form-group row">
                        <label class="col-md-4 control-label" for="lstDB">@Languages.Translation("lblAddNewDatabasePartialDatabase") :</label>
                        <div class="col-md-6 col-sm-6">
                            <select id="DBDatabase" name="DBDatabase" class="form-control"></select>
                        </div>
                    </div>

                    <!-- Text input-->
                    <div class="form-group row">
                        <label class="col-md-4 control-label" for="txtConTimeOut">@Languages.Translation("lblAddNewDatabasePartialConnTymOut")</label>
                        <div class="col-md-2">
                            @Html.TextBoxFor(Function(m) m.DBConnectionTimeout, New With {.class = "form-control", .id = "txtConTimeOut", .name = "txtConTimeOut", .type = "number", .autofocus = ""})
                            @*<input id="txtConTimeOut" name="txtConTimeOut" type="number" placeholder="" class="form-control input-md" />*@
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnSaveDB" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    <button id="btnCancelDB" type="button" class="btn btn-primary" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
        </div>
    </div>
End Using
