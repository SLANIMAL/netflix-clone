import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141414] text-gray-500 py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Social Media Links */}
        <div className="flex space-x-4 mb-6">
          <a href="#facebook" className="hover:text-white">
            <Facebook size={24} />
          </a>
          <a href="#instagram" className="hover:text-white">
            <Instagram size={24} />
          </a>
          <a href="#twitter" className="hover:text-white">
            <Twitter size={24} />
          </a>
          <a href="#youtube" className="hover:text-white">
            <Youtube size={24} />
          </a>
        </div>
        
        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <ul className="space-y-2 text-sm">
              <li><a href="#audio" className="hover:underline">Audio Description</a></li>
              <li><a href="#help" className="hover:underline">Help Center</a></li>
              <li><a href="#giftcards" className="hover:underline">Gift Cards</a></li>
              <li><a href="#media" className="hover:underline">Media Center</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li><a href="#investor" className="hover:underline">Investor Relations</a></li>
              <li><a href="#jobs" className="hover:underline">Jobs</a></li>
              <li><a href="#terms" className="hover:underline">Terms of Use</a></li>
              <li><a href="#privacy" className="hover:underline">Privacy</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li><a href="#legal" className="hover:underline">Legal Notices</a></li>
              <li><a href="#account" className="hover:underline">Account</a></li>
              <li><a href="#ways" className="hover:underline">Ways to Watch</a></li>
              <li><a href="#corporate" className="hover:underline">Corporate Information</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li><a href="#onlyonnetflix" className="hover:underline">Only on Netflix</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
              <li><a href="#speedtest" className="hover:underline">Speed Test</a></li>
              <li><a href="#cookies" className="hover:underline">Cookie Preferences</a></li>
            </ul>
          </div>
        </div>
        
        {/* Service Code */}
        <button className="border border-gray-500 text-gray-500 text-sm px-2 py-1 mb-4 hover:text-white hover:border-white">
          Service Code
        </button>
        
        {/* Copyright */}
        <p className="text-xs">© 1997-{new Date().getFullYear()} Netflix, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;