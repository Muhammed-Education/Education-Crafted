// script.js
document.addEventListener("DOMContentLoaded", () => {
  const header       = document.querySelector(".header");
  const navMenu      = document.querySelector(".nav-menu");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const overlay      = document.querySelector(".nav-overlay");

  // سكرول سلس مع خصم ارتفاع الهيدر
  function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (!target) return;
    const headerH = header ? header.offsetHeight : 0;
    const y = target.getBoundingClientRect().top + window.pageYOffset - headerH;
    window.scrollTo({ top: y, behavior: "smooth" });

    if (selector === "#contact") {
      setTimeout(() => {
        const firstInput = document.querySelector("#contact input, #contact textarea");
        firstInput && firstInput.focus();
      }, 500);
    }
  }

  // فتح/إغلاق القائمة
  function openMenu() {
    navMenu?.classList.add("active");
    mobileToggle?.classList.add("active");
    overlay?.classList.add("active");
    document.body.classList.add("lock-scroll");
    mobileToggle?.setAttribute("aria-expanded", "true");
    navMenu?.setAttribute("aria-hidden", "false");
  }
  function closeMenu() {
    navMenu?.classList.remove("active");
    mobileToggle?.classList.remove("active");
    overlay?.classList.remove("active");
    document.body.classList.remove("lock-scroll");
    mobileToggle?.setAttribute("aria-expanded", "false");
    navMenu?.setAttribute("aria-hidden", "true");
  }

  mobileToggle?.addEventListener("click", () => {
    if (navMenu?.classList.contains("active")) closeMenu();
    else openMenu();
  });
  overlay?.addEventListener("click", closeMenu);

  // روابط داخلية
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const hash = link.getAttribute("href");
      if (hash && hash.length > 1) {
        e.preventDefault();
        smoothScrollTo(hash);
        closeMenu();
      }
    });
  });

  // الأزرار بـ data-scroll
  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const sel = btn.getAttribute("data-scroll");
      if (sel) smoothScrollTo(sel);
      closeMenu();
    });
  });

  // شكل الهيدر مع السحب (اختياري)
  window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 100) {
      header.style.background = "rgba(255,255,255,0.95)";
      header.style.backdropFilter = "blur(10px)";
      header.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
    } else {
      header.style.background = "#fff";
      header.style.backdropFilter = "none";
      header.style.boxShadow = "none";
    }
  });

  // أنيميشن ظهور العناصر (اختياري)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
});
