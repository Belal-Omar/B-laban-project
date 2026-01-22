document.getElementById('signupForm').addEventListener('submit', function (e) { // Action when click Signup
  e.preventDefault(); // Stop Reloading

  const username = this.username.value.trim();
  const email = this.email.value.trim();
  const password = this.password.value;
  const confirmPassword = this.confirm_password.value;
  const alertDiv = document.getElementById('alert');

  if (password !== confirmPassword) {
alertDiv.textContent = " Passwords do not match!⚠️";    return;
  } else {
    alertDiv.textContent = "";  // if = delet any thing 
  }

  const formData = new FormData(); // collect data in this variable

  // take every thing to send it 
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('confirm_password', confirmPassword);

  fetch('signup.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text()) // convert from php to String
    .then(data => {
      alertDiv.textContent = data;

      if (data.includes("✅")) {
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }
    })
    .catch(error => {
    alertDiv.textContent = "❌ An error occurred. Please try again later.";
      console.error('Error:', error);
    });
});
