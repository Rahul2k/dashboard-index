<div class="form-group row index">
    <div class="col-sm-12 col-lg-6">
        <select id="lstExtLabel" size="10" class="form-control"></select>
    </div>
</div>
<div class="form-group row index" id="divLabelButtons">
    <div class="col-sm-8">
        <input type="button" id="btnAddLabel" name="btnAddLabel" value="@Languages.Translation("btnAddBarCodePartialNewLbl")" class="btn btn-primary" />
        <input type="button" id="btnEditLabel" name="btnEditLabel" value="@Languages.Translation("btnAddBarCodePartialNewLblLoadLbl")" class="btn btn-primary" />
        <input type="button" id="btnRemoveLabel" name="btnRemoveLabel" value="@Languages.Translation("btnAddBarCodePartialNewLblDelete")" class="btn btn-primary" />
        <input type="button" id="btnClsoeWindow" name="btnClsoeWindow" value="@Languages.Translation("Close")" class="btn btn-primary" />
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <section class="content1" id="label" style="display:none">
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <button type="button" id="bBackLabel" class="btn btn-primary">
                            <span class="glyphicon glyphicon-arrow-left" style="padding-right:5px;" aria-hidden="true"></span>@Languages.Translation("tiIndexLabelManager")
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div style="border:1px solid #0094ff;height:944px; display:none;" class="navbar-default"></div>
                    <div class="well">
                        <div class="refereshPanel" id="refTopPanel1">
                            <label class="col-md-7 col-sm-12" id="newLabelName" style="font-size:20px">@Languages.Translation("LabelName") :</label>
                            <label class="col-md-5 col-sm-12" id="tableForLabel" style="font-size:20px">@Languages.Translation("TableName") :</label>
                        </div>
                        <div class="col-sm-12 refereshPanel" id="refTopPanel2">
                            <button type="button" id="bSaveLabel" class="btn btn-default navbar-btn" title="@Languages.Translation("tiAddBarCodePartialSaveCurLblFormat")">
                                <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
                            </button>
                            <button disabled="disabled" class="btn btn-default nextPre" id="first_page" title="@Languages.Translation("tiAddBarCodePartial1stRecord")" type="button">
                                <span class="glyphicon glyphicon-backward" aria-hidden="true"></span>
                            </button>
                            <button disabled="disabled" class="btn btn-default nextPre" id="previous_page" title="@Languages.Translation("tiAddBarCodePartialPrevRecord")" type="button">
                                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            </button>
                            <button class="btn btn-default nextPre" id="next_page" title="@Languages.Translation("tiAddBarCodePartialNextRecord")" type="button">
                                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            </button>
                            <button class="btn btn-default nextPre" id="last_page" title="@Languages.Translation("tiAddBarCodePartialLastRecord")" type="button">
                                <span class="glyphicon glyphicon-forward" aria-hidden="true"></span>
                            </button>
                            <button type="button" id="removeObject" class="btn btn-default" title="@Languages.Translation("tiAddBarCodePartialDelCurObj")">
                                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </button>
                            <button type="button" id="selectAllObj" class="btn btn-default" title="@Languages.Translation("cbSelectAll")">
                                <span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>
                            </button>
                            <button type="button" id="centerHor" class="btn btn-default" title="@Languages.Translation("tiAddBarCodePartialCntrHorizontal")">
                                <span class="glyphicon glyphicon-resize-vertical" aria-hidden="true"></span>
                            </button>
                            <button type="button" id="centerVer" class="btn btn-default" title="@Languages.Translation("tiAddBarCodePartialCntrVertical")">
                                <span class="glyphicon glyphicon-resize-horizontal" aria-hidden="true"></span>
                            </button>
                            <button type="button" id="bBarCode" class="btn btn-default" title="@Languages.Translation("tiAddBarCodePartialInsertNewBC")">
                                <span class="glyphicon glyphicon-barcode" aria-hidden="true"></span>
                            </button>
                            <button type="button" id="bQRCode" class="btn btn-default navbar-btn" title="@Languages.Translation("tiAddBarCodePartialInsertNewQRCode")">
                                <span class="glyphicon glyphicon-qrcode" aria-hidden="true"></span>
                            </button>
                            <button type="button" id="bAddText" class="btn btn-default navbar-btn" title="@Languages.Translation("tiAddBarCodePartialInsertNewTxtLblFormat")">
                                <span class="glyphicon glyphicon-text-size" aria-hidden="true"></span>
                            </button>
                            <button type="button" id="bFieldObj" class="btn btn-default navbar-btn" title="@Languages.Translation("tiAddBarCodePartialInsertDBField")">
                                <span class="glyphicon glyphicon-font" aria-hidden="true"></span>
                            </button>
                            <button type="button" id="editLabel" class="btn btn-default" title="@Languages.Translation("tiAddBarCodePartialLblSetup")">
                                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                            </button>

                            <label id="labelID" class="hidden"></label>
                            <label id="labelHeight" class="hidden"></label>
                            <label id="labelWidth" class="hidden"></label>
                            <label id="stroke" class="hidden">true</label>
                            <label id="barCodePrefix" style="display:none"></label>
                            <label id="origFormat" style="display:none"></label>
                            <label id="labelChanged" style="display:none">false</label>
                        </div><!-- /.container-fluid border: 1px solid #000;-->

                        <img id="tempimg" style="height:auto;width:auto;display:none" />
                        <div id="output" style="display:none"></div>
                        <div class="container-fluid" style="overflow:auto;">
                            <div id="abcd" style="width:145px;height:113px;background:#fff;top:30px;box-shadow: inset 0px 0px 10px #c7cdd2;left:30px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
