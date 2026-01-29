"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";

export function BreadCrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").slice(2);

  const hiddenRoutes = ["cart", "sign-in", "sign-up", "checkout"];

  if (segments.length === 0 || segments.some((r) => hiddenRoutes.includes(r))) {
    return null;
  }

  // "mobile-phones" -> "Mobile Phones"
  function transformName(name: string) {
    return name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Reconstruct path
  const buildPath = (index: number) => {
    return "/" + segments.slice(0, index + 1).join("/");
  };

  return (
    <Breadcrumb className="m-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/en">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((seg, i) => {
          const isLast = i === segments.length - 1;
          const path = buildPath(i);
          const name = transformName(seg);

          return (
            <Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={path}>{name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
