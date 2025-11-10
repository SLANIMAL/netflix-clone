import React, { useState } from 'react';
import NavBar from '../components/common/NavBar';
import Hero from '../components/home/Hero';
import ContentRow from '../components/home/ContentRow';
import ContentModal from '../components/details/ContentModal';
import Footer from '../components/common/Footer';
import { featuredContent, categories } from '../data/mockData';
import { Content } from '../types';

const Home: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const handleContentClick = (content: Content) => {
    setSelectedContent(content);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handlePlayClick = () => {
    alert('Playing content...');
  };
  
  return (
    <div className="bg-[#141414] min-h-screen">
      <NavBar />
      
      <main>
        {/* Hero Banner */}
        <Hero 
          content={featuredContent} 
          onPlayClick={handlePlayClick}
          onInfoClick={handleContentClick}
        />
        
        {/* Content Rows */}
        <div className="relative z-10 -mt-16 md:-mt-32">
          {categories.map((category) => (
            <ContentRow 
              key={category.id} 
              category={category}
              onContentClick={handleContentClick}
            />
          ))}
        </div>
      </main>
      
      <Footer />
      
      {/* Content Detail Modal */}
      {selectedContent && (
        <ContentModal 
          content={selectedContent}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;