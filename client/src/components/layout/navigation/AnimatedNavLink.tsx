"use client";

import Link from "next/link";
import { useActiveLink } from "@/hooks/useActiveLink";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import styles from "./navlink.module.css";

interface AnimatedNavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  exact?: boolean;
  onClick?: () => void;
}

export function AnimatedNavLink({
  href,
  children,
  className,
  exact = false,
  onClick,
}: AnimatedNavLinkProps) {
  const isActive = useActiveLink(href, exact);

  return (
    <div className={styles.navLinkContainer}>
      <Link
        href={href}
        prefetch={true}
        onClick={onClick}
        className={cn(styles.navLink, isActive ? styles.active : "", className)}
      >
        {children}
      </Link>
    </div>
  );
}
