import { auth } from '@/lib/auth/auth';
import MemberInfo from './member-info';
import SidebarContent from './sidebar-content';

export default async function Sidebar() {
  const session = await auth();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-70 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Menu */}
      <SidebarContent roleType={session?.user?.roleType} />
      {/* User */}
      {/* <Link href="/settings"> */}
      <MemberInfo session={session} />
      {/* </Link> */}
    </aside>
  );
}
