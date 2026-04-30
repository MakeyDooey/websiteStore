# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up/login and create a new project
4. Choose a region close to your users
5. Set a strong database password
6. Wait for the project to be created

## 2. Create the Database Tables

In your Supabase project dashboard:

### Pre-orders Table

1. Go to the "Table Editor" tab
2. Click "Create a new table"
3. Use these settings:

**Table Name:** `preorders`

**Columns:**
- `id` (int8, Primary Key, Default: identity())
- `name` (text, not null)
- `email` (text, not null)
- `products` (text[], not null) - Array of selected products
- `project` (text, optional) - Project description
- `organization` (text, optional) - Organization/company name
- `use_case` (text, not null) - Use case category
- `newsletter` (boolean, Default: false) - Newsletter subscription
- `created_at` (timestamptz, Default: now())
- `status` (text, Default: 'pending')

**Constraints:**
- Add a unique constraint on the `email` column (optional, to prevent duplicates)

### Projects Table

1. Go to the "Table Editor" tab
2. Click "Create a new table"
3. Use these settings:

**Table Name:** `projects`

**Columns:**
- `id` (int8, Primary Key, Default: identity())
- `project` (text, not null) - Project description
- `created_at` (timestamptz, Default: now())
- `status` (text, Default: 'submitted')

## 3. Set up Row Level Security (RLS)

1. Go to "Authentication" > "Policies"
2. Enable RLS on the `preorders` table
3. Create a new policy with these settings:

**Policy Name:** "Allow public insert"
**Allowed Operation:** INSERT
**Policy Definition:** `true`

This allows anyone to insert pre-order data but not read or modify existing data.

4. Enable RLS on the `projects` table
5. Create a new policy with these settings:

**Policy Name:** "Allow public insert"
**Allowed Operation:** INSERT
**Policy Definition:** `true`

This allows anyone to insert project data but not read or modify existing data.

## 4. Get Your Credentials

In your Supabase project dashboard:

1. Go to "Project Settings" > "API"
2. Copy these values:
   - Project URL (looks like: `https://your-project-id.supabase.co`)
   - `anon` public API key

## 5. Update the JavaScript Configuration

Edit `js/supabase.js` and replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

## 6. Add Supabase SDK to Your Project

Add this script tag to your HTML `<head>` section (before your main script):

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

## 7. Test the Integration

1. Open your website
2. Click any "Pre-order" or "Notify Me" button
3. Fill out the form and submit
4. Check your Supabase Table Editor to see the new entry

## Security Notes

- The current setup allows public INSERT access to the preorders table
- Consider adding rate limiting if you expect high traffic
- You may want to add email verification for the submitted addresses
- Consider adding a "status" field to track follow-up actions

## Optional Enhancements

- Add email notifications using Supabase Edge Functions
- Create an admin dashboard to view/manage pre-orders
- Add analytics to track conversion rates
- Implement email validation before submission
