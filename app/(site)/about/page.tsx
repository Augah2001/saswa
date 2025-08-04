import type { Metadata } from 'next';
import Image from 'next/image';
import AboutUsImage from '@/public/images/WhatsApp Image 2025-07-17 at 11.46.31_46ca4808.jpg';
import useInViewAnimation from '@/hooks/useInViewAnimation';

export const metadata: Metadata = {
  title: 'About SASWA',
  description: 'Learn about the history, mission, and member countries of the Southern Africa Sex Workers Alliance.',
};

const memberCountries = [
  'Angola', 'Botswana', 'Comoros', 'Democratic Republic of Congo', 'Eswatini',
  'Lesotho', 'Madagascar', 'Malawi', 'Mauritius', 'Mozambique', 'Namibia',
  'Seychelles', 'South Africa', 'Tanzania', 'Zambia', 'Zimbabwe'
];

const AboutPage = () => {
  const { ref: mainContentRef, isInView: mainContentInView } = useInViewAnimation();
  const { ref: backgroundRef, isInView: backgroundInView } = useInViewAnimation();
  const { ref: visionRef, isInView: visionInView } = useInViewAnimation();
  const { ref: missionRef, isInView: missionInView } = useInViewAnimation();
  const { ref: goalsRef, isInView: goalsInView } = useInViewAnimation();
  const { ref: pillarsRef, isInView: pillarsInView } = useInViewAnimation();
  const { ref: partnersRef, isInView: partnersInView } = useInViewAnimation();
  const { ref: countriesRef, isInView: countriesInView } = useInViewAnimation();

  return (
    <div className="container mx-auto px-4 py-16 relative overflow-hidden">
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">About SASWA</h1>
      
      {/* Creative Image Placement - Right */}
      <div className="absolute top-20 -right-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 z-0 transform rotate-12 animate-float hidden md:block">
        <Image
          src={AboutUsImage}
          alt="About Us Decorative Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-xl"
        />
      </div>

      {/* Creative Image Placement - Left */}
      <div className="absolute top-20 -left-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 z-0 transform -rotate-12 animate-float animation-delay-500 hidden md:block">
        <Image
          src={AboutUsImage}
          alt="About Us Decorative Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-xl"
        />
      </div>

      <div ref={mainContentRef} className={`max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md relative z-10 transition-opacity duration-700 ${mainContentInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
        <section ref={backgroundRef} className={`mb-8 transition-opacity duration-700 ${backgroundInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">SASWA Background</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Southern Africa Sex Workers Alliance (SASWA) was established in 2009 to strengthen the voices of sex worker-led organizations in the Southern African Development Community (SADC) region. 
          </p>
          <p className="text-gray-700 leading-relaxed">
            We work to build a strong regional movement that is able to effectively lobby and advocate for policy change, decriminalization of sex work, and an end to stigma, discrimination, and violence against sex workers. We believe in the principle of 'Nothing for us, without us,' ensuring that sex workers are at the center of all responses concerning them.
          </p>
        </section>

        <section ref={visionRef} className={`mb-8 transition-opacity duration-700 ${visionInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Vision</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            [Placeholder for Vision Statement]
          </p>
        </section>

        <section ref={missionRef} className={`mb-8 transition-opacity duration-700 ${missionInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our mission is to advocate for the health and human rights of female, male sex workers.
          </p>
        </section>

        <section ref={goalsRef} className={`mb-8 transition-opacity duration-700 ${goalsInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Goals & Objectives</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            [Placeholder for Goals & Objectives]
          </p>
        </section>

        <section ref={pillarsRef} className={`mb-8 transition-opacity duration-700 ${pillarsInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pillars, Themes, and Areas of Focus</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            [Placeholder for Pillars, Themes, and Areas of Focus]
          </p>
        </section>

        <section ref={partnersRef} className={`mb-8 transition-opacity duration-700 ${partnersInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Partners and Donors</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            [Placeholder for Partners and Donors Logos and Information]
          </p>
        </section>

        <section ref={countriesRef} className={`transition-opacity duration-700 ${countriesInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Member Countries</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            SASWA's network spans across numerous countries in Southern Africa, uniting various national sex worker-led organizations under a common goal. Our member countries include:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {memberCountries.map((country) => (
              <div key={country} className="bg-gray-100 p-3 rounded-md text-center font-semibold text-gray-700">
                {country}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
