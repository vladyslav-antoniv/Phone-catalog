import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Список усіх мов, які ти підтримуєш
  locales: ['en', 'ua'], 
  
  // Мова за замовчуванням (якщо в URL немає префікса)
  defaultLocale: 'en',
  
  // 'always' = завжди додавати префікс (/en/about)
  // 'as-needed' = не додавати для дефолтної (/about для англ, /ua/about для укр)
  localePrefix: 'always' 
});

// Експортуємо типізовані функції навігації
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);