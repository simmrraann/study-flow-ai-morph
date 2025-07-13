import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StudyMode } from "./Navigation";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: string;
  actionLabel?: string;
  onAction?: () => void;
  comingSoon?: boolean;
}

export function EmptyState({ 
  title, 
  description, 
  icon, 
  actionLabel, 
  onAction,
  comingSoon = false 
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="glass-card border-white/20 p-8 text-center max-w-md">
        <div className="space-y-4">
          <div className="text-6xl mb-4">{icon}</div>
          <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
          
          {comingSoon && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-primary/10 text-primary text-sm font-medium">
              🚀 Coming Soon
            </div>
          )}
          
          {actionLabel && onAction && (
            <Button 
              onClick={onAction}
              className="bg-gradient-primary hover:bg-gradient-secondary transition-all duration-300 mt-4"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}