<form id="frmAddBarCode">
    <div class="modal fade" id="mdlAddBarCode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-lblMng">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">@Languages.Translation("tiIndexEnterLabelInfo")</h4>
                </div>
                <!-- Select Basic -->
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="col-sm-12">
                                <label id="editBar" class="hidden">@Languages.Translation("lblAddBarCodePartialFalse")</label>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="fieldName">@Languages.Translation("lblAddBarCodePartialFieldName")</label>
                                    <div class="col-sm-8">
                                        <select id="fieldName" name="fieldName" class="form-control"></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="fieldFormat">@Languages.Translation("Format")</label>
                                    <div class="col-sm-8">
                                        <input id="fieldFormat" name="fieldFormat" type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="barStartCharPosition">@Languages.Translation("lblAddBarCodePartialStartCharPos")</label>
                                    <div class="col-sm-8">
                                        <input id="barStartCharPosition" name="barStartCharPosition" type="number" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="barMaxChars">@Languages.Translation("lblAddBarCodePartialMaxChar")</label>
                                    <div class="col-sm-8">
                                        <input id="barMaxChars" name="barMaxChars" type="number" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialColors")</legend>
                                    <div class="form-group">
                                        <label class="col-sm-7">@Languages.Translation("lblAddBarCodePartialText")</label>
                                        <div class="col-sm-5">
                                            <input id="barTextColor" style="display:none" value="#000000" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-7">@Languages.Translation("lblAddBarCodePartialBackground")</label>
                                        <div class="col-sm-5">
                                            <input id="barBgColor" style="display:none" value="#ffffff" />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialAlignment")</legend>
                                    <div class="radio-cus">
                                        <input type="radio" id="radiosbar0" name="alignmentBar" value="Left" checked="checked">
                                        <label class="radio-inline" for="radiosbar0">@Languages.Translation("lblAddBarCodePartialLeft")</label>
                                    </div>
                                    <div class="radio-cus">
                                        <input type="radio" name="alignmentBar" id="radiosbar1" value="Center">
                                        <label class="radio-inline" for="radiosbar1">@Languages.Translation("lblAddBarCodePartialCenter")</label>
                                    </div>
                                    <div class="radio-cus">
                                        <input type="radio" name="alignmentBar" id="radiosbar2" value="Right">
                                        <label class="radio-inline" for="radiosbar2">
                                            @Languages.Translation("lblAddBarCodePartialRight")
                                        </label>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialBoxInfo")</legend>
                                    <div class="form-group">
                                        <label class="col-sm-6 control-label" for="barBoxHeight">@Languages.Translation("lblAddBarCodePartialHeight")</label>
                                        <div class="col-sm-6">
                                            <input id="barBoxHeight" name="barBoxHeight" type="number" placeholder="" class="form-control input-sm" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-6 control-label" for="barBoxWidth">@Languages.Translation("lblAddBarCodePartialWidth")</label>
                                        <div class="col-sm-6">
                                            <input id="barBoxWidth" name="barBoxWidth" type="number" placeholder="" class="form-control input-sm" readonly>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialBarCode")</legend>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="barType">@Languages.Translation("lblAddBarCodePartialType")</label>
                                        <div class="col-sm-8">
                                            <select id="barType" name="barType" class="form-control">
                                                <option value="CODE128">CODE128</option>
                                                <option value="EAN">EAN</option>
                                                <option value="UPC">UPC</option>
                                                <option value="CODE39">CODE39</option>
                                                <option value="ITF14">ITF14</option>
                                                <option value="ITF">ITF</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="barUPC">@Languages.Translation("lblAddBarCodePartialUPCNotches")</label>
                                        <div class="col-sm-8">
                                            <select id="barUPC" name="barUPC" class="form-control">
                                                <option value="0">@Languages.Translation("None")</option>
                                                <option value="1">@Languages.Translation("optAddBarCodePartialAbove")</option>
                                                <option value="2">@Languages.Translation("optAddBarCodePartialBelow")</option>
                                                <option value="3">@Languages.Translation("optAddBarCodePartialBoth")</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="barDirec">@Languages.Translation("lbltAddBarCodePartialDirection")</label>
                                        <div class="col-sm-8">
                                            <select id="barDirec" name="barDirec" class="form-control">
                                                <option value="0">@Languages.Translation("optAddBarCodePartialL2R")</option>
                                                <option value="1">@Languages.Translation("optAddBarCodePartialR2L")</option>
                                                <option value="2">@Languages.Translation("optAddBarCodePartialT2B")</option>
                                                <option value="3">@Languages.Translation("optAddBarCodePartialB2T")</option>
                                                <option value="4">@Languages.Translation("optAddBarCodePartialL2RC")</option>
                                                <option value="5">@Languages.Translation("optAddBarCodePartialR2LC")</option>
                                                <option value="6">@Languages.Translation("optAddBarCodePartialT2BC")</option>
                                                <option value="7">@Languages.Translation("optAddBarCodePartialB2TC")</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="barWidth">@Languages.Translation("lblAddBarCodePartialWidth")</label>
                                        <div class="col-sm-8">
                                            <input id="barWidth" name="barWidth" type="number" placeholder="" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="barHeight">@Languages.Translation("lblAddBarCodePartialHeight")</label>
                                        <div class="col-sm-8">
                                            <input id="barHeight" name="barHeight" type="number" placeholder="" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="barBarWidth">@Languages.Translation("lblAddBarCodePartialBarWidth")</label>
                                        <div class="col-sm-8">
                                            <input id="barBarWidth" name="barBarWidth" type="number" maxlength="3" placeholder="" class="form-control">
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <hr style="border-top:1px solid #fff;margin-top:6px !important; margin-bottom:6px !important;"/>
                    <hr style="border-top:1px solid #fff;margin-top:6px !important; margin-bottom:6px !important;" />
                </div>
                <div class="modal-footer">
                    <button id="btnAddBarCodeLabel" onclick="fn_AddBarCodeLabel()" type="button" class="btn btn-primary">@Languages.Translation("Add")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                    <button id="btnResetBarCode" onclick="fn_ResetBarCode()" type="button" class="btn btn-primary">@Languages.Translation("Reset")</button>
                </div>
            </div>
        </div>
        <div id="mdlAddBarCodeClone" class="fixed-footer affixed"></div>
    </div>
