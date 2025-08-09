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
import { removeLocaleFromPath } from "@/plugins/i18n-routing.ts";

export function NavSecondary({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const location = useLocation();
  const { t } = useI18n();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup className={cn(
      "transition-all duration-200",
      isCollapsed && "px-1"
    )} {...props}>
      <SidebarGroupContent>
        {/* Separator */}
        {!isCollapsed && (
          <div className="w-full h-px bg-gray-200 mb-2" />
        )}
        
        <SidebarMenu className={cn(
          "space-y-1",
          isCollapsed && "items-center"
        )}>
          {footerMenuItems.map((item) => {
            const currentPath = removeLocaleFromPath(location.pathname);
            const isActive = item.url === currentPath;
            
            console.log(`Footer: ${item.title}`, {
              rawPath: location.pathname,
              currentPath: currentPath,
              itemUrl: item.url,
              isActive
            });
            
            return (
              <SidebarMenuItem key={item.title}>
                <LocalizedNavLink to={item.url} className="block">
                  <SidebarMenuButton
                    tooltip={isCollapsed ? t(item.titleKey || item.title) : undefined}
                    className={cn(
                      "relative h-9 px-2 rounded-lg transition-all duration-200 w-full",
                      "text-gray-900 hover:!bg-blue-500 hover:!text-white",
                      isActive && "!text-blue-500 !font-semibold hover:!bg-blue-600",
                      isCollapsed && "w-9 p-0 justify-center"
                    )}
                  >
                    <div className={cn(
                      "flex items-center gap-2",
                      isCollapsed && "justify-center"
                    )}>
                      {item.icon}
                      {!isCollapsed && (
                        <span className="text-xs font-medium">
                          {t(item.titleKey || item.title)}
                        </span>
                      )}
                    </div>
                  </SidebarMenuButton>
                </LocalizedNavLink>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        
        {/* Collapsed mode separator */}
        {isCollapsed && (
          <div className="flex justify-center pt-2">
            <div className="w-4 h-px bg-gray-300" />
          </div>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}