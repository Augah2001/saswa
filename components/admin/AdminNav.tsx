'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaTachometerAlt, FaProjectDiagram, FaBook, FaSignOutAlt, FaBars, FaTimes, FaImages } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 bg-gray-800 text-white flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold text-saswa-red">SASWA Admin</Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`flex flex-col w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative absolute h-full z-20`}>
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <Link href="/dashboard" className="text-2xl font-bold text-saswa-red">SASWA Admin</Link>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md" onClick={() => setIsOpen(false)}>
            <FaTachometerAlt className="mr-3" />
            Dashboard
          </Link>
          <Link href="/dashboard/projects" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md" onClick={() => setIsOpen(false)}>
            <FaProjectDiagram className="mr-3" />
            Projects
          </Link>
          <Link href="/dashboard/resources" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md" onClick={() => setIsOpen(false)}>
            <FaBook className="mr-3" />
            Resources
          </Link>
          <Link href="/dashboard/gallery" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md" onClick={() => setIsOpen(false)}>
            <FaImages className="mr-3" />
            Gallery
          </Link>
        </nav>
        <div className="px-2 py-4 border-t border-gray-700">
          <button 
            onClick={() => signOut()} 
            className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
          >
            <FaSignOutAlt className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
