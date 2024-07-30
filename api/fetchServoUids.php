<?php
include('db.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $SQL = "SELECT servo_uid FROM servos";
    $stmt = $CN->prepare($SQL);
    $stmt->execute();
    $result = $stmt->get_result();

    $servoUids = [];
    while ($row = $result->fetch_assoc()) {
        $servoUids[] = $row['servo_uid'];
    }

    $stmt->close();
    $CN->close();

    echo json_encode(['servoUids' => $servoUids]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
