'use client';

import { useRef, useState } from 'react';
import type { Resource } from '@prisma/client';
import { ResourceType } from '@prisma/client';
import { updateResource } from '@/app/actions';
import toast from 'react-hot-toast';
import Image from 'next/image';

const resourceTypes = Object.values(ResourceType);

interface EditResourceFormProps {
  resource: Resource;
  onClose: () => void;
}

export default function EditResourceForm({ resource, onClose }: EditResourceFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await updateResource(resource.id, formData);
    setPending(false);

    if (result.success) {
      toast.success('Resource updated successfully!');
      onClose();
    } else {
      toast.error(result.message || 'Failed to update resource.');
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} encType="multipart/form-data">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Resource Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={resource.title}
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
            defaultValue={resource.type}
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
            defaultValue={resource.content}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-saswa-blue focus:border-saswa-blue"
          ></textarea>
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            New File (Optional)
          </label>
          {resource.filePath && <a href={resource.filePath} target="_blank" rel="noopener noreferrer" className="text-sm text-saswa-blue hover:underline">Current File</a>}
          <input
            type="file"
            name="file"
            id="file"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-saswa-blue/10 file:text-saswa-blue hover:file:bg-saswa-blue/20"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            New Image (Optional)
          </label>
          {resource.imagePath && (
            <div className="mt-2">
              <Image src={resource.imagePath} alt={resource.title} width={100} height={100} className="rounded-md" />
            </div>
          )}
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-saswa-blue/10 file:text-saswa-blue hover:file:bg-saswa-blue/20"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
          Cancel
        </button>
        <button
          type="submit"
          aria-disabled={pending}
          className="px-4 py-2 text-sm font-medium text-white bg-saswa-blue rounded-md hover:bg-opacity-90 disabled:opacity-50"
        >
          {pending ? 'Updating...' : 'Update Resource'}
        </button>
      </div>
    </form>
  );
}
