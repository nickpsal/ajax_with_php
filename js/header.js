$(document).ready(function() {
    $("#addNew").click(function(){
        $("#tableManager").show();
    });
    $("#close").click(function(){
        $("#tableManager").hide();
    });
    getData(0,50);
});
