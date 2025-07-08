import { Resume } from '../types/Resume';

const STORAGE_KEY = 'resume-data';

export function saveResume(resume: Resume): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
}

export function loadResume(): Resume | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function exportResumeJSON(resume: Resume): void {
  const dataStr = JSON.stringify(resume, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'resume-data.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export function importResumeJSON(): Promise<Resume> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const resume = JSON.parse(e.target?.result as string);
          resolve(resume);
        } catch (error) {
          reject(new Error('Invalid JSON file'));
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  });
}