import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { profiles } from '../../data/mockData';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2 md:px-12">
        <div className="flex items-center space-x-8">
          {/* Netflix Logo */}
          <div className="text-[#E50914] font-bold text-2xl md:text-3xl">NETFLIX</div>
          
          {/* Main Navigation - Hidden on Mobile */}
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-white hover:text-gray-300 text-sm">Home</a>
            <a href="#tvshows" className="text-white hover:text-gray-300 text-sm">TV Shows</a>
            <a href="#movies" className="text-white hover:text-gray-300 text-sm">Movies</a>
            <a href="#new" className="text-white hover:text-gray-300 text-sm">New & Popular</a>
            <a href="#mylist" className="text-white hover:text-gray-300 text-sm">My List</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <a href="#browse" className="text-white flex items-center">
              Browse <ChevronDown size={18} className="ml-1" />
            </a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <div 
              className={`flex items-center ${showSearch ? 'border border-white bg-black/80 pr-2' : ''}`}
            >
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="text-white p-1"
              >
                <Search size={22} />
              </button>
              <input 
                type="text"
                placeholder="Titles, people, genres"
                className={`bg-transparent text-white text-sm focus:outline-none transition-all duration-300 ${
                  showSearch ? 'w-40 md:w-64 px-2 py-1' : 'w-0 px-0'
                }`}
              />
            </div>
          </div>
          
          {/* Notifications */}
          <button className="text-white">
            <Bell size={22} />
          </button>
          
          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)} 
              className="flex items-center space-x-2"
            >
              <img 
                src={profiles[0].avatar} 
                alt="Profile" 
                className="w-8 h-8 rounded" 
              />
              <ChevronDown size={16} className="text-white" />
            </button>
            
            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-gray-700 rounded shadow-lg py-2 z-50">
                {profiles.map((profile) => (
                  <a 
                    key={profile.id}
                    href="#profile"
                    className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
                  >
                    <img 
                      src={profile.avatar} 
                      alt={profile.name} 
                      className="w-8 h-8 rounded mr-2" 
                    />
                    <span>{profile.name}</span>
                  </a>
                ))}
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <a href="#account" className="block px-4 py-2 text-white hover:bg-gray-800">
                    Account
                  </a>
                  <a href="#help" className="block px-4 py-2 text-white hover:bg-gray-800">
                    Help Center
                  </a>
                  <a href="#signout" className="block px-4 py-2 text-white hover:bg-gray-800">
                    Sign out of Netflix
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;