<?php
header("Content-Type: application/json");
include("../common/database.php");
$action = $_POST['action'];

function insert_update($conn)
{
    extract($_POST);

    // $userId = $_SESSION['user_ID'];
    $data = [];
    $query = "CALL 	users_sp('$user_ID','$fullname','$username','$password','$type','$status','$registerDate','$action_sp')";
    $result = $conn->query($query);

    if ($result) {
        $Message = $result->fetch_assoc();
        $data = array();
        if ($Message['Message'] == 'inserted') {
            $data = array('status' => true, 'message' => 'New User has been saved successfully');
        }elseif ($Message['Message'] == 'updated') {
            $data = array('status' => true, 'message' => 'User has been saved successfully');
        }
    } else {
        $data = array('status' => false, 'message' => $conn->error);
    }

    echo json_encode($data);
}


function read($conn) {
    extract($_POST);
    $query = "CALL read_user_sp('$user_ID')";
    $result = $conn->query($query);
    $result_data = array();
    if ($result) {
        $num_rows = $result->num_rows;
        if ($num_rows > 0) {
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $result_data = array("status" => true, "message" => $data);
        }
        else {
            $result_data = array("status" => false, "message" => "Data Not Found");
        }
    }
    else {
        $result_data = array("status" => false, "message" => $conn->error);
    }

    echo json_encode($result_data);
}


function delete($conn) {
    extract($_POST);
    $query = "CALL 	delete_user_sp('$user_ID')";
    $result = $conn->query($query);
    $result_data = array();

    if ($result) {
        $row = $result->fetch_assoc();
        if ($row['Message'] == 'success') {
            $result_data = array("status" => true, "message" => "User has been deleted successfully");
        }
    }
    else {
        $result_data = array("status" => false, "message" => $conn->error);
    }

    echo json_encode($result_data);
}


function fillUser($conn){
    extract($_POST);
    
    $query = "CALL fill_user_sp()"; // statement
    $result = $conn->query($query); // excution

    if($result){
        $num_rows = $result->num_rows;
        if ($num_rows > 0) {
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $result_data = array("status" => true, "message" => $data);
        }
        else {
            $result_data = array("status" => false, "message" => "Data Not Found");
        }
    }else{
            $result_data = array("status" => false, "message" => $conn->error());
    }

    echo json_encode($result_data);
}

function fetchUserRolls($conn){
    extract($_POST);
    
    $query = "CALL user_rolls_fetch_sp('$user_ID')"; // statement
    $result = $conn->query($query); // excution

    if($result){
        $num_rows = $result->num_rows;
        if ($num_rows > 0) {
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $result_data = array("status" => true, "message" => $data);
        }
        else {
            $result_data = array("status" => false, "message" => "Data Not Found");
        }
    }else{
            $result_data = array("status" => false, "message" => $conn->error());
    }

    echo json_encode($result_data);
}


function updateRolls($conn)
{
    extract($_POST);
    // $userId = $_SESSION['user_ID'];
    $result_info = '';

    if ($menuID == 0) {
        $query = "CALL update_user_rolls_sp('$user_ID','$menuID', '0')";
        // $conn = new mysqli(SERVER_NAME, USERNAME, PASSWORD, DATABASE);
        $result = $conn->query($query);
        $result_data = [];
        if ($result) {
            $result_data = array('status' => true, 'message' => 'User Permissions has been saved successfully ');
        } else {
            $result_data = array('status' => false, 'message' => $conn->error);
        }
        
        
    } else {
        $count = count($menuID);
        for ($i = 0; $i < $count; $i++) {
            $query = "CALL update_user_rolls_sp('$user_ID','$menuID[$i]', $i)";
            $conn = new mysqli(SERVER_NAME, USERNAME, PASSWORD, DATABASE);
            $result = $conn->query($query);
            $result_data = [];
            if ($result) {
                $result_data = array('status' => true, 'message' => 'User Permissions has been saved successfully ');
            } else {
                $result_data = array('status' => false, 'message' => $conn->error);
            }
        }
    }


    echo json_encode($result_data);
}


function readMenus($conn){
    extract($_POST);
    
    $query = "CALL user_menu_get()"; // statement
    $result = $conn->query($query); // excution

    if($result){
        $num_rows = $result->num_rows;
        if ($num_rows > 0) {
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $result_data = array("status" => true, "message" => $data);
        }
        else {
            $result_data = array("status" => false, "message" => "Data Not Found");
        }
    }else{
            $result_data = array("status" => false, "message" => $conn->error());
    }

    echo json_encode($result_data);
}


if (isset($action)) {
    $action($conn);
}
else {
    echo json_encode(array("status"=>false, "message"=>'Not Found'));
}