import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import SectionReveal from '@/components/SectionReveal';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-charcoal-dark py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light leading-tight mt-4">
            Privacy Policy
          </h1>
          
          <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mt-4">
            Boardroom Safaris
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-sand-lightest py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="prose max-w-none text-charcoal/60">
              <h3>1. Introduction</h3>
              <p>
                Boardroom Safaris (“we”, “us”, “our”) is committed to protecting your privacy and ensuring that your personal information is collected and used properly, lawfully, and transparently. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you interact with us, whether through our website, email, or in the course of planning and delivering your travel experience.
              </p>

              <h3>2. Information We Collect</h3>
              <p>We may collect and process the following types of personal information:</p>
              <h4>a. Personal Identification Information</h4>
              <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Nationality</li>
              </ul>

              <h4>b. Travel-Related Information</h4>
              <ul>
                <li>Passport details (where required for bookings)</li>
                <li>Travel preferences and special requests</li>
                <li>Dietary requirements or medical considerations (only when voluntarily provided)</li>
              </ul>

              <h4>c. Corporate Information</h4>
              <ul>
                <li>Company name</li>
                <li>Job title</li>
                <li>Group travel requirements (for corporate or incentive bookings)</li>
              </ul>

              <h4>d. Technical Information</h4>
              <ul>
                <li>IP address</li>
                <li>Browser type and device information</li>
                <li>Website usage data via cookies or analytics tools</li>
              </ul>

              <h3>3. How We Use Your Information</h3>
              <p>We use your personal information to:</p>
              <ul>
                <li>Prepare and manage travel itineraries and bookings</li>
                <li>Communicate with you regarding enquiries, quotes, and confirmed services</li>
                <li>Coordinate with third-party suppliers (lodges, airlines, DMCs, transfer providers)</li>
                <li>Provide customer support before, during, and after your سفر</li>
                <li>Improve our website, services, and client experience</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>

              <h3>4. Sharing of Information</h3>
              <p>
                We respect your privacy and will never sell your personal information. However, we may share your information with:
              </p>
              <ul>
                <li>Trusted third-party travel providers, strictly for the purpose of fulfilling your booking</li>
                <li>Payment processors for secure transaction handling</li>
                <li>Regulatory authorities, where required by law</li>
              </ul>
              <p>All third parties are expected to handle your data securely and in accordance with applicable data protection laws.</p>

              <h3>5. International Data Transfers</h3>
              <p>
                Due to the nature of international travel, your personal information may be transferred to, and processed in, countries outside of South Africa. By engaging our services, you consent to such transfers where necessary to fulfil your travel arrangements.
              </p>

              <h3>6. Data Security</h3>
              <p>
                We take reasonable technical and organisational measures to protect your personal information from:
              </p>
              <ul>
                <li>Unauthorised access</li>
                <li>Loss or misuse</li>
                <li>Alteration or disclosure</li>
              </ul>
              <p>While we strive to protect your data, no method of transmission over the internet is completely secure.</p>

              <h3>7. Data Retention</h3>
              <p>
                We retain personal information only for as long as necessary to:
              </p>
              <ul>
                <li>Fulfil the purposes outlined in this policy</li>
                <li>Comply with legal, tax, or accounting requirements</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>

              <h3>8. Your Rights</h3>
              <p>Subject to applicable laws, you have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p>Requests can be made by contacting us using the details below.</p>

              <h3>9. Cookies &amp; Website Tracking</h3>
              <p>
                Our website may use cookies and similar technologies to:
              </p>
              <ul>
                <li>Enhance user experience</li>
                <li>Analyse website traffic</li>
                <li>Improve functionality</li>
              </ul>
              <p>You may adjust your browser settings to refuse cookies, although this may affect certain features of the site.</p>

              <h3>10. Third-Party Links</h3>
              <p>
                Our website may contain links to third-party websites. Boardroom Safaris is not responsible for the privacy practices or content of these external sites.
              </p>

              <h3>11. Updates to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. The latest version will always be available on our website.
              </p>

              <h3>12. Contact Us</h3>
              <p>
                If you have any questions or concerns regarding this Privacy Policy or how your data is handled, please contact:
              </p>
              <p>
                Boardroom Safaris<br />
                Email: enquiries@boardroomsafaris.com<br />
                Phone: +27 82 927 5408
              </p>

              <h3>13. Governing Law</h3>
              <p>
                This Privacy Policy is governed by the laws of South Africa, including applicable data protection legislation.
              </p>

              <p className="mt-6">Boardroom Safaris<br />Where corporate performance meets luxury in the African wilderness</p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageWrapper>
  );
};

export default PrivacyPolicyPage;