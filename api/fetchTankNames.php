<?php
include('db.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $SQL = "SELECT tank_id, tank_name FROM tank"; // Adjust the table name if necessary
    $stmt = $CN->prepare($SQL);
    $stmt->execute();
    $result = $stmt->get_result();

    $tanks = [];
    while ($row = $result->fetch_assoc()) {
        $tanks[] = ['label' => $row['tank_name'], 'value' => $row['tank_id']];
    }

    $stmt->close();
    $CN->close();

    echo json_encode(['tanks' => $tanks]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
