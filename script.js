document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".nav-menu a, .footer-links a");
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector(".header").offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // Hero buttons functionality
    const heroButtons = document.querySelectorAll(".hero-buttons .btn-primary, .hero-buttons .btn-secondary");
    heroButtons.forEach(button => {
        button.addEventListener("click", function() {
            let targetId;
            if (this.textContent.includes("اكتشف خدماتنا")) {
                targetId = "services";
            } else if (this.textContent.includes("تواصل معنا")) {
                targetId = "contact";
            }
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector(".header").offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // CTA buttons functionality
    const ctaButtons = document.querySelectorAll(".cta-btn, .solution-text .btn-primary");
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ✅ Netlify Form AJAX Submit
    const contactForm = document.querySelector("form[name='contact']");
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);

            fetch("/", {
                method: "POST",
                body: formData,
            })
            .then(() => {
                alert("🎉 تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
                contactForm.reset();
            })
            .catch(() => {
                alert("⚠️ حدث خطأ أثناء إرسال الرسالة، حاول مرة أخرى.");
            });
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(".stat-card, .service-card, .feature-card, .step, .contact-item");
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector(".header");
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });

    // Counter animation
    const counters = document.querySelectorAll(".stat-card h3");
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + '%';
                }, 30);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Hover effects
    const cards = document.querySelectorAll(".stat-card, .service-card, .feature-card");
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
