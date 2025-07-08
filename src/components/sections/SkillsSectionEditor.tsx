import React from 'react';
import { SkillsSection } from '../../types/Resume';

interface SkillsSectionEditorProps {
  section: SkillsSection;
  onChange: (section: SkillsSection) => void;
}

export const SkillsSectionEditor: React.FC<SkillsSectionEditorProps> = ({
  section,
  onChange,
}) => {
  const handleSkillCategoryChange = (index: number, field: string, value: any) => {
    const data = [...section.data];
    data[index] = {
      ...data[index],
      [field]: value,
    };
    
    onChange({
      ...section,
      data,
    });
  };

  const handleSkillItemsChange = (index: number, value: string) => {
    const data = [...section.data];
    data[index] = {
      ...data[index],
      items: value.split(',').map(item => item.trim()).filter(item => item),
    };
    
    onChange({
      ...section,
      data,
    });
  };

  const addSkillCategory = () => {
    const newCategory = {
      id: `skill-${Date.now()}`,
      category: '',
      items: [],
      proficiency: 'intermediate' as const,
    };
    
    onChange({
      ...section,
      data: [...section.data, newCategory],
    });
  };

  const removeSkillCategory = (index: number) => {
    const data = [...section.data];
    data.splice(index, 1);
    
    onChange({
      ...section,
      data,
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
    <div className="skills-section-editor">
      <div className="editor-section">
        <h3>Skills</h3>
        <div className="skills-list">
          {section.data.map((skillCategory, index) => (
            <div key={skillCategory.id} className="skill-category-item">
              <div className="skill-category-header">
                <h4>Category {index + 1}</h4>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeSkillCategory(index)}
                >
                  Remove
                </button>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Category Name:</label>
                  <input
                    type="text"
                    value={skillCategory.category}
                    onChange={(e) => handleSkillCategoryChange(index, 'category', e.target.value)}
                    placeholder="e.g., Programming Languages"
                  />
                </div>
                
                <div className="form-group">
                  <label>Proficiency Level:</label>
                  <select
                    value={skillCategory.proficiency || 'intermediate'}
                    onChange={(e) => handleSkillCategoryChange(index, 'proficiency', e.target.value)}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Skills (comma-separated):</label>
                <textarea
                  value={skillCategory.items.join(', ')}
                  onChange={(e) => handleSkillItemsChange(index, e.target.value)}
                  placeholder="JavaScript, React, Node.js, Python"
                  rows={3}
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            className="add-btn primary"
            onClick={addSkillCategory}
          >
            Add Skill Category
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
              <option value="categorized">Categorized</option>
              <option value="flat">Flat List</option>
              <option value="tagged">Tagged</option>
              <option value="rated">With Ratings</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Columns:</label>
            <select
              value={section.displayOptions.columns}
              onChange={(e) => handleDisplayOptionChange('columns', parseInt(e.target.value))}
            >
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={section.displayOptions.showProficiency}
                onChange={(e) => handleDisplayOptionChange('showProficiency', e.target.checked)}
              />
              Show Proficiency Levels
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};