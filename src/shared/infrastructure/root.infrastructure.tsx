import '@assets/styles/globals.css';

interface RootInfrastructureProps {
  children: React.ReactNode;
}

export function RootInfrastructure({ children }: RootInfrastructureProps) {
  return <>{children}</>;
}
