// js/supabase.js
import { getCurrentProduct } from './modal.js';

const SUPABASE_URL = 'https://yvtefjnghtewgfyqynsb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dGVmam5naHRld2dmeXF5bnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MzE0NzEsImV4cCI6MjA5MDMwNzQ3MX0.nz8htbhDq_x5EHQv1mEGvuic7HZsU7N1M3kFaoDHPXU';

async function supabaseInsert(table, row) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(row)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function submitPreorder(formData) {
  const { name, email, products, project, organization, useCase, newsletter } = formData;

  if (!email) throw new Error('Email address is required');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error('Invalid email address');

  return supabaseInsert('preorders', {
    name: name?.trim() || '',
    email: email.toLowerCase().trim(),
    products: products || ['General interest'],
    project: project?.trim() || '',
    organization: organization?.trim() || '',
    use_case: useCase || '',
    newsletter: newsletter || false,
    status: 'pending'
  });
}

export async function submitProject(projectData) {
  const { project } = projectData;
  if (!project) throw new Error('Project description is required');

  return supabaseInsert('projects', {
    project: project.trim(),
    status: 'submitted'
  });
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
