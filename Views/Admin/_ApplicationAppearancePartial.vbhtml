@ModelType TabFusionRMS.Models.System

@*<script src="@Url.Content("~/content/bootstrap/js/pick-a-color-1.2.3.min.js")"></script>
<script src="@Url.Content("~/content/bootstrap/js/tinycolor-0.9.15.min.js")"></script>*@
<section class="content-header">
    <h1>
        @Languages.Translation("tiApplicationAppearance")

    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>@Languages.Translation("mnuAdminHome")</a></li>
        <li class="active">@Languages.Translation("tiApplicationAppearance")</li>
    </ol>
</section>
<hr />
@Using Html.BeginForm("SetSystemDetails", "Admin", FormMethod.Post, New With {.id = "frmAppearanceDetails", .ReturnUrl = ViewData("ReturnUrl")})
    @<div id="parent">
        <form class="form-horizontal">
            <fieldset>
                <!-- Multiple Radios -->
                <div class="form-group row">
                    <div class="col-sm-2 col-md-2">
                        <label class="control-label" for="radios">
                            @Languages.Translation("lblApplicationAppearanceTheme")

                        </label>
                    </div>
                    <div class="col-sm-2 col-md-2 custombutton" id="radio-group">
                        <div class="radio">
                            <label for="radios-0">
                                <input name="radios" id="current_theme" value="1" type="radio">
                                @Languages.Translation("lblApplicationAppearanceCurrentTheme")

                            </label>
                        </div>
                        <div class="radio">
                            <label for="radios-1">
                                <input name="radios" id="radios-1" value="2" checked="checked" type="radio">
                                @Languages.Translation("lblApplicationAppearanceOffice2007")

                            </label>
                        </div>
                    </div>
                </div>

                <!-- Multiple Checkboxes -->
                <div class="form-group row">
                    <div class="col-sm-2 col-md-2"></div>
                    <div class="col-sm-4 col-md-4">
                        <div class="col-sm-1 col-md-1">
                            @Html.CheckBoxFor(Function(m) m.AlternateRowColors, New With {.value = "1", .name = "cbAltRowCol", .id = "cbAltRowCol", .autofocus = ""})
                        </div>
                        <label>
                            <!--<input name="checkboxes" id="checkboxes-0" value="1" type="checkbox">-->
                            @Languages.Translation("lblApplicationAppearanceAltRowCol")
                        </label>
                    </div>

                </div>


                <div class="hidden" id="color-picker">
                    <div class="form-group row">
                        <div class="col-sm-2 col-md-2 ">
                            <label class="control-label" for="name">
                                @Languages.Translation("lblApplicationAppearanceOddRowCol")

                            </label>
                        </div>
                        <div class="col-sm-6 col-md-6">
                            <div class="input-group col-sm-12 col-md-12">
                                <div class="row">
                                    <div class="col-sm-3 col-md-3">
                                        <label class="form-control" id="lbOddSample">@Languages.Translation("lblApplicationAppearanceSAMPLE")
</label>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        @Html.TextBoxFor(Function(m) m.GridBackColorOdd, New With {.class = "pick-a-color form-control", .placeholder = "Background", .id = "txtGridBackColorOdd", .name = "txtGridBackColorOdd", .autofocus = ""})
                                        <!--<input type="text" class="pick-a-color form-control" id="txtOddBg" placeholder="Background">-->
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        @Html.TextBoxFor(Function(m) m.GridForeColorOdd, New With {.class = "pick-a-color form-control", .placeholder = "Foreground", .id = "txtGridForeColorOdd", .name = "txtGridForeColorOdd", .autofocus = ""})
                                        <!--<input type="text" class="pick-a-color form-control" id="txtOddFg" placeholder="Foreground">-->
                                    </div>
                                </div>
                            </div><!-- /input-group -->
                        </div><!-- /.col-lg-6 -->
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-2 col-md-2 ">
                            <label class="control-label" for="name">
                                @Languages.Translation("lblApplicationAppearanceEvenRowCol")

                            </label>
                        </div>
                        <div class="col-sm-6 col-md-6">
                            <div class="input-group col-sm-12 col-md-12">
                                <div class="row">
                                    <div class="col-sm-3 col-md-3">
                                        <label class="form-control" id="lbEveSample">@Languages.Translation("lblApplicationAppearanceSAMPLE")
