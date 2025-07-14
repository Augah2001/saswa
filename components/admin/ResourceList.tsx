'use client';

import type { Resource } from '@prisma/client';
import { deleteResource } from '@/app/actions';
import { FaTrash } from 'react-icons/fa';

interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  if (resources.length === 0) {
    return <p className="text-gray-500">No resources found.</p>;
  }

  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <div key={resource.id} className="flex items-center justify-between p-4 border rounded-md">
          <div>
            <h3 className="font-bold">{resource.title}</h3>
            <p className="text-sm text-gray-600 capitalize">{resource.type.replace('_', ' ').toLowerCase()}</p>
          </div>
          <form action={deleteResource.bind(null, resource.id)}>
            <button type="submit" className="text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
