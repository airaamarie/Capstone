<?php
// Start the session
session_start();
include('db.php');

// Set content type to JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Check if the username is set in the session
if (isset($_SESSION['u_name'])) {
    $userName = $_SESSION['u_name'];
    echo json_encode(["u_name" => $userName]);
} else {
    echo json_encode(["error" => "User is not logged in."]);
}
?>
