'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function ProfileCard() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Profile Information</CardTitle>
        <Button variant="outline" size="lg">
          <Edit />
          Edit Profile Contact Your Admin
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-primary text-2xl text-primary-foreground font-semibold overflow-hidden">
            {user?.profileImageUrl ? (
              <Image
                src={user.profileImageUrl}
                alt="profile"
                fill
                className="object-cover"
              />
            ) : (
              (user?.firstName?.[0] ?? '').toUpperCase()
            )}
          </div>

          <div>
            <p className="font-semibold text-xl">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-muted-foreground text-md">{user?.position}</p>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-md font-medium">First Name</label>
            <p className="text-sm text-muted-foreground">{user?.firstName ?? '—'}</p>
          </div>

          <div className="space-y-1">
            <label className="text-md font-medium">Last Name</label>
            <p className="text-sm text-muted-foreground">{user?.lastName ?? '—'}</p>
          </div>

          <div className="space-y-1">
            <label className="text-md font-medium">Email Address</label>
            <p className="text-sm text-muted-foreground">{user?.email ?? '—'}</p>
          </div>

          <div className="space-y-1">
            <label className="text-md font-medium">Position</label>
            <p className="text-sm text-muted-foreground">{user?.position ?? '—'}</p>
          </div>

          <div className="space-y-1">
            <label className="text-md font-medium">Level</label>
            <p className="text-sm text-muted-foreground">{user?.level ?? '—'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
