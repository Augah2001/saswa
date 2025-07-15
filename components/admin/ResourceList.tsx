'use client';

import type { Resource } from '@prisma/client';
import { deleteResource } from '@/app/actions';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import Modal from './Modal';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import EditResourceForm from './EditResourceForm';

interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const openViewModal = (resource: Resource) => {
    setSelectedResource(resource);
    setIsViewModalOpen(true);
  };

  const openEditModal = (resource: Resource) => {
    setSelectedResource(resource);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setSelectedResource(null);
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
  };

  if (resources.length === 0) {
    return <p className="text-gray-500">No resources found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="relative h-48 w-full">
              {resource.imagePath ? (
                <Image
                  src={resource.imagePath}
                  alt={resource.title}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No Image</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {resource.content.substring(0, 100)}...
                <button onClick={() => openViewModal(resource)} className="text-saswa-blue hover:underline ml-1">
                  Read More
                </button>
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 capitalize">{resource.type.replace('_', ' ').toLowerCase()}</p>
                <div className="flex items-center space-x-4">
                  <button onClick={() => openEditModal(resource)} className="text-gray-500 hover:text-gray-700">
                    <FaEdit />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this resource?')) {
                        const result = await deleteResource(resource.id);
                        if (result.success) {
                          toast.success('Resource deleted successfully!');
                        } else {
                          toast.error(result.message || 'Failed to delete resource.');
                        }
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedResource && (
        <Modal isOpen={isViewModalOpen} onClose={closeModal} title={selectedResource.title}>
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
              <Link href={selectedResource.filePath} target="_blank" rel="noopener noreferrer" className="text-saswa-blue hover:underline">
                Download File
              </Link>
            )}
          </div>
        </Modal>
      )}

      {selectedResource && (
        <Modal isOpen={isEditModalOpen} onClose={closeModal} title={`Edit ${selectedResource.title}`}>
          <EditResourceForm resource={selectedResource} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

