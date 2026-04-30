// Modal functionality
let currentProduct = '';

export function openModal(product) {
  currentProduct = product;
  document.getElementById('modal-product-name').textContent = product;
  document.getElementById('modal-title').textContent = 'Get notified - ' + product;
  document.getElementById('modal-body-form').style.display = 'block';
  document.getElementById('modal-body-success').style.display = 'none';
  document.getElementById('modal-name').value = '';
  document.getElementById('modal-email').value = '';
  document.getElementById('modal-overlay').classList.add('open');
}

export function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

export function closeModalOutside(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

export function getCurrentProduct() {
  return currentProduct;
}

// Initialize modal event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Close modal when clicking outside
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModalOutside);
  }
  
  // Close modal when clicking close button
  const modalClose = document.querySelector('.modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // Add click handlers to all preorder buttons with data-product attribute
  const preorderButtons = document.querySelectorAll('.btn-preorder[data-product]');
  preorderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const product = button.getAttribute('data-product');
      if (product) {
        openModal(product);
      }
    });
  });
});
