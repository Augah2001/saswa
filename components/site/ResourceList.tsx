'use client';

import type { Resource } from '@prisma/client';
import { useState } from 'react';
import Modal from './Modal';
import Image from 'next/image';
import Link from 'next/link';

interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const openModal = (resource: Resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedResource(null);
    setIsModalOpen(false);
  };

  if (resources.length === 0) {
    return <p className="text-center text-gray-600">No resources have been added yet. Please check back later.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            {resource.imagePath && (
              <div className="relative w-full h-56">
                <Image
                  src={resource.imagePath}
                  alt={resource.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{resource.title}</h2>
              <p className="text-sm text-gray-500 capitalize mb-2">{resource.type.replace('_', ' ').toLowerCase()}</p>
              <p className="text-gray-700 leading-relaxed flex-grow">
                {resource.content.substring(0, 150)}...
                <button onClick={() => openModal(resource)} className="text-saswa-blue hover:underline ml-1 font-semibold">
                  Read More
                </button>
              </p>
              <div className="mt-4">
                <span className="text-sm text-gray-500">
                  Posted on: {new Date(resource.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedResource && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedResource.title}>
          <div>
            {selectedResource.imagePath && (
              <div className="relative h-64 w-full mb-4">
                <Image
                  src={selectedResource.imagePath}
                  alt={selectedResource.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            )}
            <p className="text-gray-700 mb-4">{selectedResource.content}</p>
            {selectedResource.filePath && (
              <Link href={selectedResource.filePath} target="_blank" rel="noopener noreferrer" className="text-saswa-blue hover:underline font-bold">
                Download File
              </Link>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
