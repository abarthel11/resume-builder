import React from 'react';
import { SummarySection } from '../../types/Resume';

interface SummarySectionEditorProps {
  section: SummarySection;
  onChange: (section: SummarySection) => void;
}

export const SummarySectionEditor: React.FC<SummarySectionEditorProps> = ({
  section,
  onChange,
}) => {
  const handleTextChange = (value: string) => {
    onChange({
      ...section,
      data: {
        ...section.data,
        text: value,
      },
    });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const highlights = [...(section.data.highlights || [])];
    highlights[index] = value;
    
    onChange({
      ...section,
      data: {
        ...section.data,
        highlights,
      },
    });
  };

  const addHighlight = () => {
    const highlights = [...(section.data.highlights || [])];
    highlights.push('');
    
    onChange({
      ...section,
      data: {
        ...section.data,
        highlights,
      },
    });
  };

  const removeHighlight = (index: number) => {
    const highlights = [...(section.data.highlights || [])];
    highlights.splice(index, 1);
    
    onChange({
      ...section,
      data: {
        ...section.data,
        highlights,
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
    <div className="summary-section-editor">
      <div className="editor-section">
        <h3>Professional Summary</h3>
        <div className="form-group">
          <label>Summary Text:</label>
          <textarea
            value={section.data.text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Write a compelling professional summary..."
            rows={4}
          />
          <small className="help-text">
            Write a brief overview of your experience, skills, and career goals.
          </small>
        </div>
      </div>

      <div className="editor-section">
        <h3>Key Highlights</h3>
        <div className="highlights-editor">
          {(section.data.highlights || []).map((highlight, index) => (
            <div key={index} className="highlight-item">
              <div className="form-group">
                <label>Highlight {index + 1}:</label>
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  placeholder="Key achievement or skill"
                />
              </div>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeHighlight(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={addHighlight}
          >
            Add Highlight
          </button>
        </div>
      </div>

      <div className="editor-section">
        <h3>Display Options</h3>
        <div className="display-options">
          <div className="form-group">
            <label>Style:</label>
            <select
              value={section.displayOptions.style}
              onChange={(e) => handleDisplayOptionChange('style', e.target.value)}
            >
              <option value="paragraph">Paragraph</option>
              <option value="bullets">Bullet Points</option>
              <option value="headline">Headline Style</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};