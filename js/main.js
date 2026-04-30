// Main application entry point
import { showPage } from './navigation.js';
import { openModal, closeModal, closeModalOutside } from './modal.js';
import { submitProjectForm } from './project-submission.js';
import { handlePreorderSubmit } from './supabase.js';

// Make functions globally available for inline event handlers
window.showPage = showPage;
window.openModal = openModal;
window.closeModal = closeModal;
window.closeModalOutside = closeModalOutside;
window.submitProjectForm = submitProjectForm;
window.submitPreorder = handlePreorderSubmit;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  console.log('MakeyDooey website initialized');
  
  // Set initial page
  showPage('home');
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
});
