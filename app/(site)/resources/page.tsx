import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import ResourceFilter from '@/components/site/ResourceFilter';

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

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Resources</h1>
      <ResourceFilter resources={resources} />
    </div>
  );
};

export default ResourcesPage;
