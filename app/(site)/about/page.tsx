import type { Metadata } from 'next';

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
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">About SASWA</h1>
      
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our History & Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Southern Africa Sex Workers Alliance (SASWA) was established in 2009 to strengthen the voices of sex worker-led organizations in the Southern African Development Community (SADC) region. Our mission is to advocate for the health and human rights of female, male, and transgender sex workers.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We work to build a strong regional movement that is able to effectively lobby and advocate for policy change, decriminalization of sex work, and an end to stigma, discrimination, and violence against sex workers. We believe in the principle of 'Nothing for us, without us,' ensuring that sex workers are at the center of all responses concerning them.
          </p>
        </section>

        <section>
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
