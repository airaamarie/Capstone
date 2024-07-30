<?php
include('db.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['id']) && isset($data['servo_uid']) && isset($data['time']) && isset($data['status'])) {
        $id = $data['id'];
        $servoUid = $data['servo_uid'];
        $time = $data['time'];
        $status = $data['status'];

        $SQL = "UPDATE servo_timings SET servo_uid = ?, time = ?, status = ? WHERE timing_id = ?";
        $stmt = $CN->prepare($SQL);
        $stmt->bind_param("sssi", $servoUid, $time, $status, $id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Servo timing updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update servo timing']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }

    $CN->close();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
