document.addEventListener('DOMContentLoaded', () => {
    setupSlider();
    fetchFakeShopAPI();
    setupCategoryDropdown();
    setupLanguageDropdown();
    setupNavigationDrawer();
});

function setupSlider() {
    const imgs = document.querySelectorAll('.header-slider ul img');
    const prev_btn = document.querySelector('.control_prev');
    const next_btn = document.querySelector('.control_next');

    let n = 0;

    function changeSlide() {
        imgs.forEach((img, i) => {
            img.style.display = i === n ? 'block' : 'none';
        });
    }

    changeSlide();

    prev_btn.addEventListener('click', () => {
        n = (n > 0) ? n - 1 : imgs.length - 1;
        changeSlide();
    });

    next_btn.addEventListener('click', () => {
        n = (n < imgs.length - 1) ? n + 1 : 0;
        changeSlide();
    });
}

function fetchFakeShopAPI(category = 'All') {
    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.style.display = 'block';

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
    const navSearchCategory = document.querySelector('.nav-search-category');
    const categoryDropdown = document.getElementById('category-dropdown');
    const categoryItems = document.querySelectorAll('.category-item');

    navSearchCategory.addEventListener('click', () => {
        categoryDropdown.classList.toggle('hidden');
    });

    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedCategory = e.target.getAttribute('data-category');
            navSearchCategory.querySelector('p').textContent = selectedCategory;
            categoryDropdown.classList.add('hidden');
            fetchFakeShopAPI(selectedCategory);
        });
    });

    document.addEventListener('click', (e) => {
        if (!navSearchCategory.contains(e.target)) {
            categoryDropdown.classList.add('hidden');
        }
    });
}

function setupLanguageDropdown() {
    const navLanguage = document.querySelector('.nav-language');
    const languageDropdown = document.querySelector('.language-dropdown');

    navLanguage.addEventListener('click', () => {
        languageDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!navLanguage.contains(e.target)) {
            languageDropdown.classList.add('hidden');
        }
    });
}

function setupNavigationDrawer() {
    const allBtn = document.getElementById('allBtn');
    const navigationDrawer = document.getElementById('navigationDrawer');
    const closeBtn = document.getElementById('close-btn');

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
}
