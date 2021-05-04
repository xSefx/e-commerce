const registerForm = document.querySelector('#register-form');
const errorMessage = document.querySelector('.error-message');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;

  if (
    !form.password.value ||
    !form.repeatPass.value ||
    !form.email.value ||
    !form.name.value
  ) {
    errorMessage.textContent = 'Заполните все поля';
    return;
  }

  if (form.password.value !== form.repeatPass.value) {
    errorMessage.textContent = 'Пароли не совпадают';
    return;
  }

  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      password: form.password.value,
      email: form.email.value,
      name: form.name.value,
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
