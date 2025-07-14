import prisma from '@/lib/prisma';
import ProjectForm from '@/components/admin/ProjectForm';
import ProjectList from '@/components/admin/ProjectList';

export const revalidate = 0; // Revalidate this page on every request

async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function ManageProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Projects</h1>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-saswa-red mb-4">Add New Project</h2>
        <ProjectForm />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-saswa-red mb-4">Existing Projects</h2>
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
