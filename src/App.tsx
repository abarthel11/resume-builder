import { useState, useEffect } from 'react';
import { Resume } from './types/Resume';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { saveResume, loadResume, exportResumeJSON, importResumeJSON } from './utils/storage';
import './App.css';

const defaultResume: Resume = {
  contact: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: []
};

function App() {
  const [resume, setResume] = useState<Resume>(() => {
    const saved = loadResume();
    return saved || defaultResume;
  });

  useEffect(() => {
    saveResume(resume);
  }, [resume]);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    exportResumeJSON(resume);
  };

  const handleImport = async () => {
    try {
      const importedResume = await importResumeJSON();
      setResume(importedResume);
    } catch (error) {
      alert('Failed to import resume. Please check the file format.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data?')) {
      setResume(defaultResume);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Resume Builder</h1>
        <div className="action-buttons">
          <button onClick={handlePrint}>Print / Save as PDF</button>
          <button onClick={handleExport}>Export JSON</button>
          <button onClick={handleImport}>Import JSON</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </header>
      
      <div className="app-content">
        <div className="editor-panel">
          <ResumeEditor resume={resume} onChange={setResume} />
        </div>
        
        <div className="preview-panel">
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}

export default App;