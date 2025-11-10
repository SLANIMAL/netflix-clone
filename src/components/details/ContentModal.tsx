import React, { useEffect, useRef } from 'react';
import { X, Play, Plus, ThumbsUp, VolumeX } from 'lucide-react';
import { Content } from '../../types';

interface ContentModalProps {
  content: Content;
  isOpen: boolean;
  onClose: () => void;
}

const ContentModal: React.FC<ContentModalProps> = ({ content, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div 
        ref={modalRef}
        className="relative bg-[#181818] w-full max-w-4xl rounded-md shadow-lg overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-[#181818] rounded-full p-1"
        >
          <X size={24} className="text-white" />
        </button>
        
        {/* Hero Image Section */}
        <div className="relative h-[40vh]">
          <img 
            src={content.backdropImage} 
            alt={content.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent"></div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6">
            <h1 className="text-4xl font-bold text-white mb-2">{content.title}</h1>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="bg-white text-black font-semibold px-4 py-1 rounded flex items-center">
                <Play size={16} className="mr-1" />
                Play
              </button>
              <button className="bg-gray-600/60 text-white p-2 rounded-full">
                <Plus size={16} />
              </button>
              <button className="bg-gray-600/60 text-white p-2 rounded-full">
                <ThumbsUp size={16} />
              </button>
              <button className="bg-gray-600/60 text-white p-2 rounded-full ml-auto">
                <VolumeX size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Content Details */}
        <div className="p-6">
          <div className="flex mb-6">
            {/* Left Column */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-green-500 font-semibold">{content.matchPercentage}% Match</span>
                <span className="text-gray-300">{content.year}</span>
                <span className="border border-gray-500 px-1 text-xs text-gray-300">{content.ageRating}</span>
                <span className="text-gray-300">{content.duration}</span>
              </div>
              
              <p className="text-white mb-4">{content.description}</p>
            </div>
            
            {/* Right Column */}
            <div className="w-1/3 ml-6">
              <div className="text-gray-400 mb-1">
                <span className="text-gray-500">Cast:</span> David Harbour, Millie Bobby Brown, Finn Wolfhard
              </div>
              <div className="text-gray-400 mb-1">
                <span className="text-gray-500">Genres:</span> {content.genres.join(', ')}
              </div>
              <div className="text-gray-400">
                <span className="text-gray-500">This show is:</span> Suspenseful, Sci-Fi TV, Teen TV Shows
              </div>
            </div>
          </div>
          
          {/* Episodes Section (if it's a show) */}
          {content.duration.includes('Season') && (
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Episodes</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((episode) => (
                  <div key={episode} className="flex border-b border-gray-700 pb-4">
                    <div className="w-16 text-center text-gray-400 font-semibold">{episode}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-white font-semibold">Chapter {episode}</h4>
                        <span className="text-gray-400">58m</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        A brief description of episode {episode} would go here, explaining the plot without giving away major spoilers.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* More Like This Section */}
          <div className="mt-8">
            <h3 className="text-white text-xl font-semibold mb-4">More Like This</h3>
            <div className="grid grid-cols-3 gap-4">
              {Array(3).fill(null).map((_, index) => (
                <div key={index} className="rounded overflow-hidden">
                  <img 
                    src={`https://images.pexels.com/photos/${1000000 + index}/pexels-photo-${1000000 + index}.jpeg`}
                    alt={`Similar content ${index + 1}`} 
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/3389817/pexels-photo-3389817.jpeg";
                    }}
                  />
                  <div className="bg-[#232323] p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-green-500 text-sm">95% Match</span>
                      <span className="text-gray-400 text-xs border border-gray-500 px-1">TV-MA</span>
                    </div>
                    <p className="text-white text-sm mt-1">Similar Title {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* About Section */}
          <div className="mt-8">
            <h3 className="text-white text-xl font-semibold mb-4">About {content.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 mb-1">Creators:</p>
                <p className="text-white">The Duffer Brothers</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Cast:</p>
                <p className="text-white">Winona Ryder, David Harbour, Millie Bobby Brown, Finn Wolfhard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;