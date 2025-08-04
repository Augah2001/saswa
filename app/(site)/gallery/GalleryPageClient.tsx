'use client';

import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import Gallery from '@/components/site/Gallery';
import type { GalleryImage } from '@prisma/client';

export default function GalleryPageClient({
  initialImages,
  hasMore,
  pageSize,
}: {
  initialImages: GalleryImage[];
  hasMore: boolean;
  pageSize: number;
}) {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>();

  return (
    <div ref={ref} className={`container mx-auto px-4 py-16 transition-opacity duration-700`}>
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Gallery</h1>
      <Gallery initialImages={initialImages} initialHasMore={hasMore} pageSize={pageSize} />
    </div>
  );
}
