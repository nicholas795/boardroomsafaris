import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/lib/images';
import { useContent } from '@/lib/siteContent';
import { MapPin, Phone, Mail, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const { text } = useContent();
  return (
    <footer className="bg-charcoal-dark text-sand-light/70">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 items-start text-center md:text-left">

          {/* Brand Column — left */}
          <div className="text-center md:text-left">
            <img
              src={IMAGES.logo}
              alt="Boardroom Safaris"
              className="mx-auto md:mx-0 h-12 w-auto mb-6 brightness-110"
            />
            <p className="text-sm leading-relaxed mb-6 text-sand-light/50">
              {text('footer.blurb')}
            </p>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/company/boardroom-safaris/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-bronze hover:text-bronze transition-all duration-300"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://www.instagram.com/boardroom_safaris?igsh=MWpiM2JlbzJtNGJ2Yg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-bronze hover:text-bronze transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Navigation — center */}
          <div className="md:justify-self-center">
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-sand-light/40 mb-6">
              Navigation
            </h4>
            <div className="flex flex-col gap-3 items-center md:items-start">
              {[
                { label: 'About', href: '/about' },
                { label: 'Incentive Programmes', href: '/incentives' },
                { label: 'Destinations', href: '/destinations' },
                { label: 'Why choose Boardroom Safaris', href: '/why-us' },
                { label: 'Contact', href: '/contact' }
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm hover:text-bronze transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact — far right */}
          <div className="md:justify-self-end">
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-sand-light/40 mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-4 items-center md:items-start">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-bronze/60 flex-shrink-0" />
                <span className="text-sm">{text('contact.office')}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 text-bronze/60 flex-shrink-0" />
                <span className="text-sm">{text('contact.phone')}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-bronze/60 flex-shrink-0" />
                <a
                  href={`mailto:${text('contact.email')}`}
                  className="text-sm hover:text-bronze transition-colors duration-300"
                >
                  {text('contact.email')}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-sand-light/30">
              &copy; {new Date().getFullYear()} Boardroom Safaris. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-xs text-sand-light/30 hover:text-sand-light/60 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-xs text-sand-light/30 hover:text-sand-light/60 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;