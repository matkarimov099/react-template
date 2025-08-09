
Faylni src/styles/ios-theme.css deb saqlang va loyihangizga import qiling (masalan src/index.css yoki src/main.tsx: import './styles/ios-theme.css').


   iOS-like design tokens + components for Tailwind v4 (CSS-first)
   - Copy into your project and import globally (index.tsx / main.tsx)
   - Uses .dark class for dark mode (you can toggle with document.documentElement.classList)
*/

/* Tailwind base + utilities (Tailwind v4 CSS-first) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ============================
   iOS THEME TOKENS (Light)
   ============================ */
:root {
  /* -- scale & geometry */
  --scale-factor: 1;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-pill: 9999px;

  /* Motion (snappy, iOS-like) */
  --motion-short: 120ms;
  --motion-medium: 220ms;
  --motion-long: 340ms;
  --motion-ease: cubic-bezier(.2,.9,.25,1);

  /* Font stack (system SF fallback) */
  --font-sans: -apple-system, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, system-ui, sans-serif;

  /* Semantic tokens (Light mode) - follow Apple HIG naming */
  --background: #FBFBFC;               /* systemBackground */
  --secondaryBackground: #F2F3F5;      /* grouped background */
  --card-bg: rgba(255,255,255,0.82);   /* glassy card */
  --popover-bg: rgba(255,255,255,0.76);
  --label: #1B1B1D;                    /* primary label */
  --secondaryLabel: #6B6C70;           /* secondary label (slate) */
  --tertiaryLabel: rgba(27,27,29,0.48);

  /* System colors */
  --system-blue: #007AFF;              /* systemBlue (Light) */
  --system-blue-500: #0A84FF;
  --system-green: #34C759;
  --system-red: #FF3B30;
  --system-yellow: #FFD60A;
  --system-cyan: #64D2FF;

  /* border / ring */
  --border: rgba(60,60,67,0.12);
  --control-border: rgba(60,60,67,0.10);
  --ring: var(--system-blue);

  /* Input / control BG */
  --control-bg: rgba(255,255,255,0.88);
  --control-ghost-bg: rgba(250,250,250,0.6);

  /* shadow tokens (subtle) */
  --shadow-sm: 0 1px 2px rgba(2,6,23,0.04);
  --shadow-md: 0 6px 18px rgba(2,6,23,0.08);
  --shadow-lg: 0 12px 40px rgba(2,6,23,0.12);

  /* charts */
  --chart-1: var(--system-blue);
  --chart-2: var(--system-green);
  --chart-3: var(--system-yellow);
  --chart-4: var(--system-red);
  --chart-5: var(--system-cyan);

  /* sidebar specific (light) */
  --sidebar-bg: rgba(255,255,255,0.84);
  --sidebar-foreground: var(--label);
  --sidebar-border: rgba(60,60,67,0.10);
  --sidebar-ring: var(--system-blue);
}

/* ============================
   Dark mode tokens (.dark)
   ============================ */
.dark {
  --background: #0B0B0D;               /* near-black iOS-like */
  --secondaryBackground: #121213;
  --card-bg: rgba(255,255,255,0.03);   /* vibrancy veil on dark */
  --popover-bg: rgba(255,255,255,0.04);

  --label: rgba(255,255,255,0.92);
  --secondaryLabel: rgba(255,255,255,0.66);
  --tertiaryLabel: rgba(255,255,255,0.40);

  --system-blue: #0A84FF;
  --system-blue-500: #66B9FF;
  --system-green: #30D158;
  --system-red: #FF453A;
  --system-yellow: #FFD60A;
  --system-cyan: #64D2FF;

  --border: rgba(255,255,255,0.06);
  --control-border: rgba(255,255,255,0.06);
  --ring: var(--system-blue);

  --control-bg: rgba(255,255,255,0.02);
  --control-ghost-bg: rgba(255,255,255,0.03);

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.6);
  --shadow-md: 0 8px 20px rgba(0,0,0,0.55);
  --shadow-lg: 0 20px 50px rgba(0,0,0,0.6);

  --chart-1: var(--system-blue);
  --chart-2: var(--system-green);
  --chart-3: var(--system-yellow);
  --chart-4: var(--system-red);
  --chart-5: var(--system-cyan);

  /* sidebar dark vibrancy (tiny light veil — iOS style) */
  --sidebar-bg: rgba(255,255,255,0.03); /* subtle veil, not muddy */
  --sidebar-foreground: var(--label);
  --sidebar-border: rgba(255,255,255,0.06);
  --sidebar-ring: var(--system-blue);
}

