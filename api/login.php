<?php
include('db.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Start the session
session_start();

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$userName = $DecodedData['u_name'];
$userPass = $DecodedData['u_pass'];

$SQL = "SELECT * FROM users WHERE u_name = ?";
$stmt = $CN->prepare($SQL);
$stmt->bind_param('s', $userName);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows != 0) {
    $fetchu = $result->fetch_assoc();
    if ($fetchu['u_pass'] != $userPass) {
        $Message = "Password is Wrong!!";
    } else {
        // Store username in session
        $_SESSION['u_name'] = $userName;
        $Message = "Logging in!!";
    }
} else {
    $Message = "Account not found yet";
}

$stmt->close();
$CN->close();

$Response = array("Message" => $Message, "u_name" => isset($_SESSION['u_name']) ? $_SESSION['u_name'] : null);
echo json_encode($Response);
?>
