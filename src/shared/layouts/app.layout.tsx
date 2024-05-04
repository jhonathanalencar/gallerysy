interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="flex min-h-full bg-zinc-900 text-zinc-100">
      <div className="flex-1">{children}</div>
    </main>
  );
}
