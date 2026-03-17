'use client';
import {
  Folder,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Settings,
  UserPlus,
  Users,
} from 'lucide-react';
import SidebarItem from './sidebar-item';

import { Button } from '../ui/button';
import Link from 'next/link';

const menu = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Folder, label: 'Projects', href: '/projects' },
  { icon: ListTodo, label: 'Tasks', href: '/tasks' },
  { icon: Users, label: 'Members', href: '/employees' },
  { icon: UserPlus, label: 'Register Admin', href: '/register-admin' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-70 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Menu */}
      <nav className="flex flex-col gap-1 p-4 flex-1">
        {menu.map(item => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </nav>

      {/* User */}
      <div className="border-t p-4">
        <Link href="/settings">
          <div className="flex items-center justify-between bg-secondary border border-muted rounded-lg p-4 hover:shadow-md hover:bg-card">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                JS
              </div>

              <div className="leading-tight space-y-2">
                <p className="text-lg font-medium text-secondary-foreground">
                  Nick Nasa
                </p>
                <p className="text-sm text-muted-foreground">ADMIN</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-destructive transition-colors"
            >
              <LogOut className="size-5" />
            </Button>
          </div>
        </Link>
      </div>
    </aside>
  );
}
