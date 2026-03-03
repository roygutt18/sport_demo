/* ──────────────────────────────────────────────
   script.js  —  Alon Shamesh Fitness Demo
────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

    /* ── NAVBAR SCROLL ─────────────────────────── */
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
        document.getElementById('scroll-top')
            .classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    /* ── HAMBURGER / MOBILE MENU ─────────────────── */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const isOpen = mobileMenu.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        // animate bars
        const bars = hamburger.querySelectorAll('span');
        if (isOpen) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
        }
    });

    window.closeMobile = () => {
        mobileMenu.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(b => {
            b.style.transform = ''; b.style.opacity = '';
        });
    };

    // close mobile on outside click
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobile();
        }
    });

    /* ── SMOOTH SCROLL for all anchor links ───────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ── SECTION DOTS ─────────────────────────────── */
    const SECTIONS = ['hero', 'about', 'services', 'programs', 'testimonials', 'contact'];
    const dots = document.querySelectorAll('.dot');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const id = dot.dataset.section;
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const dotObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = SECTIONS.indexOf(entry.target.id);
                if (idx === -1) return;
                dots.forEach((d, i) => d.classList.toggle('active', i === idx));
            }
        });
    }, { threshold: 0.45 });

    SECTIONS.forEach(id => {
        const el = document.getElementById(id);
        if (el) dotObserver.observe(el);
    });

    /* ── REVEAL ON SCROLL ─────────────────────────── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);   // fire once
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ── COUNTER ANIMATION ───────────────────────── */
    function animateCounter(el) {
        const target = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimal || 0);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const steps = 60;
        const inc = target / steps;
        let current = 0;
        let count = 0;

        const timer = setInterval(() => {
            count++;
            current += inc;
            if (count >= steps) { current = target; clearInterval(timer); }
            el.textContent = (decimals > 0
                ? current.toFixed(decimals)
                : Math.floor(current)
            ) + suffix;
        }, duration / steps);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.rbar-num[data-target]').forEach(animateCounter);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    const resultsBar = document.getElementById('results-bar');
    if (resultsBar) counterObserver.observe(resultsBar);

    /* ── ACCESSIBILITY PANEL ─────────────────────── */
    const accBtn = document.getElementById('acc-btn');
    const accPanel = document.getElementById('acc-panel');

    accBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        accPanel.classList.toggle('open');
    });

    document.querySelectorAll('.acc-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle(btn.dataset.cls);
        });
    });

    document.querySelector('.acc-reset').addEventListener('click', () => {
        ['larger-text', 'high-contrast', 'grayscale-mode'].forEach(cls => {
            document.body.classList.remove(cls);
        });
    });

    document.addEventListener('click', (e) => {
        if (!accBtn.contains(e.target) && !accPanel.contains(e.target)) {
            accPanel.classList.remove('open');
        }
    });

    /* ── SCROLL TO TOP ───────────────────────────── */
    document.getElementById('scroll-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ── CONTACT FORM ────────────────────────────── */
    window.submitForm = (e) => {
        e.preventDefault();
        const success = document.getElementById('form-success');
        success.style.display = 'block';
        e.target.reset();
        setTimeout(() => { success.style.display = 'none'; }, 5000);
    };

    /* ── CARD TILT (subtle) ──────────────────────── */
    document.querySelectorAll('.srv-card, .testi-card, .prog-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-5px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});