import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PageWrapper from '@/components/PageWrapper';
import { contentParagraphs } from '@/lib/contentCatalog';
import { useContent } from '@/lib/siteContent';
import SectionReveal from '@/components/SectionReveal';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  companySize: string;
  incentiveType: string;
  groupSize: string;
  timeline: string;
  budgetRange: string;
  message: string;
}

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  companySize: '',
  incentiveType: '',
  groupSize: '',
  timeline: '',
  budgetRange: '',
  message: '',
};

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const { text } = useContent();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.company.trim()) newErrors.company = 'Company name is required';
    if (!form.incentiveType) newErrors.incentiveType = 'Please select an incentive type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {

      const emailResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!emailResponse.ok) {
        const emailError = await emailResponse.json().catch(() => null);
        console.error('Error sending enquiry email:', emailError);
        toast({
          title: 'Error',
          description: 'Failed to submit enquiry. Please try again.',
          variant: 'destructive',
        });
        setSubmitting(false);
        return;
      }

      toast({
        title: 'Success',
        description: 'Your enquiry has been received. We will be in touch within 24 hours.',
      });

      setSubmitting(false);
      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 bg-white border text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none transition-colors duration-300 ${
      errors[field] ? 'border-red-400 focus:border-red-500' : 'border-sand/40 focus:border-bronze/50'
    }`;

  const selectClass = (field: keyof FormData) =>
    `w-full px-4 py-3 bg-white border text-sm text-charcoal focus:outline-none transition-colors duration-300 appearance-none ${
      errors[field] ? 'border-red-400 focus:border-red-500' : 'border-sand/40 focus:border-bronze/50'
    } ${!form[field] ? 'text-charcoal/30' : ''}`;

  if (submitted) {
    return (
      <PageWrapper>
        <section className="min-h-[80vh] flex items-center justify-center bg-sand-lightest pt-24">
          <div className="max-w-lg mx-auto px-6 text-center">
            <div className="w-16 h-16 border border-bronze/30 flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={32} className="text-bronze" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal font-light mb-4">
              {text('contact.thanks.heading')}
            </h1>
            <p className="text-charcoal/60 text-base leading-relaxed mb-8">
              {text('contact.thanks.body')}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-2 text-bronze text-[12px] font-semibold tracking-[0.1em] uppercase hover:gap-3 transition-all duration-300"
            >
              Submit Another Enquiry
            </button>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={text('contact.hero.image')}
            alt="Contact Boardroom Safaris"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/40 to-charcoal-dark/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-16">
          <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
            {text('contact.hero.eyebrow')}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
            {text('contact.hero.heading')}
          </h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-sand-lightest py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form */}
            <div className="lg:col-span-8">
              <SectionReveal>
                <div className="border-sand/30 mb-10">
                  <h3 className="heading-secondary text-charcoal mb-4">
                    {text('contact.intro.heading')}
                  </h3>
                  <div className="space-y-4 text-charcoal/60 text-sm leading-relaxed">
                    {contentParagraphs(text('contact.intro.body')).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-charcoal font-light mb-2">
                    {text('contact.form.heading')}
                  </h2>
                  <p className="body-copy text-charcoal/50 mb-10">
                    {text('contact.form.intro')}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          className={inputClass('firstName')}
                          placeholder="First name"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={form.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          className={inputClass('lastName')}
                          placeholder="Last name"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={inputClass('email')}
                          placeholder="email@company.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className={inputClass('phone')}
                          placeholder="+44 000 000 0000"
                        />
                      </div>
                    </div>

                    {/* Company & Job Title */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                          Company *
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          className={inputClass('company')}
                          placeholder="Company name"
                        />
                        {errors.company && (
                          <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={form.jobTitle}
                          onChange={(e) => handleChange('jobTitle', e.target.value)}
                          className={inputClass('jobTitle')}
                          placeholder="Your role"
                        />
                      </div>
                    </div>

                    {/* Company Size & Incentive Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                          Company Size
                        </label>
                        <select
                          value={form.companySize}
                          onChange={(e) => handleChange('companySize', e.target.value)}
                          className={selectClass('companySize')}
                        >
                          <option value="">Select company size</option>
                          <option value="1-50">1 – 50 employees</option>
                          <option value="51-200">51 – 200 employees</option>
                          <option value="201-1000">201 – 1,000 employees</option>
                          <option value="1001-5000">1,001 – 5,000 employees</option>
                          <option value="5000+">5,000+ employees</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                          Incentive Type *
                        </label>
                        <select
                          value={form.incentiveType}
                          onChange={(e) => handleChange('incentiveType', e.target.value)}
                          className={selectClass('incentiveType')}
                        >
                          <option value="">Select incentive type</option>
                          <option value="talent-leadership">Talent & Leadership Incentive</option>
                          <option value="sales-growth">Sales & Growth Incentive</option>
                          <option value="both">Both / Not Sure</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.incentiveType && (
                          <p className="text-red-500 text-xs mt-1">{errors.incentiveType}</p>
                        )}
                      </div>
                    </div>

                    {/* Group Size & Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                          Estimated Group Size
                        </label>
                        <select
                          value={form.groupSize}
                          onChange={(e) => handleChange('groupSize', e.target.value)}
                          className={selectClass('groupSize')}
                        >
                          <option value="">Select group size</option>
                          <option value="4-10">4 – 10 guests</option>
                          <option value="11-20">11 – 20 guests</option>
                          <option value="21-50">21 – 50 guests</option>
                          <option value="51-100">51 – 100 guests</option>
                          <option value="100+">100+ guests</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                          Preferred Timeline
                        </label>
                        <select
                          value={form.timeline}
                          onChange={(e) => handleChange('timeline', e.target.value)}
                          className={selectClass('timeline')}
                        >
                          <option value="">Select timeline</option>
                          <option value="3-6">Within 3 – 6 months</option>
                          <option value="6-12">Within 6 – 12 months</option>
                          <option value="12+">12+ months</option>
                          <option value="flexible">Flexible / Exploring</option>
                        </select>
                      </div>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                        Budget Range
                      </label>
                      <select
                        value={form.budgetRange}
                        onChange={(e) => handleChange('budgetRange', e.target.value)}
                        className={selectClass('budgetRange')}
                      >
                        <option value="">Select budget range (optional)</option>
                        <option value="150k-500k">R150,000 – R500,000</option>
                        <option value="500k-1.5m">R500,000 – R1,500,000</option>
                        <option value="1.5m+">R1,500,000+</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/50 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 bg-white border border-sand/40 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-bronze/50 transition-colors duration-300 resize-none"
                        placeholder="Tell us about your objectives, any specific requirements, or questions you may have..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-3 px-10 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Submit Enquiry
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </SectionReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <SectionReveal delay={200}>
                <div className="space-y-8">
                  <div className="bg-white p-8 border border-sand/20 text-center sm:text-left">
                    <h3 className="font-serif text-xl text-charcoal font-light mb-6">
                      {text('contact.details.heading')}
                    </h3>
                    <div className="space-y-5">
                      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                        <Mail size={16} className="text-bronze mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-1">Email</p>
                          <a
                            href={`mailto:${text('contact.email')}`}
                            className="text-charcoal text-sm hover:text-bronze transition-colors"
                          >
                            {text('contact.email')}
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                        <Phone size={16} className="text-bronze mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-1">Phone</p>
                          <p className="text-charcoal text-sm">{text('contact.phone')}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                        <MapPin size={16} className="text-bronze mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-1">Office</p>
                          <p className="text-charcoal text-sm">{text('contact.office')}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                        <Clock size={16} className="text-bronze mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-charcoal/40 mb-1">Response Time</p>
                          <p className="text-charcoal text-sm">{text('contact.response')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-charcoal-dark p-8">
                    <h3 className="font-serif text-xl text-sand-light font-light mb-4">
                      {text('contact.confidential.heading')}
                    </h3>
                    <p className="text-sand-light/50 text-sm leading-relaxed">
                      {text('contact.confidential.body')}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ContactPage;
