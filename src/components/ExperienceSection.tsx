import { Experience } from '../types/Resume';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className="experience-section">
      <h2>Experience</h2>
      {experiences.map((exp) => (
        <div key={exp.id} className="experience-item">
          <div className="experience-header">
            <div>
              <h3>{exp.position}</h3>
              <h4>{exp.company}</h4>
            </div>
            <span className="date-range">
              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
            </span>
          </div>
          <p className="experience-description">{exp.description}</p>
          {exp.achievements.length > 0 && (
            <ul className="achievements">
              {exp.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}