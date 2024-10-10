
<?php
// db.php
$CN = mysqli_connect("localhost", "root", "", "capstone");

if (!$CN) {
    die("Connection failed: " . mysqli_connect_error());
}
?>