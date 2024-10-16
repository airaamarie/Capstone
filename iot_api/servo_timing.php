<?php
// Include your database connection file
include('db.php');  
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Get the servo UID from the request
$servo_uid = isset($_GET['servo_uid']) ? $_GET['servo_uid'] : null;

if ($servo_uid) {
    try {
        $SQL = "SELECT servo_uid, time, status FROM servo_timings WHERE servo_uid = ?";
        $stmt = $CN->prepare($SQL);
        $stmt->bind_param("s", $servo_uid);  // Bind the servo UID parameter
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $servoTimings = [];
            while ($row = $result->fetch_assoc()) {
                $servoTimings[] = [
                    'servo_uid' => $row['servo_uid'],
                    'time' => $row['time'],
                    'status' => $row['status']
                ];
            }
            echo json_encode(['servoTimings' => $servoTimings]);
        } else {
            echo json_encode(['message' => 'No data found for this servo UID']);
        }

        $stmt->close();
        $CN->close();
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'No servo UID provided']);
}
?>
