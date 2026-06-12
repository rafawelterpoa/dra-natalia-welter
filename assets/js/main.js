// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// Scroll reveal — observa TODOS os [data-reveal] do HTML
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

// Elementos com data-reveal no HTML
document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

// Elementos que ganham data-reveal via JS
document.querySelectorAll('.card, .step, .sobre__content, .sobre__image-wrap, .contato__info, .contato__map, .depo__card, .local__card')
  .forEach(el => {
    el.setAttribute('data-reveal', '');
    observer.observe(el);
  });

// FAQ accordion
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Contador animado nos números
function animateCounter(el, target, duration = 1400) {
  const isText = isNaN(target);
  if (isText) { el.textContent = target; return; }
  let start = 0; const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}
const numObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const strong = e.target.querySelector('strong');
    if (!strong || strong.dataset.counted) return;
    strong.dataset.counted = '1';
    const val = strong.textContent.trim();
    if (val === 'Online' || val === '100%') { return; }
    animateCounter(strong, parseInt(val.replace(/\D/g, '')));
  });
}, { threshold: 0.5 });
document.querySelectorAll('.numero__item').forEach(el => numObserver.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.style.color = '';
    if (l.getAttribute('href') === `#${current}`) {
      l.style.color = header.classList.contains('scrolled') ? 'var(--gold)' : 'var(--beige)';
    }
  });
});
