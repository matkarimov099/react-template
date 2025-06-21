import {
  BarChart3Icon,
  CalendarIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  SettingsIcon,
  ShieldIcon,
  TruckIcon,
} from "lucide-react";
import type { ReactNode } from "react";

interface SidebarMenuItem {
  title: string;
  titleKey?: string; // Translation key
  url: string;
  icon?: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  privileges?: string[];
  items?: SidebarSubMenuItem[];
}

interface SidebarSubMenuItem {
  title: string;
  titleKey?: string; // Translation key
  url: string;
  icon?: ReactNode;
  disabled?: boolean;
  privileges?: string[];
}

interface SidebarProjectItem {
  title: string;
  titleKey?: string; // Translation key
  url: string;
  icon: ReactNode;
}

interface SidebarFooterItem {
  title: string;
  titleKey?: string; // Translation key
  url: string;
  icon: ReactNode;
}

export const mainMenuItems: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    titleKey: "navigation.dashboard",
    url: "", // Removed URL for parent with subitems
    icon: <LayoutDashboardIcon size={18} />,
    isActive: true,
    items: [
      {
        title: "Reports",
        titleKey: "navigation.reports",
        url: "/reports",
        icon: <FileTextIcon size={14} />,
      },
    ],
  },
  {
    title: "Users",
    titleKey: "navigation.users",
    url: "/users",
    icon: <BarChart3Icon />,
  },
  {
    title: "Calendar",
    titleKey: "navigation.calendar",
    url: "/calendar",
    icon: <CalendarIcon />,
  },
  {
    title: "Documents",
    titleKey: "navigation.documents",
    url: "/documents",
    icon: <FileTextIcon />,
  },
];

export const projectItems: SidebarProjectItem[] = [
  {
    title: "E-Commerce",
    titleKey: "navigation.ecommerce",
    url: "/projects/ecommerce",
    icon: <TruckIcon />,
  },
  {
    title: "Social App",
    titleKey: "navigation.social",
    url: "/projects/social",
    icon: <MessageSquareIcon />,
  },
  {
    title: "Security App",
    titleKey: "navigation.security",
    url: "/projects/security",
    icon: <ShieldIcon />,
  },
];

export const footerMenuItems: SidebarFooterItem[] = [
  {
    title: "Settings",
    titleKey: "navigation.settings",
    url: "/settings",
    icon: <SettingsIcon />,
  },
  {
    title: "Help",
    titleKey: "navigation.help",
    url: "/help",
    icon: <FileTextIcon />,
  },
];
