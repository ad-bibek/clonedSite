const imgs = document.querySelectorAll('.header-slider ul img');
const prev_btn= document.querySelector('.control_prev');
const next_btn= document.querySelector('.control_next');

let n = 0;

function changeSlide(){
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = 'none';
    }
    imgs[n].style.display = 'block';
}

changeSlide();

prev_btn.addEventListener('click', (e)=>{
    if(n > 0){
        n--;
    }else{
        n = imgs.length - 1;
    }
    changeSlide();
    
});

next_btn.addEventListener('click', (e)=>{
    if(n < imgs.length - 1 ){
        n++;
    }else{
        n = 0;
    }
    changeSlide();
    
});
document.addEventListener('DOMContentLoaded', () => {
    fetchFakeShopAPI();
});

function fetchFakeShopAPI() {
    const loadingIndicator = document.getElementById('loading');

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
            loadingIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            loadingIndicator.textContent = 'Error loading products';
        });
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
        `;

        productsContainer.appendChild(productElement);
    });
}

