import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, Check, Monitor, FileText, Save, Copy, CloudDownload, Award, Menu, X } from "lucide-react";

// Mock components for demonstration
const PersonalInfoForm = ({ data, updateData }) => (
  <div className="space-y-4">
    <input 
      className="w-full p-2 border rounded"
      placeholder="Full Name"
      value={data.name}
      onChange={(e) => updateData({...data, name: e.target.value})}
    />
    <input 
      className="w-full p-2 border rounded"
      placeholder="Email"
      value={data.email}
      onChange={(e) => updateData({...data, email: e.target.value})}
    />
    <input 
      className="w-full p-2 border rounded"
      placeholder="Phone"
      value={data.phone}
      onChange={(e) => updateData({...data, phone: e.target.value})}
    />
    <textarea 
      className="w-full p-2 border rounded"
      placeholder="Summary"
      value={data.summary}
      onChange={(e) => updateData({...data, summary: e.target.value})}
      rows={4}
    />
  </div>
);

const ExperienceForm = ({ experiences, updateExperiences }) => (
  <div className="space-y-4">
    <Button onClick={() => updateExperiences([...experiences, { title: '', company: '', startDate: '', endDate: '', description: '' }])}>
      Add Experience
    </Button>
    {experiences.map((exp, i) => (
      <div key={i} className="border p-4 rounded">
        <input className="w-full p-2 border rounded mb-2" placeholder="Job Title" value={exp.title} />
        <input className="w-full p-2 border rounded mb-2" placeholder="Company" value={exp.company} />
      </div>
    ))}
  </div>
);

const EducationForm = ({ education, updateEducation }) => (
  <div className="space-y-4">
    <Button onClick={() => updateEducation([...education, { degree: '', field: '', institution: '', graduationYear: '' }])}>
      Add Education
    </Button>
  </div>
);

const SkillsForm = ({ skills, updateSkills }) => (
  <div className="space-y-4">
    <input className="w-full p-2 border rounded" placeholder="Add skills (comma separated)" />
  </div>
);

const ResumeTemplates = ({ selectedTemplate, setSelectedTemplate }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {['modern', 'classic', 'minimal'].map(template => (
      <div 
        key={template}
        className={`border-2 p-4 rounded cursor-pointer ${selectedTemplate === template ? 'border-blue-500' : 'border-gray-200'}`}
        onClick={() => setSelectedTemplate(template)}
      >
        <div className="font-semibold capitalize">{template}</div>
      </div>
    ))}
  </div>
);

const ResumePreview = ({ data, template }) => (
  <div className="bg-white p-4 sm:p-6 rounded shadow-sm">
    <h2 className="text-xl sm:text-2xl font-bold mb-2">{data.personalInfo.name || 'Your Name'}</h2>
    <p className="text-xs sm:text-sm text-gray-600 mb-4">{data.personalInfo.email} | {data.personalInfo.phone}</p>
    <div className="mb-4">
      <h3 className="text-sm sm:text-base font-semibold mb-2">Summary</h3>
      <p className="text-xs sm:text-sm">{data.personalInfo.summary || 'Your professional summary...'}</p>
    </div>
  </div>
);

