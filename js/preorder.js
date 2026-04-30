// js/preorder.js
import { submitPreorder } from './supabase.js';

const form = document.getElementById('preorder-form-element');
const formError = document.getElementById('form-error');
const submitBtn = document.querySelector('.form-submit');

document.addEventListener('DOMContentLoaded', () => {
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', () => validateField(emailInput));
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('input-error')) validateField(emailInput);
    });
  }
});

function validateField(field) {
  const errorMsg = field.parentElement.querySelector('.input-error-message');
  let isValid = true;
  field.classList.remove('input-error');
  if (errorMsg) errorMsg.classList.remove('show');
  if (field.hasAttribute('required') && !field.value.trim()) isValid = false;
  if (field.type === 'email' && field.value) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) isValid = false;
  }
  if (!isValid) {
    field.classList.add('input-error');
    if (errorMsg) errorMsg.classList.add('show');
  }
  return isValid;
}

function validateForm() {
  const emailField = document.getElementById('email');
  const email = emailField.value.trim();
  if (!email) { showError('Email address is required'); return false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('Please enter a valid email address'); return false; }
  return true;
}

function showError(message) {
  formError.textContent = message;
  formError.classList.add('show');
  formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => formError.classList.remove('show'), 5000);
}

function hideError() {
  formError.classList.remove('show');
}

async function handleFormSubmit(e) {
  e.preventDefault();
  if (!validateForm()) return;
  hideError();

  const formData = new FormData(form);
  const preorderData = {
    name: `${formData.get('firstName')?.trim() || ''} ${formData.get('lastName')?.trim() || ''}`.trim(),
    email: formData.get('email').trim().toLowerCase(),
    products: ['General interest'],
    project: formData.get('project')?.trim() || '',
    organization: formData.get('organization')?.trim() || '',
    useCase: formData.get('useCase') || '',
    newsletter: document.getElementById('newsletter').checked,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    await submitPreorder(preorderData);
    showSuccess();
  } catch (error) {
    console.error('Pre-order submission error:', error);
    showError(error.message || 'Failed to submit. Please try again.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Join Waitlist';
  }
}

function showSuccess() {
  form.style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
}
