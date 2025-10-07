"use client";

import React, { useState, useMemo } from 'react';
import useSpeechRecognition from '@/hooks/use-speech-recognition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const pairs = [
  { options: ['b', 'd'], answer: 'b' },
  { options: ['p', 'q'], answer: 'p' },
  { options: ['was', 'saw'], answer: 'was' },
];

export default function LetterTracingGame() {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { toast } = useToast();
  const { isListening, transcript, startListening, stopListening, error, isSupported } = useSpeechRecognition();

  const currentPair = useMemo(() => pairs[currentPairIndex], [currentPairIndex]);

  const handleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      setSelectedOption(null);
      startListening();
    }
  };

  React.useEffect(() => {
    if (transcript) {
        const cleanedTranscript = transcript.toLowerCase().replace(/[^a-z]/g, '');
        const correctSound = currentPair.answer.toLowerCase();

        // Simple check if transcript contains the sound
        if (cleanedTranscript.includes(correctSound)) {
            setSelectedOption(currentPair.answer);
            toast({ title: "Great job!", description: `You said "${transcript}", which is correct!` });
            setTimeout(() => {
                setCurrentPairIndex(prev => (prev + 1) % pairs.length);
                setSelectedOption(null);
            }, 2000);
        } else {
            const incorrectOption = currentPair.options.find(opt => opt !== currentPair.answer);
            if(incorrectOption && cleanedTranscript.includes(incorrectOption)){
                setSelectedOption(incorrectOption);
            }
            toast({ title: "Try again!", description: `I heard "${transcript}". Let's give it another shot.`, variant: "destructive" });
        }
    }
  }, [transcript, currentPair, toast]);

  if (!isSupported) {
    return (
      <Card className="max-w-lg mx-auto bg-destructive/10 border-destructive">
          <CardHeader className="flex-row items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-destructive"/>
              <CardTitle>Speech Recognition Not Supported</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-destructive-foreground">Sorry, your browser does not support the Web Speech API required for this game. Please try using a different browser like Chrome or Firefox.</p>
          </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">What letter or word do you hear?</CardTitle>
        <CardDescription className="text-center">Click the microphone and say one of the options below.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <div className="flex justify-center gap-8">
          {currentPair.options.map((option) => (
            <div
              key={option}
              className={cn(
                "flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-secondary rounded-lg text-6xl font-bold font-headline transition-all duration-300",
                selectedOption === option && option === currentPair.answer && "bg-green-500/80 text-white scale-110",
                selectedOption === option && option !== currentPair.answer && "bg-red-500/80 text-white scale-110"
              )}
            >
              {option}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4">
            <Button onClick={handleListen} size="lg" className="w-48">
            {isListening ? (
                <>
                    <MicOff className="mr-2 h-5 w-5" />
                    Listening...
                </>
            ) : (
                <>
                    <Mic className="mr-2 h-5 w-5" />
                    Speak Now
                </>
            )}
            </Button>
            {transcript && <p className="text-muted-foreground">You said: "{transcript}"</p>}
            {error && <p className="text-destructive">Error: {error}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
