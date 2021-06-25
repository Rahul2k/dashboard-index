@Imports TabFusionRMS.Models
@ModelType ReportStyle
<style>
    #LoadUserControl {
        overflow: unset !important;
    }
    .sticker.stick {
       right:32px;
    }
    .sticker {
        right:0px;
        margin-bottom:15px;
    }
    .dropdown {
        position: relative;
    }
    .dropdown select {
        width: 100%;
    }
    .dropdown > * {
        box-sizing: border-box;
        height: 36px;
    }
    .dropdown select {}
    .dropdown input {
        position: absolute;
        width: calc(100% - 20px);
    }
    input[type='number'] {
        -moz-appearance: textfield;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
</style>

@Using Html.BeginForm("SetReportStyle", "Admin", FormMethod.Post, New With {.id = "frmReportStyles", .class = "form-horizontal", .ReturnUrl = ViewData("ReturnUrl")})

    @<div id="parent">

        <div class="row">
            <div class="col-lg-6">
                <div class="form-group">
                    @Html.HiddenFor(Function(m) m.ReportStylesId)
                    <label class="col-md-4 control-label" for="Id">@Languages.Translation("lblAddReportStylePartialRptStyleName")</label>
                    <div class="col-lg-8 col-md-7">
                        @Html.TextBoxFor(Function(m) m.Id, New With {.class = "form-control", .MaxLength = "20"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="Description">@Languages.Translation("lblAddReportStylePartialDescr")</label>
                    <div class="col-lg-8 col-md-7">
                        @Html.TextBoxFor(Function(m) m.Description, New With {.class = "form-control", .MaxLength = "30"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="Heading1Left">@Languages.Translation("lblAddReportStylePartialLftHeadingLn1") </label>
                    <div class="col-lg-8 col-md-7">
                        @Html.TextBoxFor(Function(m) m.Heading1Left, New With {.class = "form-control", .MaxLength = "50"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="Heading1Center">@Languages.Translation("lblAddReportStylePartialCntHeadingLn1")</label>
                    <div class="col-lg-8 col-md-7">
                        @Html.TextBoxFor(Function(m) m.Heading1Center, New With {.class = "form-control", .MaxLength = "50"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="Heading1Right">@Languages.Translation("lblAddReportStylePartialRgtHeadingLn1")</label>
                    <div class="col-lg-8 col-md-7">
                        @Html.TextBoxFor(Function(m) m.Heading1Right, New With {.class = "form-control", .MaxLength = "50"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="Heading2Center">@Languages.Translation("lblAddReportStylePartialCntHeadingLn2")</label>
                    <div class="col-lg-8 col-md-7">
                        @Html.TextBoxFor(Function(m) m.Heading2Center, New With {.class = "form-control", .MaxLength = "50"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="FooterLeft">@Languages.Translation("lblAddReportStylePartialLftFooterLn")</label>
                    <div class="col-lg-8 col-md-7">
                        @Html.TextBoxFor(Function(m) m.FooterLeft, New With {.class = "form-control", .MaxLength = "50"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="FooterCenter">@Languages.Translation("lblAddReportStylePartialCntFooterLn")</label>
                    <div class="col-lg-8 col-md-7">
                        @Html.TextBoxFor(Function(m) m.FooterCenter, New With {.class = "form-control", .MaxLength = "50"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="FooterRight">@Languages.Translation("lblAddReportStylePartialRgtFooterLn")</label>
                    <div class="col-lg-8 col-md-7">
                        @Html.TextBoxFor(Function(m) m.FooterRight, New With {.class = "form-control", .MaxLength = "50"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="Orientation">@Languages.Translation("lblAddReportStylePartialOrien")</label>
                    <div class="col-lg-8 col-md-7">
                        <select id="Orientation" name="Orientation" class="form-control">
                            <option value="0">@Languages.Translation("optAddReportStylePartialPrinterDefault")</option>
                            <option value="1">@Languages.Translation("optAddReportStylePartialPortrait")</option>
                            <option value="2">@Languages.Translation("optAddReportStylePartialLandscape")</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="HeaderSize">@Languages.Translation("lblAddReportStylePartialHeaderBoxHgt"):</label>
                    <div class="col-lg-8 col-md-7">
                        @Html.TextBoxFor(Function(m) m.HeaderSize, New With {.class = "form-control", .MaxLength = "5"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="BoxWidth">@Languages.Translation("lblAddReportStylePartialLnThickness"):</label>
                    <div class="col-md-2">
                        @Html.TextBoxFor(Function(m) m.BoxWidth, New With {.class = "form-control", .MaxLength = "5"})
                    </div>
                    <label class="col-lg-4 col-md-3 control-label" for="ShadowSize">@Languages.Translation("lblAddReportStylePartialShadowThickness"):</label>
                    <div class="col-md-2">
                        @Html.TextBoxFor(Function(m) m.ShadowSize, New With {.class = "form-control", .MaxLength = "5"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="MaxLines">@Languages.Translation("lblAddReportStylePartialMaxRowLns"):</label>
                    <div class="col-md-2">
                        @Html.TextBoxFor(Function(m) m.MaxLines, New With {.class = "form-control", .MaxLength = "5"})
                    </div>
                    <label class="col-lg-4 col-md-3 control-label" for="MinColumnWidth">@Languages.Translation("lblAddReportStylePartialMinColWidth"):</label>
                    <div class="col-md-2">
                        @Html.TextBoxFor(Function(m) m.MinColumnWidth, New With {.class = "form-control", .MaxLength = "5"})
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="BlankLineSpacing">@Languages.Translation("lblAddReportStylePartialBlankLnSpacing"):</label>
                    <div class="col-md-2">
                        @Html.TextBoxFor(Function(m) m.BlankLineSpacing, New With {.class = "form-control", .MaxLength = "5"})
                    </div>
                    <label class="col-lg-4 col-md-3 control-label" for="ColumnSpacing">@Languages.Translation("lblAddReportStylePartialColSpacing"):</label>
                    <div class="col-md-2">
                        @Html.TextBoxFor(Function(m) m.ColumnSpacing, New With {.class = "form-control", .MaxLength = "5"})
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-4"></div>
                    <div class="col-lg-8 col-md-7">
                        <div class="checkbox-cus">
                            @*@Html.CheckBoxFor(Function(m) m.FixedLines)*@
                            <input id="FixedLines" name="FixedLines" value="false" type="checkbox" />
                            <label class="checkbox-inline" for="FixedLines">@Languages.Translation("lblAddReportStylePartialFixedHgtRows")</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-4"></div>
                    <div class="col-lg-8 col-md-7">
                        <div class="checkbox-cus">
                            @*@Html.CheckBoxFor(Function(m) m.AltRowShading)*@
                            <input id="AltRowShading" name="AltRowShading" value="false" type="checkbox" />
                            <label class="checkbox-inline" for="AltRowShading">@Languages.Translation("lblAddReportStylePartialAltRowShading")</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-4"></div>
                    <div class="col-lg-8 col-md-7">
                        <div class="checkbox-cus">
                            @*@Html.CheckBoxFor(Function(m) m.ReportCentered)*@
                            <input id="ReportCentered" name="ReportCentered" value="false" type="checkbox" />
                            <label class="checkbox-inline" for="ReportCentered">@Languages.Translation("lblAddReportStylePartialRptCentered")</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("tlAddReportStylePartialFonts")</legend>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="Heading1Left">@Languages.Translation("lblAddReportStylePartialItem")</label>
                            <div class="col-lg-8 col-md-7">
                                <select id="FontItem" name="FontItem" class="form-control" previous="1">
                                    <option id="item1" value="1">@Languages.Translation("optAddReportStylePartialHeadingLn1")</option>
                                    <option id="item2" value="2">@Languages.Translation("optAddReportStylePartialHeadingLn2")</option>
                                    <option id="item3" value="3">@Languages.Translation("optAddReportStylePartialSubHeading")</option>
                                    <option id="item4" value="4">@Languages.Translation("optAddReportStylePartialColHeading")</option>
                                    <option id="item5" value="5">@Languages.Translation("optAddReportStylePartialCol")</option>
                                    <option id="item6" value="6">@Languages.Translation("optAddReportStylePartialFtrLn")</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="HeadingL1FontName">@Languages.Translation("lblAddReportStylePartialFontName")</label>
                            <div class="col-lg-8 col-md-7">
                                <input type="text" class=form-control name="FontName" id="FontName" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" for="HeadingL1FontSize">@Languages.Translation("lblAddReportStylePartialFontSize")</label>
                            <div class="col-lg-8 col-md-7">
                                <input type="text" class=form-control name="FontSize" id="FontSize" maxlength="2">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-4"></div>
                            <div class="col-sm-2">
                                <div class="checkbox-cus">
                                    <input type="checkbox" name="FontBold" id="FontBold" />
                                    <label class="checkbox-inline" for="FontBold">@Languages.Translation("chkAddReportStylePartialB")</label>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="checkbox-cus">
                                    <input type="checkbox" name="FontItalic" id="FontItalic" />
                                    <label class="checkbox-inline" for="FontItalic">@Languages.Translation("chkAddReportStylePartialI")</label>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="checkbox-cus">
                                    <input type="checkbox" name="FontUnderlined" id="FontUnderlined" />
                                    <label class="checkbox-inline" for="FontUnderlined">@Languages.Translation("chkAddReportStylePartialU")</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-4"></div>
                            <div class="col-md-7">
                                <input type="button" value="@Languages.Translation("btnAddReportStylePartialChoose")" class="btn btn-primary" id="btnChoose">
                            </div>
                        </div>
                        @Html.HiddenFor(Function(m) m.HeadingL1FontBold)
                        @Html.HiddenFor(Function(m) m.HeadingL1FontItalic)
                        @Html.HiddenFor(Function(m) m.HeadingL1FontUnderlined)
                        @Html.HiddenFor(Function(m) m.HeadingL1FontName)
                        @Html.HiddenFor(Function(m) m.HeadingL1FontSize)
                        @Html.HiddenFor(Function(m) m.HeadingL2FontBold)
                        @Html.HiddenFor(Function(m) m.HeadingL2FontItalic)
                        @Html.HiddenFor(Function(m) m.HeadingL2FontUnderlined)
                        @Html.HiddenFor(Function(m) m.HeadingL2FontName)
                        @Html.HiddenFor(Function(m) m.HeadingL2FontSize)
                        @Html.HiddenFor(Function(m) m.SubHeadingFontBold)
                        @Html.HiddenFor(Function(m) m.SubHeadingFontItalic)
                        @Html.HiddenFor(Function(m) m.SubHeadingFontUnderlined)
                        @Html.HiddenFor(Function(m) m.SubHeadingFontName)
                        @Html.HiddenFor(Function(m) m.SubHeadingFontSize)
                        @Html.HiddenFor(Function(m) m.ColumnHeadingFontBold)
                        @Html.HiddenFor(Function(m) m.ColumnFontItalic)
                        @Html.HiddenFor(Function(m) m.ColumnHeadingFontUnderlined)
                        @Html.HiddenFor(Function(m) m.ColumnHeadingFontName)
                        @Html.HiddenFor(Function(m) m.ColumnHeadingFontSize)
                        @Html.HiddenFor(Function(m) m.ColumnFontBold)
                        @Html.HiddenFor(Function(m) m.ColumnFontItalic)
                        @Html.HiddenFor(Function(m) m.ColumnFontUnderlined)
                        @Html.HiddenFor(Function(m) m.ColumnFontName)
                        @Html.HiddenFor(Function(m) m.ColumnFontSize)
                        @Html.HiddenFor(Function(m) m.FooterFontBold)
                        @Html.HiddenFor(Function(m) m.FooterFontItalic)
                        @Html.HiddenFor(Function(m) m.FooterFontUnderlined)
                        @Html.HiddenFor(Function(m) m.FooterFontName)
                        @Html.HiddenFor(Function(m) m.FooterFontSize)
                    </div>
                </fieldset>
                <fieldset class="admin_fieldset">
                    <legend>@Languages.Translation("tlAddReportStylePartialColors") </legend>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="col-sm-4 text-right" for="TextForeColor">@Languages.Translation("lblAddReportStylePartialText"):</label>
                            <div class="col-sm-2">
                                <input style="display:none" value="#000000" name="TextForeColor" id="TextForeColor">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-4 text-right" for="ShadeBoxColor">@Languages.Translation("lblAddReportStylePartialHeaderBoxFill"):</label>
                            <div class="col-sm-2">
                                <input style="display:none" value="#000000" name="ShadeBoxColor" id="ShadeBoxColor">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-4 text-right" for="LineColor">@Languages.Translation("lblAddReportStylePartialLn"):</label>
                            <div class="col-sm-2">
                                <input style="display:none" value="#000000" name="LineColor" id="LineColor">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-4 text-right" for="ShadowColor">@Languages.Translation("lblAddReportStylePartialHeaderShadow"):</label>
                            <div class="col-sm-2">
                                <input style="display:none" value="#000000" name="ShadowColor" id="ShadowColor">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-4 text-right" for="ShadedLineColor">@Languages.Translation("lblAddReportStylePartialRowShading"):</label>
                            <div class="col-sm-2">
                                <input style="display:none" value="#000000" name="ShadedLineColor" id="ShadedLineColor">
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset Class="admin_fieldset">
                    <legend>@Languages.Translation("tlAddReportStylePartialMargins")</legend>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <Label class="col-lg-3 col-md-2 col-sm-3 control-label" for="LeftMargin">@Languages.Translation("lblAddReportStylePartialLeft"):</Label>
                            <div class="col-sm-3">
                                @Html.TextBoxFor(Function(m) m.LeftMargin, New With {.class = "form-control", .MaxLength = "4"})
                            </div>
                            <Label class="col-sm-3 control-label" for="TopMargin">@Languages.Translation("lblAddReportStylePartialTop"):</Label>
                            <div class="col-sm-3">
                                @Html.TextBoxFor(Function(m) m.TopMargin, New With {.class = "form-control", .MaxLength = "4"})
                            </div>
                        </div>
                        <div class="form-group">
                            <Label Class="col-lg-3 col-md-2 col-sm-3 control-label" for="RightMargin">@Languages.Translation("lblAddReportStylePartialRight"):</Label>
                            <div class="col-sm-3">
                                @Html.TextBoxFor(Function(m) m.RightMargin, New With {.class = "form-control", .MaxLength = "4"})
                            </div>
                            <Label Class="col-sm-3 control-label" for="BottomMargin">@Languages.Translation("lblAddReportStylePartialBottom"):</Label>
                            <div class="col-sm-3">
                                @Html.TextBoxFor(Function(m) m.BottomMargin, New With {.class = "form-control", .MaxLength = "4"})
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>

            @*<div class="clearfix"></div>*@

        </div>
        <div class="row">
            <div class="col-sm-12">
                <div Class="sticker stick">
                    <input type="button" id="btnApplyStyle" value="@Languages.Translation("Apply")" class="btn btn-primary pull-right" />
                </div>
            </div>
        </div>
    </div>

End Using
@Using Html.BeginForm("SetPropertyDetails", "Admin", FormMethod.Post, New With {.id = "frmImportProperty", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})
    @<div class="modal fade" id="mdlFont" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel"><label id="myModelId">@Languages.Translation("tlAddReportStylePartialFont")</label></h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label id="lblFont" name="lblFont" for="ddlFont" class="col-sm-3 control-label">@Languages.Translation("tlAddReportStylePartialFont"):</label>
                        <div class="col-sm-9">
                            <select id="ddlFont" name="ddlFont" class="form-control" onchange="getFontFamily(this);">
                                @*<option value=" 0">
                                        Select Font
                                    </option>*@
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label id="lblFontStyle" name="lblFontStyle" for="ddlFontStyle" class="col-sm-3 control-label">@Languages.Translation("lblAddReportStylePartialFontStyle")</label>
                        <div class="col-sm-2">
                            <div class="checkbox-cus">
                                <input type="checkbox" name="pFontBold" id="pFontBold" />
                                <label class="checkbox-inline" for="pFontBold">@Languages.Translation("chkAddReportStylePartialB")</label>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="checkbox-cus">
                                <input type="checkbox" name="pFontItalic" id="pFontItalic" />
                                <label class="checkbox-inline" for="pFontItalic">@Languages.Translation("chkAddReportStylePartialI")</label>
                            </div>
                        </div>
                        <div class="copl-sm-2">
                            <div class="checkbox-cus">
                                <input type="checkbox" name="pFontUnderlined" id="pFontUnderlined" />
                                <label class="checkbox-inline" for="pFontUnderlined">@Languages.Translation("chkAddReportStylePartialU")</label>
                            </div>
                        </div>
                        @*<select id="ddlFontStyle" name="ddlFontStyle" class="form-control">
                            </select>*@
                    </div>
                    <div class="row top_space">
                        <label id="lblFontSize" name="lblFontSize" for="ddlFontSize" class="col-sm-3 control-label">@Languages.Translation("lblAddReportStylePartialSize")</label>
                        <div class="col-sm-9">
                            <div class="dropdown">
                                <input type="text" id="textFontSize" onchange="getFontSizeFromText(this);" maxlength="2" />
                                <select id="ddlSize" name="ddlSize" onchange="this.previousElementSibling.value = this.value; this.previousElementSibling.focus(); getFontSize(this);">
                                    @*<option>This is option 1</option>
                                        <option>Option 2</option>*@
                                </select>
                            </div>
                            @*<select id="ddlSize" name="ddlSize" class="form-control" onchange="getFontSize(this);">
                                </select>*@
                        </div>
                    </div>
                    <div class="form-group">
                        <label id="lblSample" name="lblSample" class="col-sm-3 control-label">@Languages.Translation("lblAddReportStylePartialSample"):</label>
                        <div class="col-sm-9 top_space">
                            <label id="lblSampleDemo" name="lblSampleDemo">@Languages.Translation("lblAddReportStylePartialAaBbYyZz")</label>
                        </div>
                    </div>
                </div>
                @*<div class="row">
                            <div class="col-sm-12 col-md-12">
                                <label id="lblSample" name="lblSample" class="control-label">This is an OpenType font.This same font will be used on both your printer and your screen.</label>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-sm-2 col-md-2">
                                <label id="lblScript" name="lblScript" for="ddlScript" class="control-label">Script :</label>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <select id="ddlScript" name="ddlScript" class="form-control">
                                    <option value="0">Select Script</option>
                                </select>
                            </div>
                            <div class="col-sm-2 col-md-2">
                                <label id="lblShowMoreFont" name="lblShowMoreFont" for="ddlShowMoreFont" class="control-label">Show more fonts :</label>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <select id="ddlShowMoreFont" name="ddlShowMoreFont" class="form-control">
                                    <option value="0">Select Font</option>
                                </select>
                        </div>

                    </div>*@
                <div class="modal-footer">
                    <button id="btnOkProperty" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Ok")</button>
                    <button id="btnCancelProperty" type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    '<!-- /.modal-dialog -->
End Using
<script src="@Url.Content("~/content/themes/tab/js/evol.colorpicker.min.js")"></script>
<link href="~/content/themes/tab/css/evol.colorpicker.css" rel="stylesheet" type="text/css">
<script type="text/javascript">
    $('#FontSize').keypress(function (event) {

        if ((event.which != 8 && isNaN(String.fromCharCode(event.which))) || (event.which == 32)) {
            event.preventDefault();
        }
    });

    //$('textarea').keypress(function (event) {
    //    if (event.keyCode == 13) {
    //        event.preventDefault();
    //    }
    //});
    //var inputFontSize = document.getElementById('FontSize');

    //inputFontSize.addEventListener('change', function (e) {
    //    var num = parseInt(this.value, 10),
    //        min = 5,
    //        max = 48;

    //    if (isNaN(num)) {

    //        this.value = 5;
    //        return;
    //    }

    //    this.value = Math.max(num, min);
    //    this.value = Math.min(num, max);
    //    if (num < 5) {
    //        this.value = 5
    //    }

    //});

    $('#textFontSize').keypress(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
        if ((event.which != 8 && isNaN(String.fromCharCode(event.which))) || (event.which == 32)) {
            event.preventDefault();
        }
    });

    //var inputTextFontSize = document.getElementById('textFontSize');

    //inputTextFontSize.addEventListener('change', function (e) {

    //    var num = parseInt(this.value, 10),
    //        min = 5,
    //        max = 48;

    //    if (isNaN(num)) {

    //        this.value = 5;
    //        return;
    //    }

    //    this.value = Math.max(num, min);
    //    this.value = Math.min(num, max);
    //    if (num < 5) {
    //        this.value = 5
    //    }

    //});


    $('#btnOkProperty').click(function () {

        var fontFamily = $('select#ddlFont option:selected').val()

        var fontSize = $('select#ddlSize option:selected').val();

        var fontSizeText = $('#textFontSize').val();


        var fontBold = $('#pFontBold').is(':checked')
        var fontItalic = $('#pFontItalic').is(':checked')
        var fontUnderline = $('#pFontUnderlined').is(':checked')

        $('#FontName').val(fontFamily)
        //Modified by Hemin for Bug Fix
        //if (fontSizeText <= 72) {

        //    $('#FontSize').val(fontSizeText)
        //}
        if (fontSizeText <= 72 && fontSizeText >= 8) {

            $('#FontSize').val(fontSizeText)
        }
        else {
            showAjaxReturnMessage(vrReportsRes['msgAddReportStylePartialTheFontSizeMustbebetween8n72'], "w");
        }


        if (fontBold != true && fontItalic != true && fontUnderline != true) {

            $('#FontBold').attr('checked', false);
            $('#FontItalic').attr('checked', false);
            $('#FontUnderlined').attr('checked', false);
        }
        if (fontBold) {
            $('#FontBold').attr('checked', true);
        }
        if (fontItalic) {
            $('#FontItalic').attr('checked', true);
        }
        if (fontUnderline) {
            $('#FontUnderlined').attr('checked', true);
        }

    });

    $("#pFontBold").change(function () {
        if (this.checked) {
            $('#lblSampleDemo').css('font-weight', 'bold');
        }
        else {
            $('#lblSampleDemo').css('font-weight', 'normal');
        }
    });
    $("#pFontItalic").change(function () {
        if (this.checked) {
            $('#lblSampleDemo').css('font-style', 'italic');
        }
        else {
            $('#lblSampleDemo').css('font-style', 'normal');
        }
    });
    $("#pFontUnderlined").change(function () {
        if (this.checked) {
            $('#lblSampleDemo').css('text-decoration', 'underline');
        }
        else {
            $('#lblSampleDemo').css('text-decoration', 'none');
        }
    });


    function getFontSizeFromText(sel) {

        if (!(8 <= parseInt(sel.value) && parseInt(sel.value) <= 72)) {
            //Modified by Hemin
            //showAjaxReturnMessage(vrViewsRes['msgAddReportStylePartialTheFontSizeMustbebetween8n72'], "w");
            showAjaxReturnMessage(vrReportsRes['msgAddReportStylePartialTheFontSizeMustbebetween8n72'], "w");
            return false;
        }

        if (sel.value <= 72 || sel.value >= 08) {
            $('#lblSampleDemo').css("font-size", sel.value + "px");
        }
    }
    function getFontSize(sel) {

        if (!(8 <= parseInt(sel.value) && parseInt(sel.value) <= 72)) {
            //Modified by Hemin
            //showAjaxReturnMessage(vrViewsRes['msgAddReportStylePartialTheFontSizeMustbebetween8n72'], "w");
            showAjaxReturnMessage(vrReportsRes['msgAddReportStylePartialTheFontSizeMustbebetween8n72'], "w");
            return false;
        }
        if (sel.value <= 72 || sel.value >= 08) {
            $('#lblSampleDemo').css("font-size", sel.value + "px");
        }

    }
    function getFontFamily(sel) {
        var fontF = document.getElementById("ddlFont");
        var fontFamily = fontF.options[fontF.selectedIndex].text;
        $('#lblSampleDemo').css("font-family", fontFamily);
    }
    $('#ddlFontStyle').change(function () {
        var selectedStyle = $(this).val();

        if (selectedStyle == 'Regular') {

            $('#lblSampleDemo').css('font-style', 'normal');
            //document.getElementById('#lblSampleDemo').style.fontStyle = 'normal';
        }
        if (selectedStyle == 'Bold') {
            $('#lblSampleDemo').css('font-style', 'normal');
            document.getElementById('#lblSampleDemo').style.fontWeight = 'bold';
        }

        if (selectedStyle == 'Italic') {

            $('#lblSampleDemo').css("text-decoration", "none");
            $('#lblSampleDemo').css('font-style', 'normal');
            $('#lblSampleDemo').css('font-style', 'italic');
            //document.getElementById('#lblSampleDemo').style.fontStyle = 'italic';
        }
        if (selectedStyle == 'Underline') {
            //$('#lblSampleDemo').removeClass()
            $('#lblSampleDemo').css('font-style', 'normal');
            $('#lblSampleDemo').css("text-decoration", "none");
            $('#lblSampleDemo').css('text-decoration', 'underline');
            //document.getElementById('#lblSampleDemo').style.textDecoration == 'underline'
        }
        if (selectedStyle == 'Strikeout') {
            //$('#lblSampleDemo').removeClass()
            $('#lblSampleDemo').css("text-decoration", "none");
            $('#lblSampleDemo').css('font-style', 'normal');
            $('#lblSampleDemo').css("text-decoration", "line-through");
        }

    });
</script>
