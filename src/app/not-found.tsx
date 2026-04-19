import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center gap-8">
      <p className="text-xl font-bold tracking-[0.3em] text-foreground uppercase">
        Team Flow
      </p>

      <div className="w-48 h-px bg-border" />

      <div className="flex flex-col items-center gap-2">
        <p className="text-6xl font-extrabold tracking-tight text-foreground">404</p>
        <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          Page Not Found
        </p>
        <p className="text-xs italic text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>

      <Link
        href="/"
        className="px-6 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
      >
        Back to Home
      </Link>

      <div className="absolute bottom-10 flex items-center gap-2 text-[10px] tracking-widest text-muted-foreground/60 uppercase">
        <span>Team Flow</span>
        <span>•</span>
        <span>v2.4.0</span>
      </div>
    </div>
  );
}
