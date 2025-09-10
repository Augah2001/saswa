import type { Metadata } from 'next';
import Image from 'next/image';
import AboutUsImage from '@/public/images/WhatsApp Image 2025-07-17 at 11.46.31_46ca4808.jpg';

export const metadata: Metadata = {
  title: 'About SASWA',
  description: 'Learn about the history, mission, and member countries of the Southern Africa Sex Workers Alliance.',
};

const memberCountries = [
  'Angola', 'Botswana', 'ESwatini', 'Mozambique', 'Malawi', 'Namibia', 'South Africa', 'Zambia', 'Zimbabwe'
];

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 relative overflow-hidden">
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">About SASWA</h1>
      
      {/* Creative Image Placement */}
      <div className="absolute top-20 -right-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 z-0 opacity-70 transform rotate-12 animate-float hidden md:block">
        <Image
          src={AboutUsImage}
          alt="About Us Decorative Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-xl"
        />
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md relative z-10">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">SASWA Background</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Southern Africa Sex Workers Alliance (SASWA) was established in 2009 to strengthen the voices of sex worker-led organizations in the Southern African Development Community (SADC) region. 
          </p>
          <p className="text-gray-700 leading-relaxed">
            We work to build a strong regional movement that is able to effectively lobby and advocate for policy change, decriminalization of sex work, and an end to stigma, discrimination, and violence against sex workers. We believe in the principle of 'Nothing for us, without us,' ensuring that sex workers are at the center of all responses concerning them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Vision</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            SASWA envisions a strong and resilient movement/alliance for Southern Africa where sex workers enjoy human rights and agency.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            SASWAs mission is to protect and advocate for the human rights of sex workers in Southern Africa through amplifying voices, enhancing visibility, and fostering an environment of dignity, equality, and respect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Goals & Objectives</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>Strengthening the capacity of local sex worker-led organizations</li>
            <li>Raising their voice and visibility</li>
            <li>Supporting transformative leadership</li>
            <li>Ensuring accountable structures</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Strategic Focus Areas</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>Advocacy and Policy Engagement</li>
            <li>Capacity Building, Strengthening and Organizational Development</li>
            <li>Sexual Reproductive Health Rights</li>
            <li>Safety, Security and Protection</li>
            <li>Income Diversification and economic Empowerment</li>
            <li>Community Mobilization Involvement and Engagement</li>
            <li>Partnership Building and Collaboration</li>
            <li>Challenging Stigma, Discrimination and Violence</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Partners and Donors</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We are proud to work with a variety of partners and donors who support our mission.
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>African Sex Workers Alliance (ASWA)</li>
            <li>Global Network of Sex Worker Projects (NSWP)</li>
            <li>Embassy of the Kingdom of Netherlands Maputo</li>
            <li>UNDP – We Belong Africa!</li>
            <li>Frontline Aids</li>
            <li>Y+ Global</li>
            <li>AIDS and Rights Alliance for Southern Africa (ARASA)</li>
            <li>Sexual Reproductive Health Rights Africa Trust (SAT Regional & Zambia)</li>
            <li>SAfAIDS</li>
            <li>Red Umbrella Fund (RUF)</li>
            <li>Aidsfonds</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Member Countries</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            SASWA's network spans across numerous countries in Southern Africa, uniting various national sex worker-led organizations under a common goal. Our member countries include:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {memberCountries.map((country) => (
              <div key={country} className="bg-gray-100 p-3 rounded-md text-center font-semibold text-gray-700">
                {/* Developer Note: Add flag icons here */}
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
