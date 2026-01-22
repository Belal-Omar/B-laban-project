<?php
$host = "localhost";
$username = "root";
$password = "BelalOmar499881";
$dbname = "b-laban";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
