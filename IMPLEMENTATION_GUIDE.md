# Boardroom Safaris - Implementation Guide

## System Overview

Your website now includes:
1. **Admin Dashboard** - Password-protected enquiry management system at `/admin`
2. **PDF Brochure Feature** - Lead capture with downloadable programme overview
3. **Multi-page Website** - Full routing with dedicated pages for each section
4. **Database Integration** - Supabase for enquiries and brochure downloads

---

## IMPORTANT: Database Setup (Required)

Before launching, you **MUST** set up your Supabase database:

### Step 1: Create Tables in Supabase

1. Go to your Supabase dashboard: https://supabase.com
2. Navigate to your project's SQL Editor
3. Run the SQL queries from `SUPABASE_SETUP.md` in this directory

This will create:
- `enquiries` table - stores contact form submissions
- `brochure_downloads` table - tracks PDF download leads
- `admin_users` table - stores admin login credentials

### Step 2: Verify Environment Variables

Ensure your `.env.local` has:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Feature 1: Admin Dashboard (`/admin`)

### Access
- **Login URL**: `http://localhost:8080/admin/login`
- **Default Credentials**:
  - Email: `admin@boardroomsafaris.com`
  - Password: `admin123`

### Features
- ✅ View all enquiries in a sortable table
- ✅ Columns: Name, Email, Company, Incentive Type, Date, Status
- ✅ Change enquiry status: New → In Progress → Closed
- ✅ Click "View" to see full enquiry details in a modal
- ✅ Real-time database synchronization
- ✅ Logout functionality

### How It Works
1. Staff navigates to `/admin/login`
2. Enters credentials (hardcoded for now)
3. Redirected to dashboard if authenticated
4. Can view/manage all enquiries from the contact form
5. Status changes update in real-time

### Files
- [src/pages/AdminLogin.tsx](src/pages/AdminLogin.tsx) - Login form
- [src/pages/AdminDashboard.tsx](src/pages/AdminDashboard.tsx) - Main dashboard
- [src/lib/auth.ts](src/lib/auth.ts) - Authentication logic

---

## Feature 2: PDF Brochure Download

### How It Works
1. User clicks "Download Programme Overview" button on:
   - Hero section (home page)
   - Incentives section (below programme description)
2. Modal opens asking for: Name, Email, Company
3. User submits form
4. Lead is saved to `brochure_downloads` table
5. PDF is generated/downloaded
6. Success toast message appears

### Current Implementation
- Modal captures lead information
- Data stored in Supabase for lead tracking
- Currently serves a placeholder text file (you can integrate actual PDF generation)

### To Upgrade to Real PDFs
In production, you should:
1. Create a Supabase Edge Function (`generate-brochure-pdf`)
2. Use a library like `html2pdf` or `pdfkit` to generate branded PDFs
3. Include programme details, destinations, 5-step process

### Files
- [src/components/BrochureDownloadModal.tsx](src/components/BrochureDownloadModal.tsx) - Download modal
- [src/components/AppLayout.tsx](src/components/AppLayout.tsx) - Added buttons on hero/incentives

---

## Feature 3: Multi-Page Website

### Pages
All pages include:
- Shared Navbar with navigation
- Shared Footer with contact info
- Automatic scroll-to-top on navigation
- Responsive design

### Routes
- `/` - Home (AppLayout with all sections)
- `/about` - About page (strategic positioning, philosophy, team)
- `/incentives` - Incentive programmes (detailed descriptions with FAQ)
- `/destinations` - Destination highlights with info
- `/how-it-works` - 5-step process explained
- `/why-us` - Value proposition & testimonials
- `/contact` - Full contact form

### Contact Form Integration
The contact form on `/contact` **automatically saves** enquiries to the database:
- Form data submitted → saved to `enquiries` table
- Status set to "new" by default
- Admin can view/manage in dashboard

### Files
- [src/pages/AboutPage.tsx](src/pages/AboutPage.tsx)
- [src/pages/IncentivesPage.tsx](src/pages/IncentivesPage.tsx)
- [src/pages/DestinationsPage.tsx](src/pages/DestinationsPage.tsx)
- [src/pages/HowItWorksPage.tsx](src/pages/HowItWorksPage.tsx)
- [src/pages/WhyUsPage.tsx](src/pages/WhyUsPage.tsx)
- [src/pages/ContactPage.tsx](src/pages/ContactPage.tsx)

---

## Database Schema

### enquiries Table
```
- id (Primary Key)
- name (text)
- email (text)
- company (text)
- incentive_type (text)
- meeting_date (text)
- no_of_delegates (integer)
- message (text)
- status (enum: 'new', 'in progress', 'closed')
- created_at (timestamp)
- updated_at (timestamp)
```

