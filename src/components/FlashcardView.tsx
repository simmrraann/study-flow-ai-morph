import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle } from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface FlashcardViewProps {
  flashcards: Flashcard[];
  onAnswerFeedback: (cardId: string, correct: boolean) => void;
}

export function FlashcardView({ flashcards, onAnswerFeedback }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [answeredCards, setAnsweredCards] = useState<Set<string>>(new Set());

  if (flashcards.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto">
            <RotateCcw className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">No Flashcards Yet</h3>
          <p className="text-muted-foreground">Upload some content to generate flashcards!</p>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const isAnswered = answeredCards.has(currentCard.id);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleAnswerFeedback = (correct: boolean) => {
    onAnswerFeedback(currentCard.id, correct);
    setAnsweredCards(prev => new Set([...prev, currentCard.id]));
    
    // Auto advance to next card after a short delay
    setTimeout(() => {
      if (currentIndex < flashcards.length - 1) {
        handleNext();
      }
    }, 1000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Flashcards
          </h2>
          <p className="text-muted-foreground">
            Card {currentIndex + 1} of {flashcards.length}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="glass-button">
            {currentCard.category}
          </Badge>
          <Badge className={`text-white ${getDifficultyColor(currentCard.difficulty)}`}>
            {currentCard.difficulty}
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="relative h-96 perspective-1000">
        <div
          className={`flip-card w-full h-full cursor-pointer ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flip-card-inner">
            {/* Front */}
            <Card className="flip-card-front study-card">
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Question</h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  {currentCard.question}
                </p>
                <p className="text-sm text-white/70 mt-6">Click to reveal answer</p>
              </div>
            </Card>

            {/* Back */}
            <Card className="flip-card-back study-card">
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Answer</h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  {currentCard.answer}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Answer Feedback (shown when flipped and not answered) */}
      {isFlipped && !isAnswered && (
        <div className="flex items-center justify-center gap-4 animate-fade-in">
          <Button
            onClick={() => handleAnswerFeedback(false)}
            variant="outline"
            className="glass-button text-destructive border-destructive/30 hover:bg-destructive/10"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Incorrect
          </Button>
          
          <Button
            onClick={() => handleAnswerFeedback(true)}
            variant="outline"
            className="glass-button text-success border-success/30 hover:bg-success/10"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Correct
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          variant="outline"
          className="glass-button"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {flashcards.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-8' 
                  : index < currentIndex 
                    ? 'bg-success' 
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          variant="outline"
          className="glass-button"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 glass-card border-white/20 rounded-lg">
          <p className="text-2xl font-bold text-success">{answeredCards.size}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
        
        <div className="p-4 glass-card border-white/20 rounded-lg">
          <p className="text-2xl font-bold text-primary">{flashcards.length - answeredCards.size}</p>
          <p className="text-sm text-muted-foreground">Remaining</p>
        </div>
        
        <div className="p-4 glass-card border-white/20 rounded-lg">
          <p className="text-2xl font-bold text-warning">
            {flashcards.length > 0 ? Math.round((answeredCards.size / flashcards.length) * 100) : 0}%
          </p>
          <p className="text-sm text-muted-foreground">Progress</p>
        </div>
      </div>
    </div>
  );
}