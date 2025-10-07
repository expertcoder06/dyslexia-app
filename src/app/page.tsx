"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BookOpen, Rocket, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const Header = () => (
  <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">LexBox</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                <Rocket className="h-4 w-4" />
                <span>How it works</span>
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About Dyslexia</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Blog</a>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/signin">
            <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white">Sign in</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-green-500 hover:bg-green-600 text-white">Get started</Button>
          </Link>
        </div>
      </div>
    </div>
  </header>
);


export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-illustration');
  const videoThumbnail = PlaceHolderImages.find(img => img.id === 'video-thumbnail');
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary/10 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Transforming Dyslexia Education with AI & Gamification
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Empowering millions of K-12 students
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold">SIGN UP FOR FREE</Button>
                </Link>
                <Link href="/dyslexia-test">
                  <Button size="lg" variant="outline" className="bg-green-500 hover:bg-green-600 text-white font-bold border-green-500 w-full">DYSLEXIA TEST FOR KIDS</Button>
                </Link>
              </div>
            </div>
            <div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  data-ai-hint={heroImage.imageHint}
                  className="rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-blue-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {videoThumbnail && (
                 <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src={videoThumbnail.imageUrl}
                        alt={videoThumbnail.description}
                        width={600}
                        height={400}
                        data-ai-hint={videoThumbnail.imageHint}
                        className="w-full"
                      />
                    </CardContent>
                 </Card>
              )}
               <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="ghost" size="icon" className="w-20 h-20 bg-white/30 hover:bg-white/50 rounded-full">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm8.328 6.54l-4.89-3.26A.5.5 0 007 7.69v5.62a.5.5 0 00.438.49l.062.01.062-.01 4.89-3.26a.5.5 0 000-.88z"/>
                    </svg>
                  </Button>
                </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">How It Works?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold">For parents</h3>
                  <p className="mt-2 text-blue-100">
                    Play. Learn. Grow. We leverage artificial intelligence and machine learning to help K-12 students with dyslexia improve their reading skills and achieve their full potential.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">For children</h3>
                  <p className="mt-2 text-blue-100">
                    Create a Profile. Sign up today, and create your student's custom profile to track progress, unlocked achievements, earn 3D rewards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
