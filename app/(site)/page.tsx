import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import LatestProjectList from '@/components/site/LatestProjectList';
import LatestResourceList from '@/components/site/LatestResourceList';
import LatestGallery from '@/components/site/LatestGallery';

async function getLatestProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  });
}

async function getLatestResources() {
  return prisma.resource.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  });
}

async function getLatestGalleryImages() {
  return prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
  });
}

export default async function HomePage() {
  const latestProjects = await getLatestProjects();
  const latestResources = await getLatestResources();
  const latestGalleryImages = await getLatestGalleryImages();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-saswa-red text-white text-center py-20 md:py-32 overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0 z-0 opacity-30 animate-fade-in"
        />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-slide-in-top">
            Empowering Voices, Defending Rights
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-slide-in-bottom">
            The Southern Africa Sex Workers Alliance (SASWA) is a regional network of sex worker-led organisations advocating for the health and human rights of sex workers.
          </p>
          <Link href="/about" className="inline-block bg-white text-saswa-red font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 transform hover:scale-105 animate-fade-in-up">
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Latest Projects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-saswa-red">Our Latest Projects</h2>
          <LatestProjectList projects={latestProjects} />
           <div className="text-center mt-12">
              <Link href="/projects" className="bg-saswa-red text-white font-bold py-3 px-8 rounded-full hover:bg-saswa-orange transition duration-300 transform hover:scale-105">
                View All Projects
              </Link>
            </div>
        </div>
      </section>

      {/* Latest Resources */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-saswa-red">Recent Resources</h2>
          <LatestResourceList resources={latestResources} />
           <div className="text-center mt-12">
              <Link href="/resources" className="bg-saswa-red text-white font-bold py-3 px-8 rounded-full hover:bg-saswa-orange transition duration-300 transform hover:scale-105">
                View All Resources
              </Link>
            </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-saswa-red">From Our Gallery</h2>
          <LatestGallery images={latestGalleryImages} />
          <div className="text-center mt-12">
            <Link href="/gallery" className="bg-saswa-red text-white font-bold py-3 px-8 rounded-full hover:bg-saswa-orange transition duration-300 transform hover:scale-105">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-saswa-red text-white text-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 animate-slide-in-top">Make a Difference</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 animate-fade-in">
            Your support helps us continue our vital work in advocating for the rights and well-being of sex workers across Southern Africa.
          </p>
          <Link href="/contact" className="inline-block bg-white text-saswa-red font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 transform hover:scale-105 animate-fade-in-up">
            Get Involved
          </Link>
        </div>
      </section>
    </div>
  );
}
