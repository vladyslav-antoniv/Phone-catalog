'use client';

import { Link, usePathname } from '@/shared/i18n/navigation'; 

import { useTranslations } from "next-intl";
import { cn } from '@/lib/utils'; 

export function HeaderNavbar({ className }: { className?: string }) {
  const pathname = usePathname(); 
  const t = useTranslations('Navigation');

  const navItems = [
    { href: "/", label: "home" },
    { href: "/phones", label: "phones" },
    { href: "/tablets", label: "tablets" },
    { href: "/accessories", label: "accessories" },
  ];

  return (
    <ul className={cn('flex flex-row gap-6 font-bold text-muted-foreground uppercase tracking-wider', className)}>
      {navItems.map((item) => {
        const isActive = item.href === '/' 
          ? pathname === '/' 
          : pathname.startsWith(item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'hover:text-foreground transition-colors py-2 border-b-2 border-transparent',
                isActive && 'text-foreground border-foreground'
              )}
            >
              {t(item.label)} 
            </Link>
          </li>
        );
      })}
    </ul>
  );
}