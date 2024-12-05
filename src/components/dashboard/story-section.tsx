import React from 'react';
import StoryCard from './story-card';

interface StorySectionProps {
  title: string;
  stories: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    duration: string;
  }>;
  onStoryClick: (id: string) => void;
}

const StorySection: React.FC<StorySectionProps> = ({
  title,
  stories,
  onStoryClick,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            {...story}
            onClick={() => onStoryClick(story.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default StorySection;