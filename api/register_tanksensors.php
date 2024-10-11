<?php
include('db.php'); // Ensure you have your database connection here
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Get the input data
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

// Extract variables from decoded data
$tankId = $DecodedData['tankId'];
$selectedServo = $DecodedData['selectedServo'];
$selectedPump = $DecodedData['selectedPump'];
$sensor1 = $DecodedData['sensor1'];
$sensor2 = $DecodedData['sensor2'];
$sensor3 = $DecodedData['sensor3'];

try {
    // Check if the tank already has the sensors registered
    $SQL = "SELECT * FROM tank_sensors WHERE tank_id = ? AND sensor_uid IN (?, ?, ?)";
    $stmt = $CN->prepare($SQL);
    $stmt->bind_param('isss', $tankId, $sensor1, $sensor2, $sensor3);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $Message = "One or more sensors are already registered for this tank.";
    } else {
        // Insert new sensor registrations
        $insertSQL = "INSERT INTO tank_sensors (tank_id, sensor_uid, servo_uid, pump_uid) VALUES (?, ?, ?, ?)";
        
        $insertStmt = $CN->prepare($insertSQL);
        
        // Register the sensors
        $insertStmt->bind_param('isss', $tankId, $sensor1, $selectedServo, $selectedPump);
        $insertStmt->execute();
        
        $insertStmt->bind_param('isss', $tankId, $sensor2, $selectedServo, $selectedPump);
        $insertStmt->execute();

        $insertStmt->bind_param('isss', $tankId, $sensor3, $selectedServo, $selectedPump);
        $insertStmt->execute();
        
        $Message = "Sensors registered successfully.";
        $insertStmt->close();
    }

    $stmt->close();
    $CN->close();

} catch (Exception $e) {
    $Message = "Error: " . $e->getMessage();
}

$Response = array("Message" => $Message);
echo json_encode($Response);
?>
