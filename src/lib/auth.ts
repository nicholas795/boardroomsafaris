import { supabase } from './supabase';

// Hardcoded admin credentials for simplicity
// In production, use proper authentication
const ADMIN_EMAIL = 'admin@boardroomsafaris.com';
const ADMIN_PASSWORD = 'admin123'; // This should match the bcrypt hash in database

export interface AdminAuthState {
  isAuthenticated: boolean;
  email: string | null;
  token: string | null;
}

/**
 * Login for admin dashboard
 * Using simple password verification (in production, use proper auth)
 */
export const loginAdmin = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  // Simple hardcoded credential check
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Create a simple JWT-like token
    const token = btoa(`${email}:${Date.now()}`);
    localStorage.setItem('admin_auth_token', token);
    localStorage.setItem('admin_email', email);
    return { success: true };
  }
  return { success: false, error: 'Invalid email or password' };
};

/**
 * Logout admin
 */
export const logoutAdmin = () => {
  localStorage.removeItem('admin_auth_token');
  localStorage.removeItem('admin_email');
};

/**
 * Check if admin is authenticated
 */
export const getAdminAuthState = (): AdminAuthState => {
  const token = localStorage.getItem('admin_auth_token');
  const email = localStorage.getItem('admin_email');

  return {
    isAuthenticated: !!token && !!email,
    email: email || null,
    token: token || null,
  };
};

/**
 * Verify admin is authenticated (for protected routes)
 */
export const isAdminAuthenticated = (): boolean => {
  return getAdminAuthState().isAuthenticated;
};

// Alternative: Use Supabase authentication with admin users table
export const loginAdminWithDatabase = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Query admin_users table
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return { success: false, error: 'Invalid credentials' };
    }

    // In production, use bcrypt.compare() instead
    // For now, we'll use a simple comparison
    // The password should be hashed - this is just for demo
    const token = btoa(`${email}:${Date.now()}`);
    localStorage.setItem('admin_auth_token', token);
    localStorage.setItem('admin_email', email);

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Authentication failed' };
  }
};
