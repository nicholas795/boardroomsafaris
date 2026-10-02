# Quick Start Guide

## What Was Built

### 1. Admin Dashboard (`/admin`)
A password-protected interface for staff to view and manage customer enquiries.

**Login Details:**
- Email: `admin@boardroomsafaris.com`
- Password: `admin123`

**Features:**
- View all enquiries in a sortable table
- Change status: New → In Progress → Closed
- View detailed enquiry information
- Real-time updates

### 2. PDF Brochure Download
Two buttons on the website offering "Download Programme Overview":
- Hero section (home page)
- Incentives section

**Flow:**
1. User clicks button
2. Modal asks for: Name, Email, Company
3. Data saved to database for lead tracking
4. File downloads to user's computer

### 3. Multi-Page Website
Complete website with 7 pages:
- `/` - Home (all sections in one scrollable page)
- `/about` - Company mission & philosophy
- `/incentives` - Two programme types with FAQ
- `/destinations` - Safari destinations
- `/how-it-works` - 5-step process
- `/why-us` - Value proposition
- `/contact` - Contact form (saves to database)

---

## Quick Testing

### Test Admin Dashboard
1. Go to `http://localhost:8080/admin/login`
2. Enter credentials above
3. You should see a list of enquiries (if any exist)
4. Try changing a status using the dropdown

### Test PDF Download
1. Go to home page (`/`)
2. Scroll to hero section or click "Explore Incentives"
3. Click "Download Programme Overview" button
4. Fill in the form with test data
5. Click Download
6. File should download

### Test Contact Form
1. Go to `/contact`
2. Fill out the form
3. Click "Submit Enquiry"
4. Go to admin dashboard and verify your enquiry appears

### Test Navigation
1. Click navbar links to navigate between pages
2. Verify scroll-to-top occurs on navigation
3. Check footer appears on all pages

---

## Database Requirements

**MUST DO:** Run the SQL setup before testing!

See `SUPABASE_SETUP.md` for the SQL queries to run in Supabase.

This creates:
- `enquiries` table (contact form submissions)
- `brochure_downloads` table (lead tracking)
- `admin_users` table (staff logins)

---

## File Structure

```
src/
├── pages/
│   ├── AdminLogin.tsx         [NEW] Admin login form
│   ├── AdminDashboard.tsx     [NEW] Admin enquiry management
│   ├── ContactPage.tsx        [UPDATED] Now saves to database
│   └── [other pages]          [EXISTING] About, Incentives, etc.
├── components/
│   ├── AppLayout.tsx          [UPDATED] Added PDF buttons
│   ├── BrochureDownloadModal.tsx [NEW] PDF download modal
│   ├── Navbar.tsx             [EXISTING] Navigation
│   └── Footer.tsx             [EXISTING] Footer
└── lib/
    ├── auth.ts                [NEW] Authentication utilities
    └── supabase.ts            [EXISTING] Database connection

[SETUP FILES]
├── SUPABASE_SETUP.md          [NEW] Database SQL + instructions
└── IMPLEMENTATION_GUIDE.md    [NEW] Full feature documentation
```

---

## Key Technologies

- **React 18** - Frontend framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Backend / Database
- **shadcn/ui** - UI components
- **React Router** - Client routing
- **React Query** - Data fetching

---

## Next Steps

1. **Set up Supabase** (run SQL from SUPABASE_SETUP.md)
2. **Add environment variables** (.env.local)
3. **Install dependencies** (`npm install`)
4. **Run dev server** (`npm run dev`)
5. **Test features** (see above)
6. **Deploy** (Vercel recommended)

---

## What's NOT Included (Add-ons)

These features would require additional setup:

- **Real PDF Generation** - Currently downloads a text file
  - Need: Supabase Edge Function + html2pdf library
  
- **Email Notifications** - No emails sent on enquiry
  - Need: SendGrid / Supabase Mail integration
  
- **Payment Processing** - No booking payments
  - Need: Stripe / Paypal integration

---

## Support

Files with detailed documentation:
- `SUPABASE_SETUP.md` - Database setup
- `IMPLEMENTATION_GUIDE.md` - Full feature guide
- Code comments in new files

For questions on specific features:
- Admin: See `src/pages/AdminDashboard.tsx`
- Auth: See `src/lib/auth.ts`
- PDF: See `src/components/BrochureDownloadModal.tsx`
- Database: See `SUPABASE_SETUP.md`
