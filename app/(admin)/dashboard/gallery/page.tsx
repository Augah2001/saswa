import GalleryImageList from '@/components/admin/GalleryImageList';
import GalleryImageForm from '@/components/admin/GalleryImageForm';

const staticImages = [
  { id: '1', title: 'About Us', imagePath: '/images/about-us.jpg', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', title: 'Hero Background', imagePath: '/images/hero-bg.jpg', createdAt: new Date(), updatedAt: new Date() },
];

export default function GalleryAdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Gallery</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upload New Images</h2>
        <GalleryImageForm />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Existing Images</h2>
        <GalleryImageList images={staticImages} />
      </div>
    </div>
  );
}
