/**
 * BINURA AMARASINGHE — PORTFOLIO SCRIPTS
 * script.js
 *
 * Features:
 * - Sticky navbar with scroll shadow
 * - Active nav link highlight on scroll
 * - Mobile hamburger menu toggle
 * - Scroll reveal animations
 * - Back-to-top button
 * - Contact form handler
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     1. NAVBAR: scroll shadow + active links
     ============================================ */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Add shadow when scrolled
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active nav link
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

    // Back-to-top button visibility
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

  // Close menu when a link is clicked
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
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals inside the same parent
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
        const offsetTop = target.offsetTop - 64; // account for sticky navbar height
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

  /* ============================================
     6. CONTACT FORM HANDLER
     ============================================
     This is a simple front-end handler. To make
     it functional, integrate with EmailJS, Formspree,
     or a backend endpoint. See commented code below.
     ============================================ */
  const contactForm = document.getElementById('contactForm');
  const formNote    = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      formNote.style.color = '#e53e3e';
      formNote.textContent = 'Please fill in all fields.';
      return;
    }

    /* ---- OPTION A: mailto fallback (works without backend) ----
       Opens the user's email client with fields pre-filled.     */
    const mailtoLink = `mailto:binura.amarasinghe617@gmail.com`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;

    formNote.style.color = '#3cb4a0';
    formNote.textContent = '✓ Opening your email client…';
    contactForm.reset();

    /* ---- OPTION B: Formspree (replace YOUR_FORM_ID) ----
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    })
    .then(res => {
      if (res.ok) {
        formNote.style.color = '#3cb4a0';
        formNote.textContent = '✓ Message sent successfully! I will get back to you soon.';
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(() => {
      formNote.style.color = '#e53e3e';
      formNote.textContent = '✗ Something went wrong. Please email me directly.';
    });
    */
  }

  // Make handleFormSubmit globally accessible (used in inline onsubmit)
  window.handleFormSubmit = handleFormSubmit;

});