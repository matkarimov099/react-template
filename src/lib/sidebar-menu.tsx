import {
  BarChart3Icon,
  CalendarIcon,
  FileTextIcon,
  MessageSquareIcon,
  PaletteIcon,
  SettingsIcon,
  ShieldIcon,
  TruckIcon,
  LayoutDashboardIcon,
  ClipboardListIcon,
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
    icon: <LayoutDashboardIcon />,
    items: [
      {
        title: "Reports",
        titleKey: "navigation.reports",
        url: "/dashboard/reports",
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
  {
    title: "Theme Demo",
    titleKey: "navigation.theme_demo",
    url: "/theme-demo",
    icon: <PaletteIcon />,
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
