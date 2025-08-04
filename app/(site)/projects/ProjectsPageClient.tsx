'use client';

import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import ProjectList from '@/components/site/ProjectList';
import type { Project } from '@prisma/client';

export default function ProjectsPageClient({ projects }: { projects: Project[] }) {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>();

  return (
    <div ref={ref} className={`container mx-auto px-4 py-16 transition-opacity duration-700 ${isInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Our Projects</h1>
      <ProjectList projects={projects} className={isInView ? 'animate-fade-in-up' : ''} />
    </div>
  );
}
