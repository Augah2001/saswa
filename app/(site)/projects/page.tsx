import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient';

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

  return <ProjectsPageClient projects={projects} />;
};

export default ProjectsPage;