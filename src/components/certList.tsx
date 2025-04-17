interface CertListProps {
  name: string;
  certifed: boolean;
  provider: string;
  sate: string;
}

export default function CertList({ name, provider }: CertListProps) {
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-300">{name}</span>
          <span className="text-sm font-medium text-gray-300">{provider}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${provider}` }}
          />
        </div>
      </div>
    );
  }