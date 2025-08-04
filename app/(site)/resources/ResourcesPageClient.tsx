'use client';

import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import ResourceFilter from '@/components/site/ResourceFilter';
import type { Resource } from '@prisma/client';

export default function ResourcesPageClient({ resources }: { resources: Resource[] }) {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>();

  return (
    <div ref={ref} className={`container mx-auto px-4 py-16 transition-opacity duration-700 ${isInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Resources</h1>
      <ResourceFilter resources={resources} className={isInView ? 'animate-fade-in-up' : ''} />
    </div>
  );
}
