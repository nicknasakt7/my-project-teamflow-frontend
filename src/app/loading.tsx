export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center gap-8">
      {/* Logo */}
      <p className="text-xl font-bold tracking-[0.3em] text-foreground uppercase">
        Team Flow
      </p>

      {/* Running bar */}
      <div className="w-48 h-px bg-border relative overflow-hidden">
        <div className="absolute inset-y-0 w-12 bg-foreground/60 animate-slide" />
      </div>

      {/* Label */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          Precision Loading
        </p>
        <p className="text-xs italic text-muted-foreground">
          Initializing...
        </p>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-10 flex items-center gap-2 text-[10px] tracking-widest text-muted-foreground/60 uppercase">
        <span>Syncing project data</span>
        <span>•</span>
        <span>v2.4.0</span>
      </div>

      <style>{`
        @keyframes slide {
          0%   { left: -3rem; }
          50%  { left: calc(100%); }
          100% { left: -3rem; }
        }
        .animate-slide {
          animation: slide 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
