import React, { useState } from 'react';
import Navbar from '@/components/dashboard/navbar';
import StorySection from '@/components/dashboard/story-section';
import { AudioPlayer } from '@/components/story-player/audio-player';
import { StoryForm } from '@/components/story-generator/story-form';
import { useStories } from '@/hooks/use-stories';

const Dashboard = () => {
  const { stories } = useStories();
  const [selectedStory, setSelectedStory] = useState<{
    title: string;
    audioUrl: string;
    text: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStoryClick = (id: string) => {
    const story = [...stories.featured, ...stories.popular, ...stories.new]
      .find(s => s.id === id);
    
    if (story) {
      setSelectedStory({
        title: story.title,
        audioUrl: story.audioUrl,
        text: story.text,
      });
    }
  };

  const handleStoryGenerated = (story: string) => {
    setSelectedStory({
      title: 'Generated Story',
      audioUrl: '', // This would be set after text-to-speech conversion
      text: story,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Generate a New Story</h2>
          <StoryForm
            onStoryGenerated={handleStoryGenerated}
            onLoading={setIsGenerating}
          />
        </div>

        {isGenerating && (
          <div className="mb-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Generating your story...</p>
          </div>
        )}

        {selectedStory && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{selectedStory.title}</h2>
            <AudioPlayer
              audioUrl={selectedStory.audioUrl}
              text={selectedStory.text}
            />
          </div>
        )}
        
        <StorySection
          title="Featured Stories"
          stories={stories.featured}
          onStoryClick={handleStoryClick}
        />
        <StorySection
          title="Popular Stories"
          stories={stories.popular}
          onStoryClick={handleStoryClick}
        />
        <StorySection
          title="New Arrivals"
          stories={stories.new}
          onStoryClick={handleStoryClick}
        />
      </main>
    </div>
  );
};

export default Dashboard;