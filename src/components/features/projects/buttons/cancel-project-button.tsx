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
import { apiClient } from '@/lib/api/api-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type CancelProjectButtonProps = {
  projectId: string;
};

export default function CancelProjectButton({ projectId }: CancelProjectButtonProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      apiClient.patch(`/projects/${projectId}/status`, {}, session?.user?.accessToken!),
    onSuccess: () => {
      toast.success('Project cancelled');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      router.push('/projects');
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'Failed to cancel project');
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="rounded-md border h-11 text-md">
          Cancel Project
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The project will be permanently cancelled.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>No, keep it</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={() => mutate()}
          >
            {isPending ? 'Cancelling...' : 'Yes, cancel project'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
