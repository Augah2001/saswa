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

      {/* Join Our Alliance Section - New Position and Layout */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/images/about-us.jpg" // Using an existing image, adjust if a more suitable one exists or is provided
              alt="Join Our Alliance"
              width={800}
              height={500}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Becoming a member of the Southern Africa Sex Workers Alliance (SASWA) means joining a powerful regional network dedicated to advocating for the health, human rights, and social justice of sex workers. Your involvement directly strengthens our collective voice, enabling us to push for policy changes, provide essential support services, and combat stigma and discrimination across Southern Africa. Together, we can create a safer, more equitable environment for all sex workers.
            </p>
            <Link href="/membership" className="inline-block bg-saswa-blue text-white font-bold py-3 px-8 rounded-full hover:bg-saswa-dark-blue transition duration-300 transform hover:scale-105 mt-6">
              Join Our Alliance
            </Link>
          </div>
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
    </div>
  );
}
