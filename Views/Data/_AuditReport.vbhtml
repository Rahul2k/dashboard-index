<style>
    .modal-content .romit .admin_fieldset .col-sm-3 {
        width: 100%;
        text-align: left;
    }

    .modal-content .romit .admin_fieldset .col-sm-9 {
        width: 100%;
    }

    .checkboxlabel {
        position: relative;
        left: 19px;
        top: -2px;
    }
    .errorCheck {
        color: red;
        left: 4px;
        position: relative;
        top: 3px;
        display:none;
    }
</style>


<div>
    <div class="form-horizontal">
        <div style="display: inline-block;" id="auditFilter">
            <div class="col-sm-12">
                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("ARF_legend_Selection")</legend>
                    <div class="col-sm-4 col-md-6 col-lg-4">
                        <div class="form-group clearfix">
                            <label for="ddlUser" class="control-label text-right">@Languages.Translation("ARF_lblUser")</label>
                            <div class="">
                                <select onchange="auditEvents.userChange(this)" id="ddlUser" class="form-control">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 col-md-6 col-lg-4">
                        <div class="form-group clearfix">
                            <label for="ddlObject" class="control-label text-right">@Languages.Translation("ARF_lblObject")</label>
                            <div class="">
                                <select onchange="auditEvents.ObjectChange(this)" id="ddlObject" class="form-control"></select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 col-md-6 col-lg-4">
                        <div class="form-group clearfix">
                            <label for="txtObjectId" class="control-label text-right">@Languages.Translation("ARF_lblId")</label>
                            <div class="">
                                <input type="text" id="txtObjectId" class="form-control" MaxLength="10" disabled="disabled">
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4 col-md-6 col-lg-4">
                        <div class="form-group clearfix">
                            <label for="dtStartDate" class="control-label text-right">@Languages.Translation("ARF_lblStartDate")<span class="errorCheck">*</span></label>
                            <div class="">
                                <input type="date" id="dtStartDate" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 col-md-6 col-lg-4">
                        <div class="form-group clearfix">
                            <label for="dtEndDate" class="control-label text-right">@Languages.Translation("ARF_lblEndDate")<span class="errorCheck">*</span></label>
                            <div class="">
                                <input type="date" id="dtEndDate" class="form-control">
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <br />
            <div class="col-sm-12">
                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("ARF_legend_Include")</legend>
                    <div class="col-sm-12">
                        <span id="CheckboxMsg" style="color:red;position:absolute;top:-24px;left:34px"></span>
                    </div>
                    <div class="col-sm-4">
                        <div class="input-group checkbox">
                            <label>
                                <input type="checkbox" id="chkSuccessLogin" />
                                <span class="checkboxlabel">@Languages.Translation("ARF_lblSuccessLogin")</span>
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="input-group checkbox">
                            <label>
                                <input type="checkbox" id="chkFailedLogin" />
                                <span class="checkboxlabel">@Languages.Translation("ARF_lblFailedLogin")</span>
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="input-group checkbox">
                            <label>
                                <input type="checkbox" id="chkAddEditDel" disabled="disabled" />
                                <span class="checkboxlabel">@Languages.Translation("ARF_lblAdd_Edit_Delete")</span>
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="input-group checkbox">
                            <label>
                                <input id="chkConfidential" type="checkbox" disabled="disabled" />
                                <span class="checkboxlabel">@Languages.Translation("ARF_lblConfidentialDataAccess")</span>
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="input-group checkbox">
                            <label>
                                <input type="checkbox" id="chkChildTable" disabled="disabled" />
                                <span class="checkboxlabel">@Languages.Translation("ARF_lblChildTable")</span>
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="col-sm-12">
                <div class="pull-left">
                    <Label Style="margin-left: 30px; color: red;" id="lblMessage"></Label>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>
<div class="modal-footer">
    <div class="col-xs-12">
        <input type="button" onclick="dlg.CloseDialog(true)" value="Cancel" class="btn btn-default text-uppercas">
        <input type="button" onclick="auditEvents.BtnOkClick(this)" id="auditReportOk" value="Ok" class="btn btn-primary">
    </div>
</div>






<script type="text/javascript" language="javascript">
    //get data from the model
    GenerateDropDown();
    $(document).ready(function () {
        var auditFilter = $('#auditFilter');
        auditFilter.addClass("romit");
        auditFilter.addClass("col-sm-12");
        $('.form-group').find('label').addClass('col-sm-3');
        $('.form-group').find('div:first').addClass('col-sm-9');
        var arrow = document.getElementsByName("arrowUpDown")[0];
        arrow.style.display = "block";
        arrow.id = "auditArrowUpDown";

        $("body").unbind().on("click", "#auditArrowUpDown", function () {
            var dlgbody = document.getElementById("dlgBsContent");
            if (this.children[0].className === "fa fa-angle-up") {
                this.children[0].className = "fa fa-angle-down"
                dlgbody.style.display = "none";
            } else if (this.children[0].className === "fa fa-angle-down") {
                this.children[0].className = "fa fa-angle-up"
                dlgbody.style.display = "block";
            }
        });
    });
    function GenerateDropDown() {
        var ddl = @Html.Raw(Json.Encode(Model));
        for (var i = 0; i < ddl.userDDL.length; i++) {
            var option = document.createElement("option")
            option.text = ddl.userDDL[i].text;
            option.value = ddl.userDDL[i].value;
            document.querySelector(app.domMap.AuditReport.ddlUser).appendChild(option)
        }
        for (var i = 0; i < ddl.objectDDL.length; i++) {
            var option = document.createElement("option")
            option.text = ddl.objectDDL[i].text;
            option.value = ddl.objectDDL[i].valuetxt;
            document.querySelector(app.domMap.AuditReport.ddlObject).appendChild(option)
       }
    }
</script>