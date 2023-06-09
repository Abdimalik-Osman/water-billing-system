<?php
session_start();
header("Content-Type: application/json");
include("../common/database.php");
$action = $_POST['action'];


function login($conn)
{
    extract($_POST);
    $query = "CALL login_sp('$username', '$password')";
    $result = $conn->query($query);
    $result_data = array();

    $result_data = array();
    if ($result) {
        $data = [];
        $row = $result->fetch_assoc();
        if (isset($row['Message']) && $row['Message'] == 'InCorrect') {
            $result_data = array("status" => false, "message" => "Username or Password is incorrect");
        } elseif (isset($row['Message']) && $row['Message'] == 'InActive') {
            $result_data = array("status" => false, "message" => "Your Username is Locked By Administrator Please Contact Your Administrator");
        } else {
            $data[] = $row;

            $result_data = array("status" => true, "message" => $data);
            foreach ($row as $key => $value) {
                $_SESSION[$key] = $value;
            }
        }
    } else {
        $result_data = array("status" => false, "message" => $conn->error);
    }

    echo json_encode($result_data);
}




if (isset($action)) {
    $action($conn);
}