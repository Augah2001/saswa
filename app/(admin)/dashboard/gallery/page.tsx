import prisma from '@/lib/prisma';
import GalleryImageList from '@/components/admin/GalleryImageList';
import GalleryImageForm from '@/components/admin/GalleryImageForm';

async function getGalleryImages() {
  return prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function GalleryAdminPage() {
  const images = await getGalleryImages();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Gallery</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upload New Images</h2>
        <GalleryImageForm />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Existing Images</h2>
        <GalleryImageList images={images} />
      </div>
    </div>
  );
}
