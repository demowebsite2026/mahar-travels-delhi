document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    document.querySelectorAll('.m-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // 2. GSAP Animations
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.gsap-hero-text', {
      duration: 1.2,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });

    gsap.from('.gsap-hero-img', {
      duration: 1.4,
      scale: 0.9,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.utils.toArray('.gsap-cards').forEach(section => {
      gsap.from(section.children, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    });
  }

  // 3. Terminal Live Clock
  const tClock = document.getElementById('t-clock');
  if (tClock) {
    setInterval(() => {
      const now = new Date();
      tClock.textContent = `${now.toLocaleTimeString()} IST`;
    }, 1000);
  }

  // 4. Counter Roll
  const counters = document.querySelectorAll('.counter-num');
  let animated = false;
  const animateCounters = () => {
    if (animated) return;
    if (counters[0] && counters[0].getBoundingClientRect().top < window.innerHeight) {
      animated = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const update = () => {
          count += target / 50;
          if (count < target) {
            counter.textContent = Math.ceil(count).toLocaleString('en-IN');
            requestAnimationFrame(update);
          } else {
            counter.textContent = target.toLocaleString('en-IN');
          }
        };
        update();
      });
    }
  };
  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // 5. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
        item.classList.toggle('active');
      });
    }
  });

  // 6. Form Handler
  const form = document.getElementById('crimson-form');
  const submitBtn = document.getElementById('m-sub-btn');
  if (form && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('m-name').value;
      const phone = document.getElementById('m-phone').value;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Reserving Seat...';
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Ticket Reserved!';
        submitBtn.style.background = '#25d366';
        alert(`Thank you ${name}! Mahar Travels Channa Market travel desk will call you at ${phone}.`);
        form.reset();
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Reserve Bus Ticket';
          submitBtn.style.background = '';
        }, 4000);
      }, 1000);
    });
  }
});
