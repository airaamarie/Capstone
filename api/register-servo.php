<?php
include('db.php');
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

// Check if JSON was decoded properly
if (json_last_error() !== JSON_ERROR_NONE) {
    $Response = array("Message" => "Invalid JSON input: " . json_last_error_msg());
    echo json_encode($Response);
    exit;
}

// Retrieve the servo UID and tank ID
$servoUid = isset($DecodedData['servoUid']) ? $DecodedData['servoUid'] : null;
$tankId = isset($DecodedData['tankId']) ? $DecodedData['tankId'] : null;

if (is_null($servoUid) || is_null($tankId)) {
    $Response = array("Message" => "Missing servo UID or tank ID.");
    echo json_encode($Response);
    exit;
}

try {
    // Check if the tank ID exists
    $tankCheckSQL = "SELECT * FROM tank WHERE tank_id = ?";
    $tankCheckStmt = $CN->prepare($tankCheckSQL);
    $tankCheckStmt->bind_param('i', $tankId);
    $tankCheckStmt->execute();
    $tankCheckResult = $tankCheckStmt->get_result();

    if ($tankCheckResult->num_rows === 0) {
        $Message = "Tank ID '$tankId' does not exist.";
    } else {
        // Check if the servo UID already exists
        $SQL = "SELECT * FROM servos WHERE servo_uid = ?";
        $stmt = $CN->prepare($SQL);
        $stmt->bind_param('s', $servoUid);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $Message = "Servo UID '$servoUid' is already registered.";
        } else {
            // Insert new servo if not already registered
            $IQ = $CN->prepare("INSERT INTO servos (servo_uid, tank_id) VALUES (?, ?)");
            $IQ->bind_param('si', $servoUid, $tankId);
            if ($IQ->execute()) {
                $Message = "Servo UID '$servoUid' has been successfully registered for tank ID '$tankId'.";
            } else {
                $Message = "Error occurred during servo registration.";
            }
            $IQ->close();
        }

        $stmt->close();
    }

    $tankCheckStmt->close();
    $CN->close();

} catch (Exception $e) {
    $Message = "Error: " . $e->getMessage();
}

// Prepare and send the response
$Response = array("Message" => $Message);
echo json_encode($Response);
?>
