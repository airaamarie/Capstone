
<?php
// db.php
$CN = mysqli_connect("localhost", "root", "", "sena");

if (!$CN) {
    die("Connection failed: " . mysqli_connect_error());
}
?>