// ============================================
// Buzz com - Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll ---
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile menu ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    function openMenu() {
        if (!navMenu || !navToggle) return;
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!navMenu || !navToggle) return;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Menu link handling
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // External link (e.g. events.html, google forms)
                if (href && !href.startsWith('#')) {
                    closeMenu();
                    // Let the browser navigate naturally - don't prevent default
                    return;
                }

                // Internal anchor link (e.g. #about)
                if (href && href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    closeMenu();
                    const target = document.querySelector(href);
                    if (target) {
                        setTimeout(() => {
                            const offset = 70;
                            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                            window.scrollTo({ top, behavior: 'smooth' });
                        }, 350); // Wait for menu close animation
                    }
                    return;
                }

                // href="#" (logo etc) - just close menu, go to top
                if (href === '#') {
                    e.preventDefault();
                    closeMenu();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }

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
        '.flow-step-3, .insta-embed-item, .faq-item, .entry-inner, ' +
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

    // --- Smooth scroll (non-menu links only) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip nav menu links - they're handled above
        if (anchor.closest('.nav-menu')) return;

        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');

            // Skip bare "#" links
            if (!href || href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
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
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            if (scrollY > window.innerHeight * 0.6) {
                fixedCta.classList.add('visible');
                document.body.classList.add('has-fixed-cta');
            } else {
                fixedCta.classList.remove('visible');
                document.body.classList.remove('has-fixed-cta');
            }
        });
    }

});
