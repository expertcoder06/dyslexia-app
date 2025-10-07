"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BookOpen, AlertTriangle, CheckCircle, BarChart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 'q1',
    text: "Does your child have trouble recognizing the letters of the alphabet?",
    options: [
      { value: '0', label: 'Rarely or Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
    ],
  },
  {
    id: 'q2',
    text: "Does your child misread or omit common short words like 'a', 'the', 'is'?",
    options: [
      { value: '0', label: 'Rarely or Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
    ],
  },
  {
    id: 'q3',
    text: "Does your child confuse letters that look similar, like 'b' and 'd', or 'p' and 'q'?",
    options: [
      { value: '0', label: 'Rarely or Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
    ],
  },
  {
    id: 'q4',
    text: "Does your child have difficulty sounding out new words?",
    options: [
      { value: '0', label: 'Rarely or Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
    ],
  },
  {
    id: 'q5',
    text: "Does your child complain about words or letters 'moving around' on the page while reading?",
    options: [
      { value: '0', label: 'Rarely or Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
    ],
  },
  {
    id: 'q6',
    text: "Does your child struggle with rhyming words (e.g., cat, hat, bat)?",
    options: [
      { value: '0', label: 'Rarely or Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
    ],
  },
  {
    id: 'q7',
    text: "Does your child have difficulty remembering sequences, like days of the week, months, or the alphabet?",
    options: [
      { value: '0', label: 'Rarely or Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
    ],
  },
  {
    id: 'q8',
    text: "Is your child's spelling unpredictable and inconsistent (e.g., spelling the same word differently in the same document)?",
    options: [
      { value: '0', label: 'Rarely or Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
    ],
  },
  {
    id: 'q9',
    text: "Does your child avoid reading aloud or seem unusually stressed or tired when asked to do so?",
    options: [
      { value: '0', label: 'Rarely or Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
    ],
  },
  {
    id: 'q10',
    text: "Does your child have trouble telling left from right?",
    options: [
      { value: '0', label: 'Rarely or Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
    ],
  },
  {
    id: 'q11',
    text: "When writing, does your child reverse letters or numbers past the first grade (e.g., writing 'saw' as 'was', or '3' as 'E')?",
    options: [
      { value: '0', label: 'Rarely or Never' },
      { value: '1', label: 'Sometimes' },
      { value: '2', label: 'Often' },
    ],
  },
  {
    id: 'q12',
    text: "Is there a family history of dyslexia or reading difficulties?",
    options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Unsure' },
      { value: '2', label: 'Yes' },
    ],
  },
];

const Results = ({ score, total, onRetake }: { score: number, total: number, onRetake: () => void }) => {
    const getResult = () => {
        const percentage = (score / total) * 100;
        if (percentage < 30) {
            return {
                level: "Low Likelihood",
                color: "text-green-500",
                icon: <CheckCircle className="w-16 h-16" />,
                description: "Based on your answers, the observed behaviors show a low correlation with common signs of dyslexia.",
                advice: "While the signs are not strong, continue to monitor your child's progress and encourage a love for reading. If you have any concerns, it's always best to speak with a teacher or pediatrician."
            };
        } else if (percentage < 60) {
            return {
                level: "Moderate Likelihood",
                color: "text-yellow-500",
                icon: <BarChart className="w-16 h-16" />,
                description: "Your answers indicate some signs that are consistent with dyslexia.",
                advice: "It may be beneficial to discuss these observations with your child's teacher and consider a professional evaluation. Early support can make a significant difference."
            };
        } else {
            return {
                level: "High Likelihood",
                color: "text-red-500",
                icon: <AlertTriangle className="w-16 h-16" />,
                description: "The behaviors you've reported show a strong correlation with the common signs of dyslexia.",
                advice: "We strongly recommend that you consult with a specialist, such as an educational psychologist or a pediatrician, for a formal diagnostic assessment. Early and targeted intervention is key to helping children with dyslexia thrive."
            };
        }
    }

    const result = getResult();

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">Test Results</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 text-center">
                <div className={result.color}>{result.icon}</div>
                <h3 className={`text-2xl font-bold ${result.color}`}>{result.level}</h3>
                <p className="text-lg">{result.description}</p>
                <p className="text-muted-foreground">{result.advice}</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 my-4">
                    <div className={`h-4 rounded-full ${result.color.replace('text', 'bg')}`} style={{ width: `${(score / total) * 100}%` }}></div>
                </div>
                <p className="text-sm text-muted-foreground">Your Score: {score} out of {total}</p>

                <Card className="w-full mt-4 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="w-5 h-5 mt-1 text-amber-600" />
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
            <CardFooter className="justify-center">
                <Button onClick={onRetake}>Retake The Test</Button>
            </CardFooter>
        </Card>
    )
}

export default function DyslexiaTestPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();

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
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered = !!answers[currentQuestion.id];
  const totalPossibleScore = questions.length * 2;

  if (isFinished) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
            <Results score={calculateScore()} total={totalPossibleScore} onRetake={handleRetake} />
        </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl flex items-center justify-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            Dyslexia Screening Test
          </CardTitle>
          <CardDescription className="text-center pt-2">
            This is a quick screening tool for parents. Answer the questions based on your child's behavior.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="my-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
          <div className="p-4 border rounded-lg bg-muted/20">
            <h3 className="text-lg font-semibold mb-4 text-center">{currentQuestion.text}</h3>
            <RadioGroup
              value={answers[currentQuestion.id]}
              onValueChange={(value) => handleValueChange(currentQuestion.id, value)}
              className="flex flex-col gap-4 items-center"
            >
              {currentQuestion.options.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
                  <Label htmlFor={`${currentQuestion.id}-${option.value}`} className="text-base cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            {currentQuestionIndex === 0 ? 'Back to Home' : 'Back'}
          </Button>
          <Button onClick={handleNext} disabled={!isCurrentQuestionAnswered}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish & See Results' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}