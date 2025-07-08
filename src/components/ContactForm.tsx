import { ContactInfo } from '../types/Resume';

interface ContactFormProps {
  contact: ContactInfo;
  onChange: (contact: ContactInfo) => void;
}

export function ContactForm({ contact, onChange }: ContactFormProps) {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({ ...contact, [field]: value });
  };

  return (
    <div className="form-section">
      <h3>Contact Information</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Full Name"
          value={contact.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={contact.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={contact.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={contact.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
        <input
          type="url"
          placeholder="LinkedIn URL (optional)"
          value={contact.linkedin || ''}
          onChange={(e) => handleChange('linkedin', e.target.value)}
        />
        <input
          type="url"
          placeholder="GitHub URL (optional)"
          value={contact.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
        />
        <input
          type="url"
          placeholder="Website URL (optional)"
          value={contact.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
        />
      </div>
    </div>
  );
}