"use client";

// Client-side code cannot read httpOnly cookies. The server-side
// `middleware.ts` enforces redirects for `/auth/*` and `/admin/*` based
// on the httpOnly `access-token` cookie. Keep this guard minimal so we
// don't produce incorrect client-side redirects.
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
