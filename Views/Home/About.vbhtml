@Code
    ViewData("Title") = Languages.Translation("About")
End Code

<hgroup class="title">
    <h1>@ViewData("Title").</h1>
    <h2>@ViewData("Message")</h2>
</hgroup>

<article>
    <p>
        @Languages.Translation("lblAboutUseThisArea2ProvideAdditionalInfo")
    </p>

    <p>
        @Languages.Translation("lblAboutUseThisArea2ProvideAdditionalInfo")
    </p>

    <p>
        @Languages.Translation("lblAboutUseThisArea2ProvideAdditionalInfo")
    </p>
</article>

<aside>
    <h3>@Languages.Translation("tiAboutAsideTitle")</h3>
    <p>
        @Languages.Translation("lblAboutUseThisArea2ProvideAdditionalInfo")
    </p>
    <ul>
        <li>@Html.ActionLink(Languages.Translation("mnuAdminHome"), "Index", "Home")</li>
        <li>@Html.ActionLink(Languages.Translation("About"), "About", "Home")</li>
        <li>@Html.ActionLink(Languages.Translation("lnkAboutContact"), "Contact", "Home")</li>
    </ul>
</aside>