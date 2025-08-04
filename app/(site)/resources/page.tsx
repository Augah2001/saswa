import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import ResourcesPageClient from './ResourcesPageClient';

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

  return <ResourcesPageClient resources={resources} />;
};

export default ResourcesPage;