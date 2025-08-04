'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Resource } from '@prisma/client';
import ResourceList from './ResourceList';

// Manually define ResourceType enum as we cannot run prisma generate
enum ResourceType {
  NEWSLETTER = 'NEWSLETTER',
  POLICY_BRIEF = 'POLICY_BRIEF',
  BLOG = 'BLOG',
  HUMAN_RIGHTS_VIOLATIONS_REPORT = 'HUMAN_RIGHTS_VIOLATIONS_REPORT',
  REPORT_FOR_SEX_WORKERS = 'REPORT_FOR_SEX_WORKERS',
}

interface ResourceFilterProps {
  resources: (Omit<Resource, 'type'> & { type: ResourceType })[];
  className?: string;
}

const resourceTypes = Object.values(ResourceType);

const typeDisplayNames: Record<ResourceType, string> = {
  [ResourceType.NEWSLETTER]: 'Newsletters',
  [ResourceType.POLICY_BRIEF]: 'Policy Briefs',
  [ResourceType.BLOG]: 'Blogs',
  [ResourceType.HUMAN_RIGHTS_VIOLATIONS_REPORT]: 'Human Rights Violations Reports',
  [ResourceType.REPORT_FOR_SEX_WORKERS]: 'Reports for Sex Workers',
};

function ResourceFilterContent({ resources, className }: ResourceFilterProps) {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');

  const getInitialType = () => {
    if (typeParam && resourceTypes.includes(typeParam as ResourceType)) {
      return typeParam as ResourceType;
    }
    return 'ALL';
  };

  const [selectedType, setSelectedType] = useState<ResourceType | 'ALL'>(getInitialType);

  useEffect(() => {
    setSelectedType(getInitialType());
  }, [typeParam]);

  const filteredResources =
    selectedType === 'ALL'
      ? resources
      : resources.filter((resource) => resource.type === selectedType);

  return (
    <div className={className}>
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

      <ResourceList resources={filteredResources} className={className} />
    </div>
  );
}

const ResourceFilter = (props: ResourceFilterProps) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResourceFilterContent {...props} />
  </Suspense>
);

export default ResourceFilter;
