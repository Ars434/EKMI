document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.specs-btn');
    const panes = document.querySelectorAll('.specs-pane');

    function activateTab(index) {
        // Удаляем активные классы у всех элементов
        tabs.forEach(tab => tab.classList.remove('active'));
        panes.forEach(pane => pane.classList.remove('active'));

        // Добавляем активные классы выбранному элементу
        tabs[index].classList.add('active');
        panes[index].classList.add('active');
    }

    // Обработчики кликов для вкладок
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            activateTab(index);
        });
    });

    // Активируем первую вкладку по умолчанию
    activateTab(0);
});


// ЯЗЫК ЯЗЫК ЯЗЫК
document.querySelectorAll('[class^="language-option"]').forEach(option => {
    option.addEventListener('click', function() {
        // Обновляем выбранный язык во всех местах
        document.querySelectorAll('.selected-language').forEach(selected => {
            selected.textContent = this.textContent;
        });

        // Закрываем выпадающее меню
        const dropdown = this.closest('.language-selector').querySelector('.language-dropdown');
        dropdown.classList.remove('active');
    });
});



// Открытие/закрытие меню
document.querySelector('.nav-m-all-right img[src="img/mobile/Vector%2021.svg"]').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.add('active');
});

document.querySelector('.close-menu').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.remove('active');
});

// Работа с каталогом
document.querySelector('.catalog-item .menu-link').addEventListener('click', function(e) {
    e.preventDefault();
    this.parentElement.classList.toggle('active');
});

// Подсветка выбранных пунктов
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});


// Открытие/закрытие по клику
document.querySelector('.language-selector').addEventListener('click', function(e) {
    e.stopPropagation();
    const dropdown = this.querySelector('.language-dropdown');
    dropdown.classList.toggle('active');
});

// Закрытие при клике вне меню
document.addEventListener('click', function() {
    const dropdown = document.querySelector('.language-dropdown');
    dropdown.classList.remove('active');
});






