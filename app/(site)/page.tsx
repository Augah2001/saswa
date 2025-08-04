import prisma from '@/lib/prisma';
import HomePageClient from './HomePageClient';

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

async function getLatestGalleryImages() {
  return prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
  });
}

export default async function HomePage() {
  const latestProjects = await getLatestProjects();
  const latestResources = await getLatestResources();
  const latestGalleryImages = await getLatestGalleryImages();

  return (
    <HomePageClient
      latestProjects={latestProjects}
      latestResources={latestResources}
      latestGalleryImages={latestGalleryImages}
    />
  );
}