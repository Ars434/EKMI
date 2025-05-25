// Обновленный код для попапов
document.addEventListener('DOMContentLoaded', function() {
    // Селекторы
    const desktopPopup = document.querySelector('.form-popup');
    const mobilePopup = document.querySelector('.form-popup-m');
    const closeButtons = document.querySelectorAll('.close-popup, .close-popup-m');

    // Функция открытия попапа
    function openPopup(e) {
        e.preventDefault();
        const isMobile = window.innerWidth <= 768; // Более точное определение мобильных
        const targetPopup = isMobile ? mobilePopup : desktopPopup;

        targetPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    }

    // Функция закрытия
    function closePopup() {
        [desktopPopup, mobilePopup].forEach(popup => popup.classList.remove('active'));
        document.body.style.overflow = '';
    }

    // Обработчики открытия
    document.querySelectorAll('.form-button button, .footer-top-nav3-button').forEach(btn => {
        btn.addEventListener('click', openPopup);
    });

    // Обработчики закрытия
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closePopup);
    });

    // Закрытие по клику вне формы
    [desktopPopup, mobilePopup].forEach(popup => {
        popup.addEventListener('click', function(e) {
            if(e.target === this) closePopup();
        });
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape') closePopup();
    });

    // Обработка отправки формы
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            closePopup();
            // Здесь можно добавить отправку формы
            alert('Форма успешно отправлена!');
        });
    });
});



