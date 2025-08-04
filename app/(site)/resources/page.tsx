'use client';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import ResourceFilter from '@/components/site/ResourceFilter';
import useInViewAnimation from '@/hooks/useInViewAnimation';

export const metadata: Metadata = {
  title: 'Resources - SASWA',
  description: 'Access newsletters, briefs, reports, and other resources from SASWA.',
};

async function getAllResources() {
  return prisma.resource.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

const ResourcesPage = async () => {
  const resources = await getAllResources();
  const { ref, isInView } = useInViewAnimation();

  return (
    <div ref={ref} className={`container mx-auto px-4 py-16 transition-opacity duration-700 ${isInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Resources</h1>
      <ResourceFilter resources={resources} className={isInView ? 'animate-fade-in-up' : ''} />
    </div>
  );
};

export default ResourcesPage;
