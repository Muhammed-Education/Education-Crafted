// script.js
document.addEventListener("DOMContentLoaded", () => {
  // عناصر ثابتة
  const header       = document.querySelector(".header");
  const navMenu      = document.querySelector(".nav-menu");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const overlay      = document.querySelector(".nav-overlay");

  // فعّل وضع السايدبار (يعزل ستايل القائمة عن أي ستايل قديم)
  header?.classList.add("drawer-enabled");

  // ===== Helpers =====
  const hasEl = el => el && typeof el !== "undefined";

  function openMenu() {
    if (!hasEl(navMenu)) return;
    navMenu.classList.add("is-active");
    mobileToggle?.classList.add("active");
    overlay?.classList.add("active");
    document.body.classList.add("lock-scroll");
    mobileToggle?.setAttribute("aria-expanded", "true");
    navMenu?.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    if (!hasEl(navMenu)) return;
    navMenu.classList.remove("is-active");
    mobileToggle?.classList.remove("active");
    overlay?.classList.remove("active");
    document.body.classList.remove("lock-scroll");
    mobileToggle?.setAttribute("aria-expanded", "false");
    navMenu?.setAttribute("aria-hidden", "true");
  }

  function toggleMenu() {
    if (navMenu?.classList.contains("is-active")) closeMenu();
    else openMenu();
  }

  // سكرول سلس مع خصم ارتفاع الهيدر
  function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (!target) return;

    const headerH = header ? header.offsetHeight : 0;
    const y = target.getBoundingClientRect().top + window.pageYOffset - headerH;

    window.scrollTo({ top: y, behavior: "smooth" });

    // تركيز على أول حقل عندما نذهب لقسم التواصل
    if (selector === "#contact") {
      setTimeout(() => {
        const firstInput = document.querySelector("#contact input, #contact textarea");
        firstInput && firstInput.focus();
      }, 400);
    }
  }

  // لو كان في هاش في العنوان عند التحميل (#services مثلاً) ننزل له
  if (window.location.hash && window.location.hash.length > 1) {
    const initialHash = window.location.hash;
    // نأخر شوية لحد الهيدر يستقر
    setTimeout(() => smoothScrollTo(initialHash), 150);
  }

  // ===== Events =====
  // زر فتح/غلق القائمة
  mobileToggle?.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // الضغط على الخلفية يغلق القائمة
  overlay?.addEventListener("click", closeMenu);

  // سكرول سلس للروابط اللي تبدأ بـ #
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      if (hash && hash !== "#") {
        e.preventDefault();
        smoothScrollTo(hash);
        closeMenu();
        // حدّث عنوان الصفحة (اختياري)
        history.pushState(null, "", hash);
      }
    });
  });

  // سكرول سلس للأزرار اللي عليها data-scroll="#id"
  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const sel = btn.getAttribute("data-scroll");
      if (sel) {
        smoothScrollTo(sel);
        closeMenu();
        history.pushState(null, "", sel);
      }
    });
  });

  // تحسين شكل الهيدر أثناء التمرير (اختياري)
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

  // تحسين: لو ضغط المستخدم على أي عنصر من القائمة (li > a) نقفلها
  document.querySelectorAll(".nav-menu a").forEach(a => {
    a.addEventListener("click", () => closeMenu());
  });

  // منع السلوك الافتراضي للروابط الفارغة (#)
  document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener("click", (e) => e.preventDefault());
  });
});
