import { Skill } from '../types/Resume';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const addSkillCategory = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      category: '',
      items: []
    };
    onChange([...skills, newSkill]);
  };

  const updateSkillCategory = (id: string, category: string) => {
    onChange(
      skills.map(skill =>
        skill.id === id ? { ...skill, category } : skill
      )
    );
  };

  const updateSkillItems = (id: string, itemsText: string) => {
    const items = itemsText.split(',').map(item => item.trim()).filter(Boolean);
    onChange(
      skills.map(skill =>
        skill.id === id ? { ...skill, items } : skill
      )
    );
  };

  const removeSkillCategory = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  return (
    <div className="form-section">
      <h3>Skills</h3>
      {skills.map((skill) => (
        <div key={skill.id} className="form-item">
          <input
            type="text"
            placeholder="Skill Category (e.g., Programming Languages)"
            value={skill.category}
            onChange={(e) => updateSkillCategory(skill.id, e.target.value)}
          />
          <input
            type="text"
            placeholder="Skills (comma-separated)"
            value={skill.items.join(', ')}
            onChange={(e) => updateSkillItems(skill.id, e.target.value)}
          />
          <button onClick={() => removeSkillCategory(skill.id)}>Remove Category</button>
        </div>
      ))}
      <button onClick={addSkillCategory}>Add Skill Category</button>
    </div>
  );
}