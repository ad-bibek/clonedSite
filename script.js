document.addEventListener('DOMContentLoaded', () => {
    setupSlider();
    setupCategoryDropdown();
    setupLanguageDropdown();
    setupNavigationDrawer();
    setupSearch();
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

function setupSearch() {
    const searchInput = document.querySelector('.nav-search-input');
    const searchButton = document.querySelector('.nav-search a');

    searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch(searchInput.value);
        }
    });
}

function performSearch(query) {
    const loadingIndicator = document.getElementById('loading');
    const productsContainer = document.getElementById('products');

    loadingIndicator.style.display = 'block';
    productsContainer.innerHTML = '';

    fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
            loadingIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
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
            <img src="${product.thumbnail}" alt="${product.title}">
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
    const categoryLabel = navSearchCategory.querySelector('p');

    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(categories => {
            categories.forEach(category => {
                const categoryItem = document.createElement('p');
                categoryItem.className = 'category-item';
                categoryItem.setAttribute('data-category', category);
                categoryItem.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                categoryDropdown.appendChild(categoryItem);

                categoryItem.addEventListener('click', (e) => {
                    const selectedCategory = e.target.getAttribute('data-category');
                    categoryLabel.textContent = selectedCategory;
                    categoryDropdown.classList.add('hidden');
                    fetchDummyJSONAPI(selectedCategory);
                });
            });
        })
        .catch(error => console.error('Error fetching categories:', error));

    navSearchCategory.addEventListener('click', () => {
        categoryDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!navSearchCategory.contains(e.target)) {
            categoryDropdown.classList.add('hidden');
        }
    });
}

function fetchDummyJSONAPI(category = 'All') {
    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.style.display = 'block';

    let url = 'https://dummyjson.com/products';
    if (category !== 'All') {
        url = `https://dummyjson.com/products/category/${category}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
            loadingIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            loadingIndicator.textContent = 'Error loading products';
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
