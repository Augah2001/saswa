import Link from 'next/link';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-saswa-red mb-4">SASWA</h3>
            <p className="text-gray-400">
              Southern Africa Sex Workers Alliance. Empowering and uniting sex worker-led organizations in Southern Africa.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-saswa-orange">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-saswa-orange">Projects</Link></li>
              <li><Link href="/resources" className="hover:text-saswa-orange">Resources</Link></li>
              <li><Link href="/membership" className="hover:text-saswa-orange">Membership</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/14Fy6w57z2A/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-saswa-blue">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.instagram.com/saswa_2021?igsh=bXh6YmNjZDF2bzMz&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-saswa-blue">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} SASWA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
