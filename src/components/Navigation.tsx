import { 
  CreditCard, 
  FileText, 
  HelpCircle, 
  GitBranch, 
  Brain,
  BarChart3,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type StudyMode = 'upload' | 'flashcards' | 'mcqs' | 'fibs' | 'flowcharts' | 'mindmaps' | 'dashboard';

interface NavigationProps {
  activeMode: StudyMode;
  onModeChange: (mode: StudyMode) => void;
  generatedContent: {
    flashcards: number;
    mcqs: number;
    fibs: number;
    flowcharts: number;
    mindmaps: number;
  };
}

export function Navigation({ activeMode, onModeChange, generatedContent }: NavigationProps) {
  const navItems = [
    { 
      id: 'upload' as StudyMode, 
      label: 'Upload', 
      icon: Upload, 
      badge: null,
      description: 'Add content'
    },
    { 
      id: 'flashcards' as StudyMode, 
      label: 'Flashcards', 
      icon: CreditCard, 
      badge: generatedContent.flashcards,
      description: '3D flip cards'
    },
    { 
      id: 'mcqs' as StudyMode, 
      label: 'MCQs', 
      icon: HelpCircle, 
      badge: generatedContent.mcqs,
      description: 'Multiple choice'
    },
    { 
      id: 'fibs' as StudyMode, 
      label: 'Fill Blanks', 
      icon: FileText, 
      badge: generatedContent.fibs,
      description: 'Complete sentences'
    },
    { 
      id: 'flowcharts' as StudyMode, 
      label: 'Flowcharts', 
      icon: GitBranch, 
      badge: generatedContent.flowcharts,
      description: 'Process flows'
    },
    { 
      id: 'mindmaps' as StudyMode, 
      label: 'Mindmaps', 
      icon: Brain, 
      badge: generatedContent.mindmaps,
      description: 'Visual concepts'
    },
    { 
      id: 'dashboard' as StudyMode, 
      label: 'Dashboard', 
      icon: BarChart3, 
      badge: null,
      description: 'Progress & stats'
    },
  ];

  return (
    <nav className="glass-card border-0 border-b border-white/20 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMode === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => onModeChange(item.id)}
                className={`
                  relative flex-shrink-0 h-auto px-4 py-3 flex flex-col items-center gap-1 min-w-[80px]
                  ${isActive 
                    ? 'bg-gradient-primary text-white shadow-glow' 
                    : 'glass-button hover:bg-white/20'
                  }
                  transition-all duration-300 hover:scale-105
                `}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge !== null && item.badge > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-accent text-white"
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
                <span className="text-[10px] opacity-70">{item.description}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}