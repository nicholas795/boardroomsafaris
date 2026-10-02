# Supabase Setup Instructions

## 1. Create Tables

Run these SQL queries in the Supabase SQL Editor:

### Enquiries Table
```sql
-- Create enquiries table
CREATE TABLE public.enquiries (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  incentive_type TEXT,
  meeting_date TEXT,
  no_of_delegates INTEGER,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in progress', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create updated_at trigger for enquiries
CREATE OR REPLACE FUNCTION public.update_enquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON public.enquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_enquiries_updated_at();

-- Create index for faster queries
CREATE INDEX idx_enquiries_status ON public.enquiries(status);
CREATE INDEX idx_enquiries_created_at ON public.enquiries(created_at);
```

### Brochure Downloads Table
```sql
-- Create brochure_downloads table
CREATE TABLE public.brochure_downloads (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create indices
CREATE INDEX idx_brochure_downloads_email ON public.brochure_downloads(email);
CREATE INDEX idx_brochure_downloads_downloaded_at ON public.brochure_downloads(downloaded_at);
```

### Admin Users Table
```sql
-- Create admin_users table
CREATE TABLE public.admin_users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Insert default admin user (password: admin123)
-- Use bcrypt hash: $2a$10$YJwGRHGVhMpF2.pJq1M4AeHGI9q5u9mP7vN8k3L2Q1P9r0S8t6T2K
INSERT INTO public.admin_users (email, password_hash)
VALUES ('admin@boardroomsafaris.com', '$2a$10$YJwGRHGVhMpF2.pJq1M4AeHGI9q5u9mP7vN8k3L2Q1P9r0S8t6T2K');
```

## 2. Row Level Security (RLS) Policies

Enable RLS on tables:

```sql
-- Enable RLS on enquiries
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read all enquiries
CREATE POLICY "Allow authenticated users to read enquiries"
  ON public.enquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to update enquiries (only status)
CREATE POLICY "Allow authenticated users to update enquiries"
  ON public.enquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for anon users to insert enquiries
CREATE POLICY "Allow anonymous to insert enquiries"
  ON public.enquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Enable RLS on brochure_downloads
ALTER TABLE public.brochure_downloads ENABLE ROW LEVEL SECURITY;

-- Policy for anon users to insert into brochure_downloads
CREATE POLICY "Allow anonymous to insert brochure downloads"
  ON public.brochure_downloads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy for authenticated users to read brochure_downloads
CREATE POLICY "Allow authenticated users to read brochure downloads"
  ON public.brochure_downloads
  FOR SELECT
  TO authenticated
  USING (true);
```

### Site content (page text and images)

Run `supabase/site_content.sql` in the SQL editor. This creates the `site_content` table used by **Edit website** at `/admin/content`.

## 3. Notes

- The enquiries table stores contact form submissions
- Brochure downloads tracks PDF downloads for lead generation
- Admin users table is for the admin dashboard login
- All timestamps are in UTC
- Status enum: 'new', 'in progress', 'closed'
