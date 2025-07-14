import prisma from '@/lib/prisma';
import Link from 'next/link';

// Re-export ResourceType for use in components
export { ResourceType } from '@prisma/client';

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

export default async function HomePage() {
  const latestProjects = await getLatestProjects();
  const latestResources = await getLatestResources();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-saswa-red text-white text-center py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Empowering Voices, Defending Rights</h1>
          <p className="text-xl max-w-3xl mx-auto">
            The Southern Africa Sex Workers Alliance (SASWA) is a regional network of sex worker-led organisations advocating for the health and human rights of sex workers.
          </p>
          <Link href="/about" className="mt-8 inline-block bg-white text-saswa-red font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition duration-300">
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Latest Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Latest Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover"/>}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.description.substring(0, 100)}...</p>
                  <Link href={`/projects`} className="text-saswa-red hover:text-saswa-orange font-semibold">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
           <div className="text-center mt-8">
              <Link href="/projects" className="bg-saswa-red text-white font-bold py-3 px-6 rounded-full hover:bg-saswa-orange transition duration-300">
                View All Projects
              </Link>
            </div>
        </div>
      </section>

      {/* Latest Resources */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Recent Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-lg p-6">
                <span className="text-sm bg-saswa-blue text-white py-1 px-3 rounded-full mb-4 inline-block">{resource.type}</span>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-700 mb-4">{resource.content.substring(0, 100)}...</p>
                <Link href={`/resources`} className="text-saswa-red hover:text-saswa-orange font-semibold">
                  Read More
                </Link>
              </div>
            ))}
          </div>
           <div className="text-center mt-8">
              <Link href="/resources" className="bg-saswa-red text-white font-bold py-3 px-6 rounded-full hover:bg-saswa-orange transition duration-300">
                View All Resources
              </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
