'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import logo from '@/public/images/logo.png'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { 
    label: 'Resources', 
    href: '/resources',
    subLinks: [
      { href: '/resources?type=NEWSLETTER', label: 'Newsletters' },
      { href: '/resources?type=POLICY_BRIEF', label: 'Policy Briefs' },
      { href: '/resources?type=BLOG', label: 'Blogs' },
      { href: '/resources?type=HUMAN_RIGHTS_VIOLATIONS_REPORT', label: 'Human Rights Violations Reports' },
      { href: '/resources?type=REPORT_FOR_SEX_WORKERS', label: 'Reports for Sex Workers' },
    ]
  },
  { href: '/membership', label: 'Membership' },
  { href: '/gallery', label: 'Gallery' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={logo}
                alt="SASWA Logo"
                width={100} // Adjust as needed
                height={40} // Adjust as needed
                className="h-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                link.subLinks ? (
                  <div key={link.label} className="relative">
                    <button 
                      onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                      className="text-gray-700 hover:text-saswa-red px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      {link.label} <FaChevronDown className="ml-1" />
                    </button>
                    {isResourcesOpen && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {link.subLinks.map(subLink => (
                            <Link
                              key={subLink.href}
                              href={subLink.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                              onClick={() => setIsResourcesOpen(false)}
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 hover:text-saswa-red px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </nav>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-saswa-red focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.subLinks ? (
                <div key={link.label}>
                  <span className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">{link.label}</span>
                  <div className="pl-4">
                  {link.subLinks.map(subLink => (
                    <Link
                      key={subLink.href}
                      href={subLink.href}
                      className="text-gray-600 hover:text-saswa-red block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {subLink.label}
                    </Link>
                  ))}
                  </div>
                </div>
              ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-saswa-red block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
