import React from 'react';
import { ProjectsSection } from '../../types/Resume';

interface ProjectsSectionEditorProps {
  section: ProjectsSection;
  onChange: (section: ProjectsSection) => void;
}

export const ProjectsSectionEditor: React.FC<ProjectsSectionEditorProps> = ({
  section,
  onChange,
}) => {
  const handleProjectChange = (index: number, field: string, value: any) => {
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

  const handleTechnologiesChange = (index: number, value: string) => {
    const data = [...section.data];
    data[index] = {
      ...data[index],
      technologies: value.split(',').map(tech => tech.trim()).filter(tech => tech),
    };
    
    onChange({
      ...section,
      data,
    });
  };

  const handleAchievementsChange = (index: number, value: string) => {
    const data = [...section.data];
    data[index] = {
      ...data[index],
      achievements: value.split('\n').map(ach => ach.trim()).filter(ach => ach),
    };
    
    onChange({
      ...section,
      data,
    });
  };

  const addProject = () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      role: '',
      technologies: [],
      link: '',
      achievements: [],
      date: '',
    };
    
    onChange({
      ...section,
      data: [...section.data, newProject],
    });
  };

  const removeProject = (index: number) => {
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
    <div className="projects-section-editor">
      <div className="editor-section">
        <h3>Projects</h3>
        <div className="projects-list">
          {section.data.map((project, index) => (
            <div key={project.id} className="project-item">
              <div className="project-header">
                <h4>Project {index + 1}</h4>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeProject(index)}
                >
                  Remove
                </button>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Project Name:</label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    placeholder="Project name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Your Role:</label>
                  <input
                    type="text"
                    value={project.role || ''}
                    onChange={(e) => handleProjectChange(index, 'role', e.target.value)}
                    placeholder="Lead Developer"
                  />
                </div>
                
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="text"
                    value={project.date || ''}
                    onChange={(e) => handleProjectChange(index, 'date', e.target.value)}
                    placeholder="2024"
                  />
                </div>
                
                <div className="form-group">
                  <label>Link:</label>
                  <input
                    type="url"
                    value={project.link || ''}
                    onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  placeholder="Brief description of the project"
                  rows={3}
                />
              </div>
              
              <div className="form-group">
                <label>Technologies (comma-separated):</label>
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) => handleTechnologiesChange(index, e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              
              <div className="form-group">
                <label>Key Achievements (one per line):</label>
                <textarea
                  value={(project.achievements || []).join('\n')}
                  onChange={(e) => handleAchievementsChange(index, e.target.value)}
                  placeholder="Improved performance by 50%&#10;Implemented real-time features&#10;Deployed to AWS"
                  rows={4}
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            className="add-btn primary"
            onClick={addProject}
          >
            Add Project
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
                checked={section.displayOptions.showTechnologies}
                onChange={(e) => handleDisplayOptionChange('showTechnologies', e.target.checked)}
              />
              Show Technologies
            </label>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={section.displayOptions.showLinks}
                onChange={(e) => handleDisplayOptionChange('showLinks', e.target.checked)}
              />
              Show Links
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
            <label>Layout:</label>
            <select
              value={section.displayOptions.layout}
              onChange={(e) => handleDisplayOptionChange('layout', e.target.value)}
            >
              <option value="detailed">Detailed</option>
              <option value="compact">Compact</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};