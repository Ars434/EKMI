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
