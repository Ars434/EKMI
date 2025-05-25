document.addEventListener('DOMContentLoaded', () => {
    // Создаем контейнеры для каждой кнопки+контента
    const buttons = document.querySelectorAll('.har-m-all button');
    const panes = document.querySelectorAll('.specs-pane-m');
    const container = document.querySelector('.har-m-all');

    // Перемещаем контент рядом с кнопками
    buttons.forEach((button, index) => {
        // Создаем контейнер для кнопки и контента
        const wrapper = document.createElement('div');
        wrapper.className = 'button-content-wrapper';

        // Перемещаем кнопку и контент в новый контейнер
        wrapper.appendChild(button.cloneNode(true));
        wrapper.appendChild(panes[index].cloneNode(true));

        // Заменяем оригинальные элементы
        container.replaceChild(wrapper, button);
        panes[index].remove();
    });

    // Обновляем селекторы после перемещения элементов
    const wrappers = document.querySelectorAll('.button-content-wrapper');

    // Функция для переключения контента
    function switchContent(index) {
        wrappers.forEach((wrapper, i) => {
            const pane = wrapper.querySelector('.specs-pane-m');
            if(i === index) {
                pane.style.display = 'block';
                wrapper.classList.add('active');
            } else {
                pane.style.display = 'none';
                wrapper.classList.remove('active');
            }
        });
    }

    // Добавляем обработчики событий
    wrappers.forEach((wrapper, index) => {
        const button = wrapper.querySelector('button');
        button.addEventListener('click', () => {
            switchContent(index);
        });
    });

    // Активируем первую кнопку по умолчанию
    switchContent(0);
});

















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
