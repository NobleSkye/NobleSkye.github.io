import { siteConfig } from '../config/config';
import SkillBar from '../components/SkillBar';
import { Github, Mail, MapPin, Globe, Squarecode } from 'lucide-react';
import CertList from '../components/CertList';

export default function Home() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
            <img 
              src={siteConfig.photo} 
              alt={siteConfig.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{siteConfig.name}</h1>
            <p className="text-lg text-gray-400 mb-2">{siteConfig.pronouns}</p>
            <h2 className="text-xl md:text-2xl text-gray-400 mb-4">{siteConfig.role}</h2>
            <p className="text-gray-300 max-w-2xl mb-6">{siteConfig.bio}</p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-300 hover:text-blue-400">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <a href={`https://${siteConfig.social.mas_instance}/@${siteConfig.social.mastodon}`} className="text-gray-300 hover:text-blue-400">
                  Mastodon
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-gray-400" />
                <a href={`https://github.com/${siteConfig.contact.github}`} className="text-gray-300 hover:text-blue-400">
                  Github
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">{siteConfig.contact.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Skills & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteConfig.certs.map((cert) => (
              <CertList key={cert.name} name={cert.name} provider={cert.provider} expires={cert.expires} acquired={cert.acquired} />
            ))}
            {siteConfig.skills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}


          
            </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Note: Percentages indicate confidence level in each skill.
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}
