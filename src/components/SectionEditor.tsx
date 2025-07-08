import React from 'react';
import { ResumeSection } from '../types/Resume';
import { ContactSectionEditor } from './sections/ContactSectionEditor';
import { SummarySectionEditor } from './sections/SummarySectionEditor';
import { ExperienceSectionEditor } from './sections/ExperienceSectionEditor';
import { EducationSectionEditor } from './sections/EducationSectionEditor';
import { SkillsSectionEditor } from './sections/SkillsSectionEditor';
import { ProjectsSectionEditor } from './sections/ProjectsSectionEditor';
import { CertificationsSectionEditor } from './sections/CertificationsSectionEditor';

interface SectionEditorProps {
  section: ResumeSection;
  onSectionUpdate: (sectionId: string, section: ResumeSection) => void;
  onClose: () => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  onSectionUpdate,
  onClose,
}) => {
  const handleSectionChange = (updatedSection: ResumeSection) => {
    onSectionUpdate(section.id, updatedSection);
  };

  const renderSectionEditor = () => {
    switch (section.type) {
      case 'contact':
        return (
          <ContactSectionEditor
            section={section}
            onChange={handleSectionChange}
          />
        );
      case 'summary':
        return (
          <SummarySectionEditor
            section={section}
            onChange={handleSectionChange}
          />
        );
      case 'experience':
        return (
          <ExperienceSectionEditor
            section={section}
            onChange={handleSectionChange}
          />
        );
      case 'education':
        return (
          <EducationSectionEditor
            section={section}
            onChange={handleSectionChange}
          />
        );
      case 'skills':
        return (
          <SkillsSectionEditor
            section={section}
            onChange={handleSectionChange}
          />
        );
      case 'projects':
        return (
          <ProjectsSectionEditor
            section={section}
            onChange={handleSectionChange}
          />
        );
      case 'certifications':
        return (
          <CertificationsSectionEditor
            section={section}
            onChange={handleSectionChange}
          />
        );
      default:
        return (
          <div className="unsupported-section">
            <h3>Unsupported Section Type</h3>
            <p>Editor for {section.type} sections is not yet implemented.</p>
          </div>
        );
    }
  };

  return (
    <div className="section-editor">
      <div className="section-editor-header">
        <h2>Edit {section.title}</h2>
        <div className="section-controls">
          <label className="section-toggle">
            <input
              type="checkbox"
              checked={section.enabled}
              onChange={(e) =>
                handleSectionChange({
                  ...section,
                  enabled: e.target.checked,
                })
              }
            />
            <span>Enabled</span>
          </label>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>

      <div className="section-title-editor">
        <div className="form-group">
          <label>Section Title:</label>
          <input
            type="text"
            value={section.title}
            onChange={(e) =>
              handleSectionChange({
                ...section,
                title: e.target.value,
              })
            }
            placeholder="Enter section title"
          />
        </div>
      </div>

      <div className="section-content">
        {renderSectionEditor()}
      </div>
    </div>
  );
};