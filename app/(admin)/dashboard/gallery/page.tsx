import GalleryImageList from '@/components/admin/GalleryImageList';
import GalleryImageForm from '@/components/admin/GalleryImageForm';
import { getPaginatedGalleryImages } from '@/app/actions';
import prisma from '@/lib/prisma';
import GalleryPageClient from '@/app/(site)/gallery/GalleryPageClient';
import Gallery from '@/components/site/Gallery';

const staticImages = [
  { id: '1', title: 'About Us', imagePath: '/images/about-us.jpg', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', title: 'Hero Background', imagePath: '/images/hero-bg.jpg', createdAt: new Date(), updatedAt: new Date() },
];


export default async function GalleryAdminPage() {
  const INITIAL_PAGE_SIZE = 12;

  const initialImages = await getPaginatedGalleryImages(1, INITIAL_PAGE_SIZE);
  const totalImagesCount = await prisma.galleryImage.count();
  const hasMore = initialImages.length < totalImagesCount;
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Gallery</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upload New Images</h2>
        <GalleryImageForm />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Existing Images</h2>
        <Gallery initialImages={initialImages} initialHasMore={hasMore} pageSize={INITIAL_PAGE_SIZE} />
      </div>
    </div>
  );
}
