import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import SectionReveal from '@/components/SectionReveal';

const TermsOfServicePage: React.FC = () => {
  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-charcoal-dark py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light leading-tight mt-4">
            Terms &amp; Conditions
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
                These Terms &amp; Conditions govern all bookings, enquiries, and services provided by Boardroom Safaris (“we”, “us”, “our”). By engaging with our services, you (“the client”) agree to be bound by these Terms &amp; Conditions. Boardroom Safaris specialises in curating bespoke, luxury safari experiences and corporate incentive travel across Africa through a network of trusted destination management partners and suppliers.
              </p>

              <h3>2. Role of Boardroom Safaris</h3>
              <p>
                Boardroom Safaris acts as an intermediary between clients and third-party service providers, including but not limited to lodges, airlines, transfer companies, and destination management companies (DMCs). While we carefully select reputable partners, all services are ultimately delivered by these third-party providers and are subject to their own terms and conditions.
              </p>

              <h3>3. Booking &amp; Confirmation</h3>
              <p>
                All bookings are subject to availability at the time of confirmation. A booking is only confirmed upon receipt of a written confirmation and the required deposit. Provisional bookings may be held for a limited period, after which they may be released without notice if not secured.
              </p>

              <h3>4. Payment Terms</h3>
              <p>
                A non-refundable deposit is required to secure all bookings. The amount will be specified at the time of quotation. Full payment is typically required 60–90 days prior to travel, depending on the itinerary and supplier requirements. For bookings made within the full payment period, full payment is required immediately. Failure to make payments by the due date may result in cancellation of the booking.
              </p>

              <h3>5. Pricing</h3>
              <p>
                All prices are quoted in the agreed currency and are subject to change until confirmed. Prices may be affected by fluctuations in exchange rates, government taxes, fuel surcharges, or supplier cost changes. Any such increases may be passed on to the client prior to final payment.
              </p>

              <h3>6. Cancellations &amp; Refunds</h3>
              <p>
                All cancellations must be made in writing. Cancellation fees will apply and may include:
              </p>
              <ul>
                <li>Loss of deposit</li>
                <li>Additional penalties depending on timing and supplier policies</li>
              </ul>
              <p>As a general guideline:</p>
              <ul>
                <li>60+ days prior to travel: Loss of deposit</li>
                <li>30–59 days prior: Up to 50% of total booking value</li>
                <li>0–29 days prior: Up to 100% of total booking value</li>
              </ul>
              <p>Please note that exact cancellation terms may vary depending on suppliers and will be confirmed at time of booking.</p>

              <h3>7. Amendments</h3>
              <p>
                Requests for changes to confirmed bookings must be made in writing. Amendments are subject to availability and may incur additional costs. Certain elements (such as flights or peak-season lodges) may be non-changeable.
              </p>

              <h3>8. Travel Insurance</h3>
              <p>
                Comprehensive travel insurance is strongly recommended for all clients and may be mandatory for certain itineraries. Insurance should cover:
              </p>
              <ul>
                <li>Trip cancellation or interruption</li>
                <li>Medical expenses and evacuation</li>
                <li>Loss or damage of personal belongings</li>
              </ul>
              <p>Boardroom Safaris shall not be held liable for any losses that could have been covered by adequate insurance.</p>

              <h3>9. Passports, Visas &amp; Health Requirements</h3>
              <p>
                Clients are responsible for ensuring they have valid passports, visas, vaccinations, and any required travel documentation. Passports should typically be valid for at least six months beyond the date of return and have sufficient blank pages. We recommend consulting relevant embassies or travel authorities prior to departure.
              </p>

              <h3>10. Liability Disclaimer</h3>
              <p>
                Boardroom Safaris shall not be liable for:
              </p>
              <ul>
                <li>Injury, loss, damage, delay, or inconvenience caused by third-party suppliers</li>
                <li>Acts of God, natural disasters, pandemics, or unforeseen events</li>
                <li>Changes in travel arrangements due to weather, safety concerns, or operational requirements</li>
              </ul>
              <p>All arrangements are made on the express condition that Boardroom Safaris acts solely as an agent.</p>

              <h3>11. Force Majeure</h3>
              <p>
                We shall not be held responsible for failure or delay in performance due to circumstances beyond our control, including but not limited to:
              </p>
              <ul>
                <li>Natural disasters</li>
                <li>Political unrest</li>
                <li>Epidemics or pandemics</li>
                <li>Airline disruptions or strikes</li>
              </ul>
              <p>In such cases, we will endeavour to assist with alternative arrangements where possible.</p>

              <h3>12. Supplier Terms &amp; Conditions</h3>
              <p>
                All services are subject to the terms and conditions of the respective suppliers. By confirming a booking, the client agrees to be bound by those terms in addition to these Terms &amp; Conditions.
              </p>

              <h3>13. Corporate &amp; Group Bookings</h3>
              <p>
                For corporate incentives and group travel:
              </p>
              <ul>
                <li>Additional terms may apply depending on group size and complexity</li>
                <li>Payment schedules and cancellation terms may be more stringent</li>
                <li>A dedicated agreement may be issued where necessary</li>
              </ul>

              <h3>14. Privacy &amp; Data Protection</h3>
              <p>
                Boardroom Safaris respects client confidentiality and will only use personal information for the purpose of arranging travel and related services. We do not sell or share client data with third parties beyond what is necessary to fulfil travel arrangements.
              </p>

              <h3>15. Website Use</h3>
              <p>
                All content on this website is for informational purposes only and may be updated or changed without notice. Boardroom Safaris makes no guarantees regarding the completeness or accuracy of website content at all times.
              </p>

              <h3>16. Governing Law</h3>
              <p>
                These Terms &amp; Conditions are governed by the laws of South Africa. Any disputes arising shall be subject to the jurisdiction of South African courts.
              </p>

              <h3>17. Acceptance of Terms</h3>
              <p>
                By confirming a booking or engaging with our services, you acknowledge that you have read, understood, and agreed to these Terms &amp; Conditions.
              </p>

              <p className="mt-6">Boardroom Safaris<br />Luxury Safari &amp; Corporate Incentive Travel Across Africa</p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageWrapper>
  );
};

export default TermsOfServicePage;