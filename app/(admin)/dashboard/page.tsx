import { auth } from '@/auth';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Dashboard - SASWA',
};

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, {session?.user?.email || 'Admin'}!
      </h1>
      <p className="text-gray-600 mb-8">
        From this dashboard, you can manage the content of the SASWA website.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/dashboard/projects" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-saswa-red mb-2">Manage Projects</h2>
          <p className="text-gray-700">
            Add, edit, or delete projects from the website.
          </p>
        </Link>
        <Link href="/dashboard/resources" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-saswa-blue mb-2">Manage Resources</h2>
          <p className="text-gray-700">
            Add, edit, or delete resources like newsletters, reports, and blog posts.
          </p>
        </Link>
      </div>
    </div>
  );
}
