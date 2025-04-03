document.addEventListener('DOMContentLoaded', () => {
    // Инициализация приложения
    console.log('Application initialized');

    // Элементы бургер-меню
    const burgerMenuBtn = document.querySelector('.burger-menu');
    const burgerMenuOverlay = document.querySelector('.burger-menu-overlay');
    const closeButton = document.querySelector('.close-button');
    const burgerBackdrop = document.querySelector('.burger-backdrop');
    
    // Функция открытия меню
    function openMenu() {
        burgerMenuOverlay.classList.add('active');
        burgerBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        
        // Проверяем размер экрана для правильного отображения меню
        if (window.innerWidth <= 479) {
            burgerMenuOverlay.style.width = '100%';
        } else {
            burgerMenuOverlay.style.width = '320px';
        }
    }
    
    // Функция закрытия меню
    function closeMenu() {
        burgerMenuOverlay.classList.remove('active');
        burgerBackdrop.classList.remove('active');
        document.body.style.overflow = ''; // Разблокируем прокрутку
    }
    
    // Обработчики для открытия/закрытия меню
    if (burgerMenuBtn) {
        burgerMenuBtn.addEventListener('click', openMenu);
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', closeMenu);
    }
    
    // Закрываем меню при клике на фон
    if (burgerBackdrop) {
        burgerBackdrop.addEventListener('click', closeMenu);
    }
    
    // Проверяем размер экрана при изменении для правильного отображения меню
    window.addEventListener('resize', () => {
        if (burgerMenuOverlay.classList.contains('active')) {
            if (window.innerWidth <= 479) {
                burgerMenuOverlay.style.width = '100%';
            } else {
                burgerMenuOverlay.style.width = '320px';
            }
        }
    });

    // Слайдер для мобильной версии
    const mobileSlider = {
        slides: [
            { value: '50', oldPrice: '55', isSpecial: true },
            { value: '150', oldPrice: '165', isSpecial: false },
            { value: '300', oldPrice: '330', isSpecial: false },
            { value: '500', oldPrice: '550', isSpecial: false },
            { value: '1000', oldPrice: '1100', isSpecial: false }
        ],
        currentSlide: 0,
        dots: document.querySelectorAll('.dot'),
        mobileOption: document.querySelector('.mobile-credit-option'),
        
        init: function() {
            if (this.dots.length === 0 || !this.mobileOption) return;
            
            // Инициализация слайдера
            this.setupDots();
            this.showSlide(0);
            
            // Свайп для мобильных устройств
            let touchStartX = 0;
            let touchEndX = 0;
            
            this.mobileOption.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            this.mobileOption.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
            }, false);
        },
        
        setupDots: function() {
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.showSlide(index);
                });
            });
        },
        
        showSlide: function(index) {
            if (index < 0) index = this.slides.length - 1;
            if (index >= this.slides.length) index = 0;
            
            this.currentSlide = index;
            
            // Обновляем активную точку
            this.dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-selected', 'true');
                } else {
                    dot.classList.remove('active');
                    dot.setAttribute('aria-selected', 'false');
                }
            });
            
            // Обновляем содержимое слайда
            const slide = this.slides[index];
            const valueElement = this.mobileOption.querySelector('.credit-value span');
            const oldPriceElement = this.mobileOption.querySelector('.old-price');
            const offerLabel = this.mobileOption.querySelector('.offer-label');
            
            if (valueElement) valueElement.textContent = slide.value;
            if (oldPriceElement) oldPriceElement.textContent = `/${slide.oldPrice}`;
            
            // Показываем или скрываем лейбл "One time offer!"
            if (offerLabel) {
                offerLabel.style.display = slide.isSpecial ? 'block' : 'none';
            }
        },
        
        nextSlide: function() {
            this.showSlide(this.currentSlide + 1);
        },
        
        prevSlide: function() {
            this.showSlide(this.currentSlide - 1);
        },
        
        handleSwipe: function(startX, endX) {
            const threshold = 50;
            if (startX - endX > threshold) {
                // Свайп влево - следующий слайд
                this.nextSlide();
            } else if (endX - startX > threshold) {
                // Свайп вправо - предыдущий слайд
                this.prevSlide();
            }
        }
    };
    
    // Инициализируем слайдер
    mobileSlider.init();

    // Обработчик для точек переключения карточек
    const dots = document.querySelectorAll('.dot');
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Убираем активный класс со всех точек
                dots.forEach(d => {
                    d.classList.remove('active');
                    d.setAttribute('aria-selected', 'false');
                });
                // Добавляем активный класс текущей точке
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
                
                // Изменяем слайд
                mobileSlider.showSlide(index);
            });
        });
    }

    // Добавление hover эффекта для кредитных опций
    // const creditOptions = document.querySelectorAll('.credit-option');
    // if (creditOptions.length > 0) {
    //     creditOptions.forEach(option => {
    //         const button = option.querySelector('.buy-btn');
    //         const offerLabel = option.querySelector('.offer-label');
    //         
    //         if (button && !option.classList.contains('special')) {
    //             // Показываем надпись "One time offer!" при наведении на кнопку
    //             button.addEventListener('mouseenter', () => {
    //                 button.classList.add('hover');
    //                 if (offerLabel) {
    //                     offerLabel.style.opacity = '1';
    //                     offerLabel.style.visibility = 'visible';
    //                 }
    //             });
    //             
    //             button.addEventListener('mouseleave', () => {
    //                 button.classList.remove('hover');
    //                 if (offerLabel) {
    //                     offerLabel.style.opacity = '0';
    //                     offerLabel.style.visibility = 'hidden';
    //                 }
    //             });
    //         }
    //     });
    // }
    
    // Таймер обратного отсчета - 10 минут (600 секунд)
    const timer = {
        timerElement: document.querySelector('.timer span'),
        totalSeconds: 600, // 10 минут
        interval: null,
        
        start: function() {
            if (!this.timerElement) return;
            
            this.interval = setInterval(() => {
                this.totalSeconds--;
                
                if (this.totalSeconds <= 0) {
                    // Перезапуск таймера
                    this.totalSeconds = 600;
                }
                
                this.updateDisplay();
            }, 1000);
            
            // Начальное отображение
            this.updateDisplay();
        },
        
        updateDisplay: function() {
            const hours = Math.floor(this.totalSeconds / 3600);
            const minutes = Math.floor((this.totalSeconds % 3600) / 60);
            const seconds = this.totalSeconds % 60;
            
            const formattedTime = 
                this.padZero(hours) + ' : ' + 
                this.padZero(minutes) + ' : ' + 
                this.padZero(seconds);
                
            this.timerElement.textContent = formattedTime;
        },
        
        padZero: function(num) {
            return num < 10 ? '0' + num : num;
        }
    };
    
    // Запускаем таймер
    timer.start();
    
    // Код для эффекта параллакса на шариках
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Вычисляем нормализованные координаты мыши (от -1 до 1)
        const normalizedX = (mouseX / windowWidth) * 2 - 1;
        const normalizedY = (mouseY / windowHeight) * 2 - 1;
        
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0.1;
            const offsetX = normalizedX * speed * 100;
            const offsetY = normalizedY * speed * 50;
            
            // Применяем смещение через transform для более плавного эффекта
            layer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
});