/* ============================
   Base & typography
   ============================ */
@layer base {
  html { font-size: calc(1rem * var(--scale-factor)); }
  body, #root {
    min-height: 100%;
    background: var(--background);
    color: var(--label);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background var(--motion-medium) var(--motion-ease), color var(--motion-medium) var(--motion-ease);
  }

  /* system text sizes aligned with iOS HIG */
  :root { --text-xs: .75rem; --text-sm: .875rem; --text-md: 1rem; --text-lg: 1.125rem; --text-xl: 1.25rem; }
  h1 { font-size: 1.25rem; line-height: 1.2; }
  p, label { font-size: var(--text-md); line-height: 1.35; color: var(--label); }

  /* default link */
  a { color: var(--system-blue); text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* form elements inherit font */
  input, textarea, select, button { font-family: inherit; font-size: var(--text-md); }

  /* custom CSS variables for convenience mapping */
  --ios-bg: var(--background);
  --ios-card: var(--card-bg);
  --ios-popover: var(--popover-bg);
}

/* ============================
   Utilities mapping for Tailwind classes
   (so you can use .bg-ios-background, .text-ios-label, etc.)
   ============================ */
@layer utilities {
  .bg-ios-background { background-color: var(--background) !important; }
  .bg-ios-card { background-color: var(--card-bg) !important; }
  .bg-ios-popover { background-color: var(--popover-bg) !important; }
  .text-ios-label { color: var(--label) !important; }
  .text-ios-muted { color: var(--secondaryLabel) !important; }
  .border-ios { border-color: var(--border) !important; }
  .rounded-ios-sm { border-radius: var(--radius-sm) !important; }
  .rounded-ios-md { border-radius: var(--radius-md) !important; }
  .rounded-ios-lg { border-radius: var(--radius-lg) !important; }
  .shadow-ios-sm { box-shadow: var(--shadow-sm) !important; }
  .shadow-ios-md { box-shadow: var(--shadow-md) !important; }
  .shadow-ios-lg { box-shadow: var(--shadow-lg) !important; }
  .ring-ios { --tw-ring-color: color-mix(in srgb, var(--ring) 12%, transparent) !important; }
}

/* ============================
   Components (Buttons, Inputs, Cards, Sidebar, Popover)
   ============================ */
