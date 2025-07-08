import { Resume } from '../types/Resume';
import { ContactForm } from './ContactForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';

interface ResumeEditorProps {
  resume: Resume;
  onChange: (resume: Resume) => void;
}

export function ResumeEditor({ resume, onChange }: ResumeEditorProps) {
  const updateField = <K extends keyof Resume>(field: K, value: Resume[K]) => {
    onChange({ ...resume, [field]: value });
  };

  return (
    <div className="resume-editor">
      <h2>Resume Editor</h2>
      
      <ContactForm
        contact={resume.contact}
        onChange={(contact) => updateField('contact', contact)}
      />
      
      <div className="form-section">
        <h3>Summary</h3>
        <textarea
          placeholder="Professional Summary"
          value={resume.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          rows={4}
        />
      </div>
      
      <ExperienceForm
        experiences={resume.experience}
        onChange={(experience) => updateField('experience', experience)}
      />
      
      <EducationForm
        education={resume.education}
        onChange={(education) => updateField('education', education)}
      />
      
      <SkillsForm
        skills={resume.skills}
        onChange={(skills) => updateField('skills', skills)}
      />
    </div>
  );
}