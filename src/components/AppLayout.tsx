import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Users, TrendingUp, Compass, Target, Globe, Briefcase, Award, MapPin, Phone, Mail, Linkedin, Instagram, Shield, Eye, Heart, Zap, Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import BrochureDownloadModal from './BrochureDownloadModal';


const IMAGES = {
  logo: 'https://darkred-bat-620545.hostingersite.com/wp-content/uploads/2026/04/New-Logo.png',
  hero: 'https://d64gsuwffb70l.cloudfront.net/69d80c22fd0ab3ae63a47f18_1775766790404_e6d7e794.jpg',
  elephant: 'https://d64gsuwffb70l.cloudfront.net/69d80c22fd0ab3ae63a47f18_1775766767179_4a73c5df.jpg',
  lodge: 'https://d64gsuwffb70l.cloudfront.net/69d80c22fd0ab3ae63a47f18_1775766811568_7d702b85.jpg',
  okavango: 'https://d64gsuwffb70l.cloudfront.net/69d80c22fd0ab3ae63a47f18_1775766837580_4eabb862.jpg',
  kruger: 'https://d64gsuwffb70l.cloudfront.net/69d80c22fd0ab3ae63a47f18_1775766901753_190bd619.jpg',
  masaiMara: 'https://d64gsuwffb70l.cloudfront.net/69d80c22fd0ab3ae63a47f18_1775766927497_b2c32654.jpg',
  tentInterior: 'https://d64gsuwffb70l.cloudfront.net/69d80c22fd0ab3ae63a47f18_1775766947173_250892e0.jpg',
  privateDining: 'https://d64gsuwffb70l.cloudfront.net/69d80c22fd0ab3ae63a47f18_1775766964440_5e0515a9.jpg',
  namibia: 'https://d64gsuwffb70l.cloudfront.net/69d80c22fd0ab3ae63a47f18_1775766987871_4ef80b5e.jpg',
  rwanda: 'https://d64gsuwffb70l.cloudfront.net/69d80c22fd0ab3ae63a47f18_1775767025458_839983b4.jpg',
  boardroom: 'https://d64gsuwffb70l.cloudfront.net/69d80c22fd0ab3ae63a47f18_1775767043472_914fb336.jpg',
};

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const { ref, isVisible } = useReveal(0.1);
  return (
    <div ref={ref} className={className} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
};

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Incentives', href: '#incentives' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'How It Works', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
];

