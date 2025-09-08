
'use client';

import { Mic, Square } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Type definitions for the Web Speech API
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
}


export default function WelcomeSection() {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setText(text + finalTranscript + interimTranscript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setHasMicPermission(false);
          toast({
            variant: 'destructive',
            title: 'Microphone Access Denied',
            description: 'Please enable microphone access in your browser settings to use voice search.',
          });
        } else {
          toast({
              variant: 'destructive',
              title: 'Speech Recognition Error',
              description: `An error occurred: ${event.error}`,
          });
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
        setHasMicPermission(false);
    }
  }, [toast, text]);

  const handleMicClick = async () => {
    if (typeof window === 'undefined') return;

    if (!recognitionRef.current) {
        toast({
            variant: 'destructive',
            title: 'Browser Not Supported',
            description: 'Speech recognition is not supported in your browser.',
        });
        setHasMicPermission(false);
        return;
    }
    
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }
    
    setIsRecording(true);

    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasMicPermission(true);
        setText('');
        recognitionRef.current.start();
    } catch (err) {
        setIsRecording(false);
        setHasMicPermission(false);
        toast({
            variant: 'destructive',
            title: 'Microphone Access Denied',
            description: 'Please enable microphone access in your browser settings to use this feature.',
        });
        console.error("Mic permission error:", err);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
        Welcome,
        <br />
        What would you like to cook?
      </h1>
      <div className="relative">
        <Textarea
          placeholder="Tell me what you have and I'll show you what to cook"
          className="w-full rounded-2xl bg-[#FFFEFE] pr-10 pl-4 py-3 resize-none min-h-[6rem]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleMicClick}
          className={cn(
            "absolute right-3 bottom-3 h-5 w-5 text-muted-foreground",
            isRecording && "text-primary animate-pulse",
            hasMicPermission === false && "cursor-not-allowed text-destructive/50"
            )}
          disabled={hasMicPermission === false && !isRecording}
          aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
          {isRecording ? <Square /> : <Mic />}
        </button>
      </div>
      {hasMicPermission === false && (
        <Alert variant="destructive">
            <Mic className="h-4 w-4" />
            <AlertTitle>Microphone Access Denied</AlertTitle>
            <AlertDescription>
                Please enable microphone access in your browser settings to use voice search.
            </AlertDescription>
        </Alert>
      )}
    </section>
  );
}
