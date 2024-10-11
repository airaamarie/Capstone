<?php
include('db.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $SQL = "SELECT pump_uid FROM water_pumps"; // Change the table name as per your database schema
    $stmt = $CN->prepare($SQL);
    $stmt->execute();
    $result = $stmt->get_result();

    $pumpUids = [];
    while ($row = $result->fetch_assoc()) {
        $pumpUids[] = $row['pump_uid'];
    }

    $stmt->close();
    $CN->close();

    echo json_encode(['pumpUids' => $pumpUids]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
