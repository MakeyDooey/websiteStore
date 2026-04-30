// Navigation and Page Routing
export function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  const navBtn = document.getElementById('nav-' + id);
  if (navBtn) navBtn.classList.add('active');
  window.scrollTo({ top: 0 });
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
  // Add click handlers to navigation links
  const navLinks = document.querySelectorAll('.nav-links button');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page') || 
                     link.textContent.toLowerCase().replace('pre-order', 'shop');
      showPage(pageId);
    });
  });
  
  // Add click handler to nav logo
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('home');
    });
  }
  
  // Add click handlers to resource cards with data-page attributes
  const resourceCards = document.querySelectorAll('.resource-card[data-page]');
  resourceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = card.getAttribute('data-page');
      if (pageId) {
        showPage(pageId);
      }
    });
  });
});
