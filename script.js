document.addEventListener('DOMContentLoaded', function () {
  // ====== الموبايل منيو ======
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // ====== سكرول سلس للروابط ======
  const smoothLinks = document.querySelectorAll(".nav-menu a, .footer-links a, .cta-btn, .hero-buttons .btn-primary, .hero-buttons .btn-secondary, .solution-text .btn-primary");
  smoothLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          const headerH = document.querySelector(".header")?.offsetHeight || 0;
          const top = el.getBoundingClientRect().top + window.pageYOffset - headerH;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        navMenu?.classList.remove('active');
        mobileMenuToggle?.classList.remove('active');
      }
    });
  });

  // ====== تأثيرات بسيطة ======
  window.addEventListener('scroll', () => {
    const header = document.querySelector(".header");
    if (!header) return;
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255,255,255,0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.background = '#fff';
      header.style.backdropFilter = 'none';
    }
  });

  // ====== إرسال Netlify Forms بصيغة x-www-form-urlencoded مع تحويل لصفحة نجاح ======
  const form = document.querySelector("form[name='contact']");
  if (form) {
    // تأكد من وجود الحقل المخفي (لو اتشال بالغلط)
    if (!form.querySelector("input[name='form-name']")) {
      const hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = 'form-name';
      hidden.value = 'contact';
      form.prepend(hidden);
    }

    const encode = (dataObj) =>
      Object.keys(dataObj)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(dataObj[k]))
        .join("&");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // جمع البيانات يدويًا لضمان الصيغة
      const data = {
        "form-name": "contact",
        name: form.querySelector("[name='name']")?.value || "",
        email: form.querySelector("[name='email']")?.value || "",
        phone: form.querySelector("[name='phone']")?.value || "",
        message: form.querySelector("[name='message']")?.value || ""
      };

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data)
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed");
          // لو عايز بوب أب بدل التحويل، استبدل السطرين الجايين بـ alert
          window.location.href = "/success";
        })
        .catch(() => {
          alert("⚠️ حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
        });
    });
  }
});
