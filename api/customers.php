<?php
header("Content-Type: application/json");
include("../common/database.php");
$action = $_POST['action'];

function insert_update($conn)
{
    extract($_POST);

    // $userId = $_SESSION['user_ID];
    $data = [];
    $query = "CALL 	customers_sp('$home_code','$fullname','$address','$phone','$status','$registerDate','$action_sp')";
    $result = $conn->query($query);

    if ($result) {
        $Message = $result->fetch_assoc();
        $data = array();
        if ($Message['Message'] == 'inserted') {
            $data = array('status' => true, 'message' => 'New Invoice has been saved successfully');
        }elseif ($Message['Message'] == 'updated') {
            $data = array('status' => true, 'message' => 'Invoice has been saved successfully');
        }
    } else {
        $data = array('status' => false, 'message' => $conn->error);
    }

    echo json_encode($data);
}


function read($conn) {
    extract($_POST);
    $query = "CALL read_customers_sp('$home_code')";
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
    $query = "CALL 	delete_customer_sp('$home_code')";
    $result = $conn->query($query);
    $result_data = array();

    if ($result) {
        $row = $result->fetch_assoc();
        if ($row['Message'] == 'success') {
            $result_data = array("status" => true, "message" => "Invoice has been deleted successfully");
        }
    }
    else {
        $result_data = array("status" => false, "message" => $conn->error);
    }

    echo json_encode($result_data);
}


function fillHomeCode($conn){
    extract($_POST);
    
    $query = "CALL fill_customer_sp()"; // statement
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