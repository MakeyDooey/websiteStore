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

  // Only add real-time validation to email field
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      if (emailInput.classList.contains('input-error') || !emailInput.value.trim()) {
        validateField(emailInput);
      }
    });
    
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('input-error')) {
        validateField(emailInput);
      }
    });
  }
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
  const emailField = document.getElementById('email');
  const email = emailField.value.trim();
  
  // Check if email is empty
  if (!email) {
    showError('Email address is required');
    return false;
  }
  
  // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Please enter a valid email address');
    return false;
  }
  
  return true;
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
  
  const preorderData = {
    name: `${formData.get('firstName')?.trim() || ''} ${formData.get('lastName')?.trim() || ''}`.trim(),
    email: formData.get('email').trim().toLowerCase(),
    products: ['General interest'],
    project: formData.get('project')?.trim() || '',
    organization: formData.get('organization')?.trim() || '',
    useCase: formData.get('useCase') || '',
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
  // Hide form and show OK message
  form.style.display = 'none';
  
  // Create OK message
  const okMessage = document.createElement('div');
  okMessage.className = 'ok-message';
  okMessage.innerHTML = `
    <div class="ok-checkmark">OK</div>
    <p>Pre-order submitted successfully!</p>
  `;
  
  // Insert OK message where form was
  form.parentNode.insertBefore(okMessage, form.nextSibling);
  
  // Redirect to main page after 2 seconds
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
  
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