</form>

<form id="frmMdlAddQR">
    <div class="modal fade" id="mdlAddQRCode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-lblMng">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">@Languages.Translation("tiIndexEnterLabelInfo")</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="col-sm-12">
                                <label id="editQR" class="hidden">@Languages.Translation("lblAddBarCodePartialFalse")</label>
                                <label id="firstQR" class="hidden">@Languages.Translation("lblAddBarCodePartialTrue")</label>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="fieldName">@Languages.Translation("lblAddBarCodePartialFieldName")</label>
                                    <div class="col-sm-8">
                                        <select id="fieldNameQR" name="fieldNameQR" class="form-control"></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="fieldFormat">@Languages.Translation("Format")</label>
                                    <div class="col-sm-8">
                                        <input id="fieldFormatQR" name="fieldFormatQR" type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="qrStartCharPosition">@Languages.Translation("lblAddBarCodePartialStartCharPos")</label>
                                    <div class="col-sm-8">
                                        <input id="qrStartCharPosition" name="qrStartCharPosition" type="number" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="qrMaxChars">@Languages.Translation("lblAddBarCodePartialMaxChar")</label>
                                    <div class="col-sm-8">
                                        <input id="qrMaxChars" name="qrMaxChars" type="number" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialColors")</legend>
                                    <div class="form-group">
                                        <label class="col-sm-7">@Languages.Translation("lblAddBarCodePartialText")</label>
                                        <div class="col-sm-5">
                                            <input id="qrTextColor" style="display:none" value="#000000" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-7">@Languages.Translation("lblAddBarCodePartialBackground")</label>
                                        <div class="col-sm-5">
                                            <input id="qrBgColor" style="display:none" value="#ffffff" />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialAlignment")</legend>
                                    <div class="radio-cus">
                                        <input type="radio" name="alignmentQR" id="radiosqr0" value="Left" checked="checked">
                                        <label class="radio-inline" for="radiosqr0">@Languages.Translation("lblAddBarCodePartialLeft")</label>
                                    </div>
                                    <div class="radio-cus">
                                        <input type="radio" name="alignmentQR" id="radiosqr1" value="Center">
                                        <label class="radio-inline" for="radiosqr1">@Languages.Translation("lblAddBarCodePartialCenter")</label>
                                    </div>
                                    <div class="radio-cus">
                                        <input type="radio" name="alignmentQR" id="radiosqr2" value="Right">
                                        <label class="radio-inline" for="radiosqr2">@Languages.Translation("lblAddBarCodePartialRight")</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialBoxInfo")</legend>
                                    <div class="form-group">
                                        <label class="col-sm-6 control-label" for="qrBoxHeight">@Languages.Translation("lblAddBarCodePartialHeight")</label>
                                        <div class="col-sm-6">
                                            <input id="qrBoxHeight" name="qrBoxHeight" type="number" placeholder="" class="form-control input-sm" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-6 control-label" for="qrBoxWidth">@Languages.Translation("lblAddBarCodePartialWidth")</label>
                                        <div class="col-sm-6">
                                            <input id="qrBoxWidth" name="qrBoxWidth" type="number" placeholder="" class="form-control input-sm" readonly>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialQRCode")</legend>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="eccType">@Languages.Translation("lblAddBarCodePartialECCType")</label>
                                        <div class="col-sm-8">
                                            <select id="eccType" name="eccType" class="form-control">
                                                <option value="L">L(7%)</option>
                                                <option value="M">M(15%)</option>
                                                <option value="Q">Q(25%)</option>
                                                <option value="H">H(30%)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="qrQuite">@Languages.Translation("lblAddBarCodePartialQuietZone")</label>
                                        <div class="col-sm-8">
                                            <select id="qrQuite" name="qrQuite" class="form-control">
                                                <option value="0">@Languages.Translation("None")</option>
                                                <option value="1">@Languages.Translation("optAddBarCodePartial1Line")</option>
                                                <option value="2">@Languages.Translation("optAddBarCodePartial2LIne")</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="qrOrie">@Languages.Translation("lblAddBarCodePartialOrientation")</label>
                                        <div class="col-sm-8">
                                            <select id="qrOrie" name="qrOrie" class="form-control">
                                                <option value="0">@Languages.Translation("optAddBarCodePartial_0_Dgr")</option>
                                                <option value="1">@Languages.Translation("optAddBarCodePartial_90_Dgr")</option>
                                                <option value="2">@Languages.Translation("optAddBarCodePartial_180_Dgr")</option>
                                                <option value="3">@Languages.Translation("optAddBarCodePartial_270_Dgr")</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="qrWidth">@Languages.Translation("lblAddBarCodePartialWidth") :</label>
                                        <div class="col-sm-8">
                                            <input id="qrWidth" name="qrWidth" type="number" placeholder="" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="qrHeight">@Languages.Translation("lblIndexHeight")</label>
                                        <div class="col-sm-8">
                                            <input id="qrHeight" name="qrHeight" type="number" placeholder="" class="form-control" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" for="qrBarWidth">@Languages.Translation("lblAddBarCodePartialBarWidth")</label>
                                        <div class="col-sm-8">
                                            <input id="qrBarWidth" name="qrBarWidth" type="number" placeholder="" class="form-control" readonly>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <hr style="border-top:1px solid #fff;margin-top:6px !important; margin-bottom:6px !important;" />
                </div>
                <div class="modal-footer">
                    <button id="btnAddQRCodeLabel" onclick="fn_AddQRCodeLabel()" type="button" class="btn btn-primary">@Languages.Translation("Add")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                    <button id="btnResetQRCode" onclick="fn_ResetQRCode()" type="button" class="btn btn-primary">@Languages.Translation("Reset")</button>
                </div>
            </div>
        </div>
        <div id="mdlAddQRCodeClone" class="fixed-footer affixed"></div>
    </div>
