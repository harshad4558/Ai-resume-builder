import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ResumePreview } from './ResumePreview';
import { AIAssistant } from './AIAssistant';
import { ResumeTemplates } from './ResumeTemplates';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Download, Check, Monitor, FileText, Save, Copy, CloudDownload, Award } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

function Mainpage() {
  const resumeRef = useRef();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  });

  const [currentTab, setCurrentTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Handle closing dropdown when clicking outside
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Calculate completion percentage based on filled fields
  useEffect(() => {
    let totalFields = 7; // Personal info fields
    let filledFields = Object.values(resumeData.personalInfo).filter(val => val.trim() !== '').length;
    
    // Add experience, education and skills
    totalFields += resumeData.experience.length > 0 ? 1 : 0;
    totalFields += resumeData.education.length > 0 ? 1 : 0;
    totalFields += resumeData.skills.length > 0 ? 1 : 0;
    
    filledFields += resumeData.experience.length > 0 ? 1 : 0;
    filledFields += resumeData.education.length > 0 ? 1 : 0;
    filledFields += resumeData.skills.length > 0 ? 1 : 0;
    
    const percentage = Math.round((filledFields / totalFields) * 100);
    setCompletionPercentage(percentage);
  }, [resumeData]);

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleAIEnhance = (section, field) => {
    // This would connect to an AI API to enhance the content
    console.log(`Enhancing ${field} in ${section}`);
    // For demonstration, we'll just add a placeholder improvement
    if (section === 'personalInfo' && field === 'summary') {
      const enhancedSummary = `Experienced professional with a track record of ${resumeData.personalInfo.summary}`;
      setResumeData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          summary: enhancedSummary
        }
      }));
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const element = resumeRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);
    pdf.save("resume.pdf");
    setIsDownloading(false);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const handleDownloadDOCX = () => {
    setIsDownloading(true);
    // This would use a library like docx.js to generate a DOCX file
    // For now, we'll just simulate the download
    setTimeout(() => {
      setIsDownloading(false);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
      console.log("Downloading DOCX");
    }, 1000);
  };

  const handleDownloadTXT = () => {
    setIsDownloading(true);
    // Generate plain text version
    const text = `
${resumeData.personalInfo.name}
${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}
${resumeData.personalInfo.linkedIn ? resumeData.personalInfo.linkedIn + ' | ' : ''}${resumeData.personalInfo.website ? resumeData.personalInfo.website : ''}

SUMMARY
${resumeData.personalInfo.summary}

EXPERIENCE
${resumeData.experience.map(exp => `${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate})
${exp.description}`).join('\n\n')}

EDUCATION
${resumeData.education.map(edu => `${edu.degree} in ${edu.field} from ${edu.institution} (${edu.graduationYear})`).join('\n')}

SKILLS
${resumeData.skills.join(', ')}
    `;
    
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setIsDownloading(false);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const handleCopyToClipboard = async () => {
    setIsDownloading(true);
    const element = resumeRef.current;
    const canvas = await html2canvas(element);
    
    canvas.toBlob(function(blob) {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]);
      setIsDownloading(false);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto p-4">
        <header className="py-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">AI-Powered Resume Builder</h1>
          <p className="text-gray-600 mb-4">Create a professional resume in minutes with AI assistance</p>
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between mb-2 text-sm">
              <span>Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-t-4 border-t-blue-500">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-blue-700">Build Your Resume</CardTitle>
                    <CardDescription className="text-blue-500">
                      Fill in your details or use AI to enhance sections
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 px-3 py-1">
                    Step {['personal', 'experience', 'education', 'skills', 'templates'].indexOf(currentTab) + 1} of 5
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="grid grid-cols-5 mb-6">
                    <TabsTrigger value="personal" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                      Personal
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                      Experience
                    </TabsTrigger>
                    <TabsTrigger value="education" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                      Education
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                      Skills
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                      Templates
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal">
                    <PersonalInfoForm 
                      data={resumeData.personalInfo} 
                      updateData={(data) => updateResumeData('personalInfo', data)}
                      onAIEnhance={(field) => handleAIEnhance('personalInfo', field)}
                    />
                  </TabsContent>
                  
                  <TabsContent value="experience">
                    <ExperienceForm 
                      experiences={resumeData.experience}
                      updateExperiences={(data) => updateResumeData('experience', data)}
                      onAIEnhance={(index, field) => handleAIEnhance('experience', { index, field })}
                    />
                  </TabsContent>
                  
                  <TabsContent value="education">
                    <EducationForm 
                      education={resumeData.education}
                      updateEducation={(data) => updateResumeData('education', data)}
                      onAIEnhance={(index, field) => handleAIEnhance('education', { index, field })}
                    />
                  </TabsContent>
                  
                  <TabsContent value="skills">
                    <SkillsForm 
                      skills={resumeData.skills}
                      updateSkills={(data) => updateResumeData('skills', data)}
                      onAIEnhance={() => handleAIEnhance('skills')}
                    />
                  </TabsContent>
                  
                  <TabsContent value="templates">
                    <ResumeTemplates 
                      selectedTemplate={selectedTemplate}
                      setSelectedTemplate={setSelectedTemplate}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50"
                  onClick={() => {
                    const prevTabIndex = ['personal', 'experience', 'education', 'skills', 'templates'].indexOf(currentTab);
                    if (prevTabIndex > 0) {
                      setCurrentTab(['personal', 'experience', 'education', 'skills', 'templates'][prevTabIndex - 1]);
                    }
                  }}
                  disabled={currentTab === 'personal'}
                >
                  Previous
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    const nextTabIndex = ['personal', 'experience', 'education', 'skills', 'templates'].indexOf(currentTab);
                    if (nextTabIndex < 4) {
                      setCurrentTab(['personal', 'experience', 'education', 'skills', 'templates'][nextTabIndex + 1]);
                    }
                  }}
                  disabled={currentTab === 'templates'}
                >
                  Next
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6 shadow-lg border-t-4 border-t-purple-500">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white">
                <div className="flex items-center">
                  <div className="mr-4 bg-purple-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-700">AI Assistant</CardTitle>
                    <CardDescription className="text-purple-500">
                      Get AI recommendations to improve your resume
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AIAssistant resumeData={resumeData} updateResumeData={updateResumeData} />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-4 shadow-lg border-t-4 border-t-green-500">
              <CardHeader className="bg-gradient-to-r from-green-50 to-white">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-green-700">Preview</CardTitle>
                  <Badge variant="outline" className="bg-green-100 text-green-700">
                    {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Template
                  </Badge>
                </div>
                <CardDescription className="text-green-500">
                  See how your resume looks
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] overflow-auto bg-gray-50 rounded-md p-4" ref={resumeRef}>
                <ResumePreview 
                  data={resumeData} 
                  template={selectedTemplate}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-3 pt-6 border-t">
                {/* Custom dropdown implementation */}
                <div className="relative" ref={dropdownRef}>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2" 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {isDownloading ? "Processing..." : "Download Resume"}
                    <CloudDownload size={18} />
                  </Button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full mt-2 right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">Choose Format</div>
                        
                        <button
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full text-left"
                          onClick={() => {
                            handleDownloadPDF();
                            setIsDropdownOpen(false);
                          }}
                        >
                          <FileText size={16} />
                          <span>PDF Document</span>
                        </button>
                        
                        <button
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full text-left"
                          onClick={() => {
                            handleDownloadDOCX();
                            setIsDropdownOpen(false);
                          }}
                        >
                          <FileText size={16} />
                          <span>Word Document (DOCX)</span>
                        </button>
                        
                        <button
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full text-left"
                          onClick={() => {
                            handleDownloadTXT();
                            setIsDropdownOpen(false);
                          }}
                        >
                          <FileText size={16} />
                          <span>Plain Text (TXT)</span>
                        </button>
                        
                        <div className="border-t my-1"></div>
                        
                        <button
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full text-left"
                          onClick={() => {
                            handleCopyToClipboard();
                            setIsDropdownOpen(false);
                          }}
                        >
                          <Copy size={16} />
                          <span>Copy to Clipboard</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {showThankYou && (
                  <div className="bg-green-100 text-green-700 p-3 rounded-md text-center text-sm animate-pulse">
                    Resume successfully exported! Thank you for using our service.
                  </div>
                )}

                <div className="flex justify-between w-full text-sm text-gray-500 pt-2">
                  <span className="flex items-center gap-1">
                    <Monitor size={14} />
                    <span>Preview Mode</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Save size={14} />
                    <span>Auto-saved</span>
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <footer className="mt-12 py-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Design & Developed By : Harshad Patil AI-Powered Resume Builder © 2025</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Mainpage;