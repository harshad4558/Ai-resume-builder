import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

// Define the templates with more comprehensive metadata
const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with accent colors',
    recommendation: 'Great for tech and creative roles',
    popularity: 5,
    thumbnail: '/templates/modern.webp',
    features: ['Sleek header', 'Eye-catching accents', 'ATS-friendly']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional format with a polished look',
    recommendation: 'Perfect for corporate positions',
    popularity: 4,
    thumbnail: '../templates/professional.png',
    features: ['Classic layout', 'Conservative styling', 'Easy to scan']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design with unique visual elements',
    recommendation: 'Ideal for design and marketing roles',
    popularity: 4,
    thumbnail: '/templates/creative.webp',
    features: ['Visual highlights', 'Distinctive layout', 'Memorable design']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and clean with excellent readability',
    recommendation: 'Works well for all industries',
    popularity: 5,
    thumbnail: '/templates/minimal.png',
    features: ['Maximum content space', 'Distraction-free', 'Highly readable']
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior professionals',
    recommendation: 'Perfect for leadership positions',
    popularity: 3,
    thumbnail: '/templates/executive.webp',
    features: ['Prestigious look', 'Achievement focused', 'Authority-building']
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Modern layout with technical skill emphasis',
    recommendation: 'Ideal for IT and developer roles',
    popularity: 4,
    thumbnail: '/templates/tech.webp',
    features: ['Skills visualization', 'Code-inspired elements', 'Tech-focused']
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Structured format for education and research',
    recommendation: 'Best for academic and research positions',
    popularity: 3,
    thumbnail: '/templates/academic.jpg',
    features: ['Publication section', 'Education focus', 'Research highlights']
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Formal design with professional appeal',
    recommendation: 'Suitable for traditional industries',
    popularity: 4,
    thumbnail: '/templates/corporate.png',
    features: ['Professional header', 'Traditional sections', 'Business-appropriate']
  }
];

export const ResumeTemplates = ({ selectedTemplate, setSelectedTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter templates based on selected category
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => {
        if (selectedCategory === 'popular') return template.popularity >= 4;
        if (selectedCategory === 'creative') return ['creative', 'modern'].includes(template.id);
        if (selectedCategory === 'professional') return ['professional', 'executive', 'corporate'].includes(template.id);
        return false;
      });

  return (
    <div className="space-y-6">
      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('all')}
        >
          All Templates
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'popular' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('popular')}
        >
          Popular
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'creative' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('creative')}
        >
          Creative
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'professional' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('professional')}
        >
          Professional
        </button>
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredTemplates.map((template) => (
          <div 
            key={template.id}
            className="flex flex-col overflow-hidden"
          >
            <div 
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                selectedTemplate === template.id 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <img 
                src={template.thumbnail || '/api/placeholder/200/280'} 
                alt={`${template.name} template`}
                className="w-full h-auto object-cover aspect-[3/4]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <h3 className="text-white font-medium">{template.name}</h3>
                <p className="text-white/80 text-xs">{template.description}</p>
              </div>
              
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
              
              {template.popularity === 5 && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} fill="white" />
                  <span>Top Pick</span>
                </div>
              )}
            </div>
            
            <div className="mt-2 text-center">
              <h4 className="font-medium text-gray-800 text-sm">{template.name}</h4>
              <div className="flex justify-center mt-1">
                {[...Array(template.popularity)].map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected template details */}
      {selectedTemplate && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4">
              <img 
                src={templates.find(t => t.id === selectedTemplate)?.thumbnail || '/api/placeholder/200/280'} 
                alt={`${selectedTemplate} template`}
                className="w-full h-auto rounded-md border-2 border-white shadow-md"
              />
            </div>
            <div className="md:w-3/4">
              <h3 className="text-lg font-semibold text-blue-700">
                {templates.find(t => t.id === selectedTemplate)?.name} Template
              </h3>
              <p className="text-gray-600 my-2">
                {templates.find(t => t.id === selectedTemplate)?.description}
              </p>
              <p className="text-blue-600 font-medium">
                {templates.find(t => t.id === selectedTemplate)?.recommendation}
              </p>
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Features:</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {templates.find(t => t.id === selectedTemplate)?.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};