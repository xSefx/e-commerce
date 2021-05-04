const addForm = document.querySelector('#add-product-form');
const errorDiv = document.querySelector('.error-message');
const categoryList = document.querySelector('select');

addForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const response = await fetch('/product/addProduct', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: e.target.name.value,
      price: e.target.price.value,
      description: e.target.description.value,
      category: categoryList.value,
      user: e.target.dataset.userId,
    }),
  });

  if (response.status !== 200) {
    const data = await response.json();
    errorDiv.textContent = data.message;
    return;
  }

  const data = await response.json();

  addForm.innerHTML = `
  <div class="mb-3">Объявление ${data.name} успешно добавлено.</div>
  <div class="mb-3">Ожидается подтверждение.</div>
  <div class="mb-3">
    <a href="/" class="btn btn-primary">Перейти на главную</a>
  </div>
  `;
});
