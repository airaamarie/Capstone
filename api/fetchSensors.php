<?php
include('db.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    // Get sensor type from the request
    $sensorType = $_GET['sensor_type'] ?? null;

    if ($sensorType) {
        // Prepare and execute the query to fetch sensor UIDs based on type
        $SQL = "SELECT sensor_uid FROM sensors WHERE sensor_type = ?"; // Adjust table name and column name as needed
        $stmt = $CN->prepare($SQL);
        $stmt->bind_param("s", $sensorType);
        $stmt->execute();
        $result = $stmt->get_result();

        $sensorUids = [];
        while ($row = $result->fetch_assoc()) {
            $sensorUids[] = $row['sensor_uid'];
        }

        $stmt->close();
        $CN->close();

        echo json_encode(['sensorUids' => $sensorUids]);
    } else {
        echo json_encode(['error' => 'No sensor type specified']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
