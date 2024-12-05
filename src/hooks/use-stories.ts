import { useState, useEffect } from 'react';
import { Story, StoryCollection } from '@/types/story';

const mockStories: StoryCollection = {
  featured: [
    {
      id: '1',
      title: 'The Kind Little Mouse',
      description: 'A heartwarming tale about kindness and friendship',
      imageUrl: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      duration: '5 mins',
      audioUrl: 'https://example.com/audio/kind-little-mouse.mp3',
      text: 'Once upon a time, there was a kind little mouse who lived in a cozy corner of a big house...',
    },
  ],
  popular: [],
  new: [],
};

export const useStories = () => {
  const [stories, setStories] = useState<StoryCollection>(mockStories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch stories from an API
    setStories(mockStories);
  }, []);

  return {
    stories,
    loading,
    error,
  };
};