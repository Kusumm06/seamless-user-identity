
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, X, HelpCircle } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you with TruthCheck. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const faqQuestions = [
    "How does this detection work?",
    "Can I use this report in legal cases?",
    "What file types are supported?",
    "How accurate is the detection?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I understand your question. Let me help you with that.";
      
      if (inputMessage.toLowerCase().includes('detection') || inputMessage.toLowerCase().includes('work')) {
        botResponse = "Our detection system uses advanced AI algorithms that analyze pixel-level inconsistencies, metadata patterns, and deep learning models trained on millions of samples to identify fake content with high accuracy.";
      } else if (inputMessage.toLowerCase().includes('legal') || inputMessage.toLowerCase().includes('court')) {
        botResponse = "Yes, our detailed reports include technical analysis and confidence scores that can be used as supporting evidence. However, we recommend consulting with legal experts for specific legal proceedings.";
      } else if (inputMessage.toLowerCase().includes('file') || inputMessage.toLowerCase().includes('format')) {
        botResponse = "We support JPG, PNG, GIF for images (up to 10MB), MP4, AVI, MOV for videos (up to 100MB), and plain text content for analysis.";
      } else if (inputMessage.toLowerCase().includes('accurate') || inputMessage.toLowerCase().includes('accuracy')) {
        botResponse = "Our AI models achieve over 95% accuracy in controlled tests. However, results may vary depending on content quality and manipulation sophistication.";
      }

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleFaqClick = (question: string) => {
    setInputMessage(question);
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 transition-transform hover:scale-110 ${
          isOpen ? 'hidden' : 'flex'
        }`}
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-lg font-semibold flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              TruthCheck Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Quick Actions */}
            <div className="p-4 border-t bg-gray-50">
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-2 flex items-center">
                  <HelpCircle className="h-3 w-3 mr-1" />
                  Quick questions:
                </p>
                <div className="grid grid-cols-1 gap-1">
                  {faqQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="justify-start text-xs h-6 px-2 text-blue-600 hover:bg-blue-50"
                      onClick={() => handleFaqClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="text-sm"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
