import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Content } from '../../types';

interface ContentCardProps {
  content: Content;
  onClick: (content: Content) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative flex-shrink-0 w-[200px] h-[120px] md:w-[260px] md:h-[160px] rounded-md overflow-hidden transition-transform duration-300 cursor-pointer group"
      style={{ 
        transform: isHovered ? 'scale(1.1) translateZ(0)' : 'scale(1) translateZ(0)',
        zIndex: isHovered ? 10 : 0
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(content)}
    >
      {/* Poster Image */}
      <img 
        src={content.posterImage} 
        alt={content.title} 
        className="w-full h-full object-cover transition-opacity"
      />
      
      {/* Hover Details */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/80 flex flex-col justify-between p-3">
          {/* Top Section with Title and Buttons */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{content.title}</h3>
            
            {/* Action Buttons */}
            <div className="flex space-x-2 mt-2">
              <button className="bg-white rounded-full p-1 hover:bg-white/90">
                <Play size={16} className="text-black" />
              </button>
              <button className="bg-gray-700/80 rounded-full p-1 hover:bg-gray-600/80">
                <Plus size={16} className="text-white" />
              </button>
              <button className="bg-gray-700/80 rounded-full p-1 hover:bg-gray-600/80">
                <ThumbsUp size={16} className="text-white" />
              </button>
              <button 
                className="bg-gray-700/80 rounded-full p-1 hover:bg-gray-600/80 ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(content);
                }}
              >
                <ChevronDown size={16} className="text-white" />
              </button>
            </div>
          </div>
          
          {/* Bottom Section with Metadata */}
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-green-500 text-xs font-semibold">{content.matchPercentage}% Match</span>
              <span className="border border-gray-500 px-1 text-[10px] text-gray-300">{content.ageRating}</span>
              <span className="text-gray-300 text-xs">{content.duration}</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {content.genres.slice(0, 3).map((genre, index) => (
                <span key={index} className="text-gray-300 text-xs">
                  {genre}{index < Math.min(content.genres.length, 3) - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentCard;