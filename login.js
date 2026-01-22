document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = this.email.value.trim();
  const password = this.password.value;
  const alertDiv = document.getElementById('alert');

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  fetch('login.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      alertDiv.textContent = data;

      if (data.includes("Login Successfully")) {
        setTimeout(() => {
          window.location.href = 'introduction.html';
        }, 1000);
      }
    })
    .catch(error => {
      alertDiv.textContent = "Something wrong happened";
      console.error('Error:', error);
    });
});
