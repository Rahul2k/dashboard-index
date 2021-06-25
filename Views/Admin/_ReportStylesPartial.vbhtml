@Imports TabFusionRMS.Models
@ModelType ReportStyle
<style>
    .sticker.stick {
        left:295px;
    }
    .sticker {
        left: 0px;
    }
</style>
<section class="content form-horizontal">
    <div class="row">
        <div id="divReportStyle" class="col-sm-12 table-responsive jqgrid-cus">
            <table id="grdReportStyle"></table>
            <div id="grdReportStyle_pager"></div>
        </div>
    </div>
    <div class="form-group top_space">
        <div class="col-sm-12">
            <div class="btn-toolbar sticker">
                <input type="button" id="reportStyleAdd" name="reportStyleAdd" value=@Languages.Translation("btnReportStylesPartialClone") class="btn btn-primary" />
                <input type="button" id="reportStyleEdit" name="reportStyleEdit" value=@Languages.Translation("Edit") class="btn btn-primary" />
                <input type="button" id="reportStyleRemove" name="reportStyleRemove" value=@Languages.Translation("Remove") class="btn btn-primary" />
            </div>
        </div>
    </div>
</section>