// نظام الترجمة (i18n) لموقع DeepLook
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ar';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.setLanguage(this.currentLang);
        this.setupLanguageToggle();
    }

    async loadTranslations() {
        try {
            // تحميل الترجمات العربية
            const arResponse = await fetch('./locales/ar.json');
            this.translations.ar = await arResponse.json();

            // تحميل الترجمات الإنجليزية
            const enResponse = await fetch('./locales/en.json');
            this.translations.en = await enResponse.json();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // تحديث اتجاه النص
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // تحديث النصوص
        this.updateTexts();
        
        // تحديث زر تبديل اللغة
        this.updateLanguageToggle();
    }

    updateTexts() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // تحديث العنوان والوصف
        const title = this.getTranslation('site.title');
        const description = this.getTranslation('site.description');
        
        if (title) document.title = title;
        if (description) {
            const metaDesc = document.querySelector('meta[name=\"description\"]');
            if (metaDesc) metaDesc.content = description;
        }
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }

    setupLanguageToggle() {
        const toggleBtn = document.getElementById('language-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
                this.setLanguage(newLang);
            });
        }
    }

    updateLanguageToggle() {
        const toggleBtn = document.getElementById('language-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = this.getTranslation('nav.language');
        }
    }

    // دالة مساعدة للحصول على الترجمة من JavaScript
    t(key) {
        return this.getTranslation(key) || key;
    }
}

// تهيئة نظام الترجمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
});

