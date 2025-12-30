# Project Context

## Purpose
Chinese input method practice

## Tech Stack
Frontend only, React 19, Typescript

## Project Conventions

### Code Style
- **Language**: TypeScript with strict mode enabled
- **Formatting**: Prefer Prettier with default settings (2 spaces, single quotes optional)
- **Naming**:
  - Components: PascalCase (`InputMethodPractice.tsx`)
  - Functions/variables: camelCase (`handleInput`, `userInput`)
  - Constants: UPPER_SNAKE_CASE (`MAX_INPUT_LENGTH`)
  - Types/interfaces: PascalCase (`InputMethodConfig`)
- **File organization**: Feature-based structure preferred over type-based
- **Imports**: Use absolute imports when possible, group: external → internal → relative

### Architecture Patterns
- **Component structure**: Functional components with hooks
- **State management**: React hooks (useState, useReducer) for local state; consider Context API for shared state
- **Data fetching**: React Query or native fetch with useEffect for async operations
- **Styling**: CSS Modules or styled-components (TBD based on preference)
- **Component composition**: Prefer composition over inheritance, small focused components

### Testing Strategy
- **Framework**: Vitest or Jest for unit tests
- **Component testing**: React Testing Library
- **Coverage**: Aim for critical path coverage (input handling, validation logic)
- **E2E**: Consider Playwright or Cypress for user flows (optional)

### Git Workflow
- **Branching**: Main branch for production-ready code
- **Commits**: Conventional commits format preferred (`feat:`, `fix:`, `refactor:`, `docs:`)
- **PRs**: Required for all changes, include description of changes

## Domain Context
- **Chinese Input Methods**: Support for common input methods (Pinyin, Zhuyin, Wubi, etc.)
- **Practice focus**: User typing practice with feedback on accuracy, speed, and character recognition
- **Character sets**: Support for Simplified and/or Traditional Chinese characters
- **Input validation**: Real-time validation of input method sequences and character output

## Important Constraints
- **Frontend-only**: No backend required initially; all logic runs client-side
- **Browser compatibility**: Target modern browsers (Chrome, Firefox, Safari, Edge latest versions)
- **Performance**: Input handling must be responsive (<100ms latency for feedback)
- **Accessibility**: WCAG 2.1 AA compliance for screen readers and keyboard navigation

## External Dependencies
- **React 19**: Core framework
- **TypeScript**: Type safety and developer experience
- **Build tool**: Vite
- **Chinese character data**: May require external libraries or datasets for input method conversion
    /data/Cangjie5_TC.txt - key (word) - value (spelling)
