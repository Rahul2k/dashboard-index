<section class="content">
    <div id="parent">
        <div id="divTableTab" style="display:none">
            <label id="tableLabel" hidden="hidden"></label>
            <input type="hidden" id="hdnTableId" value="-1" />
            @*<div class="row">*@
            <ul id="myTabs" class="nav nav-tabs nav-justified nav-cus">
                <li class="active"><a id="tableGeneral" data-toggle="tab" role="tab">@Languages.Translation("General")</a></li>
                <li><a id="tabTableFields" data-toggle="tab" role="tab">@Languages.Translation("mnuTableTabPartialFields")</a></li>
                <li><a id="tableTracking" data-toggle="tab" role="tab">@Languages.Translation("mnuTableTabPartialTracking")</a></li>
                <li><a id="tabRetention" data-toggle="tab" role="tab">@Languages.Translation("Retention")</a></li>
                <li><a id="tabFileRoomOrder" data-toggle="tab" role="tab">@Languages.Translation("mnuTableTabPartialFileRoomOrder")</a></li>
                <li><a id="tableAdvanced" data-toggle="tab" role="tab">@Languages.Translation("Advanced")</a></li>
            </ul>
            @*</div>*@
            <div id="LoadTabContent" style="overflow-y:auto; overflow-x:hidden;" class="cus-tabs" role="tabpanel">
            </div>
        </div>
    </div>
</section>

@*@Scripts.Render("~/bundles/TableTabJs")*@

<script src="@Url.Content("~/Scripts/AppJs/TableTab.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/TableGeneral.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/TablesField.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/TableTracking.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/TableRetention.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/TablesFileRoomOrder.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/TableAdvanced.js")"></script>
