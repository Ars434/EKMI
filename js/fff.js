class Slider {
    constructor(containerSelector, interval = 5000) {
        this.container = document.querySelector(containerSelector);
        this.slides = this.container.querySelectorAll('.slide');
        this.dots = this.container.parentElement.querySelectorAll('.tochka');
        this.interval = interval;
        this.currentIndex = 0;
        this.timer = null;
        this.isPaused = false;

        this.init();
    }

    init() {
        // Инициализация первого слайда
        this.showSlide(0);

        // Автопрокрутка
        this.startAutoSlide();

        // Обработчики для точек
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.pause();
                this.showSlide(index);
                this.resume();
            });
        });

        // Пауза при наведении
        this.container.addEventListener('mouseenter', () => this.pause());
        this.container.addEventListener('mouseleave', () => this.resume());
    }

    showSlide(index) {
        // Корректировка индекса
        if (index >= this.slides.length) index = 0;
        if (index < 0) index = this.slides.length - 1;

        // Скрытие всех слайдов
        this.slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });

        // Показ текущего слайда
        this.slides[index].style.opacity = '1';
        this.slides[index].style.zIndex = '2';

        // Обновление точек
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[index].classList.add('active');

        this.currentIndex = index;
    }

    nextSlide() {
        let newIndex = this.currentIndex + 1;
        this.showSlide(newIndex);
    }

    startAutoSlide() {
        this.timer = setInterval(() => {
            if (!this.isPaused) this.nextSlide();
        }, this.interval);
    }

    pause() {
        this.isPaused = true;
        clearInterval(this.timer);
    }

    resume() {
        this.isPaused = false;
        this.startAutoSlide();
    }
}

// Инициализация для десктопной и мобильной версий
document.addEventListener('DOMContentLoaded', () => {
    new Slider('.desktop .slider-wrapper');
    new Slider('.mobile .slider-wrapper');
});




// НЕВ КАРУСЕЛЬ

let currentPosition = 0;
const slider = document.querySelector('.new-all-img');
const itemWidth = 270 + 60; // Ширина элемента + margin-right
const visibleItems = 3;
const totalItems = 5;

document.querySelector('.new-str1').addEventListener('click', () => {
    if(currentPosition > 0) {
        currentPosition--;
        slider.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
    }
});

document.querySelector('.new-str2').addEventListener('click', () => {
    if(currentPosition < totalItems - visibleItems) {
        currentPosition++;
        slider.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
    }
});




// ХИС КАРУСЕЛЬ
let currentPosition2 = 0;
const slider2 = document.querySelector('.pyb-blocks');
const itemWidth2 = 271;
const visibleItems2 = 4;
const totalItems2 = 6;

document.querySelector('.his-str1').addEventListener('click', () => {
    if(currentPosition2 > 0) {
        currentPosition2--;
        slider2.style.transform = `translateX(-${currentPosition2 * itemWidth2}px)`;
    }
});

document.querySelector('.his-str2').addEventListener('click', () => {
    const maxPosition = totalItems2 - visibleItems2;
    if(currentPosition2 < maxPosition) {
        currentPosition2++;
        slider2.style.transform = `translateX(-${currentPosition2 * itemWidth2}px)`;
    }
});
