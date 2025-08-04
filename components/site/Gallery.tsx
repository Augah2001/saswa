'use client';

import type { GalleryImage } from '@prisma/client';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import Image from 'next/image';
import { getPaginatedGalleryImages, deleteGalleryImage } from '@/app/actions'; // Import deleteGalleryImage
import Carousel from './Carousel'; // Import the Carousel component
import { usePathname } from 'next/navigation';
interface GalleryProps {
  initialImages: GalleryImage[];
  initialHasMore: boolean;
  pageSize: number;
}

export default function Gallery({ initialImages, initialHasMore, pageSize }: GalleryProps) {
  const pathname = usePathname();
 
  const [loadedImages, setLoadedImages] = useState<GalleryImage[]>(initialImages);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  // Update loadedImages and hasMore when initial props change (due to revalidation)
  useEffect(() => {
    setLoadedImages(initialImages);
    setHasMore(initialHasMore);
    setCurrentPage(1); // Reset page when initial images change
  }, [initialImages, initialHasMore]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent opening the modal when deleting
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const result = await deleteGalleryImage(id);
        if (result.success) {
          // The revalidatePath in deleteGalleryImage will handle the update
        } else {
          // Optionally, show an error toast
          console.error('Failed to delete image:', result.message);
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        // Optionally, show an error toast
      }
    }
  };

  const loadMoreImages = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;
    const newImages = await getPaginatedGalleryImages(nextPage, pageSize);
    
    setLoadedImages((prevImages) => [...prevImages, ...newImages]);
    setCurrentPage(nextPage);
    setHasMore(newImages.length === pageSize);
    setIsLoading(false);
  };

  if (loadedImages.length === 0 && !hasMore) {
    return <p className="text-center text-gray-600">No images have been added to the gallery yet.</p>;
  }

  // Group images by month and year
  const groupedImages: { [key: string]: GalleryImage[] } = loadedImages.reduce((acc: { [key: string]: GalleryImage[] }, image) => {
    const imageDate = new Date(image.createdAt);
    const monthYear = imageDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(image);
    return acc;
  }, {});

  const initialCarouselIndex = selectedImage ? loadedImages.findIndex(img => img.id === selectedImage.id) : 0;

  return (
    <>
      {Object.entries(groupedImages).map(([monthYear, imagesInGroup]) => (
        <div key={monthYear} className="mb-8">
          {pathname !== '/dashboard/gallery' && <h2 className="text-2xl font-bold text-saswa-red mb-4 mt-8 first:mt-0">{monthYear}</h2>}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imagesInGroup.map((image) => (
              <div key={image.id} className="relative group overflow-hidden rounded-lg cursor-pointer" onClick={() => openModal(image)}>
                <Image
                  src={image.imagePath}
                  alt={image.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-bold">{image.title}</h3>
                  <p className="text-sm">{new Date(image.createdAt).toLocaleDateString()}</p>
                </div>
                {pathname === '/dashboard/gallery' && (
                  <button
                    onClick={(e) => handleDelete(image.id, e)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    title="Delete Image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={loadMoreImages}
            disabled={isLoading}
            className="bg-saswa-red text-white font-bold py-3 px-8 rounded-full hover:bg-saswa-orange transition duration-300 transform hover:scale-105"
          >
            {isLoading ? 'Loading... ' : 'Load More'} {isLoading && <span className="animate-spin">&#9696;</span>}
          </button>
        </div>
      )}

      {selectedImage && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedImage.title}>
          <div className="relative w-full h-[80vh]">
            <Carousel initialIndex={initialCarouselIndex}>
              {loadedImages.map((image) => (
                <div key={image.id} className="relative w-full h-[80vh]">
                  <Image
                    src={image.imagePath}
                    alt={image.title}
                    layout="fill"
                    objectFit="contain"
                    onError={(e) => console.error("Error loading modal image in Gallery.tsx:", image.imagePath, e)}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </Modal>
      )}
    </>
  );
}
