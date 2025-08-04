'use client';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import Gallery from '@/components/site/Gallery';
import { getPaginatedGalleryImages } from '@/app/actions';
import useInViewAnimation from '@/hooks/useInViewAnimation';

export const metadata: Metadata = {
  title: 'Gallery - SASWA',
  description: 'View photos from our events, workshops, and advocacy efforts.',
};

const INITIAL_PAGE_SIZE = 12; // Or any other suitable initial number

const GalleryPage = async () => {
  const initialImages = await getPaginatedGalleryImages(1, INITIAL_PAGE_SIZE);
  const totalImagesCount = await prisma.galleryImage.count();
  const hasMore = initialImages.length < totalImagesCount;
  const { ref, isInView } = useInViewAnimation();

  return (
    <div ref={ref} className={`container mx-auto px-4 py-16 transition-opacity duration-700 ${isInView ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}>
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Gallery</h1>
      <Gallery initialImages={initialImages} initialHasMore={hasMore} pageSize={INITIAL_PAGE_SIZE} />
    </div>
  );
};

export default GalleryPage;
