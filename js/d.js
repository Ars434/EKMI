document.addEventListener('DOMContentLoaded', function() {
    // Открытие попапа
    document.querySelectorAll('.form-button button, .footer-top-nav3-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.form-popup').classList.add('active');
        });
    });

    // Закрытие попапа
    document.querySelector('.close-popup').addEventListener('click', function() {
        document.querySelector('.form-popup').classList.remove('active');
    });

    // Закрытие при клике вне формы
    document.querySelector('.form-popup').addEventListener('click', function(e) {
        if(e.target === this) {
            this.classList.remove('active');
        }
    });
});
