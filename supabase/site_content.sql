-- Editable page copy and images for the admin "Edit website" screen.
-- Run this once in the DatabasePad SQL editor.

create table if not exists public.site_content (
  key text primary key,
  page text not null,
  value text not null,
  updated_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.site_content enable row level security;

drop policy if exists "public read site content" on public.site_content;
create policy "public read site content"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "public insert site content" on public.site_content;
create policy "public insert site content"
  on public.site_content
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "public update site content" on public.site_content;
create policy "public update site content"
  on public.site_content
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "public delete site content" on public.site_content;
create policy "public delete site content"
  on public.site_content
  for delete
  to anon, authenticated
  using (true);

grant select, insert, update, delete on public.site_content to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "public read site images" on storage.objects;
create policy "public read site images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'site-images');

drop policy if exists "public upload site images" on storage.objects;
create policy "public upload site images"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'site-images');
