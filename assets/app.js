// Shared utilities and simple SPA-ish helpers

// Storage helpers
export function getUsers() {
  try { return JSON.parse(localStorage.getItem('users') || '[]'); }
  catch { return []; }
}
export function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}
export function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('currentUser') || 'null'); }
  catch { return null; }
}
export function setCurrentUser(user) { localStorage.setItem('currentUser', JSON.stringify(user)); }
export function logout() { localStorage.removeItem('currentUser'); }

// Listings mock (ported from previous mock import)
export function getListings() {
  try {
    const val = localStorage.getItem('listings');
    if (val) return JSON.parse(val);
  } catch {}
  // Seed some demo listings if empty
  const seed = Array.from({ length: 16 }).map((_, i) => ({
    id: String(1000 + i),
    ownerId: 'u1',
    title: ['Sunny Room', 'Cozy Flat', 'Modern House', 'PG near Metro'][i % 4] + ' #' + (i+1),
    description: 'Spacious place with great light and amenities. Close to transit and markets.',
    type: ['room','apartment','house','pg'][i % 4],
    price: 12000 + i * 2500,
    currency: 'INR',
    address: 'Street ' + (i+1),
    city: ['Mumbai','Delhi','Bangalore','Chennai','Hyderabad','Pune','Kolkata'][i % 7],
    bedrooms: 1 + (i % 3),
    bathrooms: 1 + (i % 2),
    amenities: ['AC','Wifi','Parking'].filter((_, j) => (i + j) % 2 === 0),
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [],
  }));
  localStorage.setItem('listings', JSON.stringify(seed));
  return seed;
}
export function saveListings(listings) { localStorage.setItem('listings', JSON.stringify(listings)); }

export function qs(selector, root=document) { return root.querySelector(selector); }
export function qsa(selector, root=document) { return Array.from(root.querySelectorAll(selector)); }

export function on(selector, event, handler, root=document) {
  const el = qs(selector, root);
  if (el) el.addEventListener(event, handler);
  return el;
}

export function toggleClass(el, cls, on) {
  if (!el) return; if (on === undefined) { el.classList.toggle(cls); } else { el.classList.toggle(cls, !!on); }
}

export function formatINR(num) { try { return Number(num).toLocaleString('en-IN'); } catch { return String(num); } }

// Header behavior
export function initHeader() {
  const header = document.querySelector('header.site-header');
  if (!header) return;
  const apply = () => header.classList.toggle('header--scrolled', window.scrollY > 4);
  apply();
  window.addEventListener('scroll', apply);
}

// Simple nav hydration for active state
export function setActiveNav(pathname) {
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    const isActive = href === pathname || (href !== '/' && pathname.startsWith(href));
    a.classList.toggle('text-[var(--color-primary)]', isActive);
    a.classList.toggle('font-semibold', isActive);
  });
}
