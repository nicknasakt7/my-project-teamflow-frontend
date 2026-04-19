'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Camera, Mail, Briefcase, Shield, BarChart2, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import type { User, Status } from '@/lib/api/user/user.type';
import { allPositions } from '@/constants/positions';
import { useUploadEmployeeAvatar } from '@/lib/api/employee/hooks/useUploadEmployeeAvatar';

const statusStyles: Record<Status, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  INACTIVE: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
  LEAVE: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
};

const statusLabel: Record<Status, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  LEAVE: 'On Leave',
};

const positionLabel = (pos: string) =>
  allPositions.find(p => p.value === pos)?.label ?? pos;

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export default function EmployeeProfileCard({ employee }: { employee: User }) {
  const { data: session } = useSession();
  const fileRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadAvatar, isPending } = useUploadEmployeeAvatar(employee.id);

  const isAdmin =
    session?.user?.roleType === 'ADMIN' || session?.user?.roleType === 'SUPER_ADMIN';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    uploadAvatar(file, {
      onSuccess: () => toast.success('Profile photo updated'),
      onError: () => toast.error('Failed to upload photo'),
    });
    e.target.value = '';
  };

  return (
    <Card>
      <CardContent className="p-6 flex flex-wrap items-start gap-6">
        {/* Avatar with upload overlay */}
        <div className="relative shrink-0 group">
          {employee.profileImageUrl ? (
            <Image
              src={employee.profileImageUrl}
              alt={`${employee.firstName} ${employee.lastName}`}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
              {getInitials(employee.firstName, employee.lastName)}
            </div>
          )}

          {isAdmin && (
            <>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={isPending}
                className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-60"
              >
                {isPending ? (
                  <Loader2 className="size-5 text-white animate-spin" />
                ) : (
                  <Camera className="size-5 text-white" />
                )}
              </button>
            </>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-semibold">
              {employee.firstName} {employee.lastName}
            </h2>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusStyles[employee.status]}`}>
              {statusLabel[employee.status]}
            </span>
          </div>
          <p className="text-muted-foreground">{positionLabel(employee.position)}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5">
              <Mail className="size-3.5" />
              {employee.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="size-3.5" />
              {employee.level}
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="size-3.5" />
              {employee.roleType.replace('_', ' ')}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart2 className="size-3.5" />
              {employee.gender}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
