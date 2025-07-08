import React, { useState } from 'react';
import { ResumeLayout, TitleStyle } from '../types/Resume';

interface TemplateSelectorProps {
  currentTemplate: ResumeLayout;
  currentTitleStyle: TitleStyle;
  onTemplateChange: (template: ResumeLayout) => void;
  onTitleStyleChange: (titleStyle: TitleStyle) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  currentTitleStyle,
  onTemplateChange,
  onTitleStyleChange,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const templates: { value: ResumeLayout; label: string; description: string }[] = [
    {
      value: 'traditional',
      label: 'Traditional',
      description: 'Classic top-to-bottom layout suitable for most industries',
    },
    {
      value: 'modern',
      label: 'Modern',
      description: 'Contemporary two-column design with sidebar',
    },
    {
      value: 'technical',
      label: 'Technical',
      description: 'Emphasizes technical skills and project experience',
    },
    {
      value: 'executive',
      label: 'Executive',
      description: 'Professional layout for senior leadership positions',
    },
    {
      value: 'creative',
      label: 'Creative',
      description: 'Visual and design-focused layout',
    },
    {
      value: 'academic',
      label: 'Academic',
      description: 'Research and publications focused layout',
    },
  ];

  const titleStyles: { value: TitleStyle; label: string; description: string }[] = [
    {
      value: 'name-only',
      label: 'Name Only',
      description: 'Just the name, clean and simple',
    },
    {
      value: 'name-and-title',
      label: 'Name & Title',
      description: 'Name with professional title',
    },
    {
      value: 'name-title-summary',
      label: 'Name, Title & Summary',
      description: 'Full header with summary highlights',
    },
    {
      value: 'minimal',
      label: 'Minimal',
      description: 'Understated and clean',
    },
    {
      value: 'bold',
      label: 'Bold',
      description: 'Strong, attention-grabbing header',
    },
  ];

  const currentTemplateInfo = templates.find(t => t.value === currentTemplate);
  const currentTitleStyleInfo = titleStyles.find(t => t.value === currentTitleStyle);

  return (
    <div className="template-selector">
      <div className="template-current">
        <div className="current-template">
          <span className="label">Template:</span>
          <span className="value">{currentTemplateInfo?.label}</span>
        </div>
        <div className="current-title-style">
          <span className="label">Title Style:</span>
          <span className="value">{currentTitleStyleInfo?.label}</span>
        </div>
        <button
          className="customize-btn"
          onClick={() => setShowOptions(!showOptions)}
        >
          {showOptions ? 'Hide Options' : 'Customize'}
        </button>
      </div>

      {showOptions && (
        <div className="template-options">
          <div className="options-section">
            <h4>Choose Template</h4>
            <div className="template-grid">
              {templates.map((template) => (
                <div
                  key={template.value}
                  className={`template-card ${
                    currentTemplate === template.value ? 'active' : ''
                  }`}
                  onClick={() => onTemplateChange(template.value)}
                >
                  <div className="template-preview">
                    <div className={`preview-${template.value}`}>
                      <div className="preview-header"></div>
                      <div className="preview-content">
                        <div className="preview-line"></div>
                        <div className="preview-line short"></div>
                        <div className="preview-line"></div>
                      </div>
                    </div>
                  </div>
                  <div className="template-info">
                    <h5>{template.label}</h5>
                    <p>{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="options-section">
            <h4>Title Style</h4>
            <div className="title-style-options">
              {titleStyles.map((style) => (
                <div
                  key={style.value}
                  className={`title-style-option ${
                    currentTitleStyle === style.value ? 'active' : ''
                  }`}
                  onClick={() => onTitleStyleChange(style.value)}
                >
                  <div className="title-style-preview">
                    <div className={`preview-title-${style.value}`}>
                      {style.value === 'name-only' && (
                        <div className="preview-name">John Doe</div>
                      )}
                      {style.value === 'name-and-title' && (
                        <>
                          <div className="preview-name">John Doe</div>
                          <div className="preview-title">Software Engineer</div>
                        </>
                      )}
                      {style.value === 'name-title-summary' && (
                        <>
                          <div className="preview-name">John Doe</div>
                          <div className="preview-title">Software Engineer</div>
                          <div className="preview-summary">
                            Experienced developer with expertise in...
                          </div>
                        </>
                      )}
                      {style.value === 'minimal' && (
                        <div className="preview-name minimal">john doe</div>
                      )}
                      {style.value === 'bold' && (
                        <div className="preview-name bold">JOHN DOE</div>
                      )}
                    </div>
                  </div>
                  <div className="title-style-info">
                    <strong>{style.label}</strong>
                    <p>{style.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};