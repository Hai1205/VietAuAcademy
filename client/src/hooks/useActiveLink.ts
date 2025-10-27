"use client";

import { usePathname } from "next/navigation";

/**
 * Custom hook to determine if a link is active based on the current pathname
 * @param href - The link path to check against the current path
 * @param exact - If true, only exact matches are considered active
 * @returns boolean indicating whether the link is active
 */
export function useActiveLink(href: string, exact: boolean = false): boolean {
    const pathname = usePathname();

    if (exact) {
        return pathname === href;
    }

    // For home page, only exact match
    if (href === '/') {
        return pathname === '/';
    }

    // For other pages, check if pathname starts with href
    return pathname.startsWith(href);
}