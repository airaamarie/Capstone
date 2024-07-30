<?php
include('db.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    if (!isset($DecodedData['servoUid'], $DecodedData['time'], $DecodedData['date'], $DecodedData['status'])) {
        throw new Exception('Invalid input data');
    }

    $servoUid = $DecodedData['servoUid'];
    $time = $DecodedData['time'];
    $date = $DecodedData['date'];
    $status = $DecodedData['status'];

    if (empty($servoUid)) {
        throw new Exception('Servo UID cannot be empty.');
    }

    // Check if the servo UID exists
    $SQL = "SELECT * FROM servos WHERE servo_uid = ?";
    $stmt = $CN->prepare($SQL);
    $stmt->bind_param('s', $servoUid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Insert new servo timing
        $IQ = $CN->prepare("INSERT INTO servo_timings (servo_uid, time, date, status) VALUES (?, ?, ?, ?)");
        $IQ->bind_param('ssss', $servoUid, $time, $date, $status);
        if ($IQ->execute()) {
            $Message = "Servo timing for UID '$servoUid' has been successfully registered.";
        } else {
            throw new Exception("Error occurred during servo timing registration.");
        }
        $IQ->close();
    } else {
        $Message = "Servo UID '$servoUid' is not registered.";
    }

    $stmt->close();
    $CN->close();

} catch (Exception $e) {
    $Message = "Error: " . $e->getMessage();
}

$Response = array("Message" => $Message);
echo json_encode($Response);
exit();
?>
