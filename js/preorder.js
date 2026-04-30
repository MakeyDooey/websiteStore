// js/supabase.js
import { getCurrentProduct } from './modal.js';

const SUPABASE_URL = 'https://yvtefjnghtewgfyqynsb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dGVmam5naHRld2dmeXF5bnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MzE0NzEsImV4cCI6MjA5MDMwNzQ3MX0.nz8htbhDq_x5EHQv1mEGvuic7HZsU7N1M3kFaoDHPXU';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function submitPreorder(formData) {
  const { name, email, products, project, organization, useCase, newsletter } = formData;

  if (!email) throw new Error('Email address is required');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error('Invalid email address');

  const { data, error } = await supabase
    .from('preorders')
    .insert([{
      name: name?.trim() || '',
      email: email.toLowerCase().trim(),
      products: products || ['General interest'],
      project: project?.trim() || '',
      organization: organization?.trim() || '',
      use_case: useCase || '',
      newsletter: newsletter || false,
      status: 'pending'
    }])
    .select();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(error.message);
  }

  return { success: true, data };
}

export async function submitProject(projectData) {
  const { project } = projectData;
  if (!project) throw new Error('Project description is required');

  const { data, error } = await supabase
    .from('projects')
    .insert([{
      project: project.trim(),
      status: 'submitted'
    }])
    .select();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(error.message);
  }

  return { success: true, data };
}

export async function handlePreorderSubmit() {
  const name = document.getElementById('modal-name').value.trim();
  const email = document.getElementById('modal-email').value.trim();
  const product = getCurrentProduct();

  if (!name || !email) {
    alert('Please fill in both fields.');
    return;
  }

  const submitBtn = document.querySelector('.modal-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    await submitPreorder({ name, email, products: [product] });
    document.getElementById('modal-body-form').style.display = 'none';
    document.getElementById('modal-body-success').style.display = 'block';
  } catch (error) {
    console.error('Pre-order submission error:', error);
    document.getElementById('modal-body-form').style.display = 'none';
    document.getElementById('modal-body-success').style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Notify me when available';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.querySelector('.modal-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', handlePreorderSubmit);
  }
});
