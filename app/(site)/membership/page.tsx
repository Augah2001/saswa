'use client';

import { FaFilePdf } from 'react-icons/fa';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const metadata = {
  title: 'Membership - SASWA',
  description: 'Join SASWA. Download our membership application forms in English or Portuguese.',
};

const MembershipPage = () => {
  const { ref: mainContentRef, isInView: mainContentInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: aboutRef, isInView: aboutInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: membersRef, isInView: membersInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: howToRef, isInView: howToInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: formsRef, isInView: formsInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: contactRef, isInView: contactInView } = useInViewAnimation<HTMLDivElement>();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Become a Member</h1>
      
      <div ref={mainContentRef} className={`max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md transition-opacity duration-700 ${mainContentInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
        <section ref={aboutRef} className={`mb-8 text-center transition-opacity duration-700 ${aboutInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Our Membership</h2>
          <p className="text-gray-700 leading-relaxed">
            SASWA’s Membership is constituted and only limited to Southern Africa. 80% of SASWAs membership should be sex worker led organizations, 20% can be any other key population organizations, individual sex worker activists and allies. Members are recruited by the SASWA working group through an application process.
          </p>
        </section>

        <section ref={membersRef} className={`mb-8 text-center transition-opacity duration-700 ${membersInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Members</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our members are the core of our alliance. Below is a list of our current member organizations.
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed text-left">
            <li>Womens Rights Association ADM Angola</li>
            <li>Sisonke South Africa</li>
            <li>Zambia Sex Workers Alliance (ZASWA)</li>
            <li>Female Sex Workers Association of Malawi (FISWA)</li>
            {/* Developer Note: Add other members as provided. Logos will be supplied later. */}
          </ul>
        </section>

        <section ref={howToRef} className={`mb-8 text-center transition-opacity duration-700 ${howToInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Become a Member</h2>
          <p className="text-gray-700 leading-relaxed">
            To become a member, please download the application form, fill it out, and email it to us. All completed forms must be emailed to <a href="mailto:southernafricasexworkersallian@gmail.com" className="text-saswa-blue hover:underline">southernafricasexworkersallian@gmail.com</a> with a copy sent to <a href="mailto:leeroy.saswacoordinator@gmail.com" className="text-saswa-blue hover:underline">leeroy.saswacoordinator@gmail.com</a>.
          </p>
        </section>

        <section ref={formsRef} className={`mb-8 text-center transition-opacity duration-700 ${formsInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Forms</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            We are excited for you to join our alliance. Please download the membership application form in your preferred language, fill it out, and email it back to us.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a 
              href="/forms/SASWA_Membership_en.docx" 
              download 
              className="flex items-center gap-3 bg-saswa-green text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              <FaFilePdf size={24} />
              <span>Download Form (English)</span>
            </a>
            
            <div 
              className="flex items-center gap-3 bg-gray-400 text-white font-bold py-3 px-6 rounded-full cursor-not-allowed"
            >
              <FaFilePdf size={24} />
              <span>Form (Portuguese) - Pending Translation</span>
            </div>
          </div>
        </section>

        <section ref={contactRef} className={`text-center transition-opacity duration-700 ${contactInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
          <p className="text-gray-700 leading-relaxed">
            For any questions regarding membership, please contact us at: <a href="mailto:southernafricasexworkersallian@gmail.com" className="text-saswa-blue hover:underline">southernafricasexworkersallian@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default MembershipPage;
