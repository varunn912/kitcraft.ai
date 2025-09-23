import React from 'react';
import type { Instruction } from '../types';
import { useSpeechSynthesis } from '../hooks/useSpeech';
import { SpeakerIcon, StopIcon } from './icons';

interface InstructionsListProps {
  instructions: Instruction[];
}

const InstructionsList: React.FC<InstructionsListProps> = ({ instructions }) => {
  const { isSpeaking, spokenText, speak, cancel, hasSynthesisSupport } = useSpeechSynthesis();

  const handleSpeak = (text: string) => {
    if (isSpeaking && spokenText === text) {
      cancel();
    } else {
      speak(text);
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {instructions.map((instruction, instructionIdx) => (
          <li key={instruction.step}>
            <div className="relative pb-8">
              {instructionIdx !== instructions.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div>
                  <div className="relative px-1">
                    <div className="h-8 w-8 bg-fuchsia-500 rounded-full ring-8 ring-white dark:ring-slate-800/50 flex items-center justify-center">
                      <span className="text-white font-bold">{instruction.step}</span>
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1 py-1.5">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    <p className="font-medium text-slate-900 dark:text-slate-100 mb-2">{instruction.description}</p>
                    <div className="prose prose-sm max-w-none text-slate-500 dark:text-slate-400 mt-2 p-3 bg-slate-100 dark:bg-slate-900/70 rounded-md border border-slate-200 dark:border-slate-700">
                        <p className="italic">Visual: "{instruction.visualDescription}"</p>
                    </div>
                    {instruction.tip && (
                        <div className="mt-2 text-xs text-fuchsia-600 dark:text-fuchsia-400 p-2 bg-fuchsia-50 dark:bg-fuchsia-900/30 rounded-md">
                           <strong>Tip:</strong> {instruction.tip}
                        </div>
                    )}
                  </div>
                </div>
                 {hasSynthesisSupport && (
                    <button
                      onClick={() => handleSpeak(instruction.description)}
                      className="ml-4 p-2 rounded-full self-center text-slate-400 hover:text-fuchsia-500"
                      aria-label={isSpeaking && spokenText === instruction.description ? 'Stop reading' : 'Read instruction aloud'}
                    >
                      {isSpeaking && spokenText === instruction.description
                        ? <StopIcon className="h-5 w-5 text-red-500" />
                        : <SpeakerIcon className="h-5 w-5" />
                      }
                    </button>
                  )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructionsList;
