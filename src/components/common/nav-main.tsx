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
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router";
import { removeLocaleFromPath } from "@/plugins/i18n-routing.ts";
import { useState } from "react";

export function NavMain() {
  const location = useLocation();
  const { t } = useI18n();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={cn(
        "px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider transition-opacity duration-200",
        isCollapsed && "opacity-0"
      )}>
        {t("navigation.menu")}
      </SidebarGroupLabel>
      
      <SidebarMenu className="space-y-1">
        {mainMenuItems.map((item) => {
          // Get current path without locale prefix for comparison
          const currentPath = removeLocaleFromPath(location.pathname);
          
          // Check if this item or any of its sub-items is active
          const hasActiveSubItem = item.items?.some((subItem) => subItem.url === currentPath);
          const isDirectlyActive = item.url && item.url !== "" && item.url === currentPath;
          const isParentActive = hasActiveSubItem || isDirectlyActive;
          const hasSubItems = item.items && item.items.length > 0;

          console.log(`Item: ${item.title}`, {
            rawPath: location.pathname,
            currentPath: currentPath,
            itemUrl: item.url,
            hasActiveSubItem,
            isDirectlyActive,
            isParentActive,
            hasSubItems
          });

          // For collapsed sidebar with subitems
          if (isCollapsed && hasSubItems && (!item.url || item.url === "")) {
            return (
              <SidebarMenuItem key={item.title}>
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton
                      tooltip={t(item.titleKey || item.title)}
                      className={cn(
                        "relative h-9 w-9 p-0 rounded-lg transition-all duration-200",
                        "text-gray-900 hover:!bg-blue-500 hover:!text-white",
                        isParentActive && "!text-blue-500 !font-semibold hover:!bg-blue-600"
                      )}
                    >
                      <div className="flex items-center justify-center">
                        {item.icon}
                      </div>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent 
                    side="right" 
                    align="start"
                    className="w-48 p-2 border border-gray-200 bg-white shadow-lg rounded-lg"
                  >
                    <div className="mb-2 pb-2 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        {item.icon}
                        {t(item.titleKey || item.title)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {item.items?.map((subItem) => {
                        const isSubActive = subItem.url === currentPath;
                        return (
                          <LocalizedNavLink
                            key={subItem.title}
                            to={subItem.url}
                            className="block"
                          >
                            <div className={cn(
                              "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors duration-200 cursor-pointer",
                              "text-gray-900 hover:bg-blue-500 hover:text-white",
                              isSubActive && "text-blue-500 font-semibold"
                            )}>
                              <div className={cn(
                                "w-1.5 h-1.5 rounded-full transition-colors",
                                isSubActive ? "bg-blue-500" : "bg-gray-400"
                              )} />
                              {t(subItem.titleKey || subItem.title)}
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

          // For regular items (with or without sub-items)
          const isOpen = openItems.includes(item.title) || isParentActive;
          
          const toggleOpen = () => {
            setOpenItems(prev => 
              prev.includes(item.title) 
                ? prev.filter(id => id !== item.title)
                : [...prev, item.title]
            );
          };

          return (
            <SidebarMenuItem key={item.title}>
                {/* Main item button */}
                {item.url && item.url !== "" ? (
                  // Item with direct URL
                  <LocalizedNavLink to={item.url} className="block">
                    <SidebarMenuButton
                      tooltip={isCollapsed ? t(item.titleKey || item.title) : undefined}
                      className={cn(
                        "relative h-9 px-2 rounded-lg transition-all duration-200 w-full",
                        "text-gray-900 hover:!bg-blue-500 hover:!text-white",
                        isDirectlyActive && "!text-blue-500 !font-semibold hover:!bg-blue-600",
                        isCollapsed && "w-9 p-0 justify-center"
                      )}
                    >
                      <div className={cn(
                        "flex items-center gap-2",
                        isCollapsed && "justify-center"
                      )}>
                        {item.icon}
                        {!isCollapsed && (
                          <span className="font-medium">
                            {t(item.titleKey || item.title)}
                          </span>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </LocalizedNavLink>
                ) : (
                  // Item without direct URL (parent only) - acts as toggle
                  <SidebarMenuButton
                    onClick={hasSubItems ? toggleOpen : undefined}
                    tooltip={isCollapsed ? t(item.titleKey || item.title) : undefined}
                    className={cn(
                      "relative h-9 px-2 rounded-lg transition-all duration-200 w-full",
                      "text-gray-900 hover:!bg-blue-500 hover:!text-white",
                      isParentActive && "!text-blue-500 !font-semibold hover:!bg-blue-600",
                      isCollapsed && "w-9 p-0 justify-center"
                    )}
                  >
                    <div className={cn(
                      "flex items-center gap-2",
                      isCollapsed && "justify-center"
                    )}>
                      {item.icon}
                      {!isCollapsed && (
                        <span className="font-medium">
                          {t(item.titleKey || item.title)}
                        </span>
                      )}
                      {!isCollapsed && hasSubItems && (
                        <ChevronDown className={cn(
                          "ml-auto h-4 w-4 transition-transform duration-300",
                          isOpen && "rotate-180"
                        )} />
                      )}
                    </div>
                  </SidebarMenuButton>
                )}
                
                {/* Sub-items for expanded sidebar */}
                {!isCollapsed && hasSubItems && isOpen && (
                  <div>
                      <SidebarMenuSub className="ml-4 border-l border-gray-200 pl-3 space-y-1">
                        {item.items?.map((subItem) => {
                          const isSubActive = subItem.url === currentPath;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <LocalizedNavLink to={subItem.url} className="block">
                                <SidebarMenuSubButton
                                  className={cn(
                                    "h-8 px-2 rounded-md transition-colors duration-200 w-full",
                                    "text-gray-900 hover:!bg-blue-500 hover:!text-white",
                                    isSubActive && "!text-blue-500 !font-semibold hover:!bg-blue-600"
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className={cn(
                                      "w-1.5 h-1.5 rounded-full transition-colors",
                                      isSubActive ? "bg-blue-500" : "bg-gray-400"
                                    )} />
                                    <span className="text-sm">
                                      {t(subItem.titleKey || subItem.title)}
                                    </span>
                                  </div>
                                </SidebarMenuSubButton>
                              </LocalizedNavLink>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                  </div>
                )}
              </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}