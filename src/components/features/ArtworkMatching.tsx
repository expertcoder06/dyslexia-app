"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Upload } from 'lucide-react';

export default function ArtworkMatching() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const targetImage = PlaceHolderImages.find(img => img.id === 'artwork-target');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUserImage(URL.createObjectURL(file));
      setSimilarity(null);
      setIsCalculating(true);

      // Simulate ML model calculation
      setTimeout(() => {
        // In a real app, this would be the cosine similarity score from TensorFlow.js
        const randomScore = Math.random() * (0.95 - 0.6) + 0.6;
        setSimilarity(Math.round(randomScore * 100));
        setIsCalculating(false);
      }, 2000);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>The Target</CardTitle>
          <CardDescription>The AI is looking for a drawing of a house.</CardDescription>
        </CardHeader>
        <CardContent>
          {targetImage && (
            <Image
              src={targetImage.imageUrl}
              alt={targetImage.description}
              width={600}
              height={400}
              data-ai-hint={targetImage.imageHint}
              className="rounded-lg object-cover"
            />
          )}
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Your Drawing</CardTitle>
          <CardDescription>Upload a picture of your drawing to see how well it matches.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col items-center justify-center gap-4">
          {userImage ? (
            <Image
              src={userImage}
              alt="User upload"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-muted/50">
              <p className="text-muted-foreground">Your image will appear here</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <Button onClick={handleButtonClick} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Upload Your Drawing
          </Button>
        </CardContent>
        {(isCalculating || similarity !== null) && (
          <CardContent>
            <h3 className="text-lg font-semibold text-center mb-2">Match Score</h3>
            {isCalculating ? (
                 <div className="text-center">Calculating...</div>
            ) : similarity !== null ? (
              <div className="flex flex-col items-center gap-2">
                <Progress value={similarity} className="w-full h-4" />
                <p className="text-2xl font-bold text-primary">{similarity}% Match</p>
                <p className="text-sm text-muted-foreground text-center">
                    {similarity > 80 ? "Excellent work, that's definitely a house!" : "Good try! The AI thinks it's something else, but keep practicing!"}
                </p>
              </div>
            ) : null}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
