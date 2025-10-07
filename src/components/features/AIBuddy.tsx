"use client";

import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { updateUserScore, getUserScore } from '@/lib/firestore';
import { useToast } from '@/hooks/use-toast';
import { Gem, Loader2, MessageSquareHeart, Smile, Frown } from 'lucide-react';

interface AIBuddyProps {
  user: User | null;
}

export default function AIBuddy({ user }: AIBuddyProps) {
  const [score, setScore] = useState(0);
  const [cheeringMessage, setCheeringMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      getUserScore(user.uid).then(setScore);
    }
  }, [user]);

  const handleHappy = async () => {
    if (!user) return;
    const gemsEarned = 5;
    await updateUserScore(user.uid, gemsEarned);
    const newScore = await getUserScore(user.uid);
    setScore(newScore);
    toast({
      title: 'Awesome!',
      description: `You earned ${gemsEarned} gems for feeling happy!`,
    });
  };

  const handleSad = async () => {
    if (!user) return;
    setIsLoading(true);
    setCheeringMessage('');
    try {
      const response = await fetch('/api/ai-buddy', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to get message.');
      const data = await response.json();
      setCheeringMessage(data.message);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not get a cheering message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Your AI Buddy</CardTitle>
        <div className="flex justify-center items-center gap-2 pt-4">
          <Gem className="text-yellow-400" />
          <span className="text-xl font-bold">{score}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <CardDescription>How are you feeling right now? (Simulated)</CardDescription>
        <div className="flex gap-4">
          <Button onClick={handleHappy} size="lg" className="bg-green-600 hover:bg-green-700">
            <Smile className="mr-2" />
            I'm Feeling Happy
          </Button>
          <Button onClick={handleSad} size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Frown className="mr-2" />
            I'm Feeling Sad
          </Button>
        </div>
        
        {(isLoading || cheeringMessage) && (
            <div className="w-full p-4 bg-muted rounded-lg mt-4 min-h-[100px] flex items-center justify-center">
                {isLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : (
                    <div className="text-center flex flex-col items-center gap-2">
                        <MessageSquareHeart className="w-8 h-8 text-primary" />
                        <p className="text-lg italic">{cheeringMessage}</p>
                    </div>
                )}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
