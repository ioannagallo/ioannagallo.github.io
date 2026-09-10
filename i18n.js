// Simple EN/ES language toggle
// Elements opt in with data-en="..." data-es="..." (text content)
// and data-en-placeholder="..." data-es-placeholder="..." (input/textarea placeholders)

function applyLanguage(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-en]').forEach((el) => {
        const text = el.dataset[lang];
        if (text !== undefined) {
            el.textContent = text;
        }
    });

    document.querySelectorAll('[data-en-placeholder]').forEach((el) => {
        const text = el.dataset[lang + 'Placeholder'];
        if (text !== undefined) {
            el.setAttribute('placeholder', text);
        }
    });

    const toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) {
        toggleBtn.textContent = lang === 'en' ? 'EN' : 'ES';
    }

    localStorage.setItem('site-lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('site-lang') || 'es';
    applyLanguage(savedLang);

    const toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentLang = localStorage.getItem('site-lang') || 'es';
            applyLanguage(currentLang === 'en' ? 'es' : 'en');
        });
    }
});

        // Repensar la IA - Galería de fotos
            // Carrusel de galería (3 imágenes visibles)
        const carousel = document.getElementById('galeriaCarousel');
        if (carousel) {
            const track = carousel.querySelector('.carousel-track');
            const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
            const dotsContainer = carousel.querySelector('.carousel-dots');

            function getSlidesToShow() {
                if (window.innerWidth <= 600) return 1;
                if (window.innerWidth <= 900) return 2;
                return 3;
            }

            let slidesToShow = getSlidesToShow();
            let currentIndex = 0;
            const maxIndex = () => Math.max(0, slides.length - slidesToShow);

            function renderDots() {
                dotsContainer.innerHTML = '';
                for (let i = 0; i <= maxIndex(); i++) {
                    const dot = document.createElement('button');
                    dot.type = 'button';
                    dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
                    dot.addEventListener('click', () => goToSlide(i));
                    dotsContainer.appendChild(dot);
                }
            }

            function goToSlide(index) {
                currentIndex = Math.max(0, Math.min(index, maxIndex()));
                const slideWidth = slides[0].getBoundingClientRect().width + 16; // 16px = gap 1rem
                track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
                Array.from(dotsContainer.children).forEach((d, i) => d.classList.toggle('active', i === currentIndex));
            }

            carousel.querySelector('.carousel-prev').addEventListener('click', () => goToSlide(currentIndex - 1));
            carousel.querySelector('.carousel-next').addEventListener('click', () => goToSlide(currentIndex + 1));

            window.addEventListener('resize', () => {
                slidesToShow = getSlidesToShow();
                renderDots();
                goToSlide(Math.min(currentIndex, maxIndex()));
            });

            renderDots();

            // Autoplay, pausa al pasar el mouse
            let autoplay = setInterval(() => {
                goToSlide(currentIndex >= maxIndex() ? 0 : currentIndex + 1);
            }, 4000);
            carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
            carousel.addEventListener('mouseleave', () => {
                autoplay = setInterval(() => goToSlide(currentIndex >= maxIndex() ? 0 : currentIndex + 1), 4000);
            });
        }