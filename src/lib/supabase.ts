import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://oufrjccsvkupnvpjubae.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijk2OWNiNWVhLWZjNWQtNDQ1Zi1hN2RmLTZmZjJhODcyYmM0YiJ9.eyJwcm9qZWN0SWQiOiJvdWZyamNjc3ZrdXBudnBqdWJhZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc1NzY2NTg1LCJleHAiOjIwOTExMjY1ODUsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.RXr2gvsiRH6ingpjiwUt4x6mwKsVJYonRDgLRx7J-Xo';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };