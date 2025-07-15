'use client';

import { useState } from 'react';
import type { Resource } from '@prisma/client';
import { ResourceType } from '@prisma/client';
import ResourceList from './ResourceList';

interface ResourceFilterProps {
  resources: Resource[];
}

const resourceTypes = Object.values(ResourceType);

const ResourceFilter = ({ resources }: ResourceFilterProps) => {
  const [selectedType, setSelectedType] = useState<ResourceType | 'ALL'>('ALL');

  const filteredResources =
    selectedType === 'ALL'
      ? resources
      : resources.filter((resource) => resource.type === selectedType);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        <button
          onClick={() => setSelectedType('ALL')}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${
            selectedType === 'ALL'
              ? 'bg-saswa-red text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {resourceTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors capitalize ${
              selectedType === type
                ? 'bg-saswa-red text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type.replace('_', ' ').toLowerCase()}
          </button>
        ))}
      </div>

      <ResourceList resources={filteredResources} />
    </div>
  );
};

export default ResourceFilter;
