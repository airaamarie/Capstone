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

// Retrieve the servo UID and water pump UID
$servoUid = isset($DecodedData['servoUid']) ? $DecodedData['servoUid'] : null;
$waterPumpUid = isset($DecodedData['waterPumpUid']) ? $DecodedData['waterPumpUid'] : null;

if (is_null($servoUid) || is_null($waterPumpUid)) {
    $Response = array("Message" => "Missing servo UID or water pump UID.");
    echo json_encode($Response);
    exit;
}

try {
    $CN->begin_transaction();

    // Check if the servo UID already exists
    $servoSQL = "SELECT * FROM servos WHERE servo_uid = ?";
    $servoStmt = $CN->prepare($servoSQL);
    $servoStmt->bind_param('s', $servoUid);
    $servoStmt->execute();
    $servoResult = $servoStmt->get_result();

    if ($servoResult->num_rows > 0) {
        $Message = "Servo UID '$servoUid' is already registered.";
    } else {
        // Insert new servo if not already registered
        $servoIQ = $CN->prepare("INSERT INTO servos (servo_uid) VALUES (?)");
        $servoIQ->bind_param('s', $servoUid);
        if ($servoIQ->execute()) {
            $Message = "Servo UID '$servoUid' has been successfully registered.";
        } else {
            throw new Exception("Error occurred during servo registration.");
        }
        $servoIQ->close();
    }

    // Check if the water pump UID already exists
    $pumpSQL = "SELECT * FROM water_pumps WHERE pump_uid = ?";
    $pumpStmt = $CN->prepare($pumpSQL);
    $pumpStmt->bind_param('s', $waterPumpUid);
    $pumpStmt->execute();
    $pumpResult = $pumpStmt->get_result();

    if ($pumpResult->num_rows > 0) {
        $Message .= " Water Pump UID '$waterPumpUid' is already registered.";
    } else {
        // Insert new water pump if not already registered
        $pumpIQ = $CN->prepare("INSERT INTO water_pumps (pump_uid) VALUES (?)");
        $pumpIQ->bind_param('s', $waterPumpUid);
        if ($pumpIQ->execute()) {
            $Message .= " Water Pump UID '$waterPumpUid' has been successfully registered.";
        } else {
            throw new Exception("Error occurred during water pump registration.");
        }
        $pumpIQ->close();
    }

    $CN->commit();

    $servoStmt->close();
    $pumpStmt->close();
    $CN->close();

} catch (Exception $e) {
    $CN->rollback();
    $Message = "Error: " . $e->getMessage();
}

// Prepare and send the response
$Response = array("Message" => $Message);
echo json_encode($Response);
?>
