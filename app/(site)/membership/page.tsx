'use client';
import type { Metadata } from 'next';
import { FaFilePdf } from 'react-icons/fa';
import useInViewAnimation from '@/hooks/useInViewAnimation';

export const metadata: Metadata = {
  title: 'Membership - SASWA',
  description: 'Join SASWA. Download our membership application forms in English or Portuguese.',
};

const MembershipPage = () => {
  const { ref: mainContentRef, isInView: mainContentInView } = useInViewAnimation();
  const { ref: aboutRef, isInView: aboutInView } = useInViewAnimation();
  const { ref: membersRef, isInView: membersInView } = useInViewAnimation();
  const { ref: howToRef, isInView: howToInView } = useInViewAnimation();
  const { ref: formsRef, isInView: formsInView } = useInViewAnimation();
  const { ref: contactRef, isInView: contactInView } = useInViewAnimation();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Become a Member</h1>
      
      <div ref={mainContentRef} className={`max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md transition-opacity duration-700 ${mainContentInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
        <section ref={aboutRef} className={`mb-8 text-center transition-opacity duration-700 ${aboutInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Our Membership</h2>
          <p className="text-gray-700 leading-relaxed">
            [Placeholder for information about SASWA membership]
          </p>
        </section>

        <section ref={membersRef} className={`mb-8 text-center transition-opacity duration-700 ${membersInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Members</h2>
          <p className="text-gray-700 leading-relaxed">
            [Placeholder for number of members and their logos]
          </p>
        </section>

        <section ref={howToRef} className={`mb-8 text-center transition-opacity duration-700 ${howToInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Become a Member</h2>
          <p className="text-gray-700 leading-relaxed">
            To become a member, please download the application form, fill it out, and email it to us.
          </p>
        </section>

        <section ref={formsRef} className={`mb-8 text-center transition-opacity duration-700 ${formsInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Forms</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            We are excited for you to join our alliance. Please download the membership application form in your preferred language, fill it out, and email it back to us.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a 
              href="/forms/SASWA_Membership_Form_EN.pdf" 
              download 
              className="flex items-center gap-3 bg-saswa-green text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              <FaFilePdf size={24} />
              <span>Download Form (English)</span>
            </a>
            
            <a 
              href="/forms/SASWA_Membership_Form_PT.pdf" 
              download 
              className="flex items-center gap-3 bg-saswa-orange text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              <FaFilePdf size={24} />
              <span>Download Form (Portuguese)</span>
            </a>
          </div>
        </section>

        <section ref={contactRef} className={`text-center transition-opacity duration-700 ${contactInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
          <p className="text-gray-700 leading-relaxed">
            For any questions regarding membership, please contact us at: <a href="mailto:membership@saswa.org" className="text-saswa-blue hover:underline">membership@saswa.org</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default MembershipPage;
