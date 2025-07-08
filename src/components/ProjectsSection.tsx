import { Project } from '../types/Resume';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) return null;
  
  return (
    <section className="projects-section">
      <h2>Projects</h2>
      {projects.map((project) => (
        <div key={project.id} className="project-item">
          <h3>
            {project.name}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                🔗
              </a>
            )}
          </h3>
          <p>{project.description}</p>
          <p className="technologies">
            <strong>Technologies:</strong> {project.technologies.join(', ')}
          </p>
        </div>
      ))}
    </section>
  );
}