// ============ МЕНЮ (гамбургер) ============
function toggleMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('open');
}

// ============ АНИМАЦИЯ ПРИ СКРОЛЛЕ ============
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ============ FAQ АККОРДЕОН ============
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const answer = item.querySelector('.faq-answer');
    const sign = item.querySelector('.faq-question span');
    const isOpen = answer.style.display === 'block';
    answer.style.display = isOpen ? 'none' : 'block';
    sign.textContent = isOpen ? '+' : '−';
  });
});

// ============ КАЛЬКУЛЯТОР СТОИМОСТИ ============
function calculatePrice() {
  const tax = document.getElementById('calc-tax')?.value;
  const employees = parseInt(document.getElementById('calc-employees')?.value) || 0;
  const ops = parseInt(document.getElementById('calc-ops')?.value) || 0;
  const cadr = document.getElementById('calc-cadr')?.checked || false;
  const ved = document.getElementById('calc-ved')?.checked || false;
  const vosst = document.getElementById('calc-vosst')?.checked || false;
  
  let base = 2500;
  if (employees > 0) base += employees * 1000;
  if (ops > 20) base += (ops - 20) * 50;
  if (cadr) base += 1500;
  if (ved) base += 3000;
  if (vosst) base += 2000;
  
  const result = document.getElementById('calc-result');
  if (result) {
    result.textContent = `Примерная стоимость: от ${base.toLocaleString()} ₽/мес`;
  }
}

document.querySelectorAll('#calc-tax, #calc-employees, #calc-ops, #calc-cadr, #calc-ved, #calc-vosst').forEach(el => {
  if (el) el.addEventListener('input', calculatePrice);
  if (el) el.addEventListener('change', calculatePrice);
});

// Инициализация
calculatePrice();

// ============ EMBLA CAROUSEL КЕЙСОВ ============
document.addEventListener('DOMContentLoaded', function() {
  const viewport = document.getElementById('embla-viewport');
  if (!viewport) return;
  
  const embla = EmblaCarousel(viewport, {
    loop: true,
    align: 'start',
    skipSnaps: false,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 1 },
      '(min-width: 1024px)': { slidesToScroll: 1 },
    },
  });
  
  // Кнопки навигации
  const prevBtn = document.getElementById('embla-prev');
  const nextBtn = document.getElementById('embla-next');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => embla.scrollPrev());
    nextBtn.addEventListener('click', () => embla.scrollNext());
    
    const updateButtons = () => {
      prevBtn.disabled = !embla.canScrollPrev();
      nextBtn.disabled = !embla.canScrollNext();
    };
    embla.on('select', updateButtons);
    updateButtons();
  }
  
  // Точки (dots)
  const dotsContainer = document.getElementById('embla-dots');
  if (dotsContainer) {
    const slides = viewport.querySelectorAll('.embla__slide');
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('embla__dot');
      dot.addEventListener('click', () => embla.scrollTo(idx));
      dotsContainer.appendChild(dot);
    });
    
    const updateDots = () => {
      const selectedIdx = embla.selectedScrollSnap();
      dotsContainer.querySelectorAll('.embla__dot').forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === selectedIdx);
      });
    };
    embla.on('select', updateDots);
    updateDots();
  }
});

// ============ ФИЛЬТРАЦИЯ БЛОГА ============
document.querySelectorAll('.blog-filter').forEach(btn => {
  btn.addEventListener('click', function() {
    const category = this.dataset.category;
    
    // Убираем активный класс у всех кнопок
    document.querySelectorAll('.blog-filter').forEach(b => {
      b.classList.remove('btn-primary');
      b.classList.add('btn-secondary');
    });
    // Делаем текущую кнопку активной
    this.classList.remove('btn-secondary');
    this.classList.add('btn-primary');
    
    // Показываем/скрываем статьи
    document.querySelectorAll('.blog-article').forEach(article => {
      if (category === 'all' || article.dataset.category === category) {
        article.style.display = 'block';
      } else {
        article.style.display = 'none';
      }
    });
  });
});

// Устанавливаем "Все" активной по умолчанию
const allFilter = document.querySelector('.blog-filter[data-category="all"]');
if (allFilter) {
  allFilter.classList.remove('btn-secondary');
  allFilter.classList.add('btn-primary');
}