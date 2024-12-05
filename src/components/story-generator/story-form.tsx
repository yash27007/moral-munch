import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateStory } from '@/lib/gemini';

interface StoryFormProps {
  onStoryGenerated: (story: string) => void;
  onLoading: (loading: boolean) => void;
}

interface FormData {
  prompt: string;
}

export const StoryForm: React.FC<StoryFormProps> = ({ onStoryGenerated, onLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [error, setError] = useState<string>('');

  const onSubmit = async (data: FormData) => {
    try {
      onLoading(true);
      setError('');
      const story = await generateStory(data.prompt);
      onStoryGenerated(story);
    } catch (err) {
      setError('Failed to generate story. Please try again.');
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <textarea
          {...register('prompt', { required: 'Please enter a story prompt' })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          placeholder="Enter a prompt for your story (e.g., 'A story about friendship and sharing')"
        />
        {errors.prompt && (
          <span className="text-red-500 text-sm">{errors.prompt.message}</span>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        <Wand2 className="w-4 h-4 mr-2" />
        Generate Story
      </Button>
    </form>
  );
};