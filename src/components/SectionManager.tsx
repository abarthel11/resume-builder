import React, { useState } from 'react';
import { ResumeSection, SectionType } from '../types/Resume';

interface SectionManagerProps {
  sections: ResumeSection[];
  onSectionAdd: (section: ResumeSection) => void;
  onSectionDelete: (sectionId: string) => void;
  onSectionReorder: (sectionId: string, newOrder: number) => void;
  onSectionDragReorder?: (draggedId: string, dropTargetId: string) => void;
  onSectionSelect: (sectionId: string) => void;
  activeSection: string | null;
}

interface DragState {
  draggedSection: string | null;
  dragOverSection: string | null;
}

export const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onSectionAdd,
  onSectionDelete,
  onSectionReorder,
  onSectionDragReorder,
  onSectionSelect,
  activeSection,
}) => {
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionType, setNewSectionType] = useState<SectionType>('summary');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [dragState, setDragState] = useState<DragState>({
    draggedSection: null,
    dragOverSection: null,
  });

  const sectionTypes: { type: SectionType; label: string; icon: string }[] = [
    { type: 'contact', label: 'Contact Information', icon: '📧' },
    { type: 'summary', label: 'Professional Summary', icon: '📝' },
    { type: 'experience', label: 'Work Experience', icon: '💼' },
    { type: 'education', label: 'Education', icon: '🎓' },
    { type: 'skills', label: 'Skills', icon: '🛠️' },
    { type: 'projects', label: 'Projects', icon: '🚀' },
    { type: 'certifications', label: 'Certifications', icon: '🏆' },
    { type: 'awards', label: 'Awards', icon: '🏅' },
    { type: 'publications', label: 'Publications', icon: '📚' },
    { type: 'languages', label: 'Languages', icon: '🌍' },
    { type: 'volunteer', label: 'Volunteer Work', icon: '🤝' },
    { type: 'interests', label: 'Interests', icon: '🎯' },
    { type: 'references', label: 'References', icon: '👥' },
    { type: 'custom', label: 'Custom Section', icon: '⚙️' },
  ];

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;

    const newSection: ResumeSection = {
      id: `section-${Date.now()}`,
      type: newSectionType,
      title: newSectionTitle,
      enabled: true,
      order: sections.length + 1,
      data: getDefaultDataForType(newSectionType),
      displayOptions: getDefaultDisplayOptions(newSectionType),
    } as ResumeSection;

    onSectionAdd(newSection);
    setNewSectionTitle('');
    setShowAddSection(false);
  };

  const getDefaultDataForType = (type: SectionType): any => {
    switch (type) {
      case 'contact':
        return {
          name: '',
          email: '',
          phone: '',
          location: '',
        };
      case 'summary':
        return {
          text: '',
          highlights: [],
        };
      case 'experience':
        return [];
      case 'education':
        return [];
      case 'skills':
        return [];
      case 'projects':
        return [];
      case 'certifications':
        return [];
      default:
        return {};
    }
  };

  const getDefaultDisplayOptions = (type: SectionType): any => {
    switch (type) {
      case 'contact':
        return {
          showIcon: true,
          layout: 'horizontal',
        };
      case 'summary':
        return {
          style: 'paragraph',
        };
      case 'experience':
        return {
          showDates: true,
          showLocation: true,
          showDescription: true,
          dateFormat: 'month-year',
          achievementStyle: 'bullets',
        };
      case 'skills':
        return {
          layout: 'categorized',
          showProficiency: false,
          columns: 2,
        };
      default:
        return {};
    }
  };

  const handleToggleSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const updatedSection = { ...section, enabled: !section.enabled };
      // This would need to be passed up to parent
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', sectionId);
    setDragState({ draggedSection: sectionId, dragOverSection: null });
  };

  const handleDragOver = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragState(prev => ({ ...prev, dragOverSection: sectionId }));
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragState(prev => ({ ...prev, dragOverSection: null }));
  };

  const handleDrop = (e: React.DragEvent, dropTargetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    
    if (draggedId && draggedId !== dropTargetId) {
      if (onSectionDragReorder) {
        onSectionDragReorder(draggedId, dropTargetId);
      } else {
        // Fallback to old method if new method not provided
        const sortedSections = [...sections].sort((a, b) => a.order - b.order);
        const draggedIndex = sortedSections.findIndex(s => s.id === draggedId);
        const dropIndex = sortedSections.findIndex(s => s.id === dropTargetId);
        
        if (draggedIndex !== -1 && dropIndex !== -1) {
          // Create new array with reordered sections
          const newSections = [...sortedSections];
          const [draggedItem] = newSections.splice(draggedIndex, 1);
          newSections.splice(dropIndex, 0, draggedItem);
          
          // Update orders for all affected sections
          newSections.forEach((section, index) => {
            onSectionReorder(section.id, index + 1);
          });
        }
      }
    }
    
    setDragState({ draggedSection: null, dragOverSection: null });
  };

  const handleDragEnd = () => {
    setDragState({ draggedSection: null, dragOverSection: null });
  };

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="section-manager">
      <div className="section-manager-header">
        <h3>Resume Sections</h3>
        <button
          className="add-section-btn"
          onClick={() => setShowAddSection(true)}
        >
          + Add Section
        </button>
      </div>

      {showAddSection && (
        <div className="add-section-form">
          <h4>Add New Section</h4>
          <div className="form-group">
            <label>Section Type:</label>
            <select
              value={newSectionType}
              onChange={(e) => setNewSectionType(e.target.value as SectionType)}
            >
              {sectionTypes.map(type => (
                <option key={type.type} value={type.type}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Section Title:</label>
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="Enter section title"
            />
          </div>
          <div className="form-actions">
            <button onClick={handleAddSection}>Add Section</button>
            <button onClick={() => setShowAddSection(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="sections-list">
        {sortedSections.map((section, index) => (
          <div
            key={section.id}
            className={`section-item ${section.enabled ? 'enabled' : 'disabled'} ${
              activeSection === section.id ? 'active' : ''
            } ${dragState.draggedSection === section.id ? 'dragging' : ''} ${
              dragState.dragOverSection === section.id ? 'drag-over' : ''
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, section.id)}
            onDragOver={(e) => handleDragOver(e, section.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, section.id)}
            onDragEnd={handleDragEnd}
            onClick={() => onSectionSelect(section.id)}
          >
            <div className="section-header">
              <div className="section-info">
                <span className="drag-handle" title="Drag to reorder">
                  ⋮⋮
                </span>
                <span className="section-icon">
                  {sectionTypes.find(t => t.type === section.type)?.icon || '📄'}
                </span>
                <span className="section-title">{section.title}</span>
              </div>
              <div className="section-controls">
                <button
                  className="toggle-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSection(section.id);
                  }}
                  title={section.enabled ? 'Disable section' : 'Enable section'}
                >
                  {section.enabled ? '👁️' : '🚫'}
                </button>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSectionDelete(section.id);
                  }}
                  title="Delete section"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="section-order">
              <span>Order: {section.order}</span>
              <div className="order-controls">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSectionReorder(section.id, Math.max(1, section.order - 1));
                  }}
                  disabled={index === 0}
                >
                  ↑
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSectionReorder(section.id, section.order + 1);
                  }}
                  disabled={index === sortedSections.length - 1}
                >
                  ↓
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};