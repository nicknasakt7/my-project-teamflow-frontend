'use client';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { ApiError } from '@/lib/api/api.error';

const handle401 = (error: unknown) => {
  if (error instanceof ApiError && error.status === 401) {
    signOut({ callbackUrl: '/' });
  }
};

function CacheCleaner({ queryClient }: { queryClient: QueryClient }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const prevRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (prevRef.current !== undefined && prevRef.current !== userId) {
      queryClient.clear();
    }
    prevRef.current = userId;
  }, [userId, queryClient]);

  return null;
}

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({ onError: handle401 }),
        mutationCache: new MutationCache({ onError: handle401 }),
      }),
  );

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <CacheCleaner queryClient={queryClient} />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
