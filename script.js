document.addEventListener('DOMContentLoaded', () => {
  // عناصر أساسية
  const header       = document.querySelector('.header');
  const navMenu      = document.querySelector('.nav-menu');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');

  // ===== 1) دالة سكرول سلس مع خصم ارتفاع الهيدر =====
  function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (!target) return;

    const headerH = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerH;

    window.scrollTo({ top, behavior: 'smooth' });
  }

  // ===== 2) روابط داخلية href="#..." =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href');
      if (hash && hash.length > 1) {
        e.preventDefault();
        smoothScrollTo(hash);
        navMenu?.classList.remove('active');
        mobileToggle?.classList.remove('active');
      }
    });
  });

  // ===== 3) أزرار بـ data-scroll="#sectionId" =====
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sel = btn.getAttribute('data-scroll');
      if (sel) smoothScrollTo(sel);
      navMenu?.classList.remove('active');
      mobileToggle?.classList.remove('active');
    });
  });

  // ===== 4) فتح/إغلاق منيو الموبايل =====
  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });

  // ===== 5) تأثير على الهيدر أثناء السحب =====
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255,255,255,0.95)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)';
    } else {
      header.style.background = '#fff';
      header.style.backdropFilter = 'none';
      header.style.boxShadow = 'none';
    }
  });

  // ===== 6) أنيميشن ظهور العناصر (اختياري) =====
  // أضف كلاس fade-in لأي عنصر تحب يظهر تدريجيًا.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // فعّل الأنيميشن
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ===== 7) إرسال نموذج Netlify ثم التحويل لصفحة النجاح =====
  // يعمل حتى لو شيلت action من الفورم.
  const form = document.querySelector("form[name='contact']");
  if (form) {
    // تأكيد وجود الحقل المخفي (لو اتشال بالغلط)
    if (!form.querySelector("input[name='form-name']")) {
      const hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = 'form-name';
      hidden.value = 'contact';
      form.prepend(hidden);
    }

    // دالة ترميز x-www-form-urlencoded
    const encode = (dataObj) =>
      Object.keys(dataObj)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(dataObj[k]))
        .join("&");

    form.addEventListener('submit', e => {
      e.preventDefault();

      // جمع البيانات يدويًا لضمان الصيغة الصحيحة
      const data = {
        'form-name': 'contact',
        name:    form.querySelector('[name="name"]')?.value || '',
        email:   form.querySelector('[name="email"]')?.value || '',
        phone:   form.querySelector('[name="phone"]')?.value || '',
        message: form.querySelector('[name="message"]')?.value || ''
      };

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data)
      })
      .then(res => {
        if (!res.ok) throw new Error('Submit failed');
        // تحويل لصفحة النجاح (تأكد success.html موجودة بجوار index.html)
        window.location.href = '/success.html';
      })
      .catch(() => {
        alert('⚠️ حصل خطأ أثناء الإرسال. حاول تاني.');
      });
    });
  }
});
