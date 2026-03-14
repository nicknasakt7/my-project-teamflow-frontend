'use client';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarItem({
  icon: Icon,
  label,
  href,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer text-lg transition',
        isActive
          ? 'bg-card text-foreground font-bold'
          : 'text-foreground hover:bg-card font-medium',
      )}
    >
      <Icon className="size-5" />
      {label}
    </Link>
  );
}
