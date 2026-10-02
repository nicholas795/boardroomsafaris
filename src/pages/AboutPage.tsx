import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import SectionReveal from '@/components/SectionReveal';
import { contentParagraphs } from '@/lib/contentCatalog';
import { useContent } from '@/lib/siteContent';
import { ArrowRight, Shield, Eye, Heart, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { text } = useContent();
  const philosophy = [
    { icon: Shield, title: text('about.philosophy.1.title'), desc: text('about.philosophy.1.body') },
    { icon: Eye, title: text('about.philosophy.2.title'), desc: text('about.philosophy.2.body') },
    { icon: Heart, title: text('about.philosophy.3.title'), desc: text('about.philosophy.3.body') },
    { icon: Zap, title: text('about.philosophy.4.title'), desc: text('about.philosophy.4.body') },
  ];

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={text('about.hero.image')}
            alt="About Boardroom Safaris"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/40 to-charcoal-dark/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-16">
          <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
            {text('about.hero.eyebrow')}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
            {text('about.hero.heading')}
          </h1>
        </div>
      </section>

      {/* Positioning */}
      <section className="bg-sand-lightest py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal className="w-full">
              <div className="text-center lg:text-left w-full">
                <div className="space-y-6 body-copy text-charcoal/60 w-full hyphens-auto break-words">
                  {contentParagraphs(text('about.story.body')).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={200}>
              <div className="relative">
                <img
                  src={text('about.story.image')}
                  alt="Premium safari lodge"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-bronze/10 -z-10" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="heading-secondary text-charcoal max-w-2xl mx-auto">
                {text('about.philosophy.heading')}
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophy.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 100}>
                <div className="p-8 lg:p-10 border border-sand/30 hover:border-bronze/30 transition-colors duration-300 flex flex-col items-center text-center">
                  <div className="w-12 h-12 border border-bronze/30 flex items-center justify-center mb-6">
                    <item.icon size={22} className="text-bronze" />
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal font-light mb-3">
                    {item.title}
                  </h3>
                  <p className="text-charcoal/50 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={text('about.expertise.image')}
            alt="African wilderness"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-dark/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl">
              <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
                {text('about.expertise.eyebrow')}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-white font-light leading-tight mb-8">
                {text('about.expertise.heading')}
              </h2>
              <div className="space-y-6 body-copy text-sand-light/60">
                {contentParagraphs(text('about.expertise.body')).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300 mt-10"
              >
                {text('about.expertise.button')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageWrapper>
  );
};

export default AboutPage;
