import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, Send } from "lucide-react";

export function AIAssistant({ resumeData, updateResumeData }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAIAssist = () => {
    setIsLoading(true);
  
    setTimeout(() => {
      setResponse({
        message: "Based on your experience, I've identified these strengths that you could highlight more prominently: project management, team leadership, and data analysis. Would you like me to enhance any specific section with these skills?",
        suggestions: [
          "Add quantifiable achievements to your most recent role",
          "Highlight your technical skills more prominently",
          "Expand your professional summary to mention leadership abilities"
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI for help with your resume. E.g., 'Make my experience bullets more impactful' or 'Suggest skills based on my background'"
          className="flex-1"
        />
        <Button 
          onClick={handleAIAssist} 
          disabled={!prompt.trim() || isLoading}
          className="h-full"
        >
          {isLoading ? "Processing..." : <Send className="h-4 w-4" />}
        </Button>
      </div>
      
      {response && (
        <Card className="bg-blue-50">
          <CardContent className="pt-4">
            <div className="flex gap-2 mb-2">
              <BrainCircuit className="h-5 w-5 text-blue-600" />
              <p className="font-medium">AI Assistant</p>
            </div>
            <p className="mb-3">{response.message}</p>
            {response.suggestions.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium">Suggestions:</p>
                <ul className="space-y-1">
                  {response.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-6"
                      >
                        Apply
                      </Button>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
