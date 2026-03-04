// ===== CINEMATIC PRELOADER (ULTRA LUXURY) =====
function hidePreloader() {
  const pre = document.getElementById('preloader');
  if (!pre) return;

  // Phase 1: Let logo display (0.6s) then start lifting curtains
  setTimeout(() => {
    pre.classList.add('ready');
  }, 800);

  // Phase 2: Curtains lift in ~1.95s after 'ready' added.
  // Total: 800 + 2100 = 2900ms — reveal page content
  setTimeout(() => {
    pre.style.display = 'none';
    document.body.classList.add('ready');   // triggers hero text reveals
    setTimeout(() => {
      // init after 1 frame to ensure layout is stable
      initRevealAnimations();
      initSliderControls();
      initMagneticButtons();
    }, 16);
  }, 2900);
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
  const btns = document.querySelectorAll('.btn-primary, .btn-outline, .logo');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const position = btn.getBoundingClientRect();
      const x = e.pageX - position.left - position.width / 2;
      const y = e.pageY - position.top - position.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseout', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ===== DYNAMIC PAGE TRANSITIONS =====
const PAGE_META = {
  'index.html': { title: 'Maison Home', desc: 'The 2025 Luxury Edit' },
  'shop.html': { title: 'Boutique', desc: 'Curated Artisan Exhibits' },
  'collections.html': { title: 'Lookbook', desc: 'Editorial Visual Stories' },
  'about.html': { title: 'Heritage', desc: 'Legacy of Excellence' },
  'contact.html': { title: 'Concierge', desc: 'Bespoke Private Service' }
};

function initPageTransitions() {
  const shade = document.querySelector('.page-shade');
  const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not(.no-transition)');
  if (!shade) return;

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Detect if it's an internal HTML link
      const isInternal = href && (href.endsWith('.html') || !href.includes('.') || href.startsWith('./') || href.startsWith('/'));
      if (!isInternal || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

      const filename = (href.split('/').pop() || 'index.html').split('?')[0];
      e.preventDefault();

      const meta = PAGE_META[filename] || { title: 'Maison CN', desc: 'Luxury Collective' };

      shade.innerHTML = `
        <div class="shade-content">
          <div class="shade-logo">CN</div>
          <div class="shade-line"></div>
          <h2 class="shade-title">${meta.title}</h2>
          <p class="shade-desc">${meta.desc}</p>
        </div>
      `;

      shade.classList.remove('exit');
      shade.classList.add('active');

      setTimeout(() => {
        window.location.href = href;
      }, 920);
    });
  });

  // Incoming transition reveal
  shade.classList.add('exit');
  setTimeout(() => {
    shade.classList.remove('active', 'exit');
  }, 1000);
}

