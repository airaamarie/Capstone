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

$servoUid = $DecodedData['servoUid'];

try {
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
        $IQ = $CN->prepare("INSERT INTO servos (servo_uid) VALUES (?)");
        $IQ->bind_param('s', $servoUid);
        if ($IQ->execute()) {
            $Message = "Servo UID '$servoUid' has been successfully registered.";
        } else {
            $Message = "Error occurred during servo registration.";
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
