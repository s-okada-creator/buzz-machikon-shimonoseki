// ============================================
// BUZZ - Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile menu ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    function openMenu() {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- FAQ accordion ---
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // --- Scroll fade-in ---
    const fadeElements = document.querySelectorAll(
        '.section-header, .about-card, .about-message, .event-card, ' +
        '.flow-step, .insta-embed-item, .voice-card, .faq-item, .entry-inner, ' +
        '.contact-inner, .mid-cta-inner'
    );

    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 60);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 70;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Fixed CTA (mobile) ---
    const fixedCta = document.getElementById('fixedCta');
    if (fixedCta) {
        let lastScrollY = 0;

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            // Show after scrolling past the hero
            if (scrollY > window.innerHeight * 0.6) {
                fixedCta.classList.add('visible');
                document.body.classList.add('has-fixed-cta');
            } else {
                fixedCta.classList.remove('visible');
                document.body.classList.remove('has-fixed-cta');
            }
            lastScrollY = scrollY;
        });
    }

    // --- Contact form ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('#contact-name').value.trim();
            const email = contactForm.querySelector('#contact-email').value.trim();
            const message = contactForm.querySelector('#contact-message').value.trim();

            if (!name || !email || !message) {
                alert('すべての項目を入力してください。');
                return;
            }

            // mailto fallback - opens user's email client
            const subject = encodeURIComponent('【BUZZ】お問い合わせ');
            const body = encodeURIComponent(
                'お名前: ' + name + '\n' +
                'メールアドレス: ' + email + '\n\n' +
                '【お問い合わせ内容】\n' + message
            );
            window.location.href = 'mailto:buzz_com2025@example.com?subject=' + subject + '&body=' + body;

            alert('メールアプリが開きます。送信をお願いいたします。');
        });
    }

});