</label>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        @Html.TextBoxFor(Function(m) m.GridBackColorEven, New With {.class = "pick-a-color form-control", .placeholder = "Background", .id = "txtGridBackColorEven", .name = "txtGridBackColorEven", .autofocus = ""})
                                        <!--<input type="text" class="pick-a-color form-control" id="txtEveBg" placeholder="Background">-->
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        @Html.TextBoxFor(Function(m) m.GridForeColorEven, New With {.class = "pick-a-color form-control", .placeholder = "Background", .id = "txtGridForeColorEven", .name = "txtGridForeColorEven", .autofocus = ""})
                                        <!--<input type="text" class="pick-a-color form-control" id="txtEveFg" placeholder="Foreground">-->
                                    </div>
                                </div>
                            </div><!-- /input-group -->
                        </div><!-- /.col-lg-6 -->
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-6 col-md-6"></div>
                        <button type="button" class="btn btn-primary" id="bRestore">@Languages.Translation("lblApplicationAppearanceRestore")
</button>
                    </div>
                </div>

                <!-- Text input-->
                <div class="form-group row">
                    <div class="col-sm-4 col-md-4 row">
                        <div class="col-sm-7 col-md-7">
                            <label class="control-label" for="textinput">
                                @Languages.Translation("lblApplicationAppearanceFVML")

                            </label>
                        </div>
                        <div class="col-sm-3 col-md-3">
                            @Html.TextBoxFor(Function(m) m.FormViewMinLines, New With {.class = "form-control input-md", .id = "txtFormMinLine", .name = "txtFormMinLine", .autofocus = ""})
                        </div>
                    </div>
                </div>

                <!-- Select Basic -->
                <div class="form-group row">
                    <div class="col-sm-4 col-md-4 row">
                        <div class="col-sm-7 col-md-7">
                            <label class="control-label" for="selectbasic">
                                @Languages.Translation("lblApplicationAppearanceRowColors")

                            </label>
                        </div>
                        <div class="col-sm-5 col-md-5">
                            @*@Html.DropDownListFor(Function(m) m.ReportGridColor, DirectCast(TabFusionRMS.Models.System, ReportGridColor,))
                                @Html.DropDownListFor(Function(m) m.VolumesId, DirectCast(ViewBag.OutputSettingList, SelectList), "", New With {.class = "form-control", .placeholder = "Output Volume", .required = "", .autofocus = ""})*@
                            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                                @Languages.Translation("btnApplicationAppearanceSelectColor")

                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">@Languages.Translation("lblApplicationAppearance1_PaleGreen")
</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">@Languages.Translation("lblApplicationAppearance2_LightCoral")
</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">@Languages.Translation("lblApplicationAppearance3_AzureMist")
</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">@Languages.Translation("lblApplicationAppearance4_LightAlmond")
</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">@Languages.Translation("lblApplicationAppearance5_Smoke")
</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Multiple Checkboxes -->
                <div class="form-group row">
                    <div class="col-sm-2 col-md-2"></div>
                    <div class="col-sm-4 col-md-4">
                        <div class="col-sm-1 col-md-1">
                            @Html.CheckBoxFor(Function(m) m.UseTableIcons, New With {.value = "1", .name = "cbUseTableIcon", .id = "cbUseTableIcon", .autofocus = ""})
                        </div>
                        <label for="checkboxes-1">
                            <!--<input name="checkboxes" id="checkboxes-1" value="1" type="checkbox">-->
                            @Languages.Translation("lblApplicationAppearanceUDI")

                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-4 col-md-4"></div>
                    <button type="button" id="bApplyAppearance" class="btn btn-primary col-sm-1 col-md-1" aria-expanded="false">
                        @Languages.Translation("Apply")

                    </button>
                </div>

            </fieldset>
        </form>
    </div>
End Using
<input type="hidden" id="SystemAddressesId1" value="0" />
<div id="AddEditDriveDialog">
</div>
<div id="AddEditVolumeDialog">
</div>
<script src="@Url.Content("~/scripts/appjs/appearance.js")"></script>



