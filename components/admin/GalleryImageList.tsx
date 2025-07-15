'use client';

import type { GalleryImage } from '@prisma/client';
import { deleteGalleryImage } from '@/app/actions';
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface GalleryImageListProps {
  images: GalleryImage[];
}

export default function GalleryImageList({ images }: GalleryImageListProps) {
  if (images.length === 0) {
    return <p className="text-gray-500">No images found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <Image
            src={image.imagePath}
            alt={image.title}
            width={200}
            height={200}
            className="rounded-md object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={async () => {
                if (confirm('Are you sure you want to delete this image?')) {
                  const result = await deleteGalleryImage(image.id);
                  if (result.success) {
                    toast.success('Image deleted successfully!');
                  } else {
                    toast.error(result.message || 'Failed to delete image.');
                  }
                }
              }}
              className="text-white"
            >
              <FaTrash size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
