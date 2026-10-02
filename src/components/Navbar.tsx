import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMAGES } from '@/lib/images';
import { Menu, X } from 'lucide-react';


const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Incentives', href: '/incentives' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isContactPage = location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const bgClass = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-md shadow-lg'
    : 'bg-white';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={IMAGES.logo}
                alt="Boardroom Safaris"
                className="h-12 lg:h-14 w-auto object-contain"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${
                    location.pathname === link.href
                      ? 'text-bronze'
                      : 'text-charcoal-dark/70 hover:text-bronze'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              {!isContactPage && (
                <Link
                  to="/contact"
                  className="hidden lg:inline-flex items-center px-6 py-2.5 border border-bronze/60 text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase hover:bg-bronze hover:text-white transition-all duration-300"
                >
                  Start an Enquiry
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-charcoal-dark p-2"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-charcoal-dark/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white transform transition-transform duration-500 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-24 px-8">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`py-3 text-[14px] font-medium tracking-[0.06em] uppercase border-b border-charcoal-dark/10 transition-colors duration-300 ${
                    location.pathname === link.href
                      ? 'text-bronze'
                      : 'text-charcoal-dark/70 hover:text-bronze'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {!isContactPage && (
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center px-6 py-3 border border-bronze/60 text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase hover:bg-bronze hover:text-white transition-all duration-300"
              >
                Start an Enquiry
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
