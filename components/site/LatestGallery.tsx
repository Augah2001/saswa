'use client';

import type { GalleryImage } from '@prisma/client';
import { useState } from 'react';
import Modal from './Modal';
import Image from 'next/image';

interface LatestGalleryProps {
  images: GalleryImage[];
}

export default function LatestGallery({ images }: LatestGalleryProps) {
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
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

      {selectedImage && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedImage.title}>
          <div className="relative w-full h-[80vh]">
            <Image
              src={selectedImage.imagePath}
              alt={selectedImage.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Modal>
      )}
    </>
  );
}
