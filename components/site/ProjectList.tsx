'use client';

import type { Project } from '@prisma/client';
import { useState } from 'react';
import Modal from './Modal';
import Image from 'next/image';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  if (projects.length === 0) {
    return <p className="text-center text-gray-600">No projects have been added yet. Please check back later.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            {project.imagePath && (
              <div className="relative w-full h-56">
                <Image
                  src={project.imagePath}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h2>
              <p className="text-gray-700 leading-relaxed flex-grow">
                {project.description.substring(0, 150)}...
                <button onClick={() => openModal(project)} className="text-saswa-blue hover:underline ml-1 font-semibold">
                  Read More
                </button>
              </p>
              <div className="mt-4">
                <span className="text-sm text-gray-500">
                  Posted on: {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedProject.title}>
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
    </>
  );
}
