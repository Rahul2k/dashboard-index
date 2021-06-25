@ModelType TabFusionRMS.WebVB.JSTreeView.TreeView
@Imports TabFusionRMS.WebVB
<input type="hidden" id="rootTreeNode" />
    <input type="hidden" id="childTreeNode" />
    <div id="parent">
        <div id="jstree_view_div1234">
            <ul>
                @Model
            </ul>
        </div>
    </div>

<style type="text/css">
    .jstree li > a > .jstree-icon {display: none !important;}
</style>