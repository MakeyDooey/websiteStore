// Project submission functionality
import { submitProject } from './supabase.js';

export async function submitProjectForm() {
  console.log('submitProjectForm called');
  const input = document.getElementById('project-input');
  const projectText = input.value.trim();
  
  console.log('Project text:', projectText);
  
  if (!projectText) {
    console.log('No project text, returning');
    return;
  }

  const btn = document.getElementById('send-btn');
  const responseDiv = document.getElementById('recommender-response');
  const responseText = document.getElementById('response-text');

  console.log('Elements found:', { btn: !!btn, responseDiv: !!responseDiv, responseText: !!responseText });

  btn.disabled = true;
  responseDiv.style.display = 'block';
  responseDiv.classList.add('visible');
  responseText.innerHTML = `<div class="thinking">Submitting<span class="thinking-dots"><span></span><span></span><span></span></span></div>`;
  
  console.log('Response should be visible now');

  try {
    // Submit to Supabase (will always show success)
    await submitProject({ 
      project: projectText,
      created_at: new Date().toISOString(),
      status: 'submitted'
    });

    // Show success message
    responseText.innerHTML = `<strong>Thanks!</strong> We've received your project idea and can't wait to see what you build!`;
    
    // Clear the input
    input.value = '';
    
  } catch (error) {
    // Still show success even if there's an error
    console.error('Project submission error:', error);
    responseText.innerHTML = `<strong>Thanks!</strong> We've received your project idea and can't wait to see what you build!`;
  } finally {
    btn.disabled = false;
  }
}

// Initialize project submission event listeners
document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('send-btn');
  const projectInput = document.getElementById('project-input');
  
  console.log('Project submission initialized');
  
  if (sendBtn) {
    sendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Send button clicked');
      submitProjectForm();
    });
  }
  
  if (projectInput) {
    // Allow Enter+Shift for newline, Enter alone to submit
    projectInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        console.log('Enter key pressed, submitting form');
        submitProjectForm();
      }
    });
  }
});
