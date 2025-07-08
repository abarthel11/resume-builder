import { ContactInfo } from '../types/Resume';

interface ContactSectionProps {
  contact: ContactInfo;
}

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <header className="contact-section">
      <h1>{contact.name}</h1>
      <div className="contact-details">
        <span>{contact.email}</span>
        <span>{contact.phone}</span>
        <span>{contact.location}</span>
      </div>
      <div className="contact-links">
        {contact.linkedin && (
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        )}
        {contact.github && (
          <a href={contact.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {contact.website && (
          <a href={contact.website} target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
        )}
      </div>
    </header>
  );
}