const AIAssistant = ({ resumeData }) => (
  <div className="space-y-4">
    <p className="text-sm text-gray-600">AI suggestions will appear here based on your resume content.</p>
    <Button className="w-full" variant="outline">Get AI Suggestions</Button>
  </div>
);

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
  const [showPreview, setShowPreview] = useState(false);
  
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

  useEffect(() => {
    let totalFields = 7;
    let filledFields = Object.values(resumeData.personalInfo).filter(val => val.trim() !== '').length;
    
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

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    }, 1000);
  };

  const handleDownloadDOCX = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    }, 1000);
  };

  const handleDownloadTXT = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    }, 1000);
  };

  const handleCopyToClipboard = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header - Responsive */}
        <header className="py-4 sm:py-6 lg:py-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
            AI-Powered Resume Builder
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">
            Create a professional resume in minutes with AI assistance
          </p>
          <div className="max-w-md mx-auto mb-4 sm:mb-8 px-4">
            <div className="flex justify-between mb-2 text-xs sm:text-sm">
              <span>Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </header>

        {/* Mobile Preview Toggle Button */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <Button 
            className="bg-green-600 hover:bg-green-700 rounded-full w-14 h-14 shadow-lg"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <X size={24} /> : <Monitor size={24} />}
          </Button>
        </div>

        {/* Main Content - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 pb-20 lg:pb-6">
          {/* Left Column - Form */}
          <div className={`lg:col-span-2 ${showPreview ? 'hidden lg:block' : 'block'}`}>
            <Card className="shadow-lg border-t-4 border-t-blue-500">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div>
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl text-blue-700">
                      Build Your Resume
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-blue-500">
                      Fill in your details or use AI to enhance sections
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 text-xs sm:text-sm w-fit">
                    Step {['personal', 'experience', 'education', 'skills', 'templates'].indexOf(currentTab) + 1} of 5
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:pt-6">
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  {/* Responsive Tabs - Scrollable on mobile */}
                  <TabsList className="grid grid-cols-5 mb-4 sm:mb-6 h-auto">
                    <TabsTrigger 
                      value="personal" 
                      className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2"
                    >
                      <span className="hidden sm:inline">Personal</span>
                      <span className="sm:hidden">Info</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="experience" 
                      className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2"
                    >
                      <span className="hidden sm:inline">Experience</span>
                      <span className="sm:hidden">Exp</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="education" 
                      className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2"
                    >
                      <span className="hidden sm:inline">Education</span>
                      <span className="sm:hidden">Edu</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="skills" 
                      className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2"
                    >
                      Skills
                    </TabsTrigger>
                    <TabsTrigger 
                      value="templates" 
                      className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2"
                    >
                      <span className="hidden sm:inline">Templates</span>
                      <span className="sm:hidden">Temp</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal">
                    <PersonalInfoForm 
                      data={resumeData.personalInfo} 
                      updateData={(data) => updateResumeData('personalInfo', data)}
                    />
                  </TabsContent>
                  
                  <TabsContent value="experience">
                    <ExperienceForm 
                      experiences={resumeData.experience}
                      updateExperiences={(data) => updateResumeData('experience', data)}
                    />
                  </TabsContent>
                  
                  <TabsContent value="education">
                    <EducationForm 
                      education={resumeData.education}
                      updateEducation={(data) => updateResumeData('education', data)}
                    />
                  </TabsContent>
                  
                  <TabsContent value="skills">
                    <SkillsForm 
                      skills={resumeData.skills}
                      updateSkills={(data) => updateResumeData('skills', data)}
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
              <CardFooter className="flex justify-between p-3 sm:p-4 lg:pt-6 border-t">
                <Button
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50 text-xs sm:text-sm px-3 sm:px-4"
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
                  className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm px-3 sm:px-4"
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

            {/* AI Assistant Card */}
            <Card className="mt-4 sm:mt-6 shadow-lg border-t-4 border-t-purple-500">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="mr-3 sm:mr-4 bg-purple-100 p-2 rounded-full">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg lg:text-xl text-purple-700">
                      AI Assistant
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-purple-500">
                      Get AI recommendations to improve your resume
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <AIAssistant resumeData={resumeData} updateResumeData={updateResumeData} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview (Desktop: Sticky, Mobile: Overlay) */}
          <div className={`${showPreview ? 'block' : 'hidden lg:block'} ${showPreview ? 'fixed inset-0 bg-white z-40 overflow-auto' : ''}`}>
            <Card className={`shadow-lg border-t-4 border-t-green-500 ${showPreview ? 'm-4' : 'lg:sticky lg:top-4'}`}>
              <CardHeader className="bg-gradient-to-r from-green-50 to-white p-4 sm:p-6">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base sm:text-lg lg:text-xl text-green-700">
                    Preview
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-100 text-green-700 text-xs sm:text-sm">
                    {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="text-xs sm:text-sm text-green-500">
                  See how your resume looks
                </CardDescription>
              </CardHeader>
              <CardContent 
                className="h-[400px] sm:h-[500px] overflow-auto bg-gray-50 rounded-md p-3 sm:p-4" 
                ref={resumeRef}
              >
                <ResumePreview 
                  data={resumeData} 
                  template={selectedTemplate}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-3 p-3 sm:p-4 lg:pt-6 border-t">
                {/* Download Dropdown */}
                <div className="relative w-full" ref={dropdownRef}>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2 text-sm sm:text-base" 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {isDownloading ? "Processing..." : "Download Resume"}
                    <CloudDownload size={18} />
                  </Button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full mt-2 left-0 right-0 sm:right-0 sm:left-auto sm:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <div className="px-4 py-2 text-xs sm:text-sm text-gray-700 font-medium border-b">
                          Choose Format
                        </div>
                        
                        <button
                          className="px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full text-left"
                          onClick={() => {
                            handleDownloadPDF();
                            setIsDropdownOpen(false);
                          }}
                        >
                          <FileText size={16} />
                          <span>PDF Document</span>
                        </button>
                        
                        <button
                          className="px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full text-left"
                          onClick={() => {
                            handleDownloadDOCX();
                            setIsDropdownOpen(false);
                          }}
                        >
                          <FileText size={16} />
                          <span>Word Document (DOCX)</span>
                        </button>
                        
                        <button
                          className="px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full text-left"
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
                          className="px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full text-left"
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
                  <div className="bg-green-100 text-green-700 p-3 rounded-md text-center text-xs sm:text-sm animate-pulse">
                    Resume successfully exported! Thank you for using our service.
                  </div>
                )}

                <div className="flex justify-between w-full text-xs sm:text-sm text-gray-500 pt-2">
                  <span className="flex items-center gap-1">
                    <Monitor size={14} />
                    <span className="hidden sm:inline">Preview Mode</span>
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

        {/* Footer - Responsive */}
        <footer className="mt-8 sm:mt-12 py-4 sm:py-6 border-t border-gray-200 text-center text-gray-500 text-xs sm:text-sm">
          <p className="px-4">Design & Developed By : Harshad Patil AI-Powered Resume Builder © 2025</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-2 px-4">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Contact Us</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Mainpage;
