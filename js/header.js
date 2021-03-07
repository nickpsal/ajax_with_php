$(document).ready(function() {
    $("#addNew").click(function(){
        $("#tableManager").show();
        $("#editRowID").val(""),
        $("#Fname").val(""),
        $("#Lname").val(""),
        $("#email").val(""),
        $("#username").val("");
        $("#password").val("");
        $("#confirm").val("");
        $("#manageBtn").attr("value", "Αποθήκευση").attr("onclick", "ManageData('addNew')");
        $("#username").removeAttr("disabled", "disabled");
        $("#email").removeAttr("disabled", "disabled");
    });
    $("#close").click(function(){
        $("#tableManager").hide();
    });
    getData(0,50);
});
