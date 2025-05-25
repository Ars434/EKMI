document.addEventListener('DOMContentLoaded', () => {
    const imgFirst = document.querySelector('.img-first');
    const imgSecond = document.querySelector('.img-second');
    const ctBlocks = document.querySelector('.ct-blocks');
    const ctBlocks2 = document.querySelector('.ct-blocks2');

    // Инициализация начального состояния
    ctBlocks.classList.add('ct-visible');
    ctBlocks2.classList.add('ct-hidden');

    // Обработчик для второй картинки
    imgSecond.addEventListener('click', () => {
        imgFirst.classList.remove('active-img');
        imgFirst.classList.add('inactive-img');
        imgSecond.classList.remove('inactive-img');
        imgSecond.classList.add('active-img');

        ctBlocks.classList.remove('ct-visible');
        ctBlocks.classList.add('ct-hidden');
        ctBlocks2.classList.remove('ct-hidden');
        ctBlocks2.classList.add('ct-visible');
    });

    // Обработчик для первой картинки
    imgFirst.addEventListener('click', () => {
        imgSecond.classList.remove('active-img');
        imgSecond.classList.add('inactive-img');
        imgFirst.classList.remove('inactive-img');
        imgFirst.classList.add('active-img');

        ctBlocks2.classList.remove('ct-visible');
        ctBlocks2.classList.add('ct-hidden');
        ctBlocks.classList.remove('ct-hidden');
        ctBlocks.classList.add('ct-visible');
    });
});

// Конфигурация
const itemsPerPage = 8;
const allItems = document.querySelectorAll('.ct-block, .ct-block2');
const pageNumbers = document.querySelectorAll('.ct-str p');
const prevButton = document.querySelector('.ct-str img:first-child');
const nextButton = document.querySelector('.ct-str2');

let currentPage = 1;

function updatePagination() {
    // Скрыть все элементы
    allItems.forEach(item => item.style.display = 'none');

    // Показать элементы для текущей страницы
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    allItems.forEach((item, index) => {
        if(index >= start && index < end) {
            item.style.display = 'flex'; // Или 'block' в зависимости от вашего layout
        }
    });

    // Обновить активные кнопки
    pageNumbers.forEach((num, index) => {
        num.classList.toggle('active', (index + 1) === currentPage);
    });
}

// Обработчики событий
pageNumbers.forEach((num, index) => {
    num.addEventListener('click', () => {
        currentPage = index + 1;
        updatePagination();
    });
});

prevButton.addEventListener('click', () => {
    if(currentPage > 1) {
        currentPage--;
        updatePagination();
    }
});

nextButton.addEventListener('click', () => {
    if(currentPage < Math.ceil(allItems.length / itemsPerPage)) {
        currentPage++;
        updatePagination();
    }
});

// Инициализация
updatePagination();





document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const allBlocks = document.querySelectorAll('.ct-block, .ct-block2');

    function performSearch(searchText) {
        const searchTerm = searchText.toLowerCase().trim();

        allBlocks.forEach(block => {
            const pElement = block.querySelector('p');
            let textContent = '';

            // Обрабатываем вложенные span
            if(pElement) {
                textContent = Array.from(pElement.childNodes)
                    .filter(node => node.nodeType === Node.TEXT_NODE)
                    .map(node => node.textContent)
                    .join(' ')
                    .toLowerCase();
            }

            const isVisible = textContent.includes(searchTerm);

            if(block.closest('.ct-visible')) {
                block.style.display = isVisible ? 'flex' : 'none';
            }
        });
    }

    // Обработчик ввода с задержкой 300 мс
    let timeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });

    // Сброс поиска при переключении вкладок
    const images = document.querySelectorAll('.poi-img img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            searchInput.value = '';
            performSearch('');
        });
    });
});



