### brochure_downloads Table
```
- id (Primary Key)
- name (text)
- email (text)
- company (text)
- downloaded_at (timestamp)
```

### admin_users Table
```
- id (Primary Key)
- email (text, unique)
- password_hash (text)
- created_at (timestamp)
```

### Row-Level Security (RLS)
- ✅ Authenticated users can read/update enquiries
- ✅ Anonymous users can insert enquiries and brochure downloads
- ✅ Prevents unauthorized data access

---

## Local Development

### Install Dependencies
```bash
npm install
```

### Start Dev Server
```bash
npm run dev
```

Server runs on `http://localhost:8080`

### Build for Production
```bash
npm run build
```

---

## Testing Checklist

- [ ] Supabase tables created successfully
- [ ] Admin login works at `/admin/login`
- [ ] Admin dashboard displays enquiries
- [ ] Can change enquiry status in dropdown
- [ ] Can view enquiry details in modal
- [ ] Contact form submits and creates enquiry
- [ ] PDF download modal opens and saves lead
- [ ] All pages route correctly
- [ ] Navbar shows active page highlight
- [ ] Page scrolls to top on navigation
- [ ] Footer displays on all pages
- [ ] Mobile responsive design works

---

## Security Notes

⚠️ **For Production:**

1. **Admin Authentication**: Currently uses hardcoded credentials
   - Consider upgrading to Supabase Auth
   - Implement proper password hashing (bcrypt)
   - Add session management

2. **API Keys**: Ensure `.env.local` is in `.gitignore`

3. **Password Storage**: If using database auth, bcrypt hash passwords

4. **RLS Policies**: Review and test all row-level security policies

5. **Privacy**: Ensure GDPR compliance for email collection

---

## Customization Guide

### Change Admin Credentials
Edit [src/lib/auth.ts](src/lib/auth.ts):
```typescript
const ADMIN_EMAIL = 'your-email@company.com';
const ADMIN_PASSWORD = 'your-password';
```

### Add More Admin Users
Add records to `admin_users` table and upgrade auth to check password hash.

### Customize PDF Content
Replace the PDF generation in [src/components/BrochureDownloadModal.tsx](src/components/BrochureDownloadModal.tsx) with actual PDF generation.

### Update Destination Cards
Edit destination data in [src/components/AppLayout.tsx](src/components/AppLayout.tsx) `destinations` array.

### Customize Colors
Tailwind config variables in `tailwind.config.ts`:
- `bronze` - Primary accent
- `sand` - Light neutral
- `charcoal` - Dark neutral

---

## Deployment

### Deploy on Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy on Other Platforms

1. Build: `npm run build`
2. Output directory: `dist/`
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## API Routes (Future Enhancement)

Consider creating these Supabase Edge Functions:

1. **`generate-brochure-pdf`** - Generate branded PDF
   - Input: name, email, company
   - Output: PDF file URL

2. **`send-confirmation-email`** - Send PDF to user
   - Triggered after brochure download
   - Uses Supabase Mail service

---

## Support Files

- `SUPABASE_SETUP.md` - Database SQL and RLS policies
- [src/lib/auth.ts](src/lib/auth.ts) - Authentication utilities
- [src/lib/supabase.ts](src/lib/supabase.ts) - Supabase client
- [src/pages/AdminDashboard.tsx](src/pages/AdminDashboard.tsx) - Admin interface
- [src/components/BrochureDownloadModal.tsx](src/components/BrochureDownloadModal.tsx) - Lead capture

---

## Next Steps

1. ✅ Set up Supabase database (run SQL from `SUPABASE_SETUP.md`)
2. ✅ Test admin login at `/admin/login`
3. ✅ Submit contact form and verify enquiry appears in dashboard
4. ✅ Download brochure and verify lead is captured
5. ⏳ (Optional) Create actual PDF generation edge function
6. ⏳ (Optional) Add email notifications for new enquiries
7. ⏳ (Optional) Implement analytics/reporting dashboard

---

## Troubleshooting

**Admin login not working?**
- Check Supabase connection in `.env.local`
- Verify `admin_users` table exists with admin credentials

**Contact form not saving?**
- Ensure `enquiries` table exists
- Check RLS policy allows anon inserts
- Check browser console for errors

**PDF download not working?**
- Check browser console for errors
- Verify `brochure_downloads` table exists
- Current implementation downloads a .txt file (placeholder)

**Pages not showing content?**
- Ensure PageWrapper component is used
- Check image URLs in IMAGES const are accessible

---

Last Updated: April 9, 2026
