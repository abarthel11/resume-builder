import React from 'react';
import { EducationSection } from '../../types/Resume';

interface EducationSectionEditorProps {
  section: EducationSection;
  onChange: (section: EducationSection) => void;
}

export const EducationSectionEditor: React.FC<EducationSectionEditorProps> = ({
  section,
  onChange,
}) => {
  const handleEducationChange = (index: number, field: string, value: any) => {
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

  const handleCourseworkChange = (eduIndex: number, value: string) => {
    const data = [...section.data];
    data[eduIndex] = {
      ...data[eduIndex],
      coursework: value.split(',').map(course => course.trim()).filter(course => course),
    };
    
    onChange({
      ...section,
      data,
    });
  };

  const handleHonorsChange = (eduIndex: number, value: string) => {
    const data = [...section.data];
    data[eduIndex] = {
      ...data[eduIndex],
      honors: value.split(',').map(honor => honor.trim()).filter(honor => honor),
    };
    
    onChange({
      ...section,
      data,
    });
  };

  const addEducation = () => {
    const newEducation = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: [],
      coursework: [],
    };
    
    onChange({
      ...section,
      data: [...section.data, newEducation],
    });
  };

  const removeEducation = (index: number) => {
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
    <div className="education-section-editor">
      <div className="editor-section">
        <h3>Education</h3>
        <div className="education-list">
          {section.data.map((education, index) => (
            <div key={education.id} className="education-item">
              <div className="education-header">
                <h4>Education {index + 1}</h4>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeEducation(index)}
                >
                  Remove
                </button>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Institution:</label>
                  <input
                    type="text"
                    value={education.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    placeholder="University name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Degree:</label>
                  <input
                    type="text"
                    value={education.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                </div>
                
                <div className="form-group">
                  <label>Field of Study:</label>
                  <input
                    type="text"
                    value={education.field}
                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
                
                <div className="form-group">
                  <label>Start Date:</label>
                  <input
                    type="text"
                    value={education.startDate}
                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    placeholder="2020"
                  />
                </div>
                
                <div className="form-group">
                  <label>End Date:</label>
                  <input
                    type="text"
                    value={education.endDate}
                    onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    placeholder="2024"
                  />
                </div>
                
                <div className="form-group">
                  <label>GPA:</label>
                  <input
                    type="text"
                    value={education.gpa || ''}
                    onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                    placeholder="3.8"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Honors (comma-separated):</label>
                <input
                  type="text"
                  value={(education.honors || []).join(', ')}
                  onChange={(e) => handleHonorsChange(index, e.target.value)}
                  placeholder="Magna Cum Laude, Dean's List"
                />
              </div>
              
              <div className="form-group">
                <label>Relevant Coursework (comma-separated):</label>
                <textarea
                  value={(education.coursework || []).join(', ')}
                  onChange={(e) => handleCourseworkChange(index, e.target.value)}
                  placeholder="Data Structures, Algorithms, Web Development"
                  rows={2}
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            className="add-btn primary"
            onClick={addEducation}
          >
            Add Education
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
                checked={section.displayOptions.showGPA}
                onChange={(e) => handleDisplayOptionChange('showGPA', e.target.checked)}
              />
              Show GPA
            </label>
          </div>
          
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
                checked={section.displayOptions.showCoursework}
                onChange={(e) => handleDisplayOptionChange('showCoursework', e.target.checked)}
              />
              Show Coursework
            </label>
          </div>
          
          <div className="form-group">
            <label>Date Format:</label>
            <select
              value={section.displayOptions.dateFormat}
              onChange={(e) => handleDisplayOptionChange('dateFormat', e.target.value)}
            >
              <option value="full">Full Date</option>
              <option value="year-only">Year Only</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};