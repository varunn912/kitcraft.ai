import { GoogleGenAI, Type, GenerateContentParameters } from '@google/genai';
import type { ProjectKit, SkillLevel } from '../types';

// The API key must be obtained exclusively from the environment variable `process.env.API_KEY`.
// This variable is assumed to be pre-configured and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    projectName: { type: Type.STRING, description: 'A creative and descriptive name for the DIY project.' },
    description: { type: Type.STRING, description: 'A brief, engaging one-paragraph description of the final project.' },
    skillLevel: { type: Type.STRING, enum: ['Beginner', 'Intermediate', 'Advanced'], description: 'The skill level required for this project.' },
    estimatedTime: { type: Type.STRING, description: 'An estimation of how long the project will take to complete (e.g., "2-3 hours").' },
    materials: {
      type: Type.ARRAY,
      description: 'A list of materials needed for the project.',
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'Name of the material.' },
          quantity: { type: Type.STRING, description: 'Quantity of the material needed (e.g., "1 meter", "2x4x8 piece").' },
          estimatedPrice: { type: Type.STRING, description: 'An estimated price range for the material in Indian Rupees (INR), e.g., "₹500-₹700".' },
          buyLink: { type: Type.STRING, description: 'A valid Amazon.in search URL for the material.' },
        },
        required: ['name', 'quantity', 'estimatedPrice', 'buyLink'],
      },
    },
    tools: {
      type: Type.ARRAY,
      description: 'A list of tools required for the project.',
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'Name of the tool.' },
        },
        required: ['name'],
      },
    },
    instructions: {
      type: Type.ARRAY,
      description: 'A list of step-by-step instructions.',
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.INTEGER, description: 'The step number.' },
          description: { type: Type.STRING, description: 'A clear, concise description of the action to be taken in this step.' },
          visualDescription: { type: Type.STRING, description: 'A short, evocative description of what the project should look like at the end of this step. This will be used as a placeholder for an image.' },
          tip: { type: Type.STRING, description: 'An optional helpful tip for this step.' },
        },
        required: ['step', 'description', 'visualDescription'],
      },
    },
  },
  required: ['projectName', 'description', 'skillLevel', 'estimatedTime', 'materials', 'tools', 'instructions'],
};

interface ImageInput {
  base64Data: string;
  mimeType: string;
}

export const geminiService = {
  generateProjectKit: async (prompt: string, skillLevel: SkillLevel, image?: ImageInput): Promise<Omit<ProjectKit, 'id' | 'mockupDescription'>> => {
    let systemInstruction = `You are an expert DIY project generator for an audience in India. Your task is to create a complete DIY kit plan based on a user's idea and their specified skill level.
The plan must be detailed, well-structured, and easy to follow.
The user's requested skill level is ${skillLevel}. Ensure the project complexity, tools, and instructions are appropriate for this level.
For every single material listed, you MUST provide an estimated price in Indian Rupees (INR), for example "₹500-₹700", and generate a valid Amazon.in search URL for that item. This is a critical requirement.
Provide a complete JSON output that conforms to the provided schema. Do not include any markdown formatting or introductory text.
For 'visualDescription', create a short, evocative phrase that describes what a photo or diagram of that step would show. For example: "A close-up shot of the dovetailed corner joint, perfectly flush."
Be creative and practical. The project should be something a person can realistically build.`;

    let contents: GenerateContentParameters['contents'];

    if (image) {
      systemInstruction += "\nThe user has provided an image. The primary goal is to generate a DIY plan to build the object shown in the image. The text prompt should be used as additional context or for clarification.";
      const imagePart = {
        inlineData: {
          mimeType: image.mimeType,
          data: image.base64Data,
        },
      };
      const textPart = { text: `Generate a DIY project kit for the object in the image. Additional context: "${prompt}"` };
      contents = { parts: [imagePart, textPart] };
    } else {
      contents = `Generate a DIY project kit for the following idea: "${prompt}"`;
    }
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
        },
      });

      const jsonText = response.text;
      const parsedJson = JSON.parse(jsonText.trim());
      
      return parsedJson as Omit<ProjectKit, 'id' | 'mockupDescription'>;

    } catch (error) {
      console.error("Error generating project kit:", error);
      throw new Error("Failed to generate project kit from AI. Please try again.");
    }
  },
};