document.addEventListener('DOMContentLoaded', () => {
    // Элементы управления для мобильной версии
    const mobile = {
        imgFirst: document.querySelector('.mobile .img-first'),
        imgSecond: document.querySelector('.mobile .img-second'),
        blocks1: document.querySelector('.mobile .ct-blocks-m'),
        blocks2: document.querySelector('.mobile .ct-blocks-m2'),
        pagination: document.querySelector('.mobile .pagination-container')
    };

    // Настройки пагинации
    const config = {
        itemsPerPage: 8,
        currentView: 1,
        currentPage: 1
    };

    // Инициализация
    init();

    function init() {
        setupEventListeners();
        switchView(1); // Показываем первый вид по умолчанию
    }

    function setupEventListeners() {
        mobile.imgFirst.addEventListener('click', () => switchView(1));
        mobile.imgSecond.addEventListener('click', () => switchView(2));
    }

    function switchView(viewNumber) {
        if (config.currentView === viewNumber) return;

        // Переключаем иконки
        mobile.imgFirst.classList.toggle('active-img-m', viewNumber === 1);
        mobile.imgFirst.classList.toggle('inactive-img-m', viewNumber !== 1);
        mobile.imgSecond.classList.toggle('active-img-m', viewNumber === 2);
        mobile.imgSecond.classList.toggle('inactive-img-m', viewNumber !== 2);

        // Переключаем блоки
        mobile.blocks1.style.display = viewNumber === 1 ? 'flex' : 'none';
        mobile.blocks2.style.display = viewNumber === 2 ? 'flex' : 'none';

        // Обновляем настройки
        config.currentView = viewNumber;
        config.currentPage = 1;

        // Инициализируем пагинацию
        initPagination();
        showPage(1);
    }

    function initPagination() {
        const items = config.currentView === 1 ?
            mobile.blocks1.children :
            mobile.blocks2.children;

        const pageCount = Math.ceil(items.length / config.itemsPerPage);
        renderPagination(pageCount);
    }

    function renderPagination(pages) {
        mobile.pagination.innerHTML = '';
        for(let i = 1; i <= pages; i++) {
            const button = document.createElement('p');
            button.className = `page-btn ${i === 1 ? 'active-page' : ''}`;
            button.textContent = i;
            button.addEventListener('click', () => handlePageChange(i));
            mobile.pagination.appendChild(button);
        }
    }

    function handlePageChange(newPage) {
        config.currentPage = newPage;
        document.querySelectorAll('.page-btn').forEach(btn =>
            btn.classList.remove('active-page'));
        document.querySelectorAll('.page-btn')[newPage-1].classList.add('active-page');
        showPage(newPage);
    }

    function showPage(page) {
        const items = config.currentView === 1 ?
            mobile.blocks1.children :
            mobile.blocks2.children;

        const start = (page - 1) * config.itemsPerPage;
        const end = start + config.itemsPerPage;

        Array.from(items).forEach((item, index) => {
            item.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
    }
});










// Поиск для мобильной версии
document.addEventListener('DOMContentLoaded', () => {
    const searchInputMobile = document.querySelector('.mobile .search-input');
    const allMobileItems = document.querySelectorAll('.mobile .ct-block-m, .mobile .ct-block-m2');

    function mobileSearchHandler() {
        const searchTerm = searchInputMobile.value.toLowerCase().trim();

        allMobileItems.forEach(item => {
            const text = item.querySelector('p').textContent.toLowerCase();
            const isVisible = text.includes(searchTerm);

            item.style.display = isVisible ? 'block' : 'none';
        });

        // Обновление пагинации
        updateMobilePagination();
    }

    function updateMobilePagination() {
        const visibleItems = Array.from(allMobileItems).filter(item =>
            item.style.display !== 'none'
        ).length;

        const pages = Math.ceil(visibleItems / 8);
        const pagination = document.querySelector('.mobile .pagination-container');

        pagination.innerHTML = '';
        for(let i = 1; i <= pages; i++) {
            const pageBtn = document.createElement('p');
            pageBtn.className = `page-btn ${i === 1 ? 'active-page' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => showMobilePage(i));
            pagination.appendChild(pageBtn);
        }

        showMobilePage(1);
    }

    function showMobilePage(page) {
        const visibleItems = Array.from(allMobileItems).filter(item =>
            item.style.display !== 'none'
        );

        const start = (page - 1) * 8;
        const end = start + 8;

        visibleItems.forEach((item, index) => {
            item.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
    }

    // Обработчик с задержкой
    let searchTimeout;
    searchInputMobile.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(mobileSearchHandler, 300);
    });

    // Инициализация
    updateMobilePagination();
});
