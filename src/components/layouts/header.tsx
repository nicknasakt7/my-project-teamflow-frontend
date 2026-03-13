import { Bell, Moon } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-secondary shadow flex items-center justify-between px-8 gap-3 z-40">
      {/* Logo */}
      <div>
        <Link href="/projects">
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
        <div className="text-md font-semibold text-foreground bg-accent px-4 py-1 rounded-md">
          Thu, Mar 12, 2026
          <div className="text-md text-right ">10:28 PM</div>
        </div>

        {/* Dark mode */}
        <Button variant="outline" size="icon" className="p-5">
          <Moon className="size-5 " />
        </Button>

        {/* Notification */}
        <Button variant="outline" size="icon" className="relative p-5">
          <Bell className="size-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
        </Button>
      </div>
    </header>
  );
}
