
// Объект с переводами
const translations = {
    ru: {
        catalog: "Каталог",
        individual: "Индивидуальная мебель",
        contacts: "Контакты",
        about: "О компании",
        bestLife: "ЛУЧШАЯ ЖИЗНЬ, СОЗДАННАЯ ДЛЯ ВАС!",
        // Добавьте остальные фразы
    },
    ua: {
        catalog: "Каталог",
        individual: "Індивідуальні меблі",
        contacts: "Контакти",
        about: "Про компанію",
        bestLife: "НАЙКРАЩЕ ЖИТТЯ, СТВОРЕНО ДЛЯ ВАС!",
        // ...
    },
    en: {
        catalog: "Catalog",
        individual: "Custom Furniture",
        contacts: "Contacts",
        about: "About Company",
        bestLife: "BEST LIFE, CREATED FOR YOU!",
        // ...
    }
};

// Функция для смены языка
function setLanguage(lang) {
    // Сохраняем выбранный язык
    localStorage.setItem('selectedLanguage', lang);

    // Обновляем текст на странице
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[lang][key];
    });

    // Обновляем отображение выбранного языка
    document.querySelector('.selected-language').textContent = lang.toUpperCase();
}

// Инициализация языка при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
    setLanguage(savedLang);

    // Обработчики для выбора языка
    document.querySelectorAll('.language-option, .language-option2').forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = e.target.textContent.toLowerCase();
            setLanguage(lang);
        });
    });
});
