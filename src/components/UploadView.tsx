import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Mic, 
  MicOff, 
  Loader2, 
  CheckCircle,
  FileAudio,
  FileImage
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadViewProps {
  onContentGenerated: (content: any) => void;
}

type UploadType = 'text' | 'file' | 'audio';

export function UploadView({ onContentGenerated }: UploadViewProps) {
  const [activeType, setActiveType] = useState<UploadType>('text');
  const [textContent, setTextContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(files);
  };

  const handleRecording = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);
        
        // Mock recording for demo
        setTimeout(() => {
          setIsRecording(false);
          setTextContent("This is transcribed content from your audio recording about machine learning algorithms...");
          toast({
            title: "Recording Complete",
            description: "Audio has been transcribed successfully!",
          });
        }, 3000);
      } catch (error) {
        toast({
          title: "Recording Error",
          description: "Unable to access microphone. Please check permissions.",
          variant: "destructive",
        });
      }
    } else {
      // Stop recording
      setIsRecording(false);
    }
  };

  const generateContent = async () => {
    if (!textContent && uploadedFiles.length === 0) {
      toast({
        title: "No Content",
        description: "Please add some text or upload a file first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate AI processing with progress
    const progressSteps = [
      { step: 20, message: "Analyzing content..." },
      { step: 40, message: "Extracting key concepts..." },
      { step: 60, message: "Generating flashcards..." },
      { step: 80, message: "Creating questions..." },
      { step: 100, message: "Finalizing content..." },
    ];

    for (const { step, message } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingProgress(step);
      toast({
        title: "Processing",
        description: message,
      });
    }

    // Mock generated content
    const mockContent = {
      flashcards: [
        {
          id: '1',
          question: 'What is machine learning?',
          answer: 'Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.',
          difficulty: 'medium' as const,
          category: 'AI Basics'
        },
        {
          id: '2',
          question: 'What are the main types of machine learning?',
          answer: 'The three main types are: Supervised Learning (with labeled data), Unsupervised Learning (finding patterns in unlabeled data), and Reinforcement Learning (learning through trial and error).',
          difficulty: 'easy' as const,
          category: 'ML Types'
        },
        {
          id: '3',
          question: 'What is overfitting in machine learning?',
          answer: 'Overfitting occurs when a model learns the training data too well, including noise and random fluctuations, leading to poor performance on new, unseen data.',
          difficulty: 'hard' as const,
          category: 'ML Concepts'
        }
      ],
      mcqs: [
        {
          id: '1',
          question: 'Which of the following is NOT a type of machine learning?',
          options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Directive Learning'],
          correct: 3,
          category: 'ML Types'
        }
      ],
      fibs: [
        {
          id: '1',
          sentence: 'Machine learning is a subset of _____ intelligence.',
          answer: 'artificial',
          category: 'AI Basics'
        }
      ]
    };

    onContentGenerated(mockContent);
    setIsProcessing(false);
    setProcessingProgress(0);

    toast({
      title: "Content Generated! 🎉",
      description: "Your study materials are ready. Check the flashcards tab!",
    });
  };

  const uploadTypes = [
    { id: 'text' as UploadType, label: 'Text Input', icon: FileText, description: 'Paste or type content' },
    { id: 'file' as UploadType, label: 'File Upload', icon: Upload, description: 'PDF, PPT, DOCX' },
    { id: 'audio' as UploadType, label: 'Voice Input', icon: Mic, description: 'Record or upload audio' },
  ];

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Upload Your Content
        </h2>
        <p className="text-muted-foreground">
          Add text, files, or audio to generate AI-powered study materials
        </p>
      </div>

      {/* Upload Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {uploadTypes.map((type) => {
          const Icon = type.icon;
          const isActive = activeType === type.id;
          
          return (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all duration-300 ${
                isActive 
                  ? 'glass-card border-primary shadow-glow' 
                  : 'glass-card border-white/20 hover:border-primary/50'
              }`}
              onClick={() => setActiveType(type.id)}
            >
              <CardContent className="p-6 text-center">
                <Icon className={`w-8 h-8 mx-auto mb-3 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <h3 className={`font-semibold mb-1 ${isActive ? 'text-primary' : ''}`}>
                  {type.label}
                </h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Input Area */}
      <Card className="glass-card border-white/20">
        <CardContent className="p-6">
          {activeType === 'text' && (
            <div className="space-y-4">
              <Textarea
                placeholder="Paste your content here... (notes, articles, textbook chapters, etc.)"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="min-h-[200px] glass-button border-white/20 resize-none"
              />
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{textContent.length} characters</span>
                <Badge variant="outline" className="glass-button">
                  Recommended: 500+ characters
                </Badge>
              </div>
            </div>
          )}

          {activeType === 'file' && (
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, PPT, PPTX, DOC, DOCX (Max 10MB)
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Uploaded Files:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <FileImage className="w-4 h-4 text-primary" />
                      <span className="flex-1 text-sm">{file.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {(file.size / 1024 / 1024).toFixed(1)}MB
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeType === 'audio' && (
            <div className="space-y-4">
              <div className="text-center p-8">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  isRecording ? 'bg-destructive animate-pulse' : 'bg-primary'
                }`}>
                  {isRecording ? (
                    <MicOff className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </div>
                
                <Button
                  onClick={handleRecording}
                  variant={isRecording ? "destructive" : "default"}
                  className={isRecording ? "" : "bg-gradient-primary hover:bg-gradient-secondary"}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-4 h-4 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
                
                <p className="text-sm text-muted-foreground mt-4">
                  {isRecording 
                    ? "Recording... Click stop when finished" 
                    : "Record your lecture, notes, or explanations"
                  }
                </p>
              </div>

              {textContent && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileAudio className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">Transcribed Content:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{textContent}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Progress */}
      {isProcessing && (
        <Card className="glass-card border-white/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="font-medium">Generating study materials...</span>
              </div>
              <Progress value={processingProgress} className="h-2" />
              <p className="text-center text-sm text-muted-foreground">
                {processingProgress}% complete
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generate Button */}
      <div className="text-center">
        <Button
          onClick={generateContent}
          disabled={isProcessing || (!textContent && uploadedFiles.length === 0)}
          size="lg"
          className="bg-gradient-primary hover:bg-gradient-secondary transition-all duration-300 shadow-glow"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Generate Study Materials
            </>
          )}
        </Button>
      </div>
    </div>
  );
}