import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - SASWA',
  description: 'View photos from our events, workshops, and advocacy efforts.',
};

const GalleryPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-saswa-red mb-8">Gallery</h1>
      <div className="text-center">
        <p className="text-gray-700 text-lg">
          Our photo gallery is coming soon. Please check back later to see images from our work across Southern Africa.
        </p>
      </div>
    </div>
  );
};

export default GalleryPage;
