
var targetId = "tabUsers";

$(function () {

    //Commented by Hasmukh. this clicked handled in commonfunction.js file
    //$("#Configuration").off().on('click', function () {
    //    CheckSecuritySubModuleAccess();
    //    BindSecurityTabInfo(targetId);
    //});

    $('a[data-toggle="tab"]').off().on('shown.bs.tab', function (e) {
        targetId = $(e.target).attr("id");
        BindSecurityTabInfo(targetId);
    });
});


function LoadConfiguration() {
    CheckSecuritySubModuleAccess();
    BindSecurityTabInfo(targetId);
}


function BindSecurityTabInfo(targetId) {
    //console.log("Inside BindSecurityTabInfo: " + targetId)    
    $('#divSecurityTab').css('display', 'block');
    switch (targetId) {
        case "tabUsers":
            LoadUsersTabData();
            break;
        case "tabGroups":
            LoadGroupsTabData();
            break;
        case "tabSecurables":
            LoadSecurablesTabData();
            break;
        case "tabPermissions":
            LoadPermissionsTabData();
            break;
    }
}

function CheckSecuritySubModuleAccess() {
    var bSecurityUsr = CheckTabLevelAccessPermission("Security Users", 1, 1);
    var bSecurityConfig = CheckTabLevelAccessPermission("Security Configuration", 1, 1);

    if (!IS_ADMIN) {
        if (bSecurityUsr == 'false') {
            //console.log('Inside Security Users....');
            $('#tabUsers').remove();
            targetId = "tabGroups";
            $('ul li.active').removeClass('active');
            $('#tabGroups').parent('li').addClass('active');
        }

        if (bSecurityConfig == 'false') {
            //console.log('Inside Security Configuration....');
            $('#tabGroups').remove();
            $('#tabSecurables').remove();
            $('#tabPermissions').remove();
        }
    }
}