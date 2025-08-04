'use client';

import { useState, Children, cloneElement, ReactElement } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselProps {
  children: ReactElement[];
  className?: string;
}

const Carousel = ({ children, className }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Children.map(children, (child) =>
          cloneElement(child, { className: 'w-full flex-shrink-0' })
        )}
      </div>

      {children.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10 ml-2 hover:bg-opacity-75 transition-colors"
        >
          <FaChevronLeft size={20} />
        </button>
      )}
      {children.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10 mr-2 hover:bg-opacity-75 transition-colors"
        >
          <FaChevronRight size={20} />
        </button>
      )}

      {children.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'} transition-colors`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
