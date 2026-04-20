'use client';

import {
  Folder,
  LayoutDashboard,
  ListTodo,
  Settings,
  UserPlus,
  Users,
  ClipboardList,
} from 'lucide-react';
import SidebarItem from './sidebar-item';

const allMenu = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', roles: ['ADMIN', 'SUPER_ADMIN'] },
  { icon: Folder, label: 'Projects', href: '/projects', roles: ['ADMIN', 'SUPER_ADMIN', 'EMPLOYEE'] },
  { icon: ClipboardList, label: 'All Tasks', href: '/all-tasks', roles: ['ADMIN', 'SUPER_ADMIN'] },
  { icon: ListTodo, label: 'Tasks', href: '/tasks', roles: ['EMPLOYEE'] },
  { icon: Users, label: 'Members', href: '/employees', roles: ['ADMIN', 'SUPER_ADMIN'] },
  { icon: UserPlus, label: 'Register Admin', href: '/register-admin', roles: ['SUPER_ADMIN'] },
  { icon: Settings, label: 'Settings', href: '/settings', roles: ['ADMIN', 'SUPER_ADMIN', 'EMPLOYEE'] },
];

interface SidebarContentProps {
  roleType?: string;
}

export default function SidebarContent({ roleType }: SidebarContentProps) {
  const menu = allMenu.filter(item => !roleType || item.roles.includes(roleType));

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
