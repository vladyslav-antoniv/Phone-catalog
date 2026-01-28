"use client";

import { Logo } from "@/shared/ui/Logo";
import { Link } from "@/shared/i18n/navigation";
import { useTranslations } from "next-intl";
import { ChevronUp } from "lucide-react";

export const Footer = () => {
  const t = useTranslations("Footer");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { href: "https://github.com/vladyslav-antoniv", label: t("github"), isExternal: true },
    { href: "/contacts", label: t("contacts"), isExternal: false },
    { href: "/rights", label: t("rights"), isExternal: false },
  ];

  return (
    <footer className="border-t bg-background py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          
          <div className="flex justify-center md:justify-start">
        <Logo width={80} height={28} />
            
          </div>

          <nav className="flex flex-col md:flex-row gap-4 md:gap-12 items-center uppercase text-xs font-bold text-muted-foreground tracking-wider">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a 
                  key={link.label} 
                  href={link.href} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={link.label} 
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <div 
              className="flex gap-4 items-center cursor-pointer group" 
              onClick={scrollToTop}
            >
              <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                {t("backToTop")}
              </span>
              <button 
                className="flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-all"
                aria-label="Scroll to top"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};