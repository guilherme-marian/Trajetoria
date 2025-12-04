
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const Usuario = document.getElementById('Usuario').value;
  const Email = document.getElementById('Email').value;
  const Password = document.getElementById('Password').value;

  fetch('/loginAccount', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Usuario, Email, Password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem('userId', data.userId); 
      window.location.href = '/home';
    } else {
      alert(data.message || 'Erro ao fazer login');
    }
  });
});
