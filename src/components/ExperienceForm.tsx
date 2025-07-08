import { Experience } from '../types/Resume';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export function ExperienceForm({ experiences, onChange }: ExperienceFormProps) {
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    onChange([...experiences, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(
      experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const addAchievement = (expId: string) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    
    updateExperience(expId, 'achievements', [...exp.achievements, '']);
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    
    const newAchievements = [...exp.achievements];
    newAchievements[index] = value;
    updateExperience(expId, 'achievements', newAchievements);
  };

  const removeAchievement = (expId: string, index: number) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    
    updateExperience(
      expId,
      'achievements',
      exp.achievements.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="form-section">
      <h3>Experience</h3>
      {experiences.map((exp) => (
        <div key={exp.id} className="form-item">
          <div className="form-grid">
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
            />
            <input
              type="text"
              placeholder="Position"
              value={exp.position}
              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
            />
            <input
              type="text"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
            />
            <input
              type="text"
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
              disabled={exp.current}
            />
            <label>
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
              />
              Current
            </label>
          </div>
          <textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
            rows={3}
          />
          <div className="achievements-section">
            <h4>Achievements</h4>
            {exp.achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <input
                  type="text"
                  placeholder="Achievement"
                  value={achievement}
                  onChange={(e) => updateAchievement(exp.id, index, e.target.value)}
                />
                <button onClick={() => removeAchievement(exp.id, index)}>Remove</button>
              </div>
            ))}
            <button onClick={() => addAchievement(exp.id)}>Add Achievement</button>
          </div>
          <button onClick={() => removeExperience(exp.id)}>Remove Experience</button>
        </div>
      ))}
      <button onClick={addExperience}>Add Experience</button>
    </div>
  );
}