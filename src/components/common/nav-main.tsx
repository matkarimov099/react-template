import { LocalizedNavLink } from "@/components/common/localized-nav-link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar.tsx";
import { useI18n } from "@/hooks/use-i18n";
import { useSidebar } from "@/hooks/use-sidebar";
import { mainMenuItems } from "@/lib/sidebar-menu.tsx";
import { cn } from "@/lib/utils";
import { ChevronRight, Dot } from "lucide-react";
import { useLocation } from "react-router";

export function NavMain() {
  const location = useLocation();
  const { t } = useI18n();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup className={cn(
      "transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
      isCollapsed && "py-2"
    )}>
      <SidebarGroupLabel className={cn(
        "transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
        isCollapsed && "opacity-0 h-0 overflow-hidden"
      )}>
        {t("navigation.menu")}
      </SidebarGroupLabel>
      
      <SidebarMenu>
        {mainMenuItems.map((item) => {
          const isParentActive =
            item.items?.some((subItem) => subItem.url === location.pathname) ||
            (item.url && item.url === location.pathname);
          const hasSubItems = item.items && item.items.length > 0;

          // For collapsed sidebar with subitems, use Popover
          if (isCollapsed && hasSubItems && !item.url) {
            return (
              <SidebarMenuItem key={item.title}>
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton
                      tooltip={t(item.titleKey || item.title)}
                      className={cn(
                        "relative group w-full h-8 w-8 p-0 justify-center transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
                        "hover:bg-gradient-to-br hover:from-[var(--system-blue)]/10 hover:to-[var(--system-blue)]/5 hover:shadow-md hover:scale-105",
                        "dark:hover:from-[var(--system-blue)]/15 dark:hover:to-[var(--system-blue)]/8",
                        isParentActive && "bg-gradient-to-br from-[var(--system-blue)] to-[var(--system-blue)]/80 text-white shadow-lg ring-2 ring-[var(--system-blue)]/30 scale-105"
                      )}
                      data-active={isParentActive}
                    >
                      <div className="relative">
                        {item.icon}
                        {/* Active indicator */}
                        {isParentActive && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse" />
                        )}
                        {/* Sub-items indicator - dots to show expandable menu */}
                        <div className="absolute -bottom-1 -right-1 flex space-x-0.5">
                          <div className="w-1 h-1 bg-[var(--system-blue)] rounded-full opacity-60 animate-pulse" />
                          <div className="w-1 h-1 bg-[var(--system-blue)] rounded-full opacity-40 animate-pulse [animation-delay:0.2s]" />
                          <div className="w-1 h-1 bg-[var(--system-blue)] rounded-full opacity-20 animate-pulse [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent 
                    side="right" 
                    align="start"
                    className="w-48 p-1 ml-2 bg-[var(--content-bg)] backdrop-blur-xl saturate-150 border border-[var(--border)]/50 shadow-2xl"
                  >
                    <div className="p-2 border-b border-[var(--border)]/30">
                      <div className="flex items-center gap-2 text-sm font-medium text-[var(--label)]">
                        {item.icon}
                        {t(item.titleKey || item.title)}
                      </div>
                    </div>
                    <div className="py-1">
                      {item.items?.map((subItem) => {
                        const isSubActive = subItem.url === location.pathname;
                        return (
                          <LocalizedNavLink
                            key={subItem.title}
                            to={subItem.url}
                            className="block"
                          >
                            <div className={cn(
                              "group flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all duration-200 cursor-pointer",
                              "hover:bg-gradient-to-r hover:from-[var(--system-blue)]/8 hover:to-[var(--system-blue)]/4 hover:text-[var(--system-blue)]",
                              "dark:hover:from-[var(--system-blue)]/12 dark:hover:to-[var(--system-blue)]/6",
                              isSubActive && "bg-gradient-to-r from-[var(--system-blue)] to-[var(--system-blue)]/80 text-white font-medium shadow-md ring-1 ring-[var(--system-blue)]/20"
                            )}>
                              <Dot className={cn(
                                "w-3 h-3 transition-colors",
                                isSubActive ? "text-white" : "text-[var(--secondaryLabel)] group-hover:text-[var(--system-blue)]"
                              )} />
                              {t(subItem.titleKey || subItem.title)}
                              {isSubActive && (
                                <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                              )}
                            </div>
                          </LocalizedNavLink>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            );
          }

          // For collapsed sidebar without subitems or expanded sidebar
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive || Boolean(isParentActive)}
            >
              <SidebarMenuItem>
                {item.url ? (
                  <LocalizedNavLink
                    to={item.url}
                    className={({ isActive }) =>
                      cn("w-full", isActive && "font-bold")
                    }
                  >
                    <SidebarMenuButton
                      asChild
                      tooltip={t(item.titleKey || item.title)}
                      className={cn(
                        "group relative transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
                        "hover:bg-gradient-to-br hover:from-[var(--system-blue)]/8 hover:to-[var(--system-blue)]/4 hover:shadow-md hover:scale-[1.02]",
                        "dark:hover:from-[var(--system-blue)]/12 dark:hover:to-[var(--system-blue)]/6",
                        isCollapsed && "justify-center h-8 w-8 p-0 mx-auto"
                      )}
                      data-active={item.url === location.pathname}
                    >
                      <span className={cn(
                        "flex items-center gap-2",
                        isCollapsed && "justify-center h-8 w-8 p-0 mx-auto"
                      )}>
                        <div className="relative">
                          {item.icon}
                          {/* Enhanced active state indicator */}
                          {item.url === location.pathname && (
                            <>
                              <div className="absolute -inset-1 bg-gradient-to-br from-[var(--system-blue)]/15 via-[var(--system-blue)]/8 to-transparent rounded-lg dark:from-[var(--system-blue)]/20 dark:via-[var(--system-blue)]/12 shadow-inner" />
                              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-br from-[var(--system-blue)] to-[var(--system-blue)]/90 rounded-full shadow-md border border-white/20" />
                            </>
                          )}
                        </div>
                        {!isCollapsed && (
                          <span className="transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]">
                            {t(item.titleKey || item.title)}
                          </span>
                        )}
                      </span>
                    </SidebarMenuButton>
                  </LocalizedNavLink>
                ) : (
                  <SidebarMenuButton
                    asChild
                    tooltip={t(item.titleKey || item.title)}
                    className={cn(
                      "group relative transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
                      "hover:bg-gradient-to-br hover:from-[var(--system-blue)]/8 hover:to-[var(--system-blue)]/4 hover:shadow-md hover:scale-[1.02]",
                      "dark:hover:from-[var(--system-blue)]/12 dark:hover:to-[var(--system-blue)]/6",
                      isCollapsed && "justify-center"
                    )}
                    data-active={isParentActive}
                  >
                    <span className={cn(
                      "flex items-center gap-2",
                      isCollapsed && "justify-center"
                    )}>
                      <div className="relative">
                        {item.icon}
                        {/* Enhanced parent active state */}
                        {isParentActive && (
                          <>
                            <div className="absolute -inset-1 bg-gradient-to-br from-[var(--system-blue)]/20 via-[var(--system-blue)]/12 to-transparent rounded-lg dark:from-[var(--system-blue)]/25 dark:via-[var(--system-blue)]/15 shadow-inner" />
                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-br from-[var(--system-orange)] to-[var(--system-orange)]/90 rounded-full shadow-md border border-white/30" />
                          </>
                        )}
                      </div>
                      {!isCollapsed && (
                        <span className="transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]">
                          {t(item.titleKey || item.title)}
                        </span>
                      )}
                    </span>
                  </SidebarMenuButton>
                )}
                
                {/* Expanded sidebar sub-items */}
                {!isCollapsed && hasSubItems && (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className={cn(
                        "transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
                        "hover:bg-gradient-to-br hover:from-[var(--system-blue)]/8 hover:to-[var(--system-blue)]/4 hover:shadow-sm hover:scale-110",
                        "dark:hover:from-[var(--system-blue)]/12 dark:hover:to-[var(--system-blue)]/6",
                        "data-[state=open]:rotate-90 data-[state=open]:text-[var(--system-blue)] data-[state=open]:bg-gradient-to-br data-[state=open]:from-[var(--system-blue)]/10 data-[state=open]:to-[var(--system-blue)]/5"
                      )}>
                        <ChevronRight className="transition-transform duration-200" />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]">
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const isSubActive = subItem.url === location.pathname;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <LocalizedNavLink
                                to={subItem.url}
                                className={({ isActive }) =>
                                  cn("w-full", isActive && "font-bold")
                                }
                              >
                                <SidebarMenuSubButton
                                  asChild
                                  className={cn(
                                    "group relative transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
                                    "hover:bg-gradient-to-r hover:from-[var(--system-blue)]/6 hover:to-transparent hover:shadow-sm hover:translate-x-1",
                                    "dark:hover:from-[var(--system-blue)]/10 dark:hover:to-transparent",
                                    isSubActive && "bg-gradient-to-r from-[var(--system-blue)]/12 via-[var(--system-blue)]/8 to-transparent shadow-sm dark:from-[var(--system-blue)]/15 dark:via-[var(--system-blue)]/10 border-l-2 border-[var(--system-blue)] ml-1 pl-3"
                                  )}
                                  data-active={isSubActive}
                                >
                                  <span className="flex items-center gap-2">
                                    <Dot className={cn(
                                      "w-3 h-3 transition-all duration-200",
                                      isSubActive ? "text-[var(--system-blue)] scale-125 dark:text-[var(--system-blue)]" : "text-[var(--secondaryLabel)] group-hover:text-[var(--system-blue)] dark:text-[var(--tertiaryLabel)] dark:group-hover:text-[var(--system-blue)]"
                                    )} />
                                    <span className="relative">
                                      {t(subItem.titleKey || subItem.title)}
                                      {/* Removed underline for cleaner look */}
                                    </span>
                                    {/* Active indicator */}
                                    {isSubActive && (
                                      <div className="ml-auto w-2 h-2 bg-gradient-to-br from-[var(--system-blue)] to-[var(--system-blue)]/90 rounded-full shadow-md border border-white/30 dark:border-white/20" />
                                    )}
                                  </span>
                                </SidebarMenuSubButton>
                              </LocalizedNavLink>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
