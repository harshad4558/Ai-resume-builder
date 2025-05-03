// src/components/EducationForm.jsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Plus, Trash2 } from "lucide-react";

export function EducationForm({ education, updateEducation, onAIEnhance }) {
  const addEducation = () => {
    updateEducation([
      ...education,
      {
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        location: '',
        description: ''
      }
    ]);
  };

  const removeEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    updateEducation(updatedEducation);
  };

  const updateEducationItem = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    updateEducation(updatedEducation);
  };

  return (
    <div className="space-y-6">
      {education.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No education entries added yet.</p>
          <Button onClick={addEducation}>Add Education</Button>
        </div>
      ) : (
        education.map((edu, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between">
                <span>Education #{index + 1}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeEducation(index)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>School/University</Label>
                  <Input
                    value={edu.school}
                    onChange={(e) => updateEducationItem(index, 'school', e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducationItem(index, 'degree', e.target.value)}
                    placeholder="Bachelor's, Master's, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducationItem(index, 'field', e.target.value)}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    value={edu.startDate}
                    onChange={(e) => updateEducationItem(index, 'startDate', e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    value={edu.endDate}
                    onChange={(e) => updateEducationItem(index, 'endDate', e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={edu.location}
                    onChange={(e) => updateEducationItem(index, 'location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Additional Information</Label>
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
                  value={edu.description}
                  onChange={(e) => updateEducationItem(index, 'description', e.target.value)}
                  placeholder="Describe your achievements, courses, or other relevant information..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
      
      {education.length > 0 && (
        <Button onClick={addEducation} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Education
        </Button>
      )}
    </div>
  );
}