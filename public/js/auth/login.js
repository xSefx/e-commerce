const loginForm = document.querySelector('#login-form');
const errorMessage = document.querySelector('.error-message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;

  if (!form.password.value || !form.email.value) {
    errorMessage.textContent = 'Заполните все поля';
    return;
  }

  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      password: form.password.value,
      email: form.email.value,
    }),
  });

  if (response.status !== 200) {
    const data = await response.json();
    errorMessage.textContent = data.message;
    return;
  }

  if (response.status === 200) {
    window.location = '/';
  }
});
