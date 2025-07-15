import Link from 'next/link';
import { FaTachometerAlt, FaProjectDiagram, FaBook, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from '@/auth';

const AdminNav = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <Link href="/dashboard" className="text-2xl font-bold text-saswa-red">SASWA Admin</Link>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </Link>
        <Link href="/dashboard/projects" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
          <FaProjectDiagram className="mr-3" />
          Projects
        </Link>
        <Link href="/dashboard/resources" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
          <FaBook className="mr-3" />
          Resources
        </Link>
        <Link href="/dashboard/gallery" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
          <FaBook className="mr-3" />
          Gallery
        </Link>
      </nav>
      <div className="px-2 py-4 border-t border-gray-700">
        <form action={async () => {
            'use server';
            await signOut();
        }}>
            <button className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
                <FaSignOutAlt className="mr-3" />
                Sign Out
            </button>
        </form>
      </div>
    </div>
  );
};

export default AdminNav;
