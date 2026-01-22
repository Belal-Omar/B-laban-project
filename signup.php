<?php
file_put_contents("debug.txt", json_encode($_POST)); // sure that data arrived correct 

if ($_SERVER["REQUEST_METHOD"] === "POST") { // sure that data sent (POST)
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirm_password"];

    if (empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
    die("❌ All fields are required.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("❌ Invalid email.");
    }

    if ($password !== $confirmPassword) {
    die("❌ The passwords do not match.");
    }

    $conn = new mysqli("localhost", "root", "BelalOmar499881", "b-laban");
    if ($conn->connect_error) {
    die("❌ Failed to connect to database: " . $conn->connect_error);
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT); // Hashing Password

    // check if user existing
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?"); // prepare --> save SQL Injection
    $stmt->bind_param("s", $email);
    $stmt->execute(); // Start Search
    $stmt->store_result(); 
    if ($stmt->num_rows > 0) {
       die("❌ This email address is already registered.");

    }

    $stmt->close();


    $stmt = $conn->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");

    $stmt->bind_param("sss", $username, $email, $passwordHash);


    if ($stmt->execute()) {

        echo "✅ Registration successful!";

    } else {

        echo "❌ An error occurred during registration: ". $stmt->error;

    }


    $stmt->close();

    $conn->close();

} else {

    die("❌ Invalid request method.");
}
