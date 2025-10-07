"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Bot, Brush, Gamepad2, Puzzle, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FloatingAIBuddy from '@/components/features/FloatingAIBuddy';

// Dyslexia-friendly font is already in tailwind.config.ts as 'font-dyslexic' (Lexend)
// We will use PT Sans for headings as requested.

const GemIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
    <path d="M8.53554 2.53553L11.364 0.63604C11.7259 0.391836 12.2741 0.391836 12.636 0.63604L15.4645 2.53553C15.8264 2.77974 16.0391 3.20817 16.0391 3.6721V7.5H7.96092V3.6721C7.96092 3.20817 8.17364 2.77974 8.53554 2.53553Z" fill="currentColor"/>
    <path d="M7.96091 7.5H16.0391L18.5 9.5H5.5L7.96091 7.5Z" fill="currentColor" fillOpacity="0.7"/>
    <path d="M18.5 9.5L16.0391 16.5L12 23L7.96091 16.5L5.5 9.5" fill="currentColor"/>
    <path d="M18.5 9.5L12 11.5L5.5 9.5" fill="currentColor" fillOpacity="0.5"/>
    <path d="M12 23V11.5" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
    <path d="M16.0391 16.5L12 11.5L7.96091 16.5" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
  </svg>
);

const AnimatedText = ({ text, el: Wrapper = 'p', className, stagger = 0.02, delay = 0 }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: i * delay },
    }),
  };
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <Wrapper className={className}>
      <motion.span variants={container} initial="hidden" animate="visible" className="flex">
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index}>
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <Link href="#" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">LexiLearn</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="#features"><Button variant="ghost">Features</Button></Link>
          <Link href="#how-it-works"><Button variant="ghost">How It Works</Button></Link>
          <Link href="/signin"><Button variant="outline">Sign In</Button></Link>
          <Link href="/signup"><Button>Get Started</Button></Link>
        </nav>
        <div className="md:hidden">
            <Link href="/signup"><Button>Get Started</Button></Link>
        </div>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-purple-900/20 to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
    </motion.div>

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <AnimatedText el="h1" text="Unlock Your Potential." className="text-4xl md:text-6xl font-bold tracking-tighter" delay={0.2} />
          <AnimatedText el="p" text="The Gamified Platform for Dyslexia." className="text-4xl md:text-6xl font-bold tracking-tighter text-primary" delay={0.4} />

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-4 text-lg text-muted-foreground font-dyslexic"
          >
            Transforming Learning with AI, Play, and Empathy.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8"
          >
            <Link href="/signup">
              <Button size="lg" className="font-bold group">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="relative h-64 md:h-96 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
            className="absolute"
          >
            <Bot size={128} className="text-primary/30" />
          </motion.div>
          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute"
          >
            <GemIcon />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute text-6xl font-dyslexic text-muted-foreground/50"
            style={{ transform: 'translate(80px, -60px) rotate(15deg)' }}
          >
            bdp
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="absolute text-4xl font-dyslexic text-muted-foreground/50"
            style={{ transform: 'translate(-100px, 40px) rotate(-10deg)' }}
          >
            saw
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const features = [
  {
    icon: Puzzle,
    title: 'AI Storyteller',
    description: 'Generates and reads stories, then scrambles events for a fun sequencing game.',
    color: 'text-purple-400',
  },
  {
    icon: Brush,
    title: 'Creative Artwork Match',
    description: 'Upload drawings and get feedback on how well they match a target image.',
    color: 'text-blue-400',
  },
  {
    icon: Gamepad2,
    title: 'Spellbee Adventures',
    description: 'An interactive drag-and-drop game to practice spelling tricky words.',
    color: 'text-green-400',
  },
  {
    icon: Bot,
    title: 'Your AI Buddy',
    description: 'An empathetic AI friend that offers encouragement based on how you feel.',
    color: 'text-yellow-400',
  },
];

const FeaturesSection = () => {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2 variants={cardVariants} className="text-4xl font-bold text-center mb-4">A World of Playful Learning</motion.h2>
          <motion.p variants={cardVariants} className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto font-dyslexic">
            Our platform is packed with fun, engaging games designed by experts to build confidence and skills.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="h-full text-center hover:-translate-y-2 transition-transform duration-300 group">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon size={32} className={`text-primary ${feature.color}`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-dyslexic">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const stepVariants = {
    offscreen: { x: -50, opacity: 0 },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ amount: 0.3 }}
          transition={{ staggerChildren: 0.3 }}
          className="text-center"
        >
          <motion.h2 variants={stepVariants} className="text-4xl font-bold mb-4">Your Journey to Clarity</motion.h2>
          <motion.p variants={stepVariants} className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto font-dyslexic">
            A simple, adaptive, and rewarding path to better reading and comprehension.
          </motion.p>
          <div className="relative flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
            <motion.div
              variants={stepVariants}
              className="absolute top-0 left-0 hidden md:block w-full h-1 mt-16 bg-border"
            ></motion.div>
            
            {[
              { icon: Gamepad2, title: 'Play & Discover' },
              { icon: Sparkles, title: 'AI Adapts' },
              { icon: Star, title: 'Celebrate Progress' }
            ].map((step, index) => (
              <motion.div key={index} variants={stepVariants} className="relative flex flex-col items-center text-center w-64 mb-12 md:mb-0">
                <div className="w-32 h-32 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 mb-4">
                  <step.icon size={52} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground font-dyslexic px-4">
                  {index === 0 && "Engage with fun games that make learning feel effortless."}
                  {index === 1 && "Our smart system adjusts difficulty to your unique pace."}
                  {index === 2 && "Earn gems and rewards for every milestone you achieve."}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};


const FinalCTASection = () => {
    const sectionVariants = {
        offscreen: { opacity: 0 },
        onscreen: {
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut"
            }
        }
    };
    return (
        <section className="py-24 bg-background">
            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: 0.5 }}
                variants={sectionVariants}
                className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
                <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Learning Journey?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-dyslexic">
                    Join thousands of students who are building confidence and skills with LexiLearn.
                </p>
                <Link href="/signup">
                    <Button size="lg" className="font-bold group animate-pulse">
                        Start Now For Free <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </motion.div>
        </section>
    );
};


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FinalCTASection />
      <FloatingAIBuddy />
      <footer className="bg-muted/40">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LexiLearn. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
