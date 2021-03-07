<?php
    $db_host = 'localhost';
    $db_username = 'root';
    $db_password = '';
    $db_name = 'ajax_db';
    $conn = new mysqli($db_host,$db_username,$db_password,$db_name);
    mysqli_set_charset($conn,"utf8");
    if (!$conn) {
        die("Database Connection failed" . mysqli_error($conn));
    }
?>