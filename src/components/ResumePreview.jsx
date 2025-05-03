import React from 'react';

// A simple preview component - you would have multiple templates in a real app
export function ResumePreview({ data, template }) {
  return (
    <div className={`p-6 border rounded shadow ${template === 'modern' ? 'font-sans' : 'font-serif'}`}>
      {/* Header */}
      <header className={`mb-4 pb-4 border-b ${template === 'modern' ? 'border-blue-500' : 'border-gray-400'}`}>
        <h1 className={`text-2xl font-bold ${template === 'modern' ? 'text-blue-600' : 'text-gray-800'}`}>
          {data.personalInfo.name || "Your Name"}
        </h1>
        
        <div className="flex flex-wrap gap-2 text-sm mt-2">
          {data.personalInfo.email && (
            <div>{data.personalInfo.email}</div>
          )}
          {data.personalInfo.phone && (
            <div>• {data.personalInfo.phone}</div>
          )}
          {data.personalInfo.location && (
            <div>• {data.personalInfo.location}</div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 text-sm mt-1">
          {data.personalInfo.linkedIn && (
            <div>{data.personalInfo.linkedIn}</div>
          )}
          {data.personalInfo.website && (
            <div>• {data.personalInfo.website}</div>
          )}
        </div>
        
        {data.personalInfo.summary && (
          <div className="mt-4 text-sm">
            {data.personalInfo.summary}
          </div>
        )}
      </header>
      
      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-4">
          <h2 className={`text-lg font-semibold mb-2 ${template === 'modern' ? 'text-blue-600' : 'text-gray-800'}`}>
            Professional Experience
          </h2>
          
          <div className="space-y-3">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div className="font-medium">{exp.position}</div>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm">{exp.company}</div>
                  <div className="text-sm text-gray-600">{exp.location}</div>
                </div>
                <div className="text-sm mt-1">{exp.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-4">
          <h2 className={`text-lg font-semibold mb-2 ${template === 'modern' ? 'text-blue-600' : 'text-gray-800'}`}>
            Education
          </h2>
          
          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium">{edu.degree}</div>
                <div>{edu.school}, {edu.location}</div>
                <div className="text-gray-600">{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
          <h2 className={`text-lg font-semibold mb-2 ${template === 'modern' ? 'text-blue-600' : 'text-gray-800'}`}>
            Skills
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span 
                key={index}
                className={`px-2 py-1 rounded text-xs
                  ${template === 'modern' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-200 text-gray-800'
                  }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}