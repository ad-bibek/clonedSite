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
    setupCategoryDropdown();
    setupSlider();
    
    
});

function fetchFakeShopAPI(category = 'All') {
    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.style.display = 'block';

    // Update the URL based on the category
    const url = category === 'All' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${category.toLowerCase()}`;

    fetch(url)
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

function setupCategoryDropdown() {
    const categoryLabel = document.querySelector('.nav-search-category p');
    const categoryDropdown = document.getElementById('category-dropdown');
    const categoryItems = document.querySelectorAll('.category-item');

    document.getElementById('category-menu').addEventListener('click', () => {
        categoryDropdown.classList.toggle('hidden');
    });

    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedCategory = e.target.getAttribute('data-category');
            categoryLabel.textContent = selectedCategory;
            categoryDropdown
            categoryDropdown.classList.add('hidden');
            fetchFakeShopAPI(selectedCategory);
        });
    });

    // Close dropdown when clicked outside
    document.addEventListener('click', (e) => {
        if (!document.getElementById('category-menu').contains(e.target)) {
            categoryDropdown.classList.add('hidden');
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const allBtn = document.getElementById('allBtn');
    const navigationDrawer = document.getElementById('navigationDrawer');
    const closeBtn = document.getElementById('closeBtn');

    allBtn.addEventListener('click', () => {
        navigationDrawer.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        navigationDrawer.classList.remove('show');
    });

    document.addEventListener('click', (e) => {
        if (!navigationDrawer.contains(e.target) && !allBtn.contains(e.target)) {
            navigationDrawer.classList.remove('show');
        }
    });
});

