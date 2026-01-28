import React from 'react';

export interface ContentSectionData {
  title: string;
  text: string[];
}

interface ContentSectionProps {
  title: string;
  sections: ContentSectionData[];
}

export const ContentSection: React.FC<ContentSectionProps> = ({ title, sections }) => {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
        {title}
      </h3>

      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-3">
            
            <h4 className="text-lg font-bold text-gray-800">
              {section.title}
            </h4>

            <div className="text-sm text-gray-500 leading-relaxed flex flex-col gap-3 text-justify">
              {section.text.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};