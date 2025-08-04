'use client';

import type { GalleryImage } from '@prisma/client';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import Image from 'next/image';
import { getPaginatedGalleryImages } from '@/app/actions';
import Carousel from './Carousel'; // Import the Carousel component

interface GalleryProps {
  initialImages: GalleryImage[];
  initialHasMore: boolean;
  pageSize: number;
}

export default function Gallery({ initialImages, initialHasMore, pageSize }: GalleryProps) {
  const [loadedImages, setLoadedImages] = useState<GalleryImage[]>(initialImages);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

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
          <h2 className="text-2xl font-bold text-saswa-red mb-4 mt-8 first:mt-0">{monthYear}</h2>
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
