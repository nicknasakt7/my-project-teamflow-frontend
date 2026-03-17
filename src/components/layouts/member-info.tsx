'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { logout } from '@/lib/actions/auth.action';
import { LogOut } from 'lucide-react';
import { Session } from 'next-auth';
import Image from 'next/image';

export default function MemberInfo({ session }: { session: Session | null }) {
  const router = useRouter();
  const imageUrl = session?.user?.profileImageUrl;
  return (
    <div className="border-t p-4" onClick={() => router.push('/settings')}>
      <div className="flex items-center justify-between bg-secondary border border-muted rounded-lg p-4 hover:shadow-md hover:bg-card">
        <div className="flex items-center gap-3">
          <div>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="avatar"
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
            ) : (
              <div className="size-10 rounded-full bg-primary" />
            )}
          </div>

          <div className="leading-tight space-y-2">
            <p className="text-lg font-medium text-secondary-foreground">
              {session?.user?.firstName} {session?.user?.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              {session?.user?.roleType}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-destructive transition-colors"
          onClick={e => {
            e.stopPropagation();
            logout();
          }}
        >
          <LogOut className="size-5" />
        </Button>
      </div>
    </div>
  );
}
