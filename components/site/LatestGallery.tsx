'use client';

import type { GalleryImage } from '@prisma/client';
import { useState, forwardRef } from 'react';
import Modal from './Modal';
import Image from 'next/image';
import Carousel from './Carousel'; // Import the Carousel component

interface LatestGalleryProps {
  images: GalleryImage[];
  className?: string;
}

const LatestGallery = forwardRef<HTMLDivElement, LatestGalleryProps>(({ images, className }, ref) => {
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

  return (
    <>
      <Carousel ref={ref} className={className}>
        {images.map((image) => (
          <div key={image.id} className="relative group overflow-hidden rounded-lg cursor-pointer w-full h-64" onClick={() => openModal(image)}>
            <Image
              src={image.imagePath}
              alt={image.title}
              layout="fill"
              objectFit="cover"
              className="transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="font-bold">{image.title}</h3>
              <p className="text-sm">{new Date(image.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </Carousel>

      {selectedImage && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedImage.title}>
          <div className="relative w-full h-[80vh]">
            <Image
              src={selectedImage.imagePath}
              alt={selectedImage.title}
              layout="fill"
              objectFit="contain"
              onError={(e) => console.error("Error loading modal image:", selectedImage.imagePath, e)}
            />
          </div>
        </Modal>
      )}
    </>
  );
});

LatestGallery.displayName = 'LatestGallery';

export default LatestGallery;