// ===== LUXURY SLIDER CONTROLS (FIXED & ENHANCED) =====
function initSliderControls() {
  const grid = document.querySelector('.horizontal-grid');
  if (!grid) return;

  const section = grid.closest('.horizontal-scroll-section');
  const nextBtn = section?.querySelector('.slider-btn.next');
  const prevBtn = section?.querySelector('.slider-btn.prev');

  // Card width for one full step
  const getCardWidth = () => {
    const card = grid.querySelector('.product-card');
    return card ? card.offsetWidth + 24 : 360;
  };

  // Smooth scroll function
  const slideTo = (dir) => {
    const step = getCardWidth();
    grid.scrollBy({ left: dir * step, behavior: 'smooth' });
    updateArrows();
  };

  // Arrow state
  const updateArrows = () => {
    if (!prevBtn || !nextBtn) return;
    prevBtn.style.opacity = grid.scrollLeft <= 10 ? '0.3' : '1';
    nextBtn.style.opacity = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10 ? '0.3' : '1';
  };

  if (nextBtn) nextBtn.addEventListener('click', () => slideTo(1));
  if (prevBtn) prevBtn.addEventListener('click', () => slideTo(-1));

  grid.addEventListener('scroll', updateArrows, { passive: true });
  updateArrows();

  // === DRAG to scroll (mouse) ===
  let isDown = false, startX = 0, scrollStart = 0, hasDragged = false;

  grid.addEventListener('mousedown', (e) => {
    isDown = true;
    hasDragged = false;
    startX = e.pageX - grid.offsetLeft;
    scrollStart = grid.scrollLeft;
    grid.style.cursor = 'grabbing';
    grid.style.userSelect = 'none';
  });

  grid.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - grid.offsetLeft;
    const delta = (startX - x) * 1.5;
    if (Math.abs(delta) > 5) hasDragged = true;
    grid.scrollLeft = scrollStart + delta;
  });

  const endDrag = () => {
    isDown = false;
    grid.style.cursor = 'grab';
    grid.style.userSelect = '';
  };

  grid.addEventListener('mouseup', endDrag);
  grid.addEventListener('mouseleave', endDrag);

  // Prevent clicks during drag
  grid.addEventListener('click', (e) => {
    if (hasDragged) e.stopImmediatePropagation();
  }, true);

  // === TOUCH SWIPE ===
  let touchStartX = 0;
  grid.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  grid.addEventListener('touchend', (e) => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) slideTo(delta > 0 ? 1 : -1);
  }, { passive: true });

  // Cursor style
  grid.style.cursor = 'grab';

  // Keyboard arrow nav
  grid.setAttribute('tabindex', '0');
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') slideTo(1);
    if (e.key === 'ArrowLeft') slideTo(-1);
  });
}

// ===== MAGNETIC LOGO =====
function initMagneticLogo() {
  const logo = document.querySelector('.logo.magnetic-hover');
  if (!logo) return;

  logo.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = logo.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.4;
    const y = (clientY - (top + height / 2)) * 0.4;
    logo.style.transform = `translate(${x}px, ${y}px)`;
  });

  logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'translate(0, 0)';
  });
}

// ===== CUSTOM CURSOR & SCROLL PROGRESS =====
// ===== DUAL-LAYER CUSTOM CURSOR (ULTRA SMOOTH) =====
function initCinematicUI() {
  const cursor = document.querySelector('.custom-cursor');
  const progress = document.querySelector('.scroll-progress');

  // Inject the ring element if missing
  let ring = document.querySelector('.custom-cursor-ring');
  if (!ring && cursor) {
    ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(ring);
  }

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Smooth lagging ring via rAF
  function animateCursor() {
    const ease = 0.22; // Snappier
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;

    if (cursor) {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }
    if (ring) {
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover state
  const interactives = document.querySelectorAll('a, button, .magnetic-hover, .product-card, .split-side, .logo');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor?.classList.add('hover');
      ring?.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor?.classList.remove('hover');
      ring?.classList.remove('hover');
    });
  });

  // Scroll Progress
  window.addEventListener('scroll', () => {
    if (progress) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progress.style.width = scrolled + "%";
    }
  }, { passive: true });
}


// ===== SHOP CHIP FILTERING =====
function filterByChip(cat) {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(c => c.classList.remove('active'));
  // Note: event is deprecated, but used in existing logic
  if (window.event) window.event.target.classList.add('active');

  const products = document.querySelectorAll('.product-card');
  products.forEach(p => {
    if (cat === 'all' || p.dataset.category === cat) {
      p.style.display = 'block';
      p.classList.add('fade-in');
    } else {
      p.style.display = 'none';
    }
  });
}

// ===== REVEAL ON SCROLL =====

function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal, .story-img-wrap, .seasonal-left, .seasonal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(r => observer.observe(r));
}

