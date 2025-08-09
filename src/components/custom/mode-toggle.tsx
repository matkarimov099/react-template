import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { useTheme } from "@/hooks/use-theme.ts";
import { MonitorIcon, MoonIcon, SunIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const themeOptions = [
  {
    value: "light",
    label: "Light",
    description: "Clean and bright",
    icon: SunIcon,
    gradient: "from-amber-400 to-orange-600",
    iconColor: "text-amber-800 dark:text-amber-400",
  },
  {
    value: "dark", 
    label: "Dark",
    description: "Easy on your eyes",
    icon: MoonIcon,
    gradient: "from-slate-600 to-slate-800",
    iconColor: "text-slate-600 dark:text-slate-400",
  },
  {
    value: "system",
    label: "System",
    description: "Adapts to your OS",
    icon: MonitorIcon,
    gradient: "from-blue-500 to-cyan-500",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
];

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Actual theme'ni aniqlash  
  const currentTheme = themeOptions.find(option => option.value === theme);
  const CurrentIcon = currentTheme?.icon || SunIcon;

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="group relative mr-2 h-9 w-9 p-0 bg-[var(--card-bg)] hover:bg-[var(--control-ghost-bg)] hover:border-[var(--system-blue)]/30 transition-all duration-200 backdrop-blur-md saturate-150 overflow-hidden"
          >
            <div className="relative flex items-center justify-center w-full h-full">
              {/* Icon with rotation animation */}
              <CurrentIcon className={cn(
                "!h-5 !w-5 transition-all duration-300 group-hover:scale-110",
                currentTheme?.iconColor,
                theme === "system" && "animate-pulse"
              )} />
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="px-3 py-2 text-xs font-medium text-[var(--secondaryLabel)] border-b border-[var(--border)]/50">
            Appearance Settings
          </div>
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = theme === option.value;
            
            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setTheme(option.value as "light" | "dark" | "system")}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-3 cursor-pointer rounded-[var(--radius-sm)] mx-1 my-0.5",
                  isSelected && "bg-[var(--system-blue)]/10 text-[var(--system-blue)]"
                )}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative w-8 h-8 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
                    {/* Theme preview background */}
                    <div className={cn(
                      "absolute inset-0 opacity-20 bg-gradient-to-br",
                      option.gradient
                    )} />
                    <Icon className={cn("h-6 w-6 relative z-10", option.iconColor)} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{option.label}</span>
                    <span className="text-xs text-[var(--secondaryLabel)]">
                      {option.description}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-1">
                    <CheckIcon className="h-4 w-4 text-[var(--system-blue)]" />
                  </div>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
