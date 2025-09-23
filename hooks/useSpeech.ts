import { useState, useEffect, useRef, useCallback } from 'react';

// For Speech Recognition (STT)

// FIX: Add manual type definitions for Web Speech API to resolve TypeScript errors.
// These types are not standard in all browsers/TS lib and are added here for compatibility.
interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

const getSpeechRecognition = (): SpeechRecognitionStatic | null => {
  if (typeof window !== 'undefined') {
    // FIX: Cast window to `any` to access non-standard properties without TS errors.
    return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  }
  return null;
};
// FIX: Renamed constant to avoid conflict with the `SpeechRecognition` interface type.
const SpeechRecognitionAPI = getSpeechRecognition();

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  // FIX: Use the defined interface for the ref type.
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!SpeechRecognitionAPI) return;

    const recognition: SpeechRecognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Changed to Indian English

    // FIX: Refactored the onresult handler to be more robust and standard.
    // This creates the full transcript from the results array on each event,
    // which correctly handles interim results and prevents concatenation issues.
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const fullTranscript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setTranscript(fullTranscript);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript(''); // Reset transcript on start
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  return { isListening, transcript, startListening, stopListening, hasRecognitionSupport: !!SpeechRecognitionAPI };
};


// For Speech Synthesis (TTS)
export const useSpeechSynthesis = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [spokenText, setSpokenText] = useState<string | null>(null);
    const synthRef = useRef(window.speechSynthesis);

    const speak = useCallback((text: string) => {
        if (synthRef.current.speaking) {
            synthRef.current.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => {
            setIsSpeaking(true);
            setSpokenText(text);
        }
        utterance.onend = () => {
            setIsSpeaking(false);
            setSpokenText(null);
        };
        utterance.onerror = () => {
            setIsSpeaking(false);
            setSpokenText(null);
        };
        synthRef.current.speak(utterance);
    }, []);

    const cancel = useCallback(() => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
            setSpokenText(null);
        }
    }, []);
    
    // Cancel speech on component unmount
    useEffect(() => () => cancel(), [cancel]);

    return { isSpeaking, spokenText, speak, cancel, hasSynthesisSupport: !!window.speechSynthesis };
};