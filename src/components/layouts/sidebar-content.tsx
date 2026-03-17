'use client';

import {
  Folder,
  LayoutDashboard,
  ListTodo,
  Settings,
  UserPlus,
  Users,
} from 'lucide-react';
import SidebarItem from './sidebar-item';

export default function SidebarContent() {
  const menu = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Folder, label: 'Projects', href: '/projects' },
    { icon: ListTodo, label: 'Tasks', href: '/tasks' },
    { icon: Users, label: 'Members', href: '/employees' },
    { icon: UserPlus, label: 'Register Admin', href: '/register-admin' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
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
  );
}
