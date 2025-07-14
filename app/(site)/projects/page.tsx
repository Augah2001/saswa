import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Projects - SASWA',
  description: 'Explore the projects undertaken by SASWA to support and empower sex workers in Southern Africa.',
};

async function getAllProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

const ProjectsPage = async () => {
  const projects = await getAllProjects();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Our Projects</h1>
      
      {projects.length === 0 ? (
        <p className="text-center text-gray-600">No projects have been added yet. Please check back later.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              {project.imageUrl && (
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h2>
                <p className="text-gray-700 leading-relaxed flex-grow">{project.description}</p>
                 <div className="mt-4">
                    <span className="text-sm text-gray-500">
                      Posted on: {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
