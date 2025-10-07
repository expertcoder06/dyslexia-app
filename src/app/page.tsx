"use client";

import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { signInAnonymously } from 'firebase/auth';

import SpellbeeGame from '@/components/features/SpellbeeGame';
import LetterTracingGame from '@/components/features/LetterTracingGame';
import ArtworkMatching from '@/components/features/ArtworkMatching';
import AIStorytelling from '@/components/features/AIStorytelling';
import AIBuddy from '@/components/features/AIBuddy';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, BrainCircuit, Mic, Palette, SpellCheck, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type View = 'home' | 'spellbee' | 'letter-tracing' | 'artwork' | 'storytelling' | 'ai-buddy';

const gameComponents: Record<View, React.ComponentType<any> | null> = {
  home: null,
  spellbee: SpellbeeGame,
  'letter-tracing': LetterTracingGame,
  artwork: ArtworkMatching,
  storytelling: AIStorytelling,
  'ai-buddy': AIBuddy,
};

const gameInfo = [
  { id: 'spellbee', title: 'Spellbee', description: 'Arrange letters to spell words correctly.', icon: SpellCheck },
  { id: 'letter-tracing', title: 'Letter Sounds', description: 'Match spoken sounds to the right letters.', icon: Mic },
  { id: 'artwork', title: 'Artwork Match', description: 'Draw an object and see how well the AI understands it.', icon: Palette },
  { id: 'storytelling', title: 'Story Scramble', description: 'Read a story and put the key events in order.', icon: BookOpen },
  { id: 'ai-buddy', title: 'AI Buddy', description: 'Your personal buddy to track emotions and give rewards.', icon: Star },
];

function HomePage({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline text-primary mb-2">Welcome to LexiLearn</h1>
        <p className="text-lg text-muted-foreground">Your fun and friendly space to learn and grow.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gameInfo.map((game) => (
          <Card key={game.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300 bg-card">
            <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
              <game.icon className="w-10 h-10 text-primary" />
              <div className="flex-1">
                <CardTitle className="font-headline">{game.title}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button className="w-full" onClick={() => onNavigate(game.id as View)}>
                Start Game
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        try {
          const userCredential = await signInAnonymously(auth);
          setUser(userCredential.user);
        } catch (error) {
          console.error("Anonymous sign-in failed:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const ActiveComponent = gameComponents[view];
  const gameTitle = gameInfo.find(g => g.id === view)?.title;

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {view === 'home' ? (
        <HomePage onNavigate={setView} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <header className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setView('home')} className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold font-headline text-primary">{gameTitle}</h1>
            <div className="w-36"></div>
          </header>
          <Separator className="mb-8" />
          {ActiveComponent && <ActiveComponent user={user} />}
        </div>
      )}
    </main>
  );
}
