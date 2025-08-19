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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Gallery</h1>
      
      <div className="mb-8 bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-saswa-green mb-4">Upload New Image</h2>
        <GalleryImageForm />
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-saswa-green mb-4">Existing Images</h2>
        <GalleryImageList images={initialImages} />
      </div>
    </div>
  );
}
