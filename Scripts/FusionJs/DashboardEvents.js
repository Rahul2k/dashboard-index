

$(document).ready(function () {

    $(function () {
       //Make list sortable:
       $(".sortable").sortable({}).disableSelection();
    });

//    $(function () {
 //       $(".widget").resizable();
  //  });

    /*
    $(function () {
        $('.widget').resizable({});
    });*/
});

/*This Event are using for create new Dashboard*/
$("#btnSaveName").click(() => {
    var Name = $("#txtNewDashboardName").val();
    if (Name == '') {
        return false;
    }
    $("#selectDashboardList").append("<option>" + Name + "</option>")
    $("#modalAddNewDashboard").modal("hide");
    $('#selectDashboardList').trigger("chosen:updated");
    $('#toast-container').fnAlertMessage({ title: '', msgTypeClass: 'toast-success', message: 'Added Successfully' });
    setTimeout(() => { window.location.reload(); }, 500);
});

/*This Event are using for delete dashboard*/
$("#btnDeleteDashboard").click(() => {
    $("#modalDeleteDashboard").modal("hide");
    $('#toast-container').fnAlertMessage({ title: '', msgTypeClass: 'toast-success', message: 'Delete Successfully' });
    setTimeout(() => { window.location.reload(); }, 500);
});
