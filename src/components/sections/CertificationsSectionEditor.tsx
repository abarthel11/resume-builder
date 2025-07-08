import React from 'react';
import { CertificationsSection } from '../../types/Resume';

interface CertificationsSectionEditorProps {
  section: CertificationsSection;
  onChange: (section: CertificationsSection) => void;
}

export const CertificationsSectionEditor: React.FC<CertificationsSectionEditorProps> = ({
  section,
  onChange,
}) => {
  const handleCertificationChange = (index: number, field: string, value: any) => {
    const data = [...section.data];
    data[index] = {
      ...data[index],
      [field]: value,
    };
    
    onChange({
      ...section,
      data,
    });
  };

  const addCertification = () => {
    const newCertification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      link: '',
    };
    
    onChange({
      ...section,
      data: [...section.data, newCertification],
    });
  };

  const removeCertification = (index: number) => {
    const data = [...section.data];
    data.splice(index, 1);
    
    onChange({
      ...section,
      data,
    });
  };

  const handleDisplayOptionChange = (field: string, value: any) => {
    onChange({
      ...section,
      displayOptions: {
        ...section.displayOptions,
        [field]: value,
      },
    });
  };

  return (
    <div className="certifications-section-editor">
      <div className="editor-section">
        <h3>Certifications</h3>
        <div className="certifications-list">
          {section.data.map((certification, index) => (
            <div key={certification.id} className="certification-item">
              <div className="certification-header">
                <h4>Certification {index + 1}</h4>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeCertification(index)}
                >
                  Remove
                </button>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Certification Name:</label>
                  <input
                    type="text"
                    value={certification.name}
                    onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                
                <div className="form-group">
                  <label>Issuer:</label>
                  <input
                    type="text"
                    value={certification.issuer}
                    onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                  />
                </div>
                
                <div className="form-group">
                  <label>Issue Date:</label>
                  <input
                    type="text"
                    value={certification.date}
                    onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                    placeholder="2024-01-15"
                  />
                </div>
                
                <div className="form-group">
                  <label>Expiry Date:</label>
                  <input
                    type="text"
                    value={certification.expiryDate || ''}
                    onChange={(e) => handleCertificationChange(index, 'expiryDate', e.target.value)}
                    placeholder="2026-01-15"
                  />
                </div>
                
                <div className="form-group">
                  <label>Credential ID:</label>
                  <input
                    type="text"
                    value={certification.credentialId || ''}
                    onChange={(e) => handleCertificationChange(index, 'credentialId', e.target.value)}
                    placeholder="ABC123XYZ"
                  />
                </div>
                
                <div className="form-group">
                  <label>Verification Link:</label>
                  <input
                    type="url"
                    value={certification.link || ''}
                    onChange={(e) => handleCertificationChange(index, 'link', e.target.value)}
                    placeholder="https://verify.certification.com/123"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            className="add-btn primary"
            onClick={addCertification}
          >
            Add Certification
          </button>
        </div>
      </div>

      <div className="editor-section">
        <h3>Display Options</h3>
        <div className="display-options">
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={section.displayOptions.showDates}
                onChange={(e) => handleDisplayOptionChange('showDates', e.target.checked)}
              />
              Show Dates
            </label>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={section.displayOptions.showCredentialId}
                onChange={(e) => handleDisplayOptionChange('showCredentialId', e.target.checked)}
              />
              Show Credential ID
            </label>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={section.displayOptions.groupByIssuer}
                onChange={(e) => handleDisplayOptionChange('groupByIssuer', e.target.checked)}
              />
              Group by Issuer
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};