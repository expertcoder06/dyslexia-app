"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Volume2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const words = [
  { word: 'WAS', scrambled: 'SWA' },
  { word: 'BED', scrambled: 'EDB' },
  { word: 'TOP', scrambled: 'POT' },
  { word: 'PIG', scrambled: 'GIP' },
  { word: 'DAY', scrambled: 'ADY' },
];

export default function SpellbeeGame() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [unplacedLetters, setUnplacedLetters] = useState<string[]>([]);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const { toast } = useToast();

  const currentWord = useMemo(() => words[currentWordIndex], [currentWordIndex]);

  useEffect(() => {
    const targetLength = currentWord.word.length;
    setUnplacedLetters(currentWord.scrambled.split(''));
    setPlacedLetters(Array(targetLength).fill(null));
  }, [currentWord]);

  const handlePronounce = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheck = () => {
    const userAnswer = placedLetters.join('');
    if (userAnswer === currentWord.word) {
      toast({
        title: "Correct!",
        description: "Great job! Let's try the next word.",
      });
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 1000);
    } else {
      toast({
        title: "Not quite!",
        description: "Give it another try. You can do it!",
        variant: 'destructive',
      });
    }
  };
  
  const handleReset = () => {
    setUnplacedLetters(currentWord.scrambled.split(''));
    setPlacedLetters(Array(currentWord.word.length).fill(null));
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, letter: string, index: number, from: 'unplaced' | 'placed') => {
    e.dataTransfer.setData('letter', letter);
    e.dataTransfer.setData('index', index.toString());
    e.dataTransfer.setData('from', from);
  };
  
  const onDrop = (e: React.DragEvent<HTMLDivElement>, toIndex: number, to: 'unplaced' | 'placed') => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('letter');
    const fromIndex = parseInt(e.dataTransfer.getData('index'));
    const from = e.dataTransfer.getData('from');

    if (letter) {
      let newUnplaced = [...unplacedLetters];
      let newPlaced = [...placedLetters];

      // Remove from source
      if (from === 'unplaced') {
        newUnplaced.splice(fromIndex, 1, null as any); // leave a hole
      } else {
        newPlaced[fromIndex] = null;
      }

      // Add to destination
      if (to === 'unplaced') {
        if(newUnplaced[toIndex] === null) {
          newUnplaced[toIndex] = letter;
        } else { // if not dropping on an empty spot, find one
          const emptyIndex = newUnplaced.findIndex(l => l === null);
          if (emptyIndex !== -1) newUnplaced[emptyIndex] = letter;
          else newUnplaced.push(letter);
        }
      } else { // to 'placed'
         if (newPlaced[toIndex] === null) {
            newPlaced[toIndex] = letter;
         } else { // swap
            const displacedLetter = newPlaced[toIndex];
            newPlaced[toIndex] = letter;

            const emptyIndex = newUnplaced.findIndex(l => l === null);
            if (emptyIndex !== -1) newUnplaced[emptyIndex] = displacedLetter;
            else newUnplaced.push(displacedLetter);
         }
      }
      
      setUnplacedLetters(newUnplaced.filter(l => l !== null));
      setPlacedLetters(newPlaced);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const LetterTile = ({ letter, ...props }: { letter: string | null } & React.HTMLAttributes<HTMLDivElement>) => (
    <div
      {...props}
      className={cn(
        "flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-secondary rounded-lg text-4xl font-bold font-headline select-none",
        letter && "cursor-grab active:cursor-grabbing",
        !letter && "bg-muted/50 border-dashed border-2"
      )}
    >
      {letter}
    </div>
  );

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Arrange the letters to spell the word
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <Button variant="outline" onClick={handlePronounce}>
          <Volume2 className="mr-2 h-5 w-5" />
          Hear the Word
        </Button>

        <div className="flex flex-col gap-4 items-center">
            <p className="text-muted-foreground">Your answer:</p>
            <div className="flex gap-2 p-4 bg-background rounded-xl" onDragOver={onDragOver}>
              {placedLetters.map((letter, index) => (
                <div key={index} onDrop={(e) => onDrop(e, index, 'placed')} onDragOver={onDragOver}>
                  <LetterTile 
                      letter={letter} 
                      draggable={!!letter}
                      onDragStart={(e) => letter && onDragStart(e, letter, index, 'placed')}
                  />
                </div>
              ))}
            </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
            <p className="text-muted-foreground">Available letters:</p>
            <div className="flex gap-2 p-4 bg-muted rounded-xl min-h-[104px] min-w-[300px]" onDragOver={onDragOver} onDrop={(e) => onDrop(e, -1, 'unplaced')}>
              {unplacedLetters.map((letter, index) => (
                <LetterTile
                  key={index}
                  letter={letter}
                  draggable
                  onDragStart={(e) => onDragStart(e, letter, index, 'unplaced')}
                />
              ))}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button onClick={handleCheck} size="lg">Check My Answer</Button>
        <Button onClick={handleReset} variant="secondary" size="lg">
            <RefreshCw className="mr-2 h-4 w-4"/>
            Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
