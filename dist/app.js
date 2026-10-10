const body = document.body;
const menuButton = document.querySelector('.menu-button');
const mobileLinks = document.querySelectorAll('.mobile-nav a');
const searchPanel = document.getElementById('searchPanel');
const searchButton = document.getElementById('searchButton');
const searchClose = document.querySelector('.search-close');
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
let cart = 0;

menuButton.addEventListener('click', () => {
  const open = body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

mobileLinks.forEach(link => link.addEventListener('click', () => {
  body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

function toggleSearch(open) {
  searchPanel.classList.toggle('open', open);
  searchPanel.setAttribute('aria-hidden', String(!open));
  if (open) setTimeout(() => document.getElementById('siteSearch').focus(), 250);
}

searchButton.addEventListener('click', () => toggleSearch(true));
searchClose.addEventListener('click', () => toggleSearch(false));
searchPanel.addEventListener('click', event => { if (event.target === searchPanel) toggleSearch(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') toggleSearch(false); });

const arabicNumber = value => new Intl.NumberFormat('ar-EG').format(value);
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('.quick-add').forEach(button => button.addEventListener('click', () => {
  cart += 1;
  cartCount.textContent = arabicNumber(cart);
  showToast(`تمت إضافة ${button.dataset.product} إلى السلة`);
}));

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.product-card').forEach(card => {
    card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
  });
}));

document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  showToast('شكرًا لك — أهلاً بك في مجتمع أثر');
  event.currentTarget.reset();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
