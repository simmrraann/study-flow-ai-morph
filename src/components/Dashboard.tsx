import { TrendingUp, Target, Flame, Calendar, Award, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface DashboardProps {
  stats: {
    totalSessions: number;
    streakDays: number;
    masteryPercentage: number;
    nextReview: string;
    studyMinutes: number;
    badges: string[];
  };
}

export function Dashboard({ stats }: DashboardProps) {
  const achievements = [
    { name: "Flashcard Champ", description: "100+ cards completed", earned: stats.badges.includes("flashcard_champ") },
    { name: "Streak Slayer", description: "5-day study streak", earned: stats.badges.includes("streak_slayer") },
    { name: "Mindmap Wizard", description: "10+ mindmaps created", earned: stats.badges.includes("mindmap_wizard") },
    { name: "Quiz Master", description: "50+ MCQs answered", earned: stats.badges.includes("quiz_master") },
  ];

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Welcome back, Scholar! 🎓
        </h2>
        <p className="text-muted-foreground">Track your learning journey and celebrate your progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Study Streak"
          value={`${stats.streakDays} days`}
          icon={Flame}
          color="text-orange-500"
          bgColor="bg-orange-500/10"
        />
        
        <StatCard
          title="Total Sessions"
          value={stats.totalSessions.toString()}
          icon={Target}
          color="text-blue-500"
          bgColor="bg-blue-500/10"
        />
        
        <StatCard
          title="Study Time"
          value={`${stats.studyMinutes}m`}
          icon={Clock}
          color="text-green-500"
          bgColor="bg-green-500/10"
        />
        
        <StatCard
          title="Mastery"
          value={`${stats.masteryPercentage}%`}
          icon={TrendingUp}
          color="text-purple-500"
          bgColor="bg-purple-500/10"
        />
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mastery Progress */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Mastery</span>
                <span className="font-medium">{stats.masteryPercentage}%</span>
              </div>
              <Progress value={stats.masteryPercentage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Flashcards Mastered</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>MCQs Accuracy</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Next Review */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Spaced Repetition
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-gradient-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Next Review</p>
              <p className="text-lg font-bold text-primary">{stats.nextReview}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Cards Due Today</span>
                <Badge variant="secondary">12 cards</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cards Due Tomorrow</span>
                <Badge variant="outline">8 cards</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">New Cards</span>
                <Badge variant="outline">5 cards</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  achievement.earned 
                    ? 'bg-gradient-primary/10 border-primary/30 shadow-glow' 
                    : 'bg-muted/50 border-muted-foreground/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.earned ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    🏆
                  </div>
                  <div>
                    <h4 className={`font-medium ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`}>
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  bgColor 
}: { 
  title: string; 
  value: string; 
  icon: any; 
  color: string; 
  bgColor: string; 
}) {
  return (
    <Card className="glass-card border-white/20 hover:shadow-glow transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}