import { QueryProvider } from "@/providers/QueryProvider";

// Only routes that call query hooks live here, so the rest of the site ships no @tanstack code
export default function QueryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}
