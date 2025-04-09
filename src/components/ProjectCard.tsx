import { Repository } from '../types';
import { ExternalLink, Star, GitFork } from 'lucide-react';

interface ProjectCardProps {
  repository: Repository;
}

export default function ProjectCard({ repository }: ProjectCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-700">
      <h3 className="text-xl font-semibold mb-2 text-gray-100">{repository.name}</h3>
      <p className="text-gray-400 mb-4 line-clamp-2">{repository.description}</p>
      
      {repository.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repository.topics.map((topic) => (
            <span 
              key={topic}
              className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4 text-gray-400">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            <span>{repository.stargazers_count}</span>
          </div>
          <div className="flex items-center">
            <GitFork className="w-4 h-4 mr-1" />
            <span>{repository.forks_count}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <a 
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          {repository.homepage && (
            <a 
              href={repository.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}