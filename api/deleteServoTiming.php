<?php
include('db.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$input = json_decode(file_get_contents('php://input'), true);
$timingId = isset($input['timing_id']) ? intval($input['timing_id']) : null;

if ($timingId) {
    try {
        $SQL = "DELETE FROM servo_timings WHERE timing_id = ?";
        $stmt = $CN->prepare($SQL);
        $stmt->bind_param("i", $timingId);

        if ($stmt->execute()) {
            $response = ['success' => true, 'message' => 'Entry successfully deleted.'];
        } else {
            $response = ['success' => false, 'message' => 'Failed to delete the entry.'];
        }

        $stmt->close();
        $CN->close();

        echo json_encode($response);

    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No timing ID provided.']);
}
?>
