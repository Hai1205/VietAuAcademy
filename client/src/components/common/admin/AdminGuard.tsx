"use client";

// Note: the server sets the `access-token` cookie as httpOnly for security.
// Client-side code cannot reliably read httpOnly cookies, so using
// `js-cookie` or `document.cookie` here produces false negatives and
// causes unwanted redirects. The Next.js `middleware.ts` located at the
// app root performs server-side redirects based on the cookie. Keep this
// component minimal to avoid clashing with the middleware.
export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  // Render children directly; server middleware enforces access control.
  return <>{children}</>;
}
