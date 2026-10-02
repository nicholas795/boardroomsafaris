import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import SectionReveal from '@/components/SectionReveal';
import { useContent } from '@/lib/siteContent';
import { ArrowRight, Shield, Lock, Gem, Users } from 'lucide-react';

const WhyUsPage: React.FC = () => {
  const { text } = useContent();
  const cards = [
    { icon: Shield, title: text('why.card.1.title'), desc: text('why.card.1.body') },
    { icon: Gem, title: text('why.card.2.title'), desc: text('why.card.2.body') },
    { icon: Lock, title: text('why.card.3.title'), desc: text('why.card.3.body') },
    { icon: Users, title: text('why.card.4.title'), desc: text('why.card.4.body') },
  ];
  const outcomes = [1, 2, 3, 4].map((index) => text(`why.outcomes.${index}`));

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={text('why.hero.image')}
            alt="Why Boardroom Safaris"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/40 to-charcoal-dark/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-16">
          <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
            {text('why.hero.eyebrow')}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight max-w-3xl">
            {text('why.hero.heading')}
          </h1>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-sand-lightest py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="heading-secondary text-charcoal leading-tight mb-6">
                {text('why.value.heading')}
              </h2>
              <p className="body-copy text-charcoal/60 leading-relaxed">
                {text('why.value.body')}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 100}>
                <div className="p-8 bg-white border border-sand/20 hover:border-bronze/20 transition-all duration-300 h-full flex flex-col items-center text-center">
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

      {/* Business Outcomes */}
      <section className="bg-charcoal-dark py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div>
                <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
                  {text('why.outcomes.eyebrow')}
                </p>
                <h2 className="heading-secondary text-sand-light leading-tight mb-8">
                  {text('why.outcomes.heading')}
                </h2>
                <div className="space-y-6">
                  {outcomes.map((desc, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-px bg-bronze/40 flex-shrink-0 mt-1" style={{ minHeight: '40px' }} />
                      <div>
                        <p className="body-copy text-sand-light/50">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={200}>
              <img
                src={text('why.outcomes.image')}
                alt="Business outcomes"
                className="w-full aspect-[4/3] object-cover"
              />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[80vh] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={text('why.cta.image')}
            alt="Begin your programme"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-charcoal-dark/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-6 max-w-2xl mx-auto">
              {text('why.cta.heading')}
            </h2>
            <p className="text-sand-light/60 text-base font-light max-w-xl mx-auto mb-10">
              {text('why.cta.body')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300"
            >
              {text('why.cta.button')}
              <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </PageWrapper>
  );
};

export default WhyUsPage;
