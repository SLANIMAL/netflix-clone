import React from 'react';
import { Play, Info } from 'lucide-react';
import { Content } from '../../types';

interface HeroProps {
  content: Content;
  onPlayClick: () => void;
  onInfoClick: (content: Content) => void;
}

const Hero: React.FC<HeroProps> = ({ content, onPlayClick, onInfoClick }) => {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={content.backdropImage} 
          alt={content.title} 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-4 md:px-16 z-10">
        <div className="max-w-2xl mt-20">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{content.title}</h1>
          
          {/* Metadata */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-green-500 font-semibold">{content.matchPercentage}% Match</span>
            <span className="text-gray-300">{content.year}</span>
            <span className="border border-gray-500 px-1 text-xs text-gray-300">{content.ageRating}</span>
            <span className="text-gray-300">{content.duration}</span>
          </div>
          
          {/* Description */}
          <p className="text-white text-lg mb-6 line-clamp-3 md:line-clamp-none">
            {content.description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button 
              onClick={onPlayClick}
              className="flex items-center bg-white hover:bg-white/90 text-black font-semibold px-6 py-2 rounded transition"
            >
              <Play size={20} className="mr-2" />
              Play
            </button>
            <button 
              onClick={() => onInfoClick(content)}
              className="flex items-center bg-gray-600/80 hover:bg-gray-500/80 text-white font-semibold px-6 py-2 rounded transition"
            >
              <Info size={20} className="mr-2" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;