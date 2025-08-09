import { LocalizedNavLink } from "@/components/common/localized-nav-link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { useI18n } from "@/hooks/use-i18n";
import { useSidebar } from "@/hooks/use-sidebar";
import { footerMenuItems } from "@/lib/sidebar-menu.tsx";
import { cn } from "@/lib/utils";
import type * as React from "react";
import { useLocation } from "react-router";

export function NavSecondary({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const location = useLocation();
  const { t } = useI18n();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup className={cn(
      "transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
      isCollapsed && "px-1"
    )} {...props}>
      <SidebarGroupContent>
        {/* Subtle separator */}
        {!isCollapsed && (
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)]/50 to-transparent mb-2" />
        )}
        
        <SidebarMenu className={cn(
          "gap-1",
          isCollapsed && "items-center"
        )}>
          {footerMenuItems.map((item) => {
            const isActive = item.url === location.pathname;
            
            return (
              <SidebarMenuItem key={item.title}>
                <LocalizedNavLink
                  to={item.url}
                  className={({ isActive }) =>
                    cn("w-full", isActive && "font-bold")
                  }
                >
                  <SidebarMenuButton
                    asChild
                    size="sm"
                    tooltip={isCollapsed ? t(item.titleKey || item.title) : undefined}
                    className={cn(
                      "group relative transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
                      "hover:bg-[var(--control-ghost-bg)] hover:shadow-sm hover:scale-[1.02]",
                      isCollapsed && "justify-center h-8 w-8",
                      isActive && "bg-[var(--fill-quaternary)] shadow-sm"
                    )}
                    data-active={isActive}
                  >
                    <span className={cn(
                      "flex items-center gap-2",
                      isCollapsed && "justify-center"
                    )}>
                      <div className="relative">
                        {item.icon}
                        {/* Subtle active indicator for secondary nav */}
                        {isActive && (
                          <div className="absolute -inset-0.5 bg-[var(--fill-quaternary)] rounded-md opacity-30" />
                        )}
                        {/* Small dot indicator for collapsed mode */}
                        {isCollapsed && isActive && (
                          <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-[var(--label)] rounded-full" />
                        )}
                      </div>
                      {!isCollapsed && (
                        <span className={cn(
                          "text-xs transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
                          "text-[var(--secondaryLabel)] group-hover:text-[var(--label)]",
                          isActive && "text-[var(--label)] font-medium"
                        )}>
                          {t(item.titleKey || item.title)}
                        </span>
                      )}
                    </span>
                  </SidebarMenuButton>
                </LocalizedNavLink>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        
        {/* Collapsed mode visual separator */}
        {isCollapsed && (
          <div className="flex justify-center pt-2">
            <div className="w-4 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
          </div>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
