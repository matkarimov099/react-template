# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (Vite on port 3000)
bun dev

# Build for production (TypeScript compilation + Vite build)
bun run build

# Preview production build
bun run preview

# Format code using Biome (tab indentation, single quotes)
bun run format

# Lint code using Biome (recommended rules enabled)
bun run lint
```

## Architecture Overview

This is a modern React 19 dashboard application built with TypeScript, featuring enterprise-level patterns and internationalization.

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Routing**: React Router v7 with internationalized routes (/:locale/path)
- **State Management**: TanStack Query v5 + React Context
- **UI**: Shadcn/ui components + Tailwind CSS v4 + Radix UI
- **Forms**: React Hook Form + Zod validation
- **Data Tables**: TanStack Table with advanced features
- **Internationalization**: React i18next (en/ru/uz locales)
- **HTTP Client**: Axios with JWT interceptors
- **Code Quality**: Biome formatter/linter + ESLint

### Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (sidebar, nav, auth-guard)
│   ├── custom/          # Custom UI components (3d-card, animations)
│   ├── data-table/      # Advanced table system with export/resize/search
│   └── ui/              # Shadcn/ui base components
├── features/            # Feature-based organization
│   ├── auth/           # Authentication (JWT, forms, guards)
│   └── users/          # User management (CRUD, table, actions)
├── hooks/              # Custom React hooks
├── layout/             # Layout components (AuthLayout, DefaultLayout)
├── lib/                # Utilities (i18n, auth, sidebar config)
├── pages/              # Page components organized by routes
├── plugins/            # Third-party configurations (axios setup)
├── provider/           # Context providers (theme, i18n, auth)
├── router/             # Route definitions and loaders
└── services/           # API services and HTTP clients
```

### Key Architecture Patterns

1. **Feature-Based Organization**: Code is organized by domain features (auth, users) with complete separation of concerns
2. **Internationalized Routing**: All routes are prefixed with locale (/:locale/dashboard)
3. **Layout System**: Separate layouts for authenticated and non-authenticated areas
4. **Advanced Data Tables**: Reusable table system with sorting, filtering, export, column resizing
5. **JWT Authentication**: Automatic token refresh with axios interceptors
6. **Theme System**: Dark/light mode with system preference detection

### Configuration Files

- `biome.json`: Code formatting (tabs, single quotes) and linting configuration
- `vite.config.ts`: Build configuration with manual chunking for performance
- `tsconfig.json`: TypeScript paths (@/* aliases to src/*)
- Path aliases: Use `@/` for src/ imports throughout the codebase

### Authentication Flow

Authentication uses JWT tokens with automatic refresh:
- Login creates access/refresh token pair
- Axios interceptor adds Bearer token to requests
- 401 responses trigger automatic token refresh
- Failed refresh redirects to login

### Internationalization (i18n)

- Three languages supported: English (en), Russian (ru), Uzbek (uz)
- URL-based locale routing: `/en/dashboard`, `/ru/users`
- Translation files in `src/messages/`
- Locale stored in localStorage with fallback detection

### Data Table System

The data-table component provides enterprise-level functionality:
- Column sorting, filtering, and resizing
- Row selection with bulk actions
- Data export (Excel, CSV)
- URL state persistence
- Keyboard navigation
- Conditional row styling

### Environment Variables

Required variables in `.env`:
```
VITE_API_URL=your_api_base_url
```

## Development Guidelines

- Follow existing component patterns in features/ directories
- Use TypeScript strict mode - all types are defined in types.ts files
- Implement proper error handling with try/catch and error boundaries
- Use React Hook Form + Zod for all forms
- Follow the established i18n patterns for any user-facing text
- Implement loading states and optimistic updates where appropriate
- Use the existing axios configuration for API calls