'use client';

import { useState } from 'react';
import type { Resource } from '@prisma/client';
import { ResourceType } from '@prisma/client';
import Link from 'next/link';

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

      {filteredResources.length === 0 ? (
         <p className="text-center text-gray-600">No resources found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              <div className="flex-grow">
                <span className="text-sm bg-saswa-blue text-white py-1 px-3 rounded-full mb-4 inline-block capitalize">
                  {resource.type.replace('_', ' ').toLowerCase()}
                </span>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-700 mb-4">{resource.content}</p>
              </div>
              {resource.fileUrl && (
                <div className="mt-4">
                  <Link
                    href={resource.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-saswa-red hover:text-saswa-orange font-semibold"
                  >
                    Download File
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceFilter;
