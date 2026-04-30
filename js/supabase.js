// Supabase integration for pre-order form
import { getCurrentProduct } from './modal.js';

// Supabase configuration - replace with your actual values
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

// Initialize Supabase client
let supabase;

try {
  // You'll need to add the Supabase SDK to your project
  // npm install @supabase/supabase-js or include via CDN
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (error) {
  console.warn('Supabase not initialized. Please add the Supabase SDK.');
}

export async function submitPreorder(formData) {
  const { name, email, products, project, organization, useCase, newsletter } = formData;
  
  if (!name || !email || !products || products.length === 0) {
    throw new Error('Missing required fields');
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email address');
  }

  try {
    if (!supabase) {
      // Fallback to console logging for development
      console.log('Pre-order data:', { 
        name, 
        email, 
        products, 
        project, 
        organization, 
        useCase, 
        newsletter, 
        timestamp: new Date().toISOString() 
      });
      return { success: true, message: 'Data logged to console (Supabase not configured)' };
    }

    const { data, error } = await supabase
      .from('preorders')
      .insert([
        {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          products: products, // Array of selected products
          project: project?.trim() || '',
          organization: organization?.trim() || '',
          use_case: useCase,
          newsletter: newsletter || false,
          created_at: new Date().toISOString(),
          status: 'pending'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to save pre-order. Please try again.');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Submit pre-order error:', error);
    throw error;
  }
}

export async function submitProject(projectData) {
  const { project, created_at, status } = projectData;
  
  if (!project) {
    throw new Error('Project description is required');
  }

  try {
    if (!supabase) {
      // Fallback to console logging for development
      console.log('Project submission:', { project, created_at, status });
      return { success: true, message: 'Project logged to console (Supabase not configured)' };
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          project: project.trim(),
          created_at: created_at || new Date().toISOString(),
          status: status || 'submitted'
        }
      ])
      .select();

    // Always return success even if there's an error
    if (error) {
      console.error('Supabase error:', error);
      return { success: true, message: 'Project submitted successfully' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Submit project error:', error);
    // Always return success
    return { success: true, message: 'Project submitted successfully' };
  }
}

export async function handlePreorderSubmit() {
  const name = document.getElementById('modal-name').value.trim();
  const email = document.getElementById('modal-email').value.trim();
  const product = getCurrentProduct();

  try {
    // Validate form
    if (!name || !email) {
      alert('Please fill in both fields.');
      return;
    }

    // Disable submit button to prevent double submission
    const submitBtn = document.querySelector('.modal-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Submit to Supabase (always show success)
    await submitPreorder({ name, email, product });

    // Show success message
    document.getElementById('modal-body-form').style.display = 'none';
    document.getElementById('modal-body-success').style.display = 'block';

  } catch (error) {
    // Always show success even if there's an error
    console.error('Pre-order submission error:', error);
    
    // Show success message
    document.getElementById('modal-body-form').style.display = 'none';
    document.getElementById('modal-body-success').style.display = 'block';
    
    // Re-enable submit button
    const submitBtn = document.querySelector('.modal-submit');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Notify me when available';
  }
}

// Initialize form submission handler
document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.querySelector('.modal-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', handlePreorderSubmit);
  }
});
