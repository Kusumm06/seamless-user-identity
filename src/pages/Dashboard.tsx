
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Image, Video, MessageSquare, Shield, LogOut, History, Download, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    isReal: boolean;
    confidence: number;
    explanation: string;
  } | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} is ready for analysis`,
      });
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile && !textInput.trim()) {
      toast({
        variant: "destructive",
        title: "No content to analyze",
        description: "Please upload a file or enter text content.",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        isReal: Math.random() > 0.5,
        confidence: Math.round(Math.random() * 40 + 60), // 60-100%
        explanation: "Analysis based on pixel-level inconsistencies, metadata examination, and deep learning pattern recognition."
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: `Content detected as ${mockResult.isReal ? 'Real' : 'Fake'} with ${mockResult.confidence}% confidence`,
      });
    }, 3000);
  };

  const generateReport = () => {
    toast({
      title: "Report generated",
      description: "PDF report is being prepared for download",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">TruthCheck</span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.user_metadata?.name || user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <Button
                variant={activeTab === 'upload' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('upload')}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload & Analyze
              </Button>
              <Button
                variant={activeTab === 'history' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('history')}
              >
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'upload' && (
              <div className="space-y-6">
                {/* Upload Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Upload className="h-5 w-5 mr-2" />
                      Content Analysis
                    </CardTitle>
                    <CardDescription>
                      Upload images, videos, or enter text to detect fake content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="image" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="image" className="flex items-center">
                          <Image className="h-4 w-4 mr-2" />
                          Image
                        </TabsTrigger>
                        <TabsTrigger value="video" className="flex items-center">
                          <Video className="h-4 w-4 mr-2" />
                          Video
                        </TabsTrigger>
                        <TabsTrigger value="text" className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Text
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="image" className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <Label htmlFor="image-upload" className="cursor-pointer">
                            <span className="text-lg font-medium text-gray-900">
                              Drop your image here or click to browse
                            </span>
                            <p className="text-sm text-gray-500 mt-2">
                              Supports JPG, PNG, GIF up to 10MB
                            </p>
                          </Label>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="video" className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                          <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <Label htmlFor="video-upload" className="cursor-pointer">
                            <span className="text-lg font-medium text-gray-900">
                              Drop your video here or click to browse
                            </span>
                            <p className="text-sm text-gray-500 mt-2">
                              Supports MP4, AVI, MOV up to 100MB
                            </p>
                          </Label>
                          <Input
                            id="video-upload"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="text" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="text-input">Enter text content to analyze</Label>
                          <textarea
                            id="text-input"
                            className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Paste the text content you want to analyze for potential misinformation..."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>

                    {uploadedFile && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>File ready:</strong> {uploadedFile.name}
                        </p>
                      </div>
                    )}

                    <Button 
                      onClick={handleAnalyze} 
                      disabled={isAnalyzing}
                      className="w-full mt-6"
                      size="lg"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analyze Content
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Results Section */}
                {result && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {result.isReal ? (
                          <div className="flex items-center text-green-600">
                            <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                            Content appears to be REAL
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                            Content appears to be FAKE
                          </div>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Confidence Score</span>
                          <span className="text-sm font-medium">{result.confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-1000 ${
                              result.confidence > 80 ? 'bg-green-500' :
                              result.confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${result.confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Analysis Explanation</h4>
                        <p className="text-gray-600 text-sm">{result.explanation}</p>
                      </div>

                      <Button onClick={generateReport} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generate & Download Report
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <Card>
                <CardHeader>
                  <CardTitle>Analysis History</CardTitle>
                  <CardDescription>
                    Your past content analysis results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No analysis history yet</p>
                    <p className="text-sm text-gray-400">
                      Start analyzing content to see your history here
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
