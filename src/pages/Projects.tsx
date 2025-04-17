import { useState, useEffect } from 'react';
import { Repository } from '../types';
import { siteConfig } from '../config/config';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `${siteConfig.github.apiUrl}/users/${siteConfig.githubUsername}/repos?per_page=100&sort=${siteConfig.repoSort}`,
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        let repos = await response.json();

        // Filter out excluded repositories
        repos = repos.filter((repo: Repository) => 
          !siteConfig.excludedRepos.includes(repo.name)
        );

        // Separate featured and non-featured repositories
        const featuredRepos = repos.filter((repo: Repository) =>
          siteConfig.featuredRepos.includes(repo.name)
        );

        const nonFeaturedRepos = repos
          .filter((repo: Repository) => !siteConfig.featuredRepos.includes(repo.name))
          .slice(0, siteConfig.github.reposPerPage);

        // Combine featured repos with additional repos
        setRepositories([...featuredRepos, ...nonFeaturedRepos]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const featuredRepos = repositories.filter(repo => 
    siteConfig.featuredRepos.includes(repo.name)
  );
  const otherRepos = repositories.filter(repo => 
    !siteConfig.featuredRepos.includes(repo.name)
  );

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        {featuredRepos.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {featuredRepos.map((repo) => (
                <ProjectCard key={repo.id} repository={repo} />
              ))}
            </div>
          </>
        )}

        {otherRepos.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-8">Other Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherRepos.map((repo) => (
                <ProjectCard key={repo.id} repository={repo} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}