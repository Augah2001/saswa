'use client';

import { useRef, useState } from 'react';
import { createResource } from '@/app/actions';
import { ResourceType } from '@prisma/client';
import toast from 'react-hot-toast';

const resourceTypes = Object.values(ResourceType);

export default function ResourceForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await createResource(formData);
    setPending(false);

    if (result.success) {
      toast.success('Resource created successfully!');
      formRef.current?.reset();
    } else {
      toast.error(result.message || 'Failed to create resource.');
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
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            File (Optional)
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-saswa-blue/10 file:text-saswa-blue hover:file:bg-saswa-blue/20"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image (Optional)
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-saswa-blue/10 file:text-saswa-blue hover:file:bg-saswa-blue/20"
          />
        </div>
      </div>
      <div className="mt-6">
        <SubmitButton pending={pending} />
      </div>
    </form>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-saswa-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saswa-blue disabled:opacity-50"
    >
      {pending ? (
        <>
          <span className="animate-spin mr-2">&#9696;</span>Adding Resource...
        </>
      ) : (
        'Add Resource'
      )}
    </button>
  );
}
