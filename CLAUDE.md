# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server (http://localhost:5173)
- `npm run build` - TypeScript check + production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on .ts/.tsx files

## Architecture Overview

This is a React + TypeScript resume builder with a split-panel design:
- **Left panel**: Form-based editor for resume data
- **Right panel**: Live preview with print-optimized styling

### Component Organization Pattern

Components are split by responsibility:
- `*Form.tsx` - Editor components with input fields and state management
- `*Section.tsx` - Display components for the resume preview
- `ResumeEditor.tsx` - Orchestrates all form components
- `ResumePreview.tsx` - Orchestrates all section components

### State Management

- Single source of truth in `App.tsx` using React state
- Data flows down via props, changes flow up via callbacks
- Automatic persistence to localStorage on every change
- Type-safe with comprehensive TypeScript interfaces in `types/Resume.ts`

### Key Technical Decisions

1. **No routing** - Single page application for simplicity
2. **Print CSS** - Extensive @media print rules for PDF generation
3. **localStorage** - Browser storage for data persistence (no backend)
4. **Functional components** - Hooks-based React throughout
5. **CSS over CSS-in-JS** - Traditional CSS for better print control

## Important Development Notes

- **Update README.md when major updates are made to the app**
- All styling must be in CSS files (no inline styles)
- Keep functions under 75 lines
- Use guard clauses for readability
- Follow DRY and SOLID principles

## Data Flow

1. User edits in form components → 
2. onChange handlers update parent state → 
3. State saved to localStorage → 
4. Preview components re-render with new data

## Print/PDF Export

The app uses browser print functionality with optimized CSS:
- Page breaks avoid splitting sections
- Hidden UI elements during print
- Letter-size page formatting
- Professional typography and spacing