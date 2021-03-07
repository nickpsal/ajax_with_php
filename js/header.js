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
    });
    $("#close").click(function(){
        $("#tableManager").hide();
    });
    getData(0,50);
});
