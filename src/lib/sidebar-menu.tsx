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
  url: string;
  icon?: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  privileges?: string[];
  items?: SidebarSubMenuItem[];
}

interface SidebarSubMenuItem {
  title: string;
  url: string;
  icon?: ReactNode;
  disabled?: boolean;
  privileges?: string[];
}

interface SidebarProjectItem {
  title: string;
  url: string;
  icon: ReactNode;
}

interface SidebarFooterItem {
  title: string;
  url: string;
  icon: ReactNode;
}

export const mainMenuItems: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    url: "", // Removed URL for parent with subitems
    icon: <LayoutDashboardIcon size={18} />,
    isActive: true,
    items: [
      {
        title: "Reports",
        url: "/reports",
        icon: <FileTextIcon size={14} />,
      },
    ],
  },
  {
    title: "Users",
    url: "/users",
    icon: <BarChart3Icon />,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: <CalendarIcon />,
  },
  {
    title: "Documents",
    url: "/documents",
    icon: <FileTextIcon />,
  },
];

export const projectItems: SidebarProjectItem[] = [
  {
    title: "E-Commerce",
    url: "/projects/ecommerce",
    icon: <TruckIcon />,
  },
  {
    title: "Social App",
    url: "/projects/social",
    icon: <MessageSquareIcon />,
  },
  {
    title: "Security App",
    url: "/projects/security",
    icon: <ShieldIcon />,
  },
];

export const footerMenuItems: SidebarFooterItem[] = [
  {
    title: "Settings",
    url: "/settings",
    icon: <SettingsIcon />,
  },
  {
    title: "Help",
    url: "/help",
    icon: <FileTextIcon />,
  },
];
