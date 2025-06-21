# React Dashboard Template

A modern and professional dashboard application built with React 19, TypeScript, and Vite. This project includes comprehensive user management, data visualization, internationalization, and many other enterprise-level features for a complete admin panel solution.

## 🚀 Features

### Core Features

- 🔐 **Authentication** - Secure JWT token-based login/logout system
- 👥 **User Management** - Complete CRUD operations with role-based access
- 📊 **Data Tables** - Advanced tables with search, filtering, sorting, and export
- 🌐 **Internationalization** - Multi-language support (English, Russian, Uzbek)
- 🎨 **Modern UI** - Beautiful interface using Shadcn/ui components and Tailwind CSS
- 📱 **Responsive Design** - Optimized for all screen sizes and devices
- 🌙 **Theme Support** - Dark/Light mode with user preference persistence
- 📈 **Charts & Analytics** - Interactive charts and data visualization with Recharts
- � **Form Management** - Advanced forms with validation using React Hook Form + Zod
- 🔄 **Real-time Updates** - Optimistic updates and real-time data synchronization

### Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6.3.5 with Hot Module Replacement
- **Routing**: React Router v7 with nested routing
- **State Management**: TanStack Query v5 + React Context
- **UI Framework**: Tailwind CSS v4 + Shadcn/ui components
- **Form Handling**: React Hook Form v7 with Zod schema validation
- **Data Visualization**: Recharts v2 for charts and graphs
- **HTTP Client**: Axios with interceptors and error handling
- **Code Quality**: Biome for formatting and linting
- **Animation**: Framer Motion for smooth animations
- **Icons**: Lucide React icon library

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ or Bun (recommended)
- Git

### Quick Start

1. **Clone the repository**

```bash
git clone <repository-url>
cd new-dashboard
```

2. **Install dependencies**

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install

# Or using yarn
yarn install
```

3. **Start development server**

```bash
# Using Bun
bun dev

# Or using npm
npm run dev
```

The application will start at http://localhost:3000

## 🛠 Available Scripts

```bash
# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Format code with Biome
bun run format

# Lint code with Biome
bun run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (sidebar, nav, etc.)
│   ├── custom/          # Custom UI components (3D cards, animations)
│   ├── data-table/      # Advanced data table components
│   └── ui/              # Shadcn/ui base components
├── context/             # React Context providers
├── features/            # Feature-based code organization
│   ├── auth/           # Authentication features
│   └── users/          # User management features
├── hooks/              # Custom React hooks
├── layout/             # Layout components (Auth, Default)
├── lib/                # Utility functions and configurations
├── messages/           # Internationalization files
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   └── users/          # User management pages
├── plugins/            # Third-party configurations
├── provider/           # Context providers setup
├── router/             # Routing configuration
├── services/           # API services and HTTP clients
├── styles/             # Global styles and CSS
└── types/              # TypeScript type definitions
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_NAME=Dashboard
VITE_JWT_SECRET=your_jwt_secret
```

### Internationalization

The project supports 3 languages out of the box:

- 🇺🇸 English (`en`)
- 🇷🇺 Russian (`ru`)
- 🇺🇿 Uzbek (`uz`)

Translation files are located in `src/messages/` directory.

### Theme Configuration

The application supports both light and dark themes with automatic system preference detection.

## 🎨 UI Components

Built with [Shadcn/ui](https://ui.shadcn.com/) component library:

### Form Components

- **Button** - Various sizes and variants
- **Input** - Text, password, phone number inputs
- **Label** - Accessible form labels
- **Checkbox** - Custom styled checkboxes
- **Select** - Dropdown selections

### Layout Components

- **Sidebar** - Collapsible navigation sidebar
- **Dialog** - Modal dialogs and confirmations
- **Popover** - Contextual pop-up content
- **Tooltip** - Helpful hover information

### Data Display

- **Table** - Advanced data tables with sorting
- **Avatar** - User profile pictures
- **Badge** - Status indicators
- **Card** - Content containers
- **Separator** - Visual dividers

### Navigation

- **Breadcrumb** - Hierarchical navigation
- **Command** - Command palette interface
- **Dropdown Menu** - Context menus

## 📊 Data Management

### State Management Architecture

- **TanStack Query** - Server state management with caching
- **React Context** - Global state for auth, theme, and i18n
- **Local Storage** - Persistent user preferences

### Form Handling

- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **Error Handling** - Comprehensive error states

### API Integration

- **Axios** - HTTP client with interceptors
- **JWT Authentication** - Token-based security
- **Request/Response Transformation** - Data normalization

## 🔐 Authentication System

### Features

- JWT token-based authentication
- Automatic token refresh
- Protected routes with role-based access
- Persistent login sessions
- Secure logout with token cleanup

### Implementation

```tsx
// Example: Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return <Navigate to="/auth/login" />;

  return <>{children}</>;
}
```

## 🌐 Internationalization (i18n)

### Features

- URL-based locale routing (`/en/dashboard`, `/ru/dashboard`)
- Dynamic language switching
- Lazy-loaded translations
- Date and number formatting per locale
- RTL support ready

### Usage

```tsx
// Using translations in components
const { t } = useI18n();

return <h1>{t("dashboard.welcome")}</h1>;
```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features

- Mobile-first approach
- Touch-friendly interfaces
- Adaptive navigation
- Optimized performance on all devices

## 🚀 Production Deployment

### Building for Production

1. **Create production build**

```bash
bun run build
```

2. **Preview production build locally**

```bash
bun run preview
```

3. **Deploy to hosting platforms**

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify

```bash
# Build and deploy
npm run build
# Upload dist/ folder to Netlify
```

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 👨‍💻 Development Guidelines

### Code Style & Standards

- **Biome** for consistent formatting and linting
- **TypeScript** strict mode enabled
- **ESLint** with React and TypeScript rules
- **Conventional Commits** for commit messages

### Component Development

```tsx
// Example: Creating a new component
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### Custom Hooks

```ts
// Example: Custom hook for API calls
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/user-service";

export function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId,
  });
}
```

### Testing (Setup Ready)

```bash
# Install testing dependencies
bun add -d @testing-library/react @testing-library/jest-dom vitest jsdom

# Run tests
bun test
```

## 📈 Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
bun run build --analyze
```

### Code Splitting

- Route-based code splitting implemented
- Lazy loading for heavy components
- Dynamic imports for better performance

### Caching Strategy

- TanStack Query for API response caching
- Service Worker ready for offline support
- Static asset caching with Vite

## 🔧 Customization

### Adding New Features

1. Create feature directory in `src/features/`
2. Add routes in `src/router/`
3. Create necessary components and hooks
4. Add translations if needed
5. Update navigation menus

### Styling

- Modify `tailwind.config.js` for design tokens
- Add custom CSS in `src/styles/`
- Use CSS variables for theme customization

### API Integration

- Add new services in `src/services/`
- Create corresponding TypeScript types
- Implement error handling and loading states

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   bun run lint
   bun run format
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/):

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👥 Author & Team

**Matkarim Matkarimov** - [https://scala.uz](https://scala.uz)

## 🆘 Support & Help

If you encounter any issues or need help:

1. Check the GitHub Issues section for existing problems
2. Create a new issue with detailed information
3. Contact us at [scala.uz](https://scala.uz)
4. Join our community discussions

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [React](https://reactjs.org/) team for the amazing framework
- [TanStack](https://tanstack.com/) for the excellent data fetching libraries

---

**Made with ❤️ by the Scala.uz team**
