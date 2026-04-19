'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle2 } from 'lucide-react';
import { useProjectDetail } from '@/lib/api/project/hooks/useProjectDetail';
import { allPositions } from '@/constants/positions';
import { Skeleton } from '@/components/ui/skeleton';

const positionLabel = (pos: string) =>
  allPositions.find(p => p.value === pos)?.label ?? pos;

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export default function ProjectCreatorCard({ projectId }: { projectId: string }) {
  const { data: project, isLoading } = useProjectDetail(projectId);

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center gap-2">
        <UserCircle2 className="h-5 w-5 text-violet-500" />
        <CardTitle className="text-lg font-semibold">Created By</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ) : project ? (
          <div className="flex items-center gap-3">
            {project.createdBy.profileImageUrl ? (
              <Image
                src={project.createdBy.profileImageUrl}
                alt={`${project.createdBy.firstName} ${project.createdBy.lastName}`}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 flex items-center justify-center text-base font-bold shrink-0">
                {getInitials(project.createdBy.firstName, project.createdBy.lastName)}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm">
                {project.createdBy.firstName} {project.createdBy.lastName}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {positionLabel(project.createdBy.position)}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                {new Date(project.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
