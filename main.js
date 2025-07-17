// الملف الرئيسي لـ JavaScript في موقع DeepLook

// تهيئة AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // تهيئة AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // تهيئة Swiper للكاروسيل
    initializeSwiper();
    
    // تهيئة القائمة المتجاوبة
    initializeMobileMenu();
    
    // تهيئة الشريط الثابت
    initializeStickyHeader();
    
    // تهيئة حماية المحتوى
    initializeContentProtection();
    
    // تهيئة الوضع الليلي
    initializeDarkMode();
    
    // تهيئة نماذج الاتصال
    initializeContactForms();
});

// تهيئة Swiper للكاروسيل
function initializeSwiper() {
    // كاروسيل قصص النجاح
    const caseStudiesSwiper = new Swiper('.case-studies-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // كاروسيل المنتجات
    const productsSwiper = new Swiper('.products-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.products-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            }
        }
    });
}

// تهيئة القائمة المتجاوبة
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('hidden');
            
            if (isOpen) {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });

        // إغلاق القائمة عند النقر على رابط
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }
}

// تهيئة الشريط الثابت
function initializeStickyHeader() {
    const header = document.getElementById('main-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-lg');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-lg');
                header.classList.add('bg-transparent');
            }
        });
    }
}

// تهيئة حماية المحتوى
function initializeContentProtection() {
    // تعطيل النقر بزر الماوس الأيمن على الصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });

    // تعطيل اختصارات لوحة المفاتيح للحفظ
    document.addEventListener('keydown', (e) => {
        // تعطيل Ctrl+S, Ctrl+A, Ctrl+U, F12
        if ((e.ctrlKey && (e.key === 's' || e.key === 'a' || e.key === 'u')) || e.key === 'F12') {
            e.preventDefault();
        }
    });

    // إضافة طبقة حماية شفافة للصور المهمة
    const protectedImages = document.querySelectorAll('.protected-image');
    protectedImages.forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative inline-block';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-transparent cursor-pointer';
        wrapper.appendChild(overlay);
    });
}

// تهيئة الوضع الليلي
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);
        });
    }
}

// تهيئة نماذج الاتصال
function initializeContactForms() {
    const contactForms = document.querySelectorAll('.contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // عرض رسالة نجاح (يمكن استبدالها بإرسال حقيقي)
            showSuccessMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            
            // إعادة تعيين النموذج
            form.reset();
        });
    });
}

// عرض رسالة نجاح
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    // عرض الرسالة
    setTimeout(() => {
        successDiv.classList.remove('translate-x-full');
    }, 100);
    
    // إخفاء الرسالة بعد 5 ثوان
    setTimeout(() => {
        successDiv.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 5000);
}

// دالة لتحديث العداد
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// تهيئة العدادات عند ظهورها
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// تهيئة العدادات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeCounters);

// دالة لتحميل المزيد من المحتوى (للمدونة والمنتجات)
function loadMore(type, page = 1) {
    // محاكاة تحميل المحتوى
    const loadingSpinner = document.getElementById(`${type}-loading`);
    const loadMoreBtn = document.getElementById(`${type}-load-more`);
    
    if (loadingSpinner) loadingSpinner.classList.remove('hidden');
    if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    
    setTimeout(() => {
        // إضافة المحتوى الجديد هنا
        if (loadingSpinner) loadingSpinner.classList.add('hidden');
        if (loadMoreBtn) loadMoreBtn.classList.remove('hidden');
    }, 1500);
}

// تهيئة Tawk.to للمحادثة الفورية
window.Tawk_API = window.Tawk_API || {};
window.Tawk_LoadStart = new Date();

// يمكن إضافة معرف Tawk.to الحقيقي هنا
// (function(){
//     var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
//     s1.async=true;
//     s1.src='https://embed.tawk.to/YOUR_TAWK_ID/default';
//     s1.charset='UTF-8';
//     s1.setAttribute('crossorigin','*');
//     s0.parentNode.insertBefore(s1,s0);
// })();

