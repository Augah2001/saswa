'use client';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import LatestProjectList from '@/components/site/LatestProjectList';
import LatestResourceList from '@/components/site/LatestResourceList';
import LatestGallery from '@/components/site/LatestGallery';
import Cover from '@/public/images/WhatsApp Image 2025-07-17 at 11.47.41_841ad545.jpg';
import Image1 from '@/public/images/WhatsApp Image 2025-07-17 at 11.44.10_84bf2d8a.jpg';
import useInViewAnimation from '@/hooks/useInViewAnimation';

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

  const { ref: joinAllianceRef, isInView: joinAllianceInView } = useInViewAnimation();
  const { ref: projectsRef, isInView: projectsInView } = useInViewAnimation();
  const { ref: resourcesRef, isInView: resourcesInView } = useInViewAnimation();
  const { ref: galleryRef, isInView: galleryInView } = useInViewAnimation();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] bg-saswa-red text-[#cf3636] text-center py-20 md:py-32 overflow-hidden">
        <Image
          
          src= {Cover}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          
          className="absolute inset-0 z-0 opacity-30 animate-fade-in"
        />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-slide-in-top">
            The Southern Africa Sex Workers Alliance Welcomes you to its Safe Havern
          </h1>
           <div className="bg-black bg-opacity-50 p-4 rounded-lg max-w-3xl mx-auto mb-8 animate-slide-in-bottom">
            <p className="text-lg font-semibold md:text-xl text-white">
              The Southern Africa Sex Workers Alliance (SASWA) is a regional network of sex worker-led organisations advocating for the health and human rights of sex workers.
            </p>
          </div>
         
          <Link href="/about" className="inline-block bg-white text-[#cf3636] font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 transform hover:scale-105 animate-fade-in-up">
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Join Our Alliance Section - New Position and Layout */}
      <section ref={joinAllianceRef} className={`py-16 bg-white transition-opacity duration-700 ${joinAllianceInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className={`md:w-1/2 ${joinAllianceInView ? 'animate-fade-in-left' : ''}`}>
            <Image
              src={Image1} // Using an existing image, adjust if a more suitable one exists or is provided
              alt="Join Our Alliance"
              width={800}
              height={500}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
          <div className={`md:w-1/2 text-center md:text-left ${joinAllianceInView ? 'animate-fade-in-right' : ''}`}>
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
      <section ref={projectsRef} className={`py-16 bg-gray-50 transition-opacity duration-700 ${projectsInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-saswa-red">Our Latest Projects</h2>
          <LatestProjectList projects={latestProjects} className={projectsInView ? 'animate-fade-in-up' : ''} />
           <div className="text-center mt-12">
              <Link href="/projects" className="bg-saswa-red text-white font-bold py-3 px-8 rounded-full hover:bg-saswa-orange transition duration-300 transform hover:scale-105">
                View All Projects
              </Link>
            </div>
        </div>
      </section>

      {/* Latest Resources */}
      <section ref={resourcesRef} className={`bg-white py-16 transition-opacity duration-700 ${resourcesInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-saswa-red">Recent Resources</h2>
          <LatestResourceList resources={latestResources} className={resourcesInView ? 'animate-fade-in-up' : ''} />
           <div className="text-center mt-12">
              <Link href="/resources" className="bg-saswa-red text-white font-bold py-3 px-8 rounded-full hover:bg-saswa-orange transition duration-300 transform hover:scale-105">
                View All Resources
              </Link>
            </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className={`py-16 bg-gray-50 transition-opacity duration-700 ${galleryInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-saswa-red">From Our Gallery</h2>
          <LatestGallery images={latestGalleryImages} className={galleryInView ? 'animate-fade-in-up' : ''} />
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
