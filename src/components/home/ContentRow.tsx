import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from './ContentCard';
import { Category, Content } from '../../types';

interface ContentRowProps {
  category: Category;
  onContentClick: (content: Content) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ category, onContentClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // Handle scrolling the row left or right
  const handleScroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    const scrollAmount = clientWidth * 0.8; // Scroll by 80% of the visible width
    
    const newScrollLeft = direction === 'left'
      ? scrollLeft - scrollAmount
      : scrollLeft + scrollAmount;
    
    rowRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    
    // Update arrow visibility after scroll animation
    setTimeout(() => {
      if (!rowRef.current) return;
      
      setShowLeftArrow(rowRef.current.scrollLeft > 0);
      setShowRightArrow(
        rowRef.current.scrollLeft + rowRef.current.clientWidth < rowRef.current.scrollWidth - 10
      );
    }, 500);
  };
  
  return (
    <div className="mb-8 relative group">
      {/* Category Title */}
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-2 px-4 md:px-12">
        {category.name}
      </h2>
      
      {/* Content Row with Horizontal Scrolling */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button 
            className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 hover:bg-black/70 p-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft size={40} className="text-white" />
          </button>
        )}
        
        {/* Content Cards */}
        <div 
          ref={rowRef}
          className="flex space-x-2 overflow-x-scroll scrollbar-hide px-4 md:px-12 py-4"
          onScroll={() => {
            if (!rowRef.current) return;
            setShowLeftArrow(rowRef.current.scrollLeft > 0);
            setShowRightArrow(
              rowRef.current.scrollLeft + rowRef.current.clientWidth < rowRef.current.scrollWidth - 10
            );
          }}
        >
          {category.contents.map((content) => (
            <ContentCard 
              key={content.id} 
              content={content} 
              onClick={onContentClick} 
            />
          ))}
        </div>
        
        {/* Right Arrow */}
        {showRightArrow && (
          <button 
            className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 hover:bg-black/70 p-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleScroll('right')}
          >
            <ChevronRight size={40} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentRow;