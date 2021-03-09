function getData(start,limit) {
    $.ajax({
        url:'includes/ajax.php',
            method:"POST",
            dataType: 'text',
            data: {
                key: 'getData',
                start: start,
                limit: limit
            }, 
            success: function (response) {
                if (response != "reachedMax") {
                    $('tbody').append(response);
                    start += limit;
                    getData(start,limit)
                }else{
                    $(".table").DataTable();
                }
            }
    });
}

function ManageData(key) {
    var firstname = $("#Fname");
    var lastname = $("#Lname");
    var email = $("#email");
    var username = $("#username");
    var password = $("#password");
    var confirm = $("#confirm");
    var rowID = $("#editRowID");
    if (checkifEmpty(firstname) && checkifEmpty(lastname) && checkifEmpty(email) && checkifEmpty(username) && checkifEmpty(password) && checkifEmpty(confirm)){
        if (passwordMatch(password,confirm)) {
            $.ajax({
                url:'includes/ajax.php',
                method:"POST",
                dataType: 'text',
                data: {
                    key:key,
                    firstname: firstname.val(),
                    lastname: lastname.val(),
                    email: email.val(),
                    username: username.val(),
                    password: password.val(),
                    rowID:rowID.val()
                }, 
                success: function (response) {
                    alert(response);
                }
            });
        }
    }
}

function checkifEmpty(caller) {
    if (caller.val() == "") {
        caller.attr('class','form-control is-invalid');
        return false;
    }else{
        caller.attr('class','form-control');
        return true;
    }
}

function passwordMatch(password,confirm) {
    if (password.val() != confirm.val()) {
        $("#password").attr('class', 'form-control is-invalid')
        $("#confirm").attr('class', 'form-control is-invalid')
        document.getElementById('pass').innerHTML = "Password dont match";
        document.getElementById('con').innerHTML = "Password dont match";
        return false;
    }else {
        $("#password").attr('class', 'form-control');
        $("#confirm").attr('class', 'form-control');
        document.getElementById('pass').innerHTML = "Δεν δώσατε κωδικό.";
        document.getElementById('con').innerHTML = "Δεν δώσατε Επιβεβαίωση Κωδικού.";
        return true;
    }
}

function edit(rowID) {
    $.ajax({
        url:"includes/ajax.php",
        method: "POST",
        dataType: "JSON",
        data: {
            key:"getRowData",
            rowID:rowID
        }, 
        success: function (response) {
            $("#editRowID").val(response.rowID),
            $("#Fname").val(response.FirstName),
            $("#Lname").val(response.LastName),
            $("#email").val(response.email),
            $("#username").val(response.username),
            $("#password").val(response.password),
            $("#confirm").val(response.password),
            $("#tableManager").show();
            document.getElementById('window_label').innerHTML = "Επερξεγασία του Χρήστη " +rowID; 
            $("#manageBtn").attr("value", "Αποθήκευση Αλλαγών").attr("onclick", "ManageData('updateROW')");
            $("#username").attr("disabled", "disabled");
            $("#email").attr("disabled", "disabled");
        },
        error: function(response) {
            alert("Δεν υπάρχουν Δεδομένα");
        }
    });
}

function remove(rowID) {
    var confirm_delete = confirm("Θέλετε να διαγράψετε τον χρήστη με id " + rowID);
    if (confirm_delete) {
        $.ajax({
            url:"includes/ajax.php",
            method: "POST",
            dataType: "text",
            data: {
                key:"removeRowData",
                rowID:rowID
            },
            success:function(response) {
                alert(response);
                location.reload();
            } 
        });
    }
}

function viewData(rowID) {
    $.ajax({
        url:"includes/ajax.php",
        method: "POST",
        dataType: "JSON",
        data: {
            key:"getRowData",
            rowID:rowID
        }, 
        success: function (response) {
            $("#editRowID").val(response.rowID),
            $("#Fname").val(response.FirstName),
            $("#Lname").val(response.LastName),
            $("#email").val(response.email),
            $("#username").val(response.username),
            $("#tableManager").show();
            document.getElementById('window_label').innerHTML = "Προβολή του Χρήστη " +rowID; 
            $("#manageBtn").attr("hidden", "hidden");
            $("#Fname").attr("disabled", "disabled");
            $("#Lname").attr("disabled", "disabled");
            $("#email").attr("disabled", "disabled");
            $("#username").attr("disabled", "disabled");
            $("#password").attr("disabled", "disabled");
            $("#confirm").attr("disabled", "disabled");
        },
        error: function(response) {
            alert("Δεν υπάρχουν Δεδομένα");
        }
    });
}

