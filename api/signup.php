<?php
include('db.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$userName = $DecodedData['userName'];
$userPass = $DecodedData['userPass'];
$phoneNumber = $DecodedData['phoneNumber'];

$SQL = "SELECT * FROM users WHERE u_name = ?";
$stmt = $CN->prepare($SQL);
$stmt->bind_param('s', $userName);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows != 0) {
    $Message = "Already Registered";
} else {
    $IQ = $CN->prepare("INSERT INTO users (u_name, u_pass, phone_number) VALUES (?, ?, ?)");
    $IQ->bind_param('sss', $userName, $userPass, $phoneNumber);
    if ($IQ->execute()) {
        $Message = "User has been Registered!!!";
    } else {
        $Message = "Error....";
    }
    $IQ->close();
}

$stmt->close();
$CN->close();

$Response = array("Message" => $Message);
echo json_encode($Response);
?>
