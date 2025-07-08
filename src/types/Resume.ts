export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Resume {
  contact: ContactInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}

// Import flexible resume types
export * from './FlexibleResume';

// Helper function to convert traditional resume to flexible format
export function convertToFlexibleResume(traditional: Resume): any {
  return {
    id: `resume-${Date.now()}`,
    metadata: {
      version: '1.0.0',
      lastModified: new Date().toISOString(),
      template: 'traditional',
      titleStyle: 'name-and-title'
    },
    sections: [
      {
        id: 'contact-section',
        type: 'contact',
        title: 'Contact Information',
        enabled: true,
        order: 1,
        data: {
          ...traditional.contact,
          title: '' // Add professional title if needed
        },
        displayOptions: {
          showIcon: true,
          layout: 'horizontal'
        }
      },
      {
        id: 'summary-section',
        type: 'summary',
        title: 'Professional Summary',
        enabled: true,
        order: 2,
        data: {
          text: traditional.summary
        },
        displayOptions: {
          style: 'paragraph'
        }
      },
      {
        id: 'experience-section',
        type: 'experience',
        title: 'Professional Experience',
        enabled: true,
        order: 3,
        data: traditional.experience,
        displayOptions: {
          showDates: true,
          showLocation: false,
          showDescription: true,
          dateFormat: 'month-year',
          achievementStyle: 'bullets'
        }
      },
      {
        id: 'education-section',
        type: 'education',
        title: 'Education',
        enabled: true,
        order: 4,
        data: traditional.education,
        displayOptions: {
          showGPA: true,
          showDates: true,
          showCoursework: false,
          dateFormat: 'year-only'
        }
      },
      {
        id: 'skills-section',
        type: 'skills',
        title: 'Skills',
        enabled: true,
        order: 5,
        data: traditional.skills,
        displayOptions: {
          layout: 'categorized',
          showProficiency: false,
          columns: 2
        }
      },
      {
        id: 'projects-section',
        type: 'projects',
        title: 'Projects',
        enabled: traditional.projects.length > 0,
        order: 6,
        data: traditional.projects,
        displayOptions: {
          showTechnologies: true,
          showLinks: true,
          showDates: false,
          layout: 'detailed'
        }
      }
    ]
  };
}