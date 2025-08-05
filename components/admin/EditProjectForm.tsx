'use client';

import { useRef, useState } from 'react';
import type { Project } from '@prisma/client';
import { updateProject } from '@/app/actions';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { ScaleLoader } from 'react-spinners';

interface EditProjectFormProps {
  project: Project;
  onClose: () => void;
}

export default function EditProjectForm({ project, onClose }: EditProjectFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await updateProject(project.id, formData);
    setPending(false);

    if (result.success) {
      toast.success('Project updated successfully!');
      onClose();
    } else {
      toast.error(result.message || 'Failed to update project.');
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
            defaultValue={project.title}
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
            defaultValue={project.description}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-saswa-red focus:border-saswa-red"
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            New Image (Optional)
          </label>
          {project.imagePath && (
            <div className="mt-2">
              <Image src={project.imagePath} alt={project.title} width={100} height={100} className="rounded-md" />
            </div>
          )}
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-saswa-red/10 file:text-saswa-red hover:file:bg-saswa-red/20"
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
          className="px-4 py-2 h-10 text-sm font-medium text-white bg-saswa-red rounded-md hover:bg-opacity-90 disabled:opacity-50"
        >
          {pending ? (
            <>
              <ScaleLoader height={14} color="#fff" className="mr-2" />Uploading...
            </>
          ) : (
            'Update Project'
          )}
        </button>
      </div>
    </form>
  );
}
