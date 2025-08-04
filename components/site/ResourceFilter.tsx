'use client';

import { useState, useEffect, Suspense, forwardRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResourceType, type Resource } from '@prisma/client';
import ResourceList from './ResourceList';

interface ResourceFilterProps {
  resources: (Omit<Resource, 'type'> & { type: ResourceType })[];
  className?: string;
}

const typeDisplayNames: Record<ResourceType, string> = {
  [ResourceType.NEWSLETTER]: 'Newsletters',
  [ResourceType.POLICY_BRIEF]: 'Policy Briefs',
  [ResourceType.BLOG]: 'Blogs',
  [ResourceType.HUMAN_RIGHTS_VIOLATIONS_REPORT]: 'Human Rights Violations Reports',
  [ResourceType.REPORT_FOR_SEX_WORKERS]: 'Reports for Sex Workers',
  [ResourceType.BRIEF]: 'Briefs',
  [ResourceType.FRAMEWORK_REPORT]: 'Framework Reports',
};

const resourceTypes = Object.keys(typeDisplayNames) as ResourceType[];

const ResourceFilterContent = forwardRef<HTMLDivElement, ResourceFilterProps>(({ resources, className }, ref) => {
  const [selectedType, setSelectedType] = useState<ResourceType | 'ALL'>('ALL');

  const filteredResources =
    selectedType === 'ALL'
      ? resources
      : resources.filter((resource) => resource.type === selectedType);

  return (
    <div ref={ref} className={className}>
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
            className={`px-4 py-2 rounded-full font-semibold transition-colors text-left ${
              selectedType === type
                ? 'bg-saswa-red text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {typeDisplayNames[type]}
          </button>
        ))}
      </div>

      <ResourceList ref={ref} resources={filteredResources} className={className} />
    </div>
  );
});

const ResourceFilter = (props: ResourceFilterProps) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResourceFilterContent {...props} />
  </Suspense>
);

export default ResourceFilter;
