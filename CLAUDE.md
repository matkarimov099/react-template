# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `bun dev` - Start development server (runs on localhost:3000)
- `bun run build` - Build for production (TypeScript compilation + Vite build)
- `bun run preview` - Preview production build locally
- `bun run format` - Format code with Biome
- `bun run lint` - Lint and auto-fix code with Biome

### Package Manager
- Uses **Bun** as the primary package manager
- npm/yarn alternatives work but Bun is preferred for consistency

## Project Architecture

### Technology Stack
- **React 19** with TypeScript
- **Vite 6.3.5** for build tooling
- **React Router v7** with internationalized routing
- **TanStack Query v5** for server state management
- **Tailwind CSS v4** with Shadcn/ui components
- **Biome** for linting and formatting (replaces ESLint/Prettier)
- **Zod** + React Hook Form for form validation

### Key Architectural Patterns

#### 1. Feature-Based Organization
```
src/features/
├── auth/           # Authentication feature
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── schema/
│   └── types.ts
└── users/          # User management feature
    ├── components/
    ├── hooks/
    ├── services/
    ├── schema/
    └── types.ts
```

#### 2. Internationalized Routing
- All routes are prefixed with locale: `/:locale/dashboard`
- Supported locales: `uz`, `ru`, `en` (Uzbek is default)
- Automatic locale detection and redirection from root `/`
- URL structure: `/:locale/auth` for auth routes, `/:locale/*` for main app

#### 3. Authentication System
- JWT token-based authentication with automatic refresh
- Protected routes using route loaders (currently commented out in src/router/index.tsx:50)
- Authentication context provides: `authToken`, `currentUser`, `logout`, `isLoading`, `isLoggedIn`
- Axios interceptors handle token attachment and refresh logic

#### 4. State Management Strategy
- **Server State**: TanStack Query for API data, caching, and synchronization
- **Global State**: React Context for auth, theme, i18n, sidebar state
- **Local State**: React useState/useReducer for component state
- **Form State**: React Hook Form for complex forms

#### 5. Data Table System
Advanced reusable data table component with:
- Column resizing, sorting, filtering
- Server-side pagination
- Export functionality (Excel via exceljs)
- Bulk actions and row selection
- URL-based state persistence
- Keyboard navigation support

#### 6. Component Architecture
```
components/
├── common/         # Shared app components (sidebar, auth-guard, etc.)
├── custom/         # Custom animated components (3D cards, lamp effects)
├── data-table/     # Advanced table system
└── ui/             # Shadcn/ui base components
```

### HTTP Client Configuration
- **Main client** (`axiosClient`): Authenticated requests with interceptors
- **Public client** (`publicAxiosClient`): Unauthenticated requests (login, etc.)
- Base URL from `VITE_API_URL` environment variable
- Automatic token refresh on 401 responses
- Request/response interceptors for token management

### Styling and UI
- **Tailwind CSS v4** with custom configuration
- **Shadcn/ui** component library
- CSS-in-JS using class-variance-authority for component variants
- Theme system with dark/light mode support
- Responsive design with mobile-first approach

### Code Quality
- **Biome configuration**: Tab indentation, single quotes, organize imports
- **TypeScript**: Strict mode enabled
- File structure enforces separation of concerns
- Consistent naming conventions across features

## Development Guidelines

### Environment Variables
Required in `.env`:
```
VITE_API_URL=your_api_base_url
VITE_API_BASE_URL=your_api_base_url  # Fallback
```

### Adding New Features
1. Create feature directory in `src/features/`
2. Follow established patterns: components, hooks, services, schema, types
3. Add routes to appropriate router file (`auth-routes.tsx` or `main-routes.tsx`)
4. Add translations to `src/messages/` files if needed
5. Update navigation in `src/lib/sidebar-menu.tsx`

### Form Development
- Use React Hook Form + Zod schema validation
- Schema files in `feature/schema/`
- Follow pattern established in `src/features/auth/schema/auth.schema.ts`
- Error handling through form state and toast notifications

### API Integration
- Create service functions in `feature/services/`
- Use TanStack Query hooks for data fetching
- Follow patterns in `src/features/users/hooks/use-users.ts`
- Handle loading states and error boundaries

### Internationalization
- Add translations to all three language files: `en.json`, `ru.json`, `uz.json`
- Use nested keys for organization: `"dashboard.users.title"`
- Access translations with `useI18n()` hook
- Date formatting handled automatically per locale