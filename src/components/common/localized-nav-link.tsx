import { useI18n } from "@/hooks/use-i18n";
import { addLocaleToPath } from "@/lib/i18n-routing";
import { forwardRef } from "react";
import { NavLink as RouterNavLink, type NavLinkProps } from "react-router";

interface LocalizedNavLinkProps extends Omit<NavLinkProps, "to"> {
  to: string;
}

export const LocalizedNavLink = forwardRef<
  HTMLAnchorElement,
  LocalizedNavLinkProps
>(({ to, ...props }, ref) => {
  const { locale } = useI18n();
  const localizedTo = addLocaleToPath(to, locale);

  return <RouterNavLink ref={ref} to={localizedTo} {...props} />;
});

LocalizedNavLink.displayName = "LocalizedNavLink";
