@Code
    ViewData("Title") = Languages.Translation("tiAdminManager")
    Layout = "~/Views/Shared/_LayoutAdmin.vbhtml"
End Code
<section class="content-header">
    <h1 class="main_title">
        <span id="title"> @Languages.Translation("mnuAdminHome")</span>
    </h1>
</section>
<div id="LoadUserControl" style="overflow-y:auto; overflow-x:hidden; "></div>