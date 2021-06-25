@If Request.IsAuthenticated Then
    @<text>
        @Languages.Translation("lblLoginPartialHello"), @Html.ActionLink(User.Identity.Name, "Manage", "Account", routeValues:=Nothing, htmlAttributes:=New With {.class = "username", .title = "Manage"})!
        @Using Html.BeginForm("LogOff", "Account", FormMethod.Post, New With {.id = "logoutForm"})
            @Html.AntiForgeryToken()
            @<a href="javascript:document.getElementById('logoutForm').submit()">@Languages.Translation("lnkLoginPartialLogOff")</a>
        End Using
    </text>
Else
    @<ul>
        <li>@Html.ActionLink(Languages.Translation("lnkLoginPartialRegister"), "Register", "Account", routeValues:=Nothing, htmlAttributes:=New With {.id = "registerLink"})</li>
        <li>@Html.ActionLink(Languages.Translation("lnkLoginPartialLogIn"), "Login", "Account", routeValues:=Nothing, htmlAttributes:=New With {.id = "loginLink"})</li>
    </ul>
End If
