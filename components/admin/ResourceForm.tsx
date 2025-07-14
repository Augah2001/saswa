'use client';

import { useFormStatus } from 'react-dom';
import { createResource } from '@/app/actions';
import { ResourceType } from '@prisma/client';

const resourceTypes = Object.values(ResourceType);

export default function ResourceForm() {
  return (
    <form action={createResource}>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Resource Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-saswa-blue focus:border-saswa-blue"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Resource Type
          </label>
          <select
            name="type"
            id="type"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-saswa-blue focus:border-saswa-blue"
          >
            {resourceTypes.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type.replace('_', ' ').toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content / Description
          </label>
          <textarea
            name="content"
            id="content"
            rows={4}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-saswa-blue focus:border-saswa-blue"
          ></textarea>
        </div>
        <div>
          <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700">
            File URL (Optional)
          </label>
          <input
            type="url"
            name="fileUrl"
            id="fileUrl"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-saswa-blue focus:border-saswa-blue"
          />
        </div>
      </div>
      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-saswa-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saswa-blue disabled:opacity-50"
    >
      {pending ? 'Adding Resource...' : 'Add Resource'}
    </button>
  );
}
