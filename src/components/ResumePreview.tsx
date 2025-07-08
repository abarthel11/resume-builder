import { Resume } from '../types/Resume';
import { ContactSection } from './ContactSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="resume-preview">
      <ContactSection contact={resume.contact} />
      
      {resume.summary && (
        <section className="summary-section">
          <h2>Summary</h2>
          <p>{resume.summary}</p>
        </section>
      )}
      
      <ExperienceSection experiences={resume.experience} />
      <EducationSection education={resume.education} />
      <SkillsSection skills={resume.skills} />
      <ProjectsSection projects={resume.projects} />
    </div>
  );
}