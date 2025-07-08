import { useState, useEffect } from 'react';
import { Resume, FlexibleResume, convertToFlexibleResume } from './types/Resume';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { FlexibleResumeEditor } from './components/FlexibleResumeEditor';
import { FlexibleResumePreview } from './components/FlexibleResumePreview';
import { saveResume, loadResume, exportResumeJSON, importResumeJSON } from './utils/storage';
import './App.css';

type EditorMode = 'traditional' | 'flexible';

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

const defaultFlexibleResume: FlexibleResume = {
  id: `resume-${Date.now()}`,
  metadata: {
    version: '1.0.0',
    lastModified: new Date().toISOString(),
    template: 'traditional',
    titleStyle: 'name-and-title',
    colorScheme: 'professional-blue',
    font: 'Inter, system-ui, sans-serif'
  },
  sections: [],
  settings: {
    pageMargins: { top: 1, bottom: 1, left: 1, right: 1 },
    fontSize: { body: 11, heading1: 16, heading2: 14, heading3: 12 },
    lineSpacing: 1.15,
    sectionSpacing: 20
  }
};

function App() {
  const [editorMode, setEditorMode] = useState<EditorMode>('traditional');
  const [resume, setResume] = useState<Resume>(() => {
    const saved = loadResume();
    return saved || defaultResume;
  });
  const [flexibleResume, setFlexibleResume] = useState<FlexibleResume>(() => {
    const savedFlexible = localStorage.getItem('flexibleResume');
    if (savedFlexible) {
      try {
        return JSON.parse(savedFlexible);
      } catch (error) {
        console.error('Error parsing flexible resume:', error);
      }
    }
    return defaultFlexibleResume;
  });

  useEffect(() => {
    saveResume(resume);
  }, [resume]);

  useEffect(() => {
    localStorage.setItem('flexibleResume', JSON.stringify(flexibleResume));
  }, [flexibleResume]);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    if (editorMode === 'traditional') {
      exportResumeJSON(resume);
    } else {
      const dataStr = JSON.stringify(flexibleResume, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = 'flexible-resume.json';
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const handleImport = async () => {
    try {
      if (editorMode === 'traditional') {
        const importedResume = await importResumeJSON();
        setResume(importedResume);
      } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              try {
                const importedFlexibleResume = JSON.parse(e.target?.result as string);
                setFlexibleResume(importedFlexibleResume);
              } catch (error) {
                alert('Failed to import flexible resume. Please check the file format.');
              }
            };
            reader.readAsText(file);
          }
        };
        input.click();
      }
    } catch (error) {
      alert('Failed to import resume. Please check the file format.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data?')) {
      if (editorMode === 'traditional') {
        setResume(defaultResume);
      } else {
        setFlexibleResume(defaultFlexibleResume);
      }
    }
  };

  const handleConvertToFlexible = () => {
    if (confirm('Convert your traditional resume to the flexible format? This will preserve your data but allow more customization.')) {
      const converted = convertToFlexibleResume(resume);
      setFlexibleResume(converted);
      setEditorMode('flexible');
    }
  };

  const handleModeChange = (mode: EditorMode) => {
    setEditorMode(mode);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title">
          <h1>Resume Builder</h1>
          <div className="mode-selector">
            <button 
              className={`mode-btn ${editorMode === 'traditional' ? 'active' : ''}`}
              onClick={() => handleModeChange('traditional')}
            >
              Traditional
            </button>
            <button 
              className={`mode-btn ${editorMode === 'flexible' ? 'active' : ''}`}
              onClick={() => handleModeChange('flexible')}
            >
              Flexible
            </button>
          </div>
        </div>
        
        <div className="action-buttons">
          {editorMode === 'traditional' && (
            <button onClick={handleConvertToFlexible} className="convert-btn">
              Upgrade to Flexible
            </button>
          )}
          <button onClick={handlePrint}>Print / Save as PDF</button>
          <button onClick={handleExport}>
            Export {editorMode === 'traditional' ? 'JSON' : 'Flexible JSON'}
          </button>
          <button onClick={handleImport}>
            Import {editorMode === 'traditional' ? 'JSON' : 'Flexible JSON'}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </header>
      
      <div className="app-content">
        {editorMode === 'traditional' ? (
          <>
            <div className="editor-panel">
              <ResumeEditor resume={resume} onChange={setResume} />
            </div>
            
            <div className="preview-panel">
              <ResumePreview resume={resume} />
            </div>
          </>
        ) : (
          <>
            <div className="editor-panel">
              <FlexibleResumeEditor 
                resume={flexibleResume} 
                onResumeChange={setFlexibleResume} 
              />
            </div>
            
            <div className="preview-panel">
              <FlexibleResumePreview resume={flexibleResume} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;