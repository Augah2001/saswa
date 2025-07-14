import prisma from '@/lib/prisma';
import ResourceForm from '@/components/admin/ResourceForm';
import ResourceList from '@/components/admin/ResourceList';

export const revalidate = 0; // Revalidate this page on every request

async function getResources() {
  return prisma.resource.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function ManageResourcesPage() {
  const resources = await getResources();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Resources</h1>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-saswa-blue mb-4">Add New Resource</h2>
        <ResourceForm />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-saswa-blue mb-4">Existing Resources</h2>
        <ResourceList resources={resources} />
      </div>
    </div>
  );
}
