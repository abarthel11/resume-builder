import { Education } from '../types/Resume';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationForm({ education, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    onChange([...education, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  return (
    <div className="form-section">
      <h3>Education</h3>
      {education.map((edu) => (
        <div key={edu.id} className="form-item">
          <div className="form-grid">
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
            />
            <input
              type="text"
              placeholder="Field of Study"
              value={edu.field}
              onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
            />
            <input
              type="text"
              placeholder="Start Date"
              value={edu.startDate}
              onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
            />
            <input
              type="text"
              placeholder="End Date"
              value={edu.endDate}
              onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
            />
            <input
              type="text"
              placeholder="GPA (optional)"
              value={edu.gpa || ''}
              onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
            />
          </div>
          <button onClick={() => removeEducation(edu.id)}>Remove Education</button>
        </div>
      ))}
      <button onClick={addEducation}>Add Education</button>
    </div>
  );
}