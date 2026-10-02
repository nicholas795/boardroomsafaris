import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin, getAdminAuthState } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const authState = getAdminAuthState();

  const [email, setEmail] = useState('admin@boardroomsafaris.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/admin');
    }
  }, [authState, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await loginAdmin(email, password);

      if (result.success) {
        toast({
          title: 'Login Successful',
          description: 'Redirecting to dashboard...',
        });
        navigate('/admin');
      } else {
        toast({
          title: 'Login Failed',
          description: result.error || 'Invalid credentials',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred during login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-dark via-charcoal to-charcoal-dark flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-white font-light mb-2">
            Boardroom Safaris
          </h1>
          <p className="text-sand text-sm tracking-widest uppercase font-semibold">
            Admin Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-10">
          <h2 className="font-serif text-2xl text-charcoal mb-8 font-light">
            Staff Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-3">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@boardroomsafaris.com"
                className="w-full"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-3">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-bronze hover:bg-bronze/90 text-white font-semibold py-2 rounded flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ArrowRight size={18} />}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-8 border-t border-sand">
            <p className="text-xs text-charcoal/60 uppercase tracking-wider font-semibold mb-3">
              Demo Credentials
            </p>
            <div className="bg-sand-lightest p-4 rounded text-sm text-charcoal space-y-1">
              <p>
                <span className="font-semibold">Email:</span> admin@boardroomsafaris.com
              </p>
              <p>
                <span className="font-semibold">Password:</span> admin123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sand/60 text-sm">
            © {new Date().getFullYear()} Boardroom Safaris. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
