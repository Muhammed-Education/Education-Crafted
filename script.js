document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll(".nav-menu a, .footer-links a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector(".header").offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Smooth scrolling for hero buttons
    document.querySelectorAll(".hero-buttons .btn-primary").forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            const targetElement = document.getElementById("services"); // Target the services section
            if (targetElement) {
                const headerOffset = document.querySelector(".header").offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    document.querySelectorAll(".hero-buttons .btn-secondary").forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            const targetElement = document.getElementById("contact"); // Target the contact section
            if (targetElement) {
                const headerOffset = document.querySelector(".header").offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener("click", function() {
            navMenu.classList.toggle("active");
            mobileMenuToggle.classList.toggle("active");
        });

        // Close mobile menu when a link is clicked
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", function() {
                navMenu.classList.remove("active");
                mobileMenuToggle.classList.remove("active");
            });
        });
    }

    // Typing effect for hero title
    const heroTitle = document.querySelector(".hero-text h1");
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = ""; // Clear content initially
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Typing speed
            }
        }
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }

    // Intersection Observer for fade-in-slide-up animation
    const fadeInElements = document.querySelectorAll(
        ".problem-section h2, .problem-section .section-subtitle, .stat-card,"
        + ".solution-text p, .solution-text .btn-primary,"
        + ".services h2, .services .section-subtitle, .service-card,"
        + ".features h2, .feature-card,"
        + ".process h2, .step,"
        + ".contact h2, .contact .section-subtitle, .contact-form, .contact-item"
    );

    const observerOptions = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition = "opacity 1s ease-out, transform 1s ease-out";
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // Custom Cursor (for desktop only)
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    document.body.appendChild(customCursor);

    document.addEventListener("mousemove", e => {
        customCursor.style.left = e.clientX + "px";
        customCursor.style.top = e.clientY + "px";
    });

    document.querySelectorAll("a, button, .cta-btn, .nav-menu a, .hero-buttons button, .stat-card, .service-card, .feature-card, .step, .contact-item, .floating-whatsapp").forEach(el => {
        el.addEventListener("mouseenter", () => {
            customCursor.classList.add("hover");
        });
        el.addEventListener("mouseleave", () => {
            customCursor.classList.remove("hover");
        });
    });

    // Floating WhatsApp Button
    const floatingWhatsapp = document.createElement("a");
    floatingWhatsapp.href = "https://wa.me/201097833578?text=مرحباً، أريد الاستفسار عن خدماتكم التعليمية";
    floatingWhatsapp.target = "_blank";
    floatingWhatsapp.classList.add("floating-whatsapp" );
    floatingWhatsapp.innerHTML = `<i class="fab fa-whatsapp"></i>`;
    document.body.appendChild(floatingWhatsapp);

});
