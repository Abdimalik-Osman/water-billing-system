<?php
header("Content-Type: application/json");
include("../common/database.php");
$action = $_POST['action'];

function insert_update($conn)
{
    extract($_POST);

    // $userId = $_SESSION['user_id'];
    $data = [];

    $query = "CALL 	menu_sp('$menuID','$name','$link','$module',14,'$registerDate','$action_sp')";
    $result = $conn->query($query);

    if ($result) {
        $Message = $result->fetch_assoc();
        $data = array();
        if ($Message['Message'] == 'inserted') {
            $data = array('status' => true, 'message' => 'New Menus has been saved successfully');
        }elseif ($Message['Message'] == 'updated') {
            $data = array('status' => true, 'message' => 'Menus has been saved successfully');
        }
    } else {
        $data = array('status' => false, 'message' => $conn->error);
    }

    echo json_encode($data);
}


function read($conn) {
    extract($_POST);
    $query = "CALL `read_menus_sp`('$menuID')";
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
    $query = "CALL `delete_menu_sp`('$menuID')";
    $result = $conn->query($query);
    $result_data = array();

    if ($result) {
        $row = $result->fetch_assoc();
        if ($row['Message'] == 'success') {
            $result_data = array("status" => true, "message" => "Menu has been deleted successfully");
        }
    }
    else {
        $result_data = array("status" => false, "message" => $conn->error);
    }

    echo json_encode($result_data);
}

function load_nav($conn) {
    extract($_POST);
    $userId = $_SESSION['user_ID'];
    // $userId = 15;
    // echo json_encode($userId);
    $query = "CALL `load_nav_user_sp`('$userId')";
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

if (isset($action)) {
    $action($conn);
}
else {
    echo json_encode(array("status"=>false, "message"=>'Not Found'));
}