// ===== NAVBAR: SCROLL GLASS + MOBILE DRAWER =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  // Scroll: add 'scrolled' glass class
  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      if (navbar.classList.contains('transparent') === false) {
        navbar.classList.add('transparent');
      }
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load

  // Mobile drawer toggle
  const openMenu = () => {
    hamburger?.classList.add('open');
    mobileMenu?.classList.add('open');
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  mobileOverlay?.addEventListener('click', closeMenu);

  // Close on mobile link click
  mobileMenu?.querySelectorAll('.nav-link, a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ===== PARALLAX EFFECTS =====
function initParallax() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scroll = window.pageYOffset;

        // Hero Parallax — gentle 0.3 factor
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
          heroBg.style.transform = `scale(1.12) translateY(${scroll * 0.3}px)`;
        }

        // Story image parallax
        const storyImg = document.querySelector('.story-img-wrap img');
        if (storyImg) {
          const rect = storyImg.parentElement.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const shift = (rect.top - window.innerHeight / 2) * 0.08;
            storyImg.style.transform = `translateY(${shift}px) scale(1.12)`;
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMagneticLogo();
  initCinematicUI();
  initRevealAnimations();
  initPageTransitions();
  initParallax();
});

window.addEventListener('load', hidePreloader);

// Fail-safe: Hide preloader after 4 seconds regardless
setTimeout(hidePreloader, 4000);


// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
const isLightPage = navbar?.classList.contains('light-nav-page');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (isLightPage) {
    navbar.classList.add('light-nav');
  } else {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  }
});

// Mobile menu logic moved to initNavbar()

// ===== CART SYSTEM =====
let cart = JSON.parse(localStorage.getItem('cn_cart') || '[]');

function saveCart() { localStorage.setItem('cn_cart', JSON.stringify(cart)); }

function updateCartUI() {
  const count = cart.reduce((a, b) => a + b.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
  renderCartItems();
  updateCartTotal();
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p><a href="shop.html" class="btn-dark" style="margin-top:20px;font-size:0.75rem;padding:12px 24px;display:inline-flex;">Shop Now</a></div>`;
    return;
  }
  container.innerHTML = cart.map((item, i) => `
    <div class="cart-item" id="cart-item-${i}">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.style.background='#f5f3ee'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">LKR ${(item.price * item.qty).toLocaleString()}</div>
        <div class="cart-item-size">Size: ${item.size || 'M'}</div>
        <div class="cart-qty">
          <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})"><i class="fas fa-times"></i></button>
    </div>
  `).join('');
}

function updateCartTotal() {
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const el = document.getElementById('cartTotal');
  if (el) el.textContent = `LKR ${total.toLocaleString()}`;
}

function addToCart(name, price, img, size = 'M') {
  const existing = cart.find(i => i.name === name && i.size === size);
  if (existing) { existing.qty++; }
  else { cart.push({ name, price, img, size, qty: 1 }); }
  saveCart();
  updateCartUI();
  showToast(`${name} added to cart!`);
  openCart();
}

function changeQty(i, delta) {
  cart[i].qty += delta;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  saveCart();
  updateCartUI();
}

function removeFromCart(i) {
  cart.splice(i, 1);
  saveCart();
  updateCartUI();
}

// Cart Sidebar
const cartSidebar = document.querySelector('.cart-sidebar');
const overlayEl = document.querySelector('.overlay');

function openCart() {
  cartSidebar?.classList.add('open');
  overlayEl?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartSidebar?.classList.remove('open');
  overlayEl?.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelector('.cart-icon')?.addEventListener('click', openCart);
document.querySelector('.cart-close')?.addEventListener('click', closeCart);
overlayEl?.addEventListener('click', closeCart);

// ===== SIZE MODAL =====
let currentProduct = null;
let selectedSize = 'M';

function openSizeModal(name, price, img) {
  currentProduct = { name, price, img };
  selectedSize = 'M';
  document.querySelectorAll('.size-btn').forEach(b => {
    b.classList.remove('selected');
    if (b.dataset.size === 'M') b.classList.add('selected');
  });
  document.getElementById('sizeModal')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSizeModal() {
  document.getElementById('sizeModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedSize = btn.dataset.size;
  });
});
document.getElementById('confirmSize')?.addEventListener('click', () => {
  if (currentProduct) {
    addToCart(currentProduct.name, currentProduct.price, currentProduct.img, selectedSize);
    closeSizeModal();
  }
});
document.querySelector('.size-modal-close')?.addEventListener('click', closeSizeModal);
document.querySelector('.size-modal-bg')?.addEventListener('click', closeSizeModal);

// ===== WISHLIST =====
let wishlist = JSON.parse(localStorage.getItem('cn_wishlist') || '[]');

function toggleWishlist(btn, name) {
  const index = wishlist.indexOf(name);
  if (index > -1) {
    wishlist.splice(index, 1);
    btn.innerHTML = '<i class="far fa-heart"></i>';
    showToast('Removed from Boutique Wishlist');
  } else {
    wishlist.push(name);
    btn.innerHTML = '<i class="fas fa-heart" style="color:#e74c3c"></i>';
    showToast('Added to Boutique Wishlist ❤️');
  }
  localStorage.setItem('cn_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
}

function updateWishlistUI() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const card = btn.closest('.product-card');
    const name = card?.dataset.name;
    if (name && wishlist.includes(name)) {
      btn.innerHTML = '<i class="fas fa-heart" style="color:#e74c3c"></i>';
    } else {
      btn.innerHTML = '<i class="far fa-heart"></i>';
    }
  });
}

// Ensure wishlist UI is correct on load
window.addEventListener('DOMContentLoaded', updateWishlistUI);

// ===== TOAST =====
function showToast(msg, icon = 'fa-check-circle') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas ${icon}"></i> ${msg}`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ===== TESTIMONIAL SLIDER =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.t-dot');

