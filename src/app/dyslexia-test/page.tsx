"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BookOpen, AlertTriangle, CheckCircle, BarChart, ArrowRight, ArrowLeft, RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

const allQuestions = [
  {
    id: 'q1',
    text: "Does your child have trouble recognizing the letters of the alphabet?",
    options: [
      { value: '0', label: 'Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
      { value: '3', label: 'Very Often' },
    ],
  },
  {
    id: 'q2',
    text: "Does your child misread or omit common short words like 'a', 'the', 'is'?",
    options: [
      { value: '0', label: 'Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
      { value: '3', label: 'Very Often' },
    ],
  },
  {
    id: 'q3',
    text: "Does your child confuse letters that look similar, like 'b' and 'd', or 'p' and 'q'?",
    options: [
      { value: '0', label: 'Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
      { value: '3', label: 'Very Often' },
    ],
  },
  {
    id: 'q4',
    text: "Does your child have difficulty sounding out new words?",
    options: [
      { value: '0', label: 'Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
      { value: '3', label: 'Very Often' },
    ],
  },
  {
    id: 'q5',
    text: "Does your child complain about words or letters 'moving around' on the page while reading?",
    options: [
      { value: '0', label: 'Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
      { value: '3', label: 'Very Often' },
    ],
  },
  {
    id: 'q6',
    text: "Does your child struggle with rhyming words (e.g., cat, hat, bat)?",
    options: [
      { value: '0', label: 'Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
      { value: '3', label: 'Very Often' },
    ],
  },
  {
    id: 'q7',
    text: "Does your child have difficulty remembering sequences, like days of the week, months, or the alphabet?",
    options: [
      { value: '0', label: 'Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
      { value: '3', label: 'Very Often' },
    ],
  },
  {
    id: 'q8',
    text: "Is your child's spelling unpredictable and inconsistent (e.g., spelling the same word differently in the same document)?",
    options: [
      { value: '0', label: 'Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
      { value: '3', label: 'Very Often' },
    ],
  },
  {
    id: 'q9',
    text: "Does your child avoid reading aloud or seem unusually stressed or tired when asked to do so?",
    options: [
      { value: '0', label: 'Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
      { value: '3', label: 'Very Often' },
    ],
  },
  {
    id: 'q10',
    text: "Does your child have trouble telling left from right?",
    options: [
      { value: '0', label: 'Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
      { value: '3', label: 'Very Often' },
    ],
  },
  {
    id: 'q11',
    text: "When writing, does your child reverse letters or numbers past the first grade (e.g., writing 'saw' as 'was', or '3' as 'E')?",
    options: [
      { value: '0', label: 'Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
      { value: '3', label: 'Very Often' },
    ],
  },
  {
    id: 'q12',
    text: "Is there a family history of dyslexia or reading difficulties?",
     options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Unsure' },
      { value: '2', label: 'Yes (Immediate Family)' },
      { value: '3', label: 'Yes (Extended Family)' },
    ],
  },
];

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

const Results = ({ score, total, onRetake }: { score: number, total: number, onRetake: () => void }) => {
    const scorePercentage = (score / total) * 100;
    
    const getResult = () => {
        if (scorePercentage < 30) {
            return {
                level: "Low Likelihood",
                colorClass: "text-green-500",
                progressColor: "bg-green-500",
                icon: <CheckCircle className="w-16 h-16" />,
                description: "Based on your answers, the observed behaviors show a low correlation with common signs of dyslexia.",
                advice: "While the signs are not strong, continue to monitor your child's progress and encourage a love for reading. If you have any concerns, it's always best to speak with a teacher or pediatrician."
            };
        } else if (scorePercentage < 60) {
            return {
                level: "Moderate Likelihood",
                colorClass: "text-yellow-500",
                progressColor: "bg-yellow-500",
                icon: <BarChart className="w-16 h-16" />,
                description: "Your answers indicate some signs that are consistent with dyslexia.",
                advice: "It may be beneficial to discuss these observations with your child's teacher and consider a professional evaluation. Early support can make a significant difference."
            };
        } else {
            return {
                level: "High Likelihood",
                colorClass: "text-red-500",
                progressColor: "bg-red-500",
                icon: <AlertTriangle className="w-16 h-16" />,
                description: "The behaviors you've reported show a strong correlation with the common signs of dyslexia.",
                advice: "We strongly recommend that you consult with a specialist, such as an educational psychologist or a pediatrician, for a formal diagnostic assessment. Early and targeted intervention is key to helping children with dyslexia thrive."
            };
        }
    }

    const result = getResult();

    return (
        <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader className="text-center bg-muted/30 rounded-t-lg">
                <CardTitle className="text-3xl font-bold">Screening Results</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
                <div className={result.colorClass}>{result.icon}</div>
                <h3 className={`text-2xl font-bold ${result.colorClass}`}>{result.level}</h3>
                <div className="w-full text-center">
                    <p className="text-lg font-medium">Your Score: {score} / {total}</p>
                    <Progress value={scorePercentage} className={`mt-2 h-3 [&>div]:${result.progressColor}`} />
                </div>
                <p className="text-lg">{result.description}</p>
                <p className="text-muted-foreground">{result.advice}</p>

                <Card className="w-full mt-4 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 mt-1 text-amber-600" />
                            <div>
                                <h4 className="font-semibold text-amber-800 dark:text-amber-300">Important Disclaimer</h4>
                                <p className="text-sm text-amber-700 dark:text-amber-400">
                                This screening is not a diagnosis. It is a tool to help identify potential signs of dyslexia. Please consult a qualified professional for an accurate diagnosis.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </CardContent>
            <CardFooter className="justify-center bg-muted/30 py-4 rounded-b-lg">
                <Button onClick={onRetake} size="lg">
                    <RotateCw className="mr-2 h-4 w-4" />
                    Retake The Test
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function DyslexiaTestPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();

  const [questions, setQuestions] = useState<typeof allQuestions>([]);

  useEffect(() => {
    // Shuffle questions and their options on component mount
    const shuffledQuestions = shuffleArray([...allQuestions]).map(q => ({
      ...q,
      options: shuffleArray([...q.options])
    }));
    setQuestions(shuffledQuestions);
  }, []);

  const handleValueChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
        router.push('/');
    }
  };
  
  const calculateScore = () => {
    return Object.values(answers).reduce((total, value) => total + parseInt(value, 10), 0);
  }
  
  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    // Re-shuffle questions for the new test
    const shuffledQuestions = shuffleArray([...allQuestions]).map(q => ({
      ...q,
      options: shuffleArray([...q.options])
    }));
    setQuestions(shuffledQuestions);
  }

  if (questions.length === 0) {
    // Loading state while questions are being shuffled
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-blue-50 dark:from-background dark:to-slate-900 p-4">
            <p>Loading test...</p>
        </main>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered = !!answers[currentQuestion.id];
  const totalPossibleScore = questions.length * 3; // Max score per question is 3
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (isFinished) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-blue-50 dark:from-background dark:to-slate-900 p-4 md:p-8">
            <Results score={calculateScore()} total={totalPossibleScore} onRetake={handleRetake} />
        </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-blue-50 dark:from-background dark:to-slate-900 p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-center text-3xl font-bold mt-4">
            Dyslexia Screening
          </CardTitle>
          <CardDescription className="text-center pt-2 text-base">
            Answer these questions based on your child's behavior. This is a quick screening, not a diagnosis.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 md:px-8">
            <div className="my-6">
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-center text-sm text-muted-foreground mt-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
          <div className="p-6 border rounded-lg bg-muted/30 min-h-[200px] flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-6 text-center">{currentQuestion.text}</h3>
            <RadioGroup
              value={answers[currentQuestion.id]}
              onValueChange={(value) => handleValueChange(currentQuestion.id, value)}
              className="grid grid-cols-2 justify-center gap-4"
            >
              {currentQuestion.options.map(option => (
                <div key={option.value}>
                  <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} className="sr-only" />
                  <Label 
                    htmlFor={`${currentQuestion.id}-${option.value}`} 
                    className={`text-base cursor-pointer border-2 rounded-lg px-6 py-3 transition-all duration-200 block text-center
                        ${answers[currentQuestion.id] === option.value 
                            ? 'bg-primary text-primary-foreground border-primary' 
                            : 'bg-background hover:bg-accent hover:text-accent-foreground'
                        }`}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between px-6 md:px-8 py-6 bg-muted/30 rounded-b-lg">
          <Button variant="outline" size="lg" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentQuestionIndex === 0 ? 'Home' : 'Back'}
          </Button>
          <Button size="lg" onClick={handleNext} disabled={!isCurrentQuestionAnswered}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish & See Results' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
