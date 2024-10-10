<?php
include('db.php'); // Make sure to include your database connection file

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $query = "SELECT tank_id, tank_name FROM tank"; // Query to fetch tank details
    $result = $CN->query($query);

    $tanks = array();
    while ($row = $result->fetch_assoc()) {
        $tanks[] = $row; // Store each row in the tanks array
    }

    echo json_encode($tanks); // Return the tanks array as JSON
} catch (Exception $e) {
    echo json_encode(array("error" => $e->getMessage())); // Handle any errors
}

$CN->close(); // Close database connection
?>
