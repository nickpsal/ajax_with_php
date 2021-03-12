$(document).ready(function() {
    $("#addNew").click(function(){
        $("#tableManager").show();
        document.getElementById("Fname").focus();
    });
    $("#close").click(function(){
        $("#tableManager").hide();
    });
    getData(0,50);
});
