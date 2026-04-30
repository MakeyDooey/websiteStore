// Pre-order page JavaScript
import { submitPreorder } from './supabase.js';

// Form elements
const form = document.getElementById('preorder-form-element');
const formError = document.getElementById('form-error');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.querySelector('.form-submit');

// Product selection handling
document.addEventListener('DOMContentLoaded', () => {
  // Handle product option selection
  const productOptions = document.querySelectorAll('.product-option');
  productOptions.forEach(option => {
    option.addEventListener('click', () => {
      const checkbox = option.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
      
      // Update visual state
      if (checkbox.checked) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
    
    // Handle checkbox change directly
    const checkbox = option.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  });

  // Handle form submission
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Real-time validation
  const inputs = form.querySelectorAll('.form-input, .form-select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('input-error')) {
        validateField(input);
      }
    });
  });
});

function validateField(field) {
  const errorMsg = field.parentElement.querySelector('.input-error-message');
  let isValid = true;

  // Remove previous error state
  field.classList.remove('input-error');
  if (errorMsg) errorMsg.classList.remove('show');

  // Required field validation
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
  }

  // Email validation
  if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
    }
  }

  // Show error if invalid
  if (!isValid) {
    field.classList.add('input-error');
    if (errorMsg) errorMsg.classList.add('show');
  }

  return isValid;
}

function validateForm() {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  // Check if at least one product is selected
  const selectedProducts = form.querySelectorAll('input[name="product"]:checked');
  if (selectedProducts.length === 0) {
    showError('Please select at least one product');
    isValid = false;
  }

  // Check if terms are accepted
  const termsCheckbox = document.getElementById('terms');
  if (!termsCheckbox.checked) {
    showError('Please accept the terms of service');
    isValid = false;
  }

  return isValid;
}

function showError(message) {
  formError.textContent = message;
  formError.classList.add('show');
  
  // Scroll to error
  formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Hide error after 5 seconds
  setTimeout(() => {
    formError.classList.remove('show');
  }, 5000);
}

function hideError() {
  formError.classList.remove('show');
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  hideError();

  // Get form data
  const formData = new FormData(form);
  const selectedProducts = Array.from(form.querySelectorAll('input[name="product"]:checked'))
    .map(checkbox => checkbox.value);
  
  const preorderData = {
    name: `${formData.get('firstName').trim()} ${formData.get('lastName').trim()}`,
    email: formData.get('email').trim().toLowerCase(),
    products: selectedProducts,
    project: formData.get('project')?.trim() || '',
    organization: formData.get('organization')?.trim() || '',
    useCase: formData.get('useCase'),
    newsletter: document.getElementById('newsletter').checked,
    created_at: new Date().toISOString(),
    status: 'pending'
  };

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  submitBtn.textContent = 'Submitting...';

  try {
    // Submit to Supabase
    await submitPreorder(preorderData);
    
    // Show success state
    showSuccess();
    
  } catch (error) {
    console.error('Pre-order submission error:', error);
    showError(error.message || 'Failed to submit pre-order. Please try again.');
    
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.textContent = 'Join Waitlist';
  }
}

function showSuccess() {
  // Hide form and show success message
  form.style.display = 'none';
  formSuccess.style.display = 'block';
  
  // Scroll to success message
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  // Track conversion (if you have analytics)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'event_category': 'Pre-order',
      'event_label': 'Form Submitted'
    });
  }
}

// Make some functions globally available for inline handlers
window.showPreorderError = showError;
window.hidePreorderError = hideError;
