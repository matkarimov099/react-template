import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import type { Locale } from "@/lib/i18n";
import { useI18n } from "@/hooks/use-i18n";
import {
  addLocaleToPath,
  removeLocaleFromPath,
} from "@/plugins/i18n-routing.ts";
import { useLocation, useNavigate } from "react-router";
import { CheckIcon, GlobeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Flag images
import uzFlag from "@/assets/flags/uz.svg";
import ruFlag from "@/assets/flags/ru.svg";
import enFlag from "@/assets/flags/en.svg";

const languageOptions = [
  {
    code: "uz" as Locale,
    name: "O'zbekcha",
    description: "Uzbek language",
    flag: uzFlag,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    code: "ru" as Locale,
    name: "Русский",
    description: "Russian language",
    flag: ruFlag,
    gradient: "from-red-500 to-blue-500",
  },
  {
    code: "en" as Locale,
    name: "English",
    description: "English language",
    flag: enFlag,
    gradient: "from-red-500 to-blue-600",
  },
];

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);

    // Update URL with a new locale
    const currentPathWithoutLocale = removeLocaleFromPath(location.pathname);
    const newPath = addLocaleToPath(currentPathWithoutLocale, newLocale);
    navigate(newPath, { replace: true });
  };

  const currentLanguage = languageOptions.find((lang) => lang.code === locale);

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
              {/* Flag or Globe icon */}
              {currentLanguage ? (
                <img 
                  src={currentLanguage.flag} 
                  alt={currentLanguage.name}
                  className="h-6 w-6 transition-all duration-300 group-hover:scale-110 rounded-sm"
                />
              ) : (
                <GlobeIcon className="h-6 w-6 transition-all duration-300 group-hover:scale-110" />
              )}
            </div>
            <span className="sr-only">Change language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="px-3 py-2 text-xs font-medium text-[var(--secondaryLabel)] border-b border-[var(--border)]/50">
            Language Settings
          </div>
          {languageOptions.map((option) => {
            const isSelected = locale === option.code;
            
            return (
              <DropdownMenuItem
                key={option.code}
                onClick={() => handleLanguageChange(option.code)}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-3 cursor-pointer rounded-[var(--radius-sm)] mx-1 my-0.5",
                  isSelected && "bg-[var(--system-blue)]/10 text-[var(--system-blue)]"
                )}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative w-8 h-8 rounded-lg bg-[var(--card-bg)] bder border-[var(--border)] flex items-center justify-center overflow-hidden">
                    <img 
                      src={option.flag} 
                      alt={option.name}
                      className="h-6 w-6 relative z-10 rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{option.name}</span>
                    <span className="text-xs text-[var(--secondaryLabel)]">
                      {option.description}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-1">
                    <CheckIcon className="h-6 w-6 text-[var(--system-blue)]" />
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
