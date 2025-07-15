import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import Gallery from '@/components/site/Gallery';
import { getPaginatedGalleryImages } from '@/app/actions';

export const metadata: Metadata = {
  title: 'Gallery - SASWA',
  description: 'View photos from our events, workshops, and advocacy efforts.',
};

const INITIAL_PAGE_SIZE = 12; // Or any other suitable initial number

const GalleryPage = async () => {
  const initialImages = await getPaginatedGalleryImages(1, INITIAL_PAGE_SIZE);
  const totalImagesCount = await prisma.galleryImage.count();
  const hasMore = initialImages.length < totalImagesCount;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Gallery</h1>
      <Gallery initialImages={initialImages} initialHasMore={hasMore} pageSize={INITIAL_PAGE_SIZE} />
    </div>
  );
};

export default GalleryPage;
