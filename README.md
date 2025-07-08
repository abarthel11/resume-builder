# Resume Builder

A modern, dynamic resume builder application built with React and TypeScript. Create, edit, and export professional resumes with ease.

## Features

- **Real-time Editing**: Live preview updates as you type
- **PDF Export**: Print-optimized styling for professional PDF generation
- **Data Persistence**: Automatic saving to browser local storage
- **Import/Export**: Save and load resume data as JSON files
- **Responsive Design**: Clean, professional layout optimized for both screen and print
- **TypeScript**: Full type safety for reliable development
- **Modular Components**: Well-organized, maintainable code structure

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173/`

## Usage

### Creating Your Resume

1. **Contact Information**: Enter your name, email, phone, location, and professional links
2. **Summary**: Write a brief professional summary
3. **Experience**: Add work experiences with achievements
4. **Education**: List your educational background
5. **Skills**: Organize skills by categories
6. **Projects**: Showcase personal or professional projects (optional)

### Saving Your Resume

- **Print/PDF**: Click "Print / Save as PDF" or press `Ctrl/Cmd + P`
- **Export JSON**: Save your resume data as a JSON file for backup
- **Import JSON**: Load previously saved resume data
- **Auto-save**: Changes are automatically saved to browser storage

### Sample Data

A sample resume file (`sample-resume.json`) is included to demonstrate the format and features.

## Project Structure

```
resume-builder/
├── src/
│   ├── components/
│   │   ├── ContactSection.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── EducationSection.tsx
│   │   ├── EducationForm.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── SkillsForm.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ResumePreview.tsx
│   │   └── ResumeEditor.tsx
│   ├── types/
│   │   └── Resume.ts
│   ├── utils/
│   │   └── storage.ts
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── sample-resume.json
```

## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS** - Styling with print optimization
- **LocalStorage API** - Data persistence

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project follows:
- SOLID principles
- DRY (Don't Repeat Yourself) principles
- Maximum function length of 75 lines
- No inline styles
- Guard clauses for better readability

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and TypeScript
- Print styling optimized for professional resumes
- Designed for ease of use and customization