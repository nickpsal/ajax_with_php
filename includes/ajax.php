<?php
    include "datanase.php";
    global $conn;
    if (isset($_POST['key'])) {
        if ($_POST['key'] == 'getData') {
            $start = $conn->real_escape_string($_POST['start']);
            $limit = $conn->real_escape_string($_POST['limit']);
            $query = "SELECT * FROM users LIMIT $start,$limit";   
            $sql = $conn->query($query);
            if ($sql->num_rows > 0) {
                $response = "";
                while($data = $sql->fetch_array()) {
                    $response .= '
                    <tr>
                    <td align = "center" id=user_'.$data['id'].'>'.$data['id'].'</td>
                    <td align = "center">'.$data['FirstName'].'</td>
                    <td align = "center">'.$data['LastName'].'</td>
                    <td align = "center">'.$data['email'].'</td>
                    <td align = "center">'.$data['username'].'</td>
                    <td align="center">
                    <input type="button" class="btn btn-primary" onclick="edit('.$data['id'].')" name = "edit" id="edit" value="ΕΠΕΡΞΕΓΑΣΙΑ">
                    <input type="button" class="btn btn-primary" name = "view" value="ΠΡΟΒΟΛΗ">
                    <input type="button" class="btn btn-danger" name = "delete" value="ΔΙΑΓΡΑΦΗ">
                    </td>
                    </tr>';
                }
                exit($response); 
            }else{
                exit('reachedMax');
            }
        }elseif ($_POST['key'] == 'addNew') {
            $firstname = $_POST['firstname'];
            $LastName = $_POST['lastname'];
            $email = $_POST['email'];
            $username = $_POST['username'];
            $password = $_POST['password'];
            if ($conn) {
                $query1 = "SELECT id FROM users WHERE username = '$username';";
                $query2 = "SELECT id FROM users WHERE email = '$email';";
                $sql1 = $conn->query($query1);
                $sql2 = $conn->query($query2);
                if ($sql1->num_rows > 0){
                    exit("Ο Χρήστης υπάρχει ηδη στην Βάση Δεδομένων");
                }elseif ($sql2->num_rows > 0){ 
                    exit("Υπάρχει ηδη Χρήστης με αυτήν την διευθηνση email στην Βάση Δεδομένων");
                }else {
                    $password = password_hash($password, PASSWORD_DEFAULT);
                    $query3 = "INSERT INTO users (FirstName, LastName, Email, Username, Password) VALUES ('$firstname','$LastName','$email','$username','$password')";   
                    $conn->query($query3);
                    exit("Ο Χρήστης αποθηκέυτηκε με επιτυχία!!!!");
                }
            }else {
                exit("Σφάλμα : " . mysqli_error($conn));
            }
        }elseif ($_POST['key'] == 'getRowData') {
            $rowID = $conn->real_escape_string($_POST['rowID']);
            $query = "SELECT * FROM users WHERE id='$rowID'";
            $sql = $conn->query($query);
            $data = $sql->fetch_array();
            $jsonArray = array(
                'rowID' => $data['id'],
                'FirstName' => $data['FirstName'],
                'LastName' => $data['LastName'],
                'email' => $data['email'],
                'username' => $data['username'],
                'password' => $data['password']
            );
            exit(json_encode($jsonArray));
        }elseif ($_POST['key'] == 'updateROW') {
            $id = $_POST['rowID'];
            $firstname = $_POST['firstname'];
            $LastName = $_POST['lastname'];
            $password = $_POST['password'];
            $query2 = "UPDATE users SET FirstName = '$firstname', LastName = '$LastName' WHERE id = '$id';";   
            $sql = $conn->query($query2);
            exit("Ο Χρήστης επερξεγάστηκε με επιτυχία!!!!");
        } 
    }
?>  