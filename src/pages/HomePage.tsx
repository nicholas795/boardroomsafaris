import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import { useContent } from '@/lib/siteContent';
import SectionReveal from '@/components/SectionReveal';
import {
  ArrowRight,
  Award,
  Users,
  TrendingUp,
  Shield,
  Compass,
  Target,
  Briefcase,
  Globe,
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { text } = useContent();

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-end justify-center overflow-hidden pb-16 lg:pb-24">
        <div className="absolute inset-0">
          <img
            src={text('home.hero.image')}
            alt="African savanna landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark/80 via-charcoal-dark/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/60 via-transparent to-charcoal-dark/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl text-center sm:text-left">
            <div className="animate-fade-in-up">
              <p className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
                {text('home.hero.eyebrow')}
              </p>
            </div>
            <h1
              className="animate-fade-in-up animation-delay-200 heading-primary leading-[1.1] mb-8 text-sand-light/70"
              style={{ textShadow: '6px 6px 12px rgba(0,0,0)' }}
            >
                {text('home.hero.headline')}
                <span className="italic"> {text('home.hero.headlineItalic')}</span>
            </h1>
            <p className="animate-fade-in-up animation-delay-400 body-copy text-sand-light/70 max-w-xl mb-10 mx-auto sm:mx-0">
              {text('home.hero.body')}
            </p>
            <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300"
              >
                {text('home.hero.button')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animation-delay-800">
          <span className="text-sand-light/40 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-sand-light/40 to-transparent" />
        </div>
      </section>

      {/* Positioning Statement */}
      <section className="bg-sand-lightest py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
                {text('home.positioning.eyebrow')}
              </p>
              <h2 className="heading-secondary text-charcoal mb-8">
                {text('home.positioning.heading')}
                <span className="block mt-2 text-charcoal/60">{text('home.positioning.subheading')}</span>
              </h2>
              <p className="body-copy text-charcoal/60 max-w-2xl mx-auto">
                {text('home.positioning.body')}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Two Core Services */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 text-center">
              {text('home.programmes.eyebrow')}
            </p>
            <h2 className="heading-secondary text-charcoal text-center mb-16">
              {text('home.programmes.heading')}
            </h2>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div className="group overflow-hidden lg:flex lg:items-stretch lg:gap-16">
              <div className="bg-white p-8 lg:p-10 lg:w-[45%] lg:pr-6">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                  <div className="w-10 h-10 border border-bronze/40 flex items-center justify-center">
                    <Users size={18} className="text-charcoal" />
                  </div>
                  <span className="text-charcoal text-[11px] font-bold tracking-[0.15em] uppercase">
                    {text('home.programme1.label')}
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-charcoal font-light mb-3">
                  {text('home.programme1.title')}
                </h3>
                <p className="text-charcoal/70 text-sm leading-relaxed mb-6 max-w-md">
                  {text('home.programme1.body')}
                </p>
                <Link
                  to="/incentives#executive-programme"
                  className="inline-flex items-center gap-2 text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase hover:gap-3 transition-all duration-300"
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
              <div className="relative overflow-hidden h-[500px] lg:w-[55%] lg:ml-6">
                <img
                  src={text('home.programme1.image')}
                  alt="Executive safari experience"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white pt-0 pb-16 lg:pt-0 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal delay={200}>
            <div className="group overflow-hidden lg:flex lg:items-stretch lg:gap-16">
              <div className="relative overflow-hidden h-[500px] lg:w-[55%] lg:mr-6">
                <img
                  src={text('home.programme2.image')}
                  alt="Corporate safari dining"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="bg-white p-8 lg:p-10 lg:w-[45%] lg:pl-6">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                  <div className="w-10 h-10 border border-bronze/40 flex items-center justify-center">
                    <TrendingUp size={18} className="text-charcoal" />
                  </div>
                  <span className="text-charcoal text-[11px] font-bold tracking-[0.15em] uppercase">
                    {text('home.programme2.label')}
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-charcoal font-light mb-3">
                  {text('home.programme2.title')}
                </h3>
                <p className="text-charcoal/70 text-sm leading-relaxed mb-6 max-w-md">
                  {text('home.programme2.body')}
                </p>
                <Link
                  to="/incentives#growth-programme"
                  className="inline-flex items-center gap-2 text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase hover:gap-3 transition-all duration-300"
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={text('home.cta.image')}
            alt="African wilderness"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-dark/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <SectionReveal>
            <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
              {text('home.cta.eyebrow')}
            </p>
            <h2 className="heading-secondary text-white font-light leading-tight mb-6 max-w-2xl mx-auto">
              {text('home.cta.heading')}
            </h2>
            <p className="body-copy text-sand-light/60 max-w-xl mx-auto mb-10">
              {text('home.cta.body')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300"
            >
              {text('home.cta.button')}
              <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </PageWrapper>
  );
};

export default HomePage;
