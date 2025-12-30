# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Cangjie input method practice application** - a frontend-only React app that helps users practice typing Chinese characters using the Cangjie input method. Users are shown Chinese characters and must type the correct Cangjie code sequence (Latin letters that map to component radicals).

## Development Commands

### Essential Commands
```bash
npm run dev      # Start development server (Vite HMR on localhost:5173)
npm run build    # TypeScript compile + Vite production build
npm run lint     # Run ESLint on all .ts/.tsx files
npm run preview  # Preview production build locally
```

### Development Workflow
- **Dev mode**: `npm run dev` provides hot module reload for fast iteration
- **Type checking**: The build command runs `tsc` before bundling - type errors will fail the build
- **Linting**: ESLint is configured with TypeScript and React rules; max warnings set to 0

## Architecture

### Tech Stack
- **React 19** with TypeScript (strict mode)
- **Vite** as build tool and dev server
- **ESLint** with TypeScript and React plugins
- Frontend-only (no backend)

### Core Application Flow

1. **Data Loading** (`App.tsx`):
   - Loads Cangjie character mappings from `/data/Cangjie5_TC.txt` (word → spelling pairs)
   - Loads frequent words list from `/data/freqword.txt` to filter practice words
   - Randomly selects a character from filtered word bank for practice

2. **Practice Interface** (`PracticeInterface.tsx`):
   - Displays target Chinese character
   - User inputs Cangjie code (Latin letters A-Z)
   - Real-time conversion shows component radicals (e.g., "OIAR" → "人戈日口")
   - Auto-checks answer when input length matches expected length
   - Auto-advances to next word on correct answer (any keypress)

3. **Data Utilities**:
   - `cangjieMapping.ts`: Maps Latin letters to Chinese component radicals (A→日, B→月, etc.)
   - `wordBank.ts`: Parses word bank files, filters by frequent words, provides random selection

### Key Design Patterns

- **Auto-focus**: Input field auto-focuses when new word is selected
- **Auto-check**: Answer validation triggers automatically when user types expected number of characters
- **Auto-advance**: After correct answer, any keypress loads next word (unless typing in input field)
- **Real-time feedback**: Visual indicators (green/red borders) show correctness immediately

### File Organization

```
src/
├── App.tsx                          # Main app, word bank loading, word selection
├── main.tsx                         # React entry point
├── components/
│   └── PracticeInterface.tsx        # Practice UI with input/answer checking
└── utils/
    ├── cangjieMapping.ts            # Letter → component mapping
    └── wordBank.ts                  # Data loading and parsing

public/data/                         # Static data files (served by Vite)
├── Cangjie5_TC.txt                  # Character database (word\tspelling format)
└── freqword.txt                     # Common characters for practice filtering
```

### TypeScript Configuration

- **Strict mode enabled**: All strict TypeScript checks active
- **Separate configs**: `tsconfig.app.json` (app code) and `tsconfig.node.json` (Vite config)
- **Type safety**: All components and utilities are fully typed with interfaces/types

## OpenSpec Workflow

This project uses **OpenSpec** for spec-driven development. Always check `openspec/AGENTS.md` before creating change proposals.

### When to Create Proposals
- New features or capabilities
- Breaking changes (API, behavior)
- Architecture modifications
- Performance optimizations that change behavior

### Quick OpenSpec Commands
```bash
openspec list                    # View active changes
openspec list --specs            # View existing specs
openspec validate <change-id> --strict   # Validate before approval
openspec show <item>             # Display change or spec details
```

### Important Notes
- Read `openspec/AGENTS.md` for full workflow details
- Always validate with `--strict` before requesting approval
- Don't start implementation until proposal is approved
- Use `#### Scenario:` format for all scenarios in spec deltas

## Code Conventions

### Naming
- **Components**: PascalCase (`PracticeInterface.tsx`)
- **Functions/variables**: camelCase (`handleInput`, `userInput`)
- **Constants**: UPPER_SNAKE_CASE (`CANGJIE_TO_COMPONENT`)
- **Types/interfaces**: PascalCase (`WordEntry`, `PracticeInterfaceProps`)

### Component Patterns
- Use functional components with hooks (React 19 best practices)
- TypeScript interfaces for all props
- `useEffect` for side effects (data loading, event listeners)
- `useState` for component state
- `useRef` for DOM element access (e.g., auto-focus input field)

### State Management
- Local state with `useState` for component-specific data
- Context API if shared state is needed across multiple components
- No Redux/external state libraries (keep it simple)

### Styling
- CSS files co-located with components (e.g., `PracticeInterface.css`)
- Standard CSS (no preprocessors currently)
- Responsive design for modern browsers

### Data Files
- Character data stored in `/public/data/` directory
- Files are fetched via `/data/*` paths (Vite serves from `/public`)
- Format: Tab or space-separated values (word, spelling pairs)
- Comments start with `#`

## Important Constraints

- **Frontend-only**: All logic runs client-side, no backend
- **Performance**: Input handling must be responsive (<100ms feedback)
- **Browser targets**: Modern browsers (Chrome, Firefox, Safari, Edge - latest versions)
- **Character sets**: Traditional Chinese characters (Cangjie 5 table)
