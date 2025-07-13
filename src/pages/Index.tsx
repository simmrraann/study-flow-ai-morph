import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Navigation, StudyMode } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { UploadView } from "@/components/UploadView";
import { FlashcardView } from "@/components/FlashcardView";
import { EmptyState } from "@/components/EmptyState";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeMode, setActiveMode] = useState<StudyMode>('upload');
  const [usageCount, setUsageCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({
    flashcards: [],
    mcqs: [],
    fibs: [],
    flowcharts: 0,
    mindmaps: 0,
  });

  const { toast } = useToast();
  const maxFreeUsage = 3;

  // Check authentication status on mount
  useEffect(() => {
    const authData = localStorage.getItem('mindmorph_auth');
    const usage = localStorage.getItem('mindmorph_usage');
    
    if (authData) {
      setIsAuthenticated(true);
    }
    
    if (usage) {
      setUsageCount(parseInt(usage));
    }
  }, []);

  const handleModeChange = (mode: StudyMode) => {
    // Check usage limits for non-authenticated users
    if (!isAuthenticated && usageCount >= maxFreeUsage) {
      toast({
        title: "Usage Limit Reached",
        description: "Sign up to continue using MindMorph!",
        variant: "destructive",
      });
      return;
    }
    
    setActiveMode(mode);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    toast({
      title: "Welcome to MindMorph! 🎉",
      description: "You now have unlimited access to all features.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('mindmorph_auth');
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "Come back soon!",
    });
  };

  const handleContentGenerated = (content: any) => {
    // Increment usage count for non-authenticated users
    if (!isAuthenticated) {
      const newUsageCount = usageCount + 1;
      setUsageCount(newUsageCount);
      localStorage.setItem('mindmorph_usage', newUsageCount.toString());
    }

    setGeneratedContent({
      flashcards: content.flashcards || [],
      mcqs: content.mcqs || [],
      fibs: content.fibs || [],
      flowcharts: generatedContent.flowcharts + (content.flowcharts ? 1 : 0),
      mindmaps: generatedContent.mindmaps + (content.mindmaps ? 1 : 0),
    });

    // Auto-switch to flashcards if they were generated
    if (content.flashcards && content.flashcards.length > 0) {
      setActiveMode('flashcards');
    }
  };

  const handleAnswerFeedback = (cardId: string, correct: boolean) => {
    // Here you would typically save the feedback to track learning progress
    console.log(`Card ${cardId} answered ${correct ? 'correctly' : 'incorrectly'}`);
  };

  const mockStats = {
    totalSessions: 12,
    streakDays: 5,
    masteryPercentage: 78,
    nextReview: "Tomorrow at 2:00 PM",
    studyMinutes: 145,
    badges: ["flashcard_champ", "streak_slayer"],
  };

  const contentCounts = {
    flashcards: generatedContent.flashcards.length,
    mcqs: generatedContent.mcqs.length,
    fibs: generatedContent.fibs.length,
    flowcharts: generatedContent.flowcharts,
    mindmaps: generatedContent.mindmaps,
  };

  const renderActiveView = () => {
    switch (activeMode) {
      case 'upload':
        return <UploadView onContentGenerated={handleContentGenerated} />;
      
      case 'flashcards':
        if (generatedContent.flashcards.length === 0) {
          return (
            <EmptyState
              title="No Flashcards Yet"
              description="Upload some content first to generate beautiful 3D flashcards that will help you master any topic!"
              icon="🎯"
              actionLabel="Go to Upload"
              onAction={() => setActiveMode('upload')}
            />
          );
        }
        return (
          <FlashcardView 
            flashcards={generatedContent.flashcards} 
            onAnswerFeedback={handleAnswerFeedback}
          />
        );
      
      case 'dashboard':
        return <Dashboard stats={mockStats} />;
      
      case 'mcqs':
        return (
          <EmptyState
            title="MCQs"
            description="Interactive multiple choice questions will help test your knowledge with immediate feedback and explanations."
            icon="🧠"
            comingSoon={true}
          />
        );
      
      case 'fibs':
        return (
          <EmptyState
            title="Fill in the Blanks"
            description="Interactive exercises where you complete sentences and paragraphs to reinforce key concepts and terminology."
            icon="✏️"
            comingSoon={true}
          />
        );
      
      case 'flowcharts':
        return (
          <EmptyState
            title="Flowcharts"
            description="Visual process diagrams that break down complex topics into easy-to-follow step-by-step flows."
            icon="📊"
            comingSoon={true}
          />
        );
      
      case 'mindmaps':
        return (
          <EmptyState
            title="Mindmaps"
            description="Beautiful, colorful mind maps that visually organize concepts and show relationships between ideas."
            icon="🗺️"
            comingSoon={true}
          />
        );
      
      default:
        return <UploadView onContentGenerated={handleContentGenerated} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Header
        usageCount={usageCount}
        maxFreeUsage={maxFreeUsage}
        isAuthenticated={isAuthenticated}
        onAuthSuccess={handleAuthSuccess}
        onLogout={handleLogout}
      />
      
      <Navigation
        activeMode={activeMode}
        onModeChange={handleModeChange}
        generatedContent={contentCounts}
      />
      
      <main className="min-h-[calc(100vh-200px)]">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default Index;