const AppLayout: React.FC = () => {
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '', companySize: '', incentiveType: '', groupSize: '', timeline: '', message: '' });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNewsletterSubmitting(true);
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email: email.trim() });
      if (error) {
        if (error.code === '23505') {
          toast({ title: 'Already Subscribed', description: 'This email is already on our mailing list.', variant: 'default' });
        } else {
          throw error;
        }
      } else {
        toast({ title: 'Subscribed', description: 'Thank you for subscribing to our insights.' });
      }
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    } catch (err: any) {
      toast({ title: 'Subscription Failed', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const handleContactChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    if (contactErrors[field]) setContactErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!contactForm.firstName.trim()) errs.firstName = 'Required';
    if (!contactForm.lastName.trim()) errs.lastName = 'Required';
    if (!contactForm.email.trim()) errs.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) errs.email = 'Invalid email';
    if (!contactForm.company.trim()) errs.company = 'Required';
    if (!contactForm.incentiveType) errs.incentiveType = 'Required';
    setContactErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setContactSubmitting(true);
    try {
      const { error } = await supabase.from('enquiries').insert({
        first_name: contactForm.firstName.trim(),
        last_name: contactForm.lastName.trim(),
        email: contactForm.email.trim(),
        phone: contactForm.phone.trim() || null,
        company: contactForm.company.trim(),
        job_title: contactForm.jobTitle.trim() || null,
        company_size: contactForm.companySize || null,
        incentive_type: contactForm.incentiveType,
        group_size: contactForm.groupSize || null,
        timeline: contactForm.timeline || null,
        message: contactForm.message.trim() || null,
      });
      if (error) throw error;
      toast({ title: 'Enquiry Submitted', description: 'Thank you. A member of our team will be in touch within 24 hours.' });
      setContactSubmitted(true);
    } catch (err: any) {
      toast({ title: 'Submission Failed', description: 'Something went wrong. Please try again or contact us directly.', variant: 'destructive' });
    } finally {
      setContactSubmitting(false);
    }
  };



  const inputCls = (field: string) => `w-full px-4 py-3 bg-white border text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none transition-colors duration-300 ${contactErrors[field] ? 'border-red-400' : 'border-sand/40 focus:border-bronze/50'}`;
  const selectCls = (field: string) => `w-full px-4 py-3 bg-white border text-sm focus:outline-none transition-colors duration-300 appearance-none ${contactErrors[field] ? 'border-red-400' : 'border-sand/40 focus:border-bronze/50'} ${!(contactForm as any)[field] ? 'text-charcoal/30' : 'text-charcoal'}`;

  const destinations = [
    { name: 'Okavango Delta', country: 'Botswana', image: IMAGES.okavango },
    { name: 'Kruger & Sabi Sands', country: 'South Africa', image: IMAGES.kruger },
    { name: 'Masai Mara', country: 'Kenya', image: IMAGES.masaiMara },
    { name: 'Sossusvlei', country: 'Namibia', image: IMAGES.namibia },
    { name: 'Volcanoes National Park', country: 'Rwanda', image: IMAGES.rwanda },
    { name: 'Private Lodges', country: 'East Africa', image: IMAGES.lodge },
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <button onClick={() => scrollTo('#hero')} className="flex items-center">
              <img src={IMAGES.logo} alt="Boardroom Safaris" className="h-12 lg:h-14 w-auto object-contain" />
            </button>
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className="px-4 py-2 text-[13px] font-medium tracking-[0.08em] uppercase text-charcoal-dark/70 hover:text-bronze transition-colors duration-300">{link.label}</button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => scrollTo('#contact')} className="hidden lg:inline-flex items-center px-6 py-2.5 border border-bronze/60 text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase hover:bg-bronze hover:text-white transition-all duration-300">Start an Enquiry</button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-charcoal-dark p-2" aria-label="Toggle menu">
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-charcoal-dark/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-80 bg-white transform transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="pt-24 px-8 flex flex-col gap-1">
            {navLinks.map(link => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="py-3 text-left text-[14px] font-medium tracking-[0.06em] uppercase border-b border-charcoal-dark/10 text-charcoal-dark/70 hover:text-bronze transition-colors duration-300">{link.label}</button>
            ))}
            <button onClick={() => scrollTo('#contact')} className="mt-8 inline-flex items-center px-6 py-3 border border-bronze/60 text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase hover:bg-bronze hover:text-white transition-all duration-300">Start an Enquiry</button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="African savanna" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark/80 via-charcoal-dark/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/60 via-transparent to-charcoal-dark/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-6 animate-fade-in">Corporate Safari Incentives</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light leading-[1.1] mb-8 animate-fade-in">
              Where Business Performance<span className="block text-sand italic mt-2">Meets Wilderness</span>
            </h1>
            <p className="text-sand-light/70 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10 animate-fade-in">
              Boardroom Safaris designs and delivers premium African safari incentive programmes for the world's most ambitious organisations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <button onClick={() => scrollTo('#contact')} className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300">
                Discuss Your Programme <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollTo('#incentives')} className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:border-bronze/60 hover:text-bronze transition-all duration-300">
                Explore Incentives
              </button>
              <button onClick={() => setShowBrochureModal(true)} className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:border-sand/60 hover:text-sand transition-all duration-300">
                <Download size={16} />
                Download Brochure
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-sand-light/40 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-sand-light/40 to-transparent" />
        </div>
      </section>

      {/* About / Positioning */}
      <section id="about" className="bg-sand-lightest py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">A Different Approach</p>
              <h2 className="heading-secondary text-charcoal mb-8">
                We are not a travel company.<span className="block mt-2 text-charcoal/60">We are a strategic incentive partner.</span>
              </h2>
              <p className="body-copy text-charcoal/60 max-w-2xl mx-auto">
                Boardroom Safaris sits at the intersection of corporate strategy, executive incentives, and African wilderness experiences. We design programmes that drive measurable business outcomes — delivered through Africa's most transformative environments.
              </p>
            </div>
          </Reveal>
          {/* Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { icon: Shield, title: 'Discretion', desc: 'Every engagement is handled with the utmost confidentiality and professionalism.' },
              { icon: Eye, title: 'Intentionality', desc: 'Every element — from lodge selection to dining — is designed with purpose.' },
              { icon: Heart, title: 'Authenticity', desc: 'Genuine African experiences, not manufactured tourism.' },
              { icon: Zap, title: 'Impact', desc: 'Success measured by business outcomes, not just destination beauty.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="p-6 border border-sand/30 hover:border-bronze/30 transition-colors duration-300 bg-white">
                  <div className="w-12 h-12 border border-bronze/30 flex items-center justify-center mb-5">
                    <item.icon size={20} className="text-bronze" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal font-light mb-2">{item.title}</h3>
                  <p className="text-charcoal/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Incentives */}
      <section id="incentives" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 text-center">Our Programmes</p>
            <h2 className="heading-secondary text-charcoal text-center mb-8">Two Pillars of Incentive Excellence</h2>
            <div className="flex justify-center mb-12">
              <button onClick={() => setShowBrochureModal(true)} className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-dark text-white text-[12px] font-semibold tracking-[0.1em] uppercase hover:bg-bronze transition-all duration-300">
                <Download size={16} />
                Download Programme Overview
              </button>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Reveal delay={100}>
              <div className="group relative overflow-hidden h-[500px]">
                <img src={IMAGES.tentInterior} alt="Executive safari" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 border border-bronze/40 flex items-center justify-center"><Users size={18} className="text-bronze" /></div>
                    <span className="text-bronze text-[11px] font-semibold tracking-[0.15em] uppercase">Programme One</span>
                  </div>
                  <h3 className="font-serif text-3xl text-white font-light mb-3">Talent & Leadership Incentives</h3>
                  <p className="body-copy text-sand-light/60 mb-6 max-w-md">Reward and retain your most valuable people. Intimate, high-touch safari experiences designed for executive teams, senior leadership, and high-potential talent.</p>
                  <button onClick={() => scrollTo('#contact')} className="inline-flex items-center gap-2 text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase hover:gap-3 transition-all duration-300">Enquire Now <ArrowRight size={14} /></button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="group relative overflow-hidden h-[500px]">
                <img src={IMAGES.privateDining} alt="Corporate safari dining" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 border border-bronze/40 flex items-center justify-center"><TrendingUp size={18} className="text-bronze" /></div>
                    <span className="text-bronze text-[11px] font-semibold tracking-[0.15em] uppercase">Programme Two</span>
                  </div>
                  <h3 className="font-serif text-3xl text-white font-light mb-3">Sales & Growth Incentives</h3>
                  <p className="body-copy text-sand-light/60 mb-6 max-w-md">Drive revenue performance with aspirational rewards. Scalable safari programmes designed to motivate sales teams, channel partners, and top performers.</p>
                  <button onClick={() => scrollTo('#contact')} className="inline-flex items-center gap-2 text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase hover:gap-3 transition-all duration-300">Enquire Now <ArrowRight size={14} /></button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="bg-charcoal-dark py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">Destinations</p>
            <h2 className="heading-secondary text-sand-light mb-14">Africa's Finest Safari Regions</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <Reveal key={dest.name} delay={i * 100}>
                <div className="group relative block overflow-hidden aspect-[4/3] cursor-pointer" onClick={() => scrollTo('#contact')}>
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-sand-light/50 text-[11px] tracking-[0.15em] uppercase mb-1">{dest.country}</p>
                    <h3 className="font-serif text-xl text-white font-light group-hover:text-bronze transition-colors duration-300">{dest.name}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="bg-sand-lighter py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">Our Process</p>
              <h2 className="heading-secondary text-charcoal mb-4">How We Work</h2>
              <p className="body-copy text-charcoal/50 max-w-xl mx-auto">A structured, consultative approach that ensures every programme delivers on its strategic objectives.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your business objectives, audience, and desired outcomes.', icon: Compass },
              { step: '02', title: 'Strategy', desc: 'Designing an incentive framework aligned to your commercial goals.', icon: Target },
              { step: '03', title: 'Curation', desc: 'Selecting the perfect destinations, lodges, and experiences.', icon: Globe },
              { step: '04', title: 'Delivery', desc: 'End-to-end programme management with meticulous attention to detail.', icon: Briefcase },
              { step: '05', title: 'Impact', desc: "Measuring outcomes and reinforcing the programme's business value.", icon: Award },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 100}>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <div className="w-12 h-12 border border-bronze/30 flex items-center justify-center"><item.icon size={20} className="text-bronze" /></div>
                  </div>
                  <span className="text-bronze/50 text-[11px] font-semibold tracking-[0.15em] uppercase">Step {item.step}</span>
                  <h3 className="font-serif text-xl text-charcoal font-medium mt-2 mb-3">{item.title}</h3>
                  <p className="text-charcoal/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">Why Boardroom Safaris</p>
                <h2 className="heading-secondary text-charcoal mb-8">
                  The precision of the boardroom.<span className="block mt-1 text-charcoal/60">The perspective of the wilderness.</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { title: 'Strategic, Not Touristic', desc: 'Every programme is designed around your business objectives — not a travel itinerary.' },
                    { title: 'Boutique & High-Touch', desc: 'We work with a select number of clients, ensuring uncompromising attention and discretion.' },
                    { title: 'Africa Expertise', desc: "Deep relationships with Africa's finest private lodges and conservation areas." },
                    { title: 'End-to-End Delivery', desc: "From strategy to execution, we manage every detail so you don't have to." },
                  ].map(item => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-px bg-bronze/30 flex-shrink-0 mt-1" style={{ minHeight: '40px' }} />
                      <div>
                        <h4 className="text-charcoal font-medium text-sm mb-1">{item.title}</h4>
                        <p className="text-charcoal/50 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="relative">
                <img src={IMAGES.boardroom} alt="Where corporate meets wilderness" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute -bottom-6 -left-6 bg-charcoal-dark p-8 max-w-xs hidden lg:block">
                  <p className="font-serif text-2xl text-sand-light font-light italic leading-snug">"Rewarding success beyond the boardroom."</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {[
                { value: '15+', label: 'Years of Experience' },
                { value: '200+', label: 'Programmes Delivered' },
                { value: '6', label: 'African Countries' },
                { value: '98%', label: 'Client Retention' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-4xl lg:text-5xl text-bronze font-light mb-2">{stat.value}</p>
                  <p className="text-sand-light/50 text-[11px] tracking-[0.1em] uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-sand-lightest py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-12 h-px bg-bronze mx-auto mb-8" />
              <blockquote className="font-serif text-2xl md:text-3xl text-charcoal font-light italic leading-relaxed mb-8">
                "Boardroom Safaris understood our business objectives from the first conversation. The programme they delivered didn't just reward our top performers — it transformed how they see themselves within the organisation."
              </blockquote>
              <p className="text-charcoal font-medium text-sm">James Harrington</p>
              <p className="text-charcoal/50 text-sm">Managing Director, Global Sales — Fortune 500 Technology Company</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-sand-lighter py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">Contact</p>
              <h2 className="heading-secondary text-charcoal">Start a Conversation</h2>
            </div>
          </Reveal>
          {contactSubmitted ? (
            <Reveal>
              <div className="max-w-lg mx-auto text-center py-16">
                <div className="w-16 h-16 border border-bronze/30 flex items-center justify-center mx-auto mb-8"><Award size={32} className="text-bronze" /></div>
                <h3 className="font-serif text-3xl text-charcoal font-light mb-4">Thank You</h3>
                <p className="text-charcoal/60 text-base leading-relaxed mb-8">Your enquiry has been received. A member of our team will be in touch within 24 hours.</p>
                <button onClick={() => { setContactSubmitted(false); setContactForm({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '', companySize: '', incentiveType: '', groupSize: '', timeline: '', message: '' }); }} className="text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase">Submit Another Enquiry</button>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8">
                <Reveal>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">First Name *</label>
                        <input type="text" value={contactForm.firstName} onChange={e => handleContactChange('firstName', e.target.value)} className={inputCls('firstName')} placeholder="First name" />
                        {contactErrors.firstName && <p className="text-red-500 text-xs mt-1">{contactErrors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">Last Name *</label>
                        <input type="text" value={contactForm.lastName} onChange={e => handleContactChange('lastName', e.target.value)} className={inputCls('lastName')} placeholder="Last name" />
                        {contactErrors.lastName && <p className="text-red-500 text-xs mt-1">{contactErrors.lastName}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">Email *</label>
                        <input type="email" value={contactForm.email} onChange={e => handleContactChange('email', e.target.value)} className={inputCls('email')} placeholder="email@company.com" />
                        {contactErrors.email && <p className="text-red-500 text-xs mt-1">{contactErrors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">Phone</label>
                        <input type="tel" value={contactForm.phone} onChange={e => handleContactChange('phone', e.target.value)} className={inputCls('phone')} placeholder="+44 000 000 0000" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">Company *</label>
                        <input type="text" value={contactForm.company} onChange={e => handleContactChange('company', e.target.value)} className={inputCls('company')} placeholder="Company name" />
                        {contactErrors.company && <p className="text-red-500 text-xs mt-1">{contactErrors.company}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">Incentive Type *</label>
                        <select value={contactForm.incentiveType} onChange={e => handleContactChange('incentiveType', e.target.value)} className={selectCls('incentiveType')}>
                          <option value="">Select type</option>
                          <option value="talent">Talent & Leadership</option>
                          <option value="sales">Sales & Growth</option>
                          <option value="both">Both / Not Sure</option>
                        </select>
                        {contactErrors.incentiveType && <p className="text-red-500 text-xs mt-1">{contactErrors.incentiveType}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">Group Size</label>
                        <select value={contactForm.groupSize} onChange={e => handleContactChange('groupSize', e.target.value)} className={selectCls('groupSize')}>
                          <option value="">Select size</option>
                          <option value="4-10">4–10</option><option value="11-20">11–20</option><option value="21-50">21–50</option><option value="51-100">51–100</option><option value="100+">100+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">Timeline</label>
                        <select value={contactForm.timeline} onChange={e => handleContactChange('timeline', e.target.value)} className={selectCls('timeline')}>
                          <option value="">Select timeline</option>
                          <option value="3-6">3–6 months</option><option value="6-12">6–12 months</option><option value="12+">12+ months</option><option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">Message</label>
                      <textarea value={contactForm.message} onChange={e => handleContactChange('message', e.target.value)} rows={4} className="w-full px-4 py-3 bg-white border border-sand/40 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-bronze/50 transition-colors resize-none" placeholder="Tell us about your objectives..." />
                    </div>
                    <button type="submit" disabled={contactSubmitting} className="inline-flex items-center gap-3 px-10 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300 disabled:opacity-60">
                      {contactSubmitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</> : <>Submit Enquiry <ArrowRight size={16} /></>}
                    </button>
                  </form>
                </Reveal>
              </div>
              <div className="lg:col-span-4">
                <Reveal delay={200}>
                  <div className="space-y-8">
                    <div className="bg-white p-8 border border-sand/20">
                      <h3 className="font-serif text-xl text-charcoal font-light mb-6">Direct Contact</h3>
                      <div className="space-y-5">
                        <div className="flex items-start gap-3"><Mail size={16} className="text-bronze mt-0.5 flex-shrink-0" /><div><p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-1">Email</p><a href="mailto:enquiries@boardroomsafaris.com" className="text-charcoal text-sm hover:text-bronze transition-colors">enquiries@boardroomsafaris.com</a></div></div>
                        <div className="flex items-start gap-3"><Phone size={16} className="text-bronze mt-0.5 flex-shrink-0" /><div><p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-1">Phone</p><p className="text-charcoal text-sm">+27 (0) 21 000 0000</p></div></div>
                        <div className="flex items-start gap-3"><MapPin size={16} className="text-bronze mt-0.5 flex-shrink-0" /><div><p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-1">Office</p><p className="text-charcoal text-sm">Cape Town, South Africa</p></div></div>
                      </div>
                    </div>
                    <div className="bg-charcoal-dark p-8">
                      <h3 className="font-serif text-xl text-sand-light font-light mb-4">Confidentiality</h3>
                      <p className="text-sand-light/50 text-sm leading-relaxed">All enquiries are treated with complete confidentiality. We handle every conversation with discretion.</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-dark text-sand-light/70">
        <div className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <h3 className="font-serif text-3xl lg:text-4xl text-sand-light font-light mb-3">Ready to elevate your incentive programme?</h3>
                <p className="text-sand-light/50 text-sm max-w-xl">Begin a confidential conversation about how Boardroom Safaris can transform your corporate incentive strategy.</p>
              </div>
              <button onClick={() => scrollTo('#contact')} className="inline-flex items-center gap-3 px-8 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300 whitespace-nowrap">
                Discuss Your Programme <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 lg:gap-6">
            <div>
              <img src={IMAGES.logo} alt="Boardroom Safaris" className="h-12 w-auto mb-6 brightness-110" />
              <p className="text-sm leading-relaxed mb-6 text-sand-light/50">Transforming business performance into meaningful, unforgettable experiences in Africa's most powerful environments.</p>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/company/boardroom-safaris/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-bronze hover:text-bronze transition-all duration-300"><Linkedin size={16} /></a>
                <a href="https://www.instagram.com/boardroom_safaris?igsh=MWpiM2JlbzJtNGJ2Yg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-bronze hover:text-bronze transition-all duration-300"><Instagram size={16} /></a>
              </div>
            </div>
            <div className="md:col-span-2 text-center">
              <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-sand-light/40 mb-6">Navigation</h4>
              <div className="flex flex-col gap-3 items-center">
                <button onClick={() => scrollTo('#about')} className="text-sm hover:text-bronze transition-colors duration-300">About</button>
                <button onClick={() => scrollTo('#incentives')} className="text-sm hover:text-bronze transition-colors duration-300">Incentive Programmes</button>
                <button onClick={() => scrollTo('#destinations')} className="text-sm hover:text-bronze transition-colors duration-300">Destinations</button>
                <button onClick={() => scrollTo('#why-us')} className="text-sm hover:text-bronze transition-colors duration-300">Why choose Boardroom Safaris</button>
                <button onClick={() => scrollTo('#contact')} className="text-sm hover:text-bronze transition-colors duration-300">Contact</button>
              </div>
            </div>
            <div className="px-12">
              <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-sand-light/40 mb-6">Contact</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-bronze/60 flex-shrink-0" /><span className="text-sm">Cape Town, South Africa</span></div>
                <div className="flex items-start gap-3"><Phone size={16} className="mt-0.5 text-bronze/60 flex-shrink-0" /><span className="text-sm">+27 (0) 21 000 0000</span></div>
                <div className="flex items-start gap-3"><Phone size={16} className="mt-0.5 text-bronze/60 flex-shrink-0" /><span className="text-sm">083 253 8333</span></div>
                <div className="flex items-start gap-3"><Mail size={16} className="mt-0.5 text-bronze/60 flex-shrink-0" /><a href="mailto:enquiries@boardroomsafaris.com" className="text-sm hover:text-bronze transition-colors">enquiries@boardroomsafaris.com</a></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <p className="text-xs text-sand-light/30 text-center">&copy; {new Date().getFullYear()} Boardroom Safaris. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Brochure Download Modal */}
      <BrochureDownloadModal
        isOpen={showBrochureModal}
        onOpenChange={setShowBrochureModal}
      />
    </div>
  );
};

export default AppLayout;
