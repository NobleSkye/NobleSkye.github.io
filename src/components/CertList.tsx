interface CertsProps {
    name: string;
    provider: string;
    expires: string;
    acquired: string;
  }
  
  export default function CertList({ name, provider, expires, acquired }: CertsProps) {
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-300">{name}</span>
          <span className="text-sm font-medium text-gray-300">Acquired: {acquired}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${provider}%` }}
          />
          <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-500">Certifed by {provider}</span>
          <span className="text-sm font-medium text-gray-500">Expires: {expires}</span>
        </div>
        </div>
      </div>
    );
  }