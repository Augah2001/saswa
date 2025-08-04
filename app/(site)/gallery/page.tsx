import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import { getPaginatedGalleryImages } from '@/app/actions';
import GalleryPageClient from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'Gallery - SASWA',
  description: 'View photos from our events, workshops, and advocacy efforts.',
};

const INITIAL_PAGE_SIZE = 12;

const GalleryPage = async () => {
  const initialImages = await getPaginatedGalleryImages(1, INITIAL_PAGE_SIZE);
  const totalImagesCount = await prisma.galleryImage.count();
  const hasMore = initialImages.length < totalImagesCount;

  return (
    <GalleryPageClient
      initialImages={initialImages}
      hasMore={hasMore}
      pageSize={INITIAL_PAGE_SIZE}
    />
  );
};

export default GalleryPage;