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
