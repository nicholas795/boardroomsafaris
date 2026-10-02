import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import SectionReveal from '@/components/SectionReveal';
import Carousel from '@/components/Carousel';
import { DESTINATION_IDS } from '@/lib/contentCatalog';
import { useContent } from '@/lib/siteContent';
import { ArrowRight, X } from 'lucide-react';

const DestinationsPage: React.FC = () => {
  const { text } = useContent();
  const [selectedDest, setSelectedDest] = useState<string | null>(null);
  const destinations = DESTINATION_IDS.map((id) => ({
    id,
    country: text(`destinations.${id}.country`),
    image: text(`destinations.${id}.image`),
    description: text(`destinations.${id}.description`),
  }));
  const activeDest = destinations.find((d) => d.id === selectedDest);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={text('destinations.hero.image')}
            alt="African safari destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/40 to-charcoal-dark/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-16">
          <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
            {text('destinations.hero.eyebrow')}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight max-w-3xl">
            {text('destinations.hero.heading')}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-sand-lightest py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="body-copy text-charcoal/60 leading-relaxed">
                {text('destinations.intro.body')}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Destinations Carousel */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <Carousel autoplay autoplayInterval={9000}>
              {destinations.map((dest) => (
                <div key={dest.id} className="group relative block overflow-hidden aspect-[4/3] w-full text-left rounded-md">
                  <button
                    onClick={() => setSelectedDest(dest.id)}
                    className="relative block w-full h-full text-left"
                  >
                    <img
                      src={dest.image}
                      alt={dest.country}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/80 via-charcoal-dark/20 to-transparent group-hover:from-charcoal-dark/90 transition-all duration-500 rounded-md" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="heading-secondary text-white group-hover:text-bronze transition-colors duration-300 mb-1">
                        {dest.country}
                      </h3>
                    </div>
                  </button>
                </div>
              ))}
            </Carousel>
          </SectionReveal>
        </div>
      </section>

      {/* Destination Detail Modal */}
      {activeDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal-dark/60 backdrop-blur-sm"
            onClick={() => setSelectedDest(null)}
          />
          <div className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <button
              onClick={() => setSelectedDest(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-charcoal-dark/80 flex items-center justify-center text-white hover:bg-charcoal transition-colors"
            >
              <X size={18} />
            </button>

            <div className="relative h-64 md:h-80">
              <img
                src={activeDest.image}
                alt={activeDest.country}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="heading-primary text-bronze text-[11px] font-semibold tracking-[0.15em] uppercase mb-2">
                  {activeDest.country}
                </p>
              </div>
            </div>

            <div className="p-8 lg:p-10">
              <p className="body-copy text-charcoal/60 mb-8 whitespace-pre-line">
                {activeDest.description.replace(/\n/g, '\n')}
              </p>

              <Link
                to="/contact"
                onClick={() => setSelectedDest(null)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300"
              >
                Enquire About {activeDest.country}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="bg-sand-lightest pt-10 pb-20 lg:pt-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="heading-secondary text-charcoal mb-6">
              {text('destinations.cta.heading')}
            </h2>
            <p className="body-copy text-charcoal/70 max-w-xl mx-auto mb-10">
              {text('destinations.cta.body')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300"
            >
              {text('destinations.cta.button')}
              <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </PageWrapper>
  );
};

export default DestinationsPage;
