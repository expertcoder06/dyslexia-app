"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bot, Sparkles, MessageSquareHeart, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const GemIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.53554 2.53553L11.364 0.63604C11.7259 0.391836 12.2741 0.391836 12.636 0.63604L15.4645 2.53553C15.8264 2.77974 16.0391 3.20817 16.0391 3.6721V7.5H7.96092V3.6721C7.96092 3.20817 8.17364 2.77974 8.53554 2.53553Z" fill="hsl(var(--primary))"/>
    <path d="M7.96091 7.5H16.0391L18.5 9.5H5.5L7.96091 7.5Z" fill="hsl(var(--primary))" fillOpacity="0.7"/>
    <path d="M18.5 9.5L16.0391 16.5L12 23L7.96091 16.5L5.5 9.5" fill="hsl(var(--accent))"/>
    <path d="M18.5 9.5L12 11.5L5.5 9.5" fill="hsl(var(--accent))" fillOpacity="0.5"/>
    <path d="M12 23V11.5" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
    <path d="M16.0391 16.5L12 11.5L7.96091 16.5" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
  </svg>
);

export default function FloatingAIBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setMessage('');
    }
  };

  const handleGetMessage = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/ai-buddy', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to get message.');
      const data = await response.json();
      setMessage(data.message);
      toast({
        title: "A message for you!",
        description: data.message,
      });
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
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-80 bg-card rounded-lg shadow-2xl p-4 mb-4 border border-border"
          >
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <Bot className="text-primary"/>
                    <h3 className="font-semibold">Your AI Buddy</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X size={18} />
                </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Feeling down? Get a quick boost of encouragement from your buddy!
            </p>
            <Button onClick={handleGetMessage} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Cheer Me Up!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={handleToggle}
        className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg",
            "bg-gradient-to-br from-purple-500 to-blue-500"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <AnimatePresence mode="wait">
            {isOpen ? (
                 <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={32} />
                 </motion.div>
            ) : (
                <motion.div key="icon" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} >
                    <GemIcon />
                </motion.div>
            )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
