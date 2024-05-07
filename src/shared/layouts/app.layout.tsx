import { Header } from '../components/header.component';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-full flex-col bg-zinc-900 text-zinc-100">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
