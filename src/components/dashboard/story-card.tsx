import React from 'react';
import { Play, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  onClick: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  title,
  description,
  imageUrl,
  duration,
  onClick,
}) => {
  return (
    <div className="group relative rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm mb-2">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">{duration}</span>
            </div>
            <Button
              onClick={onClick}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className="w-4 h-4 mr-1" />
              Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;