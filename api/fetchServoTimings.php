<?php
include('db.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $SQL = "SELECT timing_id, servo_uid, time, status FROM servo_timings";
    $stmt = $CN->prepare($SQL);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $servoTimings = [];
        while ($row = $result->fetch_assoc()) {
            $servoTimings[] = [
                'id' => $row['timing_id'],
                'servo_uid' => $row['servo_uid'],
                'time' => $row['time'],
                'status' => $row['status']
            ];
        }
        echo json_encode(['servoTimings' => $servoTimings]);
    } else {
        echo json_encode(['message' => 'No data found']);
    }

    $stmt->close();
    $CN->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
