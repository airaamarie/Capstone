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

$tankName = $DecodedData['tank_name'];

try {
    // Check if the tank name already exists
    $SQL = "SELECT * FROM tank WHERE tank_name = ?";
    $stmt = $CN->prepare($SQL);
    $stmt->bind_param('s', $tankName);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $Message = "Tank name '$tankName' is already registered.";
    } else {
        // Insert new tank if not already registered
        $IQ = $CN->prepare("INSERT INTO tank (tank_name) VALUES (?)");
        $IQ->bind_param('s', $tankName);
        if ($IQ->execute()) {
            $Message = "Tank name '$tankName' has been successfully registered.";
        } else {
            $Message = "Error occurred during tank registration.";
        }
        $IQ->close();
    }

    $stmt->close();
    $CN->close();

} catch (Exception $e) {
    $Message = "Error: " . $e->getMessage();
}

$Response = array("Message" => $Message);
echo json_encode($Response);
?>
