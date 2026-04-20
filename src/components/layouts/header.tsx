import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from './theme';
import NotificationBell from '@/components/features/notifications/notification-bell';
import LiveClock from './live-clock';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-secondary shadow flex items-center justify-between px-8 gap-3 z-40">
      {/* Logo */}
      <div>
        <Link href="/">
          <div className="flex gap-4 size-8 rounded-md bg-muted font-semibold">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <span className="font-semibold text-sidebar-foreground text-2xl">
              TeamFlow
            </span>
          </div>
        </Link>
      </div>
      {/* Date */}
      <div className="flex gap-4 items-center">
        <LiveClock />

        {/* Dark mode */}
        <ModeToggle />

        {/* Notification */}
        <NotificationBell />
      </div>
    </header>
  );
}
