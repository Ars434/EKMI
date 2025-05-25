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


// Добавьте этот код в ваш mobile.js
document.addEventListener('DOMContentLoaded', () => {
    const initMobileCarousel = () => {
        const carousel = document.querySelector('.mobile .new-all-img-wrapper');
        if (!carousel) return;

        const slider = carousel.querySelector('.new-all-img');
        const items = slider.querySelectorAll('.new-all-img-bl');
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let currentIndex = 0;

        // Рассчитываем ширину элемента с учетом margin
        const itemStyle = getComputedStyle(items[0]);
        const itemMargin = parseFloat(itemStyle.marginRight);
        const itemWidth = items[0].offsetWidth + itemMargin;

        // Активируем перетаскивание
        const activateDrag = (e) => {
            if (e.cancelable) e.preventDefault();
            isDragging = true;
            startPos = getPositionX(e);
            slider.style.transition = 'none';
        };

        const getPositionX = (e) => {
            return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        };

        const drag = (e) => {
            if (!isDragging) return;
            const currentPosition = getPositionX(e);
            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;
            slider.style.transform = `translateX(${currentTranslate}px)`;
        };

        const endDrag = () => {
            if (!isDragging) return;
            isDragging = false;

            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -50 && currentIndex < items.length - 1) currentIndex++;
            if (movedBy > 50 && currentIndex > 0) currentIndex--;

            setPositionByIndex();
        };

        const setPositionByIndex = () => {
            currentTranslate = -currentIndex * itemWidth;
            prevTranslate = currentTranslate;
            slider.style.transition = 'transform 0.3s ease';
            slider.style.transform = `translateX(${currentTranslate}px)`;
        };

        // Добавляем обработчики событий
        slider.addEventListener('touchstart', activateDrag);
        slider.addEventListener('touchmove', drag);
        slider.addEventListener('touchend', endDrag);
        slider.addEventListener('mousedown', activateDrag);
        slider.addEventListener('mousemove', drag);
        slider.addEventListener('mouseup', endDrag);
        slider.addEventListener('mouseleave', endDrag);
    };

    initMobileCarousel();
});


