import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import ProjectList from '@/components/site/ProjectList';

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
      <ProjectList projects={projects} />
    </div>
  );
};

export default ProjectsPage;