@layer components {
  /* ---------- Buttons (primary / secondary / ghost / danger) ---------- */
  .btn {
    @apply inline-flex items-center justify-center font-semibold select-none;
    border-radius: var(--radius-md);
    padding: 0.56rem 1.1rem;
    transition: transform var(--motion-short) var(--motion-ease), background var(--motion-medium) var(--motion-ease), box-shadow var(--motion-medium) var(--motion-ease);
    -webkit-tap-highlight-color: transparent;
    backdrop-filter: blur(10px) saturate(150%);
  }

  /* Primary */
  .btn-primary {
    background: var(--system-blue);
    color: #fff;
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0,0,0,0.03);
  }
  .btn-primary:hover,
  .btn-primary:focus {
    background: var(--system-blue-500);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  .btn-primary:active {
    background: color-mix(in srgb, var(--system-blue) 70%, black);
    transform: translateY(0);
    box-shadow: none;
  }

  /* Secondary (green like iOS success) */
  .btn-secondary {
    background: var(--system-green);
    color: #fff;
    border: 1px solid rgba(0,0,0,0.03);
  }
  .btn-secondary:hover,
  .btn-secondary:focus { background: var(--system-green); transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .btn-secondary:active { transform: translateY(0); box-shadow: none; }

  /* Ghost / Outline (transparent) */
  .btn-ghost {
    background: transparent;
    color: var(--label);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover { background: var(--control-ghost-bg); }

  /* Danger / Destructive */
  .btn-danger {
    background: var(--system-red);
    color: white;
    border: 1px solid rgba(0,0,0,0.02);
  }
  .btn-danger:hover { background: var(--system-red); transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .btn-danger:active { transform: translateY(0); box-shadow: none; }

  /* Size modifiers */
  .btn-sm { padding: 0.3rem 0.6rem; font-size: .875rem; border-radius: var(--radius-sm); }
  .btn-md { padding: 0.56rem 1.1rem; font-size: 1rem; }
  .btn-lg { padding: 0.75rem 1.4rem; font-size: 1.125rem; border-radius: var(--radius-lg); }

  /* Icon spacing */
  .btn > .icon { margin-right: 0.5rem; display: inline-flex; align-items: center; }

  /* ---------- Inputs / Selects / Textarea ---------- */
  .input,
  input[type="text"],
  input[type="email"],
  input[type="search"],
  input[type="password"],
  textarea,
  select {
    background: var(--control-bg);
    border: 1px solid var(--control-border);
    padding: 0.56rem 0.75rem;
    border-radius: var(--radius-md);
    color: var(--label);
    transition: box-shadow var(--motion-short) var(--motion-ease), border-color var(--motion-short) var(--motion-ease), background var(--motion-short) var(--motion-ease);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .input::placeholder { color: var(--secondaryLabel); opacity: .9; }
  .input:focus {
    outline: none;
    border-color: var(--ring);
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--ring) 10%, transparent);
  }
  .input[disabled], .input:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ---------- Card ---------- */
  .card {
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    padding: 1rem;
    color: var(--label);
  }

  /* ---------- Popover / Menu ---------- */
  .popover {
    background: var(--popover-bg);
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    color: var(--label);
    padding: .5rem;
  }

  /* ---------- Sidebar ---------- */
  .sidebar {
    background: var(--sidebar-bg);
    color: var(--sidebar-foreground);
    border-right: 1px solid var(--sidebar-border);
    padding: 1rem;
    width: var(--sidebar-width, 17rem);
    min-height: 100vh;
    box-shadow: none;
    backdrop-filter: blur(8px) saturate(140%);
  }
  .sidebar .nav-item {
    display: flex; align-items: center; gap: .75rem; padding: .6rem .5rem; border-radius: var(--radius-md);
    color: var(--sidebar-foreground);
  }
  .sidebar .nav-item:hover { background: color-mix(in srgb, var(--sidebar-bg) 88%, var(--background) 12%); }

  /* ---------- Switch / Toggle ---------- */
  .switch {
    width: 44px; height: 28px; padding: 4px; border-radius: 9999px;
    background: var(--control-bg); border: 1px solid var(--control-border); position: relative; box-sizing: content-box;
    transition: background var(--motion-short) var(--motion-ease), border-color var(--motion-short) var(--motion-ease);
  }
  .switch .knob {
    width: 20px; height: 20px; border-radius: 9999px; background: #fff; transform: translateX(0); transition: transform var(--motion-short) var(--motion-ease);
    box-shadow: 0 2px 6px rgba(2,6,23,0.12);
  }
  .switch.checked { background: var(--system-blue); border-color: color-mix(in srgb, var(--system-blue) 70%, black); }
  .switch.checked .knob { transform: translateX(16px); }

  /* ---------- Divider ---------- */
  .divider { height: 1px; background: var(--border); width: 100%; margin: .5rem 0; border-radius: 1px; }

  /* ---------- Helper text / badges ---------- */
  .badge {
    display: inline-flex; align-items: center; padding: .18rem .5rem; border-radius: 9999px; font-size: .75rem; font-weight: 600;
    background: var(--secondaryBackground); color: var(--label); border: 1px solid var(--border);
  }
  .badge.success { background: color-mix(in srgb, var(--system-green) 14%, var(--secondaryBackground) 86%); color: var(--label); border-color: var(--control-border); }
  .badge.danger { background: color-mix(in srgb, var(--system-red) 14%, var(--secondaryBackground) 86%); color: var(--label); border-color: var(--control-border); }

  /* ---------- Focus utility (explicit) ---------- */
  .focus-ring:focus {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--ring) 10%, transparent);
    outline: none;
    border-color: var(--ring);
  }
}

/* ============================
   Hover lift / generic effects
   ============================ */
@layer utilities {
  .hover-lift { transition: transform var(--motion-short) var(--motion-ease), box-shadow var(--motion-medium) var(--motion-ease); }
  .hover-lift:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .dark .hover-lift:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.45); }
}

/* ============================
   Scrollbar (subtle iOS-like)
   ============================ */
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 8px; }

/* ============================
   Reduced motion accessibility
   ============================ */
@media (prefers-reduced-motion: reduce) {
  :root { --motion-short: 0ms; --motion-medium: 0ms; --motion-long: 0ms; }
  .btn, .switch .knob, .hover-lift { transition: none !important; }
}

/* ============================
   Utility examples for shadcn/ui mapping (optional)
   - Use these classes inside your React components for immediate iOS look
   ============================ */
@layer utilities {
  .ios-btn-primary { @apply btn btn-primary; }
  .ios-btn-ghost { @apply btn btn-ghost; }
  .ios-input { @apply input; }
  .ios-card { @apply card; }
  .ios-popover { @apply popover; }
  .ios-sidebar { @apply sidebar; }
  .ios-switch { @apply switch; }
}
