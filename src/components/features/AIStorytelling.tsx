"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Volume2, Wand2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface StoryData {
  summary: string;
  scrambledEvents: string[];
  correctOrder: string[];
}

export default function AIStorytelling() {
  const [story, setStory] = useState('');
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [userOrderedEvents, setUserOrderedEvents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useDyslexicFont, setUseDyslexicFont] = useState(false);
  const { toast } = useToast();
  
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setStoryData(null);
    try {
      const response = await fetch('/api/story-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story }),
      });
      if (!response.ok) throw new Error('Failed to get story data.');
      const data: StoryData = await response.json();
      setStoryData(data);
      setUserOrderedEvents(data.scrambledEvents);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not generate story summary. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReadSummary = () => {
    if (storyData && typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(storyData.summary);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDragSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    let _events = [...userOrderedEvents];
    const draggedItemContent = _events.splice(dragItem.current, 1)[0];
    _events.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setUserOrderedEvents(_events);
  };

  const handleCheckOrder = () => {
    if (!storyData) return;
    const isCorrect = JSON.stringify(userOrderedEvents) === JSON.stringify(storyData.correctOrder);
    if (isCorrect) {
      toast({
        title: 'Congratulations!',
        description: 'You put the story in the correct order!',
      });
    } else {
      toast({
        title: 'Not quite right!',
        description: 'Some events are out of order. Try again!',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Your Story</CardTitle>
          <CardDescription>Paste your story here and let the AI work its magic.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="dyslexic-font-toggle" checked={useDyslexicFont} onCheckedChange={setUseDyslexicFont} />
            <Label htmlFor="dyslexic-font-toggle">Use Dyslexia-Friendly Font</Label>
          </div>
          <Textarea
            placeholder="Once upon a time..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={15}
            className={cn(useDyslexicFont && "font-dyslexic text-lg")}
          />
          <Button onClick={handleGenerate} disabled={isLoading || !story}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            Generate Summary & Game
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Story Summary & Game</CardTitle>
          <CardDescription>Read the summary, then order the events.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {isLoading && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>}
          
          {storyData && (
            <>
              <div>
                <h3 className="font-semibold mb-2">AI Summary</h3>
                <div className="p-4 bg-muted rounded-lg flex items-start gap-4">
                  <p className={cn("flex-grow", useDyslexicFont && "font-dyslexic text-lg")}>{storyData.summary}</p>
                  <Button variant="ghost" size="icon" onClick={handleReadSummary}><Volume2 /></Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Sequence The Events</h3>
                <p className="text-sm text-muted-foreground mb-2">Drag and drop the events into the correct order.</p>
                <div className="flex flex-col gap-2">
                  {userOrderedEvents.map((event, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => dragItem.current = index}
                      onDragEnter={() => dragOverItem.current = index}
                      onDragEnd={handleDragSort}
                      onDragOver={(e) => e.preventDefault()}
                      className={cn("p-3 bg-secondary rounded-md cursor-grab active:cursor-grabbing", useDyslexicFont && "font-dyslexic text-lg")}
                    >
                      <span className="font-bold mr-2 text-primary">{index + 1}.</span>
                      {event}
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleCheckOrder}>Check Order</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
