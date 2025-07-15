'use client';

import type { Project } from '@prisma/client';
import { deleteProject } from '@/app/actions';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import Modal from './Modal';
import Image from 'next/image';
import toast from 'react-hot-toast';
import EditProjectForm from './EditProjectForm';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openViewModal = (project: Project) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
  };

  if (projects.length === 0) {
    return <p className="text-gray-500">No projects found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="relative h-48 w-full">
              {project.imagePath ? (
                <Image
                  src={project.imagePath}
                  alt={project.title}
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
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {project.description.substring(0, 100)}...
                <button onClick={() => openViewModal(project)} className="text-saswa-blue hover:underline ml-1">
                  Read More
                </button>
              </p>
              <div className="flex justify-end space-x-4">
                <button onClick={() => openEditModal(project)} className="text-gray-500 hover:text-gray-700">
                  <FaEdit />
                </button>
                <button
                  onClick={async () => {
                    if (confirm('Are you sure you want to delete this project?')) {
                      const result = await deleteProject(project.id);
                      if (result.success) {
                        toast.success('Project deleted successfully!');
                      } else {
                        toast.error(result.message || 'Failed to delete project.');
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
        ))}
      </div>

      {selectedProject && (
        <Modal isOpen={isViewModalOpen} onClose={closeModal} title={selectedProject.title}>
          <div>
            {selectedProject.imagePath && (
              <div className="relative h-64 w-full mb-4">
                <Image
                  src={selectedProject.imagePath}
                  alt={selectedProject.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            )}
            <p className="text-gray-700">{selectedProject.description}</p>
          </div>
        </Modal>
      )}

      {selectedProject && (
        <Modal isOpen={isEditModalOpen} onClose={closeModal} title={`Edit ${selectedProject.title}`}>
          <EditProjectForm project={selectedProject} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}
