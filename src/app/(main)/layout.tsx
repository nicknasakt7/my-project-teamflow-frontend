import Header from '@/components/layouts/header';
import Sidebar from '@/components/layouts/sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-primary-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <div className="ml-70 flex flex-col h-screen">
        {/* Header */}
        <Header />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin p-6 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
