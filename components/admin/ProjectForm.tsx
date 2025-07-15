'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createProject } from '@/app/actions';
import toast from 'react-hot-toast';

export default function ProjectForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await createProject(formData);
    setPending(false);

    if (result.success) {
      toast.success('Project created successfully!');
      formRef.current?.reset();
    } else {
      toast.error(result.message || 'Failed to create project.');
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} encType="multipart/form-data">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-saswa-red focus:border-saswa-red"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-saswa-red focus:border-saswa-red"
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-saswa-red/10 file:text-saswa-red hover:file:bg-saswa-red/20"
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
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-saswa-red hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saswa-red disabled:opacity-50"
    >
      {pending ? (
        <>
          <span className="animate-spin mr-2">&#9696;</span>Adding Project...
        </>
      ) : (
        'Add Project'
      )}
    </button>
  );
}
