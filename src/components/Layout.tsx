import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export default function Layout({ children, showSidebar = true }: LayoutProps) {
  if (!showSidebar) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="relative flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <main className="flex-1 max-h-screen overflow-y-auto">
        <Header />
        {children}
      </main>
    </div>
  );
}
