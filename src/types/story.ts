export interface Story {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  audioUrl: string;
  text: string;
}

export interface StoryCollection {
  featured: Story[];
  popular: Story[];
  new: Story[];
}