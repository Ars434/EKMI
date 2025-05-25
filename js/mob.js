document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container-mm');
    const progressContainer = document.querySelector('.progress-container');
    const slides = document.querySelectorAll('.pyb-block-m');

    // Очищаем контейнер перед созданием индикаторов
    progressContainer.innerHTML = '';

    // Создаем индикаторы
    slides.forEach((slide, index) => {
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item';
        if(index === 0) progressItem.classList.add('active');

        progressItem.onclick = () => {
            container.scrollTo({
                left: window.innerWidth * index,
                behavior: 'smooth'
            });
        };

        progressContainer.appendChild(progressItem);
    });

    // Обработчик скролла
    container.addEventListener('scroll', () => {
        const scrollPos = container.scrollLeft + (window.innerWidth / 2);
        const activeIndex = Math.floor(scrollPos / window.innerWidth);

        document.querySelectorAll('.progress-item').forEach((item, index) => {
            item.classList.toggle('active', index === activeIndex);
        });
    });

    // Обработчик ресайза
    window.addEventListener('resize', () => {
        const activeIndex = Math.floor(container.scrollLeft / window.innerWidth);
        container.scrollLeft = activeIndex * window.innerWidth;
    });
});




document.addEventListener('DOMContentLoaded', () => {
    // Элементы слайдера
    const sliderWrapper = document.querySelector('.div-img');
    const slides = document.querySelectorAll('.div-img .slide2');
    const dots = document.querySelectorAll('.div-tochki2 .tochka2');
    let currentSlide = 0;
    let autoSlideInterval;

    // Функция показа слайда
    function showSlide(index) {
        // Сбрасываем все активные элементы
        slides.forEach(slide => slide.classList.remove('active2'));
        dots.forEach(dot => dot.classList.remove('active2'));

        // Активируем текущий слайд и точку
        slides[index].classList.add('active2');
        dots[index].classList.add('active2');
        currentSlide = index;
    }

    // Автопереключение слайдов
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }

    // Запуск автоматической прокрутки
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            showSlide(index);
            startAutoSlide();
        });
    });

    // Инициализация слайдера
    showSlide(0); // Показать первый слайд
    startAutoSlide(); // Запустить авто-прокрутку

    // Остановка при наведении
    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    // Возобновление при уходе курсора
    sliderWrapper.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
});
