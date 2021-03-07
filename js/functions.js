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
                    //auto reload
                    location.reload();
                }
            });
        }
    }
}

function checkifEmpty(caller) {
    if (caller.val() == "") {
        caller.css('border', '2px solid red');
        return false;
    }else{
        caller.css('border', '');
        return true;
    }
}

function passwordMatch(password,confirm) {
    if (password.val() != confirm.val()) {
        password.css('border', '2px solid red');
        confirm.css('border', '2px solid red');
        return false;
    }else {
        password.css('border', '');
        confirm.css('border', '');
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
            $("#manageBtn").attr("value", "Αποθήκευση Αλλαγών").attr("onclick", "ManageData('updateROW')");
            $("#username").attr("disabled", "disabled");
            $("#email").attr("disabled", "disabled");
        },
        error: function(response) {
            alert("Δεν υπάρχουν Δεδομένα");
        }
    });
}
