'use client';

import Image from 'next/image';
import { FaFilePdf } from 'react-icons/fa';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import adultGLam   from '@/public/logos/Adult-Glam-Divas-AGD-LOGO.jpeg'
import bread from '@/public/logos/Bread of Our Lives LOGO-1.jpg'
import equal_rights from '@/public/logos/Equal Rights for All Movement ERAM LOGO.png'
import FSWA from '@/public/logos/FSWA LOGO.jpg'
import pow from '@/public/logos/Pow Wow Logo.jpeg'
import sgdzt from '@/public/logos/SGDZT-LOGO2.jpeg'
import shez from '@/public/logos/SHEZ LOGO SHEZ FINAL.jpg'
import sisonke from '@/public/logos/Sisonke logo .jpg'
import spring from '@/public/logos/Spring of Life Zimbabwe.jpg'
import zaswa from '@/public/logos/ZASWA_KPAZ Logo.jpg'


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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            <div className="flex flex-col items-center">
              <Image src={sisonke} alt="Sisonke South Africa Logo" width={96} height={96} className="object-contain mb-2" />
              <p className="text-sm text-gray-600 text-center">Sisonke South Africa</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={bread} alt="Bread of Our Lives ESwatini Logo" width={96} height={96} className="object-contain mb-2" />
              <p className="text-sm text-gray-600 text-center">Bread of Our Lives ESwatini</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={pow} alt="Pow Wow Bulawayo Logo" width={96} height={96} className="object-contain mb-2" />
              <p className="text-sm text-gray-600 text-center">Pow Wow Bulawayo</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={zaswa} alt="Zambia Sex Workers Alliance: ZASWA Logo" width={96} height={96} className="object-contain mb-2" />
              <p className="text-sm text-gray-600 text-center">Zambia Sex Workers Alliance: ZASWA</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={adultGLam} alt="Adult Glam Divas Logo" width={96} height={96} className="object-contain mb-2" />
              <p className="text-sm text-gray-600 text-center">Adult Glam Divas</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={spring} alt="Springs of Life Zimbabwe Logo" width={96} height={96} className="object-contain mb-2" />
              <p className="text-sm text-gray-600 text-center">Springs of Life Zimbabwe</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={shez} alt="Sisterhood for Health Equality Trust Zambia: SHEZ Logo" width={96} height={96} className="object-contain mb-2" />
              <p className="text-sm text-gray-600 text-center">Sisterhood for Health Equality Trust Zambia: SHEZ</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={equal_rights} alt="Equal Rights for All Movement ERAM Logo" width={96} height={96} className="object-contain mb-2" />
              <p className="text-sm text-gray-600 text-center">Equal Rights for All Movement ERAM</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={sgdzt} alt="Space for marginalized groups in Diversity: SGDZT Logo" width={96} height={96} className="object-contain mb-2" />
              <p className="text-sm text-gray-600 text-center">Space for marginalized groups in Diversity: SGDZT</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src={FSWA} alt="Female Sex Workers Association of Malawi: FISWA Logo" width={96} height={96} className="object-contain mb-2" />
              <p className="text-sm text-gray-600 text-center">Female Sex Workers Association of Malawi: FISWA</p>
            </div>
          </div>
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
            
            <a 
              href="/forms/SASWA_Membership_portuguese.docx" 
              download 
              className="flex items-center gap-3 bg-saswa-green text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              <FaFilePdf size={24} />
              <span>Download Form (Portuguese)</span>
            </a>
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
