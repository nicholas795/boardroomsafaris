import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import SectionReveal from '@/components/SectionReveal';
import { contentLines } from '@/lib/contentCatalog';
import { useContent } from '@/lib/siteContent';
import { useScrollToHash } from '@/lib/useScrollToHash';
import { ArrowRight, Users, TrendingUp, Check, ChevronDown, ChevronUp } from 'lucide-react';

const IncentivesPage: React.FC = () => {
  const { text } = useContent();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useScrollToHash();
  const executiveFeatures = contentLines(text('incentives.executive.features'));
  const groupFeatures = contentLines(text('incentives.growth.features'));
  const faqs = [1, 2, 3, 4].map((index) => ({
    q: text(`incentives.faq.${index}.q`),
    a: text(`incentives.faq.${index}.a`),
  }));

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={text('incentives.hero.image')}
            alt="Safari incentive experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/40 to-charcoal-dark/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-16">
          <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
            {text('incentives.hero.eyebrow')}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight max-w-3xl">
            {text('incentives.hero.heading')}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-sand-lightest py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-secondary text-charcoal leading-tight mb-6">
                {text('incentives.intro.heading')}
              </h2>
              <p className="body-copy text-charcoal/60 leading-relaxed">
                {text('incentives.intro.body')}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Executive / Micro Incentives */}
      <section id="executive-programme" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div className="relative">
                <img
                  src={text('incentives.executive.image')}
                  alt="Executive safari experience"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </SectionReveal>

            <SectionReveal delay={200}>
              <div>
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 mb-6">
                  <div className="w-10 h-10 border border-bronze/40 flex items-center justify-center">
                    <Users size={18} className="text-bronze" />
                  </div>
                  <span className="text-bronze text-[11px] font-semibold tracking-[0.15em] uppercase">
                    {text('incentives.executive.label')}
                  </span>
                </div>
                <h2 className="heading-secondary text-charcoal leading-tight mb-6">
                  {text('incentives.executive.heading')}
                </h2>
                <p className="body-copy text-charcoal/60 leading-relaxed mb-8">
                  {text('incentives.executive.body')}
                </p>
                <p className="body-copy text-charcoal/50 mb-8">
                  {text('incentives.executive.ideal')}
                </p>
                <div className="space-y-3 mb-8">
                  {executiveFeatures.map((f) => (
                    <div key={f} className="flex items-start gap-3 text-left">
                      <Check size={16} className="text-bronze mt-1 flex-shrink-0" />
                      <span className="text-charcoal/70 text-sm leading-relaxed flex-1">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase hover:gap-3 transition-all duration-300"
                >
                  Enquire About This Programme <ArrowRight size={14} />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-sand-lighter">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-px bg-sand/50" />
        </div>
      </div>

      {/* Group / Macro Incentives */}
      <section id="growth-programme" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal delay={200}>
              <div className="order-2 lg:order-1">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 mb-6">
                  <div className="w-10 h-10 border border-bronze/40 flex items-center justify-center">
                    <TrendingUp size={18} className="text-bronze" />
                  </div>
                  <span className="text-bronze text-[11px] font-semibold tracking-[0.15em] uppercase">
                    {text('incentives.growth.label')}
                  </span>
                </div>
                <h2 className="heading-secondary text-charcoal leading-tight mb-6">
                  {text('incentives.growth.heading')}
                </h2>
                <p className="body-copy text-charcoal/60 leading-relaxed mb-8">
                  {text('incentives.growth.body')}
                </p>
                <p className="body-copy text-charcoal/50 mb-8">
                  {text('incentives.growth.ideal')}
                </p>
                <div className="space-y-3 mb-8">
                  {groupFeatures.map((f) => (
                    <div key={f} className="flex items-start gap-3 text-left">
                      <Check size={16} className="text-bronze mt-1 flex-shrink-0" />
                      <span className="text-charcoal/70 text-sm leading-relaxed flex-1">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase hover:gap-3 transition-all duration-300"
                >
                  Enquire About This Programme <ArrowRight size={14} />
                </Link>
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="relative order-1 lg:order-2">
                <img
                  src={text('incentives.growth.image')}
                  alt="Group safari incentive"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand-lighter py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-14">
              <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
                {text('incentives.faq.eyebrow')}
              </p>
              <h2 className="heading-secondary text-charcoal">
                {text('incentives.faq.heading')}
              </h2>
            </div>
          </SectionReveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <div className="border border-sand/40 bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-medium text-charcoal text-sm pr-4">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp size={18} className="text-bronze flex-shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-bronze flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-6 pb-6 text-charcoal/50 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300"
            >
              {text('incentives.faq.button')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default IncentivesPage;