</form>

<form id="frmmdlAddFieldObj">
    <div class="modal fade" id="mdlAddFieldObj" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-lblMng">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">@Languages.Translation("tiIndexEnterLabelInfo")</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="col-sm-12">
                                <label id="editField" class="hidden">@Languages.Translation("lblAddBarCodePartialFalse")</label>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="fieldName">@Languages.Translation("lblAddBarCodePartialFieldName")</label>
                                    <div class="col-sm-8">
                                        <select id="fieldNameObj" name="fieldNameObj" class="form-control"></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="formatField">@Languages.Translation("Format")</label>
                                    <div class="col-sm-8">
                                        <input id="formatField" name="formatField" type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="startCharPosition">@Languages.Translation("lblAddBarCodePartialStartCharPos")</label>
                                    <div class="col-sm-8">
                                        <input id="startCharPosition" name="startCharPosition" type="number" placeholder="" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="maxChars">@Languages.Translation("lblAddBarCodePartialMaxChar")</label>
                                    <div class="col-sm-8">
                                        <input id="maxChars" name="maxChars" type="number" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialColors")</legend>
                                    <div class="form-group">
                                        <label class="col-sm-7">@Languages.Translation("lblAddBarCodePartialText")</label>
                                        <div class="col-sm-5">
                                            <input id="fieldTextColor" style="display:none" value="#000000" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-7">@Languages.Translation("lblAddBarCodePartialBackground")</label>
                                        <div class="col-sm-5">
                                            <input id="fieldBgColor" style="display:none" value="#ffffff" />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialAlignment") </legend>
                                    <div class="radio-cus">
                                        <input type="radio" name="alignmentField" id="radiosf0" value="Left" checked="checked">
                                        <label class="radio-inline" for="radiosf0">@Languages.Translation("lblAddBarCodePartialLeft")</label>
                                    </div>
                                    <div class="radio-cus">
                                        <input type="radio" name="alignmentField" id="radiosf1" value="Center">
                                        <label class="radio-inline" for="radiosf1">@Languages.Translation("lblAddBarCodePartialCenter")</label>
                                    </div>
                                    <div class="radio-cus">
                                        <input type="radio" name="alignmentField" id="radiosf2" value="Right">
                                        <label class="radio-inline" for="radiosf2">@Languages.Translation("lblAddBarCodePartialRight")</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialBoxInfo")</legend>
                                    <div class="form-group">
                                        <label class="col-sm-6 control-label" for="boxHeight">@Languages.Translation("lblAddBarCodePartialHeight")</label>
                                        <div class="col-sm-6">
                                            <input id="boxHeight" name="boxHeight" type="number" placeholder="" class="form-control input-sm">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-6 control-label" for="boxWidth">@Languages.Translation("lblAddBarCodePartialWidth")</label>
                                        <div class="col-sm-6">
                                            <input id="boxWidth" name="boxWidth" type="number" placeholder="" class="form-control input-sm">
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("Font")</legend>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label" for="fontName">@Languages.Translation("Name")</label>
                                            <div class="col-sm-8">
                                                <select id="fontName" name="fontName" class="form-control"></select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label" for="fontSize">@Languages.Translation("lblAddBarCodePartialSize")</label>
                                            <div class="col-sm-8">
                                                <input id="fontSize" name="fontSize" type="number" placeholder="" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label" for="fontOri">@Languages.Translation("lblAddBarCodePartialOrientation")</label>
                                            <div class="col-sm-8">
                                                <select id="fontOri" name="fontOri" class="form-control">
                                                    <option value="0">@Languages.Translation("optAddBarCodePartial_0_Dgr")</option>
                                                    <option value="30">@Languages.Translation("optAddBarCodePartial_30_Dgr")</option>
                                                    <option value="45">@Languages.Translation("optAddBarCodePartial_45_Dgr")</option>
                                                    <option value="60">@Languages.Translation("optAddBarCodePartial_60_Dgr")</option>
                                                    <option value="90">@Languages.Translation("optAddBarCodePartial_90_Dgr")</option>
                                                    <option value="120">@Languages.Translation("optAddBarCodePartial_120_Dgr")</option>
                                                    <option value="135">@Languages.Translation("optAddBarCodePartial_135_Dgr")</option>
                                                    <option value="150">@Languages.Translation("optAddBarCodePartial_150_Dgr")</option>
                                                    <option value="180">@Languages.Translation("optAddBarCodePartial_180_Dgr")</option>
                                                    <option value="210">@Languages.Translation("optAddBarCodePartial_210_Dgr")</option>
                                                    <option value="225">@Languages.Translation("optAddBarCodePartial_225_Dgr")</option>
                                                    <option value="240">@Languages.Translation("optAddBarCodePartial_240_Dgr")</option>
                                                    <option value="270">@Languages.Translation("optAddBarCodePartial_270_Dgr")</option>
                                                    <option value="300">@Languages.Translation("optAddBarCodePartial_300_Dgr")</option>
                                                    <option value="315">@Languages.Translation("optAddBarCodePartial_315_Dgr")</option>
                                                    <option value="330">@Languages.Translation("optAddBarCodePartial_330_Dgr")</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <fieldset class="admin_fieldset">
                                            <legend>@Languages.Translation("tiAddBarCodePartialAttributes")</legend>
                                            <div class="checkbox-cus">
                                                <input type="checkbox" name="checkboxes" id="bold" value="Bold">
                                                <label class="checkbox-inline" for="bold">
                                                    <b>@Languages.Translation("lblAddBarCodePartialBold")</b>
                                                </label>
                                            </div>
                                            <div class="checkbox-cus">
                                                <input type="checkbox" name="checkboxes" id="underline" value="Underline">
                                                <label class="checkbox-inline" for="underline">
                                                    <ins>@Languages.Translation("lblAddBarCodePartialUnderline")</ins>
                                                </label>
                                            </div>
                                            <div class="checkbox-cus">
                                                <input type="checkbox" name="checkboxes" id="transparent" value="Transparent">
                                                <label class="checkbox-inline" for="transparent">
                                                    @Languages.Translation("lblAddBarCodePartialTransparent")
                                                </label>
                                            </div>
                                            <div class="checkbox-cus">
                                                <input type="checkbox" name="checkboxes" id="italic" value="Italic">
                                                <label class="checkbox-inline" for="italic">
                                                    <i>@Languages.Translation("lblAddBarCodePartialItalic")</i>
                                                </label>
                                            </div>
                                            <div class="checkbox-cus">
                                                <input type="checkbox" name="checkboxes" id="strikethru" value="StrikeThru">
                                                <label class="checkbox-inline" for="strikethru">
                                                    <del>@Languages.Translation("lblAddBarCodePartialStrikeThru")</del>
                                                </label>
                                            </div>
                                        </fieldset>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnAddFieldObjLabel" onclick="fn_AddFieldObjLabel()" type="button" class="btn btn-primary">@Languages.Translation("Add")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                    <button id="btnResetField" onclick="fn_ResetFieldObjLabel()" type="button" class="btn btn-primary">@Languages.Translation("Reset")</button>
                </div>
            </div>
        </div>
        <div id="mdlAddFieldObjClone" class="fixed-footer affixed"></div>
    </div>
