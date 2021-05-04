const mainWrap = document.body;
const contant = document.querySelector('.recent-grid');
const categoryNav = document.querySelector('#catelory-nav').children;

mainWrap.addEventListener('click', async (e) => {
  if (e.target.id === 'category-list') {
    e.preventDefault();

    const response = await fetch('/admin/getCategoty');
    const data = await response.text();
    for (let i = 0; i < categoryNav.length; i += 1) {
      categoryNav[i].children[0].classList.remove('active');
    }
    e.target.classList.add('active');
    contant.innerHTML = data;
  }

  if (e.target.id === 'add-category-btn') {
    e.preventDefault();
    const errorField = document.querySelector('.error-message');
    const categoryForm = document.querySelector('#category-add-form');

    const response = await fetch('/category', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name: categoryForm.name.value }),
    });

    if (response.status !== 200) {
      const data = await response.json();
      errorField.textContent = data.message;
      return;
    }

    const data = await response.text();
    categoryForm.name.value = '';
    categoryForm.icon.value = '';
    document.querySelector('#category-full-list').innerHTML += data;
  }

  if (e.target.tagName === 'SPAN' && e.target.classList.contains('la-edit')) {
    const idx = e.target.parentNode.id;
    const nameCategory = e.target.parentElement.dataset.name;

    const addForm = document.querySelector('#category-add-form');
    const titleForm = document.querySelector('.form-title');

    addForm.style.display = 'none';

    const editForm = document.querySelector('#edit-category');
    editForm.style.display = 'block';
    editForm.name.value = nameCategory;
    editForm.dataset.idCategory = idx;

    titleForm.textContent = 'Редактировать категорию';
  }

  if (e.target.id === 'esc') {
    e.preventDefault();
    const titleForm = document.querySelector('.form-title');
    titleForm.textContent = 'Добавить категорию';

    const editForm = document.querySelector('#edit-category');
    editForm.style.display = 'none';

    const addForm = document.querySelector('#category-add-form');
    addForm.style.display = 'block';
  }

  if (e.target.id === 'edit-category-btn') {
    e.preventDefault();
    const errorField = document.querySelector('.error-message');
    const idx = e.target.parentNode.dataset.idCategory;

    const response = await fetch(`/category/${idx}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name: e.target.parentNode.name.value }),
    });

    if (response.status !== 200) {
      const data = await response.json();
      errorField.textContent = data.message;
    }

    const data = await response.text();
    contant.innerHTML = data;
  }

  if (
    e.target.dataset.type === 'category' &&
    e.target.classList.contains('la-trash')
  ) {
    e.preventDefault();
    const errorField = document.querySelector('.error-message');
    const idx = e.target.parentNode.id;

    const response = await fetch(`/category/${idx}`, {
      method: 'DELETE',
    });

    if (response.status !== 200) {
      const data = await response.json();
      errorField.textContent = data.message;
    }

    const data = await response.text();
    contant.innerHTML = data;
  }

  if (e.target.id === 'users-list') {
    e.preventDefault();

    const response = await fetch('/admin/getUser');
    const data = await response.text();
    for (let i = 0; i < categoryNav.length; i += 1) {
      categoryNav[i].children[0].classList.remove('active');
    }
    e.target.classList.add('active');
    contant.innerHTML = data;
  }

  if (e.target.id === 'product-list') {
    e.preventDefault();

    const response = await fetch('/admin/getProduct');
    const data = await response.text();
    for (let i = 0; i < categoryNav.length; i += 1) {
      categoryNav[i].children[0].classList.remove('active');
    }
    e.target.classList.add('active');
    contant.innerHTML = data;
  }

  if (
    e.target.dataset.type === 'product' &&
    e.target.classList.contains('la-trash')
  ) {
    const idx = e.target.parentNode.id;

    const response = await fetch(`/product/${idx}`, {
      method: 'DELETE',
    });

    const data = await response.text();
    contant.innerHTML = data;
  }

  if (
    e.target.dataset.type === 'product' &&
    e.target.classList.contains('la-check-circle')
  ) {
    const idx = e.target.parentNode.id;

    const response = await fetch(`/product/${idx}`, {
      method: 'PATCH',
    });

    const data = await response.text();
    contant.innerHTML = data;
  }

  if (
    e.target.dataset.type === 'user' &&
    e.target.classList.contains('la-ban')
  ) {
    const idx = e.target.parentNode.id;

    const response = await fetch(`/auth/${idx}`, {
      method: 'PATCH',
    });

    const data = await response.text();
    contant.innerHTML = data;
  }

  if (
    e.target.dataset.type === 'user' &&
    e.target.classList.contains('la-trash')
  ) {
    const idx = e.target.parentNode.id;

    const response = await fetch(`/auth/${idx}`, {
      method: 'DELETE',
    });

    const data = await response.text();
    contant.innerHTML = data;
  }
});
