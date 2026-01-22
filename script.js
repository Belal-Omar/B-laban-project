document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.querySelector('input[name="Username"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector('input[name="password"]').value;
  const confirmPassword = document.querySelector('input[name="confirm_password"]').value;
  const alertDiv = document.getElementById('alert');

  if (password !== confirmPassword) {
    alertDiv.textContent = "⚠️ كلمات المرور غير متطابقة!";
    return;
  } else {
    alertDiv.textContent = "";
  }

  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('confirm_password', confirmPassword);

  fetch('signup_process.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      alertDiv.textContent = data;

      if (data.includes("✅")) {
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }
    })
    .catch(error => {
      alertDiv.textContent = "❌ حدث خطأ يرجى المحاولة لاحقًا";
      console.error('Error:', error);
    });
});
