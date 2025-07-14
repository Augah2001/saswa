'use client';

import type { Project } from '@prisma/client';
import { deleteProject } from '@/app/actions';
import { FaTrash } from 'react-icons/fa';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return <p className="text-gray-500">No projects found.</p>;
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="flex items-center justify-between p-4 border rounded-md">
          <div>
            <h3 className="font-bold">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.description.substring(0, 100)}...</p>
          </div>
          <form action={deleteProject.bind(null, project.id)}>
            <button type="submit" className="text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
