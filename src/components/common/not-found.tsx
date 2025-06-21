"use client";
import { LampContainer } from "@/components/custom/lamp-container.tsx";
import { LocalizedNavLink } from "@/components/common/localized-nav-link";
import { Button } from "@/components/ui/button.tsx";
import { useI18n } from "@/hooks/use-i18n";
import { motion } from "motion/react";

export function NotFound() {
  const { t } = useI18n();

  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        404 - {t("errors.notFound")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-4 text-center text-slate-400"
      >
        {t("errors.notFoundDescription")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8"
      >
        <Button asChild>
          <LocalizedNavLink to="/">{t("errors.goHome")}</LocalizedNavLink>
        </Button>
      </motion.div>
    </LampContainer>
  );
}
