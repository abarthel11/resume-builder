// Flexible Resume Type System for Customizable Layouts

// Base section interface that all sections extend
export interface BaseSection {
  id: string;
  type: SectionType;
  title: string;
  enabled: boolean;
  order: number;
}

// Available section types
export type SectionType = 
  | 'contact'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'awards'
  | 'publications'
  | 'languages'
  | 'volunteer'
  | 'interests'
  | 'references'
  | 'custom';

// Layout options for the resume
export type ResumeLayout = 
  | 'traditional'      // Standard top-to-bottom layout
  | 'modern'          // Two-column with sidebar
  | 'executive'       // Executive summary focused
  | 'technical'       // Technical skills emphasized
  | 'creative'        // Visual/design focused
  | 'academic';       // Publications and research focused

// Title display options
export type TitleStyle = 
  | 'name-only'
  | 'name-and-title'
  | 'name-title-summary'
  | 'minimal'
  | 'bold';

// Section-specific interfaces
export interface ContactSection extends BaseSection {
  type: 'contact';
  data: {
    name: string;
    title?: string;  // Professional title
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
    portfolio?: string;
    customLinks?: Array<{ label: string; url: string }>;
  };
  displayOptions: {
    showIcon: boolean;
    layout: 'horizontal' | 'vertical' | 'compact';
  };
}

export interface SummarySection extends BaseSection {
  type: 'summary';
  data: {
    text: string;
    highlights?: string[];  // Key points to emphasize
  };
  displayOptions: {
    style: 'paragraph' | 'bullets' | 'headline';
  };
}

export interface ExperienceSection extends BaseSection {
  type: 'experience';
  data: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    location?: string;
    description?: string;
    achievements: string[];
    technologies?: string[];  // For technical roles
  }>;
  displayOptions: {
    showDates: boolean;
    showLocation: boolean;
    showDescription: boolean;
    dateFormat: 'full' | 'year-only' | 'month-year';
    achievementStyle: 'bullets' | 'paragraph';
  };
}

export interface EducationSection extends BaseSection {
  type: 'education';
  data: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    honors?: string[];
    coursework?: string[];
  }>;
  displayOptions: {
    showGPA: boolean;
    showDates: boolean;
    showCoursework: boolean;
    dateFormat: 'full' | 'year-only';
  };
}

export interface SkillsSection extends BaseSection {
  type: 'skills';
  data: Array<{
    id: string;
    category: string;
    items: string[];
    proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }>;
  displayOptions: {
    layout: 'categorized' | 'flat' | 'tagged' | 'rated';
    showProficiency: boolean;
    columns: 1 | 2 | 3;
  };
}

export interface ProjectsSection extends BaseSection {
  type: 'projects';
  data: Array<{
    id: string;
    name: string;
    description: string;
    role?: string;
    technologies: string[];
    link?: string;
    achievements?: string[];
    date?: string;
  }>;
  displayOptions: {
    showTechnologies: boolean;
    showLinks: boolean;
    showDates: boolean;
    layout: 'detailed' | 'compact';
  };
}

export interface CertificationsSection extends BaseSection {
  type: 'certifications';
  data: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate?: string;
    credentialId?: string;
    link?: string;
  }>;
  displayOptions: {
    showDates: boolean;
    showCredentialId: boolean;
    groupByIssuer: boolean;
  };
}

export interface CustomSection extends BaseSection {
  type: 'custom';
  data: {
    content: any;  // Flexible content
    template?: string;  // Optional template name
  };
  displayOptions: {
    [key: string]: any;
  };
}

// Union type for all possible sections
export type ResumeSection = 
  | ContactSection
  | SummarySection
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | ProjectsSection
  | CertificationsSection
  | CustomSection;

// Main flexible resume interface
export interface FlexibleResume {
  id: string;
  metadata: {
    version: string;
    lastModified: string;
    template: ResumeLayout;
    titleStyle: TitleStyle;
    colorScheme?: string;
    font?: string;
  };
  sections: ResumeSection[];
  settings: {
    pageMargins?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    fontSize?: {
      body: number;
      heading1: number;
      heading2: number;
      heading3: number;
    };
    lineSpacing?: number;
    sectionSpacing?: number;
  };
}

// Helper type to extract section data
export type SectionData<T extends SectionType> = 
  T extends 'contact' ? ContactSection['data'] :
  T extends 'summary' ? SummarySection['data'] :
  T extends 'experience' ? ExperienceSection['data'] :
  T extends 'education' ? EducationSection['data'] :
  T extends 'skills' ? SkillsSection['data'] :
  T extends 'projects' ? ProjectsSection['data'] :
  T extends 'certifications' ? CertificationsSection['data'] :
  T extends 'custom' ? CustomSection['data'] :
  never;

// Section configuration for easy section creation
export interface SectionConfig<T extends SectionType> {
  type: T;
  title: string;
  enabled?: boolean;
  order?: number;
  data: SectionData<T>;
  displayOptions?: any;
}