function showTestimonial(n) {
  if (testimonials.length === 0) return;
  testimonials.forEach(t => t.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentTestimonial = (n + testimonials.length) % testimonials.length;
  testimonials[currentTestimonial]?.classList.add('active');
  dots[currentTestimonial]?.classList.add('active');
}

// ===== SEARCH SYSTEM =====
const searchBtn = document.querySelector('.nav-icon .fa-search')?.parentElement;
const searchModal = document.createElement('div');
searchModal.className = 'search-overlay';
searchModal.innerHTML = `
  <div class="search-modal">
    <button class="search-close"><i class="fas fa-times"></i></button>
    <div class="search-container">
      <h2 class="section-title">Discover Maison</h2>
      <div class="search-input-wrap">
        <input type="text" id="globalSearch" placeholder="Search for silk, suits, collections..." autofocus>
        <div class="search-line"></div>
      </div>
      <div id="searchResults" class="search-results-mini"></div>
    </div>
  </div>
`;
document.body.appendChild(searchModal);

searchBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  searchModal.classList.add('open');
  document.getElementById('globalSearch').focus();
});

document.querySelector('.search-close')?.addEventListener('click', () => {
  searchModal.classList.remove('open');
});

document.getElementById('globalSearch')?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const results = document.getElementById('searchResults');
  if (query.length < 2) { results.innerHTML = ''; return; }

  // Logic to find products in static grid (common in all pages)
  const products = [...document.querySelectorAll('.product-card')].map(c => ({
    name: c.dataset.name,
    img: c.querySelector('img').src,
    price: c.dataset.price
  })).filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i); // Unique names

  const filtered = products.filter(p => p.name.toLowerCase().includes(query)).slice(0, 5);

  results.innerHTML = filtered.length ? filtered.map(p => `
    <div class="search-result-item" onclick="openDetailModal('${p.name}', ${p.price}, '${p.img}')">
      <img src="${p.img}" alt="${p.name}">
      <div>
        <h4>${p.name}</h4>
        <span>LKR ${parseInt(p.price).toLocaleString()}</span>
      </div>
    </div>
  `).join('') : '<p class="no-results">The Maison has no matches for your inquiry.</p>';
});

