"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, Loader2 } from 'lucide-react';
import AIBuddy from '@/components/features/AIBuddy';
import AIStorytelling from '@/components/features/AIStorytelling';
import ArtworkMatching from '@/components/features/ArtworkMatching';
import LetterTracingGame from '@/components/features/LetterTracingGame';
import SpellbeeGame from '@/components/features/SpellbeeGame';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/signin');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/signin');
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Loader2 className="h-16 w-16 animate-spin" />
        <p className="mt-4">Loading dashboard...</p>
      </main>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <main className="min-h-screen bg-muted/40">
        <header className="bg-background border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center gap-4">
                     <Avatar>
                        <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ""} />
                        <AvatarFallback>{user.displayName?.[0] ?? user.email?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5 text-sm">
                        <div className="font-medium">{user.displayName ?? 'Welcome'}</div>
                        <div className="text-muted-foreground">{user.email}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleSignOut}>
                        <LogOut className="h-5 w-5" />
                        <span className="sr-only">Sign out</span>
                    </Button>
                </div>
            </div>
        </header>

        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-8">Your Learning Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="lg:col-span-1 xl:col-span-2">
                    <AIBuddy user={user} />
                </div>
                <div className="lg:col-span-1 xl:col-span-2">
                    <AIStorytelling />
                </div>

                <ArtworkMatching />
                
                <div className="grid grid-cols-1 gap-8">
                    <LetterTracingGame />
                    <SpellbeeGame />
                </div>
            </div>
        </div>
    </main>
  );
}