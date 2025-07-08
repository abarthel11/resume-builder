import { Skill } from '../types/Resume';

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="skills-section">
      <h2>Skills</h2>
      {skills.map((skill) => (
        <div key={skill.id} className="skill-category">
          <h3>{skill.category}</h3>
          <p>{skill.items.join(', ')}</p>
        </div>
      ))}
    </section>
  );
}