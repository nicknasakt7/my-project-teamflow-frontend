'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { useProjectDetail } from '@/lib/api/project/hooks/useProjectDetail';
import { allPositions } from '@/constants/positions';
import type { ProjectMember } from '@/lib/api/project/project.type';
import { Skeleton } from '@/components/ui/skeleton';

const positionLabel = (pos: string) =>
  allPositions.find(p => p.value === pos)?.label ?? pos;

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

function MemberRow({ member }: { member: ProjectMember }) {
  const { user } = member;
  return (
    <div className="flex items-center gap-3">
      {user.profileImageUrl ? (
        <Image
          src={user.profileImageUrl}
          alt={`${user.firstName} ${user.lastName}`}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
          {getInitials(user.firstName, user.lastName)}
        </div>
      )}
      <div className="flex flex-col min-w-0">
        <span className="font-medium text-sm truncate">
          {user.firstName} {user.lastName}
        </span>
        <span className="text-xs text-muted-foreground truncate">
          {positionLabel(user.position)}
        </span>
      </div>
    </div>
  );
}

export default function TeamMembers({ projectId }: { projectId: string }) {
  const { data: project, isLoading } = useProjectDetail(projectId);
  const members = project?.projectMembers ?? [];

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center gap-2">
        <Users className="h-5 w-5 text-blue-500" />
        <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800 px-4 py-3 text-blue-600 dark:text-blue-400">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="font-medium">All Members</span>
          </div>
          <span className="rounded-full border px-3 py-1 text-sm">
            {isLoading ? '—' : members.length}
          </span>
        </div>

        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="flex flex-col gap-1 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))
        ) : members.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">No members yet</p>
        ) : (
          members.map(member => (
            <MemberRow key={member.userId} member={member} />
          ))
        )}
      </CardContent>
    </Card>
  );
}
