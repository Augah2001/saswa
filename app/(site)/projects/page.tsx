'use client';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import ProjectList from '@/components/site/ProjectList';
import useInViewAnimation from '@/hooks/useInViewAnimation';

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
  const { ref, isInView } = useInViewAnimation();

  return (
    <div ref={ref} className={`container mx-auto px-4 py-16 transition-opacity duration-700 ${isInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Our Projects</h1>
      <ProjectList projects={projects} className={isInView ? 'animate-fade-in-up' : ''} />
    </div>
  );
};

export default ProjectsPage;
