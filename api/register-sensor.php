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

$sensorUid = $DecodedData['sensorUid'];
$sensorType = $DecodedData['sensorType'];

try {
    // Check if the sensor UID already exists
    $SQL = "SELECT * FROM sensors WHERE sensor_uid = ?";
    $stmt = $CN->prepare($SQL);
    $stmt->bind_param('s', $sensorUid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $Message = "Sensor UID '$sensorUid' is already registered.";
    } else {
        // Insert new sensor if not already registered
        $IQ = $CN->prepare("INSERT INTO sensors (sensor_uid, sensor_type) VALUES (?, ?)");
        $IQ->bind_param('ss', $sensorUid, $sensorType);
        if ($IQ->execute()) {
            $Message = "Sensor UID '$sensorUid' has been successfully registered as '$sensorType'.";
        } else {
            $Message = "Error occurred during sensor registration.";
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
