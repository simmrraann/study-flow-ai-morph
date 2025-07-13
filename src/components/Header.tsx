import { useState } from "react";
import { Brain, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthModal } from "./AuthModal";

interface HeaderProps {
  usageCount: number;
  maxFreeUsage: number;
  isAuthenticated: boolean;
  onAuthSuccess: () => void;
  onLogout: () => void;
}

export function Header({ 
  usageCount, 
  maxFreeUsage, 
  isAuthenticated, 
  onAuthSuccess,
  onLogout 
}: HeaderProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <header className="glass-card border-0 border-b border-white/20 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MindMorph
              </h1>
              <p className="text-xs text-muted-foreground">AI Study Assistant</p>
            </div>
          </div>

          {/* Usage Badge & Auth */}
          <div className="flex items-center gap-4">
            {!isAuthenticated && (
              <Badge variant="outline" className="glass-button">
                {usageCount}/{maxFreeUsage} free uses
              </Badge>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="glass-button">
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card">
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-primary hover:bg-gradient-secondary transition-all duration-300"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={onAuthSuccess}
      />
    </>
  );
}