// src/components/site/Carousel.tsx

'use client';

import { useState, Children, cloneElement, ReactElement, forwardRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselProps {
  children: ReactElement[];
  className?: string;
  initialIndex?: number;
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(({ children, className, initialIndex = 0 }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* --- MODIFICATION IS HERE --- */}
        {Children.map(children, (child) => {
          // Get the child's existing classes
          const childClassName = child.props.className || '';
          
          // Combine the classes
          const newClassName = `${childClassName} w-full flex-shrink-0`;

          // Clone the element with the combined classes
          return cloneElement(child, { className: newClassName });
        })}
      </div>

      {/* ... rest of the component remains the same ... */}
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
});

Carousel.displayName = 'Carousel';

export default Carousel;