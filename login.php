<?php
session_start();
include 'db.php';

error_reporting(E_ALL); // display all errors
ini_set('display_errors', 1); 

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo " Please Enter Email & Password ";
        exit;
    }

    $stmt = $conn->prepare("SELECT id, username, password_hash FROM users WHERE email = ?");
    if ($stmt === false) {
        echo "❌ Prepare failed: " . $conn->error;
        exit;
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        echo " Login Successfully ✅  ";
    } else {
        echo " Wrong Email Or Password ❌  ";
    }

    $stmt->close();
    $conn->close();
} else {
echo " The order method is incorrect❌";}
?>
