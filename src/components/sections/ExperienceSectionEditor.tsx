import React from 'react';
import { ExperienceSection } from '../../types/Resume';

interface ExperienceSectionEditorProps {
  section: ExperienceSection;
  onChange: (section: ExperienceSection) => void;
}

export const ExperienceSectionEditor: React.FC<ExperienceSectionEditorProps> = ({
  section,
  onChange,
}) => {
  const handleExperienceChange = (index: number, field: string, value: any) => {
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

  const handleAchievementChange = (expIndex: number, achIndex: number, value: string) => {
    const data = [...section.data];
    const achievements = [...data[expIndex].achievements];
    achievements[achIndex] = value;
    
    data[expIndex] = {
      ...data[expIndex],
      achievements,
    };
    
    onChange({
      ...section,
      data,
    });
  };

  const addAchievement = (expIndex: number) => {
    const data = [...section.data];
    data[expIndex] = {
      ...data[expIndex],
      achievements: [...data[expIndex].achievements, ''],
    };
    
    onChange({
      ...section,
      data,
    });
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const data = [...section.data];
    const achievements = [...data[expIndex].achievements];
    achievements.splice(achIndex, 1);
    
    data[expIndex] = {
      ...data[expIndex],
      achievements,
    };
    
    onChange({
      ...section,
      data,
    });
  };

  const addExperience = () => {
    const newExperience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: '',
      achievements: [''],
      technologies: [],
    };
    
    onChange({
      ...section,
      data: [...section.data, newExperience],
    });
  };

  const removeExperience = (index: number) => {
    const data = [...section.data];
    data.splice(index, 1);
    
    onChange({
      ...section,
      data,
    });
  };

  const handleTechnologiesChange = (expIndex: number, value: string) => {
    const data = [...section.data];
    data[expIndex] = {
      ...data[expIndex],
      technologies: value.split(',').map(tech => tech.trim()).filter(tech => tech),
    };
    
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
    <div className="experience-section-editor">
      <div className="editor-section">
        <h3>Work Experience</h3>
        <div className="experiences-list">
          {section.data.map((experience, expIndex) => (
            <div key={experience.id} className="experience-item">
              <div className="experience-header">
                <h4>Experience {expIndex + 1}</h4>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeExperience(expIndex)}
                >
                  Remove
                </button>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Company:</label>
                  <input
                    type="text"
                    value={experience.company}
                    onChange={(e) => handleExperienceChange(expIndex, 'company', e.target.value)}
                    placeholder="Company name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Position:</label>
                  <input
                    type="text"
                    value={experience.position}
                    onChange={(e) => handleExperienceChange(expIndex, 'position', e.target.value)}
                    placeholder="Job title"
                  />
                </div>
                
                <div className="form-group">
                  <label>Start Date:</label>
                  <input
                    type="text"
                    value={experience.startDate}
                    onChange={(e) => handleExperienceChange(expIndex, 'startDate', e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                
                <div className="form-group">
                  <label>End Date:</label>
                  <input
                    type="text"
                    value={experience.endDate}
                    onChange={(e) => handleExperienceChange(expIndex, 'endDate', e.target.value)}
                    placeholder="MM/YYYY or Present"
                    disabled={experience.current}
                  />
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={experience.current}
                      onChange={(e) => {
                        handleExperienceChange(expIndex, 'current', e.target.checked);
                        if (e.target.checked) {
                          handleExperienceChange(expIndex, 'endDate', 'Present');
                        }
                      }}
                    />
                    Current Position
                  </label>
                </div>
                
                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={experience.location || ''}
                    onChange={(e) => handleExperienceChange(expIndex, 'location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={experience.description || ''}
                  onChange={(e) => handleExperienceChange(expIndex, 'description', e.target.value)}
                  placeholder="Brief description of the role"
                  rows={2}
                />
              </div>
              
              <div className="form-group">
                <label>Technologies (comma-separated):</label>
                <input
                  type="text"
                  value={(experience.technologies || []).join(', ')}
                  onChange={(e) => handleTechnologiesChange(expIndex, e.target.value)}
                  placeholder="React, Node.js, Python"
                />
              </div>
              
              <div className="achievements-section">
                <h5>Achievements</h5>
                {experience.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="achievement-item">
                    <div className="form-group">
                      <textarea
                        value={achievement}
                        onChange={(e) => handleAchievementChange(expIndex, achIndex, e.target.value)}
                        placeholder="Describe a key achievement or responsibility"
                        rows={2}
                      />
                    </div>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeAchievement(expIndex, achIndex)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => addAchievement(expIndex)}
                >
                  Add Achievement
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            className="add-btn primary"
            onClick={addExperience}
          >
            Add Experience
          </button>
        </div>
      </div>

      <div className="editor-section">
        <h3>Display Options</h3>
        <div className="display-options">
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={section.displayOptions.showDates}
                onChange={(e) => handleDisplayOptionChange('showDates', e.target.checked)}
              />
              Show Dates
            </label>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={section.displayOptions.showLocation}
                onChange={(e) => handleDisplayOptionChange('showLocation', e.target.checked)}
              />
              Show Location
            </label>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={section.displayOptions.showDescription}
                onChange={(e) => handleDisplayOptionChange('showDescription', e.target.checked)}
              />
              Show Description
            </label>
          </div>
          
          <div className="form-group">
            <label>Date Format:</label>
            <select
              value={section.displayOptions.dateFormat}
              onChange={(e) => handleDisplayOptionChange('dateFormat', e.target.value)}
            >
              <option value="full">Full Date</option>
              <option value="month-year">Month/Year</option>
              <option value="year-only">Year Only</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Achievement Style:</label>
            <select
              value={section.displayOptions.achievementStyle}
              onChange={(e) => handleDisplayOptionChange('achievementStyle', e.target.value)}
            >
              <option value="bullets">Bullet Points</option>
              <option value="paragraph">Paragraph</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};