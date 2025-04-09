import { Menu, X, Github, Globe, Bird } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../config/config';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gray-100">{siteConfig.name}</a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
            <a href="/projects" className="text-gray-300 hover:text-blue-400 transition-colors">Projects</a>
            <div className="flex items-center space-x-4">
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 text-gray-300 hover:text-blue-400 transition-colors" />
              </a>
              <a href={siteConfig.social.bsky} target="_blank" rel="noopener noreferrer">
                <Bird className="w-5 h-5 text-gray-300 hover:text-blue-400 transition-colors" />
              </a>
              <a href={siteConfig.social.SkyeNetwork} target="_blank" rel="noopener noreferrer">
                <Globe className="w-5 h-5 text-gray-300 hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
              <a href="/projects" className="text-gray-300 hover:text-blue-400 transition-colors">Projects</a>
              <div className="flex items-center space-x-4 pt-2">
                <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 text-gray-300 hover:text-blue-400 transition-colors" />
                </a>
                <a href={siteConfig.social.bsky} target="_blank" rel="noopener noreferrer">
                  <Bird className="w-5 h-5 text-gray-300 hover:text-blue-400 transition-colors" />
                </a>
                <a href={siteConfig.social.SkyeNetwork} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-5 h-5 text-gray-300 hover:text-blue-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}