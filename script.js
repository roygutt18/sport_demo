// JavaScript for Eliko Fit - Final Polish & UX Refinements

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header and Scroll Tracking
    const header = document.getElementById('header');

    const handleHeader = () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeader);

    // 2. Mobile Menu Logic (Dropdown)
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');

    const toggleMobileMenu = () => {
        navMenu.classList.toggle('active');

        // Toggle Icon
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    };

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // 4. Advanced Accessibility Menu Logic
    const accOpenBtn = document.getElementById('acc-open-btn');
    const accCloseBtn = document.getElementById('acc-close-btn');
    const accMenu = document.getElementById('acc-menu');
    const toggleContrastBtn = document.getElementById('toggle-contrast');
    const resetAccBtn = document.getElementById('acc-reset');
    const textIncBtn = document.getElementById('text-inc');
    const textDecBtn = document.getElementById('text-dec');

    let textScale = 1;

    const updateTextScale = () => {
        document.documentElement.style.setProperty('--text-scale', textScale);
        localStorage.setItem('peak-acc-text-scale', textScale);
    };

    const toggleAccMenu = (show) => {
        if (show) {
            accMenu.classList.add('active');
        } else {
            accMenu.classList.remove('active');
        }
    };

    accOpenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAccMenu(!accMenu.classList.contains('active'));
    });

    accCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAccMenu(false);
    });

    toggleContrastBtn.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('peak-acc-contrast', document.body.classList.contains('high-contrast'));
    });

    textIncBtn.addEventListener('click', () => {
        if (textScale < 1.4) {
            textScale += 0.1;
            updateTextScale();
        }
    });

    textDecBtn.addEventListener('click', () => {
        if (textScale > 0.8) {
            textScale -= 0.1;
            updateTextScale();
        }
    });

    resetAccBtn.addEventListener('click', () => {
        textScale = 1;
        updateTextScale();
        document.body.classList.remove('high-contrast');
        localStorage.removeItem('peak-acc-text-scale');
        localStorage.removeItem('peak-acc-contrast');
    });

    // 5. Scroll Animations
    const fadeElems = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElems.forEach(el => scrollObserver.observe(el));

    // 6. Contact Form UX
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = 'שולח...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                alert('תודה על פנייתך! נחזור אליך בהקדם לתיאום אימון היכרות.');
                contactForm.reset();
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 1800);
        });
    }

    // 7. Global Event Handlers
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleAccMenu(false);
            if (navMenu.classList.contains('active')) toggleMobileMenu();
        }
    });

    document.addEventListener('click', (e) => {
        // Close Acc Menu on outside click
        if (!accMenu.contains(e.target) && !accOpenBtn.contains(e.target)) {
            toggleAccMenu(false);
        }
        // Close Mobile Menu on outside click
        if (!header.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Run initial check
    handleHeader();
});