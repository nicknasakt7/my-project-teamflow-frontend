'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectClientService } from '@/lib/api/project/project.client-service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useProjectDetail } from '@/lib/api/project/hooks/useProjectDetail';

type ProjectActionsProps = { projectId: string };

export default function ProjectActions({ projectId }: ProjectActionsProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: project } = useProjectDetail(projectId);

  const isCanceled = project?.status === 'CANCELED';

  const { mutate: cancel, isPending: isCanceling } = useMutation({
    mutationFn: () => projectClientService.cancelProject(projectId, session?.user?.accessToken!),
    onSuccess: () => {
      toast.success('Project cancelled');
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: Error) => toast.error(error.message ?? 'Failed to cancel project'),
  });

  const { mutate: restore, isPending: isRestoring } = useMutation({
    mutationFn: () => projectClientService.restoreProject(projectId, session?.user?.accessToken!),
    onSuccess: () => {
      toast.success('Project restored');
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: Error) => toast.error(error.message ?? 'Failed to restore project'),
  });

  if (isCanceled) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="rounded-md h-11 text-md border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40">
            Restore Project
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore this project?</AlertDialogTitle>
            <AlertDialogDescription>
              The project will be set back to Active status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRestoring}>No, keep it cancelled</AlertDialogCancel>
            <AlertDialogAction disabled={isRestoring} onClick={() => restore()}>
              {isRestoring ? 'Restoring...' : 'Yes, restore project'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="rounded-md h-11 text-md">
          Cancel Project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This will mark the project as cancelled. You can restore it later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isCanceling}>No, keep it</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={isCanceling} onClick={() => cancel()}>
            {isCanceling ? 'Cancelling...' : 'Yes, cancel project'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