</form>

<form id="frmmdlAddText">
    <div class="modal fade" id="mdlAddText" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-lblMng">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">@Languages.Translation("tiIndexEnterLabelInfo")</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="col-sm-12">
                                <label id="editText" class="hidden">@Languages.Translation("lblAddBarCodePartialFalse")</label>
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" for="staticText">@Languages.Translation("lblAddBarCodePartialStaticText")</label>
                                    <div class="col-sm-8">
                                        <input id="staticText" name="staticText" type="text" placeholder="" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialColors")</legend>
                                    <div class="form-group">
                                        <label class="col-sm-7">@Languages.Translation("lblAddBarCodePartialText")</label>
                                        <div class="col-sm-5">
                                            <div class="demoPanel">
                                                <input id="txtTextColor" style="display:none" value="#000000" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-7">@Languages.Translation("lblAddBarCodePartialBackground")</label>
                                        <div class="col-sm-5">
                                            <input id="txtBgColor" style="display:none" value="#ffffff" />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialAlignment")</legend>
                                    <div class="radio-cus">
                                        <input type="radio" name="alignmentText" id="radiost0" value="Left" checked="checked">
                                        <label class="radio-inline" for="radiost0">@Languages.Translation("lblAddBarCodePartialLeft")</label>
                                    </div>
                                    <div class="radio-cus">
                                        <input type="radio" name="alignmentText" id="radiost1" value="Center">
                                        <label class="radio-inline" for="radiost1">@Languages.Translation("lblAddBarCodePartialCenter")</label>
                                    </div>
                                    <div class="radio-cus">
                                        <input type="radio" name="alignmentText" id="radiost2" value="Right">
                                        <label class="radio-inline" for="radiost2">@Languages.Translation("lblAddBarCodePartialRight")</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-sm-4">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("tiAddBarCodePartialBoxInfo")</legend>
                                    <div class="form-group">
                                        <label class="col-sm-6 control-label" for="boxHeightText">@Languages.Translation("lblAddBarCodePartialHeight")</label>
                                        <div class="col-sm-6">
                                            <input id="boxHeightText" name="boxHeightText" type="number" placeholder="" class="form-control input-sm">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-6 control-label" for="boxWidthText">@Languages.Translation("lblAddBarCodePartialWidth")</label>
                                        <div class="col-sm-6">
                                            <input id="boxWidthText" name="boxWidthText" type="number" placeholder="" class="form-control input-sm">
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset class="admin_fieldset">
                                    <legend>@Languages.Translation("Font")</legend>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label" for="fontNameText">@Languages.Translation("Name")</label>
                                            <div class="col-sm-8">
                                                <select id="fontNameText" name="fontNameText" class="form-control"></select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label" for="fontOriText">@Languages.Translation("lblAddBarCodePartialOrientation")</label>
                                            <div class="col-sm-8">
                                                <select id="fontOriText" name="fontOriText" class="form-control">
                                                    <option value="0">@Languages.Translation("optAddBarCodePartial_0_Dgr")</option>
                                                    <option value="30">@Languages.Translation("optAddBarCodePartial_30_Dgr")</option>
                                                    <option value="45">@Languages.Translation("optAddBarCodePartial_45_Dgr")</option>
                                                    <option value="60">@Languages.Translation("optAddBarCodePartial_60_Dgr")</option>
                                                    <option value="90">@Languages.Translation("optAddBarCodePartial_90_Dgr")</option>
                                                    <option value="120">@Languages.Translation("optAddBarCodePartial_120_Dgr")</option>
                                                    <option value="135">@Languages.Translation("optAddBarCodePartial_135_Dgr")</option>
                                                    <option value="150">@Languages.Translation("optAddBarCodePartial_150_Dgr")</option>
                                                    <option value="180">@Languages.Translation("optAddBarCodePartial_180_Dgr")</option>
                                                    <option value="210">@Languages.Translation("optAddBarCodePartial_210_Dgr")</option>
                                                    <option value="225">@Languages.Translation("optAddBarCodePartial_225_Dgr")</option>
                                                    <option value="240">@Languages.Translation("optAddBarCodePartial_240_Dgr")</option>
                                                    <option value="270">@Languages.Translation("optAddBarCodePartial_270_Dgr")</option>
                                                    <option value="300">@Languages.Translation("optAddBarCodePartial_300_Dgr")</option>
                                                    <option value="315">@Languages.Translation("optAddBarCodePartial_315_Dgr")</option>
                                                    <option value="330">@Languages.Translation("optAddBarCodePartial_330_Dgr")</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label" for="fontSizeText">@Languages.Translation("lblAddBarCodePartialSize")</label>
                                            <div class="col-sm-8">
                                                <input id="fontSizeText" name="fontSizeText" type="number" placeholder="" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <fieldset class="admin_fieldset">
                                            <legend>@Languages.Translation("tiAddBarCodePartialAttributes")</legend>
                                            <div class="checkbox-cus">
                                                <input type="checkbox" name="checkboxes" id="boldtext" value="Bold">
                                                <label class="checkbox-inline" for="boldtext"><b>@Languages.Translation("lblAddBarCodePartialBold")</b></label>
                                            </div>
                                            <div class="checkbox-cus">
                                                <input type="checkbox" name="checkboxes" id="underlinetext" value="Underline">
                                                <label class="checkbox-inline" for="underlinetext"><ins>@Languages.Translation("lblAddBarCodePartialUnderline")</ins></label>
                                            </div>
                                            <div class="checkbox-cus">
                                                <input type="checkbox" name="checkboxes" id="transparenttext" value="Transparent">
                                                <label class="checkbox-inline" for="transparenttext">@Languages.Translation("lblAddBarCodePartialTransparent")</label>
                                            </div>
                                            <div class="checkbox-cus">
                                                <input type="checkbox" name="checkboxes" id="italictext" value="Italic">
                                                <label class="checkbox-inline" for="italictext"><i>@Languages.Translation("lblAddBarCodePartialItalic")</i></label>
                                            </div>
                                            <div class="checkbox-cus">
                                                <input type="checkbox" name="checkboxes" id="strikethrutext" value="StrikeThru">
                                                <label class="checkbox-inline" for="strikethrutext"><del>@Languages.Translation("lblAddBarCodePartialStrikeThru")</del></label>
                                            </div>
                                        </fieldset>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnAddTextObjLabel" onclick="fn_AddTextObjLabel()" type="button" class="btn btn-primary">@Languages.Translation("Add")</button>
                    <button id="btnCancel" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                    <button id="btnResetText" onclick="fn_AddTextReset()" type="button" class="btn btn-primary">@Languages.Translation("Reset")</button>
                </div>
            </div>
        </div>
        <div id="mdlAddTextClone" class="fixed-footer affixed"></div>
    </div>
</form>