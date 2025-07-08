import React from 'react';
import { FlexibleResume } from '../types/Resume';

interface FlexibleResumePreviewProps {
  resume: FlexibleResume;
}

export const FlexibleResumePreview: React.FC<FlexibleResumePreviewProps> = ({
  resume,
}) => {
  const renderSection = (section: any) => {
    if (!section.enabled) return null;

    switch (section.type) {
      case 'contact':
        return renderContactSection(section);
      case 'summary':
        return renderSummarySection(section);
      case 'experience':
        return renderExperienceSection(section);
      case 'education':
        return renderEducationSection(section);
      case 'skills':
        return renderSkillsSection(section);
      case 'projects':
        return renderProjectsSection(section);
      case 'certifications':
        return renderCertificationsSection(section);
      default:
        return (
          <div key={section.id} className="resume-section">
            <h2>{section.title}</h2>
            <p>Preview for {section.type} sections coming soon...</p>
          </div>
        );
    }
  };

  const renderContactSection = (section: any) => {
    const { data, displayOptions } = section;
    
    return (
      <div key={section.id} className={`contact-section layout-${displayOptions.layout}`}>
        <div className="contact-header">
          <h1 className="contact-name">{data.name}</h1>
          {data.title && <h2 className="contact-title">{data.title}</h2>}
        </div>
        
        <div className="contact-info">
          {data.email && <span className="contact-item">📧 {data.email}</span>}
          {data.phone && <span className="contact-item">📞 {data.phone}</span>}
          {data.location && <span className="contact-item">📍 {data.location}</span>}
          {data.linkedin && <span className="contact-item">🔗 LinkedIn</span>}
          {data.github && <span className="contact-item">📱 GitHub</span>}
          {data.website && <span className="contact-item">🌐 Website</span>}
          {data.customLinks?.map((link: any, index: number) => (
            <span key={index} className="contact-item">🔗 {link.label}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderSummarySection = (section: any) => {
    const { data, displayOptions } = section;
    
    return (
      <div key={section.id} className="resume-section summary-section">
        <h2>{section.title}</h2>
        {displayOptions.style === 'bullets' ? (
          <div className="summary-content">
            {data.text && <p className="summary-text">{data.text}</p>}
            {data.highlights && data.highlights.length > 0 && (
              <ul className="summary-highlights">
                {data.highlights.map((highlight: string, index: number) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p className="summary-text">{data.text}</p>
        )}
      </div>
    );
  };

  const renderExperienceSection = (section: any) => {
    const { data, displayOptions } = section;
    
    return (
      <div key={section.id} className="resume-section experience-section">
        <h2>{section.title}</h2>
        <div className="experience-list">
          {data.map((exp: any, index: number) => (
            <div key={exp.id} className="experience-item">
              <div className="experience-header">
                <h3>{exp.position}</h3>
                <h4>{exp.company}</h4>
                {displayOptions.showDates && (
                  <span className="experience-dates">
                    {exp.startDate} - {exp.endDate}
                  </span>
                )}
                {displayOptions.showLocation && exp.location && (
                  <span className="experience-location">{exp.location}</span>
                )}
              </div>
              
              {displayOptions.showDescription && exp.description && (
                <p className="experience-description">{exp.description}</p>
              )}
              
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="experience-achievements">
                  {exp.achievements.map((achievement: string, achIndex: number) => (
                    <li key={achIndex}>{achievement}</li>
                  ))}
                </ul>
              )}
              
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="experience-technologies">
                  <strong>Technologies:</strong> {exp.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEducationSection = (section: any) => {
    const { data, displayOptions } = section;
    
    return (
      <div key={section.id} className="resume-section education-section">
        <h2>{section.title}</h2>
        <div className="education-list">
          {data.map((edu: any, index: number) => (
            <div key={edu.id} className="education-item">
              <div className="education-header">
                <h3>{edu.degree} in {edu.field}</h3>
                <h4>{edu.institution}</h4>
                {displayOptions.showDates && (
                  <span className="education-dates">
                    {edu.startDate} - {edu.endDate}
                  </span>
                )}
                {displayOptions.showGPA && edu.gpa && (
                  <span className="education-gpa">GPA: {edu.gpa}</span>
                )}
              </div>
              
              {edu.honors && edu.honors.length > 0 && (
                <div className="education-honors">
                  <strong>Honors:</strong> {edu.honors.join(', ')}
                </div>
              )}
              
              {displayOptions.showCoursework && edu.coursework && edu.coursework.length > 0 && (
                <div className="education-coursework">
                  <strong>Relevant Coursework:</strong> {edu.coursework.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSkillsSection = (section: any) => {
    const { data, displayOptions } = section;
    
    return (
      <div key={section.id} className="resume-section skills-section">
        <h2>{section.title}</h2>
        <div className={`skills-content layout-${displayOptions.layout} columns-${displayOptions.columns}`}>
          {data.map((skillCategory: any, index: number) => (
            <div key={skillCategory.id} className="skill-category">
              <h3>{skillCategory.category}</h3>
              <div className="skill-items">
                {skillCategory.items.map((skill: string, skillIndex: number) => (
                  <span key={skillIndex} className="skill-item">
                    {skill}
                    {displayOptions.showProficiency && skillCategory.proficiency && (
                      <span className={`proficiency ${skillCategory.proficiency}`}>
                        {skillCategory.proficiency}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjectsSection = (section: any) => {
    const { data, displayOptions } = section;
    
    return (
      <div key={section.id} className="resume-section projects-section">
        <h2>{section.title}</h2>
        <div className="projects-list">
          {data.map((project: any, index: number) => (
            <div key={project.id} className="project-item">
              <div className="project-header">
                <h3>{project.name}</h3>
                {project.role && <span className="project-role">{project.role}</span>}
                {displayOptions.showDates && project.date && (
                  <span className="project-date">{project.date}</span>
                )}
                {displayOptions.showLinks && project.link && (
                  <a href={project.link} className="project-link">View Project</a>
                )}
              </div>
              
              <p className="project-description">{project.description}</p>
              
              {displayOptions.showTechnologies && project.technologies && project.technologies.length > 0 && (
                <div className="project-technologies">
                  <strong>Technologies:</strong> {project.technologies.join(', ')}
                </div>
              )}
              
              {project.achievements && project.achievements.length > 0 && (
                <ul className="project-achievements">
                  {project.achievements.map((achievement: string, achIndex: number) => (
                    <li key={achIndex}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCertificationsSection = (section: any) => {
    const { data, displayOptions } = section;
    
    const certsByIssuer = displayOptions.groupByIssuer
      ? data.reduce((acc: any, cert: any) => {
          if (!acc[cert.issuer]) acc[cert.issuer] = [];
          acc[cert.issuer].push(cert);
          return acc;
        }, {})
      : { '': data };
    
    return (
      <div key={section.id} className="resume-section certifications-section">
        <h2>{section.title}</h2>
        <div className="certifications-content">
          {Object.entries(certsByIssuer).map(([issuer, certs]: [string, any]) => (
            <div key={issuer || 'all'} className="certification-group">
              {displayOptions.groupByIssuer && issuer && (
                <h3 className="certification-issuer">{issuer}</h3>
              )}
              <div className="certification-list">
                {certs.map((cert: any, index: number) => (
                  <div key={cert.id} className="certification-item">
                    <h4>{cert.name}</h4>
                    {!displayOptions.groupByIssuer && (
                      <span className="certification-issuer">{cert.issuer}</span>
                    )}
                    {displayOptions.showDates && (
                      <span className="certification-date">{cert.date}</span>
                    )}
                    {displayOptions.showCredentialId && cert.credentialId && (
                      <span className="certification-id">ID: {cert.credentialId}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const sortedSections = [...resume.sections]
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className={`flexible-resume-preview template-${resume.metadata.template} title-${resume.metadata.titleStyle}`}>
      <div className="resume-content">
        {sortedSections.map(section => renderSection(section))}
      </div>
    </div>
  );
};