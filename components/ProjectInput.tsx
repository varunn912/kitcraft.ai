import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { SkillLevel, ProjectKit } from '../types';
import LoadingState from './LoadingState';
import { useSpeechRecognition } from '../hooks/useSpeech';
import { MicrophoneIcon, StopIcon, CameraIcon, TrashIcon } from './icons';

interface ProjectInputProps {
  onProjectCreated: (kit: ProjectKit) => void;
}

const fileToBase64 = (file: File): Promise<{ base64Data: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve({ base64Data, mimeType: file.type });
    };
    reader.onerror = error => reject(error);
  });
};

const ProjectInput: React.FC<ProjectInputProps> = ({ onProjectCreated }) => {
  const [prompt, setPrompt] = useState('');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(SkillLevel.Beginner);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<{ file: File; preview: string; base64Data: string; mimeType: string; } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const promptBeforeListening = useRef('');

  const { isListening, transcript, startListening, stopListening, hasRecognitionSupport } = useSpeechRecognition();

  useEffect(() => {
    // This effect combines the text that existed before listening started with the new transcript.
    const baseText = promptBeforeListening.current;
    const newPrompt = baseText + (baseText && transcript ? ' ' : '') + transcript;
    setPrompt(newPrompt);
  }, [transcript]);
  
  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      // Save the current prompt right before starting to listen.
      promptBeforeListening.current = prompt;
      startListening();
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const { base64Data, mimeType } = await fileToBase64(file);
        setImage({
          file,
          preview: URL.createObjectURL(file),
          base64Data,
          mimeType,
        });
      } catch (error) {
        console.error("Error converting file to base64", error);
        setError("Could not process the selected image.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !image) {
      setError('Please enter a project idea or upload an image.');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const generatedKitData = await geminiService.generateProjectKit(
          prompt,
          skillLevel,
          image ? { base64Data: image.base64Data, mimeType: image.mimeType } : undefined
      );
      const newKit: ProjectKit = {
        id: `kit_${Date.now()}`,
        mockupDescription: prompt,
        ...generatedKitData,
      };
      onProjectCreated(newKit);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Let's Build Your Idea
        </h1>
        <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
          Describe or show us the DIY project you want to create, and our AI will generate a complete kit.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 dark:bg-slate-800/50 backdrop-blur-sm border border-black/10 dark:border-slate-700/50 rounded-2xl shadow-xl p-8">
        
        {image && (
          <div className="relative group">
            <img src={image.preview} alt="Project preview" className="w-full h-auto max-h-60 object-contain rounded-lg" />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Your Project Idea {image && '(add details for the image)'}
          </label>
          <div className="mt-1 relative">
            <textarea
              id="prompt"
              name="prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="block w-full px-3 py-2 bg-white/10 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent pr-24"
              placeholder="e.g., a rustic wooden bookshelf for a small apartment"
            />
             <div className="absolute top-2 right-2 flex space-x-1">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-full text-slate-400 hover:text-fuchsia-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Upload an image"
                >
                    <CameraIcon className="h-5 w-5" />
                </button>
                {hasRecognitionSupport && (
                    <button
                    type="button"
                    onClick={handleToggleListening}
                    className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-fuchsia-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                    aria-label={isListening ? 'Stop recording' : 'Start recording'}
                    >
                    {isListening ? <StopIcon className="h-5 w-5" /> : <MicrophoneIcon className="h-5 w-5" />}
                    </button>
                )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="skillLevel" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Select Your Skill Level
          </label>
          <select
            id="skillLevel"
            name="skillLevel"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white/10 dark:bg-slate-900/70 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm rounded-md text-slate-800 dark:text-slate-100"
          >
            {Object.values(SkillLevel).map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-all transform hover:scale-105"
          >
            Generate Kit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectInput;