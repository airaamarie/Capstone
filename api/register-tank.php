<?php
include('db.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$Response = array(); // Initialize the response array
try {
    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    // Check if tank_name exists in the decoded data
    if (!isset($DecodedData['tank_name']) || empty($DecodedData['tank_name'])) {
        throw new Exception("Tank name is required.");
    }

    $tankName = $DecodedData['tank_name'];

    // Check if the tank name already exists
    $SQL = "SELECT * FROM tank WHERE tank_name = ?";
    $stmt = $CN->prepare($SQL);
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $CN->error);
    }
    $stmt->bind_param('s', $tankName);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $Message = "Tank name '$tankName' is already registered.";
    } else {
        // Insert new tank if not already registered
        $IQ = $CN->prepare("INSERT INTO tank (tank_name) VALUES (?)");
        if (!$IQ) {
            throw new Exception("Failed to prepare insert statement: " . $CN->error);
        }
        $IQ->bind_param('s', $tankName);
        if ($IQ->execute()) {
            $Message = "Tank name '$tankName' has been successfully registered.";
        } else {
            throw new Exception("Error occurred during tank registration: " . $IQ->error);
        }
        $IQ->close();
    }

    $stmt->close();
} catch (Exception $e) {
    $Message = "Error: " . $e->getMessage();
}

// Close the database connection
if (isset($CN)) {
    $CN->close();
}

$Response = array("Message" => $Message);
echo json_encode($Response);
?>
