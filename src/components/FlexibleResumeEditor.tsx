import React, { useState } from 'react';
import { FlexibleResume, ResumeSection, ResumeLayout, TitleStyle } from '../types/Resume';
import { SectionManager } from './SectionManager';
import { TemplateSelector } from './TemplateSelector';
import { SectionEditor } from './SectionEditor';

interface FlexibleResumeEditorProps {
  resume: FlexibleResume;
  onResumeChange: (resume: FlexibleResume) => void;
}

export const FlexibleResumeEditor: React.FC<FlexibleResumeEditorProps> = ({
  resume,
  onResumeChange,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSectionUpdate = (sectionId: string, updatedSection: ResumeSection) => {
    const updatedSections = resume.sections.map(section =>
      section.id === sectionId ? updatedSection : section
    );
    
    onResumeChange({
      ...resume,
      sections: updatedSections,
      metadata: {
        ...resume.metadata,
        lastModified: new Date().toISOString(),
      },
    });
  };

  const handleSectionDelete = (sectionId: string) => {
    const updatedSections = resume.sections.filter(section => section.id !== sectionId);
    onResumeChange({
      ...resume,
      sections: updatedSections,
      metadata: {
        ...resume.metadata,
        lastModified: new Date().toISOString(),
      },
    });
  };

  const handleSectionAdd = (newSection: ResumeSection) => {
    const maxOrder = Math.max(...resume.sections.map(s => s.order), 0);
    const sectionWithOrder = {
      ...newSection,
      order: maxOrder + 1,
    };
    
    onResumeChange({
      ...resume,
      sections: [...resume.sections, sectionWithOrder],
      metadata: {
        ...resume.metadata,
        lastModified: new Date().toISOString(),
      },
    });
  };

  const handleSectionReorder = (sectionId: string, newOrder: number) => {
    const updatedSections = resume.sections.map(section =>
      section.id === sectionId ? { ...section, order: newOrder } : section
    );
    
    // Normalize orders to ensure they are sequential
    const sortedSections = updatedSections.sort((a, b) => a.order - b.order);
    const normalizedSections = sortedSections.map((section, index) => ({
      ...section,
      order: index + 1,
    }));
    
    onResumeChange({
      ...resume,
      sections: normalizedSections,
      metadata: {
        ...resume.metadata,
        lastModified: new Date().toISOString(),
      },
    });
  };

  const handleSectionDragReorder = (draggedId: string, dropTargetId: string) => {
    const sortedSections = [...resume.sections].sort((a, b) => a.order - b.order);
    const draggedIndex = sortedSections.findIndex(s => s.id === draggedId);
    const dropIndex = sortedSections.findIndex(s => s.id === dropTargetId);
    
    if (draggedIndex !== -1 && dropIndex !== -1 && draggedIndex !== dropIndex) {
      // Create new array with reordered sections
      const newSections = [...sortedSections];
      const [draggedItem] = newSections.splice(draggedIndex, 1);
      newSections.splice(dropIndex, 0, draggedItem);
      
      // Update orders for all sections
      const reorderedSections = newSections.map((section, index) => ({
        ...section,
        order: index + 1,
      }));
      
      onResumeChange({
        ...resume,
        sections: reorderedSections,
        metadata: {
          ...resume.metadata,
          lastModified: new Date().toISOString(),
        },
      });
    }
  };

  const handleTemplateChange = (template: ResumeLayout) => {
    onResumeChange({
      ...resume,
      metadata: {
        ...resume.metadata,
        template,
        lastModified: new Date().toISOString(),
      },
    });
  };

  const handleTitleStyleChange = (titleStyle: TitleStyle) => {
    onResumeChange({
      ...resume,
      metadata: {
        ...resume.metadata,
        titleStyle,
        lastModified: new Date().toISOString(),
      },
    });
  };

  return (
    <div className="flexible-resume-editor">
      <div className="editor-header">
        <TemplateSelector
          currentTemplate={resume.metadata.template}
          currentTitleStyle={resume.metadata.titleStyle}
          onTemplateChange={handleTemplateChange}
          onTitleStyleChange={handleTitleStyleChange}
        />
      </div>

      <div className="editor-workspace">
        <div className="sections-sidebar">
          <SectionManager
            sections={resume.sections}
            onSectionAdd={handleSectionAdd}
            onSectionDelete={handleSectionDelete}
            onSectionReorder={handleSectionReorder}
            onSectionDragReorder={handleSectionDragReorder}
            onSectionSelect={setActiveSection}
            activeSection={activeSection}
          />
        </div>

        <div className="section-editor">
          {activeSection ? (
            <SectionEditor
              section={resume.sections.find(s => s.id === activeSection)!}
              onSectionUpdate={handleSectionUpdate}
              onClose={() => setActiveSection(null)}
            />
          ) : (
            <div className="no-section-selected">
              <h2>Select a section to edit</h2>
              <p>Choose a section from the sidebar to start editing your resume.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};