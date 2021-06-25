<section class="content">
    <div id="parent">
        <div id="divSecurityTab" style="display:none">
            <ul id="ulSecurityTab" class="nav nav-tabs nav-justified nav-cus">
                <li class="active"><a href="#" id="tabUsers" data-toggle="tab" role="tab">@Languages.Translation("lblSTPartialUsers")</a></li>
                <li><a id="tabGroups" data-toggle="tab" role="tab">@Languages.Translation("tiSGPartialGroups")</a></li>
                <li><a id="tabSecurables" data-toggle="tab" role="tab">@Languages.Translation("tiSPPartialSecurables")</a></li>
                <li><a id="tabPermissions" data-toggle="tab" role="tab">@Languages.Translation("tiSPPartialPermission")</a></li>
            </ul>

            <div id="LoadTabContent" style="overflow-y:auto; overflow-x:hidden;" role="tabpanel" class="cus-tabs">
            </div>
        </div>
    </div>
</section>

<script src="@Url.Content("~/Scripts/AppJs/SecurityTab.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/SecurityTabUsers.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/SecurityTabGroups.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/SecurityTabSecurables.js")"></script>
<script src="@Url.Content("~/Scripts/AppJs/SecurityTabPermissions.js")"></script>