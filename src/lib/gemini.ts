import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateStory(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(`
      Create a short moral story for children based on the following prompt: "${prompt}".
      The story should:
      - Be appropriate for children aged 5-12
      - Have clear moral lessons
      - Be engaging and imaginative
      - Be between 200-300 words
      - Have a clear beginning, middle, and end
      - Include dialogue when appropriate
      - End with a positive message
    `);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating story:', error);
    throw new Error('Failed to generate story');
  }
}