dots.forEach((dot, i) => dot.addEventListener('click', () => showTestimonial(i)));
if (testimonials.length > 0) {
  setInterval(() => showTestimonial(currentTestimonial + 1), 5000);
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// ===== PRODUCT FILTER (Shop Page) =====
function filterProducts() {
  const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const sortVal = document.getElementById('shopSort')?.value || 'featured';
  const checkedCats = [...document.querySelectorAll('.cat-filter:checked')].map(c => c.value);
  const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
  const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;

  let cards = [...document.querySelectorAll('.product-card')];

  cards.forEach(card => {
    const name = card.dataset.name?.toLowerCase() || '';
    const cat = card.dataset.category || '';
    const price = parseFloat(card.dataset.price) || 0;
    const matchSearch = !search || name.includes(search);
    const matchCat = checkedCats.length === 0 || checkedCats.includes(cat);
    const matchPrice = price >= minPrice && price <= maxPrice;
    card.style.display = (matchSearch && matchCat && matchPrice) ? '' : 'none';
  });

  // Sort
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  const visible = [...grid.querySelectorAll('.product-card')].filter(c => c.style.display !== 'none');
  visible.sort((a, b) => {
    const pa = parseFloat(a.dataset.price), pb = parseFloat(b.dataset.price);
    if (sortVal === 'price-asc') return pa - pb;
    if (sortVal === 'price-desc') return pb - pa;
    if (sortVal === 'name') return (a.dataset.name || '').localeCompare(b.dataset.name || '');
    return 0;
  });
  visible.forEach(c => grid.appendChild(c));
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = `${visible.length} Products`;
}

document.getElementById('searchInput')?.addEventListener('input', filterProducts);
document.getElementById('shopSort')?.addEventListener('change', filterProducts);
document.querySelectorAll('.cat-filter')?.forEach(c => c.addEventListener('change', filterProducts));
document.getElementById('applyPrice')?.addEventListener('click', filterProducts);

// ===== CONTACT FORM =====
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    showToast('Message sent successfully! We will reply within 24 hours.', 'fa-check-circle');
    e.target.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }, 1800);
});

// ===== NEWSLETTER =====
document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  showToast(`Subscribed! Welcome to CN Clothing. 🎉`);
  input.value = '';
});

// Scroll to Top
const scrollTop = document.createElement('button');
scrollTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollTop.className = 'scroll-top';
document.body.appendChild(scrollTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) scrollTop.classList.add('show');
  else scrollTop.classList.remove('show');
});
scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Init
updateCartUI();

// ===== HORIZONTAL SCROLL =====
function scrollGrid(direction) {
  const grid = document.querySelector('.horizontal-grid');
  if (!grid) return;
  const scrollAmount = 350;
  if (direction === 'left') grid.scrollLeft -= scrollAmount;
  else grid.scrollLeft += scrollAmount;
}

// ===== PRODUCT DETAIL MODAL =====
function openDetailModal(name, price, img, category, desc) {
  const modal = document.getElementById('detailModal');
  if (!modal) return;

  modal.querySelector('.detail-img-side img').src = img;
  modal.querySelector('.detail-cat').textContent = category || 'Artisan Collection';
  modal.querySelector('.detail-title').textContent = name;
  modal.querySelector('.detail-price').textContent = 'LKR ' + price.toLocaleString();
  modal.querySelector('.detail-desc').textContent = desc || 'This masterfully crafted artisan piece represents the pinnacle of Maison CN Clothing\'s design philosophy. Each stitch is a testament to our commitment to ethical luxury and uncompromising quality.';

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  document.getElementById('detailModal')?.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// Close modal on click outside
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('detail-modal-bg')) {
    closeDetailModal();
  }
});

// ===== GLOBAL INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initCinematicUI();
  initNavbar();
  updateCartUI();
});

window.addEventListener('load', () => {
  hidePreloader();
});

function initNavbar() {
  const ham = document.getElementById('ham');
  const mobMenu = document.getElementById('mobMenu');
  if (ham && mobMenu) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mobMenu.classList.toggle('open');
      document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        ham.classList.remove('open');
        mobMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

function initRevealAnimations() {
  // Restart any staggered reveals if needed
}

function initSliderControls() {
  // Any specific slider logic
}

