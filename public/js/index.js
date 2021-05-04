const containerIndex = document.querySelector('.container');
const listProduct = document.querySelector('.list-product');

containerIndex.addEventListener('click', async (e) => {
  if (e.target.dataset.btn === 'category-btn') {
    console.log(e.target.textContent);

    const response = await fetch(`/product/getProduct?categoryId=${e.target.id}`);

    const data = await response.text();
    listProduct.innerHTML = data;
  }
});
