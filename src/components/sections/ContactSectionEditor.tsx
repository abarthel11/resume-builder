import React from 'react';
import { ContactSection } from '../../types/Resume';

interface ContactSectionEditorProps {
  section: ContactSection;
  onChange: (section: ContactSection) => void;
}

export const ContactSectionEditor: React.FC<ContactSectionEditorProps> = ({
  section,
  onChange,
}) => {
  const handleDataChange = (field: string, value: string) => {
    onChange({
      ...section,
      data: {
        ...section.data,
        [field]: value,
      },
    });
  };

  const handleCustomLinkChange = (index: number, field: 'label' | 'url', value: string) => {
    const customLinks = [...(section.data.customLinks || [])];
    customLinks[index] = {
      ...customLinks[index],
      [field]: value,
    };
    
    onChange({
      ...section,
      data: {
        ...section.data,
        customLinks,
      },
    });
  };

  const addCustomLink = () => {
    const customLinks = [...(section.data.customLinks || [])];
    customLinks.push({ label: '', url: '' });
    
    onChange({
      ...section,
      data: {
        ...section.data,
        customLinks,
      },
    });
  };

  const removeCustomLink = (index: number) => {
    const customLinks = [...(section.data.customLinks || [])];
    customLinks.splice(index, 1);
    
    onChange({
      ...section,
      data: {
        ...section.data,
        customLinks,
      },
    });
  };

  const handleDisplayOptionChange = (field: string, value: any) => {
    onChange({
      ...section,
      displayOptions: {
        ...section.displayOptions,
        [field]: value,
      },
    });
  };

  return (
    <div className="contact-section-editor">
      <div className="editor-section">
        <h3>Contact Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={section.data.name}
              onChange={(e) => handleDataChange('name', e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          
          <div className="form-group">
            <label>Professional Title:</label>
            <input
              type="text"
              value={section.data.title || ''}
              onChange={(e) => handleDataChange('title', e.target.value)}
              placeholder="e.g., Senior Software Engineer"
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={section.data.email}
              onChange={(e) => handleDataChange('email', e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              value={section.data.phone}
              onChange={(e) => handleDataChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              value={section.data.location}
              onChange={(e) => handleDataChange('location', e.target.value)}
              placeholder="City, State"
            />
          </div>
          
          <div className="form-group">
            <label>LinkedIn:</label>
            <input
              type="url"
              value={section.data.linkedin || ''}
              onChange={(e) => handleDataChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          
          <div className="form-group">
            <label>GitHub:</label>
            <input
              type="url"
              value={section.data.github || ''}
              onChange={(e) => handleDataChange('github', e.target.value)}
              placeholder="https://github.com/yourusername"
            />
          </div>
          
          <div className="form-group">
            <label>Website:</label>
            <input
              type="url"
              value={section.data.website || ''}
              onChange={(e) => handleDataChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </div>
          
          <div className="form-group">
            <label>Portfolio:</label>
            <input
              type="url"
              value={section.data.portfolio || ''}
              onChange={(e) => handleDataChange('portfolio', e.target.value)}
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>
      </div>

      <div className="editor-section">
        <h3>Custom Links</h3>
        <div className="custom-links">
          {(section.data.customLinks || []).map((link, index) => (
            <div key={index} className="custom-link-item">
              <div className="form-group">
                <label>Label:</label>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => handleCustomLinkChange(index, 'label', e.target.value)}
                  placeholder="e.g., Trailblazer"
                />
              </div>
              <div className="form-group">
                <label>URL:</label>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleCustomLinkChange(index, 'url', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeCustomLink(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={addCustomLink}
          >
            Add Custom Link
          </button>
        </div>
      </div>

      <div className="editor-section">
        <h3>Display Options</h3>
        <div className="display-options">
          <div className="form-group">
            <label>Layout:</label>
            <select
              value={section.displayOptions.layout}
              onChange={(e) => handleDisplayOptionChange('layout', e.target.value)}
            >
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
              <option value="compact">Compact</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={section.displayOptions.showIcon}
                onChange={(e) => handleDisplayOptionChange('showIcon', e.target.checked)}
              />
              Show Icons
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};