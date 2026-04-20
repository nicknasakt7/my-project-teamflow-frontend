'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center gap-8">
      <p className="text-xl font-bold tracking-[0.3em] text-foreground uppercase">
        Team Flow
      </p>

      <div className="w-48 h-px bg-border" />

      <div className="flex flex-col items-center gap-2">
        <p className="text-6xl font-extrabold tracking-tight text-foreground">
          500
        </p>
        <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          Something went wrong
        </p>
        <p className="text-xs italic text-muted-foreground">
          {error.message || 'An unexpected error occurred.'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="px-6 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Try again
        </button>

        <a
          href="/"
          className="px-6 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
        >
          Back to Home
        </a>
      </div>

      <div className="absolute bottom-10 flex items-center gap-2 text-[10px] tracking-widest text-muted-foreground/60 uppercase">
        <span>Team Flow</span>
        <span>•</span>
        <span>v2.4.0</span>
      </div>
    </div>
  );
}
