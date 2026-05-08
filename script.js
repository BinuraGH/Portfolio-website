/**
 * BINURA AMARASINGHE — PORTFOLIO SCRIPTS
 * script.js
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     1. NAVBAR: scroll shadow + active links
     ============================================ */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop    = section.offsetTop - 80;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    const btn = document.getElementById('backToTop');
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ============================================
     2. MOBILE HAMBURGER MENU
     ============================================ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  /* ============================================
     3. SCROLL REVEAL ANIMATIONS
     ============================================ */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentNode.querySelectorAll('.reveal'));
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.08}s`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ============================================
     4. SMOOTH SCROLL for anchor links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 64;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* ============================================
     5. BACK-TO-TOP BUTTON
     ============================================ */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
// Add inside DOMContentLoaded, after the onScroll function
const scrollIndicator = document.querySelector('.scroll-indicator');
function updateScrollIndicator() {
  const heroHeight = document.getElementById('home').offsetHeight;
  if (window.scrollY > heroHeight * 0.6) {
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.pointerEvents = 'none';
  } else {
    scrollIndicator.style.opacity = '1';
    scrollIndicator.style.pointerEvents = 'auto';
  }
}
window.addEventListener('scroll', updateScrollIndicator, { passive: true });
updateScrollIndicator();
  /* ============================================
     6. CONTACT FORM — handled by Formspree
     ============================================ */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          submitBtn.style.background = '#2d7dd2';
          contactForm.reset();
          setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 4000);
        } else {
          throw new Error('Failed');
        }
      } catch (err) {
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed. Try again.';
        submitBtn.style.background = '#e53e3e';
        submitBtn.disabled = false;
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          submitBtn.style.background = '';
        }, 4000);
      }
    });
  }

});