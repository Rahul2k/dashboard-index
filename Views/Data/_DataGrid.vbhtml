<!--toolbar buttons-->
<div id="ToolBar" class="col-sm-12">

</div>

<!--handsOnTable grid-->
<div id="mainDataContainer" style="top:10px; margin-bottom:5px; overflow: auto" class="col-sm-12">
    <div id="handsOnTableContainer" style="display:none; max-height: 80%; width: 100%">

    </div>
    <!--paging-->
    <div style="margin-top: -10px" id="paging" class="col-sm-12">
        <nav aria-label="Page navigation example" class="page-navigation">
            <ul class="pagination">
                <li class="page-item per-page"></li><!--totoal rows-->
            </ul>
            <ul class="pagination">
                <li class="page-item"><a class="page-link" onclick="obJgridfunc.goBack(this)"><i class="fa fa-step-backward" aria-hidden="true"></i></a></li>
                <li class="page-item"><input type="number" onchange="obJgridfunc.Pagechange(this)" class="form-control page-number" /></li>
                <li class="page-item"> of </li>
                <li class="page-item total-pages"></li><!--totoal per page-->
                <li class="page-item"><a class="page-link" onclick="obJgridfunc.goNext(this)"><i class="fa fa-step-forward" aria-hidden="true"></i></a></li>
            </ul>
            <ul class="pagination">
                <li class="page-item total-rows">Total: <i id="spinTotal" class="fa fa-refresh fa-spin"></i></li><!--totoal rows-->
            </ul>
        </nav>
    </div>
</div>





<!--Tracking-->
<div id="TrackingStatusDiv" class="footer" style="width: 100%; margin-bottom: 10px; display:none">
    <div class="col-sm-12">
        <div class="panel-group col-sm-12" style="margin-bottom: 0">
            <div class="panel panel-default col-xs-12 no_padding location_panel">
                <div class="panel-heading col-xs-12 no_padding top_action_header">
                    <div class="col-xs-6 col-sm-6 top_action_header_block">
                        Current Location
                    </div>
                    <div class="col-xs-6 col-sm-6 top_action_header_block">
                        Requests Wait List
                        <a class="show-hide pull-right" onclick="TrackingHideShowClick(this,0)" data-toggle="collapse" href="#top_action_items1">@Languages.Translation("Show") [-]</a>
                    </div>
                </div>
                <div id="top_action_items1" class="panel-collapse col-xs-12 no_padding top_action_content collapse" style="">
                    <div class="col-xs-6 col-sm-6">
                        <div id="TrackingLeft" style="width: 100%; height: 125px; overflow:auto">
                            <ul class="tastk_list">
                                <li><span id="lblTrackTime"></span></li>
                                <li><span id="lblTracking"><br></span></li>
                                <li><span id="lblDueBack"></span></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xs-6  col-sm-6">
                        <div id="TrackingRight" style="width: 100%; overflow: auto; height: 145px;">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
