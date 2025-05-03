import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wand2, Plus, X } from "lucide-react";

export function SkillsForm({ skills, updateSkills, onAIEnhance }) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() !== '') {
      updateSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    updateSkills(updatedSkills);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill (e.g., JavaScript, Project Management, etc.)"
          className="flex-1"
        />
        <Button onClick={addSkill} disabled={!newSkill.trim()}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onAIEnhance}
          className="flex items-center gap-1"
          disabled={skills.length === 0}
        >
          <Wand2 className="h-4 w-4" />
          Suggest Skills Based on My Experience
        </Button>
      </div>
      
      {skills.length > 0 ? (
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">Your Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
              >
                <span className="text-sm">{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-gray-500">No skills added yet. Add skills above or use AI to suggest skills.</p>
        </div>
      )}
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Tips for Skills Section</h3>
        <ul className="text-sm space-y-1 list-disc pl-5">
          <li>Include both technical and soft skills</li>
          <li>Prioritize skills mentioned in the job description</li>
          <li>Be specific (e.g., "React.js" instead of just "JavaScript")</li>
          <li>Include relevant tools and software you're proficient with</li>
        </ul>
      </div>
    </div>
  );
}