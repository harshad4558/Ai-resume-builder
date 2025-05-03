import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Plus, Trash2 } from "lucide-react";

export function ExperienceForm({ experiences, updateExperiences, onAIEnhance }) {
  const addExperience = () => {
    updateExperiences([
      ...experiences,
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        location: '',
        description: ''
      }
    ]);
  };

  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    updateExperiences(updatedExperiences);
  };

  const updateExperience = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    updateExperiences(updatedExperiences);
  };

  return (
    <div className="space-y-6">
      {experiences.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No work experiences added yet.</p>
          <Button onClick={addExperience}>Add Work Experience</Button>
        </div>
      ) : (
        experiences.map((experience, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between">
                <span>Work Experience #{index + 1}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeExperience(index)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    value={experience.position}
                    onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    value={experience.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    value={experience.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={experience.location}
                    onChange={(e) => updateExperience(index, 'location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Description</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onAIEnhance(index, 'description')}
                    className="flex items-center gap-1"
                  >
                    <Wand2 className="h-4 w-4" />
                    Enhance with AI
                  </Button>
                </div>
                <Textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
      
      {experiences.length > 0 && (
        <Button onClick={addExperience} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Experience
        </Button>
      )}
    </div>
  );
}