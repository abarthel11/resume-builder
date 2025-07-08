import { Education } from '../types/Resume';

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="education-section">
      <h2>Education</h2>
      {education.map((edu) => (
        <div key={edu.id} className="education-item">
          <div className="education-header">
            <div>
              <h3>{edu.institution}</h3>
              <p>{edu.degree} in {edu.field}</p>
            </div>
            <span className="date-range">
              {edu.startDate} - {edu.endDate}
            </span>
          </div>
          {edu.gpa && <p>GPA: {edu.gpa}</p>}
        </div>
      ))}
    </section>
  );
}