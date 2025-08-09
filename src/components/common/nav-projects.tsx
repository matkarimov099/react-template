import { LocalizedNavLink } from "@/components/common/localized-nav-link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { useI18n } from "@/hooks/use-i18n";
import { useSidebar } from "@/hooks/use-sidebar";
import { projectItems } from "@/lib/sidebar-menu.tsx";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router";

export function NavProjects() {
  const location = useLocation();
  const { t } = useI18n();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup className={cn(
      "group-data-[collapsible=icon]:hidden",
      isCollapsed && "px-1 pt-3"
    )}>
      <SidebarGroupLabel className={cn(
        "transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
        isCollapsed && "opacity-0 h-0 overflow-hidden"
      )}>
        {t("navigation.projects")}
      </SidebarGroupLabel>
      
      <SidebarMenu>
        {projectItems.map((item) => {
          const isActive = item.url === location.pathname;
          
          return (
            <SidebarMenuItem key={item.title}>
              <LocalizedNavLink
                to={item.url}
                className={({ isActive }) => {
                  return isActive ? "w-full font-bold" : "w-full";
                }}
              >
                <SidebarMenuButton
                  asChild
                  tooltip={isCollapsed ? t(item.titleKey || item.title) : undefined}
                  className={cn(
                    "group relative transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
                    "hover:bg-[var(--control-ghost-bg)] hover:shadow-md hover:scale-[1.02]",
                    isCollapsed && "justify-center",
                    isActive && "shadow-lg ring-2 ring-[var(--system-blue)]/20"
                  )}
                  data-active={isActive}
                >
                  <span className={cn(
                    "flex items-center gap-2",
                    isCollapsed && "justify-center"
                  )}>
                    <div className="relative">
                      {item.icon}
                      {/* Enhanced active state with project-specific styling */}
                      {isActive && (
                        <>
                          <div className="absolute -inset-1 bg-gradient-to-br from-[var(--system-blue)]/20 via-transparent to-[var(--system-blue)]/10 rounded-lg animate-pulse" />
                          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[var(--system-green)] rounded-full animate-ping" />
                          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[var(--system-green)] rounded-full" />
                        </>
                      )}
                      {/* Project activity indicator for collapsed mode */}
                      {isCollapsed && (
                        <div className={cn(
                          "absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full transition-all duration-200",
                          isActive 
                            ? "bg-[var(--system-green)] animate-pulse" 
                            : "bg-[var(--secondaryLabel)] opacity-40 group-hover:opacity-100"
                        )} />
                      )}
                    </div>
                    {!isCollapsed && (
                      <span className={cn(
                        "transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)] relative",
                        isActive && "font-semibold"
                      )}>
                        {t(item.titleKey || item.title)}
                        {/* Removed underline for cleaner look */}
                      </span>
                    )}
                    {/* Status badge for expanded active state */}
                    {!isCollapsed && isActive && (
                      <div className="ml-auto flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-[var(--system-green)] rounded-full animate-pulse" />
                        <span className="text-xs text-[var(--system-green)] font-medium">Active</span>
                      </div>
                    )}
                  </span>
                </SidebarMenuButton>
              </LocalizedNavLink>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
